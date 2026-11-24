# Melvin's Portfolio — 2026 Design & Delivery Plan

## North star
The site should demonstrate senior UX judgement through its own clarity and craft. It must instantly establish Melvin as a Dublin-based UX strategist, product designer and builder working across enterprise design, applied AI, community, sustainability and writing. Not a single long résumé page.

## Reference synthesis
- **Trionn:** bold typography, ambitious creative direction, purposeful motion.
- **Phantom:** image-led narrative, visually compelling project openings and coherent full case studies.
- **Merodev:** expressive personal maker identity; exact visual behaviours need separate review.
Do not copy any proprietary visuals, code or branding.

## Sitemap
- `/`: hero with actual portrait, three selected work previews, ventures, impact and writing teasers.
- `/work/`: filterable case-study archive.
- `/work/<slug>/`: dedicated narrative for each engagement.
- `/ventures/`: Reveta, XHunt, Aura, Landmark AI and smaller labs with truthful status labels.
- `/impact/`: sustainability research, Soiléir, participatory workshops, community outreach and mentorship.
- `/writing/`: Designing Life's Tapestry, The Handoff (manuscript) and essays.
- `/about/`: real portrait, skills, background, experience, values and LinkedIn.
- `/notebook/`: only public GitHub repositories; context on code-assisted prototyping, Codex and privately developed products.

## Visual direction
Warm ivory #F5F4EF; forest-black #151B18; soft lime #C7EC8B; disciplined editorial typography. Manrope for headlines, Instrument Serif for selective emphasis and DM Sans body. 12-column desktop, fluid tablet and single-column mobile. Genuine photography, bespoke illustrative diagrams, subtle organic blob shapes, minimal inline SVG arrows with consistent stroke. Small, purposeful animations and reduced-motion support. No emoji icon set, scroll-hijacking or large idle visual effects.

## UX and content principles
1. **Recognition:** who, what, why, with visible design proof in first viewport.
2. **Progressive disclosure:** homepage highlights -> archive -> full case study. Avoid all work on one long page.
3. **Evidence:** real artefacts, honest statuses and contextual results. Mark illustrative imagery clearly.
4. **Mobile-first:** 320–390px QA, accessible navigation, touch targets, responsive crops, no horizontal overflow.
5. **Real people:** use provided portraits and collaborative photos in appropriate contexts; confirm permissions for others photographed.
6. **Privacy:** confidential bid/client details remain withheld; NATO-related work labelled proposal support, not a direct client award.

## Six-layer case study template
1. Fifteen-second executive summary: sector, role, challenge and carefully qualified result.
2. The problem: user groups, business situation, constraints and stakes.
3. Discovery: authentic research, synthesis, needs and evidence (never invent interview findings).
4. Design reasoning: options, trade-offs, rejected approaches and how decisions were made.
5. Solution and delivery: annotated journeys, information architecture, interaction models, accessible patterns, collaboration and real approved screens.
6. Impact and reflection: baseline, timeline, metric provenance, attribution limits and lessons learned.

### Prioritised narratives
- **Flagship P0:** ViiV Healthcare (AI and healthcare knowledge), YouTube (ML workflows), Fidelity Bank (product leadership).
- **P1:** Mater Private, Irish Department of Justice, Kerry Group.
- **P2:** AICPA/CIMA, selected research and ventures.
- **Restricted:** NATO-related autonomous systems bid support — abstract design principles only.

For each case study require actual artefacts, evidence ownership, measurement context and client-release clearance before marketing numerical achievements as verified.

## Photography placement
- Portrait (blue shirt, straight-on): Homepage hero.
- Portrait (smile): About.
- Sustainability presentation with colleagues: Impact, Soiléir section.
- Outdoor workshop: Impact, collaboration section / homepage teaser.
- Community event photograph: Impact, community and inclusion.
- Designing Life's Tapestry book photograph: Writing page.
All photographs supplied in the conversation; retain credits/consent as appropriate.

## Review standards
Score each flagship case /100: problem clarity 15, ownership 15, research evidence 15, decisions/tradeoffs 20, interaction & visual craft 15, outcomes 10, reflection 10. Feature only cases >=80, based on grounded material.

## Delivery workstreams
P0 Foundation: navigation, icons, multi-page architecture, typography, original photo assets and responsive layout.
P0 Evidence: publish three flagship case studies with real design decisions.
P1 Breadth: ventures, sustainability, about, writing and notebook.
P1 Polish: visual direction, diagrams, meaningful motion, accessibility and performance.
P0 release gate: inspect 320/375/390/768/1024/1440 widths; keyboard use; alt text; performance; page metadata; asset licences; working links; 200 responses across all routes; GitHub/Vercel production deployment.

## Current status (2026-11-23)
The site has been rebuilt on branch `feat/senior-product-design-portfolio` as a zero-dependency static build (`scripts/build.mjs`, content in `src/data.mjs`). Positioning moved from a multidisciplinary showcase to senior product design for complex, intelligent systems. Flagships: Fidelity Bank, X-hunt, ViiV Healthcare, YouTube; supporting: Mater Private, Department of Justice, AICPA & CIMA, Kerry Group, defence-related proposal. Navigation reduced to Work · About · Lab · Writing · Résumé. Every outcome carries an evidence label.

Superseded from this plan: the Manrope/DM Sans type pairing (now Geist, Geist Mono, Instrument Serif italic) and the homepage photography placement (portrait now on About only). See `docs/design-system.md` and `docs/portfolio-information-architecture.md`.

The largest remaining gap is unchanged: approved product artefacts and documented outcome evidence for client work. No case study meets the >=80 bar in the review standard above without them.
