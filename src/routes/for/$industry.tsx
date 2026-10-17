import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleHelp, ExternalLink, Lightbulb, ShieldCheck } from "lucide-react";
import { industryPages,industrySlugs,isIndustrySlug } from "@/lib/industry-pages";

const HOST="https://ibrahimalli.com";

export const Route=createFileRoute("/for/$industry")({
  beforeLoad:({params})=>{
    if(!isIndustrySlug(params.industry))throw notFound();
  },
  head:({params})=>{
    if(!isIndustrySlug(params.industry))return {meta:[{title:"Industry Not Found — Ibrahim Alli"},{name:"robots",content:"noindex"}]};
    const d=industryPages[params.industry];
    const title=d.label+" Website Design — Ibrahim Alli";
    const description=d.lead;
    return {
      meta:[
        {title},
        {name:"description",content:description},
        {property:"og:title",content:title},
        {property:"og:description",content:description},
        {property:"og:type",content:"website"},
        {property:"og:url",content:HOST+"/for/"+d.slug},
        {property:"og:image",content:HOST+"/og-image.jpg"},
        {name:"twitter:card",content:"summary_large_image"},
      ],
      links:[{rel:"canonical",href:HOST+"/for/"+d.slug}],
    };
  },
  component:IndustryPage,
});

function IndustryPage(){
  const {industry}=Route.useParams();
  if(!isIndustrySlug(industry))return null;
  const d=industryPages[industry];
  const bookLink={
    to:"/start-project" as const,
    search:{service:d.service,industry:d.slug},
  };
  return <main id="main-content" className="ia-stage-page ia-4c-page">
    <section className="ia-stage-hero ia-4c-hero ia-4c-industry-hero">
      <div className="p-container ia-stage-hero-inner">
        <Link to="/industries" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> All industries</Link>
        <p className="p-label">{d.eyebrow}</p>
        <h1>{d.title}<br/><em>{d.accent}</em></h1>
        <div className="ia-stage-lead-row">
          <p>{d.lead}</p>
          <Link {...bookLink} className="ia-stage-primary">Discuss your website <ArrowUpRight size={18} aria-hidden="true"/></Link>
        </div>
        <div className="ia-stage-statline"><span>Built around your workflow</span><span>Clear scope before pricing</span><span>Mobile-first approach</span></div>
      </div>
    </section>
    <section className="ia-4c-challenges">
      <div className="p-container">
        <div className="ia-4c-section-heading"><div><p className="p-label">01 / What matters</p><h2>A website that <em>works for you.</em></h2></div><p>{d.intro}</p></div>
        <div className="ia-4c-challenges-grid">
          {d.challenges.map((item,index)=><article key={item.title}>
            <span className="ia-4c-num">0{index+1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className="ia-4c-offerings">
      <div className="p-container ia-4c-offerings-inner">
        <div>
          <p className="p-label">02 / What we could build</p>
          <h2>Useful by design.<br/><em>Not just beautiful.</em></h2>
          <p className="ia-4c-sub">These are possible elements, not a claim that every project needs all of them. I'll recommend a practical scope after we talk.</p>
        </div>
        <ul>{d.offerings.map(item=><li key={item}><Check size={19} aria-hidden="true"/><span>{item}</span></li>)}</ul>
      </div>
    </section>
    <section className="ia-4c-example">
      <div className="p-container">
        <div className="ia-4c-example-card">
          <div className="ia-4c-example-icon"><Lightbulb size={31} aria-hidden="true"/></div>
          <div>
            <p className="p-label">03 / Relevant experience</p>
            <h2>{d.proofTitle}</h2>
            <p>{d.proofText}</p>
            {d.proofPath?(
              <Link to="/projects/$slug" params={{slug:d.proofPath.split("/").pop()||""}} className="ia-4c-example-link">{d.proofCta} <ArrowUpRight size={18} aria-hidden="true"/></Link>
            ):(
              <span className="ia-4c-concept-disclosure"><ShieldCheck size={16} aria-hidden="true"/> Concept / exploratory proposal only</span>
            )}
          </div>
        </div>
      </div>
    </section>
    <section className="ia-4c-faq">
      <div className="p-container ia-4c-faq-layout">
        <div>
          <p className="p-label">04 / Before we start</p>
          <h2>Good questions.<br/><em>Clear answers.</em></h2>
          <p>Project cost and timing depend on the pages, content, integrations and support required.</p>
        </div>
        <div>
          {d.questions.map(q=><details key={q.q}>
            <summary>{q.q}<CircleHelp size={18} aria-hidden="true"/></summary>
            <p>{q.a}</p>
          </details>)}
        </div>
      </div>
    </section>
    <section className="ia-stage-end">
      <div className="p-container ia-stage-end-inner">
        <div><p className="p-label">Ready to explore?</p><h2>{d.takeaway}<br/><em>Let's talk about your business.</em></h2></div>
        <div className="ia-4c-end-links">
          <Link {...bookLink} className="ia-stage-primary">Get a tailored proposal <ArrowUpRight size={18} aria-hidden="true"/></Link>
          <Link to="/industries" className="ia-4c-text-link">Browse other industries <ArrowRight size={17} aria-hidden="true"/></Link>
        </div>
      </div>
    </section>
  </main>
}
