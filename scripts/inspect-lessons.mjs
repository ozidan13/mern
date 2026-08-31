import fs from 'node:fs';
import path from 'node:path';

const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html') && f !== 'index.html') files.push(p);
  }
}
walk('learn');
console.log(`Found ${files.length} lesson files.`);

let validCount = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf-8');
  const track = html.match(/<meta name="fsa-track" content="([^"]+)"/)?.[1];
  const slug = html.match(/<meta name="fsa-lesson" content="([^"]+)"/)?.[1];
  const level = html.match(/<meta name="fsa-level" content="([^"]+)"/)?.[1];
  const order = html.match(/<meta name="fsa-order" content="([^"]+)"/)?.[1];
  const title = html.match(/<meta name="fsa-title" content="([^"]+)"/)?.[1];
  const subtitle = html.match(/<p class="fsa-subtitle fsa-ar"[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim() || '';
  if (track && slug && title) {
    validCount++;
  }
}
console.log(`Successfully extracted metadata for ${validCount} lessons.`);
