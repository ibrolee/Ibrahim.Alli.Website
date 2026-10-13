import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clipboard, Download, FileText, Plus, Printer, ShieldCheck, Trash2, WandSparkles } from "lucide-react";
import { calculateClientTotals, documentKinds, initialClientDocument, makeClientDocument, type ClientDocument, type DocumentKind } from "@/lib/client-documents";

export const Route = createFileRoute("/client-documents")({
  head:()=>({
    meta:[
      {title:"Client Document Studio — Ibrahim Alli"},
      {name:"description",content:"A browser-only document template workspace for project briefs, proposals, quotes, invoices and draft service agreements."},
      {name:"robots",content:"noindex, nofollow"},
    ],
  }),
  component:ClientDocuments,
});

type PlainField = Exclude<keyof ClientDocument,"items">;
type FieldProps = {
  name:PlainField;
  label:string;
  value:string;
  onChange:(name:PlainField,value:string)=>void;
  placeholder?:string;
  type?:"text"|"date"|"email"|"number";
  options?:{value:string;label:string}[];
  multiline?:boolean;
  hint?:string;
};
function DocumentField({name,label,value,onChange,placeholder,type="text",options,multiline,hint}:FieldProps){
  return (
    <label className={"ia-4b-field"+(multiline?" ia-4b-field-wide":"")}>
      <span>{label}</span>
      {options ? (
        <select value={value} onChange={e=>onChange(name,e.target.value)}>
          {options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : multiline ? (
        <textarea rows={4} value={value} maxLength={3000} placeholder={placeholder} onChange={e=>onChange(name,e.target.value)} />
      ) : (
        <input type={type} value={value} maxLength={type==="number"?undefined:300} min={type==="number"?"0":undefined} max={type==="number"?"100":undefined} step={type==="number"?"0.01":undefined} placeholder={placeholder} onChange={e=>onChange(name,e.target.value)} />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
}
const currencyOptions=[{value:"NGN",label:"NGN · Nigerian naira"},{value:"GBP",label:"GBP · British pound"},{value:"USD",label:"USD · US dollar"},{value:"EUR",label:"EUR · Euro"},{value:"TRY",label:"TRY · Turkish lira"}];
function ClientDocuments(){
  const [kind,setKind]=useState<DocumentKind>("proposal");
  const [data,setData]=useState<ClientDocument>(initialClientDocument);
  const [status,setStatus]=useState("");
  const doc=useMemo(()=>makeClientDocument(kind,data),[kind,data]);
  const totals=useMemo(()=>calculateClientTotals(data),[data]);
  const selected=documentKinds.find(t=>t.value===kind);
  function update(name:PlainField,value:string){setData(p=>({...p,[name]:value}));setStatus("");}
  function updateItem(index:number,name:"description"|"quantity"|"rate",value:string){
    setData(p=>({...p,items:p.items.map((item,i)=>i===index?{...item,[name]:value}:item)}));
    setStatus("");
  }
  function addItem(){setData(p=>({...p,items:p.items.length>=8?p.items:[...p.items,{description:"",quantity:"1",rate:""}]}));}
  function removeItem(index:number){setData(p=>({...p,items:p.items.length===1?p.items:p.items.filter((_,i)=>i!==index)}));}
  async function copyDocument(){
    try{
      await navigator.clipboard.writeText(doc);
      setStatus("Draft copied. Check all details before sending.");
    }catch{setStatus("Your browser could not copy automatically. Select and copy the preview text instead.");}
  }
  function saveText(){
    const name=(data.clientBusiness||data.clientName||"client").toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,40)||"client";
    const blob=new Blob([doc],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement("a");
    anchor.href=url;
    anchor.download="ibrahim-alli-"+kind+"-"+name+".txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatus("Text file prepared. Review the content before sharing.");
  }
  function printDocument(){
    window.print();
    setStatus("Use your browser's print options to print or save a PDF.");
  }
  function resetDocument(){
    if(!window.confirm("Clear all client details and draft figures? This cannot be undone."))return;
    setData({...initialClientDocument,items:[{...initialClientDocument.items[0]}]});
    setStatus("All draft fields cleared.");
  }
  const renderField=(name:PlainField,label:string,opts:Partial<Omit<FieldProps,"name"|"label"|"value"|"onChange">>={})=>(
    <DocumentField name={name} label={label} value={data[name]} onChange={update} {...opts}/>
  );
  return (
    <main id="main-content" className="ia-stage-page ia-4b-page ia-4b-docs-page">
      <section className="ia-stage-hero ia-4b-doc-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/client-onboarding" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Project onboarding</Link>
          <p className="p-label">Stage 4B / Business documents</p>
          <h1>Clear documents.<br/><em>Better client work.</em></h1>
          <div className="ia-stage-lead-row">
            <p>Prepare an editable client brief, proposal, quotation, invoice, project agreement or maintenance agreement. Enter details once; switch templates without retyping.</p>
            <a className="ia-stage-primary" href="#document-builder">Open document builder <ArrowRight size={18} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
      <div className="ia-4b-private-note">
        <div className="p-container"><ShieldCheck size={20} aria-hidden="true"/><p><strong>Browser-only workspace.</strong> Entries stay in this open browser tab and are lost on refresh. There is no account or access restriction on this page, so avoid shared devices and sensitive credentials. No client form fields are sent to analytics or a database.</p></div>
      </div>
      <section id="document-builder" className="ia-4b-doc-workspace">
        <div className="p-container">
          <div className="ia-4b-doc-topbar">
            <div><p className="p-label">01 / Choose a document</p><h2>What are you preparing?</h2></div>
            <button className="ia-4b-clear" type="button" onClick={resetDocument}><Trash2 size={16} aria-hidden="true"/> Clear draft</button>
          </div>
          <div className="ia-4b-doc-picker" role="group" aria-label="Document template">
            {documentKinds.map(item=>(
              <button key={item.value} type="button" onClick={()=>{setKind(item.value);setStatus("");}} className={kind===item.value?"ia-4b-doc-active":""} aria-pressed={kind===item.value}>
                <FileText size={17} aria-hidden="true"/><span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="ia-4b-builder-grid">
            <div className="ia-4b-edit-panel">
              <div className="ia-4b-panel-head"><span>02 / Edit shared project details</span><strong>Changes update the draft instantly</strong></div>
              <details open className="ia-4b-edit-section">
                <summary><span>Client & project</span><span>01</span></summary>
                <div className="ia-4b-input-grid">
                  {renderField("clientName","Client contact",{placeholder:"Client's full name"})}
                  {renderField("clientBusiness","Business / organisation",{placeholder:"Registered or trading name"})}
                  {renderField("clientEmail","Client email",{type:"email",placeholder:"client@example.com"})}
                  {renderField("projectName","Project title",{placeholder:"Website redesign for ... "})}
                  {renderField("reference","Quote / invoice reference",{placeholder:"Set your own reference"})}
                  {renderField("currency","Currency",{options:currencyOptions})}
                  {renderField("documentDate","Issue date",{type:"date"})}
                  {renderField("dueDate","Invoice due date",{type:"date"})}
                  {renderField("validUntil","Quote expiry date",{type:"date"})}
                </div>
              </details>
              <details className="ia-4b-edit-section">
                <summary><span>Scope & delivery</span><span>02</span></summary>
                <div className="ia-4b-input-grid">
                  {renderField("overview","Business / project context",{multiline:true,placeholder:"Describe the current website, business or brief."})}
                  {renderField("goals","Primary objectives",{multiline:true,placeholder:"What should this project accomplish?"})}
                  {renderField("audience","Intended users",{multiline:true,placeholder:"Who will use the website or product?"})}
                  {renderField("scope","Included scope / deliverables",{multiline:true,placeholder:"List pages, features and agreed deliverables. One per line."})}
                  {renderField("exclusions","Exclusions",{multiline:true,placeholder:"What's not included in this project?"})}
                  {renderField("timeline","Stages, milestones and timing",{multiline:true,placeholder:"Milestones and dependencies (avoid unsupported promises)."})}
                  {renderField("revisions","Review rounds / change requests",{multiline:true,placeholder:"How many revision rounds, and what happens when the scope changes?"})}
                  {renderField("responsibilities","Client inputs and approvals",{multiline:true,placeholder:"Copy, assets, credentials, feedback and sign-offs."})}
                </div>
              </details>
              <details className="ia-4b-edit-section" open>
                <summary><span>Items & fees</span><span>03</span></summary>
                <div className="ia-4b-fee-rows">
                  {data.items.map((item,index)=>(
                    <div className="ia-4b-fee-item" key={index}>
                      <span className="ia-4b-fee-index">ITEM {String(index+1).padStart(2,"0")}</span>
                      <label><span>Service</span><input value={item.description} maxLength={250} placeholder="Service or milestone" onChange={e=>updateItem(index,"description",e.target.value)} /></label>
                      <div className="ia-4b-fee-numbers">
                        <label><span>Qty</span><input type="number" min="0" step="0.01" value={item.quantity} onChange={e=>updateItem(index,"quantity",e.target.value)}/></label>
                        <label><span>Unit amount</span><input type="number" min="0" step="0.01" value={item.rate} placeholder="Enter amount" onChange={e=>updateItem(index,"rate",e.target.value)}/></label>
                        <button type="button" disabled={data.items.length===1} title="Remove item" aria-label={"Remove line item "+(index+1)} onClick={()=>removeItem(index)}><Trash2 size={17} aria-hidden="true"/></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="ia-4b-add-line" onClick={addItem} disabled={data.items.length>=8}><Plus size={17} aria-hidden="true"/> Add line item <span>{data.items.length}/8</span></button>
                <div className="ia-4b-input-grid">
                  {renderField("taxPercent","Tax rate (%)",{type:"number",placeholder:"Leave blank unless applicable",hint:"Only enter a rate after confirming relevant tax requirements."})}
                  {renderField("depositPercent","Deposit rate (%)",{type:"number",placeholder:"Optional"})}
                </div>
                <div className="ia-4b-total-preview"><span>Calculated total</span><strong>{totals.total===null?"Enter an amount":new Intl.NumberFormat("en-NG",{style:"currency",currency:data.currency,maximumFractionDigits:2}).format(totals.total)}</strong></div>
              </details>
              <details className="ia-4b-edit-section">
                <summary><span>Payment & terms</span><span>04</span></summary>
                <div className="ia-4b-input-grid">
                  {renderField("paymentTerms","Payment milestones / instructions",{multiline:true,placeholder:"Deposit, balance schedule, allowed methods, due dates."})}
                  {renderField("bankDetails","Verified payment details",{multiline:true,placeholder:"Only add your verified business or receiving account details when ready."})}
                  {renderField("jurisdiction","Jurisdiction / governing law",{placeholder:"Agree with a qualified adviser."})}
                  {renderField("termination","Cancellation / termination",{multiline:true,placeholder:"Notice, final handover and agreed refunds or charges."})}
                </div>
              </details>
              <details className="ia-4b-edit-section">
                <summary><span>Maintenance agreements</span><span>05</span></summary>
                <div className="ia-4b-input-grid">
                  {renderField("careFrequency","Visit / update frequency",{multiline:true,placeholder:"How often maintenance checks and updates take place."})}
                  {renderField("careResponse","Support hours / response expectations",{multiline:true,placeholder:"Specify actual availability and response targets."})}
                  {renderField("careExclusions","Care exclusions and third parties",{multiline:true,placeholder:"List hosting, domain, paid integrations, major builds and emergencies separately."})}
                </div>
              </details>
            </div>
            <div className="ia-4b-preview-panel">
              <div className="ia-4b-preview-toolbar">
                <div><span>03 / Live preview</span><strong>{selected?.label}</strong><small>{selected?.description}</small></div>
                <span className="ia-4b-draft-badge">Draft only</span>
              </div>
              <div className="ia-4b-preview-controls">
                <button type="button" onClick={copyDocument}><Clipboard size={16} aria-hidden="true"/> Copy</button>
                <button type="button" onClick={saveText}><Download size={16} aria-hidden="true"/> Save text</button>
                <button type="button" onClick={printDocument}><Printer size={16} aria-hidden="true"/> Print / PDF</button>
              </div>
              <p className="ia-4b-utility-status" role="status" aria-live="polite">{status||"Enter details on the left. Your printable draft updates live."}</p>
              <article className="ia-4b-paper" aria-label={"Preview of "+selected?.label}>
                <header><strong><span>ia.</span> IBRAHIM ALLI</strong><small>DESIGN · DEVELOPMENT · DIGITAL</small></header>
                <pre>{doc}</pre>
              </article>
              <div className="ia-4b-legal-note">
                <WandSparkles size={17} aria-hidden="true"/><p><strong>Before sending:</strong> Check each client's identity, scope, currency, item amounts, due dates, tax treatment and account details. Agreement templates are outlines, not legal advice; arrange professional legal review before signature. Printing can save a PDF through your device's print menu.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
