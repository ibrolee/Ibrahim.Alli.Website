import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Coffee, MapPin, Palmtree, Sparkles, Sun, Waves } from "lucide-react";
import { SolaireHeader, SOLAIRE, solaireRooms } from "@/components/solaire-house";

export const Route = createFileRoute("/solaire-house/")({
  head: () => ({
    meta: [
      { title: "Solaire House — Hospitality Concept by Ibrahim Alli" },
      {
        name: "description",
        content:
          "A boutique beach-hotel concept for Lagos with rooms, experiences and an interactive booking flow.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SolaireHome,
});

function SolaireHome() {
  return (
    <main className="sol-page">
      <div className="sol-concept-bar">
        <span>Independent hospitality concept</span>
        <span>Ilashe · Lagos</span>
      </div>
      <SolaireHeader />

      <section className="sol-hero">
        <img src={SOLAIRE.hero} alt="Solaire House Nigerian beachfront resort" />
        <div className="sol-hero-overlay" />
        <div className="sol-hero-copy">
          <span className="sol-kicker">BEACH DAYS · SLOW MORNINGS · LAGOS</span>
          <h1>
            Check in.
            <br />
            <em>Switch off.</em>
          </h1>
          <p>
            A colourful boutique stay on the Lagos coast, imagined for weekends that feel
            further away than they are.
          </p>
          <Link to="/solaire-house/booking" className="sol-primary">
            Plan your stay <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="sol-availability">
        <div>
          <span>CHECK IN</span>
          <strong>Choose date</strong>
        </div>
        <div>
          <span>CHECK OUT</span>
          <strong>Choose date</strong>
        </div>
        <div>
          <span>GUESTS</span>
          <strong>2 guests</strong>
        </div>
        <Link to="/solaire-house/booking">
          Check availability <ArrowRight size={16} />
        </Link>
      </section>

      <section className="sol-intro">
        <div className="sol-section-head">
          <span>01 / SOLAIRE HOUSE</span>
          <h2>
            Lagos, but
            <br />
            <em>slower.</em>
          </h2>
        </div>
        <div className="sol-intro-copy">
          <p>
            A fictional boutique beach house built around warm Nigerian hospitality, relaxed
            design and an easy path from choosing a room to confirming a stay.
          </p>
          <div className="sol-mini-grid">
            <div><Sun size={21}/><strong>Bright days</strong><span>Coastal light and open spaces.</span></div>
            <div><Waves size={21}/><strong>Beach access</strong><span>The Atlantic just outside.</span></div>
            <div><Coffee size={21}/><strong>Slow mornings</strong><span>Breakfast comes with the room.</span></div>
          </div>
        </div>
      </section>

      <section className="sol-stay" id="stay">
        <div className="sol-stay-head">
          <div>
            <span>STAY YOUR WAY</span>
            <h2>
              Three ways
              <br />
              <em>to switch off.</em>
            </h2>
          </div>
          <Link to="/solaire-house/rooms">
            View all rooms <ArrowRight size={16}/>
          </Link>
        </div>
        <div className="sol-room-grid">
          {solaireRooms.map((room) => (
            <article className="sol-room-card" key={room.id}>
              <div className="sol-room-image">
                <img src={room.image} alt={room.name}/>
                <span>{room.tag}</span>
              </div>
              <div className="sol-room-body">
                <div>
                  <h3>{room.name}</h3>
                  <p>{room.desc}</p>
                </div>
                <strong>From ₦{room.price.toLocaleString()}<small>/ night</small></strong>
              </div>
              <Link to="/solaire-house/rooms/$roomId" params={{ roomId: room.id }}>
                View room <ArrowRight size={15}/>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sol-experience" id="experience">
        <img src={SOLAIRE.pool} alt="Pool club at Solaire House"/>
        <div className="sol-experience-overlay"/>
        <div className="sol-experience-copy">
          <span>02 / DO VERY LITTLE</span>
          <h2>
            Poolside first.
            <br />
            <em>Plans later.</em>
          </h2>
          <p>
            Swim, read, eat, disappear into the afternoon. The experience is deliberately
            uncomplicated.
          </p>
          <div className="sol-pill-row">
            <span><Palmtree size={15}/> Pool club</span>
            <span><Waves size={15}/> Beach days</span>
            <span><Sparkles size={15}/> Private moments</span>
          </div>
        </div>
      </section>

      <section className="sol-dine" id="dine">
        <div className="sol-dine-copy">
          <span>03 / DINE</span>
          <h2>
            Dinner should
            <br />
            <em>take its time.</em>
          </h2>
          <p>
            Open-air dining, coastal flavours and the kind of sunset that makes a second
            drink feel completely reasonable.
          </p>
          <a href="#gallery">See the atmosphere <ArrowRight size={16}/></a>
        </div>
        <div className="sol-dine-image">
          <img src={SOLAIRE.dining} alt="Open-air dining at Solaire House"/>
        </div>
      </section>

      <section className="sol-wellness" id="wellness">
        <div>
          <span>04 / WELLNESS</span>
          <h2>
            Nothing urgent.
            <br />
            <em>That’s the point.</em>
          </h2>
        </div>
        <div className="sol-wellness-grid">
          <article><Sun size={22}/><h3>Morning stretch</h3><p>Quiet movement before the heat picks up.</p></article>
          <article><Waves size={22}/><h3>Ocean reset</h3><p>Beach walks, salt air and nowhere else to be.</p></article>
          <article><Sparkles size={22}/><h3>Slow treatments</h3><p>Simple wellness rituals built around rest.</p></article>
        </div>
      </section>

      <section className="sol-gallery" id="gallery">
        <img src={SOLAIRE.suite} alt="Solaire House suite"/>
        <img src={SOLAIRE.hero} alt="Solaire House exterior"/>
        <img src={SOLAIRE.beach} alt="Guests on the beach"/>
      </section>

      <section className="sol-location">
        <MapPin size={22}/>
        <span>ILASHE · LAGOS</span>
        <h2>
          Close enough
          <br />
          <em>to escape.</em>
        </h2>
        <p>
          A fictional coastal address inspired by Lagos beach-house weekends and private
          island hospitality.
        </p>
        <Link to="/solaire-house/booking">
          Check availability <CalendarDays size={17}/>
        </Link>
      </section>

      <footer className="sol-footer">
        <strong>SOLAIRE HOUSE</strong>
        <span>FICTIONAL PORTFOLIO CONCEPT · 2026</span>
      </footer>
    </main>
  );
}
