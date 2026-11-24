#!/usr/bin/env node
// Zero-dependency static site build.
//   node scripts/build.mjs           → writes ./dist
// Content lives in src/data.mjs; diagrams in src/diagrams.mjs; static assets in src/static.
import { mkdir, writeFile, rm, cp, readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, NAV, EVIDENCE, FLAGSHIPS, SUPPORTING, EXPERIENCE, INDEPENDENT, WRITING, VENTURES } from '../src/data.mjs';
import { diagrams } from '../src/diagrams.mjs';
import { pages as extraPages } from '../src/pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');
const BUILT = new Date().toISOString().slice(0, 10);

// ---------- helpers ----------
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const EXT = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const ev = (k) => `<span class="ev ev--${k}">${esc(EVIDENCE[k].label)}</span>`;
const MARK = `<svg viewBox="0 0 310 310" aria-hidden="true" focusable="false"><rect class="mark-bg" width="310" height="310" rx="64"/><g class="mark-fg" transform="translate(31 31) scale(.8)"><path d="M26 71 26 228 56 244 56 122 72 128 147 169 151 169 176 154 176 122 148 138Z"/><path d="M279 67 224 97 224 129 247 116 250 117 250 243 279 227Z"/><path d="M159 24 144 30 90 61 121 77 157 56 185 73 185 245 150 266 120 249 119 185 89 170 89 263 149 298 215 261 215 57Z"/></g></svg>`;
const SUN = '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
const MOON = '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';

const extLink = (href, text, cls = 'arrow-link') => `<a class="${cls}" href="${esc(href)}" rel="noopener">${text} ${EXT}</a>`;

// ---------- layout ----------
function head({ title, description, path, type = 'website', jsonld = [], noindex = false, image }) {
  const url = SITE.url + path;
  const full = path === '/' ? `${SITE.name} — Product designer for complex, intelligent systems` : `${title} — ${SITE.name}`;
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('');
  return `<!doctype html>
<html lang="en-IE" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${SITE.url}${image ? image.src : '/og.png'}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(image ? image.alt : 'Melvin Jayson Ogbalu — product designer for complex, intelligent systems')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f5f4ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/geist-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css?v=${BUILT}">
<script>(function(){try{var t=localStorage.getItem('mj-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(document.querySelector&&location.pathname==='/'&&!sessionStorage.getItem('mj-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro');sessionStorage.setItem('mj-intro','1')}}catch(e){document.documentElement.dataset.theme='light'}})()</script>
${ld}
</head>`;
}

function header(path) {
  const links = NAV.map((n) => `<a href="${n.href}"${path.startsWith(n.href) ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/">${MARK}<span>Mēlvin Jayson</span><span class="visually-hidden"> Ogbalu — home</span></a>
    <div class="header-tools">
      <nav class="nav" id="site-nav" aria-label="Primary">${links}<a class="nav-cta" href="/contact/"${path.startsWith('/contact/') ? ' aria-current="page"' : ''}>Contact</a></nav>
      <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch theme">${MOON}${SUN}</button>
      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-nav" aria-label="Menu"><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function footer({ cta = true } = {}) {
  return `<footer class="site-footer">
  <div class="wrap">
    ${cta ? `<div class="cta">
      <p class="kicker">Hiring, or working on something hard?</p>
      <h2>Let’s talk about the <span class="serif">problem</span> you’re trying to solve.</h2>
      <div class="btn-row">
        <a class="btn" href="mailto:${SITE.email}">${SITE.email} ${ARROW}</a>
        <a class="btn btn--ghost" href="/resume/">Résumé ${ARROW}</a>
        <a class="btn btn--ghost" href="${SITE.linkedin}" rel="noopener">LinkedIn ${EXT}</a>
      </div>
    </div>` : ''}
    <div class="footer-cols">
      <div><h2>Work</h2><ul>${FLAGSHIPS.map((f) => `<li><a href="/work/${f.slug}/">${esc(f.org)}</a></li>`).join('')}<li><a href="/work/">All work</a></li></ul></div>
      <div><h2>Practice</h2><ul><li><a href="/about/">About</a></li><li><a href="/lab/">Lab</a></li><li><a href="/ventures/">Ventures</a></li><li><a href="/impact/">Research &amp; community</a></li><li><a href="/services/">Advisory</a></li></ul></div>
      <div><h2>Elsewhere</h2><ul><li><a href="${SITE.linkedin}" rel="noopener">LinkedIn</a></li><li><a href="${SITE.github}" rel="noopener">GitHub</a></li><li><a href="${SITE.medium}" rel="noopener">Medium</a></li><li><a href="/writing/">Writing</a></li></ul></div>
      <div><h2>Contact</h2><ul><li><a href="mailto:${SITE.email}">Email</a></li><li><a href="/contact/">Message form</a></li><li><a href="/resume/">Résumé (web &amp; PDF)</a></li></ul></div>
    </div>
    <div class="colophon"><span>© ${new Date().getFullYear()} ${esc(SITE.name)} · ${esc(SITE.location)}</span><span>Client names describe engagements, not endorsements.</span></div>
  </div>
</footer>
<script src="/js/site.js?v=${BUILT}" defer></script>
</body>
</html>`;
}

export function page({ path, title, description, body, jsonld, cta = true, type, noindex, image }) {
  return `${head({ title, description, path, jsonld, type, noindex, image })}
<body>
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer({ cta })}`;
}

export const evidenceLegend = () => `<div class="ev-legend" role="note" aria-label="Evidence levels">
  ${Object.keys(EVIDENCE).map((k) => `<span>${ev(k)}</span>`).join('')}
  <span class="desc">Outcomes are labelled by how they are known. Nothing here is presented as independently verified.</span>
</div>`;

// ---------- reusable blocks ----------
// Theme-aware image pair: the hidden one is display:none, so it is neither fetched (lazy) nor announced.
export const themed = (src, w, h, alt, eager = false) => ['light', 'dark'].map((t) => `<img class="th th--${t}" src="${src}-${t}.webp" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high" ' : ''}loading="lazy" decoding="async">`).join('');
const vt = (slug) => `style="view-transition-name:case-${slug}"`;
const tone = (f) => f.tone ? ` style="--tone-l:${f.tone[0]};--tone-d:${f.tone[1]}"` : '';
const plainDiagram = (slug) => diagrams[slug].replace(/role="img" aria-labelledby="[^"]*"/, 'aria-hidden="true"').replace(/ id="[^"]*"/g, '');
// Each project's visual identity. Real product imagery where it exists; drawn diagrams otherwise.
const stageArt = (f, eager = false) => {
  if (f.art === 'product' && f.gallery) {
    const g = Object.fromEntries(f.gallery.map((x) => [x.src.split('/').pop(), x]));
    return `<div class="collage">
      <div class="collage-main">${themed(g.brief.src, g.brief.w, g.brief.h, '', eager)}</div>
      <div class="collage-side">${themed(g.step1.src, g.step1.w, g.step1.h, '', false)}</div>
      <div class="collage-low">${themed(g.ledger.src, g.ledger.w, g.ledger.h, '', false)}</div>
    </div>`;
  }
  if (f.art === 'reframe') return `<div class="reframe-mini"><p><span>The brief</span>“Display the analytics more clearly.”</p><p><span>The problem</span>How teams coordinate around models, releases and knowledge.</p></div>`;
  return `<div class="stage-diagram">${plainDiagram(f.slug)}</div>`;
};
const feature = (f, i) => `<li class="feature feature--${f.art}"${tone(f)}>
  <a href="/work/${f.slug}/">
    <div class="feature-stage" aria-hidden="true">${stageArt(f, i === 0)}</div>
    <div class="feature-copy">
      <p class="feature-meta"><span class="num">${String(i + 1).padStart(2, '0')}</span><span>${esc(f.org)}</span><span>${esc(f.status)}</span></p>
      <h3 ${vt(f.slug)}>${esc(f.title)}</h3>
      <p>${esc(f.card)}</p>
      <span class="feature-more">View the case study ${ARROW}</span>
    </div>
  </a>
</li>`;

const compactRow = (s) => `<li><a href="/work/${s.slug}/"><span class="t">${esc(s.org)}</span><span class="d">${esc(s.title)}</span><span class="s">${esc(s.domain.split(' · ')[0])}</span>${ARROW}</a></li>`;

// ---------- Responsive images ----------
export const pic = (base, w, h, alt, widths, sizes = '100vw', eager = false) => `<picture><source type="image/avif" srcset="${widths.map((x) => `${base}-${x}.avif ${x}w`).join(', ')}" sizes="${sizes}"><img src="${base}-${widths[widths.length - 1]}.webp" srcset="${widths.map((x) => `${base}-${x}.webp ${x}w`).join(', ')}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
export const DEX = { base: '/img/lab/dexterity-concept', w: 1440, h: 810, alt: 'Concept image of a white robotic arm whose five-fingered hand lifts a small wooden block above a cluster of blocks.', label: 'AI-generated concept visualisation — not a photograph of a physical robot or a screenshot of the prototype.' };
export const dexCover = (eager = false, sizes = '100vw') => pic(DEX.base, DEX.w, DEX.h, DEX.alt, [800, 1440], sizes, eager);

// Organisations, set in type. A supplied SVG at src/static/img/clients/<slug>.svg replaces the name.
const ORGS = [
  ['accenture-song', 'Accenture Song'], ['fidelity-bank', 'Fidelity Bank'], ['youtube', 'YouTube'], ['viiv-healthcare', 'ViiV Healthcare'],
  ['mater-private', 'Mater Private'], ['aicpa-cima', 'AICPA & CIMA'], ['kerry-group', 'Kerry Group']
];
const orgMark = ([slug, name]) => existsSync(new URL(`../src/static/img/clients/${slug}.svg`, import.meta.url))
  ? `<li><img src="/img/clients/${slug}.svg" alt="${esc(name)}" height="28" loading="lazy"></li>` : `<li>${esc(name)}</li>`;

// ---------- pages ----------
const personLd = {
  '@context': 'https://schema.org', '@type': 'Person', name: SITE.name, alternateName: SITE.short,
  jobTitle: SITE.title, worksFor: { '@type': 'Organization', name: SITE.employer },
  address: { '@type': 'PostalAddress', addressLocality: 'Dublin', addressCountry: 'IE' },
  url: SITE.url, email: `mailto:${SITE.email}`, sameAs: [SITE.linkedin, SITE.github, SITE.medium],
  knowsAbout: ['Product design', 'UX design', 'Human–AI interaction', 'Service design', 'Design systems', 'UX research']
};

function home() {
  const [lead, ...rest] = FLAGSHIPS;
  return page({
    path: '/', title: 'Home', description: SITE.description, jsonld: [personLd, { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url }],
    body: `
<section class="hero hero--home wrap" aria-labelledby="hero-title">
  <p class="kicker">${esc(SITE.name)} — product designer, Dublin</p>
  <h1 id="hero-title" class="display">I design complex systems people can <span class="serif">understand</span> and trust.</h1>
  <div class="hero-foot">
    <p class="lead">For banks, health organisations, public services and machine-learning teams, I find the human problem underneath the brief — then shape the product, the service and the decisions around it.</p>
    <div class="btn-row"><a class="btn" href="#work">Selected work ${ARROW}</a><a class="btn btn--ghost" href="/about/">About me</a></div>
  </div>
</section>

<section class="orgs wrap" aria-labelledby="orgs-title">
  <h2 id="orgs-title" class="orgs-title">Organisations I have designed for</h2>
  <ul class="org-list">${ORGS.map(orgMark).join('')}</ul>
  <p class="orgs-note">Client work through Accenture Song. Names describe engagements, not endorsements.</p>
</section>

<section class="work-features" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <h2 id="work-title" class="section-title">Selected work</h2>
    <ol class="features">${FLAGSHIPS.map(feature).join('')}</ol>
    <p class="more-work">Also: ${SUPPORTING.slice(0, 4).map((x) => `<a href="/work/${x.slug}/">${esc(x.org)}</a>`).join(', ')} and more in <a href="/work/">all work</a>.</p>
  </div>
</section>

<section class="qualities wrap" aria-labelledby="q-title">
  <div class="qualities-head">
    <h2 id="q-title">Design is the work. <span class="serif">Everything else</span> makes it sharper.</h2>
  </div>
  <ol class="q-list">
    ${[
      ['Designer', 'Human-centred products and services that make complicated things feel clear.'],
      ['Strategist', 'Reframing the problem before solving it, and shaping where a product should go.'],
      ['Researcher', 'Understanding people, the systems around them, and what is genuinely possible.'],
      ['Creative technologist', 'Making ambitious ideas tangible — prototyping in code when a picture cannot answer the question.']
    ].map(([h, p], k) => `<li${k === 0 ? ' class="is-primary"' : ''}><span class="num">${String(k + 1).padStart(2, '0')}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}
  </ol>
</section>

<section class="lab-feature" aria-labelledby="lab-title">
  <a href="/lab/" class="lab-feature-link">
    <figure class="lab-cover">${dexCover(false)}<figcaption>${esc(DEX.label)}</figcaption></figure>
    <div class="wrap lab-feature-copy">
      <p class="kicker">The Lab</p>
      <h2 id="lab-title">An independent practice where design, research and engineering <span class="serif">meet.</span></h2>
      <span class="feature-more">Enter the Lab ${ARROW}</span>
    </div>
  </a>
</section>

<section class="beyond wrap" aria-labelledby="beyond-title">
  <h2 id="beyond-title" class="section-title">Beyond the brief</h2>
  <div class="beyond-grid">
    <a href="/about/#mentoring"><span class="big">200+</span><span>designers mentored through ADPList, where I am a Top 1% global UX mentor.</span></a>
    <a href="/writing/"><span class="big serif">Writing</span><span>Essays on systems, design and intelligent technology, and a book: <em>Designing Life’s Tapestry</em>.</span></a>
    <a href="/ventures/"><span class="big serif">Ventures</span><span>X-hunt, Aura and the Reveta ecosystem — products I build myself.</span></a>
  </div>
</section>`
  });
}

function workIndex() {
  return page({
    path: '/work/', title: 'Work', description: 'Selected product design work by Melvin Jayson Ogbalu: a live AI-assisted network, a banking service redesign, human–AI workflows in healthcare and problem framing in machine-learning operations.',
    body: `
<section class="hero wrap">
  <p class="kicker">Work</p>
  <h1 class="display">Selected <span class="serif">work.</span></h1>
  <p class="lead">Four stories about finding the real problem and designing for it — from a product I co-founded to client work in banking, healthcare and machine learning.</p>
</section>
<section class="work-features" aria-labelledby="flag-title">
  <div class="wrap">
    <h2 id="flag-title" class="visually-hidden">Case studies</h2>
    <ol class="features">${FLAGSHIPS.map(feature).join('')}</ol>
  </div>
</section>
<section class="section" aria-labelledby="sup-title">
  <div class="wrap">
    <div class="section-head"><div><h2 id="sup-title">More work</h2></div><p>Shorter accounts of client and proposal work, told at the level that can be shared.</p></div>
    <ul class="compact">${SUPPORTING.map(compactRow).join('')}</ul>
  </div>
</section>`
  });
}

const QUAL = { observed: 'Visible in the live product', codebase: 'Recorded in the product repository', reported: 'Reported by the project', concept: 'Concept — not deployed', none: 'Not measured' };

function caseCover(f) {
  const fig = diagrams[f.slug];
  if (f.art === 'product') return `<div class="case-stage case-stage--product" aria-hidden="true"><div class="wrap">${stageArt(f, true)}</div></div>`;
  if (f.art === 'reframe') return `<div class="case-stage case-stage--reframe wrap">
      <div class="reframe"><div><span class="kicker">The brief</span><p class="serif">“Display the analytics more clearly.”</p></div><div><span class="kicker">The problem underneath</span><p>The problem was not how data was displayed, but how teams coordinated around it.</p></div></div>
      <figure class="stage-figure" tabindex="0" role="region" aria-label="Diagram — scroll horizontally on small screens">${fig}</figure>
    </div>`;
  return `<div class="case-stage case-stage--${f.art} wrap"><figure class="stage-figure" tabindex="0" role="region" aria-label="Diagram — scroll horizontally on small screens">${fig}</figure></div>`;
}

function flagship(f, i) {
  const next = FLAGSHIPS[(i + 1) % FLAGSHIPS.length];
  const fact = (k) => (f.summary.find(([x]) => x === k) || [])[1];
  const facts = [['Role', fact('Role')], ['When', fact('When') || fact('Engagement')], ['Status', fact('Status') || fact('Maturity')]].filter(([, v]) => v);
  const [first, ...more] = f.chapters;
  const chapter = ([eyebrow, h, paras]) => `<section class="chapter"><header><p class="kicker">${esc(eyebrow)}</p><h2>${esc(h)}</h2></header><div class="body">${paras.map((p) => `<p>${p}</p>`).join('')}</div></section>`;
  const visibleOutcomes = f.outcomes.filter(([, , k]) => k !== 'codebase');
  const repoOutcomes = f.outcomes.filter(([, , k]) => k === 'codebase');
  return page({
    path: `/work/${f.slug}/`, title: `${f.org} — ${f.title}`, type: 'article', description: f.card,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: f.title, about: f.domain, author: { '@type': 'Person', name: SITE.name }, url: `${SITE.url}/work/${f.slug}/` }],
    body: `
<article class="case case--${f.art}"${tone(f)}>
<header class="case-cover">
  <div class="wrap case-title">
    <p class="crumb"><a href="/work/">Work</a> <span aria-hidden="true">/</span> ${esc(f.org)}</p>
    <h1 ${vt(f.slug)}>${esc(f.title)}</h1>
  </div>
  ${caseCover(f)}
</header>

<div class="wrap">
  <section class="case-intro">
    <p class="case-lede">${esc(f.lede)}</p>
    <dl class="case-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}${f.link ? `<div><dt>Live</dt><dd>${extLink(f.link.href, f.link.label.replace('Visit ', ''))}</dd></div>` : ''}</dl>
  </section>

  <section class="case-short" aria-label="In short">${f.tldr.map(([k, v]) => `<div><h2>${esc(k)}</h2><p>${esc(v)}</p></div>`).join('')}</section>

  ${chapter(first)}

  <blockquote class="pull"><p class="serif">${esc(f.insight)}</p></blockquote>

  ${f.gallery ? `<section class="gallery" aria-labelledby="ui-${f.slug}">
    <header class="gallery-head"><h2 id="ui-${f.slug}">What a person actually sees.</h2><p class="small">${esc(f.galleryNote)}</p></header>
    <div class="gallery-grid">${f.gallery.map((g, k) => `<figure class="shot shot--${[5, 7, 12, 7, 5][k] || 12}"><div class="shot-frame">${themed(g.src, g.w, g.h, g.alt)}</div><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div>
  </section>` : ''}

  ${more.map(chapter).join('')}

  ${f.art === 'product' ? `<figure class="case-figure"><div class="frame" tabindex="0" role="region" aria-label="Diagram — scroll horizontally on small screens">${diagrams[f.slug]}</div><figcaption>How the trust model works, drawn for this portfolio.</figcaption></figure>` : ''}

  <section class="section" aria-labelledby="dec-${f.slug}">
    <h2 id="dec-${f.slug}" class="section-title">Decisions and trade-offs</h2>
    <ol class="decisions">${f.decisions.map((d, j) => `<li class="decision"><span class="num">${String(j + 1).padStart(2, '0')}</span><h3>${esc(d.title)}</h3><div class="rationale"><p>${esc(d.why)}</p><dl><div><dt>Instead of</dt><dd>${esc(d.alt)}</dd></div><div><dt>Trade-off</dt><dd>${esc(d.tradeoff)}</dd></div></dl></div></li>`).join('')}</ol>
  </section>

  <section class="section" aria-labelledby="out-${f.slug}">
    <h2 id="out-${f.slug}" class="section-title">What happened</h2>
    <ul class="results">${visibleOutcomes.map(([m, r, k]) => `<li><h3>${esc(m)}</h3><p>${esc(r)}</p><span class="qual">${QUAL[k]}</span></li>`).join('')}</ul>
  </section>

  <section class="closing">
    <p class="reflection serif">${esc(f.reflection)}</p>
    <p class="muted">${esc(f.next)}</p>
  </section>

  <details class="disclosure validation">
    <summary>Role, team and how this was validated</summary>
    <div>
      <div class="ownership">
        <div><h3>Owned</h3><ul>${f.ownership.owned.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div><h3>Influenced</h3><ul>${f.ownership.influenced.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div><h3>Worked with</h3><ul>${f.ownership.team.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
      ${f.validation ? `<h3 class="mt-6">Build and validation</h3>${f.validation.map((p) => `<p>${esc(p)}</p>`).join('')}` : ''}
      ${repoOutcomes.length ? `<ul class="plain">${repoOutcomes.map(([m, r]) => `<li><strong>${esc(m)}:</strong> ${esc(r)}</li>`).join('')}</ul>` : ''}
      <p class="small mt-5">Each result is labelled by how it is known. Diagrams are drawn for this portfolio to explain the design reasoning; they are not client deliverables or screenshots of shipped systems.${f.gallery ? ' Interface images are rendered from the product’s own components with fictional data.' : ''}</p>
    </div>
  </details>
</div>

<a class="next-case"${tone(next)} href="/work/${next.slug}/"><div class="wrap"><p class="kicker">Next — ${esc(next.org)}</p><h2>${esc(next.title)}</h2>${ARROW}</div></a>
</article>`
  });
}

function supporting(s) {
  return page({
    path: `/work/${s.slug}/`, title: `${s.org} — ${s.title}`, type: 'article', description: s.problem.slice(0, 155),
    body: `
<article>
<header class="case-hero wrap">
  <p class="crumb"><a href="/work/">Work</a> <span aria-hidden="true">/</span> ${esc(s.org)}</p>
  <h1>${esc(s.title)}</h1>
  <dl class="case-facts"><div><dt>Client</dt><dd>${esc(s.org)}</dd></div><div><dt>Role</dt><dd>${esc(s.role)}</dd></div><div><dt>Status</dt><dd>${esc(QUAL[s.maturity])}</dd></div></dl>
  <p class="small mt-5">A short account. Client screens and internal details are withheld.</p>
</header>
<div class="wrap">
  <section class="chapter"><header><p class="kicker">The problem</p><h2>Beyond the brief.</h2></header><div class="body"><p>${esc(s.problem)}</p></div></section>
  <section class="chapter"><header><p class="kicker">My contribution</p><h2>What I worked on.</h2></header><div class="body"><p>${esc(s.work)}</p></div></section>
  <section class="chapter"><header><p class="kicker">Outcome</p><h2>What can be said.</h2></header><div class="body"><p>${esc(s.outcome[0])}</p><p class="qual">${QUAL[s.outcome[1]]}</p></div></section>
  <section class="closing"><p class="reflection serif">${esc(s.learning)}</p></section>
</div>
<a class="next-case" href="/work/"><div class="wrap"><p class="kicker">Back to all work</p><h2>See the selected case studies</h2>${ARROW}</div></a>
<div>
</div>
</article>`
  });
}

function resume() {
  return page({
    path: '/resume/', title: 'Résumé', description: `Résumé of ${SITE.name}, ${SITE.title} at ${SITE.employer}, Dublin.`, cta: false, jsonld: [personLd],
    body: `
<section class="wrap hero resume">
  <div class="btn-row no-print" style="margin-bottom:32px"><a class="btn" href="/resume/melvin-jayson-ogbalu-resume.pdf" download>Download PDF ${ARROW}</a><a class="btn btn--ghost" href="mailto:${SITE.email}">Email</a><a class="btn btn--ghost" href="${SITE.linkedin}" rel="noopener">LinkedIn ${EXT}</a></div>
  <h1>${esc(SITE.name)}</h1>
  <p class="lead" style="margin-top:12px">Product designer — complex, AI-enabled and regulated systems</p>
  <p class="contact-line"><span>${esc(SITE.location)}</span><a href="mailto:${SITE.email}">${SITE.email}</a><a href="${SITE.url}">${SITE.url.replace('https://', '')}</a><a href="${SITE.linkedin}">linkedin.com/in/chinedu-melvin-ogbalu</a></p>

  <h2>Summary</h2>
  <p>Product designer with a Computer Science background and experience across digital banking, healthcare, public services, professional membership and machine-learning operations. Led a combined design and engineering team as UX Design Lead at Fidelity Bank; now a UX Design &amp; Strategy Consultant at Accenture Song. Co-founder and product lead of X-hunt, a live, privacy-first contribution network. Known for reframing ambiguous briefs, designing the service behind the interface, and setting clear boundaries for AI in products.</p>

  <h2>Experience</h2>
  ${EXPERIENCE.map((e) => `<div class="job"><div class="mono muted">${e.when}<br>${esc(e.where)}</div><div><h3>${esc(e.role)} · ${esc(e.org)}</h3><p class="muted job-what${e.bullets.length ? ' print-hide' : ''}" style="margin-top:6px">${esc(e.what)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}</div></div>`).join('')}
  <div class="job"><div class="mono muted">Ongoing<br>Independent</div><div><h3>Co-founder &amp; Product Lead · X-hunt</h3><ul><li>Defined and lead the product: a privacy-first network connecting people who want to help with communities that need them; live in a pilot with a small number of communities.</li><li>Designed the consent architecture (private by default, double opt-in introductions, append-only record of sharing choices) and the AI assistant’s limits (drafts, never introduces, ranks or decides).</li><li>Lead the product build (Next.js, TypeScript, Supabase), including a migration to design tokens.</li></ul></div></div>
  <div class="job"><div class="mono muted">Ongoing<br>Independent</div><div><h3>Founder · Reveta</h3><ul><li>Venture ecosystem for trustworthy, evidence-led AI products, including Aura (evidence-led workspace) and Landmark AI (property verification exploration).</li></ul></div></div>

  <h2>Skills</h2>
  <p><strong>Design:</strong> product and interaction design, service design, information architecture, design systems, prototyping, accessibility and inclusive design.<br><strong>Research &amp; strategy:</strong> discovery, interviews and synthesis, empathy and journey mapping, systems thinking, problem framing, stakeholder alignment.<br><strong>Human–AI:</strong> automation boundaries, human-in-the-loop workflows, consent and privacy design, AI assistant behaviour.<br><strong>Technical:</strong> HTML, CSS, JavaScript and TypeScript, React and Next.js, Three.js, Supabase; Figma.</p>

  <h2>Education</h2>
  <div class="job"><div class="mono muted">Postgraduate</div><div><h3>MSc Design Thinking for Sustainability · University College Dublin</h3></div></div>
  <div class="job"><div class="mono muted">Study</div><div><h3>Economics and Public Policy · University of Limerick</h3></div></div>
  <div class="job"><div class="mono muted">Foundation</div><div><h3>Computer Science</h3></div></div>

  <h2>Mentoring &amp; writing</h2>
  <p>ADPList Top 1% Global UX Mentor — 200+ mentees, 4.7/5 rating. Volunteer student mentor, Foróige (January–April 2025). Author of <em>Designing Life’s Tapestry</em> (2024); essays on systems thinking and design on Medium.</p>
</section>`
  });
}

// ---------- redirects for previous URLs ----------
const REDIRECTS = [
  ['/notebook/', '/lab/'],
  ['/notebook/dexterity-lab/', '/lab/dexterity-lab/'],
  ['/notebook/dexterity-lab/case-study/', '/lab/dexterity-lab/case-study/']
];
const redirectStub = (to) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE.url}${to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p>This page has moved to <a href="${to}">${to}</a>.</p></body></html>`;

// ---------- build ----------
async function write(path, html) {
  const file = path.endsWith('.html') || path.endsWith('.xml') || path.endsWith('.txt') ? join(OUT, path) : join(OUT, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

async function copyLegacy() {
  // The Three.js prototype is a full-screen app and keeps its own dark chrome;
  // its top bar is rebranded and its links point at current routes.
  await cp(join(ROOT, 'legacy/assets'), join(OUT, 'assets'), { recursive: true });
  const f = 'lab/dexterity-lab/index.html';
  let html = await readFile(join(ROOT, 'legacy', f), 'utf8');
  html = html
    .replace(/<header class="labtop">[\s\S]*?<\/header>/, `<a class="skip-proto" href="#lab-canvas">Skip to prototype</a><header class="labtop"><a href="/lab/">← Lab</a><div class="labtitle">Dexterity Lab <span>/ procedural motion study</span></div><a href="/lab/dexterity-lab/case-study/">Read the write-up →</a></header>`)
    .replace(/<title>[^<]*<\/title>/, '<title>Dexterity Lab — procedural motion study — Melvin Jayson Ogbalu</title>')
    .replace(/content="K3 Embody Dexterity Lab:/, 'content="Dexterity Lab:')
    .replaceAll('/notebook/dexterity-lab/', '/lab/dexterity-lab/').replaceAll('href="/notebook/"', 'href="/lab/"')
    .replace('Return to the Design Engineering Lab ↗', 'Return to the Lab')
    .replace('</head>', `<link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>@font-face{font-family:"Geist";src:url("/fonts/geist-variable.woff2") format("woff2");font-weight:100 900;font-display:swap}body{font-family:"Geist",system-ui,sans-serif}.labtop a{font-size:14px;color:#e9ebe8;text-decoration:none;min-height:44px;display:inline-flex;align-items:center}.labtop a:hover{text-decoration:underline}.labtitle{letter-spacing:.02em;font-weight:600}aside .eyebrow{color:#a9baaf!important}.skip-proto{position:absolute;left:8px;top:-60px;background:#fff;color:#000;padding:8px 12px;z-index:9}.skip-proto:focus{top:8px}main *{min-width:0}.webgl-fallback{position:absolute;inset:auto 22px 72px 22px;max-width:46ch;padding:14px 16px;border:1px solid #526254;border-radius:10px;background:#111b15;color:#d7e2d9;font-size:14px;line-height:1.55}button,select{touch-action:manipulation;-webkit-tap-highlight-color:transparent}button{transition:transform 160ms cubic-bezier(.23,1,.32,1),background-color 150ms ease,border-color 150ms ease}button:active{transform:scale(.97)}:focus-visible{outline:2px solid #bceca0;outline-offset:2px}.stageinfo h1,.stageinfo p{text-shadow:0 1px 12px #080b0a,0 0 2px #080b0a}@media(max-width:600px){.labtitle span{display:none}.labtop{padding:0 12px;gap:8px}.labtop a{font-size:13px}.stageinfo h1{font-size:30px}.stageinfo p{max-width:24ch}.transport{gap:6px}.transport button,.transport select{min-height:44px}}@media(prefers-reduced-motion:reduce){button{transition:none}button:active{transform:none}}@media(max-width:900px){.stage{order:0}.playbar{order:1!important}.panel{order:2}}</style></head>`);
  await mkdir(dirname(join(OUT, f)), { recursive: true });
  await writeFile(join(OUT, f), html);
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await cp(join(ROOT, 'src/static'), OUT, { recursive: true });

  const routes = [];
  const add = async (path, html) => { await write(path, html); routes.push(path); };

  await add('/', home());
  await add('/work/', workIndex());
  for (const [i, f] of FLAGSHIPS.entries()) await add(`/work/${f.slug}/`, flagship(f, i));
  for (const s of SUPPORTING) await add(`/work/${s.slug}/`, supporting(s));
  await add('/resume/', resume());
  for (const p of extraPages({ page, esc, ev, ARROW, EXT, extLink, SITE, VENTURES, WRITING, INDEPENDENT, FLAGSHIPS, EXPERIENCE, DEX, dexCover, pic })) await add(p.path, p.html);

  // Minify the stylesheet (comments + whitespace) — no dependency needed.
  const cssPath = join(OUT, 'css/site.css');
  const css = (await readFile(cssPath, 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
  await writeFile(cssPath, css);

  await copyLegacy();
  routes.push('/lab/dexterity-lab/');
  for (const [from, to] of REDIRECTS) await write(from, redirectStub(to));

  // 404
  await write('/404.html', page({ path: '/404.html', title: 'Page not found', description: 'This page could not be found.', noindex: true, cta: false,
    body: `<section class="hero wrap"><p class="eyebrow">404</p><h1>This page isn’t <span class="serif">here.</span></h1><p class="lead">It may have moved during a redesign. These are the places most people are looking for:</p><div class="btn-row"><a class="btn" href="/work/">Selected work ${ARROW}</a><a class="btn btn--ghost" href="/resume/">Résumé</a><a class="btn btn--ghost" href="/">Home</a></div></section>` }));

  // SEO
  const indexable = routes.filter((r) => r !== '/404.html');
  await write('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((r) => `  <url><loc>${SITE.url}${r}</loc><lastmod>${BUILT}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  await write('/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

  console.log(`Built ${routes.length} pages → dist/ (${BUILT})`);
}

main().catch((e) => { console.error(e); process.exit(1); });
