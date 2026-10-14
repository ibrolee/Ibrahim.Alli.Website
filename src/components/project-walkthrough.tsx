import { ExternalLink, ArrowUpRight, Check } from "lucide-react";
import { JisProjectVisual } from "@/components/jis-project-visual";
import type { Project } from "@/lib/portfolio-content";

export function ProjectWalkthrough({ project }: { project: Project }) {
  if (!project.walkthrough.length) return null;
  const isJis = project.slug === "jis-beauty-fashion";

  return (
    <section className="ia-walkthrough" aria-labelledby="walkthrough-title">
      <div className="p-container">
        <div className="ia-walkthrough-heading">
          <div>
            <p className="p-label">Experience walkthrough / {project.number}</p>
            <h2 id="walkthrough-title">What people <em>actually do.</em></h2>
          </div>
          <p>Not just how the website looks — a short tour of the customer journeys that shaped the work.</p>
        </div>
        <div className="ia-walkthrough-layout">
          <figure className="ia-walkthrough-visual">
            <div className="ia-walkthrough-browser" aria-hidden="true">
              <div className="ia-walkthrough-browser-top"><span/><span/><span/><b>{isJis ? "jisbeautyfashion.com" : "superplusfitness.com"}</b></div>
              <div className="ia-walkthrough-browser-image">
                {isJis ? <JisProjectVisual className="jis-portfolio-fill" /> :
                  <img src={project.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" />}
              </div>
            </div>
            <figcaption>{isJis ? "Project presentation, not an active selling site. The storefront was developed ahead of commercial launch." : "Project presentation, not a live interactive demo. Use the linked website to explore the current experience."}</figcaption>
            <div className="ia-walkthrough-source">
              <span><Check size={16} aria-hidden="true"/> Real operating business</span>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{isJis ? "View developed storefront" : "View live website"} <ExternalLink size={16} aria-hidden="true"/></a>}
            </div>
          </figure>
          <div className="ia-walkthrough-steps">
            {project.walkthrough.map((step,index) => (
              <article className="ia-walkthrough-step" key={step.label}>
                <div className="ia-walkthrough-index"><span>{step.label}</span><ArrowUpRight size={20} aria-hidden="true"/></div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                <div className="ia-walkthrough-value"><Check size={16} aria-hidden="true"/><span>{step.value}</span></div>
              </article>
            ))}
          </div>
        </div>
        <div className="ia-walkthrough-disclosure"><strong>Project relationship:</strong> {project.engagementContext}</div>
      </div>
    </section>
  );
}
