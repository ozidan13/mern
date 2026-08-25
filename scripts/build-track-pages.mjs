#!/usr/bin/env node
/* ============================================================
   scripts/build-track-pages.mjs — generates learn/<track>/index.html
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const TRACKS = [
  {
    id: 'foundations',
    name: 'Web & JS Foundations',
    version: 'ES2026 / HTTP/3',
    pattern: 'Core Protocols & Standards',
    color: 'var(--track-found)',
    descAr: 'الأساس المتين لكل مطور: فهم كيفية عمل بروتوكول HTTP، مسار حياة الطلب، محرك الـ Event Loop، وطرق التعامل مع الـ Asynchronous JavaScript.',
    descEn: 'Master core web protocols, request lifecycles, the JavaScript event loop, and asynchronous programming.',
    lessons: [
      { slug: 'how-web-works', title: 'How the Web & HTTP/3 Work', level: 1, mins: 20 },
      { slug: 'js-essentials', title: 'JavaScript Execution & Scope', level: 1, mins: 25 },
      { slug: 'async-js', title: 'Asynchronous JavaScript & Promises', level: 2, mins: 30 },
      { slug: 'fetch-api', title: 'Fetch API & REST Communication', level: 2, mins: 25 }
    ]
  },
  {
    id: 'react',
    name: 'React.js',
    version: '19.2',
    pattern: 'Component-Driven UI & Hooks',
    color: 'var(--track-react)',
    descAr: 'بناء واجهات مستخدم معقدة وسريعة: التفكير بمبدأ React، آلية عمل الـ Hooks وسلسلة استدعائها، خوارزمية الـ Reconciliation والمطابقة، ودمج التحديثات التلقائي.',
    descEn: 'Component architecture, state immutability, hook call-order mechanics, reconciliation diffing, and modern React 19 capabilities.',
    lessons: [
      { slug: 'thinking-in-react', title: 'Thinking in React & Component Hierarchy', level: 1, mins: 25 },
      { slug: 'use-state', title: 'State with useState & Immutability', level: 1, mins: 25 },
      { slug: 'use-effect', title: 'Effects with useEffect & Lifecycle Synchronization', level: 2, mins: 30 },
      { slug: 'reconciliation', title: 'Virtual DOM Diffing & Reconciliation', level: 3, mins: 35 }
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    version: '24 LTS',
    pattern: 'Event-Driven Asynchronous Runtime',
    color: 'var(--track-node)',
    descAr: 'فهم ما يحدث تحت الغطاء: مراحل الـ Event Loop الست، إدارة الذاكرة مع الـ Buffers، معالجة البيانات الضخمة باستخدام الـ Streams والـ Backpressure.',
    descEn: 'Deep dive into the 6-phase Event Loop, libuv threads, streams, backpressure, buffers, and native server creation.',
    lessons: [
      { slug: 'what-node-is', title: 'Node.js Architecture & V8 Runtime', level: 1, mins: 20 },
      { slug: 'event-loop', title: 'The 6-Phase Event Loop Deep Dive', level: 2, mins: 35 },
      { slug: 'streams-buffers', title: 'Streams, Buffers & Backpressure Handling', level: 3, mins: 30 }
    ]
  },
  {
    id: 'express',
    name: 'Express.js',
    version: '5.2',
    pattern: 'Middleware Pipeline & REST API',
    color: 'var(--track-express)',
    descAr: 'بناء الـ Backend والـ APIs: تدفق الـ Middleware Conveyor، تنظيم الراوترات وهيكلة المشروع، المعالجة المركزية للأخطاء، وإنشاء REST CRUD كامل.',
    descEn: 'Build production APIs with middleware pipelines, robust routing architectures, centralized error handling, and REST best practices.',
    lessons: [
      { slug: 'hello-express', title: 'Express Fundamentals & Server Setup', level: 1, mins: 20 },
      { slug: 'middleware', title: 'The Middleware Conveyor Pipeline & next()', level: 2, mins: 30 },
      { slug: 'rest-crud', title: 'Building a Production REST CRUD API', level: 2, mins: 35 }
    ]
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    version: '8.0',
    pattern: 'Document Model & Aggregation',
    color: 'var(--track-mongo)',
    descAr: 'قواعد البيانات غير العلائقية: نمذجة البيانات بالمستندات (Embedding vs Referencing)، استعلامات CRUD المتقدمة، وخط أنابيب التجميع Multi-Stage Aggregation Pipeline.',
    descEn: 'Document data modeling, embedding vs referencing trade-offs, index strategies, and multi-stage aggregation pipelines.',
    lessons: [
      { slug: 'document-model', title: 'The Document Model & Schema Design', level: 1, mins: 25 },
      { slug: 'crud-operators', title: 'Advanced CRUD & Query Operators', level: 2, mins: 30 },
      { slug: 'aggregation-pipeline', title: 'Multi-Stage Aggregation Pipeline', level: 3, mins: 35 }
    ]
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    version: '18.x',
    pattern: 'Relational Model, Joins & ACID',
    color: 'var(--track-pg)',
    descAr: 'قواعد البيانات العلائقية الاحترافية: العلاقات والـ Joins، الفهارس B-Tree، المعاملات Transactions، وظواهر العزل ACID Isolation Anomalies.',
    descEn: 'Relational schema design, SQL joins mechanics, indexing performance, transactions, and ACID isolation levels.',
    lessons: [
      { slug: 'relational-model', title: 'Relational Data Modeling & Constraints', level: 1, mins: 25 },
      { slug: 'sql-joins', title: 'SQL Joins Mechanics (Inner, Left, Cross)', level: 2, mins: 30 },
      { slug: 'transactions-acid', title: 'Transactions, ACID & Isolation Anomalies', level: 3, mins: 35 }
    ]
  },
  {
    id: 'prisma',
    name: 'Prisma ORM',
    version: '7.x',
    pattern: 'Type-Safe ORM & Data Layer',
    color: 'var(--track-prisma)',
    descAr: 'طبقة البيانات الآمنة: كتابة الـ Schema، العلاقات بين الجداول، استعلامات Type-Safe بدون أخطاء، كشف ومعالجة مشكلة N+1 Queries.',
    descEn: 'Type-safe database access, schema migrations, relation modeling, and N+1 query detection and prevention.',
    lessons: [
      { slug: 'what-is-an-orm', title: 'What is an ORM & Why Prisma?', level: 1, mins: 20 },
      { slug: 'schema-relations', title: 'Prisma Schema & Relational Modeling', level: 1, mins: 30 },
      { slug: 'queries-and-nplus1', title: 'Type-Safe Queries & N+1 Optimization', level: 2, mins: 30 }
    ]
  },
  {
    id: 'architecture',
    name: 'Full-Stack Architecture & Next.js',
    version: 'Modern Web',
    pattern: 'Distributed Systems & Boundaries',
    color: 'var(--track-arch)',
    descAr: 'ربط كل الأجزاء في نظام متكامل: فصل المسؤوليات، مسارات الطلبات الأربعة، حدود السيرفر والعميل في Next.js، واستراتيجيات الـ Caching والأمان.',
    descEn: 'Connect the entire stack: separation of concerns, request lifecycle maps, server/client component boundaries, and caching architectures.',
    lessons: [
      { slug: 'separation-of-concerns', title: 'Separation of Concerns & Clean Architecture', level: 1, mins: 25 },
      { slug: 'request-lifecycles', title: 'The Four Full-Stack Request Lifecycles', level: 1, mins: 30 },
      { slug: 'nextjs-mental-model', title: 'Next.js Mental Model & Boundaries', level: 1, mins: 30 }
    ]
  }
];

function buildTrackHtml(t) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.name} Track · مسار ${t.name} — FullStack Academy</title>
  
  <link rel="stylesheet" href="../../css/tokens.css">
  <link rel="stylesheet" href="../../css/base.css">
  <link rel="stylesheet" href="../../css/components.css">
  <link rel="stylesheet" href="../../css/layout.css">
  <link rel="stylesheet" href="../../css/learning.css">
</head>
<body>
  <a href="#main-content" class="fsa-skip-link">Skip to main content · الانتقال للمحتوى</a>

  <div class="fsa-shell">
    <header class="fsa-topbar">
      <div class="fsa-topbar__start">
        <a href="../../index.html" class="fsa-topbar__brand">
          <span>FullStack Academy</span>
        </a>
      </div>

      <div class="fsa-topbar__center">
        <button class="fsa-topbar__search-btn" data-fsa-search-trigger>
          <span style="display: flex; align-items: center; gap: 6px;">
            <svg style="width: 14px; height: 14px;"><use href="../../assets/icons.svg#fsa-icon-search"></use></svg>
            <span>Quick Find · بحث سريع</span>
          </span>
          <kbd class="fsa-topbar__search-kbd">Ctrl K</kbd>
        </button>
      </div>

      <div class="fsa-topbar__end">
        <button id="themeToggleBtn" class="fsa-btn fsa-btn--ghost fsa-btn--icon" data-fsa-theme-toggle aria-label="Toggle Theme">
          <svg><use href="../../assets/icons.svg#fsa-icon-sun"></use></svg>
        </button>
        <a href="../../dashboard.html" class="fsa-btn fsa-btn--ghost fsa-btn--sm">
          <svg><use href="../../assets/icons.svg#fsa-icon-flame"></use></svg>
          <span>Dashboard</span>
        </a>
      </div>
    </header>

    <main id="main-content" class="fsa-main" style="max-width: 1000px; margin-inline: auto; width: 100%; padding-block: var(--space-8);">
      <div class="fsa-lesson-header">
        <nav class="fsa-breadcrumbs">
          <a href="../../index.html">Home</a> &rsaquo;
          <a href="../index.html">Learn</a> &rsaquo;
          <span>${t.name}</span>
        </nav>

        <div style="display: flex; align-items: center; gap: 8px; margin-block-end: var(--space-2);">
          <span class="fsa-track-dot" style="--chip-color: ${t.color}; width: 14px; height: 14px;"></span>
          <h1 style="margin: 0;">${t.name} Track</h1>
        </div>

        <div class="fsa-lesson-header__meta">
          <span class="fsa-chip">Teaches: ${t.version}</span>
          <span class="fsa-badge">${t.pattern}</span>
          <span class="fsa-badge">${t.lessons.length} Core Lessons</span>
        </div>

        <p class="fsa-lead" style="margin-block-start: var(--space-4);">${t.descEn}</p>
        <p class="fsa-ar" dir="rtl" style="color: var(--text-secondary); font-size: var(--fs-md); margin-block-start: var(--space-2);">
          ${t.descAr}
        </p>
      </div>

      <section style="margin-block: var(--space-8);">
        <h2>Track Lessons · الدروس</h2>
        <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-block-start: var(--space-4);">
          ${t.lessons.map((l, i) => `
            <a href="${l.slug}.html" class="fsa-card" style="text-decoration: none; display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-5);">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span style="font-family: var(--font-mono); font-weight: 700; color: var(--text-muted); width: 24px;">${i + 1}.</span>
                <div>
                  <div class="fsa-card__title" style="font-size: var(--fs-md);">${l.title}</div>
                  <div class="fsa-card__meta">Level ${l.level} · ${l.mins} mins</div>
                </div>
              </div>
              <svg style="width: 18px; height: 18px; color: var(--text-muted);"><use href="../../assets/icons.svg#fsa-icon-chevron-right"></use></svg>
            </a>
          `).join('')}
        </div>
      </section>
    </main>
  </div>

  <script src="../../js/fsa-namespace.js"></script>
  <script src="../../data/curriculum.js"></script>
  <script src="../../js/theme.js"></script>
  <script src="../../js/progress.js"></script>
  <script src="../../js/search.js"></script>
  <script src="../../js/app.js"></script>
</body>
</html>`;
}

for (const t of TRACKS) {
  const dir = path.join(rootDir, 'learn', t.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildTrackHtml(t), 'utf-8');
}

console.log('✅ Generated 8 track home pages under learn/<track>/index.html');
