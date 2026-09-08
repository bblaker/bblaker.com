# Project Catalog

Source of truth for what goes in `content/projects/`. Each entry maps onto the
`projectSchema` fields (slug, title, tagline, domain, status, stack, links, spec).

Three states are in play here:

- **REAL** — exists, or you've already told me you're starting it.
- **CARRIED** — invented for the design mockup, kept because you liked them. Real
  ideas, but nothing exists yet. Rename freely.
- **CANDIDATE** — new. Pick from these.

Effort is evenings-and-weekends: **S** ≈ a weekend · **M** ≈ a few weeks ·
**L** ≈ a season · **XL** ≈ ongoing, never really "done".

---

## Contents

| Slug | Domain | State | Effort | One line |
|---|---|---|---|---|
| [ferry](#ferry) | software | REAL | L | Go L4/L7 edge router and load balancer |
| [pi-tower](#pi-tower) | infra | REAL | XL | Six Pi 5s running k3s in a printed rack |
| [printers](#printers) | hardware | REAL | XL | The fleet, and keeping it running |
| [drift](#drift) | software | CARRIED | M | Terraform drift detection that pages only on surprises |
| [pulse](#pulse) | software | CARRIED | M | Prometheus TUI — PromQL in, sparklines out |
| [helmwright](#helmwright) | software | CARRIED | M | Typed Helm chart scaffolding in TypeScript |
| [voron-24](#voron-24) | hardware | CARRIED | L | Self-sourced 350mm CoreXY build |
| [respawn](#respawn) | software | CANDIDATE | L | Kubernetes operator for game servers |
| [spool](#spool) | software | CANDIDATE | M | Filament inventory that decrements itself |
| [slab](#slab) | software | CANDIDATE | M | SLOs as code → Prometheus burn-rate alerts |
| [farm](#farm) | software | CANDIDATE | L | Print farm scheduler across multiple printers |
| [dashkit](#dashkit) | software | CANDIDATE | M | Grafana dashboards as typed TypeScript |
| [beacon](#beacon) | software | CANDIDATE | S | Static status page generated from your own metrics |
| [replay](#replay) | software | CANDIDATE | M | Record-and-replay HTTP proxy for testing |
| [ledger](#ledger) | software | CANDIDATE | S | Homelab power and cost accounting |
| [bootstrap](#bootstrap) | infra | CANDIDATE | L | Bare metal to running cluster in one command |
| [meshwork](#meshwork) | infra | CANDIDATE | M | Segmented home network — VLANs, DNS, WireGuard |
| [lookout](#lookout) | infra | CANDIDATE | M | The observability stack, and what it actually caught |
| [holdfast](#holdfast) | infra | CANDIDATE | M | Backups you have actually restored from |
| [chamber](#chamber) | hardware | CANDIDATE | M | Instrumented printer enclosure on ESP32 |
| [festoon](#festoon) | hardware | REAL | M | A holiday lighting controller that stays powered on |
| [rack](#rack) | hardware | CANDIDATE | M | The printed 10" rack, designed properly |
| [sortbrick](#sortbrick) | hardware | CANDIDATE | XL | Lego sorting machine — CV plus a printed feeder |

Current mix: **12 software · 5 infra · 6 hardware**. That ratio is deliberate —
it puts software first on `/projects` without pretending the rest isn't there.

---

# REAL

## ferry

**Go L4/L7 edge router and load balancer.** Maglev hashing on an XDP fast path,
config that reloads without dropping a connection.

- **domain** software · **status** active · **effort** L
- **stack** Go, eBPF/XDP, gRPC, k3s, Prometheus
- **spec** Language `Go 1.25` · Data plane `XDP / eBPF` · Balancing `Maglev` ·
  Health `active + passive` · Deploys to `pi-tower`

The flagship. Nothing else on this list demonstrates as much at once: kernel-level
networking, a control/data plane split, and a real correctness problem (swapping
the backend table without breaking in-flight connections). It also gives every
other project a front door.

**Devlog seeds:** the packet path I'm aiming for · Maglev explained by drawing it
badly · building the benchmark rig before any features · a week of verifier errors ·
the first time it served real traffic · what I got wrong about atomic map swaps.

**Start the project page before the code.** Day-one uncertainty is more interesting
written down than reconstructed.

## pi-tower

**Six Raspberry Pi 5s running k3s in a printed 10" rack.** NVMe boot, PoE, and a
monitoring stack that watches itself.

- **domain** infra · **status** active · **effort** XL
- **stack** k3s, Cilium, Flux, Prometheus, Raspberry Pi 5
- **spec** Nodes `6 × Pi 5 8GB` · Storage `6 × 1TB NVMe` · Networking `PoE+, 2.5GbE` ·
  Idle draw `~48W` · GitOps `Flux` · Ingress `ferry (soon)`

Already built, so this is the one project you can write retroactively without it
feeling thin — you have the scars. It's also the hosting target for the site
itself, which closes a nice loop.

**Devlog seeds:** why six and not three · moving all six to NVMe boot · the PoE
budget mistake · Cilium instead of flannel, and whether it was worth it · what
actually runs on it · a year of uptime numbers.

## printers

**The fleet, and keeping it running.** Not one build — the ongoing work of
maintaining machines that are themselves a hobby.

- **domain** hardware · **status** maintained · **effort** XL
- **spec** one row per machine: model, kinematics, hotend, build volume, hours

Consider making this a project rather than scattering printer content into posts.
It gives 3D printing a home page, and every repair, mod, and tuning session has
somewhere to land.

**Devlog seeds:** input shaping, measured properly · the mod that finally fixed
first-layer consistency · a maintenance schedule that survived contact with reality ·
klipper config, annotated.

---

# CARRIED FROM THE MOCKUP

## drift

**Continuous Terraform drift detection that only pages on unexplained change.**

- **domain** software · **status** — · **effort** M
- **stack** Go, Postgres, NATS, Terraform

Parses plan JSON on a schedule, diffs against last-known-good, and correlates
against your own apply history so a change *you* made doesn't wake anyone up. The
correlation is the idea; plain drift detection already exists.

**Devlog seeds:** cutting the plan parser from 900ms to 40ms · what counts as
"explained" · why this is not just `terraform plan` in cron.

## pulse

**A terminal dashboard for Prometheus.** PromQL in, sparklines out, no browser.

- **domain** software · **status** — · **effort** M
- **stack** Go, Bubble Tea, Prometheus HTTP API

The most *shareable* thing on this list. TUIs get stars. Braille-character
sparklines, a query editor with completion, saved dashboards as TOML. Small enough
to actually finish, which matters for a portfolio.

**Devlog seeds:** rendering sparklines in braille · autocompleting PromQL without
a parser · making a TUI that survives a resize.

## helmwright

**Typed Helm chart scaffolding in TypeScript.** Charts you can refactor.

- **domain** software · **status** — · **effort** M
- **stack** TypeScript, Kubernetes, Helm

Your TypeScript credential, and an opinion worth having in public: Go templates
over YAML is the wrong abstraction. Overlaps with cdk8s — differentiate by
targeting *Helm output* so it drops into existing pipelines rather than replacing
them.

**Devlog seeds:** the case against templating YAML · generating types from CRDs ·
what cdk8s gets right and what I wanted instead.

## voron-24

**Self-sourced 350mm CoreXY build.** Full BOM, wiring, every mistake.

- **domain** hardware · **status** — · **effort** L
- **spec** Volume `350³` · Kinematics `CoreXY` · Extruder `Clockwork 2` ·
  Hotend `Dragon UHF` · MCU `Octopus Pro` · Firmware `Klipper`

Only if you actually want to build one. The `<BOM>` component was designed for
this, and self-sourced builds make excellent long-form content — but don't
manufacture a build to fill a page.

**Devlog seeds:** the BOM, and where I deviated · gantry squaring, twice ·
first layer, day one vs day thirty · what I'd source differently.

---

# CANDIDATES — SOFTWARE

## respawn

**A Kubernetes operator for game servers.** Declare a Minecraft, Valheim, or
Factorio server as a CRD; get scheduling, persistence, backups, and scale-to-zero
when nobody's online.

- **domain** software · **effort** L
- **stack** Go, controller-runtime, CRDs, k3s

**The strongest candidate on this list.** Writing a real operator — CRDs, a
reconcile loop, finalizers, status conditions — is a serious platform-engineering
credential, and almost nobody's portfolio has one. It runs on `pi-tower`, it's
genuinely useful to you, and "my Minecraft server scales to zero" is a hook that
gets people to read about controller-runtime.

**Devlog seeds:** anatomy of a reconcile loop · designing the CRD before writing
the controller · scale-to-zero via a connection-sniffing proxy · finalizers and
the backup I nearly deleted · what the operator pattern is actually for.

## spool

**Filament inventory that decrements itself.** NFC tag per spool, a Go API, a small
React frontend; Moonraker reports print completion and grams come off the roll
automatically.

- **domain** software · **effort** M
- **stack** Go, SQLite, React, TypeScript, Moonraker API, NFC

The best software/hardware crossover here. It's a real annoyance solved properly,
it's small enough to finish, and it demonstrates full-stack work — API design,
a device integration, and a UI — in one artifact. Cost-per-print falls out for free.

**Devlog seeds:** why NFC and not QR · the weight math, and humidity · talking to
Moonraker over websockets · what a year of prints actually cost.

## slab

**SLOs as code.** Write an SLO spec; get multi-window multi-burn-rate Prometheus
alert rules, a Grafana panel, and an error budget you can query.

- **domain** software · **effort** M
- **stack** Go, Prometheus, Grafana, CUE or YAML

The most *legibly senior* project here. Anyone hiring for SRE reads "multi-window
burn-rate alerting" and knows exactly what you understand. Pairs with `lookout`
and `pulse`, and gives the site a reason to talk about the Google SRE workbook
without just summarizing it.

**Devlog seeds:** burn-rate alerting, derived from scratch · why single-window
alerts betray you · error budgets for a homelab, only slightly tongue in cheek.

## farm

**Print farm scheduler.** Queue jobs across every printer you own via Moonraker;
route by material, nozzle, and build volume; notify on failure.

- **domain** software · **effort** L
- **stack** Go, React, TypeScript, Moonraker, WebSockets

The natural sequel to `spool`, and it turns "I maintain several printers" into a
distributed-systems problem: scheduling, health checking, retries, partial failure.
That's the same skill set as the infra work, applied somewhere unexpected — which
is exactly what makes a portfolio memorable.

**Devlog seeds:** scheduling is a bin-packing problem · detecting a failed print
without a camera · what happens when a printer lies about its state.

## dashkit

**Grafana dashboards as typed TypeScript.** Compose panels as functions, diff them
in review, generate the JSON.

- **domain** software · **effort** M
- **stack** TypeScript, Grafana API

Everyone who has maintained Grafana has felt this pain: dashboard JSON is
unreviewable. Small, opinionated, immediately useful, and a second strong
TypeScript entry alongside `helmwright`.

**Devlog seeds:** dashboard JSON is not a source format · typing the Grafana schema
without hand-writing it · one dashboard, refactored.

## beacon

**A static status page generated from your own metrics.** Reads Prometheus, writes
HTML, ships to object storage or a cluster. No runtime, nothing to page you when
the status page is down.

- **domain** software · **effort** S
- **stack** Go, Prometheus, static output

The weekend project on this list. Finishable in two evenings, immediately visible
(link it in the site footer), and it makes the "the status page must not share a
failure domain" argument concrete.

**Devlog seeds:** your status page should not run on the thing it monitors ·
90 days of uptime in 4KB of HTML.

## replay

**Record-and-replay HTTP proxy.** Capture real traffic, redact it, replay it against
a build to catch regressions no unit test would.

- **domain** software · **effort** M
- **stack** Go, HTTP/2, TLS

Directly useful for testing `ferry`, which is the right reason to build it —
tooling that exists because another project needed it always writes up well.

**Devlog seeds:** redaction is the hard part · replaying HTTP/2 faithfully ·
finding a bug that no test would have.

## ledger

**Homelab power and cost accounting.** Pull from smart plugs and PDU, join against
electricity rates, answer "what does this cluster actually cost me."

- **domain** software · **effort** S
- **stack** Go, Prometheus, Home Assistant

Small, and the write-up is the deliverable: real numbers for what a six-node Pi
cluster costs to run per month, versus the equivalent in cloud. That post travels.

**Devlog seeds:** what the cluster costs, honestly · the Pi-vs-cloud math, with
receipts · idle draw is where the money goes.

---

# CANDIDATES — INFRA

## bootstrap

**Bare metal to running cluster in one command.** PXE/netboot the Pis, image them,
join k3s, hand off to Flux. Rebuild the whole cluster from an empty SD card.

- **domain** infra · **effort** L
- **stack** Ansible or Talos, PXE/TFTP, cloud-init, Flux, SOPS

This is the project that proves you're an infrastructure engineer rather than
someone who once installed k3s. "I can rebuild my cluster from nothing in twenty
minutes, and here's the recording" is a stronger claim than any diagram.

**Devlog seeds:** netbooting a Pi 5, properly · the case for treating nodes as
cattle at home · secrets bootstrapping without a chicken-and-egg problem ·
destroying the whole cluster on purpose.

## meshwork

**Segmented home network.** VLANs for lab, IoT, and trusted; unbound with local
DNS; WireGuard in; `ferry` at the edge.

- **domain** infra · **effort** M
- **stack** VLANs, unbound, WireGuard, nftables

Unglamorous and load-bearing. Also the natural home for `ferry` — a router
project needs a network to be the router *for*, and the two projects cross-link.

**Devlog seeds:** the VLAN layout, and why · split-horizon DNS without regret ·
IoT devices belong in jail.

## lookout

**The observability stack, and what it actually caught.** Prometheus, Loki, Tempo,
Grafana, Alertmanager — and honest notes on what it has and hasn't found.

- **domain** infra · **effort** M
- **stack** Prometheus, Loki, Tempo, Grafana, Alertmanager

Everyone posts their stack; almost nobody posts the *incidents*. Writing up three
real homelab outages — what fired, what didn't, what the graph looked like — is
the most differentiated SRE content you could publish.

**Devlog seeds:** the alert that fires too often · a homelab postmortem, written
properly · retention math on a Pi · what I stopped monitoring.

## holdfast

**Backups you have actually restored from.** restic to local and offsite, with
scheduled restore drills that fail loudly.

- **domain** infra · **effort** M
- **stack** restic, S3-compatible storage, CronJobs

The restore drill is the whole point and the whole story. "I restore from backup
monthly and here's the automation that proves it" is a claim most engineers can't
make, which is precisely why it's worth writing.

**Devlog seeds:** an untested backup is a rumor · restoring the cluster from
nothing, timed · what I lost before I started doing this.

---

# CANDIDATES — HARDWARE

## chamber

**Instrumented printer enclosure.** ESP32, chamber temp and humidity, filtration,
power monitoring — all scraped into Prometheus alongside the servers.

- **domain** hardware · **effort** M
- **stack** ESP32, ESPHome, Home Assistant, Prometheus

The cleanest bridge between the two halves of the site: printer telemetry sitting
on the same Grafana as the cluster is a genuinely good image, and it makes the
hardware content *technical* rather than merely a build log.

**Devlog seeds:** printers on the same dashboard as the servers · does chamber
temperature actually matter · a filament dryer with a control loop.

## festoon

**A holiday lighting controller that stays powered on.** Diagnose why the current one
doesn't, then build a replacement informed by the answer.

- **domain** hardware · **status** planned · **effort** M
- **stack** ESP32, WLED, QuinLED, Home Assistant

Real problem, already happening: the permanent run's QuinLED ESP32 drops power
unpredictably, and the show has to run unattended in the cold every night in December.
Strong content because it's a genuine diagnosis with several plausible causes — brownout
under peak load, insufficient power injection, Wi-Fi power management, cold and
condensation, or a degrading supply — and the honest approach is instrumentation before
parts.

**Devlog seeds:** the controller that won't stay up · logging voltage at both ends of the
run · what full white actually draws · reset reasons, correlated against the show ·
designing the replacement from the graph · an enclosure for a wet December.

## rack

**The printed 10" rack, designed properly.** Parametric, printable, with the STL
and CAD published.

- **domain** hardware · **effort** M
- **stack** Fusion 360 or OpenSCAD, PETG/ASA

Split this out of `pi-tower` so hardware gets a proper design page: airflow,
material choice under sustained heat, cable management, iteration. This is the
project the `<Stl>` viewer exists for — let people spin the part in the page.

**Devlog seeds:** rack v1 through v4 · PETG was the wrong material · designing
around airflow you can't simulate · the STL, and what to change before you print it.

## sortbrick

**Lego sorting machine.** A printed feeder and conveyor, a camera, and a small
classifier that sorts parts into bins.

- **domain** hardware · **effort** XL
- **stack** OpenCV, PyTorch or ONNX, Klipper-adjacent motion, printed mechanism

Ambitious and probably the single most fun thing here — mechanical design,
computer vision, and Lego in one project. Scope it hard: v1 sorts into *two* bins
by color and nothing more. Even a partial build is excellent content, and the
failure modes are entertaining, which most portfolio projects are not.

**Devlog seeds:** two bins, by color, badly · why the feeder jams · training on
photos of my own bricks · the part where I gave up on the conveyor.

---

# WRITING SEEDS

Free-standing posts — `kind: essay` or `note`, no parent project. Enough here to
keep the log alive between build milestones.

- Configuration is a programming language whether you like it or not
- What six years of on-call taught me about alert design
- The homelab is not a datacenter, and pretending otherwise costs you weekends
- Go's error handling is fine, actually — a defense from someone who writes it daily
- What I look for in a runbook
- Reading the source is a skill, and it's learnable
- On-call as a manufacturing process: WIP limits for incidents
- Why I still write YAML by hand, and where I stopped
- The video game design problem hiding in every alerting system
- Buying a 3D printer will not save you money, and other things I tell people
- Kubernetes at home is educational, not sensible — a defense of doing it anyway
- Everything I got wrong in my first year of SRE

---

# SEQUENCING

A defensible order, assuming the site launches with three or four projects:

1. **ferry** — start now, write day one before the code exists.
2. **pi-tower** — write it up retroactively; the material already exists.
3. **beacon** — a weekend, ships something visible, links from the footer.
4. **pulse** — small, finishable, and the most likely to get shared.
5. **respawn** — the credential project. Start once the site has momentum.
6. **spool** → **farm** — the crossover pair, once printers have a project page.
7. **slab** and **lookout** — the SRE pair; they cross-link tightly.
8. **sortbrick** — when you want something joyful with a real chance of failing.

Two constraints worth respecting: don't run more than **two active projects** at
once (status chips stop meaning anything otherwise), and don't publish a project
page with an empty devlog — one entry minimum, or it reads as abandoned.
