#!/usr/bin/env node
/* ============================================================
   scripts/new-lesson.mjs — Lesson Scaffolder CLI
   ------------------------------------------------------------
   Usage:
   node scripts/new-lesson.mjs <track> <lesson-slug> "<Title>" [level] [order] [estMinutes]
   
   Example:
   node scripts/new-lesson.mjs react use-state "State with useState" 1 1 25
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const [,, track, slug, titleArg, levelArg, orderArg, minutesArg] = process.argv;

if (!track || !slug) {
  console.log(`
Usage: node scripts/new-lesson.mjs <track> <lesson-slug> "<Title>" [level] [order] [estMinutes]

Arguments:
  track         Target track (foundations, react, nodejs, express, mongodb, postgresql, prisma, architecture)
  lesson-slug   Kebab-case filename slug (e.g. use-state)
  title         Human readable title (e.g. "State with useState")
  level         Track level 1-4 (default: 1)
  order         Lesson sequence inside level (default: 1)
  estMinutes    Estimated reading/practice time (default: 25)
`);
  process.exit(1);
}

const title = titleArg || slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
const level = levelArg || '1';
const order = orderArg || '1';
const estMinutes = minutesArg || '25';

const targetDir = path.join(rootDir, 'learn', track);
const targetFile = path.join(targetDir, `${slug}.html`);
const templateFile = path.join(rootDir, 'templates', 'lesson-template.html');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(targetFile)) {
  console.error(`❌ File already exists: ${targetFile}`);
  process.exit(1);
}

let content = '';
if (fs.existsSync(templateFile)) {
  content = fs.readFileSync(templateFile, 'utf-8');
} else {
  // Fallback minimal template if template file is being built
  content = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="fsa-track" content="{{TRACK}}">
  <meta name="fsa-lesson" content="{{SLUG}}">
  <meta name="fsa-level" content="{{LEVEL}}">
  <meta name="fsa-order" content="{{ORDER}}">
  <meta name="fsa-title" content="{{TITLE}}">
  <meta name="fsa-est-minutes" content="{{EST_MINUTES}}">
  <title>{{TITLE}} · FullStack Academy</title>
  <link rel="stylesheet" href="../../css/tokens.css">
  <link rel="stylesheet" href="../../css/base.css">
  <link rel="stylesheet" href="../../css/components.css">
  <link rel="stylesheet" href="../../css/layout.css">
  <link rel="stylesheet" href="../../css/learning.css">
</head>
<body>
  <div class="fsa-shell">
    <main class="fsa-main">
      <div class="fsa-article">
        <h1>{{TITLE}}</h1>
      </div>
    </main>
  </div>
</body>
</html>`;
}

// Replace placeholders
const populated = content
  .replaceAll('{{TRACK}}', track)
  .replaceAll('{{SLUG}}', slug)
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{LEVEL}}', level)
  .replaceAll('{{ORDER}}', order)
  .replaceAll('{{EST_MINUTES}}', estMinutes);

fs.writeFileSync(targetFile, populated, 'utf-8');
console.log(`✅ Created lesson file: learn/${track}/${slug}.html`);

// Re-generate curriculum index
try {
  execSync(`node "${path.join(__dirname, 'gen-curriculum.mjs')}"`, { stdio: 'inherit' });
} catch (e) {
  console.warn('⚠️ Could not run gen-curriculum automatically:', e.message);
}
