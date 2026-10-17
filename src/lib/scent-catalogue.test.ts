import { expect, test, spyOn } from "bun:test";
import { collectCatalogues, mergeCatalogue } from "./scent-catalogue";
import { sameScent } from "./scent-identity";
import { fragranceSearch } from "./scent-gateway";
import { searchWikidata } from "./scent-wikidata";
import type { CatalogRecord } from "./scent-providers";

const perfume=(extra:Partial<CatalogRecord>={}):CatalogRecord=>({id:"fragella:one",name:"Khamrah",brand:"Lattafa",image:"https://example.com/bottle.jpg",notes:[],top:[],heart:[],base:[],accords:[],...extra});
test("same perfume across sources and bottle sizes appears once with richer details",()=>{
 const result=mergeCatalogue([
   [perfume({id:"beautyfacts:6291108737194",name:"Lattafa Khamrah - Eau de Parfum 100ml"})],
   [perfume({id:"fragella:khamrah",name:"Khamrah",top:["Cinnamon"],base:["Vanilla"],longevity:"Long Lasting"})],
   [perfume({id:"noteboxd:khamrah",name:"KHAMRAH EDP 200 ml"})],
 ]);
 expect(result).toHaveLength(1);expect(result[0]?.top).toEqual(["Cinnamon"]);
 expect(result[0]?.longevity).toBe("Long Lasting");expect(result[0]?.aliases).toContain("noteboxd:khamrah");
});
test("EDT, EDP, Elixir, Intense and Le Parfum remain distinct",()=>{
 const names=["Sauvage Eau de Toilette","Sauvage Eau de Parfum","Sauvage Elixir","Sauvage Intense","Sauvage Le Parfum"];
 expect(mergeCatalogue([names.map((name,i)=>perfume({id:String(i),brand:"Dior",name}))])).toHaveLength(5);
});
test("a metadata merge retains concentration, so a later EDT cannot collapse into EDP",()=>{
 const r=mergeCatalogue([[perfume({id:"facts:edp",name:"Khamrah EDP"})],[perfume({id:"fragella:1",notes:["Vanilla"]})],[perfume({id:"facts:edt",name:"Khamrah EDT"})]]);
 expect(r).toHaveLength(2);
});
test("accents, punctuation and recognised brand abbreviations match",()=>{
 expect(sameScent(perfume({name:"La Nuit de L’Homme",brand:"YSL"}),perfume({id:"other",name:"La Nuit de L'Homme 100ml",brand:"Yves Saint Laurent"}))).toBe(true);
 expect(sameScent(perfume({brand:"Bvlgari",name:"Thé Noir"}),perfume({id:"other",brand:"Bulgari",name:"The Noir"}))).toBe(true);
 expect(sameScent(perfume({id:"another:one",brand:"Other house"}),perfume())).toBe(false);
});
test("barcode deduplication works across public catalogues and db-prefixed page results",()=>{
 expect(sameScent(perfume({id:"db:beautyfacts:6291108737194",name:"Khamrah 100ml"}),perfume({id:"db:productsfacts:6291108737194",name:"Khamrah bottle"}))).toBe(true);
});
test("all sources contribute; one outage never discards the others",async()=>{
 const called:string[]=[];
 const result=await collectCatalogues(["noteboxd","fragella","beautyfacts"],async source=>{
   called.push(source);if(source==="noteboxd")throw Error("rate limited");
   return {source,hasMore:false,total:1,results:[perfume({id:source,name:source==="fragella"?"Khamrah":"Asad"})]};
 });
 expect(called).toHaveLength(3);expect(result.results).toHaveLength(2);
 expect(result.sourceStatus.find(p=>p.source==="noteboxd")?.status).toBe("unavailable");
});
test("gateway combines all configured APIs even after a public source succeeds",async()=>{
 const spy=spyOn(globalThis,"fetch").mockImplementation(async(input)=>{
  const url=new URL(String(input));
  if(url.host==="api.noteboxd.com")return Response.json({results:[perfume({name:"Asad"})]});
  if(url.host==="api.fragella.com")return Response.json({data:[perfume({name:"Khamrah",top_notes:["Cinnamon"]} as Partial<CatalogRecord>)],pagination:{has_more:false}});
  if(url.host==="query.wikidata.org")return Response.json({results:{bindings:[]}});
  return Response.json({count:1,products:[{code:"6291108737194",brands:"Lattafa",product_name:"Khamrah Eau de Parfum 100ml",image_front_url:"https://example.com/khamrah.jpg"}]});
 });
 try{
   const response=await fragranceSearch(new Request("https://example.com/api/fragrance/search?q=Lattafa"),{NOTEBOXD_API_KEY:"test",FRAGELLA_API_KEY:"test"});
   const data=await response.json();
   expect(spy).toHaveBeenCalledTimes(5);expect(data.results).toHaveLength(2);expect(data.source).toBe("combined");
   expect(JSON.stringify(data)).not.toContain("API_KEY");
 }finally{spy.mockRestore();}
});
test("opening Discover never uses either quota-limited API",async()=>{
 const urls:string[]=[];
 const spy=spyOn(globalThis,"fetch").mockImplementation(async input=>{
   const url=String(input);urls.push(url);
   return url.includes("query.wikidata")?Response.json({results:{bindings:[]}}):Response.json({count:0,products:[]});
 });
 try{
   await fragranceSearch(new Request("https://example.com/api/fragrance/browse"),{NOTEBOXD_API_KEY:"test",FRAGELLA_API_KEY:"test"});
   expect(urls).toHaveLength(3);expect(urls.some(url=>url.includes("api.fragella")||url.includes("api.noteboxd"))).toBe(false);
 }finally{spy.mockRestore();}
});
test("Wikimedia source carries real thumbnail and full reusable photo attribution",async()=>{
 const spy=spyOn(globalThis,"fetch").mockImplementation(async input=>String(input).includes("query.wikidata")?
   Response.json({results:{bindings:[{item:{value:"http://www.wikidata.org/entity/Q110263664"},name:{value:"Daisy"},brand:{value:"Marc Jacobs"},image:{value:"http://commons.wikimedia.org/wiki/Special:FilePath/Daisy.jpg"}}]}}):
   Response.json({query:{pages:{1:{title:"File:Daisy.jpg",imageinfo:[{thumburl:"https://thumb.wikimedia.org/daisy.jpg",descriptionurl:"https://commons.wikimedia.org/wiki/File:Daisy.jpg",extmetadata:{Artist:{value:"<a>Photographer</a>"},LicenseShortName:{value:"CC BY-SA 4.0"},LicenseUrl:{value:"https://creativecommons.org/licenses/by-sa/4.0/"}}}]}}}}));
 try{const r=await searchWikidata("Daisy",1);expect(r.results).toHaveLength(1);expect(r.results[0]?.imageCredit).toBe("Photographer");expect(r.results[0]?.imageLicense).toBe("CC BY-SA 4.0");}finally{spy.mockRestore();}
});
test("manual bottles, missing photos and source photo credits are handled safely",()=>{
 expect(sameScent(perfume({id:"manual:1"}),perfume({id:"manual:2"}))).toBe(false);
 expect(mergeCatalogue([[perfume({image:undefined} as Partial<CatalogRecord>)]] )).toHaveLength(0);
 const r=mergeCatalogue([[perfume({id:"wikidata:Q1",imageCredit:"Wikimedia photographer",imageLicense:"CC BY-SA"})],[perfume({id:"fragella:1",notes:["Vanilla"],image:"https://example.com/provider.jpg"})]]);
 expect(r[0]?.image).toBe("https://example.com/provider.jpg");expect(r[0]?.imageCredit).toBeUndefined();
});

test("cached searches reuse results and a rate-limited source cools down across different searches",async()=>{
 const previous=Object.getOwnPropertyDescriptor(globalThis,"caches");
 const saved=new Map<string,Response>();
 Object.defineProperty(globalThis,"caches",{configurable:true,value:{default:{
   match:async(key:Request)=>saved.get(key.url)?.clone(),
   put:async(key:Request,value:Response)=>{saved.set(key.url,value.clone());}
 }}});
 const calls:string[]=[];
 const spy=spyOn(globalThis,"fetch").mockImplementation(async input=>{
   const url=new URL(String(input));calls.push(url.host);
   if(url.host==="api.fragella.com")return new Response("Limit reached",{status:429,headers:{"retry-after":"120"}});
   if(url.host==="api.noteboxd.com")return Response.json({results:[perfume()]});
   if(url.host==="query.wikidata.org")return Response.json({results:{bindings:[]}});
   return Response.json({count:0,products:[]});
 });
 try{
  const env={NOTEBOXD_API_KEY:"test",FRAGELLA_API_KEY:"test"};
  const first=await fragranceSearch(new Request("https://example.com/api/fragrance/search?q=Lattafa"),env);
  expect((await first.json()).results).toHaveLength(1);
  const count=calls.length;
  const cached=await fragranceSearch(new Request("https://example.com/api/fragrance/search?q=Lattafa"),env);
  expect(cached.headers.get("x-scent-cache")).toBe("HIT");expect(calls).toHaveLength(count);
  await fragranceSearch(new Request("https://example.com/api/fragrance/search?q=Dior"),env);
  expect(calls.filter(host=>host==="api.fragella.com")).toHaveLength(1);
 }finally{spy.mockRestore();if(previous)Object.defineProperty(globalThis,"caches",previous);else Reflect.deleteProperty(globalThis,"caches");}
});

test("Noteboxd load more follows its real cursor without repeating its first page",async()=>{
 const previous=Object.getOwnPropertyDescriptor(globalThis,"caches");const saved=new Map<string,Response>();
 Object.defineProperty(globalThis,"caches",{configurable:true,value:{default:{match:async(key:Request)=>saved.get(key.url)?.clone(),put:async(key:Request,value:Response)=>{saved.set(key.url,value.clone());}}}});
 const cursors:(string|null)[]=[];
 const spy=spyOn(globalThis,"fetch").mockImplementation(async input=>{
  const url=new URL(String(input));cursors.push(url.searchParams.get("cursor"));
  return Response.json({results:[perfume({id:url.searchParams.get("cursor")?"two":"one",name:url.searchParams.get("cursor")?"Asad":"Khamrah"})],nextCursor:url.searchParams.has("cursor")?null:"second-page"});
 });
 try{
  const env={NOTEBOXD_API_KEY:"test"};
  const one=await fragranceSearch(new Request("https://example.com/api/fragrance/search?q=Lattafa&source=noteboxd&page=1"),env);
  expect((await one.json()).hasMore).toBe(true);
  const two=await fragranceSearch(new Request("https://example.com/api/fragrance/search?q=Lattafa&source=noteboxd&page=2"),env);
  const data=await two.json();expect(data.results[0].name).toBe("Asad");expect(data.hasMore).toBe(false);
  expect(cursors).toEqual([null,"second-page"]);
 }finally{spy.mockRestore();if(previous)Object.defineProperty(globalThis,"caches",previous);else Reflect.deleteProperty(globalThis,"caches");}
});
