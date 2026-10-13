# Stage 1 — Client enquiry funnel (preview)

**Date:** October 13, 2026  
**Branch:** `preview/stage-1-client-enquiries-2026-10-13`  
**Production:** `main` — not modified by this stage.

## What changed
- Added a dedicated **/start-project** brief with name, email, brand, service type, timeline, optional budget and project description.
- The questionnaire has explicit **Continue in email** and **Continue in WhatsApp** actions. Both format the data as a message the visitor must review and send.
- Added **/services** directory and five SEO-friendly service-detail pages. Each includes scope, typical deliverables, discovery questions, related real work if available and a preselected enquiry service.
- Homepage service rows, package CTA, hero lead link and contact section now guide users to dedicated routes.
- Main navigation routes to the services index and the project enquiry form, including mobile drawer.
- Added five-step “How I Work” section and expandable FAQs to homepage.
- Added light/dark responsive styles in `src/freelance-stage1.css` and listed public pages in `public/sitemap.xml`.

## Important limitation
**This is a handoff-based form, not an on-site submitted lead database.**
- No submitted data or drafts are stored on a web server, database or third-party form platform.
- Email uses the visitor's configured mail app via `mailto:` with a filled subject and body.
- WhatsApp opens a prepared chat addressed to the portfolio's existing WhatsApp number.
- The visitor must press Send in the destination app. If an app isn't installed or configured, the visitor can choose the other channel.
- No false success confirmation or background send is displayed.
- For a full on-site send, a transactional email provider and server-side abuse safeguards would be required. Do not add credentials or storage without express approval.

## QA / release checklist
- [ ] Latest preview deployment matches the expected branch and commit, `READY`
- [ ] SSR HTTP 200: `/`, `/services`, all five `/services/:slug`, `/start-project`, existing `/about`, `/photography`, two portfolio projects
- [ ] Home contains the FAQ, project process, and new CTA
- [ ] Form renders required fields and clear instructions on final send
- [ ] Preselection works on links from individual services
- [ ] Existing portfolio and standalone demo routes remain accessible
- [ ] Manual iPhone widths 320, 375, 390; tablet 768; desktop 1280, including black/dark OS mode
- [ ] Manually test mail app / WhatsApp handoff with **test details only**, never send personal data on the preview
- [ ] Obtain explicit user approval before merging into `main`

## No other changes
Existing projects, pricing terms, client records, analytics, app code, site domain and business rules were not altered. The existing red-wave design and automatic dark mode are retained.
