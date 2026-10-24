import {describe,expect,test} from "bun:test";

describe("Scent Cabinet premium finance dashboard",()=>{
  test("shows a distinct Spending dashboard without repeating Shelf's four-cell strip",async()=>{
    const route=await Bun.file(new URL("../routes/fragrance.tsx",import.meta.url)).text();
    const section=route.split('{page==="worth"&&<section')[1]?.split('{page==="layer"&&<section')[0]||"";
    expect(section).toContain('className="sc-section sc-finance-section"');
    expect(section).toContain("Collection <em>finances.</em>");
    expect(section).toContain("TOTAL RECORDED SPENDING");
    expect(section).toContain('money(totals.totalSpent,"NGN")');
    expect(section).toContain('money(totals.shelfCost,"NGN")');
    expect(section).toContain("Based on the amount paid, not resale value");
    expect(section).toContain("totals.onShelf");
    expect(section).toContain("totals.finished");
    expect(section).toContain("wishCount");
    expect(route).toContain('page==="collection"&&<div className="sc-stats sc-stats-naira sc-collection-stats"');
    expect(section).not.toContain("sc-worth-summary");
    expect(section).not.toContain("sc-worth-explain");
    expect(section).not.toContain("sc-stats sc-stats-naira");
  });
  test("preserves purchase history, edits, legacy warning and usable empty state",async()=>{
    const route=await Bun.file(new URL("../routes/fragrance.tsx",import.meta.url)).text();
    const section=route.split('{page==="worth"&&<section')[1]?.split('{page==="layer"&&<section')[0]||"";
    expect(section).toContain("Purchase history");
    expect(section).toContain("sc-finance-history");
    expect(section).toContain("legacyUSD>0");
    expect(section).toContain("store.collection.map(");
    expect(section).toContain("myCombos.map(");
    expect(section).toContain("onClick={()=>openPrice(x.perfume,x)}");
    expect(section).toContain("onClick={()=>editCombo(c)}");
    expect(section).toContain("Your collection story starts here.");
    expect(section).toContain("Explore fragrances");
    expect(section).toContain('aria-label="Add a fragrance purchase"');
    expect(section).not.toContain("sc-worth-summary");
  });
  test("removes the repeated bottom branding and backup footer but retains the top backup action",async()=>{
    const route=await Bun.file(new URL("../routes/fragrance.tsx",import.meta.url)).text();
    expect(route).not.toContain('<footer className="sc-footer">');
    expect(route).toContain('aria-label="Backup and restore my collection"');
    expect(route).toContain('aria-label="Ibrahim Alli home"');
  });
  test("keeps premium finance visuals compact on mobile",async()=>{
    const css=await Bun.file(new URL("../fragrance.css",import.meta.url)).text();
    const finance=css.slice(css.indexOf("/* Finance dashboard —"));
    expect(finance).toContain(".sc-finance-hero{");
    expect(finance).toContain(".sc-finance-mini-grid{");
    expect(finance).toContain(".sc-finance-history{");
    expect(finance).toContain("@media(max-width:660px)");
    expect(finance).toContain("padding:18px 0 calc(env(safe-area-inset-bottom,0px) + 104px)");
  });
});
