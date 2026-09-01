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
    stack: ['HTTP/3', 'DNS', 'ES2026', 'V8 Engine', 'Async/Await', 'DOM APIs'],
    canonicalLessons: [
      { slug: 'how-web-works', order: 1, level: 1, estMinutes: 25, titleEn: 'How the Web Works: HTTP/3 & DNS Lifecycle', titleAr: 'معمارية الويب: دورة حياة DNS وبروتوكولات HTTP/3' },
      { slug: 'html-semantic', order: 2, level: 1, estMinutes: 30, titleEn: 'Semantic HTML, Document Outlines & Accessibility (a11y)', titleAr: 'الهيكل الدلالي للـ HTML ومعايير الوصول الشامل (a11y)' },
      { slug: 'css-box-model', order: 3, level: 1, estMinutes: 35, titleEn: 'CSS Box Model, Flexbox Axis & Modern Grid Layouts', titleAr: 'نموذج الصندوق CSS Box Model ومحاور Flexbox وشبكات Grid الحديثة' },
      { slug: 'js-types-operators', order: 4, level: 1, estMinutes: 30, titleEn: 'JavaScript Types, Coercion Quirks & Symbols/BigInt', titleAr: 'أنواع البيانات في جافاسكريبت والتحويل التلقائي (Coercion) و Symbols/BigInt' },
      { slug: 'js-control-flow', order: 5, level: 1, estMinutes: 28, titleEn: 'Control Flow, Iterators, Labeled Loops & Break/Continue', titleAr: 'التحكم في تدفق التنفيذ وبروتوكول التكرار Iterators والحلقات المسماة' },
      { slug: 'js-functions', order: 6, level: 1, estMinutes: 32, titleEn: 'Function Declarations, Expressions, Arrow Functions & Hoisting', titleAr: 'دوال جافاسكريبت: الإعلانات والتعبيرات والدوال السهمية و Hoisting' },
      { slug: 'js-essentials', order: 7, level: 1, estMinutes: 30, titleEn: 'JS Execution Context, Scope, Call Stack & Lexical Closures', titleAr: 'سياق التنفيذ في جافاسكريبت: النطاق ومكدس الاستدعاءات والـ Closures' },
      { slug: 'js-arrays-methods', order: 8, level: 1, estMinutes: 35, titleEn: 'Functional Array Pipelines: Map, Filter, Reduce & FlatMap', titleAr: 'خطوط المعالجة الوظيفية للمصفوفات: Map, Filter, Reduce و FlatMap' },
      { slug: 'js-objects-prototypes', order: 9, level: 1, estMinutes: 35, titleEn: 'Objects, Property Descriptors & Prototype Inheritance', titleAr: 'الكائنات وواصفات الخصائص وسلسلة التوريث عبر الـ Prototype' },
      { slug: 'js-classes-oop', order: 10, level: 1, estMinutes: 30, titleEn: 'ES6 Classes, Private Fields (#), Inheritance & Mixins', titleAr: 'فئات ES6 Classes والحقول الخاصة (#) والتوريث ومزج السلوكيات (Mixins)' },
      { slug: 'async-js', order: 11, level: 2, estMinutes: 35, titleEn: 'Asynchronous JavaScript: Single-Threaded Event Loop & Promises', titleAr: 'البرمجة اللاتزامنية في جافاسكريبت: حلقة الأحداث Event Loop والوعود Promises' },
      { slug: 'js-async-await', order: 12, level: 1, estMinutes: 35, titleEn: 'Async/Await Control Flow, Sequential vs Parallel & Error Handling', titleAr: 'التحكم بالعمليات اللاتزامنية Async/Await والتنفيذ المتوازي ومعالجة الأخطاء' },
      { slug: 'fetch-api', order: 13, level: 2, estMinutes: 30, titleEn: 'Fetch API, Two-Stage Streams, Headers & AbortController', titleAr: 'واجهة Fetch API وتدفقات البيانات Streams ومتحكم الإلغاء AbortController' },
      { slug: 'js-modules', order: 14, level: 1, estMinutes: 30, titleEn: 'ES Modules (ESM) vs CommonJS (CJS), Dynamic Imports & Tree-Shaking', titleAr: 'أنظمة الحزم: ES Modules مقابل CommonJS والتحميل الديناميكي و Tree-Shaking' },
      { slug: 'js-error-handling', order: 15, level: 1, estMinutes: 30, titleEn: 'Custom Error Hierarchies, Stack Traces & Defensive Coding', titleAr: 'هيكلة فئات الأخطاء المخصصة وتشريح الـ Stack Traces والبرمجة الدفاعية' },
      { slug: 'js-modern-features', order: 16, level: 1, estMinutes: 30, titleEn: 'Modern JavaScript (ES2020–ES2026+): Nullish Coalescing, WeakRefs & Temporal', titleAr: 'جافاسكريبت الحديثة (ES2020–ES2026+): Nullish Coalescing، الروابط الضعيفة WeakRefs والزمن بـ Temporal' }
    ]
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
    stack: ['React 19.2', 'Hooks', 'Zustand', 'React Router 7', 'Reconciliation', 'Server Actions'],
    canonicalLessons: [
      { slug: 'thinking-in-react', order: 1, level: 1, estMinutes: 25, titleEn: 'Thinking in React: Component Trees & Unidirectional Data Flow', titleAr: 'التفكير على طريقة ريآكت: الهرمية وتدفق البيانات الأحادي' },
      { slug: 'jsx-deep-dive', order: 2, level: 1, estMinutes: 30, titleEn: 'JSX Under the Hood: React.createElement & Compilation', titleAr: 'تشريح الـ JSX: دالة React.createElement ومحول JSX الحديث في ريآكت 19' },
      { slug: 'use-state', order: 3, level: 1, estMinutes: 30, titleEn: 'useState Hook: Fiber Linked Lists & Immutability', titleAr: 'خطاف useState: القوائم المترابطة في Fiber والحالة غير القابلة للتغيير' },
      { slug: 'use-effect', order: 4, level: 2, estMinutes: 35, titleEn: 'useEffect Hook: Synchronization, Cleanups & Race Conditions', titleAr: 'خطاف useEffect: المزامنة والتأثيرات الجانبية ودوال التنظيف Cleanup' },
      { slug: 'event-handling', order: 5, level: 1, estMinutes: 30, titleEn: 'Synthetic Events System & Delegation in React 19', titleAr: 'نظام الأحداث المركبة (Synthetic Events) وتفويض الأحداث في ريآكت 19' },
      { slug: 'conditional-rendering', order: 6, level: 1, estMinutes: 28, titleEn: 'Conditional Rendering Patterns: The 0 && Trap & Early Returns', titleAr: 'أنماط العرض الشرطي في ريآكت: فخ الرقم صفر (0 && Trap) والـ Early Returns' },
      { slug: 'lists-keys', order: 7, level: 1, estMinutes: 30, titleEn: 'Lists, Keys & Reconciliation: Identity Preservation & Index Trap', titleAr: 'القوائم والمفاتيح في ريآكت: الحفاظ على هوية المكونات وفخ استخدام Index كـ Key' },
      { slug: 'reconciliation', order: 8, level: 2, estMinutes: 30, titleEn: 'Reconciliation: Virtual DOM, Diffing Algorithm & Fiber Commit Phase', titleAr: 'خوارزمية المطابقة Reconciliation والـ Virtual DOM وشجرة الألياف Fiber' },
      { slug: 'component-patterns', order: 9, level: 2, estMinutes: 35, titleEn: 'Component Architecture: Compound Components & Polymorphic Elements', titleAr: 'أنماط معمارية المكونات: المكونات المركبة (Compound Components) والعناصر المتعددة الأشكال' },
      { slug: 'use-reducer', order: 10, level: 2, estMinutes: 32, titleEn: 'useReducer: Complex State Machines & Lazy Initialization', titleAr: 'خطاف useReducer: آلات الحالة المعقدة (State Machines) والتهيئة الكسولة' },
      { slug: 'use-context', order: 11, level: 2, estMinutes: 30, titleEn: 'Context API: Eliminating Prop Drilling & Context Splitting', titleAr: 'واجهة Context API: القضاء على تمرير الخصائص المضني (Prop Drilling) وتقسيم السياقات' },
      { slug: 'use-ref-dom', order: 12, level: 2, estMinutes: 30, titleEn: 'useRef: Escaping Render Cycles, Mutable Refs & DOM Manipulation', titleAr: 'خطاف useRef: الهروب من دورة الـ Render والمراجع المتغيرة والتعامل مع الـ DOM' },
      { slug: 'use-memo-callback', order: 13, level: 2, estMinutes: 35, titleEn: 'Performance Optimization: useMemo, useCallback & React 19 Compiler', titleAr: 'تحسين الأداء المتقدم: useMemo و useCallback و React.memo ومترجم React 19' },
      { slug: 'custom-hooks', order: 14, level: 2, estMinutes: 32, titleEn: 'Custom Hooks Architecture: Headless UI & Hook Composition', titleAr: 'هندسة الـ Custom Hooks: فصل المنطق عن العرض (Headless UI) والكبسلة المتقدمة' },
      { slug: 'react-router', order: 15, level: 2, estMinutes: 35, titleEn: 'Client-Side Routing: React Router 7 Architecture & Loaders', titleAr: 'التوجيه في تطبيقات الـ SPA: معمارية React Router 7 والتخطيطات المتداخلة' },
      { slug: 'data-fetching', order: 16, level: 2, estMinutes: 35, titleEn: 'Modern Data Fetching & Server State: TanStack Query Architecture', titleAr: 'جلب البيانات الحديث وإدارة حالة السيرفر: معمارية TanStack Query (React Query)' },
      { slug: 'state-management', order: 17, level: 3, estMinutes: 35, titleEn: 'Global State Architecture: Zustand vs Redux Toolkit & Atomic State', titleAr: 'معمارية إدارة الحالة العالمية الحديثة: Zustand مقابل Redux Toolkit والـ Atomic State' },
      { slug: 'react-best-practices', order: 18, level: 3, estMinutes: 35, titleEn: 'Production React 19: Security, Audits & Architecture Checklist', titleAr: 'ريآكت في بيئات الإنتاج: الأمان وتدقيق الأداء (Lighthouse) وقائمة المعايير الذهبية' }
    ]
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
    stack: ['Node.js 24', 'Libuv Event Loop', 'Streams & Buffers', 'Worker Threads', 'Child Processes', 'Crypto'],
    canonicalLessons: [
      { slug: 'what-node-is', order: 1, level: 1, estMinutes: 30, titleEn: 'Node.js Architecture: V8 Engine, libuv & Non-Blocking I/O', titleAr: 'ما هو Node.js؟ معمارية المحرك وخيوط التنفيذ ومكتبة libuv' },
      { slug: 'node-modules', order: 2, level: 1, estMinutes: 30, titleEn: 'Module Systems: CommonJS (CJS) vs ECMAScript Modules (ESM)', titleAr: 'أنظمة الحزم في نود: CommonJS (CJS) مقابل ECMAScript Modules (ESM)' },
      { slug: 'event-loop', order: 3, level: 2, estMinutes: 35, titleEn: '6 Phases of the Node.js Event Loop & process.nextTick', titleAr: 'حلقة الأحداث Event Loop ومراحل التنفيذ الست في Libuv وتفويض المهام' },
      { slug: 'event-emitter', order: 4, level: 2, estMinutes: 30, titleEn: 'EventEmitter Pattern, Custom Events & Memory Leak Prevention', titleAr: 'نمط الناشر والمشترك EventEmitter وإدارة الأحداث المخصصة ومنع تسريب الذاكرة' },
      { slug: 'fs-path', order: 5, level: 1, estMinutes: 30, titleEn: 'File System Operations, Promises API & Path Normalization', titleAr: 'نظام الملفات fs وواجهة الوعود Promises والمسارات path في Node.js' },
      { slug: 'streams-buffers', order: 6, level: 2, estMinutes: 35, titleEn: 'Streams, Chunks, Buffers & Backpressure Control', titleAr: 'التدفقات Streams والـ Buffers ومعالجة البيانات الضخمة مع التحكم في الـ Backpressure' },
      { slug: 'http-module', order: 7, level: 2, estMinutes: 30, titleEn: 'Built-in HTTP/HTTPS Core Server Without Frameworks', titleAr: 'وحدة HTTP الأساسية وبناء خادم ويب أصيل عالي الأداء بدون إطارات عمل' },
      { slug: 'process-env', order: 8, level: 1, estMinutes: 30, titleEn: 'Process Object, Environment Variables, Signals & CLI Args', titleAr: 'كائن Process ومتغيرات البيئة (.env) وإشارات النظام ومعالجات الإنهاء الآمن' },
      { slug: 'error-handling-node', order: 9, level: 2, estMinutes: 30, titleEn: 'Operational vs Programmer Errors & Unhandled Rejections', titleAr: 'معالجة الأخطاء الشاملة في Node.js والوقاية من الانهيار المفاجئ' },
      { slug: 'child-processes', order: 10, level: 2, estMinutes: 30, titleEn: 'Multiprocessing: spawn, fork, exec & Worker Threads', titleAr: 'تعدد العمليات في نود: spawn و fork و exec والـ Worker Threads' },
      { slug: 'npm-packages', order: 11, level: 1, estMinutes: 30, titleEn: 'NPM Ecosystem: Semantic Versioning, Package Lock & Security', titleAr: 'إدارة الحزم npm والترقيم الدلالي SemVer وملفات القفل والـ Security Audits' },
      { slug: 'testing-node', order: 12, level: 2, estMinutes: 30, titleEn: 'Automated Testing with Jest: Unit Tests, Mocks & Spies', titleAr: 'اختبار تطبيقات Node.js: الاختبارات الأحادية والتكاملية باستخدام Jest و Supertest' },
      { slug: 'debugging-node', order: 13, level: 2, estMinutes: 30, titleEn: 'Node.js Debugging: Inspector Flag, Heap Profiling & Tracing', titleAr: 'تنقيح الشيفرة Debugging وتتبع الذاكرة وفحص Heap Profiles في خوادم Node.js' },
      { slug: 'security-node', order: 14, level: 3, estMinutes: 30, titleEn: 'Security Best Practices: Helmet, Input Sanitization & Audits', titleAr: 'أمان تطبيقات Node.js والتحصين ضد الثغرات وتأمين الترويسات بـ Helmet' }
    ]
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
    stack: ['Express 5.2', 'RESTful APIs', 'JWT & RBAC', 'Multer', 'Rate Limiting', 'Zod Validation'],
    canonicalLessons: [
      { slug: 'hello-express', order: 1, level: 1, estMinutes: 30, titleEn: 'First Express 5 Server: Application Instance, Ports & Routes', titleAr: 'مقدمة Express.js 5: بناء أول خادم ويب وتوجيه الطلبات والمعايير الأساسية' },
      { slug: 'routing-params', order: 2, level: 1, estMinutes: 30, titleEn: 'Route Handlers, URL Parameters, Query Strings & Sub-Routers', titleAr: 'التوجيه المتقدم ومعاملات المسار Route Parameters وسلاسل الاستعلام Query Strings' },
      { slug: 'middleware', order: 3, level: 1, estMinutes: 30, titleEn: 'Middleware Pipeline, Execution Ordering & next() Control Flow', titleAr: 'معمارية البرمجيات الوسيطة Middleware وسلسلة التنفيذ next() وترتيب المعالجة' },
      { slug: 'request-response', order: 4, level: 1, estMinutes: 30, titleEn: 'Request Inspection, Content Negotiation & Custom Responses', titleAr: 'كائنات الطلب والاستجابة req و res والتفاوض على المحتوى والردود المخصصة' },
      { slug: 'error-handling-express', order: 5, level: 2, estMinutes: 30, titleEn: 'Central Error Middleware, Express 5 Auto-Catch & AppErrors', titleAr: 'معالجة الأخطاء المركزية Error Middlewares والالتقاط التلقائي في Express 5' },
      { slug: 'validation-sanitization', order: 6, level: 2, estMinutes: 30, titleEn: 'Schema Validation with Zod & Request Sanitization', titleAr: 'التحقق من صحة المدخلات وتعقيم البيانات باستخدام Zod Schemas' },
      { slug: 'rest-crud', order: 7, level: 1, estMinutes: 30, titleEn: 'Building Robust RESTful CRUD APIs with Standard HTTP Statuses', titleAr: 'بناء واجهات RESTful API كاملة بعمليات CRUD المعيارية ورموز الحالة القياسية' },
      { slug: 'authentication', order: 8, level: 2, estMinutes: 30, titleEn: 'Authentication Architecture: JWT Tokens & HttpOnly Cookies', titleAr: 'المصادقة Authentication: تشفير كلمات المرور والـ JWT وجلسات HttpOnly Cookies' },
      { slug: 'authorization-rbac', order: 9, level: 2, estMinutes: 30, titleEn: 'Role-Based Access Control (RBAC) & Permission Guards', titleAr: 'التحكم في الوصول المبني على الأدوار RBAC وحماية المسارات بالصلاحيات' },
      { slug: 'file-uploads', order: 10, level: 2, estMinutes: 30, titleEn: 'Multi-Part Form Data & File Uploads with Multer', titleAr: 'معالجة ورفع الملفات بأمان والتحقق من الأنواع والأحجام باستخدام Multer' },
      { slug: 'api-pagination', order: 11, level: 2, estMinutes: 30, titleEn: 'Query Optimization: Offset vs Cursor-Based Pagination & Sorting', titleAr: 'ترقيم البيانات Pagination والفلترة والفرز في الـ APIs (Offset vs Cursor)' },
      { slug: 'rate-limiting-security', order: 12, level: 2, estMinutes: 30, titleEn: 'API Rate Limiting, CORS Whitelisting & Security Headers', titleAr: 'تحديد معدل الطلبات Rate Limiting وحماية الـ CORS والترويسات الأمنية' },
      { slug: 'api-documentation', order: 13, level: 2, estMinutes: 30, titleEn: 'OpenAPI Specification 3.1 & Swagger UI Generation', titleAr: 'توثيق الـ APIs المعياري بمواصفات OpenAPI 3.1 وتوليد Swagger UI' },
      { slug: 'deployment-production', order: 14, level: 3, estMinutes: 30, titleEn: 'Production Readiness: PM2 Process Management & Reverse Proxies', titleAr: 'تجهيز ونشر خوادم Express في بيئات الإنتاج الفعلية وإدارة العمليات بـ PM2' }
    ]
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
    stack: ['MongoDB 8.0', 'Mongoose 8', 'Aggregation Pipeline', 'B-Tree Indexes', 'ACID Transactions', 'Sharding'],
    canonicalLessons: [
      { slug: 'document-model', order: 1, level: 1, estMinutes: 30, titleEn: 'BSON Document Architecture, ObjectIds & 16MB Boundary Rules', titleAr: 'النموذج الوثائقي في MongoDB وتصميم مستندات BSON وقاعدة الـ 16MB' },
      { slug: 'crud-operations', order: 2, level: 1, estMinutes: 30, titleEn: 'Core CRUD Operations: Projections, Write Concerns & Bulk Writes', titleAr: 'عمليات CRUD الأساسية والاستعلامات المتقدمة والإسقاطات والكتابة المجمعة Bulk' },
      { slug: 'schema-design', order: 3, level: 2, estMinutes: 35, titleEn: 'Schema Design Patterns: 1:1, 1:N, N:M & Subset Pattern', titleAr: 'أنماط تصميم المخططات والعلاقات (1:1, 1:N, N:M) ونمط المجموعات الفرعية Subset Pattern' },
      { slug: 'schema-validation', order: 4, level: 2, estMinutes: 30, titleEn: 'Schema Validation & JSON Schema Enforcement in MongoDB', titleAr: 'التحقق من صحة المخطط Schema Validation وقواعد JSON Schema الصارمة' },
      { slug: 'indexes-performance', order: 5, level: 2, estMinutes: 35, titleEn: 'Index Strategies: Single-Field, Compound, ESR Rule & explain()', titleAr: 'فهارس MongoDB واستراتيجية ESR المركبة وشرح خطة التنفيذ explain()' },
      { slug: 'aggregation-pipeline', order: 6, level: 2, estMinutes: 35, titleEn: 'Multi-Stage Aggregations: $match, $group, $lookup, $unwind', titleAr: 'خطوط أنابيب التجميع Multi-Stage Aggregation ($match, $group, $lookup, $unwind)' },
      { slug: 'mongoose-odm', order: 7, level: 2, estMinutes: 30, titleEn: 'Mongoose ODM: Schema Validation, Middleware Hooks & Virtuals', titleAr: 'مكتبة Mongoose ODM: نمذجة البيانات، خطافات الـ Middleware والحقول الافتراضية' },
      { slug: 'transactions-acid', order: 8, level: 2, estMinutes: 35, titleEn: 'Multi-Document ACID Transactions & Replica Set Architecture', titleAr: 'المعاملات الذرية ACID متعددة المستندات في MongoDB والمجموعات المتماثلة Replica Sets' },
      { slug: 'sharding-replication', order: 9, level: 3, estMinutes: 35, titleEn: 'High Availability & Scalability: Replication & Sharded Clusters', titleAr: 'البنية التحتية الموزعة: النسخ المتماثل والـ Sharding للتوسع الأفقي الهائل' },
      { slug: 'backup-security', order: 10, level: 3, estMinutes: 30, titleEn: 'Production MongoDB Security, RBAC, TLS & Disaster Recovery', titleAr: 'أمان الإنتاج والتحكم بالصلاحيات RBAC والتشفير والنسخ الاحتياطي في MongoDB' }
    ]
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
    stack: ['PostgreSQL 18', 'Complex SQL & CTEs', 'GIN/B-Tree Indexes', 'JSONB Hybrid', 'MVCC Concurrency', 'Partitioning'],
    canonicalLessons: [
      { slug: 'relational-model', order: 1, level: 1, estMinutes: 30, titleEn: 'Relational Theory, Schema Design & ACID Guarantees with WAL', titleAr: 'النموذج العلائي في PostgreSQL والمفاهيم التأسيسية وضمانات ACID مع سجل WAL' },
      { slug: 'sql-syntax-data-types', order: 2, level: 1, estMinutes: 30, titleEn: 'SQL Syntax, Data Types, Primary/Foreign Keys, UUIDs & CHECKs', titleAr: 'بناء جمل SQL، أنواع البيانات المتقدمة، القيود، والمفاتيح الأساسية UUIDs' },
      { slug: 'joins-relations', order: 3, level: 1, estMinutes: 35, titleEn: 'Relational Joins: INNER, LEFT, RIGHT, FULL OUTER & Self Joins', titleAr: 'عمليات الربط العلائقي Joins (INNER, LEFT, RIGHT, FULL, Self) وتحليل الأداء' },
      { slug: 'subqueries-ctes', order: 4, level: 2, estMinutes: 35, titleEn: 'Subqueries & Common Table Expressions (WITH Recursive CTEs)', titleAr: 'الاستعلامات الفرعية والتعبيرات الجدولية العامة CTEs (WITH Recursive)' },
      { slug: 'indexes-query-planner', order: 5, level: 2, estMinutes: 35, titleEn: 'B-Tree vs GIN Indexes, Query Planning & EXPLAIN ANALYZE', titleAr: 'فهارس PostgreSQL (B-Tree, GIN, GiST) ومخطط الاستعلامات EXPLAIN ANALYZE' },
      { slug: 'transactions-concurrency', order: 6, level: 2, estMinutes: 35, titleEn: 'Database Transactions, Savepoints, Isolation Levels & MVCC', titleAr: 'معاملات PostgreSQL ومستويات العزل والتحكم بالتزامن عبر نظام MVCC' },
      { slug: 'jsonb-hybrid-patterns', order: 7, level: 2, estMinutes: 35, titleEn: 'JSONB Hybrid Patterns: Relational + Document & GIN Indexes', titleAr: 'حقول JSONB والأنماط الهجينة العلائقية-الوثائقية وفهارس GIN المخصصة' },
      { slug: 'triggers-stored-procedures', order: 8, level: 2, estMinutes: 35, titleEn: 'Stored Functions (PL/pgSQL), Triggers & Automated Auditing', titleAr: 'الإجراءات المخزنة ودوال PL/pgSQL والمشغلات التلقائية Triggers' },
      { slug: 'connection-pooling', order: 9, level: 2, estMinutes: 30, titleEn: 'Connection Pooling with PgBouncer & Resource Management', titleAr: 'تجميع الاتصالات Connection Pooling باستخدام PgBouncer وإدارة الموارد' },
      { slug: 'security-backup-pg', order: 10, level: 3, estMinutes: 30, titleEn: 'PostgreSQL Security, Roles, Row-Level Security (RLS) & Backups', titleAr: 'أمان PostgreSQL وإدارة الأدوار والصلاحيات وإجراءات النسخ الاحتياطي والاستعادة' }
    ]
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
    stack: ['Prisma 7', 'Type-Safety', 'Multi-Schema', 'Interactive Transactions', 'Prisma Studio', 'Extensions'],
    canonicalLessons: [
      { slug: 'what-is-an-orm', order: 1, level: 1, estMinutes: 30, titleEn: 'The ORM Paradigm, Rust Engine Core & Type-Safety Guarantees', titleAr: 'ما هو الـ ORM؟ مقدمة لمحرك Prisma وفلسفة الأمان النوعي المكتمل Type-Safety' },
      { slug: 'schema-modeling', order: 2, level: 1, estMinutes: 30, titleEn: 'Prisma Schema Modeling: Multi-File Schemas, Models & Enums', titleAr: 'نمذجة البيانات بلغة Prisma Schema وتحديد النماذج والعلاقات والسمات Attributes' },
      { slug: 'crud-queries', order: 3, level: 1, estMinutes: 30, titleEn: 'Type-Safe CRUD Operations via Generated Prisma Client', titleAr: 'استعلامات CRUD الأساسية والمتقدمة في Prisma Client والتنفيذ الآمن نوعياً' },
      { slug: 'relations-filtering', order: 4, level: 1, estMinutes: 30, titleEn: 'Modeling Relations: 1:1, 1:N, N:M, Nested Writes & Filtering', titleAr: 'العلاقات بين الجداول (1:1, 1:N, N:M) والفلترة المتقدمة والفرز في Prisma' },
      { slug: 'migrations-lifecycle', order: 5, level: 2, estMinutes: 30, titleEn: 'Database Migrations, Schema Evolution & CI/CD Pipelines', titleAr: 'دورة حياة الهجرات Migrations وإدارة المخططات والتطور التدريجي لقاعدة البيانات' },
      { slug: 'performance-optimization', order: 6, level: 2, estMinutes: 30, titleEn: 'Optimizing Queries, Deep Includes & N+1 Prevention Strategies', titleAr: 'تحسين أداء Prisma وحل مشكلة N+1 Query عبر Includes واختيار الحقول Select' },
      { slug: 'transactions-batching', order: 7, level: 2, estMinutes: 30, titleEn: 'Sequential & Interactive Transactions ($transaction)', titleAr: 'المعاملات التفاعلية Interactive Transactions والعمليات المجمعة $transaction' },
      { slug: 'raw-queries', order: 8, level: 2, estMinutes: 30, titleEn: 'Raw SQL Queries ($queryRaw) & TypedSQL Compile-Time Checks', titleAr: 'استعلامات SQL المباشرة Raw Queries والتكامل السلس مع Prisma Client' },
      { slug: 'middleware-extensions', order: 9, level: 2, estMinutes: 30, titleEn: 'Prisma Client Extensions ($extends) & Custom Method Injection', titleAr: 'البرمجيات الوسيطة وتوسيع وظائف العميل عبر Prisma Client Extensions الحديثة' },
      { slug: 'production-deployment', order: 10, level: 3, estMinutes: 30, titleEn: 'Production Patterns: Singleton Client, Accelerate & Pulse', titleAr: 'نشر تطبيقات Prisma في الإنتاج وإدارة اتصالات الخوادم السحابية الموزعة' }
    ]
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
    stack: ['Clean Architecture', 'Redis 7', 'WebSockets', 'BullMQ & Kafka', 'Microservices', 'OAuth2/PKCE'],
    canonicalLessons: [
      { slug: 'request-lifecycles', order: 1, level: 1, estMinutes: 35, titleEn: 'End-to-End Request Flow: React to Express to Prisma to PostgreSQL', titleAr: 'دورة حياة الطلب الشاملة من المتصفح إلى الباك إند وقاعدة البيانات' },
      { slug: 'layered-architecture', order: 2, level: 2, estMinutes: 35, titleEn: 'N-Tier Layered Architecture: Controllers, Services & Repositories', titleAr: 'المعمارية ثلاثية الطبقات 3-Tier Layered Architecture والفصل الصارم للمسؤوليات' },
      { slug: 'clean-architecture', order: 3, level: 3, estMinutes: 40, titleEn: 'Clean Architecture & Domain-Driven Design (DDD) in Node.js', titleAr: 'العمارة النظيفة Clean Architecture والتصميم الموجه بالنطاق Domain-Driven Design' },
      { slug: 'auth-security-deep-dive', order: 4, level: 3, estMinutes: 35, titleEn: 'Enterprise Auth Architecture: OAuth2, PKCE & Session Hardening', titleAr: 'أمان المصادقة المؤسسية: تفويض OAuth2 وبروتوكول PKCE وتأمين الجلسات الموزعة' },
      { slug: 'caching-redis', order: 5, level: 2, estMinutes: 35, titleEn: 'Distributed Caching Architecture with Redis & Cache Invalidation', titleAr: 'التخزين المؤقت الموزع بـ Redis واستراتيجيات الإبطال المتقدمة والـ Rate Limiting' },
      { slug: 'realtime-websockets', order: 6, level: 2, estMinutes: 35, titleEn: 'Real-Time Bidirectional Communications: WebSockets & Socket.IO', titleAr: 'التراسل الحي ثنائي الاتجاه بـ WebSockets ومجموعات Socket.IO وتوسيع القنوات' },
      { slug: 'message-queues', order: 7, level: 3, estMinutes: 35, titleEn: 'Asynchronous Job Processing: BullMQ & Distributed Message Queues', titleAr: 'معالجة المهام اللاتزامنية وطوابير الرسائل الموزعة باستخدام BullMQ و Redis Streams' },
      { slug: 'event-driven-architecture', order: 8, level: 3, estMinutes: 35, titleEn: 'Event-Driven Architecture (EDA) & Apache Kafka Message Streams', titleAr: 'المعمارية الموجهة بالأحداث (EDA) وتدفقات رسائل Apache Kafka الموزعة' },
      { slug: 'microservices-monolith', order: 9, level: 3, estMinutes: 35, titleEn: 'Modular Monoliths vs Microservices: Decomposition & Boundaries', titleAr: 'المونوليث المعياري (Modular Monolith) مقابل الخدمات المصغرة Microservices' },
      { slug: 'api-gateway', order: 10, level: 3, estMinutes: 35, titleEn: 'API Gateway Pattern, Reverse Proxies & Centralized Rate Limiting', titleAr: 'نمط بوابة الـ API Gateway وتوجيه وتوحيد وتحديد معدل الطلبات والمصادقة المركزية' },
      { slug: 'performance-tuning', order: 11, level: 3, estMinutes: 35, titleEn: 'Full-Stack Performance Tuning & Memory Leak Elimination', titleAr: 'تحسين الأداء الشامل والقضاء على اختناقات المعالجة والذاكرة في الـ Full-Stack' },
      { slug: 'observability-monitoring', order: 12, level: 3, estMinutes: 35, titleEn: 'Observability: Structured Logging, Prometheus Metrics & Tracing', titleAr: 'المراقبة وقابلية الرصد: السجلات المنظمة، المقاييس وتتبع العمليات الموزعة (Tracing)' },
      { slug: 'ci-cd-devops', order: 13, level: 3, estMinutes: 35, titleEn: 'Continuous Integration & Continuous Deployment (CI/CD) & Docker', titleAr: 'خطوط البناء والنشر المستمر CI/CD وأتمتة الاختبارات عبر GitHub Actions والـ Docker' },
      { slug: 'system-design-case-studies', order: 14, level: 3, estMinutes: 40, titleEn: 'High-Scale System Design Real-World Case Studies (Million+ Scale)', titleAr: 'دراسات حالة حقيقية لتصميم النظم الكبرى وتوسع الخوادم للملايين (Uber, Twitter, Netflix)' }
    ]
  }
};

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
    const lessons = meta.canonicalLessons.map(l => {
      const filename = `${l.slug}.html`;
      const relativeUrl = `learn/${trackKey}/${filename}`;
      const deployedUrl = `${DEPLOYED_BASE_URL}/${relativeUrl}`;
      const filePath = path.join(learnDir, trackKey, filename);
      const existsLocally = fs.existsSync(filePath);

      return {
        slug: l.slug,
        titleEn: l.titleEn,
        titleAr: l.titleAr,
        order: l.order,
        level: l.level,
        levelLabel: l.level === 1 ? 'Foundational / تأسيسي' : l.level === 2 ? 'Intermediate / متوسط' : 'Advanced / خبير',
        estMinutes: l.estMinutes,
        relativeUrl,
        deployedUrl,
        existsLocally
      };
    });

    const trackEstMinutes = lessons.reduce((acc, l) => acc + l.estMinutes, 0);
    totalLessonsCount += lessons.length;
    totalEstMinutes += trackEstMinutes;

    catalog.tracks.push({
      id: meta.id,
      trackNum: meta.trackNum,
      titleEn: meta.titleEn,
      titleAr: meta.titleAr,
      badge: meta.badge,
      accentColor: meta.accentColor,
      icon: meta.icon,
      summary: meta.summary,
      stack: meta.stack,
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
- 🔗 **React.js Reference**: [Thinking in React: Component Trees](${DEPLOYED_BASE_URL}/learn/react/thinking-in-react.html)
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

console.log('🔍 Generating official 106-lesson catalog data object...');
const catalog = buildCatalog();

console.log(`✅ Indexed exactly ${catalog.platform.totalLessons} lessons across ${catalog.platform.totalTracks} tracks.`);
console.log(`⏱️ Total curriculum estimated time: ${catalog.platform.totalEstHours} hours.`);

// Verify all files exist locally
let missingLocalCount = 0;
catalog.tracks.forEach(t => {
  t.lessons.forEach(l => {
    if (!l.existsLocally) {
      console.error(`❌ Local file missing: ${l.relativeUrl}`);
      missingLocalCount++;
    }
  });
});

if (missingLocalCount === 0) {
  console.log('✨ All 106 lesson files verified to exist locally on disk!');
} else {
  console.error(`⚠️ Found ${missingLocalCount} missing files!`);
}

const markdownOutput = generateMarkdown(catalog);
const catalogMdPath = path.join(docsDir, 'courses-and-lessons.md');
fs.writeFileSync(catalogMdPath, markdownOutput, 'utf-8');
console.log(`📝 Generated master markdown catalog at: docs/courses-and-lessons.md`);

const catalogJsonPath = path.join(rootDir, 'data', 'courses-catalog.json');
fs.writeFileSync(catalogJsonPath, JSON.stringify(catalog, null, 2), 'utf-8');
console.log(`💾 Saved catalog JSON data at: data/courses-catalog.json`);
