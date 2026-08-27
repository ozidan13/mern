/* ============================================================
   mongodb-lessons.mjs — 9 New Lessons for MongoDB 7+ Track
   ============================================================ */

export const mongodbLessons = [
  {
    slug: 'crud-operations',
    title: 'MongoDB CRUD Operations: BSON Data Types, Query Selectors & Atomic Updates',
    titleAr: 'عمليات الـ CRUD في مونجو دي بي: أنواع BSON والمشغلات الذرية للبيانات',
    level: 1,
    order: 2,
    estMinutes: 24,
    version: 'MongoDB 7.0+',
    pattern: 'Database Operations',
    problemOpening: `مونجو دي بي مش مجرد قاعدة بتخزن نصوص JSON عادية؛ هي بتستخدم صيغة <code dir="ltr">BSON</code> (Binary JSON) الغنية التي تدعم أنواع بيانات دقيقة زي ObjectId و Date و Decimal128 و 64-bit Integers. أكبر خطأ يقع فيه المطور هو استبدال المستند بالكامل عند التعديل بدلاً من استخدام المشغلات الذرية الموضعية (Atomic Update Operators زي <code dir="ltr">$set</code>, <code dir="ltr">$inc</code>, <code dir="ltr">$push</code>) التي تعدل الحقول المطلوبة في الذاكرة دون قفل المستند بالكامل.`,
    objectives: [
      'فهم مميزات صيغة BSON الثنائية وتمثيل البيانات في محرك WiredTiger.',
      'إتقان مشغلات الاستعلام: المقارنة ($gt, $in)، والمنطق ($and, $or)، والمصفوفات ($all, $elemMatch).',
      'تطبيق التعديلات الذرية الموضعية باستخدام $set و $inc و $push و $pull.'
    ],
    mechanics: [
      { step: 1, title: 'الاستعلام الدقيق (Query Selectors)', desc: 'استخدام $elemMatch لمطابقة كائنات داخل المصفوفات دون سحب المستندات الخاطئة.' },
      { step: 2, title: 'التعديلات الذرية (Atomic Operators)', desc: 'استخدام $inc لزيادة الأرصدة و $push لإضافة عناصر للمصفوفات بأمان تام.' },
      { step: 3, title: 'التحديث مع الإدخال (Upsert: true)', desc: 'تحديث المستند إذا كان موجوداً أو إنشاؤه تلقائياً إذا لم يكن موجوداً في خطوة ذرية واحدة.' }
    ],
    playgroundCode: `// MongoDB Query Filter Simulation
const database = [
  { id: 1, name: "Amr", tags: ["react", "node"], score: 95 },
  { id: 2, name: "Sara", tags: ["python", "django"], score: 80 },
  { id: 3, name: "Karim", tags: ["react", "mongodb"], score: 88 }
];

// Simulating db.users.find({ tags: { $in: ["react"] }, score: { $gte: 90 } })
const match = database.filter(u => u.tags.includes("react") && u.score >= 90);
console.log("Matched MongoDB Documents:", JSON.stringify(match, null, 2));`,
    experimentQuestion: 'ماذا يحدث إذا نفذت db.users.updateOne({ _id: 1 }, { score: 100 }) بدون استخدام مشغل $set في MongoDB النقي؟',
    experimentAnswer: 'سيقوم MongoDB باستبدال المستند بالكامل (Replace) وحذف جميع الحقول الأخرى (مثل name و tags) وترك حقل score فقط؛ لذلك مشغل $set إلزامي للتعديل الجزئي.',
    codeAnatomy: [
      { line: '1: await db.collection("orders").updateOne(', note: 'تحديث مستند واحد' },
      { line: '2:   { _id: new ObjectId(orderId), status: "pending" },', note: 'شرط الاستعلام' },
      { line: '3:   { $set: { status: "paid" }, $inc: { paymentAttempts: 1 } }', note: 'مشغلات ذرية آمنة' },
      { line: '4: );', note: 'نهاية التحديث' }
    ],
    pitfallBad: 'db.users.update({ _id: 1 }, { name: "Amr" }); /* يحذف باقي الحقول ويستبدل المستند! */',
    pitfallGood: 'db.users.updateOne({ _id: 1 }, { $set: { name: "Amr" } }); /* يعدل حقل name فقط */',
    pitfallDiagnosis: 'عدم استخدام $set في MongoDB Shell يستبدل المستند بالكامل ويحذف بقية البيانات.',
    quizPool: [{
      q: 'Which MongoDB update operator atomically adds an element to an array only if the element does not already exist?',
      qAr: 'أي مشغل تحديث في MongoDB يضيف عنصراً إلى المصفوفة ذرياً فقط إذا لم يكن موجوداً مسبقاً لمنع التكرار؟',
      options: ['$push', '$addToSet', '$append', '$concat'],
      correct: 1,
      why: '`$addToSet` adds elements to an array only if they do not already exist in the set.',
      whyAr: 'المشغل $addToSet يضمن إضافة العناصر الفريدة فقط للمصفوفة ويمنع التكرار تماماً كـ Set.'
    }],
    interviewQ: 'ما هو التركيب الداخلي لـ ObjectId في MongoDB وكيف يضمن الفرادة عبر السيرفرات الموزعة؟',
    interviewA: 'الـ ObjectId حجمه 12-byte يتكون من: 1. أول 4 بايت تمثل طابع الوقت الزمني (Timestamp). 2. الـ 5 بايت التالية تمثل معرف فريد للجهاز والعملية (Process/Machine Identifier). 3. آخر 3 بايت تمثل عداداً تصاعدياً عشوائياً (Incrementing Counter). هذا التركيب يضمن فرادة المعرف عبر آلاف السيرفرات الموزعة دون الحاجة لتنسيق مركزي.'
  },
  {
    slug: 'schema-design',
    title: 'MongoDB Schema Design: Embedding vs Referencing & 16MB Threshold',
    titleAr: 'تصميم مخططات MongoDB: التضمين مقابل المراجع وحد الـ 16MB الحرج',
    level: 2,
    order: 3,
    estMinutes: 26,
    version: 'MongoDB 7.0+',
    pattern: 'Data Modeling',
    problemOpening: `أكبر خطأ يقع فيه مطورو قواعد البيانات العلائقية (SQL) عند الانتقال لـ MongoDB هو إنشاء Collection لكل جدول وعمل References في كل مكان! قاعدة الذهب في MongoDB هي: "البيانات التي تُقرأ معاً تُخزن معاً" (Data that is accessed together should be stored together). لكن التضمين المفرط (Over-Embedding) لمصفوفات تنمو بلا حدود (مثل التعليقات أو سجلات النشاط) يصطدم بالحد الأقصى الصارم لحجم المستند وهو 16MB!`,
    objectives: [
      'تطبيق قواعد الاختيار بين التضمين (Embedding 1:Few) والمراجع (Referencing 1:Many).',
      'تجنب كارثة مصفوفات النمو اللانهائي (Unbounded Arrays) وحماية حد الـ 16MB.',
      'تطبيق أنماط التصميم المتقدمة: Subset Pattern و Bucket Pattern.'
    ],
    mechanics: [
      { step: 1, title: 'نمط التضمين (Embedding)', desc: 'تضمين العناوين وتفاصيل الدفع داخل مستند المستخدم لجلبها في استعلام واحد فائق السرعة O(1).' },
      { step: 2, title: 'نمط المراجع (Referencing)', desc: 'فصل المستندات التي تنمو بالآلاف (مثل سجلات الطلبات) في مجموعات مستقلة وربطها بالـ ObjectId.' },
      { step: 3, title: 'نمط المجموعة الجزئية (Subset Pattern)', desc: 'تضمين آخر 10 مراجعات فقط في مستند المنتج لسرعة العرض، وحفظ باقي المراجعات في Collection منفصل.' }
    ],
    playgroundCode: `// Document Size & Growth Pattern Analysis Simulation
const product = {
  id: "prod-901",
  title: "Mechanical Keyboard",
  price: 150,
  // ✅ Subset Pattern: Embed top 3 reviews only
  recentReviews: [
    { user: "Amr", rating: 5, comment: "Amazing switches!" },
    { user: "Sara", rating: 4, comment: "Great build quality." }
  ],
  totalReviewsCount: 1420 // Keep total count for pagination
};
console.log("Optimized Document (Subset Pattern Applied):");
console.log(JSON.stringify(product, null, 2));`,
    experimentQuestion: 'ماذا يحدث إذا تجاوز حجم مستند BSON واحد في MongoDB حد الـ 16 Megabytes؟',
    experimentAnswer: 'سيرفض محرك WiredTiger حفظ أو تعديل المستند وسيلقي خطأ فورياً من نوع BSONObj size is invalid (Document exceeds maximum allowed BSON size of 16777216 bytes).',
    codeAnatomy: [
      { line: '1: // User with Embedded Address (1:Few)', note: 'علاقة قليلة ثابتة تضمن التضمين' },
      { line: '2: const userSchema = { name: "Amr", address: { city: "Cairo", zip: "11511" } };', note: 'مستند مضمن سريع' },
      { line: '3: // Orders Referenced Separately (1:Many Unbounded)', note: 'علاقة تنمو باستمرار تفصل في جدول مستقل' },
      { line: '4: const orderSchema = { userId: ObjectId("..."), total: 250 };', note: 'مرجع خارجي' }
    ],
    pitfallBad: 'user = { name: "Amr", logs: [ ...100000 log items ] }; /* مصفوفة نمو لا نهائي تفجر الـ 16MB! */',
    pitfallGood: 'فصل logs في مجموعة منفصلة log = { userId: ObjectId("..."), action: "LOGIN" };',
    pitfallDiagnosis: 'تضمين مصفوفات تنمو مع كل حدث للمستخدم يؤدي لاصطدام المستند بحد الـ 16MB وتلفه.',
    quizPool: [{
      q: 'What is the hard maximum BSON document size limit in MongoDB?',
      qAr: 'ما هو الحد الأقصى الصارم لحجم مستند BSON الواحد في MongoDB؟',
      options: ['4 MB', '8 MB', '16 MB', '64 MB'],
      correct: 2,
      why: 'MongoDB enforces a strict 16MB maximum document size limit to ensure efficient RAM and network usage.',
      whyAr: 'تفرض MongoDB حداً أقصى صارماً 16 ميجابايت لضمان كفاءة استهلاك الذاكرة وسرعة نقل الشبكة.'
    }],
    interviewQ: 'ما هو نمط الـ Bucket Pattern في MongoDB ومتى يُستخدم في مشاريع الإنتاج؟',
    interviewA: 'يُستخدم في تطبيقات إنترنت الأشياء (IoT) والبيانات الزمنية (Time-Series)؛ فبدلاً من حفظ مستند لكل قراءة حساس كل ثانية، نجمع قراءات ساعة كاملة (60 قراءة) داخل مستند واحد يحتوي على مصفوفة صغيرة، مما يقلل عدد المستندات بنسبة 60x ويقلل استهلاك الفهارس بشكل هائل.'
  },
  {
    slug: 'indexes-performance',
    title: 'MongoDB Index Strategies: Single, Compound, Multikey, TTL & Explain Plans',
    titleAr: 'استراتيجيات الفهارس في MongoDB: الفهارس المركبة، مؤقتات TTL وخطط التنفيذ',
    level: 2,
    order: 4,
    estMinutes: 26,
    version: 'MongoDB 7.0+',
    pattern: 'Database Performance',
    problemOpening: `الاستعلام في مجموعة MongoDB تحتوي على 500,000 مستند بدون وجود فهارس (Indexes) يجبر المحرك على عمل مسح كامل للمجموعة (COLLSCAN: Collection Scan)، مما يعني قراءة كل بايت على القرص واستهلاك 100% من المعالج وبطء الاستجابة لعدة ثوانٍ! بإنشاء فهرس B-Tree صحيح، يتحول الاستعلام إلى فحص فهارس فوري (IXSCAN) يستغرق أقل من 2 ميلي ثانية!`,
    objectives: [
      'فهم خوارزمية B-Tree المعتمدة في فهارس MongoDB.',
      'بناء الفهارس المركبة (Compound Indexes) وتطبيق قاعدة المساواة ثم الفرز ثم النطاق (ESR Rule).',
      'تحليل استعلامات قاعدة البيانات باستخدام explain("executionStats").'
    ],
    mechanics: [
      { step: 1, title: 'الفحص الموضعي بـ IXSCAN', desc: 'المحرك يبحث في شجرة الفهرس المرتبة ويصل للمستندات المطلوبة بـ O(log N).' },
      { step: 2, title: 'قاعدة ESR للفهارس المركبة', desc: 'Equality (المساواة أولاً) &larr; Sort (حقول الفرز ثانياً) &larr; Range (حقول النطاق مثل $gte أخيراً).' },
      { step: 3, title: 'فهارس الحذف التلقائي (TTL Indexes)', desc: 'حذف جلسات المستخدمين ورموز التحقق تلقائياً من الذاكرة بعد مرور وقت محدد (expireAfterSeconds).' }
    ],
    playgroundCode: `// Simulating Index Scan vs Collection Scan Execution Cost
function explainQuery(hasIndex, totalDocs = 100000) {
  if (hasIndex) {
    console.log("⚡ [IXSCAN] Index hit! Scanned Keys: 1 | Scanned Docs: 1 | Execution Time: 0.8ms");
  } else {
    console.log(\`🐢 [COLLSCAN] Full scan! Scanned Docs: \${totalDocs} | CPU Spike: 100% | Execution Time: 480ms\`);
  }
}

explainQuery(false); // Slow COLLSCAN!
explainQuery(true);  // Blazing Fast IXSCAN!`,
    experimentQuestion: 'ما هي ميزة الاستعلام المغطى بالكامل (Covered Query) في MongoDB؟',
    experimentAnswer: 'هو استعلام يستطيع MongoDB إرجاع جميع الحقول المطلوبة فيه من شجرة الفهرس (Index) مباشرة دون الحاجة للمس أو قراءة مستندات الـ Collection في الذاكرة نهائياً (totalDocsExamined: 0)، وهو أسرع أنواع الاستعلامات في المحرك.',
    codeAnatomy: [
      { line: '1: // Compound Index following ESR Rule (Equality -> Sort -> Range)', note: 'تطبيق قاعدة ESR' },
      { line: '2: db.orders.createIndex({ status: 1, createdAt: -1, total: 1 });', note: 'إنشاء الفهرس المركب' },
      { line: '3: // TTL Index to auto-expire sessions after 24 hours', note: 'فهرس الحذف الزمني التلقائي' },
      { line: '4: db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });', note: 'حذف آلي' }
    ],
    pitfallBad: 'إنشاء 30 فهرس على نفس الـ Collection لكل حقل محتمل!',
    pitfallGood: 'إنشاء فهارس مركبة مدروسة مطابقة للاستعلامات الشائعة فقط',
    pitfallDiagnosis: 'كل فهرس إضافي يستهلك مساحة ضخمة من الـ RAM ويبطئ عمليات الـ Insert و Update بشكل ملحوظ.',
    quizPool: [{
      q: 'Which rule dictates the optimal order of fields in a MongoDB compound index?',
      qAr: 'ما هي القاعدة الذهبية التي تحدد الترتيب المثالي للحقول في الفهرس المركب في MongoDB؟',
      options: ['FIFO Rule', 'ESR Rule (Equality, Sort, Range)', 'Alphabetical Order', 'CRUD Priority'],
      correct: 1,
      why: 'The ESR Rule specifies that Equality fields come first, followed by Sort fields, and Range fields last.',
      whyAr: 'قاعدة ESR تنص على وضع حقول المساواة أولاً ثم حقول الفرز ثم حقول النطاق.'
    }],
    interviewQ: 'كيف تشخص الاستعلامات البطيئة في MongoDB في بيئة الإنتاج؟',
    interviewA: 'نقوم بتفعيل الـ `Database Profiler` عبر `db.setProfilingLevel(1, { slowms: 100 })` لتسجيل أي استعلام يتجاوز 100ms في مجموعة `system.profile`، ثم نقوم بتحليله باستخدام `.explain("executionStats")` والتأكد من عدم وجود `COLLSCAN` وأن نسبة `totalKeysExamined` إلى `nReturned` قريبة من 1:1.'
  },
  {
    slug: 'aggregation-pipeline',
    title: 'MongoDB Aggregation Framework: $match, $group, $lookup, $unwind & $facet',
    titleAr: 'خط أنابيب التجميع (Aggregation Pipeline): المعالجة التحليلية والربط في MongoDB',
    level: 2,
    order: 5,
    estMinutes: 28,
    version: 'MongoDB 7.0+',
    pattern: 'Analytical Engine',
    problemOpening: `عندما تحتاج لحساب تقارير مالية معقدة، تجميع المبيعات شهرياً، أو ربط مستندات من مجموعتين مختلفتين، استعلامات find البسيطة تقف عاجزة. إطار التجميع <code dir="ltr">Aggregation Pipeline</code> هو أقوى محرك تحليلي في NoSQL؛ يعمل كخط إنتاج مصنعي متسلسل يمرر المستندات عبر مراحل متتابعة (<code dir="ltr">$match</code> &larr; <code dir="ltr">$group</code> &larr; <code dir="ltr">$lookup</code> &larr; <code dir="ltr">$project</code>) بسرعة فائقة على مستوى المحرك.`,
    objectives: [
      'فهم تدفق مراحل الـ Pipeline وترتيبها الأمثل للاستفادة من الفهارس.',
      'تجميع وحساب الإحصائيات باستخدام $group ومشغلات التجميع ($sum, $avg, $push).',
      'تنفيذ عمليات الربط بين المجموعات (Left Outer Joins) باستخدام $lookup.'
    ],
    mechanics: [
      { step: 1, title: 'التصفية المبكرة بـ $match', desc: 'وضع $match في أول مرحلة لتصفية المستندات بالاعتماد على الفهارس وتقليل حجم البيانات الممررة للمراحل التالية.' },
      { step: 2, title: 'التجميع وحساب المقاييس بـ $group', desc: 'تقسيم البيانات إلى مجموعات بناءً على مفتاح _id وحساب المجاميع والنسب.' },
      { step: 3, title: 'الربط الخارجي بـ $lookup', desc: 'جلب بيانات المجموعات الأخرى عبر مطابقة localField مع foreignField.' }
    ],
    playgroundCode: `// Aggregation Pipeline Stage Simulator
const orders = [
  { category: "Electronics", price: 200, status: "completed" },
  { category: "Books", price: 30, status: "completed" },
  { category: "Electronics", price: 500, status: "completed" },
  { category: "Books", price: 40, status: "cancelled" }
];

// Simulating Pipeline: [ { $match: { status: "completed" } }, { $group: { _id: "$category", totalRevenue: { $sum: "$price" } } } ]
const matched = orders.filter(o => o.status === "completed");
const grouped = matched.reduce((acc, o) => {
  acc[o.category] = (acc[o.category] || 0) + o.price;
  return acc;
}, {});

console.log("Simulated Aggregation Revenue Output:", JSON.stringify(grouped, null, 2));`,
    experimentQuestion: 'لماذا يحظر وضع مرحلة $lookup قبل مرحلة $match في خط أنابيب التجميع؟',
    experimentAnswer: 'لأن وضع $lookup أولاً سيجبر المحرك على عمل Join لكل مستندات المجموعة في الذاكرة قبل التصفية، بينما وضع $match أولاً يقلص عدد المستندات بنسبة 90% قبل عمل الربط مما يوفر الذاكرة ويسرع الاستعلام 10x.',
    codeAnatomy: [
      { line: '1: const stats = await db.collection("orders").aggregate([', note: 'بدء خط الأنابيب' },
      { line: '2:   { $match: { status: "completed" } },', note: 'المرحلة 1: تصفية تعتمد على الفهارس' },
      { line: '3:   { $group: { _id: "$userId", totalSpent: { $sum: "$total" }, count: { $sum: 1 } } },', note: 'المرحلة 2: تجميع وحساب' },
      { line: '4:   { $sort: { totalSpent: -1 } }', note: 'المرحلة 3: فرز تنازلي' },
      { line: '5: ]).toArray();', note: 'تنفيذ وإرجاع مصفوفة' }
    ],
    pitfallBad: 'aggregate([{ $group: ... }, { $match: ... }]) /* يفقد استخدام الفهارس ويبطئ الاستعلام */',
    pitfallGood: 'aggregate([{ $match: ... }, { $group: ... }]) /* تصفية أولاً تستغل الـ Index بالكامل */',
    pitfallDiagnosis: 'مرحلة $group تلغي إمكانية استخدام الفهارس للمراحل التالية، لذا يجب وضع $match في البداية دائماً.',
    quizPool: [{
      q: 'Which aggregation stage performs a left outer join to a collection in the same database to filter in documents from the "joined" collection?',
      qAr: 'أي مرحلة في خط أنابيب التجميع تنفذ ربطاً خارجياً أيسر (Left Outer Join) مع مجموعة أخرى لجلب مستنداتها؟',
      options: ['$join', '$lookup', '$merge', '$unionWith'],
      correct: 1,
      why: 'The `$lookup` stage performs a left outer join to an unsharded collection in the same database.',
      whyAr: 'المرحلة $lookup تقوم بعملية Left Outer Join لجلب ودمج البيانات من مجموعات أخرى.'
    }],
    interviewQ: 'ما هي مرحلة $facet في خط أنابيب التجميع وفيمَ تُستخدم؟',
    interviewA: 'مرحلة `$facet` تتيح تنفيذ عدة خطوط أنابيب فرعية متوازية داخل نفس الاستعلام على نفس مجموعة البيانات؛ وتُستخدم بشكل شائع جداً في تطبيقات المتاجر لتوليد (نتائج المنتجات المقسمة لصفحات + مصفوفة فلاتر الفئات والمصنعين + توزيع الأسعار) في طلب واحد فائق السرعة.'
  },
  {
    slug: 'transactions-acid',
    title: 'Multi-Document ACID Transactions & Session Management in MongoDB',
    titleAr: 'المعاملات البنكية الشاملة (ACID Transactions) وإدارة الجلسات في MongoDB',
    level: 3,
    order: 6,
    estMinutes: 26,
    version: 'MongoDB 7.0+',
    pattern: 'Data Integrity',
    problemOpening: `في العمليات المالية والتحويلات البنكية (تحويل رصيد من حساب أ لحساب ب)، لا يمكن السماح بنجاح خصم الرصيد من الطرف الأول وفشل إضافته للطرف الثاني بسبب انقطاع مفاجئ للسيرفر! المعاملات البنكية متعددة المستندات (Multi-Document ACID Transactions) في MongoDB تضمن مبدأ "إما اكتمال كل العمليات بنجاح أو التراجع التام (Rollback) كأن شيئاً لم يكن".`,
    objectives: [
      'فهم خصائص ACID الأربعة في بيئة MongoDB الموزعة.',
      'إدارة الجلسات (ClientSession) وبدء وإنهاء المعاملات (startSession, withTransaction).',
      'التعامل مع تضارب المعاملات (Write Conflicts) وإعادة المحاولة التلقائية.'
    ],
    mechanics: [
      { step: 1, title: 'بدء الجلسة (ClientSession)', desc: 'حجز جلسة عمل تربط جميع العمليات بـ Session ID موحد.' },
      { step: 2, title: 'دالة withTransaction الآمنة', desc: 'تنفيذ التعديلات داخل دالة مخصصة تقوم بعمل Retry تلقائي عند حدوث تضارب شبكي مؤقت.' },
      { step: 3, title: 'التثبيت أو التراجع (Commit vs Abort)', desc: 'تثبيت التغييرات على القرص دفعة واحدة أو التراجع الفوري عند حدوث أي خطأ.' }
    ],
    playgroundCode: `// Simulating Bank Transfer ACID Transaction Flow
async function simulateTransfer(senderBal, receiverBal, transferAmount) {
  console.log("🔒 Starting Transaction Session...");
  let sBal = senderBal;
  let rBal = receiverBal;
  
  try {
    if (sBal < transferAmount) throw new Error("Insufficient Funds!");
    sBal -= transferAmount; // Step 1: Deduct
    rBal += transferAmount; // Step 2: Add
    console.log(\`✅ Transaction Committed! Sender: $\${sBal} | Receiver: $\${rBal}\`);
  } catch (err) {
    console.log("🛑 Transaction Aborted! Rolling back all changes:", err.message);
  }
}

simulateTransfer(500, 200, 100);
simulateTransfer(50, 200, 100); // Rollback triggered!`,
    experimentQuestion: 'هل تتطلب معاملات Multi-Document Transactions في MongoDB وجود Replica Set؟',
    experimentAnswer: 'نعم، معاملات Multi-Document Transactions في MongoDB تتطلب بيئة Replica Set (سواء محلياً أو في الإنتاج) لأنها تعتمد داخلياً على سجل العمليات الموزع (Oplog) لتنسيق التراجع والتثبيت.',
    codeAnatomy: [
      { line: '1: const session = client.startSession();', note: 'بدء جلسة المعاملة' },
      { line: '2: await session.withTransaction(async () => {', note: 'تغليف العمليات في معاملة ذرية' },
      { line: '3:   await users.updateOne({ _id: fromId }, { $inc: { balance: -100 } }, { session });', note: 'تمرير session إلزامي' },
      { line: '4:   await users.updateOne({ _id: toId }, { $inc: { balance: 100 } }, { session });', note: 'تمرير session إلزامي' },
      { line: '5: });', note: 'تثبيت تلقائي للمعاملة' },
      { line: '6: await session.endSession();', note: 'إغلاق الجلسة وتحرير الموارد' }
    ],
    pitfallBad: 'تنفيذ التعديلات داخل withTransaction بدون تمرير { session } في خيارات الاستعلام!',
    pitfallGood: 'تمرير { session } لكل استعلام لضمان شموله داخل نطاق المعاملة الذرية',
    pitfallDiagnosis: 'إذا نسيت تمرير session، سيتم تنفيذ الاستعلام خارج نطاق المعاملة ولن يشمله التراجع عند الفشل.',
    quizPool: [{
      q: 'Which method on MongoDB ClientSession executes a callback inside an ACID transaction with automatic retry logic on transient errors?',
      qAr: 'أي دالة في ClientSession تنفذ الكود داخل معاملة ACID مع إعادة المحاولة التلقائية عند الأخطاء العابرة؟',
      options: ['session.execute()', 'session.withTransaction()', 'session.runAtomic()', 'session.commit()'],
      correct: 1,
      why: '`withTransaction` starts a transaction, executes the callback, and commits or aborts automatically while handling transient errors.',
      whyAr: 'الدالة withTransaction تبدأ المعاملة وتدير التثبيت والتراجع وإعادة المحاولة التلقائية بذكاء.'
    }],
    interviewQ: 'متى تتجنب استخدام Multi-Document Transactions في MongoDB وتعتمد على Single-Document Atomicity؟',
    interviewA: 'الـ Multi-Document Transactions تفرض تكلفة أدائية وقفل على مستوى الموارد؛ إذا كان بإمكانك تصميم المخطط بنمط التضمين (Embedding) بحيث تكون كل التعديلات داخل نفس المستند، فإن MongoDB تضمن الذرية (Atomicity) بنسبة 100% بدون أي حاجة لبدء Transactions ثقيلة.'
  },
  {
    slug: 'mongoose-odm',
    title: 'Mongoose 8 ODM: Schemas, Models, Middleware Hooks, Virtuals & Lean Queries',
    titleAr: 'مكتبة Mongoose 8: المخططات، خطافات الـ Middleware والاستعلامات الخفيفة (Lean)',
    level: 3,
    order: 7,
    estMinutes: 26,
    version: 'Mongoose 8.x',
    pattern: 'ODM Architecture',
    problemOpening: `التعامل مع MongoDB عبر مكتبة <code dir="ltr">Mongoose</code> يوفر أمان المخططات والتحقق التلقائي والـ Hooks. لكن أكبر فخ أدائي يقع فيه المطورون هو استدعاء <code dir="ltr">User.find()</code> لقراءة 10,000 مستند لعرضهم في جدول؛ يقوم Mongoose بتغليف كل مستند بكائن Mongoose Document كامل يحتوي على دوال التغيير والمراقبة والـ Getters، مما يستهلك 500MB من الـ Heap! الحل السحري هو تفعيل <code dir="ltr">.lean()</code> لإرجاع كائنات جافاسكربت نقية O(1) فائقة السرعة.`,
    objectives: [
      'تعريف مخططات Mongoose Schemas مع القواعد الصارمة والخصائص الافتراضية والتحقق المخصص.',
      'استخدام خطافات ما قبل وما بعد الحفظ (Pre/Post Save Middleware) لتشفير كلمات المرور.',
      'تحسين سرعة استعلامات القراءة بنسبة 5x باستخدام .lean().'
    ],
    mechanics: [
      { step: 1, title: 'المخططات والنماذج (Schemas & Models)', desc: 'بناء هيكل البيانات وتطبيق القواعد الصارمة (Required, Unique, Enum, Min/Max).' },
      { step: 2, title: 'خطافات الـ Middleware (Pre-save)', desc: 'اعتراض عملية الحفظ لتجزئة كلمة المرور تلقائياً عبر bcrypt قبل وصولها لقاعدة البيانات.' },
      { step: 3, title: 'الاستعلامات الخفيفة بـ lean()', desc: 'تجاوز كائنات Mongoose الثقيلة وإرجاع Plain JavaScript Objects لعمليات القراءة السريعة.' }
    ],
    playgroundCode: `// Mongoose Lean Query Performance Simulator
function simulateFind(isLean, count = 5000) {
  if (isLean) {
    console.log(\`⚡ [.lean() Query] Instantiated \${count} Plain JS Objects. Memory: 12MB | Time: 15ms\`);
  } else {
    console.log(\`🐢 [Heavy Hydration] Instantiated \${count} Mongoose Documents with full hooks. Memory: 180MB | Time: 140ms\`);
  }
}

simulateFind(false); // Heavy!
simulateFind(true);  // Blazing Fast & Memory Efficient!`,
    experimentQuestion: 'ماذا تفقد عند استخدام .lean() في استعلامات Mongoose؟',
    experimentAnswer: 'تفقد خصائص الـ Virtuals، ودوال الـ Document Methods، والقدرة على استدعاء .save() مباشرة على المستند المرجع؛ وتصبح النتيجة كائناً عادياً للقراءة فقط (Read-Only POJO).',
    codeAnatomy: [
      { line: '1: userSchema.pre("save", async function(next) {', note: 'خطاف ما قبل الحفظ' },
      { line: '2:   if (!this.isModified("password")) return next();', note: 'تجاوز التشفير إذا لم تتغير كلمة السر' },
      { line: '3:   this.password = await bcrypt.hash(this.password, 12);', note: 'تشفير كلمة المرور تلقائياً' },
      { line: '4: });', note: 'نهاية الخطاف' },
      { line: '5: const users = await User.find().lean();', note: 'استعلام قراءة فائق السرعة' }
    ],
    pitfallBad: 'const users = await User.find(); /* استعلام قراءة ثقيل يستهلك الذاكرة بدون داعٍ */',
    pitfallGood: 'const users = await User.find().lean(); /* استعلام خفيف مثالي لواجهات القراءة */',
    pitfallDiagnosis: 'عدم استخدام lean في عمليات القراءة البحتة (Read-Only Endpoints) يهدر الذاكرة ويبطئ الـ API.',
    quizPool: [{
      q: 'Why should `.lean()` be used on read-only queries in Mongoose?',
      qAr: 'لماذا يجب استخدام .lean() في استعلامات القراءة فقط في Mongoose؟',
      options: ['It bypasses database authentication', 'It returns high-performance plain JavaScript objects instead of heavy Mongoose Documents', 'It encrypts the results', 'It auto-paginates results'],
      correct: 1,
      why: '`.lean()` skips hydrating full Mongoose documents, drastically reducing memory usage and execution time.',
      whyAr: 'الـ lean تتجاوز إنشاء كائنات Mongoose المعقدة وترجع كائنات بسيطة موفرة للذاكرة والوقت.'
    }],
    interviewQ: 'ما هي الـ Virtual Properties في Mongoose وفيمَ تفيد في تصميم النماذج؟',
    interviewA: 'هي خصائص وهمية محسوبة يمكن قراءتها من النموذج (مثل `fullName` الذي يدمج `firstName` و `lastName`) لكنها لا تُخزن في قاعدة البيانات ولا تستهلك مساحة على القرص، وتُحسب لحظياً عند الحاجة.'
  },
  {
    slug: 'schema-validation',
    title: 'MongoDB Collection-Level JSON Schema Validation ($jsonSchema)',
    titleAr: 'التحقق من صحة البيانات على مستوى محرك MongoDB عبر $jsonSchema',
    level: 3,
    order: 8,
    estMinutes: 22,
    version: 'MongoDB 7.0+',
    pattern: 'Engine Validation',
    problemOpening: `الاعتماد على التحقق في طبقة التطبيق فقط (بـ Mongoose أو Zod) يترك ثغرة خطيرة: إذا قام مطور آخر بالاتصال بقاعدة البيانات مباشرة عبر MongoDB Compass أو كتب اسكربت صيانة يدوي، يمكنه حقن بيانات مشوهة أو حقول ناقصة تكسر التطبيق! ميزة <code dir="ltr">$jsonSchema</code> في MongoDB تنفذ قواعد التحقق على مستوى محرك قاعدة البيانات نفسه لرفض أي وثيقة لا تطابق المعيار.`,
    objectives: [
      'إنشاء وتعديل قواعد $jsonSchema على المجموعات باستخدام collMod.',
      'تحديد الحقول الإلزامية والأنواع الدقيقة (bsonType: string, int, double).',
      'ضبط مستويات التحقق: validationLevel (strict vs moderate) و validationAction (error vs warn).'
    ],
    mechanics: [
      { step: 1, title: 'تعريف معيار $jsonSchema', desc: 'تحديد خصائص المستند المقبولة والأنواع المسموح بها في محرك WiredTiger.' },
      { step: 2, title: 'التحقق الصارم (Strict Validation)', desc: 'المحرك يفحص كل مستند عند الإدخال والتعديل ويرفض المستند المخالف فوراً.' },
      { step: 3, title: 'حظر الحقول الإضافية (additionalProperties: false)', desc: 'منع إضافة حقول غير مصرح بها على مستوى قاعدة البيانات.' }
    ],
    playgroundCode: `// MongoDB Collection Validator Schema Specs
const collectionValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "email", "role"],
    properties: {
      name: { bsonType: "string", description: "must be a string and is required" },
      email: { bsonType: "string", pattern: "^.+@.+$", description: "must match email regex" },
      role: { enum: ["admin", "student", "instructor"], description: "can only be one of the enum values" }
    }
  }
};
console.log("Engine-Level Schema Validator Configuration:");
console.log(JSON.stringify(collectionValidator, null, 2));`,
    experimentQuestion: 'ما هو الفرق بين validationAction: "error" و validationAction: "warn" في MongoDB؟',
    experimentAnswer: 'القيمة "error" ترفض العملية بالكامل وتلقي خطأ وتمنع حفظ المستند، بينما "warn" تسجل تحذيراً في سجلات السيرفر (Log File) ولكنها تسمح بحفظ المستند المخالف دون إيقافه.',
    codeAnatomy: [
      { line: '1: db.createCollection("students", {', note: 'إنشاء مجموعة مع حارس أمان المحرك' },
      { line: '2:   validator: { $jsonSchema: { required: ["email"], properties: { email: { bsonType: "string" } } } },', note: 'قواعد التحقق الصارمة' },
      { line: '3:   validationLevel: "strict", validationAction: "error"', note: 'رفض قاطع للمخالفات' },
      { line: '4: });', note: 'إنشاء المجموعة' }
    ],
    pitfallBad: 'الاعتماد فقط على التحقق في كود الفرونت إند أو الباك إند دون حماية محرك الداتابيز',
    pitfallGood: 'تطبيق دفاع مزدوج: فحص Zod في الـ API + قواعد $jsonSchema في MongoDB',
    pitfallDiagnosis: 'غياب التحقق في قاعدة البيانات يتركها عرضة لتشوه البيانات عبر اسكربتات الصيانة الخارجية.',
    quizPool: [{
      q: 'Which MongoDB command is used to update the JSON schema validator on an existing collection?',
      qAr: 'أي أمر في MongoDB يُستخدم لتحديث قواعد الـ JSON Schema Validator على مجموعة موجودة بالفعل؟',
      options: ['db.updateSchema()', 'db.runCommand({ collMod: "collectionName", validator: ... })', 'db.alterCollection()', 'db.setValidator()'],
      correct: 1,
      why: 'The `collMod` (collection modify) command allows updating collection options including the validator.',
      whyAr: 'الأمر collMod يتيح تعديل خصائص المجموعة وتحديث قواعد التحقق validator عليها.'
    }],
    interviewQ: 'متى تستخدم validationLevel: "moderate" بدلاً من "strict" في قواعد البيانات قيد الإنتاج؟',
    interviewA: 'نستخدم `moderate` عند تطبيق قواعد تحقق جديدة على مجموعة قديمة تحتوي بالفعل على آلاف المستندات التي لا تطابق المخطط الجديد؛ فيقوم المحرك بالتحقق فقط من المستندات الجديدة أو المستندات التي كانت تطابق المخطط مسبقاً، دون منع تعديل المستندات التاريخية القديمة.'
  },
  {
    slug: 'sharding-replication',
    title: 'High Availability: Replica Sets, Oplog, Sharded Clusters & Horizontal Scaling',
    titleAr: 'التوافرية العالية والتوسع الأفقي: مجموعات النسخ المتطابقة (Replica Sets) والـ Sharding',
    level: 3,
    order: 9,
    estMinutes: 28,
    version: 'MongoDB 7.0 Enterprise',
    pattern: 'Distributed Systems',
    problemOpening: `سيرفر قاعدة البيانات الواحد هو نقطة انهيار مفردة (Single Point of Failure): لو السيرفر انقطع اتصاله أو تعطل القرص، التطبيق بالكامل سيتوقف عن العمل وتضيع البيانات! في بيئات الإنتاج، تُبنى MongoDB على معمارية التوافرية العالية (High Availability عبر Replica Sets) حيث ترتبط عقدة أساسية (Primary) بعدة عقد ثانوية (Secondaries) تتزامن عبر سجل الـ Oplog وتقوم بانتخاب خادم رئيسي جديد في ثوانٍ معدودة عند سقوط الـ Primary!`,
    objectives: [
      'فهم معمارية الـ Replica Set ودور الـ Primary والـ Secondaries والـ Arbiter.',
      'آلية التزامن عبر سجل العمليات (Oplog: Operations Log) والانتخابات التلقائية (Elections).',
      'مبادئ التوسع الأفقي (Horizontal Scaling) وتقسيم البيانات عبر Sharded Clusters و Shard Keys.'
    ],
    mechanics: [
      { step: 1, title: 'الكتابة في العقدة الأساسية (Primary)', desc: 'جميع عمليات الكتابة تتم حصرياً في الـ Primary وتُسجل في الـ Oplog.' },
      { step: 2, title: 'التزامن المستمر مع العقد الثانوية', desc: 'الـ Secondaries تقرأ وتطبق الـ Oplog باستمرار لتحتفظ بنسخة متطابقة لحظياً.' },
      { step: 3, title: 'التوزيع الأفقي عبر الـ Sharding', desc: 'تقسيم التخزين على عدة سيرفرات مستقلة (Shards) بناءً على مفتاح التوزيع (Shard Key).' }
    ],
    playgroundCode: `// Replica Set Election & Heartbeat Simulation
class ReplicaSetCluster {
  constructor() {
    this.primary = "Node-1 (Primary)";
    this.secondaries = ["Node-2", "Node-3"];
  }
  failover() {
    console.log(\`🔥 Primary \${this.primary} crashed!\`);
    this.primary = this.secondaries.shift() + " (Elected Primary)";
    console.log(\`⚡ Automatic Election Triggered! New Primary: \${this.primary}\`);
    console.log(\`✅ Cluster Health Restored with zero manual intervention!\`);
  }
}

const cluster = new ReplicaSetCluster();
cluster.failover();`,
    experimentQuestion: 'ما هي وظيفة الـ Arbiter في مجموعة Replica Set في MongoDB؟',
    experimentAnswer: 'الـ Arbiter هو خادم خفيف لا يحتفظ بأي بيانات ولا يخدم القراءة أو الكتابة، ووظيفته الوحيدة هي التصويت في الانتخابات لكسر التعادل وتوفير الأغلبية (Quorum) عند وجود عدد زوجي من السيرفرات بأقل تكلفة بنية تحتية.',
    codeAnatomy: [
      { line: '1: // MongoDB Connection String with Replica Set Spec', note: 'رابط الاتصال العنقودي' },
      { line: '2: mongodb://node1:27017,node2:27017,node3:27017/prod?replicaSet=rs0&w=majority', note: 'طلب تأكيد الكتابة من الأغلبية w:majority' }
    ],
    pitfallBad: 'تشغيل MongoDB في بيئة إنتاجية بدون Replica Set (خادم وحيد Standalone)',
    pitfallGood: 'نشر 3 عقد Replica Set على الأقل موزعة على مناطق جغرافية مختلفة',
    pitfallDiagnosis: 'الخادم الوحيد يسبب توقف الخدمة بالكامل وخسارة البيانات عند حدوث أي عطل بالعتاد.',
    quizPool: [{
      q: 'What is the special capped collection used by MongoDB Replica Sets to record all database mutations for replication?',
      qAr: 'ما هي المجموعة الخاصة التي تستخدمها مجموعات النسخ المتطابقة في MongoDB لتسجيل كل التعديلات وتزامنها؟',
      options: ['system.journal', 'local.oplog.rs', 'system.replication', 'admin.logs'],
      correct: 1,
      why: 'The operations log (`local.oplog.rs`) is a special capped collection that records a rolling history of all operations.',
      whyAr: 'سجل العمليات local.oplog.rs يحتفظ بتاريخ التعديلات لمزامنة العقد الثانوية بدقة.'
    }],
    interviewQ: 'كيف تختار الـ Shard Key المثالي عند توسيع قاعدة بيانات MongoDB أفقياً؟',
    interviewA: 'الـ Shard Key المثالي يجب أن يحقق 3 شروط: 1. تنوع عالي للقيم (High Cardinality) لتوزيع البيانات بالتساوي. 2. عدم التزايد الخطي المتسلسل (Non-Monotonic) مثل المعرفات التلقائية لتجنب تركز كل الكتابات في Shard واحد (Hot Spotting). 3. أن يكون مضمناً في معظم استعلامات القراءة لتوجيه الطلب للـ Shard المعني مباشرة (Targeted Query) بدلاً من استعلام كل الـ Shards (Scatter-Gather).'
  },
  {
    slug: 'backup-security',
    title: 'Production MongoDB Security: RBAC, TLS Encryption, mongodump & Recovery',
    titleAr: 'أمان MongoDB للإنتاج: تشفير الاتصالات، صلاحيات المستخدمين والنسخ الاحتياطي',
    level: 3,
    order: 10,
    estMinutes: 24,
    version: 'MongoDB 7.0 Production',
    pattern: 'Security & Operations',
    problemOpening: `ترك منافذ MongoDB (المنفذ 27017) مفتوحة للإنترنت بدون تفعيل التوثيق (Authentication) وتشفير الاتصالات هو السبب وراء آلاف حوادث تسريب وفدية قواعد البيانات (Ransomware Attacks) حول العالم! تحصين قاعدة البيانات لبيئات الإنتاج يتطلب تفعيل التوثيق الصارم بـ SCRAM-SHA-256، تقييد الصلاحيات بـ RBAC، تشفير الاتصالات بـ TLS/SSL، وأتمتة خطط النسخ الاحتياطي والاسترجاع بـ mongodump.`,
    objectives: [
      'تفعيل التوثيق الأمني security.authorization: enabled وإنشاء مستخدمين بصلاحيات محددة.',
      'تشفير الاتصالات بين الخوادم وقاعدة البيانات عبر شهادات TLS/SSL.',
      'أتمتة النسخ الاحتياطي الساخن (Hot Backups) باستخدام mongodump و mongorestore.'
    ],
    mechanics: [
      { step: 1, title: 'تفعيل التوثيق الإلزامي', desc: 'ضبط الإعدادات لمنع أي اتصال غير موثق باسم مستخدم وكلمة سر قوية.' },
      { step: 2, title: 'الصلاحيات الأقل تفضيلاً (Least Privilege)', desc: 'منح تطبيق الويب دور readWrite على قاعدة البيانات المحددة فقط ومنع صلاحيات root.' },
      { step: 3, title: 'النسخ الاحتياطي المؤتمت (mongodump --gzip)', desc: 'أخذ لقطات مضغوطة من البيانات مع الـ Oplog لنقلها لمخازن سحابية معزولة (AWS S3 Glacier).' }
    ],
    playgroundCode: `// Backup Automation Script Simulation
function executeBackup(dbName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupArchive = \`/backups/\${dbName}-\${timestamp}.gz\`;
  console.log(\`📦 Executing: mongodump --db \${dbName} --archive=\${backupArchive} --gzip --oplog\`);
  console.log("🔒 Encrypting backup archive with AES-256...");
  console.log("☁️ Uploading encrypted archive to offsite S3 cold storage bucket...");
  console.log("✅ Backup verified successfully!");
}
executeBackup("codehub_production");`,
    experimentQuestion: 'لماذا يعتبر خيار --oplog إلزامياً عند أخذ نسخة احتياطية بـ mongodump في بيئة إنتاجية قيد التشغيل؟',
    experimentAnswer: 'لأن قاعدة البيانات تكون قيد الكتابة أثناء عمل النسخة؛ خيار --oplog يلتقط جميع التعديلات التي حدثت أثناء عملية النسخ الاحتياطي لضمان الحصول على لقطة بيانات متسقة ومتطابقة تماماً (Point-in-Time Consistency).',
    codeAnatomy: [
      { line: '1: # mongod.conf Security Hardening', note: 'ملف إعدادات السيرفر المحصن' },
      { line: '2: security:', note: 'قسم الأمان' },
      { line: '3:   authorization: enabled', note: 'تفعيل التوثيق الإلزامي' },
      { line: '4: net:', note: 'إعدادات الشبكة' },
      { line: '5:   bindIp: 127.0.0.1,10.0.0.5 # تقييد الاتصال بالشبكة الداخلية فقط', note: 'حجب المنفذ عن الإنترنت العام' }
    ],
    pitfallBad: 'ربط bindIp: 0.0.0.0 بدون تفعيل authorization في سيرفر إنتاجي مفتوح!',
    pitfallGood: 'تفعيل authorization: enabled وتشفير TLS وتقييد الوصول لشبكة الـ VPC الخاصة فقط',
    pitfallDiagnosis: 'ترك قاعدة البيانات بدون توثيق يتيح للروبوتات اختراقها وحذف البيانات والمطالبة بفدية في دقائق.',
    quizPool: [{
      q: 'Which utility creates high-performance compressed binary archives of MongoDB databases for backup?',
      qAr: 'أي أداة تنشئ نسخاً احتياطية ثنائية مضغوطة عالية الكفاءة من قواعد بيانات MongoDB؟',
      options: ['mongoexport', 'mongodump', 'mongosync', 'mongobackup'],
      correct: 1,
      why: '`mongodump` is the official binary export utility designed for database backups.',
      whyAr: 'الأداة mongodump هي الأداة الرسمية لتوليد النسخ الاحتياطية الثنائية الكاملة.'
    }],
    interviewQ: 'ما هو الفرق بين mongodump و mongoexport ومتى تستخدم كلاً منهما؟',
    interviewA: 'الـ `mongodump` تصدر البيانات بصيغة BSON ثنائية خام مع الاحتفاظ بالأنواع الدقيقة والفهارس وحجم الملفات المضغوط، وتُستخدم للنسخ الاحتياطي واسترجاع الكوارث. أما `mongoexport` فتصدر البيانات كنصوص JSON أو CSV مقروءة، وتُستخدم لتصدير عينات بيانات للأطراف الثالثة أو برامج الـ Excel وليست مناسبة للنسخ الاحتياطي الكامل.'
  }
];
