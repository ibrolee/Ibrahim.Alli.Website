import { Link } from "@tanstack/react-router";
export function SiteFooter() { return <footer className="bg-ink px-5 pb-10 pt-20 text-paper md:px-10 md:pt-28">
  <div className="mx-auto max-w-[1480px]">
    <p className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-none">Ibrahim Alli<span className="text-accent-mark">.</span></p>
    <div className="mt-12 flex flex-col justify-between gap-8 border-t border-paper/20 pt-7 text-sm text-paper/60 md:flex-row md:items-end">
      <div><p className="text-paper">Ibrahim — Builder, Creator & Entrepreneur</p><p className="mt-2">© 2026 Ibrahim. All rights reserved.</p></div>
      <div className="flex flex-wrap gap-5"><Link to="/">Home</Link><a href="/#about">About</a><a href="/#projects">Projects</a><a href="/#contact">Contact</a></div>
    </div>
  </div>
</footer> }
