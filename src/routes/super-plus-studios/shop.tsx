import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SpsHeader, spsProducts, naira } from "@/components/super-plus-studios";

export const Route=createFileRoute("/super-plus-studios/shop")({
  head:()=>({meta:[{title:"Shop Skins — Super Plus Studios"},{name:"robots",content:"noindex, nofollow"}]}),
  component:SpsShop,
});

function SpsShop(){
  const [query,setQuery]=useState("");
  const [collection,setCollection]=useState("All");
  const collections=["All","Space","Stealth","Neon","Custom"];
  const filtered=useMemo(()=>spsProducts.filter(p=>(collection==="All"||p.collection===collection)&&p.name.toLowerCase().includes(query.toLowerCase())),[query,collection]);
  return <main className="sps-page">
    <div className="sps-topbar"><span>ONLINE STUDIO · NATIONWIDE DELIVERY</span><span>PRO INSTALLATION · LAGOS & IBADAN</span></div><SpsHeader/>
    <section className="sps-subhero"><span>SHOP SKINS</span><h1>Pick the look.<br/><em>We’ll handle the fit.</em></h1><p>Start with a design, then choose the exact device and installation option inside the Device Studio.</p></section>
    <section className="sps-shop-shell">
      <div className="sps-shop-tools">
        <label><Search size={17}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search designs"/></label>
        <div>{collections.map(c=><button type="button" className={collection===c?"active":""} onClick={()=>setCollection(c)} key={c}>{c}</button>)}</div>
      </div>
      <div className="sps-shop-count">{filtered.length} designs available in this launch collection</div>
      <div className="sps-product-grid sps-shop-grid">
        {filtered.map(product=><article key={product.id} className="sps-product-card">
          <Link to="/super-plus-studios/customise" className="sps-product-image"><img src={product.image} alt={product.name}/><span>{product.badge}</span></Link>
          <div className="sps-product-copy"><div><small>{product.collection}</small><h3>{product.name}</h3></div><strong>From {naira(product.price)}</strong></div>
          <Link to="/super-plus-studios/customise">Customise this skin <ArrowRight size={15}/></Link>
        </article>)}
      </div>
    </section>
  </main>
}