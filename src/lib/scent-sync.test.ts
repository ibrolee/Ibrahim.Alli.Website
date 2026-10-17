import {describe,expect,test} from "bun:test";
import {chooseCabinetSync,hasCabinetData} from "./scent-sync-client";
import {scentSyncApi,type ScentD1} from "./scent-sync-server";
const empty=()=>({collection:[],wishlist:[],combos:[],mixes:[],insights:{}});
const withSix=()=>({...empty(),wishlist:Array.from({length:6},(_,i)=>({id:String(i),name:"Perfume "+i,brand:"Brand"}))});
const url="https://ibrahimalli.com/api/fragrance/sync/";
const setupCode="scent-cabinet-setup-test-secret-long-unique";
const request=(path:string,method="GET",body?:unknown,cookie?:string)=>new Request(url+path,{method,headers:{
  ...(method==="GET"?{}:{"origin":"https://ibrahimalli.com","x-scent-request":"1","content-type":"application/json"}),
  ...(cookie?{cookie}:{})
},...(body===undefined?{}:{body:JSON.stringify(body)})});
class FakeD1 {
  account:{salt:string;password_hash:string;iterations:number}|null=null;
  session=new Map<string,number>();snapshot:{version:number;payload:string;updated_at:number}|null=null;
  attempts:{attempts:number;window_start:number;lock_until:number}|null=null;
  prepare(sql:string){
    let values:unknown[]=[];
    const stmt={bind:(...args:unknown[])=>{values=args;return stmt;},
      first:async()=>{
        if(sql.startsWith("SELECT id FROM scent_account"))return this.account?{id:"owner"}:null;
        if(sql.startsWith("SELECT salt,password_hash"))return this.account;
        if(sql.startsWith("SELECT expires_at")){const e=this.session.get(String(values[0]));return e?{expires_at:e}:null;}
        if(sql.startsWith("SELECT attempts"))return this.attempts;
        if(sql.startsWith("SELECT version,payload"))return this.snapshot;
        throw Error("Unexpected first: "+sql);
      },
      run:async()=>{
        let changes=1;
        if(sql.startsWith("INSERT OR IGNORE INTO scent_account")){
          if(this.account)changes=0;else this.account={salt:String(values[0]),password_hash:String(values[1]),iterations:Number(values[2])};
        }else if(sql.startsWith("INSERT INTO scent_session"))this.session.set(String(values[0]),Number(values[1]));
        else if(sql.startsWith("DELETE FROM scent_login_limit"))this.attempts=null;
        else if(sql.startsWith("INSERT INTO scent_login_limit"))this.attempts={attempts:Number(values[0]),window_start:Number(values[1]),lock_until:Number(values[2])};
        else if(sql.startsWith("DELETE FROM scent_session"))this.session.delete(String(values[0]));
        else if(sql.startsWith("INSERT OR IGNORE INTO scent_snapshot")){
          if(this.snapshot)changes=0;else this.snapshot={version:1,payload:String(values[0]),updated_at:Number(values[1])};
        }else if(sql.startsWith("UPDATE scent_snapshot")){
          if(!this.snapshot||this.snapshot.version!==Number(values[3]))changes=0;
          else this.snapshot={version:Number(values[0]),payload:String(values[1]),updated_at:Number(values[2])};
        }else throw Error("Unexpected run: "+sql);
        return {meta:{changes}};
      }};
    return stmt;
  }
}
describe("Scent Cabinet private sync",()=>{
  test("empty Safari cannot overwrite six existing fragrances",()=>{
    expect(hasCabinetData(withSix())).toBe(true);
    expect(chooseCabinetSync(withSix(),null,0,null)).toBe("upload");
    expect(chooseCabinetSync(empty(),withSix(),1,null)).toBe("download");
    expect(chooseCabinetSync(withSix(),{...empty(),wishlist:[{id:"else"}]},1,null)).toBe("conflict");
    expect(chooseCabinetSync(withSix(),withSix(),3,null)).toBe("matched");
    expect(chooseCabinetSync(empty(),withSix(),3,{version:3,synced:JSON.stringify(withSix())})).toBe("upload");
  });
  test("sync remains disabled and public snapshot is inaccessible without D1",async()=>{
    const status=await scentSyncApi(request("status"),{});
    expect(status.status).toBe(200);expect((await status.json()).enabled).toBe(false);
    const snapshot=await scentSyncApi(request("snapshot"),{});
    expect(snapshot.status).toBe(503);
  });
  test("requires same origin and private authentication before writing",async()=>{
    const db=new FakeD1();
    const unauth=await scentSyncApi(request("snapshot","PUT",{expectedVersion:0,data:withSix()}),{SCENT_SYNC_DB:db as unknown as ScentD1});
    expect(unauth.status).toBe(401);
    const cross=await scentSyncApi(new Request(url+"setup",{method:"POST",headers:{"origin":"https://outside.example","x-scent-request":"1"},body:"{}"}),{SCENT_SYNC_DB:db as unknown as ScentD1});
    expect(cross.status).toBe(403);
  });
  test("setup, sign in, write, conflict and sign out without leaking a password",async()=>{
    const db=new FakeD1(),env={SCENT_SYNC_DB:db as unknown as ScentD1,SCENT_SYNC_SETUP_KEY:setupCode};
    expect((await scentSyncApi(request("setup","POST",{setupCode:"wrong",password:"my-long-password-123"}),env)).status).toBe(403);
    const created=await scentSyncApi(request("setup","POST",{setupCode,password:"my-long-password-123"}),env);
    expect(created.status).toBe(201);
    expect(JSON.stringify(db.account)).not.toContain("my-long-password-123");
    expect((await scentSyncApi(request("setup","POST",{setupCode,password:"second-password-123"}),env)).status).toBe(409);
    const bad=await scentSyncApi(request("login","POST",{password:"incorrect-password"}),env);
    expect(bad.status).toBe(401);
    const login=await scentSyncApi(request("login","POST",{password:"my-long-password-123"}),env);
    expect(login.status).toBe(200);
    const cookie=(login.headers.get("set-cookie")||"").split(";")[0]!;
    expect(cookie).toContain("__Host-scent_sync=");
    expect((await scentSyncApi(request("snapshot","PUT",{expectedVersion:0,data:withSix()},cookie),env)).status).toBe(200);
    const existing=await scentSyncApi(request("snapshot","GET",undefined,cookie),env);
    expect((await existing.json()).data.wishlist).toHaveLength(6);
    expect((await scentSyncApi(request("snapshot","PUT",{expectedVersion:0,data:empty()},cookie),env)).status).toBe(409);
    const out=await scentSyncApi(request("logout","POST",{},cookie),env);
    expect(out.status).toBe(200);
    expect((await scentSyncApi(request("snapshot","GET",undefined,cookie),env)).status).toBe(401);
  });
});
