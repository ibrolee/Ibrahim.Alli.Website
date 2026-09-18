import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, Check, Smartphone, Users, QrCode, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/portfolio-content";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Ibrahim Alli` : "Project unavailable — Ibrahim Alli" },
      { name: "description", content: loaderData?.summary ?? "Project case study by Ibrahim Alli." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — Ibrahim Alli` : "Project — Ibrahim Alli" },
      { property: "og:description", content: loaderData?.summary ?? "Project case study by Ibrahim Alli." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://ibrahimalli.com/projects/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
      ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: `https://ibrahimalli.com/projects/${params.slug}` }],
  }),
  component: ProjectPage,
});

const fitnessFeatures = [
  { icon: Smartphone, number: "01", title: "Customer-facing website", description: "A clearer online home for membership information, gym services, promotions and enquiries." },
  { icon: CreditCard, number: "02", title: "Memberships & payments", description: "Registration and payment functionality that connects the public website with the membership journey." },
  { icon: QrCode, number: "03", title: "QR check-in", description: "QR-based member check-in tools designed to make visits easier to record at reception." },
  { icon: Users, number: "04", title: "Staff & reception tools", description: "Staff profiles, clock-in workflows and management tools supporting day-to-day operations." },
];

function ProjectPage() {
  const project = Route.useLoaderData();
  const isFitness = project.slug === "super-plus-fitness";

  return (
    <main className="pt-18">
      <section className="px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1480px]">
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to projects
          </Link>
          <div className="mt-14 grid gap-9 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">Case study / {project.number}</p>
              <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.88]">{project.name}</h1>
            </div>
            <div>
              <p className="text-sm font-medium text-accent-mark">{project.type}</p>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.summary}</p>
              {project.url && (
                <Button asChild className="mt-7"><a href={project.url} target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink /></a></Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[1480px] overflow-hidden">
          <img src={project.image} alt={`${project.name} website and product presentation`} width={1600} height={1000} className="w-full" />
        </div>
      </div>

      {isFitness && (
        <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28" aria-labelledby="fitness-features-title">
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-8 border-b border-paper/20 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Inside the project / 01—04</p>
                <h2 id="fitness-features-title" className="mt-5 max-w-3xl font-display text-[clamp(3.3rem,7vw,7rem)] leading-[0.9] tracking-[-0.04em]">More than <em className="text-accent">a website.</em></h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-paper/70 lg:justify-self-end">The public website is one part of a wider digital setup. The project also includes practical tools for memberships, reception and staff operations.</p>
            </div>
            <div className="grid gap-px bg-paper/20 md:grid-cols-2">
              {fitnessFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.number} className="min-w-0 bg-ink px-1 py-10 md:px-8 md:py-12">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold tracking-[0.18em] text-accent">{feature.number} / FEATURE</span>
                      <Icon className="size-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="mt-12 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-none">{feature.title}</h3>
                    <p className="mt-5 max-w-lg text-base leading-8 text-paper/65">{feature.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-paper/20 pt-8">
              <p className="flex items-center gap-2 text-sm text-paper/70"><Check className="size-4 text-accent" aria-hidden="true" /> Ongoing development and management</p>
              <a href="https://www.superplusfitness.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-accent pb-2 text-sm font-semibold text-accent transition-opacity hover:opacity-70">Explore the live website <ExternalLink className="size-4" /></a>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-inner grid gap-12 lg:grid-cols-[0.7fr_1.5fr]">
          <div><p className="eyebrow">The work</p><h2 className="section-title">From need to something usable.</h2></div>
          <div className="case-sections">
            {[["The Challenge", project.challenge], ["The Approach", project.approach], ["The Build", project.build], ["The Result", project.result]].map(([title, body], i) => (
              <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
            <article><span>05</span><div><h3>Technology / Tools</h3><div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="border border-border px-3 py-2 text-xs text-muted-foreground">{tool}</span>)}</div></div></article>
          </div>
        </div>
      </section>

      <section className="bg-accent px-5 py-20 text-accent-foreground md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="eyebrow text-accent-foreground/60">Next conversation</p><p className="mt-5 font-display text-5xl md:text-7xl">Have a project in mind?</p></div>
          <Button asChild className="bg-ink text-paper hover:bg-ink/90"><Link to="/" hash="contact">Let’s Work Together <ArrowRight /></Link></Button>
        </div>
      </section>
    </main>
  );
}