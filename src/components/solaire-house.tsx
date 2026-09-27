import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const SOLAIRE = {
  hero: "https://solaire-house-lagos.floot.app/_cdn/static/cee59675-9fc7-42ff-80a8-55e402f6b1a1-solaire-ng-hero.png",
  suite: "https://solaire-house-lagos.floot.app/_cdn/static/abb39e04-e3af-4bd4-95bc-dd2336bff802-solaire-ng-suite.png",
  pool: "https://solaire-house-lagos.floot.app/_cdn/static/698b172a-a861-40ef-a4eb-099eceac8d54-solaire-ng-pool.png",
  dining: "https://solaire-house-lagos.floot.app/_cdn/static/e95eefb2-5d4e-4413-ae16-b423f0bc55bd-solaire-ng-dining.png",
  beach: "https://solaire-house-lagos.floot.app/_cdn/static/a22c584a-3166-4dba-b0d5-e1a376d3c588-solaire-ng-beach.png",
};

export const solaireRooms = [
  {
    id: "ocean-suite",
    name: "Ocean Suite",
    tag: "Most loved",
    price: 220000,
    desc: "King bed · private terrace · ocean view",
    size: "48 sqm",
    image: SOLAIRE.suite,
  },
  {
    id: "pool-house",
    name: "Pool House",
    tag: "Poolside",
    price: 285000,
    desc: "King bed · poolside access · breakfast included",
    size: "62 sqm",
    image: SOLAIRE.pool,
  },
  {
    id: "beach-cabana",
    name: "Beach Cabana",
    tag: "Beachfront",
    price: 185000,
    desc: "King bed · beach access · breakfast included",
    size: "41 sqm",
    image: SOLAIRE.beach,
  },
] as const;

export function SolaireHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sol-header">
        <Link to="/solaire-house/" className="sol-brand" aria-label="Solaire House home">
          SOLAIRE <span>HOUSE</span>
        </Link>
        <nav className="sol-nav" aria-label="Solaire navigation">
          <Link to="/solaire-house/rooms">Stay</Link>
          <a href="/solaire-house/#experience">Experiences</a>
          <a href="/solaire-house/#dine">Dine</a>
          <a href="/solaire-house/#wellness">Wellness</a>
          <a href="/solaire-house/#gallery">Gallery</a>
        </nav>
        <Link to="/solaire-house/booking" className="sol-book">Book your stay</Link>
        <button className="sol-menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </header>
      {open && (
        <nav className="sol-mobile-nav">
          <Link to="/solaire-house/rooms" onClick={()=>setOpen(false)}>Stay</Link>
          <a href="/solaire-house/#experience" onClick={()=>setOpen(false)}>Experiences</a>
          <a href="/solaire-house/#dine" onClick={()=>setOpen(false)}>Dine</a>
          <a href="/solaire-house/#wellness" onClick={()=>setOpen(false)}>Wellness</a>
          <Link to="/solaire-house/booking" onClick={()=>setOpen(false)}>Check availability</Link>
        </nav>
      )}
    </>
  );
}
