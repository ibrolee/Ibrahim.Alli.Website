import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Maximize2, Users, Waves } from "lucide-react";
import { SolaireHeader, SOLAIRE, solaireRooms } from "@/components/solaire-house";

export const Route = createFileRoute("/solaire-house/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — Solaire House Concept" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <main className="sol-page">
      <div className="sol-concept-bar"><span>Independent hospitality concept</span><span>Rooms & suites</span></div>
      <SolaireHeader />
      <section className="sol-subhero">
        <img src={SOLAIRE.suite} alt="Solaire House suite"/>
        <div className="sol-subhero-overlay"/>
        <div>
          <span>STAY YOUR WAY</span>
          <h1>Pick your<br/><em>kind of easy.</em></h1>
          <p>Three different ways to do the same thing: arrive, exhale and stay longer than planned.</p>
        </div>
      </section>

      <section className="sol-rooms-list">
        <div className="sol-rooms-heading">
          <div><span>ROOMS & SUITES</span><h2>Sleep well.<br/><em>Wake up better.</em></h2></div>
          <p>Every room includes breakfast, beach access, Wi‑Fi, air conditioning and easy service.</p>
        </div>
        <div className="sol-rooms-stack">
          {solaireRooms.map((room) => (
            <article key={room.id} className="sol-room-row">
              <div className="sol-room-row-image"><img src={room.image} alt={room.name}/><span>{room.tag}</span></div>
              <div className="sol-room-row-body">
                <div className="sol-room-row-title">
                  <div><h3>{room.name}</h3><p>{room.desc}</p></div>
                  <strong>From ₦{room.price.toLocaleString()}<small>/ night</small></strong>
                </div>
                <div className="sol-meta">
                  <span><BedDouble size={15}/> King bed</span>
                  <span><Users size={15}/> 2 guests</span>
                  <span><Maximize2 size={15}/> {room.size}</span>
                </div>
                <Link to="/solaire-house/rooms/$roomId" params={{ roomId: room.id }}>
                  See the room <ArrowRight size={16}/>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sol-included">
        <div><Waves size={24}/><h3>Beach access</h3><p>Step out and the coast is right there.</p></div>
        <div><BedDouble size={24}/><h3>Breakfast included</h3><p>Slow mornings are part of the rate.</p></div>
        <div><Users size={24}/><h3>Easy service</h3><p>Friendly, relaxed and never over-formal.</p></div>
      </section>

      <section className="sol-big-cta">
        <span>READY TO PICK A ROOM?</span>
        <h2>Make it a<br/><em>weekend.</em></h2>
        <Link to="/solaire-house/booking">Check availability <ArrowRight size={17}/></Link>
      </section>
    </main>
  );
}
