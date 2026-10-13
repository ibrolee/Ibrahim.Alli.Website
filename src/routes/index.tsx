import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MoveUpRight, MessageCircle, Monitor, Smartphone, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-content";
import { JisProjectVisual } from "@/components/jis-project-visual";
import { services } from "@/lib/freelance-services";

const SITE_URL = "https://ibrahimalli.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — Web Designer, Developer & Creative" },
      { name: "description", content: "Ibrahim Alli designs mobile-friendly business websites, e-commerce experiences and useful digital systems. Explore real work, services and how to get in touch." },
      { property: "og:title", content: "Ibrahim Alli — Web Designer, Developer & Creative" },
      { property: "og:description", content: "Real business websites, e-commerce and useful digital systems by Ibrahim Alli." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ibrahim Alli — Web Design & Digital Projects" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ibrahim Alli — Web Designer, Developer & Creative" },
      { name: "twitter:description", content: "Websites, digital systems and photography by Ibrahim Alli." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="main-content" className="premium-home ia-home-condensed">
      <section className="p-hero" aria-labelledby="hero-heading">
        <div className="p-container">
          <div className="p-hero-top">
            <span className="p-label">IBRAHIM ALLI / INDEPENDENT CREATIVE</span>
            <span className="p-label">NIGERIA · NORTH CYPRUS</span>
          </div>
          <div className="p-hero-grid">
            <div className="p-hero-copy">
              <p className="p-overline">Independent web designer · Digital builder</p>
              <h1 id="hero-heading">
                I build websites<br />
                for real people.<br />
                <em>And real businesses.</em>
              </h1>
              <p className="p-hero-description">
                I design considered, mobile-friendly websites, online stores and useful digital systems. Built with the business in mind, not just the screen.
              </p>
              <div className="p-actions">
                <Link className="p-button" to="/about">About me <MoveUpRight size={18} /></Link>
                <a className="p-subtle-link" href="#work">Explore my work <ArrowRight size={18} /></a>
              </div>
              <Link className="p-hero-client-cta" to="/start-project">
                <span className="p-client-availability"><span aria-hidden="true" /> Available for select website projects</span>
                <strong>Have a project? Tell me about it <MoveUpRight size={16} aria-hidden="true" /></strong>
              </Link>
            </div>
            <div className="p-hero-visual">
              <a
                className="p-service-showcase"
                href="/services"
                aria-label="Explore website and mobile app services"
              >
                <div className="p-showcase-top">
                  <span>Web &amp; app development</span>
                  <span className="p-showcase-mark" aria-hidden="true">ia<span>.</span></span>
                </div>
                <h2>Your business.<br /><em>On every screen.</em></h2>
                <div className="p-showcase-platforms">
                  <div className="p-showcase-web">
                    <Monitor size={39} aria-hidden="true" strokeWidth={1.6} />
                    <strong>Websites</strong>
                    <span>Business &amp; e-commerce</span>
                  </div>
                  <div className="p-showcase-app">
                    <Smartphone size={39} aria-hidden="true" strokeWidth={1.6} />
                    <strong>Mobile apps</strong>
                    <span>Android &amp; iOS</span>
                  </div>
                </div>
                <div className="p-showcase-bottom">
                  <span>From idea to launch</span>
                  <span className="p-showcase-link">
                    Explore services <MoveUpRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div className="p-hero-bottom">
            <span>Design led. Business minded.</span>
            <a href="#work">Scroll to discover <ArrowDown size={18} /></a>
            <span>PORTFOLIO — 2026</span>
          </div>
        </div>
      </section>
      <section id="work" className="p-section p-work" aria-labelledby="work-heading">
        <div className="p-container">
          <div className="p-section-heading p-reveal">
            <div>
              <p className="p-label">01 / Selected work</p>
              <h2 id="work-heading">
                Built with intention.
                <br />
                <em>Made for real life.</em>
              </h2>
            </div>
            <p>
              Websites and digital experiences shaped around the people and businesses that use
              them.
            </p>
          </div>
          <div className="p-projects">
            {projects.map((project) => (
              <article className="p-project p-reveal" key={project.slug}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="p-project-image"
                  aria-label={`View ${project.name} case study`}
                >
                  {project.slug === "jis-beauty-fashion" ? (
                    <JisProjectVisual className="jis-portfolio-fill" />
                  ) : (
                    <img
                      src={project.image}
                      alt={`${project.name} project presentation`}
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={1000}
                    />
                  )}
                  <span className="p-project-view">
                    View case study <MoveUpRight size={17} />
                  </span>
                </Link>
                <div className="p-project-body">
                  <div className="p-project-index">
                    <span>/{project.number}</span>
                    <span>{project.type}</span>
                  </div>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="p-project-title"
                  >
                    {project.name}
                    <MoveUpRight aria-hidden="true" />
                  </Link>
                  <p>{project.summary}</p>
                  <div className="p-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="ia-home-swipe-cue">Swipe sideways to view both projects →</p>
          <div className="ia-home-work-links">
            <Link to="/work" className="ia-home-work-main">Explore detailed project work <ArrowRight size={17} aria-hidden="true"/></Link>
            <a href="/Ibrahim-Alli-Portfolio-2026.pdf" download className="ia-home-work-pdf">Download my portfolio <ArrowRight size={17} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
      <section id="web-development" className="ia-home-service-teaser" aria-labelledby="home-services-heading">
        <div className="p-container ia-home-service-inner">
          <div className="ia-home-service-intro">
            <p className="p-label">02 / Services</p>
            <h2 id="home-services-heading">Your next idea.<br/><em>Let's build it well.</em></h2>
            <p>From a first website to a better way of working — choose what fits your project.</p>
            <Link to="/services" className="ia-home-service-link">See services, packages & how I work <ArrowRight size={18} aria-hidden="true"/></Link>
          </div>
          <div className="ia-home-service-list">
            {services.map((service) => (
              <Link to="/services/$slug" params={{slug:service.slug}} key={service.slug}>
                <span>{service.number}</span>
                <strong>{service.name}</strong>
                <ArrowUpRight size={20} aria-hidden="true"/>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="ia-home-contact" aria-labelledby="home-contact-heading">
        <div className="p-container ia-home-contact-inner">
          <div>
            <p className="p-label">03 / Let's talk</p>
            <h2 id="home-contact-heading">Have something in mind?<br/><em>Let's make it happen.</em></h2>
            <p>Tell me what you're building. We can discuss the right scope before any quote.</p>
          </div>
          <div className="ia-home-contact-actions">
            <Link to="/start-project" className="ia-home-contact-primary">Start a project <ArrowUpRight size={19} aria-hidden="true"/></Link>
            <a href="https://wa.me/905488534011?text=Hi%20Ibrahim%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true"/> WhatsApp me <ArrowRight size={17} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
    </main>
  );
}
