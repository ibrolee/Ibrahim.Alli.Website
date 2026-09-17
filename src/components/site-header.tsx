import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["About", "/#about"], ["Experience", "/#experience"], ["Education", "/#education"],
  ["Skills", "/#skills"], ["Projects", "/#projects"], ["Web Development", "/#web-development"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="mx-auto flex h-18 max-w-[1480px] items-center justify-between px-5 md:px-10">
      <Link to="/" className="font-display text-xl font-semibold text-foreground">Ibrahim Alli<span className="text-accent-mark">.</span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
        {nav.map(([label, href]) => <a key={label} href={onHome ? href : href} className="text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}
        <a href="/#contact" className="border-b border-foreground pb-1 text-[12px] font-semibold text-foreground">Let’s Talk</a>
      </nav>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    <div className={open ? "mobile-menu open" : "mobile-menu"}>
      <nav className="flex flex-col px-5 py-7" aria-label="Mobile navigation">
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-2xl">{label}</a>)}
        <a href="/#contact" onClick={() => setOpen(false)} className="mt-6 text-sm font-semibold text-accent-mark">Let’s Talk →</a>
      </nav>
    </div>
  </header>;
}
