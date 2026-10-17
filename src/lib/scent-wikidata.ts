import { CatalogueHttpError, type CatalogRecord, type SearchResult } from "./scent-providers";

// Official, keyless structured-data APIs. Images are accepted only with Commons
// attribution and licence metadata; no web scraping or invented bottle images.
// https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service
// https://www.mediawiki.org/wiki/API:Imageinfo
const obj=(x:unknown):Record<string,unknown>=>x&&typeof x==="object"&&!Array.isArray(x)?x as Record<string,unknown>:{};
const str=(x:unknown):string=>typeof x==="string"?x:"";
const plain=(x:unknown):string=>str(x).replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"').slice(0,250);
const value=(x:unknown):string=>str(obj(x)["value"]);
async function json(url:URL,signal:AbortSignal):Promise<unknown>{
 const response=await fetch(url,{headers:{Accept:"application/json","User-Agent":"ScentCabinet/1.0 (https://ibrahimalli.com; personal perfume catalogue)"},signal});
 if(!response.ok)throw new CatalogueHttpError(response.status);
 if(!response.headers.get("content-type")?.includes("json"))throw Error("Invalid Wikimedia response");
 const body=await response.text();if(body.length>2_000_000)throw Error("Wikimedia response too large");
 return JSON.parse(body) as unknown;
}
export async function searchWikidata(q:string,page:number):Promise<SearchResult>{
 const signal=AbortSignal.timeout(12000);
 const filters=q.toLowerCase().split(/\s+/).filter(Boolean).slice(0,10)
   .map(word=>`FILTER(CONTAINS(LCASE(CONCAT(STR(?name), " ", STR(?brand))), ${JSON.stringify(word)}))`).join("\n");
 const url=new URL("https://query.wikidata.org/sparql");
 url.searchParams.set("format","json");
 url.searchParams.set("query",`SELECT DISTINCT ?item ?name ?brand ?image ?date WHERE {
   ?item wdt:P31 wd:Q131746; wdt:P18 ?image; rdfs:label ?name; (wdt:P1716|wdt:P176) ?maker.
   ?maker rdfs:label ?brand. FILTER(LANG(?name)="en" && LANG(?brand)="en")
   OPTIONAL { ?item wdt:P571 ?date. } ${filters}
 } ORDER BY ?name ?item LIMIT 20 OFFSET ${(page-1)*20}`);
 const body=obj(await json(url,signal));
 const bindings=obj(body["results"])["bindings"];
 if(!Array.isArray(bindings))throw Error("Invalid Wikidata results");
 const rows=bindings.map(obj).map(row=>{
   let file="";try{file=decodeURIComponent(value(row["image"]).split("Special:FilePath/")[1]||"");}catch{}
   return {id:value(row["item"]).split("/").pop()||"",name:value(row["name"]),brand:value(row["brand"]),file,year:value(row["date"]).slice(0,4)};
 }).filter(row=>/^Q\d+$/.test(row.id)&&row.name&&row.brand&&/\.(jpe?g|png|webp)$/i.test(row.file)&&!/(?:advertisement|poster|golden moments)/i.test(row.file));
 if(!rows.length)return {source:"wikidata",results:[],total:0,hasMore:bindings.length===20&&page<10};
 const commons=new URL("https://commons.wikimedia.org/w/api.php");
 commons.searchParams.set("action","query");commons.searchParams.set("format","json");
 commons.searchParams.set("titles",[...new Set(rows.map(row=>"File:"+row.file))].join("|"));
 commons.searchParams.set("prop","imageinfo");commons.searchParams.set("iiprop","url|extmetadata");commons.searchParams.set("iiurlwidth","500");
 const photos=obj(obj(await json(commons,signal))["query"])["pages"];
 const pages=Object.values(obj(photos)).map(obj);
 const results:CatalogRecord[]=[];
 for(const row of rows){
   const photo=pages.find(p=>str(p["title"]).replace(/^File:/,"").replace(/_/g," ")===row.file.replace(/_/g," "));
   const info=Array.isArray(photo?.["imageinfo"])?obj(photo["imageinfo"][0]):{};
   const meta=obj(info["extmetadata"]);
   const image=str(info["thumburl"]||info["url"]),source=str(info["descriptionurl"]);
   const licence=plain(obj(meta["LicenseShortName"])["value"]),credit=plain(obj(meta["Artist"])["value"]);
   const licenseUrl=str(obj(meta["LicenseUrl"])["value"]);
   if(!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(image)||!source.startsWith("https://commons.wikimedia.org/")||!licence||!credit)continue;
   results.push({id:"wikidata:"+row.id,name:row.name,brand:row.brand,image,notes:[],top:[],heart:[],base:[],accords:[],
     ...(row.year?{year:row.year}:{}),imageCredit:credit,imageSource:source,imageLicense:licence,
     ...(licenseUrl.startsWith("https://")?{imageLicenseUrl:licenseUrl}:{})});
 }
 return {source:"wikidata",results,total:results.length,hasMore:bindings.length===20&&page<10};
}
