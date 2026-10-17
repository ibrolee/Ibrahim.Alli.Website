import {test,expect} from "bun:test";
import {filterAndSortDiscover,valueForLongevity,valueForProjection,DEFAULT_DISCOVER_FILTERS,type FragranceForFilters} from "./scent-filters";
const scents:FragranceForFilters[]=[
 {id:"one",brand:"Lattafa",name:"Scent One",year:"2024",longevity:"Very Long Lasting",projection:"Strong",rating:4.5,gender:"unisex",accords:["oud","amber"],bestSeasons:["winter"]},
 {id:"two",brand:"Afnan",name:"Scent Two",year:"2022",longevity:"Moderate",projection:"Intimate",rating:3.9,gender:"men",accords:["citrus"],bestSeasons:["summer"]},
 {id:"three",brand:"Other",name:"Scent Three",year:"2025",accords:[]}
];
function run(filters:Partial<typeof DEFAULT_DISCOVER_FILTERS>={},prices:Record<string,number>={}){
 const values={...DEFAULT_DISCOVER_FILTERS,...filters};
 return filterAndSortDiscover(scents,values,{"one":{priceNGN:35000},...Object.fromEntries(Object.entries(prices).map(([id,n])=>[id,{priceNGN:n}]))},()=>undefined).map(p=>p.id);
}
test("Longevity tiers reflect provider descriptions, never guess unknown",()=>{
 expect(valueForLongevity("Very Long Lasting")).toBe(5);
 expect(valueForLongevity("Long Lasting")).toBe(4);
 expect(valueForLongevity("Unknown")).toBe(0);
 expect(run({longevity:"4"})).toEqual(["one"]);
});
test("Projection strong threshold does not treat intimate or missing as strong",()=>{
 expect(valueForProjection("Strong")).toBe(4);
 expect(valueForProjection("Enormous")).toBe(5);
 expect(run({projection:"4"})).toEqual(["one"]);
 expect(run({projection:"5"})).toEqual([]);
});
test("NGN budget only considers explicitly saved prices, not foreign currency or missing",()=>{
 expect(run({budget:"40000"})).toEqual(["one"]);
 expect(run({budget:"20000"})).toEqual([]);
 expect(run({budget:"20000"},{two:18000})).toEqual(["two"]);
});
test("Rating, seasons, accords and gender filter locally",()=>{
 expect(run({minRating:"4.5"})).toEqual(["one"]);
 expect(run({season:"winter"})).toEqual(["one"]);
 expect(run({accord:"citrus"})).toEqual(["two"]);
 expect(run({gender:"unisex"})).toEqual(["one"]);
});
test("Sort puts unranked entries last without querying providers",()=>{
 expect(run({sort:"rating"})).toEqual(["one","two","three"]);
 expect(run({sort:"newest"})).toEqual(["three","one","two"]);
 expect(run({sort:"price-low"})).toEqual(["one","two","three"]);
});
