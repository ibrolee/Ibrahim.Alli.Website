import "@/superplus-showcase.css";

/** Live public-page captures; no customer or staff account data is included. */
export function SuperplusProjectVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`spf-project-visual ${className}`}
      role="img"
      aria-label="Super Plus Fitness website, membership plans, staff portals and member app presentation"
    >
      <div className="spf-cover-heading">
        <span>SUPER PLUS FITNESS & SPA</span>
        <strong>
          One business.
          <br />A connected experience.
        </strong>
        <small>WEBSITE · MEMBERSHIPS · PORTALS · APP</small>
      </div>
      <div className="spf-cover-desktop">
        <div className="spf-screen-bar">
          <i />
          <i />
          <i />
          <span>superplusfitness.com</span>
        </div>
        <img
          src="/project-screens/spf-home.webp"
          alt=""
          width="1363"
          height="936"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="spf-cover-membership">
        <img
          src="/project-screens/spf-membership.webp"
          alt=""
          width="1363"
          height="936"
          loading="lazy"
          decoding="async"
        />
        <span>Memberships & payments</span>
      </div>
      <div className="spf-cover-app">
        <img
          src="/project-screens/spf-app-page.webp"
          alt=""
          width="1363"
          height="936"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="spf-cover-footer">
        <span>From first visit to everyday operations.</span>
        <span>DESIGN + DEVELOPMENT</span>
      </div>
    </div>
  );
}
