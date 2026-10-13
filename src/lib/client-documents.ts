/**
 * Client documents are composed entirely in the browser. Nothing is persisted
 * remotely or locally and no private form field is sent to analytics.
 */
export type DocumentKind = "brief" | "proposal" | "quotation" | "invoice" | "project-agreement" | "maintenance-agreement";

export const documentKinds: { value:DocumentKind; label:string; description:string }[] = [
  {value:"brief",label:"Project brief",description:"Onboarding summary and requirements"},
  {value:"proposal",label:"Project proposal",description:"Outcomes, scope and delivery approach"},
  {value:"quotation",label:"Quotation",description:"Itemised proposed fees and validity"},
  {value:"invoice",label:"Invoice",description:"Payment request with clear due date"},
  {value:"project-agreement",label:"Project agreement",description:"Draft project terms and responsibilities"},
  {value:"maintenance-agreement",label:"Maintenance agreement",description:"Draft website care responsibilities"},
];

export type FeeItem = { description:string; quantity:string; rate:string };

export type ClientDocument = {
  clientName:string;
  clientBusiness:string;
  clientEmail:string;
  projectName:string;
  reference:string;
  documentDate:string;
  dueDate:string;
  validUntil:string;
  currency:string;
  overview:string;
  goals:string;
  audience:string;
  scope:string;
  exclusions:string;
  timeline:string;
  revisions:string;
  responsibilities:string;
  paymentTerms:string;
  bankDetails:string;
  taxPercent:string;
  depositPercent:string;
  jurisdiction:string;
  careFrequency:string;
  careResponse:string;
  careExclusions:string;
  termination:string;
  items:FeeItem[];
};

export const initialClientDocument:ClientDocument={
  clientName:"",clientBusiness:"",clientEmail:"",projectName:"",
  reference:"",documentDate:"",dueDate:"",validUntil:"",currency:"NGN",
  overview:"",goals:"",audience:"",scope:"",exclusions:"",
  timeline:"",revisions:"",responsibilities:"",paymentTerms:"",
  bankDetails:"",taxPercent:"",depositPercent:"",jurisdiction:"",
  careFrequency:"",careResponse:"",careExclusions:"",termination:"",
  items:[{description:"Website design and development",quantity:"1",rate:""}]
};

function safe(v:string,placeholder="To be agreed"){return v.trim()||placeholder;}
function multiline(v:string){return v.trim()?v.trim():"To be confirmed with the client."}
function financialNumber(v:string){const n=Number(v);return v.trim()!==""&&Number.isFinite(n)&&n>=0?n:null;}
function currencyAmount(n:number|null,currency:string){
  if(n===null)return "To be confirmed";
  try{return new Intl.NumberFormat("en-NG",{style:"currency",currency,maximumFractionDigits:2}).format(n);}
  catch{return currency+" "+n.toFixed(2);}
}
export function calculateClientTotals(data:ClientDocument){
  let any=false;
  const subtotal=data.items.reduce((sum,item)=>{
    const price=financialNumber(item.rate);
    const qty=financialNumber(item.quantity);
    if(price!==null&&qty!==null){any=true;return sum+qty*price}
    return sum;
  },0);
  const taxable=financialNumber(data.taxPercent);
  const taxRate=taxable===null?0:Math.min(taxable,100);
  const tax=any?subtotal*taxRate/100:null;
  const total=any?subtotal+(tax??0):null;
  const depositRate=financialNumber(data.depositPercent);
  const deposit=total!==null&&depositRate!==null?total*Math.min(depositRate,100)/100:null;
  return {subtotal:any?subtotal:null,tax,total,deposit,taxRate,depositRate};
}
function header(kind:string,data:ClientDocument){
  return [
    "IBRAHIM ALLI  |  WEB DESIGN & DIGITAL DEVELOPMENT",
    "Website: https://ibrahimalli.com",
    "Contact: alliibrahim3@gmail.com",
    "",
    kind.toUpperCase()+"  —  DRAFT / FOR REVIEW",
    "Reference: "+safe(data.reference,"Not assigned"),
    "Date: "+safe(data.documentDate,"Not set"),
    "Prepared for: "+safe(data.clientName,"Client name needed"),
    "Business: "+safe(data.clientBusiness,"Not provided"),
    "Client email: "+safe(data.clientEmail,"Not provided"),
    "Project: "+safe(data.projectName,"Project title needed"),
    "",
  ];
}
function moneyLines(d:ClientDocument){
  const a=d.items.map((i,n)=>{
    const qty=financialNumber(i.quantity),rate=financialNumber(i.rate);
    const amount=qty===null||rate===null?null:qty*rate;
    return (n+1)+". "+safe(i.description,"Line item")+
      " | Qty: "+(qty===null?"TBC":String(qty))+
      " | Unit: "+currencyAmount(rate,d.currency)+
      " | Amount: "+currencyAmount(amount,d.currency);
  });
  const t=calculateClientTotals(d);
  return [
    "COST BREAKDOWN",...a,"",
    "Subtotal: "+currencyAmount(t.subtotal,d.currency),
    "Tax: "+(financialNumber(d.taxPercent)===null?"Not specified":t.taxRate+"%  "+currencyAmount(t.tax,d.currency)),
    "Total: "+currencyAmount(t.total,d.currency),
    "Deposit: "+(t.depositRate===null?"To be agreed":t.depositRate+"%  "+currencyAmount(t.deposit,d.currency)),
  ];
}
export function makeClientDocument(kind:DocumentKind,d:ClientDocument):string {
  const h=header(documentKinds.find(x=>x.value===kind)?.label??"Client document",d);
  const footer=["","---","Draft only. Confirm all names, figures, dates, scope and terms before sharing.","Prepared by Ibrahim Alli | ibrahimalli.com"];
  const section=(heading:string,value:string)=>["",heading.toUpperCase(),multiline(value)];
  let body:string[]=[];
  switch(kind){
    case "brief":
      body=[
        ...section("Business and project overview",d.overview),
        ...section("Project goal",d.goals),
        ...section("Target audience",d.audience),
        ...section("Pages, features and deliverables",d.scope),
        ...section("Timeline and important milestones",d.timeline),
        ...section("Assets, access and client responsibilities",d.responsibilities),
        ...section("Known exclusions / open questions",d.exclusions),
        "","NEXT ACTION: Agree requirements and prepare a scoped quotation and proposal."
      ];
      break;
    case "proposal":
      body=[
        ...section("Understanding the project",d.overview),
        ...section("Objectives and desired outcomes",d.goals),
        ...section("Audience",d.audience),
        ...section("Proposed deliverables",d.scope),
        ...section("Outside this scope",d.exclusions),
        ...section("Delivery stages and indicative timeline",d.timeline),
        ...section("Review and revision allowance",d.revisions),
        ...section("Inputs required from the client",d.responsibilities),
        "",...moneyLines(d),
        ...section("Payment schedule",d.paymentTerms),
        "","Quotation valid until: "+safe(d.validUntil),
        "","NEXT ACTION: Client approval of scope, quote and formal agreement before work starts."
      ];
      break;
    case "quotation":
      body=[
        ...section("Requested scope",d.scope),
        ...section("Exclusions",d.exclusions),
        "",...moneyLines(d),
        "","Valid until: "+safe(d.validUntil),
        ...section("Indicative delivery window",d.timeline),
        ...section("Payment terms",d.paymentTerms),
        "","A quotation is not a payment receipt or signed contract. Final approval is required."
      ];
      break;
    case "invoice":
      body=[
        "INVOICE NUMBER: "+safe(d.reference,"Required before issue"),
        "ISSUE DATE: "+safe(d.documentDate,"Required before issue"),
        "PAYMENT DUE: "+safe(d.dueDate,"Required before issue"),
        "",
        ...moneyLines(d),
        ...section("Payment instructions",d.bankDetails),
        ...section("Notes / payment terms",d.paymentTerms),
        "","STATUS: DRAFT — payment is not recorded or confirmed.",
        "Do not send until client, amount, payment destination and legal/tax details have been verified."
      ];
      break;
    case "project-agreement":
      body=[
        "PARTIES: Ibrahim Alli (service provider) and "+safe(d.clientName,"client to be named")+
        (d.clientBusiness?" ("+d.clientBusiness+")":"")+".",
        ...section("Project scope and deliverables",d.scope),
        ...section("Out-of-scope work",d.exclusions),
        ...section("Schedule, dependencies and milestones",d.timeline),
        ...section("Client materials, feedback and approvals",d.responsibilities),
        ...section("Revision rounds and change requests",d.revisions),
        "",...moneyLines(d),
        ...section("Payment schedule and late payment handling",d.paymentTerms),
        ...section("Intellectual property, handover and use rights","To be agreed in writing. Specify what transfers after final payment, which third-party licences remain separate, and rights to portfolio display."),
        ...section("Hosting, domains and post-launch support","To be specified. Third-party provider fees and renewals are separate unless expressly included."),
        ...section("Cancellation, refunds and dispute resolution",d.termination),
        "","Applicable law / venue: "+safe(d.jurisdiction,"Get qualified legal advice"),
        "","ACCEPTANCE — sign only after all terms are reviewed and agreed.",
        "Service provider signature: _____________________   Date: __________",
        "Client signature: _______________________________   Date: __________",
        "","Legal note: This is a working outline, not a lawyer-reviewed enforceable contract. Adapt it with a qualified professional before using."
      ];
      break;
    case "maintenance-agreement":
      body=[
        "PARTIES: Ibrahim Alli (service provider) and "+safe(d.clientName,"client to be named")+
        (d.clientBusiness?" ("+d.clientBusiness+")":"")+".",
        ...section("Website(s) and supported system",d.overview),
        ...section("Included maintenance services and allowances",d.scope),
        ...section("Check and update frequency",d.careFrequency),
        ...section("Communication and response availability",d.careResponse),
        ...section("Excluded work and third-party subscriptions",d.careExclusions||d.exclusions),
        ...section("Client access, accounts and approvals",d.responsibilities),
        ...section("Fees and itemised maintenance charges",d.items.map(i=>i.description).filter(Boolean).join("; ")),
        "",...moneyLines(d),
        ...section("Billing, renewal and payment terms",d.paymentTerms),
        ...section("Cancellation, notice, handover and changes",d.termination),
        "","Applicable law / venue: "+safe(d.jurisdiction,"Get qualified legal advice"),
        "","No automatic 24/7 coverage, security guarantee or unlimited updates are implied.",
        "Service provider signature: _____________________   Date: __________",
        "Client signature: _______________________________   Date: __________",
        "","Legal note: Draft outline for professional review; confirm service levels and terms before signing."
      ];
      break;
  }
  return [...h,...body,...footer].join("\n");
}
