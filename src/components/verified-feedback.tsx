import { verifiedFeedback } from "@/lib/verified-feedback";

/** Deliberately hidden until genuine, permissioned feedback is provided. */
export function VerifiedFeedbackSection() {
  if (verifiedFeedback.length === 0) return null;
  return (
    <section className="ia-verified-feedback p-section" aria-labelledby="ia-feedback-heading">
      <div className="p-container">
        <p className="p-label">Firsthand feedback / Approved for publication</p>
        <h2 id="ia-feedback-heading">In their <em>own words.</em></h2>
        <div className="ia-verified-feedback-grid">
          {verifiedFeedback.map((entry) => (
            <figure key={entry.speaker + entry.quote}>
              <blockquote>“{entry.quote}”</blockquote>
              <figcaption><strong>{entry.speaker}</strong><span>{entry.approvedRole}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
