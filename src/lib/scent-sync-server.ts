/** Private, same-origin Scent Cabinet sync. No account or data is exposed by
 * the public fragrance catalogue. Requires SCENT_SYNC_DB D1 and a setup secret.
 * No secrets, sessions or plain passwords are ever sent in GET responses.
 */
type D1Statement={
  bind:(...args:unknown[])=>D1Statement;
  first:<T=Record<string,unknown>>()=>Promise<T|null>;
  run:()=>Promise<{meta:{changes?:number}}>;
};
export type ScentD1={prepare:(sql:string)=>D1Statement};
type Bindings={SCENT_SYNC_DB?:ScentD1;SCENT_SYNC_SETUP_KEY?:string};
const COOKIE="__Host-scent_sync";
const ITERATIONS=120000;
const SESSION_LENGTH=30*24*60*60*1000;
const MAX_BODY_BYTES=900_000;
const json=(value:unknown,status=200,extra?:HeadersInit)=>Response.json(value,{status,headers:{"cache-control":"no-store","x-content-type-options":"nosniff",...extra}});
function dbFrom(env:unknown):ScentD1|undefined{
  if(!env||typeof env!=="object")return;
  const d=(env as Bindings).SCENT_SYNC_DB;
  return d&&typeof d.prepare==="function"?d:undefined;
}
function setupKey(env:unknown):string{
  return env&&typeof env==="object"&&typeof (env as Bindings).SCENT_SYNC_SETUP_KEY==="string"
    ?(env as Bindings).SCENT_SYNC_SETUP_KEY!:"";
}
function bytesToHex(bytes:Uint8Array):string{return Array.from(bytes,x=>x.toString(16).padStart(2,"0")).join("");}
function hexToBytes(hex:string):Uint8Array{
  if(!/^(?:[a-f0-9]{2})+$/i.test(hex))throw Error("invalid hash");
  return Uint8Array.from(hex.match(/../g)!,x=>parseInt(x,16));
}
async function sha(value:string):Promise<string>{
  return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value))));
}
async function passwordHash(password:string,salt:string,iterations=ITERATIONS):Promise<string>{
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
  const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:hexToBytes(salt) as BufferSource,iterations,hash:"SHA-256"},key,256);
  return bytesToHex(new Uint8Array(bits));
}
function constantEqual(a:string,b:string):boolean{
  let v=a.length^b.length;
  for(let i=0;i<Math.max(a.length,b.length);i++)v|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);
  return v===0;
}
function cookieValue(request:Request):string|undefined{
  const found=(request.headers.get("cookie")||"").split(";").map(s=>s.trim()).find(s=>s.startsWith(COOKIE+"="));
  const value=found?.slice(COOKIE.length+1);
  return value&&/^[a-f0-9]{64}$/.test(value)?value:undefined;
}
function cookie(token:string,maxAge:number):string{
  return COOKIE+"="+token+"; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age="+maxAge;
}
async function authed(db:ScentD1,request:Request):Promise<boolean>{
  const token=cookieValue(request);if(!token)return false;
  const hash=await sha(token),now=Date.now();
  const session=await db.prepare("SELECT expires_at FROM scent_session WHERE token_hash=?").bind(hash).first<{expires_at:number}>();
  return Boolean(session&&session.expires_at>now);
}
async function input(request:Request):Promise<Record<string,unknown>>{
  const declared=Number(request.headers.get("content-length")||0);
  if(declared>MAX_BODY_BYTES)throw Error("too_large");
  const bytes=await request.arrayBuffer();
  if(bytes.byteLength>MAX_BODY_BYTES)throw Error("too_large");
  const parsed=JSON.parse(new TextDecoder().decode(bytes));
  if(!parsed||Array.isArray(parsed)||typeof parsed!=="object")throw Error("bad_input");
  return parsed as Record<string,unknown>;
}
function stateShape(state:unknown):boolean{
  if(!state||typeof state!=="object"||Array.isArray(state))return false;
  const s=state as Record<string,unknown>;
  return Array.isArray(s['collection'])&&Array.isArray(s['wishlist'])&&Array.isArray(s['combos'])&&
    Array.isArray(s['mixes'])&&s['insights']!==null&&typeof s['insights']==="object"&&!Array.isArray(s['insights'])&&
    s['collection'].length<=5000&&s['wishlist'].length<=5000&&s['combos'].length<=400&&s['mixes'].length<=1000;
}
export async function scentSyncApi(request:Request,env:unknown):Promise<Response>{
  const url=new URL(request.url),prefix="/api/fragrance/sync/";
  if(!url.pathname.startsWith(prefix))return json({error:"Not found"},404);
  const path=url.pathname.slice(prefix.length),db=dbFrom(env),method=request.method;
  if(!db)return json({enabled:false,reason:"Cloudflare D1 has not been connected"},method==="GET"&&path==="status"?200:503);
  if(!["status","setup","login","logout","snapshot"].includes(path))return json({error:"Not found"},404);
  if(method!=="GET"){
    if(request.headers.get("origin")!==url.origin||request.headers.get("x-scent-request")!=="1")
      return json({error:"Request not allowed"},403);
  }
  try{
    if(path==="status"&&method==="GET"){
      const account=await db.prepare("SELECT id FROM scent_account WHERE id='owner'").first();
      return json({enabled:true,initialized:Boolean(account),authenticated:Boolean(account&&await authed(db,request))});
    }
    if(path==="setup"&&method==="POST"){
      const body=await input(request),pass=body['password'],code=body['setupCode'],key=setupKey(env);
      if(!key||key.length<24)return json({error:"Set a long SCENT_SYNC_SETUP_KEY secret in Cloudflare first"},503);
      if(typeof code!=="string"||!constantEqual(code,key))return json({error:"Incorrect setup code"},403);
      if(typeof pass!=="string"||pass.length<12||pass.length>200)return json({error:"Choose a password with at least 12 characters"},400);
      const salt=bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
      const hash=await passwordHash(pass,salt);
      const saved=await db.prepare("INSERT OR IGNORE INTO scent_account(id,salt,password_hash,iterations,created_at) VALUES('owner',?,?,?,?)").bind(salt,hash,ITERATIONS,Date.now()).run();
      if(saved.meta.changes!==1)return json({error:"Account already set up; sign in instead"},409);
      return json({ok:true},201);
    }
    if(path==="login"&&method==="POST"){
      const body=await input(request),pw=body['password'];
      if(typeof pw!=="string"||pw.length>200)return json({error:"Incorrect password"},401);
      const now=Date.now(),throttle=await db.prepare("SELECT attempts,window_start,lock_until FROM scent_login_limit WHERE id='owner'").first<{attempts:number;window_start:number;lock_until:number}>();
      if(throttle&&throttle.lock_until>now)return json({error:"Too many attempts. Try again later."},429);
      const account=await db.prepare("SELECT salt,password_hash,iterations FROM scent_account WHERE id='owner'").first<{salt:string;password_hash:string;iterations:number}>();
      const good=Boolean(account&&constantEqual(await passwordHash(pw,account.salt,account.iterations),account.password_hash));
      if(!good){
        const attempts=throttle&&now-throttle.window_start<15*60*1000?throttle.attempts+1:1;
        await db.prepare("INSERT INTO scent_login_limit(id,attempts,window_start,lock_until) VALUES('owner',?,?,?) ON CONFLICT(id) DO UPDATE SET attempts=excluded.attempts,window_start=excluded.window_start,lock_until=excluded.lock_until")
          .bind(attempts,attempts===1?now:throttle!.window_start,attempts>=8?now+15*60*1000:0).run();
        return json({error:attempts>=8?"Too many attempts. Try again later.":"Incorrect password"},attempts>=8?429:401);
      }
      await db.prepare("DELETE FROM scent_login_limit WHERE id='owner'").run();
      const token=bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
      await db.prepare("INSERT INTO scent_session(token_hash,expires_at,created_at) VALUES(?,?,?)").bind(await sha(token),now+SESSION_LENGTH,now).run();
      return json({ok:true},200,{"set-cookie":cookie(token,SESSION_LENGTH/1000)});
    }
    if(path==="logout"&&method==="POST"){
      const token=cookieValue(request);
      if(token)await db.prepare("DELETE FROM scent_session WHERE token_hash=?").bind(await sha(token)).run();
      return json({ok:true},200,{"set-cookie":cookie("",0)});
    }
    if(path==="snapshot"&&(method==="GET"||method==="PUT")){
      if(!await authed(db,request))return json({error:"Sign in to sync"},401);
      const existing=await db.prepare("SELECT version,payload,updated_at FROM scent_snapshot WHERE id='owner'").first<{version:number;payload:string;updated_at:number}>();
      if(method==="GET")return json({version:existing?.version||0,data:existing?JSON.parse(existing.payload):null,updatedAt:existing?.updated_at||null});
      const body=await input(request);
      const expected=body['expectedVersion'],data=body['data'];
      if(!Number.isSafeInteger(expected)||Number(expected)<0||!stateShape(data))return json({error:"Invalid sync data"},400);
      const payload=JSON.stringify(data);
      if(new TextEncoder().encode(payload).length>MAX_BODY_BYTES)return json({error:"Collection too large for sync"},413);
      if(Number(expected)!==(existing?.version||0))return json({error:"Changes found on another device",code:"CONFLICT",version:existing?.version||0},409);
      const next=(existing?.version||0)+1,now=Date.now();
      const saved=existing?
        await db.prepare("UPDATE scent_snapshot SET version=?,payload=?,updated_at=? WHERE id='owner' AND version=?").bind(next,payload,now,expected).run():
        await db.prepare("INSERT OR IGNORE INTO scent_snapshot(id,version,payload,updated_at) VALUES('owner',1,?,?)").bind(payload,now).run();
      if(saved.meta.changes!==1)return json({error:"Changes found on another device",code:"CONFLICT"},409);
      return json({version:next,updatedAt:now});
    }
    return json({error:"Method not allowed"},405,{allow:path==="status"?"GET":path==="snapshot"?"GET, PUT":"POST"});
  }catch(error){
    if(error instanceof Error&&error.message==="too_large")return json({error:"Request is too large"},413);
    if(error instanceof SyntaxError||error instanceof Error&&error.message==="bad_input")return json({error:"Invalid JSON"},400);
    // Do not disclose database or authentication diagnostics publicly.
    console.error("Scent sync request failed:",error instanceof Error?error.name:"Unknown error");
    return json({error:"Sync temporarily unavailable"},503);
  }
}
