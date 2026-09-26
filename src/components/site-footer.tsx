import { Link } from "@tanstack/react-router";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ibroleee_?stkn=dHI2NHBocmNleHg4&utm_source=qr",
    icon: "instagram",
  },
  { label: "WhatsApp", href: "https://wa.me/905488534011", icon: "whatsapp" },
  {
    label: "Facebook",
    href: "https://m.facebook.com/horlayung/?mibextid=wwXIfr",
    icon: "facebook",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ibrolee_?_r=1&_t=ZS-99o0pp1Iml6",
    icon: "tiktok",
  },
] as const;

function SocialIcon({ type }: { type: (typeof socialLinks)[number]["icon"] }) {
  if (type === "instagram")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (type === "facebook")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14 21v-8h2.75l.5-3H14V8.05c0-.87.24-1.45 1.5-1.45h1.85V3.9A24 24 0 0 0 14.7 3C12.22 3 10.5 4.52 10.5 7.3V10H8v3h2.5v8H14Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  if (type === "tiktok")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14.3 3h3.05c.3 1.55 1.2 2.72 2.65 3.4v3.02c-1.1-.04-2.08-.32-2.95-.84v6.3c0 3.65-2.43 6.12-5.77 6.12A5.73 5.73 0 0 1 5.5 15.3c0-3.36 2.48-5.85 5.85-5.85.36 0 .72.04 1.06.1v3.13a2.86 2.86 0 0 0-1.06-.2c-1.55 0-2.72 1.1-2.72 2.77 0 1.5 1.08 2.7 2.65 2.7 1.64 0 3.02-1.12 3.02-3.5V3Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.5 3.5A11.8 11.8 0 0 0 12 0 11.94 11.94 0 0 0 .06 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.93 11.93 0 0 0 5.75 1.47h.01A11.94 11.94 0 0 0 24 11.89a11.82 11.82 0 0 0-3.5-8.39ZM12 21.74a9.8 9.8 0 0 1-5-1.37l-.36-.22-3.71.98.99-3.62-.24-.37a9.82 9.82 0 1 1 8.32 4.6Zm5.39-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="p-footer">
      <div className="p-container">
        <div className="p-footer-top">
          <Link to="/" className="p-footer-signature" aria-label="Home">
            ia.
          </Link>
          <p>Builder. Creator. Entrepreneur.</p>
          <a href="#main-content" className="p-back-top">
            Back to top ↑
          </a>
        </div>
        <div className="p-footer-bottom">
          <p>© {new Date().getFullYear()} Ibrahim Alli</p>
          <nav aria-label="Footer navigation">
            <Link to="/about">About</Link>
            <Link to="/" hash="work">
              Work
            </Link>
            <Link to="/" hash="web-development">
              Services
            </Link>
            <Link to="/" hash="contact">
              Contact
            </Link>
          </nav>
          <div className="footer-socials" aria-label="Social media">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon type={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
