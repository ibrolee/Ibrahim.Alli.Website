import {useEffect,useRef,useState} from "react";

const BASE="/api/fragrance/sync/";
const META_KEY="ia-scent-sync-meta-v1";
const SAFETY_KEY="ia-scent-before-cloud-sync";
type Meta={version:number;synced:string};
export type CloudState="loading"|"unavailable"|"setup"|"signed-out"|"synced"|"syncing"|"offline"|"conflict"|"error";
type CloudResult={enabled?:boolean;initialized?:boolean;authenticated?:boolean;error?:string;version?:number;data?:unknown;code?:string};
const safeString=(value:unknown)=>JSON.stringify(value);
export function hasCabinetData(state:unknown):boolean {
  if(!state||typeof state!=="object")return false;
  const d=state as Record<string,unknown>;
  return ["collection","wishlist","combos","mixes"].some(k=>Array.isArray(d[k])&&(d[k] as unknown[]).length>0)||
    Boolean(d['insights']&&typeof d['insights']==="object"&&Object.keys(d['insights']).length);
}
export type InitialDecision="upload"|"download"|"matched"|"conflict";
export function chooseCabinetSync(local:unknown,remote:unknown,remoteVersion:number,meta:Meta|null):InitialDecision{
  if(remoteVersion===0)return hasCabinetData(local)?"upload":"matched";
  if(safeString(local)===safeString(remote))return "matched";
  if(meta&&meta.synced===safeString(local))return "download";
  // An intentional deletion on a previously synced device is an edit.
  if(meta&&meta.version===remoteVersion)return "upload";
  if(!hasCabinetData(local))return "download";
  return "conflict";
}
async function api(path:string,method="GET",body?:unknown):Promise<CloudResult>{
  const response=await fetch(BASE+path,{method,credentials:"same-origin",
    headers:{"accept":"application/json",...(method!=="GET"?{"content-type":"application/json","x-scent-request":"1"}:{})},
    ...(body===undefined?{}:{body:JSON.stringify(body)})});
  const value=await response.json() as CloudResult;
  if(!response.ok)throw Object.assign(new Error(value.error||"Couldn't connect"),{code:value.code||"",status:response.status});
  return value;
}
export function useCabinetSync<T extends {collection:unknown[];wishlist:unknown[];combos:unknown[];mixes:unknown[];insights:object}>(
  local:T,ready:boolean,receiveCloud:(value:unknown)=>void
){
  const localRef=useRef(local);localRef.current=local;
  const meta=useRef<Meta|null>(null);
  const running=useRef(false),initialized=useRef(false),enabled=useRef(false),signedIn=useRef(false);
  const [status,setStatus]=useState<CloudState>("loading");
  const [message,setMessage]=useState("");
  const [conflict,setConflict]=useState<{version:number;data:unknown}|null>(null);
  const [isSetUp,setIsSetUp]=useState(false);
  const saveMeta=(version:number,data:unknown)=>{
    const next={version,synced:safeString(data)};meta.current=next;
    try{localStorage.setItem(META_KEY,JSON.stringify(next));}catch{}
  };
  const preserveLocal=(value:T)=>{
    try{
      // Keep a one-time recovery copy before replacing browser state.
      if(!localStorage.getItem(SAFETY_KEY))localStorage.setItem(SAFETY_KEY,JSON.stringify(value));
    }catch{}
  };
  const acceptCloud=(data:unknown,version:number)=>{
    preserveLocal(localRef.current);
    saveMeta(version,data);
    receiveCloud(data);
    setConflict(null);setStatus("synced");setMessage("Your collection is up to date.");
  };
  async function push(data:T,expectedVersion:number){
    const saved=await api("snapshot","PUT",{expectedVersion,data});
    saveMeta(Number(saved.version),data);
    setConflict(null);setStatus("synced");setMessage("All changes saved to your private cloud.");
  }
  async function syncNow(){
    if(!ready||!signedIn.current||running.current||conflict)return;
    running.current=true;setStatus("syncing");setMessage("");
    try{
      const before=localRef.current;
      const snapshot=await api("snapshot");
      const version=Number(snapshot.version||0);
      if(before!==localRef.current){
        setStatus("synced");setTimeout(()=>void syncNow(),1200);return; // An edit happened while fetching.
      }
      const decision=chooseCabinetSync(before,snapshot.data,version,meta.current);
      if(decision==="conflict"){
        setConflict({version,data:snapshot.data});setStatus("conflict");
        setMessage("Both this browser and the cloud contain different collections. Choose which one to keep.");
      }else if(decision==="upload")await push(before,version);
      else if(decision==="download")acceptCloud(snapshot.data,version);
      else {saveMeta(version,before);setStatus("synced");}
    }catch(err){
      const error=err as Error&{status?:number;code?:string};
      if(error.status===409){setStatus("conflict");setMessage("The cloud changed while saving. Review before continuing.");
        // Fetch a new version at the next manual retry; never overwrite it blindly.
        setConflict({version:-1,data:null});
      }else if(error.status===401){signedIn.current=false;setStatus("signed-out");setMessage("Please sign in again.");}
      else {setStatus(typeof navigator!=="undefined"&&!navigator.onLine?"offline":"error");setMessage(error.message||"Couldn't sync right now.");}
    }finally{running.current=false;}
  }
  async function refresh(){
    try{
      const info=await api("status");
      enabled.current=Boolean(info.enabled);
      signedIn.current=Boolean(info.authenticated);
      setIsSetUp(Boolean(info.initialized));
      if(!info.enabled){setStatus("unavailable");setMessage("Connect Cloudflare D1 to enable private sync.");return;}
      if(!info.initialized){setStatus("setup");setMessage("Create your private account once to begin.");return;}
      if(!info.authenticated){setStatus("signed-out");setMessage("");return;}
      await syncNow();
    }catch(e){setStatus("error");setMessage(e instanceof Error?e.message:"Couldn't check sync.");}
  }
  useEffect(()=>{
    if(!ready||initialized.current)return;
    initialized.current=true;
    try{
      const stored=localStorage.getItem(META_KEY);
      if(stored){const candidate=JSON.parse(stored) as Meta;if(Number.isSafeInteger(candidate.version)&&typeof candidate.synced==="string")meta.current=candidate;}
    }catch{}
    void refresh();
  },[ready]);
  useEffect(()=>{
    if(!ready||!signedIn.current||conflict||status==="unavailable"||status==="signed-out")return;
    const pending=setTimeout(()=>{void syncNow()},1400);
    return()=>clearTimeout(pending);
  },[local,ready,conflict]);
  useEffect(()=>{
    function online(){if(signedIn.current&&!conflict)void syncNow();}
    function visibility(){if(document.visibilityState==="visible")online();}
    window.addEventListener("online",online);
    document.addEventListener("visibilitychange",visibility);
    // Pick up changes made in Safari while the Home Screen app stays open.
    const periodic=window.setInterval(()=>{if(document.visibilityState==="visible")online();},90000);
    return()=>{window.removeEventListener("online",online);document.removeEventListener("visibilitychange",visibility);window.clearInterval(periodic);};
  },[conflict]);
  async function connect(password:string,setupCode?:string){
    if(password.length<12&&setupCode!==undefined)throw Error("Use at least 12 characters for your password.");
    if(setupCode!==undefined){await api("setup","POST",{password,setupCode});setIsSetUp(true);}
    await api("login","POST",{password});
    signedIn.current=true;setStatus("syncing");
    await syncNow();
  }
  async function disconnect(){
    try{await api("logout","POST",{});}finally{signedIn.current=false;setStatus("signed-out");setMessage("Signed out. Local data stays on this device.");}
  }
  async function resolveConflict(choice:"device"|"cloud"){
    if(!conflict)return;
    setStatus("syncing");running.current=true;
    try{
      const snapshot=await api("snapshot");
      const version=Number(snapshot.version||0);
      if(choice==="cloud")acceptCloud(snapshot.data,version);
      else await push(localRef.current,version);
    }catch(e){setStatus("error");setMessage(e instanceof Error?e.message:"Sync failed");}
    finally{running.current=false;}
  }
  return {status,message,conflict,isSetUp,connect,disconnect,resolveConflict,refresh,syncNow,enabled:enabled.current};
}
