# Stage 3 — Technical quality & SEO (preview)

**Date:** 13 October 2026
**Base:** `preview/stage-2-proof-and-portfolio-2026-10-13` (includes the compact homepage and all Stage 2 changes)
**This branch:** `preview/stage-3-seo-performance-accessibility-2026-10-13`
**Production:** `main` unchanged until the user approves the pending stages.

## Verified issues and changes

1. **Excessive global stylesheet loading.** Stage 2 homepage requested 15 stylesheets including one Google Fonts request. Five unrelated standalone-demo CSS files (Dayyah Couture, SAFIYYR, Sally's Apparel, Super Plus Studios and MIMS) were loaded on every portfolio page. Each demo's routes now link their own CSS, and root no longer globally links those five files. Stage 3 homepage requests **11 stylesheets including Google Fonts**, 4 fewer total; the added Stage 3 accessibility stylesheet accounts for one request. CSS remains loaded on respective demo routes. Confirm measured transfer bytes and Lighthouse before making a speed claim.
2. **Search identity.** Added truthful Person and WebSite JSON-LD on portfolio homepage (not on concept demos). No fabricated reviews, ratings, physical studio addresses or business performance claims.
3. **Social/search metadata.** Added canonical and sharing metadata for About page, an OG image and Twitter card for Photography, and responsive browser theme colors.
4. **Accessible photography lightbox.** Keeps keyboard focus in modal, restores focus to original thumbnail on close, and retains Escape/left/right keys. Gallery eager image count reduced; lazy-loads lower content.
5. **iPhone form zoom and mobile anchors.** Form controls use 16px on narrow screens; scroll-target offsets account for the floating site header; link/button/FAQ controls have more visible keyboard focus states.
6. **Analytics without personal fields.** Existing Vercel Web Analytics is reused. Added non-identifying events for brochure click, homepage project CTA clicks and when a person chooses an email or WhatsApp handoff. **A handoff click is not proof a message was sent or a project was booked.** No name, email, budget or freeform message is tracked.

## Baseline Vercel data (production, read-only)
Analytics API on 2026-10-13 returned 9 visitors and 246 pageviews in its adjusted reporting window from 2026-10-06 00:00 UTC to 2026-10-13 00:00 UTC, and zero custom events in that same window. These counts may include owner testing; they are not unique customer leads.

## QA / release checklist
- [x] Stage 3 Vercel preview build `READY` on the expected commit
- [x] Stage 2 vs Stage 3 SSR homepage stylesheet link counts: 15 -> 11, including Google Fonts
- [x] Standalone demo URLs serve their own CSS and keep noindex meta
- [x] Homepage structured data renders on preview, without fabricated claims
- [x] SEO tags present on real portfolio routes and site sitemap remains available
- [x] Major routes and Stage 2 brochure return HTTP 200
- [ ] Full Lighthouse/Core Web Vitals testing on mobile/desktop in a real browser
- [ ] Manual iPhone Safari touch/zoom and gallery modal Tab/Escape testing
- [ ] Inspect all demos' visual appearance, including dark mode on portfolio
- [ ] Measure actual post-release events after custom event support is confirmed
- [ ] Merge Stage 2 and Stage 3 to production only after user approval; since Stage 3 is based on Stage 2, deploy in order

## Important caveats
CSS request count alone does not prove improved Lighthouse or user-perceived load speed. Analytics counts do not prove enquiry completion. Visual QA cannot be substituted with HTTP-only checks. Do not publish to production before explicit approval.
