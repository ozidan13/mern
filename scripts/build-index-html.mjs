#!/usr/bin/env node
/* ============================================================
   scripts/build-index-html.mjs
   ------------------------------------------------------------
   Builds the complete index.html landing page containing ALL 106
   interactive lessons across all 8 tracks, with live search filtering,
   progress tracking, and responsive cyber-aurora styling.
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
    num: 1,
    title: 'أساسيات الويب واللغة',
    subtitle: 'Web & JS Foundations (ES2026)',
    style: '--track-color: #F59E0B; --track-glow: rgba(245, 158, 11, 0.12); --track-shadow: rgba(245, 158, 11, 0.25); --track-gradient: linear-gradient(135deg, #F59E0B, #D97706); --track-icon-bg: rgba(245, 158, 11, 0.15); --track-icon-color: #FBBF24;'
  },
  react: {
    num: 2,
    title: 'ريآكت الحديثة',
    subtitle: 'React.js 19.2 Architecture',
    style: '--track-color: #38BDF8; --track-glow: rgba(56, 189, 248, 0.12); --track-shadow: rgba(56, 189, 248, 0.25); --track-gradient: linear-gradient(135deg, #0284C7, #0369A1); --track-icon-bg: rgba(56, 189, 248, 0.15); --track-icon-color: #38BDF8;'
  },
  nodejs: {
    num: 3,
    title: 'نود جي إس والبيئة',
    subtitle: 'Node.js 24 LTS Runtime',
    style: '--track-color: #84CC16; --track-glow: rgba(132, 204, 22, 0.12); --track-shadow: rgba(132, 204, 22, 0.25); --track-gradient: linear-gradient(135deg, #65A30D, #4D7C0F); --track-icon-bg: rgba(132, 204, 22, 0.15); --track-icon-color: #A3E635;'
  },
  express: {
    num: 4,
    title: 'إكسبريس وبناء الـ APIs',
    subtitle: 'Express.js 5.2 Server',
    style: '--track-color: #A1A1AA; --track-glow: rgba(161, 161, 170, 0.12); --track-shadow: rgba(161, 161, 170, 0.25); --track-gradient: linear-gradient(135deg, #71717A, #52525B); --track-icon-bg: rgba(161, 161, 170, 0.15); --track-icon-color: #E4E4E7;'
  },
  mongodb: {
    num: 5,
    title: 'مونجو وقواعد المستندات',
    subtitle: 'MongoDB 8.0 NoSQL Engine',
    style: '--track-color: #22C55E; --track-glow: rgba(34, 197, 94, 0.12); --track-shadow: rgba(34, 197, 94, 0.25); --track-gradient: linear-gradient(135deg, #16A34A, #15803D); --track-icon-bg: rgba(34, 197, 94, 0.15); --track-icon-color: #4ADE80;'
  },
  postgresql: {
    num: 6,
    title: 'بوستجرس والأنظمة العلائقية',
    subtitle: 'PostgreSQL 18.x Relational',
    style: '--track-color: #60A5FA; --track-glow: rgba(96, 165, 250, 0.12); --track-shadow: rgba(96, 165, 250, 0.25); --track-gradient: linear-gradient(135deg, #2563EB, #1D4ED8); --track-icon-bg: rgba(96, 165, 250, 0.15); --track-icon-color: #93C5FD;'
  },
  prisma: {
    num: 7,
    title: 'بريزما والتعامل الآمن',
    subtitle: 'Prisma 7.x Type-Safe ORM',
    style: '--track-color: #818CF8; --track-glow: rgba(129, 140, 248, 0.12); --track-shadow: rgba(129, 140, 248, 0.25); --track-gradient: linear-gradient(135deg, #6366F1, #4F46E5); --track-icon-bg: rgba(129, 140, 248, 0.15); --track-icon-color: #A5B4FC;'
  },
  architecture: {
    num: 8,
    title: 'المعمارية وتصميم النظم',
    subtitle: 'Full-Stack Architecture & Next.js',
    style: '--track-color: #C084FC; --track-glow: rgba(192, 132, 252, 0.12); --track-shadow: rgba(192, 132, 252, 0.25); --track-gradient: linear-gradient(135deg, #9333EA, #7E22CE); --track-icon-bg: rgba(192, 132, 252, 0.15); --track-icon-color: #E9D5FF;'
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
  console.log(`Track [${t}]: ${list.length} lessons`);
}
console.log(`\nTotal lessons cataloged: ${totalCount} / 106`);

// Render track cards HTML
function renderTrackCard(trackKey, lessons) {
  const meta = trackMetadata[trackKey];
  const icons = iconMap[trackKey] || ['fsa-icon-code'];

  const lessonsHtml = lessons.map((lesson, idx) => {
    const icon = icons[idx % icons.length];
    return `
            <a href="${lesson.url}" class="lesson-item" data-lesson-slug="${lesson.slug}" data-level="${lesson.level}">
              <div class="lesson-icon"><svg style="width:14px;height:14px;"><use href="assets/icons.svg#${icon}"></use></svg></div>
              <div class="lesson-text">
                <div class="lesson-name">${lesson.title}</div>
                <div class="lesson-desc">${lesson.subtitle}</div>
              </div>
              <span class="lesson-time-chip">${lesson.estMinutes}m</span>
              <svg class="lesson-arrow" style="width:12px;height:12px;"><use href="assets/icons.svg#fsa-icon-chevron-left"></use></svg>
            </a>`;
  }).join('');

  return `
        <!-- Track ${meta.num}: ${meta.title} -->
        <div class="track-card" style="${meta.style}" data-track-id="${trackKey}">
          <div class="track-header">
            <div class="track-number">${meta.num}</div>
            <div class="track-info">
              <div class="track-title">${meta.title}</div>
              <div class="track-subtitle">${meta.subtitle}</div>
            </div>
            <span class="track-badge-count">${lessons.length} درساً</span>
          </div>
          <div class="lessons-list">
            ${lessonsHtml}
          </div>
          <div class="track-card-footer">
            <a href="learn/${trackKey}/index.html" class="track-hub-link">
              <span>استعراض مسار ${meta.title} بالكامل ←</span>
            </a>
          </div>
        </div>`;
}

const allTracksHtml = Object.keys(lessonsByTrack)
  .map(trackKey => renderTrackCard(trackKey, lessonsByTrack[trackKey]))
  .join('\n');

const fullIndexHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FullStack Academy | أكاديمية الفول ستاك الحديثة (106 درساً تفاعلياً)</title>
  <meta name="description" content="تعلم هندسة الويب الشاملة (MERN & PERN Stack) بطريقة تفاعلية ومبسطة باللغة العربية مع 106 دروس متكاملة، محاكيات مباشرة وتشريح الكود">

  <!-- Core Tokens & Fonts -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/learning.css">

  <style>
    /* ============================================================
       STYLE-REFERENCE HERO & PARTICLES ARCHITECTURE
       ============================================================ */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #07070d;
      color: #e0e0e0;
      min-height: 100vh;
      overflow-x: hidden;
      font-family: var(--font-arabic);
    }

    /* Hero Container with Deep Radial Glow */
    .hero {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 24px 60px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(ellipse 120% 80% at 50% 0%, #0e1630 0%, #07070d 65%);
    }

    /* Floating Aurora Glow Blobs */
    .aurora {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0;
      animation: auroraIn 2s ease forwards;
      pointer-events: none;
    }

    .aurora-1 {
      width: 550px;
      height: 550px;
      top: -10%;
      left: -5%;
      background: rgba(59, 130, 246, 0.14);
      animation: auroraIn 2s ease forwards, auroraFloat1 20s ease-in-out infinite 2s;
    }

    .aurora-2 {
      width: 450px;
      height: 450px;
      bottom: 10%;
      right: -5%;
      background: rgba(139, 92, 246, 0.12);
      animation: auroraIn 2s ease forwards, auroraFloat2 18s ease-in-out infinite 2.5s;
    }

    .aurora-3 {
      width: 400px;
      height: 400px;
      top: 35%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(16, 185, 129, 0.08);
      animation: auroraIn 2s ease forwards, auroraFloat3 22s ease-in-out infinite 3s;
    }

    @keyframes auroraIn { to { opacity: 1; } }
    @keyframes auroraFloat1 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(40px, 30px); }
    }
    @keyframes auroraFloat2 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-30px, -40px); }
    }
    @keyframes auroraFloat3 {
      0%, 100% { transform: translateX(-50%) translate(0, 0); }
      50% { transform: translateX(-50%) translate(20px, -20px); }
    }

    /* Grid Overlay with Radial Fade */
    .hero::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 60px 60px;
      z-index: 0;
      mask-image: radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 80%);
      -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 80%);
      pointer-events: none;
    }

    /* Interactive Floating Particles Canvas */
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
      max-width: 1480px;
    }

    /* =================== TOP BAR NAV =================== */
    .fsa-nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      margin-bottom: 40px;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 100px;
    }

    .fsa-nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #fff;
      font-weight: 800;
      font-size: 1.1rem;
      font-family: var(--font-sans);
    }

    .fsa-nav-links {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .fsa-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-size: 0.85rem;
      text-decoration: none;
      transition: all 0.25s ease;
      cursor: pointer;
    }

    .fsa-nav-btn:hover {
      background: rgba(255, 255, 255, 0.09);
      border-color: rgba(255, 255, 255, 0.16);
      color: #fff;
      transform: translateY(-1px);
    }

    /* =================== TITLE SECTION =================== */
    .title-section {
      text-align: center;
      margin-bottom: 35px;
    }

    .title-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 18px;
      border-radius: 100px;
      background: rgba(59, 130, 246, 0.10);
      border: 1px solid rgba(59, 130, 246, 0.25);
      color: #60a5fa;
      font-size: 0.82rem;
      font-weight: 600;
      margin-bottom: 20px;
      opacity: 0;
      animation: fadeSlideUp 0.8s ease 0.2s forwards;
    }

    .title-badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #3b82f6;
      box-shadow: 0 0 8px #3b82f6;
      animation: fsa-status-pulse 2s infinite;
    }

    .title-section h1 {
      font-size: clamp(2.2rem, 4.5vw, 3.6rem);
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #ffffff 0%, #60a5fa 35%, #c084fc 70%, #ffffff 100%);
      background-size: 300% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientText 8s ease infinite, fadeSlideUp 0.8s ease 0.4s both;
    }

    @keyframes gradientText {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .title-section p {
      font-size: 1.15rem;
      color: #94a3b8;
      max-width: 720px;
      margin: 0 auto;
      line-height: 1.8;
      opacity: 0;
      animation: fadeSlideUp 0.8s ease 0.6s forwards;
    }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* =================== STATS BAR =================== */
    .stats-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 36px;
      flex-wrap: wrap;
      margin-bottom: 35px;
      opacity: 0;
      animation: fadeSlideUp 0.8s ease 0.8s forwards;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-family: var(--font-mono);
      font-size: 1.9rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa, #c084fc);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.2;
    }

    .stat-label {
      font-size: 0.82rem;
      color: #64748b;
      margin-top: 3px;
    }

    .stat-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.08);
    }

    /* Interactive Live Search Box */
    .curriculum-search-bar {
      width: 100%;
      max-width: 640px;
      margin: 0 auto 35px;
      position: relative;
    }

    .curriculum-search-input {
      width: 100%;
      padding: 14px 44px 14px 20px;
      border-radius: 100px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(59, 130, 246, 0.35);
      color: #fff;
      font-family: var(--font-arabic);
      font-size: 0.95rem;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .curriculum-search-input:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 25px rgba(59, 130, 246, 0.3);
      background: rgba(15, 23, 42, 0.95);
    }

    .curriculum-search-icon {
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: #60a5fa;
      pointer-events: none;
      width: 18px;
      height: 18px;
    }

    /* Quick Resume Box */
    .quick-resume-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 14px 24px;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 16px;
      margin-bottom: 40px;
      box-shadow: 0 0 30px -5px rgba(59, 130, 246, 0.15);
      flex-wrap: wrap;
    }

    .quick-resume-info {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .quick-resume-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }

    /* =================== TRACKS 8-GRID CONTAINER =================== */
    .tracks-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 22px;
      width: 100%;
    }

    @media (max-width: 1300px) {
      .tracks-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 680px) {
      .tracks-container {
        grid-template-columns: 1fr;
      }
    }

    /* =================== TRACK CARD =================== */
    .track-card {
      background: rgba(15, 15, 25, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.4s ease;
      opacity: 0;
      transform: translateY(40px);
      display: flex;
      flex-direction: column;
    }

    .track-card.visible {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .track-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 15%;
      right: 15%;
      height: 1px;
      border-radius: 1px;
      opacity: 0;
      transition: opacity 0.4s ease;
      background: linear-gradient(90deg, transparent, var(--track-color, #3B82F6), transparent);
    }

    .track-card:hover::before {
      opacity: 1;
    }

    .track-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: 0 20px 50px -15px var(--track-shadow, rgba(59, 130, 246, 0.25));
    }

    /* Track Header */
    .track-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
      z-index: 1;
    }

    .track-number {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.95rem;
      color: white;
      background: var(--track-gradient, linear-gradient(135deg, #3B82F6, #1D4ED8));
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .track-info {
      flex: 1;
      min-width: 0;
    }

    .track-title {
      font-size: 1rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-subtitle {
      font-size: 0.70rem;
      color: #64748b;
      font-weight: 500;
      font-family: var(--font-mono);
      direction: ltr;
      text-align: right;
    }

    .track-badge-count {
      padding: 3px 8px;
      border-radius: 100px;
      font-size: 0.68rem;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.06);
      color: var(--track-color, #60a5fa);
      border: 1px solid rgba(255, 255, 255, 0.08);
      white-space: nowrap;
    }

    /* Lessons Scrollable List */
    .lessons-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
      position: relative;
      z-index: 1;
      flex: 1;
      max-height: 480px;
      overflow-y: auto;
      padding-inline-end: 4px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
    }

    .lessons-list::-webkit-scrollbar {
      width: 4px;
    }
    .lessons-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }
    .lessons-list::-webkit-scrollbar-thumb:hover {
      background: var(--track-color, #60a5fa);
    }

    .lesson-item {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 10px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
      overflow: hidden;
    }

    .lesson-item:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.14);
      transform: translateX(-3px);
    }

    .lesson-icon {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      flex-shrink: 0;
      background: var(--track-icon-bg, rgba(59, 130, 246, 0.12));
      color: var(--track-icon-color, #60a5fa);
      transition: transform 0.3s ease;
    }

    .lesson-item:hover .lesson-icon {
      transform: scale(1.1) rotate(-4deg);
    }

    .lesson-text {
      flex: 1;
      min-width: 0;
    }

    .lesson-name {
      font-family: var(--font-sans);
      font-size: 0.78rem;
      font-weight: 600;
      color: #f1f5f9;
      direction: ltr;
      text-align: left;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.3s ease;
    }

    .lesson-item:hover .lesson-name {
      color: var(--track-color, #60a5fa);
    }

    .lesson-desc {
      font-family: var(--font-arabic);
      font-size: 0.67rem;
      color: #64748b;
      direction: rtl;
      text-align: right;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lesson-time-chip {
      font-size: 0.62rem;
      font-family: var(--font-mono);
      color: #475569;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.03);
      flex-shrink: 0;
    }

    .lesson-arrow {
      color: #334155;
      transition: transform 0.3s ease, color 0.3s ease;
      flex-shrink: 0;
    }

    .lesson-item:hover .lesson-arrow {
      transform: translateX(-3px);
      color: #94a3b8;
    }

    .track-card-footer {
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
    }

    .track-hub-link {
      font-size: 0.75rem;
      color: var(--track-color, #60a5fa);
      text-decoration: none;
      font-weight: 600;
      transition: opacity 0.25s ease;
    }

    .track-hub-link:hover {
      opacity: 0.8;
      text-decoration: underline;
    }

    /* Footer Note */
    .footer-note {
      text-align: center;
      margin-top: 50px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      color: #64748b;
      font-size: 0.85rem;
    }
  </style>
</head>

<body>
  <!-- Accessible Skip Link -->
  <a href="#main-content" class="fsa-skip-link">Skip to main content · الانتقال للمحتوى</a>

  <section class="hero" id="main-content">
    <!-- Aurora glow blobs -->
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>

    <!-- Floating Canvas Particles -->
    <canvas id="particles"></canvas>

    <div class="hero-content">

      <!-- Navigation Top Bar -->
      <nav class="fsa-nav-header">
        <a href="index.html" class="fsa-nav-brand">
          <svg style="width: 22px; height: 22px; color: var(--accent-primary);"><use href="assets/icons.svg#fsa-icon-code"></use></svg>
          <span>FullStack Academy</span>
        </a>

        <div class="fsa-nav-links">
          <button class="fsa-nav-btn" data-fsa-search-trigger>
            <svg style="width: 14px; height: 14px;"><use href="assets/icons.svg#fsa-icon-search"></use></svg>
            <span>بحث شامل</span>
            <kbd class="fsa-topbar__search-kbd">Ctrl K</kbd>
          </button>

          <a href="dashboard.html" class="fsa-nav-btn">
            <svg style="width: 14px; height: 14px;"><use href="assets/icons.svg#fsa-icon-flame"></use></svg>
            <span>لوحة المتابعة</span>
          </a>

          <a href="playground.html" class="fsa-nav-btn">
            <svg style="width: 14px; height: 14px;"><use href="assets/icons.svg#fsa-icon-terminal"></use></svg>
            <span>Playground</span>
          </a>

          <a href="reference/index.html" class="fsa-nav-btn">
            <svg style="width: 14px; height: 14px;"><use href="assets/icons.svg#fsa-icon-book"></use></svg>
            <span>المراجع</span>
          </a>

          <button id="themeToggleBtn" class="fsa-nav-btn" data-fsa-theme-toggle aria-label="Toggle Theme">
            <svg style="width: 14px; height: 14px;"><use href="assets/icons.svg#fsa-icon-sun"></use></svg>
          </button>
        </div>
      </nav>

      <!-- Title & Value Proposition -->
      <div class="title-section">
        <div class="title-badge">
          <span class="title-badge-dot"></span>
          <span>Zero-Build · Zero Dependencies · 100% Offline Platform · 106 Lessons</span>
        </div>

        <h1>FullStack Academy · الخوارزميات وهندسة الويب</h1>
        <p>
          تعلم هندسة الويب الشاملة (MERN &amp; PERN Stack) بطريقة تفاعلية ومبسطة باللغة العربية مع 106 دروس متكاملة، محاكيات مباشرة، تشريح الكود سطراً بسطر، وتمارين تنفيذ داخل المتصفح بدون أي تثبيت.
        </p>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-number">8</div>
          <div class="stat-label">مسارات متكاملة</div>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item">
          <div class="stat-number">106</div>
          <div class="stat-label">درساً تفاعلياً</div>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">مستقل بدون نت</div>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item">
          <div class="stat-number">0 ms</div>
          <div class="stat-label">إعداد بيئة العمل</div>
        </div>
      </div>

      <!-- Live Search Box Across All 106 Lessons -->
      <div class="curriculum-search-bar">
        <input type="text" id="curriculumLiveFilter" class="curriculum-search-input" placeholder="ابحث بين 106 دروس (مثال: useState, JWT, Docker, Redis, Prisma, BSON)..." aria-label="تصفية الدروس المباشرة">
        <svg class="curriculum-search-icon"><use href="assets/icons.svg#fsa-icon-search"></use></svg>
      </div>

      <!-- Quick Resume Box (Personalized from localStorage) -->
      <div class="quick-resume-box" id="quickResumeBox">
        <div class="quick-resume-info">
          <div class="quick-resume-icon">
            <svg style="width: 20px; height: 20px;"><use href="assets/icons.svg#fsa-icon-play"></use></svg>
          </div>
          <div>
            <div style="font-size: 0.78rem; color: #60a5fa; font-weight: 700;" id="resumeTrackLabel">المسار الموصى به: الأساسيات</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #fff;" id="resumeLessonTitle">How the Web Works: HTTP/3 &amp; DNS Lifecycle</div>
          </div>
        </div>

        <a href="learn/foundations/how-web-works.html" class="fsa-btn fsa-btn--primary fsa-btn--sm" id="resumeActionBtn">
          <span>ابدأ الآن &larr;</span>
        </a>
      </div>

      <!-- 8 Tracks Matrix Grid (All 106 Lessons) -->
      <div class="tracks-container" id="tracksGrid">
        ${allTracksHtml}
      </div>

      <!-- Footer Section -->
      <footer class="footer-note">
        <p>© 2026 FullStack Academy | 106 دروس تفاعلية تغطي MERN &amp; PostgreSQL بالكامل | صُممت كمعيار مفتوح ومستقل للتعليم البرمجي عالي الجودة باللغة العربية</p>
      </footer>

    </div>
  </section>

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
    // =================== FLOATING PARTICLES ===================
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
              ctx.lineTo(particles[j].x, particles[j].y);
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

    // =================== SCROLL REVEAL ===================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = Array.from(document.querySelectorAll('.track-card')).indexOf(card) * 90;
          setTimeout(() => card.classList.add('visible'), delay);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.track-card').forEach(card => observer.observe(card));

    // =================== LIVE SEARCH FILTER ===================
    const filterInput = document.getElementById('curriculumLiveFilter');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const lessonItems = document.querySelectorAll('.lesson-item');
        const trackCards = document.querySelectorAll('.track-card');

        lessonItems.forEach(item => {
          const text = (item.innerText || '').toLowerCase();
          const href = (item.getAttribute('href') || '').toLowerCase();
          const matches = !query || text.includes(query) || href.includes(query);
          item.style.display = matches ? 'flex' : 'none';
        });

        // Hide track card if zero lessons match
        trackCards.forEach(card => {
          const visibleLessons = card.querySelectorAll('.lesson-item:not([style*="display: none"])');
          card.style.display = (visibleLessons.length > 0) ? 'flex' : 'none';
        });
      });
    }

    // =================== DYNAMIC RESUME FROM LOCALSTORAGE ===================
    document.addEventListener('DOMContentLoaded', () => {
      if (window.FSA && window.FSA.progress && window.FSA.curriculum) {
        const store = window.FSA.progress.getStore();
        const curriculum = window.FSA.curriculum;
        
        const completedCount = Object.keys(store.lessons || {}).filter(k => store.lessons[k].status === 'completed').length;
        const nextLesson = curriculum.flatList.find(l => !store.lessons[l.slug] || store.lessons[l.slug].status !== 'completed');

        if (nextLesson && completedCount > 0) {
          const trackLabel = document.getElementById('resumeTrackLabel');
          const title = document.getElementById('resumeLessonTitle');
          const btn = document.getElementById('resumeActionBtn');

          if (trackLabel) trackLabel.textContent = \`متابعة الدراسة (\${completedCount} من 106 دروس مكتملة)\`;
          if (title) title.textContent = nextLesson.title;
          if (btn) {
            btn.href = nextLesson.url;
            btn.querySelector('span').textContent = 'أكمل الدرس ←';
          }
        }
      }
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'index.html'), fullIndexHtml, 'utf-8');
console.log('✅ Generated index.html with all 106 lessons successfully!');
