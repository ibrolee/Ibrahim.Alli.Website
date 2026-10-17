import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ClipboardCheck, Eye, Globe2, Mail, MessageCircle, SearchCheck, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

const EMAIL = "alliibrahim3@gmail.com";
const WHATSAPP = "905488534011";
const steps = [
  { number:"01",title:"Share the website",description:"Tell me which public website you run and what matters most to your business." },
  { number:"02",title:"I'll review the basics",description:"I look at the public-facing experience, particularly phone usability, clarity and the way visitors take action." },
  { number:"03",title:"Get a starting point",description:"If I can take on the review, I'll reply with practical observations and suggested next steps. Any deeper work is optional and quoted separately." },
];

export const Route = createFileRoute("/free-website-audit")({
  head: () => ({
    meta: [
      { title: "Free Website Audit Request — Ibrahim Alli" },
      { name:"description", content:"Request a free initial review of your existing business website. Discover potential improvements to mobile usability, first impressions, content clarity and customer enquiries." },
      { property:"og:title",content:"Free Website Audit — Ibrahim Alli" },
      { property:"og:description",content:"Start with an initial review of your public website and discover what could work better." },
      { property:"og:url",content:"https://ibrahimalli.com/free-website-audit" },
      { property:"og:type",content:"website" },
    ],
    links: [{rel:"canonical",href:"https://ibrahimalli.com/free-website-audit"}],
  }),
  component: AuditPage,
});

function AuditPage(){
  const ref=useRef<HTMLFormElement>(null);
  function getBrief(){
    if(!ref.current || !ref.current.reportValidity())return null;
    const data=new FormData(ref.current);
    const get=(key:string)=>String(data.get(key)??"").trim();
    const lines=[
      "Hello Ibrahim,",
      "",
      "I'd like to request a free initial website audit.",
      "",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Business: ${get("business") || "Not provided"}`,
      `Public website: ${get("website")}`,
      `Main concern: ${get("focus")}`,
      "",
      "What I'd like to improve:",
      get("details") || "I'm open to your initial observations.",
      "",
      "Please let me know if you can take on the review.",
    ];
    return lines.join("\n");
  }
  function openEnquiry(channel:"email"|"whatsapp"){
    const brief=getBrief();
    if(!brief)return;
    // Analytics records a handoff choice, not personal information or a submitted request.
    if(channel==="email"){
      window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent("Free initial website audit request")}&body=${encodeURIComponent(brief)}`;
    }else{
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(brief)}`,"_blank","noopener,noreferrer");
    }
  }
  function handleSubmit(event:FormEvent<HTMLFormElement>){event.preventDefault();openEnquiry("email");}
  return (
    <main id="main-content" className="ia-stage-page ia-4a-page">
      <section className="ia-stage-hero ia-4a-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/services" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Back to services</Link>
          <p className="p-label">For existing business websites / No obligation</p>
          <h1>Your website.<br/><em>Fresh eyes.</em></h1>
          <div className="ia-stage-lead-row">
            <p>Sometimes a few overlooked details stand between a good website and a better customer experience. Request a free initial review of your public-facing website.</p>
            <a href="#audit-request" className="ia-stage-primary">Request your review <ArrowUpRight size={19} aria-hidden="true"/></a>
          </div>
          <div className="ia-stage-statline"><span>No account needed</span><span>Initial review only</span><span>No pressure to hire me</span></div>
        </div>
      </section>
      <section className="ia-4a-benefits" aria-labelledby="audit-looks-heading">
        <div className="p-container">
          <div className="ia-4a-heading">
            <div><p className="p-label">01 / What I'll look at</p><h2 id="audit-looks-heading">The details that<br/><em>make a difference.</em></h2></div>
            <p>An initial visual and usability review, based on the website and information you choose to share.</p>
          </div>
          <div className="ia-4a-benefit-grid">
            <article><Smartphone aria-hidden="true"/><h3>Mobile experience</h3><p>Navigation, readability and how comfortably the website works on a phone.</p></article>
            <article><Eye aria-hidden="true"/><h3>First impressions</h3><p>Whether the design explains who you are and what makes your business worth considering.</p></article>
            <article><SearchCheck aria-hidden="true"/><h3>Content & visibility</h3><p>Page structure, titles and obvious opportunities to make key information easier to discover.</p></article>
            <article><ClipboardCheck aria-hidden="true"/><h3>Customer journey</h3><p>How easily someone can find the right service, enquire or take the next step.</p></article>
          </div>
        </div>
      </section>
      <section className="ia-4a-process" aria-labelledby="audit-process-heading">
        <div className="p-container ia-4a-process-grid">
          <div><p className="p-label">02 / A simple process</p><h2 id="audit-process-heading">Three steps.<br/><em>Nothing complicated.</em></h2><p className="ia-4a-section-sub">This is a helpful starting point, not a comprehensive technical audit or a guaranteed performance score.</p></div>
          <div className="ia-4a-step-list">
            {steps.map(step=><article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><ArrowUpRight size={17} aria-hidden="true"/></article>)}
          </div>
        </div>
      </section>
      <section id="audit-request" className="ia-4a-audit-section" aria-labelledby="audit-form-heading">
        <div className="p-container ia-4a-audit-layout">
          <div className="ia-4a-form-side">
            <p className="p-label">03 / Let's take a look</p>
            <h2 id="audit-form-heading">Tell me about<br/><em>your website.</em></h2>
            <p>I only need your public website address and a little context. Don't include passwords, admin access, confidential customer information or other sensitive records.</p>
            <div className="ia-4a-trust"><ShieldCheck size={21} aria-hidden="true"/><span>Nothing is stored by this form. You review and send the message in your own email or WhatsApp app.</span></div>
            <Link to="/website-maintenance" className="ia-text-action">Already need ongoing website care? <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
          <div className="ia-enquiry-card">
            <div className="ia-enquiry-card-heading">
              <div><p className="p-label">Free initial website review</p><h2>Request an audit.</h2></div>
              <Globe2 size={28} aria-hidden="true"/>
            </div>
            <form className="ia-enquiry-form" ref={ref} onSubmit={handleSubmit}>
              <div className="ia-field-row">
                <label className="ia-field"><span>Your name <strong>*</strong></span><input required name="name" autoComplete="name" maxLength={90} placeholder="What should I call you?" /></label>
                <label className="ia-field"><span>Email address <strong>*</strong></span><input required name="email" type="email" autoComplete="email" maxLength={150} placeholder="you@example.com" /></label>
              </div>
              <label className="ia-field"><span>Your business <small>(optional)</small></span><input name="business" autoComplete="organization" maxLength={100} placeholder="Business or brand name" /></label>
              <label className="ia-field"><span>Website URL <strong>*</strong></span><input name="website" type="url" required maxLength={300} inputMode="url" placeholder="https://yourbusiness.com" pattern="https?://.+" title="Enter the full public website link, starting with https:// or http://" /></label>
              <label className="ia-field"><span>What matters most? <strong>*</strong></span>
                <select name="focus" required defaultValue="">
                  <option value="" disabled>Choose the main thing to review</option>
                  <option>Mobile usability</option>
                  <option>Design & first impression</option>
                  <option>Content & search visibility</option>
                  <option>Getting more customer enquiries</option>
                  <option>General first look</option>
                </select>
              </label>
              <label className="ia-field"><span>What would you like to improve? <small>(optional)</small></span>
                <textarea name="details" rows={4} maxLength={700} placeholder="Tell me what doesn't feel right, or what you wish visitors could do more easily." />
              </label>
              <p className="ia-enquiry-note"><ShieldCheck size={17} aria-hidden="true"/> This request opens your email or WhatsApp with a prefilled message. It is not submitted until you press Send there. Availability and depth of any review will be confirmed in our conversation.</p>
              <div className="ia-enquiry-actions">
                <button type="submit" className="ia-stage-primary"><Mail size={18} aria-hidden="true"/> Continue in email <ArrowUpRight size={17} aria-hidden="true"/></button>
                <button type="button" className="ia-stage-outline" onClick={()=>openEnquiry("whatsapp")}><MessageCircle size={18} aria-hidden="true"/> Continue in WhatsApp <ArrowUpRight size={17} aria-hidden="true"/></button>
              </div>
              <p className="ia-enquiry-disclaimer">A free initial look does not include source-code access, security testing, exhaustive SEO auditing or implementation. No subscription or commitment is required.</p>
            </form>
          </div>
        </div>
      </section>
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><p className="p-label">Need more than a review?</p><h2>Ready for changes?<br/><em>Let's plan the right work.</em></h2></div>
          <Link to="/start-project" search={{service:"website-redesign"}} className="ia-stage-primary">Discuss a redesign <ArrowUpRight size={19} aria-hidden="true"/></Link>
        </div>
      </section>
    </main>
  );
}
