#!/usr/bin/env node
/* ============================================================
   scripts/gen-curriculum.mjs — scans learn/**.html → data/curriculum.js
   ------------------------------------------------------------
   Contract:
   - Zero dependencies (Node 22+ standard library only).
   - Scans all HTML files in learn/ subdirectories.
   - Extracts <meta name="fsa-*"> tags.
   - Builds ordered tree, level clusters, and prev/next links.
   - Emits clean window.FSA.curriculum to data/curriculum.js.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const learnDir = path.join(rootDir, 'learn');
const outputFile = path.join(rootDir, 'data', 'curriculum.js');

const TRACKS_ORDER = [
  'foundations',
  'react',
  'nodejs',
  'express',
  'mongodb',
  'postgresql',
  'prisma',
  'architecture'
];

const TRACK_METADATA = {
  foundations: { title: 'Web & JavaScript Foundations', icon: 'fsa-icon-code', color: 'var(--track-found)' },
  react: { title: 'React.js 19.2', icon: 'fsa-icon-terminal', color: 'var(--track-react)' },
  nodejs: { title: 'Node.js 24 LTS', icon: 'fsa-icon-terminal', color: 'var(--track-node)' },
  express: { title: 'Express.js 5.2', icon: 'fsa-icon-terminal', color: 'var(--track-express)' },
  mongodb: { title: 'MongoDB 8.0', icon: 'fsa-icon-book', color: 'var(--track-mongo)' },
  postgresql: { title: 'PostgreSQL 18.x', icon: 'fsa-icon-book', color: 'var(--track-pg)' },
  prisma: { title: 'Prisma 7.x', icon: 'fsa-icon-code', color: 'var(--track-prisma)' },
  architecture: { title: 'Full-Stack Architecture & Next.js', icon: 'fsa-icon-lightbulb', color: 'var(--track-arch)' }
};

function extractMeta(html) {
  const get = (name) => {
    const regex = new RegExp(`<meta\\s+name=["']fsa-${name}["']\\s+content=["'](.*?)["']`, 'i');
    const match = html.match(regex);
    return match ? match[1] : null;
  };

  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);

  return {
    track: get('track'),
    lesson: get('lesson'),
    title: get('title') || (h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '') || (titleMatch ? titleMatch[1].split('·')[0].trim() : ''),
    level: parseInt(get('level') || '1', 10),
    order: parseInt(get('order') || '1', 10),
    estMinutes: parseInt(get('est-minutes') || '20', 10),
    teachesVersion: get('teaches-version'),
    patternLabel: get('pattern-label'),
    prereqs: (get('prereqs') || '').split(',').map(s => s.trim()).filter(Boolean)
  };
}

function scanCurriculum() {
  const lessons = [];
  const slugsSeen = new Set();

  if (!fs.existsSync(learnDir)) {
    fs.mkdirSync(learnDir, { recursive: true });
  }

  const trackDirs = fs.readdirSync(learnDir).filter(f => {
    return fs.statSync(path.join(learnDir, f)).isDirectory();
  });

  for (const track of trackDirs) {
    const trackPath = path.join(learnDir, track);
    const files = fs.readdirSync(trackPath).filter(f => f.endsWith('.html') && f !== 'index.html');

    for (const file of files) {
      const filePath = path.join(trackPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const meta = extractMeta(content);

      if (!meta.track) meta.track = track;
      if (!meta.lesson) meta.lesson = file.replace('.html', '');

      const slug = `${meta.track}/${meta.lesson}`;
      if (slugsSeen.has(slug)) {
        console.error(`❌ Duplicate lesson slug detected: ${slug}`);
        process.exit(1);
      }
      slugsSeen.add(slug);

      lessons.push({
        ...meta,
        url: `learn/${meta.track}/${file}`,
        slug: slug
      });
    }
  }

  // Sort lessons according to TRACKS_ORDER, level, order
  lessons.sort((a, b) => {
    const trackIdxA = TRACKS_ORDER.indexOf(a.track);
    const trackIdxB = TRACKS_ORDER.indexOf(b.track);
    if (trackIdxA !== trackIdxB) return (trackIdxA === -1 ? 999 : trackIdxA) - (trackIdxB === -1 ? 999 : trackIdxB);
    if (a.level !== b.level) return a.level - b.level;
    return a.order - b.order;
  });

  // Calculate prev/next
  for (let i = 0; i < lessons.length; i++) {
    lessons[i].prev = i > 0 ? { slug: lessons[i - 1].slug, title: lessons[i - 1].title, url: lessons[i - 1].url } : null;
    lessons[i].next = i < lessons.length - 1 ? { slug: lessons[i + 1].slug, title: lessons[i + 1].title, url: lessons[i + 1].url } : null;
  }

  // Group by tracks
  const tracks = TRACKS_ORDER.map(trackId => {
    const trackLessons = lessons.filter(l => l.track === trackId);
    const levelsMap = {};
    trackLessons.forEach(l => {
      if (!levelsMap[l.level]) levelsMap[l.level] = [];
      levelsMap[l.level].push(l);
    });

    return {
      id: trackId,
      ...(TRACK_METADATA[trackId] || { title: trackId, icon: 'fsa-icon-book', color: 'var(--accent-primary)' }),
      totalLessons: trackLessons.length,
      levels: Object.keys(levelsMap).sort((a, b) => Number(a) - Number(b)).map(lvl => ({
        level: Number(lvl),
        lessons: levelsMap[lvl]
      }))
    };
  });

  const curriculumData = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalLessons: lessons.length,
    tracks: tracks,
    flatList: lessons.map(l => ({
      slug: l.slug,
      track: l.track,
      lesson: l.lesson,
      title: l.title,
      level: l.level,
      order: l.order,
      url: l.url,
      prev: l.prev,
      next: l.next
    }))
  };

  const outputCode = `/* ============================================================
   data/curriculum.js — Generated Curriculum Tree & Flat Index
   ------------------------------------------------------------
   Auto-generated by scripts/gen-curriculum.mjs. Do not edit directly.
   ============================================================ */
(function () {
  'use strict';

  window.FSA = window.FSA || {};
  window.FSA.curriculum = ${JSON.stringify(curriculumData, null, 2)};
})();
`;

  fs.writeFileSync(outputFile, outputCode, 'utf-8');
  console.log(`✅ Successfully generated data/curriculum.js (${lessons.length} lessons indexed)`);
}

scanCurriculum();
