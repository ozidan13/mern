import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const learnDir = path.join(rootDir, 'learn');

const fontBlock = `  <!-- Google Fonts: Cairo, Inter, Fira Code -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Fira+Code:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">`;

function addFonts(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      addFonts(full);
    } else if (e.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf-8');
      if (!content.includes('fonts.googleapis.com')) {
        if (content.includes('</head>')) {
          content = content.replace('</head>', `${fontBlock}\n</head>`);
          fs.writeFileSync(full, content, 'utf-8');
          console.log('Added Google Fonts to:', path.relative(learnDir, full));
        }
      }
    }
  }
}

addFonts(learnDir);
console.log('✅ Google Fonts injected across all lessons.');
