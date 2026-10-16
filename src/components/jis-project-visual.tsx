import "@/jis-showcase.css";

/** Captures of the real storefront and product pages. */
export function JisProjectVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`jis-portfolio-visual jis-captured-visual ${className}`}
      role="img"
      aria-label="JIS Beauty and Fashion storefront, fragrance catalogue and product options"
    >
      <div className="jis-capture-heading">
        <span>JIS BEAUTY & FASHION</span>
        <strong>
          A scent of its own.
          <br />A complete store experience.
        </strong>
        <small>STOREFRONT · CATALOGUE · PRODUCT OPTIONS · CHECKOUT</small>
      </div>
      <div className="jis-capture-home">
        <div className="jis-capture-bar">
          <i />
          <i />
          <i />
          <span>jisbeautyfashion.com</span>
        </div>
        <img
          src="/project-screens/jis-home.webp"
          alt=""
          width="1363"
          height="936"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="jis-capture-product">
        <img
          src="/project-screens/jis-product.webp"
          alt=""
          width="1363"
          height="936"
          loading="lazy"
          decoding="async"
        />
        <span>Product details & scent options</span>
      </div>
      <div className="jis-capture-shop">
        <img
          src="/project-screens/jis-shop.webp"
          alt=""
          width="1363"
          height="936"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="jis-capture-footer">
        <span>From discovering a scent to reviewing the bag.</span>
        <span>DESIGN + DEVELOPMENT</span>
      </div>
    </div>
  );
}
