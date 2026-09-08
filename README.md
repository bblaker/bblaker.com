# portfolio

Personal site — projects, build logs, and writing. Astro 5 + React islands, TypeScript
strict, zero client JS on content pages.

Design direction and screen mockups: **Instrument**.
Project catalog and backlog: [`PROJECTS.md`](./PROJECTS.md).

```bash
npm run dev      # localhost:4321
npm run build    # static output to dist/
npm run preview  # serve dist/
npm run check    # astro check — types + templates
```

## The content model

Two entities, one relationship.

**Projects** are long-lived nouns (`ferry`, `pi-tower`). They have a status, a spec
sheet, and a devlog. **Posts** are dated events. A post with `project: ferry` threads
onto ferry's devlog automatically *and* appears in the global stream. That join is the
whole model — see [`src/content.config.ts`](./src/content.config.ts).

Git is the CMS. `git push` publishes. A post that fails its Zod schema fails the build,
which is the CI gate you'd want anyway.

### Adding a project

Create `content/projects/<slug>.mdx`. The filename is the URL.

```yaml
---
title: ferry
tagline: One line. Used on cards, the project header, and OG descriptions.
domain: software | infra | hardware
status: active | shipped | maintained | archived | planned
effort: S | M | L | XL          # sets expectations on the public backlog
started: 2026-09-01
weight: 100                      # sort weight within a status band
stack: [Go, eBPF, gRPC]
tags: [go, ebpf, networking]
links:
  - { label: "Source · github", href: "https://github.com/..." }
spec:                            # the dot-leader rail. ordered, so order it.
  - { k: Language, v: Go 1.25 }
---
```

`status: planned` moves a project out of the card grid and into the **Backlog** rows —
unstarted work shouldn't compete visually with things that exist.

### Adding a post

Create `content/posts/<slug>.mdx`. No date prefix on the filename; the date lives in
frontmatter so the URL stays clean.

```yaml
---
title: The packet path I'm aiming for
date: 2026-09-08
kind: log | essay | note
project: ferry                   # optional. validated — a bad slug fails the build.
summary: Required. It's the list copy, the RSS body, and the OG description.
tags: [go, ebpf]
---
```

`kind` picks the renderer: `log` gets a project breadcrumb and prev/next within that
project's sequence, `essay` gets the full typographic treatment, `note` is a short thought.

### MDX components

Available in any post or project body without importing — they're passed via
`<Content components={mdxComponents} />`.

| Component | Use |
|---|---|
| `<Callout kind="note\|warn\|gotcha">` | Aside with an amber (or coral/violet) rule |
| `<Term title="...">` | Shell transcript. Lines starting with `$ ` render as commands |
| `<Spec rows={[{k,v}]} />` | Inline dot-leader datasheet |
| `<BOM items={[{qty,part,source,href,cost}]} />` | Bill of materials, totals computed |

Still to build: `<Stl>` (three.js viewer — the reason `@astrojs/react` is installed),
`<Gallery>`, `<Diagram>`.

## Design system

One file: [`src/styles/global.css`](./src/styles/global.css). Tokens at the top, then
component classes. No Tailwind — the system is ~10 classes and a token block, and
scattering it across markup would cost more than it saves.

The rule that carries the design: **prose is sans, all metadata is mono, uppercase and
tracked out**. Dates, tags, statuses, spec keys, nav. That split does more work than any
decoration.

Colors: warm near-black ground, amber `#FFB454` for interaction and the `active` state
only. Domain hues (software cyan, infra violet, hardware coral) appear as a 2px left
rule and a chip, never as fill. Green means `shipped` and nothing else.

Dark-committed for now. Light mode redefines the `:root` token block and nothing below
has to change.

## Deploying

Static output, no adapter, no server. `npm run build` → `dist/`.

### Cloudflare Pages (recommended)

Connect the repo in the Cloudflare dashboard:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `22` (set `NODE_VERSION=22` if the default is older) |

Then add the custom domain under **Custom domains**. Nothing else to configure —
[`public/_headers`](./public/_headers) is picked up automatically and gives hashed
assets `immutable` caching while keeping HTML revalidating.

Preview deploys for every branch and pull request come for free, and rollback is one
click. That plus header control is why this is the recommendation over GitHub Pages,
which **cannot set custom response headers at all** — you'd lose the `immutable` rule
and get GitHub's fixed ~10 minute cache on everything instead.

### GitHub Pages (alternative)

Works fine, and `public/.nojekyll` is already in place for it. Add this workflow, then
set Pages → Source → GitHub Actions in the repo settings:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 22
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

With a custom domain, put it in `public/CNAME` and leave `base` unset in
`astro.config.mjs`. You only need `base` for a `username.github.io/repo` URL.

## Notes

- `site:` is set to `https://bblaker.com` in `astro.config.mjs`, and `public/robots.txt`
  matches. Both need changing together if the domain ever moves — the value is baked into
  canonical URLs, every RSS `<link>`, and the sitemap, and feed readers cache aggressively.
- `smartypants` is **off**, deliberately. It rewrites `--flag` to an em dash inside
  component slots, silently corrupting every shell command on a site that is largely
  about shell commands.
- Domain filters are real static routes (`/projects/domain/software/`), not query
  strings, so filtering works with zero JS and the URLs are linkable.
- Fonts load from Google Fonts. Self-hosting them removes a third-party request and a
  render-blocking round trip — worth doing before launch if you care, which you probably
  should.
- The repo is public, so everything in `content/` is public the moment it is pushed,
  `draft: true` included. Drafts are hidden from the built site, not from the repo.
