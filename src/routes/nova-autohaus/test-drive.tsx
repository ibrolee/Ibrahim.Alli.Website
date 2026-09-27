import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, Clock3, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { NovaHeader, novaVehicles } from "@/components/nova-autohaus";

export const Route = createFileRoute("/nova-autohaus/test-drive")({
  head:()=>({meta:[{title:"Book a Test Drive — NOVA Autohaus Concept"},{name:"robots",content:"noindex, nofollow"}]}),
  component:TestDrivePage,
});

function TestDrivePage(){
  const [step,setStep]=useState<"slot"|"details"|"done">("slot");
  const [vehicleId,setVehicleId]=useState(novaVehicles[0].id);
  const [date,setDate]=useState("");
  const [time,setTime]=useState("11:00 AM");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const vehicle=novaVehicles.find(v=>v.id===vehicleId)!;
  const submit=(e:FormEvent)=>{e.preventDefault();if(name&&phone&&email)setStep("done")};

  return <main className="nova-page">
    <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Test drive</span></div>
    <NovaHeader/>
    <section className="nova-booking-layout">
      <aside className="nova-booking-visual"><img src={vehicle.image} alt={vehicle.name}/><div/><span>PRIVATE TEST DRIVE · VICTORIA ISLAND</span></aside>
      <section className="nova-booking-panel">
        {step==="slot"&&<div>
          <span className="nova-panel-label">BOOK A TEST DRIVE</span><h1>Pick the car.<br/><em>Pick the time.</em></h1>
          <label className="nova-form-label"><span>Vehicle</span><select value={vehicleId} onChange={(e)=>setVehicleId(e.target.value)}>{novaVehicles.map(v=><option key={v.id} value={v.id}>{v.year} {v.name}</option>)}</select></label>
          <label className="nova-form-label"><span><CalendarDays size={15}/> Date</span><input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/></label>
          <div className="nova-form-label"><span><Clock3 size={15}/> Time</span><div className="nova-time-row">{["10:00 AM","11:00 AM","1:00 PM","3:00 PM","5:00 PM"].map(t=><button type="button" className={time===t?"active":""} onClick={()=>setTime(t)} key={t}>{t}</button>)}</div></div>
          <button className="nova-next" disabled={!date} onClick={()=>setStep("details")}>Continue <ArrowRight size={17}/></button>
        </div>}
        {step==="details"&&<form onSubmit={submit}>
          <button type="button" className="nova-back-btn" onClick={()=>setStep("slot")}>Change slot</button>
          <span className="nova-panel-label">YOUR DETAILS</span><h1>Who are we<br/><em>expecting?</em></h1>
          <div className="nova-appointment-summary"><span>{vehicle.name}</span><span>{date}</span><span>{time}</span></div>
          <div className="nova-form-grid"><label><span>Full name</span><input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name"/></label><label><span>Phone</span><input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></label><label className="full"><span>Email</span><input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/></label></div>
          <p className="nova-demo-note">Demo only — no appointment is actually submitted.</p>
          <button className="nova-next" type="submit">Confirm demo test drive <ArrowRight size={17}/></button>
        </form>}
        {step==="done"&&<div className="nova-done"><div className="nova-done-icon"><Check size={28}/></div><span>TEST DRIVE HELD</span><h1>We’ll have it<br/><em>ready.</em></h1><p>In a production system, the customer and dealership team would receive confirmation by email or WhatsApp.</p><div className="nova-confirm-grid"><div><span>CAR</span><strong>{vehicle.name}</strong></div><div><span>DATE</span><strong>{date}</strong></div><div><span>TIME</span><strong>{time}</strong></div><div><span>DRIVER</span><strong>{name}</strong></div></div><Link to="/nova-autohaus/">Return to NOVA <ArrowRight size={16}/></Link></div>}
      </section>
    </section>
  </main>
}