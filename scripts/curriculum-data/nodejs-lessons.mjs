/* ============================================================
   nodejs-lessons.mjs — 11 New Lessons for Node.js 24 Runtime
   ============================================================ */

export const nodejsLessons = [
  {
    slug: 'node-modules',
    title: 'Module Systems: CommonJS vs ECMAScript Modules (ESM) in Node.js 24',
    titleAr: 'أنظمة الوحدات في Node.js 24: مقارنة CommonJS و ES Modules',
    level: 1,
    order: 2,
    estMinutes: 22,
    version: 'Node.js 24 LTS',
    pattern: 'Runtime Architecture',
    problemOpening: `في بيئة Node.js الحديثة، فهم كيفية تحميل الوحدات (Module Loading Algorithm) هو الفارق بين خادم سريع التحميل وخادم ينهار بأخطاء مثل ERR_REQUIRE_ESM. نظام CommonJS يعتمد على دوال require المتزامنة التي تحجب الـ Event Loop أثناء قراءة القرص، بينما نظام ESM يعتمد على التحليل الثابت والتحميل غير المتزامن الذي يسمح بالـ Top-Level Await والـ Tree-Shaking.`,
    objectives: [
      'فهم خوارزمية البحث عن الملفات (Module Resolution Algorithm) في Node.js.',
      'التحويل النظيف من CommonJS إلى ES Modules باستخدام "type": "module".',
      'إتقان استخدام Top-Level Await وحل بدائل __dirname عبر import.meta.url.'
    ],
    mechanics: [
      { step: 1, title: 'التحميل وحفظ الكاش (Module Caching)', desc: 'عند استدعاء require أو import لأول مرة، يقوم Node.js بتنفيذ الملف وحفظ النتيجة في require.cache لتجنب إعادة التنفيذ.' },
      { step: 2, title: 'الـ Top-Level Await في ESM', desc: 'إمكانية استخدام await مباشرة في رأس الملف دون الحاجة لتغليفها داخل دالة async فورية (IIFE).' },
      { step: 3, title: 'الحزم المشتركة (Dual Packages)', desc: 'تكوين حقل "exports" في package.json لدعم الاستيراد بـ CJS و ESM معاً.' }
    ],
    playgroundCode: `// Node.js Module Resolution Simulation
const moduleCache = new Map();
function fakeRequire(modulePath) {
  if (moduleCache.has(modulePath)) {
    console.log("⚡ Returning Cached Module Instance for:", modulePath);
    return moduleCache.get(modulePath);
  }
  const exports = { loadedAt: Date.now() };
  moduleCache.set(modulePath, exports);
  console.log("📦 Loaded New Module Instance:", modulePath);
  return exports;
}
fakeRequire("./db.js");
fakeRequire("./db.js"); // Cached!`,
    experimentQuestion: 'ماذا يحدث إذا حاولت استخدام Top-Level Await داخل ملف CommonJS؟',
    experimentAnswer: 'سيلقي المحرك خطأ فورياً من نوع SyntaxError: await is only valid in async functions and the top level bodies of modules.',
    codeAnatomy: [
      { line: '1: // package.json', note: 'تعريف نوع المشروع' },
      { line: '2: { "type": "module" }', note: 'تفعيل نظام ESM القياسي لجميع ملفات .js' },
      { line: '3: import { db } from "./database.js";', note: 'استيراد معياري' },
      { line: '4: await db.connect(); // Top-Level Await', note: 'اتصال فوري قبل تصدير السيرفر' }
    ],
    pitfallBad: 'const db = require("./db.mjs"); /* خطأ: CJS لا يستطيع استيراد ملف ESM متزامن */',
    pitfallGood: 'import { db } from "./db.js"; /* استيراد متوافق بنظام ESM */',
    pitfallDiagnosis: 'محاولة استدعاء ملف ESM بـ require تفشل لأن ESM غير متزامن ويجب استيراده بـ import أو dynamic import().',
    quizPool: [{
      q: 'Which property in package.json enables ECMAScript Modules by default for all .js files in a Node.js project?',
      qAr: 'أي خاصية في package.json تفعل نظام ES Modules افتراضياً لجميع ملفات .js في مشروع Node.js؟',
      options: ['"module": true', '"type": "module"', '"esm": true', '"target": "esnext"'],
      correct: 1,
      why: 'Setting "type": "module" tells Node.js to treat all .js files as ES modules.',
      whyAr: 'ضبط "type": "module" يخبر Node.js بمعاملة كل ملفات .js كوحدات ES Modules.'
    }],
    interviewQ: 'كيف تعالج التبعيات الدائرية (Circular Dependencies) في Node.js بين CJS و ESM؟',
    interviewA: 'في CommonJS، إذا كان هناك ملفان يستدعيان بعضهما، يُرجع أحدهما كائن `exports` غير مكتمل وقت التقييم. أما في ESM، فالتحليل الثابت يربط المتغيرات بالمرجع (Live Bindings)، لكن إذا تم الوصول لمتغير في منطقة الـ TDZ سيلقي ReferenceError. الحل الهندسي هو إعادة هيكلة الكود وفصل التبعية المشتركة في ملف ثالث.'
  },
  {
    slug: 'event-emitter',
    title: 'The EventEmitter Pattern, Custom Events & Memory Leak Guards',
    titleAr: 'نمط EventEmitter والأحداث المخصصة وحماية تسريب الذاكرة',
    level: 2,
    order: 4,
    estMinutes: 24,
    version: 'Node.js 24',
    pattern: 'Event-Driven Architecture',
    problemOpening: `معظم مكتبات وخوادم Node.js الأساسية (مثل HTTP Server و Streams والمآخذ الشبكية) مبنية بالكامل فوق صنف <code dir="ltr">EventEmitter</code>. إتقان هذا النمط يمكنك من بناء معمارية موجهة بالأحداث (Event-Driven Architecture) تفكك الاعتمادية بين طبقات التطبيق. لكن الخطر الأكبر هو إضافة مستمعي أحداث داخل دوال تتكرر بدون إزالتها، مما يتجاوز حد الـ MaxListeners ويسبب تسريباً قاتلاً للذاكرة!`,
    objectives: [
      'فهم صنف EventEmitter الداخلي وكيفية إرسال واستقبال الأحداث (emit & on).',
      'بناء نظام Pub/Sub داخلي مخصص لفصل الخدمات (Decoupling Services).',
      'تشخيص وحل تحذيرات MaxListenersExceededWarning وتنظيف المستمعين.'
    ],
    mechanics: [
      { step: 1, title: 'تسجيل المستمعين (on / once)', desc: 'دالة on تستمع للحدث في كل مرة، بينما once تستمع لمرة واحدة ثم تحذف نفسها تلقائياً.' },
      { step: 2, title: 'إرسال الأحداث وتمرير الحمولات (emit)', desc: 'إطلاق الحدث يمرر المعاملات لجميع المستمعين بشكل متزامن بحسب ترتيب تسجيلهم.' },
      { step: 3, title: 'حدث الخطأ الإلزامي (error event)', desc: 'إذا أرسل EventEmitter حدث "error" ولم يكن هناك مستمع له، سينهار تطبيق Node.js بالكامل!' }
    ],
    playgroundCode: `// Custom Event-Driven Order Processing System
class OrderService {
  constructor() {
    this.listeners = {};
  }
  on(event, fn) { (this.listeners[event] = this.listeners[event] || []).push(fn); }
  emit(event, data) { (this.listeners[event] || []).forEach(fn => fn(data)); }
}

const orders = new OrderService();
// Decoupled Notification Service
orders.on("order:created", (order) => console.log("📧 Sending Email Receipt for Order #", order.id));
// Decoupled Inventory Service
orders.on("order:created", (order) => console.log("📦 Deducting Stock for Item:", order.item));

// Trigger event
orders.emit("order:created", { id: 9021, item: "MacBook Pro", price: 2500 });`,
    experimentQuestion: 'ماذا يحدث إذا تم إطلاق حدث emit("error") دون وجود مستمع .on("error") مسجل في EventEmitter؟',
    experimentAnswer: 'سيقوم Node.js برمي استثناء غير معالج (Unhandled Exception) وطباعة الـ Stack Trace وإنهاء عملية الخادم (Process Exit) فوراً؛ لذلك يجب دائماً تسجيل مستمع لأحداث الخطأ.',
    codeAnatomy: [
      { line: '1: import { EventEmitter } from "node:events";', note: 'استيراد المولد الأصلي' },
      { line: '2: const emitter = new EventEmitter();', note: 'إنشاء كائن الأحداث' },
      { line: '3: emitter.setMaxListeners(20);', note: 'رفع الحد المسموح للمستمعين بأمان' },
      { line: '4: emitter.on("data", (chunk) => process(chunk));', note: 'الاستماع المستمر' }
    ],
    pitfallBad: 'function handleReq() { emitter.on("done", () => ...); } /* يضيف مستمع جديد مع كل Request ويسبب Memory Leak! */',
    pitfallGood: 'function handleReq() { emitter.once("done", () => ...); } /* مستمع لمرة واحدة يحذف نفسه فوراً */',
    pitfallDiagnosis: 'إضافة مستمعين بـ on داخل معالجات الطلبات يسبب تراكم مئات المستمعين في الذاكرة حتى ينهار السيرفر.',
    quizPool: [{
      q: 'What is the default maximum number of listeners that can be registered for a single event in an EventEmitter before a warning is logged?',
      qAr: 'ما هو الحد الأقصى الافتراضي لعدد المستمعين لحدث واحد قبل طباعة تحذير تسريب الذاكرة؟',
      options: ['5', '10', '50', 'Unlimited'],
      correct: 1,
      why: 'EventEmitter defaults to 10 listeners per event to help detect memory leaks.',
      whyAr: 'القيمة الافتراضية هي 10 مستمعين للمساعدة في كشف تسريبات الذاكرة.'
    }],
    interviewQ: 'كيف تصمم EventEmitter مخصص يتعامل مع الـ Async Listeners دون حجب الـ Event Loop؟',
    interviewA: 'نمر على مصفوفة المستمعين ونغلف كل استدعاء داخل `Promise.allSettled(listeners.map(fn => fn(data)))` أو نستخدم `events.on(emitter, "event")` التي تدعم الـ Async Iterators في Node.js الحديث.'
  },
  {
    slug: 'fs-path',
    title: 'File System Operations: Promises API, Streams & Path Normalization',
    titleAr: 'نظام الملفات والمسارات في Node.js: واجهة الوعود وتطبيع المسارات',
    level: 2,
    order: 5,
    estMinutes: 24,
    version: 'Node.js 24',
    pattern: 'I/O Operations',
    problemOpening: `التعامل مع ملفات السيرفر بـ Sync APIs مثل <code dir="ltr">fs.readFileSync</code> هي جريمة هندسية في خوادم الإنتاج؛ لأنها تجمد خيط المعالجة الرئيسي (Main Thread) وتمنع كل المستخدمين الآخرين من تصفح الموقع حتى تنتهي قراءة القرص! استخدام <code dir="ltr">node:fs/promises</code> يتيح قراءة وكتابة وتعديل الملفات بسرعة فائقة عبر خيوط libuv الخلفية.`,
    objectives: [
      'استخدام واجهة الوعود node:fs/promises في معالجة الملفات والمجلدات.',
      'تطبيع المسارات المتقاطعة (Cross-Platform Paths) باستخدام مكتبة node:path.',
      'حماية الخادم من ثغرات Directory Traversal (../) عند قراءة مسارات يحددها المستخدم.'
    ],
    mechanics: [
      { step: 1, title: 'العمليات غير المحجوبة (Non-Blocking I/O)', desc: 'خيوط libuv تتعامل مع القرص في الخلفية وتعيد النتائج لـ Event Loop عبر Microtasks.' },
      { step: 2, title: 'تطبيع المسارات بـ path.join و path.resolve', desc: 'التعامل التلقائي مع فواصل المسارات في Windows (\\) و Linux/macOS (/).' },
      { step: 3, title: 'الحماية من Directory Traversal', desc: 'فحص المسار النهائي والتأكد من أنه يبدأ بالمسار الآمن المسموح به (Base Directory).' }
    ],
    playgroundCode: `// Path Normalization & Security Guard Simulation
function sanitizeFilePath(baseDir, userInput) {
  // Simulating path.resolve & traversal prevention
  const normalized = userInput.replace(/\\.\\.\\//g, ""); // Strip dangerous traversal
  const fullPath = baseDir + "/" + normalized;
  console.log("Safe Resolved Path:", fullPath);
  return fullPath;
}
sanitizeFilePath("/var/www/uploads", "avatar.png");
sanitizeFilePath("/var/www/uploads", "../../../etc/passwd"); // Traversal neutralised!`,
    experimentQuestion: 'ما هو الفرق بين path.join() و path.resolve() في Node.js؟',
    experimentAnswer: 'الدالة path.join تدمج أجزاء المسارات معاً وتطبع المسار الناتج، بينما path.resolve تعالج المسارات من اليمين لليسار حتى تبني مساراً مطلقاً (Absolute Path) معتمداً على مجلد العمل الحالي (CWD).',
    codeAnatomy: [
      { line: '1: import fs from "node:fs/promises";', note: 'استيراد واجهة الوعود الحديثة' },
      { line: '2: import path from "node:path";', note: 'مكتبة المسارات' },
      { line: '3: const content = await fs.readFile(safePath, "utf-8");', note: 'قراءة غير محجوبة مع تشفير النصوص' }
    ],
    pitfallBad: 'fs.readFileSync("huge-file.json"); /* يجمد السيرفر بالكامل أثناء القراءة! */',
    pitfallGood: 'await fs.readFile("huge-file.json", "utf-8"); /* تشغيل غير محجوب في خيوط libuv */',
    pitfallDiagnosis: 'دوال Sync تجمد خيط التنفيذ الوحيد وتمنع معالجة أي طلبات مستخدمين أخرى حتى ينتهي القرص.',
    quizPool: [{
      q: 'Which module in modern Node.js provides asynchronous Promise-based file operations?',
      qAr: 'أي وحدة في Node.js توفر عمليات ملفات غير متزامنة تعتمد على الوعود؟',
      options: ['node:fs/sync', 'node:fs/promises', 'node:files', 'node:stream/promises'],
      correct: 1,
      why: 'node:fs/promises exports all standard fs functions wrapped in Promises.',
      whyAr: 'توفر وحدة node:fs/promises كل دوال الملفات مغلفة بوعود Promises.'
    }],
    interviewQ: 'كيف تقرأ ملفاً ضخماً بحجم 10GB في Node.js بدون أن ينهار السيرفر بخطأ Out of Memory؟',
    interviewA: 'نستخدم الـ Streams عبر `fs.createReadStream()` مع أنابيب `pipeline()`؛ حيث يتم تدفق الملف في كتل صغيرة (Chunks بحجم 64KB افتراضياً) ومعالجتها فورياً في الذاكرة مع التحكم في الـ Backpressure دون تحميل الملف كاملاً في الـ Heap.'
  },
  {
    slug: 'http-module',
    title: 'Native HTTP/HTTPS Servers & Raw Request Routing Without Frameworks',
    titleAr: 'خوادم HTTP/HTTPS الأصلية وتوجيه الطلبات الخام بدون أطر عمل',
    level: 2,
    order: 7,
    estMinutes: 26,
    version: 'Node.js 24',
    pattern: 'Low-Level Networking',
    problemOpening: `قبل ما تستخدم أطر عمل زي Express أو Fastify، لازم تفهم إزاي Node.js بيستقبل طلبات الشبكة الخام عبر وحدة <code dir="ltr">node:http</code> المدمجة. كل إطار عمل في النهاية هو مجرد غلاف فوق كائني <code dir="ltr">req</code> (وهو Readable Stream) و <code dir="ltr">res</code> (وهو Writable Stream). فهمك لكيفية قراءة الـ Headers والـ Status Codes وتجميع بايتات الـ Body يجعلك تفهم كواليس الباك إند الحقيقية.`,
    objectives: [
      'بناء خادم HTTP نقي باستخدام createServer والاستماع على المنفذ.',
      'تجميع كتل الـ Body اللاتزامنية عبر التدفق (Data & End Chunks).',
      'إرسال الترويسات (Headers)، أكواد الحالة، وضبط نوع المحتوى (Content-Type).'
    ],
    mechanics: [
      { step: 1, title: 'إنشاء خادم الشبكة (createServer)', desc: 'خادم Node.js يستمع لطلبات الـ TCP ويربطها بدالة معالجة Request Listener.' },
      { step: 2, title: 'قراءة تدفق الطلب (IncomingMessage Stream)', desc: 'جسم الطلب (Body) يصل في كتل بايتات متتابعة نجمعها في مصفوفة Buffers.' },
      { step: 3, title: 'إرسال الرد (ServerResponse)', desc: 'كتابة ترويسات الاستجابة وإغلاق الاتصال بـ res.end() لإعلام العميل بانتهاء الرد.' }
    ],
    playgroundCode: `// Native HTTP Server & Chunks Accumulator Simulation
function handleMockRequest(reqMethod, reqUrl, bodyChunks) {
  console.log(\`Received [\${reqMethod}] \${reqUrl}\`);
  const body = Buffer.concat(bodyChunks).toString();
  console.log("Parsed Request Body JSON:", body);
  return {
    status: 200,
    headers: { "Content-Type": "application/json" },
    payload: JSON.stringify({ success: true, received: JSON.parse(body) })
  };
}

const mockChunks = [Buffer.from('{"user":'), Buffer.from('"AmrZidan"}')];
const res = handleMockRequest("POST", "/api/users", mockChunks);
console.log("Server Response Payload:", res.payload);`,
    experimentQuestion: 'ماذا يحدث إذا لم تستدعِ res.end() في نهاية معالجة الطلب في خادم HTTP النقي؟',
    experimentAnswer: 'سيظل اتصال الـ TCP مفتوحاً وسيعلق متصفح العميل في انتظار وصول باقي البيانات حتى ينتهي وقت المؤقت (Request Timeout) ويظهر خطأ 504 Gateway Timeout.',
    codeAnatomy: [
      { line: '1: const server = http.createServer(async (req, res) => {', note: 'إنشاء خادم الشبكة' },
      { line: '2:   res.writeHead(200, { "Content-Type": "application/json" });', note: 'كتابة ترويسات الرد' },
      { line: '3:   res.end(JSON.stringify({ status: "running" }));', note: 'إرسال البيانات وإغلاق الاتصال' },
      { line: '4: });', note: 'نهاية الخادم' }
    ],
    pitfallBad: 'res.write(data); /* بدون res.end() يترك الاتصال معلقاً في الهواء! */',
    pitfallGood: 'res.writeHead(200); res.end(data); /* إغلاق الاتصال بأمان */',
    pitfallDiagnosis: 'الخوادم الأصلية تتطلب إغلاق تدفق الـ Writable Stream صراحة لإعلام المتصفح بانتهاء الرد.',
    quizPool: [{
      q: 'In Node.js native `http.createServer((req, res) => {})`, what type of stream is `req`?',
      qAr: 'في خادم HTTP النقي، ما هو نوع التدفق (Stream Type) الخاص بكائن الطلب `req`؟',
      options: ['Writable Stream', 'Readable Stream', 'Duplex Stream', 'Transform Stream'],
      correct: 1,
      why: 'The `req` object is an instance of http.IncomingMessage, which implements the Readable Stream interface.',
      whyAr: 'كائن `req` هو كائن IncomingMessage وهو Readable Stream لقراءة بايتات الطلب.'
    }],
    interviewQ: 'كيف يتم تنفيذ معمارية Keep-Alive في خوادم Node.js HTTP لتحسين الأداء؟',
    interviewA: 'خاصية HTTP Keep-Alive تبقي اتصال الـ TCP مفتوحاً لعدة طلبات متتالية من نفس العميل بدلاً من فتح وإغلاق اتصال جديد ومصافحة TLS لكل طلب؛ يتم تفعيلها افتراضياً في Node.js ويمكن ضبطها عبر `server.keepAliveTimeout`.'
  },
  {
    slug: 'process-env',
    title: 'The Process Object, Environment Variables, CLI Args & OS Signals',
    titleAr: 'كائن Process وإدارة متغيرات البيئة وإشارات نظام التشغيل في Node.js',
    level: 2,
    order: 8,
    estMinutes: 22,
    version: 'Node.js 24',
    pattern: 'Process Architecture',
    problemOpening: `كائن <code dir="ltr">process</code> هو جسر التواصل المباشر بين تطبيقك ونظام التشغيل المضيف. من خلاله تقرأ متغيرات البيئة (<code dir="ltr">process.env</code>) وتستقبل مدخلات الأوامر (<code dir="ltr">process.argv</code>) وتلتقط إشارات الإيقاف (<code dir="ltr">SIGTERM</code>, <code dir="ltr">SIGINT</code>) لتنفيذ الإيقاف الهادئ النظيف (Graceful Shutdown) دون قطع اتصالات المستخدمين الحالية.`,
    objectives: [
      'قراءة وتوثيق متغيرات البيئة بأمان واستخدام ميزة --env-file المدمجة في Node.js 20+.',
      'تحليل مدخلات سطر الأوامر باستخدام util.parseArgs.',
      'تنفيذ الإيقاف الهادئ (Graceful Shutdown) عند استلام إشارات SIGTERM و SIGINT.'
    ],
    mechanics: [
      { step: 1, title: 'التحميل الأصلي لملفات .env', desc: 'تشغيل node --env-file=.env دون الحاجة لمكتبات خارجية كـ dotenv.' },
      { step: 2, title: 'تحليل المعاملات (util.parseArgs)', desc: 'استخراج الأعلام (Flags مثل --port=8080) تلقائياً بأنواعها الصحيحة.' },
      { step: 3, title: 'التقاط إشارات الإيقاف', desc: 'الاستماع لـ process.on("SIGTERM") لإغلاق اتصالات قاعدة البيانات والخوادم بهدوء.' }
    ],
    playgroundCode: `// Graceful Shutdown Engine Simulation
function initiateGracefulShutdown(signal) {
  console.log(\`🛑 Received signal [\${signal}]. Starting graceful shutdown...\`);
  console.log("1. Stopping accepting new HTTP connections...");
  console.log("2. Waiting for in-flight requests to complete...");
  console.log("3. Closing PostgreSQL pool & Redis client...");
  console.log("✅ Cleanup complete. Process exited safely with code 0.");
}
initiateGracefulShutdown("SIGTERM");`,
    experimentQuestion: 'ما هو الفرق بين إشارة SIGINT وإشارة SIGTERM في إدارة عمليات Node.js؟',
    experimentAnswer: 'إشارة SIGINT تُرسل من لوحة المفاتيح عند ضغط Ctrl+C، بينما SIGTERM تُرسل من مديري العمليات (مثل Docker و Kubernetes و PM2) لمطالبة الخادم بالإغلاق المنظم.',
    codeAnatomy: [
      { line: '1: process.on("SIGTERM", async () => {', note: 'الاستماع لإشارة الإيقاف من Docker' },
      { line: '2:   await server.close();', note: 'إيقاف قبول طلبات جديدة' },
      { line: '3:   await db.disconnect();', note: 'إغلاق قاعدة البيانات بأمان' },
      { line: '4:   process.exit(0);', note: 'خروج نظيف' },
      { line: '5: });', note: 'نهاية المعالج' }
    ],
    pitfallBad: 'process.exit(1); /* إنهاء فوري يقطع طلبات المستخدمين الجارية ويفسد المعاملات */',
    pitfallGood: 'server.close(() => process.exit(0)); /* إنهاء هادئ بعد اكتمال الطلبات */',
    pitfallDiagnosis: 'الخروج الفوري بـ process.exit دون إغلاق الخادم يقطع اتصالات الدفع وقواعد البيانات في منتصفها.',
    quizPool: [{
      q: 'Which built-in Node.js 20+ flag allows loading .env files without any npm dependencies?',
      qAr: 'أي خيار مدمج في Node.js 20+ يتيح تحميل ملفات .env بدون أي مكتبات npm خارجية؟',
      options: ['--dotenv', '--env-file=.env', '--load-env', '--config'],
      correct: 1,
      why: 'Node.js introduced `--env-file` to natively parse configuration files into `process.env`.',
      whyAr: 'أضافت Node.js خيار `--env-file` لتحميل الإعدادات مباشرة في `process.env`.'
    }],
    interviewQ: 'كيف تكتشف استهلاك الذاكرة (Memory Usage) في كائن process لمنع انهيار الـ Heap؟',
    interviewA: 'نستدعي دالة `process.memoryUsage()` التي تُرجع إحصائيات دقيقة: `heapUsed` (الذاكرة المستخدمة فعلياً)، `heapTotal` (إجمالي مساحة الـ Heap المحجوزة)، و `rss` (Resident Set Size الذاكرة الإجمالية المحجوزة من نظام التشغيل).'
  },
  {
    slug: 'error-handling-node',
    title: 'Operational vs Programmer Errors, Uncaught Exceptions & Process Safety',
    titleAr: 'معمارية الأخطاء في Node.js: الاستثناءات غير الملتقطة وأمان العمليات',
    level: 2,
    order: 9,
    estMinutes: 24,
    version: 'Node.js 24',
    pattern: 'Error Architecture',
    problemOpening: `في بيئة Node.js أحادية الخيط (Single-Threaded)، أي استثناء غير ملتقط (Uncaught Exception) في أي مسار قد يسقط السيرفر بالكامل لكل آلاف المستخدمين المتصلين في نفس اللحظة! بناء نظام مناعة قوي يتطلب تمييزاً صارماً بين الأخطاء التشغيلية وحوادث الكود البرمجي مع إدارة ذكية لـ unhandledRejection.`,
    objectives: [
      'فهم سلوك uncaughtException و unhandledRejection في دورة حياة Node.js.',
      'بناء شجرة أصناف AppError الموحدة للأخطاء التشغيلية مع معالجة أكواد الحالة.',
      'تطبيق استراتيجية Crash Early & Restart بواسطة مديري العمليات (Process Managers).'
    ],
    mechanics: [
      { step: 1, title: 'التقاط الاستثناءات الشاردة', desc: 'الاستماع لـ process.on("uncaughtException") لتسجيل الكارثة البرمجية قبل الانهيار.' },
      { step: 2, title: 'رفض الوعود غير المعالج', desc: 'الاستماع لـ unhandledRejection لمنع الانهيار الصامت للوعود الفاشلة.' },
      { step: 3, title: 'إعادة التشغيل الآمن (Fail-Fast)', desc: 'عند وقوع Programmer Error، يجب إنهاء العملية وإعادة تشغيلها فوراً بواسطة PM2 لضمان نظافة الذاكرة.' }
    ],
    playgroundCode: `// Process Level Error Safety Guards
class CentralErrorLogger {
  static logFatal(error) {
    console.log("🔥 FATAL PROGRAMMER ERROR LOGGED:", error.message);
    console.log("📡 Alerting Sentry / Datadog Monitoring Service...");
    console.log("🔄 Triggering PM2 Clean Worker Restart...");
  }
}
CentralErrorLogger.logFatal(new TypeError("Cannot read properties of null"));`,
    experimentQuestion: 'لماذا تنصح وثائق Node.js الرسمية بالخروج من العملية process.exit(1) بعد وقوع uncaughtException؟',
    experimentAnswer: 'لأن وقوع استثناء غير متوقع يترك بيئة تشغيل التطبيق (Node.js Process) في حالة غير مستقرة وغير مضمونة (Corrupted Memory State)؛ الاستمرار في استقبال الطلبات قد يسرب بيانات خاطئة أو يعطل قواعد البيانات.',
    codeAnatomy: [
      { line: '1: process.on("unhandledRejection", (reason) => {', note: 'التقاط الوعود المرفوضة' },
      { line: '2:   logger.error("Unhandled Rejection:", reason);', note: 'تسجيل الخطأ' },
      { line: '3:   throw reason; // لتوجيهه لـ uncaughtException', note: 'تصعيد الخطأ' },
      { line: '4: });', note: 'نهاية الحارس' }
    ],
    pitfallBad: 'process.on("uncaughtException", () => { /* تجاهل الخطأ والاستمرار في العمل */ });',
    pitfallGood: 'process.on("uncaughtException", (err) => { logger.fatal(err); process.exit(1); });',
    pitfallDiagnosis: 'محاولة الاستمرار في العمل بعد uncaughtException تشبه قيادة سيارة بعد تعطل المكابح، ستحدث كوارث بيانات غير متوقعة.',
    quizPool: [{
      q: 'Which event is emitted when a Promise is rejected and no error handler is attached to it?',
      qAr: 'ما هو الحدث الذي يطلقه كائن process عندما يتم رفض وعد Promise دون وجود معالج خطأ له؟',
      options: ['uncaughtException', 'unhandledRejection', 'promiseError', 'exit'],
      correct: 1,
      why: 'unhandledRejection is emitted whenever a Promise is rejected and no error handler is attached within the turn of the event loop.',
      whyAr: 'يطلق Node.js حدث unhandledRejection عند رفض أي وعد دون التقاطه بـ catch.'
    }],
    interviewQ: 'ما هي معمارية الإدارة السليمة للأخطاء في بيئة Docker / Kubernetes؟',
    interviewA: 'يقوم تطبيق Node.js بتسجيل الخطأ بصيغة JSON مهيكلة (Structured JSON Log) إلى `process.stderr` ثم يخرج بكود `process.exit(1)`. يقوم مدير العمليات (Kubernetes Pod Controller) برصد خروج الحاوية وإطلاق حاوية بديلة نظيفة فوراً في أجزاء من الثانية (Self-Healing).'
  },
  {
    slug: 'child-processes',
    title: 'Multiprocessing in Node.js: spawn, fork, exec & Worker Threads',
    titleAr: 'تعدد المعالجات في Node.js: العمليات الفرعية وخيوط المعالجة (Worker Threads)',
    level: 3,
    order: 10,
    estMinutes: 28,
    version: 'Node.js 24',
    pattern: 'CPU-Intensive Concurrency',
    problemOpening: `الـ Single Thread في Node.js ممتاز للعمليات المعتمدة على الشبكة والقرص (I/O-Bound)، لكن إذا طلب مستخدم معالجة صورة ضخمة أو تشفير فيديو أو حساب معادلات رياضية معقدة (CPU-Bound)، فإن الخيط الرئيسي سيتجمد تماماً ويتوقف الخادم عن الرد على أي مستخدم آخر! لحل هذه المعضلة، نوفر وحدتين: <code dir="ltr">node:child_process</code> لتشغيل أوامر النظام وعمليات Node فرعية، و <code dir="ltr">node:worker_threads</code> لتشغيل خيوط حقيقية تشترك في الذاكرة عبر SharedArrayBuffer.`,
    objectives: [
      'التمييز الصارم بين spawn (للتدفق المباشر) و exec (للبافر المؤقت) و fork (لعمليات Node المستقلة).',
      'استخدام Worker Threads لمعالجة المهام الحسابية الثقيلة دون حجب الـ Event Loop.',
      'تبادل الرسائل الآمن (MessageChannel & postMessage) بين الخيط الرئيسي وخيوط الـ Workers.'
    ],
    mechanics: [
      { step: 1, title: 'التدفق المباشر بـ spawn', desc: 'تشغيل أوامر النظام واستقبال مخرجاتها كـ Stream مباشر للذاكرة دون حدوث Buffer Overflow.' },
      { step: 2, title: 'العمليات المستقلة بـ fork', desc: 'إنشاء عملية Node.js جديدة بالكامل بقناة اتصال IPC (Inter-Process Communication).' },
      { step: 3, title: 'خيوط المعالجة Worker Threads', desc: 'تشغيل عدة محركات V8 داخل نفس العملية ومشاركة الذاكرة لنقل البيانات الضخمة بـ Zero-Copy.' }
    ],
    playgroundCode: `// Worker Thread Message Protocol Simulation
const mainThreadChannel = {
  postTask(taskData) {
    console.log("🧵 Main Thread: Offloading Heavy CPU Task to Worker Thread:", taskData.type);
    // Simulating Worker Execution
    setTimeout(() => {
      console.log("⚡ Worker Thread: Calculation Complete! Emitting Result:", taskData.payload * 2);
    }, 300);
  }
};
mainThreadChannel.postTask({ type: "PRIME_CALCULATION", payload: 5000 });`,
    experimentQuestion: 'لماذا يعتبر child_process.spawn أكثر أماناً وكفاءة بمراحل من child_process.exec للملفات الكبيرة؟',
    experimentAnswer: 'لأن exec تقوم بتخزين كل المخرجات في الذاكرة المؤقتة (Buffer بحد أقصى 1MB افتراضياً) وإذا تجاوزتها المخرجات ينهار التطبيق بخطأ maxBuffer exceeded، بينما spawn تتدفق المخرجات كـ Streams دون أي حد لحجم البيانات.',
    codeAnatomy: [
      { line: '1: import { Worker } from "node:worker_threads";', note: 'استيراد خيوط المعالجة' },
      { line: '2: const worker = new Worker("./heavy-calc.js");', note: 'إطلاق الخيط في ملف منفصل' },
      { line: '3: worker.postMessage({ numbers: [1, 2, 3] });', note: 'إرسال البيانات للخيط' },
      { line: '4: worker.on("message", (result) => updateUI(result));', note: 'استقبال النتيجة بدون تجميد' }
    ],
    pitfallBad: 'exec(`convert ${userInput}`); /* ثغرة كارثية للحقن Command Injection! */',
    pitfallGood: 'spawn("convert", [sanitizedInput]); /* آمن تماماً ولا يمرر الأوامر للـ Shell */',
    pitfallDiagnosis: 'دالة exec تمرر الأوامر لمفسر النظام (Shell) مما يسمح للمخترق بحقن أوامر خبيثة عبر الفاصلة المنقوطة (;).',
    quizPool: [{
      q: 'Which module is best suited for sharing memory (SharedArrayBuffer) between parallel tasks in Node.js?',
      qAr: 'أي وحدة هي الأنسب لمشاركة الذاكرة بين المهام المتوازية في Node.js؟',
      options: ['node:child_process', 'node:worker_threads', 'node:cluster', 'node:vm'],
      correct: 1,
      why: 'worker_threads allows multiple V8 instances within the same process to share memory via SharedArrayBuffer.',
      whyAr: 'تسمح وحدة worker_threads لعدة خيوط داخل نفس العملية بمشاركة الذاكرة بسرعة فائقة.'
    }],
    interviewQ: 'ما هو الفرق الجوهري بين Cluster Module و Worker Threads في Node.js؟',
    interviewA: 'الـ `Cluster Module` ينشئ عمليات مستقلة تماماً (Multiple Processes) كل منها يمتلك ذاكرة ومحرك V8 و Event Loop منفصل لاستغلال كل أنوية المعالج في توزيع طلبات الشبكة. أما `Worker Threads` فتعمل داخل نفس العملية وتشترك في الذاكرة وهي مخصصة للمهام الحسابية الثقيلة (CPU-bound tasks).'
  },
  {
    slug: 'npm-packages',
    title: 'NPM Ecosystem, Semantic Versioning (SemVer), Package-Lock & Security Audits',
    titleAr: 'منظومة حزم NPM، الترقيم الدلالي (SemVer) وملفات القفل وتدقيق الأمان',
    level: 3,
    order: 11,
    estMinutes: 22,
    version: 'NPM 10+ / Node.js 24',
    pattern: 'Dependency Management',
    problemOpening: `كل تطبيق Node.js يعتمد على عشرات الحزم الخارجية من مستودع NPM. عدم فهمك لقواعد الترقيم الدلالي (Semantic Versioning) والفرق بين الرمزين <code dir="ltr">^</code> و <code dir="ltr">~</code> أو حذف ملف <code dir="ltr">package-lock.json</code> قد يؤدي لتثبيت إصدارات مختلفة على خادم الإنتاج عن جهازك مسبباً انهيار النظام فجأة! في هذا الدرس هنتعلم إدارة التبعيات وتدقيق الثغرات الأمنية بـ npm audit.`,
    objectives: [
      'فهم قواعد الترقيم الدلالي SemVer: Major.Minor.Patch والبادئات (^ و ~).',
      'قدسية ملف package-lock.json وأهمية أمر npm ci في بيئات الـ CI/CD.',
      'فحص الثغرات الأمنية وتحديث التبعيات عبر npm audit و npm outdated.'
    ],
    mechanics: [
      { step: 1, title: 'أجزاء SemVer الثلاثة (X.Y.Z)', desc: 'Major للتغييرات الكاسرة (Breaking)، Minor للميزات الجديدة المتوافقة، و Patch للإصلاحات.' },
      { step: 2, title: 'شجرة التبعيات الدقيقة (package-lock.json)', desc: 'تثبيت شجرة الإصدارات والـ Hashes المشفرة لضمان تطابق التثبيت 100% بين المطورين والإنتاج.' },
      { step: 3, title: 'أمر التثبيت النظيف (npm ci)', desc: 'حذف node_modules والتثبيت الصارم من ملف الـ lock مباشرة بأعلى سرعة وبدون أي تعديل على الملفات.' }
    ],
    playgroundCode: `// SemVer Matcher Simulation
function isCompatible(installed, required, rangeType) {
  const [iMaj, iMin, iPatch] = installed.split(".").map(Number);
  const [rMaj, rMin, rPatch] = required.split(".").map(Number);
  
  if (rangeType === "^") { // Caret: allows minor & patch (same major)
    return iMaj === rMaj && (iMin > rMin || (iMin === rMin && iPatch >= rPatch));
  }
  return installed === required;
}

console.log("Is 1.4.2 compatible with ^1.2.0?:", isCompatible("1.4.2", "1.2.0", "^")); // true
console.log("Is 2.0.0 compatible with ^1.2.0?:", isCompatible("2.0.0", "1.2.0", "^")); // false (Breaking Major!)`,
    experimentQuestion: 'لماذا يحظر استخدام npm install في خوادم الإنتاج والـ CI/CD ويجب استبداله بـ npm ci؟',
    experimentAnswer: 'لأن npm install قد يقوم بترقية بعض الحزم الفرعية وتعديل package-lock.json مما يؤدي لاختلاف بيئة الإنتاج عن التطوير، بينما npm ci يثبت بدقة متناهية من ملف الـ lock ويرفض العمل إذا كان هناك أي عدم تطابق.',
    codeAnatomy: [
      { line: '1: "dependencies": {', note: 'تبعيات التشغيل في الإنتاج' },
      { line: '2:   "express": "^5.0.0",', note: 'السماح بتحديثات الـ Minor والـ Patch فقط' },
      { line: '3:   "zod": "~3.22.4"', note: 'السماح بتحديثات الـ Patch فقط' },
      { line: '4: }', note: 'إغلاق التبعيات' }
    ],
    pitfallBad: 'حذف package-lock.json لحل مشاكل التثبيت!',
    pitfallGood: 'الاحتفاظ بـ package-lock.json وتشغيل npm ci',
    pitfallDiagnosis: 'حذف ملف الـ lock يفتح الباب لتثبيت إصدارات عشوائية غير مختبرة من التبعيات الفرعية قد تكسر المشروع بالكامل.',
    quizPool: [{
      q: 'In SemVer version `2.4.1`, what does the number `4` represent?',
      qAr: 'في رقم الإصدار `2.4.1`، ماذا يمثل الرقم `4`؟',
      options: ['Major version (Breaking change)', 'Minor version (Backwards-compatible feature)', 'Patch version (Bug fix)', 'Build number'],
      correct: 1,
      why: 'The second number in SemVer is the Minor version, indicating backwards-compatible new features.',
      whyAr: 'الرقم الثاني يمثل إصدار الـ Minor الذي يضيف ميزات جديدة متوافقة عكسياً دون كسر الكود.'
    }],
    interviewQ: 'ما هو هجوم سلسلة التوريد (Supply Chain Attack) في NPM وكيف تحمي تطبيقك منه؟',
    interviewA: 'هو هجوم يتم عبر اختراق حزمة شهيرة على NPM وحقن كود خبيث في تحديث جديد لها. نحمي المشروع بتفعيل `npm audit` وفحص التراخيص والاعتماد على أدوات مثل Snyk و Socket Security وتثبيت الإصدارات الدقيقة واستخدام الـ Lockfile المعقم.'
  },
  {
    slug: 'testing-node',
    title: 'Automated Testing with Jest: Unit Tests, Mocks, Spies & Integration',
    titleAr: 'الاختبارات المؤتمتة في Node.js بـ Jest: اختبارات الوحدات والمحاكاة (Mocks)',
    level: 3,
    order: 12,
    estMinutes: 26,
    version: 'Jest 29+ / Node Test Runner',
    pattern: 'Test-Driven Development',
    problemOpening: `إطلاق كود للإنتاج بدون اختبارات مؤتمتة هو مغامرة انتحارية؛ أي تعديل بسيط في دالة قد يكسر ميزة أخرى في مكان بعيد تماماً دون أن تدري (Regression Bugs). إتقان كتابة اختبارات الوحدات (Unit Tests) واختبارات التكامل (Integration Tests) باستخدام Jest والمحاكاة البرمجية (Mocks & Spies) يعطيك ثقة حديدية في كل سطر كود تكتبه.`,
    objectives: [
      'فهم هرم الاختبارات (Testing Pyramid): Unit vs Integration vs E2E.',
      'كتابة اختبارات وحدات دقيقة باستخدام describe و test و expect assertions.',
      'محاكاة قواعد البيانات والطلبات الخارجية باستخدام jest.fn() و jest.spyOn().'
    ],
    mechanics: [
      { step: 1, title: 'هيكل الاختبار النظيف (AAA Pattern)', desc: 'Arrange (تجهيز البيانات) &larr; Act (استدعاء الدالة) &larr; Assert (فحص النتيجة المتوقعة).' },
      { step: 2, title: 'عزل التبعيات (Mocking)', desc: 'استبدال استدعاءات الشبكة وقواعد البيانات بدوال وهمية سريعة قابلة للتوقع.' },
      { step: 3, title: 'مراقبة الاستدعاءات (Spies)', desc: 'التحقق من عدد مرات استدعاء دالة معينة والمعاملات التي تم تمريرها لها.' }
    ],
    playgroundCode: `// Simulating Jest Test Suite Runner
function describe(suiteName, fn) {
  console.log(\`🧪 Test Suite: \${suiteName}\`);
  fn();
}
function test(testName, fn) {
  try {
    fn();
    console.log(\`  ✅ PASS: \${testName}\`);
  } catch (err) {
    console.log(\`  ❌ FAIL: \${testName} -> \${err.message}\`);
  }
}
function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual !== expected) throw new Error(\`Expected \${expected} but got \${actual}\`);
    }
  };
}

describe("Payment Calculator Unit Tests", () => {
  test("Calculates 14% VAT accurately", () => {
    const calcTax = (amount) => amount * 0.14;
    expect(calcTax(100)).toBe(14);
  });
});`,
    experimentQuestion: 'ما هو الفرق بين jest.mock() و jest.spyOn()؟',
    experimentAnswer: 'الدالة jest.mock تستبدل الموديول بالكامل بدوال وهمية، بينما jest.spyOn تضع مراقباً على دالة محددة داخل كائن مع إمكانية الاحتفاظ بتنفيذها الأصلي أو محاكاته بـ mockImplementation.',
    codeAnatomy: [
      { line: '1: test("should create user successfully", async () => {', note: 'تعريف اختبار غير متزامن' },
      { line: '2:   const mockDb = jest.spyOn(User, "create").mockResolvedValue({ id: 1 });', note: 'محاكاة حفظ قاعدة البيانات' },
      { line: '3:   const result = await registerUser({ email: "test@dev.io" });', note: 'استدعاء الدالة المختبرة' },
      { line: '4:   expect(result.id).toBe(1);', note: 'فحص النتيجة' },
      { line: '5: });', note: 'نهاية الاختبار' }
    ],
    pitfallBad: 'test("database test", async () => { await realDb.deleteUsers(); }); /* اختبار يمسح بيانات حقيقية! */',
    pitfallGood: 'test("mocked test", async () => { jest.spyOn(db, "delete").mockResolvedValue(true); }); /* معزول وآمن */',
    pitfallDiagnosis: 'اختبارات الوحدات يجب ألا تتصل بقواعد بيانات أو شبكات حقيقية لضمان سرعتها وعزلها الكامل.',
    quizPool: [{
      q: 'Which pattern describes the three standard phases of writing a unit test?',
      qAr: 'أي نمط يصف المراحل القياسية الثلاث لكتابة اختبار الوحدة؟',
      options: ['MVC Pattern', 'AAA Pattern (Arrange, Act, Assert)', 'Pub/Sub Pattern', 'Singleton Pattern'],
      correct: 1,
      why: 'The AAA pattern structures tests into Arrange, Act, and Assert steps.',
      whyAr: 'نمط AAA يقسم الاختبار لتجهيز البيانات ثم استدعاء الدالة ثم فحص النتيجة.'
    }],
    interviewQ: 'ما هو مؤشر Code Coverage وما هي النسبة المستهدفة في المشاريع الإنتاجية؟',
    interviewA: 'هو مقياس لنسبة أسطر الكود والفروع (Branches) والدوال التي تم تنفيذها أثناء تشغيل الاختبارات. في بيئات العمل الاحترافية، يستهدف المهندسون نسبة تغطية تتراوح بين 80% إلى 90% لمنطق الأعمال الحساس دون المبالغة العقيمة للوصول لـ 100% على أكواد الإعدادات البسيطة.'
  },
  {
    slug: 'debugging-node',
    title: 'Node.js Debugging: Inspector Protocol, Chrome DevTools & Memory Leak Profiling',
    titleAr: 'تنقيح أخطاء Node.js: بروتوكول Inspector وأدوات DevTools وتشخيص الذاكرة',
    level: 3,
    order: 13,
    estMinutes: 24,
    version: 'Node.js 24',
    pattern: 'Diagnostics & Profiling',
    problemOpening: `الاعتماد على console.log لتشخيص المشاكل المعقدة في خوادم Node.js يشبه البحث عن إبرة في كومة قش بالظلام! يوفر Node.js ميزة التنقيح الاحترافية عبر بروتوكول <code dir="ltr">--inspect</code> الذي يتيح ربط خادم الباك إند بأدوات Chrome DevTools أو VS Code لوضع نقاط التوقف (Breakpoints)، فحص قيم المتغيرات في الذاكرة لحظياً، والتقاط لقطات الـ Heap (Heap Snapshots) لكشف تسريبات الذاكرة.`,
    objectives: [
      'تشغيل خوادم Node.js بوضع التنقيح node --inspect-brk وتوصيلها بـ DevTools.',
      'استخدام Breakpoints و Watch Expressions وتتبع مكدس الاستدعاءات (Call Stack).',
      'التقاط Heap Snapshots وتحليل الكائنات المعلقة (Retained Memory Objects).'
    ],
    mechanics: [
      { step: 1, title: 'تفعيل بروتوكول Inspector', desc: 'Node.js يفتح منفذ WebSocket (افتراضياً 9229) للتواصل مع بيئات التنقيح.' },
      { step: 2, title: 'إيقاف التنفيذ عند أول سطر (--inspect-brk)', desc: 'المحرك يعلق التنفيذ فوراً قبل تشغيل الكود حتى يتم توصيل الـ Debugger.' },
      { step: 3, title: 'تحليل الذاكرة (Heap Snapshot)', desc: 'مقارنة لقطتين من الذاكرة قبل وبعد إرسال 1000 طلب لكشف الكائنات التي لم يحذفها الـ Garbage Collector.' }
    ],
    playgroundCode: `// Memory Leak Diagnostic Simulation
let leakArray = [];
function simulateMemoryLeak() {
  for (let i = 0; i < 5; i++) {
    leakArray.push({ id: i, payload: new Array(10000).fill("LeakedData") });
    console.log(\`Captured Leak Item #\${i}. Total items in Heap:\`, leakArray.length);
  }
  console.log("⚠️ Diagnostic Alert: Retained memory growing continuously!");
}
simulateMemoryLeak();`,
    experimentQuestion: 'ما هو الفرق بين أمر node --inspect وأمر node --inspect-brk؟',
    experimentAnswer: 'الأمر --inspect يشغل التطبيق ويبدأ الاستماع على منفذ الـ Debugger دون إيقاف الكود، بينما --inspect-brk يوقف تنفيذ الكود عند السطر الأول فوراً حتى تقوم بفتح أداة التنقيح والضغط على Resume.',
    codeAnatomy: [
      { line: '1: # Terminal command to start debugging', note: 'أمر التشغيل بالتنقيح' },
      { line: '2: node --inspect-brk=0.0.0.0:9229 server.js', note: 'فتح المنفذ 9229 للاتصال من DevTools' },
      { line: '3: debugger;', note: 'نقطة توقف برمجية داخل الكود' }
    ],
    pitfallBad: 'تشغيل --inspect في خوادم الإنتاج المفتوحة للإنترنت دون تقييد المنفذ (ثغرة تنفيذ كود عن بعد RCE!)',
    pitfallGood: 'تشغيل --inspect فقط محلياً أو خلف SSH Tunnel محمي',
    pitfallDiagnosis: 'منفذ Inspector يتيح تنفيذ أي كود جافاسكربت بداخل السيرفر مباشرة، وإتاحته للعامة كارثة أمنية فادحة.',
    quizPool: [{
      q: 'Which keyword can be inserted into JavaScript code to trigger a breakpoint when running with a debugger attached?',
      qAr: 'ما هي الكلمة المفتاحية التي يمكن كتابتها داخل كود JS لإيقاف التنفيذ كنقطة توقف عند تشغيل الـ Debugger؟',
      options: ['breakpoint;', 'debugger;', 'stop();', 'pause;'],
      correct: 1,
      why: 'The `debugger;` statement invokes any available debugging functionality.',
      whyAr: 'الكلمة debugger تُفعّل نقطة التوقف البرمجية فوراً وتوقف المحرك لفحص المتغيرات.'
    }],
    interviewQ: 'كيف تشخص وتحدد سبب تسريب الذاكرة (Memory Leak) في خادم Node.js قيد التشغيل؟',
    interviewA: 'نأخذ Heap Snapshot أولي عبر DevTools، ثم نطلق ضغط طلبات (Load Test) على المسار المشبوه، ثم نأخذ Snapshot ثانياً؛ نقوم بعمل مقارنة (Comparison View) في قسم الذاكرة؛ الكائنات التي يتزايد عددها وحجمها المحتجز (Retained Size) دون أن يمسحها الـ GC هي مصدر التسريب (عادة تكون مصفوفات عامة أو Event Listeners أو Closures غير مغلقة).'
  },
  {
    slug: 'security-node',
    title: 'Node.js Security Best Practices: Helmet, Input Sanitization, Rate Limiting & CSRF',
    titleAr: 'أمان خوادم Node.js: ترويسات Helmet، تطهير المدخلات وتحديد معدل الطلبات',
    level: 3,
    order: 14,
    estMinutes: 26,
    version: 'Node.js 24 Production',
    pattern: 'Security & Hardening',
    problemOpening: `خادم Node.js الافتراضي يرسل ترويسات تكشف نوع وإصدار السيرفر (<code dir="ltr">X-Powered-By: Express</code>)، ويكون عرضة لهجمات حجب الخدمة (DoS Attacks) عبر إغراقه بملايين الطلبات، وهجمات حقن الأوامر و Cross-Site Scripting (XSS). تحصين الخادم لبيئات الإنتاج يتطلب تطبيق دفاعات متعددة الطبقات تشمل ترويسات الأمان (Helmet) والـ Rate Limiting وتطهير المدخلات.`,
    objectives: [
      'تأمين ترويسات الـ HTTP باستخدام حزمة Helmet (CSP, HSTS, X-Frame-Options).',
      'تطبيق تحديد معدل الطلبات (Rate Limiting) لمنع هجمات القوة الغاشمة (Brute-Force).',
      'منع هجمات NoSQL Injection و Cross-Site Scripting (XSS) بتطهير المدخلات.'
    ],
    mechanics: [
      { step: 1, title: 'إخفاء هوية الخادم وترويسات الأمان', desc: 'حذف X-Powered-By وتفعيل HSTS لإجبار المتصفح على الاتصال عبر HTTPS المشفر فقط.' },
      { step: 2, title: 'التحكم في معدل الطلبات (Rate Limiting)', desc: 'تحديد حد أقصى للطلبات (مثل 100 طلب لكل IP كل 15 دقيقة) وإرجاع كود 429 Too Many Requests.' },
      { step: 3, title: 'تطهير وفحص البيانات المدخلة', desc: 'استخدام مكتبات الفحص الصارم (Zod) لمنع حقن معاملات غير متوقعة مثل {$ne: null}.' }
    ],
    playgroundCode: `// Rate Limiter Engine Simulation
const ipStore = new Map();
function checkRateLimit(ip, limit = 3) {
  const count = (ipStore.get(ip) || 0) + 1;
  ipStore.set(ip, count);
  if (count > limit) {
    console.log(\`⛔ IP [\${ip}] Blocked! Rate limit exceeded (429 Too Many Requests)\`);
    return false;
  }
  console.log(\`✅ IP [\${ip}] Allowed (Request \${count}/\${limit})\`);
  return true;
}

checkRateLimit("192.168.1.1");
checkRateLimit("192.168.1.1");
checkRateLimit("192.168.1.1");
checkRateLimit("192.168.1.1"); // Blocked!`,
    experimentQuestion: 'ما هي وظيفة ترويسة Strict-Transport-Security (HSTS) التي تضعها حزمة Helmet؟',
    experimentAnswer: 'تخبر المتصفح بأن هذا الموقع لا يجب الوصول إليه مطلقاً عبر بروتوكول HTTP غير المشفر، ويجب تحويل كل الطلبات تلقائياً إلى HTTPS لمدة زمنية محددة (مثل سنة كاملة).',
    codeAnatomy: [
      { line: '1: import helmet from "helmet";', note: 'استيراد درع الأمان' },
      { line: '2: app.use(helmet());', note: 'تفعيل 15 ترويسة أمان قياسية تلقائياً' },
      { line: '3: app.disable("x-powered-by");', note: 'إخفاء بصمة Express' }
    ],
    pitfallBad: 'app.post("/login", (req, res) => { /* بدون Rate Limiting يسمح بهجمات Brute Force لتخمين كلمات السر */ });',
    pitfallGood: 'app.post("/login", authRateLimiter, (req, res) => { /* حماية مشددة: 5 محاولات فقط */ });',
    pitfallDiagnosis: 'عدم وضع Rate Limiting على مسارات تسجيل الدخول يسمح للمخترقين بتشغيل روبوتات تخمين ملايين كلمات السر.',
    quizPool: [{
      q: 'Which HTTP status code is returned when a client exceeds the allowed rate limit?',
      qAr: 'ما هو كود حالة HTTP الذي يُرجع للعميل عندما يتجاوز الحد المسموح به للطلبات؟',
      options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '429 Too Many Requests'],
      correct: 3,
      why: 'HTTP 429 Too Many Requests indicates the user has sent too many requests in a given amount of time.',
      whyAr: 'كود 429 يعبر صراحة عن تجاوز المستخدم للحد المسموح به من الطلبات في فترة زمنية معينة.'
    }],
    interviewQ: 'كيف تحمي تطبيق Express/Node.js من هجمات NoSQL Injection عند استخدام MongoDB؟',
    interviewA: 'نقوم بالتحقق الصارم من نوع البيانات باستخدام مكتبة مثل `Zod` للتأكد من أن المعامل هو `string` وليس كائن `object` يحتوي على مشغلات خبيثة مثل `{$ne: ""}`، بالإضافة لاستخدام وسيط تطهير مثل `express-mongo-sanitize` الذي يحذف أي مفاتيح تبدأ بـ `$` من `req.body` و `req.params`.'
  }
];
