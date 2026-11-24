#!/usr/bin/env node
// Zero-dependency static site build.
//   node scripts/build.mjs           → writes ./dist
// Content lives in src/data.mjs; diagrams in src/diagrams.mjs; static assets in src/static.
import { mkdir, writeFile, rm, cp, readFile, readdir, stat } from 'node:fs/promises';
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
function head({ title, description, path, type = 'website', jsonld = [], noindex = false }) {
  const url = SITE.url + path;
  const full = path === '/' ? `${SITE.name} — Product designer for complex, intelligent systems` : `${title} — ${SITE.name}`;
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('');
  return `<!doctype html>
<html lang="en-IE" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${SITE.url}/og.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Melvin Jayson Ogbalu — product designer for complex, intelligent systems">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f5f4ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/geist-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css?v=${BUILT}">
<script>(function(){try{var t=localStorage.getItem('mj-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}})()</script>
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
      <p class="eyebrow">Hiring for senior product design, UX or human–AI interaction?</p>
      <h2>Let’s talk about the <span class="serif">problem</span> you’re trying to solve.</h2>
      <div class="btn-row">
        <a class="btn" href="mailto:${SITE.email}">${SITE.email} ${ARROW}</a>
        <a class="btn btn--ghost" href="/resume/">Résumé ${ARROW}</a>
        <a class="btn btn--ghost" href="${SITE.linkedin}" rel="noopener">LinkedIn ${EXT}</a>
      </div>
    </div>` : ''}
    <div class="footer-cols">
      <div><h2>Work</h2><ul>${FLAGSHIPS.map((f) => `<li><a href="/work/${f.slug}/">${esc(f.org)}</a></li>`).join('')}<li><a href="/work/">All work</a></li></ul></div>
      <div><h2>Practice</h2><ul><li><a href="/about/">About</a></li><li><a href="/lab/">Design engineering lab</a></li><li><a href="/ventures/">Ventures</a></li><li><a href="/impact/">Research &amp; community</a></li><li><a href="/services/">Advisory</a></li></ul></div>
      <div><h2>Elsewhere</h2><ul><li><a href="${SITE.linkedin}" rel="noopener">LinkedIn</a></li><li><a href="${SITE.github}" rel="noopener">GitHub</a></li><li><a href="${SITE.medium}" rel="noopener">Medium</a></li><li><a href="/writing/">Writing</a></li></ul></div>
      <div><h2>Contact</h2><ul><li><a href="mailto:${SITE.email}">Email</a></li><li><a href="/contact/">Message form</a></li><li><a href="/resume/">Résumé (web &amp; PDF)</a></li></ul></div>
    </div>
    <div class="colophon"><span>© ${new Date().getFullYear()} ${esc(SITE.name)} · ${esc(SITE.location)}</span><span>Every outcome on this site is labelled with its evidence level. Client names describe engagements, not endorsements.</span></div>
  </div>
</footer>
<script src="/js/site.js?v=${BUILT}" defer></script>
</body>
</html>`;
}

export function page({ path, title, description, body, jsonld, cta = true, type, noindex }) {
  return `${head({ title, description, path, jsonld, type, noindex })}
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
const projectRow = (f, i) => `<li class="project reveal">
  <a href="/work/${f.slug}/">
    <span class="kicker-num">${String(i + 1).padStart(2, '0')}</span>
    <div>
      <h3>${esc(f.title)}</h3>
      <div class="meta"><span>${esc(f.org)}</span><span>${esc(f.capability)}</span><span>${esc(f.domain)}</span></div>
      <p>${esc(f.card)}</p>
      <div class="readmore">${ev(f.maturity)} <span class="arrow-link" style="margin-left:12px">Read case study ${ARROW}</span></div>
    </div>
    <div class="figure-frame" aria-hidden="true">${diagrams[f.slug].replace(/role="img" aria-labelledby="[^"]*"/, 'aria-hidden="true"').replace(/ id="[^"]*"/g, '')}</div>
  </a>
</li>`;

const compactRow = (s) => `<li><a href="/work/${s.slug}/"><span class="t">${esc(s.org)}</span><span class="d">${esc(s.title)}</span><span class="s">${ev(s.maturity)}</span>${ARROW}</a></li>`;

// ---------- pages ----------
const personLd = {
  '@context': 'https://schema.org', '@type': 'Person', name: SITE.name, alternateName: SITE.short,
  jobTitle: SITE.title, worksFor: { '@type': 'Organization', name: SITE.employer },
  address: { '@type': 'PostalAddress', addressLocality: 'Dublin', addressCountry: 'IE' },
  url: SITE.url, email: `mailto:${SITE.email}`, sameAs: [SITE.linkedin, SITE.github, SITE.medium],
  knowsAbout: ['Product design', 'UX design', 'Human–AI interaction', 'Service design', 'Design systems', 'UX research']
};

function home() {
  return page({
    path: '/', title: 'Home', description: SITE.description, jsonld: [personLd, { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url }],
    body: `
<section class="hero wrap" aria-labelledby="hero-title">
  <div class="hero-grid">
    <div>
      <p class="eyebrow">${esc(SITE.name)} · Product designer · Dublin</p>
      <h1 id="hero-title">Designing complex, intelligent systems people can <span class="serif">trust.</span></h1>
      <p class="lead">I find the problem underneath the brief, then design the product that solves it — across digital banking, healthcare, public services and machine-learning operations. Computer Science background; I prototype in code.</p>
      <div class="btn-row">
        <a class="btn" href="#work">Selected work ${ARROW}</a>
        <a class="btn btn--ghost" href="/resume/">Résumé</a>
        <a class="btn btn--ghost" href="mailto:${SITE.email}">Email me</a>
      </div>
    </div>
    <aside class="index-card" aria-label="At a glance">
      <dl>
        <div><dt>Now</dt><dd>${esc(SITE.title)}, ${esc(SITE.employer)}</dd></div>
        <div><dt>Before</dt><dd>UX Design Lead, Fidelity Bank — led design and engineering</dd></div>
        <div><dt>Building</dt><dd>X-hunt — co-founder, live pilot</dd></div>
        <div><dt>Focus</dt><dd>Human–AI interaction, enterprise and regulated services, design systems</dd></div>
        <div><dt>Mentoring</dt><dd>ADPList Top 1% UX mentor, 200+ mentees</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="section" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Selected work</p><h2 id="work-title">Four problems, <span class="serif">four kinds</span> of ownership.</h2></div>
      <p>Product leadership in banking, a live product I co-founded, human–AI workflow design in healthcare, and problem framing in machine-learning operations. Each case states my role, the work’s maturity and how its outcomes are known.</p>
    </div>
    <ol class="projects">${FLAGSHIPS.map(projectRow).join('')}</ol>
    ${evidenceLegend()}
  </div>
</section>

<section class="section" aria-labelledby="how-title">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">How I work</p><h2 id="how-title">Four habits, each with <span class="serif">evidence.</span></h2></div>
      <p>Not a process diagram. These are the judgements that recur across my work — follow the links to where they happened.</p>
    </div>
    <div class="principles">
      ${[
        ['01', 'Find the problem underneath the brief.', 'An analytics request turned out to be a coordination problem; an app redesign turned out to be an operations problem. I test the brief before designing to it.', [['YouTube', '/work/youtube-ml/'], ['Fidelity Bank', '/work/fidelity-bank/']]],
        ['02', 'Design the service, not only the screen.', 'Customers feel the tools staff use, the contact-centre loop and the clarity of the next step. I map both sides of the line of interaction.', [['Fidelity Bank', '/work/fidelity-bank/'], ['Mater Private', '/work/mater-private/']]],
        ['03', 'Keep people in authority over automation.', 'I decide what an AI system may do — and, as importantly, what it may not: draft but never decide, assist but never replace expert sign-off.', [['X-hunt', '/work/x-hunt/'], ['ViiV Healthcare', '/work/viiv-healthcare/'], ['Autonomy proposal', '/work/autonomy-proposal/']]],
        ['04', 'Build to learn, and say what is unproven.', 'I prototype in code to test whether an interaction explains what it needs to, and I label concepts as concepts.', [['X-hunt', '/work/x-hunt/'], ['The Lab', '/lab/']]]
      ].map(([n, h, p, links]) => `<article class="principle reveal"><span class="kicker-num">${n}</span><h3>${h}</h3><p>${p}</p><div class="proof">${links.map(([t, u]) => `<a class="arrow-link" href="${u}">${t} ${ARROW}</a>`).join('')}</div></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="more-title">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">More work</p><h2 id="more-title">Supporting projects.</h2></div>
      <p>Shorter, public-safe summaries of client and proposal work. Confidential details are withheld.</p>
    </div>
    <ul class="compact">${SUPPORTING.map(compactRow).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="exp-title">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Experience</p><h2 id="exp-title">From the bank counter to <span class="serif">machine learning.</span></h2></div>
      <p>I began close to customers in financial services. That early view of the gap between how a service is imagined and how it feels still shapes the questions I ask.</p>
    </div>
    <ol class="timeline">${EXPERIENCE.map((e) => `<li><span class="when">${e.when}</span><span class="role">${esc(e.role)}<span class="org">${esc(e.org)} · ${esc(e.where)}</span></span><span class="what">${esc(e.what)}</span></li>`).join('')}</ol>
    <div class="btn-row mt-6"><a class="btn btn--ghost" href="/resume/">Full résumé ${ARROW}</a><a class="btn btn--ghost" href="/about/">About me ${ARROW}</a></div>
  </div>
</section>

<section class="section" aria-labelledby="lab-title">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Beyond client work</p><h2 id="lab-title">Building, writing, <span class="serif">mentoring.</span></h2></div>
      <p>Different ways of pursuing the same question: how design and technology can help people do things that matter.</p>
    </div>
    <div class="tiles">
      <a class="tile reveal" href="/lab/"><p class="eyebrow eyebrow--plain">Design engineering</p><h3>The Lab</h3><p>An icon grammar for invisible AI processes, a Three.js motion study, and how I think about the handoff from strategy to implementation.</p><span class="foot"><span class="small">Interactive</span>${ARROW}</span></a>
      <a class="tile reveal" href="/ventures/"><p class="eyebrow eyebrow--plain">Ventures</p><h3>Reveta, X-hunt, Aura</h3><p>Products I am building myself — where there is no brief to hide behind and every decision is mine to defend.</p><span class="foot"><span class="small">Live pilot · in development</span>${ARROW}</span></a>
      <a class="tile reveal" href="/writing/"><p class="eyebrow eyebrow--plain">Writing &amp; mentoring</p><h3>Ideas in public</h3><p>Essays on systems thinking and design, a published book, and mentoring designers through ADPList.</p><span class="foot"><span class="small">Medium · book</span>${ARROW}</span></a>
    </div>
  </div>
</section>`
  });
}

function workIndex() {
  return page({
    path: '/work/', title: 'Work', description: 'Case studies in product leadership, human–AI interaction, problem framing and zero-to-one product building by Melvin Jayson Ogbalu.',
    body: `
<section class="hero wrap">
  <p class="eyebrow">Work</p>
  <h1>Case studies.</h1>
  <p class="lead">Each case states my role, the engagement type, the work’s maturity and how its outcomes are known. Client work is described at the level I can publish; diagrams are drawn for this portfolio and labelled as such.</p>
  ${evidenceLegend()}
</section>
<section class="section section--flush" aria-labelledby="flag-title">
  <div class="wrap">
    <h2 id="flag-title" class="visually-hidden">Flagship case studies</h2>
    <ol class="projects">${FLAGSHIPS.map(projectRow).join('')}</ol>
  </div>
</section>
<section class="section" aria-labelledby="sup-title">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">Supporting work</p><h2 id="sup-title">Shorter summaries.</h2></div><p>Client and proposal work where only a public-safe summary can be shared.</p></div>
    <ul class="compact">${SUPPORTING.map(compactRow).join('')}</ul>
  </div>
</section>`
  });
}

function flagship(f, i) {
  const next = FLAGSHIPS[(i + 1) % FLAGSHIPS.length];
  const fig = diagrams[f.slug];
  return page({
    path: `/work/${f.slug}/`, title: `${f.org} — ${f.title}`, type: 'article', description: f.card,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: f.title, about: f.domain, author: { '@type': 'Person', name: SITE.name }, url: `${SITE.url}/work/${f.slug}/` }],
    body: `
<article>
<header class="case-hero wrap">
  <p class="breadcrumb"><a href="/work/">Work</a> / ${esc(f.org)}</p>
  <p class="eyebrow">${esc(f.org)} · ${esc(f.domain)}</p>
  <h1>${esc(f.title)}</h1>
  <p class="lead">${esc(f.lede)}</p>
  <dl class="summary">${f.summary.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  <div class="tldr">${f.tldr.map(([k, v]) => `<div><h2>${esc(k)}</h2><p>${esc(v)}</p></div>`).join('')}</div>
  <div class="btn-row mt-6">${ev(f.maturity)}${f.link ? extLink(f.link.href, f.link.label) : ''}</div>
</header>

<div class="wrap">
  <figure class="case-figure">
    <div class="frame" tabindex="0" role="region" aria-label="Diagram — scroll horizontally on small screens">${fig}</div>
    <figcaption><span class="ev ev--none">Explanatory diagram</span> Drawn for this portfolio to explain the design reasoning. Not a client deliverable or a screenshot of a shipped system. <span class="scroll-hint">Scroll sideways to see all of it.</span></figcaption>
  </figure>

  ${f.chapters.map(([eyebrow, h, paras]) => `<section class="chapter"><header><p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(h)}</h2></header><div class="body">${paras.map((p) => `<p>${p}</p>`).join('')}</div></section>`).join('')}

  <section class="chapter" aria-labelledby="own-${f.slug}">
    <header><p class="eyebrow">My ownership</p><h2 id="own-${f.slug}">What I owned, influenced and shared.</h2></header>
    <div class="body"><div class="ownership">
      <div><h3>Owned</h3><ul>${f.ownership.owned.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div><h3>Influenced</h3><ul>${f.ownership.influenced.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div><h3>Worked with</h3><ul>${f.ownership.team.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
    </div></div>
  </section>

  <section class="section" aria-labelledby="dec-${f.slug}">
    <div class="section-head"><div><p class="eyebrow">Decisions and trade-offs</p><h2 id="dec-${f.slug}">The calls that shaped it.</h2></div></div>
    <ol class="decisions">${f.decisions.map((d, j) => `<li class="decision reveal"><span class="kicker-num">${String(j + 1).padStart(2, '0')}</span><div><h3>${esc(d.title)}</h3></div><div class="rationale"><p>${esc(d.why)}</p><dl class="mt-5"><dt>Instead of</dt><dd>${esc(d.alt)}</dd><dt>Trade-off</dt><dd>${esc(d.tradeoff)}</dd></dl></div></li>`).join('')}</ol>
  </section>

  <section class="section" aria-labelledby="out-${f.slug}">
    <div class="section-head"><div><p class="eyebrow">Outcomes</p><h2 id="out-${f.slug}">What is known, and how.</h2></div><p>Outcomes are separated from what is reported, proposed or unmeasured.</p></div>
    <table class="outcomes"><thead><tr><th scope="col">Measure</th><th scope="col">Result</th><th scope="col">Evidence</th></tr></thead><tbody>
      ${f.outcomes.map(([m, r, k]) => `<tr><td>${esc(m)}</td><td>${esc(r)}</td><td>${ev(k)}</td></tr>`).join('')}
    </tbody></table>
  </section>

  <section class="chapter">
    <header><p class="eyebrow">Reflection</p><h2>What I took from it.</h2></header>
    <div class="body"><p class="reflection">${esc(f.reflection)}</p><p>${esc(f.next)}</p></div>
  </section>

  <a class="next-case" href="/work/${next.slug}/"><div><p class="eyebrow">Next case study · ${esc(next.org)}</p><h2>${esc(next.title)}</h2></div>${ARROW}</a>
</div>
</article>`
  });
}

function supporting(s) {
  return page({
    path: `/work/${s.slug}/`, title: `${s.org} — ${s.title}`, type: 'article', description: s.problem.slice(0, 155),
    body: `
<article>
<header class="case-hero wrap">
  <p class="breadcrumb"><a href="/work/">Work</a> / ${esc(s.org)}</p>
  <p class="eyebrow">${esc(s.org)} · ${esc(s.domain)}</p>
  <h1>${esc(s.title)}</h1>
  <dl class="summary"><div><dt>Role</dt><dd>${esc(s.role)}</dd></div><div><dt>Format</dt><dd>Public-safe summary</dd></div><div><dt>Maturity</dt><dd>${ev(s.maturity)}</dd></div><div><dt>Confidentiality</dt><dd>Client screens and internal details withheld</dd></div></dl>
</header>
<div class="wrap">
  <section class="chapter"><header><p class="eyebrow">The problem</p><h2>Beyond the brief.</h2></header><div class="body"><p>${esc(s.problem)}</p></div></section>
  <section class="chapter"><header><p class="eyebrow">My contribution</p><h2>What I worked on.</h2></header><div class="body"><p>${esc(s.work)}</p></div></section>
  <section class="chapter"><header><p class="eyebrow">Outcome</p><h2>What can be said.</h2></header><div class="body"><p>${esc(s.outcome[0])}</p><p>${ev(s.outcome[1])}</p></div></section>
  <section class="chapter"><header><p class="eyebrow">Reflection</p><h2>What stayed with me.</h2></header><div class="body"><p class="reflection">${esc(s.learning)}</p></div></section>
  <a class="next-case" href="/work/"><div><p class="eyebrow">Back to all work</p><h2>See the flagship case studies</h2></div>${ARROW}</a>
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
    .replace('</head>', `<link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>@font-face{font-family:"Geist";src:url("/fonts/geist-variable.woff2") format("woff2");font-weight:100 900;font-display:swap}body{font-family:"Geist",system-ui,sans-serif}.labtop a{font-size:14px;color:#e9ebe8;text-decoration:none;min-height:44px;display:inline-flex;align-items:center}.labtop a:hover{text-decoration:underline}.labtitle{letter-spacing:.02em;font-weight:600}aside .eyebrow{color:#a9baaf!important}.skip-proto{position:absolute;left:8px;top:-60px;background:#fff;color:#000;padding:8px 12px;z-index:9}.skip-proto:focus{top:8px}main *{min-width:0}.webgl-fallback{position:absolute;inset:auto 22px 72px 22px;max-width:46ch;padding:14px 16px;border:1px solid #526254;border-radius:10px;background:#111b15;color:#d7e2d9;font-size:14px;line-height:1.55}button,select{touch-action:manipulation;-webkit-tap-highlight-color:transparent}button{transition:transform 160ms cubic-bezier(.23,1,.32,1),background-color 150ms ease,border-color 150ms ease}button:active{transform:scale(.97)}:focus-visible{outline:2px solid #bceca0;outline-offset:2px}.stageinfo h1,.stageinfo p{text-shadow:0 1px 12px #080b0a,0 0 2px #080b0a}@media(max-width:600px){.labtitle span{display:none}.labtop{padding:0 12px;gap:8px}.labtop a{font-size:13px}.stageinfo h1{font-size:30px}.stageinfo p{max-width:24ch}.transport{gap:6px}.transport button,.transport select{min-height:44px}}@media(prefers-reduced-motion:reduce){button{transition:none}button:active{transform:none}}</style></head>`);
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
  for (const p of extraPages({ page, esc, ev, ARROW, EXT, extLink, SITE, VENTURES, WRITING, INDEPENDENT, FLAGSHIPS })) await add(p.path, p.html);

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
