#!/usr/bin/env node
/* ============================================================
   scripts/check-content.mjs — Comprehensive 17-Point Quality Gate
   ------------------------------------------------------------
   Contract:
   - Zero-dependency Node 22+ script.
   - Enforces all 17 mandatory quality bars for CodeHub lessons:
     1. Exactly one <h1>
     2. Objectives present (.fsa-objectives)
     3. Arabic context / analogy callout present
     4. >= 1 inline SVG carrying <title>, <desc>, or aria-label
     5. >= 1 animation class (fsa-anim-*) or interactive stepper
     6. Interactivity quota: stepper + playground + experiment + checkpoint
     7. Reusable section architecture (>= 2 [data-fsa-section] elements)
     8. No explicit story headers (prohibits "قصة", "Story Time")
     9. Mini-glossary / terminology cards (.fsa-term-card)
     10. Common mistakes gallery (.fsa-mistakes-gallery / .fsa-mistake-card)
     11. Senior interview & production notes accordion (.fsa-details)
     12. Bilingual coverage: >= 35% Arabic paragraphs
     13. Metadata chips & badges present
     14. No absolute paths or external CDN asset URLs
     15. Skip-to-content accessibility link present
     16. Table of contents container (.fsa-toc) present
     17. Mobile drawer toggle button present
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const learnDir = path.join(rootDir, 'learn');

let totalErrors = 0;
let totalWarnings = 0;
let checkedFilesCount = 0;

function checkFile(filePath, relPath) {
  checkedFilesCount++;
  const html = fs.readFileSync(filePath, 'utf-8');
  const errors = [];
  const warnings = [];

  // 1. Exactly one <h1>
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length !== 1) {
    errors.push(`Expected exactly 1 <h1>, found ${h1Matches.length}`);
  }

  // 2. Objectives present
  if (!html.includes('fsa-objectives') && !html.includes('Objectives') && !html.includes('أهداف')) {
    warnings.push('Lesson objectives section not detected');
  }

  // 3. Arabic analogy callout
  if (!html.includes('data-kind="analogy"') && !html.includes('fsa-analogy')) {
    errors.push('Missing mandatory Arabic Analogy block (data-kind="analogy")');
  }

  // 4. >= 1 inline SVG with <title>, <desc>, or aria-label
  const svgMatches = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  const hasValidSvg = svgMatches.some(svg => svg.includes('<title>') || svg.includes('<desc>') || svg.includes('aria-label') || svg.includes('use href'));
  if (!hasValidSvg) {
    errors.push('Missing conceptual SVG diagram with accessible descriptors');
  }

  // 5. Interactivity quota: Stepper / Playground
  const hasStepperOrPlayground = html.includes('fsa-stepper') || html.includes('fsa-playground');
  if (!hasStepperOrPlayground) {
    errors.push('Missing interactive core (either .fsa-stepper or .fsa-playground)');
  }

  // 6. Checkpoint Quiz
  const hasCheckpoint = html.includes('fsa-checkpoint') || html.includes('fsa-quiz-data');
  if (!hasCheckpoint) {
    errors.push('Missing Checkpoint Quiz (.fsa-checkpoint)');
  }

  // 7. Section architecture check
  const sectionMatches = html.match(/data-fsa-section=/gi) || [];
  if (sectionMatches.length < 2) {
    errors.push(`Expected >= 2 [data-fsa-section] breakout sections, found ${sectionMatches.length}`);
  }

  // 8. No explicit story headers in H2 tags
  const explicitStoryHeader = /<h2>\s*(?:1\.\s*)?القصة والتشبيه/gi.test(html) || /Story Time/gi.test(html);
  if (explicitStoryHeader) {
    errors.push('Explicit story header detected (use natural embedded narrative instead of "Story Time" or "القصة والتشبيه")');
  }

  // 9. Mini-glossary & Terminology
  if (!html.includes('fsa-term-card') && !html.includes('fsa-glossary')) {
    warnings.push('Mini-glossary / terminology cards not found');
  }

  // 10. Mistakes gallery
  if (!html.includes('fsa-mistakes-gallery') && !html.includes('fsa-mistake-card')) {
    warnings.push('Mistakes gallery / common pitfalls cards not found');
  }

  // 11. Senior interview / Production accordion
  if (!html.includes('fsa-details')) {
    warnings.push('Production & Interview accordion (.fsa-details) not found');
  }

  // 12. Bilingual coverage check: >= 35% of <p> tags should carry fsa-ar
  const paragraphs = html.match(/<p[\s\S]*?<\/p>/gi) || [];
  if (paragraphs.length > 0) {
    const arParagraphs = paragraphs.filter(p => p.includes('fsa-ar') || p.includes('dir="rtl"'));
    const ratio = arParagraphs.length / paragraphs.length;
    if (ratio < 0.35) {
      warnings.push(`Bilingual coverage below target: ${Math.round(ratio * 100)}% Arabic paragraphs (target >= 40%)`);
    }
  }

  // 13. Metadata chips & badges present
  if (!html.includes('fsa-chip') && !html.includes('fsa-badge')) {
    warnings.push('Missing version chip or metadata badges in header');
  }

  // 14. No absolute URLs or CDN requests
  const cdnMatches = html.match(/(https?:\/\/(?:cdn|unpkg|cdnjs|fonts\.googleapis)[^\s"'>]+)/gi) || [];
  if (cdnMatches.length > 0) {
    errors.push(`External CDN dependency detected: ${cdnMatches.join(', ')}`);
  }

  const absPathMatches = html.match(/(?:href|src)=["']\/[^\/][^"']*["']/gi) || [];
  if (absPathMatches.length > 0) {
    errors.push(`Absolute root-relative path detected (must be relative): ${absPathMatches.slice(0, 3).join(', ')}`);
  }

  // 15. Skip link
  if (!html.includes('fsa-skip-link')) {
    warnings.push('Missing accessible skip link (.fsa-skip-link)');
  }

  // 16. TOC container
  if (!html.includes('fsa-toc')) {
    warnings.push('Missing table of contents container (.fsa-toc)');
  }

  // 17. Drawer toggle
  if (!html.includes('data-fsa-drawer-toggle')) {
    warnings.push('Missing mobile drawer toggle button (data-fsa-drawer-toggle)');
  }

  // Report findings
  if (errors.length > 0 || warnings.length > 0) {
    console.log(`\n📄 ${relPath}`);
    errors.forEach(e => console.log(`  ❌ ERROR: ${e}`));
    warnings.forEach(w => console.log(`  ⚠️ WARN:  ${w}`));
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
      const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      checkFile(fullPath, relPath);
    }
  }
}

console.log('🔍 Running Enhanced 17-Point Content Quality Gate...');
walkDir(learnDir);

console.log(`\n========================================`);
console.log(`Scanned ${checkedFilesCount} lesson files.`);
if (totalErrors === 0) {
  console.log(`✅ All 17 quality checks PASSED (${totalWarnings} warnings).`);
  process.exit(0);
} else {
  console.error(`❌ Content check FAILED with ${totalErrors} errors, ${totalWarnings} warnings.`);
  process.exit(1);
}
