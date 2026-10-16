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

export type ProjectScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  url: string;
  note: string;
};

type ScreenGalleryProps = {
  screens: readonly ProjectScreen[];
  brand: string;
  domain: string;
  imagePrefix: string;
  id: string;
  introduction: string;
  className?: string;
};

export function ProjectScreenGallery({
  screens,
  brand,
  domain,
  imagePrefix,
  id,
  introduction,
  className = "",
}: ScreenGalleryProps) {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];
  return (
    <section className={`spf-gallery ${className}`} aria-labelledby={`${id}-title`}>
      <div className="p-container">
        <div className="spf-gallery-heading">
          <div>
            <p className="p-label">Inside {brand} / Screen gallery</p>
            <h2 id={`${id}-title`}>
              See the work.
              <br />
              <em>Beyond the homepage.</em>
            </h2>
          </div>
          <p>{introduction}</p>
        </div>
        <div className="spf-gallery-switcher" role="group" aria-label="Choose a project screen">
          {screens.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              aria-controls={`${id}-panel`}
              onClick={() => setSelected(index)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div id={`${id}-panel`} className="spf-gallery-panel">
          <div className="spf-gallery-image">
            <div className="spf-screen-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>
                {domain}
                {screen.id === "home" ? "" : ` / ${screen.label.toLowerCase()}`}
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
                    src={`/project-screens/${imagePrefix}-${screen.image}.webp`}
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
                    src={`/project-screens/${imagePrefix}-${screen.image}.webp`}
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
              Explore {brand} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
