# DESIGN.md — Melvin Jayson portfolio

The working reference for how this site looks, moves and behaves. Tokens live in `src/static/css/site.css`; colour, type and layout rationale are in `docs/design-system.md`. This file is canonical for **motion, interaction and the image system**. Last updated 24 November 2026.

## 1. What the design has to do

The site is read by recruiters and hiring managers in a few minutes, mostly on laptops, often on phones. It has to show three things quickly: what Melvin owned, what shipped, and how outcomes are known. The visual language is editorial: rules, whitespace and type do the structuring. It should feel exceptional because of its precision, not because of how much it moves.

Rules that follow from that:

1. **Real product before diagrams.** Where a real interface exists (X-hunt, Aura), it leads. Explanatory diagrams come second and are always labelled as drawn for the portfolio.
2. **Facts on cards, evidence in cases.** Cards carry a factual status line (`Live pilot · 2026 · Co-founder`). Evidence badges appear next to the outcomes they qualify, not as a row of hedges on the homepage.
3. **One accent, used as a mark.** `--accent` (#C7EC8B) is a fill. It marks the live project, the current page and human gates in diagrams. It is never used as text on light backgrounds.
4. **Everything works without JavaScript and without motion.**

## 2. Motion principles

Motion communicates **hierarchy** (what came first), **continuity** (where you came from), **responsiveness** (the interface heard you) and **craft** (it was considered). If an animation does none of these, it is removed.

| Question | Rule |
|---|---|
| Should it animate at all? | Only if it is seen rarely or explains a change of state. Things used many times a session (nav links, filters, sliders) do not animate. Keyboard-triggered actions never animate. |
| What may move? | `transform` and `opacity` only (plus `filter` for one 180ms crossfade). Never `transition: all`; never layout properties. |
| How fast? | UI motion stays under 300ms. Exits are faster than entrances. The one exception is the hero entrance (520ms), which runs once per session. |
| Which curve? | Ease-out for things entering or leaving. Ease-in-out for things moving on screen. Plain `ease` for colour and border changes. **Never ease-in**: it makes the interface feel slow to respond. |
| Where does it start? | From a nearby state, never from nothing. Nothing scales from 0; the smallest start scale is 0.97. |
| What about scroll? | No scroll-triggered reveals, no parallax, no scroll-linked decoration. Content is visible when it arrives. |
| Touch | Hover effects that move things are gated behind `(hover:hover) and (pointer:fine)`, so touch devices never get stuck hover states. |

### What was removed in this pass, and why

- **Scroll reveals** (`.reveal` fade-up on every section). They delayed reading on every scroll and repeated the same gesture 20+ times per page. Removed with their IntersectionObserver.
- **Diagram line-drawing.** Decorative, and it also overrode the intentionally dashed connectors in the X-hunt diagram. Removed.
- **Button hover lift** (`translateY(-1px)`). Replaced by press feedback, which tells the person something.

## 3. Tokens

```css
/* Curves */
--ease-out:    cubic-bezier(.23, 1, .32, 1);   /* enter, exit, press */
--ease-in-out: cubic-bezier(.77, 0, .175, 1);  /* movement on screen: menu icon, disclosure marker, title morph */
--ease-drawer: cubic-bezier(.32, .72, 0, 1);   /* sheets and drawers (reserved) */
--ease:        var(--ease-out);                /* legacy alias */

/* Springs, as CSS linear() approximations */
--spring:        linear(0, .094, .274, … , 1);  /* critically damped, bounce 0 — default */
--spring-bouncy: linear(0, .069, .216, … , 1);  /* bounce .15 — only for drag release */

/* Durations */
--dur-press: 160ms;  /* :active scale */
--dur-hover: 150ms;  /* colour, border, underline */
--dur-micro: 180ms;  /* icon swap, arrow nudge, icon-lab crossfade */
--dur-ui:    220ms;  /* menu, disclosure, theme crossfade (enter) */
--dur-exit:  150ms;  /* every exit */
--dur-page:  240ms;  /* cross-document page transition */
--dur-intro: 520ms;  /* hero entrance, once per session */
--stagger:   55ms;   /* between hero elements; menu items use 30→15ms decreasing steps */
```

The spring curves were generated from the closed-form spring response (critically damped: `x(t) = 1 − (1 + ωt)e^(−ωt)`, ω = 9.23 so it settles within the duration). Use them with `--dur-ui` or longer. In JavaScript (the Dexterity Lab orbit), physics runs per frame instead.

## 4. Interaction patterns

| Pattern | Behaviour | Implementation |
|---|---|---|
| **Press** | Buttons scale to 0.97 (icon buttons 0.94) on `:active`, 160ms ease-out. No hover lift. | `.btn:active`, `.theme-toggle:active`, `.menu-toggle:active` |
| **Arrow nudge** | Arrow icons move 3px right on hover, pointer devices only. | `@media (hover:hover) and (pointer:fine)` |
| **Project row** | The thumbnail scales to 1.015 on hover (320ms ease-out) and 0.99 on press. The title gains an accent underline. | `.project .figure-frame > *` |
| **Mobile menu** | Enters in 220ms: opacity, plus `translateY(-6px → 0)`. Links follow with a decreasing stagger (0, 30, 60, 85, 105, 120ms). Exits in 150ms with no stagger. Esc closes and returns focus. Hamburger lines rotate with ease-in-out. | `@starting-style` + `transition-behavior: allow-discrete` on `display` |
| **Disclosure** | Height animates from 0 to auto (220ms open, 150ms close) with a fade. | `interpolate-size: allow-keywords` + `::details-content`; browsers without support open instantly |
| **Theme switch** | A 220ms crossfade of the whole page, not a cascade of individual colour transitions. Per-element colour transitions are suppressed for that frame so the page changes as one surface. `theme-color` meta updates to match. | `document.startViewTransition()` with the `theme-vt` class; instant under reduced motion |
| **Page transition** | Same-origin navigations crossfade: old page out in 150ms, new page in over 240ms. The header stays fixed rather than fading. | `@view-transition { navigation: auto }` |
| **Title morph** | A project title on the homepage or Work index morphs into the case-study heading. | Matching `view-transition-name: case-<slug>` on the row `h3` and case `h1`; each name is used once per page |
| **Hero entrance** | The headline settles 8px with no fade, so it paints on the first frame and LCP is not delayed. Eyebrow, lead, buttons and index card rise 10px and fade in behind it, staggered by ~55ms. Runs **once per browser session**, homepage only. | Head script adds `.intro` if `sessionStorage['mj-intro']` is unset; JS removes the class after 1.2s |
| **Icon lab switch** | Selecting a new symbol crossfades it in with a 3px blur over 180ms. Size and stroke sliders update instantly: they fire per frame. | Web Animations API on the stage SVG |
| **Dexterity orbit** | Drag to orbit. Releasing hands velocity to momentum with exponential friction (`k = 0.004^dt`); vertical orbit rubber-bands past its limits (35% resistance). A pause of more than 80ms before release cancels momentum. The render loop stops when the canvas is off-screen or the tab is hidden. | `legacy/assets/dexterity.js` |

## 5. Accessibility and preference handling

- **`prefers-reduced-motion: reduce`.** Movement goes, meaning stays: there are no transforms, no title morph, no page or theme transitions and no hero entrance. The menu fades without sliding. Dexterity momentum is disabled. Opacity fades that explain state are kept.
- **`prefers-reduced-transparency: reduce`.** The header becomes opaque, with no backdrop blur.
- **`prefers-contrast: more`.** Rules use the strong line colour and ghost buttons get ink borders.
- **Focus.** A visible 2px ring is shown on every interactive element. Motion never moves focus.
- **Touch targets.** Interactive targets are at least 44 × 44px.

## 6. Mobile-native baseline

- `viewport-fit=cover`, with safe-area insets applied to the page gutters (`.wrap`) and to the bottom of the mobile menu.
- No `user-scalable=no`. Zoom is never disabled.
- `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation` on interactive elements. Press states replace the grey flash, and double-tap zoom delay is removed.
- Form inputs are at least 16px, so iOS does not zoom on focus.
- The mobile menu uses `100dvh` for its maximum height and `overscroll-behavior: contain`.
- `theme-color` follows the chosen theme, not only the OS scheme.

## 7. Image system

- **Product screenshots are real renders.** X-hunt images are rendered from the product's own landing-page components and theme tokens, using the fictional people and data the product itself uses. Aura's composer is a capture from a local development build. Each caption says which.
- **Light and dark pairs.** Each screenshot ships as `name-light.webp` and `name-dark.webp`. Both are in the markup; the inactive one is `display:none`, so it is neither fetched (lazy loading) nor announced.
- **Frames.** Screenshots sit on a `--surface` mat inside a 12px-radius frame. That separates the product's UI from the portfolio's UI.
- **Alt text** describes what the screen shows and says, not the file.
- **Never use** client screenshots under NDA, or images of real people without consent.

## 8. Checklist before adding motion

1. Can I name what it communicates (hierarchy, continuity, responsiveness or craft)?
2. How often will one person see it? If more than a few times a session, cut it or make it near-instant.
3. Does it use `transform` or `opacity` only, ease-out on entry, under 300ms?
4. Does the exit run faster than the entry?
5. What happens under reduced motion, on touch, and with JavaScript off?
6. Is it interruptible? CSS transitions are; keyframe animations are not. Use keyframes only for one-shot entrances.
