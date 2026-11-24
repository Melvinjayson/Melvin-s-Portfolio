# Release checklist

Production stays untouched until every item that blocks release is ticked and Melvin approves the merge. Status as of 24 November 2026.

| # | Item | Owner | Status |
|---|---|---|---|
| 1 | Approve the final visual direction on the preview | Melvin | Open |
| 2 | Dexterity cover: the supplied AI-generated image is integrated, responsive (AVIF/WebP at 800 and 1440) and captioned on every surface | Claude | **Done.** Melvin to confirm on the preview |
| 3 | Confirm employment and case-study claims (titles, dates, Fidelity outcomes, ViiV/YouTube wording) | Melvin | Open |
| 4 | Confirm X-hunt ownership wording and the co-founder's permission to cite repository facts | Melvin | Open |
| 5 | Portrait loads on the preview; résumé PDF downloads | Melvin to check | The PDF is verified locally; the portrait can't be checked from the build sandbox |
| 6 | Real devices: iPhone Safari and Android Chrome (menu, page transitions, Dexterity 3D) | Melvin | Open |
| 7 | Manual accessibility: a VoiceOver pass on Home and one case study | Melvin or reviewer | Open (automated checks pass) |
| 8 | Contact: add `RESEND_API_KEY` in production, or accept the email-only fallback | Melvin | Open |
| 9 | Production domain chosen; `SITE_URL` set so canonical URLs, the sitemap and social previews are right | Melvin | Open |
| 10 | Final review and explicit approval to merge PR #1 | Melvin | Open |

**Content needing permission before publication**
- Client logos: names are set in type now. SVGs go in `src/static/img/clients/<slug>.svg` only once use is permitted.
- Innovation Academy photo: confirm the other people pictured are happy to appear.
