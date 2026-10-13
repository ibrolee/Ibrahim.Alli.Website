import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, FileText } from "lucide-react";
import { projects } from "@/lib/portfolio-content";
import { JisProjectVisual } from "@/components/jis-project-visual";

export function PortfolioProof() {
  return (
    <section id="proof" className="ia-proof-section p-section" aria-labelledby="proof-title">
      <div className="p-container">
        <div className="ia-proof-heading">
          <div><p className="p-label">Project evidence / Behind the work</p><h2 id="proof-title">Real businesses.<br /><em>Real work to explore.</em></h2></div>
          <p>These are businesses I'm personally involved with, not invented agency commissions. Explore the actual sites and read how their digital journeys work.</p>
        </div>
        <div className="ia-proof-grid">
          {projects.map((project) => (
            <article className="ia-proof-card" key={project.slug}>
              <div className="ia-proof-thumb">
                {project.slug === "jis-beauty-fashion" ? <JisProjectVisual className="jis-portfolio-fill" /> :
                <img src={project.image} alt={`${project.name} project visual presentation`} loading="lazy" decoding="async" width={1600} height={1000}/>}
                <span><BadgeCheck size={16} aria-hidden="true"/> Live business project</span>
              </div>
              <div className="ia-proof-body">
                <p className="p-label">{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.engagementContext}</p>
                <Link to="/projects/$slug" params={{slug:project.slug}}>
                  See the walkthrough <ArrowUpRight size={18} aria-hidden="true"/>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="ia-proof-bottom">
          <div>
            <FileText size={23} aria-hidden="true"/>
            <p><strong>Need a quick introduction?</strong> Take a copy of my portfolio brochure with you, or share it with someone planning a website.</p>
          </div>
          <a href="/Ibrahim-Alli-Portfolio-2026.pdf" download className="ia-proof-download">Download portfolio PDF <ArrowRight size={17} aria-hidden="true"/></a>
        </div>
      </div>
    </section>
  );
}
