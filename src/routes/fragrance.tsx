import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Bookmark, Check, ChevronDown, CloudOff, Download, FlaskConical, Heart, ImageOff, Layers, Plus, Search, ShoppingBag, Sparkles, Trash2, Upload, Wallet, X } from "lucide-react";
import { compressScentPhoto, saveScentPhoto, getScentPhoto, removeScentPhoto, blobAsDataUrl, dataUrlAsBlob } from "@/lib/scent-photos";
import css from "../fragrance.css?url";

type Currency = "NGN" | "USD";
type Page = "collection" | "discover" | "wishlist" | "worth" | "layer";
type Perfume = { id: string; name: string; brand: string; image?: string | undefined; year?: string | undefined; family?: string | undefined; description?: string | undefined; notes: string[]; top: string[]; heart: string[]; base: string[]; accords: string[] };
type Owned = { perfume: Perfume; amount: number; currency: Currency; added: string; favorite?: boolean };
type Mix = { id: string; left: string; right: string; date: string };
type Combo = { id:string; name:string; perfumes:Perfume[]; target:"collection"|"wishlist"; amount?:number; added:string };
type State = { collection: Owned[]; wishlist: Perfume[]; mixes: Mix[]; combos: Combo[] };
const STORAGE = "ia-scent-cabinet-v1";
const initial: State = { collection: [], wishlist: [], mixes: [], combos: [] };
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
  const candidates = [d["Image URL"],d["Image URL Transparent"],d["image_url"],d["image"],d["imageUrl"],d["photo"],d["thumbnail"],d["images"]];
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
  const top = bits(d["Notes"]?.["Top"] || d.top_notes || d.top || d["Top Notes"] || d.Top);
  const heart = bits(d["Notes"]?.["Middle"] || d.middle_notes || d.heart_notes || d.heart || d["Middle Notes"] || d.Heart);
  const base = bits(d["Notes"]?.["Base"] || d.base_notes || d.base || d["Base Notes"] || d.Base);
  return {
    id: "db:" + String(row.id || row._id || d.id || d._id || brand + ":" + name),
    name, brand, image: imageFrom(d), top, heart, base,
    notes: [...new Set([...bits(d.notes || d.Notes || d.note_pyramid),...top,...heart,...base])],
    accords: bits(d["Main Accords"] || d.accords || d.Accords || d.main_accords),
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
    mixes: (Array.isArray(source.mixes)?source.mixes:[]).filter((m:any)=>m&&typeof m.left==="string"&&typeof m.right==="string").slice(0,1000),
    combos: (Array.isArray(source.combos)?source.combos:[]).filter((c:any)=>c&&typeof c.id==="string"&&c.id.startsWith("combo:")&&Array.isArray(c.perfumes)&&c.perfumes.length>=2).slice(0,400).map((c:any)=>({
      id:String(c.id),name:String(c.name||"Perfume combo").slice(0,80),
      target:c.target==="collection"&&Number.isFinite(Number(c.amount))&&Number(c.amount)>=0?"collection":"wishlist",
      amount:c.target==="collection"&&Number.isFinite(Number(c.amount))&&Number(c.amount)>=0?Number(c.amount):undefined,
      added:String(c.added||new Date().toISOString()),
      perfumes:c.perfumes.filter(valid).slice(0,12).map(perfume)
    })).filter((c:Combo)=>c.perfumes.length>=2)
  };
}
function money(value:number,c:Currency) { return new Intl.NumberFormat("en-US",{style:"currency",currency:c,minimumFractionDigits:0,maximumFractionDigits:2}).format(value).replace("NGN","₦"); }
function pic(p:Perfume,size="card",ownerPhoto?:string,onPhotoError?:()=>void){
  const verifiedImage = ownerPhoto || ((p.id.startsWith("db:fragella:") || p.id.startsWith("db:noteboxd:")) && p.image?.startsWith("https://") ? p.image : undefined);
  return <span className="sc-art sc-photo-only">
    <span className="sc-no-photo"><ImageOff size={size==="hero"?26:19} strokeWidth={1.35}/><small>No bottle photo</small></span>
    {verifiedImage && <img loading={size==="hero"?"eager":"lazy"} decoding="async" src={verifiedImage} alt={p.brand+" "+p.name+" fragrance bottle"} onError={e=>{e.currentTarget.style.display="none";onPhotoError?.();}}/>}
  </span>;
}
function today(){return new Date().toISOString().slice(0,10);}
function id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
export const Route=createFileRoute("/fragrance")({
  head:()=>({meta:[
    {title:"Scent Cabinet — Ibrahim Alli's Fragrance Collection"},
    {name:"description",content:"A personal fragrance collection and wishlist by Ibrahim Alli."},
    {name:"robots",content:"noindex,nofollow"},
    {name:"theme-color",content:"#f5f0e6"},
    {name:"apple-mobile-web-app-capable",content:"yes"},
    {name:"apple-mobile-web-app-title",content:"Scent Cabinet"},
    {name:"apple-mobile-web-app-status-bar-style",content:"default"}
  ],links:[{rel:"stylesheet",href:css},{rel:"manifest",href:"/fragrance.webmanifest"},{rel:"apple-touch-icon",href:"/fragrance-apple-touch.png",sizes:"180x180"},{rel:"canonical",href:"https://ibrahimalli.com/fragrance"}]}),
  component:Fragrance
});
function Fragrance(){
  const [page,setPage]=useState<Page>("collection");
  const [store,setStore]=useState<State>(initial);
  const [ready,setReady]=useState(false);
  const [storageError,setStorageError]=useState<""|"corrupt"|"write">("");
  const [query,setQuery]=useState("");
  const [draftQuery,setDraftQuery]=useState("");
  const [results,setResults]=useState<Perfume[]>([]);
  const [checkedPhotos,setCheckedPhotos]=useState<Record<string,"ready"|"missing">>({});
  const [catalogPage,setCatalogPage]=useState(1);
  const [hasMore,setHasMore]=useState(false);
  const [searching,setSearching]=useState(false);
  const [error,setError]=useState("");
  const [catalogueNotice,setCatalogueNotice]=useState("");
  const [refreshKey,setRefreshKey]=useState(0);
  const [selected,setSelected]=useState<Perfume|null>(null);
  const [priceOpen,setPriceOpen]=useState<Perfume|null>(null);
  const [price,setPrice]=useState("");
  const [layerA,setLayerA]=useState("");
  const [layerB,setLayerB]=useState("");
  const [sort,setSort]=useState("newest");
  const [filter,setFilter]=useState("");
  const [backupOpen,setBackupOpen]=useState(false);
  const [comboOpen,setComboOpen]=useState(false);
  const [comboId,setComboId]=useState<string|null>(null);
  const [comboName,setComboName]=useState("");
  const [comboPerfumes,setComboPerfumes]=useState<Perfume[]>([]);
  const [comboTarget,setComboTarget]=useState<"collection"|"wishlist">("wishlist");
  const [comboAmount,setComboAmount]=useState("");
  const [comboFilter,setComboFilter]=useState("");
  const [comboSearchResults,setComboSearchResults]=useState<Perfume[]>([]);
  const [comboSearching,setComboSearching]=useState(false);
  const [comboManualBrand,setComboManualBrand]=useState("");
  const [comboManualName,setComboManualName]=useState("");
  const [comboPhoto,setComboPhoto]=useState<Blob|null>(null);
  const [comboPreview,setComboPreview]=useState<string|null>(null);
  const [comboSaving,setComboSaving]=useState(false);
  const [comboError,setComboError]=useState("");
  const [manualOpen,setManualOpen]=useState(false);
  const [manualBrand,setManualBrand]=useState("");
  const [manualName,setManualName]=useState("");
  const [manualTarget,setManualTarget]=useState<"collection"|"wishlist">("collection");
  const [manualPhoto,setManualPhoto]=useState<Blob|null>(null);
  const [manualPreview,setManualPreview]=useState<string|null>(null);
  const [photoUrls,setPhotoUrls]=useState<Record<string,string>>({});
  const storedUrls=useRef(new Map<string,string>());
  const photoFileRef=useRef<HTMLInputElement>(null);
  const [photoBusy,setPhotoBusy]=useState(false);
  const [photoError,setPhotoError]=useState("");
  const fileRef=useRef<HTMLInputElement>(null);
  const searchId=useRef(0);
  function showStoredPhoto(key:string,blob:Blob){
    const url=URL.createObjectURL(blob);
    const prior=storedUrls.current.get(key);
    if(prior)URL.revokeObjectURL(prior);
    storedUrls.current.set(key,url);
    setPhotoUrls(prev=>({...prev,[key]:url}));
  }
  useEffect(()=>{
    if(!ready)return;
    let canceled=false;
    const keys=[...new Set([
      ...store.collection.map(x=>x.perfume.id),
      ...store.wishlist.map(p=>p.id),
      ...store.combos.map(x=>x.id),
      ...store.combos.flatMap(x=>x.perfumes.map(p=>p.id))
    ].filter(k=>k.startsWith("manual:")||k.startsWith("combo:")))];
    Promise.all(keys.map(async key=>{
      if(storedUrls.current.has(key))return;
      try{const blob=await getScentPhoto(key);if(blob&&!canceled)showStoredPhoto(key,blob);}
      catch{/* browser private mode may not provide IndexedDB */}
    })).catch(()=>{});
    return()=>{canceled=true;};
  },[ready,store.collection,store.wishlist,store.combos]);
  useEffect(()=>()=>{storedUrls.current.forEach(u=>URL.revokeObjectURL(u));},[]);
  useEffect(()=>()=>{if(manualPreview)URL.revokeObjectURL(manualPreview);},[manualPreview]);
  useEffect(()=>()=>{if(comboPreview)URL.revokeObjectURL(comboPreview);},[comboPreview]);
  async function chooseManualPhoto(e:React.ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];if(!file)return;
    setPhotoError("");setPhotoBusy(true);
    try{
      const blob=await compressScentPhoto(file);
      setManualPhoto(blob);
      setManualPreview(URL.createObjectURL(blob));
    }catch(err){setPhotoError(err instanceof Error?err.message:"Photo could not be processed.");}
    finally{setPhotoBusy(false);e.target.value="";}
  }
  async function replaceManualPhoto(e:React.ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];if(!file||!selected)return;
    const key=selected.id;
    setPhotoBusy(true);setPhotoError("");
    try{
      const blob=await compressScentPhoto(file);
      await saveScentPhoto(key,blob);
      showStoredPhoto(key,blob);
    }catch(err){setPhotoError(err instanceof Error?err.message:"Photo could not be saved.");}
    finally{setPhotoBusy(false);e.target.value="";}
  }
  async function deleteManualPhoto(){
    if(!selected||!window.confirm("Remove this photo?"))return;
    try{
      await removeScentPhoto(selected.id);
      const old=storedUrls.current.get(selected.id);
      if(old)URL.revokeObjectURL(old);
      storedUrls.current.delete(selected.id);
      setPhotoUrls(current=>{const next={...current};delete next[selected.id];return next;});
    }catch(err){setPhotoError(err instanceof Error?err.message:"Could not remove photo.");}
  }

  useEffect(()=>{
    try{
      const previous=localStorage.getItem(STORAGE);
      if(previous)setStore(sanitize(JSON.parse(previous)));
      setReady(true);
    }catch{
      // Never overwrite unreadable saved data with an empty collection.
      setStorageError("corrupt");
    }
  },[]);
  useEffect(()=>{
    if(!ready)return;
    try{
      localStorage.setItem(STORAGE,JSON.stringify(store));
      setStorageError(prev=>prev==="write"?"":prev);
    }catch{setStorageError("write");}
  },[store,ready]);
  const ownedMap=useMemo(()=>new Map(store.collection.map(x=>[x.perfume.id,x])),[store.collection]);
  const wishIds=useMemo(()=>new Set(store.wishlist.map(x=>x.id)),[store.wishlist]);
  const myCombos=store.combos.filter(x=>x.target==="collection");
  const wishCombos=store.combos.filter(x=>x.target==="wishlist");
  const bottleCount=store.collection.length+myCombos.reduce((n,x)=>n+x.perfumes.length,0);
  const wishCount=store.wishlist.length+wishCombos.reduce((n,x)=>n+x.perfumes.length,0);
  const moneyNGN=store.collection.filter(x=>x.currency==="NGN").reduce((s,x)=>s+x.amount,0)+myCombos.reduce((s,x)=>s+(x.amount||0),0);
  const legacyUSD=store.collection.filter(x=>x.currency==="USD").length;
  const list=useMemo(()=>store.collection.filter(x=>(x.perfume.name+" "+x.perfume.brand).toLowerCase().includes(filter.toLowerCase())).sort((a,b)=>sort==="price"?b.amount-a.amount:sort==="alpha"?(a.perfume.name.localeCompare(b.perfume.name)):sort==="favorite"?Number(Boolean(b.favorite))-Number(Boolean(a.favorite)):b.added.localeCompare(a.added)),[store.collection,filter,sort]);
  function go(p:Page){setPage(p);setSelected(null);window.scrollTo({top:0,behavior:"smooth"});}
  function isOwned(p:Perfume){return ownedMap.has(p.id);}
  function wish(p:Perfume){setStore(s=>({...s,wishlist:s.wishlist.some(x=>x.id===p.id)?s.wishlist.filter(x=>x.id!==p.id):[p,...s.wishlist]}));}
  function openPrice(p:Perfume){setSelected(null);setPriceOpen(p);const old=ownedMap.get(p.id);setPrice(old?.currency==="NGN"?String(old.amount):"");}
  function savePrice(e:React.FormEvent){e.preventDefault();if(!priceOpen)return;const n=Number(price);if(!Number.isFinite(n)||n<0||price.trim()==="")return;const old=ownedMap.get(priceOpen.id);const item:Owned={perfume:priceOpen,amount:n,currency:"NGN",added:old?.added||new Date().toISOString(),favorite:old?.favorite||false};setStore(s=>({...s,collection:[item,...s.collection.filter(x=>x.perfume.id!==priceOpen.id)],wishlist:s.wishlist.filter(x=>x.id!==priceOpen.id)}));setPriceOpen(null);}
  function remove(p:Perfume){if(!window.confirm("Remove "+p.name+" from your collection?"))return;setStore(s=>({...s,collection:s.collection.filter(x=>x.perfume.id!==p.id)}));setSelected(null);}
  function favorite(p:Perfume){setStore(s=>({...s,collection:s.collection.map(x=>x.perfume.id===p.id?{...x,favorite:!x.favorite}:x)}));}
  async function addUnlisted(e:React.FormEvent){
    e.preventDefault();
    if(photoBusy)return;
    const name=manualName.trim().slice(0,100),brand=manualBrand.trim().slice(0,80);
    if(!name||!brand)return;
    const perfume:Perfume={id:"manual:"+id(),brand,name,notes:[],top:[],heart:[],base:[],accords:[]};
    if(manualPhoto){
      setPhotoBusy(true);
      try{await saveScentPhoto(perfume.id,manualPhoto);showStoredPhoto(perfume.id,manualPhoto);}
      catch(err){setPhotoError(err instanceof Error?err.message:"Could not save the photo. Please try again.");return;}
      finally{setPhotoBusy(false);}
    }
    setManualOpen(false);setManualBrand("");setManualName("");setManualPhoto(null);setManualPreview(null);setPhotoError("");
    if(manualTarget==="wishlist")wish(perfume);
    else openPrice(perfume);
  }
  function startCombo(target:"collection"|"wishlist",first?:Perfume){
    setComboId(null);setComboName("");setComboPerfumes(first?[first]:[]);
    setComboTarget(target);setComboAmount("");setComboFilter("");setComboManualBrand("");setComboManualName("");
    setComboPhoto(null);setComboPreview(null);setComboError("");setComboSearchResults([]);
    setSelected(null);setComboOpen(true);
  }
  function editCombo(c:Combo,moveTo?: "collection"|"wishlist"){
    setComboId(c.id);setComboName(c.name);setComboPerfumes(c.perfumes);
    setComboTarget(moveTo||c.target);setComboAmount(c.amount===undefined?"":String(c.amount));
    setComboFilter("");setComboManualBrand("");setComboManualName("");
    setComboPhoto(null);setComboPreview(null);setComboError("");setComboSearchResults([]);
    setComboOpen(true);
  }
  function addComboPerfume(p:Perfume){
    setComboPerfumes(previous=>{
      if(previous.some(x=>x.id===p.id)||previous.length>=12)return previous;
      return [...previous,p];
    });
  }
  function addComboManual(){
    const brand=comboManualBrand.trim().slice(0,80),name=comboManualName.trim().slice(0,100);
    if(!brand||!name){setComboError("Enter the brand and perfume name.");return;}
    setComboError("");
    addComboPerfume({id:"manual:"+id(),brand,name,notes:[],top:[],heart:[],base:[],accords:[]});
    setComboManualBrand("");setComboManualName("");
  }
  async function comboSearch(e?:React.FormEvent){
    e?.preventDefault();const search=comboFilter.trim().slice(0,90);if(search.length<3)return;
    setComboSearching(true);setComboError("");
    try{
      const response=await fetch(API+"/search?q="+encodeURIComponent(search)+"&page=1",{headers:{Accept:"application/json"},signal:AbortSignal.timeout(13000)});
      if(!response.ok)throw Error("Search failed");
      const payload=await response.json();
      const entries=Array.isArray(payload.results)?payload.results:[];
      setComboSearchResults(entries.map(normalize).filter((p:Perfume|null):p is Perfume=>Boolean(p)));
    }catch{setComboError("Search unavailable. Add this perfume manually below.");}
    finally{setComboSearching(false);}
  }
  async function selectComboPhoto(e:React.ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];if(!file)return;setComboSaving(true);setComboError("");
    try{
      const photo=await compressScentPhoto(file);
      setComboPhoto(photo);setComboPreview(URL.createObjectURL(photo));
    }catch(err){setComboError(err instanceof Error?err.message:"Couldn't process image.");}
    finally{setComboSaving(false);e.target.value="";}
  }
  async function saveCombo(e:React.FormEvent){
    e.preventDefault();
    if(comboSaving)return;
    if(comboPerfumes.length<2){setComboError("Add at least 2 perfumes.");return;}
    if(comboPerfumes.length>12){setComboError("Maximum 12 perfumes per combo.");return;}
    const amount=Number(comboAmount);
    if(comboTarget==="collection"&&(comboAmount.trim()===""||!Number.isFinite(amount)||amount<0)){
      setComboError("Enter the total combo price in naira.");return;
    }
    setComboSaving(true);setComboError("");
    const finalId=comboId||"combo:"+id();
    try{
      if(comboPhoto){await saveScentPhoto(finalId,comboPhoto);showStoredPhoto(finalId,comboPhoto);}
      const old=store.combos.find(c=>c.id===finalId);
      const combo:Combo={id:finalId,name:comboName.trim().slice(0,80)||comboPerfumes.map(p=>p.name).slice(0,2).join(" + "),
        perfumes:comboPerfumes,target:comboTarget,
        ...(comboTarget==="collection"?{amount}:{}),added:old?.added||new Date().toISOString()};
      setStore(prev=>({...prev,combos:[combo,...prev.combos.filter(c=>c.id!==finalId)]}));
      setComboOpen(false);setComboPhoto(null);setComboPreview(null);
      go(comboTarget==="collection"?"collection":"wishlist");
    }catch(err){setComboError(err instanceof Error?err.message:"Couldn't save combo image.");}
    finally{setComboSaving(false);}
  }
  function removeCombo(c:Combo){
    if(!window.confirm("Delete "+c.name+" combo? The individual perfumes stay in your other saved lists."))return;
    setStore(prev=>({...prev,combos:prev.combos.filter(x=>x.id!==c.id)}));
    removeScentPhoto(c.id).catch(()=>{});
    setComboOpen(false);
  }
  async function exportBackup(){
    try{
      const allIds=[...new Set([
        ...store.collection.map(x=>x.perfume.id),...store.wishlist.map(x=>x.id),
        ...store.combos.map(c=>c.id),...store.combos.flatMap(c=>c.perfumes.map(p=>p.id))
      ].filter(k=>k.startsWith("manual:")||k.startsWith("combo:")))];
      const ownerPhotos:Record<string,string>={};
      for(const key of allIds){const photo=await getScentPhoto(key);if(photo)ownerPhotos[key]=await blobAsDataUrl(photo);}
      const contents=JSON.stringify({app:"Scent Cabinet",version:3,exportedAt:new Date().toISOString(),...store,ownerPhotos},null,2);
      const blob=new Blob([contents],{type:"application/json"});
      const href=URL.createObjectURL(blob);const a=document.createElement("a");
      a.href=href;a.download="scent-cabinet-backup-"+today()+".json";
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(href),5000);
    }catch(err){alert("Backup failed. "+(err instanceof Error?err.message:String(err)));}
  }
  async function importBackup(e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0];if(!f)return;
    try{
      if(f.size>50_000_000)throw Error("Backup is too large (maximum 50 MB).");
      const value=JSON.parse(await f.text());
      if(!Array.isArray(value.collection)||!Array.isArray(value.wishlist))throw Error("Not a Scent Cabinet backup.");
      const restored=sanitize(value);
      const photos=value.ownerPhotos;
      const validIds=new Set([...restored.collection.map(x=>x.perfume.id),...restored.wishlist.map(p=>p.id),...restored.combos.map(c=>c.id),...restored.combos.flatMap(c=>c.perfumes.map(p=>p.id))]);
      const entries=photos&&typeof photos==="object"&&!Array.isArray(photos)?Object.entries(photos):[];
      if(entries.length>300)throw Error("Too many backup images.");
      if(!window.confirm("Replace your current shelf and wishlist with this backup?"))return;
      // Restore images before replacing collection state; never silently discard images on failure.
      for(const [key,payload] of entries){
        if(!validIds.has(key)||!(key.startsWith("manual:")||key.startsWith("combo:"))||typeof payload!=="string")continue;
        const blob=dataUrlAsBlob(payload);
        await saveScentPhoto(key,blob);
        showStoredPhoto(key,blob);
      }
      setStore(restored);setReady(true);setStorageError("");setBackupOpen(false);
    }catch(err){alert("Could not import backup: "+(err instanceof Error?err.message:String(err)));}
    finally{e.target.value="";}
  }
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
        setCatalogueNotice("");
        const rows=Array.isArray(payload)?payload:payload.results||payload.fragrances||payload.items||payload.data?.results;
        if(!Array.isArray(rows))throw Error("Catalogue format not recognised");
        const items=rows.map(normalize).filter((p:Perfume|null):p is Perfume=>Boolean(p));
        if(n!==searchId.current)return;
        setResults(old=>catalogPage===1?items:[...old,...items.filter(x=>!old.some(y=>x.id===y.id))]);
        const total=Number(payload.total);
        setHasMore(typeof payload.hasMore==="boolean"?payload.hasMore:Number.isFinite(total)&&total>0?catalogPage*(payload.source==="fragella"?10:20)<total:false);
        try{sessionStorage.setItem("ia-scent-last-search",JSON.stringify({query,page:catalogPage,items,time:Date.now()}));}catch{}
      }catch(err){
        if(n!==searchId.current||ctrl.signal.aborted)return;
        setError("Search unavailable. Please try again.");
        setResults(old=>catalogPage===1?[]:old);
        setHasMore(false);
      }finally{if(n===searchId.current)setSearching(false);}
    },40);
    return()=>{clearTimeout(delay);ctrl.abort()};
  },[page,query,catalogPage,refreshKey]);
  // Keep Discover photo-only. Preflight URLs using browser image loading
  // so broken provider photos never create empty product cards.
  useEffect(()=>{
    if(page!=="discover" || !query.trim())return;
    const candidates=results.filter(p=>p.image?.startsWith("https://") && checkedPhotos[p.id]===undefined);
    if(!candidates.length)return;
    const pending:HTMLImageElement[]=[];
    let disposed=false;
    for(const p of candidates){
      const photo=new Image();
      pending.push(photo);
      photo.onload=()=>{if(!disposed)setCheckedPhotos(prev=>({...prev,[p.id]:"ready"}))};
      photo.onerror=()=>{if(!disposed)setCheckedPhotos(prev=>({...prev,[p.id]:"missing"}))};
      photo.src=p.image!;
      if(photo.complete && photo.naturalWidth>0)photo.onload?.(new Event("load"));
    }
    return()=>{disposed=true;for(const p of pending){p.onload=null;p.onerror=null;}};
  },[page,query,results]);
  const photographed=results.filter(p=>p.image?.startsWith("https://") && checkedPhotos[p.id]==="ready");
  const checkingPhotos=results.some(p=>p.image?.startsWith("https://") && checkedPhotos[p.id]===undefined);
  const item=(p:Perfume,context:Page)=>{
    const owned=ownedMap.get(p.id);
    return <article className="sc-perfume" key={p.id}>
      <button className="sc-perfume-image" onClick={()=>setSelected(p)} aria-label={"Details for "+p.name}>{pic(p,"card",photoUrls[p.id],context==="discover"?()=>setCheckedPhotos(v=>({...v,[p.id]:"missing"})):undefined)}</button>
      <div className="sc-perfume-info">
        <span className="sc-perfume-brand">{p.brand}</span>
        <button className="sc-name" onClick={()=>setSelected(p)}>{p.name}</button>
        <span className="sc-perfume-meta">{p.family||p.accords.slice(0,2).join(" · ")||"Fragrance"}</span>
        {owned?<strong className="sc-price">{owned.currency==="NGN"?money(owned.amount,"NGN"):"Set ₦ price"}</strong>:null}
        <div className="sc-perfume-actions">
          {context==="collection"?
          <><button onClick={()=>openPrice(p)}>Edit price</button><button onClick={()=>favorite(p)} title="Favourite" aria-label="Toggle favourite"><Heart size={17} fill={owned?.favorite?"currentColor":"none"}/></button></>:
          <><button onClick={()=>openPrice(p)}>{owned?"Owned · Edit price":"+ My shelf"}</button><button onClick={()=>wish(p)} title={wishIds.has(p.id)?"Remove from wishlist":"Add to wishlist"} aria-label="Toggle wishlist"><Heart size={17} fill={wishIds.has(p.id)?"currentColor":"none"}/></button>{context==="discover"&&<button className="sc-combo-add-card" onClick={()=>startCombo("wishlist",p)} title="Start combo with this fragrance"><Plus size={14}/> Combo</button>}</>}
        </div>
      </div>
    </article>;
  };
  const comboCandidates=[...new Map([
    ...store.collection.map(x=>x.perfume),...store.wishlist,...results,...comboSearchResults,
    ...store.combos.flatMap(c=>c.perfumes)
  ].map(p=>[p.id,p])).values()].filter(p=>!comboPerfumes.some(x=>x.id===p.id)).filter(p=>{
    const q=comboFilter.trim().toLowerCase();
    return !q||((p.brand+" "+p.name).toLowerCase().includes(q));
  }).slice(0,30);
  const comboCard=(c:Combo)=>{
    const four=c.perfumes.slice(0,4);
    return <article className="sc-combo-card" key={c.id}>
      <div className="sc-combo-visual">{photoUrls[c.id]?<img className="sc-combo-cover" src={photoUrls[c.id]} alt={c.name+" combo photo"}/>:
        <div className="sc-combo-collage">{four.map((p,i)=><div key={p.id+":"+i}>{pic(p,"card",photoUrls[p.id])}</div>)}</div>}
        <span className="sc-combo-count">{c.perfumes.length} bottles</span>
      </div>
      <div className="sc-combo-info"><span className="sc-combo-tag">PERFUME COMBO</span>
      <h3>{c.name}</h3>
      <div className="sc-combo-members">{c.perfumes.slice(0,4).map(p=><button type="button" key={p.id} onClick={()=>setSelected(p)}>{p.name}</button>)}{c.perfumes.length>4&&<span>+{c.perfumes.length-4} more</span>}</div>
      {c.target==="collection"&&<strong className="sc-combo-cost">{money(c.amount||0,"NGN")} <small>total paid</small></strong>}
      <div className="sc-combo-actions">
        <button type="button" onClick={()=>editCombo(c)}>Edit combo</button>
        {c.target==="wishlist"&&<button type="button" onClick={()=>editCombo(c,"collection")}>Purchased <ArrowRight size={13}/></button>}
        <button type="button" className="sc-combo-delete" aria-label={"Delete "+c.name} onClick={()=>removeCombo(c)}><Trash2 size={16}/></button>
      </div></div>
    </article>;
  };
  const allMyPerfumes=[...new Map([...store.collection.map(x=>x.perfume),...myCombos.flatMap(x=>x.perfumes)].map(p=>[p.id,p])).values()];
  const left=allMyPerfumes.find(x=>x.id===layerA),right=allMyPerfumes.find(x=>x.id===layerB);
  const aAcc=new Set([...(left?.notes||[]),...(left?.accords||[])].map(s=>s.toLowerCase()));
  const match=[...(right?.notes||[]),...(right?.accords||[])].filter(n=>aAcc.has(n.toLowerCase()));
  return <main id="main-content" className="sc-app">
    <header className="sc-topbar"><button type="button" className="sc-wordmark" onClick={()=>go("collection")} aria-label="Scent Cabinet home">SCENT<span> / </span>CABINET</button><button type="button" className="sc-top-action" onClick={()=>setBackupOpen(true)} aria-label="Backup and restore my collection" title="Backup and restore"><Download size={19}/><span>Backup</span></button></header>
    <div className="sc-inner">
      {storageError&&<div className="sc-storage-alert" role="alert"><span>{storageError==="corrupt"?"Your saved collection could not be read. Restore an earlier backup.":"Changes couldn't be saved in this browser. Export a backup now."}</span><button type="button" onClick={()=>setBackupOpen(true)}>{storageError==="corrupt"?"Restore":"Backup"}</button></div>}
      {(page==="collection"||page==="worth")&&<div className="sc-stats sc-stats-naira"><div><span>BOTTLES</span><strong>{bottleCount}</strong></div><div><span>WISHLIST</span><strong>{wishCount}</strong></div><div><span>COLLECTION WORTH</span><strong>{money(moneyNGN,"NGN")}</strong></div></div>}
      <nav className="sc-tabs" aria-label="Fragrance sections">
        {([["collection","My collection",ShoppingBag],["discover","Discover",Search],["wishlist","Wishlist",Heart],["worth","Collection worth",Wallet],["layer","Layer lab",Layers]] as const).map(([key,label,Icon])=><button key={key} className={page===key?"active":""} onClick={()=>go(key)}><Icon size={18}/>{label}</button>)}
      </nav>
      {page==="collection"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>My collection</h2></div><div className="sc-combo-header-actions"><button className="sc-secondary" onClick={()=>startCombo("collection")}><Plus size={16}/> Add combo</button><button className="sc-primary" onClick={()=>go("discover")}><Plus size={16}/> Fragrance</button></div></div>
        {store.collection.length>0||myCombos.length>0?<>{myCombos.length>0&&<div className="sc-combo-grid">{myCombos.map(comboCard)}</div>}{store.collection.length>0&&<><div className="sc-filters"><label><Search size={17}/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Find a bottle on my shelf" /></label><select aria-label="Sort collection" value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Recently added</option><option value="alpha">A — Z</option><option value="price">Price paid</option><option value="favorite">Favourites</option></select></div><div className="sc-grid">{list.map(x=>item(x.perfume,"collection"))}</div></>}</>:<div className="sc-empty"><FlaskConical size={48} strokeWidth={1}/><h3>Begin with your first bottle.</h3><p>Search a perfume, then enter the price you paid.</p><button className="sc-primary" onClick={()=>go("discover")}>Explore fragrances <ArrowRight size={17}/></button></div>}
      </section>}
      {page==="discover"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>Discover</h2></div><button className="sc-secondary sc-add-combo-discover" onClick={()=>startCombo("wishlist")}><Plus size={16}/> Combo</button></div>
        <form className="sc-search" onSubmit={e=>{e.preventDefault();const v=draftQuery.trim();if(v.length<3)return;setCatalogPage(1);if(v===query)setRefreshKey(k=>k+1);else setQuery(v)}}><Search size={20}/><input autoFocus={false} value={draftQuery} onChange={e=>setDraftQuery(e.target.value)} placeholder="Search perfume or brand..." aria-label="Search perfumes"/>{draftQuery&&<button type="button" onClick={()=>{setDraftQuery("");setQuery("");setCatalogPage(1)}} aria-label="Clear search"><X size={19}/></button>}<button className="sc-search-submit" type="submit" disabled={draftQuery.trim().length<3||searching}>Search</button></form>
        <div className="sc-chips">{["Qasida","Bakhur","Lattafa","Afnan","Dior","Tom Ford"].map(t=><button key={t} onClick={()=>{setDraftQuery(t);setCatalogPage(1);if(query===t)setRefreshKey(k=>k+1);else setQuery(t)}}>{t}</button>)}</div>
        <button className="sc-add-missing" onClick={()=>setManualOpen(true)}><Plus size={14}/> Not listed? Add it</button>

        {error&&<div className="sc-warning"><CloudOff size={19}/><span>{error}</span><button onClick={()=>setRefreshKey(k=>k+1)}>Retry</button></div>}
        {catalogueNotice&&<p className="sc-source-note">{catalogueNotice}</p>}
        {photographed.length>0?<><div className="sc-grid">{photographed.map(p=>item(p,"discover"))}</div>{hasMore&&<button className="sc-loadmore" disabled={searching} onClick={()=>setCatalogPage(x=>x+1)}>{searching?"Loading...":"Load more"} <ChevronDown size={18}/></button>}</>:searching||checkingPhotos?<div className="sc-loading">Loading photos…</div>:query.trim()?<p className="sc-no-results">No perfumes with verified photos found. Try another search or <button onClick={()=>setManualOpen(true)}>add manually</button>.</p>:<p className="sc-discover-intro">Search a perfume or choose a brand above.</p>}
      </section>}
      {page==="wishlist"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>Wishlist</h2></div><div className="sc-combo-header-actions"><button className="sc-secondary" onClick={()=>startCombo("wishlist")}><Plus size={16}/> Add combo</button><button className="sc-primary" onClick={()=>go("discover")}><Plus size={16}/> Fragrance</button></div></div>
        {store.wishlist.length||wishCombos.length?<>{wishCombos.length>0&&<div className="sc-combo-grid">{wishCombos.map(comboCard)}</div>}{store.wishlist.length>0&&<div className="sc-grid">{store.wishlist.map(p=>item(p,"wishlist"))}</div>}</>:<div className="sc-empty"><Heart size={45} strokeWidth={1}/><h3>A little room for desire.</h3><p>Save perfumes to buy later.</p><button className="sc-primary" onClick={()=>go("discover")}>Find my next scent <ArrowRight size={17}/></button></div>}
      </section>}
      {page==="worth"&&<section className="sc-section">
        <div className="sc-section-head"><div><h2>Collection worth</h2></div><button className="sc-primary" onClick={()=>go("discover")}><Plus size={17}/> Add a bottle</button></div>
        <div className="sc-worth-summary sc-worth-one"><div><span>₦ TOTAL PAID</span><strong>{money(moneyNGN,"NGN")}</strong></div></div>

        {legacyUSD>0&&<p className="sc-legacy-note">{legacyUSD} older dollar-priced bottle(s) are excluded until you enter a naira price.</p>}
        <div className="sc-worth-list"><h3>Purchase prices</h3>{store.collection.length||myCombos.length?store.collection.map(x=><div key={x.perfume.id}><span>{x.perfume.brand} <strong>{x.perfume.name}</strong></span><strong>{x.currency==="NGN"?money(x.amount,"NGN"):"Set ₦ price"}</strong><button onClick={()=>openPrice(x.perfume)}>Edit</button></div>):null}{myCombos.map(c=><div key={c.id}><span>Perfume combo <strong>{c.name} · {c.perfumes.length} bottles</strong></span><strong>{money(c.amount||0,"NGN")}</strong><button onClick={()=>editCombo(c)}>Edit</button></div>)}{store.collection.length===0&&myCombos.length===0&&<p>No fragrances added yet.</p>}</div>
      </section>}
      {page==="layer"&&<section className="sc-section"><div className="sc-section-head"><div><span className="sc-kicker">05 / THE EXPERIMENTAL STUDIO</span><h2>Layer <em>lab.</em></h2><p>Pair two perfumes from your shelf and discover shared scent notes. Suggestions aren't verified performance predictions.</p></div></div>
        {allMyPerfumes.length<2?<div className="sc-empty"><Layers size={45}/><h3>Two bottles make a combination.</h3><p>Collect at least two fragrances to start mixing.</p><button className="sc-primary" onClick={()=>go("discover")}>Expand my shelf</button></div>:<div className="sc-layer-panel"><div className="sc-pair"><label>FIRST FRAGRANCE<select value={layerA} onChange={e=>setLayerA(e.target.value)}><option value="">Choose a bottle</option>{allMyPerfumes.map(p=><option key={p.id} value={p.id}>{p.brand} — {p.name}</option>)}</select></label><Plus size={22}/><label>SECOND FRAGRANCE<select value={layerB} onChange={e=>setLayerB(e.target.value)}><option value="">Choose another</option>{allMyPerfumes.filter(p=>p.id!==layerA).map(p=><option key={p.id} value={p.id}>{p.brand} — {p.name}</option>)}</select></label></div>{left&&right&&left.id!==right.id&&<div className="sc-layer-result"><Sparkles size={27}/><h3>{left.name} <span>×</span> {right.name}</h3><p>{match.length?"Shared notes / accords: "+[...new Set(match)].join(", "):"No shared notes were listed by the database. Try one spray of each and assess on your own skin."}</p><button className="sc-primary" onClick={()=>setStore(s=>({...s,mixes:[{id:id(),left:left.id,right:right.id,date:today()},...s.mixes]}))}>Save this combination <Bookmark size={16}/></button></div>}</div>}
        {store.mixes.length>0&&<div className="sc-mix-list"><h3>Saved combinations</h3>{store.mixes.map(m=><div key={m.id}><span>{allMyPerfumes.find(x=>x.id===m.left)?.name||"Removed"} × {allMyPerfumes.find(x=>x.id===m.right)?.name||"Removed"}</span><button aria-label="Delete saved combination" onClick={()=>setStore(s=>({...s,mixes:s.mixes.filter(x=>x.id!==m.id)}))}><X size={17}/></button></div>)}</div>}
      </section>}
      <footer className="sc-footer"><span>SCENT / CABINET</span><button onClick={()=>setBackupOpen(true)}>Backup <ArrowRight size={15}/></button></footer>
    </div>
    <nav className="sc-mobile-nav" aria-label="Mobile fragrance navigation">{([["collection",ShoppingBag,"Shelf"],["discover",Search,"Discover"],["wishlist",Heart,"Wishlist"],["worth",Wallet,"Worth"],["layer",Layers,"Layer"]] as const).map(([key,Icon,text])=><button key={key} className={page===key?"active":""} onClick={()=>go(key)}><Icon size={21}/><span>{text}</span></button>)}</nav>
    {selected&&<div className="sc-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="sc-detail" role="dialog" aria-modal="true" aria-label={selected.name}><button className="sc-modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X size={22}/></button><div className="sc-detail-art">{pic(selected,"hero",photoUrls[selected.id])}</div><div className="sc-detail-copy"><span className="sc-kicker">{selected.brand.toUpperCase()}</span><h2>{selected.name}</h2><p className="sc-detail-meta">{[selected.family,selected.year].filter(Boolean).join(" · ")||"Fragrance profile"}</p>{selected.description&&<p>{selected.description}</p>}{selected.accords.length>0&&<div className="sc-notes"><strong>MAIN ACCORDS</strong><p>{selected.accords.join(" · ")}</p></div>}{([["TOP NOTES",selected.top],["HEART NOTES",selected.heart],["BASE NOTES",selected.base],["OTHER NOTES",selected.notes]] as const).map(([label,arr])=>arr.length>0&&<div key={label} className="sc-notes"><strong>{label}</strong><p>{arr.join(" · ")}</p></div>)}<div className="sc-detail-actions"><button className="sc-primary" onClick={()=>openPrice(selected!)}>{isOwned(selected)?"Edit purchase price":"Add to my shelf"} <ArrowRight size={17}/></button><button className="sc-secondary" onClick={()=>wish(selected!)}><Heart size={18} fill={wishIds.has(selected.id)?"currentColor":"none"}/>{wishIds.has(selected.id)?"Wishlisted":"Wishlist"}</button>{selected.id.startsWith("manual:")&&<><button className="sc-secondary" onClick={()=>photoFileRef.current?.click()} disabled={photoBusy}><Upload size={17}/>{photoUrls[selected.id]?"Replace photo":"Upload photo"}</button>{photoUrls[selected.id]&&<button className="sc-secondary" onClick={deleteManualPhoto}>Remove photo</button>}<input ref={photoFileRef} hidden type="file" accept="image/*" onChange={replaceManualPhoto}/>{photoError&&<p className="sc-form-error">{photoError}</p>}</>}{isOwned(selected)&&<><button className="sc-danger" onClick={()=>remove(selected!)}><Trash2 size={17}/> Remove</button></>}</div></div></section></div>}
    {comboOpen&&<div className="sc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget&&!comboSaving)setComboOpen(false)}}><section className="sc-price-dialog sc-combo-dialog" role="dialog" aria-modal="true" aria-label={comboId?"Edit perfume combo":"Add perfume combo"}><button className="sc-modal-close" type="button" onClick={()=>setComboOpen(false)} aria-label="Close"><X size={22}/></button>
      <h2>{comboId?"Edit combo":"New combo"}</h2>
      <p className="sc-combo-hint">Group perfumes bought together or saved for later.</p>
      <form className="sc-combo-form" onSubmit={saveCombo}>
        <label>COMBO NAME (OPTIONAL)</label>
        <input value={comboName} onChange={e=>setComboName(e.target.value)} maxLength={80} placeholder="e.g. My weekend picks"/>
        <div className="sc-manual-target sc-combo-target"><label><input type="radio" checked={comboTarget==="wishlist"} onChange={()=>setComboTarget("wishlist")}/> Wishlist</label><label><input type="radio" checked={comboTarget==="collection"} onChange={()=>setComboTarget("collection")}/> Collection</label></div>
        <label>PERFUMES ({comboPerfumes.length}/12) · MINIMUM 2</label>
        {comboPerfumes.length>0&&<div className="sc-combo-selected">{comboPerfumes.map(p=><div key={p.id}><span>{p.brand} <strong>{p.name}</strong></span><button type="button" title={"Remove "+p.name} onClick={()=>setComboPerfumes(v=>v.filter(x=>x.id!==p.id))}><X size={16}/></button></div>)}</div>}
        <div className="sc-combo-search"><input value={comboFilter} onChange={e=>setComboFilter(e.target.value)} placeholder="Search or filter perfumes" aria-label="Find perfumes for combo" onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();void comboSearch()}}}/><button type="button" onClick={()=>void comboSearch()} disabled={comboSearching||comboFilter.trim().length<3}>{comboSearching?"...":"Search"}</button></div>
        {comboCandidates.length>0&&<div className="sc-combo-options">{comboCandidates.map(p=><button key={p.id} type="button" disabled={comboPerfumes.length>=12} onClick={()=>addComboPerfume(p)}><Plus size={14}/><span>{p.brand} <strong>{p.name}</strong></span></button>)}</div>}
        <p className="sc-combo-help">Can't find one? Add its name here—no API needed.</p>
        <div className="sc-combo-manual"><input value={comboManualBrand} onChange={e=>setComboManualBrand(e.target.value)} placeholder="Brand" maxLength={80} aria-label="Manual combo perfume brand"/><input value={comboManualName} onChange={e=>setComboManualName(e.target.value)} placeholder="Perfume name" maxLength={100} aria-label="Manual combo perfume name" onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addComboManual()}}}/><button type="button" disabled={comboPerfumes.length>=12} onClick={addComboManual}><Plus size={17}/> Add</button></div>
        <label>COMBO PHOTO (OPTIONAL)</label>
        <label className="sc-photo-picker sc-combo-photo"><input type="file" accept="image/*" onChange={selectComboPhoto} disabled={comboSaving}/>{comboPreview?<img alt="New combo photo" src={comboPreview}/>:comboId&&photoUrls[comboId]?<img alt="Saved combo photo" src={photoUrls[comboId]}/>:<span><Upload size={18}/> Upload combo photo</span>}</label>
        {comboPreview&&<button type="button" className="sc-photo-clear" onClick={()=>{setComboPreview(null);setComboPhoto(null)}}>Remove selected photo</button>}
        {comboId&&!comboPreview&&photoUrls[comboId]&&<button type="button" className="sc-photo-clear" onClick={async()=>{
          try{
            await removeScentPhoto(comboId);
            const existing=storedUrls.current.get(comboId);
            if(existing)URL.revokeObjectURL(existing);
            storedUrls.current.delete(comboId);
            setPhotoUrls(prev=>{const next={...prev};delete next[comboId];return next;});
          }catch{setComboError("Couldn't remove photo.");}
        }}>Remove combo photo</button>}
        {comboTarget==="collection"&&<><label>TOTAL PRICE PAID (₦)</label><div className="sc-money-input"><span className="sc-money-prefix">₦</span><input type="number" min="0" step="0.01" inputMode="decimal" required value={comboAmount} onChange={e=>setComboAmount(e.target.value)} placeholder="0.00"/></div></>}
        {comboError&&<p className="sc-form-error" role="alert">{comboError}</p>}
        <button type="submit" className="sc-primary sc-block" disabled={comboSaving||comboPerfumes.length<2}><Check size={17}/>{comboSaving?"Saving...":comboId?"Save changes":"Save combo"}</button>
      </form>
    </section></div>}
    {manualOpen&&<div className="sc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setManualOpen(false)}}><section className="sc-price-dialog" role="dialog" aria-modal="true" aria-label="Add perfume manually"><button className="sc-modal-close" onClick={()=>setManualOpen(false)} aria-label="Close"><X size={22}/></button><h2>Add manually</h2><form className="sc-manual-form" onSubmit={addUnlisted}><label>BRAND</label><input value={manualBrand} autoFocus onChange={e=>setManualBrand(e.target.value)} maxLength={80} placeholder="e.g. Lattafa" required/><label>PERFUME</label><input value={manualName} onChange={e=>setManualName(e.target.value)} maxLength={100} placeholder="Fragrance name" required/><label>PHOTO (OPTIONAL)</label><label className="sc-photo-picker"><input type="file" accept="image/*" onChange={chooseManualPhoto} disabled={photoBusy}/>{manualPreview?<img src={manualPreview} alt="Your selected perfume photo"/>:<span><Upload size={20}/> Upload bottle photo</span>}</label>{manualPhoto&&<button type="button" className="sc-photo-clear" onClick={()=>{setManualPhoto(null);setManualPreview(null)}}>Remove selected photo</button>}{photoError&&<p className="sc-form-error">{photoError}</p>}<div className="sc-manual-target"><label><input type="radio" checked={manualTarget==="collection"} onChange={()=>setManualTarget("collection")}/> Collection</label><label><input type="radio" checked={manualTarget==="wishlist"} onChange={()=>setManualTarget("wishlist")}/> Wishlist</label></div><button className="sc-primary" type="submit" disabled={photoBusy}>{photoBusy?"Saving photo...":manualTarget==="collection"?"Next: Enter ₦ price":"Save to wishlist"} <ArrowRight size={16}/></button></form></section></div>}
    {priceOpen&&<div className="sc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setPriceOpen(null)}}><section className="sc-price-dialog" role="dialog" aria-modal="true" aria-label="Save perfume price"><button className="sc-modal-close" onClick={()=>setPriceOpen(null)} aria-label="Close"><X size={22}/></button><h2>{ownedMap.has(priceOpen.id)?"Update purchase price":"Add to my collection"}</h2><p>{priceOpen.brand} · <strong>{priceOpen.name}</strong></p><form onSubmit={savePrice}><label>HOW MUCH DID YOU PAY?</label><div className="sc-money-input"><span className="sc-money-prefix">₦</span><input autoFocus type="number" inputMode="decimal" min="0" step="0.01" required value={price} onChange={e=>setPrice(e.target.value)} placeholder="0.00" /></div><button className="sc-primary" type="submit"><Check size={18}/> Save perfume</button></form></section></div>}
    {backupOpen&&<div className="sc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setBackupOpen(false)}}><section className="sc-price-dialog" role="dialog" aria-modal="true" aria-label="Backup your collection"><button className="sc-modal-close" onClick={()=>setBackupOpen(false)} aria-label="Close"><X size={22}/></button><h2>Backup & <em>restore.</em></h2><p>Your collection is saved in this browser. Export a backup before changing devices.</p><button className="sc-primary sc-block" onClick={exportBackup}><Download size={18}/> Download backup</button><button className="sc-secondary sc-block" onClick={()=>fileRef.current?.click()}><Upload size={18}/> Restore from JSON</button><input hidden ref={fileRef} type="file" accept="application/json,.json" onChange={importBackup}/><div className="sc-privacy-note"><CloudOff size={19}/><span>No automatic sync between devices.</span></div></section></div>}
  </main>;
}
