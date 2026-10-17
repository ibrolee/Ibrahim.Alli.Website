/** Conservative cross-catalogue identity. Never collapse flankers or known concentrations. */
export type ScentIdentity = { id:string; name:string; brand:string; family?:string|undefined; aliases?:string[]|undefined };
const brandAliases:Record<string,string>={
  "ysl":"yves saint laurent", "mfk":"maison francis kurkdjian",
  "bvlgari":"bulgari", "dolce gabbana":"dolce and gabbana",
  "d g":"dolce and gabbana", "d and g":"dolce and gabbana", "paco rabanne":"rabanne",
  "christian dior":"dior", "jean paul gaultier paris":"jean paul gaultier",
};
export function scentText(value:string):string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
    .replace(/&/g," and ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
}
function brandKey(value:string):string {const key=scentText(value);return brandAliases[key]||key;}
export function scentIdentity(p:ScentIdentity):{key:string;concentration:string} {
  const brand=brandKey(p.brand);
  let name=scentText(p.name.replace(/\b\d+(?:[.,]\d+)?\s*(?:fl\.?\s*oz\.?|ml|cl|litres?|liters?)\b/gi," "));
  const concentration=(name+" "+scentText(p.family||"")).match(/\b(eau de parfum|eau de toilette|eau de cologne|extrait de parfum|extrait|edp|edt|edc|parfum)\b/)?.[0]||"";
  const concentrationKey=({edp:"eau de parfum",edt:"eau de toilette",edc:"eau de cologne",extrait:"extrait de parfum"} as Record<string,string>)[concentration]||concentration;
  // Only size, packaging and concentration labels are removed. Intense, Elixir,
  // Le Parfum, Sport, Absolu, gender and every other flanker token stay intact.
  name=name.replace(/\b(?:eau de parfum|eau de toilette|eau de cologne|extrait de parfum|edp|edt|edc)\b/g," ")
    .replace(/\b(?:natural spray|spray|vaporisateur|refillable|rechargeable)\b/g," ").trim().replace(/\s+/g," ");
  const matchingBrands=[scentText(p.brand),brand,...Object.keys(brandAliases).filter(alias=>brandAliases[alias]===brand)].sort((a,b)=>b.length-a.length);
  for(const raw of matchingBrands) {
    if(raw&&name.startsWith(raw+" "))name=name.slice(raw.length+1);
    if(raw&&name.endsWith(" "+raw))name=name.slice(0,-raw.length-1);
  }
  return {key:brand+":"+name,concentration:concentrationKey};
}
function barcode(p:ScentIdentity):string|undefined {return p.id.match(/(?:^|:)(?:beautyfacts|productsfacts):(\d{8,14})$/)?.[1];}
export function sameScent(a:ScentIdentity,b:ScentIdentity):boolean {
  // Separately entered personal bottles stay separate in collection/combos.
  if(a.id.startsWith("manual:")||b.id.startsWith("manual:"))return a.id===b.id;
  const x=scentIdentity(a),y=scentIdentity(b);
  // An explicit concentration disagreement always wins, even if a catalogue
  // accidentally assigns one barcode/alias to both variants.
  if(x.concentration&&y.concentration&&x.concentration!==y.concentration)return false;
  if(a.id===b.id||a.aliases?.includes(b.id)||b.aliases?.includes(a.id))return true;
  const code=barcode(a);if(code&&code===barcode(b))return true;
  if(x.key===y.key)return true;
  const unknown=(p:ScentIdentity)=>/^(unknown brand|unknown house|unknown)$/.test(scentText(p.brand));
  // Some public entries put the complete brand in the product title and leave
  // the brand field blank. Require that brand in the title before matching it.
  if(unknown(a)&&!unknown(b)&&scentText(a.name).includes(scentText(b.brand)))return scentIdentity({...a,brand:b.brand}).key===y.key;
  if(unknown(b)&&!unknown(a)&&scentText(b.name).includes(scentText(a.brand)))return scentIdentity({...b,brand:a.brand}).key===x.key;
  return false;
}
