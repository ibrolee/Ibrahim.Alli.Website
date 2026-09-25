import { useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Truck,
  X,
} from "lucide-react";

const ROOT = "/safiyyr";
const FLOOT_ASSET = "https://safiyyr-preview.floot.app/_cdn/static";

const IMG = {
  hero: `${FLOOT_ASSET}/7da4bd6d-cd92-4405-9595-290bcc208408.png`,
  khimarBlack: `${FLOOT_ASSET}/dd9f225c-4469-4353-b750-92f7c68d2c8e.png`,
  khimarCream: `${FLOOT_ASSET}/2d6e8b07-0fe9-4126-b024-333bc5f9b71d.png`,
  khimarEditorial: `${FLOOT_ASSET}/d4818ec1-7402-4284-9cc5-74b0565a5583.png`,
  abayaMocha: `${FLOOT_ASSET}/33ed3bd2-2c33-47e7-906a-09b3d569515c.png`,
  abayaSage: `${FLOOT_ASSET}/f2e53791-3b9c-46dc-b95b-3f729e56c5d8.png`,
  abayaOlive: `${FLOOT_ASSET}/a7ad97a6-4a4b-4170-ad26-ed8cf74135ad.png`,
  prayer: `${FLOOT_ASSET}/270a0a6a-cc98-4ae9-8737-33c245a1b24d.png`,
  capBlack: `${FLOOT_ASSET}/c690c7d5-adc5-4dfc-b930-9580a5f4889d.png`,
  capTaupe: `${FLOOT_ASSET}/3621b2a8-9f67-4cc8-9e89-f273c9c2a6aa.png`,
};

type Product = {
  slug: string;
  name: string;
  category: "Khimars" | "Abayas" | "Prayer" | "Accessories";
  price: number;
  image: string;
  alternate: string;
  badge?: string;
  colors: { name: string; value: string }[];
  sizes: string[];
};

const products: Product[] = [
  {
    slug: "layali-layered-khimar",
    name: "Layali Layered Khimar",
    category: "Khimars",
    price: 28500,
    image: IMG.khimarBlack,
    alternate: IMG.khimarEditorial,
    badge: "Bestseller",
    colors: [
      { name: "Black", value: "#171717" },
      { name: "Mocha", value: "#8b6b59" },
      { name: "Stone", value: "#c8bba8" },
    ],
    sizes: ["S", "M", "L"],
  },
  {
    slug: "noor-flow-abaya",
    name: "Noor Flow Abaya",
    category: "Abayas",
    price: 42000,
    image: IMG.abayaMocha,
    alternate: IMG.abayaOlive,
    badge: "New",
    colors: [
      { name: "Mocha", value: "#8b6b59" },
      { name: "Black", value: "#171717" },
      { name: "Olive", value: "#65705a" },
    ],
    sizes: ["52", "54", "56", "58", "60"],
  },
  {
    slug: "safa-everyday-khimar",
    name: "Safa Everyday Khimar",
    category: "Khimars",
    price: 24500,
    image: IMG.khimarCream,
    alternate: IMG.khimarEditorial,
    colors: [
      { name: "Ivory", value: "#e8e1d3" },
      { name: "Dusty Rose", value: "#bb9790" },
      { name: "Black", value: "#171717" },
    ],
    sizes: ["S", "M", "L"],
  },
  {
    slug: "amani-soft-abaya",
    name: "Amani Soft Abaya",
    category: "Abayas",
    price: 39500,
    image: IMG.abayaSage,
    alternate: IMG.abayaOlive,
    badge: "Limited",
    colors: [
      { name: "Sage", value: "#9ca58d" },
      { name: "Sand", value: "#c9b99f" },
      { name: "Black", value: "#171717" },
    ],
    sizes: ["52", "54", "56", "58"],
  },
  {
    slug: "sujud-prayer-mat",
    name: "Sujud Prayer Mat",
    category: "Prayer",
    price: 18500,
    image: IMG.prayer,
    alternate: IMG.prayer,
    badge: "Gift pick",
    colors: [
      { name: "Sand", value: "#c9b99f" },
      { name: "Olive", value: "#65705a" },
    ],
    sizes: ["One size"],
  },
  {
    slug: "haya-premium-khimar",
    name: "Haya Premium Khimar",
    category: "Khimars",
    price: 32000,
    image: IMG.khimarEditorial,
    alternate: IMG.khimarBlack,
    badge: "New",
    colors: [
      { name: "Stone", value: "#b9ad9c" },
      { name: "Black", value: "#171717" },
      { name: "Cocoa", value: "#71584c" },
    ],
    sizes: ["S", "M", "L"],
  },
  {
    slug: "essential-jersey-cap",
    name: "Essential Jersey Cap",
    category: "Accessories",
    price: 8500,
    image: IMG.capBlack,
    alternate: IMG.capTaupe,
    colors: [
      { name: "Black", value: "#171717" },
      { name: "Taupe", value: "#a58f7b" },
      { name: "Cream", value: "#ddd1c0" },
    ],
    sizes: ["One size"],
  },
  {
    slug: "soft-fit-cap",
    name: "Soft Fit Cap",
    category: "Accessories",
    price: 9500,
    image: IMG.capTaupe,
    alternate: IMG.capBlack,
    badge: "New",
    colors: [
      { name: "Taupe", value: "#a58f7b" },
      { name: "Black", value: "#171717" },
    ],
    sizes: ["One size"],
  },
];

const formatPrice = (price: number) => `₦${price.toLocaleString("en-NG")}`;

function productHref(slug: string) {
  return `${ROOT}/product/${slug}`;
}

function SafiyyrShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="sf-site">
      <div className="sf-concept-bar">
        <span>Concept e-commerce preview · sample products & prices</span>
        <span>Nigeria · UK · USA · Canada</span>
      </div>

      <header className="sf-header">
        <button
          type="button"
          className="sf-mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <a href={ROOT} className="sf-brand" aria-label="SAFIYYR home">SAFIYYR</a>

        <nav className="sf-nav" aria-label="SAFIYYR navigation">
          <a href={`${ROOT}/shop`}>New in</a>
          <a href={`${ROOT}/shop`}>Khimars</a>
          <a href={`${ROOT}/shop`}>Abayas</a>
          <a href={`${ROOT}/shop`}>Prayer</a>
          <a href={`${ROOT}/shop`}>Accessories</a>
        </nav>

        <div className="sf-actions">
          <button type="button" aria-label="Search" onClick={() => setSearchOpen((value) => !value)}>
            <Search size={18} />
          </button>
          <a href={`${ROOT}/shop`} aria-label="Wishlist" className="sf-desktop-action"><Heart size={18} /></a>
          <a href={`${ROOT}/shop`} aria-label="Shopping bag" className="sf-bag"><ShoppingBag size={18} /><small>0</small></a>
        </div>
      </header>

      {searchOpen && (
        <div className="sf-search-bar">
          <Search size={18} />
          <input aria-label="Search SAFIYYR products" placeholder="Search khimars, abayas, prayer mats..." />
          <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={18} /></button>
        </div>
      )}

      {menuOpen && (
        <nav className="sf-mobile-nav" aria-label="SAFIYYR mobile navigation">
          <a href={`${ROOT}/shop`}>New arrivals</a>
          <a href={`${ROOT}/shop`}>Khimars</a>
          <a href={`${ROOT}/shop`}>Abayas</a>
          <a href={`${ROOT}/shop`}>Prayer essentials</a>
          <a href={`${ROOT}/shop`}>Caps & accessories</a>
          <a href="https://www.instagram.com/safiyyr_ng/" target="_blank" rel="noreferrer">
            Instagram <Instagram size={15} />
          </a>
        </nav>
      )}

      {children}

      <footer className="sf-footer">
        <div>
          <a href={ROOT} className="sf-footer-brand">SAFIYYR</a>
          <p>Contemporary modest fashion and prayer essentials for an everyday wardrobe that travels with you.</p>
          <a href="https://www.instagram.com/safiyyr_ng/" target="_blank" rel="noreferrer" className="sf-instagram">
            <Instagram size={16} /> @safiyyr_ng
          </a>
        </div>
        <div className="sf-footer-links">
          <div>
            <span>Shop</span>
            <a href={`${ROOT}/shop`}>Khimars</a>
            <a href={`${ROOT}/shop`}>Abayas</a>
            <a href={`${ROOT}/shop`}>Prayer essentials</a>
            <a href={`${ROOT}/shop`}>Accessories</a>
          </div>
          <div>
            <span>Delivery</span>
            <p>Nigeria</p>
            <p>United Kingdom</p>
            <p>United States</p>
            <p>Canada</p>
          </div>
        </div>
        <div className="sf-footer-bottom">
          <span>Concept preview by Ibrahim Alli</span>
          <span>Sample products, imagery and prices used for presentation</span>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="sf-product-card">
      <div className="sf-product-media">
        <a href={productHref(product.slug)}>
          <img src={product.image} alt={product.name} className="sf-product-primary" />
          <img src={product.alternate} alt="" className="sf-product-alt" aria-hidden="true" />
        </a>
        {product.badge && <span className="sf-badge">{product.badge}</span>}
        <button type="button" className="sf-heart" aria-label={`Save ${product.name}`}><Heart size={16} /></button>
        <a href={productHref(product.slug)} className="sf-quick-shop">Quick shop <Plus size={14} /></a>
      </div>
      <div className="sf-product-meta">
        <a href={productHref(product.slug)}>
          <small>{product.category}</small>
          <h3>{product.name}</h3>
        </a>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <div className="sf-swatches">
        {product.colors.map((color) => (
          <i key={color.name} title={color.name} style={{ background: color.value }} />
        ))}
        <span>{product.colors.length} colours</span>
      </div>
    </article>
  );
}

export function SafiyyrHome() {
  return (
    <SafiyyrShell>
      <main>
        <section className="sf-hero">
          <img src={IMG.hero} alt="SAFIYYR modest fashion concept" />
          <div className="sf-hero-shade" />
          <div className="sf-hero-copy">
            <span>SAFIYYR · Modest essentials</span>
            <h1>Modern modesty,<br />made effortless.</h1>
            <p>Khimars, abayas, prayer essentials and more — presented as a premium store built for choice, variation and easy browsing.</p>
            <a href={`${ROOT}/shop`} className="sf-underlined-link">Shop new arrivals <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="sf-benefit-strip">
          <span>Ships across Nigeria</span>
          <span>UK delivery</span>
          <span>USA & Canada</span>
          <span>Multiple colours & sizes</span>
        </section>

        <section className="sf-section">
          <div className="sf-section-head">
            <div><small>Just in</small><h2>New arrivals</h2></div>
            <a href={`${ROOT}/shop`}>Shop all <ArrowRight size={15} /></a>
          </div>
          <div className="sf-product-grid">
            {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>

        <section className="sf-category-layout">
          <a href={`${ROOT}/shop`} className="sf-category-main">
            <img src={IMG.khimarBlack} alt="Khimar collection" />
            <div><span>Khimars</span><h2>Coverage,<br />redefined.</h2><em>Explore khimars <ArrowRight size={15} /></em></div>
          </a>
          <div className="sf-category-stack">
            <a href={`${ROOT}/shop`} className="sf-category-small">
              <img src={IMG.abayaMocha} alt="Abaya collection" />
              <div><span>Abayas</span><strong>Soft structure. Easy movement.</strong></div>
            </a>
            <a href={`${ROOT}/shop`} className="sf-category-small">
              <img src={IMG.prayer} alt="Prayer essentials collection" />
              <div><span>Prayer</span><strong>Essentials for still moments.</strong></div>
            </a>
          </div>
        </section>

        <section className="sf-variant-feature">
          <div className="sf-variant-copy">
            <span>Built around choice</span>
            <h2>One style.<br />Your colour.<br />Your fit.</h2>
            <p>Products can carry multiple colours, sizes and variations without cluttering the storefront. Each option stays neatly organised on the product page.</p>
            <a href={productHref("noor-flow-abaya")} className="sf-underlined-link">See a product page <ArrowRight size={15} /></a>
          </div>
          <div className="sf-variant-image">
            <img src={IMG.abayaSage} alt="Sage abaya variation" />
            <div className="sf-variant-card"><span>Available in</span><div><i style={{ background: "#9ca58d" }} /><i style={{ background: "#c9b99f" }} /><i style={{ background: "#171717" }} /></div></div>
          </div>
        </section>

        <section className="sf-section">
          <div className="sf-section-head">
            <div><small>Popular now</small><h2>Most loved</h2></div>
            <a href={`${ROOT}/shop`}>View catalogue <ArrowRight size={15} /></a>
          </div>
          <div className="sf-product-grid">
            {products.slice(4, 8).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>

        <section className="sf-social-cta">
          <span>@safiyyr_ng</span>
          <h2>See it styled.</h2>
          <p>Follow current drops, styling and restocks on Instagram.</p>
          <a href="https://www.instagram.com/safiyyr_ng/" target="_blank" rel="noreferrer" className="sf-underlined-link">
            Visit Instagram <ArrowRight size={15} />
          </a>
        </section>
      </main>
    </SafiyyrShell>
  );
}

export function SafiyyrShop() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  const categories = ["All", "Khimars", "Abayas", "Prayer", "Accessories"];

  return (
    <SafiyyrShell>
      <main>
        <section className="sf-shop-intro">
          <span>SAFIYYR catalogue</span>
          <h1>Shop all</h1>
          <p>This concept catalogue demonstrates how a larger SAFIYYR inventory can stay clean, searchable and easy to browse as more products and variations are added.</p>
        </section>

        <section className="sf-shop-toolbar">
          <div className="sf-filter-tabs">
            {categories.map((item) => (
              <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="sf-shop-tools">
            <label className="sf-shop-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></label>
            <label className="sf-sort"><SlidersHorizontal size={14} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name: A–Z</option></select></label>
          </div>
        </section>

        <section className="sf-catalog">
          <div className="sf-count">{visibleProducts.length} products</div>
          <div className="sf-product-grid">
            {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>
      </main>
    </SafiyyrShell>
  );
}

export function SafiyyrProduct({ slug }: { slug: string }) {
  const product = products.find((item) => item.slug === slug);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <SafiyyrShell>
        <main className="sf-missing"><h1>Product not found</h1><a href={`${ROOT}/shop`}>Back to shop</a></main>
      </SafiyyrShell>
    );
  }

  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 4);

  return (
    <SafiyyrShell>
      <main>
        <div className="sf-breadcrumbs"><a href={`${ROOT}/shop`}>Shop</a><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong></div>

        <section className="sf-product-page">
          <div className="sf-gallery">
            <img src={product.image} alt={product.name} />
            <img src={product.alternate} alt={`${product.name} alternate concept view`} />
          </div>

          <aside className="sf-product-info">
            {product.badge && <span className="sf-badge sf-inline-badge">{product.badge}</span>}
            <h1>{product.name}</h1>
            <p className="sf-product-price">{formatPrice(product.price)}</p>
            <p className="sf-product-description">A SAFIYYR product presentation used to demonstrate a premium product-detail experience. Final fabric, care, measurements and stock details would come from the real product catalogue.</p>

            <div className="sf-option">
              <div><span>Colour</span><strong>{product.colors[colorIndex].name}</strong></div>
              <div className="sf-color-options">
                {product.colors.map((color, index) => (
                  <button type="button" key={color.name} onClick={() => setColorIndex(index)} className={colorIndex === index ? "active" : ""} aria-label={`Select ${color.name}`}>
                    <i style={{ background: color.value }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="sf-option">
              <div><span>Size</span><a href="#size-guide">Size guide</a></div>
              <div className="sf-size-options">
                {product.sizes.map((size, index) => (
                  <button type="button" key={size} onClick={() => setSizeIndex(index)} className={sizeIndex === index ? "active" : ""}>{size}</button>
                ))}
              </div>
            </div>

            <div className="sf-purchase">
              <div className="sf-quantity">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Reduce quantity"><Minus size={14} /></button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
              <button type="button" className="sf-add">Add to bag · {formatPrice(product.price * quantity)}</button>
              <button type="button" className="sf-wishlist" aria-label="Add to wishlist"><Heart size={18} /></button>
            </div>

            <div className="sf-delivery"><Truck size={18} /><div><strong>Delivery available</strong><span>Nigeria · United Kingdom · USA · Canada</span></div></div>

            <div className="sf-info-rows" id="size-guide">
              {["Product details", "Fabric & care", "Size & fit", "Shipping & returns"].map((item) => <div key={item}><span>{item}</span><Plus size={14} /></div>)}
            </div>
          </aside>
        </section>

        {related.length > 0 && (
          <section className="sf-related">
            <div className="sf-section-head"><div><small>Continue browsing</small><h2>You may also like</h2></div><a href={`${ROOT}/shop`}>View all <ArrowRight size={15} /></a></div>
            <div className="sf-product-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div>
          </section>
        )}
      </main>
    </SafiyyrShell>
  );
}
