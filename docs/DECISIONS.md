# DECISIONS — running ADR log

One entry per consequential, hard-to-reverse decision. Newest at the bottom.
Format: **D# — Title** · Status · Context → Decision → Consequences.

---

## D1 — Build a Static Edition instead of the full-stack platform
**Status:** Accepted · **Date:** 2026-08
**Context:** `newplan.md` specifies Next.js + Prisma + Postgres + sandbox orchestrator + admin CMS (~18 phases of infrastructure before a student learns anything). The Algorithms course proves plain HTML can carry a complete interactive course but suffered engineering-discipline failures (duplicated heads, flat IA, no persistence).
**Decision:** Middle path — Algorithms' simplicity/deployment model + newplan's pedagogy/design/curriculum/rigor. Every big-blueprint feature reproduced client-side, replaced with an honest simpler equivalent, or explicitly deferred. Full spec: `final-plan.md`.
**Consequences:** No accounts/sync/server grading; compensated by export/import progress and in-product honesty notes. Content ports 1:1 if the project ever graduates.

## D2 — Shared data ships as `.js` assigning to `window.FSA.*`, never fetched JSON
**Status:** Accepted · **Date:** 2026-08
**Context:** `fetch()` of JSON fails on `file://` due to CORS; `<script src>` does not. Offline/double-click usage is a first-class requirement (persona: Offline Learner Omar).
**Decision:** All shared data (`curriculum`, `technologies`, `tips`, `search-index`) are `.js` files assigning to `window.FSA.*`.
**Consequences:** The whole site works from a double-click and GitHub Pages identically; generated files must be re-run after content changes.

## D3 — Relative paths only; no CDN anything
**Status:** Accepted · **Date:** 2026-08
**Context:** Same file:// / project-pages constraints as D2.
**Decision:** No leading slashes or absolute URLs anywhere; fonts vendored (Cairo WOFF2), icons inline SVG sprite, React UMD vendored for previews. Zero third-party runtime requests, verified twice per release.
**Consequences:** Slightly larger repo; zero network flakiness.

## D4 — One namespaced, versioned localStorage store
**Status:** Accepted · **Date:** 2026-08
**Context:** Progress/streaks/bookmarks/notes/review-queue without a backend.
**Decision:** Single module (`js/progress.js`) owns all persistence behind get/set/subscribe/reset/export/import; one key `fsa.store.v1`; corrupt state degrades to defaults without touching other keys.
**Consequences:** Export/import JSON is the cross-device story; schema migrations are forward-only via version field.

## D5 — Untrusted code runs only inside Workers with a 3s terminate guard
**Status:** Accepted · **Date:** 2026-08
**Context:** Students run JS (playground/exercises); infinite loops must not hang pages.
**Decision:** Student code string → Blob Worker → console proxied via postMessage → terminate after 3s; degrade to "show expected output" when Workers unavailable. React previews use sandboxed iframes with vendored UMD builds.
**Consequences:** No DOM access from student code (by design); honest boundary documented in-product (no SQL/server execution).

## D6 — Bilingual AR/EN is core policy, not post-MVP
**Status:** Accepted · **Date:** 2026-08
**Context:** The Algorithms course's most-loved trait: English technical skeleton + Arabic explanations. Primary persona learns fastest this way.
**Decision:** Every lesson: EN headings/code/UI verbs; AR explanations/analogies/narration (`fsa-ar`, RTL, Cairo font, line-height ≥ 1.9); EN terms kept verbatim; stepper logs and quiz feedback in Arabic; ≥ 40% prose paragraphs Arabic (mechanically checked).
**Consequences:** Authoring cost priced into content waves; RTL/bidi rules enforced via logical properties + Phase 16 audit.

## D7 — Lessons are standalone mini-chapters with a mechanical quality gate
**Status:** Accepted · **Date:** 2026-08
**Context:** Risk of thin "summary" lessons; the product's promise is *one website, zero external tabs*.
**Decision:** 17-element depth inventory + interactivity quota (stepper/playground, experiment, checkpoint, ≥3 micro-interactions, ~400-word rhythm) mandatory per lesson; enforced by `scripts/check-content.mjs`; topics that fit in less get merged, not thinned.
**Consequences:** Fewer lessons (~106), each complete; content waves sized accordingly (~20 weeks solo MVP).

## D8 — Stepper engine is algorithm-agnostic
**Status:** Accepted · **Date:** 2026-08
**Context:** Flagship interactives across all tracks share the narrated-step pattern.
**Decision:** `FSA.stepper.mount({init, steps, render, labels})` — lessons supply pure state factory, precomputed steps, renderer; engine provides transport, capped log, aria-live narration, keyboard, reduced-motion handling. Acceptance invariant: adding a visualization never requires touching `stepper.js`.
**Consequences:** One clock, consistent feel everywhere; slight upfront design cost.

## D9 — Quiz answers are client-visible; the platform certifies nothing
**Status:** Accepted · **Date:** 2026-08
**Context:** No server = no grading integrity. Stated trade-off inherited from plan.
**Decision:** Pools live in the page JSON; variant sampling resists memorization; honesty note rendered in-product.
**Consequences:** Accepted; revisit only if the project graduates to the server-backed edition.

## D10 — Repo root is the site root
**Status:** Accepted · **Date:** 2026-08
**Context:** Deployment target is GitHub Pages (project site).
**Decision:** `index.html` lives at repo root; `docs/` holds plans/conventions; dev-scripts under `scripts/` are excluded from browsing concerns (they simply aren't linked).
**Consequences:** Pages enabled on root branch = live site; no build output directory exists at all.
