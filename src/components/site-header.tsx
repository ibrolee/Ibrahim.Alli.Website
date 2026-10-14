import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, MoveUpRight } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

const discoverLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "My work" },
  { to: "/photography", label: "Photography" },
  { to: "/about", label: "About me" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
] as const;

const businessLinks = [
  { to: "/insights", label: "Guides" },
  { to: "/free-website-audit", label: "Free website audit" },
  { to: "/client-onboarding", label: "Client onboarding" },
  { to: "/website-maintenance", label: "Maintenance" },
] as const;

const moreLinks = [discoverLinks[0], discoverLinks[5], ...businessLinks];

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
          <Link to="/work" activeProps={{ className: "p-active" }}>
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
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button type="button" className="ia-desktop-more">
                More <ChevronDown size={14} aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ia-desktop-menu" align="end" sideOffset={16}>
              {moreLinks.map(({ to, label }) => (
                <DropdownMenuItem key={to} asChild>
                  <Link to={to} activeOptions={{ exact: true }} activeProps={{ className: "ia-current" }}>
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
          <SheetContent className="p-mobile-sheet ia-compact-menu" side="right">
            <SheetTitle>Explore<span className="ia-menu-dot">.</span></SheetTitle>
            <SheetDescription>Find exactly what you need.</SheetDescription>
            <nav className="ia-mobile-nav" aria-label="Mobile navigation">
              <div className="ia-menu-section">
                <span className="ia-menu-group-label">Discover</span>
                <div className="ia-menu-grid">
                  {discoverLinks.map(({ to, label }) => (
                    <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>
                  ))}
                </div>
              </div>
              <div className="ia-menu-section">
                <span className="ia-menu-group-label">For your business</span>
                <div className="ia-menu-grid ia-menu-grid-tools">
                  {businessLinks.map(({ to, label }) => (
                    <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>
                  ))}
                </div>
              </div>
              <Link to="/start-project" className="ia-menu-cta" onClick={() => setOpen(false)}>
                Start a project <MoveUpRight size={18} aria-hidden="true" />
              </Link>
            </nav>
            <p className="ia-menu-signature">Design · Digital · Business</p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
