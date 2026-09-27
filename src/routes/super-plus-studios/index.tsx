import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Box, CheckCircle2, MapPin, PackageCheck, Palette, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { SpsHeader, SPS_ASSETS, spsProducts, naira } from "@/components/super-plus-studios";

export const Route = createFileRoute("/super-plus-studios/")({
  head:()=>({meta:[
    {title:"Super Plus Studios — Custom Tech Skins"},
    {name:"description",content:"Custom tech skins, personalisation and professional installation in Lagos and Ibadan."},
    {name:"robots",content:"noindex, nofollow"},
  ]}),
  component:SpsHome,
});

function SpsHome(){
  return <main className="sps-page">
    <div className="sps-topbar"><span>ONLINE STUDIO · NATIONWIDE DELIVERY</span><span>PRO INSTALLATION · LAGOS & IBADAN</span></div>
    <SpsHeader/>

    <section className="sps-hero">
      <div className="sps-hero-copy">
        <span className="sps-kicker">YOUR STYLE · YOUR DEVICE · YOUR WAY</span>
        <h1>Make your tech<br/><em>look like yours.</em></h1>
        <p>Premium device skins built around your phone, your taste and how you want it installed.</p>
        <div className="sps-hero-actions">
          <Link to="/super-plus-studios/customise" className="sps-primary">Build your skin <ArrowRight size={17}/></Link>
          <Link to="/super-plus-studios/shop" className="sps-secondary">Shop ready designs</Link>
        </div>
        <div className="sps-hero-points">
          <span><CheckCircle2 size={15}/> Precision cut</span>
          <span><ShieldCheck size={15}/> Quality checked</span>
          <span><Truck size={15}/> Nationwide delivery</span>
        </div>
      </div>
      <div className="sps-hero-visual">
        <div className="sps-orbit sps-orbit-one"/>
        <div className="sps-orbit sps-orbit-two"/>
        <img src={SPS_ASSETS.hero} alt="Colourful custom tech skins"/>
        <span className="sps-floating-tag sps-tag-one">COSMIC</span>
        <span className="sps-floating-tag sps-tag-two">STEALTH</span>
        <span className="sps-floating-tag sps-tag-three">CUSTOM</span>
      </div>
    </section>

    <section className="sps-device-strip">
      <div><span>01</span><strong>Choose your device</strong><p>Start with the exact model so every cut is built around the right fit.</p></div>
      <div><span>02</span><strong>Choose your skin</strong><p>Pick a ready-made collection or customise one to feel more personal.</p></div>
      <div><span>03</span><strong>Choose installation</strong><p>DIY nationwide, or professional pickup-install-return in Lagos or Ibadan.</p></div>
    </section>

    <section className="sps-featured">
      <div className="sps-section-head">
        <div><span>FEATURED SKINS</span><h2>Ready when<br/><em>you are.</em></h2></div>
        <Link to="/super-plus-studios/shop">See all skins <ArrowRight size={16}/></Link>
      </div>
      <div className="sps-product-grid">
        {spsProducts.map((product)=><article key={product.id} className="sps-product-card">
          <Link to="/super-plus-studios/customise" className="sps-product-image"><img src={product.image} alt={product.name}/><span>{product.badge}</span></Link>
          <div className="sps-product-copy"><div><small>{product.collection}</small><h3>{product.name}</h3></div><strong>From {naira(product.price)}</strong></div>
          <Link to="/super-plus-studios/customise">Choose device <ArrowRight size={15}/></Link>
        </article>)}
      </div>
    </section>

    <section className="sps-collections">
      <div className="sps-section-head light"><div><span>SHOP BY MOOD</span><h2>One device.<br/><em>Many personalities.</em></h2></div></div>
      <div className="sps-collection-grid">
        <div className="cosmic"><span>01</span><strong>Space / Cosmos</strong><p>Nebulas, galaxies and deep-space colour.</p></div>
        <div className="stealth"><span>02</span><strong>Stealth</strong><p>Blackout, carbon and low-key texture.</p></div>
        <div className="neon"><span>03</span><strong>Neon</strong><p>Electric colour for devices that should stand out.</p></div>
        <div className="auto"><span>04</span><strong>Automotive</strong><p>Carbon, racing graphics and machine-inspired finishes.</p></div>
        <div className="nature"><span>05</span><strong>Nature</strong><p>Stone, ocean, foliage and organic pattern.</p></div>
        <div className="custom"><span>06</span><strong>Your own</strong><p>Names, initials, photos, logos or a completely custom brief.</p></div>
      </div>
    </section>

    <section className="sps-custom-feature">
      <div className="sps-custom-image"><img src={SPS_ASSETS.custom} alt="Custom personalised phone skin"/></div>
      <div className="sps-custom-copy">
        <span>THE DEVICE STUDIO</span><h2>Start with a design.<br/><em>Make it yours.</em></h2>
        <p>Select your phone, choose a design, pick a finish and add personal touches before deciding how you want it delivered or installed.</p>
        <div className="sps-feature-list">
          <span><Palette size={18}/> Choose design & finish</span>
          <span><Sparkles size={18}/> Add name or initials</span>
          <span><PackageCheck size={18}/> Pick installation method</span>
        </div>
        <Link to="/super-plus-studios/customise">Open Device Studio <ArrowRight size={17}/></Link>
      </div>
    </section>

    <section className="sps-install-section">
      <div className="sps-install-copy">
        <span>NO PHYSICAL STORE NEEDED</span><h2>We can do the<br/><em>installation too.</em></h2>
        <p>Super Plus Studios is designed as an online-first service. Customers can order a skin for nationwide delivery or choose local professional installation in Lagos or Ibadan.</p>
        <div className="sps-install-options">
          <div><Truck size={20}/><strong>DIY nationwide</strong><p>Skin is produced, quality checked, packed and shipped.</p></div>
          <div><MapPin size={20}/><strong>Lagos install</strong><p>Pickup, professional installation and return within supported areas.</p></div>
          <div><Box size={20}/><strong>Ibadan install</strong><p>Local pickup, installation and return handled in Ibadan.</p></div>
        </div>
      </div>
      <div className="sps-install-image"><img src={SPS_ASSETS.install} alt="Professional phone skin installation"/></div>
    </section>

    <section className="sps-final-cta">
      <span>READY TO MAKE IT YOURS?</span><h2>Your device is<br/><em>the blank canvas.</em></h2>
      <div><Link to="/super-plus-studios/customise">Build your skin <ArrowRight size={17}/></Link><Link to="/super-plus-studios/custom-request">Request something custom</Link></div>
    </section>

    <footer className="sps-footer"><div><strong>SUPER PLUS STUDIOS</strong><span>Your Style · Your Device · Your Way</span></div><span>ONLINE STUDIO · NIGERIA · PRE-LAUNCH DEMO</span></footer>
  </main>
}