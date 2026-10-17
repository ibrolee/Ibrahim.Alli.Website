/** Scent Cabinet owner-supplied photos. All bytes stay in this browser's IndexedDB.
 * No server uploads, external image searches, or API quota usage.
 */
const DB_NAME="ia-scent-cabinet-photos";
const PHOTO_STORE="photos";
const DB_VERSION=1;
function openDb():Promise<IDBDatabase>{
  if(typeof indexedDB==="undefined") return Promise.reject(new Error("Photo storage is unavailable in this browser."));
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(PHOTO_STORE))req.result.createObjectStore(PHOTO_STORE);};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(new Error("Could not open local photo storage."));
    req.onblocked=()=>reject(new Error("Local photo storage is busy. Close another tab and try again."));
  });
}
export async function saveScentPhoto(key:string,image:Blob):Promise<void>{
  const db=await openDb();
  try{await new Promise<void>((resolve,reject)=>{
    const tx=db.transaction(PHOTO_STORE,"readwrite");
    tx.objectStore(PHOTO_STORE).put(image,key);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(new Error("Could not save photo. Browser storage may be full."));
    tx.onabort=()=>reject(new Error("Photo save was interrupted."));
  });}finally{db.close();}
}
export async function getScentPhoto(key:string):Promise<Blob|undefined>{
  const db=await openDb();
  try{return await new Promise<Blob|undefined>((resolve,reject)=>{
    const tx=db.transaction(PHOTO_STORE,"readonly");
    const req=tx.objectStore(PHOTO_STORE).get(key);
    req.onsuccess=()=>resolve(req.result instanceof Blob?req.result:undefined);
    req.onerror=()=>reject(new Error("Could not read photo."));
  });}finally{db.close();}
}
export async function removeScentPhoto(key:string):Promise<void>{
  const db=await openDb();
  try{await new Promise<void>((resolve,reject)=>{
    const tx=db.transaction(PHOTO_STORE,"readwrite");
    tx.objectStore(PHOTO_STORE).delete(key);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(new Error("Could not delete photo."));
  });}finally{db.close();}
}
export function blobAsDataUrl(blob:Blob):Promise<string>{
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result||""));
    reader.onerror=()=>reject(new Error("Photo cannot be backed up."));
    reader.readAsDataURL(blob);
  });
}
export function dataUrlAsBlob(data:string):Blob{
  const match=/^data:(image\/(?:webp|jpeg|png));base64,([a-zA-Z0-9+/=]+)$/.exec(data);
  if(!match||data.length>1_000_000)throw new Error("Invalid backup image.");
  const binary=atob(match[2]);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return new Blob([bytes],{type:match[1]});
}
/** Resize client-side for storage and backup; keep aspect ratio and cap output size. */
export async function compressScentPhoto(file:File):Promise<Blob>{
  if(!file.type.startsWith("image/"))throw new Error("Choose a photo (JPG, PNG or a supported image).");
  if(file.size>22*1024*1024)throw new Error("That photo is too large. Please choose one under 22 MB.");
  const localUrl=URL.createObjectURL(file);
  try{
    const img=await new Promise<HTMLImageElement>((resolve,reject)=>{
      const image=new Image();
      image.onload=()=>resolve(image);
      image.onerror=()=>reject(new Error("This image format could not be opened. Try JPEG."));
      image.src=localUrl;
    });
    const max=880,scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
    if(!(img.naturalWidth>0&&img.naturalHeight>0))throw new Error("Photo has invalid dimensions.");
    const canvas=document.createElement("canvas");
    canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));
    canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
    const ctx=canvas.getContext("2d");
    if(!ctx)throw new Error("Image processing is not supported.");
    ctx.fillStyle="#ffffff";ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const encode=(quality:number):Promise<Blob>=>new Promise((resolve,reject)=>{
      canvas.toBlob(b=>b?resolve(b):reject(new Error("Could not compress image.")),"image/jpeg",quality);
    });
    let output=await encode(.8);
    if(output.size>450_000)output=await encode(.60);
    if(output.size>450_000)throw new Error("Photo could not be made small enough.");
    return output;
  }finally{URL.revokeObjectURL(localUrl);}
}
