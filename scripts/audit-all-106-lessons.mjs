import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('.');
const curriculumPath = path.join(rootDir, 'data', 'curriculum.js');

const tracks = ['foundations', 'react', 'nodejs', 'express', 'mongodb', 'postgresql', 'prisma', 'architecture'];
const trackStats = {};

let totalLessonsFound = 0;
let totalMissing = 0;

for (const track of tracks) {
  const trackDir = path.join(rootDir, 'learn', track);
  const files = fs.existsSync(trackDir)
    ? fs.readdirSync(trackDir).filter(f => f.endsWith('.html') && f !== 'index.html')
    : [];

  trackStats[track] = {
    totalFiles: files.length,
    lessons: []
  };

  for (const file of files) {
    const fullPath = path.join(trackDir, file);
    const html = fs.readFileSync(fullPath, 'utf-8');
    const size = fs.statSync(fullPath).size;

    const slug = html.match(/<meta name="fsa-lesson" content="([^"]+)"/)?.[1] || file.replace('.html', '');
    const title = html.match(/<meta name="fsa-title" content="([^"]+)"/)?.[1] || '';
    const level = html.match(/<meta name="fsa-level" content="([^"]+)"/)?.[1] || '1';
    const order = html.match(/<meta name="fsa-order" content="([^"]+)"/)?.[1] || '1';
    const hasPlayground = html.includes('fsa-playground');
    const hasCheckpoint = html.includes('fsa-checkpoint');
    const hasStepper = html.includes('fsa-stepper') || html.includes('fsa-diagram');
    const hasMistakes = html.includes('fsa-mistakes-gallery') || html.includes('fsa-mistake-card');
    const hasInterview = html.includes('fsa-details');
    const hasSections = (html.match(/data-fsa-section=/g) || []).length;

    totalLessonsFound++;

    trackStats[track].lessons.push({
      file,
      slug,
      title,
      level,
      order,
      sizeKb: Math.round(size / 1024),
      hasPlayground,
      hasCheckpoint,
      hasStepper,
      hasMistakes,
      hasInterview,
      sectionsCount: hasSections
    });
  }
}

console.log('===============================================================');
console.log(`TOTAL LESSONS FOUND ON DISK: ${totalLessonsFound} / 106`);
console.log('===============================================================');
for (const track of tracks) {
  console.log(`Track [${track}]: ${trackStats[track].totalFiles} lessons verified`);
}
