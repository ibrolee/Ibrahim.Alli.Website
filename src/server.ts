import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

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
  const q = (url.searchParams.get("q") || "").trim().slice(0, 100);
  if (mode === "search" && !q) return Response.json({ results: [], total: 0 });
  const page = Math.min(100, Math.max(1, Math.floor(Number(url.searchParams.get("page")) || 1)));
  const remote = new URL("https://api.thepreservationnetwork.org/v1/fragrances/" + mode);
  remote.searchParams.set("page", String(page));
  remote.searchParams.set("per_page", "20");
  if (mode === "search") remote.searchParams.set("q", q);
  else remote.searchParams.set("sort", "year_desc");
  try {
    const response = await fetch(remote.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(13000)
    });
    if (!response.ok) return Response.json({ error: "Catalogue provider unavailable" }, { status: 502 });
    const text = await response.text();
    if (text.length > 1_000_000) return Response.json({ error: "Catalogue response too large" }, { status: 502 });
    const data = JSON.parse(text);
    const rows = data?.results ?? data?.fragrances ?? data?.items ?? data?.data?.results;
    if (!Array.isArray(rows)) return Response.json({ error: "Unexpected catalogue response" }, { status: 502 });
    // Relay only public catalogue data and never cache user-owned prices or wishlists.
    return new Response(JSON.stringify({ results: rows.slice(0, 20), total: Number(data.total) || null, page }), {
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=180" }
    });
  } catch (error) {
    console.warn("Fragrance provider search failed", error instanceof Error ? error.message : "unknown");
    return Response.json({ error: "Fragrance catalogue not reachable" }, { status: 503 });
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
