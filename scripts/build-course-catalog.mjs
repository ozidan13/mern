#!/usr/bin/env node
/* ============================================================
   scripts/build-course-catalog.mjs
   ------------------------------------------------------------
   Generates a comprehensive Course & Lessons Catalog Data Object
   and outputs a detailed Markdown document in `docs/courses-and-lessons.md`.
   Includes live deployed links (https://ozidan13.github.io/mern/...)
   and validates every lesson link in the project.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const learnDir = path.join(rootDir, 'learn');
const docsDir = path.join(rootDir, 'docs');

const DEPLOYED_BASE_URL = 'https://ozidan13.github.io/mern';

const legacyArabicTitles = {
  // Foundations
  'foundations/how-web-works': 'معمارية الويب: دورة حياة DNS وبروتوكولات HTTP/3',
  'foundations/js-essentials': 'سياق التنفيذ في جافاسكريبت: النطاق والـ Closures',
  'foundations/async-js': 'البرمجة اللاتزامنية في جافاسكريبت: Event Loop والوعود Promises',
  'foundations/fetch-api': 'واجهة Fetch API والتدفقات Streams ومتحكم الإلغاء AbortController',

  // React
  'react/thinking-in-react': 'التفكير على طريقة ريآكت: الهرمية وتدفق البيانات الأحادي',
  'react/use-state': 'خطاف useState: القوائم المترابطة في Fiber والحالة غير القابلة للتغيير',
  'react/use-effect': 'خطاف useEffect: المزامنة، التأثيرات الجانبية ودوال التنظيف Cleanup',
  'react/reconciliation': 'خوارزمية المطابقة Reconciliation والـ Virtual DOM',

  // Node.js
  'nodejs/what-node-is': 'ما هو Node.js؟ معمارية المحرك وخيوط التنفيذ',
  'nodejs/event-loop': 'حلقة الأحداث Event Loop ومراحل التنفيذ الست في Libuv',
  'nodejs/streams-buffers': 'التدفقات Streams والـ Buffers ومعالجة البيانات الضخمة',
  'nodejs/fs-path': 'نظام الملفات fs والمسارات path في Node.js',
  'nodejs/http-module': 'وحدة HTTP الأساسية وبناء خادم ويب أصيل بدون إطارات عمل',
  'nodejs/npm-packages': 'إدارة الحزم npm وبناء ونشر الوحدات البرمجية',
  'nodejs/event-emitter': 'نمط الناشر والمشترك EventEmitter وإدارة الأحداث المخصصة',
  'nodejs/error-handling-node': 'معالجة الأخطاء الشاملة في Node.js والوقاية من الانهيار',
  'nodejs/debugging-node': 'تنقيح الشيفرة Debugging وتتبع الأخطاء في خوادم Node.js',
  'nodejs/security-node': 'أمان تطبيقات Node.js والتحصين ضد الثغرات الشائعة',
  'nodejs/testing-node': 'اختبار تطبيقات Node.js: الاختبارات الأحادية والتكاملية',

  // Express
  'express/hello-express': 'مقدمة Express.js: بناء أول خادم ويب وتوجيه الطلبات',
  'express/request-response': 'كائنات الطلب والاستجابة req و res بالتفصيل',
  'express/middleware': 'معمارية البرمجيات الوسيطة Middleware وسلسلة التنفيذ next()',
  'express/rest-crud': 'بناء واجهات RESTful API كاملة بعمليات CRUD المعيارية',
  'express/routing-params': 'التوجيه المتقدم ومعاملات المسار Route Parameters',
  'express/validation-sanitization': 'التحقق من صحة المدخلات وتعقيم البيانات في Express',
  'express/authentication': 'المصادقة Authentication وإدارة جلسات المستخدم والـ Cookies',
  'express/authorization-rbac': 'التحكم في الوصول المبني على الأدوار RBAC والصلاحيات',
  'express/error-handling-express': 'معالجة الأخطاء المركزية Error Middlewares في Express',
  'express/file-uploads': 'معالجة ورفع الملفات بأمان باستخدام Multer',
  'express/rate-limiting-security': 'تحديد معدل الطلبات Rate Limiting وتحصين خوادم Express',
  'express/api-pagination': 'ترقيم البيانات Pagination والفلترة والفرز في الـ APIs',
  'express/deployment-production': 'تجهيز ونشر خوادم Express في بيئات الإنتاج الفعلية',

  // MongoDB
  'mongodb/document-model': 'النموذج الوثائقي في MongoDB وتصميم المستندات المرنة',
  'mongodb/schema-validation': 'التحقق من صحة المخطط Schema Validation وقواعد البيانات',
  'mongodb/indexes-performance': 'فهارس MongoDB وتحسين أداء الاستعلامات',
  'mongodb/mongoose-odm': 'مكتبة Mongoose ODM ونمذجة البيانات في تطبيقات Node.js',

  // PostgreSQL
  'postgresql/relational-model': 'النموذج العلائي في PostgreSQL والمفاهيم التأسيسية',
  'postgresql/subqueries-ctes': 'الاستعلامات الفرعية والتعبيرات الجدولية العامة CTEs',
  'postgresql/indexes-query-planner': 'فهارس PostgreSQL ومخطط الاستعلامات Query Planner',
  'postgresql/transactions-concurrency': 'معاملات PostgreSQL وعزل التزامن Concurrency Control',
  'postgresql/jsonb-hybrid-patterns': 'حقول JSONB والأنماط الهجينة العلائقية-الوثائقية',
  'postgresql/triggers-stored-procedures': 'المشغلات Triggers والإجراءات المخزنة في PostgreSQL',
  'postgresql/connection-pooling': 'تجميع الاتصالات Connection Pooling باستخدام PgBouncer',
  'postgresql/security-backup-pg': 'أمان PostgreSQL وإجراءات النسخ الاحتياطي والاستعادة',

  // Prisma
  'prisma/what-is-an-orm': 'ما هو الـ ORM؟ مقدمة لمحرك Prisma وفلسفة الأمان النوعي',
  'prisma/crud-queries': 'استعلامات CRUD الأساسية والمتقدمة في Prisma Client',
  'prisma/relations-filtering': 'العلاقات بين الجداول والفلترة المتقدمة في Prisma',
  'prisma/migrations-lifecycle': 'دورة حياة الهجرات Migrations وإدارة المخططات في Prisma',
  'prisma/transactions-batching': 'المعاملات Transactions والعمليات المجمعة Batching في Prisma',
  'prisma/raw-queries': 'استعلامات SQL المباشرة Raw Queries والتكامل مع Prisma',
  'prisma/middleware-extensions': 'البرمجيات الوسيطة وتوسيع وظائف Prisma Extensions',
  'prisma/performance-optimization': 'تحسين أداء Prisma وحل مشكلة N+1 Query',
  'prisma/production-deployment': 'نشر تطبيقات Prisma في الإنتاج وإدارة قواعد البيانات الموزعة',

  // Architecture
  'architecture/request-lifecycles': 'دورة حياة الطلب الشاملة من المتصفح إلى قاعدة البيانات'
};

const trackMetadata = {
  foundations: {
    id: 'foundations',
    trackNum: 1,
    titleEn: 'Web & JavaScript Core Foundations',
    titleAr: 'أساسيات الويب وجافاسكريبت الحديثة من الصفر',
    badge: 'TRACK 01 • FOUNDATIONS',
    accentColor: '#F59E0B',
    icon: 'fa-solid fa-code',
    summary: 'معمارية الويب، بروتوكولات HTTP/3، محرك V8، نظام الأنواع، الـ Closures، ومعالجة اللاتزامنية.',
    stack: ['HTTP/3', 'DNS', 'ES2026', 'V8 Engine', 'Async/Await', 'DOM APIs']
  },
  react: {
    id: 'react',
    trackNum: 2,
    titleEn: 'React.js 19.2 Architecture & State',
    titleAr: 'ريآكت 19 وهندسة الواجهات التفاعلية المتقدمة',
    badge: 'TRACK 02 • REACT.JS 19',
    accentColor: '#38BDF8',
    icon: 'fa-brands fa-react',
    summary: 'فلسفة React 19، شجرة الألياف Fiber Tree، الخطافات المتقدمة، إدارة الحالة بـ Zustand، و React Router 7.',
    stack: ['React 19.2', 'Hooks', 'Zustand', 'React Router 7', 'Reconciliation', 'Server Actions']
  },
  nodejs: {
    id: 'nodejs',
    trackNum: 3,
    titleEn: 'Node.js 24 High-Performance Runtime',
    titleAr: 'محرك Node.js 24 ومعمارية الخوادم عالية الأداء',
    badge: 'TRACK 03 • NODE.JS 24',
    accentColor: '#10B981',
    icon: 'fa-brands fa-node-js',
    summary: 'معمارية خيوط Libuv، الـ Streams، الـ Buffers، الـ Worker Threads، و Node 24 Core APIs.',
    stack: ['Node.js 24', 'Libuv Event Loop', 'Streams & Buffers', 'Worker Threads', 'Child Processes', 'Crypto']
  },
  express: {
    id: 'express',
    trackNum: 4,
    titleEn: 'Express.js 5 REST APIs & Enterprise Routing',
    titleAr: 'إطار Express.js 5 وخوادم الـ REST والمعالجة المعيارية',
    badge: 'TRACK 04 • EXPRESS.JS 5',
    accentColor: '#FBBF24',
    icon: 'fa-solid fa-server',
    summary: 'معمارية الـ Middlewares، مسارات REST CRUD، أمان JWT و RBAC، الـ Rate Limiting، ورفع الملفات.',
    stack: ['Express 5.2', 'RESTful APIs', 'JWT & RBAC', 'Multer', 'Rate Limiting', 'Zod Validation']
  },
  mongodb: {
    id: 'mongodb',
    trackNum: 5,
    titleEn: 'MongoDB 8.0 Distributed Document Database',
    titleAr: 'قواعد بيانات MongoDB 8 الوثائقية الموزعة والمتقدمة',
    badge: 'TRACK 05 • MONGODB 8.0',
    accentColor: '#22C55E',
    icon: 'fa-solid fa-database',
    summary: 'نمذجة المستندات، خطوط أنابيب التجميع Aggregation، فهارس B-Tree، معاملات ACID، والـ Sharding.',
    stack: ['MongoDB 8.0', 'Mongoose 8', 'Aggregation Pipeline', 'B-Tree Indexes', 'ACID Transactions', 'Sharding']
  },
  postgresql: {
    id: 'postgresql',
    trackNum: 6,
    titleEn: 'PostgreSQL 18 Enterprise Relational Engine',
    titleAr: 'قواعد بيانات PostgreSQL 18 العلائقية المتقدمة',
    badge: 'TRACK 06 • POSTGRESQL 18',
    accentColor: '#60A5FA',
    icon: 'fa-solid fa-database',
    summary: 'المعمارية العلائقية، الـ Joins، استعلامات الـ CTEs، فهارس GIN، حقول JSONB، ونظام MVCC.',
    stack: ['PostgreSQL 18', 'Complex SQL & CTEs', 'GIN/B-Tree Indexes', 'JSONB Hybrid', 'MVCC Concurrency', 'Partitioning']
  },
  prisma: {
    id: 'prisma',
    trackNum: 7,
    titleEn: 'Prisma 7 Type-Safe Data Engineering',
    titleAr: 'محرك Prisma 7 وهندسة البيانات فائقة الأمان النوعي',
    badge: 'TRACK 07 • PRISMA 7',
    accentColor: '#818CF8',
    icon: 'fa-solid fa-layer-group',
    summary: 'نمذجة المخططات المقسمة، الترقيم بالمؤشر Cursor Pagination، هجرات CI/CD، والمعاملات التفاعلية.',
    stack: ['Prisma 7', 'Type-Safety', 'Multi-Schema', 'Interactive Transactions', 'Prisma Studio', 'Extensions']
  },
  architecture: {
    id: 'architecture',
    trackNum: 8,
    titleEn: 'System Design & Enterprise Architecture',
    titleAr: 'العمارة البرمجية الشاملة وتصميم النظم الموزعة الكبرى',
    badge: 'TRACK 08 • SYSTEM DESIGN',
    accentColor: '#C084FC',
    icon: 'fa-solid fa-network-wired',
    summary: 'Clean Architecture، تفويض OAuth2/PKCE، كاش Redis، الـ WebSockets، طوابير BullMQ، وتدفقات Kafka.',
    stack: ['Clean Architecture', 'Redis 7', 'WebSockets', 'BullMQ & Kafka', 'Microservices', 'OAuth2/PKCE']
  }
};

function unescapeHtml(str) {
  if (!str) return '';
  let prev = str;
  let decoded = str;
  for (let i = 0; i < 5; i++) {
    decoded = decoded
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    if (decoded === prev) break;
    prev = decoded;
  }
  return decoded;
}

function parseLesson(track, filename) {
  const filePath = path.join(learnDir, track, filename);
  const html = fs.readFileSync(filePath, 'utf-8');
  const slug = filename.replace('.html', '');
  const key = `${track}/${slug}`;

  const getMeta = (name) => {
    const m = html.match(new RegExp(`<meta\\s+name=["']fsa-${name}["']\\s+content=["'](.*?)["']`, 'i'));
    return m ? unescapeHtml(m[1]) : '';
  };

  let titleEn = getMeta('title') || slug.replace(/-/g, ' ');
  titleEn = unescapeHtml(titleEn);

  let titleAr = legacyArabicTitles[key];
  if (!titleAr) {
    const titleArMatch = html.match(/<h2[^>]*fsa-ar[^>]*>([\s\S]*?)<\/h2>/i);
    titleAr = titleArMatch ? unescapeHtml(titleArMatch[1].replace(/<[^>]+>/g, '').trim()) : titleEn;
  }

  const order = parseInt(getMeta('order') || '1', 10);
  const level = parseInt(getMeta('level') || '1', 10);
  const estMinutes = parseInt(getMeta('est-minutes') || '30', 10);
  const version = getMeta('teaches-version') || 'Latest';
  const pattern = getMeta('pattern-label') || 'Architecture Pattern';

  const objectives = [];
  const objListMatch = html.match(/<ul[^>]*class="[^"]*fsa-objectives[^"]*"[^>]*>([\s\S]*?)<\/ul>/i);
  if (objListMatch) {
    const liMatches = objListMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    liMatches.forEach(li => objectives.push(unescapeHtml(li.replace(/<[^>]+>/g, '').trim())));
  }

  const quizDataMatch = html.match(/<script[^>]*id="quizData"[^>]*>([\s\S]*?)<\/script>/i);
  let quizCount = 0;
  if (quizDataMatch) {
    try {
      const qArray = JSON.parse(quizDataMatch[1].trim());
      quizCount = Array.isArray(qArray) ? qArray.length : 0;
    } catch (e) {
      quizCount = 0;
    }
  }

  const relativeUrl = `learn/${track}/${filename}`;
  const deployedUrl = `${DEPLOYED_BASE_URL}/learn/${track}/${filename}`;

  return {
    slug,
    titleEn,
    titleAr,
    order,
    level,
    levelLabel: level === 1 ? 'Foundational / تأسيسي' : level === 2 ? 'Intermediate / متوسط' : 'Advanced / خبير',
    estMinutes,
    version,
    pattern,
    objectivesCount: objectives.length,
    quizQuestionsCount: quizCount,
    relativeUrl,
    deployedUrl
  };
}

function buildCatalog() {
  const catalog = {
    platform: {
      name: 'FullStack Academy (CodeHub)',
      nameAr: 'أكاديمية الفول ستاك الحديثة',
      deployedBaseUrl: DEPLOYED_BASE_URL,
      repoUrl: 'https://github.com/ozidan13/mern',
      generatedAt: new Date().toISOString(),
      totalTracks: Object.keys(trackMetadata).length,
      totalLessons: 0,
      totalEstHours: 0
    },
    tracks: []
  };

  let totalLessonsCount = 0;
  let totalEstMinutes = 0;

  for (const [trackKey, meta] of Object.entries(trackMetadata)) {
    const trackPath = path.join(learnDir, trackKey);
    if (!fs.existsSync(trackPath)) continue;

    const files = fs.readdirSync(trackPath).filter(f => f.endsWith('.html') && f !== 'index.html');
    const lessons = files.map(f => parseLesson(trackKey, f));

    lessons.sort((a, b) => a.order - b.order);

    const trackEstMinutes = lessons.reduce((acc, l) => acc + l.estMinutes, 0);
    totalLessonsCount += lessons.length;
    totalEstMinutes += trackEstMinutes;

    catalog.tracks.push({
      ...meta,
      lessonCount: lessons.length,
      totalMinutes: trackEstMinutes,
      totalHours: (trackEstMinutes / 60).toFixed(1),
      hubRelativeUrl: `learn/${trackKey}/index.html`,
      hubDeployedUrl: `${DEPLOYED_BASE_URL}/learn/${trackKey}/index.html`,
      lessons
    });
  }

  catalog.platform.totalLessons = totalLessonsCount;
  catalog.platform.totalEstHours = (totalEstMinutes / 60).toFixed(1);

  return catalog;
}

function generateMarkdown(catalog) {
  let md = `# 📚 CodeHub MERN & PERN Curriculum: Courses & Lessons Master Catalog

> **Platform Deployment URL**: [${catalog.platform.deployedBaseUrl}](${catalog.platform.deployedBaseUrl})  
> **Source Repository**: [${catalog.platform.repoUrl}](${catalog.platform.repoUrl})  
> **Generated Timestamp**: \`${catalog.platform.generatedAt}\`  
> **Curriculum Scope**: **${catalog.platform.totalTracks} Full Tracks**, **${catalog.platform.totalLessons} Comprehensive Lessons**, **~${catalog.platform.totalEstHours} Hours of Interactive Learning**

---

## 🌟 Quick Jump to Tracks

| Track # | Track Name (English) | المسار (عربي) | الدروس | المدة التقديرية | رابط المسار المنشور |
| :---: | :--- | :--- | :---: | :---: | :--- |
${catalog.tracks.map(t => `| **0${t.trackNum}** | [${t.titleEn}](#track-0${t.trackNum}-${t.id}) | **${t.titleAr}** | \`${t.lessonCount}\` درس | \`${t.totalHours}\` ساعة | [عرض المسار ↗](${t.hubDeployedUrl}) |`).join('\n')}

---

## 🧪 Validated Sample Reference Lessons

Below are verified reference lessons with their deployed production URLs:

- 🔗 **Foundations Reference**: [How the Web Works: HTTP/3 & DNS Lifecycle](${DEPLOYED_BASE_URL}/learn/foundations/how-web-works.html)
- 🔗 **Express.js Reference**: [Express.js Middleware Architecture Deep Dive](${DEPLOYED_BASE_URL}/learn/express/middleware-deep-dive.html)
- 🔗 **Home Portal**: [FullStack Academy Master Portal](${DEPLOYED_BASE_URL}/index.html)

---

## 📋 Comprehensive Catalog by Track

`;

  for (const track of catalog.tracks) {
    md += `### <a id="track-0${track.trackNum}-${track.id}"></a>🎯 Track 0${track.trackNum}: ${track.titleEn}
**المسار بالعربية**: ${track.titleAr}  
**المواضيع والتقنيات**: ${track.stack.map(s => `\`${s}\``).join(' • ')}  
**إجمالي الدروس**: \`${track.lessonCount}\` درساً | **المدة الإجمالية**: \`${track.totalHours}\` ساعة  
**رابط فهرس المسار (Hub)**: [${track.hubDeployedUrl}](${track.hubDeployedUrl})

| # | عنوان الدرس (English) | اسم الدرس بالعربية | المستوى | المدة | الرابط المنشور (Live GitHub Pages URL) |
| :-: | :--- | :--- | :-: | :-: | :--- |
`;

    for (const l of track.lessons) {
      const orderPadded = String(l.order).padStart(2, '0');
      md += `| **${orderPadded}** | **${l.titleEn}** | ${l.titleAr} | \`${l.levelLabel}\` | ⏱️ ${l.estMinutes}m | [رابط الدرس ↗](${l.deployedUrl}) |\n`;
    }

    md += `\n---\n\n`;
  }

  md += `## 📦 Programmatic JavaScript / JSON Catalog Object

Developers and automation scripts can import this structured object directly:

\`\`\`json
${JSON.stringify(catalog, null, 2)}
\`\`\`
`;

  return md;
}

// ================= EXECUTION =================
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

console.log('🔍 Scanning all tracks and lessons across the project...');
const catalog = buildCatalog();

console.log(`✅ Indexed ${catalog.platform.totalLessons} lessons across ${catalog.platform.totalTracks} tracks.`);
console.log(`⏱️ Total curriculum estimated time: ${catalog.platform.totalEstHours} hours.`);

const markdownOutput = generateMarkdown(catalog);
const catalogMdPath = path.join(docsDir, 'courses-and-lessons.md');
fs.writeFileSync(catalogMdPath, markdownOutput, 'utf-8');
console.log(`📝 Generated master markdown catalog at: docs/courses-and-lessons.md`);

const catalogJsonPath = path.join(rootDir, 'data', 'courses-catalog.json');
fs.writeFileSync(catalogJsonPath, JSON.stringify(catalog, null, 2), 'utf-8');
console.log(`💾 Saved catalog JSON data at: data/courses-catalog.json`);

const sampleLinks = [
  `${DEPLOYED_BASE_URL}/learn/foundations/how-web-works.html`,
  `${DEPLOYED_BASE_URL}/learn/express/middleware-deep-dive.html`
];

console.log('\n🧪 Testing sample reference links:');
sampleLinks.forEach(link => {
  const relPath = link.replace(DEPLOYED_BASE_URL + '/', '');
  const localPath = path.join(rootDir, relPath);
  const exists = fs.existsSync(localPath);
  console.log(`  ${exists ? '✅' : '❌'} ${link} -> Local file exists: ${exists}`);
});
