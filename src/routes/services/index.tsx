import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, LayoutGrid, MousePointerClick, Smartphone, Wrench } from "lucide-react";
import { services } from "@/lib/freelance-services";

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
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><span className="p-label">Not sure what you need?</span><h2>Start with the problem.<br /><em>We'll find the right solution.</em></h2></div>
          <Link to="/start-project" className="ia-stage-primary">Tell me your idea <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
