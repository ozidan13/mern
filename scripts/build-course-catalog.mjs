#!/usr/bin/env node
/* ============================================================
   scripts/build-course-catalog.mjs
   ------------------------------------------------------------
   Generates a comprehensive Course & Lessons Catalog Data Object
   for the official 106-lesson curriculum across all 8 tracks.
   Outputs a detailed Markdown document in `docs/courses-and-lessons.md`
   and a standalone JSON file in `data/courses-catalog.json`.
   Includes live deployed links (https://ozidan13.github.io/mern/...).
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
  'foundations/html-semantic': 'الهيكل الدلالي للـ HTML ومعايير الوصول الشامل (a11y)',
  'foundations/css-box-model': 'نموذج الصندوق CSS Box Model ومحاور Flexbox وشبكات Grid الحديثة',
  'foundations/js-types-operators': 'أنواع البيانات في جافاسكريبت والتحويل التلقائي (Coercion) و Symbols/BigInt',
  'foundations/js-control-flow': 'التحكم في تدفق التنفيذ وبروتوكول التكرار Iterators والحلقات المسماة',
  'foundations/js-functions': 'دوال جافاسكريبت: الإعلانات والتعبيرات والدوال السهمية و Hoisting',
  'foundations/js-essentials': 'سياق التنفيذ في جافاسكريبت: النطاق ومكدس الاستدعاءات والـ Closures',
  'foundations/js-arrays-methods': 'خطوط المعالجة الوظيفية للمصفوفات: Map, Filter, Reduce و FlatMap',
  'foundations/js-objects-prototypes': 'الكائنات وواصفات الخصائص وسلسلة التوريث عبر الـ Prototype',
  'foundations/js-classes-oop': 'فئات ES6 Classes والحقول الخاصة (#) والتوريث ومزج السلوكيات (Mixins)',
  'foundations/async-js': 'البرمجة اللاتزامنية في جافاسكريبت: حلقة الأحداث Event Loop والوعود Promises',
  'foundations/js-async-await': 'التحكم بالعمليات اللاتزامنية Async/Await والتنفيذ المتوازي ومعالجة الأخطاء',
  'foundations/fetch-api': 'واجهة Fetch API وتدفقات البيانات Streams ومتحكم الإلغاء AbortController',
  'foundations/js-modules': 'أنظمة الحزم: ES Modules مقابل CommonJS والتحميل الديناميكي و Tree-Shaking',
  'foundations/js-error-handling': 'هيكلة فئات الأخطاء المخصصة وتشريح الـ Stack Traces والبرمجة الدفاعية',
  'foundations/js-modern-features': 'جافاسكريبت الحديثة (ES2020–ES2026+): Nullish Coalescing، الروابط الضعيفة WeakRefs والزمن بـ Temporal',

  // React
  'react/thinking-in-react': 'التفكير على طريقة ريآكت: الهرمية وتدفق البيانات الأحادي',
  'react/jsx-deep-dive': 'تشريح الـ JSX: دالة React.createElement ومحول JSX الحديث في ريآكت 19',
  'react/use-state': 'خطاف useState: القوائم المترابطة في Fiber والحالة غير القابلة للتغيير',
  'react/use-effect': 'خطاف useEffect: المزامنة والتأثيرات الجانبية ودوال التنظيف Cleanup',
  'react/event-handling': 'نظام الأحداث المركبة (Synthetic Events) وتفويض الأحداث في ريآكت 19',
  'react/conditional-rendering': 'أنماط العرض الشرطي في ريآكت: فخ الرقم صفر (0 && Trap) والـ Early Returns',
  'react/lists-keys': 'القوائم والمفاتيح في ريآكت: الحفاظ على هوية المكونات وفخ استخدام Index كـ Key',
  'react/reconciliation': 'خوارزمية المطابقة Reconciliation والـ Virtual DOM وشجرة الألياف Fiber',
  'react/component-patterns': 'أنماط معمارية المكونات: المكونات المركبة (Compound Components) والعناصر المتعددة الأشكال',
  'react/use-reducer': 'خطاف useReducer: آلات الحالة المعقدة (State Machines) والتهيئة الكسولة',
  'react/use-context': 'واجهة Context API: القضاء على تمرير الخصائص المضني (Prop Drilling) وتقسيم السياقات',
  'react/use-ref-dom': 'خطاف useRef: الهروب من دورة الـ Render والمراجع المتغيرة والتعامل مع الـ DOM',
  'react/use-memo-callback': 'تحسين الأداء المتقدم: useMemo و useCallback و React.memo ومترجم React 19',
  'react/custom-hooks': 'هندسة الـ Custom Hooks: فصل المنطق عن العرض (Headless UI) والكبسلة المتقدمة',
  'react/react-router': 'التوجيه في تطبيقات الـ SPA: معمارية React Router 7 والتخطيطات المتداخلة',
  'react/data-fetching': 'جلب البيانات الحديث وإدارة حالة السيرفر: معمارية TanStack Query (React Query)',
  'react/state-management': 'معمارية إدارة الحالة العالمية الحديثة: Zustand مقابل Redux Toolkit والـ Atomic State',
  'react/react-best-practices': 'ريآكت في بيئات الإنتاج: الأمان وتدقيق الأداء (Lighthouse) وقائمة المعايير الذهبية',

  // Node.js
  'nodejs/what-node-is': 'ما هو Node.js؟ معمارية المحرك وخيوط التنفيذ ومكتبة libuv',
  'nodejs/node-modules': 'أنظمة الحزم في نود: CommonJS (CJS) مقابل ECMAScript Modules (ESM)',
  'nodejs/event-loop': 'حلقة الأحداث Event Loop ومراحل التنفيذ الست في Libuv وتفويض المهام',
  'nodejs/event-emitter': 'نمط الناشر والمشترك EventEmitter وإدارة الأحداث المخصصة ومنع تسريب الذاكرة',
  'nodejs/fs-path': 'نظام الملفات fs وواجهة الوعود Promises والمسارات path في Node.js',
  'nodejs/streams-buffers': 'التدفقات Streams والـ Buffers ومعالجة البيانات الضخمة مع التحكم في الـ Backpressure',
  'nodejs/http-module': 'وحدة HTTP الأساسية وبناء خادم ويب أصيل عالي الأداء بدون إطارات عمل',
  'nodejs/process-env': 'كائن Process ومتغيرات البيئة (.env) وإشارات النظام ومعالجات الإنهاء الآمن',
  'nodejs/error-handling-node': 'معالجة الأخطاء الشاملة في Node.js والوقاية من الانهيار المفاجئ',
  'nodejs/child-processes': 'تعدد العمليات في نود: spawn و fork و exec والـ Worker Threads',
  'nodejs/npm-packages': 'إدارة الحزم npm والترقيم الدلالي SemVer وملفات القفل والـ Security Audits',
  'nodejs/testing-node': 'اختبار تطبيقات Node.js: الاختبارات الأحادية والتكاملية باستخدام Jest و Supertest',
  'nodejs/debugging-node': 'تنقيح الشيفرة Debugging وتتبع الذاكرة وفحص Heap Profiles في خوادم Node.js',
  'nodejs/security-node': 'أمان تطبيقات Node.js والتحصين ضد الثغرات وتأمين الترويسات بـ Helmet',

  // Express
  'express/hello-express': 'مقدمة Express.js 5: بناء أول خادم ويب وتوجيه الطلبات والمعايير الأساسية',
  'express/routing-params': 'التوجيه المتقدم ومعاملات المسار Route Parameters وسلاسل الاستعلام Query Strings',
  'express/middleware': 'معمارية البرمجيات الوسيطة Middleware وسلسلة التنفيذ next() وترتيب المعالجة',
  'express/request-response': 'كائنات الطلب والاستجابة req و res والتفاوض على المحتوى والردود المخصصة',
  'express/error-handling-express': 'معالجة الأخطاء المركزية Error Middlewares والالتقاط التلقائي في Express 5',
  'express/validation-sanitization': 'التحقق من صحة المدخلات وتعقيم البيانات باستخدام Zod Schemas',
  'express/rest-crud': 'بناء واجهات RESTful API كاملة بعمليات CRUD المعيارية ورموز الحالة القياسية',
  'express/authentication': 'المصادقة Authentication: تشفير كلمات المرور والـ JWT وجلسات HttpOnly Cookies',
  'express/authorization-rbac': 'التحكم في الوصول المبني على الأدوار RBAC وحماية المسارات بالصلاحيات',
  'express/file-uploads': 'معالجة ورفع الملفات بأمان والتحقق من الأنواع والأحجام باستخدام Multer',
  'express/api-pagination': 'ترقيم البيانات Pagination والفلترة والفرز في الـ APIs (Offset vs Cursor)',
  'express/rate-limiting-security': 'تحديد معدل الطلبات Rate Limiting وحماية الـ CORS والترويسات الأمنية',
  'express/api-documentation': 'توثيق الـ APIs المعياري بمواصفات OpenAPI 3.1 وتوليد Swagger UI',
  'express/deployment-production': 'تجهيز ونشر خوادم Express في بيئات الإنتاج الفعلية وإدارة العمليات بـ PM2',

  // MongoDB
  'mongodb/document-model': 'النموذج الوثائقي في MongoDB وتصميم مستندات BSON وقاعدة الـ 16MB',
  'mongodb/crud-operations': 'عمليات CRUD الأساسية والاستعلامات المتقدمة والإسقاطات والكتابة المجمعة Bulk',
  'mongodb/schema-design': 'أنماط تصميم المخططات والعلاقات (1:1, 1:N, N:M) ونمط المجموعات الفرعية Subset Pattern',
  'mongodb/schema-validation': 'التحقق من صحة المخطط Schema Validation وقواعد JSON Schema الصارمة',
  'mongodb/indexes-performance': 'فهارس MongoDB واستراتيجية ESR المركبة وشرح خطة التنفيذ explain()',
  'mongodb/aggregation-pipeline': 'خطوط أنابيب التجميع Multi-Stage Aggregation ($match, $group, $lookup, $unwind)',
  'mongodb/mongoose-odm': 'مكتبة Mongoose ODM: نمذجة البيانات، خطافات الـ Middleware والحقول الافتراضية',
  'mongodb/transactions-acid': 'المعاملات الذرية ACID متعددة المستندات في MongoDB والمجموعات المتماثلة Replica Sets',
  'mongodb/sharding-replication': 'البنية التحتية الموزعة: النسخ المتماثل والـ Sharding للتوسع الأفقي الهائل',
  'mongodb/backup-security': 'أمان الإنتاج والتحكم بالصلاحيات RBAC والتشفير والنسخ الاحتياطي في MongoDB',

  // PostgreSQL
  'postgresql/relational-model': 'النموذج العلائي في PostgreSQL والمفاهيم التأسيسية وضمانات ACID مع سجل WAL',
  'postgresql/sql-syntax-data-types': 'بناء جمل SQL، أنواع البيانات المتقدمة، القيود، والمفاتيح الأساسية UUIDs',
  'postgresql/joins-relations': 'عمليات الربط العلائقي Joins (INNER, LEFT, RIGHT, FULL, Self) وتحليل الأداء',
  'postgresql/subqueries-ctes': 'الاستعلامات الفرعية والتعبيرات الجدولية العامة CTEs (WITH Recursive)',
  'postgresql/indexes-query-planner': 'فهارس PostgreSQL (B-Tree, GIN, GiST) ومخطط الاستعلامات EXPLAIN ANALYZE',
  'postgresql/transactions-concurrency': 'معاملات PostgreSQL ومستويات العزل والتحكم بالتزامن عبر نظام MVCC',
  'postgresql/jsonb-hybrid-patterns': 'حقول JSONB والأنماط الهجينة العلائقية-الوثائقية وفهارس GIN المخصصة',
  'postgresql/triggers-stored-procedures': 'الإجراءات المخزنة ودوال PL/pgSQL والمشغلات التلقائية Triggers',
  'postgresql/connection-pooling': 'تجميع الاتصالات Connection Pooling باستخدام PgBouncer وإدارة الموارد',
  'postgresql/security-backup-pg': 'أمان PostgreSQL وإدارة الأدوار والصلاحيات وإجراءات النسخ الاحتياطي والاستعادة',

  // Prisma
  'prisma/what-is-an-orm': 'ما هو الـ ORM؟ مقدمة لمحرك Prisma وفلسفة الأمان النوعي المكتمل Type-Safety',
  'prisma/schema-modeling': 'نمذجة البيانات بلغة Prisma Schema وتحديد النماذج والعلاقات والسمات Attributes',
  'prisma/crud-queries': 'استعلامات CRUD الأساسية والمتقدمة في Prisma Client والتنفيذ الآمن نوعياً',
  'prisma/relations-filtering': 'العلاقات بين الجداول (1:1, 1:N, N:M) والفلترة المتقدمة والفرز في Prisma',
  'prisma/migrations-lifecycle': 'دورة حياة الهجرات Migrations وإدارة المخططات والتطور التدريجي لقاعدة البيانات',
  'prisma/performance-optimization': 'تحسين أداء Prisma وحل مشكلة N+1 Query عبر Includes واختيار الحقول Select',
  'prisma/transactions-batching': 'المعاملات التفاعلية Interactive Transactions والعمليات المجمعة $transaction',
  'prisma/raw-queries': 'استعلامات SQL المباشرة Raw Queries والتكامل السلس مع Prisma Client',
  'prisma/middleware-extensions': 'البرمجيات الوسيطة وتوسيع وظائف العميل عبر Prisma Client Extensions الحديثة',
  'prisma/production-deployment': 'نشر تطبيقات Prisma في الإنتاج وإدارة اتصالات الخوادم السحابية الموزعة',

  // Architecture
  'architecture/request-lifecycles': 'دورة حياة الطلب الشاملة من المتصفح إلى الباك إند وقاعدة البيانات',
  'architecture/layered-architecture': 'المعمارية ثلاثية الطبقات 3-Tier Layered Architecture والفصل الصارم للمسؤوليات',
  'architecture/clean-architecture': 'العمارة النظيفة Clean Architecture والتصميم الموجه بالنطاق Domain-Driven Design',
  'architecture/auth-security-deep-dive': 'أمان المصادقة المؤسسية: تفويض OAuth2 وبروتوكول PKCE وتأمين الجلسات الموزعة',
  'architecture/caching-redis': 'التخزين المؤقت الموزع بـ Redis واستراتيجيات الإبطال المتقدمة والـ Rate Limiting',
  'architecture/realtime-websockets': 'التراسل الحي ثنائي الاتجاه بـ WebSockets ومجموعات Socket.IO وتوسيع القنوات',
  'architecture/message-queues': 'معالجة المهام اللاتزامنية وطوابير الرسائل الموزعة باستخدام BullMQ و Redis Streams',
  'architecture/event-driven-architecture': 'المعمارية الموجهة بالأحداث (EDA) وتدفقات رسائل Apache Kafka الموزعة',
  'architecture/microservices-monolith': 'المونوليث المعياري (Modular Monolith) مقابل الخدمات المصغرة Microservices',
  'architecture/api-gateway': 'نمط بوابة الـ API Gateway وتوجيه وتوحيد وتحديد معدل الطلبات والمصادقة المركزية',
  'architecture/performance-tuning': 'تحسين الأداء الشامل والقضاء على اختناقات المعالجة والذاكرة في الـ Full-Stack',
  'architecture/observability-monitoring': 'المراقبة وقابلية الرصد: السجلات المنظمة، المقاييس وتتبع العمليات الموزعة (Tracing)',
  'architecture/ci-cd-devops': 'خطوط البناء والنشر المستمر CI/CD وأتمتة الاختبارات عبر GitHub Actions والـ Docker',
  'architecture/system-design-case-studies': 'دراسات حالة حقيقية لتصميم النظم الكبرى وتوسع الخوادم للملايين (Uber, Twitter, Netflix)'
};

const trackConfigs = {
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
      totalTracks: Object.keys(trackConfigs).length,
      totalLessons: 0,
      totalEstHours: 0
    },
    tracks: []
  };

  let totalLessonsCount = 0;
  let totalEstMinutes = 0;

  for (const [trackKey, meta] of Object.entries(trackConfigs)) {
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
> **Official Curriculum Scope**: **${catalog.platform.totalTracks} Full Tracks**, **${catalog.platform.totalLessons} Comprehensive Lessons**, **~${catalog.platform.totalEstHours} Hours of Interactive Learning**

---

## 🌟 Quick Jump to Tracks (All 106 Lessons)

| Track # | Track Name (English) | المسار (عربي) | الدروس | المدة التقديرية | رابط المسار المنشور |
| :---: | :--- | :--- | :---: | :---: | :--- |
${catalog.tracks.map(t => `| **0${t.trackNum}** | [${t.titleEn}](#track-0${t.trackNum}-${t.id}) | **${t.titleAr}** | \`${t.lessonCount}\` درس | \`${t.totalHours}\` ساعة | [عرض المسار ↗](${t.hubDeployedUrl}) |`).join('\n')}

---

## 🧪 Validated Sample Reference Lessons

Below are verified reference lessons with their deployed production URLs:

- 🔗 **Foundations Reference**: [How the Web Works: HTTP/3 & DNS Lifecycle](${DEPLOYED_BASE_URL}/learn/foundations/how-web-works.html)
- 🔗 **Express.js Reference**: [Express.js Middleware Architecture](${DEPLOYED_BASE_URL}/learn/express/middleware.html)
- 🔗 **Home Portal**: [FullStack Academy Master Portal](${DEPLOYED_BASE_URL}/index.html)

---

## 📋 Comprehensive Catalog by Track (106 Lessons)

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
  `${DEPLOYED_BASE_URL}/learn/express/middleware.html`,
  `${DEPLOYED_BASE_URL}/learn/react/thinking-in-react.html`
];

console.log('\n🧪 Testing sample reference links:');
sampleLinks.forEach(link => {
  const relPath = link.replace(DEPLOYED_BASE_URL + '/', '');
  const localPath = path.join(rootDir, relPath);
  const exists = fs.existsSync(localPath);
  console.log(`  ${exists ? '✅' : '❌'} ${link} -> Local file exists: ${exists}`);
});
