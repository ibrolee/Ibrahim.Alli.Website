import { Link } from "@tanstack/react-router";
import { Gamepad2, Headphones, Laptop, Menu, Smartphone, Tablet, Watch, X } from "lucide-react";
import { CSSProperties, useState } from "react";

export const SPS_ASSETS = {
  logo: "https://solaire-house-lagos.floot.app/_cdn/static/40a35046-e03f-4fd1-82ca-bf0bd3040825-super-plus-studios-logo.png",
  hero: "https://solaire-house-lagos.floot.app/_cdn/static/05b3eec7-d1a9-443a-b235-ef6fe38e618a.png",
  cosmic: "https://solaire-house-lagos.floot.app/_cdn/static/4198c056-7902-4f56-82b6-f445ba609996.png",
  stealth: "https://solaire-house-lagos.floot.app/_cdn/static/be095ea9-2e37-4ffb-b747-d16cc15c36b5.png",
  neon: "https://solaire-house-lagos.floot.app/_cdn/static/3c9794e5-97c1-44fb-a51a-cfbe57293805.png",
  custom: "https://solaire-house-lagos.floot.app/_cdn/static/deac7814-238e-4a98-9d3c-aa2963528ebf.png",
  install: "https://solaire-house-lagos.floot.app/_cdn/static/e0373c5e-3e68-4f4b-8175-b4341bd657dc.png",
};

export const spsProducts = [
  { id:"cosmic-drift", name:"Cosmic Drift", collection:"Space", price:14500, image:SPS_ASSETS.cosmic, badge:"Best seller" },
  { id:"forged-stealth", name:"Forged Stealth", collection:"Stealth", price:15500, image:SPS_ASSETS.stealth, badge:"Textured look" },
  { id:"neon-wave", name:"Neon Wave", collection:"Neon", price:14500, image:SPS_ASSETS.neon, badge:"New" },
  { id:"monogram-studio", name:"Monogram Studio", collection:"Custom", price:17500, image:SPS_ASSETS.custom, badge:"Personalise it" },
] as const;

export const spsIphoneGroups = [
  { label:"iPhone 17 Series", models:["iPhone 17 Pro Max","iPhone 17 Pro","iPhone 17","iPhone Air","iPhone 17e"] },
  { label:"iPhone 16 Series", models:["iPhone 16 Pro Max","iPhone 16 Pro","iPhone 16 Plus","iPhone 16","iPhone 16e"] },
  { label:"iPhone 15 Series", models:["iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15 Plus","iPhone 15"] },
  { label:"iPhone 14 Series", models:["iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14 Plus","iPhone 14"] },
  { label:"iPhone 13 Series", models:["iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13","iPhone 13 mini"] },
  { label:"iPhone 12 Series", models:["iPhone 12 Pro Max","iPhone 12 Pro","iPhone 12","iPhone 12 mini"] },
  { label:"iPhone 11 Series", models:["iPhone 11 Pro Max","iPhone 11 Pro","iPhone 11"] },
  { label:"iPhone X Series", models:["iPhone XS Max","iPhone XS","iPhone XR","iPhone X"] },
  { label:"iPhone 8 Series", models:["iPhone 8 Plus","iPhone 8"] },
  { label:"iPhone 7 Series", models:["iPhone 7 Plus","iPhone 7"] },
  { label:"iPhone 6 Series", models:["iPhone 6s Plus","iPhone 6s","iPhone 6 Plus","iPhone 6"] },
  { label:"iPhone SE Series", models:["iPhone SE (3rd gen)","iPhone SE (2nd gen)","iPhone SE (1st gen)"] },
] as const;

export const spsIphoneModels = spsIphoneGroups.flatMap((group)=>group.models);

export const comingSoonDevices = [
  { name:"Samsung Galaxy", icon:Smartphone, note:"S & Z series" },
  { name:"Gaming", icon:Gamepad2, note:"PlayStation, Xbox & handhelds" },
  { name:"MacBook & laptops", icon:Laptop, note:"More templates coming" },
  { name:"Tablets", icon:Tablet, note:"iPad & Android tablets" },
  { name:"AirPods & audio", icon:Headphones, note:"Cases & device wraps" },
  { name:"Smartwatches", icon:Watch, note:"Apple Watch & more" },
] as const;

export const spsInstallOptions = [
  { id:"diy", name:"Skin only · Nationwide delivery", desc:"We produce and ship the precision-cut skin for self-installation.", fee:0 },
  { id:"lagos", name:"Lagos · Pickup + install + return", desc:"Your device stays in Lagos. We collect locally, install professionally and return it.", fee:8500 },
  { id:"ibadan", name:"Ibadan · Pickup + install + return", desc:"Professional installation handled locally in Ibadan with pickup and return.", fee:6500 },
] as const;

export const naira=(n:number)=>"₦"+n.toLocaleString();

function phoneVisual(model:string){
  const plus=/Plus|Max/.test(model);
  const mini=/mini|SE \(1st/.test(model);
  const air=/Air/.test(model);
  let camera="single";
  if(/7 Plus|8 Plus/.test(model)) camera="dual-horizontal";
  else if(/iPhone X$|XS/.test(model)) camera="dual-vertical";
  else if(/11 Pro|12 Pro|13 Pro|14 Pro|15 Pro|16 Pro/.test(model)) camera="triple-square";
  else if(/17 Pro/.test(model)) camera="triple-plateau";
  else if(/iPhone Air/.test(model)) camera="single-plateau";
  else if(/iPhone 17$/.test(model)) camera="dual-square";
  else if(/13 mini|iPhone 13$|iPhone 14$|14 Plus|iPhone 15$|15 Plus/.test(model)) camera="dual-diagonal";
  else if(/iPhone 16$|16 Plus/.test(model)) camera="dual-vertical-modern";
  else if(/iPhone 11$|12 mini|iPhone 12$/.test(model)) camera="dual-square";
  else if(/XR/.test(model)) camera="single-square";
  else if(/16e|17e/.test(model)) camera="single-modern";
  return { size: air?"air":plus?"plus":mini?"mini":"standard", camera };
}

export function SpsPhonePreview({model,skin,personal,finish}:{model:string;skin:string;personal?:string;finish?:string}){
  const visual=phoneVisual(model);
  const style={"--skin-image":`url("${skin}")`} as CSSProperties;
  return <div className={"sps-phone-stage "+visual.size}>
    <div className={"sps-phone-device camera-"+visual.camera+" finish-"+(finish||"Matte").toLowerCase()} style={style}>
      <div className="sps-phone-skin"/>
      <div className="sps-camera-block">
        <i className="lens l1"/><i className="lens l2"/><i className="lens l3"/><i className="flash"/>
      </div>
      <div className="sps-phone-branding">SUPER PLUS</div>
      {personal&&<div className="sps-phone-personal">{personal}</div>}
    </div>
    <div className="sps-phone-shadow"/>
    <span className="sps-phone-model">{model}</span>
  </div>;
}

export function SpsHeader(){
  const [open,setOpen]=useState(false);
  return <>
    <header className="sps-header">
      <Link to="/super-plus-studios/" className="sps-logo" aria-label="Super Plus Studios home">
        <img className="sps-logo-image" src={SPS_ASSETS.logo} alt="Super Plus Studios"/>
      </Link>
      <nav className="sps-nav">
        <Link to="/super-plus-studios/shop">Shop skins</Link>
        <Link to="/super-plus-studios/customise">Design Studio</Link>
        <Link to="/super-plus-studios/custom-request">Custom request</Link>
        <Link to="/super-plus-studios/track">Track order</Link>
      </nav>
      <Link to="/super-plus-studios/customise" className="sps-header-cta">Build your skin</Link>
      <button className="sps-menu" type="button" onClick={()=>setOpen(!open)} aria-label={open?"Close menu":"Open menu"}>
        {open?<X size={20}/>:<Menu size={20}/>}
      </button>
    </header>
    {open&&<nav className="sps-mobile-nav">
      <Link to="/super-plus-studios/shop" onClick={()=>setOpen(false)}>Shop skins</Link>
      <Link to="/super-plus-studios/customise" onClick={()=>setOpen(false)}>Design Studio</Link>
      <Link to="/super-plus-studios/custom-request" onClick={()=>setOpen(false)}>Custom request</Link>
      <Link to="/super-plus-studios/track" onClick={()=>setOpen(false)}>Track order</Link>
    </nav>}
  </>;
}
