/* ============================================================
   react-lessons-full.mjs — All 14 New Lessons for React.js 19
   ============================================================ */

export const reactLessonsFull = [
  {
    slug: 'jsx-deep-dive',
    title: 'JSX Under the Hood: React.createElement, AST & Modern JSX Transform',
    titleAr: 'كواليس JSX: دالة createElement والتحويل البرمجي الحديث في ريآكت 19',
    level: 1,
    order: 2,
    estMinutes: 20,
    version: 'React 19.2',
    pattern: 'Core Compilation Engine',
    problemOpening: `المطور المبتدئ لما بيشوف كود JSX بيفكر إنه بيكتب كود HTML عادي جوه جافاسكربت! الحقيقة الصادمة إن المتصفح ميعرفش إيه هو الـ JSX ومبيفهموش إطلاقاً. الـ JSX هو مجرد "سكر تركيبي" (Syntactic Sugar) لأشجار كائنات برمجية بسيطة. قبل ما المتصفح يشوف سطر كود واحد، محول زي Babel أو SWC بيحول كل وسم لنداء React.createElement أو لدالة _jsx() الحديثة.`,
    objectives: [
      'فهم كيفية تحويل كود الـ JSX إلى شجرة كائنات Virtual DOM عبر مترجمات الـ AST.',
      'التمييز بين التحويل القديم (React.createElement) والتحويل الحديث في React 19 (_jsx).',
      'إتقان استخدام Fragments (<>...</>) لتجنب تلويث شجرة الـ DOM بحاويات زائفة.'
    ],
    mechanics: [
      { step: 1, title: 'تحليل شجرة الكود (AST Parsing)', desc: 'المترجم يفكك وسوم JSX ويحولها لعقد شجرية تتضمن نوع المكون والخصائص والأبناء.' },
      { step: 2, title: 'توليد كائن الـ React Element', desc: 'كل وسم ينتج كائناً مجرداً بالشكل { $$typeof: Symbol(react.element), type, props, key }.' },
      { step: 3, title: 'حقن الـ Virtual DOM', desc: 'ريآكت تستخدم هذه الكائنات الخفيفة لمقارنة الفروق دون لمس الـ DOM الحقيقي إلا في مرحلة الـ Commit.' }
    ],
    playgroundCode: `function createElement(type, props, ...children) {
  return {
    $$typeof: Symbol.for('react.element'),
    type: type,
    props: { ...props, children: children.length === 1 ? children[0] : children },
    key: props?.key || null
  };
}
const vdom = createElement('div', { className: 'card' }, createElement('h2', null, 'Amr Zidan'));
console.log("Generated React Element:", JSON.stringify(vdom, null, 2));`,
    experimentQuestion: 'لماذا تحتوي كائنات React Elements على الخاصية المشفرة $$typeof: Symbol.for(\'react.element\')؟',
    experimentAnswer: 'صمام أمان أمني للحماية من ثغرات XSS يمنع حقن كائنات JSON خبيثة قادمة من الخادم كعناصر ريآكت.',
    codeAnatomy: [
      { line: '1: const el = <h1 className="title">Hello</h1>;', note: 'وسم JSX بسيط' },
      { line: '2: const el = _jsx("h1", { className: "title", children: "Hello" });', note: 'الترجمة لكائن VDOM خفيف' }
    ],
    pitfallBad: 'return ( <h1>Title</h1> <p>Desc</p> ); /* خطأ: لا يمكن إرجاع قيمتين */',
    pitfallGood: 'return ( <> <h1>Title</h1> <p>Desc</p> </> ); /* تغليف بـ Fragment */',
    pitfallDiagnosis: 'دوال جافاسكربت لا تستطيع إرجاع أكثر من قيمة واحدة، ولهذا يجب تجميع العناصر في جذر واحد أو وسم Fragment.',
    quizPool: [{
      q: 'What is a React Element in its most fundamental form?',
      qAr: 'ما هو عنصر ريآكت (React Element) في جوهره الحقيقي؟',
      options: ['A real DOM Node', 'A plain immutable JavaScript object', 'An HTML string', 'A browser Web Component'],
      correct: 1,
      why: 'React elements are lightweight plain objects.',
      whyAr: 'عناصر ريآكت هي كائنات جافاسكربت عادية غير قابلة للتعديل.'
    }],
    interviewQ: 'ما هو الفرق بين Classic Runtime و Automatic JSX Runtime في ريآكت؟',
    interviewA: 'التحويل الكلاسيكي كان يحول لـ React.createElement ويتطلب import React. التحويل الحديث يستورد تلقائياً _jsx من react/jsx-runtime ولا يتطلب استيراد React في رأس الملف.'
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
    problemOpening: `ريآكت بتعالج اختلافات المتصفحات بنظام SyntheticEvent الموحد وتفويض الأحداث (Event Delegation) في جذر التطبيق (#root) لتحقيق أقصى سرعة وأداء في إدارة النماذج والمدخلات.`,
    objectives: [
      'فهم معمارية SyntheticEvent وتفويض الأحداث في جذر شجرة ريآكت.',
      'بناء نماذج استمارات مضبوطة (Controlled Components) والتعامل مع المدخلات المتعددة.',
      'إتقان منع السلوك الافتراضي (e.preventDefault()) وإيقاف الانتشار.'
    ],
    mechanics: [
      { step: 1, title: 'تفويض الحدث في الجذر', desc: 'مستمع واحد على حاوية #root يوجه الأحداث بكفاءة للمكونات الفرعية.' },
      { step: 2, title: 'كائن SyntheticEvent الموحد', desc: 'غلاف قياسي متوافق مع W3C مع الحفاظ على e.nativeEvent.' },
      { step: 3, title: 'المدخلات المضبوطة', desc: 'ربط قيمة الحقل بالـ State وتحديثها عبر onChange.' }
    ],
    playgroundCode: `const form = { user: "", email: "" };
function updateField(k, v) { form[k] = v; console.log("Form:", JSON.stringify(form)); }
updateField("user", "AmrZidan");
updateField("email", "amr@codehub.dev");`,
    experimentQuestion: 'لماذا تم إلغاء خاصية تجميع الأحداث (Event Pooling) في ريآكت 17+؟',
    experimentAnswer: 'للسماح بقراءة خصائص e.target داخل دوال async و setTimeout بدون الحاجة لـ e.persist().',
    codeAnatomy: [
      { line: '1: const handleChange = (e) => {', note: 'معالج الحدث' },
      { line: '2:   setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));', note: 'تحديث ديناميكي' }
    ],
    pitfallBad: '<form onSubmit={submit}> /* بدون preventDefault يعيد تحميل الصفحة */',
    pitfallGood: 'const submit = (e) => { e.preventDefault(); ... };',
    pitfallDiagnosis: 'النموذج الافتراضي في المتصفح يقوم بعمل Full Page Reload ويجب إيقافه برمجياً.',
    quizPool: [{
      q: 'Where does React 17+ attach its native event listeners for event delegation?',
      qAr: 'أين تعلق ريآكت 17+ مستمعي الأحداث الحقيقيين لتطبيق تفويض الأحداث؟',
      options: ['document', 'root DOM container (#root)', 'window', 'individual nodes'],
      correct: 1,
      why: 'React attaches event handlers to the root DOM container.',
      whyAr: 'تعلق ريآكت مستمعي الأحداث على حاوية الـ DOM الجذرية (#root).'
    }],
    interviewQ: 'ما الفرق بين Controlled و Uncontrolled Components في ريآكت؟',
    interviewA: 'في Controlled تكون React State هي مصدر الحقيقة للـ value، وفي Uncontrolled يكون الـ DOM نفسه هو المحتفظ بالقيمة وتُقرأ بـ useRef.'
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
    problemOpening: `أشهر فخ في العرض الشرطي هو استخدام && مع مصفوفة فارغة length = 0 حيث ترسم ريآكت رقم 0 على الشاشة للمستخدم بدلاً من إخفاء العنصر.`,
    objectives: [
      'إتقان أنماط العرض الشرطي: Guard Clauses, Ternary, Boolean &&, و Enum Mapping.',
      'تجنب فخ طباعة الصفر الناتج عن التقصير المنطقي الخاطئ.',
      'بناء حالات التحميل والأخطاء والشاشات الفارغة باحترافية.'
    ],
    mechanics: [
      { step: 1, title: 'التقييم المنطقي في JSX', desc: 'ريآكت تتجاهل boolean و null و undefined بينما ترسم الأرقام بما فيها 0.' },
      { step: 2, title: 'التحويل المنطقي الصريح', desc: 'استخدام Boolean(val) أو count > 0 قبل استخدام &&.' },
      { step: 3, title: 'نمط الـ Component Mapping', desc: 'كائنات جدولية لاختيار المكون المناسب بناءً على الحالة.' }
    ],
    playgroundCode: `const items = [];
console.log("Buggy && output:", items.length && "Found"); // 0 (Renders!)
console.log("Safe Boolean output:", items.length > 0 && "Found"); // false (Hidden!)`,
    experimentQuestion: 'ماذا ترسم ريآكت إذا كان ناتج التعبير داخل JSX هو undefined؟',
    experimentAnswer: 'تتجاهله ولا ترسم أي شيء على الشاشة (Empty View).',
    codeAnatomy: [
      { line: '1: if (isLoading) return <Spinner />;', note: 'حارس التحميل' },
      { line: '2: return items.length > 0 ? <List /> : <Empty />;', note: 'عرض آمن' }
    ],
    pitfallBad: '{count && <Badge />} /* لو count = 0 يطبع 0 */',
    pitfallGood: '{count > 0 && <Badge />} /* آمن */',
    pitfallDiagnosis: 'عندما يكون الجانب الأيسر لـ && هو 0 تعيده JS كما هو فيُرسم بالـ DOM.',
    quizPool: [{
      q: 'Which value is NOT rendered to the DOM inside JSX?',
      qAr: 'أي قيمة لا ترسم شيئاً في الـ DOM داخل JSX؟',
      options: ['0', '""', 'NaN', 'false'],
      correct: 3,
      why: 'React ignores boolean values.',
      whyAr: 'ريآكت تتجاهل القيم المنطقية false و true.'
    }],
    interviewQ: 'كيف تصمم نظام عرض شرطي يدعم حالات متعددة معقدة؟',
    interviewA: 'باستخدام نمط Object Record Mapping: كائن يربط مفاتيح الحالات بالمكونات المطابقة لها.'
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
    problemOpening: `استخدام index كـ Key في مصفوفات ريآكت يؤدي لكوارث صامتة عند حذف أو فرز العناصر حيث تنتقل المدخلات والحالات للعناصر الخاطئة.`,
    objectives: [
      'فهم دور الـ Key كمعرف هوية فريد وثابت لخوارزمية الـ Reconciliation.',
      'تجنب مخاطر استخدام مصفوفة الفهارس index كـ Key.',
      'تطبيق استراتيجيات توليد الـ IDs المستقرة الدائمة.'
    ],
    mechanics: [
      { step: 1, title: 'الهوية عبر الزمن', desc: 'الـ Key يحدد هوية العنصر وليس مجرد موضعه المؤقت.' },
      { step: 2, title: 'إعادة تدوير العقد', desc: 'ريآكت تحرك العقدة الموجودة بدلاً من تدميرها وإعادة بنائها.' },
      { step: 3, title: 'استقرار المعرفات', desc: 'الـ Key يجب أن يكون ثابتاً لا يتغير مع كل إعادة رسم.' }
    ],
    playgroundCode: `const todos = [{ id: "t1", text: "Learn React" }, { id: "t2", text: "Build App" }];
console.log("Stable Keys:", todos.map(t => t.id).join(" | "));`,
    experimentQuestion: 'لماذا يحظر توليد Key ديناميكي مثل Math.random()؟',
    experimentAnswer: 'لأنه يدمر كل عقد الـ DOM ويعيد بناءها مع كل Render مسبباً فقدان الحالة وانهيار الأداء.',
    codeAnatomy: [
      { line: '1: {items.map(item => <Row key={item.id} data={item} />)}', note: 'استخدام معرف قاعدة البيانات' }
    ],
    pitfallBad: '{items.map((it, idx) => <Row key={idx} />)}',
    pitfallGood: '{items.map(it => <Row key={it.id} />)}',
    pitfallDiagnosis: 'استخدام index يجعل العنصر الأول يأخذ دائماً index 0 حتى لو حذفته فتشوه البيانات.',
    quizPool: [{
      q: 'What is the primary purpose of the `key` prop?',
      qAr: 'ما الغرض الأساسي من خاصية key؟',
      options: ['CSS Styling', 'Accessibility', 'Identifying element identity across renders', 'Data passing'],
      correct: 2,
      why: 'Keys give elements a stable identity.',
      whyAr: 'الـ Keys تمنح العناصر هوية مستقرة للمطابقة.'
    }],
    interviewQ: 'متى يكون استخدام Array Index كـ Key مقبولاً؟',
    interviewA: 'عندما تكون القائمة ثابتة لا تفرز ولا تحذف ولا تحتوي على حالات داخلية.'
  },
  {
    slug: 'component-patterns',
    title: 'Advanced Component Patterns: Compound Components & Render Props',
    titleAr: 'أنماط المكونات المتقدمة: المكونات المركبة ودوال العرض (Render Props)',
    level: 2,
    order: 9,
    estMinutes: 26,
    version: 'React 19.2',
    pattern: 'Component Composition',
    problemOpening: `المكونات المعقدة مثل القوائم المنسدلة (Dropdowns) والـ Modals والـ Accordions تصبح غير قابلة للصيانة إذا حاولت تمرير 20 prop لمكون واحد ضخم (Mega-Component). نمط المكونات المركبة (Compound Components) يتيح بناء واجهات مرنة ومقسمة تشارك الحالة ضمنياً مثل عناصر <select> و <option> في الـ HTML الأصلي.`,
    objectives: [
      'بناء مكونات مركبة (Compound Components) تشارك الحالة عبر Context API ضمنياً.',
      'تطبيق نمط Render Props لفصل منطق الحالة عن طريقة العرض المرئي.',
      'إتقان المكونات متعددة الأشكال (Polymorphic Components مع خاصية as).'
    ],
    mechanics: [
      { step: 1, title: 'المكون الحاوي الأب (Parent Component)', desc: 'يدير الحالة ويوفرها للأبناء عبر Context داخلي.' },
      { step: 2, title: 'المكونات الفرعية المرتبطة', desc: 'مثل Tabs.List و Tabs.Tab و Tabs.Panel تستهلك الحالة دون تمرير Props يدوياً.' },
      { step: 3, title: 'المرونة التامة في التخطيط', desc: 'المطور يتحكم في ترتيب ومكان العناصر داخل الـ JSX بحرية تامة.' }
    ],
    playgroundCode: `// Compound Pattern State Simulation
const TabsState = { activeIndex: 0 };
function selectTab(i) { TabsState.activeIndex = i; console.log("Active Tab Index:", TabsState.activeIndex); }
selectTab(1);`,
    experimentQuestion: 'كيف يتم ربط المكونات الفرعية بالأب في نمط Compound Components؟',
    experimentAnswer: 'إما بتعيينها كخصائص ساكنة مثل Tabs.List = TabList أو تصديرها معاً ومشاركتها لـ Context داخلي.',
    codeAnatomy: [
      { line: '1: <Tabs defaultValue="account">', note: 'المكون الأب الحافظ للحالة' },
      { line: '2:   <Tabs.List><Tabs.Tab value="account">Account</Tabs.Tab></Tabs.List>', note: 'المكونات الفرعية' },
      { line: '3:   <Tabs.Panel value="account"><Profile /></Tabs.Panel>', note: 'لوحة المحتوى' },
      { line: '4: </Tabs>', note: 'إغلاق المكون المركب' }
    ],
    pitfallBad: '<Select isMulti hasSearch allowCreate showIcons ... 30 props />',
    pitfallGood: '<Select><Select.Search /><Select.Options /></Select>',
    pitfallDiagnosis: 'تمرير عشرات الـ Props ينشئ كوداً غير مرن، بينما المكونات المركبة تعطي مرونة تامة.',
    quizPool: [{
      q: 'What is the primary benefit of the Compound Component pattern?',
      qAr: 'ما هي الفائدة الأساسية لنمط المكونات المركبة؟',
      options: ['Faster server rendering', 'Implicit state sharing and flexible JSX layout', 'Automatic CSS scoping', 'Redux integration'],
      correct: 1,
      why: 'It allows components to share state implicitly while giving the developer complete layout control.',
      whyAr: 'يسمح بمشاركة الحالة ضمنياً مع منح المطور حرية كاملة في ترتيب الواجهة.'
    }],
    interviewQ: 'ما هي الـ Polymorphic Components في React؟',
    interviewA: 'هي مكونات تستقبل خاصية مثل `as="button"` أو `as="a"` لتغيير نوع وسم الـ HTML الأساسي مع الحفاظ على نفس التنسيقات والخصائص.'
  },
  {
    slug: 'use-reducer',
    title: 'Complex State Transitions with useReducer & State Machines',
    titleAr: 'إدارة الحالات المعقدة بهوك useReducer وآلات الحالة المحدودة',
    level: 2,
    order: 10,
    estMinutes: 24,
    version: 'React 19.2',
    pattern: 'Predictable State Management',
    problemOpening: `عندما يحتوي المكون على 5 أو 6 حالات useState مترابطة (مثل loading, error, data, isSubmitting, isValid) يصبح تحديثها في كل دالة عرضة للتضارب والنسيان. هوك useReducer يجمع كل تحولات الحالة في دالة نقية واحدة (Reducer) ويجعل تحولات الحالة متوقعة ومختبرة 100%.`,
    objectives: [
      'فهم متى ننتقل من useState إلى useReducer في معمارية المكونات.',
      'بناء دالة Reducer نقية تستقبل State و Action وتُرجع الحالة الجديدة.',
      'تطبيق نمط Finite State Machine لمنع الحالات المستحيلة (Impossible States).'
    ],
    mechanics: [
      { step: 1, title: 'فصل الإجراء عن التنفيذ (Dispatching Actions)', desc: 'المكون يرسل إعلاناً عما حدث (type, payload) والدالة تقرر كيف تتغير الحالة.' },
      { step: 2, title: 'الدالة النقية Reducer', desc: 'تحديث الحالة بدون Mutating وإرجاع كائن جديد كلياً.' },
      { step: 3, title: 'منع الحالات المستحيلة', desc: 'استحالة وجود loading=true و error="Failed" في نفس اللحظة.' }
    ],
    playgroundCode: `function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': return { status: 'loading', data: null, error: null };
    case 'FETCH_SUCCESS': return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR': return { status: 'error', data: null, error: action.error };
    default: return state;
  }
}
const state1 = reducer({ status: 'idle' }, { type: 'FETCH_START' });
console.log("After Start:", state1);
const state2 = reducer(state1, { type: 'FETCH_SUCCESS', payload: { id: 101 } });
console.log("After Success:", state2);`,
    experimentQuestion: 'لماذا يجب أن تكون دالة الـ Reducer دالة نقية (Pure Function)؟',
    experimentAnswer: 'لأن ريآكت قد تستدعي الـ Reducer عدة مرات في نمط Strict Mode أو في ميزات Concurrent React؛ وجود أي آثار جانبية (Side Effects) سيسبب أخطاء تصعب ملاحقتها.',
    codeAnatomy: [
      { line: '1: const [state, dispatch] = useReducer(reducer, initialState);', note: 'تهيئة useReducer' },
      { line: '2: dispatch({ type: "SUBMIT_FORM", payload: data });', note: 'إرسال الإجراء' }
    ],
    pitfallBad: 'case "ADD": state.items.push(action.item); return state; /* خطأ Mutation مباشر */',
    pitfallGood: 'case "ADD": return { ...state, items: [...state.items, action.item] };',
    pitfallDiagnosis: 'تعديل state المباشر يمنع ريآكت من اكتشاف تغير المرجع فلا تعيد رسم الواجهة.',
    quizPool: [{
      q: 'What are the two arguments passed to a React reducer function?',
      qAr: 'ما هما المعاملان اللذان تستقبلهما دالة الـ Reducer؟',
      options: ['(prevState, action)', '(dispatch, state)', '(state, props)', '(action, payload)'],
      correct: 0,
      why: 'Reducers take current state and action as arguments.',
      whyAr: 'تستقبل الدالة الحالة السابقة والإجراء وتُرجع الحالة الجديدة.'
    }],
    interviewQ: 'متى تفضل useReducer على useState؟',
    interviewA: 'عندما تكون الحالة معقدة وتتكون من عدة حقول مترابطة، أو عندما تعتمد الحالة التالية على قيم سابقة متعددة، أو لتبسيط اختبار منطق الحالة بمعزل عن الواجهة.'
  },
  {
    slug: 'use-context',
    title: 'Context API: Eliminating Prop Drilling & Context Splitting',
    titleAr: 'واجهة Context API: القضاء على تمرير الخصائص المضني وتقسيم السياقات',
    level: 2,
    order: 11,
    estMinutes: 24,
    version: 'React 19.2',
    pattern: 'Global Data Sharing',
    problemOpening: `تمرير البيانات عبر 6 أو 7 مستويات من المكونات الوسيطة التي لا تحتاج هذه البيانات يُسمى كابوس Prop Drilling. سياق Context API يتيح بث البيانات لجميع المكونات الفرعية مباشرة. لكن الفخ الأكبر هو وضع كل البيانات في Context واحد مما يجبر كل المكونات على إعادة الرسم عند تغير أي حقل تافه! الحل الهندسي هو تقسيم السياقات (Context Splitting).`,
    objectives: [
      'استخدام createContext و useContext و Provider لمشاركة البيانات العامة.',
      'تجنب إعادة الرسم غير الضرورية عبر تقسيم السياقات (State vs Dispatch Contexts).',
      'بناء Custom Context Hooks مع حراس التأكد من وجود الـ Provider.'
    ],
    mechanics: [
      { step: 1, title: 'إنشاء السياق والـ Provider', desc: 'تغليف الشجرة الفرعية بـ Context.Provider وتمرير القيمة.' },
      { step: 2, title: 'الاستهلاك المباشر بـ useContext', desc: 'أي مكون فرعي يصل للبيانات مباشرة O(1) دون إزعاج المكونات الوسيطة.' },
      { step: 3, title: 'فصل سياق الحالة عن سياق التحديث', desc: 'سياق لقراءة الـ State وسياق لدوال الـ Dispatch لمنع إعادة الرسم العشوائي.' }
    ],
    playgroundCode: `// Simulating Context Dispatcher Pattern
const AuthContext = { user: null };
function login(name) { AuthContext.user = { name, role: 'admin' }; console.log("Logged In:", AuthContext.user); }
login("Amr Zidan");`,
    experimentQuestion: 'ماذا ترجع useContext(MyContext) إذا تم استدعاؤها خارج الـ Provider؟',
    experimentAnswer: 'تُرجع القيمة الافتراضية (defaultValue) الممررة أثناء إنشاء createContext(defaultValue).',
    codeAnatomy: [
      { line: '1: export function useAuth() {', note: 'هوك مخصص لاستهلاك السياق' },
      { line: '2:   const ctx = useContext(AuthContext);', note: 'قراءة السياق' },
      { line: '3:   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");', note: 'حارس أمان للمطور' },
      { line: '4:   return ctx;', note: 'إرجاع القيمة' },
      { line: '5: }', note: 'نهاية الهوك' }
    ],
    pitfallBad: '<AppContext.Provider value={{ user, theme, cart, settings, logs }}> /* أي تغيير يعيد رسم كل شيء! */',
    pitfallGood: '<UserContext.Provider value={user}><CartContext.Provider value={cart}>...</CartContext.Provider></UserContext.Provider>',
    pitfallDiagnosis: 'دمج كل حالات التطبيق في سياق واحد يسبب بطء شديد وإعادة رسم غير مبررة لكل مكونات الشاشة.',
    quizPool: [{
      q: 'What triggers a re-render in components subscribed via `useContext`?',
      qAr: 'ما الذي يطلق إعادة الرسم في المكونات المشتركة في سياق عبر useContext؟',
      options: ['Only DOM changes', 'Whenever the Provider value prop changes by reference (Object.is)', 'Component unmounting', 'Page reload'],
      correct: 1,
      why: 'Components re-render whenever the value prop of their Provider changes.',
      whyAr: 'يعاد رسم المكون عندما يتغير مرجع خاصية value في الـ Provider.'
    }],
    interviewQ: 'هل يغني Context API عن مكتبات إدارة الحالة مثل Zustand أو Redux؟',
    interviewA: 'لا، Context هو أداة لحقن التبعيات (Dependency Injection) وليس محرك إدارة حالة كامل؛ لا يدعم الـ Selectors الدقيقة وإعادة الرسم الجزئي عالي الكفاءة للحالات سريعة التغير.'
  },
  {
    slug: 'use-ref-dom',
    title: 'useRef: Mutable Value Persistence & Direct DOM Node Access',
    titleAr: 'هوك useRef: الاحتفاظ بالقيم المتغيرة والوصول المباشر للـ DOM',
    level: 2,
    order: 12,
    estMinutes: 22,
    version: 'React 19.2',
    pattern: 'DOM & Memory Escape Hatch',
    problemOpening: `هوك useRef في ريآكت له وظيفتان رئيسيتان: الأولى هي الوصول المباشر لعقد الـ DOM الحقيقية (للتركيز أو قياس الأبعاد)، والثانية والأهم هي الاحتفاظ بقيم متغيرة عبر عمليات إعادة الرسم (Renders) دون إطلاق إعادة رسم جديدة عند تعديلها!`,
    objectives: [
      'استخدام useRef كصندوق أمانات (Mutable Box) يحتفظ بالقيم دون إطلاق Re-renders.',
      'الوصول لعناصر الـ DOM وتطبيق التركيز التلقائي والتمرير (Focus & Scroll).',
      'تخزين معرفات المؤقتات (Timers & Intervals) وقيم الـ Previous Props.'
    ],
    mechanics: [
      { step: 1, title: 'كائن المرجع المستقر { current }', desc: 'ريآكت تعيد دائماً نفس كائن المرجع بين كل عمليات الرسم.' },
      { step: 2, title: 'تعديل current لا يطلق Render', desc: 'تحديث ref.current = val يتم فورياً في الذاكرة دون المساس بجدولة المكون.' },
      { step: 3, title: 'ربط العقدة عند الـ Commit Phase', desc: 'ريآكت تسند عنصر الـ DOM لـ ref.current بمجرد رسمه وتسنده لـ null عند الحذف.' }
    ],
    playgroundCode: `// Simulating Render Count without Infinite Loops
let renderCountRef = { current: 0 };
function simulateRender() {
  renderCountRef.current++;
  console.log("Component Render Count:", renderCountRef.current);
}
simulateRender(); simulateRender(); simulateRender();`,
    experimentQuestion: 'لماذا يحظر قراءة أو كتابة ref.current أثناء مرحلة الرسم (Render Phase) مباشرة؟',
    experimentAnswer: 'لأن مرحلة الرسم يجب أن تكون نقية 100% وبدون آثار جانبية؛ تعديل ref أثناء الـ Render يجعل سلوك المكون غير متوقع مع ميزات Concurrent Rendering.',
    codeAnatomy: [
      { line: '1: const inputRef = useRef(null);', note: 'إنشاء المرجع' },
      { line: '2: useEffect(() => { inputRef.current?.focus(); }, []);', note: 'التركيز على الحقل بعد اكتمال الرسم' },
      { line: '3: return <input ref={inputRef} />;', note: 'ربط المرجع بالعنصر' }
    ],
    pitfallBad: 'ref.current = 100; /* كتابة المرجع داخل جسم المكون مباشرة */ return <div>...</div>;',
    pitfallGood: 'useEffect(() => { ref.current = 100; }, []); /* كتابة المرجع داخل Effect أو Event Handler */',
    pitfallDiagnosis: 'تعديل المراجع أثناء الـ Render يكسر نقاء المكونات ويسبب أخطاء في الـ Concurrent Mode.',
    quizPool: [{
      q: 'Does updating `ref.current` trigger a component re-render in React?',
      qAr: 'هل يؤدي تحديث `ref.current` إلى إعادة رسم المكون في ريآكت؟',
      options: ['Yes, always', 'No, never', 'Only in Strict Mode', 'Only if passed to a child'],
      correct: 1,
      why: 'Mutating .current is a pure memory mutation that does not notify React to re-render.',
      whyAr: 'تعديل current هو تعديل ذاكرة بسيط لا يخطر ريآكت بإعادة الرسم.'
    }],
    interviewQ: 'كيف تقيس قيمة الـ Prop السابقة (Previous Value) باستخدام useRef؟',
    interviewA: 'نعرف `const prevValue = useRef()` وداخل `useEffect(() => { prevValue.current = val; }, [val])` نحدث المرجع؛ فيكون `prevValue.current` أثناء الـ Render يحمل القيمة السابقة دائماً.'
  },
  {
    slug: 'use-memo-callback',
    title: 'Performance Optimization: useMemo, useCallback & Referential Equality',
    titleAr: 'تحسين الأداء بهوك useMemo و useCallback ومطابقة المراجع في الذاكرة',
    level: 3,
    order: 13,
    estMinutes: 26,
    version: 'React 19.2 / React Compiler',
    pattern: 'Performance & Optimization',
    problemOpening: `في كل مرة يعاد فيها رسم مكون ريآكت، يتم إنشاء كل الدوال والكائنات المعرفة بداخله من الصفر بعناوين ذاكرة جديدة! تمرير هذه الدوال كـ Props للمكونات الفرعية المجهزة بـ React.memo يكسر مطابقة المراجع (Referential Equality) ويجعل المكونات الفرعية يعاد رسمها بلا أي داعٍ! في هذا الدرس هنتعلم متى ولماذا نستخدم useMemo و useCallback بحكمة دون إفراط يضر بالأداء.`,
    objectives: [
      'فهم مطابقة المراجع (Referential Equality) وكيف يكسرها الـ Re-render التلقائي.',
      'استخدام useMemo لتخزين نتائج العمليات الحسابية الثقيلة (Expensive Computations).',
      'استخدام useCallback لتثبيت مراجع الدوال وتجنب إعادة رسم المكونات المجهزة بـ React.memo.'
    ],
    mechanics: [
      { step: 1, title: 'تثبيت مرجع الدالة (useCallback)', desc: 'ريآكت تعيد نفس مؤشر الدالة في الذاكرة طالما لم تتغير مصفوفة التبعيات (Dependencies).' },
      { step: 2, title: 'تخزين نتائج الحساب (useMemo)', desc: 'إعادة استخدام القيمة المحسوبة وتفادي إعادة تشغيل الخوارزميات الثقيلة O(N).' },
      { step: 3, title: 'تكلفة الـ Memoization', desc: 'كل useMemo تستهلك ذاكرة ومقارنات فحص؛ لا تستخدمها مع العمليات الحسابية البسيطة O(1).' }
    ],
    playgroundCode: `// Referential Equality Demonstration
const fn1 = () => 42;
const fn2 = () => 42;
console.log("fn1 === fn2:", fn1 === fn2); // false (Different memory addresses!)

// Stable Reference Simulation
const memoCache = new Map();
function getCachedFn(key, fn) {
  if (!memoCache.has(key)) memoCache.set(key, fn);
  return memoCache.get(key);
}
console.log("Cached Fn Equality:", getCachedFn("k", fn1) === getCachedFn("k", fn1)); // true!`,
    experimentQuestion: 'ماذا يحدث إذا وضعت مصفوفة تبعيات فارغة [] لهوك useMemo؟',
    experimentAnswer: 'ستقوم ريآكت بحساب القيمة في أول عملية رسم (Mount) فقط وتحتفظ بالنتيجة طوال دورة حياة المكون دون إعادة حسابها نهائياً.',
    codeAnatomy: [
      { line: '1: const sortedList = useMemo(() => {', note: 'تخزين نتيجة الفرز الثقيلة' },
      { line: '2:   return heavySort(items);', note: 'خوارزمية ثقيلة' },
      { line: '3: }, [items]);', note: 'إعادة الحساب فقط عند تغير items' },
      { line: '4: const handleDelete = useCallback((id) => {', note: 'تثبيت مرجع الدالة' },
      { line: '5:   deleteItem(id);', note: 'حذف العنصر' },
      { line: '6: }, []);', note: 'مرجع ثابت مستقر' }
    ],
    pitfallBad: 'const sum = useMemo(() => a + b, [a, b]); /* إفراط يضر بالأداء لعملية بسيطة تافهة */',
    pitfallGood: 'const sum = a + b; /* حساب مباشر فائق السرعة بدون تكلفة useMemo */',
    pitfallDiagnosis: 'استخدام useMemo لعمليات حسابية بسيطة يكلف المتصفح ذاكرة ومقارنة تبعيات أكبر من تكلفة الحساب نفسه.',
    quizPool: [{
      q: 'What is the main purpose of `useCallback(fn, deps)`?',
      qAr: 'ما هو الغرض الأساسي من useCallback(fn, deps)؟',
      options: ['To run async code', 'To return a memoized version of the callback that only changes if dependencies change', 'To replace useEffect', 'To manipulate DOM'],
      correct: 1,
      why: 'useCallback caches a function definition between renders.',
      whyAr: 'تثبيت تعريف الدالة بين عمليات الرسم لمنع إنشاء مراجع جديدة.'
    }],
    interviewQ: 'كيف سيغير React 19 Compiler طريقة كتابتنا لـ useMemo و useCallback؟',
    interviewA: 'يقوم React Compiler (React Forget) بتحليل كود المكونات وتطبيق التخزين المؤقت (Memoization) التلقائي للقيم والدوال تلقائياً أثناء مرحلة البناء، مما يقلل الحاجة لكتابة useMemo و useCallback يدوياً بنسبة تتجاوز 90%.'
  },
  {
    slug: 'custom-hooks',
    title: 'Custom Hooks: Logic Extraction, Composition & Clean Architecture',
    titleAr: 'الهوكس المخصصة (Custom Hooks): استخراج المنطق المعقد وتركيب السلوكيات',
    level: 3,
    order: 14,
    estMinutes: 26,
    version: 'React 19.2',
    pattern: 'Logic Abstraction',
    problemOpening: `تكرار منطق جلب البيانات وإدارة الاتصال بالشبكة أو الـ LocalStorage عبر مكونات متعددة يجعل الكود مكرراً وممتلئاً بـ useEffects متشابهة. الـ Custom Hooks هي الطريقة القياسية لاستخراج منطق الحالة (Stateful Logic) وتغليفه في دوال نقية قابلة لإعادة الاستخدام والاختبار بمعزل تام عن الواجهة.`,
    objectives: [
      'فهم قواعد الهوكس (Rules of Hooks) وكيف يتعرف محرك ريآكت على بادئة use.',
      'بناء Custom Hooks شائعة مثل useLocalStorage و useDebounce و useWindowSize.',
      'تركيب عدة هوكس معاً (Hook Composition) لبناء حلول متكاملة.'
    ],
    mechanics: [
      { step: 1, title: 'بادئة use الإلزامية', desc: 'تسمية الدالة بـ use تتيح لـ Linter التأكد من الالتزام بقواعد الهوكس.' },
      { step: 2, title: 'مشاركة المنطق وليس الحالة', desc: 'كل استدعاء للـ Custom Hook يحصل على حالة خاصة معزولة تماماً.' },
      { step: 3, title: 'واجهة برمجية نظيفة (API Contract)', desc: 'إرجاع مصفوفة [value, setter] أو كائن { data, loading, error } حسب طبيعة الاستخدام.' }
    ],
    playgroundCode: `// Simulating useLocalStorage Hook Logic
function createLocalStorageHook(key, initialVal) {
  let stored = initialVal;
  return {
    get: () => stored,
    set: (v) => { stored = v; console.log(\`Key [\${key}] updated to:\`, stored); }
  };
}
const themeHook = createLocalStorageHook("theme", "dark");
console.log("Initial:", themeHook.get());
themeHook.set("light");`,
    experimentQuestion: 'هل تتشارك المكونات التي تستدعي نفس الـ Custom Hook نفس الحالة في الذاكرة؟',
    experimentAnswer: 'لا، كل مكون يستدعي Custom Hook ينشئ نسخة حالة مستقلة ومعزولة تماماً في شجرة الـ Fiber الخاصة به؛ الـ Custom Hook يشارك المنطق فقط وليس الحالة.',
    codeAnatomy: [
      { line: '1: export function useDebounce(value, delay = 300) {', note: 'هوك تأخير القيمة' },
      { line: '2:   const [debounced, setDebounced] = useState(value);', note: 'حالة القيمة المؤجلة' },
      { line: '3:   useEffect(() => {', note: 'تأجيل التحديث' },
      { line: '4:     const timer = setTimeout(() => setDebounced(value), delay);', note: 'بدء المؤقت' },
      { line: '5:     return () => clearTimeout(timer);', note: 'تنظيف المؤقت' },
      { line: '6:   }, [value, delay]);', note: 'التبعية' },
      { line: '7:   return debounced;', note: 'إرجاع القيمة المستقرة' },
      { line: '8: }', note: 'نهاية الهوك' }
    ],
    pitfallBad: 'function fetchUser() { useState(); } /* خطأ: عدم البدء ببادئة use يكسر قواعد الـ Linter */',
    pitfallGood: 'function useUser() { useState(); } /* صحيح وملتزم بالمعيار */',
    pitfallDiagnosis: 'البادئة use ضرورية لتمكين أدوات الفحص من التحقق من صحة استدعاء الهوكس وعدم وضعها داخل شروط.',
    quizPool: [{
      q: 'What do Custom Hooks share between components?',
      qAr: 'ما الذي تشاركه الـ Custom Hooks بين المكونات؟',
      options: ['State data in memory', 'Stateful logic, not the state itself', 'DOM nodes', 'Global variables'],
      correct: 1,
      why: 'Custom hooks share logic; each call creates its own independent state.',
      whyAr: 'تشارك الهوكس المنطق البرمجي، بينما يحصل كل استدعاء على حالته الخاصة المستقلة.'
    }],
    interviewQ: 'كيف تختبر Custom Hook برمجياً بدون ربطه بمكون واجهة كامل؟',
    interviewA: 'نستخدم دالة `renderHook` من مكتبة `@testing-library/react` التي تنشئ غلافاً افتراضياً لاختبار قيم ومخرجات ودوال الهوك ومعاينة تغيراتها بدقة عبر `act()`.'
  },
  {
    slug: 'react-router',
    title: 'Client-Side Routing: React Router v7, Nested Routes & Loaders',
    titleAr: 'التوجيه في تطبيقات الصفحة الواحدة: ريآكت راوتر 7 والمسارات المتداخلة',
    level: 3,
    order: 15,
    estMinutes: 26,
    version: 'React Router v7',
    pattern: 'SPA Navigation',
    problemOpening: `في تطبيقات SPA التقليدية، التنقل بين الصفحات كان يسبب تحميل الشاشات ثم ظهور دوائر تحميل مزعجة (Spinners) بسبب جلب البيانات بعد رسم الصفحة (Fetch-on-Render). معمارية React Router v7 الحديثة تقدم نمط الـ Data Routers والمسارات المتداخلة (Nested Routes) مع دوال الـ Loaders التي تجلب بيانات الصفحة بالتوازي قبل رسمها!`,
    objectives: [
      'بناء شجرة مسارات متداخلة (Nested Routes) مع وسم <Outlet /> ومسارات Layout مشتركة.',
      'تطبيق دوال الـ Loaders و Actions لجلب وتعديل البيانات قبل رسم المكونات.',
      'حماية المسارات الخاصة (Protected Routes) وإدارة أخطاء التوجيه عبر Error Boundaries.'
    ],
    mechanics: [
      { step: 1, title: 'المسارات المتداخلة وشاشات الـ Layout', desc: 'الاحتفاظ بالـ Sidebar والـ Header ثابتاً وتغيير منطقة الـ Outlet فقط دون إعادة رسم الصفحة.' },
      { step: 2, title: 'الجلب الموازي عبر Loaders', desc: 'تحميل كود الصفحة وبياناتها في نفس الوقت لتقليل زمن العرض.' },
      { step: 3, title: 'الروابط النشطة (NavLink)', desc: 'تمييز رابط الصفحة الحالية تلقائياً بدعم الفئات النشطة والـ Accessibility.' }
    ],
    playgroundCode: `// Route Matcher Engine Simulation
const routes = [
  { path: "/", name: "Dashboard" },
  { path: "/users/:id", name: "UserProfile" }
];
function matchRoute(url) {
  const match = routes.find(r => r.path === url || (r.path.includes(":id") && url.startsWith("/users/")));
  console.log(\`Matched URL [\${url}] to Route:\`, match ? match.name : "404 NotFound");
}
matchRoute("/users/42");`,
    experimentQuestion: 'ما هي وظيفة وسم <Outlet /> في مسارات React Router المتداخلة؟',
    experimentAnswer: 'يعمل كفتحة حجز مكان (Placeholder) في المكون الأب ليتم رسم المكونات الفرعية المطابقة للمسار المتداخل بداخله.',
    codeAnatomy: [
      { line: '1: export function DashboardLayout() {', note: 'مكون التخطيط المشترك' },
      { line: '2:   return (', note: 'الواجهة' },
      { line: '3:     <div class="layout"><Sidebar /><main><Outlet /></main></div>', note: 'Outlet لحقن الصفحات الفرعية' },
      { line: '4:   );', note: 'إغلاق الواجهة' },
      { line: '5: }', note: 'نهاية المكون' }
    ],
    pitfallBad: '<a href="dashboard.html">Dashboard</a> /* يسبب Full Page Refresh ويفقد حالة الـ SPA بالكامل */',
    pitfallGood: '<Link to="/dashboard">Dashboard</Link> /* تنقل ناعم من جانب العميل بدون Refresh */',
    pitfallDiagnosis: 'استخدام وسوم a العادية يعيد طلب الصفحة من السيرفر، بينما Link يعترض الحدث ويحدث الـ History API.',
    quizPool: [{
      q: 'What is the role of `<Outlet />` in React Router?',
      qAr: 'ما هو دور وسم `<Outlet />` في React Router؟',
      options: ['Renders external links', 'Renders matching child route elements in parent layouts', 'Redirects to 404', 'Fetches data'],
      correct: 1,
      why: 'An Outlet renders the matching child route element.',
      whyAr: 'يرسم مكون المسار الفرعي المطابق داخل التخطيط الأب.'
    }],
    interviewQ: 'ما هو الفرق بين Fetch-on-Render و Render-as-You-Fetch في معمارية التوجيه؟',
    interviewA: 'في Fetch-on-Render ينتظر المكون حتى يُرسم في الـ DOM ثم يبدأ جلب بياناته عبر useEffect مسبباً شلالات تحميل بطيئة. أما في Render-as-You-Fetch (مثل Loaders في Router v7) تبدأ عملية جلب البيانات ومطابقة المسار وتنزيل الكود في نفس اللحظة بالتوازي قبل الرسم.'
  },
  {
    slug: 'data-fetching',
    title: 'Data Fetching, Cache Invalidation, SWR & TanStack Query Patterns',
    titleAr: 'استراتيجيات جلب البيانات، إبطال الكاش وأنماط SWR و TanStack Query',
    level: 3,
    order: 16,
    estMinutes: 28,
    version: 'TanStack Query v5',
    pattern: 'Server State Management',
    problemOpening: `الخلط بين حالة العميل (Client State مثل فتح قائمة) وحالة السيرفر (Server State مثل قائمة المنتجات) هو أكبر خطأ يقع فيه المطورون. محاولة إدارة Server State بـ useEffect و useState تتطلب كتابة مئات الأسطر لإدارة التحميل، الأخطاء، إلغاء الطلبات، وإعادة المحاولة عند انقطاع الشبكة. أنماط SWR و TanStack Query تعامل حالة السيرفر كـ Cache ذكي مع تحديث تلقائي في الخلفية.`,
    objectives: [
      'فهم الفرق الجذري بين Client State و Server State.',
      'تطبيق استراتيجية Stale-While-Revalidate (SWR) لعرض فوري للبيانات مع تحديث الخلفية.',
      'إتقان إبطال الكاش (Cache Invalidation) والتحديث المتفائل (Optimistic Updates).'
    ],
    mechanics: [
      { step: 1, title: 'عرض الكاش القديم فوراً (Stale Data)', desc: 'المستخدم يرى البيانات المخزنة فوراً دون انتظار دائرة التحميل.' },
      { step: 2, title: 'التحقق في الخلفية (Revalidation)', desc: 'إرسال طلب صامت للسيرفر لجلب أحدث نسخة وتحديث الواجهة بسلاسة.' },
      { step: 3, title: 'التحديث المتفائل (Optimistic Update)', desc: 'تحديث الواجهة فور ضغط الزر قبل وصول رد السيرفر والتراجع عند الفشل.' }
    ],
    playgroundCode: `// Stale-While-Revalidate Cache Simulation
const cache = new Map();
function queryData(key, fetcher) {
  if (cache.has(key)) {
    console.log("⚡ Instant Stale Cache Hit:", cache.get(key));
  }
  const fresh = fetcher();
  cache.set(key, fresh);
  console.log("🔄 Revalidated Fresh Data Saved:", fresh);
}
queryData("user:1", () => ({ id: 1, name: "Amr" }));
queryData("user:1", () => ({ id: 1, name: "Amr Zidan" }));`,
    experimentQuestion: 'ما هي مشكلة تضارب الطلبات الشبكية (Race Conditions) في useEffect وكيف تحلها مكتبات الـ Query؟',
    experimentAnswer: 'تحدث عندما تطلق طلباً للمستخدم A ثم طلباً سريعاً للمستخدم B، فيصل رد A بعد B فيتم عرض بيانات A بالخطأ؛ تحلها مكتبات الاستعلام بإلغاء الطلبات السابقة تلقائياً عبر AbortController وتتبع مفاتيح Query Keys فريدة.',
    codeAnatomy: [
      { line: '1: const { data, isLoading, error } = useQuery({', note: 'هوك جلب البيانات مع الكاش' },
      { line: '2:   queryKey: ["products", category],', note: 'مفتاح الكاش الفريد' },
      { line: '3:   queryFn: () => fetchProducts(category),', note: 'دالة الجلب' },
      { line: '4:   staleTime: 1000 * 60 * 5', note: 'اعتبار البيانات طازجة لمدة 5 دقائق' },
      { line: '5: });', note: 'نهاية الاستعلام' }
    ],
    pitfallBad: 'useEffect(() => { fetch(...).then(setData); }, [query]); /* بدون cleanup مسبباً Race Conditions */',
    pitfallGood: 'useQuery({ queryKey: ["data", query], queryFn: () => fetch(query) }); /* آمن ومخزن تلقائياً */',
    pitfallDiagnosis: 'الاعتماد على fetch بسيط في useEffect بدون إلغاء يسبب تسريب ذاكرة وتضارب في نتائج البحث السريع.',
    quizPool: [{
      q: 'What does the Stale-While-Revalidate pattern do when cached data exists?',
      qAr: 'ما الذي يفعله نمط SWR عندما تكون البيانات متوفرة في الكاش؟',
      options: ['Blocks UI until network responds', 'Returns cached data immediately while fetching fresh data in background', 'Deletes the cache', 'Throws error'],
      correct: 1,
      why: 'It serves stale data first for instant UI response and revalidates in the background.',
      whyAr: 'يعرض البيانات المخزنة فوراً لسرعة الاستجابة ويحدثها بهدوء في الخلفية.'
    }],
    interviewQ: 'كيف تنفذ تحديثاً متفائلاً (Optimistic Update) في تطبيق تجارة إلكترونية؟',
    interviewA: 'عند ضغط زر "إضافة للمفضلة"، نقوم بتحديث كاش الواجهة فوراً ليتحول القلب للون الأحمر، مع حفظ لقطة (Snapshot) من الحالة السابقة؛ نرسل الطلب للسيرفر، وإذا فشل الطلب نسترجع لقطة الـ Snapshot ونعيد القلب للونه الأصلي مع تنبيه المستخدم.'
  },
  {
    slug: 'state-management',
    title: 'Global State Management with Zustand: Stores, Selectors & Slices',
    titleAr: 'إدارة الحالة العامة بمكتبة Zustand: المتاجر والمحددات والشرائح',
    level: 3,
    order: 17,
    estMinutes: 24,
    version: 'Zustand v5',
    pattern: 'Global Store Architecture',
    problemOpening: `مكتبات إدارة الحالة القديمة مثل Redux الكلاسيكي كانت تتطلب كتابة مجلدات من ملفات Actions و Reducers و Types المعقدة (Boilerplate Hell). مكتبة Zustand قدمت ثورة هندسية: متجر عام خفيف يعتمد على Hook بسيط بدون الحاجة لتغليف التطبيق بـ Providers، ويدعم التحديد الدقيق (Atomic Selectors) بحيث لا يعاد رسم المكون إلا إذا تغيرت الخاصية التي يشترك فيها بالضبط!`,
    objectives: [
      'إنشاء متجر Zustand عام بحجم أقل من 1KB ودون Context Providers.',
      'تطبيق محددات الحالة الدقيقة (Selectors) لمنع إعادة الرسم العشوائي.',
      'تقسيم المتاجر المعقدة إلى شرائح مستقلة (Slices Pattern).'
    ],
    mechanics: [
      { step: 1, title: 'المتجر خارج شجرة ريآكت (External Store)', desc: 'Zustand يحتفظ بالحالة كـ Closure خارجي ويرتبط بريآكت عبر useSyncExternalStore.' },
      { step: 2, title: 'الاشتراك الذري (Atomic Selectors)', desc: 'المكون يمرر دالة اختيار state => state.user فلا يعاد رسمه إذا تغير cart.' },
      { step: 3, title: 'الدوال غير المتزامنة الأصلية', desc: 'كتابة دوال async داخل المتجر مباشرة وتحديث الحالة بـ set() دون الحاجة لـ Thunks معقدة.' }
    ],
    playgroundCode: `// Simulating Zustand Store Mechanics
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();
  return {
    getState: () => state,
    setState: (fn) => { state = fn(state); listeners.forEach(l => l(state)); },
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); }
  };
}
const store = createStore({ count: 0 });
store.subscribe(s => console.log("Zustand State Update:", s));
store.setState(s => ({ count: s.count + 1 }));`,
    experimentQuestion: 'لماذا لا تحتاج مكتبة Zustand لتغليف التطبيق بـ Provider في رأس شجرة المكونات؟',
    experimentAnswer: 'لأن متجر Zustand هو كائن جافاسكربت نقي خارج شجرة ريآكت (Module Singleton)، ويشترك المكون فيه مباشرة عبر الـ Subscription الداخلي.',
    codeAnatomy: [
      { line: '1: export const useCartStore = create((set) => ({', note: 'إنشاء المتجر' },
      { line: '2:   items: [],', note: 'الحالة' },
      { line: '3:   addItem: (item) => set((s) => ({ items: [...s.items, item] })),', note: 'دالة التحديث' },
      { line: '4:   clearCart: () => set({ items: [] })', note: 'تفريغ السلة' },
      { line: '5: }));', note: 'نهاية المتجر' }
    ],
    pitfallBad: 'const { items, clearCart } = useCartStore(); /* استهلاك بدون Selector يعيد الرسم مع أي تغيير */',
    pitfallGood: 'const items = useCartStore(state => state.items); /* اشتراك ذري بالـ items فقط */',
    pitfallDiagnosis: 'عدم استخدام الـ Selectors يفقد Zustand أهم ميزة فيها ويعيد رسم المكون عند تغير أي خاصية غير مستخدمة في المتجر.',
    quizPool: [{
      q: 'How do you subscribe to a single property in a Zustand store to prevent unnecessary renders?',
      qAr: 'كيف تشترك في خاصية واحدة في متجر Zustand لمنع عمليات إعادة الرسم غير الضرورية؟',
      options: ['useStore()', 'useStore(state => state.myProp)', 'useContext(Store)', 'useStore.get("myProp")'],
      correct: 1,
      why: 'Passing a selector function subscribes only to the selected slice of state.',
      whyAr: 'تمرير دالة Selector يشترك فقط في الجزء المحدد من الحالة.'
    }],
    interviewQ: 'ما هي ميزة useSyncExternalStore التي تعتمد عليها Zustand في React 18 و 19؟',
    interviewA: 'هي هوك رسمي مدمج في ريآكت صُمم خصيصاً لمكتبات إدارة الحالة لتمكينها من قراءة ومزامنة المتاجر الخارجية (External Stores) بأمان تام مع ميزات Concurrent Rendering ومنع ظاهرة تمزق الواجهة (Tearing).'
  },
  {
    slug: 'react-best-practices',
    title: 'React Production Checklist: Project Structure, Profiler & Performance Audits',
    titleAr: 'دليل الإنتاج لريآكت: الهيكلة المعيارية، فاحص الأداء وقائمة التحقق',
    level: 3,
    order: 18,
    estMinutes: 24,
    version: 'React 19.2',
    pattern: 'Production Engineering',
    problemOpening: `بناء تطبيق ريآكت تجريبي سهل، لكن تجهيز تطبيق عملاق للإنتاج يتحمل ملايين الزيارات يتطلب معايير هندسية صارمة: هيكلة المجلدات المعتمدة على الميزات (Feature-Based Folders)، قياس الأداء بـ React Profiler، وتحليل حزم الـ JavaScript لمنع تسريب الذاكرة وتحقيق أعلى درجات Web Vitals.`,
    objectives: [
      'تنظيم المشروع وفق معمارية Feature-Sliced Architecture.',
      'استخدام React Profiler لتشخيص أسباب إعادة الرسم البطيئة واختناقات الأداء.',
      'تطبيق قائمة التحقق الإنتاجية (Production Checklist) للتأكد من الجاهزية الكاملة.'
    ],
    mechanics: [
      { step: 1, title: 'الهيكلة القائمة على الميزات', desc: 'تجميع المكونات والـ Hooks والـ Services الخاصة بكل ميزة في مجلد مستقل مغلق.' },
      { step: 2, title: 'التحليل بـ React Profiler', desc: 'قياس زمن الـ Render الفعلي وتحديد المكونات التي تتسبب في بطء الشاشة.' },
      { step: 3, title: 'فحص الحزم والأمان', desc: 'التأكد من تفعيل الإنتاجية وحذف أكواد التطوير وفحص الـ Bundle Size.' }
    ],
    playgroundCode: `// Production Health Audit Simulation
const audit = {
  treeShakingEnabled: true,
  codeSplittingRoutes: true,
  memoizedExpensiveCalcs: true,
  accessibilityScore: 100,
  webVitalsLCP: "0.8s"
};
console.log("Production Readiness:", Object.entries(audit).map(([k, v]) => \`\${k}: \${v}\`).join(" | "));`,
    experimentQuestion: 'ما هو مؤشر LCP (Largest Contentful Paint) المستهدف في تطبيقات الويب الحديثة؟',
    experimentAnswer: 'معيار جوجل يوصي بأن يكون زمن رسم أكبر عنصر مرئي (LCP) أقل من 2.5 ثانية لتحقيق تجربة مستخدم ممتازة.',
    codeAnatomy: [
      { line: '1: src/', note: 'مجلد الكود الرئيسي' },
      { line: '2:   features/auth/       # ميزة التوثيق بالكامل', note: 'مكونات وهوكس التوثيق' },
      { line: '3:   features/checkout/   # ميزة الدفع والسلة', note: 'مكونات وهوكس الدفع' },
      { line: '4:   components/ui/       # عناصر الواجهة العامة', note: 'أزرار وحقول وبطاقات عامة' }
    ],
    pitfallBad: 'وضع كل مكونات التطبيق في مجلد واحد ضخم components/ يحتوي على 200 ملف مبعثر',
    pitfallGood: 'تقسيم المشروع لميزات features/<feature-name>/ تحتوي على components, hooks, api',
    pitfallDiagnosis: 'الهياكل المبعثرة تصبح مستحيلة الصيانة والتوسع عند عمل فرق عمل متعددة.',
    quizPool: [{
      q: 'Which architectural structure is recommended for large-scale React applications?',
      qAr: 'أي هيكل معماري يوصى به لتطبيقات ريآكت الكبرى؟',
      options: ['Single flat folder', 'Feature-based modular structure', 'Group by file type only', 'No folders'],
      correct: 1,
      why: 'Feature-based structure encapsulates components, hooks, and logic per business domain.',
      whyAr: 'الهيكل القائم على الميزات يكبسل كل ما يخص النطاق الوظيفي في مكان واحد.'
    }],
    interviewQ: 'ما هي أهم 5 معايير تتحقق منها قبل إطلاق تطبيق ريآكت إلى الإنتاج؟',
    interviewA: '1. تطبيق Code-Splitting على مستوى المسارات. 2. التحقق من خلو الـ Console من الأخطاء والتحذيرات. 3. فحص معايير الوصول WCAG وإتاحة لوحة المفاتيح. 4. قياس Core Web Vitals (LCP < 2.5s, CLS < 0.1). 5. تفعيل مراقبة الأخطاء في الإنتاج باستخدام أداة مثل Sentry.'
  }
];
