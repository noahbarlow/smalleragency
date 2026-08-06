# Smaller Agency — Design System

> Canonical visual and verbal system for Smaller Agency, Noah Barlow, agency-owned diagnostics, proposals, decks, reports, social content and future digital products.
>
> **Source of truth:** [smalleragency.com](https://smalleragency.com)  
> **System line:** **Serious brand work. Small-team overhead.**  
> **Last updated:** 2026-08-06

---

## 1. The idea

Smaller is a Toronto brand and packaging studio built around a simple advantage: the people in the first meeting stay close to the work.

The identity should feel:

- **serious about the work** — exact typography, useful hierarchy, strong case-study proof;
- **small by design** — direct, human and free of corporate agency theatre;
- **visually alert** — one sharp colour decision, deliberate scale and confident cropping;
- **expensive in judgement, not overhead** — refined without looking precious or overproduced.

The design is not minimal because there is little to say. It is edited because every element should earn its place.

### The recurring contrast

**Serious brand work.** is the promise.  
**Small-team overhead.** is the operating advantage.

Use the contrast as a writing and layout principle, not as a slogan that must appear everywhere.

---

## 2. Scope

This system governs agency-owned work:

- smalleragency.com and future Smaller digital properties;
- noahbarlow.work and Noah Barlow thought leadership;
- diagnostics, scorecards and interactive tools;
- proposals, scopes, capabilities decks and case studies;
- Smaller-authored reports, audits and research;
- Smaller social and launch content;
- email graphics, event materials and internal templates.

### Brand ownership rule

The **Smaller Agency logo** appears only when Smaller is the sender. Noah’s personal work uses his name, but shares this design language. Client deliverables use the client’s identity; the Smaller system belongs on the cover, colophon or presentation shell, not over the client brand.

---

## 3. Logo

The supplied Smaller Agency wordmark is the only authoritative logo. Never rebuild it with live type.

### Primary files

- `assets/logo-black.svg` — ink wordmark on Paper, Paper 2, Signal or white.
- `assets/logo-paper.svg` — light wordmark on Ink or photography with sufficient contrast.

### Clear space

Keep clear space equal to the height of the wordmark’s lowercase **s** on every side. More is encouraged in editorial layouts.

### Minimum size

- Digital: **96 px wide** minimum.
- Print: **25 mm wide** minimum.
- Header use: size by optical presence, not by matching neighbouring type.

### Placement

Preferred positions are upper-left and lower-left. The wordmark should feel anchored to the grid, never floated as decoration.

### Never

- retype, redraw, stretch, condense or rotate the logo;
- recolour individual letters;
- use gradients, outlines, shadows or effects;
- place it in a holding shape;
- repeat it in the same view;
- use the logo as both header and oversized footer decoration on one page.

---

## 4. Colour

The core palette is disciplined. **Blue carries identity. Signal carries action.** Project imagery supplies most of the remaining colour.

| Token | Hex | Role |
|---|---:|---|
| `--ink` | `#11110F` | Primary text, rules, dark fields and dark CTAs |
| `--paper` | `#F2F3EF` | Default background |
| `--paper-2` | `#E5E7E1` | Quiet section change, image placeholder, table band |
| `--white` | `#FFFFFF` | Cards over photography and reversed text support |
| `--blue` | `#3F4DFF` | Brand signature, links, active states and one key phrase |
| `--signal` | `#F0FF58` | Action, selection, progress and high-attention moments |
| `--rule` | `#CFD2CA` | Secondary dividers and quiet structure |
| `--mute` | `#686A64` | Metadata, notes and captions |

### Supporting project colours

These colours may appear when a project, chart or proof moment needs them. They do not compete with Blue as the agency signature.

| Token | Hex | Use |
|---|---:|---|
| `--red` | `#FF4B2F` | Warnings, specific client fields, evidence coding |
| `--pink` | `#FF89BA` | Client-led accent or evidence coding |
| `--sky` | `#A8C8FF` | Client-led accent or quiet data field |

### Colour rules

1. Use **Paper + Ink** as the default condition.
2. Use **Blue once with intent**: a hero phrase, active nav, project title or primary interaction.
3. Use **Signal for behaviour**, not decoration: hover, progress, selection, callout or result.
4. Full Blue and Signal fields are allowed, but body copy must remain accessible.
5. Let project photography keep its own colour. Do not wash every image into the agency palette.
6. No gradients unless they are part of client work being shown.
7. Avoid the old coral/script system. Coral is no longer an agency signature.

### Accessible pairings

- Ink on Paper, Paper 2, White or Signal.
- White on Ink or Blue.
- Paper on Ink.
- Blue on Paper or White for display text and controls; use Ink for long reading.

---

## 5. Typography

Typography carries most of the identity. It should feel designed, not decorated.

### Families

| Role | Family | Use |
|---|---|---|
| Display | **Anybody Variable** | Headlines, project names, large numbers and statements |
| Body | **Instrument Sans** | Paragraphs, captions, buttons, labels and navigation |
| Utility | **Instrument Sans** | Eyebrows, metadata, tables and interface language |

Production font loading:

```html
<link rel="preload" href="assets/fonts/anybody-latin-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-sans-latin-variable.woff2" as="font" type="font/woff2" crossorigin>
```

Both families are self-hosted. Declare their variable ranges with `@font-face` in the primary stylesheet and use `font-display: swap`. Do not add Google Fonts back to the render path.

### Display settings

Default display treatment:

```css
font-family: "Anybody", Arial, sans-serif;
font-weight: 820;
font-variation-settings: "wdth" 106;
letter-spacing: -0.034em;
line-height: 0.95;
```

Use the variable width deliberately:

- `"wdth" 104–112` — primary headlines and project names;
- `"wdth" 116` — short numbers and compact proof statements;
- use `"wdth" 100` only for a deliberate mobile optical correction, never to force copy into a box;
- if copy does not fit, reduce scale, edit the line or let it wrap naturally.
- never use `overflow-wrap: break-word`, `word-break: break-all` or automatic hyphenation on display type; a headline may wrap only at real spaces;
- test every display style at 320, 375, 430 and 630 pixels. Reduce the responsive type scale before allowing a word to overflow.

### Body settings

```css
font-family: "Instrument Sans", Arial, sans-serif;
font-weight: 400;
line-height: 1.55–1.68;
letter-spacing: -0.008em;
```

### Utility settings

```css
font-family: "Instrument Sans", Arial, sans-serif;
font-size: 0.62–0.72rem;
font-weight: 600;
letter-spacing: 0.085em;
text-transform: uppercase;
```

### Headline rules

- Use lowercase or sentence case. Do not use Title Case display copy.
- Keep the writing short enough to retain shape.
- Prefer natural wrapping. **Do not insert a manual `<br>` simply to imitate a comp.**
- One phrase may use Blue to create contrast. It should keep a readable width and relaxed tracking.
- Do not assign different widths to adjacent lines of the same phrase.
- No script font, outlined type, gradient type or decorative italics.
- Large type may touch the edge optically, but must never clip.

### Current hero recipe

```html
<h1>
  <span class="hero-main">serious brand work.</span>
  <span class="accent">small-team overhead.</span>
</h1>
```

The black phrase is one natural sentence. The blue phrase is the only typographic contrast. On mobile, both wrap according to available width; no forced line breaks.

### Fluid scale

| Role | Suggested range |
|---|---|
| Hero | `clamp(4rem, 9.15vw, 9.25rem)` |
| Page H1 | `clamp(3.5rem, 9vw, 9rem)` |
| H2 | `clamp(2.5rem, 5.7vw, 5.75rem)` |
| H3 | `clamp(1.35rem, 2vw, 2rem)` |
| Lead | `clamp(1.1rem, 1.6vw, 1.45rem)` |
| Body | `1rem` |
| Utility | `0.62–0.72rem` |

### Optical spacing scale

Negative tracking is not a house effect. It changes with scale:

| Role | Tracking | Line height | Width axis |
|---|---:|---:|---:|
| Hero | `-0.042em` | `0.91` | `104` |
| H1 | `-0.040em` | `0.92` | `106` |
| H2 | `-0.034em` | `0.95` | `106` |
| H3 / project name | `-0.025em` to `-0.030em` | `1.01–1.02` | `106` |
| Utility | `0.085em` | `1.35` | normal |
| Body | `-0.008em` | `1.55–1.68` | normal |

On screens at 760px and below, loosen display tracking by roughly `0.007em`, keep the main hero line at `0.98` line height and reduce scale before reducing width. Test at 360, 390, 768, 1024 and 1440px. Text must also survive the WCAG text-spacing override without clipping, overlap or lost content.

---

## 6. Layout

The system is an editorial proof wall: large statements, visible structure and client work allowed to take over the frame.

### Core tokens

```css
--shell: 92rem;
--gutter: clamp(1.25rem, 3vw, 3rem);
--section-y: clamp(5rem, 9vw, 9rem);
--header-h: 5.25rem;
```

### Principles

- Use a wide shell and meaningful margins.
- Alternate between **argument** and **proof**: statement, image, explanation, work.
- Hairline rules encode structure. They are not decoration.
- Use asymmetry with a clear reason: copy beside proof, label beside result, image beside role.
- Let one image go full-bleed before introducing a dense grid.
- Fewer, larger project moments beat a wall of equal cards.
- Empty space is active pacing. It must still feel intentional on mobile.

### Preferred structures

**Editorial split**

```text
[ large argument 7/12 ]   [ explanation 5/12 ]
```

**Proof split**

```text
[ large image 7/12 ]      [ secondary image 5/12 ]
[ project + scope ]        [ project + scope ]
```

**Full-bleed feature**

```text
[ client work fills viewport ]
[ compact white caption anchored lower-left ]
```

### Avoid

- repetitive three-card rows used only because they are easy;
- rounded SaaS cards, pills and soft shadows;
- tilted “creative agency” tiles;
- text boxed into arbitrary fixed heights;
- crowded transitions between sections;
- duplicated logos or oversized decorative footer marks.

---

## 7. Rules, labels and components

### Rules

- Primary boundary: `1px solid var(--ink)`.
- Secondary divider: `1px solid var(--rule)`.
- Use borders to clarify groups, not to frame every object.

### Eyebrows

Small, uppercase Instrument Sans. They orient the reader: location, section, role or project status. Keep them factual.

Good:

- `SMALLER AGENCY / TORONTO`
- `FEATURED PROOF / SUPA POWER`
- `SELECTED WORK / NOT THE ATTIC`

Avoid vague labels like `OUR APPROACH` when a more specific label exists.

### Buttons

- Rectangular, never pill-shaped.
- Minimum target: 44 × 44 px.
- Utility type with an outbound arrow `↗`.
- Primary: Ink field with white type.
- Hover: Blue field; Signal may be used for an especially important state.
- Button copy names the action: `See the work`, `Start a project`, `View case study`.

### Project cards

- Image first.
- Straight edges and consistent aspect ratios.
- Project name in Anybody, scope in utility type.
- One rule separates image and caption.
- Hover is a subtle image scale and Blue title shift. No tilt, flip or shadow.

---

## 8. Photography and work imagery

The portfolio is the colour and texture of the site. Treat it as evidence, not decoration.

### Direction

- Show the designed object clearly: package, system, retail moment, identity or interface.
- Mix establishing shots with close detail.
- Prefer real project photography and finished executions over mood imagery.
- Crop confidently, but do not obscure the work to make a dramatic composition.
- Sequence case studies to show scope: identity → package → content → channel → result.
- Use full-bleed images for marquee work and grids for supporting proof.

### Image preparation

- Web: modern JPEG/WebP, usually 1600–2400 px on the long edge.
- Social and packaging text must remain legible after responsive cropping.
- Remove export seams, accidental horizontal lines and montage artifacts.
- Supply an intentional mobile crop when the desktop crop fails.

### Never

- substitute a related brand or competitor for the actual client;
- add generic stock images to “fill” a case study;
- apply a global colour overlay that hides the work;
- place every available image at the bottom of a page.

---

## 9. Motion

Motion should reveal scope and improve orientation. It should never be the concept by itself.

### Approved behaviour

- restrained page entrance for the hero;
- image swaps in a pinned feature to show a system, not a colour filter;
- subtle image scale on hover;
- short caption or rule reveals;
- horizontal filmstrips when there is a real sequence to explore;
- a single clear progress signal in long interactive tools.

### Timing

- Interface transitions: `180–250ms`.
- Image transitions: `450–700ms` with an ease-out curve.
- Orchestrated hero entrance: under `700ms` total.

### Avoid

- colour-shifting full-bleed imagery on scroll;
- multiple competing scroll effects in one viewport;
- perpetual marquee movement without a content reason;
- velocity distortion that hurts reading;
- scroll-jacking;
- animation that leaves blank space before content arrives.

Always support `prefers-reduced-motion` and preserve the complete reading experience without animation.

---

## 10. Voice

The writing should sound like a person who has made the work, defended it and watched it reach the shelf.

### Tone

- direct, observant and lightly playful;
- confident without agency chest-beating;
- specific about the work and consequences;
- conversational enough to use contractions;
- concise, but not clipped into slogan fragments everywhere.

### Use

- concrete verbs: make, name, package, launch, fix, choose, sell;
- real categories, brands, channels and constraints;
- plain explanations of what Smaller did;
- occasional humour when it sounds like Noah, not a copywriter trying to be disruptive;
- short CTAs that tell the reader what happens next.

### Avoid AI tells

- three parallel claims in identical sentence shapes;
- “not just X, but Y” constructions repeated across a page;
- empty declarations such as “This matters” or “There is no shortcut”;
- em-dashes in every paragraph;
- abstract stacks: strategy, storytelling, culture, impact;
- fortune-cookie closers;
- generic agency phrases: bold ideas, meaningful connections, at the intersection of;
- explaining the cleverness of the copy.

### A useful test

Read it aloud. If Noah would not say it to a founder across a table, rewrite it.

---

## 11. Noah Barlow application

Noah’s personal work uses the same typography, colour, grid and writing discipline so the relationship to Smaller is obvious.

Differences:

- use `NOAH BARLOW / TORONTO` instead of the Smaller logo when Noah is the sender;
- first person is appropriate;
- long-form pieces may be denser, but retain the same section rhythm and proof-first logic;
- Blue remains the signature; Signal marks tools, scores and actions;
- Instrument Serif and the lime highlighter are retired from the primary personal system.

The personal site should feel like the founder’s desk inside the same studio, not a separate brand universe.

---

## 12. Documents, decks and reports

### Cover

- Paper background.
- Smaller logo or Noah name in the upper-left.
- One oversized Anybody title.
- Blue may carry one phrase only.
- Small factual metadata along a rule.

### Content pages

- One argument per page or spread.
- Instrument Sans body, short measure.
- Use rules, labels and large numbers instead of decorative shapes.
- Client imagery should dominate whenever it is available.
- Signal is reserved for decisions, next steps and selected data.

### Tables and diagnostics

- Prefer open tables with horizontal rules.
- Align numbers and labels precisely.
- Use colour only to encode a real state.
- Explain methodology in plain language.
- Never turn every result into a card.

---

## 13. Accessibility and production

- Meet WCAG AA contrast for body copy and controls.
- Minimum interactive target: 44 px.
- Every image needs useful alt text; decorative images use empty alt text.
- Provide visible keyboard focus.
- Maintain logical heading order.
- Do not rely on colour alone for state.
- Mobile layouts are designed independently, not compressed desktop comps.
- Test at 360, 390, 768, 1024 and 1440 px.
- Check for clipping at browser zoom 200%.
- Respect reduced-motion preferences.

---

## 14. Quick shipping checklist

- [ ] Correct Smaller logo asset; no duplicate logo?
- [ ] Paper, Ink, Blue and Signal used in their proper roles?
- [ ] Anybody for display and Instrument Sans for everything else?
- [ ] Both variable fonts self-hosted and preloaded, with no third-party font request?
- [ ] Display type readable without extreme width compression?
- [ ] Headline wrapping naturally rather than forced with decorative breaks?
- [ ] One clear visual idea per section?
- [ ] Real client work doing most of the visual work?
- [ ] No filler cards, stock imagery, gradients, shadows or tilted tiles?
- [ ] Copy sounds like Noah and names the actual work?
- [ ] Mobile spacing and crop checked independently?
- [ ] Primary images served as responsive AVIF/WebP with intrinsic dimensions?
- [ ] The main headline renders immediately; only supporting elements animate?
- [ ] Analytics waits for first interaction or browser idle time?
- [ ] Keyboard, contrast, alt text and reduced motion checked?

---

## 15. Copy-paste tokens

```css
:root {
  --ink: #11110f;
  --paper: #f2f3ef;
  --paper-2: #e5e7e1;
  --white: #ffffff;
  --blue: #3f4dff;
  --signal: #f0ff58;
  --rule: #cfd2ca;
  --mute: #686a64;
  --red: #ff4b2f;
  --pink: #ff89ba;
  --sky: #a8c8ff;

  --font-display: "Anybody", Arial, sans-serif;
  --font-body: "Instrument Sans", Arial, sans-serif;
  --font-utility: "Instrument Sans", "Helvetica Neue", Arial, sans-serif;

  --shell: 92rem;
  --gutter: clamp(1.25rem, 3vw, 3rem);
  --section-y: clamp(5rem, 9vw, 9rem);
  --header-h: 5.25rem;

  --display-width: 106;
  --display-width-wide: 112;
  --display-track-hero: -0.042em;
  --display-track-xl: -0.040em;
  --display-track-lg: -0.034em;
  --display-track-md: -0.025em;
  --utility-track: 0.085em;
  --measure-body: 38rem;
  --measure-lead: 36rem;
}
```

---

## 16. Superseded system

This document replaces the earlier Objectivity + Snell/Pinyon + Coral system and the separate Instrument Serif + lime Noah Barlow system. Do not mix those systems into new Smaller or Noah-owned work unless reproducing an archived artifact.
