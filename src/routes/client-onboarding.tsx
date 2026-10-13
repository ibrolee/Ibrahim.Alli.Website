import { createFileRoute, Link } from "@tanstack/react-router";
import { track } from "@vercel/analytics";
import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ClipboardCheck, FileText, Mail, MessageCircle, ShieldCheck } from "lucide-react";

const ownerEmail = "alliibrahim3@gmail.com";
const ownerWhatsApp = "905488534011";

const readiness = [
  { title:"Business goal", text:"What should the website or app help visitors do?" },
  { title:"Audience & pages", text:"Who will use it, and which pages or features are essential?" },
  { title:"Brand materials", text:"Logo, photographs, copy and any existing identity or guidelines." },
  { title:"Access & ownership", text:"Who manages the domain, hosting and required third-party services?" },
  { title:"Timing & approvals", text:"Preferred launch window, decision-maker and feedback process." },
  { title:"Scope & budget", text:"What is included, what is excluded and the available budget range." },
];

export const Route = createFileRoute("/client-onboarding")({
  head: () => ({
    meta: [
      { title: "Client Project Questionnaire — Ibrahim Alli" },
      { name:"description", content:"Start your web design or digital project with Ibrahim Alli using a simple project questionnaire and launch-readiness checklist." },
      { property:"og:title", content:"Start a Project Brief — Ibrahim Alli" },
      { property:"og:description", content:"A clear starting point for sharing your goals, timeline and digital project requirements." },
      { property:"og:url", content:"https://ibrahimalli.com/client-onboarding" },
    ],
    links:[{rel:"canonical",href:"https://ibrahimalli.com/client-onboarding"}],
  }),
  component: ClientOnboarding,
});

function ClientOnboarding(){
  const formRef=useRef<HTMLFormElement>(null);
  const [checked,setChecked]=useState<string[]>([]);
  function buildBrief(){
    if(!formRef.current || !formRef.current.reportValidity()) return null;
    const data = new FormData(formRef.current);
    const get = (name:string) => String(data.get(name)??"").trim();
    return [
      "Hello Ibrahim,",
      "",
      "I'd like to begin a project conversation. Here is my questionnaire:",
      "",
      "Name: " + get("name"),
      "Email: " + get("email"),
      "Business / brand: " + (get("business") || "Not provided"),
      "Existing site: " + (get("website") || "Not provided"),
      "Project type: " + get("projectType"),
      "Primary business goal: " + get("goal"),
      "Target audience: " + (get("audience") || "To discuss"),
      "Pages / features: " + get("features"),
      "Existing brand materials: " + get("assets"),
      "Preferred launch timeline: " + get("timeline"),
      "Approximate budget: " + (get("budget") || "To discuss"),
      "Other context: " + (get("notes") || "None"),
      "",
      "Please let me know the next steps for defining scope and getting a quote."
    ].join("\n");
  }
  function openHandoff(channel:"email"|"whatsapp"){
    const message=buildBrief();if(!message)return;
    // Only the channel and intent are recorded; the answers remain in the visitor's browser.
    track("portfolio_onboarding_handoff",{channel});
    if(channel==="email"){
      window.location.href="mailto:"+ownerEmail+"?subject="+encodeURIComponent("New project questionnaire")+"&body="+encodeURIComponent(message);
    }else{
      window.open("https://wa.me/"+ownerWhatsApp+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
    }
  }
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();openHandoff("email");}
  const ready=checked.length;
  return (
    <main id="main-content" className="ia-stage-page ia-4b-page">
      <section className="ia-stage-hero ia-4b-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/services" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Services</Link>
          <p className="p-label">Client onboarding / Step one</p>
          <h1>A good project starts<br/><em>with a clear brief.</em></h1>
          <div className="ia-stage-lead-row">
            <p>Tell me about the people you serve, what you need built, and the result you want. This questionnaire helps shape a realistic proposal — no complicated paperwork required.</p>
            <a href="#client-brief" className="ia-stage-primary">Complete your brief <ArrowUpRight size={18} aria-hidden="true"/></a>
          </div>
          <div className="ia-stage-statline"><span>No account needed</span><span>No automatic submission</span><span>Direct communication</span></div>
        </div>
      </section>
      <section className="ia-4b-onboarding">
        <div className="p-container ia-4b-onboarding-grid">
          <aside className="ia-4b-aside">
            <p className="p-label">01 / Preparation checklist</p>
            <h2>What we'll<br/><em>need to cover.</em></h2>
            <p>Use this optional checklist to organise your thoughts. It stays in your browser and doesn't block you from submitting a brief.</p>
            <div className="ia-4b-check-progress"><span>{ready} of {readiness.length} considered</span><div role="progressbar" aria-valuemin={0} aria-valuemax={readiness.length} aria-valuenow={ready} aria-label="Project preparation checklist progress"><span style={{width:String(ready/readiness.length*100)+"%"}}/></div></div>
            <div className="ia-4b-checklist">
              {readiness.map(item=><label key={item.title} className="ia-4b-check-row">
                <input type="checkbox" checked={checked.includes(item.title)} onChange={e=>setChecked(p=>e.target.checked?[...p,item.title]:p.filter(t=>t!==item.title))}/>
                <span className="ia-4b-check-mark"><Check size={15} aria-hidden="true"/></span>
                <span><strong>{item.title}</strong><small>{item.text}</small></span>
              </label>)}
            </div>
            <Link to="/free-website-audit" className="ia-text-action">Have a live website to review instead? <ArrowRight size={17} aria-hidden="true"/></Link>
          </aside>
          <section id="client-brief" className="ia-4b-form-column" aria-labelledby="client-brief-title">
            <div className="ia-enquiry-card">
              <div className="ia-enquiry-card-heading">
                <div><p className="p-label">02 / Project questionnaire</p><h2 id="client-brief-title">Tell me about it.</h2></div>
                <ClipboardCheck size={28} aria-hidden="true"/>
              </div>
              <form ref={formRef} className="ia-enquiry-form" onSubmit={submit}>
                <div className="ia-field-row">
                  <label className="ia-field"><span>Your name <strong>*</strong></span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your full name"/></label>
                  <label className="ia-field"><span>Email address <strong>*</strong></span><input name="email" autoComplete="email" type="email" required maxLength={150} placeholder="you@example.com"/></label>
                </div>
                <div className="ia-field-row">
                  <label className="ia-field"><span>Business or brand</span><input name="business" autoComplete="organization" maxLength={100} placeholder="Business name"/></label>
                  <label className="ia-field"><span>Existing website <small>(optional)</small></span><input name="website" type="url" placeholder="https://example.com" maxLength={250}/></label>
                </div>
                <label className="ia-field"><span>What would you like built? <strong>*</strong></span>
                  <select required name="projectType" defaultValue="">
                    <option value="" disabled>Choose a project type</option>
                    <option>Business website</option><option>E-commerce store</option><option>Mobile app</option><option>Business system</option><option>Website redesign</option><option>Website maintenance</option><option>Not sure yet</option>
                  </select>
                </label>
                <label className="ia-field"><span>What is the main business goal? <strong>*</strong></span><textarea name="goal" rows={3} minLength={12} maxLength={600} required placeholder="For example: explain our services and make it easier for customers to enquire."/></label>
                <label className="ia-field"><span>Who is the target audience?</span><input name="audience" maxLength={150} placeholder="Customers, members, students, parents..."/></label>
                <label className="ia-field"><span>Which pages or features do you need? <strong>*</strong></span><textarea name="features" rows={4} required minLength={8} maxLength={900} placeholder="List the important pages, booking flows, checkout, member accounts, etc."/></label>
                <div className="ia-field-row">
                  <label className="ia-field"><span>Do you have brand materials?</span>
                    <select name="assets" defaultValue="To discuss">
                      <option>To discuss</option><option>Yes, ready to use</option><option>Some, but not everything</option><option>Not yet</option>
                    </select>
                  </label>
                  <label className="ia-field"><span>Preferred timeline</span>
                    <select name="timeline" defaultValue="Flexible">
                      <option>Flexible</option><option>Within a month</option><option>1–3 months</option><option>3+ months</option><option>Still exploring</option>
                    </select>
                  </label>
                </div>
                <label className="ia-field"><span>Budget range <small>(optional)</small></span><input name="budget" maxLength={90} placeholder="e.g. ₦350,000, £700, or let's discuss"/></label>
                <label className="ia-field"><span>Anything else? <small>(optional)</small></span><textarea name="notes" rows={3} maxLength={700} placeholder="References, existing challenges, must-haves or questions."/></label>
                <div className="ia-4b-privacy"><ShieldCheck size={18} aria-hidden="true"/><p>Answers are not stored on this website. Choose email or WhatsApp, review the prefilled message, then press Send in that app. Please don't include passwords or confidential customer data.</p></div>
                <div className="ia-enquiry-actions">
                  <button type="submit" className="ia-stage-primary"><Mail size={18} aria-hidden="true"/> Continue in email <ArrowUpRight size={17} aria-hidden="true"/></button>
                  <button type="button" onClick={()=>openHandoff("whatsapp")} className="ia-stage-outline"><MessageCircle size={18} aria-hidden="true"/> Continue in WhatsApp <ArrowUpRight size={17} aria-hidden="true"/></button>
                </div>
                <p className="ia-enquiry-disclaimer">Completing this questionnaire doesn't create a contract, reserve a slot or automatically request payment. We'll confirm scope and pricing separately.</p>
              </form>
            </div>
          </section>
        </div>
      </section>
      <section className="ia-stage-end"><div className="p-container ia-stage-end-inner">
        <div><p className="p-label">Prefer something simpler?</p><h2>Just tell me<br/><em>what's on your mind.</em></h2></div>
        <Link to="/start-project" className="ia-stage-primary">Use the shorter enquiry form <ArrowUpRight size={19} aria-hidden="true"/></Link>
      </div></section>
    </main>
  );
}
