# Real client testimonials — request, consent and publication

Stage 2 explicitly avoids fabricated reviews, five-star ratings, invented client logos, and unverified claims.

## Status at launch
There are **zero verified public testimonials** in the repository. This is expected and intentional. The testimonial component is automatically hidden until real, approved feedback exists.

The two featured case studies are real business projects that Ibrahim is personally connected with, not presented as external commissioned agency clients.

## Message to request honest feedback

**WhatsApp or email template**

Hello [name], I hope you're doing well. I'm putting together a short showcase of website and digital work I've completed. If you're happy to share honest feedback about the project, would you answer these three quick questions?

1. What was the main thing you needed the website or system to help with?
2. Which part of the finished work has been most useful to you?
3. Is there anything you would improve?

With your separate permission, I'd like to quote a short part of your answer on my portfolio. I'll show you the exact quote and how your name/business would appear before publishing. It's completely fine to decline or keep your response private.

## Permission form / record
For each testimonial, record:
- Speaker's verified name and actual relationship to the project.
- The exact statement, including its original source/message and date.
- Approved quote (show any edits to the speaker first).
- Exactly how the speaker agrees to be named/attributed.
- Permission timestamp and where consent is recorded.
- Any later withdrawal of consent or update request.

Never imply that a family-run business was an unrelated paid agency client.

## How to publish
1. Obtain the real feedback and permission.
2. Add a reviewed entry in `src/lib/verified-feedback.ts`: quote, speaker, approvedRole, optional projectSlug, permissionDate.
3. Verify the display on preview, including mobile/dark mode.
4. Release only after approval.
5. Remove entries promptly if permission is withdrawn.

Never put private contact information or raw message histories in the public repository.

## Optional request for measured outcomes
If business owners can **document** a result, record source, reporting period, metric definition, baseline, follow-up, attribution caveats and permission. Do not substitute estimates or general impressions for independently measured revenue/traffic growth.
