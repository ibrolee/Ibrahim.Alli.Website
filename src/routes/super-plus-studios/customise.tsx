import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock3, Smartphone } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import {
  SpsHeader,
  SpsPhonePreview,
  comingSoonDevices,
  spsIphoneGroups,
  spsIphoneModels,
  spsInstallOptions,
  spsProducts,
  naira,
} from "@/components/super-plus-studios";

export const Route=createFileRoute("/super-plus-studios/customise")({
  head:()=>({meta:[{title:"Device Studio — Super Plus Studios"},{name:"robots",content:"noindex, nofollow"}]}),
  component:DeviceStudio,
});

function DeviceStudio(){
  const [step,setStep]=useState<"build"|"finish"|"service"|"done">("build");
  const [model,setModel]=useState<string>(spsIphoneModels[0]);
  const [productId,setProductId]=useState(spsProducts[0].id);
  const [finish,setFinish]=useState("Matte");
   const [serviceId,setServiceId]=useState("diy");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");

  const product=spsProducts.find(p=>p.id===productId)!;
  const service=spsInstallOptions.find(s=>s.id===serviceId)!;
  const total=useMemo(()=>product.price+service.fee,[product,service]);

  function submit(e:FormEvent){e.preventDefault();if(name&&phone&&email)setStep("done")}

  return <main className="sps-page sps-studio-page">
    <div className="sps-topbar"><span>DEVICE STUDIO · LIVE PREVIEW</span><span>IPHONE AVAILABLE · MORE DEVICES COMING SOON</span></div>
    <SpsHeader/>

    <section className="sps-studio-shell">
      <aside className="sps-studio-preview">
        <div className="sps-preview-topline"><span>YOUR DEVICE</span><b>LIVE PREVIEW</b></div>
        <SpsPhonePreview model={model} skin={product.art} finish={finish}/>
        <div className="sps-preview-swatch-row">
          {spsProducts.map((skin)=><button
            type="button"
            key={skin.id}
            className={productId===skin.id?"active":""}
            onClick={()=>setProductId(skin.id)}
            aria-label={"Preview "+skin.name}
          ><img src={skin.art} alt=""/></button>)}
        </div>
        <div className="sps-preview-summary">
          <div><span>DEVICE</span><strong>{model}</strong></div>
          <div><span>SKIN</span><strong>{product.name}</strong></div>
          <div><span>FINISH</span><strong>{finish}</strong></div>
          <div><span>SERVICE</span><strong>{service.name}</strong></div>
        </div>
        <div className="sps-preview-price"><span>Current total</span><strong>{naira(total)}</strong></div>
      </aside>

      <div className="sps-studio-builder">
        <div className="sps-progress">
          <span className={step==="build"?"active":""}>01 Build</span><i/>
          <span className={step==="finish"?"active":""}>02 Finish</span><i/>
          <span className={step==="service"?"active":""}>03 Service</span>
        </div>

        {step==="build"&&<div className="sps-builder-panel sps-build-panel">
          <span className="sps-panel-label">BUILD YOUR SKIN</span>
          <h1>Choose the phone.<br/><em>Choose the look.</em></h1>

          <div className="sps-build-device-row">
            <button type="button" className="sps-device-pill active">
              <Smartphone size={18}/><span><strong>iPhone</strong><small>{spsIphoneModels.length} models</small></span>
            </button>
            {comingSoonDevices.map(({name:deviceName,icon:Icon})=><button type="button" className="sps-device-pill coming" disabled key={deviceName}>
              <Icon size={17}/><span><strong>{deviceName}</strong><small>Coming soon</small></span><Clock3 size={11}/>
            </button>)}
          </div>

          <label className="sps-field sps-model-field">
            <span>Exact iPhone model</span>
            <select value={model} onChange={(e)=>setModel(e.target.value)}>
              {spsIphoneGroups.map((group)=><optgroup label={group.label} key={group.label}>
                {group.models.map(m=><option value={m} key={m}>{m}</option>)}
              </optgroup>)}
            </select>
          </label>

          <div className="sps-build-designs">
            <div className="sps-build-section-label"><span>Choose skin</span><b>{product.name}</b></div>
            <div className="sps-design-carousel">
              {spsProducts.map(p=><button type="button" className={productId===p.id?"active":""} onClick={()=>setProductId(p.id)} key={p.id}>
                <img src={p.art} alt={p.name}/>
                <span><strong>{p.name}</strong><small>{p.collection} · {naira(p.price)}</small></span>
                {productId===p.id&&<Check size={15}/>}
              </button>)}
            </div>
          </div>

          <button className="sps-next" onClick={()=>setStep("finish")}>Choose finish <ArrowRight size={16}/></button>
          <p className="sps-note">The phone preview and camera layout update with the selected model. Printable skin artwork is applied directly to the device preview — not another phone mockup.</p>
        </div>}

        {step==="finish"&&<div className="sps-builder-panel">
          <button className="sps-back" onClick={()=>setStep("build")} type="button"><ArrowLeft size={14}/> Device & design</button>
          <span className="sps-panel-label">CHOOSE YOUR FINISH</span>
          <h1>Pick how it<br/><em>should feel.</em></h1>
          <div className="sps-choice sps-finish-choice"><span>Skin finish</span><div>{["Matte","Gloss","Satin"].map(x=><button type="button" className={finish===x?"active":""} onClick={()=>setFinish(x)} key={x}>{x}</button>)}</div></div>
          <p className="sps-finish-copy">Matte keeps reflections low, Gloss gives the artwork more shine, and Satin sits between both.</p>
          <button className="sps-next" onClick={()=>setStep("service")}>Choose installation <ArrowRight size={16}/></button>
        </div>}

        {step==="service"&&<form className="sps-builder-panel" onSubmit={submit}>
          <button className="sps-back" onClick={()=>setStep("finish")} type="button"><ArrowLeft size={14}/> Finish</button>
          <span className="sps-panel-label">HOW SHOULD WE FINISH THE JOB?</span>
          <h1>Delivery or<br/><em>professional install.</em></h1>
          <div className="sps-service-options">{spsInstallOptions.map(s=><button type="button" className={serviceId===s.id?"active":""} key={s.id} onClick={()=>setServiceId(s.id)}>
            <span><strong>{s.name}</strong><small>{s.desc}</small></span><b>{s.fee?("+"+naira(s.fee)):"Included"}</b>
          </button>)}</div>
          <div className="sps-contact-grid">
            <label><span>Full name</span><input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name"/></label>
            <label><span>Phone / WhatsApp</span><input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></label>
            <label className="full"><span>Email</span><input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
          </div>
          <div className="sps-order-total"><span>Demo order total</span><strong>{naira(total)}</strong></div>
          <p className="sps-note">Pre-launch demo only — payment is not taken and no production request is sent.</p>
          <button className="sps-next" type="submit">Place demo order <ArrowRight size={16}/></button>
        </form>}

        {step==="done"&&<div className="sps-done">
          <div className="sps-done-icon"><Check size={28}/></div>
          <span>DEMO ORDER CREATED</span>
          <h1>Your setup is<br/><em>ready for production.</em></h1>
          <p>In the live system, this would create an order for the production team, reserve the selected service path and send the customer a tracking reference.</p>
          <div className="sps-confirm-grid">
            <div><span>DEVICE</span><strong>{model}</strong></div>
            <div><span>DESIGN</span><strong>{product.name}</strong></div>
            <div><span>SERVICE</span><strong>{service.id==="diy"?"Nationwide delivery":service.id==="lagos"?"Lagos install":"Ibadan install"}</strong></div>
            <div><span>REFERENCE</span><strong>SPS-001</strong></div>
          </div>
          <Link to="/super-plus-studios/track">Track demo order <ArrowRight size={16}/></Link>
        </div>}
      </div>
    </section>
  </main>
}