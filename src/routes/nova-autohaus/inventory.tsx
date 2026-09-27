import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CarFront, Gauge, Search, SlidersHorizontal } from "lucide-react";
import { NovaHeader, novaVehicles, formatNaira } from "@/components/nova-autohaus";

export const Route = createFileRoute("/nova-autohaus/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — NOVA Autohaus Concept" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: InventoryPage,
});

function InventoryPage() {
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All");
  const [budget,setBudget]=useState("All");
  const categories=["All","SUV","Sedan","Performance"];
  const budgets=["All","Under ₦200M","₦200M–₦300M","₦300M+"];

  const filtered=useMemo(()=>novaVehicles.filter((vehicle)=>{
    const matchesQuery=(vehicle.name+" "+vehicle.year+" "+vehicle.category).toLowerCase().includes(query.toLowerCase());
    const matchesCategory=category==="All"||vehicle.category===category;
    const matchesBudget=
      budget==="All"||
      (budget==="Under ₦200M"&&vehicle.price<200000000)||
      (budget==="₦200M–₦300M"&&vehicle.price>=200000000&&vehicle.price<=300000000)||
      (budget==="₦300M+"&&vehicle.price>300000000);
    return matchesQuery&&matchesCategory&&matchesBudget;
  }),[query,category,budget]);

  return <main className="nova-page">
    <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Inventory</span></div>
    <NovaHeader/>
    <section className="nova-subhero nova-inventory-hero">
      <div><span>CURATED INVENTORY</span><h1>Find the one<br/><em>you’ll keep thinking about.</em></h1><p>Search, filter and explore a fictional premium inventory built to demonstrate a complete dealership browsing experience.</p></div>
    </section>

    <section className="nova-inventory-page">
      <div className="nova-filter-panel">
        <label className="nova-search-box"><Search size={18}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search make, model or year"/></label>
        <div className="nova-filter-block"><span><SlidersHorizontal size={14}/> BODY TYPE</span><div>{categories.map((item)=><button type="button" key={item} className={category===item?"active":""} onClick={()=>setCategory(item)}>{item}</button>)}</div></div>
        <div className="nova-filter-block"><span>BUDGET</span><div>{budgets.map((item)=><button type="button" key={item} className={budget===item?"active":""} onClick={()=>setBudget(item)}>{item}</button>)}</div></div>
      </div>

      <div className="nova-results-head"><span>{String(filtered.length).padStart(2,"0")} vehicles</span><Link to="/nova-autohaus/compare">Compare cars <ArrowRight size={15}/></Link></div>

      {filtered.length>0 ? (
        <div className="nova-inventory-grid">
          {filtered.map((vehicle)=>(
            <article className="nova-stock-card" key={vehicle.id}>
              <Link to="/nova-autohaus/inventory/$vehicleId" params={{vehicleId:vehicle.id}} className="nova-stock-image"><img src={vehicle.image} alt={vehicle.name}/><span>{vehicle.tag}</span></Link>
              <div className="nova-stock-copy">
                <div className="nova-stock-title"><div><small>{vehicle.year} · {vehicle.category}</small><h2>{vehicle.name}</h2></div><strong>{formatNaira(vehicle.price)}</strong></div>
                <div className="nova-stock-specs"><span><Gauge size={14}/>{vehicle.mileage}</span><span><CarFront size={14}/>{vehicle.engine} · {vehicle.drivetrain}</span></div>
                <div className="nova-stock-actions"><Link to="/nova-autohaus/inventory/$vehicleId" params={{vehicleId:vehicle.id}}>View details <ArrowRight size={15}/></Link><Link to="/nova-autohaus/test-drive">Test drive</Link></div>
              </div>
            </article>
          ))}
        </div>
      ):(
        <div className="nova-empty"><span>NO MATCHES</span><h2>Nothing fits those filters.</h2><button type="button" onClick={()=>{setQuery("");setCategory("All");setBudget("All")}}>Clear filters</button></div>
      )}
    </section>
  </main>
}