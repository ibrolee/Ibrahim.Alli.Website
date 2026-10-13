# Stage 2 — proof of work and portfolio brochure

**Preview branch:** `preview/stage-2-proof-and-portfolio-2026-10-13`  
**Scope:** Real project walkthroughs, truth-in-marketing safeguards, a five-page PDF brochure and honest feedback collection.

### Included
- Expanded project-specific visitor-flow narratives in `src/lib/portfolio-content.ts`.
- Visual walkthrough blocks that reuse portfolio images, label presentation vs live interactive experience, and offer direct real-site links.
- Homepage evidence area with relationship disclosures and links to case studies.
- PDF brochure in `public/Ibrahim-Alli-Portfolio-2026.pdf`, generated from existing project images, with service and contact links.
- Separate feedback-request template and the optional component that renders only after real approved testimonials exist.
- CSS scoped to the portfolio; existing standalone showcases are not altered.

### No unsupported claims
No testimonials, external-client logos, before/after comparisons, measured revenue gains or invented conversion rates are added. The projects involve family-run businesses and are described transparently.

### QA
- Preview Vercel build READY and commit matches branch HEAD.
- Homepage evidence section and PDF download link appear; project walkthroughs appear for both active projects.
- Both case studies show live-site links, contextual relationship disclosures and narrative steps.
- Test brochure PDF direct response and inspect its pages for clipping, image rendering and clickable links.
- Review phone widths, system dark mode, and screenreader labels.
- Confirm legacy routes remain accessible.
- **Do not merge this preview without the user's explicit approval.**

### Future enhancements requiring source material
Obtain screenshots of actual business/customer screens with private data removed; authorised testimonials; original before/after assets; analytics and outcome evidence before presenting any measurable case-study results.
