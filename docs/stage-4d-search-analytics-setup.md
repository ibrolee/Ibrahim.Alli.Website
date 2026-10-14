# Stage 4D — Search visibility and client enquiry measurement

*Internal setup checklist; not a public page. Last reviewed 14 October 2026.*

## What the website code can prepare

- Canonical URLs and unique descriptive page titles on the new `/insights` index and three standalone guides.
- Article and breadcrumb JSON-LD on guide pages; existing truthful Person/WebSite schema stays in place.
- Updated `/sitemap.xml` to list new public guides; `/robots.txt` already advertises the sitemap.
- Genuine internal links from Services and Footer. The compact homepage and iPhone navigation are unchanged.
- Real project case studies now explain the decisions made and their actual status. No fake testimonials, performance claims, customer conversions, sales or school contracts.
- New non-identifying Vercel custom event names: `portfolio_insight_cta_click`, `portfolio_insight_enquiry_handoff`, `portfolio_case_study_cta_click`. Existing industry and standard enquiry events are preserved.

**Not possible from a website-code change alone:** creating or claiming ownership of a Google Search Console property; validating DNS; guaranteeing Google indexing or high search ranking; or collecting confirmed enquiries without a form backend or manual follow-up. These require real account access and/or human confirmation.

## After publication: Google Search Console setup (site owner action)

1. Go to `https://search.google.com/search-console` and sign in to the Google account you want to own website search reporting.
2. Add a **Domain property** for `ibrahimalli.com` (enter the domain only, without `https://`).
3. Google provides a specific `google-site-verification=...` DNS TXT value. Add that exact TXT record **where the authoritative DNS zone is currently managed** (not automatically at your old domain registrar or hosting platform). Do not alter your existing A/CNAME/MX records.
4. Return to Search Console and click **Verify**. DNS propagation can take time. Do not claim verification until Google confirms it.
5. Go to **Sitemaps**, submit `https://ibrahimalli.com/sitemap.xml`, and check the processing result. Sitemap submission is a discovery hint, not a guarantee of indexing.
6. Use **URL Inspection** for your homepage, `/services`, `/work`, `/industries`, `/insights` and the key guides. Request indexing where eligible; examine actual canonical and crawl/indexing feedback.
7. After Search Console has accumulated actual impressions, review **Search results → Pages / Queries** for clicks, impressions, and queries. Avoid treating zero initial impressions as evidence the pages are broken.

Google may prefer a canonical version (`ibrahimalli.com` versus `www.ibrahimalli.com`). The website currently uses `https://ibrahimalli.com` as canonical; confirm the preferred host, redirects and DNS through a real fetch before changing domain routing. A working site on Vercel does not prove that any separate Cloudflare or registrar configuration is correct.

## How to measure enquiry performance, without inventing leads

### Existing Vercel Analytics

Use the existing Vercel project's **Web Analytics** if enabled for the relevant domain/deployment. For 1–2 weeks following Stage 4D publication, review:
- Pages: which of `/for/*`, `/insights/*`, `/projects/*` and `/services` receive traffic
- Traffic acquisition: referral/UTM source if the dashboard provides those dimensions
- Events: `portfolio_insight_cta_click` and `portfolio_case_study_cta_click` are **interest**, not enquiries
- Events: `portfolio_insight_enquiry_handoff`, `portfolio_industry_enquiry_handoff`, `portfolio_enquiry_handoff` are **handoffs to another app**, not proof the message was sent

A review of the Vercel custom-events endpoint on 14 October returned no event rows for the requested window. This does **not** prove there was no website traffic or no customer interest. Event availability may depend on analytics configuration, permissions, actual user actions, and deployment context.

### Manual client outcomes

Track only actual business interactions in a private record:
`Contact date | Industry or page | Source (when known) | Replied? | Qualified conversation? | Proposal sent? | Client booked? | Notes`

Record no names, emails, phone numbers, messages or free-form text in Vercel custom-event properties. When possible, ask new clients politely how they found your website. Keep outreach information only with appropriate consent and your own secure access.

### Sensible measures

1. **Traffic:** page views on a guide or industry landing page (a traffic measure, not a sales result)
2. **CTA rate:** relevant CTA clicks ÷ that page's views, when the date window and dimensions match
3. **Handoff rate:** outgoing WhatsApp/email actions ÷ CTA clicks (not all handoffs necessarily become messages)
4. **Qualified conversations:** actual replies that identify a real project need
5. **Conversion to client:** documented agreements/paid projects ÷ qualified opportunities in the same cohort

Events can be blocked by browser settings or browser extensions. No analytics platform is guaranteed to record every interaction.

## Stage 4D SEO sanity checklist

- [ ] Public guide pages and main portfolio pages return HTTP 200; deleted Document Studio routes return HTTP 404
- [ ] `/robots.txt` advertises `/sitemap.xml`
- [ ] Sitemap lists each intended guide URL once
- [ ] Each public article has a unique title, description, canonical and accurate article content
- [ ] JSON-LD is based on real site content, without invented ratings, sales, business metrics or fabricated publication dates
- [ ] Links from Guides → service enquiry preserve a supported service and allowed guide slug
- [ ] Light and true-black device dark mode readable; mobile menu still compact
- [ ] Manually test actual email and WhatsApp handoff and analytics events on an iPhone after publication
- [ ] Google Search Console DNS verification and indexing remain **pending user-side setup**, not marked complete by build success

**Release:** preview only until the site owner explicitly approves Stage 4D publication.
