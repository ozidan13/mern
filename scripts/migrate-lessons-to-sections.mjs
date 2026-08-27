#!/usr/bin/env node
/* ============================================================
   scripts/migrate-lessons-to-sections.mjs
   ------------------------------------------------------------
   Migrates all 18 existing lessons to the new section-based
   interactive experience architecture.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const learnDir = path.join(rootDir, 'learn');

function migrateFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf-8');

  // 1. Ensure sections.js script tag is included
  if (!html.includes('sections.js')) {
    html = html.replace(
      /(<script src="[^"]*search\.js"><\/script>)/,
      '<script src="../../js/sections.js"></script>\n  $1'
    );
  }

  // 2. Remove explicit story numbers/labels from H2 in #story
  html = html.replace(
    /<h2>\s*(?:1\.\s*)?القصة والتشبيه الواقعي[^<]*<\/h2>/gi,
    '<h2>السياق والمشكلة الهندسية الواقعية</h2>'
  );

  // 3. Upgrade sections to fsa-section wrappers with data-fsa-section attributes
  // #story
  html = html.replace(
    /<section id="story"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="concept" data-fsa-section-label="السياق والمشكلة" id="story">'
  );

  // #mechanics
  html = html.replace(
    /<section id="mechanics"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="concept" data-fsa-section-label="خطوات التنفيذ" id="mechanics">'
  );

  // #see
  html = html.replace(
    /<section id="see"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="concept" data-fsa-section-label="المحاكي البصري" id="see">'
  );

  // #try
  html = html.replace(
    /<section id="try"[^>]*>/gi,
    '<section class="fsa-section fsa-section--playground" data-fsa-section="playground" data-fsa-section-label="محرر التجارب" id="try">'
  );

  // #anatomy
  html = html.replace(
    /<section id="anatomy"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="concept" data-fsa-section-label="تشريح الكود" id="anatomy">'
  );

  // #deep-dive
  html = html.replace(
    /<section id="deep-dive"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="concept" data-fsa-section-label="تحليل الأداء" id="deep-dive">'
  );

  // #practice
  html = html.replace(
    /<section id="practice"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="comparison" data-fsa-section-label="أخطاء شائعة" id="practice">'
  );

  // #prove
  html = html.replace(
    /<section id="prove"[^>]*>/gi,
    '<section class="fsa-section fsa-section--immersive" data-fsa-section="challenge" data-fsa-section-label="اختبار الإتقان" id="prove">'
  );

  // #production
  html = html.replace(
    /<section id="production"[^>]*>/gi,
    '<section class="fsa-section fsa-section--contained" data-fsa-section="recap" data-fsa-section-label="في بيئة العمل" id="production">'
  );

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Migrated: ${path.relative(rootDir, filePath).replace(/\\/g, '/')}`);
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
      migrateFile(fullPath);
    }
  }
}

console.log('🚀 Migrating all 18 lessons to section-based architecture...');
walkDir(learnDir);
console.log('🎉 Migration complete!');
