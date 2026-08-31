/* ============================================================
   scripts/curriculum-data/postgresql-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 6: PostgreSQL 18 Relational & Hybrid Engine (All 9 Lessons).
   ============================================================ */

export const postgresqlLessons = [
  {
    slug: 'sql-syntax-data-types',
    title: 'SQL DDL/DML & PostgreSQL Advanced Types: UUID, JSONB, Arrays & Timestamptz',
    titleAr: 'أوامر SQL وأنواع بيانات PostgreSQL المتقدمة: معمارية UUIDv7، مستندات JSONB والمصفوفات الأصلية',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'PostgreSQL 18+',
    pattern: 'Data Modeling & Advanced Relational Types',
    objectives: [
      'التمييز الصارم بين أوامر تعريف البيانات (DDL: CREATE, ALTER) وأوامر معالجة البيانات (DML: SELECT, INSERT, UPDATE).',
      'استخدام أنواع البيانات المتقدمة في PostgreSQL: المعرفات الفريدة (UUIDv7)، مستندات JSONB الثنائية، والمصفوفات الأصلية TEXT[].',
      'تطبيق القيود الصارمة (Integrity Constraints: PRIMARY KEY, UNIQUE, CHECK, NOT NULL, FOREIGN KEY).',
      'التعامل الاحترافي مع التواريخ العالمية وتفادي كوارث المناطق الزمنية باستخدام TIMESTAMPTZ.'
    ],
    problemOpening: `
      بوستجريس (PostgreSQL) تُلقب بين كبار المهندسين المعماريين بـ **"أقوى وأصلب قاعدة بيانات علائقية مفتوحة المصدر في العالم"**.
      قوتها لا تقتصر على الجداول التقليدية فحسب؛ بل في ترسانة أنواع البيانات المتقدمة التي تجعلها تجمع بين قوة الـ SQL ومرونة الـ NoSQL:
      - المصفوفات الأصلية (<code dir="ltr">TEXT[]</code>, <code dir="ltr">INTEGER[]</code>) لتخزين القوائم البسيطة بدون الحاجة لجداول وسيطة إضافية.
      - مستندات <code dir="ltr">JSONB</code> الثنائية القابلة للفهرسة بالكامل بـ GIN Indexes.
      - المعرفات العالمية المرتبة زمنياً **UUIDv7** لحماية أرقام السجلات من هجمات التخمين دون إبطاء الفهارس.
      المبرمج المبتدئ يستخدم نوع <code dir="ltr">FLOAT</code> لتخزين المبالغ المالية، فيفاجأ بضياع القروش وأخطاء التقريب الحسابية القاتلة (Floating Point Arithmetic Loss)!
      في هذا الدرس، هنتعلم القواعد الصارمة لبناء جداول PostgreSQL محصنة بقيود <code dir="ltr">CHECK</code> و <code dir="ltr">NUMERIC</code>، وهنفهم معمارية الـ **TIMESTAMPTZ**.
    `,
    mechanics: [
      { step: '01', title: 'القيود على مستوى الأعمدة (Domain Constraints)', desc: 'استخدام CHECK (price >= 0) و CHECK (status IN (...)) لمنع دخول أي بيانات غير منطقية لقاعدة البيانات على مستوى الـ Engine.' },
      { step: '02', title: 'المعرفات الموزعة المرتبة زمنياً (UUIDv7)', desc: 'استخدام gen_random_uuid() مع طابع زمني مدمج لتوليد مفاتيح أساسية آمنة غير قابلة للتخمين وتمنع تبعثر شجرة الـ B-Tree.' },
      { step: '03', title: 'التوقيت الموحد القياسي (TIMESTAMPTZ)', desc: 'تخزين الوقت دائماً بصيغة UTC الصارمة وتحويله تلقائياً للمنطقة الزمنية للعميل عند القراءة لمنع التضارب.' },
      { step: '04', title: 'المصفوفات المدمجة الأصلية (Native Arrays)', desc: 'استخدام الأعمدة المصفوفية tags TEXT[] مع مشغلات الاحتواء @> واستخراج العناصر بالـ Indexing المباشر.' },
      { step: '05', title: 'الأرقام المالية الدقيقة (NUMERIC vs FLOAT)', desc: 'استخدام NUMERIC(12, 2) لحساب الأرصدة والعملات بدقة متناهية ثابتة الفاصلة بدون أي نسبة خطأ تقريبي.' }
    ],
    playgroundCode: `// محاكي مخطط DDL المحصن في PostgreSQL
const ddlScript = \`
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
  tags TEXT[] DEFAULT '{"verified", "customer"}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_positive_balance CHECK (balance >= 0),
  CONSTRAINT chk_valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);
\`;

console.log("PostgreSQL Production-Grade Table Definition:");
console.log(ddlScript);`,
    experimentQuestion: 'لماذا يعتبر استخدام TIMESTAMP WITHOUT TIME ZONE خطأً فادحاً في التطبيقات العالمية الموزعة؟',
    experimentAnswer: 'لأن TIMESTAMP العادي يتجاهل فارق التوقيت ويحفظ الأرقام الخام المجردة فقط دون أي سياق للمنطقة الزمنية. إذا قام مستخدم في طوكيو (UTC+9) بحجز موعد الساعة 10:00 صباحاً، وقام مستخدم في نيويورك (UTC-5) بقراءة الحجز، فسيظهر لديه 10:00 صباحاً بتوقيت نيويورك، مما يحدث فارق 14 ساعة وتضارباً كارثياً في المواعيد والمعاملات! TIMESTAMPTZ يحول كل التواريخ إلى UTC عند الحفظ ويعرضها بدقة وفق توقيت كل عميل.',
    codeAnatomy: [
      { line: 'CREATE TABLE orders (', note: 'إنشاء جدول الطلبات' },
      { line: '  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),', note: 'مفتاح أساسي فريد غير متسلسل' },
      { line: '  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,', note: 'مفتاح أجنبي صارم' },
      { line: '  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),', note: 'نوع مالي دقيق ثابت الفاصلة' },
      { line: '  items JSONB NOT NULL DEFAULT \'[]\',', note: 'مستندات عناصر الطلب بصيغة JSONB' },
      { line: '  status VARCHAR(20) DEFAULT \'pending\' CHECK (status IN (\'pending\', \'paid\', \'shipped\')),', note: 'قيد تعداد الحالات المسموحة' },
      { line: '  ordered_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP', note: 'تاريخ دقيق مع المنطقة الزمنية' },
      { line: ');', note: 'نهاية تعريف الجدول' }
    ],
    pitfallBad: `// خطأ شائع: استخدام FLOAT لحساب العملات
CREATE TABLE wallets (
  balance FLOAT NOT NULL // يسبب أخطاء IEEE 754: 0.1 + 0.2 = 0.30000000000000004!
);`,
    pitfallGood: `// الحل المالي المعتمد عالمياً: استخدام NUMERIC
CREATE TABLE wallets (
  balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0)
);`,
    pitfallDiagnosis: 'النوع Float تقريبي بطبيعته ويسبب اختفاء القروش في الحسابات المالية التراكمية، بينما NUMERIC دقيق بنسبة 100%.',
    quizPool: [
      {
        q: 'Which PostgreSQL data type is strictly recommended for storing monetary balances without floating-point rounding errors?',
        qAr: 'أي نوع بيانات في PostgreSQL يوصى به صراحة لتخزين الأرصدة المالية دون أخطاء تقريب الفاصلة العائمة؟',
        options: ['NUMERIC / DECIMAL', 'FLOAT8', 'REAL', 'DOUBLE PRECISION'],
        correct: 0,
        why: '`NUMERIC` / `DECIMAL` stores exact fixed-point numeric values, eliminating IEEE 754 floating-point inaccuracies.',
        whyAr: 'النوع NUMERIC / DECIMAL يخزن أرقاماً دقيقة ثابتة الفاصلة ويقضي تماماً على أخطاء التقريب المالي.'
      },
      {
        q: 'What is the architectural advantage of UUIDv7 over UUIDv4 as primary keys in PostgreSQL?',
        qAr: 'ما هي الميزة المعمارية لـ UUIDv7 مقارنة بـ UUIDv4 كمفاتيح أساسية في PostgreSQL؟',
        options: [
          'UUIDv7 embeds a Unix timestamp prefix, providing time-ordered sequential locality that prevents B-Tree index fragmentation.',
          'UUIDv7 uses half the memory of UUIDv4.',
          'UUIDv7 is encrypted with AES-256.',
          'UUIDv7 does not require PRIMARY KEY constraints.'
        ],
        correct: 0,
        why: 'Time-ordered UUIDv7 writes to the rightmost leaf of B-Tree indexes, maintaining optimal cache locality like auto-increment IDs.',
        whyAr: 'يدمج طابعاً زمنياً في البداية مما يجعله مرتباً زمنياً تصاعدياً ويمنع تبعثر شجرة الفهرس B-Tree ويسرع الإدخال.'
      },
      {
        q: 'Why should TIMESTAMPTZ always be used instead of TIMESTAMP for application dates in PostgreSQL?',
        qAr: 'لماذا يجب استخدام TIMESTAMPTZ دائماً بدلاً من TIMESTAMP العادي في التواريخ؟',
        options: [
          'Normalizes stored timestamps to UTC internally while automatically adjusting display to the querying client session time zone.',
          'It is compressed on disk.',
          'It only records the year and month.',
          'It prevents weekend database writes.'
        ],
        correct: 0,
        why: 'TIMESTAMPTZ eliminates timezone ambiguity by converting inputs to UTC, rendering consistent localized times for global users.',
        whyAr: 'يحول التواريخ لـ UTC في التخزين ويعرضها وفق المنطقة الزمنية للعميل مما يمنع تشوه المواعيد عبر الدول.'
      },
      {
        q: 'What does a CHECK constraint (e.g. CHECK (age >= 18)) guarantee on a PostgreSQL table?',
        qAr: 'ما الذي يضمنه قيد CHECK على مستوى الجدول في PostgreSQL؟',
        options: [
          'Enforces domain business rules directly inside the database engine, rejecting any INSERT/UPDATE that violates the boolean expression.',
          'Sends an SMS alert to users.',
          'Checks server CPU usage.',
          'Backs up the database automatically.'
        ],
        correct: 0,
        why: 'CHECK constraints reject non-compliant data at the engine level, providing a defensive barrier regardless of application logic bugs.',
        whyAr: 'يفرض قواعد الأعمال داخل المحرك ويرفض أي إدخال أو تعديل مخالف كخط دفاع أمني مستقل عن كود التطبيق.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق الجوهري بين التخزين في عمود JSON وعمود JSONB في PostgreSQL ولماذا لا نستخدم JSON العادي تقريباً؟',
    interviewA: 'النوع JSON يخزن النص كما هو حرفياً (Exact Text Representation)، مما يعني أنه يعيد تحليل النص (Parsing) في كل استعلام ولا يدعم الفهارس المتقدمة (بطيء في القراءة وسريع في الكتابة فقط). أما النوع JSONB (Binary JSON): فيقوم بتحليل وتفكيك البيانات عند الإدخال وتخزينها بهيكلية ثنائية مفككة ومنظمة (Decomposed Binary Format) مع إزالة المسافات والمفاتيح المكررة. هذا يتيح لـ JSONB دعم فهارس GIN المعكوسة والاستعلام عن الحقول الفرعية في 0.5ms باستخدام مشغلات @> و ->>، وهو المعيار القياسي للإنتاج.'
  },
  {
    slug: 'joins-relations',
    title: 'Relational Joins, CTEs & Complex Query Optimization',
    titleAr: 'الربط العلائقي (Joins)، التعبيرات الجدولية العامة (CTEs) وتحسين الاستعلامات المعقدة',
    level: 1,
    order: 4,
    estMinutes: 35,
    version: 'PostgreSQL 18 Joins',
    pattern: 'Relational Algebra & Recursive Queries',
    objectives: [
      'إتقان جميع أنواع الـ Joins: INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER, و CROSS JOIN.',
      'فهم خوارزميات الربط الثلاث في محرك بوستجريس: Nested Loop, Hash Join, و Merge Join.',
      'بناء استعلامات متقدمة ونظيفة باستخدام Common Table Expressions (CTEs بـ WITH).',
      'استخدام الـ Recursive CTEs لمعالجة الهياكل الشجرية المتداخلة (مثل التعليقات الشجرية والشجرة الوظيفية).'
    ],
    problemOpening: `
      في قواعد البيانات العلائقية، البيانات موزعة على جداول متعددة خاضعة لقواعد الـ Normalization (3NF).
      لكن عندما تحتاج لاستخراج تقرير يجمع بيانات المستخدم مع طلباته وفواتيره وتفاصيل الشحن، تبدأ المعركة الحقيقية:
      كيف يقوم محرك بوستجريس بربط هذه الجداول معاً تحت الغطاء؟
      محرك استعلامات PostgreSQL يمتلك 3 خوارزميات ربط فيزيائية مختلفة تماماً:
      1. **Nested Loop Join**: مثالية للجداول الصغيرة ذات الفهارس الدقيقة.
      2. **Hash Join**: تقوم ببناء جدول Hash في الـ RAM للجداول المتوسطة والكبيرة.
      3. **Merge Join**: عندما تكون الجداول مرتبة مسبقاً على مفاتيح الربط بالفهارس.
      لو كتبت استعلاماً يربط 6 جداول بدون فهم هذه الخوارزميات، سيقوم المحرك بعمل مسح تكراري بطيء يستغرق 15 ثانية!
      في هذا الدرس، هنتعلم إزاي نبني استعلامات ربط فائقة السرعة، إزاي نستخدم **Common Table Expressions (CTEs)** لتنظيم الأكواد المعقدة، وإزاي نعالج الهياكل الشجرية بـ **WITH RECURSIVE**.
    `,
    mechanics: [
      { step: '01', title: 'الربط الداخلي والخارجي (INNER vs LEFT JOIN)', desc: 'استخدام INNER JOIN عند اشتراط وجود السجل في الجدولين، و LEFT JOIN لجلب السجلات الرئيسية حتى لو لم تكن تملك سجلات فرعية.' },
      { step: '02', title: 'خوارزمية Hash Join الفيزيائية', desc: 'يقوم المحرك ببناء Hash Table في ذاكرة work_mem للجدول الأصغر ثم يمسح الجدول الأكبر لمطابقة المفاتيح في دورة واحدة.' },
      { step: '03', title: 'التعبيرات الجدولية العامة (CTEs بـ WITH)', desc: 'تقسيم الاستعلامات العملاقة إلى خطوات وسيطة منطقية معزولة تزيد من قابلية القراءة وتحسين خطة التنفيذ.' },
      { step: '04', title: 'الاستعلامات التكرارية الشجرية بـ WITH RECURSIVE', desc: 'معالجة الشجرة التنظيمية والهياكل متعددة المستويات (مثل التعليقات المتداخلة) في استعلام SQL واحد.' },
      { step: '05', title: 'تجنب فخ الكارتيزيان (Accidental CROSS JOIN)', desc: 'ضمان وجود شرط الربط ON في جميع جمل الـ JOIN لمنع ضرب صفوف الجدولين في بعضهما وانفجار الذاكرة.' }
    ],
    playgroundCode: `// محاكي استعلام التكرار الشجري (Recursive CTE) في SQL
const recursiveCteQuery = \`
WITH RECURSIVE OrgChart AS (
  -- 1. Base Query: Root Managers
  SELECT id, name, manager_id, 1 as depth
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- 2. Recursive Query: Subordinates
  SELECT e.id, e.name, e.manager_id, o.depth + 1
  FROM employees e
  INNER JOIN OrgChart o ON e.manager_id = o.id
)
SELECT * FROM OrgChart ORDER BY depth, name;
\`;

console.log("PostgreSQL Recursive CTE Structure:");
console.log(recursiveCteQuery);`,
    experimentQuestion: 'ماذا يحدث إذا نسيت كتابة شرط ON عند الربط بين جدولين يحتوي كل منهما على 10,000 صف؟',
    experimentAnswer: 'سيتحول الاستعلام فوراً إلى Cross Join (Cartesian Product)، وسيقوم محرك قاعدة البيانات بضرب كل صف من الجدول الأول في كل صف من الجدول الثاني، مما ينتج عنه 100,000,000 صف (مائة مليون صف!) في الذاكرة! هذا يتسبب في اختناق ذاكرة الخادم، وتجمد الـ CPU، وتوقف قاعدة البيانات عن العمل.',
    codeAnatomy: [
      { line: 'WITH MonthlyRevenue AS (', note: '1. CTE لعزل حسابات الأرباح' },
      { line: '  SELECT customer_id, SUM(total_amount) as spent', note: 'تجميع إجمالي الإنفاق' },
      { line: '  FROM orders', note: 'جدول الطلبات' },
      { line: '  WHERE ordered_at >= CURRENT_DATE - INTERVAL \'30 days\'', note: 'تصفية آخر 30 يوماً' },
      { line: '  GROUP BY customer_id', note: 'تجميع حسب العميل' },
      { line: ')', note: 'نهاية الـ CTE' },
      { line: 'SELECT c.id, c.name, c.email, COALESCE(mr.spent, 0) as total_spent', note: '2. الاستعلام الرئيسي' },
      { line: 'FROM customers c', note: 'جدول العملاء' },
      { line: 'LEFT JOIN MonthlyRevenue mr ON c.id = mr.customer_id', note: 'ربط خارجي آمن' },
      { line: 'ORDER BY total_spent DESC;', note: 'فرز بالأعلى إنفاقاً' }
    ],
    pitfallBad: `// خطأ شائع: استخدام Subqueries متكررة في جملة SELECT لكل صف
SELECT c.name,
  (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) as order_count // ينفذ استعلاماً مستقلاً لكل صف (N+1 Query Problem in SQL)!
FROM customers c;`,
    pitfallGood: `// الحل الهندسي: استخدام LEFT JOIN مع GROUP BY أو CTE
SELECT c.name, COUNT(o.id) as order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;`,
    pitfallDiagnosis: 'الـ Correlated Subqueries في جملة SELECT تجبر المحرك على تنفيذ استعلام فرعي لكل صف على حدة، بينما JOIN يدمج البيانات في عملية مجمعة واحدة.',
    quizPool: [
      {
        q: 'Which physical join algorithm does PostgreSQL typically choose when joining two large unindexed tables?',
        qAr: 'أي خوارزمية ربط فيزيائية يختارها محرك PostgreSQL عادة عند ربط جدولين كبيرين غير مفهرسين؟',
        options: ['Hash Join', 'Nested Loop Join', 'Bubble Join', 'Binary Search Join'],
        correct: 0,
        why: 'Hash Join builds an in-memory hash table on the smaller table and probes it with the larger table, optimal for large unindexed joins.',
        whyAr: 'خوارزمية Hash Join تبني جدول تجزئة في الذاكرة للجدول الأصغر ثم تفحص الجدول الأكبر بكفاءة عالية في عملية واحدة.'
      },
      {
        q: 'What is the primary architectural use case for WITH RECURSIVE CTEs in PostgreSQL?',
        qAr: 'ما هي الفائدة المعمارية الأساسية لـ WITH RECURSIVE CTEs في PostgreSQL؟',
        options: [
          'Traversing hierarchical, tree-structured, or graph data (e.g. organizational charts, threaded comments, bill of materials).',
          'Encrypting database backups.',
          'Creating database users.',
          'Compressing log tables.'
        ],
        correct: 0,
        why: 'Recursive CTEs execute iterative loops in SQL, making them the standard solution for navigating deep hierarchical data structures.',
        whyAr: 'تتيح معالجة البيانات الشجرية والهياكل الهرمية المتداخلة مثل التعليقات المتفرعة والشجرة الوظيفية في استعلام SQL واحد.'
      },
      {
        q: 'What is the key difference between INNER JOIN and LEFT OUTER JOIN?',
        qAr: 'ما هو الفرق الجوهري بين INNER JOIN و LEFT OUTER JOIN؟',
        options: [
          'INNER JOIN returns only rows with matches in both tables; LEFT JOIN returns ALL rows from the left table regardless of matches in the right.',
          'INNER JOIN is only for numbers; LEFT JOIN is for strings.',
          'LEFT JOIN deletes unmatched rows.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'LEFT JOIN preserves all records from the left side, filling missing right-side columns with NULL if no match exists.',
        whyAr: 'الـ INNER يرجع الصفوف المتطابقة في الجدولين فقط، بينما LEFT يرجع كافة صفوف الجدول الأيسر حتى لو لم تكن تملك مطابقات في الأيمن.'
      },
      {
        q: 'How does COALESCE(column, fallbackValue) function in PostgreSQL?',
        qAr: 'كيف تعمل دالة COALESCE(column, fallbackValue) في PostgreSQL؟',
        options: [
          'Returns the first non-null argument in its parameter list, safely handling NULL values in expressions and joins.',
          'Rounds numbers to 2 decimal places.',
          'Converts strings to uppercase.',
          'Deletes null rows.'
        ],
        correct: 0,
        why: 'COALESCE evaluates arguments in sequence and returns the first non-null value, preventing NULL propagation in outputs.',
        whyAr: 'ترجع أول قيمة غير خالية (Non-null) من معاملاتها، مما يمنع ظهور قيم NULL واستبدالها بقيم افتراضية نظيفة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين CTEs العادية و Subqueries بعد إصدار PostgreSQL 12 بخصوص ميزة CTE Inlining؟',
    interviewA: 'قبل PostgreSQL 12، كانت جملة CTE (WITH query AS (...)) تعامل كـ "Optimization Barrier" صلب: كان المحرك يقوم بتنفيذ الـ CTE أولاً وتخزين ناتجها بالكامل في الذاكرة كمصفوفة مؤقتة ثم تطبيق باقي الشروط. منذ PostgreSQL 12+، أضافت بوستجريس ميزة CTE Inlining: يقوم مفسر الاستعلامات بدمج الـ CTE تلقائياً داخل الاستعلام الرئيسي وتمرير شروط الـ WHERE إليها (Predicate Pushdown) لاستخدام الفهارس ما لم تحدد صراحة WITH name AS MATERIALIZED (...).'
  },
  {
    slug: 'indexing-btree-gin',
    title: 'PostgreSQL Indexing: B-Tree, GIN (Inverted), BRIN & GiST for Geospatial Data',
    titleAr: 'معمارية الفهارس في PostgreSQL: فهارس B-Tree، فهارس GIN لمستندات JSONB، وفهارس BRIN',
    level: 2,
    order: 6,
    estMinutes: 35,
    version: 'PostgreSQL 18 Indexes',
    pattern: 'Multi-Engine Index Structures & Spatial Indexing',
    objectives: [
      'فهم الفروق المعمارية بين أنواع الفهارس الكبرى في بوستجريس: B-Tree, GIN, GiST, و BRIN.',
      'استخدام فهارس GIN (Generalized Inverted Index) لتسريع استعلامات JSONB والمصفوفات النصية بنسبة 100x.',
      'تطبيق فهارس BRIN (Block Range Index) للجداول الزمنية الضخمة (Time-Series) لتوفير 99% من مساحة الـ RAM.',
      'تشريح خطة الاستعلام بـ EXPLAIN (ANALYZE, BUFFERS) ومقارنة Seq Scan مقابل Index Scan.'
    ],
    problemOpening: `
      أغلب المطورين يعرفون نوعاً واحداً فقط من الفهارس: **B-Tree**.
      فهارس B-Tree ممتازة لمطابقة القيم الفردية والمقارنات العادية (<code dir="ltr">=, &lt;, &gt;</code>)، لكنها تفشل تماماً في السيناريوهات المتقدمة:
      - ماذا لو كنت تخزن كائنات <code dir="ltr">JSONB</code> وتريد البحث عن المنتجات التي تحتوي على خاصية <code dir="ltr">{"color": "red", "size": "XL"}</code> داخل مصفوفة؟ فهارس B-Tree عاجزة عن فهرسة ما بداخل الـ JSON!
      - ماذا لو كان لديك جدول سجلات (Logs) يحتوي على 500 مليون صف مرتبة زمنياً، وفهرس B-Tree يستهلك 40GB من الـ RAM؟
      قوة PostgreSQL الحقيقية تكمن في تنوع محركات الفهارس:
      1. **GIN (Generalized Inverted Index)**: يقسم كائنات الـ JSONB والمصفوفات إلى كلمات ومفاتيح مفككة ويفهرس كل عنصر فرعي، مما يوفر سرعة استعلام خيالية في أجزاء من الميلي ثانية!
      2. **BRIN (Block Range Index)**: يستهلك بضعة كيلوبايتات فقط (0.01% من حجم B-Tree) لتغطية مئات ملايين السجلات المرتبة فيزيائياً على القرص!
      في هذا الدرس، هنتعلم متى نستخدم كل محرك فهارس، وهنتعلم قراءة تقارير **EXPLAIN (ANALYZE, BUFFERS)** بدقة جراحية.
    `,
    mechanics: [
      { step: '01', title: 'فهارس B-Tree الافتراضية', desc: 'شجرة بحث ثنائية متوازنة ممتازة للمفاتيح الأساسية، المقارنات، والترتيب التصاعدي والتنازلي (Equality & Range queries).' },
      { step: '02', title: 'الفهارس المعكوسة بـ GIN (Generalized Inverted Index)', desc: 'مثالية لمستندات JSONB ومصفوفات النصوص؛ تقوم بتفكيك المحتوى وفهرسة كل كلمة ومفتاح بشكل منفصل.' },
      { step: '03', title: 'فهارس نطاق الكتل بـ BRIN (Block Range Indexes)', desc: 'فهرسة الحدود الدنيا والعليا (Min/Max) لكل نطاق كتل على القرص؛ فائقة التوفير في الذاكرة للجداول الضخمة المرتبة زمنياً.' },
      { step: '04', title: 'الفهارس المكانية بـ GiST (Generalized Search Tree)', desc: 'مخصصة للبيانات الهندسية والجغرافية (PostGIS) والبحث عن النقاط القريبة ومطابقة الأشكال الهندسية.' },
      { step: '05', title: 'بناء الفهارس في الإنتاج بدون قفل الجداول (CONCURRENTLY)', desc: 'استخدام CREATE INDEX CONCURRENTLY لإنشاء الفهارس في الخلفية دون حظر عمليات الـ INSERT والـ UPDATE للمستخدمين.' }
    ],
    playgroundCode: `// محاكي مقارنة استهلاك الذاكرة وكفاءة الفهارس في PostgreSQL
function compareIndexEngines(totalRows) {
  const btreeSizeMB = (totalRows * 32) / (1024 * 1024);
  const brinSizeMB = btreeSizeMB * 0.005; // BRIN يستهلك 0.5% فقط من حجم B-Tree!
  
  console.log(\`Table Size: \${totalRows.toLocaleString()} Rows\`);
  console.log(\`1. B-Tree Index RAM Usage: ~\${btreeSizeMB.toFixed(1)} MB (Fastest for point queries)\`);
  console.log(\`2. BRIN Index RAM Usage:   ~\${brinSizeMB.toFixed(2)} MB (99.5% RAM saved for time-series logs!)\`);
  console.log(\`3. GIN Index: Essential for JSONB containment operator (@>)\`);
}

compareIndexEngines(50000000); // 50 مليون صف`,
    experimentQuestion: 'لماذا يجب عليك دائماً استخدام خيار CONCURRENTLY عند إنشاء فهرس جديد على جدول ضخم في بيئة الإنتاج؟',
    experimentAnswer: 'أمر CREATE INDEX العادي يقوم بفرض قفل حصري للكتابة (SHARE Lock) على الجدول بالكامل طوال فترة بناء الفهرس (التي قد تستغرق 20 دقيقة على جدول يحتوي على ملايين الصفوف). خلال هذه الفترة، ستتعطل وتفشل جميع عمليات INSERT و UPDATE و DELETE للمستخدمين! استخدام CREATE INDEX CONCURRENTLY يقوم ببناء الفهرس في الخلفية دون قفل الجدول ودون أي تأثير على تجربة المستخدمين.',
    codeAnatomy: [
      { line: '// 1. إنشاء فهرس GIN فائق السرعة لمستندات JSONB', note: 'فهرس معكوس' },
      { line: 'CREATE INDEX idx_products_metadata_gin ON products USING GIN (metadata jsonb_path_ops);', note: 'فهرسة مسارات JSONB' },
      { line: '// 2. إنشاء فهرس BRIN للجداول الزمنية الضخمة في الإنتاج', note: 'فهرس كتل موفر للذاكرة' },
      { line: 'CREATE INDEX CONCURRENTLY idx_logs_created_brin ON logs USING BRIN (created_at);', note: 'بناء في الخلفية بدون قفل' },
      { line: '// 3. استعلام البحث بالاحتواء المستفيد من فهرس GIN', note: 'استعلام سريع بـ @>' },
      { line: 'SELECT * FROM products WHERE metadata @> \'{"brand": "Apple", "inStock": true}\';', note: 'مطابقة في 0.5ms' }
    ],
    pitfallBad: `// خطأ كارثي في الإنتاج: بناء فهرس على جدول يحتوي على 10 ملايين صف بدون CONCURRENTLY
CREATE INDEX idx_orders_user ON orders(user_id); // يجمد الموقع بالكامل ويمنع الشراء حتى ينتهي البناء!`,
    pitfallGood: `// الحل الهندسي المعتمد في أنظمة الإنتاج
CREATE INDEX CONCURRENTLY idx_orders_user ON orders(user_id);`,
    pitfallDiagnosis: 'بناء الفهارس المتزامنة يمنع حظر جداول الإنتاج ويسمح باستمرار عمليات القراءة والكتابة بسلاسة.',
    quizPool: [
      {
        q: 'Which PostgreSQL index type is purpose-built for querying inside JSONB documents and array columns using the containment operator (@>)?',
        qAr: 'أي نوع فهرس في PostgreSQL مخصص للاستعلام داخل مستندات JSONB وأعمدة المصفوفات باستخدام مشغل الاحتواء (@>)؟',
        options: ['GIN (Generalized Inverted Index)', 'B-Tree', 'Hash Index', 'BRIN'],
        correct: 0,
        why: 'GIN decomposes composite JSONB structures into individual key/value components, providing ultra-fast containment lookups.',
        whyAr: 'فهارس GIN تفكك مستندات JSONB إلى مكونات مفردة مما يوفر سرعة فائقة في استعلامات البحث والاحتواء.'
      },
      {
        q: 'When should you choose a BRIN (Block Range Index) over a B-Tree index in PostgreSQL?',
        qAr: 'متى يجب اختيار فهرس BRIN بدلاً من فهرس B-Tree في PostgreSQL؟',
        options: [
          'For massive tables (millions of rows) where data is physically ordered on disk by the indexed column (e.g. append-only timestamps/logs).',
          'For small tables with 50 rows.',
          'For primary key UUID columns with random distributions.',
          'To enforce unique constraints.'
        ],
        correct: 0,
        why: 'BRIN summarizes min/max block ranges, consuming a tiny fraction of RAM (~1%) compared to B-Tree on naturally sorted time-series data.',
        whyAr: 'للجداول الضخمة المرتبة زمنياً على القرص حيث يوفر 99% من استهلاك الـ RAM مقارنة بفهارس B-Tree.'
      },
      {
        q: 'What is the critical purpose of the "CREATE INDEX CONCURRENTLY" syntax in production environments?',
        qAr: 'ما هي الفائدة الحيوية لعبارة "CREATE INDEX CONCURRENTLY" في بيئات الإنتاج؟',
        options: [
          'Builds the index without acquiring an exclusive write-lock, allowing concurrent INSERTs and UPDATEs to continue normally.',
          'Encrypts the index data.',
          'Compresses the table.',
          'Forces the query to run in parallel threads.'
        ],
        correct: 0,
        why: 'CONCURRENTLY avoids table write locks during lengthy index generation, preventing application downtime.',
        whyAr: 'يبني الفهرس في الخلفية دون حظر عمليات الكتابة على الجدول مما يمنع انقطاع الخدمة عن المستخدمين.'
      },
      {
        q: 'What does "Seq Scan" mean in an EXPLAIN ANALYZE execution plan in PostgreSQL?',
        qAr: 'ماذا يعني "Seq Scan" في تقرير خطة التنفيذ EXPLAIN ANALYZE؟',
        options: [
          'Sequential Scan (reading the entire table row-by-row from disk because no index was utilized).',
          'Sequential execution of TypeScript code.',
          'Optimal index search.',
          'Encrypted SSL connection.'
        ],
        correct: 0,
        why: 'Seq Scan indicates that PostgreSQL read the table sequentially from start to finish, indicating a potential missing index.',
        whyAr: 'يشير إلى مسح الجدول بالكامل صفاً بصف من القرص لعدم توفر أو عدم جدوى استخدام الفهرس في هذا الاستعلام.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين GIN jsonb_ops الافتراضي و GIN jsonb_path_ops في حجم الفهرس وسرعة الاستعلام؟',
    interviewA: 'النمط الافتراضي jsonb_ops يقوم بفهرسة كل مفتاح وقيمة ومسار بشكل منفصل (يدعم مشغلات متنوعة مثل ? و ?| و @>) ولكنه يستهلك حجماً كبيراً في الـ RAM. أما النمط المتخصص jsonb_path_ops فيقوم بحساب تجزئة (Hash) للمسار الكامل مع القيمة معاً (Path-Value Hash). النتيجة: يكون حجم الفهرس أصغر بنسبة تصل إلى 60% وأسرع في استعلامات الاحتواء @>، ولكنه لا يدعم فحص وجود المفاتيح المجردة (مشغل ?)، وهو الخيار الأفضل لمعظم استعلامات الـ API.'
  },
  {
    slug: 'jsonb-hybrid',
    title: 'Hybrid PostgreSQL: JSONB Indexing, JSONPath Queries & Relational Duality',
    titleAr: 'قواعد البيانات الهجينة: استعلامات JSONB المتقدمة، مسارات JSONPath وازدواجية النموذج',
    level: 2,
    order: 8,
    estMinutes: 35,
    version: 'PostgreSQL 18 JSONB',
    pattern: 'Hybrid Relational-Document Architecture',
    objectives: [
      'الاستفادة من ميزة الازدواجية العلائقية والوثائقية (Relational-Document Duality) في قاعدة بيانات واحدة.',
      'إتقان مشغلات JSONB المتقدمة: استخراج النصوص (->>)، الاحتواء (@>)، ووجود المفاتيح (?).',
      'استخدام لغة مسارات الـ JSONPath القياسية (SQL/JSON: jsonb_path_query) للتصفية والحسابات الرياضية داخل المستندات.',
      'تعديل وحذف الحقول المتداخلة ذرياً باستخدام دالة jsonb_set() ومشغل الحذف (-).'
    ],
    problemOpening: `
      في عالم هندسة البرمجيات، كان هناك صراع دائم: "هل نستخدم قاعدة بيانات علائقية SQL لضمان تكامل البيانات وعلاقات الـ Joins الصارمة، أم نستخدم NoSQL وثائقية لمرونة الـ Schema وسرعة تخزين الكائنات المتغيرة؟".
      مع تطور **JSONB في PostgreSQL**، انتهى هذا الصراع تماماً!
      أصبح بإمكانك تصميم قاعدة بيانات هجينة (Hybrid Database):
      - الجداول الأساسية الثابتة (المستخدمين، الحسابات، المدفوعات) تكون أعمدة SQL علائقية صارمة ومحمية بالـ Foreign Keys والـ Constraints.
      - الخصائص المتغيرة أو سريعة التطور (مواصفات المنتجات المتغيرة، إعدادات المستخدمين، بيانات الـ IoT) تُخزن داخل أعمدة **JSONB** قابلة للفهرسة والتعديل الذري والاستعلام بسرعة الضوء.
      في هذا الدرس، هنفكك مشغلات الـ JSONB المتقدمة، وهنتعلم لغة **JSONPath** الرسمية لتشغيل استعلامات NoSQL معقدة داخل قلب PostgreSQL.
    `,
    mechanics: [
      { step: '01', title: 'استخراج القيم والمشغلات (-> مقابل ->>)', desc: 'مشغل -> يُرجع كائن JSONB فرعياً؛ بينما مشغل ->> يستخرج القيمة كنص SQL نقي (Text) قابل للفرز والمقارنة.' },
      { step: '02', title: 'مشغل الاحتواء فائق السرعة (@>)', desc: 'فحص ما إذا كان كائن الـ JSONB يحتوي على هيكلية فرعية معينة؛ وهو المشغل المدعوم بفهارس GIN السريعة.' },
      { step: '03', title: 'استعلامات JSONPath القياسية', desc: 'استخدام jsonb_path_query(data, "$.items[*] ? (@.price > 100)") لتصفية واستخراج عناصر المصفوفات المتداخلة بلغة مسارات قياسية.' },
      { step: '04', title: 'التعديل الموضعي الذري بـ jsonb_set()', desc: 'تحديث حقل متداخل بعمق داخل المستند دون استبدال الكائن بالكامل jsonb_set(data, "{user, preferences, theme}", \'"dark"\').' },
      { step: '05', title: 'حذف الحقول بـ مشغل الطرح (-)', desc: 'إزالة حقول معينة أو عناصر مصفوفات من مستند JSONB ذرياً باستخدام metadata - "temporary_token".' }
    ],
    playgroundCode: `// محاكي استعلامات مشغلات JSONB في PostgreSQL
const jsonbQuerySimulation = \`
-- 1. استعلام البحث بالاحتواء عبر فهرس GIN
SELECT id, name, metadata->>'brand' as brand
FROM products
WHERE metadata @> '{"category": "electronics", "inStock": true}';

-- 2. تعديل حقل متداخل ذرياً بـ jsonb_set
UPDATE users
SET profile = jsonb_set(profile, '{settings, theme}', '"dark"', true)
WHERE id = '9921c5f8-8a8b-4c5e-8b1e-2c9e8f1a2b3c';
\`;

console.log("PostgreSQL Hybrid JSONB Operations:");
console.log(jsonbQuerySimulation);`,
    experimentQuestion: 'ما هو الفرق الجوهري بين metadata -> \'age\' و metadata ->> \'age\' في استعلامات PostgreSQL؟',
    experimentAnswer: 'المشغل -> يرجع القيمة كـ JSONB Type (أي محاطاً بعلامات اقتباس JSON إذا كان نصاً، ويحتفظ بنوع JSONB). أما المشغل ->> فيقوم باستخراج القيمة وتحويلها إلى نص SQL عادي (TEXT)، وهو الإلزامي إذا كنت تريد استخدام القيمة في جمل WHERE للمقارنة بالأرقام بعد التحويل (metadata->>\'age\')::INT >= 18 أو في الترتيب ORDER BY.',
    codeAnatomy: [
      { line: '-- البحث واستخراج خصائص JSONB مع التحويل الرياضي', note: 'استعلام هجين' },
      { line: 'SELECT id, name,', note: 'الأعمدة العلائقية' },
      { line: '  metadata->>\'brand\' as brand_name,', note: 'استخراج نص صريح' },
      { line: '  (metadata->>\'rating\')::NUMERIC as rating', note: 'تحويل النوع لـ Numeric للعمليات الرياضية' },
      { line: 'FROM products', note: 'جدول المنتجات' },
      { line: 'WHERE metadata @> \'{"specs": {"ram": "32GB"}}\'', note: 'تصفية بالاحتواء عبر فهرس GIN' },
      { line: '  AND (metadata->>\'rating\')::NUMERIC >= 4.5;', note: 'شرط رقمي مركب' }
    ],
    pitfallBad: `// خطأ شائع: استخدام -> بدلاً من ->> عند المقارنة بالنصوص العادية
WHERE metadata->'role' = 'admin' // خطأ: يقارن JSONB "admin" بنص عادي 'admin' ويفشل الاستعلام!`,
    pitfallGood: `// الحل الصحيح: استخدام ->> لاستخراج نص SQL نقي
WHERE metadata->>'role' = 'admin'`,
    pitfallDiagnosis: 'المشغل -> يعيد نوع JSONB بينما ->> يعيد نوع TEXT النقي القابل للمقارنة المباشرة.',
    quizPool: [
      {
        q: 'What is the output data type of the "->" operator versus the "->>" operator on a JSONB column in PostgreSQL?',
        qAr: 'ما هو نوع البيانات الناتج عن مشغل "->" مقارنة بمشغل "->>" على أعمدة JSONB في PostgreSQL؟',
        options: [
          '"->" returns a JSONB element; "->>" returns the value extracted as a plain SQL TEXT string.',
          '"->" is for numbers; "->>" is for booleans.',
          '"->>" deletes the key.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'Arrow single (->) preserves JSONB type wrapping; double arrow (->>) casts the leaf value to standard SQL TEXT.',
        whyAr: 'السهم المفرد -> يُبقي القيمة كنوع JSONB، بينما السهم المزدوج ->> يستخرج القيمة كنص SQL نقي (TEXT).'
      },
      {
        q: 'Which operator is used to test whether a JSONB column contains a specific sub-document structure using GIN indexes?',
        qAr: 'أي مشغل يُستخدم لفحص ما إذا كان عمود JSONB يحتوي على هيكلية فرعية معينة بالاعتماد على فهارس GIN؟',
        options: ['@> (Containment operator)', '==', 'LIKE', 'IN'],
        correct: 0,
        why: 'The `@>` containment operator checks if the left JSONB contains the right JSONB, fully accelerating via GIN indexes.',
        whyAr: 'مشغل الاحتواء @> يفحص احتواء المستند على الهيكل المطلوب ويستفيد بكفاءة قصوى من فهارس GIN.'
      },
      {
        q: 'How can you atomically update a deeply nested property inside a JSONB document in PostgreSQL?',
        qAr: 'كيف يمكنك تعديل خاصية متداخلة بعمق داخل مستند JSONB ذرياً في PostgreSQL؟',
        options: [
          'Using the jsonb_set(target, path, new_value, create_missing) function.',
          'By reading the row to Node.js and saving it back.',
          'Using string replace().',
          'JSONB cannot be updated.'
        ],
        correct: 0,
        why: 'jsonb_set provides in-place atomic nested updates within the storage engine without full-document replacement overhead.',
        whyAr: 'دالة jsonb_set توفر تعديلاً موضعياً ذرياً للحقول المتداخلة داخل محرك التخزين دون الحاجة لاستبدال المستند كاملاً.'
      },
      {
        q: 'What is the primary architectural advantage of PostgreSQL Hybrid JSONB over pure NoSQL databases for enterprise applications?',
        qAr: 'ما هي الميزة المعمارية الكبرى لـ JSONB في PostgreSQL مقارنة بقواعد NoSQL الخالصة؟',
        options: [
          'Enables mixing strict ACID relational schemas with schema-less JSON documents in the exact same query with cross-table JOINs.',
          'It eliminates the need for hard drives.',
          'It translates JSON to HTML automatically.',
          'It bypasses SQL syntax completely.'
        ],
        correct: 0,
        why: 'PostgreSQL allows joining strict relational tables with flexible JSONB documents inside single atomic ACID transactions.',
        whyAr: 'تتيح دمج الجداول العلائقية المحكمة بـ ACID مع المستندات المرنة داخل نفس الاستعلام والربط بينهما بـ JOINs سلسة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنشئ Generated Column (أو Functional Index) على حقل مستخرج من JSONB لتسريع الفرز واستعلامات المقارنة؟',
    interviewA: 'ننشئ عموداً محسوباً Generated Column أو فهماً وظيفياً (Expression Index): CREATE INDEX idx_user_loyalty ON users(((profile->>\'loyalty_score\')::INT)). هذا ينشئ فهرس B-Tree كلاسيكي خفيف وسريع جداً على القيمة المستخرجة، مما يتيح لمحرك بوستجريس تنفيذ استعلامات الفرز WHERE (profile->>\'loyalty_score\')::INT > 500 في 0.1ms باستخدام Index Scan فائق السرعة.'
  },
  {
    slug: 'window-functions',
    title: 'Advanced Analytical Window Functions: OVER, PARTITION BY, RANK & LEAD/LAG',
    titleAr: 'الدوال التحليلية المتقدمة (Window Functions): جمل OVER، التقسيم بـ PARTITION BY و LEAD/LAG',
    level: 2,
    order: 10,
    estMinutes: 35,
    version: 'PostgreSQL 18 Analytics',
    pattern: 'Analytical SQL & Data Warehousing',
    objectives: [
      'فهم الفرق الجوهري بين دوال التجميع (GROUP BY: تقلص الصفوف) والدوال التحليلية (Window Functions: تحافظ على كل الصفوف).',
      'إتقان جملة OVER() وتقسيم النوافذ الحسابية بـ PARTITION BY والترتيب بـ ORDER BY.',
      'استخدام دوال الترتيب والتصنيف: ROW_NUMBER(), RANK(), و DENSE_RANK().',
      'استخراج قيم الصفوف السابقة والتالية للمقارنة الزمنية باستخدام LEAD() و LAG().'
    ],
    problemOpening: `
      في تقارير الأعمال وتحليلات البيانات، يطلب منك المدراء أسئلة مثل:
      - "اعرض لي كل موظف، مع راتبه، ومتوسط راتب القسم التابع له، وترتيبه داخل قسمه، والفرق بين راتبه وراتب الموظف الذي يسبقه مباشرة"!
      لو حاولت حل هذه المسألة بـ <code dir="ltr">GROUP BY</code> العادية، ستفشل لأن <code dir="ltr">GROUP BY</code> تقوم بدمج الصفوف وتقليصها إلى صف واحد لكل قسم، وتخفي تفاصيل الموظفين الأفراد!
      الحل المعماري السحري في SQL هو **الدوال التحليلية (Window Functions)**.
      الـ Window Functions تجري عمليات حسابية معقدة عبر مجموعة من الصفوف المرتبطة بالصف الحالي (نافذة حسابية Window Frame)، **مع الحفاظ على كافة صفوف الجدول الأصلية كاملة بدون أي تقليص**!
      في هذا الدرس، هنتعلم إزاي نبني لوحات تحليلات مالية متقدمة، إزاي نستخدم **LEAD** و **LAG** لحساب نسب النمو، ولماذا تعتبر هذه الدوال الأهم في مقابلات العمل لكبار المهندسين.
    `,
    mechanics: [
      { step: '01', title: 'تشريح جملة OVER (PARTITION BY ... ORDER BY ...)', desc: 'تقسيم البيانات إلى مجموعات مستقلة (Partitions) وتطبيق الحسابات الرياضية داخل كل قسم مع الاحتفاظ بالصفوف الفردية.' },
      { step: '02', title: 'الترتيب والتصنيف بـ ROW_NUMBER() و DENSE_RANK()', desc: 'إعطاء تسلسل فريد لكل صف أو ترتيب مالي دقيق لا يترك فجوات عند تساوي القيم (DENSE_RANK).' },
      { step: '03', title: 'المقارنة الزمنية ونسب النمو بـ LAG() و LEAD()', desc: 'الوصول لقيمة الصف السابق (LAG) أو الصف التالي (LEAD) لحساب فارق المبيعات اليومية أو الشهرية بدون أي Self-Join.' },
      { step: '04', title: 'المجموع التراكمي المتحرك (Running Totals)', desc: 'حساب الرصيد التراكمي المستمر SUM(amount) OVER (ORDER BY date) عبر مسح النافذة الزمنية تدريجياً.' },
      { step: '05', title: 'تحديد أفضل N عناصر لكل فئة (Top-N Per Group)', desc: 'استخدام ROW_NUMBER() داخل CTE لجلب أعلى 3 منتجات مبيعاً داخل كل فئة في استعلام واحد فائق الكفاءة.' }
    ],
    playgroundCode: `// محاكي الدوال التحليلية Window Functions في SQL
const windowFunctionSql = \`
SELECT 
  employee_id,
  department,
  salary,
  -- 1. متوسط راتب القسم لكل موظف
  AVG(salary) OVER (PARTITION BY department) as dept_avg_salary,
  -- 2. ترتيب الموظف داخل قسمه حسب الراتب
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
  -- 3. راتب الموظف السابق للمقارنة
  LAG(salary, 1) OVER (PARTITION BY department ORDER BY salary DESC) as previous_higher_salary
FROM employees;
\`;

console.log("PostgreSQL Analytical Window Query:");
console.log(windowFunctionSql);`,
    experimentQuestion: 'ما هو الفرق بين RANK() و DENSE_RANK() عندما يتساوى موظفان في نفس الراتب بالمركز الثاني؟',
    experimentAnswer: 'إذا تساوى موظفان في المركز الثاني (المرتبة 2)، فإن دالة RANK() ستعطي الموظف التالي المرتبة 4 (تترك فجوة في الترقيم 1, 2, 2, 4). أما دالة DENSE_RANK() فلا تترك أي فجوات وتعطي الموظف التالي المرتبة 3 مباشرة (1, 2, 2, 3).',
    codeAnatomy: [
      { line: 'WITH RankedProducts AS (', note: '1. CTE لتصنيف المنتجات' },
      { line: '  SELECT id, name, category, sales_count,', note: 'حقول المنتج' },
      { line: '    ROW_NUMBER() OVER (', note: 'ترقيم ترتيبي داخل كل فئة' },
      { line: '      PARTITION BY category', note: 'تقسيم النوافذ حسب الفئة' },
      { line: '      ORDER BY sales_count DESC', note: 'فرز بالأعلى مبيعاً' },
      { line: '    ) as rank', note: 'اسم عمود الترتيب' },
      { line: '  FROM products', note: 'جدول المنتجات' },
      { line: ')', note: 'نهاية الـ CTE' },
      { line: 'SELECT * FROM RankedProducts WHERE rank <= 3; // 2. جلب أفضل 3 في كل قسم', note: 'استخراج Top-3 لكل فئة' }
    ],
    pitfallBad: `// خطأ شائع: محاولة وضع Window Function داخل جملة WHERE مباشرة
SELECT name, salary FROM employees WHERE ROW_NUMBER() OVER (ORDER BY salary) <= 5;
// خطأ Syntax Error: Window functions غير مسموحة في WHERE لأنها تنفذ بعد تصفية الصفوف!`,
    pitfallGood: `// الحل الهندسي: تغليف الاستعلام داخل CTE أو Subquery
WITH Ranked AS (
  SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) as rn FROM employees
)
SELECT * FROM Ranked WHERE rn <= 5;`,
    pitfallDiagnosis: 'محرك SQL ينفذ جملة WHERE قبل حساب الـ Window Functions، ولذلك يجب استخدام CTE لتصفية النتائج بناءً على قيم النوافذ.',
    quizPool: [
      {
        q: 'What is the primary conceptual difference between GROUP BY and Window Functions (OVER)?',
        qAr: 'ما هو الفرق المفاهيمي الأساسي بين GROUP BY والدوال التحليلية (Window Functions)?',
        options: [
          'GROUP BY collapses multiple rows into a single summary row; Window Functions compute aggregates while retaining all individual rows.',
          'GROUP BY is only for PostgreSQL; Window Functions are for MySQL.',
          'Window functions delete duplicate rows.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'Window functions perform calculations across a set of table rows related to the current row without collapsing the result set.',
        whyAr: 'تجري الـ Window Functions حسابات تجميعية ومقارنات عبر النوافذ مع الحفاظ على كافة صفوف الجدول كاملة دون دمجها.'
      },
      {
        q: 'What does the LAG(column, 1) window function return?',
        qAr: 'ما الذي تُرجعه الدالة التحليلية LAG(column, 1)؟',
        options: [
          'The value of the specified column from the preceding row within the current partition/window frame.',
          'The average of all previous rows.',
          'The last row of the entire table.',
          'A random number.'
        ],
        correct: 0,
        why: 'LAG accesses data from a previous row at a specified offset within the partition without requiring a self-join.',
        whyAr: 'تصل لقيمة الصف السابق مباشرة داخل نفس المجموعة مما يسهل حساب الفروق الزمنية ومعدلات النمو.'
      },
      {
        q: 'Why can Window Functions NOT be used directly inside a SQL WHERE clause?',
        qAr: 'لماذا لا يمكن استخدام الدوال التحليلية مباشرة داخل جملة WHERE؟',
        options: [
          'In SQL logical query processing, WHERE executes BEFORE window functions are evaluated; wrapping in a CTE/subquery is required.',
          'Because of missing table indexes.',
          'To prevent SQL injection.',
          'Window functions are only for SELECT statements.'
        ],
        correct: 0,
        why: 'SQL evaluation order processes FROM -> WHERE -> GROUP BY -> HAVING -> WINDOW -> SELECT, meaning window values do not exist during WHERE filtering.',
        whyAr: 'في تسلسل معالجة SQL، تنفذ جملة WHERE قبل تقييم دوال النوافذ ولذلك يجب تغليفها في CTE لتصفيتها.'
      },
      {
        q: 'What does "SUM(amount) OVER (ORDER BY transaction_date)" compute in PostgreSQL?',
        qAr: 'ما الذي تحسبه عبارة "SUM(amount) OVER (ORDER BY transaction_date)" في PostgreSQL؟',
        options: [
          'A running (cumulative) total of amount ordered chronologically up to the current row.',
          'The overall grand total for the whole table in every row.',
          'The average transaction amount.',
          'The difference between min and max.'
        ],
        correct: 0,
        why: 'An ORDER BY inside OVER defaults the frame to UNBOUNDED PRECEDING TO CURRENT ROW, generating a running cumulative sum.',
        whyAr: 'تحسب المجموع التراكمي المتحرك للمبالغ بالترتيب الزمني حتى الصف الحالي لحظة بلحظة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة "Gaps and Islands" الشهيرة في SQL لحساب أطول سلسلة أيام متتالية قام فيها المستخدم بتسجيل الدخول؟',
    interviewA: 'نحلها باستخدام دمج ROW_NUMBER مع التواريخ: 1. نقوم بحساب log_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY log_date) * INTERVAL \'1 day\') as grp_date. 2. إذا كانت الأيام متتالية، فإن فارق الطرح سينتج نفس التاريخ الثابت تماماً لجميع الأيام المتتالية (Island). 3. نقوم بعد ذلك بعمل GROUP BY user_id, grp_date مع حساب COUNT(*) لحساب أطول سلسلة أيام متصلة في استعلام قياسي فائق السرعة.'
  },
  {
    slug: 'transactions-locks',
    title: 'ACID Isolation Levels & Concurrency Locks: MVCC, Row Locks & Deadlock Prevention',
    titleAr: 'مستويات عزل ACID وأقفال التزامن: معمارية MVCC، أقفال الصفوف ومنع الـ Deadlocks',
    level: 3,
    order: 11,
    estMinutes: 35,
    version: 'PostgreSQL 18 Concurrency',
    pattern: 'Multi-Version Concurrency Control (MVCC) & Row-Level Locking',
    objectives: [
      'فهم معمارية التحكم متعدد الإصدارات في التزامن (MVCC) وكيف تضمن "القراءات لا تحظر الكتابة والكتابة لا تحظر القراءة".',
      'تشريح مستويات عزل المعاملات الأربعة: Read Committed, Repeatable Read, و Serializable.',
      'استخدام أقفال الصفوف الصريحة (Explicit Row Locking: SELECT ... FOR UPDATE / FOR SHARE).',
      'فهم أسباب حدوث أقفال الموت (Deadlocks) وتطبيق استراتيجيات الترتيب الحتمي للوقاية منها.'
    ],
    problemOpening: `
      في خادم قاعدة بيانات يعالج آلاف المعاملات في الثانية، تخيل المشهد التالي:
      مستخدمان يحاولان حجز آخر مقعد متبقي في طائرة في نفس الميلي ثانية:
      1. المعاملة A تقرأ المقعد وتجده شاغراً (<code dir="ltr">available = true</code>).
      2. المعاملة B تقرأ نفس المقعد وتجده شاغراً أيضاً!
      3. المعاملة A تحجز المقعد وتدفع.
      4. المعاملة B تحجز نفس المقعد وتدفع أيضاً (Double Booking Disaster)!
      ما لم تكن تملك فهماً عميقاً لـ **مستويات عزل المعاملات (ACID Isolation Levels)** و **أقفال الصفوف (SELECT ... FOR UPDATE)**، فإن بياناتك معرضة للفساد المالي.
      تتميز بوستجريس بمحرك **MVCC (Multi-Version Concurrency Control)** الأسطوري: عند تعديل صف، لا تقوم بقفله وحظر القراء؛ بل تنشئ نسخة جديدة من الصف (<code dir="ltr">Tuple</code>) مع الحفاظ على النسخة القديمة للقراء، محققة أقصى درجات التزامن والسرعة.
      في هذا الدرس، هنفكك أعماق محرك MVCC، وهنتعلم إزاي نقفل الصفوف الحرجة بأمان لمنع الـ **Deadlocks**.
    `,
    mechanics: [
      { step: '01', title: 'معمارية الـ MVCC وحقول xmin و xmax الخفية', desc: 'كل صف في بوستجريس يحمل رقم معاملة الإنشاء (xmin) ومعاملة الحذف/التعديل (xmax) لتحديد رؤية الصف لكل معاملة.' },
      { step: '02', title: 'مستوى العزل الافتراضي (Read Committed)', desc: 'المعاملة ترى فقط البيانات التي تم تثبيتها (Committed) قبل بداية الاستعلام الحالي، وتمنع قراءة البيانات القذرة (Dirty Reads).' },
      { step: '03', title: 'مستوى القراءات المتكررة (Repeatable Read)', desc: 'المعاملة ترى لقطة زمنية ثابتة للبيانات منذ بداية المعاملة وتمنع ظاهرة القراءات غير المتكررة (Non-Repeatable Reads).' },
      { step: '04', title: 'القفل التشاؤمي الصارم بـ SELECT FOR UPDATE', desc: 'قفل الصف المختار ومنع أي معاملات أخرى من تعديله أو حجزه حتى تكتمل المعاملة الحالية بـ COMMIT.' },
      { step: '05', title: 'الوقاية من الـ Deadlocks بالترتيب الحتمي', desc: 'قفل الموارد دائماً بنفس الترتيب المنطقي الصارم (مثل الفرز بـ ID التصاعدي) لضمان عدم حدوث تعليق متبادل بين المعاملات.' }
    ],
    playgroundCode: `// محاكي القفل التشاؤمي لمنع الحجز المزدوج (Double Booking)
class SeatReservationEngine {
  constructor() {
    this.seats = new Map([["12A", { id: "12A", isBooked: false, lockedBy: null }]]);
  }

  async bookSeat(seatId, userId) {
    const seat = this.seats.get(seatId);
    console.log(\`1. User [\${userId}] attempting SELECT ... FOR UPDATE on Seat \${seatId}\`);
    
    if (seat.isBooked) {
      console.error(\`❌ Seat \${seatId} is already booked! Transaction rolled back.\`);
      return false;
    }

    // قفل الصف حصرياً
    seat.lockedBy = userId;
    console.log(\`🔒 Row Lock acquired by User [\${userId}]. Processing payment...\`);
    
    // تأكيد الحجز
    seat.isBooked = true;
    seat.lockedBy = null;
    console.log(\`✅ Seat \${seatId} successfully booked for User [\${userId}]!\`);
    return true;
  }
}

const engine = new SeatReservationEngine();
await engine.bookSeat("12A", "User_Sarah");
await engine.bookSeat("12A", "User_Ahmed"); // سيتم منعه بأمان!`,
    experimentQuestion: 'ما هو الـ Deadlock وكيف يكتشفه محرك PostgreSQL ويقوم بحله تلقائياً؟',
    experimentAnswer: 'يحدث الـ Deadlock عندما تقفل المعاملة A الصف 1 وتطلب قفل الصف 2، بينما تقفل المعاملة B الصف 2 وتطلب قفل الصف 1 في نفس الوقت؛ فينتظر كل منهما الآخر للأبد! يمتلك PostgreSQL خيط فحص داخلي (Deadlock Detector) يستيقظ بعد مهلة deadlock_timeout (افتراضياً 1 ثانية)، وعند اكتشاف حلقة الانتظار المتبادلة، يقوم فوراً بإنهاء إحدى المعاملتين قسراً وإرجاع خطأ: ERROR: deadlock detected ليسمح للمعاملة الأخرى بالمرور.',
    codeAnatomy: [
      { line: 'BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;', note: 'بدء المعاملة مع تحديد مستوى العزل' },
      { line: 'SELECT id, balance FROM wallets', note: 'استعلام قراءة الرصيد' },
      { line: 'WHERE user_id = \'9921c5f8-8a8b-4c5e-8b1e-2c9e8f1a2b3c\'', note: 'تحديد الحساب' },
      { line: 'FOR UPDATE; -- 🔒 فرض قفل حصري على الصف لمنع التعديلات المتزامنة', note: 'قفل الصف التشاؤمي' },
      { line: 'UPDATE wallets SET balance = balance - 100', note: 'تعديل الرصيد بأمان' },
      { line: 'WHERE user_id = \'9921c5f8-8a8b-4c5e-8b1e-2c9e8f1a2b3c\';', note: 'تطبيق التعديل' },
      { line: 'COMMIT; -- تحرير القفل وتثبيت التعديل', note: 'تثبيت المعاملة' }
    ],
    pitfallBad: `// خطأ شائع مسبب للحجز المزدوج: فحص بدون قفل
const seat = await db.query("SELECT * FROM seats WHERE id = $1 AND booked = false", [id]);
if (seat.rows.length > 0) {
  // لو وصل طلبان هنا معاً، سيقومان بالحجز مرتين لنفس المقعد!
  await db.query("UPDATE seats SET booked = true WHERE id = $1", [id]);
}`,
    pitfallGood: `// الحل الهندسي: استخدام SELECT ... FOR UPDATE
const seat = await db.query("SELECT * FROM seats WHERE id = $1 AND booked = false FOR UPDATE", [id]);
if (seat.rows.length > 0) {
  await db.query("UPDATE seats SET booked = true WHERE id = $1", [id]);
}`,
    pitfallDiagnosis: 'الفحص بدون قفل يفتح نافذة سباق للعمليات المتزامنة، بينما FOR UPDATE يقفل الصف ويجبر الطلب الثاني على الانتظار حتى اكتمال الأول.',
    quizPool: [
      {
        q: 'What is the core principle of PostgreSQL\'s Multi-Version Concurrency Control (MVCC)?',
        qAr: 'ما هو المبدأ الجوهري لمعمارية التحكم متعدد الإصدارات في التزامن (MVCC) في PostgreSQL؟',
        options: [
          'Readers never block writers, and writers never block readers, by maintaining multiple historical row versions (tuples).',
          'Only one user can read the database at a time.',
          'All tables are locked during writes.',
          'Data is deleted after 30 days.'
        ],
        correct: 0,
        why: 'MVCC isolates concurrent transactions via point-in-time tuple visibility, ensuring reads and writes do not lock each other.',
        whyAr: 'تضمن MVCC أن القراءات لا تحظر الكتابة والكتابة لا تحظر القراءات عبر الاحتفاظ بإصدارات متعددة من الصفوف في الذاكرة.'
      },
      {
        q: 'What does the "SELECT ... FOR UPDATE" SQL clause do?',
        qAr: 'ما هي وظيفة عبارة "SELECT ... FOR UPDATE" في استعلامات SQL؟',
        options: [
          'Acquires an exclusive row-level lock on returned rows, blocking other concurrent transactions from modifying or locking them until commit.',
          'Updates the rows immediately to NULL.',
          'Creates a backup of the rows.',
          'Converts the rows into JSON.'
        ],
        correct: 0,
        why: 'FOR UPDATE applies pessimistic row locks, preventing race conditions like double-spending or double-booking.',
        whyAr: 'تفرض قفلاً تشاؤمياً حصرياً على الصفوف المحددة وتمنع المعاملات المتزامنة الأخرى من تعديلها حتى انتهاء المعاملة الحالية.'
      },
      {
        q: 'What is a Deadlock in database transaction management?',
        qAr: 'ما هو الـ Deadlock في إدارة معاملات قواعد البيانات؟',
        options: [
          'A circular wait condition where transaction A waits for a lock held by transaction B, while B waits for a lock held by A.',
          'When the database hard drive crashes.',
          'When a password is forgotten.',
          'When an index is corrupted.'
        ],
        correct: 0,
        why: 'Deadlocks occur when concurrent transactions form a dependency cycle of mutual resource locks, requiring engine intervention.',
        whyAr: 'حالة انتظار دائرية متبادلة حيث تنتظر المعاملة A قفلاً تحمله المعاملة B، بينما تنتظر B قفلاً تحمله A مما يعلق الطرفين للأبد.'
      },
      {
        q: 'What is the default transaction isolation level in PostgreSQL?',
        qAr: 'ما هو مستوى عزل المعاملات الافتراضي في PostgreSQL؟',
        options: ['Read Committed', 'Read Uncommitted', 'Repeatable Read', 'Serializable'],
        correct: 0,
        why: 'PostgreSQL defaults to Read Committed, where queries see only data committed before the individual query began.',
        whyAr: 'المستوى الافتراضي هو Read Committed حيث يرى الاستعلام فقط البيانات التي تم تثبيتها واعتمادها قبل بداية الاستعلام.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو دور عملية VACUUM و AUTOVACUUM في محرك PostgreSQL ولماذا يؤدي تعطيلها إلى تضخم حجم الجداول (Table Bloat) وبطء الاستعلامات؟',
    interviewA: 'بسبب معمارية MVCC، عندما تقوم بتعديل أو حذف صف، لا يقوم بوستجريس بحذفه من القرص فوراً؛ بل يضع علامة عليه كـ Dead Tuple ليظل مرئياً للمعاملات الأقدم الجارية. عملية VACUUM / AUTOVACUUM هي "مجمع القمامة" الخاص بقاعدة البيانات: تقوم بالمسح الدوري للقرص لتحديد الـ Dead Tuples وإعادة تعليم مساحتها في خريطة المساحات الفارغة (Free Space Map - FSM) لتكون قابلة لإعادة الاستخدام في عمليات INSERT الجديدة. إذا تم تعطيل AutoVacuum، تستمر الصفوف الميتة في التراكم (Table Bloat)، مما يضاعف حجم الجداول على القرص ويجبر المحرك على قراءة ملايين الصفوف الميتة في كل استعلام مسبباً بطئاً كارثياً.'
  },
  {
    slug: 'partitioning-sharding',
    title: 'Declarative Table Partitioning: Range, List, Hash & Citus Distributed Sharding',
    titleAr: 'تجزئة الجداول التصريحية (Partitioning): النطاقات، القوائم وتوزيع البيانات العملاقة بـ Citus',
    level: 3,
    order: 12,
    estMinutes: 35,
    version: 'PostgreSQL 18 Declarative Partitioning',
    pattern: 'Horizontal Data Partitioning & Scale-Out SQL',
    objectives: [
      'فهم معمارية التجزئة التصريحية للجداول (Declarative Table Partitioning) وكيف تقسم الجداول الضخمة إلى جداول فرعية فيزيائية.',
      'تطبيق استراتيجيات التجزئة الثلاث: تجزئة النطاقات (Range Partitioning)، القوائم (List Partitioning)، والتجزئة (Hash Partitioning).',
      'فهم ميزة استبعاد الأقسام (Partition Pruning) وكيف يتجاهل المحرك قراءة 95% من الجداول الفرعية.',
      'التوسع الأفقي العملاق عبر عدة خوادم باستخدام امتداد Citus Distributed PostgreSQL.'
    ],
    problemOpening: `
      عندما يصل جدول الطلبات أو جدول سجلات الـ Audit Logs إلى 100 مليون صف، يبدأ أداء الفهارس والاستعلامات بالتدهور:
      حجم فهرس B-Tree يتجاوز حجم الـ RAM، وعمليات الصيانة مثل <code dir="ltr">VACUUM</code> وإعادة بناء الفهارس تستغرق ساعات طويلة!
      الحل المعماري القياسي في PostgreSQL هو **تجزئة الجداول التصريحية (Declarative Table Partitioning)**.
      يتيح لك تقسيم الجدول العملاق إلى جداول فيزيائية أصغر (Partitions)، مثل إنشاء جدول فرعي لكل شهر (<code dir="ltr">orders_2026_01</code>, <code dir="ltr">orders_2026_02</code>...).
      التطبيق يتعامل مع جدول واحد رئيسي كالمعتاد، ولكن عندما ينفذ استعلاماً:
      <code dir="ltr">SELECT * FROM orders WHERE ordered_at >= '2026-08-01'</code>
      يقوم محرك الاستعلامات بميزة خارقة اسمها **Partition Pruning**: يتجاهل المحرك فوراً قراءة جداول باقي الشهور الـ 11، ويقرأ حصراً جدول شهر أغسطس، مما يقلل زمن الاستعلام بنسبة 90% ويوفر الذاكرة!
      في هذا الدرس، هنتعلم إزاي نبني جداول مجزأة ذاتية الإدارة، وهنتعرف على امتداد **Citus** لتوزيع الجداول عبر خوادم متعددة.
    `,
    mechanics: [
      { step: '01', title: 'إنشاء الجدول الأب بـ PARTITION BY RANGE', desc: 'تعريف بنية الجدول وتحديد مفتاح التجزئة (مثل حقل التاريخ created_at) ليكون أساس توزيع البيانات.' },
      { step: '02', title: 'إنشاء الجداول الفرعية (Child Partitions)', desc: 'إنشاء جداول لكل شهر FOR VALUES FROM (\'2026-08-01\') TO (\'2026-09-01\') مع فهارس محلية مستقلة.' },
      { step: '03', title: 'استبعاد الأقسام الذكي بـ Partition Pruning', desc: 'يقوم مفسر الاستعلامات بفحص شرط WHERE واستبعاد قراءة الأقسام غير المعنية من خطة التنفيذ تماماً.' },
      { step: '04', title: 'الحذف والأرشفة الفورية بـ DROP PARTITION', desc: 'بدلاً من تشغيل DELETE البطيء لحذف بيانات قديمة، نقوم بفصل الجدول بـ DETACH PARTITION وحذفه في 1ms وبدون أي Lock.' },
      { step: '05', title: 'التوزيع الأفقي بـ Citus Sharding Extension', desc: 'تحويل PostgreSQL إلى قاعدة بيانات موزعة عملاقة تنشر الجداول عبر 100 سيرفر بـ create_distributed_table().' }
    ],
    playgroundCode: `// محاكي تجزئة الجداول التصريحية (Range Partitioning) في PostgreSQL
const partitioningDdl = \`
-- 1. إنشاء الجدول الأب المجزأ
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  logged_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (logged_at);

-- 2. إنشاء أقسام الأشهر الفيزيائية
CREATE TABLE audit_logs_2026_08 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-08-01 00:00:00+00') TO ('2026-09-01 00:00:00+00');

CREATE TABLE audit_logs_2026_09 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-09-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');
\`;

console.log("PostgreSQL Declarative Partitioning Schema:");
console.log(partitioningDdl);`,
    experimentQuestion: 'لماذا يعتبر حذف البيانات القديمة عبر ALTER TABLE ... DETACH PARTITION ثم DROP TABLE أسرع بآلاف المرات من كتابة DELETE FROM table WHERE date < ...؟',
    experimentAnswer: 'أمر DELETE العادي يقوم بمسح كل صف على حدة، وتوليد سجلات Oplog/WAL لكل عملية، وتحديث الفهارس، وإنشاء Dead Tuples تتطلب VACUUM لاحقاً (عملية مكلفة جداً). أما DETACH و DROP فيقوم ببساطة بقطع مؤشر الجدول الفرعي وحذف الملف الفيزيائي من القرص الصلب في خطوة واحدة على مستوى نظام التشغيل (Metadata-only drop) في أجزاء من الميلي ثانية وبدون أي استهلاك للـ CPU.',
    codeAnatomy: [
      { line: '-- إنشاء جدول مبيعات مجزأ حسب القوائم (List Partitioning)', note: 'تجزئة حسب الدول' },
      { line: 'CREATE TABLE regional_sales (', note: 'الجدول الرئيسي' },
      { line: '  id UUID DEFAULT gen_random_uuid(),', note: 'معرف البيع' },
      { line: '  country_code VARCHAR(2) NOT NULL,', note: 'مفتاح التجزئة' },
      { line: '  amount NUMERIC(10, 2) NOT NULL', note: 'المبلغ' },
      { line: ') PARTITION BY LIST (country_code);', note: 'تحديد نمط List' },
      { line: 'CREATE TABLE sales_mena PARTITION OF regional_sales FOR VALUES IN (\'EG\', \'SA\', \'AE\');', note: 'قسم الشرق الأوسط' },
      { line: 'CREATE TABLE sales_eu PARTITION OF regional_sales FOR VALUES IN (\'DE\', \'FR\', \'UK\');', note: 'قسم أوروبا' }
    ],
    pitfallBad: `// خطأ شائع: عدم تضمين مفتاح التجزئة داخل الـ PRIMARY KEY
CREATE TABLE sensor_data (
  id UUID PRIMARY KEY, // خطأ: بوستجريس ترفض إنشاء Primary Key لا يحتوي على مفتاح التجزئة!
  logged_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (logged_at);`,
    pitfallGood: `// الحل الصحيح: تضمين مفتاح التجزئة في المفتاح الأساسي المركب
CREATE TABLE sensor_data (
  id UUID NOT NULL,
  logged_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id, logged_at) // مفتاح مركب سليم
) PARTITION BY RANGE (logged_at);`,
    pitfallDiagnosis: 'تفرض قواعد PostgreSQL تضمين عمود التجزئة في المفتاح الأساسي لضمان التحقق من الفرادة محلياً داخل كل قسم.',
    quizPool: [
      {
        q: 'What is the primary performance optimization mechanism provided by PostgreSQL Partition Pruning?',
        qAr: 'ما هي آلية تحسين الأداء الأساسية التي توفرها ميزة Partition Pruning في PostgreSQL؟',
        options: [
          'The query planner analyzes WHERE conditions to exclude unneeded partitions from the execution plan, scanning only relevant partition tables.',
          'Compresses database tables.',
          'Deletes empty partitions.',
          'Translates SQL to NoSQL.'
        ],
        correct: 0,
        why: 'Partition pruning skips non-matching child partitions entirely, reducing disk I/O and query latency proportionally.',
        whyAr: 'يقوم مفسر الاستعلامات بفحص الشروط وتجاهل قراءة الجداول الفرعية غير المعنية مما يقلل قراءة القرص بنسبة هائلة.'
      },
      {
        q: 'Why must unique constraints (and Primary Keys) on partitioned tables include the partition key column(s)?',
        qAr: 'لماذا يجب أن تتضمن المفاتيح الأساسية والقيود الفريدة عمود التجزئة في الجداول المجزأة؟',
        options: [
          'PostgreSQL enforces uniqueness per partition index; including the partition key allows local uniqueness guarantees without cross-table index locks.',
          'To make the column names shorter.',
          'Because of RAM limitations.',
          'It is an optional suggestion.'
        ],
        correct: 0,
        why: 'Enforcing uniqueness globally across unlinked child indexes would require prohibitive cross-partition locking overhead.',
        whyAr: 'لأن بوستجريس تفرض التحقق من الفرادة داخل كل جدول فرعي، وتضمين المفتاح يضمن الفرادة دون الحاجة لأقفال عابرة للجداول.'
      },
      {
        q: 'What capability does the Citus extension add to PostgreSQL?',
        qAr: 'ما هي الإمكانية التي يضيفها امتداد Citus إلى قاعدة بيانات PostgreSQL؟',
        options: [
          'Transforms PostgreSQL into a distributed multi-node database that transparently shards tables across a cluster of servers.',
          'Creates mobile apps automatically.',
          'Converts SQL tables into Excel files.',
          'Generates CSS themes.'
        ],
        correct: 0,
        why: 'Citus extends PostgreSQL with distributed table sharding, distributed query execution, and high-performance horizontal scale-out.',
        whyAr: 'يحول PostgreSQL إلى قاعدة بيانات موزعة عملاقة توزع الجداول وتنفذ الاستعلامات المتوازية عبر مئات السيرفرات.'
      },
      {
        q: 'What is the fastest way to purge old historical data from a partitioned table in PostgreSQL?',
        qAr: 'ما هي الطريقة الأسرع والأكثر كفاءة لحذف البيانات التاريخية القديمة من جدول مجزأ في PostgreSQL؟',
        options: [
          'Detaching the target partition table and dropping it via DROP TABLE (instant metadata operation).',
          'Executing a massive DELETE FROM table WHERE date < ... query.',
          'Restarting the PostgreSQL server.',
          'Exporting to CSV.'
        ],
        correct: 0,
        why: 'Dropping a detached partition is an instantaneous O(1) filesystem deletion with zero dead-tuple bloat and zero WAL overhead.',
        whyAr: 'فصل القسم وحذفه بـ DROP TABLE يتم في أجزاء من الميلي ثانية على مستوى نظام التشغيل دون توليد صفوف ميتة أو استهلاك المعالج.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تدير إنشاء الأقسام المستقبلية تلقائياً (Automated Partition Management) لجدول زمني ينمو يومياً دون أي تدخل بشري؟',
    interviewA: 'نستخدم أداة pg_partman (PostgreSQL Partition Manager Extension) أو نبني Trigger / Cron Job بـ pg_cron: نقوم بتكوين pg_partman.create_parent(\'public.orders\', \'created_at\', \'native\', \'monthly\') وضبط premake: 3. تقوم الأداة تلقائياً بإنشاء أقسام الأشهر الثلاثة القادمة مسبقاً في الخلفية، وفصل وأرشفة الأقسام القديمة تلقائياً إلى S3 أو جداول باردة بعد انقضاء سنة، محققة أتمتة كاملة بنسبة 100% لإدارة البيانات الضخمة.'
  },
  {
    slug: 'fulltext-search',
    title: 'Full-Text Search (FTS): tsvector, tsquery, Ranking & Trigram Fuzzy Matching',
    titleAr: 'البحث النصي الشامل (Full-Text Search): متجهات tsvector، استعلامات tsquery ومطابقة Trigram الضبابية',
    level: 3,
    order: 13,
    estMinutes: 35,
    version: 'PostgreSQL 18 FTS',
    pattern: 'Search Engine Architecture & Lexical Analysis',
    objectives: [
      'فهم كيفية بناء محرك بحث كامل فائق السرعة داخل PostgreSQL دون الحاجة لتنصيب وإدارة Elasticsearch.',
      'تشريح مراحل المعالجة النصية: إزالة الكلمات الزائدة (Stop Words) وتجذير الكلمات لأصلها اللغوي (Stemming) بـ tsvector.',
      'إتقان صياغة استعلامات البحث المتقدمة (tsquery) باستخدام المشغلات المنطقية (&, |, !, <->).',
      'تطبيق البحث الضبابي ومطابقة الأخطاء الإملائية (Fuzzy Typo Tolerance) باستخدام امتداد pg_trgm وفهارس GIN.'
    ],
    problemOpening: `
      عندما يطلب العميل ميزة بحث في شريط المتجر، يكتب المطور المبتدئ:
      <code dir="ltr">SELECT * FROM products WHERE name ILIKE '%iphone 15 pro%'</code>.
      ماذا يحدث عندما ينمو المتجر إلى مليون منتج؟
      1. بطء قاتل: الـ <code dir="ltr">ILIKE '%...%'</code> يجبر المحرك على فحص كل حرف في كل صف في مسح شامل للجدول (Seq Scan) في 4 ثوانٍ!
      2. غباء في النتائج: لو بحث المستخدم عن "running shoes"، فلن يجد المنتجات المسماة "run shoe"! وإذا أخطأ في حرف واحد وكتب "iphne"، فلن تظهر له أي نتائج نهائياً!
      المطورون يسارعون لتنصيب محرك خارجي معقد مثل Elasticsearch، مما يضاعف تكلفة الخوادم وتعقيد مزامنة البيانات!
      بينما يمتلك **PostgreSQL محرك بحث نصي متكامل خارق القوة (Full-Text Search Engine)**:
      يقوم بتحليل الكلمات، إزالة حروف الجر، تجذير الكلمات لأصلها (Stemming: تحويل running و runs إلى run)، وترتيب النتائج حسب الأهمية بـ <code dir="ltr">ts_rank()</code>، ودعم تصحيح الأخطاء الإملائية بـ **pg_trgm** في أقل من 2ms!
      في هذا الدرس، هنبني محرك بحث مؤسسي متكامل داخل قاعدة بياناتك.
    `,
    mechanics: [
      { step: '01', title: 'تحويل النصوص لمتجهات بـ to_tsvector()', desc: 'تفكيك النصوص، إزالة الكلمات الشائعة (Stop Words)، وتجذير الكلمات لجذورها المعجمية مع تحديد أوزان الحقول (A, B, C).' },
      { step: '02', title: 'بناء استعلامات البحث بـ to_tsquery()', desc: 'مطابقة الكلمات بالعمليات المنطقية: & (AND)، | (OR)، ! (NOT)، و <-> (Followed By / Phrase Search).' },
      { step: '03', title: 'تسريع البحث بفهارس GIN المعكوسة', desc: 'إنشاء فهرس GIN على العمود المتجهي المولد لتنفيذ البحث المعجمي في أجزاء من الميلي ثانية.' },
      { step: '04', title: 'ترتيب النتائج حسب درجة التطابق بـ ts_rank()', desc: 'حساب نقاط الصلة (Relevance Score) وترتيب المقالات والمنتجات الأكثر تطابقاً مع كلمات بحث المستخدم في البداية.' },
      { step: '05', title: 'البحث الضبابي ومقاومة الأخطاء بـ pg_trgm', desc: 'تقسيم الكلمات لمقاطع ثلاثية الحروف (Trigrams) وحساب نسبة التشابه similarity() لاصطياد الأخطاء الإملائية.' }
    ],
    playgroundCode: `// محاكي محرك البحث النصي الشامل في PostgreSQL
const ftsQuerySimulation = \`
-- 1. استعلام البحث المعجمي بـ tsvector و tsquery مع الترتيب
SELECT 
  id, 
  title, 
  ts_rank(search_vector, query) as relevance
FROM articles, 
     to_tsquery('english', 'react & architecture') query
WHERE search_vector @@ query
ORDER BY relevance DESC
LIMIT 10;

-- 2. البحث الضبابي عن الأخطاء الإملائية بـ Trigrams (similarity > 0.3)
SELECT name, similarity(name, 'iphne 15') as match_score
FROM products
WHERE name % 'iphne 15' -- يطابق "iPhone 15" بنجاح رغم الخطأ الإملائي!
ORDER BY match_score DESC;
\`;

console.log("PostgreSQL Advanced Full-Text Search Queries:");
console.log(ftsQuerySimulation);`,
    experimentQuestion: 'ما هو الفرق بين البحث المعجمي بـ to_tsvector والبحث بالتشابه بـ pg_trgm ومتى ندمج بينهما؟',
    experimentAnswer: 'البحث المعجمي (tsvector) يعتمد على المعاني اللغوية وتجذير الكلمات (مثال: بحث "jump" يطابق "jumping" و "jumped") وهو فائق السرعة عبر فهارس GIN. أما pg_trgm فيعتمد على التشابه الحرفي (Character N-grams) وممتاز في تصحيح الأخطاء الإملائية وتكملة الكلمات التلقائية (Autocomplete). في الأنظمة الاحترافية، نبحث أولاً بـ tsvector، وإذا كانت النتائج 0، ننتقل تلقائياً لـ pg_trgm لاقتراح "هل تقصد كذا؟" (Did you mean...).',
    codeAnatomy: [
      { line: '-- إنشاء عمود متجهي مولد تلقائياً ومفهرس بـ GIN', note: 'أفضل نمط معماري للـ FTS' },
      { line: 'ALTER TABLE articles ADD COLUMN search_vector tsvector', note: 'إضافة عمود المتجه' },
      { line: '  GENERATED ALWAYS AS (', note: 'توليد تلقائي دائم' },
      { line: '    setweight(to_tsvector(\'english\', coalesce(title, \'\')), \'A\') ||', note: 'وزن العنوان (A: الأهم)' },
      { line: '    setweight(to_tsvector(\'english\', coalesce(body, \'\')), \'B\')', note: 'وزن المحتوى (B)' },
      { line: '  ) STORED;', note: 'حفظ النتيجة فيزيائياً على القرص' },
      { line: 'CREATE INDEX idx_articles_fts ON articles USING GIN (search_vector);', note: 'فهرس GIN فائق السرعة' }
    ],
    pitfallBad: `// خطأ شائع مسبب لبطء شديد: حساب to_tsvector في كل استعلام SELECT مباشرة
SELECT * FROM articles WHERE to_tsvector('english', body) @@ to_tsquery('english', 'database');
// يجبر المحرك على تحليل ملايين النصوص من الصفر في كل بحث (Seq Scan)!`,
    pitfallGood: `// الحل الهندسي: استخدام Generated Column مخزن ومفهرس بـ GIN
SELECT * FROM articles WHERE search_vector @@ to_tsquery('english', 'database'); // استعلام فوري بـ Index Scan`,
    pitfallDiagnosis: 'حساب الـ tsvector لحظياً يستهلك الـ CPU، بينما تخزينه في عمود Generated Column مفهرس يوفر استجابة فورية في 1ms.',
    quizPool: [
      {
        q: 'What is the role of Stemming in PostgreSQL Full-Text Search (to_tsvector)?',
        qAr: 'ما هو دور تجذير الكلمات (Stemming) في البحث النصي بـ to_tsvector؟',
        options: [
          'Reduces words to their root linguistic base (e.g. "running", "runs" -> "run") so searches match various grammatical forms.',
          'Deletes vowels from strings.',
          'Translates words into Arabic.',
          'Encrypts text values.'
        ],
        correct: 0,
        why: 'Stemming maps conjugated and plural words to their dictionary stem, allowing queries for "run" to find "running".',
        whyAr: 'يحول الكلمات بمختلف تصريفاتها وجموعها إلى جذرها اللغوي الموحد لتمكين البحث من مطابقة جميع الصيغ.'
      },
      {
        q: 'Which PostgreSQL extension provides fuzzy text matching, typo tolerance, and fast regex indexing using 3-character n-grams?',
        qAr: 'أي امتداد في PostgreSQL يوفر مطابقة النصوص الضبابية ومقاومة الأخطاء الإملائية عبر المقاطع الثلاثية؟',
        options: ['pg_trgm (Trigram matching)', 'uuid-ossp', 'pgcrypto', 'hstore'],
        correct: 0,
        why: 'pg_trgm breaks text into 3-character slices to calculate similarity scores and accelerate ILIKE \'%pattern%\' via GIN/GiST indexes.',
        whyAr: 'امتداد pg_trgm يقسم النصوص لمقاطع ثلاثية لحساب نسب التشابه وتصحيح الأخطاء وتسريع استعلامات ILIKE.'
      },
      {
        q: 'What does the phrase search operator "<->" do in a tsquery (e.g. to_tsquery(\'english\', \'postgresql <-> performance\'))?',
        qAr: 'ما هي وظيفة مشغل البحث عن العبارات "<->" في استعلامات tsquery؟',
        options: [
          'Matches documents where the word "performance" immediately follows the word "postgresql" in adjacent order.',
          'Searches for words starting with "-" sign.',
          'Excludes both words from results.',
          'Calculates word length difference.'
        ],
        correct: 0,
        why: 'The phrase operator (<->) enforces word distance/adjacency, requiring words to appear consecutively in the text.',
        whyAr: 'يفرض التتابع المكاني الدقيق للكلمات ويشترط ظهور الكلمة الثانية مباشرة بعد الكلمة الأولى في النص.'
      },
      {
        q: 'What does the function "ts_rank(vector, query)" calculate in a search query?',
        qAr: 'ما الذي تحسبه دالة "ts_rank(vector, query)" في استعلام البحث؟',
        options: [
          'A relevance score based on frequency, weights (A, B, C), and proximity of matched query terms in the document.',
          'The number of characters in the title.',
          'The date the article was published.',
          'The author\'s user ID.'
        ],
        correct: 0,
        why: 'ts_rank computes a statistical relevance score to sort results so that the most relevant documents appear at the top.',
        whyAr: 'تحسب درجة التطابق والصلة الإحصائية بناءً على تكرار وأوزان وقرب الكلمات المطابقة لترتيب النتائج بالأكثر أهمية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: متى تكتفي بمحرك PostgreSQL Full-Text Search ومتى يصبح تنصيب Elasticsearch / Meilisearch قراراً هندسياً حتمياً؟',
    interviewA: 'نكتفي بـ PostgreSQL FTS في 90% من التطبيقات: عندما تكون البيانات حتى عشرات الملايين من السجلات، وتريد تجنب تعقيد مزامنة البيانات والـ Dual Writes ومشاكل الـ Eventual Consistency مع الحفاظ على أمان معاملات الـ ACID. نلجأ إلى Elasticsearch / OpenSearch حتمياً فقط عندما: 1. تتجاوز البيانات مئات التيرابايتات وتتطلب Sharded Distributed Search Clustered. 2. نحتاج لميزات معقدة مثل البحث الدلالي بالذكاء الاصطناعي (Vector Embeddings Hybrid Search)، أو الفلاتر التجميعية المعقدة لمليارات السجلات (Aggregations over Billions of Logs).'
  },
  {
    slug: 'pg-performance',
    title: 'PostgreSQL Performance Tuning: EXPLAIN ANALYZE, Memory Config & Connection Pooling',
    titleAr: 'تحسين أداء PostgreSQL: تشريح EXPLAIN ANALYZE، ضبط الذاكرة (shared_buffers) ومجمعات PgBouncer',
    level: 3,
    order: 14,
    estMinutes: 35,
    version: 'PostgreSQL 18 Performance',
    pattern: 'Query Optimization & Infrastructure Sizing',
    objectives: [
      'تشريح خطة تنفيذ الاستعلامات بـ EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS) وكشف تكاليف الـ Cost والمؤشرات الحقيقية.',
      'ضبط معايير الذاكرة الجوهرية في postgresql.conf: shared_buffers, work_mem, maintenance_work_mem, و effective_cache_size.',
      'حل معضلة استهلاك اتصالات الـ Backend (Process-per-connection) باستخدام مجمع الاتصالات الخفيف PgBouncer.',
      'تفعيل امتداد pg_stat_statements لاصطياد أبطأ وأكثر الاستعلامات استهلاكاً لموارد السيرفر في بيئة الإنتاج.'
    ],
    problemOpening: `
      في خوادم الإنتاج الكبرى، عندما يشتكي المستخدمون من بطء الموقع، يقوم المطور المبتدئ بمضاعفة حجم السيرفر (Upgrading Cloud Tier)، ليكتشف بعد يومين أن السيرفر عاد للبطء مجدداً وتضاعفت الفاتورة الشهرية!
      السبب هو أن الإعدادات الافتراضية لـ PostgreSQL في ملف <code dir="ltr">postgresql.conf</code> صُممت تاريخياً لتعمل على أجهزة قديمة جداً بـ 128MB RAM فقط!
      لو كان سيرفرك يمتلك 64GB RAM، فإن بوستجريس لن تستخدم افتراضياً سوى 128MB لذاكرة الـ <code dir="ltr">shared_buffers</code> وتترك باقي الـ RAM نائمة!
      بالإضافة إلى ذلك، كل اتصال جديد في PostgreSQL ينشئ عملية نظام تشغيل منفصلة (Forked OS Process) تستهلك ~10MB من الـ RAM؛ لو اتصل 1000 مستخدم في نفس اللحظة، سينهار الخادم فوراً باستهلاك الذاكرة.
      الحل المعماري هو:
      1. ضبط معايير الذاكرة الاحترافية (<code dir="ltr">shared_buffers = 25% RAM</code>, <code dir="ltr">work_mem</code>).
      2. وضع مجمع اتصالات فائق الخفة **PgBouncer** أمام قاعدة البيانات.
      3. تشخيص الاستعلامات بـ **EXPLAIN ANALYZE** وامتداد **pg_stat_statements**.
      في هذا الدرس الختامي لمسار PostgreSQL 18، هنتعلم إزاي نحول خادمك إلى آلة فائقة السرعة تتحمل ملايين العمليات.
    `,
    mechanics: [
      { step: '01', title: 'تشريح خطة التنفيذ بـ EXPLAIN (ANALYZE, BUFFERS)', desc: 'مقارنة التكلفة التقديرية (cost) بالزمن الفعلي (actual time) وعدد صفحات الذاكرة المقروءة من الكاش (Buffers: shared hit).' },
      { step: '02', title: 'ضبط ذاكرة التخزين المؤقت (shared_buffers)', desc: 'تخصيص 25% من إجمالي ذاكرة السيرفر لـ shared_buffers لتخزين الجداول والفهارس النشطة في الـ RAM.' },
      { step: '03', title: 'ضبط ذاكرة الفرز والعمليات (work_mem)', desc: 'تخصيص ذاكرة مخصصة لكل عملية فرز (Sort) أو دمج (Hash Join) لمنع تسريب العمليات إلى القرص الصلب (Spilling to Disk).' },
      { step: '04', title: 'تجميع الاتصالات المليوني بـ PgBouncer (Transaction Pooling)', desc: 'إدارة 10,000 اتصال من تطبيقات Node.js وتمريرها عبر 50 اتصالاً حقيقياً فقط لقاعدة البيانات بأعلى كفاءة.' },
      { step: '05', title: 'مراقبة الاستعلامات التراكمية بـ pg_stat_statements', desc: 'تسجيل وتجميع أزمنة تنفيذ جميع استعلامات النظام وتحديد الاستعلامات التي تستهلك أكثر من 80% من وقت المعالج.' }
    ],
    playgroundCode: `// محاكي حساب إعدادات الذاكرة المثالية لخادم PostgreSQL (pgtune simulation)
function calculatePgConf(totalRamGB, isWebBackend = true) {
  const sharedBuffersGB = totalRamGB * 0.25; // 25% of RAM
  const effectiveCacheGB = totalRamGB * 0.75; // 75% of RAM
  const workMemMB = Math.max(16, Math.floor((totalRamGB * 1024 * 0.25) / 100)); // لـ 100 اتصال متزامن

  return {
    "shared_buffers": \`\${sharedBuffersGB.toFixed(1)} GB\`,
    "effective_cache_size": \`\${effectiveCacheGB.toFixed(1)} GB\`,
    "work_mem": \`\${workMemMB} MB\`,
    "maintenance_work_mem": \`\${Math.min(2, totalRamGB * 0.05).toFixed(1)} GB\`,
    "max_connections": isWebBackend ? 100 : 20
  };
}

console.log("Calculated Production postgresql.conf for 32GB RAM Server:");
console.log(calculatePgConf(32));`,
    experimentQuestion: 'ماذا يعني مؤشر "Buffers: shared hit: 1200 read: 0" في تقرير EXPLAIN (ANALYZE, BUFFERS)؟',
    experimentAnswer: 'يعني أن جميع الـ 1200 صفحة من البيانات والفهارس المطلوبة لتنفيذ هذا الاستعلام تم العثور عليها وقراءتها مباشرة من ذاكرة الـ RAM (shared_buffers cache)، وأنه لم تكن هناك حاجة لقراءة أي بايت واحد من القرص الصلب (read: 0). هذه هي الحالة المثالية للاستعلامات فائقة السرعة ذات الأداء الصاروخي.',
    codeAnatomy: [
      { line: '-- تفعيل وتشخيص أبطأ 5 استعلامات عبر pg_stat_statements', note: 'أداة الرصد المركزية' },
      { line: 'CREATE EXTENSION IF NOT EXISTS pg_stat_statements;', note: 'تثبيت الامتداد' },
      { line: 'SELECT ', note: 'استعلام التحليل' },
      { line: '  query, calls,', note: 'نص الاستعلام وعدد مرات استدعائه' },
      { line: '  ROUND(total_exec_time::numeric, 2) as total_time_ms,', note: 'إجمالي الوقت المستهلك' },
      { line: '  ROUND(mean_exec_time::numeric, 2) as avg_time_ms,', note: 'متوسط زمن التنفيذ' },
      { line: '  ROUND((100 * total_exec_time / SUM(total_exec_time) OVER())::numeric, 2) as percentage', note: 'النسبة المئوية من إجمالي وقت السيرفر' },
      { line: 'FROM pg_stat_statements', note: 'جدول الإحصائيات' },
      { line: 'ORDER BY total_exec_time DESC', note: 'فرز بالأكثر استهلاكاً' },
      { line: 'LIMIT 5;', note: 'أعلى 5 اختناقات' }
    ],
    pitfallBad: `// خطأ شائع: فتح 1000 اتصال مباشر من خوادم Node.js بدون PgBouncer
// كل اتصال يستهلك 10MB RAM وتتنافس 1000 عملية على الـ CPU مما يؤدي لـ Context Switching وتجمد السيرفر!`,
    pitfallGood: `// الحل المعماري: استخدام PgBouncer في نمط Transaction Pooling
// 1000 اتصال من Node.js -> PgBouncer -> 30 اتصال فقط لـ PostgreSQL بأقصى سرعة`,
    pitfallDiagnosis: 'الخوادم تنهار بكثرة الاتصالات المباشرة، بينما PgBouncer يثبت عدد الاتصالات الفعلية ويوجه الطلبات عبر طابور فائق الكفاءة.',
    quizPool: [
      {
        q: 'What is the recommended baseline sizing for "shared_buffers" in a dedicated PostgreSQL production server?',
        qAr: 'ما هو الحجم الموصى به لمعيار "shared_buffers" في خادم PostgreSQL مخصص للإنتاج؟',
        options: [
          'Approximately 25% of total system RAM (e.g. 8GB on a 32GB RAM machine).',
          '100% of system RAM.',
          '128 Megabytes (default).',
          '5 Gigabytes always regardless of RAM.'
        ],
        correct: 0,
        why: 'PostgreSQL relies on both its internal shared_buffers (~25% RAM) and the OS Kernel Page Cache (~75% RAM) in tandem.',
        whyAr: 'تعتمد بوستجريس على تناغم ذاكرتها الداخلية shared_buffers (25%) مع كاش نظام التشغيل OS Page Cache (75%).'
      },
      {
        q: 'Why is PgBouncer essential when running microservices or serverless Node.js architectures against PostgreSQL?',
        qAr: 'لماذا يعتبر PgBouncer ضرورياً عند تشغيل خدمات Node.js أو Serverless مع PostgreSQL؟',
        options: [
          'PostgreSQL uses a heavy process-per-connection model; PgBouncer pools and multiplexes thousands of client connections into a small fixed set of server backends.',
          'PgBouncer encrypts hard drives.',
          'PgBouncer compiles SQL to WebAssembly.',
          'It replaces the PostgreSQL database.'
        ],
        correct: 0,
        why: 'PgBouncer prevents connection exhaustion and high RAM overhead by multiplexing dynamic client connections into a lean database connection pool.',
        whyAr: 'يمنع نفاد اتصالات السيرفر واستهلاك الذاكرة عبر تجميع آلاف الاتصالات العابرة وتمريرها عبر عدد ثابت ومحدود من الاتصالات الحقيقية.'
      },
      {
        q: 'What does "Sort Method: external merge Disk" indicate in an EXPLAIN ANALYZE report?',
        qAr: 'ماذا يشير مؤشر "Sort Method: external merge Disk" في تقرير EXPLAIN ANALYZE؟',
        options: [
          'The sort operation exceeded the allocated "work_mem" and had to spill temporary data to slow disk storage.',
          'The query was served from fast RAM cache.',
          'An optimal index sort occurred.',
          'A network error happened.'
        ],
        correct: 0,
        why: 'Spilling to disk means work_mem was too small to hold the dataset in memory during sorting, resulting in slow disk I/O.',
        whyAr: 'يعني أن حجم البيانات المراد فرزها تجاوز ذاكرة work_mem مما أجبر المحرك على الكتابة المؤقتة على القرص الصلب البطيء.'
      },
      {
        q: 'What does the extension "pg_stat_statements" track in PostgreSQL?',
        qAr: 'ما الذي يرصده امتداد "pg_stat_statements" في PostgreSQL؟',
        options: [
          'Aggregated runtime performance statistics (execution counts, total/mean duration, disk blocks read) across all executed SQL statements.',
          'Developer git commit history.',
          'User passwords.',
          'Internet bandwidth usage.'
        ],
        correct: 0,
        why: 'pg_stat_statements is the gold-standard diagnostics tool, tracking execution counts and cumulative latency per normalized SQL query.',
        whyAr: 'هو المعيار الذهبي لتشخيص الأداء، حيث يسجل عدد مرات استدعاء ومتوسط أزمنة واستهلاك الذاكرة لكل استعلام SQL في النظام.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحلل استعلاماً بطيئاً في الإنتاج باستخدام EXPLAIN (ANALYZE, BUFFERS) وتكتشف أين يضيع الوقت بالضبط؟',
    interviewA: '1. نفحص Actual Time في العقدة الجذرية لمعرفة إجمالي زمن التنفيذ بالمللي ثانية. 2. نبحث عن أي عقدة تحتوي على Seq Scan على جدول كبير أو Filter حذف نسبة ضخمة من الصفوف (Rows Removed by Filter)، مما يدل على غياب الفهرس. 3. نفحص Buffers: shared read مقارنة بـ shared hit لمعرفة هل الاستعلام يقرأ من القرص البطيء أم من كاش الذاكرة. 4. نفحص أسلوب الفرز Sort Method: إذا وجدنا external merge Disk، فهذا يعني أن work_mem غير كافية ويجب زيادتها لتتم العملية في الـ RAM فورياً (quicksort memory).'
  }
];
