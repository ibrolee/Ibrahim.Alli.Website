import { Link } from "@tanstack/react-router";
import { Gamepad2, Headphones, Laptop, Menu, Smartphone, Tablet, Watch, X } from "lucide-react";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { spsExactTemplates } from "@/lib/sps-exact-templates";

export const SPS_ASSETS = {
  logo: "https://solaire-house-lagos.floot.app/_cdn/static/40a35046-e03f-4fd1-82ca-bf0bd3040825-super-plus-studios-logo.png",
  hero: "https://solaire-house-lagos.floot.app/_cdn/static/05b3eec7-d1a9-443a-b235-ef6fe38e618a.png",
  cosmic: "https://solaire-house-lagos.floot.app/_cdn/static/4198c056-7902-4f56-82b6-f445ba609996.png",
  stealth: "https://solaire-house-lagos.floot.app/_cdn/static/be095ea9-2e37-4ffb-b747-d16cc15c36b5.png",
  neon: "https://solaire-house-lagos.floot.app/_cdn/static/3c9794e5-97c1-44fb-a51a-cfbe57293805.png",
  custom: "https://solaire-house-lagos.floot.app/_cdn/static/deac7814-238e-4a98-9d3c-aa2963528ebf.png",
  install: "https://solaire-house-lagos.floot.app/_cdn/static/e0373c5e-3e68-4f4b-8175-b4341bd657dc.png",
  stealthBlackArt: "https://solaire-house-lagos.floot.app/_cdn/static/8f52348f-aef7-4072-bcb0-b9f844ade388.png",
  signatureRedArt: "https://solaire-house-lagos.floot.app/_cdn/static/e9641df0-5f7f-470f-98a2-fb380c69020f.png",
};

export const spsProducts = [
  {
    id:"stealth-black",
    name:"Stealth Black",
    collection:"Stealth",
    price:14500,
    image:SPS_ASSETS.stealthBlackArt,
    art:SPS_ASSETS.stealthBlackArt,
    badge:"Launch design",
  },
  {
    id:"signature-red",
    name:"Signature Red",
    collection:"Signature",
    price:14500,
    image:SPS_ASSETS.signatureRedArt,
    art:SPS_ASSETS.signatureRedArt,
    badge:"Launch design",
  },
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

export function SpsPhonePreview({model,skin,finish}:{model:string;skin:string;finish?:string}){
  const visual=phoneVisual(model);
  const exact=spsExactTemplates[model];
  const rawId=useId().replace(/:/g,"");
  const patternId=`spsSkin${rawId}`;
  const frameId=`spsFrame${rawId}`;
  const shineId=`spsShine${rawId}`;

  if(exact){
    const [vx,vy,vw,vh]=exact.viewBox.split(" ").map(Number);
    const outerBody=(exact.body.match(/^.*?z/i)?.[0] || exact.body).trim();
    const outerCamera=(exact.camera.match(/^.*?z/i)?.[0] || exact.camera).trim();
    const exactLens=(cx:number,cy:number,r:number)=>(
      <g>
        <circle cx={cx} cy={cy} r={r+3.2} fill="#151922" stroke="rgba(255,255,255,.42)" strokeWidth="1.2"/>
        <circle cx={cx} cy={cy} r={r} fill="#020409"/>
        <circle cx={cx} cy={cy} r={r*.72} fill="#07111f"/>
        <circle cx={cx-r*.23} cy={cy-r*.25} r={r*.16} fill="#7ba7d0" opacity=".78"/>
        <circle cx={cx+r*.17} cy={cy+r*.22} r={r*.22} fill="#02060d"/>
      </g>
    );
    return <div className={`sps-phone-stage exact-template finish-${(finish||"Matte").toLowerCase()}`}>
      <svg className="sps-phone-render sps-exact-phone-render" viewBox={exact.viewBox} role="img" aria-label={model+" exact skin template preview"}>
        <defs>
          <pattern id={patternId} patternUnits="userSpaceOnUse" x={vx} y={vy} width={vw} height={vh}>
            <image href={skin} x={vx} y={vy} width={vw} height={vh} preserveAspectRatio="xMidYMid slice"/>
          </pattern>
          <linearGradient id={frameId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f4f5f7"/>
            <stop offset=".2" stopColor="#8f959e"/>
            <stop offset=".52" stopColor="#30343b"/>
            <stop offset=".82" stopColor="#aeb3ba"/>
            <stop offset="1" stopColor="#f0f1f3"/>
          </linearGradient>
          <linearGradient id={shineId} x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".22"/>
            <stop offset=".28" stopColor="#fff" stopOpacity=".02"/>
            <stop offset=".72" stopColor="#000" stopOpacity=".10"/>
            <stop offset="1" stopColor="#fff" stopOpacity=".16"/>
          </linearGradient>
        </defs>
        <rect x={vx+2} y={vy+2} width={vw-4} height={vh-4} rx={Math.min(vw*.18,38)} fill={`url(#${frameId})`}/>
        <path d={outerBody} fill={`url(#${patternId})`} stroke="rgba(255,255,255,.48)" strokeWidth="2.2"/>
        <path d={outerBody} fill={`url(#${shineId})`} opacity=".26"/>
        <path d={outerCamera} fill={`url(#${patternId})`} stroke="rgba(255,255,255,.34)" strokeWidth="1.4"/>
        <path d={outerCamera} fill={`url(#${shineId})`} opacity=".16"/>
        {exact.lenses.map((l,i)=><g key={i}>{exactLens(l.cx,l.cy,l.r)}</g>)}
        {exact.sensors.map((s,i)=>s.kind==="flash"
          ? <g key={i}><circle cx={s.cx} cy={s.cy} r={s.r+1.8} fill="#d9c98f"/><circle cx={s.cx} cy={s.cy} r={s.r} fill="#fff0bd"/></g>
          : <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.kind==="mic"?"#12161e":"#0b111a"} stroke="#657181" strokeWidth=".8"/>
        )}
      </svg>
      <div className="sps-phone-shadow"/>
      <span className="sps-phone-model">{model} · exact template</span>
    </div>;
  }

  const lens=(cx:number,cy:number,r=20)=>(
    <g>
      <circle cx={cx} cy={cy} r={r+5} fill="#20242d" stroke="rgba(255,255,255,.28)" strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r={r} fill="#05070b"/>
      <circle cx={cx} cy={cy} r={r-5} fill="#0b1422"/>
      <circle cx={cx-5} cy={cy-6} r={Math.max(2,r*.15)} fill="#88b5db" opacity=".75"/>
      <circle cx={cx+4} cy={cy+6} r={Math.max(3,r*.22)} fill="#07101b"/>
    </g>
  );

  const flash=(cx:number,cy:number,r=7)=>(
    <g>
      <circle cx={cx} cy={cy} r={r+2} fill="#d7c995" opacity=".75"/>
      <circle cx={cx} cy={cy} r={r} fill="#fff4c9"/>
    </g>
  );

  const cameraBump=(x:number,y:number,w:number,h:number,rx:number,children:ReactNode)=>(
    <g>
      <rect x={x} y={y+4} width={w} height={h} rx={rx} fill="#000" opacity=".22"/>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${patternId})`} stroke="rgba(255,255,255,.34)" strokeWidth="1.5"/>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="#141922" opacity=".16"/>
      {children}
    </g>
  );

  let cameras:ReactNode;
  switch(visual.camera){
    case "dual-horizontal":
      cameras=cameraBump(22,30,132,62,28,<>{lens(57,61,18)}{lens(112,61,18)}{flash(143,50,5)}</>);
      break;
    case "dual-vertical":
      cameras=cameraBump(22,28,68,132,28,<>{lens(56,67,18)}{lens(56,121,18)}{flash(82,145,5)}</>);
      break;
    case "single-square":
      cameras=cameraBump(22,28,92,92,27,<>{lens(57,65,20)}{flash(96,91,6)}</>);
      break;
    case "dual-square":
      cameras=cameraBump(22,28,116,116,30,<>{lens(58,65,19)}{lens(58,119,19)}{flash(112,64,6)}</>);
      break;
    case "dual-diagonal":
      cameras=cameraBump(22,28,116,116,30,<>{lens(58,65,19)}{lens(106,116,19)}{flash(108,59,6)}</>);
      break;
    case "dual-vertical-modern":
      cameras=cameraBump(25,28,66,138,33,<>{lens(58,67,19)}{lens(58,124,19)}{flash(83,151,5)}</>);
      break;
    case "triple-square":
      cameras=cameraBump(22,28,132,132,34,<>{lens(60,67,20)}{lens(60,124,20)}{lens(119,96,20)}{flash(128,52,6)}<circle cx="126" cy="139" r="5" fill="#171b24" stroke="#5e6774" strokeWidth="1"/></>);
      break;
    case "triple-plateau":
      cameras=cameraBump(18,24,264,124,35,<>{lens(58,58,19)}{lens(58,112,19)}{lens(113,85,19)}{flash(239,55,7)}<circle cx="239" cy="99" r="8" fill="#151a23" stroke="#697485" strokeWidth="1.2"/></>);
      break;
    case "single-plateau":
      cameras=cameraBump(18,24,264,82,34,<>{lens(58,65,19)}{flash(242,65,7)}</>);
      break;
    case "single-modern":
      cameras=cameraBump(22,28,92,92,27,<>{lens(58,66,20)}{flash(95,91,6)}</>);
      break;
    default:
      cameras=<g>{lens(54,61,19)}{flash(92,59,6)}</g>;
  }

  const bodyClass=`sps-phone-stage ${visual.size} finish-${(finish||"Matte").toLowerCase()}`;
  return <div className={bodyClass}>
    <svg className="sps-phone-render" viewBox="0 0 300 610" role="img" aria-label={model+" with "+finish+" skin preview"}>
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="300" height="610">
          <image href={skin} x="0" y="0" width="300" height="610" preserveAspectRatio="xMidYMid slice"/>
        </pattern>
        <linearGradient id={frameId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0f1f4"/>
          <stop offset=".18" stopColor="#7d838d"/>
          <stop offset=".5" stopColor="#272b31"/>
          <stop offset=".78" stopColor="#9ba1aa"/>
          <stop offset="1" stopColor="#e7e9ed"/>
        </linearGradient>
        <linearGradient id={shineId} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".30"/>
          <stop offset=".22" stopColor="#fff" stopOpacity=".04"/>
          <stop offset=".7" stopColor="#000" stopOpacity=".12"/>
          <stop offset="1" stopColor="#fff" stopOpacity=".16"/>
        </linearGradient>
      </defs>

      <rect x="3" y="3" width="294" height="604" rx="54" fill={`url(#${frameId})`}/>
      <rect x="10" y="10" width="280" height="590" rx="48" fill="#14171d"/>
      <rect className="sps-svg-skin" x="15" y="15" width="270" height="580" rx="44" fill={`url(#${patternId})`}/>
      <rect x="15" y="15" width="270" height="580" rx="44" fill={`url(#${shineId})`} opacity=".48"/>
      {cameras}
      <path d="M286 190h7v72h-7z" fill="#7d838c" opacity=".9"/>
      <path d="M7 170h7v45H7zM7 229h7v72H7z" fill="#6f7580" opacity=".9"/>
      <rect x="118" y="585" width="64" height="2" rx="1" fill="#fff" opacity=".12"/>
    </svg>
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
