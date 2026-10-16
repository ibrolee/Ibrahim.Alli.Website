import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { SCENT_SEED, seedSearch } from "./lib/scent-catalog-seed";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/** Public, read-only fragrance search relay.
 * Keeps the UI on its own origin and avoids exposing provider keys.
 * Strictly allows browse/search and bounds request size. No owner data goes upstream.
 */
async function fragranceSearch(request: Request): Promise<Response> {
  if (request.method !== "GET") return new Response("Method not allowed", { status: 405 });
  const url = new URL(request.url);
  const mode = url.pathname.endsWith("/search") ? "search" : url.pathname.endsWith("/browse") ? "browse" : null;
  if (!mode) return new Response("Not found", { status: 404 });
  const q = (url.searchParams.get("q") || "").trim().slice(0, 90);
  const page = Math.min(100, Math.max(1, Math.floor(Number(url.searchParams.get("page")) || 1)));
  const curated = (mode === "browse" ? SCENT_SEED.slice((page - 1) * 20, page * 20) : seedSearch(q, page, 20));
  // A deterministic curated fallback always works even when the external provider is offline.
  if (mode === "browse" || q.length < 2) {
    return Response.json({results: curated, total: mode === "browse" ? SCENT_SEED.length : 0, source: "curated", catalogue: "starter"}, {
      headers: {"cache-control":"public, max-age=300"}
    });
  }
  const remote = new URL("https://world.openbeautyfacts.org/cgi/search.pl");
  remote.searchParams.set("search_terms", q);
  remote.searchParams.set("search_simple", "1");
  remote.searchParams.set("action", "process");
  remote.searchParams.set("json", "1");
  remote.searchParams.set("page", String(page));
  remote.searchParams.set("page_size", "30");
  remote.searchParams.set("fields", "code,product_name,product_name_en,brands,image_front_url,image_url,image_front_small_url,categories,quantity");
  try {
    const response = await fetch(remote, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ScentCabinetPersonal/1.0 (https://ibrahimalli.com/fragrance; personal collection catalogue)"
      },
      signal: AbortSignal.timeout(6500)
    });
    if (!response.ok) throw new Error("Open Beauty Facts status " + response.status);
    const text = await response.text();
    if (text.length > 1_200_000) throw new Error("Catalogue response too large");
    if (!response.headers.get("content-type")?.toLowerCase().includes("json"))
      throw new Error("Catalogue did not return JSON");
    const data = JSON.parse(text) as { products?: Array<Record<string,unknown>>; count?:number };
    if (!Array.isArray(data.products)) throw new Error("Unexpected product schema");
    const live = data.products.filter(d => {
      const name = String(d["product_name"] || d["product_name_en"] || "").trim();
      const brand = String(d["brands"] || "").trim();
      return name.length > 1 && brand.length > 1;
    }).map(d=>({
      id:"obf:"+String(d["code"]||""),
      name:String(d["product_name"]||d["product_name_en"]),
      brand:String(d["brands"]),
      image:String(d["image_front_url"]||d["image_url"]||d["image_front_small_url"]||""),
      notes:[],top:[],heart:[],base:[],accords:[],
      family:String(d["quantity"]||"")
    }));
    // Put curated results first so official Qasida and popular brands stay findable.
    const merged = [...curated];
    const seen = new Set(merged.map(p=>(p.brand+" "+p.name).toLowerCase().replace(/[^a-z0-9]/g,"")));
    for (const p of live) {
      const id = (p.brand+" "+p.name).toLowerCase().replace(/[^a-z0-9]/g,"");
      if (!seen.has(id) && p.id!=="obf:") {merged.push(p);seen.add(id);}
    }
    return Response.json({results:merged, total: Math.max(merged.length,Number(data.count)||0),source:"openbeautyfacts+curated",catalogue:"community-products"},{
      headers:{"cache-control":"public, max-age=300"}
    });
  } catch (error) {
    console.warn("Optional Open Beauty Facts catalogue unavailable", error instanceof Error ? error.message : "unknown");
    return Response.json({ results:curated, total:curated.length,source:"curated", catalogue:"starter", providerWarning: "Community catalogue is temporarily unavailable. Showing built-in fragrances."},{
      headers:{"cache-control":"public, max-age=120"}
    });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname.startsWith("/api/fragrance/")) return await fragranceSearch(request);
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
