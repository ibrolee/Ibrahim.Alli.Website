export function JisProjectVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`jis-portfolio-visual ${className}`}
      role="img"
      aria-label="JIS Beauty & Fashion live storefront showing the signature scent homepage and fragrance collections"
    >
      <div className="jis-portfolio-glow jis-portfolio-glow-a" aria-hidden="true" />
      <div className="jis-portfolio-glow jis-portfolio-glow-b" aria-hidden="true" />

      <div className="jis-portfolio-screen jis-portfolio-home">
        <div className="jis-mini-header">
          <span className="jis-mini-menu">☰</span>
          <span className="jis-mini-logo">JIS <small>BEAUTY & FASHION</small></span>
          <span className="jis-mini-icons">⌕　▢</span>
        </div>
        <div
          className="jis-home-scene"
          style={{ backgroundImage: "url(https://jisbeautyfashion.com/catalog/category-women-v2.jpg)" }}
        >
          <span className="jis-season">✦ NEW SEASON FRAGRANCES</span>
          <h3>Discover Your<br />Signature Scent</h3>
          <p>Fragrance that speaks before you do.</p>
          <span className="jis-shop-button">SHOP NOW　↗</span>
          <div className="jis-quick-pills">
            <span>FOR HER</span><span>FOR HIM</span><span>UNISEX</span>
          </div>
        </div>
      </div>

      <div className="jis-portfolio-screen jis-portfolio-categories">
        <div className="jis-mini-header">
          <span className="jis-mini-menu">☰</span>
          <span className="jis-mini-logo">JIS <small>BEAUTY & FASHION</small></span>
          <span className="jis-mini-icons">⌕　▢</span>
        </div>
        <div className="jis-category-body">
          <div className="jis-category-tabs"><b>SHOP ALL</b><span>WOMEN</span><span>MEN</span><span>UNISEX</span></div>
          <small>SHOP BY MOOD / 01</small>
          <h3>Your scent wardrobe,<br /><em>in full colour.</em></h3>
          <p>Move from soft florals to deep woods, playful everyday sprays and concentrated oils.</p>
          <div
            className="jis-category-preview"
            style={{ backgroundImage: "url(https://jisbeautyfashion.com/catalog/category-women-v2.jpg)" }}
          >
            <span>EDIT 01</span>
            <strong>Women</strong>
          </div>
        </div>
      </div>

      <div className="jis-portfolio-screen jis-portfolio-men">
        <div className="jis-mini-header">
          <span className="jis-mini-menu">☰</span>
          <span className="jis-mini-logo">JIS <small>BEAUTY & FASHION</small></span>
          <span className="jis-mini-icons">⌕　▢</span>
        </div>
        <div className="jis-men-body">
          <div
            className="jis-men-card"
            style={{ backgroundImage: "url(https://jisbeautyfashion.com/catalog/category-men-v2.jpg)" }}
          >
            <div><small>EXPLORE CATEGORY</small><strong>Men</strong><p>Bold woods, fresh citrus and deep amber scents.</p></div>
            <i>↗</i>
          </div>
          <div
            className="jis-unisex-card"
            style={{ backgroundImage: "url(https://jisbeautyfashion.com/catalog/category-unisex-v2.jpg)" }}
          >
            <span>EDIT 03</span>
            <div><small>1 PRODUCT</small><strong>Unisex</strong><p>Genderless compositions built around clean woods and rare florals.</p></div>
          </div>
        </div>
      </div>

      <span className="jis-live-badge">JIS BEAUTY & FASHION · LIVE STOREFRONT</span>
    </div>
  );
}
