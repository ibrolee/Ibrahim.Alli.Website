import {describe,expect,test} from "bun:test";
import {scentSyncApi,SCENT_R2_MAX_PHOTOS,SCENT_R2_MAX_PHOTO_BYTES,type ScentR2,type ScentD1} from "./scent-sync-server";
import {allowedPhotoKey,PHOTO_SYNC_MAX_ITEMS} from "./scent-photo-cloud";

const url="https://ibrahimalli.com/api/fragrance/sync/";
const token="a".repeat(64);
class FakeR2 implements ScentR2 {
  entries=new Map<string,{bytes:Uint8Array;type:string;metadata:Record<string,string>;etag:string}>();
  counter=0;
  async get(key:string){
    const v=this.entries.get(key);if(!v)return null;
    return {body:new Blob([v.bytes as BlobPart]).stream() as ReadableStream<Uint8Array>,
      httpMetadata:{contentType:v.type},customMetadata:v.metadata,etag:v.etag};
  }
  async put(key:string,data:ArrayBuffer|Uint8Array,opts?:{httpMetadata?:{contentType:string};customMetadata?:Record<string,string>}){
    const bytes=data instanceof Uint8Array?data:new Uint8Array(data);
    this.entries.set(key,{bytes,type:opts?.httpMetadata?.contentType||"",metadata:opts?.customMetadata||{},etag:String(++this.counter)});
    return {etag:String(this.counter)};
  }
  async list(){
    return {objects:[...this.entries].map(([key,v])=>({key,etag:v.etag,customMetadata:v.metadata})),truncated:false};
  }
}
function fakeD1():ScentD1{
  return {prepare:(sql:string)=>{
    return {bind:function(){return this;},
      first:async ()=>{
        if(sql.includes("SELECT expires_at FROM scent_session"))return {expires_at:Date.now()+500000} as never;
        throw Error("Unexpected D1 read "+sql);
      },
      run:async()=>({meta:{changes:1}})
    };
  }};
}
function req(path:string,method="GET",body?:Uint8Array,ctype?:string,createOnly=false,cookie=true){
  const headers:Record<string,string>={};
  if(cookie)headers.cookie="__Host-scent_sync="+token;
  if(method!=="GET"){
    headers.origin="https://ibrahimalli.com";headers["x-scent-request"]="1";
    if(ctype)headers["content-type"]=ctype;
    if(createOnly)headers["x-scent-create-only"]="1";
  }
  return new Request(url+path,{method,headers,...(body?{body:body as BodyInit}:{}),...(method==="DELETE"?{}:{})});
}
describe("Scent Cabinet private R2 photo API",()=>{
  test("validates owner photo IDs",()=>{
    expect(allowedPhotoKey("manual:abc123")).toBe(true);
    expect(allowedPhotoKey("combo:xyz_01")).toBe(true);
    expect(allowedPhotoKey("catalogue:123")).toBe(false);
    expect(allowedPhotoKey("manual:../a")).toBe(false);
  });
  test("private, disabled without bucket, and only accepts small approved images",async()=>{
    const db=fakeD1(),r2=new FakeR2(),env={SCENT_SYNC_DB:db,SCENT_PHOTOS_R2:r2};
    expect((await scentSyncApi(req("photos/status","GET",undefined,undefined,false,false),env)).status).toBe(401);
    const off=await scentSyncApi(req("photos/status"),{SCENT_SYNC_DB:db});
    expect((await off.json()).enabled).toBe(false);
    const on=await scentSyncApi(req("photos/status"),env);
    expect((await on.json()).enabled).toBe(true);
    expect((await scentSyncApi(req("photos/item/manual:one","PUT",new Uint8Array([1,2]),"text/plain"),env)).status).toBe(415);
    expect((await scentSyncApi(req("photos/item/manual:one","PUT",new Uint8Array(500001),"image/jpeg"),env)).status).toBe(413);
    expect((await scentSyncApi(req("photos/item/manual:%2E%2E%2Ftest"),env)).status).toBe(400);
  });
  test("enforces intentionally tiny free-tier storage allowance",async()=>{
    expect(SCENT_R2_MAX_PHOTOS).toBe(200);
    expect(PHOTO_SYNC_MAX_ITEMS).toBe(200);
    expect(SCENT_R2_MAX_PHOTO_BYTES).toBe(450000);
    expect(SCENT_R2_MAX_PHOTOS*SCENT_R2_MAX_PHOTO_BYTES).toBe(90000000);
    const r2=new FakeR2(),env={SCENT_SYNC_DB:fakeD1(),SCENT_PHOTOS_R2:r2};
    const small=new Uint8Array([255,216,255,217]);
    expect((await scentSyncApi(req("photos/item/manual:allowed","PUT",small,"image/jpeg"),env)).status).toBe(200);
    expect((await scentSyncApi(req("photos/item/manual:too-big","PUT",new Uint8Array(450001),"image/jpeg"),env)).status).toBe(413);
    for(let i=0;i<199;i++)r2.entries.set("owner/photos/manual:"+i,{bytes:small,type:"image/jpeg",metadata:{deleted:"0"},etag:String(i)});
    const denied=await scentSyncApi(req("photos/item/manual:new","PUT",small,"image/jpeg"),env);
    expect(denied.status).toBe(507);
    expect((await denied.json()).code).toBe("PHOTO_QUOTA");
    // Allow replacing an existing image without raising the quota.
    expect((await scentSyncApi(req("photos/item/manual:allowed","PUT",small,"image/jpeg"),env)).status).toBe(200);
  });
  test("copies jpeg, protects initial upload, and uses tombstone on deletion",async()=>{
    const r2=new FakeR2(),env={SCENT_SYNC_DB:fakeD1(),SCENT_PHOTOS_R2:r2};
    const name="photos/item/manual:mybottle1",bytes=new Uint8Array([255,216,255,217]);
    const put=await scentSyncApi(req(name,"PUT",bytes,"image/jpeg",true),env);
    expect(put.status).toBe(200);
    const conflict=await scentSyncApi(req(name,"PUT",bytes,"image/jpeg",true),env);
    expect(conflict.status).toBe(409);
    const get=await scentSyncApi(req(name),env);
    expect(get.status).toBe(200);
    expect([...new Uint8Array(await get.arrayBuffer())]).toEqual([...bytes]);
    expect(get.headers.get("cache-control")).toContain("no-store");
    const index=await scentSyncApi(req("photos/index"),env);
    expect((await index.json()).records["manual:mybottle1"].deleted).toBe(false);
    expect((await scentSyncApi(req(name,"DELETE"),env)).status).toBe(200);
    expect((await scentSyncApi(req(name),env)).status).toBe(410);
    const removed=await scentSyncApi(req("photos/index"),env);
    expect((await removed.json()).records["manual:mybottle1"].deleted).toBe(true);
  });
});
