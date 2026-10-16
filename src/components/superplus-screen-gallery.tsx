import { useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import "@/superplus-showcase.css";

const screens = [
  {
    id: "home",
    label: "Website",
    title: "A first impression with a clear next step.",
    description:
      "Training, spa and recovery brought together, with direct routes to membership and registration.",
    image: "home",
    url: "https://www.superplusfitness.com/",
    note: "Live website capture",
  },
  {
    id: "membership",
    label: "Memberships",
    title: "Find the right plan. Understand the price.",
    description:
      "Filterable plans, clear registration fees and a route from choosing a membership to joining the gym.",
    image: "membership",
    url: "https://www.superplusfitness.com/membership",
    note: "Live membership page · Gym category",
  },
  {
    id: "spa",
    label: "Spa & booking",
    title: "Recovery has its own customer journey.",
    description:
      "A dedicated service catalogue connects spa and recovery options with booking and payment.",
    image: "spa",
    url: "https://www.superplusfitness.com/spa-recovery",
    note: "Live spa and recovery page",
  },
  {
    id: "portals",
    label: "Team portals",
    title: "A workspace for each part of the team.",
    description:
      "Separate entry points for staff, reception and management. Behind them are attendance, registration, QR check-in, payroll and reporting tools.",
    image: "portals",
    url: "https://www.superplusfitness.com/portal",
    note: "Public portal chooser · Account dashboards require sign-in",
  },
  {
    id: "app",
    label: "Member app",
    title: "The member experience continues on the phone.",
    description:
      "The SP Fitness app brings together memberships, workouts, bookings, SP Points, rewards, streaks and challenges.",
    image: "app-page",
    url: "https://www.superplusfitness.com/app",
    note: "Live app page · Illustrated app preview from the official website",
  },
] as const;

export function SuperplusScreenGallery() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];
  return (
    <section className="spf-gallery" aria-labelledby="spf-gallery-title">
      <div className="p-container">
        <div className="spf-gallery-heading">
          <div>
            <p className="p-label">Inside Super Plus / Screen gallery</p>
            <h2 id="spf-gallery-title">
              See the work.
              <br />
              <em>Beyond the homepage.</em>
            </h2>
          </div>
          <p>
            Explore the public website, membership journey, team access and member app. Select a
            view to take a closer look.
          </p>
        </div>
        <div className="spf-gallery-switcher" role="group" aria-label="Choose a project screen">
          {screens.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              aria-controls="spf-gallery-panel"
              onClick={() => setSelected(index)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div id="spf-gallery-panel" className="spf-gallery-panel">
          <div className="spf-gallery-image">
            <div className="spf-screen-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>
                superplusfitness.com{screen.id === "home" ? "" : ` / ${screen.label.toLowerCase()}`}
              </span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="spf-gallery-expand"
                  aria-label={`Enlarge ${screen.label} screenshot`}
                >
                  <img
                    src={`/project-screens/spf-${screen.image}.webp`}
                    alt={screen.note}
                    width="1363"
                    height="936"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <Expand size={15} aria-hidden="true" /> Enlarge screen
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="spf-gallery-dialog">
                <DialogTitle>{screen.label}</DialogTitle>
                <DialogDescription>{screen.note}</DialogDescription>
                <div>
                  <img
                    src={`/project-screens/spf-${screen.image}.webp`}
                    alt={`${screen.label} — ${screen.note}`}
                    width="1363"
                    height="936"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="spf-gallery-copy" aria-live="polite" aria-atomic="true">
            <p className="p-label">
              0{selected + 1} / {screen.label}
            </p>
            <h3>{screen.title}</h3>
            <p>{screen.description}</p>
            <small>{screen.note}</small>
            <a href={screen.url} target="_blank" rel="noopener noreferrer">
              Explore this part of Super Plus <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
