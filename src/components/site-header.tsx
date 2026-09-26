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
          ia<span>.</span>
        </Link>
        <nav className="p-desktop-nav" aria-label="Primary navigation">
          <Link to="/" hash="work">
            Selected work
          </Link>
          <Link to="/about" activeProps={{ className: "p-active" }}>
            About me
          </Link>
          <Link to="/" hash="web-development">
            Services
          </Link>
          <Link className="p-nav-contact" to="/" hash="contact">
            Let’s talk <MoveUpRight size={15} />
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-menu-button" aria-label="Open navigation menu">
              <span>Menu</span>
              <Menu size={21} />
            </button>
          </SheetTrigger>
          <SheetContent className="p-mobile-sheet" side="right">
            <SheetTitle>Explore</SheetTitle>
            <SheetDescription>Work, background and ways to get in touch.</SheetDescription>
            <nav aria-label="Mobile navigation">
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/" hash="work" onClick={() => setOpen(false)}>
                Selected work
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About me
              </Link>
              <Link to="/" hash="web-development" onClick={() => setOpen(false)}>
                Services
              </Link>
              <Link to="/" hash="contact" onClick={() => setOpen(false)}>
                Let’s talk ↗
              </Link>
            </nav>
            <p>Design · Digital · Business</p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
