import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  Gamepad2,
  Layers3,
  Sparkles,
} from "lucide-react";
import css from "../hub.css?url";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — My Hub" },
      {
        name: "description",
        content:
          "One place for Ibrahim Alli's portfolio, fragrance collection, gaming library and selected creative projects.",
      },
      { property: "og:title", content: "Ibrahim Alli — My Hub" },
      {
        property: "og:description",
        content: "Explore my work, interests and selected projects in one place.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ibrahimalli.com/hub" },
      { name: "theme-color", content: "#11120f" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: css },
      { rel: "canonical", href: "https://ibrahimalli.com/hub" },
    ],
  }),
  component: HubPage,
});

const destinations = [
  {
    number: "01",
    label: "Portfolio",
    title: "Ideas made real.",
    description:
      "A closer look at my digital work, website builds, creative thinking and the projects behind the screens.",
    href: "/#work",
    action: "Explore my work",
    icon: BriefcaseBusiness,
    className: "hub-card--portfolio",
    eyebrow: "DESIGN · DEVELOPMENT · DIGITAL",
  },
  {
    number: "02",
    label: "Fragrance",
    title: "A cabinet of scents.",
    description:
      "My growing fragrance world: collection, discoveries, wishlist and the scents I want to remember.",
    href: "/fragrance",
    action: "Enter Scent Cabinet",
    icon: Sparkles,
    className: "hub-card--fragrance",
    eyebrow: "SCENT · COLLECTION · DISCOVERY",
  },
  {
    number: "03",
    label: "Gaming",
    title: "Player one.",
    description:
      "The games I’m playing, the stories I’ve finished and the adventures waiting in my library.",
    href: "/gaming",
    action: "Open my game library",
    icon: Gamepad2,
    className: "hub-card--gaming",
    eyebrow: "GAMES · STORIES · PLAY",
  },
];

const projects = [
  {
    number: "A",
    name: "Dayyah Couture",
    category: "Fashion · Brand project",
    href: "/dayyah-couture",
    className: "hub-project--dayyah",
  },
  {
    number: "B",
    name: "Safiyyr",
    category: "Brand · Digital experience",
    href: "/safiyyr",
    className: "hub-project--safiyyr",
  },
  {
    number: "C",
    name: "Sally’s Apparel",
    category: "Fashion · E-commerce project",
    href: "/sallys-apparel",
    className: "hub-project--sallys",
  },
];

function HubPage() {
  return (
    <main className="ia-hub" id="main-content">
      <div className="hub-shell">
        <header className="hub-topbar">
          <a className="hub-wordmark" href="/" aria-label="Ibrahim Alli home">
            ia<span>.</span>
          </a>
          <span className="hub-topbar-note">PERSONAL INDEX <span>—</span> 2026</span>
          <a className="hub-home-link" href="/">Main website <ArrowUpRight size={15} /></a>
        </header>

        <section className="hub-hero" aria-labelledby="hub-heading">
          <div className="hub-hero-copy">
            <p className="hub-kicker"><span className="hub-live-dot" /> A LITTLE BIT OF EVERYTHING</p>
            <h1 id="hub-heading">Welcome to<br /><em>my corner</em><span className="hub-period">.</span></h1>
            <p className="hub-intro">
              I’m Ibrahim — a digital builder, curious collector and story-driven gamer.
              This is the easiest way to explore what I make and what I love.
            </p>
            <a className="hub-scroll-link" href="#explore">Explore the hub <ArrowDownRight size={17} /></a>
          </div>
          <div className="hub-hero-art" aria-hidden="true">
            <div className="hub-orbit hub-orbit--outer" />
            <div className="hub-orbit hub-orbit--inner" />
            <div className="hub-art-core"><span>IA</span><i>CREATIVE<br />UNIVERSE</i></div>
            <span className="hub-art-star hub-art-star--one">✳</span>
            <span className="hub-art-star hub-art-star--two">✦</span>
            <span className="hub-art-caption">MADE OF MANY THINGS</span>
          </div>
          <div className="hub-hero-foot">
            <span>01 / MY WORLD, IN ONE PLACE</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="hub-explore" id="explore" aria-labelledby="explore-heading">
          <div className="hub-section-heading">
            <div>
              <p className="hub-section-label">THE MAIN DESTINATIONS</p>
              <h2 id="explore-heading">Follow your <em>curiosity.</em></h2>
            </div>
            <p>Three different sides of me. One simple starting point.</p>
          </div>
          <div className="hub-destinations">
            {destinations.map((item) => {
              const Icon = item.icon;
              return (
                <a className={`hub-card ${item.className}`} href={item.href} key={item.number}>
                  <div className="hub-card-top">
                    <span>{item.number} <span className="hub-card-slash">/</span> {item.eyebrow}</span>
                    <span className="hub-card-icon"><Icon size={21} strokeWidth={1.5} /></span>
                  </div>
                  <div className="hub-card-content">
                    <p className="hub-card-label">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p className="hub-card-description">{item.description}</p>
                  </div>
                  <div className="hub-card-bottom">
                    <span>{item.action}</span>
                    <span className="hub-arrow-circle"><ArrowUpRight size={18} /></span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="hub-projects" aria-labelledby="projects-heading">
          <div className="hub-projects-heading">
            <div>
              <p className="hub-section-label">SELECTED PROJECTS / 04</p>
              <h2 id="projects-heading">Things I’ve <em>helped bring to life.</em></h2>
            </div>
            <p>Brand worlds and digital experiences I’ve worked on — each with its own personality.</p>
          </div>
          <div className="hub-project-grid">
            {projects.map((project) => (
              <a className={`hub-project ${project.className}`} href={project.href} key={project.name}>
                <div className="hub-project-visual">
                  <span className="hub-project-index">{project.number}</span>
                  <span className="hub-project-mark">{project.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase()}</span>
                  <span className="hub-project-open"><ArrowUpRight size={18} /></span>
                </div>
                <div className="hub-project-info">
                  <div><h3>{project.name}</h3><p>{project.category}</p></div>
                  <ArrowUpRight size={17} />
                </div>
              </a>
            ))}
          </div>
          <a className="hub-all-work" href="/#work">See the wider portfolio <ArrowUpRight size={17} /></a>
        </section>

        <footer className="hub-footer">
          <div className="hub-footer-brand">ia<span>.</span></div>
          <div className="hub-footer-copy">
            <p>One person. Many interests. Always building.</p>
            <span>IBRAHIM ALLI · {new Date().getFullYear()}</span>
          </div>
          <a href="/" aria-label="Back to Ibrahim Alli's main website"><Camera size={17} /> Back to the main site <ArrowUpRight size={15} /></a>
        </footer>
      </div>
    </main>
  );
}
