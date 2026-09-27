import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight, BadgeCheck, CalendarDays, CarFront, CircleDollarSign, Gauge,
  MapPin, Search, ShieldCheck, SlidersHorizontal, Sparkles
} from "lucide-react";
import { NovaHeader, NOVA_ASSETS, novaVehicles, formatNaira } from "@/components/nova-autohaus";

const filters = ["All", "SUV", "Sedan", "Performance"] as const;

export const Route = createFileRoute("/nova-autohaus/")({
  head: () => ({
    meta: [
      { title: "NOVA Autohaus — Automotive Concept by Ibrahim Alli" },
      { name: "description", content: "A premium Lagos automotive dealership concept with inventory, finance, comparison and test-drive flows." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NovaHome,
});

function NovaHome() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => active === "All" ? novaVehicles.slice(0, 3) : novaVehicles.filter((v) => v.category === active).slice(0, 3),
    [active],
  );

  return (
    <main className="nova-page">
      <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Lagos · Nigeria</span></div>
      <NovaHeader />

      <section className="nova-hero">
        <img src={NOVA_ASSETS.hero} alt="Premium automotive showroom in Lagos" />
        <div className="nova-hero-overlay" />
        <div className="nova-hero-copy">
          <span className="nova-kicker">CURATED CARS · VERIFIED HISTORY · LAGOS</span>
          <h1>Drive something<br/><em>worth arriving in.</em></h1>
          <p>A modern way to discover premium vehicles in Lagos — carefully selected, clearly presented and easier to buy.</p>
          <div className="nova-hero-actions">
            <Link to="/nova-autohaus/inventory" className="nova-primary">Browse inventory <ArrowRight size={17}/></Link>
            <Link to="/nova-autohaus/sell" className="nova-secondary">Sell your car</Link>
          </div>
        </div>
        <div className="nova-hero-proof">
          <div><BadgeCheck size={17}/><span>Inspected inventory</span></div>
          <div><ShieldCheck size={17}/><span>Verified documentation</span></div>
          <div><CalendarDays size={17}/><span>Book a viewing</span></div>
        </div>
      </section>

      <section className="nova-search-panel">
        <div className="nova-search-field"><Search size={18}/><div><span>MAKE OR MODEL</span><strong>What are you looking for?</strong></div></div>
        <div><span>BODY TYPE</span><strong>All vehicles</strong></div>
        <div><span>BUDGET</span><strong>Any price</strong></div>
        <Link to="/nova-autohaus/inventory">Search inventory <SlidersHorizontal size={17}/></Link>
      </section>

      <section className="nova-intro">
        <div className="nova-section-label"><span>01</span><span>A better dealership experience</span></div>
        <div className="nova-intro-grid">
          <h2>PREMIUM CARS.<br/><em>LESS GUESSWORK.</em></h2>
          <div>
            <p>NOVA is a fictional Lagos dealership concept built around the things buyers actually want to know: condition, history, price, finance options and what happens next.</p>
            <div className="nova-intro-stats">
              <span><strong>40+</strong> curated vehicles</span>
              <span><strong>24hr</strong> viewing response</span>
              <span><strong>100%</strong> verified paperwork</span>
            </div>
          </div>
        </div>
      </section>

      <section className="nova-inventory" id="inventory">
        <div className="nova-section-head">
          <div><span className="nova-blue-label">FEATURED INVENTORY</span><h2>Cars we’d put<br/><em>on your shortlist.</em></h2></div>
          <p>Explore a curated mix of premium SUVs, executive sedans and performance cars.</p>
        </div>

        <div className="nova-filter-row" role="tablist">
          {filters.map((filter)=>(
            <button key={filter} type="button" role="tab" aria-selected={active===filter} className={active===filter?"nova-filter-active":"nova-filter"} onClick={()=>setActive(filter)}>{filter}</button>
          ))}
        </div>

        <div className="nova-vehicle-grid">
          {visible.map((vehicle)=>(
            <article className="nova-vehicle-card" key={vehicle.id}>
              <Link to="/nova-autohaus/inventory/$vehicleId" params={{vehicleId: vehicle.id}} className="nova-vehicle-image">
                <img src={vehicle.image} alt={vehicle.name}/><span>{vehicle.tag}</span>
              </Link>
              <div className="nova-vehicle-copy">
                <div className="nova-vehicle-title"><div><span>{vehicle.year} · {vehicle.category}</span><h3>{vehicle.name}</h3></div><strong>{formatNaira(vehicle.price)}</strong></div>
                <div className="nova-specs"><span><Gauge size={14}/> {vehicle.mileage}</span><span><CarFront size={14}/> {vehicle.engine} · {vehicle.drivetrain}</span></div>
              </div>
            </article>
          ))}
        </div>
        <Link className="nova-inventory-link" to="/nova-autohaus/inventory">View all inventory <ArrowRight size={17}/></Link>
      </section>

      <section className="nova-services">
        <div className="nova-section-head">
          <div><span className="nova-blue-label">BUY · SELL · TRADE</span><h2>More than a<br/><em>showroom floor.</em></h2></div>
          <p>The concept brings the key parts of a dealership into one clear digital journey.</p>
        </div>
        <div className="nova-service-grid">
          <article><CarFront size={25}/><span>01</span><h3>Buy with clarity</h3><p>Useful specs, transparent pricing and a straightforward enquiry path.</p><Link to="/nova-autohaus/inventory">Explore cars <ArrowRight size={15}/></Link></article>
          <article><CircleDollarSign size={25}/><span>02</span><h3>Finance your next car</h3><p>Adjust deposits and terms before starting a conversation.</p><Link to="/nova-autohaus/finance">Try calculator <ArrowRight size={15}/></Link></article>
          <article><Sparkles size={25}/><span>03</span><h3>Sell or trade in</h3><p>Submit your vehicle details and get a valuation journey started.</p><Link to="/nova-autohaus/sell">Get a valuation <ArrowRight size={15}/></Link></article>
        </div>
      </section>

      <section className="nova-finance">
        <div className="nova-finance-copy">
          <span>FINANCE, MADE CLEARER</span><h2>Know the numbers<br/><em>before the showroom.</em></h2>
          <p>Use the demo calculator to see how deposit and term choices change the monthly estimate.</p>
          <Link to="/nova-autohaus/finance">Open finance calculator <ArrowRight size={16}/></Link>
        </div>
        <div className="nova-finance-card">
          <span>EXAMPLE ESTIMATE</span><strong>₦165,000,000</strong>
          <div><p><span>Deposit</span><b>₦49.5M</b></p><p><span>Term</span><b>36 months</b></p><p><span>Estimated monthly</span><b>₦4.6M</b></p></div>
          <small>Illustrative concept figures only.</small>
        </div>
      </section>

      <section className="nova-showroom">
        <img src={NOVA_ASSETS.hero} alt="NOVA Autohaus showroom"/><div className="nova-showroom-overlay"/>
        <div className="nova-showroom-copy">
          <MapPin size={22}/><span>VICTORIA ISLAND · LAGOS</span><h2>See it properly.<br/><em>Then decide.</em></h2>
          <p>Book a private viewing, inspect the vehicle and take a proper test drive before making a decision.</p>
          <Link to="/nova-autohaus/test-drive">Book a test drive <ArrowRight size={17}/></Link>
        </div>
      </section>

      <footer className="nova-footer">
        <div className="nova-footer-brand"><span>N</span><strong>NOVA AUTOHAUS</strong></div>
        <div className="nova-footer-links"><Link to="/nova-autohaus/inventory">Inventory</Link><Link to="/nova-autohaus/sell">Sell / trade</Link><Link to="/nova-autohaus/finance">Finance</Link><Link to="/nova-autohaus/compare">Compare</Link></div>
        <div className="nova-footer-bottom"><span>FICTIONAL PORTFOLIO CONCEPT · 2026</span><span>LAGOS · NIGERIA</span></div>
      </footer>
    </main>
  );
}