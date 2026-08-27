# CodeHub (FullStack Academy — MERN & PostgreSQL Architecture)
# المرجع الهندسي الشامل والمعياري لتجربة التعلم التفاعلية وتصميم الدروس

> **Platform Name:** CodeHub · FullStack Academy (MERN & PostgreSQL Edition)  
> **Last Updated:** `2026-08-27T10:30:00+02:00`  
> **Repository:** `https://github.com/ozidan13/mern.git`  
> **Branch:** `main` / `codex/lesson-experience-overhaul`  
> **Target Audience:** Engineering Students, Platform Architects, Authors & AI Agents  
> **Architectural Contract:** Zero-Build, 100% Offline via `file:///`, Sandboxed Web Workers, Bidirectional RTL/LTR  
> **Core Mandate:** CodeHub lessons are not static documentation pages or scrollable articles. Every lesson is an **interactive learning masterpiece** combining live code, visual simulators, full-width layouts, and natural Egyptian Arabic mentorship.

---

## 📌 الفهرس العام الشامل (Table of Contents)

1. [الرؤية وفلسفة تجربة التعلم (Vision & Masterpiece Philosophy)](#1-الرؤية-وفلسفة-تجربة-التعلم-vision--masterpiece-philosophy)
2. [مبادئ تجربة المستخدم وتصميم الدروس (Lesson UX Principles)](#2-مبادئ-تجربة-المستخدم-وتصميم-الدروس-lesson-ux-principles)
3. [أنماط الأقسام التفاعلية (Interactive Section Patterns)](#3-أنماط-الأقسام-التفاعلية-interactive-section-patterns)
4. [قواعد العرض الكامل والتصميم المتجاوب (Full-Width Layout & Responsive Rules)](#4-قواعد-العرض-الكامل-والتصميم-المتجاوب-full-width-layout--responsive-rules)
5. [ميثاق السرد القصصي والدمج اللغوي (Content & Embedded Storytelling Charter)](#5-ميثاق-السرد-القصصي-والدمج-اللغوي-content--embedded-storytelling-charter)
6. [معايير محررات ومحاكيات الأكواد (Code Playground Conventions)](#6-معايير-محررات-ومحاكيات-الأكواد-code-playground-conventions)
7. [أنماط التحديات البرمجية والتغذية الراجعة (Exercise & Feedback Patterns)](#7-أنماط-التحديات-البرمجية-والتغذية-الراجعة-exercise--feedback-patterns)
8. [كتالوج العناصر المعمارية القابلة لإعادة الاستخدام (Reusable Lesson Primitives)](#8-كتالوج-العناصر-المعمارية-القابلة-لإعادة-الاستخدام-reusable-lesson-primitives)
9. [نظام التصميم والهوية البصرية (Obsidian Glassmorphism Design System)](#9-نظام-التصميم-والهوية-البصرية-obsidian-glassmorphism-design-system)
10. [معايير إتاحة الوصول والتدويل (Accessibility & Internationalization Standards)](#10-معايير-إتاحة-الوصول-والتدويل-accessibility--internationalization-standards)
11. [ميزانية الأداء وعقد العمل دون أدوات بناء (Performance & Zero-Build Contract)](#11-ميزانية-الأداء-وعقد-العمل-دون-أدوات-بناء-performance--zero-build-contract)
12. [دليل بناء درس جديد خطوة بخطوة (How to Create a New Lesson)](#12-دليل-بناء-درس-جديد-خطوة-بخطوة-how-to-create-a-new-lesson)
13. [دليل ترقية الدروس الحالية (How to Migrate Existing Lessons)](#13-دليل-ترقية-الدروس-الحالية-how-to-migrate-existing-lessons)
14. [هندسة المنهج الكامل: 106 دروس عبر 8 مسارات (Curriculum Reference)](#14-هندسة-المنهج-الكامل-106-دروس-عبر-8-مسارات-curriculum-reference)
15. [مشاريع التخرج والمراجع ومسرح الأخطاء (Projects & Reference Hub)](#15-مشاريع-التخرج-والمراجع-ومسرح-الأخطاء-projects--reference-hub)
16. [أدوات الفحص الآلي وبناء الفهارس (Validation Scripts & CI-Lite)](#16-أدوات-الفحص-الآلي-وبناء-الفهارس-validation-scripts--ci-lite)
17. [الشجرة الكاملة للمشروع (Complete File Tree)](#17-الشجرة-الكاملة-للمشروع-complete-file-tree)
18. [تعليمات وتوجيهات الذكاء الاصطناعي (AI Agent Operating Directives)](#18-تعليمات-وتوجيهات-الذكاء-الاصطناعي-ai-agent-operating-directives)

---

## 1. الرؤية وفلسفة تجربة التعلم (Vision & Masterpiece Philosophy)

### الهدف المحوري
بناء منصة تعليمية عربية استثنائية تقود الطالب من الصفر حتى مستوى مهندس برمجيات محترف (Production-Ready Senior Engineer) في بيئة MERN & PostgreSQL المتكاملة، دون الحاجة للبحث خارج المنصة إطلاقاً.

### ما الذي يميز درس CodeHub؟
الدرس في CodeHub ليس مقالاً يُقرأ أو توثيقاً جافاً؛ بل هو **رحلة استكشاف تفاعلية**.
- **اللمس والتجربة قبل التنظير:** الطالب يغير المعاملات ويرى انهيار النظام أو نجاحه قبل قراءة القوانين المجردة.
- **استيعاب 100% من المفهوم:** لا نكتفي بالتعريف السطحي، بل نكشف ما يحدث داخل الذاكرة ومحركات التشغيل (V8 Call Stack, libuv Thread Pool, React Fiber, PostgreSQL WAL).
- **الاستقلالية التامة (Zero-Build & 100% Offline):** المنصة تعمل فوراً وبسرعة فائقة عبر بروتوكول `file:///` وبدون أي اتصالات خارجية.

---

## 2. مبادئ تجربة المستخدم وتصميم الدروس (Lesson UX Principles)

### 1. إلغاء تجربة "المقال الطويل المائل للتمرير" (Anti-Scrollable Document)
يُمنع تصميم الدرس بنمط: `عنوان &larr; فقرة &larr; كود &larr; فقرة &larr; كود &larr; نهاية`. بدلاً من ذلك، يتحرك الطالب بين محطات تعليمية ذات مغزى:
```
سياق ومأزق واقعي ──→ استكشاف تفاعلي ──→ تجربة كود مباشر ──→ كشف كواليس التشغيل ──→ مقارنة الخطأ بالصواب ──→ تحدي تطبيقي ──→ تلخيص وإنتاج
```

### 2. استغلال كامل مساحة الشاشة (Full-Width Canvas Utilization)
لا تحبس المحتوى التفاعلي داخل عمود قراءة ضيق (700px). استخدم كامل عرض الشاشة المتاح لإنشاء:
- بيئات عمل منقسمة (Split-Screen IDEs & Previewers).
- مخططات تفاعلية عريضة (Interactive Visualizers).
- شاشات مقارنة جنبًا إلى جنب (Side-by-Side Code Diffs).

### 3. إيقاع مكافحة التشتت (Anti-Fatigue Rhythm Rule)
يُحظر كتابة أكثر من **300 إلى 400 كلمة نصية متواصلة** دون إدخال عنصر تفاعلي يكسر الرتابة (محاكي، كود للتعديل، لغز توقع، أو بطاقة مقارنة).

### 4. التغذية الراجعة الفورية (Instant Feedback Loops)
كل تجربة يقوم بها الطالب يجب أن تولد استجابة بصرية فورية (تغير ألوان، طباعة مخرجات الكونسول، تحديث واجهة العرض المباشر DOM Preview، أو تحليل رسائل الأخطاء).

---

## 3. أنماط الأقسام التفاعلية (Interactive Section Patterns)

تتكون دروس المنصة من 6 أنماط أقسام قياسية (`data-fsa-section="..."`):

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 1. Concept Split Section (data-fsa-section="concept")                            │
│    [ Prose Explanation & Context ] ─── [ Sticky Interactive Stepper / SVG ]       │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 2. Playground Section (data-fsa-section="playground")                            │
│    [ Code Editor (Worker Sandbox) ] ─── [ Output Tabs: Console / DOM / API ]     │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 3. Challenge Section (data-fsa-section="challenge")                              │
│    [ Task Spec & Tests ] ─── [ Student Code ] ─── [ Hint Ladder & Solutions ]    │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 4. Comparison Section (data-fsa-section="comparison")                            │
│    [ ❌ Common Anti-Pattern / Diff ] ─── [ ✅ Production Best Practice ]         │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 5. Exploration Canvas (data-fsa-section="exploration")                           │
│    [ Predict Before You Run / Drag-Drop Flow / Interactive Sliders ]             │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 6. Structured Recap Section (data-fsa-section="recap")                           │
│    [ Mastery Checkpoints ] ─── [ Senior Interview Q&A ] ─── [ Mini-Glossary ]    │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### تفاصيل الأنماط:
1. **Concept Split (`.fsa-section--split`):** تقسيم الشاشة لعمودين بنسب مدروسة (`--split-ratio: 1fr 1.2fr`). النصوص تشرح المنطق على جانب، بينما يبقى المحاكي البصري ثابتاً في الجانب المقابل أثناء التمرير.
2. **Playground (`.fsa-section--playground`):** بيئة تشغيل أكواد برمجية عريضة تدعم التبديل بين مخرجات الكونسول، العرض الحي لواجهات HTML/DOM، أو محاكي طلبات الـ HTTP.
3. **Challenge (`.fsa-section--immersive`):** تحديات كود حقيقية تعمل عبر `FSA.exercise` تفحص دقة مخرجات كود الطالب بـ Assertions وتتيح سلم تلميحات تدريجي من 3 مستويات.
4. **Comparison (`.fsa-section--contained`):** مقارنات كود بصرية بألوان واضحة تفصل الخطأ الكارثي عن الحل الهندسي المعتمد مع تشخيص الأسباب.
5. **Exploration (`.fsa-section--contained`):** صناديق التوقع قبل التشغيل (Predict Before You Run) لحث عقل الطالب على التفكير في المخرجات قبل كشفها.
6. **Recap & Production:** خلاصة الدرس، أسئلة مقابلات العمل الحقيقية لمستوى Senior، وقاموس المصطلحات البرمجية.

---

## 4. قواعد العرض الكامل والتصميم المتجاوب (Full-Width Layout & Responsive Rules)

### فك قيود الحاويات (CSS Breakout Mechanics)
تعتمد المنصة على فئات التوسعة البصرية للخروج من عمود `.fsa-article` الرئيسي بسلاسة ودون التسبب في تمرير أفقي:

```css
.fsa-section {
  width: 100vw;
  margin-inline-start: calc(-1 * (50vw - 50%));
  padding-block: var(--section-pad-y);
  padding-inline: var(--section-pad-x);
}
```

### وضع الانغماس الكامل (Immersive Mode)
عند رغبة الطالب في التفاعل مع محاكي ضخم أو بيئة كود عريضة، يدعم النظام وضع `data-immersive` على الحاوية `.fsa-shell`؛ حيث تتقلص القائمة الجانبية وشجرة المحتويات تلقائياً بانتقال CSS ناعم (<250ms)، مفسحة المجال لعرض المحتوى بكامل عرض الشاشة.

### نقاط التجاوب القياسية (Responsive Breakpoints):
- **Desktop عريض (≥1280px):** تخطيط ثلاثي الأعمدة (القائمة الجانبية 280px + المحتوى التفاعلي + فهرس On-This-Page 240px).
- **شاشات متوسطة (1024px – 1279px):** إخفاء فهرس الصفحة التلقائي والاحتفاظ بالقائمة الجانبية والمحتوى العريض.
- **أجهزة لوحية (768px – 1023px):** تحويل القائمة الجانبية لدرج جانبي منبثق (`.fsa-drawer`)، وتحويل الأقسام المنقسمة (Split Sections) لأعمدة رأسية متتالية.
- **شاشات الهواتف (320px – 767px):** إظهار شريط الملاحة السفلي الثابت (`.fsa-bottombar`)، ضبط مسافات الحشو، وتثبيت المحاكيات التفاعلية مع دعم اللمس.

---

## 5. ميثاق السرد القصصي والدمج اللغوي (Content & Embedded Storytelling Charter)

### 1. حظر تصنيف القصة الصريح (Strict Prohibition of Story Labels)
- **ممنوع منعاً باتاً** استخدام عناوين أو بطاقات مثل:
  - ❌ "Story Time" أو "وقت القصة"
  - ❌ "تشبيه من الواقع" أو "Analogy Section"
  - ❌ "دعنا نستمع لقصة" أو "Real-Life Story"
- **المعيار المطلوب:** السرد ينساب **ضمنياً وبشكل طبيعي** في صلب الشرح التقني. يشعر الطالب بالطابع البشري الممتع دون أن يشعر بأن النظام يعلن له أنه يحكي قصة.

### 2. نبرة الإرشاد الهندسي المصري (Egyptian Tech-Mentor Voice)
الكتابة تحاكي مهندس برمجيات مصري خبير يجلس معك يشرح لك المشكلة على أرض الواقع:
> *"خلينا نفترض إنك شغال على E-commerce platform وفجأة في Black Friday السيرفر وقع لأن كل Request بيعمل full table scan... هنا المشكلة مش في سرعة السيرفر، المشكلة في إننا محتاجين نفهم إزاي الـ Database Indexing شغال تحت الكابوت."*

### 3. العزل البرمجي للمصطلحات الإنجليزية (Bidi Isolation)
المصطلحات التقنية تُكتب بلغتها الإنجليزية الأصلية القياسية داخل الفقرة وتُعزل برمجياً داخل `<code dir="ltr">` لمنع تشوه المحاذاة أو اختلاط الحروف:
- مثل: `<code dir="ltr">Event Loop</code>`, `<code dir="ltr">Fiber Node</code>`, `<code dir="ltr">Connection Pool</code>`.
- الحفاظ على نسبة لغة عربية ≥ 40% في كل درس.

### 4. منهجية "المأزق أولاً قبل الحل" (Problem-First Pedagogy)
كل مفهوم يتبع الترتيب التالي:
1. **الكارثة البرمجية في بيئة العمل:** ما هو الـ Bug أو العطل الكارثي الذي سيحدث لو لم نستخدم هذا المفهوم؟
2. **تاريخ المعاناة:** كيف كانت الحلول القديمة تفشل؟
3. **لحظة الانفراجة:** الفكرة الهندسية الذكية التي حلت المعضلة.
4. **التطبيق والممارسة المباشرة:** كتابة الكود وتجربته.

---

## 6. معايير محررات ومحاكيات الأكواد (Code Playground Conventions)

تدعم بيئة `FSA.playground` ثلاثة أنماط تشغيل متخصصة:

### 1. نمط الكونسول المعزول (Console Output Mode)
- يعمل الكود داخل **Blob Web Worker** معزول تماماً عن كوكيز الصفحة والـ DOM.
- حماية أمان صارمة ومؤقت إيقاف إجباري عند **2500ms** لمنع تجميد المتصفح في الحلقات اللانهائية (`while(true)`).
- طباعة ملونة تميز مخرجات `log`, `warn`, `error`, و `table`.

### 2. نمط العرض الحي لواجهات الـ DOM (Live DOM Preview Mode)
- تشغيل أكواد HTML/CSS و JavaScript في إطار `<iframe sandbox="allow-scripts" srcdoc="...">`.
- تحديث تلقائي للواجهة مع كل تعديل بفاصل زمني مضاد للاهتزاز (Debounce 300ms).
- تمكين الطالب من رؤية استجابة الواجهة فورياً وتعديل الـ CSS والـ DOM بمرونة.

### 3. نمط محاكي طلبات الـ HTTP (REST API Inspector Mode)
- مخصص لمسارات Express و Node.js و Architecture.
- محاكاة إرسال طلبات الـ HTTP (`GET`, `POST`, `PUT`, `DELETE`) وعرض الـ Headers والـ Status Code وجسم الرد بصيغة JSON ملونة ومنظمة في شجرة قابلة للطي.

---

## 7. أنماط التحديات البرمجية والتغذية الراجعة (Exercise & Feedback Patterns)

### هيكل التحدي (`FSA.exercise`):
- **توصيف التحدي:** بيان المشكلة البرمجية والمدخلات والمخرجات المطلوبة بدقة.
- **كود البداية:** قالب كود يحتوي على دالة جاهزة ينتظر من الطالب كتابة منطقها الداخلي.
- **فحوصات التأكيد المؤتمتة (Test Assertions):** تشغيل كود الطالب ضد مجموعة اختبارات خفية ومعلنة.
- **سلم التلميحات التدريجي (3-Level Hint Ladder):**
  - *تلميح 1:* توجيه المفهوم العام وطريقة التفكير.
  - *تلميح 2:* تحديد الدوال أو الـ Built-in Methods المقترحة.
  - *تلميح 3:* هيكل كود مقترح (Pseudocode).
- **بوابة الحل النموذجي:** يُقفل كود الحل النهائي (🔒) ولا يُتاح كشفه إلا بعد قيام الطالب بمحاولة تشغيل الاختبارات لمرة واحدة على الأقل.

---

## 8. كتالوج العناصر المعمارية القابلة لإعادة الاستخدام (Reusable Lesson Primitives)

| الفئة / العنصر | المكون في CSS / JS | الوظيفة ودور التعلم |
| :--- | :--- | :--- |
| **قسم عريض** | `.fsa-section` | كسر عمود القراءة الضيق للتمدد بكامل الشاشة |
| **قسم منقسم** | `.fsa-section--split` | شاشة منقسمة لشرح نصي ومحاكي تفاعلي مثبت |
| **محرر أكواد** | `.fsa-playground` + `FSA.playground` | بيئة تعديل وتشغيل كود معزولة داخل Web Worker |
| **محاكي خطوات** | `.fsa-stepper` + `FSA.stepper` | محاكي خطوات تفاعلي بمتحكمات Play/Pause وشريط تمرير |
| **تشريح كود** | `.fsa-anatomy` + `.fsa-anatomy__line` | تفكيك أسطر الكود مع شروحات عربية تفاعلية عند التحويم |
| **معرض أخطاء** | `.fsa-mistakes-gallery` + `.fsa-mistake-card` | مقارنة بصرية بين الكود الخاطئ (أحمر) والسليم (أخضر) |
| **اختبار تقييمي** | `.fsa-checkpoint` + `FSA.quiz` | اختبار فوري متعدد الخيارات بتفسيرات هندسية وروابط تتبع |
| **بطاقات الأداء** | `.fsa-complexity-grid` + `.fsa-complexity-card` | بطاقات قياس تعقيد الوقت والذاكرة (Big-O Notation) |
| **صندوق التوقع** | `.fsa-experiment` | صندوق توقع النتيجة قبل التشغيل لتحفيز التفكير |
| **تنبيهات سياقية** | `.fsa-callout[data-kind="..."]` | بطاقات تنبيهية دلالية (معلومات، تحذيرات، أفخاخ برمجية) |
| **بطاقة مرحلة** | `.fsa-step-card` | بطاقات مرقمة بألوان المسار لشرح الخطوات المتسلسلة |

---

## 9. نظام التصميم والهوية البصرية (Obsidian Glassmorphism Design System)

### لوحة الألوان والمتغيرات (`css/tokens.css`):
- **الخلفيات العميقة:** `--bg-canvas: #090D16` (سواد أوبسيديان عميق مريح للعين).
- **الأسطح الزجاجية:** `--bg-surface: #0F1523`, `--bg-raised: #151D30` مع تأثير `backdrop-filter: blur(12px)`.
- **ألوان المسارات الثمانية:**
  - **Foundations:** `--track-found: #F59E0B` (كهرماني دافئ).
  - **React.js:** `--track-react: #38BDF8` (أزرق سماوي نيون).
  - **Node.js:** `--track-node: #84CC16` (أخضر ليموني حيوي).
  - **Express.js:** `--track-express: #A1A1AA` (زنك تقني).
  - **MongoDB:** `--track-mongo: #22C55E` (زمردي).
  - **PostgreSQL:** `--track-pg: #60A5FA` (أزرق ملكي).
  - **Prisma:** `--track-prisma: #818CF8` (إنديغو عصري).
  - **Architecture:** `--track-arch: #C084FC` (أرجواني معماري).

---

## 10. معايير إتاحة الوصول والتدويل (Accessibility & Internationalization Standards)

- **معايير WCAG 2.1 AA:** نسب تباين لا تقل عن 4.5:1 للنصوص الأساسية و 3:1 للعناصر الرسومية.
- **دعم قارئات الشاشة:** مناطق `aria-live="polite"` للإعلان عن تحديثات نتائج الأكواد ومراحل المحاكيات.
- **الملاحة بلوحة المفاتيح:**
  - `[` : الانتقال للدرس السابق.
  - `]` : الانتقال للدرس التالي.
  - `Ctrl + K` : فتح لوحة البحث السريع في المنهج.
  - `Tab` / `Shift+Tab` : التنقل السلس بين جميع الأزرار والمحررات ونقاط التقييم.
- **تفضيلات الحركة المنخفضة (`prefers-reduced-motion`):** إيقاف كافة الانتقالات والحركات التلقائية عند تفعيل خيار النظام.

---

## 11. ميزانية الأداء وعقد العمل دون أدوات بناء (Performance & Zero-Build Contract)

1. **الاستغناء الكامل عن أدوات البناء:** لا يوجد Webpack, Vite, Babel, أو Tailwind CLI. التعديل في أي ملف ينعكس لحظياً بعمل Refresh.
2. **السرعة الفائقة (Sub-50ms Paint):** كود Vanilla JS خفيف ونقي بدون أطر عمل ضخمة في الواجهة.
3. **حجم الملفات المستهدف:** حجم ملف الدرس لا يتجاوز 90KB عند الضغط لضمان التحميل الفوري حتى على أضعف الشبكات.
4. **حفظ التقدم المحلي:** جميع نتائج الاختبارات ونقاط الـ XP ومسودات الأكواد تُحفظ تلقائياً في `localStorage` دون الحاجة لأي خادم خلفي.

---

## 12. دليل بناء درس جديد خطوة بخطوة (How to Create a New Lesson)

1. **استنساخ القالب المعياري:** انسخ `templates/lesson-template.html` إلى مجلد المسار المعني داخل `learn/<track>/<slug>.html`.
2. **ضبط وسوم الـ Metadata:**
   ```html
   <meta name="fsa-track" content="react">
   <meta name="fsa-lesson" content="custom-hooks">
   <meta name="fsa-level" content="2">
   <meta name="fsa-order" content="14">
   <meta name="fsa-title" content="Building Custom Hooks: Logic Extraction & Composition">
   <meta name="fsa-est-minutes" content="22">
   ```
3. **صياغة المدخل القصصي المدمج:** ابدأ بمشكلة كود واقعية في الإنتاج دون كتابة عناوين "قصة".
4. **بناء المحطة البصرية:** أنشئ محاكياً تفاعلياً (`FSA.stepper`) يوضح حركة البيانات في الذاكرة.
5. **تضمين محرر الكود التفاعلي:** جهز كود بداية قابل للتعديل والتنفيذ الفوري داخل `FSA.playground`.
6. **إضافة قسم المقارنة والأخطاء الشائعة:** أضف بطاقات كود Bad vs Good توضح الفخاخ البرمجية.
7. **إعداد بنك الأسئلة التقويمية:** أضف أسئلة الـ Checkpoint بصيغة JSON مع شروحات عربية.
8. **فحص الجودة الآلي:** شغّل `node scripts/check-content.mjs` وتأكد من تحقيق `0 errors, 0 warnings`.
9. **تحديث الفهارس:** شغّل سكربتات التوليد لتحديث `curriculum.js` وفهرس البحث.

---

## 13. دليل ترقية الدروس الحالية (How to Migrate Existing Lessons)

عند ترقية أي درس من الدروس القديمة إلى منظومة CodeHub الجديدة:
1. **استبدال الحاويات الضيقة بأقسام عريضة:** تحويل أقسام الشرح إلى `<section class="fsa-section fsa-section--split">` أو `<section class="fsa-section fsa-section--contained">` مع إضافة سمة `data-fsa-section="..."`.
2. **إزالة عناوين السرد الصريحة:** مسح عناوين مثل `1. القصة والتشبيه الواقعي · The Core Story` ودمج محتوى التشبيه كافتتاحية هندسية طبيعية.
3. **توسيع المحاكيات والمحررات:** ترقية المحاكيات البسيطة لتدعم العرض العريض والتحكم التفاعلي بالمدخلات.
4. **ربط نظام الملاحة النقطي:** التأكد من تزويد الأقسام بوسوم `data-fsa-section-label="اسم المحطة"` لظهورها في شريط الملاحة العلوي.

---

## 14. هندسة المنهج الكامل: 106 دروس عبر 8 مسارات (Curriculum Reference)

| # | المسار | الاسم العربي | عدد الدروس | اللون المميز | المجلد |
|---|---|---|:---:|---|---|
| **1** | Web & JavaScript Foundations | أساسيات الويب والجافاسكربت الحديثة | **16** | `#F59E0B` Amber | `learn/foundations/` |
| **2** | React.js 19 Modern Frontend | ريآكت 19 وهندسة الواجهات | **18** | `#38BDF8` Sky | `learn/react/` |
| **3** | Node.js 24 Runtime & Ecosystem | بيئة تشغيل نود جي إس 24 | **14** | `#84CC16` Lime | `learn/nodejs/` |
| **4** | Express.js 5 Server & APIs | خوادم إكسبريس 5 والـ REST APIs | **14** | `#A1A1AA` Zinc | `learn/express/` |
| **5** | MongoDB 8 NoSQL Engine | قواعد بيانات المستندات مونجو دي بي | **10** | `#22C55E` Green | `learn/mongodb/` |
| **6** | PostgreSQL 18 Relational DB | الأنظمة العلائقية بوستجرس 18 | **10** | `#60A5FA` Blue | `learn/postgresql/` |
| **7** | Prisma 7 Type-Safe ORM | طبقة البيانات الآمنة بريزما 7 | **10** | `#818CF8` Indigo | `learn/prisma/` |
| **8** | Full-Stack Architecture | المعمارية الشاملة وهندسة الإنتاج | **14** | `#C084FC` Purple | `learn/architecture/` |
| | **المجموع الكلي** | **المنهج الشامل المتكامل** | **106** | | |

---

## 15. مشاريع التخرج والمراجع ومسرح الأخطاء (Projects & Reference Hub)

### 1. مشاريع التخرج المتكاملة (`projects/`):
- **Project 1: Production Auth & Data REST API (`projects/rest-api.html`)** — Express 5 + Prisma 7 + PostgreSQL 18 + JWT.
- **Project 2: React Dashboard SPA (`projects/react-dashboard.html`)** — React 19 + Zustand + Router v7.
- **Project 3: Real-Time Chat & Collab Platform (`projects/realtime-chat.html`)** — MERN + Socket.IO + Redis.

### 2. مركز المراجع وأدلة تشخيص الأخطاء (`reference/`):
يحتوي على 16 صفحة مرجعية تفاعلية (8 جداول اختصار سريعة + 8 أدلة لتشخيص وحل أكثر من 150 خطأ برمجي شهير عبر كافة تقنيات المنهج).

---

## 16. أدوات الفحص الآلي وبناء الفهارس (Validation Scripts & CI-Lite)

```bash
# الأمر الموحد الشامل لفحص الجودة وبناء كافة الفهارس:
node scripts/check-content.mjs && \
node scripts/gen-curriculum.mjs && \
node scripts/build-search-index.mjs && \
node scripts/build-track-pages.mjs
```

### معايير الـ 17 بنداً لفحص الجودة (`check-content.mjs`):
1. صحة واكتمال وسوم الـ Metadata الستة.
2. وجود قسمين على الأقل من نمط `[data-fsa-section]`.
3. خلو المحتوى تماماً من عناوين السرد الصريحة ("قصة", "Story Time").
4. احتواء الدرس على محاكي كود تفاعلي نشط (`.fsa-playground`).
5. احتواء الدرس على محاكي خطوات بصرية (`.fsa-stepper` أو SVG متحرك).
6. تشريح الكود البرمجي سطراً بسطر (`.fsa-anatomy`).
7. معرض الأخطاء الشائعة ومقارنات Bad vs Good (`.fsa-mistakes-gallery`).
8. اختبار التقييم المعرفي التفاعلي (`.fsa-checkpoint`).
9. فقرة أسئلة المقابلات ونقاط الإنتاج (`.fsa-details`).
10. نسبة الكلمات العربية الفصيحة في الشرح ≥ 40%.
11. خلو الملف بنسبة 100% من أي روابط CDN أو اتصالات شبكية خارجية.
12. نسبية جميع مسارات الملفات الداخلية (`../../`).
13. صحة مراجع أيقونات الـ SVG Sprite.
14. التسلسل الهرمي الدلالي للعناوين (H1 &rarr; H2 &rarr; H3).
15. وجود زر تبديل القائمة الجانبية للشاشات الصغيرة.
16. وجود رابط التخطي للوصول السريع (`.fsa-skip-link`).
17. وجود حاوية فهرس محتويات الصفحة (`.fsa-toc`).

---

## 17. الشجرة الكاملة للمشروع (Complete File Tree)

```
f:/work/mern/
├── mern-project-ref.md             # 🌟 المرجع الهندسي الشامل للمشروع (هذا الملف)
├── index.html                      # الصفحة الرئيسية وقمرة القيادة للمنصة
├── dashboard.html                  # لوحة متابعة إنجاز الطالب ونقاط الـ XP
├── playground.html                 # محرر الأكواد الشامل المستقل
├── search.html                     # واجهة البحث الشامل المعرب في المنهج
├── package.json                    # إعدادات وأوامر المشروع
│
├── assets/                         # الأيقونات والخطوط المحلية
│   └── icons.svg                   # مكتبة الأيقونات الموحدة SVG Sprite
│
├── css/                            # نظام التصميم المعياري (Obsidian Glassmorphism)
│   ├── tokens.css                  # متغيرات الألوان والمسافات والخطوط
│   ├── base.css                    # القواعد العامة وعزل الاتجاهات RTL/LTR
│   ├── components.css              # تصميم البطاقات، الأزرار، والـ Badges
│   ├── layout.css                  # شبكة الـ Shell وتوسعة الأقسام العريضة
│   └── learning.css                # تصميم الأقسام التفاعلية والمحاكيات
│
├── js/                             # محركات التفاعل وتجربة المستخدم
│   ├── fsa-namespace.js            # تهيئة النطاق العام window.FSA
│   ├── theme.js                    # إدارة المظهر الليلي والفاتح
│   ├── progress.js                 # تخزين التقدم والـ XP في localStorage
│   ├── sections.js                 # إدارة الأقسام التفاعلية وشريط الملاحة
│   ├── stepper.js                  # محاكي الخطوات والمخططات المتحركة
│   ├── playground.js               # محاكي تشغيل الكود في Web Worker وعرض الـ DOM
│   ├── exercise.js                 # محرك التحديات البرمجية وفحص الاختبارات
│   ├── quiz.js                     # محرك الاختبارات السريعة والتصحيح الفوري
│   ├── search.js                   # محرك البحث السريع المعرب Ctrl+K
│   └── app.js                      # التهيئة العامة وربط الـ Drawer والـ Shortcuts
│
├── data/                           # البيانات المولدة تلقائياً
│   ├── curriculum.js               # كتالوج المنهج والـ 106 دروس
│   ├── search-index.js             # فهرس البحث الموزون
│   ├── technologies.js             # بيانات التقنيات والإصدارات
│   └── tips.js                     # نصائح وطرائف المطورين
│
├── docs/                           # وثائق التخطيط والمعمارية
│   └── MASTERPLAN.md               # 🚀 الخطة التنفيذية ولوحة متابعة المراحل
│
├── templates/                      # القوالب القياسية
│   └── lesson-template.html        # القالب الذهبي التفاعلي بنظام RTL/LTR
│
├── learn/                          # مسارات المنهج الـ 8 (106 دروس)
│   ├── foundations/                # مسار الأساسيات (16 درساً)
│   ├── react/                      # مسار ريآكت 19 (18 درساً)
│   ├── nodejs/                     # مسار نود جي إس 24 (14 درساً)
│   ├── express/                    # مسار إكسبريس 5 (14 درساً)
│   ├── mongodb/                    # مسار مونجو دي بي 8 (10 دروس)
│   ├── postgresql/                 # مسار بوستجرس 18 (10 دروس)
│   ├── prisma/                     # مسار بريزما 7 (10 دروس)
│   └── architecture/               # مسار المعمارية والإنتاج (14 درساً)
│
├── projects/                       # مشاريع التخرج الكبرى (3 مشاريع)
│   ├── rest-api.html
│   ├── react-dashboard.html
│   └── realtime-chat.html
│
├── reference/                      # مركز المراجع وأدلة تشخيص الأخطاء (16 صفحة)
│   ├── javascript/
│   ├── react/
│   ├── nodejs/
│   ├── express/
│   ├── mongodb/
│   ├── postgresql/
│   ├── prisma/
│   └── git/
│
└── scripts/                        # أدوات الفحص والتوليد
    ├── check-content.mjs           # فحص الجودة ومطابقة معايير الـ 17 عنصراً
    ├── gen-curriculum.mjs          # توليد data/curriculum.js
    ├── build-search-index.mjs      # توليد data/search-index.js
    └── build-track-pages.mjs       # توليد صفحات learn/<track>/index.html
```

---

## 18. تعليمات وتوجيهات الذكاء الاصطناعي (AI Agent Operating Directives)

> **تعليمات ملزمة لكافة النماذج اللغوية والوكلاء الذكيين:**

1. **المرجعية الثنائية الموحدة:** هذا الملف (`mern-project-ref.md`) مع (`docs/MASTERPLAN.md`) هما المرجعان الهندسيان الحاكمان لكل ما يتم بناؤه في المشروع.
2. **صناعة تجارب وليس كتابة مقالات:** عند بناء أو تعديل أي درس، اسأل نفسك دائماً: *"كيف يتفاعل الطالب مع هذا المفهوم عملياً قبل قراءة الشرح؟"*.
3. **الالتزام بالسرد المدمج وبنبرة المهندس المصري:** ممنوع استخدام عبارات روبوتية جافة أو وضع عناوين للقصة.
4. **قدسية عقد الـ Zero-Build والـ Offline:** لا تقترح أبداً أي مكتبات تتطلب أدوات حزم (npm build) أو روابط CDN خارجية.
5. **الفحص الآلي الإلزامي:** قبل إنهاء أي مهمة، شغّل أمر الـ CI-Lite وتأكد من الحصول على `0 errors, 0 warnings`.

---
*End of Master Reference — CodeHub Interactive Learning Platform*
