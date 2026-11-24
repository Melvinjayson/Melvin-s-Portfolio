// Single source of truth for site content.
// Content-integrity rule: every claim here must trace to an existing source
// (previous site copy, CV statements, or the live product). Do not add
// metrics, team sizes, dates or artefacts that are not documented.
// Evidence levels: reported | observed | concept | none  (see EVIDENCE below)

export const SITE = {
  url: (process.env.SITE_URL || 'https://melvins-portfolio.vercel.app').replace(/\/$/, ''),
  name: 'Melvin Jayson Ogbalu',
  short: 'Melvin Jayson',
  role: 'Product designer',
  title: 'UX Design & Strategy Consultant', // formal employment title — keep accurate
  employer: 'Accenture Song',
  location: 'Dublin, Ireland',
  email: 'melvinogbalu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chinedu-melvin-ogbalu/',
  github: 'https://github.com/Melvinjayson',
  medium: 'https://medium.com/@Melvinogbalu',
  portrait: 'https://tndtujv5jqhbb3yc.public.blob.vercel-storage.com/melvin%27s%20headshot',
  description: 'Melvin Jayson Ogbalu is a Dublin-based product designer at Accenture Song, designing complex, AI-enabled systems across banking, healthcare, public services and machine-learning operations.'
};

export const NAV = [
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/lab/', label: 'Lab' },
  { href: '/writing/', label: 'Writing' },
  { href: '/resume/', label: 'Résumé' }
];

export const EVIDENCE = {
  observed: { label: 'Observable', desc: 'Visible in a live, public product today.' },
  reported: { label: 'Self-reported', desc: 'Reported from the project; baseline or attribution not published.' },
  codebase: { label: 'In the repository', desc: 'Recorded in the product’s private source repository — test results, decision records or research files. Available to walk through on request.' },
  concept: { label: 'Concept stage', desc: 'Proposed or explored direction; not deployed.' },
  none: { label: 'Not measured', desc: 'No outcome data available to publish.' }
};

// ---------------------------------------------------------------------------
// Flagship case studies
// ---------------------------------------------------------------------------
export const FLAGSHIPS = [
  {
    slug: 'x-hunt',
    tone: ['#dcefe2', '#0b1d14'],
    art: 'product',
    insight: 'People did not want to be chased, and they did not want their details passed around.',
    validation: [
      'I direct the build with AI coding agents; most commits in the repository are co-authored with them. The guard-rails are written down as decision records — authentication, tenant isolation, one AI gateway with rules first, design tokens and motion.',
      'On 23 October 2026 the end-to-end acceptance suite passed 33 of 33 checks against a production build, on three consecutive runs, with the AI provider switched off. Catch-up summaries, wording suggestions and plain-language search all have rule-based paths.',
      'Hard-coded colour values were replaced with a token system whose contrast rules are recorded as a decision.'
    ],
    status: 'Live pilot · 2026 · Co-founder',
    thumb: { src: '/img/x-hunt/brief', w: 1152, h: 662, alt: '' },
    gallery: [
      { src: '/img/x-hunt/step1', w: 672, h: 362, alt: 'A card headed “You write” with the sentence “UX research in Dublin; I’d like to mentor education projects.” Below it, four tags read from the sentence: UX research, Mentoring, Education, Dublin.', caption: 'The individual entry point. One sentence, read into tags the person can see and remove — not a CV or a membership form.' },
      { src: '/img/x-hunt/find', w: 1152, h: 690, alt: 'A discovery screen. The search “someone who knows data analysis for climate work” is read as two removable filters, Data analysis and Climate and environment. Two opportunities follow, each labelled with who can see it: community only, or open to other communities.', caption: 'Plain-language search. The interpretation is shown as removable filters, and every result says who it is visible to.' },
      { src: '/img/x-hunt/brief', w: 1152, h: 662, alt: 'A shared brief being edited by two people. Beside it, two assistant cards marked Draft: a wording suggestion with Accept and Dismiss buttons, and a catch-up summary that cites its source.', caption: 'The assistant’s boundary, made visible. Suggestions are labelled drafts with Accept and Dismiss; summaries cite their source.' },
      { src: '/img/x-hunt/moderator-tools', w: 1152, h: 502, alt: 'A moderator view listing three members with their skills and causes, under the line “Shared with moderators · each view is recorded in the audit log”.', caption: 'Moderator tools show only what members chose to share with moderators, and say that each view is logged.' },
      { src: '/img/x-hunt/ledger', w: 984, h: 402, alt: 'A list headed “Your choices, recorded”, marked append-only, with four dated entries such as “Sharing setting · skills → my communities” and “Invitation · no”.', caption: 'An append-only record of a person’s own sharing choices — the trust model as something they can inspect.' }
    ],
    galleryNote: 'Illustrations from xhunt.app’s public landing page, rendered from the product’s own interface components and theme tokens. People, communities and content are fictional. Shown in the current theme.',
    org: 'X-hunt',
    title: 'Designing an AI-assisted network where people stay in control',
    card: 'Co-founded and lead product on a live, privacy-first platform connecting people who want to help with communities that need them. The assistant drafts; people decide.',
    domain: 'Zero-to-one · Human–AI trust',
    capability: 'Product building',
    summary: [
      ['Role', 'Co-founder & product lead — research, product definition, design and build'],
      ['Engagement', 'Independent venture'],
      ['Status', 'Live pilot with a small number of communities'],
      ['Stack', 'Next.js, TypeScript, Supabase']
    ],
    maturity: 'observed',
    link: { href: 'https://www.xhunt.app/', label: 'Visit xhunt.app' },
    tldr: [
      ['Problem', 'People with useful skills rarely get asked to help; community organisations struggle to make needs visible and to coordinate contributors without exposing anyone.'],
      ['What I did', 'Defined the product from research, designed the consent architecture and the assistant’s boundaries, and lead the build of a production web app.'],
      ['Outcome', 'Live and in pilot. Privacy-by-default, double opt-in introductions and a bounded assistant are all observable in the product today. Adoption metrics are not yet published.']
    ],
    lede: 'X-hunt began with a practical observation: plenty of people would happily give a few hours to the right thing, but they are rarely asked — and asking or being asked can feel risky. The product is built around the reasons good people hold back.',
    chapters: [
      ['The problem', 'Willingness to contribute is not the bottleneck. Trust is.', [
        'My research — stakeholder conversations, surveys, empathy mapping and iterative concept testing — looked at both sides: individuals who want to contribute, and community organisations trying to coordinate them. Participation depended on more than matching skills. <strong>Trust, motivation, time, accessibility, belonging and recognition</strong> decided whether someone took part and came back.',
        'Two things recurred: people did not want to be chased, and they did not want their details passed around.'
      ]],
      ['The direction', 'Contribution, not community, is the way in.', [
        'A person with no affiliation should be able to start from what they want to contribute to. The product therefore has two entry points — individual-led and community-led — and the individual path starts with a single sentence rather than a CV or a membership.',
        'From there, every design choice protects agency: nothing is shared until the person chooses, introductions need two yeses, and the AI assistant has hard limits on what it may do.'
      ]],
      ['Making it real', 'The boundaries people feel are the ones that ship.', [
        'Research is written to be argued with. The landing-page study states its hypotheses, weighs each source and names the counterevidence — incumbents exist, and stated willingness is not behaviour. It ends with a rule: the page may not promise anything the product does not do.',
        'Because I design and build the interface, the limits I draw on paper survive into production. A suggestion is always a labelled draft with Accept and Dismiss. A search shows how it read your words, and lets you remove that reading. A moderator view says that every look is recorded.',
        'The pilot is deliberately small. The next question is behavioural: do people finish the first sentence, open sharing to their communities, and say yes to a first opportunity?'
      ]]
    ],
    ownership: {
      owned: ['Product definition and requirements', 'Consent architecture and privacy model', 'Assistant behaviour and limits', 'Interface design, design tokens and motion', 'Direction of the build, decision records and acceptance criteria'],
      influenced: ['Pilot design with partner communities', 'Technical architecture decisions', 'AI use policy'],
      team: ['Co-founder partnership', 'Pilot communities and stewards', 'AI coding agents, working to the repository’s rules']
    },
    decisions: [
      {
        title: 'Private by default, shared field by field',
        why: 'Fear of exposure was a reason people held back. Every part of a profile starts as “Only me”, and the person opens it up piece by piece.',
        alt: 'A public profile with privacy settings to opt out of.',
        tradeoff: 'Less data visible to communities at first; much lower risk of the first interaction feeling unsafe.'
      },
      {
        title: 'Introductions need two yeses; no is silent',
        why: 'Being asked should not feel risky. Neither person sees the other until both agree, and declining sends no signal.',
        alt: 'Direct messaging or one-sided requests.',
        tradeoff: 'Slower first connection; no pressure or social cost attached to saying no.'
      },
      {
        title: 'The assistant drafts — it never introduces, ranks or decides',
        why: 'AI is useful for turning a sentence into a draft or a search into filters. It is not appropriate for judging people. Its output is labelled and editable; it can be paused, and the product works on simple rules without a model.',
        alt: 'AI-driven matching and recommendations.',
        tradeoff: 'Gives up algorithmic matching as a growth lever, in exchange for an explicit, explainable boundary on automation.'
      },
      {
        title: 'No rankings; aggregate only with three or more people',
        why: 'Scores and leaderboards would change why people contribute. Communities see totals only when three or more people choose to share.',
        alt: 'Leaderboards and individual contribution scores.',
        tradeoff: 'Less gamification; recognition that does not expose individuals.'
      }
    ],
    outcomes: [
      ['Product status', 'Live, in a pilot with a small number of communities (xhunt.app, November 2026)', 'observed'],
      ['Trust model', 'Private-by-default profiles, double opt-in introductions and an append-only record of sharing choices are live', 'observed'],
      ['Acceptance testing', '33 of 33 end-to-end checks passed on a production build, three consecutive runs, AI provider off (23 October 2026)', 'codebase'],
      ['Architecture decisions', 'Eight accepted decision records and one proposed, including “One AI gateway, rules first”, tenant isolation and design tokens', 'codebase'],
      ['Adoption and activation', 'Not yet measured publicly; pilot instrumentation counts broad page groups only, with consent', 'none']
    ],
    reflection: 'Designing the boundaries of an AI feature is a product decision, not a disclaimer. What the assistant refuses to do is as much a part of the experience as what it does.',
    next: 'The test of the design is behavioural: whether a person who arrives with one sentence ends up contributing — and whether communities trust the product enough to bring their members.'
  },
  {
    slug: 'fidelity-bank',
    tone: ['#e1e5f1', '#0d1322'],
    art: 'blueprint',
    insight: 'Trust became a practical requirement rather than a brand value.',
    status: 'Delivered · 2021–22 · Design lead',
    org: 'Fidelity Bank',
    title: 'A better banking app needed a better bridge behind it',
    card: 'Led the design and engineering team redesigning retail and corporate digital banking — and the internal tools customers never see but always feel.',
    domain: 'Digital banking',
    capability: 'Product leadership',
    summary: [
      ['Role', 'UX Design Lead — led the design and engineering team'],
      ['Engagement', 'Direct employment, Fidelity Bank, Lagos'],
      ['When', '2021 — 2022'],
      ['Maturity', 'Redesign taken through delivery with engineering']
    ],
    maturity: 'reported',
    tldr: [
      ['Problem', 'Customers were leaving. The bank had invested in its digital channels, but customer friction traced back to fragmented internal tools and a weak contact-centre loop.'],
      ['What I did', 'Led design and engineering across customer journeys and the internal operational tools behind them, acting as the bridge between customers, delivery teams and leadership.'],
      ['Outcome', 'Reported c.40% increase in customer satisfaction and higher transaction volumes during the programme. Attribution to design alone is not claimed.']
    ],
    lede: 'Fidelity Bank was losing customers in a market where digital banking had become the default. The mobile app needed work — but the friction customers felt was being produced inside the organisation.',
    chapters: [
      ['The situation', 'The app was only part of the problem.', [
        'The bank had already invested substantially in its digital ecosystem. What that investment had not produced was a coherent experience inside the organisation: customers struggled to transact and to report problems, and the contact centre could not surface their feedback in a useful way.',
        'Employees were working across fragmented tools and processes. That made it harder to coordinate decisions and to deliver anything end to end. <strong>Improving the customer interface without understanding the operational side would have left the real constraints untouched.</strong>'
      ]],
      ['The reframe', 'Design the service, not only the screens.', [
        'Through design research and empathy mapping with both customers and staff, we treated customer journeys and internal operations as one system. The remit grew from a mobile redesign to a digital banking experience and ecosystem — including the internal tools teams used to serve customers.',
        'Trust became a practical requirement rather than a brand value: people need to know where their money is, what will happen when they confirm an action, and how to recover when something goes wrong.'
      ]]
    ],
    ownership: {
      owned: ['Design direction for retail and corporate digital banking', 'Leading the design and engineering team', 'Research approach: design research and empathy mapping'],
      influenced: ['Scope: widening from app redesign to internal tooling', 'Alignment between delivery teams and leadership', 'Design system and interaction standards'],
      team: ['Engineering delivery', 'Business stakeholders and leadership']
    },
    decisions: [
      {
        title: 'Treat internal tools as part of the customer experience',
        why: 'Customer complaints and slow resolution traced back to how staff worked, not only to the app.',
        alt: 'Redesign the customer-facing app in isolation.',
        tradeoff: 'More stakeholders and a broader scope, in exchange for addressing the source of the friction.'
      },
      {
        title: 'Make state, confirmation and recovery explicit',
        why: 'In banking, uncertainty is a trust failure. People need to see balances, understand the consequence of confirming, and recover from errors.',
        alt: 'Optimise primarily for speed and fewer steps.',
        tradeoff: 'Occasionally an extra, deliberate step — chosen where the consequence of a mistake is high.'
      },
      {
        title: 'Run design and engineering as one team',
        why: 'Decisions had to survive implementation; separating the two would have reintroduced the handoff gaps the programme was trying to close.',
        alt: 'A design team handing specifications to a separate delivery team.',
        tradeoff: 'Heavier leadership load on one role; faster, more realistic decisions.'
      }
    ],
    outcomes: [
      ['Customer satisfaction', 'Reported increase of almost 40% during the programme', 'reported'],
      ['Transaction volumes', 'Reported increase', 'reported'],
      ['Attribution', 'Not claimed as caused by design alone; market-share or ranking changes are not attributed to this work', 'none']
    ],
    reflection: 'An organisation can invest heavily in digital transformation and still leave people disconnected. The experience belongs to the whole service — not only the mobile interface.',
    next: 'If I were to start again, I would agree the measurement plan — baseline, period and attribution — with leadership on day one, so the outcome story is as strong as the delivery story.'
  },
  {
    slug: 'viiv-healthcare',
    tone: ['#f1e5db', '#1f140e'],
    art: 'flow',
    insight: 'Help with volume and format — without the output being mistaken for expert judgement.',
    status: 'Concept · Accenture Song',
    org: 'ViiV Healthcare',
    title: 'Getting expert knowledge to the frontline without losing its meaning',
    card: 'Explored an AI-assisted workflow that turns expert-reviewed HIV research into usable learning formats — with automation placed between expert gates, never instead of them.',
    domain: 'Healthcare · Human–AI interaction',
    capability: 'AI experience strategy',
    summary: [
      ['Role', 'Experience strategy and AI exploration'],
      ['Engagement', 'Client engagement, Accenture Song'],
      ['Scope', 'Research-to-frontline knowledge workflow'],
      ['Maturity', 'Proposed experience direction']
    ],
    maturity: 'concept',
    tldr: [
      ['Problem', 'Specialists manually condensed new scientific findings into presentations for frontline workers — important interpretive work, slowed by production effort.'],
      ['What I did', 'Mapped the existing manual process and designed an AI-assisted direction for translating reviewed knowledge into playbooks, languages and spoken formats.'],
      ['Outcome', 'A proposed experience direction. No deployment, adoption or turnaround improvement is claimed.']
    ],
    lede: 'Scientific findings do not arrive ready to use. In HIV care the evidence can evolve while patients are on treatment, so making an update understandable — and available at the right time — is a real experience problem.',
    chapters: [
      ['What I noticed', 'The bottleneck was not the document.', [
        'Experts were doing the interpretive work that matters, then spending time turning it into reusable communications. My interest was the whole path from research to understanding: where expertise is irreplaceable, and where production effort could be supported.',
        'The question shifted from <strong>“how do we summarise research?”</strong> to <strong>“how can reviewed knowledge be communicated in formats that work for the people receiving it?”</strong>'
      ]],
      ['The direction', 'Automation between two human gates.', [
        'The proposed workflow keeps expert interpretation as the entry gate and expert sign-off as the exit gate. AI-assisted drafting sits between them, producing structured playbooks, translations and talking-avatar explainers for review.',
        'That placement is the design: it lets the system help with volume and format without its output being mistaken for expert judgement.'
      ]]
    ],
    ownership: {
      owned: ['Analysis of the manual research-to-learning process', 'Experience direction for AI-assisted translation', 'Format strategy: playbooks, languages, avatars'],
      influenced: ['Positioning of expert review in the workflow'],
      team: ['Accenture Song engagement team']
    },
    decisions: [
      {
        title: 'Keep expert judgement as the authority',
        why: 'In clinical communication, an automated summary presented as expert guidance is a safety risk, not an efficiency gain.',
        alt: 'End-to-end automated summarisation.',
        tradeoff: 'Less automation on paper; a workflow people could responsibly adopt.'
      },
      {
        title: 'Design for formats, not a single summary',
        why: 'Frontline audiences differ in language, literacy and context. Reusable playbooks, translations and spoken explainers meet them where they are.',
        alt: 'One condensed document per update.',
        tradeoff: 'More outputs to review — which is why the review gate is part of the design.'
      }
    ],
    outcomes: [
      ['Project maturity', 'Experience concept and proposed workflow', 'concept'],
      ['Clinical or turnaround impact', 'None claimed; would require evaluation with expert reviewers and frontline users', 'none']
    ],
    reflection: 'Good automation preserves meaning. The design problem is not only speed or presentation — it is keeping context intact across the handoff from specialist to the person who must act on it.',
    next: 'The next meaningful step is evaluation with both audiences: can experts review AI-assisted drafts faster without lowering their bar, and do frontline workers understand updates sooner?'
  },
  {
    slug: 'youtube-ml',
    tone: ['#e8e3f1', '#15112a'],
    art: 'reframe',
    insight: 'An ML ecosystem that teams could build on, rather than work around.',
    status: 'Research · Accenture Song',
    org: 'YouTube',
    title: 'The brief was analytics. The problem was how teams worked.',
    card: 'Investigated a machine-learning operations platform and reframed a dashboard request into an operational layer for model, release and knowledge coordination.',
    domain: 'Enterprise AI · ML operations',
    capability: 'Problem framing',
    summary: [
      ['Role', 'UX research and experience direction'],
      ['Engagement', 'Client engagement, Accenture Song (not Google employment)'],
      ['Platform', 'Xray — content performance and ML processes'],
      ['Maturity', 'Design groundwork; not a confirmed deployment']
    ],
    maturity: 'concept',
    tldr: [
      ['Problem', 'Different teams managed models, releases, updates and documentation inconsistently. The visible request was clearer analytics.'],
      ['What I did', 'Investigated the existing experience and framed a design direction for monitoring, visibility and coordination across teams.'],
      ['Outcome', 'Groundwork for an operational layer. No production release, adoption or multi-team rollout is claimed.']
    ],
    lede: 'YouTube’s Xray platform helped teams understand content performance and machine-learning processes. The request appeared to be about how information was displayed. It took more investigation to see the experience surrounding the dashboard.',
    chapters: [
      ['What I noticed', 'A dashboard can hide an operational problem.', [
        'The difficulty was not only interpreting numbers. People needed to know which models they were working with, what had changed, how performance could be monitored and where to find related knowledge.',
        'That changed the design question from <strong>“what should Xray display?”</strong> to <strong>“how can its operational experience help people make sense of work happening across teams?”</strong>'
      ]],
      ['The direction', 'A shared picture across models, releases and teams.', [
        'I helped frame a direction for an operational layer: clearer monitoring, visibility of changes and coordination across the teams responsible for each model. The aim was an ML ecosystem that teams could build on rather than work around.',
        'We also considered whether the direction could inform related work. It remained at the groundwork stage, and I present it as that.'
      ]]
    ],
    ownership: {
      owned: ['Investigation of the existing experience', 'Reframing of the brief', 'Experience direction for the operational layer'],
      influenced: ['How the engagement scoped the problem beyond analytics'],
      team: ['Client platform teams', 'Accenture Song engagement team']
    },
    decisions: [
      {
        title: 'Reframe from display to coordination',
        why: 'The questions people asked — which model, what changed, where is the knowledge — were coordination questions a better chart could not answer.',
        alt: 'Polish the existing analytics dashboard.',
        tradeoff: 'A larger, less immediately shippable problem, in exchange for addressing what actually slowed teams down.'
      }
    ],
    outcomes: [
      ['Project maturity', 'Experience direction and operational-layer groundwork', 'concept'],
      ['Deployment or adoption', 'None claimed', 'none']
    ],
    reflection: 'The first request is not always the real design problem. Enterprise interfaces often show the visible symptom of a larger workflow challenge.',
    next: 'Whether the operational layer would have delivered that coherence needs implementation and evaluation evidence — the honest limit of a groundwork engagement.'
  }
];

// ---------------------------------------------------------------------------
// Supporting work — shorter, public-safe summaries
// ---------------------------------------------------------------------------
export const SUPPORTING = [
  {
    slug: 'mater-private', org: 'Mater Private', domain: 'Healthcare · Service design',
    title: 'Reducing friction in patient booking journeys',
    role: 'Service and booking-journey design', maturity: 'reported',
    problem: 'A patient does not experience an appointment as a conversion funnel. They are trying to find the right care, understand what comes next and feel confident they have taken the right step.',
    work: 'I approached booking as a service journey: the information people need before committing, the questions that interrupt progress, and the clarity of the next action — retaining reassurance and trust rather than optimising only for conversion.',
    outcome: ['Professional materials report a 22% bookings uplift within the engagement; the contribution of specific UX changes is not isolated.', 'reported'],
    learning: 'I learned to pay more attention to the emotional weight of seemingly ordinary forms and booking steps.'
  },
  {
    slug: 'justice-services', org: 'Department of Justice (Ireland)', domain: 'Public services · RFP',
    title: 'A self-service immigration portal people can follow',
    role: 'Service concept design for an Accenture RFP response', maturity: 'concept',
    problem: 'Immigration processes carry real consequences for the people navigating them. The brief was a self-service experience where people could understand requirements, manage appointments and see what was happening with their application.',
    work: 'As part of an Accenture RFP response, I helped design the MyImmigration self-service portal concept — appointment booking, application tracking and an AI-assisted help channel — with a focus on plain language, stepwise journeys and transparent progress.',
    outcome: ['Design contribution to an RFP response; deployment is not claimed.', 'concept'],
    learning: 'When someone is waiting for an important decision, visibility and understandable language are not decorative features.'
  },
  {
    slug: 'aicpa-cima', org: 'AICPA & CIMA', domain: 'Professional membership',
    title: 'Simplifying membership subscription and renewal',
    role: 'UX design and research on the renewal journey', maturity: 'reported',
    problem: 'People who wanted to maintain a professional membership were being asked to navigate a subscription and renewal process that was harder than it needed to be.',
    work: 'I identified pain points, simplified forms and navigation, and iterated the journey through design thinking and user research.',
    outcome: ['Professional materials report reduced drop-off and improved commercial outcomes, without public attribution of individual design changes.', 'reported'],
    learning: 'A conversion is also a relationship. Clear choices, fewer surprises and a coherent next step matter beyond the moment of payment.'
  },
  {
    slug: 'kerry-group', org: 'Kerry Group', domain: 'Enterprise operations',
    title: 'Designing for connected enterprise operations',
    role: 'Enterprise workflow and information architecture', maturity: 'reported',
    problem: 'In operational software, people juggle time, exceptions and decisions with consequences outside the screen. A dashboard has to earn its place in that environment.',
    work: 'I focused on the relationship between operational signals and action: which information needs to stand out, what can be disclosed later, and how the interface helps a person investigate a problem — task-led views, exception prioritisation and contextual drill-down.',
    outcome: ['The wider programme reported operational improvements; this page does not attribute measured gains or publish system details.', 'reported'],
    learning: 'A useful enterprise interface should make the next decision easier, not simply make more data visible.'
  },
  {
    slug: 'autonomy-proposal', org: 'Defence-related proposal', domain: 'Restricted · Proposal stage',
    title: 'Human oversight in autonomous systems',
    role: 'Proposal-stage UX architecture', maturity: 'concept',
    problem: 'As autonomy increases, the operator experience must communicate system intent, uncertainty and the boundaries of delegated action. Poorly designed oversight can make intervention harder rather than easier.',
    work: 'I explored operator-centred interaction principles for decision visibility, human intervention, authority boundaries and traceability, distinguishing machine recommendations from human authority. Only abstract principles are published here.',
    outcome: ['Confidential proposal support only. No contract award, deployed product or direct client engagement with any defence organisation is claimed.', 'concept'],
    learning: 'The handoff between human and machine is a design problem in its own right.'
  }
];

// ---------------------------------------------------------------------------
// Experience (from previous About page / CV statements)
// ---------------------------------------------------------------------------
export const EXPERIENCE = [
  {
    when: '2022 — Present', where: 'Dublin', role: 'UX Design & Strategy Consultant', org: 'Accenture Song',
    what: 'Client engagements across machine-learning operations, healthcare, public services, energy and financial products. My role often starts while the brief is still ambiguous.',
    bullets: [
      'Reframed an ML-operations analytics brief for YouTube’s Xray platform into an operational-layer direction for model, release and knowledge coordination.',
      'Designed an AI-assisted direction for translating expert-reviewed HIV research into frontline learning formats for ViiV Healthcare, keeping expert review as the authority.',
      'Designed patient booking journeys for Mater Private; professional materials report a 22% bookings uplift within the engagement.',
      'Helped design the MyImmigration self-service portal concept for an Irish Department of Justice RFP response.',
      'Simplified the membership subscription and renewal journey for AICPA & CIMA through research and iteration.'
    ]
  },
  {
    when: '2021 — 2022', where: 'Lagos', role: 'UX Design Lead', org: 'Fidelity Bank',
    what: 'Led the redesign of retail and corporate banking experiences across research, interaction design, design systems and delivery with engineering and business teams.',
    bullets: [
      'Led the design and engineering team on a digital banking experience and ecosystem, including internal operational tools.',
      'Used design research and empathy mapping with customers and staff to treat customer journeys and operations as one system.',
      'Reported an almost 40% increase in customer satisfaction and higher transaction volumes during the programme.'
    ]
  },
  {
    when: '2018 — 2021', where: 'Lagos', role: 'Senior UX & Product Designer', org: 'Rivet Software / Inlaks',
    what: 'Payment workflows for financial institutions and the SkillBeta learning platform — how products are defined, how complex operations fit together, and how design decisions survive implementation.',
    bullets: ['Designed payment workflows for financial-institution clients.', 'Designed the SkillBeta learning platform.']
  },
  {
    when: 'Earlier', where: 'Nigeria', role: 'Customer-facing financial services', org: 'GTBank and earlier roles',
    what: 'Working directly with customers showed me the gap between how organisations imagine a service works and how it feels to the person using it.',
    bullets: []
  }
];

export const INDEPENDENT = [
  { name: 'X-hunt', role: 'Co-founder & product lead', status: 'Live pilot', desc: 'Privacy-first network connecting people who want to help with communities that need them.', href: '/work/x-hunt/' },
  { name: 'Reveta', role: 'Founder', status: 'Exploration', desc: 'A venture ecosystem for trustworthy, evidence-led AI products.', href: 'https://reveta.org' },
  { name: 'Aura', role: 'Product direction', status: 'In development', desc: 'An evidence-led workspace where research, conversations and decisions live together.', href: '/ventures/' }
];

export const WRITING = [
  { kind: 'Systems thinking', title: 'CORE Thinking: Master Systems Thinking for Clarity & Problem Solving', desc: 'A four-lens approach to complexity — Components, Operations, Relationships and Essence.', href: 'https://medium.com/@Melvinogbalu/systems-synthesis-core-approaches-to-multi-dimensional-problem-spaces-22543917ee79' },
  { kind: 'Design psychology', title: 'Understanding human psychology: the missing piece in problem-solving for UX design', desc: 'Published in Design Bootcamp.', href: 'https://medium.com/design-bootcamp/understanding-human-psychology-the-missing-piece-in-problem-solving-for-ux-design-ee54c177a5dd' },
  { kind: 'Sustainability', title: 'Designing Change: A Human-Centered Path to a Sustainable Future', desc: 'Human-centred design as a route to sustainable systems change.', href: 'https://medium.com/@Melvinogbalu/designing-change-a-human-centered-path-to-a-sustainable-future-be4a1a6e6d2e' },
  { kind: 'Civic technology', title: 'A Brave New World: Why the Future Belongs to Many Centers, Not Just One', desc: 'Polycentric governance, local agency and participatory futures.', href: 'https://medium.com/@Melvinogbalu/a-brave-new-world-why-the-future-belongs-to-many-centers-not-just-one-c96e32919352' },
  { kind: 'Personal essay', title: 'The Furnace of Becoming', desc: 'Personal transformation, identity and the experiences that reshape us.', href: 'https://medium.com/@Melvinogbalu/the-furnace-of-becoming-exploring-the-hidden-between-tribulations-and-triumph-d96d576115be' },
  { kind: 'Personal essay', title: 'Why I Had to Survive', desc: 'Endurance, purpose and finding meaning through difficult experiences.', href: 'https://medium.com/@Melvinogbalu/why-i-had-to-survive-aa29ff1ef95d' },
  { kind: 'Faith and society', title: 'Between Despair and Hope', desc: 'Resilience, faith and practical ways to remain engaged in difficult times.', href: 'https://medium.com/@chineduogbalu/between-despair-and-hope-choosing-resilience-in-an-age-of-crisis-d877f1c1808a' }
];

export const VENTURES = [
  { name: 'Reveta', kind: 'Venture ecosystem', status: 'Exploration', body: 'The challenge is turning ambitious technology ideas into focused, usable products. My role spans strategy, UX direction and implementation planning. The learning so far: validate each proposition before expanding the platform.', href: 'https://reveta.org' },
  { name: 'X-hunt', kind: 'Community contribution network', status: 'Live pilot', body: 'People struggle to find meaningful ways to contribute; organisations struggle to mobilise skills. I co-founded it and lead research, product and design.', href: '/work/x-hunt/' },
  { name: 'Aura', kind: 'Evidence-led workspace', status: 'In development', body: 'AI interfaces become cluttered when tools, conversations and outputs compete for attention. Aura explores keeping research, decision records and next actions in one coherent space. Some advanced capabilities remain plans, not connected functionality.' },
  { name: 'Landmark AI', kind: 'Property trust and verification', status: 'Exploration', body: 'Fragmented evidence makes property decisions hard to trust. The design opportunity is distinguishing verified evidence from unverified claims. I have contributed concept and experience architecture.' },
  { name: 'Navigator X', kind: 'Evidence-led product workflow', status: 'Concept', body: 'Teams create polished artefacts without preserving the reasoning behind them. This explores research-connected workflows for more traceable decisions.' },
  { name: 'OASIX', kind: 'Immersive XR storytelling', status: 'Concept', body: 'Environments as part of a narrative rather than passive backdrops. The key tension is immersion versus clarity and accessibility.' }
];
