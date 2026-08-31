/* ============================================================
   scripts/curriculum-data/nodejs-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 3: Node.js 24 Runtime & Backend Engine (All 11 Lessons).
   ============================================================ */

export const nodejsLessons = [
  {
    slug: 'node-modules',
    title: 'Module Systems: CommonJS vs ECMAScript Modules (ESM) in Node.js 24',
    titleAr: 'أنظمة الوحدات في Node.js 24: مقارنة CommonJS و ES Modules والتحميل الديناميكي',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'Node.js 24 LTS',
    pattern: 'Runtime Architecture & Module Resolution',
    objectives: [
      'فهم خوارزمية البحث والتحميل (Module Resolution Algorithm) وكيف يتعامل Node.js مع require.cache.',
      'التحويل النظيف والمعياري من CommonJS إلى ES Modules باستخدام "type": "module" في package.json.',
      'إتقان استخدام Top-Level Await في وحدات الـ ESM لتهيئة الاتصالات بقواعد البيانات قبل تشغيل الخادم.',
      'إدارة بدائل __dirname و __filename في بيئة ESM باستخدام import.meta.url و fileURLToPath.'
    ],
    problemOpening: `
      في بدايات Node.js عام 2009، لم تكن لغة جافاسكريبت تحتوي على أي نظام رسمي لتنظيم الملفات والـ Modules. ابتكر مطورو Node.js نظام CommonJS باستخدام <code dir="ltr">require()</code> و <code dir="ltr">module.exports</code>.
      كان نظاماً فعالاً ولكنه تزامني بالكامل (Synchronous Blocking): عند استدعاء require، يتوقف خيط التنفيذ حتى ينتهي نظام التشغيل من قراءة الملف من القرص الصلب.
      مع ظهور معيار ES Modules (ESM) الرسمي في متصفحات الويب بـ <code dir="ltr">import</code> و <code dir="ltr">export</code>، بدأت رحلة انتقال ضخمة في عالم Node.js لتوحيد بيئة التشغيل بين المتصفح والخادم.
      في Node.js 24 LTS، أصبح ESM هو الخيار الافتراضي الموصى به للمشاريع الجديدة.
      لكن هذا الانتقال تسبب في أخطاء شهيرة لكل مطوري الباك إند: مثل اختفاء متغيرات <code dir="ltr">__dirname</code> و <code dir="ltr">__filename</code>، وأخطاء <code dir="ltr">ERR_REQUIRE_ESM</code> عند محاولة استيراد حزمة ESM من ملف CJS قديم.
      في هذا الدرس، هنفكك محرك تحميل الحزم في Node.js، وهنتعلم القواعد الصارمة لبناء Dual Packages تدعم النظامين معاً بأعلى كفاءة.
    `,
    mechanics: [
      { step: '01', title: 'خوارزمية البحث عن الملفات (Module Resolution Algorithm)', desc: 'يبحث Node.js عن الملف في المسار النسبي، ثم يفحص node_modules صعوداً نحو المجلد الجذري حتى يعثر على الحزمة.' },
      { step: '02', title: 'كاش الوحدات في الذاكرة (Module Caching & Singletons)', desc: 'عند استدعاء require أو import لأول مرة، يتم تنفيذ الملف وحفظ كائن الصادرات في require.cache لضمان عدم إعادة التنفيذ.' },
      { step: '03', title: 'دعم Top-Level Await الأصلي في ESM', desc: 'إمكانية استخدام await مباشرة في أعلى الملف لإنشاء الاتصال بـ PostgreSQL أو Redis قبل تصدير كائن السيرفر.' },
      { step: '04', title: 'بدائل مسارات الملفات في ESM', desc: 'استخدام import.meta.url مع دوال path.dirname(fileURLToPath(import.meta.url)) كبديل آمن لـ __dirname القديمة.' },
      { step: '05', title: 'بناء الحزم الثنائية (Dual Packages & Package Exports)', desc: 'تكوين حقل "exports" في package.json مع مفاتيح "import" و "require" و "types" لدعم جميع المستهلكين.' }
    ],
    playgroundCode: `// محاكي خوارزمية كاش الوحدات في Node.js
const internalModuleCache = new Map();

function mockRequire(modulePath) {
  if (internalModuleCache.has(modulePath)) {
    console.log(\`⚡ Returning Cached Instance for: [\${modulePath}]\`);
    return internalModuleCache.get(modulePath);
  }

  console.log(\`📦 Compiling and Executing Fresh Module: [\${modulePath}]\`);
  const moduleExports = {
    connectedAt: new Date().toISOString(),
    connectionPoolId: Math.floor(Math.random() * 10000)
  };
  internalModuleCache.set(modulePath, moduleExports);
  return moduleExports;
}

// استدعاء الموديل مرتين
const db1 = mockRequire("./database.js");
const db2 = mockRequire("./database.js"); // سيتم إرجاعه من الكاش فوراً!

console.log("Are both database instances identical?", db1.connectionPoolId === db2.connectionPoolId); // true`,
    experimentQuestion: 'ماذا يحدث إذا قمت بحذف وحدة معينة من require.cache عبر delete require.cache[require.resolve("./db.js")] ثم استدعيتها مجدداً؟',
    experimentAnswer: 'عند حذف الوحدة من كاش require، سيقوم محرك Node.js بقراءة الملف من القرص الصلب وإعادة تنفيذه من الصفر وإنشاء كائن صادرات جديد تماماً في الذاكرة. يُستخدم هذا التكنيك في أدوات التطوير لتطبيق الـ Hot Module Reloading (HMR) دون إعادة تشغيل الخادم.',
    codeAnatomy: [
      { line: '// package.json', note: 'تعريف نوع المشروع القياسي' },
      { line: '{ "type": "module" }', note: 'تفعيل نظام ESM القياسي لجميع ملفات .js' },
      { line: 'import { fileURLToPath } from "node:url";', note: 'دالة تحويل الـ URL لمسار محلي' },
      { line: 'import path from "node:path";', note: 'وحدة المسارات الأصلية' },
      { line: 'const __filename = fileURLToPath(import.meta.url);', note: 'استخراج مسار الملف الحالي بدقة في ESM' },
      { line: 'const __dirname = path.dirname(__filename);', note: 'استخراج مسار المجلد الحاوي' },
      { line: 'import { connectDb } from "./db.js";', note: 'استيراد دالة الاتصال' },
      { line: 'export const pool = await connectDb(); // Top-Level Await', note: 'انتظار اكتمال الاتصال قبل تصدير الـ Pool' }
    ],
    pitfallBad: `// خطأ فادح: محاولة استخدام require المتزامنة داخل ملف ESM
import express from "express";
const config = require("./config.json"); // خطأ ReferenceError: require is not defined in ES module scope`,
    pitfallGood: `// الحل الصحيح في بيئة ESM
import express from "express";
import config from "./config.json" with { type: "json" }; // استيراد JSON قياسي في Node 24`,
    pitfallDiagnosis: 'في بيئة ESM ("type": "module")، يتم تعطيل متغيرات CommonJS مثل require و __dirname افتراضياً، ويجب استخدام جمل import الرسمية أو استيراد createRequire من node:module عند الضرورة القصوى.',
    quizPool: [
      {
        q: 'Which package.json field enables ECMAScript Modules (ESM) by default for all .js files in a Node.js project?',
        qAr: 'أي خاصية في package.json تفعل نظام ES Modules افتراضياً لجميع ملفات .js في مشروع Node.js؟',
        options: ['"type": "module"', '"module": true', '"esm": true', '"target": "esnext"'],
        correct: 0,
        why: 'Setting "type": "module" in package.json tells Node.js to parse all .js files as native ES modules.',
        whyAr: 'تعيين "type": "module" في package.json يخبر Node.js بمعاملة جميع ملفات .js كوحدات ES Modules قياسية.'
      },
      {
        q: 'How can you obtain the equivalent of __dirname in an ES Module in Node.js?',
        qAr: 'كيف يمكنك الحصول على ما يعادل __dirname داخل ملف ES Module في Node.js؟',
        options: [
          'path.dirname(fileURLToPath(import.meta.url))',
          'import.meta.dirname (or process.cwd())',
          'process.__dirname',
          'global.__dirname'
        ],
        correct: 0,
        why: 'fileURLToPath converts the module file:// URL to a local filesystem path, and path.dirname extracts the folder path.',
        whyAr: 'دالة fileURLToPath تحول رابط import.meta.url إلى مسار فيزيائي ثم تستخرج path.dirname مسار المجلد الحاوي.'
      },
      {
        q: 'What is a major architectural advantage of Top-Level Await in Node.js ESM?',
        qAr: 'ما هي الميزة المعمارية الكبرى لـ Top-Level Await في وحدات ESM في Node.js؟',
        options: [
          'Allows asynchronous initialization (like DB connections) to block dependent module imports until resolved, preventing unready exports.',
          'Makes all synchronous functions run faster.',
          'Disables the Node.js Garbage Collector.',
          'Eliminates the need for async/await everywhere.'
        ],
        correct: 0,
        why: 'Top-level await pauses dependent module execution until the prerequisite async initialization promise is fulfilled.',
        whyAr: 'يتيح إيقاف تحميل الوحدات التابعة مؤقتاً حتى تكتمل تهيئة الاتصال بقاعدة البيانات لضمان عدم تصدير كائنات غير جاهزة.'
      },
      {
        q: 'Why does Node.js cache module exports in require.cache (or internal ESM module registry)?',
        qAr: 'لماذا يقوم Node.js بتخزين صادرات الوحدات في الكاش الداخلي بعد أول استدعاء؟',
        options: [
          'Guarantees singleton instances and avoids redundant disk I/O and code re-execution on repeated imports.',
          'Encrypts module source code.',
          'Compresses module file size in RAM.',
          'Prevents imports from other computers.'
        ],
        correct: 0,
        why: 'Module caching ensures that a module is only executed once, returning the exact same shared instance across the entire application.',
        whyAr: 'كاش الوحدات يضمن تنفيذ الملف لمرة واحدة فقط وإرجاع نفس النسخة المشتركة (Singleton) وتفادي قراءة القرص المكررة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تتعامل مع مشكلة استيراد ملف CommonJS قديم من داخل مشروع يعمل بنظام ESM، والعكس؟',
    interviewA: '1. استيراد CJS من داخل ESM: مدعوم أصلياً عبر import cjsModule from "./legacy.cjs" أو باستخدام createRequire(import.meta.url). 2. استيراد ESM من داخل CJS: لا يمكن استخدام require() المتزامنة لأنه سيرمي ERR_REQUIRE_ESM؛ الحل هو استخدام التحميل اللاتزامني الديناميكي const { exportA } = await import("./modern.mjs") داخل دالة async.'
  },
  {
    slug: 'fs-promises',
    title: 'File System (fs/promises): Async I/O, Streams & Safe Atomic File Writes',
    titleAr: 'نظام الملفات fs/promises: عمليات الإدخال والإخراج اللاتزامنية والكتابة الذرية الآمنة (Atomic Writes)',
    level: 1,
    order: 4,
    estMinutes: 30,
    version: 'Node.js 24 fs/promises',
    pattern: 'Non-blocking I/O & Atomic File Operations',
    objectives: [
      'التمييز الصارم بين دوال fs المتزامنة (Sync: تحظر الـ Event Loop) واللاتزامنية (fs/promises).',
      'تطبيق مبدأ الكتابة الذرية للملفات (Atomic File Writes) لمنع تلف البيانات وتفريغ الملفات عند انقطاع الكهرباء.',
      'إدارة أذونات الملفات (File Permissions & POSIX Modes) والمجلدات التكرارية recursive mkdir.',
      'استخدام FileHandle لإدارة تدفقات الملفات الكبيرة وإغلاق الموارد بأمان.'
    ],
    problemOpening: `
      في خادم Node.js يستقبل 2000 طلب في الثانية، تخيل أن هناك مطوراً كتب داخل مسار تسجيل المستخدمين:
      <code dir="ltr">fs.writeFileSync('users.json', JSON.stringify(users))</code>!
      ماذا يحدث للسيرفر في هذه اللحظة؟
      دالة <code dir="ltr">writeFileSync</code> تحظر خيط التنفيذ الرئيسي بالكامل (Blocking the Event Loop) حتى ينتهي القرص الصلب الميكانيكي أو الـ SSD من كتابة الملف. خلال هذه الميلي ثواني، لن يستطيع السيرفر الرد على أي مستخدم آخر، وسترتفع مؤشرات الـ Latency إلى السماء!
      الكارثة الأكبر هي تلف الملفات (Data Corruption): لو انقطع التيار الكهربائي أو توقف الخادم في منتصف عملية الكتابة، سيتحول الملف إلى ملف تالف بحجم 0 بايت وتفقد كل بيانات المستخدمين للأبد!
      الحل المعماري هو الانتقال الكامل إلى **fs/promises** واستخدام تقنية **الكتابة الذرية (Atomic File Writes)** عبر كتابة ملف مؤقت ثم استبداله بـ <code dir="ltr">fs.rename()</code> في عملية POSIX ذرية لا تقبل التجزئة.
    `,
    mechanics: [
      { step: '01', title: 'التفويض لمكتبة libuv Thread Pool', desc: 'عمليات fs/promises لا تحظر الـ Event Loop؛ بل تفوض العمليات الثقيلة لـ 4 خيوط عمل داخلية في libuv.' },
      { step: '02', title: 'إنشاء المجلدات التكرارية الآمنة (mkdir with recursive)', desc: 'استخدام await fs.mkdir(dirPath, { recursive: true }) لإنشاء شجرة المجلدات المتداخلة دون الحاجة لفحص وجودها مسبقاً.' },
      { step: '03', title: 'استراتيجية الكتابة الذرية (Atomic Write Pattern)', desc: 'كتابة البيانات في ملف مؤقت .tmp.json ثم استخدام await fs.rename() لاستبدال الملف الأصلي فورياً في عملية ذرية مدعومة بنظام التشغيل.' },
      { step: '04', title: 'إدارة مؤشرات الملفات عبر FileHandle', desc: 'فتح الملف بـ fs.open() والحصول على FileHandle للقراءة أو الكتابة المجزأة، مع ضمان إغلاقه دائماً بـ handle.close() داخل كتلة finally.' },
      { step: '05', title: 'مراقبة تغييرات الملفات (File Watchers)', desc: 'استخدام fs.watch() مع معالجة أحداث التعديل والحذف لمراقبة ملفات الإعدادات وتحديثها في الذاكرة تلقائياً.' }
    ],
    playgroundCode: `// محاكي استراتيجية الكتابة الذرية الآمنة للملفات
class SafeJsonStore {
  constructor(filePath) { this.filePath = filePath; this.storage = new Map(); }

  async atomicWrite(data) {
    const tempPath = \`\${this.filePath}.tmp.\${Date.now()}\`;
    console.log(\`1. Writing data safely to temporary file: [\${tempPath}]\`);
    this.storage.set(tempPath, JSON.stringify(data));

    console.log(\`2. Renaming temporary file to target: [\${this.filePath}] (Atomic Operation)\`);
    const content = this.storage.get(tempPath);
    this.storage.set(this.filePath, content);
    this.storage.delete(tempPath);
    console.log("✅ File written atomically with zero corruption risk!");
  }
}

const store = new SafeJsonStore("/data/users.json");
await store.atomicWrite({ totalUsers: 1420, activeSession: "ADMIN_ROOT" });`,
    experimentQuestion: 'لماذا يعتبر فحص وجود الملف بـ fs.access() قبل محاولة قراءته بـ fs.readFile() نمطاً سيئاً (Race Condition Anti-Pattern)؟',
    experimentAnswer: 'هذا ما يعرف هندسياً بـ Time-of-Check to Time-of-Use (TOCTOU Race Condition). بين لحظة فحص وجود الملف بـ fs.access ولحظة استدعاء fs.readFile، قد تقوم عملية أخرى في نظام التشغيل بحذف الملف أو تعديل أذوناته! الحل السليم هو محاولة قراءة الملف مباشرة والتقاط خطأ ENOENT داخل كتلة try/catch.',
    codeAnatomy: [
      { line: 'import fs from "node:fs/promises";', note: 'استيراد واجهة الوعود اللاتزامنية الأصلية' },
      { line: 'import path from "node:path";', note: 'وحدة معالجة المسارات' },
      { line: 'export async function saveConfigAtomically(filePath, data) {', note: 'دالة الكتابة الذرية' },
      { line: '  const dir = path.dirname(filePath);', note: 'استخراج مسار المجلد' },
      { line: '  await fs.mkdir(dir, { recursive: true });', note: 'ضمان وجود المجلدات المتداخلة' },
      { line: '  const tempFile = `${filePath}.tmp.${Date.now()}`;', note: 'مسار الملف المؤقت' },
      { line: '  await fs.writeFile(tempFile, JSON.stringify(data, null, 2), "utf-8");', note: 'كتابة البيانات في الملف المؤقت' },
      { line: '  await fs.rename(tempFile, filePath);', note: 'استبدال ذري POSIX مضمون بنسبة 100%' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ كارثي في خوادم الإنتاج: استخدام الدوال المتزامنة في المسارات
app.get("/data", (req, res) => {
  const file = fs.readFileSync("./large-database.json"); // يوقف السيرفر بالكامل عن استقبال اتصالات جديدة!
  res.send(file);
});`,
    pitfallGood: `// الحل الهندسي: استخدام fs/promises اللاتزامني بالكامل
app.get("/data", async (req, res) => {
  const file = await fs.readFile("./large-database.json", "utf-8"); // غير حاجب للـ Event Loop
  res.send(file);
});`,
    pitfallDiagnosis: 'استخدام readFileSync أو writeFileSync يحظر الخيط الرئيسي في Node.js ويشل قدرة الخادم على معالجة الطلبات المتزامنة الأخرى، مما يرفع زمن الـ Response Time لثوانٍ معدودة.',
    quizPool: [
      {
        q: 'Why should you avoid using synchronous fs methods (e.g. fs.readFileSync) in a production web server?',
        qAr: 'لماذا يجب تجنب استخدام دوال fs المتزامنة (مثل readFileSync) داخل خوادم الويب الإنتاجية؟',
        options: [
          'They block the single JavaScript Event Loop thread, freezing the server for all concurrent user requests during disk I/O.',
          'They are not supported on Linux operating systems.',
          'They consume more internet bandwidth.',
          'They automatically delete files after reading.'
        ],
        correct: 0,
        why: 'Synchronous I/O halts the entire Node.js main thread until the disk returns data, creating catastrophic latency spikes.',
        whyAr: 'العمليات المتزامنة تحظر الخيط الرئيسي الوحيد لـ Node.js بالكامل وتجمد الخادم عن الرد على أي طلبات أخرى أثناء قراءة القرص.'
      },
      {
        q: 'What is the primary guarantee provided by the Atomic File Write pattern (Write Temp -> fs.rename)?',
        qAr: 'ما هو الضمان الأساسي الذي يوفره نمط الكتابة الذرية (كتابة مؤقتة ثم fs.rename)؟',
        options: [
          'Prevents file corruption and zero-byte files if the process crashes midway through writing.',
          'Encrypts file data using AES-256 automatically.',
          'Compresses the file size on disk.',
          'Bypasses disk space limits.'
        ],
        correct: 0,
        why: 'fs.rename is an atomic filesystem operation on POSIX systems; if writing fails midway, the original file remains completely intact and uncorrupted.',
        whyAr: 'عملية rename ذرية ولا تقبل التجزئة؛ إذا تعطل الخادم أثناء الكتابة، يظل الملف الأصلي سليماً تماماً ولا يتلف.'
      },
      {
        q: 'Which error code is thrown by fs.promises.readFile when attempting to open a non-existent file path?',
        qAr: 'ما هو كود الخطأ الذي ترميه fs.promises.readFile عند محاولة قراءة ملف غير موجود في المسار؟',
        options: ['ENOENT (Error No Entry)', 'EACCES (Permission Denied)', 'EISDIR (Is a Directory)', 'EBUSY (Device Busy)'],
        correct: 0,
        why: 'ENOENT is the standard POSIX error indicating that no such file or directory exists at the specified target path.',
        whyAr: 'كود ENOENT هو الخطأ القياسي الذي يشير إلى عدم وجود ملف أو مجلد في المسار المستهدف المحدد.'
      },
      {
        q: 'How should you safely manage FileHandle instances obtained via fs.promises.open()?',
        qAr: 'كيف يجب إدارة كائنات FileHandle التي تم الحصول عليها عبر fs.promises.open() بأمان؟',
        options: [
          'Always invoke handle.close() within a finally block to guarantee system file descriptors are released.',
          'Leave them open for faster memory access.',
          'Delete the handle variable with delete keyword.',
          'FileHandles close automatically after 5 seconds.'
        ],
        correct: 0,
        why: 'Unclosed FileHandles leak Operating System file descriptors, eventually causing EMFILE (Too many open files) crashes.',
        whyAr: 'عدم إغلاق الـ FileHandles يسبب تسريب واصفات الملفات في نظام التشغيل ويؤدي لانهيار الخادم بخطأ EMFILE.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين قراءة ملف بحجم 2GB بـ fs.readFile وبين قراءته عبر fs.createReadStream وماذا يحدث للـ RAM في الحالتين؟',
    interviewA: 'دالة fs.readFile تحاول تحميل محتوى الملف بالكامل (2GB) دفعة واحدة داخل ذاكرة الـ RAM المخصصة لـ V8 Heap Memory، مما يؤدي لتجاوز حد الذاكرة الافتراضي (Old Space Limit) وانهيار الخادم فوراً بخطأ JavaScript heap out of memory! أما fs.createReadStream فتقوم بقراءة الملف على أجزاء صغيرة (Chunks بحجم 64KB افتراضياً)، وتمريرها في خط أنابيب (Pipeline) دون أن يتجاوز استهلاك الذاكرة أكثر من بضعة ميجابايتات مهما كان حجم الملف ضخماً.'
  },
  {
    slug: 'path-url',
    title: 'Path & URL Modules: Cross-Platform File Paths & URL Traversal Prevention',
    titleAr: 'وحدتا Path و URL: إدارة مسارات أنظمة التشغيل وحماية الخوادم من ثغرات Path Traversal',
    level: 1,
    order: 5,
    estMinutes: 28,
    version: 'Node.js 24 LTS',
    pattern: 'Path Normalization & Security Boundary',
    objectives: [
      'التنقل الآمن بين أنظمة التشغيل وحل مشاكل الفواصل في Windows (\\) مقابل Linux/macOS (/).',
      'فهم الفرق الجذري بين path.join() و path.resolve().',
      'حماية خوادم الـ Static Files من هجمات اختراق المسارات المسببة لتسريب ملفات النظام (Path Traversal / Directory Traversal).',
      'استخدام واجهة WHATWG URL القياسية في Node.js لتحليل الـ Query Strings والـ Protocols بأمان.'
    ],
    problemOpening: `
      لو كتبت في كودك: <code dir="ltr">const filePath = __dirname + '/uploads/' + req.query.filename</code>، أنت كده فتحت ثغرة أمنية كارثية في خادمك اسمها **Path Traversal Vulnerability**!
      مهاجم ذكي يقدر يبعت في الـ query: <code dir="ltr">?filename=../../../../etc/passwd</code> أو <code dir="ltr">..\..\..\windows\system32\cmd.exe</code>.
      الـ String Concatenation الساذج ده هيسمح للمهاجم بالخروج من مجلد التطبيق وقراءة ملفات السيرفر السرية ومفاتيح الـ SSH ومفاتيح الـ .env بالكامل!
      بالإضافة لكده، التطبيق هيشتغل على جهازك في ماك أو لينكس لكن هينهار فوراً لما ترفعه على خادم ويندوز بسبب اختلاف فواصل المسارات (Backslashes vs Forward Slashes).
      وحدتا **node:path** و **node:url** هما خط الدفاع الأول لبناء مسارات متوافقة مع كل أنظمة التشغيل ومحصنة ضد محاولات الهروب الأمني.
    `,
    mechanics: [
      { step: '01', title: 'الفصل والدمج عبر path.join()', desc: 'دمج أجزاء المسار تلقائياً مع استخدام الفاصل الصحيح لنظام التشغيل (path.sep) وتطهير مسارات .. و .' },
      { step: '02', title: 'إنشاء المسارات المطلقة بـ path.resolve()', desc: 'تحويل سلسلة المسارات إلى مسار مطلق (Absolute Path) بالاعتماد على مجلد التشغيل الحالي process.cwd().' },
      { step: '03', title: 'درع الحماية من اختراق المسارات (Path Traversal Guard)', desc: 'فحص المسار المحسوب بـ path.normalize() والتأكد من أنه يبدأ حصراً بمسار المجلد المسموح به safeDir.startsWith().' },
      { step: '04', title: 'استخراج الأجزاء الوصفية (Extname, Basename, Dirname)', desc: 'استخراج امتداد الملف بدقة path.extname(file) واسم الملف بدون امتداد path.basename(file, ext).' },
      { step: '05', title: 'معالجة الروابط بـ WHATWG URL API', desc: 'استخدام new URL(req.url, base) لتحليل المعلمات والـ SearchParams بدون التعرض لثغرات الـ Regex Injection.' }
    ],
    playgroundCode: `// محاكي حماية الخادم من ثغرات Path Traversal
function resolveSafePath(baseUploadDir, userSuppliedFilename) {
  // 1. حساب المسار المطلق بعد إزالة أي .. تلاعب
  const safeTarget = path_mock.resolve(baseUploadDir, userSuppliedFilename);
  
  // 2. الفحص الأمني: هل ما زال الملف داخل مجلد الـ Uploads؟
  if (!safeTarget.startsWith(baseUploadDir)) {
    throw new Error(\`🚨 SECURITY VIOLATION: Path traversal blocked -> [\${userSuppliedFilename}]\`);
  }
  
  return safeTarget;
}

const path_mock = {
  resolve: (base, file) => file.includes("..") ? "/etc/passwd (Escaped!)" : \`\${base}/\${file}\`
};

try {
  resolveSafePath("/var/www/uploads", "../../../../etc/passwd");
} catch (e) {
  console.log(e.message); // تم صد الهجوم بنجاح!
}`,
    experimentQuestion: 'ما الفرق في النتيجة بين path.join("/a", "/b") و path.resolve("/a", "/b")؟',
    experimentAnswer: 'دالة path.join("/a", "/b") تقوم بدمج السلسلتين وتنتج "/a/b". أما path.resolve("/a", "/b") فإنها تعتبر كل مسار يبدأ بـ "/" بمثابة جذر جديد (Root)، وتقوم بمعالجة المعاملات من اليمين لليسار، مما يجعل النتيجة تقتصر على "/b" فقط متجاهلة "/a"!',
    codeAnatomy: [
      { line: 'import path from "node:path";', note: 'استيراد وحدة المسارات ببادئة node: الرسمية' },
      { line: 'export function getSafeFilePath(baseFolder, userInput) {', note: 'دالة التحقق الأمني' },
      { line: '  const safeBase = path.resolve(baseFolder);', note: 'تثبيت المسار المطلق للمجلد الآمن' },
      { line: '  const resolvedTarget = path.resolve(safeBase, userInput);', note: 'حساب المسار النهائي للهدف' },
      { line: '  if (!resolvedTarget.startsWith(safeBase)) {', note: 'فحص الحماية من الخروج من المجلد' },
      { line: '    throw new Error("Access Denied: Path Traversal Attempt Detected");', note: 'رمي خطأ أمني وحظر الطلب' },
      { line: '  }', note: 'نهاية الفحص' },
      { line: '  return resolvedTarget;', note: 'إرجاع المسار المحصن' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ أمني فادح: دمج المسارات يدوياً بالسلاسل النصية
const target = __dirname + "/files/" + req.query.file;
// يتيح قراءة ملفات السيرفر عبر: ?file=../../.env`,
    pitfallGood: `// الحل الأمني المعتمد: استخدام path.resolve مع فحص startsWith
const safeDir = path.resolve(__dirname, "files");
const target = path.resolve(safeDir, req.query.file);
if (!target.startsWith(safeDir)) return res.status(403).send("Forbidden");`,
    pitfallDiagnosis: 'الدمج اليدوي للسلاسل لا يعالج معاملات الرجوع للخلف (..) مما يسمح للمهاجم بالوصول لملفات النظام، بينما path.resolve مع startsWith يضمن الحبس داخل المجلد المسموح.',
    quizPool: [
      {
        q: 'How does path.resolve() differ from path.join() in Node.js?',
        qAr: 'كيف تختلف دالة path.resolve() عن دالة path.join() في Node.js؟',
        options: [
          'path.resolve() always produces an absolute path by resolving segments right-to-left until an absolute root is found; path.join() simply concatenates segments.',
          'path.join() is only for Windows.',
          'path.resolve() reads file contents from disk.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'path.resolve simulates "cd" commands from right to left to return a normalized absolute path, whereas path.join merely concatenates using platform separators.',
        whyAr: 'دالة resolve تحاكي أوامر cd من اليمين لليسار لإنتاج مسار مطلق حقيقي، بينما join تكتفي بدمج المقاطع بفواصل النظام.'
      },
      {
        q: 'How can you protect a Node.js server from Directory Traversal attacks when serving user-requested files?',
        qAr: 'كيف تحمي خادم Node.js من هجمات Directory Traversal عند تقديم ملفات يطلبها المستخدمون؟',
        options: [
          'Resolve the target path and strictly verify that targetPath.startsWith(allowedBaseDirectory).',
          'Use path.extname() only.',
          'Replace spaces with hyphens in the filename.',
          'Store all files in the root folder.'
        ],
        correct: 0,
        why: 'Verifying that the resolved absolute path starts with the allowed root directory boundary prevents "../" escapes.',
        whyAr: 'التحقق من أن المسار المطلق المحسوب يبدأ بمسار المجلد الآمن يمنع الخروج عبر معاملات ../ والوصول لملفات النظام.'
      },
      {
        q: 'What is the advantage of using the WHATWG URL class over the legacy url.parse() method?',
        qAr: 'ما هي ميزة استخدام صنف WHATWG URL القياسي مقارنة بميثود url.parse() القديم؟',
        options: [
          'Full standards compliance across Node.js and browsers, security against spoofing vulnerabilities, and rich URLSearchParams API.',
          'It runs in a separate thread.',
          'It compresses URLs.',
          'It is written in C++.'
        ],
        correct: 0,
        why: 'The WHATWG URL API is the web standard matching browser behavior and fixes legacy parsing security flaws.',
        whyAr: 'واجهة WHATWG URL هي المعيار العالمي الموحد مع المتصفحات وتعالج ثغرات التفسير الأمني القديمة في url.parse.'
      },
      {
        q: 'Which property in the path module returns the OS-specific path segment separator ("\\" on Windows, "/" on POSIX)?',
        qAr: 'أي خاصية في وحدة path ترجع الفاصل الخاص بنظام التشغيل الحالي ("\\" في ويندوز و "/" في لينكس)؟',
        options: ['path.sep', 'path.delimiter', 'path.slash', 'path.separator'],
        correct: 0,
        why: 'path.sep provides the platform-specific path segment separator.',
        whyAr: 'خاصية path.sep توفر فاصل المسارات المناسب لنظام التشغيل الحالي تلقائياً.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين path.sep و path.delimiter في Node.js؟',
    interviewA: 'خاصية path.sep تمثل فاصل المجلدات داخل المسار الواحد (وهي \\ في Windows و / في Linux/macOS). أما path.delimiter فتمثل الفاصل المستخدم بين مسارات متعددة في متغيرات البيئة مثل PATH (وهي الفاصلة المنقوطة ; في Windows والنقطتان : في Linux/macOS).'
  },
  {
    slug: 'events-emitter',
    title: 'Event-Driven Architecture: EventEmitter, Custom Events & Memory Leak Detection',
    titleAr: 'المعمارية الموجهة بالأحداث: EventEmitter، الأحداث المخصصة وكشف تسريبات الذاكرة',
    level: 2,
    order: 6,
    estMinutes: 30,
    version: 'Node.js 24 Events API',
    pattern: 'Observer Pattern & Event-Driven Architecture',
    objectives: [
      'فهم صلب المعمارية الموجهة بالأحداث في Node.js وكيف تُبنى عليه وحدات http و streams و sockets.',
      'إنشاء فئات مخصصة ترث من EventEmitter لإرسال واستقبال الأحداث المخصصة (Custom Domain Events).',
      'كشف وتشخيص تحذيرات تسريب الذاكرة الشهيرة (MaxListenersExceededWarning).',
      'استخدام events.once() للانتظار اللاتزامني النظيف للأحداث عبر async/await.'
    ],
    problemOpening: `
      كل شيء في Node.js مبني على نمط الملاحظ (Observer Pattern) عبر صنف <code dir="ltr">EventEmitter</code>: خادم الـ HTTP يطلق حدث <code dir="ltr">'request'</code>، والـ Socket يطلق حدث <code dir="ltr">'data'</code>، وتدفق الملفات يطلق حدث <code dir="ltr">'end'</code>.
      لكن في المشاريع الإنتاجية، يقع المطورون في واحدة من أشهر مشاكل الذاكرة في Node.js:
      <pre dir="ltr"><code>(node:4120) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 request listeners added.</code></pre>
      هذا التحذير لا يظهر عبثاً! إذا قمت بتسجيل مستمع أحداث <code dir="ltr">emitter.on('event', callback)</code> داخل كل طلب HTTP يطلبه العميل دون حذفه عند انتهاء الطلب، فإن كائن الـ EventEmitter سيحتفظ بمراجع لكل دوال الـ Callbacks في الذاكرة للأبد، مما يمنع مجمع القمامة (Garbage Collector) من تحريرها، حتى ينفد رصيد الـ RAM وينهار الخادم!
      في هذا الدرس، هنتعلم إزاي نبني Event-Driven Micro-Architecture نظيفة، إزاي نستخدم <code dir="ltr">events.once()</code> مع الـ Promises، وإزاي ننظف المستمعين تلقائياً عبر <code dir="ltr">AbortSignal</code>.
    `,
    mechanics: [
      { step: '01', title: 'تسجيل وإطلاق الأحداث (emit & on)', desc: 'استخدام emitter.on() لتسجيل المستمع و emitter.emit() لإطلاق الحدث مع تمرير البيانات لكافة المشتركين بشكل تزامني.' },
      { step: '02', title: 'الاستماع لمرة واحدة فقط بـ once()', desc: 'تسجيل دالة تُنفذ لمرة واحدة فقط ثم تقوم بإلغاء تسجيل نفسها تلقائياً من الذاكرة بمجرد وقوع الحدث.' },
      { step: '03', title: 'حدود المستمعين وكشف تسريب الذاكرة', desc: 'الحد الافتراضي هو 10 مستمعين لكل حدث؛ تجاوزه يطلق تحذيراً فورياً لتنبيهك بوجود تسريب في الدوال المسجلة.' },
      { step: '04', title: 'الانتظار اللاتزامني للأحداث عبر events.once()', desc: 'تحويل أي حدث إلى Promise باستخدام await events.once(server, "listening") لدمج نمط الأحداث مع async/await.' },
      { step: '05', title: 'إلغاء الاشتراكات عبر AbortSignal', desc: 'تمرير { signal: abortController.signal } في emitter.on() في Node 24 لحذف المستمع تلقائياً عند إلغاء العملية.' }
    ],
    playgroundCode: `// محاكي نظام الدفع وتوزيع الأحداث (Event-Driven)
import { EventEmitter } from "node:events";

class OrderService extends EventEmitter {
  async checkout(orderId, amount) {
    console.log(\`🛒 Processing order [\${orderId}] for $\${amount}...\`);
    // إطلاق حدث النجاح
    this.emit("order:paid", { orderId, amount, timestamp: Date.now() });
  }
}

const orders = new OrderService();

// المستمع الأول: إرسال بريد إلكتروني
orders.on("order:paid", ({ orderId }) => {
  console.log(\`📧 Email Notification sent to customer for order [\${orderId}]\`);
});

// المستمع الثاني: تحديث المخزون
orders.on("order:paid", ({ orderId, amount }) => {
  console.log(\`📦 Inventory updated for order [\${orderId}] (Billed $\${amount})\`);
});

orders.checkout("ORD-991", 450);`,
    experimentQuestion: 'ماذا يحدث إذا تم إطلاق حدث من نوع "error" على كائن EventEmitter ولم يكن هناك أي مستمع مسجل له emitter.on("error")؟',
    experimentAnswer: 'إذا أطلق EventEmitter حدث "error" دون وجود مستمع واحد على الأقل، سيعاملها Node.js كاستثناء غير معالج (Unhandled Exception)، وسيقوم فوراً بطباعة الـ Stack Trace وإنهاء عملية الخادم بالكامل process.exit(1)! لذلك يجب دائماً تسجيل مستمع لأحداث الخطأ على كل EventEmitter.',
    codeAnatomy: [
      { line: 'import { EventEmitter, once } from "node:events";', note: 'استيراد وحدة الأحداث الرسمية' },
      { line: 'class UserNotifier extends EventEmitter {', note: 'فئة ترث من EventEmitter' },
      { line: '  sendWelcome(user) {', note: 'دالة تنشيط الحدث' },
      { line: '    this.emit("user:registered", user);', note: 'إطلاق الحدث مع كائن المستخدم' },
      { line: '  }', note: 'نهاية الميثود' },
      { line: '}', note: 'نهاية الفئة' },
      { line: 'const notifier = new UserNotifier();', note: 'إنشاء النسخة' },
      { line: 'notifier.on("user:registered", (u) => analytics.track(u.id));', note: 'تسجيل مستمع التحليلات' }
    ],
    pitfallBad: `// خطأ شائع مسبب لتسريب الذاكرة: إضافة المستمع داخل مسار الطلبات دون حذفه
app.get("/events", (req, res) => {
  eventBus.on("update", (data) => res.write(data)); // كل طلب يضيف مستمعاً جديداً في الذاكرة للأبد!
});`,
    pitfallGood: `// الحل الهندسي: حذف المستمع عند إغلاق العميل للاتصال
app.get("/events", (req, res) => {
  const handler = (data) => res.write(data);
  eventBus.on("update", handler);
  req.on("close", () => eventBus.off("update", handler)); // تنظيف الذاكرة فوراً
});`,
    pitfallDiagnosis: 'عدم إزالة دوال الـ Callbacks عند انتهاء حاجة العميل إليها يبقي مراجعها حية في الذاكرة ويؤدي إلى انهيار الخادم بـ Memory Leak بعد آلاف الطلبات.',
    quizPool: [
      {
        q: 'What happens by default if an EventEmitter emits an "error" event with NO registered error listeners?',
        qAr: 'ماذا يحدث افتراضياً إذا أطلق EventEmitter حدث "error" بدون وجود أي مستمع مسجل له؟',
        options: [
          'Node.js throws an unhandled exception, prints the stack trace, and crashes the process.',
          'It silently ignores the error.',
          'It retries the operation 3 times.',
          'It writes the error to a log file without crashing.'
        ],
        correct: 0,
        why: 'In Node.js, an unhandled "error" event is treated as a fatal exception that terminates the process.',
        whyAr: 'في Node.js، معاملة حدث الخطأ غير المراقب تعتبر استثناءً قاتلاً يؤدي لإنهاء عملية الخادم فوراً.'
      },
      {
        q: 'How are listener callbacks executed when emitter.emit("event") is called in Node.js?',
        qAr: 'كيف يتم تنفيذ دوال المستمعين عند استدعاء emitter.emit("event") في Node.js؟',
        options: [
          'Synchronously in the order they were registered on the same event loop tick.',
          'Asynchronously in separate worker threads.',
          'In random order via setTimeout.',
          'In microtasks only.'
        ],
        correct: 0,
        why: 'EventEmitter invokes all registered listener functions synchronously in the exact sequence they were attached.',
        whyAr: 'يقوم EventEmitter باستدعاء دوال المستمعين بشكل تزامني متتابع بنفس ترتيب تسجيلها على الخيط الرئيسي.'
      },
      {
        q: 'What does the MaxListenersExceededWarning indicate in a Node.js process?',
        qAr: 'إلى ماذا يشير تحذير MaxListenersExceededWarning في خادم Node.js؟',
        options: [
          'More than the maximum limit (default 10) of listeners were attached to a single event, signaling a probable memory leak.',
          'The server received too many HTTP connections.',
          'The CPU is overheating.',
          'The database pool is exhausted.'
        ],
        correct: 0,
        why: 'The 10-listener default limit is a built-in safety check designed to alert developers to forgotten listener subscriptions.',
        whyAr: 'حد الـ 10 مستمعين هو صمام أمان مدمج ينبه المطور إلى نسيان حذف المستمعين وتراكمهم في الذاكرة.'
      },
      {
        q: 'How can you cleanly await an event using modern async/await in Node.js 24?',
        qAr: 'كيف يمكنك انتظار وقوع حدث ما بنظافة باستخدام async/await في Node.js 24؟',
        options: [
          'await events.once(emitter, "eventName")',
          'await emitter.on("eventName")',
          'emitter.toPromise()',
          'await emitter.emit("eventName")'
        ],
        correct: 0,
        why: 'The events.once(emitter, event) helper returns a Promise that fulfills when the specified event is emitted.',
        whyAr: 'دالة events.once المدمجة تُرجع Promise يكتمل بنجاح بمجرد إطلاق الحدث المحدد.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة انتشار الأحداث في معمارية المايكروسيرفس الموزعة (Distributed Microservices) باستخدام Redis Pub/Sub؟',
    interviewA: 'الـ EventEmitter العادي يعمل داخل عملية Node.js واحدة على سيرفر واحد فقط. عندما نوزع التطبيق على 10 خوادم أو كونتيرات Docker، نربط الـ EventEmitters بمحرك رسائل مركزي مثل Redis Pub/Sub أو RabbitMQ: عندما يقع حدث في السيرفر 1، يرسل رسالة Redis PUBLISH channel payload، وتقوم باقي الخوادم التسعة المشتركة SUBSCRIBE باستقبال الرسالة وإطلاق EventEmitter محلي لمعالجة الحدث، محققين تزامناً موزعاً فائق السرعة.'
  },
  {
    slug: 'crypto-security',
    title: 'Node.js Crypto & Security: Password Hashing (Argon2/Bcrypt), AES-256-GCM & HMAC',
    titleAr: 'الأمان والتشفير في Node.js: تشفير كلمات المرور بـ Argon2، التشفير المتماثل بـ AES-256-GCM والـ HMAC',
    level: 2,
    order: 7,
    estMinutes: 35,
    version: 'Node.js 24 Web Crypto & node:crypto',
    pattern: 'Cryptographic Security & Data Encryption',
    objectives: [
      'فهم الفرق الجوهري بين التشفير القابل لفك التشفير (Encryption) والتجزئة أحادية الاتجاه (Hashing).',
      'تشفير كلمات المرور وفق أعلى المعايير العالمية باستخدام Argon2 / Scrypt وتفادي كوارث MD5 و SHA-256.',
      'تطبيق التشفير المتماثل فائق الأمان باستخدام AES-256-GCM مع التحقق من سلامة البيانات (Auth Tag).',
      'توقيع البيانات وحمايتها من التزوير باستخدام HMAC-SHA256 (Webhooks & API Signatures).'
    ],
    problemOpening: `
      من أسوأ الكوارث التي تدمر سمعة الشركات البرمجية هي تسريب قاعدة بيانات المستخدمين واكتشاف أن كلمات المرور كانت مخزنة كنصوص صريحة (Plaintext) أو مجزأة بخوارزمية قديمة وسريعة مثل MD5 أو SHA-1 أو SHA-256 عادية!
      لماذا يعتبر استخدام SHA-256 لتخزين كلمات المرور خطأً فادحاً؟
      لأن SHA-256 صُممت لتكون فائقة السرعة لفحص سلامة الملفات. بطاقات الشاشة الحديثة (GPUs) تستطيع تجربة أكثر من 10 مليارات تجزئة في الثانية الواحدة، مما يتيح للمخترق كسر ملايين كلمات المرور عبر قواميس الـ Rainbow Tables وهجمات الـ Brute Force في دقائق معدودة!
      كلمات المرور تتطلب خوارزميات **بطيئة ومستهلكة للذاكرة عمداً (Memory-Hard Key Derivation Functions)** مثل **Argon2id** أو **Scrypt** أو **Bcrypt**.
      في هذا الدرس، هنتعلم إزاي نبني طبقة تشفير أمنية متكاملة باستخدام <code dir="ltr">node:crypto</code>، إزاي نشفر البيانات الحساسة (مثل أرقام الفيزا) بـ AES-256-GCM، وإزاي نوقع الـ Webhooks بـ HMAC.
    `,
    mechanics: [
      { step: '01', title: 'التجزئة أحادية الاتجاه بـ Scrypt / Argon2', desc: 'استخدام خوارزمية مقاومة لهجمات الـ GPU مع إضافة ملح عشوائي فريد (Salt) لكل مستخدم لمنع جداول Rainbow Tables.' },
      { step: '02', title: 'توليد الرموز العشوائية المشفرة (CSPRNG)', desc: 'استخدام crypto.randomBytes(32) أو crypto.randomUUID() لتوليد أرقام عشوائية غير قابلة للتوقع (Cryptographically Secure).' },
      { step: '03', title: 'التشفير المتماثل بـ AES-256-GCM', desc: 'تشفير النصوص الحساسة باستخدام مفتاح 256-bit مع متجه تهيئة فريد (IV) والحصول على Authentication Tag لمنع التلاعب.' },
      { step: '04', title: 'توقيع الرسائل والمصادقة بـ HMAC-SHA256', desc: 'إنشاء بصمة رقمية للرسائل المرسلة في الـ Webhooks لتمكين المستقبل من التحقق من هوية المرسل وعدم تزوير المحتوى.' },
      { step: '05', title: 'المقارنة الآمنة ضد هجمات التوقيت (Timing Attacks)', desc: 'استخدام crypto.timingSafeEqual() لمقارنة التوقيعات والـ Hashes لمنع المخترقين من قياس زمن المقارنة بالنانوثانية.' }
    ],
    playgroundCode: `// محاكي التشفير والتجزئة والتوقيع
import crypto from "node:crypto";

// 1. توليد بصمة توقيع HMAC لـ Webhook
const secretKey = "super-secret-api-key";
const payload = JSON.stringify({ event: "payment.succeeded", amount: 1500 });

const signature = crypto
  .createHmac("sha256", secretKey)
  .update(payload)
  .digest("hex");

console.log("Generated HMAC Signature:", signature);

// 2. مقارنة آمنة ضد Timing Attacks
const receivedSig = Buffer.from(signature, "hex");
const expectedSig = Buffer.from(signature, "hex");
const isValid = crypto.timingSafeEqual(receivedSig, expectedSig);
console.log("Is Signature Authenticated Safely?", isValid);`,
    experimentQuestion: 'ما هي ثغرة الـ Timing Attack وكيف تمكن المخترق من كسر رموز الـ API Keys إذا استخدمت المقارنة العادية === بدلاً من timingSafeEqual؟',
    experimentAnswer: 'عامل المقارنة العادي === يقارن النصوص حرفاً بحرف ويتوقف فوراً عند أول حرف غير متطابق (Early Exit). المخترق يستطيع إرسال آلاف الطلبات وقياس الفارق الزمني الدقيق بالنانوثانية لمعرفة كم حرفاً كان صحيحاً في تخمينه، ويكرر العملية حتى يستنتج المفتاح السري بالكامل! دالة timingSafeEqual تقارن البايتات في زمن ثابت دائماً وتمنع هذا النوع من الهجمات تماماً.',
    codeAnatomy: [
      { line: 'import crypto from "node:crypto";', note: 'استيراد وحدة التشفير الأصلية' },
      { line: 'export function encryptAesGcm(text, secretKey) {', note: 'دالة التشفير المتماثل' },
      { line: '  const iv = crypto.randomBytes(12); // 96-bit IV for GCM', note: 'توليد متجه تهيئة فريد لكل عملية' },
      { line: '  const cipher = crypto.createCipheriv("aes-256-gcm", secretKey, iv);', note: 'إنشاء كائن التشفير' },
      { line: '  let encrypted = cipher.update(text, "utf8", "hex");', note: 'تشفير النص' },
      { line: '  encrypted += cipher.final("hex");', note: 'إكمال التشفير' },
      { line: '  const authTag = cipher.getAuthTag().toString("hex");', note: 'استخراج شارة التحقق من سلامة البيانات' },
      { line: '  return { iv: iv.toString("hex"), encrypted, authTag };', note: 'إرجاع حزمة التشفير الكاملة' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ أمني كارثي: استخدام MD5 أو SHA-256 لتجزئة كلمات المرور
const hash = crypto.createHash("sha256").update(password).digest("hex");
// يمكن كسرها في ثوانٍ باستخدام كروت الشاشة الحديثة وجداول Rainbow Tables!`,
    pitfallGood: `// الحل الأمني المعتمد: استخدام Scrypt أو Argon2 مع Salt فريد
const salt = crypto.randomBytes(16).toString("hex");
crypto.scrypt(password, salt, 64, (err, derivedKey) => {
  const hash = salt + ":" + derivedKey.toString("hex"); // تخزين آمن مقاوم للكسر
});`,
    pitfallDiagnosis: 'دوال التجزئة السريعة مثل SHA-256 صُممت لفحص الملفات وليس لكلمات المرور. خوارزميات Passwords يجب أن تكون بطيئة ومحمية بـ Salt عشوائي وتستهلك موارد الذاكرة.',
    quizPool: [
      {
        q: 'Why is SHA-256 alone considered insecure for storing user passwords in modern web backends?',
        qAr: 'لماذا تعتبر خوارزمية SHA-256 وحدها غير آمنة لتخزين كلمات المرور في الخوادم الحديثة؟',
        options: [
          'It is computationally too fast, allowing modern GPUs to test billions of password hashes per second via brute-force.',
          'It can be decrypted back to plaintext easily.',
          'It is not supported in Node.js.',
          'It limits passwords to 8 characters.'
        ],
        correct: 0,
        why: 'Fast cryptographic hashes like SHA-256 are vulnerable to high-speed hardware brute-forcing; password hashing requires memory-hard, slow algorithms.',
        whyAr: 'الخوارزميات السريعة مثل SHA-256 تسمح لكروت الشاشة بتجربة مليارات الاحتمالات في الثانية؛ كلمات المرور تتطلب خوارزميات بطيئة ومكلفة عمداً.'
      },
      {
        q: 'What is the role of an Initialization Vector (IV) in AES-256-GCM symmetric encryption?',
        qAr: 'ما هو الدور الأساسي لمتجه التهيئة (IV) في التشفير المتماثل بـ AES-256-GCM؟',
        options: [
          'Ensures that encrypting the exact same plaintext multiple times always yields completely different ciphertexts.',
          'Acts as the secret private decryption key.',
          'Compresses the encrypted output.',
          'Sets the expiration timestamp of the data.'
        ],
        correct: 0,
        why: 'A unique IV prevents pattern detection, ensuring that identical plaintexts produce completely unique, randomized ciphertext outputs.',
        whyAr: 'يضمن أن تشفير نفس النص الصريح عدة مرات سينتج دائماً نصوصاً مشفرة مختلفة تماماً وعشوائية لمنع كشف الأنماط.'
      },
      {
        q: 'Why must crypto.timingSafeEqual() be used when comparing authentication HMAC signatures?',
        qAr: 'لماذا يجب استخدام crypto.timingSafeEqual() عند مقارنة تواقيع الـ HMAC في الـ APIs؟',
        options: [
          'Prevents Timing Attacks by guaranteeing that string comparisons take a constant amount of time regardless of match position.',
          'Makes the comparison 100 times faster.',
          'Validates email addresses.',
          'Automatically hashes the input string.'
        ],
        correct: 0,
        why: 'timingSafeEqual executes in constant time, preventing attackers from deducing secrets by measuring nanosecond comparison time differences.',
        whyAr: 'تنفذ المقارنة في زمن زمني ثابت يمنع المخترقين من قياس الفروق الزمنية بالنانوثانية لاستنتاج الرموز السرية.'
      },
      {
        q: 'What does the "Auth Tag" (Authentication Tag) verify in AES-GCM mode?',
        qAr: 'ما الذي تتحقق منه شارة المصادقة (Auth Tag) في نمط AES-GCM؟',
        options: [
          'Guarantees data integrity, proving the ciphertext has not been tampered with or modified by an attacker in transit.',
          'Verifies the user IP address.',
          'Checks user login permissions.',
          'Encrypts the password salt.'
        ],
        correct: 0,
        why: 'AES-GCM is an Authenticated Encryption mode; the Auth Tag proves authenticity and integrity, failing decryption if a single byte was altered.',
        whyAr: 'نمط GCM يوفر تشفيراً موثقاً؛ شارة المصادقة تثبت سلامة البيانات وتفشل فك التشفير إذا تم التلاعب بأي بايت واحد أثناء النقل.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم معمارية تخزين آمنة لمفاتيح التشفير (Key Management Service - KMS) وتطبيق تدوير المفاتيح (Key Rotation) بدون فقدان البيانات القديمة؟',
    interviewA: 'نتبع معمارية Envelope Encryption: 1. نقوم بتوليد Data Encryption Key (DEK) لتشفير البيانات في قاعدة البيانات. 2. نقوم بتشفير الـ DEK بمفتاح رئيسي Master Key مخزن في KMS خارجي آمن (مثل AWS KMS أو HashiCorp Vault). 3. نخزن رقم إصدار المفتاح (Key Version e.g. v1, v2) بجانب كل سجل مشفر. عند تدوير المفتاح إلى v2، تظل البيانات القديمة قابلة للقراءة باستخدام v1، ويتم إعادة تشفيرها تدريجياً بـ v2 في الخلفية، مما يضمن أماناً مطلقاً واستمرارية الخدمة.'
  },
  {
    slug: 'process-env',
    title: 'Process Architecture, Environment Variables (.env) & Signal Handling (SIGTERM)',
    titleAr: 'معمارية كائن Process، متغيرات البيئة (.env) والإيقاف النظيف للخادم (Graceful Shutdown)',
    level: 2,
    order: 8,
    estMinutes: 30,
    version: 'Node.js 24 (.env native support)',
    pattern: 'Process Lifecycle & Graceful Shutdown',
    objectives: [
      'فهم دورة حياة كائن process والتحكم في مؤشرات الأداء واستهلاك الذاكرة process.memoryUsage().',
      'استخدام دعم ملفات .env الأصلي في Node.js 20+ و 24 دون الحاجة لمكتبات خارجية بـ --env-file.',
      'تطبيق نمط الإيقاف النظيف والآمن (Graceful Shutdown) عند استقبال إشارات SIGTERM و SIGINT.',
      'إدارة أخطاء uncaughtException و unhandledRejection ومنع انهيار الخوادم العشوائي.'
    ],
    problemOpening: `
      في بيئات السحاب الحديثة وحاويات Docker و Kubernetes، يتم تشغيل وإيقاف خوادم Node.js باستمرار استجابة لأحمال المستخدمين (Auto-scaling & Rolling Updates).
      عندما يقرر Kubernetes إيقاف الـ Container، يقوم بإرسال إشارة <code dir="ltr">SIGTERM</code> للخادم ويمنحه مهلة 30 ثانية لإنهاء عمله.
      المبرمج المبتدئ لا يكتب أي معالج لهذه الإشارات؛ فيتوقف الخادم فجأة في منتصف كتابة معاملة بنكية في قاعدة البيانات أو يقطع اتصال عميل يرفع ملفاً مهماً!
      الحل المعماري الاحترافي هو تطبيق **الإيقاف النظيف (Graceful Shutdown)**:
      1. إيقاف استقبال أي اتصالات جديدة على خادم HTTP.
      2. إكمال ومعالجة جميع الطلبات الجارية الحالية للمستخدمين المتصلين بالفعل.
      3. إغلاق مجمعات الاتصال بقواعد البيانات (Database Pools) والـ WebSockets بأمان.
      4. إنهاء العملية بـ <code dir="ltr">process.exit(0)</code> بعد تفريغ كل الموارد.
      في هذا الدرس، هنتعلم إزاي نبني معمارية دورة حياة متينة للخادم، ونفهم ميزة قراءة ملفات <code dir="ltr">.env</code> الأصلية المدمجة في Node.js 24.
    `,
    mechanics: [
      { step: '01', title: 'التحكم في متغيرات البيئة الأصلية (Native --env-file)', desc: 'تشغيل التطبيق بـ node --env-file=.env app.js لقراءة الإعدادات في process.env بدون تثبيت مكتبة dotenv.' },
      { step: '02', title: 'مراقبة الذاكرة الحية (process.memoryUsage())', desc: 'فحص مؤشرات heapUsed و heapTotal و rss و external لاكتشاف تسريبات الذاكرة قبل حدوث الانهيار.' },
      { step: '03', title: 'الاستماع لإشارات نظام التشغيل (SIGTERM & SIGINT)', desc: 'الاعتراض المنظم لأوامر الإيقاف من نظام التشغيل (مثل Ctrl+C أو أوامر Docker Stop).' },
      { step: '04', title: 'تنفيذ بروتوكول الـ Graceful Shutdown', desc: 'إغلاق الخادم server.close()، إغلاق اتصالات الـ Database، وتعيين مؤقت إجباري Force Timeout لمنع التعليق.' },
      { step: '05', title: 'إدارة مخارج العملية بـ process.exit Codes', desc: 'استخدام كود 0 للإنهاء الناجح النظيف، واستخدام كود 1 عند حدوث أعطال حرجة غير قابلة للإصلاح.' }
    ],
    playgroundCode: `// محاكي معمارية الإيقاف النظيف للخادم (Graceful Shutdown)
class MockWebServer {
  constructor() { this.activeRequests = 2; this.isAcceptingConnections = true; }
  
  close(callback) {
    this.isAcceptingConnections = false;
    console.log("🛑 Stopped accepting new connections. Draining active requests...");
    setTimeout(() => {
      this.activeRequests = 0;
      console.log("✅ All active requests drained successfully.");
      callback();
    }, 150);
  }
}

const server = new MockWebServer();

function handleGracefulShutdown(signal) {
  console.log(\`Received signal [\${signal}]. Starting Graceful Shutdown...\`);
  
  server.close(() => {
    console.log("📦 Closing Database Connection Pool...");
    console.log("⚡ Releasing Redis Caches...");
    console.log("👋 Process terminated cleanly with code (0).");
  });
}

handleGracefulShutdown("SIGTERM");`,
    experimentQuestion: 'لماذا يعتبر الاستمرار في تشغيل خادم Node.js بعد التقاط حدث uncaughtException أمراً خطيراً جداً، ولماذا يجب إنهاء العملية؟',
    experimentAnswer: 'عند وقوع uncaughtException، يكون محرك جافاسكريبت في حالة غير مضمونة وغير مستقرة في الذاكرة (Corrupted Memory State): ربما علقت أقفال في قواعد البيانات، أو انقطعت دوال في منتصف التنفيذ. محاولة إبقاء السيرفر حياً ستؤدي لسلوكيات عشوائية خاطئة للمستخدمين الآخرين. القاعدة الذهبية هي: تسجيل الخطأ فوراً، ثم تنفيذ إيقاف نظيف سريع، وإنهاء العملية ليقوم مدير العمليات (مثل PM2 أو Kubernetes) بإنشاء نسخة جديدة نظيفة تماماً.',
    codeAnatomy: [
      { line: 'import http from "node:http";', note: 'وحدة خادم HTTP' },
      { line: 'import { pool } from "./db.js";', note: 'مجمع اتصالات قاعدة البيانات' },
      { line: 'const server = http.createServer(app);', note: 'إنشاء الخادم' },
      { line: 'function shutdown(signal) {', note: 'معالج الإيقاف النظيف' },
      { line: '  console.log(`Received ${signal}, initiating graceful shutdown...`);', note: 'تسجيل الإشارة' },
      { line: '  server.close(async () => {', note: 'إيقاف استقبال طلبات جديدة وتصريف الطلبات الحالية' },
      { line: '    await pool.end(); // إغلاق اتصالات قاعدة البيانات', note: 'تحرير اتصالات الداتابيز' },
      { line: '    process.exit(0); // الخروج النظيف', note: 'إنهاء العملية بنجاح' },
      { line: '  });', note: 'نهاية إغلاق السيرفر' },
      { line: '  setTimeout(() => process.exit(1), 10000).unref(); // Force kill after 10s', note: 'صمام أمان إجباري' },
      { line: '}', note: 'نهاية الدالة' },
      { line: 'process.on("SIGTERM", () => shutdown("SIGTERM"));', note: 'الاستماع لأوامر Docker / Kubernetes' },
      { line: 'process.on("SIGINT", () => shutdown("SIGINT"));', note: 'الاستماع لـ Ctrl+C' }
    ],
    pitfallBad: `// خطأ شائع: تجاهل أخطاء uncaughtException ومحاولة إبقاء السيرفر حياً
process.on("uncaughtException", (err) => {
  console.log("Error happened but keeping server alive:", err); // كارثة: الذاكرة تالفة وقد تسرب بيانات العملاء لبعضهم!
});`,
    pitfallGood: `// الحل الهندسي: تسجيل الخطأ والخروج الفوري ليتم إعادة التشغيل النظيف
process.on("uncaughtException", (err) => {
  logger.fatal("Uncaught Exception: Terminating process immediately", err);
  process.exit(1); // إنهاء فوري والاعتماد على PM2 / Kubernetes لإعادة التشغيل
});`,
    pitfallDiagnosis: 'تجاهل الأعطال غير المعالجة يبقي خادم الـ Node.js في حالة ذاكرة فاسدة وغير مستقرة، بينما الإيقاف وإعادة التشغيل يضمن استقرار المنظومة.',
    quizPool: [
      {
        q: 'Which Node.js flag enables native reading of environment variables from a .env file without external packages in Node 20+ & 24?',
        qAr: 'أي خيار في Node.js 20+ و 24 يفعل القراءة الأصلية لمتغيرات البيئة من ملف .env بدون مكاتب خارجية؟',
        options: ['--env-file=.env', '--dotenv', '--load-env', '--config-env'],
        correct: 0,
        why: 'Node.js introduced native --env-file flag to load environment variables into process.env at launch.',
        whyAr: 'أضافت Node.js خيار --env-file الرسمي لقراءة متغيرات البيئة وتحميلها في process.env تلقائياً عند الإقلاع.'
      },
      {
        q: 'What is the purpose of the Graceful Shutdown pattern in production backend systems?',
        qAr: 'ما هو الغرض المعماري الأساسي لنمط الإيقاف النظيف (Graceful Shutdown) في الخوادم الإنتاجية؟',
        options: [
          'Allows in-flight HTTP requests to complete, closes DB connections safely, and releases resources before process termination.',
          'Deletes all log files to save disk space.',
          'Restarts the server every hour automatically.',
          'Backs up the database to S3.'
        ],
        correct: 0,
        why: 'Graceful shutdown stops receiving new traffic while allowing pending requests to cleanly finish, preventing dropped connections.',
        whyAr: 'يوقف استقبال الزيارات الجديدة ويسمح للطلبات الجارية باكتمال معالجتها ويغلق قواعد البيانات لمنع تلف البيانات.'
      },
      {
        q: 'Which operating system signal is standardly sent by Kubernetes/Docker when terminating a container?',
        qAr: 'أي إشارة من نظام التشغيل يتم إرسالها قياسياً بواسطة Kubernetes أو Docker عند إيقاف الـ Container؟',
        options: ['SIGTERM (Signal Terminate)', 'SIGKILL', 'SIGHUP', 'SIGSTOP'],
        correct: 0,
        why: 'SIGTERM is the standard termination signal granting the application a grace period to shut down before a forced SIGKILL.',
        whyAr: 'إشارة SIGTERM هي الإشارة القياسية المهذبة التي تمنح التطبيق مهلة زمنية لتنفيذ الإيقاف النظيف قبل استخدام SIGKILL الإجباري.'
      },
      {
        q: 'What does process.memoryUsage().heapUsed represent in Node.js?',
        qAr: 'ماذا يمثل مؤشر heapUsed في دالة process.memoryUsage()؟',
        options: [
          'The actual amount of memory currently occupied by JavaScript objects, strings, and closures in the V8 heap.',
          'Total RAM installed on the server machine.',
          'Size of the node_modules folder.',
          'Total disk space available.'
        ],
        correct: 0,
        why: 'heapUsed reflects the real-time memory currently used by active JavaScript objects in the V8 engine heap.',
        whyAr: 'يمثل الحجم الفعلي للذاكرة المستهلكة حالياً بواسطة كائنات ونصوص ومتغيرات جافاسكريبت داخل V8 Heap.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي خادم Node.js من هجمات ReDoS (Regular Expression Denial of Service) التي تجمد الخيط الرئيسي وتمنعه من معالجة باقي الطلبات؟',
    interviewA: 'هجمات ReDoS تستغل الـ Catastrophic Backtracking في محركات الـ Regex عند تمرير نصوص معقدة إلى تعبيرات غير محكمة. لحماية الخادم: 1. فحص التعبيرات بأدوات مثل safe-regex لتجنب التكرارات المتداخلة (a+)+. 2. استخدام مكتبة re2 التي تعتمد على محرك Google C++ الخطي O(n) وتضمن عدم حدوث Backtracking نهائياً. 3. تفويض معالجة النصوص الثقيلة إلى Worker Threads أو استخدام timeout صريح في عمليات المطابقة.'
  },
  {
    slug: 'child-processes',
    title: 'Child Processes & OS Integration: Exec, Spawn, Fork & IPC Architecture',
    titleAr: 'العمليات الفرعية (Child Processes): الفروق بين Exec و Spawn و Fork وقنوات الـ IPC',
    level: 2,
    order: 9,
    estMinutes: 35,
    version: 'Node.js 24 node:child_process',
    pattern: 'Multi-Process Architecture & Inter-Process Communication',
    objectives: [
      'الاستفادة من تعدد الأنوية (Multi-core CPUs) بتشغيل عمليات فرعية معزولة في نظام التشغيل.',
      'التفريق الصارم بين exec (تخزين الناتج في Buffer مؤقت) و spawn (التدفق المستمر للبيانات Streams).',
      'استخدام fork لإنشاء عمليات Node.js متخصصة والتواصل معها عبر قنوات الـ IPC (Inter-Process Communication).',
      'حماية الخادم من ثغرات حقن أوامر النظام (Command Injection Vulnerabilities).'
    ],
    problemOpening: `
      خادم Node.js يعمل افتراضياً على خيط معالجة وحيد (Single Thread). لو عندك معالج في السيرفر يحتوي على 32 نواة (32-core CPU)، خادمك العادي سيستخدم نواة واحدة فقط ويترك 31 نواة أخرى نائمة بدون أي استهلاك!
      بالإضافة لكده، لو احتجت تنفذ مهمة حسابية ثقيلة جداً (مثل تحويل صيغة فيديو بـ FFmpeg، معالجة ملفات PDF ضخمة، أو تشغيل سكربت بايثون لتحليل الذكاء الاصطناعي)، تشغيل هذه المهمة على الخيط الرئيسي سيجمد السيرفر بالكامل ويمنع أي مستخدم من تصفح الموقع!
      الحل المعماري هو وحدة **node:child_process**.
      تتيح لك هذه الوحدة تفويض المهام الشاقة لعمليات مستقلة تماماً في نظام التشغيل:
      - <code dir="ltr">spawn</code>: لتشغيل الأوامر التي تنتج بيانات ضخمة كـ Streams مستمرة.
      - <code dir="ltr">exec</code>: لتشغيل أوامر الـ Shell البسيطة والحصول على النتيجة في Buffer.
      - <code dir="ltr">fork</code>: لإنشاء خوادم Node.js فرعية تتواصل مع الخادم الرئيسي عبر رسائل **IPC (Inter-Process Communication)** فائقة السرعة.
      في هذا الدرس، هنبني بنية معمارية متعددة العمليات، وهنتعلم القواعد الصارمة لمنع ثغرات Command Injection.
    `,
    mechanics: [
      { step: '01', title: 'التدفق اللاتزامني بـ spawn()', desc: 'تشغيل البرامج التنفيذية وتدفق مخرجات stdout و stderr مباشرة دون حجز الذاكرة بالكامل، مما يجعله مثالياً للملفات الكبيرة.' },
      { step: '02', title: 'التنفيذ المباشر بـ exec() والمخاطر الأمنية', desc: 'تنفيذ أوامر داخل Shell وتجميع الناتج في كائن واحد مع حد أقصى للحجم (maxBuffer: 1MB افتراضياً).' },
      { step: '03', title: 'إنشاء العمليات المتخصصة بـ fork()', desc: 'إنشاء عملية Node.js فرعية مستقلة تمتلك V8 Instance خاصاً بها وقناة اتصال ثنائية الاتجاه IPC.' },
      { step: '04', title: 'تبادل الرسائل عبر process.send() و on("message")', desc: 'تمرير كائنات JSON والمهام الحسابية بين العملية الرئيسية والفرعية دون أي تجميد للخادم.' },
      { step: '05', title: 'التحصين ضد ثغرات Command Injection', desc: 'تمرير المعاملات كمصفوفة وسائط args [] مع spawn وتجنب تمرير مدخلات المستخدم مباشرة داخل سلاسل exec.' }
    ],
    playgroundCode: `// محاكي قنوات الاتصال IPC بين العمليات الفرعية
class MockChildProcess {
  constructor() { this.listeners = new Map(); }
  on(event, cb) { this.listeners.set(event, cb); }
  send(message) {
    console.log("📨 Message sent to Child Process via IPC:", message);
    setTimeout(() => {
      const result = { taskId: message.taskId, status: "completed", computedHash: "A98F11" };
      console.log("📥 Response received from Child Process:", result);
      this.listeners.get("message")?.(result);
    }, 100);
  }
}

const child = new MockChildProcess();
child.on("message", (res) => {
  console.log("Main Thread resumed with result without blocking event loop!");
});

child.send({ taskId: "TASK_PDF_GEN_101", payload: { pages: 50 } });`,
    experimentQuestion: 'لماذا يعتبر استخدام execFile() أو spawn() مع تمرير المعاملات كمصفوفة أكثر أماناً بمراحل من استخدام exec() مع دمج السلاسل النصية؟',
    experimentAnswer: 'دالة exec() تقوم بتشغيل الأمر داخل Shell نظام التشغيل (مثل /bin/sh أو cmd.exe)، مما يتيح للمهاجم حقن أوامر خبيثة عبر فواصل الأوامر مثل ; rm -rf / أو | curl attacker.com. أما execFile() و spawn() فلا تفتح Shell وتمرر المعاملات مباشرة كـ Raw Arguments للبرنامج التنفيذي، مما يعامل مدخلات المهاجم كنص عادي غير قابل للتنفيذ ويمنع الـ Command Injection بنسبة 100%.',
    codeAnatomy: [
      { line: 'import { spawn, fork } from "node:child_process";', note: 'استيراد دوال العمليات الفرعية' },
      { line: 'export function runFfmpegConversion(input, output) {', note: 'دالة معالجة الفيديو' },
      { line: '  const process = spawn("ffmpeg", ["-i", input, "-c:v", "libx264", output]);', note: 'تمرير المعاملات كمصفوفة آمنة' },
      { line: '  process.stdout.on("data", (chunk) => logger.info(`Progress: ${chunk}`));', note: 'استقبال تدفق المخرجات كـ Stream' },
      { line: '  process.stderr.on("data", (err) => logger.warn(`FFmpeg log: ${err}`));', note: 'استقبال سجلات الأخطاء' },
      { line: '  process.on("close", (code) => {', note: 'حدث انتهاء العملية' },
      { line: '    console.log(`Process exited with code: ${code}`);', note: 'تسجيل كود الخروج' },
      { line: '  });', note: 'نهاية المستمع' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ أمني كارثي: Command Injection عبر exec مع دمج مدخلات المستخدم
import { exec } from "node:child_process";
app.get("/ping", (req, res) => {
  exec("ping -c 1 " + req.query.host, (err, stdout) => res.send(stdout));
  // لو أرسل المخترق: ?host=google.com;cat /etc/passwd سيتم تنفيذ الأمرين معاً!
});`,
    pitfallGood: `// الحل الأمني المعتمد: استخدام spawn مع مصفوفة المعاملات المعزولة
import { spawn } from "node:child_process";
app.get("/ping", (req, res) => {
  const ping = spawn("ping", ["-c", "1", req.query.host]); // المدخلات تعامل كنص خالص ولا تفتح Shell
  ping.stdout.on("data", (data) => res.send(data.toString()));
});`,
    pitfallDiagnosis: 'تمرير مدخلات غير مفحوصة لـ exec يفتح Shell نظام التشغيل ويتيح تنفيذ أي أوامر خبيثة، بينما spawn يمرر البيانات كوسائط مستقلة للبرنامج.',
    quizPool: [
      {
        q: 'What is the primary difference between child_process.spawn() and child_process.exec()?',
        qAr: 'ما هو الفرق الأساسي بين child_process.spawn() و child_process.exec()؟',
        options: [
          'spawn() returns streams for handling large outputs in real-time; exec() buffers the entire output in memory before returning.',
          'spawn() can only run Node.js scripts.',
          'exec() is non-blocking while spawn() blocks the event loop.',
          'spawn() requires root administrator privileges.'
        ],
        correct: 0,
        why: 'spawn streams data chunks via stdout/stderr with low memory overhead; exec buffers all output until completion (subject to maxBuffer).',
        whyAr: 'دالة spawn تمرر البيانات كـ Streams في الوقت الحقيقي بدون استهلاك الذاكرة، بينما exec تجمع الناتج بالكامل في الذاكرة حتى ينتهي الأمر.'
      },
      {
        q: 'What unique capability does child_process.fork() provide compared to spawn()?',
        qAr: 'ما هي الميزة الحصرية التي توفرها دالة child_process.fork() مقارنة بـ spawn()؟',
        options: [
          'Spawns a new Node.js instance with a built-in IPC (Inter-Process Communication) channel for exchanging messages.',
          'Executes Python scripts natively.',
          'Runs processes without CPU usage.',
          'Shares the exact same memory space with the parent.'
        ],
        correct: 0,
        why: 'fork is a specialized spawn for Node.js modules that automatically establishes an IPC messaging channel (process.send).',
        whyAr: 'دالة fork مخصصة لملفات Node.js وتنشئ تلقائياً قناة اتصال IPC لتبادل الرسائل والكائنات بين العمليتين بسلاسة.'
      },
      {
        q: 'How does passing arguments as an array in spawn("cmd", [args]) protect against Command Injection?',
        qAr: 'كيف يحمي تمرير المعاملات كمصفوفة في spawn("cmd", [args]) من ثغرات Command Injection؟',
        options: [
          'Bypasses shell interpretation, treating user inputs strictly as literal command parameters rather than executable shell syntax.',
          'Encrypts the parameters before running.',
          'Runs the command in a sandbox virtual machine.',
          'Translates arguments to C++.'
        ],
        correct: 0,
        why: 'Direct execution without a shell ensures meta-characters like ";", "|", or "&" are treated as literal text values, blocking injection.',
        whyAr: 'التنفيذ المباشر بدون Shell يجعل الرموز الخاصة مثل ; و | تعامل كنصوص عادية ولا يتم تفسيرها كأوامر إضافية.'
      },
      {
        q: 'What is the default buffer size limit for child_process.exec() before throwing maxBuffer exceeded error?',
        qAr: 'ما هو الحد الأقصى الافتراضي لحجم الـ Buffer في child_process.exec() قبل رمي خطأ maxBuffer؟',
        options: ['1024 * 1024 bytes (1 MB)', '100 MB', 'Unlimited', '64 KB'],
        correct: 0,
        why: 'Node.js sets a default maxBuffer of 1024 * 1024 (1MB) on exec; exceeding it terminates the process with an error.',
        whyAr: 'الحد الافتراضي هو 1 ميجابايت؛ وإذا زادت مخرجات الأمر عن ذلك ينهار الطلب بخطأ تجاوز الـ maxBuffer.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق المعماري بين استخدام Child Processes (fork) واستخدام Worker Threads (worker_threads) في خوادم Node.js ومتى تختار كلاً منهما؟',
    interviewA: 'الـ Child Processes تنشئ عمليات نظام تشغيل منفصلة تماماً (Separate OS Processes): كل عملية تملك PID خاص وذاكرة RAM معزولة تماماً و V8 Instance مستقل، ولا تؤثر أي انهيارات في العملية الفرعية على العملية الأم، ويتم التواصل بـ IPC Serialization (مثالية لعزل المهام الثقيلة المنفصلة). أما Worker Threads فتعمل داخل نفس عملية الخادم (Same Process): تتشارك مساحة الذاكرة عبر SharedArrayBuffer وتتواصل بـ MessageChannel بدون استهلاك وقت إنشاء عمليات جديدة (مثالية للمهام الحسابية المتكررة مثل تشفير الصور ومعالجة المصفوفات الضخمة).'
  },
  {
    slug: 'worker-threads',
    title: 'Worker Threads (worker_threads): Multi-Threading, SharedArrayBuffer & Atomics',
    titleAr: 'خيوط العمل المتعددة (Worker Threads): البرمجة متوازية الخيوط، الذاكرة المشتركة وعمليات Atomics',
    level: 3,
    order: 10,
    estMinutes: 35,
    version: 'Node.js 24 worker_threads',
    pattern: 'Multi-threaded Concurrency & Shared Memory',
    objectives: [
      'تنفيذ المهام الحسابية الشاقة (CPU-bound tasks) على خيوط عمل حقيقية في الخلفية دون حظر الـ Event Loop.',
      'إنشاء قنوات التراسل (MessageChannel & MessagePort) وتبادل البيانات بين الخيوط.',
      'مشاركة الذاكرة الصفرية (Zero-Copy Shared Memory) باستخدام SharedArrayBuffer.',
      'تجنب سباق البيانات (Race Conditions) باستخدام عمليات Atomics الذرية (Atomics.add, Atomics.wait).'
    ],
    problemOpening: `
      خادم Node.js يشتهر بأنه فائق السرعة في مهام الـ I/O-bound (مثل قراءة قواعد البيانات واستقبال طلبات الـ HTTP)، لكنه كان يعاني تاريخياً في المهام الحسابية (CPU-intensive tasks).
      لو كتبت دالة تحسب الأرقام الأولية (Prime Numbers) أو خوارزمية ذكاء اصطناعي تستغرق 5 ثوانٍ على الخيط الرئيسي، فإن خادمك سيتوقف بالكامل عن خدمة أي مستخدم طوال الـ 5 ثوانٍ!
      وحدة **worker_threads** جلبت "البرمجة الحقيقية متوازية الخيوط" (True Multi-Threading) إلى Node.js!
      تتيح لك تشغيل خيوط عمل متعددة داخل نفس عملية الخادم، كل خيط يملك V8 Engine مستقل وخاص به، ويعمل على نواة معالج مختلفة بالتوازي التام.
      والأروع من ذلك هو إمكانية مشاركة الذاكرة بين الخيوط بسرعة الضوء دون أي نسخ للبيانات (Zero-Copy) باستخدام **SharedArrayBuffer** وتأمين العمليات الذرية بـ **Atomics**.
      في هذا الدرس، هنبني Thread Pool متكامل لتوزيع المهام الحسابية، وهنتعلم إزاي ننقل البيانات الضخمة بين الخيوط في أجزاء من الميلي ثانية.
    `,
    mechanics: [
      { step: '01', title: 'إنشاء خيط العمل المستقل بـ new Worker()', desc: 'تحميل ملف جافاسكريبت في خيط عمل فرعي منفصل يمتلك V8 Isolate خاصاً به وتمرير البيانات المبدئية عبر workerData.' },
      { step: '02', title: 'التراسل بين الخيوط عبر parentPort', desc: 'إرسال واستقبال الرسائل بـ parentPort.postMessage() والاستماع للأحداث بـ worker.on("message").' },
      { step: '03', title: 'مشاركة الذاكرة الصفرية بـ SharedArrayBuffer', desc: 'حجز كتلة ذاكرة خام في الـ RAM مشتركة بين الخيط الرئيسي وخيوط العمل لتعديل البيانات دون أي استهلاك للنقل.' },
      { step: '04', title: 'العمليات الذرية المتزامنة بـ Atomics API', desc: 'استخدام Atomics.add() و Atomics.load() و Atomics.wait() لضمان سلامة العمليات المتزامنة وتجنب سباق الذاكرة (Race Conditions).' },
      { step: '05', title: 'بناء مجمع الخيوط وإعادة الاستخدام (Worker Thread Pool)', desc: 'الحفاظ على عدد ثابت من خيوط العمل (مثل 4 أو 8 خيوط) وإعادة استخدامها لتجنب تكلفة إنشاء خيوط جديدة مع كل طلب.' }
    ],
    playgroundCode: `// محاكي مشاركة الذاكرة بين الخيوط باستخدام SharedArrayBuffer و Atomics
const sharedBuffer = new SharedArrayBuffer(16); // 16 bytes shared memory
const sharedInt32 = new Int32Array(sharedBuffer);

// الخيط الرئيسي يعين القيمة الابتدائية
Atomics.store(sharedInt32, 0, 100);
console.log("Main Thread: Initial counter set in shared RAM ->", Atomics.load(sharedInt32, 0));

// محاكاة خيط عمل فرعي يزيد العداد ذرياً في نفس مساحة الذاكرة
function mockWorkerThreadExecution() {
  const previousValue = Atomics.add(sharedInt32, 0, 50); // زيادة ذرية آمنة
  console.log("Worker Thread: Atomically incremented counter. Previous value was:", previousValue);
}

mockWorkerThreadExecution();
console.log("Main Thread reads updated shared memory ->", Atomics.load(sharedInt32, 0)); // 150`,
    experimentQuestion: 'لماذا تعتبر مشاركة الذاكرة العادية بين الخيوط بدون Atomics مصدراً للأخطاء الكارثية (Memory Corruption)؟',
    experimentAnswer: 'لو قام خيطان بقراءة العداد (count = 10) وتعديله في نفس اللحظة (count = count + 1)، قد يقوم الخيطان بكتابة القيمة 11 بدلاً من 12، مما يفقد إحدى العمليتين (Lost Update Bug)! استخدام Atomics.add يضمن أن عملية القراءة والتعديل والكتابة تتم في دورة معالج ذرية واحدة لا تقبل المقاطعة على مستوى الـ CPU Hardware.',
    codeAnatomy: [
      { line: 'import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";', note: 'استيراد وحدة خيوط العمل' },
      { line: 'if (isMainThread) {', note: 'كود الخيط الرئيسي' },
      { line: '  const worker = new Worker(new URL(import.meta.url), {', note: 'إنشاء خيط العمل' },
      { line: '    workerData: { matrixSize: 1000 }', note: 'تمرير البيانات الابتدائية للخيط' },
      { line: '  });', note: 'نهاية إنشاء الخيط' },
      { line: '  worker.on("message", (result) => console.log("Result:", result));', note: 'استقبال النتيجة المحسوبة' },
      { line: '} else {', note: 'كود خيط العمل الفرعي' },
      { line: '  const result = heavyCpuCalculation(workerData.matrixSize);', note: 'تنفيذ الحسابات الثقيلة في الخلفية' },
      { line: '  parentPort.postMessage(result); // إرسال النتيجة للأصل', note: 'إرسال الرد للخيط الرئيسي' },
      { line: '}', note: 'نهاية التحقق' }
    ],
    pitfallBad: `// خطأ كارثي: تنفيذ عمليات تشفير أو حسابات مصفوفات ثقيلة على الخيط الرئيسي
app.post("/resize-image", (req, res) => {
  const thumbnail = heavyImageResize(req.body.image); // يجمد الخادم لمدة ثانية كاملة عن باقي المستخدمين!
  res.send(thumbnail);
});`,
    pitfallGood: `// الحل الهندسي: تفويض المهمة لـ Worker Thread Pool
app.post("/resize-image", async (req, res) => {
  const thumbnail = await workerPool.exec("resizeImage", req.body.image); // تنفيذ متوازي بدون حظر الـ Event Loop
  res.send(thumbnail);
});`,
    pitfallDiagnosis: 'المهام الحسابية الثقيلة تحظر الـ Event Loop وتشل قدرة خادم Node.js على خدمة اتصالات المستخدمين، بينما Worker Threads توزع الحمل على أنوية المعالج المتعددة.',
    quizPool: [
      {
        q: 'When should you use Worker Threads instead of standard asynchronous Node.js APIs?',
        qAr: 'متى يجب استخدام Worker Threads بدلاً من واجهات Node.js اللاتزامنية العادية؟',
        options: [
          'For CPU-bound tasks (image processing, heavy cryptography, matrix math) that would otherwise block the Event Loop.',
          'For simple database queries.',
          'For reading small JSON files.',
          'To handle standard HTTP GET requests.'
        ],
        correct: 0,
        why: 'Async APIs handle I/O-bound concurrency; CPU-intensive calculations require Worker Threads to avoid blocking the main event loop.',
        whyAr: 'الـ APIs اللاتزامنية مخصصة لعمليات الإدخال والإخراج I/O، بينما العمليات الحسابية الثقيلة تتطلب Worker Threads لتفادي تجميد الخيط الرئيسي.'
      },
      {
        q: 'What is the primary advantage of SharedArrayBuffer over postMessage() between workers?',
        qAr: 'ما هي الميزة الأساسية لـ SharedArrayBuffer مقارنة بـ postMessage() بين الخيوط؟',
        options: [
          'Zero-copy in-memory shared access without serializing or cloning data between thread boundaries.',
          'Automatically prevents race conditions without Atomics.',
          'It works across different physical computers.',
          'It formats data as JSON.'
        ],
        correct: 0,
        why: 'SharedArrayBuffer allows multiple threads to read and write the exact same shared memory region without serialization overhead.',
        whyAr: 'يتيح لعدة خيوط القراءة والكتابة في نفس مساحة الذاكرة في الـ RAM دون الحاجة لنسخ أو تسلسل البيانات (Zero-Copy).'
      },
      {
        q: 'What is the role of the Atomics API in multi-threaded Node.js applications?',
        qAr: 'ما هو الدور الأساسي لواجهة Atomics في تطبيقات Node.js متعددة الخيوط؟',
        options: [
          'Provides thread-safe atomic operations and synchronization primitives on SharedArrayBuffer memory.',
          'Compresses worker thread output.',
          'Encrypts memory buffers.',
          'Monitors CPU temperature.'
        ],
        correct: 0,
        why: 'Atomics guarantees uninterrupted hardware-level memory operations, preventing race conditions and corrupted shared states.',
        whyAr: 'توفر عمليات ذرية آمنة على مستوى العتاد لمنع تضارب الخيوط وحالات سباق الذاكرة (Race Conditions).'
      },
      {
        q: 'Why is it recommended to use a Worker Pool rather than creating a new Worker on every single request?',
        qAr: 'لماذا يوصى باستخدام مجمع خيوط (Worker Pool) بدلاً من إنشاء Worker جديد مع كل طلب؟',
        options: [
          'Creating a Worker has significant overhead (spawning a new V8 isolate and memory space); pools reuse existing workers.',
          'Workers can only be created once per day.',
          'Operating systems only allow 1 worker.',
          'Worker pools reduce network bandwidth.'
        ],
        correct: 0,
        why: 'Spawning a worker allocates a new V8 instance (~30MB+ RAM and CPU startup cost); a pool maintains a reusable fleet of workers.',
        whyAr: 'إنشاء خيط عمل جديد يستهلك وقتاً وذاكرة لبناء بيئة V8 جديدة؛ بينما مجمع الخيوط يعيد استخدام خيوط جاهزة ومفتوحة مسبقاً.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ نمط MessagePort و Transferable Objects لنقل ملكية Buffer بحجم 500MB بين الخيوط بدون استهلاك بايت واحد إضافي من الـ RAM؟',
    interviewA: 'نستخدم خاصية Transferable Objects في postMessage: نستدعي parentPort.postMessage({ buffer }, [buffer.buffer]). تمرير الـ ArrayBuffer كمعامل ثانٍ في مصفوفة النقل يخبر محرك V8 بنقل ملكية مؤشر الذاكرة (Memory Pointer Transfer) فوراً إلى الخيط المستقبل وتفريغه من الخيط المرسل (Detached Buffer) في زمن 0ms وبدون نسخ أي بايت في الذاكرة، محققاً أقصى كفاءة أداء ممكنة في معالجة الملفات الضخمة.'
  },
  {
    slug: 'http-core',
    title: 'Core HTTP/HTTPS & WebSockets: Raw Sockets, Keep-Alive & TLS Configuration',
    titleAr: 'خوادم الـ HTTP/HTTPS الأصلية و WebSockets: المقابس المباشرة، اتصالات Keep-Alive وشهادات TLS',
    level: 2,
    order: 11,
    estMinutes: 35,
    version: 'Node.js 24 http & https',
    pattern: 'Low-Level Networking & Socket Architecture',
    objectives: [
      'فهم كيفية بناء خوادم ويب أصلية باستخدام node:http و node:https دون أي أطر عمل خارجية.',
      'تشريح تدفقات req (ReadableStream) و res (WritableStream) والتعامل المباشر مع رؤوس الطلبات Headers.',
      'إدارة اتصالات الـ Keep-Alive وإعادة استخدام مقابس TCP لتقليل زمن الـ Handshake.',
      'تكوين خوادم HTTPS المشفرة بشهادات TLS/SSL والترقية لبروتوكول WebSockets بـ Upgrade Event.'
    ],
    problemOpening: `
      أغلب مطوري الويب يبدأون مباشرة باستخدام Express.js أو NestJS، ولا يعرفون كيف يتحدث الخادم مع المتصفح تحت الغطاء!
      ماذا يحدث في الحقيقة عندما يرسل المتصفح طلب HTTP؟
      المتصفح يفتح مقبس اتصال TCP Socket مع الخادم، ويرسل بايتات نصية مشفرة تبدأ بـ <code dir="ltr">GET /api/users HTTP/1.1\\r\\nHost: api.codehub.dev\\r\\n\\r\\n</code>.
      وحدة **node:http** في Node.js هي المسؤولة عن اعتراض هذه البايتات، وتمريرها لمحلل الـ HTTP (llhttp Parser)، وتغليفها في كائنين سحريين:
      - <code dir="ltr">req</code>: وهو عبارة عن تدفق قراءة (Readable Stream) يستقبل جسم الطلب على أجزاء.
      - <code dir="ltr">res</code>: وهو تدفق كتابة (Writable Stream) يرسل كود الحالة والرؤوس وجسم الرد للعميل.
      فهم هذه الطبقة المنخفضة هو الفارق الحقيقي عندما تحتاج لبناء بروكسي عكسي (Reverse Proxy)، أو التحكم في رؤوس الأمان (Security Headers)، أو بناء ترقية اتصالات حية **WebSockets** من الصفر.
    `,
    mechanics: [
      { step: '01', title: 'إنشاء الخادم الأصلي بـ http.createServer()', desc: 'تسجيل دالة requestHandler تستقبل كائني (req, res) وتنفذ معالجة الطلبات بشكل لاتزامني فائق السرعة.' },
      { step: '02', title: 'قراءة جسم الطلب عبر تدفقات Streams (req chunks)', desc: 'تجميع بايتات البيانات القادمة بـ req.on("data") وتجميعها في Buffer عند اكتمال حدث req.on("end").' },
      { step: '03', title: 'إرسال الردود ورؤوس الـ HTTP Headers', desc: 'استخدام res.writeHead(200, { "Content-Type": "application/json" }) وكتابة المحتوى بـ res.end().' },
      { step: '04', title: 'إدارة اتصالات Keep-Alive المستمرة', desc: 'إعادة استخدام نفس اتصال الـ TCP لخدمة طلبات متعددة لنفس العميل لتفادي تكرار مصافحة الـ TCP Handshake.' },
      { step: '05', title: 'ترقية الاتصال لـ WebSockets بحدث Upgrade', desc: 'اعتراض حدث server.on("upgrade") والتحقق من صلاحية العميل ومصافحة الترقية لنقل المقبس لبروتوكول ثنائي الاتجاه.' }
    ],
    playgroundCode: `// محاكي خادم HTTP أصلي مع تجميع جسم الطلب بـ Streams
const mockHttpServer = {
  handleRequest(reqStream, res) {
    const chunks = [];
    reqStream.on("data", (chunk) => chunks.push(chunk));
    reqStream.on("end", () => {
      const body = Buffer.concat(chunks).toString("utf-8");
      console.log("Raw HTTP Request Body Received:", body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "Success", receivedBytes: body.length }));
    });
  }
};

console.log("HTTP/1.1 Keep-Alive Server initialized on port 8080.");`,
    experimentQuestion: 'ماذا يحدث إذا قمت باستدعاء res.write("data") بعد استدعاء res.end() في خادم Node.js؟',
    experimentAnswer: 'سيرمي المحرك خطأ فورياً من نوع Error [ERR_STREAM_WRITE_AFTER_END]: write after end. بمجرد استدعاء res.end()، يقوم Node.js بإنهاء تدفق الـ Writable Stream وإرسال حزمة الـ FIN في اتصال TCP وإغلاق القناة للعميل، ولا يُسمح بكتابة أي بيانات إضافية بعدها.',
    codeAnatomy: [
      { line: 'import http from "node:http";', note: 'استيراد وحدة HTTP الأصلية' },
      { line: 'const server = http.createServer(async (req, res) => {', note: 'دالة استقبال الطلبات' },
      { line: '  if (req.method === "POST" && req.url === "/api/echo") {', note: 'مطابقة المسار والطريقة' },
      { line: '    const buffers = [];', note: 'مصفوفة تجميع البايتات' },
      { line: '    for await (const chunk of req) {', note: 'قراءة الـ Stream بـ Async Iterator حديث' },
      { line: '      buffers.push(chunk);', note: 'حفظ القطعة في الذاكرة' },
      { line: '    }', note: 'نهاية التدفق' },
      { line: '    const data = Buffer.concat(buffers).toString();', note: 'تحويل البايتات لنص' },
      { line: '    res.writeHead(200, { "Content-Type": "application/json" });', note: 'إرسال الرؤوس' },
      { line: '    res.end(JSON.stringify({ received: data }));', note: 'إرسال الرد وإغلاق التدفق' },
      { line: '  }', note: 'نهاية الشرط' },
      { line: '});', note: 'نهاية الخادم' },
      { line: 'server.listen(3000, () => console.log("Server listening on :3000"));', note: 'بدء الاستماع' }
    ],
    pitfallBad: `// خطأ شائع: نسيان استدعاء res.end() في أحد مسارات الكود
app.get("/status", (req, res) => {
  if (isMaintenance) {
    res.write("Maintenance Mode"); // نسيان res.end() يعلق متصفح العميل في انتظار لانهائي حتى الـ Timeout!
  }
});`,
    pitfallGood: `// الحل الصحيح: ضمان إنهاء الرد دائماً
app.get("/status", (req, res) => {
  if (isMaintenance) {
    return res.end("Maintenance Mode"); // إنهاء صريح للاتصال
  }
  res.end("Operational");
});`,
    pitfallDiagnosis: 'عدم إغلاق تدفق الاستجابة بـ res.end() يترك مقبس اتصال TCP مفتوحاً ومعلقاً لدى العميل حتى تنتهي مهلة الاتصال بعد 60-120 ثانية، مما يستهلك موارد الخادم.',
    quizPool: [
      {
        q: 'What type of Node.js stream is the "req" argument in http.createServer((req, res) => {})?',
        qAr: 'ما هو نوع تدفق Node.js لكائن "req" في دالة http.createServer؟',
        options: [
          'Readable Stream (delivering incoming request headers and body in data chunks).',
          'Writable Stream.',
          'Duplex Stream with no events.',
          'Static Array Buffer.'
        ],
        correct: 0,
        why: 'The req object implements ReadableStream, emitting "data" and "end" events as the client transmits the HTTP payload.',
        whyAr: 'كائن req يمثل Readable Stream يطلق أحداث data و end أثناء استقبال بيانات جسم الطلب من العميل.'
      },
      {
        q: 'What is the purpose of HTTP Keep-Alive connections in modern web infrastructure?',
        qAr: 'ما هي الفائدة الأساسية لاتصالات HTTP Keep-Alive في البنية التحتية للويب؟',
        options: [
          'Reuses a single persistent TCP connection for multiple HTTP requests, eliminating repeated TCP/TLS handshake latency.',
          'Keeps the server running without electricity.',
          'Automatically clears cache every 5 minutes.',
          'Compresses HTML files.'
        ],
        correct: 0,
        why: 'Keep-Alive avoids the high latency penalty of creating and tearing down TCP/TLS connections for every single asset request.',
        whyAr: 'يحافظ على اتصال TCP مفتوحاً لخدمة عدة طلبات متتالية مما يوفر زمن وتكلفة تكرار المصافحة TCP/TLS Handshake.'
      },
      {
        q: 'Which event on an http.Server instance is emitted when a client requests upgrading to WebSockets?',
        qAr: 'أي حدث على خادم http.Server يتم إطلاقه عندما يطلب العميل الترقية لبروتوكول WebSockets؟',
        options: ['"upgrade"', '"connection"', '"websocket"', '"handshake"'],
        correct: 0,
        why: 'The "upgrade" event is emitted whenever a client sends an HTTP Upgrade request header (e.g. Upgrade: websocket).',
        whyAr: 'يتم إطلاق حدث "upgrade" فور إرسال العميل لرأس الترقية في طلب الـ HTTP للتحويل إلى بروتوكول WebSockets.'
      },
      {
        q: 'How can you read the incoming HTTP request body cleanly using modern ES2022+ syntax in Node.js?',
        qAr: 'كيف يمكنك قراءة جسم طلب الـ HTTP بنظافة باستخدام صيغة جافاسكريبت الحديثة في Node.js؟',
        options: [
          'Using for await (const chunk of req) loop.',
          'Calling req.readAll() synchronously.',
          'Accessing req.body property directly on native http.',
          'Using JSON.parse(req).'
        ],
        correct: 0,
        why: 'Readable streams implement the Async Iterable protocol, allowing clean consumption via "for await (const chunk of req)".',
        whyAr: 'تدفقات القراءة تدعم بروتوكول التكرار اللاتزامني مما يتيح استهلاكها مباشرة عبر حلقة for await.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف يعمل بروتوكول HTTP/2 و HTTP/3 في خوادم Node.js وما هي ميزة الـ Multiplexing التي قضت على مشكلة Head-of-Line Blocking؟',
    interviewA: 'في HTTP/1.1، كل اتصال TCP يستطيع إرسال طلب واحد فقط في نفس الوقت (Serial). إذا تأخر طلب، تتعطل باقي الطلبات خلفه (Head-of-Line Blocking). في HTTP/2 (عبر وحدة node:http2)، يتم تقسيم الاتصال الواحد إلى Streams متوازية ثنائية (Binary Frames)، مما يتيح إرسال واستقبال مئات الطلبات والردود المتزامنة على اتصال TCP واحد دون أي انتظار (Multiplexing). وفي HTTP/3، تم استبدال TCP ببروتوكول QUIC القائم على UDP للقضاء على Head-of-Line Blocking على مستوى طبقة النقل (Transport Layer) أيضاً عند فقدان حزم البيانات في الشبكات اللاسلكية.'
  },
  {
    slug: 'npm-package-manager',
    title: 'NPM, Package Management & Monorepos: Semantic Versioning, Package-Lock & Workspaces',
    titleAr: 'إدارة الحزم بـ NPM والـ Monorepos: نظام Semantic Versioning، ملف package-lock والـ Workspaces',
    level: 2,
    order: 12,
    estMinutes: 30,
    version: 'NPM 10.x & Node.js 24',
    pattern: 'Dependency Management & Monorepo Architecture',
    objectives: [
      'فهم قواعد نظام الترقيم الدلالي (Semantic Versioning: SemVer - Major.Minor.Patch) وفك رموز ^ و ~.',
      'تشريح الدور الأمني الحاسم لملف package-lock.json والفرق بين npm install و npm ci في خطوط الـ CI/CD.',
      'إدارة المشاريع المتعددة الحزم (Monorepos) باستخدام NPM Workspaces ومشاركة الحزم المحلية.',
      'تأمين الاعتماديات ضد هجمات سلاسل الإمداد (Supply Chain Attacks) وفحص الثغرات بـ npm audit.'
    ],
    problemOpening: `
      في أي مشروع برمجيات، أول أمر يكتبه أي مطور هو <code dir="ltr">npm install</code>.
      لكن القليل فقط يفهم ما الذي يحدث وراء الكواليس داخل مجلد <code dir="ltr">node_modules</code> وملف <code dir="ltr">package-lock.json</code>!
      تخيل أن مشروعك يعمل بنجاح تام على جهازك، وعندما قمت برفعه لخادم الإنتاج، انهار الخادم بالكامل في الـ Build! ما السبب؟
      السبب أن حزمة فرعية في أعماق شجرة الاعتماديات كانت محددة بـ <code dir="ltr">^1.2.0</code>، وقام مطور الحزمة بإطلاق تحديث فرعي كسر التوافقية (Breaking Change)، فقام <code dir="ltr">npm install</code> بتحميل النسخة الجديدة المعطوبة على الخادم!
      ملف **package-lock.json** صُمم ليكون "بصمة جينية مشفرة" تثبت أرقام النسخ الدقيقة وشجرة الاعتماديات ومفاتيح التجزئة (Integrity Hashes) بنسبة 100% بين كل أجهزة الفريق وخوادم الإنتاج.
      في هذا الدرس، هنتعلم أسرار الـ SemVer، إزاي نستخدم أمر <code dir="ltr">npm ci</code> لتسريع الـ CI/CD، وإزاي نبني **NPM Workspaces** لمشاركة الأكواد بين الـ Frontend والـ Backend في Monorepo واحد.
    `,
    mechanics: [
      { step: '01', title: 'قواعد الترقيم الدلالي (SemVer: MAJOR.MINOR.PATCH)', desc: 'MAJOR للتغييرات الكاسرة للتوافقية، MINOR للميزات الجديدة المتوافقة، و PATCH للإصلاحات الأمنية وسد الثغرات.' },
      { step: '02', title: 'فك شفرات رموز الترقية (^ مقابل ~)', desc: 'علامة ^ تسمح بتحديثات Minor و Patch (^1.2.3 تقبل حتى 1.9.9)، بينما ~ تسمح بتحديثات Patch فقط (~1.2.3 تقبل حتى 1.2.9).' },
      { step: '03', title: 'الاستقرار الحتمي بـ npm ci (Clean Install)', desc: 'استخدام npm ci في خوادم الـ CI/CD لقراءة package-lock.json الصارم وحذف node_modules السابقة لتثبيت نقي وفائق السرعة.' },
      { step: '04', title: 'إدارة الـ Monorepos عبر NPM Workspaces', desc: 'تكوين "workspaces": ["packages/*"] لربط حزم الواجهة والباك إند والمكتبات المشتركة بأوامر تثبيت واحدة وبدون تكرار.' },
      { step: '05', title: 'التدقيق الأمني وسلاسل الإمداد (Security Auditing)', desc: 'تشغيل npm audit و npm audit fix للكشف عن الثغرات المعروفة في قواعد بيانات CVE ومنع الحزم الضارة.' }
    ],
    playgroundCode: `// محاكي قواعد SemVer وحساب الإصدار المقبول
function checkSemVerMatch(declaredVersion, targetVersion) {
  if (declaredVersion.startsWith("^")) {
    const base = declaredVersion.slice(1).split(".")[0];
    const target = targetVersion.split(".")[0];
    const isCompatible = base === target;
    console.log(\`Caret (^): Declared [\${declaredVersion}] -> Testing [\${targetVersion}] Compatible: \${isCompatible}\`);
    return isCompatible;
  }
}

checkSemVerMatch("^1.2.3", "1.9.4"); // true (Minor update allowed)
checkSemVerMatch("^1.2.3", "2.0.0"); // false (Major breaking update blocked!)`,
    experimentQuestion: 'لماذا يجب عليك دائماً رفع ملف package-lock.json إلى مستودع Git وتجنب إضافته لـ .gitignore نهائياً؟',
    experimentAnswer: 'ملف package-lock.json هو الضمان الوحيد لتثبيت نفس شجرة الاعتماديات الدقيقة بجميع حزمها الفرعية ومفاتيح التجزئة (Integrity Hashes) المتطابقة عبر كل أجهزة المطورين وخوادم الـ CI/CD والإنتاج. تجاهله في gitignore يؤدي إلى تثبيت نسخ مختلفة لكل مطور وحدوث أخطاء "It works on my machine" الشهيرة.',
    codeAnatomy: [
      { line: '// package.json (Root Monorepo)', note: 'ملف التكوين الجذري للـ Monorepo' },
      { line: '{', note: 'بداية الإعدادات' },
      { line: '  "name": "codehub-monorepo",', note: 'اسم المشروع العام' },
      { line: '  "private": true,', note: 'منع نشر الحاوية كحزمة عامة' },
      { line: '  "workspaces": [', note: 'تفعيل NPM Workspaces' },
      { line: '    "apps/web",', note: 'تطبيق ريآكت' },
      { line: '    "apps/api",', note: 'خادم Node/Express' },
      { line: '    "packages/shared-types"', note: 'مكتبة الأنواع المشتركة' },
      { line: '  ]', note: 'نهاية مسارات الـ Workspaces' },
      { line: '}', note: 'نهاية الملف' }
    ],
    pitfallBad: `// خطأ شائع في خوادم الـ CI/CD والإنتاج: تشغيل npm install
// RUN npm install
// قد يقوم بتحميل إصدارات أحدث غير متوافقة تكسر الـ Build!`,
    pitfallGood: `// الحل الهندسي الصارم: استخدام npm ci
// RUN npm ci --omit=dev
// تثبيت حتمي ومطابق لـ package-lock.json بنسبة 100% وبسرعة مضاعفة`,
    pitfallDiagnosis: 'أمر npm install قد يعدل ملف package-lock.json ويثبت نسخاً مختلفة، بينما npm ci يرفض التعديل ويلتزم بالبصمة المثبتة الصارمة.',
    quizPool: [
      {
        q: 'What is the primary difference between "npm install" and "npm ci"?',
        qAr: 'ما هو الفرق الأساسي بين أمر "npm install" وأمر "npm ci"؟',
        options: [
          '"npm ci" installs directly from package-lock.json, deletes existing node_modules, and never modifies lockfiles; ideal for CI/CD.',
          '"npm ci" is only for local development.',
          '"npm install" is faster than "npm ci".',
          '"npm ci" only installs devDependencies.'
        ],
        correct: 0,
        why: 'npm ci provides fast, deterministic, clean builds for continuous integration by strictly enforcing the exact lockfile tree.',
        whyAr: 'أمر npm ci ينفذ تثبيتاً حتمياً ونظيفاً وسريعاً لبيئات الـ CI بالاعتماد الصارم على package-lock.json بدون أي تعديل.'
      },
      {
        q: 'Under Semantic Versioning (SemVer), which version part must be incremented when introducing a Breaking API Change?',
        qAr: 'وفق معايير SemVer، أي جزء من رقم الإصدار يجب زيادته عند إطلاق تغيير يكسر التوافقية (Breaking Change)؟',
        options: ['MAJOR version (X.y.z)', 'MINOR version (x.Y.z)', 'PATCH version (x.y.Z)', 'BUILD metadata'],
        correct: 0,
        why: 'Major version bumps indicate breaking changes that require downstream consumers to update their code.',
        whyAr: 'الرقم الرئيسي MAJOR هو المخصص للإشارة للتغييرات الكاسرة للتوافقية التي تتطلب تعديل كود المستهلكين.'
      },
      {
        q: 'What does the caret prefix (^) in "^2.4.1" allow during dependency resolution?',
        qAr: 'ما الذي تسمح به علامة (^) في رقم النسخة "^2.4.1" أثناء تحديث الحزم؟',
        options: [
          'Allows minor and patch updates (e.g. >= 2.4.1 and < 3.0.0), but blocks major breaking updates.',
          'Allows patch updates only.',
          'Allows any version including major updates.',
          'Freezes the exact version.'
        ],
        correct: 0,
        why: 'The caret (^) allows updates that do not modify the left-most non-zero digit, accommodating minor and patch releases safely.',
        whyAr: 'العلامة ^ تسمح بتحديثات الـ Minor والـ Patch المتوافقة مع منع التحديثات الرئيسية Major ذات التغييرات الكاسرة.'
      },
      {
        q: 'What is the primary purpose of NPM Workspaces?',
        qAr: 'ما هي الفائدة الأساسية لخاصية NPM Workspaces؟',
        options: [
          'Managing multiple interconnected packages within a single top-level Monorepo repository with shared dependency symlinks.',
          'Running Node.js in the cloud.',
          'Compiling TypeScript to JavaScript.',
          'Managing database migrations.'
        ],
        correct: 0,
        why: 'Workspaces enable managing multi-package monorepos with single npm install and local package cross-linking.',
        whyAr: 'تمكن من إدارة مشاريع الـ Monorepo التي تحتوي على حزم متعددة ومترابطة مع مشاركة التبعيات وتسهيل الربط المحلي.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي منظومة الـ Backend من هجمات الـ Dependency Confusion والـ Typosquatting في حزم الـ NPM؟',
    interviewA: '1. استخدام Scoped Packages بأسماء مؤسسية محددة مثل @mycompany/auth. 2. تكوين ملف .npmrc لحصر وتوجيه الحزم الداخلية للمستودع الخاص (Private Registry مثل Nexus أو Verdaccio) ومنع البحث عنها في الـ Public NPM Registry (تجنب Dependency Confusion). 3. تفعيل npm audit و Snyk في خط الـ CI لحظر أي حزمة تحمل ثغرات معروفة، وتثبيت النسخ الصارمة بـ package-lock.json مع فحص مفاتيح الـ SHA Integrity.'
  },
  {
    slug: 'debugging-profiling',
    title: 'Node.js Production Debugging: Chrome DevTools Inspector, Memory Leaks & CPU Profiling',
    titleAr: 'تشخيص وتصحيح خوادم Node.js: الربط مع Chrome DevTools، كشف تسريبات الذاكرة والـ CPU Profiling',
    level: 3,
    order: 13,
    estMinutes: 35,
    version: 'Node.js 24 Inspector V8',
    pattern: 'Performance Diagnostics & Heap Profiling',
    objectives: [
      'ربط خادم Node.js المباشر بـ Chrome DevTools عبر خيار --inspect لتصحيح الكود بالـ Breakpoints.',
      'أخذ لقطات الذاكرة (Heap Snapshots) والمقارنة بينها لكشف تسريبات الذاكرة (Memory Leaks).',
      'تسجيل ملفات أداء المعالج (CPU Profiles) ومخططات اللهب (Flamegraphs) لتحديد الدوال البطيئة.',
      'تشخيص تعليق الـ Event Loop باستخدام وحدة node:perf_hooks ومقاييس ELD (Event Loop Delay).'
    ],
    problemOpening: `
      في بيئة التطوير، عندما يحدث خطأ، يضع المطور <code dir="ltr">console.log()</code> في كل مكان.
      لكن في بيئة الإنتاج عندما يبدأ الخادم باستهلاك 100% من الـ CPU فجأة، أو عندما يرتفع استهلاك الـ RAM من 200MB إلى 4GB حتى ينهار الخادم بـ Out of Memory (OOM Crash) كل 3 ساعات... الـ <code dir="ltr">console.log</code> لن يفيدك بشيء!
      أنت بحاجة لأدوات جراحية دقيقة لفحص ما بداخل محرك V8 أثناء عمل الخادم الحقيقي.
      يوفر Node.js بروتوكول فحص متقدم **V8 Inspector Protocol**:
      - يمكنك تشغيل الخادم بـ <code dir="ltr">node --inspect</code> والاتصال به من متصفح كروم وتفعيل الـ Breakpoints الحية.
      - يمكنك تسجيل **CPU Profile** وتوليد **Flame Graph** يوضح بالمللي ثانية أين يقضي المعالج وقته.
      - يمكنك أخذ **Heap Snapshots** ومقارنتها عبر الزمن لمعرفة أي كائنات ومصفوفات يتم حبسها في الذاكرة وتتسبب في تسريب الـ RAM.
      في هذا الدرس الختامي لمسار Node.js 24، هنتعلم إزاي ننقذ الخوادم المنهارة في بيئات الإنتاج ونشخص أسباب بطء المعالج واختناق الذاكرة.
    `,
    mechanics: [
      { step: '01', title: 'تفعيل بروتوكول الفحص المباشر (node --inspect)', desc: 'تشغيل الخادم مع فتح منفذ WebSocket مخصص (افتراضياً 9229) للاتصال بـ Chrome DevTools عبر chrome://inspect.' },
      { step: '02', title: 'أخذ لقطات الذاكرة (Heap Snapshot Analysis)', desc: 'تسجيل لقطتين للذاكرة والمقارنة بينهما (Comparison View) لتحديد الكائنات التي زاد عددها ولم تُحذف بـ Garbage Collector.' },
      { step: '03', title: 'مخططات اللهب وتحليل المعالج (CPU Flamegraphs)', desc: 'تسجيل CPU Profile لتوليد مخطط بصري يوضح تسلسل استدعاءات الدوال، حيث تمثل الدوال العريضة عنق الزجاجة (Bottlenecks).' },
      { step: '04', title: 'قياس تأخير الـ Event Loop بـ perf_hooks', desc: 'استخدام monitorEventLoopDelay() لقياس زمن تأخر الخيط الرئيسي بالنانوثانية عند معالجة المهام الثقيلة.' },
      { step: '05', title: 'التشخيص بدون إيقاف الخادم (Production Diagnostic Reports)', desc: 'توليد تقارير JSON تشخيصية فورية بـ process.report.writeReport() تحتوي على تفاصيل الـ Heap والـ OS Threads.' }
    ],
    playgroundCode: `// محاكي قياس تأخير الـ Event Loop باستخدام perf_hooks
import { monitorEventLoopDelay } from "node:perf_hooks";

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

// محاكاة تشغيل مهمة حسابية تؤخر الخيط الرئيسي
const start = Date.now();
while (Date.now() - start < 100) { /* Busy wait 100ms */ }

console.log("Event Loop Latency Metrics:");
console.log("Min Delay (ms):", (histogram.min / 1e6).toFixed(2));
console.log("Max Delay (ms):", (histogram.max / 1e6).toFixed(2));
console.log("Mean Delay (ms):", (histogram.mean / 1e6).toFixed(2));
histogram.disable();`,
    experimentQuestion: 'ما هو الفرق بين Retained Size و Shallow Size عند تحليل كائنات لقطة الذاكرة (Heap Snapshot) في Chrome DevTools؟',
    experimentAnswer: 'الـ Shallow Size هو حجم الذاكرة التي يحجزها الكائن نفسه فقط في الـ Heap (مثل بنية الكائن ومؤشراته). أما الـ Retained Size فهو الحجم الإجمالي للذاكرة التي ستتحرر تلقائياً إذا تم حذف هذا الكائن مع جميع الكائنات الفرعية التابعة له والتي لا يمكن الوصول إليها إلا من خلاله (Dominator Tree). عند البحث عن تسريبات الذاكرة، يتم الفرز دائماً حسب Retained Size.',
    codeAnatomy: [
      { line: 'import { monitorEventLoopDelay } from "node:perf_hooks";', note: 'استيراد وحدة مقاييس الأداء' },
      { line: 'export const eldHistogram = monitorEventLoopDelay({ resolution: 10 });', note: 'إنشاء مدرج تكراري دقيق للـ Event Loop' },
      { line: 'eldHistogram.enable();', note: 'بدء التسجيل الفعلي' },
      { line: 'export function getEventLoopHealth() {', note: 'دالة فحص صحة الخادم' },
      { line: '  const p99LatencyMs = eldHistogram.percentile(99) / 1e6;', note: 'حساب زمن التأخير للنسبة 99%' },
      { line: '  return {', note: 'إرجاع التقرير' },
      { line: '    healthy: p99LatencyMs < 50, // صحي إذا كان التأخير أقل من 50ms', note: 'معيار الصحة' },
      { line: '    p99DelayMs: p99LatencyMs.toFixed(2)', note: 'قيمة التأخير' },
      { line: '  };', note: 'نهاية التقرير' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع في الإنتاج: تشغيل الخادم بـ node --inspect=0.0.0.0:9229
// فتح منفذ الفحص على كل العناوين العامة يتيح لأي شخص على الإنترنت الاتصال بالخادم والتحكم فيه بالكامل!`,
    pitfallGood: `// الحل الأمني المعتمد: الربط بـ 127.0.0.1 واستخدام SSH Tunneling
// node --inspect=127.0.0.1:9229 server.js
// ثم الاتصال عبر SSH Tunnel: ssh -L 9229:localhost:9229 user@server`,
    pitfallDiagnosis: 'بروتوكول V8 Inspector لا يوفر مصادقة أمنية؛ فتح المنفذ للعامة يعادل منح صلاحيات Root كاملة لأي مهاجم على الإنترنت.',
    quizPool: [
      {
        q: 'Which Chrome DevTools view is most effective for diagnosing JavaScript memory leaks in a Heap Snapshot?',
        qAr: 'أي واجهة في Chrome DevTools هي الأكثر فعالية لتشخيص تسريبات الذاكرة في لقطة الـ Heap Snapshot؟',
        options: [
          'Comparison View between two snapshots taken before and after the suspected leaking operation, sorted by Retained Size.',
          'Console Log View.',
          'Network Waterfall View.',
          'Elements Tree View.'
        ],
        correct: 0,
        why: 'Comparison view highlights newly allocated objects that failed to be collected, sorted by Retained Size to pinpoint root dominators.',
        whyAr: 'واجهة المقارنة تبرز الكائنات التي تمت إضافتها ولم يتم تحريرها بين اللقطتين، وفرزها بـ Retained Size يكشف الكائن الجذري المتسبب في التسريب.'
      },
      {
        q: 'What does a wide horizontal block in a CPU Flamegraph represent?',
        qAr: 'ماذا يمثل المستطيل الأفقي العريض في مخطط اللهب (CPU Flamegraph)؟',
        options: [
          'A function that spent a large amount of time on the CPU (potential performance bottleneck).',
          'A file with large disk size.',
          'A network error.',
          'A database table with many rows.'
        ],
        correct: 0,
        why: 'In flame graphs, width is proportional to total time spent on CPU; wider frames indicate heavy resource consumption.',
        whyAr: 'عرض المستطيل في مخطط اللهب يتناسب طردياً مع إجمالي الوقت الذي استهلكته الدالة على المعالج مما يدل على وجود عنق زجاجة.'
      },
      {
        q: 'What metric does node:perf_hooks monitorEventLoopDelay() measure?',
        qAr: 'ما هو المقياس الذي ترصده دالة monitorEventLoopDelay() في وحدة perf_hooks؟',
        options: [
          'The delay and latency between event loop iterations, indicating main-thread responsiveness and blocking tasks.',
          'Internet download speed.',
          'Hard drive read speed.',
          'Database query execution time.'
        ],
        correct: 0,
        why: 'Event loop delay measures the lag in processing timers and tasks, reflecting whether the main thread is blocked by heavy synchronous work.',
        whyAr: 'ترصد مقدار التأخير في دوران الـ Event Loop بالنانوثانية مما يكشف ما إذا كان الخيط الرئيسي معطلاً بمهام متزامنة ثقيلة.'
      },
      {
        q: 'Why should Node.js --inspect port NEVER be exposed to public network interfaces (0.0.0.0) in production?',
        qAr: 'لماذا يجب عدم فتح منفذ --inspect على العناوين العامة 0.0.0.0 في خوادم الإنتاج نهائياً؟',
        options: [
          'The V8 inspector protocol lacks authentication and allows arbitrary code execution, granting attackers full remote control.',
          'It slows down internet connections.',
          'It prevents database connections.',
          'It deletes the node_modules folder.'
        ],
        correct: 0,
        why: 'V8 inspector is an unauthenticated control protocol; exposing it allows remote attackers to execute arbitrary commands as the node process.',
        whyAr: 'بروتوكول الفحص V8 غير محمي بكلمة سر ويتيح تنفيذ أي كود جافاسكريبت عشوائي، وفتحه للعامة يمنح المخترق سيطرة كاملة على الخادم.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تشخص مشكلة Memory Leak حية في خادم إنتاج داخل Kubernetes Cluster دون التسبب في إيقاف الخدمة أو إعادة تشغيل الـ Pod؟',
    interviewA: '1. نستخدم أمر kubectl port-forward pod-name 9229:9229 لإنشاء نفق آمن لمنفذ الفحص المفتوح على localhost داخل الـ Pod. 2. نفتح Chrome DevTools عبر chrome://inspect للاتصال بالخادم. 3. نأخذ Heap Snapshot أولي. 4. نرسل دفعة طلبات اختبارية ثم نأخذ Snapshot ثانٍ. 5. ننتقل إلى Comparison View ونفرز بـ # Delta و Retained Size للبحث عن كائنات (مثل Closures أو Timers أو Arrays) التي زاد عددها ولم تُحرر، مما يكشف السطر المسبب للتسريب بدقة بيكسلية بدون التأثير على مستخدمي الموقع.'
  }
];
