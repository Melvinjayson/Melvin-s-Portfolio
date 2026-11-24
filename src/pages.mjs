import { readFileSync } from 'node:fs';
// Secondary pages. Helpers are injected by scripts/build.mjs to avoid a circular import.
export function pages(h) {
  const { page, esc, ev, ARROW, EXT, extLink, SITE, VENTURES, WRITING, FLAGSHIPS, DEX, dexCover } = h;
  const out = [];
  const add = (path, opts) => out.push({ path, html: page({ path, ...opts }) });

  // ---------------- About ----------------
  add('/about/', {
    title: 'About',
    description: 'About Melvin Jayson Ogbalu — a Dublin-based product designer whose path runs from customer-facing banking in Nigeria to consulting, research, mentoring and building products of his own.',
    body: `
<section class="about-hero wrap">
  <figure class="about-portrait"><img class="portrait" src="${SITE.portrait}" alt="Portrait of Melvin Jayson Ogbalu" width="640" height="800" fetchpriority="high" decoding="async"></figure>
  <div class="about-intro">
    <p class="kicker">About</p>
    <h1 class="display">Curious by nature. <span class="serif">Intentional</span> by design.</h1>
    <p class="lead">I’m Melvin — a product designer in Dublin. I grew up professionally on the customer side of banking in Nigeria, where I learned how a service really feels to the person on the other side of the counter. That view has stayed with me through every role since.</p>
  </div>
</section>

<section class="path wrap" aria-labelledby="path-title">
  <h2 id="path-title" class="section-title">A path, not a plan</h2>
  <ol class="path-list">
    <li><span class="when">Early career</span><div><h3>Listening at the counter</h3><p>Customer-facing roles at GTBank and elsewhere showed me the gap between how an organisation imagines a service and how it feels to use. I still start there.</p></div></li>
    <li><span class="when">2018 — 2021</span><div><h3>Learning what survives implementation</h3><p>At Rivet Software and Inlaks I designed payment workflows and a learning platform, and saw how design decisions live or die once engineering begins.</p></div></li>
    <li><span class="when">2021 — 2022</span><div><h3>Leading design at a bank</h3><p>At Fidelity Bank I led the design and engineering team redesigning retail and corporate banking. Trust stopped being an abstraction: people need to know where their money is, what happens when they confirm, and how to recover.</p></div></li>
    <li><span class="when">2022 — now</span><div><h3>Consulting where the brief is still unclear</h3><p>At Accenture Song I work across machine-learning operations, healthcare, public services, energy and finance. The lesson that keeps returning: <em>a polished interface cannot rescue a poorly understood problem.</em></p></div></li>
    <li><span class="when">Alongside</span><div><h3>Building my own</h3><p>I co-founded X-hunt and lead the Reveta ecosystem, including Aura. There is no client to hide behind — every decision is mine to defend.</p></div></li>
  </ol>
</section>

<section class="beliefs wrap" aria-labelledby="beliefs-title">
  <h2 id="beliefs-title" class="section-title">What I believe about the work</h2>
  <div class="beliefs-grid">
    <div><p class="serif big-quote">Research before assumptions.</p><p>Interviews, synthesis and systems mapping make hidden needs and trade-offs visible before anyone draws a screen.</p></div>
    <div><p class="serif big-quote">Technology with intention.</p><p>AI, spatial interfaces and prototyping matter when they solve a real problem and leave people in charge — not as ends in themselves.</p></div>
    <div><p class="serif big-quote">Say what is unproven.</p><p>I would rather show an honest experiment than make a demo sound more capable than it is.</p></div>
  </div>
  <p class="engineering-note">I studied Computer Science. It changes the questions I ask while designing — what data a screen depends on, where state changes, what happens when an action fails — and it lets me prototype in code when a static picture can’t answer the question. <a href="/lab/">See the Lab</a>.</p>
</section>

<section class="giving wrap" id="mentoring" aria-labelledby="giving-title">
  <h2 id="giving-title" class="section-title">Giving back</h2>
  <div class="giving-grid">
    <div><span class="big">200+</span><h3>Mentees on ADPList</h3><p>Top 1% global UX mentor, with a 4.7/5 rating (as recorded in my 2026 CV). Portfolio reviews, career questions and the messy middle of design work — helping people build their own judgement.</p></div>
    <div><span class="big serif">2025</span><h3>Foróige student mentor</h3><p>Volunteering from January to April, supporting young people to build confidence and a sense of possibility long before anyone has a job title.</p></div>
    <div><span class="big serif">2024</span><h3><em>Designing Life’s Tapestry</em></h3><p>A book about faith, connection and wellness — the invisible heroes of everyday life. I also write essays on systems, design and intelligent technology. <a href="/writing/">Writing</a>.</p></div>
  </div>
</section>

<section class="study wrap" aria-labelledby="study-title">
  <h2 id="study-title" class="section-title">Study</h2>
  <p class="lead">Computer Science. An MSc in Design Thinking for Sustainability at University College Dublin, including the <a href="/impact/">Soiléir impact-rating research</a>. Economics and Public Policy at the University of Limerick.</p>
  <div class="btn-row mt-6"><a class="btn" href="/resume/">Résumé ${ARROW}</a><a class="btn btn--ghost" href="${SITE.linkedin}" rel="noopener">LinkedIn ${EXT}</a></div>
</section>`
  });

  // ---------------- Lab ----------------
  add('/lab/', {
    title: 'Lab',
    description: 'The Lab: Melvin Jayson Ogbalu’s independent practice exploring where design, research, engineering and emerging technology meet.',
    image: { src: '/img/lab/dexterity-og.jpg', alt: DEX.label },
    body: `
<section class="hero wrap">
  <p class="kicker">The Lab</p>
  <h1 class="display">Thinking in systems. <span class="serif">Building</span> to learn.</h1>
  <p class="lead">My independent practice, where design, research and engineering meet. Each experiment starts with a question about how people understand complex systems — and says plainly what it does and does not show.</p>
</section>

<section class="lab-cinema" aria-labelledby="dex-title">
  <figure class="lab-cover lab-cover--tall">${dexCover(true)}<figcaption>${esc(DEX.label)}</figcaption></figure>
  <div class="wrap lab-cinema-copy">
    <p class="kicker">Experiment 01 · Embodied interaction</p>
    <h2 id="dex-title">Dexterity Lab: making movement <span class="serif">inspectable.</span></h2>
    <p class="lead">How should an interface explain what a machine is doing with its hands — which object is active, which phase it is in, what is safe to touch? A procedural Three.js replay you can scrub, slow down and orbit.</p>
    <p class="small">Simplified geometry and illustrative numbers — not a physics simulation or robot telemetry. The interaction model was informed by an external reference (K3 Embody / Wuji Dexterity Lab), whose design remains with its creators.</p>
    <div class="btn-row mt-6"><a class="btn" href="/lab/dexterity-lab/">Open the interactive prototype ${ARROW}</a><a class="btn btn--ghost" href="/lab/dexterity-lab/case-study/">Read the study</a></div>
  </div>
</section>

<section class="section" aria-labelledby="aura-title">
  <div class="wrap">
    <div class="section-head"><div><p class="kicker">From my own products</p><h2 id="aura-title">Judgement, made <span class="serif">visible.</span></h2></div><p>Design questions from X-hunt and Aura that sit between interface and system.</p></div>
    <div class="aura-study">
      <figure class="shot"><div class="shot-frame shot-frame--dark"><img src="/img/aura/composer.webp" width="1640" height="320" alt="Aura’s message composer: a text box reading “Ask Aura anything…”, a Quick / Deliberate mode switch, Talk and microphone buttons, and a footer line: “Aura works inside your workspace. Nothing leaves it yet. Model status unverified.”" loading="lazy" decoding="async"></div><figcaption>Aura’s composer, captured from a local development build. In development; not a launched product.</figcaption></figure>
      <div class="aura-notes">
        <h3>Aura: judgement made visible</h3>
        <p>The composer offers two modes. <strong>Deliberate</strong> is also switched on automatically when sources look unreliable — invalid or future dates, duplicates, unsafe URL forms — and the reply must then name its limitations and a verification step. The footer says what is true today: nothing leaves the workspace, and the model’s status is unverified.</p>
        <p>The pilot is written to be falsified: at least a 25% cut in median handling time across three tasks, at least 90% of material claims backed by an original source, and every external message kept as a draft. Any cross-workspace exposure stops it.</p>
      </div>
    </div>

  </div>
</section>

<section class="section" aria-labelledby="next-title">
  <div class="wrap">
    <div class="section-head"><div><p class="kicker">Questions I want to explore next</p><h2 id="next-title">Areas of <span class="serif">interest.</span></h2></div><p>Directions for future experiments. None of these is a project yet.</p></div>
    <ul class="interests">
      <li><h3>Human–AI interaction</h3><p>How a system shows confidence, sources and the limits of what it may do.</p></li>
      <li><h3>Embodied intelligence</h3><p>Interfaces for machines that act in the physical world, and the people who supervise them.</p></li>
      <li><h3>Spatial computing</h3><p>When depth and space help understanding — and when they only add spectacle.</p></li>
      <li><h3>Computational design</h3><p>Systems that generate design options, and how a designer stays the author.</p></li>
      <li><h3>Interaction craft</h3><p>Motion, feedback and timing that make software feel considered.</p></li>
    </ul>
    <p class="small mt-6">This site is part of the practice: a hand-built static site with its own design and motion system. <a href="${SITE.github}/Melvin-s-Portfolio" rel="noopener">Source on GitHub</a>.</p>
  </div>
</section>`
  });

  // ---------------- Writing ----------------
  add('/writing/', {
    title: 'Writing',
    description: 'Books and essays by Melvin Jayson Ogbalu on systems thinking, design, intelligent technology and resilience.',
    body: `
<section class="hero wrap">
  <p class="eyebrow">Writing</p>
  <h1>Thinking <span class="serif">out loud.</span></h1>
  <p class="lead">Writing about systems, design, faith, human connection and how we work with intelligent technology.</p>
</section>
<section class="section section--flush" aria-labelledby="books-title"><div class="wrap">
  <h2 id="books-title" class="visually-hidden">Books and research</h2>
  <div class="tiles">
    <a class="tile" href="https://amzn.eu/d/045p1OYC" rel="noopener"><p class="eyebrow eyebrow--plain">Published book · 2024</p><h3>Designing Life’s Tapestry</h3><p>Journey of Faith, Connection, and Wellness — tales of the invisible heroes of everyday life. A reflective exploration of resilience, belonging and the relationships that shape how we live.</p><span class="foot"><span class="small">Amazon</span>${EXT}</span></a>
    <div class="tile"><p class="eyebrow eyebrow--plain">Manuscript in development</p><h3>The Handoff</h3><p>What should we delegate to AI, what should remain human, and how should those transitions be designed?</p><span class="foot"><span class="small">In progress</span></span></div>
    <a class="tile" href="/impact/"><p class="eyebrow eyebrow--plain">Research</p><h3>Soiléir impact rating</h3><p>Postgraduate research on making sustainability impact understandable without collapsing it into a misleading single number.</p><span class="foot"><span class="small">UCD</span>${ARROW}</span></a>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><p class="eyebrow">Essays</p><h2>On Medium.</h2></div><p><a class="arrow-link" href="${SITE.medium}" rel="noopener">All essays ${EXT}</a></p></div>
  <ul class="compact">${WRITING.map((w) => `<li><a href="${esc(w.href)}" rel="noopener"><span class="t">${esc(w.title)}</span><span class="d">${esc(w.desc)}</span><span class="s mono">${esc(w.kind)}</span>${EXT}</a></li>`).join('')}</ul>
</div></section>`
  });

  // ---------------- Ventures ----------------
  add('/ventures/', {
    title: 'Ventures',
    description: 'Independent products by Melvin Jayson Ogbalu, with honest status labels: X-hunt, Reveta, Aura, Landmark AI and more.',
    body: `
<section class="hero wrap">
  <p class="eyebrow">Ventures</p>
  <h1>No brief to <span class="serif">hide behind.</span></h1>
  <p class="lead">Building my own products means deciding what is worth building, writing the requirements, making trade-offs and testing whether anyone needs the result. These are works in progress, labelled by status — not finished success stories.</p>
</section>
<section class="section section--flush"><div class="wrap">
  <ul class="compact">${VENTURES.map((v) => `<li>${v.href ? `<a href="${esc(v.href)}"${v.href.startsWith('http') ? ' rel="noopener"' : ''}>` : '<div style="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1.2fr) minmax(120px,.6fr) 24px;gap:24px;padding:24px 0">'}<span class="t">${esc(v.name)}<span class="small" style="display:block;font-weight:400">${esc(v.kind)}</span></span><span class="d">${esc(v.body)}</span><span class="s">${esc(v.status)}</span>${v.href ? (v.href.startsWith('http') ? EXT : ARROW) + '</a>' : '<span></span></div>'}</li>`).join('')}</ul>
</div></section>`
  });

  // ---------------- Impact ----------------
  add('/impact/', {
    title: 'Research & community',
    description: 'Sustainability research, community research and mentorship by Melvin Jayson Ogbalu.',
    body: `
<section class="hero wrap">
  <p class="eyebrow">Research &amp; community</p>
  <h1>Designing beyond <span class="serif">the screen.</span></h1>
  <p class="lead">Sustainability research, community work and mentoring push me to think about who participates, who benefits and what we really mean when we talk about impact.</p>
</section>
<div class="wrap">
  <section class="chapter"><header><p class="eyebrow">Research · UCD</p><h2>Soiléir: making sustainability impact understandable.</h2></header><div class="body">
    <p>Explored within my MSc Design Thinking for Sustainability studies and a Dublin City Council-related project brief. The challenge: make sustainability performance easier to interpret, compare and discuss without reducing complex environmental and social outcomes to a misleading single number.</p>
    <p>Impact ratings help people decide, but they introduce design risks — what gets measured, whose perspective counts, how evidence is weighted, and whether a score creates false confidence. The research centred on clarity, transparency and communicating uncertainty rather than concealing it.</p>
    <p>${ev('concept')} A research direction, not an approved rating methodology or delivered interface.</p>
  </div></section>
  <section class="chapter"><header><p class="eyebrow">Community research · X-hunt</p><h2>Connecting willingness to contribute with real opportunity.</h2></header><div class="body">
    <p>Stakeholder conversations, surveys, empathy mapping and iterative concept development with individuals and community organisations. The learning: participation depends on more than matching skills — trust, motivation, time, accessibility, belonging and recognition all decide whether someone takes part and returns.</p>
    <p><a class="arrow-link" href="/work/x-hunt/">Read the X-hunt case study ${ARROW}</a></p>
  </div></section>
  <section class="chapter"><header><p class="eyebrow">Mentorship and inclusion</p><h2>Design capability grows through shared learning.</h2></header><div class="body">
    <p>Mentoring designers through ADPList and young people through Foróige creates space to discuss research practice, judgement, accessibility and ethics. Strong design is not only the quality of an interface, but whose perspectives are heard and whose needs are made visible.</p>
  </div></section>
</div>`
  });

  // ---------------- Services (secondary) ----------------
  const services = [
    ['UX Bridge needs analysis', 'When the problem feels bigger than the brief: where the product is today, who it serves, what is known and where the evidence is thin.', 'A needs assessment, opportunity and risk map, and a recommended next step.'],
    ['UX & product audit', 'For a product that works, but not as well as it should: user needs, information architecture, accessibility, key journeys and business context.', 'An evidence-aware findings report and practical priorities.'],
    ['AI-UX workflow workshop', 'For teams integrating AI without a clear picture of what people should still control: decisions, capabilities, authority boundaries, failure and recovery.', 'A human–AI workflow map, risk questions and prototype opportunities.'],
    ['Design strategy sprint', 'For a new idea or a team stuck between directions: frame the decision, surface assumptions and turn findings into a manageable direction.', 'A problem frame, decision criteria and a design or research plan.'],
    ['Product architecture advisory', 'When complexity comes from teams, rules, workflows and technology pulling in different directions.', 'An experience architecture direction and workflow model.'],
    ['Mentorship and speaking', 'Career development, portfolios, UX research, design leadership and working with emerging technology.', 'A focused mentoring conversation or a scoped talk.']
  ];
  add('/services/', {
    title: 'Advisory',
    description: 'Independent UX, product strategy and AI-UX advisory by Melvin Jayson Ogbalu.',
    body: `
<section class="hero wrap">
  <p class="eyebrow">Independent advisory</p>
  <h1>A clearer problem. A better <span class="serif">place to begin.</span></h1>
  <p class="lead">Work usually starts with a conversation about what isn’t working. Each engagement begins with scoping rather than a fixed package; nothing is committed by sending an enquiry.</p>
</section>
<section class="section section--flush"><div class="wrap">
  <ul class="compact">${services.map(([t, d, o]) => `<li><a href="/contact/?service=${encodeURIComponent(t)}"><span class="t">${esc(t)}</span><span class="d">${esc(d)}</span><span class="s">${esc(o)}</span>${ARROW}</a></li>`).join('')}</ul>
</div></section>`
  });

  // ---------------- Contact ----------------
  const reasons = ['Hiring conversation', 'General enquiry', 'Discovery call', 'UX Bridge needs analysis', 'UX & product audit', 'AI-UX workflow workshop', 'Design strategy sprint', 'Product architecture advisory', 'Mentorship and speaking'];
  add('/contact/', {
    title: 'Contact',
    description: 'Contact Melvin Jayson Ogbalu about senior product design roles, collaborations or advisory work.',
    cta: false,
    body: `
<section class="hero wrap">
  <div class="grid">
    <div class="span-6">
      <p class="eyebrow">Contact</p>
      <h1>Start with the <span class="serif">real</span> question.</h1>
      <p class="lead">Recruiting for a senior product design or human–AI role, or working on something difficult? Email is fastest. I read every message and reply directly.</p>
      <div class="btn-row"><a class="btn" href="mailto:${SITE.email}">${SITE.email} ${ARROW}</a><a class="btn btn--ghost" href="${SITE.linkedin}" rel="noopener">LinkedIn ${EXT}</a><a class="btn btn--ghost" href="/resume/">Résumé</a></div>
    </div>
    <div class="span-5 start-8">
      <form class="form" data-contact-form method="post" action="/api/contact">
        <div class="two">
          <div class="field"><label for="c-name">Name</label><input id="c-name" name="name" autocomplete="name" required minlength="2" maxlength="100"></div>
          <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" required maxlength="254"></div>
        </div>
        <div class="field"><label for="c-company">Organisation <span class="hint">(optional)</span></label><input id="c-company" name="company" autocomplete="organization" maxlength="120"></div>
        <div class="field"><label for="c-service">Reason</label><select id="c-service" name="service" required>${reasons.map((r) => `<option>${esc(r)}</option>`).join('')}</select></div>
        <div class="field"><label for="c-message">Message</label><textarea id="c-message" name="message" rows="6" required minlength="15" maxlength="3000" aria-describedby="c-message-hint"></textarea><span class="hint" id="c-message-hint">Please don’t include passwords or confidential material.</span></div>
        <div class="hp" aria-hidden="true"><label for="c-website">Website</label><input id="c-website" name="website" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="startedAt" value="">
        <label class="check"><input type="checkbox" name="consent" required> <span>I agree to my details being used to reply to this message. No marketing.</span></label>
        <div><button class="btn" type="submit">Send message</button></div>
        <p class="form-status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`
  });

  // ---------------- Dexterity Lab write-up ----------------
  add('/lab/dexterity-lab/case-study/', {
    title: 'Dexterity Lab — making procedural movement understandable',
    type: 'article',
    description: 'A Three.js procedural motion study: task selection, time controls and feedback that make a scripted 3D sequence inspectable, with its limits stated.',
    image: { src: '/img/lab/dexterity-og.jpg', alt: DEX.label },
    body: `<div class="wrap" style="padding-top:48px"><p class="crumb" style="margin:0"><a href="/lab/">Lab</a> <span aria-hidden="true">/</span> Dexterity Lab</p></div><figure class="lab-cover lab-cover--case wrap">${dexCover(true, '(min-width: 1320px) 1320px, 100vw')}<figcaption>${esc(DEX.label)}</figcaption></figure>` + readFileSync(new URL('./content/dexterity-case-study.html', import.meta.url), 'utf8')
  });

  return out;
}
