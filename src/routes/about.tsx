import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { skills } from "@/lib/portfolio-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ibrahim Alli" },
      { name: "description", content: "Background, education, experience, skills and interests of Ibrahim Alli." },
    ],
  }),
  component: About,
});

const experience = [
  { period: "2025 — Present", role: "Business Manager / Digital Operations", company: "Super Plus Fitness & Spa", place: "Lagos, Nigeria", body: "Managing day-to-day business operations while developing the company’s website, digital marketing, staff systems, membership processes and customer-facing digital tools." },
  { period: "2024", role: "Construction Worker", company: "Construction", place: "", body: "Practical site experience covering site preparation, material handling, general construction support and team-oriented physical work." },
  { period: "Earlier experience", role: "Kitchen Team Lead", company: "Hungry House", place: "Lefkosa, North Cyprus", body: "Supported kitchen operations, coordinated team workflow and helped maintain smooth daily restaurant operations." },
];

const personal = [
  ["Name", "Ibrahim Alli"],
  ["Born", "1998"],
  ["Based around", "Nigeria / North Cyprus"],
  ["Focus", "Business · Digital · Creative work"],
];

const background = [
  "My path has never been limited to one kind of work. I’ve moved between communication, postgraduate study, construction, hospitality, business operations and technology.",
  "That mix shaped how I approach projects: I’m interested in people, systems and practical outcomes, not just job titles or aesthetics.",
  "Today, a major part of my work is building and improving digital experiences for businesses, while continuing to explore web development, design and new ideas.",
];

function About() {
  return (
    <main className="about-page">
      <section className="about-hero section">
        <div className="section-inner">
          <Link to="/" className="back-link"><ArrowLeft /> Back home</Link>
          <div className="about-hero-grid">
            <div><p className="eyebrow">About Ibrahim</p><h1 className="about-title">More than<br /><em>a timeline.</em></h1></div>
            <p className="about-lead">A closer look at the person behind the projects — background, education, work, skills and the things that keep me curious.</p>
          </div>
        </div>
      </section>

      <section className="about-block personal-block section"><div className="section-inner about-grid"><div><p className="eyebrow">01 / Personal</p><h2 className="section-title">The person<br />behind the work.</h2></div><div className="personal-list">{personal.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></section>

      <section className="about-block background-block section"><div className="section-inner about-grid"><div><p className="eyebrow">02 / Background</p><h2 className="section-title">Different rooms.<br /><em>One story.</em></h2></div><div className="about-prose">{background.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

      <section className="about-block education-block section"><div className="section-inner"><div className="section-heading-row"><div><p className="eyebrow">03 / Education</p><h2 className="section-title">What I<br /><em>studied.</em></h2></div></div><div className="education-list"><div className="education-card"><span>2018</span><div><h3>BSc Mass Communication</h3><p>Olabisi Onabanjo University</p><small>Undergraduate degree</small></div></div><div className="education-card"><span>2023</span><div><h3>Master’s in Political Science & International Relations</h3><p>Bahçeşehir Cyprus University</p><small>Postgraduate degree</small></div></div></div></div></section>

      <section className="about-block experience-block section"><div className="section-inner"><div className="section-heading-row"><div><p className="eyebrow">04 / Work experience</p><h2 className="section-title">Where I’ve<br /><em>worked.</em></h2></div><p className="heading-note">The work has changed. The habit of learning has stayed.</p></div><div className="experience-list">{experience.map((item, index) => <article className="experience-card" key={item.company}><div className="experience-number">0{index + 1}</div><div className="experience-main"><p className="experience-period">{item.period}</p><h3>{item.role}</h3><p className="experience-company">{item.company}{item.place ? ` · ${item.place}` : ""}</p></div><p className="experience-body">{item.body}</p></article>)}</div></div></section>

      <section className="about-block skills-block section"><div className="section-inner about-grid"><div><p className="eyebrow">05 / Skills</p><h2 className="section-title">What I can<br /><em>work with.</em></h2></div><div className="skills-groups">{Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div>{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>

      <section className="about-block interests-block section"><div className="section-inner about-grid"><div><p className="eyebrow">06 / Interests</p><h2 className="section-title">Life outside<br /><em>the screen.</em></h2></div><div className="interest-grid-about">{["Technology","Gaming","Photography","Design","Business","Aviation","Learning new skills","Exploring new ideas"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></div><div className="section-inner hobby-note"><p><strong>Photography</strong> is a personal hobby and creative outlet — a way to pay attention to light, composition and everyday details. It isn’t presented here as a professional photography service.</p></div></section>

      <section className="about-cta"><div className="section-inner"><p className="eyebrow light">07 / What’s next</p><h2>Still building.<br /><em>Still learning.</em></h2><Link to="/" hash="contact" className="text-link light-link">Start a conversation <ArrowRight /></Link></div></section>
    </main>
  );
}
