# Stage 4C — Client Outreach Playbook

*Ibrahim Alli / prepared 14 October 2026 / internal working guide, not a public website page*

## Goal
Convert relevant business owners into **genuine project conversations**, not inflated traffic or raw clicks. Use personalized, permission-respecting direct outreach and track outcomes manually. Do not claim projects or results that you haven't delivered.

## Four campaign landing pages

| Audience | Campaign link for Instagram DM | Actual supporting context |
|---|---|---|
| Gyms and fitness | `https://ibrahimalli.com/for/fitness?utm_source=instagram&utm_medium=dm&utm_campaign=fitness_outreach` | Real work with Super Plus Fitness & Spa |
| Fashion and beauty | `https://ibrahimalli.com/for/fashion?utm_source=instagram&utm_medium=dm&utm_campaign=fashion_outreach` | JIS Beauty & Fashion design/development project (do not claim live sales) |
| Schools | `https://ibrahimalli.com/for/schools?utm_source=email&utm_medium=outreach&utm_campaign=school_outreach` | School website and parent portal *concept only*, not a delivered school client |
| Online shops | `https://ibrahimalli.com/for/online-stores?utm_source=instagram&utm_medium=dm&utm_campaign=store_outreach` | Storefront planning/design for JIS; no invented revenue proof |

These URLs begin working on the live domain **only after Stage 4B then Stage 4C are approved and published**. For preview QA, substitute the Stage 4C Vercel preview hostname.

## Reusable, non-spam outreach messages

### 1. Gyms — short Instagram DM
Hi [Business Name], I like how you present [specific programme/facility]. I design websites for businesses, and I also work on the Super Plus Fitness website and membership experience. I noticed [genuine, specific opportunity or unanswered question]. If you're considering improving your mobile website or membership information, here's a short overview of what that could look like: [fitness link]. Happy to chat if useful.

### 2. Fashion/beauty — short Instagram DM
Hi [Business Name], I came across your [specific collection/post] and liked [real detail]. I design websites and store experiences, including work on a beauty and fashion brand. If you ever want a dedicated home for your catalogue, brand story and enquiries, I put together a quick overview for brands like yours: [fashion link]. No pressure — just thought it might be relevant.

### 3. Schools — formal email

**Subject:** Website and parent communication idea for [School Name]

Hello [Name/School Team],

I'm Ibrahim Alli, a web designer and developer. I've been exploring practical ways school websites can help parents find admissions information, announcements and upcoming events more easily, without expecting students to use phones.

I have a proposed school website and parent portal concept (not a completed school client deployment), and I would be pleased to share relevant ideas for [School Name] if your team is evaluating improvements.

Here's a concise overview of the approach: [school link].

Would it be appropriate to send a short, school-specific review to the person responsible for your website?

Kind regards,
Ibrahim Alli
ibrahimalli.com

### 4. Online stores — short DM
Hi [Business Name], I found your [product/collection] and noticed [specific authentic observation]. I build mobile-friendly business websites and storefront experiences. If you're ever considering an organised catalogue or simpler route from Instagram to enquiries and orders, this short page shows my approach: [online-store link]. Let me know if you'd like me to take a look at your current setup.

### 5. Follow-up, if appropriate
Hello [Name], just following up once on the website idea I sent about [specific challenge]. If it's not a priority right now, no worries. The offer to discuss ideas stands whenever it becomes useful.

**Don't mass-send identical DMs.** Verify genuine fit, keep messages short and send no more follow-ups after the recipient declines or doesn't engage.

## Simple two-week outreach plan

1. **Days 1–2:** Identify 12 relevant businesses across the four niches; record publicly listed contact details, business type and one authentic observation. Do not scrape personal contact data.
2. **Days 3–6:** Send a modest number of genuinely customized messages with the relevant industry page link; note sent dates and responses in your own record.
3. **Days 7–10:** Reply to interested owners, offer a free initial review where suitable, and use the public Client Onboarding form to learn about confirmed projects.
4. **Days 11–14:** Follow up once only where appropriate. Compare your business records with page views and CTA metrics, then adjust the weakest message or landing page before repeating.

## Lead tracker (manual)

Maintain a private record outside the website, only with information you legitimately receive:

`Business | Industry | Outreach date | Channel | Link sent | Replied? | Meeting? | Qualified? | Proposal sent? | Won? | Notes`

Do not put names, phone numbers, private messages or custom prospect URLs in Vercel analytics event properties.

## Measuring conversion (Vercel Web Analytics)

Use the existing Vercel project analytics dashboard and select the campaign period.

- **Page traffic:** filter on `/for/fitness`, `/for/fashion`, `/for/schools`, `/for/online-stores`. When supported, use referral and UTM dimensions to compare campaign channels.
- **Interested action:** event `portfolio_industry_cta_click` with allowlisted `industry` and `placement`.
- **Handoff:** event `portfolio_industry_enquiry_handoff`, with allowlisted `industry` and channel (email or WhatsApp). This means only that someone chose to open their email or WhatsApp app.
- **Existing context:** event `portfolio_enquiry_handoff` still works on the standard form; the new event is additional segmentation, not a second lead.
- **Confirmed result:** manually count meaningful replies, discovery meetings, proposals sent and contracts won from your actual client conversations. **Neither a page view, click nor handoff is a confirmed lead.**

Suggested comparisons: CTA-clicks / landing pageviews (intent rate); handoffs / CTA-clicks (handoff progression, not necessarily same users); actual conversations / outreach messages (response rate). Events may be affected by analytics availability, ad blockers and consent/privacy settings. Do not promise 100% tracking.

## Truthful proof and visibility

- Super Plus Fitness is real work; don't invent growth percentages, paid clients or membership gains.
- JIS Beauty & Fashion reflects a real brand/store website project; don't invent transactions, live launch or sales.
- The school offer is a proposed design concept; **never claim an institution commissioned or received it**.
- A custom proposal is subject to discovery and confirmed scope, delivery timings and pricing.

## Release
Stage 4C is based on the unpublished cleaned Stage 4B preview. Release Stage 4B first, followed by Stage 4C, only after explicit approval.
