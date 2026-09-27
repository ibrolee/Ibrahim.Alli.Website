import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

const HERO =
  "https://solaire-house-lagos.floot.app/_cdn/static/de9e69b9-473b-4c24-b87e-b48e1beaf222.png";
const SUV =
  "https://solaire-house-lagos.floot.app/_cdn/static/ca0152e9-4d2f-40d3-9dd2-4eca6c9d2d6c.png";
const SEDAN =
  "https://solaire-house-lagos.floot.app/_cdn/static/ec6c4883-93e7-420a-a4bb-648baa69a23d.png";
const COUPE =
  "https://solaire-house-lagos.floot.app/_cdn/static/7f34dfd9-ac63-4181-9667-8627e9acb753.png";

const vehicles = [
  {
    name: "Range Rover Sport",
    year: "2025",
    category: "SUV",
    price: "₦285,000,000",
    mileage: "Delivery mileage",
    engine: "3.0L · AWD",
    image: SUV,
    tag: "Just arrived",
  },
  {
    name: "Mercedes-Benz E-Class",
    year: "2024",
    category: "Sedan",
    price: "₦165,000,000",
    mileage: "8,400 km",
    engine: "2.0L · RWD",
    image: SEDAN,
    tag: "Executive pick",
  },
  {
    name: "BMW M4 Competition",
    year: "2025",
    category: "Performance",
    price: "₦245,000,000",
    mileage: "1,200 km",
    engine: "3.0L · AWD",
    image: COUPE,
    tag: "Performance",
  },
];

const filters = ["All", "SUV", "Sedan", "Performance"];

export const Route = createFileRoute("/nova-autohaus/")({
  head: () => ({
    meta: [
      { title: "NOVA Autohaus — Automotive Concept by Ibrahim Alli" },
      {
        name: "description",
        content:
          "A private premium automotive dealership homepage concept for Lagos, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NovaAutohausHome,
});

function NovaAutohausHome() {
  const [active, setActive] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleVehicles = useMemo(
    () =>
      active === "All"
        ? vehicles
        : vehicles.filter((vehicle) => vehicle.category === active),
    [active],
  );

  return (
    <main className="nova-page">
      <div className="nova-concept-bar">
        <span>Independent automotive concept</span>
        <span>Lagos · Nigeria</span>
      </div>

      <header className="nova-header">
        <a href="#" className="nova-logo" aria-label="NOVA Autohaus home">
          <span className="nova-logo-mark">N</span>
          <span>
            NOVA
            <small>AUTOHAUS</small>
          </span>
        </a>

        <nav className="nova-nav" aria-label="NOVA navigation">
          <a href="#inventory">Inventory</a>
          <a href="#services">Buy & sell</a>
          <a href="#finance">Finance</a>
          <a href="#showroom">Showroom</a>
        </nav>

        <a href="#inventory" className="nova-header-cta">
          Find a car <ArrowRight size={16} />
        </a>

        <button
          className="nova-menu"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="nova-mobile-nav">
          <a href="#inventory" onClick={() => setMenuOpen(false)}>Inventory</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Buy & sell</a>
          <a href="#finance" onClick={() => setMenuOpen(false)}>Finance</a>
          <a href="#showroom" onClick={() => setMenuOpen(false)}>Showroom</a>
        </nav>
      )}

      <section className="nova-hero">
        <img src={HERO} alt="Premium automotive showroom in Lagos" />
        <div className="nova-hero-overlay" />
        <div className="nova-hero-copy">
          <span className="nova-kicker">CURATED CARS · VERIFIED HISTORY · LAGOS</span>
          <h1>
            Drive something
            <br />
            <em>worth arriving in.</em>
          </h1>
          <p>
            A modern way to discover premium vehicles in Lagos — carefully selected,
            clearly presented and easier to buy.
          </p>
          <div className="nova-hero-actions">
            <a href="#inventory" className="nova-primary">
              Browse inventory <ArrowRight size={17} />
            </a>
            <a href="#services" className="nova-secondary">
              Sell your car
            </a>
          </div>
        </div>

        <div className="nova-hero-proof">
          <div>
            <BadgeCheck size={17} />
            <span>Inspected inventory</span>
          </div>
          <div>
            <ShieldCheck size={17} />
            <span>Verified documentation</span>
          </div>
          <div>
            <CalendarDays size={17} />
            <span>Book a viewing</span>
          </div>
        </div>
      </section>

      <section className="nova-search-panel">
        <div className="nova-search-field">
          <Search size={18} />
          <div>
            <span>MAKE OR MODEL</span>
            <strong>What are you looking for?</strong>
          </div>
        </div>
        <div>
          <span>BODY TYPE</span>
          <strong>All vehicles</strong>
        </div>
        <div>
          <span>BUDGET</span>
          <strong>Any price</strong>
        </div>
        <a href="#inventory">
          Search inventory <SlidersHorizontal size={17} />
        </a>
      </section>

      <section className="nova-intro">
        <div className="nova-section-label">
          <span>01</span>
          <span>A better dealership experience</span>
        </div>
        <div className="nova-intro-grid">
          <h2>
            PREMIUM CARS.
            <br />
            <em>LESS GUESSWORK.</em>
          </h2>
          <div>
            <p>
              NOVA is a fictional Lagos dealership concept built around the things buyers
              actually want to know: condition, history, price, finance options and what
              happens next.
            </p>
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
          <div>
            <span className="nova-blue-label">FEATURED INVENTORY</span>
            <h2>
              Cars we’d put
              <br />
              <em>on your shortlist.</em>
            </h2>
          </div>
          <p>
            Explore a curated mix of premium SUVs, executive sedans and performance cars.
          </p>
        </div>

        <div className="nova-filter-row" role="tablist" aria-label="Vehicle categories">
          {filters.map((filter) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === filter}
              className={active === filter ? "nova-filter-active" : "nova-filter"}
              onClick={() => setActive(filter)}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="nova-vehicle-grid">
          {visibleVehicles.map((vehicle) => (
            <article className="nova-vehicle-card" key={vehicle.name}>
              <div className="nova-vehicle-image">
                <img src={vehicle.image} alt={vehicle.name} />
                <span>{vehicle.tag}</span>
                <button type="button" aria-label={"View " + vehicle.name}>
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="nova-vehicle-copy">
                <div className="nova-vehicle-title">
                  <div>
                    <span>{vehicle.year} · {vehicle.category}</span>
                    <h3>{vehicle.name}</h3>
                  </div>
                  <strong>{vehicle.price}</strong>
                </div>
                <div className="nova-specs">
                  <span><Gauge size={14} /> {vehicle.mileage}</span>
                  <span><CarFront size={14} /> {vehicle.engine}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a className="nova-inventory-link" href="#inventory">
          View all inventory <ArrowRight size={17} />
        </a>
      </section>

      <section className="nova-services" id="services">
        <div className="nova-section-head">
          <div>
            <span className="nova-blue-label">BUY · SELL · TRADE</span>
            <h2>
              More than a
              <br />
              <em>showroom floor.</em>
            </h2>
          </div>
          <p>
            The concept brings the key parts of a dealership into one clear digital journey.
          </p>
        </div>

        <div className="nova-service-grid">
          <article>
            <CarFront size={25} />
            <span>01</span>
            <h3>Buy with clarity</h3>
            <p>Useful specs, transparent pricing and a straightforward enquiry path.</p>
            <a href="#inventory">Explore cars <ArrowRight size={15} /></a>
          </article>
          <article>
            <CircleDollarSign size={25} />
            <span>02</span>
            <h3>Finance your next car</h3>
            <p>Compare deposits and monthly estimates before starting an application.</p>
            <a href="#finance">See finance <ArrowRight size={15} /></a>
          </article>
          <article>
            <Sparkles size={25} />
            <span>03</span>
            <h3>Sell or trade in</h3>
            <p>Submit your vehicle details and get a valuation conversation started quickly.</p>
            <a href="#showroom">Get a valuation <ArrowRight size={15} /></a>
          </article>
        </div>
      </section>

      <section className="nova-finance" id="finance">
        <div className="nova-finance-copy">
          <span>FINANCE, MADE CLEARER</span>
          <h2>
            Know the numbers
            <br />
            <em>before the showroom.</em>
          </h2>
          <p>
            A future full version could let customers estimate deposits, monthly payments
            and finance terms directly from each vehicle page.
          </p>
          <a href="#inventory">
            Explore finance-ready cars <ArrowRight size={16} />
          </a>
        </div>
        <div className="nova-finance-card">
          <span>EXAMPLE ESTIMATE</span>
          <strong>₦165,000,000</strong>
          <div>
            <p><span>Deposit</span><b>₦49.5M</b></p>
            <p><span>Term</span><b>36 months</b></p>
            <p><span>Estimated monthly</span><b>₦4.6M</b></p>
          </div>
          <small>Illustrative concept figures only.</small>
        </div>
      </section>

      <section className="nova-showroom" id="showroom">
        <img src={HERO} alt="NOVA Autohaus showroom concept" />
        <div className="nova-showroom-overlay" />
        <div className="nova-showroom-copy">
          <MapPin size={22} />
          <span>VICTORIA ISLAND · LAGOS</span>
          <h2>
            See it properly.
            <br />
            <em>Then decide.</em>
          </h2>
          <p>
            Book a private viewing, inspect the vehicle and take a proper test drive before
            making a decision.
          </p>
          <a href="#inventory">
            Book a showroom visit <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <footer className="nova-footer">
        <div className="nova-footer-brand">
          <span>N</span>
          <strong>NOVA AUTOHAUS</strong>
        </div>
        <div className="nova-footer-links">
          <a href="#inventory">Inventory</a>
          <a href="#services">Buy & sell</a>
          <a href="#finance">Finance</a>
          <a href="#showroom">Showroom</a>
        </div>
        <div className="nova-footer-bottom">
          <span>FICTIONAL PORTFOLIO CONCEPT · 2026</span>
          <span>LAGOS · NIGERIA</span>
        </div>
      </footer>
    </main>
  );
}
