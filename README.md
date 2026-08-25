# FullStack Academy · أكاديمية الفول ستاك

> **The Sovereign, Zero-Build Modern Full-Stack Learning Platform**  
> *Clone &rarr; Double-click &rarr; Learn. Zero build steps, zero external CDN dependencies, 100% offline-ready.*

---

## 🌟 The Vision

**FullStack Academy** is designed from the ground up to solve the friction of modern web education. Most coding platforms require complex local dev setups, npm installs, build steps, or constant internet connectivity to external CDNs. 

**FullStack Academy eliminates all barriers:**
- **Zero-Build Architecture:** Pure HTML5, CSS3, and modern Vanilla JavaScript (ES2026).
- **Runs Directly from `file://`:** Double-click `index.html` on any device without spinning up a local server.
- **100% Vendored & Offline:** Cairo variable Arabic fonts, SVG icons, and styling are completely self-hosted.
- **Safe In-Browser Execution:** JavaScript sandboxes run in isolated Web Workers with 3-second infinite loop guards.
- **Local-First Progress:** Real-time progress tracking, checkpoint scores, and milestone checklists persisted safely in `localStorage` with JSON export/import.

---

## 📚 The 8-Track Complete Curriculum

| Track | Level | Key Flagship Topics & Interactive Visualizers |
|---|---|---|
| **Foundations** | L1–L2 | HTTP/3 QUIC stream multiplexing, V8 Call Stack & Closures, Event Loop microtasks, Fetch API stream resolution |
| **React.js** | L1–L3 | Thinking in React, `useState` Fiber call-order stepper, `useEffect` synchronization & cleanup, $O(n)$ Virtual DOM diffing |
| **Node.js** | L1–L3 | V8 + libuv architecture, 6-phase Event Loop deep dive, binary Buffers & stream backpressure pipelines |
| **Express.js** | L1–L3 | Server setup, linear middleware conveyor pipeline, `next()`, REST CRUD API standards |
| **MongoDB** | L1–L3 | BSON document model, Embedding vs Referencing tradeoffs, 16MB document boundaries, Aggregation pipeline |
| **PostgreSQL** | L1–L3 | Relational algebra, ACID transaction guarantees (Atomicity, Consistency, Isolation, Durability), Foreign keys |
| **Prisma ORM** | L1–L3 | Rust query engine, type-safe CRUD operations, schema relations, and N+1 query prevention |
| **Architecture** | L3 | 4-Tier End-to-End Request Lifecycle (React &rarr; Express &rarr; Prisma &rarr; PostgreSQL), 4-layer caching |

---

## 🎯 The 9-Beat Canonical Learning Loop

Every lesson is authored as a **complete standalone interactive learning module** following our strict 9-beat pedagogical structure:

1. **BEAT 1: INTRO & OBJECTIVES** — Level badge, bilingual titles, estimated duration, and 3–4 crisp learning outcomes.
2. **BEAT 2: LEARN** — Plain & formal definitions, why the concept exists, mandatory Arabic real-life analogy, and numbered step sequence cards (`.fsa-step-card`).
3. **BEAT 3: SEE** — Mounted interactive Stepper engine (`FSA.stepper`) + responsive animated SVG diagram.
4. **BEAT 4: TRY** — Interactive sandbox (`.fsa-try-it`) running in Web Worker with Predict-Before-You-Run experiment.
5. **BEAT 5: ANATOMY** — Synced two-pane code breakdown with line-by-line Arabic annotations.
6. **BEAT 6: DEEP DIVE** — Internals, edge cases, and Time/Space complexity analysis cards (`.fsa-complexity-grid`).
7. **BEAT 7: PRACTICE** — Common mistakes gallery with Broken vs Fixed diff cards + Mini-Glossary.
8. **BEAT 8: PROVE** — Interactive Mastery Checkpoint quiz with instant bilingual feedback and review anchors.
9. **BEAT 9: PRODUCTION NOTES** — Senior interview questions and real-world system design considerations.

---

## 🗂️ Codebase Architecture

```text
mern/
├── index.html                   # Viewport-locked cockpit homepage & resume card
├── search.html                  # Full-page client-side search engine (Ctrl+K)
├── dashboard.html               # Student progress dashboard & JSON backup
├── playground.html              # Standalone JavaScript Web Worker sandbox
├── 404.html                     # Bilingual error fallback page
├── css/
│   ├── tokens.css               # Design tokens (colors, spacing, typography, radii)
│   ├── base.css                 # Reset, typography, Cairo font, and print stylesheet
│   ├── layout.css               # Shell layout, 3-column cockpit, and responsive drawer
│   ├── components.css           # Buttons, cards, badges, callouts, and step sequences
│   └── learning.css             # Steppers, playgrounds, quizzes, and complexity grids
├── js/
│   ├── fsa-namespace.js         # Window.FSA namespace initialization
│   ├── theme.js                 # Dark/Light theme switcher with localStorage sync
│   ├── progress.js              # Local-first progress store & stats calculation
│   ├── stepper.js               # Visualizer stepper engine with transport controls
│   ├── playground.js            # In-browser Web Worker code runner
│   ├── quiz.js                  # Interactive checkpoint quiz engine
│   ├── search.js                # Weighted client-side Arabic-normalized search engine
│   └── app.js                   # Navigation, drawer toggle, and table of contents
├── data/
│   ├── curriculum.js            # Auto-generated curriculum metadata (ships as JS)
│   ├── search-index.js          # Auto-generated client search index
│   ├── technologies.js          # Track metadata, colors, and versions
│   └── tips.js                  # Daily bilingual engineering tips
├── learn/                       # 8 Track directories containing all lessons
├── reference/                   # Cheatsheets and error code catalogs (P2002, EADDRINUSE)
├── projects/                    # Capstone project briefs with persistent checklists
├── templates/                   # Canonical lesson template (lesson-template.html)
└── scripts/                     # Zero-dependency maintenance & validation scripts
    ├── check-content.mjs        # Content CI-lite validator (17 depth elements)
    ├── gen-curriculum.mjs       # Curriculum index generator
    ├── build-search-index.mjs   # Full-text search index builder with Arabic normalization
    └── build-track-pages.mjs    # Track listing pages generator
```

---

## 🚀 How to Run & Develop

### 1. Zero-Install Instant Run
Clone the repository and double-click `index.html`:
```bash
git clone https://github.com/ozidan13/mern.git
cd mern
# Double click index.html or open with your preferred browser
```

### 2. Running Content CI-Lite & Generators
If you author or update lessons:
```bash
# Validate all lessons against the 17-element inventory
node scripts/check-content.mjs

# Rebuild curriculum index & full-text search index
node scripts/gen-curriculum.mjs
node scripts/build-search-index.mjs
```

---

## 📄 License & Attribution

Designed and engineered for **FullStack Academy** as an open, sovereign, bilingual learning standard.  
*Built with ❤️ for modern software engineers.*
