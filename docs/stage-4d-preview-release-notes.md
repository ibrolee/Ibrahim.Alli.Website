# Stage 4D — Editorial content, real proof and search readiness

**Prepared:** 14 October 2026  
**Branch:** `preview/review-stage-4d-search-and-content-2026-10-14`  
**Based on:** `main` after published Stage 4B & 4C.  
**Release status:** Preview only; merge only with explicit owner approval.

## Public changes

1. **/insights** — a dedicated editorial hub for three practical, business-focused guides.
2. **/insights/how-much-does-a-business-website-cost** — what shapes quotes, ongoing costs, exclusions, and comparing proposals.
3. **/insights/launching-an-online-store-checklist** — products, checkout choices, provider eligibility, fulfilment and support.
4. **/insights/website-redesign-or-improvement** — how to decide between a small update and a safe redesign/migration.
5. **/projects/super-plus-fitness** and **/projects/jis-beauty-fashion** — decision-and-rationale cards with accurate owner relationship and explicit project status, plus trackable project enquiry CTA.
6. Corrected JIS language throughout portfolio content: **the store has been developed but is not yet used for commercial sales**. No invented purchases, checkout usage, growth, external commissions or revenue.
7. **/services** offers a tasteful, low-pressure link to the three guides, with **/insights** also in the footer. The short homepage and compact iPhone navigation remain unchanged.

## Search readiness

- Unique HTML titles, descriptions, canonical links and Open Graph metadata for each guide.
- Article and BreadcrumbList JSON-LD only for the content actually visible on the article page; no fake ratings, dates, authors, entities or conversions.
- `public/sitemap.xml` adds the four public guide URLs. Existing robots file advertises the sitemap.
- Search Console **cannot be connected or verified by repo code alone**. Exact user-side DNS/domain property setup and indexing instructions are in `docs/stage-4d-search-analytics-setup.md`.

## Enquiry metrics

- `portfolio_insight_cta_click` — visitor navigates from a guide to the project enquiry page, with allowlisted article and placement only.
- `portfolio_insight_enquiry_handoff` — visitor chooses to continue in email or WhatsApp from the enquiry form after following a guide, with allowlisted article and channel only.
- `portfolio_case_study_cta_click` — visitor opens the enquiry page from a verified project case study.
- Existing project/industry handoff events preserved. None imply a delivered email, qualified lead, paid project, or return on investment.
- No new analytics subscription or client data store is added.
- The connected Vercel custom-events query returned no results on 14 October for the requested earlier period; this **does not** prove no website visits, conversions or enquiries.
- See `docs/stage-4d-search-analytics-setup.md` for a privacy-conscious manual client response tracker and metrics definitions.

## Preview verification

- [x] Vercel preview deployment READY after repairing an early JSX build typo.
- [x] 21 expected HTTP 200 checks: homepage, editorial hub, three guides, two project case studies, Services, guide-prefilled enquiry form, Work, Client Onboarding, Industries, industry Fashion page, Free Audit, Maintenance, FAQs, About, Photography, sitemap, robots and portfolio PDF.
- [x] 3 expected HTTP 404 checks: nonexistent guide, removed Document Studio and removed owner login.
- [x] Editorial hub contains 3 guide links; all 3 guides have unique titles, canonical tags, JSON-LD and preparation checklists.
- [x] Both case studies render decision/rationale cards. JIS shows its pre-launch status.
- [x] /services links to /insights, the guide enquiry URL preserves context, sitemap lists all three guides, and the old homepage remains short.
- [ ] Physically test iPhone Safari scrolling, guide links and form email/WhatsApp handoffs.
- [ ] Manually inspect true-black system dark mode and PDF printing.
- [ ] Verify analytics event delivery on real production traffic after owner approves.
- [ ] Google Search Console Domain TXT verification and sitemap submission (owner action).

**No publication without explicit permission.**
