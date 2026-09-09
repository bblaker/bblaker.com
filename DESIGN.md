---
name: bblaker.com
description: An instrument-panel reading of a personal engineering site: hairline rules, monospace metadata, and colour that only ever means something.
colors:
  ground: "#0A0C0D"
  surface: "#111517"
  surface-raised: "#171C1E"
  line: "#1F2629"
  line-bright: "#2D373A"
  text: "#E3E8E9"
  text-body: "#C6CFD1"
  muted: "#8A9496"
  dim: "#5C6668"
  phosphor-blue: "#63C8EC"
  software-green: "#7DD88F"
  infra-violet: "#A99BFF"
  hardware-coral: "#E8836F"
typography:
  display:
    fontFamily: "IBM Plex Sans Condensed, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px, 8vw, 72px)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans Condensed, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(28px, 4.6vw, 42px)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  title:
    fontFamily: "IBM Plex Sans Condensed, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.1em"
rounded:
  sharp: "2px"
  dot: "50%"
spacing:
  2xs: "6px"
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "26px"
  xl: "34px"
  section: "52px"
components:
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sharp}"
    padding: "17px 17px 15px"
  chip:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "3px 7px"
  chip-status-active:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "3px 7px"
  chip-status-planned:
    textColor: "{colors.dim}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "3px 7px"
  filter-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "5px 10px"
  filter-link-selected:
    backgroundColor: "{colors.phosphor-blue}"
    textColor: "{colors.ground}"
    rounded: "{rounded.sharp}"
    padding: "5px 10px"
  callout:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.sharp}"
    padding: "14px 16px"
---

# Design System: bblaker.com

## Overview

**Creative North Star: "The Instrument Panel"**

The site reads as a well-built readout for its own subject. Every mark on the page either
carries information or separates information from other information; nothing is present
because a page felt empty without it. The reference is test equipment and engineering
documentation rather than a blog template — dot-leader spec sheets, status that means
something, counts derived rather than written, and dense rows where most sites would
reach for cards.

The system is committed to a single dark world with cool, slightly blue-biased neutrals.
The bias is load-bearing: ground and accent sit in the same cool family, so the accent
reads as light emitted by the surface rather than as paint applied on top of it. Depth is conveyed entirely by surface steps and
hairlines — there is not one real shadow in the system, and adding one would break its
logic rather than merely look different.

The discipline that makes it work is that colour is never decorative. Three orthogonal
channels each carry exactly one meaning, so nothing has to do double duty and no colour
on screen is ambiguous. The confirmed anti-reference is warm near-black with an amber or
orange accent: an earlier revision used exactly that and read as another company's brand
rather than as this one's instrument.

**Key Characteristics:**

- Cool near-black ground with a single phosphor-blue accent reserved for interaction
- Prose in sans, every piece of metadata in tracked-out uppercase monospace
- One corner radius (2px) and one border weight (1px) across the entire system
- Zero shadows; depth from surface steps and hairlines only
- Hover illuminates a border, never moves, lifts, or scales anything
- Dot-leader spec tables and derived counts as recurring structural devices

## Colors

A cool, near-monochrome ground carrying one interaction accent and three category hues,
with every remaining distinction made in luminance.

### Primary

- **Phosphor Blue** (`#63C8EC`): The only interaction colour in the system. It marks
  links inside prose, focus rings, the full stop in the `bblaker.` wordmark, the
  selected filter chip, and the `$` in a shell transcript. It never indicates state,
  category, or emphasis.

### Secondary

The three category hues. Each appears only as a 2px left rule on a card and as a chip
border and label — never as a fill, never as body text, never decoratively.

- **Software Green** (`#7DD88F`): Marks software projects, and the `LOG` kind label on
  post rows where a devlog entry belongs to one.
- **Infra Violet** (`#A99BFF`): Marks infrastructure projects.
- **Hardware Coral** (`#E8836F`): Marks hardware projects. The only warm colour in the
  system, which is appropriate — it is the only category with physical objects in it.

### Neutral

- **Ground** (`#0A0C0D`): The page. Cool near-black, never pure black.
- **Surface** (`#111517`): Cards, rail blocks, callouts, code blocks, terminal frames.
- **Surface Raised** (`#171C1E`): Inline code and component title bars — the only step
  above Surface.
- **Line** (`#1F2629`): Every hairline: rules, card borders, row separators, table
  divisions.
- **Line Bright** (`#2D373A`): Chip borders, dot leaders, and the hover state of a card
  border. The system's entire "lit" vocabulary for edges.
- **Text** (`#E3E8E9`): Headings, spec values, active status, emphasis.
- **Text Body** (`#C6CFD1`): Running prose only. Deliberately below Text so that a
  heading still leads inside a long article.
- **Muted** (`#8A9496`): All metadata — labels, taglines, dates, kinds, counts.
- **Dim** (`#5C6668`): Deprioritised information: slugs, tags, planned status, effort
  badges, footer.

### Named Rules

**The Three Channels Rule.** Colour carries exactly three meanings and they never
overlap: **hue** = category (software / infra / hardware), **luminance** = state (active
is brightest, planned is dimmest), **accent** = interaction. If a new element needs to
signal something that is not one of those three, it does not get a colour.

**The Accent Diet Rule.** Phosphor Blue appears on links *inside prose*, focus rings, the
wordmark full stop, the selected filter chip, and a shell prompt. That list is exhaustive.
It was previously also on section counts, devlog entry numbers, and every inline code
span; that much accent turned a colour that should mean "you can act on this" into
texture.

**The Reading-Surface Rule.** Index links — card titles, row titles, section actions — are
monochrome at rest and take the accent only on hover. The accent is a reading-surface
device, not a general "this is clickable" paint. This is a deliberate choice: it keeps
indexes quiet and dense. The cost is real and accepted — on a touch device no colour
signals what is tappable outside an article.

**The Status Has No Hue Rule.** `active`, `shipped`, `maintained`, `archived` and
`planned` are distinguished by brightness and by their own label text, never by colour.
An indicator that is lit or unlit is how instruments show state, and it leaves hue free
to mean category everywhere on the page.

## Typography

**Display Font:** IBM Plex Sans Condensed (700) — with IBM Plex Sans, then system sans
**Body Font:** IBM Plex Sans (400/500/600) — with system sans
**Label/Mono Font:** IBM Plex Mono (400/500) — with `ui-monospace`, SF Mono, Menlo

**Character:** One superfamily doing three jobs. The condensed face gives headings a
compressed, engineered authority without importing a second designer's voice; the mono is
a genuine sibling of the sans rather than an afterthought, which is what lets them sit
together inside a single line — dates, tags and statuses beside prose — and read as
intentional rather than as a fallback.

### Hierarchy

- **Display** (Condensed 700, `clamp(40px, 8vw, 72px)`, 0.95, -0.025em): The name on the
  home page. One instance per site.
- **Headline** (Condensed 700, `clamp(28px, 4.6vw, 42px)`, 1.06, -0.012em): Post and
  project titles.
- **Title** (Condensed 600, 20–25px): Card titles, section headings inside prose.
- **Body** (Sans 400, 16.5px, 1.7): Running prose, capped at 68ch.
- **Label** (Mono 400, 10–11.5px, +0.06em to +0.16em, uppercase): Every piece of
  metadata in the system.

### Named Rules

**The Split Rule.** Prose is sans; every piece of metadata is monospace, uppercase, and
tracked out. Dates, tags, statuses, spec keys, section headers, nav, counts, effort
badges. This single split does more visual work than any decoration in the system, and it
is the first thing to preserve in any new component.

**The Tracking Inversion Rule.** Type tracks *out* as it gets smaller and *in* as it gets
larger: mono labels run +0.06em to +0.16em, display runs -0.025em. Uppercase mono at 10px
is unreadable without the extra space; a 72px condensed heading falls apart with it.

**The Tabular Rule.** Any digits that stack in a column — dates, counts, spec values,
reading times, devlog numbers — use `font-variant-numeric: tabular-nums`. Ragged figures
in a column read as a bug in a system that otherwise aligns everything.

## Layout

A single centred column of 1100px maximum with a 24px gutter (18px below 760px). Prose is
independently capped at **68ch** regardless of container width, so an article never
inherits the width of an index.

Two structural patterns recur. **Indexes are dense rows or a `repeat(auto-fit, minmax(290px, 1fr))`
card grid**, with rows preferred wherever the content is a list of things rather than a
set of objects. **Detail pages are a `minmax(0, 1fr) / 280px` split**, prose left, a
sticky metadata rail right, collapsing below 860px to a single column with the rail
promoted *above* the prose as a summary rather than demoted below it.

Spacing is a de facto progression rather than a declared scale — the CSS defines only
`--page`, `--gutter` and `--measure` as tokens. Observed steps: 6, 8, 12, 18, 26, 34, and
52px between sections. New work should quantise to those steps rather than introduce
intermediate values.

Breakpoints: **1000px** (wide figures break the text column), **860px** (detail rail
collapses), **760px** (grids reflow to stacked rows, gutter tightens).

### Named Rules

**The 68ch Rule.** Running prose never exceeds 68 characters, whatever the container is
doing. The instrument styling stops at the article edge; reading is not a place to be
clever.

**The Rail Promotion Rule.** When a two-column detail page collapses, the metadata rail
moves above the prose, not below it. A spec sheet is what a reader came for; burying it
under 2,000 words is a mobile afterthought, and this system decides it up front.

## Elevation & Depth

**There are no shadows.** The system contains exactly one `box-shadow` declaration and it
is not a shadow — `0 6px 0 -5px` draws the 1px underline beneath the active nav item.
Nothing in the system is lifted, floated, or blurred.

Depth is conveyed by two devices only: a **surface step** (Ground → Surface → Surface
Raised, three levels, no more) and a **hairline** (1px of Line, or Line Bright when an
edge is meant to read as lit). A card is distinguishable from the page because it is
lighter and bounded, not because it is hovering above it.

### Named Rules

**The No-Shadow Rule.** No `box-shadow`, no `filter: drop-shadow`, no `backdrop-filter`,
ever. If an element needs to separate from its background, it gets a surface step or a
hairline. This is an invariant, not a preference — a single soft shadow would make every
hairline in the system look like an omission.

**The Illumination Rule.** Hover changes light, never geometry. The card hover is
`border-color` over 120ms and nothing else: no `translateY`, no `scale`, no shadow, no
background change. Instruments respond by lighting up.

## Shapes

One radius: **2px** (`rounded.sharp`), on cards, chips, code blocks, callouts, images,
inputs to the eye — everything with a boundary. The single exception is **50%** on the 5px
status dot inside a chip. There is no `md`/`lg` radius scale, and introducing one would
immediately read as a different system.

Borders carry a small, strict vocabulary, and each weight is reserved:

- **1px solid Line** — the default hairline: rules, separators, table divisions, card and
  block edges.
- **2px solid** a category hue — reserved exclusively for the left edge of a card or
  callout. Never used as a general emphasis border.
- **1px dotted Line Bright** — reserved exclusively for the dot leader between a spec key
  and its value.

### Named Rules

**The One Radius Rule.** 2px, everywhere, plus 50% for status dots. Any third radius is a
defect.

**The Reserved Weight Rule.** A 2px border means "this is a category" and a dotted border
means "this is a spec leader." Neither is available for decoration, because both are read
as information by anyone who has been on the site for thirty seconds.

## Components

The system has **no buttons, no inputs, and no form controls of any kind** — every
interactive element is a link. That is a real property of the implementation, not a gap to
be filled by convention.

### Chips

- **Character:** Small, dense, unmistakably data. The system's most reused element.
- **Style:** Uppercase mono at 10.5px, +0.09em tracking, 1px border of Line Bright, 2px
  radius, 3px 7px padding, inline-flex with a 6px gap.
- **Dot:** 5px circle in `currentColor`, present on domain and status chips, absent on
  plain informational chips.
- **Domain variants:** text and border take the category hue, the border mixed at 34%
  toward Line so it never outshouts its label.
- **Status variants:** hue is not used. `active` is Text with a Line Bright border;
  `shipped` and `maintained` are Muted; `archived` and `planned` are Dim.

### Cards

- **Corner Style:** 2px.
- **Background:** Surface on Ground.
- **Border:** 1px Line on three sides, 2px of the category hue on the left.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Internal Padding:** 17px 17px 15px — slightly tighter at the bottom, because a card's
  last row is a tag list whose descenders already read as space.
- **Hover:** `border-color` to Line Bright over 120ms; the left rule holds its hue.

### Dense Rows

- **Character:** The system's answer to "this is a list, not a gallery."
- **Style:** CSS grid with fixed leading columns (an 8px domain dot, a 140px name), a
  fluid description, and auto trailing metadata. 1px Line bottom border, no background,
  no radius.
- **Use:** Unstarted or deprioritised work, post streams, devlog entries. A backlog of
  fifteen items rendered as cards would compete with three real projects; as rows it
  carries the same information at a tenth the visual weight.

### Navigation

- **Style:** Condensed wordmark left with the accent full stop; uppercase mono links at
  11.5px, +0.1em, Muted, right-aligned. 1px Line bottom border.
- **Active:** Text colour plus a 1px accent underline drawn 6px below the baseline via a
  clipped `box-shadow`.
- **Mobile:** Links wrap; no hamburger, no drawer, no JavaScript.

### Section Header

- **Character:** The system's structural signature.
- **Style:** An uppercase mono label at +0.16em, a derived count in Muted tabular figures,
  a 1px Line rule flexing to fill the remaining width, and an optional right-aligned
  action in mono.
- **Rule:** The count is always derived from a query, never written by hand, so it cannot
  go stale. Section markers are never numbered — the sections are not a sequence, so
  `01 / 02 / 03` would encode nothing.

### Spec Table (signature component)

- **Character:** The single most identifying element in the system.
- **Style:** A flex row per entry — an uppercase mono key at 10.5px in Muted, a
  1px dotted Line Bright leader flexing to fill and nudged up 3px to sit on the baseline,
  and a right-aligned value in Text with tabular figures.
- **Use:** Project rails, `/uses`, inline in post bodies, and the 404 page's error
  readout. Wherever key/value facts appear, they take this form.

### Callout

- **Style:** Surface background, 1px Line border, 2px radius, 14px 16px padding, and a 2px
  left rule whose colour names the kind: accent for `note`, Hardware Coral for `warn`,
  Infra Violet for `gotcha`. The label above is uppercase mono at 10px, +0.14em, in the
  same colour as the rule.

### Terminal Block

- **Style:** Surface frame with a Surface Raised title bar carrying the literal component
  name (`<Term>`) in mono. Inside, the prompt is Phosphor Blue, the command is Text, and
  output is Muted.

## Do's and Don'ts

### Do:

- **Do** put every piece of metadata in uppercase mono with positive tracking, and every
  piece of prose in sans. The Split Rule is the system.
- **Do** derive counts, entry numbers, and reading times from the content, and render them
  in tabular figures.
- **Do** use a surface step or a hairline when something needs to separate from its
  background.
- **Do** reach for a dense row before a card when the content is a list of things.
- **Do** keep hover to a `border-color` change over 120ms.
- **Do** let the category hue appear only as a 2px left rule and a chip.
- **Do** cap running prose at 68ch even when the container is wider.

### Don't:

- **Don't** add a shadow, a `drop-shadow`, or a `backdrop-filter`. Not one, not subtle.
- **Don't** move, lift, scale, or translate anything on hover.
- **Don't** introduce a third border radius, or any radius other than 2px and the 50%
  status dot.
- **Don't** use Phosphor Blue for anything that is not interactive. It is not an emphasis
  colour, a heading colour, or a decorative colour — including the highlighted word in a
  heading, which is why `.hl` is scoped to the wordmark alone.
- **Don't** give status a hue. Brightness plus the label text carries it.
- **Don't** number section headers, or add eyebrow markers that encode nothing.
- **Don't** put images on cards or indexes. Images belong on project pages and inside post
  bodies, where they carry information.
- **Don't** reintroduce a warm near-black ground or an amber/orange accent. That
  combination is the system's confirmed anti-reference.
