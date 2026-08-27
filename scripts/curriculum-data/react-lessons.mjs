/* ============================================================
   react-lessons.mjs — 14 New Lessons for React.js Track
   ============================================================ */

export const reactLessons = [
  {
    slug: 'jsx-deep-dive',
    title: 'JSX Under the Hood: React.createElement, AST & Modern JSX Transform',
    titleAr: 'كواليس JSX: دالة createElement والتحويل البرمجي الحديث في ريآكت 19',
    level: 1,
    order: 2,
    estMinutes: 20,
    version: 'React 19.2',
    pattern: 'Core Compilation Engine',
    problemOpening: `المطور المبتدئ لما بيشوف كود JSX بيفكر إنه بيكتب كود HTML عادي جوه جافاسكربت! الحقيقة الصادمة إن المتصفح ميعرفش إيه هو الـ JSX ومبيفهموش إطلاقاً. الـ JSX هو مجرد "سكر تركيبي" (Syntactic Sugar) لأشجار كائنات برمجية بسيطة. قبل ما المتصفح يشوف سطر كود واحد، محول زي Babel أو SWC بيحول كل وسم لنداء <code dir="ltr">React.createElement()</code> أو لدالة الـ Modern JSX Runtime الجديدة <code dir="ltr">_jsx()</code>. لو مش فاهم التحويل ده، مش هتعرف ليه ريآكت بتطلب إرجاع جذر واحد (Single Root) أو ليه التكرار بيحتاج Keys.`,
    objectives: [
      'فهم كيفية تحويل كود الـ JSX إلى شجرة كائنات Virtual DOM عبر مترجمات الـ AST.',
      'التمييز بين التحويل القديم (React.createElement) والتحويل الحديث في React 19 (_jsx).',
      'إتقان استخدام Fragments (<>...</>) لتجنب تلويث شجرة الـ DOM بحاويات زائفة.'
    ],
    mechanics: [
      { step: 1, title: 'تحليل شجرة الكود (AST Parsing)', desc: 'المترجم يفكك وسوم JSX ويحولها لعقد شجرية تتضمن نوع المكون (type) والخصائص (props) والأبناء (children).' },
      { step: 2, title: 'توليد كائن الـ React Element', desc: 'كل وسم ينتج كائناً مجرداً بالشكل { $$typeof: Symbol(react.element), type, props, key }.' },
      { step: 3, title: 'حقن الـ Virtual DOM', desc: 'ريآكت تستخدم هذه الكائنات الخفيفة لمقارنة الفروق دون لمس الـ DOM الحقيقي إلا في مرحلة الـ Commit.' }
    ],
    playgroundCode: `// Simulating React.createElement from Scratch
function createElement(type, props, ...children) {
  return {
    $$typeof: Symbol.for('react.element'),
    type: type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children
    },
    key: props?.key || null
  };
}

const vdom = createElement('div', { id: 'card', className: 'user-card' },
  createElement('h2', null, 'Amr Zidan'),
  createElement('p', null, 'FullStack Architect')
);

console.log("Generated React Element Tree (Pure JS Object):");
console.log(JSON.stringify(vdom, null, 2));`,
    experimentQuestion: 'لماذا تحتوي كائنات React Elements على الخاصية المشفرة $$typeof: Symbol.for(\'react.element\')؟',
    experimentAnswer: 'هذا صمام أمان أمني بالغ الأهمية للحماية من ثغرات XSS؛ إذا حاول مخترق تمرير كائن JSON مزيف من السيرفر كعنصر ريآكت، ستفشل العملية لأن JSON لا يمكنه احتواء رموز Symbol، فتتجاهله ريآكت فوراً.',
    codeAnatomy: [
      { line: '1: // JSX Written by Developer', note: 'الكود كما يكتبه المطور' },
      { line: '2: const el = <h1 className="title">Hello</h1>;', note: 'وسم JSX بسيط' },
      { line: '3: // Compiled Output by React 19 Runtime', note: 'الكود بعد الترجمة' },
      { line: '4: const el = _jsx("h1", { className: "title", children: "Hello" });', note: 'استدعاء دالة بناء الكائن الخفيف' }
    ],
    pitfallBad: 'return ( <h1>Title</h1> <p>Desc</p> ); /* خطأ تجميع: لا يمكن إرجاع قيمتين في نفس الوقت */',
    pitfallGood: 'return ( <> <h1>Title</h1> <p>Desc</p> </> ); /* تغليف بـ Fragment خفيف بدون div زائف */',
    pitfallDiagnosis: 'دوال جافاسكربت لا تستطيع إرجاع أكثر من قيمة واحدة، ولهذا يجب تجميع العناصر في جذر واحد أو وسم Fragment.',
    quizPool: [
      {
        q: 'What is a React Element in its most fundamental form?',
        qAr: 'ما هو عنصر ريآكت (React Element) في جوهره الحقيقي؟',
        options: ['A real DOM Node', 'A plain immutable JavaScript object', 'An HTML string', 'A browser Web Component'],
        correct: 1,
        why: 'React elements are lightweight, plain JavaScript objects that describe what should appear on screen.',
        whyAr: 'عناصر ريآكت هي كائنات جافاسكربت عادية غير قابلة للتعديل تصف ما يجب أن يظهر على الشاشة.'
      }
    ],
    interviewQ: 'ما هو الفرق بين التحويل الكلاسيكي (Classic Runtime) والحديث (Automatic JSX Runtime) في ريآكت؟',
    interviewA: 'التحويل الكلاسيكي كان يحول JSX إلى `React.createElement()` مما يجبرك على كتابة `import React from "react"` في كل ملف. بينما التحويل الحديث (React 17+) يستورد تلقائياً دوال متخصصة من `react/jsx-runtime` مثل `_jsx` و `_jsxs` ولا يتطلب استيراد React في رأس الملف ويولد أكواداً أصغر حجماً وأسرع أداءً.'
  },
  {
    slug: 'event-handling',
    title: 'SyntheticEvent System, Event Delegation & Controlled Forms',
    titleAr: 'نظام الأحداث الاصطناعي (SyntheticEvent) والمدخلات المضبوطة في ريآكت',
    level: 1,
    order: 5,
    estMinutes: 24,
    version: 'React 19.2',
    pattern: 'Event Architecture',
    problemOpening: `في متصفحات الويب المختلفة، طريقة تعامل المتصفح مع الأحداث (Click, Input, Scroll) فيها اختلافات طفيفة في الـ APIs وأسماء الخصائص بين Chrome و Safari و Firefox. ريآكت بتعالج الصداع ده بنظام عبقري اسمه <code dir="ltr">SyntheticEvent</code>: غلاف موحد عالي الأداء يوفر نفس السلوك المتطابق على كل الأجهزة. بالإضافة لكده، ريآكت بتستخدم تقنية تفويض الأحداث (Event Delegation) وربط كل الأحداث في جذر التطبيق (<code dir="ltr">#root</code>) بدل ما تربط آلاف المستمعين في الـ DOM مباشرة!`,
    objectives: [
      'فهم معمارية SyntheticEvent وتفويض الأحداث (Event Delegation) في جذر شجرة ريآكت.',
      'بناء نماذج استمارات مضبوطة (Controlled Components) والتعامل مع المدخلات المتعددة بدالة واحدة.',
      'إتقان منع السلوك الافتراضي (e.preventDefault()) وإيقاف انتشار الحدث (e.stopPropagation()).'
    ],
    mechanics: [
      { step: 1, title: 'تفويض الحدث في جذر التطبيق (#root)', desc: 'ريآكت تربط مستمعاً واحداً فقط على وسم الجذر وتوجه الأحداث للمكون المعني عبر شجرة المكونات.' },
      { step: 2, title: 'تغليف الحدث بـ SyntheticEvent', desc: 'إنشاء كائن حدث موحد متوافق مع W3C مع الحفاظ على مرجع الحدث الأصلي عبر e.nativeEvent.' },
      { step: 3, title: 'المكونات المضبوطة (Controlled Forms)', desc: 'قيمة الحقل تُقرأ دائماً من الـ State وتتحدث بدقة مع كل ضغطة مفتاح عبر onChange.' }
    ],
    playgroundCode: `// Multi-Field Controlled Form Handler
const formData = { username: "", email: "", role: "developer" };

function handleInputChange(name, value) {
  formData[name] = value;
  console.log("Updated Form State:", JSON.stringify(formData));
}

// Simulating Typing in Inputs
handleInputChange("username", "AmrZidan");
handleInputChange("email", "amr@codehub.dev");
handleInputChange("role", "architect");

console.log("Form Ready for Validation:", formData.email.includes("@"));`,
    experimentQuestion: 'لماذا تم إلغاء خاصية تجميع الأحداث (Event Pooling) في ريآكت 17+؟',
    experimentAnswer: 'في إصدارات ريآكت القديمة كانت الكائنات الاصطناعية يُعاد تدويرها (Pooled) وتصبح مفرغة (Nullified) بمجرد انتهاء الاستدعاء، مما كان يمنع قراءة e.target داخل دوال async أو setTimeout. تم إلغاء هذا التجميع لتحسين التوافقية وسهولة التطوير.',
    codeAnatomy: [
      { line: '1: const handleChange = (e) => {', note: 'استقبال كائن SyntheticEvent الموحد' },
      { line: '2:   const { name, value } = e.target;', note: 'استخراج اسم الحقل وقيمته المدخلة' },
      { line: '3:   setForm(prev => ({ ...prev, [name]: value }));', note: 'تحديث الحقل ديناميكياً مع الحفاظ على باقي الحقول' },
      { line: '4: };', note: 'نهاية المعالج' }
    ],
    pitfallBad: '<form onSubmit={submit}> /* بدون e.preventDefault() سيعيد المتصفح تحميل الصفحة بالكامل! */',
    pitfallGood: 'const submit = (e) => { e.preventDefault(); /* معالجة البيانات دون Refresh */ };',
    pitfallDiagnosis: 'النموذج الافتراضي في المتصفح يقوم بعمل Full Page Reload عند الإرسال، ويجب إيقافه برمجياً للتحكم في تدفق الـ SPA.',
    quizPool: [
      {
        q: 'Where does React 17+ attach its native event listeners for event delegation?',
        qAr: 'أين تعلق ريآكت 17+ مستمعي الأحداث الحقيقيين لتطبيق تقنية تفويض الأحداث؟',
        options: ['Directly on document', 'On the root DOM container (e.g. #root)', 'On window', 'On individual HTML elements'],
        correct: 1,
        why: 'Since React 17, React attaches event handlers to the root DOM container where your React tree is rendered.',
        whyAr: 'منذ ريآكت 17، تعلق ريآكت مستمعي الأحداث على حاوية الـ DOM الجذرية (#root) التي يتم حقن التطبيق بداخلها.'
      }
    ],
    interviewQ: 'ما هو الفرق بين المكونات المضبوطة (Controlled) وغير المضبوطة (Uncontrolled) في استمارات ريآكت؟',
    interviewA: 'في المكونات المضبوطة (Controlled)، مصدر الحقيقة الوحيد هو الـ React State ويتم التحكم في القيمة عبر خاصية `value` ودالة `onChange`. أما في غير المضبوطة (Uncontrolled)، فالـ DOM نفسه هو الذي يحتفظ بالحالة ويتم قراءة القيمة عند الحاجة (مثل الإرسال) عبر `useRef`.'
  },
  {
    slug: 'conditional-rendering',
    title: 'Conditional Rendering Patterns, Short-Circuits & Early Returns',
    titleAr: 'أنماط العرض الشرطي، فخاخ الدوائر القصيرة (&amp;&amp;) والعودة المبكرة',
    level: 1,
    order: 6,
    estMinutes: 20,
    version: 'React 19.2',
    pattern: 'UI Logic Flow',
    problemOpening: `العرض الشرطي (Conditional Rendering) في ريآكت بيعتمد بالكامل على منطق جافاسكربت العادي (بدون توجيهات خاصة زي v-if أو *ngIf). لكن أشهر فخ بيقع فيه حتى مهندسون متوسطون هو استخدام المعامل <code dir="ltr">&amp;&amp;</code> مع الأرقام: لما تكتب <code dir="ltr">{items.length &amp;&amp; &lt;List /&gt;}</code> وتكون المصفوفة فاضية (length = 0)، ريآكت هتطبع رقم <code dir="ltr">0</code> قبيح على الشاشة للمستخدم! في هذا الدرس هنتعلم كل أنماط العرض الشرطي الاحترافية وتجنب فخاخ التحويل المنطقي.`,
    objectives: [
      'إتقان الأنماط الأربعة للعرض الشرطي: If/Else Guard, Ternary (?:), Logical AND (&&), و Enum Mapping.',
      'تجنب فخ طباعة الصفر الناتج عن التقصير المنطقي الخاطئ (Falsy Zero Bug).',
      'بناء هياكل واجهة نظيفة تدعم حالات التحميل (Skeleton)، الأخطاء، والبيانات الفارغة (Empty States).'
    ],
    mechanics: [
      { step: 1, title: 'التقييم المنطقي في JSX', desc: 'ريآكت تتجاهل القيم boolean (true/false) و null و undefined ولا ترسم شيئاً، بينما ترسم الأرقام بما فيها 0.' },
      { step: 2, title: 'التحويل الصريح قبل &&', desc: 'تحويل الشروط دائماً إلى boolean صريح عبر Boolean(cond) أو cond > 0 قبل استخدام &&.' },
      { step: 3, title: 'نمط الـ Component Mapping', desc: 'استخدام كائنات جدولية لاختيار المكون المناسب بناءً على الحالة (Status) دون سلاسل if/else الطويلة.' }
    ],
    playgroundCode: `// Demonstrating the Falsy Zero Hazard
const messages = []; // Empty array

// ❌ Buggy: Renders 0 on screen!
const buggyRender = messages.length && "You have messages!";
console.log("Buggy Render Output:", buggyRender); // 0 (React renders this!)

// ✅ Safe Pattern 1: Explicit comparison
const safeRender1 = messages.length > 0 && "You have messages!";
console.log("Safe Render 1 Output:", safeRender1); // false (React ignores this!)

// ✅ Safe Pattern 2: Boolean conversion
const safeRender2 = Boolean(messages.length) && "You have messages!";
console.log("Safe Render 2 Output:", safeRender2); // false`,
    experimentQuestion: 'ماذا ترسم ريآكت إذا كان ناتج التعبير داخل JSX هو undefined؟',
    experimentAnswer: 'ريآكت تتجاهل undefined ولا ترسم أي شيء على الشاشة (Empty View)؛ ومع ذلك، إذا كانت دالة المكون نفسها تُرجع undefined بدلاً من JSX أو null، فستلقي ريآكت خطأ تحذيرياً يطالب بإرجاع null صراحة عند عدم الرغبة في الرسم.',
    codeAnatomy: [
      { line: '1: if (isLoading) return <SkeletonLoader />;', note: 'حارس مبكر لحالة التحميل' },
      { line: '2: if (error) return <ErrorMessage error={error} />;', note: 'حارس مبكر لحالة الخطأ' },
      { line: '3: return (', note: 'المسار السليم للمكون' },
      { line: '4:   <main>{items.length > 0 ? <List items={items} /> : <EmptyState />}</main>', note: 'معامل ثلاثي آمن للمحتوى الفارغ' },
      { line: '5: );', note: 'إغلاق الواجهة' }
    ],
    pitfallBad: '{count && <Badge count={count} />} /* لو count = 0 سيظهر رقم 0 على الشاشة! */',
    pitfallGood: '{count > 0 && <Badge count={count} />} /* أو {Boolean(count) && ...} حماية تامة */',
    pitfallDiagnosis: 'عندما يكون الجانب الأيسر لمعامل && هو 0، تعيد جافاسكربت 0 فوراً، ولأن 0 رقم صالح تقوم ريآكت برسمه في الـ DOM.',
    quizPool: [
      {
        q: 'Which value, when evaluated inside JSX curly braces `{value}`, will NOT be rendered to the DOM?',
        qAr: 'أي من القيم التالية لن ترسم أي شيء في الـ DOM عند وضعها داخل أقواس JSX `{value}`؟',
        options: ['0', '"" (Empty string)', 'NaN', 'false'],
        correct: 3,
        why: 'React ignores boolean values (true and false), null, and undefined during DOM rendering.',
        whyAr: 'ريآكت تتجاهل تماماً القيم المنطقية (true و false) وقيم null و undefined أثناء رسم شجرة الـ DOM.'
      }
    ],
    interviewQ: 'كيف تصمم نظام عرض شرطي يدعم حالات متعددة معقدة (Multi-State UI) بطريقة قابلة للصيانة؟',
    interviewA: 'نستخدم نمط الـ Object / Record Mapping: نعرف كائناً يحتوي على المكونات المطابقة لكل حالة `const STATUS_VIEW = { loading: <Spinner />, error: <Alert />, success: <Dashboard /> };` ونستدعيه عبر `STATUS_VIEW[status] || <NotFound />` بدلاً من تعشيش معاملات الـ Ternary المربكة.'
  },
  {
    slug: 'lists-keys',
    title: 'Lists, Stable Keys Strategies & The Index-as-Key Hazard',
    titleAr: 'عرض القوائم، استراتيجيات الـ Keys المستقرة ومخاطر استخدام الفهرس (Index)',
    level: 1,
    order: 7,
    estMinutes: 22,
    version: 'React 19.2',
    pattern: 'DOM Reconciliation Safety',
    problemOpening: `كلنا عارفين إنك لما تعمل <code dir="ltr">.map()</code> على مصفوفة في ريآكت لازم تحط <code dir="ltr">key</code> عشان التحذير الأصفر يختفي. كتير من المطورين بيستسهلوا ويحطوا الفهرس <code dir="ltr">key={index}</code> ويفرحوا إن التحذير اختفى! دي واحدة من أخطر الكوارث الصامتة في ريآكت: لما المستخدم يحذف عنصر أو يعيد ترتيب القائمة، الفهارس بتتغير مكانها وريآكت بتتلخبط فتنقل نصوص المدخلات والحالات الداخلية للعناصر الخطأ! في هذا الدرس هنفهم خوارزمية الـ Keys ولماذا تعتبر الهوية الثابتة (Identity) خطاً أحمر.`,
    objectives: [
      'فهم دور الـ Key كمعرف هوية فريد وثابت يساعد خوارزمية Reconciliation على مطابقة العناصر.',
      'إدراك المخاطر الكارثية لاستخدام مصفوفة الفهارس index كـ Key عند الحذف أو الفرز أو الإضافة في البداية.',
      'تطبيق استراتيجيات توليد الـ IDs المستقرة باستخدام crypto.randomUUID() أو معرفات قاعدة البيانات.'
    ],
    mechanics: [
      { step: 1, title: 'الهوية مقابل الموضع (Identity vs Position)', desc: 'الـ Key يخبر ريآكت "من هو هذا العنصر عبر الزمن" وليس مجرد "أين يقع في المصفوفة حالياً".' },
      { step: 2, title: 'إعادة تدوير العقد في الـ DOM', desc: 'عند تغير الترتيب، تبحث ريآكت عن نفس الـ Key وتحرك العقدة الموجودة بدلاً من تدميرها وإعادة بنائها.' },
      { step: 3, title: 'قاعدة المعرفات المستقرة الفريدة', desc: 'الـ Key يجب أن يكون فريداً بين الأشقاء وثابتاً لا يتغير مع كل إعادة رسم (Render).' }
    ],
    playgroundCode: `// Visualizing Key Reordering Mechanics
const initialItems = [
  { id: "item-a", text: "Learn Foundations" },
  { id: "item-b", text: "Master React Fiber" },
  { id: "item-c", text: "Build FullStack Apps" }
];

console.log("Original List Keys:", initialItems.map(i => i.id).join(" | "));

// Simulating Item Deletion & Key Persistence
const filteredItems = initialItems.filter(i => i.id !== "item-a");
console.log("After Deleting First Item:");
console.log("Stable Keys Preserved:", filteredItems.map(i => i.id).join(" | "));
console.log("✅ React reuses existing DOM nodes for item-b and item-c perfectly!");`,
    experimentQuestion: 'لماذا يحظر تماماً توليد الـ Key ديناميكياً أثناء الرسم مثل key={Math.random()}؟',
    experimentAnswer: 'لأن Math.random() ينتج رقماً جديداً مع كل Render؛ مما يجعل ريآكت تعتقد أن كل عناصر القائمة قد دُمرت بالكامل واستُبدلت بعناصر جديدة، فتهدم كل عقد الـ DOM وتفقد كل حالات الـ Inputs والـ Focus وتهلك أداء المتصفح.',
    codeAnatomy: [
      { line: '1: <ul>', note: 'قائمة غير مرتبة' },
      { line: '2:   {todos.map(todo => (', note: 'تكرار على مصفوفة المهام' },
      { line: '3:     <TodoItem key={todo.id} todo={todo} />', note: 'إسناد ID ثابت لا يتغير من قاعدة البيانات' },
      { line: '4:   ))}', note: 'نهاية التكرار' },
      { line: '5: </ul>', note: 'إغلاق القائمة' }
    ],
    pitfallBad: '{users.map((user, idx) => <UserRow key={idx} user={user} />)} /* خطر تشوه البيانات عند الحذف */',
    pitfallGood: '{users.map(user => <UserRow key={user.id} user={user} />)} /* معرف فريد ثابت دائم */',
    pitfallDiagnosis: 'استخدام index كـ Key يجعل العنصر الأول يأخذ دائماً index 0 حتى لو حذفته، فتنتقل مدخلات العنصر المحذوف للعنصر الذي تلاه.',
    quizPool: [
      {
        q: 'What is the primary purpose of the `key` prop in React lists?',
        qAr: 'ما هو الغرض الأساسي من خاصية `key` في قوائم ريآكت؟',
        options: ['Styling list items with CSS', 'Providing an accessible label for screen readers', 'Helping React identify which items have changed, been added, or removed', 'Passing data from child to parent component'],
        correct: 2,
        why: 'Keys give elements a stable identity, allowing React to match elements across renders during reconciliation.',
        whyAr: 'الـ Keys تمنح العناصر هوية مستقرة تمكن ريآكت من مطابقة العناصر بكفاءة عبر عمليات إعادة الرسم.'
      }
    ],
    interviewQ: 'متى يكون استخدام Array Index كـ Key مقبولاً في ريآكت، ومتى يكون محظوراً تماماً؟',
    interviewA: 'يكون استخدام الـ Index مقبولاً فقط إذا تحققت 3 شروط معاً: 1. القائمة ثابتة لا تتغير عناصرها أبداً (Static). 2. لا يتم فرزها (No Sorting) أو تصفيتها أو إعادة ترتيبها. 3. عناصر القائمة لا تحتوي على حالات داخلية (No Internal State or Inputs). إذا اختل أي شرط من الثلاثة، يصبح استخدام الـ Index محظوراً.'
  }
];
