# Stage 4B — Public client onboarding

This review contains only a client onboarding questionnaire and optional preparation checklist.

## Public functionality
- `/client-onboarding`: six-point preparation checklist, goals, target audience, features, assets, timeline, budget and optional business details.
- Visitors explicitly choose email or WhatsApp, review the prefilled message, then send it. The site does not store or automatically send their answers.
- Client onboarding is linked from Services, the short Start Project page, the mobile menu and footer.
- Homepage remains short and unchanged.
- No new database, backend, subscription or document-management service.
- `/client-onboarding` remains in the sitemap.

## Feature removed at owner's request
The proposed document generator and its templates, owner sign-in, associated session code, navigation entries, and related styles were removed from this preview. The private document workspace will not be published.

## Validation before merging
- [ ] Preview build READY at current branch head
- [ ] `/client-onboarding` loads and questionnaire / checklist are visible
- [ ] `/services` and `/start-project` still link to client onboarding
- [ ] Old private owner/document routes show 404 and are not linked publicly
- [ ] Existing main pages and portfolio PDF are unchanged
- [ ] Manual iPhone Safari test for email/WhatsApp message handoff
- [ ] Explicit user approval to publish Stage 4B

Only merge the client-onboarding changes after approval.
