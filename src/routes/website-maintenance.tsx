import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, FileCheck2, HeartHandshake, LifeBuoy, LockKeyhole, RefreshCcw, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const plans = [
  {
    index: "01",
    name: "Essential Care",
    label: "Keep the essentials in shape",
    intro: "For a smaller website that mainly needs a watchful eye and occasional upkeep.",
    details: [
      "Scheduled visual and functional checks",
      "Routine agreed content changes",
      "Basic broken-link or page-error review",
      "Clear reports of issues needing attention",
    ],
    note: "Maintenance frequency and change allowance are agreed in your quote.",
  },
  {
    index: "02",
    name: "Business Care",
    label: "Support for an active business site",
    intro: "For websites with regularly changing offers, pages or business information.",
    details: [
      "Everything in Essential Care",
      "More frequent agreed content updates",
      "Review of key forms and enquiry journeys",
      "Periodic mobile usability and page checks",
    ],
    note: "Update volume, check cadence and response expectations are defined in writing.",
    featured: true,
  },
  {
    index: "03",
    name: "Custom Support",
    label: "Support built around your setup",
    intro: "For online stores, membership systems and websites with custom integrations.",
    details: [
      "Review of your actual tools and dependencies",
      "Agreed monitoring and maintenance checklist",
      "Prioritised fixes or improvements within scope",
      "Documented responsibilities and escalation path",
    ],
    note: "Integrations and third-party providers are reviewed before a support commitment.",
  },
] as const;

const terms = [
  {
    title:"What counts as maintenance?",
    text:"Agreed updates, functional checks and upkeep of the website you already have. A redesign, major new feature or new app is a separate development project.",
  },
  {
    title:"What about my hosting and domain?",
    text:"Domain, hosting, email, paid plugins and payment providers are third-party services. Their subscriptions and access remain separately agreed; they aren't automatically included.",
  },
  {
    title:"Do you guarantee 24/7 support?",
    text:"No automatic 24/7 or instant emergency cover is included. Communication channels, availability, response targets and any urgent support arrangements are defined in the agreement.",
  },
  {
    title:"Can you maintain a website you didn't build?",
    text:"Often, yes — after reviewing how it's hosted and how it was built. Access, condition, plugins and ownership can affect whether it's suitable for ongoing support.",
  },
] as const;

export const Route = createFileRoute("/website-maintenance")({
  head:()=>({
    meta:[
      {title:"Website Maintenance & Ongoing Support — Ibrahim Alli"},
      {name:"description",content:"Keep your business website cared for with tailored maintenance, content updates, functional checks and agreed technical support from Ibrahim Alli."},
      {property:"og:title",content:"Website Maintenance & Support — Ibrahim Alli"},
      {property:"og:description",content:"Website care packages designed around your actual business, with transparent scope and no invented fixed prices."},
      {property:"og:url",content:"https://ibrahimalli.com/website-maintenance"},
      {property:"og:type",content:"website"},
    ],
    links:[{rel:"canonical",href:"https://ibrahimalli.com/website-maintenance"}],
  }),
  component: MaintenancePage,
});

function MaintenancePage(){
  return(
    <main id="main-content" className="ia-stage-page ia-4a-page">
      <section className="ia-stage-hero ia-4a-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/services" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Back to services</Link>
          <p className="p-label">Website care / Ongoing support</p>
          <h1>Keep it working.<br/><em>Keep it current.</em></h1>
          <div className="ia-stage-lead-row">
            <p>Launching a website is only the beginning. Give yours practical ongoing attention, with maintenance that fits the site you have — not a one-size-fits-all promise.</p>
            <Link to="/start-project" search={{service:"website-maintenance"}} className="ia-stage-primary">Discuss maintenance <ArrowUpRight size={19} aria-hidden="true"/></Link>
          </div>
          <div className="ia-stage-statline"><span>Scope agreed upfront</span><span>For existing websites</span><span>Remote support</span></div>
        </div>
      </section>
      <section className="ia-4a-benefits ia-4a-maintain-intro" aria-labelledby="maintenance-benefits-heading">
        <div className="p-container">
          <div className="ia-4a-heading">
            <div><p className="p-label">01 / Why ongoing care matters</p><h2 id="maintenance-benefits-heading">A website shouldn't<br/><em>stand still.</em></h2></div>
            <p>When details become outdated or features quietly stop working, customers notice. Maintenance helps you stay on top of the small things.</p>
          </div>
          <div className="ia-4a-benefit-grid">
            <article><RefreshCcw aria-hidden="true"/><h3>Content updates</h3><p>Keep agreed text, services, offers and contact details accurate.</p></article>
            <article><Wrench aria-hidden="true"/><h3>Functional checks</h3><p>Review the pages, links and forms that customers depend on.</p></article>
            <article><ShieldCheck aria-hidden="true"/><h3>Practical upkeep</h3><p>Plan appropriate checks and fixes based on your website's technology and access.</p></article>
            <article><LifeBuoy aria-hidden="true"/><h3>A clear point of contact</h3><p>Know who to speak with when you need an agreed update or improvement.</p></article>
          </div>
        </div>
      </section>
      <section id="care-options" className="ia-4a-plan-section" aria-labelledby="maintenance-options-heading">
        <div className="p-container">
          <div className="ia-4a-heading">
            <div><p className="p-label">02 / Ongoing support options</p><h2 id="maintenance-options-heading">Find the level of care<br/><em>your website needs.</em></h2></div>
            <p>Every plan is tailored after reviewing your website. Pricing, turnaround, frequency and monthly change limits are confirmed in your written quote.</p>
          </div>
          <div className="ia-4a-plan-grid">
            {plans.map(plan=>(
              <article className={`ia-4a-plan${"featured" in plan && plan.featured?" ia-4a-plan-featured":""}`} key={plan.index}>
                <div className="ia-4a-plan-top"><span>{plan.index} / SUPPORT</span>{"featured" in plan && plan.featured?<span><Sparkles size={14} aria-hidden="true"/> Growing businesses</span>:null}</div>
                <h3>{plan.name}</h3>
                <strong className="ia-4a-plan-label">{plan.label}</strong>
                <p>{plan.intro}</p>
                <ul>{plan.details.map(item=><li key={item}><Check size={17} aria-hidden="true"/><span>{item}</span></li>)}</ul>
                <div className="ia-4a-plan-foot">
                  <small>{plan.note}</small>
                  <Link to="/start-project" search={{service:"website-maintenance",plan:plan.name}} aria-label={`Enquire about ${plan.name}`}>Enquire about this plan <ArrowUpRight size={18} aria-hidden="true"/></Link>
                </div>
              </article>
            ))}
          </div>
          <p className="ia-4a-plan-disclaimer"><FileCheck2 size={17} aria-hidden="true"/> No fixed price or response time is implied. Your agreement will state what's covered, what's excluded and who is responsible for third-party accounts.</p>
        </div>
      </section>
      <section className="ia-4a-process" aria-labelledby="maintenance-terms-heading">
        <div className="p-container ia-4a-process-grid">
          <div><p className="p-label">03 / Good to know</p><h2 id="maintenance-terms-heading">Clear expectations.<br/><em>Better partnerships.</em></h2><p className="ia-4a-section-sub">Care is most useful when responsibilities, turnaround and scope are understood from the start.</p></div>
          <div className="ia-4a-terms">
            {terms.map(item=><details key={item.title}><summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.text}</p></details>)}
          </div>
        </div>
      </section>
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><p className="p-label">04 / Let's plan the support</p><h2>Your website is live.<br/><em>Let's keep it useful.</em></h2><p className="ia-4a-end-note">Share your website and what you need help maintaining. I'll review the setup before suggesting a scope and quote.</p></div>
          <div className="ia-4a-end-actions">
            <Link to="/start-project" search={{service:"website-maintenance"}} className="ia-stage-primary">Request a maintenance quote <ArrowUpRight size={19} aria-hidden="true"/></Link>
            <Link to="/free-website-audit" className="ia-text-action">Want a free initial website review first? <ArrowRight size={16} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
