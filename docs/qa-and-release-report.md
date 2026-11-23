# QA and release report

Branch `feat/senior-product-design-portfolio` · 2026-11-23 · Preview: `melvin-portfolio-preview` (separate Vercel project; the existing production site is untouched).

## Executed checks

| Check | Tool | Scope | Result |
|---|---|---|---|
| Build | `node scripts/build.mjs` | 21 pages + sitemap, robots, 404, 3 redirect stubs | Pass |
| Accessibility (automated) | axe-core 4, tags wcag2a/aa, wcag21a/aa, wcag22aa, best-practice | 19 pages × light/dark × 390/1440px (76 runs) | **0 violations** after fixes (brand link name mismatch; heading order on Writing) |
| Lighthouse (mobile, simulated throttling, local static server) | Lighthouse 13 | `/`, `/work/fidelity-bank/`, `/resume/` | Performance 100, Accessibility 100, Best practices 100, SEO 100 on all three. LCP 0.9–1.0 s, CLS ≤ 0.014, TBT ≤ 30 ms |
| Horizontal overflow | Playwright, `scrollWidth` | All pages × 375/768/1920 × light/dark | Pass (legacy Dexterity write-up fixed with a scoped style) |
| Keyboard | Playwright | Home | Skip link first; logical order through nav, theme toggle and CTAs; mobile menu opens with focus on first link and closes on Esc |
| No-JavaScript | Playwright, JS disabled | Case study | Content visible (reveal disabled), navigation and links work |
| Internal links | Static crawl of `dist/` | All HTML | 0 broken |
| Preview deployment | Vercel | `/work/x-hunt/` 200, unknown route → custom 404, `/notebook/` → `/lab/`, `/api/contact` GET → 405 | Pass |
| Résumé PDF | Chrome print, `pdftotext` | A4, 2 pages | Text-selectable (ATS-readable), no images |

## Not executed / limitations

- **Real-device and screen-reader testing** (VoiceOver, NVDA, TalkBack) — not run. Automated checks do not establish WCAG conformance.
- **Field Core Web Vitals** — no field data exists for the new build. Lighthouse ran against a local, uncompressed server, not the Vercel preview (the build environment cannot reach vercel.app directly).
- **Contact form delivery** — the preview project has no `RESEND_API_KEY`, so submissions return a 503 with the email fallback. The API now accepts the deployment's own origin via `VERCEL_URL`.
- **Portrait image** is served from Vercel Blob and could not be loaded in the build sandbox; verify it renders on the preview.
- **Dexterity Lab pages** keep their legacy styling and header; they were not migrated to the new design system.
- `/notebook/` is served by a meta-refresh stub on the preview rather than a 301; deep `/notebook/...` paths use the `vercel.json` redirect.

## Simulated recruiter review (internal, not external feedback)

| Scenario | Question | Finding |
|---|---|---|
| 10 seconds | Who, seniority, where, what kind of products, where is the work? | Answered above the fold: H1 specialism, current role, previous lead role, live product, "Selected work" CTA. Seniority is implied by "UX Design Lead" and scope rather than a "Senior" title. |
| 60 seconds | Most relevant projects, problem, my role, maturity, best evidence | Four rows show capability, domain, one-line summary and an evidence badge. The strongest evidence is X-hunt (observable) and Fidelity (self-reported). |
| 10–15 minutes | Decisions, flows, research, collaboration, outcomes, reflection | Decisions and trade-offs are explicit; ownership is split. **Weakness:** no real interface artefacts, flows or research outputs from client work — diagrams explain reasoning but cannot demonstrate visual or interaction craft on shipped products. |

## Release gate (before production)

1. Melvin reviews and confirms every case-study claim, especially decision wording, team composition and engagement channel (see private evidence register).
2. Verify the portrait loads and the résumé PDF downloads on the preview.
3. Add `RESEND_API_KEY` if the form should work on the preview, or rely on email.
4. Merge only after explicit approval; production deploys from `main`.
