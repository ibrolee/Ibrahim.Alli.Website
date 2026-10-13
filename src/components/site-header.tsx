import { Link } from "@tanstack/react-router";
import { Menu, MoveUpRight } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="p-header">
      <div className="p-container p-header-inner">
        <Link to="/" className="p-logo" aria-label="Ibrahim Alli home">
          <span className="p-brand-dot" aria-hidden="true" />
          <span className="p-brand-lockup">
            <strong>IBRAHIM <span>ALLI</span></strong>
            <small>DESIGN · DEVELOPMENT · PHOTOGRAPHY</small>
          </span>
        </Link>
        <nav className="p-desktop-nav" aria-label="Primary navigation">
          <Link to="/" hash="work">
            Projects
          </Link>
          <Link to="/photography" activeProps={{ className: "p-active" }}>
            Gallery
          </Link>
          <Link to="/about" activeProps={{ className: "p-active" }}>
            About me
          </Link>
          <Link to="/services" activeProps={{ className: "p-active" }}>
            Services
          </Link>
          <Link className="p-nav-contact" to="/start-project" activeProps={{ className: "p-active" }}>
            Start a project <MoveUpRight size={15} />
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="p-menu-button"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu size={23} aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent className="p-mobile-sheet" side="right">
            <SheetTitle>Explore</SheetTitle>
            <SheetDescription>Work, photography, background and ways to get in touch.</SheetDescription>
            <nav aria-label="Mobile navigation">
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/" hash="work" onClick={() => setOpen(false)}>
                Selected work
              </Link>
              <Link to="/photography" onClick={() => setOpen(false)}>
                Photography
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About me
              </Link>
              <Link to="/services" onClick={() => setOpen(false)}>
                Services
              </Link>
              <Link to="/start-project" onClick={() => setOpen(false)}>
                Start a project ↗
              </Link>
            </nav>
            <p>Design · Digital · Business</p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
