import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MoveUpRight, Mail, MessageCircle } from "lucide-react";

import { projects } from "@/lib/portfolio-content";

const SITE_URL = "https://ibrahimalli.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const webServices = [
  {
    number: "01",
    title: "Business websites",
    description:
      "Professional, mobile-friendly websites that help businesses and personal brands present themselves clearly and make it easy for customers to get in touch.",
  },
  {
    number: "02",
    title: "E-commerce stores",
    description:
      "Online storefronts with organised product listings, shopping carts and straightforward checkout experiences designed around the customer journey.",
  },
  {
    number: "03",
    title: "Business systems",
    description:
      "Practical digital tools for everyday operations, including membership management, staff portals and QR-based check-in systems.",
  },
  {
    number: "04",
    title: "Website improvements",
    description:
      "Updates and redesigns that improve an existing website’s appearance, mobile experience, content structure and ease of use.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      {
        name: "description",
        content:
          "The personal website of Ibrahim Alli. Explore my web development, digital projects, creative work and selected business ventures.",
      },
      { property: "og:title", content: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      {
        property: "og:description",
        content: "Web development, digital projects and creative work by Ibrahim Alli.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ibrahim Alli — Builder. Creator. Entrepreneur." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      {
        name: "twitter:description",
        content: "Web development, digital projects and creative work by Ibrahim Alli.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

function Home() {
  const featured = projects.find((project) => project.slug === "jis-beauty-fashion");
  return (
    <main id="main-content" className="premium-home">
      <section className="p-hero" aria-labelledby="hero-heading">
        <div className="p-container">
          <div className="p-hero-top">
            <span className="p-label">Ibrahim Alli · Independent creative</span>
            <span className="p-label">Nigeria / North Cyprus</span>
          </div>
          <div className="p-hero-grid">
            <div className="p-hero-copy">
              <p className="p-overline">Builder. Creator. Entrepreneur.</p>
              <h1 id="hero-heading">
                Ideas with
                <br />
                purpose.
                <br />
                <em>Made digital.</em>
              </h1>
              <p className="p-hero-description">
                I design and build websites, online stores and practical systems that bring
                businesses to life.
              </p>
              <div className="p-actions">
                <a className="p-button" href="#work">
                  Explore my work <MoveUpRight size={18} />
                </a>
                <Link className="p-subtle-link" to="/about">
                  About me <ArrowRight size={17} />
                </Link>
              </div>
            </div>
            <div className="p-hero-visual">
              {featured && (
                <Link
                  to="/projects/$slug"
                  params={{ slug: featured.slug }}
                  className="p-featured"
                  aria-label="Explore JIS Beauty & Fashion"
                >
                  <div className="p-featured-image">
                    <img
                      src={featured.image}
                      alt="JIS Beauty & Fashion digital storefront project presentation"
                      width={1600}
                      height={1000}
                      fetchPriority="high"
                    />
                  </div>
                  <div className="p-featured-caption">
                    <span>
                      <small>Selected project / 02</small>JIS Beauty & Fashion
                    </span>
                    <span className="p-circle">
                      <MoveUpRight size={21} />
                    </span>
                  </div>
                </Link>
              )}
              <div className="p-visual-note">
                <span className="p-spark" aria-hidden="true">
                  ✳
                </span>
                <p>
                  Good design is how it looks.
                  <br />
                  <span>Great work is how it works.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-hero-bottom">
            <span>Design-led. Business-minded.</span>
            <a href="#work">
              Discover the work <ArrowDown size={15} />
            </a>
            <span>Portfolio — 2026</span>
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
              Web design <i>✳</i> E-commerce <i>✳</i> Digital systems <i>✳</i> Creative thinking{" "}
              <i>✳</i>
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
                  <img
                    src={project.image}
                    alt={`${project.name} project presentation`}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1000}
                  />
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
              What started as improving my own businesses has grown into building for others. Clear
              design, thoughtful details and useful functionality.
            </p>
          </div>
          <div className="p-service-list">
            {webServices.map((service) => (
              <article className="p-service p-reveal" key={service.number}>
                <span className="p-label">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a
                  href="#contact"
                  aria-label={`Discuss ${service.title.toLowerCase()}`}
                  className="p-circle"
                >
                  <MoveUpRight size={22} />
                </a>
              </article>
            ))}
          </div>
          <div className="p-services-bottom">
            <p>From a first website to a better way of working.</p>
            <a href="#contact" className="p-subtle-link">
              Discuss your project <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section id="contact" className="p-section p-contact" aria-labelledby="contact-heading">
        <div className="p-container">
          <div className="p-contact-top p-reveal">
            <p className="p-label">04 / Start a conversation</p>
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
                A business website. An online store. A system that makes the day easier. Tell me
                what you’re thinking, and let’s explore what it could become.
              </p>
              <a
                className="p-contact-link"
                href="mailto:alliibrahim3@gmail.com?subject=Project%20enquiry"
              >
                <Mail size={20} />
                <span>
                  Email me<small>alliibrahim3@gmail.com</small>
                </span>
                <MoveUpRight size={20} />
              </a>
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
