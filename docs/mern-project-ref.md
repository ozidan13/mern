# FullStack Academy (MERN & PostgreSQL Architecture) — Ultra-Detailed Master Reference
# المرجع الهندسي الشامل للمشروع: المعمارية، السرد القصصي، المنهج، ونظام التصميم لبدء المحادثات الجديدة

> **Last Updated:** `2026-08-25T12:32:00+03:00` (25 August 2026)  
> **Platform Name:** FullStack Academy (MERN & PostgreSQL Edition)  
> **Repository:** `https://github.com/ozidan13/mern.git`  
> **Branch:** `main`  
> **Target Audiences:** Full-Stack Web Engineering Students, Senior Developers & AI Agents  
> **Architectural Contract:** Zero-Build, 100% Offline via `file:///`, Sandboxed Web Workers, Bidirectional RTL/LTR  

---

## 📌 الفهرس العام الشامل (Table of Contents)

1. [الرؤية المعمارية والمبادئ الهندسية الحاكمة](#1-الرؤية-المعمارية-والمبادئ-الهندسية-الحاكمة)
2. [نظام التصميم والهوية البصرية المعمقة (Obsidian Glassmorphism)](#2-نظام-التصميم-والهوية-البصرية-المعمقة-obsidian-glassmorphism)
3. [ميثاق السرد القصصي والدمج اللغوي (Humanized Engineering Storytelling)](#3-ميثاق-السرد-القصصي-والدمج-اللغوي-humanized-engineering-storytelling)
4. [الهيكل القياسي للمحطات التسع لكل درس (The 9-Beat Standard)](#4-الهيكل-القياسي-للمحطات-التسع-لكل-درس-the-9-beat-standard)
5. [التشريح التفصيلي للمنهج والمسارات الثمانية (All 18 Lessons In-Depth)](#5-التشريح-التفصيلي-للمنهج-والمسارات-الثمانية-all-18-lessons-in-depth)
   - [5.1 مسار الأساسيات (Foundations Track — 4 Lessons)](#51-مسار-الأساسيات-foundations-track--4-lessons)
   - [5.2 مسار ريآكت 19.2 (React.js Track — 4 Lessons)](#52-مسار-ريآكت-192-reactjs-track--4-lessons)
   - [5.3 مسار نود جي إس 24 (Node.js Track — 3 Lessons)](#53-مسار-نود-جي-إس-24-nodejs-track--3-lessons)
   - [5.4 مسار إكسبريس 5.2 (Express.js Track — 3 Lessons)](#54-مسار-إكسبريس-52-expressjs-track--3-lessons)
   - [5.5 مسار مونجو دي بي 8 (MongoDB Track — 1 Lesson)](#55-مسار-مونجو-دي-بي-8-mongodb-track--1-lesson)
   - [5.6 مسار بوستجرس 18 (PostgreSQL Track — 1 Lesson)](#56-مسار-بوستجرس-18-postgresql-track--1-lesson)
   - [5.7 مسار بريزما 7 (Prisma ORM Track — 1 Lesson)](#57-مسار-بريزما-7-prisma-orm-track--1-lesson)
   - [5.8 مسار المعمارية الشاملة (Full-Stack Architecture — 1 Lesson)](#58-مسار-المعمارية-الشاملة-full-stack-architecture--1-lesson)
6. [مشاريع التخرج والمراجع ومسرح الأخطاء (Projects & Reference Hub)](#6-مشاريع-التخرج-والمراجع-ومسرح-الأخطاء-projects--reference-hub)
7. [معمارية ملفات الجافاسكربت والمحركات التفاعلية (JavaScript Engines)](#7-معمارية-ملفات-الجافاسكربت-والمحركات-التفاعلية-javascript-engines)
8. [أدوات الفحص الآلي المستمر وتوليد الفهارس (Scripts & CI-Lite)](#8-أدوات-الفحص-الآلي-المستمر-وتوليد-الفهارس-scripts--ci-lite)
9. [هندسة الصفحة الرئيسية ولوحة التحكم (index.html & dashboard.html)](#9-هندسة-الصفحة-الرئيسية-ولوحة-التحكم-indexhtml--dashboardhtml)
10. [الشجرة الكاملة للملفات والمجلدات (Complete File Tree)](#10-الشجرة-الكاملة-للملفات-والمجلدات-complete-file-tree)
11. [دليل المساهمة والتعليمات الدقيقة للذكاء الاصطناعي (AI Agent Prompt & Directives)](#11-دليل-المساهمة-والتعليمات-الدقيقة-للذكاء-الاصطناعي-ai-agent-prompt--directives)

---

## 1. الرؤية المعمارية والمبادئ الهندسية الحاكمة

منصة **FullStack Academy** هي منصة تعليمية تفاعلية حية، بُنيت لتنافس أفضل المراجع العالمية في هندسة البرمجيات (مثل MDN, Web.dev, ByteByteGo, EpicWeb).

### المبادئ الهندسية الصارمة:
1. **عقد الـ Zero-Build بنسبة 100%**:
   - لا توجد أي أدوات بناء (No Webpack, No Vite, No Babel, No Tailwind CLI, No PostCSS).
   - التعديل في أي ملف HTML أو CSS أو JS ينعكس فوراً عند عمل Refresh للمتصفح.
2. **العمل المستقل دون إنترنت (100% Offline Capability)**:
   - تعمل المنصة مباشرة عبر بروتوكول الملفات `file:///` أو أي Static Server محلي.
   - لا يوجد أي طلب لشبكات الـ CDN الخارجية (No Google Fonts CDN, No Unpkg, No FontAwesome, No Cloudflare CDN).
   - جميع الخطوط والأيقونات مدمجة ومحزومة محلياً في `assets/` و `css/`.
3. **الأداء الخارق (Sub-50ms Initial Paint)**:
   - لا توجد أطر عمل ثقيلة في الواجهة؛ كل سطر مكتوب بـ Vanilla JavaScript خفيف وسريع.
   - كاش محلي في المتصفح وتخزين تقدم الطالب في `localStorage`.
4. **الأمان وعزل بيئة تشغيل الأكواد (Web Worker Sandboxing)**:
   - محاكيات الأكواد في الدروس (Try It Yourself) تنفذ كود الطالب داخل **Web Worker** معزول، مما يمنع تجميد المتصفح في حالة الحلقات اللانهائية ويمنع الوصول غير المصرح به لكوكيز الجلسة و DOM الصفحة.

---

## 2. نظام التصميم والهوية البصرية المعمقة (Obsidian Glassmorphism)

تم استلهام الهوية البصرية من أحدث اتجاهات التصميم للعام 2026 (Dark Obsidian, Glassmorphism, Neon Auroras):

### لوحة الألوان والمتغيرات (`css/tokens.css`):
* **الخلفيات العميقة (Surfaces)**:
  - `--bg-canvas`: `#07070d` (سواد أوبسيديان عميق مريح للعين).
  - `--bg-raised`: `#0f172a` (بطاقات زجاجية بنسبة شفافية وظلال ناعمة).
  - `--bg-overlay`: `#1e293b` (القوائم المنسدلة والمودال).
* **ألوان المسارات المميزة (Track Accent Colors)**:
  - **Foundations**: `--track-foundations: #f59e0b` (كهرماني دافئ).
  - **React.js**: `--track-react: #61dafb` (أزرق سماوي نيون).
  - **Node.js**: `--track-node: #22c55e` (أخضر ليموني حيوي).
  - **Express.js**: `--track-express: #a855f7` (أرجواني تقني).
  - **MongoDB**: `--track-mongo: #10b981` (زمردي).
  - **PostgreSQL**: `--track-postgres: #3b82f6` (أزرق ملكي).
  - **Prisma ORM**: `--track-prisma: #6366f1` (إنديغو عصري).
  - **Architecture**: `--track-arch: #ec4899` (وردي معبّر).
* **الحدود والتوهجات (Borders & Glowing Effects)**:
  - `--border-default`: `rgba(255, 255, 255, 0.08)`
  - `--border-focus`: `rgba(56, 189, 248, 0.5)`
  - `--glass-blur`: `blur(12px)`
  - بطاقات المحتوى تمتلك خط توهج علوي رفيع (Ambient Top Border) بلون المسار يضيء برفق عند التمرير (Hover).

### فيزياء الجسيمات والشفق القطبي (Aurora & Constellation Physics):
- **الأورورا القطبي (`.aurora-1`, `.aurora-2`, `.aurora-3`)**: تدرجات ضبابية متحركة في خلفية الصفحة تعطي إحساساً بالحياة والعمق.
- **شبكة النجوم التفاعلية (HTML5 Canvas Particles)**: شبكة ذرات ضوئية ترتبط بخطوط ديناميكية وتتنافر مع حركة مؤشر الفأرة (Mouse Repulsion) بسرعة 60 إطاراً في الثانية.

---

## 3. ميثاق السرد القصصي والدمج اللغوي (Humanized Engineering Storytelling)

### 1. إلغاء النبرة الآلية (Non-AI Tone Charter)
- يُمنع منعاً باتاً استخدام العبارات الإنشائية الجافة مثل: *"في هذا الدرس سنتعلم مفهوم الـ..."* أو الترجمة الميكانيكية الروبوتية.
- الأسلوب يحاكي جلسة نقاش هندسي حقيقية (Peer-to-Peer Engineering Mentorship) مع مهندس برمجيات مصري خبير، يشرح الكواليس بحماس وعمق وواقعية.

### 2. الدمج اللغوي الطبيعي (Natural Flow)
- الشرح ينساب باللغة العربية الفصيحة المطعمة بالتعبيرات الهندسية المصرية السلسة.
- المصطلحات الإنجليزية القياسية (مثل `Event Loop`, `Fiber Node`, `Middleware Pipeline`, `ACID Transactions`) تدمج داخل نفس الفقرة بدون أي ترجمة منفصلة، وتُعزل برمجياً داخل `<code dir="ltr">` لمنع تداخل الحروف.

### 3. التركيز على المشكلة الواقعية قبل الحل (Problem-First Pedagogy)
- كل مفهوم يبدأ بـ:
  1. **الكارثة في بيئة العمل (The Real-World Production Nightmare)**.
  2. **تاريخ المعاناة قبل الابتكار (Why older solutions failed)**.
  3. **لحظة الانفراجة والحل الذكي (The Engineering Breakthrough)**.
  4. **التشبيه الواقعي الملموس (The Relatable Real-World Analogy)**.

---

## 4. الهيكل القياسي للمحطات التسع لكل درس (The 9-Beat Standard)

يحتوي كل درس من دروس المنصة الـ 18 على المحطات التسع التالية دون نقصان:

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

## 5. التشريح التفصيلي للمنهج والمسارات الثمانية (All 18 Lessons In-Depth)

---

### 5.1 مسار الأساسيات (Foundations Track — 4 Lessons)

#### 1. [`learn/foundations/how-web-works.html`](file:///d:/work/projects/mern/learn/foundations/how-web-works.html)
* **الموضوع**: دورة حياة طلب الشبكة، بروتوكول HTTP/3، حل نطاقات DNS، ومصافحة TLS 1.3 0-RTT.
* **التشبيه الواقعي**: دليل الهاتف السريع ومأمور الشحن (Phonebook & Courier).
* **المحاكي التفاعلي**: محاكي من 5 خطوات يوضح رحلة الطلب من المتصفح &larr; DNS Resolver &larr; Root &larr; TLD &larr; Authoritative &larr; استلام أول بايت.
* **صندوق التجربة**: كود تفاعلي لتفكيك كائن `new URL()` واستخراج البروتوكول، المنفذ، والـ SearchParams.
* **لغز التوقع**: هل يسافر جزء الـ `#hash` إلى السيرفر في طلب الـ HTTP؟ (الإجابة: مستحيل، يبقى في المتصفح).
* **الأخطاء الشائعة**: الاعتقاد الخاطئ بأن فحص DNS يحدث عند كل استدعاء `fetch()` (تصحيح: OS DNS Cache & Keep-Alive).
* **سؤال المقابلات**: ما هو الفرق بين الاستماع على `127.0.0.1` (Localhost Loopback) و `0.0.0.0` (All Interfaces) في حاويات Docker؟

#### 2. [`learn/foundations/js-essentials.html`](file:///d:/work/projects/mern/learn/foundations/js-essentials.html)
* **الموضوع**: محرك V8، سياق التنفيذ Execution Context، مكدس Call Stack LIFO، فخاخ Hoisting والـ Closures.
* **التشبيه الواقعي**: رئيس الطهاة في المطبخ ومكدس الأطباق وحقيبة الظهر السحرية للـ Closures.
* **المحاكي التفاعلي**: تتبع حركة دفع وحذف إطارات الدوال في الـ Call Stack مع توضيح خطر الـ Stack Overflow.
* **صندوق التجربة**: دالة `createCounter()` وإثبات كبسلة المتغيرات الخاصة في الـ Heap عبر الـ Closure.
* **لغز التوقع**: الفرق بين رفع `var` بقيمة `undefined` ووقوع `let/const` في منطقة الـ Temporal Dead Zone (TDZ).
* **الأخطاء الشائعة**: فخ استدعاء متغير الـ `var` داخل حلقة تكرار مع `setTimeout`، وحله بـ `let` لإنشاء Block Scope جديد لكل لفة.
* **سؤال المقابلات**: كيف تعتمد ريآكت داخلياً على الـ Closures للاحتفاظ بحالة المكونات في هوك `useState`؟

#### 3. [`learn/foundations/async-js.html`](file:///d:/work/projects/mern/learn/foundations/async-js.html)
* **الموضوع**: حلقة الـ Event Loop، أسبقية طابور الـ Microtasks، طابور الـ Macrotasks/Timers، ووعود Promises و Async/Await.
* **التشبيه الواقعي**: كاشير مطعم الوجبات السريعة الذكي وجهاز التنبيه اللاسلكي (Pager Buzzer).
* **المحاكي التفاعلي**: تتبع تفريغ الـ Microtask Queue بالكامل قبل لمس أي Timer في الـ Macrotask Queue.
* **صندوق التجربة**: إثبات أسبقية تنفيذ `Promise.resolve().then()` على `setTimeout(..., 0)`.
* **لغز التوقع**: ترتيب طباعة الأرقام بين الكود المتزامن، الـ Microtask، والـ Timeout.
* **الأخطاء الشائعة**: فخ الـ Async Waterfall داخل الحلقات التكرارية وحله بـ `Promise.all()` المتوازي.
* **سؤال المقابلات**: المقارنة الدقيقة بين `Promise.all` و `Promise.allSettled` و `Promise.race` و `Promise.any`.

#### 4. [`learn/foundations/fetch-api.html`](file:///d:/work/projects/mern/learn/foundations/fetch-api.html)
* **الموضوع**: دالة Fetch API، التدفق ثنائي المراحل (2-Step Streaming)، فحص `res.ok`، والتحكم بـ `AbortController`.
* **التشبيه الواقعي**: استلام الطرد البريدي (Headers) أولاً ثم فتح الصندوق وتركيب الشاشة (Streams Consumption).
* **المحاكي التفاعلي**: تتبع وصول الترويسات ثم تدفق بايتات الـ JSON وإلغاء الطلب بالزر.
* **صندوق التجربة**: كتابة دالة `fetchWithTimeout()` وإلغاء الاتصال تلقائياً بعد 3 ثوانٍ لمنع تعليق التطبيق.
* **لغز التوقع**: لماذا لا تفشل دالة `fetch()` عند استلام كود 404 أو 500؟ (لأن الترويسات وصلت بسلام ويجب فحص `res.ok`).
* **الأخطاء الشائعة**: محاولة قراءة جسم الرد مرتين (`res.json()` ثم `res.text()`) وحدوث خطأ `Body stream already read`.
* **سؤال المقابلات**: كيفية ربط `AbortController` مع دالة الـ Cleanup في هوك `useEffect` لمنع تسريب الذاكرة وتضارب الردود (Race Conditions).

---

### 5.2 مسار ريآكت 19.2 (React.js Track — 4 Lessons)

#### 1. [`learn/react/thinking-in-react.html`](file:///d:/work/projects/mern/learn/react/thinking-in-react.html)
* **الموضوع**: التفكير بعقلية ريآكت، شجرة المكونات الهرمية، تدفق البيانات الأحادي (Unidirectional Data Flow)، ورفع الحالة (Lifting State Up).
* **التشبيه الواقعي**: قلعة مكعبات الليجو وشجرة العائلة (Lego Blocks & Family Tree).
* **المحاكي التفاعلي**: تفكيك تصميم واجهة إلى شجرة مكونات أحادية المسؤولية وتدفق الـ Props من الأب للأبناء.
* **صندوق التجربة**: دالة نقية تستقبل Props وتولد شارة المنتج دون تعديل أي حالة خارجية.
* **لغز التوقع**: أين نضع الـ State عندما يحتاجها مكونان شقيقان؟ (في الأب المشترك الأقرب Lifting State Up).
* **الأخطاء الشائعة**: محاولة تعديل كائن الـ Props مباشرة داخل المكون الفرعي وحله بتمرير دوال الـ Callbacks.
* **سؤال المقابلات**: ما هو الـ Prop Drilling وما هي الاستراتيجيات الثلاث لحله (Component Composition, Context API, Zustand)؟

#### 2. [`learn/react/use-state.html`](file:///d:/work/projects/mern/learn/react/use-state.html)
* **الموضوع**: هوك useState، قائمة الـ Fiber Linked List، مبدأ الـ Immutability، والتجميع التلقائي (Automatic Batching).
* **التشبيه الواقعي**: الشخص فاقد الذاكرة وصناديق الأمانات المتسلسلة (Linked Lockers).
* **المحاكي التفاعلي**: تتبع مؤشر `memoizedState` في عقدة الـ Fiber وسبب حظر استدعاء الـ Hooks داخل الشروط الشرطية.
* **صندوق التجربة**: محاكاة سلوك الـ Batching واستخدام دوال الـ Updater Functions: `setCount(c => c + 1)`.
* **لغز التوقع**: نتيجة استدعاء `setCount(count + 1)` ثلاث مرات متتالية (النتيجة 1 وليس 3).
* **الأخطاء الشائعة**: تعديل المصفوفات والكائنات مباشرة بـ `arr.push()` دون تغيير المرجع في الذاكرة.
* **سؤال المقابلات**: متى نفضل استخدام `useReducer` بدلاً من `useState` في إدارة الحالات المعقدة؟

#### 3. [`learn/react/use-effect.html`](file:///d:/work/projects/mern/learn/react/use-effect.html)
* **الموضوع**: هوك useEffect، المزامنة مع الأنظمة الخارجية، دوال التنظيف (Cleanup)، وتجنب الـ Race Conditions.
* **التشبيه الواقعي**: نزيل الفندق وجهاز التكييف الذكي (The Hotel Guest & AC).
* **المحاكي التفاعلي**: تتبع تشغيل دالة الـ Cleanup الخاصة بالـ Render السابق قبل تشغيل الـ Effect الجديد.
* **صندوق التجربة**: محاكاة الاشتراك في غرفة محادثة مع فصل الاتصال القديم تلقائياً عند تبديل الغرفة.
* **لغز التوقع**: كم مرة يشتغل الـ Effect بمصفوفة اعتماديات فارغة `[]` في الإنتاج؟ (مرة واحدة عند الـ Mount).
* **الأخطاء الشائعة**: نسيان دالة التنظيف مع التايمرز (`clearInterval`) وتسريب الذاكرة (Memory Leaks).
* **سؤال المقابلات**: متى يجب الامتناع عن استخدام `useEffect` واستبدالها بحسابات نقية أو مكتبات إدارة الخوادم (TanStack Query)؟

#### 4. [`learn/react/reconciliation.html`](file:///d:/work/projects/mern/learn/react/reconciliation.html)
* **الموضوع**: الـ Virtual DOM، خوارزمية المقارنة Diffing O(n)، الفرضيتان الاستدلاليتان، وأهمية خاصية الـ `key`.
* **التشبيه الواقعي**: مسودة المهندس المعماري وأرقام جلوس الطلاب في الامتحان (Blueprint & Seat Numbers).
* **المحاكي التفاعلي**: مقارنة شجرتي VDOM في O(n) واكتشاف العقدة المعدلة فقط وتحديثها في الـ Real DOM.
* **صندوق التجربة**: مطابقة عناصر القائمة عبر المفاتيح الثابتة واكتشاف العنصر المضاف في أول المصفوفة فورياً.
* **لغز التوقع**: كم عنصراً يعاد رسمه عند إضافة عنصر في أول القائمة مع `key={index}`؟ (القائمة كلها!).
* **الأخطاء الشائعة**: استخدام `Math.random()` كمفتاح للقائمة وتدمير أداء الواجهة وفقدان الـ Focus.
* **سؤال المقابلات**: ما هو الفرق الدقيق بين `React.memo` (لمنع إعادة رسم المكون) و `useMemo` (لحفظ قيمة حسابية ثقيلة)؟

---

### 5.3 مسار نود جي إس 24 (Node.js Track — 3 Lessons)

#### 1. [`learn/nodejs/what-node-is.html`](file:///d:/work/projects/mern/learn/nodejs/what-node-is.html)
* **الموضوع**: بيئة تشغيل نود جي إس، محرك V8 المكتوب بـ C++، مكتبة libuv، عمال الـ Thread Pool، ومعمارية Non-Blocking I/O.
* **التشبيه الواقعي**: المدير الذكي وعمال المخزن الأقوياء (The Smart Manager & Warehouse Crew).
* **المحاكي التفاعلي**: تتبع تفويض قراءة الملفات من الخيط الرئيسي إلى عمال الـ Thread Pool الأربعة ثم إعادة النتيجة.
* **صندوق التجربة**: قياس زمن العمليات المتزامنة واستغلال قدرات محرك V8.
* **لغز التوقع**: عند تشغيل 8 عمليات تشفير متزامنة بـ `crypto.pbkdf2` على جهاز 4-Cores، كم تستغرق العملية رقم 5؟ (ضعف الوقت لأن حجم الـ Thread Pool الافتراضي هو 4 عمال).
* **الأخطاء الشائعة**: تشغيل عمليات حسابية ثقيلة (CPU-bound) على الخيط الرئيسي وتجميد السيرفر بالكامل.
* **سؤال المقابلات**: كيف يخدم سيرفر نود جي إس بخيط واحد 100 ألف طلب متزامن بدون انهيار؟ (Non-blocking I/O مع إشعارات epoll/kqueue).

#### 2. [`learn/nodejs/event-loop.html`](file:///d:/work/projects/mern/learn/nodejs/event-loop.html)
* **الموضوع**: المحطات الست لحلقة الـ Event Loop في libuv، وأسبقية `process.nextTick` و `setImmediate`.
* **التشبيه الواقعي**: قطار المترو ذو المحطات الست والممر السريع VIP (The 6-Station Metro Loop).
* **المحاكي التفاعلي**: جولة دائرية في المراحل الست: Timers &rarr; Pending Callbacks &rarr; Idle/Prepare &rarr; Poll Phase &rarr; Check Phase &rarr; Close Callbacks.
* **صندوق التجربة**: إثبات أسبقية `process.nextTick` و `Promise.then` على أي تايمر.
* **لغز التوقع**: من ينفذ أولاً: `setImmediate` أم `setTimeout(0)` عند تشغيلهما داخل دالة قراءة ملف `fs.readFile`؟ (الإجابة: `setImmediate` دائماً لأن مرحلة الـ Poll تليها مرحلة الـ Check فوراً).
* **الأخطاء الشائعة**: الاستدعاء التكراري اللانهائي لـ `process.nextTick` وتجويع الـ Event Loop (Starvation).
* **سؤال المقابلات**: كيف تكتشف وتراقب الـ Event Loop Delay في بيئة الإنتاج؟ (عبر `perf_hooks.monitorEventLoopDelay()`).

#### 3. [`learn/nodejs/streams-buffers.html`](file:///d:/work/projects/mern/learn/nodejs/streams-buffers.html)
* **الموضوع**: الذاكرة الثنائية في كائنات `Buffer`، تدفقات Streams، الربط عبر `stream.pipeline`، وإدارة الضغط العكسي (Backpressure).
* **التشبيه الواقعي**: صنبور المياه وخزان الـ Buffer وصمام الأمان (Water Tap & Safety Valve).
* **المحاكي التفاعلي**: تدفق كتل البيانات (64KB Chunks) عبر الـ Pipeline ومراقبة استقرار الرام.
* **صندوق التجربة**: تحويل ومعالجة البيانات الثنائية والتحويل بين Hex و Base64 في الـ Buffer.
* **لغز التوقع**: كم ميجابايت من الرام يستهلكها السيرفر لنقل ملف بحجم 10GB عبر `pipeline`؟ (حوالي 20MB إلى 64KB فقط!).
* **الأخطاء الشائعة**: استخدام `fs.readFileSync` لقراءة ملفات ضخمة وتفجير ذاكرة السيرفر بـ Out of Memory.
* **سؤال المقابلات**: كيف تبني خادم بث فيديو يدعم التقديم والتأخير (HTTP Range Requests 206 Partial Content)؟

---

### 5.4 مسار إكسبريس 5.2 (Express.js Track — 3 Lessons)

#### 1. [`learn/express/hello-express.html`](file:///d:/work/projects/mern/learn/express/hello-express.html)
* **الموضوع**: معمارية سيرفر Express 5.2، موجه الـ HTTP Router، حجز المنافذ (Port Binding)، وحل خطأ تصادم المنافذ `EADDRINUSE`.
* **التشبيه الواقعي**: مأمور البريد الذكي وفرز الرسائل (The Postal Router).
* **المحاكي التفاعلي**: مطابقة المسار والأفعال وإرجاع ردود JSON في أجزاء من الميلي ثانية.
* **صندوق التجربة**: محاكاة مطابقة مسارات الطلبات وإرجاع كود 200 أو 404.
* **لغز التوقع**: ماذا يحدث عند تشغيل سيرفرين على نفس المنفذ 3000؟ (رمي خطأ `EADDRINUSE`).
* **الأخطاء الشائعة**: نسيان استخدام `return` عند إرسال الرد ومحاولة إرسال رد ثانٍ يرمي `ERR_HTTP_HEADERS_SENT`.
* **سؤال المقابلات**: ما هي الميزة الثورية في Express 5 مقارنة بـ Express 4؟ (الدعم التلقائي لصيد أخطاء الـ Async Promises دون الحاجة لـ try/catch يدوي).

#### 2. [`learn/express/middleware.html`](file:///d:/work/projects/mern/learn/express/middleware.html)
* **الموضوع**: خط سير المعالجات الوسيطة (Middleware Pipeline)، دالة `next()`، وحارس الأخطاء المركزي (Central Error Guard).
* **التشبيه الواقعي**: بوابات التفتيش الأمني في المطار (Airport Security Gates).
* **المحاكي التفاعلي**: تتبع مرور الطلب عبر بوابات الـ Logger &larr; Auth Guard &larr; Route Handler &larr; Error Guard.
* **صندوق التجربة**: بناء سلسلة معالجات وفحص التوكن وحقن بيانات المستخدم في `req.user`.
* **لغز التوقع**: ماذا يحدث إذا لم تستدعِ `next()` ولم ترسل رداً؟ (تعليق الطلب في الهواء حتى الـ Timeout).
* **الأخطاء الشائعة**: كتابة حارس الأخطاء بثلاث معاملات بدلاً من أربعة فيتعامل معه Express كـ Middleware عادي.
* **سؤال المقابلات**: كيف تضبط إعدادات حزمة CORS بأمان في الإنتاج لمنع ثغرات الـ CSRF؟ (استخدام Whitelist للنطاقات الموثوقة).

#### 3. [`learn/express/rest-crud.html`](file:///d:/work/projects/mern/learn/express/rest-crud.html)
* **الموضوع**: بناء REST CRUD API إنتاجي، أكواد الردود القياسية (201, 204, 400, 404, 500)، التحقق من المدخلات بـ Zod، والـ Idempotency.
* **التشبيه الواقعي**: مصلحة السجل المدني واستخراج الشهادات (The Civil Registry Office).
* **المحاكي التفاعلي**: مصفوفة عمليات الـ CRUD الأربعة مع أكواد الحالة المرتبطة بها.
* **صندوق التجربة**: محاكاة إضافة مستخدم والتحقق من البريد وإرجاع كود 201 Created أو 400 Bad Request.
* **لغز التوقع**: ما هو الفرق الهندسي بين `PUT` (استبدال المورد كاملاً) و `PATCH` (تعديل جزئي للحقول المحددة فقط)؟
* **الأخطاء الشائعة**: إرجاع كود 200 OK عند حدوث خطأ وكتابة رسالة الخطأ داخل الـ JSON.
* **سؤال المقابلات**: كيف تنفذ التصفح بالصفحات (Pagination) لقاعدة بيانات بملايين السجلات؟ (استخدام Keyset Cursor-based Pagination بدلاً من OFFSET).

---

### 5.5 مسار مونجو دي بي 8 (MongoDB Track — 1 Lesson)

#### 1. [`learn/mongodb/document-model.html`](file:///d:/work/projects/mern/learn/mongodb/document-model.html)
* **الموضوع**: نموذج مستندات BSON، قرار التضمين مقابل الإسناد (Embedding vs Referencing)، وحد الـ 16MB، وخطوط التجميع Aggregation Pipelines.
* **التشبيه الواقعي**: ملف العميل الشامل في درج واحد (All-in-One Customer Folder).
* **المحاكي التفاعلي**: المقارنة البصرية بين الوثيقة المدمجة (قراءة قرصية واحدة O(1)) والوثائق المرجعية (حماية حد الـ 16MB).
* **صندوق التجربة**: تصفية وتجميع المبيعات عبر مراحل `$match` ثم `$group`.
* **لغز التوقع**: هل يصح تخزين مصفوفة متابعي مستخدم (2 مليون متابع) داخل وثيقة المستخدم نفسه؟ (كارثة ستفجر حاجز الـ 16MB ويجب استخدام الإسناد العكسي).
* **الأخطاء الشائعة**: الاستعلام بدون فهارس مركبة مما يجبر المحرك على مسح كل وثائق القرص (COLLSCAN).
* **سؤال المقابلات**: متى تختار MongoDB ومتى تختار PostgreSQL في تصميم المعمارية؟

---

### 5.6 مسار بوستجرس 18 (PostgreSQL Track — 1 Lesson)

#### 1. [`learn/postgresql/relational-model.html`](file:///d:/work/projects/mern/learn/postgresql/relational-model.html)
* **الموضوع**: النموذج العلائقي، ضمانات ACID الأربعة لسلامة المعاملات، سجل الـ WAL (Write-Ahead Logging)، وعمليات الربط SQL Joins.
* **التشبيه الواقعي**: الخزنة البنكية الحصينة وسجل المعاملات المزدوج (The Bank Vault & Ledger).
* **المحاكي التفاعلي**: محاكاة معاملة تحويل بنكي ذرية وتطبيق التراجع التلقائي (Rollback) عند فشل أي خطوة.
* **صندوق التجربة**: كود تفاعلي لتطبيق التحويل بين حسابين وفحص الرصيد المتاح.
* **لغز التوقع**: ما هي القيم التي تظهر لجدول الطلبات عند عمل `LEFT JOIN` لمستخدم لم يقم بأي طلب؟ (قيم `NULL`).
* **الأخطاء الشائعة**: توليد جمل SQL بدمج النصوص المباشر والوقوع في ثغرة الـ SQL Injection (وحله بـ Parameterized Queries).
* **سؤال المقابلات**: ما هو الفرق بين `EXPLAIN` (الخطة التقديرية) و `EXPLAIN ANALYZE` (التنفيذ الفعلي وقياس الوقت بالميلي ثانية)؟

---

### 5.7 مسار بريزما 7 (Prisma ORM Track — 1 Lesson)

#### 1. [`learn/prisma/what-is-an-orm.html`](file:///d:/work/projects/mern/learn/prisma/what-is-an-orm.html)
* **الموضوع**: محرك استعلامات Rust، الأمان النوعي الكامل (Compile-Time Type Safety)، مخطط Prisma Schema، وحل مشكلة N+1 تلقائياً.
* **التشبيه الواقعي**: المترجم الفوري الصارم والسكرتير فائق الدقة (The Strict Translator).
* **المحاكي التفاعلي**: تتبع مرور كود TypeScript عبر عميل Prisma &rarr; محرك Rust &rarr; توليد SQL محسّن &rarr; قاعدة البيانات.
* **صندوق التجربة**: كتابة استعلام Prisma مع جلب العلاقات واختيار الحقول بدقة عبر `select`.
* **لغز التوقع**: ماذا يحدث عند استخدام `select` و `include` معاً في نفس المستوى؟ (خطأ تجميع TypeScript).
* **الأخطاء الشائعة**: إنشاء `new PrismaClient()` داخل كل مسار واستنزاف مجمع الاتصالات (Connection Pool).
* **سؤال المقابلات**: كيف تتعامل مع أكواد أخطاء Prisma الشهيرة مثل `P2002` (Unique constraint failed) و `P2025` (Record not found)؟

---

### 5.8 مسار المعمارية الشاملة (Full-Stack Architecture — 1 Lesson)

#### 1. [`learn/architecture/request-lifecycles.html`](file:///d:/work/projects/mern/learn/architecture/request-lifecycles.html)
* **الموضوع**: رحلة الطلب الشاملة من البداية للنهاية (React &rarr; Express &rarr; Prisma &rarr; PostgreSQL &rarr; DOM Paint في أقل من 50ms)، والمعمارية ثلاثية الطبقات (Controller - Service - Repository).
* **التشبيه الواقعي**: خط الإنتاج الصناعي المتكامل والمطعم الراقي (The Assembly Line & Fine Dining).
* **المحاكي التفاعلي**: المحاكي الأكبر في المنصة: تتبع زمن وزمن استجابة كل طبقة من الطبقات الأربعة.
* **صندوق التجربة**: شلال قياس زمن الاستجابة (Waterfall Latency Profiler) بالمللي ثانية.
* **لغز التوقع**: هل يغني التحقق من المدخلات في React عن التحقق في Express؟ (مستحيل وكارثة أمنية فادحة؛ التحقق في الباك إند إجباري).
* **الأخطاء الشائعة**: خلط منطق الأعمال والـ SQL والفيزا كلها في دالة الـ Route (God Controller Antipattern).
* **سؤال المقابلات**: كيف تصمم معمارية تطبيق تجارة إلكترونية يتحمل مليون مستخدم متزامن (CDN, Redis, Read Replicas, Message Queues)؟

---

## 6. مشاريع التخرج والمراجع ومسرح الأخطاء (Projects & Reference Hub)

### 1. مشروع التخرج الرئيسي ([`projects/rest-api.html`](file:///d:/work/projects/mern/projects/rest-api.html)):
مشروع كابستون متكامل لبناء **Production Auth & Data REST API** يدمج:
- تسجيل الدخول والتوثيق المزدوج (Access Token + Refresh Token Rotation في HttpOnly Cookies).
- معمارية 3-Tier (Controllers &rarr; Services &rarr; Repositories).
- هجرات قاعدة البيانات بـ Prisma وتخزين البيانات في PostgreSQL مع كاش Redis.
- اختبارات التكامل والوحدات (Jest & Supertest).

### 2. كتيبات الاختصار وأدلة الأخطاء التفاعلية (Reference & Error Playbooks):
* **React**: [`reference/react/cheatsheet.html`](file:///d:/work/projects/mern/reference/react/cheatsheet.html) و [`reference/react/errors.html`](file:///d:/work/projects/mern/reference/react/errors.html) (حلول 20 خطأ شائع مثل Maximum update depth exceeded).
* **MongoDB**: [`reference/mongodb/cheatsheet.html`](file:///d:/work/projects/mern/reference/mongodb/cheatsheet.html) و [`reference/mongodb/errors.html`](file:///d:/work/projects/mern/reference/mongodb/errors.html) (حلول BSONObjectTooLarge و IndexKeySpecsConflict).
* **PostgreSQL**: [`reference/postgresql/cheatsheet.html`](file:///d:/work/projects/mern/reference/postgresql/cheatsheet.html) و [`reference/postgresql/errors.html`](file:///d:/work/projects/mern/reference/postgresql/errors.html) (حلول Deadlock detected و Foreign key constraint violation).
* **Prisma**: [`reference/prisma/cheatsheet.html`](file:///d:/work/projects/mern/reference/prisma/cheatsheet.html) و [`reference/prisma/errors.html`](file:///d:/work/projects/mern/reference/prisma/errors.html) (دليل تشخيص جميع أكواد أخطاء P2000 حتى P2030).

---

## 7. معمارية ملفات الجافاسكربت والمحركات التفاعلية (JavaScript Engines)

تم تنظيم كود الجافاسكربت في وحدات معيارية نظيفة تشترك في النطاق العام `window.FSA`:

```
window.FSA = {
  theme:      /* إدارة المظهر الليلي والفاتح */,
  progress:   /* تخزين التقدم والـ XP في localStorage */,
  stepper:    /* محاكي الخطوات والمخططات المتحركة */,
  playground: /* محرر الأكواد والـ Web Worker */,
  quiz:       /* محرك الاختبارات والتصحيح الفوري */,
  search:     /* محرك البحث المعرب السريع Ctrl+K */,
  app:        /* التهيئة العامة وربط الـ Drawer والـ Shortcuts */
};
```

### تفاصيل الوحدات:
1. **`js/stepper.js`**: يدير حالة الخطوات، يربط الأزرار (السابق/التالي)، ويحدث نصوص الشرح ورسم الـ SVG المتزامن.
2. **`js/playground.js` & `js/worker-sandbox.js`**:
   - ينشئ `Worker('js/worker-sandbox.js')`.
   - يعيد توجيه `console.log` و `console.error` لطباعة المخرجات في واجهة المتصفح.
   - يوقف التنفيذ بعد 2000ms تلقائياً لحماية جهاز الطالب من الـ Infinite Loops.
3. **`js/quiz.js`**: يقرأ مصفوفة الأسئلة من وسوم JSON، يخلط الخيارات، يعرض الشرح الهندسي الفوري، ويحسب نقاط الـ XP.
4. **`js/progress.js`**: يحسب النسبة المئوية لإنجاز كل مسار، ويخزن معرفات الدروس المكتملة في `fsa_completed_lessons`.
5. **`js/search.js`**: يبحث في الـ 27 وثيقة المفهرسة مسبقاً، مع دعم تطبيع الأحرف العربية (إزالة الهمزات والتشكيل والمسافات الزائدة).

---

## 8. أدوات الفحص الآلي المستمر وتوليد الفهارس (Scripts & CI-Lite)

تعتمد المنصة على 4 سكربتات أساسية في مجلد `scripts/`:

| السكربت | الوظيفة | المعيار الإلزامي |
| :--- | :--- | :--- |
| **`check-content.mjs`** | فحص الجودة ومطابقة معايير الـ 17 عنصراً في جميع الدروس | اجتياز الفحص بـ **0 أخطاء و 0 تحذيرات** |
| **`gen-curriculum.mjs`** | قراءة وسوم `<meta name="fsa-*">` وتوليد `data/curriculum.js` | فهرسة الـ 18 درساً وتحديث أوقات القراءة |
| **`build-search-index.mjs`** | بناء فهرس البحث المرجح للغة العربية في `data/search-index.js` | فهرسة جميع الدروس والمشاريع والمراجع (27 وثيقة) |
| **`build-track-pages.mjs`** | توليد وتحديث صفحات فهارس المسارات `learn/<track>/index.html` | توليد الـ 8 مسارات بتصميم متناسق |

### الأمر الموحد للتحقق والتوليد:
```bash
node scripts/check-content.mjs; node scripts/gen-curriculum.mjs; node scripts/build-search-index.mjs; node scripts/build-track-pages.mjs
```

---

## 9. هندسة الصفحة الرئيسية ولوحة التحكم (index.html & dashboard.html)

### 1. قمرة القيادة الرئيسية ([`index.html`](file:///d:/work/projects/mern/index.html)):
* **سحابة الأورورا ثلاثية التدرج (`.aurora-1`, `.aurora-2`, `.aurora-3`)**.
* **محرك فيزياء النجوم التفاعلي (HTML5 Canvas Constellation Physics)** مع دعم الـ Retina Displays.
* **صندوق استئناف التعلم الذكي (Dynamic Resume Box)**: يقرأ آخر درس فتحه الطالب من `localStorage` ويعرض زر "متابعة من حيث توقفت".
* **شبكة المسارات الثمانية (8-Track Bento Grid)** مع فيزياء الإمالة ثلاثية الأبعاد (3D Card Tilt Physics) ومؤشرات التقدم الحية.

### 2. لوحة التحكم ومتابعة التقدم ([`dashboard.html`](file:///d:/work/projects/mern/dashboard.html)):
* حساب مستوى الطالب (Level 1 إلى Level 10) ونقاط الـ XP المكتسبة (100 XP لكل درس، 50 XP لكل اختبار).
* عداد الاستمرارية اليومية (Daily Streak Tracker).
* سجل الإنجازات والأوسمة المفتوحة (Mastery Badges).

---

## 10. الشجرة الكاملة للملفات والمجلدات (Complete File Tree)

```
d:/work/projects/mern/
├── mern-project-ref.md             # 🌟 مرجع المشروع الشامل (هذا الملف)
├── index.html                      # قمرة القيادة الرئيسية للمنصة
├── dashboard.html                  # لوحة متابعة التقدم ونقاط الـ XP
├── package.json                    # إعدادات المشروع والأوامر
│
├── assets/                         # الأيقونات والصور والخطوط المحلية
│   └── icons.svg                   # مكتبة الأيقونات الموحدة SVG Sprite (24 أيقونة)
│
├── css/                            # نظام التصميم المعياري (Obsidian Theme)
│   ├── tokens.css                  # متغيرات الألوان، المسافات، والخطوط
│   ├── base.css                    # القواعد العامة وعزل الاتجاهات RTL/LTR
│   ├── components.css              # تصميم البطاقات، الأزرار، والـ Badges
│   ├── layout.css                  # شبكة الـ Shell والـ Topbar والـ Sidebar
│   └── learning.css                # تصميم المحطات التسع، المحاكيات والمخططات
│
├── js/                             # محركات التفاعل وتجربة المستخدم
│   ├── fsa-namespace.js            # تهيئة النطاق العام window.FSA
│   ├── theme.js                    # إدارة المظهر الليلي والفاتح
│   ├── progress.js                 # تخزين التقدم والـ XP في localStorage
│   ├── stepper.js                  # محاكي الخطوات التفاعلي
│   ├── playground.js               # محاكي تشغيل الكود في Web Worker
│   ├── quiz.js & exercise.js       # محرك الاختبارات والتحديات
│   ├── search.js                   # محرك البحث السريع Ctrl+K
│   ├── worker-sandbox.js           # بيئة الـ Web Worker المعزولة
│   └── app.js                      # التهيئة العامة وربط الأحداث
│
├── data/                           # البيانات المولدة تلقائياً (Auto-Generated)
│   ├── curriculum.js               # كتالوج المنهج والدروس الـ 18
│   ├── search-index.js             # فهرس البحث الموزون (27 وثيقة)
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
│   │   ├── how-web-works.html
│   │   ├── js-essentials.html
│   │   ├── async-js.html
│   │   └── fetch-api.html
│   ├── react/                      # مسار ريآكت 19.2 (4 دروس + index.html)
│   │   ├── thinking-in-react.html
│   │   ├── use-state.html
│   │   ├── use-effect.html
│   │   └── reconciliation.html
│   ├── nodejs/                     # مسار نود جي إس 24 (3 دروس + index.html)
│   │   ├── what-node-is.html
│   │   ├── event-loop.html
│   │   └── streams-buffers.html
│   ├── express/                    # مسار إكسبريس 5.2 (3 دروس + index.html)
│   │   ├── hello-express.html
│   │   ├── middleware.html
│   │   └── rest-crud.html
│   ├── mongodb/                    # مسار مونجو دي بي 8 (درس + index.html)
│   │   └── document-model.html
│   ├── postgresql/                 # مسار بوستجرس 18 (درس + index.html)
│   │   └── relational-model.html
│   ├── prisma/                     # مسار بريزما 7 (درس + index.html)
│   │   └── what-is-an-orm.html
│   └── architecture/               # مسار المعمارية الشاملة (درس + index.html)
│       └── request-lifecycles.html
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

## 11. دليل المساهمة والتعليمات الدقيقة للذكاء الاصطناعي (AI Agent Prompt & Directives)

> **تعليمات صارمة للنماذج اللغوية (LLMs & Subagents) عند بدء أي جلسة عمل جديدة:**

1. **اعتبار هذا الملف هو المصدر الوحيد للحقيقة (Single Source of Truth)**.
2. **الالتزام بميثاق الـ Zero-Build**: لا تقترح أو تنشئ ملفات إعدادات لـ Webpack أو Vite أو Tailwind أو غيرها؛ الموقع يجب أن يظل نقياً ويعمل عبر `file:///` مباشرة.
3. **الالتزام بالسرد القصصي والدمج اللغوي**:
   - لا تفصل الإنجليزية عن العربية في فقرات ترجمة ميكانيكية.
   - اكتب بالعربية المصرية التقنية الحية التي تخاطب عقل الطالب مباشرة وتدمج المصطلحات التقنية بدقة.
4. **الالتزام بالمحطات التسع**:
   - أي درس جديد يجب أن يستنسخ هيكل [`templates/lesson-template.html`](file:///d:/work/projects/mern/templates/lesson-template.html) بالكامل.
5. **الفحص الآلي الإلزامي قبل إنهاء أي مهمة**:
   - يجب تشغيل الأمر التالي والتأكد من ظهور `0 warnings`:
   ```bash
   node scripts/check-content.mjs; node scripts/gen-curriculum.mjs; node scripts/build-search-index.mjs; node scripts/build-track-pages.mjs
   ```
6. **الرفع للمستودع**:
   - عند الانتهاء من العمل، قم بعمل `git add .` ثم `git commit` مع رسالة واصفة ثم `git push origin main`.
