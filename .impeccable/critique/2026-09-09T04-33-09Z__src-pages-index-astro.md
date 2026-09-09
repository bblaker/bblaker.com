---
target: homepage and shared system
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
target_identity: "file:/Users/bblaker/Workspace/portfolio/src/pages/index.astro"
target_fingerprint: "sha256:9f14c0ecef296c7ed0774283f4dd0efc395689434a2e46fd88fbcb73d1683190"
target_path: /Users/bblaker/Workspace/portfolio/src/pages/index.astro
timestamp: 2026-09-09T04-33-09Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector evidence), isolated and parallel. Caveat: the detector finished first, so its output reached the synthesis context before the design review's; the review itself ran fully unanchored.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Derived counts and ISO dates excellent; nothing says when a project was last touched |
| 2 | Match System / Real World | 3 | `Effort L` is undefined jargon; cards print a raw URL as content |
| 3 | User Control and Freedom | 1 | Posts are terminal; `.prevnext` never renders; 12 project pages have no inbound link |
| 4 | Consistency and Standards | 2 | Two heading systems; accent inverts between prose and indexes; `.foot` collision ships |
| 5 | Error Prevention | 3 | Zod validates project refs at build time; static filter routes can't be empty |
| 6 | Recognition Rather Than Recall | 2 | S/M/L/XL never legended; backlog dots have no key; cyan means two things |
| 7 | Flexibility and Efficiency | 2 | Domain routes/RSS/skip link real; tags link nowhere, no search across 24 entries |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely restrained; undercut by a hero stating its thesis four times |
| 9 | Error Recovery | 3 | /404 is the best page on the site; its `Next` row is dead text |
| 10 | Help and Documentation | 2 | Content model explained once, on /about, the last page anyone reaches |
| **Total** | | **24/40** | **Acceptable** |

Heuristics 7 and 10 were scored, not n/a. Applicable maximum: 40.

## Design Specificity Verdict

Split: the design SYSTEM is authored for this product; the HOMEPAGE is a category template wearing it.

Specific and un-liftable: SpecTable reused as a 404 diagnostic readout; evidence-tiered IA where isLive/isBacklog derives visual weight from a truth claim; devlog threading surfaced inline and numbered oldest-first.

Category-interchangeable: the hero (name -> claim -> paragraph -> skills strip); ProjectCard is the GitHub-repo-card arrangement using none of the system's signature vocabulary; cool near-black + one green accent + tracked mono is the most common developer-portfolio look of the last two years.

Sharpest failure: the system's thesis inverts on the front door. DESIGN.md says the accent marks links; on the homepage zero links are green, while the non-interactive word "software" carries the accent (an explicit Don't). Links go green only on :hover, so on touch no link anywhere on the homepage, /projects or /log carries the accent.

Deterministic scan: 501 findings, 9 rules, exit 2, across 33 pages. ~101 false positives (21 side-tab flagging the 2px category rule; 45 design-system-color, of which 28 are verified color-mix() outputs of documented tokens and 17 are Shiki theme colours; 6 all-caps-body firing on 31-37 char labels; 1 tight-leading on a display subhead). The remaining ~400 collapse into two root causes: --dim/--line-hi used as text across 23 CSS rules, and 30 declarations setting functional text at 10-11.5px. Zero findings for shadows, motion, radius, alt text, lang or title. 0 script tags verified across all 33 pages.

Visual overlays: unavailable. No mutable browser automation exposed; no live server started, no injection attempted.

## Overall Impression

A set of well-made rooms with no doors between them. The reading experience is excellent and the system has real discipline, but every journey terminates. The connective tissue the content model already computes is almost never rendered as a link.

## What's Working

1. Prose reading experience, correctly prioritised: 68ch cap independent of container, --text-body at 12.37:1, 16.5px/1.7, and .prose a underlined at rest.
2. Derived data structurally enforced: domainCounts(), devlogIndex(), readingTime(), section counts all computed, so no number can go stale.
3. The 404 page is a real design idea: failure state as in-character diagnostic, explaining why no redirect exists. Skip link works; focus ring is 11.29:1.

## Priority Issues

[P0] 12 of 19 project pages have zero inbound links. ProjectRow.astro renders the name as a span, never a link. Verified across all built pages. 63% of the project corpus is built and invisible; the public backlog ships as 15 rows of dead text that look actionable. Fix: wrap in an anchor mirroring .row-post .ttl a; extend hit area to clear 44px. -> /impeccable harden

[P0] A CSS class collision inflates every project card by ~84px. .foot (global.css:145) sets margin-top:84px, padding:22px 0 40px, border-top; ProjectCard emits div.foot; .card .foot overrides only four properties. Cards are ~2x designed height with a spurious hairline, on the homepage above the fold. Fix: rename to .card-foot or scope to footer.foot; then audit .links/.line/.date/.rt/.n. -> /impeccable layout

[P1] Posts are terminal. No back-link, no related posts, no crumbs; .prevnext never renders because sibling lookup is scoped to project series. PRODUCT.md's secondary path (post -> project -> About) has two legs missing. Fix: post-footer block with All posts, parent project, 2-3 recent posts; global-stream fallback for prev/next. -> /impeccable harden

[P1] The metadata layer fails accessibility site-wide. --dim #5C6668 = 3.32:1 on ground, 3.11:1 on surface, 2.91:1 on surface-2, always at 10-12.5px. --line-hi as text = 1.60:1. 23 CSS rules affected. Plus 30 declarations at 10-11.5px (331 findings) on the same elements. SectionHead renders a span not a heading: /log and /uses expose exactly one heading each; five pages go h1->h3. Fix: raise --dim to ~#7A8385; give planned a second non-luminance signal; SectionHead gets an `as` prop defaulting to h2. -> /impeccable audit

[P1] The accent contradicts its own rule on every index page. Green marks a non-interactive word; no real link is green at rest outside prose; accent-on-link is hover-only, so touch gets none. Fix: give index links the accent at rest, or redefine the accent honestly; split .hero .hl. -> /impeccable colorize

## Persona Red Flags

Jordan: clicks all three unlinked "Next up" rows; L/M/XL badges never defined (title attribute only, invisible on touch); bare hue dots with no legend; /projects/ferry printed as content; homepage states identity four times, never the proposition.

Sam: 18 project names are plain spans, keyboard-unreachable; .rail{order:-1} at <=860px desyncs visual and focus order (WCAG 1.3.2/2.4.3); .row-p .st display:none at <=760px removes "planned" from the accessible tree; .filters a border at 1.60:1 fails the 3:1 non-text minimum; post tags ship as a run-on string.

Casey: only tap target on a card is the ~42x24px title inside a ~340x380px card whose hover implies full pressability; backlog is ~700px with zero targets; horizontal overflow at 320px (minmax 290px vs 284px content box); no :visited styling; no sticky nav.

## Minor Observations

- .post-meta .p hardcodes software-cyan regardless of domain; the infra project link renders cyan, violating Three Channels inside the system's own CSS.
- .card p (the only substantive card content) is --muted 13.5px, styled as metadata.
- .shead: display:flex with no flex-wrap and no min-width:0; collapses on narrow screens.
- 194KB React bundle in dist/ referenced by nothing (14% of payload).
- Dead CSS: .stack, .gap-*, .mdx, .gallery, .bom, .prevnext, .fig[data-wide].
- 22 distinct font sizes ship against 5 documented steps; three index pages duplicate an inline-styled h1 at clamp(30px,5vw,40px).
- og:type is website on every page including posts.
- /log year grouping produces one group of five.

## Questions to Consider

1. If green is the only interaction colour, why is there no green on the three pages a visitor navigates?
2. Should the backlog be pages at all, or one dense readout with detail pages only once a project has evidence?
3. What is the homepage for, given the primary audience never lands on it?
4. If `active` is a claim, what evidence should the design require before rendering one?
