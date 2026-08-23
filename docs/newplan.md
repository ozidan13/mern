# FullStack Academy — Master Blueprint
## A Best-of-Both Synthesis of `KIMI.md` and `plan.md`

**Document status:** Ratified master plan — **supersedes** `docs/KIMI.md` and `docs/plan.md` (both retained as analysis records)
**Date:** August 23, 2026
**Technology baseline:** August 2026 (pinned and verified — §2.5)
**Product:** Standalone, production-grade educational platform for the modern JavaScript full-stack
**Curriculum stack (exclusive):** React.js · Node.js · Express.js · Next.js · MongoDB · PostgreSQL · Prisma ORM

**Sources synthesized:**

| Source | Reference project analyzed | Core strength contributed |
|---|---|---|
| `docs/KIMI.md` | The **Algorithms & Data Structures interactive course** (this repository: Week1–4 lessons, `tasks/`, `scripts/`, `notifications/`) | Narrated step-through visualizers, analogy-first pedagogy, line-by-line code anatomy, deep data model, lesson-player UX |
| `docs/plan.md` | The **Design Patterns lecture pages** (`reference/*.html`) | Concept-first lesson template, verified version baseline, three-tier sandbox, Technology Registry, monorepo structure, metrics & risks |

---

## Table of Contents

- **Part 0 — The Review:** comparative assessment · gap analysis · decision log (conflicts resolved)
- **Part 1 — Unified Reference Analysis** (both reference projects)
- **Part 2 — Product Definition** (vision · problem · personas · principles · baseline · scope · metrics)
- **Part 3 — Information Architecture** (site map · content model · URLs)
- **Part 4 — The Complete Curriculum** (lesson anatomy · all 11 tracks)
- **Part 5 — Practical Projects**
- **Part 6 — Exercises & Assessments**
- **Part 7 — Interactive Learning & Code Execution**
- **Part 8 — Search Architecture**
- **Part 9 — Internal Reference Documentation**
- **Part 10 — Content Versioning**
- **Part 11 — Technical Architecture**
- **Part 12 — Database Design**
- **Part 13 — API Architecture**
- **Part 14 — Authentication & Authorization**
- **Part 15 — Admin CMS**
- **Part 16 — UX Architecture & Student Journey**
- **Part 17 — UI Architecture & Design System**
- **Part 18 — Performance Architecture**
- **Part 19 — Security Architecture**
- **Part 20 — Accessibility**
- **Part 21 — Responsive Design**
- **Part 22 — Project Structure**
- **Part 23 — Testing Strategy**
- **Part 24 — Development Roadmap (18 Phases)**
- **Part 25 — Prioritization, MVP & Post-MVP**
- **Part 26 — Content Production Strategy**
- **Part 27 — Quality Requirements & Traceability**

---

# Part 0 — The Review

This part is the actual review: an honest assessment of each source plan, followed by a decision log that resolves every conflict between them. The rest of the document is the merged result — it contains no unresolved either/or choices.

## 0.1 Comparative scorecard

| Dimension | `KIMI.md` | `plan.md` | Winner |
|---|---|---|---|
| Reference analysis depth | Excellent — analyzed the *interactive* algorithms course (the richer reference) | Good — analyzed the static design-pattern pages | **KIMI** |
| Pedagogical pattern extraction | Excellent — narrated stepper, execution log, analogy block, code anatomy | Good — concept-first template, "Simply" box, pros/cons, code-step | **KIMI** (its reference had more to teach) |
| Technology baseline | Weak — era-level ("React 19.x era", "Next 15/16-era") | Strong — pinned versions with status notes | **plan** |
| Lesson anatomy | Six-beat spine (intuition→…→code anatomy) | Seven-section Learning Loop (Learn→…→Prove→Production Notes) | **Merge** (§4.2) |
| Curriculum detail | Course/module level | Module/lesson level with volume table | **plan** |
| Data model | Excellent — typed prerequisite graph, version chains, question pools | Excellent — polymorphic version snapshots, Technology Registry, UUIDv7 | **Merge** (§12) |
| Content versioning | Pattern labels, review cadence, supersede banners | Technology Registry, staleness dashboard, immutable snapshots | **Merge** (§10) |
| Sandbox architecture | Two tiers (browser, server containers) | Three tiers — Tier 0 static fallback + in-browser PGlite | **plan** |
| Search | Postgres FTS, weighted tsvector, honest swap seam | Postgres FTS → Atlas scale path, error-code routing | **Merge** (§8) |
| MongoDB justification | Telemetry only, with an honest "drop it if unneeded" note | Telemetry + search index as derived stores | **Merge** (§11.4) |
| Repo architecture | Single app + runner directory | pnpm monorepo (apps + packages) | **plan** |
| UX specification | Excellent — three-pane lesson player, formal states | Good — flows, command palette, reading rules | **KIMI** (player) + **plan** (flows) |
| Design system | Token categories, per-tech accents | Concrete tokens, typography scale, code-block spec | **plan** |
| Success metrics | Absent | Present (§2.7 equivalent) | **plan** |
| Risk register | Absent | Present | **plan** |
| Assessments | Variant pools, mastery model | Spaced repetition, placement quizzes | **Merge** (§6) |
| Traceability appendices | Deliverables map | Deliverables + requirements traceability | **plan** |

## 0.2 What each plan is missing

**`KIMI.md` gaps:** unpinned technology versions (will rot silently) · no success metrics · no risk analysis · no static fallback if sandboxes fail · SQL exercise infrastructure unspecified · thinner curriculum lesson detail · no spaced repetition · single-repo layout underserves sandbox isolation.

**`plan.md` gaps:** analyzed the *weaker* reference, so it under-exploits the algorithms project's crown jewels (narrated stepper, execution log, state-colored visualizations) · content blocks lack first-class `analogy` and `codeAnatomy` types · data model lacks typed prerequisite edges and question variant pools · lesson-player layout unspecified · no per-lesson review cadence.

Both agree — remarkably — on: the hybrid Git+DB content pipeline, Postgres as system of record, a separate Express runner service, WCAG 2.2 AA, an 18-phase roadmap, and the lesson-loop pedagogy. The plans are compatible by construction; this synthesis is a merge, not a compromise.

## 0.3 Decision log — every conflict, resolved

| # | Topic | Conflict | **Decision** | Rationale |
|---|---|---|---|---|
| D1 | Reference basis | Different references analyzed | **Both references, one analysis** (Part 1) | Each reference teaches different patterns; union is strictly stronger |
| D2 | Tech baseline | Era-level vs pinned | **Pinned versions** (§2.5) + annual re-baseline epic | "Teaches: Next 16.3" is verifiable; "Next 15/16-era" is not |
| D3 | Lesson anatomy | Six-beat vs Learning Loop | **Learning Loop frame, KIMI signature blocks inside** (§4.2) | The Loop adds Practice/Prove/Production layers; analogy + codeAnatomy are the soul |
| D4 | Curriculum hierarchy | Course-level vs Level-level | **Path → Track → Level → Module → Lesson** + typed graph edges | Levels make the beginner→production gradient a first-class, progress-gated object |
| D5 | Version snapshots | `LessonVersion` per-lesson vs polymorphic `ContentVersion` | **Polymorphic `ContentVersion`** (lessons, docs, exercises, projects) | One versioning mechanism for all content types; less schema, same power |
| D6 | Version truth | Pattern labels + review cadence vs Technology Registry | **Both, unified** (§10) | Registry *detects* drift; labels *communicate* it; cadence *prevents* it |
| D7 | Search engine | Postgres-only vs Postgres→Atlas | **Postgres FTS at MVP, Atlas Search behind the seam at scale** (§8) | Operationally honest now, relevance headroom later — the Track-8 decision framework applied to ourselves |
| D8 | Sandbox tiers | 2 tiers vs 3 tiers | **3 tiers** (§7.2) | Tier 0 (static fallback) means *learning is never blocked by infrastructure*; PGlite removes all SQL-exercise server cost |
| D9 | MongoDB role | Telemetry-only vs telemetry+search | **Telemetry + search index when Atlas is adopted; derived stores only, with the honesty note kept** (§11.4) | Both uses are textbook Mongo; neither is load-bearing |
| D10 | Repo shape | Single app vs monorepo | **pnpm monorepo: `apps/web` + `apps/sandbox` + `packages/*`** (§22) | The runner must share *nothing* with web except contracts; content schemas must be shared by CI, CMS, and renderer |
| D11 | Auth implementation | Hand-rolled vs Auth.js v5 | **Auth.js v5 (database sessions) + KIMI's hardening specifics** (§14) | Avoids bespoke-auth bug classes while keeping token-hash storage, sliding expiry, revocation |
| D12 | API style | Actions+REST vs REST-only | **Server Actions for own-UI mutations; REST route handlers for everything else** (§13) | The same judgment the curriculum teaches; idempotency keys on submissions |
| D13 | Lesson player | Three-pane spec vs unspecified | **KIMI's three-pane player + plan's command palette & reading rules** (§16) | Complementary — one is layout, the other is navigation behavior |
| D14 | MVP breadth | 5 partial tracks vs Foundations+React only | **plan's tight MVP + KIMI's journey smoke-test framing** (§25.2) | Prove the full loop on one path before scaling content |
| D15 | Assessment extras | Variant pools vs spaced repetition | **Both** (§6.3) | Variants prevent answer memorization; SR drives long-term retention |
| D16 | Metrics & risks | Absent vs present | **Adopted** (§2.7, §27.2) | A plan without measurable goals and named risks is a wish |

> Every other decision in this document traces to one of these sixteen rulings.

---
# Part 1 — Unified Reference Analysis

Two reference projects were analyzed. They teach *different* lessons, and the platform inherits from both.

## 1.1 Reference A — the Algorithms & Data Structures course (repository root)

A static, dependency-free, bilingual (colloquial Arabic + English) interactive course on *Grokking Algorithms*: 4-week roadmap, 16 lessons, 4 applied mini-projects (`tasks/`), 16 narration scripts, a context-aware notification system.

**Proven patterns extracted:**
1. **The narrated step-through visualizer** — every algorithm is a manual/autoplay stepper (600ms ticks) over state-colored data (default / in-range / mid / found / eliminated), paired with a scrolling **execution log** that narrates *what just happened* in plain language. This is the single most valuable pattern in either reference.
2. **Analogy-first explanations** — every concept opens with a real-life analogy (binary search as dictionary lookup) before any formalism.
3. **Line-by-line code anatomy** — code panels synced with per-line explanations. Rare and genuinely valuable.
4. **Rigorously consistent lesson template** — nav → hero → concept → numbered mechanics → worked example → complexity analysis → interactive demo → annotated code.
5. **Per-section color identity** (week colors) and **contextual tips** (`notifications/messages.json` keyed by lesson).

**Structural failures to fix:** no persistence/accounts · no search · no curriculum navigation (no sidebar, prev/next, breadcrumbs, TOC — mobile has *no* nav at all) · no editable code or real practice · tasks are unlinked islands · monolithic per-page HTML (no build, no components, duplicated head/theme) · no versioning · partial accessibility (no reduced-motion, color-only states, no ARIA on demos) · code blocks not cleanly copyable.

## 1.2 Reference B — the Design Patterns lecture pages (`reference/*.html`)

Single-concept "ultimate guide" pages (Composite, Command, Adapter) from a university course: definition → intuition → analogy → SVG model → role cards → numbered code construction → pros/cons → exam link.

**Proven patterns extracted:**
1. **Concept-first sequencing**: definition → plain-language restatement ("ببساطة/Simply" box) → structure → step-built code → trade-offs → assessment hook.
2. **Trade-off teaching** — dedicated pros/cons sections; every pattern has a cost.
3. **Explanation-beside-code step cards** — rationale first, then code.
4. **Terminal-chrome code windows** (macOS dots + filename tab).
5. **Hand-authored SVG conceptual diagrams.**

**Failures to fix:** flat IA (pages are islands; only an exam link connects them) · mobile nav absent (`hidden md:flex` with no alternative) · 100vh decorative heroes before content · AOS animations ignore `prefers-reduced-motion` · contrast failures (`slate-500` on `#020617` ≈ 3.6:1) · Tailwind Play CDN + hand-colored `<pre>` spans + mixed Font Awesome versions · per-page theme drift (`brand.primary` vs `neon.green`) · no states (empty/loading/error) · zero interactivity beyond scroll-reveal.

## 1.3 Unified verdict — Keep / Improve / Discard

**KEEP (and systematize):** analogy-first blocks · narrated stepper + execution log · line-by-line code anatomy · step-built code with rationale · plain-language "Simply" restatements · pros/cons trade-off sections · per-technology color identity · contextual tips · terminal-chrome code frames · custom SVG diagrams · assessment attached to every lesson.

**IMPROVE:** anchored nav → sidebar tree + TOC + breadcrumbs + prev/next · static code → copyable, server-highlighted, runnable, editable · exam cliff → inline exercises/quizzes with instant feedback · fixed demos → narrated visualizers with "what happens if…?" experiments · per-page themes → one token system, dark/light · CDN animations → native, reduced-motion-gated · hardcoded bilingual text → content-layer localization (Arabic as first post-MVP locale).

**DISCARD:** Tailwind Play CDN · hand-colored spans · icon-font CDNs · monolithic per-page HTML · glassmorphism as structure · 100vh decorative heroes · mobile-invisible navigation · color-only state encoding.

---
# Part 2 — Product Definition

## 2.1 Vision

> **One website. Zero external tabs.** A student goes from "I know some JavaScript" to "I can design, build, secure, and deploy a production full-stack application" entirely inside this platform — reading, watching concepts visualized, writing real code, passing assessments, and building portfolio-grade projects.

Not a link farm, not a video course: every concept fully explained internally, every example runnable, every skill practiced, every module assessed. A **developer platform** (docs-grade UI) with a **curriculum brain**.

## 2.2 Problem statement

1. **Fragmentation** — technologies taught as islands; nothing explains how they compose into an architecture.
2. **Staleness** — tutorials teach 2–4-year-old patterns while the ecosystem has moved (React Compiler, Next 16 Cache Components, Express 5, Prisma 7, Postgres 18, MongoDB 8).
3. **Passivity** — reading/watching without doing produces tutorial hell.
4. **Reference sprawl** — official docs assume expertise; beginner tutorials never go deep; no graduated bridge lesson → reference.

## 2.3 Personas

| Persona | Background | Primary needs |
|---|---|---|
| **Absolute Beginner Amira** (primary) | CS-adjacent, no web dev | Gentle on-ramp, no assumed knowledge, heavy feedback, mobile reading |
| **Bootcamp Grad Bilal** (primary) | Some React+Express, shallow fundamentals | Depth, "why" sections, modern-vs-legacy labels |
| **Junior Dev Chen** | 1 yr on an older codebase | Migration content, architecture track, version-diff annotations |
| **Interview Prep Dana** | Builds comfortably, needs rigor | Challenges, quizzes, common-mistakes galleries, per-topic interview questions |
| **The Mobile Studier** | 20–40 min/day on a phone | Excellent mobile reading UX, bite-sized progress, offline-tolerant pages |
| **Author/Reviewer (admin)** | Maintains curriculum | CMS, versioning, deprecation tooling, publish workflow — no redeploys |

Beginner delight without boring juniors is solved by **layered lesson depth** (§4.2): a core path plus collapsible Deep Dive and Production Notes layers.

## 2.4 Product principles

1. **Standalone-first** — external links are optional footnotes, never prerequisites.
2. **Learn by doing** — reading is not completing; every lesson ends in practice.
3. **Version-truthful** — every lesson declares the versions it teaches; outdated patterns are labeled *Legacy*, never presented as current.
4. **Progressive depth** — Beginner → Intermediate → Advanced → Production, within tracks and within lessons.
5. **Architecture-minded** — the full-stack architecture track is the connective spine.
6. **Developer-platform feel** — fast, keyboard-first, dark/light, excellent code presentation.
7. **Content is data** — structured, versioned, searchable, CMS-editable; never hardcoded.
8. **Honest scope** — only the seven technologies; ecosystem libraries appear only where unavoidable, labeled *ecosystem*.
9. **Intuition before formalism** — analogy and "why it exists" before mechanics (Reference A's soul).
10. **Production is the default lens** — security, validation, errors, testing, performance taught *with* each topic.

## 2.5 Technology baseline — August 2026 (pinned)

| Technology | Teaching baseline | Status notes |
|---|---|---|
| React | **19.2.x** | Function components + Hooks only; React Compiler v1.0 is the default performance story; `forwardRef` legacy (ref-as-prop); Actions, `use`, `useActionState`, `useOptimistic` current |
| Next.js | **16.3** (Active LTS) | App Router only as default; Turbopack default; Cache Components / `use cache`; `proxy.ts` replaces `middleware.ts`; Pages Router = one legacy module |
| Node.js | **24 LTS "Krypton"** | Node 26 call-outs where relevant; `node:test`, `--watch`, native `fetch`, `--env-file`, permission model |
| Express | **5.2.x** | Rejected-promise forwarding, path-to-regexp v8, `req.query` getter; Express 4 patterns labeled legacy |
| MongoDB | **8.3** | Native driver first; Mongoose later, labeled ecosystem |
| PostgreSQL | **18.x** | UUIDv7, virtual generated columns, async I/O noted where useful |
| Prisma | **7.9.x** | Rust-free client + driver adapters, `prisma.config.ts`; Prisma 8 tracked, not the baseline |

**Language policy:** TypeScript is the default professional language from Track 1 onward (after JS fundamentals); SQL and the Prisma schema language taught natively. The quarterly/annual re-baseline process lives in §10.5.

## 2.6 Scope

**In scope (curriculum):** the seven technologies + exactly the foundations they require (JS, async, HTTP/REST, JSON, client/server, DB fundamentals, auth fundamentals).
**In scope (platform):** learning paths, layered lessons, runnable code, exercises, quizzes/assessments, projects with milestones, internal reference docs, comparison & architecture content, search, progress, bookmarks/notes, achievements, accounts, admin CMS, content versioning.
**Out of scope:** all other frameworks/databases/languages (Vue, Angular, Laravel, Django, Firebase, Supabase, MySQL, Redis, GraphQL, PHP…), video hosting, forums, payments, native mobile, accredited certificates.
**Ecosystem libraries policy:** `zod`, `argon2`/`bcrypt`, `pino`, `vitest`/`@testing-library`/`playwright`, `react-hook-form` (after native Actions), `mongoose` (after native driver), Tailwind (after CSS fundamentals) — tools, never tracks.

## 2.7 Success metrics

| Category | Metric | Target (6 mo post-launch) |
|---|---|---|
| Engagement | Median lessons completed / active student / week | ≥ 4 |
| Effectiveness | Module quiz first-attempt pass rate | 60–80% (calibrated) |
| Effectiveness | Exercise completion rate | ≥ 50% |
| Standalone-ness | Outbound educational link CTR | < 2% of lesson views |
| Retention | D30 return of activated students | ≥ 30% |
| Performance | Lesson LCP p75 | < 1.8s |
| Search | Search → content opened within 30s | ≥ 70% |
| Progression | React finishers who start Node | ≥ 40% |

---
# Part 3 — Information Architecture

## 3.1 Site map

```text
/                                  Landing (paths, curriculum overview, search entry)
/paths · /paths/[slug]             Learning-path catalog & detail (Full-Stack, Backend-first, Fast-track)
/learn                             All tracks (status + progress)
/learn/[track]                     Track home (levels, outcomes, prereqs, placement quiz)
/learn/[track]/[module]/[lesson]   Lesson player (the core experience)
/reference · /reference/[tech]/…   Internal docs (tree-nested, version-aware)
/exercises · /exercises/[slug]     Exercise browser + deep-linkable standalone exercises
/challenges                        Challenge hub (weekly + interview-prep sets)
/projects · /projects/[slug]       Project catalog + brief/milestones/rubric
/comparison                        MongoDB vs PostgreSQL hub (Track 8)
/architecture                      Architecture hub (Track 9 + lifecycle steppers)
/playground                        Free sandbox (JS/TS/React/SQL/Mongo)
/search                            Unified search
/dashboard[/progress|/bookmarks|/notes|/achievements]
/login · /register · /forgot-password · /settings
/admin[/content|/exercises|/projects|/reference|/search|/users|/analytics|/versions]
/api/*                             Route handlers (§13)
/about · /roadmap · /changelog     Trust + transparency
```

## 3.2 Content model hierarchy

```text
LearningPath (ordered tracks + rationale)
└── Track (= Technology × full level span)
    └── Level (1 Foundations · 2 Intermediate · 3 Advanced · 4 Production) — first-class, gated by projects
        └── Module (cohesive skill unit, ends with assessment)
            └── Lesson (atomic teachable unit)
                ├── objectives · est. time · version chips
                ├── ContentBlock[] (typed, ordered — §4.2)
                ├── Exercise[] (difficulty ladder)
                └── Quiz (checkpoint)
        └── LevelProject            └── TrackCapstone
```

**Cross-cutting graph edges** (what makes it an ecosystem, not a book):
- `LessonEdge` typed prerequisites (`REQUIRES` | `RECOMMENDS`) — powers soft gating, placement quizzes, and "you should know X first" banners.
- `LessonLink` symmetric cross-track relations ("same concept, server-side") with a stated reason.
- `applies-in` concept → project backlinks ("Where you'll use this").
- `supersedes` content-version chains (§10).

## 3.3 URL architecture

- Human-readable stable slugs; immutable once published — renames create `Redirect` rows so bookmarks never break.
- Pinned versions addressable (`?v=3`); deprecated versions carry banners and are de-ranked in search.
- Public content server-rendered and indexable; `/dashboard`, `/admin`, `/settings` are `noindex`.
- Error pages get predictable URLs (`/reference/prisma/errors/P2002`) — search routes error-code queries straight to them (§8).

---
# Part 4 — The Complete Curriculum

**Scale (full build-out):** 11 tracks · ~117 modules · **≈ 480 lessons** · ≈ 580 exercises · ≈ 1,280 quiz items · 13 projects. The platform architecture supports this volume from day one; content ships incrementally per the roadmap (§24).

**Default path ordering (Full-Stack Developer):** `0 Foundations → 1 React → 2 Node → 3 Express → 5 MongoDB → 6 PostgreSQL → 7 Prisma → 8 DB Comparison → 4 Next.js → 9 Architecture → 10 Projects` — frontend-first, then backend, then data, then Next.js as the capstone framework. Alternative presets: **Backend-first** and **Fast-track** (placement quizzes to skip ahead). Prerequisites are modeled per module and enforced *softly* (warnings, not locks).

## 4.1 Lesson anatomy — the Learning Loop (merged template)

Every lesson in every track follows one formalized structure: plan.md's seven-section **Learning Loop** as the frame, with KIMI.md's signature blocks embedded as first-class citizens.

```text
┌────────────────────────────────────────────────────────────────┐
│ HEADER  breadcrumbs · level badge · est. time · version chip   │
│         ("Teaches: React 19.2 · reviewed Jul 2026") · pattern  │
│         label (Recommended / Acceptable / Legacy / Deprecated) │
│         title · one-sentence summary · "In plain terms…" box   │
├────────────────────────────────────────────────────────────────┤
│ 1. LEARN    concept, fully explained internally                │
│             ▸ ANALOGY block (the signature move: why it        │
│               exists + a concrete real-life analogy)           │
│             ▸ prose, callouts, tables, terminology cards       │
├────────────────────────────────────────────────────────────────┤
│ 2. SEE      NARRATED VISUALIZER — step-through with manual/    │
│             autoplay + scrub timeline + plain-language         │
│             execution log; state-colored cells; worked example │
├────────────────────────────────────────────────────────────────┤
│ 3. TRY      editable, runnable PLAYGROUND + "what happens      │
│             if…?" EXPERIMENT toggles (predict before reveal)   │
├────────────────────────────────────────────────────────────────┤
│ 4. CODE ANATOMY  implementation with per-line explanation,     │
│             synced line highlighting                           │
├────────────────────────────────────────────────────────────────┤
│ 5. DEEP DIVE (collapsible)  internals, performance notes,      │
│             legacy-vs-modern comparison                        │
├────────────────────────────────────────────────────────────────┤
│ 6. PRACTICE exercises (Easy→Medium→Hard→Challenge) +           │
│             Common-Mistakes gallery (broken→diagnose→fix)      │
├────────────────────────────────────────────────────────────────┤
│ 7. PROVE    checkpoint quiz (3–6 items, instant feedback,      │
│             wrong answers link back to the teaching section)   │
├────────────────────────────────────────────────────────────────┤
│ 8. PRODUCTION NOTES (collapsible)  real-world patterns,        │
│             interview questions, internal links                │
├────────────────────────────────────────────────────────────────┤
│ FOOTER  Prev/Next · Mark complete · Bookmark · Note ·          │
│         "Where you'll use this" project teaser                 │
└────────────────────────────────────────────────────────────────┘
```

**Unified content block set** (typed JSON, zod-validated — never raw HTML):
`heading · prose · analogy · callout(info|warning|pitfall|legacy|version) · code(static|runnable) · code-anatomy · code-step · visualizer · playground · experiment · before-after · diagram · comparison-matrix · table · list · terminology · tabs · accordion · quiz-embed · exercise-embed · project-link · api-signature · checklist`

## 4.2 Track 0 — Foundations

*Everything the stack requires — nothing more. Every module ends with "where you'll use this".*

| Level | Modules |
|---|---|
| **L1 Web & JS Basics** | How the Web Works (client/server, HTTP, status codes, request-lifecycle stepper) · JS Essentials (types, functions, arrays/objects + core methods) · Functions/Objects/Scope deep-dive (closures, `this`, reference vs value) · Modern JS (ESM vs CJS, optional chaining, iterators, TC39) · **Async JS** (call stack → event loop → microtasks — *the narrated stepper's flagship reuse* — callbacks→Promises→async/await, `Promise.all/…`, `AbortController`, `fetch`) · Data & JSON · Developer Tooling (npm, DevTools, Git, *reading error messages as a skill*) |
| **L2 Servers, Data & Auth (concepts)** | REST & APIs · Databases Primer (same app modeled relationally AND as documents) · Authentication Fundamentals (sessions vs tokens, hashing vs encryption) · Security Fundamentals (OWASP tour: XSS/CSRF/injection as concept+analogy+one example) · **TypeScript Bridge** (types, interfaces, generics at working level — unlocks TS in every later track) |

**Assessments:** "Trace the request" ordering exercise · JS quiz · mini-project (static page + JSON API client in vanilla JS) · design-a-todo-API exercise.

## 4.3 Track 1 — React.js *(baseline: React 19.2 — function components only; class components appear once, labeled Legacy)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Fundamentals** | Thinking in React (UI = f(state)) · JSX deeply · Props · Lists & Keys (why identity matters — state-loss demo) · `useState` (snapshot model, batching, updater form, derived state) · Events & Forms · Composition · Styling in React | **Project: Task Manager** |
| **L2 Intermediate** | `useEffect` (synchronization mental model, deps, cleanup, races, effects-you-don't-need) · State Management Thinking · Context (re-render containment) · `useReducer` · `useRef` (incl. ref-as-prop, `forwardRef` legacy) · **Custom Hooks** (rules-of-hooks visualized; build `useLocalStorage`/`useFetch`/`useDebounce`) · Forms in Depth (**Actions, `useActionState`, `useOptimistic`**) · Data in React (server-state thinking; Suspense-ready patterns) | **Project: Movie Browser** |
| **L3 Advanced** | Rendering Model (reconciliation visualized, StrictMode) · Performance I — Measuring (Profiler) · Performance II — the 2026 model (**Compiler-era memoization**, transitions, deferred values) · Concurrent Features & Suspense · Lazy + Error Boundaries (modern `onCaughtError`) · Advanced Patterns (compound components, headless thinking) · State Architecture decision tree · React Internals (fibers, lanes — diagrammed) | **Project: Kanban board** with Profiler-verified render report |
| **L4 Production** | Project Architecture (feature slicing) · Component API Design · Testing React (Vitest + Testing Library; Playwright concepts) · Accessibility in Practice · Debugging & Tooling · **Anti-Patterns Catalog** (the 20 real mistakes, broken→diagnosis→fix) · React in the Wild | **Capstone: tested, accessible component library + demo app against a performance budget** |

**Interactive highlights:** render-tree visualizer · hooks call-order stepper · batching playground · "break the rules of hooks and see the error" experiments · context re-render heatmap.

## 4.4 Track 2 — Node.js *(baseline: Node 24 LTS, ESM-first, CJS as legacy interop)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Fundamentals** | What Node Is (V8 + libuv — *why it behaves as it does*) · Modules & npm (lockfiles, semver, workspaces, dependency security) · **The Event Loop** (six phases, microtasks, `nextTick` vs `setImmediate` — flagship narrated stepper) · Files & Buffers · Environment & Config (12-factor) | — |
| **L2 Building with Node** | HTTP Servers (raw `node:http` — *so Express makes sense later*) · **Streams** (backpressure visualized, pipeline, real file-processing) · Events (EventEmitter, listener leaks) · Error Handling (taxonomy, async propagation, honest `uncaughtException` rules) · Debugging & Testing (`node:test`, inspector, `--watch`) · Concurrency (worker_threads, child_process) | — |
| **L3 Production Node** | Production Architecture (layering, DI by hand, graceful shutdown) · Logging & Observability (structured logs, correlation IDs) · Background Jobs (**pg-boss on PostgreSQL** — stays in-stack; retries, backoff, idempotency) · Security (permission model, non-root, dependency risk) · Performance (event-loop lag, heap snapshots) · Deployment (Docker multistage, SIGTERM choreography) | **Capstone: URL shortener with NO framework** — raw http + streams + workers, Dockerized, tested, logged |

## 4.5 Track 3 — Express.js *(baseline: Express 5.2; v4 differences flagged as legacy sidebars)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Fundamentals** | Hello Express (why after raw Node) · Routing Deeply (path-to-regexp v8 + the 4→5 breaking-changes table) · **Middleware** (the pipeline mental model — conveyor-belt visualizer) · **Request Lifecycle** (one request through N middlewares + error handler — the anchor stepper) | — |
| **L2 Real APIs** | Project Structure (`routes→controllers→services→repositories` with *why*) · Validation (**zod**, boundary placement, error-shape standardization) · REST CRUD (status discipline, offset vs cursor pagination, filtering) · Error Architecture (central middleware, v5 async forwarding vs v4 wrappers) · API Testing (supertest, ephemeral DBs) | — |
| **L3 Production** | Authentication (**sessions vs JWT — the honest comparison**, cookies, refresh, revocation; argon2/bcrypt) · Authorization (RBAC, ownership checks, where enforcement lives) · API Security (headers, rate limiting, CORS properly, CSRF, safe uploads) · Documentation & Versioning (OpenAPI, `/api/v1` strategies, deprecating endpoints) · Production Concerns (config, draining, health checks, statelessness) | **Capstone: Blogs REST API** — Express 5 + zod + JWT + RBAC + tests + OpenAPI, Dockerized |

## 4.6 Track 4 — Next.js *(baseline: 16.3 — App Router only as default; the capstone track)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Fundamentals** | Why Next.js (SPA pain points) · **App Router Mental Model** (Server Components by default, the server/browser boundary — the track's most-revisited diagram, `'use client'` honestly) · Routing (dynamic segments, groups, parallel/intercepting) · Layouts & Navigation UI (build *this platform's* sidebar as the worked example; Instant Navigations) · Data Fetching (async server components, parallel fetching, `loading.tsx`, `error.tsx`) · Client Components & Hydration | — |
| **L2 Full-Stack Next.js** | **Server Actions** (progressive enhancement, `useActionState`, the security model — Actions are POSTs, auth lives inside) · Forms & Mutations (shared zod schemas, `useOptimistic`) · **Caching Model (Next 16)** (Cache Components, `use cache`, four cache layers, `revalidateTag`; why 15→16 got simpler) · Rendering Strategies (static/dynamic/streaming/PPR decision frameworks) · Route Handlers (vs Actions vs separate Express service — decision framework) · **Auth in Next.js** (cookie handling in RSC, **`proxy.ts`** — what replaced middleware, defense in depth) | — |
| **L3 Advanced** | Metadata & SEO (dynamic OG, sitemaps, structured data) · Performance (`next/image`, fonts, bundle discipline, prefetch budget, CWV field vs lab) · Advanced Patterns (Suspense choreography, URL-as-state) · Internationalization (using this platform's own i18n design as the case study) · Testing Next.js · Environments & Config | — |
| **L4 Production** | Deployment Architectures (Vercel vs self-hosted Node vs containers) · Production Architecture (`server-only`, data-access layer with Prisma, cache-key discipline) · Security in Next.js (Action authorization, client-bundle leak prevention) · Legacy Next (Pages Router survival, `middleware.ts`→`proxy.ts` migration, when *not* to migrate) | **Capstone: production SaaS starter** — Next 16 + Prisma + Postgres, auth, RBAC, background job, tests, CI, deployed |

**Interactive highlights:** the **boundary visualizer** (toggle server/client on a component tree; watch what ships to the browser) · cache-layer simulator · rendering-strategy playground.

## 4.7 Track 5 — MongoDB *(baseline: 8.3; native driver first, Mongoose later labeled ecosystem)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Document Databases** | The Document Model (BSON, ObjectId anatomy, *schema-flexible ≠ schema-free*) · First CRUD (Atlas + `mongosh` + Node driver) · Data Types in Practice (dates trap, decimals, null vs missing) | — |
| **L2 Querying & Aggregation** | Find Mastery (`$elemMatch` traps) · Update Operators · Delete & Bulk · **Aggregation I** (`$match→$group→$sort→$project`; SQL↔aggregation translation table) · **Aggregation II** (`$lookup` honestly, `$unwind`, `$facet`, window functions, pipeline optimization) | — |
| **L3 Data Modeling** | **Embed vs Reference** (access-pattern-driven modeling; blog/cart/feed each modeled 2 ways and compared) · Relationships (one-to-few/many/tons, bucketing) · Schema Design Process (4 worked apps + `$jsonSchema` validation) · **Indexes** (B-tree visual, ESR rule, `explain()`, covered queries) | — |
| **L4 Production** | Transactions (when you actually need them; retry logic; compensating patterns) · Architecture (replica sets, sharding, shard keys — literacy, not DBA training) · Operations & Security · Mongoose (ecosystem) · **Common Mistakes** (unbounded arrays, N+1 population, 16MB ceiling, premature sharding) | **Capstone: comment system** — nested replies, votes, hot-ranking aggregation |

**Interactive highlights:** embedding-vs-referencing simulator · index visualizer (watch a query become covered) · **aggregation pipeline stepper** (stage-by-stage document flow — the narrated stepper again).

## 4.8 Track 6 — PostgreSQL *(baseline: 18.x; every lesson runs in the in-browser PGlite playground)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Relational Fundamentals** | The Relational Model (same app relational vs document) · Data Types (money traps, `timestamptz` always, **UUIDv7**, jsonb — the honest middle path) · CRUD & SELECT (`RETURNING`, NULL three-valued logic) · PKs & Constraints (FKs, `ON DELETE` behaviors, generated columns) | — |
| **L2 Professional Querying** | **Joins** (visual "joins produce rows" model, self-joins) · Aggregation (`GROUP BY/HAVING`, `FILTER`) · Subqueries & **CTEs** (recursive CTEs for trees) · **Window Functions** (ranking, running totals, top-N-per-group) · Practical Recipes (keyset vs offset pagination *with benchmarks*, `ON CONFLICT`, FTS preview) | — |
| **L3 Design & Correctness** | Normalization (1NF→3NF worked, deliberate denormalization) · **Transactions & ACID** (isolation levels with live anomaly demos, MVCC intuition) · **Indexes** (composite order, partial/expression/covering, `EXPLAIN ANALYZE` literacy) · Views & Schemas (RLS concepts) · Full-Text Search (tsvector/tsquery, trigram — *the platform's own search, taught*) | — |
| **L4 Production** | Schema Evolution (expand/contract, `CREATE INDEX CONCURRENTLY`) · Performance (pg_stat_statements, pooling, partitioning, vacuum) · Security (roles, RLS multi-tenant case, SQL-injection shown then defended) · Operations (PITR, replication, PG18 tour & PG19 watch) | **Capstone: multi-tenant project-management schema** — migrations, keyset pagination, indexed dashboard query, `EXPLAIN`-analyzed defense report |

**Interactive highlights:** live SQL playground on seeded datasets · join visualizer · execution-plan explorer · **isolation-level anomaly lab** (two concurrent "sessions" — watch dirty reads happen, then fix the level).

## 4.9 Track 7 — Prisma ORM *(baseline: 7.9; framing: "SQL → PostgreSQL → Prisma → Application" — always name the layer)*

| Level | Modules | Gate |
|---|---|---|
| **L1 Fundamentals** | What an ORM Is — and Isn't (**layer map anchor diagram**; trade-offs explicit) · Schema & Models (`prisma-client` generator, driver adapters, `prisma.config.ts`) · **Migrations** (`migrate dev/deploy`, shadow DB, drift detection, baselining, why applied migrations are immutable) · First Queries (`select` vs `include`, generated types, the dev-singleton pattern) | — |
| **L2 Real-World Queries** | Filtering & Sorting (relational filters) · **Relations** (1-1/1-N/M-N, nested reads & writes, the N+1 lesson) · Pagination (offset vs cursor at the ORM layer) · Advanced Modeling (referential actions, enums, `Json` limits, `@@unique`/`@@index`, naming conventions) · Seeding & Import (idempotent seeds, CSV pipeline) | — |
| **L3 Production** | **Transactions** (array vs interactive, isolation realities, optimistic concurrency) · **Error Handling** (P2002/P2025/P2024 → domain errors → HTTP responses) · Prisma + Next.js (server-only rule, pooling, Next-16 cache interplay) · Prisma + Express (repository pattern, request-scoped transactions, ephemeral-DB testing) · Performance & Observability (`$queryRaw` done safely, N+1 detection, pool sizing) · Team Schema Workflows (migration PRs, staying current across majors) | **Capstone: Blogs API data layer rebuilt on Prisma** — schema, migrations, repositories, transactions, seed, tests + `EXPLAIN` before/after report |

**Interactive highlights:** the **layer tracer** (write a Prisma query → watch it become SQL → hit Postgres → return) · N+1 detector playground · migration simulator (edit schema, preview generated SQL).

## 4.10 Track 8 — MongoDB vs PostgreSQL (decision track)

*Short and decisive. Outcome: the student can choose, justify, and defend a database decision.*

| Modules |
|---|
| **D1 The Decision Framework** — modeling philosophy (shape-around-queries vs shape-around-truth), consistency models, the interactive decision tree |
| **D2 Head-to-Head Technical** — joins vs `$lookup`, transactions, indexing models, query-pattern fit |
| **D3 Scale & Operations** — vertical/horizontal paths, operational burden, cloud offerings, cost shapes |
| **D4 Real Scenarios** — 8 guided workshops (content platform, e-commerce orders, analytics events, SaaS multi-tenant, chat, IoT, CMS, booking): requirements → both models designed → defended verdict · "you're wrong if…" reverse cases · the Postgres-jsonb middle path · **hybrid architectures (this platform is one — §11.4)** |

**Assessment:** architecture challenge — defend a database choice under cross-examination-style quiz constraints.

## 4.11 Track 9 — Full-Stack Architecture (the connective spine; prereq: Tracks 1–8)

| Level | Modules |
|---|---|
| **L1 Foundations** | Separation of Concerns (leaky-layer before/after codebases) · SOLID translated to concrete JS-stack practice · Design Patterns for Our Stack (middleware/pipeline, repository, adapter, observer, strategy — and patterns *not* to build) · **The Request Lifecycle Series** — four canonical stacks as interactive full-journey steppers (click any stage → code, data shape, responsibilities, latency budget, error paths): **1)** React SPA + Express + MongoDB · **2)** React SPA + Express + PostgreSQL + Prisma · **3)** Next.js + PostgreSQL + Prisma · **4)** Next.js + MongoDB |
| **L2 Cross-Cutting** | Authentication Architecture (sessions vs JWT decision framework across the 4 stacks) · Authorization Architecture (RBAC/ABAC, enforcement layers, multi-tenant isolation: schema vs RLS vs tenant-id) · Validation & Error Architecture (shared schemas, error envelopes, domain→HTTP→UI translation) · Security Architecture (whole-stack checklist as one system) · Caching Architecture (browser/CDN/app/DB map; Next 16 cache in the big picture) · Scalability & Performance ("10k users" vs "10M users" drawn) |
| **L3 System Design Studio** | Reading Real Architectures (4 autopsy case studies) · Design Exercises (URL shortener, rate limiter, notifications, news feed — trade-off scored) · Maintainability & Clean Architecture (module boundaries, when ceremony doesn't pay) · From MVP to Production (one codebase's evolution, every refactor motivated by real pressure) |

**Capstone:** Architecture Review Board — remediate a deliberately flawed "real" codebase into a full architecture document.

## 4.12 Track 10 — Algorithms & Data Structures for This Stack

*Reference A's home in the curriculum — a focused intermediate course, not a CS degree, every concept taught with the narrated-stepper pattern it pioneered.*

- **Complexity literacy:** Big-O applied to real full-stack code (N+1 as O(n) queries, index lookup as O(log n)).
- **The working set:** arrays · maps/sets (hash tables — Reference A's hash-collision visualizer) · stacks/queues (event loop, middleware chains, BFS) · trees (DOM, component trees, B-tree indexes) · graphs (relationships, dependency graphs).
- **Applied algorithms:** sorting/pagination under the hood · debounce/throttle · search algorithms (why DB indexes exist) · caching/memoization (connecting to React Compiler and Next cache) · recursion (nested comments, folder trees).

---
# Part 5 — Practical Projects

Projects are the **milestone currency**: each level gates on a project, each track on a capstone. Every project ships as: *requirements brief → guided milestones (hints, not answers) → architecture guidance → checkpoints (auto-graded where possible) → self-review rubric → "how a senior would do it" reference solution unlocked after submission.*

**Mandatory project template:** overview & real-world context · numbered functional requirements · user stories · features & explicit non-goals · architecture spec (diagram + stack mapping) · database design (ERD or document model + rationale questions) · API design (endpoints/errors or action map) · authn/authz matrix · folder structure · milestones (each verifiable) · testing minimums · performance budget · security checklist mapped to taught lessons · deployment target & env matrix · starter repo (in-platform playground + downloadable) · rubric · gated reference solution.

| Tier | Projects |
|---|---|
| **Beginner** (1–2 days) | Task Manager (React) · Notes App (React + localStorage) · REST CRUD API (Express) · Auth Starter (Express + Postgres/Prisma) |
| **Intermediate** (1–2 weeks) | Blog Platform (Next + Prisma + Postgres — SSG/ISR, SEO, recursive comments) · E-commerce Storefront (Next + Prisma — cart, transactions) · Admin Dashboard (React + Express + Prisma) · **Learning Management Mini-System** (Next + Mongo — dogfooding our own domain) |
| **Advanced** (2–4 weeks) | Multi-role SaaS (Next + Prisma + Postgres RLS — multi-tenancy, invitations, audit log) · Marketplace (student **defends the DB choice**) · Enterprise Dashboard (permission-scoped data, cursor pagination at scale) · Real-time Collaboration (React + Express + Mongo + WebSocket supporting lesson) |
| **Production capstone** | Full production app from 3 briefs (or student-proposed against criteria): CI/CD, migration discipline, observability, load-test results, security review, 95+ Lighthouse, E2E suite, runbook — graded as *production readiness*, reviewed against the A3 rubric |

---
# Part 6 — Exercises & Assessments

## 6.1 Exercise types

| Type | Validation |
|---|---|
| `code-write` | Automated test suite in the runner |
| `code-fix` (debugging) | Tests pass after fix |
| `code-output` (predict) | MCQ/short answer + explanation |
| `fill-code` | AST-aware blank completion |
| `sql-write` | Result-set equivalence + plan sanity (PGlite) |
| `mongo-write` | Output equivalence (sandbox mongod) |
| `api-build` | Endpoint graded by real HTTP test requests |
| `architecture` | Structured rubric + automated checklist |
| `project-checkpoint` | Deliverable checklist + automated tests |

**Difficulty ladder per lesson:** Easy (apply the lesson) → Medium (combine two concepts) → Hard (judgment/trade-offs, unfamiliar context) → Challenge (interview-level, optional).

**Every programming exercise includes:** statement · requirements · expected I/O · starter code · progressive hints (3 levels, disclosure tracked) · visible-after-submission tests · reference solution · *why* explanation · common-mistakes gallery.

## 6.2 Assessment layers

| Level | Instrument | Passing |
|---|---|---|
| Lesson | Checkpoint quiz (3–6 items) | All correct, unlimited retries, wrong answers link to the teaching section |
| Module | Module assessment (timed, incl. 1 small coding task) | ≥ 70–75% |
| Level | Level project | Rubric + automated checks |
| Track | Capstone + track final | Full rubric |
| Entry | **Placement quizzes** ("skip ahead") | Marks modules complete-by-exemption (recorded, reviewable) |

## 6.3 Retention mechanics (merged — decision D15)

- **Variant pools:** quiz questions belong to pools; retakes draw new variants — answer memorization is impossible.
- **Spaced repetition (SM-2-lite):** missed items enter a review queue; "Review now" cards on the dashboard; every item links back to its lesson anchor.
- **Mastery model:** all assessment events update per-skill mastery — powering the dashboard skill map and "you're ready for X" recommendations.
- **Feedback loop rule:** a wrong answer is a *navigation event*, never a dead end — it always explains why and deep-links to the exact lesson section.

---
# Part 7 — Interactive Learning & Code Execution

## 7.1 Interaction principles

1. **Every interactive is inspectable** — "view the code that draws this" is one click away.
2. **Prediction before revelation** — experiments ask the student to commit to an answer before running (retrieval practice).
3. **Narration is data** — steps emit structured events `{ step, title, description, state }`; the same events drive visuals, the execution log, *and* the `aria-live` accessibility channel.
4. **Stateful but restorable** — playground edits autosave; one-click reset to canonical.
5. **No dead ends** — every interactive links to the exercise that practices the same skill; every failure degrades to a working static fallback.

## 7.2 The three-tier sandbox (decision D8)

```text
┌─ Tier 0: STATIC (universal fallback) ─────────────────────────┐
│ Server-highlighted code + copy button. EVERY embed degrades   │
│ here — learning is never blocked by infrastructure.           │
├─ Tier 1: IN-BROWSER (zero server cost; sandboxed iframe) ─────┤
│ • JS/TS logic + Node-API exercises → Web Worker + esbuild-wasm│
│ • React examples → in-browser bundler (Babel-wasm), live      │
│   preview, hot reload                                          │
│ • PostgreSQL exercises → PGlite (Postgres-in-WASM) with       │
│   per-exercise seeded schemas — full SQL, zero server         │
│ • All visualizers/steppers → pure React components            │
│ Isolation: sandbox="allow-scripts", opaque origin, no cookies/│
│ storage/parent access, postMessage with strict schema,        │
│ worker-based timeout for infinite loops                       │
├─ Tier 2: ORCHESTRATED SANDBOX (server, ephemeral) ────────────┤
│ • Node/Express/API exercises, Mongo aggregations, full-stack  │
│   playground, Next.js labs                                     │
│ • Express 5 "Sandbox Orchestrator" (own deployment, isolated  │
│   network) → queue → Docker worker pool (node:24-slim /       │
│   mongo:8 images): per-run container, NO egress, CPU/mem/PID  │
│   limits, 10–30s timeout, read-only rootfs, non-root, seccomp │
│ • Flow: POST /api/runs → queue → worker → stream results      │
│   (SSE) → destroy. Postgres exercises that outgrow PGlite get │
│   a per-run throwaway schema created+destroyed.               │
└────────────────────────────────────────────────────────────────┘
```

**Untrusted-code rules (non-negotiable):** user code never runs in the app's origin or process · no secrets in worker env · limits enforced *outside* the container · output caps · per-user rate limits + daily quotas · every run logged to the Mongo event store (abuse review) · images rebuilt/scanned weekly · a **sandbox-escape test suite** is a release gate (§23).

## 7.3 Interactive Kit (build-once, data-driven library)

Narrated Stepper engine · Code Playground (browser + server) · SQL Playground (PGlite) · Diagram Renderer (accessible SVG) · Experiment Block ("what happens if…?" — flip a dependency array, remove an index) · Before/After Comparator (synced diff panes) · Checkpoint · Hint Ladder · domain visualizers: **event loop · middleware conveyor · React tree/boundary · cache layers · aggregation pipeline · join animator · isolation-level lab · layer tracer · ERD/document-model designer · EXPLAIN plan explorer**.

---
# Part 8 — Search Architecture

**Goal:** find *concepts*, not just pages — "useeffect cleanup", "P2002", "hydration mismatch", "join vs lookup" all resolve to the right place, and results show *where the information lives*.

- **Corpus:** lessons and reference docs (per-section with anchors) · **error pages** (per error code/message — the differentiator) · exercises · projects · glossary terms. Enriched with curated aliases ("usestate", "hooks state"), tech keys, and block-type weighting.
- **Engine (decision D7):** PostgreSQL FTS at MVP — generated weighted `tsvector` (title A / keywords B / headings C / body D / code), GIN index, `pg_trgm` for fuzzy/typeahead, developer-jargon synonyms table. **Scale path:** the same documents in MongoDB with Atlas Search (fuzzy, autocomplete, custom scoring) behind a single `search(query, filters)` seam — Postgres remains cheap failover. Reindex is a publish-pipeline job; search is eventually consistent within seconds.
- **Error-code routing:** queries matching error-code patterns (`P2002`, `E11000`, React warnings) go straight to the error-catalog page, which links back to the lesson that teaches the cause.
- **UX:** ⌘K palette (search + jump + actions) · `/search` with filters (tech · type · level) · grouped results with `ts_headline` snippets and section anchors · recent searches · zero-result guidance with suggestions.
- **Targets:** labeled 100-query set → expected doc in top 3 for ≥ 85% · suggest < 100ms p95 · full reindex < 10 min.

---
# Part 9 — Internal Reference Documentation

Lessons *teach*; reference *recalls*. Every technology has a permanent, versioned docs section, generated from the same block system, cross-linked from every lesson (concept auto-linking keeps the platform standalone):

```text
/reference/[tech]/
├── fundamentals|apis|patterns|errors|versions|cheatsheets|best-practices
```

Per-technology highlights — React (per-hook pages, decoded warnings) · Node (core modules, event-loop reference) · Express (API signatures, middleware catalog, 4→5 migration) · Next.js (file conventions, caching matrix, `proxy.ts`, 16/15 versions) · MongoDB (operator atlas, aggregation stages, error codes) · PostgreSQL (syntax cards, isolation levels, error codes) · Prisma (schema attributes, client API, P-code catalog).

**The Errors section is the key differentiator:** each error page = *what it literally means → why it happens → 3 canonical causes → fixes → prevention → lesson links.* Reference never dead-ends. Template is dense and non-narrative: signature box → semantics → constraints → minimal example → pitfalls → lesson links.

---
# Part 10 — Content Versioning

Two version axes, both first-class (decision D6):

**10.1 Content revisions (Git-for-content).** Every published change to any content (lesson, doc, exercise, project) creates an immutable `ContentVersion` snapshot (blocks + changelog + author). Publish = repoint `currentVersionId`. Rollback = repoint. Drafts never serve traffic. Admin gets a version timeline with JSONB diff view.

**10.2 Technology versions (curriculum truth).** A **Technology Registry** (`react → current 19.2, minSupported 19.0, legacy 18.x…`) drives:
- **Version chips** on every lesson ("Teaches: Next.js 16.3 · reviewed Jul 2026").
- **`legacy` callout blocks** for old patterns, always paired with a modern-approach link.
- **Pattern labels** on lessons: `Recommended (2026)` · `Acceptable` · `Legacy — recognize it` · `Deprecated — avoid` — searchable, rendered as badges.
- **Staleness detection:** lessons declare `techTargets`; the admin dashboard flags drift ("targets Next 16.2; registry says 16.3").
- **Migration guides & What's New** doc types per technology — a major release becomes a content-update campaign.

**10.3 Review cadence:** every lesson carries `reviewedAt` + `nextReviewDue` (6 months default; 3 for fast-moving tracks); the CMS review queue lists stale content.

**10.4 Guarantees:** the platform can never silently teach an old pattern as current — registry, chips, labels, staleness dashboard, and review queue make drift visible and actionable. Superseded versions stay addressable (`?v=`), carry banners, and are de-ranked in search.

**10.5 Re-baseline cadence:** quarterly version watch + an annual August "ecosystem review" epic (eval → migration guide → lesson updates → supersede → what's-new entry). The Aug-2026 baseline is the first, not the last.

---
# Part 11 — Technical Architecture

## 11.1 Technology selection & rationale (the platform dogfoods its own curriculum)

| Responsibility | Choice | Why |
|---|---|---|
| Web app | **Next.js 16.3 (App Router)** | One framework for marketing (SSG/SEO), the content app (RSC + streaming), and admin. Cache Components fit read-heavy curriculum. Flagship taught technology — dogfooded. |
| UI | **React 19.2 + TypeScript** | React Compiler running on our own components is a live case study; TS end-to-end. |
| Styling | **Tailwind CSS v4 + CSS-variable tokens** | Utility productivity + themeable tokens; also in-curriculum. |
| Primary DB | **PostgreSQL 18 + Prisma 7.9** | The curriculum is a highly-connected graph with integrity requirements — relational is correct. In-curriculum. |
| Secondary DB | **MongoDB 8.x (Atlas)** | Two honest jobs: search index (Atlas Search, when adopted) + append-only telemetry. Both derived, rebuildable stores. |
| Auth | **Auth.js v5 + database sessions (Prisma adapter)** | Revocable sessions without bespoke-auth bug classes; the auth modules dissect this same architecture. |
| Runner service | **Express 5.2 (separate deployable)** | The Sandbox Orchestrator — isolated for security and independent scaling; Express in its real-world role (focused internal services). |
| Jobs/queues | **pg-boss on PostgreSQL** | Background work (reindex, rollups, digests) without new infrastructure. |
| Sandboxes | Tier 1 in-browser (workers, esbuild-wasm, PGlite) · Tier 2 Docker workers | Right-sized isolation per execution type (§7.2). |
| Hosting | Vercel-class (web) · managed Postgres · Atlas · container host (orchestrator) | Managed-first; mirrors the deployment curriculum. |
| Testing | Vitest · Testing Library · Playwright · supertest | The in-curriculum stack. |

**Rendering strategy by surface:** landing/track/reference → static + tag revalidation on publish · lesson pages → static shell + streamed RSC content, personalization via client islands (`/api/progress/…`) so pages stay CDN-cacheable · dashboard/admin → dynamic, `no-store` · search → route handler with 60s anonymous-query cache.

## 11.2 Application shape

**Monorepo (pnpm workspaces), two deployables + shared packages** (decision D10):

```text
apps/web      → Next.js 16.3 (student app + admin + API route handlers)
apps/sandbox  → Express 5 orchestrator (isolated network; shares ONLY contracts)
packages/ui       → design system
packages/content  → zod block schemas, block renderer, curriculum utils
packages/db       → Prisma schema + generated client + repositories (web only)
packages/config   → eslint/ts/tailwind presets, env validation
packages/testing  → fixtures, harnesses, demo curriculum
```

**Web layering (the pattern we teach, used by us):** routes (RSC/route handlers) → feature modules (`features/*`) → services (framework-free, unit-testable) → repositories (the *only* Prisma consumers) → PostgreSQL. Server Actions and route handlers call the same services. `'server-only'` imports enforce the boundary — the Prisma client never reaches a client bundle.

**Modular monolith, deliberately:** the domain boundaries (curriculum, progress, assessment, search, CMS) are enforced as modules with explicit public APIs *inside* one app. Only the runner is split out — because its security/isolation requirements differ fundamentally. A reason-driven boundary, not fashion.

## 11.3 Content pipeline — two planes, one artifact

1. **Authoring plane (bulk + expert authors):** curriculum authored as typed content files in Git (`content/`) — frontmatter + block array. CI validates zod schemas, type-checks every code sample, runs every exercise's reference solution, and builds previews. Merges sync into Postgres via `content:sync`, creating new content versions. This is how the 480-lesson corpus gets PR-review quality.
2. **Operating plane (day-2 ops):** the **Admin CMS** edits the same versioned content in the DB — typos, reordering, publishing, deprecating, new lessons in a block editor with live preview (the real renderer — WYSIWYG honesty). No rebuild; publish triggers `revalidateTag` + search reindex + version snapshot.

Both planes produce the same artifact: **typed content blocks in PostgreSQL**. The web app never reads the filesystem. Prose wants Git; data wants a database; search wants a projection of both.

## 11.4 Where MongoDB fits (deliberate, documented — decision D9)

| Store | Data | Why Mongo |
|---|---|---|
| `academy.search` | Search documents + per-type extra fields (Atlas Search, when adopted) | Schema flexibility per content type + relevance tuning — a textbook fit; Postgres FTS remains MVP/fallback |
| `academy.events` | Append-only telemetry: sandbox runs, attempt timelines, page-event rollups; TTL retention | High-volume append, schema evolution without migrations |

The relational source of truth never leaves Postgres; Mongo collections are **derived stores, rebuildable from source at any time**. If scale never demands Mongo, `events` becomes a partitioned Postgres JSONB table — one repository module changes, nothing else. This hybrid is exactly what Track 8 teaches — the platform walks its own talk.

---
# Part 12 — Database Design

PostgreSQL is the system of record. Prisma 7.9 (driver adapter `@prisma/adapter-pg`). The merged schema combines plan.md's polymorphic versioning + registry with KIMI.md's typed graph + variant pools (decision D5). Core model (abridged — enums and obvious scalars shown once):

```prisma
// ───────── Identity ─────────
model User {
  id           String   @id @default(uuid())      // UUIDv7 via PG18 default
  email        String   @unique
  emailVerified DateTime?
  passwordHash String?                            // argon2id; null when OAuth-only
  name         String?
  image        String?
  role         Role     @default(STUDENT)
  locale       String   @default("en")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  lastActiveAt DateTime?
  profile      Profile?
  accounts     Account[]                          // OAuth links (Auth.js)
  sessions     Session[]
  enrollments  Enrollment[]
  progress     LessonProgress[]
  attempts     ExerciseAttempt[]
  quizAttempts QuizAttempt[]
  bookmarks    Bookmark[]
  notes        Note[]
  achievements UserAchievement[]
  authoredVersions ContentVersion[] @relation("Author")
  auditLogs    AuditLog[]
  @@index([role])
}
enum Role { STUDENT AUTHOR REVIEWER ADMIN }

model Profile {
  userId          String   @id
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  displayName     String?
  targetPath      String?                         // dashboard framing
  accessibility   Json?                           // { reduceMotion, fontScale, contrast }
  onboardingDone  Boolean  @default(false)
  streakDays      Int      @default(0)
  lastStreakDate  DateTime?
}

model Session {                                   // database sessions — revocable
  id           String   @id @default(uuid())
  sessionToken String   @unique                   // store a HASH, never the raw token
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime                           // sliding: 7d active / 30d absolute
  ip           String?
  userAgent    String?
  revokedAt    DateTime?
  createdAt    DateTime @default(now())
  @@index([userId, expires])
}

model Account {
  id                String @id @default(uuid())
  userId            String
  user              User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider          String
  providerAccountId String
  @@unique([provider, providerAccountId])
  @@index([userId])
}

// ───────── Curriculum graph ─────────
model LearningPath {
  id          String @id @default(uuid())
  slug        String @unique
  title       String
  description String
  trackOrder  Json                                // ordered track ids + rationale
}

model Technology {                                // the version registry (§10.2)
  id             String   @id @default(uuid())
  key            String   @unique                 // react|nextjs|nodejs|express|mongodb|postgresql|prisma
  name           String
  currentVersion String                           // "19.2"
  currentSince   DateTime
  minSupported   String
  legacyVersions Json
  accentHue      Int                              // design-system per-tech accent
  tracks         Track[]
  referencePages ReferencePage[]
  errorEntries   ErrorCatalogEntry[]
}

model Track {
  id           String      @id @default(uuid())
  slug         String      @unique                // react|nodejs|express|nextjs|mongodb|postgresql|prisma|db-comparison|architecture|projects
  title        String
  tagline      String
  order        Int
  published    Boolean     @default(false)
  technologyId String?
  technology   Technology? @relation(fields: [technologyId], references: [id])
  levels       Level[]
  enrollments  Enrollment[]
}

model Level {
  id      String @id @default(uuid())
  trackId String
  slug    String                                  // 1-foundations … 4-production
  number  Int
  title   String
  outcome String                                  // "what you can build after this level"
  track   Track  @relation(fields: [trackId], references: [id], onDelete: Cascade)
  modules Module[]
  @@unique([trackId, slug])
}

model Module {
  id              String  @id @default(uuid())
  levelId         String
  slug            String
  title           String
  summary         String
  order           Int
  prereqModuleIds Json                            // soft prerequisites
  status          Status  @default(DRAFT)
  level           Level   @relation(fields: [levelId], references: [id], onDelete: Cascade)
  lessons         Lesson[]
  assessmentId    String?
  @@unique([levelId, slug])
  @@index([levelId, order])
}
enum Status { DRAFT IN_REVIEW PUBLISHED DEPRECATED ARCHIVED }

model Lesson {
  id               String       @id @default(uuid())
  moduleId         String
  module           Module       @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  slug             String       @unique
  title            String
  summary          String
  estMinutes       Int
  difficulty       Difficulty
  order            Int
  status           Status       @default(DRAFT)
  patternLabel     PatternLabel @default(RECOMMENDED)
  objectives       String[]
  reviewedAt       DateTime?
  nextReviewDue    DateTime?
  publishedAt      DateTime?
  currentVersionId String?
  currentVersion   ContentVersion?  @relation("CurrentLesson", fields: [currentVersionId], references: [id])
  versions         ContentVersion[] @relation("LessonVersions")
  exercises        Exercise[]
  quiz             Quiz?
  prerequisites    LessonEdge[] @relation("PrereqTarget")
  unlocks          LessonEdge[] @relation("PrereqSource")
  relatedA         LessonLink[] @relation("RelatedA")
  relatedB         LessonLink[] @relation("RelatedB")
  progress         LessonProgress[]
  bookmarks        Bookmark[]
  notes            Note[]
  searchDocument   SearchDoc?
  @@unique([moduleId, slug])
  @@index([status, publishedAt])
  @@index([nextReviewDue])                        // CMS staleness queue
}
enum Difficulty   { BEGINNER INTERMEDIATE ADVANCED PRODUCTION }
enum PatternLabel { RECOMMENDED ACCEPTABLE LEGACY DEPRECATED }

model LessonEdge {                                // typed prerequisite graph
  id           String   @id @default(uuid())
  fromLessonId String
  toLessonId   String
  type         EdgeType @default(REQUIRES)
  from Lesson @relation("PrereqSource", fields: [fromLessonId], references: [id], onDelete: Cascade)
  to   Lesson @relation("PrereqTarget", fields: [toLessonId], references: [id], onDelete: Cascade)
  @@unique([fromLessonId, toLessonId, type])
}
enum EdgeType { REQUIRES RECOMMENDS }

model LessonLink {                                // cross-track "related" edges
  id     String @id @default(uuid())
  aId    String
  bId    String
  reason String                                   // "Same concept, server-side"
  a Lesson @relation("RelatedA", fields: [aId], references: [id], onDelete: Cascade)
  b Lesson @relation("RelatedB", fields: [bId], references: [id], onDelete: Cascade)
  @@unique([aId, bId])
}

// ───────── Versioning (polymorphic immutable snapshots) ─────────
model ContentVersion {
  id          String   @id @default(uuid())
  lessonId    String?                             // exactly one of these four is set
  docId       String?
  exerciseId  String?
  projectId   String?
  version     Int                                 // monotonic per content item
  blocks      Json                                // typed block array (zod-validated)
  techTargets Json                                // { "react": "19.2", "nextjs": "16.3" }
  supersedesId String?                            // version chain
  changelog   String
  status      Status   @default(DRAFT)
  authorId    String?
  author      User?    @relation("Author", fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
  lesson      Lesson?  @relation("LessonVersions", fields: [lessonId], references: [id])
  isCurrentOf Lesson?  @relation("CurrentLesson")
  @@unique([lessonId, version])
}

// ───────── Exercises & assessment ─────────
model Exercise {
  id            String       @id @default(uuid())
  lessonId      String?
  lesson        Lesson?      @relation(fields: [lessonId], references: [id])
  slug          String       @unique
  type          ExerciseType
  difficulty    Difficulty
  title         String
  statement     Json                              // blocks
  starterCode   Json?                             // { files: [{ path, content, editable }] }
  tests         Json                              // sandbox test manifest / SQL / Mongo spec
  environment   RunnerEnv
  hints         Json                              // [{ level, text, codeRef }]
  solution      Json                              // { code, explanationBlocks, commonMistakes[] }
  skills        String[]                          // feeds mastery map
  order         Int
  trackId       String?
  currentVersionId String?
  attempts      ExerciseAttempt[]
  @@index([lessonId, order])
  @@index([type, difficulty])
}
enum ExerciseType {
  CODE_WRITE CODE_FIX CODE_OUTPUT FILL_CODE SQL_WRITE MONGO_WRITE
  API_BUILD ARCHITECTURE PROJECT_CHECKPOINT
}
enum RunnerEnv { BROWSER NODE EXPRESS POSTGRES MONGO NEXTJS }

model ExerciseAttempt {
  id           String        @id @default(uuid())
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  exerciseId   String
  exercise     Exercise      @relation(fields: [exerciseId], references: [id], onDelete: Cascade)
  status       AttemptStatus
  submitted    Json?
  results      Json?                              // per-test results
  hintsUsed    Int           @default(0)
  runs         Int           @default(0)
  durationSec  Int?
  sandboxRunId String?                            // → Mongo run log
  createdAt    DateTime      @default(now())
  completedAt  DateTime?
  @@index([userId, exerciseId, createdAt])
  @@index([userId, status])
}
enum AttemptStatus { STARTED SUBMITTED PASSED FAILED ABANDONED }

model Quiz {
  id           String   @id @default(uuid())
  kind         QuizKind                         // CHECKPOINT | MODULE_ASSESSMENT | PLACEMENT | TRACK_FINAL
  lessonId     String?  @unique
  lesson       Lesson?  @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  moduleId     String?
  title        String
  passScore    Int      @default(75)
  timeLimitSec Int?
  questions    QuizQuestion[]
  attempts     QuizAttempt[]
}
enum QuizKind { CHECKPOINT MODULE_ASSESSMENT PLACEMENT TRACK_FINAL }

model QuestionPool {                              // variant pools defeat memorization
  id           String  @id @default(uuid())
  technologyId String?
  topic        String
  questions    QuizQuestion[]
  @@index([technologyId, topic])
}

model QuizQuestion {
  id           String       @id @default(uuid())
  quizId       String?
  quiz         Quiz?        @relation(fields: [quizId], references: [id], onDelete: Cascade)
  poolId       String?
  pool         QuestionPool? @relation(fields: [poolId], references: [id])
  type         QuestionType
  prompt       String                             // MDX/blocks (may include code)
  payload      Json                               // options / code / template per type
  answer       Json
  explanation  Json                               // shown on wrong AND right
  lessonAnchor String?                            // deep link to the teaching section
  difficulty   Difficulty
  skills       String[]
  order        Int
}
enum QuestionType { SINGLE_CHOICE MULTI_CHOICE TRUE_FALSE PREDICT_OUTPUT SHORT_ANSWER ORDERING FILL_CODE }

model QuizAttempt {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quizId      String
  quiz        Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  answers     Json
  score       Int
  passed      Boolean
  itemResults Json                              // per-item correctness → spaced-repetition feed
  startedAt   DateTime @default(now())
  finishedAt  DateTime?
  @@index([userId, quizId, createdAt])
}

// ───────── Spaced repetition ─────────
model ReviewItem {                                // SM-2-lite queue
  id          String    @id @default(uuid())
  userId      String
  questionId  String
  easeFactor  Float     @default(2.5)
  intervalDays Int      @default(1)
  dueAt       DateTime
  lastResult  Boolean?
  @@unique([userId, questionId])
  @@index([userId, dueAt])
}

// ───────── Projects ─────────
model Project {
  id            String      @id @default(uuid())
  slug          String      @unique
  title         String
  tier          Difficulty
  stack         String[]
  trackId       String?
  brief         Json        // blocks: requirements, stories, non-goals
  architecture  Json
  dbDesign      Json
  apiDesign     Json
  authSpec      Json
  testReqs      Json
  perfReqs      Json
  securityReqs  Json
  starterRepo   Json
  solution      Json        // gated until submission
  rubric        Json        // [{ category, criterion, weight }]
  milestones    ProjectMilestone[]
  submissions   ProjectSubmission[]
  searchDocument SearchDoc?
  @@index([tier])
}

model ProjectMilestone {
  id          String  @id @default(uuid())
  projectId   String
  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  order       Int
  title       String
  guidance    Json      // blocks (hints, not answers)
  checkpoints Json      // [{ kind: tests|manual, spec }]
  @@unique([projectId, order])
}

model ProjectSubmission {
  id               String           @id @default(uuid())
  userId           String
  user             User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  projectId        String
  project          Project          @relation(fields: [projectId], references: [id], onDelete: Cascade)
  repoFiles        Json
  rubricSelfAssessment Json?
  automatedResults Json?
  status           SubmissionStatus @default(SUBMITTED)
  submittedAt      DateTime         @default(now())
  @@index([userId, projectId])
}
enum SubmissionStatus { SUBMITTED REVIEWED PASSED NEEDS_WORK }

// ───────── Progress & engagement ─────────
model Enrollment {
  id          String    @id @default(uuid())
  userId      String
  trackId     String
  startedAt   DateTime  @default(now())
  completedAt DateTime?
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  track       Track     @relation(fields: [trackId], references: [id], onDelete: Cascade)
  @@unique([userId, trackId])
}

model LessonProgress {
  id           String         @id @default(uuid())
  userId       String
  user         User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId     String
  lesson       Lesson         @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  status       ProgressStatus @default(IN_PROGRESS)
  lastPosition Json?          // scroll anchor / block id
  secondsSpent Int            @default(0)
  quizPassed   Boolean        @default(false)
  exerciseDone Boolean        @default(false)
  completedAt  DateTime?
  updatedAt    DateTime       @updatedAt
  @@unique([userId, lessonId])
  @@index([userId, status, updatedAt])            // dashboard rollups + continue rail
}
enum ProgressStatus { NOT_STARTED IN_PROGRESS COMPLETED }

model Bookmark {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId  String
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  anchor    String?
  note      String?
  createdAt DateTime @default(now())
  @@unique([userId, lessonId, anchor])
}

model Note {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId  String
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  anchor    String?
  content   String
  updatedAt DateTime @updatedAt
  @@index([userId, updatedAt])
}

model Achievement {
  id          String @id @default(uuid())
  key         String @unique
  title       String
  description String
  rule        Json              // evaluated by progress service
  users       UserAchievement[]
}
model UserAchievement {
  userId        String
  achievementId String
  earnedAt      DateTime @default(now())
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievement   Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)
  @@id([userId, achievementId])
}

// ───────── Search / reference / ops ─────────
model SearchDoc {
  id        String         @id @default(uuid())
  refType   SearchRefType  // LESSON | DOC | EXERCISE | PROJECT | ERROR_PAGE | TERM
  refId     String
  url       String         // canonical URL incl. anchor
  title     String
  headings  String
  body      String
  code      String
  keywords  String[]
  techKeys  String[]
  locale    String         @default("en")
  status    Status
  lessonId  String?        @unique
  lesson    Lesson?        @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  projectId String?        @unique
  project   Project?       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tsv       Unsupported("tsvector")?  // generated weighted column, GIN-indexed
  updatedAt DateTime       @updatedAt
  @@unique([refType, refId])
  @@index([status])
  // + pg_trgm GIN on title (raw migration)
}
enum SearchRefType { LESSON DOC EXERCISE PROJECT ERROR_PAGE TERM }

model ReferencePage {
  id           String     @id @default(uuid())
  technologyId String
  technology   Technology @relation(fields: [technologyId], references: [id])
  slug         String
  section      String     // fundamentals|apis|errors|patterns|versions|cheatsheets
  title        String
  order        Int
  status       Status     @default(DRAFT)
  currentVersionId String?
  @@unique([technologyId, slug])
  @@index([technologyId, section, order])
}

model ErrorCatalogEntry {
  id           String     @id @default(uuid())
  technologyId String
  technology   Technology @relation(fields: [technologyId], references: [id])
  code         String?    // "P2002", "E11000"
  message      String
  title        String
  cause        String     // blocks
  fix          String     // blocks
  lessonRefs   String[]   // lessons that teach the cause
  @@unique([technologyId, code, message])
}

model Redirect {
  id       String   @id @default(uuid())
  fromPath String   @unique
  toPath   String
  createdAt DateTime @default(now())
}

model AuditLog {
  id        String   @id @default(uuid())
  actorId   String?
  actor     User?    @relation(fields: [actorId], references: [id])
  action    String   // "content.publish", "user.role_change", …
  entity    String
  entityRef String
  diff      Json?
  createdAt DateTime @default(now())
  @@index([entity, entityRef])
  @@index([actorId, createdAt])
}
```

## 12.1 Data design decisions

- **UUIDv7 keys** (PG18 native default): time-sortable, URL-safe, no enumeration leaks.
- **Content as JSONB blocks** (validated by zod at every write): one-row lesson reads; the decision itself is taught (jsonb as the middle path, Track 8).
- **Immutable version snapshots** — audit and rollback for free; `supersedesId` chains for history.
- **Completion semantics:** a lesson is `COMPLETED` when practice + checkpoint are done and the student confirms — never page views.
- **Integrity:** unique slugs per parent; cascades only downward in the curriculum tree; user data never cascades from content (content deletion is a `DEPRECATED` status change, not a row delete).
- **Hot-path indexes:** `LessonProgress(userId, status, updatedAt)` (dashboard/continue rail), `Lesson(status, publishedAt)` (listings), `Lesson(nextReviewDue)` (staleness queue), SearchDoc GIN ×2, partial index on published lessons.
- **Pagination:** keyset/cursor everywhere user-facing; offset only in admin tables.
- **Auditability:** every CMS mutation → `AuditLog` with JSON diff; attempts/submissions append-only.
- **MongoDB boundary:** only `events` + search mirror — append-only, TTL'd, never transactional with Postgres.

---
# Part 13 — API Architecture

Two styles, each where strongest (decision D12) — the same judgment the curriculum teaches:

- **Server Actions** for authenticated own-UI mutations (mark complete, bookmark, note save, quiz submit): colocated, typed, CSRF-protected by the framework — with mandatory authorization checks *inside* every action.
- **REST route handlers** for public reads, runner intake, webhooks, cacheable GETs, non-React clients.

```text
Public / session-authenticated:
GET  /api/curriculum/tree                     sidebar; CDN-cached, tag-revalidated on publish
GET  /api/lessons/[track]/[module]/[lesson]   content blocks; public read
POST /api/lessons/:id/complete                (also as Server Action)
GET  /api/progress/summary  ·  /api/dashboard/continue
GET  /api/progress/lessons?cursor=…           keyset
POST /api/exercises/:id/attempt               submit; orchestrates sandbox if needed
GET  /api/exercises/:id/solution              only after ≥ 1 attempt
POST /api/quizzes/:id/attempt                 grade; per-item results
POST /api/runs                                create run (rate-limited, quota)
GET  /api/runs/:id/stream                     SSE result stream
GET  /api/search?q=…  ·  /api/search/suggest?q=…
POST /api/bookmarks · /api/notes              CRUD

Admin (role-gated):                           Internal (service token):
/api/admin/content/*  (version, publish,      /internal/sandbox/runs
  rollback, schedule)                         /internal/events
/api/admin/exercises|quizzes|projects|reference/*
/api/admin/technologies/*  (registry updates)
/api/admin/search/reindex · /api/admin/users/* · /api/admin/analytics/*
```

**Conventions:** zod-validated request/response schemas shared client↔server (unknown fields rejected — mass-assignment protection) · one error envelope `{ error: { code, message, details? } }` with machine-readable codes documented in the platform's own error catalog · `429` + `Retry-After` on rate limits · request IDs for tracing · cursor pagination · explicit cache headers on every GET (`s-maxage` + `stale-while-revalidate` public; `private, no-store` user data) · **idempotency keys required on submission endpoints** (retries are safe by design).

---
# Part 14 — Authentication & Authorization

**Choice (decision D11): Auth.js v5 with database sessions via the Prisma adapter** — the 2026-correct default for a server-rendered app, hardened with KIMI.md's session specifics.

- **AuthN:** email+password (**argon2id** — the platform uses what it teaches) + OAuth (GitHub first, Google optional). Email verification before progress sync.
- **Sessions:** opaque token in `HttpOnly; Secure; SameSite=Lax` cookie; DB stores only a **hash** of the token (DB leak ≠ session leak); sliding expiration (7d active / 30d absolute); rotation on login (fixation protection); `revokedAt` revocation; concurrent-session view + "sign out other devices".
- **Password policy:** min length 12, breached-password screening, rate-limited attempts with exponential backoff, **generic error messages** (no user enumeration); recovery via single-use, 15-min, hashed tokens.
- **CSRF:** SameSite=Lax + framework action tokens; origin checks on `/api/*` mutations; no state-changing GETs.
- **AuthZ:** roles (`STUDENT < AUTHOR < REVIEWER < ADMIN`) + **ownership checks**, enforced **server-side in the service layer** — never only in the UI; admin routes double-gated at proxy + service (defense in depth). Rule taught and practiced: *trust nothing from the client.*
- **Runner auth:** short-lived (5-min) HMAC-signed tokens scoped to a single run; validated by the orchestrator before anything executes.
- **JWT:** not used for first-party sessions (stateful revocation is worth it); JWT is *taught* thoroughly in Track 3 and used where statelessness genuinely fits (runner tokens).
- **Teaching connection:** Tracks 3/4/9 dissect this exact architecture — one design, used and taught.

---
# Part 15 — Admin CMS

**Goal:** evolve the curriculum without redeploys, and never let content quality depend on heroics. Lives at `/admin` inside the web app (role-gated); module boundary keeps it separable later.

- **Content-health dashboard:** lessons missing exercises, stale content (past `nextReviewDue`), broken links, failed sync validations, exercise self-test failures.
- **Curriculum manager:** visual Path→Track→Level→Module→Lesson tree; drag-to-reorder; publish toggles; bulk status ops.
- **Lesson editor:** block editor with live preview via the real renderer; block palette (analogy, playground, checkpoint…); frontmatter form (objectives, techTargets, patternLabel, review dates); **Validate** runs the same zod pipeline as CI.
- **Exercise/quiz builders:** starter files, test harnesses with a *"run against solution"* self-check, hint ladders, rubric editors, **question-pool management with variant preview**.
- **Project editor:** full brief template + milestone/rubric builders + starter-repo file manager.
- **Versioning console:** version timeline + JSONB diff · create version · supersede (auto-banner + search de-rank) · deprecation labeling · migration-guide linking.
- **Technology Registry console:** version bumps + staleness dashboard (§10.2).
- **Reference & error-catalog editors** · redirect manager · "what's new" composer · media library (type/size-validated, re-encoded uploads, signed URLs).
- **Publishing workflow:** draft → in-review → published (four-eyes: AUTHOR proposes, REVIEWER publishes); every mutation audit-logged; publish triggers search reindex + CDN tag invalidation + `ContentVersion` snapshot.
- **Users & roles** · audit-log viewer · analytics dashboards (content funnel: views → attempts → pass rate per lesson; search quality: query → click-through).
- **Invariant:** nothing in the CMS writes `SearchDoc` directly — reindex is a pipeline step; search consistency can't be hand-broken.

---
# Part 16 — UX Architecture & Student Journey

## 16.1 Canonical journey

```text
Landing → Path overview → Track home → (optional) Placement quiz → Register (soft gate)
  → LESSON PLAYER: Learn → See → Try → Practice → Prove → Mark complete (auto-suggested)
  → progress updates live (sidebar dot, streak, skill map) → Next lesson
  → Module assessment → Level project → Track capstone → Next track → Portfolio
  ↺ spaced-repetition "Review now" cards on the dashboard
```

**First visit:** all lessons readable logged-out (SEO + goodwill); interactive features prompt registration after the first sandbox run/exercise attempt (soft gate — registration exists for progress, not paywalls).
**Onboarding (3 steps, skippable):** experience level → goal → recommended path + placement-quiz offer.

## 16.2 The lesson player (core screen) — decision D13

```text
┌────────────────────────────────────────────────────────────────┐
│ Top bar: breadcrumbs · ⌘K · ◂ prev · "3/12" · next ▸ ·         │
│          bookmark · note · report                               │
├──────────────┬────────────────────────────────┬────────────────┤
│ LEFT:        │ CENTER: lesson blocks (the     │ RIGHT:         │
│ curriculum   │ Learning Loop, §4.1) — streams │ on-this-page   │
│ sidebar tree │ prose first, interactives      │ TOC scroll-spy │
│ (per-item    │ hydrate in place               │ · contextual   │
│ progress dots│                                │ tips           │
├──────────────┴────────────────────────────────┴────────────────┤
│ Mobile: panes → drawers. Persistent bottom bar: Prev · TOC ·   │
│ Next · swipe-up curriculum sheet · sticky reading progress     │
└────────────────────────────────────────────────────────────────┘
```

Wayfinding (fixing both references): breadcrumbs · prev/next (`[`/`]` shortcuts) · position indicator · TOC scroll-spy · completion dots · **prerequisite-gap banner** with a one-click catch-up path · auto-linked concepts (first occurrence per lesson links to its reference page).

## 16.3 Key flows

- **Exercise flow:** statement → editor (starter code) → run (sandbox) → per-test results with diffs → progressive hints → submit → solution + *why* unlocked → auto-added to review queue if failed twice.
- **Quiz flow:** one question per screen → review-before-submit → results with per-question explanations + lesson deep links.
- **Search flow:** ⌘K → grouped results (Lessons / Reference / Exercises / Projects / Errors) with snippets + anchors → Enter opens top hit; zero-result guidance.
- **Dashboard:** resume card (one click) · streak (non-punitive) · per-track progress rings · **skill map** (mastery from assessments) · review queue · bookmarks/notes · achievements.
- **Project flow:** brief tabs (Requirements / Architecture / DB / API / Milestones / Rubric) → persisted milestone checklist → submission → rubric self-review → reference solution unlocks.

## 16.4 States (formalized — absent in both references)

- **Empty:** friendly illustration + concrete next action ("No bookmarks yet — bookmark a lesson to find it fast").
- **Loading:** skeletons matching final layout; streamed lessons show prose first.
- **Error:** failing interactive degrades to static code + explanation (**Tier 0**); global error pages offer search + "report this content" (feeds the CMS review queue).

## 16.5 UX principles

1. Never lose the learner's place (autosave everything; resume always one click). 2. Effort visibility (every unit of work moves a progress surface). 3. Contextual help over dead ends (tips, hints, error-catalog links, related-lesson chips). 4. Consistent verbs (Run, Step, Reset, Check, Submit mean the same thing everywhere). 5. Content is the interface — chrome recedes.

---
# Part 17 — UI Architecture & Design System

**Positioning:** "a focused developer tool, not a landing page." Dark-first with a fully-designed light theme; typography-led; visual interest comes from content (diagrams, visualizers, code), not chrome. Keeps the references' developer identity (mono accents, terminal chrome, purposeful color coding); discards their decorative excess.

## 17.1 Tokens (single source of truth — no hard-coded hex anywhere)

```css
/* Dark (default). All pairs WCAG AA+ verified. */
--bg-canvas: #0B0F17;  --bg-surface: #111726;  --bg-raised: #1A2236;  --bg-code: #0D1117;
--border-subtle: #222B41;  --border-default: #2E3A57;
--text-primary: #E6EAF2;   /* ≥15:1 */   --text-secondary: #A8B3C7;  /* ≥7:1 */
--text-muted: #7D8AA3;     /* ≥4.6:1 — fixes Reference B's contrast failures */
--accent-primary: #4F8CFF; --accent-success: #3FBD7C; --accent-warning: #E5B454; --accent-danger: #E5647A;
/* Track identity (the systematic version of Reference A's per-week colors) */
--track-react: #61DAFB; --track-node: #8CC84B; --track-express: #9CA3AF; --track-nextjs: #FFFFFF;
--track-mongo: #47A248; --track-pg: #6FA8DC; --track-prisma: #7C8CF8; --track-arch: #B588C7; --track-found: #F59E0B;
/* Visualization state scale (generalized from Reference A's array cells) */
--viz-idle; --viz-active; --viz-comparing; --viz-found; --viz-eliminated;
/* Light theme: full parallel token set — tokens only, no component forks. */
```

- **Spacing:** 4pt grid; prose measure 65–75ch (720–760px); app max 1440px.
- **Typography:** Inter (UI/Latin, variable, self-hosted via `next/font`) · JetBrains Mono (code, 13.5–14px, ligatures off by default) · IBM Plex Sans Arabic (future i18n). Fluid scale 12→48; lesson h1 = 30–34px (**reading scale — explicitly rejecting the references' 72px presentation heroes**).
- **Radii/elevation:** 6/10/14px; two shadow levels; borders carry hierarchy, glow reserved for interactive focus.
- **Motion:** 150ms micro / 250ms layout; **everything gated on `prefers-reduced-motion`** — non-negotiable.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` (replaces the references' ad-hoc values).

## 17.2 Component library (headless primitives + learning components)

- **Layout:** TopBar · Sidebar · MobileDrawer · ContentShell · Toc · Breadcrumbs · FooterNav · CommandPalette.
- **Content:** Prose · Callout(info|warn|pitfall|legacy|version) · **CodeBlock** · **CodeAnatomy** · CodeStep · Tabs · Accordion · DataTable · ComparisonMatrix · TerminologyCard · BeforeAfter · DiagramFrame · **Stepper/Visualizer shell** · QuizEmbed · ExerciseEmbed · VersionChip · PatternLabel.
- **Learning:** SandboxFrame · TestRunnerPanel · HintDisclosure · SolutionReveal · CheckpointQuiz · ProgressRing · StreakCalendar · SkillMap · MilestoneChecklist.
- **Feedback:** Skeleton · EmptyState · ErrorState · Toast · InlineResult.
- **Admin:** ContentEditor · BlockEditor · VersionTimeline · DiffView · PublishControls · AdminTable.

**Every component's contract includes all states** (default/hover/focus-visible/active/disabled + loading/empty/error) — enforced in review.

## 17.3 Code presentation spec (first-class citizen)

Terminal-style header (filename tab, **copy button**, run button when runnable, language chip, version chip when version-sensitive) · **server-side highlighting (Shiki)** — perfect fidelity, zero client JS for static blocks · runnable blocks swap to CodeMirror 6 + preview/console · line numbers · highlighted lines · line-anchor permalinks (`#L12`) · "copy without prompts" (strips `$`) · max-height with expand · real text semantics + `aria-describedby` captions (fixes both references' span-soup accessibility).

## 17.4 Icons & imagery

Inline SVG set (Lucide-based), `currentColor`, zero icon-font dependencies · track logos as simple SVG marks · diagrams hand-authored SVG/React (industrializing Reference B's strength) · **no emoji as information carriers** (Reference A's emoji cues become labeled icons).

---
# Part 18 — Performance Architecture

**Budgets (CI-enforced):**

| Page | LCP | INP | CLS | Initial JS (gz) |
|---|---|---|---|---|
| Lesson (cold) | ≤ 1.8s | ≤ 200ms | ≤ 0.05 | ≤ 130KB (sandbox excluded — lazy) |
| Landing / track | ≤ 1.2s | ≤ 200ms | ≤ 0.05 | ≤ 90KB |
| Reference doc | ≤ 1.0s | ≤ 200ms | ≤ 0.05 | ≤ 60KB |
| Dashboard | ≤ 2.0s | ≤ 200ms | ≤ 0.05 | ≤ 180KB |

**Strategies:** static + ISR for public content, `revalidateTag` on publish (content changes are *the* invalidation event — rare and deliberate) · streamed lesson bodies (prose first, embeds hydrate in place) · personalization via client islands (pages stay CDN-cacheable) · route-level code splitting; sandbox/editor bundles strictly dynamic (the 500KB editor stack never blocks reading) · React Compiler on our own components; client components audited per PR via bundle-diff · `next/image` (AVIF/WebP, art-directed) · `next/font` self-hosted subsets — **zero third-party font/CDN round-trips** (both references' CDN habit, fixed) · DB discipline (select-what-you-need; N+1 ban enforced by tests — the platform obeys its own lessons) · keyset pagination · SSE streaming for runs · suggest endpoint capped + cached · Lighthouse CI per PR + Web Vitals RUM with p75 alerts · k6 load tests before releases.

---
# Part 19 — Security Architecture

| Layer | Controls |
|---|---|
| Transport | TLS 1.3, HSTS preload, automatic HTTPS redirects |
| Headers | Nonce-based CSP (strictest on admin; `frame-ancestors` on sandbox origins), X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP/CORP |
| AuthN/AuthZ | Part 14 (argon2id, hashed session tokens, rotation, lockout, anti-enumeration, service-layer authorization, defense in depth) |
| Injection (SQL) | Prisma parameterization everywhere; `$queryRaw` only typed/bound; lint rule flags template-string SQL |
| Injection (NoSQL) | Operator-injection guards (reject `$`-prefixed user keys); never string-built queries — *these exact attacks are taught in the security labs and tested in CI* |
| Validation | Shared zod schemas at every boundary (actions, routes, runner intake); unknown fields rejected; payload size caps |
| XSS | Typed blocks rendered by React — **no raw HTML anywhere**; MDX parsed through a strict allowlist pipeline; CSP as second line |
| CSRF | SameSite=Lax + action tokens + origin checks; no state-changing GETs |
| Rate limiting | Token buckets per IP + user: login 5/min/IP · search 60/min/user · runs 10/min + daily quota (authed only) |
| Sandbox | §7.2 isolation — the highest-risk surface: no egress, ephemeral containers, limits enforced outside the container, run logging, weekly image rebuilds, escape test-suite as a release gate |
| Uploads | Admin-only; type/size validated; re-encoded; private buckets; signed URLs |
| Secrets | Env-only, zod-validated at boot, server/client split, rotation runbook, CI secret scanning |
| Dependencies | Lockfiles, audit + provenance CI, weekly update PRs, minimal-dependency policy (every dependency needs a reason) |
| Database | Least-privilege roles (app vs migration vs admin), TLS, no runtime superuser, encrypted backups |
| Data protection | Service-layer ownership enforcement; export & deletion endpoints (GDPR-shaped); PII minimized |
| Errors | No internals in responses; centralized mapping; security events alert |

**Threat-model top risks:** (1) sandbox escape → isolation tiers + no-egress + quotas + pen-test gate; (2) content injection → typed blocks, no raw HTML; (3) account takeover → session hygiene + rate limits + breach-resistant hashing. Each risk has an owner and a dedicated test suite. **The sandbox architecture is also curriculum** — the security lessons walk through this very system as a case study.

---
# Part 20 — Accessibility

Target **WCAG 2.2 AA**, verified by automated + manual testing per release.

- **Semantics:** landmarks, one `h1`, enforced heading order in generated lesson HTML; native elements first — ARIA only where semantics run out (Tabs/Accordion/Dialog done correctly; they are the R-track case studies).
- **Keyboard:** everything operable — sidebar tree (roving tabindex), ⌘K, steppers (arrow keys), playgrounds (full keyboard editing), quizzes; visible focus rings (never `outline: none` without replacement); skip links on every page; route-change focus management.
- **Screen readers:** **visualizers expose an `aria-live` narration channel fed by the same structured step events that drive the execution log** — accessibility falls out of the architecture · diagrams have text alternatives · code blocks announce language · quiz/exercise/run results via live regions · progress via `aria-valuenow`.
- **Color:** token pairs audited ≥ 4.5:1; **state is never color-only** (visualization cells also change shape/label/icon — fixing Reference A).
- **Motion:** `prefers-reduced-motion` disables decorative animation and stepper autoplay (fixing both references).
- **Forms:** labels, described errors, `autocomplete`, no placeholder-as-label.
- **Preferences:** font scale / contrast boost / reduce-motion stored in `Profile.accessibility`, applied server-side (no flash).
- **Reading:** 200% zoom and 320px width supported; content readable without JS.
- **Testing:** axe in component + E2E suites; manual NVDA/VoiceOver passes per release.

---
# Part 21 — Responsive Design

**Designed mobile-first for real studying** (the Mobile Studier persona), not shrunk desktop — fixing Reference A's "mobile has no navigation at all" failure.

| Breakpoint | Behavior |
|---|---|
| < 640px | Single column; drawer nav (searchable curriculum tree); **persistent bottom bar on lessons: Prev · TOC · Next**; sticky top with position + progress; code scrolls horizontally with fade hint + tap-to-copy + wrap toggle; playgrounds stacked (editor above output); steppers become swipeable cards |
| 640–1023px | Content + overlay sidebar; grids collapse to one column |
| 1024–1279px | Sidebar + content; TOC hidden |
| ≥ 1280px | Full three-pane layout; resizable panes |
| ≥ 1728px | Content column capped at 760px — never stretched lines |

**Mobile-specific:** 16px body minimum · touch targets ≥ 44px · no hover-only affordances · on-screen keyboard never obscures Run · comparison tables → stacked cards · diagrams pinch-zoomable with text alternatives · exercises fully functional on phones (CodeMirror is touch-capable) · **offline tolerance:** service worker caches visited lessons for re-reading; progress syncs when back online.

---
# Part 22 — Recommended Project Structure

Feature-sliced monorepo (decision D10). Features own their components, server logic, and types; cross-feature imports go through explicit public APIs only.

```text
fullstack-academy/
├── apps/
│   ├── web/                            # Next.js 16.3 (student app + admin + API)
│   │   ├── app/
│   │   │   ├── (marketing)/            # /, /paths — static, SEO-first
│   │   │   ├── (learn)/                # /learn/** — lesson player, track homes
│   │   │   ├── (reference)/            # /reference/**
│   │   │   ├── (app)/                  # /dashboard, /settings, /playground
│   │   │   ├── (auth)/                 # /login, /register, /forgot-password
│   │   │   ├── admin/                  # CMS (role-gated)
│   │   │   ├── api/                    # route handlers (§13)
│   │   │   └── layout.tsx · proxy.ts · error.tsx · not-found.tsx
│   │   ├── features/                   # curriculum · lesson · progress · assessment
│   │   │                               # exercises · projects · search · auth · admin
│   │   ├── interactive/                # the Interactive Kit (§7.3)
│   │   │   ├── stepper/                # narrated stepper engine
│   │   │   ├── playground/             # browser sandbox client
│   │   │   ├── visualizers/            # event loop, middleware, boundary, cache…
│   │   │   └── diagrams/
│   │   └── lib/                        # env validation, auth config, api client
│   └── sandbox/                        # Express 5 orchestrator (isolated deploy)
│       ├── src/routes · src/runner · src/queue
│       └── workers/                    # Docker images (node24-slim, mongo8)
├── packages/
│   ├── ui/        # design system (tokens → Tailwind mapping, components)
│   ├── content/   # zod block schemas, block renderer, curriculum utils
│   ├── db/        # prisma schema + generated client + repositories (web only)
│   ├── config/    # shared eslint/ts/tailwind presets
│   └── testing/   # fixtures, harnesses, demo curriculum
├── content/                            # Git authoring plane (source of truth for prose)
│   ├── tracks/react/levels/1-foundations/modules/…/lesson.yaml
│   ├── reference/nextjs/… · exercises/… · projects/… · glossary.yaml
│   └── STYLE.md                        # the content style guide (§26)
├── prisma/migrations · seed/           # (inside packages/db)
├── scripts/     # content:sync · validate-content · seed · reindex CLIs
├── docs/        # this plan + ADRs
├── docker-compose.yml                  # local: postgres, mongo, sandbox worker
└── turbo.json · package.json
```

**Architecture rules:** features never reach into another feature's internals · Prisma is imported only in `packages/db` repositories · the block-renderer registry is the only content entry point · all schemas (blocks, API payloads) shared from one place — CI, CMS, and renderer can never disagree · the sandbox app shares *nothing* with web except contracts (defense by separation).

---
# Part 23 — Testing Strategy

| Layer | Tooling | Scope & rules | Gate |
|---|---|---|---|
| Unit | Vitest | services, guards, scoring, content validators, visualizer state machines, spaced-repetition scheduler | PR |
| Component | Vitest + Testing Library + axe | design-system states, block renderer (every block type with fixtures), learning components | PR |
| Integration | Vitest + ephemeral Postgres (Docker) + `migrate deploy` | repositories, migrations both ways, constraints, pg-boss jobs | PR |
| API | supertest-style | authn/authz matrix (every role × endpoint), validation, error envelope, rate limits, cache headers | PR |
| Content CI | custom pipeline | **every lesson:** zod-valid blocks, working internal links, version chips, every code sample type-checks · **every exercise:** reference solution *passes* and a planted broken solution *fails* through the same runner students use · **every quiz:** ≥1 correct answer, explanation + lesson anchor present | PR |
| E2E | Playwright (desktop + mobile, keyboard-only run) | golden paths: register → onboard → read → run → exercise → quiz → dashboard; search flows; CMS publish flow → visible + cache revalidated | pre-release |
| AuthN/Z | Playwright + API | session lifecycle, revocation, role-escalation attempts, IDOR/ownership-bypass suite | pre-release |
| Accessibility | axe CI + manual NVDA/VoiceOver script | key journeys + all interactive components | pre-release |
| Performance | Lighthouse CI + Web Vitals RUM budgets | §18 budgets per key template | pre-release |
| Security | dependency audit, secret scanning, **sandbox-escape suite**, ZAP baseline, CSP validation | sandbox breakouts, injection, header hygiene | weekly + pre-release |
| Load | k6 | lesson reads 200 rps + 20 concurrent sandbox runs within budget | pre-release |

**Two invariants:**
1. **Runner self-check:** an exercise that can't be solved by its own canonical solution is a build failure.
2. **Test data strategy:** a deterministic miniature "demo curriculum" (2 tracks × 2 modules × 3 lessons covering every block type, 5 exercises, 2 quizzes, 1 project) shared across component, API, and E2E layers — fixtures double as authoring examples.

---
# Part 24 — Development Roadmap (18 Phases)

Each phase: **Objectives · Features · Tasks · Dependencies · Deliverables · Acceptance criteria.** Phases 5–10 (content) run in parallel once Phase 4 lands. *Known sequencing tension (inherited from both plans): content phases 6–9 need sandbox tiers — resolved by a Phase 4.5 spike delivering the Tier-1 JS/SQL runners early.*

| # | Phase | Objectives & key deliverables | Dependencies | Acceptance (headline) |
|---|---|---|---|---|
| 1 | **Architecture & Foundation** | Monorepo, tooling, CI/CD, Next 16.3 + Tailwind v4 shell, Prisma 7.9 + PG18, env validation, ADRs 0001–0008 | — | `pnpm build/typecheck/test` green; preview per PR; CI < 10 min |
| 2 | **Design System & UI** | Tokens (dark/light), primitives, content components, CodeBlock (Shiki, copy, anchors), block renderer v1 on fixtures | 1 | AA contrast audit; keyboard walkthrough; zero-hardcoded-colors lint; axe per component |
| 3 | **Authentication & Users** | Auth.js v5 + db sessions, OAuth, email flows, roles, session management UI, rate limits | 1–2 | OWASP ASVS L1 auth checks; anti-enumeration verified; revocation works; auth E2E green |
| 4 | **Curriculum & Content System** | Curriculum schema, ContentVersion, block renderer complete, `content:sync` CLI, publish + `revalidateTag`, lesson player shell, Technology Registry v1 | 1–3 | Author adds lesson in Git → sync → publish → live, no redeploy; rollback demonstrated; invalid block fails with precise error; lesson Lighthouse ≥ 95 |
| 4.5 | **Tier-1 Runner Spike** | In-browser JS/TS worker runner + PGlite SQL runner | 4 | Unblocks content phases 6–9 |
| 5 | **React Curriculum** | Track 1 L1–L2 first (then L3–L4): ~68 lessons, ~90 exercises, render/hooks visualizers, React reference v1 | 4, 4.5 | Content CI 100%; solutions pass; assessments calibrated 60–80% first-attempt |
| 6 | **Node.js Curriculum** | Track 2: ~46 lessons, event-loop flagship stepper, Node reference v1 | 4, 4.5 | Stepper verified against real `nextTick`/promise ordering; all exercises solvable in-runner |
| 7 | **Express Curriculum** | Track 3: ~38 lessons, middleware conveyor + lifecycle steppers, Express reference + 4→5 migration guide | 6 (+ early Tier-2 spike) | HTTP-level grading works end-to-end |
| 8 | **Next.js Curriculum** | Track 4: ~62 lessons, boundary visualizer, cache simulator; caching lessons cross-validated against the platform itself | 5–7 | Every caching claim reproduced in a scratch 16.3 app; version labels current |
| 9 | **Mongo + Postgres + Prisma Curricula** | Tracks 5–7 + Track 8: ~142 lessons, ERD/document designers, EXPLAIN explorer, aggregation stepper, decision framework | 4, 4.5, Tier-2 for Mongo | SQL graded by result-set equality with partial credit; Prisma lessons verified against 7.9 in CI |
| 10 | **Architecture & Projects Content** | Tracks 9–10: ~36 lessons, four request-lifecycle steppers, 13 project specs with milestones/rubrics | 5–9, 11 | Each stepper covers all four stacks; every project satisfies the mandatory template; ≥60% checkpoints auto-graded |
| 11 | **Interactive Learning Runtime** | Full three-tier sandbox, orchestrator + worker pool, SSE streaming, quotas, run logging, the complete Interactive Kit | 3, 4 | Sandbox escape suite passes; no-egress proven by test; Tier-2 p95 start < 8s; fault-injection proves Tier-0 fallback |
| 12 | **Exercises & Assessments Complete** | All exercise types, attempt history, solution gating, variant pools, placement quizzes, spaced-repetition queue, mastery model | 4, 11 | Retakes draw new variants; grading p95 < 2s (T1) / < 10s (T2); review queue surfaces missed items within 24h |
| 13 | **Projects System** | Project pages, milestone state machine, checkpoint auto-grading, submissions, rubric self-review, solution unlock, portfolio view | 4, 11, 12 | A student completes the Blog Platform start-to-finish on-platform |
| 14 | **Search** | Postgres FTS + trigram, ⌘K palette, /search page, suggest, error-code routing, search analytics; Atlas path behind a flag | 4 + corpus | Labeled 100-query set: top-3 ≥ 85%; suggest < 100ms p95; reindex < 10 min |
| 15 | **Admin CMS** | Full §15: tree manager, block editor, builders, versioning console, registry console, review queue, audit log, analytics | 3, 4, 14 | Author drafts → reviewer publishes → student sees: no deploy; every mutation audited; rollback E2E |
| 16 | **Performance & Security Hardening** | Budget CI, CSP/headers rollout (report-only then enforce), pen-test checklist, load tests, DR drill | 11–15 | §18 budgets green; CSP violations zero on top journeys; pen-test 100% addressed; load targets met |
| 17 | **Testing & QA Completion** | Full E2E suites, a11y audit program, content CI at full-corpus scale, cross-browser matrix | 5–16 | Zero critical a11y issues; WCAG 2.2 AA signed off; content CI < 15 min full corpus; flake < 2% |
| 18 | **Production Deployment & Launch** | Prod infra (web, runner pool, PG HA, Atlas, CDN), observability, on-call runbooks, backups + restore drill, SEO (sitemap/OG/structured data), dogfooding cohort, soft → public launch | 16, 17 | Automated deploy reversible < 10 min; restore drill passes; 24h soak green; launch checklist signed |

---
# Part 25 — Prioritization, MVP & Post-MVP

## 25.1 MoSCoW

| Tier | Capabilities |
|---|---|
| **Must (MVP)** | Phases 1–4 + Tier-1 runner slice · Foundations + React L1–L2 content · checkpoint quizzes + basic JS/React/SQL exercises · lesson-level progress · Postgres FTS search + palette · dark/light responsive shell · content CI · Git-plane authoring only |
| **Should (v1.0)** | All remaining tracks · Tier-2 orchestrator · module assessments + variant pools + spaced repetition · projects system · admin CMS · reference docs complete · achievements |
| **Could (v1.x)** | Atlas Search · challenges hub · public playground · **Arabic content layer** (honoring Reference A's bilingual DNA — i18n architecture already in place) · offline reading · shareable achievements |
| **Won't (this product)** | Video hosting · forums · payments · native mobile apps · accredited certificates · non-stack tracks |

## 25.2 MVP definition (decision D14)

**The MVP proves the core promise:** *a student can register, follow Foundations → React, read fully self-contained lessons with runnable examples, complete exercises, pass checkpoints, see progress, and search — without ever leaving the site.*

- **Scope:** Phases 1–4 in full · Foundations (L1 core + L2 essentials) + React L1–L2 (~90 lessons) · Tier-1 runners only · checkpoint quizzes only · Postgres FTS · no admin CMS (Git plane only).
- **Explicitly deferred:** orchestrator, projects, gamification, i18n, analytics dashboards, module assessments.
- **Duration:** ≈ 3.5–4 months (2 engineers + 1 content author).
- **Smoke test (KIMI's framing):** the end-to-end journey — Foundations through building and testing a React SPA — *is* the acceptance test for everything.
- **Success gates (first 500 users):** ≥ 60% of a cohort completes Foundations L1 + React L1 unaided · exercise completion ≥ 40% · search CTR ≥ 60% · LCP p75 < 1.8s · "I had to Google X" in < 5% of feedback.

## 25.3 Post-MVP roadmap

| Horizon | Theme | Highlights |
|---|---|---|
| **v1.0 (months 4–8)** | Complete curriculum | All tracks (Phases 6–10), Tier-2 sandbox, assessments + SR, projects, CMS, reference docs |
| **v1.1–1.2 (months 8–12)** | Depth & delight | Challenges hub, public playground, achievements, Atlas Search, **Arabic content layer**, performance polish |
| **Year 2** | Growth & community-lite | Cohorts/study groups, mentor capstone review, certificates, contributor program (Git MDX PRs through the same pipeline), progress API for portfolio integrations |
| **Ongoing** | Version currency | Quarterly version watch + annual August re-baseline epic (§10.5): React 20, Next 17, Node 26 LTS, Prisma 8, PG 19, Mongo 8.4+ — each with What's-New + migration content + staleness sweep |

---
# Part 26 — Content Production Strategy

1. **Curriculum design docs first** — each module gets a design doc (outcomes, lesson list, exercise map, diagram list) reviewed before writing; Part 4 of this document is the master design.
2. **Authoring in the Git plane** — typed lesson files, one PR per lesson; CI runs schema validation, code-sample type-checks, and reference-solution tests on every PR.
3. **The content style guide** (`content/STYLE.md`): voice (plain, direct, second-person, production-flavored) · mandatory Learning Loop anatomy · **analogy-first rule** (every concept opens with why-it-exists + a concrete analogy — Reference A's signature) · TS-first complete runnable snippets over fragments · diagram conventions · difficulty calibration · banned patterns (linking out for explanations; "simply" without explanation; unversioned claims; emoji as information).
4. **Per-lesson quality bar (all CI-enforced where possible):** objectives stated · analogy present · ≥1 interactive · ≥1 exercise with tested solution · code-anatomy block · common-mistakes gallery · checkpoint with explanations + lesson anchors · correct version chips + pattern labels · links to reference + related lessons · a11y pass on visualizers/diagrams.
5. **Roles in the pipeline:** author → technical reviewer (accuracy + version-truthfulness) → pedagogical reviewer (difficulty calibration) → publisher — mirrored in CMS roles.
6. **Velocity plan:** pipeline lands in Phase 4; steady state 12–15 lessons/week (2 authors + 1 reviewer) reaches the ~480-lesson corpus in ~8–9 months, matching v1.0. MVP subset (~90 lessons) ≈ 7 weeks.
7. **Derivable formats:** structured blocks mean slides/outlines/narration scripts (Reference A's hand-maintained `scripts/` and `slides/`) become **transforms, not rewrites**.
8. **Dogfooding loop:** the team learns on the platform itself; friction reports become content/UX issues automatically. The platform's own architecture is the capstone case study.
9. **Community contributions (post-MVP):** Git-based content means external PRs flow through the same review pipeline.

---
# Part 27 — Quality Requirements & Traceability

## 27.1 Definition of done (whole product)

Production-ready (deployable, observable, backed-up, rehearsed rollback) · scalable (10⁴ content items, 10⁵ users, horizontal runner scaling — no architecture change) · maintainable (feature modules, typed end-to-end, ADRs, content pipelines; **no overengineering** — every subsystem exists because a stated requirement pulls it) · accessible (WCAG 2.2 AA verified) · responsive (mobile-first, real devices) · fast (§18 budgets in CI) · secure (§19 + escape suite green) · SEO-friendly (server-rendered public content, metadata, sitemaps, structured data) · developer-friendly (teaches by example) · beginner-friendly (the references' warmth — analogies, narration, encouragement — survives into a far more rigorous system).

## 27.2 Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Sandbox escape / abuse | Medium | Critical | Tiered isolation, no-egress workers, quotas, run logging, escape test-suite gate (Phase 16), Tier-0 fallback |
| 2 | Content volume slips (480 lessons is the biggest cost) | High | High | MVP scope cut (§25.2); Git-plane authoring efficiency; content CI prevents rework; parallel content phases 5–10 |
| 3 | Technology drift invalidates content | Certain (time) | Medium | §10 versioning system *designed for this*: registry, staleness dashboard, labels, review cadence, re-baseline epic |
| 4 | Scope creep beyond 7 technologies | Medium | High | §2.6 scope policy + ecosystem-label rule enforced at content review |
| 5 | Search quality disappoints | Medium | Medium | Labeled query set with CI accuracy gate; curated aliases; Atlas path pre-designed behind the seam |
| 6 | Performance regressions from embeds | Medium | Medium | Budget CI, lazy sandbox bundles, Tier-0 fallbacks |
| 7 | Single-maintainer bus factor | Medium | Medium | ADRs, monorepo conventions, content-in-DB (no bespoke archaeology), this document |

## 27.3 Deliverables map (the 25 required outputs)

| # | Deliverable | Where |
|---|---|---|
| 1 | Reference-project analysis | Part 1 (+ sources: KIMI.md Part 1, plan.md Part I) |
| 2 | Product requirements document | Part 2 |
| 3 | Complete curriculum | Part 4 (+ 5) |
| 4 | Information architecture | Part 3 |
| 5 | UX architecture | Part 16 |
| 6 | UI architecture | Part 17 |
| 7 | Design system proposal | §17.1–17.4 |
| 8 | Technical architecture | Part 11 |
| 9 | Database architecture | Part 12 |
| 10 | API architecture | Part 13 |
| 11 | Authentication architecture | Part 14 |
| 12 | Search architecture | Part 8 |
| 13 | Interactive learning architecture | Part 7 |
| 14 | Content management architecture | Part 15 (+ §11.3) |
| 15 | Project architecture | Part 5 + Part 22 |
| 16 | Security architecture | Part 19 |
| 17 | Performance architecture | Part 18 |
| 18 | Testing strategy | Part 23 |
| 19 | Recommended project structure | Part 22 |
| 20 | Development roadmap | Part 24 |
| 21 | Feature prioritization | §25.1 |
| 22 | MVP definition | §25.2 |
| 23 | Post-MVP roadmap | §25.3 |
| 24 | Content production strategy | Part 26 |
| 25 | Versioning strategy | Part 10 (+ §25.3 currency cadence) |

## 27.4 Critical requirements traceability

| Critical requirement | Where satisfied |
|---|---|
| Platform is standalone; no external sites needed | §2.4 P1 · §4.1 lesson anatomy · Part 9 internal reference + errors · §16.2 auto-linked concepts |
| Content reflects August 2026 technologies | §2.5 pinned baseline · Part 10 version truth · per-track baselines |
| Curriculum restricted to the seven technologies | §2.6 scope + ecosystem policy · Part 4 |
| Not a generic tech encyclopedia | §4.2 (foundations scoped to stack needs) · §2.6 |
| Not copying either reference's UI | §1.3 discard list · Part 17 positioning |
| Interactive learning prioritized | Part 7 · §4.1 SEE/TRY/PRACTICE · Phase 11 |
| Deep enough for professional development | L3–L4 per track · Track 9 · production capstone |
| Beginner → production progression | First-class Levels · project tiers · placement quizzes |
| Architecture scales to a very large curriculum | Part 12 schema · §11.3 pipeline · §26 velocity plan |
| Content evolves with technology | Part 10 · §25.3 currency cadence |

---

# Closing Note

Each source plan saw half the elephant. `KIMI.md` understood the *pedagogy* — narrated visualizers, analogies, code anatomy — because it studied the interactive reference. `plan.md` understood the *engineering* — pinned versions, tiered sandboxes, the Technology Registry, metrics, risks — because it was built to be executed. This synthesis keeps both: the soul of the algorithms course and the discipline of a production blueprint, merged conflict-free through the Part 0 decision log.

**The one-sentence test for every future decision:** *could a student finish this feature's journey without opening another tab?* If yes — build it. If it requires leaving the platform to understand something in scope — the content is not done.

*End of master blueprint.*
