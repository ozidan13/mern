/* ============================================================
   prisma-lessons.mjs — 9 New Lessons for Prisma ORM 5.x/6.x Track
   ============================================================ */

export const prismaLessons = [
  {
    slug: 'schema-modeling',
    title: 'Prisma Schema DSL: Models, Data Types, Attributes (@id, @map) & Multi-File Schemas',
    titleAr: 'لغة نمذجة المخططات في بريزما: النماذج والسمات (@id, @map) وتقسيم المخططات',
    level: 1,
    order: 2,
    estMinutes: 24,
    version: 'Prisma 5.x/6.x',
    pattern: 'Type-Safe Modeling',
    problemOpening: `ملف <code dir="ltr">schema.prisma</code> هو "المصدر الوحيد للحقيقة" (Single Source of Truth) في معمارية بريزما. من خلال هذا الملف البسيط والأنيق، يولد بريزما مخططات قواعد البيانات وهجرات SQL وواجهة العميل البرمجية المشفرة بأنواع TypeScript الدقيقة 100%! إتقان سمات الحقول (<code dir="ltr">@id</code>, <code dir="ltr">@default(uuid())</code>, <code dir="ltr">@map</code>, <code dir="ltr">@@index</code>) يضمن تحكماً دقيقاً في شكل الجداول في الـ Database.`,
    objectives: [
      'فهم كتل schema.prisma الثلاث: datasource و generator و model.',
      'إتقان سمات الحقول والنماذج: @id, @unique, @default, @updatedAt, @map, @@map, @@index.',
      'تطبيق ميزة المخططات المقسمة متعددة الملفات (Multi-File Prisma Schema).'
    ],
    mechanics: [
      { step: 1, title: 'تعريف مصدر البيانات ومولد العميل', desc: 'تحديد نوع قاعدة البيانات (postgresql) ورابط الـ URL وتوليد عميل prisma-client-js.' },
      { step: 2, title: 'ربط أسماء الحقول (@map)', desc: 'استخدام camelCase في كود جافاسكربت وتخزينها كـ snake_case في قاعدة البيانات.' },
      { step: 3, title: 'التحويل التلقائي لأنواع TypeScript', desc: 'تشغيل prisma generate لإنشاء واجهات الأنواع المتزامنة لحظياً مع المخطط.' }
    ],
    playgroundCode: `// Prisma Schema AST Parser Simulation
const prismaModel = \`
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now()) @map("created_at")

  @@map("users")
}
\`;
console.log("Prisma Schema Definition Language (DSL):");
console.log(prismaModel);`,
    experimentQuestion: 'ما هو الفرق بين سمة @map("col_name") وسمة @@map("table_name") في مخطط بريزما؟',
    experimentAnswer: 'السمة الفردية @map تعيد تسمية عمود أو حقل واحد داخل الجدول، بينما السمة المزدوجة @@map تعيد تسمية الجدول بالكامل في قاعدة البيانات مع الحفاظ على اسمه كـ Model في كود TypeScript.',
    codeAnatomy: [
      { line: '1: model Post {', note: 'تعريف النموذج' },
      { line: '2:   id        Int      @id @default(autoincrement()),', note: 'مفتاح أساسي تسلسلي' },
      { line: '3:   title     String   @db.VarChar(255),', note: 'تحديد نوع عمود SQL الدقيق' },
      { line: '4:   updatedAt DateTime @updatedAt,', note: 'تحديث تلقائي للوقت عند التعديل' },
      { line: '5:   @@index([title])', note: 'إنشاء فهرس B-Tree للبحث السريع' },
      { line: '6: }', note: 'نهاية النموذج' }
    ],
    pitfallBad: 'تعديل جداول قاعدة البيانات يدوياً في SQL دون تحديث schema.prisma!',
    pitfallGood: 'تعديل schema.prisma ثم تشغيل npx prisma migrate dev',
    pitfallDiagnosis: 'التعديل اليدوي في الداتابيز يكسر المزامنة ويجعل عميل TypeScript يرسل استعلامات تالفة.',
    quizPool: [{
      q: 'Which Prisma attribute automatically updates a timestamp field whenever a record is updated?',
      qAr: 'أي سمة في بريزما تحدث حقل التوقيت الزمني تلقائياً عند تعديل أي سجل في قاعدة البيانات؟',
      options: ['@default(now())', '@updatedAt', '@autoTimestamp', '@onUpdate'],
      correct: 1,
      why: '`@updatedAt` automatically stores the time when a record was last updated.',
      whyAr: 'السمة @updatedAt تقوم بتسجيل طابع الوقت الحالي تلقائياً عند حدوث أي تعديل على السجل.'
    }],
    interviewQ: 'كيف تعمل ميزة Prisma Multi-File Schemas في المشاريع الضخمة؟',
    interviewA: 'تتيح الميزة (prismaSchemaFolder) تقسيم النماذج عبر عدة ملفات `.prisma` داخل مجلد `prisma/schema/` (مثل `auth.prisma` و `billing.prisma`)؛ يقوم Prisma CLI بدمجها تلقائياً عند تشغيل `generate` أو `migrate` مما يسهل عمل فرق التطوير المتعددة.'
  },
  {
    slug: 'migrations-lifecycle',
    title: 'Prisma Migrate: prisma migrate dev, deploy, reset & The Shadow Database',
    titleAr: 'دورة حياة الهجرات في بريزما: الهجرة الآمنة، النشر وقاعدة البيانات الظلية (Shadow DB)',
    level: 1,
    order: 3,
    estMinutes: 24,
    version: 'Prisma 5.x/6.x',
    pattern: 'Database Migrations',
    problemOpening: `تعديل مخطط قاعدة البيانات في بيئة الإنتاج بدون أدوات هجرة معيارية هو مخاطرة بتدمير وفقدان بيانات العملاء الحية! أداة <code dir="ltr">Prisma Migrate</code> تدير تاريخ التعديلات عبر ملفات SQL حقيقية قابلة للتتبع في Git. في هذا الدرس سنفهم كيف تستخدم بريزما قاعدة بيانات ثانية مؤقتة تُسمى <code dir="ltr">Shadow Database</code> للتأكد من سلامة ملفات الهجرة قبل لمس قاعدة البيانات الحقيقية.`,
    objectives: [
      'إتقان أوامر الهجرة: prisma migrate dev (للتطوير)، prisma migrate deploy (للإنتاج).',
      'فهم دور الـ Shadow Database في كشف أخطاء تضارب الهجرات (Migration Drift).',
      'تخصيص ملفات الهجرة بـ --create-only لإضافة أوامر SQL متقدمة (Triggers, Views).'
    ],
    mechanics: [
      { step: 1, title: 'الهجرة في بيئة التطوير (migrate dev)', desc: 'مقارنة schema.prisma مع قاعدة البيانات وإنشاء ملف SQL جديد وترقية الجداول وتوليد عميل الـ TypeScript.' },
      { step: 2, title: 'التحقق عبر الـ Shadow Database', desc: 'تطبيق كل ملفات الهجرة التاريخية من الصفر في داتابيز مؤقتة للتأكد من عدم وجود أي تضارب.' },
      { step: 3, title: 'النشر في الإنتاج (migrate deploy)', desc: 'تطبيق ملفات الهجرة الجديدة المعلقة فقط دون توليد ملفات جديدة ودون الحاجة لـ Shadow DB.' }
    ],
    playgroundCode: `// Prisma Migration State Tracker Simulation
const migrationHistory = [
  { id: "20260801_init", status: "APPLIED", sql: "CREATE TABLE users (...);" },
  { id: "20260815_add_role", status: "APPLIED", sql: "ALTER TABLE users ADD COLUMN role TEXT;" }
];

console.log("Applied Migrations History in _prisma_migrations Table:");
console.table(migrationHistory);`,
    experimentQuestion: 'لماذا يحظر استخدام prisma migrate dev في خوادم الإنتاج والـ CI/CD؟',
    experimentAnswer: 'لأن prisma migrate dev تفترض وجود بيئة تفاعلية؛ وإذا اكتشفت أي عدم تطابق (Schema Drift) قد تقترح إعادة ضبط وحذف قاعدة البيانات (Database Reset) مما يؤدي لحذف كل بيانات الإنتاج فوراً! في الإنتاج نستخدم prisma migrate deploy حصرياً.',
    codeAnatomy: [
      { line: '1: # Development Migration Command', note: 'أمر التطوير' },
      { line: '2: npx prisma migrate dev --name add_orders_table', note: 'إنشاء وتطبيق ملف SQL وتحديث العميل' },
      { line: '3: # Production Deployment Command', note: 'أمر الإنتاج الآمن' },
      { line: '4: npx prisma migrate deploy', note: 'تطبيق الهجرات المعلقة فقط بدون مساس بالبيانات' }
    ],
    pitfallBad: 'استخدام npx prisma db push في الإنتاج بدلاً من prisma migrate deploy!',
    pitfallGood: 'استخدام prisma migrate dev محلياً و prisma migrate deploy في الإنتاج',
    pitfallDiagnosis: 'أمر db push لا يسجل تاريخ الهجرات في جدول _prisma_migrations وقد يحذف أعمدة حية بدون تحذير.',
    quizPool: [{
      q: 'Which Prisma CLI command should be executed in production/CI environments to apply pending migrations?',
      qAr: 'أي أمر في Prisma CLI يجب تشغيله في بيئات الإنتاج والـ CI لتطبيق الهجرات المعلقة؟',
      options: ['prisma migrate dev', 'prisma migrate deploy', 'prisma db push', 'prisma generate'],
      correct: 1,
      why: '`prisma migrate deploy` is strictly designed for production to safely apply pending migrations without resetting.',
      whyAr: 'الأمر prisma migrate deploy مخصص للإنتاج لتطبيق الهجرات بأمان تام دون طلب تفاعل بشري.'
    }],
    interviewQ: 'ما هي الـ Shadow Database في بريزما ولماذا تفشل الهجرة إذا لم يمتلك المستخدم صلاحية إنشاء قواعد بيانات؟',
    interviewA: 'الـ Shadow Database هي قاعدة بيانات مؤقتة تنشئها بريزما تلقائياً أثناء `migrate dev` للتحقق من عدم حدوث تعارضات واكتشاف انحراف المخطط (Schema Drift)؛ إذا لم يكن لمستخدم الـ SQL صلاحية `CREATEDB` تفشل العملية ما لم يتم توفير رابط داتابيز ظلية يدوية عبر `shadowDatabaseUrl`.'
  },
  {
    slug: 'crud-queries',
    title: 'Prisma Client CRUD: findUnique, findFirst, findMany, create, update & delete',
    titleAr: 'عمليات CRUD في عميل بريزما: الاستعلامات الدقيقة، الفرز والتحديثات المتعددة',
    level: 1,
    order: 4,
    estMinutes: 24,
    version: 'Prisma 5.x/6.x',
    pattern: 'Type-Safe Data Access',
    problemOpening: `عميل بريزما (Prisma Client) هو محرك استعلامات مشفر بالكامل بالـ Type-Safety. عندما تكتب <code dir="ltr">prisma.user.findUnique(...)</code>، فإن محرك TypeScript يعرف مسبقاً كل أسماء الحقول وأنواعها، وإذا حاولت قراءة خاصية غير موجودة أو مررت نوعاً خاطئاً، يظهر الخطأ الأحمر فوراً في المحرر قبل تشغيل الكود!`,
    objectives: [
      'إتقان دوال القراءة: findUnique, findUniqueOrThrow, findFirst, findMany.',
      'تطبيق عمليات الإدخال والتعديل الذرية: create, createMany, update, updateMany, upsert.',
      'تطبيق الفرز والتقسيم: orderBy, take, skip, distinct.'
    ],
    mechanics: [
      { step: 1, title: 'الاستعلام الفردي بالمفاتيح الفريدة (findUnique)', desc: 'البحث المباشر عبر الحقول المعلمة بـ @id أو @unique لتحقيق أقصى سرعة استعلام.' },
      { step: 2, title: 'الـ Upsert الذري (Create or Update)', desc: 'تحديث السجل إذا كان موجوداً أو إنشاؤه تلقائياً إذا كان جديداً في استدعاء واحد.' },
      { step: 3, title: 'العمليات الجماعية (createMany / updateMany)', desc: 'إدخال أو تعديل مئات السجلات في استعلام SQL موحد بأعلى كفاءة.' }
    ],
    playgroundCode: `// Prisma Query Construction Simulation
const mockPrismaClient = {
  user: {
    findMany: async (args) => {
      console.log("⚡ Executing SQL: SELECT id, name, email FROM users WHERE role = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3");
      console.log("Query Parameters:", args);
      return [{ id: "u1", name: "Amr Zidan", email: "amr@codehub.dev" }];
    }
  }
};

mockPrismaClient.user.findMany({
  where: { role: "ADMIN" },
  take: 10,
  skip: 0,
  orderBy: { createdAt: "desc" }
});`,
    experimentQuestion: 'ما هو الفرق بين findUnique و findFirst في عميل بريزما؟',
    experimentAnswer: 'الـ findUnique يقبل في شرط where الحقول الفريدة فقط (المعرفة بـ @id أو @unique) ويستفيد من فهارس الفرادة؛ بينما findFirst يقبل أي شرط مرن على أي حقل ويرجع أول سجل يطابق الشرط.',
    codeAnatomy: [
      { line: '1: const user = await prisma.user.upsert({', note: 'تعديل أو إنشاء ذري' },
      { line: '2:   where: { email: "amr@codehub.dev" },', note: 'شرط الفرادة' },
      { line: '3:   update: { lastLogin: new Date() },', note: 'البيانات في حالة الوجود' },
      { line: '4:   create: { email: "amr@codehub.dev", name: "Amr" }', note: 'البيانات في حالة الإنشاء الجديد' },
      { line: '5: });', note: 'نهاية الاستعلام' }
    ],
    pitfallBad: 'const u = await prisma.user.findFirst({ where: { id } }); /* استخدام findFirst لمفتاح أساسي */',
    pitfallGood: 'const u = await prisma.user.findUnique({ where: { id } }); /* أسرع ويفرض نوع المفتاح الأساسي */',
    pitfallDiagnosis: 'دالة findUnique تستفيد من الفهارس الفريدة وتوفر أماناً نوعياً دقيقاً لمعرفات السجلات.',
    quizPool: [{
      q: 'Which Prisma method retrieves a single record by a unique identifier or throws an exception if not found?',
      qAr: 'أي دالة في بريزما تجلب سجلاً واحداً بواسطة معرف فريد أو ترمي استثناء فوراً إذا لم تجده؟',
      options: ['findUnique()', 'findUniqueOrThrow()', 'getOne()', 'requireUnique()'],
      correct: 1,
      why: '`findUniqueOrThrow` throws a `NotFoundError` if the record does not exist in the database.',
      whyAr: 'الدالة findUniqueOrThrow تلقي خطأ NotFoundError فورياً إذا لم يكن السجل موجوداً.'
    }],
    interviewQ: 'لماذا لا ترجع دالة updateMany السجلات المعدلة بل ترجع كائناً بالشكل { count: number }؟',
    interviewA: 'لأن بعض محركات قواعد البيانات (مثل MySQL بدون RETURNING) لا تدعم إرجاع صفوف متعددة بعد عمليات الـ Batch Update؛ لضمان التوافقية العالية عبر كل قواعد البيانات، تعيد دالة `updateMany` عدد الصفوف المتأثرة فقط.'
  },
  {
    slug: 'relations-filtering',
    title: 'Nested Relations, Deep Querying: include vs select & Fluent API',
    titleAr: 'العلاقات المتداخلة في بريزما: مقارنة include و select والاستعلامات العميقة',
    level: 2,
    order: 5,
    estMinutes: 26,
    version: 'Prisma 5.x/6.x',
    pattern: 'Relation Traversal',
    problemOpening: `في قواعد البيانات العلائقية، جلب المستخدم مع مقالاته وملفه الشخصي وتعليقاته يتطلب كتابة استعلامات JOIN معقدة. بريزما تقدم طريقة مذهلة: الاستعلامات المتداخلة (Nested Queries). لكن الفخ الأكبر هو استخدام <code dir="ltr">include</code> الذي يسحب كل أعمدة الجدول بما فيها الحقول الحساسة (مثل كلمات السر المحروقة)، بينما يوفر <code dir="ltr">select</code> دقة متناهية لاختيار الأعمدة المطلوبة فقط.`,
    objectives: [
      'بناء العلاقات 1:1 و 1:N و N:M في مخطط بريزما وفهم جداول الربط التلقائية (Implicit Many-to-Many).',
      'التمييز الصارم بين include (لجلب العلاقات كاملة) و select (لتحديد الحقول المطلوبة حصراً).',
      'تطبيق التصفية المتقدمة على العلاقات المتداخلة (some, every, none).'
    ],
    mechanics: [
      { step: 1, title: 'العلاقات كثيرة لكثير الضمنية (Implicit M:N)', desc: 'بريزما تنشئ وتدير جدول الربط الوسيط في قاعدة البيانات تلقائياً دون الحاجة لنمذجة يدوية.' },
      { step: 2, title: 'التحديد الدقيق بـ select', desc: 'حماية البيانات الحساسة وجلب id و name فقط من المستخدم مع أسماء المقالات.' },
      { step: 3, title: 'مشغلات العلاقات (some, every, none)', desc: 'جلب المستخدمين الذين لديهم مقال واحد على الأقل منشور (posts: { some: { published: true } }).' }
    ],
    playgroundCode: `// Simulating Prisma Nested Query with Specific Selection
const mockQueryOutput = {
  id: "u101",
  name: "Amr Zidan",
  posts: [
    { id: "p1", title: "Mastering React 19" },
    { id: "p2", title: "PostgreSQL Internals" }
  ]
};
console.log("Clean Nested Query Result (No password hash leaked!):");
console.log(JSON.stringify(mockQueryOutput, null, 2));`,
    experimentQuestion: 'هل يمكنك استخدام include و select معاً في نفس مستوى الاستعلام في عميل بريزما؟',
    experimentAnswer: 'لا، يحظر استخدام include و select معاً في نفس مستوى الكائن؛ إما أن تستخدم include لجلب كل الحقول + العلاقات، أو تستخدم select وتحدد الحقول والعلاقات بداخلها بدقة.',
    codeAnatomy: [
      { line: '1: const user = await prisma.user.findUnique({', note: 'استعلام علاقات متداخلة' },
      { line: '2:   where: { email: "amr@codehub.dev" },', note: 'الشرط' },
      { line: '3:   select: {', note: 'تحديد دقيق للأعمدة' },
      { line: '4:     id: true, name: true,', note: 'حقول المستخدم' },
      { line: '5:     posts: { where: { published: true }, select: { title: true } }', note: 'تصفية وتحديد حقول المقالات' },
      { line: '6:   }', note: 'نهاية الاستعلام' },
      { line: '7: });', note: 'النتيجة مشفرة بأنواع TypeScript دقيقة' }
    ],
    pitfallBad: 'const user = await prisma.user.findUnique({ include: { posts: true } }); /* يسرب password_hash للمتصفح! */',
    pitfallGood: 'const user = await prisma.user.findUnique({ select: { id: true, name: true, posts: true } });',
    pitfallDiagnosis: 'استخدام include يسحب كل أعمدة الجدول بما فيها الحقول السرية؛ دائماً استخدم select في الـ APIs العامة.',
    quizPool: [{
      q: 'Which relational filter in Prisma checks if ALL related records match a given condition?',
      qAr: 'أي فلتر علاقات في بريزما يتحقق مما إذا كانت جميع السجلات المرتبطة تطابق شرطاً محدداً؟',
      options: ['some', 'every', 'none', 'all'],
      correct: 1,
      why: '`every` ensures that all related records satisfy the condition.',
      whyAr: 'المشغل every يضمن أن كل السجلات المرتبطة تحقق الشرط المطلوب بالكامل.'
    }],
    interviewQ: 'كيف تنفذ عمليات الكتابة المتداخلة (Nested Writes) مثل إنشاء مستخدم ومقالاته في استدعاء واحد؟',
    interviewA: 'نستخدم خاصية `create` المتداخلة داخل استعلام `prisma.user.create({ data: { name: "Amr", posts: { create: [{ title: "Post 1" }, { title: "Post 2" }] } } })`؛ حيث يقوم بريزما بتغليف كل العمليات تلقائياً داخل معاملة ACID Transaction موحدة.'
  },
  {
    slug: 'transactions-batching',
    title: 'Prisma Transactions: Sequential Batching vs Interactive $transaction',
    titleAr: 'معاملات بريزما: التجميع المتسلسل والمعاملات التفاعلية ($transaction)',
    level: 2,
    order: 6,
    estMinutes: 26,
    version: 'Prisma 5.x/6.x',
    pattern: 'Data Integrity',
    problemOpening: `عند تنفيذ عمليات بنكية أو إنشاء طلب وشراء منتجات وتخفيض المخزون، يجب ضمان تنفيذ جميع العمليات معاً أو التراجع عنها بالكامل. يوفر بريزما نوعين من المعاملات: مصفوفة المعاملات المتسلسلة <code dir="ltr">Sequential $transaction</code> السريعة، والمعاملات التفاعلية <code dir="ltr">Interactive $transaction</code> التي تتيح قراءة البيانات واستخدامها في الشروط قبل اتخاذ قرار الحفظ أو التراجع.`,
    objectives: [
      'استخدام مصفوفة prisma.$transaction([q1, q2]) للعمليات المستقلة السريعة.',
      'استخدام Interactive Transactions: prisma.$transaction(async (tx) => { ... }).',
      'ضبط خيارات المعاملة: timeout و maxWait ومستويات العزل (Isolation Levels).'
    ],
    mechanics: [
      { step: 1, title: 'المعاملات المتسلسلة (Array Batching)', desc: 'تمرير مصفوفة استعلامات تنفذ في معاملة SQL واحدة بأعلى سرعة.' },
      { step: 2, title: 'المعاملات التفاعلية (Interactive Callback)', desc: 'الحصول على كائن عميل مخصص (tx) لقراءة وتعديل البيانات بناءً على شروط منطقية.' },
      { step: 3, title: 'التراجع التلقائي عند الخطأ', desc: 'إذا رُمي أي استثناء داخل الدالة، يقوم بريزما بعمل ROLLBACK فوري وتحرير الأقفال.' }
    ],
    playgroundCode: `// Simulating Prisma Interactive Transaction
async function executeOrderPayment(prisma, userId, amount) {
  return await prisma.$transaction(async (tx) => {
    // 1. Check User Balance
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (user.balance < amount) throw new Error("Insufficient funds for purchase!");
    
    // 2. Deduct Balance
    const updated = await tx.user.update({ where: { id: userId }, data: { balance: { decrement: amount } } });
    // 3. Create Order
    const order = await tx.order.create({ data: { userId, amount, status: "PAID" } });
    return { orderId: order.id, remainingBalance: updated.balance };
  });
}
console.log("Transaction Engine Configured with automatic rollback on error.");`,
    experimentQuestion: 'ما هي مشكلة استخدام كائن prisma العام بدلاً من كائن tx داخل دالة Interactive Transaction؟',
    experimentAnswer: 'استخدام prisma العادي ينفذ الاستعلام خارج نطاق المعاملة في اتصال منفصل؛ لضمان شمول العملية داخل المعاملة والتراجع عند الفشل، يجب دائماً استخدام كائن tx الممرر للمعاملة.',
    codeAnatomy: [
      { line: '1: await prisma.$transaction(async (tx) => {', note: 'بدء معاملة تفاعلية' },
      { line: '2:   const sender = await tx.account.update({ ... });', note: 'استخدام كائن tx الإلزامي' },
      { line: '3:   const receiver = await tx.account.update({ ... });', note: 'استخدام كائن tx الإلزامي' },
      { line: '4: }, { maxWait: 5000, timeout: 10000 });', note: 'ضبط مهلة الانتظار' }
    ],
    pitfallBad: 'await prisma.$transaction(async (tx) => { await prisma.user.update(...); }); /* خطأ: استخدام prisma بدلاً من tx */',
    pitfallGood: 'await prisma.$transaction(async (tx) => { await tx.user.update(...); }); /* صحيح ومشمول في المعاملة */',
    pitfallDiagnosis: 'استدعاء prisma العادي يخرج العملية من المعاملة ويفقد حماية التراجع التلقائي (Rollback).',
    quizPool: [{
      q: 'Which parameter passed to interactive `$transaction` callback must be used for executing queries within the transaction context?',
      qAr: 'أي معامل ممرر لدالة $transaction التفاعلية يجب استخدامه لتنفيذ الاستعلامات داخل سياق المعاملة؟',
      options: ['client', 'tx', 'session', 'db'],
      correct: 1,
      why: '`tx` is the transactional client instance scoped to that specific database transaction.',
      whyAr: 'المعامل tx هو كائن العميل المربوط حصرياً بنطاق هذه المعاملة وقفلها.'
    }],
    interviewQ: 'ما هي خيارات maxWait و timeout في معاملات بريزما وفيمَ تفيد؟',
    interviewA: 'الـ `maxWait` هو أقصى وقت ينتظره بريزما للحصول على اتصال متاح من مجمع الاتصالات لبدء المعاملة (افتراضياً 2 ثانية). والـ `timeout` هو أقصى وقت مسموح به لتنفيذ كود المعاملة بالكامل قبل إلغائها وعمل Rollback تلقائي (افتراضياً 5 ثوانٍ) لمنع تعليق الأقفال في قاعدة البيانات.'
  },
  {
    slug: 'raw-queries',
    title: 'Raw SQL Escape Hatches: $queryRaw, $executeRaw & SQL Template Tags',
    titleAr: 'استعلامات SQL الخام في بريزما: دوال $queryRaw وتأمين قوالب الـ SQL Tagged',
    level: 3,
    order: 7,
    estMinutes: 24,
    version: 'Prisma 5.x/6.x',
    pattern: 'Low-Level SQL Integration',
    problemOpening: `مهما كانت قوة الـ ORM، هناك دائماً استعلامات SQL متقدمة ومخصصة (مثل استعلامات الجداول الجغرافية PostGIS أو دوال النوافذ المتقدمة أو تقارير الـ Full-Text Search المعقدة) التي لا يدعمها الـ API التجريدي. يوفر بريزما منافذ هروب للـ SQL النقي عبر <code dir="ltr">prisma.$queryRaw</code> مع حماية حديدية مدمجة ضد هجمات SQL Injection بفضل وسوم القوالب <code dir="ltr">Prisma.sql</code>.`,
    objectives: [
      'تنفيذ استعلامات القراءة المتقدمة باستخدام prisma.$queryRaw واستعلامات التعديل بـ $executeRaw.',
      'فهم كيفية عمل Template Tags في تحويل المتغيرات لمعاملات مجهزة (Prepared Statements ($1, $2)).',
      'استخدام Prisma.raw بحذر شديد للمعرفات الديناميكية وأسماء الجداول.'
    ],
    mechanics: [
      { step: 1, title: 'التحويل التلقائي للمعاملات المجهزة', desc: 'بريزما تفصل نصوص الـ SQL عن متغيرات المدخلات وترسلها كمتحولات مشفرة تمنع الـ SQL Injection.' },
      { step: 2, title: 'الاستعلام المكتوب بالأنواع (Typed $queryRaw)', desc: 'تمرير Interface TypeScript لـ $queryRaw<UserDTO[]>`...` للحصول على Typesafety كاملة.' },
      { step: 3, title: 'تنفيذ الأوامر بـ $executeRaw', desc: 'لتنفيذ أوامر التعديل والحذف التي ترجع عدد الصفوف المتأثرة (Affected Rows Count).' }
    ],
    playgroundCode: `// Raw SQL Tagged Template Injection Protection Simulation
function simulateSqlTag(strings, ...values) {
  console.log("Raw SQL Prepared Template:", strings.join("$PARAM"));
  console.log("Safe Bound Parameters (Zero Injection Risk):", values);
}

const userInput = "amr' OR '1'='1";
simulateSqlTag\`SELECT * FROM users WHERE email = \${userInput}\`;`,
    experimentQuestion: 'ما هو الخطر الفادح لاستخدام prisma.$queryRawUnsafe() بدلاً من prisma.$queryRaw مع مدخلات المستخدم؟',
    experimentAnswer: 'الدالة $queryRawUnsafe تدمج النصوص مباشرة دون تحويلها إلى Prepared Parameters؛ إذا مررت لها نصوصاً قادمة من المستخدم ستكون قاعدة بياناتك عرضة لهجمات SQL Injection واختراق البيانات بالكامل.',
    codeAnatomy: [
      { line: '1: const result = await prisma.$queryRaw<UserSummary[]>`', note: 'استعلام SQL خام آمن مع Type Annotation' },
      { line: '2:   SELECT id, name, COUNT(p.id)::int as post_count', note: 'استعلام مخصص' },
      { line: '3:   FROM users u LEFT JOIN posts p ON u.id = p.author_id', note: 'ربط متقدم' },
      { line: '4:   WHERE u.status = ${userStatus}', note: 'تمرير المعامل بأمان تام داخل Template Literal' },
      { line: '5:   GROUP BY u.id', note: 'تجميع' },
      { line: '6: `;', note: 'نهاية الاستعلام' }
    ],
    pitfallBad: 'prisma.$queryRawUnsafe(`SELECT * FROM users WHERE id = ${req.body.id}`); /* ثغرة SQL Injection! */',
    pitfallGood: 'prisma.$queryRaw`SELECT * FROM users WHERE id = ${req.body.id}`; /* محمي تلقائياً */',
    pitfallDiagnosis: 'استخدام $queryRawUnsafe مع دمج النصوص يلغي المعاملات المجهزة ويفتح الباب لاختراق السيرفر.',
    quizPool: [{
      q: 'How does Prisma `$queryRaw` prevent SQL injection when variables are interpolated inside the template string?',
      qAr: 'كيف تمنع دالة $queryRaw في بريزما ثغرات SQL Injection عند تمرير المتغيرات داخل قالب النص؟',
      options: ['By encoding everything in Base64', 'By automatically converting interpolated variables into parameterized query values ($1, $2)', 'By running regex filters', 'By rejecting strings'],
      correct: 1,
      why: 'Prisma template tags transform interpolations into parameterized values handled by the database driver.',
      whyAr: 'تحول وسوم القوالب المتغيرات الممررة إلى قيم معاملات مجهزة مفصولة يرسلها المحرك بأمان.'
    }],
    interviewQ: 'متى تضطر لاستخدام Prisma.raw() وكيف تضمن أمانه ضد الاختراق؟',
    interviewA: 'نستخدم `Prisma.raw()` عندما نحتاج لتمرير اسم جدول أو عمود ديناميكياً (لأن أسماء الجداول لا يمكن تمريرها كـ SQL Parameters)؛ ولضمان الأمان، يجب فحص اسم الجدول مسبقاً ومطابقته لقائمة بيضاء صارمة من الثوابت (Whitelist Enum) لمنع تمرير أي نص مريب.'
  },
  {
    slug: 'middleware-extensions',
    title: 'Prisma Client Extensions: Query, Model, Result & Client Methods',
    titleAr: 'توسيعات عميل بريزما (Prisma Client Extensions): تعديل النتائج والحذف الناعم',
    level: 3,
    order: 8,
    estMinutes: 26,
    version: 'Prisma 5.x/6.x',
    pattern: 'Extensible ORM Architecture',
    problemOpening: `في إصدارات بريزما القديمة، كان تخصيص السلوك يتم عبر Middleware قديم محدود القدرات. في بريزما الحديثة، تم استبداله بنظام <code dir="ltr">Prisma Client Extensions ($extends)</code> الثوري. تتيح لك التوسيعات إضافة دوال مخصصة لنماذجك (Custom Model Methods)، حساب حقول جديدة تلقائياً عند القراءة (Computed Result Fields)، واعتراض الاستعلامات لتطبيق الحذف الناعم (Soft Delete) وعزل المستأجرين (Multi-Tenancy) تلقائياً!`,
    objectives: [
      'فهم أنواع التوسيعات الأربعة: model, result, query, client.',
      'بناء نظام الحذف الناعم (Soft Delete Extension) باعتراض استعلامات delete و findMany.',
      'إضافة حقول ديناميكية محسوبة عبر result extension مع دعم TypeScript التلقائي.'
    ],
    mechanics: [
      { step: 1, title: 'توسيع النتائج (Result Extensions)', desc: 'إضافة خصائص محسوبة لحظياً (مثل fullName) تظهر تلقائياً في نتائج كل استعلام.' },
      { step: 2, title: 'اعتراض الاستعلامات (Query Extensions)', desc: 'تعديل جمل الاستعلام تلقائياً لحقن { where: { deletedAt: null } } في كل عمليات البحث.' },
      { step: 3, title: 'إعادة استخدام التوسيعات كحزم (Modular Extensions)', desc: 'تصدير التوسيعات كدوال نقية وتركيبها معاً عبر prisma.$extends(ext1).$extends(ext2).' }
    ],
    playgroundCode: `// Soft Delete Extension Logic Simulator
function createSoftDeleteExtension() {
  console.log("🧩 Initializing Prisma Client Soft-Delete Extension...");
  return {
    name: "soft-delete",
    interceptQuery: (model, action, args) => {
      if (action === "delete") {
        console.log(\`🔄 Converting DELETE on [\${model}] to UPDATE { deletedAt: new Date() }\`);
        return { action: "update", args: { ...args, data: { deletedAt: new Date() } } };
      }
      return { action, args };
    }
  };
}

const ext = createSoftDeleteExtension();
ext.interceptQuery("User", "delete", { where: { id: "u101" } });`,
    experimentQuestion: 'ما هي الميزة الكبرى لـ Prisma Extensions مقارنة بـ Mongoose Virtuals؟',
    experimentAnswer: 'توسيعات بريزما (Extensions) تقوم بتوليد وتحديث أنواع الـ TypeScript المعادة تلقائياً؛ فإذا أضفت حقل fullName عبر result extension، سيتعرف محرر VS Code عليه فورياً في كائن النتيجة مع الإكمال التلقائي.',
    codeAnatomy: [
      { line: '1: const prisma = new PrismaClient().$extends({', note: 'توسيع العميل' },
      { line: '2:   result: {', note: 'توسيع النتائج' },
      { line: '3:     user: {', note: 'نموذج المستخدم' },
      { line: '4:       fullName: { needs: { firstName: true, lastName: true },', note: 'الحقول المطلوبة' },
      { line: '5:         compute(u) { return `${u.firstName} ${u.lastName}`; } }', note: 'الدالة المحسوبة' },
      { line: '6:     }', note: 'نهاية النموذج' },
      { line: '7:   }', note: 'نهاية التوسيع' },
      { line: '8: });', note: 'العميل الموسع جاهز' }
    ],
    pitfallBad: 'استخدام $use (Middleware القديم) الملغي في مشاريع بريزما الحديثة',
    pitfallGood: 'استخدام $extends لإنشاء وحدات توسيع حديثة متوافقة بالكامل مع TypeScript',
    pitfallDiagnosis: 'الـ Middleware القديم تم استبعاده لأنه لا يدعم تعديل الـ TypeScript Types ويفقد مرونة البناء.',
    quizPool: [{
      q: 'Which component of Prisma `$extends` allows adding computed fields to query results with full TypeScript support?',
      qAr: 'أي جزء في Prisma $extends يتيح إضافة حقول محسوبة ديناميكياً لنتائج الاستعلامات بدعم TypeScript كامل؟',
      options: ['query', 'model', 'result', 'client'],
      correct: 2,
      why: 'The `result` extension component defines new computed getters on retrieved models.',
      whyAr: 'مكون result يتيح تعريف حقول محسوبة جديدة على نتائج النماذج المسترجعة.'
    }],
    interviewQ: 'كيف تنفذ معمارية التعددية الإيجارية (Multi-Tenancy Architecture) تلقائياً باستخدام Prisma Extensions؟',
    interviewA: 'ننشئ `query extension` يعترض كل استعلامات النماذج التابعة للشركات؛ حيث يقوم بقراءة `tenantId` من سياق الطلب الحالي (عبر `AsyncLocalStorage`) ويحقن تلقائياً شرط `where: { tenantId }` في كل استعلامات القراءة والكتابة، مما يمنع تسريب بيانات شركة لأخرى برمجياً بنسبة 100% دون كتابة الشرط يدوياً في كل مسار.'
  },
  {
    slug: 'performance-optimization',
    title: 'Prisma Performance Optimization: Solving N+1 Queries, Select Projection & Index Tuning',
    titleAr: 'تحسين أداء بريزما: حل مشكلة استعلامات N+1 وتحديد الأعمدة وضبط الفهارس',
    level: 3,
    order: 9,
    estMinutes: 26,
    version: 'Prisma 5.x/6.x',
    pattern: 'Performance Architecture',
    problemOpening: `واحدة من أخطر مشاكل الـ ORM في كل لغات البرمجة هي كارثة استعلامات <code dir="ltr">N+1 Queries</code>: عندما تجلب 100 مستخدم ثم تدور في حلقة تكرار لجلب طلبات كل مستخدم، يقوم الـ ORM بإرسال 101 طلب لقاعدة البيانات بدلاً من استعلامين مجمعين! في هذا الدرس هنتعلم كيف يحل بريزما مشكلة N+1 تلقائياً عبر تقنية <code dir="ltr">DataLoader-style Batching</code> وكيف نضبط الـ Select Projection لتحقيق أقصى سرعة.`,
    objectives: [
      'فهم وتشخيص كارثة استعلامات N+1 وكيف يعالجها Prisma Query Engine تلقائياً.',
      'تطبيق الإسقاط الدقيق للأعمدة (Select Projection) لتوفير الذاكرة وسرعة نقل الشبكة.',
      'ضبط فهارس @@index و @@unique لتسريع استعلامات العلاقات والتصفية.'
    ],
    mechanics: [
      { step: 1, title: 'التجميع التلقائي للاستعلامات (Query Batching)', desc: 'محرك Prisma Rust Engine يجمع استدعاءات findUnique المتزامنة في استعلام SQL واحد بـ WHERE id IN (...).' },
      { step: 2, title: 'استبعاد الأعمدة الثقيلة بـ Select', desc: 'تجنب جلب النصوص الكبيرة وحقول الصور والـ JSONB في استعلامات القوائم.' },
      { step: 3, title: 'مراقبة الاستعلامات بـ prisma.$on("query")', desc: 'تسجيل زمن تنفيذ كل جملة SQL في سجلات التطوير لرصد الاستعلامات البطيئة فوراً.' }
    ],
    playgroundCode: `// N+1 Query Disaster vs Prisma Batching Simulator
function simulateQueryBatching(userCount = 50) {
  console.log(\`🛑 [N+1 Disaster] Sent 1 Query for Users + \${userCount} individual Queries for Orders = \${userCount + 1} Database Roundtrips!\`);
  console.log("⚡ [Prisma Query Engine Batching] Sent EXACTLY 2 Queries (1 Users + 1 Batched WHERE user_id IN (...)) Total Roundtrips: 2!");
}

simulateQueryBatching(50);`,
    experimentQuestion: 'كيف تفعل تسجيل استعلامات الـ SQL ومقاييس زمن التنفيذ في عميل بريزما محلياً؟',
    experimentAnswer: 'عبر تمرير خيار log أثناء التهيئة: new PrismaClient({ log: [ { emit: "event", level: "query" } ] }) ثم الاستماع للحدث prisma.$on("query", e => console.log(e.query, e.duration + "ms")).',
    codeAnatomy: [
      { line: '1: const prisma = new PrismaClient({', note: 'تهيئة العميل مع فاحص الأداء' },
      { line: '2:   log: [{ emit: "event", level: "query" }]', note: 'بث أحداث استعلامات SQL' },
      { line: '3: });', note: 'نهاية التهيئة' },
      { line: '4: prisma.$on("query", (e) => {', note: 'الاستماع لزمن التنفيذ' },
      { line: '5:   if (e.duration > 100) console.warn(`Slow Query (${e.duration}ms):`, e.query);', note: 'تنبيه للاستعلامات البطيئة' },
      { line: '6: });', note: 'نهاية المراقب' }
    ],
    pitfallBad: 'استدعاء await prisma.order.findMany داخل حلقة users.map(async u => ...)!',
    pitfallGood: 'استخدام prisma.user.findMany({ include: { orders: true } }) في استعلام واحد مجمع',
    pitfallDiagnosis: 'الاستعلام داخل حلقات التكرار يطلق مئات الطلبات للـ Database ويهلك اتصال الخادم.',
    quizPool: [{
      q: 'How does Prisma eliminate the N+1 query problem when loading relations using `include` or nested queries?',
      qAr: 'كيف يقضي بريزما على مشكلة استعلامات N+1 عند تحميل العلاقات بـ include أو الاستعلامات المتداخلة؟',
      options: ['By running everything sequentially', 'By batching related queries into a single `WHERE IN (...)` SQL query', 'By caching everything forever', 'By disabling foreign keys'],
      correct: 1,
      why: 'Prisma Query Engine groups multiple relation queries into a single batched query with `WHERE IN (...)`.',
      whyAr: 'يجمع محرك بريزما استعلامات العلاقات في استعلام SQL موحد عالي الكفاءة باستخدام WHERE IN.'
    }],
    interviewQ: 'كيف تؤثر دقة Select Projection على أداء استعلامات البوستجريس في بريزما؟',
    interviewA: 'عندما تحدد أعمدة محددة عبر `select` بدلاً من جلب الجدول كاملاً: 1. تقلل حجم البيانات المنقولة عبر الشبكة من الداتابيز للسيرفر. 2. تقلل استهلاك الذاكرة في Node.js. 3. تمكن محرك PostgreSQL من استخدام الاستعلامات المغطاة (Covered Index Queries) وإرجاع النتائج مباشرة من شجرة الفهرس دون قراءة صفحات الجدول على القرص.'
  },
  {
    slug: 'production-deployment',
    title: 'Prisma in Production: Connection Limits, Accelerate, Pulse & Serverless Architecture',
    titleAr: 'بريزما في بيئات الإنتاج: إدارة حدود الاتصال، التسريع السحابي ومعمارية Serverless',
    level: 3,
    order: 10,
    estMinutes: 26,
    version: 'Prisma 5.x/6.x Enterprise',
    pattern: 'Cloud Architecture & Serverless',
    problemOpening: `في المعماريات السحابية الحديثة ووظائف الـ Serverless (مثل Vercel و AWS Lambda)، يتم إطلاق مئات النسخ من تطبيقك في ثوانٍ مع كل زيادة في الزيارات. كل نسخة تفتح مجمع اتصالات خاص بها، مما يؤدي لاستنزاف حد اتصالات قاعدة البيانات (Too many connections) وسقوط السيرفر بالكامل! حل هذه المشكلة يتطلب ضبط حجم المجمع بدقة أو استخدام حلول التجميع السحابية مثل <code dir="ltr">Prisma Accelerate</code> و <code dir="ltr">PgBouncer</code>.`,
    objectives: [
      'تجنب مشكلة تعدد مثيلات PrismaClient في بيئات التطوير والـ Serverless.',
      'تكوين مجمع اتصالات قاعدة البيانات عبر connection_limit و pool_timeout.',
      'استخدام Prisma Accelerate للـ Global Edge Caching والـ Connection Pooling.'
    ],
    mechanics: [
      { step: 1, title: 'نمط الـ Global Singleton', desc: 'حفظ مثيل PrismaClient في globalThis لمنع إنشاء مثيل جديد مع كل Hot Reload أو استدعاء دالة.' },
      { step: 2, title: 'ضبط حجم المجمع في الرابط', desc: 'تحديد ?connection_limit=5 في DATABASE_URL للتحكم الصارم في عدد الاتصالات المفتوحة.' },
      { step: 3, title: 'الكاش الموزع بـ Prisma Accelerate', desc: 'تخزين نتائج الاستعلامات في حافة الشبكة العالمية (Edge Cache) لتقليل الضغط على قاعدة البيانات.' }
    ],
    playgroundCode: `// Prisma Global Singleton Pattern for Production & Dev
const globalForPrisma = {};
const prisma = globalForPrisma.prisma || { status: "Initialized Singleton Client Instance" };
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

console.log("Prisma Singleton Status:", prisma.status);`,
    experimentQuestion: 'لماذا يحدث تسريب في اتصالات قاعدة البيانات في Next.js / Node.js عند كتابة const prisma = new PrismaClient() في ملف بدون Global Singleton؟',
    experimentAnswer: 'لأنه في بيئة التطوير (Dev Mode)، يقوم الـ Hot Module Replacement (HMR) بإعادة تحميل الملف مع كل تعديل في الكود، مما ينشئ مثيل PrismaClient جديد في كل مرة حتى يستنفد جميع اتصالات قاعدة البيانات المتاحة.',
    codeAnatomy: [
      { line: '1: const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };', note: 'الربط بالنطاق العام' },
      { line: '2: export const prisma = globalForPrisma.prisma || new PrismaClient();', note: 'إعادة استخدام المثيل الموجود' },
      { line: '3: if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;', note: 'تثبيت المثيل في بيئة التطوير' }
    ],
    pitfallBad: 'new PrismaClient() داخل معالج كل طلب في Express أو كل دالة Serverless!',
    pitfallGood: 'استيراد مثيل PrismaClient وحيد (Singleton) مشترك عبر كامل المشروع',
    pitfallDiagnosis: 'إنشاء مثيلات متعددة من PrismaClient يهلك الذاكرة ويستنزف اتصالات قاعدة البيانات في ثوانٍ.',
    quizPool: [{
      q: 'Which query parameter can be appended to the database connection URL to limit the connection pool size per Prisma client?',
      qAr: 'أي معامل استعلام يمكن إضافته لرابط اتصال قاعدة البيانات لتحديد الحجم الأقصى لمجمع الاتصالات لكل عميل بريزما؟',
      options: ['?pool_size=5', '?connection_limit=5', '?max_conns=5', '?limit=5'],
      correct: 1,
      why: '`?connection_limit=N` sets the maximum number of connections Prisma will open for that client instance.',
      whyAr: 'المعامل ?connection_limit يحدد الحد الأقصى لعدد الاتصالات التي يفتحها عميل بريزما.'
    }],
    interviewQ: 'ما هي معمارية Prisma Pulse وفيمَ تختلف عن استعلامات Polling التقليدية؟',
    interviewA: 'الـ `Prisma Pulse` هي خدمة تعتمد على سجلات الـ Change Data Capture (CDC) في قاعدة البيانات (مثل Logical Replication في PostgreSQL)؛ تتيح لتطبيقك الاستماع للأحداث الحية والتغييرات (Real-Time Streams) فور حدوث أي Insert أو Update في الجداول دون الحاجة لإرسال استعلامات متكررة (Polling) ترهق السيرفر.'
  }
];
