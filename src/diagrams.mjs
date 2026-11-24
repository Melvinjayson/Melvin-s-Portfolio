// Explanatory diagrams, drawn for this portfolio. They explain the design
// reasoning in each case study; none of them is a client deliverable or a
// screenshot of a shipped system, and every use is labelled as such.
// Colours come from CSS classes in site.css so diagrams follow the theme.

const arrow = (x1, y1, x2, y2, cls = 'stroke') =>
  `<path class="${cls}" d="M${x1} ${y1}L${x2} ${y2}" stroke-width="1.4"/>` +
  `<path class="${cls}" d="M${x2 - 7} ${y2 - 5}L${x2} ${y2}L${x2 - 7} ${y2 + 5}" stroke-width="1.4" ${x2 < x1 ? `transform="rotate(180 ${x2} ${y2})"` : ''}/>`;

const box = (x, y, w, h, title, sub, strong = false) =>
  `<rect class="${strong ? 'box-strong' : 'box'}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" stroke-width="1"/>` +
  `<text class="ink" x="${x + 14}" y="${y + 26}" font-weight="560">${title}</text>` +
  (sub ? `<text class="ink3" x="${x + 14}" y="${y + 46}">${sub}</text>` : '');

const label = (x, y, t, cls = 'ink3') => `<text class="lbl ${cls}" x="${x}" y="${y}">${t}</text>`;

const svg = (id, title, desc, body) =>
  `<svg class="dg" viewBox="0 0 800 500" role="img" aria-labelledby="${id}-t ${id}-d" xmlns="http://www.w3.org/2000/svg">` +
  `<title id="${id}-t">${title}</title><desc id="${id}-d">${desc}</desc>${body}</svg>`;

export const diagrams = {
  'fidelity-bank': svg('dg-fid', 'Two-sided service model for digital banking',
    'Customer journey steps — explore, transact, confirm, recover — sit above the line of interaction. Below it, the contact centre, internal tools and delivery teams that each step depends on. The design remit covered both layers.',
    label(40, 52, 'Customer layer') +
    [['Explore', 'products, balances'], ['Transact', 'pay, transfer'], ['Confirm', 'what will happen'], ['Recover', 'when it fails']]
      .map(([t, s], i) => box(40 + i * 186, 70, 164, 66, t, s, i === 2)).join('') +
    [0, 1, 2].map((i) => arrow(204 + i * 186, 103, 226 + i * 186, 103, 'stroke2')).join('') +
    `<line class="stroke" x1="40" y1="200" x2="760" y2="200" stroke-dasharray="4 5" stroke-width="1"/>` +
    label(40, 190, 'Line of interaction') + label(560, 190, 'Design remit spans both') +
    `<rect class="acc" x="728" y="181" width="12" height="12" rx="2"/>` +
    label(40, 252, 'Organisation layer') +
    [['Contact centre', 'feedback, disputes'], ['Internal tools', 'case & ops views'], ['Delivery teams', 'engineering, product'], ['Leadership', 'priorities, trade-offs']]
      .map(([t, s], i) => box(40 + i * 186, 270, 164, 66, t, s)).join('') +
    [0, 1, 2, 3].map((i) => `<path class="stroke2" d="M${122 + i * 186} 136 V270" stroke-width="1.2" stroke-dasharray="2 4"/>`).join('') +
    `<rect class="surface" x="40" y="372" width="720" height="98" rx="6"/>` +
    `<text class="ttl ink" x="60" y="404">Principle</text>` +
    `<text class="ink2" x="60" y="430">People need to know where their money is, what happens when they confirm,</text>` +
    `<text class="ink2" x="60" y="450">and how to recover — and the organisation needs tools that make that possible.</text>`),

  'x-hunt': svg('dg-xh', 'X-hunt consent architecture',
    'Three steps a member controls: say it in a sentence, choose who sees what (everything starts as only me), and meet only when both people say yes. Beneath, the assistant lane: it drafts and labels, and never introduces, ranks or decides.',
    label(40, 52, 'Member controls every step') +
    box(40, 70, 220, 112, '01  Say it in a sentence', 'Draft profile you check', true) +
    `<text class="ink3" x="54" y="160">No CV. Every field editable.</text>` +
    box(290, 70, 220, 112, '02  Choose who sees what', 'Default: Only me', true) +
    `<rect class="acc" x="304" y="146" width="86" height="22" rx="11"/><text class="on-acc" x="314" y="161" font-size="12" font-weight="560">Only me</text>` +
    `<rect class="box" x="398" y="146" width="98" height="22" rx="11"/><text class="ink3" x="408" y="161" font-size="12">Communities</text>` +
    box(540, 70, 220, 112, '03  Meet when both say yes', 'No is silent', true) +
    `<circle class="box-strong" cx="580" cy="156" r="12"/><circle class="box-strong" cx="604" cy="156" r="12"/><text class="ink3" x="626" y="161">Two yeses</text>` +
    arrow(262, 126, 286, 126) + arrow(512, 126, 536, 126) +
    `<line class="stroke2" x1="40" y1="232" x2="760" y2="232" stroke-width="1"/>` +
    label(40, 268, 'Assistant lane — bounded by design') +
    box(40, 286, 345, 120, 'It drafts', '') +
    `<text class="ink2" x="54" y="338">· Turns a sentence into a draft profile</text><text class="ink2" x="54" y="360">· Reads a search into visible filters</text><text class="ink2" x="54" y="382">· Output labelled, editable, pausable</text>` +
    box(415, 286, 345, 120, 'It never', '') +
    `<text class="ink2" x="429" y="338">· Introduces people</text><text class="ink2" x="429" y="360">· Ranks, scores or describes people</text><text class="ink2" x="429" y="382">· Posts, sends or decides for you</text>` +
    `<text class="ink3" x="40" y="452">Every sharing choice is written to an append-only record the member can read.</text>`),

  'viiv-healthcare': svg('dg-viiv', 'Human-in-the-loop knowledge translation',
    'New research passes an expert interpretation gate before AI-assisted translation produces drafts in several formats. A second expert sign-off gate precedes release to frontline workers. Automation sits between the two human gates, never in place of them.',
    label(40, 52, 'Proposed workflow — automation bounded by expert authority') +
    box(40, 90, 140, 78, 'New research', 'papers, findings') +
    `<rect class="acc" x="210" y="90" width="150" height="78" rx="6"/><text class="on-acc" x="224" y="116" font-weight="560">Expert review</text><text class="on-acc" x="224" y="136" font-size="12">Human gate 1</text><text class="on-acc" x="224" y="154" font-size="12">interpret, approve</text>` +
    box(390, 90, 170, 78, 'AI-assisted drafts', 'translate, restructure', true) +
    `<rect class="acc" x="590" y="90" width="170" height="78" rx="6"/><text class="on-acc" x="604" y="116" font-weight="560">Expert sign-off</text><text class="on-acc" x="604" y="136" font-size="12">Human gate 2</text><text class="on-acc" x="604" y="154" font-size="12">meaning preserved?</text>` +
    arrow(180, 129, 206, 129) + arrow(360, 129, 386, 129) + arrow(560, 129, 586, 129) +
    `<path class="stroke2" d="M675 168 V214 H475 V172" stroke-width="1.2" stroke-dasharray="3 4"/>` + label(488, 206, 'Revise') +
    label(40, 270, 'Formats for frontline use') +
    [['Playbooks', 'structured, reusable'], ['Languages', 'local translation'], ['Talking avatars', 'spoken explainers'], ['Briefs', 'short updates']]
      .map(([t, s], i) => box(40 + i * 186, 290, 164, 66, t, s)).join('') +
    `<path class="stroke2" d="M675 168 V250 H122 V290 M308 250 V290 M494 250 V290 M680 250 V290" stroke-width="1"/>` +
    `<text class="ink3" x="40" y="414">Design question: how can reviewed knowledge reach people in a form they can use,</text>` +
    `<text class="ink3" x="40" y="434">without automated output being mistaken for expert judgement?</text>`),

  'youtube-ml': svg('dg-yt', 'From a dashboard request to an operational layer',
    'Left: the original brief, an analytics dashboard viewed in isolation. Right: the reframed direction, a shared operational layer connecting models, releases, updates, documentation and the teams who own them.',
    label(40, 52, 'The brief') +
    `<rect class="box" x="40" y="74" width="280" height="190" rx="6"/>` +
    `<rect class="surface" x="60" y="98" width="110" height="10" rx="2"/>` +
    [0, 1, 2, 3, 4, 5].map((i) => `<rect class="ink3" opacity=".35" x="${66 + i * 40}" y="${230 - [60, 90, 40, 110, 75, 95][i]}" width="22" height="${[60, 90, 40, 110, 75, 95][i]}" rx="2"/>`).join('') +
    `<text class="ink3" x="40" y="292">Display the analytics more clearly.</text>` +
    arrow(338, 170, 400, 170) +
    label(420, 52, 'What the evidence pointed to', 'ink') +
    `<circle class="acc" cx="590" cy="170" r="50"/><text class="on-acc" x="590" y="166" text-anchor="middle" font-weight="560">Shared</text><text class="on-acc" x="590" y="184" text-anchor="middle" font-weight="560">picture</text>` +
    [['Models', 470, 92], ['Releases', 700, 92], ['Updates', 470, 250], ['Docs', 712, 250], ['Teams', 590, 312]]
      .map(([t, x, y]) => `<rect class="box-strong" x="${x - 46}" y="${y - 18}" width="92" height="34" rx="17"/><text class="ink" x="${x}" y="${y + 4}" text-anchor="middle" font-size="12.5">${t}</text>`).join('') +
    [[516, 104, 552, 136], [654, 104, 628, 136], [516, 238, 552, 204], [666, 238, 628, 204], [590, 294, 590, 220]]
      .map(([a, b, c, d]) => `<path class="stroke" d="M${a} ${b}L${c} ${d}" stroke-width="1.2"/>`).join('') +
    `<text class="ink3" x="420" y="372">Which model am I working with? What changed?</text>` +
    `<text class="ink3" x="420" y="392">How is it performing? Where is the knowledge?</text>` +
    `<rect class="surface" x="40" y="420" width="720" height="50" rx="6"/>` +
    `<text class="ink2" x="60" y="450">Reframe: the problem was not how data was displayed, but how teams coordinated around it.</text>`)
};
