import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronDown, CloudOff, Download, FlaskConical, Heart, Layers, Plus, Search, ShoppingBag, Sparkles, Trash2, Upload, Wallet, X } from "lucide-react";
import { seedSearch } from "@/lib/scent-catalog-seed";
import css from "../fragrance.css?url";

type Currency = "NGN" | "USD";
type Page = "collection" | "discover" | "wishlist" | "worth" | "layer";
type Perfume = { id: string; name: string; brand: string; image?: string | undefined; year?: string | undefined; family?: string | undefined; description?: string | undefined; notes: string[]; top: string[]; heart: string[]; base: string[]; accords: string[] };
type Owned = { perfume: Perfume; amount: number; currency: Currency; added: string; favorite?: boolean };
type Mix = { id: string; left: string; right: string; date: string };
type State = { collection: Owned[]; wishlist: Perfume[]; mixes: Mix[] };
const STORAGE = "ia-scent-cabinet-v1";
const initial: State = { collection: [], wishlist: [], mixes: [] };
const API = "/api/fragrance";

function bits(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(bits).slice(0, 35);
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (o["name"] || o["note"] || o["label"]) return bits(o["name"] || o["note"] || o["label"]);
    return Object.values(o).flatMap(bits).slice(0, 35);
  }
  return String(value).split(/[,;|]/).map(s => s.trim()).filter(Boolean).slice(0, 35);
}
function imageFrom(d: Record<string, any>): string | undefined {
  const candidates = [d["Image URL Transparent"],d["Image URL"],d["image_url"],d["image"],d["imageUrl"],d["photo"],d["thumbnail"],d["images"]];
  for (const c of candidates) {
    const val = typeof c === "string" ? c : Array.isArray(c) ? c[0] : c?.url || c?.src;
    if (typeof val === "string" && /^https:\/\//i.test(val)) return val;
  }
  return undefined;
}
function normalize(row: any): Perfume | null {
  const d = row?.data && typeof row.data === "object" ? row.data : row;
  if (!d || typeof d !== "object") return null;
  const name = String(d.Name || d.name || d.fragrance_name || d.perfume || d.title || "").trim();
  const rawBrand = d.Brand || d.brand || d.house || d.brand_name || "";
  const brand = typeof rawBrand === "object" ? String(rawBrand?.name || "Unknown house") : String(rawBrand || "Unknown house");
  if (!name) return null;
  const top = bits(d.top_notes || d.top || d["Top Notes"] || d.Top);
  const heart = bits(d.middle_notes || d.heart_notes || d.heart || d["Middle Notes"] || d.Heart);
  const base = bits(d.base_notes || d.base || d["Base Notes"] || d.Base);
  return {
    id: "db:" + String(row.id || d.id || brand + ":" + name),
    name, brand, image: imageFrom(d), top, heart, base,
    notes: [...new Set([...bits(d.notes || d.Notes || d.note_pyramid),...top,...heart,...base])],
    accords: bits(d.accords || d.Accords || d.main_accords || d["Main Accords"]),
    year: String(d.year || d.Year || d.release_year || ""), family: String(d.family || d.Family || d.fragrance_family || ""),
    description: String(d.description || d.Description || "").slice(0, 900)
  };
}
function sanitize(source: any): State {
  if (!source || typeof source !== "object") return initial;
  const valid = (p: any) => p && typeof p.id === "string" && typeof p.name === "string" && typeof p.brand === "string";
  const perfume = (p: any): Perfume => ({ id:p.id, name:p.name, brand:p.brand, image:typeof p.image==="string" ? p.image : undefined, year:p.year, family:p.family, description:p.description, notes:bits(p.notes), top:bits(p.top),heart:bits(p.heart),base:bits(p.base),accords:bits(p.accords) });
  return {
    collection: (Array.isArray(source.collection)?source.collection:[]).filter((x:any)=>valid(x?.perfume)).slice(0,5000).map((x:any)=>({perfume:perfume(x.perfume), amount:Math.max(0,Number(x.amount)||0),currency:x.currency==="USD"?"USD":"NGN",added:String(x.added||new Date().toISOString()),favorite:Boolean(x.favorite)})),
    wishlist: (Array.isArray(source.wishlist)?source.wishlist:[]).filter(valid).slice(0,5000).map(perfume),
    mixes: (Array.isArray(source.mixes)?source.mixes:[]).filter((m:any)=>m&&typeof m.left==="string"&&typeof m.right==="string").slice(0,1000)
  };
}
function money(value:number,c:Currency) { return new Intl.NumberFormat("en-US",{style:"currency",currency:c,minimumFractionDigits:0,maximumFractionDigits:2}).format(value).replace("NGN","₦"); }
function pic(p:Perfume,size="card"){
  // Branded bottle photographs come only from verified catalogue URLs.
  // If none exists, draw clearly illustrative bottle artwork rather than a blank/broken photo.
  const hue=Array.from(p.brand+" "+p.name).reduce((a,c)=>a+c.charCodeAt(0),0)%5;
  const shortBrand=p.brand.replace(/\s*\(.*\)/,"");
  return <span className={"sc-art sc-art-"+hue} aria-label={!p.image?"Bottle illustration, photo unavailable":undefined}>
    <span className="sc-bottle"><span className="sc-bottle-cap"/><span className="sc-bottle-neck"/><span className="sc-bottle-glass"><span className="sc-bottle-label"><small>{shortBrand}</small><strong>{p.name}</strong></span></span></span>
    {p.image&&<img loading={size==="hero"?"eager":"lazy"} decoding="async" src={p.image} alt={p.brand+" "+p.name+" perfume bottle"} onError={e=>{e.currentTarget.style.display="none"}}/>}
  </span>;
}
function today(){return new Date().toISOString().slice(0,10);}
function id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
export const Route=createFileRoute("/fragrance")({
  head:()=>({meta:[
    {title:"Scent Cabinet — Ibrahim Alli's Fragrance Journal"},
    {name:"description",content:"A personal fragrance collection and wishlist by Ibrahim Alli."},
    {name:"robots",content:"noindex,nofollow"},
    {name:"theme-color",content:"#f5f0e6"},
    {name:"apple-mobile-web-app-capable",content:"yes"},
    {name:"apple-mobile-web-app-title",content:"Scent Cabinet"},
    {name:"apple-mobile-web-app-status-bar-style",content:"default"}
  ],links:[{rel:"stylesheet",href:css},{rel:"manifest",href:"/fragrance.webmanifest"},{rel:"apple-touch-icon",href:"/fragrance-icon.svg"},{rel:"canonical",href:"https://ibrahimalli.com/fragrance"}]}),
  component:Fragrance
});
function Fragrance(){
  const [page,setPage]=useState<Page>("collection");
  const [store,setStore]=useState<State>(initial);
  const [ready,setReady]=useState(false);
  const [query,setQuery]=useState("");
  const [results,setResults]=useState<Perfume[]>([]);
  const [catalogPage,setCatalogPage]=useState(1);
  const [hasMore,setHasMore]=useState(false);
  const [searching,setSearching]=useState(false);
  const [error,setError]=useState("");
  const [catalogueNotice,setCatalogueNotice]=useState("");
  const [photos,setPhotos]=useState<Record<string,string>>({});
  const photoRequested=useRef(new Set<string>());
  const [refreshKey,setRefreshKey]=useState(0);
  const [selected,setSelected]=useState<Perfume|null>(null);
  const [priceOpen,setPriceOpen]=useState<Perfume|null>(null);
  const [price,setPrice]=useState("");
  const [layerA,setLayerA]=useState("");
  const [layerB,setLayerB]=useState("");
  const [sort,setSort]=useState("newest");
  const [filter,setFilter]=useState("");
  const [backupOpen,setBackupOpen]=useState(false);
  const fileRef=useRef<HTMLInputElement>(null);
  const searchId=useRef(0);
  useEffect(()=>{try{const s=localStorage.getItem(STORAGE);if(s)setStore(sanitize(JSON.parse(s)));}catch{}setReady(true)},[]);
  useEffect(()=>{if(ready)try{localStorage.setItem(STORAGE,JSON.stringify(store));}catch{setError("Your browser storage is full. Export your collection to keep a backup.");}},[store,ready]);
  useEffect(()=>{
    const source=page==="discover"?results:page==="collection"?store.collection.map(x=>x.perfume):page==="wishlist"?store.wishlist:[];
    const missing=source.filter(p=>!p.image&&!photos[p.id]&&(p.id.startsWith("db:seed:")||p.id.startsWith("seed:"))&&!photoRequested.current.has(p.id)).slice(0,12);
    if(!missing.length)return;
    missing.forEach(p=>photoRequested.current.add(p.id));
    const url=API+"/images?items="+encodeURIComponent(JSON.stringify(missing.map(p=>({id:p.id,brand:p.brand,name:p.name}))));
    const ctrl=new AbortController();
    fetch(url,{signal:ctrl.signal}).then(res=>res.ok?res.json():null).then(data=>{
      if(data&&data.images&&typeof data.images==="object")setPhotos(current=>({...current,...data.images}));
    }).catch(()=>{});
    return()=>ctrl.abort();
  },[page,results,store.collection,store.wishlist]);
  function resolved(p:Perfume){return photos[p.id]?{...p,image:photos[p.id]}:p;}
  const ownedMap=useMemo(()=>new Map(store.collection.map(x=>[x.perfume.id,x])),[store.collection]);
  const wishIds=useMemo(()=>new Set(store.wishlist.map(x=>x.id)),[store.wishlist]);
  const moneyNGN=store.collection.filter(x=>x.currency==="NGN").reduce((s,x)=>s+x.amount,0);
  const legacyUSD=store.collection.filter(x=>x.currency==="USD").length;
  const list=useMemo(()=>store.collection.filter(x=>(x.perfume.name+" "+x.perfume.brand).toLowerCase().includes(filter.toLowerCase())).sort((a,b)=>sort==="price"?b.amount-a.amount:sort==="alpha"?(a.perfume.name.localeCompare(b.perfume.name)):sort==="favorite"?Number(Boolean(b.favorite))-Number(Boolean(a.favorite)):b.added.localeCompare(a.added)),[store.collection,filter,sort]);
  function go(p:Page){setPage(p);setSelected(null);window.scrollTo({top:0,behavior:"smooth"});}
  function isOwned(p:Perfume){return ownedMap.has(p.id);}
  function wish(p:Perfume){p=resolved(p);setStore(s=>({...s,wishlist:s.wishlist.some(x=>x.id===p.id)?s.wishlist.filter(x=>x.id!==p.id):[p,...s.wishlist]}));}
  function openPrice(p:Perfume){p=resolved(p);setSelected(null);setPriceOpen(p);const old=ownedMap.get(p.id);setPrice(old?.currency==="NGN"?String(old.amount):"");}
  function savePrice(e:React.FormEvent){e.preventDefault();if(!priceOpen)return;const n=Number(price);if(!Number.isFinite(n)||n<0||price.trim()==="")return;const old=ownedMap.get(priceOpen.id);const item:Owned={perfume:priceOpen,amount:n,currency:"NGN",added:old?.added||new Date().toISOString(),favorite:old?.favorite||false};setStore(s=>({...s,collection:[item,...s.collection.filter(x=>x.perfume.id!==priceOpen.id)],wishlist:s.wishlist.filter(x=>x.id!==priceOpen.id)}));setPriceOpen(null);}
  function remove(p:Perfume){if(!window.confirm("Remove "+p.name+" from your collection?"))return;setStore(s=>({...s,collection:s.collection.filter(x=>x.perfume.id!==p.id)}));setSelected(null);}
  function favorite(p:Perfume){setStore(s=>({...s,collection:s.collection.map(x=>x.perfume.id===p.id?{...x,favorite:!x.favorite}:x)}));}
  function exportBackup(){const blob=new Blob([JSON.stringify({app:"Scent Cabinet",version:1,exportedAt:new Date().toISOString(),...store},null,2)],{type:"application/json"});const href=URL.createObjectURL(blob);const a=document.createElement("a");a.href=href;a.download="scent-cabinet-backup-"+today()+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),500);}
  async function importBackup(e:React.ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0];if(!f)return;try{if(f.size>4_000_000)throw Error("That file is too large");const value=JSON.parse(await f.text());if(!Array.isArray(value.collection)||!Array.isArray(value.wishlist))throw Error("Not a Scent Cabinet backup");if(!window.confirm("Replace this browser's collection and wishlist with the backup?"))return;setStore(sanitize(value));setBackupOpen(false);}catch(err){alert("Could not import backup: "+String(err instanceof Error?err.message:err));}finally{e.target.value="";}}
  useEffect(()=>{
    if(page!=="discover")return;
    const n=++searchId.current;const ctrl=new AbortController();
    const delay=setTimeout(async()=>{
      setSearching(true);setError("");setCatalogueNotice("");
      try{
        const params=new URLSearchParams({page:String(catalogPage),per_page:"20"});
        if(query.trim())params.set("q",query.trim());else params.set("sort","year_desc");
        const path=query.trim()?"/search":"/browse";
        const t=setTimeout(()=>ctrl.abort(),14000);
        let response:Response;
        try{response=await fetch(API+path+"?"+params,{signal:ctrl.signal,headers:{Accept:"application/json"}});}finally{clearTimeout(t);}
        if(!response.ok)throw Error("The fragrance database responded "+response.status);
        const payload=await response.json();
        setCatalogueNotice(typeof payload.providerWarning === "string" ? payload.providerWarning : payload.source === "curated" ? "Showing the built-in fragrance selection; search for more using the community catalogue." : "Community product images and names: Open Beauty Facts. Scent notes appear only when reliably available.");
        const rows=Array.isArray(payload)?payload:payload.results||payload.fragrances||payload.items||payload.data?.results;
        if(!Array.isArray(rows))throw Error("Catalogue format not recognised");
        const items=rows.map(normalize).filter((p:Perfume|null):p is Perfume=>Boolean(p));
        if(n!==searchId.current)return;
        setResults(old=>catalogPage===1?items:[...old,...items.filter(x=>!old.some(y=>x.id===y.id))]);
        const total=Number(payload.total);
        setHasMore(Number.isFinite(total)&&total>0?catalogPage*20<total:rows.length===20);
        try{sessionStorage.setItem("ia-scent-last-search",JSON.stringify({query,page:catalogPage,items,time:Date.now()}));}catch{}
      }catch(err){
        if(n!==searchId.current||ctrl.signal.aborted)return;
        setError("Online search is currently unavailable. Showing the built-in selection.");
        const local=seedSearch(query.trim(),catalogPage,20);
        setResults(old=>catalogPage===1?local:[...old,...local]);
        setHasMore(false);
      }finally{if(n===searchId.current)setSearching(false);}
    },query?480:60);
    return()=>{clearTimeout(delay);ctrl.abort()};
  },[page,query,catalogPage,refreshKey]);
  const item=(p:Perfume,context:Page)=>{
    const owned=ownedMap.get(p.id);
    return <article className="sc-perfume" key={p.id}>
      <button className="sc-perfume-image" onClick={()=>setSelected(p)} aria-label={"Details for "+p.name}>{pic(resolved(p))}</button>
      <div className="sc-perfume-info">
        <span className="sc-perfume-brand">{p.brand}</span>
        <button className="sc-name" onClick={()=>setSelected(p)}>{p.name}</button>
        <span className="sc-perfume-meta">{p.family||p.accords.slice(0,2).join(" · ")||"Fragrance"}</span>
        {owned?<strong className="sc-price">{owned.currency==="NGN"?money(owned.amount,"NGN"):"Set ₦ price"}</strong>:null}
        <div className="sc-perfume-actions">
          {context==="collection"?
          <><button onClick={()=>openPrice(p)}>Edit price</button><button onClick={()=>favorite(p)} title="Favourite" aria-label="Toggle favourite"><Heart size={17} fill={owned?.favorite?"currentColor":"none"}/></button></>:
          <><button onClick={()=>openPrice(p)}>{owned?"Owned · Edit price":"+ My shelf"}</button><button onClick={()=>wish(p)} title={wishIds.has(p.id)?"Remove from wishlist":"Add to wishlist"} aria-label="Toggle wishlist"><Heart size={17} fill={wishIds.has(p.id)?"currentColor":"none"}/></button></>}
        </div>
      </div>
    </article>;
  };
  const allMyPerfumes=store.collection.map(x=>x.perfume);
  const left=allMyPerfumes.find(x=>x.id===layerA),right=allMyPerfumes.find(x=>x.id===layerB);
  const aAcc=new Set([...(left?.notes||[]),...(left?.accords||[])].map(s=>s.toLowerCase()));
  const match=[...(right?.notes||[]),...(right?.accords||[])].filter(n=>aAcc.has(n.toLowerCase()));
  return <main id="main-content" className="sc-app">
    <header className="sc-topbar"><a href="/" className="sc-back"><ArrowLeft size={17}/> IBRAHIM ALLI</a><a href="/fragrance" className="sc-wordmark" aria-label="Scent Cabinet home">SCENT<span> / </span>CABINET</a><button className="sc-top-action" onClick={()=>setBackupOpen(true)}><Download size={17}/><span>My data</span></button></header>
    <div className="sc-inner">
      {(page==="collection"||page==="worth")&&<div className="sc-stats sc-stats-naira"><div><span>BOTTLES</span><strong>{store.collection.length}</strong></div><div><span>WISHLIST</span><strong>{store.wishlist.length}</strong></div><div><span>COLLECTION WORTH</span><strong>{money(moneyNGN,"NGN")}</strong></div></div>}
      <nav className="sc-tabs" aria-label="Fragrance sections">
        {([["collection","My collection",ShoppingBag],["discover","Discover",Search],["wishlist","Wishlist",Heart],["worth","Collection worth",Wallet],["layer","Layer lab",Layers]] as const).map(([key,label,Icon])=><button key={key} className={page===key?"active":""} onClick={()=>go(key)}><Icon size={18}/>{label}</button>)}
      </nav>
      {page==="collection"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>My collection</h2></div><button className="sc-primary" onClick={()=>go("discover")}><Plus size={18}/> Add fragrance</button></div>
        {store.collection.length>0?<><div className="sc-filters"><label><Search size={17}/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Find a bottle on my shelf" /></label><select aria-label="Sort collection" value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Recently added</option><option value="alpha">A — Z</option><option value="price">Price paid</option><option value="favorite">Favourites</option></select></div><div className="sc-grid">{list.map(x=>item(x.perfume,"collection"))}</div></>:<div className="sc-empty"><FlaskConical size={48} strokeWidth={1}/><h3>Begin with your first bottle.</h3><p>Search a perfume, then enter the price you paid.</p><button className="sc-primary" onClick={()=>go("discover")}>Explore fragrances <ArrowRight size={17}/></button></div>}
      </section>}
      {page==="discover"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>Discover</h2></div></div>
        <div className="sc-search"><Search size={20}/><input autoFocus={false} value={query} onChange={e=>{setQuery(e.target.value);setCatalogPage(1)}} placeholder="Search perfume or brand..." aria-label="Search perfumes"/>{query&&<button onClick={()=>{setQuery("");setCatalogPage(1)}} aria-label="Clear search"><X size={19}/></button>}</div>
        <div className="sc-chips">{["Qasida","Bakhur","Lattafa","Afnan","Dior","Tom Ford"].map(t=><button key={t} onClick={()=>{setQuery(t);setCatalogPage(1)}}>{t}</button>)}</div>

        {error&&<div className="sc-warning"><CloudOff size={19}/><span>{error}</span><button onClick={()=>setRefreshKey(k=>k+1)}>Retry</button></div>}
        {catalogueNotice.includes("unavailable")&&<p className="sc-source-note">{catalogueNotice}</p>}
        {results.length>0?<><div className="sc-grid">{results.map(p=>item(p,"discover"))}</div>{hasMore&&<button className="sc-loadmore" disabled={searching} onClick={()=>setCatalogPage(x=>x+1)}>{searching?"Loading...":"Load more fragrances"} <ChevronDown size={18}/></button>}</>:searching?<div className="sc-loading">Searching the fragrance library…</div>:!error?<div className="sc-empty"><Search size={40}/><h3>No matching fragrances.</h3><p>Try another spelling or brand name.</p></div>:null}
      </section>}
      {page==="wishlist"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>Wishlist</h2></div><button className="sc-primary" onClick={()=>go("discover")}><Plus size={17}/> Find fragrances</button></div>
        {store.wishlist.length?<div className="sc-grid">{store.wishlist.map(p=>item(p,"wishlist"))}</div>:<div className="sc-empty"><Heart size={45} strokeWidth={1}/><h3>A little room for desire.</h3><p>Save perfumes to buy later.</p><button className="sc-primary" onClick={()=>go("discover")}>Find my next scent <ArrowRight size={17}/></button></div>}
      </section>}
      {page==="worth"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>Collection worth</h2></div><button className="sc-primary" onClick={()=>go("discover")}><Plus size={17}/> Add a bottle</button></div>
        <div className="sc-worth-summary"><div><span>₦ PURCHASE TOTAL</span><strong>{money(moneyNGN,"NGN")}</strong></div><div><span>$ PURCHASE TOTAL</span><strong>{money(moneyUSD,"USD")}</strong></div></div>

        {legacyUSD>0&&<p className="sc-legacy-note">{legacyUSD} older dollar-priced bottle(s) are excluded until you enter a naira price.</p>}
        <div className="sc-worth-list"><h3>Purchase prices</h3>{store.collection.length?store.collection.map(x=><div key={x.perfume.id}><span>{x.perfume.brand} <strong>{x.perfume.name}</strong></span><strong>{x.currency==="NGN"?money(x.amount,"NGN"):"Set ₦ price"}</strong><button onClick={()=>openPrice(x.perfume)}>Edit</button></div>):<p>No fragrances added yet.</p>}</div>
      </section>}
      {page==="layer"&&<section className="sc-section"><div className="sc-section-head"><div><span className="sc-kicker">05 / THE EXPERIMENTAL STUDIO</span><h2>Layer <em>lab.</em></h2><p>Pair two perfumes from your shelf and discover shared scent notes. Suggestions aren't verified performance predictions.</p></div></div>
        {store.collection.length<2?<div className="sc-empty"><Layers size={45}/><h3>Two bottles make a combination.</h3><p>Collect at least two fragrances to start mixing.</p><button className="sc-primary" onClick={()=>go("discover")}>Expand my shelf</button></div>:<div className="sc-layer-panel"><div className="sc-pair"><label>FIRST FRAGRANCE<select value={layerA} onChange={e=>setLayerA(e.target.value)}><option value="">Choose a bottle</option>{allMyPerfumes.map(p=><option key={p.id} value={p.id}>{p.brand} — {p.name}</option>)}</select></label><Plus size={22}/><label>SECOND FRAGRANCE<select value={layerB} onChange={e=>setLayerB(e.target.value)}><option value="">Choose another</option>{allMyPerfumes.filter(p=>p.id!==layerA).map(p=><option key={p.id} value={p.id}>{p.brand} — {p.name}</option>)}</select></label></div>{left&&right&&left.id!==right.id&&<div className="sc-layer-result"><Sparkles size={27}/><h3>{left.name} <span>×</span> {right.name}</h3><p>{match.length?"Shared notes / accords: "+[...new Set(match)].join(", "):"No shared notes were listed by the database. Try one spray of each and assess on your own skin."}</p><button className="sc-primary" onClick={()=>setStore(s=>({...s,mixes:[{id:id(),left:left.id,right:right.id,date:today()},...s.mixes]}))}>Save this combination <Bookmark size={16}/></button></div>}</div>}
        {store.mixes.length>0&&<div className="sc-mix-list"><h3>Saved combinations</h3>{store.mixes.map(m=><div key={m.id}><span>{store.collection.find(x=>x.perfume.id===m.left)?.perfume.name||"Removed"} × {store.collection.find(x=>x.perfume.id===m.right)?.perfume.name||"Removed"}</span><button aria-label="Delete saved combination" onClick={()=>setStore(s=>({...s,mixes:s.mixes.filter(x=>x.id!==m.id)}))}><X size={17}/></button></div>)}</div>}
      </section>}
      <footer className="sc-footer"><span>SCENT / CABINET</span><button onClick={()=>setBackupOpen(true)}>Backup <ArrowRight size={15}/></button></footer>
    </div>
    <nav className="sc-mobile-nav" aria-label="Mobile fragrance navigation">{([["collection",ShoppingBag,"Shelf"],["discover",Search,"Discover"],["wishlist",Heart,"Wishlist"],["worth",Wallet,"Worth"],["layer",Layers,"Layer"]] as const).map(([key,Icon,text])=><button key={key} className={page===key?"active":""} onClick={()=>go(key)}><Icon size={21}/><span>{text}</span></button>)}</nav>
    {selected&&<div className="sc-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="sc-detail" role="dialog" aria-modal="true" aria-label={selected.name}><button className="sc-modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X size={22}/></button><div className="sc-detail-art">{pic(resolved(selected),"hero")}</div><div className="sc-detail-copy"><span className="sc-kicker">{selected.brand.toUpperCase()}</span><h2>{selected.name}</h2><p className="sc-detail-meta">{[selected.family,selected.year].filter(Boolean).join(" · ")||"Fragrance profile"}</p>{selected.description&&<p>{selected.description}</p>}{selected.accords.length>0&&<div className="sc-notes"><strong>MAIN ACCORDS</strong><p>{selected.accords.join(" · ")}</p></div>}{([["TOP NOTES",selected.top],["HEART NOTES",selected.heart],["BASE NOTES",selected.base],["OTHER NOTES",selected.notes]] as const).map(([label,arr])=>arr.length>0&&<div key={label} className="sc-notes"><strong>{label}</strong><p>{arr.join(" · ")}</p></div>)}<div className="sc-detail-actions"><button className="sc-primary" onClick={()=>openPrice(selected!)}>{isOwned(selected)?"Edit purchase price":"Add to my shelf"} <ArrowRight size={17}/></button><button className="sc-secondary" onClick={()=>wish(selected!)}><Heart size={18} fill={wishIds.has(selected.id)?"currentColor":"none"}/>{wishIds.has(selected.id)?"Wishlisted":"Wishlist"}</button>{isOwned(selected)&&<><button className="sc-danger" onClick={()=>remove(selected!)}><Trash2 size={17}/> Remove</button></>}</div></div></section></div>}
    {priceOpen&&<div className="sc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setPriceOpen(null)}}><section className="sc-price-dialog" role="dialog" aria-modal="true" aria-label="Save perfume price"><button className="sc-modal-close" onClick={()=>setPriceOpen(null)} aria-label="Close"><X size={22}/></button><h2>{ownedMap.has(priceOpen.id)?"Update purchase price":"Add to my collection"}</h2><p>{priceOpen.brand} · <strong>{priceOpen.name}</strong></p><form onSubmit={savePrice}><label>HOW MUCH DID YOU PAY?</label><div className="sc-money-input"><span className="sc-money-prefix">₦</span><input autoFocus type="number" inputMode="decimal" min="0" step="0.01" required value={price} onChange={e=>setPrice(e.target.value)} placeholder="0.00" /></div><p className="sc-small-note"></p><button className="sc-primary" type="submit"><Check size={18}/> Save perfume</button></form></section></div>}
    {backupOpen&&<div className="sc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setBackupOpen(false)}}><section className="sc-price-dialog" role="dialog" aria-modal="true" aria-label="Backup your collection"><button className="sc-modal-close" onClick={()=>setBackupOpen(false)} aria-label="Close"><X size={22}/></button><h2>Backup & <em>restore.</em></h2><p>Your collection is saved in this browser. Export a backup before changing devices.</p><button className="sc-primary sc-block" onClick={exportBackup}><Download size={18}/> Download backup</button><button className="sc-secondary sc-block" onClick={()=>fileRef.current?.click()}><Upload size={18}/> Restore from JSON</button><input hidden ref={fileRef} type="file" accept="application/json,.json" onChange={importBackup}/><div className="sc-privacy-note"><CloudOff size={19}/><span>No automatic sync between devices.</span></div></section></div>}
  </main>;
}
