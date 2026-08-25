# AUTHORING — the law of the land

Everything an author needs to add a page correctly. If reality ever diverges from this file, fix one of them.

---

## 1. The ten zero-build rules (constitution)

1. **No build step.** No bundler, no transpiler, no framework, no `npm install` required to *browse or author*. Plain scripts and plain CSS.
2. **Two kinds of files only:** hand-authored pages/assets, and zero-dependency Node dev-scripts (`scripts/*.mjs`) used to generate derived data and validate quality. Dev-scripts never ship to the site.
3. **Shared CSS, shared JS.** Pages load `css/*.css` and `js/*.js`; per-page code is limited to a small inline `<script>` containing *that lesson's data and render functions only*.
4. **All shared data ships as `.js`, not fetched `.json`:** each file in `data/` assigns to `window.FSA.*` via `<script src>`. Reason: `fetch()` of JSON fails on `file://` (CORS); `<script src>` does not. This is what makes double-click work.
5. **Relative paths only.** No leading slashes, no absolute URLs — GitHub Pages project-sites and `file://` both break otherwise.
6. **No CDN dependencies.** No Tailwind Play, no Font Awesome, no Google Fonts requests. Fonts = system stack + vendored WOFF2; icons = inline SVG sprite; animations = CSS gated on `prefers-reduced-motion`.
7. **Progressive enhancement.** Every interactive has a static fallback (Tier 0). Reading any lesson with JavaScript disabled yields complete prose, SVG diagrams, and code.
8. **State is namespaced and versioned.** All persistence lives under `localStorage` keys prefixed `fsa.` with a schema version (`fsa.store.v1`). Corrupt state degrades gracefully to defaults.
9. **Untrusted code never runs in the page origin.** Student/executed code goes through the Worker-based runner with a 3-second timeout; the runner degrades to "show expected output" if Workers are unavailable.
10. **Content is the interface.** Chrome recedes; every lesson is readable, printable, and self-contained in meaning.

Changes require editing this section first **and** an ADR entry in `DECISIONS.md`.

---

## 2. Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Files & slugs | `kebab-case.html`, one lesson = one file | `learn/react/use-state.html` |
| CSS classes | prefixed `fsa-` | `.fsa-callout`, `.fsa-stepper` |
| IDs | `camelCase` | `id="bsDemo"` |
| JS globals | everything shared lives on `window.FSA.*` | `FSA.stepper.mount(...)` |
| localStorage keys | `fsa.` prefix + version | `fsa.store.v1` |
| data attributes | `data-fsa-*` for component config | `data-fsa-track="react"` |
| Track slugs | `foundations react nodejs express mongodb postgresql prisma architecture` | — |

---

## 3. Creating a lesson

```
node scripts/new-lesson.mjs <track> <slug>     # e.g. node scripts/new-lesson.mjs react use-state
# fill templates/lesson-template.html's slots top-to-bottom
node scripts/check-content.mjs                 # must pass before push
node scripts/gen-curriculum.mjs                # refresh sidebar/prev-next/search data
node scripts/build-search-index.mjs            # after content changes
```

Never hand-edit generated files (`data/curriculum.js`, `data/search-index.js`).

### Lesson header metadata (parsed by generators)

Set via `<meta>` tags in `<head>`:

```html
<meta name="fsa-title"       content="useState — state in function components">
<meta name="fsa-track"       content="react">
<meta name="fsa-level"       content="2">
<meta name="fsa-order"       content="4">
<meta name="fsa-minutes"     content="35">
<meta name="fsa-teaches"     content="React 19.2">
<meta name="fsa-pattern"     content="state hook">
<meta name="fsa-objectives"  content="…;…;…">
```

---

## 4. Lesson anatomy (eight-beat Learning Loop)

Every lesson follows this order — see `templates/lesson-template.html`:

```
HEADER   breadcrumbs(auto) · track badge · est. time · version chip · pattern label
1 LEARN    plain definition (AR) → formal definition → why it exists → ANALOGY callout
           (Arabic, mandatory, first) → step-by-step mechanics → worked example
2 SEE      STEPPER mount + inline SVG diagrams with CSS animation
3 TRY      PLAYGROUND mount + EXPERIMENT blocks ("predict, then run")
4 ANATOMY  code-anatomy: two panes, per-line AR explanation, synced highlight
5 DEEP DIVE  <details>: internals, edge cases, legacy-vs-modern
6 PRACTICE exercise ladder Easy→Medium→Hard (+Challenge) + common-mistakes gallery
7 PROVE    CHECKPOINT quiz: pool sampling, instant AR feedback, anchor deep-links
8 PRODUCTION NOTES <details>: real-world usage · interview Q&A · related lessons
FOOTER   prev/next(auto) · Mark complete · Bookmark
```

### The depth inventory — ALL seventeen elements, every lesson

objectives+time · plain definition · formal definition · why-it-exists · Arabic analogy · step-by-step mechanics · worked example with real values · visualizer/diagram · runnable code + anatomy · edge cases & gotchas · common-mistakes gallery · performance/cost notes · mini-glossary (EN term + AR explanation) · practice ladder · checkpoint quiz · production notes + interview Q&A · related lessons.

Sizing: ~1,500–2,500 words-equivalent per concept lesson. If a topic honestly fits in less, merge it into a neighbor — never thin the bar.

### The interactivity quota

- ≥ 1 stepper or playground · ≥ 1 experiment · 1 checkpoint quiz · ≥ 3 micro-interactions (flip cards, predict-output, ordering…)
- Rhythm rule: no stretch > ~400 words without an interaction, diagram, or visual state change.

---

## 5. Bilingual authoring pattern

**English carries the technical skeleton (titles, headings, code, filenames, UI verbs). Arabic carries the understanding (explanations, analogies, narration).**

```html
<h2>How Binary Search Works</h2>
<p>Finding one item among 1,000,000 sorted items takes at most 20 steps.</p>
<p class="fsa-ar" dir="rtl">
  تخيّل إن عندك قاموس وبتدوّر على كلمة «Binary». مش هتفتح من أول صفحة — هتفتح في النص…
  دي بالظبط فكرة الـ <i>Binary Search</i>: نص البيانات بيستبعد في كل خطوة.
</p>
<pre><code>while (low <= high) { /* code always stays LTR */ }</code></pre>
```

Rules:

1. Headings, code, filenames, buttons: English. Chrome labels are bilingual pairs: "Next · التالي", "Mark complete · أكملت الدرس", "Search · بحث".
2. Explanations, analogies, narration, log messages, quiz feedback: Arabic; technical terms stay verbatim English (`الـ event loop`, `props`).
3. First occurrence = English term + short Arabic gloss inline; afterwards always the English term. Never invent Arabic equivalents.
4. Arabic prose uses `class="fsa-ar" dir="rtl"`; embedded EN terms keep bidi isolation; code blocks stay LTR.
5. Both languages say the same thing — Arabic teaches with personality, it is not a shorter summary.
6. Stepper `say:` strings and quiz explanations are authored in Arabic.

## 6. SVG & animation standard

- ≥ 1 hand-authored inline `<svg>` per lesson, colored only via tokens (`var(--track-react)`), carrying `<title>` + `<desc>`.
- ≥ 1 purposeful CSS-only animation per lesson (`stroke-dashoffset` marching dashes, pulsing active nodes, state transitions).
- All motion gated on `prefers-reduced-motion`. Screenshots of diagrams banned; Canvas banned for teaching content.

---

## 7. Storage keys & state

Single store, one module owns it (`js/progress.js`): `localStorage["fsa.store.v1"]`.
Completion semantics: a lesson counts complete only when practice attempted + checkpoint passed + student clicks Mark complete. Page views are never completion.
Students export/import progress as JSON from the dashboard — that is the cloud-sync story.

---

## 8. Quality gate (enforced by `scripts/check-content.mjs`)

exactly one `h1` · objectives present · Arabic analogy block present · ≥ 1 inline SVG with `<title>`/`<desc>` · ≥ 1 animation class used · ≥ 1 stepper-or-playground · ≥ 1 experiment · checkpoint with resolvable anchors · ≥ 1 exercise · glossary + mistakes gallery + production notes present · bilingual coverage ≥ 40% `fsa-ar` paragraphs · version chip present · all internal links resolve · no absolute paths · no external asset URLs.

---

## 9. Design tokens

Raw colors/radii exist **only** in `css/tokens.css`. Components consume tokens; never hardcode hex anywhere else. Per-track accents: `--track-found --track-react --track-node --track-express --track-mongo --track-pg --track-prisma --track-nextjs --track-arch`. State is never color-only — visualization cells also change shape/glyph/label.
