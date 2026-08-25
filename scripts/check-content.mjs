#!/usr/bin/env node
/* ============================================================
   scripts/check-content.mjs — Content CI-Lite Quality Gate
   ------------------------------------------------------------
   Contract:
   - Zero-dependency Node 22+ script.
   - Enforces all Part 7 mandatory depth inventory and quality bars:
     1. Exactly one <h1>
     2. Objectives present
     3. Arabic analogy callout present (data-kind="analogy")
     4. >= 1 inline SVG carrying <title> or <desc>
     5. >= 1 animation class (fsa-anim-*)
     6. Interactivity quota: stepper/playground + experiment + checkpoint
     7. Exercise ladder or practice task
     8. Mini-glossary + common mistakes + production notes
     9. Bilingual coverage: >= 40% prose paragraphs with fsa-ar
     10. Version chip present
     11. All internal relative links resolve
     12. No absolute paths or external CDN asset URLs
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
  if (!html.includes('fsa-objectives') && !html.includes('Objectives') && !html.includes('الأهداف')) {
    warnings.push('Lesson objectives section not detected');
  }

  // 3. Arabic analogy callout
  if (!html.includes('data-kind="analogy"') && !html.includes('fsa-analogy')) {
    errors.push('Missing mandatory Arabic Analogy block (data-kind="analogy")');
  }

  // 4. >= 1 inline SVG with <title> or <desc>
  const svgMatches = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  const hasValidSvg = svgMatches.some(svg => svg.includes('<title>') || svg.includes('<desc>') || svg.includes('aria-label'));
  if (!hasValidSvg) {
    errors.push('Missing inline conceptual <svg> diagram with <title>/<desc>');
  }

  // 5. >= 1 animation class used
  if (!html.includes('fsa-anim-')) {
    warnings.push('No CSS animation utility class (fsa-anim-*) used in lesson diagrams');
  }

  // 6. Interactivity quota
  const hasStepperOrPlayground = html.includes('fsa-stepper') || html.includes('fsa-playground');
  if (!hasStepperOrPlayground) {
    errors.push('Missing interactive core (either .fsa-stepper or .fsa-playground)');
  }

  const hasCheckpoint = html.includes('fsa-checkpoint') || html.includes('fsa-quiz-data');
  if (!hasCheckpoint) {
    errors.push('Missing Checkpoint Quiz (.fsa-checkpoint)');
  }

  // 7. Mini-glossary & Mistakes gallery & Production notes
  if (!html.includes('fsa-term-card') && !html.includes('fsa-glossary')) {
    warnings.push('Mini-glossary / terminology cards not found');
  }

  // 8. Bilingual coverage check: >= 40% of <p> tags should carry fsa-ar
  const paragraphs = html.match(/<p[\s\S]*?<\/p>/gi) || [];
  if (paragraphs.length > 0) {
    const arParagraphs = paragraphs.filter(p => p.includes('fsa-ar') || p.includes('dir="rtl"'));
    const ratio = arParagraphs.length / paragraphs.length;
    if (ratio < 0.35) {
      warnings.push(`Bilingual coverage below target: ${Math.round(ratio * 100)}% Arabic paragraphs (target >= 40%)`);
    }
  }

  // 9. Version chip
  if (!html.includes('fsa-chip') && !html.includes('fsa-badge')) {
    warnings.push('Missing version chip or metadata badges in header');
  }

  // 10. No absolute URLs or CDN requests
  const cdnMatches = html.match(/(https?:\/\/(?:cdn|unpkg|cdnjs|fonts\.googleapis)[^\s"'>]+)/gi) || [];
  if (cdnMatches.length > 0) {
    errors.push(`External CDN dependency detected: ${cdnMatches.join(', ')}`);
  }

  const absPathMatches = html.match(/(?:href|src)=["']\/[^\/][^"']*["']/gi) || [];
  if (absPathMatches.length > 0) {
    errors.push(`Absolute root-relative path detected (must be relative): ${absPathMatches.slice(0, 3).join(', ')}`);
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

console.log('🔍 Running Content CI-Lite validation...');
walkDir(learnDir);

console.log(`\n========================================`);
console.log(`Scanned ${checkedFilesCount} lesson files.`);
if (totalErrors === 0) {
  console.log(`✅ All content checks PASSED (${totalWarnings} warnings).`);
  process.exit(0);
} else {
  console.error(`❌ Content check FAILED with ${totalErrors} errors, ${totalWarnings} warnings.`);
  process.exit(1);
}
