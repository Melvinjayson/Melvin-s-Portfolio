# Design system

Source: `src/static/css/site.css` (single stylesheet, minified at build). Last updated 2026-11-24. Motion, interaction patterns and the image system are documented in [`DESIGN.md`](../DESIGN.md), which is canonical for those topics.

## Principles

1. **Editorial, not dashboard.** Swiss-influenced hierarchy: rules (1px lines) and whitespace do the structuring; cards are used sparingly (Lab and Writing tiles only).
2. **One accent, used as a mark.** Soft lime `#C7EC8B` is a fill — dots, highlights, the current-page underline, human-gate blocks in diagrams. It is never used for text on light backgrounds (contrast too low). Accessible accent text uses `--accent-ink`.
3. **Evidence is part of the interface.** Every outcome in a case study carries an evidence badge (`.ev--observed | codebase | reported | concept | none`). Cards on the homepage and Work index use a factual status line instead, so the first screen reads as facts rather than hedges.
4. **Works without JavaScript or motion.** JS is progressive enhancement (theme, mobile menu, contact form). Reduced-motion users keep opacity fades but lose all movement — see DESIGN.md §5.

## Tokens

| Token | Light | Dark (true black) | Use |
|---|---|---|---|
| `--bg` | `#F5F4EF` warm ivory | `#000000` | Page |
| `--bg-raised` | `#FBFAF6` | `#0A0B0A` | Tiles, diagram frames, inputs |
| `--surface` | `#EBEAE3` | `#111311` | Secondary fills |
| `--ink` | `#121512` forest-black | `#F2F1EC` | Headings, primary text |
| `--ink-2` | `#464C47` (7.6:1) | `#B9BDB7` | Body copy |
| `--ink-3` | `#5D635E` (5.6:1) | `#9CA19B` | Meta, labels — the lightest permitted text |
| `--line` / `--line-strong` | `#D6D5CC` / `#B9B8AE` | `#242724` / `#3A3E3A` | Rules, borders |
| `--accent` | `#C7EC8B` | `#C7EC8B` | Fill only |
| `--accent-ink` | `#2F5D1F` | `#C7EC8B` | Accent text |
| `--focus` | `#2557D6` | `#8FB0FF` | Focus ring (2px, 3px offset) |

Contrast checked with axe-core (WCAG 2.2 AA) in both themes: 0 violations.

## Typography

- **Geist** (variable, self-hosted, Latin subset ~31 KB) — everything structural. Headlines 520–560 weight, tracking −0.032 to −0.045em.
- **Geist Mono** (~25 KB) — eyebrows, metadata, evidence badges, numbering. Minimum 0.74rem, uppercase, +0.04em.
- **Instrument Serif Italic** (~22 KB) — at most one emphasised word or phrase per headline. Never body copy.
- Fluid scale `--step--1` … `--step-5` via `clamp()`; body 16–17.3px, line-height 1.6; measure capped at 62–68ch.

Fonts: SIL Open Font License (see `src/static/fonts/LICENSE-*`).

## Layout

- Max width 1320px, fluid gutter `clamp(20px, 4vw, 48px)`, 12-column grid with 24px gaps.
- Section rhythm `--section: clamp(72px, 9vw, 144px)`.
- Case-study chapters use an asymmetric 4/7 split (heading left, body right) — collapses to one column below 900px.

## Components

| Component | Class | Notes |
|---|---|---|
| Header | `.site-header` | Sticky, translucent; mobile menu below 860px with Esc-to-close |
| Index card | `.index-card` | Hero "at a glance" definition list for the 10-second scan |
| Project row | `.project` | Number, title, meta, summary, evidence badge, diagram thumbnail |
| Compact row | `.compact` | Supporting work, writing, ventures, services |
| Evidence badge | `.ev--*` | Colour + text label (never colour alone) |
| Evidence legend | `.ev-legend` | Explains badges; on home and Work |
| Summary strip | `.summary` | Role / engagement / when / maturity on every case |
| TL;DR | `.tldr` | Problem / what I did / outcome — the 60-second read |
| Ownership | `.ownership` | Owned / influenced / worked with |
| Decision | `.decision` | Title, rationale, "instead of", trade-off |
| Outcomes table | `.outcomes` | Measure, result, evidence — stacks on mobile |
| Diagram | `.dg` | Inline SVG, theme-aware classes; horizontally scrollable under 700px |
| Timeline | `.timeline` | Experience |
| Form | `.form`, `.field` | 48px targets, visible labels, `:user-invalid` styling |

## Diagrams

`src/diagrams.mjs` draws one explanatory diagram per flagship case. Rules: drawn for the portfolio, always captioned "Explanatory diagram", never styled to resemble a client product screenshot. On project rows they are decorative (`aria-hidden`); in case studies they have `<title>` and `<desc>` for screen readers.

## Motion

No scroll reveals or decorative animation. Motion is limited to press feedback, state changes and page continuity; the full system is in DESIGN.md. No WebGL on primary pages; the Three.js prototype lives at `/lab/dexterity-lab/` and loads only there.
