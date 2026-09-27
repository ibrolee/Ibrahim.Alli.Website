import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, CarFront, Check, Gauge, ShieldCheck } from "lucide-react";
import { NovaHeader, novaVehicles, formatNaira } from "@/components/nova-autohaus";

export const Route = createFileRoute("/nova-autohaus/inventory/$vehicleId")({
  loader: ({params}) => {
    const vehicle=novaVehicles.find((item)=>item.id===params.vehicleId);
    if(!vehicle) throw notFound();
    return vehicle;
  },
  head: ({loaderData}) => ({
    meta:[
      {title: loaderData ? `${loaderData.name} — NOVA Autohaus Concept` : "NOVA Autohaus"},
      {name:"robots",content:"noindex, nofollow"},
    ],
  }),
  component: VehicleDetailPage,
});

function VehicleDetailPage(){
  const vehicle=Route.useLoaderData();
  return <main className="nova-page">
    <div className="nova-concept-bar"><span>Independent automotive concept</span><span>Vehicle detail</span></div>
    <NovaHeader/>

    <section className="nova-detail-head">
      <Link to="/nova-autohaus/inventory" className="nova-detail-back"><ArrowLeft size={15}/> Inventory</Link>
      <div className="nova-detail-title"><div><span>{vehicle.year} · {vehicle.category} · {vehicle.tag}</span><h1>{vehicle.name}</h1></div><strong>{formatNaira(vehicle.price)}</strong></div>
    </section>

    <section className="nova-detail-image"><img src={vehicle.image} alt={vehicle.name}/><span>01 / 04</span></section>

    <section className="nova-detail-specbar">
      <div><Gauge size={19}/><strong>{vehicle.mileage}</strong><span>Mileage</span></div>
      <div><CarFront size={19}/><strong>{vehicle.engine}</strong><span>Engine</span></div>
      <div><strong>{vehicle.drivetrain}</strong><span>Drivetrain</span></div>
      <div><strong>{vehicle.transmission}</strong><span>Transmission</span></div>
    </section>

    <section className="nova-detail-story">
      <div><span>THE CAR</span><h2>Know what<br/><em>you’re buying.</em></h2></div>
      <div>
        <p>{vehicle.description} NOVA’s detail page is designed to make condition, specification and next steps easy to understand before a showroom visit.</p>
        <div className="nova-detail-badges"><span><BadgeCheck size={16}/> Inspection checked</span><span><ShieldCheck size={16}/> Documentation verified</span></div>
      </div>
    </section>

    <section className="nova-detail-specs">
      <div><span>EXTERIOR</span><strong>{vehicle.exterior}</strong></div>
      <div><span>INTERIOR</span><strong>{vehicle.interior}</strong></div>
      <div><span>FUEL</span><strong>{vehicle.fuel}</strong></div>
      <div><span>TRANSMISSION</span><strong>{vehicle.transmission}</strong></div>
      <div><span>DRIVETRAIN</span><strong>{vehicle.drivetrain}</strong></div>
      <div><span>MODEL YEAR</span><strong>{vehicle.year}</strong></div>
    </section>

    <section className="nova-detail-confidence">
      <div><Check size={18}/><span>Inspection summary available</span></div>
      <div><Check size={18}/><span>Finance estimate available</span></div>
      <div><Check size={18}/><span>Trade-in accepted</span></div>
      <div><Check size={18}/><span>Private test drive</span></div>
    </section>

    <section className="nova-detail-cta">
      <div><span>INTERESTED IN THIS CAR?</span><h2>See it.<br/><em>Drive it.</em></h2><p>Book a private test drive or run the numbers before your showroom visit.</p></div>
      <div className="nova-detail-actions">
        <Link to="/nova-autohaus/test-drive">Book test drive <ArrowRight size={16}/></Link>
        <Link to="/nova-autohaus/finance">Finance calculator</Link>
        <Link to="/nova-autohaus/compare">Compare vehicle</Link>
      </div>
    </section>
  </main>
}