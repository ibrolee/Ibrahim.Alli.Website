import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  MoveUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
      {
        title: "Ibrahim Alli — Builder, Creator & Entrepreneur",
      },
      {
        name: "description",
        content:
          "The personal website of Ibrahim Alli. Explore my web development, digital projects, creative work and selected business ventures.",
      },
      {
        property: "og:title",
        content: "Ibrahim Alli — Builder, Creator & Entrepreneur",
      },
      {
        property: "og:description",
        content:
          "Web development, digital projects and creative work by Ibrahim Alli.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        property: "og:image",
        content: OG_IMAGE,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: "Ibrahim Alli — Builder. Creator. Entrepreneur.",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Ibrahim Alli — Builder, Creator & Entrepreneur",
      },
      {
        name: "twitter:description",
        content:
          "Web development, digital projects and creative work by Ibrahim Alli.",
      },
      {
        name: "twitter:image",
        content: OG_IMAGE,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: SITE_URL,
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-noise" aria-hidden="true" />

        <div className="hero-monogram" aria-hidden="true">
          IA
        </div>

        <div className="hero-content">
          <div className="hero-kicker">
            Personal portfolio
          </div>

          <div className="hero-wordmark" aria-label="Ibrahim Alli">
            <span>Ibrahim</span>
            <span>
              Alli<i>.</i>
            </span>
          </div>

          <div className="hero-bottom">
            <p className="hero-role">
              <span>Builder.</span>
              <span>Creator.</span>
              <span>Entrepreneur.</span>
            </p>

            <div className="hero-intro">
              <p>
                I build useful things across business, design and the digital
                world — from websites and e-commerce experiences to practical
                business systems.
              </p>

              <div className="hero-actions">
                <Button asChild size="lg">
                  <a href="#work">
                    Explore the work <ArrowRight />
                  </a>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link to="/about">
                    About Ibrahim <MoveUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <a href="#work" className="hero-scroll">
            <span>Scroll to explore</span>
            <ArrowDown />
          </a>
        </div>
      </section>

      <section id="work" className="work-section section">
        <div className="section-inner">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Selected work</p>

              <h2 className="section-title">
                Things I’ve
                <br />
                <em>built.</em>
              </h2>
            </div>

            <p className="heading-note">
              A few projects across business, e-commerce and creative product
              design.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card project-card-${index + 1}`}
                key={project.slug}
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="project-image-wrap"
                >
                  <img
                    src={project.image}
                    alt={`${project.name} project`}
                    className="project-image"
                  />

                  <span className="project-open">
                    <MoveUpRight />
                  </span>
                </Link>

                <div className="project-meta">
                  <span>PROJECT {project.number}</span>
                  <span>{project.type}</span>
                </div>

                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="project-name"
                >
                  {project.name}
                </Link>

                <p className="project-summary">{project.summary}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="web-development" className="build-section">
        <div className="build-orbit" aria-hidden="true">
          WEB
        </div>

        <div className="section-inner build-inner">
          <div>
            <p className="eyebrow light">Web development</p>

            <h2 className="build-title">
              I build
              <br />
              <em>websites too.</em>
            </h2>
          </div>

          <div className="build-copy">
            <p className="build-lead">
              Websites and digital tools built around real business needs.
            </p>

            <p>
              What started as improving my own businesses has grown into
              designing and building digital experiences for others. I focus
              on clear design, mobile-friendly layouts and functionality
              that makes everyday tasks easier.
            </p>

            <p
              style={{
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              What I can help you with
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0.85rem",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              {webServices.map((service) => (
                <article
                  key={service.number}
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "4px",
                    padding: "1.35rem",
                    background: "rgba(255,255,255,0.035)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      marginBottom: "1.2rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#d5f477",
                    }}
                  >
                    {service.number} / SERVICE
                  </span>

                  <h3
                    style={{
                      margin: "0 0 0.75rem",
                      color: "#ffffff",
                      fontSize: "1.25rem",
                      lineHeight: 1.25,
                      fontWeight: 600,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    {service.description}
                  </p>
                </article>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.65rem",
                  padding: "0.95rem 1.3rem",
                  background: "#d5f477",
                  color: "#171713",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                Discuss a project <ArrowRight size={17} />
              </a>

              <Link to="/about" className="text-link light-link">
                See my background <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section">
        <div className="section-inner contact-inner">
          <div className="contact-copy">
            <p className="eyebrow">Get in touch</p>

            <h2 className="section-title">
              Have something
              <br />
              <em>in mind?</em>
            </h2>

            <p>
              For a website, digital project, business idea or simply a
              conversation — get in touch.
            </p>
          </div>

          <div className="contact-actions" aria-label="Contact options">
            <a
              className="contact-button contact-button-email"
              href="mailto:alliibrahim3@gmail.com"
              aria-label="Email Ibrahim Alli"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>

              <span>Email me</span>

              <MoveUpRight size={18} aria-hidden="true" />
            </a>

            <a
              className="contact-button contact-button-whatsapp"
              href="https://wa.me/905488534011"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Ibrahim Alli on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.3A9 9 0 1 0 12 3Z" />
                <path d="M8.5 8.5c.3-.3.6-.3.8.1l1 1.8c.1.3.1.5-.2.8l-.6.6c.7 1.3 1.8 2.4 3.1 3.1l.6-.6c.3-.3.5-.3.8-.2l1.8 1c.4.2.4.5.1.8-.6.8-1.5 1.1-2.4.8-2.8-.8-5.2-3.2-6-6-.3-.9 0-1.8 1-2.2Z" />
              </svg>

              <span>Chat on WhatsApp</span>

              <MoveUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}