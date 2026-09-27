import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { SpsHeader, spsDevices, spsInstallOptions, spsProducts, naira } from "@/components/super-plus-studios";

export const Route=createFileRoute("/super-plus-studios/customise")({
  head:()=>({meta:[{title:"Device Studio — Super Plus Studios"},{name:"robots",content:"noindex, nofollow"}]}),
  component:DeviceStudio,
});

function DeviceStudio(){
  const [step,setStep]=useState<"device"|"design"|"details"|"service"|"done">("device");
  const [brand,setBrand]=useState<"iPhone"|"Samsung">("iPhone");
  const [model,setModel]=useState(spsDevices.iPhone[0]);
  const [productId,setProductId]=useState(spsProducts[0].id);
  const [finish,setFinish]=useState("Matte");
  const [personal,setPersonal]=useState("");
  const [serviceId,setServiceId]=useState("diy");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");

  const product=spsProducts.find(p=>p.id===productId)!;
  const service=spsInstallOptions.find(s=>s.id===serviceId)!;
  const total=useMemo(()=>product.price+service.fee+(personal?2500:0),[product,service,personal]);

  function changeBrand(next:"iPhone"|"Samsung"){ setBrand(next); setModel(spsDevices[next][0]); }
  function submit(e:FormEvent){e.preventDefault();if(name&&phone&&email)setStep("done")}

  return <main className="sps-page">
    <div className="sps-topbar"><span>DEVICE STUDIO</span><span>PRE-LAUNCH DEMO</span></div><SpsHeader/>
    <section className="sps-studio-shell">
      <div className="sps-studio-preview">
        <span>LIVE ORDER PREVIEW</span>
        <div className="sps-preview-card"><img src={product.image} alt={product.name}/><span>{finish}</span></div>
        <div className="sps-preview-summary">
          <div><span>DEVICE</span><strong>{model}</strong></div>
          <div><span>SKIN</span><strong>{product.name}</strong></div>
          <div><span>FINISH</span><strong>{finish}</strong></div>
          <div><span>SERVICE</span><strong>{service.name}</strong></div>
        </div>
        <div className="sps-preview-price"><span>Current total</span><strong>{naira(total)}</strong></div>
      </div>

      <div className="sps-studio-builder">
        <div className="sps-progress">
          <span className={step==="device"?"active":""}>01 Device</span><i/>
          <span className={step==="design"?"active":""}>02 Design</span><i/>
          <span className={step==="details"?"active":""}>03 Personalise</span><i/>
          <span className={step==="service"?"active":""}>04 Service</span>
        </div>

        {step==="device"&&<div className="sps-builder-panel">
          <span className="sps-panel-label">CHOOSE YOUR DEVICE</span><h1>First things first.<br/><em>What are we wrapping?</em></h1>
          <div className="sps-segment">{(["iPhone","Samsung"] as const).map(x=><button key={x} className={brand===x?"active":""} onClick={()=>changeBrand(x)} type="button">{x}</button>)}</div>
          <label className="sps-field"><span>Exact model</span><select value={model} onChange={(e)=>setModel(e.target.value)}>{spsDevices[brand].map(m=><option key={m}>{m}</option>)}</select></label>
          <button className="sps-next" onClick={()=>setStep("design")}>Choose a skin <ArrowRight size={16}/></button>
          <p className="sps-note">Launch support starts with selected iPhone and Samsung models. More devices can be added as templates are tested.</p>
        </div>}

        {step==="design"&&<div className="sps-builder-panel">
          <button className="sps-back" onClick={()=>setStep("device")} type="button"><ArrowLeft size={14}/> Device</button>
          <span className="sps-panel-label">CHOOSE YOUR LOOK</span><h1>Pick the energy.<br/><em>We’ll fit the device.</em></h1>
          <div className="sps-design-options">{spsProducts.map(p=><button type="button" className={productId===p.id?"active":""} onClick={()=>setProductId(p.id)} key={p.id}><img src={p.image} alt={p.name}/><span><strong>{p.name}</strong><small>{p.collection} · {naira(p.price)}</small></span>{productId===p.id&&<Check size={17}/>}</button>)}</div>
          <button className="sps-next" onClick={()=>setStep("details")}>Continue <ArrowRight size={16}/></button>
        </div>}

        {step==="details"&&<div className="sps-builder-panel">
          <button className="sps-back" onClick={()=>setStep("design")} type="button"><ArrowLeft size={14}/> Design</button>
          <span className="sps-panel-label">FINISH & PERSONALISATION</span><h1>Give it the<br/><em>final touch.</em></h1>
          <div className="sps-choice"><span>Finish</span><div>{["Matte","Gloss","Satin"].map(x=><button type="button" className={finish===x?"active":""} onClick={()=>setFinish(x)} key={x}>{x}</button>)}</div></div>
          <label className="sps-field"><span>Optional name / initials <small>+₦2,500</small></span><input value={personal} maxLength={18} onChange={(e)=>setPersonal(e.target.value)} placeholder="e.g. IBROLEE"/></label>
          <div className="sps-personal-preview"><Sparkles size={18}/><span>{personal||"Your personalisation preview will appear here"}</span></div>
          <button className="sps-next" onClick={()=>setStep("service")}>Choose installation <ArrowRight size={16}/></button>
        </div>}

        {step==="service"&&<form className="sps-builder-panel" onSubmit={submit}>
          <button className="sps-back" onClick={()=>setStep("details")} type="button"><ArrowLeft size={14}/> Personalisation</button>
          <span className="sps-panel-label">HOW SHOULD WE FINISH THE JOB?</span><h1>Delivery or<br/><em>professional install.</em></h1>
          <div className="sps-service-options">{spsInstallOptions.map(s=><button type="button" className={serviceId===s.id?"active":""} key={s.id} onClick={()=>setServiceId(s.id)}><span><strong>{s.name}</strong><small>{s.desc}</small></span><b>{s.fee?("+"+naira(s.fee)):"Included"}</b></button>)}</div>
          <div className="sps-contact-grid"><label><span>Full name</span><input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name"/></label><label><span>Phone / WhatsApp</span><input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></label><label className="full"><span>Email</span><input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/></label></div>
          <div className="sps-order-total"><span>Demo order total</span><strong>{naira(total)}</strong></div>
          <p className="sps-note">Pre-launch demo only — payment is not taken and no production request is sent.</p>
          <button className="sps-next" type="submit">Place demo order <ArrowRight size={16}/></button>
        </form>}

        {step==="done"&&<div className="sps-done">
          <div className="sps-done-icon"><Check size={28}/></div><span>DEMO ORDER CREATED</span><h1>Your setup is<br/><em>ready for production.</em></h1>
          <p>In the live system, this would create an order for the production team, reserve the selected service path and send the customer a tracking reference.</p>
          <div className="sps-confirm-grid"><div><span>DEVICE</span><strong>{model}</strong></div><div><span>DESIGN</span><strong>{product.name}</strong></div><div><span>SERVICE</span><strong>{service.id==="diy"?"Nationwide delivery":service.id==="lagos"?"Lagos install":"Ibadan install"}</strong></div><div><span>REFERENCE</span><strong>SPS-001</strong></div></div>
          <Link to="/super-plus-studios/track">Track demo order <ArrowRight size={16}/></Link>
        </div>}
      </div>
    </section>
  </main>
}