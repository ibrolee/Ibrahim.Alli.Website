import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle, PackageCheck, Search, Truck } from "lucide-react";
import { FormEvent, useState } from "react";
import { SpsHeader } from "@/components/super-plus-studios";

export const Route=createFileRoute("/super-plus-studios/track")({
  head:()=>({meta:[{title:"Track Order — Super Plus Studios"},{name:"robots",content:"noindex, nofollow"}]}),
  component:TrackOrder,
});

function TrackOrder(){
  const [ref,setRef]=useState("SPS-001");
  const [searched,setSearched]=useState(false);
  const submit=(e:FormEvent)=>{e.preventDefault();setSearched(true)};
  return <main className="sps-page">
    <div className="sps-topbar"><span>ORDER TRACKING</span><span>FROM PRODUCTION TO YOUR HANDS</span></div><SpsHeader/>
    <section className="sps-track-hero">
      <span>TRACK YOUR ORDER</span><h1>Know exactly<br/><em>where it is.</em></h1>
      <p>Enter your order reference to see production, installation and delivery progress.</p>
      <form onSubmit={submit}><Search size={18}/><input value={ref} onChange={(e)=>setRef(e.target.value)} placeholder="e.g. SPS-001"/><button type="submit">Track order</button></form>
      <small>Try demo reference: SPS-001</small>
    </section>
    {searched&&<section className="sps-tracking-result">
      {ref.trim().toUpperCase()==="SPS-001"?<>
        <div className="sps-tracking-head"><div><span>ORDER</span><strong>SPS-001</strong></div><div><span>DEVICE</span><strong>iPhone 17 Pro Max</strong></div><div><span>SERVICE</span><strong>Lagos professional install</strong></div><div><span>CURRENT STATUS</span><strong className="status">Ready for installation</strong></div></div>
        <div className="sps-timeline">
          <div className="done"><span><Check size={16}/></span><div><strong>Order confirmed</strong><small>Customer details and selected skin received.</small></div></div>
          <div className="done"><span><Check size={16}/></span><div><strong>Artwork prepared</strong><small>Device template and design file confirmed.</small></div></div>
          <div className="done"><span><Check size={16}/></span><div><strong>Production complete</strong><small>Printed, laminated, cut and quality checked.</small></div></div>
          <div className="current"><span><PackageCheck size={16}/></span><div><strong>Ready for installation</strong><small>Skin has reached the Lagos installer. Pickup scheduling comes next.</small></div></div>
          <div><span><Circle size={15}/></span><div><strong>Device collected</strong><small>Condition check and pickup confirmation.</small></div></div>
          <div><span><Circle size={15}/></span><div><strong>Installation complete</strong><small>Final quality check and finished photos.</small></div></div>
          <div><span><Truck size={15}/></span><div><strong>Returned to customer</strong><small>Order completed.</small></div></div>
        </div>
        <div className="sps-track-note"><strong>Professional installation order</strong><p>Your device never needs to travel between Lagos and Ibadan. Only the finished skin moves between production and the local installer.</p></div>
      </>:<div className="sps-not-found"><span>NO DEMO ORDER FOUND</span><h2>Check the reference and try again.</h2><p>For this preview, use <strong>SPS-001</strong>.</p></div>}
    </section>}
    <section className="sps-track-help"><span>NEED SOMETHING DIFFERENT?</span><h2>Start a new<br/><em>custom build.</em></h2><Link to="/super-plus-studios/customise">Open Device Studio <ArrowRight size={16}/></Link></section>
  </main>
}