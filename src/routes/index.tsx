import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { projects, skills, timeline } from "@/lib/portfolio-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibrahim Alli — Personal Website" },
      { name: "description", content: "The personal website of Ibrahim Alli — exploring his background, experience, education, projects, skills and work in web development." },
      { property: "og:title", content: "Ibrahim Alli — Personal Website" },
      { property: "og:description", content: "Builder, creator and entrepreneur with experience across business, operations and digital projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const experiences = [
  { company: "Super Plus Fitness & Spa", role: "Business Manager / Digital Operations", place: "Lagos, Nigeria", period: "2025 — Present", details: ["Day-to-day business operations", "Website development and maintenance", "Digital marketing and business promotions", "Staff and membership management systems", "Customer-facing digital processes", "Developing digital solutions for the business"] },
  { company: "Construction", role: "Construction Worker", place: "", period: "2024", details: ["Site preparation", "Material handling", "General construction support", "Physical, team-oriented work"] },
  { company: "Hungry House", role: "Kitchen Team Lead", place: "Lefkosa, North Cyprus", period: "Earlier experience", details: ["Kitchen operations", "Team coordination", "Maintaining workflow", "Supporting daily restaurant operations"] },
];

function Index() {
  const [formNote, setFormNote] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setFormNote("Ibrahim’s direct email has not been added yet. Your message has not been sent.");
  }

  return <main>
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-14">
      <div aria-hidden="true" className="hero-mark">IA</div>
      <div className="relative mx-auto w-full max-w-[1480px]">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-mark">Personal website · 2026</p>
        <h1 className="max-w-6xl font-display text-[clamp(4.2rem,12vw,11rem)] leading-[0.82]">Ibrahim<br/><span className="ml-[8vw] italic text-accent-mark">Alli.</span></h1>
        <div className="mt-9 grid gap-8 border-t border-border pt-7 md:grid-cols-[1fr_1.2fr] md:items-end">
          <p className="font-display text-2xl md:text-4xl">Builder. Creator. Entrepreneur.</p>
          <div><p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">I’m Ibrahim — a Mass Communication graduate and Political Science postgraduate with experience spanning business management, construction, hospitality and digital projects. I enjoy learning new things, building useful systems and turning ideas into something real.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg"><a href="#projects">Explore My Work <ArrowRight /></a></Button><Button asChild variant="outline" size="lg"><a href="#contact">Get In Touch</a></Button></div>
          </div>
        </div>
        <a href="#about" aria-label="Scroll to about" className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Scroll <ArrowDown className="size-4 animate-bounce" /></a>
      </div>
    </section>

    <section id="about" className="section bg-ink text-paper">
      <div className="section-inner grid gap-12 lg:grid-cols-[0.8fr_1.8fr]">
        <div><p className="eyebrow text-paper/50">01 / About</p><h2 className="section-title">A life shaped by different rooms.</h2></div>
        <div className="lg:pt-16"><p className="font-display text-3xl leading-snug md:text-5xl">Ibrahim’s path moves between communication, politics, physical work, hospitality, business and the digital world.</p>
          <div className="mt-10 grid gap-7 border-t border-paper/20 pt-8 text-paper/65 md:grid-cols-2"><p>With a background in Mass Communication and Political Science & International Relations, he has learned to see work through people, systems and context—not just titles.</p><p>Today, much of his work centres on Super Plus Fitness & Spa in Lagos, where he supports business operations and its evolving digital presence.</p><p>He also creates websites, manages digital platforms, marketing, staff systems and practical business processes.</p><p>Photography remains a personal hobby: a way to notice composition, light and everyday details, rather than a professional service.</p></div>
          <div className="mt-12 border-l-2 border-accent-mark pl-6"><p className="eyebrow text-paper/50">Currently</p><p className="mt-3 max-w-2xl text-lg text-paper/85">Building digital projects, developing web-development skills, exploring entrepreneurship, pursuing photography as a creative hobby and looking for opportunities to turn practical skills into sustainable work.</p></div>
        </div>
      </div>
    </section>

    <section className="section overflow-hidden"><div className="section-inner"><p className="eyebrow">02 / Journey</p><h2 className="section-title max-w-3xl">The route here was never a straight line.</h2>
      <div className="timeline mt-16" role="list">{timeline.map(([year, text], i) => <article key={year} className="timeline-item" role="listitem"><span className="timeline-index">0{i+1}</span><p className="font-display text-5xl text-accent-mark">{year}</p><p className="mt-5 leading-7 text-muted-foreground">{text}</p></article>)}</div>
    </div></section>

    <section id="education" className="section bg-soft"><div className="section-inner grid gap-12 lg:grid-cols-[0.7fr_1.5fr]"><div><p className="eyebrow">03 / Education</p><h2 className="section-title">What I studied.</h2></div><div>
      {[{degree:"BSc — Mass Communication", school:"Olabisi Onabanjo University", year:"2018"},{degree:"MSc — Political Science & International Relations",school:"Bahçeşehir Cyprus University",year:"2023"}].map((item)=><article key={item.degree} className="education-row"><p className="text-sm text-muted-foreground">{item.year}</p><div><h3 className="font-display text-3xl md:text-5xl">{item.degree}</h3><p className="mt-3 text-muted-foreground">{item.school}</p></div></article>)}
      <p className="mt-10 max-w-2xl text-lg leading-8 text-muted-foreground">This academic background brings together communication, politics, international relations and analytical thinking—different lenses for understanding people and the systems around them.</p>
    </div></div></section>

    <section id="experience" className="section"><div className="section-inner"><div className="grid gap-6 md:grid-cols-2"><div><p className="eyebrow">04 / Experience</p><h2 className="section-title">Different environments. Practical lessons.</h2></div><p className="max-w-xl self-end text-lg leading-8 text-muted-foreground">A professional journey across business, hospitality, construction and digital work—presented as it happened, without forcing it into one title.</p></div>
      <div className="mt-16 border-t border-border">{experiences.map((job, i)=><article key={job.company} className="experience-row"><p className="text-sm text-accent-mark">0{i+1}</p><div><h3 className="font-display text-3xl md:text-5xl">{job.company}</h3><p className="mt-2 font-medium">{job.role}</p><p className="mt-1 text-sm text-muted-foreground">{job.place}</p></div><ul className="space-y-2 text-sm leading-6 text-muted-foreground">{job.details.map(d=><li key={d}>— {d}</li>)}</ul><p className="text-sm text-muted-foreground md:text-right">{job.period}</p></article>)}</div>
    </div></section>

    <section id="skills" className="section bg-ink text-paper"><div className="section-inner"><p className="eyebrow text-paper/50">05 / Skills</p><div className="grid gap-12 lg:grid-cols-[0.8fr_1.5fr]"><h2 className="section-title">Useful skills, built through doing.</h2><div className="divide-y divide-paper/20">{Object.entries(skills).map(([category, items])=><div key={category} className="py-8 first:pt-0"><h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-mark">{category}</h3><div className="flex flex-wrap gap-x-6 gap-y-3">{items.map(item=><span key={item} className="font-display text-2xl text-paper/85 md:text-3xl">{item}</span>)}</div></div>)}</div></div></div></section>

    <section id="projects" className="section"><div className="section-inner"><p className="eyebrow">06 / Selected projects</p><div className="grid gap-8 md:grid-cols-2"><h2 className="section-title">Things I’ve Built.</h2><p className="max-w-xl self-end text-lg leading-8 text-muted-foreground">Ideas become useful when they leave the notebook. These projects combine business needs, visual thinking and practical digital work.</p></div>
      <div className="mt-16 space-y-20">{projects.map((project, i)=><article key={project.slug} className="project-feature"><Link to="/projects/$slug" params={{slug:project.slug}} className="project-image-wrap"><img src={project.image} alt={`${project.name} project preview`} width={1600} height={1000} loading="lazy" className="project-image"/></Link><div className="mt-6 grid gap-5 md:grid-cols-[auto_1fr_1fr_auto]"><span className="font-display text-xl text-accent-mark">{project.number}</span><div><h3 className="font-display text-3xl md:text-5xl">{project.name}</h3><p className="mt-2 text-sm font-medium text-muted-foreground">{project.type}</p></div><p className="max-w-xl leading-7 text-muted-foreground">{project.summary}</p><Button asChild variant="outline" size="icon" aria-label={`View ${project.name} case study`}><Link to="/projects/$slug" params={{slug:project.slug}}><ArrowRight/></Link></Button></div></article>)}</div>
    </div></section>

    <section id="web-development" className="section bg-accent text-accent-foreground"><div className="section-inner"><p className="eyebrow text-accent-foreground/60">07 / Web Design & Development</p><div className="grid gap-10 lg:grid-cols-2"><h2 className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.86]">I Build<br/>Websites Too.</h2><div className="lg:pt-8"><p className="max-w-xl text-xl leading-8">Alongside my business and creative work, I build modern websites and digital experiences for businesses and personal brands.</p><div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-accent-foreground/25 pt-7 text-sm">{["Business websites","E-commerce websites","Landing pages","Website redesigns","Online registration systems","Payment integrations","Business management systems","Custom digital tools","Responsive web experiences"].map(x=><span key={x}>{x}</span>)}</div><p className="mt-12 font-display text-3xl">Have a project in mind?</p><Button asChild className="mt-5 bg-ink text-paper hover:bg-ink/90"><a href="#contact">Let’s Work Together <ArrowRight/></a></Button></div></div></div></section>

    <section id="beyond" className="section"><div className="section-inner grid gap-12 lg:grid-cols-[0.8fr_1.5fr]"><div><p className="eyebrow">08 / Beyond work</p><h2 className="section-title">Curiosity has many forms.</h2></div><div><div className="interest-grid">{["Technology","Gaming","Photography","Design","Business","Aviation","Learning new skills","Exploring new ideas"].map((x,i)=><div key={x} className="interest-item"><span>0{i+1}</span><p>{x}</p></div>)}</div><div className="mt-10 grid grid-cols-3 gap-2" aria-label="Photography placeholders"><div className="photo-placeholder tall"><span>Photography<br/>archive</span></div><div className="photo-placeholder"><span>Personal<br/>observations</span></div><div className="photo-placeholder dark"><span>Images<br/>coming later</span></div></div><p className="mt-4 text-sm text-muted-foreground">A space reserved for Ibrahim’s own photographs—personal work, not a professional service.</p></div></div></section>

    <section className="section bg-soft"><div className="section-inner"><p className="eyebrow">09 / Philosophy</p><blockquote className="mt-12 max-w-6xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95]">“I like building things that are <span className="italic text-accent-mark">useful.</span>”</blockquote><p className="ml-auto mt-10 max-w-2xl text-lg leading-8 text-muted-foreground">Whether it’s a business, a website, a digital system or simply an idea I’m experimenting with, I enjoy taking something from concept to something people can actually use.</p></div></section>

    <section id="contact" className="section"><div className="section-inner grid gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">10 / Contact</p><h2 className="section-title">Let’s Talk.</h2><p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">If you have an idea, a project, a business problem or simply want to connect, I’d be happy to hear from you.</p><div className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground"><p>Direct contact details will appear here once provided.</p></div></div>
      <form onSubmit={handleSubmit} className="contact-form"><label>Name<input required name="name" autoComplete="name" /></label><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Subject<input required name="subject" /></label><label>Message<textarea required name="message" rows={5}/></label><div><Button type="submit" size="lg">Send Message <ArrowRight/></Button>{formNote && <p role="status" className="mt-4 text-sm text-muted-foreground">{formNote}</p>}</div></form>
    </div></section>
  </main>;
}
