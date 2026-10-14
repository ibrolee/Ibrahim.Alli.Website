import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Dumbbell, GraduationCap, ShoppingBag, Shirt } from "lucide-react";
import { industryPages,industrySlugs } from "@/lib/industry-pages";

const iconMap=[Dumbbell,Shirt,GraduationCap,ShoppingBag] as const;

export const Route=createFileRoute("/industries")({
  head:()=>({
    meta:[
      {title:"Websites for Gyms, Fashion Brands, Schools & Online Stores — Ibrahim Alli"},
      {name:"description",content:"Explore purpose-built web design approaches for gyms and wellness businesses, beauty and fashion brands, schools and online stores by Ibrahim Alli."},
      {property:"og:title",content:"Websites Built Around Your Business — Ibrahim Alli"},
      {property:"og:description",content:"Different businesses, different customer journeys. Explore web design approaches tailored to your industry."},
      {property:"og:url",content:"https://ibrahimalli.com/industries"},
      {property:"og:image",content:"https://ibrahimalli.com/og-image.jpg"},
    ],
    links:[{rel:"canonical",href:"https://ibrahimalli.com/industries"}],
  }),
  component:IndustryHub,
});
function IndustryHub(){
  return <main id="main-content" className="ia-stage-page ia-4c-page">
    <section className="ia-stage-hero ia-4c-hero">
      <div className="p-container ia-stage-hero-inner">
        <Link to="/services" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Back to services</Link>
        <p className="p-label">Designed around your business</p>
        <h1>Different businesses.<br/><em>Different needs.</em></h1>
        <div className="ia-stage-lead-row">
          <p>A website for a gym shouldn't feel identical to a fashion store or school. Explore the kinds of experiences I can help you plan and build.</p>
          <Link to="/start-project" className="ia-stage-primary">Tell me about your business <ArrowUpRight size={18} aria-hidden="true"/></Link>
        </div>
      </div>
    </section>
    <section className="ia-4c-index-section">
      <div className="p-container">
        <div className="ia-4c-section-heading"><div><p className="p-label">01 / Select your industry</p><h2>Start with the <em>right experience.</em></h2></div><p>Each approach is based on common customer needs and actual project requirements, not a fixed package.</p></div>
        <div className="ia-4c-industry-grid">
          {industrySlugs.map((slug,index)=>{
            const item=industryPages[slug],Icon=iconMap[index];
            return <Link className="ia-4c-industry-card" key={slug} to="/for/$industry" params={{industry:slug}}>
              <div className="ia-4c-card-top"><span>{String(index+1).padStart(2,"0")} / INDUSTRY</span><Icon size={29} strokeWidth={1.5} aria-hidden="true"/></div>
              <h3>{item.label}</h3>
              <p>{item.lead}</p>
              <div className="ia-4c-card-action">See website solutions <ArrowUpRight size={17} aria-hidden="true"/></div>
            </Link>;
          })}
        </div>
        <p className="ia-4c-index-note">Don't see your industry? I also work on other business websites and digital systems. <Link to="/services">Explore all services <ArrowRight size={16} aria-hidden="true"/></Link></p>
      </div>
    </section>
    <section className="ia-stage-end">
      <div className="p-container ia-stage-end-inner"><div><span className="p-label">Tell me about your business</span><h2>Let's shape the solution<br/><em>around what you need.</em></h2></div><Link to="/start-project" className="ia-stage-primary">Start a project <ArrowUpRight size={18} aria-hidden="true"/></Link></div>
    </section>
  </main>;
}
