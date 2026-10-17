# Ibrahim Alli portfolio — Cloudflare Workers preview

This is an **isolated migration preview**. Do not change the production domain, GitHub `main`, or the current Vercel project until smoke tests and the Cloudflare deployment have been reviewed.

## Current migration scope

- Git branch: `migration/cloudflare-portfolio-2026-10-17`
- Source repository: `ibrolee/Ibrahim.Alli.Website`
- Worker name in `wrangler.jsonc`: `ibrahimalli-portfolio-preview`
- Output: Nitro server `.output/server/index.mjs`, static assets `.output/public`
- Tested via GitHub Actions (build, packaging dry-run, local workerd home, fragrance and API checks)
- Server-side fragrance API keys read from Cloudflare Worker env bindings with Node/Vercel fallback
- **No custom domain is configured**. The real `ibrahimalli.com` must remain on Vercel.

## Cloudflare account connection — only when ready

1. Open Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Import a repository / GitHub**.
2. Select the repository `ibrolee/Ibrahim.Alli.Website`. Name the Worker exactly **`ibrahimalli-portfolio-preview`** to match `wrangler.jsonc`.
3. Set the **production branch of this preview Worker** to `migration/cloudflare-portfolio-2026-10-17`. This does *not* change the portfolio's GitHub main branch or public website. Check **Settings → Build → Branch control** before deploying.
4. Root directory `/` (repository root). Build command: `bun run build`. Deploy command: `npx --yes wrangler@4.135.0 deploy`. Use automatic Git integration for installs. Do not add any custom domain or DNS route.
5. Enable its `workers.dev` URL. Use that temporary URL for validation.
6. Under Worker **Settings → Variables and Secrets**, add the secret names `FRAGELLA_API_KEY` and `NOTEBOXD_API_KEY`, with their existing provider values. Never put them in source code or `wrangler.jsonc`. If preview secret settings are separate from production Worker settings, set them only in the environment being tested.
7. Test the exact Worker URL for `/`, `/fragrance`, `/api/fragrance/browse`, and a user-triggered `/api/fragrance/search?q=Lattafa&page=1`. Search consumes upstream API quota; avoid continuous automated search probes.

## Key checks before any production switch

- Homepage, desktop/mobile navigation, project pages, forms and portfolio graphics render.
- Scent Cabinet, saved combos, manual uploads, wishlist, backup/restore and NGN totals function.
- Fragrance API keys stay server-side, and search returns provider photos or graceful fallback.
- Workers runtime CPU, bundle size and request limits are sufficient.
- No automatic deploy is triggered from the public `main` branch to the preview Worker.
- Check `www` and apex domain routing before migrating the real domain. The domain remains with Vercel during this test.
- **Browser storage depends on origin.** Visiting a workers.dev preview cannot automatically access Scent Cabinet data stored on `ibrahimalli.com`; use Backup/Restore if you want to test with real saved data. Later, moving hosting at the *same exact canonical domain* preserves browser storage.

## Rollback

Keep the existing Vercel production deployment and its custom domain active until explicitly approved. If the Cloudflare preview has issues, fix only this migration branch. Do not point `ibrahimalli.com` to the preview Worker.

## Preview rebuild after branch selection

- Cloudflare preview Worker's production branch was switched in its dashboard to `migration/cloudflare-portfolio-2026-10-17`.
- This commit intentionally triggers Git-connected build automation for the isolated preview Worker only.
- Keep `ibrahimalli.com` on Vercel; do not add production domains to this Worker.
