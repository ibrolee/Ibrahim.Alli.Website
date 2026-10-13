# Stage 4B — Client onboarding and document studio

**Date:** 13 October 2026  
**Review branch:** `preview/review-stage-4b-client-documents-2026-10-13`  
**Based on:** `main`, with Stage 4A already deployed  
**Release policy:** Preview only until explicitly approved by site owner.

## What is included

### Client onboarding — `/client-onboarding`
- Dedicated public project intake page, with goals, audience, requested features, brand assets, timeline, optional budget and other context.
- Six-point interactive readiness checklist. Tick state lives in the current browser tab.
- Validated form that opens prefilled email or WhatsApp, **not** a submitted/stored backend request.
- Clearly states that the user has to press **Send** in their email/WhatsApp app, and that completing a form is not a contract.

### Document studio — `/client-documents`
- Six editable document types: **project brief**, **project proposal**, **quotation**, **invoice**, **project agreement**, **maintenance agreement**.
- Shared project/client details across templates, itemised fee lines (up to eight), currency options NGN, GBP, USD, EUR and TRY, optional tax and deposit.
- Total calculator refuses to show a final total when a line with a description or price has an incomplete amount/quantity.
- Updates a rendered, printable draft as you edit.
- **Copy text**, **download text**, **print/save PDF via browser**, **save editable JSON to device**, and **reopen saved JSON**.
- Confirmed no database, localStorage, external builder, accounts, automatic email delivery or fees.
- Route marked `noindex,nofollow`; **not actually access-controlled**. Anyone who has the link can open the blank document builder. The document contents are held only in browser memory until explicitly exported.
- Saved JSON files contain any client details users enter; user must keep them securely. No automatic storage or server upload.
- Draft legal documents explicitly require legal review and signed agreement; do not present as lawyer-reviewed or executed contracts.
- Blank payment/bank details by default. Invoice is marked **Draft**, not proof of payment.

### Discovery
- Added onboarding to Services page, Start Project form, mobile navigation and footer.
- Added Document Studio to footer for easy access (but not to sitemap or search index).
- Existing homepage remains at Stage 2 compact length.
- Added `/client-onboarding` to the sitemap.

## Verification
- Latest review build `READY` on the expected head SHA.
- HTTP 200: `/`, `/client-onboarding`, `/client-documents`, `/services`, `/start-project`, `/free-website-audit`, `/website-maintenance`, `/work`, `/faqs`, `/photography`, `/about`, and the existing portfolio PDF.
- SSR shows six document type selectors, all five file/copy/print controls, the correct onboarding form fields, and the optional readiness checklist.
- Site is not deployed to production yet.

## Manual checks still recommended
- iPhone Safari: fill in a real but non-sensitive sample brief and confirm both email and WhatsApp handoffs.
- Document Studio: set up dummy itemised fees, check calculation, switch all six templates, save JSON, reload, copy text and use Print to Save as PDF.
- Confirm document preview pagination, signature lines and fonts in mobile print dialog.
- Check automatic light/dark mode and mobile navigation.
- This build passed SSR and Vercel compilation; those checks are not a substitute for manual interactive browser QA.

## Publishing
Merge its GitHub PR after explicit user approval; verify Vercel production deploy and key live routes.
