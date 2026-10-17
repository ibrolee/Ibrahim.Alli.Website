import { describe, expect, test } from "bun:test";

// Guard the UI wiring against accidentally restoring automatic browsing.
// Full browser interaction checks remain a separate deployment smoke test.
describe("Scent Cabinet Discover manual search", () => {
  test("only submitted requests or Load more trigger the catalogue fetch", async () => {
    const route = await Bun.file(new URL("../routes/fragrance.tsx", import.meta.url)).text();
    expect(route).toContain("const [searchRequest,setSearchRequest]=useState<");
    expect(route).toMatch(/requestedPage:number}\|null>\(null\)/);
    expect(route).toMatch(/useEffect\(\(\)=>\{\s*if\(!searchRequest\)return;/);
    expect(route).toContain("},[searchRequest]);");
    expect(route).toContain('const path="/search";');
    expect(route).not.toContain('const path=query.trim()?"/search":"/browse"');
    expect(route).toContain("onSubmit={e=>{e.preventDefault();runDiscoverSearch(draftQuery)}}");
    expect(route).toContain("onClick={loadMoreDiscover}");
  });

  test("suggestion chips, source changes and clearing do not start searches", async () => {
    const route = await Bun.file(new URL("../routes/fragrance.tsx", import.meta.url)).text();
    expect(route).toContain("onClick={()=>setDraftQuery(t)}");
    expect(route).toContain("onChange={e=>setSourceChoice(e.target.value as CatalogSource)}");
    expect(route).toContain("onClick={clearDiscoverSearch}");
    expect(route).toContain("setSearchRequest(null);setSearching(false);");
    expect(route).not.toContain("onClick={()=>{setDraftQuery(t);runDiscoverSearch(t)}}");
    expect(route).not.toContain("setRefreshKey(");
  });
});
