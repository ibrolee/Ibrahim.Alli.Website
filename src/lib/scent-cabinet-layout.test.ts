import { describe, expect, test } from "bun:test";

describe("mobile shelf and wishlist density", () => {
  test("both personal lists use the cabinet grid, but Discover remains separate", async () => {
    const route = await Bun.file(new URL("../routes/fragrance.tsx", import.meta.url)).text();
    expect(route).toContain('className="sc-grid sc-cabinet-grid">{list.map(x=>item(x.perfume,"collection",x))}');
    expect(route).toContain('className="sc-grid sc-cabinet-grid">{store.wishlist.map(p=>item(p,"wishlist"))}');
    expect(route).toContain('className="sc-grid">{filteredPhotographed.map(p=>item(p,"discover"))}');
    expect(route).toContain('page==="collection"&&<div className="sc-stats sc-stats-naira sc-collection-stats"');
  });

  test("compact cards keep a 2-column mobile grid, wide images, readable names and actions", async () => {
    const css = await Bun.file(new URL("../fragrance.css", import.meta.url)).text();
    const scoped = css.slice(css.indexOf("/* Compact cabinet browsing:"));
    expect(scoped).toContain(".sc-cabinet-grid{grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(scoped).toContain("aspect-ratio:1.7");
    expect(scoped).toContain(".sc-cabinet-grid .sc-perfume .sc-name{");
    expect(scoped).toContain("font-size:18px");
    expect(scoped).toContain(".sc-cabinet-grid .sc-perfume-actions button{");
    expect(scoped).toContain("min-height:35px");
    expect(scoped).toContain(".sc-collection-stats.sc-stats.sc-stats-naira{");
    expect(scoped).not.toContain(".sc-discover-grid");
  });
});
