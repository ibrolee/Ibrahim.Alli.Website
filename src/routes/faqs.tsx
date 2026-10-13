import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projectFaqs } from "@/lib/freelance-services";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Ibrahim Alli | Websites, Timelines and Support" },
      { name: "description", content: "Answers to common questions about website pricing, turnaround, mobile design, redesigns, hosting, maintenance and working with Ibrahim Alli." },
      { property: "og:title", content: "Frequently Asked Questions — Ibrahim Alli" },
      { property: "og:description", content: "Clear answers about pricing, projects, support and working together." },
      { property: "og:url", content: "https://ibrahimalli.com/faqs" },
    ],
    links: [{ rel: "canonical", href: "https://ibrahimalli.com/faqs" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main id="main-content" className="ia-stage-page ia-faq-page">
      <section className="ia-stage-hero ia-detail-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true"/> Back to home</Link>
          <p className="p-label">Frequently asked questions / 2026</p>
          <h1>Good questions.<br/><em>Clear answers.</em></h1>
          <div className="ia-stage-lead-row">
            <p>What clients usually want to know before discussing a website, online store or digital project.</p>
            <Link className="ia-stage-primary" to="/start-project">Start a conversation <ArrowUpRight size={19} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
      <section id="frequently-asked-questions" className="ia-home-faq p-section" aria-labelledby="faq-heading">
        <div className="p-container ia-faq-grid">
          <div>
            <p className="p-label">01 / Good to know</p>
            <h2 id="faq-heading">The details<br/><em>worth knowing.</em></h2>
            <p>Every project is different. These answers explain the general approach; your proposal confirms exactly what is included.</p>
            <Link to="/services" className="ia-text-action">Explore my services <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
          <div className="ia-faq-list">
            {projectFaqs.map((item,index) => (
              <details key={item.question} className="ia-faq-item">
                <summary><span>0{index+1}</span><strong>{item.question}</strong><span className="ia-faq-sign" aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><span className="p-label">Still have a question?</span><h2>Tell me what you're planning.<br/><em>Let's talk it through.</em></h2></div>
          <Link to="/start-project" className="ia-stage-primary">Start a project <ArrowUpRight size={18} aria-hidden="true"/></Link>
        </div>
      </section>
    </main>
  );
}
