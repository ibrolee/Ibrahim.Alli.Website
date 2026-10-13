# Stage 4A — Client acquisition services (preview)

**Date:** 2026-10-13  
**Branch:** `preview/review-stage-4a-client-acquisition-2026-10-13`  
**Base:** production `main`, after approved Stage 2 and Stage 3.  
**Release policy:** Preview only until the user explicitly approves publication.

**Vercel build policy:** This project ignores preview Git branches that do not match `review/*` or `preview/review-*`. The earlier `preview/stage-4a-client-acquisition-2026-10-13` branch was skipped on purpose by Vercel. The review branch below complies without altering deployment settings.

## What was built
- `/free-website-audit`: a professional landing page explaining a **free initial public website review** (mobile usability, design, content basics and enquiry flow), a realistic three-step review outline, and a validated enquiry form (name, email, public website URL, priority and optional details).
- `/website-maintenance`: describes **Essential Care**, **Business Care** and **Custom Support** as starting scopes, not fixed price promises. Each option links to the existing project enquiry with maintenance selected and its optional plan name passed along.
- `/start-project`: new singular **Website maintenance** option, preserves the user's maintenance plan in the draft message, and offers direct links to both Stage 4A pages.
- `/services`: two visual cards linking to the audit and maintenance options. Existing service pages, packages and process unchanged.
- Mobile menu and footer: direct Audit and Maintenance links. Desktop nav and the intentionally short homepage remain the same.
- Responsive brand design in `src/business-stage4a.css`, including automatic charcoal dark mode and iPhone form sizing.
- Updated `public/sitemap.xml` with both pages.

## Scope and privacy
- Free audit: **initial, high-level review**, not exhaustive accessibility/security/SEO certification or a speed score. Response is subject to availability, without a guaranteed turnaround or commitment to a subsequent sale.
- Never ask visitors to upload credentials, private records or confidential data.
- The audit form **does not transmit or store** submissions. The user reviews and sends a pre-filled message in their chosen email or WhatsApp application. Both are clearly labelled as app handoffs; no false confirmation.
- Existing Vercel custom analytics records only `portfolio_audit_handoff` with channel `email` or `whatsapp`, not submitted personal fields, sensitive data or actual confirmed messages.
- Maintenance plans have **no invented fees, durations, response guarantees, unlimited edits, included subscriptions or 24/7 coverage**. Exact responsibilities, access, update allowance, hours and exclusions must be agreed in a quote.
- Third-party domains, hosting and external service costs remain separate unless explicitly specified.

## QA gates
- [ ] Vercel preview deployment is READY on this branch's latest commit
- [ ] New pages return 200 with distinct titles, descriptions and canonical tags
- [ ] Both pages render in light/dark themes and at common iPhone widths
- [ ] Both audit handoffs prepare correct email/WhatsApp drafts and the user is required to Send
- [ ] Maintenance enquiry preselects the right service and preserves optional plan
- [ ] Homepage unchanged, main nav preserved, mobile/menu links and footer links present
- [ ] Existing major routes, concepts and PDF still work
- [ ] No unverified promises, expenses or backend dependency
- [ ] Site owner approves before merging into `main`

## Release decision
This is intentionally a conversion *entry point*, not a lead CRM, auto-audit service or transactional email platform. Those features require separate opt-in, hosting and safeguarding decisions.
