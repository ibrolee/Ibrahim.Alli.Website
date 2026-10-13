import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, MoveUpRight } from "lucide-react";
import { services } from "@/lib/freelance-services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const found = services.find((service) => service.slug === params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Ibrahim Alli` : "Service unavailable — Ibrahim Alli" },
      { name: "description", content: loaderData?.intro ?? "Freelance web design and digital development services." },
      { property: "og:title", content: loaderData ? `${loaderData.name} | Ibrahim Alli` : "Service — Ibrahim Alli" },
      { property: "og:description", content: loaderData?.tagline ?? "Professional website services by Ibrahim Alli." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://ibrahimalli.com/services/${params.slug}` },
      ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: `https://ibrahimalli.com/services/${params.slug}` }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const service = Route.useLoaderData();
  const next = services[(services.findIndex((item) => item.slug === service.slug) + 1) % services.length];

  return (
    <main id="main-content" className="ia-stage-page">
      <section className="ia-stage-hero ia-detail-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/services" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> All services</Link>
          <p className="p-label">{service.number} / {service.eyebrow}</p>
          <h1>{service.name}<span className="ia-detail-star" aria-hidden="true">✳</span></h1>
          <div className="ia-stage-lead-row">
            <p>{service.tagline}</p>
            <Link to="/start-project" search={{ service: service.slug }} className="ia-stage-primary">Discuss this project <ArrowUpRight size={19} aria-hidden="true"/></Link>
          </div>
          <div className="ia-stage-statline"><span>Considered design</span><span>Clear communication</span><span>Built for real use</span></div>
        </div>
      </section>
      <section className="ia-detail-intro">
        <div className="p-container ia-detail-intro-grid">
          <div><span className="p-label">01 / The idea</span><h2>Good digital work starts with <em>your actual needs.</em></h2></div>
          <div><p>{service.intro}</p><div className="ia-detail-audience"><span>Best suited for</span><strong>{service.suitedFor}</strong></div></div>
        </div>
      </section>
      <section className="ia-detail-includes">
        <div className="p-container ia-detail-split">
          <div><span className="p-label">02 / What's typically involved</span><h2>Useful details.<br /><em>Nothing unnecessary.</em></h2><p>Every project is scoped individually. This is a starting point, not a promise of extra features without an agreed quote.</p></div>
          <div className="ia-detail-checks">
            {service.deliverables.map((feature,index)=><div key={feature}><span>0{index+1}</span><Check size={20} aria-hidden="true"/><p>{feature}</p></div>)}
          </div>
        </div>
      </section>
      <section className="ia-detail-plan">
        <div className="p-container ia-detail-split">
          <div><span className="p-label">03 / Before we begin</span><h2>Let's get the<br /><em>important parts right.</em></h2></div>
          <div className="ia-detail-questions">
            {service.considerations.map((item,index)=><div key={item}><strong>{String(index + 1).padStart(2,"0")}</strong><p>{item}</p><ChevronRight size={18} aria-hidden="true"/></div>)}
            <Link to="/start-project" search={{service:service.slug}} className="ia-text-action">Answer a few project questions <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
      {service.exampleSlug && service.exampleName ? (
        <section className="ia-detail-example">
          <div className="p-container ia-detail-example-inner">
            <div><span className="p-label">Related real project</span><h2>{service.exampleName}</h2><p>See an actual project and some of the work delivered.</p></div>
            <Link to="/projects/$slug" params={{slug:service.exampleSlug}} className="ia-stage-outline">Explore the case study <MoveUpRight size={18} aria-hidden="true"/></Link>
          </div>
        </section>
      ) : null}
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><span className="p-label">Your project, your priorities</span><h2>Have an idea?<br /><em>Let's discuss what fits.</em></h2></div>
          <Link to="/start-project" search={{service:service.slug}} className="ia-stage-primary">Start a project <ArrowUpRight size={19} aria-hidden="true"/></Link>
          <Link to="/services/$slug" params={{slug:next.slug}} className="ia-text-action ia-next-service">Next: {next.name} <ArrowRight size={17} aria-hidden="true"/></Link>
        </div>
      </section>
    </main>
  );
}
