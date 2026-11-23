# Information architecture

Last updated 2026-11-23.

## Primary navigation

`Work · About · Lab · Writing · Résumé` + a persistent **Contact** pill and theme toggle.

Reduced from eight destinations (Work, Ventures, Impact, Writing, About, Services, Lab, Contact). Ventures, Research & community (Impact) and Advisory (Services) remain as pages, linked from the footer, About and Lab — they support the story but are not what a recruiter needs first.

## Recruiter journey

| Attention | What they get | Where |
|---|---|---|
| 10 seconds | Name, specialism, current employer, previous leadership role, live product, where the work is | Hero H1, lead and "at a glance" index card |
| 60 seconds | Four flagship cases with role, capability, domain, evidence level and a one-line summary | Selected work rows (one scroll below the hero) |
| 2–3 minutes per case | Summary strip, TL;DR (problem / what I did / outcome), diagram | Top of every case study |
| 10–15 minutes | Narrative chapters, ownership split, decisions with alternatives and trade-offs, outcomes table, reflection | Body of each case study |

## Homepage order

1. Positioning and calls to action (Selected work, Résumé, Email)
2. Selected work — four flagships + evidence legend
3. How I work — four habits, each linked to the case where it happened
4. Supporting projects
5. Experience timeline
6. Lab, ventures, writing and mentoring
7. Footer CTA — email, résumé, LinkedIn

Advisory services, the long personal biography and the organisation logo wall were removed from the homepage.

## Routes

| Route | Status |
|---|---|
| `/` | Rewritten |
| `/work/` | Rewritten — flagships + supporting list |
| `/work/fidelity-bank/`, `/work/x-hunt/` (new), `/work/viiv-healthcare/`, `/work/youtube-ml/` | Flagship case studies |
| `/work/mater-private/`, `/work/justice-services/`, `/work/aicpa-cima/`, `/work/kerry-group/`, `/work/autonomy-proposal/` | Supporting summaries (same URLs as before) |
| `/about/`, `/writing/`, `/ventures/`, `/impact/`, `/services/`, `/contact/` | Rewritten, same URLs |
| `/resume/` (new) | HTML résumé + PDF download |
| `/lab/` (new) | Replaces `/notebook/` |
| `/lab/dexterity-lab/`, `/lab/dexterity-lab/case-study/` | Legacy prototype pages, links updated |
| `/notebook/*` | 301 to `/lab/*` (vercel.json) plus meta-refresh stubs for static hosts |
| `/404.html` | New — routes to Work, Résumé and Home |
| `/sitemap.xml`, `/robots.txt` | New |

## Content model

All copy lives in `src/data.mjs` (flagships, supporting work, experience, writing, ventures) and `src/pages.mjs` (secondary pages). Each flagship has: `summary`, `tldr`, `chapters`, `ownership`, `decisions`, `outcomes` (with evidence level), `reflection`, `next`. Adding a case study means adding one object and one diagram.
