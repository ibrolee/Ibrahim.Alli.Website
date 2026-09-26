import { useEffect, useMemo, useState, createContext, useContext, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const ROOT = "/sallys-apparel";

const IMG = {
  hero: "https://images.unsplash.com/photo-1773991188360-87e01a338cbc?auto=format&fit=crop&q=88&w=1800",
  editorial: "https://images.unsplash.com/photo-1773991188331-5a62224146f6?auto=format&fit=crop&q=88&w=1800",
  beige: "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&q=88&w=1600",
  rose: "https://images.unsplash.com/photo-1604669757519-601509914f94?auto=format&fit=crop&q=88&w=1600",
  floralScarf: "https://images.unsplash.com/photo-1773739687471-1b338689148f?auto=format&fit=crop&q=88&w=1600",
  scarves: "https://images.unsplash.com/photo-1554168396-aab725fa9d34?auto=format&fit=crop&q=88&w=1600",
  skirt: "https://images.unsplash.com/photo-1651019546509-10e5588c98b6?auto=format&fit=crop&q=88&w=1600",
};

type Category = "Abayas" | "Hijabs" | "Scarves" | "Skirts" | "Sets";

type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  alternate: string;
  badge?: string;
  colors: { name: string; value: string }[];
  sizes: string[];
  note: string;
};

const products: Product[] = [
  {
    slug: "amara-pleated-abaya",
    name: "Amara Pleated Abaya",
    category: "Abayas",
    price: 38500,
    image: IMG.hero,
    alternate: IMG.beige,
    badge: "New",
    colors: [
      { name: "Cobalt", value: "#244f8f" },
      { name: "Terracotta", value: "#d26953" },
      { name: "Plum", value: "#5a2948" },
    ],
    sizes: ["52", "54", "56", "58", "60"],
    note: "A fluid everyday abaya with a soft pleated fall and an easy, polished silhouette.",
  },
  {
    slug: "zuri-satin-hijab",
    name: "Zuri Satin Hijab",
    category: "Hijabs",
    price: 8500,
    image: IMG.rose,
    alternate: IMG.floralScarf,
    badge: "Bestseller",
    colors: [
      { name: "Rose", value: "#c9556c" },
      { name: "Berry", value: "#70264e" },
      { name: "Champagne", value: "#d8bea2" },
    ],
    sizes: ["180 × 70 cm"],
    note: "A luminous satin hijab made to bring a refined finish to both occasion and everyday looks.",
  },
  {
    slug: "sola-maxi-skirt",
    name: "Sola Maxi Skirt",
    category: "Skirts",
    price: 22500,
    image: IMG.skirt,
    alternate: IMG.editorial,
    badge: "Fresh drop",
    colors: [
      { name: "Mulberry", value: "#783d70" },
      { name: "Ink", value: "#20273a" },
      { name: "Sand", value: "#cbb89e" },
    ],
    sizes: ["S", "M", "L", "XL"],
    note: "A full-length skirt with graceful movement, a clean waistband and effortless styling versatility.",
  },
  {
    slug: "mosaic-print-scarf",
    name: "Mosaic Print Scarf",
    category: "Scarves",
    price: 12500,
    image: IMG.floralScarf,
    alternate: IMG.scarves,
    badge: "Limited",
    colors: [
      { name: "Floral", value: "#ef6d5f" },
      { name: "Marigold", value: "#e2a62d" },
      { name: "Teal", value: "#287b7a" },
    ],
    sizes: ["One size"],
    note: "A vibrant statement scarf designed to lift neutral outfits and add colour without overpowering the look.",
  },
  {
    slug: "sahara-open-abaya",
    name: "Sahara Open Abaya",
    category: "Abayas",
    price: 44000,
    image: IMG.beige,
    alternate: IMG.hero,
    badge: "Signature",
    colors: [
      { name: "Oat", value: "#c7ae8d" },
      { name: "Cocoa", value: "#7f5a49" },
      { name: "Black", value: "#171719" },
    ],
    sizes: ["52", "54", "56", "58"],
    note: "An elevated open abaya with delicate detailing and a relaxed drape for dressed-up modest layering.",
  },
  {
    slug: "everyday-soft-hijab",
    name: "Everyday Soft Hijab",
    category: "Hijabs",
    price: 6500,
    image: IMG.editorial,
    alternate: IMG.rose,
    colors: [
      { name: "Burnt Orange", value: "#d4633e" },
      { name: "Marine", value: "#31558a" },
      { name: "Cream", value: "#efe5d5" },
    ],
    sizes: ["180 × 75 cm"],
    note: "A breathable, easy-drape hijab for daily wear, designed for comfortable styling from morning to evening.",
  },
  {
    slug: "colour-story-scarf",
    name: "Colour Story Scarf",
    category: "Scarves",
    price: 10500,
    image: IMG.scarves,
    alternate: IMG.floralScarf,
    badge: "Colour edit",
    colors: [
      { name: "Saffron", value: "#d7a320" },
      { name: "Ocean", value: "#2f6480" },
      { name: "Wine", value: "#7d2f3d" },
      { name: "Olive", value: "#70774c" },
    ],
    sizes: ["One size"],
    note: "A soft accessory scarf offered in a broad colour story for easy wardrobe pairing and gifting.",
  },
  {
    slug: "naya-two-piece-set",
    name: "Naya Two-Piece Set",
    category: "Sets",
    price: 46500,
    image: IMG.rose,
    alternate: IMG.beige,
    badge: "New",
    colors: [
      { name: "Berry", value: "#8a334e" },
      { name: "Blush", value: "#d59a9a" },
      { name: "Espresso", value: "#513c36" },
    ],
    sizes: ["S", "M", "L", "XL"],
    note: "A coordinated modest set that makes getting dressed simple while still feeling considered and put together.",
  },
];

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");
const productHref = (slug: string) => ROOT + "/product/" + slug;

type StoreContextValue = {
  bag: string[];
  saved: string[];
  addToBag: (name: string) => void;
  toggleSaved: (slug: string) => void;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("Sally's store context is unavailable");
  return value;
}

function SallyShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      setBag(JSON.parse(window.localStorage.getItem("sallys-demo-bag") || "[]"));
      setSaved(JSON.parse(window.localStorage.getItem("sallys-demo-saved") || "[]"));
    } catch {
      setBag([]);
      setSaved([]);
    }
  }, []);

  const addToBag = (name: string) => {
    setBag((current) => {
      const next = [...current, name];
      window.localStorage.setItem("sallys-demo-bag", JSON.stringify(next));
      return next;
    });
    setBagOpen(true);
  };

  const toggleSaved = (slug: string) => {
    setSaved((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];
      window.localStorage.setItem("sallys-demo-saved", JSON.stringify(next));
      return next;
    });
  };

  return (
    <StoreContext.Provider value={{ bag, saved, addToBag, toggleSaved, bagOpen, setBagOpen }}>
      <div className="sa-site">
        <div className="sa-topline">
          <span>Concept e-commerce preview · sample imagery, products & prices</span>
          <span>Nationwide delivery across Nigeria</span>
        </div>

        <header className="sa-header">
          <button className="sa-icon-button sa-menu-button" type="button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a href={ROOT} className="sa-logo" aria-label="Sally's Apparel home">
            <span>Sally’s</span>
            <small>APPAREL</small>
          </a>

          <nav className="sa-nav" aria-label="Sally's Apparel navigation">
            <a href={ROOT + "/shop"}>New in</a>
            <a href={ROOT + "/shop"}>Abayas</a>
            <a href={ROOT + "/shop"}>Hijabs</a>
            <a href={ROOT + "/shop"}>Scarves</a>
            <a href={ROOT + "/shop"}>Skirts</a>
          </nav>

          <div className="sa-actions">
            <button className="sa-icon-button" type="button" onClick={() => setSearchOpen((v) => !v)} aria-label="Search">
              <Search size={18} />
            </button>
            <a href={ROOT + "/shop"} className="sa-icon-button sa-heart-link" aria-label="Wishlist">
              <Heart size={18} />
              {saved.length > 0 && <span>{saved.length}</span>}
            </a>
            <button className="sa-icon-button sa-bag-button" type="button" onClick={() => setBagOpen(true)} aria-label="Shopping bag">
              <ShoppingBag size={18} />
              <span>{bag.length}</span>
            </button>
          </div>
        </header>

        {menuOpen && (
          <nav className="sa-mobile-nav">
            <a href={ROOT + "/shop"}>Shop all <ArrowRight size={16} /></a>
            <a href={ROOT + "/shop"}>Abayas <ArrowRight size={16} /></a>
            <a href={ROOT + "/shop"}>Hijabs <ArrowRight size={16} /></a>
            <a href={ROOT + "/shop"}>Scarves <ArrowRight size={16} /></a>
            <a href={ROOT + "/shop"}>Skirts & sets <ArrowRight size={16} /></a>
            <a href="https://www.instagram.com/sallys_apparel.ng/" target="_blank" rel="noreferrer">
              Instagram <Instagram size={16} />
            </a>
          </nav>
        )}

        {searchOpen && (
          <div className="sa-search-panel">
            <Search size={20} />
            <input autoFocus placeholder="Search abayas, hijabs, scarves, skirts..." aria-label="Search Sally's Apparel" />
            <a href={ROOT + "/shop"}>Browse all</a>
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={20} /></button>
          </div>
        )}

        {children}

        <footer className="sa-footer">
          <div className="sa-footer-brand">
            <a href={ROOT} className="sa-logo sa-logo-light">
              <span>Sally’s</span>
              <small>APPAREL</small>
            </a>
            <p>Colourful modest fashion for everyday dressing, special moments and everything between.</p>
            <a href="https://www.instagram.com/sallys_apparel.ng/" target="_blank" rel="noreferrer" className="sa-instagram">
              <Instagram size={16} /> @sallys_apparel.ng
            </a>
          </div>
          <div className="sa-footer-columns">
            <div>
              <small>Shop</small>
              <a href={ROOT + "/shop"}>New arrivals</a>
              <a href={ROOT + "/shop"}>Abayas</a>
              <a href={ROOT + "/shop"}>Hijabs & scarves</a>
              <a href={ROOT + "/shop"}>Skirts & sets</a>
            </div>
            <div>
              <small>Customer care</small>
              <span>Nationwide delivery</span>
              <span>Size assistance</span>
              <span>Order support</span>
              <span>Easy catalogue browsing</span>
            </div>
          </div>
          <div className="sa-footer-bottom">
            <span>Concept preview by Ibrahim Alli</span>
            <span>Not the official Sally’s Apparel website</span>
          </div>
        </footer>

        {bagOpen && (
          <div className="sa-drawer-backdrop" onClick={() => setBagOpen(false)}>
            <aside className="sa-bag-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping bag">
              <div className="sa-drawer-head">
                <div>
                  <small>Your bag</small>
                  <h2>{bag.length} {bag.length === 1 ? "item" : "items"}</h2>
                </div>
                <button type="button" onClick={() => setBagOpen(false)} aria-label="Close bag"><X size={20} /></button>
              </div>
              <div className="sa-drawer-body">
                {bag.length === 0 ? (
                  <div className="sa-empty-bag">
                    <ShoppingBag size={30} />
                    <p>Your demo bag is empty.</p>
                    <a href={ROOT + "/shop"}>Start shopping <ArrowRight size={15} /></a>
                  </div>
                ) : (
                  <>
                    {bag.map((item, index) => (
                      <div className="sa-bag-row" key={item + index}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item}</strong>
                        <Check size={16} />
                      </div>
                    ))}
                    <p className="sa-demo-note">This concept shows the shopping flow. Checkout and live payments would be connected in the real store.</p>
                  </>
                )}
              </div>
              <a className="sa-checkout-demo" href={ROOT + "/shop"}>Continue shopping <ArrowRight size={16} /></a>
            </aside>
          </div>
        )}
      </div>
    </StoreContext.Provider>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToBag, saved, toggleSaved } = useStore();
  const isSaved = saved.includes(product.slug);

  return (
    <article className="sa-product-card">
      <div className="sa-product-media">
        <a href={productHref(product.slug)}>
          <img className="sa-primary-image" src={product.image} alt={product.name} />
          <img className="sa-alt-image" src={product.alternate} alt="" aria-hidden="true" />
        </a>
        {product.badge && <span className="sa-product-badge">{product.badge}</span>}
        <button
          type="button"
          className={"sa-save " + (isSaved ? "active" : "")}
          onClick={() => toggleSaved(product.slug)}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <button type="button" className="sa-quick-add" onClick={() => addToBag(product.name)}>
          Quick add <Plus size={14} />
        </button>
      </div>
      <div className="sa-product-copy">
        <div>
          <small>{product.category}</small>
          <a href={productHref(product.slug)}><h3>{product.name}</h3></a>
        </div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <div className="sa-swatches">
        {product.colors.slice(0, 4).map((color) => <i key={color.name} title={color.name} style={{ background: color.value }} />)}
        <span>{product.colors.length} colours</span>
      </div>
    </article>
  );
}

export function SallysHome() {
  return (
    <SallyShell>
      <main>
        <section className="sa-hero">
          <div className="sa-hero-copy">
            <span className="sa-kicker"><Sparkles size={15} /> Sally’s colour story</span>
            <h1>Modest,<br /><em>never muted.</em></h1>
            <p>Abayas, hijabs, scarves, skirts and more — curated into a colourful shopping experience built to make modest dressing feel expressive, easy and premium.</p>
            <div className="sa-hero-actions">
              <a href={ROOT + "/shop"} className="sa-btn sa-btn-light">Shop the edit <ArrowRight size={16} /></a>
              <a href={ROOT + "/shop"} className="sa-text-link">Explore all categories</a>
            </div>
            <div className="sa-hero-stats">
              <div><strong>01</strong><span>Shop by category</span></div>
              <div><strong>02</strong><span>Choose colour & size</span></div>
              <div><strong>03</strong><span>Nationwide delivery</span></div>
            </div>
          </div>

          <div className="sa-hero-visual">
            <div className="sa-hero-photo sa-hero-photo-main"><img src={IMG.hero} alt="Colourful modest fashion editorial" /></div>
            <div className="sa-hero-photo sa-hero-photo-small"><img src={IMG.rose} alt="Rose modest fashion look" /></div>
            <div className="sa-floating-tag"><span>THE</span><strong>COLOUR</strong><span>EDIT</span></div>
            <div className="sa-orbit">new · expressive · modest · effortless ·</div>
          </div>
        </section>

        <section className="sa-marquee" aria-label="Store highlights">
          <div>
            <span>ABAYAS</span><i>✦</i><span>HIJABS</span><i>✦</i><span>SCARVES</span><i>✦</i><span>SKIRTS</span><i>✦</i><span>MODEST SETS</span><i>✦</i><span>NATIONWIDE DELIVERY</span>
          </div>
        </section>

        <section className="sa-intro">
          <div>
            <span className="sa-section-label">A wardrobe with range</span>
            <h2>Find your shade.<br />Find your silhouette.</h2>
          </div>
          <p>Sally’s Apparel can grow beyond an Instagram catalogue into a store where customers move naturally from inspiration to category, product, variation, bag and order.</p>
        </section>

        <section className="sa-category-bento">
          <a href={ROOT + "/shop"} className="sa-cat sa-cat-abaya">
            <img src={IMG.beige} alt="Abaya collection" />
            <div><small>01</small><h3>Abayas</h3><span>Soft structure, elevated details <ArrowRight size={15} /></span></div>
          </a>
          <a href={ROOT + "/shop"} className="sa-cat sa-cat-hijab">
            <div className="sa-cat-colour-block">
              <span>Hijabs</span>
              <strong>every shade of you.</strong>
              <div className="sa-colour-dots"><i /><i /><i /><i /><i /></div>
            </div>
          </a>
          <a href={ROOT + "/shop"} className="sa-cat sa-cat-scarf">
            <img src={IMG.floralScarf} alt="Colourful scarf collection" />
            <div><small>03</small><h3>Scarves</h3><span>Print, texture, personality <ArrowRight size={15} /></span></div>
          </a>
          <a href={ROOT + "/shop"} className="sa-cat sa-cat-skirt">
            <img src={IMG.skirt} alt="Skirt collection" />
            <div><small>04</small><h3>Skirts & sets</h3><span>Easy modest styling <ArrowRight size={15} /></span></div>
          </a>
        </section>

        <section className="sa-products-section">
          <div className="sa-products-head">
            <div><span className="sa-section-label">Freshly selected</span><h2>New & noteworthy</h2></div>
            <a href={ROOT + "/shop"}>Shop all <ArrowRight size={15} /></a>
          </div>
          <div className="sa-product-grid">
            {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>

        <section className="sa-editorial">
          <div className="sa-editorial-photo"><img src={IMG.editorial} alt="Colourful hijab editorial look" /></div>
          <div className="sa-editorial-copy">
            <span>THE SALLY’S EDIT</span>
            <h2>Colour is part<br />of the outfit.</h2>
            <p>A more expressive brand direction gives Sally’s a distinctive visual identity without losing the simplicity customers need when they are actually shopping.</p>
            <a href={ROOT + "/shop"} className="sa-btn sa-btn-dark">Shop colour stories <ArrowRight size={16} /></a>
          </div>
          <div className="sa-editorial-palette">
            <span>Plum</span><i style={{ background: "#5b173b" }} />
            <span>Coral</span><i style={{ background: "#ec745e" }} />
            <span>Marigold</span><i style={{ background: "#efb33e" }} />
            <span>Teal</span><i style={{ background: "#267b78" }} />
          </div>
        </section>

        <section className="sa-products-section sa-most-loved">
          <div className="sa-products-head">
            <div><span className="sa-section-label">Most loved</span><h2>Build the look</h2></div>
            <a href={ROOT + "/shop"}>View catalogue <ArrowRight size={15} /></a>
          </div>
          <div className="sa-product-grid">
            {products.slice(4, 8).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>

        <section className="sa-service-strip">
          <div><Truck size={22} /><strong>Nationwide delivery</strong><span>Designed for customers anywhere in Nigeria.</span></div>
          <div><Sparkles size={22} /><strong>Easy product discovery</strong><span>Categories, search, filters and clear variations.</span></div>
          <div><Heart size={22} /><strong>Save your favourites</strong><span>Wishlist pieces before deciding what to buy.</span></div>
        </section>

        <section className="sa-instagram-cta">
          <span>@sallys_apparel.ng</span>
          <h2>From scroll<br />to storefront.</h2>
          <p>Instagram stays the social showcase. The website becomes the organised place to browse, compare, choose and order.</p>
          <a href="https://www.instagram.com/sallys_apparel.ng/" target="_blank" rel="noreferrer">Visit Instagram <ArrowRight size={15} /></a>
        </section>
      </main>
    </SallyShell>
  );
}

export function SallysShop() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || (product.name + " " + product.category).toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  const categories: Array<"All" | Category> = ["All", "Abayas", "Hijabs", "Scarves", "Skirts", "Sets"];

  return (
    <SallyShell>
      <main>
        <section className="sa-shop-hero">
          <div>
            <a href={ROOT}><ArrowLeft size={15} /> Sally’s Apparel</a>
            <span className="sa-section-label">The full colour wardrobe</span>
            <h1>Shop all.</h1>
          </div>
          <p>Search, filter and sort a growing catalogue without losing the playful Sally’s identity.</p>
        </section>

        <section className="sa-shop-toolbar">
          <div className="sa-filter-tabs">
            {categories.map((item) => (
              <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="sa-shop-tools">
            <label className="sa-shop-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces" /></label>
            <label className="sa-sort"><SlidersHorizontal size={14} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="az">Name: A–Z</option>
            </select><ChevronDown size={14} /></label>
          </div>
        </section>

        <section className="sa-catalog">
          <div className="sa-catalog-meta"><span>{visible.length} pieces</span><span>Sample catalogue for presentation</span></div>
          <div className="sa-product-grid">
            {visible.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
          {visible.length === 0 && <div className="sa-no-results"><h2>No pieces found.</h2><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
        </section>
      </main>
    </SallyShell>
  );
}

export function SallysProduct({ slug }: { slug: string }) {
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <SallyShell>
        <main className="sa-missing">
          <h1>Piece not found.</h1>
          <a href={ROOT + "/shop"}>Back to the shop <ArrowRight size={15} /></a>
        </main>
      </SallyShell>
    );
  }

  return <SallyShell><ProductDetail product={product} /></SallyShell>;
}

function ProductDetail({ product }: { product: Product }) {
  const { addToBag, saved, toggleSaved } = useStore();
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 4);
  const isSaved = saved.includes(product.slug);

  return (
    <main>
      <div className="sa-breadcrumbs">
        <a href={ROOT}>Home</a><span>/</span><a href={ROOT + "/shop"}>Shop</a><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong>
      </div>

      <section className="sa-product-page">
        <div className="sa-gallery">
          <div className="sa-gallery-main"><img src={product.image} alt={product.name} /></div>
          <div className="sa-gallery-alt"><img src={product.alternate} alt={product.name + " styling view"} /></div>
          <div className="sa-gallery-colour">
            <span>available palette</span>
            <div>{product.colors.map((color) => <i key={color.name} style={{ background: color.value }} title={color.name} />)}</div>
          </div>
        </div>

        <div className="sa-product-info">
          {product.badge && <span className="sa-inline-badge">{product.badge}</span>}
          <small>{product.category}</small>
          <h1>{product.name}</h1>
          <p className="sa-product-price">{formatPrice(product.price)}</p>
          <p className="sa-product-note">{product.note}</p>

          <div className="sa-option">
            <div><span>Colour</span><strong>{product.colors[colorIndex].name}</strong></div>
            <div className="sa-color-options">
              {product.colors.map((color, index) => (
                <button key={color.name} type="button" className={index === colorIndex ? "active" : ""} onClick={() => setColorIndex(index)} aria-label={"Choose " + color.name}>
                  <i style={{ background: color.value }} />
                </button>
              ))}
            </div>
          </div>

          <div className="sa-option">
            <div><span>Size</span><strong>{product.sizes[sizeIndex]}</strong></div>
            <div className="sa-size-options">
              {product.sizes.map((size, index) => (
                <button key={size} type="button" className={index === sizeIndex ? "active" : ""} onClick={() => setSizeIndex(index)}>{size}</button>
              ))}
            </div>
          </div>

          <div className="sa-purchase">
            <div className="sa-quantity">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><Minus size={14} /></button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
            </div>
            <button type="button" className="sa-add-button" onClick={() => {
              for (let i = 0; i < quantity; i += 1) addToBag(product.name);
            }}>Add to bag <ShoppingBag size={16} /></button>
            <button type="button" className={"sa-product-save " + (isSaved ? "active" : "")} onClick={() => toggleSaved(product.slug)} aria-label="Toggle wishlist">
              <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="sa-delivery-note"><Truck size={20} /><div><strong>Nationwide delivery</strong><span>Delivery fee and timeline shown at checkout in the real store.</span></div></div>

          <div className="sa-info-rows">
            <div><span>Product details</span><Plus size={15} /></div>
            <div><span>Size & fit</span><Plus size={15} /></div>
            <div><span>Delivery & returns</span><Plus size={15} /></div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sa-products-section sa-related">
          <div className="sa-products-head"><div><span className="sa-section-label">Keep browsing</span><h2>You may also like</h2></div></div>
          <div className="sa-product-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div>
        </section>
      )}
    </main>
  );
}
