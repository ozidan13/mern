/* ============================================================
   foundations-lessons.mjs — 12 New Lessons for Foundations Track
   ============================================================ */

export const foundationsLessons = [
  {
    slug: 'html-semantic',
    title: 'Semantic HTML, Document Outlines & Accessibility (a11y)',
    titleAr: 'الهيكل الدلالي للـ HTML ومعايير الوصول الشامل (a11y)',
    level: 1,
    order: 2,
    estMinutes: 20,
    version: 'HTML5 Living Standard',
    pattern: 'Semantic Architecture',
    problemOpening: `تخيل إنك بنيت موقع كامل عبارة عن <code dir="ltr">&lt;div&gt;</code> و <code dir="ltr">&lt;span&gt;</code> فقط بدون أي وسوم دلالية. المستخدم اللي بيشوف بعينه ممكن مياخدش باله، لكن محركات البحث (SEO) وقارئات الشاشة للمكفوفين (Screen Readers) هتشوف الموقع ككتلة عشوائية مجهولة المعالم! في الواقع العملي، الشركات بتخسر ملايين بسبب قضايا عدم التوافق مع معايير الوصول (WCAG)، وموقعك بيسقط في نتائج جوجل لأن محركات البحث مش فاهمة فين العنوان الرئيسي وفين المقال وفين القائمة الجانبية.`,
    objectives: [
      'التمييز الصارم بين العناصر الدلالية (Semantic) وغير الدلالية وتأثيرها على الـ Accessibility.',
      'بناء هيكل صفحة قياسي باستخدام header, nav, main, article, section, aside, و footer.',
      'تطبيق سمات ARIA و Landmark Roles لتحقيق توافق كامل مع معايير WCAG 2.1 AA.'
    ],
    mechanics: [
      { step: 1, title: 'تحديد المعالم الرئيسية (Landmark Roles)', desc: 'تقسيم الصفحة إلى مناطق رئيسية: nav للتنقل، main للمحتوى الفريد، و aside للمحتوى الجانبي.' },
      { step: 2, title: 'هيكلة المقالات والأقسام المستقلة', desc: 'استخدام article للوحدات القابلة لإعادة النشر و section لتقسيم الموضوع الواحد مع وجود عنوان h2-h6.' },
      { step: 3, title: 'إضافة البيانات الوصفية للمساعدات البصرية', desc: 'ربط الحقول بتسميات aria-label و alt للصور والأزرار الأيقونية.' }
    ],
    playgroundCode: `// Examine semantic structure validation
const pageStructure = {
  header: { hasNav: true, role: "banner" },
  main: { articlesCount: 3, role: "main" },
  footer: { copyright: "2026 CodeHub", role: "contentinfo" }
};

console.log("Validating Document Outline...");
console.log("Landmarks Defined:", Object.keys(pageStructure).join(", "));
console.log("Accessibility Score: 100/100 (Full WCAG 2.1 AA Compliance)");`,
    experimentQuestion: 'ماذا يحدث إذا وضعت أكثر من وسم <main> داخل نفس الصفحة بدون إخفاء الآخرين؟',
    experimentAnswer: 'وفقاً لمعيار W3C HTML5، الصفحة يجب أن تحتوي على وسم <main> مرئي واحد فقط يمثل المحتوى الفريد للصفحة؛ وجود أكثر من main مرئي يعتبر خطأ هيكلي يربك قارئات الشاشة ومحركات البحث.',
    codeAnatomy: [
      { line: '1: <main id="content" class="fsa-main" role="main">', note: 'تحديد منطقة المحتوى الفريد مع ID للتخطي السريع' },
      { line: '2:   <article aria-labelledby="post-title">', note: 'حاوية المقال المستقل المرتبط بعنوانه دلالياً' },
      { line: '3:     <h1 id="post-title">Building Accessible UIs</h1>', note: 'العنوان الرئيسي الوحيد H1 داخل المقال' },
      { line: '4:   </article>', note: 'إغلاق وسم المقال الدلالي' },
      { line: '5: </main>', note: 'إغلاق حاوية الـ main' }
    ],
    pitfallBad: '<div class="btn" onclick="submit()">Click Me</div>',
    pitfallGood: '<button type="button" class="btn" onclick="submit()">Click Me</button>',
    pitfallDiagnosis: 'استخدام div كزر يفقده إمكانية التركيز بلوحة المفاتيح (Tab) والتفعيل بـ Enter/Space وقراءة دوره للمكفوفين.',
    quizPool: [
      {
        q: 'Which HTML element should be used for standalone, distributable content like a blog post or comment?',
        qAr: 'ما هو الوسم الدلالي الأنسب للمحتوى المستقل القابل لإعادة التوزيع كالمقالات والتعليقات؟',
        options: ['<section>', '<article>', '<aside>', '<div>'],
        correct: 1,
        why: '<article> represents a self-contained composition in a document, page, application, or site.',
        whyAr: 'وسم <article> يمثل وحدة محتوى قائمة بذاتها يمكن إعادة نشرها أو توزيعها بشكل منفصل.'
      }
    ],
    interviewQ: 'ما هو الفرق الدلالي بين <section> و <article> ومتى تختار كلاً منهما؟',
    interviewA: 'الـ <article> يمثل محتوى مستقلاً بذاته تماماً لو انتزعته من الصفحة يظل مفهوماً (مثل مقال أو تغريدة أو بطاقة منتج). بينما الـ <section> يمثل تقسيماً موضوعياً داخل سياق أكبر ويتطلب عادةً وجود عنوان (h2-h6) يوضح موضوعه.'
  },
  {
    slug: 'css-box-model',
    title: 'CSS Box Model, Flexbox Axis & Modern CSS Grid',
    titleAr: 'نموذج الصندوق في CSS ومحاور Flexbox وشبكات Grid الحديثة',
    level: 1,
    order: 3,
    estMinutes: 22,
    version: 'CSS3 / CSS Grid Level 2',
    pattern: 'Layout Engine',
    problemOpening: `كتير من المطورين لما بيتعلموا CSS بيقضوا ساعات يضربوا في الـ padding والـ margin وتلاقي العنصر فجأة نزل في سطر جديد أو الشاشة ظهر فيها سكرول أفقي كارثي! السبب الجذري هو عدم فهم كيفية حساب الأبعاد في نموذج الصندوق (Box Model) والفرق بين <code dir="ltr">content-box</code> و <code dir="ltr">border-box</code>. بالإضافة للاعتماد على حلول قديمة زي <code dir="ltr">float</code> بدل محاور Flexbox الذكية وشبكات CSS Grid ثنائية الأبعاد.`,
    objectives: [
      'فهم حسابات الأبعاد الحقيقية في Content-Box مقابل Border-Box.',
      'إتقان محاور Flexbox (Main Axis vs Cross Axis) والتوزيع الديناميكي.',
      'بناء تخطيطات معقدة ثنائية الأبعاد باستخدام CSS Grid و minmax() و auto-fit.'
    ],
    mechanics: [
      { step: 1, title: 'طبقات الـ Box Model الأربعة', desc: 'المحتوى الداخلي (Content) &larr; الحشو الداخلي (Padding) &larr; الإطار (Border) &larr; الهامش الخارجي (Margin).' },
      { step: 2, title: 'ضبط البنية عبر border-box', desc: 'إجبار المتصفح على تضمين الـ padding والـ border داخل العرض الكلي (width).' },
      { step: 3, title: 'التوزيع عبر Flexbox و Grid', desc: 'استخدام Flexbox للعلاقات أحادية البعد (1D) و Grid للعلاقات ثنائية البعد (2D صفوف وأعمدة).' }
    ],
    playgroundCode: `// Calculating Total Element Width
function calculateBoxWidth(width, padding, border, margin, boxSizing) {
  if (boxSizing === 'border-box') {
    return width + (margin * 2);
  }
  return width + (padding * 2) + (border * 2) + (margin * 2);
}

const contentBoxWidth = calculateBoxWidth(300, 20, 2, 10, 'content-box');
const borderBoxWidth = calculateBoxWidth(300, 20, 2, 10, 'border-box');

console.log("Content-Box Total Rendered Width:", contentBoxWidth + "px"); // 364px
console.log("Border-Box Total Rendered Width:", borderBoxWidth + "px");   // 320px`,
    experimentQuestion: 'ماذا يحدث إذا وضعت gap: 20px داخل حاوية Flexbox في المتصفحات الحديثة؟',
    experimentAnswer: 'خاصية gap تعمل الآن بشكل أصلي داخل Flexbox تماماً كما في CSS Grid، وتضيف مسافات متساوية بين العناصر الفرعية دون الحاجة للـ margins السلبية أو فئات :last-child.',
    codeAnatomy: [
      { line: '1: *, *::before, *::after {', note: 'استهداف جميع العناصر ومولدات المحتوى' },
      { line: '2:   box-sizing: border-box;', note: 'ضمان أن الـ width يشمل الـ padding والـ border' },
      { line: '3:   margin: 0;', note: 'تصفير الهوامش الافتراضية للمتصفح' },
      { line: '4: }', note: 'إغلاق القاعدة العامة' }
    ],
    pitfallBad: '.container { display: flex; } .item { width: 50%; margin: 10px; } /* يسبب انكسار السطر */',
    pitfallGood: '.container { display: flex; gap: 20px; } .item { flex: 1; } /* توزيع مرن دقيق */',
    pitfallDiagnosis: 'الجمع بين العرض النسبي 50% والهوامش الثابتة بدون calc يفيض عن عرض الحاوية ويكسر التخطيط.',
    quizPool: [
      {
        q: 'With `box-sizing: border-box`, an element with `width: 200px`, `padding: 20px`, and `border: 2px` will have what total rendered width (excluding margin)?',
        qAr: 'في نمط border-box، عنصر عرضه 200px وحشوه 20px وإطاره 2px، ما هو عرضه الإجمالي الفعلي على الشاشة بدون الهامش؟',
        options: ['244px', '200px', '222px', '180px'],
        correct: 1,
        why: 'In border-box, padding and border are absorbed inside the specified 200px width.',
        whyAr: 'في نمط border-box، يتم امتصاص الـ padding والـ border داخل العرض المحدد (200px).'
      }
    ],
    interviewQ: 'متى تفضل استخدام CSS Grid ومتى تختار Flexbox في بناء واجهات الإنتاج؟',
    interviewA: 'نستخدم Flexbox عندما يكون التخطيط أحادي البعد (1D) سواء صف أو عمود ويكون المحتوى هو الحاكم لمساحة العنصر (Content-First). ونستخدم CSS Grid عندما يكون التخطيط ثنائي الأبعاد (2D صفوف وأعمدة متقاطعة) وتكون الشبكة هي الحاكمة لمواقع العناصر (Layout-First).'
  },
  {
    slug: 'js-types-operators',
    title: 'Primitive Types, Type Coercion & Symbols/BigInt',
    titleAr: 'أنواع البيانات الأولية، فخاخ التحويل التلقائي (Coercion) والرموز',
    level: 1,
    order: 4,
    estMinutes: 24,
    version: 'ECMAScript 2024',
    pattern: 'Type Safety & Core Engine',
    problemOpening: `جافاسكربت لغة ذات كتابة نوعية ديناميكية (Dynamically Typed)، وده بيديها مرونة جبارة لكنه في نفس الوقت أكبر مصدر للكوارث البرمجية لو مش فاهم إزاي محرك V8 بيحول الأنواع تلقائياً (Implicit Coercion). حاجات زي <code dir="ltr">[] + {}</code> أو مقارنة <code dir="ltr">0 == false</code> ممكن توقع نظام دفع إلكتروني كامل بسبب مقارنة غير دقيقة. في هذا الدرس هنفكك الأنواع السبعة الأولية وأسرار الـ Memory Allocation الخاصة بها.`,
    objectives: [
      'إتقان الأنواع السبعة الأولية: string, number, bigint, boolean, undefined, symbol, null.',
      'فهم قواعد التحويل الضمني (Coercion Algorithms: ToPrimitive, ToString, ToNumber).',
      'تجنب ثغرات المقارنة الرخوة (==) والاعتماد الكامل على المساواة الصارمة (===).'
    ],
    mechanics: [
      { step: 1, title: 'الذاكرة والقيم الأولية (Stack vs Heap)', desc: 'القيم الأولية تُخزن بالكامل بالـ Stack بالقيمة (By Value) بينما الكائنات تُخزن بالمرجع (By Reference) في الـ Heap.' },
      { step: 2, title: 'خوارزمية التحويل التلقائي', desc: 'محرك V8 يستدعي valueOf ثم toString عند الحاجة لتحويل الكائنات إلى قيم أولية.' },
      { step: 3, title: 'الأنواع الحديثة (BigInt & Symbol)', desc: 'BigInt للتعامل مع الأرقام بعد 2^53-1 و Symbol لإنشاء مفاتيح كائنات فريدة وغير قابلة للتصادم.' }
    ],
    playgroundCode: `// Coercion Quirks Visualizer
console.log("1. '5' - 2 =", '5' - 2, "(String coerced to Number)");
console.log("2. '5' + 2 =", '5' + 2, "(Number coerced to String)");
console.log("3. Boolean([]) =", Boolean([]), "(Arrays are truthy objects)");
console.log("4. null == undefined:", null == undefined);
console.log("5. null === undefined:", null === undefined);

// BigInt Precision Guarantee
const maxSafe = Number.MAX_SAFE_INTEGER;
console.log("Max Safe Int + 2 (Broken):", maxSafe + 2);
console.log("BigInt Precision (Safe):", BigInt(maxSafe) + 2n);`,
    experimentQuestion: 'ما هي نتيجة typeof null في جافاسكربت ولماذا؟',
    experimentAnswer: 'نتيجة typeof null هي "object". هذا خطأ تاريخي شهير في تصميم لغة JS الأولى عام 1995 بسبب تمثيل القيم في الذاكرة بنظام 32-bit وكان مؤشر الكائنات يبدأ بـ 000 وهو نفس تمثيل null، وظل كما هو للتوافق العكسي.',
    codeAnatomy: [
      { line: '1: const idKey = Symbol("user_id");', note: 'إنشاء رمز فريد لا يتكرر أبداً في الذاكرة' },
      { line: '2: const user = { [idKey]: 4091 };', note: 'استخدام الرمز كمفتاح خاص لا يظهر في حلقات for..in' },
      { line: '3: console.log(user[idKey]); // 4091', note: 'الوصول للقيمة عبر نفس الرمز فقط' }
    ],
    pitfallBad: 'if (userId == false) { /* ثغرة أمنية إذا كان userId هو 0 */ }',
    pitfallGood: 'if (userId === false) { /* فحص دقيق للنوع والقيمة معاً */ }',
    pitfallDiagnosis: 'المقارنة الرخوة == تعتبر 0 مساوياً لـ false مما يسبب أخطاء منطقية قاتلة عند التعامل مع معرفات أو كميات رقمية.',
    quizPool: [
      {
        q: 'What is the evaluation of `[] + []` in JavaScript?',
        qAr: 'ما هي نتيجة تقييم `[] + []` في جافاسكربت؟',
        options: ['"" (Empty String)', '[]', 'undefined', 'NaN'],
        correct: 0,
        why: 'The plus operator converts both arrays to primitives via toString(), producing two empty strings joined as "".',
        whyAr: 'المعامل + يحول المصفوفتين إلى نصوص أولية عبر toString() فتصبح سلسلتين فارغتين مدموجتين "".'
      }
    ],
    interviewQ: 'ما هو الفرق الدقيق بين null و undefined في إدارة الذاكرة والتطوير العملي؟',
    interviewA: 'الـ undefined تعني أن المتغير تم الإعلان عنه وحجز مكان له في الذاكرة لكن لم تُسند له أي قيمة بعد (الحالة الافتراضية للمحرك). بينما null هي قيمة مقصودة يُسندها المبرمج عمداً ليعبر عن "غياب متعمد للقيمة أو الكائن".'
  },
  {
    slug: 'js-control-flow',
    title: 'Control Flow, Iteration Protocols & Labeled Statements',
    titleAr: 'التحكم في مسار التنفيذ، بروتوكولات التكرار والحلقات المعنونة',
    level: 1,
    order: 5,
    estMinutes: 20,
    version: 'Modern JS ES2024',
    pattern: 'Control Flow & Logic',
    problemOpening: `في معالجة البيانات المعقدة والمصفوفات الضخمة، كتابة حلقات تكرار متداخلة بدون التحكم الدقيق في مسار التنفيذ قد تسبب استنزافاً هائلاً للمعالج (CPU Spikes) أو تسريباً في الذاكرة. استخدامك لـ <code dir="ltr">for..in</code> على المصفوفات بدلاً من <code dir="ltr">for..of</code> قد يجلب خصائص غير مرغوبة من شجرة الـ Prototype، وعدم معرفتك بالحلقات المعنونة (Labeled Breaks) يجبرك على كتابة أعلام (flags) معقدة للخروج من الحلقات المتداخلة.`,
    objectives: [
      'التمييز الصارم بين for, for..in, for..of, و forEach من حيث الأداء وبروتوكول التكرار.',
      'إتقان استخدام Labeled Statements للخروج النظيف من الحلقات التكرارية المتداخلة.',
      'تطبيق نمط Guard Clauses والـ Early Returns لمنع تعشيش الشروط (Nested If Hell).'
    ],
    mechanics: [
      { step: 1, title: 'بروتوكول التكرار (Iterable Protocol)', desc: 'الكائنات التي تمتلك خاصية [Symbol.iterator] فقط هي القابلة للتكرار عبر for..of.' },
      { step: 2, title: 'القفز المعنون (Labeled Break/Continue)', desc: 'تسمية الحلقات الخارجية للقفز المباشر منها بدون متغيرات حالة وسيطة.' },
      { step: 3, title: 'حراس التنفيذ (Guard Clauses)', desc: 'فحص شروط الفشل في بداية الدالة والخروج فوراً لتقليل عمق التداخل.' }
    ],
    playgroundCode: `// Labeled Loops in Matrix Search
const matrix = [
  [1, 2, 3],
  [4, 99, 6],
  [7, 8, 9]
];

let targetFound = false;

searchMatrix: for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(\`Checking cell [\${row}][\${col}] = \${matrix[row][col]}\`);
    if (matrix[row][col] === 99) {
      console.log("🎯 Target 99 found! Breaking out of all loops immediately.");
      targetFound = true;
      break searchMatrix; // Exits outer loop directly!
    }
  }
}`,
    experimentQuestion: 'لماذا يحظر استخدام for..in للمرور على عناصر المصفوفات العادية؟',
    experimentAnswer: 'لأن for..in مخصصة للمرور على مفاتيح الكائنات القابلة للتعداد (Enumerable Properties)، وهي لا تضمن ترتيب الفهارس، وتجلب الخصائص المضافة للـ Prototype كسلاسل نصية بدلاً من أرقام.',
    codeAnatomy: [
      { line: '1: outerLoop: for (let i = 0; i < 5; i++) {', note: 'تعريف عنوان الحلقة الخارجية outerLoop' },
      { line: '2:   for (let j = 0; j < 5; j++) {', note: 'الحلقة الداخلية' },
      { line: '3:     if (i * j > 6) break outerLoop;', note: 'الخروج التام من الحلقتين معاً فور تحقق الشرط' },
      { line: '4:   }', note: 'إغلاق الحلقة الداخلية' },
      { line: '5: }', note: 'إغلاق الحلقة الخارجية' }
    ],
    pitfallBad: 'function process(user) { if (user) { if (user.isActive) { if (user.hasAccess) { doWork(); } } } }',
    pitfallGood: 'function process(user) { if (!user || !user.isActive || !user.hasAccess) return; doWork(); }',
    pitfallDiagnosis: 'التعشيش العميق للشروط (Arrow Code Antipattern) يصعب قراءته واختباره وصيانته، وحله بالـ Early Return.',
    quizPool: [
      {
        q: 'Which statement immediately stops the current iteration of a loop and moves to the next iteration?',
        qAr: 'ما هو الأمر الذي يوقف اللفة الحالية في الحلقة التكرارية فوراً وينتقل إلى اللفة التالية مباشرة؟',
        options: ['break', 'continue', 'return', 'yield'],
        correct: 1,
        why: 'The continue statement terminates execution of the statements in the current iteration and continues to the next.',
        whyAr: 'الأمر continue يوقف تنفيذ أوامر اللفة الحالية وينتقل فوراً للفة التالية.'
      }
    ],
    interviewQ: 'كيف يعمل بروتوكول الـ Iterable والـ Iterator داخلياً في جافاسكربت؟',
    interviewA: 'أي كائن يعتبر Iterable إذا احتوى على دالة تحت المفتاح `[Symbol.iterator]()` تُرجع كائن Iterator. هذا الكائن يحتوي على دالة `next()` تُرجع في كل استدعاء كائناً بالشكل `{ value: any, done: boolean }` حتى تنتهي العناصر عندما تكون `done: true`.'
  },
  {
    slug: 'js-functions',
    title: 'Functions, Arrow Mechanics, Rest/Spread & Currying',
    titleAr: 'الدوال البرمجية، كواليس الدوال السهمية، المعاملات المتبقية والـ Currying',
    level: 1,
    order: 6,
    estMinutes: 25,
    version: 'ES2024 Standard',
    pattern: 'Functional Mechanics',
    problemOpening: `في جافاسكربت، الدوال هي "مواطنون من الدرجة الأولى" (First-Class Citizens)، يعني تقدر تمررها كمعاملات، وتخزنها في متغيرات، وترجعها من دوال تانية. لكن الخلط بين إعلان الدالة العادي (<code dir="ltr">function</code>) والدالة السهمية (<code dir="ltr">=&gt;</code>) في ربط كلمة <code dir="ltr">this</code> وكائن <code dir="ltr">arguments</code> هو السبب الرئيسي لتعطل الـ Event Handlers ومكونات ريآكت الكلاسيكية.`,
    objectives: [
      'فهم الفرق الجذري في ربط this المعجمي (Lexical This) في الدوال السهمية مقابل الديناميكي.',
      'إتقان معاملات Rest (...) والـ Spread Operator في استنساخ البيانات وتمريرها.',
      'تطبيق تقنية الـ Currying و Higher-Order Functions لإنشاء دوال قابلة لإعادة التركيب.'
    ],
    mechanics: [
      { step: 1, title: 'سياق التنفيذ وربط This', desc: 'الدالة العادية تحدد this بناءً على كيفية استدعائها وقت التشغيل (Dynamic Binding)، بينما السهمية ترث this من مكان كتابتها في الكود (Lexical Binding).' },
      { step: 2, title: 'الدوال النقية (Pure Functions)', desc: 'دالة تعطي دائماً نفس المخرجات لنفس المدخلات ولا تحدث أي آثار جانبية (Side Effects) خارج نطاقها.' },
      { step: 3, title: 'تقنية الـ Currying', desc: 'تحويل دالة تستقبل عدة معاملات f(a,b,c) إلى سلسلة دوال تستقبل معاملاً واحداً في كل مرة f(a)(b)(c).' }
    ],
    playgroundCode: `// Function Currying & Pipeline
const multiply = (a) => (b) => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log("Double 10:", double(10)); // 20
console.log("Triple 10:", triple(10)); // 30

// Lexical This Demonstration
const team = {
  name: "CodeHub Engineers",
  members: ["Amr", "Sara", "Karim"],
  printMembers() {
    this.members.forEach(member => {
      // Arrow function captures 'this' from printMembers
      console.log(\`\${member} is part of \${this.name}\`);
    });
  }
};

team.printMembers();`,
    experimentQuestion: 'هل تمتلك الدوال السهمية (Arrow Functions) كائن arguments خاص بها؟',
    experimentAnswer: 'لا، الدوال السهمية لا تمتلك كائن arguments خاص بها ولا تمتلك prototype؛ إذا حاولت الوصول لـ arguments داخل دالة سهمية فستأخذها من النطاق الأبوي الأقرب (Lexical Scope)، ولجمع المعاملات نستخدم Rest Parameters (...args).',
    codeAnatomy: [
      { line: '1: const createLogger = (prefix) => (message) => {', note: 'دالة Curried تستقبل البادئة وتُرجع دالة الرسائل' },
      { line: '2:   console.log(`[${prefix}] ${message}`);', note: 'طباعة الرسالة مع البادئة المغلقة في الـ Closure' },
      { line: '3: };', note: 'نهاية تعريف الدالة السهمية' }
    ],
    pitfallBad: 'const obj = { count: 0, inc: () => { this.count++; } }; /* this تشير للـ Window/Global! */',
    pitfallGood: 'const obj = { count: 0, inc() { this.count++; } }; /* this تشير لـ obj بنجاح */',
    pitfallDiagnosis: 'استخدام دالة سهمية كـ method داخل كائن يجعل this ترتبط بالنطاق الخارجي وليس بالكائن نفسه.',
    quizPool: [
      {
        q: 'Which of the following is NOT a feature of Arrow Functions?',
        qAr: 'أي مما يلي ليس من خصائص الدوال السهمية (Arrow Functions)؟',
        options: ['Lexical this binding', 'Can be used as constructors with new', 'No own arguments object', 'Implicit return for single expressions'],
        correct: 1,
        why: 'Arrow functions do not have a [[Construct]] internal method and cannot be called with new.',
        whyAr: 'الدوال السهمية لا تحتوي على طريقة البناء الداخلية ولا يمكن استدعاؤها باستخدام new كـ Constructor.'
      }
    ],
    interviewQ: 'ما هي الـ Higher-Order Function وكيف تُستخدم في تصميم البرمجيات؟',
    interviewA: 'هي دالة تستقبل دالة أخرى كمعامل (Callback) أو تُرجع دالة جديدة كمخرج (أو كلاهما). أشهر الأمثلة هي دوال المصفوفات (map, filter, reduce) و middleware في Express و HOCs في React.'
  },
  {
    slug: 'js-arrays-methods',
    title: 'Array Pipeline: Map, Filter, Reduce, FlatMap & Performance',
    titleAr: 'خط أنابيب المصفوفات: Map, Filter, Reduce والتحسين الأدائي',
    level: 1,
    order: 7,
    estMinutes: 24,
    version: 'ES2024 Standard',
    pattern: 'Data Transformations',
    problemOpening: `معالجة مصفوفات البيانات الكبيرة (آلاف أو ملايين السجلات) تتطلب فهماً عميقاً للفرق بين الدوال التي تعدل المصفوفة الأصلية (Mutating Methods زي <code dir="ltr">splice</code>, <code dir="ltr">sort</code>, <code dir="ltr">push</code>) والدوال النقية غير المعدلة (Non-mutating زي <code dir="ltr">map</code>, <code dir="ltr">filter</code>, <code dir="ltr">toSorted</code>). تسلسل استدعاء <code dir="ltr">.filter().map().filter()</code> ينشئ مصفوفات مؤقتة وسيطة في الذاكرة تهلك الـ Garbage Collector، وفي هذا الدرس سنتعلم كيف ندمجها في خط أنابيب <code dir="ltr">reduce</code> ذري فائق السرعة.`,
    objectives: [
      'إتقان دوال التحويل الوظيفية: map, filter, reduce, flatMap, find, some, every.',
      'التمييز الصارم بين الدوال المعدلة (In-Place Mutators) والدوال النقية في إدارة الحالة (Immutability).',
      'تحسين أداء معالجة المصفوفات الضخمة وتجنب إنشاء كائنات وسيطة في الـ Heap.'
    ],
    mechanics: [
      { step: 1, title: 'التحويل بدون تعديل الأصل (Immutability)', desc: 'دوال map و filter تنشئ مصفوفة جديدة تماماً وتترك المصفوفة الأصلية نظيفة دون مساس.' },
      { step: 2, title: 'قوة المحرك الشامل reduce', desc: 'تجميع مصفوفة كاملة في كائن أو رقم أو خريطة في ممر مسح واحد (Single Pass O(n)).' },
      { step: 3, title: 'دوال ES2023 الآمنة (toSorted, toReversed)', desc: 'استخدام النسخ الآمنة الحديثة التي تضمن عدم تعديل المصفوفة الأصلية.' }
    ],
    playgroundCode: `// E-Commerce Data Pipeline
const orders = [
  { id: 1, user: "Amr", total: 250, status: "completed" },
  { id: 2, user: "Sara", total: 400, status: "pending" },
  { id: 3, user: "Amr", total: 150, status: "completed" },
  { id: 4, user: "Omar", total: 300, status: "completed" }
];

// Single-Pass Reduce Pipeline
const userRevenue = orders.reduce((acc, order) => {
  if (order.status === 'completed') {
    acc[order.user] = (acc[order.user] || 0) + order.total;
  }
  return acc;
}, {});

console.log("Total Completed Revenue Per User:", JSON.stringify(userRevenue, null, 2));`,
    experimentQuestion: 'ما هو الفرق بين Array.prototype.map() و Array.prototype.flatMap()؟',
    experimentAnswer: 'الدالة flatMap تطبق دالة التحويل على كل عنصر ثم تسطح النتيجة (Flatten) بمقدار مستوى واحد (depth: 1)، وهي مكافئة لـ .map().flat() ولكنها أكثر كفاءة وسرعة ولا تنشئ مصفوفة وسيطة.',
    codeAnatomy: [
      { line: '1: const sum = items.reduce((acc, curr) => {', note: 'بدء دالة التجميع مع المجمع acc والعنصر الحالي curr' },
      { line: '2:   return acc + curr.price;', note: 'إضافة السعر التراكمي' },
      { line: '3: }, 0);', note: 'تحديد القيمة الابتدائية 0 للمجمع (إجباري لتجنب الأخطاء)' }
    ],
    pitfallBad: 'const sorted = users.sort(); /* تعدل مصفوفة users الأصلية وتسبب bugs في React! */',
    pitfallGood: 'const sorted = [...users].sort(); /* أو users.toSorted() في المتصفحات الحديثة */',
    pitfallDiagnosis: 'دالة sort() الكلاسيكية تعدل المصفوفة في مكانها (In-Place Mutation)، مما يكسر مبدأ الـ Immutability في React و Redux.',
    quizPool: [
      {
        q: 'Which array method tests whether at least one element in the array passes the provided condition?',
        qAr: 'أي من دوال المصفوفات تفحص ما إذا كان عنصر واحد على الأقل يطابق الشرط المحدد؟',
        options: ['every()', 'some()', 'find()', 'filter()'],
        correct: 1,
        why: 'some() returns true if it finds an element for which the provided function returns true; otherwise it returns false.',
        whyAr: 'الدالة some() تُرجع true بمجرد أن تجد عنصراً واحداً يحقق الشرط المطلوب وتتوقف فوراً.'
      }
    ],
    interviewQ: 'كيف تنفذ دالة Array.prototype.reduce مخصصة من الصفر (Polyfill)؟',
    interviewA: 'نمر بحلقة تكرار على عناصر المصفوفة؛ إذا تم تمرير initialValue نبدأ بها ونبدأ الحلقة من الفهرس 0، وإذا لم تُمرر نأخذ أول عنصر كمجمع ونبدأ الحلقة من الفهرس 1، وفي كل لفة نستدعي الـ callback ونخزن النتيجة في المجمع ثم نرجعه في النهاية.'
  },
  {
    slug: 'js-objects-prototypes',
    title: 'Objects, Prototypes, Descriptors & Property Shadowing',
    titleAr: 'الكائنات البرمجية، الـ Prototypes وواصفات الخصائص في V8',
    level: 1,
    order: 8,
    estMinutes: 26,
    version: 'V8 Engine Standard',
    pattern: 'Object-Oriented Core',
    problemOpening: `كل شيء تقريباً في جافاسكربت هو كائن (Object) مرتبط بسلسلة وراثة ممتدة تُسمى <code dir="ltr">Prototype Chain</code>. عدم فهمك لكيفية عمل الـ Prototype يعني أنك قد تنشئ آلاف النسخ من الدوال في الذاكرة لكل كائن بدلاً من مشاركتها عبر الـ Prototype، أو تفاجأ بخاصية تم تعديلها في كائن أثرت على كل الكائنات في النظام بسبب التعديل المباشر على <code dir="ltr">Object.prototype</code> (Prototype Pollution).`,
    objectives: [
      'فهم سلسلة الوراثة Prototype Chain وكيف يبحث محرك V8 عن الخصائص.',
      'التحكم في واصفات الخصائص عبر Object.defineProperty (writable, enumerable, configurable).',
      'حماية الكائنات من التعديل عبر Object.freeze() و Object.seal().'
    ],
    mechanics: [
      { step: 1, title: 'الرابط السري __proto__ والـ Prototype', desc: 'كل كائن يمتلك مؤشراً داخلياً [[Prototype]] يشير إلى الكائن الأب الذي يرث منه الخصائص والدوال.' },
      { step: 2, title: 'حجب الخصائص (Property Shadowing)', desc: 'عند إضافة خاصية بنفس اسم خاصية في الـ Prototype، يتم قراءتها من الكائن نفسه وحجب النسخة الأبوية.' },
      { step: 3, title: 'التجميد والختم (Freeze & Seal)', desc: 'Object.freeze يمنع إضافة أو حذف أو تعديل الخصائص نهائياً ويجعل الكائن Immutable.' }
    ],
    playgroundCode: `// Prototype Inheritance Pipeline
function User(name, role) {
  this.name = name;
  this.role = role;
}

// Method shared on Prototype (O(1) memory for all instances)
User.prototype.getBadge = function() {
  return \`[\${this.role.toUpperCase()}] \${this.name}\`;
};

const user1 = new User("Amr", "admin");
const user2 = new User("Sara", "developer");

console.log(user1.getBadge());
console.log(user2.getBadge());
console.log("Are methods strictly equal?", user1.getBadge === user2.getBadge); // true!`,
    experimentQuestion: 'ماذا يحدث إذا حاولت تعديل خاصية في كائن تم تجميده باستخدام Object.freeze() في Strict Mode؟',
    experimentAnswer: 'في نمط Strict Mode ("use strict")، محاولة تعديل أو إضافة أي خاصية لكائن مجمد ستُلقي استثناءً فورياً من نوع TypeError: Cannot assign to read only property.',
    codeAnatomy: [
      { line: '1: Object.defineProperty(user, "id", {', note: 'تعريف خاصية مع واصفات تحكم مخصصة' },
      { line: '2:   value: 101,', note: 'القيمة الثابتة' },
      { line: '3:   writable: false,', note: 'منع تغيير القيمة نهائياً (Read-Only)' },
      { line: '4:   enumerable: true', note: 'السماح بظهور الخاصية في الـ Loops و Object.keys' },
      { line: '5: });', note: 'تطبيق الواصفات' }
    ],
    pitfallBad: 'for (let key in obj) { console.log(key); } /* يطبع خصائص موروثة من الـ Prototype! */',
    pitfallGood: 'for (let key of Object.keys(obj)) { console.log(key); } /* يطبع خصائص الكائن الخاصة فقط */',
    pitfallDiagnosis: 'حلقة for..in تمر على جميع الخصائص في سلسلة الـ Prototype ما لم يتم فحصها بـ Object.hasOwn(obj, key).',
    quizPool: [
      {
        q: 'Where does the Prototype Chain end in JavaScript?',
        qAr: 'أين تنتهي سلسلة الـ Prototype Chain في جافاسكربت؟',
        options: ['Object.prototype', 'null', 'undefined', 'Function.prototype'],
        correct: 1,
        why: 'Object.prototype.__proto__ points directly to null, which is the terminal point of the prototype chain.',
        whyAr: 'نهاية سلسلة الوراثة هي null، حيث يشير Object.prototype.__proto__ مباشرة إلى null.'
      }
    ],
    interviewQ: 'ما هي ثغرة Prototype Pollution وكيف تحمي تطبيقات Node.js منها؟',
    interviewA: 'هي ثغرة تحدث عندما يتم دمج كائنات غير مفحوصة (Unsanitized JSON Merge) قادمة من المستخدم تحتوي على مفاتيح مثل `__proto__` أو `constructor.prototype`، مما يسمح للمخترق بتعديل سلوك كل كائنات التطبيق. الحماية تكون بتطهير المدخلات واستخدام `Object.create(null)` أو تجميد الـ Prototypes.'
  },
  {
    slug: 'js-classes-oop',
    title: 'ES6 Classes, Private Fields (#), Inheritance & Static Methods',
    titleAr: 'الفئات الكلاسيكية في ES6، الحقول الخاصة (#) والوراثة في V8',
    level: 1,
    order: 9,
    estMinutes: 22,
    version: 'ES2024 Standard',
    pattern: 'Object-Oriented Programming',
    problemOpening: `فئات ES6 Classes في جافاسكربت هي في الأساس "سكر تركيبي" (Syntactic Sugar) فوق نموذج الـ Prototypes، لكنها أضافت معايير هندسية صارمة زي الحقول والأساليب الخاصة الحقيقية المنفذة على مستوى المحرك (<code dir="ltr">#privateField</code>) والدوال الساكنة (<code dir="ltr">static</code>) وكتل التهيئة الساكنة. محاولة الوصول للحقول الخاصة من خارج الفئة تفشل على مستوى المحرك، مما يوفر كبسلة (Encapsulation) حقيقية 100%.`,
    objectives: [
      'فهم كيفية تحويل ES6 Classes داخلياً إلى Prototype Functions.',
      'تطبيق الكبسلة الحقيقية باستخدام Private Fields و Methods (#).',
      'إتقان الوراثة عبر extends و super() والخصائص الساكنة (Static).'
    ],
    mechanics: [
      { step: 1, title: 'دالة البناء constructor واستدعاء super()', desc: 'عند وراثة فئة، يجب استدعاء super() أولاً قبل لمس this لحجز مثيل الفئة الأب.' },
      { step: 2, title: 'الحقول الخاصة الحقيقية (#)', desc: 'الحقول التي تبدأ بعلامة # غير قابلة للوصول من خارج الفئة حتى عبر Object.keys أو reflection.' },
      { step: 3, title: 'الخصائص الساكنة (Static Properties)', desc: 'خصائص ترتبط بالفئة نفسها كـ Blueprint ولا تتكرر في النسخ المُنشأة (Instances).' }
    ],
    playgroundCode: `// Production BankAccount with Hard Private Fields
class BankAccount {
  #balance = 0; // Truly private field in V8 engine

  constructor(owner, initialDeposit) {
    this.owner = owner;
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid deposit amount");
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return \`Balance: $\${this.#balance}\`;
  }
}

const account = new BankAccount("Amr", 500);
account.deposit(250);
console.log(account.getBalance()); // Balance: $750

// Attempting to read private field directly:
try {
  console.log(account.#balance);
} catch (err) {
  console.log("🔒 Security Guard: Private field '#balance' is not accessible outside class!");
}`,
    experimentQuestion: 'ماذا يحدث إذا حاولت استدعاء this قبل super() داخل constructor فئة فرعية؟',
    experimentAnswer: 'محرك V8 سيلقي خطأ فورياً من نوع ReferenceError: Must call super constructor in derived class before accessing \'this\'.',
    codeAnatomy: [
      { line: '1: class AdminUser extends User {', note: 'وراثة فئة AdminUser من فئة User الأساسية' },
      { line: '2:   #permissions = [];', note: 'حقل خاص مشفر على مستوى المحرك' },
      { line: '3:   constructor(name, perms) {', note: 'دالة البناء' },
      { line: '4:     super(name);', note: 'تهيئة الفئة الأب أولاً (إجباري)' },
      { line: '5:     this.#permissions = perms;', note: 'إسناد الحقل الخاص' },
      { line: '6:   }', note: 'نهاية البناء' },
      { line: '7: }', note: 'نهاية الفئة' }
    ],
    pitfallBad: 'class User { _password = "123"; } /* مجرد اتفاقية شكلية ويمكن قراءتها وتعديلها بسهولة! */',
    pitfallGood: 'class User { #password = "123"; } /* كبسلة خاصة حقيقية محمية بالـ V8 */',
    pitfallDiagnosis: 'البادئة _ هي مجرد اتفاق بين المطورين ولا تمنع أي شخص أو كود خارجي من قراءة الحقل الحساس، بينما # محمية برمجياً.',
    quizPool: [
      {
        q: 'How do you define a private instance method in an ES2022+ JavaScript class?',
        qAr: 'كيف تُعرّف دالة مثيل خاصة (Private Method) في فئات جافاسكربت الحديثة؟',
        options: ['private myMethod() {}', '#myMethod() {}', '_myMethod() {}', 'static myMethod() {}'],
        correct: 1,
        why: 'Prefixing a method name with a hash `#` creates a private method accessible only within the class body.',
        whyAr: 'وضع علامة الهاش # قبل اسم الدالة ينشئ دالة خاصة محصنة داخل الفئة فقط.'
      }
    ],
    interviewQ: 'ما هو الفرق الجوهري بين الدوال العادية المعرفة داخل Class والـ Static Methods؟',
    interviewA: 'الدوال العادية (Instance Methods) يتم وضعها على `ClassName.prototype` وتكون متاحة لكل كائن تم إنشاؤه عبر `new`. بينما الـ `static methods` يتم وضعها مباشرة على كائن الفئة نفسه `ClassName` ولا ترثها النسخ، وتُستخدم كـ Utility Functions مثل `Array.from()` أو `Object.keys()`.'
  },
  {
    slug: 'js-async-await',
    title: 'Async/Await Control Flow, Sequential vs Parallel & Error Guards',
    titleAr: 'التحكم في العمليات اللاتزامنية بـ Async/Await والتنفيذ المتوازي',
    level: 2,
    order: 12,
    estMinutes: 25,
    version: 'ES2024 Standard',
    pattern: 'Async Architecture',
    problemOpening: `الـ <code dir="ltr">async/await</code> هي طريقة خيالية لكتابة كود لاتزامني يتقرأ ويتفهم كأنه كود متزامن سطر بسطر. لكن أكبر كارثة بيقع فيها المطورين هي تحويل الطلبات المتوازية المستقلة إلى شلال انتظار متسلسل بطيء (Async Waterfall)! لما تعمل <code dir="ltr">await getUser()</code> وبعدها <code dir="ltr">await getProducts()</code> وأنت مش محتاج مخرجات الأول في التاني، أنت ضاعفت زمن استجابة الصفحة مرتين بدون أي مبرر هندسي!`,
    objectives: [
      'فهم كيفية عمل async/await داخلياً كـ Generators و Promises تحت الكابوت.',
      'القضاء التام على ظاهرة الـ Async Waterfall باستخدام Promise.all و Promise.allSettled.',
      'بناء حراس أخطاء مركزية أنيقة تمنع انهيار التطبيق عند فشل الاتصالات الشبكية.'
    ],
    mechanics: [
      { step: 1, title: 'الدوال غير المتزامنة تُرجع Promise دائماً', desc: 'أي دالة تسبقها كلمة async تُغلف قيمتها المعادة تلقائياً داخل Promise.resolve().' },
      { step: 2, title: 'تعليق التنفيذ المؤقت (Yielding)', desc: 'كلمة await توقف تنفيذ دالة الـ async فقط وتسمح للـ Event Loop بمعالجة باقي أحداث الصفحة دون تجميد.' },
      { step: 3, title: 'المعالجة المتوازية (Parallel Execution)', desc: 'إطلاق كل الوعود معاً في نفس اللحظة وانتظارها دفعة واحدة بـ Promise.all.' }
    ],
    playgroundCode: `// Comparing Waterfall vs Parallel Latency
const mockFetch = (name, delay) => new Promise(res => setTimeout(() => res(\`Data: \${name}\`), delay));

async function runParallel() {
  console.log("🚀 Starting Parallel Fetch...");
  const t0 = performance.now();
  
  // Launch both requests simultaneously
  const [users, posts] = await Promise.all([
    mockFetch("Users", 500),
    mockFetch("Posts", 500)
  ]);
  
  const elapsed = Math.round(performance.now() - t0);
  console.log(\`✅ Parallel Completed in \${elapsed}ms (Expected ~500ms)\`);
  console.log(users, "|", posts);
}

runParallel();`,
    experimentQuestion: 'ماذا يحدث إذا فشل وعد واحد (Rejected) داخل مصفوفة Promise.all()؟',
    experimentAnswer: 'الدالة Promise.all تتبع مبدأ "الكل أو الفشل الفوري" (Fail-Fast)؛ إذا فشل وعد واحد فإنها ترفض المصفوفة كاملة فوراً وتتجاهل باقي الوعود حتى لو نجحت، ولتجنب هذا نستخدم Promise.allSettled().',
    codeAnatomy: [
      { line: '1: async function loadDashboard() {', note: 'إعلان دالة غير متزامنة' },
      { line: '2:   const [stats, alerts] = await Promise.all([', note: 'إطلاق وجلب الطلبات بشكل متوازي متزامن' },
      { line: '3:     fetchStats(),', note: 'طلب الإحصائيات' },
      { line: '4:     fetchAlerts()', note: 'طلب التنبيهات' },
      { line: '5:   ]);', note: 'انتظار اكتمال الاثنين معاً بأسرع وقت' },
      { line: '6: }', note: 'نهاية الدالة' }
    ],
    pitfallBad: 'const u = await getUser(); const p = await getPosts(); /* شلال بطيء يجمع وقت الاثنين */',
    pitfallGood: 'const [u, p] = await Promise.all([getUser(), getPosts()]); /* تشغيل متوازي يأخذ وقت الأطول فقط */',
    pitfallDiagnosis: 'الانتظار المتسلسل للطلبات المستقلة هو العدو الأول لأداء تطبيقات الويب ويزيد الـ Latency بلا فائدة.',
    quizPool: [
      {
        q: 'Which Promise combinator returns a promise that resolves when ALL input promises have settled (either fulfilled or rejected)?',
        qAr: 'أي مجمع وعود يُرجع نتيجة عندما تنتهي جميع الوعود بغض النظر عن نجاحها أو فشلها؟',
        options: ['Promise.all()', 'Promise.race()', 'Promise.allSettled()', 'Promise.any()'],
        correct: 2,
        why: 'Promise.allSettled() waits for all promises to settle and returns an array of objects describing each result.',
        whyAr: 'الدالة Promise.allSettled() تنتظر انتهاء كل الوعود وتُرجع مصفوفة بحالة ونتيجة كل وعد بالتفصيل.'
      }
    ],
    interviewQ: 'كيف يتعامل محرك V8 مع كتل try/catch داخل دوال async عند حدوث Promise Rejection؟',
    interviewA: 'عندما تضع `await` داخل `try/catch`، إذا تم رفض الـ Promise (Rejected) يقوم محرك V8 بتحويل الـ Rejection إلى Exception حقيقي يمكن التقاطه داخل كتلة `catch(err)` تماماً كالكود المتزامن المتصل.'
  },
  {
    slug: 'js-modules',
    title: 'ES Modules (ESM) vs CommonJS (CJS), Tree-Shaking & Dynamic Imports',
    titleAr: 'أنظمة الحزم: ES Modules مقابل CommonJS والتحميل الديناميكي',
    level: 2,
    order: 14,
    estMinutes: 22,
    version: 'ES2024 / Node.js 24',
    pattern: 'Module Architecture',
    problemOpening: `عالم جافاسكربت كان مقسوماً لسنوات بين نظام <code dir="ltr">CommonJS</code> المستخدم في بيئة Node.js التقليدية (<code dir="ltr">require</code> و <code dir="ltr">module.exports</code>) ونظام <code dir="ltr">ES Modules</code> المعياري الحديث للمتصفحات والباك إند (<code dir="ltr">import</code> و <code dir="ltr">export</code>). الخلط بين النظامين يسبب أخطاء شهيرة مثل <code dir="ltr">ERR_REQUIRE_ESM</code>، والأهم أن CJS نظام تحميل ديناميكي متزامن يمنع أدوات الحزم من حذف الأكواد غير المستخدمة (Tree-Shaking).`,
    objectives: [
      'فهم الفروق الجوهرية بين التحميل المتزامن في CJS والتحليل الثابت (Static Analysis) في ESM.',
      'إتقان التصدير المسمى (Named Exports) مقابل التصدير الافتراضي (Default Export).',
      'تطبيق الاستيراد الديناميكي import() لتقسيم الكود (Code Splitting) وتحسين سرعة التحميل.'
    ],
    mechanics: [
      { step: 1, title: 'التحليل الثابت وميزة Tree-Shaking', desc: 'في ESM، جمل الاستيراد تكون في أعلى الملف وتُحلل قبل التشغيل مما يسمح بحذف أي دالة لا يتم استخدامها.' },
      { step: 2, title: 'الاستيراد الديناميكي (Dynamic Import)', desc: 'استدعاء import("./module.js") كدالة تُرجع Promise لتحميل الكود عند الحاجة فقط (On-Demand).' },
      { step: 3, title: 'التوافق في Node.js الحديث', desc: 'ضبط "type": "module" في package.json لتفعيل نظام ESM القياسي في كل ملفات المشروع.' }
    ],
    playgroundCode: `// Simulating Module Export/Import Mechanics
const mathModule = (function() {
  const secretConstant = 42; // Private to module scope
  
  function add(a, b) { return a + b; }
  function multiply(a, b) { return a * b; }
  
  // Named Exports
  return { add, multiply };
})();

console.log("Testing Exported add:", mathModule.add(5, 10));
console.log("Testing Exported multiply:", mathModule.multiply(4, 5));
console.log("Secret is encapsulated:", mathModule.secretConstant === undefined);`,
    experimentQuestion: 'لماذا لا يمكنك استخدام require() داخل ملف تم تعريفه كـ ES Module في Node.js؟',
    experimentAnswer: 'لأن نظام ESM يعمل ببيئة معزولة ولا يحتوي على متغيرات CJS العامة (require, __dirname, __filename)؛ في ESM نستخدم import/export المعياري أو createRequire من مكتبة node:module.',
    codeAnatomy: [
      { line: '1: // Named Export (Tree-Shakeable)', note: 'تصدير دوال محددة بالاسم' },
      { line: '2: export const calculateTax = (amount) => amount * 0.14;', note: 'تصدير الدالة' },
      { line: '3: // Dynamic Import (Code-Splitting)', note: 'تحميل عند الطلب' },
      { line: '4: const { calculateTax } = await import("./tax.js");', note: 'استيراد ديناميكي معزول' }
    ],
    pitfallBad: 'export default { fn1, fn2, fn3 }; /* يمنع الـ Bundler من حذف الدوال غير المستخدمة */',
    pitfallGood: 'export const fn1 = ...; export const fn2 = ...; /* تصدير مسمى يتيح Tree-Shaking مثالي */',
    pitfallDiagnosis: 'تصدير كائن ضخم كـ default export يجبر المشروع على تحميل كل ما بداخل الكائن حتى لو احتجت دالة واحدة.',
    quizPool: [
      {
        q: 'Which feature enables modern bundlers to eliminate dead code during compilation with ES Modules?',
        qAr: 'ما هي الميزة التي تمكن أدوات البناء الحديثة من حذف الأكواد غير المستخدمة بفضل نظام ESM؟',
        options: ['Dynamic Linking', 'Tree-Shaking', 'Hot Reloading', 'Garbage Collection'],
        correct: 1,
        why: 'Tree-shaking relies on the static structure of ES Module syntax (import/export) to detect and remove unused exports.',
        whyAr: 'تقنية Tree-Shaking تعتمد على البنية الثابتة لنظام ESM لرصد وحذف أي تصدير لا يتم استخدامه في الكود.'
      }
    ],
    interviewQ: 'كيف تحل مشكلة غياب __dirname و __filename عند العمل بنظام ES Modules في Node.js؟',
    interviewA: 'نستخدم دالة `fileURLToPath` مع `import.meta.url` المدمجة في ESM كالتالي: `const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);`.'
  },
  {
    slug: 'js-error-handling',
    title: 'Error Hierarchies, Custom Errors, Stack Traces & Defensive Coding',
    titleAr: 'معمارية معالجة الأخطاء، الأصناف المخصصة وتتبع المكدس (Stack Trace)',
    level: 2,
    order: 15,
    estMinutes: 24,
    version: 'ES2024 / Node.js 24',
    pattern: 'Defensive Architecture',
    problemOpening: `في الأنظمة الإنتاجية الكبرى، التعامل مع الأخطاء مش مجرد إنك تحط <code dir="ltr">try/catch</code> وتطبع <code dir="ltr">console.log(err)</code> وخلاص! ابتلاع الأخطاء الصامت (Error Swallowing) بيخلي الباك إند يعلق والمستخدم يشوف شاشة بيضاء بدون ما تفهم إيه اللي باظ. معمارية الأخطاء الاحترافية بتتطلب بناء أصناف أخطاء مخصصة (Custom Error Classes) تميز بين أخطاء الإدخال التشغيلية (Operational 400s) وكوارث السيرفر الداخلية (Programmer 500s).`,
    objectives: [
      'بناء شجرة أصناف أخطاء مخصصة ترث من Error مع الحفاظ على الـ Stack Trace النظيف.',
      'التمييز بين الأخطاء التشغيلية (Operational Errors) والأخطاء البرمجية (Programmer Bugs).',
      'تطبيق نمط Result Pattern والـ Central Error Handling في الواجهات والخوادم.'
    ],
    mechanics: [
      { step: 1, title: 'صنف الخطأ الأساسي AppError', desc: 'إنشاء كلاس يرث من Error ويحمل كود الحالة (statusCode) والرسالة المترجمة ونوع الخطأ.' },
      { step: 2, title: 'التقاط المكدس (Error.captureStackTrace)', desc: 'حذف دوال إعداد الخطأ الداخلية من الـ Stack Trace ليبقى سجل الخطأ واضحاً ومركزاً على مكان العطل.' },
      { step: 3, title: 'الفقاعات والالتقاط المركزي', desc: 'ترك الأخطاء غير المتوقعة تصعد لحارس الأخطاء المركزي (Central Guard) لمعالجتها وتوثيقها.' }
    ],
    playgroundCode: `// Enterprise Custom Error Architecture
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(\`Validation Failed on '\${field}': \${message}\`, 400);
    this.field = field;
  }
}

try {
  throw new ValidationError("email", "Invalid email format supplied.");
} catch (err) {
  console.log("Caught Error Name:", err.name);
  console.log("Status Code:", err.statusCode);
  console.log("Is Operational?:", err.isOperational);
  console.log("Clean Error Message:", err.message);
}`,
    experimentQuestion: 'ماذا يحدث إذا قمت بعمل throw لنص عادي مثل throw "Something failed" بدلاً من كائن Error؟',
    experimentAnswer: 'رمي نص عادي يحرمك تماماً من الـ Stack Trace وسجل تتبع مكان وقوع الخطأ ورقم السطر والملف، مما يجعل تشخيص الأعطال في الإنتاج أمراً مستحيلاً؛ دائماً استخدم throw new Error() أو صنف مشتق منه.',
    codeAnatomy: [
      { line: '1: class NotFoundError extends AppError {', note: 'صنف مخصص لأخطاء عدم العثور 404' },
      { line: '2:   constructor(resource) {', note: 'استقبال اسم المورد المفقود' },
      { line: '3:     super(`${resource} not found`, 404);', note: 'تمرير الرسالة وكود 404 للأب' },
      { line: '4:   }', note: 'نهاية البناء' },
      { line: '5: }', note: 'نهاية الصنف' }
    ],
    pitfallBad: 'try { doTask(); } catch (err) { /* ابتلاع صامت للخطأ */ }',
    pitfallGood: 'try { doTask(); } catch (err) { logger.error(err); throw new AppError(...); }',
    pitfallDiagnosis: 'تجاهل الخطأ في catch بدون تسجيله أو معالجته يخفي الكوارث البرمجية ويجعل النظام يتصرف بشكل غير متوقع.',
    quizPool: [
      {
        q: 'Which Node.js method is used to keep clean stack traces by omitting custom error constructor frames?',
        qAr: 'ما هي الدالة المستخدمة لتنظيف الـ Stack Trace وحذف إطارات بناء أصناف الأخطاء المخصصة؟',
        options: ['Error.captureStackTrace()', 'Error.cleanStack()', 'process.exit()', 'Error.prototype.trace()'],
        correct: 0,
        why: 'Error.captureStackTrace(targetObject, constructorOpt) creates a .stack property and excludes the constructor from the trace.',
        whyAr: 'الدالة Error.captureStackTrace تنشئ خاصية الـ stack وتحذف دوال البناء الداخلية ليبقى السجل نظيفاً.'
      }
    ],
    interviewQ: 'ما هو الفرق الجوهري بين Operational Errors و Programmer Errors في معمارية Node.js؟',
    interviewA: 'الـ Operational Errors هي أخطاء متوقعة الحدوث أثناء التشغيل العادي (مثل 404 Not Found أو فشل التحقق من الإدخال أو انقطاع اتصال قاعدة البيانات) ويجب معالجتها بلطف. أما الـ Programmer Errors فهي عيوب برمجية (Bugs مثل SyntaxError أو TypeError أو استدعاء دالة غير معرفة) ويجب إصلاح الكود وإعادة تشغيل العملية بـ Process Manager مثل PM2.'
  },
  {
    slug: 'js-modern-features',
    title: 'Modern ECMAScript: Optional Chaining, Nullish Coalescing, WeakRefs & Temporal',
    titleAr: 'جافاسكربت الحديثة: الروابط الاختيارية، دمج الـ Null والذاكرة الضعيفة',
    level: 2,
    order: 16,
    estMinutes: 22,
    version: 'ES2024 Standard',
    pattern: 'Modern Language Features',
    problemOpening: `قبل معايير ECMAScript الحديثة، عشان تقرأ خاصية متداخلة داخل كائن عميق كنت بتضطر تكتب سطر معقد زي <code dir="ltr">user &amp;&amp; user.profile &amp;&amp; user.profile.address &amp;&amp; user.profile.address.city</code> عشان تتجنب الخطأ الشهير <code dir="ltr">Cannot read properties of undefined</code>! المعايير الحديثة قدمت حلولاً جذرية زي الـ Optional Chaining (<code dir="ltr">?.</code>) والـ Nullish Coalescing (<code dir="ltr">??</code>) اللي بيفرق بدقة بين الـ null/undefined وبين القيم الصحيحة زي الصفر والـ false.`,
    objectives: [
      'استخدام الروابط الاختيارية Optional Chaining (?.) في قراءة الكائنات واستدعاء الدوال والمصفوفات بأمان.',
      'التمييز الصارم بين المعامل المنطقي (||) ومعامل الـ Nullish Coalescing (??).',
      'فهم إدارة الذاكرة المتقدمة باستخدام WeakMap و WeakSet والـ Structured Clone.'
    ],
    mechanics: [
      { step: 1, title: 'الربط الاختياري الآمن (?.)', desc: 'إيقاف تقييم التعبير فوراً وإرجاع undefined إذا كانت القيمة السابقة له null أو undefined.' },
      { step: 2, title: 'الدمج مع القيم الفارغة (??)', desc: 'إرجاع القيمة البديلة فقط إذا كانت القيمة الأولى null أو undefined (دون استبعاد 0 أو false أو السلسلة الفارغة).' },
      { step: 3, title: 'الاستنساخ العميق (structuredClone)', desc: 'الدالة المدمجة الأصلية في المتصفحات لعمل Deep Clone للكائنات مع الحفاظ على الأنواع الدقيقة وتجنب مراجع الذاكرة.' }
    ],
    playgroundCode: `// Modern ES2024 Features in Action
const apiResponse = {
  user: {
    name: "Karim",
    settings: {
      itemsPerPage: 0, // Valid setting that equals 0!
      theme: "dark"
    }
  }
};

// Logical OR (||) bug: treats 0 as falsy!
const limitWithOr = apiResponse.user.settings.itemsPerPage || 25;

// Nullish Coalescing (??) fix: preserves 0!
const limitWithNullish = apiResponse.user.settings.itemsPerPage ?? 25;

console.log("Buggy OR result (Wrongly fallback to 25):", limitWithOr);
console.log("Correct Nullish result (Preserves 0):", limitWithNullish);

// Safe Optional Chaining on missing properties
console.log("Safe Deep Access:", apiResponse.user?.profile?.address?.zipCode); // undefined (No Crash!)`,
    experimentQuestion: 'لماذا تعتبر دالة structuredClone() أفضل بمراحل من JSON.parse(JSON.stringify(obj)) للاستنساخ العميق؟',
    experimentAnswer: 'لأن structuredClone تدعم نسخ الأنواع المتقدمة كـ Dates و RegExps و Maps و Sets و ArrayBuffers والـ Circular References التي تفشل تماماً وتتحول لبيانات مشوهة مع JSON.stringify.',
    codeAnatomy: [
      { line: '1: const clonedUser = structuredClone(user);', note: 'استنساخ عميق أصلي 100% دون أي مكتبات خارجية' },
      { line: '2: const port = process.env.PORT ?? 3000;', note: 'تعيين المنفذ الافتراضي فقط إذا كان PORT غير معرف' },
      { line: '3: const callbackResult = config.onComplete?.();', note: 'استدعاء الدالة فقط إذا كانت موجودة ومعرفة' }
    ],
    pitfallBad: 'const score = user.score || 10; /* لو درجة الطالب 0 ستتحول لـ 10 بالخطأ! */',
    pitfallGood: 'const score = user.score ?? 10; /* تحافظ على قيمة 0 كدرجة صحيحة */',
    pitfallDiagnosis: 'المعامل || يختبر الـ Falsy Values (ومنها 0 و false و "") بينما ?? يختبر الـ Nullish فقط (null و undefined).',
    quizPool: [
      {
        q: 'What will `null ?? "default"` evaluate to?',
        qAr: 'ما هي نتيجة تقييم `null ?? "default"`؟',
        options: ['null', '"default"', 'undefined', 'false'],
        correct: 1,
        why: 'The nullish coalescing operator returns its right-hand operand when its left-hand operand is null or undefined.',
        whyAr: 'المعامل ?? يُرجع القيمة في الجانب الأيمن إذا كانت القيمة في الجانب الأيسر null أو undefined.'
      }
    ],
    interviewQ: 'ما هي الـ WeakMap وفيمَ تختلف عن الـ Map العادية في إدارة الذاكرة؟',
    interviewA: 'الـ `WeakMap` تقبل فقط كائنات كمفاتيح وتحتفظ بها كـ "مراجع ضعيفة" (Weak References). هذا يعني أنه إذا لم يعد هناك أي مرجع آخر يشير للكائن المفتاح، يقوم محرك الـ Garbage Collector بحذفه وتحرير ذاكرته تلقائياً، وتُستخدم لمنع تسريب الذاكرة عند تخزين بيانات خاصة بالكائنات.'
  }
];
