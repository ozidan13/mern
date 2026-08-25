# FullStack Academy (MERN & PostgreSQL Platform) — Master Project Reference
# مرجع المشروع الشامل: المعمارية، المنهج، التصميم، والقواعد الهندسية لبدء المحادثات الجديدة

> **Last Updated:** `2026-08-25T12:30:27+03:00` (25 August 2026)  
> **Repository:** `https://github.com/ozidan13/mern.git`  
> **Branch:** `main`  
> **Architecture Level:** Zero-Build, 100% Offline-Capable, High-Performance Vanilla Web Architecture  

---

## 📌 الفهرس السريع (Quick Navigation)

1. [الرؤية والهدف الاستراتيجي للمشروع](#1-الرؤية-والهدف-الاستراتيجي-للمشروع)
2. [المعمارية التقنية وميثاق الـ Zero-Build](#2-المعمارية-التقنية-وميثاق-الـ-zero-build)
3. [الهوية البصرية ونظام التصميم (Design System)](#3-الهوية-البصرية-ونظام-التصميم-design-system)
4. [ميثاق السرد اللغوي والتربوي (Pedagogical & Linguistic Charter)](#4-ميثاق-السرد-اللغوي-والتربوي-pedagogical--linguistic-charter)
5. [الهيكل القياسي للمحطات التسع لكل درس (The 9-Beat Loop)](#5-الهيكل-القياسي-للمحطات-التسع-لكل-درس-the-9-beat-loop)
6. [فهرس المنهج والمسارات التعليمية الشاملة (Curriculum Catalog)](#6-فهرس-المنهج-والمسارات-التعليمية-الشاملة-curriculum-catalog)
7. [مصفوفة التشبيهات الواقعية الحية (Real-World Analogy Matrix)](#7-مصفوفة-التشبيهات-الواقعية-الحية-real-world-analogy-matrix)
8. [المحركات التفاعلية ونظام الـ JavaScript](#8-المحركات-التفاعلية-ونظام-الـ-javascript)
9. [أدوات الفحص الآلي وبناء الفهارس (Scripts & Tooling)](#9-أدوات-الفحص-الآلي-وبناء-الفهارس-scripts--tooling)
10. [خريطة المجلدات والملفات (Directory Tree)](#10-خريطة-المجلدات-والملفات-directory-tree)
11. [دليل المساهمة وتوليد الدروس الجديدة (Authoring Guidelines)](#11-دليل-المساهمة-وتوليد-الدروس-الجديدة-authoring-guidelines)

---

## 1. الرؤية والهدف الاستراتيجي للمشروع

منصة **FullStack Academy** هي منصة تعليمية وتفاعلية متكاملة بمستوى عالمي، موجهة لتعليم وتخريج مهندسي **Full-Stack MERN & Modern Web Architecture (React 19.2, Node.js 24 LTS, Express 5.2, MongoDB 8.0, PostgreSQL 18.x, Prisma 7.x)**.

### الأهداف الجوهرية:
* **دروس مستقلة وشاملة 100% (Standalone Mastery Resources)**: لا يحتاج الطالب لمغادرة المنصة أو البحث في جوجل؛ كل درس يشرح المفهوم من الألف إلى الياء بعمق هندسي وسرد شيق.
* **السرد البشري الحي (Humanized Storytelling)**: التخلص التام من الأسلوب الأكاديمي الجاف أو نصوص الذكاء الاصطناعي الروبوتية، والاستناد إلى أسلوب كبار المهندسين المصريين في النقاش الهندسـي الممتع المعتمد على المشاكل الإنتاجية الحقيقية.
* **الدمج اللغوي الذكي (Natural Language Fusion)**: انسياب الشرح بالعربية الفصيحة المبسطة والمطعمة باللهجة المصرية التقنية مع دمج المصطلحات الإنجليزية القياسية داخل سياق الشرح دون أي فواصل أو فقرات ترجمة ميكانيكية.
* **ثنائية الاتجاه الصارمة (Bidirectional RTL & LTR)**: تصميم الواجهة بالكامل بنظام عربي RTL مع عزل تام ودقيق لكافة الأكواد والمحاكيات والمخططات بنظام LTR.

---

## 2. المعمارية التقنية وميثاق الـ Zero-Build

المشروع مبني بالكامل وفق عقد صارم وخالٍ من أي تعقيدات بناء:
* **Zero-Build Architecture**: لا يوجد `npm run build` أو `webpack` أو `vite` للواجهة. جميع الملفات هي HTML5 / CSS3 / Vanilla JS نقية.
* **100% Offline Capability**: يعمل المشروع محلياً وبشكل فوري عبر بروتوكول الملفات المباشر `file:///` دون الحاجة لخادم محلي أو اتصال إنترنت (جميع الخطوط والأيقونات والمكتبات مدمجة ومحلية في `assets/` و `css/` و `js/`).
* **Ultra-Fast Performance**: زمن التحميل الأولي أقل من 50ms مع استغلال كاش المتصفح المحلي و `localStorage` لتخزين التقدم ونقاط الـ XP.
* **عزل المحاكيات في خلفية المتصفح**: تشغيل أكواد المستخدم التفاعلية داخل **Web Workers** منفصلة لمنع تجميد واجهة المستخدم (UI Freeze) وحماية الصفحة من الحلقات اللانهائية (Infinite Loops).

---

## 3. الهوية البصرية ونظام التصميم (Design System)

تم بناء الهوية البصرية استناداً إلى المعايير القياسية في [`style-reference/style-ref-01.html`](file:///d:/work/projects/mern/style-reference/style-ref-01.html) و [`style-reference/ref-index.html`](file:///d:/work/projects/mern/style-reference/ref-index.html):

### لوحة الألوان الأساسية (Obsidian Dark Glassmorphism):
* **خلفية الصفحة العميقة (Canvas Dark)**: `#07070d`
* **بطاقات الزجاج المصقول (Surface Raised)**: `#0f172a` مع حدود شفافة `rgba(255, 255, 255, 0.08)` وتأثير `backdrop-filter: blur(12px)`
* **التوهج القطبي (Aurora Glows)**: تدرجات سحابية متحركة بألوان النيون الهادئة (`--accent-primary: #38bdf8`, `--track-react: #61dafb`, `--track-node: #22c55e`, `--track-mongo: #10b981`, `--track-postgres: #3b82f6`, `--track-prisma: #6366f1`).
* **تأثيرات فيزياء النجوم (Particle Physics Canvas)**: شبكة خطوط ونقاط تفاعلية على الصفحة الرئيسية تتنافر مع حركة مؤشر الفأرة (Mouse Repulsion Physics).

### التيبوغرافيا والخطوط (Typography):
* **النصوص العربية والواجهة**: خط `Cairo` بأوزان (400, 600, 700, 800) مع دعم لخطوط النظام الاحتياطية.
* **الأكواد البرمجية والمصطلحات الإنجليزية**: خطوط `Fira Code` و `Inter` بنظام `dir="ltr"` و `unicode-bidi: isolate`.

---

## 4. ميثاق السرد اللغوي والتربوي (Pedagogical & Linguistic Charter)

1. **الدمج اللغوي الطبيعي**:
   - لا توجد أقسام ترجمة إنجليزية تليها ترجمة عربية منفصلة.
   - الشرح مكتوب كفقرة واحدة متصلة تجمع الشرح العربي المفهوم بالمصطلح التقني الإنجليزي المعزول داخل شريحة كود أو وسم برمجي.
2. **منهجية النقاش الهندسي (Senior Engineer Mentorship)**:
   - **المشكلة الحقيقية (Production Pain Point)**: لماذا نشأت الحاجة لهذا المفهوم؟
   - **المعاناة التاريخية (Historical Context)**: كيف كان المطورون يعانون قبله؟
   - **لحظة الانفراجة (The Breakthrough & Mental Model)**: الفكرة العبقرية التي حلت المشكلة وتبسيطها بتشبيه واقعي.
   - **الفخاخ الشائعة (Pitfalls & Common Mistakes)**: الأخطاء التي يقع فيها 90% من المبتدئين في بيئات العمل.
   - **أسئلة المقابلات (Senior Interview Insights)**: كيف يطرح هذا المفهوم في المقابلات التقنية وكيف تجيب كمهندس محترف.

---

## 5. الهيكل القياسي للمحطات التسع لكل درس (The 9-Beat Loop)

كل درس في المنصة يتبع بدقة هيكل الـ 9 محطات القياسي:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Beat 1: أهداف الدرس ونقاط الإتقان (.fsa-objectives)                   │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 2: القصة الهندسية والتشبيه الواقعي (data-kind="analogy")         │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 3: كيف يعمل المفهوم خطوة بخطوة (.fsa-step-card)                  │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 4: الرؤية البصرية والمحاكي التفاعلي (.fsa-stepper + SVG diagram) │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 5: جرب بنفسك في المتصفح (.fsa-playground Web Worker + Predict)   │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 6: تشريح الكود البرمجي سطراً بسطر (.fsa-anatomy)                 │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 7: كواليس هندسية وتحليل الأداء (.fsa-complexity-grid Big-O)      │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 8: معرض الأخطاء الشائعة وقاموس المصطلحات (.fsa-mistakes-gallery) │
├────────────────────────────────────────────────────────────────────────┤
│  Beat 9: اختبار الإتقان الفوري وأسئلة المقابلات (.fsa-checkpoint & QA) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. فهرس المنهج والمسارات التعليمية الشاملة (Curriculum Catalog)

يحتوي المنهج على **8 مسارات أساسية تضم 18 درساً مركزياً + صفحات المسارات ومشاريع التخرج والمراجع**:

### المسار 0: أساسيات الويب وجافاسكربت (Foundations Track)
* [x] [`learn/foundations/how-web-works.html`](file:///d:/work/projects/mern/learn/foundations/how-web-works.html) — HTTP/3, DNS Lifecycle, TLS 1.3, Request/Response
* [x] [`learn/foundations/js-essentials.html`](file:///d:/work/projects/mern/learn/foundations/js-essentials.html) — V8 Engine, Execution Context, Call Stack, Closures & TDZ
* [x] [`learn/foundations/async-js.html`](file:///d:/work/projects/mern/learn/foundations/async-js.html) — Event Loop, Microtask Queue, Promises & Async/Await
* [x] [`learn/foundations/fetch-api.html`](file:///d:/work/projects/mern/learn/foundations/fetch-api.html) — Fetch API, 2-Step Streaming, res.ok & AbortController

### المسار 1: ريآكت الحديثة (React.js 19.2 Track)
* [x] [`learn/react/thinking-in-react.html`](file:///d:/work/projects/mern/learn/react/thinking-in-react.html) — Component Hierarchy, Props Flow & Lifting State Up
* [x] [`learn/react/use-state.html`](file:///d:/work/projects/mern/learn/react/use-state.html) — Fiber Linked Lists, Immutability & Automatic Batching
* [x] [`learn/react/use-effect.html`](file:///d:/work/projects/mern/learn/react/use-effect.html) — External Synchronization, Cleanup Functions & Race Conditions
* [x] [`learn/react/reconciliation.html`](file:///d:/work/projects/mern/learn/react/reconciliation.html) — Virtual DOM, Diffing Algorithm O(n) & List Keys

### المسار 2: نود جي إس (Node.js 24 LTS Track)
* [x] [`learn/nodejs/what-node-is.html`](file:///d:/work/projects/mern/learn/nodejs/what-node-is.html) — V8 Engine, libuv C++ Architecture & Thread Pool
* [x] [`learn/nodejs/event-loop.html`](file:///d:/work/projects/mern/learn/nodejs/event-loop.html) — The 6-Phase Event Loop, nextTick vs setImmediate
* [x] [`learn/nodejs/streams-buffers.html`](file:///d:/work/projects/mern/learn/nodejs/streams-buffers.html) — Binary Buffers, Stream Pipelines & Backpressure

### المسار 3: إكسبريس (Express.js 5.2 Track)
* [x] [`learn/express/hello-express.html`](file:///d:/work/projects/mern/learn/express/hello-express.html) — Server Architecture, Routing & EADDRINUSE Port Handling
* [x] [`learn/express/middleware.html`](file:///d:/work/projects/mern/learn/express/middleware.html) — Middleware Conveyor Pipeline & 4-Param Error Guards
* [x] [`learn/express/rest-crud.html`](file:///d:/work/projects/mern/learn/express/rest-crud.html) — Production REST CRUD API, Status Codes & Validation

### المسار 4: مونجو دي بي (MongoDB 8.0 Track)
* [x] [`learn/mongodb/document-model.html`](file:///d:/work/projects/mern/learn/mongodb/document-model.html) — BSON Format, Embedding vs Referencing & 16MB Limits

### المسار 5: بوستجرس (PostgreSQL 18.x Track)
* [x] [`learn/postgresql/relational-model.html`](file:///d:/work/projects/mern/learn/postgresql/relational-model.html) — Relational Model, ACID Guarantees, SQL Joins & WAL Log

### المسار 6: بريزما (Prisma 7.x Track)
* [x] [`learn/prisma/what-is-an-orm.html`](file:///d:/work/projects/mern/learn/prisma/what-is-an-orm.html) — Type-Safe Rust Query Engine, Migrations & N+1 Prevention

### المسار 7: المعمارية الشاملة (Full-Stack Architecture Track)
* [x] [`learn/architecture/request-lifecycles.html`](file:///d:/work/projects/mern/learn/architecture/request-lifecycles.html) — End-to-End Request Flow (React &rarr; Express &rarr; Prisma &rarr; Postgres)

### مشاريع التخرج وصفحات المراجع (Projects & References)
* [`projects/rest-api.html`](file:///d:/work/projects/mern/projects/rest-api.html) — Capstone Project: Production Auth & Data REST API
* [`reference/react/cheatsheet.html`](file:///d:/work/projects/mern/reference/react/cheatsheet.html) & [`errors.html`](file:///d:/work/projects/mern/reference/react/errors.html)
* [`reference/mongodb/cheatsheet.html`](file:///d:/work/projects/mern/reference/mongodb/cheatsheet.html) & [`errors.html`](file:///d:/work/projects/mern/reference/mongodb/errors.html)
* [`reference/postgresql/cheatsheet.html`](file:///d:/work/projects/mern/reference/postgresql/cheatsheet.html) & [`errors.html`](file:///d:/work/projects/mern/reference/postgresql/errors.html)
* [`reference/prisma/cheatsheet.html`](file:///d:/work/projects/mern/reference/prisma/cheatsheet.html) & [`errors.html`](file:///d:/work/projects/mern/reference/prisma/errors.html)

---

## 7. مصفوفة التشبيهات الواقعية الحية (Real-World Analogy Matrix)

| الدرس | التشبيه الواقعي المعتمد | الفكرة الهندسية المستخلصة |
| :--- | :--- | :--- |
| **How Web Works** | دليل الهاتف السريع ومندوب الشحن | تحويل الدومين لعنوان IP ومصافحة QUIC TLS 1.3 المتوازية |
| **JS Essentials** | رئيس الطهاة في المطبخ وحقيبة الظهر السحرية | تنفيذ دوال الـ Call Stack بنظام LIFO واحتفاظ الـ Closures بالمتغيرات |
| **Async JS** | كاشير مطعم الوجبات السريعة وجهاز التنبيه | تفريغ طابور الـ Microtasks فورياً قبل الانتقال للـ Timers |
| **Fetch API** | استلام الطرد البريدي وفتح الصندوق للتركيب | وصول الترويسات في المرحلة الأولى ثم استهلاك تدفق الـ Chunks |
| **Thinking in React** | قلعة مكعبات الليجو وشجرة العائلة | تفكيك الواجهة لمكونات أحادية المسؤولية وتدفق الـ Props للأبناء |
| **useState Hook** | الشخص فاقد الذاكرة وصناديق الأمانات المتسلسلة | تتبع الـ State عبر سلسلة عقد الـ Fiber Linked List بدقة الترتيب |
| **useEffect Hook** | نزيل الفندق وجهاز التكييف الذكي | مزامنة الأنظمة الخارجية وتشغيل دالة الـ Cleanup لمنع التسريب |
| **Reconciliation** | مسودة المهندس المعماري وأرقام جلوس الامتحان | مقارنة الـ VDOM في O(n) وتثبيت هوية المكونات بالمفاتيح الفريدة |
| **What Node.js Is** | المدير الذكي وعمال المخزن الأقوياء | تفويض قراءة الملفات والتشفير لعمال الـ libuv Thread Pool الأربعة |
| **Event Loop** | قطار المترو ذو المحطات الست والممر السريع | الدوران بين المحطات الست وأسبقية `process.nextTick` الفورية |
| **Streams & Buffers** | صنبور المياه وخزان الـ Buffer وصمام الأمان | معالجة ملفات الجيجابايت دون تفجير الرام عبر الضغط العكسي |
| **Hello Express** | مأمور البريد الذكي وفرز الرسائل | استقبال الطلبات وتوجيهها حسب الـ Method والـ Path |
| **Middleware** | بوابات التفتيش الأمني في المطار | تمرير الطلب عبر مراحل الفحص والتحقق وحارس الأخطاء المركزي |
| **REST CRUD API** | مصلحة السجل المدني واستخراج الشهادات | معايير أسماء الموارد وأكواد الردود وفحص المدخلات بـ Zod |
| **Document Model** | ملف العميل الشامل في درج واحد | تخزين البيانات المترابطة في وثيقة BSON واحدة حتى 16MB |
| **Relational Model** | الخزنة البنكية الحصينة وسجل المعاملات المزدوج | ضمانات ACID الأربعة واسترداد العمليات عبر سجل الـ WAL |
| **Prisma ORM** | المترجم الفوري الصارم بين المبرمج وقاعدة البيانات | توفير Type Safety كامل وتحسين استعلامات SQL ومنع N+1 |
| **Request Lifecycles** | خط الإنتاج المتكامل والمطعم الراقي | رحلة البيانات عبر الـ 4 طبقات والعودة للشاشة في أقل من 50ms |

---

## 8. المحركات التفاعلية ونظام الـ JavaScript

تم بناء محركات التفاعل كـ كائنات معيارية مسجلة في النطاق العام `window.FSA`:

* **`js/stepper.js` (`window.FSA.stepper.mount`)**:
  - محاكي خطوات تفاعلي يتيح التنقل خطوة بخطوة مع مزامنة نصوص الشرح ومخططات الـ SVG.
* **`js/playground.js` (`window.FSA.playground.mount`)**:
  - محرر كود تفاعلي يشغل الكود داخل **Web Worker** مخصص ويطبع المخرجات في وحدة تحكم مدمجة (Console) مع كشف أخطاء الـ Syntax.
* **`js/quiz.js` & `js/exercise.js`**:
  - محرك اختبارات فورية يقرأ بيانات الأسئلة من وسوم `<script type="application/json" class="fsa-quiz-data">` ويحسب التقدم ويقدم شروحاً تفصيلية لكل إجابة.
* **`js/progress.js`**:
  - نظام متابعة تقدم الطالب وحساب نقاط الخبرة (XP) وتخزين الدروس المكتملة في `localStorage`.
* **`js/search.js`**:
  - محرك بحث فوري وسريع (Ctrl+K) يعتمد على فهرس البحث المسبق في `data/search-index.js` مع تطبيع الأحرف العربية (إزالة التشكيل وتوحيد الألف والياء).
* **`js/theme.js`**:
  - مبدل المظهر (Dark / Light) مع الحفظ التلقائي في `localStorage` ودعم تفضيلات نظام التشغيل.

---

## 9. أدوات الفحص الآلي وبناء الفهارس (Scripts & Tooling)

تحتوي المنصة على حزمة أدوات مبنية بـ Node.js للتحقق من الجودة وتوليد الفهارس:

### 1. أداة الفحص الآلي المستمر (`scripts/check-content.mjs`):
تفحص جميع ملفات الدروس للتأكد من مطابقتها لـ **17 معيار جودة إلزامي**:
- وجود وسم `<h1>` وحيد.
- وجود قسم الأهداف (`.fsa-objectives`).
- وجود مربع التشبيه الواقعي (`data-kind="analogy"`).
- وجود مخطط SVG داخلي مزود بـ `<title>` و `<desc>`.
- استخدام فئات التحريك (`fsa-anim-*`).
- وجود المحاكي التفاعلي (`fsa-stepper` أو `fsa-playground`).
- وجود اختبار الإتقان (`fsa-checkpoint`).
- وجود بطاقات المصطلحات (`fsa-term-card`).
- نسبة النصوص العربية >= 40% مع عزل الكلمات الإنجليزية.
- خلو الملفات من أي روابط خارجية أو طلبات CDN غير متصلة.

### 2. مولد كتالوج المنهج المركزي (`scripts/gen-curriculum.mjs`):
يقرأ بيانات الـ Metadata من جميع ملفات الـ HTML ويولد تلقائياً ملف `data/curriculum.js`.

### 3. مولد فهرس البحث الذكي (`scripts/build-search-index.mjs`):
يبني فهرس البحث الشامل الموزون `data/search-index.js` للدروس والمشاريع والمراجع.

### 4. مولد صفحات المسارات الرئيسية (`scripts/build-track-pages.mjs`):
يولد صفحات الفهرس الرئيسية لكل مسار تحت المسار `learn/<track>/index.html`.

### أمر التشغيل والتحقق الكامل في سطر واحد:
```bash
node scripts/check-content.mjs; node scripts/gen-curriculum.mjs; node scripts/build-search-index.mjs; node scripts/build-track-pages.mjs
```

---

## 10. خريطة المجلدات والملفات (Directory Tree)

```
d:/work/projects/mern/
├── mern-project-ref.md             # 🌟 مرجع المشروع الشامل (هذا الملف)
├── index.html                      # قمرة القيادة الرئيسية (Aurora + Particles)
├── dashboard.html                  # لوحة متابعة التقدم ونقاط الـ XP
├── package.json                    # إعدادات المشروع والأوامر
│
├── assets/                         # الأيقونات والصور والخطوط المحلية
│   └── icons.svg                   # مكتبة الأيقونات الموحدة SVG Sprite
│
├── css/                            # نظام التصميم المعياري
│   ├── tokens.css                  # متغيرات الألوان والمسافات والخطوط
│   ├── base.css                    # القواعد العامة وعزل الاتجاهات RTL/LTR
│   ├── components.css              # تصميم البطاقات، الأزرار، والـ Badges
│   ├── layout.css                  # شبكة الـ Shell والـ Topbar والـ Sidebar
│   └── learning.css                # تصميم المحطات التسع، المحاكيات والمخططات
│
├── js/                             # محركات التفاعل وتجربة المستخدم
│   ├── fsa-namespace.js            # النطاق العام window.FSA
│   ├── theme.js                    # إدارة المظهر Dark/Light
│   ├── progress.js                 # تخزين التقدم والـ XP
│   ├── stepper.js                  # محاكي الخطوات التفاعلي
│   ├── playground.js               # محاكي تشغيل الكود في Web Worker
│   ├── quiz.js & exercise.js       # محرك الاختبارات والتحديات
│   ├── search.js                   # محرك البحث السريع Ctrl+K
│   ├── worker-sandbox.js           # كود الـ Web Worker المنفصل
│   └── app.js                      # التهيئة العامة وتفعيل القوائم
│
├── data/                           # البيانات المولدة تلقائياً
│   ├── curriculum.js               # كتالوج المنهج والدروس الـ 18
│   ├── search-index.js             # فهرس البحث الموزون
│   ├── technologies.js             # بيانات التقنيات والإصدارات
│   └── tips.js                     # نصائح وطرائف المطورين
│
├── docs/                           # وثائق التخطيط والمعمارية
│   ├── mern-project-ref.md         # نسخة مرجع المشروع الشامل في مجلد التوثيق
│   ├── lesson-redesign-plan.md     # الخطة التنفيذية التفصيلية لإعادة تصميم الدروس
│   ├── final-plan.md               # خطة تطوير المنصة الأصلية
│   ├── AUTHORING.md                # دليل كتابة الدروس والمقالات
│   └── DECISIONS.md                # سجل القرارات المعمارية (ADRs)
│
├── templates/                      # القوالب القياسية الموحدة
│   └── lesson-template.html        # القالب الذهبي للمحطات التسع بنظام RTL/LTR
│
├── learn/                          # مسارات المنهج التعليمية (18 درساً)
│   ├── foundations/                # مسار الأساسيات (4 دروس + index.html)
│   ├── react/                      # مسار ريآكت 19.2 (4 دروس + index.html)
│   ├── nodejs/                     # مسار نود جي إس 24 (3 دروس + index.html)
│   ├── express/                    # مسار إكسبريس 5.2 (3 دروس + index.html)
│   ├── mongodb/                    # مسار مونجو دي بي 8 (درس + index.html)
│   ├── postgresql/                 # مسار بوستجرس 18 (درس + index.html)
│   ├── prisma/                     # مسار بريزما 7 (درس + index.html)
│   └── architecture/               # مسار المعمارية الشاملة (درس + index.html)
│
├── projects/                       # مشاريع التخرج العملية
│   └── rest-api.html               # مشروع بناء Full-Stack Auth REST API
│
├── reference/                      # المراجع وجداول الاختصار وأدلة الأخطاء
│   ├── react/                      # cheatsheet.html & errors.html
│   ├── mongodb/                    # cheatsheet.html & errors.html
│   ├── postgresql/                 # cheatsheet.html & errors.html
│   └── prisma/                     # cheatsheet.html & errors.html
│
└── scripts/                        # أدوات الفحص والتوليد
    ├── check-content.mjs           # فحص الجودة ومطابقة معايير الدروس الـ 17
    ├── gen-curriculum.mjs          # توليد data/curriculum.js
    ├── build-search-index.mjs      # توليد data/search-index.js
    └── build-track-pages.mjs       # توليد صفحات learn/<track>/index.html
```

---

## 11. دليل المساهمة وتوليد الدروس الجديدة (Authoring Guidelines)

عند إنشاء أو تعديل أي درس جديد في المنصة، يجب الالتزام بالقواعد الذهبية التالية:

1. **الاعتماد على القالب الذهبي**: نسخ الهيكل من [`templates/lesson-template.html`](file:///d:/work/projects/mern/templates/lesson-template.html).
2. **الـ Metadata الكاملة**: تضمين وسوم `<meta name="fsa-*">` في رأس الصفحة (Track, Lesson, Level, Order, Title, Version, Root).
3. **تطبيق المحطات التسع كاملة**: لا يجوز حذف أي محطة من المحطات التسع (الأهداف، التشبيه، الخطوات، المحاكي، التجربة، التشريح، الكواليس، الأخطاء، والاختبار).
4. **عزل الأكواد واللغات**:
   - الفقرة تبدأ بـ `<p class="fsa-ar" dir="rtl">`.
   - أي مصطلح أو كلمة إنجليزية توضع داخل `<code dir="ltr">` أو `<span dir="ltr">`.
   - الأكواد متعددة الأسطر توضع داخل `<div class="fsa-anatomy__code" dir="ltr">`.
5. **التحقق الدوري الآلي**:
   تشغيل أمر الفحص والتأكد من الحصول على `0 warnings`:
   ```bash
   node scripts/check-content.mjs; node scripts/gen-curriculum.mjs; node scripts/build-search-index.mjs; node scripts/build-track-pages.mjs
   ```
6. **الرفع للمستودع**:
   عمل `git commit` مع رسالة واضحة و `git push origin main`.

---

> **ملاحظة للنماذج اللغوية (LLMs) عند بدء جلسة جديدة:**  
> هذا الملف يمثل الحقيقة المعمارية الوحيدة للمشروع (Single Source of Truth). يرجى قراءة أقسام هذا الملف واستيعاب نظام الـ Zero-Build، وميثاق السرد القصصي المصري التقني، وعقد المحطات التسع قبل إجراء أي تعديلات أو كتابة أكواد جديدة في المشروع.
