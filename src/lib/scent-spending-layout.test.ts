import {describe,expect,test} from "bun:test";

describe("Scent Cabinet Spending page simplification",()=>{
  test("has just the main purchase-cost statistics and the purchase history",async()=>{
    const route=await Bun.file(new URL("../routes/fragrance.tsx",import.meta.url)).text();
    const section=route.split('{page==="worth"&&<section')[1]?.split('{page==="layer"&&<section')[0]||"";
    expect(section).toContain('className="sc-section sc-spending-section"');
    expect(section).toContain("Your fragrance collection");
    expect(section).toContain("Purchase history");
    expect(section).toContain("legacyUSD>0");
    expect(section).toContain("store.collection.map(");
    expect(section).toContain("myCombos.map(");
    expect(section).not.toContain("sc-worth-summary");
    expect(section).not.toContain("sc-worth-explain");
    expect(section).not.toContain("Add a bottle");
    expect(route).toContain('(page==="collection"||page==="worth")&&<div className={"sc-stats');
  });
  test("removes the repeated bottom branding and backup footer but retains the top backup action",async()=>{
    const route=await Bun.file(new URL("../routes/fragrance.tsx",import.meta.url)).text();
    expect(route).not.toContain('<footer className="sc-footer">');
    expect(route).toContain('aria-label="Backup and restore my collection"');
    expect(route).toContain('aria-label="Ibrahim Alli home"');
  });
});
