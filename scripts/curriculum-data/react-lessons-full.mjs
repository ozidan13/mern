/* ============================================================
   scripts/curriculum-data/react-lessons-full.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 2: React.js 19 Modern Frontend (All 14 Lessons).
   ============================================================ */

export const reactLessonsFull = [
  {
    slug: 'jsx-deep-dive',
    title: 'JSX Under the Hood: React.createElement, Compilation & React 19 JSX Transform',
    titleAr: 'تشريح الـ JSX: دالة React.createElement ومحول JSX الحديث في ريآكت 19',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'React 19.x & JSX Transform',
    pattern: 'Virtual DOM & AST Compilation',
    objectives: [
      'فهم كيف يترجم مترجم Babel / SWC وسوم JSX إلى استدعاءات دوال جافاسكريبت نقية (React Elements).',
      'التمييز بين كائنات الـ Virtual DOM وعناصر الـ DOM الحقيقية في المتصفح.',
      'فهم ميزة Automatic JSX Transform في React 19 والاستغناء عن import React from "react".',
      'حماية التطبيقات من هجمات Cross-Site Scripting (XSS) بفهم كيفية قيام JSX بتطهير النصوص.'
    ],
    problemOpening: `
      الكثير من المطورين يعتقدون أن JSX هو "كتابة كود HTML داخل كود JavaScript". هذه الفكرة خاطئة تماماً وتقود إلى سوء فهم مستمر لكيفية عمل ريآكت!
      الـ JSX ليس HTML وليس نصاً برمجياً يفهمه المتصفح مباشرة. المتصفح لا يستطيع قراءة <code dir="ltr">&lt;h1 className="title"&gt;Hello&lt;/h1&gt;</code> وسيرمي فوراً خطأ SyntaxError.
      الـ JSX هو في الحقيقة مجرد "صيغة مختصرة ومريحة" (Syntactic Sugar) لكتابة استدعاءات دوال تنتج كائنات جافاسكريبت عادية اسمها React Elements.
      عندما تكتب وسماً بسيطاً، يقوم المترجم (مثل SWC أو Babel) بتحويله إلى كائن يحتوي على <code dir="ltr">{ type: 'h1', props: { className: 'title', children: 'Hello' } }</code>.
      في هذا الدرس، هنفكك محرك الـ JSX، وهنعرف إزاي ريآكت 19 بتتعامل مع الـ JSX Transform الجديد، ولماذا كل عنصر في JSX يملك حقلاً سرياً <code dir="ltr">$$typeof: Symbol(react.element)</code> لحماية تطبيقك من الاختراق.
    `,
    mechanics: [
      { step: '01', title: 'مرحلة الترجمة (Compile Phase)', desc: 'يقوم المترجم بتحويل كل وسم JSX إلى استدعاء _jsx() من مكتبة react/jsx-runtime مع فصل الخصائص والمحتويات (Children).' },
      { step: '02', title: 'إنشاء كائن العنصر (React Element Object)', desc: 'تُرجع الدالة كائناً بسيطاً (Plain JS Object) يصف الشجرة البصرية: type (نوع العنصر)، props (الخصائص)، و key للتعرف عليه.' },
      { step: '03', title: 'درع الأمان الأمني ($$typeof Symbol Shield)', desc: 'ريآكت تضع Symbol خاصاً $$typeof على كل عنصر لمنع هجمات XSS وحظر معالجة كائنات JSON خبيثة قادمة من السيرفر.' },
      { step: '04', title: 'قواعد التقييم المعجمي (Expressions in Curly Braces)', desc: 'أي شيء يوضع داخل أقواس {} يتم تقييمه كـ JavaScript Expression (مثل ternary operators أو array.map) ولا يقبل statements مثل if أو for.' },
      { step: '05', title: 'الوسوم المجهولة والـ React Fragments (<></>)', desc: 'استخدام Fragment لتجميع عناصر متعددة دون إضافة وسوم div غير ضرورية إلى شجرة الـ DOM الحقيقية.' }
    ],
    playgroundCode: `// محاكي مترجم JSX التخيلي
function mockJsxTransform(type, props, ...children) {
  return {
    $$typeof: Symbol.for("react.element"),
    type: type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children
    }
  };
}

// محاكاة تحويل: <button className="btn-save" disabled>حفظ التغييرات</button>
const buttonElement = mockJsxTransform(
  "button",
  { className: "btn-save", disabled: true },
  "حفظ التغييرات"
);

console.log("Transpiled React Element Object:");
console.log(JSON.stringify(buttonElement, null, 2));
console.log("Element is valid React node:", typeof buttonElement.$$typeof === "symbol");`,
    experimentQuestion: 'لماذا تمنع ريآكت كتابة class بدلاً من className و for بدلاً من htmlFor في وسوم JSX؟',
    experimentAnswer: 'لأن JSX يُترجم إلى كود جافاسكريبت خالص، وكلمتا class و for هما كلمات محجوزة (Reserved Keywords) في لغة JavaScript. ولتجنب الاصطدام مع قواعد اللغة، اعتمدت ريآكت خصائص الـ DOM Properties القياسية مثل className و htmlFor.',
    codeAnatomy: [
      { line: 'import { jsx as _jsx } from "react/jsx-runtime";', note: 'المحول التلقائي في React 19' },
      { line: 'function Greeting({ name }) {', note: 'مكون دالي يستقبل props' },
      { line: '  return _jsx("h1", {', note: 'الترجمة الفعلية لوسم JSX' },
      { line: '    className: "welcome-title",', note: 'الخصائص الممررة' },
      { line: '    children: `Hello, ${name}!`', note: 'المحتوى النصي كـ children' },
      { line: '  });', note: 'نهاية الاستدعاء' },
      { line: '}', note: 'نهاية المكون' }
    ],
    pitfallBad: `// خطأ شائع: محاولة إرجاع عناصر متجاورة بدون Fragment
function UserCard() {
  return (
    <h2>Sarah</h2>
    <p>Software Engineer</p>
  ); // خطأ SyntaxError: JSX expressions must have one parent element
}`,
    pitfallGood: `// الحل الهندسي: استخدام React Fragment
function UserCard() {
  return (
    <>
      <h2>Sarah</h2>
      <p>Software Engineer</p>
    </>
  ); // تجميع العناصر بدون توليد div إضافي في المتصفح
}`,
    pitfallDiagnosis: 'دوال جافاسكريبت لا يمكن أن تُرجع قيمتين في نفس الوقت return A, B. بما أن JSX يترجم إلى استدعاء دالة، يجب تغليف العناصر في جذر أب واحد أو استخدام Fragment.',
    quizPool: [
      {
        q: 'What does a JSX tag like `&lt;h1 className="title"&gt;Hi&lt;/h1&gt;` actually compile to at runtime?',
        qAr: 'إلى ماذا يُترجم وسم JSX مثل `&lt;h1 className="title"&gt;Hi&lt;/h1&gt;` فعلياً وقت التشغيل؟',
        options: [
          'A plain JavaScript object representing the Virtual DOM node ({ type, props, $$typeof }).',
          'A real document.createElement("h1") DOM node immediately.',
          'An HTML string sent to innerHTML.',
          'A compiled WebAssembly binary.'
        ],
        correct: 0,
        why: 'JSX is compiled into a function call returning a lightweight JavaScript descriptor object.',
        whyAr: 'الـ JSX يُترجم إلى استدعاء دالة ينتج كائن جافاسكريبت وصفي خفيف الوزن يمثل عقدة في الـ Virtual DOM.'
      },
      {
        q: 'What is the security role of the $$typeof: Symbol.for("react.element") property in React elements?',
        qAr: 'ما هو الدور الأمني لخاصية $$typeof المحمية بـ Symbol في عناصر ريآكت؟',
        options: [
          'Protects against XSS injection by preventing arbitrary JSON objects from being processed as valid React elements.',
          'Enables faster CSS rendering.',
          'Prevents memory leaks in React Fiber.',
          'Encrypts user data.'
        ],
        correct: 0,
        why: 'JSON data received from an external API cannot contain Symbol values, blocking malicious JSON payloads from spoofing React elements.',
        whyAr: 'بيانات JSON القادمة من السيرفر لا يمكن أن تحتوي على رموز Symbol، مما يمنع حقن كائنات خبيثة ومعاملتها كعناصر واجهة.'
      },
      {
        q: 'Why can you NOT use standard if-else statements directly inside JSX curly braces { }?',
        qAr: 'لماذا لا يمكن استخدام جمل if-else التقليدية مباشرة داخل أقواس JSX المعقوفة { }؟',
        options: [
          'JSX curly braces only accept JavaScript Expressions (which evaluate to a value), not Statements.',
          'React does not support conditional logic.',
          'Babel cannot parse the letter "i".',
          'If-else causes memory leaks in V8.'
        ],
        correct: 0,
        why: 'Statements do not evaluate to a value that can be passed as an argument in a function call; ternary expressions must be used instead.',
        whyAr: 'أقواس JSX تقبل فقط التعبيرات التقييمية Expressions التي تنتج قيمة، بينما if-else هي جمل تنفيذية Statements.'
      },
      {
        q: 'What is the purpose of React.Fragment (<>...</>)?',
        qAr: 'ما هي الفائدة الأساسية لاستخدام React.Fragment (<>...</>)؟',
        options: [
          'Groups multiple children elements without creating an extra wrapping DOM node.',
          'Applies CSS Grid styling automatically.',
          'Caches the component in memory.',
          'Enables server-side rendering.'
        ],
        correct: 0,
        why: 'Fragments allow grouping multiple JSX elements together without adding redundant <div> wrapper nodes to the real DOM tree.',
        whyAr: 'تتيح تجميع عناصر متعددة معاً دون إضافة وسوم div غير ضرورية إلى شجرة الـ DOM الحقيقية للمتصفح.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين Automatic JSX Transform المقدم في React 17/19 ومحول Classic JSX القديم؟',
    interviewA: 'في المحول القديم، كان كل وسم JSX يُترجم إلى React.createElement، وكان من الإلزامي كتابة import React from "react" في كل ملف. في المحول الجديد Automatic JSX Transform، يقوم المترجم باستيراد دوال متخصصة _jsx() تلقائياً من react/jsx-runtime. هذا يقلل حجم حزمة الـ Bundle بنسبة طفيفة، ويحسن أداء إنشاء العناصر، ويسمح بتمرير الخصائص بشكل أسرع دون التحقق غير الضروري من defaultProps.'
  },
  {
    slug: 'event-handling',
    title: 'Synthetic Events & Delegation in React 19: Pooling Removal & Native Interop',
    titleAr: 'نظام الأحداث المركبة (Synthetic Events) وتفويض الأحداث في ريآكت 19',
    level: 1,
    order: 4,
    estMinutes: 30,
    version: 'React 19.x Concurrency',
    pattern: 'Event Delegation & Synthetic Wrapper',
    objectives: [
      'فهم بنية الأحداث المركبة SyntheticEvent وكيف توحد ريآكت سلوك المتصفحات المختلفة.',
      'تشريح آلية تفويض الأحداث (Event Delegation) وربط المستمعين بجذر التطبيق (React Root Container).',
      'فهم إلغاء ميزة Event Pooling في الإصدارات الحديثة والتعامل الآمن مع الأحداث اللاتزامنية.',
      'إدارة منع السلوك الافتراضي (e.preventDefault) ووقف الانتشار (e.stopPropagation).'
    ],
    problemOpening: `
      في جافاسكريبت العادية، لو عندك قائمة فيها 1000 عنصر، وإضافة event listener لكل عنصر <code dir="ltr">button.addEventListener('click')</code> هتحجز 1000 مكان في الذاكرة وهتبطئ المتصفح جداً.
      ريآكت حلت المشكلة دي بعبقرية من خلال معمارية "تفويض الأحداث" (Event Delegation) ونظام "الأحداث المركبة" (Synthetic Events).
      عندما تكتب <code dir="ltr">onClick={handleClick}</code> على أي زرار في ريآكت، ريآكت مش بتضيف المستمع على الزرار نفسه في الـ DOM!
      ريآكت بتضيف مستمع وحيد فقط على جذر التطبيق (Root Container: <code dir="ltr">#root</code>)، وتلتقط كل الأحداث الصاعدة (Event Bubbling) وتغلفها في كائن موحد اسمه <code dir="ltr">SyntheticEvent</code> عشان يشتغل بنفس السلوك في كروم وسفاري وفايرفوكس بدون أي فروق.
      في هذا الدرس، هنتعلم إزاي بيشتغل نظام الأحداث في ريآكت 19، إزاي تدمج ريآكت مع مكتبات خارجية بتستخدم Native DOM Events، ولماذا تم إلغاء Event Pooling لتسهيل استخدام async/await في معالجات الأحداث.
    `,
    mechanics: [
      { step: '01', title: 'آلية التفويض المركزي (Centralized Delegation)', desc: 'يتم تسجيل مستمع واحد فقط لكل نوع حدث على حاوية createRoot(#root) بدلاً من عناصر الـ DOM الفردية.' },
      { step: '02', title: 'التغليف في SyntheticEvent', desc: 'عند وقوع الحدث، تنشئ ريآكت كائناً مركباً يوفر نفس واجهة W3C القياسية (target, currentTarget, preventDefault) عبر كل المتصفحات.' },
      { step: '03', title: 'إلغاء Event Pooling نهائياً', desc: 'في ريآكت 17+ و 19، لم يعد كائن الحدث يُعاد تدويره، مما يسمح بقراءة e.target بأمان داخل الدوال اللاتزامنية والـ setTimeout.' },
      { step: '04', title: 'مراحل الحدث: Capture و Bubble في JSX', desc: 'استخدم onClick للمرحلة الصاعدة العادية (Bubble Phase) أو onClickCapture للاعتراض في المرحلة الهابطة (Capture Phase).' },
      { step: '05', title: 'التوافق مع أحداث الـ DOM الأصلية (Native Interop)', desc: 'استخدام e.nativeEvent للوصول للحدث الأصلي للمتصفح عند التعامل مع مكتبات الخرائط أو محررات النصوص المتقدمة.' }
    ],
    playgroundCode: `// محاكي تفويض الأحداث والأحداث المركبة
function handleAction(event, actionName) {
  event.preventDefault();
  console.log(\`Synthetic Event Triggered: [\${actionName}]\`);
  console.log("Target Element:", event.target.tagName);
  
  // تجربة قراءة الحدث لاتزامياً (آمن تماماً في React 19)
  setTimeout(() => {
    console.log("Async target read (No pooling error):", event.target.textContent);
  }, 100);
}

const mockEvent = {
  type: "click",
  target: { tagName: "BUTTON", textContent: "إرسال البيانات" },
  preventDefault() { console.log("Default behavior prevented."); }
};

handleAction(mockEvent, "Form Submit");`,
    experimentQuestion: 'ما الفرق بين e.target و e.currentTarget داخل معالج حدث ريآكت؟',
    experimentAnswer: 'الخاصية e.target تشير إلى العنصر الدقيق الفعلي الذي ضغط عليه المستخدم (مثلاً أيقونة داخل الزر). أما e.currentTarget فتشير دائماً إلى العنصر الذي تم ربط معالج الحدث به في JSX (وهو الزر نفسه).',
    codeAnatomy: [
      { line: 'function SearchForm({ onSearch }) {', note: 'مكون نموذج البحث' },
      { line: '  const handleSubmit = (e) => {', note: 'معالج الحدث يستقبل SyntheticEvent' },
      { line: '    e.preventDefault();', note: 'منع إعادة تحميل الصفحة الافتراضي' },
      { line: '    e.stopPropagation();', note: 'منع صعود الحدث للعناصر الأب' },
      { line: '    onSearch(e.target.query.value);', note: 'قراءة القيمة وتنفيذ البحث' },
      { line: '  };', note: 'نهاية المعالج' },
      { line: '  return <form onSubmit={handleSubmit}>...</form>;', note: 'ربط المعالج بـ onSubmit' },
      { line: '}', note: 'نهاية المكون' }
    ],
    pitfallBad: `// خطأ فادح: استدعاء الدالة فوراً أثناء الـ Render بدلاً من تمرير مرجعها
<button onClick={deleteUser(user.id)}>
  حذف المستخدم
</button> <!-- سيتم تنفيذ الحذف فور رسم الصفحة والدخول في حلقة لانهائية! -->`,
    pitfallGood: `// الحل الصحيح: تمرير دالة سهمية تستدعي الحذف عند الضغط الفعلي
<button onClick={() => deleteUser(user.id)}>
  حذف المستخدم
</button>`,
    pitfallDiagnosis: 'كتابة الأقواس () بعد اسم الدالة داخل JSX يؤدي لتنفيذها في مرحلة الـ Render فوراً وليس عند ضغط المستخدم، مما يسبب أخطاء State updates أثناء العرض.',
    quizPool: [
      {
        q: 'Where does React 19 attach all delegated DOM event listeners?',
        qAr: 'أين تقوم ريآكت 19 بتسجيل جميع مستمعي أحداث الـ DOM المفوضة؟',
        options: [
          'On the root DOM container passed to createRoot(rootContainer).',
          'On the global window object.',
          'Directly on every individual HTML element.',
          'On document.body.'
        ],
        correct: 0,
        why: 'React 17+ and React 19 attach event listeners to the root container node (e.g. #root) enabling safer micro-frontend integration.',
        whyAr: 'تقوم ريآكت بتسجيل المستمعين على حاوية الـ Root المحددة لـ createRoot مما يمنع تعارض الأحداث بين التطبيقات المتعددة.'
      },
      {
        q: 'What was Event Pooling in legacy React, and why was it removed?',
        qAr: 'ما هو الـ Event Pooling في إصدارات ريآكت القديمة، ولماذا تم حذفه؟',
        options: [
          'A performance mechanism that reused event objects, which caused bugs in async callbacks; removed for better DX.',
          'A tool for managing database connections.',
          'A CSS animation engine.',
          'A method to cancel pending fetch requests.'
        ],
        correct: 0,
        why: 'Event pooling wiped event properties after invocation to save memory; modern V8 engines made this optimization unnecessary.',
        whyAr: 'كانت ريآكت تعيد استخدام كائنات الأحداث لتوفير الذاكرة مما يصفر الخصائص في الدوال اللاتزامنية؛ تم إلغاؤه لتحسين تجربة التطوير.'
      },
      {
        q: 'How do you listen to an event in the Capture Phase in React?',
        qAr: 'كيف تستمع لحدث ما في مرحلة الالتقاط الهابطة (Capture Phase) في ريآكت؟',
        options: [
          'Append "Capture" to the event prop name (e.g., onClickCapture).',
          'Pass { capture: true } to the handler.',
          'Use e.capture() inside the handler.',
          'Capture phase is not supported in React.'
        ],
        correct: 0,
        why: 'React provides Capture-phase variants for all supported events by adding the Capture suffix (e.g., onFocusCapture).',
        whyAr: 'توفر ريآكت وسوم مرحلة الالتقاط لجميع الأحداث بإضافة كلمة Capture في نهاية اسم الخاصية مثل onClickCapture.'
      },
      {
        q: 'Why does returning false inside a React event handler NOT stop event propagation?',
        qAr: 'لماذا لا يؤدي إرجاع false من معالج حدث ريآكت إلى منع انتشار الحدث؟',
        options: [
          'React requires explicit calls to e.preventDefault() and e.stopPropagation().',
          'Returning false only works in jQuery.',
          'React ignores return values from all functions.',
          'False is treated as a truthy value in JSX.'
        ],
        correct: 0,
        why: 'Unlike inline HTML attributes or legacy jQuery, React adheres to standard DOM conventions requiring explicit preventDefault calls.',
        whyAr: 'تلتزم ريآكت بمعايير الـ W3C الصارمة وتتطلب استدعاءً صريحاً لدالة e.preventDefault() أو e.stopPropagation().'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة صعود الحدث (Event Bubbling) عندما تضغط على زرار داخل بطاقة Card قابلة للنقر بالكامل؟',
    interviewA: 'الحل المعماري هو استدعاء e.stopPropagation() داخل معالج حدث الزرار الداخلي لمنع وصول حدث الـ Click إلى البطاقة الأم (Card Container). وفي بعض الحالات المعقدة التي تشمل مكونات منبثقة (Portals / Modals)، يجب تذكر أن أحداث ريآكت تصعد عبر شجرة مكونات React Tree حتى لو كان العنصر مرسوماً في مكان آخر في شجرة الـ DOM الحقيقية.'
  },
  {
    slug: 'conditional-rendering',
    title: 'Conditional Rendering Patterns: The 0 && Trap, Polymorphic Components & Early Returns',
    titleAr: 'أنماط العرض الشرطي في ريآكت: فخ الرقم صفر (0 && Trap)، المكونات المتعددة الأشكال والـ Early Returns',
    level: 1,
    order: 5,
    estMinutes: 28,
    version: 'React 19.x',
    pattern: 'Declarative Branching & Guard Clauses',
    objectives: [
      'تجنب الفخ الكارثي الشهير 0 && <Component /> وظهور الرقم 0 على الشاشة للمستخدم.',
      'إتقان استخدام نمط الإرجاع المبكر (Early Returns / Guard Clauses) لتنظيف شجرة الـ JSX.',
      'بناء مكونات متعددة الأشكال (Polymorphic Components) تدعم حالات Loading و Error و Empty و Success.',
      'استخدام الجداول الشرطية (Lookup Tables / Object Maps) كبديل متفوق لسلاسل Ternary المتشعبة.'
    ],
    problemOpening: `
      العرض الشرطي (Conditional Rendering) هو عصب بناء التطبيقات الديناميكية: "لو المستخدم مسجل دخول اعرض صورته، لو التطبيق بيحمل اعرض Skeleton، لو مفيش بيانات اعرض Empty State".
      لكن في ريآكت، هناك خطأ كلاسيكي يقع فيه حتى المطورون المحترفون وهو ما يعرف بـ "The Zero Bug":
      تخيل أنك كتبت كود لعرض قائمة الرسائل:
      <pre dir="ltr"><code>{messages.length && &lt;MessagesList items={messages} /&gt;}</code></pre>
      لو مصفوفة الرسائل فارغة (<code dir="ltr">messages.length = 0</code>)، المتصفح مش هيخفي القائمة ويسكت... المتصفح هيعرض رقم <code dir="ltr">0</code> قبيح جداً في منتصف الصفحة للمستخدمين!
      السبب أن عامل <code dir="ltr">&amp;&amp;</code> في جافاسكريبت يرجع القيمة اليسرى مباشرة إذا كانت Falsy، وبما أن الرقم 0 هو قيمة صالحة للرسم في JSX، فإن ريآكت تقوم برسمه كنص!
      في هذا الدرس، هنتعلم القواعد الذهبية لتفادي أخطاء العرض الشرطي، إزاي نكتب Guard Clauses نظيفة، وإزاي نبني State Machines بصرية باستخدام Lookup Tables.
    `,
    mechanics: [
      { step: '01', title: 'قاعدة البوليان الصارمة لعامل &&', desc: 'حول الطرف الأيسر دائماً إلى قيمة منطقية حقيقية Boolean(items.length) أو items.length > 0 قبل استخدام && لمنع رسم الأصفار والنصوص الفارغة.' },
      { step: '02', title: 'نمط الإرجاع المبكر (Early Return Pattern)', desc: 'معالجة حالات التحميل والأخطاء في بداية الدالة وإرجاع JSX مخصص قبل الدخول في المنطق الرئيسي للمكون.' },
      { step: '03', title: 'العامل الثلاثي للتبديل الثنائي (Ternary Operator)', desc: 'استخدام condition ? <A /> : <B /> عندما يكون هناك مساران إجباريان متبادلان مع الحفاظ على مقروئية الكود.' },
      { step: '04', title: 'خريطة الكائنات للحالات المتعددة (Lookup Map Pattern)', desc: 'تخزين المكونات في كائن { idle: <Idle />, loading: <Spinner />, error: <Error /> } كبديل نظيف لسلاسل switch المتشعبة.' },
      { step: '05', title: 'إخفاء العناصر بصرياً مقابل إلغاء تركيبها (Display None vs Unmounting)', desc: 'فهم متى تفرغ المكون من الذاكرة (Unmount لحذف الـ State) ومتى تخفيه بـ CSS (للاحتفاظ بمدخلات المستخدم).' }
    ],
    playgroundCode: `// محاكي أنماط العرض الشرطي
const state = {
  unreadCount: 0,
  status: "success", // idle | loading | error | success
  data: ["Notification 1", "Notification 2"]
};

// فخ الصفر: 0 && <UI> يطبع 0
const buggyRender = state.unreadCount && "Bad: You have unread items!";
console.log("Buggy render output:", buggyRender); // 0!

// الحل الهندسي الآمن:
const safeRender = state.unreadCount > 0 ? \`\${state.unreadCount} unread\` : null;
console.log("Safe render output:", safeRender); // null (لن يرسم شيء)

// نمط Lookup Table للحالات المتعددة
const stateViews = {
  idle: "⚪ Ready",
  loading: "⏳ Loading data...",
  error: "❌ Failed to load",
  success: \`✅ Data loaded: \${state.data.join(", ")}\`
};

console.log("Lookup view for current status:", stateViews[state.status]);`,
    experimentQuestion: 'ما الفرق في سلوك الـ Component State عندما تخفي مكوناً باستخدام CSS display: none مقارنة بإخفائه عبر العرض الشرطي condition && <Component />؟',
    experimentAnswer: 'مع display: none، يظل المكون مركباً في الـ DOM وشجرة الـ Fiber، ويحتفظ بجميع حالاته (useState, input values, timers). أما مع العرض الشرطي، تقوم ريآكت بإلغاء تركيب المكون بالكامل (Unmounting)، مما يحذف الـ State الخاص به من الذاكرة ويعيد تهيئته من الصفر عند ظهوره مجدداً.',
    codeAnatomy: [
      { line: 'function ProductList({ products, isLoading, error }) {', note: 'مكون يستقبل حالات متعددة' },
      { line: '  if (isLoading) return <SkeletonLoader />;', note: 'حارس الإرجاع المبكر للتحميل' },
      { line: '  if (error) return <ErrorMessage error={error} />;', note: 'حارس الإرجاع المبكر للأخطاء' },
      { line: '  if (products.length === 0) return <EmptyState />;', note: 'حارس الحالة الفارغة' },
      { line: '  return (', note: 'العرض الرئيسي الناجح' },
      { line: '    <ul className="product-grid">', note: 'قائمة المنتجات' },
      { line: '      {products.map(p => <ProductCard key={p.id} item={p} />)}', note: 'رسم العناصر' },
      { line: '    </ul>', note: 'إغلاق القائمة' },
      { line: '  );', note: 'نهاية الـ JSX' },
      { line: '}', note: 'نهاية المكون' }
    ],
    pitfallBad: `// خطأ شائع مسبب لظهور الرقم صفر على الشاشة
<div>
  {cartItems.length && <CheckoutButton count={cartItems.length} />}
</div>`,
    pitfallGood: `// الحلول الهندسية الصحيحة:
<div>
  {cartItems.length > 0 && <CheckoutButton count={cartItems.length} />}
  {/* أو باستخدام التحويل المنطقي: */}
  {Boolean(cartItems.length) && <CheckoutButton count={cartItems.length} />}
</div>`,
    pitfallDiagnosis: 'عندما تكون قيمة cartItems.length = 0، فإن التعبير 0 && <UI> يُرجع 0 مباشرة. ورغم أن boolean false لا يُرسم في JSX، فإن الرقم 0 يُعامل كنص صالح ويظهر على الشاشة.',
    quizPool: [
      {
        q: 'Why does {items.length && <List />} render the number 0 when items is an empty array []?',
        qAr: 'لماذا يظهر الرقم 0 على الشاشة عند كتابة {items.length && <List />} إذا كانت المصفوفة فارغة []؟',
        options: [
          'JavaScript evaluates 0 && <List /> to 0, and React treats numbers as valid renderable content.',
          'React converts empty arrays into the number 0.',
          'It is a bug in the Chrome V8 engine.',
          'The length property returns false in React.'
        ],
        correct: 0,
        why: 'In JS logical AND (&&), if the left operand is falsy, it is returned directly. 0 is a valid number, which React renders as text.',
        whyAr: 'عامل && يرجع الطرف الأيسر مباشرة إذا كان Falsy؛ وبما أن 0 رقم صالح فإن ريآكت ترسمه كنص على الشاشة.'
      },
      {
        q: 'What is the primary benefit of the Early Return pattern in React components?',
        qAr: 'ما هي الفائدة الأساسية لنمط الإرجاع المبكر (Early Return) في مكونات ريآكت؟',
        options: [
          'Simplifies code by eliminating deeply nested ternary expressions and handling edge cases upfront.',
          'Makes the component render faster in WebAssembly.',
          'Prevents React from re-rendering the component.',
          'Automatically logs errors to the console.'
        ],
        correct: 0,
        why: 'Early returns act as clean guard clauses, preventing pyramid-of-doom ternary nesting in JSX.',
        whyAr: 'يعمل كحراس نظيفة تعزل حالات التحميل والخطأ في بداية الدالة وتمنع التداخل المعقد للعوامل الثلاثية.'
      },
      {
        q: 'Which values will React completely ignore and NOT render to the DOM when returned inside JSX?',
        qAr: 'ما هي القيم التي تتجاهلها ريآكت تماماً ولا ترسم أي شيء لها في الـ DOM داخل JSX؟',
        options: [
          'null, undefined, true, and false.',
          'The number 0 and empty strings "".',
          'Empty arrays [].',
          'Negative numbers -1.'
        ],
        correct: 0,
        why: 'React ignores boolean values (true/false), null, and undefined, rendering nothing to the screen.',
        whyAr: 'ريآكت تتجاهل القيم المنطقية true و false وقيمتي null و undefined ولا تعرض أي شيء في المتصفح.'
      },
      {
        q: 'When should you use a Lookup Table object instead of nested ternary operators in JSX?',
        qAr: 'متى يفضل استخدام نمط كائن القاموس (Lookup Table) بدلاً من العوامل الثلاثية المتداخلة؟',
        options: [
          'When switching between 3 or more distinct UI states (e.g. status: idle, loading, error, success).',
          'Only for rendering static text without JSX.',
          'To bypass TypeScript type checking.',
          'When components have no props.'
        ],
        correct: 0,
        why: 'Object lookup tables provide readable O(1) declarative dispatch for multi-state rendering without ternary nesting.',
        whyAr: 'توفر خريطة الكائنات وسيلة تقريرية واضحة ونظيفة للتبديل بين 3 حالات أو أكثر دون تعقيد التداخل.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تؤثر تقنية Conditional Rendering على دقة حسابات مؤشر أداء الويب Cumulative Layout Shift (CLS)؟',
    interviewA: 'التبديل المفاجئ بين المكونات (مثلاً من Loading Spinner صغير إلى بطاقة بيانات ضخمة بعد اكتمال الـ Fetch) يؤدي إلى قفزات بصرية في تخطيط الصفحة (Layout Shifts) مما يضر بدرجة الـ CLS في معايير جوجل Core Web Vitals. لتفادي ذلك معمارياً، نستخدم Skeleton Loaders تحاكي أبعاد ومساحة المكون النهائي بالضبط، أو نثبت ارتفاع الحاوية min-height مسبقاً.'
  },
  {
    slug: 'lists-keys',
    title: 'Lists, Keys & Reconciliation: Identity Preservation & Index Anti-Pattern',
    titleAr: 'القوائم والمفاتيح في ريآكت: الحفاظ على هوية المكونات وفخ استخدام Index كـ Key',
    level: 1,
    order: 6,
    estMinutes: 30,
    version: 'React 19.x Fiber Diffing',
    pattern: 'Identity Preservation & Reconciliation',
    objectives: [
      'فهم خوارزمية المطابقة (Reconciliation Algorithm) ودور الخاصية key في الحفاظ على هوية عقد Fiber.',
      'تجنب الفخ الكارثي لاستخدام key={index} في القوائم القابلة للحذف أو الترتيب أو الفلترة.',
      'استخدام crypto.randomUUID() أو معرفات قاعدة البيانات الثابتة لتأمين استقرار الـ State الداخلي.',
      'معرفة متى تستخدم الخاصية key لإعادة تهيئة (Reset) حالة مكون ما قسرياً.'
    ],
    problemOpening: `
      كل مطور ريآكت رأى التحذير الشهير في الـ Console: <code dir="ltr">Warning: Each child in a list should have a unique "key" prop</code>.
      الحل السريع الذي يلجأ إليه المبتدئ هو كتابة <code dir="ltr">items.map((item, index) => &lt;Card key={index} /&gt;)</code> لإخفاء التحذير.
      لكن هذا "الحل السريع" هو قنبلة موقوتة في تطبيقك!
      تخيل أن عندك قائمة مهام (Todo List) وكل عنصر فيه Checkbox أو Input لكتابة ملاحظات. عندما يحذف المستخدم العنصر الأول من القائمة، ماذا يحدث؟
      ريآكت تقارن القائمة القديمة بالجديدة بناءً على الـ Keys (0, 1, 2). وبما أن العنصر الثاني أصبح يحمل index = 0، ستعتقد ريآكت أن العنصر الأول لم يُحذف بل تم تعديل نصوصه فقط، وستحتفظ بالـ State الداخلي للعنصر الأول (الـ Checkbox المعلم) وتنطله للعنصر الجديد!
      في هذا الدرس، هنغوص في خوارزمية الـ Diffing في ريآكت، وهنفهم ليه الـ Key هو "بطاقة الهوية الوطنية" لكل مكون في شجرة الـ Fiber.
    `,
    mechanics: [
      { step: '01', title: 'خوارزمية مطابقة القوائم O(n)', desc: 'تعتمد ريآكت على الـ Keys لمطابقة العناصر القديمة بالجديدة لتفادي إعادة بناء شجرة الـ DOM بالكامل O(n^3).' },
      { step: '02', title: 'كارثة استخدام Index كـ Key', desc: 'عند الحذف أو الترتيب، تتغير أرقام الـ Index لكل العناصر اللاحقة، مما يربك ريآكت ويؤدي لتسريب الـ State الداخلي (Uncontrolled Inputs, Animations).' },
      { step: '03', title: 'شروط الـ Key المثالي', desc: 'يجب أن يكون فريداً بين أشقائه (Unique among siblings)، ثابتاً لا يتغير مع كل Render (Stable)، ومرتبطاً بهوية البيانات الفعلية (مثل item.id).' },
      { step: '04', title: 'إعادة تهيئة المكون قسرياً بـ Key Reset', desc: 'تغيير قيمة key على مكون عادي <UserProfile key={userId} /> يجبر ريآكت على حذف المكون القديم وإنشاء نسخة جديدة تماماً بـ State مصفى.' },
      { step: '05', title: 'توليد المفاتيح المؤقتة بأمان', desc: 'استخدم crypto.randomUUID() فقط عند إنشاء العنصر وتخزينه في الـ State، ولا تولد أرقاماً عشوائية Math.random() داخل جملة الـ map مباشرة.' }
    ],
    playgroundCode: `// محاكي مقارنة الـ Keys وسلوك الحذف
const previousList = [
  { id: "u101", name: "Ahmed", checked: true },
  { id: "u102", name: "Mona", checked: false },
  { id: "u103", name: "Kareem", checked: false }
];

// محاكاة حذف العنصر الأول: Ahmed
const nextList = [
  { id: "u102", name: "Mona", checked: false },
  { id: "u103", name: "Kareem", checked: false }
];

console.log("With Stable ID Keys:");
console.log("Deleted item correctly identified:", "u101 removed from DOM");
console.log("Mona keeps checked=false:", nextList[0].checked === false);

console.log("\nWith Index Keys (Bug simulation):");
console.log("Index 0 was checked=true (Ahmed), now Mona takes Index 0!");
console.log("Visual Glitch: Mona appears checked because DOM state was attached to key=0!");`,
    experimentQuestion: 'ماذا يحدث إذا كتبت key={Math.random()} داخل حلقة map() في JSX؟',
    experimentAnswer: 'مع كل عملية إعادة رسم (Re-render)، سيتم توليد مفتاح عشوائي جديد تماماً لكل عنصر. ريآكت ستعتقد أن جميع العناصر القديمة قد حُذفت وأن عناصر جديدة تماماً ظهرت، مما يدمر أداء التطبيق، ويلغي التركيب والتأثيرات الحركية (CSS Transitions)، ويفقد جميع مدخلات المستخدم والـ Focus في الحقول.',
    codeAnatomy: [
      { line: 'const UserList = ({ users, onDelete }) => (', note: 'مكون القائمة' },
      { line: '  <ul className="user-list">', note: 'عنصر القائمة' },
      { line: '    {users.map(user => (', note: 'المرور على العناصر' },
      { line: '      <UserRow', note: 'المكون الفرعي' },
      { line: '        key={user.id}', note: 'مفتاح ثابت وفريد مستمد من معرف البيانات' },
      { line: '        user={user}', note: 'تمرير البيانات' },
      { line: '        onDelete={onDelete}', note: 'تمرير الدالة' },
      { line: '      />', note: 'إغلاق المكون' },
      { line: '    ))}', note: 'نهاية التحويل' },
      { line: '  </ul>', note: 'إغلاق القائمة' },
      { line: ');', note: 'نهاية المكون' }
    ],
    pitfallBad: `// خطأ شائع جداً: استخدام index كـ key في قائمة ديناميكية قابلة للتعديل
<ul>
  {todos.map((todo, index) => (
    <TodoItem key={index} text={todo.text} />
  ))}
</ul>`,
    pitfallGood: `// الحل الصحيح: استخدام المعرف الفريد الدائم
<ul>
  {todos.map(todo => (
    <TodoItem key={todo.id} text={todo.text} />
  ))}
</ul>`,
    pitfallDiagnosis: 'استخدام index كـ key يجعل المفاتيح تعتمد على موضع العنصر في المصفوفة وليس على هويته. عند الحذف أو إعادة الترتيب، تفشل خوارزمية المطابقة في تتبع الحالة الداخلية للمكونات الفرعية.',
    quizPool: [
      {
        q: 'Why is using array index as a key in dynamic lists considered an anti-pattern in React?',
        qAr: 'لماذا يعتبر استخدام index المصفوفة كـ key في القوائم الديناميكية Anti-Pattern في ريآكت؟',
        options: [
          'It breaks component identity during insertion/deletion, causing state leaks and UI rendering glitches.',
          'React does not allow numbers as keys.',
          'It increases the bundle size of the app.',
          'Index keys only work in class components.'
        ],
        correct: 0,
        why: 'Index keys change when items are added, removed, or reordered, corrupting uncontrolled component state and animations.',
        whyAr: 'قيم الـ Index تتغير عند الحذف أو الإضافة أو الترتيب، مما يؤدي لنقل الحالة الداخلية للعنصر الخطأ وتشويه الواجهة.'
      },
      {
        q: 'How can you force a React component to completely reset its internal state from scratch?',
        qAr: 'كيف يمكنك إجبار مكون في ريآكت على تصفير حالته الداخلية (Reset State) بالكامل من الصفر؟',
        options: [
          'Change its key prop to a new value (e.g., <Form key={userId} />).',
          'Call this.forceUpdate() from a hook.',
          'Set all props to undefined.',
          'Reload the entire browser tab.'
        ],
        correct: 0,
        why: 'Changing the key prop signals to React that the old component identity was removed and a fresh instance must be created.',
        whyAr: 'تغيير خاصية الـ key يخبر ريآكت أن المكون القديم تم حذفه ويجب إنشاء نسخة جديدة تماماً بحالة مصفاة.'
      },
      {
        q: 'Where must the key prop be placed when rendering a list of sub-components in a map() loop?',
        qAr: 'أين يجب وضع خاصية key تحديداً عند رسم قائمة بمكونات فرعية داخل حلقة map()؟',
        options: [
          'On the outermost JSX element returned directly inside the map() callback.',
          'Inside the child component root div.',
          'On the parent <ul> container.',
          'On every HTML tag within the child component.'
        ],
        correct: 0,
        why: 'The key must be placed on the immediate element returned by the map callback so React can match array siblings.',
        whyAr: 'يجب وضع الـ key على العنصر المباشر الخارجي المُرجع داخل الـ callback الخاص بـ map ليتمكن من مطابقة الأشقاء.'
      },
      {
        q: 'What makes a valid key in React reconciliation?',
        qAr: 'ما هي الشروط التي تجعل الـ Key صالحاً ومثالياً في مطابقة ريآكت؟',
        options: [
          'Unique among siblings and permanently stable across re-renders for the same data entity.',
          'Globally unique across the entire application.',
          'Must be a generated random string on every render.',
          'Must match the component function name.'
        ],
        correct: 0,
        why: 'Keys only need to be unique among sibling elements in the same list and must remain constant across renders.',
        whyAr: 'يجب أن يكون المفتاح فريداً بين العناصر الشقيقة في نفس القائمة وثابتاً لا يتغير مع كل إعادة رسم لنفس البيانات.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: اشرح كيف تستخدم ريآكت بنية الـ Fiber Linked List للمطابقة ومقارنة الأشقاء (Child Reconciler) عندما يكون للعناصر Keys ثابتة؟',
    interviewA: 'في معمارية React Fiber، يتم تمثيل العناصر كشجرة عقد مترابطة (Singly Linked List: child, sibling, return). عند مطابقة مصفوفة من العناصر، تقوم ريآكت بإنشاء خريطة Map مؤقتة مفاتيحها هي الـ keys وقيمها هي عقد الـ Fiber القديمة. عندما تمر على العناصر الجديدة، تقوم بالبحث السريع O(1) في الـ Map بالاعتماد على الـ Key، فإذا وجدته تقوم بإعادة استخدام نفس عقدة الـ Fiber والـ DOM Node الحقيقي وتحرك موضعه فقط (Placement)، مما يوفر تكلفة إنشاء عناصر DOM جديدة ويحقق أقصى أداء ممكن.'
  },
  {
    slug: 'component-patterns',
    title: 'Component Architecture: Compound Components, Render Props & Polymorphic Elements',
    titleAr: 'أنماط معمارية المكونات: المكونات المركبة (Compound Components) والعناصر المتعددة الأشكال (as Prop)',
    level: 2,
    order: 7,
    estMinutes: 35,
    version: 'React 19.x Architecture',
    pattern: 'Advanced Component Composition',
    objectives: [
      'بناء واجهات مستخدم معقدة ومرنة باستخدام نمط المكونات المركبة (Compound Components Pattern).',
      'مشاركة الحالة بين المكونات المتداخلة ضمنياً عبر React Context الداخلي.',
      'بناء مكونات مرنة متعددة الأشكال (Polymorphic Components) تدعم خاصية as="button" | as="a".',
      'تطبيق مبدأ المسؤولية الواحدة (Single Responsibility Principle) وفصل مكونات العرض (Presentational) عن المنطق (Container).'
    ],
    problemOpening: `
      عندما يبدأ أي مشروع ريآكت، تكون المكونات بسيطة. لكن مع نمو التطبيق وتراكم متطلبات التصميم، يتحول المكون البسيط (مثل <code dir="ltr">&lt;Select /&gt;</code> أو <code dir="ltr">&lt;Modal /&gt;</code>) إلى وحش برمجى يعاني من "تضخم الخصائص" (Props Explosion / Prop Apocalypse)!
      تجد المطور يمرر 25 prop مختلف: <code dir="ltr">showIcon</code>, <code dir="ltr">iconPosition</code>, <code dir="ltr">headerTitle</code>, <code dir="ltr">footerButtons</code>, <code dir="ltr">onHeaderClick</code>... كود صلب، غير مرن، وأي تعديل بسيط في التصميم يجبرك على تعديل المكون الأصلي وإضافة المزيد من الخصائص!
      الحل الهندسي المعتمد في كبرى مكتبات الواجهات العالمية (مثل Radix UI و Headless UI و Shadcn) هو نمط **المكونات المركبة (Compound Components)** مثل:
      <pre dir="ltr"><code>&lt;Select value={val} onChange={setVal}&gt;
  &lt;Select.Trigger /&gt;
  &lt;Select.Content&gt;
    &lt;Select.Item value="1"&gt;Option 1&lt;/Select.Item&gt;
  &lt;/Select.Content&gt;
&lt;/Select&gt;</code></pre>
      في هذا الدرس، هنتعلم إزاي نبني مكتبة مكونات احترافية مرنة، تشارك حالتها الداخلية بسلاسة عبر Context معزول، وتمنح المطورين حرية كاملة في تخصيص الهيكل البصري.
    `,
    mechanics: [
      { step: '01', title: 'تصميم سياق المكون المركب المعزول', desc: 'إنشاء Context خاص محلي بالمكون الأم لتخزين الحالة المشتركة (مثل isOpen و activeIndex) ودوال التبديل.' },
      { step: '02', title: 'بناء المكونات الفرعية التابعة (Sub-components)', desc: 'تفكيك الواجهة إلى قطع مستقلة: Trigger للفتح/الإغلاق، Content للحاوية، و Item للعناصر الفردية.' },
      { step: '03', title: 'ربط المكونات عبر الـ Namespaces', desc: 'ربط المكونات الفرعية كخصائص ساكنة على المكون الأم Accordion.Item = AccordionItem لتسهيل الاستيراد والتنظيم.' },
      { step: '04', title: 'المكونات متعددة الأشكال (Polymorphic as Prop)', desc: 'دعم خاصية as={Link} أو as="button" للسماح للمكون بتغيير الوسم الأساسي مع الحفاظ على التنسيقات والسلوك.' },
      { step: '05', title: 'حماية المكونات بحراس السياق (Context Guards)', desc: 'رمي خطأ واضح إذا تم استخدام المكون الفرعي خارج الحاوية الأم المخصصة له لضمان سلامة الاستخدام.' }
    ],
    playgroundCode: `// محاكي نمط Compound Component لـ Tabs
const TabContext = { activeTab: "tab1" };

function Tabs({ defaultTab, children }) {
  console.log("Initializing Tabs with default:", defaultTab);
}

function TabList({ children }) { console.log("Rendering Tab List wrapper"); }
function Tab({ id, label }) {
  const isActive = TabContext.activeTab === id;
  console.log(\`Tab [\${label}] Active: \${isActive}\`);
}
function TabPanel({ id, content }) {
  if (TabContext.activeTab === id) {
    console.log(\`Showing Panel Content: \${content}\`);
  }
}

// محاكاة الاستخدام
Tabs({ defaultTab: "tab1" });
TabList();
Tab({ id: "tab1", label: "Overview" });
Tab({ id: "tab2", label: "Settings" });
TabPanel({ id: "tab1", content: "Welcome to Account Overview" });`,
    experimentQuestion: 'ما هي فائدة استخدام خاصية asChild المعتمدة في مكتبة Radix UI بدلاً من خاصية as التقليدية في المكونات المركبة؟',
    experimentAnswer: 'خاصية asChild تطبق نمط الـ Slot Pattern: بدلاً من إنشاء وسم جديد وتمرير الـ props له، تقوم بدمج الـ props ومعالجات الأحداث والـ Refs الخاصة بالمكون مباشرة في العنصر الابن الوحيد الممرر له (CloneElement with Merged Props)، مما يمنح المطور تحكماً كاملاً بنسبة 100% في شجرة الـ DOM بدون أي حاويات وسيطة.',
    codeAnatomy: [
      { line: 'const AccordionContext = createContext(null);', note: 'إنشاء سياق معزول' },
      { line: 'export function Accordion({ children, defaultOpen = null }) {', note: 'المكون الحاوي الأم' },
      { line: '  const [openId, setOpenId] = useState(defaultOpen);', note: 'الحالة المشتركة الداخلية' },
      { line: '  return (', note: 'توفير السياق' },
      { line: '    <AccordionContext.Provider value={{ openId, setOpenId }}>', note: 'توزيع الحالة والتحكم للأبناء' },
      { line: '      <div className="accordion-root">{children}</div>', note: 'هيكل الحاوية' },
      { line: '    </AccordionContext.Provider>', note: 'نهاية المزود' },
      { line: '  );', note: 'نهاية المكون الأم' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع: مكون وحش ممتلئ بـ 20 prop غير مرن
<Modal
  isOpen={open}
  title="Edit Profile"
  bodyContent={<Form />}
  footerPrimaryText="Save"
  footerSecondaryText="Cancel"
  showCloseIcon={true}
  onPrimaryClick={save}
/>`,
    pitfallGood: `// الحل المعماري الأنيق: نمط المكونات المركبة (Compound Pattern)
<Modal open={open} onOpenChange={setOpen}>
  <Modal.Header>
    <Modal.Title>Edit Profile</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <ProfileForm />
  </Modal.Body>
  <Modal.Footer>
    <Modal.Close as="button">Cancel</Modal.Close>
    <Button onClick={save}>Save</Button>
  </Modal.Footer>
</Modal>`,
    pitfallDiagnosis: 'المكونات التي تعتمد على عشرات الـ Props الصلبة تنكسر مع أي تغيير في متطلبات التصميم وتصعب صيانتها، بينما Compound Components تفصل المسؤوليات وتمنح تحكماً كلياً في بنية الـ JSX.',
    quizPool: [
      {
        q: 'What is the primary architectural advantage of the Compound Components pattern?',
        qAr: 'ما هي الميزة المعمارية الأساسية لنمط المكونات المركبة (Compound Components)؟',
        options: [
          'Enables flexible UI layout composition while implicitly sharing state via React Context, avoiding prop drilling and prop bloat.',
          'Compiles the component directly into WebAssembly.',
          'Automatically connects to a Redux store.',
          'Eliminates the need for CSS styling.'
        ],
        correct: 0,
        why: 'Compound components communicate via context, allowing callers to assemble the UI structure freely without passing dozens of configuration props.',
        whyAr: 'تتواصل المكونات الفرعية عبر Context داخلي، مما يتيح للمطورين تشكيل هيكل الواجهة بحرية تامة دون تضخم الـ Props.'
      },
      {
        q: 'How does a Polymorphic Component behave in React?',
        qAr: 'كيف يتصرف المكون متعدد الأشكال (Polymorphic Component) في ريآكت؟',
        options: [
          'It can dynamically render as different underlying HTML elements or components via an "as" prop (e.g. as="a" vs as="button").',
          'It renders multiple instances simultaneously across threads.',
          'It changes its styles based on screen resolution only.',
          'It generates random HTML tags.'
        ],
        correct: 0,
        why: 'Polymorphic components use an "as" property to dynamically swap the rendered root tag while retaining shared styles and behavior.',
        whyAr: 'المكون متعدد الأشكال يستخدم خاصية "as" لتغيير الوسم الجذري المرسوم (مثل button أو a) مع الحفاظ على التنسيقات المشتركة.'
      },
      {
        q: 'What should a Compound sub-component hook do if used outside of its required parent Provider?',
        qAr: 'ما الذي يجب أن يفعله الـ Hook المخصص للمكون الفرعي إذا تم استخدامه خارج المزود الأب المخصص له؟',
        options: [
          'Throw a descriptive runtime Error explaining that the component must be wrapped in the parent Provider.',
          'Silently return null and crash.',
          'Create a global state automatically.',
          'Render a red border.'
        ],
        correct: 0,
        why: 'Throwing an explicit error (Context Guard) immediately alerts developers to incorrect composition during development.',
        whyAr: 'رمي خطأ استثنائي صريح ينبه المطور فوراً إلى أنه استخدم المكون الفرعي في مكان غير صحيح خارج الحاوية الأم.'
      },
      {
        q: 'Why attach sub-components directly to the parent component namespace (e.g., Select.Option = Option)?',
        qAr: 'لماذا يتم ربط المكونات الفرعية كخصائص ساكنة على المكون الأب مثل Select.Option = Option؟',
        options: [
          'Provides a clear, cohesive API namespace and simplifies imports for consumers (importing only Select).',
          'Makes the code execute twice as fast.',
          'It is required by the JavaScript compiler.',
          'Prevents re-renders.'
        ],
        correct: 0,
        why: 'Static assignment groups related components under a single root export, improving discoverability and import ergonomics.',
        whyAr: 'تجميع المكونات المرتبطة تحت تصدير واحد يسهل عملية الاستيراد ويمنح واجهة برمجية واضحة ومنظمة للمطورين.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تطبق TypeScript Generics مع Polymorphic Components لضمان صحة الـ Type Checking للـ Props المخصصة (مثل href لـ a و type لـ button)؟',
    interviewA: 'نستخدم نمط Polymorphic Component Type في TypeScript: نحدد نوع المكون كـ Generic <E extends React.ElementType = "div">، ونعرف الـ Props بـ React.ComponentPropsWithoutRef<E> & { as?: E }. هذا يضمن أنك لو مررت as="a"، سيجبرك المحرر على تمرير href ويقترح خصائص الروابط فقط، ولو مررت as="button"، سيقترح type="submit" ويمنع تمرير href، محققاً Type Safety مطلقاً على مستوى الـ Compile Time.'
  },
  {
    slug: 'use-reducer',
    title: 'useReducer: Complex State Machines, Discriminated Unions & Lazy Init',
    titleAr: 'خطاف useReducer: آلات الحالة المعقدة (State Machines)، والتهيئة الكسولة (Lazy Init)',
    level: 2,
    order: 8,
    estMinutes: 32,
    version: 'React 19.x Fiber',
    pattern: 'Predictable State Machine & Reducer Composition',
    objectives: [
      'فهم متى تختار useReducer كبديل معماري متفوق لـ useState في إدارة الحالات المتشابكة.',
      'تصميم دوال Reducers نقية (Pure Functions) باستخدام نمط Discriminated Unions في جافاسكريبت و TypeScript.',
      'تطبيق مبدأ استحالة الحالات غير الصالحة (Making Impossible States Impossible).',
      'استخدام المعامل الثالث (Lazy Initializer) لحساب الحالة الابتدائية الثقيلة بكفاءة.'
    ],
    problemOpening: `
      عندما تبني استمارة معقدة (Multi-step Form) أو شاشة تداول، تجد نفسك تكتب 6 أو 7 خطافات <code dir="ltr">useState</code> منفصلة:
      <pre dir="ltr"><code>const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);</code></pre>
      الكارثة هنا هي "الحالات المستحيلة" (Impossible States): من الممكن برمجياً بسبب خطأ غير مقصود أن تصبح <code dir="ltr">isLoading: true</code> و <code dir="ltr">error: "Failed"</code> و <code dir="ltr">isSuccess: true</code> في نفس اللحظة! الواجهة ستصاب بالجنون: هل تعرض الـ Spinner أم رسالة الخطأ أم شاشة النجاح؟
      خطاف <code dir="ltr">useReducer</code> يعالج هذه الفوضى بتحويل إدارة الحالة إلى **آلة حالة محدودة (Finite State Machine)** منضبطة.
      الحالة تتغير فقط عبر إرسال "أفعال صريحة" (Dispatched Actions)، ودالة الـ Reducer تضمن الانتقال الصارم من حالة إلى أخرى، مما يجعل اختبار المنطق مستقلاً تماماً عن واجهة المستخدم.
    `,
    mechanics: [
      { step: '01', title: 'عقد دالة الـ Reducer النقية', desc: 'دالة نقية تستقبل الحالة الحالية والإجراء (state, action) وتُرجع الحالة الجديدة فقط بدون أي آثار جانبية (No Side Effects/No API Calls).' },
      { step: '02', title: 'هيكلة الإجراءات بـ Action Objects', desc: 'كل إجراء يحمل نوعاً مميزاً { type: "FETCH_SUCCESS", payload: responseData } لتحديد مسار التحول.' },
      { step: '03', title: 'إرسال الإجراءات عبر dispatch()', desc: 'دالة dispatch مستقرة المرجع ولا تتغير بين عمليات الـ Render، مما يجعلها آمنة للتمرير للمكونات الفرعية بدون إعادة رسم.' },
      { step: '04', title: 'التهيئة الكسولة (Lazy Initialization via init)', desc: 'تمرير دالة كمعامل ثالث useReducer(reducer, initialArg, init) لحساب الحالة الابتدائية المعقدة مرة واحدة فقط عند التركيب.' },
      { step: '05', title: 'منع تعديل الحالة المباشر (Immutable State Updates)', desc: 'استخدام Spread Operator return { ...state, count: state.count + 1 } لضمان تغيير المرجع واستشعار ريآكت للتحديث.' }
    ],
    playgroundCode: `// محاكي آلة الحالة المحدودة باستخدام Reducer
const initialState = { status: "idle", data: null, error: null };

function authReducer(state, action) {
  switch (action.type) {
    case "SUBMIT":
      return { status: "loading", data: null, error: null };
    case "RESOLVE":
      return { status: "success", data: action.payload, error: null };
    case "REJECT":
      return { status: "error", data: null, error: action.error };
    case "RESET":
      return initialState;
    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

let currentState = initialState;
function dispatch(action) {
  currentState = authReducer(currentState, action);
  console.log(\`Action [\${action.type}] -> New State:\`, currentState);
}

// محاكاة دورة حياة تسجيل الدخول
dispatch({ type: "SUBMIT" });
dispatch({ type: "RESOLVE", payload: { user: "Sarah", token: "JWT-12345" } });
console.log("Impossible state prevented: status is strictly success!");`,
    experimentQuestion: 'لماذا يجب أن تكون دالة الـ Reducer دالة نقية (Pure Function) خالية تماماً من الـ Side Effects مثل fetch أو localStorage؟',
    experimentAnswer: 'في بيئة Strict Mode وميزات Concurrent React (مثل startTransition أو Suspense)، قد تقوم ريآكت باستدعاء دالة الـ Reducer عدة مرات لحساب الفروق دون تطبيق التحديث فعلياً. إذا كانت الدالة تحتوي على آثار جانبية مثل استدعاء API أو تعديل متغير عام، ستتكرر هذه العمليات بشكل غير متوقع وتحدث تسريبات وكوارث في البيانات.',
    codeAnatomy: [
      { line: 'const [state, dispatch] = useReducer(reducer, initialArg, init);', note: 'تهيئة خطاف useReducer مع دالة init الكسولة' },
      { line: 'dispatch({ type: "CART_ADD_ITEM", payload: newItem });', note: 'إرسال إجراء محدد مع البيانات' },
      { line: 'function reducer(state, action) {', note: 'دالة التحويل النقية' },
      { line: '  switch (action.type) {', note: 'فحص نوع الإجراء' },
      { line: '    case "CART_ADD_ITEM":', note: 'معالجة إضافة عنصر' },
      { line: '      return { ...state, items: [...state.items, action.payload] };', note: 'تحديث غير تعديلي لإنتاج كائن جديد' },
      { line: '    default:', note: 'الحالة الافتراضية' },
      { line: '      return state;', note: 'إرجاع الحالة كما هي' },
      { line: '  }', note: 'نهاية التبديل' },
      { line: '}', note: 'نهاية الـ Reducer' }
    ],
    pitfallBad: `// خطأ كارثي: تعديل الحالة الأصلية مباشرة داخل الـ Reducer
case "ADD_TODO":
  state.todos.push(action.payload); // Mutation مباشر يدمر ريآكت!
  return state; // المرجع لم يتغير ولن يحدث Re-render`,
    pitfallGood: `// الحل الصحيح: إنتاج مصفوفة جديدة وكائن جديد
case "ADD_TODO":
  return {
    ...state,
    todos: [...state.todos, action.payload]
  }; // مرجع جديد يضمن تحديث الواجهة بنجاح`,
    pitfallDiagnosis: 'محرك ريآكت يقارن الحالة السابقة بالجديدة بـ Object.is(oldState, newState). تعديل المصفوفة بالـ push يغير المحتوى الداخلي مع بقاء نفس المرجع، فتتجاهل ريآكت التحديث.',
    quizPool: [
      {
        q: 'What are the arguments received by a standard React reducer function?',
        qAr: 'ما هي المعاملات التي تستقبلها دالة الـ Reducer في ريآكت؟',
        options: [
          '(state, action) => newState',
          '(dispatch, action) => void',
          '(prevState, nextState) => boolean',
          '(action, payload) => state'
        ],
        correct: 0,
        why: 'Reducers take current state and an action object, returning the next immutable state tree.',
        whyAr: 'تستقبل دالة الـ Reducer الحالة الحالية وكائن الإجراء، وتُرجع شجرة الحالة الجديدة غير القابلة للتعديل.'
      },
      {
        q: 'When should you prefer useReducer over multiple useState calls?',
        qAr: 'متى تفضل استخدام useReducer على استخدام خطافات useState المتعددة؟',
        options: [
          'When state logic is complex with multiple interdependent sub-values, or when the next state depends on the previous state in complex ways.',
          'Only when building Redux applications.',
          'Whenever you have more than one variable.',
          'To make asynchronous API calls.'
        ],
        correct: 0,
        why: 'useReducer centralizes complex state transitions, eliminates impossible states, and decouples state logic from component rendering.',
        whyAr: 'يوحد useReducer التحولات المعقدة ويقضي على الحالات المستحيلة ويفصل منطق الحالة تماماً عن كود العرض.'
      },
      {
        q: 'What is the purpose of the 3rd argument (init) in useReducer(reducer, initialArg, init)?',
        qAr: 'ما هي وظيفة المعامل الثالث (init) في استدعاء useReducer(reducer, initialArg, init)؟',
        options: [
          'Lazy initializer function to compute initial state only once during component mount.',
          'A callback executed after every state change.',
          'An error handler for the reducer.',
          'A middleware for logging actions.'
        ],
        correct: 0,
        why: 'The init function allows computing initial state lazily on mount, avoiding recalculations on subsequent re-renders.',
        whyAr: 'دالة init تسمح بحساب الحالة الابتدائية المعقدة بشكل كسول لمرة واحدة فقط عند تركيب المكون.'
      },
      {
        q: 'Is the dispatch function returned by useReducer stable across re-renders?',
        qAr: 'هل دالة dispatch المُرجعة من useReducer مستقرة المرجع عبر عمليات إعادة الرسم؟',
        options: [
          'Yes, React guarantees dispatch has a stable identity and will never change between renders.',
          'No, it changes on every single render.',
          'Only if wrapped in useCallback.',
          'Only in production mode.'
        ],
        correct: 0,
        why: 'React guarantees dispatch identity stability, making it safe to omit from useEffect/useCallback dependency arrays.',
        whyAr: 'تضمن ريآكت استقرار مرجع دالة dispatch بشكل دائم مما يتيح تمريرها دون التسبب في إعادة رسم غير مرغوبة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ نمط Reducer Composition لتقسيم Reducer ضخم يحتوي على 50 حالة إلى Reducers فرعية معيارية ونظيفة؟',
    interviewA: 'نطبق نمط Reducer Composition بإنشاء Root Reducer يستدعي دوال Reducers فرعية متخصصة (مثل userReducer, cartReducer, uiReducer)، حيث يستقبل كل Reducer فرعي الجزء الخاص به فقط من الحالة return { user: userReducer(state.user, action), cart: cartReducer(state.cart, action) }. هذا النمط يحاكي دالة combineReducers الشهيرة في Redux ويحافظ على نقاء وسهولة اختبار وصيانة كل فرع من فروع الحالة بشكل مستقل تماماً.'
  },
  {
    slug: 'use-context',
    title: 'Context API: Eliminating Prop Drilling, Context Splitting & Performance Traps',
    titleAr: 'واجهة Context API: القضاء على تمرير الخصائص المضني (Prop Drilling) وتقسيم السياقات للأداء العالي',
    level: 2,
    order: 9,
    estMinutes: 30,
    version: 'React 19.x',
    pattern: 'Dependency Injection & Context Splitting',
    objectives: [
      'حل مشكلة تمرير الخصائص عبر طبقات متعددة (Prop Drilling) بطريقة معمارية منضبطة.',
      'تجنب فخ إعادة الرسم الشامل (Re-render Cascade Trap) وتطبيق نمط تقسيم السياقات (Context Splitting).',
      'فهم واجهة use() الجديدة في React 19 لقراءة السياق شرطياً داخل الدوال والحلقات.',
      'التمييز بين البيانات المناسبة لـ Context (مثل Theme, Auth, Locale) والبيانات سريعة التغير (High-frequency state).'
    ],
    problemOpening: `
      في أي تطبيق ريآكت حقيقي، تجد أن بيانات المستخدم المسجل (Auth User) أو الثيم المختار (Dark/Light) تحتاجها عشرات المكونات المنتشرة في أطراف شجرة الواجهة: في النافبار، في السايدبار، في كروت المقالات، وفي الفوتر.
      المبرمج المبتدئ يبدأ بتمرير <code dir="ltr">user={user}</code> من المكون الجذري App عبر 6 طبقات من المكونات الوسيطة التي لا تحتاج هذه البيانات على الإطلاق لمجرد إيصالها للمكون النهائي في الأسفل! هذه المعاناة البرمجية تُعرف بـ **Prop Drilling**.
      واجهة **Context API** صُممت لتكون "مصعداً فضائياً" ينقل البيانات مباشرة من المزود (Provider) إلى أي مكون مستهلك (Consumer) في أي عمق من الشجرة بضغطة زر.
      لكن استخدام Context بطريقة عشوائية قد يدمر أداء التطبيق: كلما تغيرت قيمة واحدة في كائن الـ Context الضخم، ستجبر ريآكت كل المكونات المشتركة في هذا السياق على إعادة الرسم (Re-render) حتى لو كانت لا تستخدم القيمة المتغيرة!
      في هذا الدرس، هنتعلم إزاي نبني Custom Context Providers احترافية، إزاي نطبق نمط **Context Splitting** لفصل الحالة عن دوال التحديث، وإزاي نستخدم خطاف <code dir="ltr">use()</code> الجديد في ريآكت 19.
    `,
    mechanics: [
      { step: '01', title: 'إنشاء السياق وتحديد القيمة الافتراضية', desc: 'استخدام createContext(defaultValue) لتعريف شكل البيانات وتوفير قيمة احتياطية آمنة للاختبارات المعزولة.' },
      { step: '02', title: 'تغليف الشجرة بالـ Provider المخصص', desc: 'إنشاء Custom Provider يغلف الحالة ومنطق التحديث ويوفر واجهة برمجية واضحة ومحمية للمستهلكين.' },
      { step: '03', title: 'استهلاك السياق عبر Custom Hooks', desc: 'بناء Hook مثل useAuth() يفحص وجود الـ Provider ويرمي خطأ واضحاً إذا تم استدعاؤه في مكان خاطئ.' },
      { step: '04', title: 'تقسيم السياق لتحسين الأداء (Context Splitting Pattern)', desc: 'فصل السياق إلى اثنين: StateContext للبيانات و DispatchContext للدوال لضمان عدم إعادة رسم أزرار الإجراءات عند تغير البيانات.' },
      { step: '05', title: 'استخدام دالة use() في React 19', desc: 'قراءة السياق بمرونة فائقة باستخدام use(ThemeContext) مع دعم الاستدعاء الشرطي داخل جمل if.' }
    ],
    playgroundCode: `// محاكي نمط Context Splitting
const stateContext = { user: "Amr", theme: "dark" };
const dispatchContext = {
  login: () => console.log("Login dispatched"),
  toggleTheme: () => console.log("Theme toggled")
};

function NavUser() {
  console.log("NavUser consumed StateContext:", stateContext.user);
}

function ThemeButton() {
  // يستهلك الـ dispatchContext فقط ولن يعيد الرسم عند تغير بيانات المستخدم!
  console.log("ThemeButton consumed DispatchContext only (Optimal Performance).");
  dispatchContext.toggleTheme();
}

NavUser();
ThemeButton();`,
    experimentQuestion: 'لماذا يعتبر تخزين حالة سريعة التغير (مثل إحداثيات مؤشر الفأرة mouse coordinates أو مدخلات حقل نصي keystrokes) داخل React Context خطأً فادحاً في الأداء؟',
    experimentAnswer: 'لأن React Context يفتقر إلى ميزة الانتقاء الدقيق (Fine-grained Selectors). أي تحديث يطرأ على قيمة الـ Provider يؤدي قسراً إلى إعادة تشغيل دالة الرسم (Re-render) لجميع المكونات التي تستدعي useContext لهذا السياق، مما يتسبب في تجميد الواجهة والـ Frame Drops عند حدوث 60 تحديثاً في الثانية.',
    codeAnatomy: [
      { line: 'const AuthStateContext = createContext(null);', note: 'سياق لحفظ بيانات الحالة فقط' },
      { line: 'const AuthDispatchContext = createContext(null);', note: 'سياق لحفظ دوال الإجراءات فقط' },
      { line: 'export function AuthProvider({ children }) {', note: 'المزود المخصص' },
      { line: '  const [state, dispatch] = useReducer(authReducer, initial);', note: 'إدارة الحالة بـ Reducer' },
      { line: '  return (', note: 'توفير السياقين المنفصلين' },
      { line: '    <AuthStateContext.Provider value={state}>', note: 'توزيع بيانات الحالة' },
      { line: '      <AuthDispatchContext.Provider value={dispatch}>', note: 'توزيع دوال الإرسال الثابتة' },
      { line: '        {children}', note: 'رسم الشجرة الفرعية' },
      { line: '      </AuthDispatchContext.Provider>', note: 'إغلاق مزود الإرسال' },
      { line: '    </AuthStateContext.Provider>', note: 'إغلاق مزود الحالة' },
      { line: '  );', note: 'نهاية المزود' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع: تمرير كائن جديد مباشرة في خاصية value مع كل Render
<ThemeContext.Provider value={{ theme, setTheme }}>
  <App />
</ThemeContext.Provider> // يعيد رسم كل المستهلكين في كل دورة لأن المرجع كائن جديد!`,
    pitfallGood: `// الحل الأمثل: تثبيت مرجع الكائن باستخدام useMemo
const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);
<ThemeContext.Provider value={contextValue}>
  <App />
</ThemeContext.Provider>`,
    pitfallDiagnosis: 'تمرير كائن literal مباشرة value={{ ... }} ينشئ مرجعاً جديداً في الذاكرة مع كل Render حتى لو لم تتغير القيم الداخلية، مما يبطل تحسينات React.memo في المكونات المستهلكة.',
    quizPool: [
      {
        q: 'What is the primary motivation behind the Context Splitting pattern?',
        qAr: 'ما هو الدافع المعماري الأساسي لتطبيق نمط تقسيم السياقات (Context Splitting)؟',
        options: [
          'Separating state from dispatch functions so components only subscribing to actions do not re-render when state changes.',
          'To support multiple themes simultaneously.',
          'It is required by TypeScript.',
          'To make Context work on mobile devices.'
        ],
        correct: 0,
        why: 'Splitting state and dispatch into separate contexts prevents dispatch-only consumers from re-rendering on every state update.',
        whyAr: 'فصل الحالة عن دوال الإرسال يمنع المكونات التي تحتاج إرسال الأفعال فقط من إعادة الرسم غير المبرر عند تغير البيانات.'
      },
      {
        q: 'What capability does the new use() API in React 19 introduce for reading Context?',
        qAr: 'ما هي الإمكانية الجديدة التي يقدمها خطاف use() في ريآكت 19 لقراءة الـ Context؟',
        options: [
          'It can be called conditionally inside if-blocks and loops, unlike traditional hooks.',
          'It automatically converts Context data into JSON.',
          'It bypasses Provider validation.',
          'It caches data in Redis.'
        ],
        correct: 0,
        why: 'The React 19 use() API can be invoked conditionally within branches, unlike standard React hooks governed by rigid call-order rules.',
        whyAr: 'واجهة use() في ريآكت 19 يمكن استدعاؤها شرطياً داخل الشروط والحلقات على عكس الـ Hooks التقليدية المقيدة بقواعد الترتيب.'
      },
      {
        q: 'Which type of application state is LEAST suitable for React Context?',
        qAr: 'أي نوع من حالات التطبيق يعتبر الأقل ملائمة للتخزين في React Context؟',
        options: [
          'High-frequency rapidly changing state (e.g. mouse position, rapid keyboard typing, animations).',
          'Current authenticated user session.',
          'Global color theme (Dark/Light).',
          'Current UI localization language (Arabic/English).'
        ],
        correct: 0,
        why: 'Context triggers cascade re-renders across all consumers on update; high-frequency state causes severe UI lag.',
        whyAr: 'السياق يطلق موجات إعادة رسم لكل المستهلكين عند كل تعديل؛ الحالات فائقة التكرار ستسبب بطئاً وتجميداً للواجهة.'
      },
      {
        q: 'What is the purpose of wrapping a Context lookup in a custom hook like useAuth()?',
        qAr: 'ما هي الفائدة من تغليف استهلاك السياق داخل Custom Hook مخصص مثل useAuth()؟',
        options: [
          'Encapsulates context lookup and provides an upfront fail-fast error if used outside of its Provider.',
          'Increases download speed of the component.',
          'Encrypts the authentication tokens.',
          'Allows Context to work without a Provider.'
        ],
        correct: 0,
        why: 'Custom hook wrappers validate that the context is not null/undefined and deliver immediate actionable developer feedback.',
        whyAr: 'يتحقق الـ Custom Hook من أن السياق ليس فارغاً ويرمي تنبيهاً فورياً للمطور إذا نسي تغليف المكون بالمزود المطلوب.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة Re-renders غير الضرورية في React Context دون اللجوء إلى مكتبة خارجية مثل Zustand أو Redux؟',
    interviewA: 'نحلها معمارياً عبر 3 تقنيات: 1. تطبيق نمط Context Splitting بفصل State عن Dispatch. 2. تثبيت قيمة الـ value الممررة للمزود بـ useMemo. 3. استخدام نمط الـ Component Composition بتمرير المكونات الثقيلة كـ children للمزود بدلاً من بنائها داخله، لأن ريآكت لا تعيد رسم الـ children الممررين مسبقاً طالما أن المرجع لم يتغير.'
  },
  {
    slug: 'use-ref-dom',
    title: 'useRef: Escaping the React Paradigm, Mutable Refs & DOM Manipulation',
    titleAr: 'خطاف useRef: الهروب من دورة الـ Render، المراجع المتغيرة والتعامل المباشر مع الـ DOM',
    level: 2,
    order: 10,
    estMinutes: 30,
    version: 'React 19.x & ref as prop',
    pattern: 'Imperative Escape Hatch & Mutable Containers',
    objectives: [
      'فهم الفرق الجوهري بين useState (الذي يطلق Re-render) و useRef (صندوق الذاكرة الصامت).',
      'الوصول والتحكم المباشر في عناصر الـ DOM (Focus, Scroll, Measurements, Media Playback).',
      'تخزين المؤقتات (Timers) ومراجع الاتصال (WebSockets) والمؤشرات الحيوية دون إزعاج دورة الرسم.',
      'فهم دعم React 19 لتمرير ref كـ prop عادي دون الحاجة لـ forwardRef القديم.'
    ],
    problemOpening: `
      القاعدة الأولى في ريآكت هي: "دع ريآكت تتولى التحكم في الـ DOM ولا تلمسه بيدك".
      لكن في الواقع العملي، هناك مهام هندسية يستحيل تنفيذها بالطريقة التقريرية (Declarative): مثل عمل Focus تلقائي على حقل إدخال عند فتح النافذة، قياس أبعاد عنصر بصري بالبيكسل <code dir="ltr">getBoundingClientRect()</code>، التحكم في تشغيل وإيقاف فيديو HTML5، أو حفظ معرّف مؤقت <code dir="ltr">setInterval</code> لمسحه عند خروج المستخدم!
      لو استخدمت <code dir="ltr">useState</code> لحفظ معرّف المؤقت، كلما حدثت الـ State سيعيد المكون رسم نفسه بالكامل بدون أي داعٍ بصري!
      خطاف **useRef** هو "صندوق ذاكرة سري" (Mutable Container) يحتفظ بقيمة ثابتة المرجع طوال دورة حياة المكون دون أن يتسبب في أي Re-render عند تعديلها.
      في هذا الدرس، هنتعلم متى وكيف نستخدم useRef كـ Escape Hatch آمن، وإزاي ريآكت 19 سهلت تمرير الـ refs للمكونات الفرعية كـ Props عادية وألغت الحاجة لـ <code dir="ltr">forwardRef</code>.
    `,
    mechanics: [
      { step: '01', title: 'بنية كائن الـ Ref ({ current: initialValue })', desc: 'useRef تُرجع كائناً عادياً يحمل خاصية واحدة .current قابلة للقراءة والتعديل في أي وقت دون إطلاق Re-render.' },
      { step: '02', title: 'الربط بعناصر الـ DOM الحقيقية', desc: 'تمرير ref={inputRef} لوسم JSX يوجه ريآكت لتعيين عقدة الـ DOM الحقيقية في inputRef.current بمجرد اكتمال مرحلة الـ Commit.' },
      { step: '03', title: 'تخزين المراجع غير البصرية (Instance Variables)', desc: 'استخدام الـ Ref كحاوية لتخزين معرّفات المؤقتات، اشتراكات الـ WebSockets، وحالة المكون السابقة (Previous State).' },
      { step: '04', title: 'تحديث React 19 الثوري (Ref as a Prop)', desc: 'في React 19، يمكنك استقبال ref كـ prop عادي في المكون الدالي function MyInput({ ref, ...props }) دون استخدام دالة forwardRef.' },
      { step: '05', title: 'تجنب قراءة أو تعديل الـ Ref أثناء الـ Render', desc: 'ممنوع قراءة أو تعديل ref.current أثناء تنفيذ جسم المكون؛ يتم التعديل فقط داخل معالجات الأحداث أو داخل useEffect.' }
    ],
    playgroundCode: `// محاكي استخدام useRef لحفظ الـ Timers وتتبع الـ Render Count
let componentRenderCount = 0;

function simulateComponent() {
  componentRenderCount++;
  const renderCounterRef = { current: componentRenderCount };
  const timerIdRef = { current: null };

  console.log(\`Component Rendered (Count: \${renderCounterRef.current})\`);
  
  // محاكاة بدء مؤقت وحفظ معرّفه دون إطلاق Re-render
  timerIdRef.current = 9921; // ID from setInterval
  console.log("Timer stored silently in ref:", timerIdRef.current);
}

simulateComponent();
simulateComponent();`,
    experimentQuestion: 'ماذا يحدث لو قمت بتعديل قيمة ref.current أثناء مرحلة الـ Render مباشرة (خارج useEffect وخارج معالجات الأحداث)؟',
    experimentAnswer: 'تعديل ref.current أثناء مرحلة الـ Render يجعل المكون غير نقي (Impure Component) ويكسر توقعات ريآكت في بيئات Concurrent Mode، حيث قد تقوم ريآكت بإلغاء وإعادة تشغيل مرحلة الـ Render عدة مرات، مما يؤدي لقيم متضاربة وحالات تسريب ذاكرة يصعب تتبعها.',
    codeAnatomy: [
      { line: 'function VideoPlayer({ src }) {', note: 'مكون مشغل الفيديو' },
      { line: '  const videoRef = useRef(null);', note: 'إنشاء مرجع لعنصر الـ DOM' },
      { line: '  const isPlayingRef = useRef(false);', note: 'حفظ متغير غير بصري' },
      { line: '  const handleToggle = () => {', note: 'معالج الحدث التفاعلي' },
      { line: '    if (isPlayingRef.current) {', note: 'قراءة المرجع الحالي' },
      { line: '      videoRef.current.pause();', note: 'التحكم الإجرائي المباشر في الـ DOM' },
      { line: '    } else {', note: 'حالة التشغيل' },
      { line: '      videoRef.current.play();', note: 'تشغيل الفيديو' },
      { line: '    }', note: 'نهاية الشرط' },
      { line: '    isPlayingRef.current = !isPlayingRef.current;', note: 'تحديث المرجع الصامت' },
      { line: '  };', note: 'نهاية المعالج' },
      { line: '  return <video ref={videoRef} src={src} />;', note: 'ربط المرجع بالوسم' },
      { line: '}', note: 'نهاية المكون' }
    ],
    pitfallBad: `// خطأ شائع: استخدام useState لتخزين معرف مؤقت غير مرئي للمستخدم
const [timerId, setTimerId] = useState(null);
// كلما تم حفظ المؤقت، يعيد المكون رسم نفسه بدون أي داعٍ بصري!`,
    pitfallGood: `// الحل الهندسي: استخدام useRef لتخزين المعرفات الصامتة
const timerRef = useRef(null);
timerRef.current = setInterval(tick, 1000); // تحديث صامت بدون أي Re-render`,
    pitfallDiagnosis: 'استخدام useState للمتغيرات التي لا تؤثر على الشكل البصري المعروض يستهلك موارد المعالج بإطلاق دورات Re-render غير ضرورية، بينما useRef مخصص لحفظ المتغيرات الصامتة.',
    quizPool: [
      {
        q: 'What is the primary behavioral difference between useState and useRef in React?',
        qAr: 'ما هو الفرق السلوكي الأساسي بين useState و useRef في ريآكت؟',
        options: [
          'Updating state triggers a component re-render; mutating ref.current does NOT trigger a re-render.',
          'useRef can only store HTML DOM elements.',
          'useState values are not preserved across renders.',
          'useRef is asynchronous while useState is synchronous.'
        ],
        correct: 0,
        why: 'Mutating a ref object is a silent in-memory update that preserves values across renders without initiating the React render cycle.',
        whyAr: 'تعديل قيمة ref.current هو تعديل صامت في الذاكرة يحافظ على القيمة بين دورات الرسم دون إطلاق دورة Re-render جديدة.'
      },
      {
        q: 'How does React 19 change the way refs are passed to custom child components?',
        qAr: 'كيف غيرت ريآكت 19 طريقة تمرير الـ refs للمكونات الفرعية المخصصة؟',
        options: [
          'Refs can now be accepted directly as standard props in function components, deprecating forwardRef.',
          'Refs are now passed via React Context only.',
          'Refs must be wrapped in useMemo.',
          'Direct DOM access is no longer permitted.'
        ],
        correct: 0,
        why: 'React 19 natively treats "ref" as a standard prop in function components, eliminating the boilerplate forwardRef wrapper.',
        whyAr: 'ريآكت 19 تعامل خاصية ref كـ prop عادي مباشر في المكونات الدالية وتلغي الحاجة لتغليف المكون بـ forwardRef.'
      },
      {
        q: 'When is it safe and recommended to read or modify ref.current in a component lifecycle?',
        qAr: 'متى يكون من الآمن والموصى به قراءة أو تعديل قيمة ref.current في دورة حياة المكون؟',
        options: [
          'Inside event handlers (e.g. onClick) or inside useEffect callbacks, never during the render phase.',
          'Directly inside the JSX return block.',
          'At the very top of the component function before hooks.',
          'Inside CSS stylesheets.'
        ],
        correct: 0,
        why: 'Refs are imperative escape hatches; reading or mutating them during rendering breaks component purity and concurrent rendering safety.',
        whyAr: 'يجب قراءة وتعديل الـ ref فقط داخل معالجات الأحداث أو داخل useEffect، وتجنب لمسها أثناء مرحلة الـ Render للحفاظ على نقاء المكون.'
      },
      {
        q: 'What does a DOM ref contain before the component is mounted to the screen?',
        qAr: 'على ماذا يحتوي كائن الـ DOM ref قبل أن يتم تركيب المكون على الشاشة؟',
        options: [
          'Its initial value, which is typically null.',
          'An empty HTML div element.',
          'undefined',
          'A Promise that resolves to the DOM node.'
        ],
        correct: 0,
        why: 'Before the initial commit phase mounts the DOM node, the ref.current property retains its initial argument (null).',
        whyAr: 'قبل مرحلة الـ Commit الأولى وتركيب العنصر في الـ DOM، يحمل ref.current القيمة الابتدائية الممررة له (والتي تكون عادة null).'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو خطاف useImperativeHandle وكيف تستخدمه مع المكونات الفرعية لتطبيق مبدأ الكبسلة (Encapsulation)؟',
    interviewA: 'خطاف useImperativeHandle يتيح للمكون الفرعي تخصيص وتحديد الدوال والميثودز التي يسمح للمكون الأب باستدعائها عبر الـ ref، بدلاً من كشف عنصر الـ DOM بالكامل. على سبيل المثال، يمكن لمكون <CustomInput /> كشف ميثود focus() و clear() فقط للأب، ومنع المكون الأب من التلاعب المباشر بأنماط الـ CSS أو باقي خصائص عنصر الـ input الداخلي.'
  },
  {
    slug: 'use-memo-callback',
    title: 'Performance Optimization: useMemo, useCallback, React.memo & React 19 Compiler',
    titleAr: 'تحسين الأداء المتقدم: useMemo، useCallback، React.memo ومترجم React 19 Compiler',
    level: 2,
    order: 11,
    estMinutes: 35,
    version: 'React 19.x & React Compiler',
    pattern: 'Memoization, Referential Equality & Automatic Memoization',
    objectives: [
      'فهم معضلة تطابق المراجع (Referential Equality) ولماذا تعيد ريآكت رسم المكونات الفرعية.',
      'التفريق الصارم بين useMemo (لحفظ نواتج العمليات الحسابية) و useCallback (لتثبيت مراجع الدوال).',
      'تطبيق React.memo لمنع إعادة رسم المكونات النقية عند ثبات الـ Props.',
      'فهم دور المترجم الجديد React 19 Compiler وكيف يلغي الحاجة للميموزيشن اليدوي مستقبلاً.'
    ],
    problemOpening: `
      في جافاسكريبت، <code dir="ltr">{} !== {}</code> و <code dir="ltr">(() => {}) !== (() => {})</code>. كل مرة يتم فيها استدعاء دالة المكون في ريآكت، يتم إنشاء دوال وكائنات جديدة تماماً في الذاكرة بعناوين مراجع مختلفة.
      عندما تمرر دالة مثل <code dir="ltr">handleClick</code> لمكون فرعي مغلف بـ <code dir="ltr">React.memo</code>، يعتقد المكون الفرعي أن الخصائص قد تغيرت لأن مرجع الدالة جديد، فيعيد رسم نفسه بالكامل (Unnecessary Re-render) مهدراً وقت المعالج!
      هنا يأتي دور أدوات التثبيت الذاكري (Memoization):
      - <code dir="ltr">useCallback</code>: لتثبيت مرجع الدالة وحمايته من إعادة الإنشاء.
      - <code dir="ltr">useMemo</code>: لتخزين نتيجة عملية حسابية ثقيلة (مثل فلترة 50 ألف سجل) وعدم إعادتها إلا إذا تغيرت مصفوفة الاعتماديات (Dependencies).
      - <code dir="ltr">React.memo</code>: لمنع إعادة رسم المكون النقي طالما أن خصائصه متطابقة.
      في هذا الدرس، هنتعلم متى يكون الـ Memoization ضرورياً ومفتاحاً لسرعة التطبيق، ومتى يكون "تحسيناً سابقاً لأوانه" (Premature Optimization) يزيد من استهلاك الذاكرة، وما هي ثورة **React Compiler** الجديدة في ريآكت 19.
    `,
    mechanics: [
      { step: '01', title: 'مبدأ الـ Referential Equality في ريآكت', desc: 'ريآكت تعتمد على المقارنة السطحية Object.is(prevProp, nextProp)؛ الدوال والكائنات المنشأة في الـ Render تفشل في هذا الاختبار دائماً ما لم تثبت.' },
      { step: '02', title: 'تثبيت العمليات الحسابية الثقيلة بـ useMemo', desc: 'تغليف العمليات الحسابية المعقدة (Sorting/Filtering) بـ useMemo(() => compute(data), [data]) لعدم تشغيلها في كل Render.' },
      { step: '03', title: 'تثبيت مراجع الدوال بـ useCallback', desc: 'تثبيت مرجع الدالة الممررة لمكونات React.memo أو المضمنة في مصفوفة اعتماديات useEffect.' },
      { step: '04', title: 'حماية المكونات النقية بـ React.memo', desc: 'تغليف المكون بـ React.memo(MyComponent) لتخطي عملية الـ Diffing إذا كانت الـ Props متطابقة سطحياً.' },
      { step: '05', title: 'عصر الـ React 19 Compiler (Forget Memoization)', desc: 'المترجم الجديد يحلل شجرة الـ AST ويثبت المراجع تلقائياً على مستوى كود التجميع بدون كتابة useMemo/useCallback يدوياً.' }
    ],
    playgroundCode: `// محاكي المقارنة المرجعية وتأثير useCallback
let functionReferenceA = () => "save";
let functionReferenceB = () => "save";

console.log("Are two identical inline functions equal?", functionReferenceA === functionReferenceB); // false!

// محاكاة ميموزيشن دالة
const memoizedCallbacks = new Map();
function mockUseCallback(fn, depsKey) {
  if (!memoizedCallbacks.has(depsKey)) {
    memoizedCallbacks.set(depsKey, fn);
  }
  return memoizedCallbacks.get(depsKey);
}

const cb1 = mockUseCallback(functionReferenceA, "dep_userId_101");
const cb2 = mockUseCallback(functionReferenceB, "dep_userId_101"); // نفس الاعتمادية

console.log("Are memoized callbacks referentially identical?", cb1 === cb2); // true (Prevented re-renders!)`,
    experimentQuestion: 'لماذا يعتبر وضع useMemo و useCallback على كل متغير ودالة في التطبيق بدون قياس سلوكاً خاطئاً يضر بالأداء؟',
    experimentAnswer: 'لأن الـ Memoization ليس مجانياً! كل استدعاء لـ useMemo يحجز مساحة في الذاكرة لتخزين مصفوفة الاعتماديات السابقة والقيمة المحفوظة، ويجبر ريآكت على إجراء مقارنات دورية في كل Render. إذا كانت العملية الحسابية بسيطة (مثل a + b)، فإن تكلفة الـ Memoization تكون أعلى من تكلفة إعادة الحساب المباشرة!',
    codeAnatomy: [
      { line: 'const filteredList = useMemo(() => {', note: 'تثبيت نتيجة الحساب الثقيل' },
      { line: '  return items.filter(i => i.price > minPrice).sort((a, b) => a.id - b.id);', note: 'عمليات معالجة مصفوفة ضخمة' },
      { line: '}, [items, minPrice]);', note: 'إعادة الحساب فقط عند تغير items أو minPrice' },
      { line: 'const handleSelect = useCallback((id) => {', note: 'تثبيت مرجع الدالة' },
      { line: '  setSelectedId(id);', note: 'تحديث الحالة' },
      { line: '}, []);', note: 'مصفوفة فارغة تعني مرجع ثابت للأبد' },
      { line: 'export const Row = React.memo(function Row({ item, onSelect }) { ... });', note: 'مكون نقي محمي من إعادة الرسم' }
    ],
    pitfallBad: `// خطأ شائع: تمرير مصفوفة اعتماديات ناقصة في useCallback
const handleAdd = useCallback(() => {
  setItems([...items, newItem]); // items غير مدرجة في الـ deps!
}, []); // سيتسبب في Stale Closure ويقرأ مصفوفة قديمة دائماً`,
    pitfallGood: `// الحل الأمثل: استخدام Functional State Update
const handleAdd = useCallback((newItem) => {
  setItems(prevItems => [...prevItems, newItem]); // لا يعتمد على items الخارجية
}, []); // مصفوفة فارغة آمنة تماماً بدون Stale Closures`,
    pitfallDiagnosis: 'الاعتماديات غير المعلنة داخل مصفوفة الـ Dependencies تتسبب في ظاهرة Stale Closures حيث تحتفظ الدالة بنسخ قديمة من المتغيرات من الدورة الأولى ولا تستشعر التحديثات الجديدة.',
    quizPool: [
      {
        q: 'What is the primary difference between useMemo and useCallback?',
        qAr: 'ما هو الفرق الجوهري بين خطاف useMemo وخطاف useCallback؟',
        options: [
          'useMemo caches the returned value of a calculation; useCallback caches the function instance reference itself.',
          'useMemo is for class components; useCallback is for function components.',
          'useCallback caches values; useMemo caches DOM nodes.',
          'There is no difference in React 19.'
        ],
        correct: 0,
        why: 'useMemo stores the result of invoking a function; useCallback stores the function reference without invoking it.',
        whyAr: 'خطاف useMemo يخزن القيمة الناتجة عن تنفيذ الدالة، بينما useCallback يخزن مرجع الدالة نفسه دون تنفيذها.'
      },
      {
        q: 'When does a component wrapped in React.memo re-render?',
        qAr: 'متى يقوم مكون مغلف بـ React.memo بإعادة رسم نفسه؟',
        options: [
          'When its props change by shallow equality (Object.is), or when its own internal state/context updates.',
          'Only when the browser window resizes.',
          'Never, it is rendered only once.',
          'On every parent render regardless of props.'
        ],
        correct: 0,
        why: 'React.memo skips rendering if props are shallowly equal, but the component will still re-render if its own state or consumed context changes.',
        whyAr: 'يتخطى React.memo الرسم إذا كانت الـ Props متطابقة، لكنه يعيد الرسم حتماً إذا تغيرت حالته الداخلية useState أو سياقه useContext.'
      },
      {
        q: 'What is a Stale Closure in React hooks?',
        qAr: 'ما هي مشكلة الـ Stale Closure في خطافات ريآكت؟',
        options: [
          'When a memoized callback captures outdated variables from an older render due to missing dependencies.',
          'A closed network connection.',
          'A memory leak caused by unclosed DOM tags.',
          'An error in the React compiler.'
        ],
        correct: 0,
        why: 'A stale closure occurs when a function retains references to variables from a previous render because dependency arrays were omitted or incomplete.',
        whyAr: 'تحدث عندما تحتفظ الدالة بقيم قديمة للمتغيرات من دورة رسم سابقة بسبب نقص المتغيرات في مصفوفة الاعتماديات dependencies.'
      },
      {
        q: 'What is the goal of the React 19 Compiler (React Forget)?',
        qAr: 'ما هو الهدف المعماري لمترجم React 19 Compiler الجديد؟',
        options: [
          'Automatically memoize components, values, and functions at compile-time, reducing the need for manual useMemo/useCallback.',
          'Replace JavaScript with Rust in the browser.',
          'Eliminate the Virtual DOM entirely.',
          'Enforce strict class components.'
        ],
        correct: 0,
        why: 'The React Compiler analyzes JavaScript semantics and automatically injects fine-grained memoization during build time.',
        whyAr: 'يقوم المترجم بتحليل بنية الكود وتطبيق الميموزيشن الدقيق تلقائياً وقت البناء مما يلغي كتابة useMemo و useCallback يدوياً.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تكتب دالة مقارنة مخصصة arePropsEqual لـ React.memo(Component, arePropsEqual) ومتى تكون ضرورية؟',
    interviewA: 'دالة arePropsEqual تستقبل (prevProps, nextProps) وتُرجع true إذا كانت الخصائص متطابقة ويجب تخطي الرسم، أو false إذا تغيرت ويجب إعادة الرسم (عكس shouldComponentUpdate تماماً). نلجأ لكتابة دالة مخصصة عندما يحتوي المكون على كائن معقد أو مصفوفة تتغير مراجعها باستمرار ولكننا نهتم بمقارنة حقل واحد محدد فقط (مثل prevProps.user.id === nextProps.user.id).'
  },
  {
    slug: 'custom-hooks',
    title: 'Custom Hooks Architecture: Headless UI, State Encapsulation & Composition',
    titleAr: 'هندسة الـ Custom Hooks: فصل المنطق عن العرض (Headless UI) والكبسلة المتقدمة',
    level: 2,
    order: 12,
    estMinutes: 32,
    version: 'React 19.x Architecture',
    pattern: 'Headless Logic & Hook Composition',
    objectives: [
      'استخراج وإعادة استخدام المنطق البرمجي المعقد عبر Custom Hooks نظيفة تبدأ بـ use.',
      'تطبيق نمط Headless UI لفصل منطق الحسابات وحالات الـ State تماماً عن أكواد الـ JSX والتنسيقات.',
      'بناء Hooks إنتاجية شائعة (useDebounce, useLocalStorage, useMediaQuery, useEventListener).',
      'إدارة وتنظيم دورات الحياة المعقدة وتفادي تسريبات الذاكرة داخل الـ Hooks المخصصة.'
    ],
    problemOpening: `
      في المشاريع المتوسطة والكبيرة، تجد نفس الكود يتكرر في 10 مكونات مختلفة: كود جلب البيانات من الـ API مع حالات (Loading, Error, Data)، كود حفظ الإعدادات في <code dir="ltr">localStorage</code>، أو كود الاستماع لحجم الشاشة لتحديد إذا كان الموبايل في الوضع الرأسي.
      نسخ ولصق هذا المنطق داخل كل مكون يجعل الصيانة كابوساً: لو اكتشفت ثغرة في طريقة الحفظ في localStorage، ستضطر لتعديل 10 ملفات مختلفة!
      **الـ Custom Hooks** هي أقوى آلية لإعادة استخدام المنطق في ريآكت.
      الـ Custom Hook هي دالة جافاسكريبت عادية تبدأ بكلمة <code dir="ltr">use</code> وتستطيع استدعاء خطافات ريآكت الأخرى (useState, useEffect, useMemo) بداخلها.
      الأهم من ذلك هو أن الـ Custom Hook يتيح لك تطبيق معمارية **Headless UI**: بناء المنطق البرمجي المعقد وحالاته واختباره بالكامل بمعزل تام عن طريقة عرضه في الواجهة.
      في هذا الدرس، هنبني مجموعة من أشهر الـ Production Custom Hooks من الصفر، وهنتعلم القواعد المعمارية لتأليف ودمج الـ Hooks معاً.
    `,
    mechanics: [
      { step: '01', title: 'ميثاق التسمية وقواعد الـ Hooks الصارمة', desc: 'يجب أن تبدأ الدالة بـ use (مثل useDebounce) لتفعيل فحص linter لقواعد الـ Hooks ولضمان استدعائها في المستوى الأعلى فقط.' },
      { step: '02', title: 'كبسلة الحالة والآثار الجانبية (Encapsulating State & Effects)', desc: 'عزل منطق useState و useEffect داخل الـ Hook وإرجاع واجهة برمجية بسيطة (Tuple أو Object) للمكون المستدعي.' },
      { step: '03', title: 'عزل مساحات الحالة (Unique State per Component Instance)', desc: 'كل مكون يستدعي الـ Custom Hook يحصل على نسخته المستقلة تماماً من الحالة، فالـ Hooks تشارك المنطق وليس البيانات.' },
      { step: '04', title: 'نمط دمج الخطافات (Hook Composition)', desc: 'بناء Hooks متقدمة بالاعتماد على Hooks أبسط (مثلاً بناء useAuth بالاعتماد على useLocalStorage و useFetch).' },
      { step: '05', title: 'تنظيف الموارد وإلغاء الاشتراكات (Cleanup Contracts)', desc: 'ضمان تنظيف كل مستمعي الأحداث والـ Timers المفتوحة داخل الـ Hook عند إلغاء تركيب المكون المستهلك.' }
    ],
    playgroundCode: `// محاكي Custom Hook: useDebounce Logic
function mockUseDebounce(value, delay) {
  let debouncedValue = value;
  let timer = null;

  return {
    updateValue(newVal) {
      clearTimeout(timer);
      console.log(\`Typing: "\${newVal}" (Waiting \${delay}ms before updating state...)\`);
      timer = setTimeout(() => {
        debouncedValue = newVal;
        console.log(\`✅ Debounced Value Committed to API Search: "\${debouncedValue}"\`);
      }, delay);
    }
  };
}

const searchDebouncer = mockUseDebounce("", 300);
searchDebouncer.updateValue("R");
searchDebouncer.updateValue("Rea");
searchDebouncer.updateValue("React 19"); // القيمة الأخيرة فقط هي التي ستصل للـ API بعد 300ms`,
    experimentQuestion: 'هل مشاركة Custom Hook بين مكونين تؤدي لمشاركة نفس الـ State المشترك بينهما؟',
    experimentAnswer: 'قطعاً لا! الـ Custom Hooks تشارك فقط "المنطق البرمجي والهيكل" (Stateful Logic)، ولكن كل مكون يستدعي الـ Hook يحصل على مساحة حالة معزولة ومستقلة تماماً في شجرة الـ Fiber الخاصة به. لمشاركة نفس البيانات المشتركة بين المكونات، يجب استخدام React Context أو مكتبة إدارة حالة عالمية مثل Zustand.',
    codeAnatomy: [
      { line: 'export function useLocalStorage(key, initialValue) {', note: 'تعريف Custom Hook يقبل المفتاح والقيمة' },
      { line: '  const [storedValue, setStoredValue] = useState(() => {', note: 'تهيئة الحالة بكسل عبر دالة' },
      { line: '    try {', note: 'حماية من أخطاء الـ Parsing' },
      { line: '      const item = window.localStorage.getItem(key);', note: 'قراءة القيمة المخزنة' },
      { line: '      return item ? JSON.parse(item) : initialValue;', note: 'إرجاع القيمة أو القيمة الافتراضية' },
      { line: '    } catch { return initialValue; }', note: 'التعامل مع تعطيل التخزين' },
      { line: '  });', note: 'نهاية useState' },
      { line: '  const setValue = (value) => {', note: 'دالة التحديث الآمنة' },
      { line: '    setStoredValue(value);', note: 'تحديث حالة ريآكت' },
      { line: '    window.localStorage.setItem(key, JSON.stringify(value));', note: 'المزامنة مع متصفح العميل' },
      { line: '  };', note: 'نهاية دالة التحديث' },
      { line: '  return [storedValue, setValue];', note: 'إرجاع Tuple مطابق لـ useState' },
      { line: '}', note: 'نهاية الـ Custom Hook' }
    ],
    pitfallBad: `// خطأ شائع: تسمية الدالة بدون بادئة use
function calculateWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth); // تحذير linter: Hooks can only be called inside custom hooks or components
  return width;
}`,
    pitfallGood: `// الحل الصحيح: الالتزام الصارم بتسمية use
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth); // سليم وتتعرف عليه أدوات الفحص
  useEffect(() => { ... }, []);
  return width;
}`,
    pitfallDiagnosis: 'بادئة use هي العلامة التي تستخدمها أدوات React Linter وقواعد الـ Compiler للتحقق من أنك لا تستدعي الخطافات داخل شروط if أو حلقات تكرارية.',
    quizPool: [
      {
        q: 'What is shared when two different components call the same custom hook?',
        qAr: 'ما الذي تتم مشاركته عندما يستدعي مكونان مختلفان نفس الـ Custom Hook؟',
        options: [
          'Only the stateful logic and behavior; each component maintains its own completely isolated state.',
          'The exact same global shared state in memory.',
          'A single DOM node.',
          'A shared database connection.'
        ],
        correct: 0,
        why: 'Custom hooks share execution logic, but every call to a hook allocates independent state variables for that specific component.',
        whyAr: 'الـ Custom Hooks تعيد استخدام المنطق فقط؛ كل مكون يستدعي الـ Hook ينشئ نسخته المستقلة تماماً من الـ State.'
      },
      {
        q: 'Why must custom hooks always begin with the "use" prefix?',
        qAr: 'لماذا يجب أن تبدأ أسماء الـ Custom Hooks دائماً ببادئة "use"؟',
        options: [
          'Enables React linters and compiler to automatically enforce the Rules of Hooks on that function.',
          'It is a strict JavaScript syntax requirement.',
          'To make the function run asynchronously.',
          'To connect it to the browser window.'
        ],
        correct: 0,
        why: 'The "use" prefix is the convention that enables static analysis tools and the React compiler to verify hook rules.',
        whyAr: 'البادئة use هي المعيار الذي يمكن أدوات الفحص والمترجم من التحقق الآلي من انضباط قواعد استدعاء الـ Hooks.'
      },
      {
        q: 'What is the philosophy of Headless UI architecture in React?',
        qAr: 'ما هي فلسفة معمارية Headless UI في ريآكت؟',
        options: [
          'Providing complete interactive logic, keyboard accessibility, and state management without imposing any visual CSS styles or HTML tags.',
          'Building web applications without a browser.',
          'Rendering components solely on the server.',
          'A React app without navigation headers.'
        ],
        correct: 0,
        why: 'Headless UI decouples logic, state, and a11y behaviors from visual design, giving developers full styling freedom.',
        whyAr: 'فصل المنطق البرمجي وحالات التفاعل وإمكانية الوصول تماماً عن التصميم البصري لمنح المطور حرية التنسيق الكاملة.'
      },
      {
        q: 'How should a custom hook handle browser event listeners (e.g. window resize) to prevent memory leaks?',
        qAr: 'كيف يجب أن يتعامل الـ Custom Hook مع مستمعي أحداث المتصفح لتفادي تسريبات الذاكرة؟',
        options: [
          'Register the listener inside useEffect and return a cleanup function that calls removeEventListener.',
          'Use window.addEventListener directly in the function body.',
          'Store the event in a ref.',
          'Avoid using browser events in hooks.'
        ],
        correct: 0,
        why: 'Returning a cleanup function from useEffect guarantees event listeners are removed when the consumer component unmounts.',
        whyAr: 'إرجاع دالة تنظيف من useEffect تضمن إزالة مستمع الحدث فور إلغاء تركيب المكون المستهلك لمنع تسريب الذاكرة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تبني Hook مخصص useEvent (أو useEffectEvent في React 19) لقراءة أحدث قيم الـ Props والـ State داخل التأثيرات دون وضعها في مصفوفة الاعتماديات ودون التسبب في إعادة تشغيل الـ Effect؟',
    interviewA: 'نستخدم نمط useEvent (أو خطاف useEffectEvent الرسمي في ريآكت 19): نحفظ الدالة الممررة داخل useRef في كل Render ref.current = handler، ثم نغلفها بدالة ثابتة بـ useCallback(() => ref.current(...), []). هذا يتيح للدالة قراءة أحدث قيم الـ State والـ Props دائماً بدون أن يتغير مرجعها، مما يسمح باستدعائها داخل useEffect دون الحاجة لإضافتها لمصفوفة الاعتماديات، مانعاً إعادة تشغيل الـ Effect بشكل غير مرغوب.'
  },
  {
    slug: 'react-router',
    title: 'Client-Side Routing: React Router 7 Architecture, Nested Layouts & Loaders',
    titleAr: 'التوجيه في تطبيقات الـ SPA: معمارية React Router 7، التخطيطات المتداخلة ومحملات البيانات (Loaders)',
    level: 2,
    order: 13,
    estMinutes: 35,
    version: 'React Router v7 / v6.4+ Data APIs',
    pattern: 'Client Routing & Data Router Engine',
    objectives: [
      'فهم كيفية عمل التوجيه من جانب العميل (Client-Side Routing) واعتراض HTML5 History API.',
      'بناء شجرة توجيه هيكلية متداخلة (Nested Layouts) باستخدام عنصر <Outlet /> لمنع إعادة رسم القوائم المشتركة.',
      'استخدام واجهات البيانات الحديثة (Data APIs: loaders, actions, useLoaderData) لجلب البيانات بالتوازي مع التنقل.',
      'حماية المسارات المخصصة (Protected Routes) وإدارة التوجيه التلقائي (Auth Guards & Redirects).'
    ],
    problemOpening: `
      في المواقع التقليدية (Multi-Page Applications - MPAs)، كل ضغطة على رابط كانت ترسل طلباً جديداً للسيرفر، وترجع صفحة HTML كاملة، مما يسبب شاشة بيضاء مؤقتة (Full Page Refresh) وتفريغ كل متغيرات الـ JavaScript من الذاكرة.
      تطبيقات الصفحة الواحدة (Single Page Applications - SPAs) بنيت للقضاء على هذه الشاشة البيضاء: المتصفح يحمل ملف الـ HTML مرة واحدة فقط، ومكتبة التوجيه مثل **React Router** تعترض نقرات الروابط، وتحدث رابط العنوان بـ <code dir="ltr">history.pushState()</code>، وتقوم بتبديل المكون المعروض في الشاشة فورياً في أجزاء من الثانية دون أي تحديث للصفحة.
      مع إطلاق **React Router 7** وواجهات الـ Data Routers الحديثة، تحول التوجيه من مجرد "عرض وإخفاء مكونات" إلى معمارية متكاملة لجلب البيانات بالتوازي مع التنقل عبر **Loaders**، ومعالجة تعديل البيانات عبر **Actions**.
      في هذا الدرس، هنتعلم معمارية التوجيه الحديثة، إزاي نبني Nested Layouts تمنع اهتزاز الشاشة، وإزاي نحمي لوحات التحكم بـ Auth Guards محكمة.
    `,
    mechanics: [
      { step: '01', title: 'اعتراض التنقل عبر HTML5 History API', desc: 'استخدام Link لمنع السلوك الافتراضي لوسم a وتحديث الـ URL في شريط المتصفح عبر history.pushState دون إعادة تحميل.' },
      { step: '02', title: 'بناء التخطيطات المتداخلة (Nested Layouts & <Outlet />)', desc: 'تثبيت الترويسة والقائمة الجانبية في المكون الأب وتخصيص مساحة <Outlet /> لتبديل الصفحات الفرعية بسلاسة فائقة.' },
      { step: '03', title: 'جلب البيانات المتوازي عبر Loaders (Data APIs)', desc: 'تعريف دالة loader لكل مسار تبدأ بجلب بيانات الصفحة في نفس لحظة النقر على الرابط وقبل بدء رسم المكون (Eliminating Fetch Waterfalls).' },
      { step: '04', title: 'استخراج معلمات المسار (Dynamic Route Params)', desc: 'استخدام useParams() لاستخراج المعرفات الديناميكية مثل /users/:userId و useSearchParams() لإدارة فلاتر البحث والترتيب.' },
      { step: '05', title: 'حماية المسارات (Protected Routes & Auth Guards)', desc: 'إنشاء مكون وسيط يفحص حالة تسجيل الدخول ويستخدم Navigate to="/login" replace مع حفظ الصفحة السابقة للرجوع إليها.' }
    ],
    playgroundCode: `// محاكي مبسط لـ Client-Side History Router
const routes = {
  "/": "🏠 Home Page Component",
  "/dashboard": "📊 Analytics Dashboard Component",
  "/settings": "⚙️ User Settings Component"
};

let currentPath = "/";

function navigate(toPath) {
  if (routes[toPath]) {
    currentPath = toPath;
    console.log(\`History API Push: [URL -> \${currentPath}]\`);
    console.log(\`Active Rendered View: \${routes[currentPath]}\`);
  } else {
    console.warn(\`404 Route Not Found for \${toPath}\`);
  }
}

// محاكاة تنقل المستخدم بسلاسة بدون Page Refresh
navigate("/dashboard");
navigate("/settings");`,
    experimentQuestion: 'ما الفرق المعماري بين استخدام <a href="dashboard.html"> واستخدام <Link to="/dashboard"> في تطبيق React Router؟',
    experimentAnswer: 'وسم <a href> يقوم بإرسال طلب HTTP كامل للخادم وتفريغ التطبيق وإعادة تحميل الصفحة بالكامل (Hard Refresh)، مما يفقد حالة الـ State في الذاكرة. بينما <Link> يعترض حدث النقر، ويمنع السلوك الافتراضي e.preventDefault()، ويحدث عنوان الـ URL في المتصفح عبر History API، ويطلب من ريآكت تبديل المكون الداخلي فوراً وبنعومة تامة (Client-side Navigation).',
    codeAnatomy: [
      { line: 'const router = createBrowserRouter([', note: 'إنشاء شجرة التوجيه الحديثة' },
      { line: '  { path: "/", element: <RootLayout />,', note: 'المسار الجذري مع التخطيط المشترك' },
      { line: '    children: [', note: 'المسارات الفرعية المتداخلة' },
      { line: '      { index: true, element: <Home /> },', note: 'الصفحة الافتراضية للمسار' },
      { line: '      { path: "users/:id",', note: 'مسار ديناميكي مع معلمة id' },
      { line: '        loader: async ({ params }) => fetchUser(params.id),', note: 'جلب البيانات بالتوازي مع التنقل' },
      { line: '        element: <UserProfile />', note: 'مكون الصفحة' },
      { line: '      }', note: 'نهاية المسار' },
      { line: '    ]', note: 'نهاية الأبناء' },
      { line: '  }', note: 'نهاية التخطيط' },
      { line: ']);', note: 'نهاية التوجيه' }
    ],
    pitfallBad: `// خطأ شائع: استخدام وسوم a التقليدية في تطبيقات الـ SPA
<a href="dashboard.html">لوحة التحكم</a>
// يسبب Full Page Refresh ويفقد حالة الـ SPA بالكامل!`,
    pitfallGood: `// الحل الصحيح: استخدام مكون Link المخصص
<Link to="/dashboard">لوحة التحكم</Link>
// تنقل ناعم من جانب العميل بدون أي Refresh`,
    pitfallDiagnosis: 'استخدام وسوم a العادية يرسل طلبات جديدة للسيرفر مما يضيع أداء الـ SPA، بينما Link يدمج التنقل مع دورة حياة ريآكت.',
    quizPool: [
      {
        q: 'What is the primary function of the <Outlet /> component in React Router?',
        qAr: 'ما هي الوظيفة الأساسية لمكون <Outlet /> في React Router؟',
        options: [
          'Acts as a placeholder in a parent layout that renders the currently matched child route component.',
          'Connects the app to external web sockets.',
          'Logs analytics data on route transitions.',
          'Renders 404 error pages only.'
        ],
        correct: 0,
        why: 'In nested routing architectures, <Outlet /> designates the exact location where matched child components should be rendered inside the shared parent layout.',
        whyAr: 'في التوجيه المتداخل، يمثل <Outlet /> المكان المخصص لعرض المكون الفرعي المطابق داخل قالب التصميم الأب المشترك.'
      },
      {
        q: 'How do Data Loaders in React Router 6.4+ / v7 eliminate data fetching waterfalls?',
        qAr: 'كيف تقضي محملات البيانات (Loaders) في React Router الحديثة على شلالات جلب البيانات البطيئة (Fetch Waterfalls)؟',
        options: [
          'By fetching data in parallel immediately when navigation begins, before component rendering starts.',
          'By caching all data in local database tables permanently.',
          'By converting REST APIs to GraphQL automatically.',
          'By compressing JSON responses on the server.'
        ],
        correct: 0,
        why: 'Loaders execute at route resolution time before components render, allowing all nested route data requests to fire concurrently.',
        whyAr: 'الـ Loaders تبدأ جلب البيانات بالتوازي فور النقر على الرابط وقبل بدء رسم المكونات، مما يلغي الانتظار المتسلسل.'
      },
      {
        q: 'Which hook extracts dynamic URL segment parameters like /orders/:orderId in React Router?',
        qAr: 'أي خطاف في React Router يستخرج المعلمات الديناميكية من الرابط مثل /orders/:orderId؟',
        options: ['useParams()', 'useSearchParams()', 'useLocation()', 'useNavigate()'],
        correct: 0,
        why: 'useParams() returns an object containing key/value pairs of dynamic route segment parameters defined in the route path.',
        whyAr: 'خطاف useParams() يُرجع كائناً يحمل القيم المقابلة للمتغيرات المعرفة بنقطتين في مسار الرابط.'
      },
      {
        q: 'What is the purpose of the "replace" flag in navigate("/login", { replace: true })?',
        qAr: 'ما هو الغرض من خيار replace في navigate("/login", { replace: true })؟',
        options: [
          'Replaces the current entry in the history stack instead of pushing a new one, preventing back-button loops.',
          'Deletes all cookies in the browser.',
          'Reloads the page from the server.',
          'Clears the Redux store.'
        ],
        correct: 0,
        why: 'Using replace overrides the current history entry so the user does not get stuck in a redirect loop when clicking the browser Back button.',
        whyAr: 'يستبدل السجل الحالي في تاريخ المتصفح بدلاً من إضافة سجل جديد، مما يمنع حبس المستخدم في حلقات إعادة التوجيه عند الضغط على زر الرجوع.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ بنية معمارية لمسار محمي (Protected Route) تدعم حفظ الرابط الأصلي الذي كان يحاول المستخدم الوصول إليه قبل تسجيل الدخول وإعادته إليه بعد النجاح؟',
    interviewA: 'ننشئ مكون <ProtectedRoute />: يقرأ حالة المصادقة useAuth(). إذا كان المستخدم غير مسجل، نستخدم <Navigate to="/login" state={{ from: location }} replace />. في صفحة تسجيل الدخول، نقرأ الرابط الأصلي عبر useLocation().state?.from?.pathname || "/dashboard". بمجرد نجاح تسجيل الدخول، نوجه المستخدم فوراً إلى صفحته الأصلية المستهدفة بسلاسة واحترافية.'
  },
  {
    slug: 'data-fetching',
    title: 'Modern Data Fetching & Server State: TanStack Query (React Query) Architecture',
    titleAr: 'جلب البيانات الحديث وإدارة حالة السيرفر: معمارية TanStack Query (React Query)',
    level: 2,
    order: 14,
    estMinutes: 35,
    version: 'TanStack Query v5 / React 19',
    pattern: 'Server State Management & Cache Invalidation',
    objectives: [
      'التمييز المعماري بين حالة العميل (Client State) وحالة الخادم (Server State).',
      'فهم كوارث استخدام useEffect لجلب البيانات (Race Conditions, Memory Leaks, No Caching).',
      'إتقان استخدام useQuery لإدارة الكاش، التحديث في الخلفية (Stale-While-Revalidate)، ومؤشرات التحميل.',
      'تنفيذ التعديلات المتفائلة (Optimistic Updates) وتطهير الكاش التلقائي عبر useMutation.'
    ],
    problemOpening: `
      لسنوات طويلة، كان النمط المعتاد لجلب البيانات في ريآكت هو كتابة <code dir="ltr">useEffect</code> مع <code dir="ltr">fetch()</code> وتخزين النتيجة في <code dir="ltr">useState</code>.
      لكن هذا النمط البدائي يعاني من 7 مشاكل معمارية كارثية في بيئات الإنتاج:
      1. ظاهرة سباق الطلبات (Race Conditions) عند التنقل السريع بين الصفحات.
      2. انعدام الكاش (No Caching): كلما فتح المستخدم التاب يعيد طلب نفس البيانات من الصفر!
      3. انعدام التحديث التلقائي في الخلفية عند العودة للنافذة (No Refetch on Window Focus).
      4. طلبات مكررة متزامنة لنفس المورد (Duplicate Network Requests).
      5. صعوبة إدارة حالات التحميل والأخطاء وإعادة المحاولة التلقائية (Retry on Failure).
      الحل الهندسي الحديث هو التوقف عن معاملة بيانات الخادم كـ Client State، واستخدام مكتبة متخصصة في إدارة **Server State** مثل **TanStack Query (React Query)**.
      في هذا الدرس، هنتعلم إزاي نبني طبقة جلب بيانات منيعة، نطبق استراتيجية Stale-While-Revalidate، وننفذ Optimistic Updates لتحديث الواجهة فورياً قبل رد السيرفر.
    `,
    mechanics: [
      { step: '01', title: 'التمييز بين Client State و Server State', desc: 'حالة العميل متزامنة ومحلية (Modals, Form inputs). حالة الخادم غير متزامنة، مخزنة عن بعد، وتتطلب كاش وتحديثات دورية.' },
      { step: '02', title: 'مفاتيح الكاش الهيكلية (Query Keys Architecture)', desc: 'تنظيم المفاتيح كمصفوفات متسلسلة ["users", userId, "orders"] لتمكين التطهير الدقيق والموجه للبيانات.' },
      { step: '03', title: 'استراتيجية Stale-While-Revalidate (SWR)', desc: 'عرض البيانات المخزنة فوراً للمستخدم بدون انتظار، مع إطلاق طلب خفي في الخلفية لتحديث الكاش ومزامنة الشاشة بسلاسة.' },
      { step: '04', title: 'التحكم في التعديلات عبر useMutation', desc: 'تنفيذ عمليات الإضافة والتعديل والحذف وتطهير مفاتيح الاستعلامات المرتبطة عبر queryClient.invalidateQueries().' },
      { step: '05', title: 'التحديثات المتفائلة (Optimistic UI Updates)', desc: 'تعديل الواجهة فوراً عند ضغط الزرار بافتراض نجاح العملية، مع التراجع التلقائي (Rollback) في حال فشل طلب الشبكة.' }
    ],
    playgroundCode: `// محاكي مبسط لمحرك كاش TanStack Query
class SimpleQueryCache {
  constructor() { this.cache = new Map(); }
  
  async query(key, fetcher, staleTime = 2000) {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp < staleTime)) {
      console.log(\`⚡ Cache Hit for [\${key}]: Serving instantly from memory\`);
      return cached.data;
    }

    console.log(\`🌐 Cache Stale for [\${key}]: Fetching fresh from network...\`);
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }
}

const qClient = new SimpleQueryCache();
const mockFetcher = () => Promise.resolve({ id: 1, name: "TanStack Masterclass" });

async function runDemo() {
  await qClient.query("course_1", mockFetcher); // Network fetch
  await qClient.query("course_1", mockFetcher); // Instant Cache Hit!
}
runDemo();`,
    experimentQuestion: 'ما هي مشكلة الـ Race Condition التي تحدث عند استخدام useEffect لجلب البيانات وكيف يحلها AbortController؟',
    experimentAnswer: 'إذا غير المستخدم فلتر البحث بسرعة من "React" إلى "Node"، سيتم إطلاق طلبين للشبكة. إذا استجاب الطلب الأول المتأخر بعد استجابة الطلب الثاني الأسرع، سيقوم الـ useEffect بكتابة بيانات "React" القديمة فوق بيانات "Node" الحديثة! يحل AbortController هذه المشكلة بإلغاء اتصال الطلب السابق فورياً بمجرد تغير الاعتماديات وقبل إطلاق الطلب الجديد.',
    codeAnatomy: [
      { line: 'function UserProfile({ userId }) {', note: 'مكون يستقبل معرف المستخدم' },
      { line: '  const { data, isLoading, isError, error } = useQuery({', note: 'خطاف جلب البيانات بالكاش' },
      { line: '    queryKey: ["users", userId],', note: 'مفتاح الكاش الفريد المعياري' },
      { line: '    queryFn: () => fetchUserById(userId),', note: 'دالة الجلب' },
      { line: '    staleTime: 1000 * 60 * 5,', note: 'اعتبار البيانات طازجة لمدة 5 دقائق' },
      { line: '  });', note: 'نهاية الاستعلام' },
      { line: '  if (isLoading) return <Spinner />;', note: 'معالجة حالة التحميل' },
      { line: '  if (isError) return <Alert message={error.message} />;', note: 'معالجة الخطأ' },
      { line: '  return <h1>{data.name}</h1>;', note: 'عرض البيانات الناجحة' },
      { line: '}', note: 'نهاية المكون' }
    ],
    pitfallBad: `// خطأ كلاسيكي: جلب البيانات بـ useEffect بدون تنظيف أو إلغاء الطلب
useEffect(() => {
  fetch('/api/user/' + id)
    .then(res => res.json())
    .then(data => setUser(data)); // قد يسبب Race Condition وتحديث لمكون تم إلغاء تركيبه!
}, [id]);`,
    pitfallGood: `// الحل المعماري: استخدام TanStack Query أو AbortController
const { data: user, isPending } = useQuery({
  queryKey: ['user', id],
  queryFn: () => api.getUser(id)
}); // كاش تلقائي، حماية من السباق، وإدارة أخطاء مدمجة`,
    pitfallDiagnosis: 'الاعتماد على useEffect البسيط لجلب البيانات يفتقر للكاش وإدارة الأخطاء وحماية Race Conditions، بينما حلول Server State مخصصة لحل هذه التحديات بأعلى أداء.',
    quizPool: [
      {
        q: 'What is the fundamental difference between Client State and Server State?',
        qAr: 'ما هو الفرق المعماري الجوهري بين حالة العميل (Client State) وحالة الخادم (Server State)؟',
        options: [
          'Server State is asynchronous, remotely persisted, and requires caching/deduplication; Client State is synchronous and UI-local.',
          'Server State is stored in CSS files.',
          'Client State only works with Redux.',
          'There is no difference in modern React.'
        ],
        correct: 0,
        why: 'Server state is owned remotely by the backend and requires specialized cache invalidation, deduplication, and refetching strategies.',
        whyAr: 'حالة الخادم مملوكة ومحفوظة عن بعد وتتطلب استراتيجيات كاش وتطهير وإعادة محاولة، بينما حالة العميل محلية متزامنة.'
      },
      {
        q: 'What does "staleTime" control in TanStack Query?',
        qAr: 'ما الذي تتحكم فيه خاصية staleTime في TanStack Query؟',
        options: [
          'The duration of time data is considered fresh and will be served from cache without background refetching.',
          'The total timeout before a query fails.',
          'The time before garbage collection deletes the data from memory.',
          'The animation delay of loading skeletons.'
        ],
        correct: 0,
        why: 'staleTime specifies how long data remains fresh; queries with fresh data read from cache without triggering background network requests.',
        whyAr: 'تحدد المدة الزمنية التي تظل فيها البيانات طازجة وتُقرأ من الذاكرة فوراً دون إطلاق طلبات فحص في الخلفية.'
      },
      {
        q: 'What is an Optimistic Update in UI architecture?',
        qAr: 'ما هو التعديل المتفائل (Optimistic Update) في معمارية واجهات المستخدم؟',
        options: [
          'Updating the UI immediately assuming the server mutation will succeed, rolling back only if it fails.',
          'Always showing a success message regardless of errors.',
          'Disabling all buttons until server replies.',
          'Encrypting API requests optimistically.'
        ],
        correct: 0,
        why: 'Optimistic updates update client cache instantly for perceived zero-latency UX, with rollback on network failure.',
        whyAr: 'تحديث الواجهة والكاش فوراً دون انتظار رد الخادم لمنح تجربة مستخدم فائقة السرعة مع التراجع التلقائي في حال الفشل.'
      },
      {
        q: 'Why should Query Keys be structured as hierarchical arrays (e.g. ["todos", "list", { filter }])?',
        qAr: 'لماذا يجب هيكلة مفاتيح الاستعلام (Query Keys) كمصفوفات متدرجة؟',
        options: [
          'Enables fine-grained selective cache invalidation across specific subsets of data.',
          'Arrays are faster to compile in Babel.',
          'Query keys cannot be strings.',
          'To support SQL queries.'
        ],
        correct: 0,
        why: 'Array keys allow targeted invalidation (e.g., invalidating all "todos" queries or just one specific item key).',
        whyAr: 'تتيح هيكلة المصفوفات استهداف وتطهير مجموعات محددة من البيانات في الكاش بدقة عالية (مثل تطهير كل todos دفعة واحدة).'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ نمط Infinite Scrolling مع TanStack Query باستخدام useInfiniteQuery ومراقب التقاطع IntersectionObserver؟',
    interviewA: 'نستخدم خطاف useInfiniteQuery مع تمرير دالة getNextPageParam لحساب مؤشر الصفحة التالية من رد الخادم (مثل nextCursor). في الواجهة، نضع عنصراً مستهدفاً (Sentinel div) في أسفل القائمة ونربطه بـ IntersectionObserver عبر Custom Hook (useIntersection). بمجرد دخول الـ Sentinel في الـ Viewport، يتحقق المكون من hasNextPage و !isFetchingNextPage ثم يستدعي fetchNextPage() تلقائياً لتحميل الدفعة التالية بسلاسة وبدون أي وميض.'
  },
  {
    slug: 'state-management',
    title: 'Modern Global State Architecture: Zustand vs Redux Toolkit & Atomic State (Jotai)',
    titleAr: 'معمارية إدارة الحالة العالمية الحديثة: Zustand مقابل Redux Toolkit والـ Atomic State',
    level: 3,
    order: 15,
    estMinutes: 35,
    version: 'Zustand v5 / Redux Toolkit 2.x',
    pattern: 'Global State Management & Selective Subscriptions',
    objectives: [
      'فهم متى يحتاج تطبيقك مكتبة إدارة حالة عالمية ومتى تكفي أدوات React المدمجة.',
      'بناء مخازن حالة معيارية خفيفة وقوية باستخدام Zustand وأنماط الـ Slices.',
      'إتقان استخدام الـ Selectors الدقيقة لمنع الـ Unnecessary Re-renders على مستوى المكونات.',
      'مقارنة المعماريات الثلاث الكبرى: Flux/Redux، Store-based (Zustand)، و Atomic State (Jotai/Recoil).'
    ],
    problemOpening: `
      في المشاريع الضخمة التي تحتوي على مئات الشاشات، تبدأ التحديات الحقيقية لإدارة الحالة: سلة مشتريات معقدة يتم تحديثها من صفحة المنتج، وتعرض في النافبار، وتؤثر على كود الخصم في صفحة الدفع.
      إذا اعتمدت على React Context فقط، ستواجه مشكلة الـ Re-render Cascade.
      وإذا اعتمدت على Redux القديم (Legacy Redux)، ستغرق في مئات أسطر الـ Boilerplate: Actions, Action Creators, Reducers, Dispatchers, Types, Constants, و Thunks لمجرد زيادة عداد بمقدار 1!
      مجتمع ريآكت الحديث اتجه بقوة نحو معمارية مبسطة فائقة الأداء تقودها مكتبة **Zustand** ومكتبات الـ Atomic State مثل **Jotai**.
      مكتبة Zustand تقدم تجربة تطوير ساحرة: لا تحتاج لـ Context Providers لتغليف التطبيق، وتستخدم **Fine-grained Selectors** بحيث لا يعيد المكون رسم نفسه إلا إذا تغير الحقل المحدد الذي اشترك فيه بالضبط!
      في هذا الدرس، هنتعلم إزاي نبني Global Store احترافي بـ Zustand، إزاي نقسمه لـ Slices معيارية، وإزاي نضيف Middleware للـ Persistence والـ Logging.
    `,
    mechanics: [
      { step: '01', title: 'إنشاء المخزن البسيط (Store Creation)', desc: 'استخدام create() لتعريف الحالة ودوال التحديث معاً في كائن واحد دون الحاجة لـ Reducers منفصلة.' },
      { step: '02', title: 'الاشتراك الانتقائي الدقيق (Selective Subscriptions)', desc: 'استدعاء useStore(state => state.user) يضمن إعادة رسم المكون فقط عند تغير خاصية user وتجاهل باقي خصائص المخزن.' },
      { step: '03', title: 'تقسيم المخازن الضخمة لشرائح (Slice Pattern)', desc: 'تفكيك المخزن الكبير إلى شرائح منفصلة (authSlice, cartSlice, uiSlice) ودمجها في Root Store موحد.' },
      { step: '04', title: 'البرمجيات الوسيطة (Middleware: persist & devtools)', desc: 'إضافة المزامنة التلقائية مع localStorage عبر persist middleware وربطها بـ Redux DevTools للمراقبة.' },
      { step: '05', title: 'القراءة خارج بيئة ريآكت (Non-React Subscriptions)', desc: 'الوصول للحالة والتعديل عليها مباشرة من ملفات JavaScript عادية خارج المكونات عبر useStore.getState() و setState().' }
    ],
    playgroundCode: `// محاكي مبسط لآلية عمل Zustand مع الـ Selectors
function createSimpleStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (updater) => {
      state = typeof updater === "function" ? updater(state) : { ...state, ...updater };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

const store = createSimpleStore({ cart: [], count: 0 });
console.log("Initial Store State:", store.getState());

// الاشتراك في التغييرات
store.subscribe((nextState) => {
  console.log("Store Updated Globally:", nextState);
});

store.setState(prev => ({ count: prev.count + 1, cart: ["Item 1"] }));`,
    experimentQuestion: 'لماذا يعتبر كتابة const { user, cart } = useStore() في Zustand خطأ في الأداء مقارنة بكتابة const user = useStore(s => s.user)؟',
    experimentAnswer: 'عند استدعاء useStore() بدون Selector، يشترك المكون في كائن الحالة بأكمله! هذا يعني أنه لو تغيرت أي خاصية في المخزن (مثل تعديل الـ theme أو زيادة الـ count)، سيعيد هذا المكون رسم نفسه بالكامل. استخدام الـ Selector useStore(s => s.user) يضمن الاشتراك الانتقائي الدقيق في خاصية user فقط.',
    codeAnatomy: [
      { line: 'import { create } from "zustand";', note: 'استيراد دالة البناء' },
      { line: 'import { persist } from "zustand/middleware";', note: 'وسيط الحفظ التلقائي' },
      { line: 'export const useCartStore = create(', note: 'إنشاء المخزن' },
      { line: '  persist(', note: 'تفعيل الحفظ في localStorage' },
      { line: '    (set) => ({', note: 'تعريف الحالة والدوال' },
      { line: '      items: [],', note: 'مصفوفة العناصر' },
      { line: '      addItem: (item) => set((state) => ({ items: [...state.items, item] })),', note: 'دالة إضافة مع تحديث الحالة' },
      { line: '      clearCart: () => set({ items: [] }),', note: 'تصفير السلة' },
      { line: '    }),', note: 'نهاية الكائن' },
      { line: '    { name: "shopping-cart-storage" }', note: 'مفتاح التخزين في المتصفح' },
      { line: '  )', note: 'نهاية الوسيط' },
      { line: ');', note: 'نهاية التصدير' }
    ],
    pitfallBad: `// خطأ شائع: استخراج كل خصائص المخزن بدون Selector
function UserAvatar() {
  const { user, cart, orders, settings } = useStore(); // سيعيد الرسم مع كل حركة في السلة أو الإعدادات!
  return <img src={user.avatar} />;
}`,
    pitfallGood: `// الحل الأمثل: الاشتراك الانتقائي الدقيق
function UserAvatar() {
  const avatar = useStore(state => state.user.avatar); // يعيد الرسم فقط إذا تغيرت صورة المستخدم حصراً!
  return <img src={avatar} />;
}`,
    pitfallDiagnosis: 'الاشتراك في كامل المخزن يلغي ميزة الـ Fine-Grained Subscriptions التي تميز Zustand، بينما استخدام Selectors دقيقة يقلل معدل الـ Re-renders بنسبة تتجاوز 90%.',
    quizPool: [
      {
        q: 'Why does Zustand not require wrapping the application in a Context Provider?',
        qAr: 'لماذا لا تتطلب مكتبة Zustand تغليف التطبيق بـ Context Provider؟',
        options: [
          'It uses an external subscription model outside of the React tree, syncing via useSyncExternalStore.',
          'It stores data in global window variables only.',
          'It is a server-side only library.',
          'It replaces the React reconciler.'
        ],
        correct: 0,
        why: 'Zustand lives outside the React component tree and uses React 18+ useSyncExternalStore to subscribe to state updates without providers.',
        whyAr: 'تعيش Zustand خارج شجرة مكونات ريآكت وتعتمد على useSyncExternalStore للاشتراك الدقيق دون الحاجة لأي مزود Provider.'
      },
      {
        q: 'What is the performance advantage of fine-grained selectors in Zustand (e.g. useStore(s => s.count))?',
        qAr: 'ما هي ميزة الأداء الناتجة عن استخدام الـ Selectors الدقيقة في Zustand؟',
        options: [
          'The component will only re-render if the specifically selected piece of state changes.',
          'It compresses the state payload in memory.',
          'It bypasses React Strict Mode.',
          'It encrypts state updates.'
        ],
        correct: 0,
        why: 'Selectors compare old and new selected values via Object.is, skipping re-renders when unselected parts of the store update.',
        whyAr: 'تقارن الـ Selectors القيمة المحددة فقط وتتخطى إعادة رسم المكون إذا كانت التعديلات في أجزاء أخرى غير مستهدفة من المخزن.'
      },
      {
        q: 'How can you read or update a Zustand store outside of React components (e.g. in a pure utility file)?',
        qAr: 'كيف يمكنك قراءة أو تحديث مخزن Zustand خارج مكونات ريآكت (مثلاً في ملف دوال مساعدة نقي)؟',
        options: [
          'Directly via useStore.getState() and useStore.setState().',
          'Using useContext.',
          'You cannot access Zustand outside of React.',
          'Through document.getElementById.'
        ],
        correct: 0,
        why: 'Zustand exposes static .getState() and .setState() methods on the store instance for seamless access in non-React code.',
        whyAr: 'توفر Zustand ميثودز ساكنة getState و setState على كائن المخزن تتيح التفاعل معه من أي ملف جافاسكريبت عادي.'
      },
      {
        q: 'How does the Atomic State model (e.g. Jotai / Recoil) differ from single-store architectures (Redux / Zustand)?',
        qAr: 'كيف يختلف نموذج الحالة الذرية (Atomic State: Jotai) عن معمارية المخزن الواحد (Single Store: Redux/Zustand)؟',
        options: [
          'State is decomposed into small, isolated, independently reactive atoms that combine dynamically, rather than a single monolithic tree.',
          'Atomic state stores data in HTML attributes.',
          'Single stores only support numbers.',
          'Atomic state is slower.'
        ],
        correct: 0,
        why: 'Atomic state represents state as a bottom-up graph of small atoms, offering fine-grained subscriptions and flexible code-splitting.',
        whyAr: 'يمثل نموذج الحالة الذرية البيانات كشبكة من الذرات المستقلة الصغيرة بدلاً من شجرة مركزية ضخمة واحدة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ نمط الـ Store Slices في Zustand لمشروع تجارة إلكترونية ضخم يحتوي على Authentication، Cart، و Products؟',
    interviewA: 'ننشئ كل شريحة كدالة منفصلة تقبل (set, get): createAuthSlice, createCartSlice, createProductSlice. في كل شريحة، نعرف الحالة والدوال الخاصة بها. ثم في ملف store.js الرئيسي، ندمج كل الـ Slices في مخزن واحد باستخدام (...a) => ({ ...createAuthSlice(...a), ...createCartSlice(...a), ...createProductSlice(...a) }). هذا يمنحنا بنية فائقة التنظيم تسمح لكل فريق بالعمل على الـ Slice الخاص به مع مشاركة الحالة العالمية بنقاء وأمان تام في TypeScript.'
  },
  {
    slug: 'react-best-practices',
    title: 'Production React 19: Security, Performance Audits, Accessibility & Architecture Checklist',
    titleAr: 'ريآكت في بيئات الإنتاج: الأمان، تدقيق الأداء (Lighthouse)، إمكانية الوصول وقائمة المعايير الذهبية',
    level: 3,
    order: 16,
    estMinutes: 35,
    version: 'React 19.x Production Standards',
    pattern: 'Enterprise Production Engineering',
    objectives: [
      'حماية تطبيقات ريآكت من ثغرات XSS، وحقن الروابط الخبيثة javascript:، وحماية dangerouslySetInnerHTML.',
      'تحقيق العلامة الكاملة 100/100 في مؤشرات أداء Google Lighthouse و Core Web Vitals (LCP, INP, CLS).',
      'بناء واجهات قابلة للوصول بالكامل متوافقة مع معايير WCAG 2.1 AA ولوحة المفاتيح.',
      'تطبيق قائمة التحقق الذهبية (Production Checklist) قبل إطلاق أي تطبيق ريآكت للإنتاج.'
    ],
    problemOpening: `
      كتابة كود ريآكت يشتغل على جهازك في الـ Localhost (Dev Mode) هو أسهل جزء في هندسة البرمجيات. لكن التحدي الحقيقي الذي يميز المهندس المحترف هو تحويل هذا الكود إلى تطبيق إنتاجي حقيقي (Production-Ready) آمن، فائق السرعة، ومتاح لجميع المستخدمين حول العالم.
      في بيئة الإنتاج:
      - ثغرة أمنية واحدة في استخدام <code dir="ltr">dangerouslySetInnerHTML</code> أو روابط غير مفحوصة قد تسرب بيانات جلسات آلاف المستخدمين!
      - إهمال مؤشرات أداء الويب **Core Web Vitals** (مثل Largest Contentful Paint و Interaction to Next Paint) سيعاقب موقعك بخفض ترتيبه في محركات البحث جوجل وخسارة العملاء.
      - إهمال معايير الوصول (Accessibility) يعرض شركتك لدعاوى قضائية ويحرم ملايين المستخدمين ذوي الاحتياجات الخاصة من استخدام المنصة.
      في هذا الدرس الختامي لمسار ريآكت 19، هنستعرض الدليل الشامل لتدقيق الأداء والأمان، وهنمر على القائمة الذهبية للمعايير المعمارية التي يجب فحصها قبل الضغط على زرار Deploy.
    `,
    mechanics: [
      { step: '01', title: 'تأمين التطبيق ضد ثغرات XSS', desc: 'تطهير أي كود HTML خارجي بمكتبة DOMPurify قبل تمريره لـ dangerouslySetInnerHTML، وفحص الروابط لمنع روابط javascript: الخبيثة.' },
      { step: '02', title: 'تحسين مؤشرات الأداء الحيوية (Core Web Vitals)', desc: 'تحسين LCP بالتحميل المسبق للصور الرئيسية، وضبط INP بتجزئة العمليات الثقيلة بـ startTransition، وتثبيت أبعاد العناصر لمنع قفزات CLS.' },
      { step: '03', title: 'إمكانية الوصول الشاملة (Accessibility & Focus Trap)', desc: 'دعم التنقل الكامل بلوحة المفاتيح، واستخدام Focus Management في النوافذ المنبثقة، وتوفير نصوص aria-live للإشعارات الحية.' },
      { step: '04', title: 'عزل الأعطال بـ Error Boundaries', desc: 'تغليف أقسام التطبيق بمكونات Error Boundaries لمنع انهيار الصفحة بالكامل عند حدوث خطأ في جزء فرعي.' },
      { step: '05', title: 'قائمة التدقيق النهائي (Pre-Deployment Checklist)', desc: 'تفعيل ضغط Gzip/Brotli، وتطبيق Lazy Loading للمسارات، وفحص حزم الـ NPM بحثاً عن الثغرات الأمنية بـ npm audit.' }
    ],
    playgroundCode: `// محاكي فحص الأمان وتطهير الروابط الخبيثة
function sanitizeUrl(url) {
  const sanitized = url.trim().toLowerCase();
  if (sanitized.startsWith("javascript:") || sanitized.startsWith("data:text/html")) {
    console.warn(\`🚨 Security Alert: Malicious URL blocked -> \${url}\`);
    return "about:blank";
  }
  return url;
}

// اختبار مدخلات مستخدم خبيثة
const userInputLink = "javascript:alert(document.cookie)";
const safeLink = sanitizeUrl(userInputLink);
console.log("Rendered Safe href:", safeLink); // about:blank (Blocked!)

// اختبار رابط سليم
console.log("Safe external link:", sanitizeUrl("https://codehub.dev"));`,
    experimentQuestion: 'لماذا يعتبر استخدام startTransition في React 19 مفتاحاً لتحسين مؤشر الأداء الجديد Interaction to Next Paint (INP)؟',
    experimentAnswer: 'مؤشر INP يقيس سرعة استجابة الصفحة لمدخلات المستخدم (النقر، الكتابة). إذا قمت بتحديث حالة ثقيلة (مثل رسم 5000 بطاقة منتج) تزامناً مع كتابة المستخدم في حقل البحث، سيتجمد الخيط الرئيسي للمتصفح. استخدام startTransition يخبر ريآكت بأن هذا التحديث ذو أولوية منخفضة ويمكن مقاطعته (Interruptible)، مما يسمح للمتصفح برسم ضغطات المفاتيح فوراً دون أي تأخير، محققاً درجة INP ممتازة (< 200ms).',
    codeAnatomy: [
      { line: 'import DOMPurify from "dompurify";', note: 'مكتبة تطهير أكواد HTML' },
      { line: 'class SafeErrorBoundary extends React.Component {', note: 'حاجز حماية من الأعطال' },
      { line: '  state = { hasError: false };', note: 'حالة تتبع الخطأ' },
      { line: '  static getDerivedStateFromError(error) { return { hasError: true }; }', note: 'التقاط الخطأ وتحديث الواجهة' },
      { line: '  componentDidCatch(error, info) { logErrorToSentry(error, info); }', note: 'تسجيل الخطأ في نظام المراقبة' },
      { line: '  render() {', note: 'رسم الواجهة البديلة' },
      { line: '    if (this.state.hasError) return <FallbackUI />;', note: 'عرض رسالة مهذبة للمستخدم' },
      { line: '    return this.props.children;', note: 'رسم التطبيق الطبيعي' },
      { line: '  }', note: 'نهاية الـ Render' },
      { line: '}', note: 'نهاية حاجز الأخطاء' }
    ],
    pitfallBad: `// خطأ أمني فادح: حقن HTML غير مفحوص مباشرة
<div dangerouslySetInnerHTML={{ __html: userComment.rawHtml }} />
// يتيح لمخترق حقن كود <script> وسرقة بيانات الجلسة عبر XSS!`,
    pitfallGood: `// الحل الأمني الصارم: التطهير بمكتبة DOMPurify المعتمدة
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userComment.rawHtml) }} />`,
    pitfallDiagnosis: 'استخدام dangerouslySetInnerHTML بدون تطهير مسبق يفتح الباب واسعاً لهجمات Cross-Site Scripting (XSS)، حيث يستطيع المهاجم تشغيل كود جافاسكريبت خبيث داخل متصفح الضحية.',
    quizPool: [
      {
        q: 'What is the primary role of a React Error Boundary?',
        qAr: 'ما هو الدور الأساسي لحاجز الأخطاء (Error Boundary) في ريآكت؟',
        options: [
          'Catches JavaScript runtime errors in child components, logs them, and displays a fallback UI instead of crashing the entire app.',
          'Fixes syntax errors automatically during compile time.',
          'Catches errors in asynchronous fetch promises and event handlers.',
          'Replaces try/catch in standard JavaScript functions.'
        ],
        correct: 0,
        why: 'Error boundaries catch rendering errors in component trees, preventing the whole React application from unmounting and displaying a white screen.',
        whyAr: 'تلتقط حواجز الأخطاء الاستثناءات البرمجية في شجرة المكونات وتعرض واجهة بديلة وتمنع انهيار التطبيق بالكامل إلى شاشة بيضاء.'
      },
      {
        q: 'How can you protect a React application against XSS when using user-supplied links (<a href={userUrl}>)?',
        qAr: 'كيف تحمي تطبيق ريآكت من ثغرات XSS عند استخدام روابط مدخلة من المستخدمين في وسم <a>؟',
        options: [
          'Validate that the URL starts with safe protocols (http://, https://) and block "javascript:" or "data:" protocols.',
          'React automatically sanitizes all href attributes.',
          'Add target="_blank" to all links.',
          'Convert the link to uppercase.'
        ],
        correct: 0,
        why: 'React does not automatically sanitize href attributes; malicious "javascript:" URLs will execute arbitrary code unless explicitly blocked.',
        whyAr: 'ريآكت لا تطهر روابط href تلقائياً؛ الروابط التي تبدأ بـ javascript: ستنفذ كوداً خبيثاً ما لم يتم فحصها وحظرها صراحة.'
      },
      {
        q: 'Which Core Web Vitals metric measures UI responsiveness to user interactions and replaced FID in 2024?',
        qAr: 'أي مؤشر من مؤشرات Core Web Vitals يقيس سرعة استجابة الواجهة لتفاعلات المستخدم وحل محل FID في عام 2024؟',
        options: ['INP (Interaction to Next Paint)', 'LCP (Largest Contentful Paint)', 'CLS (Cumulative Layout Shift)', 'FCP (First Contentful Paint)'],
        correct: 0,
        why: 'Interaction to Next Paint (INP) measures overall latency for all user interactions throughout the entire page lifecycle.',
        whyAr: 'مؤشر INP يقيس زمن استجابة الصفحة الشامل لجميع تفاعلات المستخدم طوال فترة استخدام الصفحة.'
      },
      {
        q: 'Why should images have explicit width and height attributes in modern web applications?',
        qAr: 'لماذا يجب تحديد أبعاد width و height الصريحة للصور في تطبيقات الويب الحديثة؟',
        options: [
          'Allows the browser to reserve layout aspect ratio space before image loads, eliminating Cumulative Layout Shift (CLS).',
          'Decreases image file size.',
          'Required by the HTTP/3 protocol.',
          'Enables WebP image compression.'
        ],
        correct: 0,
        why: 'Specifying dimensions allows browsers to calculate aspect ratio and allocate space upfront, preventing jarring layout shifts.',
        whyAr: 'تحديد الأبعاد يمكن المتصفح من حجز المساحة المطلوبة مسبقاً قبل اكتمال تحميل الصورة مما يمنع قفزات التخطيط المزعجة (CLS).'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تقوم بإجراء تدقيق أداء شامل (Performance Audit) لتطبيق ريآكت ضخم يعاني من بطء في الاستجابة؟',
    interviewA: 'أتبع خطة معمارية رباعية المراحل: 1. استخدام React DevTools Profiler لتسجيل دورات الـ Render وتحديد المكونات التي تعيد رسم نفسها بشكل غير مبرر (Wasted Renders). 2. فحص تقرير Chrome Performance و DevTools Performance Panel لتحديد العمليات التي تحظر الخيط الرئيسي (Long Tasks > 50ms) وتحسينها بـ startTransition أو Web Workers. 3. تدقيق حجم حزم الـ Bundle باستخدام Webpack/Vite Bundle Analyzer وتطبيق Code Splitting عبر React.lazy للمسارات الثقيلة. 4. فحص مؤشرات Core Web Vitals عبر Lighthouse لضبط LCP و INP و CLS إلى النطاق الأخضر (< 2.5s LCP, < 200ms INP, < 0.1 CLS).'
  }
];
