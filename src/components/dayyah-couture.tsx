import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  ImagePlus,
  Instagram,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

const ROOT = "/dayyah-couture";
const FLOOT_ASSET = "https://dayyah-couture-preview.floot.app/_cdn/static";

const IMG = {
  hero: `${FLOOT_ASSET}/bee516c0-1ac0-4fc9-a53c-c4407a01ce2d.png`,
  nikkah: `${FLOOT_ASSET}/5eb9aba2-bc9b-417c-be74-e103f00306b9.png`,
  asoWine: `${FLOOT_ASSET}/49e27f85-7291-4374-af14-7706fe04780b.png`,
  bespokeWarm: `${FLOOT_ASSET}/03bd3341-ff66-4497-a0e1-dc1386afc228.png`,
  bridalVeil: `${FLOOT_ASSET}/ce4c99b1-55af-4fd4-b27a-40513784d9b0.png`,
  reception: `${FLOOT_ASSET}/0d3aaf3c-7c84-45ff-bbb7-093b91664d9a.png`,
  asoGreen: `${FLOOT_ASSET}/92d9e3e5-6e72-480d-ba44-f61aef13cd62.png`,
  bespokeSilver: `${FLOOT_ASSET}/9afa1826-120c-4e69-b380-482a81ec13be.png`,
};

const navItems = [
  ["Collections", "collections"],
  ["Bridal", "bridal"],
  ["Bespoke", "bespoke"],
  ["Gallery", "gallery"],
  ["About", "about"],
  ["Process", "process"],
];

function href(page = "") {
  return page ? `${ROOT}/${page}` : ROOT;
}

function DayyahShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dc-site">
      <div className="dc-concept-bar">
        Concept website preview · sample imagery used for presentation
      </div>

      <header className="dc-header">
        <a href={ROOT} className="dc-wordmark" aria-label="Dayyah Couture home">
          <span>DAYYAH</span>
          <small>COUTURE</small>
        </a>

        <div className="dc-header-right">
          <nav className="dc-desktop-nav" aria-label="Dayyah Couture navigation">
            {navItems.map(([label, page]) => (
              <a
                key={page}
                href={href(page)}
                className={active === page ? "dc-active" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <a href={href("start-order")} className="dc-btn dc-btn-primary dc-header-cta">
            Start your order
          </a>

          <button
            type="button"
            className="dc-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="dc-mobile-nav" aria-label="Dayyah Couture mobile navigation">
          {navItems.map(([label, page]) => (
            <a key={page} href={href(page)}>
              {label}
            </a>
          ))}
          <a href={href("start-order")}>Start your order</a>
          <a href={href("contact")}>Contact</a>
          <a
            href="https://www.instagram.com/dayyah_couture"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
        </nav>
      )}

      {children}

      <footer className="dc-footer">
        <a href={ROOT} className="dc-footer-brand">
          <span>DAYYAH</span>
          <small>COUTURE</small>
        </a>

        <div className="dc-footer-links">
          <a href={href("collections")}>Collections</a>
          <a href={href("bridal")}>Bridal</a>
          <a href={href("bespoke")}>Bespoke</a>
          <a href={href("process")}>How it works</a>
          <a href={href("contact")}>Contact</a>
        </div>

        <a
          href="https://www.instagram.com/dayyah_couture"
          target="_blank"
          rel="noreferrer"
          className="dc-instagram"
        >
          <Instagram size={17} /> @dayyah_couture
        </a>

        <small className="dc-demo-note">
          Concept preview by Ibrahim Alli — sample imagery is not presented as
          Dayyah Couture’s actual work.
        </small>
      </footer>
    </div>
  );
}

const homeCollections = [
  {
    name: "Bridal",
    note: "Wedding gowns, Nikkah & reception",
    image: IMG.bridalVeil,
    page: "bridal",
  },
  {
    name: "Nikkah",
    note: "Modest, refined bridal couture",
    image: IMG.nikkah,
    page: "bridal",
  },
  {
    name: "Aso Ebi",
    note: "Celebration dressing with presence",
    image: IMG.asoGreen,
    page: "bespoke",
  },
  {
    name: "Bespoke",
    note: "One-of-one occasion pieces",
    image: IMG.bespokeSilver,
    page: "bespoke",
  },
];

export function DayyahHome() {
  return (
    <DayyahShell>
      <main className="dc-main">
        <section className="dc-home-hero">
          <div className="dc-home-copy">
            <p className="dc-eyebrow">Bridal · Bespoke · Occasion</p>
            <h1>
              Made for
              <em>your moment.</em>
            </h1>
            <p className="dc-lead">
              Thoughtfully crafted couture for women who want to feel
              unmistakably themselves on the days that matter.
            </p>
            <div className="dc-actions">
              <a href={href("start-order")} className="dc-btn dc-btn-primary">
                Start your order
              </a>
              <a href={href("collections")} className="dc-btn dc-btn-outline">
                Explore collections
              </a>
            </div>
          </div>

          <div className="dc-home-visual">
            <img src={IMG.hero} alt="Concept bridal couture" />
            <div className="dc-stamp">
              <span>DC</span>
              <small>Made to measure</small>
            </div>
          </div>
        </section>

        <section className="dc-intro">
          <p className="dc-eyebrow">The house</p>
          <div className="dc-intro-grid">
            <h2>Clothes that become part of the memory.</h2>
            <div>
              <p>
                From bridal gowns and Nikkah looks to aso ebi and one-of-one
                bespoke pieces, Dayyah Couture creates occasionwear around the
                woman wearing it.
              </p>
              <a href={href("about")} className="dc-btn dc-btn-outline">
                Discover Dayyah Couture
              </a>
            </div>
          </div>
        </section>

        <section className="dc-collections-preview">
          <div className="dc-section-heading">
            <div>
              <p className="dc-eyebrow">Collections</p>
              <h2>Explore the atelier</h2>
            </div>
            <a href={href("collections")} className="dc-btn dc-btn-outline">
              View all collections
            </a>
          </div>

          <div className="dc-collection-grid">
            {homeCollections.map((item, index) => (
              <a
                href={href(item.page)}
                className="dc-collection-card"
                key={item.name}
              >
                <div className="dc-card-image">
                  <img src={item.image} alt={`Concept ${item.name} couture`} />
                  <span>0{index + 1}</span>
                </div>
                <div className="dc-card-meta">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.note}</p>
                  </div>
                  <ArrowUpRight size={20} />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="dc-bridal-feature">
          <div className="dc-bridal-image">
            <img src={IMG.reception} alt="Concept reception couture" />
            <p>Bridal · Nikkah · Reception</p>
          </div>
          <div className="dc-bridal-copy">
            <p className="dc-eyebrow">For the bride</p>
            <h2>One bridal story. More than one beautiful entrance.</h2>
            <p>
              Explore ceremony gowns, modest Nikkah looks, reception dresses
              and bridal-party dressing as a dedicated experience.
            </p>
            <ul>
              <li><Check size={16} /> Wedding gowns</li>
              <li><Check size={16} /> Nikkah & modest bridal looks</li>
              <li><Check size={16} /> Reception & second looks</li>
            </ul>
            <a href={href("bridal")} className="dc-btn dc-btn-light-outline">
              Enter the bridal atelier
            </a>
          </div>
        </section>

        <section className="dc-process-preview">
          <div className="dc-process-title">
            <p className="dc-eyebrow">The process</p>
            <h2>From idea to fitting.</h2>
            <p>
              Enough clarity to know what happens next, without turning custom
              fashion into a generic checkout.
            </p>
            <a href={href("process")} className="dc-btn dc-btn-outline">
              See the full process
            </a>
          </div>

          <div className="dc-process-list">
            {[
              ["01", "Tell us about your moment", "Share the event, date, location and the kind of look you have in mind."],
              ["02", "Refine the design", "The silhouette, finish and details are developed around you."],
              ["03", "Create & fit", "Measurements, production and final adjustments bring the piece to life."],
            ].map(([number, title, copy]) => (
              <div className="dc-process-item" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="dc-quote">
          <p className="dc-eyebrow">Dayyah Couture</p>
          <blockquote>“Designed around you, not around a rack.”</blockquote>
          <p>
            Browse the gallery or begin a bespoke enquiry when you’re ready.
          </p>
          <div className="dc-actions">
            <a href={href("start-order")} className="dc-btn dc-btn-primary">
              Start your order
            </a>
            <a href={href("gallery")} className="dc-btn dc-btn-outline">
              View gallery
            </a>
          </div>
        </section>
      </main>
    </DayyahShell>
  );
}

type EditorialSection = {
  kicker: string;
  title: string;
  copy: string;
};

type EditorialProps = {
  active: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  secondaryImage: string;
  sections: EditorialSection[];
  list?: string[];
  ctaTitle: string;
  ctaCopy: string;
};

function EditorialPage({
  active,
  eyebrow,
  title,
  intro,
  heroImage,
  secondaryImage,
  sections,
  list,
  ctaTitle,
  ctaCopy,
}: EditorialProps) {
  return (
    <DayyahShell active={active}>
      <main className="dc-main">
        <section className="dc-editorial-hero">
          <div className="dc-editorial-copy">
            <p className="dc-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
            <div className="dc-actions">
              <a href={href("start-order")} className="dc-btn dc-btn-primary">
                Start your order
              </a>
              <a href={href("gallery")} className="dc-btn dc-btn-outline">
                View gallery
              </a>
            </div>
          </div>
          <div className="dc-editorial-image">
            <img src={heroImage} alt="" />
          </div>
        </section>

        <section className="dc-editorial-body">
          <div className="dc-story-column">
            {sections.map((section, index) => (
              <article className="dc-story" key={section.title}>
                <span>0{index + 1}</span>
                <div>
                  <p>{section.kicker}</p>
                  <h2>{section.title}</h2>
                  <i />
                  <p className="dc-story-copy">{section.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="dc-side-column">
            <img src={secondaryImage} alt="" />
            {list && (
              <div className="dc-list-card">
                <p>What we can create</p>
                {list.map((item) => (
                  <div key={item}>
                    <Check size={15} /> {item}
                  </div>
                ))}
              </div>
            )}
          </aside>
        </section>

        <section className="dc-editorial-cta">
          <p>Dayyah Couture</p>
          <h2>{ctaTitle}</h2>
          <span>{ctaCopy}</span>
          <a href={href("start-order")} className="dc-btn dc-btn-cream">
            Begin your enquiry <ArrowUpRight size={17} />
          </a>
        </section>
      </main>
    </DayyahShell>
  );
}

const editorialPages: Record<string, EditorialProps> = {
  bridal: {
    active: "bridal",
    eyebrow: "The bridal atelier",
    title: "A bridal look that belongs to you.",
    intro:
      "From the ceremony to the reception, each bridal piece begins with your story, your proportions and the feeling you want to carry into the room.",
    heroImage: IMG.bridalVeil,
    secondaryImage: IMG.nikkah,
    sections: [
      {
        kicker: "Ceremony",
        title: "Wedding gowns",
        copy:
          "A custom bridal gown can be developed around the silhouette, coverage, fabrication and level of detail that feels right for the bride. The goal is not to fit you into a pre-existing style, but to make the style fit the moment.",
      },
      {
        kicker: "Nikkah",
        title: "Modest bridal couture",
        copy:
          "Nikkah looks can balance modest coverage with couture detail through refined draping, embroidery, veiling, texture and proportion.",
      },
      {
        kicker: "After the vows",
        title: "Reception & second looks",
        copy:
          "A reception or second look can feel lighter, bolder or more playful while still belonging to the same bridal story.",
      },
    ],
    list: [
      "Wedding gowns",
      "Nikkah looks",
      "Reception dresses",
      "Bridal party",
      "Bridesmaids",
    ],
    ctaTitle: "Your bridal story starts with a conversation.",
    ctaCopy:
      "Share your date, location, ideas and what you want your dress to feel like.",
  },
  bespoke: {
    active: "bespoke",
    eyebrow: "Bespoke couture",
    title: "One piece. One woman. One occasion.",
    intro:
      "Bespoke is for the moments when ready-to-wear is not enough — birthdays, weddings, celebrations and every entrance worth remembering.",
    heroImage: IMG.bespokeSilver,
    secondaryImage: IMG.reception,
    sections: [
      {
        kicker: "The brief",
        title: "Built around the occasion",
        copy:
          "The design process starts with where you are going, how you want to be seen and what you are comfortable wearing. Colour, shape, texture and detail are refined around that brief.",
      },
      {
        kicker: "The fit",
        title: "Made to your measurements",
        copy:
          "The piece is developed for your proportions rather than a standard clothing size. Fittings and adjustments help move the garment from an idea into something intentional on the body.",
      },
      {
        kicker: "The finish",
        title: "Details with purpose",
        copy:
          "Embellishment, structure, draping and surface detail should support the silhouette rather than overwhelm it.",
      },
    ],
    list: [
      "Aso ebi",
      "Birthday looks",
      "Wedding guest looks",
      "Reception gowns",
      "Special occasionwear",
    ],
    ctaTitle: "Have a look in mind?",
    ctaCopy:
      "Send the event details, your inspiration and the kind of silhouette you are drawn to.",
  },
  about: {
    active: "about",
    eyebrow: "About the house",
    title: "Made for women with somewhere memorable to be.",
    intro:
      "Dayyah Couture is presented here as a contemporary couture house focused on bridal, bespoke and occasion dressing — a visual home for the work beyond the Instagram feed.",
    heroImage: IMG.bespokeWarm,
    secondaryImage: IMG.asoGreen,
    sections: [
      {
        kicker: "The idea",
        title: "A wardrobe for important moments",
        copy:
          "The brand’s work spans wedding dressing, traditional celebrations and one-of-one occasion pieces. This concept website gives those different parts of the practice room to breathe.",
      },
      {
        kicker: "The approach",
        title: "Personal before transactional",
        copy:
          "For made-to-order fashion, the client relationship matters as much as the product page. The website is structured around consultation and understanding the event.",
      },
      {
        kicker: "The future",
        title: "A home that can grow with the brand",
        copy:
          "If Dayyah Couture later introduces ready-to-wear collections, normal ecommerce can sit beside the bespoke experience without replacing it.",
      },
    ],
    ctaTitle: "Discover the work.",
    ctaCopy:
      "Browse the concept gallery or begin a bespoke enquiry for your next event.",
  },
  process: {
    active: "process",
    eyebrow: "How it works",
    title: "From the first idea to the final fitting.",
    intro:
      "A clear process helps clients know what happens next — especially for custom fashion where timelines, measurements and expectations matter.",
    heroImage: IMG.asoWine,
    secondaryImage: IMG.hero,
    sections: [
      {
        kicker: "Step one",
        title: "Send your enquiry",
        copy:
          "Share the type of outfit, event date, location, inspiration and approximate budget. This gives the atelier enough context to understand the project.",
      },
      {
        kicker: "Step two",
        title: "Consultation & design direction",
        copy:
          "The idea is refined into a clear direction — silhouette, colour, fabric feel, modesty preferences and important details.",
      },
      {
        kicker: "Step three",
        title: "Measurements & production",
        copy:
          "Once the design is agreed, measurements are taken and production begins. Timelines vary with complexity and material sourcing.",
      },
      {
        kicker: "Step four",
        title: "Fitting, finishing & collection",
        copy:
          "The final stage is about fit and finish. Adjustments are made before collection or delivery arrangements are confirmed.",
      },
    ],
    list: [
      "Enquiry",
      "Consultation",
      "Measurements",
      "Production",
      "Fitting",
      "Collection / delivery",
    ],
    ctaTitle: "Your event date is the starting point.",
    ctaCopy:
      "Begin early enough to leave room for design, production and fitting.",
  },
};

function CollectionsPage() {
  const categories = [
    ["Bridal", "Wedding gowns, Nikkah & reception", IMG.bridalVeil, "bridal"],
    ["Nikkah", "Modest bridal couture", IMG.nikkah, "bridal"],
    ["Aso Ebi", "Celebration dressing", IMG.asoGreen, "bespoke"],
    ["Bespoke", "One-of-one occasionwear", IMG.bespokeSilver, "bespoke"],
  ];

  return (
    <DayyahShell active="collections">
      <main className="dc-main">
        <section className="dc-page-heading">
          <p className="dc-eyebrow">Collections</p>
          <h1>Choose the moment we’re dressing.</h1>
          <div>
            <p>
              Bridal, traditional celebrations and one-of-one occasion pieces
              each begin with a different conversation.
            </p>
            <a href={href("gallery")} className="dc-btn dc-btn-outline">
              View full gallery
            </a>
          </div>
        </section>

        <section className="dc-large-grid">
          {categories.map(([title, subtitle, image, page], index) => (
            <a href={href(page)} className="dc-large-card" key={title}>
              <div>
                <img src={image} alt={`Concept ${title} couture`} />
                <span>0{index + 1}</span>
              </div>
              <footer>
                <div>
                  <h2>{title}</h2>
                  <p>{subtitle}</p>
                </div>
                <ArrowUpRight size={22} />
              </footer>
            </a>
          ))}
        </section>

        <section className="dc-soft-cta">
          <div>
            <p className="dc-eyebrow">Not sure which category fits?</p>
            <h2>Tell us about the event instead.</h2>
          </div>
          <a href={href("start-order")} className="dc-btn dc-btn-primary">
            Start your order
          </a>
        </section>
      </main>
    </DayyahShell>
  );
}

function GalleryPage() {
  const gallery = [
    [IMG.hero, "Bridal"],
    [IMG.reception, "Reception"],
    [IMG.nikkah, "Nikkah"],
    [IMG.asoGreen, "Aso Ebi"],
    [IMG.bespokeSilver, "Bespoke"],
    [IMG.bridalVeil, "Bridal"],
    [IMG.asoWine, "Aso Ebi"],
    [IMG.bespokeWarm, "Occasion"],
  ];

  return (
    <DayyahShell active="gallery">
      <main className="dc-main">
        <section className="dc-page-heading">
          <p className="dc-eyebrow">Gallery</p>
          <h1>A visual world for the work.</h1>
          <p className="dc-heading-note">
            This concept gallery uses sample imagery. A finished website would
            replace every image with Dayyah Couture’s actual designs, clients
            and campaign photography.
          </p>
        </section>

        <section className="dc-gallery-grid">
          {gallery.map(([image, label], index) => (
            <figure key={`${image}-${index}`}>
              <img src={image} alt={`Concept ${label} couture`} />
              <figcaption>
                <span>{label}</span>
                <small>Concept 0{index + 1}</small>
              </figcaption>
            </figure>
          ))}
        </section>

        <section className="dc-soft-cta dc-center">
          <div>
            <p className="dc-eyebrow">Seen a direction you love?</p>
            <h2>Let’s turn the inspiration into your own piece.</h2>
          </div>
          <a href={href("start-order")} className="dc-btn dc-btn-primary">
            Start your order
          </a>
        </section>
      </main>
    </DayyahShell>
  );
}

function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <DayyahShell>
      <main className="dc-main">
        <section className="dc-page-heading">
          <p className="dc-eyebrow">Start your order</p>
          <h1>Tell us what you’re dressing for.</h1>
          <p className="dc-heading-note">
            This concept form demonstrates how Dayyah Couture could collect the
            important details before moving a client into consultation.
          </p>
        </section>

        <section className="dc-order-layout">
          <aside className="dc-order-guide">
            {[
              ["01", "Your details", "Who you are and the easiest way to continue the conversation."],
              ["02", "Your event", "The date, location and kind of outfit help determine the right service."],
              ["03", "Your vision", "Colours, silhouettes, references and budget give the atelier a clearer starting point."],
            ].map(([n, title, copy]) => (
              <div key={n}>
                <span>{n}</span>
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
            ))}
          </aside>

          <form className="dc-order-form" onSubmit={submit}>
            {submitted ? (
              <div className="dc-success">
                <div><Check size={30} /></div>
                <h2>Your enquiry is ready.</h2>
                <p>
                  This is still a demonstration, so no real request has been
                  sent. On the finished site, Dayyah Couture would receive the
                  full enquiry and inspiration images.
                </p>
                <button
                  type="button"
                  className="dc-btn dc-btn-outline"
                  onClick={() => setSubmitted(false)}
                >
                  Create another enquiry
                </button>
              </div>
            ) : (
              <>
                <FormBlock number="01" title="About you">
                  <div className="dc-form-grid">
                    <label>
                      Full name
                      <input required placeholder="Your name" />
                    </label>
                    <label>
                      Phone / WhatsApp
                      <input required placeholder="+234..." />
                    </label>
                  </div>
                  <label>
                    Email
                    <input type="email" placeholder="you@example.com" />
                  </label>
                </FormBlock>

                <FormBlock number="02" title="About the event">
                  <div className="dc-form-grid">
                    <label>
                      What are we creating?
                      <select defaultValue="">
                        <option value="" disabled>Choose a category</option>
                        <option>Wedding gown</option>
                        <option>Nikkah look</option>
                        <option>Reception / second look</option>
                        <option>Aso Ebi</option>
                        <option>Bespoke occasionwear</option>
                        <option>Bridesmaid / bridal party</option>
                        <option>Something else</option>
                      </select>
                    </label>
                    <label>
                      Event date
                      <input placeholder="e.g. 14 December 2026" />
                    </label>
                  </div>
                  <div className="dc-form-grid">
                    <label>
                      Event location
                      <input placeholder="City / Country" />
                    </label>
                    <label>
                      Approximate budget
                      <select defaultValue="">
                        <option value="" disabled>Choose a range</option>
                        <option>Prefer to discuss</option>
                        <option>₦100k – ₦250k</option>
                        <option>₦250k – ₦500k</option>
                        <option>₦500k – ₦1m</option>
                        <option>₦1m+</option>
                      </select>
                    </label>
                  </div>
                </FormBlock>

                <FormBlock number="03" title="Your vision">
                  <label>
                    Tell us about the look
                    <textarea
                      rows={6}
                      placeholder="Colours, silhouette, coverage, fabric feel, embellishment, dress code or anything important to you..."
                    />
                  </label>
                  <label className="dc-file-zone">
                    <ImagePlus size={34} />
                    <strong>Add inspiration images</strong>
                    <span>Up to 4 images · concept only</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event) =>
                        setFileNames(
                          Array.from(event.target.files ?? [])
                            .slice(0, 4)
                            .map((file) => file.name)
                        )
                      }
                    />
                  </label>
                  {fileNames.length > 0 && (
                    <p className="dc-files">{fileNames.join(" · ")}</p>
                  )}
                </FormBlock>

                <div className="dc-submit-row">
                  <p>This preview does not send data anywhere yet.</p>
                  <button type="submit" className="dc-btn dc-btn-primary">
                    Send enquiry
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </main>
    </DayyahShell>
  );
}

function FormBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="dc-form-block">
      <header>
        <span>{number}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}

function ContactPage() {
  return (
    <DayyahShell>
      <main className="dc-main">
        <section className="dc-page-heading">
          <p className="dc-eyebrow">Contact</p>
          <h1>Let’s talk about the piece.</h1>
          <p className="dc-heading-note">
            For a finished Dayyah Couture site, confirmed WhatsApp, studio
            location, opening hours and consultation details would be added here.
          </p>
        </section>

        <section className="dc-contact-grid">
          <a
            href="https://www.instagram.com/dayyah_couture"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={24} />
            <div>
              <span>Instagram</span>
              <h2>@dayyah_couture</h2>
              <p>
                Explore the current public work and contact the brand through
                Instagram.
              </p>
            </div>
            <ArrowUpRight size={22} />
          </a>

          <a href={href("start-order")}>
            <MessageCircle size={24} />
            <div>
              <span>Website enquiry</span>
              <h2>Start your order</h2>
              <p>
                Share the event, date, location, budget and inspiration before
                consultation.
              </p>
            </div>
            <ArrowUpRight size={22} />
          </a>
        </section>

        <section className="dc-soft-cta">
          <div>
            <p className="dc-eyebrow">For the finished website</p>
            <h2>One place for every serious enquiry.</h2>
          </div>
          <div className="dc-soft-copy">
            <p>
              Instead of losing important project details across Instagram DMs,
              WhatsApp chats and screenshots, the website can collect the full
              brief first and then hand the conversation over to the channel
              Dayyah Couture prefers.
            </p>
            <a href={href("process")} className="dc-btn dc-btn-primary">
              See how it works
            </a>
          </div>
        </section>
      </main>
    </DayyahShell>
  );
}

export function DayyahSubpage({ page }: { page: string }) {
  if (page === "collections") return <CollectionsPage />;
  if (page === "gallery") return <GalleryPage />;
  if (page === "start-order") return <OrderPage />;
  if (page === "contact") return <ContactPage />;
  if (editorialPages[page]) return <EditorialPage {...editorialPages[page]} />;

  return (
    <DayyahShell>
      <main className="dc-missing">
        <p className="dc-eyebrow">Dayyah Couture</p>
        <h1>This page isn’t part of the concept.</h1>
        <a href={ROOT} className="dc-btn dc-btn-primary">Back to the homepage</a>
      </main>
    </DayyahShell>
  );
}
