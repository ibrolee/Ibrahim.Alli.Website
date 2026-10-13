/**
 * Stage 4B owner-only cookie sessions. This module is server-only.
 * Never import its functions in client components.
 * Browser documents themselves are not stored server-side.
 */
const COOKIE_NAME = "__Host-ibrahim-studio";
const SESSION_SECONDS = 60 * 60 * 8;
const encoder = new TextEncoder();

function getSecrets(){
  // Both variables must be provisioned by the deployment host, never the repository.
  const password = process.env.STUDIO_ACCESS_PASSWORD || "";
  const signingKey = process.env.STUDIO_SESSION_SECRET || "";
  return {
    password,
    signingKey,
    configured: password.length >= 24 && signingKey.length >= 32,
  };
}

export function isStudioConfigured(){
  return getSecrets().configured;
}

function fixedTimeMatch(a:string,b:string){
  let mismatch=a.length ^ b.length;
  for(let i=0;i<Math.max(a.length,b.length);i++){
    mismatch |= (a.charCodeAt(i)||0) ^ (b.charCodeAt(i)||0);
  }
  return mismatch===0;
}

async function hashString(value:string){
  const bytes=await crypto.subtle.digest("SHA-256",encoder.encode(value));
  return Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

export async function verifyOwnerPassword(value:string){
  const secrets=getSecrets();
  if(!secrets.configured || typeof value!=="string" || value.length>256)return false;
  const [actual,expected] = await Promise.all([hashString(value),hashString(secrets.password)]);
  return fixedTimeMatch(actual,expected);
}

function base64url(bytes:Uint8Array){
  return btoa(Array.from(bytes,byte=>String.fromCharCode(byte)).join(""))
    .replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");
}

async function sessionSignature(payload:string){
  const {signingKey,configured}=getSecrets();
  if(!configured)return "";
  const key=await crypto.subtle.importKey(
    "raw",encoder.encode(signingKey),{name:"HMAC",hash:"SHA-256"},false,["sign"]
  );
  const signature=await crypto.subtle.sign("HMAC",key,encoder.encode(payload));
  return base64url(new Uint8Array(signature));
}

export async function issueStudioCookie(){
  const expires=Math.floor(Date.now()/1000)+SESSION_SECONDS;
  const payload="v1."+expires;
  const signature=await sessionSignature(payload);
  return [
    COOKIE_NAME+"="+payload+"."+signature,
    "Path=/","HttpOnly","Secure","SameSite=Strict",
    "Max-Age="+SESSION_SECONDS,
  ].join("; ");
}

export function expiredStudioCookie(){
  return COOKIE_NAME+"=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}

export async function isStudioAuthorized(cookieHeader:string|null|undefined){
  if(!isStudioConfigured()||!cookieHeader)return false;
  const raw = cookieHeader.split(";").map(v=>v.trim()).find(v=>v.startsWith(COOKIE_NAME+"="));
  if(!raw)return false;
  const token=raw.slice(COOKIE_NAME.length+1);
  const match=/^(v1)\.(\d{10})\.([A-Za-z0-9_-]+)$/.exec(token);
  if(!match)return false;
  const expiry=Number(match[2]);
  const now=Math.floor(Date.now()/1000);
  if(!Number.isFinite(expiry)||expiry<=now||expiry>now+SESSION_SECONDS)return false;
  const expected=await sessionSignature(match[1]+"."+match[2]);
  return fixedTimeMatch(match[3],expected);
}
