import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ExternalLink, MoveUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { projects } from "@/lib/portfolio-content";

const SITE_URL = "https://ibrahimalli.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

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
        content:
          "Ibrahim Alli — Builder. Creator. Entrepreneur.",
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
            <span>01</span> Personal website · 2026
          </div>

          <div className="hero-wordmark" aria-label="Ibrahim Alli">
            <span>Ibrahim</span>
            <span>
              Alli<i>.</i>
            </span>
          </div>

          <div className="hero-bottom">
            <p className="hero-role">
              Builder.
              <br />
              Creator.
              <br />
              Entrepreneur.
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
              <p className="eyebrow">02 / Selected work</p>
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
                  <span>{project.number}</span>
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
            <p className="eyebrow light">03 / Web development</p>
            <h2 className="build-title">
              I build
              <br />
              <em>websites too.</em>
            </h2>
          </div>

          <div className="build-copy">
            <p className="build-lead">
              What started as learning how to improve my own businesses has
              grown into a real creative and technical skill.
            </p>

            <p>
              I design and build responsive websites, e-commerce experiences
              and digital systems for small businesses and personal brands. I
              care about how something looks, but also whether it actually
              works.
            </p>

            <Link to="/about" className="text-link light-link">
              See my background <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section">
        <div className="section-inner contact-inner">
          <div className="contact-copy">
            <p className="eyebrow">04 / Contact</p>

            <h2 className="section-title">
              Have something
              <br />
              <em>in mind?</em>
            </h2>

            <p>
              For a website, digital project, business idea or simply a
              conversation — get in touch.
            </p>

            <a
              className="email-placeholder"
              href="mailto:alliibrahim3@gmail.com"
            >
              alliibrahim3@gmail.com <ExternalLink />
            </a>
          </div>

          <div className="contact-actions" aria-label="Contact options">
            <a
              className="contact-icon-link"
              href="mailto:alliibrahim3@gmail.com"
              aria-label="Email Ibrahim Alli"
              title="Email Ibrahim Alli"
            >
              <svg
                className="brand-icon gmail-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m4.5 6 7.5 6 7.5-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.5 18V6m15 12V6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              className="contact-icon-link"
              href="https://wa.me/905488534011"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp Ibrahim Alli"
              title="WhatsApp Ibrahim Alli"
            >
              <svg
                className="brand-icon whatsapp-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 3.25a8.75 8.75 0 0 0-7.5 13.27L3.25 21l4.62-1.2A8.75 8.75 0 1 0 12 3.25Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M9.15 8.2c-.25-.55-.52-.57-.76-.58h-.65c-.23 0-.6.09-.91.43-.31.34-1.18 1.15-1.18 2.8s1.21 3.25 1.38 3.47c.17.22 2.34 3.75 5.79 5.1 2.86 1.12 3.45.9 4.07.84.62-.06 2-.81 2.28-1.6.28-.79.28-1.46.2-1.6-.08-.14-.31-.22-.65-.39-.34-.17-2-.99-2.31-1.1-.31-.11-.53-.17-.76.17-.23.34-.87 1.1-1.06 1.32-.2.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.68-1.01-.9-1.69-2-1.89-2.34-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.22-.34.34-.56.11-.22.06-.42-.03-.59-.08-.17-.73-1.81-1.02-2.48Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}