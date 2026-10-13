import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { authenticateStudio, isOwnerSignedIn } from "@/lib/studio-auth";

export const Route=createFileRoute("/owner-login")({
  head:()=>({
    meta:[
      {title:"Owner Sign In — Ibrahim Alli"},
      {name:"robots",content:"noindex, nofollow, noarchive"},
      {name:"description",content:"Restricted owner sign-in for private portfolio document tools."},
    ],
  }),
  loader:()=>isOwnerSignedIn(),
  component:OwnerLogin,
});

function OwnerLogin(){
  const signedIn=Route.useLoaderData();
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function login(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(loading)return;
    setError("");setLoading(true);
    try{
      const result=await authenticateStudio({data:{password}});
      if(result.ok){
        setPassword("");
        window.location.assign("/client-documents");
        return;
      }
      setError(result.unavailable?"The private studio is not configured yet.":"Incorrect access password.");
    }catch{
      setError("Unable to sign in right now. Please try again.");
    }finally{setLoading(false);}
  }
  return(
    <main id="main-content" className="ia-stage-page ia-4b-page ia-studio-auth-page">
      <section className="ia-studio-login-wrap">
        <div className="p-container">
          <Link to="/" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Return to portfolio</Link>
          <div className="ia-studio-login-card">
            <div className="ia-studio-lock-icon"><LockKeyhole size={25} aria-hidden="true"/></div>
            <p className="p-label">Owner access only</p>
            <h1>Document <em>Studio.</em></h1>
            <p className="ia-studio-login-desc">A private workspace for proposals, invoices and project agreements. Sign in to continue.</p>
            {signedIn?(
              <a href="/client-documents" className="ia-stage-primary ia-studio-login-primary">Continue to your studio <ArrowRight size={17} aria-hidden="true"/></a>
            ):(
              <form onSubmit={login} className="ia-studio-login-form">
                <label htmlFor="studio-password">Owner access password</label>
                <input id="studio-password" type="password" name="password" autoComplete="current-password" minLength={1} maxLength={256} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/>
                {error&&<p role="alert" className="ia-studio-auth-error">{error}</p>}
                <button className="ia-stage-primary ia-studio-login-primary" type="submit" disabled={loading}>{loading?"Checking access…":"Unlock Document Studio"} <ArrowRight size={17} aria-hidden="true"/></button>
              </form>
            )}
            <div className="ia-studio-login-note"><ShieldCheck size={17} aria-hidden="true"/><span>Secure, 8-hour browser session. Your work stays on your device; no client database is connected.</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
