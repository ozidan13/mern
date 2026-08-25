# FullStack Academy — Static Edition
## Implementation Plan: a zero-build HTML/CSS/JS platform

**Document status:** Final implementation plan — supersedes the *implementation* of `docs/newplan.md` (which remains the pedagogy & curriculum source of truth)
**Date:** August 25, 2026
**Product:** Standalone educational platform for the modern JavaScript full-stack
**Implementation baseline:** Pure **HTML + CSS + JavaScript** — no frameworks, no build step, no database, no server. Modeled directly on the **Algorithms & Data Structures course** (`D:\work\projects\algorithms`): open a file, it works; push to GitHub Pages, it's live.

---

## Table of Contents

- Part 0 — Why a static edition (the synthesis)
- Part 1 — What we inherit from each parent
- Part 2 — Product definition (scaled)
- Part 3 — Architecture: the zero-build rules
- Part 4 — Information architecture & file map
- Part 5 — Project structure
- Part 6 — Design system
- Part 7 — The lesson standard: standalone interactive learning modules, interactivity quota, bilingual AR/EN, SVG, animations & visual engagement
- Part 8 — The Interactive Kit (component contracts)
- Part 9 — State, storage & the "no backend" compensations
- Part 10 — Client-side search
- Part 11 — Curriculum scope & volume
- Part 12 — Testing strategy (static-appropriate)
- Part 13 — Development Roadmap (17 Phases)
- Part 14 — Prioritization, MVP & post-MVP
- Part 15 — Risks & honest limitations
- Part 16 — Definition of done

---

# Part 0 — Why a static edition

`newplan.md` is a production blueprint for a database-backed platform (Next.js + Prisma + Postgres + sandbox orchestrator + admin CMS, 18 phases, ~480 lessons). It is correct *as a destination* — but it is months of infrastructure before a single student learns anything.

The Algorithms project proves the opposite extreme works surprisingly well: **one person shipped a complete, beloved interactive course as plain HTML files** — narrated steppers, execution logs, analogy-first lessons, zero dependencies, deployable by `git push`. Its problems were never "HTML/CSS/JS"; they were *engineering discipline* failures: duplicated heads, no shared CSS, no shared JS, flat navigation, no persistence, no search.

**This plan is the middle path:** the Algorithms project's simplicity and deployment model, with `newplan.md`'s pedagogy, design system, curriculum, and engineering rigor grafted on. Every feature from the big blueprint is either reproduced client-side, replaced with an honest simpler equivalent, or explicitly deferred — nothing is silently dropped.

> **The one-sentence test (inherited):** *could a student finish this feature's journey without opening another tab?* Second test, added: *does it still work when opened as a double-clicked file?*

---

# Part 1 — What we inherit from each parent

## 1.1 From the Algorithms project (`D:\work\projects\algorithms`)

| Inherits | How it appears here |
|---|---|
| Pure static delivery — no install, no build | Every page is hand-authored HTML; site works from `file://` and GitHub Pages |
| **Narrated step-through visualizer** (precomputed steps → pointer → renderer → autoplay + manual step + capped execution log) | Generalized into one shared `stepper.js` engine used by every visualization |
| Analogy-first explanations | Mandatory `analogy` callout opens every lesson's LEARN section |
| Line-by-line code anatomy (two-pane, synced highlight) | Standardized `code-anatomy` component |
| Per-section color identity (week colors) | Per-track accent tokens (`--track-react`, `--track-node`, …) |
| Terminal-chrome code windows | Standardized `CodeBlock` component (dots, filename tab, copy button) |
| Contextual tips (`notifications/messages.json` concept) | `data/tips.js` keyed by track/lesson, rendered as dismissible banners |
| `tasks/` standalone practice apps | Kept verbatim as the level-gate mini-projects convention |
| Bilingual teaching (English headings/terms/code + Arabic explanations) | **Core policy everywhere** (Part 7.5); full RTL support; Arabic-explanation learners are the primary audience |

## 1.2 From `newplan.md` (fixed, not dropped)

| Big-blueprint feature | Static-edition equivalent |
|---|---|
| Learning Loop lesson anatomy (Learn→See→Try→Anatomy→Deep Dive→Practice→Prove→Production Notes) | Kept **in full**, as the HTML lesson template (Part 7) |
| Design system tokens, dark/light, AA contrast | `css/tokens.css` — single source of truth, zero hardcoded hex elsewhere |
| Three-tier sandbox | Tiers 0–1 only: static code (always) + in-browser Worker runner (Part 8.3). Tier 2 (server containers) explicitly out of scope |
| Progress, streaks, bookmarks, notes, review queue | `localStorage` store + export/import (Part 9) |
| Variant pools + spaced repetition (SM-2-lite) | Kept client-side: pools in quiz data, review queue computed locally |
| Postgres FTS + ⌘K palette | Pre-built client-side index + palette (Part 10) |
| Technology Registry, version chips, pattern labels, review cadence | `data/technologies.js` registry + per-lesson chips; quarterly chip-review ritual |
| Internal reference docs + error catalog | `reference/` section, same dense template |
| Projects with milestones/rubrics | Static brief pages + persisted checklists |
| Content CI (validate links, solutions, structure) | Zero-dependency Node validator scripts run manually/pre-push |
| WCAG 2.2 AA, `prefers-reduced-motion`, aria-live narration | Non-negotiable, baked into components |

## 1.3 Deliberately NOT carried over

Server-rendering, accounts/OAuth, databases, Docker sandboxes, admin CMS, rate limiting, payments, video hosting, monorepo/toolchains. Each returns naturally if the project ever graduates to the full blueprint; the content (the expensive part) ports 1:1 because lessons are self-contained documents either way.

---

# Part 2 — Product definition (scaled)

**Vision:** unchanged from `newplan.md` §2.1 — *one website, zero external tabs* — from "I know some JavaScript" to "I can build a production full-stack app," achieved entirely through reading, visualizing, practicing, and building.

**What changes:** the platform is a **well-engineered static site**, not a web application. Personalization is local. Collaboration is Git. Publishing is commit-and-push.

**Personas:** **Arabic Learner Amira** (primary — understands fastest when concepts are explained in Arabic while every technical term stays English, exactly like the Algorithms course) · Bootcamp Grad Bilal · Interview Prep Dana · Mobile Studier · **Offline Learner Omar**, who downloads the repo and studies without internet (a persona the static edition serves better than the original ever could).

**Scope (curriculum):** the same seven technologies — React, Node.js, Express, Next.js*, MongoDB, PostgreSQL, Prisma — plus Foundations. (*Next.js appears as a concepts-and-comparison module rather than a full track: without a server runtime, students read and analyze Next code but cannot execute it in-browser; see Part 11.*)

**Out of scope:** everything else in `newplan.md` §2.6, plus: accounts, cloud sync, server-side grading, admin UI.

---

# Part 3 — Architecture: the zero-build rules

These ten rules are constitutionally binding. Any change requires editing this section first.

1. **No build step.** No bundler, no transpiler, no framework, no `npm install` required to *browse or author*. Plain scripts and plain CSS.
2. **Two kinds of files only:** hand-authored pages/assets, and zero-dependency Node dev-scripts (`scripts/*.mjs`) used to generate derived data and validate quality. Dev-scripts never ship to the site.
3. **Shared CSS, shared JS.** The Algorithms project's one failure mode (every page re-inlining ~700 lines) is banned. Pages load `css/*.css` and `js/*.js`; per-page code is limited to a small inline `<script>` containing *that lesson's data and render functions only*.
4. **All shared data ships as `.js`, not fetched `.json`:** `data/curriculum.js`, `data/technologies.js`, `data/tips.js`, `data/search-index.js` each assign to `window.FSA.*` via `<script src>`. Reason: `fetch()` of JSON fails on `file://` (CORS), `<script src>` does not. **This single decision is what makes the whole site work offline and from a double-click.**
5. **Relative paths only.** No leading slashes, no absolute URLs — GitHub Pages project-sites and `file://` both break otherwise.
6. **No CDN dependencies.** No Tailwind Play, no Font Awesome, no Google Fonts requests, no AOS. Fonts = system stack; icons = inline SVG sprite; animations = CSS gated on `prefers-reduced-motion`.
7. **Progressive enhancement.** Every interactive has a static fallback (Tier 0). Reading any lesson with JavaScript disabled yields complete prose, SVG diagrams, and code.
8. **State is namespaced and versioned.** All persistence lives under `localStorage` keys prefixed `fsa.` with a schema version (Part 9). Corrupt state degrades gracefully to defaults.
9. **Untrusted code never runs in the page origin.** Student/executed code goes through the Worker-based runner (Part 8.3) with timeouts; the runner degrades to "show expected output" if Workers are unavailable.
10. **Content is the interface.** Chrome recedes; every lesson is readable, printable, and self-contained in meaning.

---

# Part 4 — Information architecture & file map

```text
/                                index.html — landing: hero, stats, path overview, continue-card
/learn                           learn/index.html — all tracks + progress states
/learn/<track>                   learn/<track>/index.html — track home: levels, outcomes, gates
/learn/<track>/<lesson>          learn/<track>/<lesson>.html — THE LESSON PLAYER
/reference                       reference/index.html — docs hub
/reference/<tech>/<page>         reference/<tech>/<page>.html — cheatsheets, errors, versions
/exercises                       exercises/index.html — browsable exercise catalog
/projects                        projects/index.html — project catalog
/projects/<slug>                 projects/<slug>.html — brief, milestones, rubric, checklist
/tasks/<app>.html                tasks/*.html — standalone level-gate apps (Algorithms tradition)
/playground                      playground.html — free JS sandbox
/dashboard                       dashboard.html — progress, streak, bookmarks, notes, review queue
/search                          search.html — full-page search (palette is the fast path)
/styleguide                      styleguide.html — living design-system reference (authors' tool)
/404.html
```

Navigation spine (fixing both references' wayfinding failures):

- **Topbar:** logo · global search trigger (Ctrl-K / Cmd-K) · theme toggle · dashboard link
- **Lesson left pane:** curriculum tree rendered from `curriculum.js` with per-item progress dots
- **Right pane:** on-this-page TOC with scroll-spy
- **Footer of every lesson:** Prev / Next · Mark complete · Bookmark
- **Breadcrumbs** on every non-home page · position indicator ("3/20") on every lesson
- **Mobile:** panes become drawers + persistent bottom bar (Prev · TOC · Next)
- **Labels:** chrome is bilingual throughout — "Next · التالي", "Mark complete · أكملت الدرس", "Search · بحث"

---

# Part 5 — Project structure

```text
fullstack-academy/
├── index.html
├── learn/
│   ├── index.html
│   ├── foundations/          how-web-works.html · js-essentials.html · async-js.html …
│   ├── react/                thinking-in-react.html · use-state.html · useEffect.html …
│   ├── nodejs/               what-node-is.html · event-loop.html · streams.html …
│   ├── express/              hello-express.html · middleware.html · rest-crud.html …
│   ├── mongodb/              document-model.html · crud.html · aggregation.html …
│   ├── postgresql/           relational-model.html · joins.html · transactions.html …
│   ├── prisma/               what-is-an-orm.html · schema-and-models.html …
│   └── architecture/         separation-of-concerns.html · request-lifecycles.html …
├── reference/
│   ├── index.html
│   └── <tech>/               cheatsheet.html · errors.html · versions.html
├── exercises/  projects/  tasks/            (catalogs, briefs, gate apps)
├── dashboard.html  playground.html  search.html  styleguide.html  404.html
├── css/
│   ├── tokens.css            design tokens — the ONLY place raw colors/radii exist
│   ├── base.css              reset, typography, utilities, prose styling
│   ├── components.css        cards, callouts, buttons, badges, code frames, tables…
│   ├── layout.css            topbar, sidebar, drawers, three-pane shell, bottom bar
│   └── learning.css          stepper, log, quiz, exercise, playground, viz states
├── js/
│   ├── app.js                shell: tree render, breadcrumbs, prev/next, TOC spy, drawer
│   ├── theme.js              dark/light + persisted preference, no flash
│   ├── stepper.js            narrated stepper ENGINE (Part 8.1)
│   ├── codeblock.js          copy buttons, language chips, line-anchor permalinks
│   ├── playground.js         editor + Worker runner + console capture (Part 8.3)
│   ├── quiz.js               checkpoint component (Part 8.4)
│   ├── exercise.js           exercise component: tests-in-worker, hints, solution gate
│   ├── progress.js           the localStorage store API (Part 9)
│   ├── search.js             index loading, scoring, palette + page UI
│   └── tips.js               contextual tip banners from data/tips.js
├── data/
│   ├── curriculum.js         window.FSA.curriculum — the whole site tree (generated)
│   ├── technologies.js       window.FSA.technologies — version registry
│   ├── tips.js               window.FSA.tips — contextual messages
│   └── search-index.js       window.FSA.searchIndex — generated (Part 10)
├── templates/
│   └── lesson-template.html  the copy-paste starting point for authors
├── scripts/                  DEV-ONLY, zero-dependency Node 22+, never deployed
│   ├── gen-curriculum.mjs    scan learn/**.html headers → curriculum.js
│   ├── build-search-index.mjs scan pages → search-index.js
│   ├── check-content.mjs     content CI-lite (Part 12)
│   └── new-lesson.mjs        scaffold a lesson from the template
├── assets/                   logo.svg, favicon.svg, og-image.png, icons sprite, vendored React UMD
├── docs/                     this plan, AUTHORING.md, DECISIONS.md
└── README.md
```

**Conventions:** files & slugs `kebab-case.html` · classes prefixed `fsa-` · IDs camelCase · every lesson begins life via `node scripts/new-lesson.mjs react use-state` · one lesson = one HTML file (+ optionally one entry in `tasks/`).

---

# Part 6 — Design system

Port of `newplan.md` §17, minus Tailwind. Positioning: **a focused developer tool, not a landing page** — typography-led, dark-first, visual interest comes from content.

## 6.1 Tokens (`css/tokens.css` — the only place raw values exist)

```css
:root {
  /* surfaces & text — dark default, WCAG AA+ pairs */
  --bg-canvas:#0B0F17;  --bg-surface:#111726;  --bg-raised:#1A2236;  --bg-code:#0D1117;
  --border-subtle:#222B41;  --border-default:#2E3A57;
  --text-primary:#E6EAF2;   /* ≥15:1 */
  --text-secondary:#A8B3C7; /* ≥7:1 */
  --text-muted:#7D8AA3;     /* ≥4.5:1 */
  --accent-primary:#4F8CFF; --accent-success:#3FBD7C;
  --accent-warning:#E5B454; --accent-danger:#E5647A;

  /* per-track identity (systematized version of the "week colors") */
  --track-found:#F59E0B;  --track-react:#61DAFB; --track-node:#8CC84B;
  --track-express:#9CA3AF;--track-mongo:#47A248; --track-pg:#6FA8DC;
  --track-prisma:#7C8CF8; --track-nextjs:#FFFFFF;--track-arch:#B588C7;

  /* visualization state scale (generalized from the algorithms array cells) */
  --viz-idle:#2A3350; --viz-active:#4F8CFF; --viz-comparing:#E5B454;
  --viz-found:#3FBD7C; --viz-eliminated:#3A3F52;

  /* spacing on a 4pt grid; radii 6/10/14px; two shadow levels */
}
[data-theme="light"] { /* full parallel token set — components never fork */ }
```

- **Type (Latin):** system stack (`Inter` if locally installed → `-apple-system, Segoe UI, Roboto…`); mono: `Cascadia Code / Consolas / Menlo / monospace`. Fluid scale 12→34px; **lesson h1 = 30px reading scale — explicitly rejecting the references' 72px hero type.** Prose measure 65–75ch.
- **Type (Arabic):** **Cairo** — the Algorithms course's font — self-hosted as WOFF2 files in `assets/fonts/` with a Tajawal/system fallback; vendored once at author time so runtime still makes zero CDN requests. Applied via `.fsa-ar`; Arabic line-height ≥ 1.9 for comfortable reading.
- **RTL & mixed direction:** all Arabic blocks are `dir="rtl"` wrappers styled with CSS logical properties (`margin-inline-start`, never `left`) so bilingual pages never break; code blocks stay LTR inside Arabic prose; embedded English terms get bidi isolation so punctuation never scrambles.
- **Motion:** 150ms micro / 250ms layout; everything gated on `prefers-reduced-motion`; stepper autoplay defaults OFF under reduced motion.
- **Breakpoints:** 640 / 768 / 1024 / 1280. Mobile body ≥16px, touch targets ≥44px, no hover-only affordances.
- **Icons:** one inline SVG sprite (`assets/icons.svg` symbols), `currentColor` only, zero icon fonts, no emoji as information carriers.
- **State is never color-only:** visualization cells also change shape/glyph/label (fixing the reference's color-only cells).

`styleguide.html` renders every token and component in both themes — the authors' contract and the QA fixture in one file.

---

# Part 7 — The lesson standard: standalone interactive learning modules

Every lesson follows `newplan.md` §4.1's eight-beat Learning Loop expressed as semantic HTML — but structure alone is nothing without depth, and depth alone is nothing without engagement. This part defines the mandatory content bar: what "fully detailed" means mechanically, how interactivity and visual engagement are dosed to hold attention and prevent cognitive fatigue, and exactly how Arabic and English mix. The visual and interactive benchmark is [`style-reference/style-ref-01.html`](../style-reference/style-ref-01.html) — every lesson must match or exceed its production quality.

> **The quality axiom:** Each lesson is a **standalone interactive learning module**, not a documentation page, not a slide deck, not a blog post. It is closer to a mini-course chapter that happens to live in one HTML file — a student should be able to learn, practice, and verify mastery of the topic without ever leaving the page or the platform.

## 7.1 The standalone mandate — one page IS the complete resource

A lesson is a **complete mini-chapter** — the student must **not need to leave the platform, search Google, watch external videos, or use another resource** to understand the topic. The acceptance question for every single lesson:

> *"If a student who only has the listed prerequisites opens ONLY this page, can they fully understand and apply this topic — definition, mechanics, examples, edge cases, mistakes — without opening anything else?"*

**Completeness requirements, binding on every author:**

- **No unexplained jargon.** Any term not taught in an earlier lesson gets a one-line inline explanation plus a glossary entry at first use.
- **No "we'll cover that later" holes.** Everything referenced must exist behind an *internal* link to the exact lesson/anchor that teaches it.
- **No summary bullets standing in for explanation.** Bullets may organize; only full sentences teach.
- **No important information intentionally omitted.** Cover all essential concepts, terminology, practical details, examples, edge cases, common mistakes, and relevant context required for mastery of the topic.
- **Structure content progressively.** Start from the fundamentals and move toward practical and advanced understanding where appropriate.
- **External links are footnotes for the curious**, never required reading (inherited principle P1).
- **No topic depends on external resources for basic understanding.** If you cannot teach it fully on the page, the page scope is wrong — split or merge.

## 7.2 Mandatory depth inventory — every lesson ships ALL seventeen elements

| # | Element | Requirement |
|---|---|---|
| 1 | Objectives + est. time | Header; 3–5 concrete "after this you can…" statements |
| 2 | Plain-language definition | What it is in one breath — Arabic first |
| 3 | Formal definition | The precise version immediately after the plain one |
| 4 | Why it exists | The problem before the feature: what the world looked like without it |
| 5 | Real-life analogy | Arabic, concrete, memorable (dictionary lookup, conveyor belt…) — the Algorithms signature |
| 6 | Step-by-step mechanics | Numbered walk of exactly what happens, in order, no skipping |
| 7 | Worked example | One full example traced start→finish with real values, never pseudocode-only |
| 8 | Visualizer / diagram | Narrated stepper or annotated animated SVG showing it move |
| 9 | Runnable code + anatomy | Complete runnable snippet (Tier 1 where possible) + line-by-line explanation |
| 10 | Edge cases & gotchas | The weird corners named explicitly, each with a demonstration |
| 11 | Common-mistakes gallery | 2–4 broken snippets: broken → symptom → diagnosis → fix |
| 12 | Performance / cost notes | Where the topic meets complexity, memory, bandwidth, or money |
| 13 | Mini-glossary | This lesson's terms: EN term + AR explanation |
| 14 | Practice ladder | Easy / Medium / Hard (+ optional Challenge) exercises |
| 15 | Checkpoint quiz | 3–6 pool questions, explanations, anchor deep-links |
| 16 | Production notes + interviews | How it's used for real; 3–5 typical interview questions WITH answers |
| 17 | Related lessons | Prev/next + "same concept elsewhere in the platform" internal links |

**Sizing guidance (depth, not padding):** concept lessons land around **1,500–2,500 words-equivalent** including captions; API/syntax lessons carry similar weight with a higher code ratio. If a topic honestly fits in less, merge it into a neighboring lesson instead of thinning the bar.

## 7.3 Page structure — the consistent lesson experience

Authors copy `templates/lesson-template.html` and fill it; `learning.css` styles every beat; shared JS upgrades the beats that need it. The structure is inspired by the reference lesson's flow (Hero → Concept → Detailed Example → Complexity → Interactive Demo → Code Implementation) and generalized for all topics.

**The canonical lesson flow** (adapt when the topic requires a different sequence, but maintain the same principles — complete coverage, practical application, interactivity, visual engagement, immediate feedback, clear mastery verification):

```text
HEADER      breadcrumbs(auto) · track badge · est. time · version chip
            ("Teaches: React 19.2 · reviewed Aug 2026") · pattern-label badge

1 INTRO     Hero-style introduction: topic name (EN + AR), one-line hook,
            learning objectives (3–5 concrete "after this you can…" statements),
            visual context badge (like the reference's "WEEK 1 · خوارزميات البحث")

2 LEARN     definition (plain AR → formal) · why-it-exists · ANALOGY callout
            (Arabic, mandatory, comes first — like the reference's dictionary analogy) ·
            step-by-step mechanics in numbered card layout (like the reference's
            bordered-start step cards with numbered badges) · worked example ·
            callouts / tables / terminology cards

3 SEE       STEPPER mount + inline SVG diagrams with CSS animation — the visual
            explanation of the concept (like the reference's step-by-step array
            visualization with pointers, eliminated cells, and Arabic narration)

4 TRY       **Try-It / Interactive Practice** section — the student actively applies
            the concept: PLAYGROUND mount (editable code + Run) + EXPERIMENT blocks
            ("predict, then flip this and re-run") + interactive exercises from §7.4
            (like the reference's "Try It Yourself" search demo with input + step + autoplay)

5 ANATOMY   code-anatomy: two panes, per-line Arabic explanation, synced highlight
            (like the reference's side-by-side code + "شرح كل سطر" panel)

6 DEEP DIVE <details> collapsible: internals, edge cases, complexity analysis
            (like the reference's Time/Space complexity cards with tables and formulas),
            legacy-vs-modern comparisons

7 PRACTICE  exercise ladder Easy → Medium → Hard (+ Challenge)
            + common-mistakes gallery (broken → diagnose → fix)
            — every exercise has immediate feedback explaining WHY

8 PROVE     CHECKPOINT mount: 3–6 interactive questions (never static lists),
            instant Arabic feedback, wrong answers deep-link back to the teaching
            anchor — functions as the mastery verification gate

9 PRODUCTION NOTES  <details>: real-world usage · interview Q&A · related lessons ·
            summary of key takeaways

FOOTER      prev/next(auto) · Mark complete · Bookmark · "Where you'll use this"
```

**The lesson experience contract:** every lesson follows this consistent high-quality structure. The student always knows where they are (intro → learning → seeing → doing → deepening → practicing → proving). The structure is designed to prevent cognitive fatigue through variety: prose is broken by visuals, visuals lead to interactivity, interactivity leads to deeper explanation, and the cycle repeats.

## 7.4 The interactivity mandate — interactive practice replaces static questions

Passive reading is the enemy of learning. **Static question lists are banned** as the primary way to test understanding — every topic must include a meaningful interactive practice activity directly related to the lesson objective. Two binding rules:

**The quota (minimum per lesson):**

- 1 narrated **STEPPER** *or* **PLAYGROUND** (the SEE/TRY heart),
- 1 **EXPERIMENT** ("predict, then reveal"),
- 1 **CHECKPOINT quiz** (interactive, with immediate bilingual feedback — NOT a static list),
- 1 **Try-It / Interactive Practice** section (see below),
- ≥ 3 micro-interactions from the kit in §8.6 (flip cards, predict-output, ordering…).

**The Try-It mandate — every topic gets hands-on practice:**

Do **not** rely on traditional static question lists as the primary way to test understanding. Every topic must include a meaningful **Try It / Interactive Practice** section directly related to the lesson objective. The interactive activity must require the student to actively apply what they just learned. Accepted interaction types:

| Interaction type | When to use |
|---|---|
| Interactive code exercises | Student writes/modifies real code and sees output |
| Fill-in-the-blank challenges | Student completes missing parts of code or concepts |
| Live previews | Student changes code and sees visual result immediately |
| Drag-and-drop ordering | Student arranges steps, lifecycle phases, or priorities |
| Predict-the-output challenges | Student commits a guess before seeing the real answer |
| Click-to-reveal interactions | Student explores layered information by clicking |
| Debugging tasks | Student finds and fixes broken code with immediate feedback |
| Step-by-step simulations | Student controls a visualizer step-by-step (like the reference's binary search demo) |
| Mini challenges | Timed or scored quick tasks within a lesson |
| Interactive decision-making | Student makes architecture/design choices and sees consequences |

Every interaction must provide **immediate feedback** and clearly explain **why** an answer is correct or incorrect. Design the interaction to verify that the student actually understands the concept rather than simply memorizing an answer. Every lesson should have a **clear mastery target** and an interactive mechanism that tests that target.

**The rhythm rule — prevent boredom and cognitive fatigue:** no stretch of more than **~400 words (~2 reading minutes)** without hitting an interaction, a diagram, or a visual state change. The lesson experience should feel dynamic rather than like a long static document. Use a balanced combination of:

- Short explanatory sections (never walls of text)
- Visual examples and animated diagrams
- Interactive demonstrations and simulations
- Practice moments and micro-challenges
- SVG illustrations and purposeful animations
- Realistic code examples with live output
- Feedback and progress indicators
- Section transitions that reset cognitive load

Break large topics into digestible learning segments while still maintaining complete coverage of the subject. A reader should physically *do* something every couple of minutes.

Supporting behavior: experiments force a committed guess before revealing truth (retrieval practice beats re-reading); every interaction is keyboard-operable, screen-reader announced, and reduced-motion-safe — focus aids, never gimmicks.

## 7.5 The bilingual authoring pattern (exactly like the Algorithms course)

The reference course proved the format: **English carries the technical skeleton (titles, headings, code, filenames, UI verbs); Arabic carries the understanding (explanations, analogies, narration).** Adopted here as the law of the land:

```html
<h2>How Binary Search Works</h2>
<p>Finding one item among 1,000,000 sorted items takes at most 20 steps.</p>
<p class="fsa-ar" dir="rtl">
  تخيّل إن عندك قاموس وبتدوّر على كلمة «Binary». مش هتفتح من أول صفحة —
  هتفتح في النص، تشوف الكلمة قبلها ولا بعدها، وتستبعد نص القاموس مرة واحدة!
  دي بالظبط فكرة الـ <i>Binary Search</i>: نص البيانات بيستبعد في كل خطوة.
</p>
<pre><code>while (low <= high) { /* code always stays LTR */ }</code></pre>
```

Rules:

1. Headings, code, filenames, buttons: **English** (chrome labels are bilingual pairs like "Next · التالي").
2. Explanations, analogies, step narration, stepper log messages, quiz feedback: **Arabic**, keeping technical terms verbatim in English (`الـ event loop`, `props`, `middleware`).
3. First occurrence of any technical term = English term + short Arabic gloss inline; afterwards the English term is used forever — we never invent Arabic equivalents.
4. Arabic prose uses `.fsa-ar` (Cairo, RTL, line-height ≥ 1.9); embedded English terms get bidi isolation so punctuation never scrambles.
5. Both languages say the same thing — Arabic is the teaching voice with personality, not a shorter summary of the English.
6. Stepper `say:` strings and quiz explanations are authored in Arabic (they are the narrator's voice), mirroring the Algorithms execution logs.

## 7.6 Visual engagement standard — animations, SVGs & anti-fatigue design

The reference lesson (`style-ref-01.html`) demonstrates the target: glassmorphic cards, gradient accents, color-coded state transitions, animated array cells with glow effects, scroll-triggered reveals, and interactive visual demos that make abstract concepts tangible. Every lesson must match this production quality using our design system tokens rather than Tailwind.

### 7.6.1 Mandatory visual elements per lesson

- **≥ 1 hand-authored inline `<svg>` conceptual diagram** — colored via tokens (`var(--track-react)`), carrying `<title>` + `<desc>` for screen readers. Screenshots of diagrams are banned.
- **≥ 1 purposeful CSS-only animation** (`@keyframes`/transitions applied to SVG parts): marching-dash flow along connection lines (`stroke-dashoffset`), pulsing active nodes, state-color transitions on cells, conveyor movement, growing bars/rings for complexity charts.
- **≥ 1 interactive visual element** — hover/click/focus reveals, animated state transitions, visual feedback for student actions (like the reference's array cells changing color/scale/glow on step progression).
- **Purposeful micro-interactions** throughout — button hover effects, card lift-on-hover, smooth section transitions, progress indicators that animate on completion.

### 7.6.2 Visual design principles (benchmarked against the reference)

Every lesson should intentionally use visual elements to maintain attention and reduce cognitive fatigue:

| Visual technique | Purpose | Reference example |
|---|---|---|
| Purposeful animations | Explain concepts through motion | Array cells scaling up with glow when selected as `mid` |
| Interactive SVG illustrations | Make abstract data structures tangible | Color-coded array with `in-range`, `eliminated`, `found` states |
| Animated diagrams | Show processes and state changes over time | Step-by-step walkthrough with visual state transitions |
| Visual explanations | Replace walls of text with visual reasoning | Side-by-side grid: visualization + Arabic explanation |
| Micro-interactions | Maintain engagement and provide feedback | Hover effects on code lines, button animations |
| Progressive reveals | Control information density | Step-by-step sections appearing via scroll-triggered animations |
| Hover and click interactions | Encourage exploration | Code line highlighting on hover, term explanations on focus |
| Visual feedback for actions | Confirm student input immediately | Green glow on found element, red fade on eliminated elements |
| Motion that explains | Animation serves comprehension, not decoration | Pointers moving to show `low`/`mid`/`high` position changes |

### 7.6.3 Anti-boredom visual rhythm

The lesson must never feel like a long static document. Visual variety is mandatory:

- **Alternate between** prose sections, visual diagrams, interactive demos, and code blocks — never three consecutive prose-only sections.
- **Use card-based layouts** for grouped information (like the reference's glassmorphic cards for step-by-step breakdowns).
- **Color-code related elements** consistently (e.g., `low` pointer always blue, `high` always purple, `mid` always amber — maintained across all diagrams and code in the lesson).
- **Animate state transitions** rather than showing before/after snapshots — the student should see the change happen.
- **Use visual hierarchy aggressively** — numbered step badges, colored sidebar borders on step cards, gradient text for key terms, accent-colored section dividers.

### 7.6.4 Technical constraints

- All animation gated on `prefers-reduced-motion` (static end-state shown instead).
- Steppers remain the master animators: CSS responds to step-state changes driven by the engine — one clock, no competing timers.
- Canvas is allowed only for optional decorative homepage particles, never for teaching content.
- Zero external animation libraries (no AOS, no GSAP) — CSS transitions, `@keyframes`, and `IntersectionObserver`-driven class toggles only.

## 7.7 Mechanical quality gate (`check-content.mjs` enforces all of this)

exactly one `h1` · objectives present · Arabic analogy block present · ≥ 1 inline SVG with `<title>`/`<desc>` · ≥ 1 animation utility class used · ≥ 1 interactive visual element · ≥ 1 stepper-or-playground · ≥ 1 experiment · ≥ 1 try-it interactive practice section · checkpoint with resolvable anchors · ≥ 1 exercise · glossary + mistakes-gallery + production notes present · **bilingual coverage: ≥ 40% of prose paragraphs carry `fsa-ar`** · version chip present · all internal links resolve · no absolute paths · no external asset URLs.

**Additional quality rules (not automatable — enforced by author review):**

- No important information intentionally omitted for the topic scope.
- No topic depends on external resources for basic understanding.
- No topic is tested only through static questions — every topic has an interactive mastery check.
- Every topic contains an interactive way to apply the concept.
- Every topic uses appropriate visual elements, animations, and/or SVGs.
- Every interaction has a learning purpose — no decorative-only interactivity.
- Every lesson is designed to keep students engaged while helping them genuinely master the subject.
- The lesson passes the "train test": a student on a train with no internet, working from downloaded files, can complete the entire lesson journey.

---

# Part 8 — The Interactive Kit (component contracts)

Build once, data-driven, reused everywhere. These six contracts are the heart of the project.

## 8.1 Stepper engine (`js/stepper.js`) — the flagship

Generalization of the Algorithms pattern. A lesson declares:

```html
<div class="fsa-stepper" id="bs-demo"></div>
<script>
  FSA.stepper.mount({
    el: 'bs-demo',
    title: 'Binary search — watch the range halve',
    init: () => ({ arr: sortedRandom(15), target: pick() }),   // pure state factory
    steps: (state) => [                                        // PRECOMPUTED steps
      { l:0, h:14, m:7, found:false, say:'Range 0–14. Mid = 7. Too small.' },
      /* … */
    ],
    render: (state, step, els) => { /* draw cells into els.viz with state classes */ },
    labels: { idle:'out of range', comparing:'checking', found:'found!', eliminated:'ruled out' }
  });
</script>
```

The engine provides, for every visualization free of charge:

- Play/Pause (600ms tick) · Step · Reset · New-example (re-runs `init`) · progress scrubber
- **Execution log panel** — capped, colored entries narrating what just happened (the reference's soul)
- **`aria-live="polite"` narration channel fed by the same `say` strings** — accessibility falls out of the architecture
- Full arrow-key operation · reduced-motion handling (autoplay off, manual stepping intact)
- State legend with glyphs + labels (never color-only)

**Acceptance invariant:** the engine ships with zero knowledge of any algorithm. If adding a visualization requires touching `stepper.js`, the abstraction is broken.

Flagship reuse plan: request lifecycle (Foundations) · hooks call-order (React) · event-loop phases (Node) · middleware conveyor (Express) · aggregation pipeline (MongoDB) · join animator & isolation anomalies (PostgreSQL) · query→SQL→rows layer tracer (Prisma).

## 8.2 Experiment block

A stepper sibling: "Predict, then run." Shows a claim → student commits Yes/No → runs the mutation → reveals outcome + why. Retrieval practice, zero infrastructure.

## 8.3 Playground & the two-tier sandbox

- **Tier 0 — static (universal fallback):** every code block is syntax-highlighted, copyable, filename-tab chrome. Works even with JS disabled.
- **Tier 1 — run (progressive enhancement):** `playground.js` upgrades a code block into an editor (plain `<textarea>` overlaid on a highlighted `<pre>` — no editor library) + **Run** button. Execution: student code string → `new Worker(blobURL)` → console methods proxied back via `postMessage` → **3-second timeout then `worker.terminate()`** (infinite loops cannot hang the page) → output panel. React examples: React + ReactDOM UMD builds **vendored** into `assets/vendor/` (downloaded once at author time — still zero runtime CDN requests), previewed inside a sandboxed `<iframe>`.
- **Honest boundary:** no SQL, no MongoDB, no server-side execution. Those lessons get rich steppers + "expected output" panels instead of live runners. This is the price of zero servers, stated plainly in-product.

## 8.4 Checkpoint quiz (`js/quiz.js`)

Questions live in one `<script type="application/json" class="fsa-quiz-data">` block per lesson: `{ pool: [ { q, options[], answer, why, anchor, skill } ] }`. Engine behavior: draws 3–6 items from the pool (**variant sampling = memorization resistance**, inherited decision D15) · instant feedback · explanation shown on right AND wrong answers ("Revisit: <section>" links to `anchor`) · completion reported to `progress.js` · missed skills enter the local review queue.

## 8.5 Exercise component (`js/exercise.js`)

Statement → starter code → **Run tests**: tests execute the student's function inside the same Worker runner against several inputs; per-test pass/fail + diff → hint ladder (3 levels, disclosure counted) → **solution unlocks only after ≥ 1 run** → solution includes the *why* + common mistakes. Grading is 100% local and transparent.

## 8.6 Micro-interaction kit (the attention tools)

Small build-once components any lesson can embed to break passive reading (they feed the §7.4 quota):

| Component | Behavior | Typical use |
|---|---|---|
| `FlipCard` | click/Enter flips question→answer (3D transform; reduced-motion fallback = simple toggle) | terminology, "what prints?" |
| `PredictOutput` | code snippet + 3 options; student commits → reveal + Arabic *why* | reading code |
| `OrderSteps` | click-to-place ordering of shuffled lines/phases with instant check | request lifecycle, middleware order, event-loop phases |
| `RevealTabs` | tabs switching between code / output / diagram in place | comparing variants |
| `HoverExplain` | dotted-underlined term → floating AR explanation on hover/focus/tap | inline glossary |
| `ProgressRing` | animated completion ring | checkpoints, track progress |

All are pure CSS + vanilla JS, keyboard-operable, `aria-live` announced, reduced-motion safe. Target rhythm: **an interaction at least every ~2 minutes of reading** (§7.4).

---

# Part 9 — State, storage & the "no backend" compensations

A single module, `js/progress.js`, owns all persistence behind a small API (`get / set / subscribe / reset / export / import`). One versioned key:

```js
localStorage['fsa.store.v1'] = {
  theme: "dark",
  lessons: { "react/use-state": { status:"completed", quizPassed:true,
                                  attempts:2, seconds:540, updatedAt:1756… } },
  bookmarks: [ /* { lessonId, anchor } */ ],
  notes:     { "<lessonId>": "text" },
  drafts:    { "<playgroundId>": "code…" },
  reviewQueue: [ { skill:"hooks-deps", dueAt:1756…, ease:2.5, intervalDays:3 } ],
  streak:    { days:["2026-08-24","2026-08-25"], lastActive:"2026-08-25" },
  projects:  { "blog-platform": { milestones:[true,true,false], selfReview:{} } },
  tipsSeen:  [ "foundations/how-web-works" ]
}
```

**Compensations for having no accounts** (each is small, honest, effective):

| Missing backend feature | Compensation |
|---|---|
| Cloud progress | **Export / Import progress JSON** buttons on the dashboard; the file lives beside the student's notes |
| Cross-device sync | Documented honestly; the export file transfers everything |
| Server-side grading integrity | Quiz answers are client-visible — accepted trade-off, stated in-product ("this platform certifies nothing; it teaches") |
| Analytics | None. Success measured by manual cohort observation; optional privacy-friendly counter later |

Completion semantics (inherited from the blueprint): a lesson is *completed* only when practice attempted + checkpoint passed + the student clicks Mark complete. Page views are never completion.

---

# Part 10 — Client-side search

- **Index:** `scripts/build-search-index.mjs` walks `learn/**/*.html`, `reference/**/*.html`, `projects/*.html`; extracts title/headings/text/code; emits compact records `{t, url, track, kind, h, body, code}` into `data/search-index.js`. One command after content changes; output committed alongside content.
- **Runtime (`js/search.js`):** lazy-loads the index only when search opens · scores field-weighted matches (title ×4 > headings ×3 > body ×1 > code ×0.5) · groups results Lessons / Reference / Exercises / Projects · highlights matched fragments · **error-code shortcuts:** queries like `P2002`, `EADDRINUSE`, or known React warning strings route straight to the matching reference error entry.
- **UI:** Ctrl-K/Cmd-K palette (search + jump-to-lesson + quick actions: toggle theme, go dashboard) plus `/search.html` full page with track/kind filters. Keyboard-first: arrows + Enter throughout.
- **Arabic-aware matching:** the indexer strips diacritics and normalizes alef/ya/ta-marbuta variants, so students can search in either language — "useState شرح" or "شرح الـ hooks" both work; both text fields are indexed.
- **Targets:** labeled 30-query set → expected page in top-3 for ≥ 85% · interaction < 150ms on a 300-page index · zero network calls beyond the initial lazy load.

---

# Part 11 — Curriculum scope & volume

Same hierarchy as `newplan.md` (Track → Level → Module → Lesson), same Learning Loop, same flagship interactives — scaled to what hand-crafted HTML can sustain: **≈ 106 lessons + 24 reference pages + 10 project briefs + 6 task-apps.**

| # | Track | Levels | Lessons | Flagship interactives | Gate project / task-app |
|---|---|---|---|---|---|
| 0 | **Foundations (Web & JS)** | L1–L2 | 16 | Request-lifecycle stepper · **event-loop stepper** · fetch playground | Static page + JSON API client (task-app) |
| 1 | **React.js** (19.2) | L1–L4 | 20 | Hooks call-order stepper · reconciliation visualizer · batching playground | Task Manager → Kanban w/ render report |
| 2 | **Node.js** (24 LTS) | L1–L3 | 14 | Event-loop phases stepper · streams/backpressure visualizer | URL shortener (raw `node:http`) brief |
| 3 | **Express.js** (5.2) | L1–L3 | 12 | Middleware conveyor stepper · request-lifecycle stepper | Blogs REST API brief |
| 4 | **MongoDB** (8.x) | L1–L3 | 12 | Aggregation pipeline stepper · embed-vs-reference simulator | Comment-system brief |
| 5 | **PostgreSQL** (18.x) | L1–L3 | 12 | Join animator · isolation-anomaly stepper · EXPLAIN reader | Multi-tenant schema brief |
| 6 | **Prisma** (7.x) | L1–L2 | 10 | Query→SQL→rows layer tracer · N+1 detector | Blogs API data-layer brief |
| 7 | **Architecture & Next.js concepts** | L1 | 10 | Four request-lifecycle steppers · server/client boundary visualizer (static) | Architecture review checklist |
| — | **Reference** (all technologies) | — | 24 pages | Cheatsheets · error catalog · version pages | — |

Next.js scope note: taught as *concepts, routing model, caching mental model, code reading* — its value survives without execution; the full hands-on Next track belongs to the eventual server-backed edition.

**Every lesson in this table is authored to the full Part 7 standard:** standalone depth inventory (17 elements), bilingual AR/EN explanation, ≥ 1 SVG diagram, ≥ 1 CSS animation, and the complete interactivity quota. The volume estimates already price that depth in — fewer lessons, each one complete.

Default path: 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7. Prerequisites modeled as soft edges in `curriculum.js` and rendered as "you should know X first" banners — warnings, never locks.

Version truth (inherited Part 10 of the blueprint): `data/technologies.js` holds the registry (`react → current 19.2, reviewed 2026-08`); every lesson header renders its chip from it; a quarterly ritual reviews chips against reality.

---

# Part 12 — Testing strategy (static-appropriate)

| Layer | Tool | When |
|---|---|---|
| **Content CI-lite** | `scripts/check-content.mjs` (zero-dep Node): exactly one h1 · objectives present · Arabic analogy block · **≥ 1 inline SVG carrying `<title>`/`<desc>`** · **≥ 1 animation class used** · **≥ 1 interactive visual element** · **interactivity quota: ≥ 1 stepper/playground + ≥ 1 experiment + ≥ 1 try-it interactive practice section + checkpoint with resolvable anchors** · ≥ 1 exercise · glossary + mistakes gallery + production notes present · **bilingual coverage ≥ 40% `fsa-ar` paragraphs** · version chip · all internal links/images resolve · no absolute paths · no external asset URLs | Before every push (optional pre-commit hook; never required to browse) |
| **Data validation** | `gen-curriculum.mjs` validates tree integrity: unique slugs, ordered levels, prev/next chain closes | On generation |
| **Exercise self-test** | check-content runs each exercise's reference solution through the same Worker harness students use; a planted broken variant must fail (**runner self-check invariant**) | Before every push |
| **Component fixtures** | `styleguide.html` doubles as the test page: every component × both themes × keyboard-only walkthrough × 320px width | Per release |
| **Cross-browser/device matrix** | Manual: Chrome / Edge / Firefox / Safari desktop · Android Chrome · iOS Safari — landing, one full lesson, dashboard, search | Per release |
| **Accessibility** | axe browser-extension sweep + manual screen-reader pass over stepper narration and quiz feedback | Per release |
| **Performance budgets** | Per lesson ≤ 90KB gzipped total transfer; shared assets cached after first visit; **zero third-party requests** (true by construction, verified twice) | Per release |
| **Smoke journey (the E2E)** | Human protocol in `docs/`: fresh profile → land → open React track → read a lesson → run playground (incl. infinite-loop guard) → fail a quiz item → see it appear in dashboard review queue → search "P2002" lands on error page → export/import progress round-trips | Per release |

No Playwright/Jest in the default workflow — the site remains a no-toolchain project. If automated E2E is wanted later, it lives in a *separate sibling repo* so the site itself never grows a toolchain.

---

# Part 13 — Development Roadmap (17 Phases)

Format per phase: **Objective · Key tasks · Deliverables · Dependencies · Acceptance.** Content phases (13–15) may overlap once Phase 5 lands. Sizing assumes one developer-author; each phase ships in roughly 1–3 weeks.

### Overview table

| # | Phase | Status | Depends on | Headline deliverable |
|---|---|---|---|---|
| 1 | Foundation & Conventions | ✅ Completed | — | Repo skeleton + the authoring law of the land |
| 2 | Design System | ✅ Completed | 1 | Tokens + components + `styleguide.html`, both themes |
| 3 | Shell & Navigation | ✅ Completed | 2 | Topbar/sidebar/drawer/prev-next/theme working on any page |
| 4 | Data Layer & Generators | ✅ Completed | 3 | `curriculum.js` pipeline + scaffold/check scripts |
| 5 | Lesson Template | ✅ Completed | 2, 4 | `templates/lesson-template.html` + learning.css beats |
| 6 | Stepper Engine | ✅ Completed | 5 | `stepper.js` validated on two pilot visualizations |
| 7 | Code Experience | ✅ Completed | 5 | CodeBlock + CodeAnatomy + Worker playground |
| 8 | Practice Layer | ✅ Completed | 6, 7 | `quiz.js` + `exercise.js` + hint ladder |
| 9 | Progress & Dashboard | ✅ Completed | 4, 8 | progress store + dashboard + tips + export/import |
| 10 | Search | ✅ Completed | 4 | index builder + Ctrl-K palette + `search.html` |
| 11 | Homepage & Catalog Pages | ✅ Completed | 3, 9 | landing, `learn/`, track homes, 404 |
| 12 | Reference, Projects & Playground surfaces | ✅ Completed | 5, 9 | `reference/`, `projects/`, `tasks/` convention, `playground.html` |
| 13 | Content Wave 1 — Foundations + React | ✅ Completed | 5–9 | ~36 lessons + 2 task-apps, all quality bars green |
| 14 | Content Wave 2 — Node + Express | ✅ Completed | 13 | ~26 lessons + event-loop & conveyor flagships |
| 15 | Content Wave 3 — Mongo + Postgres + Prisma + Architecture | ✅ Completed | 14 | ~44 lessons + remaining flagships |
| 16 | Hardening — A11y, Responsive, Performance | In Progress | 11–15 | WCAG 2.2 AA sign-off, device matrix pass, budgets green |
| 17 | QA & Launch | Pending | 16 | Smoke protocol passed; live on GitHub Pages |

---

### Phase 1 — Foundation & Conventions *(Completed)*

**Objective:** make every later decision pre-made.
**Key tasks:** create the Part 5 tree · write `README.md` (what / how to run / deploy) · write `docs/AUTHORING.md` (naming conventions, class prefix, storage keys, the ten zero-build rules, lesson anatomy summary) · start `docs/DECISIONS.md` (running ADR log) · empty `css/` + `js/` scaffolds whose header comments state their contract · `.editorconfig`.
**Deliverables:** skeleton repo + conventions docs.
**Depends on:** —
**Acceptance:** a stranger could clone the repo and add a page correctly using only README + AUTHORING.md; opening any file via double-click produces zero console errors.

### Phase 2 — Design System *(Completed)*

**Objective:** build the visual language exactly once.
**Key tasks:** `tokens.css` (dark + light sets per Part 6) · `base.css` (reset, fluid type scale, prose styling, utilities, focus-visible policy) · **vendor Cairo WOFF2 into `assets/fonts/` + `.fsa-ar` typography rules + RTL/logical-property base styles** · `components.css` (buttons, cards, callouts info/warn/pitfall/legacy/version, badges & chips, tables, terminology cards, terminal code frame, details/accordion, tabs) · `layout.css` skeletons · SVG icon sprite (~20 icons) · `styleguide.html` rendering everything including Arabic samples in both directions.
**Deliverables:** four stylesheets + sprite + styleguide.
**Depends on:** 1.
**Acceptance:** zero raw hex outside `tokens.css` (grep-verified) · all text pairs ≥ 4.5:1 in both themes · every component keyboard-operable with visible focus · styleguide flawless at 320px width · **Arabic samples render in Cairo, correctly RTL, embedded cleanly inside LTR pages.**

### Phase 3 — Shell & Navigation *(Completed)*

**Objective:** never lose the learner's place.
**Key tasks:** `theme.js` (persisted preference + inline boot snippet, no flash) · `app.js`: renders topbar + curriculum sidebar + breadcrumbs + prev/next + TOC scroll-spy from declarative page metadata (`<meta name="fsa-*">` / data attributes) · mobile drawer + persistent lesson bottom bar · skip-links · active-section highlighting.
**Deliverables:** `js/app.js`, `js/theme.js`, finalized layout CSS.
**Depends on:** 2.
**Acceptance:** any page gets full chrome from three lines of metadata · keyboard-complete (roving sidebar tabindex, `[` / `]` prev-next shortcuts) · drawer + bottom bar on phones · works from `file://`.

### Phase 4 — Data Layer & Generators *(Completed)*

**Objective:** pages stop being islands (fixing the references' flat IA structurally).
**Key tasks:** define lesson header metadata spec (title, track, level, order, estMinutes, teaches-version, pattern label, objectives) · `gen-curriculum.mjs` scans `learn/**` headers → emits `data/curriculum.js` (tree + flattened order + prereq edges + integrity checks) · `new-lesson.mjs` scaffolder · seed `data/technologies.js` registry + `data/tips.js`.
**Deliverables:** three scripts + generated data layer.
**Depends on:** 3.
**Acceptance:** adding a lesson = create file + run generator → sidebar, prev/next, breadcrumbs, position indicator all update with zero manual edits · duplicate slugs fail loudly.

### Phase 5 — Lesson Template *(Completed)*

**Objective:** one copy-paste shape for all 106 lessons — pre-loaded with the full Part 7 bar.
**Key tasks:** `templates/lesson-template.html` implementing the nine-beat consistent lesson experience with placeholder mounts and a **pre-filled bilingual skeleton (EN headings + AR explanation placeholders per §7.5) plus commented slots for every one of the 17 depth-inventory elements, including a Try-It / Interactive Practice section placeholder and interactive visual element slots** · `learning.css` (stepper frame, log panel, quiz, exercise, playground, viz state classes, mistakes gallery, diagram-frame + keyframes, try-it section styles, card-based step layouts) · AUTHORING.md updated with a fill-in walkthrough **and one complete worked example lesson (benchmarked against `style-ref-01.html`)** authors can pattern-match.
**Deliverables:** template + learning.css.
**Depends on:** 2, 4.
**Acceptance:** a demo lesson built purely from the template passes keyboard walkthrough, looks correct in both themes and at 320px, passes check-content's structural rules, and includes all mandatory visual and interactive elements.

### Phase 6 — Stepper Engine *(Completed)*

**Objective:** the flagship interaction, generalized once.
**Key tasks:** implement `FSA.stepper.mount()` contract per Part 8.1 (play/step/reset/new-example, scrubber, capped log, aria-live narration, keyboard, reduced-motion) · validate by porting **two** pilot visualizations from the Algorithms project (binary search + a second) onto the engine with zero engine changes.
**Deliverables:** `js/stepper.js` + two ported demos.
**Depends on:** 5.
**Acceptance:** engine contains zero algorithm-specific code · autoplay honors reduced-motion · screen reader announces steps · log capped and colored · both pilots indistinguishable in feel from the originals.

### Phase 7 — Code Experience *(Completed)*

**Objective:** make code first-class: readable, copyable, runnable, safe.
**Key tasks:** `codeblock.js` (copy button, language chip, line numbers, highlighted-line anchors) · code-anatomy component (two panes, synced hover/click highlight) · `playground.js`: textarea-over-pre editor, Run via Blob Worker with console proxying + 3s terminate guard, Reset, autosaved drafts · vendored React UMD iframe preview for React examples · Tier-0 static fallback verified with JS disabled.
**Deliverables:** `codeblock.js`, `playground.js`, anatomy styles.
**Depends on:** 5.
**Acceptance:** infinite loop cannot freeze the page · console output captured faithfully · copy strips prompts · drafts survive reload · everything still readable with JS off.

### Phase 8 — Practice Layer *(Completed)*

**Objective:** reading becomes doing.
**Key tasks:** `quiz.js` per Part 8.4 (pool sampling, instant feedback, anchor deep-links, progress reporting, review-queue feed) · `exercise.js` per Part 8.5 (tests-in-worker, hint ladder, gated solution) · common-mistakes gallery pattern · experiment block component.
**Deliverables:** `quiz.js`, `exercise.js`, experiment component.
**Depends on:** 6, 7.
**Acceptance:** wrong answers always offer a working link to the teaching section · retake draws different pool variants · solution stays locked until first Run · planted-broken reference solutions fail their own tests.

### Phase 9 — Progress & Dashboard *(weeks 6–7)*

**Objective:** effort becomes visible and durable.
**Key tasks:** `progress.js` store API + schema v1 + corruption-safe loading · sidebar progress dots · Mark complete flow · `dashboard.html`: continue card, per-track rings, non-punitive streak, bookmarks, notes, review queue (SM-2-lite scheduling computed locally) · basic achievements · contextual tips banners from `data/tips.js` · **export/import progress JSON**.
**Deliverables:** `progress.js`, `dashboard.html`, `tips.js`.
**Depends on:** 4, 8.
**Acceptance:** state survives reload/browser restart/export-import round-trip · corrupt storage degrades to defaults without data loss of other keys · review queue surfaces missed skills within the same session.

### Phase 10 — Search *(Completed)*

**Objective:** find concepts, not just pages.
**Key tasks:** `build-search-index.mjs` per Part 10 · `search.js` scoring/grouping/highlighting + error-code shortcuts · Ctrl-K palette component + `search.html` page · recent searches (local).
**Deliverables:** index builder + `search.js` + palette + search page.
**Depends on:** 4.
**Acceptance:** labeled 30-query set hits top-3 ≥ 85% · < 150ms interaction · `P2002` routes to the Prisma errors page · fully functional offline/from `file://`.

### Phase 11 — Homepage & Catalog Pages *(Completed)*

**Objective:** the front door and the map.
**Key tasks:** `index.html` (hero with restrained motion, stats bar, path overview, personalized continue-card when progress exists) · `learn/index.html` catalog · per-track home pages (levels, outcomes, gate projects, placement-style "start here" guidance) · `404.html` with search box · print stylesheet basics.
**Deliverables:** landing + catalog pages.
**Depends on:** 3, 9.
**Acceptance:** every curriculum destination reachable in ≤ 3 clicks · Lighthouse performance/accessibility ≥ 95 on landing · continue-card resumes the exact last lesson.

### Phase 12 — Reference, Projects & Playground surfaces *(Completed)*

**Objective:** the recall layer and the doing-beyond-lessons layer.
**Key tasks:** `reference/<tech>/` cheatsheet + errors + versions templates (dense, non-narrative: signature → semantics → example → pitfalls → lesson links) · `projects/<slug>.html` briefs (requirements, milestones with persisted checklists, rubric self-review, solution notes) · `tasks/` convention doc + first standalone app shell · `playground.html` free sandbox.
**Deliverables:** reference hub + project system + playground page.
**Depends on:** 5, 9.
**Acceptance:** milestone checkboxes persist across sessions · every MVP lesson links ≥ 1 reference page · error-page template covers meaning/causes/fixes/prevention/lesson-links.

### Phase 13 — Content Wave 1: Foundations + React *(Completed)*

**Objective:** prove the whole pedagogy end-to-end on the most important path.
**Key tasks:** author 16 Foundations lessons (flagships: request-lifecycle stepper, event-loop teaser stepper, fetch playground) + task-app *product_search_interface*-style exercise · author 20 React lessons (flagships: hooks call-order stepper, reconciliation visualizer, batching experiments; Actions covered conceptually) · Task Manager task-app · reference stubs for both tracks · **every lesson authored to the FULL Part 7 bar: standalone depth inventory, Arabic explanations around English terms, ≥ 1 animated SVG diagram, complete interactivity quota, interactive Try-It section (no static question lists), visual engagement matching the `style-ref-01.html` benchmark** — this wave sets the template for all future content.
**Deliverables:** ~36 lessons + 2 task-apps + 8 reference pages.
**Depends on:** 5–9.
**Acceptance:** check-content green across the wave · smoke journey completable start-to-finish by a test user who knows no React · quiz first-attempt pass rates 60–80% in calibration testing · every lesson has at least one interactive practice activity that tests the mastery target · no lesson relies on static questions as primary assessment · every lesson uses visual elements and animations to explain concepts.

### Phase 14 — Content Wave 2: Node + Express *(Completed)*

**Objective:** the backend spine.
**Key tasks:** 14 Node lessons (flagship: six-phase event-loop stepper validated against real runtime ordering; streams visualizer) · 12 Express lessons (flagships: middleware conveyor, request lifecycle) · URL-shortener and blogs-API project briefs · Node/Express reference + error pages (`EADDRINUSE` et al.) · all at the full Part 7 bar with interactive Try-It sections and visual engagement matching the reference benchmark.
**Deliverables:** ~26 lessons + 2 briefs + 8 reference pages.
**Depends on:** 13.
**Acceptance:** event-loop step ordering reproduced identically by a scratch Node script · all predict-output exercises have verified expected outputs · check-content green · every lesson has interactive practice and visual engagement.

### Phase 15 — Content Wave 3: Mongo + Postgres + Prisma + Architecture *(Completed)*

**Objective:** the data story and the connective conclusion.
**Key tasks:** 12 MongoDB lessons (aggregation pipeline stepper, embed-vs-reference simulator) · 12 PostgreSQL lessons (join animator, isolation-anomaly stepper, EXPLAIN reader) · 10 Prisma lessons (layer tracer, N+1 detector) · 10 Architecture/Next-concepts lessons (four condensed request-lifecycle steppers) · comparison content (the honest middle path: Postgres jsonb) · remaining reference/error pages · final project briefs · all at the full Part 7 bar with interactive Try-It sections and visual engagement matching the reference benchmark.
**Deliverables:** ~44 lessons + briefs + 8 reference pages; full catalog complete.
**Depends on:** 14.
**Acceptance:** every flagship interactive built on the untouched Phase-6 engine · SQL/Mongo exercises ship as steppers + expected-output panels with the honesty note · full-corpus check-content green · every lesson has interactive practice and visual engagement.

### Phase 16 — Hardening: Accessibility, Responsive, Performance *(weeks 26–28)*

**Objective:** production polish without production infrastructure.
**Key tasks:** axe sweep fixes site-wide · manual NVDA/VoiceOver passes on stepper, quiz, exercise · reduced-motion audit · device-matrix pass (Part 12) · contrast re-audit both themes · performance budget verification · focus-management audit (drawer, palette, details elements) · **bilingual legibility audit: mixed-direction punctuation, bidi isolation of EN terms inside AR prose, Arabic line-height at all breakpoints** · RTL spot-check across every page type.
**Deliverables:** hardening changelog; signed-off audits.
**Depends on:** 11–15.
**Acceptance:** zero critical axe issues · WCAG 2.2 AA checklist signed · all budgets green · no horizontal scroll at 320px anywhere.

### Phase 17 — QA & Launch *(week 29)*

**Objective:** ship it.
**Key tasks:** run the full smoke journey protocol · fix findings · finalize README/docs · GitHub Pages setup (relative paths verified, `404.html`, meta descriptions + OG images per page, sitemap.xml + robots.txt) · tag v1.0.0 · schedule the quarterly version-chip review ritual (calendar entry, owner named).
**Deliverables:** live site + launch checklist record.
**Depends on:** 16.
**Acceptance:** smoke journey passes on a fresh browser profile · site live at the Pages URL · restore drill: deleting local state and re-importing exported JSON restores everything.

---

# Part 14 — Prioritization, MVP & post-MVP

## 14.1 MoSCoW

| Tier | Capabilities |
|---|---|
| **Must (MVP)** | Phases 1–12 · Foundations track + React Track complete (Wave 1) · checkpoint quizzes + JS exercises · localStorage progress + export/import · Ctrl-K search · dark/light responsive shell |
| **Should (v1.0)** | Waves 2–3 (all tracks) · full reference/error catalog · projects system · achievements · review queue maturity |
| **Could (v1.x)** | More task-apps · printable cheat-sheet PDFs · shareable progress snapshots · fully-translated UI chrome mirror · optional privacy-friendly analytics |
| **Won't (this product)** | Accounts/servers/databases · video hosting · payments · certificates · native apps |

## 14.2 MVP definition

**The MVP proves the promise end-to-end:** a student lands, follows Foundations into React, reads fully self-contained lessons with narrated visualizers, runs real code in-browser, passes interactive checkpoints (never static question lists), watches progress accumulate locally, and finds anything via search — never opening another tab, never installing anything. Every lesson is a **standalone interactive learning module** with visual engagement matching the `style-ref-01.html` benchmark.

Scope: Phases 1–12 in full + Wave 1 content (~36 lessons). Explicitly deferred: all other tracks, projects system depth, reference completeness. Duration estimate: **~20 weeks solo** (the full-depth bilingual bar is the cost — and the point).

## 14.3 Post-MVP horizons **Smoke test = acceptance:** the Wave-1 journey performed by someone who has never used the site.

## 14.3 Post-MVP horizons

| Horizon | Theme | Highlights |
|---|---|---|
| v1.0 (+8 wks post-MVP) | Complete curriculum | Waves 2–3, full reference, projects |
| v1.1 | Depth & reach | Arabic layer, extra task-apps, PDF exports |
| Graduation path | If scale ever demands it | Content ports 1:1 into the `newplan.md` platform; this site remains the zero-dependency mirror |

---

# Part 15 — Risks & honest limitations

| # | Risk / limitation | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Content volume slips (deep, bilingual, hand-authored HTML is the cost center) | High | High | Template pre-fills the AR/EN skeleton + 17-element inventory slots; scaffolder + strict component reuse; waves resized for the depth bar (§7); MVP cut defined |
| 2 | Quiz/exercise answers visible in client source | Certain | Low | Accepted and stated in-product; platform certifies nothing; variant sampling reduces rote memorization |
| 3 | Technology drift makes chips stale | Certain (time) | Medium | Registry + quarterly review ritual; chips are cheap to bump |
| 4 | No SQL/Mongo/server execution disappoints | Medium | Medium | Rich steppers + expected-output panels; honesty note; graduation path documented |
| 5 | localStorage cleared → lost progress | Medium | Medium | Export/import ritual taught on dashboard; schema versioned for forward migration |
| 6 | Single-maintainer bus factor | Medium | Medium | AUTHORING.md + DECISIONS.md + this plan make conventions explicit |
| 7 | SEO weaker than server-rendered rivals | Medium | Low | Static HTML is inherently indexable; sitemap + OG meta; SEO was never the product goal |
| 8 | Scope creep back toward the big blueprint | Medium | High | The ten zero-build rules (Part 3) are the constitution; changes require editing them first |
| 9 | Mixed-direction text bugs (AR/EN punctuation scrambling) | Medium | Low | Logical properties everywhere · bidi isolation around embedded EN terms · `dir="auto"` on mixed strings · dedicated Arabic audit in Phase 16 |
| 10 | Depth bar slows authoring to a crawl | Medium | Medium | The 17-element checklist is a fill-in scaffold, not a blank page; lessons that honestly need less get merged into neighbors, not thinned |

---

# Part 16 — Definition of done

The Static Edition is done when it is: **simple** (clone → open → learn, zero installs), **standalone** (each lesson is the complete resource for its topic — the 17-element inventory filled, no external tabs, no unexplained terms, no important information omitted), **bilingual** (Arabic explanation carrying understanding + English carrying the technical skeleton, in every lesson), **interactive** (the full quota: stepper/playground, experiment, try-it interactive practice section, checkpoint, and micro-interactions every ~2 minutes — **no static question lists as the primary assessment method**), **visually engaging** (hand-authored animated SVG diagrams, purposeful CSS animations, interactive visual elements, color-coded state transitions, card-based layouts, and anti-fatigue visual rhythm — benchmarked against `style-ref-01.html`), **honest** (every limitation stated in-product), **accessible** (WCAG 2.2 AA), **responsive** (320px phones to wide desktops), **fast** (≤ 90KB per lesson, zero third-party requests), **durable** (version chips + quarterly ritual against drift) — in short: the warmth, depth, and visual polish of the Algorithms reference lesson surviving inside a far more disciplined system.

**The six non-negotiable quality rules for every lesson:**

1. No important information is intentionally omitted.
2. No topic depends on external resources for basic understanding.
3. No topic is tested only through static questions.
4. Every topic contains an interactive way to apply the concept.
5. Every topic uses appropriate visual elements, animations, and/or SVGs.
6. Every interaction has a learning purpose, and every lesson keeps students engaged while helping them genuinely master the subject.

> Final test, restated: *could a student finish this lesson's journey on a train with no internet, from files they downloaded last week — and arrive at genuine understanding through interacting with the material, not just reading it?* If yes — it ships.

*End of plan.*

