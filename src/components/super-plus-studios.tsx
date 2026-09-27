import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const SPS_ASSETS = {
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

export const spsDevices = {
  iPhone:["iPhone 17 Pro Max","iPhone 17 Pro","iPhone 16 Pro Max","iPhone 16 Pro","iPhone 15 Pro Max","iPhone 15 Pro","iPhone 14 Pro Max","iPhone 13 Pro Max"],
  Samsung:["Galaxy S26 Ultra","Galaxy S25 Ultra","Galaxy S24 Ultra","Galaxy S23 Ultra","Galaxy Z Fold 7","Galaxy Z Flip 7"],
} as const;

export const spsInstallOptions = [
  { id:"diy", name:"Skin only · Nationwide delivery", desc:"We produce and ship the precision-cut skin for self-installation.", fee:0 },
  { id:"lagos", name:"Lagos · Pickup + install + return", desc:"Your device stays in Lagos. We collect locally, install professionally and return it.", fee:8500 },
  { id:"ibadan", name:"Ibadan · Pickup + install + return", desc:"Professional installation handled locally in Ibadan with pickup and return.", fee:6500 },
] as const;

export const naira=(n:number)=>"₦"+n.toLocaleString();

export function SpsHeader(){
  const [open,setOpen]=useState(false);
  return <>
    <header className="sps-header">
      <Link to="/super-plus-studios/" className="sps-logo" aria-label="Super Plus Studios home">
        <span className="sps-logo-mark">SP</span>
        <span>SUPER PLUS<small>STUDIOS</small></span>
      </Link>
      <nav className="sps-nav">
        <Link to="/super-plus-studios/shop">Shop skins</Link>
        <Link to="/super-plus-studios/customise">Customise</Link>
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
      <Link to="/super-plus-studios/customise" onClick={()=>setOpen(false)}>Customise</Link>
      <Link to="/super-plus-studios/custom-request" onClick={()=>setOpen(false)}>Custom request</Link>
      <Link to="/super-plus-studios/track" onClick={()=>setOpen(false)}>Track order</Link>
    </nav>}
  </>;
}
