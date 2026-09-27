import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, UploadCloud } from "lucide-react";
import { FormEvent, useState } from "react";
import { SpsHeader } from "@/components/super-plus-studios";

export const Route=createFileRoute("/super-plus-studios/custom-request")({
  head:()=>({meta:[{title:"Custom Skin Request — Super Plus Studios"},{name:"robots",content:"noindex, nofollow"}]}),
  component:CustomRequest,
});

function CustomRequest(){
  const [done,setDone]=useState(false);
  const [type,setType]=useState("Personal");
  const submit=(e:FormEvent)=>{e.preventDefault();setDone(true)};
  return <main className="sps-page">
    <div className="sps-topbar"><span>CUSTOM REQUESTS</span><span>PERSONAL · BUSINESS · BULK</span></div><SpsHeader/>
    <section className="sps-subhero sps-custom-hero"><span>MAKE SOMETHING DIFFERENT</span><h1>Have an idea?<br/><em>Send the brief.</em></h1><p>Photos, initials, business branding, event skins or something you can’t find in the ready-made collection.</p></section>
    {!done?<form className="sps-request-shell" onSubmit={submit}>
      <div className="sps-request-intro"><span>01 / REQUEST TYPE</span><h2>What are we<br/><em>making?</em></h2></div>
      <div className="sps-request-form">
        <div className="sps-choice"><span>Request type</span><div>{["Personal","Business / logo","Bulk / event"].map(x=><button type="button" className={type===x?"active":""} onClick={()=>setType(x)} key={x}>{x}</button>)}</div></div>
        <div className="sps-contact-grid"><label><span>Device</span><input required placeholder="e.g. iPhone 16 Pro Max"/></label><label><span>Quantity</span><input required type="number" min="1" defaultValue="1"/></label><label className="full"><span>Describe the idea</span><textarea required placeholder="Tell us the colours, style, text, logo or reference you have in mind…"/></label></div>
        <div className="sps-upload-box"><UploadCloud size={27}/><strong>Add reference images</strong><span>Demo upload area for photos, logo files or inspiration references.</span></div>
        <div className="sps-contact-grid"><label><span>Full name</span><input required placeholder="Your name"/></label><label><span>WhatsApp</span><input required placeholder="+234…"/></label><label className="full"><span>Email</span><input required type="email" placeholder="you@example.com"/></label></div>
        <p className="sps-note">Demo only. A live version would upload references securely and create a design-review request in the admin dashboard.</p>
        <button className="sps-next" type="submit">Submit demo brief <ArrowRight size={16}/></button>
      </div>
    </form>:<section className="sps-request-done"><div className="sps-done-icon"><Check size={28}/></div><span>CUSTOM BRIEF RECEIVED</span><h2>Next comes<br/><em>the preview.</em></h2><p>A production version would create the request, notify the design/production team and let the customer approve a mockup before payment or production.</p></section>}
  </main>
}