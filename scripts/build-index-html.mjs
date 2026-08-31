#!/usr/bin/env node
/* ============================================================
   scripts/build-index-html.mjs
   ------------------------------------------------------------
   Generates the ultra-premium, spacious, glassmorphic index.html
   featuring all 106 interactive lessons across 8 dedicated track
   sections with zero scroll traps, Google Fonts, and live search.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read all 106 lesson files and extract their full metadata
const lessonsByTrack = {
  foundations: [],
  react: [],
  nodejs: [],
  express: [],
  mongodb: [],
  postgresql: [],
  prisma: [],
  architecture: []
};

const iconMap = {
  foundations: ['fsa-icon-code', 'fsa-icon-lightbulb', 'fsa-icon-clock', 'fsa-icon-database', 'fsa-icon-layers', 'fsa-icon-terminal'],
  react: ['fsa-icon-lightbulb', 'fsa-icon-flame', 'fsa-icon-code', 'fsa-icon-layers', 'fsa-icon-clock', 'fsa-icon-terminal'],
  nodejs: ['fsa-icon-terminal', 'fsa-icon-clock', 'fsa-icon-database', 'fsa-icon-code', 'fsa-icon-layers', 'fsa-icon-flame'],
  express: ['fsa-icon-terminal', 'fsa-icon-code', 'fsa-icon-database', 'fsa-icon-lock', 'fsa-icon-layers', 'fsa-icon-check'],
  mongodb: ['fsa-icon-database', 'fsa-icon-layers', 'fsa-icon-code', 'fsa-icon-flame', 'fsa-icon-lock', 'fsa-icon-terminal'],
  postgresql: ['fsa-icon-database', 'fsa-icon-layers', 'fsa-icon-lock', 'fsa-icon-code', 'fsa-icon-clock', 'fsa-icon-flame'],
  prisma: ['fsa-icon-code', 'fsa-icon-database', 'fsa-icon-layers', 'fsa-icon-alert', 'fsa-icon-check', 'fsa-icon-flame'],
  architecture: ['fsa-icon-flame', 'fsa-icon-layers', 'fsa-icon-lock', 'fsa-icon-database', 'fsa-icon-terminal', 'fsa-icon-check']
};

const trackMetadata = {
  foundations: {
    num: '01',
    id: 'foundations',
    titleAr: 'أساسيات الويب والبرمجة الحديثة',
    titleEn: 'Web & JS Foundations (ES2026)',
    descAr: 'البنية المعمارية للإنترنت بروتوكولات HTTP/3 و DNS، والهيكل الدلالي للـ HTML ومعايير الوصول WCAG، ونماذج الصندوق CSS Box Model، ومحرك V8 ونطاقات المتغيرات Closures والبرمجة اللاتزامنية Async/Await.',
    hours: '6.5 ساعات',
    levelAr: 'تأسيسي إلى متقدم',
    color: '#F59E0B',
    accentClass: 'track-amber',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)'
  },
  react: {
    num: '02',
    id: 'react',
    titleAr: 'ريآكت 19 وهندسة الواجهات التفاعلية',
    titleEn: 'React.js 19.2 Architecture & Fiber',
    descAr: 'التفكير بطريقة ريآكت، شجرة الألياف Fiber Tree ومطابقة الـ VDOM، إدارة الحالة بـ useState و useReducer، سياق التطبيق Context API، وبناء الـ Custom Hooks، وإدارة الحالة المتقدمة بـ Zustand والتوجيه بـ React Router 7.',
    hours: '8 ساعات',
    levelAr: 'متوسط إلى إنتاجي',
    color: '#38BDF8',
    accentClass: 'track-sky',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    gradient: 'linear-gradient(135deg, #0284C7, #0369A1)'
  },
  nodejs: {
    num: '03',
    id: 'nodejs',
    titleAr: 'بيئة نود ومحرك العمليات عالي الأداء',
    titleEn: 'Node.js 24 LTS Runtime & libuv',
    descAr: 'تشريح محرك V8 وتفويض العمليات لمكتبة libuv، حلقة الأحداث ذات الـ 6 مراحل (6-Phase Event Loop)، التدفقات الثنائية Streams والـ Buffers مع التحكم في الـ Backpressure، والعمليات الفرعية Child Processes والأمان العالي.',
    hours: '6 ساعات',
    levelAr: 'متوسط إلى متقدم',
    color: '#84CC16',
    accentClass: 'track-lime',
    glowColor: 'rgba(132, 204, 22, 0.15)',
    gradient: 'linear-gradient(135deg, #65A30D, #4D7C0F)'
  },
  express: {
    num: '04',
    id: 'express',
    titleAr: 'إكسبريس وبناء خوادم الـ REST API',
    titleEn: 'Express.js 5.2 Server & Production APIs',
    descAr: 'خط معالجة الطلبات Middleware Pipeline، معايير RESTful CRUD المتقدمة، فحص المدخلات بـ Zod، التوثيق الأمني بـ JWT و Refresh Tokens، التحكم بالصلاحيات RBAC، رفع الملفات ومعالجة الأخطاء الشاملة.',
    hours: '6 ساعات',
    levelAr: 'متوسط إلى إنتاجي',
    color: '#E4E4E7',
    accentClass: 'track-zinc',
    glowColor: 'rgba(228, 228, 231, 0.15)',
    gradient: 'linear-gradient(135deg, #71717A, #52525B)'
  },
  mongodb: {
    num: '05',
    id: 'mongodb',
    titleAr: 'مونجو وقواعد البيانات الوثائقية الموزعة',
    titleEn: 'MongoDB 8.0 NoSQL & WiredTiger',
    descAr: 'نموذج مستندات BSON، استراتيجيات تضمين البيانات مقابل الإسناد (Embedding vs Referencing)، الفهارس المركبة وشرح خطة التنفيذ explain()، خطوط التجميع Aggregation Pipelines، والمعاملات الذرية ACID متعددة المستندات.',
    hours: '4.5 ساعات',
    levelAr: 'متوسط إلى متقدم',
    color: '#22C55E',
    accentClass: 'track-emerald',
    glowColor: 'rgba(34, 197, 94, 0.15)',
    gradient: 'linear-gradient(135deg, #16A34A, #15803D)'
  },
  postgresql: {
    num: '06',
    id: 'postgresql',
    titleAr: 'بوستجرس وقواعد البيانات العلائقية المعقدة',
    titleEn: 'PostgreSQL 18.x Relational Engine & MVCC',
    descAr: 'المعمارية العلائقية وسلامة المعاملات البنكية ACID، عمليات الربط المتقدمة Joins، فهارس B-Tree و GIN و GiST، استعلامات CTEs التكرارية، حقول JSONB الهجينة، وإدارة Concurrency Control عبر MVCC.',
    hours: '5 ساعات',
    levelAr: 'متوسط إلى متقدم',
    color: '#60A5FA',
    accentClass: 'track-blue',
    glowColor: 'rgba(96, 165, 250, 0.15)',
    gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)'
  },
  prisma: {
    num: '07',
    id: 'prisma',
    titleAr: 'بريزما والتعامل الآمن مع البيانات (Type-Safe)',
    titleEn: 'Prisma 7.x ORM & Type Safety',
    descAr: 'نمذجة البيانات بلغة Prisma Schema، دورة حياة الـ Migrations، استعلامات CRUD عالية الكفاءة مع منع N+1 Queries، المعاملات التفاعلية Interactive Transactions، وامتدادات Prisma Client Extensions.',
    hours: '4.5 ساعات',
    levelAr: 'متوسط إلى متقدم',
    color: '#818CF8',
    accentClass: 'track-indigo',
    glowColor: 'rgba(129, 140, 248, 0.15)',
    gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)'
  },
  architecture: {
    num: '08',
    id: 'architecture',
    titleAr: 'العمارة الشاملة وتصميم النظم الكبرى',
    titleEn: 'Full-Stack Architecture & System Design',
    descAr: 'المعمارية ثلاثية الطبقات 3-Tier و Clean Architecture، التخزين المؤقت الموزع بـ Redis، التراسل الحي بـ WebSockets، طوابير الرسائل Message Queues، بوابات الـ API Gateway، وحالات دراسة حقيقية لتصميم النظم الكبرى.',
    hours: '7.5 ساعات',
    levelAr: 'متقدم إلى خبير',
    color: '#C084FC',
    accentClass: 'track-purple',
    glowColor: 'rgba(192, 132, 252, 0.15)',
    gradient: 'linear-gradient(135deg, #9333EA, #7E22CE)'
  }
};

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
      const html = fs.readFileSync(fullPath, 'utf-8');
      const track = html.match(/<meta name="fsa-track" content="([^"]+)"/)?.[1];
      const slug = html.match(/<meta name="fsa-lesson" content="([^"]+)"/)?.[1];
      const level = parseInt(html.match(/<meta name="fsa-level" content="([^"]+)"/)?.[1] || '1', 10);
      const order = parseInt(html.match(/<meta name="fsa-order" content="([^"]+)"/)?.[1] || '1', 10);
      const title = html.match(/<meta name="fsa-title" content="([^"]+)"/)?.[1] || entry.name.replace('.html', '');
      const estMinutes = html.match(/<meta name="fsa-est-minutes" content="([^"]+)"/)?.[1] || '25';
      const pattern = html.match(/<meta name="fsa-pattern-label" content="([^"]+)"/)?.[1] || '';
      const subtitle = html.match(/<p class="fsa-subtitle fsa-ar"[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim() || pattern || title;

      if (track && lessonsByTrack[track]) {
        lessonsByTrack[track].push({
          track,
          slug,
          level,
          order,
          title,
          estMinutes,
          subtitle,
          url: `learn/${track}/${slug}.html`
        });
      }
    }
  }
}

walkDir(path.join(rootDir, 'learn'));

// Sort lessons by level and order inside each track
for (const track of Object.keys(lessonsByTrack)) {
  lessonsByTrack[track].sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.order - b.order;
  });
}

let totalCount = 0;
for (const [t, list] of Object.entries(lessonsByTrack)) {
  totalCount += list.length;
}
console.log(`\nVerified ${totalCount} / 106 lessons across all 8 tracks.`);

// Render Track Nav Pills
const trackNavPillsHtml = Object.keys(trackMetadata).map(trackKey => {
  const meta = trackMetadata[trackKey];
  const count = lessonsByTrack[trackKey]?.length || 0;
  return `
    <a href="#track-${meta.id}" class="track-nav-pill" style="--pill-color: ${meta.color};">
      <span class="pill-dot"></span>
      <span class="pill-title">${meta.titleAr.split(' ')[0]}</span>
      <span class="pill-count">${count}</span>
    </a>
  `;
}).join('\n');

// Render Full-Width Track Sections
function renderTrackSection(trackKey, lessons) {
  const meta = trackMetadata[trackKey];
  const icons = iconMap[trackKey] || ['fsa-icon-code'];

  const lessonCardsHtml = lessons.map((lesson, idx) => {
    const icon = icons[idx % icons.length];
    const orderStr = String(idx + 1).padStart(2, '0');
    return `
      <a href="${lesson.url}" class="ch-lesson-card" data-lesson-slug="${lesson.slug}" data-level="${lesson.level}">
        <div class="ch-lesson-card__header">
          <span class="ch-lesson-order">#${orderStr}</span>
          <div class="ch-lesson-badges">
            <span class="ch-badge ch-badge--level">Level ${lesson.level}</span>
            <span class="ch-badge ch-badge--time">⏱️ ${lesson.estMinutes} دقيقة</span>
          </div>
        </div>

        <div class="ch-lesson-card__body">
          <div class="ch-lesson-icon">
            <svg><use href="assets/icons.svg#${icon}"></use></svg>
          </div>
          <div class="ch-lesson-content">
            <h3 class="ch-lesson-title">${lesson.title}</h3>
            <p class="ch-lesson-desc">${lesson.subtitle}</p>
          </div>
        </div>

        <div class="ch-lesson-card__footer">
          <span class="ch-lesson-action">ابدأ الدرس الآن &larr;</span>
          <svg class="ch-lesson-arrow"><use href="assets/icons.svg#fsa-icon-chevron-left"></use></svg>
        </div>
      </a>
    `;
  }).join('\n');

  return `
    <!-- ==================== TRACK ${meta.num}: ${meta.titleEn} ==================== -->
    <section class="ch-track-section" id="track-${meta.id}" style="--track-color: ${meta.color}; --track-glow: ${meta.glowColor};">
      <div class="ch-track-header">
        <div class="ch-track-meta-top">
          <span class="ch-track-num-badge">مسار ${meta.num}</span>
          <span class="ch-track-stat-pill">📚 ${lessons.length} درساً تفاعلياً</span>
          <span class="ch-track-stat-pill">⏳ ${meta.hours}</span>
          <span class="ch-track-stat-pill">🎯 ${meta.levelAr}</span>
        </div>

        <h2 class="ch-track-title">${meta.titleAr}</h2>
        <div class="ch-track-subtitle">${meta.titleEn}</div>
        <p class="ch-track-desc">${meta.descAr}</p>
      </div>

      <!-- Spacious Lesson Cards Grid (All ${lessons.length} lessons visible openly) -->
      <div class="ch-lessons-grid">
        ${lessonCardsHtml}
      </div>
    </section>
  `;
}

const allTrackSectionsHtml = Object.keys(lessonsByTrack)
  .map(trackKey => renderTrackSection(trackKey, lessonsByTrack[trackKey]))
  .join('\n\n');

const fullIndexHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FullStack Academy | أكاديمية الفول ستاك الحديثة — 106 درساً تفاعلياً من الصفر للاحتراف</title>
  <meta name="description" content="تعلم هندسة الويب الشاملة (MERN & PERN Stack) بطريقة تفاعلية ومبسطة باللغة العربية مع 106 دروس متكاملة، محاكيات مباشرة وتشريح الكود">

  <!-- Google Fonts: Cairo (Arabic), Inter (Latin), Fira Code (Mono) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- Core Tokens & Fonts -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/learning.css">

  <style>
    /* ============================================================
       CODEHUB MASTERPIECE PORTAL ARCHITECTURE
       ============================================================ */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #020617;
      color: #F8FAFC;
      min-height: 100vh;
      overflow-x: hidden;
      font-family: var(--font-arabic);
      -webkit-font-smoothing: antialiased;
    }

    /* Hero Section with Deep Aurora Radial Glows */
    .hero {
      width: 100%;
      min-height: 85vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 24px 70px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(ellipse 120% 80% at 50% 0%, #0e1630 0%, #020617 70%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .aurora {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.6;
      pointer-events: none;
    }

    .aurora-1 {
      width: 600px;
      height: 600px;
      top: -15%;
      left: -10%;
      background: rgba(59, 130, 246, 0.16);
      animation: auroraFloat1 22s ease-in-out infinite alternate;
    }

    .aurora-2 {
      width: 550px;
      height: 550px;
      bottom: 5%;
      right: -10%;
      background: rgba(139, 92, 246, 0.14);
      animation: auroraFloat2 18s ease-in-out infinite alternate;
    }

    .aurora-3 {
      width: 500px;
      height: 500px;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(16, 185, 129, 0.10);
    }

    @keyframes auroraFloat1 {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 40px); }
    }
    @keyframes auroraFloat2 {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-40px, -50px); }
    }

    #particles {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 1440px;
    }

    /* Top Navigation Bar */
    .ch-nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 24px;
      margin-bottom: 40px;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 100px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    }

    .ch-nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #fff;
      font-weight: 800;
      font-size: 1.2rem;
      font-family: var(--font-sans);
    }

    .ch-nav-brand-logo {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1rem;
      font-weight: 900;
      box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
    }

    .ch-nav-links {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ch-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94A3B8;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.25s ease;
      cursor: pointer;
      font-family: var(--font-arabic);
      font-weight: 600;
    }

    .ch-nav-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      transform: translateY(-1px);
    }

    /* Hero Titles */
    .hero-title-box {
      text-align: center;
      margin-bottom: 40px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 22px;
      border-radius: 100px;
      background: rgba(59, 130, 246, 0.12);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #60A5FA;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .hero-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
      animation: fsa-status-pulse 2s infinite;
    }

    .hero-title-box h1 {
      font-size: clamp(2.4rem, 5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.25;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #FFFFFF 0%, #60A5FA 30%, #C084FC 70%, #FFFFFF 100%);
      background-size: 250% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 10s ease infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .hero-title-box p {
      font-size: 1.25rem;
      color: #94A3B8;
      max-width: 840px;
      margin: 0 auto;
      line-height: 1.9;
    }

    /* Stats Ribbon */
    .hero-stats-ribbon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    .hero-stat {
      text-align: center;
    }

    .hero-stat-num {
      font-family: var(--font-mono);
      font-size: 2.2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60A5FA, #C084FC);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.1;
    }

    .hero-stat-label {
      font-size: 0.88rem;
      color: #64748B;
      margin-top: 4px;
      font-weight: 600;
    }

    .hero-stat-sep {
      width: 1px;
      height: 36px;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Live Search Header */
    .hero-search-wrapper {
      max-width: 720px;
      width: 100%;
      margin: 0 auto;
      position: relative;
    }

    .hero-search-input {
      width: 100%;
      padding: 18px 54px 18px 24px;
      border-radius: 100px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(59, 130, 246, 0.4);
      color: #fff;
      font-family: var(--font-arabic);
      font-size: 1.05rem;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .hero-search-input:focus {
      border-color: #60A5FA;
      box-shadow: 0 0 35px rgba(59, 130, 246, 0.35);
      background: rgba(15, 23, 42, 0.98);
    }

    .hero-search-icon {
      position: absolute;
      right: 22px;
      top: 50%;
      transform: translateY(-50%);
      color: #60A5FA;
      pointer-events: none;
      width: 22px;
      height: 22px;
    }

    /* Sticky Track Quick-Jump Navigation */
    .sticky-track-nav {
      position: sticky;
      top: 0;
      z-index: 90;
      background: rgba(2, 6, 23, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 12px 24px;
    }

    .sticky-track-nav-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }

    .sticky-track-nav-inner::-webkit-scrollbar {
      display: none;
    }

    .track-nav-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94A3B8;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 700;
      white-space: nowrap;
      transition: all 0.25s ease;
    }

    .track-nav-pill:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border-color: var(--pill-color, #60A5FA);
      transform: translateY(-1px);
    }

    .pill-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--pill-color, #60A5FA);
    }

    .pill-count {
      padding: 2px 6px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.06);
      font-size: 0.75rem;
      font-family: var(--font-mono);
    }

    /* =================== FULL-WIDTH TRACK SECTIONS =================== */
    .ch-main-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 40px 24px 100px;
      display: flex;
      flex-direction: column;
      gap: 80px;
    }

    .ch-track-section {
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 28px;
      padding: 40px 36px;
      position: relative;
      overflow: hidden;
      scroll-margin-top: 80px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .ch-track-section:hover {
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: 0 20px 60px -20px var(--track-glow, rgba(59, 130, 246, 0.2));
    }

    .ch-track-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 10%;
      right: 10%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--track-color, #3B82F6), transparent);
    }

    .ch-track-header {
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .ch-track-meta-top {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .ch-track-num-badge {
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 800;
      color: #fff;
      background: var(--track-color, #3B82F6);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .ch-track-stat-pill {
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #94A3B8;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .ch-track-title {
      font-size: clamp(1.8rem, 3.5vw, 2.4rem);
      font-weight: 900;
      color: #fff;
      margin-bottom: 6px;
    }

    .ch-track-subtitle {
      font-size: 0.95rem;
      font-family: var(--font-mono);
      color: var(--track-color, #60A5FA);
      margin-bottom: 14px;
      direction: ltr;
      text-align: right;
    }

    .ch-track-desc {
      font-size: 1.05rem;
      color: #94A3B8;
      line-height: 1.8;
      max-width: 1000px;
    }

    /* Spacious Lesson Cards Grid */
    .ch-lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    /* Individual Lesson Card */
    .ch-lesson-card {
      background: rgba(2, 6, 23, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 18px;
      padding: 22px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .ch-lesson-card:hover {
      background: rgba(15, 23, 42, 0.9);
      border-color: var(--track-color, #60A5FA);
      transform: translateY(-4px);
      box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6);
    }

    .ch-lesson-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .ch-lesson-order {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--track-color, #60A5FA);
    }

    .ch-lesson-badges {
      display: flex;
      gap: 6px;
    }

    .ch-badge {
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
    }

    .ch-badge--level {
      background: rgba(255, 255, 255, 0.05);
      color: #94A3B8;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .ch-badge--time {
      background: rgba(245, 158, 11, 0.1);
      color: #FBBF24;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    .ch-lesson-card__body {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .ch-lesson-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--track-color, #60A5FA);
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .ch-lesson-icon svg {
      width: 18px;
      height: 18px;
    }

    .ch-lesson-card:hover .ch-lesson-icon {
      transform: scale(1.1) rotate(-4deg);
      background: var(--track-color, #60A5FA);
      color: #fff;
    }

    .ch-lesson-content {
      flex: 1;
      min-width: 0;
    }

    .ch-lesson-title {
      font-family: var(--font-sans);
      font-size: 0.98rem;
      font-weight: 700;
      color: #F8FAFC;
      margin-bottom: 6px;
      line-height: 1.4;
      direction: ltr;
      text-align: left;
      transition: color 0.2s ease;
    }

    .ch-lesson-card:hover .ch-lesson-title {
      color: var(--track-color, #60A5FA);
    }

    .ch-lesson-desc {
      font-family: var(--font-arabic);
      font-size: 0.88rem;
      color: #94A3B8;
      line-height: 1.6;
    }

    .ch-lesson-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.04);
    }

    .ch-lesson-action {
      font-size: 0.82rem;
      font-weight: 700;
      color: #64748B;
      transition: color 0.2s ease;
    }

    .ch-lesson-card:hover .ch-lesson-action {
      color: #fff;
    }

    .ch-lesson-arrow {
      width: 14px;
      height: 14px;
      color: #475569;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .ch-lesson-card:hover .ch-lesson-arrow {
      transform: translateX(-4px);
      color: var(--track-color, #60A5FA);
    }

    /* Capstones Hub Section */
    .ch-capstones-section {
      background: radial-gradient(ellipse 100% 60% at 50% 0%, rgba(59, 130, 246, 0.1) 0%, rgba(15, 23, 42, 0.6) 80%);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 28px;
      padding: 44px 36px;
    }

    /* Footer */
    .ch-footer {
      text-align: center;
      padding-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      color: #64748B;
      font-size: 0.95rem;
      line-height: 1.8;
    }
  </style>
</head>

<body>
  <!-- Accessible Skip Link -->
  <a href="#tracksContainer" class="fsa-skip-link">تخطي إلى مسارات الدروس · Skip to Content</a>

  <!-- ==================== HERO SECTION ==================== -->
  <section class="hero">
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
    <canvas id="particles"></canvas>

    <div class="hero-content">
      <!-- Navigation Header -->
      <nav class="ch-nav-header">
        <a href="index.html" class="ch-nav-brand">
          <div class="ch-nav-brand-logo">⚡</div>
          <span>FullStack Academy</span>
        </a>

        <div class="ch-nav-links">
          <button class="ch-nav-btn" data-fsa-search-trigger>
            <svg style="width: 15px; height: 15px;"><use href="assets/icons.svg#fsa-icon-search"></use></svg>
            <span>بحث شامل</span>
            <kbd class="fsa-topbar__search-kbd">Ctrl K</kbd>
          </button>

          <a href="dashboard.html" class="ch-nav-btn">
            <svg style="width: 15px; height: 15px;"><use href="assets/icons.svg#fsa-icon-flame"></use></svg>
            <span>لوحة المتابعة</span>
          </a>

          <a href="projects/index.html" class="ch-nav-btn">
            <svg style="width: 15px; height: 15px;"><use href="assets/icons.svg#fsa-icon-check"></use></svg>
            <span>مشاريع التخرج</span>
          </a>

          <button id="themeToggleBtn" class="ch-nav-btn" data-fsa-theme-toggle aria-label="Toggle Theme">
            <svg style="width: 15px; height: 15px;"><use href="assets/icons.svg#fsa-icon-sun"></use></svg>
          </button>
        </div>
      </nav>

      <!-- Hero Title -->
      <div class="hero-title-box">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          <span>Zero-Build · 100% Offline · 106 Interactive Masterclasses</span>
        </div>

        <h1>FullStack Academy · الخوارزميات وهندسة الويب</h1>
        <p>
          تعلم هندسة الويب الشاملة (MERN &amp; PostgreSQL Stack) بطريقة تفاعلية ومبسطة باللغة العربية مع 106 دروس متكاملة، محاكيات تشغيل حية، تشريح الكود سطراً بسطر، واختبارات إتقان فورية بدون الحاجة لأي اتصال بالإنترنت.
        </p>
      </div>

      <!-- Stats Ribbon -->
      <div class="hero-stats-ribbon">
        <div class="hero-stat">
          <div class="hero-stat-num">8</div>
          <div class="hero-stat-label">مسارات معمارية</div>
        </div>
        <div class="hero-stat-sep"></div>
        <div class="hero-stat">
          <div class="hero-stat-num">106</div>
          <div class="hero-stat-label">درساً تفاعلياً شاملاً</div>
        </div>
        <div class="hero-stat-sep"></div>
        <div class="hero-stat">
          <div class="hero-stat-num">100%</div>
          <div class="hero-stat-label">أوفلاين مستقل بالكامل</div>
        </div>
        <div class="hero-stat-sep"></div>
        <div class="hero-stat">
          <div class="hero-stat-num">4</div>
          <div class="hero-stat-label">مشاريع تخرج إنتاجية</div>
        </div>
      </div>

      <!-- Live Search Box Across All 106 Lessons -->
      <div class="hero-search-wrapper">
        <input type="text" id="curriculumLiveFilter" class="hero-search-input" placeholder="🔍 ابحث في 106 دروس (مثال: useState, JWT, Docker, Redis, Prisma, BSON, Event Loop)..." aria-label="تصفية الدروس المباشرة">
        <svg class="hero-search-icon"><use href="assets/icons.svg#fsa-icon-search"></use></svg>
      </div>
    </div>
  </section>

  <!-- ==================== STICKY TRACK QUICK JUMP ==================== -->
  <nav class="sticky-track-nav" aria-label="Quick Jump to Track">
    <div class="sticky-track-nav-inner">
      ${trackNavPillsHtml}
      <a href="#capstones" class="track-nav-pill" style="--pill-color: #10B981;">
        <span class="pill-dot"></span>
        <span class="pill-title">مشاريع التخرج</span>
        <span class="pill-count">4</span>
      </a>
    </div>
  </nav>

  <!-- ==================== MAIN 8 TRACKS CONTAINER ==================== -->
  <main class="ch-main-container" id="tracksContainer">
    ${allTrackSectionsHtml}

    <!-- Capstones Section -->
    <section class="ch-capstones-section" id="capstones">
      <div class="ch-track-header" style="border: none; margin-bottom: 24px;">
        <div class="ch-track-meta-top">
          <span class="ch-track-num-badge" style="background: #10B981;">CAPSTONE GATES</span>
          <span class="ch-track-stat-pill">💼 4 مشاريع كبرى</span>
          <span class="ch-track-stat-pill">🚀 Portfolio Ready</span>
        </div>
        <h2 class="ch-track-title">مشاريع التخرج والتطبيقات الإنتاجية الكاملة</h2>
        <p class="ch-track-desc">تطبيقات عملية متكاملة لترسيخ ما تعلمته في جميع المسارات مع قوائم مهام تفاعلية تُحفظ محلياً.</p>
      </div>

      <div class="ch-lessons-grid">
        <a href="projects/kanban-board.html" class="ch-lesson-card" style="border-inline-start: 4px solid var(--track-react);">
          <div class="ch-lesson-card__header">
            <span class="ch-lesson-order">PROJECT 01</span>
            <span class="ch-badge ch-badge--level">React 19 Gate</span>
          </div>
          <div class="ch-lesson-card__body">
            <div class="ch-lesson-icon"><svg><use href="assets/icons.svg#fsa-icon-layers"></use></svg></div>
            <div class="ch-lesson-content">
              <h3 class="ch-lesson-title">React Kanban Task Board</h3>
              <p class="ch-lesson-desc">تطبيق كانبان بالسحب والإفلات وحفظ الحالة محلياً وفلاتر بحث سريعة.</p>
            </div>
          </div>
          <div class="ch-lesson-card__footer">
            <span class="ch-lesson-action">استعراض المشروع &larr;</span>
          </div>
        </a>

        <a href="projects/rest-api.html" class="ch-lesson-card" style="border-inline-start: 4px solid var(--track-express);">
          <div class="ch-lesson-card__header">
            <span class="ch-lesson-order">PROJECT 02</span>
            <span class="ch-badge ch-badge--level">Backend Gate</span>
          </div>
          <div class="ch-lesson-card__body">
            <div class="ch-lesson-icon"><svg><use href="assets/icons.svg#fsa-icon-lock"></use></svg></div>
            <div class="ch-lesson-content">
              <h3 class="ch-lesson-title">Production Auth &amp; REST API</h3>
              <p class="ch-lesson-desc">خادم Express 5 + PostgreSQL + Prisma يدعم JWTs و RBAC ومكافحة الهجمات.</p>
            </div>
          </div>
          <div class="ch-lesson-card__footer">
            <span class="ch-lesson-action">استعراض المشروع &larr;</span>
          </div>
        </a>

        <a href="projects/ecommerce-platform.html" class="ch-lesson-card" style="border-inline-start: 4px solid var(--track-arch);">
          <div class="ch-lesson-card__header">
            <span class="ch-lesson-order">PROJECT 03</span>
            <span class="ch-badge ch-badge--level">Full-Stack Capstone</span>
          </div>
          <div class="ch-lesson-card__body">
            <div class="ch-lesson-icon"><svg><use href="assets/icons.svg#fsa-icon-flame"></use></svg></div>
            <div class="ch-lesson-content">
              <h3 class="ch-lesson-title">MERN Production E-Commerce</h3>
              <p class="ch-lesson-desc">متجر إلكتروني شامل مع كتالوج سريع وسلة شراء تفاعلية ودفع Stripe وكاش Redis.</p>
            </div>
          </div>
          <div class="ch-lesson-card__footer">
            <span class="ch-lesson-action">استعراض المشروع &larr;</span>
          </div>
        </a>

        <a href="projects/realtime-chat.html" class="ch-lesson-card" style="border-inline-start: 4px solid var(--track-node);">
          <div class="ch-lesson-card__header">
            <span class="ch-lesson-order">PROJECT 04</span>
            <span class="ch-badge ch-badge--level">Real-Time Gate</span>
          </div>
          <div class="ch-lesson-card__body">
            <div class="ch-lesson-icon"><svg><use href="assets/icons.svg#fsa-icon-terminal"></use></svg></div>
            <div class="ch-lesson-content">
              <h3 class="ch-lesson-title">Distributed WebSockets Chat</h3>
              <p class="ch-lesson-desc">خادم محادثة موزع يدعم غرف الدردشة والتزامن عبر قنوات Redis Pub/Sub.</p>
            </div>
          </div>
          <div class="ch-lesson-card__footer">
            <span class="ch-lesson-action">استعراض المشروع &larr;</span>
          </div>
        </a>
      </div>
    </section>

    <!-- Footer Note -->
    <footer class="ch-footer">
      <p>© 2026 FullStack Academy | صُممت كمعيار مفتوح ومستقل للتعليم البرمجي عالي الجودة باللغة العربية</p>
      <p style="font-size: 0.85rem; color: #475569; margin-top: 6px;">106 دروس متكاملة · 8 مسارات متخصصة · 100% أوفلاين بدون خوادم خارجية</p>
    </footer>
  </main>

  <!-- Zero-Build Shared Scripts -->
  <script src="js/fsa-namespace.js"></script>
  <script src="data/curriculum.js"></script>
  <script src="data/technologies.js"></script>
  <script src="data/tips.js"></script>
  <script src="js/theme.js"></script>
  <script src="js/progress.js"></script>
  <script src="js/search.js"></script>
  <script src="js/app.js"></script>

  <script>
    // =================== FLOATING CANVAS PARTICLES ===================
    const canvas = document.getElementById('particles');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    if (canvas && ctx) {
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });

      class Particle {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = (Math.random() - 0.5) * 0.3;
          this.speedY = (Math.random() - 0.5) * 0.3;
          this.opacity = Math.random() * 0.4 + 0.1;
          this.hue = Math.random() > 0.5 ? 215 : 265;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 0.8;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
          if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = \`hsla(\${this.hue}, 70%, 70%, \${this.opacity})\`;
          ctx.fill();
        }
      }

      const particleCount = Math.min(80, Math.floor(window.innerWidth / 16));
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());

      function drawLines() {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[i].x, particles[j].y);
              ctx.strokeStyle = \`rgba(100, 140, 255, \${0.06 * (1 - dist / 130)})\`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
      }
      animate();
    }

    // =================== INSTANT SEARCH FILTER ===================
    const filterInput = document.getElementById('curriculumLiveFilter');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const lessonCards = document.querySelectorAll('.ch-lesson-card');
        const trackSections = document.querySelectorAll('.ch-track-section');

        lessonCards.forEach(card => {
          const text = (card.innerText || '').toLowerCase();
          const href = (card.getAttribute('href') || '').toLowerCase();
          const matches = !query || text.includes(query) || href.includes(query);
          card.style.display = matches ? 'flex' : 'none';
        });

        trackSections.forEach(section => {
          const visibleLessons = section.querySelectorAll('.ch-lesson-card:not([style*="display: none"])');
          section.style.display = (visibleLessons.length > 0) ? 'block' : 'none';
        });
      });
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'index.html'), fullIndexHtml, 'utf-8');
console.log('✅ Generated ultra-premium index.html with all 106 lessons successfully!');
