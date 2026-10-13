# IbrahimAlli.com — Portfolio audit & preview changes

**Audit date:** October 13, 2026  
**Repository:** `ibrolee/Ibrahim.Alli.Website`  
**Production branch:** `main` — not modified by this preview.

## Findings and actions
| Category | Finding in existing code | Improvement in preview |
|---|---|---|
| Message clarity | Homepage introduces a broad builder/creator identity before making the commercial web design offer clear | Hero explicitly explains websites for businesses and clearer digital outcomes; retains personality and About page |
| Calls to action | Primary hero CTA intentionally led to About Me; no direct project enquiry above the fold | Preserve About Me as primary button and add a compact client enquiry link; enquiries include a short guided brief |
| Services | Five plain-text services but no clearly defined buying options | Add three scoped packages with deliverables and email enquiry paths, without inventing fixed pricing |
| Case studies | Two real projects are presented; challenge, approach and result text are fairly general | Specify real shipped features, what the role involved and avoid unsupported sales/conversion statistics |
| Mobile | Existing media queries and responsive components; some new content needs specific narrow-screen rules | Add single-column package and evidence layouts for narrow screens and usable touch targets |
| Visual identity | Recent red-wave light theme and automatic charcoal/black dark scheme are established | Keep brand, navigation layout, and both themes; match new cards to existing visual language |
| Performance | Project imagery uses lazy loading on homepage; root imports several independent-demo CSS files globally | Retain lazy image loading; flag stylesheet splitting as future work rather than introduce regression-prone cross-route changes |
| SEO | Existing per-route title, description, canonical and social preview | Update homepage summary to describe services directly |

## Manual QA to complete on preview
- Check 320px, 375px, 390px, 768px, 1024px, 1440px widths: no overflow; menu and CTA usable.
- Test light and system-dark modes; verify text contrast on package buttons and project evidence cards.
- Open About, Photography and both real project case studies.
- Confirm the four separate demo/showcase sites remain visually unchanged.
- Test email enquiry links on iPhone and desktop; ensure project brief prefill works.
- Verify site metadata/OG image on real deployed response.
- Compare live/preview navigation, hero, packages and case-study content.
- Use Lighthouse or real-user performance tools before claiming measurable speed gains.

## Reusable client documents
- `docs/website-service-packages.md` — private scope/estimate sheet
- `docs/client-website-proposal-template.md` — quotation/proposal to adapt per client

**Release gate:** Show preview and obtain explicit approval before merging. No production deployment is authorized by this audit.
