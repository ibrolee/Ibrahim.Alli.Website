import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const SITE_URL = "https://ibrahimalli.com";

type PhotoCategory = "people" | "places";

type PortfolioPhoto = {
  src: string;
  alt: string;
  title: string;
  category: PhotoCategory;
  width: number;
  height: number;
};

const photos: PortfolioPhoto[] = [
  {
    src: "/photography/photo-01.webp",
    alt: "Close portrait of a graduate wearing a black cap and gown with a red stole",
    title: "Graduation portrait",
    category: "people",
    width: 1611,
    height: 2048,
  },
  {
    src: "/photography/photo-02.webp",
    alt: "Graduate in a white suit standing outdoors",
    title: "Graduation portrait",
    category: "people",
    width: 3072,
    height: 4608,
  },
  {
    src: "/photography/photo-03.webp",
    alt: "Graduate holding a bouquet while wearing a black gown with red accents",
    title: "Graduation portrait",
    category: "people",
    width: 3072,
    height: 4608,
  },
  {
    src: "/photography/photo-04.webp",
    alt: "Young man in an orange shirt standing beside a basketball outdoors",
    title: "Lifestyle portrait",
    category: "people",
    width: 2849,
    height: 4246,
  },
  {
    src: "/photography/photo-05.webp",
    alt: "Graduate wearing a black gown and red stole outdoors",
    title: "Graduation portrait",
    category: "people",
    width: 2827,
    height: 4241,
  },
  {
    src: "/photography/photo-06.webp",
    alt: "Smiling graduate with glasses holding a bouquet in front of flowering plants",
    title: "Graduation portrait",
    category: "people",
    width: 3072,
    height: 4608,
  },
  {
    src: "/photography/photo-11.webp",
    alt: "Low-angle outdoor portrait framed through yellow flowers",
    title: "Portrait study",
    category: "people",
    width: 3072,
    height: 4608,
  },
  {
    src: "/photography/photo-12.webp",
    alt: "Seated outdoor portrait in an orange hoodie and checked overshirt",
    title: "Portrait study",
    category: "people",
    width: 3072,
    height: 4608,
  },
  {
    src: "/photography/photo-07.webp",
    alt: "Close-up photograph of pink and purple flowers",
    title: "Floral study",
    category: "places",
    width: 2827,
    height: 4241,
  },
  {
    src: "/photography/photo-08.webp",
    alt: "The Kaaba at Masjid al-Haram with worshippers in the foreground",
    title: "Travel",
    category: "places",
    width: 2448,
    height: 3264,
  },
  {
    src: "/photography/photo-09.webp",
    alt: "Row of rental bicycles photographed on a city street",
    title: "Everyday details",
    category: "places",
    width: 1024,
    height: 1536,
  },
  {
    src: "/photography/photo-10.webp",
    alt: "Historic stone building with curved balconies and green shutters",
    title: "Architecture",
    category: "places",
    width: 1024,
    height: 1536,
  },
];

const people = photos.filter((photo) => photo.category === "people");
const places = photos.filter((photo) => photo.category === "places");

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Ibrahim Alli" },
      {
        name: "description",
        content:
          "Selected photography by Ibrahim Alli — portraits, people, places, architecture and everyday details.",
      },
      { property: "og:title", content: "Photography — Ibrahim Alli" },
      {
        property: "og:description",
        content: "People, places and details through my lens.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/photography` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/photography` }],
  }),
  component: PhotographyPage,
});

function PhotographyPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length,
    );
  }, []);
  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % photos.length,
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const openPhoto = (photo: PortfolioPhoto) => {
    setActiveIndex(photos.indexOf(photo));
  };

  return (
    <main id="main-content" className="photo-page">
      <section className="photo-hero" aria-labelledby="photography-heading">
        <div className="p-container photo-hero-grid">
          <div>
            <p className="p-label">Photography / Selected work</p>
            <h1 id="photography-heading">
              Through my
              <br />
              <em>lens.</em>
            </h1>
          </div>
          <div className="photo-hero-copy">
            <p className="photo-lead">
              I build digital experiences and document the world around me through photography.
            </p>
            <p>
              People, places and the details that catch my attention.
            </p>
            <div className="photo-jump-links" aria-label="Photography categories">
              <a href="#people">People</a>
              <a href="#places">Places &amp; Details</a>
            </div>
          </div>
        </div>
      </section>

      <section id="people" className="photo-section" aria-labelledby="people-heading">
        <div className="p-container">
          <div className="photo-section-head">
            <div>
              <p className="p-label">01 / People</p>
              <h2 id="people-heading">Portraits &amp; moments.</h2>
            </div>
            <p>{String(people.length).padStart(2, "0")} photographs</p>
          </div>
          <PhotoGrid photos={people} onOpen={openPhoto} />
        </div>
      </section>

      <section
        id="places"
        className="photo-section photo-section--places"
        aria-labelledby="places-heading"
      >
        <div className="p-container">
          <div className="photo-section-head">
            <div>
              <p className="p-label">02 / Places &amp; Details</p>
              <h2 id="places-heading">Things that made me look twice.</h2>
            </div>
            <p>{String(places.length).padStart(2, "0")} photographs</p>
          </div>
          <PhotoGrid photos={places} onOpen={openPhoto} className="photo-grid--places" />
        </div>
      </section>

      <section className="photo-note">
        <div className="p-container">
          <p className="p-label">Photography by Ibrahim Alli</p>
          <p>Selected work from different places, people and moments along the way.</p>
        </div>
      </section>

      {activePhoto ? (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            type="button"
            className="photo-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close photograph"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            className="photo-lightbox-nav photo-lightbox-nav--previous"
            onClick={showPrevious}
            aria-label="Previous photograph"
          >
            <ChevronLeft size={26} />
          </button>

          <figure className="photo-lightbox-figure">
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={activePhoto.width}
              height={activePhoto.height}
            />
            <figcaption>
              <span>{activePhoto.title}</span>
              <span>
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="photo-lightbox-nav photo-lightbox-nav--next"
            onClick={showNext}
            aria-label="Next photograph"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      ) : null}
    </main>
  );
}

function PhotoGrid({
  photos: sectionPhotos,
  onOpen,
  className = "",
}: {
  photos: PortfolioPhoto[];
  onOpen: (photo: PortfolioPhoto) => void;
  className?: string;
}) {
  return (
    <div className={`photo-grid ${className}`.trim()}>
      {sectionPhotos.map((photo, index) => (
        <button
          type="button"
          className="photo-card"
          key={photo.src}
          onClick={() => onOpen(photo)}
          aria-label={`Open ${photo.title.toLowerCase()}`}
        >
          <span className="photo-frame">
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="photo-view" aria-hidden="true">
              View
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
