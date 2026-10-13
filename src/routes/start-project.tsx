import { createFileRoute, Link } from "@tanstack/react-router";
import { track } from "@vercel/analytics";
import { useRef, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Mail, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { services } from "@/lib/freelance-services";

const DESTINATION_EMAIL = "alliibrahim3@gmail.com";
const WHATSAPP_NUMBER = "905488534011";

const serviceLabels: Record<(typeof services)[number]["slug"], string> = {
  "business-websites": "Business website",
  "e-commerce": "E-commerce store",
  "mobile-apps": "Mobile app",
  "business-systems": "Business system",
  "website-redesign": "Website improvement",
  "website-maintenance": "Website maintenance",
};

export const Route = createFileRoute("/start-project")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : "",
    plan: typeof search.plan === "string" ? search.plan.slice(0,60) : "",
  }),
  head: () => ({
    meta: [
      { title: "Start a Project — Ibrahim Alli" },
      { name: "description", content: "Tell Ibrahim Alli about your business, website, app or digital system. Share a short project brief to start an honest conversation and receive a tailored proposal." },
      { property: "og:title", content: "Start a Project — Ibrahim Alli" },
      { property: "og:description", content: "Have a website or digital project in mind? Let's talk through the goal, budget and next steps." },
      { property: "og:url", content: "https://ibrahimalli.com/start-project" },
    ],
    links: [{ rel: "canonical", href: "https://ibrahimalli.com/start-project" }],
  }),
  component: StartProjectPage,
});

function StartProjectPage() {
  const { service, plan } = Route.useSearch();
  const formRef = useRef<HTMLFormElement>(null);
  const selectedService = Object.prototype.hasOwnProperty.call(serviceLabels, service) ? service : "not-sure";

  function buildBrief() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;
    const data = new FormData(form);
    const get = (field: string) => String(data.get(field) ?? "").trim();
    const serviceName = serviceLabels[get("service") as keyof typeof serviceLabels] ?? "Not sure yet";
    const brief = [
      "Hello Ibrahim,",
      "",
      "I'd like to discuss a digital project. Here is my brief:",
      "",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Business / brand: ${get("business") || "Not provided"}`,
      `Project type: ${serviceName}`,
      ...(get("plan") ? [`Support option: ${get("plan")}`] : []),
      `Budget range: ${get("budget") || "To be discussed"}`,
      `Target timeline: ${get("timeline") || "Flexible"}`,
      "",
      "What I need:",
      get("details"),
      "",
      "Please let me know the best next step.",
    ].join("\n");

    return { brief, serviceName };
  }

  function sendVia(method: "email" | "whatsapp") {
    const payload = buildBrief();
    if (!payload) return;
    // Records only a click to open the chosen app, never a completed enquiry or personal details.
    track("portfolio_enquiry_handoff", { channel: method, service: payload.serviceName });
    if (method === "email") {
      const subject = encodeURIComponent(`Project enquiry — ${payload.serviceName}`);
      window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${encodeURIComponent(payload.brief)}`;
    } else {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(payload.brief)}`, "_blank", "noopener,noreferrer");
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendVia("email");
  }

  return (
    <main id="main-content" className="ia-stage-page">
      <section className="ia-stage-hero ia-enquiry-hero">
        <div className="p-container ia-stage-hero-inner">
          <Link to="/" className="ia-stage-back"><ArrowLeft size={17} aria-hidden="true" /> Back to home</Link>
          <p className="p-label">New project / Start here</p>
          <h1>Something in mind?<br /><em>Let's make it real.</em></h1>
          <div className="ia-stage-lead-row">
            <p>A few details help me understand what you're building. No complicated brief needed — just tell me where you'd like to start.</p>
            <span className="ia-enquiry-badge"><Sparkles size={17} aria-hidden="true" /> Thoughtful design. Honest scope.</span>
          </div>
        </div>
      </section>
      <section className="ia-enquiry-section">
        <div className="p-container ia-enquiry-layout">
          <div className="ia-enquiry-side">
            <p className="p-label">01 / Your idea</p>
            <h2>Tell me about<br /><em>your project.</em></h2>
            <p>I'll use these answers as a starting point for understanding your goals, not as an automatic quote or a commitment to a fixed price.</p>
            <div className="ia-enquiry-support">
              <div><CheckCircle2 size={19} aria-hidden="true" /><span>Clear project scope before pricing</span></div>
              <div><CheckCircle2 size={19} aria-hidden="true" /><span>Mobile-friendly design as a priority</span></div>
              <div><CheckCircle2 size={19} aria-hidden="true" /><span>Direct conversation with me</span></div>
            </div>
            <div className="ia-4a-side-links">
              <Link to="/services" className="ia-text-action">Explore all services <ArrowRight size={17} aria-hidden="true"/></Link>
              <Link to="/free-website-audit" className="ia-text-action">Request a free website audit <ArrowRight size={17} aria-hidden="true"/></Link>
              <Link to="/website-maintenance" className="ia-text-action">Explore website maintenance <ArrowRight size={17} aria-hidden="true"/></Link>
            </div>
          </div>
          <div className="ia-enquiry-card">
            <div className="ia-enquiry-card-heading">
              <div><span className="p-label">Project enquiry</span><h2>The essentials.</h2></div>
              <span>01—06 / A short brief</span>
            </div>
            <form ref={formRef} onSubmit={onSubmit} className="ia-enquiry-form">
              <input type="hidden" name="plan" value={plan} readOnly/>
              <div className="ia-field-row">
                <label className="ia-field"><span>Your name <strong>*</strong></span><input name="name" placeholder="What should I call you?" autoComplete="name" maxLength={90} required /></label>
                <label className="ia-field"><span>Email address <strong>*</strong></span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={150} required /></label>
              </div>
              <label className="ia-field"><span>Business or brand name <small>(optional)</small></span><input name="business" placeholder="Your business or idea" autoComplete="organization" maxLength={120} /></label>
              <div className="ia-field-row">
                <label className="ia-field"><span>What do you need? <strong>*</strong></span>
                  <select name="service" defaultValue={selectedService} required>
                    <option value="not-sure">Not sure yet</option>
                    {services.map((item) => <option key={item.slug} value={item.slug}>{serviceLabels[item.slug]}</option>)}
                    <option value="website-maintenance">Website maintenance</option>
                  </select>
                </label>
                <label className="ia-field"><span>When would you like to start?</span>
                  <select name="timeline" defaultValue="flexible">
                    <option value="flexible">I'm flexible</option>
                    <option value="As soon as reasonably possible">As soon as possible</option>
                    <option value="Within 1 month">Within a month</option>
                    <option value="In 1–3 months">In 1–3 months</option>
                    <option value="Still exploring">Just exploring</option>
                  </select>
                </label>
              </div>
              <label className="ia-field"><span>Budget range <small>(optional)</small></span>
                <input name="budget" placeholder="e.g. ₦300,000, £800, or let's discuss" maxLength={90} />
              </label>
              <label className="ia-field"><span>Describe your project <strong>*</strong></span>
                <textarea name="details" rows={5} maxLength={1200} minLength={15} required placeholder="Tell me what your business does, what you want people to do on the site, and any important features." />
              </label>
              <p className="ia-enquiry-note"><ShieldCheck size={17} aria-hidden="true" /> This form doesn't save or submit your details to a website server. Choose Email or WhatsApp below, review the prefilled message, and press Send in that app.</p>
              <div className="ia-enquiry-actions">
                <button type="submit" className="ia-stage-primary"><Mail size={18} aria-hidden="true"/> Continue in email <ArrowUpRight size={17} aria-hidden="true" /></button>
                <button type="button" onClick={() => sendVia("whatsapp")} className="ia-stage-outline"><MessageCircle size={19} aria-hidden="true" /> Continue in WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></button>
              </div>
              <p className="ia-enquiry-disclaimer">You remain in control: your enquiry is only sent when you confirm it in your chosen app. No payment or commitment is required to start a conversation.</p>
            </form>
          </div>
        </div>
      </section>
      <section className="ia-stage-end">
        <div className="p-container ia-stage-end-inner">
          <div><span className="p-label">Prefer an informal chat?</span><h2>Start with a hello.<br /><em>We'll figure it out together.</em></h2></div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Ibrahim, I'd like to discuss a new project.")}`} className="ia-stage-primary" target="_blank" rel="noopener noreferrer">Say hello on WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  );
}
