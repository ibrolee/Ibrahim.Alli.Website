import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, CircleDollarSign } from "lucide-react";
import { useMemo, useState } from "react";
import { NovaHeader, novaVehicles, formatNaira } from "@/components/nova-autohaus";

export const Route = createFileRoute("/nova-autohaus/finance")({
  head:()=>({meta:[{title:"Finance Calculator — NOVA Autohaus Concept"},{name:"robots",content:"noindex, nofollow"}]}),
  component:FinancePage,
});

function FinancePage(){
  const [vehicleId,setVehicleId]=useState(novaVehicles[1].id);
  const [depositPct,setDepositPct]=useState(30);
  const [months,setMonths]=useState(36);
  const vehicle=novaVehicles.find(v=>v.id===vehicleId)!;
  const result=useMemo(()=>{
    const deposit=vehicle.price*(depositPct/100);
    const balance=vehicle.price-deposit;
    const illustrativeRate=0.18;
    const monthly=(balance*(1+illustrativeRate))/months;
    return {deposit,balance,monthly};
  },[vehicle,depositPct,months]);
  return <main className="nova-page">
    <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Finance calculator</span></div>
    <NovaHeader/>
    <section className="nova-subhero nova-finance-hero"><div><span>FINANCE CALCULATOR</span><h1>Run the numbers.<br/><em>Then run the car.</em></h1><p>An illustrative finance experience showing how a dealership site can make affordability clearer before enquiry.</p></div></section>
    <section className="nova-calc-layout">
      <div className="nova-calc-controls">
        <span className="nova-calc-kicker"><Calculator size={17}/> BUILD AN ESTIMATE</span>
        <label><span>Vehicle</span><select value={vehicleId} onChange={(e)=>setVehicleId(e.target.value)}>{novaVehicles.map(v=><option value={v.id} key={v.id}>{v.year} {v.name} — {formatNaira(v.price)}</option>)}</select></label>
        <label><span>Deposit — {depositPct}%</span><input type="range" min="20" max="60" step="5" value={depositPct} onChange={(e)=>setDepositPct(Number(e.target.value))}/><div className="nova-range-labels"><small>20%</small><small>60%</small></div></label>
        <label><span>Term</span><div className="nova-term-row">{[24,36,48,60].map(n=><button type="button" className={months===n?"active":""} onClick={()=>setMonths(n)} key={n}>{n} mo</button>)}</div></label>
        <p className="nova-finance-note">Illustrative concept only. This is not a lending offer, APR quote or financial advice.</p>
      </div>
      <div className="nova-calc-result">
        <CircleDollarSign size={28}/><span>ESTIMATED STRUCTURE</span><h2>{vehicle.name}</h2><strong>{formatNaira(result.monthly)}<small>/ month</small></strong>
        <div><p><span>Vehicle price</span><b>{formatNaira(vehicle.price)}</b></p><p><span>Deposit</span><b>{formatNaira(result.deposit)}</b></p><p><span>Amount financed</span><b>{formatNaira(result.balance)}</b></p><p><span>Illustrative term</span><b>{months} months</b></p></div>
        <Link to="/nova-autohaus/test-drive">Book a viewing <ArrowRight size={16}/></Link>
      </div>
    </section>
  </main>
}