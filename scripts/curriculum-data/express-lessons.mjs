/* ============================================================
   express-lessons.mjs — 11 New Lessons for Express.js 5 Track
   ============================================================ */

export const expressLessons = [
  {
    slug: 'routing-params',
    title: 'Express 5 Routing, Route Parameters, Query Strings & Sub-Routers',
    titleAr: 'توجيه المسارات في إكسبريس 5، معاملات الـ URL وتفريغ الموجهات الفرعية',
    level: 1,
    order: 2,
    estMinutes: 22,
    version: 'Express 5.2',
    pattern: 'Routing Architecture',
    problemOpening: `في تطبيقات الـ REST API الحقيقية، وضع كل المسارات في ملف server.js واحد ينشئ ملفاً عملاقاً غير قابل للقراءة أو الصيانة. إكسبريس 5 توفر صنف express.Router() لتقسيم المسارات في وحدات فرعية (Modular Routers) مع مطابقة مسارات فائقة السرعة ودعم المعاملات الديناميكية (:id) ومصفوفات الاستعلام (?sort=desc).`,
    objectives: [
      'فهم مطابقة المسارات ومعاملات الـ URL الديناميكية (req.params) واستعلامات البحث (req.query).',
      'تقسيم مسارات التطبيق إلى موجهات فرعية معيارية (express.Router).',
      'استخدام وسيط router.param() للتحقق التلقائي المسبق من المعاملات.'
    ],
    mechanics: [
      { step: 1, title: 'الموجهات الفرعية (Sub-Routers)', desc: 'تجميع مسارات المستخدمين في userRouter ومسارات المنتجات في productRouter.' },
      { step: 2, title: 'المعاملات الديناميكية (:id)', desc: 'استخراج القيم المتغيرة من المسار وتخزينها في كائن req.params.' },
      { step: 3, title: 'السلاسل الاستعلامية (Query Strings)', desc: 'تحليل المعاملات بعد علامة ? للفرز والتصفية في req.query.' }
    ],
    playgroundCode: `// Route Matcher & Sub-Router Simulation
const routes = [];
function use(prefix, router) {
  router.forEach(r => routes.push({ path: prefix + r.path, handler: r.handler }));
}

const userRouter = [
  { path: "/", handler: "GET All Users" },
  { path: "/:id", handler: "GET User By ID" }
];

use("/api/v1/users", userRouter);
console.log("Registered Endpoints:", routes.map(r => r.path).join(" | "));`,
    experimentQuestion: 'ماذا يحدث إذا عرفت مسار app.get("/users/me") بعد مسار app.get("/users/:id")؟',
    experimentAnswer: 'سيتم توجيه طلب /users/me إلى مسار :id وتعتبر كلمة "me" قيمة المعامل id! لهذا يجب دائماً تعريف المسارات الثابتة المحددة قبل المسارات الديناميكية المتغيرة.',
    codeAnatomy: [
      { line: '1: const router = express.Router();', note: 'إنشاء موجه فرعي مستقل' },
      { line: '2: router.get("/:id", (req, res) => {', note: 'مسار ديناميكي' },
      { line: '3:   const { id } = req.params;', note: 'استخراج المعامل' },
      { line: '4:   res.json({ userId: id });', note: 'إرسال الرد' },
      { line: '5: });', note: 'نهاية المسار' }
    ],
    pitfallBad: 'app.get("/users/:id", ...); app.get("/users/profile", ...); /* لن يتم الوصول لـ profile أبداً! */',
    pitfallGood: 'app.get("/users/profile", ...); app.get("/users/:id", ...); /* الترتيب الصحيح */',
    pitfallDiagnosis: 'إكسبريس تطابق المسارات بترتيب كتابتها من الأعلى للأسفل، والمسار الديناميكي يلتقط أي كلمة.',
    quizPool: [{
      q: 'Which property of the Express `req` object contains dynamic URL path parameters like `/:userId`?',
      qAr: 'أي خاصية في كائن req تحتوي على معاملات مسار الـ URL الديناميكية مثل `/:userId`؟',
      options: ['req.body', 'req.params', 'req.query', 'req.headers'],
      correct: 1,
      why: 'req.params contains route parameters matched from the path string.',
      whyAr: 'خاصية req.params تحتوي على كائن المعاملات المستخرجة من مسار الـ URL.'
    }],
    interviewQ: 'كيف يعمل وسيط router.param("id", callback) في معمارية إكسبريس؟',
    interviewA: 'هو وسيط خاص يتم تشغيله تلقائياً مرة واحدة فقط عندما يحتوي المسار المطلوب على المعامل `id`؛ يُستخدم عادة للبحث عن السجل في قاعدة البيانات والتحقق من وجوده وحفظه في `req.user` قبل وصول الطلب للمسار النهائي.'
  },
  {
    slug: 'request-response',
    title: 'Request & Response Lifecycle, Content Negotiation & Custom Responses',
    titleAr: 'دورة حياة الطلب والاستجابة، تفاوض المحتوى وأنماط الردود القياسية',
    level: 1,
    order: 4,
    estMinutes: 24,
    version: 'Express 5.2',
    pattern: 'HTTP Lifecycle',
    problemOpening: `في تصميم الـ APIs المعيارية، إرسال ردود بصيغ عشوائية أو استخدام أكواد حالة HTTP غير دقيقة (مثل إرجاع 200 OK في حالات الفشل) يربك الواجهات الأمامية ويجعل التعامل مع الأخطاء كابوساً. إتقان كائني req و res وتفاوض المحتوى (Content Negotiation عبر res.format) يضمن احترافية الخدمة وتوافقها مع أعلى معايير الـ REST.`,
    objectives: [
      'فهم خصائص كائن req: headers, cookies, ip, protocol, path, method.',
      'إتقان دوال الاستجابة: res.status(), res.json(), res.send(), res.download(), res.redirect().',
      'بناء هيكل استجابة قياسي موحد (Standardized JSend Response Envelope).'
    ],
    mechanics: [
      { step: 1, title: 'تحليل ترويسات الطلب', desc: 'قراءة تفضيلات العميل عبر req.get("Accept") لتحديد نوع البيانات المطلوب (JSON أو XML).' },
      { step: 2, title: 'هيكل الاستجابة الموحد (JSend Spec)', desc: 'تغليف الردود بصيغة { status: "success", data: { ... } } دائماً.' },
      { step: 3, title: 'أكواد الحالة الدقيقة (201 Created, 204 No Content)', desc: 'إعطاء إشارة برمجية دقيقة للعميل عما حدث بالضبط في الخادم.' }
    ],
    playgroundCode: `// Standardized REST Response Envelope Helper
function sendSuccess(res, statusCode, data, message = "Success") {
  return {
    status: "success",
    code: statusCode,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

const response = sendSuccess({}, 201, { id: 101, title: "MERN Stack" }, "Course created");
console.log("Standardized Production Response Envelope:");
console.log(JSON.stringify(response, null, 2));`,
    experimentQuestion: 'ما هو الفرق بين res.send() و res.json() في إكسبريس؟',
    experimentAnswer: 'الدالة res.json تقوم بتحويل الكائن الممرر إلى JSON وتضبط ترويسة Content-Type تلقائياً إلى application/json، بينما res.send تحدد نوع المحتوى ديناميكياً بحسب المدخل (Text أو HTML أو Buffer أو JSON).',
    codeAnatomy: [
      { line: '1: res.status(201)', note: 'تحديد كود الحالة: تم الإنشاء بنجاح' },
      { line: '2:    .set("X-RateLimit-Remaining", "99")', note: 'إضافة ترويسات مخصصة' },
      { line: '3:    .json({ status: "success", data: item });', note: 'إرسال جسم الرد بصيغة JSON' }
    ],
    pitfallBad: 'res.json({ error: "Unauthorized" }); /* يرسل كود 200 OK رغم وجود خطأ! */',
    pitfallGood: 'res.status(401).json({ status: "fail", message: "Unauthorized" }); /* كود دقيق */',
    pitfallDiagnosis: 'إرجاع 200 مع رسائل خطأ يمنع مكتبات العميل مثل Axios من دخول كتلة catch للتعامل مع الفشل.',
    quizPool: [{
      q: 'Which HTTP status code should be returned after a successful `DELETE` operation when no content is returned in the response body?',
      qAr: 'ما هو كود حالة HTTP المناسب بعد عملية حذف DELETE ناجحة عندما لا يحتوي جسم الرد على أي بيانات؟',
      options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
      correct: 2,
      why: 'HTTP 204 No Content indicates that the request has succeeded but the client doesn\'t need to navigate away from its current page view.',
      whyAr: 'كود 204 No Content يعبر عن نجاح الطلب مع عدم وجود محتوى مطلوب إرساله في جسم الرد.'
    }],
    interviewQ: 'ما هو تفاوض المحتوى (Content Negotiation) وكيف تنفذه في إكسبريس؟',
    interviewA: 'هو قدرة الخادم على إرسال صيغ مختلفة للمورد (JSON, HTML, CSV) بناءً على ترويسة `Accept` التي يرسلها العميل؛ ننفذه عبر دالة `res.format({ "text/html": () => res.render(...), "application/json": () => res.json(...) })`.'
  },
  {
    slug: 'error-handling-express',
    title: 'Centralized Error Middleware, Express 5 Auto-Catch & Custom AppErrors',
    titleAr: 'معمارية معالجة الأخطاء المركزية والالتقاط التلقائي في إكسبريس 5',
    level: 2,
    order: 5,
    estMinutes: 26,
    version: 'Express 5.2',
    pattern: 'Error Pipeline',
    problemOpening: `في إكسبريس 4 القديمة، أي خطأ غير متزامن داخل دالة async كان يتطلب كتابة try/catch يدوياً وتمرير الخطأ لـ next(err)؛ نسيان كتلة واحدة كان يعلق السيرفر في الهواء! إكسبريس 5 أحدثت ثورة بحذف الحاجة لمكتبات مثل express-async-errors؛ حيث تلتقط الوعود المرفوضة (Async Rejections) تلقائياً وتوجهها لوسيط الأخطاء المركزي (Central Error Middleware).`,
    objectives: [
      'الاستفادة من خاصية الالتقاط التلقائي للأخطاء غير المتزامنة في إكسبريس 5.',
      'بناء وسيط أخطاء مركزي يستقبل 4 معاملات (err, req, res, next).',
      'فصل بيئة التطوير (Development مع Stack Trace) عن الإنتاج (Production مع رسائل معقمة).'
    ],
    mechanics: [
      { step: 1, title: 'الالتقاط التلقائي للـ Async Errors', desc: 'في إكسبريس 5، أي دالة async ترمي خطأ تُمرره تلقائياً لوسيط الأخطاء دون الحاجة لـ try/catch.' },
      { step: 2, title: 'وسيط الأخطاء الرباعي', desc: 'الوسيط المعرف بـ (err, req, res, next) يلتقط كل أخطاء التطبيق في محطة نهائية واحدة.' },
      { step: 3, title: 'تعقيم الرسائل في الإنتاج', desc: 'إخفاء الـ Stack Trace وأسماء قواعد البيانات عن المستخدم في بيئة الإنتاج لمنع تسريب المعلومات.' }
    ],
    playgroundCode: `// Express 5 Error Middleware Simulator
function errorHandler(err, req, res) {
  const statusCode = err.statusCode || 500;
  const isProd = true; // Simulated environment
  
  const response = {
    status: statusCode >= 500 ? "error" : "fail",
    message: isProd && statusCode >= 500 ? "Internal Server Error" : err.message,
    ...(isProd ? {} : { stack: err.stack })
  };
  
  console.log(\`[Status \${statusCode}] Central Handler Dispatched:\`, JSON.stringify(response));
}

errorHandler(new Error("Database connection timed out"), {}, {});`,
    experimentQuestion: 'كيف يتعرف إطار Express على أن دالة معينة هي Error Handling Middleware وليست وسيطاً عادياً؟',
    experimentAnswer: 'عبر فحص عدد معاملات الدالة برمجياً (Function.prototype.length)؛ إذا كانت الدالة تعرف 4 معاملات صراحة (err, req, res, next) يعاملها إكسبريس كوسيط أخطاء حصرياً.',
    codeAnatomy: [
      { line: '1: app.use((err, req, res, next) => {', note: 'وسيط الأخطاء الرباعي الإلزامي' },
      { line: '2:   const code = err.statusCode || 500;', note: 'استخراج كود الحالة' },
      { line: '3:   res.status(code).json({ status: "fail", message: err.message });', note: 'إرسال الرد الموحد' },
      { line: '4: });', note: 'نهاية الوسيط' }
    ],
    pitfallBad: 'app.use((err, req, res) => { ... }); /* 3 معاملات فقط يعتبره إكسبريس وسيط عادي ويتجاهله عند الأخطاء! */',
    pitfallGood: 'app.use((err, req, res, next) => { ... }); /* 4 معاملات كاملة تضمن عمل وسيط الأخطاء */',
    pitfallDiagnosis: 'حذف معامل next حتى لو لم تستخدمه يقلص طول الدالة لـ 3 معاملات فيفشل إكسبريس في تصنيفها كـ Error Handler.',
    quizPool: [{
      q: 'How does Express 5 handle unhandled promise rejections inside async route handlers?',
      qAr: 'كيف تتعامل إكسبريس 5 مع الوعود المرفوضة داخل معالجات المسارات اللاتزامنية؟',
      options: ['Crashes the process', 'Hangs the connection', 'Automatically forwards the error to the error-handling middleware', 'Ignores the error'],
      correct: 2,
      why: 'Express 5 natively catches rejected promises from async handlers and passes them to next(err).',
      whyAr: 'تلتقط إكسبريس 5 تلقائياً الوعود المرفوضة وتمررها لوسيط الأخطاء المركزي.'
    }],
    interviewQ: 'كيف تميز في وسيط الأخطاء بين أخطاء Mongoose/Prisma وأخطاء التحقق وأخطاء السيرفر العامة؟',
    interviewA: 'نفحص خصائص الخطأ مثل `err.name` (مثل `ValidationError` أو `CastError` أو `JsonWebTokenError`) أو كود Prisma مثل `P2002` ونقوم بتحويلها في دوال مخصصة إلى كائنات `AppError` تشغيلية بأكواد حالة ورسائل مفهومة للمستخدم قبل إرسال الرد.'
  },
  {
    slug: 'validation-sanitization',
    title: 'Schema Validation & Sanitization with Zod in Express APIs',
    titleAr: 'التحقق الصارم وتطهير البيانات بمكتبة Zod في خوادم إكسبريس',
    level: 2,
    order: 6,
    estMinutes: 26,
    version: 'Zod 3+ / Express 5',
    pattern: 'Data Validation Layer',
    problemOpening: `قاعدة الأمان الذهبية في هندسة البرمجيات: "لا تثق أبداً في مدخلات العميل!" (Never Trust User Input). استقبال بيانات غير مفحوصة في req.body أو req.query يفتح الباب لحقن الشيفرات، انهيار السيرفر بسبب أنواع خاطئة، وتخزين بيانات مشوهة في قاعدة البيانات. مكتبة Zod توفر أماناً نوعياً متكاملاً وقت التشغيل (Runtime Validation) ووقت التجميع (TypeScript Type-Inference).`,
    objectives: [
      'بناء مخططات Zod Schemas للتحقق من req.body و req.query و req.params.',
      'بناء وسيط تحقق عام (validateRequest Middleware) يعترض البيانات الخاطئة مبكراً.',
      'تطهير البيانات وحذف الحقول الإضافية غير المصرح بها تلقائياً (Strip Unknown Keys).'
    ],
    mechanics: [
      { step: 1, title: 'تعريف المخطط الصارم (Schema Definition)', desc: 'تحديد الحقول المطلوبة وأنواعها وقواعدها (البريد، طول كلمة السر، الأرقام الموجبة).' },
      { step: 2, title: 'الفحص الآمن (safeParse)', desc: 'استخدام safeParse لإرجاع كائن { success, data, error } دون رمي استثناءات غير مسيطر عليها.' },
      { step: 3, title: 'استبدال المدخلات بالبيانات المعقمة', desc: 'إسناد result.data المفحوصة والمطهرة إلى req.body قبل وصولها لدالة المسار.' }
    ],
    playgroundCode: `// Zod-like Schema Validation Engine Simulation
function validateUserRegistration(input) {
  const errors = [];
  if (!input.email || !input.email.includes("@")) errors.push("Invalid email format");
  if (!input.password || input.password.length < 8) errors.push("Password must be >= 8 characters");
  if (typeof input.age !== "number" || input.age < 18) errors.push("Age must be >= 18");
  
  if (errors.length > 0) return { success: false, errors };
  return { success: true, sanitizedData: { email: input.email.trim(), age: input.age } };
}

console.log("Invalid Input Test:", validateUserRegistration({ email: "bad", password: "123", age: 15 }));
console.log("Valid Input Test:", validateUserRegistration({ email: "amr@codehub.dev ", password: "securePassword123", age: 25 }));`,
    experimentQuestion: 'ما هي ميزة schema.strip() الافتراضية في Zod عند استلام حقول إضافية غير معرفة؟',
    experimentAnswer: 'تقوم Zod تلقائياً بحذف وتجريد أي حقول إضافية أرسلها العميل لم تكن معرفة في الـ Schema، مما يحمي من ثغرات تعديل الخصائص الجماعي (Mass Assignment Vulnerability).',
    codeAnatomy: [
      { line: '1: export const validate = (schema) => (req, res, next) => {', note: 'وسيط تحقق عام' },
      { line: '2:   const result = schema.safeParse(req.body);', note: 'فحص آمن للبيانات' },
      { line: '3:   if (!result.success) return res.status(400).json({ errors: result.error.format() });', note: 'رد فوري بالأخطاء' },
      { line: '4:   req.body = result.data; next();', note: 'تمرير البيانات المطهرة' },
      { line: '5: };', note: 'نهاية الوسيط' }
    ],
    pitfallBad: 'const user = await User.create(req.body); /* ثغرة Mass Assignment تتيح للمستخدم إرسال role: "admin"! */',
    pitfallGood: 'const cleanData = userSchema.parse(req.body); const user = await User.create(cleanData);',
    pitfallDiagnosis: 'تمرير req.body مباشرة لقاعدة البيانات دون فحص يتيح للمخترقين حقن حقول حساسة مثل الصلاحيات والأرصدة.',
    quizPool: [{
      q: 'Which Zod method validates data and returns a result object without throwing an error if validation fails?',
      qAr: 'أي دالة في Zod تفحص البيانات وتُرجع كائن نتيجة دون رمي استثناء عند فشل التحقق؟',
      options: ['schema.parse()', 'schema.safeParse()', 'schema.validate()', 'schema.check()'],
      correct: 1,
      why: 'safeParse returns `{ success: true, data }` or `{ success: false, error }` safely.',
      whyAr: 'الدالة safeParse تفحص البيانات بأمان وتُرجع كائن النتيجة دون رمي أخطاء.'
    }],
    interviewQ: 'كيف تستخرج أنواع TypeScript تلقائياً من مخطط Zod Schema (Type Inference)؟',
    interviewA: 'نستخدم العامل المدمج `z.infer<typeof mySchema>`؛ على سبيل المثال: `type CreateUserDTO = z.infer<typeof createUserSchema>;` مما يضمن تطابق الأنواع البرمجية مع قواعد التحقق وقت التشغيل بنسبة 100% دون تكرار.'
  },
  {
    slug: 'authentication',
    title: 'Authentication Architecture: JWTs, Password Hashing & HttpOnly Cookies',
    titleAr: 'معمارية التوثيق: رموز JWT، تشفير كلمات السر وكوكيز HttpOnly الآمنة',
    level: 2,
    order: 8,
    estMinutes: 28,
    version: 'Node.js 24 / Express 5',
    pattern: 'Security & Identity',
    problemOpening: `تخزين كلمات المرور بصيغة نصية واضحة أو تخزين رموز التوثيق (JWT Tokens) في localStorage هي أسرع طريقة لاختراق موقعك وسرقة حسابات المستخدمين عبر هجمات XSS! معمارية التوثيق الاحترافية تعتمد على تجزئة كلمات السر بـ bcrypt مع Salt عشوائي، واستخدام استراتيجية التوثيق المزدوج (Dual-Token Rotation) بحفظ Refresh Tokens داخل كوكيز HttpOnly المشفرة.`,
    objectives: [
      'تشفير وتجزئة كلمات المرور باستخدام مكتبة bcryptjs ومفهوم الـ Salt Rounds.',
      'توليد والتحقق من رموز JSON Web Tokens (Access vs Refresh Tokens).',
      'حماية رموز التوثيق من هجمات XSS و CSRF عبر كوكيز HttpOnly و SameSite=Strict.'
    ],
    mechanics: [
      { step: 1, title: 'التجزئة غير القابلة للعكس (bcrypt Hashing)', desc: 'تشفير كلمة السر بخوارزمية بطيئة ومقاومة لهجمات القوة الغاشمة وجداول Rainbow Tables.' },
      { step: 2, title: 'توقيع رمز Access Token', desc: 'رمز JWT قصير العمر (15 دقيقة) يحمل هوية المستخدم وصلاحياته موقعاً بمفتاح سري.' },
      { step: 3, title: 'تدوير Refresh Token في كوكي آمنة', desc: 'حفظ الرمز طويل العمر في كوكي ذات سمات httpOnly: true و secure: true و sameSite: "strict".' }
    ],
    playgroundCode: `// JWT Structure Anatomy Simulation
function createMockJWT(payload, secret) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 900000 }));
  const signature = btoa("signature_of_" + header + "." + body + "_" + secret);
  return \`\${header}.\${body}.\${signature}\`;
}

const token = createMockJWT({ userId: 101, role: "admin" }, "mySuperSecretKey");
console.log("Simulated 3-Part JWT String:");
console.log(token);`,
    experimentQuestion: 'لماذا يعتبر تخزين JWT Tokens داخل localStorage خطراً أمنياً فادحاً مقارنة بـ HttpOnly Cookies؟',
    experimentAnswer: 'لأن كود جافاسكربت في المتصفح يستطيع قراءة localStorage بالكامل؛ إذا تعرض الموقع لثغرة XSS يستطيع المخترق سرقة الرمز فوراً، بينما كوكيز HttpOnly محجوبة تماماً عن جافاسكربت ولا يقرأها سوى المتصفح أثناء إرسال الطلبات للسيرفر.',
    codeAnatomy: [
      { line: '1: res.cookie("refreshToken", token, {', note: 'تعيين كوكي التوثيق' },
      { line: '2:   httpOnly: true,', note: 'حجب الكوكي تماماً عن سكريبتات المتصفح (حماية من XSS)' },
      { line: '3:   secure: true,', note: 'الإرسال عبر اتصالات HTTPS المشفرة فقط' },
      { line: '4:   sameSite: "strict",', note: 'منع إرسال الكوكي مع مواقع خارجية (حماية من CSRF)' },
      { line: '5:   maxAge: 7 * 24 * 60 * 60 * 1000', note: 'صلاحية 7 أيام' },
      { line: '6: });', note: 'نهاية الكوكي' }
    ],
    pitfallBad: 'localStorage.setItem("token", jwt); /* ثغرة أمنية تتيح سرقة الحساب عبر XSS */',
    pitfallGood: 'res.cookie("token", jwt, { httpOnly: true, secure: true }); /* آمن ومحصن */',
    pitfallDiagnosis: 'الـ LocalStorage غير محمي ويمكن لأي مكتبة خارجية أو اسكربت خبيث قراءته وإرساله لخادم خارجي.',
    quizPool: [{
      q: 'Which cookie attribute prevents client-side JavaScript from accessing the cookie via `document.cookie`?',
      qAr: 'أي سمة من سمات الكوكيز تمنع سكريبتات جافاسكربت في المتصفح من قراءة الكوكي عبر document.cookie؟',
      options: ['Secure', 'HttpOnly', 'SameSite', 'Path'],
      correct: 1,
      why: 'The `HttpOnly` flag directs the browser to block all client-side script access to the cookie.',
      whyAr: 'السمة HttpOnly توجه المتصفح لحظر وصول سكريبتات العميل للكوكي لحمايتها من هجمات XSS.'
    }],
    interviewQ: 'ما هي استراتيجية Refresh Token Rotation وكيف تحمي من سرقة الرموز؟',
    interviewA: 'هي معمارية أمنية يتم فيها إبطال وتدمير الـ Refresh Token القديم وإصدار رمز جديد كلياً في كل مرة يطلب فيها العميل تجديد الـ Access Token؛ وإذا حاول مخترق استخدام رمز قديم تم استخدامه مسبقاً، يتعرف السيرفر على محاولة الاختراق ويلغي فوراً جميع جلسات هذا المستخدم ويجبره على تسجيل الدخول مجدداً.'
  },
  {
    slug: 'authorization-rbac',
    title: 'Role-Based Access Control (RBAC), Permissions & Auth Guards',
    titleAr: 'التحكم بالوصول القائم على الأدوار (RBAC) وحراس الصلاحيات',
    level: 2,
    order: 9,
    estMinutes: 24,
    version: 'Express 5.2',
    pattern: 'Authorization Architecture',
    problemOpening: `التوثيق (Authentication) يجيب على سؤال: "من أنت؟"، بينما التفويض (Authorization) يجيب على سؤال: "ما الذي يحق لك فعله؟". السماح لمستخدم عادي بحذف مقال أو تعديل حساب مستخدم آخر بسبب غياب حراس الصلاحيات يُعد ثغرة خطيرة من نوع IDOR (Insecure Direct Object Reference). في هذا الدرس سنبني نظام RBAC متين يعتمد على وسائط الحماية (Role Guards).`,
    objectives: [
      'فهم الفرق الجذري بين Authentication (401 Unauthorized) و Authorization (403 Forbidden).',
      'بناء وسيط حماية الأدوار restrictTo("admin", "lead-guide").',
      'تطبيق مبدأ التحقق من الملكية (Resource Ownership Checks).'
    ],
    mechanics: [
      { step: 1, title: 'التحقق من الهوية أولاً (Auth Guard)', desc: 'فك تشفير الرمز والتأكد من صحته وحفظ بيانات المستخدم في req.user.' },
      { step: 2, title: 'فحص الدور والصلاحية (Role Guard)', desc: 'مطابقة دور المستخدم req.user.role مع قائمة الأدوار المسموح لها بدخول المسار.' },
      { step: 3, title: 'فحص ملكية المورد (Ownership Check)', desc: 'التأكد من أن المستخدم يقوم بتعديل موارده الخاصة فقط ما لم يكن يمتلك صلاحية Admin.' }
    ],
    playgroundCode: `// RBAC Guard Simulator
function authorize(...allowedRoles) {
  return function(userRole) {
    if (!allowedRoles.includes(userRole)) {
      console.log(\`⛔ Access Denied! Role [\${userRole}] cannot access this resource. (403 Forbidden)\`);
      return false;
    }
    console.log(\`✅ Access Granted for Role [\${userRole}].\`);
    return true;
  };
}

const adminGuard = authorize("admin", "manager");
adminGuard("student"); // Forbidden!
adminGuard("admin");   // Granted!`,
    experimentQuestion: 'ما هو كود حالة HTTP الصحيح عندما يحاول مستخدم مسجل دخول بالفعل الوصول لمسار لا يملك صلاحيته؟',
    experimentAnswer: 'كود الحالة الصحيح هو 403 Forbidden (ممنوع الوصول)؛ استخدام 401 Unauthorized هنا خاطئ لأن 401 تعني أن المستخدم غير معروف ويحتاج لتسجيل الدخول أولاً.',
    codeAnatomy: [
      { line: '1: export const restrictTo = (...roles) => (req, res, next) => {', note: 'مصنع وسائط الصلاحيات' },
      { line: '2:   if (!roles.includes(req.user.role)) {', note: 'فحص دور المستخدم' },
      { line: '3:     return res.status(403).json({ message: "You do not have permission" });', note: 'رفض الوصول 403' },
      { line: '4:   }', note: 'نهاية الفحص' },
      { line: '5:   next();', note: 'السماح بالمرور' },
      { line: '6: };', note: 'نهاية الوسيط' }
    ],
    pitfallBad: 'app.delete("/users/:id", deleteUser); /* ثغرة IDOR: أي مستخدم يقدر يحذف أي حساب! */',
    pitfallGood: 'app.delete("/users/:id", protect, restrictTo("admin"), deleteUser); /* محمي بالصلاحيات */',
    pitfallDiagnosis: 'عدم فحص الصلاحيات يتيح للمستخدمين استدعاء مسارات الحذف والتعديل بتغيير الـ ID في الـ URL فقط.',
    quizPool: [{
      q: 'Which HTTP status code should be returned when an authenticated user attempts to access an admin-only route without the proper role?',
      qAr: 'ما هو كود حالة HTTP الذي يجب إرجاعه عندما يحاول مستخدم مسجل الدخول الوصول لمسار مخصص للمشرفين فقط؟',
      options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Internal Server Error'],
      correct: 1,
      why: 'HTTP 403 Forbidden means the server understands who the user is, but refuses to authorize access.',
      whyAr: 'كود 403 Forbidden يعني أن السيرفر يعرف هوية المستخدم لكنه يرفض منحه الإذن بالوصول للمورد.'
    }],
    interviewQ: 'ما هو الفرق بين RBAC (Role-Based) و ABAC (Attribute-Based Access Control)؟',
    interviewA: 'في RBAC تعتمد الصلاحيات على المسمى الوظيفي للمستخدم (مثل Admin أو Member). بينما في ABAC تعتمد الصلاحيات على سمات ديناميكية متعددة مثل (هل المستخدم هو صاحب المستند؟ هل الوقت أثناء ساعات العمل؟ هل عنوان الـ IP يقع داخل الشركة؟) مما يوفر دقة متناهية (Fine-Grained Authorization).'
  },
  {
    slug: 'file-uploads',
    title: 'Multi-Part Form Data & Secure File Uploads with Multer',
    titleAr: 'معالجة الملفات المرفوعة وبيانات Multipart/form-data بمكتبة Multer',
    level: 2,
    order: 10,
    estMinutes: 24,
    version: 'Multer 1.4+ / Express 5',
    pattern: 'Binary Data Handling',
    problemOpening: `رفع الصور والملفات في تطبيقات الويب يختلف عن إرسال بيانات JSON؛ البيانات تأتي بصيغة multipart/form-data وتحتاج لمعالجة خاصة للتدفقات الثنائية (Binary Streams). ترك رفع الملفات بدون قيود أمنية يسمح للمخترقين برفع ملفات سكربتات خبيثة (.php أو .sh) أو ملفات ضخمة بحجم جيجابايت تفجر مساحة القرص الصلب وتوقف السيرفر تماماً!`,
    objectives: [
      'تكوين وسيط Multer مع خيارات التخزين DiskStorage و MemoryStorage.',
      'تطبيق فلترة صارمة لأنواع الملفات (MIME Type Filtering) للصور فقط.',
      'تقييد الحجم الأقصى للملفات وتسمية الملفات بأسماء فريدة غير قابلة للتصادم.'
    ],
    mechanics: [
      { step: 1, title: 'تفكيك الـ Multipart Stream', desc: 'Multer يعترض تدفق البيانات الثنائية ويفصل الحقول النصية عن بايتات الملفات.' },
      { step: 2, title: 'فلترة الأنواع والامتدادات', desc: 'فحص file.mimetype والتأكد من أنه يطابق صورة حقيقية (image/jpeg, image/png).' },
      { step: 3, title: 'التخزين الآمن وإعادة التسمية', desc: 'حفظ الملف باسم فريد يحتوي على Timestamp و UUID لمنع استبدال ملفات مستخدمين آخرين.' }
    ],
    playgroundCode: `// Multer Filename & Extension Sanitizer Simulation
function generateSafeFilename(originalName, userId) {
  const ext = originalName.split(".").pop().toLowerCase();
  const allowedExts = ["jpg", "jpeg", "png", "webp"];
  if (!allowedExts.includes(ext)) {
    throw new Error("Invalid file extension! Only images allowed.");
  }
  const safeName = \`user-\${userId}-\${Date.now()}.\${ext}\`;
  console.log("Original:", originalName, "-> Safe Generated Filename:", safeName);
  return safeName;
}

generateSafeFilename("my-photo.PNG", 101);`,
    experimentQuestion: 'لماذا يعتبر فحص file.mimetype غير كافٍ وحده بنسبة 100% للتأكد من أمان الملف المرفوع؟',
    experimentAnswer: 'لأن الـ MIME Type يُرسل من المتصفح في ترويسات الطلب ويمكن للمخترق تزييفه بسهولة؛ الأمان التام يتطلب فحص التوقيع السحري للبايتات (Magic Bytes) للملف باستخدام مكتبة مثل file-type أو معالجة الصورة وإعادة ضغطها عبر Sharp.',
    codeAnatomy: [
      { line: '1: const upload = multer({', note: 'إعداد وسيط الرفع' },
      { line: '2:   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit', note: 'تقييد الحجم الأقصى' },
      { line: '3:   fileFilter: (req, file, cb) => {', note: 'فلترة الأنواع' },
      { line: '4:     if (file.mimetype.startsWith("image/")) cb(null, true);', note: 'قبول الصور فقط' },
      { line: '5:     else cb(new AppError("Only images allowed", 400), false);', note: 'رفض الملفات الأخرى' },
      { line: '6:   }', note: 'نهاية الفلتر' },
      { line: '7: });', note: 'جاهز للاستخدام' }
    ],
    pitfallBad: 'upload.single("file"); /* بدون تحديد limits أو fileFilter يسمح برفع ملفات خبيثة ضخمة */',
    pitfallGood: 'upload.single("avatar"); /* مع limits و fileFilter صارم */',
    pitfallDiagnosis: 'غياب القيود يتيح للمخترقين رفع سكربتات تنفيذية أو إغراق مساحة السيرفر بهجمات DoS.',
    quizPool: [{
      q: 'Which enctype format must be used on HTML forms to support file uploads to an Express server?',
      qAr: 'ما هو تنسيق enctype الذي يجب استخدامه في استمارات HTML لدعم رفع الملفات لخادم إكسبريس؟',
      options: ['application/json', 'multipart/form-data', 'text/plain', 'application/x-www-form-urlencoded'],
      correct: 1,
      why: '`multipart/form-data` is required for sending binary files across HTTP.',
      whyAr: 'تنسيق multipart/form-data إلزامي لإرسال الملفات والبيانات الثنائية عبر HTTP.'
    }],
    interviewQ: 'متى تختار MemoryStorage ومتى تختار DiskStorage عند تكوين Multer؟',
    interviewA: 'نستخدم `MemoryStorage` عندما نحتاج لمعالجة الصورة في الذاكرة أولاً (مثل إعادة تحجيمها وضغطها عبر مكتبة Sharp) قبل رفعها مباشرة إلى خدمة تخزين سحابية مثل AWS S3 أو Cloudinary. ونستخدم `DiskStorage` عندما نريد حفظ الملفات مباشرة كملفات دائمة على القرص الصلب للسيرفر.'
  },
  {
    slug: 'api-pagination',
    title: 'API Pagination & Query Optimization: Offset vs Cursor-Based Pagination',
    titleAr: 'تقسيم نتائج الـ API (Pagination): مقارنة الـ Offset والـ Cursor وأداء الفهارس',
    level: 2,
    order: 11,
    estMinutes: 26,
    version: 'Express 5 / SQL / Mongo',
    pattern: 'Query Performance',
    problemOpening: `عندما تحتوي قاعدة البيانات على مليون سجل، إرجاع كل البيانات في استدعاء واحد سيسقط الخادم والمتصفح فوراً بخطأ Out of Memory! تقسيم النتائج لصفحات (Pagination) إلزامي. لكن استخدام نمط <code dir="ltr">OFFSET 500000 LIMIT 20</code> في قواعد البيانات الكبيرة يصبح بطيئاً جداً لأن المحرك يضطر لقراءة نصف مليون سجل وتجاهلهم في الذاكرة قبل إرجاع الـ 20 سجلاً المطلوبة! الحل عالي الكفاءة هو نمط <code dir="ltr">Cursor-Based Pagination</code>.`,
    objectives: [
      'فهم الفرق الجذري في الأداء والتعقيد بين Offset-Based و Cursor-Based Pagination.',
      'تطبيق تصفية النتائج والفرز وتحديد الحقول المرجعة ديناميكياً من query parameters.',
      'بناء ترويسات وروابط التنقل القياسية (Pagination Metadata & Link Headers).'
    ],
    mechanics: [
      { step: 1, title: 'التقسيم بالإزاحة (Offset Pagination)', desc: 'استخدام page و limit في الاستعلامات البسيطة وسهولة التنقل لأي صفحة مباشرة.' },
      { step: 2, title: 'التقسيم بالمؤشر (Cursor Pagination)', desc: 'استخدام معرف آخر عنصر تم جلبه (WHERE id > lastId LIMIT 20) لتحقيق سرعة ثابتة O(1) عبر الفهارس.' },
      { step: 3, title: 'بيانات الصفحات الوصفية (Metadata)', desc: 'إرجاع معلومات إجمالي الصفحات، الصفحة الحالية، والعدد الكلي للسجلات.' }
    ],
    playgroundCode: `// Offset vs Cursor Performance Simulator
function simulatePagination(strategy, targetPage, limit = 20) {
  if (strategy === "offset") {
    const skipped = (targetPage - 1) * limit;
    console.log(\`[Offset] Scanning & Discarding \${skipped} rows before returning \${limit} rows. Cost: O(N)\`);
  } else {
    console.log(\`[Cursor] Seeking directly via Index (WHERE id > cursor LIMIT \${limit}). Cost: O(1) Constant Speed!\`);
  }
}

simulatePagination("offset", 5000); // Scans 99,980 rows!
simulatePagination("cursor", 5000); // Instant Index Seek!`,
    experimentQuestion: 'ما هي المشكلة التي تحدث في Offset Pagination عندما يقوم مستخدم جديد بإضافة سجل في نفس لحظة تصفح الصفحات؟',
    experimentAnswer: 'تحدث ظاهرة تكرار العناصر أو تخطيها (Page Drift / Missing Items)؛ لأن إضافة عنصر جديد في البداية يدفع باقي العناصر خطوة لليمين، فيظهر نفس العنصر مرتين في الصفحة التالية.',
    codeAnatomy: [
      { line: '1: const page = Math.max(1, parseInt(req.query.page) || 1);', note: 'تنظيف رقم الصفحة' },
      { line: '2: const limit = Math.min(100, parseInt(req.query.limit) || 20);', note: 'تقييد الحد الأقصى لمنع استنزاف السيرفر' },
      { line: '3: const skip = (page - 1) * limit;', note: 'حساب الإزاحة' },
      { line: '4: const items = await Product.find().skip(skip).limit(limit);', note: 'الاستعلام المقسم' }
    ],
    pitfallBad: 'const limit = req.query.limit; /* لو طلب المستخدم limit=1000000 سيسقط السيرفر! */',
    pitfallGood: 'const limit = Math.min(100, parseInt(req.query.limit) || 20); /* حماية صارمة بحد أقصى */',
    pitfallDiagnosis: 'عدم وضع حد أقصى (Max Limit) يسمح للمخترق بطلب ملايين السجلات في طلب واحد واستنزاف الذاكرة.',
    quizPool: [{
      q: 'Why is Cursor-based pagination significantly faster than Offset-based pagination on large datasets?',
      qAr: 'لماذا يعتبر التقسيم بالمؤشر (Cursor) أسرع بمراحل من التقسيم بالإزاحة (Offset) في الجداول الضخمة؟',
      options: ['It compresses the database', 'It uses B-Tree indexes directly to seek without scanning skipped rows', 'It stores everything in Redis', 'It disables sorting'],
      correct: 1,
      why: 'Cursor pagination uses index seeks (`WHERE id > cursor`) instead of scanning and skipping rows in memory.',
      whyAr: 'التقسيم بالمؤشر يعتمد على البحث المباشر في الفهارس دون الحاجة لقراءة وتجاهل السجلات السابقة.'
    }],
    interviewQ: 'متى تختار Offset Pagination ومتى تختار Cursor Pagination في تصميم الواجهات؟',
    interviewA: 'نختار `Offset Pagination` في لوحات التحكم والجداول الإدارية التي تتطلب أرقام صفحات واضحة مع إمكانية القفز لصفحة محددة (مثل صفحة 15 مباشرة). ونختار `Cursor Pagination` في التغذيات اللانهائية (Infinite Scroll مثل Twitter و Facebook) وتطبيقات الموبايل لمنع تكرار المنشورات وضمان أعلى سرعة استجابة.'
  },
  {
    slug: 'rate-limiting-security',
    title: 'API Rate Limiting, CORS Whitelisting & Advanced Security Headers',
    titleAr: 'تأمين الخوادم المتقدم: تحديد معدل الطلبات، سياسات CORS وترويسات الحماية',
    level: 3,
    order: 12,
    estMinutes: 24,
    version: 'Express 5.2',
    pattern: 'API Hardening',
    problemOpening: `خوادم الـ API المفتوحة للعامة تواجه تهديدات يومية: هجمات الـ DDoS، محاولات استنزاف الموارد بطلبات مكثفة، وسرقة البيانات عبر مواقع خارجية غير مصرح لها. إعداد سياسات الـ CORS الدقيقة وربط محدد معدل الطلبات (Rate Limiting) المعتمد على الـ Redis يضمن استقرار خادمك وحمايته من التوقف.`,
    objectives: [
      'تكوين وسيط CORS لحصر الوصول على النطاقات الموثوقة ومنع الوصول العام (*).',
      'تطبيق Rate Limiting موزع يعتمد على Redis لتطبيقات الـ Cluster والـ Load Balancers.',
      'تأمين المعاملات ضد هجمات Clickjacking و MIME Sniffing عبر ترويسات Helmet.'
    ],
    mechanics: [
      { step: 1, title: 'فحص أصل الطلب (CORS Origin Whitelisting)', desc: 'المتصفح يرسل طلب Preflight (OPTIONS) ويتأكد السيرفر من مطابقة النطاق للقائمة البيضاء.' },
      { step: 2, title: 'النافذة الزمنية المنزلقة (Sliding Window)', desc: 'تتبع عدد الطلبات لكل IP وتجديد الحصة الزمنية تلقائياً.' },
      { step: 3, title: 'ترويسات الحماية الصارمة', desc: 'تفعيل X-Content-Type-Options: nosniff لمنع المتصفح من تشغيل ملفات الصور كسكريبتات.' }
    ],
    playgroundCode: `// CORS Origin Whitelist Validator Simulation
const allowedOrigins = ["https://codehub.dev", "https://admin.codehub.dev"];
function validateCorsOrigin(requestOrigin) {
  if (allowedOrigins.includes(requestOrigin)) {
    console.log(\`✅ CORS Allowed for Origin: \${requestOrigin}\`);
    return { "Access-Control-Allow-Origin": requestOrigin, "Access-Control-Allow-Credentials": "true" };
  }
  console.log(\`⛔ CORS Blocked for Unauthorized Origin: \${requestOrigin}\`);
  return null;
}

validateCorsOrigin("https://codehub.dev");
validateCorsOrigin("https://malicious-site.com"); // Blocked!`,
    experimentQuestion: 'لماذا يعتبر وضع Access-Control-Allow-Origin: * خطراً أمنياً عند التعامل مع كوكيز التوثيق؟',
    experimentAnswer: 'المتصفحات تحظر أمنياً الجمع بين النجمة العامة (*) وخاصية Access-Control-Allow-Credentials: true؛ إذا كنت ترسل كوكيز يجب تحديد النطاق الموثوق بالاسم تحديداً.',
    codeAnatomy: [
      { line: '1: import cors from "cors";', note: 'استيراد وسيط CORS' },
      { line: '2: app.use(cors({', note: 'تكوين القواعد' },
      { line: '3:   origin: ["https://app.codehub.dev"],', note: 'النطاق المسموح فقط' },
      { line: '4:   credentials: true', note: 'السماح بإرسال الكوكيز المشفرة' },
      { line: '5: }));', note: 'نهاية التكوين' }
    ],
    pitfallBad: 'app.use(cors()); /* يسمح لأي موقع على الإنترنت بإرسال طلبات لخادمك */',
    pitfallGood: 'app.use(cors({ origin: ["https://mysite.com"], credentials: true }));',
    pitfallDiagnosis: 'تفعيل CORS بدون وسيط Whitelist يفتح الباب لسرقة البيانات وسوء استخدام الـ API.',
    quizPool: [{
      q: 'Which HTTP method is used by browsers for CORS Preflight checks before making complex cross-origin requests?',
      qAr: 'ما هو نوع طلب HTTP الذي يرسله المتصفح لفحص الـ CORS Preflight قبل إرسال الطلب الأصلي؟',
      options: ['HEAD', 'OPTIONS', 'GET', 'TRACE'],
      correct: 1,
      why: 'Browsers automatically send an HTTP OPTIONS request to determine if the actual request is safe to send.',
      whyAr: 'يرسل المتصفح طلب OPTIONS للتأكد من أن السيرفر يقبل نوع الطلب والترويسات قبل إرسال البيانات.'
    }],
    interviewQ: 'كيف تطبق Rate Limiting في معمارية تعتمد على عدة خوادم متوازية (Multiple Server Instances)?',
    interviewA: 'لا يمكن استخدام الذاكرة المحلية (In-Memory Map) لأن كل خادم سيكون له عداد منفصل؛ الحل الهندسي هو استخدام مخزن كاش مركزي مشترك وسريع مثل `Redis` عبر حزمة `rate-limit-redis`؛ حيث يتم قراءة وتحديث عداد كل عنوان IP ذرياً (Atomically) عبر جميع الخوادم.'
  },
  {
    slug: 'api-documentation',
    title: 'API Documentation with OpenAPI 3.1 & Swagger UI Generation',
    titleAr: 'توثيق واجهات الـ REST API بمعيار OpenAPI 3.1 ومولدات Swagger UI',
    level: 3,
    order: 13,
    estMinutes: 24,
    version: 'OpenAPI 3.1 / Swagger',
    pattern: 'Developer Experience',
    problemOpening: `بناء API بدون توثيق دقيق وتفاعلي يجعل مطوري الفرونت إند والموبايل يضيعون ساعات في تخمين أسماء الحقول وأنواع البيانات والاستجابات المتوقعة. معيار OpenAPI 3.1 هو المعيار العالمي لتوثيق الـ APIs؛ يتيح توليد واجهة Swagger UI تفاعلية تتيح للمطورين تجربة المسارات ورؤية نماذج البيانات وحالات الأخطاء مباشرة من المتصفح.`,
    objectives: [
      'كتابة توثيق OpenAPI 3.1 Specification للمسارات ونماذج البيانات (Schemas).',
      'دمج Swagger UI في خادم Express عبر swagger-ui-express.',
      'توليد التوثيق تلقائياً من مخططات Zod باستخدام zod-to-openapi.'
    ],
    mechanics: [
      { step: 1, title: 'هيكل وثيقة OpenAPI', desc: 'تحديد معلومات الـ API والمسارات (paths) ونماذج البيانات (components.schemas).' },
      { step: 2, title: 'حقن واجهة Swagger UI', desc: 'إتاحة مسار تفاعلي /api-docs يعرض واجهة مستخدم رسومية لتجربة الـ Endpoints.' },
      { step: 3, title: 'المزامنة مع كود التحقق', desc: 'استخدام مخططات Zod لتوليد توثيق Swagger لضمان عدم حدوث أي تضارب بين الكود والتوثيق.' }
    ],
    playgroundCode: `// OpenAPI Path Definition Anatomy Simulation
const openApiPath = {
  "/api/v1/users": {
    get: {
      summary: "Retrieve paginated users list",
      responses: {
        "200": {
          description: "Successful query",
          content: { "application/json": { schema: { type: "array" } } }
        }
      }
    }
  }
};
console.log("OpenAPI Endpoint Spec:", JSON.stringify(openApiPath, null, 2));`,
    experimentQuestion: 'ما هي الفائدة الكبرى لاستخدام معيار OpenAPI بجانب توثيق واجهة Swagger؟',
    experimentAnswer: 'OpenAPI يتيح توليد مكتبات العميل (SDKs) وتوليد اختبارات الأتمتة واستيراد المسارات مباشرة داخل أدوات مثل Postman و Insomnia بنقرة زر واحدة.',
    codeAnatomy: [
      { line: '1: import swaggerUi from "swagger-ui-express";', note: 'استيراد واجهة التوثيق' },
      { line: '2: app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));', note: 'إتاحة مسار التوثيق التفاعلي' }
    ],
    pitfallBad: 'كتابة ملفات توثيق PDF أو Word يدوية تنفصل عن الكود وتصبح قديمة ومشوهة بعد أول تعديل!',
    pitfallGood: 'توليد التوثيق التفاعلي التلقائي من الـ Schemas مباشرة (OpenAPI / Swagger)',
    pitfallDiagnosis: 'التوثيق اليدوي ينفصل عن الواقع الحقيقي للكود ويسبب أخطاء فادحة لفرق العمل.',
    quizPool: [{
      q: 'What is the standard specification format used globally for describing RESTful APIs?',
      qAr: 'ما هو التنسيق المعياري العالمي المستخدم لوصف وتوثيق واجهات الـ RESTful APIs؟',
      options: ['GraphQL Schema', 'OpenAPI Specification', 'WSDL', 'JSON-LD'],
      correct: 1,
      why: 'The OpenAPI Specification defines a standard, language-agnostic interface to REST APIs.',
      whyAr: 'معيار OpenAPI هو المعيار العالمي الموحد المستقل عن اللغات لوصف واجهات الـ REST APIs.'
    }],
    interviewQ: 'كيف تضمن عدم انقطاع التوافق (Zero Drift) بين كود الـ API والتوثيق المكتوب؟',
    interviewA: 'نتبع مبدأ Single Source of Truth: نعرف مخططات البيانات باستخدام Zod مع مكتبة `zod-to-openapi`؛ فيتم استخدام نفس المخطط لفحص الـ Request Body وقت التشغيل وتوليد الـ TypeScript Types وقت التجميع وتوليد ملف `swagger.json` تلقائياً، فيستحيل أن يختلف التوثيق عن الكود المنفذ.'
  },
  {
    slug: 'deployment-production',
    title: 'Express Production Readiness: PM2 Cluster, Reverse Proxy & Graceful Shutdowns',
    titleAr: 'دليل إنتاج إكسبريس: إدارة العمليات بـ PM2 والـ Reverse Proxy مع Nginx',
    level: 3,
    order: 14,
    estMinutes: 26,
    version: 'Production Architecture',
    pattern: 'DevOps & Reliability',
    problemOpening: `تشغيل خادم Node.js في الإنتاج بأمر <code dir="ltr">node server.js</code> البسيط هو كارثة؛ إذا حدث خطأ غير متوقع سيسقط السيرفر ولن يعيد تشغيل نفسه، ولن يستغل سوى نواة معالج واحدة (Core) من أصل 8 أو 16 نواة متاحة في السيرفر! تجهيز التطبيق للإنتاج يتطلب استخدام مدير عمليات مثل PM2 في وضع الـ Cluster ووضع الخادم خلف Reverse Proxy مثل Nginx لتوزيع الأحمال والتعامل مع شهادات SSL.`,
    objectives: [
      'تشغيل وتوزيع خوادم Node.js عبر جميع أنوية المعالج بـ PM2 Cluster Mode.',
      'ضبط إعدادات Reverse Proxy في Nginx لنقل الترويسات الحقيقية (X-Forwarded-For).',
      'تطبيق ممارسات الأمان: تفعيل NODE_ENV=production وضبط مراقبة الصحة (Health Checks).'
    ],
    mechanics: [
      { step: 1, title: 'وضع الـ Cluster في PM2', desc: 'إطلاق نسخة من السيرفر لكل نواة معالج ومشاركة نفس المنفذ وتوزيع الأحمال بالتساوي.' },
      { step: 2, title: 'الخادم العكسي Nginx', desc: 'استقبال اتصالات الـ HTTPS وتوزيعها على خوادم Node.js وتقديم الملفات الثابتة بسرعة فائقة.' },
      { step: 3, title: 'إعادة التشغيل عند انعدام التوقف (Zero-Downtime Reload)', desc: 'تحديث الكود وإعادة تشغيل الخوادم واحداً تلو الآخر دون أن يشعر المستخدم بأي انقطاع.' }
    ],
    playgroundCode: `// PM2 Ecosystem Config Simulation
const pm2Config = {
  apps: [{
    name: "codehub-api",
    script: "./server.js",
    instances: "max", // Cluster mode across all CPU cores
    exec_mode: "cluster",
    env_production: {
      NODE_ENV: "production",
      PORT: 8080
    },
    max_memory_restart: "500M"
  }]
};
console.log("PM2 Cluster Mode Configuration Specs:");
console.log(JSON.stringify(pm2Config, null, 2));`,
    experimentQuestion: 'لماذا يجب كتابة app.set("trust proxy", 1) في Express عند وضع الخادم خلف Nginx أو Cloudflare؟',
    experimentAnswer: 'لأن الطلب يصل لـ Express من خادم Nginx المحلي (127.0.0.1)؛ تفعيل trust proxy يخبر إكسبريس بقراءة عنوان الـ IP الحقيقي للعميل وبروتوكول HTTPS من ترويسات X-Forwarded-For و X-Forwarded-Proto.',
    codeAnatomy: [
      { line: '1: app.set("trust proxy", 1);', note: 'الثقة في ترويسات الـ Reverse Proxy' },
      { line: '2: app.get("/health", (req, res) => {', note: 'مسار فحص صحة الخادم لمراقبي النظام' },
      { line: '3:   res.status(200).json({ status: "healthy", uptime: process.uptime() });', note: 'رد الحالة' },
      { line: '4: });', note: 'نهاية المسار' }
    ],
    pitfallBad: 'تشغيل السيرفر في الإنتاج بـ node server.js أو nodemon!',
    pitfallGood: 'تشغيل السيرفر بواسطة pm2 start ecosystem.config.cjs --env production',
    pitfallDiagnosis: 'الأوامر العادية لا تعيد تشغيل السيرفر عند الانهيار وتستهلك نواة واحدة فقط ولا توفر إدارة للسجلات.',
    quizPool: [{
      q: 'Which PM2 execution mode runs multiple instances of your Node.js application across all available CPU cores?',
      qAr: 'أي وضع تشغيل في PM2 يشغل عدة نسخ من التطبيق موزعة على جميع أنوية المعالج المتاحة؟',
      options: ['fork_mode', 'cluster_mode', 'standalone_mode', 'worker_mode'],
      correct: 1,
      why: 'Cluster mode leverages Node.js cluster module to scale across all CPU cores without code changes.',
      whyAr: 'وضع Cluster Mode يستغل كل أنوية المعالج لتوزيع الأحمال بدون الحاجة لتغيير أي سطر في الكود.'
    }],
    interviewQ: 'ما هي وظيفة الـ Reverse Proxy (مثل Nginx) ولماذا لا نربط Node.js بالإنترنت مباشرة على المنفذ 80/443؟',
    interviewA: 'الـ Reverse Proxy يوفر: 1. إنهاء تشفير SSL/TLS بكفاءة عالية. 2. تقديم الملفات الثابتة (Static Files) بسرعة خيالية دون إزعاج Node.js. 3. توزيع الأحمال (Load Balancing). 4. حماية خادم Node.js من الهجمات المباشرة وحجب هجمات البطيء (Slowloris Attacks).'
  }
];
