# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: engineers who arrive at a single post.** They come from search, an aggregator,
or a shared link, looking for a specific technical answer — how someone actually
segmented a home network that had outgrown its VLANs, what a Voron teardown decision
looks like, why a static site build got rewritten into a server by its own deploy tool.
They are technical peers, they will notice hand-waving, and they arrived for the content
rather than for Ben.

**Secondary: people evaluating Ben professionally.** Hiring managers, interviewers, and
occasionally prospective collaborators, who typically arrive *after* reading something —
they follow a post to the project it belongs to, and then to `/about`. They are assessing
range and seniority, and they are not the audience the writing is pitched at.

The order matters: depth for peers is what produces credibility for the second group.
Writing aimed at recruiters would fail both.

## Product Purpose

A personal site where Ben Blaker publishes what he builds and what he concluded while
building it, across software, infrastructure, and physical/hardware work.

The site is a portfolio in effect rather than in framing. Its stated job is to be the
place the work gets written down, with the portfolio function emerging from that
accumulation rather than being designed for directly.

**Success in a year is a body of work that exists**: roughly twenty to thirty real
entries written as the work happened, devlogs that actually threaded onto their projects,
and projects documented while they were live. Success is measured by the archive
existing, not by traffic, shares, or inbound.

## Positioning

Two things a neighbouring personal site could not truthfully copy:

**Range with the hands-on part intact.** Ben has been an SRE, an architect, and an
executive across nearly two decades, in both IC and leadership roles, and never stopped
being in the code. Most people who can write credibly about staying technical through
leadership are not currently doing the work; most people doing the work have not led at
that level.

**One workshop, not three hobbies.** Software, infrastructure, and hardware are treated
as the same instinct pointed at different material, with real cross-links between them —
a load balancer that deploys to the cluster in the office, filament inventory that
decrements from printer telemetry, a holiday light controller whose interesting half is
its observability. Sites that cover this range usually silo it.

**Honesty as the differentiator.** The backlog is public. Single points of failure are
named as such. Undecided decisions are published while undecided, so a reader can find
out whether the author was right. Uncertainty is written down before the outcome is
known, which is the thing that does not survive being reconstructed later.

## Operating Context

Content is authored as MDX in the repository and published by pushing to `main`. Git is
the CMS; there is no admin interface, no database, and no draft workflow beyond a
frontmatter flag. Ben writes in VS Code on Omarchy (Arch) or macOS.

The subject matter is a real working environment that the site documents: an Unraid
server (30 TB, several dozen containers, half a dozen VMs) and two Proxmox Mac Minis
being repurposed; a six-node Raspberry Pi 4 k3s cluster with Cilium and Flux; UniFi
networking with three or four VLANs and a primary subnet near address exhaustion; Home
Assistant with Z-Wave sensors and switches throughout the house; DIY holiday lighting
rebuilt annually; and 3D printers since 2017, currently a Prusa Core One with the INDX
add-on, a torn-down 350mm Voron 2.4, and a CocoaPress being specced.

The site is deliberately **not** hosted on that infrastructure. It is static and served
from a CDN so that an evening of tinkering in the lab cannot take the portfolio down.

## Capabilities and Constraints

**Content model — two entities, one relationship.** Projects are long-lived nouns with a
status, an effort estimate, a dot-leader spec sheet, and a devlog. Posts are dated events
with a `kind` of `log`, `essay`, or `note`; a post may reference a project, which threads
it onto that project's devlog while it also appears in the global stream. The reference
is schema-validated, so a bad slug fails the build.

**Current inventory:** 19 project entries (9 software, 5 infra, 5 hardware; 3 active, 15
planned) against a 23-entry catalog in `PROJECTS.md`, and 9 posts of which 4 are drafts.

**Technical constraints that future work must preserve:**

- Static output only. No server, no adapter, no runtime. A `wrangler.jsonc` with no
  `main` key exists specifically to stop tooling reintroducing one.
- Zero client JavaScript on content pages. React is installed for future islands (an STL
  viewer is the intended first) but nothing currently hydrates.
- Content validated by Zod at build time; malformed frontmatter fails the build.
- Domain filters are static routes, not query strings, so filtering works without JS.
- `smartypants` is disabled deliberately: it rewrites `--flag` into an em dash inside
  component slots, corrupting shell commands on a site largely about shell commands.

**Routes:** home, `/projects`, `/projects/domain/[domain]`, `/projects/[slug]`, `/log`,
`/log/[slug]`, `/about`, `/uses`, `/404`, plus generated `rss.xml`, `sitemap`, and
per-entry OG images.

**Undecided / deliberately unbuilt:** tag pages (post tags render but link nowhere);
self-hosted fonts (currently Google Fonts); light mode (tokens are structured for it,
nothing built); `<Stl>` and `<Diagram>` MDX components.

## Brand Commitments

- **Name and wordmark.** "Ben Blaker" in full; `bblaker.` as the wordmark, with the
  trailing full stop as the site's mark. The mark carries into the favicon and OG cards.
- **Domain:** `bblaker.com`. Repo: `github.com/bblaker/bblaker.com`, public.
- **Voice:** direct, technical, self-aware, willing to publish an unresolved decision.
  Opinions are argued rather than asserted, and costs are named. No marketing register.
- **Punctuation:** em dashes are used sparingly. Ben does not write with them.
- **No availability signalling.** The site does not state whether he is open to work,
  anywhere. Contact exists; employment status does not appear. Future work must not add
  an "open to work" badge, a hire-me CTA, or a CV surface unless he asks.
- **Contact is a forwarding alias** (`hello@bblaker.com`), never the primary address, so
  it can be burned and replaced if harvested.

## Evidence on Hand

**Real and usable:** the hardware inventory above; the working history (SRE, architect,
executive, ~two decades, IC and leadership); nine years of 3D printing; three live
debugging stories from building this site itself (a deploy tool rewriting the Astro
config into server mode, duplicated `Cache-Control` headers from `_headers` rule
concatenation, and smartypants corrupting `--flags`); and a live unresolved problem in
the WLED holiday-lighting controller that will not stay powered.

**Deliberately absent — must not be fabricated:** no testimonials, no client list, no
named employers (a decision, not a gap — the career is described without naming
companies so the page does not go stale), no traffic or performance benchmarks, no
pricing or availability, no photographs of any hardware yet.

**Placeholder content still live:** `ferry-the-packet-path` describes work not yet
started. `ferry`, `drift`, `pulse`, `helmwright` and most of the backlog are intentions
rather than existing code.

## Product Principles

1. **Write it down before you know how it turns out.** A build log written on day one
   beats a retrospective written three weeks later, because the uncertainty is the
   valuable part and it does not survive being remembered.
2. **Publish the backlog and the unresolved.** Undecided decisions, accepted risks, and
   things that have not been started are more interesting than a curated list of wins,
   and they are what a peer can actually use.
3. **Nothing on the site claims something that is not true yet.** Aspirational work is
   labelled `planned`. Specs describe what exists. Fictional or placeholder content is a
   defect, not a draft.
4. **Depth for peers produces credibility for everyone else.** Never dilute a technical
   post to make it legible to a recruiter; the second audience is served by the first
   being served well.
5. **The site must not depend on the things it writes about.** Static, no runtime, no
   shared failure domain with the homelab.

## Accessibility & Inclusion

No specific standard was established as a requirement. The existing implementation
already provides a skip link, visible focus rings, required alt text on images via the
type system, `prefers-reduced-motion` handling, semantic landmarks, and status conveyed
by label text rather than colour alone. Future work should not regress these.
