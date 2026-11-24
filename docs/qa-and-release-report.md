# QA and release report

Branch `feat/senior-product-design-portfolio` · updated 2026-11-24 (phase 2) · Preview: `melvin-portfolio-preview` (separate Vercel project; the existing production site is untouched).

## Executed checks (phase 2, 24 Nov 2026)

| Check | Tool | Scope | Result |
|---|---|---|---|
| Build | `node scripts/build.mjs` | 21 pages + sitemap, robots, 404, redirect stubs | Pass |
| Accessibility (automated) | axe-core 4, wcag2a/aa, wcag21a/aa, wcag22aa, best-practice | 23 pages × light/dark × 390/1440px, plus the Dexterity prototype | **0 violations** |
| Lighthouse (mobile, simulated throttling, local static server) | Lighthouse 13 | `/`, `/work/x-hunt/`, `/lab/` | Performance 100 / 100 / 100; Accessibility, Best practices, SEO 100. LCP 1.05–1.08 s, CLS ≤ 0.002, TBT ≤ 20 ms. The first run showed LCP 2.26 s on `/` because the hero headline faded in; the headline now settles without a fade |
| Horizontal overflow | Playwright `scrollWidth` | All pages × 320/375/390/768/1024/1440/1920 × light/dark (322 checks) | 0 overflow (Aura image overflow at 390 found and fixed) |
| Motion behaviour | Playwright, Chrome 153 | Hero intro, theme switch, page transition, menu, disclosure, reduced motion | Intro runs once per session and not under reduced motion; theme switch runs as a root view transition; `view-transition-name` unique on every page checked; menu animates in and closes on Esc; reduced motion: no intro, no theme animations |
| Keyboard | Playwright | Home | Skip link first; logical order; mobile menu focus and Esc |
| No-JavaScript | Playwright, JS disabled | Case study | Content visible; navigation works |
| Dexterity Lab 3D | Playwright + SwiftShader WebGL | 1440, 768, 390 | WebGL context created at all three sizes; scene renders; Play works; no page errors; no overflow. Three.js is now self-hosted (no CDN) |
| Product images | Playwright | `/work/x-hunt/` light/dark, 1440/390 | All visible images load; inactive theme variant not displayed |
| Internal links | Static crawl of `dist/` | All HTML | 0 broken |
| Résumé PDF | Chrome print | A4, 2 pages | Unchanged this phase |

## Not executed / limitations

- **Real-device and screen-reader testing** (VoiceOver, NVDA, TalkBack) — not run. Automated checks do not establish WCAG conformance.
- **Field Core Web Vitals** — no field data exists for the new build. Lighthouse ran against a local, uncompressed server, not the Vercel preview (the build environment cannot reach vercel.app directly).
- **Contact form delivery** — the preview project has no `RESEND_API_KEY`, so submissions return a 503 with the email fallback. The API now accepts the deployment's own origin via `VERCEL_URL`.
- **Portrait image** is served from Vercel Blob and could not be loaded in the build sandbox; verify it renders on the preview.
- Three.js is now self-hosted and the scene was verified with software WebGL (SwiftShader). GPU rendering on real phones has not been tested.
- View transitions need Chrome/Edge 126+ or Safari 18.2+; Firefox navigates without them. That is the intended fallback.

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
