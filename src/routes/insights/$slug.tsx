import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { track } from "@vercel/analytics";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ClipboardCheck, Clock3 } from "lucide-react";
import { getInsight,insights } from "@/lib/insight-content";

const SITE="https://ibrahimalli.com";

export const Route=createFileRoute("/insights/$slug")({
  loader:({params})=>{
    const insight=getInsight(params.slug);
    if(!insight)throw notFound();
    return insight;
  },
  head:({loaderData,params})=>{
    if(!loaderData)return {meta:[{title:"Article not found — Ibrahim Alli"},{name:"robots",content:"noindex"}]};
    const url=SITE+"/insights/"+params.slug;
    return {
      meta:[
        {title:loaderData.title+" — Ibrahim Alli"},
        {name:"description",content:loaderData.description},
        {property:"og:title",content:loaderData.title+" — Ibrahim Alli"},
        {property:"og:description",content:loaderData.description},
        {property:"og:type",content:"article"},
        {property:"og:url",content:url},
        {property:"og:image",content:SITE+"/og-image.jpg"},
        {name:"twitter:card",content:"summary_large_image"},
      ],
      links:[{rel:"canonical",href:url}],
    };
  },
  component:InsightPage,
});

function InsightPage(){
  const insight=Route.useLoaderData();
  const related=insights.filter(item=>item.slug!==insight.slug).slice(0,2);
  const trackClick=(placement:"sidebar"|"end")=>{
    // This event represents navigating to the form, not a delivered message or qualified enquiry.
    track("portfolio_insight_cta_click",{guide:insight.slug,placement});
  };
  const articleSchema={
    "@context":"https://schema.org",
    "@type":"Article",
    headline:insight.title,
    description:insight.description,
    author:{"@type":"Person",name:"Ibrahim Alli",url:SITE},
    publisher:{"@type":"Person",name:"Ibrahim Alli",url:SITE},
    mainEntityOfPage:SITE+"/insights/"+insight.slug,
    inLanguage:"en",
  };
  const breadcrumbSchema={
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:SITE},
      {"@type":"ListItem",position:2,name:"Insights",item:SITE+"/insights"},
      {"@type":"ListItem",position:3,name:insight.title,item:SITE+"/insights/"+insight.slug},
    ],
  };
  return <main id="main-content" className="ia-stage-page ia-4d-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([articleSchema,breadcrumbSchema]).replace(/</g,"\\u003c")}}/>
    <section className="ia-stage-hero ia-4d-article-hero">
      <div className="p-container ia-stage-hero-inner">
        <Link to="/insights" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> All guides</Link>
        <p className="p-label">{insight.kicker}</p>
        <h1>{insight.title}</h1>
        <div className="ia-4d-article-intro">
          <p>{insight.summary}</p>
          <span><Clock3 size={16} aria-hidden="true"/> {insight.readTime} · {insight.audience}</span>
        </div>
      </div>
    </section>
    <section className="ia-4d-reading-section">
      <div className="p-container ia-4d-reading-layout">
        <article className="ia-4d-reading-content">
          {insight.sections.map((section,index)=><section key={section.heading} className="ia-4d-reading-block">
            <span className="ia-4d-reading-num">{String(index+1).padStart(2,"0")}</span>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
            {section.bullets&&<ul>{section.bullets.map(t=><li key={t}><Check size={17} aria-hidden="true"/><span>{t}</span></li>)}</ul>}
          </section>)}
          <section className="ia-4d-takeaway" aria-labelledby="checklist-title">
            <div className="ia-4d-takeaway-top"><ClipboardCheck size={27} aria-hidden="true"/><span>Before you start</span></div>
            <h2 id="checklist-title">Your preparation checklist.</h2>
            <ul>{insight.checklist.map(item=><li key={item}><Check size={17} aria-hidden="true"/><span>{item}</span></li>)}</ul>
          </section>
        </article>
        <aside className="ia-4d-article-aside" aria-label="Next steps and more guides">
          <div className="ia-4d-article-aside-card">
            <p className="p-label">Need help planning?</p>
            <h2>Your next step should be clearer.</h2>
            <p>Tell me what you're building and I'll help define a practical scope before preparing a quote.</p>
            <Link to="/start-project" search={{service:insight.service,insight:insight.slug}} onClick={()=>trackClick("sidebar")}>Discuss your project <ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <div className="ia-4d-related">
            <h3>Keep reading</h3>
            {related.map(item=><Link to="/insights/$slug" params={{slug:item.slug}} key={item.slug}>{item.title}<ArrowRight size={17} aria-hidden="true"/></Link>)}
          </div>
        </aside>
      </div>
    </section>
    <section className="ia-stage-end">
      <div className="p-container ia-stage-end-inner">
        <div><p className="p-label">From reading to doing</p><h2>Ready to discuss<br/><em>your own project?</em></h2></div>
        <Link to="/start-project" search={{service:insight.service,insight:insight.slug}} onClick={()=>trackClick("end")} className="ia-stage-primary">{insight.action} <ArrowUpRight size={18} aria-hidden="true"/></Link>
      </div>
    </section>
  </main>
}
