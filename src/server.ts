import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SCENT_SEED, seedSearch } from "./lib/scent-catalog-seed";

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

/** Read-only fragrance search. No secret keys are exposed to browsers.
 * Connect the official Fragella API by configuring FRAGELLA_API_KEY in Vercel.
 * Free plan: 20 requests per month. All records/images remain provider-owned.
 */
async function fragranceSearch(request: Request): Promise<Response> {
  if(request.method!=="GET")return new Response("Method not allowed",{status:405});
  const url=new URL(request.url);
  const mode=url.pathname.endsWith("/search")?"search":url.pathname.endsWith("/browse")?"browse":null;
  if(!mode)return Response.json({error:"Not found"},{status:404});
  const q=(url.searchParams.get("q")||"").trim().slice(0,90);
  const page=Math.min(2,Math.max(1,Math.floor(Number(url.searchParams.get("page"))||1)));
  const fallback=mode==="browse" || q.length<3 ? SCENT_SEED.slice((page-1)*20,page*20) : seedSearch(q,page,20);
  const key=process.env.FRAGELLA_API_KEY?.trim();
  // Do not spend provider quota loading a home screen or on short input.
  if(mode==="browse" || q.length<3){
    return Response.json({results:fallback,total:SCENT_SEED.length,source:"starter",connected:!!key},{
      headers:{"cache-control":"public, max-age=300"}
    });
  }
  if(!key)return Response.json({
    results:fallback,total:fallback.length,source:"starter",connected:false,
    providerWarning:"Full perfume catalogue not connected yet."
  },{headers:{"cache-control":"public, max-age=300"}});
  try{
    const remote=new URL("https://api.fragella.com/api/v1/fragrances");
    remote.searchParams.set("search",q);
    remote.searchParams.set("page",String(page));
    remote.searchParams.set("limit","10");
    const response=await fetch(remote.toString(),{
      headers:{"x-api-key":key,Accept:"application/json"},
      signal:AbortSignal.timeout(8500)
    });
    if(!response.ok)throw new Error("Fragella returned "+response.status);
    const ct=response.headers.get("content-type")||"";
    if(!ct.includes("json"))throw new Error("Catalogue did not return JSON");
    const raw=await response.text();
    if(raw.length>1_000_000)throw new Error("Catalogue response too large");
    const parsed=JSON.parse(raw);
    const records=Array.isArray(parsed)?parsed:parsed.data;
    if(!Array.isArray(records))throw new Error("Invalid fragrance response");
    const results=records.filter((x:unknown)=>x&&typeof x==="object").map((x:Record<string,unknown>)=>({
      ...x,
      id:"fragella:"+String(x["_id"]||x["id"]||x["Brand"]+":"+x["Name"])
    }));
    const hasNext=parsed.pagination?.has_more??parsed.pagination?.hasNextPage??(page===1&&records.length===10);
    // One server request = one provider call, with same-origin caching to conserve quota.
    return Response.json({
      results,total:Number(parsed.pagination?.total||0)||results.length,
      hasMore:!!hasNext && page<2,source:"fragella",connected:true
    },{headers:{"cache-control":"public, s-maxage=86400, stale-while-revalidate=86400"}});
  }catch(error){
    console.warn("Fragella search error",error instanceof Error?error.message:"unknown");
    return Response.json({
      results:fallback,total:fallback.length,source:"starter",connected:true,
      providerWarning:"Full catalogue temporarily unavailable. Showing saved starter selection."
    },{headers:{"cache-control":"private, max-age=30"}});
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname.startsWith("/api/fragrance/")) return await fragranceSearch(request);
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
