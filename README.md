# FullStack Academy — Static Edition

A complete educational platform for the modern JavaScript full-stack (Foundations · React · Node.js · Express · MongoDB · PostgreSQL · Prisma · Architecture) built as **pure HTML + CSS + JavaScript** — no frameworks, no build step, no server, no database.

Modeled on the Algorithms & Data Structures course: **open a file, it works; push, it's live.**
Lessons are bilingual — English carries titles/code/UI, Arabic carries the explanations.

## Run it

No install. No `npm install`. No build.

- **Locally:** double-click `index.html` — or serve statically (`npx serve` / `python -m http.server`) if you prefer a URL.
- **Offline:** clone or download the repo; everything (styles, scripts, data, fonts) ships inside it. Zero CDN requests at runtime.

## Deploy

Push to GitHub and enable GitHub Pages (project site, root). Relative paths only — that is a constitutional rule (see below), so it works both from `file://` and from `https://<user>.github.io/<repo>/`.

## Repo layout

| Path | Purpose |
|---|---|
| `index.html` | Landing page |
| `learn/<track>/<lesson>.html` | Lessons — the product |
| `reference/<tech>/` | Cheatsheets, error catalogs, version pages |
| `projects/` `exercises/` `tasks/` | Project briefs, exercise catalog, standalone gate apps |
| `dashboard.html` | Progress, streak, bookmarks, notes, review queue (all in `localStorage`) |
| `search.html` + Ctrl-K | Client-side search over a pre-built index |
| `playground.html` | Free JS sandbox (Worker-isolated, 3s timeout) |
| `css/` `js/` `data/` | Shared stylesheets, shared scripts, shared data (`window.FSA.*`) |
| `templates/` | The copy-paste starting point for new lessons |
| `scripts/` | Dev-only zero-dependency Node 22+ tools — never shipped, never needed to browse |
| `docs/AUTHORING.md` | **Read this before adding any page** |

## The ten zero-build rules (constitution)

1. No build step — no bundler, transpiler, framework, or `npm install` required to browse or author.
2. Hand-authored pages/assets + zero-dependency Node dev-scripts only; dev-scripts never ship.
3. Shared CSS, shared JS — per-page code is limited to that lesson's data and render functions.
4. All shared data ships as `.js` assigning to `window.FSA.*`, never fetched `.json` (so `file://` works).
5. Relative paths only — no leading slashes, no absolute URLs.
6. No CDN dependencies — system/vendored fonts, inline SVG sprite icons, CSS animations gated on `prefers-reduced-motion`.
7. Progressive enhancement — every interactive has a static fallback readable with JS disabled.
8. State is namespaced and versioned under `localStorage` keys prefixed `fsa.` with schema versioning.
9. Untrusted code never runs in the page origin — student code goes through the Worker runner with timeouts.
10. Content is the interface — chrome recedes; every lesson is readable, printable, self-contained.

Changes to these rules require editing them here first, plus an entry in `docs/DECISIONS.md`.

## Contributing a lesson

See `docs/AUTHORING.md`. Short version:

```
node scripts/new-lesson.mjs react use-state
# fill the template following its commented slots
node scripts/check-content.mjs   # quality gate
node scripts/gen-curriculum.mjs  # refresh sidebar/search data
```

## Status

Implementation follows `docs/final-plan.md` (17 phases). Current phase: **1 — Foundation & Conventions**.
