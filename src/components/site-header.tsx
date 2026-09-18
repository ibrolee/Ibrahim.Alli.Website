import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["About", "/about"],
  ["Work", "/#work"],
  ["Web Development", "/#web-development"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-mark" aria-label="Ibrahim Alli home">
          <span>Ibrahim</span><strong>Alli</strong><i>.</i>
        </Link>

        <nav aria-label="Primary navigation" className="desktop-nav">
          {nav.map(([label, href]) =>
            href.startsWith("/") && href.includes("#") && onHome ? (
              <a key={label} href={href} className="nav-link">{label}</a>
            ) : href.includes("#") ? (
              <Link key={label} to="/" hash={href.split("#")[1]} className="nav-link">{label}</Link>
            ) : (
              <Link key={label} to={href} className="nav-link">{label}</Link>
            ),
          )}
          <Link to="/" hash="contact" className="nav-cta">Let’s talk <span>↗</span></Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="mobile-trigger"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={open ? "mobile-menu open" : "mobile-menu"}>
        <nav aria-label="Mobile navigation">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/" hash="work" onClick={() => setOpen(false)}>Work</Link>
          <Link to="/" hash="web-development" onClick={() => setOpen(false)}>Web Development</Link>
          <Link to="/" hash="contact" onClick={() => setOpen(false)} className="mobile-talk">
            Let’s talk <span>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}