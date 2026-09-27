import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, UploadCloud } from "lucide-react";
import { FormEvent, useState } from "react";
import { NovaHeader } from "@/components/nova-autohaus";

export const Route = createFileRoute("/nova-autohaus/sell")({
  head:()=>({meta:[{title:"Sell or Trade Your Car — NOVA Autohaus Concept"},{name:"robots",content:"noindex, nofollow"}]}),
  component:SellPage,
});

function SellPage(){
  const [step,setStep]=useState<"car"|"condition"|"contact"|"done">("car");
  const [make,setMake]=useState("");
  const [model,setModel]=useState("");
  const [year,setYear]=useState("2022");
  const [mileage,setMileage]=useState("");
  const [condition,setCondition]=useState("Excellent");
  const [intent,setIntent]=useState("Sell");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const submit=(e:FormEvent)=>{e.preventDefault();if(name&&phone)setStep("done")};

  return <main className="nova-page">
    <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Sell / trade</span></div>
    <NovaHeader/>
    <section className="nova-subhero nova-sell-hero"><div><span>SELL OR TRADE</span><h1>Your car could be<br/><em>our next arrival.</em></h1><p>A clean valuation intake flow that replaces long back-and-forth DMs with structured vehicle information.</p></div></section>
    <section className="nova-sell-shell">
      <div className="nova-sell-progress"><span className={step==="car"?"active":""}>01 Vehicle</span><i/><span className={step==="condition"?"active":""}>02 Condition</span><i/><span className={step==="contact"?"active":""}>03 Contact</span><i/><span className={step==="done"?"active":""}>04 Done</span></div>

      {step==="car"&&<div className="nova-sell-panel"><span className="nova-panel-label">YOUR VEHICLE</span><h2>Tell us what<br/><em>you drive.</em></h2><div className="nova-form-grid"><label><span>Make</span><input value={make} onChange={(e)=>setMake(e.target.value)} placeholder="e.g. Lexus"/></label><label><span>Model</span><input value={model} onChange={(e)=>setModel(e.target.value)} placeholder="e.g. RX 350"/></label><label><span>Year</span><select value={year} onChange={(e)=>setYear(e.target.value)}>{["2026","2025","2024","2023","2022","2021","2020","2019"].map(y=><option key={y}>{y}</option>)}</select></label><label><span>Mileage</span><input value={mileage} onChange={(e)=>setMileage(e.target.value)} placeholder="e.g. 32,000 km"/></label></div><button className="nova-next" disabled={!make||!model||!mileage} onClick={()=>setStep("condition")}>Continue <ArrowRight size={17}/></button></div>}

      {step==="condition"&&<div className="nova-sell-panel"><button type="button" className="nova-back-btn" onClick={()=>setStep("car")}>Back</button><span className="nova-panel-label">CONDITION & INTENT</span><h2>What should<br/><em>we know?</em></h2><div className="nova-choice-section"><span>Overall condition</span><div>{["Excellent","Very good","Good","Needs work"].map(c=><button type="button" className={condition===c?"active":""} onClick={()=>setCondition(c)} key={c}>{c}</button>)}</div></div><div className="nova-choice-section"><span>What do you want to do?</span><div>{["Sell","Trade in"].map(c=><button type="button" className={intent===c?"active":""} onClick={()=>setIntent(c)} key={c}>{c}</button>)}</div></div><div className="nova-upload-demo"><UploadCloud size={24}/><strong>Add vehicle photos</strong><span>Demo upload area · front, rear, interior, dashboard</span></div><button className="nova-next" onClick={()=>setStep("contact")}>Continue <ArrowRight size={17}/></button></div>}

      {step==="contact"&&<form className="nova-sell-panel" onSubmit={submit}><button type="button" className="nova-back-btn" onClick={()=>setStep("condition")}>Back</button><span className="nova-panel-label">CONTACT</span><h2>Where should<br/><em>we reach you?</em></h2><div className="nova-sell-summary"><span>{year} {make} {model}</span><span>{mileage}</span><span>{condition}</span><span>{intent}</span></div><div className="nova-form-grid"><label><span>Full name</span><input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name"/></label><label><span>Phone / WhatsApp</span><input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></label></div><p className="nova-demo-note">Demo only — no real valuation request is sent.</p><button className="nova-next" type="submit">Request demo valuation <ArrowRight size={17}/></button></form>}

      {step==="done"&&<div className="nova-done"><div className="nova-done-icon"><Check size={28}/></div><span>VALUATION REQUEST READY</span><h2>That’s enough<br/><em>to get started.</em></h2><p>A production flow could create a lead in the dealership dashboard, attach photos and notify the valuation team instantly.</p><div className="nova-confirm-grid"><div><span>VEHICLE</span><strong>{year} {make} {model}</strong></div><div><span>INTENT</span><strong>{intent}</strong></div><div><span>CONDITION</span><strong>{condition}</strong></div><div><span>CONTACT</span><strong>{name}</strong></div></div><Link to="/nova-autohaus/">Return to NOVA <ArrowRight size={16}/></Link></div>}
    </section>
  </main>
}