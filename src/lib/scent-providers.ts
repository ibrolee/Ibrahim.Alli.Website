/** Provider adapters for Scent Cabinet.
 * Keep secrets server-side; present genuine provider bottle photos only.
 * Providers: Noteboxd (preferred, 50 free calls/day), Fragella (fallback, 20 free calls/month).
 */
export type CatalogRecord={
 id:string;name:string;brand:string;image?:string;year?:string;family?:string;
 description?:string;top:string[];heart:string[];base:string[];notes:string[];accords:string[];
 longevity?:string;projection?:string;rating?:number;gender?:string;popularity?:string;bestSeasons?:string[];bestOccasions?:string[];
};
export type SearchResult={results:CatalogRecord[];hasMore:boolean;source:"noteboxd"|"fragella"|"beautyfacts"|"productsfacts";total:number};
function str(value:unknown):string{return typeof value==="string"?value.trim():"";}
function maybeObj(value:unknown):Record<string,unknown>{
 return value&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:{};
}
function text(value:unknown):string{
 if(typeof value==="string")return value.trim();
 if(typeof value==="number")return String(value);
 if(value&&typeof value==="object"){
   const x=maybeObj(value);
   return text(x["name"]||x["label"]||x["value"]||x["title"]);
 }
 return "";
}
function notes(value:unknown):string[]{
 if(Array.isArray(value))return [...new Set(value.flatMap(x=>{
    if(typeof x==="string")return x.split(/[,;|]/).map(s=>s.trim()).filter(Boolean);
    if(x&&typeof x==="object"){
      const y=maybeObj(x);const name=text(y["name"]||y["note"]||y["label"]||y["note_name"]);
      return name?[name]:[];
    }
    return [];
 }))].slice(0,35);
 if(typeof value==="string")return value.split(/[,;|]/).map(s=>s.trim()).filter(Boolean).slice(0,35);
 if(value&&typeof value==="object"){
   const x=maybeObj(value);
   return notes(x["notes"]||x["items"]||x["values"]);
 }
 return [];
}
function image(value:unknown):string|undefined{
 if(typeof value==="string"&&/^https:\/\//i.test(value))return value;
 if(value&&typeof value==="object"){
  if(Array.isArray(value)){for(const v of value){const img=image(v);if(img)return img;}return;}
  const v=maybeObj(value);
  for(const key of ["url","src","full","original","large","medium","thumbnail","image_url","secure_url"]){
    const img=image(v[key]);if(img)return img;
  }
 }
 return;
}
function selectImage(x:Record<string,unknown>):string|undefined{
 for(const k of ["Image URL","Image URL Transparent","cover_art_url","coverArtUrl","cover_art","coverArt","cover","image_url","imageUrl","image","images","photo_url","photoUrl","photo","thumbnail_url","thumbnail","picture"]){
  const img=image(x[k]);if(img)return img;
 }
 return undefined;
}
function brandName(value:unknown):string{
 return text(value)||"Unknown brand";
}
export function normalizeProviderRecord(raw:unknown,source:"noteboxd"|"fragella"):CatalogRecord|null{
 const wrapper=maybeObj(raw);
 const x=Object.keys(maybeObj(wrapper["fragrance"])).length?maybeObj(wrapper["fragrance"]):
   Object.keys(maybeObj(wrapper["product"])).length?maybeObj(wrapper["product"]):wrapper;
 const name=text(x["Name"]||x["name"]||x["fragrance_name"]||x["perfume_name"]||x["title"]);
 if(!name)return null;
 const brand=brandName(x["Brand"]||x["brand"]||x["brand_name"]||x["house"]||x["designer"]);
 const uniqueID=text(x["_id"]||x["id"]||x["slug"]||x["uuid"])||[brand,name].join(":").toLowerCase().replace(/[^a-z0-9]+/g,"-");
 const pyramid=maybeObj(x["Notes"]||x["note_pyramid"]||x["notePyramid"]||x["pyramid"]||x["fragrance_notes"]);
 const top=notes(pyramid["Top"]||pyramid["top"]||pyramid["top_notes"]||x["top_notes"]||x["notes_top"]||x["topNotes"]);
 const heart=notes(pyramid["Middle"]||pyramid["Heart"]||pyramid["middle"]||pyramid["heart"]||x["middle_notes"]||x["heart_notes"]||x["notes_middle"]||x["heartNotes"]);
 const base=notes(pyramid["Base"]||pyramid["base"]||pyramid["base_notes"]||x["base_notes"]||x["notes_base"]||x["baseNotes"]);
 const general=notes(x["General Notes"]||x["general_notes"]||x["notes"]||pyramid["general"]);
 const accords=notes(x["Main Accords"]||x["main_accords"]||x["mainAccords"]||x["accords"]);
 const year=text(x["Year"]||x["year"]||x["release_year"]||x["launch_year"]||x["launchYear"]);
 const family=text(x["family"]||x["fragrance_family"]||x["scent_family"]||x["concentration"]||x["OilType"]);
 const description=text(x["description"]||x["Description"]||x["summary"]);
 const record:CatalogRecord={id:source+":"+uniqueID,brand,name,top,heart,base,notes:[...new Set([...general,...top,...heart,...base])],accords};
 const longevity=text(x["Longevity"]||x["longevity"]);if(longevity)record.longevity=longevity.slice(0,45);
 const projection=text(x["Sillage"]||x["sillage"]||x["projection"]);if(projection)record.projection=projection.slice(0,45);
 const rating=Number(x["rating"]??x["Rating"]??x["average_rating"]);
 if(Number.isFinite(rating)&&rating>0&&rating<=5)record.rating=rating;
 const gender=text(x["Gender"]||x["gender"]);if(gender)record.gender=gender.slice(0,40);
 const popularity=text(x["Popularity"]||x["popularity"]);if(popularity)record.popularity=popularity.slice(0,35);
 const ranking=(raw:unknown):string[]=>Array.isArray(raw)?raw.slice(0,4).map(v=>text(v)).filter(Boolean):[];
 const seasons=ranking(x["Season Ranking"]||x["season_ranking"]||x["seasons"]);
 const occasions=ranking(x["Occasion Ranking"]||x["occasion_ranking"]||x["occasions"]);
 if(seasons.length)record.bestSeasons=seasons;
 if(occasions.length)record.bestOccasions=occasions;
 const url=selectImage(x);
 if(url)record.image=url;
 if(year)record.year=year;
 if(family)record.family=family;
 if(description)record.description=description.slice(0,900);
 return record;
}
function getRecords(payload:unknown):unknown[]{
 if(Array.isArray(payload))return payload;
 const x=maybeObj(payload);
 for(const key of ["fragrances","results","items","data","hits","records","perfumes"]){
  const v=x[key];
  if(Array.isArray(v))return v;
  if(v&&typeof v==="object"){
    const nested=maybeObj(v);
    for(const k of ["items","results","fragrances","data","edges","nodes"]){
      if(Array.isArray(nested[k]))return nested[k] as unknown[];
    }
  }
 }
 return [];
}
export async function searchNoteboxd(q:string,key:string):Promise<SearchResult>{
 const url=new URL("https://api.noteboxd.com/v1/fragrances");
 url.searchParams.set("q",q);
 url.searchParams.set("limit","40");
 const response=await fetch(url.toString(),{
  headers:{"Authorization":"Bearer "+key,"Accept":"application/json"},
  signal:AbortSignal.timeout(10000)
 });
 if(!response.ok)throw new Error("Noteboxd HTTP "+response.status);
 if(!(response.headers.get("content-type")||"").includes("json"))throw new Error("Noteboxd returned non-JSON");
 const body=await response.text();
 if(body.length>2_000_000)throw new Error("Noteboxd response too large");
 const parsed:unknown=JSON.parse(body);
 const records=getRecords(parsed);
 if(!records.length && !Array.isArray(parsed)&&!["results","data","items","fragrances"].some(k=>k in maybeObj(parsed)))throw new Error("Unexpected Noteboxd response");
 const result=records.map(r=>normalizeProviderRecord(r,"noteboxd")).filter((r):r is CatalogRecord=>r!==null);
 return {results:result,total:result.length,hasMore:false,source:"noteboxd"};
}
export async function searchFragella(q:string,key:string,page:number):Promise<SearchResult>{
 const url=new URL("https://api.fragella.com/api/v1/fragrances");
 url.searchParams.set("search",q);url.searchParams.set("page",String(page));url.searchParams.set("limit","10");
 const response=await fetch(url.toString(),{headers:{"x-api-key":key,Accept:"application/json"},signal:AbortSignal.timeout(8500)});
 if(!response.ok)throw new Error("Fragella HTTP "+response.status);
 if(!(response.headers.get("content-type")||"").includes("json"))throw new Error("Fragella returned non-JSON");
 const body=await response.text();
 if(body.length>1_000_000)throw new Error("Fragella response too large");
 const parsed:unknown=JSON.parse(body);const wrapper=maybeObj(parsed);const list=getRecords(parsed);
 if(!Array.isArray(parsed)&&!Array.isArray(wrapper["data"]))throw new Error("Unexpected Fragella response");
 const results=list.map(r=>normalizeProviderRecord(r,"fragella")).filter((r):r is CatalogRecord=>r!==null);
 const pagination=maybeObj(wrapper["pagination"]);
 const next=pagination["has_more"]??pagination["hasNextPage"]??(page===1&&list.length===10);
 return {results,total:Number(pagination["total"]||0)||results.length,hasMore:Boolean(next)&&page<2,source:"fragella"};
}

/** Public product catalogues: these do not use limited private fragrance API keys.
 * Open Beauty Facts / Open Products Facts catalogue data © contributors, ODbL.
 * Bottles are user-supplied product images; attribution is shown in Discover.
 * Text search uses the legacy CGI endpoint, since v2 product search is filter-only.
 */
export type OpenCatalogSource="beautyfacts"|"productsfacts";
export async function searchOpenFacts(q:string,page:number,source:OpenCatalogSource):Promise<SearchResult & {source:OpenCatalogSource}>{
 const host=source==="beautyfacts"?"world.openbeautyfacts.org":"world.openproductsfacts.org";
 const url=new URL("https://"+host+"/cgi/search.pl");
 url.searchParams.set("search_terms",q);
 url.searchParams.set("search_simple","1");
 url.searchParams.set("action","process");
 url.searchParams.set("json","1");
 url.searchParams.set("page_size","40");
 url.searchParams.set("page",String(page));
 url.searchParams.set("fields","code,product_name,product_name_en,brands,image_front_url,image_url,categories_tags,quantity");
 const response=await fetch(url.toString(),{
  headers:{"Accept":"application/json","User-Agent":"ScentCabinet/1.0 (https://ibrahimalli.com; personal fragrance catalogue)"},
  signal:AbortSignal.timeout(8500)
 });
 if(!response.ok)throw new Error(source+" HTTP "+response.status);
 if(!(response.headers.get("content-type")||"").includes("json"))throw new Error(source+" returned non-JSON");
 const body=await response.text();if(body.length>1_500_000)throw new Error(source+" response too large");
 const payload:unknown=JSON.parse(body);
 const x=maybeObj(payload);
 if(!Array.isArray(x["products"]))throw new Error(source+" invalid product results");
 const products=x["products"] as unknown[];
 const seen=new Set<string>();
 const results:CatalogRecord[]=[];
 const normalizedQuery=q.toLowerCase().trim();
 const terms=normalizedQuery.split(/\s+/).filter(Boolean);
 for(const product of products){
   const row=maybeObj(product);
   const rawName=text(row["product_name_en"]||row["product_name"]);
   const brand=text(row["brands"]).split(",")[0]?.trim()||"Unknown brand";
   const urlImage=image(row["image_front_url"]||row["image_url"]);
   const cat=Array.isArray(row["categories_tags"])?row["categories_tags"].map(text).join(" ").toLowerCase():"";
   const label=(brand+" "+rawName).toLowerCase();
   // Reject deodorants, cosmetics and unrelated products even when the brand matches.
   const excluded=/deodorant|roll.on|aftershave balm|body lotion|shower gel|soap|candle|diffuser|room spray|hair mist|anti.perspirant|body wash/i;
   const fragrance=/perfume|parfum|fragrance|cologne|toilette|attar|oud|eau de|extrait|elixir/i;
   if(!rawName||!urlImage||excluded.test(label+" "+cat))continue;
   if(!fragrance.test(label+" "+cat) && !terms.every(t=>label.includes(t)))continue;
   if(!terms.some(t=>t.length>=3 && label.includes(t)))continue;
   const barcode=text(row["code"]);const identity=barcode||[brand,rawName].join(":").toLowerCase().replace(/[^a-z0-9]+/g,"-");
   if(seen.has(identity))continue;seen.add(identity);
   results.push({
     id:source+":"+identity,brand,name:rawName,image:urlImage,
     notes:[],top:[],heart:[],base:[],accords:[],
     family:cat.includes("eau-de-parfum")?"Eau de Parfum":cat.includes("eau-de-toilette")?"Eau de Toilette":"Fragrance"
   });
 }
 const total=Number(x["count"])||0;
 return {results,total,source,hasMore:page<2&&total>page*40&&products.length>0};
}
