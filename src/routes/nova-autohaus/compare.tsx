import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { NovaHeader, novaVehicles, formatNaira } from "@/components/nova-autohaus";
import { useState } from "react";

export const Route = createFileRoute("/nova-autohaus/compare")({
  head:()=>({meta:[{title:"Compare Cars — NOVA Autohaus Concept"},{name:"robots",content:"noindex, nofollow"}]}),
  component:ComparePage,
});

function ComparePage(){
  const [first,setFirst]=useState(novaVehicles[0].id);
  const [second,setSecond]=useState(novaVehicles[1].id);
  const a=novaVehicles.find(v=>v.id===first)!;
  const b=novaVehicles.find(v=>v.id===second)!;
  const rows=[
    ["Price",formatNaira(a.price),formatNaira(b.price)],
    ["Year",String(a.year),String(b.year)],
    ["Category",a.category,b.category],
    ["Mileage",a.mileage,b.mileage],
    ["Engine",a.engine,b.engine],
    ["Drivetrain",a.drivetrain,b.drivetrain],
    ["Transmission",a.transmission,b.transmission],
    ["Fuel",a.fuel,b.fuel],
    ["Exterior",a.exterior,b.exterior],
    ["Interior",a.interior,b.interior],
  ];
  return <main className="nova-page">
    <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Compare</span></div>
    <NovaHeader/>
    <section className="nova-subhero nova-compare-hero"><div><span>COMPARE CARS</span><h1>Side by side.<br/><em>Decision by decision.</em></h1><p>Pick two vehicles and compare the details that matter before you visit the showroom.</p></div></section>
    <section className="nova-compare-page">
      <div className="nova-compare-selectors">
        <label><span>VEHICLE ONE</span><select value={first} onChange={(e)=>setFirst(e.target.value)}>{novaVehicles.map(v=><option key={v.id} value={v.id}>{v.year} {v.name}</option>)}</select></label>
        <label><span>VEHICLE TWO</span><select value={second} onChange={(e)=>setSecond(e.target.value)}>{novaVehicles.map(v=><option key={v.id} value={v.id}>{v.year} {v.name}</option>)}</select></label>
      </div>
      <div className="nova-compare-cars">
        {[a,b].map(v=><article key={v.id}><img src={v.image} alt={v.name}/><span>{v.category}</span><h2>{v.name}</h2><strong>{formatNaira(v.price)}</strong></article>)}
      </div>
      <div className="nova-compare-table">
        {rows.map(([label,av,bv])=><div className="nova-compare-row" key={label}><span>{label}</span><strong>{av}</strong><strong>{bv}</strong></div>)}
        <div className="nova-compare-row"><span>Finance available</span><strong><Check size={16}/> Yes</strong><strong><Check size={16}/> Yes</strong></div>
        <div className="nova-compare-row"><span>Trade-in accepted</span><strong><Check size={16}/> Yes</strong><strong><Check size={16}/> Yes</strong></div>
        <div className="nova-compare-row"><span>Concept warranty</span><strong><Minus size={16}/> Demo only</strong><strong><Minus size={16}/> Demo only</strong></div>
      </div>
    </section>
  </main>
}