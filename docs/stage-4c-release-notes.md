# Stage 4C — Release & QA notes

**Date:** 14 October 2026  
**Review branch:** `preview/review-stage-4c-client-growth-2026-10-14`  
**Based on:** `preview/review-stage-4b-client-documents-2026-10-13` (cleaned Stage 4B public-onboarding-only branch)  
**Publication:** Not live until both Stage 4B and 4C are explicitly approved.

## Feature summary
- Public **/industries** hub linking to four mobile-friendly niche website offers.
- Four SEO routes: **/for/fitness**, **/for/fashion**, **/for/schools**, **/for/online-stores**.
- Industry-specific challenges, possible features, questions, calls to action, and truthful project context.
- Actual portfolio work with Super Plus Fitness is described as real; JIS Beauty & Fashion web design/development is not claimed to have active checkout/sales; proposed school portal is clearly labelled a concept, not a delivered client.
- Links added to existing **/services**, mobile navigation, footer and sitemap; compact homepage unchanged.
- Industry context carried into **/start-project** using a predefined allowlist, and included in the reviewable email/WhatsApp brief.
- Existing Vercel analytics extended with **portfolio_industry_cta_click** and **portfolio_industry_enquiry_handoff** events. Payload consists ONLY of allowlisted industry codes and limited action/placement/channel values. No submitted form names, emails, URLs, or notes are tracked. Handoff is NOT counted as a confirmed sent message or a lead.
- Outreach strategy, four personalized pitch templates, follow-up guidance and real-world conversion review documented in `docs/stage-4c-outreach-playbook.md`.

## Verification
- [x] Latest preview deployment READY on branch head
- [x] Homepage still compact and has no Document Studio links
- [x] Hub and all four industry landing routes return HTTP 200
- [x] All four SEO routes have unique titles, canonical URLs and contextual page content
- [x] Unknown industry URL returns HTTP 404
- [x] Services contains four niche links
- [x] Project enquiry preselects service and shows validated industry context (fitness/school example tested)
- [x] Client Onboarding, Stage 4A Audit, Maintenance, Work, FAQs, portfolio PDF and sitemap remain available
- [x] Removed Document Studio and owner login routes return HTTP 404
- [x] Sitemap includes five new public pages
- [ ] Test CTA clicks, analytics event delivery and email/WhatsApp handoffs manually on iPhone
- [ ] Manually inspect small iPhone and desktop layout plus dark-mode rendering
- [ ] Confirm dashboard event availability under the user's Vercel analytics plan
- [ ] Publish only after explicit approval

## Release order
The Stage 4C PR should target the cleaned Stage 4B review branch, not `main`, so it remains reviewable separately. After approval, merge Stage 4B into main first; rebase or retarget Stage 4C onto main and merge second. Verify the final production domain and new routes after deployment.

## No invented data
No client conversions, quotes won, website traffic changes, revenue effects, school contracts, JIS sales, or guaranteed outcomes are claimed in the public pages or playbook. These are opportunities to evaluate after a real outreach campaign.
