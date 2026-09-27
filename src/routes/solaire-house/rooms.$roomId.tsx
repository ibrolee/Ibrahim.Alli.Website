import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BedDouble, Check, Maximize2, Users, Waves } from "lucide-react";
import { SolaireHeader, SOLAIRE, solaireRooms } from "@/components/solaire-house";

export const Route = createFileRoute("/solaire-house/rooms/$roomId")({
  loader: ({ params }) => {
    const room = solaireRooms.find((item) => item.id === params.roomId);
    if (!room) throw notFound();
    return room;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Solaire House Concept` : "Solaire House" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RoomDetailPage,
});

function RoomDetailPage() {
  const room = Route.useLoaderData();
  return (
    <main className="sol-page">
      <div className="sol-concept-bar"><span>Independent hospitality concept</span><span>Room detail</span></div>
      <SolaireHeader />
      <section className="sol-room-detail-hero">
        <img src={room.image} alt={room.name}/>
        <div className="sol-room-detail-overlay"/>
        <Link to="/solaire-house/rooms" className="sol-back"><ArrowLeft size={15}/> All rooms</Link>
        <div className="sol-room-detail-copy">
          <span>{room.tag}</span>
          <h1>{room.name}</h1>
          <p>{room.desc}. A relaxed Lagos coastal stay with natural textures and easy comfort.</p>
        </div>
      </section>

      <section className="sol-detail-summary">
        <div><BedDouble size={20}/><strong>King bed</strong><span>Sleep setup</span></div>
        <div><Users size={20}/><strong>2 guests</strong><span>Maximum occupancy</span></div>
        <div><Maximize2 size={20}/><strong>{room.size}</strong><span>Room size</span></div>
        <div><Waves size={20}/><strong>Beach access</strong><span>Included</span></div>
      </section>

      <section className="sol-detail-story">
        <div><span>ABOUT THIS STAY</span><h2>Easy mornings.<br/><em>Long afternoons.</em></h2></div>
        <div>
          <p>Designed as a believable boutique-hotel room for a Lagos weekend away, with practical comfort, warm local details and an uncomplicated stay.</p>
          <div className="sol-feature-list">
            {["Breakfast included","Fast Wi‑Fi","Air conditioning","Daily housekeeping","Welcome drink","Beach access"].map((item)=><span key={item}><Check size={14}/>{item}</span>)}
          </div>
          <Link to="/solaire-house/booking">Book this room <ArrowRight size={16}/></Link>
        </div>
      </section>

      <section className="sol-detail-gallery">
        <img src={SOLAIRE.hero} alt="Solaire House exterior"/>
        <img src={room.id === "pool-house" ? SOLAIRE.beach : SOLAIRE.dining} alt="Solaire House atmosphere"/>
      </section>

      <section className="sol-rate">
        <span>FROM</span>
        <strong>₦{room.price.toLocaleString()}</strong>
        <p>per night · breakfast included</p>
        <Link to="/solaire-house/booking">Check your dates <ArrowRight size={16}/></Link>
      </section>
    </main>
  );
}
