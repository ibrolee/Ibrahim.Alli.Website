import { scentText } from "./scent-identity";

/** Small, conservative typo tolerance. A name or brand must match: scent notes
 * and generic "perfume" categories cannot make an unrelated result relevant. */
export type SearchableScent={name:string;brand:string;family?:string|undefined};

function compact(value:string):string{return scentText(value).replace(/ /g,"");}
function words(value:string):string[]{return scentText(value).split(" ").filter(Boolean);}
function cleanQuery(value:string):string {
  return scentText(value.replace(/\b\d+(?:[.,]\d+)?\s*(?:ml|fl\.?\s*oz\.?|cl)\b/gi," "));
}
function near(a:string,b:string):boolean {
  if(a===b || (a.length>=3 && b.startsWith(a)))return true;
  if(a.length<4 || Math.abs(a.length-b.length)>2 || a[0]!==b[0])return false;
  const max=a.length>=7?2:1;
  let previous=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){
    const next=[i];
    for(let j=1;j<=b.length;j++)
      next.push(Math.min(next[j-1]!+1,previous[j]!+1,previous[j-1]!+(a[i-1]===b[j-1]?0:1)));
    if(Math.min(...next)>max)return false;
    previous=next;
  }
  return previous[b.length]!<=max;
}
export function fragranceMatchScore(item:SearchableScent,query:string):number {
  const q=cleanQuery(query);
  if(!q)return 0;
  const brand=scentText(item.brand),name=scentText(item.name);
  const label=(brand+" "+name).trim();
  const qJoined=compact(q),labelJoined=compact(label),nameJoined=compact(name);
  if(qJoined.length>=4 && nameJoined===qJoined)return 1000;
  if(qJoined.length>=4 && labelJoined===qJoined)return 990;
  if(qJoined.length>=4 && nameJoined.startsWith(qJoined))return 920;
  if(qJoined.length>=4 && labelJoined.includes(qJoined))return 850;
  const tokens=words(q);
  const available=words(label);
  if(!tokens.length)return 0;
  let score=0;
  for(const token of tokens){
    if(available.includes(token))score+=110;
    else if(available.some(w=>w.startsWith(token)&&token.length>=3))score+=86;
    else if(available.some(w=>near(token,w)))score+=40;
    else return 0; // Every meaningful query word must be accounted for.
  }
  return score+(brand===q?60:0)+(name.includes(q)?100:0);
}

/** One capped wider query only when strict searches find no photographed matches.
 * Limit to one useful token or short prefix; never fan out into many paid calls. */
export function broaderSearchTerm(value:string):string|undefined {
  const q=cleanQuery(value),tokens=words(q).filter(w=>w.length>=4);
  if(!q || !tokens.length)return undefined;
  const wider=tokens.length>1?tokens[0]!:tokens[0]!.slice(0,tokens[0]!.length>=8?5:4);
  return wider && wider!==q?wider:undefined;
}
