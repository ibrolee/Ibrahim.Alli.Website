import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SCENT_SEED, seedSearch } from "./lib/scent-catalog-seed";
import { searchNoteboxd, searchFragella, searchOpenFacts, type SearchResult } from "./lib/scent-providers";

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

/** Cloudflare perfume catalogues: Open Beauty Facts and Open Products Facts first,
 * with quota-limited Noteboxd / Fragella reserved for explicit selection or when
 * free public sources have no usable photos. No provider is called on page load.
 */
type SearchSource="auto"|"beautyfacts"|"productsfacts"|"noteboxd"|"fragella";
function runtimeSecret(bindings:unknown,key:"NOTEBOXD_API_KEY"|"FRAGELLA_API_KEY"):string|undefined {
 const fromWorker=bindings&&typeof bindings==="object"&&key in bindings?(bindings as Record<string,unknown>)[key]:undefined;
 if(typeof fromWorker==="string"&&fromWorker.trim())return fromWorker.trim();
 const fromNode=typeof process!=="undefined"?process.env[key]:undefined;
 return fromNode?.trim()||undefined;
}
function scentPhotoResults(records:SearchResult["results"]){
 return records.filter(p=>typeof p.image==="string"&&p.image.startsWith("https://"));
}
async function fragranceSearch(request:Request,bindings?:unknown):Promise<Response>{
 if(request.method!=="GET")return new Response("Method not allowed",{status:405});
 const url=new URL(request.url);
 const mode=url.pathname.endsWith("/search")?"search":url.pathname.endsWith("/browse")?"browse":null;
 if(!mode)return Response.json({error:"Not found"},{status:404});
 const q=(url.searchParams.get("q")||"").trim().replace(/\s+/g," ").slice(0,90);
 const page=Math.min(2,Math.max(1,Math.floor(Number(url.searchParams.get("page"))||1)));
 const rawSource=url.searchParams.get("source");
 const source:SearchSource=rawSource==="beautyfacts"||rawSource==="productsfacts"||rawSource==="noteboxd"||rawSource==="fragella"?rawSource:"auto";
 const cacheStore=(globalThis as typeof globalThis&{caches?:{default?:Cache}}).caches?.default;
 if(mode==="browse"||q.length<3){
   // Discover browsing is keyless only; never touch Noteboxd/Fragella allowances.
   // Cached at the Cloudflare edge so simply opening Discover doesn't refetch.
   const browseCacheKey=new Request(new URL("/api/fragrance/browse?page="+page,url.origin).toString());
   if(cacheStore)try{
     const cached=await cacheStore.match(browseCacheKey);
     if(cached)return cached;
   }catch{}
   let found:SearchResult|null=null;
   for(const provider of ["beautyfacts","productsfacts"] as const){
     try{
       const choice=await searchOpenFacts("eau de parfum",page,provider);
       const photos=scentPhotoResults(choice.results);
       if(photos.length){
         found={...choice,results:photos,total:photos.length};break;
       }
     }catch(err){console.warn("Free discovery catalogue unavailable:",provider,err instanceof Error?err.message:"failed");}
   }
   const result=found?{...found,connected:true,attribution:"Open Facts contributors"}:{
     results:[],total:0,hasMore:false,source:"none",connected:true,
     providerWarning:"Browse is temporarily unavailable. Search a brand or add a perfume manually."
   };
   const response=Response.json(result,{headers:{"cache-control":"public, max-age=0, s-maxage="+(found?86400:300)}});
   if(cacheStore)try{await cacheStore.put(browseCacheKey,response.clone());}catch{}
   return response;
 }
 const cacheKey=new Request(new URL("/api/fragrance/search?source="+source+"&page="+page+"&q="+encodeURIComponent(q.toLowerCase()),url.origin).toString());
 if(cacheStore)try{
   const cached=await cacheStore.match(cacheKey);
   if(cached)return new Response(cached.body,{status:cached.status,headers:{...Object.fromEntries(cached.headers.entries()),"x-scent-cache":"HIT"}});
 }catch{}

 const noteboxd=runtimeSecret(bindings,"NOTEBOXD_API_KEY"),fragella=runtimeSecret(bindings,"FRAGELLA_API_KEY");
 const plan:SearchSource[]=source==="auto"?["beautyfacts","productsfacts","noteboxd","fragella"]:
   [source,...(["beautyfacts","productsfacts"] as SearchSource[]).filter(s=>s!==source)];
 const tried:string[]=[];
 let answer:SearchResult|null=null;
 for(const provider of plan){
   if(provider==="noteboxd"&&!noteboxd)continue;
   if(provider==="fragella"&&!fragella)continue;
   tried.push(provider);
   try{
     const found=provider==="noteboxd"?await searchNoteboxd(q,noteboxd!):
       provider==="fragella"?await searchFragella(q,fragella!,page):
       await searchOpenFacts(q,page,provider as "beautyfacts"|"productsfacts");
     // "Successful" empty or image-less API responses are not useful. Keep falling back.
     const eligible=scentPhotoResults(found.results);
     if(eligible.length){
       answer={...found,results:eligible,total:eligible.length};
       break;
     }
   }catch(err){
     console.warn("Fragrance source unavailable:",provider,err instanceof Error?err.message:"request failed");
   }
 }
 const data=answer?{
   ...answer,connected:true,requestedSource:source,sourcesTried:tried,
   attribution:answer.source==="beautyfacts"?"Open Beauty Facts contributors":
     answer.source==="productsfacts"?"Open Products Facts contributors":undefined
 }:{
   results:[],total:0,hasMore:false,source:"none",connected:Boolean(noteboxd||fragella),
   requestedSource:source,sourcesTried:tried,
   providerWarning:"No matching perfume photos from available sources. Try another source or add manually."
 };
 const response=Response.json(data,{headers:{"cache-control":"public, max-age=0, s-maxage="+(answer?86400:300)}});
 if(cacheStore){
   try{await cacheStore.put(cacheKey,response.clone());}catch{/* best-effort edge cache */}
 }
 return response;
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
