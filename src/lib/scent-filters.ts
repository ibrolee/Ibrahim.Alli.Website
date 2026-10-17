/** Scent Cabinet Discover filtering.
 * Never infer performance or Nigerian retail prices from notes, bottle photos,
 * popularity, or foreign-currency estimated prices.
 * These filters affect already-loaded records only; no requests are made here.
 */
export type DiscoverFilters={
  sort:"relevance"|"name"|"rating"|"longevity"|"projection"|"price-low"|"price-high"|"newest";
  longevity:"any"|"4"|"5";projection:"any"|"4"|"5";
  budget:""|"20000"|"40000"|"60000"|"100000";
  accord:string;gender:"all"|"men"|"women"|"unisex";
  minRating:"any"|"4"|"4.5";season:string;
};
export const DEFAULT_DISCOVER_FILTERS:DiscoverFilters={
  sort:"relevance",longevity:"any",projection:"any",budget:"",
  accord:"all",gender:"all",minRating:"any",season:"all"
};
export type FragranceForFilters={
  id:string;name:string;brand:string;image?:string|undefined;year?:string|undefined;
  family?:string|undefined;notes?:string[]|undefined;accords?:string[]|undefined;
  longevity?:string|undefined;projection?:string|undefined;rating?:number|undefined;
  gender?:string|undefined;bestSeasons?:string[]|undefined;
};
export type PersonalInsightForFilters={priceNGN?:number|undefined;longevity?:string|undefined;projection?:string|undefined};
const LONGEVITY=["poor","weak","moderate","long lasting","very long lasting"];
const PROJECTION=["intimate","soft","moderate","strong","enormous"];
export function valueForLongevity(value?:string):number{
  const v=(value||"").trim().toLowerCase().replace(/[_-]+/g," ");
  const index=LONGEVITY.indexOf(v);
  if(index>=0)return index+1;
  return 0;
}
export function valueForProjection(value?:string):number{
  const v=(value||"").trim().toLowerCase().replace(/[_-]+/g," ");
  const index=PROJECTION.indexOf(v);
  if(index>=0)return index+1;
  return 0;
}
export function filterAndSortDiscover<T extends FragranceForFilters>(
  items:T[],filters:DiscoverFilters,
  insights:Record<string,PersonalInsightForFilters>,
  paidPriceForId:(id:string)=>number|undefined
):T[]{
  const budget=filters.budget?Number(filters.budget):undefined;
  const rating=filters.minRating==="any"?undefined:Number(filters.minRating);
  const isSeason=(p:T)=>p.bestSeasons?.some(s=>s.toLowerCase()===filters.season);
  const priceFor=(p:T)=>{
    const personal=insights[p.id]?.priceNGN;
    const paid=paidPriceForId(p.id);
    return Number.isFinite(personal)?personal:Number.isFinite(paid)?paid:undefined;
  };
  const base=items.filter(p=>{
    const insight=insights[p.id];
    if(filters.longevity!=="any"&&valueForLongevity(insight?.longevity||p.longevity)<Number(filters.longevity))return false;
    if(filters.projection!=="any"&&valueForProjection(insight?.projection||p.projection)<Number(filters.projection))return false;
    if(budget!==undefined){const price=priceFor(p);if(price===undefined||price>budget)return false;}
    if(rating!==undefined&&!(p.rating!==undefined&&p.rating>=rating))return false;
    if(filters.gender!=="all"&&!(p.gender?.toLowerCase().includes(filters.gender)))return false;
    if(filters.accord!=="all"){
      const pool=[...(p.accords||[]),...(p.notes||[]),p.family||""].join(" ").toLowerCase();
      if(!pool.includes(filters.accord.toLowerCase()))return false;
    }
    if(filters.season!=="all"&&!isSeason(p))return false;
    return true;
  });
  if(filters.sort==="relevance")return base;
  const ordered=[...base];
  const num=(v:number|undefined)=>v===undefined||!Number.isFinite(v)?-1:v;
  ordered.sort((a,b)=>{
    switch(filters.sort){
      case "name":return (a.brand+" "+a.name).localeCompare(b.brand+" "+b.name);
      case "rating":return num(b.rating)-num(a.rating);
      case "longevity":return valueForLongevity(insights[b.id]?.longevity||b.longevity)-valueForLongevity(insights[a.id]?.longevity||a.longevity);
      case "projection":return valueForProjection(insights[b.id]?.projection||b.projection)-valueForProjection(insights[a.id]?.projection||a.projection);
      case "price-low":{const ap=priceFor(a),bp=priceFor(b);return ap===undefined?1:bp===undefined?-1:ap-bp;}
      case "price-high":return num(priceFor(b))-num(priceFor(a));
      case "newest":return num(Number(b.year))-num(Number(a.year));
      default:return 0;
    }
  });
  return ordered;
}
