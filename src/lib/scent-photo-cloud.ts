import {getScentPhoto,removeScentPhoto,saveScentPhoto} from "./scent-photos";

/** Private R2 photo sync. Intentional edits and deletes are queued locally first;
 * a browser without a cloud connection never loses its image. */
const ROOT="/api/fragrance/sync/photos/";
// Conservative personal-use ceiling: max 200 images (~90 MB total).
export const PHOTO_SYNC_MAX_ITEMS=200;
const QUEUE="ia-scent-photo-outbox-v1";
const ETAGS="ia-scent-photo-etags-v1";
export type PhotoSyncState="idle"|"checking"|"ready"|"unavailable"|"syncing"|"error";
export type PhotoAction="upsert"|"delete";
export type PhotoIndex=Record<string,{deleted:boolean;etag?:string}>;
export function allowedPhotoKey(key:string):boolean{return /^(?:manual|combo):[a-zA-Z0-9._-]{1,140}$/.test(key);}
function load<T>(name:string,fall:T):T{
  try{const stored=localStorage.getItem(name);return stored?JSON.parse(stored) as T:fall;}catch{return fall;}
}
function save(name:string,value:unknown){
  try{localStorage.setItem(name,JSON.stringify(value));}catch{throw new Error("Cannot safely queue photo sync. Storage is full.");}
}
export function queuePhotoChange(id:string,action:PhotoAction):void{
  if(!allowedPhotoKey(id))return;
  const queue=load<Record<string,PhotoAction>>(QUEUE,{});
  queue[id]=action;save(QUEUE,queue);
}
type PhotoError=Error&{status?:number;code?:string};
async function request(url:string,init?:RequestInit):Promise<Response>{
  const res=await fetch(ROOT+url,{credentials:"same-origin",cache:"no-store",...init,headers:{
    ...(init?.method&&init.method!=="GET"?{"x-scent-request":"1"}:{}),
    ...(init?.headers||{})
  }});
  if(!res.ok){
    let message="Photo sync failed",code="";
    try{const x=await res.json() as {error?:string;code?:string};message=x.error||message;code=x.code||"";}catch{}
    throw Object.assign(new Error(message),{status:res.status,code});
  }
  return res;
}
const idUrl=(id:string)=>"item/"+encodeURIComponent(id);
export async function photoBucketStatus():Promise<boolean>{
  const r=await request("status");return Boolean((await r.json() as {enabled?:boolean}).enabled);
}
export async function photoIndex():Promise<PhotoIndex>{
  const r=await request("index");const data=await r.json() as {records?:PhotoIndex};
  return data.records||{};
}
async function upload(id:string,blob:Blob,createOnly:boolean){
  const r=await request(idUrl(id),{method:"PUT",headers:{
    "content-type":blob.type||"image/jpeg",...(createOnly?{"x-scent-create-only":"1"}:{})
  },body:blob});
  await r.json();
}
async function markDeleted(id:string){await request(idUrl(id),{method:"DELETE"});}
async function download(id:string):Promise<Blob>{
  const response=await request(idUrl(id));
  const blob=await response.blob();
  if(blob.size===0||blob.size>450000||!["image/jpeg","image/png","image/webp"].includes(blob.type))throw new Error("Invalid cloud photo.");
  return blob;
}
export type PhotoSyncReport={uploaded:number;downloaded:number;removed:number;conflicts:number;remaining:number};
/** Reconcile explicit edits first. When two devices initially hold different images,
 * preserve both locally rather than overwriting either unasked. */
export async function reconcilePhotos(keys:string[],onReceived:(id:string,blob:Blob)=>void,onDeleted:(id:string)=>void):Promise<PhotoSyncReport>{
  const wanted=[...new Set(keys.filter(allowedPhotoKey))];
  if(wanted.length>PHOTO_SYNC_MAX_ITEMS)throw new Error("Photo syncing is limited to 200 images to avoid extra Cloudflare usage.");
  const queue=load<Record<string,PhotoAction>>(QUEUE,{});
  const known=load<Record<string,string>>(ETAGS,{});
  let uploaded=0,downloaded=0,removed=0,conflicts=0;
  let remote=await photoIndex();
  // Process saved actions even for combos deleted since they were last synced.
  for(const [id,action] of Object.entries(queue)){
    if(!allowedPhotoKey(id)){delete queue[id];save(QUEUE,queue);continue;}
    if(action==="delete"){
      await markDeleted(id);remote[id]={deleted:true};
      delete known[id];delete queue[id];save(QUEUE,queue);save(ETAGS,known);removed++;continue;
    }
    const blob=await getScentPhoto(id);
    if(!blob){delete queue[id];save(QUEUE,queue);continue;}
    await upload(id,blob,false);
    // Get fresh etag so subsequent updates are distinguishable from old local photos.
    remote=await photoIndex();
    if(remote[id]?.etag)known[id]=remote[id].etag;
    delete queue[id];save(QUEUE,queue);save(ETAGS,known);uploaded++;
  }
  for(const id of wanted){
    const r=remote[id],local=await getScentPhoto(id);
    if(r?.deleted){
      // Tombstones prevent old photos on other devices from reappearing.
      if(local){await removeScentPhoto(id);onDeleted(id);removed++;}
      delete known[id];continue;
    }
    if(!r){
      if(local){
        try{
          await upload(id,local,true);uploaded++;
          // Track the initial upload ETag to distinguish later replacements.
          const now=await photoIndex();
          if(now[id]?.etag)known[id]=now[id].etag;
        }catch(err){
          if((err as PhotoError).status!==409)throw err; // Another device beat us to upload.
        }
      }
      continue;
    }
    if(!local){
      const blob=await download(id);await saveScentPhoto(id,blob);
      onReceived(id,blob);downloaded++;
    }else if(known[id]&&r.etag&&known[id]!==r.etag){
      const blob=await download(id);await saveScentPhoto(id,blob);
      onReceived(id,blob);downloaded++;
    }else if(!known[id]){
      // Two independently saved pictures? Do not destroy either without consent.
      conflicts++;
    }
    if(r.etag&&(!local||Boolean(known[id])))known[id]=r.etag;
  }
  save(ETAGS,known);
  return {uploaded,downloaded,removed,conflicts,remaining:Object.keys(queue).length};
}
