import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";

/** Read the cookie only on the server; the browser receives just a yes/no. */
export const isOwnerSignedIn = createServerFn({method:"GET"}).handler(async ()=>{
  const {isStudioAuthorized}=await import("./studio-session.server");
  return isStudioAuthorized(getRequestHeader("cookie"));
});

export const authenticateStudio = createServerFn({method:"POST"})
  .validator((input:{password:string})=>({
    password:typeof input?.password==="string"?input.password:"",
  }))
  .handler(async ({data})=>{
    const {verifyOwnerPassword,issueStudioCookie,isStudioConfigured}=await import("./studio-session.server");
    if(!isStudioConfigured())return {ok:false,unavailable:true};
    if(!await verifyOwnerPassword(data.password))return {ok:false,unavailable:false};
    setResponseHeader("Set-Cookie",await issueStudioCookie());
    setResponseHeader("Cache-Control","no-store");
    return {ok:true,unavailable:false};
  });

export const signOutStudio = createServerFn({method:"POST"}).handler(async ()=>{
  const {expiredStudioCookie}=await import("./studio-session.server");
  setResponseHeader("Set-Cookie",expiredStudioCookie());
  setResponseHeader("Cache-Control","no-store");
  return {ok:true};
});
