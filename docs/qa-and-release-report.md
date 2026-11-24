# QA and release report

Branch `feat/senior-product-design-portfolio` · updated 2026-11-24 (final audit) · Preview: `melvin-portfolio-preview` (separate Vercel project; the existing production site is untouched).

## Final audit checks (24 Nov 2026, commit after `e230780`)

Run against the latest source, which includes the creative redesign, the removal of the visual-language experiment and the new photography. A static server on localhost was used; Lighthouse simulates mobile throttling against uncompressed files.

| Check | Scope | Result |
|---|---|---|
| Build | 21 pages + sitemap, robots, 404, redirect stubs | Pass |
| Accessibility (axe-core, WCAG 2.0/2.1/2.2 A–AA + best practice) | 21 pages + Dexterity prototype × light/dark × 390/1440 | **0 violations** |
| Horizontal overflow | All pages × 320/375/390/768/1024/1440/1920/2560 × light/dark (336 checks) | 0 overflow |
| Lighthouse (mobile) | `/` · `/work/x-hunt/` · `/about/` · `/lab/` · `/writing/` | Performance 100 · 97 · 100 · 100 · 99; Accessibility 100 on all; SEO 100 on all; Best practices 100 except About at 96. LCP 1.05–2.55 s, CLS ≤ 0.001. The About score comes from the portrait failing to load in the sandbox (external blob storage is blocked there); the X-hunt LCP is the cover collage image |
| Motion | Intro, theme switch, page transition, menu, disclosure, reduced motion | Intro runs once per session; the theme change is a root view transition; `view-transition-name` is unique on every page; the menu animates and closes on Esc; reduced motion has no intro and no theme animations |
| Keyboard | Home | Skip link first; logical order; menu focus and Esc work |
| No-JavaScript | Case study | Content visible |
| Dexterity prototype | 1440 and 390, SwiftShader WebGL | Play/pause, ±1 s, scrub, restart, speed, all four cameras, all three tasks (`aria-pressed` updates), operations, object diagram and drag orbit all work; no console errors. On mobile, the playbar now sits directly under the scene |
| Internal links | Static crawl | 0 broken |
| Résumé PDF | `/resume/melvin-jayson-ogbalu-resume.pdf` | A4, 2 pages, text-selectable |
| SEO | Sitemap, robots, canonical, social preview | Present. Canonical and sitemap use `SITE_URL` (default `melvins-portfolio.vercel.app`) and must be set to the production domain. The Lab pages use the Dexterity social image with its AI-generated label as the alt text |
| Dependencies | `package.json` | No runtime or build dependencies (zero-dependency build), so there is nothing to audit. Three.js 0.169.0 is vendored with its licence |

**Not done here:** real iPhone/Android devices, Safari and Firefox engines, VoiceOver/NVDA/TalkBack, field Core Web Vitals, and live contact-form delivery (the preview has no email API key, so the form falls back to email).

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
