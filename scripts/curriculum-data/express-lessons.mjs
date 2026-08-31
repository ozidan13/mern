/* ============================================================
   scripts/curriculum-data/express-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 4: Express.js 5 Production Server & APIs (All 11 Lessons).
   ============================================================ */

export const expressLessons = [
  {
    slug: 'routing-params',
    title: 'Express 5 Routing, Route Parameters, Query Strings & Sub-Routers',
    titleAr: 'توجيه المسارات في إكسبريس 5، معاملات الـ URL وتفريغ الموجهات الفرعية',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'Express 5.2',
    pattern: 'Modular Routing & Route Tree',
    objectives: [
      'فهم مطابقة المسارات ومعاملات الـ URL الديناميكية (req.params) واستعلامات البحث (req.query).',
      'تقسيم مسارات التطبيق إلى موجهات فرعية معيارية (express.Router) قابلة لإعادة الاستخدام.',
      'استخدام وسيط router.param() للتحقق التلقائي المسبق من المعاملات وحقن الكائنات في req.',
      'فهم تحسينات مطابقة المسارات الجديدة في Express 5 المبنية على path-to-regexp الحديث.'
    ],
    problemOpening: `
      في تطبيقات الـ REST API الحقيقية، وضع كل المسارات في ملف <code dir="ltr">server.js</code> واحد ينشئ ملفاً عملاقاً يتجاوز 3000 سطر، غير قابل للقراءة أو الصيانة، ويجعل التعاون بين أعضاء الفريق كابوساً ممتلئاً بتعارضات Git (Merge Conflicts).
      إكسبريس 5 توفر صنف **express.Router()** كـ "تطبيق إكسبريس مصغر معزول" (Mini-Application) يتيح لك تجميع مسارات كل كيان (مثل users و products و orders) في ملف مستقل تماماً.
      بالإضافة إلى ذلك، توفر إكسبريس مطابقة مسارات ديناميكية ذكية:
      - مسارات المعاملات: <code dir="ltr">/api/v1/users/:userId/posts/:postId</code>
      - سلاسل الاستعلام: <code dir="ltr">/api/v1/products?category=electronics&sort=price_desc&limit=20</code>
      في هذا الدرس، هنتعلم إزاي نبني شجرة توجيه معيارية للمشاريع الكبرى، إزاي نستخدم <code dir="ltr">router.param()</code> لمنع تكرار استعلامات الـ Database، ولماذا يجب الانتباه لترتيب كتابة المسارات الثابتة قبل الديناميكية.
    `,
    mechanics: [
      { step: '01', title: 'إنشاء الموجهات الفرعية المعيارية (Modular Routers)', desc: 'إنشاء ملفات توجيه منفصلة واستيرادها وربطها بالمسار الرئيسي app.use("/api/v1/users", userRouter).' },
      { step: '02', title: 'استخراج المعاملات الديناميكية (Dynamic Route Params)', desc: 'استخراج القيم المتغيرة المحددة بنقطتين (:id) وتخزينها تلقائياً في كائن req.params.' },
      { step: '03', title: 'الفرز والتصفية بسلاسل الاستعلام (Query Strings)', desc: 'تحليل المتغيرات الممررة بعد علامة ? للفرز والتصفية والترقيم داخل req.query.' },
      { step: '04', title: 'المعالجة المسبقة للمعاملات بـ router.param()', desc: 'اعتراض معامل معين (مثل :userId) والبحث عن الكائن في الداتابيز وحفظه في req.targetUser قبل وصول الطلب للمسار.' },
      { step: '05', title: 'دمج معاملات الموجهات المتداخلة (mergeParams: true)', desc: 'تفعيل { mergeParams: true } في الموجهات الفرعية للوصول لمعاملات الموجه الأب (مثل :userId في مسارات posts).' }
    ],
    playgroundCode: `// محاكي مطابقة مسارات إكسبريس مع router.param
const dbUsers = new Map([[ "101", { id: "101", name: "Sarah", role: "admin" } ]]);

function mockRouterParam(paramName, req, paramValue) {
  if (paramName === "userId") {
    const user = dbUsers.get(paramValue);
    if (!user) throw new Error("404 User Not Found");
    req.targetUser = user; // حقن الكائن مسبقاً
    console.log(\`✅ router.param Pre-fetched User: [\${user.name}]\`);
  }
}

const req = { params: { userId: "101" } };
mockRouterParam("userId", req, req.params.userId);
console.log("Route Handler executes with preloaded req.targetUser:", req.targetUser);`,
    experimentQuestion: 'ماذا يحدث إذا عرفت مسار app.get("/users/me") بعد مسار app.get("/users/:id") في كود إكسبريس؟',
    experimentAnswer: 'إكسبريس تطابق المسارات بالترتيب الصارم من الأعلى للأسفل. عندما يطلب العميل /users/me، ستطابق إكسبريس المسار الأول /users/:id وتعتبر كلمة "me" قيمة المعامل id (req.params.id = "me")، ولن يصل الطلب أبداً لمسار /users/me! لذلك يجب دائماً كتابة المسارات الثابتة والمحددة قبل المسارات الديناميكية.',
    codeAnatomy: [
      { line: 'import express from "express";', note: 'استيراد إكسبريس' },
      { line: 'const router = express.Router({ mergeParams: true });', note: 'إنشاء موجه مع تمكين دمج معاملات الأب' },
      { line: 'router.param("id", async (req, res, next, id) => {', note: 'وسيط فحص المعامل المسبق' },
      { line: '  req.resource = await db.findById(id);', note: 'جلب المورد وحقنه في كائن الطلب' },
      { line: '  if (!req.resource) return res.status(404).json({ error: "Not found" });', note: 'حماية الموارد غير الموجودة' },
      { line: '  next();', note: 'تمرير الطلب للمسار النهائي' },
      { line: '});', note: 'نهاية param' },
      { line: 'router.get("/:id", (req, res) => res.json(req.resource));', note: 'مسار العرض المباشر' }
    ],
    pitfallBad: `// خطأ شائع مسبب لتعطيل المسارات الثابتة
router.get("/users/:id", getUserById);
router.get("/users/settings", getSettings); // لن يتم استدعاؤه أبداً لأن :id يلتقطه قبله!`,
    pitfallGood: `// الحل الصحيح: تقديم المسارات الثابتة أولاً
router.get("/users/settings", getSettings); // يطابق أولاً
router.get("/users/:id", getUserById); // يطابق المعرفات الأخرى`,
    pitfallDiagnosis: 'محرك مطابقة المسارات في إكسبريس يتبع قاعدة First-Match-Wins، لذلك يجب وضع القواعد الأكثر تخصيصاً في البداية.',
    quizPool: [
      {
        q: 'Which property of the Express `req` object contains dynamic URL path parameters like `/:userId`?',
        qAr: 'أي خاصية في كائن req تحتوي على معاملات مسار الـ URL الديناميكية مثل `/:userId`؟',
        options: ['req.params', 'req.body', 'req.query', 'req.headers'],
        correct: 0,
        why: 'req.params contains an object of key/value pairs parsed from dynamic route parameters (:param).',
        whyAr: 'خاصية req.params تحتوي على كائن يحمل المعاملات المستخرجة من مسار الـ URL الديناميكي.'
      },
      {
        q: 'Why should you enable { mergeParams: true } when instantiating nested Express sub-routers?',
        qAr: 'لماذا يجب تفعيل خيار { mergeParams: true } عند إنشاء موجهات فرعية متداخلة؟',
        options: [
          'Preserves and exposes parent route parameters (e.g. :userId in /users/:userId/posts) to the child router.',
          'Makes the router execute in parallel threads.',
          'Automatically validates JSON bodies.',
          'Enables HTTPS encryption.'
        ],
        correct: 0,
        why: 'mergeParams ensures that child routers inherit path parameters declared in parent router mounts.',
        whyAr: 'يضمن وصول الموجه الفرعي للمعاملات المعرفة في مسار الموجه الأب مثل :userId.'
      },
      {
        q: 'Where are URL search query values (e.g. ?search=react&page=2) populated in Express?',
        qAr: 'أين يتم تخزين قيم استعلامات البحث في الرابط (مثل ?search=react&page=2) داخل إكسبريس؟',
        options: ['req.query', 'req.params', 'req.body', 'req.searchParams'],
        correct: 0,
        why: 'Express parses URL query strings into the req.query object automatically.',
        whyAr: 'تقوم إكسبريس بتحليل متغيرات السلسلة الاستعلامية وتخزينها تلقائياً داخل كائن req.query.'
      },
      {
        q: 'What is the purpose of router.param("paramName", middleware)?',
        qAr: 'ما هي الفائدة الأساسية لوسيط router.param("paramName", middleware)؟',
        options: [
          'Executes shared pre-processing logic (like DB lookups) once whenever a specific route param is present in the URL.',
          'Encrypts URL parameters.',
          'Forces the parameter to be an integer.',
          'Deletes the parameter from req.'
        ],
        correct: 0,
        why: 'router.param centralizes validation and resource pre-fetching for repeated route parameters, adhering to DRY principles.',
        whyAr: 'يوحد منطق التحقق المسبق وجلب الموارد من الداتابيز لأي مسار يحتوي على المعامل المحدد.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي خادم إكسبريس من هجمات HTTP Parameter Pollution (HPP) عندما يرسل العميل معلمات مكررة مثل ?role=user&role=admin؟',
    interviewA: 'عند إرسال معلمات مكررة، تقوم إكسبريس افتراضياً بتحويل req.query.role إلى مصفوفة ["user", "admin"] بدلاً من نص! لو كان كودك يفحص if (req.query.role === "admin")، فقد يفشل، لكن لو كان يمررها لاستعلام قاعدة بيانات، فقد يتسبب في ثغرة أمنية أو خطأ في النوع. لحماية الخادم: نستخدم وسيط hpp (HTTP Parameter Pollution middleware) لتطهير الاستعلامات وحصرها في قيمة نصية واحدة، أو نفحص المدخلات بمخططات Zod الصارمة z.string().'
  },
  {
    slug: 'req-res-lifecycle',
    title: 'Request-Response Lifecycle: Headers, Cookies, Streams & Content Negotiation',
    titleAr: 'دورة حياة الطلب والاستجابة: الرؤوس، الكوكيز، التدفقات والتفاوض على المحتوى (Content Negotiation)',
    level: 1,
    order: 4,
    estMinutes: 30,
    version: 'Express 5.2',
    pattern: 'Lifecycle Pipeline & HTTP Protocols',
    objectives: [
      'تتبع الرحلة الكاملة لطلب HTTP منذ لحظة وصوله وحتى إرسال بايتات الرد وإغلاق الاتصال.',
      'التحكم في رؤوس الأمان (Security Headers) ورؤوس الكاش (Cache-Control, ETag, 304 Not Modified).',
      'إدارة ملفات تعريف الارتباط الآمنة (Secure Cookies) بخصائص HttpOnly و SameSite و Secure.',
      'تطبيق التفاوض على المحتوى (Content Negotiation) عبر req.accepts() لدعم JSON و XML و CSV.'
    ],
    problemOpening: `
      الكثير من المطورين يعاملون إكسبريس كصندوق أسود: يكتب <code dir="ltr">app.get('/data', (req, res) => res.json(data))</code> ويفترض أن السحر ينتهي هنا.
      لكن في الأنظمة الإنتاجية الكبرى، دورة حياة الطلب هي سلسلة دقيقة من المراحل:
      1. مرحلة قراءة الرؤوس والتحقق من التشفير والـ Content-Type.
      2. مرحلة التفاوض على المحتوى (Content Negotiation): هل يطلب العميل بيانات بصيغة JSON أم صفحة HTML أم ملف CSV؟
      3. مرحلة الكوكيز والجلسات: هل الكوكيز محمية بـ <code dir="ltr">HttpOnly</code> لمنع سرقتها عبر ثغرات XSS، ومضبوطة بـ <code dir="ltr">SameSite=Strict</code> لمنع هجمات CSRF؟
      4. مرحلة التحقق من الكاش عبر الـ ETag: لو لم تتغير البيانات، لماذا نرسل 500KB عبر الشبكة بينما يمكننا إرجاع كود <code dir="ltr">304 Not Modified</code> في 0 بايت؟
      في هذا الدرس، هنفكك دورة حياة الطلب والاستجابة بالكامل، وهنتعلم إزاي نتحكم في كل بايت يخرج من الخادم.
    `,
    mechanics: [
      { step: '01', title: 'استقبال وفك تغليف الرؤوس (Headers Parsing)', desc: 'قراءة الرؤوس القياسية عبر req.get("Authorization") والتعامل مع حالات الأحرف غير الحساسة (Case-Insensitive).' },
      { step: '02', title: 'التفاوض على المحتوى عبر req.accepts()', desc: 'فحص رأس Accept وإرجاع التنسيق المفضل للعميل (JSON/XML/HTML) تلقائياً.' },
      { step: '03', title: 'تعيين الكوكيز المؤمنة (HttpOnly, Secure, SameSite)', desc: 'استخدام res.cookie() مع تفعيل HttpOnly لمنع وصول JavaScript للكوكيز و SameSite=Strict لمنع الـ CSRF.' },
      { step: '04', title: 'إدارة الكاش الذكي بـ ETag و 304 Not Modified', desc: 'إكسبريس تولد بصمة ETag تلقائياً وتفحص If-None-Match لإرجاع 304 بدون إرسال جسم البيانات إذا لم تتغير.' },
      { step: '05', title: 'التدفق اللاتزامني وتفريغ الاستجابة (Stream Piping)', desc: 'إرسال الملفات والتقارير الضخمة بـ stream.pipe(res) لمنع تراكم الذاكرة وإغلاق الاتصال بنظافة.' }
    ],
    playgroundCode: `// محاكي التفاوض على المحتوى والكاش الذكي
function handleContentNegotiation(req, res, data) {
  const acceptHeader = req.headers["accept"] || "application/json";

  if (acceptHeader.includes("application/json")) {
    console.log("Serving JSON format to client");
    res.type = "application/json";
    res.body = JSON.stringify(data);
  } else if (acceptHeader.includes("text/csv")) {
    console.log("Serving CSV format to client");
    res.type = "text/csv";
    res.body = "id,name\\n1,Sarah\\n2,Ahmed";
  }
}

const req = { headers: { accept: "text/csv" } };
const res = {};
handleContentNegotiation(req, res, [{ id: 1, name: "Sarah" }]);
console.log("Response Content-Type:", res.type);`,
    experimentQuestion: 'لماذا يعتبر تخزين رموز المصادقة (JWT) في HttpOnly Cookies أكثر أماناً بمراحل من تخزينها في localStorage داخل المتصفح؟',
    experimentAnswer: 'البيانات المخزنة في localStorage يمكن قراءتها وسرقتها بواسطة أي كود جافاسكريبت يعمل في الصفحة (مما يجعلها عرضة للسرقة فوراً عند حدوث أي ثغرة XSS). أما الـ HttpOnly Cookies، فإن المتصفح يمنع كود JavaScript تماماً من قراءتها (document.cookie لن يعيدها)، ويرسلها المتصفح تلقائياً ومباشرة مع طلبات الـ HTTP إلى الخادم بأمان تام.',
    codeAnatomy: [
      { line: 'res.cookie("token", jwtToken, {', note: 'تعيين كوكيز المصادقة' },
      { line: '  httpOnly: true, // حماية من هجمات XSS', note: 'منع قراءة الكوكيز عبر JavaScript' },
      { line: '  secure: process.env.NODE_ENV === "production",', note: 'الإرسال عبر اتصالات HTTPS المشفرة فقط' },
      { line: '  sameSite: "strict", // حماية من هجمات CSRF', note: 'حظر إرسال الكوكيز في الطلبات العابرة للمواقع' },
      { line: '  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 أيام', note: 'تحديد فترة صلاحية الكوكيز' },
      { line: '});', note: 'نهاية إعدادات الكوكيز' }
    ],
    pitfallBad: `// خطأ أمني فادح: تعيين كوكيز حساسة بدون حماية HttpOnly
res.cookie("sessionId", id); // يمكن سرقتها بسهولة عبر كود XSS خبيث!`,
    pitfallGood: `// الحل الأمني المعتمد
res.cookie("sessionId", id, { httpOnly: true, secure: true, sameSite: "lax" });`,
    pitfallDiagnosis: 'الكوكيز غير المحمية بـ HttpOnly تكون مكشوفة لأي سكربت خبيث في الصفحة، مما يتيح للمهاجمين انتحال شخصية المستخدمين.',
    quizPool: [
      {
        q: 'What is the security purpose of the "httpOnly: true" cookie attribute?',
        qAr: 'ما هو الغرض الأمني لخاصية "httpOnly: true" في ملفات الكوكيز؟',
        options: [
          'Prevents client-side JavaScript (e.g. document.cookie) from accessing the cookie, mitigating XSS token theft.',
          'Restricts cookie transmission to HTTP port 80 only.',
          'Forces the cookie to expire when the browser tab closes.',
          'Encrypts cookie contents with AES-256.'
        ],
        correct: 0,
        why: 'HttpOnly prevents scripts from reading sensitive session cookies during Cross-Site Scripting (XSS) attacks.',
        whyAr: 'تمنع كود جافاسكريبت في المتصفح من قراءة الكوكيز الحساسة لحمايتها من السرقة عند حدوث هجمات XSS.'
      },
      {
        q: 'What HTTP status code does Express return when ETag matches the client If-None-Match header?',
        qAr: 'ما هو كود حالة HTTP الذي ترجعه إكسبريس عندما يتطابق الـ ETag مع رأس If-None-Match القادم من العميل؟',
        options: ['304 Not Modified', '200 OK', '204 No Content', '301 Moved Permanently'],
        correct: 0,
        why: '304 Not Modified tells the client that the cached copy is still valid, saving bandwidth by omitting response body.',
        whyAr: 'كود 304 يخبر العميل بأن نسخته المخزنة في الكاش ما زالت صالحة ويوفر استهلاك الباندويث بعدم إرسال البيانات مجدداً.'
      },
      {
        q: 'How does Content Negotiation work using req.accepts() in Express?',
        qAr: 'كيف تعمل ميزة التفاوض على المحتوى باستخدام req.accepts() في إكسبريس؟',
        options: [
          'Checks the incoming Accept header and returns the best matching MIME type supported by the server.',
          'Translates the response into Arabic automatically.',
          'Forces the client to download a zip file.',
          'Negotiates database passwords.'
        ],
        correct: 0,
        why: 'req.accepts inspects the Accept header to allow single endpoints to serve multiple formats (JSON, HTML, CSV).',
        whyAr: 'تفحص رأس Accept الممرر من العميل لتقديم البيانات بالصيغة المناسبة (JSON أو HTML أو CSV) من نفس المسار.'
      },
      {
        q: 'What does the SameSite=Strict cookie policy enforce?',
        qAr: 'ما الذي تفرضه سياسة SameSite=Strict على ملفات الكوكيز؟',
        options: [
          'Cookies are never sent on cross-site requests (e.g. following links from external websites), preventing CSRF.',
          'Cookies can only be read on localhost.',
          'Cookies expire after 1 minute.',
          'Cookies must be uppercase.'
        ],
        correct: 0,
        why: 'SameSite=Strict prevents the browser from attaching cookies on cross-origin requests, blocking CSRF attacks.',
        whyAr: 'تمنع إرسال الكوكيز تماماً مع أي طلبات قادمة من مواقع خارجية مما يصد هجمات تزوير الطلبات CSRF.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي خادم Express من هجمات Clickjacking وتتحكم في سياسات التحميل المضمن (Frames)؟',
    interviewA: 'نحمي الخادم بتكوين رأسين أمنيين: 1. Content-Security-Policy (CSP) مع تعيين frame-ancestors \'none\' (أو تحديد الدومينات الموثوقة). 2. تعيين رأس X-Frame-Options: DENY لمنع تضمين صفحات التطبيق الحساسة داخل وسوم <iframe> في مواقع المهاجمين. نطبق هذه الرؤوس آلياً في إكسبريس باستخدام وسيط helmet().'
  },
  {
    slug: 'middleware-deep-dive',
    title: 'Middleware Architecture: Chain-of-Responsibility, Async Handlers & Next() Mechanics',
    titleAr: 'معمارية البرمجيات الوسيطة (Middleware): نمط سلسلة المسؤولية، الدوال اللاتزامنية وميكانيكا next()',
    level: 1,
    order: 6,
    estMinutes: 30,
    version: 'Express 5.2 Native Promises',
    pattern: 'Chain of Responsibility & Pipeline Architecture',
    objectives: [
      'فهم نمط سلسلة المسؤولية (Chain-of-Responsibility Pattern) وكيف يعالج خط الأنابيب (Pipeline) الطلبات.',
      'تشريح سلوك دالة next() والفرق بين next()، next("route")، و next(err).',
      'فهم ميزة المعالجة اللاتزامنية الأصلية في Express 5 (Native Async/Await بدون express-async-errors).',
      'بناء وسائط مخصصة قابلة للتهيئة (Configurable Middleware Factories).'
    ],
    problemOpening: `
      الـ Middleware هو القلب النابض لإكسبريس: كل شيء من فحص المصادقة، تسجيل الطلبات (Logger)، ضغط البيانات (Compression)، وفحص الصلاحيات، هو عبارة عن برمجيات وسيطة تصطف في طابور متتابع لمعالجة الطلب.
      في Express 4 القديمة، كانت هناك مشكلة شهيرة تتسبب في تجميد السيرفر: لو حدث خطأ داخل دالة <code dir="ltr">async (req, res, next)</code>، كان الخطأ يسقط في الـ Unhandled Promise Rejection ويتجمد الطلب للأبد لأن إكسبريس 4 لم تكن تفهم الـ Promises!
      في **Express 5 الحديثة**، تم حل هذه المشكلة جذرياً: أصبح خط أنابيب الميدلوير يدعم الـ Promises أصلياً، وأي دالة async ترمي خطأ يتم التقاطه تلقائياً وتمريره لوسيط معالجة الأخطاء دون الحاجة لمكتبات مساعدة.
      في هذا الدرس، هنغوص في ميكانيكا عمل <code dir="ltr">next()</code>، وهنتعلم إزاي نبني Middleware Factories احترافية تدعم تمرير خيارات ديناميكية.
    `,
    mechanics: [
      { step: '01', title: 'طابور المعالجة التسلسلي (Middleware Stack)', desc: 'تنفيذ الوسائط بالترتيب الدقيق لتسجيلها بـ app.use() حتى يقوم أحدها بإرسال الرد أو استدعاء next().' },
      { step: '02', title: 'سلوكيات استدعاء next() الثلاثة', desc: 'استدعاء next() يمرر للوسيط التالي؛ next("route") يتخطى باقي وسائط نفس المسار؛ next(err) يقفز مباشرة لوسيط معالجة الأخطاء.' },
      { step: '03', title: 'الدعم اللاتزامني الأصلي في Express 5', desc: 'الدوال اللاتزامنية async تلتقط الأخطاء المرفوضة (Rejected Promises) وتمررها تلقائياً لـ error handler دون كتابة try/catch يدوية.' },
      { step: '04', title: 'مصانع الميدلوير المهيأة (Middleware Factories)', desc: 'دوال تستقبل إعدادات وتُرجع دالة وسيطة مخصصة (req, res, next) مثل rateLimit({ max: 100 }).' },
      { step: '05', title: 'حقن البيانات في سياق الطلب (Request Context Augmentation)', desc: 'تخزين بيانات المستخدم والتحليلات في req.user و req.requestId لتكون متاحة لكافة المسارات اللاحقة.' }
    ],
    playgroundCode: `// محاكي خط معالجة الـ Middleware في Express 5
class MockPipeline {
  constructor() { this.stack = []; }
  use(fn) { this.stack.push(fn); }
  
  async run(req, res) {
    let index = 0;
    const next = async (err) => {
      if (err) {
        console.error("🚨 Error detected in pipeline, jumping to Error Handler:", err.message);
        return;
      }
      if (index < this.stack.length) {
        const middleware = this.stack[index++];
        await middleware(req, res, next);
      }
    };
    await next();
  }
}

const pipeline = new MockPipeline();
pipeline.use(async (req, res, next) => {
  req.startTime = Date.now();
  console.log("1. Logger Middleware: Request received");
  await next();
});
pipeline.use(async (req, res, next) => {
  req.user = { id: 101, name: "Farah" };
  console.log("2. Auth Middleware: User injected into req.user");
  await next();
});
pipeline.use(async (req, res, next) => {
  console.log(\`3. Final Route Handler: Serving user \${req.user.name}\`);
});

pipeline.run({}, {});`,
    experimentQuestion: 'ماذا يحدث إذا قمت باستدعاء دالة next() مرتين داخل نفس الميدلوير؟',
    experimentAnswer: 'استدعاء next() مرتين سيؤدي لتنفيذ المسارات اللاحقة مرتين لنفس الطلب الواحد! وإذا حاول المسار الثاني إرسال رد للمتصفح، سيرمي Node.js خطأ فورياً من نوع Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client. لتفادي ذلك، يجب دائماً كتابة return next() لإنهاء تنفيذ الدالة فوراً بعد تمرير الطلب.',
    codeAnatomy: [
      { line: 'export const requireRole = (allowedRole) => {', note: 'مصنع ميدلوير يستقبل الصلاحية المطلوبة' },
      { line: '  return (req, res, next) => {', note: 'إرجاع الدالة الوسيطة الفعلية' },
      { line: '    if (!req.user || req.user.role !== allowedRole) {', note: 'فحص الصلاحية' },
      { line: '      return res.status(403).json({ error: "Forbidden: Insufficient privileges" });', note: 'حظر الوصول' },
      { line: '    }', note: 'نهاية الفحص' },
      { line: '    next(); // تمرير الطلب للمسار التالي', note: 'تمرير سليم' },
      { line: '  };', note: 'نهاية الدالة الوسيطة' },
      { line: '};', note: 'نهاية المصنع' }
    ],
    pitfallBad: `// خطأ شائع: نسيان return عند استدعاء next() بعد إرسال الرد
if (!authenticated) {
  res.status(401).send("Unauthorized");
  next(); // خطأ: سيستمر الكود في التنفيذ ويرسل رداً ثانياً مسبباً ERR_HTTP_HEADERS_SENT!
}`,
    pitfallGood: `// الحل الصحيح: استخدام return دائماً لقطع التنفيذ
if (!authenticated) {
  return res.status(401).send("Unauthorized");
}
next();`,
    pitfallDiagnosis: 'استدعاء res.send أو res.json لا يوقف تنفيذ باقي أسطر الدالة تلقائياً؛ يجب استخدام return لضمان عدم تنفيذ الأكواد التالية.',
    quizPool: [
      {
        q: 'What is the significant upgrade regarding async/await in Express 5 compared to Express 4?',
        qAr: 'ما هي الترقية الجوهرية بخصوص async/await في إكسبريس 5 مقارنة بإكسبريس 4 القديمة؟',
        options: [
          'Express 5 natively catches rejected promises in async middleware and routes, automatically forwarding errors to error-handling middleware.',
          'Express 5 removed all middleware.',
          'Express 5 only runs on Windows.',
          'Async functions are no longer supported.'
        ],
        correct: 0,
        why: 'Express 5 handles returned rejected promises natively, eliminating the need for third-party async wrapper packages.',
        whyAr: 'إكسبريس 5 تلتقط الوعود المرفوضة في دوال async تلقائياً وتوجهها لوسيط الأخطاء دون الحاجة لحزم مساعدة.'
      },
      {
        q: 'What happens when you pass an argument to next(new Error("Boom")) in Express?',
        qAr: 'ماذا يحدث عند تمرير معامل لدالة next مثل next(new Error("Boom")) في إكسبريس؟',
        options: [
          'Express skips all remaining normal middleware and routes, jumping directly to the first error-handling middleware (with 4 parameters).',
          'It reloads the server.',
          'It returns a 200 OK.',
          'It logs the error and continues normal execution.'
        ],
        correct: 0,
        why: 'Passing any argument (except "route") to next() signals an error, bypassing standard middleware to trigger the error handler.',
        whyAr: 'تمرير أي معامل لـ next() يعتبر إشارة لوقوع خطأ ويتخطى باقي المسارات العادية ليقفز فوراً لوسيط معالجة الأخطاء.'
      },
      {
        q: 'How does Express identify an Error-Handling Middleware from a standard middleware?',
        qAr: 'كيف تميز إكسبريس وسيط معالجة الأخطاء (Error-Handling Middleware) عن الوسيط العادي؟',
        options: [
          'By inspecting the function arity (length): error handlers MUST declare exactly 4 parameters (err, req, res, next).',
          'By naming the function "errorHandler".',
          'Using app.useError() method.',
          'By returning an Error object.'
        ],
        correct: 0,
        why: 'Express checks fn.length === 4 to distinguish error-handling middleware from regular 3-parameter middleware.',
        whyAr: 'تفحص إكسبريس عدد معاملات الدالة؛ وسيط الأخطاء يجب أن يحتوي على 4 معاملات إجبارية (err, req, res, next).'
      },
      {
        q: 'What is the purpose of a Middleware Factory function in Express?',
        qAr: 'ما هي وظيفة مصنع الميدلوير (Middleware Factory) في إكسبريس؟',
        options: [
          'A higher-order function that accepts configuration options and returns a customized middleware function (req, res, next).',
          'A tool for building CSS files.',
          'A database migration runner.',
          'A command to generate controllers.'
        ],
        correct: 0,
        why: 'Middleware factories parameterize behavior (e.g. cors(options), helmet(config)), returning custom middleware closures.',
        whyAr: 'هي دالة تقبل خيارات التكوين وتُرجع دالة وسيطة مخصصة مجهزة بالإعدادات المطلوبة لتلك الحالة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ نمط Correlation ID (Request Tracing ID) باستخدام Middleware لتتبع مسار الطلب الواحد عبر عدة خدمات مايكروسيرفس وسجلات الـ Logs؟',
    interviewA: 'ننشئ Request Tracing Middleware في بداية خط الأنابيب: 1. يفحص الرأس القادم req.get("x-correlation-id") || crypto.randomUUID(). 2. يحقن المعرف في كائن الطلب req.correlationId = id. 3. يضيف الرأس في الاستجابة res.setHeader("x-correlation-id", id). 4. يربط المعرف بنظام التسجيل (Winston / Pino) لطباعة الـ Correlation ID مع كل سطر Log خاص بهذا الطلب، مما يتيح للـ DevOps البحث عن معرّف الطلب في Grafana/Kibana وتتبع رحلته الكاملة عبر 10 مايكروسيرفس بسهولة.'
  },
  {
    slug: 'body-parsing',
    title: 'Body Parsing, Data Validation with Zod & Payload Size Defense',
    titleAr: 'تحليل جسم الطلب (Body Parsing)، فحص المدخلات بـ Zod ومكافحة هجمات تضخيم البيانات',
    level: 1,
    order: 8,
    estMinutes: 30,
    version: 'Express 5.2 & Zod v3',
    pattern: 'Data Validation & Defensive Parsing',
    objectives: [
      'فهم كيفية عمل وسائط express.json() و express.urlencoded() وكيف تحول التدفقات إلى كائنات.',
      'حماية الخادم من هجمات حرمان الخدمة (DoS) بتحديد سقف صارم لحجم البيانات limit: "100kb".',
      'بناء طبقة تحقق صارمة من النوع (Type-Safe Validation Pipeline) باستخدام مكتبة Zod.',
      'توليد رسائل خطأ دقيقة ومفصلة للمدخلات غير الصالحة وتطهير الحقول الزائدة (Stripping Unknown Keys).'
    ],
    problemOpening: `
      في خوادم الـ REST API، القول المأثور الأهم في الأمن السيبراني هو: **"لا تثق أبداً في مدخلات المستخدم (Never Trust User Input)"**!
      لو لم تحدد سقفاً لحجم جسم الطلب في إكسبريس، يستطيع أي مهاجم إرسال طلب POST بحجم 100 ميجابايت يحتوي على نص JSON ضخم، مما يملأ ذاكرة الـ RAM ويجمد الخادم في محاولة فك التشفير!
      والأخطر من ذلك هو تمرير حقول غير مفحوصة مباشرة لقاعدة البيانات: تخيل مستخدم يرسل في طلب تعديل حسابه: <code dir="ltr">{ "role": "superadmin", "balance": 999999 }</code>!
      لو كان كودك يفعل <code dir="ltr">User.update(req.body)</code> بدون فحص صارم، فقد تم اختراق موقعك بالكامل (Mass Assignment Vulnerability).
      الحل المعماري القياسي في بيئات TypeScript و JavaScript الحديثة هو دمج إكسبريس مع مكتبة **Zod**.
      في هذا الدرس، هنتعلم إزاي نبني وسيط تحقق تلقائي يفحص المدخلات قبل وصولها للمسار، يطهر الحقول الخبيثة، ويضمن Type Safety كامل في التطبيق.
    `,
    mechanics: [
      { step: '01', title: 'تحديد حدود الحجم الآمنة (express.json with limit)', desc: 'تكوين app.use(express.json({ limit: "50kb" })) لحظر الطلبات المتضخمة فوراً قبل استهلاك موارد الذاكرة.' },
      { step: '02', title: 'بناء مخططات الفحص بلغة Zod Schema', desc: 'تعريف القواعد الصارمة للحقول (مثل البريد الإلكتروني، قوة كلمة المرور، ونطاقات الأرقام) بـ z.object().' },
      { step: '03', title: 'بناء وسيط التحقق الشامل (Validate Middleware)', desc: 'إنشاء وسيط يستقبل الـ Schema وينفذ schema.safeParseAsync(req.body) لتمرير البيانات النظيفة فقط.' },
      { step: '04', title: 'تطهير الحقول الزائدة غير المصرح بها (Key Stripping)', desc: 'مكتبة Zod تتجاهل وتحذف تلقائياً أي حقول إضافية غير مذكورة في الـ Schema لحماية قاعدة البيانات من Mass Assignment.' },
      { step: '05', title: 'تنسيق رسائل الأخطاء المعيارية (Zod Error Formatting)', desc: 'تحويل أخطاء التحقق إلى مصفوفة واضحة { field: "email", message: "Invalid format" } بكود 400 Bad Request.' }
    ],
    playgroundCode: `// محاكي التحقق من البيانات وحماية الحقول بـ Zod
function mockValidateUser(inputData) {
  const allowedKeys = new Set(["username", "email", "age"]);
  const cleanData = {};
  const errors = [];

  if (!inputData.email || !inputData.email.includes("@")) {
    errors.push({ field: "email", message: "Must be a valid email" });
  }
  if (!inputData.username || inputData.username.length < 3) {
    errors.push({ field: "username", message: "Username must be >= 3 chars" });
  }

  // حذف الحقول غير المصرح بها (Mass Assignment Protection)
  for (const key of Object.keys(inputData)) {
    if (allowedKeys.has(key)) cleanData[key] = inputData[key];
    else console.warn(\`⚠️ Malicious/Unknown key stripped: [\${key}]\`);
  }

  if (errors.length > 0) return { success: false, errors };
  return { success: true, data: cleanData };
}

const maliciousPayload = { username: "Zidan", email: "amr@codehub.dev", role: "admin", balance: 50000 };
const result = mockValidateUser(maliciousPayload);
console.log("Validation Result:", result);`,
    experimentQuestion: 'ما هي ثغرة الـ Mass Assignment وكيف تحمي مكتبة Zod قواعد البيانات منها تلقائياً؟',
    experimentAnswer: 'ثغرة Mass Assignment تحدث عندما يقوم المطور بتمرير req.body مباشرة إلى دالة التحديث في الداتابيز User.update(req.body). يستطيع المهاجم إضافة حقول مثل isAdmin: true أو verified: true إلى جسم الطلب. تحمي Zod التطبيق لأنها تقوم تلقائياً بـ "Strip" وحذف أي حقول لم يتم التصريح عنها صراحة في الـ Schema، وتُرجع في result.data الحقول المصرح بها فقط.',
    codeAnatomy: [
      { line: 'import { z } from "zod";', note: 'استيراد مكتبة الفحص Zod' },
      { line: 'export const registerSchema = z.object({', note: 'تعريف مخطط تسجيل المستخدم' },
      { line: '  email: z.string().email("Invalid email format"),', note: 'فحص البريد الإلكتروني' },
      { line: '  password: z.string().min(8, "Password must be at least 8 chars"),', note: 'فحص طول كلمة المرور' },
      { line: '  age: z.number().int().min(18).optional(),', note: 'حقل عمري اختياري' },
      { line: '});', note: 'نهاية المخطط' },
      { line: 'export const validate = (schema) => async (req, res, next) => {', note: 'وسيط الفحص التلقائي' },
      { line: '  const result = await schema.safeParseAsync(req.body);', note: 'فحص البيانات بأمان' },
      { line: '  if (!result.success) return res.status(400).json({ errors: result.error.errors });', note: 'إرجاع كود 400 عند الخطأ' },
      { line: '  req.body = result.data; // استبدال الجسم بالبيانات المطهرة فقط', note: 'حقن البيانات المطهرة' },
      { line: '  next();', note: 'تمرير الطلب للمسار' },
      { line: '};', note: 'نهاية الوسيط' }
    ],
    pitfallBad: `// خطأ أمني كارثي: Mass Assignment مباشر في قاعدة البيانات
app.put("/users/:id", async (req, res) => {
  await User.update(req.params.id, req.body); // يتيح للمستخدم ترقية نفسه لـ admin وتعديل رصيده!
});`,
    pitfallGood: `// الحل الهندسي: التحقق والتطهير بـ Zod قبل اللمس
app.put("/users/:id", validate(updateUserSchema), async (req, res) => {
  await User.update(req.params.id, req.body); // req.body يحتوي فقط على الحقول المسموح بتعديلها
});`,
    pitfallDiagnosis: 'تمرير مدخلات العميل مباشرة للداتابيز يفتح الباب لتعديل حقول حساسة غير مخصصة للمستخدم، بينما مخططات Zod تعزل وتطهر البيانات المسموحة فقط.',
    quizPool: [
      {
        q: 'Why should express.json({ limit: "100kb" }) always include an explicit size limit in production?',
        qAr: 'لماذا يجب دائماً تحديد سقف حجم صريح في express.json({ limit: "100kb" }) في خوادم الإنتاج؟',
        options: [
          'Protects the server from Denial of Service (DoS) attacks via oversized payloads that exhaust RAM and CPU.',
          'Increases database query speed.',
          'Compresses the response JSON.',
          'It is required by the HTTP/2 standard.'
        ],
        correct: 0,
        why: 'Without limits, attackers can send multi-megabyte JSON payloads that overwhelm V8 parser and crash the process with Out of Memory.',
        whyAr: 'بدون تحديد سقف للحجم، يستطيع المهاجم إرسال أحجام عملاقة من نصوص JSON تشل المعالج وتستهلك ذاكرة الـ RAM بالكامل.'
      },
      {
        q: 'What is the Mass Assignment vulnerability in backend REST APIs?',
        qAr: 'ما هي ثغرة الـ Mass Assignment في خوادم الـ REST API؟',
        options: [
          'When unvalidated request body properties (e.g. isAdmin: true) are directly bound to database update operations.',
          'When too many users login at the same second.',
          'An error caused by slow database indexes.',
          'Assigning variables without let or const.'
        ],
        correct: 0,
        why: 'Mass assignment allows attackers to inject and modify internal protected model fields (like roles or permissions) if inputs are unverified.',
        whyAr: 'تتيح للمهاجمين حقن وتعديل حقول داخلية محمية في قاعدة البيانات (مثل الصلاحيات) إذا تم تمرير req.body بدون تصفية.'
      },
      {
        q: 'What does schema.safeParse(data) return in Zod when validation fails?',
        qAr: 'ما الذي تُرجعه دالة schema.safeParse(data) في مكتبة Zod عند فشل التحقق؟',
        options: [
          'An object with { success: false, error: ZodError } without throwing a runtime exception.',
          'It throws a fatal exception.',
          'It returns null.',
          'It returns undefined.'
        ],
        correct: 0,
        why: 'safeParse does not throw exceptions; it returns a discriminated union result object for clean, predictable error handling.',
        whyAr: 'دالة safeParse لا ترمي استثناءات برمجية بل ترجع كائناً منظماً { success: false, error } لمعالجة الأخطاء بنظافة.'
      },
      {
        q: 'How does Zod handle unrecognized keys present in the request body by default?',
        qAr: 'كيف تتعامل مكتبة Zod افتراضياً مع المفاتيح والحقول غير المعرفة في الـ Schema؟',
        options: [
          'It strips and ignores them by default, returning only validated fields in result.data.',
          'It throws a syntax error.',
          'It saves them to a backup database.',
          'It logs them to the console.'
        ],
        correct: 0,
        why: 'Zod strips unmapped properties automatically, acting as a built-in defense against mass-assignment payload tampering.',
        whyAr: 'تقوم Zod تلقائياً بحذف واستبعاد أي حقول إضافية غير مذكورة في المخطط مما يحمي النظام من التلاعب بالبيانات.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ استراتيجية التحقق المشترك للأنواع (End-to-End Type Safety) بين الواجهة الأمامية والخلفية باستخدام Zod و TypeScript؟',
    interviewA: 'ننشئ حزمة مشتركة في الـ Monorepo باسم @project/shared-schemas تحتوي على مخططات Zod (مثل UserRegisterSchema). في الباك إند: نستخدم الـ Schema للتحقق في الـ Middleware. في الفرونت إند: نستخرج الأنواع تلقائياً بـ type UserRegisterInput = z.infer<typeof UserRegisterSchema> ونربطها بنماذج React Hook Form عبر @hookform/resolvers/zod. هذا يضمن أن أي تعديل في قواعد البيانات أو الحقول ينعكس فورياً كأخطاء Compile-time في الفرونت إند والباك إند في نفس اللحظة.'
  },
  {
    slug: 'auth-jwt',
    title: 'Authentication & JWT Architecture: Access Tokens, Refresh Token Rotation & Blacklisting',
    titleAr: 'المصادقة ورموز JWT: رموز الوصول، تدوير رموز التحديث (Refresh Rotation) والقائمة السوداء بـ Redis',
    level: 2,
    order: 9,
    estMinutes: 35,
    version: 'Node.js 24 & jsonwebtoken / jose',
    pattern: 'Stateless Authentication & Token Rotation',
    objectives: [
      'فهم البنية المشفرة لرموز JWT (Header, Payload, Signature) والفرق بين التشفير والتوقيع.',
      'تطبيق استراتيجية الرمز المزدوج: Access Token قصير الأجل (15 دقيقة) و Refresh Token طويل الأجل (7 أيام).',
      'بناء آلية تدوير رموز التحديث (Refresh Token Rotation) وكشف محاولات سرقة الرموز (Theft Detection).',
      'إدارة القائمة السوداء (Token Blacklisting) وإلغاء الجلسات فورياً باستخدام Redis Caching.'
    ],
    problemOpening: `
      نظام المصادقة التقليدي القائم على الـ Sessions كان يخزن بيانات كل مستخدم في ذاكرة السيرفر (Stateful Sessions). مع نمو التطبيق وتوزيعه على 10 خوادم، أصبحت الـ Sessions مشكلة لأن الخادم رقم 2 لا يعرف جلسة المستخدم الذي سجل دخوله على الخادم رقم 1!
      رموز **JSON Web Tokens (JWT)** حلت هذه المشكلة بجعل المصادقة بدون حالة (Stateless): الخادم يوقع الرمز ويرسله للعميل، وعند كل طلب، يتحقق أي خادم من التوقيع الرياضي للرمز في 0.1ms دون الحاجة للرجوع لأي قاعدة بيانات!
      لكن تصميم نظام JWT إنتاجي يتطلب حل أكبر معضلة أمنية: **"كيف تلغي صلاحية رمز مسروق قبل تاريخ انتهائه؟"**.
      لو أصدرت JWT بصلاحية 30 يوماً وسُرق من المستخدم، سيستطيع المهاجم الوصول لحساب الضحية طوال الـ 30 يوماً دون أن تستطيع إيقافه!
      الحل المعماري العالمي هو **استراتيجية الرمز المزدوج (Dual-Token Architecture)** مع **تدوير رموز التحديث (Refresh Token Rotation)**.
      في هذا الدرس، هنبني نظام مصادقة بنكي منيع، وهنتعلم إزاي نلغي الرموز فورياً باستخدام كاش **Redis**.
    `,
    mechanics: [
      { step: '01', title: 'تشريح أجزاء الـ JWT الثلاثة (Header.Payload.Signature)', desc: 'الـ Header يحدد الخوارزمية (HS256/RS256)، والـ Payload يحمل المعرفات العامة (sub, exp)، والـ Signature يضمن عدم تزوير المحتوى.' },
      { step: '02', title: 'إصدار Access Token قصير الأجل (15 Min)', desc: 'رمز خفيف يحمله العميل في الذاكرة لتفويض طلبات الـ API السريعة بدون لمس قاعدة البيانات.' },
      { step: '03', title: 'حفظ وتأمين Refresh Token في HttpOnly Cookie', desc: 'رمز مشفر طويل الأجل يُحفظ في كوكيز آمنة ولا يُرسل إلا لمسار تجديد الجلسة /api/auth/refresh.' },
      { step: '04', title: 'آلية تدوير الرموز وكشف السرقة (Refresh Rotation & Theft Detection)', desc: 'مع كل طلب تجديد، يتم حذف الـ Refresh Token القديم وإصدار رمز جديد؛ إذا حاول مهاجم استخدام رمز قديم مستهلك، يتم تدمير جميع جلسات المستخدم فوراً.' },
      { step: '05', title: 'الإلغاء الفوري بـ Redis Token Blacklist', desc: 'عند تسجيل الخروج أو تغيير كلمة المرور، يتم حفظ معرف الرمز (jti) في Redis مع وقت انتهاء صلاحية TTL مطابق لفترة الرمز.' }
    ],
    playgroundCode: `// محاكي توقيع والتحقق من رموز JWT واستراتيجية التدوير
import crypto from "node:crypto";

function createMockJwt(payload, secret, expiresInSec = 900) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const expPayload = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + expiresInSec })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(\`\${header}.\${expPayload}\`).digest("base64url");
  return \`\${header}.\${expPayload}.\${signature}\`;
}

const secret = "jwt-secret-key-9988";
const token = createMockJwt({ userId: "USR-101", role: "developer" }, secret, 900);
console.log("Generated Production JWT Token:", token);

// فحص أجزاء الرمز
const [h, p, s] = token.split(".");
console.log("Decoded Payload:", JSON.parse(Buffer.from(p, "base64url").toString()));`,
    experimentQuestion: 'لماذا يعتبر وضع بيانات حساسة مثل كلمات المرور أو أرقام بطاقات الائتمان داخل JWT Payload خطأً أمنياً كارثياً؟',
    experimentAnswer: 'لأن الـ JWT مشفر بتوقيع رقمي (Signed) وليس مشفراً بالإخفاء (Encrypted). الـ Payload مشفر فقط بـ Base64URL، وهذا يعني أن أي شخص أو وسيط شبكة يستطيع فك ترميزه وقراءة محتوياته كنص صريح في ثانية واحدة! التوقيع يضمن فقط عدم تعديل البيانات ولكنه لا يخفيها عن العيون.',
    codeAnatomy: [
      { line: 'export const verifyAuth = (req, res, next) => {', note: 'وسيط فحص المصادقة' },
      { line: '  const authHeader = req.headers.authorization;', note: 'قراءة رأس المصادقة' },
      { line: '  if (!authHeader?.startsWith("Bearer ")) {', note: 'التحقق من صيغة Bearer' },
      { line: '    return res.status(401).json({ error: "Access Denied: Missing Bearer Token" });', note: 'حظر الطلب' },
      { line: '  }', note: 'نهاية التحقق' },
      { line: '  const token = authHeader.split(" ")[1];', note: 'استخراج الرمز الصافي' },
      { line: '  try {', note: 'بدء التحقق الرياضي من التوقيع' },
      { line: '    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);', note: 'فك التشفير والتحقق من الصلاحية' },
      { line: '    req.user = decoded; // حقن المستخدم في سياق الطلب', note: 'توفير بيانات المستخدم للمسارات' },
      { line: '    next();', note: 'تمرير الطلب' },
      { line: '  } catch (err) {', note: 'التقاط انتهاء الصلاحية أو تزوير الرمز' },
      { line: '    return res.status(401).json({ error: "Invalid or Expired Token" });', note: 'إرجاع كود 401' },
      { line: '  }', note: 'نهاية الكتلة' },
      { line: '};', note: 'نهاية الوسيط' }
    ],
    pitfallBad: `// خطأ أمني كارثي: إصدار Access Token بصلاحية شهر كامل وتخزينه في localStorage
jwt.sign(payload, secret, { expiresIn: "30d" });
// لو سرق الرمز من العميل، لا توجد أي طريقة لإلغائه أو حماية الحساب طوال 30 يوماً!`,
    pitfallGood: `// الحل الهندسي المعتمد: Access Token قصير (15 دقيقة) مع Refresh Token دوار
const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "15m" });
const refreshToken = jwt.sign({ id: user.id, jti: uuid() }, refreshSecret, { expiresIn: "7d" });`,
    pitfallDiagnosis: 'الرموز طويلة الأجل بدون تدوير تمثل خطراً أمنياً داهماً عند التسريب، بينما الرموز قصيرة الأجل تقلل نافذة الخطر لـ 15 دقيقة فقط.',
    quizPool: [
      {
        q: 'Is the data stored in a standard JWT payload hidden and encrypted from the client?',
        qAr: 'هل البيانات المخزنة داخل الـ Payload في رمز JWT القياسي مشفرة ومخفية عن العميل؟',
        options: [
          'No, the payload is simply base64url-encoded and can be read by anyone; signatures only guarantee data integrity, not confidentiality.',
          'Yes, it is encrypted with AES-256.',
          'Only in HTTPS connections.',
          'It can only be read by the server.'
        ],
        correct: 0,
        why: 'JWT payloads are serialized in plain base64url; signing proves who created it and prevents tampering, but does not conceal payload data.',
        whyAr: 'الـ Payload مشفر بـ Base64URL ويمكن لأي شخص قراءته كنص عادي؛ التوقيع يضمن فقط عدم التلاعب بالبيانات ولا يخفيها.'
      },
      {
        q: 'What security risk does Refresh Token Rotation mitigate?',
        qAr: 'ما هو الخطر الأمني الذي تعالجه آلية تدوير رموز التحديث (Refresh Token Rotation)؟',
        options: [
          'Detects token theft: if a compromised, already-used refresh token is reused, all active family sessions are immediately invalidated.',
          'Prevents database crashes.',
          'Increases token expiration time.',
          'Encrypts user passwords.'
        ],
        correct: 0,
        why: 'Refresh token rotation invalidates old tokens upon exchange; reusing an old token triggers automatic breach detection and session revocation.',
        whyAr: 'تكشف سرقة الرموز: إذا حاول مهاجم استخدام رمز تحديث تم استهلاكه مسبقاً، يقوم الخادم بتدمير كل جلسات المستخدم فوراً لحمايته.'
      },
      {
        q: 'Why should Access Tokens have a short lifespan (e.g., 10–15 minutes)?',
        qAr: 'لماذا يجب أن تكون فترة صلاحية Access Tokens قصيرة جداً (10-15 دقيقة)؟',
        options: [
          'Minimizes the window of vulnerability if an access token is intercepted or leaked over the network.',
          'Reduces database storage size.',
          'Required by the Chrome browser.',
          'Makes the token smaller in bytes.'
        ],
        correct: 0,
        why: 'Short-lived access tokens limit the damage of token compromise because leaked tokens expire rapidly without requiring complex revocation lookups.',
        whyAr: 'تقلص نافذة الخطر الزمني إلى بضع دقائق في حال تسريب الرمز مما يحد من قدرة المهاجم على استخدامه.'
      },
      {
        q: 'How can you instantly revoke a stateless JWT before its expiration date in a high-traffic production system?',
        qAr: 'كيف يمكنك إلغاء صلاحية رمز JWT قبل تاريخ انتهائه فورياً في نظام إنتاجي عالي الأحمال؟',
        options: [
          'Store revoked token IDs (jti) in a fast in-memory Redis blacklist with a TTL matching token expiration.',
          'Delete the user from the database.',
          'Change the server domain name.',
          'Restart all server processes.'
        ],
        correct: 0,
        why: 'A Redis blacklist stores revoked JTI IDs with an automatic TTL; checking Redis takes <1ms and preserves stateless architecture efficiency.',
        whyAr: 'تخزين معرّف الرمز الملغى (jti) في قائمة سوداء بـ Redis مع TTL تلقائي يتيح فحص الإلغاء في أجزاء من الميلي ثانية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين خوارزميات التوقيع المتماثل HS256 والخوارزميات غير المتماثلة RS256 / EdDSA في معمارية المايكروسيرفس؟',
    interviewA: 'في خوارزمية HS256 (Symmetric): يتم استخدام نفس المفتاح السري المشترك للتوقيع والتحقق، مما يجبرك على مشاركة المفتاح السري مع كل خوادم المايكروسيرفس (لو تم اختراق سيرفر واحد يمكنه تزوير رموز لباقي المنظومة!). في RS256 / EdDSA (Asymmetric): يقوم خادم المصادقة المركزي فقط بالتوقيع بالمفتاح الخاص (Private Key)، بينما تنشر الخوادم الأخرى المفتاح العام (Public Key عبر JWKS endpoint) للتحقق فقط من التوقيع دون أي قدرة على تزوير رموز جديدة، وهو المعيار القياسي للأنظمة المؤسسية الكبرى.'
  },
  {
    slug: 'rbac-permissions',
    title: 'Role-Based (RBAC) & Attribute-Based (ABAC) Access Control Architecture',
    titleAr: 'التحكم بالصلاحيات: المعمارية القائمة على الأدوار (RBAC) والمعمارية القائمة على السمات (ABAC)',
    level: 2,
    order: 10,
    estMinutes: 30,
    version: 'Express 5.2 & CASL Architecture',
    pattern: 'Authorization Matrix & Policy Enforcement',
    objectives: [
      'التمييز الصارم بين المصادقة (Authentication: Who are you?) والترخيص (Authorization: What can you do?).',
      'بناء مصفوفة الصلاحيات القائمة على الأدوار (Role-Based Access Control - RBAC).',
      'الترقية إلى التحكم القائم على السمات والسياسات (Attribute-Based Access Control - ABAC) لقواعد الملكية المعقدة.',
      'تطبيق مبدأ أقل الصلاحيات (Principle of Least Privilege) والتحقق متعدد المستويات.'
    ],
    problemOpening: `
      بعد أن يتأكد الخادم من هوية المستخدم (Authentication)، تبدأ المعركة الأهم: **"هل يملك هذا المستخدم الصلاحية لتنفيذ هذا الإجراء تحديداً؟" (Authorization)**.
      المبرمج المبتدئ يكتب شروطاً متناثرة في كل مكان داخل الكود: <code dir="ltr">if (user.role === 'admin')</code>.
      لكن ماذا يحدث عندما يطلب العميل متطلبات واقعية مثل:
      - "المحرر يستطيع تعديل مقالاته الخاصة فقط، ولكن لا يستطيع تعديل مقالات المحررين الآخرين إلا إذا كان المقال في حالة مسودة (Draft)"؟
      - "المدير المالي يستطيع اعتماد الفواتير إذا كانت قيمتها أقل من 10,000 دولار، وما فوق ذلك يتطلب موافقة نائب الرئيس"?
      هذه الشروط المعقدة تفشل معها أنظمة الـ RBAC البسيطة وتتحول إلى كود ممتلئ بشروط <code dir="ltr">if/else</code> مستحيلة الصيانة والتطوير.
      الحل المعماري هو الجمع بين **RBAC** للأدوار العامة و **ABAC (Attribute-Based Access Control)** لفحص سياق وبيانات المورد المستهدف.
      في هذا الدرس، هنتعلم إزاي نبني نظام سياسات أمنية (Policy-Based Authorization Engine) محكم ومطابق للمعايير القياسية.
    `,
    mechanics: [
      { step: '01', title: 'مصفوفة الصلاحيات المركزية (Permissions Matrix)', desc: 'تعريف الصلاحيات كأفعال على موارد: users:create, posts:delete, billing:read بدلاً من فحص أسماء الأدوار مباشرة.' },
      { step: '02', title: 'وسيط فحص الصلاحيات بـ authorize()', desc: 'إنشاء middleware factory يفحص امتلاك المستخدم للصلاحية المطلوبة قبل تنفيذ كود الـ Controller.' },
      { step: '03', title: 'التحقق القائم على سمات المورد (ABAC Policies)', desc: 'فحص سمات المورد المستهدف مثل post.authorId === user.id للسماح للمستخدمين بتعديل مواردهم الخاصة فقط.' },
      { step: '04', title: 'استخدام محركات السياسات (CASL Library Pattern)', desc: 'تعريف القدرات عبر defineAbilityFor(user) لتوفير تحقق موحد في الواجهة والخلفية can("update", "Article").' },
      { step: '05', title: 'حجب البيانات الجزئية (Field-Level Permissions)', desc: 'تصفية الحقول الحساسة (مثل الراتب ورقم الهوية) من ردود الـ JSON بناءً على صلاحيات المستخدم الطالب.' }
    ],
    playgroundCode: `// محاكي محرك الصلاحيات القائم على السمات ABAC
class PolicyEngine {
  static canUser(user, action, resource) {
    if (user.role === "admin") return true; // المدير يملك صلاحيات كاملة
    
    if (action === "edit_post") {
      // المحرر يستطيع التعديل فقط إذا كان هو صاحب المقال
      return resource.authorId === user.id;
    }
    
    if (action === "publish_post") {
      return user.role === "editor" || user.role === "admin";
    }

    return false;
  }
}

const userA = { id: "u1", role: "author" };
const userB = { id: "u2", role: "author" };
const post = { id: "p101", authorId: "u1", title: "Express 5 Architecture" };

console.log("Can User A edit their own post?", PolicyEngine.canUser(userA, "edit_post", post)); // true
console.log("Can User B edit User A's post?", PolicyEngine.canUser(userB, "edit_post", post)); // false (Blocked!)`,
    experimentQuestion: 'لماذا يعتبر فحص الصلاحيات باستخدام أسماء الصلاحيات (Permissions e.g. "posts:edit") أكثر مرونة بمراحل من فحص أسماء الأدوار مباشرة (Roles e.g. "editor")؟',
    experimentAnswer: 'لأن الأدوار قد تتغير متطلباتها باستمرار: قد تطلب الإدارة غداً إنشاء دور جديد اسمه "Moderator" يملك نفس صلاحيات المحرر بالإضافة لحظر التعليقات. لو كنت تفحص if (role === "editor")، ستضطر لتعديل مئات الأسطر في الكود! أما إذا كنت تفحص الصلاحية if (hasPermission("posts:edit"))، فإنك تقوم فقط بتعديل مصفوفة الصلاحيات في ملف الإعدادات دون لمس سطر واحد من كود المسارات.',
    codeAnatomy: [
      { line: 'export const checkPermission = (action, resource) => {', note: 'مصنع وسيط فحص الصلاحيات' },
      { line: '  return async (req, res, next) => {', note: 'الدالة الوسيطة' },
      { line: '    const ability = defineAbilityFor(req.user);', note: 'حساب قدرات وسياسات المستخدم' },
      { line: '    const targetResource = await getResource(req);', note: 'جلب المورد المستهدف' },
      { line: '    if (!ability.can(action, targetResource)) {', note: 'الفحص الأمني للسياسة' },
      { line: '      return res.status(403).json({ error: "Access Denied: Forbidden action" });', note: 'إرجاع كود 403' },
      { line: '    }', note: 'نهاية الفحص' },
      { line: '    next();', note: 'تمرير الطلب' },
      { line: '  };', note: 'نهاية الوسيط' },
      { line: '};', note: 'نهاية المصنع' }
    ],
    pitfallBad: `// خطأ شائع: ربط الكود بأسماء الأدوار الثابتة الصلبة في كل مكان
if (user.role !== "admin" && user.role !== "superadmin" && user.role !== "lead_editor") {
  return res.status(403).send("Forbidden");
}`,
    pitfallGood: `// الحل المعماري النظيف: فحص الصلاحيات المجردة
if (!user.hasPermission("articles:publish")) {
  return res.status(403).json({ error: "Insufficient permissions" });
}`,
    pitfallDiagnosis: 'فحص أسماء الأدوار الصلبة يؤدي لانتشار شروط هشة في التطبيق، بينما فحص الصلاحيات الدقيقة يوفر مرونة معمارية مطلقة.',
    quizPool: [
      {
        q: 'What is the fundamental difference between RBAC (Role-Based) and ABAC (Attribute-Based)?',
        qAr: 'ما هو الفرق الجوهري بين التحكم القائم على الأدوار (RBAC) والتحكم القائم على السمات (ABAC)؟',
        options: [
          'RBAC assigns static permissions based on user roles; ABAC evaluates dynamic attributes of the user, resource, and environment (e.g. ownership, time, IP).',
          'RBAC is for frontend, ABAC is for backend.',
          'RBAC is obsolete in modern web.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'RBAC checks broad static roles (e.g. is admin); ABAC evaluates contextual attributes (e.g. is user the owner of this specific document).',
        whyAr: 'الـ RBAC يفحص أدواراً عامة ثابتة، بينما ABAC يفحص سمات سياقية ديناميكية مثل ملكية المستخدم للمورد المستهدف وحالته.'
      },
      {
        q: 'Which HTTP status code should be returned when an authenticated user attempts an unauthorized action?',
        qAr: 'ما هو كود حالة HTTP الصحيح الذي يجب إرجاعه عندما يحاول مستخدم مسجل الدخول تنفيذ إجراء غير مصرح له به؟',
        options: ['403 Forbidden', '401 Unauthorized', '404 Not Found', '400 Bad Request'],
        correct: 0,
        why: '401 means unauthenticated (identity unknown); 403 Forbidden means authenticated but lacking necessary permissions.',
        whyAr: 'كود 401 يعني أن هوية المستخدم مجهولة، بينما كود 403 Forbidden يعني أن الهوية معروفة ولكن الصلاحية غير كافية.'
      },
      {
        q: 'What is the Principle of Least Privilege in security architecture?',
        qAr: 'ما هو مبدأ أقل الصلاحيات (Principle of Least Privilege) في معمارية الأمان؟',
        options: [
          'Granting users and services only the absolute minimum permissions necessary to perform their specific tasks.',
          'Giving everyone admin access to avoid support tickets.',
          'Deleting inactive user accounts.',
          'Using short passwords.'
        ],
        correct: 0,
        why: 'Least privilege minimizes the potential attack surface and containment blast radius if an account is compromised.',
        whyAr: 'منح المستخدمين والخدمات الحد الأدنى الضروري فقط من الصلاحيات المطلوبة لأداء مهامهم لتقليص مساحة الخطر عند حدوث أي اختراق.'
      },
      {
        q: 'Why should resource ownership (e.g., user is editing their own profile) be verified on the backend rather than trusted from client request bodies?',
        qAr: 'لماذا يجب التحقق من ملكية المورد في الخادم دائماً وعدم الثقة في بيانات العميل؟',
        options: [
          'Attackers can easily tamper with client IDs in URL parameters or request bodies to modify other users\' records (IDOR attack).',
          'Database engines require backend checks for indexing.',
          'Browsers block frontend ownership checks.',
          'To reduce frontend bundle size.'
        ],
        correct: 0,
        why: 'Failing to verify ownership on the server creates Insecure Direct Object References (IDOR), allowing unauthorized data tampering.',
        whyAr: 'عدم التحقق من الملكية في السيرفر يفتح ثغرات IDOR الخطيرة التي تتيح للمهاجم تعديل سجلات المستخدمين الآخرين بتغيير الـ ID فقط.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هي ثغرة Insecure Direct Object References (IDOR) وكيف تصمم طبقة Authorization موحدة لمنعها نهائياً عبر مئات المسارات؟',
    interviewA: 'ثغرة IDOR تحدث عندما يطلب مستخدم مسار /api/documents/9921، ويقوم الخادم بالاستعلام SELECT * FROM docs WHERE id = 9921 دون التحقق من أن doc.userId === req.user.id، مما يتيح لأي مستخدم قراءة وتعديل وثائق باقي العملاء بتغيير الرقم في الرابط! لمنعها معمارياً: 1. نبني Data Access Layer تدمج شرط الملكية تلقائياً في كل استعلام doc.findFirst({ where: { id, userId: req.user.id } }). 2. استخدام مكتبة سياسات مثل CASL في Middleware مركزي يفحص الصلاحية على مستوى الكيان قبل تنفيذ أي عملية.'
  },
  {
    slug: 'file-uploads',
    title: 'Streaming File Uploads: Multer Architecture, Cloud S3/R2 Storage & Malware Validation',
    titleAr: 'رفع ومعالجة الملفات: معمارية Multer، التخزين السحابي على S3/R2 والفحص الأمني للملفات الخبيثة',
    level: 2,
    order: 11,
    estMinutes: 35,
    version: 'Multer v1.4 / S3 SDK v3',
    pattern: 'Streaming Uploads & Magic Bytes Security',
    objectives: [
      'فهم كيفية تحليل طلبات multipart/form-data وتدفق بايتات الملفات باستخدام Multer.',
      'تجنب تخزين الملفات على القرص المحلي للخادم ورفعها كـ Streams مباشرة للتخزين السحابي (AWS S3 / Cloudflare R2).',
      'فحص الامتدادات الحقيقية للملفات عبر فحص التوقيع السداسي (Magic Bytes) لمنع رفع ملفات الـ Web Shells الخبيثة.',
      'تحديد سقوف الأحجام وتوليد أسماء ملفات عشوائية مشفرة لمنع استبدال الملفات.'
    ],
    problemOpening: `
      رفع الملفات هو أكثر جزء حساس أمنياً ومعمارياً في أي خادم ويب.
      المبرمج المبتدئ يقوم برفع الصور وحفظها في مجلد محلي على السيرفر <code dir="ltr">/public/uploads</code> بالاسم الأصلي للملف الذي أرسله المستخدم، ويفحص الامتداد بـ <code dir="ltr">file.originalname.endsWith('.jpg')</code>!
      هذا الكود يفتح الباب لاختراق الخادم في 30 ثانية:
      1. كارثة أمنية: المهاجم يرفع ملف بايلود خبيث اسمه <code dir="ltr">shell.php.jpg</code> أو يغير الـ MIME Type فقط؛ وعندما يفتحه السيرفر، يتم تنفيذ كود خبيث ويسيطر المهاجم على السيرفر بالكامل!
      2. كارثة معمارية: عندما تشغل خادمك على Docker أو Heroku أو Kubernetes، فإن القرص الصلب مؤقت (Ephemeral Storage). كلما أعيد تشغيل الـ Pod أو تم توسيع السيرفرات (Auto-scaling)، ستختفي كل ملفات وصور المستخدمين وتضيع للأبد!
      الحل المعماري هو **التخزين السحابي الموزع (Cloud Object Storage مثل AWS S3 أو Cloudflare R2)** وفحص **التوقيع السداسي الحقيقي للملفات (Magic Bytes)**.
      في هذا الدرس، هنبني نظام رفع ملفات احترافي فائق الأمان يرفع الملفات كتدفقات مباشرة للسحاب.
    `,
    mechanics: [
      { step: '01', title: 'تحليل تدفقات Multipart بـ Multer MemoryStorage', desc: 'استقبال أجزاء الملف في الذاكرة كـ Buffer أو تدفق Stream دون كتابتها على القرص الصلب المحلي للخادم.' },
      { step: '02', title: 'فحص التوقيع السداسي للملفات (Magic Numbers Validation)', desc: 'قراءة أول 4 إلى 8 بايتات من الملف للتأكد من هويته الحقيقية (مثلاً FF D8 FF لصور JPEG) بغض النظر عن الامتداد المكتوب.' },
      { step: '03', title: 'توليد الأسماء العشوائية المشفرة (UUID Filenames)', desc: 'توليد اسم فريد crypto.randomUUID() + ext لمنع استبدال ملفات المستخدمين الآخرين ومنع هجمات الـ Path Traversal.' },
      { step: '04', title: 'الرفع السحابي المباشر بـ S3 UploadStream', desc: 'تمرير الملف مباشرة عبر S3 PutObjectCommand أو multipart upload دون تخزينه محلياً.' },
      { step: '05', title: 'نمط الروابط الموقعة المسبقة (S3 Presigned URLs)', desc: 'توليد رابط رفع موقع مؤقت يتيح لمتصفح العميل رفع الملف مباشرة إلى S3 دون المرور بخادمك لتوفير الباندويث والمعالج.' }
    ],
    playgroundCode: `// محاكي فحص التوقيع السداسي الحقيقي للملفات (Magic Bytes)
function validateImageMagicBytes(bufferHex) {
  const magicSignatures = {
    "ffd8ffe0": "image/jpeg",
    "ffd8ffe1": "image/jpeg",
    "89504e47": "image/png",
    "47494638": "image/gif"
  };

  const filePrefix = bufferHex.slice(0, 8).toLowerCase();
  const detectedType = magicSignatures[filePrefix];

  if (!detectedType) {
    throw new Error(\`🚨 SECURITY ALERT: Fake file extension detected! Header was [\${filePrefix}]\`);
  }

  console.log(\`✅ Valid Image Verified via Magic Bytes: [\${detectedType}]\`);
  return detectedType;
}

// اختبار ملف PNG حقيقي
validateImageMagicBytes("89504e470d0a1a0a0000000d");

// اختبار ملف تنفيذي خبيث تم تسميته كصورة .png
try {
  validateImageMagicBytes("4d5a90000300000004000000"); // MZ header (Windows EXE)
} catch (e) {
  console.log(e.message); // تم حظر الملف الخبيث بنجاح!
}`,
    experimentQuestion: 'لماذا يعتبر نمط S3 Presigned URLs أفضل بمراحل معمارياً من رفع الملفات عبر خادم Node.js الخاص بك عند رفع ملفات فيديو ضخمة؟',
    experimentAnswer: 'عند رفع ملف فيديو بحجم 1GB عبر خادم Node.js، فإن الخادم يستهلك 1GB باندويث لاستقبال الملف من العميل + 1GB باندويث أخرى لرفعه إلى S3، بالإضافة لحجز الـ RAM والـ CPU طوال فترة الرفع البطيئة. باستخدام S3 Presigned URLs، يطلب العميل رابطاً موقعاً خفيفاً من الخادم في 5ms، ثم يرفع ملف الـ 1GB مباشرة من المتصفح إلى خوادم S3 في السحاب، موفراً 100% من موارد خادم Node.js وباندويث الشبكة.',
    codeAnatomy: [
      { line: 'import multer from "multer";', note: 'مكتبة معالجة رفع الملفات' },
      { line: 'import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";', note: 'حزمة AWS S3 SDK v3 الرسمية' },
      { line: 'const upload = multer({', note: 'تكوين وسيط الرفع' },
      { line: '  storage: multer.memoryStorage(),', note: 'حفظ الملف في الذاكرة المؤقتة للتدفق المباشر' },
      { line: '  limits: { fileSize: 5 * 1024 * 1024 } // 5MB كحد أقصى', note: 'تحديد سقف حجم الملف' },
      { line: '});', note: 'نهاية تكوين Multer' },
      { line: 'export const uploadAvatar = upload.single("avatar");', note: 'وسيط رفع ملف فردي' }
    ],
    pitfallBad: `// خطأ أمني كارثي: حفظ الملف باسمه الأصلي المرسل من العميل
const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, file.originalname) // يتيح استبدال الملفات وثغرات Path Traversal!
});`,
    pitfallGood: `// الحل الهندسي: توليد اسم عشوائي فريد بالكامل
const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, crypto.randomUUID() + path.extname(file.originalname))
});`,
    pitfallDiagnosis: 'الاعتماد على originalname يتيح للمهاجمين استبدال ملفات النظام الحساسة أو كتابة مسارات هروب ../ خبيثة، بينما UUID يضمن الأمان والتفرد.',
    quizPool: [
      {
        q: 'Why is checking file extensions alone (e.g. file.endsWith(".png")) insufficient for upload security?',
        qAr: 'لماذا يعتبر فحص امتداد الملف فقط (مثل endsWith(".png")) غير كافٍ أمنياً؟',
        options: [
          'Attackers can easily rename executable malware or PHP web shells to ".png", bypassing extension-only checks.',
          'File extensions are encrypted by the OS.',
          'Node.js cannot read file extensions.',
          'Extensions increase network latency.'
        ],
        correct: 0,
        why: 'File extensions are arbitrary user-provided strings; real validation requires inspecting file content Magic Bytes (file signatures).',
        whyAr: 'الامتدادات هي مجرد نصوص يدخلها المستخدم ويمكن تزويرها؛ الفحص الحقيقي يتطلب فحص بايتات التوقيع السداسي داخل الملف.'
      },
      {
        q: 'What is the architectural benefit of using S3 Presigned URLs for file uploads?',
        qAr: 'ما هي الفائدة المعمارية لاستخدام روابط S3 Presigned URLs لرفع الملفات؟',
        options: [
          'Clients upload files directly to cloud object storage, bypassing your application server and saving massive CPU, RAM, and bandwidth.',
          'It automatically converts images to WebP.',
          'It eliminates the need for AWS accounts.',
          'It allows unlimited file sizes without limits.'
        ],
        correct: 0,
        why: 'Direct client-to-storage uploads offload heavy network I/O and server memory bottlenecks, scaling effortlessly.',
        whyAr: 'الرفع المباشر من العميل للسحاب يعفي خادم التطبيق من معالجة أحجام الملفات الضخمة ويوفر المعالج والباندويث.'
      },
      {
        q: 'Why is local filesystem storage an anti-pattern in modern cloud-native containerized (Docker) applications?',
        qAr: 'لماذا يعتبر التخزين على القرص المحلي Anti-Pattern في تطبيقات الحاويات (Docker) السحابية؟',
        options: [
          'Containers have ephemeral filesystems; files stored locally are permanently lost when pods restart or scale horizontally.',
          'Docker cannot write to hard drives.',
          'Local files increase CSS load time.',
          'Linux does not support images.'
        ],
        correct: 0,
        why: 'Container filesystems are stateless and ephemeral; persistent user uploads must be stored in centralized Object Storage (S3/R2).',
        whyAr: 'أقراص الحاويات مؤقتة وتفقد محتوياتها عند إعادة التشغيل أو التوسع الأفقي؛ الملفات يجب أن تُحفظ في Object Storage مركزي.'
      },
      {
        q: 'What does Multer\'s "limits: { fileSize: 5 * 1024 * 1024 }" configuration guarantee?',
        qAr: 'ما الذي يضمنه خيار Multer لتحديد fileSize بـ 5MB؟',
        options: [
          'Aborts incoming upload streams exceeding 5MB, protecting against storage exhaustion and memory overflow.',
          'Compresses files larger than 5MB.',
          'Splits files into 5 pieces.',
          'Converts files to PDF.'
        ],
        correct: 0,
        why: 'Enforcing strict file size limits prevents denial of service attacks through massive file upload streams.',
        whyAr: 'فرض سقف لحجم الملف يقطع الاتصال فور تجاوز الحد لمنع هجمات ملء الأقراص واستهلاك الذاكرة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي خادمك من ثغرات ImageTragick وثغرات معالجة الصور عندما تستخدم مكتبة مثل Sharp لتغيير أحجام الصور المرفوعة؟',
    interviewA: '1. فحص الـ Magic Bytes الصارمة للتحقق من أن الملف صورة حقيقية قبل تمريره للمكتبة. 2. تعطيل معالجة صيغ الـ SVG والـ EPS التي قد تحتوي على أكواد XML خبيثة (XML External Entity - XXE) أو نصوص JavaScript قابلة للتنفيذ. 3. تشغيل عمليات معالجة الصور داخل Worker Threads أو معزولة داخل Container فرعي ذي صلاحيات محدودة (Sandboxed Environment). 4. تحديد سقف لأبعاد الصورة القصوى (Max Pixel Dimensions) لمنع هجمات Pixel Flood DoS التي تستهلك كل الـ RAM عند فك ضغط صور بحجم 50,000x50,000 بيكسل.'
  },
  {
    slug: 'error-handling',
    title: 'Centralized Error Handling: Operational vs Programmer Errors, Logging & Error Middleware',
    titleAr: 'معالجة الأخطاء المركزية: تصنيف الأخطاء التشغيلية، وسيط الأخطاء والتسجيل المتقدم بـ Pino',
    level: 2,
    order: 12,
    estMinutes: 35,
    version: 'Express 5.2 Error Pipeline',
    pattern: 'Centralized Error Gateway & Fault Isolation',
    objectives: [
      'بناء وسيط معالجة أخطاء مركزي موحد (Centralized Error Handling Middleware) لجميع مسارات التطبيق.',
      'التمييز الصارم بين الأخطاء التشغيلية الموثوقة (Operational Errors) والأخطاء البرمجية المجهولة (Programmer Bugs).',
      'حماية بيانات النظام بإخفاء تفاصيل الـ Stack Traces عن المستخدمين في بيئة الإنتاج.',
      'تسجيل الأخطاء والتحليلات بهيكلية JSON فائقة السرعة باستخدام مكتبة Pino أو Winston.'
    ],
    problemOpening: `
      في المشاريع المبتدئة، يكتب المطور كتلة <code dir="ltr">try/catch</code> داخل كل مسار، ويكرر نفس كود إرسال الرد: <code dir="ltr">res.status(500).json({ error: err.message })</code>.
      هذا الأسلوب العشوائي ينتج عنه كارثتان في بيئات الإنتاج:
      1. كارثة أمنية (Information Disclosure): عند حدوث خطأ في قاعدة البيانات، يتم إرسال استعلام الـ SQL واسم الجدول وكلمات المرور والـ Stack Trace للمستخدم في الرد، مما يمنح المخترق خريطة كاملة لهيكل النظام!
      2. كود فوضوي غير متسق: مسار يرجع <code dir="ltr">{ msg: "err" }</code>، ومسار آخر يرجع <code dir="ltr">{ error: "err" }</code>، ومسار ثالث يرجع نصاً صريحاً!
      الحل المعماري هو **بوابة معالجة الأخطاء المركزية (Centralized Error Gateway)**:
      المسارات لا ترسل ردود الأخطاء بنفسها، بل ترمي الخطأ أو تمرره لـ <code dir="ltr">next(err)</code>، ويتولى وسيط أخطاء وحيد مركزي في نهاية خط الأنابيب تنسيق الرد، حجب التفاصيل الحساسة، وتسجيل البيانات في نظام المراقبة.
      في هذا الدرس، هنبني معمارية أخطاء مؤسسية منيعة تعمل بانسجام تام مع Express 5.
    `,
    mechanics: [
      { step: '01', title: 'هيكلة وسيط الأخطاء الرباعي (err, req, res, next)', desc: 'تسجيل وسيط يحمل 4 معاملات في نهاية ملف server.js بعد كل المسارات ليعترض أي خطأ يحدث في المنظومة.' },
      { step: '02', title: 'التمييز بين البيئات (Development vs Production)', desc: 'إظهار الـ Stack Trace ورسالة الخطأ الكاملة في بيئة التطوير، وإخفائها واستبدالها برسالة مهذبة عامة في الإنتاج.' },
      { step: '03', title: 'معالجة أخطاء الـ ORM وقواعد البيانات المحددة', desc: 'اعتراض أخطاء Prisma / Mongoose الفريدة (مثل Unique Constraint Violation P2002) وتحويلها لكود 409 Conflict مفهوم.' },
      { step: '04', title: 'التسجيل المنظم بـ Structured JSON Logging', desc: 'تسجيل الأخطاء ككائنات JSON مع requestId ومستوى الخطأ (error/fatal) لسهولة البحث في أنظمة السحاب.' },
      { step: '05', title: 'معالجة المسارات المفقودة (404 Fallback Catch-All)', desc: 'وضع مسار شامل app.use((req, res) => res.status(404)) قبل وسيط الأخطاء للتعامل مع الروابط غير المعرفة.' }
    ],
    playgroundCode: `// محاكي وسيط معالجة الأخطاء المركزي
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

function globalErrorHandler(err, isProduction = true) {
  const statusCode = err.statusCode || 500;
  
  if (isProduction) {
    // في الإنتاج: حماية البيانات الحساسة
    if (err.isOperational) {
      return { status: statusCode, body: { error: err.message } };
    }
    // خطأ برمجي غير متوقع
    console.error("🔥 SYSTEM ALERT: Unhandled Programmer Bug:", err.stack);
    return { status: 500, body: { error: "Something went wrong. Please try again later." } };
  }

  // في التطوير: إظهار كامل التفاصيل
  return { status: statusCode, body: { error: err.message, stack: err.stack } };
}

console.log("Production Safe Output for Unknown Bug:");
console.log(globalErrorHandler(new Error("Database connection password failed: pass123!"), true));`,
    experimentQuestion: 'لماذا يجب أن يكون وسيط معالجة الأخطاء (Error Middleware) هو آخر وسيط يتم تسجيله في ملف التطبيق بعد جميع المسارات الأخرى؟',
    experimentAnswer: 'إكسبريس تطابق الميدلوير بالترتيب من الأعلى للأسفل. إذا وضعت وسيط معالجة الأخطاء قبل المسارات، فلن يتمكن من التقاط الأخطاء التي تحدث داخل تلك المسارات لأن الطلب لم يمر عليها بعد! وضعه في النهاية يضمن اعتراض أي خطأ يتم تمريره عبر next(err) من أي مكان في التطبيق.',
    codeAnatomy: [
      { line: 'export const errorHandler = (err, req, res, next) => {', note: 'وسيط الأخطاء الرباعي الإلزامي' },
      { line: '  const statusCode = err.statusCode || 500;', note: 'تحديد كود الحالة' },
      { line: '  logger.error(err.message, { correlationId: req.id, stack: err.stack });', note: 'تسجيل منظم في السجلات' },
      { line: '  if (process.env.NODE_ENV === "production") {', note: 'بيئة الإنتاج الآمنة' },
      { line: '    return res.status(statusCode).json({', note: 'رد آمن وخالٍ من التسريبات' },
      { line: '      error: err.isOperational ? err.message : "Internal Server Error"', note: 'إخفاء الأخطاء المجهولة' },
      { line: '    });', note: 'نهاية الرد' },
      { line: '  }', note: 'نهاية شرط الإنتاج' },
      { line: '  res.status(statusCode).json({ error: err.message, stack: err.stack }); // Dev Mode', note: 'رد التطوير الشامل' },
      { line: '};', note: 'نهاية الوسيط' }
    ],
    pitfallBad: `// خطأ أمني فادح: إرجاع كائن الخطأ الكامل بما فيه الـ Stack Trace للعميل في الإنتاج
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack }); // يسرب أسرار السيرفر للمخترقين!
});`,
    pitfallGood: `// الحل الأمني المعتمد
app.use((err, req, res, next) => {
  const message = err.isOperational ? err.message : "Internal Server Error";
  res.status(err.statusCode || 500).json({ error: message });
});`,
    pitfallDiagnosis: 'تسريب الـ Stack Traces في الإنتاج يكشف مسارات الملفات وأسماء المكتبات والثغرات للمهاجمين، ويجب أن يقتصر فقط على سجلات السيرفر الداخلية.',
    quizPool: [
      {
        q: 'Why must Express Error-Handling middleware always declare exactly FOUR arguments (err, req, res, next)?',
        qAr: 'لماذا يجب أن يعلن وسيط معالجة الأخطاء في إكسبريس عن 4 معاملات تحديداً (err, req, res, next)؟',
        options: [
          'Express inspects function.length to identify error handlers; declaring 3 arguments causes it to be treated as normal middleware.',
          'It is required by TypeScript compiler.',
          'The 4th argument contains database connections.',
          'To support WebSockets.'
        ],
        correct: 0,
        why: 'Express relies on function parameter count (arity of 4) to distinguish error-handling middleware from standard route middleware.',
        whyAr: 'تعتمد إكسبريس على فحص عدد معاملات الدالة (4 معاملات) لتمييز وسيط الأخطاء وتوجيه الاستثناءات إليه.'
      },
      {
        q: 'What is the key difference between an Operational Error and a Programmer Bug in production architecture?',
        qAr: 'ما هو الفرق الأساسي بين الخطأ التشغيلي (Operational Error) والخطأ البرمجي (Programmer Bug) في بيئة الإنتاج؟',
        options: [
          'Operational errors are known, expected failures (e.g. invalid input, 404); bugs are unexpected code flaws (e.g. reading property of undefined).',
          'Operational errors always crash the server.',
          'Programmer bugs only occur on Windows.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'Operational errors represent anticipated runtime conditions to handle gracefully; programmer bugs are defects requiring code fixes.',
        whyAr: 'الأخطاء التشغيلية هي حالات متوقعة وموثوقة يتم إبلاغ المستخدم بها، بينما الأخطاء البرمجية هي عيوب غير متوقعة في الكود.'
      },
      {
        q: 'Where in the Express middleware registration chain should the global error handler be placed?',
        qAr: 'أين يجب وضع وسيط معالجة الأخطاء العام في سلسلة تسجيل الميدلوير داخل إكسبريس؟',
        options: [
          'At the very end of the file, after all routes and standard middleware have been defined.',
          'At the very beginning before express.json().',
          'Inside the first route handler.',
          'In a separate package.json file.'
        ],
        correct: 0,
        why: 'The error handler must be registered last so that errors forwarded by preceding routes and middleware flow into it.',
        whyAr: 'يجب وضعه في نهاية الملف بعد كل المسارات لضمان اعتراض وتجميع كافة الأخطاء الممررة من المسارات السابقة.'
      },
      {
        q: 'Why should error logs in production be formatted as Structured JSON (e.g. via Pino or Winston)?',
        qAr: 'لماذا يجب تنسيق سجلات الأخطاء في الإنتاج كـ Structured JSON باستخدام مكتبات مثل Pino؟',
        options: [
          'Enables automated ingestion, fast indexing, and querying by log aggregation platforms like Datadog, ELK, or CloudWatch.',
          'Makes logs colorful in the terminal.',
          'Reduces internet bandwidth.',
          'Encrypts log files.'
        ],
        correct: 0,
        why: 'Structured JSON logs allow monitoring systems to index fields like correlationId and statusCode for instant search and alerting.',
        whyAr: 'السجلات المهيكلة بـ JSON تمكن أنظمة الرصد والمراقبة السحابية من فهرسة الحقول والبحث السريع وإرسال التنبيهات الفورية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تدمج نظام مراقبة الأعطال في الوقت الحقيقي (مثل Sentry أو Datadog) داخل وسيط الأخطاء المركزي دون التأثير على زمن استجابة المستخدم؟',
    interviewA: 'داخل وسيط الأخطاء المركزي، نقوم بفحص if (!err.isOperational): إذا كان الخطأ برمجياً غير متوقع، نرسل تقريراً لاتزامياً إلى Sentry عبر Sentry.captureException(err, { extra: { correlationId: req.id, user: req.user?.id } }) دون استخدام await، ثم نرجع الرد فوراً للمستخدم بكود 500. هذا يضمن إبلاغ فريق الهندسة بالحادثة فورياً مع سياق الـ Request الكامل دون إضافة ميلي ثانية واحدة من التأخير لزمن استجابة العميل.'
  },
  {
    slug: 'rate-limiting',
    title: 'Rate Limiting & DDoS Defense: Token Bucket, Sliding Window & Redis Store',
    titleAr: 'تحديد معدل الطلبات (Rate Limiting) ومكافحة هجمات الـ DDoS: خوارزميات Sliding Window ومخزن Redis',
    level: 3,
    order: 13,
    estMinutes: 35,
    version: 'Express 5.2 & express-rate-limit + Redis',
    pattern: 'DDoS Defense & Distributed Throttling',
    objectives: [
      'حماية خوادم الـ API من هجمات حرمان الخدمة الموزعة (DDoS) وهجمات تخمين كلمات المرور (Brute Force).',
      'فهم ومقارنة خوارزميات الـ Rate Limiting الكبرى: Fixed Window، Token Bucket، و Sliding Window Counter.',
      'بناء نظام تحديد معدل طلبات موزع وعالي الأداء باستخدام Redis Store عبر عدة خوادم.',
      'تطبيق الرؤوس القياسية لتقييد المعدل: RateLimit-Limit، RateLimit-Remaining، و RateLimit-Reset.'
    ],
    problemOpening: `
      في أي خادم ويب مفتوح على الإنترنت، يستطيع أي مخترق كتابة سكربت بسيط بـ Python يرسل 100,000 طلب تسجيل دخول في الدقيقة الواحدة لتخمين كلمات المرور (Brute Force Attack) أو إغراق قاعدة البيانات بالاستعلامات حتى تسقط الخدمة بالكامل عن باقي المستخدمين (Denial of Service - DoS).
      لو لم تكن تملك طبقة **Rate Limiting** تحكم معدل الطلبات لكل IP أو لكل مستخدم، خادمك معرض للسقوط في أي لحظة.
      لكن بناء Rate Limiter في الأنظمة الإنتاجية الموزعة يواجه تحدياً معمارياً:
      لو كان لديك 5 خوادم Node.js وراء Load Balancer، وقام المهاجم بإرسال 20 طلباً لكل خادم، فإن الذاكرة المحلية لكل سيرفر (In-Memory Store) لن تشعر بالهجوم لأن كل سيرفر يرى 20 طلباً فقط، بينما المجموع الإجمالي هو 100 طلب!
      الحل المعماري هو استخدام **مخزن مركزي موزع بـ Redis (Distributed Rate Limiting)** يشارك عدادات الطلبات عبر جميع الخوادم في أجزاء من الميلي ثانية.
      في هذا الدرس، هنبني طبقة حماية منيعة، وهنتعلم خوارزمية **Sliding Window** الدقيقة.
    `,
    mechanics: [
      { step: '01', title: 'خوارزمية النافذة المنزلقة (Sliding Window Counter)', desc: 'حساب معدل الطلبات بدقة متناهية عبر ترجيح النافذة الزمنية السابقة والحالية لمنع هجمات التكثيف عند حواف النوافذ (Burst Attacks).' },
      { step: '02', title: 'المخزن الموزع المركزي عبر Redis (Redis Store)', desc: 'تخزين العدادات في Redis مع أمر INCR وتعيين مدة الصلاحية EXPIRE ذرياً لضمان دقة الحساب عبر كل الخوادم.' },
      { step: '03', title: 'إرسال رؤوس المعايير IETF RateLimit Headers', desc: 'إرجاع RateLimit-Limit و RateLimit-Remaining و RateLimit-Reset لإخبار التطبيقات بمقدار الطلبات المتبقية وموعد التصفير.' },
      { step: '04', title: 'استجابة الحظر بكود 429 Too Many Requests', desc: 'حظر الطلبات المتجاوزة فوراً وإرجاع رأس Retry-After يحدد عدد الثواني التي يجب على العميل انتظارها.' },
      { step: '05', title: 'تخصيص القواعد للمسارات الحساسة (Targeted Limits)', desc: 'تطبيق قيود صارمة على مسارات المصادقة (5 محاولات لكل 15 دقيقة) وقيود مرنة لمسارات التصفح العادية (1000 طلب/ساعة).' }
    ],
    playgroundCode: `// محاكي خوارزمية Sliding Window للـ Rate Limiting
class SlidingWindowLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    let timestamps = this.requests.get(clientId) || [];
    // تنظيف الطلبات القديمة خارج النافذة
    timestamps = timestamps.filter(t => t > windowStart);
    
    if (timestamps.length >= this.limit) {
      console.warn(\`🚫 Client [\${clientId}] RATE LIMITED! Exceeded \${this.limit} requests.\`);
      return false;
    }

    timestamps.push(now);
    this.requests.set(clientId, timestamps);
    console.log(\`✅ Client [\${clientId}] Allowed. Remaining: \${this.limit - timestamps.length}\`);
    return true;
  }
}

const limiter = new SlidingWindowLimiter(3, 1000); // 3 طلبات بالثانية
limiter.isAllowed("user_ip_1");
limiter.isAllowed("user_ip_1");
limiter.isAllowed("user_ip_1");
limiter.isAllowed("user_ip_1"); // Blocked!`,
    experimentQuestion: 'ما هو العيب الخطير في خوارزمية Fixed Window Rate Limiting وكيف تعالجه خوارزمية Sliding Window؟',
    experimentAnswer: 'في Fixed Window، إذا كان الحد 100 طلب/دقيقة، يستطيع المهاجم إرسال 100 طلب في آخر ثانية من الدقيقة الأولى (0:59) وإرسال 100 طلب أخرى في أول ثانية من الدقيقة الثانية (1:01). النتيجة: إرسال 200 طلب في ثانيتين فقط دون أن يتم حظره! خوارزمية Sliding Window تعالج هذا العيب بحساب نافذة زمنية متحركة تأخذ في الحسبان كثافة الطلبات في الثواني الأخيرة باستمرار.',
    codeAnatomy: [
      { line: 'import rateLimit from "express-rate-limit";', note: 'مكتبة تحديد معدل الطلبات' },
      { line: 'import RedisStore from "rate-limit-redis";', note: 'مخزن Redis الموزع' },
      { line: 'export const authLimiter = rateLimit({', note: 'إنشاء قيد مخصص لمسارات المصادقة' },
      { line: '  windowMs: 15 * 60 * 1000, // 15 دقيقة', note: 'النافذة الزمنية' },
      { line: '  max: 5, // 5 محاولات فاشلة فقط لكل IP', note: 'الحد الأقصى المسموح' },
      { line: '  standardHeaders: "draft-7", // إرسال رؤوس RateLimit القياسية', note: 'الرؤوس المعيارية' },
      { line: '  message: { error: "Too many login attempts. Please try again in 15 minutes." },', note: 'رسالة الخطأ' },
      { line: '  statusCode: 429, // كود حالة تجاوز المعدل', note: 'كود 429' },
      { line: '  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) })', note: 'الربط بمخزن Redis' },
      { line: '});', note: 'نهاية التكوين' }
    ],
    pitfallBad: `// خطأ شائع في الإنتاج: استخدام الذاكرة المحلية In-Memory Store للـ Rate Limiting في خوادم متعددة
const limiter = rateLimit({ max: 10 }); // الذاكرة محلية لكل سيرفر؛ يستطيع المهاجم مضاعفة الهجوم بتوزيعه على السيرفرات!`,
    pitfallGood: `// الحل المعماري المعتمد: استخدام Redis Store المركزي المشترك
const limiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  max: 10
});`,
    pitfallDiagnosis: 'الذاكرة المحلية تعزل العدادات داخل كل خادم، مما يجعل الحماية غير فعالة في بيئات السحاب وحاويات Docker المتعددة.',
    quizPool: [
      {
        q: 'Which HTTP status code is standardly returned when a client exceeds their allocated request rate limit?',
        qAr: 'ما هو كود حالة HTTP القياسي الذي يتم إرجاعه عندما يتجاوز العميل معدل الطلبات المسموح له؟',
        options: ['429 Too Many Requests', '403 Forbidden', '503 Service Unavailable', '400 Bad Request'],
        correct: 0,
        why: 'HTTP 429 Too Many Requests is the standard status code indicating rate limit exhaustion.',
        whyAr: 'كود 429 Too Many Requests هو الكود القياسي الذي يخبر العميل بأنه تجاوز عدد الطلبات المسموح به في الفترة الزمنية.'
      },
      {
        q: 'Why is Redis the preferred storage engine for Rate Limiting in scalable multi-server production architectures?',
        qAr: 'لماذا يعتبر Redis مخزن البيانات المفضل لـ Rate Limiting في الخوادم السحابية المتعددة؟',
        options: [
          'Provides ultra-fast in-memory atomic operations (INCR/EXPIRE) shared across all distributed server instances.',
          'It is cheaper than hard drives.',
          'It formats JSON automatically.',
          'It replaces the load balancer.'
        ],
        correct: 0,
        why: 'Redis executes sub-millisecond atomic increments in RAM, sharing unified request counts across all horizontal servers.',
        whyAr: 'يوفر عمليات زيادة ذرية فائقة السرعة في الذاكرة (أقل من 1ms) مشتركة بين جميع خوادم التطبيق الموزعة.'
      },
      {
        q: 'What is the purpose of the "Retry-After" HTTP response header sent with a 429 status code?',
        qAr: 'ما هي الفائدة الأساسية لرأس الاستجابة "Retry-After" المرسل مع كود 429؟',
        options: [
          'Informs the client how many seconds (or the exact timestamp) they must wait before making another request.',
          'Forces the browser to refresh the page.',
          'Logs the client IP address.',
          'Resets the user password.'
        ],
        correct: 0,
        why: 'Retry-After instructs compliant clients and API SDKs exactly how long to back off before attempting a retry.',
        whyAr: 'يخبر العميل بعدد الثواني المحددة التي يجب عليه انتظارها قبل محاولة إرسال طلب جديد مرة أخرى.'
      },
      {
        q: 'How does the Sliding Window Counter algorithm prevent burst attacks at window boundaries?',
        qAr: 'كيف تمنع خوارزمية Sliding Window Counter هجمات التكثيف عند حواف النوافذ الزمنية؟',
        options: [
          'Smooths request evaluation by weighting the previous window count proportionally against elapsed current window time.',
          'Blocks all requests during the first second of every minute.',
          'Bans IP addresses permanently.',
          'Encrypts network traffic.'
        ],
        correct: 0,
        why: 'Sliding window calculation factors in prior window traffic density, ensuring the strict limit is preserved across any continuous 60-second span.',
        whyAr: 'تحسب المعدل بناءً على ترجيح كثافة الطلبات في النافذة السابقة والحالية معاً مما يضمن عدم تجاوز السقف في أي فترة متصلة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تتعامل مع مشكلة الـ Rate Limiting عندما يكون خادمك خلف Reverse Proxy أو Cloudflare وجميع طلبات العملاء تظهر قادمة من نفس عنوان الـ IP الخاص بالبروكسي؟',
    interviewA: 'إذا كان الخادم خلف بروكسي، فإن req.ip سيحتوي على IP البروكسي الداخلي، وإذا طبقنا Rate Limiter عليه فسيتم حظر جميع مستخدمي الموقع معاً! لحل ذلك معمارياً: 1. نضبط إكسبريس بـ app.set("trust proxy", 1) (أو تحديد عدد القفزات الموثوقة). 2. هذا يوجه إكسبريس لقراءة عنوان العميل الحقيقي من رأس X-Forwarded-For أو CF-Connecting-IP التابع لـ Cloudflare بأمان. 3. نحدد مفتاح الـ Rate Limiter بدمج IP الحقيقي مع معرّف المستخدم keyGenerator: (req) => req.user?.id || req.ip لضمان حماية دقيقة ومنفصلة لكل عميل.'
  },
  {
    slug: 'cors-security',
    title: 'CORS & API Security: Preflight OPTIONS, Origin Whitelisting & Helmet Hardening',
    titleAr: 'أمان الـ CORS والـ APIs: طلبات Preflight OPTIONS، القوائم البيضاء للدومينات والتحصين بـ Helmet',
    level: 3,
    order: 14,
    estMinutes: 30,
    version: 'Express 5.2 Security Standards',
    pattern: 'Browser Security Model & Defense in Depth',
    objectives: [
      'فهم سياسة المصدر الواحد (Same-Origin Policy - SOP) في المتصفحات وكيف يحل CORS مشاركة الموارد بأمان.',
      'تشريح طلبات الفحص المسبق (Preflight OPTIONS Requests) ومتى يطلقها المتصفح تلقائياً.',
      'تكوين القائمة البيضاء للدومينات المصرح بها (Dynamic Origin Whitelisting) وتفادي كارثة Access-Control-Allow-Origin: *.',
      'تحصين رؤوس الخادم بـ 15 معياراً أمنياً باستخدام مكتبة Helmet (CSP, HSTS, X-Content-Type-Options).'
    ],
    problemOpening: `
      خطأ <code dir="ltr">Access to fetch at 'api.codehub.dev' from origin 'app.codehub.dev' has been blocked by CORS policy</code> هو أكثر خطأ يثير جنون مطوري الويب!
      الحل السريع والخطير الذي يلجأ إليه الكثيرون على StackOverflow هو كتابة: <code dir="ltr">app.use(cors({ origin: '*' }))</code> و <code dir="ltr">credentials: true</code>!
      هذا السطر يدمر الأمان: المتصفح سيرفض الـ Wildcard مع الكوكيز، ولو تم تجاوزه، سيسمح لأي موقع خبيث على الإنترنت بإرسال طلبات لخادمك وسرقة بيانات المستخدمين!
      الـ **CORS (Cross-Origin Resource Sharing)** ليس أداة لحظر السيرفرات؛ CORS هو آلية يطبقها **متصفح العميل** لحماية المستخدمين والتأكد من أن خادم الـ API يوافق صراحة على استقبال طلبات قادمة من تطبيق ويب يعمل على دومين مختلف.
      في هذا الدرس، هنفكك ميكانيكا طلبات الـ Preflight OPTIONS، إزاي نبني Dynamic Origin Validator يدعم بيئات الـ Staging والإنتاج، وإزاي نحصن السيرفر بالكامل بـ **Helmet**.
    `,
    mechanics: [
      { step: '01', title: 'سياسة نفس المصدر (Same-Origin Policy - SOP)', desc: 'المتصفح يعتبر الموقعين متطابقين فقط إذا تطابق البروتوكول (https) والدومين (codehub.dev) والمنفذ (443).' },
      { step: '02', title: 'طلبات الفحص المسبق (Preflight OPTIONS Requests)', desc: 'يرسل المتصفح طلب OPTIONS أولاً للتحقق من الميثودز والرؤوس المسموحة عند استخدام Content-Type: application/json أو رؤوس مخصصة.' },
      { step: '03', title: 'القائمة البيضاء الديناميكية (Origin Whitelisting)', desc: 'تمرير دالة origin: (origin, callback) لفحص الدومين والسماح فقط لدومينات الشركة المعتمدة ومنع المواقع الغريبة.' },
      { step: '04', title: 'دعم ملفات الكوكيز والجلسات (credentials: true)', desc: 'تفعيل إرسال الكوكيز في الطلبات العابرة للمواقع مع اشتراط تحديد الدومين بدقة وحظر استخدام * نهائياً.' },
      { step: '05', title: 'التحصين الشامل بـ Helmet Middleware', desc: 'تطبيق 15 رأساً أمنياً لحماية الخادم من هجمات XSS، Clickjacking، تعيين HSTS لإجبار اتصالات HTTPS، ومنع استنتاج الـ MIME types.' }
    ],
    playgroundCode: `// محاكي القائمة البيضاء لـ CORS
const allowedOrigins = [
  "https://codehub.dev",
  "https://app.codehub.dev",
  "https://staging.codehub.dev"
];

function corsOriginValidator(requestOrigin) {
  if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
    console.log(\`✅ CORS Allowed for Origin: [\${requestOrigin || "Same-Origin/Server-to-Server"}]\`);
    return { "Access-Control-Allow-Origin": requestOrigin, "Access-Control-Allow-Credentials": "true" };
  }

  console.warn(\`🚫 CORS BLOCKED for Malicious Origin: [\${requestOrigin}]\`);
  return { error: "CORS Policy Violation: Origin not allowed" };
}

corsOriginValidator("https://app.codehub.dev");
corsOriginValidator("https://hacker-site.com");`,
    experimentQuestion: 'لماذا لا تمنع سياسة CORS أدوات مثل Postman أو سكربتات cURL من إرسال طلبات للخادم وسحب البيانات؟',
    experimentAnswer: 'لأن سياسة CORS و Same-Origin Policy هي قيود يفرضها وينفذها متصفح الويب (Browser-Enforced Security) لحماية المستخدم من قيام موقع خبيث باستغلال جلساته المخزنة في المتصفح. أما أدوات مثل Postman أو خوادم الباك إند الأخرى، فلا تطبق قيود المتصفحات وترسل طلبات HTTP مباشرة للـ API. لحماية الخادم من السكربتات المباشرة، نستخدم رموز المصادقة (API Keys / JWT) والـ Rate Limiting.',
    codeAnatomy: [
      { line: 'import helmet from "helmet";', note: 'مكتبة تحصين الرؤوس الأمنية' },
      { line: 'import cors from "cors";', note: 'مكتبة إدارة CORS' },
      { line: 'app.use(helmet()); // تطبيق 15 رأساً أمنياً تلقائياً', note: 'حماية شاملة ضد ثغرات المتصفح' },
      { line: 'const whitelist = ["https://codehub.dev", "https://admin.codehub.dev"];', note: 'قائمة الدومينات الموثوقة' },
      { line: 'app.use(cors({', note: 'تكوين وسيط CORS' },
      { line: '  origin: (origin, callback) => {', note: 'دالة الفحص الديناميكي' },
      { line: '    if (!origin || whitelist.includes(origin)) callback(null, true);', note: 'قبول الدومين المعتمد' },
      { line: '    else callback(new Error("Blocked by CORS Security Policy"));', note: 'حظر الدومينات المجهولة' },
      { line: '  },', note: 'نهاية دالة الأصل' },
      { line: '  credentials: true, // السماح بالكوكيز المؤمنة', note: 'دعم الكوكيز' },
      { line: '  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]', note: 'تحديد الميثودز المسموحة' },
      { line: '}));', note: 'نهاية التكوين' }
    ],
    pitfallBad: `// خطأ أمني فادح: تفعيل CORS للجميع مع دعم الكوكيز
app.use(cors({ origin: "*", credentials: true })); // سيرفضه المتصفح، ولو مرر يتيح لأي موقع سرقة الجلسات!`,
    pitfallGood: `// الحل الأمني المعتمد: قائمة بيضاء صارمة ومحددة
app.use(cors({
  origin: ["https://myfrontend.com"],
  credentials: true
}));`,
    pitfallDiagnosis: 'استخدام النجمة * مع الكوكيز يفتح ثغرات أمنية خطيرة، وتجبر المعايير العالمية تحديد أصل الدومين صراحة عند استخدام credentials.',
    quizPool: [
      {
        q: 'What triggers a browser to send a preflight CORS request (HTTP OPTIONS) before the actual request?',
        qAr: 'ما الذي يدفع المتصفح لإرسال طلب فحص مسبق (Preflight OPTIONS) قبل الطلب الفعلي؟',
        options: [
          'Using HTTP methods other than GET/POST/HEAD (e.g. PUT, DELETE, PATCH) or custom headers (e.g. Authorization, Content-Type: application/json).',
          'Only when loading images.',
          'Whenever the user is on mobile data.',
          'Every single HTTP request in the universe.'
        ],
        correct: 0,
        why: 'Non-simple requests (methods like PUT/DELETE or custom Content-Type/auth headers) trigger an automatic preflight OPTIONS check.',
        whyAr: 'الطلبات غير البسيطة (مثل ميثودز PUT و DELETE ورؤوس Authorization و JSON) تجبر المتصفح على إرسال OPTIONS أولاً للتحقق من موافقة الخادم.'
      },
      {
        q: 'Where is the Same-Origin Policy (SOP) and CORS enforced?',
        qAr: 'أين يتم تطبيق وتنفيذ سياسة Same-Origin Policy و CORS؟',
        options: [
          'By the client web browser to protect users from malicious cross-origin script interactions.',
          'Inside the Linux operating system kernel.',
          'By the DNS root servers.',
          'By the internet service provider (ISP).'
        ],
        correct: 0,
        why: 'CORS is a browser security mechanism; non-browser clients (cURL, Postman) do not enforce CORS.',
        whyAr: 'الـ CORS هي آلية حماية يفرضها وينفذها متصفح العميل؛ الأدوات الخارجية مثل Postman لا تطبق قيود CORS.'
      },
      {
        q: 'What is the primary role of the Helmet middleware in Express applications?',
        qAr: 'ما هو الدور الأساسي لوسيط Helmet في تطبيقات إكسبريس؟',
        options: [
          'Automatically configures essential HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) to harden the server against common web attacks.',
          'Speeds up database queries.',
          'Compiles TypeScript files.',
          'Compresses images on disk.'
        ],
        correct: 0,
        why: 'Helmet sets 15 sensible default HTTP response headers to secure Express apps against XSS, clickjacking, and MIME sniffing.',
        whyAr: 'يضبط 15 رأساً أمنياً قياسياً لحماية الخادم من ثغرات XSS و Clickjacking و Sniffing وإجبار اتصالات HTTPS.'
      },
      {
        q: 'Can you use "Access-Control-Allow-Origin: *" simultaneously with "Access-Control-Allow-Credentials: true"?',
        qAr: 'هل يمكن استخدام Access-Control-Allow-Origin: * بالتزامن مع credentials: true في متصفحات الويب؟',
        options: [
          'No, browsers strictly reject credentialed requests when origin is wildcarded (*); a specific origin must be declared.',
          'Yes, it is standard practice.',
          'Only in Chrome.',
          'Only on localhost.'
        ],
        correct: 0,
        why: 'The W3C CORS specification forbids wildcard origins when credentials (cookies, authorization headers) are transmitted.',
        whyAr: 'المواصفات القياسية لـ W3C تمنع صراحة استخدام النجمة مع الكوكيز لحماية بيانات الجلسات من السرقة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو رأس Content-Security-Policy (CSP) وكيف تحمي به تطبيقك من هجمات XSS وحقن الـ Inline Scripts؟',
    interviewA: 'رأس CSP هو أقوى خط دفاع أمني في المتصفح: يحدد بدقة مصادر النطاقات المسموح للمتصفح بتحميل الأكواد والخطوط والصور منها. لحماية التطبيق من XSS: نعين script-src \'self\' https://trusted-cdn.com لمنع تنفيذ أي كود جافاسكريبت خارجي مجهول، ونحظر الـ Inline Scripts المكتوبة داخل وسوم <script> إلا إذا كانت تحمل بصمة مشفرة فريدة (Nonce / Hash) يتم توليدها ديناميكياً مع كل طلب بـ Helmet.'
  },
  {
    slug: 'api-documentation',
    title: 'Enterprise API Documentation: OpenAPI 3.1, Swagger UI & Automated Contract Testing',
    titleAr: 'توثيق الـ APIs المؤسسية: معيار OpenAPI 3.1، واجهة Swagger والاختبارات التعاقدية (Contract Testing)',
    level: 3,
    order: 15,
    estMinutes: 35,
    version: 'OpenAPI 3.1 & Swagger UI',
    pattern: 'API Specification & Contract-First Development',
    objectives: [
      'فهم معيار OpenAPI 3.1 (المعروف سابقاً بـ Swagger) كعقد برمجي موحد (API Contract) بين الفرق.',
      'توليد واجهات توثيق تفاعلية كاملة (Swagger UI) تتيح تجربة واختبار الـ Endpoints مباشرة من المتصفح.',
      'تطبيق نمط Contract-First وتوليد كود الـ TypeScript والـ SDKs تلقائياً من مواصفات الـ API.',
      'إجراء الاختبارات التعاقدية (Contract Testing) للتأكد من عدم كسر التوافقية مع تطبيقات الموبايل والفرونت إند.'
    ],
    problemOpening: `
      في الشركات الكبرى، أكبر مصدر لتضييع الوقت بين فريق الـ Frontend وفريق الـ Backend هو: "هو الـ Endpoint دي بتاخد إيه في الـ Body؟ هو حقل التاريخ اسمه createdAt ولا created_at؟ هو الرد بيرجع مصفوفة ولا كائن؟".
      التوثيق المكتوب يدوياً في ملفات Word أو Notion يصبح قديماً وغير متطابق مع الكود الحقيقي (Outdated) بمجرد تعديل أول سطر في الـ Controller!
      المعيار العالمي لحل هذه الفوضى هو **OpenAPI 3.1 Specification** مع **Swagger UI**.
      OpenAPI هو "عقد قانوني برمجي موحد" يصف كل مسار، معاملات الـ URL، أشكال الـ JSON المدخلة، أكواد الحالة المتوقعة (200, 400, 401, 404, 500)، ونماذج الأخطاء.
      من هذا العقد الموحد:
      1. يتم توليد صفحة تفاعلية حية (Swagger UI) لتجربة الـ Endpoints.
      2. يتم توليد TypeScript Types و API SDKs لفريق الـ Frontend بضغطة زر واحدة بـ openapi-typescript!
      في هذا الدرس الختامي لمسار Express 5، هنتعلم إزاي نبني توثيقاً مؤسسياً حياً يتزامن تلقائياً مع الكود.
    `,
    mechanics: [
      { step: '01', title: 'هيكلة وثيقة OpenAPI 3.1 الجذرية', desc: 'تعريف معلومات النظام (info, version, servers) ونماذج الأمان المشتركة (components/securitySchemes: BearerAuth).' },
      { step: '02', title: 'توثيق المسارات والمعاملات (Paths & Operations)', desc: 'تحديد مسار /users/{id}، ومعاملات الـ Path، والـ RequestBody المدعوم مع مخططات الـ JSON Schema.' },
      { step: '03', title: 'توثيق الردود المتعددة (Response Status Codes)', desc: 'توثيق الرد الناجح 200 OK، وأخطاء التحقق 400 Bad Request، وأخطاء المصادقة 401، والـ 404 بدقة.' },
      { step: '04', title: 'دمج Swagger UI في خادم إكسبريس', desc: 'ربط مسار app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)) لعرض صفحة التوثيق التفاعلية.' },
      { step: '05', title: 'التوليد الآلي للـ Client SDKs', desc: 'استخدام أدوات openapi-generator لتوليد مكتبات دوال الـ Fetch والـ Typescript Types تلقائياً لفريق الفرونت إند.' }
    ],
    playgroundCode: `// محاكي مواصفات OpenAPI 3.1 لـ REST Endpoint
const openApiSpec = {
  openapi: "3.1.0",
  info: { title: "CodeHub API", version: "1.0.0" },
  paths: {
    "/api/v1/users/{id}": {
      get: {
        summary: "Retrieve User Profile by ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "User Profile details", content: { "application/json": { schema: { type: "object" } } } },
          "404": { description: "User not found" }
        }
      }
    }
  }
};

console.log("OpenAPI 3.1 Contract generated for Endpoint:", Object.keys(openApiSpec.paths)[0]);
console.log("Swagger UI rendered endpoint specification successfully.");`,
    experimentQuestion: 'كيف يقضي استخدام OpenAPI على أخطاء عدم توافق البيانات (Contract Breaking Changes) بين فرق الـ Frontend والـ Backend؟',
    experimentAnswer: 'عندما يتغير أي حقل في الباك إند، يقوم خط الـ CI بتوليد ملف OpenAPI spec وفحصه بأدوات Contract Testing (مثل Prism أو Pact). إذا كان التعديل يكسر حقلاً يتوقعه تطبيق الموبايل أو الفرونت إند، يفشل الـ CI Build فوراً قبل النشر، مما يمنع وصول التغييرات المعطوبة للإنتاج.',
    codeAnatomy: [
      { line: 'import swaggerUi from "swagger-ui-express";', note: 'واجهة Swagger التفاعلية' },
      { line: 'import YAML from "yamljs";', note: 'قارئ ملفات YAML' },
      { line: 'const swaggerDocument = YAML.load("./docs/openapi.yaml");', note: 'تحميل ملف مواصفات OpenAPI 3.1' },
      { line: 'app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {', note: 'تثبيت مسار التوثيق' },
      { line: '  customCss: ".swagger-ui .topbar { display: none }",', note: 'تخصيص الواجهة' },
      { line: '  customSiteTitle: "CodeHub API Documentation"', note: 'عنوان الصفحة' },
      { line: '}));', note: 'نهاية التثبيت' }
    ],
    pitfallBad: `// خطأ شائع: الاعتماد على توثيق يدوي في ملفات نصية منفصلة
// "تم تعديل اسم الحقل من userId إلى id في السيرفر لكن نسينا نعدل ملف الـ Word!" -> انهيار تطبيق الفرونت إند!`,
    pitfallGood: `// الحل الهندسي: توثيق حي بـ OpenAPI 3.1 مرتبط بمخططات الكود الحقيقية
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecs));`,
    pitfallDiagnosis: 'التوثيق اليدوي ينفصل عن الواقع بسرعة، بينما معايير OpenAPI التلقائية تضمن تطابق التوثيق مع الكود بنسبة 100%.',
    quizPool: [
      {
        q: 'What is OpenAPI Specification (OAS 3.1)?',
        qAr: 'ما هو معيار مواصفات OpenAPI (OAS 3.1)؟',
        options: [
          'A standardized, language-agnostic interface description for REST APIs that defines operations, inputs, outputs, and security schemes.',
          'A programming language created by Google.',
          'A database query engine.',
          'A frontend UI framework.'
        ],
        correct: 0,
        why: 'OpenAPI is the global industry standard specification for describing and documenting RESTful APIs in JSON or YAML.',
        whyAr: 'OpenAPI هو المعيار العالمي القياسي الموحد لوصف وتوثيق خوادم الـ REST API بهيكلية JSON أو YAML.'
      },
      {
        q: 'What is the primary benefit of Swagger UI in a REST API project?',
        qAr: 'ما هي الفائدة الأساسية لواجهة Swagger UI في مشاريع الـ REST API؟',
        options: [
          'Renders an interactive, browser-accessible documentation page allowing developers to test API endpoints live.',
          'Encrypts backend databases automatically.',
          'Compiles JavaScript into binary.',
          'Generates CSS stylesheets.'
        ],
        correct: 0,
        why: 'Swagger UI transforms OpenAPI definitions into an interactive sandbox where consumers can execute live requests and inspect responses.',
        whyAr: 'تحول ملف مواصفات OpenAPI إلى صفحة تفاعلية جذابة تتيح للمطورين تجربة الـ Endpoints وإرسال الطلبات وفحص الردود مباشرة.'
      },
      {
        q: 'How does Contract Testing (e.g. using Pact or Prism) protect multi-team systems?',
        qAr: 'كيف تحمي الاختبارات التعاقدية (Contract Testing) الأنظمة البرمجية المشتركة بين فرق متعددة؟',
        options: [
          'Verifies that API producer responses strictly conform to the agreed OpenAPI schema, preventing breaking changes for consumers.',
          'Checks server hardware temperature.',
          'Calculates developer salaries.',
          'Monitors cloud hosting costs.'
        ],
        correct: 0,
        why: 'Contract tests ensure that backend API changes do not violate expected response contracts consumed by mobile/web clients.',
        whyAr: 'تتحقق آلياً من أن ردود الخادم مطابقة تماماً للمواصفات المتفق عليها وتمنع إطلاق تعديلات تكسر تطبيقات الموبايل والفرونت إند.'
      },
      {
        q: 'What can be automatically generated from an OpenAPI 3.1 specification file?',
        qAr: 'ما الذي يمكن توليده آلياً من ملف مواصفات OpenAPI 3.1؟',
        options: [
          'Interactive UI docs, client SDK libraries, TypeScript types, mock servers, and test validation suites.',
          'Operating system kernels.',
          'Hardware drivers.',
          'Database hard disks.'
        ],
        correct: 0,
        why: 'OpenAPI files act as single source of truth to auto-generate client SDKs, TypeScript type definitions, mocks, and validation logic.',
        whyAr: 'يمثل مصدراً موحداً للحقيقة لتوليد مكتبات الـ SDK وأنواع TypeScript وخوادم المحاكاة Mock Servers واختبارات التحقق آلياً.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تطبق منهجية Design-First (Contract-First) في بناء منظومة APIs ضخمة يشارك فيها 5 فرق مختلفة بالتوازي؟',
    interviewA: 'في منهجية Design-First: 1. يجتمع مهندسو الباك إند والفرونت إند والموبايل لكتابة ومراجعة عقد OpenAPI 3.1 YAML في مستودع مشترك قبل كتابة أي سطر كود (RFC / PR Review). 2. بمجرد اعتماد العقد، يتم تشغيل خادم محاكاة فوري (Mock Server بـ Prism) يسمح لفرق الفرونت إند والموبايل ببدء بناء الشاشات فوراً بالبيانات الوهمية المطابقة للمواصفات. 3. يعمل فريق الباك إند على بناء الـ Controllers مع تفعيل وسائط التحقق التلقائي ضد نفس ملف الـ OpenAPI، مما يقلل زمن تسليم المشروع بنسبة 50% ويضمن عدم حدوث أي مفاجآت تكامل (Zero Integration Bugs).'
  }
];
