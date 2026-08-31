/* ============================================================
   scripts/curriculum-data/mongodb-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 5: MongoDB 8 Distributed NoSQL Engine (All 9 Lessons).
   ============================================================ */

export const mongodbLessons = [
  {
    slug: 'crud-operations',
    title: 'MongoDB CRUD Operations: BSON Data Types, Query Selectors & Atomic Updates',
    titleAr: 'عمليات الـ CRUD في MongoDB: أنواع BSON والمشغلات الذرية للبيانات الموضعية ($set, $inc, $push)',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'MongoDB 8.0+',
    pattern: 'Atomic Document Modification & BSON Serialization',
    objectives: [
      'فهم مميزات صيغة BSON الثنائية وتمثيل البيانات الدقيقة (ObjectId, Decimal128, ISODate) في محرك WiredTiger.',
      'إتقان مشغلات الاستعلام المتقدمة: المقارنة ($gt, $in)، والمنطق ($and, $or, $nor)، والمصفوفات ($all, $elemMatch).',
      'تطبيق التعديلات الذرية الموضعية باستخدام $set و $inc و $push و $addToSet وتفادي سباق البيانات (Race Conditions).',
      'استخدام تقنية Upsert الذرية (تحديث أو إنشاء) واسترجاع المستند المعدل عبر findOneAndUpdate.'
    ],
    problemOpening: `
      MongoDB ليست مجرد قاعدة بيانات تخزن نصوص JSON عادية؛ بل هي محرك تخزين ثنائي عالي الأداء يعتمد على صيغة **BSON (Binary JSON)** التي تدعم أنواع بيانات رقمية فائقة الدقة مثل <code dir="ltr">Decimal128</code> (للحسابات المالية الدقيقة) و <code dir="ltr">Int64</code> والتواريخ الحقيقية <code dir="ltr">ISODate</code> بدلاً من السلاسل النصية.
      المبرمج المبتدئ يقع في كارثة شهيرة عند تعديل البيانات: يقوم بجلب المستند للـ RAM وتعديل الحقل ثم حفظه بالكامل!
      لو كان لديك مستخدمان يقومان بالشراء في نفس الميلي ثانية ويعدلان رصيد المحفظة، فإن هذه الطريقة تتسبب في فقدان التعديلات وسباق البيانات (Lost Update Race Condition)!
      الحل المعماري هو استخدام **المشغلات الذرية الموضعية (In-Place Atomic Update Operators)** مثل <code dir="ltr">$inc</code> و <code dir="ltr">$push</code> و <code dir="ltr">$addToSet</code> التي تنفذ العملية الحسابية مباشرة داخل محرك قاعدة البيانات في عملية ذرية واحدة مقفولة لا تقبل التجزئة.
      في هذا الدرس، هنتعلم أسرار استعلامات BSON، إزاي نستخدم <code dir="ltr">$elemMatch</code> للبحث داخل المصفوفات المتداخلة، ولماذا يجب الانتباه لسلوك استبدال المستندات في التحديث.
    `,
    mechanics: [
      { step: '01', title: 'تمثيل BSON وتشريح كائن ObjectId', desc: 'الـ ObjectId بحجم 12 بايت يدمج طابع الوقت (Timestamp) مع معرف الجهاز والعملية وعداداً تصاعدياً عشوائياً لضمان التفرد عبر السيرفرات الموزعة.' },
      { step: '02', title: 'الاستعلام المتقدم داخل المصفوفات بـ $elemMatch', desc: 'مطابقة عدة شروط معاً داخل نفس العنصر في المصفوفة لمنع سحب مستندات غير متطابقة الشروط.' },
      { step: '03', title: 'الزيادة والنقصان الذري بـ $inc', desc: 'تعديل الأرصدة وعدادات الزيارات مباشرة على مستوى محرك WiredTiger في عملية ذرية مضمونة بنسبة 100% ضد التضارب.' },
      { step: '04', title: 'إدارة المصفوفات بـ $push و $addToSet', desc: 'إضافة العناصر للمصفوفات مع استخدام $addToSet لمنع تكرار العناصر وتطبيق مفهوم المجموعات الرياضية (Sets).' },
      { step: '05', title: 'التحديث الذري الفوري بـ findOneAndUpdate()', desc: 'تنفيذ التعديل واسترجاع النسخة الجديدة المحدثة من المستند في رحلة شبكية واحدة { returnDocument: "after" }.' }
    ],
    playgroundCode: `// محاكي التعديل الذري للرصيد والمصفوفات في MongoDB
class MockMongoCollection {
  constructor(data) { this.docs = new Map(data.map(d => [d._id, d])); }

  findOneAndUpdate(filter, update, options = {}) {
    const doc = this.docs.get(filter._id);
    if (!doc) throw new Error("Document not found");

    // تطبيق مشغل $inc الذري
    if (update.$inc) {
      for (const [key, val] of Object.entries(update.$inc)) {
        doc[key] = (doc[key] || 0) + val;
      }
    }

    // تطبيق مشغل $addToSet الذري
    if (update.$addToSet) {
      for (const [key, val] of Object.entries(update.$addToSet)) {
        if (!doc[key].includes(val)) doc[key].push(val);
      }
    }

    return options.returnDocument === "after" ? doc : null;
  }
}

const coll = new MockMongoCollection([{ _id: "usr_1", balance: 500, roles: ["student"] }]);
const updated = coll.findOneAndUpdate(
  { _id: "usr_1" },
  { $inc: { balance: 150 }, $addToSet: { roles: "instructor" } },
  { returnDocument: "after" }
);

console.log("Atomic Updated Document:", updated);`,
    experimentQuestion: 'ماذا يحدث إذا نفذت db.users.updateOne({ _id: 1 }, { score: 100 }) بدون استخدام مشغل $set في MongoDB النقي؟',
    experimentAnswer: 'في MongoDB النقي، إذا مررت كائناً عادياً دون مشغلات ذرية مثل $set، سيعتبره المحرك أمراً باستبدال المستند بالكامل (Full Document Replacement)، مما يؤدي لحذف كافة الحقول الأخرى (مثل name و email و roles) وترك حقل score فقط! لذلك مشغل $set إلزامي للتعديل الجزئي.',
    codeAnatomy: [
      { line: 'import { MongoClient, ObjectId } from "mongodb";', note: 'استيراد عميل MongoDB الرسمي' },
      { line: 'export async function completeOrder(orderId, paymentRef) {', note: 'دالة إتمام الدفع' },
      { line: '  const result = await db.collection("orders").findOneAndUpdate(', note: 'تنفيذ استعلام وتحديث ذري' },
      { line: '    { _id: new ObjectId(orderId), status: "pending" }, // شرط القفل', note: 'مطابقة المعرف والحالة المبدئية' },
      { line: '    {', note: 'مشغلات التحديث الذرية' },
      { line: '      $set: { status: "paid", paymentRef, paidAt: new Date() },', note: 'تعديل الحقول الموضعية' },
      { line: '      $inc: { version: 1 } // التحديث التفاؤلي', note: 'زيادة رقم الإصدار ذرياً' },
      { line: '    },', note: 'نهاية المشغلات' },
      { line: '    { returnDocument: "after" } // إرجاع المستند بعد التعديل', note: 'استرجاع الحالة النهائية' },
      { line: '  );', note: 'نهاية الاستعلام' },
      { line: '  return result;', note: 'إرجاع الناتج' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع مسبب لسباق البيانات (Race Condition): قراءة ثم حفظ يدوي
const user = await User.findById(id);
user.balance += 50; // لو حدث تعديل متزامن من عميل آخر، ستفقد إحدى العمليات!
await user.save();`,
    pitfallGood: `// الحل الهندسي: التعديل الذري المباشر على مستوى المحرك
await User.findByIdAndUpdate(id, { $inc: { balance: 50 } }); // عملية ذرية مضمونة بنسبة 100%`,
    pitfallDiagnosis: 'القراءة ثم الكتابة عبر التطبيق تعرض الأرصدة للضياع عند تزامن العمليات، بينما المشغلات الذرية ($inc) تنفذ التعديل في دورة قفل واحدة على الداتابيز.',
    quizPool: [
      {
        q: 'Which MongoDB update operator atomically adds an element to an array ONLY if the element does not already exist?',
        qAr: 'أي مشغل تحديث في MongoDB يضيف عنصراً إلى مصفوفة ذرياً فقط إذا لم يكن موجوداً مسبقاً لمنع التكرار؟',
        options: ['$addToSet', '$push', '$concat', '$append'],
        correct: 0,
        why: '`$addToSet` treats arrays as mathematical sets, appending values only if they are not already present.',
        whyAr: 'المشغل $addToSet يعامل المصفوفة كمجموعة رياضية ويضيف العنصر فقط إذا لم يكن موجوداً مسبقاً.'
      },
      {
        q: 'What is the internal size of a standard MongoDB BSON ObjectId?',
        qAr: 'ما هو الحجم الداخلي لكائن BSON ObjectId القياسي في MongoDB؟',
        options: ['12 bytes (96 bits)', '16 bytes (128 bits)', '32 bytes', '8 bytes'],
        correct: 0,
        why: 'ObjectId is a 12-byte BSON type comprising a 4-byte timestamp, 5-byte random value, and 3-byte incrementing counter.',
        whyAr: 'يتكون الـ ObjectId من 12 بايت: 4 بايت لطابع الوقت و 5 بايت لقيم عشوائية فريدة للجهاز و 3 بايت لعداد تصاعدي.'
      },
      {
        q: 'Why should $inc be preferred over manual incrementing in application memory for balances/counters?',
        qAr: 'لماذا يفضل استخدام مشغل $inc بدلاً من زيادة العدادات يدوياً في ذاكرة التطبيق؟',
        options: [
          'Guarantees atomic modification at the storage engine level, preventing concurrency race conditions and lost updates.',
          'Compresses data in the collection.',
          'Increases RAM speed.',
          'Automatically converts currency.'
        ],
        correct: 0,
        why: '$inc applies directly within WiredTiger locks, ensuring thread-safe increments without read-modify-write race conditions.',
        whyAr: 'يطبق التعديل مباشرة داخل أقفال محرك التخزين مما يمنع سباق العمليات المتزامنة وفقدان التحديثات.'
      },
      {
        q: 'What does the query filter { tags: { $elemMatch: { name: "react", level: { $gte: 2 } } } } ensure?',
        qAr: 'ما الذي يضمنه شرط الاستعلام باستخدام مشغل $elemMatch في المصفوفات؟',
        options: [
          'Ensures both conditions match within the EXACT SAME sub-document inside the tags array.',
          'Matches if one tag has "react" and a completely different tag has level >= 2.',
          'Sorts the tags array alphabetically.',
          'Deletes non-matching tags.'
        ],
        correct: 0,
        why: '$elemMatch guarantees that all criteria are satisfied by a single array element, avoiding cross-element false positives.',
        whyAr: 'يضمن تطابق كافة الشروط معاً داخل نفس المستند الفرعي الواحد في المصفوفة لتجنب النتائج الإيجابية الخاطئة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف يعمل مشغل $ positional operator ومجموعة $[<identifier>] في تعديل عناصر مصفوفات متداخلة بعمق؟',
    interviewA: 'الـ Positional Operator $ يقوم بتعديل أول عنصر في المصفوفة تطابق مع شرط الاستعلام (مثال: "grades.$": 90). أما مشغل $[elem] المتعدد مع خيار arrayFilters فيتيح تعديل جميع العناصر التي تحقق شرطاً محدداً داخل المصفوفات المتداخلة (مثال: db.students.updateMany({}, { $set: { "grades.$[g].passed": true } }, { arrayFilters: [{ "g.score": { $gte: 60 } }] })) في عملية ذرية واحدة فائقة الكفاءة.'
  },
  {
    slug: 'schema-design',
    title: 'MongoDB Schema Design: Embedding vs Referencing & The 16MB Threshold',
    titleAr: 'تصميم مخططات MongoDB: التضمين (Embedding) مقابل الإسناد (Referencing) وحد الـ 16MB',
    level: 1,
    order: 4,
    estMinutes: 35,
    version: 'MongoDB 8.0+',
    pattern: 'Data Modeling & Access Pattern Optimization',
    objectives: [
      'فهم القاعدة الذهبية لتصميم المخططات في NoSQL: التصميم بناءً على أنماط الوصول (Query Access Patterns).',
      'المقارنة المعمارية الشاملة بين التضمين (Embedding: Denormalization) والإسناد (Referencing: Normalization).',
      'تجنب كارثة تخطي حد المستند الأقصى (16MB Document Size Limit) وأنماط المصفوفات غير المحدودة (Unbounded Arrays).',
      'تطبيق أنماط التصميم المؤسسية: Bucket Pattern، Subset Pattern، و Extended Reference Pattern.'
    ],
    problemOpening: `
      أكبر خطأ يرتكبه مهندسو قواعد البيانات العلائقية (SQL) عندما ينتقلون إلى MongoDB هو محاولة تحويل كل جدول إلى Collection منفصلة وربطها بـ References واستخدام <code dir="ltr">$lookup</code> في كل استعلام!
      في المقابل، يقع المطور المبتدئ في الطرف النقيض: يضع كل بيانات النظام (المستخدم، الطلبات، التعليقات، الفواتير، وسجلات الدخول) داخل مستند واحد ضخم (God Document)!
      ماذا يحدث عندما ينمو هذا المستند؟
      1. يصطدم بـ **حد الـ 16MB الأقصى للمستند الواحد في MongoDB (BSON Document Size Limit)** ويفشل النظام في حفظ أي بيانات جديدة!
      2. بطء شديد في الذاكرة (RAM Thrashing): عندما تطلب استعلاماً بسيطاً لجلب اسم المستخدم، سيضطر السيرفر لقراءة الـ 16MB بالكامل من القرص وحشوها في ذاكرة الـ RAM!
      القاعدة الذهبية في MongoDB هي: **"البيانات التي تُقرأ معاً، يجب أن تُخزن معاً (Data that is accessed together, should be stored together)"**.
      في هذا الدرس، هنتعلم القواعد الصارمة للاختيار بين التضمين والإسناد، وهنتعلم أنماط التصميم المتقدمة مثل **Subset Pattern** و **Bucket Pattern**.
    `,
    mechanics: [
      { step: '01', title: 'مبدأ نمط الوصول (Access Pattern Driven Design)', desc: 'تصميم المخطط لخدمة واجهات المستخدم والـ Queries الأكثر تكراراً لتقليل عدد عمليات قراءة القرص I/O.' },
      { step: '02', title: 'متى نستخدم التضمين (Embedding Pattern)', desc: 'عندما تكون العلاقة 1-to-1 أو 1-to-Few (مثل عناوين الشحن)، والبيانات محددة الحجم وتُقرأ دائماً مع المستند الأب.' },
      { step: '03', title: 'متى نستخدم الإسناد (Referencing Pattern)', desc: 'عندما تكون العلاقة 1-to-Many ضخمة أو 1-to-Squillions (مثل سجلات الـ Logs أو تعليقات المشاهير) لتفادي انفجار الـ 16MB.' },
      { step: '04', title: 'نمط المجموعة الفرعية (Subset Pattern)', desc: 'تضمين آخر 10 تعليقات فقط في مستند المقال للعرض السريع في الصفحة الأولى، ونقل باقي آلاف التعليقات لـ Collection منفصلة.' },
      { step: '05', title: 'نمط الدلاء (Bucket Pattern) لبيانات الحساسات', desc: 'تجميع آلاف القراءات المتتالية في مستند واحد لكل ساعة لمنع تضخم عدد المستندات في الداتابيز.' }
    ],
    playgroundCode: `// محاكي نمط Subset Pattern لمقالات ذات آلاف التعليقات
const articleDocument = {
  _id: "art_101",
  title: "Mastering MongoDB 8 Architecture",
  author: "Amr Zidan",
  totalComments: 1420,
  // تضمين أحدث 3 تعليقات فقط للتحميل الفوري للواجهة (Subset Pattern)
  recentComments: [
    { user: "Sarah", text: "Brilliant explanation!", date: "2026-08-31" },
    { user: "Karim", text: "Very clear architecture tips", date: "2026-08-30" },
    { user: "Omar", text: "Saved my production database", date: "2026-08-30" }
  ]
};

console.log("Fast Article Payload Size (KB):", (JSON.stringify(articleDocument).length / 1024).toFixed(2));
console.log("Remaining 1417 comments are fetched on-demand from 'comments' collection via pagination.");`,
    experimentQuestion: 'لماذا يعتبر تخزين مصفوفة سجلات الزيارات (Activity Logs) داخل مستند المستخدم مباشرة كـ Array نمطاً كارثياً (Anti-Pattern)؟',
    experimentAnswer: 'هذا ما يعرف بـ Unbounded Array Anti-Pattern. مع مرور الوقت واستمرار نشاط المستخدم، ستنمو المصفوفة لتصل لملايين العناصر حتى تصطدم بالحد الأقصى للمستند (16MB). عند الوصول للحد، ستفشل أي عمليات تعديل جديدة، كما أن محرك WiredTiger سيضطر لإعادة تخصيص مساحة المستند على القرص (Document Relocation) باستمرار مما يدمر أداء الخادم بالكامل.',
    codeAnatomy: [
      { line: '// Mongoose Schema using Subset Pattern', note: 'مخطط هجين يجمع بين السرعة وحماية الذاكرة' },
      { line: 'const postSchema = new Schema({', note: 'تعريف نموذج المنشور' },
      { line: '  title: { type: String, required: true },', note: 'عنوان المقال' },
      { line: '  author: { id: ObjectId, name: String }, // Extended Reference', note: 'تضمين الاسم لمنع الـ Joins' },
      { line: '  commentCount: { type: Number, default: 0 },', note: 'عداد التعليقات الإجمالي' },
      { line: '  recentComments: [{', note: 'تضمين أحدث 5 تعليقات فقط' },
      { line: '    authorName: String, text: String, createdAt: Date', note: 'حقول التعليق الفرعي' },
      { line: '  }]', note: 'نهاية المصفوفة المحدودة' },
      { line: '});', note: 'نهاية المخطط' }
    ],
    pitfallBad: `// خطأ كارثي: مصفوفة تعليقات غير محدودة داخل مستند المقال
const postSchema = new Schema({
  title: String,
  comments: [commentSchema] // لو حصل المقال على 100,000 تعليق سينهار بـ 16MB Document Limit!
});`,
    pitfallGood: `// الحل المعماري: فصل التعليقات في Collection مستقلة مع الإسناد
const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", index: true },
  text: String,
  author: String
});`,
    pitfallDiagnosis: 'المصفوفات غير المحدودة تسبب نمو المستند حتى تجاوز سقف 16MB، والحل هو نقل العناصر الكثيرة لـ Collection مستقلة مع فهرسة الـ Foreign Key.',
    quizPool: [
      {
        q: 'What is the absolute maximum BSON document size limit in MongoDB?',
        qAr: 'ما هو الحد الأقصى المطلق لحجم مستند BSON الفردي في MongoDB؟',
        options: ['16 Megabytes (16 MB)', '64 Megabytes', '4 Gigabytes', 'Unlimited'],
        correct: 0,
        why: 'MongoDB enforces a 16MB document size limit to prevent runaway memory usage and ensure optimal network/disk performance.',
        whyAr: 'تفرض MongoDB حداً صارماً بـ 16 ميجابايت لمنع استهلاك الذاكرة المفرط وضمان أداء متوازن للشبكة والقرص.'
      },
      {
        q: 'When is Embedding (Denormalization) preferred over Referencing in MongoDB schema design?',
        qAr: 'متى يفضل التضمين (Embedding) على الإسناد (Referencing) في تصميم المخططات؟',
        options: [
          'When data represents 1-to-1 or bounded 1-to-Few relationships and is consistently retrieved together in application queries.',
          'When data is written by millions of IoT sensors every second.',
          'When documents exceed 16MB.',
          'When data is never queried.'
        ],
        correct: 0,
        why: 'Embedding eliminates expensive JOINs and provides atomic single-document reads/writes for tightly-coupled bounded data.',
        whyAr: 'التضمين يلغي الحاجة لعمليات الـ JOIN المكلفة ويوفر قراءة وكتابة ذرية سريعة للبيانات المرتبطة ذات الحجم المحدود.'
      },
      {
        q: 'What is the primary objective of the Subset Pattern in MongoDB?',
        qAr: 'ما هو الهدف المعماري الأساسي لنمط المجموعة الفرعية (Subset Pattern)؟',
        options: [
          'Embeds only the most frequently accessed subset of related data (e.g. 5 most recent reviews) while offloading the rest to a separate collection.',
          'Splits large strings into characters.',
          'Deletes old database records automatically.',
          'Compresses images inside BSON.'
        ],
        correct: 0,
        why: 'Subset pattern keeps the primary document compact for the 95% read use-case while preserving access to full historical collections.',
        whyAr: 'يحافظ على صغر حجم المستند الرئيسي لخدمة 95% من استعلامات التصفح السريعة وينقل باقي البيانات التاريخية لمجموعة مستقلة.'
      },
      {
        q: 'What problem does the Extended Reference Pattern solve?',
        qAr: 'ما هي المشكلة التي يعالجها نمط الإسناد الممتد (Extended Reference Pattern)؟',
        options: [
          'Duplicates a few frequently needed fields (e.g. customerName) inside the order document to eliminate $lookup joins on every view.',
          'Increases document limit from 16MB to 32MB.',
          'Encrypts foreign keys.',
          'Allows multi-region replication.'
        ],
        correct: 0,
        why: 'Extended Reference embeds critical summary fields alongside the reference ID, avoiding joins for common summary displays.',
        whyAr: 'يضمن تكرار بعض الحقول الحيوية الشائعة (مثل اسم العميل) بجانب معرّف الإسناد لتجنب الـ Joins في شاشات العرض السريعة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم مخطط بيانات لتطبيق تواصل اجتماعي ضخم يملك فيه بعض المشاهير 50 مليون متابع (Celebrity Problem) لمنع اختناق الـ Fan-out on Write؟',
    interviewA: 'نطبق معمارية هجينة (Hybrid Fan-out Architecture): 1. للمستخدمين العاديين (< 20,000 متابع): نستخدم Fan-out on Write (Push Model): عندما ينشر المستخدم منشوراً، يكتب النظام الـ Post ID في صناديق تغذية جميع متابعيه (Inbox Feed). 2. للمشاهير (> 20,000 متابع): نستخدم Fan-out on Read (Pull Model): لا نكتب في 50 مليون صندوق، بل نخزن المنشور في جدول المشاهير، وعندما يفتح المتابع تطبيقه، يقوم الخادم بدمج تغذيته العادية مع أحدث منشورات المشاهير الذين يتابعهم لحظياً، مما يمنع تجمد الخوادم عند نشر المشاهير.'
  },
  {
    slug: 'indexing-strategies',
    title: 'Indexing Architecture: Compound Indexes, ESR Rule, Partial & TTL Indexes',
    titleAr: 'معمارية الفهارس: الفهارس المركبة (Compound)، قاعدة ESR الذهبية وفهارس TTL',
    level: 2,
    order: 6,
    estMinutes: 35,
    version: 'MongoDB 8.0+',
    pattern: 'Index Optimization & ESR Rule',
    objectives: [
      'فهم البنية الشجرية للفهارس (B-Tree Data Structure) في محرك WiredTiger والفرق بين COLLSCAN و IXSCAN.',
      'إتقان تطبيق قاعدة ESR الذهبية (Equality, Sort, Range) لبناء فهارس مركبة تحقق أعلى كفاءة.',
      'تطبيق الفهارس الجزئية (Partial Indexes) والفهارس النادرة (Sparse Indexes) لتوفير حجم الذاكرة.',
      'بناء فهارس الحذف التلقائي (TTL Indexes) لإزالة الجلسات والسجلات المؤقتة بعد انقضاء وقت محدد.'
    ],
    problemOpening: `
      لو كان لديك جدول يحتوي على 5 ملايين مستخدم، ونفذت استعلاماً بدون فهرس مناسب:
      <code dir="ltr">db.users.find({ status: "active", age: { $gte: 21 } }).sort({ createdAt: -1 })</code>
      سيقوم محرك MongoDB بفحص جدول كامل (Collection Scan - COLLSCAN): سيقرأ الـ 5 ملايين مستند بالكامل من القرص الصلب إلى الـ RAM، وسيحاول فرزها في الذاكرة (In-Memory Sort)، فإذا تجاوز حجم الفرز سقف 32MB، سينهار الاستعلام فوراً بخطأ:
      <pre dir="ltr"><code>Executor error during sort: Sort memory limit exceeded.</code></pre>
      الحل المعماري هو بناء الفهارس المركبة (Compound Indexes) وفق **قاعدة ESR الذهبية (Equality, Sort, Range)**.
      الفهرس هو شجرة B-Tree مرتبة في الذاكرة تسمح للمحرك بالقفز مباشرة إلى النتائج المطابقة في 1ms وبدون أي مسح للمستندات غير المطلوبة.
      في هذا الدرس، هنفكك مخططات التنفيذ بـ <code dir="ltr">explain("executionStats")</code>، وهنتعلم إزاي نبني **Partial Indexes** و **TTL Indexes**.
    `,
    mechanics: [
      { step: '01', title: 'تشريح خطة التنفيذ بـ explain("executionStats")', desc: 'مقارنة totalDocsExamined مع nReturned؛ الفهرس المثالي يفحص عدداً مساوياً تماماً للنتائج المسترجعة.' },
      { step: '02', title: 'قاعدة ESR الذهبية للفهارس المركبة', desc: 'ترتيب حقول الفهرس الصارم: أولاً حقول التطابق التام (Equality)، ثانياً حقول الترتيب (Sort)، وأخيراً حقول النطاق والمقارنات (Range).' },
      { step: '03', title: 'الفهارس المغطاة (Covered Queries)', desc: 'عندما تكون جميع الحقول المطلوبة في الـ Projection موجودة في الفهرس، يُرجع MongoDB النتيجة من RAM الفهرس دون لمس القرص نهائياً.' },
      { step: '04', title: 'الفهارس الجزئية (Partial Indexes)', desc: 'فهرسة المستندات التي تحقق شرطاً معيناً فقط { partialFilterExpression: { status: "active" } } لتوفير مساحة الـ RAM.' },
      { step: '05', title: 'فهارس الحذف التلقائي بـ TTL (Time-To-Live)', desc: 'تعيين { expireAfterSeconds: 3600 } على حقل تاريخي ليقوم المحرك بحذف السجلات المنتهية تلقائياً في الخلفية.' }
    ],
    playgroundCode: `// محاكي تطبيق قاعدة ESR الذهبية في الفهارس
// استعلام: البحث عن منتجات نشطة (Equality)، مرتبة بالأحدث (Sort)، بسعر بين 100 و 500 (Range)
const queryPattern = {
  equality: ["status"],    // E: status === "active"
  sort: ["createdAt"],      // S: sort({ createdAt: -1 })
  range: ["price"]          // R: price: { $gte: 100, $lte: 500 }
};

function buildOptimalIndex(esr) {
  const compoundIndex = {};
  // 1. Equality first
  esr.equality.forEach(field => compoundIndex[field] = 1);
  // 2. Sort second
  esr.sort.forEach(field => compoundIndex[field] = -1);
  // 3. Range last
  esr.range.forEach(field => compoundIndex[field] = 1);
  return compoundIndex;
}

const optimalIndex = buildOptimalIndex(queryPattern);
console.log("Calculated Optimal Compound Index (ESR Compliant):", optimalIndex);
// الناتج: { status: 1, createdAt: -1, price: 1 }`,
    experimentQuestion: 'ماذا يحدث إذا عكست ترتيب قاعدة ESR ووضعت حقل الـ Range قبل حقل الـ Sort في الفهرس المركب؟',
    experimentAnswer: 'إذا وضعت حقل الـ Range أولاً { price: 1, createdAt: -1 }، فبمجرد أن يقوم محرك قاعدة البيانات بمسح نطاق الأسعار، ستكون التواريخ داخل كل نطاق غير مرتبة بالنسبة للمحرك! النتيجة: سيفشل الفهرس في تغطية الترتيب، وسيضطر MongoDB لتحميل المستندات في ذاكرة الـ RAM والقيام بعملية فرز في الذاكرة (In-Memory Sort / Blocking Sort) مما يبطئ الاستعلام بمئات المرات.',
    codeAnatomy: [
      { line: '// إنشاء فهرس مركب متوافق مع قاعدة ESR', note: 'تطبيق قاعدة Equality -> Sort -> Range' },
      { line: 'await db.collection("orders").createIndex(', note: 'أمر إنشاء الفهرس' },
      { line: '  { customerId: 1, createdAt: -1, totalAmount: 1 }, // E -> S -> R', note: 'ترتيب الحقول الهندسي' },
      { line: '  { name: "idx_orders_esr_lookup" }', note: 'تسمية الفهرس' },
      { line: ');', note: 'نهاية الفهرس المركب' },
      { line: '// إنشاء فهرس TTL لحذف الجلسات المؤقتة بعد 24 ساعة', note: 'حذف تلقائي' },
      { line: 'await db.collection("sessions").createIndex(', note: 'فهرس الجلسات' },
      { line: '  { lastActivity: 1 },', note: 'حقل التاريخ' },
      { line: '  { expireAfterSeconds: 86400 } // 24 ساعة', note: 'مدة البقاء' },
      { line: ');', note: 'نهاية فهرس TTL' }
    ],
    pitfallBad: `// خطأ شائع: إنشاء فهارس فردية لكل حقل على حدة
db.orders.createIndex({ customerId: 1 });
db.orders.createIndex({ createdAt: -1 });
db.orders.createIndex({ totalAmount: 1 });
// يستهلك RAM مضاعفة ولا يغطي الاستعلامات المركبة بكفاءة!`,
    pitfallGood: `// الحل الهندسي: فهرس مركب واحد ذكي يخدم الاستعلام الكامل
db.orders.createIndex({ customerId: 1, createdAt: -1, totalAmount: 1 });`,
    pitfallDiagnosis: 'الفهارس الفردية لا توفر حلاً للاستعلامات التي تجمع بين التصفية والترتيب، بينما الفهرس المركب يخدم الاستعلام في مسح شجري واحد.',
    quizPool: [
      {
        q: 'What is the correct sequence of field types when designing Compound Indexes under the ESR Rule?',
        qAr: 'ما هو الترتيب الصارم لأنواع الحقول عند تصميم الفهارس المركبة وفق قاعدة ESR؟',
        options: [
          '1. Equality fields, 2. Sort fields, 3. Range fields (E -> S -> R).',
          '1. Range, 2. Sort, 3. Equality.',
          '1. Sort, 2. Range, 3. Equality.',
          'Alphabetical order only.'
        ],
        correct: 0,
        why: 'ESR (Equality, Sort, Range) ensures the index filters by exact matches, avoids in-memory sorts, and applies range boundaries last.',
        whyAr: 'قاعدة ESR تضمن تصفية التطابق التام أولاً، وتفادي الفرز في الذاكرة ثانياً، وتطبيق حدود النطاقات أخيراً.'
      },
      {
        q: 'What does a "Covered Query" mean in MongoDB performance tuning?',
        qAr: 'ماذا يعني "الاستعلام المغطى" (Covered Query) في تحسين أداء MongoDB؟',
        options: [
          'All queried fields and projected output fields are contained directly within the index, fulfilling the query with zero document reads from disk.',
          'The query is encrypted with SSL.',
          'The query runs on all replica sets.',
          'The query is backed up daily.'
        ],
        correct: 0,
        why: 'Covered queries are served 100% from RAM index nodes without touching underlying storage documents, delivering max speed.',
        whyAr: 'يعني أن جميع الحقول المطلوبة موجودة مباشرة في الفهرس بالـ RAM ويتم الرد دون قراءة أي مستند من القرص الصلب.'
      },
      {
        q: 'What is the primary advantage of a Partial Index over a standard index?',
        qAr: 'ما هي الميزة الأساسية للفهرس الجزئي (Partial Index) مقارنة بالفهرس العادي؟',
        options: [
          'Indexes only documents matching a specific filter expression (e.g. only active users), drastically saving RAM and write overhead.',
          'It indexes only half of the string characters.',
          'It works without MongoDB being installed.',
          'It updates once per week.'
        ],
        correct: 0,
        why: 'Partial indexes only index matching subsets, minimizing storage footprint and speeding up document write operations.',
        whyAr: 'يفهرس فقط المستندات التي تحقق شرطاً معيناً مما يوفر مساحة الذاكرة ويسرع عمليات الكتابة على الجدول.'
      },
      {
        q: 'How does a TTL (Time-To-Live) Index remove expired documents in MongoDB?',
        qAr: 'كيف يقوم فهرس TTL بحذف المستندات منتهية الصلاحية في MongoDB؟',
        options: [
          'A background thread runs periodically (every 60 seconds) removing documents where the indexed date exceeds expireAfterSeconds.',
          'Deletes documents immediately at the microsecond of expiration.',
          'Sends an email to the administrator.',
          'Moves documents to a trash folder.'
        ],
        correct: 0,
        why: 'A dedicated background TTL monitor thread scans TTL indexes roughly once per minute to purge expired documents asynchronously.',
        whyAr: 'خيط معالجة في الخلفية يفحص الفهرس كل 60 ثانية ويحذف المستندات التي تجاوز تاريخها المدة المحددة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تكشف الفهارس غير المستخدمة (Unused Indexes) في خادم إنتاجي وتتخذ قرار حذفها بأمان؟',
    interviewA: 'نستخدم استعلام $indexStats في الـ Aggregation Pipeline: db.collection.aggregate([{ $indexStats: {} }]). هذا الاستعلام يُرجع إحصائيات دقيقة لعدد مرات استخدام كل فهرس (accesses.ops) وتاريخ آخر استخدام (accesses.since). إذا كان الفهرس يملك ops: 0 لفترة طويلة (مثلاً 30 يوماً)، نقوم أولاً بإخفاء الفهرس بـ db.collection.hideIndex("idx_name") لمراقبة هل ستتأثر أي استعلامات في الإنتاج، وبعد التأكد من عدم تأثر الأداء، نقوم بحذفه نهائياً بـ dropIndex لتوفير مساحة الـ RAM وتسريع عمليات الـ Insert والـ Update.'
  },
  {
    slug: 'aggregation-pipeline',
    title: 'Aggregation Pipeline Mastery: $match, $group, $lookup, $facet & Window Fields',
    titleAr: 'إتقان خط أنابيب التجميع (Aggregation Pipeline): المعالجة، الدمج ($lookup)، والتحليلات بـ $facet',
    level: 2,
    order: 8,
    estMinutes: 35,
    version: 'MongoDB 8.0 Aggregation',
    pattern: 'Multi-Stage Analytics & Pipeline Processing',
    objectives: [
      'فهم معمارية خط أنابيب التجميع (Aggregation Pipeline) كمسار تدفق يعالج البيانات عبر مراحل تسلسلية (Stages).',
      'إتقان المراحل الجوهرية: $match، $project، $group، $unwind، و $sort.',
      'تنفيذ عمليات الدمج المتقدمة (Left Outer Joins) عبر $lookup مع خطوط أنابيب فرعية متداخلة (Pipeline Lookups).',
      'بناء شاشات التحليلات المتعددة ولوحات التحكم في استعلام واحد متوازي باستخدام مرحلة $facet.'
    ],
    problemOpening: `
      استعلامات <code dir="ltr">find()</code> البسيطة ممتازة لجلب مستند فردي، ولكن ماذا عندما يطلب منك مدير المنتج:
      - "لوحة تحكم تحسب إجمالي مبيعات كل فئة منتجات للشهر الحالي، مع متوسط تقييم العملاء، وأعلى 5 منتجات مبيعاً، وتوزيع المبيعات حسب الدول، كل ذلك في رد واحد فائق السرعة"؟
      المبرمج المبتدئ يقوم بجلب 50,000 مستند إلى خادم Node.js، ويكتب حلقات <code dir="ltr">for</code> و <code dir="ltr">reduce</code> في جافاسكريبت لحساب الأرقام، مما يستهلك كل الـ RAM على السيرفر ويستغرق 8 ثوانٍ!
      الحل المعماري الاحترافي هو **خط أنابيب التجميع في MongoDB (Aggregation Pipeline)**.
      الـ Aggregation Pipeline هو محرك معالجة وتحليل بيانات فائق السرعة يعمل مباشرة داخل الـ Database C++ Engine:
      تمر البيانات عبر مراحل (Stages) متتابعة؛ كل مرحلة تستقبل المخرجات من المرحلة السابقة، وتجري عليها تحويلاً وتصفية وحسابات رياضية، وتمرر النتيجة للمرحلة التالية.
      في هذا الدرس، هنتعلم إزاي نبني استعلامات تجميعية معقدة، إزاي نستخدم <code dir="ltr">$lookup</code> بدون إبطاء السيرفر، وإزاي نستخدم **$facet** لتنفيذ عدة تحليلات بالتوازي.
    `,
    mechanics: [
      { step: '01', title: 'مبدأ التصفية المبكرة (Early $match Optimization)', desc: 'وضع مرحلة $match في أول الخط للاستفادة من الفهارس (Index Scan) وتقليص حجم المستندات الممررة لباقي المراحل.' },
      { step: '02', title: 'التجميع وحساب المؤشرات بـ $group', desc: 'تجميع البيانات حسب مفتاح معين _id وحساب المجاميع ($sum) والمتوسطات ($avg) والحدود القصوى ($max).' },
      { step: '03', title: 'تفكيك المصفوفات بـ $unwind', desc: 'تفكيك مصفوفة داخلية وتحويل كل عنصر في المصفوفة إلى مستند مستقل لإجراء التجميعات والفرز على مستوى العناصر.' },
      { step: '04', title: 'الدمج المتقدم عبر $lookup مع خط أنابيب فرعي', desc: 'ربط المستندات بـ Collection أخرى مع تطبيق تصفية وشروط مسبقة داخل الـ Lookup Pipeline لتقليل البيانات المدمجة.' },
      { step: '05', title: 'التحليلات المتوازية المتعددة بـ $facet', desc: 'تنفيذ عدة خطوط أنابيب مختلفة بالتوازي داخل نفس الاستعلام لإنتاج تقارير المبيعات والتوزيع والإحصائيات دفعة واحدة.' }
    ],
    playgroundCode: `// محاكي خط أنابيب التجميع (Aggregation Pipeline)
const salesData = [
  { item: "Laptop", category: "Tech", price: 1200, qty: 2 },
  { item: "Phone", category: "Tech", price: 800, qty: 5 },
  { item: "Desk", category: "Furniture", price: 300, qty: 4 },
  { item: "Chair", category: "Furniture", price: 150, qty: 10 }
];

// محاكاة: $match -> $project -> $group
const result = salesData
  .filter(s => s.price >= 200) // 1. $match (price >= 200)
  .map(s => ({ ...s, totalSale: s.price * s.qty })) // 2. $project (computed field)
  .reduce((acc, curr) => { // 3. $group by category
    if (!acc[curr.category]) acc[curr.category] = { totalRevenue: 0, itemsSold: 0 };
    acc[curr.category].totalRevenue += curr.totalSale;
    acc[curr.category].itemsSold += curr.qty;
    return acc;
  }, {});

console.log("Simulated Aggregation Output:", result);`,
    experimentQuestion: 'لماذا يعتبر وضع مرحلة $project قبل مرحلة $match نمطاً سيئاً يمنع محرك MongoDB من استخدام الفهارس؟',
    experimentAnswer: 'إذا وضعت $project أولاً، فإن المحرك يقوم بإعادة تشكيل المستندات في الذاكرة قبل تصفيتها، مما يلغي قدرة المحرك على استخدام الفهارس الشجرية الموجودة على الحقول الأصلية (Index Scan) ويجبره على إجراء مسح شامل للجدول (COLLSCAN). القاعدة الذهبية هي وضع $match دائماً في البداية للاستفادة القصوى من الفهارس.',
    codeAnatomy: [
      { line: 'const stats = await db.collection("orders").aggregate([', note: 'بدء خط أنابيب التجميع' },
      { line: '  { $match: { status: "completed", createdAt: { $gte: startOfMonth } } }, // 1. تصفية مبكرة بالفهرس', note: 'استخدام الفهرس لتقليص البيانات' },
      { line: '  { $group: {', note: '2. مرحلة التجميع' },
      { line: '      _id: "$category", // التجميع حسب الفئة', note: 'مفتاح التجميع' },
      { line: '      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },', note: 'حساب إجمالي الأرباح' },
      { line: '      averageOrderValue: { $avg: "$price" },', note: 'حساب متوسط السعر' },
      { line: '      totalOrders: { $sum: 1 }', note: 'حساب عدد الطلبات' },
      { line: '  } },', note: 'نهاية التجميع' },
      { line: '  { $sort: { totalRevenue: -1 } } // 3. الفرز حسب الأكثر ربحاً', note: 'فرز النتائج النهائية' },
      { line: ']).toArray();', note: 'تنفيذ واستخراج النتائج' }
    ],
    pitfallBad: `// خطأ شائع مسبب لبطء شديد: استخدام $lookup لجلب كل سجلات جدول ضخم بدون $match مسبق
[{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }]
// يدمج ملايين الطلبات في الذاكرة ويجمد الخادم!`,
    pitfallGood: `// الحل الهندسي: تصفية المستخدمين أولاً واستخدام pipeline داخلي في $lookup
[
  { $match: { status: "active" } },
  { $lookup: {
      from: "orders",
      let: { uid: "$_id" },
      pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$uid"] }, status: "pending" } }],
      as: "pendingOrders"
  }}
]`,
    pitfallDiagnosis: 'الـ Lookups غير المفلترة تدمج كميات هائلة من البيانات، بينما استخدام Pipeline الداخلي يحد من البيانات المدمجة في الذاكرة.',
    quizPool: [
      {
        q: 'Why should the $match stage almost always be placed at the very beginning of an Aggregation Pipeline?',
        qAr: 'لماذا يجب وضع مرحلة $match في بداية خط أنابيب التجميع دائماً؟',
        options: [
          'Allows MongoDB to utilize existing indexes to filter documents before loading them into memory, minimizing pipeline workload.',
          'It is required by the MongoDB query parser.',
          'To format the output as JSON.',
          'To prevent duplicate keys.'
        ],
        correct: 0,
        why: 'Placing $match first enables index utilization and reduces the volume of documents passing to subsequent computational stages.',
        whyAr: 'وضع $match في البداية يمكن المحرك من استخدام الفهارس وتقليص حجم البيانات الممررة للمراحل التالية.'
      },
      {
        q: 'What does the $unwind stage do in a MongoDB aggregation pipeline?',
        qAr: 'ما هي وظيفة مرحلة $unwind في خط أنابيب التجميع؟',
        options: [
          'Deconstructs an array field from input documents to output a separate document for each element in the array.',
          'Compresses nested documents.',
          'Reverses array elements order.',
          'Deletes empty arrays.'
        ],
        correct: 0,
        why: '$unwind breaks an array into individual documents per item, allowing grouping and sorting on individual array values.',
        whyAr: 'تفكك عناصر المصفوفة وتنتج مستنداً مستقلاً لكل عنصر لتسهيل التجميع والفرز على مستوى العناصر الفردية.'
      },
      {
        q: 'What capability does the $facet stage provide in MongoDB aggregation?',
        qAr: 'ما هي الميزة الحصرية التي توفرها مرحلة $facet في خط أنابيب التجميع؟',
        options: [
          'Processes multiple parallel aggregation pipelines within a single stage on the same input document set.',
          'Encrypts field values.',
          'Connects to SQL databases.',
          'Creates collection indexes automatically.'
        ],
        correct: 0,
        why: '$facet allows multi-faceted navigation and parallel metric generation (e.g. pagination + total count + categorization) in one query.',
        whyAr: 'تتيح تشغيل عدة خطوط أنابيب فرعية متوازية في نفس الاستعلام لإنتاج تقارير متعددة مثل الترقيم والإحصائيات معاً.'
      },
      {
        q: 'What is the memory limit for an aggregation pipeline stage before requiring { allowDiskUse: true }?',
        qAr: 'ما هو الحد الأقصى لاستهلاك الذاكرة في مرحلة التجميع الواحدة قبل اشتراط تفعيل { allowDiskUse: true }؟',
        options: ['100 Megabytes (100 MB RAM)', '16 MB', '1 GB', 'Unlimited'],
        correct: 0,
        why: 'Pipeline stages have a 100MB RAM limit by default; exceeding it throws an error unless allowDiskUse: true is enabled.',
        whyAr: 'الحد الافتراضي للذاكرة هو 100 ميجابايت للمرحلة؛ وإذا زادت البيانات عنها يجب تفعيل allowDiskUse للكتابة المؤقتة على القرص.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحسب الـ Running Total والـ Moving Average في MongoDB 8 باستخدام مرحلة $setWindowFields الجديدة؟',
    interviewA: 'مرحلة $setWindowFields هي نظير الـ Window Functions (OVER / PARTITION BY) في SQL: نحدد partitionBy: "$accountId"، والترتيب sortBy: { transactionDate: 1 }، ثم نحدد نافذة الحساب output: { runningBalance: { $sum: "$amount", window: { documents: ["unbounded", "current"] } } }. هذا يحسب الرصيد التراكمي المتحرك لكل حساب بنكي بدقة وبسرعة فائقة داخل محرك C++ دون الحاجة لسحب البيانات للباك إند.'
  },
  {
    slug: 'transactions-acid',
    title: 'Multi-Document ACID Transactions, Write Concerns & Read Concerns',
    titleAr: 'المعاملات متعددة المستندات (ACID Transactions): ضمانات الكتابة (Write Concern) والقراءة (Read Concern)',
    level: 3,
    order: 10,
    estMinutes: 35,
    version: 'MongoDB 8.0 Transactions',
    pattern: 'Distributed ACID & Consensus Guarantees',
    objectives: [
      'فهم خصائص الـ ACID الكاملة (Atomicity, Consistency, Isolation, Durability) في MongoDB عبر عدة مستندات ومجموعات.',
      'تطبيق نمط جلسات المعاملات ClientSession مع بروتوكول withTransaction لإعادة المحاولة التلقائية عند أخطاء TransientTransactionError.',
      'فهم مستويات ضمانات الكتابة: w: 1, w: "majority", و j: true (Journaling).',
      'فهم مستويات ضمانات القراءة: local, majority, و linearizable لمنع قراءة البيانات غير المؤكدة (Dirty Reads).'
    ],
    problemOpening: `
      في الأنظمة المالية وتطبيقات التجارة الإلكترونية، هناك عمليات لا تقبل أنصاف الحلول:
      عندما يقوم عميل بتحويل 1000 دولار من حسابه لشراء منتج:
      1. يجب خصم 1000 دولار من جدول <code dir="ltr">wallets</code>.
      2. يجب إضافة 1000 دولار لحساب التاجر.
      3. يجب تقليل كمية المخزون في جدول <code dir="ltr">products</code>.
      4. يجب إنشاء فاتورة جديدة في جدول <code dir="ltr">invoices</code>.
      لو نجحت الخطوة 1 وفشلت الخطوة 3 بسبب انقطاع الشبكة، سيخسر العميل أمواله دون استلام المنتج!
      منذ إصدار MongoDB 4.0 ووصولاً لـ MongoDB 8، تدعم قواعد MongoDB **المعاملات متعددة المستندات (Multi-Document Distributed ACID Transactions)** بالكامل!
      إما أن تنجح جميع العمليات الأربع معاً، أو يتم التراجع عنها بالكامل (Rollback) وكأن شيئاً لم يكن.
      في هذا الدرس، هنتعلم إزاي نبني معاملات بنكية منيعة بـ <code dir="ltr">withTransaction()</code>، ونفهم إعدادات **Write Concern** و **Read Concern** لضمان متانة البيانات.
    `,
    mechanics: [
      { step: '01', title: 'بدء الجلسة الذرية بـ client.startSession()', desc: 'إنشاء جلسة عمل تربط العمليات المتعددة في سياق معاملة واحدة متصلة عبر خوادم الـ Replica Set.' },
      { step: '02', title: 'بروتوكول withTransaction المدمج', desc: 'استخدام withTransaction لإدارة Commit و Abort تلقائياً مع إعادة المحاولة التلقائية عند تعارض العمليات المتزامنة.' },
      { step: '03', title: 'ضمانات الكتابة الموثوقة بـ Write Concern majority', desc: 'اشتراط تأكيد كتابة البيانات على أغلبية خوادم الـ Replica Set قبل إرجاع رسالة النجاح للعميل لمنع فقدان البيانات.' },
      { step: '04', title: 'التسجيل في سجل العمليات بـ Journaling (j: true)', desc: 'ضمان كتابة المعاملة في ملف الـ Journal على القرص الصلب لضمان استرجاعها حتى لو انقطعت الكهرباء عن السيرفر فوراً.' },
      { step: '05', title: 'عزل القراءات بـ Read Concern snapshot', desc: 'قراءة البيانات من لقطة زمنية متناسقة تضمن عدم رؤية تعديلات المعاملات الأخرى غير المكتملة (Dirty Reads).' }
    ],
    playgroundCode: `// محاكي المعاملات البنكية الذرية (ACID Transactions)
class MockBankLedger {
  constructor() {
    this.accounts = new Map([["acc_A", 1000], ["acc_B", 200]]);
  }

  async executeTransfer(fromId, toId, amount) {
    const sessionSnapshot = new Map(this.accounts); // بدء لقطة المعاملة
    console.log(\`1. Transaction Started: Transferring $\${amount} from \${fromId} to \${toId}\`);

    try {
      const fromBal = sessionSnapshot.get(fromId);
      if (fromBal < amount) throw new Error("Insufficient Funds! Rolling back...");

      sessionSnapshot.set(fromId, fromBal - amount);
      sessionSnapshot.set(toId, sessionSnapshot.get(toId) + amount);

      // محاكاة تأكيد المعاملة Commit
      this.accounts = sessionSnapshot;
      console.log("✅ Transaction Committed Atomically!");
      console.log("Final Balances:", Object.fromEntries(this.accounts));
    } catch (err) {
      console.error("🚨 TRANSACTION ABORTED:", err.message);
      console.log("Balances remained untouched:", Object.fromEntries(this.accounts));
    }
  }
}

const bank = new MockBankLedger();
await bank.executeTransfer("acc_A", "acc_B", 300);`,
    experimentQuestion: 'لماذا تتطلب المعاملات متعددة المستندات (Multi-Document Transactions) في MongoDB وجود Replica Set ولا تعمل على خادم Standalone فردي؟',
    experimentAnswer: 'تعتمد المعاملات في MongoDB على سجل العمليات الموزع (Oplog - Operations Log) وإجماع الأغلبية (Consensus Protocol) لتنسيق وتثبيت التعديلات والتحقق من متانة البيانات. خوادم الـ Standalone لا تحتوي على Oplog، ولذلك تتطلب MongoDB تشغيل Replica Set (حتى لو كانت بمجموعة محلية من عقدة واحدة) لتفعيل محرك المعاملات.',
    codeAnatomy: [
      { line: 'import { MongoClient } from "mongodb";', note: 'عميل MongoDB الرسمي' },
      { line: 'export async function transferFunds(client, fromUser, toUser, amount) {', note: 'دالة التحويل البنكي' },
      { line: '  const session = client.startSession();', note: '1. بدء الجلسة' },
      { line: '  try {', note: 'كتلة التنفيذ' },
      { line: '    await session.withTransaction(async () => {', note: '2. بروتوكول المعاملة الذاتية' },
      { line: '      const wallets = client.db("bank").collection("wallets");', note: 'مجموعة المحافظ' },
      { line: '      await wallets.updateOne({ userId: fromUser }, { $inc: { balance: -amount } }, { session });', note: 'خصم المبلغ مع تمرير الجلسة' },
      { line: '      await wallets.updateOne({ userId: toUser }, { $inc: { balance: amount } }, { session });', note: 'إيداع المبلغ مع تمرير الجلسة' },
      { line: '    }, { writeConcern: { w: "majority", j: true } });', note: '3. ضمانات الكتابة الصارمة' },
      { line: '  } finally {', note: 'ضمان التحرير' },
      { line: '    await session.endSession(); // 4. إغلاق الجلسة دائماً', note: 'تحرير الموارد' },
      { line: '  }', note: 'نهاية الدالة' },
      { line: '}', note: 'نهاية الكود' }
    ],
    pitfallBad: `// خطأ شائع: نسيان تمرير كائن { session } في استعلامات المعاملة
await wallets.updateOne({ userId: fromUser }, { $inc: { balance: -amount } }); // لن يكون جزءاً من المعاملة وسينفذ فوراً خارجها!`,
    pitfallGood: `// الحل الصحيح: تمرير { session } في كل استعلام داخل المعاملة
await wallets.updateOne({ userId: fromUser }, { $inc: { balance: -amount } }, { session });`,
    pitfallDiagnosis: 'أي استعلام لا يتم تمرير { session } إليه سيعامل كاستعلام مستقل ولن يتم التراجع عنه إذا حدث Rollback للمعاملة.',
    quizPool: [
      {
        q: 'What is the guarantee provided by "Write Concern: { w: \'majority\', j: true }"?',
        qAr: 'ما هو الضمان الذي يوفره خيار Write Concern: { w: "majority", j: true }؟',
        options: [
          'Acknowledges writes only after data is written to disk journal on a majority of replica set nodes, guaranteeing zero data loss on node crashes.',
          'Encrypts the data on disk.',
          'Speeds up write operations by 200%.',
          'Duplicates data across 5 clouds.'
        ],
        correct: 0,
        why: 'w: majority with j: true ensures persistence in the on-disk journal across the replica set quorum before confirming to the client.',
        whyAr: 'يضمن كتابة البيانات في ملف الـ Journal على القرص الصلب لدى أغلبية خوادم المجموعة قبل إرجاع التأكيد للعميل لمنع فقدان البيانات.'
      },
      {
        q: 'Why should session.withTransaction() be preferred over manual session.startTransaction() / commitTransaction()?',
        qAr: 'لماذا يفضل استخدام session.withTransaction() على التحكم اليدوي بـ start/commit؟',
        options: [
          'Automatically handles transient network errors and write conflicts by retrying the entire transaction block seamlessly.',
          'It runs in a separate thread.',
          'It bypasses database passwords.',
          'It works on standalone instances.'
        ],
        correct: 0,
        why: 'withTransaction incorporates built-in retry logic for TransientTransactionError and UnknownTransactionCommitResult.',
        whyAr: 'تتضمن آلية مدمجة ذكية لإعادة المحاولة تلقائياً عند حدوث أخطاء الشبكة العابرة أو تعارض عمليات الكتابة المتزامنة.'
      },
      {
        q: 'What is the default isolation level of MongoDB multi-document transactions?',
        qAr: 'ما هو مستوى العزل الافتراضي للمعاملات متعددة المستندات في MongoDB؟',
        options: [
          'Snapshot Isolation (Read Concern "snapshot"), guaranteeing a consistent point-in-time view of data.',
          'Read Uncommitted.',
          'Read Committed without MVCC.',
          'None.'
        ],
        correct: 0,
        why: 'MongoDB transactions execute under Snapshot Isolation, ensuring transactions see a consistent snapshot across all operations.',
        whyAr: 'تعمل المعاملات تحت عزل Snapshot Isolation لضمان رؤية لقطة زمنية متناسقة وموحدة للبيانات عبر كل العمليات.'
      },
      {
        q: 'Why must session.endSession() always be invoked inside a finally block?',
        qAr: 'لماذا يجب دائماً استدعاء session.endSession() داخل كتلة finally؟',
        options: [
          'Releases server session resources and database locks, preventing memory leaks and orphaned transaction locks.',
          'Deletes the collection.',
          'Restarts the database.',
          'Clears browser cookies.'
        ],
        correct: 0,
        why: 'Failing to end sessions leaves open locks and allocations on MongoDB mongod servers, leading to resource exhaustion.',
        whyAr: 'عدم إنهاء الجلسة يترك الأقفال والموارد معلقة في ذاكرة خوادم قاعدة البيانات مما يتسبب في اختناق النظام.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق المعماري بين نمطين: 1. الاعتماد على Multi-document Transactions في كل عملية، 2. تصميم المخطط بنمط Single Document Atomicity، ولماذا تفضل المنظومات فائقة السرعة النمط الثاني؟',
    interviewA: 'في MongoDB، أي تعديل على مستند واحد هو عملية ACID ذرية بطبيعتها (Single-Document Atomicity) بدون أي تكلفة إضافية (0% Overhead). المعاملات متعددة المستندات (Multi-Document Transactions) تتطلب قفل سجلات متعددة وتنسيق عبر عقد الـ Replica Set، مما يضيف زمناً وتكلفة معالجة (Latency Overhead). لذلك، في المنظومات عالية الأحمال (High-throughput systems)، نقوم بتصميم المخططات بذكاء عبر التضمين (Embedding) لتكون 90% من العمليات الحيوية داخل مستند واحد ذري، ونحصر استخدام Multi-document Transactions فقط في العمليات المالية البنكية المعقدة التي تشمل جداول مستقلة.'
  },
  {
    slug: 'mongoose-middleware',
    title: 'Mongoose Middleware: Document, Query, Aggregate Hooks & Virtual Population',
    titleAr: 'برمجيات Mongoose الوسيطة (Hooks): خطافات المستندات والاستعلامات والتعبئة الافتراضية (Virtuals)',
    level: 2,
    order: 11,
    estMinutes: 30,
    version: 'Mongoose v8.x',
    pattern: 'ORM Lifecycle Hooks & Virtual Fields',
    objectives: [
      'فهم الفرق الجوهري بين خطافات المستندات (Document Middleware: this = doc) وخطافات الاستعلام (Query Middleware: this = query).',
      'تطبيق خطافات pre("save") لتشفير كلمات المرور تلقائياً فقط عند تعديل الحقل isModified("password").',
      'بناء نمط الحذف الناعم (Soft Delete) باستخدام خطافات pre(/^find/) لتصفية السجلات المحذوفة تلقائياً.',
      'استخدام الحقول الافتراضية (Virtual Population) لربط المجموعات بمرونة دون تخزين مصفوفات معرفات ضخمة.'
    ],
    problemOpening: `
      مكتبة **Mongoose** هي الـ ODM (Object Document Mapper) الأكثر شعبية في عالم Node.js.
      واحدة من أقوى ميزات Mongoose هي **البرمجيات الوسيطة (Middleware Hooks)** التي تتيح لك اعتراض دورة حياة البيانات قبل أو بعد حفظها، تعديلها، أو حذفها.
      لكن المطورين يقعون في فخاخ شهيرة تدمر البيانات:
      - مطور يكتب <code dir="ltr">schema.pre('save')</code> لتشفير كلمة المرور بـ Bcrypt، وعندما يقوم المستخدم بتعديل اسمه فقط، يُعاد تشفير كلمة المرور المشفرة بالفعل فتتلف ويصبح المستخدم عاجزاً عن تسجيل الدخول للأبد!
      - مطور آخر يستخدم <code dir="ltr">User.findByIdAndUpdate()</code> ويفاجأ بأن خطاف <code dir="ltr">pre('save')</code> لم يعمل نهائياً ولم يتم تشفير كلمة المرور!
      السبب هو عدم فهم الفرق الجوهري بين **Document Middleware** (التي تعمل على مستندات تم تحميلها بـ <code dir="ltr">.save()</code>) و **Query Middleware** (التي تعمل مباشرة على استعلامات قاعدة البيانات مثل <code dir="ltr">findOneAndUpdate</code>).
      في هذا الدرس، هنفكك دورة حياة Mongoose بالكامل، وهنتعلم إزاي نبني نظام **Soft Delete** و **Virtual Population**.
    `,
    mechanics: [
      { step: '01', title: 'خطافات المستندات (Document Middleware)', desc: 'تعمل عند استدعاء doc.save() أو doc.validate()؛ ويكون متغير this يشير إلى كائن المستند الفعلي في الذاكرة.' },
      { step: '02', title: 'فحص التعديلات بـ doc.isModified("field")', desc: 'التحقق مما إذا كان حقل معين (مثل password) قد تم تغييره فعلياً قبل تشغيل العمليات المكلفة مثل التشفير.' },
      { step: '03', title: 'خطافات الاستعلامات (Query Middleware)', desc: 'تعمل عند استدعاء find() أو updateOne()؛ ويكون متغير this يشير إلى كائن الاستعلام Query وليس المستند.' },
      { step: '04', title: 'تطبيق الحذف الناعم (Soft Delete Pattern)', desc: 'اعتراض جميع استعلامات البحث بـ pre(/^find/) وإضافة شرط { isDeleted: { $ne: true } } تلقائياً دون كتابته في كل مسار.' },
      { step: '05', title: 'التعبئة الافتراضية بـ Virtual Population', desc: 'إنشاء علاقات وهمية schema.virtual("posts") تتيح استخدام populate("posts") دون تخزين مصفوفة معرفات في قاعدة البيانات.' }
    ],
    playgroundCode: `// محاكي خطافات Mongoose وفحص isModified
class MockMongooseDoc {
  constructor(data) {
    this.data = { ...data };
    this.modifiedFields = new Set();
  }

  set(field, val) {
    this.data[field] = val;
    this.modifiedFields.add(field);
  }

  isModified(field) { return this.modifiedFields.has(field); }

  async save() {
    // محاكاة خطاف pre('save')
    if (this.isModified("password")) {
      console.log("🔐 Password modified: Hashing new password with Scrypt/Argon2...");
      this.data.password = "HASHED_" + this.data.password;
    } else {
      console.log("⚡ Password unchanged: Skipping hashing hook (Safe).");
    }
    this.modifiedFields.clear();
    return this.data;
  }
}

const user = new MockMongooseDoc({ name: "Amr", password: "InitialPassword123" });
user.set("name", "Amr Zidan"); // تعديل الاسم فقط
await user.save(); // لم يتم إعادة تشفير الباسورد!`,
    experimentQuestion: 'لماذا لا يتم تشغيل خطاف schema.pre("save") عند استدعاء User.updateOne({ _id }, { name }) أو User.findByIdAndUpdate()؟',
    experimentAnswer: 'لأن updateOne و findByIdAndUpdate هي عمليات استعلام مباشرة تُرسل من Mongoose إلى محرك MongoDB دون تحميل المستند إلى ذاكرة جافاسكريبت أو إنشاء Document Instance. وبالتالي يتم تشغيل خطافات الاستعلامات Query Hooks مثل schema.pre("findOneAndUpdate") وليس خطافات المستندات pre("save"). لتشغيل pre("save")، يجب جلب المستند بـ findById ثم تعديله واستدعاء doc.save().',
    codeAnatomy: [
      { line: 'userSchema.pre("save", async function (next) {', note: 'خطاف المستند قبل الحفظ' },
      { line: '  if (!this.isModified("password")) return next(); // حماية عدم التكرار', note: 'فحص التعديل الفعلي' },
      { line: '  const salt = await bcrypt.genSalt(12);', note: 'توليد Salt قوي' },
      { line: '  this.password = await bcrypt.hash(this.password, salt);', note: 'تشفير كلمة المرور' },
      { line: '  next();', note: 'تمرير العملية' },
      { line: '});', note: 'نهاية خطاف الحفظ' },
      { line: 'userSchema.pre(/^find/, function () {', note: 'خطاف استعلامات البحث (Regex)' },
      { line: '  this.where({ isDeleted: { $ne: true } }); // تصفية الحذف الناعم تلقائياً', note: 'حجب السجلات المحذوفة' },
      { line: '});', note: 'نهاية خطاف البحث' }
    ],
    pitfallBad: `// خطأ كارثي: تشفير الباسورد في pre('save') بدون فحص isModified
userSchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 10); // يعيد تشفير الـ Hash المشفر عند كل تعديل للملف الشخصي!
});`,
    pitfallGood: `// الحل الصحيح: فحص isModified دائماً
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});`,
    pitfallDiagnosis: 'عدم فحص isModified يؤدي لإعادة تشفير الهاش المشفر مسبقاً وتلف كلمات المرور للمستخدمين.',
    quizPool: [
      {
        q: 'What does "this" refer to inside a Mongoose Document Middleware (e.g. schema.pre("save")) versus a Query Middleware (e.g. schema.pre("find"))?',
        qAr: 'إلى ماذا يشير متغير "this" داخل خطاف المستندات pre("save") مقارنة بخطاف الاستعلامات pre("find")؟',
        options: [
          'In document middleware, "this" refers to the Document instance; in query middleware, "this" refers to the Query object.',
          'In both, "this" refers to the global window object.',
          'In document middleware, "this" refers to the MongoDB server.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'Document hooks bind "this" to the individual document instance; query hooks bind "this" to the ongoing Mongoose Query builder.',
        whyAr: 'في خطافات المستندات يشير this لنسخة المستند في الذاكرة، بينما في خطافات الاستعلام يشير this لكائن استعلام Mongoose Query.'
      },
      {
        q: 'Why is checking "this.isModified(\'password\')" essential inside a pre("save") password hashing hook?',
        qAr: 'لماذا يعتبر فحص "this.isModified(\'password\')" ضرورياً داخل خطاف تشفير كلمات المرور pre("save")؟',
        options: [
          'Prevents re-hashing an already-hashed password when updating unrelated document fields (e.g. updating user name).',
          'Speeds up database connection.',
          'Compresses the password string.',
          'Validates email addresses.'
        ],
        correct: 0,
        why: 'Without isModified, updating any field triggers pre-save, encrypting the existing hash again and corrupting the user credential.',
        whyAr: 'بدون هذا الفحص، سيتم إعادة تشفير الهاش القديم عند تعديل أي حقل آخر مما يدمر كلمة المرور ويعجز المستخدم عن الدخول.'
      },
      {
        q: 'What is the primary benefit of Mongoose Virtual Populate (schema.virtual with ref/localField/foreignField)?',
        qAr: 'ما هي الفائدة الأساسية لخاصية Virtual Populate في Mongoose؟',
        options: [
          'Establishes relationships without storing massive unbounded arrays of ObjectIds in the parent document.',
          'Generates fake test data automatically.',
          'Deletes database collections.',
          'Translates MongoDB queries into SQL.'
        ],
        correct: 0,
        why: 'Virtual populate dynamically queries related children on-demand without bloating parent documents with array references.',
        whyAr: 'تنشئ علاقات ديناميكية عند الطلب دون الحاجة لحشو المستند الأب بمصفوفات معرفات ضخمة تلتهم الـ 16MB.'
      },
      {
        q: 'How can you apply a Soft Delete filter universally across all find queries using Mongoose middleware?',
        qAr: 'كيف يمكنك تطبيق تصفية الحذف الناعم (Soft Delete) تلقائياً عبر كل استعلامات البحث في Mongoose؟',
        options: [
          'Using a regex query hook: schema.pre(/^find/, function() { this.where({ isDeleted: { $ne: true } }); });',
          'By restarting the Node.js server.',
          'Using express.json().',
          'Deleting the document from the database.'
        ],
        correct: 0,
        why: 'Regex pattern /^find/ intercepts find, findOne, findById, and findOneAndUpdate, enforcing the soft-delete filter centrally.',
        whyAr: 'التعبير المنتظم /^find/ يعترض كافة دوال البحث تلقائياً ويحقن شرط تصفية السجلات المحذوفة مركزياً.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين lean() و استعلام Mongoose العادي ومتى يجب استخدامه لزيادة سرعة الخادم بنسبة 400%؟',
    interviewA: 'استعلام Mongoose العادي يقوم بتحويل كل وثيقة مسترجعة إلى Mongoose Document كامل محمّل بالـ Getters والـ Setters والـ Internal State والـ Change Tracking وخطافات الـ Middleware، مما يستهلك ذاكرة RAM ووقت معالجة كبير في الـ V8. عند استخدام .lean()، يتجاوز Mongoose كل هذا البناء ويُرجع كائنات جافاسكريبت خام نقيّة (Plain JavaScript Objects - POJO)، مما يقلل استهلاك الـ RAM بنسبة تصل إلى 70% ويسرع استعلامات القراءة (GET APIs) بنسبة تفوق 400%.'
  },
  {
    slug: 'sharding-replication',
    title: 'Distributed MongoDB: Replica Sets, Raft Consensus & Sharding Architecture',
    titleAr: 'قواعد MongoDB الموزعة: مجموعات النسخ المتطابقة (Replica Sets)، إجماع Raft والـ Sharding',
    level: 3,
    order: 12,
    estMinutes: 35,
    version: 'MongoDB 8.0 Sharded Cluster',
    pattern: 'Horizontal Partitioning & High Availability',
    objectives: [
      'فهم معمارية الـ Replica Set (Primary, Secondary, Arbiter) وآلية الانتخاب التلقائي (Automatic Failover) في أقل من ثانية.',
      'تشريح معمارية التجزئة الأفقية الموزعة (Sharded Cluster: Mongos, Config Servers, Shard Nodes).',
      'اختيار مفتاح التجزئة المثالي (Shard Key Selection: Range-based vs Hashed Sharding) لتجنب اختناق عقدة واحدة (Hotspotting).',
      'تطبيق استراتيجيات التوجيه الجغرافي (Zone Sharding / Geo-partitioning) للتوافق مع قوانين GDPR.'
    ],
    problemOpening: `
      عندما ينمو تطبيقك من 10,000 مستخدم إلى 100 مليون مستخدم، وتصل قاعدة البيانات إلى 50 تيرابايت (50 TB) مع 200,000 استعلام في الثانية... لن يوجد سيرفر واحد في العالم يملك مواصفات عتاد تكفي لتحمل هذا الضغط (Vertical Scaling Limit)!
      MongoDB صُممت من اليوم الأول لتكون قاعدة بيانات موزعة تدعم نوعين من التوسع:
      1. **التوافر العالي والتكرار (High Availability via Replica Sets)**: وجود عقدة أساسية (Primary) تستقبل الكتابة، وعقد ثانوية (Secondaries) تتزامن عبر الـ Oplog وتتولى القيادة تلقائياً خلال 1 ثانية لو تعطلت العقدة الرئيسية.
      2. **التجزئة الأفقية العملاقة (Horizontal Scaling via Sharding)**: توزيع الـ 50 تيرابايت على 20 سيرفر (Shards)، بحيث يحمل كل سيرفر 2.5 تيرابايت فقط، وتقوم خوادم التوجيه **mongos** بتوجيه استعلام كل مستخدم إلى الـ Shard المخصص له بسرعة الضوء.
      لكن اختيار **مفتاح التجزئة (Shard Key)** هو أخطر قرار معماري: لو اخترت مفتاحاً سيئاً، ستذهب كل الكتابات إلى سيرفر واحد فقط (Hotspot Shard) وينهار النظام بالكامل!
      في هذا الدرس، هنتعلم أسرار العمارة الموزعة في MongoDB، إزاي نختار Shard Keys مثالية، وكيف تعمل خوارزميات الإجماع.
    `,
    mechanics: [
      { step: '01', title: 'دورة حياة الـ Replica Set والانتخاب التلقائي', desc: 'تبادل إشارات النبض (Heartbeats) كل ثانيتين بين العقد؛ لو سقط الـ Primary، تنتخب العقد الثانوية رئيساً جديداً فوراً عبر بروتوكول Raft-like Election.' },
      { step: '02', title: 'مكونات الـ Sharded Cluster الثلاثة', desc: 'خوادم التوجيه (mongos Routers)، خوادم الإعدادات والفهارس (Config Servers)، وعقد البيانات الفعلية (Shards).' },
      { step: '03', title: 'التجزئة المجزأة بـ Hashed Sharding', desc: 'توزيع البيانات عشوائياً وبشكل متساوٍ رياضي عبر حساب تجزئة الـ Hash للـ Shard Key لمنع اختناق الكتابات المتتالية.' },
      { step: '04', title: 'التجزئة النطاقية بـ Ranged Sharding', desc: 'توزيع البيانات في نطاقات متصلة (Chunks) وهي مثالية لاستعلامات النطاقات المترابطة جغرافياً أو زمنياً.' },
      { step: '05', title: 'التجزئة النطاقية الجغرافية بـ Zone Sharding', desc: 'ربط بيانات المستخدمين الأوروبيين بخوادم فرانكفورت وبيانات آسيا بخوادم سنغافورة للامتثال لـ GDPR وتقليل الـ Latency.' }
    ],
    playgroundCode: `// محاكي موجه خوادم التجزئة (Mongos Router) واختيار الـ Shard
class MockMongosRouter {
  constructor(totalShards = 3) {
    this.totalShards = totalShards;
  }

  getShardTarget(shardKey, value) {
    // محاكاة Hashed Sharding: تجزئة المفتاح بالتساوي
    let hash = 0;
    const str = String(value);
    for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
    const targetShardIndex = Math.abs(hash) % this.totalShards;
    
    console.log(\`Routed Query [\${shardKey}: \${value}] -> Shard-\${targetShardIndex + 1}\`);
    return \`Shard-\${targetShardIndex + 1}\`;
  }
}

const mongos = new MockMongosRouter(3);
mongos.getShardTarget("userId", "USR_9921");
mongos.getShardTarget("userId", "USR_9922");
mongos.getShardTarget("userId", "USR_9923");`,
    experimentQuestion: 'لماذا يعتبر استخدام حقل ذي قيم متزايدة رتيبة (Monotonically Increasing Field مثل createdAt أو Auto-increment ID) كـ Shard Key في Ranged Sharding قراراً كارثياً؟',
    experimentAnswer: 'لأن جميع المستندات الجديدة التي يتم إنشاؤها ستحمل قيماً أكبر من المستندات السابقة، مما يجعل كل عمليات الكتابة الجديدة (100% من الـ Inserts) تتجه إلى آخر Shard فقط في المنظومة (Max Range Chunk)، بينما تظل باقي الـ Shards نائمة! هذا يخلق اختناقاً كارثياً (Write Hotspotting) ويلغي تماماً فائدة الـ Sharding. الحل هو استخدام Hashed Sharding أو مفتاح مركب Compound Shard Key.',
    codeAnatomy: [
      { line: '// تفعيل التجزئة وتحديد Shard Key لقاعدة البيانات الموزعة', note: 'أوامر إدارة الـ Cluster' },
      { line: 'sh.enableSharding("ecommerce");', note: 'تمكين التجزئة على قاعدة البيانات' },
      { line: 'sh.shardCollection("ecommerce.users", { userId: "hashed" }); // Hashed Sharding', note: 'توزيع متساوٍ بالهاش' },
      { line: '// تكوين Zone Sharding جغرافي للامتثال لـ GDPR', note: 'تجزئة مناطق جغرافية' },
      { line: 'sh.addShardTag("shard-eu-1", "EU_ZONE");', note: 'وسم سيرفرات أوروبا' },
      { line: 'sh.addTagRange("ecommerce.customers", { country: "DE" }, { country: "FR" }, "EU_ZONE");', note: 'حصر بيانات أوروبا محلياً' }
    ],
    pitfallBad: `// خطأ معماري كارثي: استخدام حقل التاريخ فقط كـ Shard Key بنمط النطاقات
sh.shardCollection("logs.events", { timestamp: 1 }); // كل السجلات الجديدة ستكتب على سيرفر واحد فقط مسببة انهياره!`,
    pitfallGood: `// الحل الهندسي: استخدام Hashed Sharding أو مفتاح مركب
sh.shardCollection("logs.events", { deviceId: 1, timestamp: 1 }); // يوزع الأجهزة بالتساوي عبر كل الـ Shards`,
    pitfallDiagnosis: 'القيم المتزايدة رتيباً تحصر الكتابات في سيرفر واحد، بينما المفاتيح الموزعة تحقق توازناً حقيقياً في الحمل (Load Balancing).',
    quizPool: [
      {
        q: 'What is the role of the "mongos" component in a MongoDB Sharded Cluster?',
        qAr: 'ما هو الدور الأساسي لمكون "mongos" في معمارية MongoDB Sharded Cluster؟',
        options: [
          'Acts as a stateless query router, directing incoming application operations to the correct target shard(s) based on cluster metadata.',
          'Stores all user passwords in memory.',
          'Compiles JavaScript into machine code.',
          'Replaces database hard drives.'
        ],
        correct: 0,
        why: 'mongos routes client requests to appropriate shards by consulting cached routing metadata from Config Servers.',
        whyAr: 'يعمل كموجه استعلامات بدون حالة، يوجه طلبات التطبيق إلى عقد الـ Shards المعنية بالاعتماد على الفهارس التوجيهية.'
      },
      {
        q: 'Why does Hashed Sharding prevent Write Hotspotting on monotonically increasing keys?',
        qAr: 'لماذا تمنع التجزئة المشفرة (Hashed Sharding) اختناق الكتابات على المفاتيح المتزايدة رتيباً؟',
        options: [
          'Computes a hash of the key value, distributing sequential writes uniformly across all available shards in the cluster.',
          'Deletes duplicate records automatically.',
          'Compresses write operations.',
          'Enforces HTTPS connections.'
        ],
        correct: 0,
        why: 'Hashing transforms sequential values into pseudo-random outputs, spreading insertion load evenly across all cluster nodes.',
        whyAr: 'تحول القيم المتتالية إلى مخرجات شبه عشوائية موزعة بالتساوي الرياضي عبر كافة سيرفرات الـ Cluster.'
      },
      {
        q: 'How fast does an automatic failover election take in a MongoDB 8 Replica Set when the Primary crashes?',
        qAr: 'كم يستغرق الانتخاب التلقائي للرئيس الجديد في MongoDB Replica Set عند سقوط الـ Primary؟',
        options: ['Typically under 1 to 2 seconds', '15 to 30 minutes', '24 hours', 'Requires manual reboot'],
        correct: 0,
        why: 'Modern MongoDB replica sets reach consensus and elect a new primary in typically under 1-2 seconds with zero human intervention.',
        whyAr: 'تصل المجموعة لإجماع وتنتخب رئيساً جديداً تلقائياً في غضون ثانية إلى ثانيتين فقط دون أي تدخل بشري.'
      },
      {
        q: 'What is a "Scatter-Gather" query in a Sharded MongoDB architecture?',
        qAr: 'ما هو استعلام "Scatter-Gather" في قواعد بيانات MongoDB المجزأة؟',
        options: [
          'A query that omits the Shard Key, forcing mongos to broadcast the query to EVERY shard in the cluster and merge the results.',
          'A query that creates new tables.',
          'A query that backups the cluster.',
          'An invalid syntax error.'
        ],
        correct: 0,
        why: 'Queries missing the shard key cannot be targeted and must be broadcast to all shards, increasing latency and cluster load.',
        whyAr: 'استعلام لا يحتوي على Shard Key، مما يجبر الموجه على إرسال الطلب لجميع سيرفرات المنظومة وتجميع الردود مما يبطئ الأداء.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هي معايير اختيار الـ Shard Key المثالي لجدول يحتوي على 500 مليون مستند؟',
    interviewA: 'الـ Shard Key المثالي يجب أن يحقق 3 معايير معمارية صارمة: 1. High Cardinality: يمتلك ملايين القيم الفريدة المتنوعة (مثل userId أو orderId وتجنب حقول مثل status أو gender). 2. Low Frequency: عدم تكرار نفس القيمة لنسبة كبيرة من البيانات لمنع تكوين Jumbo Chunks غير قابلة للتجزئة. 3. Non-Monotonic: ألا تكون القيم متزايدة رتيباً مع الوقت لمنع Write Hotspotting. إذا لم يتوفر حقل يحقق الشروط الثلاثة، نبني Compound Shard Key مثل { tenantId: 1, userId: 1 } أو نستخدم Hashed Sharding.'
  },
  {
    slug: 'performance-tuning',
    title: 'MongoDB Performance Tuning: WiredTiger Cache, Working Set & Profiler Analysis',
    titleAr: 'تحسين أداء MongoDB: ذاكرة WiredTiger Cache، إدارة Working Set وتحليل الـ Database Profiler',
    level: 3,
    order: 13,
    estMinutes: 35,
    version: 'MongoDB 8.0 Engine',
    pattern: 'Database Profiling & Memory Sizing',
    objectives: [
      'فهم معمارية محرك التخزين WiredTiger وإدارة الـ WiredTiger Cache وحساب حجم الـ Working Set.',
      'تفعيل واستخدام أداة التحليل المدمجة (Database Profiler بـ system.profile) لتسجيل الاستعلامات البطيئة (Slow Queries).',
      'تشخيص وعلاج اختناقات الذاكرة وظاهرة الـ RAM Thrashing والصفحات المتسخة (Dirty Pages).',
      'تطبيق قواعد التحسين المتقدمة: استراتيجيات الـ Projections الصارمة، الفهارس المغطاة، ومنع الـ Disk Spills.'
    ],
    problemOpening: `
      في المشاريع الصغيرة، تعمل قاعدة بيانات MongoDB بسرعة الصاروخ لأن كل البيانات وحجم الفهارس محشورة بالكامل داخل ذاكرة الـ RAM.
      لكن عندما تكبر قاعدة البيانات وتصل إلى 200GB بينما حجم الـ RAM المخصص للسيرفر هو 32GB فقط، تبدأ المشاكل الحقيقية:
      إذا كان استعلامك يطلب بيانات عشوائية غير موجودة في الـ RAM، سيضطر محرك التخزين **WiredTiger** لطرد صفحات من الذاكرة (Page Eviction)، وقراءة البيانات من الـ SSD البطيء، مما يرفع مؤشرات الـ Disk I/O إلى 100% وترتفع أزمنة الاستجابة من 2ms إلى 4000ms!
      هذا ما يسمى هندسياً بـ **"Working Set Exceeding RAM"**.
      الحل المعماري الاحترافي يتطلب معرفة أدوات التشخيص الجراحية:
      - تفعيل **Database Profiler** لاصطياد الاستعلامات البطيئة التي تتجاوز 100ms.
      - مراقبة مؤشرات **WiredTiger Cache Dirty/Clean Bytes**.
      - استخدام **Projections الصارمة** لتقليل نقل البيانات عبر الشبكة.
      في هذا الدرس الختامي لمسار MongoDB 8، هنتعلم إزاي نخلي خادم قاعدة البيانات يتحمل أقصى درجات الضغط بأعلى كفاءة.
    `,
    mechanics: [
      { step: '01', title: 'حساب حجم الـ Working Set الفعلي', desc: 'الـ Working Set هو إجمالي حجم المستندات النشطة + جميع الفهارس المستخدمة؛ ويجب أن يتسع بالكامل داخل الـ RAM المتاحة.' },
      { step: '02', title: 'تفعيل الـ Database Profiler بـ db.setProfilingLevel()', desc: 'ضبط المستوى 1 (Slow Queries) لتسجيل أي استعلام يستغرق أكثر من 50ms في كوليكشن system.profile.' },
      { step: '03', title: 'تحليل الاستعلامات البطيئة في system.profile', desc: 'فرز الاستعلامات حسب millis و docsExamined لتحديد الجداول التي تفتقد لفهارس مركبة مناسبة.' },
      { step: '04', title: 'مراقبة الـ WiredTiger Cache Eviction', desc: 'فحص db.serverStatus().wiredTiger.cache للتأكد من أن الصفحات المتسخة (dirty cache) أقل من 20% لتجنب تعليق الكتابة.' },
      { step: '05', title: 'التجريد الصارم للبيانات بـ Lean Projections', desc: 'استرجاع الحقول المطلوبة فقط في الـ Select ومنع جلب المصفوفات الضخمة لتقليل استهلاك الذاكرة وباندويث الشبكة.' }
    ],
    playgroundCode: `// محاكي تحليل استعلامات الـ Database Profiler
const mockProfileLogs = [
  { op: "query", ns: "prod.users", query: { email: "a@b.com" }, millis: 2, planSummary: "IXSCAN" },
  { op: "query", ns: "prod.orders", query: { status: "pending" }, millis: 480, planSummary: "COLLSCAN", docsExamined: 250000 },
  { op: "query", ns: "prod.products", query: { category: "tech" }, millis: 120, planSummary: "COLLSCAN", docsExamined: 50000 }
];

function analyzeSlowQueries(logs, thresholdMs = 100) {
  const bottlenecks = logs.filter(l => l.millis >= thresholdMs && l.planSummary === "COLLSCAN");
  console.log(\`🚨 Found \${bottlenecks.length} Critical Bottlenecks (COLLSCAN with > \${thresholdMs}ms):\`);
  bottlenecks.forEach(b => {
    console.log(\`⚠️ Collection [\${b.ns}] took \${b.millis}ms scanning \${b.docsExamined} documents! -> Needs Index.\`);
  });
}

analyzeSlowQueries(mockProfileLogs, 100);`,
    experimentQuestion: 'ماذا يعني مؤشر (docsExamined / nReturned) في تحليل خطة تنفيذ استعلامات MongoDB، وما هي القيمة المثالية له؟',
    experimentAnswer: 'مؤشر (docsExamined / nReturned) يقيس كفاءة الاستعلام: كم مستنداً اضطر المحرك لقراءته من القرص والذاكرة لاستخراج النتائج النهائية الفعلية. القيمة المثالية هي 1.0 (أي فحص 10 مستندات لإرجاع 10 مستندات). إذا كانت النسبة 1000 أو أكثر (فحص 100,000 مستند لإرجاع 5 مستندات فقط)، فهذا دليل قاطع على غياب الفهرس المناسب وهدر هائل لموارد الخادم.',
    codeAnatomy: [
      { line: '// تفعيل أداة تحليل الأداء للاستعلامات الأبطأ من 50ms', note: 'أمر الإدارة' },
      { line: 'db.setProfilingLevel(1, { slowms: 50 });', note: 'المستوى 1 للأداء' },
      { line: '// الاستعلام عن أبطأ 5 عمليات في النظام', note: 'فحص السجلات' },
      { line: 'db.system.profile.find()', note: 'قراءة جدول الـ Profiler' },
      { line: '  .sort({ millis: -1 })', note: 'فرز بالأبطأ زمناً' },
      { line: '  .limit(5)', note: 'أعلى 5 نتائج' },
      { line: '  .projection({ ns: 1, millis: 1, planSummary: 1, query: 1 });', note: 'استخراج الحقول التشخيصية' }
    ],
    pitfallBad: `// خطأ شائع: تشغيل Profiling Level 2 (تسجيل كل العمليات بلا استثناء) في الإنتاج بشكل دائم
db.setProfilingLevel(2); // يكتب ملايين السجلات في system.profile مما يستهلك الـ Disk I/O ويبطئ السيرفر!`,
    pitfallGood: `// الحل الهندسي: ضبط Profiling Level 1 مع عتبة زمنية مدروسة (slowms: 100)
db.setProfilingLevel(1, { slowms: 100 });`,
    pitfallDiagnosis: 'المستوى 2 يستهلك موارد الخادم في تسجيل العمليات السريعة التافهة، بينما المستوى 1 يركز حصراً على الاستعلامات البطيئة المسببة للاختناق.',
    quizPool: [
      {
        q: 'What does the "Working Set" refer to in MongoDB memory management?',
        qAr: 'ماذا يعني مصطلح "Working Set" في إدارة ذاكرة MongoDB؟',
        options: [
          'The total amount of actively accessed data documents and indexes that the application frequently uses in memory.',
          'The size of the source code repository.',
          'The number of active developer connections.',
          'Total installed hard drive space.'
        ],
        correct: 0,
        why: 'Working Set comprises frequently accessed data and indexes; if it fits comfortably in RAM, MongoDB performs at near-memory speeds.',
        whyAr: 'يمثل الحجم الإجمالي للبيانات والفهارس النشطة التي يستخدمها التطبيق بكثرة؛ وإذا استقرت في الـ RAM يعمل الخادم بأقصى سرعة.'
      },
      {
        q: 'What is the purpose of setting MongoDB Profiling Level to 1 (slowms: 50)?',
        qAr: 'ما هو الغرض من ضبط مستوى الـ Profiling في MongoDB على 1 مع slowms: 50؟',
        options: [
          'Logs only operations taking longer than 50ms to system.profile, helping identify slow queries without logging overhead.',
          'Blocks all slow queries from running.',
          'Restarts the database when queries exceed 50ms.',
          'Compresses query results.'
        ],
        correct: 0,
        why: 'Level 1 logs operations exceeding the slowms threshold, providing targeted diagnostics with negligible performance overhead.',
        whyAr: 'يسجل فقط العمليات التي تتجاوز 50ms في جدول المراقبة لاكتشاف الاختناقات بدون إرهاق الخادم بتسجيل كل شيء.'
      },
      {
        q: 'What does a planSummary of "COLLSCAN" indicate in an explain() report?',
        qAr: 'إلى ماذا يشير مؤشر planSummary بقيمة "COLLSCAN" في تقرير explain()؟',
        options: [
          'A full collection scan occurred because no suitable index was available, reading every single document in the collection.',
          'An optimal index scan occurred.',
          'The query was served from cache.',
          'The query syntax is invalid.'
        ],
        correct: 0,
        why: 'COLLSCAN means MongoDB had to scan every document in the collection from storage, indicating a missing or unused index.',
        whyAr: 'يشير لمسح المجموعة بالكامل من القرص لعدم وجود فهرس مناسب مما يستهلك موارد الخادم.'
      },
      {
        q: 'How does WiredTiger manage in-memory cache eviction when memory pressure rises?',
        qAr: 'كيف يدير محرك WiredTiger إخلاء الذاكرة (Cache Eviction) عند ارتفاع ضغط الـ RAM؟',
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة High CPU Spike المفاجئ في خادم MongoDB الإنتاجي أثناء أوقات الذروة خطوة بخطوة؟',
    interviewA: '1. نشغل أمر db.currentOp({ "active": true, "secs_running": { "$gt": 3 } }) لاكتشاف الاستعلامات الطويلة العالقة في الـ CPU حالياً. 2. إذا وجدنا استعلاماً مدمراً (مثل Unindexed Aggregation أو Regular Expression غير محكم)، نوقفه فوراً بأمر db.killOp(opid). 3. نفحص الـ Slow Query Logs في system.profile لمعرفة الاستعلامات المتكررة ذات planSummary: "COLLSCAN". 4. ننشئ الفهارس المركبة المناسبة فورياً في الخلفية (Background Index Build) باستخدام createIndex. 5. نتأكد من أن التطبيق يستخدم Projections محددة و .lean() لتقليل العبء على الذاكرة والمعالج.'
  },
  {
    slug: 'backup-security',
    title: 'MongoDB Security, Role-Based Access Control (RBAC), TLS & Automated Backup Strategies',
    titleAr: 'أمان وتأمين قواعد MongoDB: التحكم بالوصول (RBAC)، التشفير بـ TLS واستراتيجيات النسخ الاحتياطي المؤتمت',
    level: 3,
    order: 14,
    estMinutes: 35,
    version: 'MongoDB 8.0 Security',
    pattern: 'Database Hardening & Disaster Recovery',
    objectives: [
      'تأمين خوادم MongoDB ضد هجمات الفدية (Ransomware) بتعطيل المنافذ المفتوحة وتفعيل المصادقة SCRAM-SHA-256.',
      'بناء مصفوفة الصلاحيات الداخلية (Database RBAC) وتطبيق مبدأ أقل الصلاحيات لكل مستخدم وخدمة.',
      'تشفير الاتصالات أثناء النقل بـ TLS/SSL والتشفير أثناء السكون (Encryption at Rest) بـ WiredTiger AES-256.',
      'أتمتة استراتيجيات النسخ الاحتياطي بـ mongodump و Point-in-Time Recovery (PITR) عبر الـ Oplog.'
    ],
    problemOpening: `
      من أشهر حوادث الأمن السيبراني في تاريخ الـ NoSQL هي فضيحة خوادم MongoDB المفتوحة على الإنترنت بدون كلمة مرور افتراضياً (Default Port 27017 Bind All)، حيث قامت عصابات الـ Ransomware بمسح قواعد بيانات آلاف الشركات واستبدالها برسالة طلب فدية بيتكوين!
      تأمين خادم MongoDB في بيئة الإنتاج يتطلب 4 طبقات دفاعية صارمة:
      1. **حظر الوصول الشبكي المباشر (Network Isolation)**: ربط الخادم بـ <code dir="ltr">bindIp: 127.0.0.1</code> أو الـ Private VPC فقط وحظر المنفذ 27017 من الإنترنت.
      2. **المصادقة المشفرة (Authentication)**: تفعيل <code dir="ltr">security.authorization: "enabled"</code> باستخدام آلية **SCRAM-SHA-256**.
      3. **صلاحيات الـ RBAC الصارمة**: عدم استخدام مستخدم <code dir="ltr">root</code> لتطبيق الـ API، وتخصيص مستخدم بصلاحيات <code dir="ltr">readWrite</code> على قاعدة بيانات التطبيق فقط.
      4. **خطة التعافي من الكوارث (Disaster Recovery & PITR)**: أخذ نسخ احتياطية دورية بـ **mongodump** ونسخ الـ Oplog للتعافي حتى اللحظة الزمنية الدقيقة التي سبقت الحادثة (Point-in-Time Recovery).
      في هذا الدرس الختامي لمسار MongoDB، هنبني ملف تكوين <code dir="ltr">mongod.conf</code> محصناً بنسبة 100% ضد كافة التهديدات.
    `,
    mechanics: [
      { step: '01', title: 'تفعيل المصادقة الصارمة (security.authorization)', desc: 'تعديل ملف mongod.conf لمنع أي اتصال غير موثق وتفعيل آلية SCRAM-SHA-256 لحماية كلمات المرور.' },
      { step: '02', title: 'بناء مستخدمي التطبيق بمبدأ Least Privilege', desc: 'إنشاء مستخدم مقيد برول readWrite على داتابيز محددة فقط ومنعه من الوصول لـ admin أو config databases.' },
      { step: '03', title: 'تشفير الاتصالات بـ TLS/SSL', desc: 'إجبار جميع العملاء على استخدام شهادات SSL مشفرة net.tls.mode: "requireTLS" لحماية البيانات أثناء النقل.' },
      { step: '04', title: 'النسخ الاحتياطي بالضغط بـ mongodump --gzip', desc: 'تصدير BSON مضغوط مع الأرشفة ومطابقة الـ Oplog بـ --oplog لضمان نسخة احتياطية متناسقة نقطياً.' },
      { step: '05', title: 'الاسترجاع اللحظي بـ Point-in-Time Recovery (PITR)', desc: 'تطبيق النسخة الاحتياطية وتغذيتها بسجلات الـ Oplog للعودة بالبيانات إلى الثانية التي سبقت خطأ المطور أو هجوم المخترق.' }
    ],
    playgroundCode: `// محاكي تكوين أمان خادم MongoDB (mongod.conf hardening)
const hardenedMongoConfig = \`
# /etc/mongod.conf - Production Security Hardened
net:
  port: 27017
  bindIp: 127.0.0.1,10.0.1.5 # حصر الوصول على الشبكة الداخلية فقط
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem

security:
  authorization: enabled # تفعيل التحقق الإجباري من الصلاحيات
  keyFile: /var/lib/mongodb/replica-set.key # مفتاح مصادقة خوادم المجموعة

processManagement:
  timeZoneInfo: /usr/share/zoneinfo
\`;

console.log("Hardened mongod.conf Security Specification:");
console.log(hardenedMongoConfig);`,
    experimentQuestion: 'لماذا يعتبر استخدام خيار --oplog إلزامياً عند تشغيل أمر mongodump لأخذ نسخة احتياطية لخادم إنتاجي نشط؟',
    experimentAnswer: 'أثناء عملية أخذ الـ Backup التي قد تستغرق 30 دقيقة على قاعدة بيانات ضخمة، يستمر المستخدمون في إضافة وتعديل البيانات! بدون خيار --oplog، ستكون الجداول التي نُسخت في الدقيقة الأولى غير متناسقة مع الجداول التي نُسخت في الدقيقة 30 (Point-in-time Inconsistency). خيار --oplog يسجل كافة التعديلات التي حدثت أثناء عملية الـ Dump، مما يتيح عند استرجاع البيانات إعادة تشغيل الـ Oplog للوصول لنسخة متناسقة ذرية 100% كأنها التقطت في لحظة واحدة.',
    codeAnatomy: [
      { line: '// أوامر إنشاء مستخدم تطبيق بصلاحيات مقيدة (RBAC)', note: 'أمان الصلاحيات' },
      { line: 'use admin;', note: 'التحويل لقاعدة بيانات الأدمن' },
      { line: 'db.createUser({', note: 'أمر إنشاء المستخدم' },
      { line: '  user: "ecommerce_app_user",', note: 'اسم مستخدم التطبيق' },
      { line: '  pwd: passwordPrompt(), // إدخال آمن لكلمة المرور', note: 'كلمة مرور مشفرة' },
      { line: '  roles: [', note: 'مصفوفة الصلاحيات' },
      { line: '    { role: "readWrite", db: "ecommerce_prod" } // مقيد فقط بقاعدة بيانات المتجر', note: 'صلاحيات محصورة' },
      { line: '  ]', note: 'نهاية الصلاحيات' },
      { line: '});', note: 'نهاية الإنشاء' }
    ],
    pitfallBad: `// خطأ أمني كارثي: ربط التطبيق بمستخدم يملك دور root على مستوى السيرفر بالكامل
// { user: "app", roles: ["root"] } -> لو تم تسريب رابط الداتابيز، يستطيع المخترق حذف كل السيرفرات!`,
    pitfallGood: `// الحل الأمني المعتمد: مستخدم مقيد بصلاحيات readWrite على داتابيز التطبيق فقط
// { user: "app_user", roles: [{ role: "readWrite", db: "app_db" }] }`,
    pitfallDiagnosis: 'منح صلاحيات root للتطبيقات يخالف مبدأ Least Privilege ويهدد كافة قواعد البيانات عند حدوث أي تسريب للبيئة.',
    quizPool: [
      {
        q: 'Why should "security.authorization: enabled" always be configured in mongod.conf for production environments?',
        qAr: 'لماذا يجب دائماً تفعيل "security.authorization: enabled" في mongod.conf لبيئات الإنتاج؟',
        options: [
          'Enforces mandatory authentication and Role-Based Access Control (RBAC), preventing unauthenticated access on database ports.',
          'Makes database queries 100 times faster.',
          'Deletes database collections.',
          'Translates BSON to HTML.'
        ],
        correct: 0,
        why: 'Enabling authorization forces all client connections to authenticate with valid credentials before performing operations.',
        whyAr: 'يفرض المصادقة الإجبارية والتحقق من الصلاحيات على كافة الاتصالات ويمنع الدخول المجهول للمنافذ.'
      },
      {
        q: 'What is the purpose of the "--oplog" flag when running "mongodump"?',
        qAr: 'ما هي الفائدة الأساسية لخيار "--oplog" عند تشغيل أمر "mongodump"؟',
        options: [
          'Captures real-time write operations that occur during the dump process, ensuring a point-in-time consistent backup state upon restore.',
          'Formats the backup as a Word document.',
          'Increases internet speed.',
          'Compresses images.'
        ],
        correct: 0,
        why: 'The --oplog flag records concurrent writes during backup execution, preventing database state inconsistencies during restore.',
        whyAr: 'يسجل التعديلات المتزامنة التي تحدث أثناء النسخ لضمان الحصول على نسخة متناسقة ومطابقة للحظة زمنية واحدة عند الاسترجاع.'
      },
      {
        q: 'What does "Encryption at Rest" protect in MongoDB storage?',
        qAr: 'ما الذي يحميه "التشفير أثناء السكون" (Encryption at Rest) في تخزين MongoDB؟',
        options: [
          'Encrypts raw data files and journals on the physical disk using AES-256, protecting data if hard drives are stolen or improperly decommissioned.',
          'Encrypts browser cookies.',
          'Encrypts network cables.',
          'Protects CSS code.'
        ],
        correct: 0,
        why: 'Encryption at Rest ensures that stolen physical disks or volume snapshots cannot be read without the KMS master encryption key.',
        whyAr: 'يشفر ملفات البيانات والـ Journals على القرص الصلب بـ AES-256 لحماية البيانات في حال سرقة الأقراص أو أخذ لقطات غير مصرح بها.'
      },
      {
        q: 'What is the principle of Least Privilege applied to database user creation?',
        qAr: 'ما هو تطبيق مبدأ أقل الصلاحيات (Least Privilege) عند إنشاء مستخدمي قواعد البيانات؟',
        options: [
          'Granting the application user only the exact readWrite permissions on its specific database, strictly excluding admin or clusterManager roles.',
          'Giving every developer root access.',
          'Using short passwords.',
          'Deleting inactive databases.'
        ],
        correct: 0,
        why: 'Restricting application roles limits potential blast radius damage if connection string credentials are ever compromised.',
        whyAr: 'قصر صلاحيات تطبيق الـ API على القراءة والكتابة في قاعدة بياناته فقط لمنع أي عبث بإعدادات السيرفر أو قواعد البيانات الأخرى عند التسريب.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم استراتيجية تعافي من الكوارث (Disaster Recovery Strategy) تضمن RPO < 1 minute (Recovery Point Objective) و RTO < 15 minutes (Recovery Time Objective) لقاعدة بيانات MongoDB بحجم 10TB؟',
    interviewA: '1. للوصول لـ RPO < 1min (أقصى بيانات مفقودة دقيقة واحدة): نستخدم Continuous Oplog Archiving (مثل MongoDB Atlas Continuous Backup أو Percona Backup for MongoDB): يتم دفق بايتات الـ Oplog مباشرة إلى S3 Bucket كل ثوانٍ، مما يتيح استرجاع البيانات لأي ثانية سابقة (Point-in-Time Recovery). 2. للوصول لـ RTO < 15min (التعافي خلال ربع ساعة): لا نقوم بتنزيل 10TB عبر الإنترنت (لأن تنزيلها سيستغرق ساعات!)، بل نعتمد على Multi-Region Replica Sets مع Fast EBS Volume Snapshot Clones، حيث يتم تشغيل نسخة ثانوية سحابية في منطقة أخرى وتحديثها بلقطات الأقراص والـ Oplog فورياً لتتولى القيادة كـ Primary خلال دقائق معدودة عند سقوط الـ Region الأساسي.'
  }
];

