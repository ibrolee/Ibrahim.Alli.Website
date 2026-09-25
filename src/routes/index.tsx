import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MoveUpRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/portfolio-content";

const SITE_URL = "https://ibrahimalli.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const webServices = [
  { number: "01", title: "Business websites", description: "Professional, mobile-friendly websites that help businesses and personal brands present themselves clearly and make it easy for customers to get in touch." },
  { number: "02", title: "E-commerce stores", description: "Online storefronts with organised product listings, shopping carts and straightforward checkout experiences designed around the customer journey." },
  { number: "03", title: "Business systems", description: "Practical digital tools for everyday operations, including membership management, staff portals and QR-based check-in systems." },
  { number: "04", title: "Website improvements", description: "Updates and redesigns that improve an existing website’s appearance, mobile experience, content structure and ease of use." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      { name: "description", content: "The personal website of Ibrahim Alli. Explore my web development, digital projects, creative work and selected business ventures." },
      { property: "og:title", content: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      { property: "og:description", content: "Web development, digital projects and creative work by Ibrahim Alli." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ibrahim Alli — Builder. Creator. Entrepreneur." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      { name: "twitter:description", content: "Web development, digital projects and creative work by Ibrahim Alli." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="home-hero" style={{ minHeight: "100svh", alignItems: "stretch", paddingBottom: "clamp(2rem, 5vw, 4rem)", background: "radial-gradient(ellipse at 92% 15%, rgba(213,244,119,.075), transparent 43%), var(--ink)" }}>
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-monogram" aria-hidden="true" style={{ opacity: 0.5 }}>IA</div>
        <div className="hero-content" style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(2rem, 5vw, 5rem)" }}>
          <div className="hero-kicker" style={{ justifyContent: "space-between", width: "100%", maxWidth: "1100px", borderBottom: "1px solid rgba(245,242,231,.18)", paddingBottom: "1rem", marginBottom: "clamp(2.5rem, 6vw, 6rem)" }}>
            <span style={{ color: "var(--accent)" }}>PERSONAL PORTFOLIO</span>
            <span style={{ color: "rgba(245,242,231,.6)" }}>DESIGN · DIGITAL · BUSINESS</span>
          </div>
          <h1 className="hero-wordmark" aria-label="Ibrahim Alli" style={{ display: "flex", flexDirection: "column", fontWeight: 400, fontSize: "clamp(4.5rem, 13.2vw, 12.8rem)", lineHeight: 0.81, letterSpacing: "-0.065em", maxWidth: "100%", margin: 0 }}>
            <span style={{ display: "block", paddingLeft: 0, color: "var(--paper)" }}>Ibrahim</span>
            <span style={{ display: "block", paddingLeft: "clamp(1.25rem, 13vw, 12rem)", color: "var(--paper)", fontStyle: "normal", letterSpacing: "-0.065em" }}>Alli</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "clamp(2.5rem, 5vw, 5rem)", paddingTop: "1.25rem", borderTop: "1px solid rgba(245,242,231,.2)" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(1.45rem, 3vw, 2.8rem)", lineHeight: 1.05, color: "var(--accent)" }}>I turn ideas into digital experiences.</p>
            <span style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(245,242,231,.55)" }}>INDEPENDENT CREATIVE PORTFOLIO</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: "2rem", marginTop: "clamp(2rem, 4vw, 3.5rem)" }}>
            <div style={{ maxWidth: "510px" }}>
              <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.7, color: "rgba(245,242,231,.72)", margin: 0 }}>Builder. Creator. Entrepreneur. I create websites, e-commerce experiences and practical business systems that bring ideas to life.</p>
              <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
                <Button asChild size="lg"><a href="#work">Explore my work <ArrowRight /></a></Button>
                <Button asChild variant="outline" size="lg"><Link to="/about">About me <ArrowRight /></Link></Button>
                <Button asChild variant="outline" size="lg"><a href="#contact" style={{ border: "1px solid rgba(245,242,231,.45)", color: "var(--paper)", background: "transparent" }}>Start a project <MoveUpRight /></a></Button>
              </div>
            </div>
            <a href="#work" className="hero-scroll" style={{ marginTop: 0, paddingBottom: ".5rem" }}><span>Scroll to explore</span><ArrowDown /></a>
          </div>
        </div>
      </section>

      <section id="work" className="work-section section" aria-labelledby="work-heading">
        <div className="section-inner">
          <div className="section-heading-row">
            <div><p className="eyebrow">Selected work / 01—02</p><h2 id="work-heading" className="section-title">Things I’ve<br /><em>built.</em></h2></div>
            <p className="heading-note">A closer look at the websites and practical digital experiences I’m building for real businesses.</p>
          </div>
          <div className="project-grid" style={{ alignItems: "start" }}>
            {projects.map((project, index) => (
              <article className={`project-card project-card-${index + 1}`} key={project.slug} style={{ minWidth: 0 }}>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="project-image-wrap" aria-label={`Explore ${project.name} case study`} style={{ isolation: "isolate", border: "1px solid var(--border)", borderRadius: "3px" }}>
                  <img src={project.image} alt={`${project.name} project preview`} width={1600} height={1000} loading="lazy" decoding="async" className="project-image" style={{ aspectRatio: "16 / 10", objectFit: "cover" }} />
                  <span className="project-open" aria-hidden="true"><MoveUpRight /></span>
                  <span aria-hidden="true" style={{ position: "absolute", left: "clamp(.75rem, 2vw, 1.5rem)", bottom: "clamp(.75rem, 2vw, 1.5rem)", display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".65rem .85rem", background: "var(--ink)", color: "var(--paper)", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", boxShadow: "0 5px 20px rgba(0,0,0,.18)" }}>View case study <ArrowRight size={14} /></span>
                </Link>
                <div className="project-meta" style={{ paddingTop: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: ".85rem", flexWrap: "wrap", alignItems: "baseline", rowGap: ".5rem" }}><span>PROJECT {project.number} / LIVE BUSINESS</span><span>{project.type}</span></div>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="project-name" style={{ marginTop: "1.2rem", overflowWrap: "break-word", display: "inline-block", lineHeight: ".98" }}>{project.name} <MoveUpRight size={22} style={{ display: "inline", verticalAlign: "middle", marginLeft: ".15em" }} aria-hidden="true" /></Link>
                <p className="project-summary" style={{ marginTop: "1rem", maxWidth: "36rem" }}>{project.summary}</p>
                <div className="project-tags" style={{ marginTop: "1.4rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="text-link" style={{ marginTop: "1.5rem", color: "var(--foreground)" }}>Explore the project <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="web-development" className="build-section">
        <div className="build-orbit" aria-hidden="true">WEB</div>
        <div className="section-inner build-inner">
          <div><p className="eyebrow light">Web development</p><h2 className="build-title">I build<br /><em>websites too.</em></h2></div>
          <div className="build-copy">
            <p className="build-lead">Websites and digital tools built around real business needs.</p>
            <p>What started as improving my own businesses has grown into designing and building digital experiences for others. I focus on clear design, mobile-friendly layouts and functionality that makes everyday tasks easier.</p>
            <p style={{ marginTop: "1.5rem", marginBottom: "0.75rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7 }}>What I can help you with</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem", marginTop: "1rem", marginBottom: "2rem" }}>
              {webServices.map((service) => (
                <article key={service.number} style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", padding: "1.35rem", background: "rgba(255,255,255,0.035)" }}>
                  <span style={{ display: "block", marginBottom: "1.2rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", color: "#d5f477" }}>{service.number} / SERVICE</span>
                  <h3 style={{ margin: "0 0 0.75rem", color: "#ffffff", fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 600 }}>{service.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>{service.description}</p>
                </article>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem" }}>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", padding: "0.95rem 1.3rem", background: "#d5f477", color: "#171713", textDecoration: "none", fontSize: "0.9rem", fontWeight: 700 }}>Discuss a project <ArrowRight size={17} /></a>
              <Link to="/about" className="text-link light-link">See my background <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section" aria-labelledby="contact-heading">
        <div className="section-inner contact-inner" style={{ alignItems: "start", gap: "clamp(2rem, 5vw, 5rem)" }}>
          <div className="contact-copy" style={{ minWidth: 0 }}>
            <p className="eyebrow">Get in touch / Start a conversation</p>
            <h2 id="contact-heading" className="section-title" style={{ overflowWrap: "break-word" }}>Have something<br /><em>in mind?</em></h2>
            <p style={{ maxWidth: "36rem", lineHeight: 1.75 }}>Need a business website, an online store, a practical digital system or improvements to an existing site? Tell me what you have in mind and what you’d like it to achieve.</p>
            <p style={{ marginTop: "1.25rem", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".13em", textTransform: "uppercase", opacity: .7 }}>Websites · E-commerce · Business systems · Redesigns</p>
          </div>
          <div className="contact-actions" aria-label="Choose how to contact Ibrahim" style={{ width: "100%", minWidth: 0, display: "flex", flexDirection: "column", gap: ".85rem" }}>
            <p style={{ margin: "0 0 .4rem", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", opacity: .7 }}>Choose how to reach me</p>
            <a className="contact-button contact-button-email" href="mailto:alliibrahim3@gmail.com?subject=Project%20enquiry%20%E2%80%94%20Ibrahim%20Alli" aria-label="Email Ibrahim Alli about a project" style={{ width: "100%", minWidth: 0, display: "flex", alignItems: "center", gap: "1rem", padding: "clamp(1rem, 2vw, 1.5rem)" }}>
              <Mail size={23} strokeWidth={1.7} aria-hidden="true" />
              <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>Email me <small style={{ display: "block", marginTop: ".35rem", fontSize: ".75rem", fontWeight: 400, opacity: .75, overflowWrap: "anywhere" }}>alliibrahim3@gmail.com</small></span><MoveUpRight size={19} aria-hidden="true" />
            </a>
            <a className="contact-button contact-button-whatsapp" href="https://wa.me/905488534011?text=Hi%20Ibrahim%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp conversation with Ibrahim Alli about a project" style={{ width: "100%", minWidth: 0, display: "flex", alignItems: "center", gap: "1rem", padding: "clamp(1rem, 2vw, 1.5rem)" }}>
              <MessageCircle size={23} strokeWidth={1.7} aria-hidden="true" />
              <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>Chat on WhatsApp <small style={{ display: "block", marginTop: ".35rem", fontSize: ".75rem", fontWeight: 400, opacity: .75 }}>Start a conversation</small></span><MoveUpRight size={19} aria-hidden="true" />
            </a>
            <p style={{ margin: ".5rem 0 0", fontSize: ".85rem", lineHeight: 1.6, opacity: .7 }}>A short description of your idea is a great place to start.</p>
          </div>
        </div>
      </section>
    </main>
  );
}