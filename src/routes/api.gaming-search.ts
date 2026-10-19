import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });

export const Route = createFileRoute("/api/gaming-search")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const query = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
        const appId = (url.searchParams.get("appId") ?? "").trim();
        if (appId) {
          if (!/^\d{1,12}$/.test(appId)) return json({ error: "Invalid Steam app ID." }, 400);
          try {
            const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&l=english`, {
              headers: { Accept: "application/json", "User-Agent": "IbrahimAlliGamingLibrary/1.0" },
              signal: AbortSignal.timeout(7000),
            });
            if (!response.ok) return json({ error: "Steam details are temporarily unavailable." }, 502);
            const data = await response.json() as Record<string, { success?: boolean; data?: any }>;
            const item = data[appId];
            if (!item?.success || !item.data) return json({ error: "Steam has no details for this game." }, 404);
            return json({
              id: Number(appId),
              name: String(item.data.name ?? ""),
              genre: Array.isArray(item.data.genres) ? item.data.genres.map((g: { description?: string }) => g.description).filter(Boolean).join(" · ") : "",
              year: String(item.data.release_date?.date ?? ""),
              description: String(item.data.short_description ?? ""),
              headerImage: String(item.data.header_image ?? ""),
            });
          } catch {
            return json({ error: "Could not reach Steam for game details." }, 502);
          }
        }
        if (query.length < 2) return json({ items: [] });
        try {
          const response = await fetch("https://store.steampowered.com/api/storesearch/?term=" + encodeURIComponent(query) + "&l=english&cc=us", {
            headers: { Accept: "application/json", "User-Agent": "IbrahimAlliGamingLibrary/1.0" },
            signal: AbortSignal.timeout(7000),
          });
          if (!response.ok) return json({ error: "Steam search is temporarily unavailable." }, 502);
          const data = await response.json() as { items?: Array<{ id: number; name: string; tiny_image?: string }> };
          const items = Array.isArray(data.items) ? data.items.slice(0, 8).map(item => ({
            id: Number(item.id),
            name: String(item.name),
            tiny_image: item.tiny_image,
          })) : [];
          return json({ items });
        } catch {
          return json({ error: "Could not reach Steam. Please try again." }, 502);
        }
      },
    },
  },
});
