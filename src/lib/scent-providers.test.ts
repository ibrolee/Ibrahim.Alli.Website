import { expect, test, spyOn } from "bun:test";
import { searchOpenFacts } from "./scent-providers";

// These tests use local JSON fixtures only. No network calls or paid API quotas.
test("Open Beauty Facts returns product photos, not deodorant cards", async () => {
  const spy=spyOn(globalThis,"fetch").mockResolvedValue(Response.json({
    count:3,products:[
      {code:"12345",brands:"Lattafa",product_name:"Khamrah Eau de Parfum 100ml",image_front_url:"https://images.openbeautyfacts.org/images/products/khamrah.jpg",categories_tags:["en:perfumes"]},
      {code:"12346",brands:"Lattafa",product_name:"Yara Deodorant 100ml",image_front_url:"https://images.openbeautyfacts.org/images/products/deo.jpg",categories_tags:["en:deodorants"]},
      {code:"12347",brands:"Lattafa",product_name:"Asad Eau de Parfum",image_front_url:"https://images.openbeautyfacts.org/images/products/asad.jpg",categories_tags:["en:perfumes"]}
    ]
  }));
  try{
    const result=await searchOpenFacts("Lattafa",1,"beautyfacts");
    expect(result.source).toBe("beautyfacts");
    expect(result.results.length).toBe(2);
    expect(result.results[0]?.image?.startsWith("https://")).toBe(true);
    expect(result.results.every(p=>!p.name.toLowerCase().includes("deodorant"))).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(String(spy.mock.calls[0]?.[0])).toContain("world.openbeautyfacts.org");
  }finally{spy.mockRestore();}
});

test("Open Products Facts shares the search API and requires real images", async () => {
  const spy=spyOn(globalThis,"fetch").mockResolvedValue(Response.json({
    count:2,products:[
      {code:"888",brands:"Afnan",product_name:"9PM Eau de Parfum",image_front_url:"https://images.openproductsfacts.org/images/products/9pm.jpg"},
      {code:"889",brands:"Afnan",product_name:"9PM Perfume Oil"}
    ]
  }));
  try{
    const result=await searchOpenFacts("Afnan",1,"productsfacts");
    expect(result.results).toHaveLength(1);
    expect(result.results[0]?.id).toBe("productsfacts:888");
    expect(String(spy.mock.calls[0]?.[0])).toContain("world.openproductsfacts.org");
  }finally{spy.mockRestore();}
});

test("No remote calls on invalid free catalogue responses beyond the mocked request", async () => {
  const spy=spyOn(globalThis,"fetch").mockResolvedValue(new Response("<html>temporarily down</html>",{status:200,headers:{"content-type":"text/html"}}));
  try{
    await expect(searchOpenFacts("Dior",1,"beautyfacts")).rejects.toThrow("non-JSON");
    expect(spy).toHaveBeenCalledTimes(1);
  }finally{spy.mockRestore();}
});

test("public catalogues exclude scented bleach and non-perfume brand products",async()=>{
 const spy=spyOn(globalThis,"fetch").mockImplementation(async()=>Response.json({count:4,products:[
  {code:"1",brands:"Auchan",product_name:"Eau de javel parfum citron",image_front_url:"https://example.com/bleach.jpg"},
  {code:"2",brands:"Dior",product_name:"Forever Foundation",image_front_url:"https://example.com/makeup.jpg"},
  {code:"3",brands:"Dior",product_name:"Sauvage Eau de Parfum",image_front_url:"https://example.com/sauvage.jpg"},
  {code:"4",brands:"Dior",product_name:"Scented Laundry Fragrance",image_front_url:"https://example.com/detergent.jpg"}
 ]}));
 try{
  const discovery=await searchOpenFacts("eau de parfum",1,"productsfacts");
  expect(discovery.results.map(p=>p.name)).toEqual(["Sauvage Eau de Parfum"]);
  const branded=await searchOpenFacts("Dior",1,"productsfacts");
  expect(branded.results.map(p=>p.name)).toEqual(["Sauvage Eau de Parfum"]);
 }finally{spy.mockRestore();}
});
