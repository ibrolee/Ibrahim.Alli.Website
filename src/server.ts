import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { fragranceSearch } from "./lib/scent-gateway";
import { scentSyncApi } from "./lib/scent-sync-server";

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


export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname.startsWith("/api/fragrance/sync/")) {
        // Nitro may invoke this nested server entry with an empty/adapter env instead
        // of the Worker fetch bindings. Use Cloudflare's documented importable env
        // when the D1 binding is not present on the provided object.
        let runtimeEnv = env;
        if (!runtimeEnv || typeof runtimeEnv !== "object" || !("SCENT_SYNC_DB" in runtimeEnv)) {
          try {
            const cloudflare = await import("cloudflare:workers");
            runtimeEnv = cloudflare.env;
          } catch {
            // Non-Cloudflare tests and local dev can still show setup-needed.
          }
        }
        return await scentSyncApi(request, runtimeEnv);
      }
      if (new URL(request.url).pathname.startsWith("/api/fragrance/")) return await fragranceSearch(request, env, ctx && typeof ctx === "object" ? ctx : undefined);
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
