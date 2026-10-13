import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, LayoutGrid, MousePointerClick, Smartphone, Wrench, Sparkles, BadgeCheck, Layers3, MoveUpRight, SearchCheck } from "lucide-react";
import { services, projectProcess } from "@/lib/freelance-services";

const packages = [
  { tag:"01 / Launch", title:"Essential", description:"A confident online home for a business, professional or personal brand.", suitable:"Best for a new business or simple portfolio", items:["A focused, mobile-first website","Clear services and contact journey","Basic search visibility and launch guidance"], service:"business-websites" },
  { tag:"02 / Grow", title:"Business", description:"A more complete experience for a growing business with richer content and customer journeys.", suitable:"Best for established businesses ready to grow", items:["Custom multi-page design","Service or product presentation","Conversion-focused enquiries and responsive refinement"], service:"business-websites", featured:true },
  { tag:"03 / Build", title:"Custom", description:"Digital tools, stores and workflows built around how your business actually operates.", suitable:"Best for e-commerce and tailored digital systems", items:["Discovery and workflow planning","Custom features, integrations or member tools","Testing, handover and support scope"], service:"business-systems" },
] as const;

const symbols = [LayoutGrid, MousePointerClick, Smartphone, Wrench, LayoutGrid];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Website Design & Digital Services — Ibrahim Alli" },
      { name: "description", content: "Explore business websites, e-commerce, mobile apps, custom digital systems and website redesign services by Ibrahim Alli. Get a clear project proposal." },
      { property: "og:title", content: "Website Design & Digital Services — Ibrahim Alli" },
      { property: "og:description", content: "Thoughtful websites and useful digital products for real businesses." },
      { property: "og:url", content: "https://ibrahimalli.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://ibrahimalli.com/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main id="main-content" className="ia-stage-page">
      <section className="ia-stage-hero">
        <div className="p-container ia-stage-hero-inner">
          <p className="p-label">What I can help you build / 2026</p>
          <h1>Digital experiences<br /><em>made for your business.</em></h1>
          <div className="ia-stage-lead-row">
            <p>I design websites and useful products for businesses that want to look credible, communicate clearly and make everyday work easier.</p>
            <Link className="ia-stage-primary" to="/start-project">Start a project <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
          <div className="ia-stage-statline"><span>Independent by design.</span><span>Business-minded by nature.</span><span>Mobile-first in practice.</span></div>
        </div>
      </section>
      <section className="ia-services-directory">
        <div className="p-container">
          <div className="ia-section-caption"><span>01 / Services</span><span>Choose what you're looking for <ArrowRight size={16} aria-hidden="true" /></span></div>
          <div className="ia-service-cards">
            {services.map((service, index) => {
              const Icon = symbols[index];
              return (
                <article className="ia-service-card" key={service.slug}>
                  <div className="ia-service-card-top"><span>{service.number} / SERVICE</span><Icon size={27} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h2>{service.name}</h2>
                  <p>{service.intro}</p>
                  <div className="ia-service-card-bottom">
                    <span>{service.suitedFor}</span>
                    <Link to="/services/$slug" params={{slug:service.slug}} aria-label={`Explore ${service.name}`}>
                      Explore service <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="ia-4a-service-entry" aria-label="Practical next steps">
        <div className="p-container ia-4a-entry-grid">
          <article>
            <div className="ia-4a-entry-top"><span>Have an existing website?</span><SearchCheck size={27} aria-hidden="true"/></div>
            <h2>Let's find out<br/><em>what could be better.</em></h2>
            <p>Request a free initial review of your public website's design, mobile experience and customer journey.</p>
            <Link to="/free-website-audit">Request a free website audit <ArrowUpRight size={18} aria-hidden="true"/></Link>
          </article>
          <article>
            <div className="ia-4a-entry-top"><span>Already online?</span><Wrench size={27} aria-hidden="true"/></div>
            <h2>Keep your website<br/><em>well looked after.</em></h2>
            <p>Explore ongoing maintenance options for content updates, functional checks and practical website support.</p>
            <Link to="/website-maintenance">Explore website maintenance <ArrowUpRight size={18} aria-hidden="true"/></Link>
          </article>
        </div>
      </section>
      <section id="packages" className="p-section p-packages" aria-labelledby="services-packages-heading">
        <div className="p-container">
          <div className="p-section-heading">
            <div>
              <p className="p-label">02 / Ways to work together</p>
              <h2 id="services-packages-heading">A place to start.<br/><em>Built around your needs.</em></h2>
            </div>
            <p>These are starting points, not one-size-fits-all prices. The actual scope and quote are agreed after we discuss your business.</p>
          </div>
          <div className="p-package-grid">
            {packages.map((item) => (
              <article className={`p-package-card${"featured" in item && item.featured ? " is-featured" : ""}`} key={item.title}>
                <div className="p-package-top">
                  <span className="p-label">{item.tag}</span>
                  {"featured" in item && item.featured ? <span className="p-package-highlight"><Sparkles size={13} aria-hidden="true"/> Common starting point</span> : null}
                </div>
                <h3>{item.title}</h3>
                <p className="p-package-description">{item.description}</p>
                <p className="p-package-suitable">{item.suitable}</p>
                <div className="p-package-divider" aria-hidden="true"/>
                <ul>{item.items.map((feature) => <li key={feature}><Check size={17} aria-hidden="true"/><span>{feature}</span></li>)}</ul>
                <div className="p-package-bottom">
                  <span><BadgeCheck size={16} aria-hidden="true"/> Scope-based quote</span>
                  <Link to="/start-project" search={{service:item.service}}>Discuss this option <MoveUpRight size={17} aria-hidden="true"/></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="p-process-line"><Layers3 size={22} aria-hidden="true"/><p><strong>No surprises.</strong> Agree the brief, scope, revisions and support responsibilities before development begins.</p></div>
        </div>
      </section>
      <section id="process" className="ia-home-process p-section" aria-labelledby="services-process-heading">
        <div className="p-container">
          <div className="p-section-heading">
            <div><p className="p-label">03 / How I work</p><h2 id="services-process-heading">From first hello.<br/><em>To a thoughtful launch.</em></h2></div>
            <p>My process is designed to make the decisions clear and keep your project manageable.</p>
          </div>
          <div className="ia-process-grid">
            {projectProcess.map((step) => (
              <article key={step.number} className="ia-process-card">
                <span>{step.number} / STEP</span><h3>{step.title}</h3><p>{step.description}</p>
              </article>
            ))}
          </div>
          <div className="ia-process-bottom">
            <p>You review the agreed work before launch.</p>
            <Link to="/start-project" className="ia-text-action">Tell me your idea <ArrowRight size={18} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><span className="p-label">Not sure what you need?</span><h2>Start with the problem.<br /><em>We'll find the right solution.</em></h2></div>
          <Link to="/start-project" className="ia-stage-primary">Tell me your idea <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
