/* ============================================================
   postgresql-lessons.mjs — 9 New Lessons for PostgreSQL 16+ Track
   ============================================================ */

export const postgresqlLessons = [
  {
    slug: 'sql-syntax-data-types',
    title: 'SQL DDL/DML & PostgreSQL Advanced Types: UUID, JSONB, Arrays & Timestamptz',
    titleAr: 'أوامر SQL الأساسية وأنواع بيانات PostgreSQL المتقدمة: UUID و JSONB والمصفوفات',
    level: 1,
    order: 2,
    estMinutes: 24,
    version: 'PostgreSQL 16+',
    pattern: 'Data Modeling & Types',
    problemOpening: `بوستجريس (PostgreSQL) تُلقب بـ "أقوى قاعدة بيانات علائقية مفتوحة المصدر في العالم". قوتها لا تقتصر على الجداول العادية، بل في دعمها لأنواع بيانات متقدمة نادراً ما تجدها في قواعد أخرى: المصفوفات الأصلية (<code dir="ltr">TEXT[]</code>)، كائنات الـ JSONB الثنائية فائقة السرعة، المعرفات العالمية (<code dir="ltr">UUIDv7</code>)، والتوقيت الزمني الدقيق مع المناطق الزمنية (<code dir="ltr">TIMESTAMPTZ</code>).`,
    objectives: [
      'التمييز بين أوامر تعريف البيانات (DDL) وأوامر معالجة البيانات (DML).',
      'استخدام أنواع البيانات المتقدمة: UUIDv4/v7، JSONB، Arrays، و TIMESTAMPTZ.',
      'تطبيق القيود الصارمة (Constraints: PRIMARY KEY, UNIQUE, CHECK, NOT NULL).'
    ],
    mechanics: [
      { step: 1, title: 'القيود على مستوى العمود (Constraints)', desc: 'استخدام CHECK (price > 0) لضمان عدم دخول قيم غير منطقية لقاعدة البيانات أبداً.' },
      { step: 2, title: 'المعرفات الموزعة (UUID)', desc: 'استخدام gen_random_uuid() لتوليد مفاتيح فريدة غير متسلسلة تحمي من هجمات التخمين.' },
      { step: 3, title: 'التوقيت الموحد (TIMESTAMPTZ)', desc: 'تخزين الوقت دائماً بصيغة UTC وتحويله تلقائياً للمنطقة الزمنية للعميل عند العرض.' }
    ],
    playgroundCode: `// PostgreSQL DDL Table Creation Simulator
const tableSchema = \`
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  roles TEXT[] DEFAULT '{"student"}',
  profile JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_valid_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);
\`;
console.log("PostgreSQL Strict DDL Schema Output:");
console.log(tableSchema);`,
    experimentQuestion: 'لماذا يحظر استخدام TIMESTAMP بدون منطقة زمنية (WITHOUT TIME ZONE) في التطبيقات العالمية؟',
    experimentAnswer: 'لأن TIMESTAMP بدون منطقة زمنية يتجاهل فارق التوقيت ويحفظ الأرقام فقط، مما يسبب تشوه مواعيد الحجوزات والمعاملات المالية عند تعامل مستخدمين من دول ومناطق زمنية مختلفة.',
    codeAnatomy: [
      { line: '1: CREATE TABLE products (', note: 'إنشاء جدول المنتجات' },
      { line: '2:   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),', note: 'مفتاح أساسي فريد مشفر' },
      { line: '3:   price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),', note: 'نوع دقيق مالي مع قيد فحص' },
      { line: '4:   tags TEXT[] DEFAULT \'{}\'', note: 'مصفوفة نصوص مدمجة' },
      { line: '5: );', note: 'نهاية الجدول' }
    ],
    pitfallBad: 'price FLOAT; /* استخدام Float للمعاملات المالية يسبب أخطاء تقريب بنكية قاتلة! */',
    pitfallGood: 'price NUMERIC(12, 2); /* نوع مالي دقيق ثابت الفاصلة بدون أي أخطاء تقريب */',
    pitfallDiagnosis: 'النوع Float يعتمد على معيار IEEE 754 غير الدقيق ويسبب اختفاء القروش في الحسابات التراكمية.',
    quizPool: [{
      q: 'Which PostgreSQL data type is recommended for storing exact monetary amounts without floating-point precision loss?',
      qAr: 'ما هو نوع البيانات الموصى به في PostgreSQL لتخزين المبالغ المالية بدقة متناهية دون أخطاء تقريب؟',
      options: ['FLOAT8', 'NUMERIC / DECIMAL', 'REAL', 'INTEGER'],
      correct: 1,
      why: '`NUMERIC` / `DECIMAL` stores exact numbers and is the standard for financial data.',
      whyAr: 'النوع NUMERIC يخزن أرقاماً دقيقة ثابتة الفاصلة وهو المعيار المالي العالمي.'
    }],
    interviewQ: 'ما هي ميزة استخدام UUIDv7 الجديد بدلاً من UUIDv4 الكلاسيكي في المفاتيح الأساسية لـ PostgreSQL؟',
    interviewA: 'الـ UUIDv4 عشوائي بالكامل في الذاكرة، مما يسبب تبعثر شجرة الفهرس (B-Tree Fragmentation) وبطء الكتابة في الجداول الضخمة. بينما UUIDv7 يدمج طابعاً زمنياً في بدايته (Time-Ordered)، مما يجعله مرتباً زمنياً تصاعدياً ويوفر سرعة إدخال فائقة مماثلة للمعرفات الرقمية التسلسلية مع الحفاظ على الأمان والفرادة العالمية.'
  },
  {
    slug: 'joins-relations',
    title: 'Normalization (1NF-3NF), Foreign Keys, ON DELETE & SQL Joins Mechanics',
    titleAr: 'تطبيع قواعد البيانات (1NF إلى 3NF)، المفاتيح الأجنبية وكواليس الـ SQL Joins',
    level: 2,
    order: 3,
    estMinutes: 26,
    version: 'PostgreSQL 16+',
    pattern: 'Relational Theory',
    problemOpening: `في قواعد البيانات العلائقية، تكرار البيانات في أكثر من جدول (Data Redundancy) يسبب كوابيس التحديث والتعديل (Update Anomalies) وتضارب المعلومات. تطبيق معايير التطبيع (Database Normalization من 1NF إلى 3NF) مع المفاتيح الأجنبية (Foreign Keys) يضمن الاتساق التام وسلامة العلاقات المرجعية، مع إتقان خوارزميات الربط (Inner, Left, Full Outer, Cross Joins).`,
    objectives: [
      'تطبيق مراحل التطبيع الثلاث: 1NF (الذرية)، 2NF (الاعتماد التام على المفتاح)، 3NF (إزالة الاعتماديات الانتقالية).',
      'إدارة سلوكيات الحذف المرجعي: ON DELETE CASCADE, RESTRICT, SET NULL.',
      'فهم خوارزميات الـ Joins الداخلية في محرك PostgreSQL (Nested Loop, Hash Join, Merge Join).'
    ],
    mechanics: [
      { step: 1, title: 'الذرية التامة (1NF)', desc: 'كل عمود يحتوي على قيمة واحدة غير قابلة للتجزئة مع وجود مفتاح أساسي فريد.' },
      { step: 2, title: 'التطبيع الثالث (3NF)', desc: 'فصل البيانات التي تعتمد على أعمدة غير المفتاح الأساسي في جداول مستقلة (مثل فصل تفاصيل المدينة عن جدول الموظف).' },
      { step: 3, title: 'خوارزمية Hash Join السريعة', desc: 'يقوم المحرك ببناء جدول تجزئة في الذاكرة للجدول الصغير ومطابقة الجدول الكبير في ممر واحد O(M+N).' }
    ],
    playgroundCode: `// Relational Join Algorithm Simulator
const users = [{ id: 1, name: "Amr" }, { id: 2, name: "Sara" }];
const orders = [{ id: 101, userId: 1, total: 250 }, { id: 102, userId: 1, total: 400 }];

// Simulating INNER JOIN users u ON u.id = o.userId
const innerJoinResult = orders.map(order => {
  const user = users.find(u => u.id === order.userId);
  return { orderId: order.id, customer: user.name, total: order.total };
});

console.log("SQL Inner Join Output Table:");
console.log(JSON.stringify(innerJoinResult, null, 2));`,
    experimentQuestion: 'ماذا يحدث إذا حذفت سجلاً من جدول الأب مرتبط بسجلات فرعية معرفة بـ ON DELETE RESTRICT؟',
    experimentAnswer: 'سيرفض محرك PostgreSQL تنفيذ عملية الحذف ويلقي خطأ فورياً من نوع foreign key violation لمنع حدوث سجلات أيتام (Orphan Rows).',
    codeAnatomy: [
      { line: '1: CREATE TABLE orders (', note: 'جدول الطلبات' },
      { line: '2:   id SERIAL PRIMARY KEY,', note: 'المفتاح الأساسي' },
      { line: '3:   user_id UUID REFERENCES users(id) ON DELETE CASCADE,', note: 'حذف الطلبات تلقائياً عند حذف المستخدم' },
      { line: '4:   total NUMERIC(10, 2) NOT NULL', note: 'المبلغ الإجمالي' },
      { line: '5: );', note: 'نهاية الجدول' }
    ],
    pitfallBad: 'user_id UUID REFERENCES users(id); /* الحذف الافتراضي قد يمنع حذف الحساب أو يترك أخطاء غير معالجة */',
    pitfallGood: 'user_id UUID REFERENCES users(id) ON DELETE CASCADE; /* سلوك مرجعي واضح وصريح */',
    pitfallDiagnosis: 'عدم تحديد سلوك ON DELETE صراحة يجعل النظام يتصرف بالسلوك الافتراضي الذي يربك معالجات الحذف.',
    quizPool: [{
      q: 'Which type of SQL JOIN returns all records from the left table, and the matched records from the right table (with NULLs for unmatched)?',
      qAr: 'أي نوع من أنواع الـ SQL JOIN يُرجع جميع السجلات من الجدول الأيسر والسجلات المطابقة فقط من الجدول الأيمن؟',
      options: ['INNER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN'],
      correct: 1,
      why: 'LEFT JOIN returns all rows from the left table, even if there are no matches in the right table.',
      whyAr: 'الـ LEFT JOIN يضمن بقاء جميع سجلات الجدول الأيسر حتى لو لم تجد أي مطابقة في الجدول الأيمن.'
    }],
    interviewQ: 'ما هي خوارزميات الربط الثلاث (Join Strategies) التي يستخدمها مخطط الاستعلامات في PostgreSQL؟',
    interviewA: '1. `Nested Loop Join`: للمجموعات الصغيرة والمفهرسة. 2. `Hash Join`: للمجموعات الكبيرة غير المرتبة؛ حيث يبني Hash Table في الذاكرة. 3. `Merge Join`: عندما يكون الجدولان مرتبين مسبقاً بناءً على مفتاح الربط (عبر فهارس B-Tree).'
  },
  {
    slug: 'indexes-query-planner',
    title: 'PostgreSQL Indexes & Query Optimization: B-Tree, GIN, BRIN & EXPLAIN ANALYZE',
    titleAr: 'فهارس PostgreSQL ومخطط الاستعلامات: B-Tree و GIN و BRIN وأداة EXPLAIN ANALYZE',
    level: 2,
    order: 4,
    estMinutes: 26,
    version: 'PostgreSQL 16+',
    pattern: 'Database Internals',
    problemOpening: `قراءة تقارير <code dir="ltr">EXPLAIN ANALYZE</code> هي المهارة الفاصلة بين المطور العادي ومهندس الباك إند المحترف. عندما يستغرق استعلام 5 ثوانٍ، فإن معرفتك بنوع الفهرس المناسب — سواء B-Tree الكلاسيكي، أو GIN للبيانات المهيكلة JSONB والنصوص، أو BRIN للجداول الزمنية الضخمة بمليارات الصفوف — تمكنك من تحويل الاستعلام لسرعة البرق مع توفير 90% من استهلاك القرص!`,
    objectives: [
      'قراءة وتفسير خطط تنفيذ الاستعلامات EXPLAIN (ANALYZE, BUFFERS).',
      'فهم أنواع الفهارس المتخصصة: B-Tree, GIN (Generalized Inverted Index), BRIN (Block Range).',
      'بناء الفهارس الجزئية (Partial Indexes) والفهارس الوظيفية (Expression Indexes).'
    ],
    mechanics: [
      { step: 1, title: 'تشريح EXPLAIN ANALYZE', desc: 'مقارنة التكلفة التقديرية (Estimated Cost) مع زمن التنفيذ الفعلي (Actual Execution Time) وعدد الصفوف.' },
      { step: 2, title: 'فهارس GIN لحقول JSONB والبحث النصي', desc: 'فهرسة كل مفتاح وعنصر داخل كائنات JSONB للبحث الفوري باستخدام مشغلات الاحتواء (@>).' },
      { step: 3, title: 'فهارس BRIN فائقة الصغر للجداول العملاقة', desc: 'فهرسة نطاقات الكتل فقط للجداول المرتبة زمنياً (حجم الفهرس 100KB لجدول 10GB!).' }
    ],
    playgroundCode: `// EXPLAIN ANALYZE Output Parser Simulation
const queryPlan = {
  "Node Type": "Index Scan",
  "Index Name": "idx_users_email",
  "Relation Name": "users",
  "Actual Startup Time": 0.024,
  "Actual Total Time": 0.045,
  "Actual Rows": 1,
  "Actual Loops": 1,
  "Buffers": { "Shared Hit": 3 }
};

console.log(\`Execution Plan: \${queryPlan["Node Type"]} on \${queryPlan["Index Name"]}\`);
console.log(\`⚡ Actual Time: \${queryPlan["Actual Total Time"]}ms | Rows Returned: \${queryPlan["Actual Rows"]}\`);
console.log("Memory Cache Hit Rate: 100% (Zero disk read!)");`,
    experimentQuestion: 'ما هي ميزة الفهرس الجزئي (Partial Index) مثل CREATE INDEX ON orders(user_id) WHERE status = \'pending\'؟',
    experimentAnswer: 'الفهرس الجزئي يفهرس فقط الصفوف التي تطابق الشرط المحدد؛ مما يقلل حجم الفهرس بنسبة 95% ويسرع عمليات الإدخال والتعديل مع توفير أقصى سرعة لاستعلامات الحالات النشطة.',
    codeAnatomy: [
      { line: '1: -- Partial Index for active users only', note: 'فهرس جزئي موفر للمساحة' },
      { line: '2: CREATE INDEX idx_active_users ON users(last_login) WHERE is_active = true;', note: 'تضمين السجلات النشطة فقط' },
      { line: '3: -- GIN Index for blazing fast JSONB queries', note: 'فهرس GIN لحقول JSONB' },
      { line: '4: CREATE INDEX idx_user_metadata ON users USING GIN (metadata);', note: 'فهرسة الكائنات والخصائص الداخلية' }
    ],
    pitfallBad: 'SELECT * FROM users WHERE LOWER(email) = \'test@dev.io\'; /* الفهرس العادي على email سيتعطل تماماً بسبب دالة LOWER! */',
    pitfallGood: 'CREATE INDEX idx_users_lower_email ON users(LOWER(email)); /* فهرس وظيفي مخصص */',
    pitfallDiagnosis: 'تطبيق الدوال على الأعمدة داخل WHERE يلغي استخدام الفهارس العادية ويتطلب إنشاء Expression Index.',
    quizPool: [{
      q: 'Which PostgreSQL index type is ideal for massive time-series tables where data is physically stored in chronological order on disk?',
      qAr: 'أي نوع من فهارس PostgreSQL هو الأنسب للجداول الزمنية الضخمة حيث تُخزن البيانات بالترتيب على القرص؟',
      options: ['Hash', 'BRIN (Block Range Index)', 'GiST', 'SP-GiST'],
      correct: 1,
      why: 'BRIN indexes summarize block ranges and use a tiny fraction of the disk/RAM space required by B-Trees.',
      whyAr: 'فهارس BRIN تلخص نطاقات الكتل وتستهلك جزءاً ضئيلاً جداً من الذاكرة مقارنة بـ B-Tree.'
    }],
    interviewQ: 'ما هو الفرق بين Seq Scan و Index Scan و Bitmap Index Scan في خطط تنفيذ PostgreSQL؟',
    interviewA: 'الـ `Seq Scan` يقرأ كل صفحة من الجدول بالتتابع. والـ `Index Scan` يبحث في شجرة الفهرس ويذهب مباشرة لموقع الصف على القرص (ممتاز لعدد صفوف قليل). والـ `Bitmap Index Scan` يبحث في الفهرس أولاً وينشئ خريطة بتية (Bitmap) في الذاكرة بالصفحات المطلوبة ثم يقرأها مرتبة من القرص مرة واحدة (مثالي عندما ترجع نتائج الاستعلام عدداً متوسطاً من الصفوف).'
  },
  {
    slug: 'transactions-concurrency',
    title: 'Transactions, Isolation Levels, MVCC & Row-Level Locking in PostgreSQL',
    titleAr: 'المعاملات والتزامن في PostgreSQL: مستويات العزل، معمارية MVCC والأقفال',
    level: 3,
    order: 5,
    estMinutes: 28,
    version: 'PostgreSQL 16+',
    pattern: 'Concurrency Control',
    problemOpening: `كيف تستطيع PostgreSQL خدمة آلاف عمليات القراءة والكتابة في نفس اللحظة دون أن يعطل القارئ الكاتب (Readers don't block Writers)? السر يكمن في معمارية <code dir="ltr">MVCC</code> (Multi-Version Concurrency Control) حيث يتم إنشاء إصدارات متعددة من كل صف (Tuples مع xmin و xmax). فهم مستويات العزل (Read Committed, Repeatable Read, Serializable) والأقفال الصريحة (<code dir="ltr">SELECT ... FOR UPDATE</code>) هو مفتاح منع مشاكل حجز التذاكر المزدوج وسحب الأرصدة المتزامن.`,
    objectives: [
      'فهم معمارية MVCC وكيفية عمل علامات xmin و xmax وعمليات التنظيف (VACUUM).',
      'التمييز بين مستويات العزل الثلاثة وظواهر التضارب: Dirty Reads, Non-Repeatable Reads, Phantom Reads.',
      'تطبيق القفل الصريح للصفوف (Pessimistic Locking) بـ SELECT ... FOR UPDATE.'
    ],
    mechanics: [
      { step: 1, title: 'معمارية الـ MVCC', desc: 'كل تعديل ينشئ نسخة جديدة من الصف ويوجه القراء للنسخة المعتمدة وقت بدء استعلامهم دون قفل الجدول.' },
      { step: 2, title: 'القفل المتشائم (SELECT ... FOR UPDATE)', desc: 'قفل الصف المالي أو مقعد الحجز حتى اكتمال المعاملة لمنع مستخدم آخر من حجزه في نفس الثانية.' },
      { step: 3, title: 'التنظيف التلقائي (AutoVACUUM)', desc: 'حذف النسخ الميتة القديمة (Dead Tuples) وتحرير مساحة الصفحات في الذاكرة والقرص.' }
    ],
    playgroundCode: `// Seat Reservation Double-Booking Prevention Simulation
async function bookSeat(seatId, userId) {
  console.log(\`🔒 BEGIN TRANSACTION;\`);
  console.log(\`  SELECT * FROM seats WHERE id = \${seatId} FOR UPDATE; -- Row Locked!\`);
  console.log(\`  UPDATE seats SET user_id = '\${userId}', status = 'BOOKED' WHERE id = \${seatId};\`);
  console.log(\`✅ COMMIT; -- Lock Released safely!\`);
}

bookSeat(42, "user_amr");`,
    experimentQuestion: 'ما هي ظاهرة Deadlock في قواعد البيانات وكيف تتعامل معها PostgreSQL؟',
    experimentAnswer: 'تحدث عندما تقفل المعاملة A الصف 1 وتطلب الصف 2، بينما تقفل المعاملة B الصف 2 وتطلب الصف 1؛ يرصد محرك PostgreSQL هذا التوقف الدائري تلقائياً عبر deadlock_timeout ويقوم بإلغاء إحدى المعاملتين وإرجاع خطأ Deadlock detected.',
    codeAnatomy: [
      { line: '1: BEGIN;', note: 'بدء المعاملة' },
      { line: '2: SELECT balance FROM accounts WHERE id = 101 FOR UPDATE;', note: 'قفل تشاؤمي حصري على الصف' },
      { line: '3: UPDATE accounts SET balance = balance - 50 WHERE id = 101;', note: 'تعديل الرصيد بأمان تام' },
      { line: '4: COMMIT;', note: 'تثبيت التغيير وتحرير القفل' }
    ],
    pitfallBad: 'const bal = await getBal(); await updateBal(bal - 50); /* ثغرة Race Condition تتيح سحب الرصيد مرتين! */',
    pitfallGood: 'UPDATE accounts SET balance = balance - 50 WHERE id = 101 AND balance >= 50;',
    pitfallDiagnosis: 'قراءة الرصيد ثم تعديله في استعلامين منفصلين خارج قفل المعاملة يتيح سحب أموال أكثر من الرصيد الحقيقي.',
    quizPool: [{
      q: 'Which SQL clause locks selected rows against concurrent modifications until the current transaction ends?',
      qAr: 'أي جملة SQL تقفل الصفوف المحددة ضد أي تعديلات متزامنة حتى تنتهي المعاملة الحالية؟',
      options: ['LOCK TABLE', 'FOR UPDATE', 'ISOLATE ROWS', 'FREEZE'],
      correct: 1,
      why: '`SELECT ... FOR UPDATE` acquires an exclusive row-level lock on the selected rows.',
      whyAr: 'جملة FOR UPDATE تحجز قفلاً حصرياً على مستوى الصف لمنع أي معاملة أخرى من تعديله.'
    }],
    interviewQ: 'ما هي وظيفة أمر VACUUM FULL في PostgreSQL ومتى يجب الحذر الشديد عند استخدامه؟',
    interviewA: 'أمر `VACUUM` العادي يعلم على الصفحات الميتة لإعادة استخدامها دون قفل الجداول. أما `VACUUM FULL` فيقوم بإعادة كتابة الجدول بالكامل على القرص لتقليص حجمه وتحرير المساحة لنظام التشغيل، لكنه يأخذ قفلاً حصرياً كاملاً (Exclusive Table Lock) يمنع أي قراءة أو كتابة على الجدول حتى ينتهي، لذا يحظر تشغيله في أوقات الذروة الإنتاجية.'
  },
  {
    slug: 'jsonb-hybrid-patterns',
    title: 'PostgreSQL JSONB: Hybrid Relational-Document Storage, Operators & Indexing',
    titleAr: 'حقول JSONB في PostgreSQL: التخزين الهجين، المشغلات وفهارس الاحتواء السريعة',
    level: 3,
    order: 6,
    estMinutes: 26,
    version: 'PostgreSQL 16+',
    pattern: 'Hybrid Data Architecture',
    problemOpening: `هل تعلم أن PostgreSQL تدعم وثائق NoSQL بكفاءة وسرعة تنافس MongoDB بفضل نوع <code dir="ltr">JSONB</code> (Binary JSON)? يتيح لك هذا النوع الجمع بين قوة القيود العلائقية (SQL Relational Integrity) ومرونة المستندات الديناميكية (NoSQL Flexibility) في نفس الجدول! بفضل مشغلات البحث المتقدمة (<code dir="ltr">-&gt;</code>, <code dir="ltr">-&gt;&gt;</code>, <code dir="ltr">@&gt;</code>) وفهارس GIN، يمكنك استعلام والبحث في كائنات JSONB المعقدة في أجزاء من الميلي ثانية.`,
    objectives: [
      'فهم الفرق الجذري بين نوع JSON النصي ونوع JSONB المفكك الثنائي.',
      'إتقان مشغلات الاستخراج والتضمين: -> (يرجع JSON)، ->> (يرجع نصاً)، و @> (مشغل الاحتواء Containment).',
      'بناء فهارس GIN مع فئة jsonb_path_ops لتحقيق أعلى أداء للاستعلامات.'
    ],
    mechanics: [
      { step: 1, title: 'التخزين الثنائي المفكك (Decomposed Binary)', desc: 'JSONB يحلل الكائن مسبقاً ويزيل المسافات الزائدة ويرتب المفاتيح للبحث الفوري O(1).' },
      { step: 2, title: 'مشغل الاحتواء (@>)', desc: 'استعلام سريع يفحص ما إذا كان كائن الـ JSONB يحتوي على هيكل محدد (WHERE metadata @> \'{"status": "active"}\').' },
      { step: 3, title: 'التعديل الموضعي بـ jsonb_set', desc: 'تعديل مفتاح متداخل داخل كائن JSONB دون إعادة كتابة الكائن كاملاً.' }
    ],
    playgroundCode: `// JSONB Operator Evaluation Simulator
const userDoc = {
  id: "u1",
  profile: { age: 28, skills: ["SQL", "React"], preferences: { theme: "dark" } }
};

console.log("-> Operator (returns JSON):", JSON.stringify(userDoc.profile.preferences));
console.log("->> Operator (returns Text):", userDoc.profile.preferences.theme);
console.log("@> Containment Test (skills contains 'SQL'):", userDoc.profile.skills.includes("SQL"));`,
    experimentQuestion: 'ما هو الفرق بين jsonb_ops الافتراضي و jsonb_path_ops عند إنشاء فهرس GIN على حقل JSONB؟',
    experimentAnswer: 'الـ jsonb_ops يفهرس كل مفتاح وقيمة على حدة ويدعم مشغلات مثل ? و ?&، بينما jsonb_path_ops يفهرس مسارات التجزئة الكاملة فقط (Hashes)، مما يجعله أصغر حجماً بنسبة 60% وأسرع بكثير في استعلامات مشغل الاحتواء (@>).',
    codeAnatomy: [
      { line: '1: -- Querying JSONB using Containment operator (@>)', note: 'استعلام احتواء فائق السرعة' },
      { line: '2: SELECT * FROM products WHERE attributes @> \'{"brand": "Apple", "color": "Silver"}\';', note: 'مطابقة الخصائص الداخلية' },
      { line: '3: -- Updating a nested JSONB key', note: 'تعديل خاصية متداخلة' },
      { line: '4: UPDATE products SET attributes = jsonb_set(attributes, \'{specs, ram}\', \'"16GB"\');', note: 'تحديث عميق' }
    ],
    pitfallBad: 'استخدام نوع JSON الكلاسيكي بدلاً من JSONB في PostgreSQL الحديثة!',
    pitfallGood: 'استخدام نوع JSONB دائماً للاستفادة من الفهارس والبحث الثنائي فائق السرعة',
    pitfallDiagnosis: 'النوع JSON يخزن النص كما هو ويعيد تحليله مع كل استعلام ولا يدعم فهارس GIN مما يجعله بطيئاً جداً.',
    quizPool: [{
      q: 'Which PostgreSQL operator extracts a JSON sub-object as plain `TEXT`?',
      qAr: 'أي مشغل في PostgreSQL يستخرج الخاصية من كائن JSON كنص عادي (Plain TEXT)؟',
      options: ['->', '->>', '#>', '@>'],
      correct: 1,
      why: 'The `->>` operator extracts JSON data as standard SQL `text`.',
      whyAr: 'المشغل ->> يستخرج القيمة كنص عادي text صالح للمقارنات المباشرة.'
    }],
    interviewQ: 'متى تختار تخزين البيانات كأعمدة علائقية عادية ومتى تضعها داخل حقل JSONB في PostgreSQL؟',
    interviewA: 'نستخدم الأعمدة العلائقية للبيانات الأساسية ذات البنية الثابتة التي نحتاج لتطبيق قيود صارمة عليها (Foreign Keys, Primary Keys, Unique) وتدخل بكثرة في الـ Joins. ونستخدم `JSONB` للبيانات الديناميكية متغيرة الهيكل (Polymorphic Attributes مثل مواصفات المنتجات المتنوعة في المتاجر) أو الإعدادات الوصفية وبيانات الأطراف الثالثة (Third-Party Webhooks).'
  },
  {
    slug: 'subqueries-ctes',
    title: 'Advanced SQL: Common Table Expressions (CTEs), Recursive CTEs & Window Functions',
    titleAr: 'استعلامات SQL المتقدمة: الجداول المؤقتة (CTEs)، التكرار ودوال النوافذ (Window Functions)',
    level: 3,
    order: 7,
    estMinutes: 28,
    version: 'PostgreSQL 16+',
    pattern: 'Analytical SQL',
    problemOpening: `كتابة استعلامات فرعية متداخلة (Nested Subqueries) يجعل الكود معقداً ومستحيلاً في الصيانة. توفر PostgreSQL ميزات SQL التحليلية الأقوى: تعبيرات الجداول العامة <code dir="ltr">CTEs (WITH Queries)</code> لتقسيم الاستعلام لمنطق مقروء، الـ <code dir="ltr">Recursive CTEs</code> للاستعلام في الهياكل الشجرية والشبكية (مثل الهيكل الوظيفي للأقسام)، ودوال النوافذ <code dir="ltr">Window Functions (OVER, ROW_NUMBER, RANK)</code> لحساب المعدلات التراكمية بدون تقليص الصفوف!`,
    objectives: [
      'هيكلة الاستعلامات المعقدة باستخدام Common Table Expressions (WITH clauses).',
      'استخدام Recursive CTEs للبحث في الأشجار الهرمية والشبكات التنظيمية.',
      'تطبيق Window Functions (ROW_NUMBER(), DENSE_RANK(), LAG(), LEAD()) مع جملة OVER (PARTITION BY ... ORDER BY ...).'
    ],
    mechanics: [
      { step: 1, title: 'تعبيرات الجداول العامة (CTEs)', desc: 'بناء جداول مؤقتة مسماة تُقرأ كأنها خطوات متسلسلة في الكود البرمجي.' },
      { step: 2, title: 'دوال النوافذ (Window Functions)', desc: 'حساب المجاميع والترتيبات عبر مجموعات فرعية (Partitions) مع الحفاظ على كل الصفوف الفردية.' },
      { step: 3, title: 'الاستعلام العودي (WITH RECURSIVE)', desc: 'المرور المتكرر على العلاقات الأبوية والأبناء حتى استيفاء شرط التوقف.' }
    ],
    playgroundCode: `// Window Function (ROW_NUMBER & Running Total) Simulator
const sales = [
  { dept: "IT", agent: "Amr", amount: 500 },
  { dept: "IT", agent: "Sara", amount: 700 },
  { dept: "HR", agent: "Omar", amount: 300 }
];

// Simulating: ROW_NUMBER() OVER (PARTITION BY dept ORDER BY amount DESC)
const ranked = sales.map((sale, idx) => ({
  ...sale,
  rankInDept: sales.filter(s => s.dept === sale.dept && s.amount >= sale.amount).length
}));

console.log("Simulated Window Ranked Sales:", JSON.stringify(ranked, null, 2));`,
    experimentQuestion: 'ما هو الفرق الجوهري بين GROUP BY ودوال الـ Window Functions في SQL؟',
    experimentAnswer: 'الـ GROUP BY تجمع الصفوف المتعددة وتقلصها إلى صف واحد لكل مجموعة، بينما Window Functions تحسب القيم التراكمية والتحليلية مع الحفاظ على جميع الصفوف الفردية كاملة دون أي دمج أو تقليص.',
    codeAnatomy: [
      { line: '1: WITH TopSales AS (', note: 'تعريف CTE الجدول المؤقت' },
      { line: '2:   SELECT user_id, amount, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) as rn', note: 'ترقيم طلبات كل مستخدم' },
      { line: '3:   FROM orders', note: 'جدول الطلبات' },
      { line: '4: )', note: 'إغلاق CTE' },
      { line: '5: SELECT * FROM TopSales WHERE rn = 1; -- يجلب آخر طلب لكل مستخدم حصراً', note: 'استعلام نهائي فائق النقاء' }
    ],
    pitfallBad: 'كتابة استعلام فرعي متكرر 4 مرات داخل عبارات SELECT و WHERE و JOIN!',
    pitfallGood: 'تعريف الاستعلام مرة واحدة في CTE باسم معبر واستخدامه في باقي الكود',
    pitfallDiagnosis: 'تكرار الاستعلامات الفرعية يضاعف زمن التنفيذ ويجعل الكود غير قابل للتعديل.',
    quizPool: [{
      q: 'Which SQL Window function provides the value of a column from the previous row in the ordered partition without needing a self-join?',
      qAr: 'أي دالة نافذة في SQL توفر قيمة العمود من الصف السابق مباشرة داخل المجموعة المرتبة دون الحاجة لـ Self-Join؟',
      options: ['LEAD()', 'LAG()', 'PREV()', 'FIRST_VALUE()'],
      correct: 1,
      why: '`LAG(column, offset)` accesses data from a previous row at a specified physical offset.',
      whyAr: 'الدالة LAG تتيح قراءة قيمة الصف السابق مباشرة لحساب فروق النمو والتغيرات الزمنية.'
    }],
    interviewQ: 'كيف يعمل WITH RECURSIVE في استعلام الأشجار الهرمية (مثل شجرة الفئات أو التعليقات المتداخلة)؟',
    interviewA: 'يتكون من جزأين يربطهما `UNION ALL`: 1. `Non-Recursive Base Query`: يجلب جذور الشجرة (مثل الفئات الرئيسية التي ليس لها parent_id). 2. `Recursive Query`: ينضم مع نتيجة الـ CTE السابقة لجلب الأبناء المباشرين، ويكرر المحرك هذه الخطوة تلقائياً حتى لا يتبقى أي أبناء جدد.'
  },
  {
    slug: 'triggers-stored-procedures',
    title: 'PL/pgSQL Functions, Triggers, Audit Logging & Generated Columns',
    titleAr: 'دوال PL/pgSQL، مشغلات الـ Triggers، سجلات التدقيق والأعمدة المحسوبة',
    level: 3,
    order: 8,
    estMinutes: 26,
    version: 'PostgreSQL 16+',
    pattern: 'Database Automation',
    problemOpening: `في الأنظمة المالية والتطبيقات المحاسبية، الاعتماد على كود الباك إند فقط لتحديث تواريخ التعديل (updated_at) أو تسجيل سجلات التدقيق وحركات الحذف والتعديل (Audit Logging) يترك ثغرة خطيرة لو تم تعديل البيانات يدوياً من السيرفر. مشغلات <code dir="ltr">Triggers</code> ودوال <code dir="ltr">PL/pgSQL</code> المدمجة في PostgreSQL تعمل تلقائياً على مستوى المحرك لتسجيل كل حدث بدقة متناهية.`,
    objectives: [
      'كتابة دوال مخزنة (Stored Functions) بلغة PL/pgSQL مع معالجة الاستثناءات.',
      'بناء مشغلات Triggers للأحداث: BEFORE/AFTER (INSERT, UPDATE, DELETE).',
      'بناء نظام سجلات تدقيق غير قابل للتلاعب (Immutable Audit Log Table) باستخدام كائنات NEW و OLD.'
    ],
    mechanics: [
      { step: 1, title: 'دالة المشغل (Trigger Function)', desc: 'دالة خاصة ترجع نوع TRIGGER وتتعامل مع المتغيرين السحريين NEW (البيانات الجديدة) و OLD (البيانات السابقة).' },
      { step: 2, title: 'المشغلات قبل التعديل (BEFORE UPDATE)', desc: 'تحديث حقل updated_at = NOW() تلقائياً قبل حفظ الصف على القرص.' },
      { step: 3, title: 'الأعمدة المحسوبة المخزنة (STORED Generated Columns)', desc: 'حساب قيم الأعمدة تلقائياً (مثل total = price * quantity) وحفظها مفهرسة دون أي تدخل برمجي.' }
    ],
    playgroundCode: `// PL/pgSQL Trigger Logic Simulator
function auditTrigger(action, oldRow, newRow) {
  const auditEntry = {
    action,
    tableName: "accounts",
    changedBy: "admin_system",
    oldData: oldRow,
    newData: newRow,
    timestamp: new Date().toISOString()
  };
  console.log(\`📜 [Audit Trigger Fired: \${action}] Secure Log Entry Created:\`);
  console.log(JSON.stringify(auditEntry, null, 2));
}

auditTrigger("UPDATE", { id: 101, balance: 500 }, { id: 101, balance: 450 });`,
    experimentQuestion: 'ما هو الفرق بين المشغل على مستوى الصف (FOR EACH ROW) والمشغل على مستوى الجملة (FOR EACH STATEMENT)؟',
    experimentAnswer: 'المشغل FOR EACH ROW ينفذ دالة الـ Trigger لكل صف يتأثر بالاستعلام (إذا حدثت 100 صف ينفذ 100 مرة)، بينما FOR EACH STATEMENT ينفذ الدالة مرة واحدة فقط لكل أمر SQL بغض النظر عن عدد الصفوف المعدلة.',
    codeAnatomy: [
      { line: '1: CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$', note: 'دالة مشغل بلغة PL/pgSQL' },
      { line: '2: BEGIN', note: 'بداية الكتلة' },
      { line: '3:   NEW.updated_at = CURRENT_TIMESTAMP;', note: 'إسناد الوقت الحالي للنسخة الجديدة' },
      { line: '4:   RETURN NEW;', note: 'إرجاع الصف المعدل للحفظ' },
      { line: '5: END; $$ LANGUAGE plpgsql;', note: 'نهاية الدالة' }
    ],
    pitfallBad: 'تحديث updated_at يدوياً في كل استعلام UPDATE في كود Node.js (نسيان واحد يفسد التاريخ)',
    pitfallGood: 'إنشاء Trigger تلقائي على مستوى قاعدة البيانات يحدث updated_at مع كل تعديل',
    pitfallDiagnosis: 'الاعتماد على الكود الخارجي لتحديث التواريخ الإلزامية يؤدي لظهور بيانات غير متسقة عند استخدام أدوات متعددة.',
    quizPool: [{
      q: 'Which special record variable inside a PostgreSQL trigger function holds the new database row for INSERT and UPDATE operations?',
      qAr: 'ما هو المتغير الخاص داخل دالة الـ Trigger الذي يحمل بيانات الصف الجديد في عمليات الإدخال والتعديل؟',
      options: ['CURRENT', 'NEW', 'NEXT', 'TARGET'],
      correct: 1,
      why: '`NEW` contains the new database row for INSERT/UPDATE operations in row-level triggers.',
      whyAr: 'المتغير NEW يحمل بيانات الصف الجديد قيد المعالجة في المشغلات على مستوى الصف.'
    }],
    interviewQ: 'ما هي الأعمدة المحسوبة (Generated Columns) وما الفرق بين VIRTUAL و STORED في SQL الحديث؟',
    interviewA: 'الأعمدة المحسوبة هي أعمدة تُحسب قيمتها تلقائياً من أعمدة أخرى في نفس الجدول؛ النوع `STORED` يحسب القيمة عند الإدخال/التعديل ويخزنها على القرص ويتيح فهرستها بـ B-Tree. والنوع `VIRTUAL` يحسب القيمة لحظياً عند كل قراءة دون استهلاك أي مساحة على القرص.'
  },
  {
    slug: 'connection-pooling',
    title: 'PostgreSQL Connection Lifecycles & High-Performance Pooling with PgBouncer',
    titleAr: 'دورة حياة الاتصالات وتجميع الاتصالات عالي الأداء بـ PgBouncer',
    level: 3,
    order: 9,
    estMinutes: 26,
    version: 'PostgreSQL 16 / PgBouncer',
    pattern: 'Infrastructure & Performance',
    problemOpening: `في PostgreSQL، كل اتصال جديد من العميل يُنشئ عملية جديدة بالكامل في نظام التشغيل (OS Process) تستهلك حوالي 10MB من الـ RAM ومصافحة اتصال ثقيلة! لو كان عندك 5,000 مستخدم فتحوا الموقع في نفس اللحظة وتطبيقك فتح 5,000 اتصال مباشر، السيرفر سينهار فوراً باستهلاك 50GB من الـ RAM! تجميع الاتصالات (Connection Pooling عبر PgBouncer) يتيح لآلاف المستخدمين مشاركة 50 أو 100 اتصال فعلي فقط بسرعة خيالية.`,
    objectives: [
      'فهم تكلفة الاتصالات في PostgreSQL (Process-per-Connection Model).',
      'تكوين مجمع الاتصالات الداخلي في Node.js باستخدام مكتبة pg.Pool.',
      'إتقان أوضاع تجميع PgBouncer الثلاثة: Session Pooling, Transaction Pooling, Statement Pooling.'
    ],
    mechanics: [
      { step: 1, title: 'مجمع الاتصالات المحلي (pg.Pool)', desc: 'الاحتفاظ بعدد ثابت من الاتصالات المفتوحة وإعادتها للمجمع بعد انتهاء الاستعلام.' },
      { step: 2, title: 'مجمع خفيف وسيط (PgBouncer)', desc: 'خادم وسيط خفيف بلغة C يخدم 10,000 اتصال عميل عبر 50 اتصال حقيقي لقاعدة البيانات.' },
      { step: 3, title: 'وضع Transaction Pooling', desc: 'تخصيص الاتصال للعميل طوال فترة المعاملة فقط وتحريره فوراً بعد الـ COMMIT لمستخدم آخر.' }
    ],
    playgroundCode: `// Connection Pool Acquisition & Release Simulator
class MockPgPool {
  constructor(maxSize = 5) {
    this.maxSize = maxSize;
    this.active = 0;
  }
  async query(sql) {
    if (this.active >= this.maxSize) {
      console.log(\`⏳ Pool Saturated (\${this.active}/\${this.maxSize}). Request waiting in queue...\`);
    }
    this.active++;
    console.log(\`⚡ Connection Acquired! Active: \${this.active}/\${this.maxSize} | Executing: \${sql}\`);
    // Simulating instant query execution
    this.active--;
    console.log(\`🔄 Connection Released back to pool! Active: \${this.active}/\${this.maxSize}\`);
  }
}

const pool = new MockPgPool(2);
pool.query("SELECT * FROM users;");
pool.query("SELECT * FROM orders;");`,
    experimentQuestion: 'لماذا يعتبر Transaction Pooling في PgBouncer الخيار الأكثر شيوعاً في الإنتاج وما هو القيد الرئيسي له؟',
    experimentAnswer: 'لأنه يوفر أقصى كفاءة لمشاركة الاتصالات؛ لكن قيده الرئيسي هو أنه يمنع استخدام الخصائص المعتمدة على مستوى الجلسة (Session-Level Features) مثل الجداول المؤقتة (Temporary Tables) وأمر LISTEN/NOTIFY و PREPARE المباشر.',
    codeAnatomy: [
      { line: '1: import pg from "pg";', note: 'مكتبة بوستجريس' },
      { line: '2: const pool = new pg.Pool({', note: 'إنشاء مجمع اتصالات' },
      { line: '3:   max: 20, // أقصى عدد اتصالات متزامنة', note: 'حماية الذاكرة' },
      { line: '4:   idleTimeoutMillis: 30000,', note: 'إغلاق الاتصالات الخاملة' },
      { line: '5:   connectionTimeoutMillis: 2000', note: 'مهلة انتظار الحصول على اتصال' },
      { line: '6: });', note: 'المجمع جاهز' }
    ],
    pitfallBad: 'const client = new pg.Client(); client.connect(); /* اتصال فردي لكل طلب يسقط السيرفر */',
    pitfallGood: 'const pool = new pg.Pool(); const res = await pool.query(...); /* تجميع تلقائي آمن */',
    pitfallDiagnosis: 'إنشاء اتصالات فردية مستمرة يستهلك ذاكرة السيرفر ويصل سريعاً لحد max_connections.',
    quizPool: [{
      q: 'Which PgBouncer pooling mode releases the database connection back to the pool as soon as the current transaction commits or rolls back?',
      qAr: 'أي وضع تجميع في PgBouncer يعيد اتصال قاعدة البيانات للمجمع فور اكتمال المعاملة الحالية (COMMIT/ROLLBACK)؟',
      options: ['Session pooling', 'Transaction pooling', 'Statement pooling', 'Worker pooling'],
      correct: 1,
      why: 'Transaction pooling assigns a connection to the client only for the duration of a transaction.',
      whyAr: 'وضع Transaction Pooling يخصص الاتصال أثناء تنفيذ المعاملة فقط ويحرره فوراً لمستخدم آخر.'
    }],
    interviewQ: 'كيف تضبط الحجم المثالي لمجمع الاتصالات (Pool Size) في بيئة الإنتاج؟',
    interviewA: 'المعادلة الشهيرة المعتمدة من فريق PostgreSQL هي: `Pool Size = ((Core Count * 2) + Effective Spindle Count)`. على سبيل المثال، سيرفر بمعالج 4 Cores وأقراص SSD يحتاج إلى مجمع بحجم يتراوح بين 10 إلى 20 اتصال فقط لتحقيق أقصى إنتاجية للمعالج وتجنب اختناقات الـ Context Switching.'
  },
  {
    slug: 'security-backup-pg',
    title: 'PostgreSQL Production Security: Row-Level Security (RLS), pg_dump & WAL Archiving',
    titleAr: 'أمان وتأمين PostgreSQL: أمان مستوى الصف (RLS)، النسخ بـ pg_dump وأرشفة WAL',
    level: 3,
    order: 10,
    estMinutes: 26,
    version: 'PostgreSQL 16 Production',
    pattern: 'Security & Disaster Recovery',
    problemOpening: `حماية قاعدة البيانات في الإنتاج تتجاوز كلمات السر المشفرة. ميزة <code dir="ltr">Row-Level Security (RLS)</code> في PostgreSQL تقدم أماناً ثورياً على مستوى المحرك: حتى لو استطاع العميل استدعاء <code dir="ltr">SELECT * FROM documents</code>، فإن المحرك لن يُرجع له سوى الصفوف التي يمتلك صلاحيتها فقط! بالإضافة إلى استراتيجيات استرجاع الكوارث الشاملة باستخدام <code dir="ltr">pg_dump</code> وأرشفة سجلات <code dir="ltr">WAL</code> لتحقيق الاسترجاع لأي لحظة زمنية سابقة (Point-In-Time Recovery: PITR).`,
    objectives: [
      'تفعيل وتطبيق سياسات الأمان على مستوى الصف (Row-Level Security: RLS Policies).',
      'تنفيذ النسخ الاحتياطي المتناسق بـ pg_dump (Custom Directory & Tar formats).',
      'فهم معمارية الـ Write-Ahead Logging (WAL) والاسترجاع لأي نقطة زمنية (PITR).'
    ],
    mechanics: [
      { step: 1, title: 'تفعيل سياسات الـ RLS', desc: 'ربط الجداول بسياسات أمان تعتمد على معرف المستخدم الحالي (current_setting(\'app.current_user_id\')).' },
      { step: 2, title: 'النسخ المنطقي بـ pg_dump', desc: 'تصدير هياكل البيانات والجداول في أرشيف مضغوط متناسق دون قفل عمليات القراءة والكتابة.' },
      { step: 3, title: 'الاسترجاع الزمني التام (PITR)', desc: 'إعادة تشغيل سجلات الـ WAL للرجوع بالبيانات إلى الثانية التي سبقت حدوث الخطأ البشري مباشرة.' }
    ],
    playgroundCode: `// Row-Level Security Policy Engine Simulation
const documentsTable = [
  { id: 1, title: "Amr's Invoice", ownerId: "user_101" },
  { id: 2, title: "Sara's Medical Record", ownerId: "user_202" }
];

function queryWithRLS(currentUser) {
  console.log(\`🔒 RLS Enforced for User [\${currentUser}]\`);
  const visibleRows = documentsTable.filter(doc => doc.ownerId === currentUser);
  console.log("Visible Database Rows (Filtered by Engine):", JSON.stringify(visibleRows));
}

queryWithRLS("user_101");`,
    experimentQuestion: 'لماذا يعتبر الـ Point-in-Time Recovery (PITR) منقذاً للحياة في حالات حذف الجداول بالخطأ (DROP TABLE) مقارنة بالنسخ الاحتياطي اليومي؟',
    experimentAnswer: 'لأن النسخ اليومي يفقد جميع بيانات اليوم حتى لحظة الحذف، بينما الـ PITR يعيد تشغيل سجلات الـ WAL حتى الدقيقة 14:29:59 (قبل تنفيذ أمر DROP TABLE بالثانية 14:30:00) دون فقدان أي معاملة سابقة.',
    codeAnatomy: [
      { line: '1: ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;', note: 'تفعيل أمان مستوى الصف' },
      { line: '2: CREATE POLICY invoice_owner_policy ON invoices', note: 'إنشاء سياسة الأمان' },
      { line: '3:   FOR ALL USING (owner_id = current_setting(\'app.user_id\')::uuid);', note: 'حصر الوصول للمالك فقط' }
    ],
    pitfallBad: 'pg_dump -U postgres dbname > backup.sql /* ملف نصي ضخم غير مضغوط وبطيء في الاسترجاع */',
    pitfallGood: 'pg_dump -Fc -Z 9 -U postgres dbname > backup.dump /* أرشيف ثنائي مخصص مضغوط فائق السرعة */',
    pitfallDiagnosis: 'النسخ النصي العادي يستهلك مساحة ضخمة ولا يدعم الاسترجاع المتوازي (Parallel Restore عبر pg_restore -j 4).',
    quizPool: [{
      q: 'Which PostgreSQL feature enforces data access restrictions directly at the database engine level so users only see rows they own?',
      qAr: 'أي ميزة في PostgreSQL تفرض قيود الوصول للبيانات على مستوى محرك قاعدة البيانات مباشرة ليرى المستخدم صفوفه فقط؟',
      options: ['Table Locking', 'Row-Level Security (RLS)', 'Column Masking', 'Audit Triggers'],
      correct: 1,
      why: 'Row-Level Security (RLS) restricts which rows can be returned by queries or modified by commands on a per-user basis.',
      whyAr: 'ميزة RLS تقيد الصفوف المرجعة أو المعدلة بناءً على هوية وسياسة المستخدم مباشرة في المحرك.'
    }],
    interviewQ: 'ما هي معمارية الـ Write-Ahead Logging (WAL) وفيمَ تستخدم في PostgreSQL؟',
    interviewA: 'الـ WAL هي سجل متسلسل غير قابل للتعديل (Append-Only Log) على القرص تُسجل فيه كل التعديلات قبل كتابتها في صفحات البيانات الفعلية؛ تضمن استرجاع البيانات الفوري عند انقطاع الكهرباء (Crash Recovery) وتُستخدم في مزامنة الـ Replication والاسترجاع الزمني (PITR).'
  }
];
