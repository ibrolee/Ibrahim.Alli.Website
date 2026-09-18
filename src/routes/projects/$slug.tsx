import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
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
      {
        title: loaderData
          ? `${loaderData.name} — Ibrahim Alli`
          : "Project unavailable — Ibrahim Alli",
      },
      {
        name: "description",
        content: loaderData?.summary ?? "Project case study by Ibrahim Alli.",
      },
      {
        property: "og:title",
        content: loaderData
          ? `${loaderData.name} — Ibrahim Alli`
          : "Project — Ibrahim Alli",
      },
      {
        property: "og:description",
        content: loaderData?.summary ?? "Project case study by Ibrahim Alli.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: `https://ibrahimalli.com/projects/${params.slug}`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [
      {
        rel: "canonical",
        href: `https://ibrahimalli.com/projects/${params.slug}`,
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();

  return (
    <main className="pt-18">
      <section className="px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1480px]">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to projects
          </Link>

          <div className="mt-14 grid gap-9 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">Case study / {project.number}</p>
              <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.88]">
                {project.name}
              </h1>
            </div>

            <div>
              <p className="text-sm font-medium text-accent-mark">
                {project.type}
              </p>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {project.summary}
              </p>

              {project.url && (
                <Button asChild className="mt-7">
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Visit Website <ExternalLink />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[1480px] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} website and product presentation`}
            width={1600}
            height={1000}
            className="w-full"
          />
        </div>
      </div>

      <section className="section">
        <div className="section-inner grid gap-12 lg:grid-cols-[0.7fr_1.5fr]">
          <div>
            <p className="eyebrow">The work</p>
            <h2 className="section-title">
              From need to something usable.
            </h2>
          </div>

          <div className="case-sections">
            {[
              ["The Challenge", project.challenge],
              ["The Approach", project.approach],
              ["The Build", project.build],
              ["The Result", project.result],
            ].map(([title, body], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}

            <article>
              <span>05</span>
              <div>
                <h3>Technology / Tools</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-border px-3 py-2 text-xs text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-accent px-5 py-20 text-accent-foreground md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent-foreground/60">
              Next conversation
            </p>
            <p className="mt-5 font-display text-5xl md:text-7xl">
              Have a project in mind?
            </p>
          </div>

          <Button asChild className="bg-ink text-paper hover:bg-ink/90">
            <Link to="/" hash="contact">
              Let’s Work Together <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}