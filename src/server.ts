import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SCENT_SEED, seedSearch } from "./lib/scent-catalog-seed";
import { searchNoteboxd, searchFragella } from "./lib/scent-providers";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/** Search order: Noteboxd (if configured) → Fragella → curated fallback.
 * Browser never receives provider keys, and only one provider is called when the first succeeds.
 * Browse does not consume remote quotas; only explicit submitted searches do.
 */
/** Support both Vercel/Node and Cloudflare Worker request-time env bindings.
 * Never serialize runtime env or API tokens in responses.
 */
function runtimeSecret(bindings:unknown,key:"NOTEBOXD_API_KEY"|"FRAGELLA_API_KEY"):string|undefined {
 const fromWorker = bindings && typeof bindings==="object" && key in bindings
   ? (bindings as Record<string,unknown>)[key] : undefined;
 if(typeof fromWorker==="string" && fromWorker.trim())return fromWorker.trim();
 const fromNode=typeof process!=="undefined"?process.env[key]:undefined;
 return fromNode?.trim()||undefined;
}
async function fragranceSearch(request: Request, bindings?: unknown): Promise<Response> {
 if(request.method!=="GET")return new Response("Method not allowed",{status:405});
 const url=new URL(request.url);
 const mode=url.pathname.endsWith("/search")?"search":url.pathname.endsWith("/browse")?"browse":null;
 if(!mode)return Response.json({error:"Not found"},{status:404});
 const q=(url.searchParams.get("q")||"").trim().slice(0,90);
 const page=Math.min(2,Math.max(1,Math.floor(Number(url.searchParams.get("page"))||1)));
 const fallback=mode==="browse"||q.length<3 ? SCENT_SEED.slice((page-1)*20,page*20):seedSearch(q,page,20);
 const noteboxd=runtimeSecret(bindings,"NOTEBOXD_API_KEY");
 const fragella=runtimeSecret(bindings,"FRAGELLA_API_KEY");
 if(mode==="browse"||q.length<3){
   return Response.json({results:fallback,total:SCENT_SEED.length,source:"starter",connected:!!(noteboxd||fragella)},{
     headers:{"cache-control":"public, max-age=300"}
   });
 }
 if(noteboxd && page===1){
   try{
     const found=await searchNoteboxd(q,noteboxd);
     return Response.json({...found,connected:true},{
       headers:{"cache-control":"public, s-maxage=86400, stale-while-revalidate=86400"}
     });
   }catch(err){
     console.warn("Noteboxd search fallback:",err instanceof Error?err.message:"unknown");
   }
 }
 if(fragella){
   try{
     const found=await searchFragella(q,fragella,page);
     return Response.json({...found,connected:true},{
       headers:{"cache-control":"public, s-maxage=86400, stale-while-revalidate=86400"}
     });
   }catch(err){
     console.warn("Fragella search fallback:",err instanceof Error?err.message:"unknown");
   }
 }
 return Response.json({
    results:fallback,total:fallback.length,hasMore:false,source:"starter",connected:!!(noteboxd||fragella),
    providerWarning:noteboxd||fragella?"The online catalogue is unavailable; showing the starter selection.":"Connect a perfume catalogue to unlock more fragrances."
 },{headers:{"cache-control":"private, max-age=60"}});
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname.startsWith("/api/fragrance/")) return await fragranceSearch(request, env);
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
