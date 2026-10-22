import { JisScreenGallery } from "@/components/jis-screen-gallery";
import { SuperplusScreenGallery } from "@/components/superplus-screen-gallery";
import { SuperplusProjectVisual } from "@/components/superplus-project-visual";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, Check, Smartphone, Users, QrCode, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/portfolio-content";
import { JisProjectVisual } from "@/components/jis-project-visual";
import { ProjectWalkthrough } from "@/components/project-walkthrough";
import { projectDecisions } from "@/lib/project-decisions";
import { track } from "@vercel/analytics";

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
  { icon: Smartphone, number: "01", title: "Customer-facing website", description: "Membership information, gym services, promotions and enquiries presented in one accessible online home." },
  { icon: CreditCard, number: "02", title: "Memberships & payments", description: "Registration and payment functionality connected to the customer membership journey." },
  { icon: QrCode, number: "03", title: "QR check-in", description: "Member check-in tools to help reception record gym visits." },
  { icon: Users, number: "04", title: "Staff & reception tools", description: "Staff profiles, clock-in workflows and management tools for day-to-day operations." },
];

function ProjectPage() {
  const project = Route.useLoaderData();
  const isFitness = project.slug === "super-plus-fitness";
  const isConcept = Boolean(project.concept);
  const decision = projectDecisions[project.slug as keyof typeof projectDecisions];

  return (
    <main id="main-content" className="pt-18 premium-project-page">
      <section className="px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1480px]">
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to projects
          </Link>
          <div className="mt-12 grid min-w-0 gap-9 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div className="min-w-0">
              <p className="eyebrow">{isConcept ? "Concept project" : "Case study"} / {project.number}</p>
              <h1 className="mt-5 max-w-5xl break-words font-display text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.94] tracking-[-0.035em]">{project.name}</h1>
            </div>
            <div className="min-w-0 lg:pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-mark">{project.type}</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{project.summary}</p>
              {project.url && (
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild><a href={project.url} target="_blank" rel="noopener noreferrer">{isConcept ? "View Concept" : isFitness ? "Visit Live Gym Website" : "View Developed Storefront"} <ExternalLink aria-hidden="true" /></a></Button>
                  {isFitness && <Button asChild variant="outline"><a href="https://apps.apple.com/ng/app/sp-fitness/id6820107696" target="_blank" rel="noopener noreferrer">Get SP Fitness on the App Store <Download aria-hidden="true" /></a></Button>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="px-5 md:px-10">
        <figure className="mx-auto max-w-[1480px] overflow-hidden">
          {project.slug === "jis-beauty-fashion" ? (
            <JisProjectVisual className="jis-portfolio-case-hero" />
          ) : isFitness ? (
            <SuperplusProjectVisual className="spf-project-case-hero" />
          ) : (
            <img src={project.image} alt={`${project.name} project presentation`} width={1600} height={1000} decoding="async" className="block h-auto w-full" />
          )}
          {project.slug === "jis-beauty-fashion" && <figcaption className="border-b border-border py-4 text-xs leading-5 text-muted-foreground">Current storefront captures · Product discovery, scent options, shopping bag and checkout. Bag and checkout show a sample item.</figcaption>}
          {isFitness && <figcaption className="border-b border-border py-4 text-xs leading-5 text-muted-foreground">Live website captures · Memberships, team portals and the official app presentation. Explore each screen below.</figcaption>}
        </figure>
      </div>

      {isFitness ? <SuperplusScreenGallery /> : project.slug === "jis-beauty-fashion" ? <JisScreenGallery /> : !isConcept && <ProjectWalkthrough project={project} />}

      {decision && (
        <section className="ia-4d-case-notes" aria-labelledby="design-decisions-heading">
          <div className="p-container">
            <div className="ia-4d-case-notes-header">
              <div><p className="p-label">What shaped this work</p><h2 id="design-decisions-heading">The thinking <em>behind the build.</em></h2></div>
              <p>{decision.scope}</p>
            </div>
            <div className="ia-4d-case-decisions">
              {decision.steps.map((step,index)=>(
                <article key={step.question}>
                  <span className="ia-4d-case-index">{String(index+1).padStart(2,"0")}</span>
                  <h3>{step.question}</h3>
                  <p><strong>Decision:</strong> {step.decision}</p>
                  <p><strong>Why:</strong> {step.reason}</p>
                </article>
              ))}
            </div>
            <div className="ia-4d-case-boundary">
              <span>{decision.label}</span>
              <p>{decision.boundaries}</p>
            </div>
            <Link to="/start-project" search={{service:decision.service}} className="ia-4d-case-link"
              onClick={()=>track("portfolio_case_study_cta_click",{project:project.slug,action:"open_project_form"})}>
              {decision.linkText} <ArrowRight size={18} aria-hidden="true"/>
            </Link>
          </div>
        </section>
      )}

      {!isConcept && (
        <section className="p-evidence-section px-5 py-14 md:px-10 md:py-20" aria-labelledby="delivered-heading">
          <div className="mx-auto max-w-[1480px]">
            <div className="p-evidence-heading">
              <div>
                <p className="eyebrow">Shipped work / what is included</p>
                <h2 id="delivered-heading">The details <em>behind the design.</em></h2>
              </div>
              <p>Specific things I worked on — rather than invented traffic, sales or conversion results.</p>
            </div>
            <div className="p-evidence-grid">
              {project.deliverables.map((deliverable, index) => (
                <div className="p-evidence-item" key={deliverable}>
                  <span>0{index + 1}</span>
                  <Check size={19} aria-hidden="true" />
                  <p>{deliverable}</p>
                </div>
              ))}
            </div>
            <p className="p-evidence-note"><strong>Project status:</strong> {project.evidenceNote}</p>
          </div>
        </section>
      )}

      {isConcept && (
        <section className="px-5 py-12 md:px-10 md:py-18">
          <div className="mx-auto grid max-w-[1480px] gap-8 border-y border-border py-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
            <div>
              <p className="eyebrow">Independent concept</p>
              <h2 className="mt-4 font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.035em]">
                Built to explore <em>what could be.</em>
              </h2>
            </div>
            <div className="md:pt-8">
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                This is a self-initiated portfolio concept, not commissioned client work. The brand,
                property details and booking experience are fictional and were created to demonstrate
                hospitality website design, user experience and responsive development.
              </p>
            </div>
          </div>
        </section>
      )}

      {isFitness && (
        <>
          <section className="px-5 py-16 md:px-10 md:py-24" aria-labelledby="fitness-role-title">
            <div className="mx-auto grid max-w-[1480px] gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
              <div>
                <p className="eyebrow">My contribution</p>
                <h2 id="fitness-role-title" className="mt-4 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.035em]">Built for the <em>real business.</em></h2>
              </div>
              <div className="min-w-0 md:pt-8">
                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">I manage Super Plus Fitness & Spa’s digital operations and work on the website, marketing, membership processes and practical tools used by the team. The work is ongoing, shaped by what customers and staff need day to day.</p>
                <div className="mt-8 flex flex-wrap gap-2" aria-label="Areas of responsibility">
                  {["Website development", "Digital operations", "Membership experience", "Staff workflows", "Marketing"].map((item) => <span key={item} className="rounded-full border border-border px-4 py-2 text-xs font-semibold leading-5">{item}</span>)}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-ink px-5 py-16 text-paper md:px-10 md:py-28" aria-labelledby="fitness-features-title">
            <div className="mx-auto max-w-[1480px]">
              <div className="grid gap-8 border-b border-paper/20 pb-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Inside the project / 01—04</p>
                  <h2 id="fitness-features-title" className="mt-5 max-w-3xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.96] tracking-[-0.04em]">More than <em className="text-accent">a website.</em></h2>
                </div>
                <p className="max-w-xl text-base leading-8 text-paper/75 md:text-lg lg:justify-self-end">The public website is one part of a wider digital setup. Membership, reception and staff tools support the work behind the scenes.</p>
              </div>
              <div className="grid gap-px bg-paper/20 md:grid-cols-2">
                {fitnessFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <article key={feature.number} className="min-w-0 bg-ink px-2 py-10 sm:px-6 md:px-8 md:py-12">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold tracking-[0.18em] text-accent">{feature.number} / FEATURE</span>
                        <Icon className="size-7 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <h3 className="mt-10 max-w-xl font-display text-[clamp(2.15rem,4vw,3.8rem)] leading-[1.02] tracking-[-0.025em]">{feature.title}</h3>
                      <p className="mt-5 max-w-lg text-base leading-7 text-paper/75 md:leading-8">{feature.description}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-paper/20 pt-8">
                <p className="flex items-center gap-2 text-sm text-paper/75"><Check className="size-4 shrink-0 text-accent" aria-hidden="true" /> Ongoing development and management</p>
                <div className="flex flex-wrap gap-5">
                  <a href="https://www.superplusfitness.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-accent pb-2 text-sm font-semibold text-accent transition-opacity hover:opacity-70">Explore the live website <ExternalLink className="size-4" aria-hidden="true" /></a>
                  <a href="https://apps.apple.com/ng/app/sp-fitness/id6820107696" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-accent pb-2 text-sm font-semibold text-accent transition-opacity hover:opacity-70">Download SP Fitness <Download className="size-4" aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="section">
        <div className="section-inner grid min-w-0 gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)]">
          <div className="min-w-0"><p className="eyebrow">The work</p><h2 className="section-title">From need to something usable.</h2></div>
          <div className="case-sections min-w-0">
            {[["The Challenge", project.challenge], ["The Approach", project.approach], ["The Build", project.build], ["The Result", project.result]].map(([title, body], i) => (
              <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
            <article><span>05</span><div><h3>Technology / Tools</h3><div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="border border-border px-3 py-2 text-xs text-muted-foreground">{tool}</span>)}</div></div></article>
          </div>
        </div>
      </section>

      <section className="bg-accent px-5 py-16 text-accent-foreground md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="min-w-0"><p className="eyebrow text-accent-foreground/60">Next conversation</p><p className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.05]">Have a project in mind?</p></div>
          <Button asChild className="bg-ink text-paper hover:bg-ink/90"><Link to="/start-project">Let's Talk About Your Project <ArrowRight aria-hidden="true" /></Link></Button>
        </div>
      </section>
    </main>
  );
}