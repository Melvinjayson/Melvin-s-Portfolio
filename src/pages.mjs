// Secondary pages. Helpers are injected by scripts/build.mjs to avoid a circular import.
export function pages(h) {
  const { page, esc, ev, ARROW, EXT, extLink, SITE, VENTURES, WRITING, FLAGSHIPS } = h;
  const out = [];
  const add = (path, opts) => out.push({ path, html: page({ path, ...opts }) });

  // ---------------- About ----------------
  add('/about/', {
    title: 'About',
    description: 'About Melvin Jayson Ogbalu — product designer at Accenture Song, Dublin, with a background in Computer Science and financial services.',
    body: `
<section class="hero wrap">
  <div class="grid">
    <div class="span-7">
      <p class="eyebrow">About</p>
      <h1>Curious by nature. <span class="serif">Intentional</span> by design.</h1>
      <p class="lead">I’m a product designer in Dublin. Curiosity has carried me from customer-facing banking in Nigeria to leading a bank’s design and engineering team, consulting on machine-learning operations and healthcare, and building a product of my own.</p>
      <div class="btn-row"><a class="btn" href="/resume/">Résumé ${ARROW}</a><a class="btn btn--ghost" href="${SITE.linkedin}" rel="noopener">LinkedIn ${EXT}</a></div>
    </div>
    <figure class="span-4 start-9" style="margin:0">
      <img class="portrait" src="${SITE.portrait}" alt="Portrait of Melvin Jayson Ogbalu" width="640" height="800" fetchpriority="high" decoding="async">
    </figure>
  </div>
</section>

<div class="wrap">
  <section class="chapter"><header><p class="eyebrow">How I got here</p><h2>I didn’t begin by designing interfaces.</h2></header><div class="body">
    <p>I began by listening to people trying to get things done — often in systems that made simple tasks unnecessarily difficult. Working directly with banking customers showed me the gap between how an organisation imagines a service works and how it feels to the person using it.</p>
    <p>At Rivet Software and Inlaks I designed payment workflows and a learning platform, and learned how design decisions survive — or fail to survive — implementation. At Fidelity Bank I led the design and engineering team redesigning retail and corporate banking, and came to treat trust as a practical requirement: people need to know where their money is, what will happen when they confirm, and how to recover when something goes wrong.</p>
    <p>At Accenture Song my work often starts while the brief is still ambiguous — machine-learning operations, healthcare, public services, energy and financial products. One lesson keeps returning: <strong>a polished interface cannot rescue a poorly understood problem.</strong></p>
  </div></section>

  <section class="chapter"><header><p class="eyebrow">Computer Science + design</p><h2>Design decisions should survive implementation.</h2></header><div class="body">
    <p>My Computer Science background changes the questions I ask while designing. What data does this interface depend on? Where does state change? What happens when an action fails? Who needs to verify an automated decision?</p>
    <p>It does not replace user research. It helps me connect the problems people describe to the workflows, systems and engineering constraints behind them — and to prototype in code when a static mock-up cannot answer the question.</p>
    <p><a class="arrow-link" href="/lab/">See the Lab ${ARROW}</a></p>
  </div></section>

  <section class="chapter"><header><p class="eyebrow">What shapes my practice</p><h2>Three commitments.</h2></header><div class="body">
    <p><strong>Research before assumptions.</strong> Interviews, synthesis, systems mapping and testing make hidden needs and trade-offs visible.</p>
    <p><strong>Technology with intention.</strong> AI, spatial interfaces and prototyping matter when they solve a real problem and support human agency — not as ends in themselves.</p>
    <p><strong>Honesty about evidence.</strong> I would rather show an imperfect experiment and explain exactly what it does than make a demo sound more capable than it is. It is why every outcome on this site is labelled.</p>
  </div></section>

  <section class="chapter"><header><p class="eyebrow">Mentorship and community</p><h2>What I know matters more when I share it.</h2></header><div class="body">
    <p><strong>ADPList — Top 1% Global UX Mentor.</strong> 200+ mentees, 4.7/5 rating, as recorded in my 2026 CV. I mentor through portfolio reviews, career questions and the messy middle of design work, helping people build their own judgement rather than follow a template.</p>
    <p><strong>Foróige — volunteer student mentor</strong>, January to April 2025: supporting young people to build confidence and a sense of possibility, well before anyone has a professional title.</p>
    <p><a class="arrow-link" href="/impact/">Research and community work ${ARROW}</a></p>
  </div></section>

  <section class="chapter"><header><p class="eyebrow">Study</p><h2>Breadth that informs the work.</h2></header><div class="body">
    <p>Computer Science; postgraduate study in Design Thinking for Sustainability at University College Dublin, including the Soiléir impact-rating research; and Economics and Public Policy at the University of Limerick. Alongside: UX research, cognitive psychology and cloud technology education.</p>
    <p>I also write — about systems thinking, design, faith and intelligent technology — and published <em>Designing Life’s Tapestry</em> in 2024.</p>
    <p><a class="arrow-link" href="/writing/">Writing ${ARROW}</a></p>
  </div></section>
</div>`
  });

  // ---------------- Lab ----------------
  add('/lab/', {
    title: 'Design engineering lab',
    description: 'Design engineering experiments by Melvin Jayson Ogbalu: an icon grammar for AI processes, a Three.js motion study and product architecture work.',
    body: `
<section class="hero wrap">
  <p class="eyebrow">Lab · Design engineering</p>
  <h1>Thinking in systems. <span class="serif">Building</span> to learn.</h1>
  <p class="lead">I like understanding what sits behind an interface: the data, the rules, the transitions between states, and the choices a system asks someone to make. These experiments are where I test those questions in code. Each one says what it does and does not prove.</p>
</section>

<section class="section" aria-labelledby="icons-title">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">01 · Interactive</p><h2 id="icons-title">An icon grammar for <span class="serif">invisible</span> processes.</h2></div>
    <p>Icon libraries depict objects. Intelligent products also need to communicate things people cannot see — inference, confidence, delay, handoff and verification. Change the symbol and its tokens to see how a visual language might begin.</p></div>
    <div class="icon-lab" data-icon-lab>
      <div class="stage" data-stage aria-live="polite"></div>
      <div class="controls">
        <div><p class="eyebrow eyebrow--plain" style="margin-bottom:8px">Concept</p><div class="seg" role="group" aria-label="Choose a concept">
          ${['inference', 'confidence', 'latency', 'handoff', 'verification'].map((k, i) => `<button type="button" data-symbol="${k}" aria-pressed="${i === 0}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}
        </div></div>
        <div><h3 data-name style="font-size:1.6rem">Inference</h3><p class="muted mt-4" data-note></p></div>
        <div class="field"><label for="icon-size">Size token <span class="mono muted" data-size-out></span></label><input id="icon-size" type="range" min="16" max="160" value="96" data-size></div>
        <div class="field"><label for="icon-stroke">Stroke token <span class="mono muted" data-stroke-out></span></label><input id="icon-stroke" type="range" min="1" max="8" step=".5" value="4" data-stroke></div>
        <div><button class="btn btn--ghost" type="button" data-copy>Copy SVG markup</button></div>
      </div>
    </div>
    <details class="disclosure mt-6"><summary>Where do engineering decisions appear?</summary><div><p>Each concept is a single 24-unit SVG geometry, separated from presentation tokens. Stroke is compensated for size so optical weight stays consistent. Size and stroke are controls rather than separate drawings, which makes the system repeatable and easy to extend.</p></div></details>
    <details class="disclosure"><summary>What remains unproven?</summary><div><p>Recognition at 16–24 px, cultural interpretation, semantic clarity across contexts, and whether any symbol can honestly represent model behaviour. These are research questions, not assumed successes; each metaphor would need testing before use in a consequential interface.</p></div></details>
  </div>
</section>

<section class="section" aria-labelledby="dex-title">
  <div class="wrap grid">
    <div class="span-6"><p class="eyebrow">02 · Three.js</p><h2 id="dex-title">Making movement <span class="serif">inspectable.</span></h2></div>
    <div class="span-5 start-8">
      <p class="lead">A procedural motion study: change tasks, scrub through time, jump to operations and inspect what a replay shows. The interest is how interfaces make complex movement legible — which object is active, what state an operation is in.</p>
      <p class="muted mt-5">It is an educational procedural replay with simplified geometry and illustrative numbers — not a physics simulation or real robot telemetry. Its interaction model was informed by an external reference (K3 Embody / Wuji Dexterity Lab), whose design remains with its creators.</p>
      <div class="btn-row mt-6"><a class="btn" href="/lab/dexterity-lab/">Open the prototype ${ARROW}</a><a class="btn btn--ghost" href="/lab/dexterity-lab/case-study/">Read the write-up</a></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="arch-title">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">03 · Product architecture</p><h2 id="arch-title">From a diagram to a working product.</h2></div><p>In my own products I work on the structure beneath the interface: data, permissions, workflow state and the questions a product must answer before it deserves to scale.</p></div>
    <div class="tiles">
      <a class="tile" href="/work/x-hunt/"><p class="eyebrow eyebrow--plain">X-hunt · Live pilot</p><h3>Who gets to participate?</h3><p>Consent architecture, double opt-in introductions and an assistant with hard limits, in a production web app.</p><span class="foot">${ev('observed')}${ARROW}</span></a>
      <a class="tile" href="/ventures/"><p class="eyebrow eyebrow--plain">Aura · In development</p><h3>What can a person trust?</h3><p>Research, conversations, decision records and next actions in one workspace. Conversation-first navigation and draft review are documented; advanced capabilities remain plans.</p><span class="foot">${ev('concept')}${ARROW}</span></a>
      <a class="tile" href="https://reveta.org" rel="noopener"><p class="eyebrow eyebrow--plain">DataFoundry · Documentation-first</p><h3>Where did this insight come from?</h3><p>Architecture exploring lineage, licensing and governance for shared intelligence. A design direction, not a launched marketplace.</p><span class="foot">${ev('concept')}${EXT}</span></a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="site-title">
  <div class="wrap grid">
    <div class="span-6"><p class="eyebrow">04 · This site</p><h2 id="site-title">The portfolio is a product too.</h2></div>
    <div class="span-5 start-8"><p class="lead">Built as a zero-dependency static site: content in one data file, a token-based design system, self-hosted variable fonts, theme-aware SVG diagrams, and no trackers. It works fully without JavaScript and respects reduced-motion preferences.</p><p class="mt-5"><a class="arrow-link" href="${SITE.github}/Melvin-s-Portfolio" rel="noopener">Source on GitHub ${EXT}</a></p></div>
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
  <ul class="compact">${VENTURES.map((v) => `<li>${v.href ? `<a href="${esc(v.href)}"${v.href.startsWith('http') ? ' rel="noopener"' : ''}>` : '<div style="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1.2fr) minmax(120px,.6fr) 24px;gap:24px;padding:24px 0">'}<span class="t">${esc(v.name)}<span class="small" style="display:block;font-weight:400">${esc(v.kind)}</span></span><span class="d">${esc(v.body)}</span><span class="s mono">${esc(v.status)}</span>${v.href ? (v.href.startsWith('http') ? EXT : ARROW) + '</a>' : '<span></span></div>'}</li>`).join('')}</ul>
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

  return out;
}
