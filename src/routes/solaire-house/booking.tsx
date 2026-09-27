import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Users } from "lucide-react";
import { SolaireHeader, solaireRooms } from "@/components/solaire-house";

export const Route = createFileRoute("/solaire-house/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Stay — Solaire House Concept" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SolaireBooking,
});

function SolaireBooking() {
  const [step, setStep] = useState<"dates"|"room"|"details"|"done">("dates");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState<(typeof solaireRooms)[number]["id"]>("ocean-suite");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const room = solaireRooms.find((item) => item.id === roomId)!;
  const canContinue = useMemo(() => Boolean(checkIn && checkOut && guests), [checkIn, checkOut, guests]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (name && email && phone) setStep("done");
  }

  return (
    <main className="sol-page">
      <div className="sol-concept-bar"><span>Independent hospitality concept</span><span>Booking demo</span></div>
      <SolaireHeader />

      <section className="sol-booking-shell">
        <div className="sol-progress">
          <span className={step==="dates" ? "active" : ""}>01 Dates</span><i/>
          <span className={step==="room" ? "active" : ""}>02 Room</span><i/>
          <span className={step==="details" ? "active" : ""}>03 Details</span><i/>
          <span className={step==="done" ? "active" : ""}>04 Done</span>
        </div>

        {step === "dates" && (
          <div className="sol-book-panel">
            <span className="sol-panel-kicker">CHECK AVAILABILITY</span>
            <h1>When are you<br/>coming <em>over?</em></h1>
            <div className="sol-date-grid">
              <label><span><CalendarDays size={15}/> Check in</span><input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)}/></label>
              <label><span><CalendarDays size={15}/> Check out</span><input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}/></label>
            </div>
            <div className="sol-guests">
              <span><Users size={15}/> Guests</span>
              <div>{[1,2,3,4].map((n)=><button type="button" className={guests===n ? "active" : ""} onClick={()=>setGuests(n)} key={n}>{n}</button>)}</div>
            </div>
            <button type="button" className="sol-next" disabled={!canContinue} onClick={()=>setStep("room")}>See available rooms <ArrowRight size={17}/></button>
          </div>
        )}

        {step === "room" && (
          <div className="sol-book-panel">
            <button type="button" className="sol-back-button" onClick={()=>setStep("dates")}><ArrowLeft size={14}/> Change dates</button>
            <span className="sol-panel-kicker">AVAILABLE FOR YOUR STAY</span>
            <h1>Choose your<br/><em>room.</em></h1>
            <div className="sol-book-room-list">
              {solaireRooms.map((item)=>(
                <button type="button" key={item.id} className={roomId===item.id ? "selected" : ""} onClick={()=>setRoomId(item.id)}>
                  <img src={item.image} alt={item.name}/>
                  <span><strong>{item.name}</strong><small>₦{item.price.toLocaleString()} / night</small></span>
                  {roomId===item.id && <Check size={18}/>}
                </button>
              ))}
            </div>
            <button type="button" className="sol-next" onClick={()=>setStep("details")}>Continue <ArrowRight size={17}/></button>
          </div>
        )}

        {step === "details" && (
          <form className="sol-book-panel" onSubmit={submit}>
            <button type="button" className="sol-back-button" onClick={()=>setStep("room")}><ArrowLeft size={14}/> Change room</button>
            <span className="sol-panel-kicker">GUEST DETAILS</span>
            <h1>Nearly<br/><em>there.</em></h1>
            <div className="sol-book-summary">
              <span>{room.name}</span><span>{checkIn} → {checkOut}</span><span>{guests} guest{guests>1?"s":""}</span>
            </div>
            <div className="sol-form-grid">
              <label><span>Full name</span><input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name"/></label>
              <label><span>Phone</span><input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></label>
              <label className="full"><span>Email</span><input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
            </div>
            <p className="sol-demo-note">Concept demo only — no payment is taken and no real reservation is created.</p>
            <button className="sol-next" type="submit">Confirm demo booking <ArrowRight size={17}/></button>
          </form>
        )}

        {step === "done" && (
          <div className="sol-done">
            <div className="sol-done-icon"><Check size={28}/></div>
            <span>STAY CONFIRMED</span>
            <h1>See you by<br/>the <em>water.</em></h1>
            <p>In a live hotel system, this would trigger confirmation and add the reservation to the property dashboard.</p>
            <div className="sol-confirm-grid">
              <div><span>ROOM</span><strong>{room.name}</strong></div>
              <div><span>GUEST</span><strong>{name}</strong></div>
              <div><span>DATES</span><strong>{checkIn} → {checkOut}</strong></div>
              <div><span>GUESTS</span><strong>{guests}</strong></div>
            </div>
            <Link to="/solaire-house/">Back to Solaire House <ArrowRight size={16}/></Link>
          </div>
        )}
      </section>
    </main>
  );
}
