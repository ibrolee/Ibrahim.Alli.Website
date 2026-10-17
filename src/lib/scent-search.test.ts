import {describe,expect,test} from "bun:test";
import {broaderSearchTerm,fragranceMatchScore} from "./scent-search";

const scent=(brand:string,name:string)=>({brand,name});
describe("fragrance search matching",()=>{
 test("matches missing spaces, punctuation, accents and reversed search words",()=>{
   expect(fragranceMatchScore(scent("Lattafa","Khamrah"),"lattafakhamrah")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Lattafa","Khamrah"),"Lattafa Khamrah")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Lattafa","Khamrah"),"khamrah lattafa")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Dior","Sauvage"),"Dior-Sauvage")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Maison Margiela","Replica"),"maisonmargielareplica")).toBeGreaterThan(0);
 });
 test("tolerates short trailing fragments and small spelling mistakes",()=>{
   expect(fragranceMatchScore(scent("Lattafa","Khamrah"),"lattafa khamra")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Lattafa","Khamrah"),"khamrha")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Dior","Sauvage"),"sauvge")).toBeGreaterThan(0);
 });
 test("excludes unrelated perfumes from a more specific request",()=>{
   expect(fragranceMatchScore(scent("Dior","Miss Dior"),"dior sauvage")).toBe(0);
   expect(fragranceMatchScore(scent("Lattafa","Asad"),"lattafa khamrah")).toBe(0);
   expect(fragranceMatchScore(scent("Zara","Rose"),"dior")).toBe(0);
   expect(fragranceMatchScore(scent("Dior","Sauvage"),"versace eros")).toBe(0);
 });
 test("allows brand searches without fake matches from family or notes",()=>{
   expect(fragranceMatchScore(scent("Lattafa","Asad"),"lattafa")).toBeGreaterThan(0);
   expect(fragranceMatchScore(scent("Dior","Sauvage"),"sauvage")).toBeGreaterThan(0);
 });
 test("only tries one wider query and strips bottle-size wording",()=>{
   expect(broaderSearchTerm("Lattafa Khamrah")).toBe("khamrah");
   expect(broaderSearchTerm("qasidasahn")).toBe("qasid");
   expect(broaderSearchTerm("sauvge")).toBe("sauv");
   expect(broaderSearchTerm("Dior")).toBeUndefined();
   expect(fragranceMatchScore(scent("Lattafa","Khamrah"),"Lattafa Khamrah 100ml")).toBeGreaterThan(0);
 });
});
