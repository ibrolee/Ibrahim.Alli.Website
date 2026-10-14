import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CheckCircle2 } from "lucide-react";
import { insights } from "@/lib/insight-content";

export const Route=createFileRoute("/insights/")({
  head:()=>({
    meta:[
      {title:"Website Guides & Practical Advice — Ibrahim Alli"},
      {name:"description",content:"Straightforward guides for business owners: website costs, launching an online store, and deciding when to redesign your website."},
      {property:"og:title",content:"Useful Website Guides — Ibrahim Alli"},
      {property:"og:description",content:"Practical website planning advice, written for real businesses."},
      {property:"og:type",content:"website"},
      {property:"og:url",content:"https://ibrahimalli.com/insights"},
    ],
    links:[{rel:"canonical",href:"https://ibrahimalli.com/insights"}],
  }),
  component:InsightsHome,
});

function InsightsHome(){
 return <main id="main-content" className="ia-stage-page ia-4d-page">
   <section className="ia-stage-hero ia-4d-hero">
     <div className="p-container ia-stage-hero-inner">
       <Link to="/services" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Back to services</Link>
       <p className="p-label">Practical insights / Web & business</p>
       <h1>Better questions.<br/><em>Better websites.</em></h1>
       <div className="ia-stage-lead-row">
         <p>Useful, straightforward guides to help you plan a business website, prepare a store or decide what to improve. No invented results or sales promises.</p>
         <Link to="/start-project" className="ia-stage-primary">Discuss a project <ArrowUpRight size={18} aria-hidden="true"/></Link>
       </div>
     </div>
   </section>
   <section className="ia-4d-articles-section" aria-labelledby="articles-heading">
    <div className="p-container">
      <div className="ia-4d-section-head">
        <div><p className="p-label">01 / Guides</p><h2 id="articles-heading">For decisions <em>worth getting right.</em></h2></div>
        <p>Start wherever you are in the process. Each guide ends with a simple preparation checklist you can use.</p>
      </div>
      <div className="ia-4d-cards">
        {insights.map((article,index)=><Link key={article.slug} to="/insights/$slug" params={{slug:article.slug}} className="ia-4d-card">
          <div className="ia-4d-card-header"><span>{String(index+1).padStart(2,"0")} / GUIDE</span><BookOpen size={26} strokeWidth={1.5} aria-hidden="true"/></div>
          <div><span className="ia-4d-tag">{article.kicker}</span><h3>{article.title}</h3><p>{article.summary}</p></div>
          <div className="ia-4d-card-bottom"><span>{article.readTime}</span><strong>Read the guide <ArrowUpRight size={18} aria-hidden="true"/></strong></div>
        </Link>)}
      </div>
    </div>
   </section>
   <section className="ia-4d-guide-cta">
      <div className="p-container ia-4d-guide-cta-inner">
        <CheckCircle2 size={26} aria-hidden="true"/>
        <div><h2>Already have a website?</h2><p>Start with a free initial look at what you could improve before committing to a redesign.</p></div>
        <Link to="/free-website-audit">Request a free initial review <ArrowRight size={17} aria-hidden="true"/></Link>
      </div>
   </section>
 </main>;
}
