import { searchNoteboxd, searchFragella, searchOpenFacts, CatalogueHttpError, type SearchResult } from "./scent-providers";
import { searchWikidata } from "./scent-wikidata";
import { CATALOG_PROVIDERS, FREE_PROVIDERS, collectCatalogues, type CatalogProvider, type CatalogSource } from "./scent-catalogue";
import { broaderSearchTerm } from "./scent-search";

function runtimeSecret(bindings:unknown,key:"NOTEBOXD_API_KEY"|"FRAGELLA_API_KEY"):string|undefined {
 const worker=bindings&&typeof bindings==="object"?(bindings as Record<string,unknown>)[key]:undefined;
 if(typeof worker==="string"&&worker.trim())return worker.trim();
 return (typeof process!=="undefined"?process.env[key]:undefined)?.trim()||undefined;
}
type WorkerContext={waitUntil?:(promise:Promise<unknown>)=>void};
export async function fragranceSearch(request:Request,bindings?:unknown,context?:WorkerContext):Promise<Response>{
 if(request.method!=="GET")return new Response("Method not allowed",{status:405,headers:{Allow:"GET"}});
 const url=new URL(request.url),mode=url.pathname.endsWith("/search")?"search":url.pathname.endsWith("/browse")?"browse":null;
 if(!mode)return Response.json({error:"Not found"},{status:404});
 const q=(url.searchParams.get("q")||"").trim().replace(/\s+/g," ").slice(0,90);
 if(mode==="search"&&q.length<3)return Response.json({error:"Enter at least 3 letters."},{status:400});
 const numericPage=Number(url.searchParams.get("page"));
 const page=Number.isFinite(numericPage)?Math.min(10,Math.max(1,Math.floor(numericPage)||1)):1;
 const rawSource=url.searchParams.get("source");
 const source:CatalogSource=rawSource==="free"?"free":CATALOG_PROVIDERS.includes(rawSource as CatalogProvider)?rawSource as CatalogProvider:"auto";
 const keys={noteboxd:runtimeSecret(bindings,"NOTEBOXD_API_KEY"),fragella:runtimeSecret(bindings,"FRAGELLA_API_KEY")};
 const enabled=(p:CatalogProvider)=>p!=="noteboxd"&&p!=="fragella"||Boolean(keys[p]);
 // Page visits use only keyless sources. Explicit Search all includes every
 // configured source in parallel, even when a public catalogue already matched.
 const desired=mode==="browse"||source==="free"?FREE_PROVIDERS:source==="auto"?[...CATALOG_PROVIDERS]:[source];
 const sources=desired.filter(enabled);
 const cache=(globalThis as typeof globalThis&{caches?:{default?:Cache}}).caches?.default;
 const cacheKey=(path:string)=>new Request(new URL("/api/fragrance/cache-v6/"+path,url.origin));
 const aggregateKey=cacheKey(`${mode}?q=${encodeURIComponent(q.toLowerCase())}&source=${source}&page=${page}&enabled=${sources.join(",")}`);
 async function match(key:Request):Promise<Response|undefined>{try{return await cache?.match(key);}catch{return undefined;}}
 async function put(key:Request,value:unknown,seconds:number):Promise<void>{
   if(!cache)return;
   const promise=cache.put(key,Response.json(value,{headers:{"cache-control":`public, max-age=${seconds}`}})).catch(()=>{});
   if(context?.waitUntil)context.waitUntil(promise);else await promise;
 }
 const cached=await match(aggregateKey);
 if(cached)return new Response(cached.body,{headers:{...Object.fromEntries(cached.headers),"cache-control":"public, max-age=0, s-maxage=300","x-scent-cache":"HIT","x-scent-catalogue":"combined-v6"}});
 async function load(provider:CatalogProvider,alternative?:string):Promise<SearchResult|null>{
   const searchQuery=mode==="browse"?(provider==="wikidata"?"":"eau de parfum"):(alternative||q);
   const recordKey=cacheKey(`provider/${provider}?q=${encodeURIComponent(searchQuery.toLowerCase())}&page=${page}`);
   const existing=await match(recordKey);if(existing)return await existing.json() as SearchResult;
   const cooldownKey=cacheKey(`cooldown/${provider}`);
   if(await match(cooldownKey))throw new Error("Source temporarily unavailable");
   let cursor:string|undefined;
   if(provider==="noteboxd"&&page>1){
     const previous=await match(cacheKey(`provider/noteboxd?q=${encodeURIComponent(searchQuery.toLowerCase())}&page=${page-1}`));
     const saved=previous?await previous.json() as SearchResult:null;
     cursor=saved?.nextCursor;if(!cursor)return null;
   }
   // Respect the small Fragella allowance and its existing two-page contract.
   if(provider==="fragella"&&page>2)return null;
   try{
     const result=provider==="noteboxd"?await searchNoteboxd(searchQuery,keys.noteboxd!,cursor):
       provider==="fragella"?await searchFragella(searchQuery,keys.fragella!,page):
       provider==="wikidata"?await searchWikidata(searchQuery,page):await searchOpenFacts(searchQuery,page,provider);
     if(page===10)result.hasMore=false;
     await put(recordKey,result,result.results.length?86400:300);
     return result;
   }catch(error){
     if(error instanceof CatalogueHttpError&&[401,403,429].includes(error.status))await put(cooldownKey,{unavailable:true},error.status===429?error.retryAfter:300);
     throw error;
   }
 }
 let result=await collectCatalogues(sources,provider=>load(provider),mode==="search"?q:"");
 // A single wider second pass helps when upstream APIs require exact spacing
 // or word forms. It runs only after no closely matching photographed result,
 // and re-checks every candidate against the ORIGINAL query.
 const wider=mode==="search"&&page===1&&!result.results.length&&
   result.sourceStatus.some(s=>s.status==="ok")?broaderSearchTerm(q):undefined;
 let usedWider=false;
 if(wider){
   const second=await collectCatalogues(sources,provider=>load(provider,wider),q);
   if(second.results.length){
     result={...second,hasMore:false}; // Later pages use the original query, not the fallback.
     usedWider=true;
   }
 }
 for(const missing of desired.filter(p=>!enabled(p)))result.sourceStatus.push({source:missing,status:"not-configured",count:0});
 const unavailable=result.sourceStatus.filter(p=>p.status==="unavailable"||p.status==="not-configured");
 const data={...result,total:result.results.length,source:result.sources.length>1?"combined":result.sources[0]||"none",
   connected:result.sources.length>0,requestedSource:source,sourcesTried:sources,
   ...(usedWider?{searchHint:"Showing close matches despite different spacing or spelling."}:{}),
   ...(unavailable.length&&result.results.length?{providerWarning:"Some sources are unavailable. Showing the perfumes we found."}:{}),
   ...(!result.results.length?{providerWarning:"No perfume photos found this time. Try a different name or add your own."}:{})};
 const ttl=unavailable.length||!result.results.length?300:86400;
 await put(aggregateKey,data,ttl);
 return Response.json(data,{headers:{"cache-control":`public, max-age=0, s-maxage=${ttl}`,"x-scent-catalogue":"combined-v6"}});
}
