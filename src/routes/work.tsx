import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortfolioProof } from "@/components/portfolio-proof";
import { VerifiedFeedbackSection } from "@/components/verified-feedback";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work & Real Case Studies — Ibrahim Alli" },
      { name: "description", content: "Explore real web design and business system projects by Ibrahim Alli, including Super Plus Fitness and JIS Beauty & Fashion. Download the portfolio PDF." },
      { property: "og:title", content: "Real Website Projects — Ibrahim Alli" },
      { property: "og:description", content: "Real businesses, real projects and clear examples of the work behind them." },
      { property: "og:url", content: "https://ibrahimalli.com/work" },
    ],
    links: [{ rel: "canonical", href: "https://ibrahimalli.com/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main id="main-content" className="ia-stage-page ia-work-page">
      <section className="ia-stage-hero ia-detail-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Back to home</Link>
          <p className="p-label">Selected work / Real business projects</p>
          <h1>Proof is better<br/><em>than promises.</em></h1>
          <div className="ia-stage-lead-row">
            <p>Look behind the design and explore two real projects — and the practical work I contribute to each business.</p>
            <Link to="/start-project" className="ia-stage-primary">Discuss your project <ArrowUpRight size={18} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
      <PortfolioProof />
      <VerifiedFeedbackSection />
    </main>
  );
}
