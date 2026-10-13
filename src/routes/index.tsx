import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MoveUpRight, Mail, MessageCircle, Monitor, Smartphone, Check, Sparkles, Layers3, BadgeCheck } from "lucide-react";

import { projects } from "@/lib/portfolio-content";
import { JisProjectVisual } from "@/components/jis-project-visual";
import { projectFaqs, projectProcess } from "@/lib/freelance-services";
import { PortfolioProof } from "@/components/portfolio-proof";
import { VerifiedFeedbackSection } from "@/components/verified-feedback";

const SITE_URL = "https://ibrahimalli.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const packages = [
  {
    tag: "01 / Launch",
    title: "Essential",
    description: "A confident online home for a business, professional or personal brand.",
    suitable: "Best for a new business or simple portfolio",
    items: ["A focused, mobile-first website", "Clear services and contact journey", "Basic search visibility and launch guidance"],
    enquiry: "Essential website project enquiry",
  },
  {
    tag: "02 / Grow",
    title: "Business",
    description: "A more complete experience for a growing business with richer content and customer journeys.",
    suitable: "Best for established businesses ready to grow",
    items: ["Custom multi-page design", "Service or product presentation", "Conversion-focused enquiries and responsive refinement"],
    enquiry: "Business website project enquiry",
    featured: true,
  },
  {
    tag: "03 / Build",
    title: "Custom",
    description: "Digital tools, stores and workflows built around how your business actually operates.",
    suitable: "Best for e-commerce and tailored digital systems",
    items: ["Discovery and workflow planning", "Custom features, integrations or member tools", "Testing, handover and support scope"],
    enquiry: "Custom digital project enquiry",
  },
] as const;

const webServices = [
  {
    number: "01",
    slug: "business-websites",
    title: "Business websites",
    description:
      "Professional, mobile-friendly websites that help businesses and personal brands present themselves clearly and make it easy for customers to get in touch.",
  },
  {
    number: "02",
    slug: "e-commerce",
    title: "E-commerce stores",
    description:
      "Online storefronts with organised product listings, shopping carts and straightforward checkout experiences designed around the customer journey.",
  },
  {
    number: "03",
    slug: "mobile-apps",
    title: "Mobile apps",
    description:
      "Custom Android and iOS apps that bring your business closer to customers, with intuitive design and features built around their needs. From development and testing to submission support for Google Play and the Apple App Store.",
  },
  {
    number: "04",
    slug: "business-systems",
    title: "Business systems",
    description:
      "Practical digital tools for everyday operations, including membership management, staff portals and QR-based check-in systems.",
  },
  {
    number: "05",
    slug: "website-redesign",
    title: "Website improvements",
    description:
      "Updates and redesigns that improve an existing website’s appearance, mobile experience, content structure and ease of use.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — Web Designer, Developer & Creative" },
      {
        name: "description",
        content:
          "Ibrahim Alli designs mobile-friendly business websites, e-commerce experiences and practical digital systems. Explore real projects and enquire about a website.",
      },
      { property: "og:title", content: "Ibrahim Alli — Web Designer, Developer & Creative" },
      {
        property: "og:description",
        content: "Real business websites, e-commerce and useful digital systems by Ibrahim Alli.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ibrahim Alli — Web Design & Digital Projects" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ibrahim Alli — Web Designer, Developer & Creative" },
      {
        name: "twitter:description",
        content: "Websites, digital systems and photography by Ibrahim Alli.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="main-content" className="premium-home">
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
                href="#web-development"
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
      <div
        className="p-disciplines"
        aria-label="Web design, e-commerce, digital systems and creative thinking"
      >
        <div aria-hidden="true">
          {[0, 1].map((i) => (
            <span className="p-ticker-group" key={i}>
              Web design <i>✳</i> E-commerce <i>✳</i> Digital systems <i>✳</i> Photography{" "}
              <i>✳</i> Creative thinking <i>✳</i>
            </span>
          ))}
        </div>
      </div>
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
        </div>
      </section>
      <section className="p-about p-section">
        <div className="p-container p-about-grid">
          <div className="p-reveal">
            <p className="p-label">02 / Behind the work</p>
            <div className="p-about-mark" aria-hidden="true">
              ia<span>✳</span>
            </div>
            <p className="p-label">A curious mind. A practical approach.</p>
          </div>
          <div className="p-reveal">
            <h2>
              Different experiences.
              <br />
              <em>A wider perspective.</em>
            </h2>
            <p>
              My path has taken me through communication, construction, hospitality and business
              operations. Today, I bring that perspective to websites and digital tools built around
              real needs.
            </p>
            <p>
              I care about how things look, how they work and how they make everyday life a little
              easier.
            </p>
            <Link to="/about" className="p-subtle-link">
              Meet the person behind the projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section
        id="web-development"
        className="p-section p-services"
        aria-labelledby="services-heading"
      >
        <div className="p-container">
          <div className="p-section-heading p-reveal">
            <div>
              <p className="p-label">03 / What I do</p>
              <h2 id="services-heading">
                Your next idea.
                <br />
                <em>Let’s build it well.</em>
              </h2>
            </div>
            <p>
              I focus on what a business needs visitors to understand and do — from the first impression
              to the final enquiry. Every project starts with a clear brief.
            </p>
          </div>
          <div className="p-service-list">
            {webServices.map((service) => (
              <article className="p-service p-reveal" key={service.number}>
                <span className="p-label">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  aria-label={`Explore ${service.title.toLowerCase()}`}
                  className="p-circle"
                >
                  <MoveUpRight size={22} />
                </Link>
              </article>
            ))}
          </div>
          <div className="p-services-bottom">
            <p>From a first website to a better way of working.</p>
            <Link to="/services" className="p-subtle-link">
              Explore all services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section id="packages" className="p-section p-packages" aria-labelledby="packages-heading">
        <div className="p-container">
          <div className="p-section-heading p-reveal">
            <div>
              <p className="p-label">04 / Ways to work together</p>
              <h2 id="packages-heading">The right starting point.<br /><em>Built around your needs.</em></h2>
            </div>
            <p>Three clear starting points. Final scope, price and timeline are agreed after we discuss your project, so you only pay for what you actually need.</p>
          </div>
          <div className="p-package-grid">
            {packages.map((item) => (
              <article className={`p-package-card${"featured" in item && item.featured ? " is-featured" : ""}`} key={item.title}>
                <div className="p-package-top">
                  <span className="p-label">{item.tag}</span>
                  {"featured" in item && item.featured ? <span className="p-package-highlight"><Sparkles size={13} aria-hidden="true" /> Popular starting point</span> : null}
                </div>
                <h3>{item.title}</h3>
                <p className="p-package-description">{item.description}</p>
                <p className="p-package-suitable">{item.suitable}</p>
                <div className="p-package-divider" aria-hidden="true" />
                <ul>
                  {item.items.map((feature) => <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>)}
                </ul>
                <div className="p-package-bottom">
                  <span><BadgeCheck size={16} aria-hidden="true" /> Scope-based quote</span>
                  <Link to="/start-project" search={{ service: item.title === "Custom" ? "business-systems" : "business-websites" }}>Enquire about this <MoveUpRight size={17} aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="p-process-line">
            <Layers3 size={22} aria-hidden="true" />
            <p><strong>Simple process.</strong> Brief conversation → clear proposal → design &amp; build → review → launch. No surprise add-ons without approval.</p>
          </div>
        </div>
      </section>
      <PortfolioProof />
      <VerifiedFeedbackSection />
      <section id="process" className="ia-home-process p-section" aria-labelledby="process-heading">
        <div className="p-container">
          <div className="p-section-heading">
            <div>
              <p className="p-label">05 / The process</p>
              <h2 id="process-heading">A clear way forward.<br /><em>From hello to launch.</em></h2>
            </div>
            <p>A good result starts with a good conversation. Here is how a typical project moves forward, with the scope agreed before the work begins.</p>
          </div>
          <div className="ia-process-grid">
            {projectProcess.map((step) => (
              <article key={step.number} className="ia-process-card">
                <span>{step.number} / STEP</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <div className="ia-process-bottom">
            <p>You'll see what you're approving at each step. No surprise add-ons.</p>
            <Link to="/start-project" className="ia-text-action">Start with your idea <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section id="frequently-asked-questions" className="ia-home-faq p-section" aria-labelledby="faq-heading">
        <div className="p-container ia-faq-grid">
          <div>
            <p className="p-label">06 / Good to know</p>
            <h2 id="faq-heading">Questions?<br /><em>I've got answers.</em></h2>
            <p>Here's what clients often want to know about scope, pricing, launch and ongoing support.</p>
            <Link to="/start-project" className="ia-text-action">Ask about your project <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="ia-faq-list">
            {projectFaqs.map((item,index) => (
              <details key={item.question} className="ia-faq-item">
                <summary><span>0{index+1}</span><strong>{item.question}</strong><span className="ia-faq-sign" aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="p-section p-contact" aria-labelledby="contact-heading">
        <div className="p-container">
          <div className="p-contact-top p-reveal">
            <p className="p-label">07 / Start a conversation</p>
            <span className="p-label">Something in mind?</span>
          </div>
          <div className="p-contact-grid p-reveal">
            <h2 id="contact-heading">
              Let’s make
              <br />
              <em>it happen.</em>
            </h2>
            <div>
              <p>
                Tell me a little about your business, what you need and when you want to launch.
                I’ll suggest a practical scope before we discuss the final quote.
              </p>
              <Link
                className="p-contact-link"
                to="/start-project"
              >
                <Mail size={20} />
                <span>
                  Start a project<small>Tell me about your idea in a short form.</small>
                </span>
                <MoveUpRight size={20} />
              </Link>
              <a
                className="p-contact-link"
                href="https://wa.me/905488534011?text=Hi%20Ibrahim%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                <span>
                  Chat on WhatsApp<small>A simple hello is a good start.</small>
                </span>
                <MoveUpRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
