import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const NOVA_ASSETS = {
  hero: "https://solaire-house-lagos.floot.app/_cdn/static/de9e69b9-473b-4c24-b87e-b48e1beaf222.png",
  suv: "https://solaire-house-lagos.floot.app/_cdn/static/ca0152e9-4d2f-40d3-9dd2-4eca6c9d2d6c.png",
  sedan: "https://solaire-house-lagos.floot.app/_cdn/static/ec6c4883-93e7-420a-a4bb-648baa69a23d.png",
  coupe: "https://solaire-house-lagos.floot.app/_cdn/static/7f34dfd9-ac63-4181-9667-8627e9acb753.png",
  lx: "https://solaire-house-lagos.floot.app/_cdn/static/7c54be6a-b067-4df1-b9b6-deb6f01737ec.png",
  cayenne: "https://solaire-house-lagos.floot.app/_cdn/static/d50efc99-a44a-46ac-a497-a95536c2e3dd.png",
  gwagon: "https://solaire-house-lagos.floot.app/_cdn/static/f8f215a9-9e99-426c-82d7-e029d1e5e65c.png",
};

export type NovaVehicle = {
  id: string;
  name: string;
  year: number;
  category: "SUV" | "Sedan" | "Performance";
  price: number;
  mileage: string;
  engine: string;
  drivetrain: string;
  transmission: string;
  fuel: string;
  exterior: string;
  interior: string;
  image: string;
  tag: string;
  description: string;
};

export const novaVehicles: NovaVehicle[] = [
  {
    id: "range-rover-sport",
    name: "Range Rover Sport",
    year: 2025,
    category: "SUV",
    price: 285000000,
    mileage: "Delivery mileage",
    engine: "3.0L turbo",
    drivetrain: "AWD",
    transmission: "Automatic",
    fuel: "Petrol",
    exterior: "Santorini Black",
    interior: "Ebony leather",
    image: NOVA_ASSETS.suv,
    tag: "Just arrived",
    description: "A refined luxury SUV with strong road presence, everyday comfort and a cabin built for long Lagos drives.",
  },
  {
    id: "mercedes-e-class",
    name: "Mercedes-Benz E-Class",
    year: 2024,
    category: "Sedan",
    price: 165000000,
    mileage: "8,400 km",
    engine: "2.0L turbo",
    drivetrain: "RWD",
    transmission: "Automatic",
    fuel: "Petrol",
    exterior: "Polar White",
    interior: "Macchiato beige",
    image: NOVA_ASSETS.sedan,
    tag: "Executive pick",
    description: "A polished executive sedan balancing comfort, technology and understated road presence.",
  },
  {
    id: "bmw-m4-competition",
    name: "BMW M4 Competition",
    year: 2025,
    category: "Performance",
    price: 245000000,
    mileage: "1,200 km",
    engine: "3.0L twin-turbo",
    drivetrain: "AWD",
    transmission: "Automatic",
    fuel: "Petrol",
    exterior: "Portimao Blue",
    interior: "Black Merino",
    image: NOVA_ASSETS.coupe,
    tag: "Performance",
    description: "A serious performance coupe with daily usability, sharp responses and the kind of presence that never disappears into traffic.",
  },
  {
    id: "lexus-lx-600",
    name: "Lexus LX 600",
    year: 2024,
    category: "SUV",
    price: 310000000,
    mileage: "4,900 km",
    engine: "3.5L twin-turbo",
    drivetrain: "4WD",
    transmission: "Automatic",
    fuel: "Petrol",
    exterior: "Sonic Quartz",
    interior: "Saddle tan",
    image: NOVA_ASSETS.lx,
    tag: "Family luxury",
    description: "Full-size comfort, strong reliability and a calm, beautifully finished cabin for city and long-distance driving.",
  },
  {
    id: "porsche-cayenne",
    name: "Porsche Cayenne",
    year: 2025,
    category: "SUV",
    price: 295000000,
    mileage: "2,150 km",
    engine: "3.0L turbo",
    drivetrain: "AWD",
    transmission: "Automatic",
    fuel: "Petrol",
    exterior: "Oak Green",
    interior: "Black leather",
    image: NOVA_ASSETS.cayenne,
    tag: "Driver's SUV",
    description: "An SUV with sports-car instincts, premium comfort and the right balance of pace and practicality.",
  },
  {
    id: "mercedes-g-class",
    name: "Mercedes-AMG G 63",
    year: 2024,
    category: "Performance",
    price: 480000000,
    mileage: "6,600 km",
    engine: "4.0L V8 biturbo",
    drivetrain: "AWD",
    transmission: "Automatic",
    fuel: "Petrol",
    exterior: "Obsidian Black",
    interior: "Black Nappa",
    image: NOVA_ASSETS.gwagon,
    tag: "Statement car",
    description: "Iconic shape, huge performance and an unmistakable cabin-and-road presence.",
  },
];

export const formatNaira = (value: number) => "₦" + value.toLocaleString();

export function NovaHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="nova-header">
        <Link to="/nova-autohaus/" className="nova-logo" aria-label="NOVA Autohaus home">
          <span className="nova-logo-mark">N</span>
          <span>NOVA<small>AUTOHAUS</small></span>
        </Link>
        <nav className="nova-nav" aria-label="NOVA navigation">
          <Link to="/nova-autohaus/inventory">Inventory</Link>
          <Link to="/nova-autohaus/sell">Sell / trade</Link>
          <Link to="/nova-autohaus/finance">Finance</Link>
          <Link to="/nova-autohaus/compare">Compare</Link>
        </nav>
        <Link to="/nova-autohaus/test-drive" className="nova-header-cta">Book a test drive</Link>
        <button className="nova-menu" type="button" onClick={()=>setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </header>
      {open && (
        <nav className="nova-mobile-nav">
          <Link to="/nova-autohaus/inventory" onClick={()=>setOpen(false)}>Inventory</Link>
          <Link to="/nova-autohaus/sell" onClick={()=>setOpen(false)}>Sell / trade</Link>
          <Link to="/nova-autohaus/finance" onClick={()=>setOpen(false)}>Finance</Link>
          <Link to="/nova-autohaus/compare" onClick={()=>setOpen(false)}>Compare</Link>
          <Link to="/nova-autohaus/test-drive" onClick={()=>setOpen(false)}>Book a test drive</Link>
        </nav>
      )}
    </>
  );
}
