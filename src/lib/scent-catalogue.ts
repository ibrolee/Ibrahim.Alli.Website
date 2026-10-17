import { sameScent, scentIdentity } from "./scent-identity";
import { fragranceMatchScore } from "./scent-search";
import type { CatalogRecord, SearchResult } from "./scent-providers";

export const CATALOG_PROVIDERS=["noteboxd","fragella","beautyfacts","productsfacts","wikidata"] as const;
export type CatalogProvider=typeof CATALOG_PROVIDERS[number];
export type CatalogSource=CatalogProvider|"auto"|"free";
export const FREE_PROVIDERS:CatalogProvider[]=["beautyfacts","productsfacts","wikidata"];
export const PROVIDER_NAMES:Record<CatalogProvider,string>={noteboxd:"Noteboxd",fragella:"Fragella",beautyfacts:"Open Beauty Facts",productsfacts:"Open Products Facts",wikidata:"Wikidata"};
export type SourceOutcome={source:CatalogProvider;status:"ok"|"unavailable"|"not-configured"|"exhausted";count:number};

function richness(p:CatalogRecord):number {
  return p.notes.length+p.top.length+p.heart.length+p.base.length+p.accords.length+
    (p.longevity?3:0)+(p.projection?3:0)+(p.rating?2:0)+(p.description?1:0);
}
export function mergeCatalogue(groups:CatalogRecord[][],query=""):CatalogRecord[] {
  const merged:CatalogRecord[]=[];
  for(const record of groups.flat()){
    // Metadata without a photo may enrich an existing record, but never creates
    // a blank discovery card. Both source identities survive in aliases.
    const index=merged.findIndex(p=>sameScent(p,record));
    if(index<0){merged.push({...record});continue;}
    const old=merged[index]!;
    const preferred=richness(record)>richness(old)?record:old;
    const other=preferred===record?old:record;
    const combined={...other,...preferred,id:old.id,aliases:[...new Set([old.id,record.id,...(old.aliases||[]),...(record.aliases||[])])],
      sources:[...new Set([...(old.sources||[]),...(record.sources||[])])]};
    for(const key of ["notes","top","heart","base","accords"] as const){
      // Preserve the richer pyramid; fill only missing sections from a match.
      combined[key]=preferred[key].length?preferred[key]:other[key];
    }
    for(const key of ["image","year","description","longevity","projection","rating","gender","bestSeasons","bestOccasions","imageCredit","imageSource","imageLicense","imageLicenseUrl"] as const){
      if(!combined[key]&&other[key])Object.assign(combined,{[key]:other[key]});
    }
    // Keep a known concentration to avoid merging a later EDT into an EDP whose
    // dedicated catalogue record omitted the concentration in its name.
    if(!scentIdentity(preferred).concentration&&scentIdentity(other).concentration)combined.family=scentIdentity(other).concentration;
    const photoOwner=preferred.image?preferred:other;
    for(const key of ["imageCredit","imageSource","imageLicense","imageLicenseUrl"] as const){
      delete combined[key];if(photoOwner[key])combined[key]=photoOwner[key];
    }
    merged[index]=combined;
  }
  // Keep only products whose brand/name actually answers the query.
  // Provider search often returns unrelated items from broad brand/category hits.
  return merged.filter(p=>p.image?.startsWith("https://")&&(!query||fragranceMatchScore(p,query)>0))
    .sort((a,b)=>query?
      fragranceMatchScore(b,query)-fragranceMatchScore(a,query)||richness(b)-richness(a):0);
}

export async function collectCatalogues(
  sources:CatalogProvider[],
  load:(source:CatalogProvider)=>Promise<SearchResult|null>,
  query="",
):Promise<{results:CatalogRecord[];hasMore:boolean;sources:CatalogProvider[];sourceStatus:SourceOutcome[]}> {
  // Parallel independent catalogues: one failure or timeout cannot discard
  // successful siblings and there is no first-success short circuit.
  const settled=await Promise.allSettled(sources.map(async source=>{
    const found=await load(source);
    return found?{...found,results:found.results.map(p=>({...p,sources:[source]}))}:null;
  }));
  const groups:CatalogRecord[][]=[];const used:CatalogProvider[]=[];const status:SourceOutcome[]=[];
  let hasMore=false;
  settled.forEach((entry,index)=>{
    const source=sources[index]!;
    if(entry.status==="rejected"){status.push({source,status:"unavailable",count:0});return;}
    if(!entry.value){status.push({source,status:"exhausted",count:0});return;}
    const result=entry.value;groups.push(result.results);hasMore ||= result.hasMore;
    status.push({source,status:"ok",count:result.results.filter(p=>p.image).length});
    if(result.results.length)used.push(source);
  });
  return {results:mergeCatalogue(groups,query),hasMore,sources:used,sourceStatus:status};
}
