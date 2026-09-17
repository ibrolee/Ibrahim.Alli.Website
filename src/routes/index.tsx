import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ExternalLink, MoveUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/portfolio-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      { name: "description", content: "The personal website of Ibrahim Alli — a builder, creator and entrepreneur working across business, digital products and web development." },
      { property: "og:title", content: "Ibrahim Alli — Builder, Creator & Entrepreneur" },
      { property: "og:description", content: "Personal work, selected projects and web development by Ibrahim Alli." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [formNote, setFormNote] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setFormNote("Direct email has not been connected yet, so this form is not sending messages.");
  }

  return (
    <main>
      <section className="home-hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-monogram" aria-hidden="true">IA</div>
        <div className="hero-content">
          <div className="hero-kicker"><span>01</span> Personal website · 2026</div>
          <div className="hero-wordmark" aria-label="Ibrahim Alli">
            <span>Ibrahim</span>
            <span>Alli<i>.</i></span>
          </div>
          <div className="hero-bottom">
            <p className="hero-role">Builder.<br />Creator.<br />Entrepreneur.</p>
            <div className="hero-intro">
              <p>I build useful things across business, design and the digital world — from websites and e-commerce experiences to practical business systems.</p>
              <div className="hero-actions">
                <Button asChild size="lg"><a href="#work">Explore the work <ArrowRight /></a></Button>
                <Button asChild variant="outline" size="lg"><Link to="/about">About Ibrahim <MoveUpRight /></Link></Button>
              </div>
            </div>
          </div>
          <a href="#work" className="hero-scroll"><span>Scroll to explore</span><ArrowDown /></a>
        </div>
      </section>

      <section id="work" className="work-section section">
        <div className="section-inner">
          <div className="section-heading-row">
            <div><p className="eyebrow">02 / Selected work</p><h2 className="section-title">Things I’ve<br /><em>built.</em></h2></div>
            <p className="heading-note">A few projects across business, e-commerce and creative product design.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-card-${index + 1}`} key={project.slug}>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="project-image-wrap">
                  <img src={project.image} alt={`${project.name} project`} className="project-image" />
                  <span className="project-open"><MoveUpRight /></span>
                </Link>
                <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="project-name">{project.name}</Link>
                <p className="project-summary">{project.summary}</p>
                <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="web-development" className="build-section">
        <div className="build-orbit" aria-hidden="true">WEB</div>
        <div className="section-inner build-inner">
          <div><p className="eyebrow light">03 / Web development</p><h2 className="build-title">I build<br /><em>websites too.</em></h2></div>
          <div className="build-copy">
            <p className="build-lead">What started as learning how to improve my own businesses has grown into a real creative and technical skill.</p>
            <p>I design and build responsive websites, e-commerce experiences and digital systems for small businesses and personal brands. I care about how something looks, but also whether it actually works.</p>
            <Link to="/about" className="text-link light-link">See my background <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section">
        <div className="section-inner contact-inner">
          <div className="contact-copy"><p className="eyebrow">04 / Contact</p><h2 className="section-title">Have something<br /><em>in mind?</em></h2><p>For a website, digital project, business idea or simply a conversation — get in touch.</p><a className="email-placeholder" href="mailto:">Email Ibrahim <ExternalLink /></a></div>
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about it..." /></label>
            <div><Button type="submit" size="lg">Send message <ArrowRight /></Button>{formNote && <p role="status" className="form-note">{formNote}</p>}</div>
          </form>
        </div>
      </section>
    </main>
  );
}
