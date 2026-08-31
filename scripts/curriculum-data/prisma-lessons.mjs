/* ============================================================
   scripts/curriculum-data/prisma-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 7: Prisma 7 Type-Safe Data Engine (All 9 Lessons).
   ============================================================ */

export const prismaLessons = [
  {
    slug: 'schema-modeling',
    title: 'Prisma Schema DSL: Models, Data Types, Attributes (@id, @map) & Multi-File Schemas',
    titleAr: 'لغة نمذجة المخططات في Prisma: النماذج والسمات (@id, @map) وتقسيم المخططات متعددة الملفات',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'Prisma 7 / 6.x',
    pattern: 'Type-Safe Modeling & Single Source of Truth',
    objectives: [
      'فهم كتل schema.prisma الثلاث: datasource و generator و model.',
      'إتقان سمات الحقول والنماذج: @id, @unique, @default, @updatedAt, @map, @@map, @@index.',
      'تطبيق ميزة المخططات المقسمة متعددة الملفات (Prisma Multi-File Schemas) للمشاريع المؤسسية.',
      'الربط الصارم مع أنواع البيانات المحلية في PostgreSQL بـ @db (مثل @db.VarChar(255), @db.Decimal(10,2)).'
    ],
    problemOpening: `
      ملف <code dir="ltr">schema.prisma</code> هو "المصدر الوحيد للحقيقة" (Single Source of Truth) في معمارية Prisma.
      من خلال هذا الملف البسيط والأنيق، يولد Prisma ثلاثة أشياء جوهرية في آن واحد:
      1. جداول وقواعد بيانات SQL وهجرات متسقة بنسبة 100%.
      2. عميل برمجيات **PrismaClient** فائق السرعة والأمان.
      3. أنواع **TypeScript Type Definitions** دقيقة ومطابقة تلقائياً لحقول الجداول بدون كتابة سطر TypeScript يدوي واحد!
      لكن في المشاريع الكبرى، يقع المطورون في مشاكل تنظيمية: كتابة 50 نموذجاً داخل ملف <code dir="ltr">schema.prisma</code> واحد ينشئ ملفاً عملاقاً غير قابل للصيانة.
      ميزة **Prisma Multi-File Schema** حلت هذه المعضلة بإتاحة تقسيم النماذج عبر مجلد <code dir="ltr">prisma/schema/</code> في ملفات منفصلة (مثل <code dir="ltr">user.prisma</code> و <code dir="ltr">order.prisma</code>).
      في هذا الدرس، هنفكك لغة نمذجة Prisma DSL، وهنتعلم إزاي نربط أسماء الأعمدة المعربة بـ <code dir="ltr">@map</code> و <code dir="ltr">@@map</code>.
    `,
    mechanics: [
      { step: '01', title: 'كتل المصدر والمولد (Datasource & Generator)', desc: 'تحديد محرك قاعدة البيانات (postgresql) ورابط الاتصال وتوليد عميل prisma-client-js.' },
      { step: '02', title: 'ربط أسماء الحقول والجداول بـ @map و @@map', desc: 'استخدام camelCase في كود TypeScript (مثل createdAt) مع تخزينها كـ snake_case في قاعدة البيانات (created_at).' },
      { step: '03', title: 'التحديث التلقائي للوقت بـ @updatedAt', desc: 'تحديث طابع الوقت الزمني تلقائياً عند تعديل أي سجل في قاعدة البيانات دون كتابة كود إضافي.' },
      { step: '04', title: 'الربط بالأنواع الفيزيائية بـ @db.*', desc: 'تحديد أحجام الأعمدة الدقيقة في قاعدة البيانات مثل @db.VarChar(100) و @db.Text و @db.Decimal(12,2).' },
      { step: '05', title: 'توليد كود الأنواع بـ prisma generate', desc: 'قراءة المخطط وتوليد واجهات TypeScript التلقائية في node_modules لتوفير Auto-complete كامل في محرر الأكواد.' }
    ],
    playgroundCode: `// محاكي نموذج Prisma Schema DSL المقسم
const prismaSchemaDsl = \`
// prisma/schema/user.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?  @db.VarChar(120)
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  posts     Post[]

  @@index([email])
  @@map("users") // اسم الجدول في قاعدة البيانات
}
\`;

console.log("Prisma Schema Definition Language (DSL):");
console.log(prismaSchemaDsl);`,
    experimentQuestion: 'ما هو الفرق الدقيق بين سمة @map("col_name") وسمة @@map("table_name") في Prisma؟',
    experimentAnswer: 'السمة الفردية @map تعيد تسمية حقل أو عمود فردي داخل الجدول (مثلاً ربط خاصية createdAt في الكود بعمود created_at في SQL). أما السمة المزدوجة @@map (ذات علامتي @) فتوضع في نهاية النموذج لتعيد تسمية الجدول بالكامل في قاعدة البيانات (مثلاً ربط Model User بجدول users الجمع في SQL).',
    codeAnatomy: [
      { line: 'model Product {', note: 'تعريف نموذج المنتج' },
      { line: '  id          String   @id @default(uuid()) @db.Uuid,', note: 'مفتاح أساسي UUID صريح' },
      { line: '  title       String   @db.VarChar(255),', note: 'نوع نصي محدد الطول في SQL' },
      { line: '  price       Decimal  @db.Decimal(10, 2),', note: 'نوع مالي دقيق ثابت الفاصلة' },
      { line: '  metadata    Json     @default("{}") @db.JsonB,', note: 'مستند JSONB ثنائي' },
      { line: '  isPublished Boolean  @default(false) @map("is_published"),', note: 'اسم العمود في الداتابيز' },
      { line: '  createdAt   DateTime @default(now()) @map("created_at"),', note: 'تاريخ الإنشاء' },
      { line: '  @@index([title, price])', note: 'فهرس B-Tree مركب' },
      { line: '  @@map("products")', note: 'اسم الجدول الفعلي' },
      { line: '}', note: 'نهاية النموذج' }
    ],
    pitfallBad: `// خطأ شائع: تعديل جداول قاعدة البيانات يدوياً في SQL دون تعديل schema.prisma
// يجعل عميل PrismaClient غير متطابق مع الداتابيز الحقيقية ويرمي أخطاء Runtime غير متوقعة!`,
    pitfallGood: `// الحل الهندسي: تعديل schema.prisma دائماً ثم تشغيل npx prisma migrate dev
// يضمن تطابق كود TypeScript مع بنية قاعدة البيانات بنسبة 100%`,
    pitfallDiagnosis: 'التعديل اليدوي في الداتابيز يكسر المزامنة، بينما جعل schema.prisma المصدر الوحيد للحقيقة يضمن Type Safety كامل.',
    quizPool: [
      {
        q: 'Which Prisma attribute automatically updates a timestamp column whenever a record is updated in the database?',
        qAr: 'أي سمة في Prisma تحدث حقل التوقيت الزمني تلقائياً عند تعديل أي سجل في قاعدة البيانات؟',
        options: ['@updatedAt', '@default(now())', '@autoTimestamp', '@onUpdate'],
        correct: 0,
        why: '`@updatedAt` automatically stores the current timestamp whenever the record is updated via Prisma Client.',
        whyAr: 'السمة @updatedAt تقوم بتسجيل طابع الوقت الحالي تلقائياً عند حدوث أي تعديل على السجل عبر Prisma Client.'
      },
      {
        q: 'What is the purpose of the "@map" and "@@map" attributes in Prisma Schema?',
        qAr: 'ما هي وظيفة سمات "@map" و "@@map" في مخطط Prisma؟',
        options: [
          'Map idiomatic camelCase field and model names in TypeScript to snake_case column and table names in SQL databases.',
          'Render Google Maps components.',
          'Format JSON output.',
          'Encrypt database passwords.'
        ],
        correct: 0,
        why: '@map and @@map allow clean TypeScript naming conventions without violating backend database naming schemas.',
        whyAr: 'تتيح استخدام تسميات camelCase النظيفة في كود TypeScript مع ربطها بتسميات snake_case المعيارية في جداول SQL.'
      },
      {
        q: 'What happens when you execute "npx prisma generate" in your terminal?',
        qAr: 'ما الذي يحدث عند تشغيل أمر "npx prisma generate" في الطرفية؟',
        options: [
          'Reads schema.prisma and generates tailored TypeScript type definitions and Prisma Client runtime tailored to your models.',
          'Creates a new PostgreSQL database.',
          'Deletes existing database tables.',
          'Installs Node.js updates.'
        ],
        correct: 0,
        why: 'prisma generate reads your schema and constructs a custom, fully-typed PrismaClient inside node_modules/@prisma/client.',
        whyAr: 'يقرأ schema.prisma ويولد عميل PrismaClient مخصصاً مع تعريفات أنواع TypeScript المطابقة تماماً لنماذجك.'
      },
      {
        q: 'How does Prisma 6/7 handle multi-file schemas across large enterprise repositories?',
        qAr: 'كيف يتعامل Prisma 6/7 مع المخططات المقسمة عبر ملفات متعددة في المشاريع الكبرى؟',
        options: [
          'Enables splitting models across multiple .prisma files inside the prisma/schema/ directory via previewFeatures = ["prismaSchemaFolder"].',
          'Requires compiling Prisma with C++.',
          'Combines files using Webpack.',
          'Prisma does not support multiple files.'
        ],
        correct: 0,
        why: 'Prisma multi-file schema feature allows modularizing domain models across clean separate files in the prisma/schema directory.',
        whyAr: 'تتيح تقسيم النماذج عبر ملفات .prisma مستقلة ونظيفة داخل مجلد prisma/schema لسهولة الصيانة في المشاريع الكبرى.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين Nullable Fields (?) و Optional Defaults في Prisma وما هو أثرها على أعمدة SQL الناتجة؟',
    interviewA: 'الحقل المنتهي بعلامة استفهام name String? يُترجم في SQL إلى عمود يقبل NULL (NULLABLE Column). أما الحقل الذي يمتلك قيمة افتراضية role Role @default(USER) بدون علامة استفهام، فإنه يُترجم في SQL إلى NOT NULL مع قيد DEFAULT \'USER\'. في كود TypeScript: كلاهما يكون اختيارياً عند إنشاء السجل prisma.user.create({ data: { email } })، لكن عند القراءة: الحقل الأول قد يعيد null، بينما الحقل الثاني مضمون أنه لن يعيد null أبداً (Type-Safe Non-Null).'
  },
  {
    slug: 'client-crud',
    title: 'Prisma Client CRUD: Type-Safe Queries, Filtering, Pagination & Partial Selection',
    titleAr: 'عمليات الـ CRUD في Prisma Client: الاستعلامات الآمنة، الفلاتر المركبة والترقيم بـ Cursor Pagination',
    level: 1,
    order: 4,
    estMinutes: 30,
    version: 'Prisma 7 Client',
    pattern: 'Type-Safe Data Access & Cursor Pagination',
    objectives: [
      'إتقان دوال الاستعلام الأساسية: findUnique, findFirst, findMany, create, update, delete, و upsert.',
      'بناء فلاتر الاستعلام المركبة باستخدام مشغلات AND, OR, NOT, contains, و in.',
      'تطبيق الترقيم فائق السرعة بالمؤشرات (Cursor-based Pagination) وتجنب بطء Offset Pagination.',
      'استخدام خاصية select و include لاسترجاع الحقول المطلوبة فقط وتجنب سحب البيانات الزائدة.'
    ],
    problemOpening: `
      في معظم أطر عمل الـ ORM التقليدية (مثل TypeORM أو Sequelize القديمة)، عندما تكتب استعلاماً، لا يعرف TypeScript شكل البيانات الراجعة؛ فتضطر لكتابة <code dir="ltr">as UserResponse</code> يدوياً، ولو تغير اسم حقل في الداتابيز، لن ينبهك المحرر وسينهار التطبيق في الإنتاج!
      **Prisma Client** أحدث ثورة في الـ Type Safety:
      إذا كتبت <code dir="ltr">prisma.user.findUnique({ where: { id }, select: { id: true, email: true } })</code>، فإن محرك TypeScript يستنتج تلقائياً أن الناتج هو كائن يحتوي فقط على <code dir="ltr">{ id: string, email: string }</code>! لو حاولت كتابة <code dir="ltr">user.password</code> سيعطيك المحرر خطأ أحمر فوري في نفس اللحظة!
      بالإضافة إلى ذلك، يوفر Prisma Client حلاً لأكبر مشكلة في الترقيم: تجنب بطء <code dir="ltr">skip: 50000</code> الذي يجبر قاعدة البيانات على مسح 50,000 صف، واستبداله بـ **Cursor-based Pagination** الذي يقفز مباشرة للصف التالي في 1ms.
      في هذا الدرس، هنتعلم أسرار استعلامات Prisma Client، إزاي نستخدم <code dir="ltr">upsert</code>، وإزاي نبني ترقيم صفحات احترافي لا نهائي (Infinite Scroll).
    `,
    mechanics: [
      { step: '01', title: 'الاستعلام الفردي بـ findUnique مقابل findFirst', desc: 'دالة findUnique تستقبل فقط الحقول المعرفة كـ @id أو @unique في المخطط لضمان استخدام فهارس الفرادة؛ بينما findFirst تقبل أي شروط عادية.' },
      { step: '02', title: 'التحديد الجزئي للحقول بـ select', desc: 'استرجاع الأعمدة المطلوبة فقط من قاعدة البيانات لتقليل استهلاك الذاكرة وتوفير استجابة TypeScript دقيقة للحقول المختارة.' },
      { step: '03', title: 'التحديث أو الإنشاء الذري بـ upsert', desc: 'البحث عن السجل؛ فإذا كان موجوداً يتم تطبيق update، وإذا لم يكن موجوداً يتم تطبيق create في خطوة ذرية واحدة.' },
      { step: '04', title: 'الترقيم بالمؤشر (Cursor-based Pagination)', desc: 'استخدام cursor: { id: lastSeenId } مع take: 20 للقفز الفوري للصفوف التالية بدون أي مسح للصفحات السابقة.' },
      { step: '05', title: 'الفلاتر المنطقية المعقدة (AND / OR / NOT)', desc: 'بناء استعلامات ديناميكية تجمع بين عدة شروط مع دعم البحث غير الحساس لحالة الأحرف mode: "insensitive".' }
    ],
    playgroundCode: `// محاكي الترقيم بالمؤشر (Cursor Pagination) في Prisma Client
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: \`usr_\${i + 1}\`,
  email: \`user\${i + 1}@codehub.dev\`,
  score: (i + 1) * 10
}));

function mockCursorPagination(cursorId, take = 3) {
  let startIndex = 0;
  if (cursorId) {
    const cursorIdx = mockUsers.findIndex(u => u.id === cursorId);
    startIndex = cursorIdx + 1; // البدء من العنصر التالي للمؤشر
  }
  
  const results = mockUsers.slice(startIndex, startIndex + take);
  const nextCursor = results.length === take ? results[results.length - 1].id : null;
  
  console.log(\`Fetched \${results.length} items using Cursor [\${cursorId || "START"}]. Next Cursor: [\${nextCursor}]\`);
  return { results, nextCursor };
}

const page1 = mockCursorPagination(null, 3);
const page2 = mockCursorPagination(page1.nextCursor, 3);`,
    experimentQuestion: 'لماذا يعتبر استخدام findUnique أسرع وأكثر أماناً من findFirst عند البحث بالمعرفات؟',
    experimentAnswer: 'دالة findUnique مجبرة ومحصورة على الحقول ذات الفهارس الفريدة فقط (Unique Constraints / Primary Keys)، مما يضمن لمحرك الاستعلامات استخدام Unique Index Scan فوري والرد في زمن 0.1ms، كما تضمن في TypeScript استرجاع مستند فردي مؤكد. أما findFirst فتسمح بأي حقل وقد تجري مسحاً شاملاً إذا لم يكن الحقل مفهرساً.',
    codeAnatomy: [
      { line: 'import { PrismaClient } from "@prisma/client";', note: 'استيراد عميل Prisma' },
      { line: 'const prisma = new PrismaClient();', note: 'إنشاء نسخة العميل' },
      { line: 'export async function getPaginatedPosts(cursorId, limit = 10) {', note: 'دالة الترقيم بالمؤشر' },
      { line: '  return await prisma.post.findMany({', note: 'استعلام البحث المتعدد' },
      { line: '    take: limit,', note: 'عدد العناصر المطلوبة' },
      { line: '    skip: cursorId ? 1 : 0, // تخطي المؤشر نفسه', note: 'تخطي عنصر البداية' },
      { line: '    cursor: cursorId ? { id: cursorId } : undefined,', note: 'تحديد نقطة الانطلاق' },
      { line: '    where: { isPublished: true },', note: 'شرط النشر' },
      { line: '    select: { id: true, title: true, createdAt: true }, // حقول محددة', note: 'انتقاء جزئي آمن' },
      { line: '    orderBy: { id: "asc" }', note: 'ترتيب متوافق مع المؤشر' },
      { line: '  });', note: 'نهاية الاستعلام' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع مسبب لبطء شديد: Offset Pagination في الجداول الكبيرة
await prisma.post.findMany({
  skip: 100000, // يجبر قاعدة البيانات على قراءة 100,000 صف وتجاهلها!
  take: 20
});`,
    pitfallGood: `// الحل الهندسي: Cursor-based Pagination السريع دائماً
await prisma.post.findMany({
  cursor: { id: lastPostId },
  take: 20,
  skip: 1
});`,
    pitfallDiagnosis: 'الـ Offset Pagination يجبر المحرك على مسح وتجاهل آلاف الصفوف السابقة، بينما Cursor Pagination يقفز للهدف مباشرة عبر الفهرس.',
    quizPool: [
      {
        q: 'Why does Prisma Client enforce that the "where" argument in findUnique() can ONLY contain unique or primary key fields?',
        qAr: 'لماذا تفرض Prisma Client أن يحتوي شرط findUnique() فقط على حقول المفاتيح الأساسية أو الفريدة؟',
        options: [
          'Guarantees at compile-time that the query matches at most one record, leveraging unique indexes for maximum query speed.',
          'To make the code shorter.',
          'Because PostgreSQL does not support non-unique fields.',
          'To prevent memory leaks.'
        ],
        correct: 0,
        why: 'Restricting findUnique to unique criteria guarantees deterministic single-record retrieval backed by unique B-Tree indexes.',
        whyAr: 'تقييد findUnique بالحقول الفريدة يضمن استرجاع سجل فردي مؤكد بالاعتماد على فهارس الفرادة السريعة.'
      },
      {
        q: 'What is the primary advantage of Cursor-based pagination over Offset-based pagination in Prisma?',
        qAr: 'ما هي الميزة الأساسية للترقيم بالمؤشر (Cursor Pagination) مقارنة بـ Offset Pagination؟',
        options: [
          'Constant O(1) performance regardless of dataset size by jumping directly to indexed cursor positions without scanning previous rows.',
          'It translates the query to GraphQL.',
          'It works without indexes.',
          'It eliminates the need for WHERE clauses.'
        ],
        correct: 0,
        why: 'Cursor pagination avoids scanning and skipping thousands of historical rows, maintaining constant sub-millisecond latency at scale.',
        whyAr: 'يحافظ على زمن استجابة ثابت وفائق السرعة O(1) مهما كان حجم البيانات بالقفز المباشر لنقطة المؤشر دون مسح الصفوف السابقة.'
      },
      {
        q: 'How does Prisma Client "select" option enhance TypeScript type safety and backend performance?',
        qAr: 'كيف يعزز خيار "select" في Prisma الأمان النوعي في TypeScript وأداء السيرفر؟',
        options: [
          'Fetches only specified columns from SQL, reducing network payload and automatically narrowing the inferred TypeScript return type.',
          'Encrypts selected fields.',
          'Runs the query in parallel threads.',
          'Compresses the response JSON.'
        ],
        correct: 0,
        why: 'Select optimizes the underlying SQL query while narrowing TypeScript types so accessing unselected fields triggers compile errors.',
        whyAr: 'يسترجع فقط الأعمدة المطلوبة من SQL ويضيق نوع TypeScript المستنتج تلقائياً لمنع قراءة حقول لم يتم جلبها.'
      },
      {
        q: 'What does the Prisma Client upsert() method execute when the record is NOT found in the database?',
        qAr: 'ما الذي تنفذه دالة upsert() في Prisma عند عدم العثور على السجل في قاعدة البيانات؟',
        options: [
          'Executes the "create" block to insert a brand new record atomically.',
          'Throws a record not found exception.',
          'Returns null.',
          'Deletes the table.'
        ],
        correct: 0,
        why: 'Upsert checks if the record exists; if found it executes "update", if absent it executes the "create" block atomically.',
        whyAr: 'تتحقق من وجود السجل؛ فإذا لم تجده تنفذ كتلة create لإنشاء سجل جديد تماماً في عملية ذرية واحدة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي خادمك من ثغرات استنزاف الذاكرة عند استخدام Prisma findMany() بدون تحديد take؟',
    interviewA: 'إذا استدعى مستخدم مسار /api/products بدون تمرير take، وقام الكود بتشغيل prisma.product.findMany()، فسيقوم Prisma بمحاولة سحب جميع صفوف الجدول (ربما 500,000 صف) وتحويلها لكائنات في الذاكرة، مما يسبب تجمد الـ Event Loop وانهيار الخادم بـ JavaScript heap out of memory! لحماية الخادم: نضع دائماً حداً أقصى إجبارياً في الباك إند: const take = Math.min(Number(req.query.limit) || 20, 100) لمنع أي استعلام من سحب أكثر من 100 سجل في الطلب الواحد أبداً.'
  },
  {
    slug: 'migrations-ci-cd',
    title: 'Database Migrations & CI/CD Pipelines: prisma migrate, migrate deploy & Drift Detection',
    titleAr: 'هجرات قواعد البيانات (Migrations) وخطوط الـ CI/CD: أوامر migrate و deploy واكتشاف الانجراف (Drift)',
    level: 2,
    order: 6,
    estMinutes: 35,
    version: 'Prisma 7 Migrations Engine',
    pattern: 'Schema Evolution & CI/CD Automation',
    objectives: [
      'فهم الفرق الجوهري بين npx prisma migrate dev (لبيئة التطوير) و npx prisma migrate deploy (لبيئات الإنتاج والـ CI/CD).',
      'تشريح ملفات هجرات SQL المولدة وجدول التتبع المركزي _prisma_migrations.',
      'كشف ومعالجة مشكلة انجراف قاعدة البيانات (Schema Drift Detection بـ prisma migrate diff).',
      'بناء خطوط نشر مؤتمتة (GitHub Actions CI/CD) تطبق الهجرات بأمان دون التسبب في انقطاع الخدمة (Zero-Downtime Migrations).'
    ],
    problemOpening: `
      في المشاريع الفردية، يستخدم المطور <code dir="ltr">prisma db push</code> لتحديث قاعدة البيانات فورياً.
      لكن تشغيل <code dir="ltr">prisma db push</code> في بيئة الإنتاج هو جريمة معمارية قد تؤدي لحذف جداول وبيانات المستخدمين بضغطة زر واحدة (Data Loss Incident)!
      في بيئات العمل الاحترافية وخطوط الـ CI/CD، يتم تطبيق التعديلات عبر **هجرات SQL موثقة (Database Migrations)**:
      - كل تعديل في <code dir="ltr">schema.prisma</code> يولد ملف هجرة SQL مؤرخاً في مجلد <code dir="ltr">prisma/migrations/</code>.
      - هذه الملفات يتم مراجعتها في الـ Pull Requests ورفعها لـ Git.
      - عند النشر للإنتاج، يقوم خط الـ CI/CD بتشغيل أمر **npx prisma migrate deploy** الذي يقرأ الملفات المعتمدة فقط ويطبقها بترتيب صارم ومسجل في جدول <code dir="ltr">_prisma_migrations</code>.
      في هذا الدرس، هنبني خط نشر متكامل بـ GitHub Actions، وهنتعلم إزاي نكتشف **Schema Drift** ونطبق استراتيجية التحديثات دون انقطاع الخدمة (**Zero-Downtime Expand/Contract Pattern**).
    `,
    mechanics: [
      { step: '01', title: 'توليد الهجرات بـ prisma migrate dev', desc: 'مقارنة المخطط بقاعدة البيانات وتوليد ملف migration.sql وتطبيقه محلياً وتحديث أنواع العميل تلقائياً.' },
      { step: '02', title: 'التطبيق الإنتاجي الصارم بـ prisma migrate deploy', desc: 'أمر خطوط الـ CI/CD الذي يطبق الهجرات المعلقة فقط دون توليد ملفات جديدة ودون طلب أي مدخلات تفاعلية.' },
      { step: '03', title: 'جدول التتبع الداخلي (_prisma_migrations)', desc: 'تسجيل تاريخ ووقت وبصمة التجزئة (Checksum) لكل ملف هجرة لضمان عدم تطبيق نفس الهجرة مرتين.' },
      { step: '04', title: 'كشف الانجراف بـ prisma migrate diff', desc: 'مقارنة بنية قاعدة البيانات الحقيقية مع ملف المخطط لاكتشاف التعديلات اليدوية غير المصرح بها (Drift).' },
      { step: '05', title: 'نمط التوسيع والانكماش (Expand/Contract Migration)', desc: 'تعديل أسماء الأعمدة على مرحلتين لمنع انهيار الخوادم القديمة أثناء عملية الـ Rolling Update.' }
    ],
    playgroundCode: `// محاكي خط أنابيب هجرات Prisma في CI/CD
class MockMigrationEngine {
  constructor() {
    this.appliedMigrations = new Set(["20260801_init_schema", "20260815_add_roles"]);
  }

  deployPendingMigrations(pendingFiles) {
    console.log("🚀 CI/CD Pipeline: Running [prisma migrate deploy]...");
    for (const file of pendingFiles) {
      if (!this.appliedMigrations.has(file)) {
        console.log(\`⚡ Applying Migration: [\${file}.sql] (Deterministic & Safe)\`);
        this.appliedMigrations.add(file);
      } else {
        console.log(\`⏭️ Migration already applied, skipping: [\${file}]\`);
      }
    }
    console.log("✅ Database schema is up to date with zero drift!");
  }
}

const engine = new MockMigrationEngine();
engine.deployPendingMigrations(["20260801_init_schema", "20260815_add_roles", "20260831_add_jsonb_metadata"]);`,
    experimentQuestion: 'لماذا يعتبر تشغيل "prisma migrate dev" أو "prisma db push" داخل خادم الإنتاج خطأً كارثياً؟',
    experimentAnswer: 'أمر migrate dev هو أمر تفاعلي لبيئة التطوير: لو وجد أي تعارض، قد يطلب إعادة تصفير قاعدة البيانات (Reset Database) وحذف كافة البيانات! كما أن db push يتجاوز ملفات الهجرة ويعدل الجداول فوراً مما قد يحذف أعمدة مهمة. الأمر الوحيد المسموح بتشغيله في الإنتاج والـ CI/CD هو prisma migrate deploy لأنه يطبق الهجرات المسجلة فقط بشكل غير تفاعلي وآمن بنسبة 100%.',
    codeAnatomy: [
      { line: '# .github/workflows/deploy.yml (CI/CD Migration Step)', note: 'خطوة النشر في GitHub Actions' },
      { line: '- name: Run Production Database Migrations', note: 'اسم الخطوة' },
      { line: '  run: npx prisma migrate deploy', note: 'تطبيق الهجرات الآمن' },
      { line: '  env:', note: 'متغيرات البيئة' },
      { line: '    DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}', note: 'رابط الإنتاج المحمي' },
      { line: '- name: Start Production Application Cluster', note: 'تشغيل الخوادم بعد اكتمال الهجرات' },
      { line: '  run: npm run start:prod', note: 'بدء تشغيل التطبيق' }
    ],
    pitfallBad: `// خطأ كارثي في الـ CI/CD: استخدام db push في الإنتاج
// RUN npx prisma db push --accept-data-loss
// يحذف الأعمدة المعدلة ويفقد بيانات العملاء دون أي سجل تراجع!`,
    pitfallGood: `// الحل الهندسي المعتمد
// RUN npx prisma migrate deploy
// يطبق الهجرات المعتمدة والمراجعة في الـ Pull Requests بأمان تام`,
    pitfallDiagnosis: 'أمر db push غير مخصص للإنتاج ويسبب فقدان البيانات، بينما migrate deploy يطبق الهجرات المؤرخة المعتمدة فقط.',
    quizPool: [
      {
        q: 'Which Prisma command must be used in production CI/CD pipelines to apply pending migrations safely?',
        qAr: 'أي أمر من أوامر Prisma يجب استخدامه في خطوط الـ CI/CD الإنتاجية لتطبيق الهجرات بأمان؟',
        options: ['npx prisma migrate deploy', 'npx prisma migrate dev', 'npx prisma db push', 'npx prisma generate'],
        correct: 0,
        why: '`prisma migrate deploy` applies pending migrations deterministically without generating files or prompting for interactive resets.',
        whyAr: 'أمر migrate deploy يطبق الهجرات المعلقة بشكل حتمي وغير تفاعلي وآمن تماماً لبيئات الإنتاج دون أي خطر لتصفير البيانات.'
      },
      {
        q: 'What is the function of the "_prisma_migrations" table created in your database?',
        qAr: 'ما هي وظيفة جدول "_prisma_migrations" المنشأ في قاعدة البيانات؟',
        options: [
          'Tracks which migration files have been applied, their exact execution timestamps, and checksum hashes to prevent duplicate runs.',
          'Stores user session cookies.',
          'Stores database passwords.',
          'Compresses SQL queries.'
        ],
        correct: 0,
        why: '_prisma_migrations maintains historical ledger and checksums to ensure migration scripts execute exactly once in sequence.',
        whyAr: 'يسجل سجلاً تاريخياً بالهجرات المطبقة وبصماتها وتواريخها لضمان عدم تكرار تنفيذ أي هجرة مرتين.'
      },
      {
        q: 'What is "Schema Drift" in database lifecycle management?',
        qAr: 'ماذا يعني مصطلح "Schema Drift" (انجراف المخطط) في إدارة قواعد البيانات؟',
        options: [
          'When the actual database structure diverges from the schema definitions (e.g. someone ran manual SQL alterations directly on production).',
          'When the database moves to another cloud provider.',
          'When table names are translated to Arabic.',
          'When data is deleted after 30 days.'
        ],
        correct: 0,
        why: 'Schema drift occurs when manual out-of-band schema changes break synchronization with source-controlled migration histories.',
        whyAr: 'يحدث عندما تختلف بنية قاعدة البيانات الحقيقية عن ملفات المخطط بسبب قيام شخص بتعديلات يدوية مباشرة على الداتابيز.'
      },
      {
        q: 'What is the Expand and Contract pattern in Zero-Downtime Database Migrations?',
        qAr: 'ما هو نمط التوسيع والانكماش (Expand & Contract) في تحديثات قواعد البيانات دون انقطاع الخدمة؟',
        options: [
          'A two-phase deployment: first adding new columns while maintaining old ones, then switching application traffic, and finally dropping old columns.',
          'Compressing and uncompressing the database hard drive.',
          'Restarting the server twice.',
          'Deleting all indexes temporarily.'
        ],
        correct: 0,
        why: 'Expand/Contract ensures old and new application versions remain compatible during rolling deployments before removing deprecated fields.',
        whyAr: 'استراتيجية من مرحلتين: إضافة الأعمدة الجديدة مع إبقاء القديمة حتى اكتمال الترقية ثم حذف القديمة لضمان عدم توقف الخدمة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة فشل هجرة إنتاجية في منتصف التنفيذ وظهور خطأ "Migration failed to apply cleanly"?',
    interviewA: '1. نفحص سجلات الـ CI/CD لمعرفة سبب فشل الهجرة بالتحديد (مثل وجود قيم NULL في عمود تم تحويله لـ NOT NULL). 2. نتصل بقاعدة البيانات ونفحص جدول _prisma_migrations ونصلح الخلل في بنية الـ SQL يدوياً. 3. نستخدم أمر npx prisma migrate resolve --rolled-back "migration_name" لإعلام Prisma بأن الهجرة تم التراجع عنها، أو --applied إذا قمنا بإكمالها يدوياً. 4. نصلح ملف الهجرة في الـ Git Repository ونعيد النشر بنظافة.'
  },
  {
    slug: 'relation-queries',
    title: 'Relational Queries: Nested Writes, Fluent API, Select vs Include & Filter Relations',
    titleAr: 'الاستعلامات العلائقية: الكتابة المتداخلة (Nested Writes)، واجهة Fluent API والفلترة العميقة',
    level: 2,
    order: 8,
    estMinutes: 35,
    version: 'Prisma 7 Relations',
    pattern: 'Relational Graph Traversal & Atomic Nested Mutations',
    objectives: [
      'إتقان علاقات 1-to-1, 1-to-Many, و Many-to-Many الصريحة والضمنية (Implicit vs Explicit Many-to-Many).',
      'تطبيق عمليات الكتابة المتداخلة الذرية (Nested Writes: create, connect, connectOrCreate, disconnect).',
      'فهم الفرق الجوهري بين include و select في جلب العلاقات وتفادي استهلاك الذاكرة.',
      'تصفية وفرز السجلات بناءً على علاقاتها الفرعية (Filtering on Relations بـ some, every, none).'
    ],
    problemOpening: `
      في أطر العمل التقليدية، لإنشاء مستخدم جديد ومعه مقال جديد وثلاثة وسوم (Tags) في خطوة واحدة، كنت تضطر لكتابة 4 استعلامات SQL منفصلة وربط الـ IDs يدوياً وإدارتها داخل Transaction معقدة!
      **Prisma Nested Writes** أحدثت نقلة نوعية في تجربة المطور:
      تتيح لك إنشاء المستخدم، ومقالاته، وربطه بوسوم موجودة بالفعل بـ <code dir="ltr">connect</code>، وإنشاء وسوم غير موجودة بـ <code dir="ltr">connectOrCreate</code>، كل ذلك في استدعاء دالة واحدة فائقة الأناقة والجمال، ويقوم Prisma بتنفيذها تلقائياً داخل **ACID Transaction** ذرية خلف الكواليس!
      بالإضافة إلى ذلك، توفر ميزة **Relation Filters** القدرة على كتابة استعلامات مذهلة مثل:
      "هات لي كل المستخدمين الذين يملكون على الأقل مقالاً واحداً منشوراَ (<code dir="ltr">some: { isPublished: true }</code>) ولا يملكون أي تعليقات محظورة (<code dir="ltr">none: { isBanned: true }</code>)"!
      في هذا الدرس، هنفكك المعمارية العلائقية في Prisma، وهنتعلم إزاي نبني علاقات Many-to-Many احترافية.
    `,
    mechanics: [
      { step: '01', title: 'العلاقات المتعددة الضمنية (Implicit Many-to-Many)', desc: 'تعريف علاقات متعددة إلى متعددة دون الحاجة لإنشاء جدول وسيط يدوياً؛ يقوم Prisma بإنشاء وإدارة جدول الربط _PostToTag تلقائياً.' },
      { step: '02', title: 'الكتابة المتداخلة الذرية (Nested Writes)', desc: 'إنشاء المستند الرئيسي ومستنداته التابعة في عملية واحدة create: { posts: { create: [...] } } داخل معاملة ذرية موحدة.' },
      { step: '03', title: 'الربط الذكي بـ connect و connectOrCreate', desc: 'ربط السجل بكيان موجود مسبقاً عبر مفتاحه الفريد، أو إنشاؤه تلقائياً إذا لم يكن موجوداً.' },
      { step: '04', title: 'التصفية العلائقية العميقة بـ some, every, none', desc: 'فحص شروط العلاقات الفرعية: some (تحقق شرط واحد على الأقل)، every (انطباق الشرط على الجميع)، none (عدم وجود أي تطابق).' },
      { step: '05', title: 'التنقل بالسلاسل عبر Fluent API', desc: 'الوصول للعلاقات الفردية بأسلوب السلاسل المباشر prisma.user.findUnique({ where }).profile().settings() بسرعة فائقة.' }
    ],
    playgroundCode: `// محاكي عمليات الكتابة المتداخلة (Nested Writes) في Prisma
const mockDb = { users: [], posts: [], tags: new Map([["tech", { id: "t1", name: "tech" }]]) };

function mockCreateUserWithPost(email, postTitle, tagName) {
  console.log("1. Starting Atomic Transaction for Nested Write...");
  
  // إنشاء المستخدم
  const user = { id: \`u_\${Date.now()}\`, email };
  mockDb.users.push(user);
  
  // connectOrCreate للوسم
  let tag = mockDb.tags.get(tagName);
  if (!tag) {
    tag = { id: \`t_\${Date.now()}\`, name: tagName };
    mockDb.tags.set(tagName, tag);
    console.log(\`📦 Created new Tag via connectOrCreate: [\${tagName}]\`);
  } else {
    console.log(\`🔗 Connected to existing Tag: [\${tagName}]\`);
  }

  // إنشاء المنشور المرتبط
  const post = { id: \`p_\${Date.now()}\`, title: postTitle, authorId: user.id, tagId: tag.id };
  mockDb.posts.push(post);

  console.log("✅ Nested Write completed atomically across 3 tables!");
  return { user, post, tag };
}

mockCreateUserWithPost("sara@codehub.dev", "Prisma 7 Architecture", "tech");`,
    experimentQuestion: 'لماذا لا يسمح لك Prisma Client باستخدام خاصيتي "select" و "include" معاً في نفس مستوى الاستعلام؟',
    experimentAnswer: 'لأن select تحدد بدقة الأعمدة التي يجب إرجاعها (Explicit Projection)، بينما include تجلب جميع أعمدة الجدول الرئيسي وتضيف إليها العلاقات المحددة. الجمع بينهما يخلق تناقضاً منطقياً في الـ Type Inference الخاص بـ TypeScript! الحل إذا أردت جلب حقول معينة مع علاقات فرعية هو وضع العلاقات داخل select نفسها: select: { id: true, posts: { select: { title: true } } }.',
    codeAnatomy: [
      { line: 'await prisma.user.create({', note: 'إنشاء مستخدم مع علاقات متداخلة' },
      { line: '  data: {', note: 'بيانات السجل' },
      { line: '    email: "sarah@codehub.dev",', note: 'بريد المستخدم' },
      { line: '    profile: { create: { bio: "Senior Backend Engineer" } }, // 1-to-1', note: 'إنشاء الملف الشخصي' },
      { line: '    posts: {', note: '1-to-Many' },
      { line: '      create: [{', note: 'إنشاء مقال متداخل' },
      { line: '        title: "Mastering Prisma 7",', note: 'عنوان المقال' },
      { line: '        tags: {', note: 'Many-to-Many' },
      { line: '          connectOrCreate: {', note: 'الربط أو الإنشاء الذري للوسم' },
      { line: '            where: { slug: "database" },', note: 'شرط البحث الفريد' },
      { line: '            create: { name: "Database", slug: "database" }', note: 'بيانات الإنشاء عند الغياب' },
      { line: '          }', note: 'نهاية connectOrCreate' },
      { line: '        }', note: 'نهاية الوسوم' },
      { line: '      }]', note: 'نهاية المقالات' },
      { line: '    }', note: 'نهاية المنشورات' },
      { line: '  }', note: 'نهاية البيانات' },
      { line: '});', note: 'نهاية الاستعلام الذري' }
    ],
    pitfallBad: `// خطأ شائع: محاولة دمج select و include في نفس المستوى
await prisma.user.findMany({
  select: { id: true, email: true },
  include: { posts: true } // خطأ TypeScript: Cannot use both 'select' and 'include' at the same level!
});`,
    pitfallGood: `// الحل الصحيح: تضمين العلاقات داخل select مباشرة
await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    posts: { select: { id: true, title: true } } // Type-Safe Nested Select
  }
});`,
    pitfallDiagnosis: 'الجمع بين select و include يسبب تعارضاً في تحديد شكل الكائن، واستخدام Nested Select يوفر أعلى درجات النقاء والدقة.',
    quizPool: [
      {
        q: 'What is the atomic behavior of Prisma Nested Writes (e.g. creating a user and their posts in one mutation)?',
        qAr: 'ما هو السلوك الذري لعمليات الكتابة المتداخلة (Nested Writes) في Prisma؟',
        options: [
          'Executes all nested operations inside a single automatic ACID transaction; if any sub-operation fails, the entire mutation rolls back.',
          'Executes operations in parallel without transaction protection.',
          'Saves data to a temporary file.',
          'Deletes existing records first.'
        ],
        correct: 0,
        why: 'Nested writes automatically wrap operations in a database transaction, guaranteeing all-or-nothing atomicity.',
        whyAr: 'تغلف كافة العمليات المتداخلة تلقائياً داخل معاملة ACID موحدة تضمن التراجع الكامل في حال فشل أي عملية فرعية.'
      },
      {
        q: 'How does the "connectOrCreate" nested mutation operator function in Prisma?',
        qAr: 'كيف يعمل مشغل "connectOrCreate" في عمليات الكتابة المتداخلة بـ Prisma؟',
        options: [
          'Attempts to find and link an existing record matching a unique condition; if not found, inserts a new record with the create payload.',
          'Deletes the record if it exists.',
          'Throws an error if the record already exists.',
          'Creates a duplicate copy of the record.'
        ],
        correct: 0,
        why: 'connectOrCreate provides idempotent relationship linking, seamlessly connecting existing records or generating new ones.',
        whyAr: 'يوفر ربطاً آمناً: يبحث عن السجل لربطه، وإذا لم يجده ينشئه تلقائياً دون تكرار أو أخطاء تعارض.'
      },
      {
        q: 'Which relation filter quantifier matches parent records where EVERY related child satisfies a given condition?',
        qAr: 'أي محدد كمي في الفلاتر العلائقية يطابق السجلات التي تحقق فيها كُل العناصر الفرعية شرطاً محدداً؟',
        options: ['every', 'some', 'none', 'all_match'],
        correct: 0,
        why: 'The `every` quantifier ensures that all related records for a relation satisfy the specified criteria.',
        whyAr: 'المشغل `every` يضمن انطباق الشرط المحدد على جميع السجلات المرتبطة بلا استثناء.'
      },
      {
        q: 'What is an Implicit Many-to-Many relation in Prisma Schema?',
        qAr: 'ما هي العلاقة المتعددة إلى متعددة الضمنية (Implicit Many-to-Many) في Prisma؟',
        options: [
          'A many-to-many relationship where Prisma automatically manages the underlying join table without requiring an explicit join model.',
          'A relation without foreign keys.',
          'A relation between different databases.',
          'A relation that expires after 24 hours.'
        ],
        correct: 0,
        why: 'Implicit relations let Prisma handle join table schema generation and maintenance behind the scenes automatically.',
        whyAr: 'علاقة تدير فيها Prisma جدول الربط الوسيط تلقائياً في قاعدة البيانات دون الحاجة لتعريف نموذج وسيط يدوي.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: متى يجب عليك التخلي عن Implicit Many-to-Many والتحول إلى Explicit Many-to-Many مع نموذج وسيط مخصص في Prisma؟',
    interviewA: 'الـ Implicit Many-to-Many ممتازة عندما لا تحتاج لتخزين أي بيانات إضافية في علاقة الربط سوى الـ Foreign Keys (مثل User و Tag). لكن عندما يتطلب نظامك تخزين بيانات وصفية على العلاقة نفسها (مثل: تاريخ انضمام العضو للمجموعة role: "admin", joinedAt: DateTime, assignedBy: String داخل نموذج UserGroup)، يصبح إنشاء Explicit Join Model أمراً حتمياً لتتمكن من الوصول لهذه الحقول الإضافية وتعديلها.'
  },
  {
    slug: 'transactions-optimistic',
    title: 'Prisma Transactions & Concurrency: Interactive Transactions ($transaction) & Optimistic Locking',
    titleAr: 'المعاملات والتزامن في Prisma: المعاملات التفاعلية ($transaction) والقفل التفاؤلي (Optimistic Locking)',
    level: 3,
    order: 10,
    estMinutes: 35,
    version: 'Prisma 7 Transactions',
    pattern: 'Interactive ACID & Optimistic Concurrency Control',
    objectives: [
      'التمييز بين المعاملات المتسلسلة (Sequential $transaction([op1, op2])) والمعاملات التفاعلية (Interactive $transaction(async tx => {})).',
      'تطبيق نمط القفل التفاؤلي (Optimistic Locking) باستخدام حقل رقم الإصدار version لمنع تعارض التعديلات المتزامنة.',
      'ضبط إعدادات مهلة المعاملات وعزلها { maxWait: 5000, timeout: 10000, isolationLevel: "Serializable" }.',
      'إدارة أخطاء P2025 (Record to update not found) ومعالجة التراجع التلقائي (Rollback).'
    ],
    problemOpening: `
      في الأنظمة الإنتاجية الكبرى، المعاملات الذرية البسيطة ليست كافية عندما تحتاج لتنفيذ منطق برمجي معقد يعتمد على قراءة بيانات واتخاذ قرارات شرطية قبل الحفظ:
      تخيل نظام حجز تذاكر حفلات:
      1. تقرأ عدد التذاكر المتبقية.
      2. إذا كانت التذاكر المتبقية > 0، تخصم تذكرة وتنشئ سجل دفع.
      3. إذا كانت التذاكر = 0، ترفض العملية وتعتذر للمستخدم.
      في **Prisma Interactive Transactions**، تتيح لك دالة <code dir="ltr">prisma.$transaction(async (tx) => {})</code> تمرير نسخة عميل تفاعلية <code dir="ltr">tx</code> تضمن تنفيذ كل العمليات الشرطية داخل نفس اتصال قاعدة البيانات المقفول بـ ACID!
      بالإضافة إلى ذلك، في الأنظمة التي تفضل تجنب أقفال قواعد البيانات الثقيلة (High Concurrency APIs)، نطبق نمط **القفل التفاؤلي (Optimistic Concurrency Control)** باستخدام حقل <code dir="ltr">version</code>.
      في هذا الدرس، هنبني نظام دفع بنكي منيع، وهنتعلم إزاي نتحكم في مستويات العزل وضبط مهلات الـ Timeouts.
    `,
    mechanics: [
      { step: '01', title: 'المعاملات المتسلسلة بـ $transaction([queries])', desc: 'تمرير مصفوفة استعلامات لتنفيذها دفعة واحدة في رحلة شبكية موحدة؛ إما أن تنجح جميعها أو تفشل جميعها.' },
      { step: '02', title: 'المعاملات التفاعلية بـ $transaction(async tx => {})', desc: 'تنفيذ كود جافاسكريبت ومنطق شرطي داخل سياق المعاملة مع استخدام كائن tx الممرر حصراً.' },
      { step: '03', title: 'نمط القفل التفاؤلي بـ Version Field', desc: 'تحديث السجل بشرط تطابق رقم الإصدار where: { id, version: currentVersion } وزيادة الإصدار version: { increment: 1 }.' },
      { step: '04', title: 'ضبط خيارات المعاملة (Timeouts & Isolation)', desc: 'تحديد الحد الأقصى لانتظار الاتصال maxWait وزمن انتهاء المعاملة timeout لمنع تعليق الخادم.' },
      { step: '05', title: 'معالجة التراجع التلقائي (Automatic Rollback)', desc: 'أي استثناء أو Error يتم رميه داخل دالة الـ transaction يؤدي فوراً للتراجع التام وإلغاء التعديلات.' }
    ],
    playgroundCode: `// محاكي القفل التفاؤلي (Optimistic Concurrency Control) في Prisma
class MockProductStore {
  constructor() {
    this.product = { id: "p1", name: "MacBook Pro", stock: 10, version: 1 };
  }

  async purchaseWithOptimisticLock(quantity, expectedVersion) {
    console.log(\`Attempting purchase: Checking if version === \${expectedVersion}\`);
    
    // شرط القفل التفاؤلي: هل تم تعديل السجل بواسطة عميل آخر؟
    if (this.product.version !== expectedVersion) {
      throw new Error("🚨 CONCURRENCY CONFLICT: Record was modified by another user! Please refresh.");
    }

    if (this.product.stock < quantity) throw new Error("Out of Stock!");

    // تعديل ذري وزيادة رقم الإصدار
    this.product.stock -= quantity;
    this.product.version += 1;
    console.log(\`✅ Purchase Successful! New Stock: \${this.product.stock}, New Version: \${this.product.version}\`);
    return this.product;
  }
}

const store = new MockProductStore();
await store.purchaseWithOptimisticLock(2, 1); // Success (v1 -> v2)
try {
  await store.purchaseWithOptimisticLock(1, 1); // Conflict! Expected v1 but is v2
} catch (e) {
  console.log(e.message);
}`,
    experimentQuestion: 'ماذا يحدث إذا قمت باستدعاء prisma.user.create() العادية بدلاً من استخدام كائن tx.user.create() داخل دالة $transaction التفاعلية؟',
    experimentAnswer: 'كائن prisma الأصلي يفتح اتصالاً عادياً منفصلاً خارج سياق المعاملة! إذا نفذت به عمليات، فلن تكون جزءاً من المعاملة، ولن تلتزم بمستوى العزل، والأخطر: إذا حدث Rollback للمعاملة، فلن يتم التراجع عن العمليات التي تمت بـ prisma وستتلف البيانات! يجب دائماً استخدام كائن tx الممرر حصراً داخل دالة المعاملة.',
    codeAnatomy: [
      { line: 'export async function checkoutOrder(userId, total, items) {', note: 'دالة إتمام الشراء' },
      { line: '  return await prisma.$transaction(async (tx) => {', note: '1. بدء المعاملة التفاعلية' },
      { line: '    const wallet = await tx.wallet.findUnique({ where: { userId } });', note: 'قراءة الرصيد عبر tx' },
      { line: '    if (!wallet || wallet.balance < total) throw new Error("Insufficient Balance");', note: 'فحص الرصيد' },
      { line: '    await tx.wallet.update({', note: 'خصم الرصيد' },
      { line: '      where: { userId }, data: { balance: { decrement: total } }', note: 'خصم ذري' },
      { line: '    });', note: 'نهاية الخصم' },
      { line: '    const order = await tx.order.create({', note: 'إنشاء الفاتورة' },
      { line: '      data: { userId, total, items: { create: items } }', note: 'إنشاء متداخل' },
      { line: '    });', note: 'نهاية الإنشاء' },
      { line: '    return order; // 2. تأكيد المعاملة تلقائياً', note: 'Commit ناجح' },
      { line: '  }, { maxWait: 3000, timeout: 8000 }); // 3. ضبط المهلات', note: 'إعدادات الأمان' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ كارثي: استخدام prisma بدلاً من tx داخل دالة $transaction
await prisma.$transaction(async (tx) => {
  await tx.wallet.update(...);
  await prisma.order.create(...); // خطأ فادح: ينفذ خارج المعاملة ولن يتراجع عنه عند الخطأ!
});`,
    pitfallGood: `// الحل الصحيح: استخدام كائن tx في جميع العمليات بلا استثناء
await prisma.$transaction(async (tx) => {
  await tx.wallet.update(...);
  await tx.order.create(...); // يضمن العزل والتراجع التام
});`,
    pitfallDiagnosis: 'استخدام عميل prisma العام يتجاوز اتصال المعاملة المفتوح ويلغي حماية الـ Rollback، والواجب استخدام كائن tx فقط.',
    quizPool: [
      {
        q: 'What is the critical rule regarding the client instance used inside a Prisma Interactive Transaction ($transaction(async tx => ...))?',
        qAr: 'ما هي القاعدة الصارمة المتعلقة بنسخة العميل المستخدمة داخل معاملات Prisma التفاعلية؟',
        options: [
          'All database operations MUST be executed using the injected `tx` client instance, NOT the global `prisma` instance.',
          'You must use raw SQL only.',
          'You must call tx.commit() manually.',
          'Only one query is allowed.'
        ],
        correct: 0,
        why: 'The `tx` instance encapsulates the active transaction connection; calls to global `prisma` bypass the transaction boundary.',
        whyAr: 'كائن `tx` هو الذي يحمل اتصال المعاملة النشط؛ واستخدام `prisma` العام يتجاوز المعاملة ويفقد حماية الـ Rollback.'
      },
      {
        q: 'How does Optimistic Concurrency Control (Optimistic Locking) work in Prisma?',
        qAr: 'كيف يعمل نمط القفل التفاؤلي (Optimistic Locking) في Prisma؟',
        options: [
          'Appends an integer version field to queries (where: { id, version }), failing the update if another transaction changed the version first.',
          'Locks the entire table indefinitely.',
          'Encrypts the row during reads.',
          'Restarts the database on conflict.'
        ],
        correct: 0,
        why: 'Optimistic locking assumes conflicts are rare, checking that the version has not incremented before committing updates.',
        whyAr: 'يفترض ندرة التعارضات، ويفحص تطابق رقم الإصدار version قبل التعديل ويرمي خطأ إذا تم تعديل السجل بواسطة عميل آخر.'
      },
      {
        q: 'What error does Prisma throw when an update with a specific where condition (e.g. version mismatch in optimistic lock) finds no matching record?',
        qAr: 'ما هو كود الخطأ الذي يرميه Prisma عندما يفشل التحديث لعدم تطابق شرط where (مثل اختلاف رقم الإصدار)؟',
        options: ['P2025 (Record to update not found)', 'P2002 (Unique constraint failed)', 'P1001 (Can\'t reach database)', 'P2000 (Value too long)'],
        correct: 0,
        why: 'Error code P2025 indicates that the target record matching the where criteria was not found, signaling concurrency conflict in optimistic locking.',
        whyAr: 'كود P2025 يشير لعدم العثور على السجل المطابق لشروط البحث مما يدل على حدوث تعارض تزامن في القفل التفاؤلي.'
      },
      {
        q: 'What parameters can be configured in the options object of Prisma interactive transactions?',
        qAr: 'ما هي المعايير التي يمكن ضبطها في خيارات معاملات Prisma التفاعلية؟',
        options: [
          'maxWait (connection acquisition timeout), timeout (transaction execution timeout), and isolationLevel.',
          'Database password and port.',
          'CSS stylesheets.',
          'Font family.'
        ],
        correct: 0,
        why: 'Configuring maxWait, timeout, and isolationLevel prevents runaway transaction locks and manages database load.',
        whyAr: 'تتيح ضبط مهلة انتظار الاتصال maxWait وزمن انتهاء المعاملة timeout ومستوى العزل لمنع تعليق الخادم.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: متى تختار القفل التفاؤلي (Optimistic Locking) ومتى تختار القفل التشاؤمي (Pessimistic Locking بـ $queryRaw FOR UPDATE) في الأنظمة عالية الأحمال؟',
    interviewA: 'نختار القفل التفاؤلي (Optimistic): عندما تكون نسبة التعديل المتزامن على نفس السجل نادرة (< 5% مثل تعديل الملفات الشخصية)، وهو ممتاز لأنه لا يفرض أي أقفال على الداتابيز ويحقق أقصى سرعة قراءة. نختار القفل التشاؤمي (Pessimistic): عندما تكون المنافسة شرسة ومؤكدة على مورد واحد في نفس الثانية (High Contention مثل بيع تذاكر حفل تنفد في 10 ثوانٍ أو مزادات حية)، لأن القفل التفاؤلي سيفشل 95% من الطلبات ويعيد المحاولات مما يرهق الـ CPU، بينما القفل التشاؤمي يصف الطلبات في طابور محكم.'
  },
  {
    slug: 'raw-sql-extensions',
    title: 'Raw SQL Escaping ($queryRaw) & Prisma Client Extensions ($extends)',
    titleAr: 'استعلامات SQL المباشرة ($queryRaw) وتوسيع عميل Prisma بـ ($extends)',
    level: 3,
    order: 11,
    estMinutes: 35,
    version: 'Prisma 7 Extensions',
    pattern: 'Type-Safe Raw SQL & Client Plugins',
    objectives: [
      'تنفيذ استعلامات SQL المتقدمة بأمان تام ضد ثغرات SQL Injection باستخدام وسوم $queryRaw المعالجة بالـ Tagged Templates.',
      'تشريح الفرق بين $queryRaw (الاستعلامات المجردة) و $executeRaw (أوامر التعديل والحذف وإرجاع عدد الصفوف).',
      'بناء إضافات Prisma Client Extensions المتقدمة باستخدام ميزة prisma.$extends().',
      'تطبيق ميزات الحسابات التلقائية (Computed Fields)، الخطافات المخصصة، وإدارة الـ Soft Delete مركزياً عبر Extensions.'
    ],
    problemOpening: `
      مهما كان الـ ORM قوياً ومرناً، ستأتي لحظة في مشروعك تحتاج فيها لتنفيذ استعلام SQL فائق التعقيد:
      - استعلام يستخدم دوال تحليلية متقدمة (Window Functions)، أو عمليات جغرافية مكانية بـ PostGIS، أو استعلامات شجرية بـ <code dir="ltr">WITH RECURSIVE</code> لا يدعمها الـ ORM بالصيغة القياسية!
      المطور المبتدئ يلجأ لكتابة String Concatenation يدوي: <code dir="ltr">prisma.$queryRawUnsafe(\`SELECT * FROM users WHERE id = '\${req.query.id}'\`)</code>، فيفتح ثغرة **SQL Injection** كارثية تدمر قاعدة البيانات!
      توفر Prisma واجهة **$queryRaw** القائمة على **Tagged Template Literals** التي تقوم بتحويل المتغيرات تلقائياً إلى معلمات استعلام آمنة (Parameterized Queries) مستحيلة الاختراق!
      بالإضافة إلى ذلك، توفر Prisma نظام إضافات خارق **Prisma Client Extensions ($extends)** يتيح لك إضافة وظائف جديدة لكل النماذج، بناء حقول محسوبة تلقائياً (Computed Fields)، وتطبيق الـ **Soft Delete** بنظافة مطلقة.
      في هذا الدرس، هنتعلم إزاي ندمج أقصى قوة لـ SQL مع أعلى معايير الأمان، وهنتعلم بناء Extensions احترافية.
    `,
    mechanics: [
      { step: '01', title: 'الأمان التلقائي بـ Tagged Templates ($queryRaw)', desc: 'استخدام prisma.$queryRaw\`SELECT * FROM users WHERE email = \${userEmail}\` لتحويل المدخلات إلى معاملات SQL Parameterized مجهزة تلقائياً.' },
      { step: '02', title: 'أوامر التعديل بـ $executeRaw', desc: 'تنفيذ أوامر DDL و DML التي لا تُرجع صفوفاً (مثل CREATE INDEX أو UPDATE ضخم) واسترجاع عدد الصفوف المتأثرة (affected count).' },
      { step: '03', title: 'الحقول المحسوبة بـ client.$extends({ result })', desc: 'إضافة خصائص جديدة لكائنات النماذج تُحسب تلقائياً في الذاكرة (مثل fullName: user.firstName + " " + user.lastName).' },
      { step: '04', title: 'تخصيص الدوال بـ client.$extends({ model })', desc: 'إضافة دوال مخصصة لكل نموذج مثل prisma.user.findByEmailOrThrow() لتوفير كود نظيف وقابل لإعادة الاستخدام.' },
      { step: '05', title: 'اعتراض العمليات بـ client.$extends({ query })', desc: 'بناء وسائط مركزية تعترض جميع استعلامات الـ find لتطبيق تصفية الحذف الناعم وحساب أزمنة التنفيذ تلقائياً.' }
    ],
    playgroundCode: `// محاكي حماية $queryRaw من ثغرات SQL Injection
function mockQueryRaw(strings, ...values) {
  const parameterizedSql = strings.reduce((acc, str, i) => {
    return acc + str + (i < values.length ? \`$\${i + 1}\` : "");
  }, "");

  console.log("Safe Parameterized SQL Statement:", parameterizedSql);
  console.log("Safely Escaped Parameters Array:", values);
  return { parameterizedSql, params: values };
}

const maliciousInput = "' OR '1'='1";
// تنفيذ الاستعلام بـ Tagged Template
mockQueryRaw\`SELECT * FROM accounts WHERE username = \${maliciousInput}\`;
// النتيجة: يتم تمرير المدخلات كـ $1 ولا يمكن للمهاجم كسر الاستعلام!`,
    experimentQuestion: 'لماذا يعتبر استخدام $queryRawUnsafe() خطيراً جداً، وما هي الحالة الوحيدة المبررة لاستخدامه؟',
    experimentAnswer: 'دالة $queryRawUnsafe تستقبل سلسلة نصية خام عادية دون تحويل المتغيرات إلى Parameters، مما يفتح الباب واسعاً لثغرات SQL Injection إذا تم تمرير مدخلات من المستخدم. الحالة الوحيدة المبررة لاستخدامه هي عندما تكون أسماء الجداول أو الأعمدة نفسها متغيرة ديناميكياً (Dynamic Table/Column Names) لأن بروتوكول SQL لا يسمح بتمرير أسماء الجداول كـ Parameters، ويجب حينها تطهير أسماء الجداول بقائمة بيضاء صارمة (Whitelist) مسبقاً.',
    codeAnatomy: [
      { line: 'import { PrismaClient, Prisma } from "@prisma/client";', note: 'استيراد عميل Prisma' },
      { line: 'const prisma = new PrismaClient().$extends({', note: 'توسيع العميل بـ Extension' },
      { line: '  result: {', note: 'إضافة حقول محسوبة' },
      { line: '    user: {', note: 'نموذج المستخدم' },
      { line: '      fullName: {', note: 'حقل محسوب جديد' },
      { line: '        needs: { firstName: true, lastName: true },', note: 'الحقول المطلوبة للحساب' },
      { line: '        compute(user) { return `${user.firstName} ${user.lastName}`; }', note: 'دالة الحساب' },
      { line: '      }', note: 'نهاية الحقل' },
      { line: '    }', note: 'نهاية المستخدم' },
      { line: '  }', note: 'نهاية result' },
      { line: '});', note: 'نهاية التوسيع' }
    ],
    pitfallBad: `// خطأ أمني كارثي: SQL Injection عبر $queryRawUnsafe مع دمج النصوص
const users = await prisma.$queryRawUnsafe(
  \`SELECT * FROM users WHERE email = '\${req.body.email}'\` // يتيح سحب قاعدة البيانات بالكامل للمخترق!
);`,
    pitfallGood: `// الحل الهندسي المعتمد: استخدام $queryRaw مع Tagged Template
const users = await prisma.$queryRaw\`
  SELECT * FROM users WHERE email = \${req.body.email}
\`;`,
    pitfallDiagnosis: 'الدمج النصي المباشر يلغي حماية المتغيرات ويفتح ثغرات حقن SQL، بينما $queryRaw يضمن التحويل التلقائي لـ Parameters مشفرة.',
    quizPool: [
      {
        q: 'How does Prisma\'s "$queryRaw" tagged template syntax protect against SQL Injection vulnerabilities?',
        qAr: 'كيف تحمي صياغة "$queryRaw" القائمة على Tagged Templates من ثغرات حقن SQL؟',
        options: [
          'Automatically extracts interpolated variables into parameterized query values ($1, $2) rather than concatenating raw text.',
          'Encrypts the query with HTTPS.',
          'Converts SQL queries to MongoDB syntax.',
          'Deletes special characters from strings.'
        ],
        correct: 0,
        why: 'Tagged template literals pass variables separately to the database engine as parameterized inputs, rendering injection impossible.',
        whyAr: 'تفصل المتغيرات تلقائياً وتمررها لمحرك قاعدة البيانات كمعاملات مشفرة منفصلة ($1, $2) مما يمنع التلاعب بالاستعلام نهائياً.'
      },
      {
        q: 'What is the primary difference between "$queryRaw" and "$executeRaw" in Prisma Client?',
        qAr: 'ما هو الفرق الأساسي بين "$queryRaw" و "$executeRaw" في Prisma Client؟',
        options: [
          '$queryRaw returns database row records (e.g. for SELECT); $executeRaw returns the number of affected rows (e.g. for UPDATE/DELETE).',
          '$executeRaw only works on Windows.',
          '$queryRaw is obsolete in Prisma 7.',
          'There is no difference.'
        ],
        correct: 0,
        why: '$queryRaw deserializes returned tuples into JavaScript objects; $executeRaw returns the integer count of modified rows.',
        whyAr: 'استعلام $queryRaw يرجع سجلات وصفوف البيانات (مثل SELECT)، بينما $executeRaw يرجع رقم عدد الصفوف المتأثرة (مثل UPDATE).'
      },
      {
        q: 'What capability does Prisma Client Extensions ($extends) provide?',
        qAr: 'ما هي الإمكانية التي يوفرها نظام Prisma Client Extensions ($extends)؟',
        options: [
          'Extends the Prisma Client with custom methods, computed fields, and query-level middleware without modifying core generated code.',
          'Connects Prisma to CSS frameworks.',
          'Translates schemas into Python.',
          'Generates mobile user interfaces.'
        ],
        correct: 0,
        why: '$extends is Prisma\'s official plugin architecture for adding computed fields, model helpers, and query hooks cleanly.',
        whyAr: 'هو نظام الإضافات الرسمي في Prisma لإضافة حقول محسوبة ودوال مخصصة واعتراض الاستعلامات بنظافة دون تعديل الكود المولد.'
      },
      {
        q: 'How can you map a Raw SQL query output to a strongly-typed TypeScript interface using Prisma?',
        qAr: 'كيف يمكنك ربط مخرجات استعلام Raw SQL بواجهة TypeScript ذات أنواع صارمة في Prisma؟',
        options: [
          'By passing the generic type parameter: await prisma.$queryRaw<UserSummary[]>`SELECT ...`',
          'By renaming the database table.',
          'TypeScript cannot type raw SQL.',
          'Using express.json().'
        ],
        correct: 0,
        why: '$queryRaw supports generic type arguments to strongly type the returned array of row objects in TypeScript.',
        whyAr: 'يدعم $queryRaw تمرير Generic Type مثل $queryRaw<UserSummary[]> لضمان Type Safety كامل للنتائج في كود التطبيق.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ امتداد Prisma Client Extension لتطبيق ميزة Multi-Tenancy وحجب بيانات كل شركة (Tenant Isolation) تلقائياً في كل استعلام؟',
    interviewA: 'ننشئ Extension باستخدام $extends({ query: { $allModels: { async $allOperations({ model, operation, args, query }) { ... } } } }): نقوم باعتراض كافة عمليات البحث والكتابة وحقن شرط tenantId: currentTenantId تلقائياً داخل كائن args.where قبل تمرير الاستعلام للمحرك. هذا يضمن استحالة تسريب بيانات شركة لشركة أخرى حتى لو نسي المطور كتابة شرط الفلترة في مساراته (Defense in Depth).'
  },
  {
    slug: 'middleware-logging',
    title: 'Prisma Client Logging, OpenTelemetry Tracing & Query Event Metrics',
    titleAr: 'سجلات وأداء Prisma Client: تتبع الاستعلامات بـ OpenTelemetry، أحداث الـ Logging والتحليلات',
    level: 2,
    order: 12,
    estMinutes: 30,
    version: 'Prisma 7 Tracing',
    pattern: 'Observability & OpenTelemetry Instrumentation',
    objectives: [
      'تكوين مستويات السجلات في PrismaClient: info, warn, error, و query events.',
      'اعتراض وتحليل أحداث الاستعلامات بطيئة الأداء ($on("query")) وقياس زمن التنفيذ بالمللي ثانية.',
      'دمج نظام التتبع الموزع المفتوح OpenTelemetry (OTel) مع أدوات الرصد (Datadog, Jaeger, Grafana).',
      'حماية البيانات الحساسة من التسريب في سجلات الـ Production Logs.'
    ],
    problemOpening: `
      في بيئات الإنتاج، عندما يشتكي عميل من بطء تحميل صفحته واستغراقها 3 ثوانٍ، كيف تعرف أي استعلام قاعدة بيانات بالتحديد تسبب في هذا التأخير؟
      لو لم تكن تملك منظومة مراقبة (Observability & Tracing) دقيقة، ستظل تبحث في الظلام!
      يوفر **Prisma Client** نظام مراقبة متكامل عالي الأداء:
      1. إمكانية الاستماع لأحداث الاستعلامات الحية بـ <code dir="ltr">prisma.$on('query')</code> واستخراج جملة الـ SQL الدقيقة وزمن التنفيذ بالـ Duration (ms).
      2. الدعم الأصلي لمعيار **OpenTelemetry (OTel Tracing)**: يتيح تتبع رحلة الطلب بالكامل منذ دخوله مسار Express وحتى تنفيذه داخل PostgreSQL ورسم مخطط مائي كامل (Waterfall Trace) يوضح بالمللي ثانية أين ضاع الوقت.
      في هذا الدرس، هنبني طبقة مراقبة ورصد احترافية لخادمك، وهنتعلم إزاي نسجل الاستعلامات البطيئة في سجلات **Pino**.
    `,
    mechanics: [
      { step: '01', title: 'تكوين مستويات السجلات (Log Levels)', desc: 'تحديد log: [{ emit: "event", level: "query" }] للاستماع البرمجي لأحداث الاستعلامات.' },
      { step: '02', title: 'اصطياد الاستعلامات البطيئة بـ $on("query")', desc: 'تسجيل أي استعلام يتجاوز زمن تنفيذه e.duration > 100ms في نظام السجلات المركزي مع نص الـ SQL.' },
      { step: '03', title: 'تفعيل التتبع الموزع بـ OpenTelemetry', desc: 'تمكين previewFeatures = ["tracing"] في المخطط لتوليد Spans تلقائية متوافقة مع أنظمة Jaeger و Datadog.' },
      { step: '04', title: 'ربط سياق الطلب (Trace ID Context Propagation)', desc: 'ربط استعلامات قاعدة البيانات بـ Request ID الخاص بـ Express لتتبع كامل دورة حياة الطلب.' },
      { step: '05', title: 'تطهير المعاملات الحساسة في السجلات', desc: 'حجب كلمات المرور وأرقام البطاقات من السجلات قبل طباعتها لحماية خصوصية المستخدمين.' }
    ],
    playgroundCode: `// محاكي راصد الاستعلامات البطيئة في Prisma Client
class MockPrismaLogger {
  constructor(slowThresholdMs = 50) {
    this.slowThresholdMs = slowThresholdMs;
  }

  logQueryEvent(event) {
    if (event.duration >= this.slowThresholdMs) {
      console.warn(\`🚨 SLOW PRISMA QUERY DETECTED (\${event.duration}ms):\`);
      console.warn(\`   Target: [\${event.target}] | Query: \${event.query}\`);
      console.warn(\`   Params: \${JSON.stringify(event.params)}\`);
    } else {
      console.log(\`⚡ Fast Query (\${event.duration}ms): \${event.target}\`);
    }
  }
}

const logger = new MockPrismaLogger(50);
logger.logQueryEvent({ target: "User.findUnique", query: "SELECT * FROM users WHERE id = $1", duration: 2, params: ["u1"] });
logger.logQueryEvent({ target: "Order.findMany", query: "SELECT * FROM orders WHERE status = $1", duration: 180, params: ["pending"] });`,
    experimentQuestion: 'لماذا يجب تجنب تفعيل logging: ["query"] مع طباعة console.log في خوادم الإنتاج عالية الأحمال؟',
    experimentAnswer: 'طباعة كل استعلام في الـ Console ينشئ آلاف عمليات الإدخال والإخراج المتزامنة (Synchronous stdout writes) في Node.js، مما يحظر الـ Event Loop ويستهلك مساحة القرص الصلب في السيرفر بسرعة هائلة! في الإنتاج، نستخدم emit: "event" ونقوم بتسجيل الاستعلامات البطيئة فقط (Slow queries > 100ms) عبر مكتبة Logging لاتزامنية سريعة مثل Pino.',
    codeAnatomy: [
      { line: 'import { PrismaClient } from "@prisma/client";', note: 'استيراد العميل' },
      { line: 'export const prisma = new PrismaClient({', note: 'تهيئة العميل مع إعدادات الرصد' },
      { line: '  log: [', note: 'مصفوفة السجلات' },
      { line: '    { emit: "event", level: "query" },', note: 'إطلاق أحداث الاستعلام برمجياً' },
      { line: '    { emit: "stdout", level: "error" },', note: 'طباعة الأخطاء' },
      { line: '    { emit: "stdout", level: "warn" }', note: 'طباعة التحذيرات' },
      { line: '  ]', note: 'نهاية الإعدادات' },
      { line: '});', note: 'نهاية التهيئة' },
      { line: 'prisma.$on("query", (e) => {', note: 'الاستماع لأحداث الاستعلامات الحية' },
      { line: '  if (e.duration > 100) { // اصطياد الاستعلامات الأبطأ من 100ms', note: 'تصفية الاستعلامات البطيئة' },
      { line: '    logger.warn(`Slow Query [${e.duration}ms]: ${e.query}`, { params: e.params });', note: 'تسجيل منظم بـ Pino' },
      { line: '  }', note: 'نهاية الشرط' },
      { line: '});', note: 'نهاية المستمع' }
    ],
    pitfallBad: `// خطأ شائع: تسجيل كافة الاستعلامات بـ console.log في خادم الإنتاج
const prisma = new PrismaClient({ log: ["query"] }); // يغرق السجلات بآلاف الأسطر ويبطئ المعالج!`,
    pitfallGood: `// الحل الهندسي: استخدام emit: 'event' وفلترة الاستعلامات البطيئة فقط
const prisma = new PrismaClient({ log: [{ emit: "event", level: "query" }] });
prisma.$on("query", (e) => { if (e.duration > 100) logger.warn(e); });`,
    pitfallDiagnosis: 'السجلات غير المفلترة تستهلك موارد الخادم والقرص، بينما تسجيل الاستعلامات البطيئة يركز حصراً على الاختناقات الحقيقية.',
    quizPool: [
      {
        q: 'What is the primary benefit of OpenTelemetry (OTel) integration in Prisma Client?',
        qAr: 'ما هي الفائدة الأساسية لدمج معيار OpenTelemetry في Prisma Client؟',
        options: [
          'Generates standardized distributed trace spans for every database query, visualizing full request latency waterfalls in APM tools (e.g. Datadog, Jaeger).',
          'Encrypts SQL connections.',
          'Backs up the database hourly.',
          'Formats HTML pages.'
        ],
        correct: 0,
        why: 'OpenTelemetry provides end-to-end distributed tracing across microservices, isolating exact query latency bottlenecks in waterfall charts.',
        whyAr: 'يوفر تتبعاً موزعاً شاملاً عبر المايكروسيرفس ويرسم مخططات مائية توضح بدقة زمن كل استعلام وموقعه في رحلة الطلب.'
      },
      {
        q: 'What data is accessible inside a Prisma Client "$on(\'query\')" event listener?',
        qAr: 'ما هي البيانات المتاحة داخل مستمع أحداث "$on(\'query\')" في Prisma Client؟',
        options: [
          'The executed SQL query string, sanitized parameters, execution duration in milliseconds, and timestamp.',
          'User passwords in plaintext.',
          'The developer\'s IP address.',
          'The Node.js version only.'
        ],
        correct: 0,
        why: 'Query events contain `query`, `params`, `duration`, and `timestamp` fields for diagnostic profiling.',
        whyAr: 'توفر نص استعلام الـ SQL والمعاملات وزمن التنفيذ بالمللي ثانية وطابع الوقت لتشخيص وتحليل الأداء.'
      },
      {
        q: 'Why should production database logging prioritize recording slow queries (> 100ms) rather than all queries?',
        qAr: 'لماذا يجب أن تركز سجلات الإنتاج على الاستعلامات البطيئة (> 100ms) بدلاً من كل الاستعلامات؟',
        options: [
          'Prevents overwhelming logging infrastructure with high-volume noise and eliminates synchronous I/O bottlenecks in Node.js.',
          'Prisma cannot record fast queries.',
          'Fast queries are encrypted.',
          'To comply with CSS standards.'
        ],
        correct: 0,
        why: 'Logging all queries creates heavy I/O overhead and enormous log volume; targeting slow queries isolates actionable bottlenecks cleanly.',
        whyAr: 'تسجيل كل شيء يرهق الخادم بالباندويث ومساحة التخزين، بينما حصر السجلات على الاستعلامات البطيئة يكشف المشاكل الحقيقية.'
      },
      {
        q: 'How does Prisma Client sanitize query parameters before emitting logging events?',
        qAr: 'كيف يقوم Prisma Client بتطهير معاملات الاستعلام قبل إطلاق أحداث السجلات؟',
        options: [
          'Serializes parameter arguments as structured arrays/JSON while maintaining parameter placeholders ($1, $2) in the query string.',
          'Deletes all numbers.',
          'Replaces all letters with asterisks.',
          'Converts parameters to XML.'
        ],
        correct: 0,
        why: 'Prisma separates query text from parameter values, allowing loggers to selectively inspect or redact parameter arguments.',
        whyAr: 'يفصل نص الاستعلام عن قيم المعاملات لتمكين أدوات التسجيل من فحص أو حجب البيانات الحساسة بسهولة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تدمج Prisma Query Metrics داخل لوحات تحكم Prometheus و Grafana لمراقبة صحة الخوادم في الوقت الحقيقي؟',
    interviewA: 'نستخدم واجهة prisma.$metrics.prometheus(): 1. ننشئ مساراً في Express باسم /metrics محمي بصلاحيات داخلية. 2. عند استدعائه، نطلب const metrics = await prisma.$metrics.prometheus(). 3. هذا يُرجع مقاييس قياسية فورية: عدد اتصالات الـ Connection Pool المفتوحة والنشطة (prisma_pool_connections_open / busy)، وزمن استجابة الاستعلامات (prisma_client_queries_duration_histogram_ms). 4. يقوم Prometheus بجمع هذه المقاييس كل 15 ثانية وعرضها على لوحة Grafana مع إطلاق تنبيهات فورية إذا ارتفع زمن الاستعلامات عن 200ms.'
  },
  {
    slug: 'performance-n-plus-1',
    title: 'Solving N+1 Query Problem: DataLoader Pattern, Prisma Query Batching & Optimizations',
    titleAr: 'حل معضلة الـ N+1: نمط DataLoader، التجميع التلقائي (Query Batching) وتحسين أداء Prisma',
    level: 3,
    order: 13,
    estMinutes: 35,
    version: 'Prisma 7 Performance',
    pattern: 'Query Batching & N+1 Prevention',
    objectives: [
      'فهم كارثة الـ N+1 Query Problem وكيف تتسبب في إرسال مئات استعلامات SQL المنفصلة لنفس الطلب الواحد.',
      'تشريح آلية التجميع التلقائي في Prisma (Automatic Query Batching by Tick).',
      'تطبيق نمط DataLoader لتجميع وتخزين نتائج العلاقات في الذاكرة المؤقتة للطلب الواحد.',
      'مقارنة الأداء بين include، select، و $queryRaw في الاستعلامات الضخمة المعقدة.'
    ],
    problemOpening: `
      مشكلة **الـ N+1 Query Problem** هي أشهر وأخطر فخ في عالم أطر الـ ORM وقواعد البيانات!
      تخيل أن لديك صفحة تعرض 50 مقالاً مع اسم كاتب كل مقال:
      المبرمج المبتدئ يجلب المقالات بـ <code dir="ltr">findMany()</code> (استعلام 1)، ثم يكتب حلقة تكرار <code dir="ltr">for</code> لجلب كاتب كل مقال بـ <code dir="ltr">findUnique({ where: { id: post.authorId } })</code>!
      النتيجة: الخادم يرسل استعلاماً واحداً للمقالات + 50 استعلاماً منفصلاً للكتاب = **51 استعلام SQL منفصل لنفس الصفحة الواحدة (N+1 Queries)**!
      لو كان لديك 1000 مستخدم في نفس اللحظة، سيستقبل خادم قاعدة البيانات 51,000 استعلام، مما يسقط السيرفر في ثوانٍ!
      يتميز **Prisma Client** بوجود محرك تجميع ذكي مدمج **Automatic Query Batching**: يجمع استعلامات الـ <code dir="ltr">findUnique</code> التي تقع في نفس دورة الـ Event Loop Tick ويدمجها في استعلام واحد بـ <code dir="ltr">WHERE id IN (...)</code>!
      في هذا الدرس، هنفكك ميكانيكا الـ Batching، إزاي نستخدم نمط **DataLoader**، وكيف نقضي على الـ N+1 نهائياً.
    `,
    mechanics: [
      { step: '01', title: 'تشريح كارثة الـ N+1 Query Problem', desc: 'إرسال استعلام لجلب القائمة الرئيسية ثم إرسال N استعلام فرعي لكل عنصر في القائمة مما يدمر أداء قاعدة البيانات.' },
      { step: '02', title: 'التجميع التلقائي في Prisma (Automatic Batching)', desc: 'يقوم Prisma بدمج استعلامات findUnique المتزامنة في نفس الـ Tick تلقائياً في استعلام SQL واحد باستخدام WHERE id IN (...).' },
      { step: '03', title: 'الربط المسبق الشامل بـ include', desc: 'استخدام include: { author: true } لجلب البيانات المرتبطة في استعلامين مجمعين فقط بدلاً من N استعلام منفصل.' },
      { step: '04', title: 'تطبيق نمط DataLoader (Batching & Caching)', desc: 'تجميع طلبات المعرفات في مصفوفة واحدة واسترجاعها دفعة واحدة مع كاش مؤقت لدورة حياة الطلب الواحد (Per-Request Cache).' },
      { step: '05', title: 'المقارنة مع Raw SQL في التقارير المعقدة', desc: 'استخدام $queryRaw مع JOINs صريحة عندما تتطلب التقارير دمج 5 جداول ضخمة بأعلى كفاءة في استعلام واحد.' }
    ],
    playgroundCode: `// محاكي حل مشكلة N+1 باستخدام نمط Query Batching
class MockDataLoader {
  constructor(batchFetchFn) {
    this.batchFetchFn = batchFetchFn;
    this.queue = new Set();
  }

  load(id) {
    this.queue.add(id);
    return new Promise((resolve) => {
      // الانتظار لنهاية الـ Tick لتجميع كل المعرفات
      process.nextTick(async () => {
        if (this.queue.size > 0) {
          const ids = Array.from(this.queue);
          this.queue.clear();
          console.log(\`⚡ BATCHED QUERY: SELECT * FROM users WHERE id IN (\${ids.join(", ")}) (Single SQL!)\`);
          const results = await this.batchFetchFn(ids);
          resolve(results[id]);
        }
      });
    });
  }
}

const userLoader = new MockDataLoader(async (ids) => {
  return Object.fromEntries(ids.map(id => [id, { id, name: \`User_\${id}\` }]));
});

// استدعاء متزامن لـ 3 مستخدمين في نفس الصفحة
userLoader.load("101");
userLoader.load("102");
userLoader.load("103");
// النتيجة: استعلام SQL واحد فقط مجمع بدلاً من 3 استعلامات منفصلة!`,
    experimentQuestion: 'متى يفشل محرك التجميع التلقائي (Automatic Batching) في Prisma في دمج الاستعلامات ويقع التطبيق في فخ الـ N+1؟',
    experimentAnswer: 'يفشل التجميع التلقائي عندما تستخدم await داخل حلقة تكرار متسلسلة عادية for (const item of items) { await prisma.user.findUnique(...) }. استخدام await في كل لفة يجبر جافاسكريبت على انتظار اكتمال الاستعلام قبل الانتقال للعنصر التالي، مما يوزع الاستعلامات عبر Ticks مختلفة ويمنع Prisma من تجميعها! لحلها: نستخدم Promise.all(items.map(...)) أو نستخدم include: { user: true } من البداية.',
    codeAnatomy: [
      { line: '// الحل الأمثل للـ N+1: جلب العلاقات في استعلامين مجمعين فقط', note: 'الربط المسبق القياسي' },
      { line: 'export async function getArticlesWithAuthors() {', note: 'دالة جلب المقالات' },
      { line: '  return await prisma.post.findMany({', note: 'استعلام البحث' },
      { line: '    take: 50,', note: 'جلب 50 مقالاً' },
      { line: '    include: {', note: 'الربط العلائقي المسبق (Eager Loading)' },
      { line: '      author: {', note: 'جلب بيانات الكاتب' },
      { line: '        select: { id: true, name: true, email: true } // انتقاء محدد', note: 'حقول محددة لمنع تضخم الذاكرة' },
      { line: '      }', note: 'نهاية الكاتب' },
      { line: '    }', note: 'نهاية include' },
      { line: '  }); // ينفذ استعلامين SQL فقط: 1 للمقالات و 1 لجميع الكتاب بـ IN (...)', note: 'أداء فائق السرعة' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ كارثي: استعلام SQL منفصل لكل عنصر داخل حلقة تكرار (N+1 Nightmare)
const posts = await prisma.post.findMany({ take: 50 });
for (const post of posts) {
  post.author = await prisma.user.findUnique({ where: { id: post.authorId } }); // 50 استعلام إضافي!
}`,
    pitfallGood: `// الحل الهندسي: استخدام include لجلب الكل في استعلامين مجمعين فقط
const posts = await prisma.post.findMany({
  take: 50,
  include: { author: true } // استعلامان فقط للـ 50 عنصراً
});`,
    pitfallDiagnosis: 'الاستعلامات المتسلسلة داخل الحلقات تخنق قاعدة البيانات، بينما include و DataLoader يجمعان المعرفات في استعلام واحد.',
    quizPool: [
      {
        q: 'What is the "N+1 Query Problem" in database access layers?',
        qAr: 'ما هي مشكلة الـ "N+1 Query Problem" في طبقات الوصول لقواعد البيانات؟',
        options: [
          'An inefficiency where an application executes 1 initial query to fetch parent records, followed by N separate queries to fetch related children individually.',
          'A database syntax error with number + 1.',
          'When database storage runs out of memory.',
          'An encryption vulnerability.'
        ],
        correct: 0,
        why: 'N+1 floods the database with dozens or hundreds of unnecessary round-trips for nested relations instead of a batched IN query.',
        whyAr: 'عدم كفاءة تتسبب في إرسال استعلام مبدئي ثم N استعلام إضافي لكل عنصر بشكل منفصل مما يغرق الداتابيز بآلاف الطلبات غير الضرورية.'
      },
      {
        q: 'How does Prisma Client\'s Automatic Query Batching optimize concurrent findUnique calls?',
        qAr: 'كيف يحسن محرك التجميع التلقائي في Prisma Client استدعاءات findUnique المتزامنة؟',
        options: [
          'Gathers findUnique calls executed within the same event loop tick and merges them into a single SQL query using "WHERE id IN (...)".',
          'Converts all queries to WebSockets.',
          'Deletes duplicate queries.',
          'Executes queries on random threads.'
        ],
        correct: 0,
        why: 'Prisma batches findUnique operations occurring in the same microtask tick into single consolidated SQL IN (...) queries.',
        whyAr: 'يجمع استدعاءات findUnique المتزامنة في نفس الـ Tick ويدمجها تلقائياً في استعلام SQL واحد بـ WHERE id IN (...).'
      },
      {
        q: 'Why does "await" inside a standard "for...of" loop defeat Prisma\'s automatic query batching?',
        qAr: 'لماذا يبطل استخدام "await" داخل حلقة "for...of" التجميع التلقائي في Prisma؟',
        options: [
          'Awaiting sequentially halts execution until each query completes, executing queries across separate event loop ticks rather than batching them together.',
          'It throws a syntax error.',
          'Loops are not allowed in Node.js.',
          'It clears the database cache.'
        ],
        correct: 0,
        why: 'Sequential await creates a waterfall where each query finishes before the next is scheduled, preventing tick-based consolidation.',
        whyAr: 'الانتظار المتسلسل يجبر الكود على انتظار اكتمال كل استعلام قبل بدء التالي مما يوزعها على Ticks مختلفة ويمنع دمجها.'
      },
      {
        q: 'What is the primary role of the DataLoader pattern (e.g. in GraphQL or REST backends)?',
        qAr: 'ما هو الدور الأساسي لنمط DataLoader في خوادم الـ REST و GraphQL؟',
        options: [
          'Batching and caching individual database load requests within the context of a single HTTP request lifecycle to solve N+1 problems.',
          'Loading CSV files into PostgreSQL.',
          'Managing server CSS files.',
          'Encrypting user passwords.'
        ],
        correct: 0,
        why: 'DataLoader batches queued ID lookups into single bulk queries while caching loaded instances per request.',
        whyAr: 'تجميع طلبات جلب المعرفات في استعلام جماعي واحد مع تخزين الكائنات مؤقتاً في كاش سياق الطلب الواحد لمنع تكرار الاستعلامات.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تكتشف مشاكل الـ N+1 تلقائياً في خطوط اختبارات الـ CI/CD قبل نشر الكود للإنتاج؟',
    interviewA: 'نستخدم تقنية Query Count Assertions في اختبارات الـ Integration Tests بـ Jest / Vitest: نقوم بربط Prisma بـ $on("query") لحساب عدد الاستعلامات المنفذة لكل Endpoint. عند اختبار مسار /api/articles?limit=50، نضع شرط تأكيد صارم: expect(queryCount).toBeLessThanOrEqual(2). إذا قام مطور بإضافة حلقة تكرار غير محسوبة وارتفع عدد الاستعلامات إلى 51، سيفشل الاختبار في الـ CI فوراً ويمنع دمج الـ Pull Request، محققين حماية آلية مستمرة للأداء.'
  },
  {
    slug: 'enterprise-production',
    title: 'Enterprise Prisma: Connection Pool Sizing, Read Replicas & Driver Adapters (PgBouncer)',
    titleAr: 'أنظمة Prisma المؤسسية: حساب حجم الـ Connection Pool، خوادم القراءة (Read Replicas) ومحولات Driver Adapters',
    level: 3,
    order: 14,
    estMinutes: 35,
    version: 'Prisma 7 Enterprise',
    pattern: 'Enterprise Resilience & Database Scaling',
    objectives: [
      'حساب الحجم الرياضي الدقيق لمجمع الاتصالات (Connection Pool Sizing: connection_limit) لمنع اختناق السيرفر.',
      'توزيع استعلامات القراءة والكتابة تلقائياً عبر ميزة النسخ الموزعة (Read Replicas Extension).',
      'تكامل Prisma مع مجمعات الاتصال الخارجية مثل PgBouncer و Supabase Pooler بـ ?pgbouncer=true.',
      'استخدام محولات المحركات الحديثة (Driver Adapters: @prisma/adapter-pg) للأداء الفائق في بيئات Serverless و Edge.'
    ],
    problemOpening: `
      في المشاريع الصغيرة، يعمل Prisma بكفاءة بإعدادات الـ Connection Pool الافتراضية.
      لكن عندما ترفع تطبيقك على منصات Serverless (مثل AWS Lambda أو Vercel) أو تشغل 20 حاوية Docker وراء Load Balancer، ستصطدم بأشهر كارثة إنتاجية:
      <pre dir="ltr"><code>Error: Can't reach database server. Too many clients already connected (FATAL: remaining connection slots are reserved).</code></pre>
      كل نسخة من التطبيق تفتح افتراضياً مجمع اتصالات خاصاً بها (مثلاً 10 اتصالات)؛ ومع وجود 50 حاوية Docker و 100 دالة Lambda، يحاول التطبيق فتح 1500 اتصال متزامن في حين أن PostgreSQL لا يتحمل أكثر من 100 اتصال!
      الحل المعماري المؤسسي يتطلب:
      1. حساب المعادلة الرياضية لحجم المجمع: <code dir="ltr">connection_limit = ((CPU_CORES * 2) + DISK_SPINDLES)</code>.
      2. استخدام **PgBouncer** مع تفعيل وضع <code dir="ltr">?pgbouncer=true</code> في Prisma.
      3. توجيه استعلامات القراءة الضخمة إلى **Read Replicas** لتخفيف العبء عن السيرفر الرئيسي.
      في هذا الدرس الختامي لمسار Prisma 7، هنتعلم إزاي نبني بنية تحتية مؤسسية منيعة تتحمل ملايين الزيارات دون انقطاع.
    `,
    mechanics: [
      { step: '01', title: 'المعادلة الرياضية لحجم مجمع الاتصالات (Pool Sizing Formula)', desc: 'تحديد connection_limit في رابط الـ URL بناءً على عدد أنوية المعالج وعدد الحاويات الموزعة لمنع استنزاف قاعدة البيانات.' },
      { step: '02', title: 'التكامل مع PgBouncer بـ ?pgbouncer=true', desc: 'توجيه Prisma للعمل في نمط Transaction Pooling مع استخدام directUrl مخصص لتشغيل الهجرات بـ migrate deploy.' },
      { step: '03', title: 'توجيه القراءات بـ Read Replicas Extension', desc: 'استخدام @prisma/extension-read-replicas لتوجيه استعلامات findMany تلقائياً لسيرفرات القراءة الثانوية واستعلامات الكتابة للـ Primary.' },
      { step: '04', title: 'محولات المحركات الحديثة بـ Driver Adapters (@prisma/adapter-pg)', desc: 'استخدام محرك pg الأصلي المباشر لتحسين سرعة الاتصال وتقليل حجم الـ Bundle في بيئات Serverless.' },
      { step: '05', title: 'إدارة دورة حياة العميل (Singleton Pattern)', desc: 'ضمان وجود نسخة واحدة فقط من PrismaClient في الذاكرة لمنع تسريب الاتصالات عند الـ Hot Reloading في بيئات التطوير.' }
    ],
    playgroundCode: `// محاكي حساب حجم مجمع الاتصالات ومعمارية Read Replicas
function calculateEnterprisePool(totalPods, dbMaxConnections, cpuCores) {
  // المعادلة القياسية الموصى بها
  const recommendedTotalPool = (cpuCores * 2) + 1;
  const poolPerPod = Math.max(2, Math.floor(dbMaxConnections / totalPods));
  
  console.log(\`Infrastructure: \${totalPods} Kubernetes Pods | Database Max Connections: \${dbMaxConnections}\`);
  console.log(\`Recommended Connection Limit Per Pod: \${poolPerPod}\`);
  console.log(\`Configured Connection URL: postgresql://user:pass@pgbouncer:6432/db?connection_limit=\${poolPerPod}&pgbouncer=true\`);
  
  return poolPerPod;
}

calculateEnterprisePool(10, 100, 8);`,
    experimentQuestion: 'لماذا يجب عليك تعريف متغير directUrl منفصل في datasource عند استخدام PgBouncer في نمط Transaction Pooling مع Prisma؟',
    experimentAnswer: 'لأن PgBouncer في نمط Transaction Pooling يغير الاتصال الفيزيائي مع كل معاملة ولا يدعم الـ Prepared Statements المؤقتة أو أقفال الـ Advisory Locks التي تتطلبها هجرات Prisma (prisma migrate). لذلك نستخدم رابط PgBouncer للعميل العادي url، ونعرف directUrl متصلاً مباشرة بمنفذ PostgreSQL الأصلي (5432) لاستخدامه حصراً في تشغيل الهجرات بـ migrate deploy بأمان.',
    codeAnatomy: [
      { line: '// prisma/schema.prisma (Enterprise Connection Architecture)', note: 'تكوين مجمع الاتصالات المؤسسي' },
      { line: 'datasource db {', note: 'مصدر البيانات' },
      { line: '  provider  = "postgresql",', note: 'المحرك' },
      { line: '  url       = env("DATABASE_URL"), // رابط PgBouncer المجمع (Port 6432)', note: 'رابط المجمع' },
      { line: '  directUrl = env("DIRECT_DATABASE_URL") // رابط بوستجريس المباشر للهجرات (Port 5432)', note: 'رابط الهجرات المباشر' },
      { line: '}', note: 'نهاية المصدر' },
      { line: '// تطبيق توزيع القراءات على السيرفرات الثانوية بـ Extension', note: 'توزيع القراءة والكتابة' },
      { line: 'const prisma = new PrismaClient().$extends(readReplicas({', note: 'إضافة سيرفرات القراءة' },
      { line: '  url: [process.env.REPLICA_1_URL, process.env.REPLICA_2_URL]', note: 'سيرفرات القراءة الثانوية' },
      { line: '}));', note: 'نهاية التكوين' }
    ],
    pitfallBad: `// خطأ كارثي في بيئات التطوير: إنشاء new PrismaClient() داخل كل مسار أو ملف
// مع كل Hot Reload، يتم فتح مجمع اتصالات جديد حتى ينهار الخادم بخطأ Too many connections!`,
    pitfallGood: `// الحل الهندسي: تطبيق نمط Singleton لمشاركة نسخة واحدة دائماً
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;`,
    pitfallDiagnosis: 'إنشاء نسخ متعددة يسرب اتصالات قاعدة البيانات، بينما نمط Singleton يضمن إعادة استخدام نفس النسخة الوحيدة.',
    quizPool: [
      {
        q: 'Why is the "directUrl" datasource property required in schema.prisma when using PgBouncer in Transaction Pooling mode?',
        qAr: 'لماذا تعتبر خاصية "directUrl" مطلوبة في schema.prisma عند استخدام PgBouncer في نمط Transaction Pooling؟',
        options: [
          'Prisma Migrate requires direct connections to acquire session-level advisory locks, which are unsupported in transaction pooling mode.',
          'To make the database faster.',
          'To format TypeScript types.',
          'It is an optional setting.'
        ],
        correct: 0,
        why: 'Migration operations require persistent session locks that PgBouncer transaction pooling does not maintain, necessitating directUrl.',
        whyAr: 'عمليات الهجرة تتطلب أقفال جلسات مباشرة ومستمرة لا يدعمها نمط Transaction Pooling، مما يتطلب رابطاً مباشراً directUrl لتشغيل الهجرات.'
      },
      {
        q: 'What is the primary benefit of the "@prisma/extension-read-replicas" plugin?',
        qAr: 'ما هي الفائدة الأساسية لإضافة "@prisma/extension-read-replicas" في الأنظمة الكبرى؟',
        options: [
          'Automatically routes read queries (findMany, findUnique) to secondary read replicas while routing mutations to the primary database.',
          'Replicates data to AWS S3.',
          'Translates queries to French.',
          'Deletes database indexes.'
        ],
        correct: 0,
        why: 'Read replicas extension distributes read traffic across secondary nodes, drastically reducing CPU/RAM load on the write primary.',
        whyAr: 'توجه استعلامات القراءة تلقائياً إلى خوادم القراءة الثانوية وتوجه عمليات الكتابة للرئيسي مما يخفف الحمل عن الخادم الأساسي.'
      },
      {
        q: 'What is the purpose of the connection_limit URL parameter in a Prisma DATABASE_URL string?',
        qAr: 'ما هو الغرض من معامل connection_limit في رابط اتصال DATABASE_URL في Prisma؟',
        options: [
          'Explicitly bounds the maximum number of concurrent database connections a single Prisma Client instance can open.',
          'Limits the number of rows returned.',
          'Limits password length.',
          'Sets API rate limits.'
        ],
        correct: 0,
        why: 'connection_limit prevents individual server instances from exhausting overall database connection capacity.',
        whyAr: 'يحدد بدقة السقف الأقصى لعدد الاتصالات المتزامنة التي تفتحها نسخة العميل الواحدة لمنع استنزاف موارد قاعدة البيانات.'
      },
      {
        q: 'Why should the Prisma Client Singleton pattern be implemented in development environments (e.g. Next.js / Express with HMR)?',
        qAr: 'لماذا يجب تطبيق نمط Singleton لعميل Prisma في بيئات التطوير مع أدوات الـ Hot Module Reloading؟',
        options: [
          'Prevents new PrismaClient instances from being instantiated on every file edit/reload, avoiding rapid connection exhaustion.',
          'Makes TypeScript compile faster.',
          'Encrypts local databases.',
          'Clears browser cache.'
        ],
        correct: 0,
        why: 'Hot module reloading recreates modules on save; attaching PrismaClient to globalThis prevents runaway duplicate connection pools.',
        whyAr: 'إعادة تحميل الملفات السريعة تعيد إنشاء الموديلات؛ وربط العميل بـ globalThis يمنع تكرار فتح مجمعات اتصالات جديدة مع كل حفظ.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم معمارية تخزين مؤقت للبيانات (Multi-Tier Caching Architecture) بين Prisma و Redis لخدمة 100,000 طلب في الثانية مع حل مشكلة الـ Cache Invalidation؟',
    interviewA: 'نطبق نمط Cache-Aside مع Prisma Client Extension: 1. نبني Extension مخصص يعترض استعلامات findUnique و findMany بـ $extends({ query }). 2. قبل تنفيذ الاستعلام، يقوم العميل بتوليد Cache Key من اسم النموذج والشروط (e.g. cache:post:101) والبحث في Redis. إذا وجدها (Cache Hit)، يُرجع النتيجة في 0.5ms دون لمس الداتابيز. 3. إذا لم يجدها (Cache Miss)، ينفذ استعلام Prisma، ويحفظ الناتج في Redis مع TTL (مثلاً 5 دقائق). 4. لحل معضلة الـ Cache Invalidation: في نفس الـ Extension، نعترض عمليات create و update و delete ونقوم بحذف الـ Keys المرتبطة فورياً من Redis (Event-Driven Invalidation)، محققين تناسقاً مثالياً للبيانات وسرعة استجابة مذهلة.'
  }
];
