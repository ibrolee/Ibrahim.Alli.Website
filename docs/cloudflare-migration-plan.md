# Cloudflare portfolio migration — isolated validation

Status: **test branch only**. Do not merge into `main`, change DNS, remove Vercel, or assume this migration is production-ready until all gates below pass.

## Why this branch exists

The existing project is a Lovable-managed TanStack Start + Nitro app with a custom SSR error wrapper in `src/server.ts`. Its Vite config already registers a Nitro build configured for Cloudflare. Adding the official Cloudflare Vite plugin in parallel would duplicate plugins and risk breaking the app. The experimental `wrangler.jsonc` therefore packages the existing Nitro Cloudflare output (`.output/server/index.mjs` and `.output/public`), pending CI verification.

No database migration and no copy of credentials should be necessary for the portfolio. Vercel Analytics is included in the app and needs a separate analytics solution if its tracking is required after cutover.

## Stage 1 — build validation

The `cloudflare-migration-dryrun.yml` GitHub Action executes `bun install --frozen-lockfile`, `bun run build`, checks Nitro artifacts, and runs `wrangler deploy --dry-run` to check packaging. It never authenticates to Cloudflare and never deploys.

If it fails, read the build job logs and correct the *branch*. Do not change production Vercel configuration.

## Stage 2 — optional preview, once the owner connects a Cloudflare account

1. Connect the GitHub repo to Cloudflare Workers Builds, choosing this migration branch for the first test, **not** production `main`.
2. Set build command `bun run build`, deploy command `npx wrangler deploy`, and use `wrangler.jsonc` from this branch.
3. Publish a preview on a Cloudflare-assigned `*.workers.dev` address. Do not add `ibrahimalli.com` or `www.ibrahimalli.com` yet.
4. Confirm any Vercel-specific analytics either degrades harmlessly or is replaced; test analytics separately.
5. Smoke-test home, about, work, case studies, service pages, FAQ, photography, client demos, 404 pages, navigation, mobile dark mode, enquiry email and WhatsApp links, SEO, and assets. Note that external email/WhatsApp apps must be confirmed by a real device.
6. Compare page content and routing with the existing Vercel production site; do not publish a half-functional version.

## Stage 3 — domain cutover

1. Before changing DNS, record current DNS records, SSL mode and rollback procedure. Keep the Vercel site and domain configuration in place.
2. Cut over only after the Cloudflare preview is confirmed ready by the owner, and coordinate DNS and SSL so there is no avoidable disruption.
3. Re-test live hostname routes, redirects, assets, SEO, contact handoff and HTTPS immediately.
4. Keep Vercel as fallback until the agreed observation period passes.

**Super Plus Fitness must be migrated separately** and pass authenticated member/staff, payroll/attendance and payment callback tests. Do not cancel Vercel Pro until that site has also been cut over safely. JIS Beauty & Fashion is inactive and should remain out of this active hosting migration until the owner authorizes launch.

## Cloudflare connection progress — 13 October 2026

Cloudflare Workers project `ibrahimalli-portfolio` was created from GitHub, and its first manually initiated build completed on the default `main` branch. That build **is not** validation of this migration branch. This documentation-only commit triggers a separate preview build of `migration/cloudflare-portfolio-2026-10-13` via the enabled Worker Preview Builds integration. Inspect the resulting preview build and its URL in Cloudflare before any production domain change. Keep `main` as production branch and do not merge this PR during preview evaluation.
