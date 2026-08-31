/* ============================================================
   scripts/curriculum-data/foundations-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 1: Web & JavaScript Foundations (All 12 Lessons).
   ============================================================ */

export const foundationsLessons = [
  {
    slug: 'html-semantic',
    title: 'Semantic HTML, Document Outlines & Accessibility (a11y)',
    titleAr: 'الهيكل الدلالي للـ HTML ومعايير الوصول الشامل (a11y)',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'HTML5 Living Standard',
    pattern: 'Semantic Landmark Architecture',
    objectives: [
      'التمييز الصارم بين العناصر الدلالية (Semantic) وغير الدلالية وتأثيرها على شجرة الـ Accessibility Tree.',
      'بناء هيكل صفحة قياسي باستخدام header, nav, main, article, section, aside, و footer بدون div-soup.',
      'تطبيق سمات ARIA Landmarks و Heading Hierarchies لتحقيق توافق كامل مع معايير WCAG 2.1 AA.',
      'تجنب الأخطاء الكارثية في الـ SEO وتجربة مستخدمي قارئات الشاشة (Screen Readers).'
    ],
    problemOpening: `
      تخيل إنك دخلت مكتبة ضخمة جداً، لكن كل الكتب فيها متجلدة بنفس اللون الأبيض وبدون أي عناوين على الغلاف، وكل الرفوف متسمية "صندوق 1"، "صندوق 2"! عشان تلاقي معلومة، محتاج تفتح كل كتاب وتقرأه سطر سطر.
      ده بالضبط اللي بتعمله لما تبني موقعك كله عبارة عن <code dir="ltr">&lt;div&gt;</code> و <code dir="ltr">&lt;span&gt;</code> فقط (ما يعرف هندسياً بـ Div Soup).
      المستخدم العادي اللي بيشوف بعينه ممكن مياخدش باله لو التصميم منسق بـ CSS، لكن محركات البحث (SEO Crawlers) وقارئات الشاشة للمكفوفين (Screen Readers مثل NVDA و VoiceOver) بتشوف موقعك ككتلة عشوائية مجهولة المعالم. في الواقع العملي، الشركات بتخسر ملايين بسبب قضايا عدم التوافق مع معايير الوصول (WCAG Accessibility Laws)، وموقعك بيسقط في ترتيب جوجل لأن عناكب البحث مش قادرة تحدد فين المحتوى الرئيسي وفين القائمة الجانبية وفين الترويسة.
      استخدام الوسوم الدلالية (Semantic HTML) مش مجرد "شياكة كود" — ده أساس هندسي بيبني شجرة موازية للـ DOM اسمها Accessibility Tree بتخلي المتصفح يفهم طبيعة كل عنصر ودوره الوظيفي.
    `,
    mechanics: [
      { step: '01', title: 'بناء معالم الوثيقة الرئيسية (Landmark Roles)', desc: 'تقسيم الصفحة إلى 4 مناطق سيادية: header كـ banner، nav للتنقل، main للمحتوى الفريد (يوجد main واحد فقط لكل صفحة)، و footer للمعلومات القانونية وروابط النهاية.' },
      { step: '02', title: 'التفريق الدقيق بين Article و Section', desc: 'استخدم <article> للوحدة المستقلة التي يمكن اقتطاعها ونشرها في موقع آخر (مثل تدوينة، كارت منتج، تعليق). استخدم <section> لتقسيم الموضوع الواحد إلى فصول مع وجود عنوان h2-h6 إلزامي.' },
      { step: '03', title: 'انضباط التسلسل الهرمي للعناوين (Heading Hierarchy)', desc: 'عنوان h1 وحيد يعبر عن الموضوع الرئيسي للصفحة، تتفرع تحته h2 للأقسام الرئيسية، ثم h3 للتفريعات الداخلية دون القفز من h2 إلى h4 مطلقاً.' },
      { step: '04', title: 'تعزيز النماذج التفاعلية بـ Labels و Fieldset', desc: 'كل input يجب أن يرتبط بـ <label for="id"> صريح لتكبير مساحة الضغط وتوجيه قارئات الشاشة، مع تجميع الخيارات المتشابهة داخل <fieldset> و <legend>.' },
      { step: '05', title: 'إتاحة الوسائط المتعددة (Images & Interactive SVG)', desc: 'كتابة نص بديل alt وصفي وواضح للصور، مع استخدام role="img" و aria-label للرسوم المتجهة SVG لمنع تجاهلها من قبل التقنيات المساعدة.' }
    ],
    playgroundCode: `<!-- محاكي الهيكل الدلالي النظيف -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <style>
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    header, nav, main, article, aside, footer { border: 1px dashed #38bdf8; padding: 12px; margin-bottom: 10px; border-radius: 8px; }
    header { background: rgba(56, 189, 248, 0.1); }
    nav { background: rgba(16, 185, 129, 0.1); border-color: #10b981; }
    main { background: rgba(129, 140, 248, 0.1); border-color: #818cf8; }
    article { background: rgba(245, 158, 11, 0.1); border-color: #f59e0b; }
    footer { background: rgba(148, 163, 184, 0.1); border-color: #94a3b8; }
    h1, h2 { margin: 0 0 8px 0; }
  </style>
</head>
<body>
  <header>
    <h1>مدونة هندسة الويب الحديثة</h1>
    <nav aria-label="التنقل الرئيسي">
      <a href="#articles" style="color: #38bdf8;">المقالات</a> | <a href="#about" style="color: #38bdf8;">عن المنصة</a>
    </nav>
  </header>

  <main id="main-content">
    <article aria-labelledby="post-1">
      <h2 id="post-1">لماذا يجب عليك التوقف عن استخدام div لكل شيء؟</h2>
      <p>الهيكل الدلالي يمنح موقعك قوة لا تضاهى في الـ SEO وتوافقية الـ a11y.</p>
    </article>
  </main>

  <footer>
    <p>© 2026 جميع الحقوق محفوظة — معايير WCAG 2.1 AA</p>
  </footer>
</body>
</html>`,
    experimentQuestion: 'ماذا يحدث إذا قمت بوضع زر <button> داخل رابط <a>، أو العكس؟ ولماذا يعتبر ذلك خطأً جسيماً في الـ HTML Living Standard؟',
    experimentAnswer: 'المواصفة القياسية للـ HTML تمنع تضمين عنصر تفاعلي (Interactive Content) داخل عنصر تفاعلي آخر. المتصفح سيحدث له عطل في حساب الـ Focus Management، وقارئ الشاشة لن يتمكن من إخبار المستخدم المكفوف بما سيحدث عند الضغط: هل سينتقل لرابط أم سينفذ إجراء؟ كما أن محرك المتصفح قد يقوم تلقائياً بكسر الـ DOM وإغلاق الوسم مبكراً مما يدمر التنسيق.',
    codeAnatomy: [
      { line: '<header role="banner">', note: 'ترويسة الموقع المعرفة كمعلم رئيسي' },
      { line: '  <a href="#main" class="skip-link">تخطي للمحتوى</a>', note: 'رابط إمكانية وصول حاسم لمستخدمي لوحة المفاتيح' },
      { line: '  <nav aria-label="القائمة الرئيسية">', note: 'منطقة تنقل مع تسمية واضحة لقارئات الشاشة' },
      { line: '    <ul role="list">', note: 'قائمة تنقل غير مرتبة' },
      { line: '      <li><a href="./index.html" aria-current="page">الرئيسية</a></li>', note: 'الإشارة للصفحة الحالية دلالياً' },
      { line: '    </ul>', note: 'إغلاق قائمة التنقل' },
      { line: '  </nav>', note: 'إغلاق المعلم' },
      { line: '</header>', note: 'نهاية الترويسة' },
      { line: '<main id="main" tabindex="-1">', note: 'المحتوى الفريد الرئيسي للصفحة' },
      { line: '  <article aria-labelledby="article-title">', note: 'محتوى مستقل قائم بذاته' },
      { line: '    <h1 id="article-title">بناء واجهات متاحة</h1>', note: 'العنوان الرئيسي الوحيد H1 للوثيقة' },
      { line: '    <section aria-labelledby="sec-1">', note: 'قسم موضوعي داخل المقال' },
      { line: '      <h2 id="sec-1">معايير ARIA الأساسية</h2>', note: 'عنوان H2 فرعي يتبع H1' },
      { line: '      <p>تفاصيل القسم وشروحاته...</p>', note: 'فقرة نصية غنية' },
      { line: '    </section>', note: 'إغلاق القسم' },
      { line: '  </article>', note: 'إغلاق المقال' },
      { line: '</main>', note: 'إغلاق المحتوى الرئيسي' }
    ],
    pitfallBad: `<div class="button" onclick="goToCheckout()">
  <span>إتمام الدفع</span>
</div> <!-- كارثة: لا يمكن الوصول إليه عبر زر Tab في الكيبورد ولا تفهمه قارئات الشاشة -->`,
    pitfallGood: `<button type="button" class="btn-checkout" onclick="goToCheckout()">
  <span>إتمام الدفع</span>
</button> <!-- مثالي: يحصل على Focus تلقائي ويدعم مفتاحي Enter و Space ومعرف دلالياً -->`,
    pitfallDiagnosis: 'استخدام div كزر يحرم ذوي الاحتياجات الخاصة من استخدام لوحة المفاتيح للتنقل (Keyboard Navigation) ويجعل الموقع مخالفاً لمعايير ADA و WCAG، بينما وسم button يوفر هذه السلوكيات مجاناً على مستوى المتصفح.',
    quizPool: [
      {
        q: 'What is the fundamental difference between <article> and <section>?',
        qAr: 'ما هو الفرق الجوهري الدلالي بين عنصر <article> وعنصر <section>؟',
        options: [
          '<article> is self-contained and reusable independently; <section> is a thematic grouping that requires a heading.',
          '<article> is only for blog posts, while <section> is for layouts.',
          '<section> has default browser styles while <article> does not.',
          'There is no semantic difference, both are aliases for <div>.'
        ],
        correct: 0,
        why: '<article> represents completely independent, syndicatable content. <section> represents a logical sub-part of a larger document and should always have a heading.',
        whyAr: 'عنصر article يمثل محتوى مستقلاً يمكن إعادة نشره في أي مكان بذاته، بينما section يمثل قسماً موضوعياً داخل وثيقة ويجب أن يحتوي على عنوان.'
      },
      {
        q: 'Why should a web page contain exactly ONE <h1> element in modern semantic hierarchy?',
        qAr: 'لماذا يجب أن تحتوي صفحة الويب على وسم <h1> واحد فقط وفق المعايير القياسية الحديثة؟',
        options: [
          'It defines the primary document topic for search engines and screen reader landmark navigation.',
          'Browsers will throw a syntax error if more than one <h1> exists.',
          'CSS cannot style multiple <h1> elements properly.',
          'Multiple <h1> elements crash mobile rendering engines.'
        ],
        correct: 0,
        why: 'Screen readers allow users to jump directly to the <h1> to understand the main topic of the page. Having multiple confuses the document outline.',
        whyAr: 'قارئات الشاشة تتيح للمكفوفين القفز مباشرة لعنوان h1 لمعرفة موضوع الصفحة الأساسي؛ وجود أكثر من واحد يشوش على شجرة الوثيقة.'
      },
      {
        q: 'Which element should be used for supplementary content like related articles or author bio?',
        qAr: 'أي عنصر دلالي يجب استخدامه للمحتوى الجانبي أو التكميلي مثل معلومات الكاتب أو الروابط ذات الصلة؟',
        options: ['<aside>', '<sidebar>', '<section role="extra">', '<nav class="sub">'],
        correct: 0,
        why: '<aside> represents content tangentially related to the content around it (e.g., sidebars, callouts, author info).',
        whyAr: 'عنصر aside مخصص دلالياً للمحتوى المكمل أو الفرعي المرتبط بالموضوع الرئيسي.'
      },
      {
        q: 'What is the purpose of the alt attribute on an <img> tag?',
        qAr: 'ما هي الوظيفة الأساسية لخاصية alt في وسم الصور <img>؟',
        options: [
          'Provides a text alternative for screen readers and displays when the image fails to load.',
          'Sets the tooltip text when hovering over the image.',
          'Specifies the high-resolution image source.',
          'Improves image compression efficiency.'
        ],
        correct: 0,
        why: 'The alt attribute ensures accessibility for visually impaired users and acts as a fallback when images fail to render.',
        whyAr: 'توفر نصاً بديلاً لقارئات الشاشة وتعرض للمستخدمين في حال فشل تحميل ملف الصورة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تؤثر الـ Accessibility (a11y) وشجرة الـ AOM على أداء الموقع وسيو (SEO) وما هي Landmark Roles؟',
    interviewA: 'المتصفحات الحديثة تبني شجرتين متوازيتين: DOM Tree للعرض البصري و Accessibility Tree (AOM) للتقنيات المساعدة. عندما تستخدم وسوماً دلالية مثل main و nav و header، يقوم المتصفح تلقائياً بتعيين Landmark Roles بدون كتابة كود إضافي. خوارزميات جوجل تستخدم شجرة الـ AOM لفهم هيكل الصفحة بدقة، والمواقع التي تحقق توافقية WCAG 2.1 AA تتصدر نتائج البحث وتتفادى المساءلات القانونية في الأسواق العالمية.'
  },
  {
    slug: 'css-box-model',
    title: 'CSS Box Model, Flexbox Axis & Modern Grid Layouts',
    titleAr: 'نموذج الصندوق CSS Box Model، محاور Flexbox وشبكات Grid الحديثة',
    level: 1,
    order: 3,
    estMinutes: 35,
    version: 'CSS3 / CSS Box Model Module Level 4',
    pattern: 'Layout Engine & Formatting Contexts',
    objectives: [
      'فهم حسابات الأبعاد الفيزيائية للمكونات والفرق الجذري بين content-box و border-box.',
      'إتقان محاور Flexbox (Main Axis vs Cross Axis) والتحكم في سلوك الانكماش والنمو (flex-grow, flex-shrink, flex-basis).',
      'بناء شبكات Grid ثنائية الأبعاد باستخدام minmax(), auto-fill, و repeat() لتصميم واجهات فائقة الاستجابة بدون Media Queries.',
      'تشخيص مشاكل تداخل الهوامش (Margin Collapsing) وسياقات التنسيق (Block Formatting Context - BFC).'
    ],
    problemOpening: `
      لو سألت أي مبرمج مبتدئ: "لو عندي عنصر عرضه 200px، وحطيت عليه padding بـ 20px و border بـ 5px، عرضه الكلي على الشاشة هيكون كام؟" — أغلبهم هيقول "200px"!
      لكن في الحقيقة المتصفح هيعرضه بعرض 250px! وهنا تبدأ كوابيس الـ CSS: تصميمات بتنكسر، عناصر بتنزل سطر جديد بدون سبب واضح، وscrollbars أفقية مزعجة بتظهر في الموبايل.
      السبب وراء ده هو الفهم الخاطئ لنموذج الصندوق (CSS Box Model). كل عنصر في صفحة الويب هو عبارة عن صندوق مستطيل يتكون من 4 طبقات متداخلة: المحتوى (Content)، الحشوة الداخلية (Padding)، الإطار (Border)، والهامش الخارجي (Margin).
      في هذا الدرس، هنفكك محرك التنسيق في المتصفح من الداخل، وهنعرف إزاي نتحكم في أبعاد العناصر بدقة بيكسلية، وإزاي ننقل تفكيرنا من التنسيق العشوائي إلى التنسيق المعماري المنضبط باستخدام Flexbox للمحور الأحادي و CSS Grid للمصفوفات ثنائية الأبعاد.
    `,
    mechanics: [
      { step: '01', title: 'ضبط النموذج القياسي: box-sizing: border-box', desc: 'إعادة ضبط كل عناصر الصفحة لتشمل الحشوة والإطار داخل العرض والارتفاع المحدد، مما يمنع تضخم العناصر بشكل غير متوقع.' },
      { step: '02', title: 'فهم وتفكيك ظاهرة تداخل الهوامش (Margin Collapsing)', desc: 'عندما يتجاور عنصران رأسياً بهوامش margin-bottom و margin-top، لا يتم جمعهما، بل يدمجان في الهامش الأكبر ما لم يتم إنشاء BFC.' },
      { step: '03', title: 'إتقان محاور Flexbox واتجاه التدفق', desc: 'تحديد flex-direction يحدد الـ Main Axis (محاذاة عبر justify-content) والـ Cross Axis (محاذاة عبر align-items).' },
      { step: '04', title: 'معادلة التوزيع الدقيقة: flex: grow shrink basis', desc: 'حساب المساحة المتبقية: flex-basis تمثل الحجم الابتدائي قبل توزيع الفائض بـ flex-grow أو التقليص بـ flex-shrink.' },
      { step: '05', title: 'قوة CSS Grid الاستجابية الفائقة: minmax() + auto-fit', desc: 'إنشاء شبكات متجاوبة بالكامل بدون كتابة media queries واحدة عبر دمج repeat(auto-fit, minmax(280px, 1fr)).' }
    ],
    playgroundCode: `/* تجربة شبكة Grid متجاوبة بدون Media Queries */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 20px;
  background: #0f172a;
}

.card {
  box-sizing: border-box;
  background: #1e293b;
  border: 2px solid #38bdf8;
  border-radius: 12px;
  padding: 20px;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

console.log("CSS Grid Initialized with Fluid Responsiveness.");`,
    experimentQuestion: 'ما الفرق بين auto-fit و auto-fill في CSS Grid عندما يكون عدد العناصر قليلاً ولا يملأ عرض الشاشة بالكامل؟',
    experimentAnswer: 'مع auto-fill، يقوم المتصفح بإنشاء أعمدة فارغة إضافية على اليمين حتى يملأ مساحة الحاوية. أما مع auto-fit، يقوم المتصفح بدمج الأعمدة الفارغة وتوسيع العناصر الموجودة فعلياً (تمديدها بـ 1fr) لتشغل كامل عرض السطر.',
    codeAnatomy: [
      { line: '*, *::before, *::after {', note: 'محدد عالمي يشمل كل العناصر والعناصر الزائفة' },
      { line: '  box-sizing: border-box;', note: 'جعل العرض والارتفاع يشملان Padding و Border' },
      { line: '  margin: 0; padding: 0;', note: 'تصفير الهوامش الافتراضية للمتصفح' },
      { line: '}', note: 'نهاية إعادة الضبط' },
      { line: '.grid-layout {', note: 'حاوية الشبكة ثنائية الأبعاد' },
      { line: '  display: grid;', note: 'تفعيل سياق تنسيق Grid' },
      { line: '  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));', note: 'إنشاء أعمدة مرنة تستجيب لحجم الشاشة' },
      { line: '  gap: clamp(16px, 2vw, 32px);', note: 'مسافات بينية مرنة بحسابات fluid' },
      { line: '}', note: 'نهاية الشبكة' },
      { line: '.flex-toolbar {', note: 'حاوية شريط الأدوات أحادي البعد' },
      { line: '  display: flex;', note: 'تفعيل سياق Flexbox' },
      { line: '  justify-content: space-between;', note: 'توزيع العناصر على أطراف المحور الرئيسي' },
      { line: '  align-items: center;', note: 'محاذاة العناصر عمودياً في المنتصف' },
      { line: '  flex-wrap: wrap;', note: 'السماح للعناصر بالنزول لسطر جديد عند ضيق الشاشة' },
      { line: '}', note: 'نهاية شريط الأدوات' }
    ],
    pitfallBad: `/* خطأ شائع يسبب ظهور شريط تمرير أفقي غير مرغوب */
.full-width-container {
  width: 100vw;
  padding: 0 40px;
} /* 100vw لا تخصم عرض شريط التمرير الرأسي في المتصفح، مما ينتج عنه overflow أفقي */`,
    pitfallGood: `/* الحل المعماري السليم */
.full-width-container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 40px;
} /* يتكيف مع الحاوية الأم ولا يسبب أي overflow أفقي */`,
    pitfallDiagnosis: 'استخدام 100vw مع وجود شريط تمرير عمودي يضيف حوالي 15-17px إضافية لعرض الشاشة مما يؤدي لكسر التنسيق الأفقي، بينما width: 100% تعتمد على مساحة الـ viewport الفعلية المتاحة داخل الـ body.',
    quizPool: [
      {
        q: 'Under box-sizing: border-box, what is the total rendered width of an element with width: 300px, padding: 20px, and border: 2px?',
        qAr: 'في نمط box-sizing: border-box، كم سيكون العرض الكلي لعنصر محدد له width: 300px و padding: 20px و border: 2px؟',
        options: ['300px', '344px', '322px', '256px'],
        correct: 0,
        why: 'In border-box sizing, padding and borders are absorbed inside the specified width, maintaining exactly 300px.',
        whyAr: 'في نمط border-box، يتم تضمين الـ padding والـ border داخل العرض الإجمالي المحدد، فيظل العرض الكلي 300px بالضبط.'
      },
      {
        q: 'When does vertical margin collapsing occur between two adjacent block elements?',
        qAr: 'متى تحدث ظاهرة تداخل الهوامش الرأسية (Margin Collapsing) بين عنصرين كتليين متجاورين؟',
        options: [
          'When two adjacent block elements in normal flow have vertical margins touching without padding/border/BFC separating them.',
          'Whenever display: flex is applied to the parent container.',
          'Only when negative margins are explicitly declared.',
          'Between inline-block elements aligned horizontally.'
        ],
        correct: 0,
        why: 'Vertical margin collapsing happens for in-flow block boxes when top and bottom margins touch with no border, padding, or BFC boundary.',
        whyAr: 'تحدث بين العناصر الكتلية المتتالية في التدفق الطبيعي عندما تتلامس الهوامش بدون وجود padding أو border أو BFC يفصل بينها.'
      },
      {
        q: 'What is the primary role of flex-shrink: 0 on a flex child item?',
        qAr: 'ما هو الدور الأساسي لخاصية flex-shrink: 0 على عنصر فرعي داخل Flexbox؟',
        options: [
          'Prevents the item from shrinking below its flex-basis or content size when container space is constrained.',
          'Forces the item to take up all remaining available space.',
          'Aligns the item to the start of the cross axis.',
          'Hides the item on mobile viewports.'
        ],
        correct: 0,
        why: 'Setting flex-shrink to 0 guarantees that the element preserves its intrinsic or specified size and will never compress.',
        whyAr: 'تعيين flex-shrink بقيمة 0 يمنع العنصر نهائياً من الانكماش أو التصغير عند ضيق مساحة الحاوية.'
      },
      {
        q: 'Which CSS Grid property enables items to wrap automatically without media queries?',
        qAr: 'أي خاصية في CSS Grid تمكن العناصر من الالتفاف تلقائياً لأسطر جديدة بدون Media Queries؟',
        options: [
          'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
          'grid-auto-flow: wrap;',
          'display: grid-responsive;',
          'grid-template-rows: auto-wrap;'
        ],
        correct: 0,
        why: 'repeat(auto-fit, minmax(...)) dynamically computes the number of columns based on available container width.',
        whyAr: 'دالة repeat مع auto-fit و minmax تحسب تلقائياً عدد الأعمدة المناسب لعرض الشاشة دون الحاجة لـ Media Queries.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو سياق التنسيق الكتلي (Block Formatting Context - BFC) وكيف يؤثر على Floats و Margins؟',
    interviewA: 'الـ BFC هو بيئة بصرية معزولة يتم فيها رصف الصناديق الكتلية. العناصر داخل الـ BFC لا تتأثر بالـ Floats الخارجية ولا تتدخل هوامشها (Margins) مع هوامش العناصر خارجها، كما أن الـ BFC يحتوي عناصره الطافية (Clearing Floats تلقائياً). يمكن إنشاء BFC جديد باستخدام: display: flow-root (الطريقة الأحدث والأنظف)، أو overflow: hidden، أو display: flex/grid.'
  },
  {
    slug: 'js-types-operators',
    title: 'JavaScript Types, Coercion Quirks & Symbols/BigInt',
    titleAr: 'أنواع البيانات في جافاسكريبت، غرائب التحويل التلقائي (Coercion) و Symbols/BigInt',
    level: 1,
    order: 4,
    estMinutes: 30,
    version: 'ES2024+ Standard',
    pattern: 'Type System & Coercion Rules',
    objectives: [
      'التمييز بين الأنواع البدائية (7 Primitives) والأنواع المرجعية (Objects & Heap Memory).',
      'فهم خوارزميات التحويل التلقائي للأنواع (Implicit vs Explicit Coercion) وقواعد ToPrimitive.',
      'إتقان التعامل مع BigInt للعمليات الحسابية الدقيقة وتفادي كوارث تقريب الأعداد الكبيرة.',
      'استخدام Symbols لإنشاء خصائص فريدة ومنع تصادم المفاتيح في المكتبات الكبرى.'
    ],
    problemOpening: `
      جافاسكريبت لغة ديناميكية النوع (Dynamically Typed)، وده بيديها مرونة وسرعة كبيرة في التطوير، لكنه في نفس الوقت أكبر مصدر للكوارث البرمجية لو مش فاهم إزاي المحرك بيتعامل مع البيانات في الذاكرة.
      كم مرة شفت كود بيعمل <code dir="ltr">[] + {}</code> ويطلع <code dir="ltr">"[object Object]"</code>، أو <code dir="ltr">{} + []</code> ويطلع <code dir="ltr">0</code>؟ أو عملية مقارنة مشهورة زي <code dir="ltr">0 == "0"</code> بتطلع <code dir="ltr">true</code> لكن <code dir="ltr">0 === "0"</code> بتطلع <code dir="ltr">false</code>؟
      في بيئات الإنتاج، الأخطاء دي مش مجرد نكت برمجية — دي بتسبب أخطاء محاسبية كارثية لما تجمع أسعار منتجات كـ Strings بدل Numbers، أو تفقد دقة أرقام المعاملات البنكية ذات الـ 64 بت لأنها تخطت <code dir="ltr">Number.MAX_SAFE_INTEGER</code>!
      في هذا الدرس، هنتعلم القواعد الصارمة لمحرك V8 في تمثيل الأنواع البدائية في الـ Stack والأنواع المرجعية في الـ Heap، وهنتقن العمل مع <code dir="ltr">BigInt</code> و <code dir="ltr">Symbol</code> لحماية تطبيقاتنا من أخطاء التحويل الخفية.
    `,
    mechanics: [
      { step: '01', title: 'الأنواع البدائية السبعة (The 7 Primitives)', desc: 'string, number, bigint, boolean, undefined, symbol, null. تُخزن بقيمتها الثابتة (Immutable) مباشرة في الـ Stack.' },
      { step: '02', title: 'الأنواع المرجعية والذاكرة (Reference Types & Heap)', desc: 'الكائنات والمصفوفات والدوال تُخزن في الـ Heap، والمتغير يحمل فقط مؤشر الذاكرة (Memory Reference). المقارنة بـ === تقارن المرجع وليس المحتوى.' },
      { step: '03', title: 'خوارزمية ToPrimitive للتحويل التلقائي', desc: 'عند إجراء عملية بين أنواع مختلفة، يستدعي المحرك Symbol.toPrimitive أو valueOf() ثم toString() لتحويل الكائن إلى قيمة بدائية.' },
      { step: '04', title: 'حدود الأمان الرقمي و BigInt', desc: 'الأرقام في JS تتبع معيار IEEE 754 Double Precision (53-bit mantissa). الأرقام فوق 2^53 - 1 تفقد دقتها ويجب تمثيلها باستخدام BigInt (123n).' },
      { step: '05', title: 'عالم الرموز الفريدة (Symbols & Well-Known Symbols)', desc: 'الرمز Symbol() فريد ومضمون عدم تكراره حتى لو حمل نفس الوصف، ويستخدم لإنشاء خصائص كائنات خاصة وتخصيص سلوك اللغة مثل Symbol.iterator.' }
    ],
    playgroundCode: `// محاكي فحص الأنواع وغرائب الـ Coercion
console.log("Type of null:", typeof null); // "object" (Legacy Bug in JS Engine)
console.log("Type of NaN:", typeof NaN);   // "number"
console.log("NaN === NaN:", NaN === NaN);   // false (Use Number.isNaN)

// Safe Integer Boundary
const max = Number.MAX_SAFE_INTEGER;
console.log("Max Safe Int:", max);
console.log("max + 1 === max + 2:", max + 1 === max + 2); // true (Precision Lost!)

// BigInt Solution
const big1 = BigInt(max) + 1n;
const big2 = BigInt(max) + 2n;
console.log("BigInt Correct Comparison:", big1 === big2); // false`,
    experimentQuestion: 'لماذا تنتج العملية typeof null القيمة "object" في جافاسكريبت، ولماذا لم يتم إصلاح هذا الخطأ حتى اليوم في مواصفات ECMAScript؟',
    experimentAnswer: 'في النسخة الأولى من جافاسكريبت عام 1995، كانت القيم تُخزن في وحدات 32-bit وكان أول 3 بتات (000) تعني أن القيمة هي Object. وبما أن قيمة null كانت تمثل مؤشر الذاكرة الفارغ (NULL pointer = 0x00)، اعتبرها المحرك تلقائياً Object. لم يتم إصلاح هذا الخطأ لأن تعديله الآن سيكسر ملايين المواقع القديمة العاملة على الإنترنت (Breaking Backwards Compatibility).',
    codeAnatomy: [
      { line: 'const id1 = Symbol("userId");', note: 'إنشاء رمز فريد للمعرف' },
      { line: 'const id2 = Symbol("userId");', note: 'إنشاء رمز فريد آخر بنفس الوصف' },
      { line: 'console.log(id1 === id2); // false', note: 'كل رمز فريد تماماً في الذاكرة' },
      { line: 'const user = {', note: 'إنشاء كائن مستخدم' },
      { line: '  name: "Sarah",', note: 'خاصية عادية قابلة للتكرار' },
      { line: '  [id1]: "USR-9921"', note: 'خاصية سرية باستخدام الرمز كمفتاح' },
      { line: '};', note: 'نهاية الكائن' },
      { line: 'console.log(Object.keys(user)); // ["name"]', note: 'خصائص Symbols لا تظهر في الحلقات العادية' },
      { line: 'const bigValue = 9007199254740993n;', note: 'تعريف BigInt بإضافة حرف n في النهاية' },
      { line: 'const sum = bigValue + 100n;', note: 'العمليات الحسابية مع BigInt تتطلب أطراف BigInt فقط' }
    ],
    pitfallBad: `// خطأ فادح: استخدام parseInt بدون تحديد الـ Radix ومقارنة القيم بـ ==
const input = "08";
const num = parseInt(input); // في بعض البيئات القديمة قد يعامل كـ Octal
if (num == false) { /* Coercion غير متوقع */ }`,
    pitfallGood: `// الحل الهندسي الصارم
const input = "08";
const num = Number.parseInt(input, 10); // تحديد Base-10 صراحة
if (Number.isNaN(num)) {
  throw new TypeError("Invalid numerical input");
}
if (num === 0) { /* مقارنة صارمة للنوع والقيمة */ }`,
    pitfallDiagnosis: 'استخدام عوامل المقارنة المتساهلة == يجبر المحرك على تطبيق قواعد Coercion معقدة قد تؤدي لتحويل الصفر والنصوص الفارغة إلى false، بينما === تضمن التحقق الصارم من تطابق النوع والقيمة في خطوة واحدة.',
    quizPool: [
      {
        q: 'Which of the following is NOT a JavaScript primitive data type?',
        qAr: 'أي من الخيارات التالية لا يعتبر نوعاً بدائياً (Primitive Type) في جافاسكريبت؟',
        options: ['Array', 'Symbol', 'BigInt', 'Undefined'],
        correct: 0,
        why: 'Arrays are objects (reference types) stored in heap memory, whereas Symbol, BigInt, and Undefined are primitives.',
        whyAr: 'المصفوفات هي كائنات (Reference Types) تُخزن في الـ Heap، بينما Symbol و BigInt و Undefined هي أنواع بدائية.'
      },
      {
        q: 'How should you reliably check if a variable x is strictly NaN in modern JavaScript?',
        qAr: 'كيف يمكنك التحقق بشكل موثوق مما إذا كانت القيمة x هي NaN في جافاسكريبت الحديثة؟',
        options: ['Number.isNaN(x)', 'x === NaN', 'typeof x === "nan"', 'x.isNaN()'],
        correct: 0,
        why: 'NaN is the only value in JavaScript that is not equal to itself (NaN === NaN is false). Number.isNaN(x) safely checks without coercion.',
        whyAr: 'قيمة NaN هي القيمة الوحيدة في جافاسكريبت التي لا تساوي نفسها؛ لذلك يُستخدم Number.isNaN(x) للتحقق الموثوق.'
      },
      {
        q: 'What happens when you mix a BigInt with a standard Number in an arithmetic operation like 10n + 5?',
        qAr: 'ماذا يحدث عند خلط BigInt مع Number عادي في عملية حسابية مثل 10n + 5؟',
        options: [
          'A TypeError is thrown to prevent implicit precision loss.',
          'The result automatically becomes a BigInt (15n).',
          'The result automatically becomes a Number (15).',
          'It concatenates them as strings ("105").'
        ],
        correct: 0,
        why: 'JavaScript prohibits implicit coercion between BigInt and Number to avoid silent precision errors; an explicit TypeError is thrown.',
        whyAr: 'جافاسكريبت تمنع التحويل التلقائي بين BigInt و Number لتفادي فقدان الدقة وترمي خطأ TypeError صريحاً.'
      },
      {
        q: 'What is the return value of Symbol("app") === Symbol("app")?',
        qAr: 'ما هي نتيجة المقارنة Symbol("app") === Symbol("app")؟',
        options: ['false', 'true', 'TypeError', 'undefined'],
        correct: 0,
        why: 'Every call to Symbol() generates a unique memory token, even if identical description strings are provided.',
        whyAr: 'كل استدعاء لدالة Symbol() ينشئ رمزاً فريداً ومستقلاً تماماً في الذاكرة حتى لو تساوى الوصف.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: اشرح بالتفصيل كيف تنفذ خوارزمية Abstract Equality Comparison (==) المقارنة بين كائن وقيمة بدائية؟',
    interviewA: 'عند مقارنة كائن بقيمة بدائية (مثل [1] == 1)، تطبق جافاسكريبت خوارزمية ToPrimitive على الكائن. تبحث أولاً عن ميثود [Symbol.toPrimitive](hint). إذا لم تكن موجودة، تستدعي valueOf()، وإذا لم ترجع قيمة بدائية، تستدعي toString(). في حالة [1]، ترجع toString() النص "1"، ثم تقارن "1" == 1، فتحول النص إلى رقم (1 == 1) فتكون النتيجة true! لتجنب هذا التعقيد غير المتوقع، يُنصح دائماً باستخدام ===.'
  },
  {
    slug: 'js-control-flow',
    title: 'Control Flow, Iterators, Labeled Loops & Break/Continue',
    titleAr: 'التحكم في تدفق التنفيذ، بروتوكول التكرار Iterators، الحلقات المسماة و Break/Continue',
    level: 1,
    order: 5,
    estMinutes: 28,
    version: 'ES2024+ Standard',
    pattern: 'Control Flow & Iterable Protocol',
    objectives: [
      'التحكم الدقيق في مسار التنفيذ باستخدام switch-case الصارمة والحلقات التكرارية المتقدمة.',
      'فهم بروتوكول التكرار (Iterable & Iterator Protocols) والفرق الجوهري بين for..in و for..of.',
      'استخدام الحلقات المسماة (Labeled Statements) للقفز والخروج من الحلقات المتداخلة بكفاءة.',
      'تجنب الحلقات اللانهائية وتكلفة حظر الخيط الرئيسي (Blocking Event Loop) في المتصفح.'
    ],
    problemOpening: `
      التحكم في تدفق الكود هو المحرك الأساسي لأي منطق برمجي. لكن في جافاسكريبت، هناك فرق شاسع بين كتابة حلقة تكرارية عادية وبين فهم كيفية استهلاك المحرك لمصادر الذاكرة والمعالج.
      كم مرة كتبت حلقة <code dir="ltr">for..in</code> على مصفوفة وتفاجأت بأنها تمر على الخصائص الموروثة من الـ Prototype وبترتيب عشوائي غير مضمون؟
      أو كم مرة دخلت في حلقة مفرغة من الحلقات المتداخلة (Nested Loops) واضطريت لعمل متغيرات أعلام (Flags) معقدة لمجرد الخروج من حلقتين في وقت واحد؟
      في هذا الدرس، هنتعلم إزاي نبني مسارات تحكم صارمة، ونفهم بروتوكول التكرار الـ Iterator Protocol اللي بيشغل الـ Spread Operator والـ Destructuring، وإزاي نستخدم Labeled Loops للتحكم في الحلقات المتداخلة بأعلى أداء ممكن.
    `,
    mechanics: [
      { step: '01', title: 'البنية الشرطية الصارمة: switch(true) Pattern', desc: 'استخدام نمط switch(true) لتقييم الشروط المعقدة كبديل أنظف وأكثر قابلية للقراءة من سلاسل if-else if المتشعبة.' },
      { step: '02', title: 'بروتوكول التكرار (Symbol.iterator)', desc: 'أي كائن يحتوي على دالة Symbol.iterator يعتبر Iterable وينتج كائناً يحتوي على ميثود next() تُرجع { value, done }.' },
      { step: '03', title: 'التفريق الصارم: for..in مقابل for..of', desc: 'تستخدم for..of للمرور على قيم الكائنات القابلة للتكرار (Arrays, Sets, Maps). تستخدم for..in للمرور على المفاتيح القابلة للتعداد (Enumerable Keys) في الكائنات.' },
      { step: '04', title: 'التحكم في الحلقات المتداخلة بـ Labeled Break', desc: 'إعطاء اسم للحلقة الخارجية (outerLoop:) واستدعاء break outerLoop للخروج الفوري من المستويات المتعددة بدون أعلام boolean.' },
      { step: '05', title: 'منع تجميد الخيط الرئيسي (Non-blocking Iteration)', desc: 'تقسيم الحلقات الحسابية الضخمة (100k+ items) إلى دفعات عبر setTimeout أو requestIdleCallback لمنع تجميد واجهة المستخدم.' }
    ],
    playgroundCode: `// تجربة Labeled Loops ومطابقة البروتوكول
outerMatrix: for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (r === 1 && c === 1) {
      console.log(\`Found target at [\${r}, \${c}], breaking entire matrix!\`);
      break outerMatrix; // ينهي الحلقتين معاً فوراً
    }
    console.log(\`Checking cell: [\${r}, \${c}]\`);
  }
}

// مصفوفة مخصصة تدعم بروتوكول التكرار
const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last ? { value: current++, done: false } : { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log("Range Item:", num);
}`,
    experimentQuestion: 'ماذا يحدث لو قمت بتعديل مصفوفة (Array.push أو Array.splice) أثناء المرور عليها باستخدام حلقة for..of؟',
    experimentAnswer: 'حلقة for..of تعتمد على مؤشر الـ Iterator الداخلي. إذا قمت بـ push، قد تستمر الحلقة إلى ما لا نهاية. وإذا قمت بـ splice، ستتغير مؤشرات العناصر اللاحقة (Index Shift) مما يؤدي إلى تخطي عناصر معينة بدون معالجة. القاعدة الهندسية الصارمة هي عدم تعديل حجم المصفوفة أثناء تكرارها مباشرة، أو إنشاء نسخة منها أولاً.',
    codeAnatomy: [
      { line: 'outer: for (let i = 0; i < grid.length; i++) {', note: 'تعريف حلقة خارجية مسمّاة بـ outer' },
      { line: '  for (let j = 0; j < grid[i].length; j++) {', note: 'حلقة داخلية للأعمدة' },
      { line: '    if (grid[i][j] === target) {', note: 'التحقق من الشرط المستهدف' },
      { line: '      foundCoords = { i, j };', note: 'حفظ الإحداثيات' },
      { line: '      break outer;', note: 'الخروج فوراً من جميع الحلقات المتداخلة' },
      { line: '    }', note: 'نهاية الشرط' },
      { line: '  }', note: 'نهاية الحلقة الداخلية' },
      { line: '}', note: 'نهاية الحلقة الخارجية' }
    ],
    pitfallBad: `// خطأ شائع: استخدام for..in مع المصفوفات
const scores = [85, 92, 78];
Array.prototype.customMethod = () => {};
for (const key in scores) {
  console.log(scores[key]); // سيمر على customMethod وسيطبع دالة كقيمة!
}`,
    pitfallGood: `// الحل الهندسي الصحيح
const scores = [85, 92, 78];
for (const score of scores) {
  console.log(score); // يمر على القيم الفعلية فقط ويتجاهل الـ prototype
}`,
    pitfallDiagnosis: 'حلقة for..in صُممت للكائنات العادية وتمر على جميع الخصائص القابلة للتعداد في سلسلة الـ Prototype Chain، بينما for..of تستدعي Symbol.iterator الخاص بالمصفوفة فقط.',
    quizPool: [
      {
        q: 'Which loop construct is guaranteed to iterate over array VALUES rather than property keys?',
        qAr: 'أي من الحلقات التكرارية التالية تضمن المرور على قيم عناصر المصفوفة بدلاً من مفاتيح الخصائص؟',
        options: ['for..of', 'for..in', 'for..each keyword', 'while..in'],
        correct: 0,
        why: 'for..of invokes the iterable protocol returning values, whereas for..in enumerates object property keys.',
        whyAr: 'حلقة for..of تستدعي بروتوكول التكرار وتُرجع القيم، بينما for..in تُرجع مفاتيح الخصائص.'
      },
      {
        q: 'What is the purpose of a labeled statement in JavaScript?',
        qAr: 'ما هي الفائدة الأساسية من استخدام الحلقات المسماة (Labeled Statements) في جافاسكريبت؟',
        options: [
          'Allows breaking or continuing a specific outer loop from within a nested loop.',
          'Increases loop execution speed in V8.',
          'Creates a private lexical scope for variables.',
          'Automatically runs the loop in a background thread.'
        ],
        correct: 0,
        why: 'Labels provide an identifier that break or continue can target to jump out of multiple nested loops simultaneously.',
        whyAr: 'تمنح الحلقات معرّفاً يتيح لأوامر break أو continue استهداف الحلقة الخارجية مباشرة من داخل الحلقات المتداخلة.'
      },
      {
        q: 'What must an object implement to be consumable by the spread operator (...obj) or for..of?',
        qAr: 'ما الذي يجب أن ينفذه الكائن ليكون قابلاً للاستخدام مع الـ Spread Operator أو حلقة for..of؟',
        options: ['[Symbol.iterator]() method', '.toArray() method', '.length property', 'Symbol.toPrimitive'],
        correct: 0,
        why: 'The Iterable Protocol requires an object to have a method keyed by Symbol.iterator that returns an Iterator.',
        whyAr: 'بروتوكول التكرار يتطلب وجود ميثود بمفتاح Symbol.iterator تُرجع كائن تكرار Iterator.'
      },
      {
        q: 'How does break differ from continue inside a loop?',
        qAr: 'كيف يختلف أمر break عن continue داخل الحلقات التكرارية؟',
        options: [
          'break terminates the loop entirely; continue skips the rest of the current iteration and moves to the next.',
          'break moves to the next iteration; continue terminates the loop.',
          'break can only be used in switch statements.',
          'There is no difference in ES6+.'
        ],
        correct: 0,
        why: 'break exits the loop immediately, while continue halts the current iteration and jumps to the update/condition step.',
        whyAr: 'أمر break ينهي الحلقة بالكامل فوراً، بينما continue يتخطى ما تبقى من الدورة الحالية وينتقل للدورة التالية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنشئ Custom Generator Function وتستفيد منها في معالجة تدفقات البيانات الضخمة (Streaming Large Datasets) بدون استهلاك الذاكرة؟',
    interviewA: 'دوال الـ Generators التي تُعرف بـ function* وتستخدم yield تنفذ مبدأ التقييم الكسول (Lazy Evaluation). بدلاً من تحميل مليون سجل في الذاكرة دفعة واحدة في مصفوفة، يقوم الـ Generator بإنتاج عنصر واحد فقط عند كل استدعاء لميثود next(). هذا يحافظ على استقرار استهلاك الـ RAM ويسمح بمعالجة ملفات بحجم عدة جيجابايت بسلاسة تامة داخل خادم Node.js أو المتصفح.'
  },
  {
    slug: 'js-functions',
    title: 'Function Declarations, Expressions, Arrow Functions & Hoisting',
    titleAr: 'دوال جافاسكريبت: الإعلانات، التعبيرات، الدوال السهمية ورفع المتغيرات (Hoisting)',
    level: 1,
    order: 6,
    estMinutes: 32,
    version: 'ES2024+ Standard',
    pattern: 'Function Mechanics & Lexical this',
    objectives: [
      'فهم سلوك الـ Hoisting الدقيق بين Function Declarations و Function Expressions و let/const.',
      'تشريح كلمة this والفرق الجوهري بين الربط الديناميكي (Dynamic this) والربط المعجمي (Lexical this) في الدوال السهمية.',
      'إتقان استخدام call(), apply(), و bind() للتحكم في سياق التنفيذ وتمرير المعاملات.',
      'تطبيق مبادئ الدوال النقية (Pure Functions) وتفادي الآثار الجانبية (Side Effects).'
    ],
    problemOpening: `
      الدوال في جافاسكريبت تُعامل كـ "مواطنين من الدرجة الأولى" (First-Class Citizens)، يعني تقدر تخزن دالة في متغير، تمررها كمعامل لدالة تانية، أو ترجعها من دالة تانية كـ Closure.
      لكن مع هذه القوة الهائلة، بتظهر واحدة من أكثر النقاط المسببة للإحباط: "هو كلمة <code dir="ltr">this</code> بتشير لمين دلوقتي؟".
      كم مرة كتبت Event Handler في زرار، واستدعيت جواه <code dir="ltr">this.setState()</code> أو <code dir="ltr">this.userName</code> وتفاجأت بـ <code dir="ltr">Cannot read properties of undefined</code>؟
      أو كم مرة حاولت تستدعي دالة قبل سطر تعريفها ولقيتها اشتغلت في حالة Function Declaration، لكن ضربت خطأ <code dir="ltr">ReferenceError: Cannot access before initialization</code> لما حولتها لـ Arrow Function؟
      في هذا الدرس، هنفكك سياق التنفيذ (Execution Context)، وهنعرف بالمللي إزاي محرك V8 بيتعامل مع الـ Memory Allocation أثناء مرحلة الـ Creation Phase، والفرق القاطع بين أنواع الدوال المختلفة.
    `,
    mechanics: [
      { step: '01', title: 'مرحلة الرفع وإنشاء السياق (Creation Phase & Hoisting)', desc: 'يتم رفع Function Declarations بجسمها الكامل للذاكرة. المتغيرات المعرفة بـ var ترفع بقيمة undefined، بينما let و const توضع في منطقة Temporal Dead Zone (TDZ).' },
      { step: '02', title: 'الربط الديناميكي لكلمة this', desc: 'في الدوال العادية، قيمة this تتحدد عند لحظة الاستدعاء (Call-Site) وليس لحظة الكتابة، وتعتمد على الكائن الموجود قبل النقطة user.getName().' },
      { step: '03', title: 'الربط المعجمي في الدوال السهمية (Lexical this)', desc: 'الدوال السهمية Arrow Functions لا تملك this أو arguments خاصة بها؛ بل ترثها تلقائياً من النطاق الخارجي المعجمي المحيط بها.' },
      { step: '04', title: 'التحكم الصريح في السياق: call, apply, bind', desc: 'call تمرر المعاملات مفصولة، apply تمرر المعاملات في مصفوفة، و bind تنشئ دالة جديدة تماماً مربوطة بالسياق المحدد للاستدعاء المستقبلي.' },
      { step: '05', title: 'المعاملات الافتراضية والـ Rest Parameters', desc: 'استخدام ...args لتجميع المعاملات غير المحدودة في مصفوفة حقيقية بدلاً من كائن arguments القديم.' }
    ],
    playgroundCode: `// محاكي سياق this والـ Arrow Functions
const engineer = {
  name: "Omar",
  skills: ["React", "Node.js", "Postgres"],
  
  // دالة عادية: this ديناميكية تشير للـ engineer
  printSkillsRegular() {
    console.log("Regular function this.name:", this.name);
    // Callback عادي: this ستفقد سياقها وتصبح undefined في strict mode!
    setTimeout(function() {
      console.log("Regular timeout this.name:", this ? this.name : "Lost this!");
    }, 100);
  },
  
  // دالة سهمية: this معجمية ترث السياق الخارجي
  printSkillsArrow() {
    setTimeout(() => {
      console.log("Arrow timeout this.name:", this.name); // تحافظ على Omar
    }, 200);
  }
};

engineer.printSkillsRegular();
engineer.printSkillsArrow();`,
    experimentQuestion: 'لماذا لا يمكن استخدام الدالة السهمية (Arrow Function) كـ Constructor مع الكلمة المفتاحية new؟ وماذا يحدث إذا حاولت تنفيذ new (() => {})؟',
    experimentAnswer: 'الدوال السهمية لا تملك خاصية الـ prototype ولا تملك دالة بناء داخلية [[Construct]] في مواصفات محرك جافاسكريبت. محاولة استدعائها مع new ستؤدي فوراً لرمي خطأ TypeError: (intermediate value) is not a constructor.',
    codeAnatomy: [
      { line: 'function regularAdd(a, b = 0) {', note: 'Function Declaration مع معامل افتراضي' },
      { line: '  return a + b;', note: 'إرجاع القيمة صراحة' },
      { line: '}', note: 'تخضع للـ Hoisting بالكامل' },
      { line: 'const arrowAdd = (a, b) => a + b;', note: 'Arrow function مع Implicit Return' },
      { line: 'const boundFunction = regularAdd.bind(null, 5);', note: 'تثبيت المعامل الأول جزئياً (Currying/Partial App)' },
      { line: 'const logAll = (...args) => {', note: 'استخدام Rest Parameters لتجميع المعاملات' },
      { line: '  args.forEach(arg => console.log(arg));', note: 'المعاملات مصفوفة حقيقية تدعم forEach' },
      { line: '};', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع: استخدام Arrow Function كـ Method داخل Object Literal
const profile = {
  username: "Zidan",
  sayHi: () => {
    console.log("Hi, " + this.username); // this هنا تشير للـ Window أو Global وليس profile!
  }
};`,
    pitfallGood: `// الحل الصحيح: استخدام Method Shorthand العادي
const profile = {
  username: "Zidan",
  sayHi() {
    console.log("Hi, " + this.username); // this تشير لكائن profile بنجاح
  }
};`,
    pitfallDiagnosis: 'الدوال السهمية لا تنشئ سياق this خاص بها، بل تأخذ السياق المحيط بالـ Object Literal (والذي يكون غالباً النطاق العام Global/Window).',
    quizPool: [
      {
        q: 'How does this behave inside an Arrow Function compared to a regular function?',
        qAr: 'كيف تتصرف كلمة this داخل الدالة السهمية (Arrow Function) مقارنة بالدالة العادية؟',
        options: [
          'It lexically captures this from the enclosing scope and cannot be rebound.',
          'It dynamically binds to the object calling the function.',
          'It is always undefined in all environments.',
          'It points to the global window object in strict mode.'
        ],
        correct: 0,
        why: 'Arrow functions do not have their own this binding; they inherit this lexically from the scope in which they were defined.',
        whyAr: 'الدوال السهمية لا تملك سياق this خاصاً بها، بل ترث السياق معجمياً من النطاق الذي كُتبت بداخله.'
      },
      {
        q: 'What happens when calling a Function Declaration before its line of definition in code?',
        qAr: 'ماذا يحدث عند استدعاء Function Declaration قبل السطر الذي تم تعريفها فيه؟',
        options: [
          'It executes successfully because function declarations are fully hoisted with their body.',
          'A ReferenceError is thrown due to TDZ.',
          'A TypeError is thrown because it is undefined.',
          'The code fails to compile.'
        ],
        correct: 0,
        why: 'Function declarations are hoisted in their entirety to the top of their enclosing scope during the creation phase.',
        whyAr: 'يتم رفع إعلانات الدوال بالكامل مع جسمها البرمجي إلى أعلى النطاق أثناء مرحلة تهيئة الذاكرة في المحرك.'
      },
      {
        q: 'What is the key difference between Function.prototype.call() and Function.prototype.bind()?',
        qAr: 'ما هو الفرق الجوهري بين call() و bind() في جافاسكريبت؟',
        options: [
          'call() executes the function immediately with the provided this; bind() returns a new bound function for later execution.',
          'call() accepts an array of arguments; bind() accepts comma-separated arguments.',
          'bind() executes immediately; call() returns a promise.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'call/apply invoke immediately; bind creates and returns a new function with fixed context.',
        whyAr: 'دالة call تنفذ الدالة فوراً مع السياق المحدد، بينما bind تُرجع دالة جديدة مربوطة بالسياق لتنفيذها لاحقاً.'
      },
      {
        q: 'What does the rest parameter syntax (...args) produce inside a function?',
        qAr: 'ما الذي تُنتجه صيغة المعاملات المتبقية (...args) داخل الدالة؟',
        options: [
          'A genuine JavaScript Array containing all remaining arguments passed to the function.',
          'An array-like object missing array methods.',
          'A string joined by commas.',
          'A Set of unique arguments.'
        ],
        correct: 0,
        why: 'Rest parameters collect arguments into a genuine Array instance with full access to methods like .map(), .filter(), etc.',
        whyAr: 'تجمع المعاملات المتبقية في مصفوفة Array حقيقية تدعم جميع ميثودز المصفوفات مثل map و filter.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هي المنطقة الميتة الزمنية (Temporal Dead Zone - TDZ) وكيف تؤثر على الدوال المعرفة بـ let و const؟',
    interviewA: 'الـ TDZ هي الفترة الزمنية بين دخول النطاق (Scope Entry) وسطر التنفيذ الفعلي الذي يتم فيه الإعلان عن المتغير وتهيئته. المتغيرات المعرفة بـ let و const يتم حجز مكان لها في الذاكرة أثناء الـ Creation Phase، لكن لا يُسمح بالوصول إليها مطلقاً قبل سطر تعريفها، ومحاولة قراءتها ترمي ReferenceError. لذلك فإن الدوال المعرفة كـ Function Expressions عبر const myFn = () => {} لا يمكن استدعاؤها قبل سطر تعريفها لأنها تكون محاصرة داخل الـ TDZ.'
  },
  {
    slug: 'js-arrays-methods',
    title: 'Functional Array Pipelines: Map, Filter, Reduce & FlatMap',
    titleAr: 'خطوط المعالجة الوظيفية للمصفوفات: Map, Filter, Reduce و FlatMap',
    level: 1,
    order: 8,
    estMinutes: 35,
    version: 'ES2024+ Standard',
    pattern: 'Declarative & Immutable Data Pipelines',
    objectives: [
      'إتقان البرمجة الوظيفية التقريرية (Declarative vs Imperative) في تحويل البيانات.',
      'التفريق الصارم بين الميثودز التعديلية (Mutating Methods) وغير التعديلية (Immutable Methods).',
      'بناء عمليات التجميع الإحصائي المعقدة باستخدام Array.prototype.reduce().',
      'استخدام الميثودز الحديثة ES2023+ مثل toSorted(), toReversed(), toSpliced(), و with().'
    ],
    problemOpening: `
      في البرمجة الحديثة للـ Front-End والـ Back-End، 80% من الكود اللي بتكتبه هو عبارة عن "استقبال مصفوفة بيانات من الـ API، تصفيتها، تحويل شكلها، وتجميعها للعرض أو الحفظ".
      المبرمج المبتدئ بيكتب حلقة <code dir="ltr">for</code> تقليدية مع مصفوفة فارغة ومجموعة من شروط <code dir="ltr">if</code> و <code dir="ltr">push</code> لتعديل البيانات. النتيجة؟ كود طويل، معقد، مليء بالـ Mutations، وصعب جداً في الاختبار والصيانة.
      الأسوأ من ذلك هو التعديل العفوي على المصفوفة الأصلية (Accidental Mutation) باستخدام ميثودز زي <code dir="ltr">sort()</code> أو <code dir="ltr">splice()</code>، وده بيسبب كوارث في ريآكت لأن الـ State بيتغير المرجع الداخلي بتاعه بدون ما ريآكت تعرف، فالواجهة مش بتعمل Re-render!
      في هذا الدرس، هنتعلم إزاي نبني خطوط معالجة وظيفية نقية (Pure Functional Pipelines) باستخدام <code dir="ltr">map</code> و <code dir="ltr">filter</code> و <code dir="ltr">reduce</code> و <code dir="ltr">flatMap</code>، وهنكتشف أحدث ميثودز ES2023 غير التعديلية.
    `,
    mechanics: [
      { step: '01', title: 'التحويل النظيف عبر map()', desc: 'تحويل كل عنصر في المصفوفة إلى شكل جديد وإرجاع مصفوفة جديدة تماماً بنفس الطول وبدون المساس بالمصفوفة الأصلية.' },
      { step: '02', title: 'التصفية الدقيقة عبر filter()', desc: 'اختبار كل عنصر بدالة شرطية (Predicate) وإرجاع مصفوفة جديدة تحتوي فقط على العناصر التي حققت الشرط (truthy).' },
      { step: '03', title: 'محرك التجميع الشامل reduce()', desc: 'تجميع عناصر المصفوفة بأكملها إلى قيمة واحدة نهائية (رقم، كائن مجمع، مصفوفة فريدة، أو خريطة Map).' },
      { step: '04', title: 'التسطيح والتحويل المتزامن flatMap()', desc: 'تنفيذ عملية map متبوعة بـ flat(1) في خطوة واحدة فائقة الكفاءة لمعالجة العلاقات المتداخلة 1-to-many.' },
      { step: '05', title: 'المصفوفات غير القابلة للتعديل (ES2023 Immutable Methods)', desc: 'استخدام toSorted و toReversed و toSpliced و with لتعديل المصفوفات وإنتاج نسخ جديدة بأمان تام.' }
    ],
    playgroundCode: `// محاكي خط معالجة وظيفي متقدم
const transactions = [
  { id: "T1", category: "Cloud", amount: 150, status: "completed" },
  { id: "T2", category: "Hardware", amount: 1200, status: "completed" },
  { id: "T3", category: "Cloud", amount: 80, status: "failed" },
  { id: "T4", category: "Software", amount: 300, status: "completed" }
];

// تجميع إجمالي المصروفات الناجحة لكل تصنيف باستخدام reduce
const expenseSummary = transactions
  .filter(t => t.status === "completed")
  .reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

console.log("Expense Summary by Category:", expenseSummary);

// استخدام ES2023 toSorted لترتيب المعاملات دون تعديل الأصل
const sortedByAmount = transactions.toSorted((a, b) => b.amount - a.amount);
console.log("Top Transaction Amount:", sortedByAmount[0].amount);
console.log("Original untouched:", transactions[0].id === "T1"); // true`,
    experimentQuestion: 'لماذا يفشل الكود التالي في حساب المجموع بشكل صحيح إذا لم يتم تمرير القيمة الابتدائية (Initial Value) في reduce؟ [].reduce((acc, x) => acc + x)',
    experimentAnswer: 'إذا كانت المصفوفة فارغة ولم يتم تمرير initialValue لـ reduce، سيرمي محرك جافاسكريبت خطأ TypeError: Reduce of empty array with no initial value. تمرير القيمة الابتدائية (مثل 0) يضمن دائماً سلامة الكود واستقراره حتى لو كانت البيانات القادمة من الـ API مصفوفة فارغة.',
    codeAnatomy: [
      { line: 'const revenue = orders', note: 'المصفوفة المدخلة' },
      { line: '  .filter(order => order.paid)', note: 'استبعاد الطلبات غير المدفوعة' },
      { line: '  .map(order => order.subtotal * (1 - order.discount))', note: 'حساب القيمة الصافية بعد الخصم' },
      { line: '  .reduce((total, amount) => total + amount, 0);', note: 'تجميع الإجمالي بقيمة ابتدائية 0' },
      { line: 'const tags = posts.flatMap(post => post.tags);', note: 'استخراج كل الوسوم وتسوية المصفوفات المتداخلة' },
      { line: 'const safeList = items.toSorted((a, b) => a - b);', note: 'ترتيب غير تعديلي آمن للـ React State' }
    ],
    pitfallBad: `// خطأ كارثي في ريآكت: تعديل الـ State مباشرة عبر sort()
function updateList(items) {
  return items.sort(); // يغير المصفوفة الأصلية في الذاكرة ولا ينتج مصفوفة جديدة!
}`,
    pitfallGood: `// الحل الصحيح بإنشاء نسخة غير قابلة للتعديل
function updateList(items) {
  return items.toSorted(); // ES2023 Immutable sort
  // أو للبيئات القديمة: [...items].sort()
}`,
    pitfallDiagnosis: 'ميثود Array.prototype.sort تعدل المصفوفة الأصلية في مكانها (In-Place Mutation). في مكتبات إدارة الحالة مثل React أو Redux، يؤدي هذا لعدم استشعار التغيير بسبب ثبات المرجع القديم.',
    quizPool: [
      {
        q: 'Which Array method mutates the original array in-place?',
        qAr: 'أي من ميثودز المصفوفات التالية تقوم بتعديل المصفوفة الأصلية مباشرة في مكانها (In-Place Mutation)؟',
        options: ['Array.prototype.sort()', 'Array.prototype.map()', 'Array.prototype.filter()', 'Array.prototype.toSorted()'],
        correct: 0,
        why: 'sort() mutates the original array in place, while map(), filter(), and toSorted() return brand new array instances.',
        whyAr: 'دالة sort تعدل المصفوفة الأصلية مباشرة، بينما map و filter و toSorted ترجع مصفوفات جديدة تماماً.'
      },
      {
        q: 'What is the primary advantage of Array.prototype.flatMap() over map() followed by flat()?',
        qAr: 'ما هي الميزة الأساسية لـ flatMap() مقارنة باستدعاء map() ثم flat() بشكل منفصل؟',
        options: [
          'It combines mapping and flattening in a single iteration without allocating an intermediate array.',
          'It can flatten arrays to infinite depth automatically.',
          'It mutates the source array for better performance.',
          'It works asynchronously with Promises.'
        ],
        correct: 0,
        why: 'flatMap performs mapping and 1-level flattening in a single unified pass, avoiding memory overhead for temporary arrays.',
        whyAr: 'تدمج التحويل والتسطيح في دورة واحدة مما يوفر استهلاك الذاكرة الخاص بإنشاء مصفوفات وسيطة.'
      },
      {
        q: 'What will [10, 5, 20].sort() return by default without a comparator function?',
        qAr: 'ما الذي ستُرجعه العملية [10, 5, 20].sort() افتراضياً بدون تمرير دالة مقارنة؟',
        options: ['[10, 20, 5]', '[5, 10, 20]', '[20, 10, 5]', 'TypeError'],
        correct: 0,
        why: 'Default Array.sort() converts elements to strings and compares UTF-16 code units ("10" < "20" < "5").',
        whyAr: 'الترتيب الافتراضي في sort يحول العناصر لنصوص ويقارنها هجائياً ("10" تأتي قبل "20" وقبل "5").'
      },
      {
        q: 'What is the purpose of the initialValue argument in Array.prototype.reduce()?',
        qAr: 'ما هو الغرض من تمرير المعامل initialValue في دالة Array.prototype.reduce()؟',
        options: [
          'Guarantees the initial accumulator value and prevents TypeError crashes on empty arrays.',
          'Sets the maximum number of iterations.',
          'Sorts the array before reduction.',
          'Converts the result to a string.'
        ],
        correct: 0,
        why: 'Providing initialValue prevents runtime crashes on empty arrays and guarantees a deterministic initial accumulator state.',
        whyAr: 'يضمن تعيين القيمة الابتدائية للمجمع ويمنع انهيار الكود بخطأ TypeError عند معالجة مصفوفة فارغة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ دالة Array.prototype.groupBy المخصصة باستخدام reduce، وما الفرق بينها وبين Object.groupBy المضافة حديثاً في ES2024؟',
    interviewA: 'يمكن تنفيذ groupBy باستخدام reduce بتجميع العناصر داخل كائن مفاتيحه هي قيمة التصنيف. في ES2024، أضافت جافاسكريبت رسمياً ميثود Object.groupBy(array, callback) وميثود Map.groupBy(array, callback) على مستوى المحرك الأصلي لتحقيق تجميع سريع وعالي الأداء بدون الحاجة لكتابة دوال مساعدة أو استيراد مكتبة مثل Lodash.'
  },
  {
    slug: 'js-objects-prototypes',
    title: 'Objects, Property Descriptors & Prototype Inheritance',
    titleAr: 'الكائنات، واصفات الخصائص (Property Descriptors) وسلسلة التوريث عبر الـ Prototype',
    level: 1,
    order: 9,
    estMinutes: 35,
    version: 'ES2024+ Standard',
    pattern: 'Prototypal Inheritance & Memory Sharing',
    objectives: [
      'فهم نموذج التوريث القائم على الـ Prototype (Prototypal Inheritance) ومقارنته بالتوريث الكلاسيكي في اللغات الأخرى.',
      'التحكم في خصائص الكائنات عبر Object.defineProperty و واصفات الخصائص (writable, enumerable, configurable).',
      'تجميد الكائنات وحمايتها من التعديل عبر Object.freeze() و Object.seal().',
      'التحقق من سلسلة التوريث باستخدام Object.getPrototypeOf() و instanceof.'
    ],
    problemOpening: `
      في لغات زي Java أو C++، التوريث مبني على الـ Classes كقوالب ثابتة تُبنى منها الكائنات. لكن في جافاسكريبت، الأمر مختلف تماماً: الكائنات ترث مباشرة من كائنات أخرى عن طريق رابط خفي اسمه الـ Prototype Chain!
      هل تساءلت يوماً: لما بتنشئ مصفوفة جديدة <code dir="ltr">const arr = []</code>، ميثود <code dir="ltr">arr.push()</code> و <code dir="ltr">arr.map()</code> بتيجي منين؟ هل كل مصفوفة بتاخد نسخة خاصة من الدوال دي في الذاكرة؟
      بالتأكيد لا! كل مصفوفة تحمل رابطاً سرياً <code dir="ltr">[[Prototype]]</code> يشير إلى <code dir="ltr">Array.prototype</code> في الذاكرة المشتركة.
      فهم واصفات الخصائص (Property Descriptors) وسلسلة الـ Prototype هو المفتاح لحماية كائناتك من التعديلات الخبيثة، وبناء مكتبات برمجية خفيفة تستهلك أقل قدر ممكن من الـ RAM عن طريق مشاركة الدوال بدلاً من تكرارها.
    `,
    mechanics: [
      { step: '01', title: 'رابط التوريث الداخلي ([[Prototype]] vs prototype)', desc: 'خاصية prototype توجد فقط على الدوال البانية (Constructor Functions)، بينما [[Prototype]] أو __proto__ هو الرابط الفعلي الموجود على كل كائن.' },
      { step: '02', title: 'رحلة البحث في الـ Prototype Chain', desc: 'عند قراءة خاصية من كائن، يبحث المحرك في الكائن نفسه؛ وإذا لم يجدها يصعد للـ Prototype الخاص به، ويستمر حتى يصل إلى Object.prototype ثم null.' },
      { step: '03', title: 'واصفات الخصائص (Property Descriptors)', desc: 'كل خاصية لها 3 أعلام: writable (هل يمكن تغيير قيمتها؟)، enumerable (هل تظهر في الحلقات؟)، و configurable (هل يمكن حذفها أو تغيير واصفاتها؟).' },
      { step: '04', title: 'حماية الكائنات: Object.freeze مقابل Object.seal', desc: 'Object.seal تمنع إضافة أو حذف الخصائص ولكن تسمح بتعديل القيم الحالية. Object.freeze تجعل الكائن غير قابل للتعديل تماماً (Shallow Immutability).' },
      { step: '05', title: 'إنشاء كائنات بدون Prototype (Object.create(null))', desc: 'إنشاء قواميس بيانات فائقة النقاء لا ترث خصائص Object.prototype لمنع هجمات Prototype Pollution.' }
    ],
    playgroundCode: `// محاكي واصفات الخصائص وسلسلة الـ Prototype
const config = { apiEndpoint: "https://api.codehub.dev/v1" };

// جعل الخاصية للقراءة فقط وغير قابلة للحذف
Object.defineProperty(config, "apiKey", {
  value: "SEC-998811",
  writable: false,     // ممنوع تعديل القيمة
  enumerable: true,    // تظهر في JSON.stringify
  configurable: false  // ممنوع الحذف أو إعادة التعريف
});

console.log("API Key Defined:", config.apiKey);
try {
  config.apiKey = "HACKED"; // سيفشل في strict mode
} catch (e) {
  console.error("Write prevented:", e.message);
}

// فحص سلسلة الـ Prototype
const child = Object.create(config);
console.log("Child inherits apiEndpoint:", child.apiEndpoint);
console.log("Has own property apiKey:", child.hasOwnProperty("apiKey")); // false (موروثة)`,
    experimentQuestion: 'ما هو خطر الـ Prototype Pollution في خوادم Node.js وكيف يمكن لمهاجم السيطرة على الخادم من خلال دمج كائنات JSON غير مفحوصة؟',
    experimentAnswer: 'إذا قام الخادم بدمج كائن خبيث يحتوي على الخاصية "__proto__" في كائن عام (Deep Merge)، سيتم تعديل Object.prototype الخاص بجميع الكائنات في التطبيق! هذا قد يؤدي لتجاوز فحوصات الصلاحيات (مثل isAdmin: true) على مستوى كل المستخدمين. الحل هو استخدام Map أو كائنات معزولة بـ Object.create(null) أو فحص المفاتيح المدخلة وتطهيرها.',
    codeAnatomy: [
      { line: 'const proto = { greet() { return `Hi, ${this.name}`; } };', note: 'كائن الأساس المشترك' },
      { line: 'const user = Object.create(proto);', note: 'إنشاء كائن جديد يرث من proto مباشرة' },
      { line: 'user.name = "Farah";', note: 'خاصية خاصة بالكائن user' },
      { line: 'console.log(user.greet()); // "Hi, Farah"', note: 'تنفيذ ميثود greet الموروثة من الـ prototype' },
      { line: 'Object.freeze(user);', note: 'تجميد الكائن لمنع التعديل والإضافة' },
      { line: 'console.log(Object.isFrozen(user)); // true', note: 'التحقق من حالة التجميد' }
    ],
    pitfallBad: `// خطأ شائع: تعديل الـ Native Prototypes مباشرة (Monkey Patching)
Array.prototype.last = function() {
  return this[this.length - 1];
}; // كارثة: يسبب تصادم مع مكاتب أخرى ومعايير جافاسكريبت المستقبلية!`,
    pitfallGood: `// الحل الهندسي: استخدام دوال مساعدة مستقلة أو ميثودز قياسية حديثة
function getLastItem(array) {
  return array.at(-1); // ES2022 Native Standard Method
}`,
    pitfallDiagnosis: 'تعديل الـ Native Prototypes (مثل Array.prototype أو Object.prototype) يلوث البيئة العامة وقد يكسر التوافقية عند إضافة مواصفات جديدة للغة بواسطة لجنة TC39.',
    quizPool: [
      {
        q: 'What is the end of the prototype chain for almost all standard JavaScript objects?',
        qAr: 'ما هي نهاية سلسلة الـ Prototype لمعظم كائنات جافاسكريبت القياسية؟',
        options: ['Object.prototype (whose prototype is null)', 'Function.prototype', 'window', 'undefined'],
        correct: 0,
        why: 'The top of the prototype chain is Object.prototype, and its [[Prototype]] is null, which terminates the lookup.',
        whyAr: 'قمة سلسلة الـ Prototype هي Object.prototype، ورابط الـ [[Prototype]] الخاص به هو null الذي ينهي عملية البحث.'
      },
      {
        q: 'How does Object.freeze() differ from Object.seal()?',
        qAr: 'كيف تختلف دالة Object.freeze() عن دالة Object.seal()؟',
        options: [
          'Object.freeze() makes existing properties read-only; Object.seal() still allows modifying existing writable properties.',
          'Object.seal() freezes prototype lookup while freeze does not.',
          'Object.freeze() performs deep recursive freezing.',
          'There is no difference in ES6.'
        ],
        correct: 0,
        why: 'Object.seal prevents adding/deleting keys but allows values to change. Object.freeze additionally sets writable: false on all properties.',
        whyAr: 'دالة Object.seal تمنع الإضافة والحذف لكن تسمح بتعديل القيم الحالية، بينما Object.freeze تمنع تعديل القيم أيضاً بجعل writable: false.'
      },
      {
        q: 'How can you create a completely pure dictionary object with no prototype chain?',
        qAr: 'كيف يمكنك إنشاء كائن قاموس نقي تماماً بدون أي سلسلة Prototype موروثة؟',
        options: ['Object.create(null)', 'new Object()', '{}', 'Object.freeze({})'],
        correct: 0,
        why: 'Object.create(null) creates an object with a [[Prototype]] of null, free from inherited Object.prototype properties.',
        whyAr: 'دالة Object.create(null) تنشئ كائناً مؤشر الـ [[Prototype]] الخاص به هو null ولا يرث أي خصائص مسبقة.'
      },
      {
        q: 'Which property descriptor flag controls whether a property appears in for..in loops and Object.keys()?',
        qAr: 'أي علم في واصفات الخصائص يتحكم في ظهور الخاصية في حلقات for..in و Object.keys()؟',
        options: ['enumerable', 'writable', 'configurable', 'iterable'],
        correct: 0,
        why: 'The enumerable descriptor flag specifies if the property is exposed during property enumeration loops.',
        whyAr: 'علم enumerable يحدد ما إذا كانت الخاصية ستظهر أثناء المرور على الكائن بالحلقات ودوال استخراج المفاتيح.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: هل دالة Object.freeze() تقوم بتجميد عميق (Deep Freeze) للكائنات المتداخلة؟ وكيف تنفذ Deep Freeze آمن؟',
    interviewA: 'دالة Object.freeze() تنفذ تجميداً سطحياً فقط (Shallow Freeze). هذا يعني أنه إذا كان الكائن يحتوي على كائن فرعي، فإن الكائن الفرعي يظل قابلاً للتعديل! لتنفيذ Deep Freeze آمن، يجب كتابة دالة تفحص كل خاصية تكرارياً (Recursively)، فإذا كانت كائناً غير مجمد يتم استدعاء Object.freeze عليها، مع تجنب الدخول في دوائر مرجعية (Circular References) باستخدام WeakSet.'
  },
  {
    slug: 'js-classes-oop',
    title: 'ES6 Classes, Private Fields (#), Inheritance & Mixins',
    titleAr: 'فئات ES6 Classes، الحقول الخاصة (#)، التوريث ومزج السلوكيات (Mixins)',
    level: 1,
    order: 10,
    estMinutes: 30,
    version: 'ES2024+ Standard',
    pattern: 'Object-Oriented Architecture & Encapsulation',
    objectives: [
      'فهم كيف تُترجم فئات ES6 Classes إلى Prototypal Inheritance تحت الغطاء (Syntactic Sugar).',
      'تطبيق الكبسلة الصارمة (True Encapsulation) باستخدام الحقول والأساليب الخاصة بالرمز #.',
      'إتقان التوريث عبر extends واستدعاء المشيد الأب عبر super().',
      'تطبيق نمط Mixins لتجميع السلوكيات وتفادي مشاكل التوريث المتعدد الصلب.'
    ],
    problemOpening: `
      عندما أضافت لجنة TC39 كلمة <code dir="ltr">class</code> في معيار ES6، رحب مبرمجو لغات OOP التقليدية بالخطوة واعتبروا أن جافاسكريبت أصبحت لغة كلاسيكية. لكن الحقيقة أن Classes في جافاسكريبت هي مجرد "غلاف جمالي" (Syntactic Sugar) فوق نموذج الـ Prototypal Inheritance!
      ومع ذلك، التطورات الحديثة في ES2022+ أضافت ميزات ثورية حقيقية لم تكن موجودة من قبل: الحقول الخاصة الصارمة (Private Fields) باستخدام رمز الـ <code dir="ltr">#</code>، والـ Static Blocks للتهيئة المعقدة.
      قبل إضافة <code dir="ltr">#privateField</code>، كان المبرمجون يضعون شرطة سفلية <code dir="ltr">_password</code> كتحذير شكلي فقط، لكن أي كود خارجي كان يستطيع قراءتها وتعديلها بسهولة.
      في هذا الدرس، هنتعلم إزاي نبني معمارية كلاسات قوية ونظيفة، إزاي نحمي البيانات الحساسة بكبسلة حقيقية على مستوى الـ Bytecode، وإزاي نستخدم نمط الـ Mixins لبناء كائنات مرنة متعددة القدرات.
    `,
    mechanics: [
      { step: '01', title: 'تشريح الـ Constructor والتهيئة', desc: 'دالة constructor() هي المكان الوحيد المخصص لتهيئة النسخة (Instance Initialization) وربط الخصائص المبدئية.' },
      { step: '02', title: 'الحقول الخاصة الحقيقية (#Private Identifiers)', desc: 'الحقول والأساليب التي تبدأ بـ # يتم حظر الوصول إليها تماماً من خارج الـ Class على مستوى محرك V8 ولا يمكن قراءتها حتى بـ bracket notation.' },
      { step: '03', title: 'التوريث واستدعاء super()', desc: 'عند وراثة كلاس بـ extends، يجب استدعاء super() قبل استخدام كلمة this في المشيد الفرعي لتهيئة الـ Prototype الأب.' },
      { step: '04', title: 'الخصائص والكتل الساكنة (Static Fields & Blocks)', desc: 'الخصائص الساكنة static تتبع الكلاس نفسه ولا تتكرر على كل Instance، وتستخدم للـ Factory Methods والإعدادات العامة.' },
      { step: '05', title: 'نمط Mixins لتركيب السلوكيات (Composition over Inheritance)', desc: 'دوال تستقبل فئة كمدخل وتُرجع فئة جديدة مضافاً إليها أساليب وسلوكيات محددة بدون التقيد بشجرة توريث أحادية.' }
    ],
    playgroundCode: `// محاكي الفئات والكبسلة الخاصة
class BankAccount {
  // حقل خاص حقيقي محمي على مستوى المحرك
  #balance = 0;
  #accountNumber;

  constructor(accountNumber, initialDeposit = 0) {
    this.#accountNumber = accountNumber;
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return \`Account \${this.#accountNumber}: $\${this.#balance}\`;
  }
}

const account = new BankAccount("ACC-9011", 500);
account.deposit(250);
console.log(account.getBalance());

// محاولة اختراق الحقل الخاص
try {
  eval("account.#balance = 1000000;"); // Syntax Error
} catch (e) {
  console.log("Private field successfully protected from external tampering!");
}`,
    experimentQuestion: 'ماذا يحدث إذا حاولت استخدام كلمة this في constructor كلاس فرعي (Derived Class) قبل استدعاء دالة super()؟',
    experimentAnswer: 'سيرمي المحرك خطأ ReferenceError: Must call super constructor in derived class before accessing "this". في جافاسكريبت، الكلاس الأب هو المسؤول عن تخصيص الذاكرة لكائن this، ولا يتم ربط this بالكلاس الفرعي إلا بعد اكتمال تنفيذ مشيد الأب عبر super().',
    codeAnatomy: [
      { line: 'class Service {', note: 'تعريف الفئة الأساسية' },
      { line: '  #apiKey;', note: 'حقل خاص حقيقي لا يمكن قراءته خارج الكلاس' },
      { line: '  static instanceCount = 0;', note: 'خاصية ساكنة مشتركة على مستوى الفئة' },
      { line: '  constructor(apiKey) {', note: 'مشيد الفئة' },
      { line: '    this.#apiKey = apiKey;', note: 'تعيين الحقل الخاص' },
      { line: '    Service.instanceCount++;', note: 'تحديث العداد الساكن' },
      { line: '  }', note: 'نهاية المشيد' },
      { line: '  get key() { return this.#apiKey.slice(0, 4) + "****"; }', note: 'Getter لتوفير قراءة مقنعة وآمنة' },
      { line: '}', note: 'نهاية الفئة' }
    ],
    pitfallBad: `// خطأ شائع: الاعتماد على التوريث الصلب العميق متعدد الطبقات
class Animal {}
class Mammal extends Animal {}
class FlyingMammal extends Mammal {}
class Bat extends FlyingMammal {} // شجرة توريث صلبة تنكسر عند إضافة خفاش لا يطير!`,
    pitfallGood: `// الحل الهندسي: استخدام التركيب (Composition & Mixins)
const CanFly = (Base) => class extends Base { fly() { return "Flying!"; } };
const CanEcho = (Base) => class extends Base { echo() { return "Sonar active!"; } };

class Bat extends CanFly(CanEcho(Object)) {} // دمج السلوكيات بمرونة`,
    pitfallDiagnosis: 'التوريث الطبقي العميق (Deep Inheritance Hierarchy) يربط الكود بصلابة ويجعل التعديلات المستقبلية مستحيلة (Fragile Base Class Problem)، بينما Composition يتيح مرونة فائقة.',
    quizPool: [
      {
        q: 'What is the runtime enforcement mechanism for JavaScript private fields declared with #?',
        qAr: 'ما هي آلية الحماية وقت التشغيل للحقول الخاصة المعلنة برمز # في جافاسكريبت؟',
        options: [
          'Hard private encapsulation enforced by the JS engine; attempting access outside throws a SyntaxError.',
          'Soft naming convention that can still be accessed via brackets.',
          'They are transpiled into Symbols that can be read via Object.getOwnPropertySymbols.',
          'They only work in TypeScript.'
        ],
        correct: 0,
        why: 'Private identifiers with # are truly private at engine level; external access is a parse-time SyntaxError.',
        whyAr: 'الحقول الخاصة برمز # محمية برمجياً على مستوى المحرك، ومحاولة الوصول إليها خارج الفئة ترمي خطأ SyntaxError.'
      },
      {
        q: 'Why must super() be called before accessing this in a derived class constructor?',
        qAr: 'لماذا يجب استدعاء super() قبل استخدام this في مشيد الكلاس الفرعي؟',
        options: [
          'The parent constructor is responsible for initializing the instance object bound to this.',
          'super() clears the call stack.',
          'It is an optional style choice.',
          'super() prevents memory leaks.'
        ],
        correct: 0,
        why: 'In derived classes, the instance object is created by the base constructor, so this is uninitialized until super() finishes.',
        whyAr: 'في الكلاسات الفرعية، كائن this يتم إنشاؤه بواسطة مشيد الأساس الأب، وبالتالي يظل غير مهيأ حتى ينتهي super().'
      },
      {
        q: 'What does a static method on an ES6 class belong to?',
        qAr: 'إلى ماذا ينتمي الأسلوب الساكن (Static Method) في فئات ES6؟',
        options: [
          'Directly to the class constructor function itself, not to individual instances.',
          'To all child instances through prototype.',
          'To the global window object.',
          'To Object.prototype.'
        ],
        correct: 0,
        why: 'Static methods and properties are stored directly on the constructor object, not on its prototype.',
        whyAr: 'الأساليب والخصائص الساكنة تُخزن مباشرة على كائن المشيد نفسه وليس على الـ prototype الخاص بالنسخ.'
      },
      {
        q: 'How does a Mixin pattern operate in modern JavaScript?',
        qAr: 'كيف يعمل نمط الـ Mixin في جافاسكريبت الحديثة؟',
        options: [
          'A factory function that takes a superclass and returns a new subclass extending it with specific behaviors.',
          'By deep cloning prototype properties using Object.assign.',
          'Through multiple inheritance syntax: class A extends B, C.',
          'Using web workers for parallel class execution.'
        ],
        correct: 0,
        why: 'Mixins are parameterized class factories allowing modular behavior composition without rigid inheritance trees.',
        whyAr: 'الـ Mixins هي دوال مصنعية تستقبل فئة وترجع فئة فرعية جديدة موسعة بسلوكيات محددة لتسهيل التركيب.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هي الكتل الساكنة (Static Initialization Blocks) المضافة في ES2022 وما هي المشكلة التي حلتها؟',
    interviewA: 'الكتل الساكنة static { ... } تسمح بكتابة كود تنفيذي معقد (مثل try/catch أو التحقق من البيئة أو مشاركة بيانات خاصة مع دوال خارجية) أثناء مرحلة تحميل الفئة (Class Evaluation). قبل ES2022، كان لا يمكن تنفيذ أكثر من سطر تهيئة واحد لكل خاصية ساكنة، ولم يكن ممكناً مشاركة الحقول الخاصة #private مع دوال مساعدة خارج الكلاس دون كشفها للعامة.'
  },
  {
    slug: 'js-async-await',
    title: 'Async/Await Control Flow, Sequential vs Parallel & Error Boundaries',
    titleAr: 'التحكم بالعمليات اللاتزامنية Async/Await: التنفيذ المتسلسل مقابل المتوازي ومعالجة الأخطاء',
    level: 1,
    order: 12,
    estMinutes: 35,
    version: 'ES2024+ Standard',
    pattern: 'Asynchronous Concurrency & Promise Combinators',
    objectives: [
      'فهم كيفية عمل async/await تحت الغطاء كـ Syntactic Sugar مبني على الـ Promises والـ Microtasks.',
      'التفريق الجذري بين التنفيذ المتسلسل البطيء (Waterfall Anti-pattern) والتنفيذ المتوازي المتزامن (Parallel Execution).',
      'إتقان مجمعات الوعود الأربعة: Promise.all, Promise.allSettled, Promise.race, و Promise.any.',
      'بناء معالجة أخطاء شاملة عبر try/catch/finally وتجنب الأخطاء الصامتة (Unhandled Rejections).'
    ],
    problemOpening: `
      ظهور <code dir="ltr">async/await</code> في ES2017 كان بمثابة ثورة نقلت كتابة الكود اللاتزامني من جحيم الـ Callbacks (Callback Hell) وسلاسل الـ <code dir="ltr">.then().catch()</code> المعقدة إلى كود خطي يبدو وكأنه كود تزامني متسلسل.
      لكن هذا المظهر الخطي البسيط كان فخاً وقع فيه آلاف المطورين: وهو ما يسمى بـ "فخ الشلال البطيء" (Async Waterfall Anti-Pattern).
      تخيل أنك تبني لوحة تحكم، ومحتاج تجيب بيانات المستخدم، وقائمة الإشعارات، والطلبات الأخيرة. لو كتبت:
      <pre dir="ltr"><code>const user = await fetchUser(); // 300ms
const notifs = await fetchNotifs(); // 300ms
const orders = await fetchOrders(); // 300ms</code></pre>
      أنت كده أجبرت المتصفح ينتظر 900ms كاملة لأن كل طلب مستني اللي قبله يخلص، رغم إن التلات طلبات مستقلين تماماً عن بعض وكان ممكن يخلصوا في 300ms بس لو اتنفذوا بالتوازي عبر <code dir="ltr">Promise.all</code>!
      في هذا الدرس، هنتعلم إزاي نتحكم في تدفق العمليات اللاتزامنية باحترافية، إزاي نختار المجمع المناسب (Promise Combinator) لكل سيناريو إنتاجي، وإزاي نبني معالجة أخطاء منيعة ضد الانهيار.
    `,
    mechanics: [
      { step: '01', title: 'تشريح الدالة اللاتزامنية (Async Return Contract)', desc: 'أي دالة تسبق بكلمة async تُرجع دائماً وأبداً Promise، وأي قيمة تُرجعها بـ return يتم تغليفها تلقائياً بـ Promise.resolve().' },
      { step: '02', title: 'سلوك كلمة await ومقاطعة التنفيذ', desc: 'كلمة await توقف تنفيذ الدالة اللاتزامنية الحالية مؤقتاً وتفرغ خيط التنفيذ لباقي المهام حتى يكتمل الـ Promise ويُدرج في طابور الـ Microtask Queue.' },
      { step: '03', title: 'التنفيذ المتوازي الشامل (Promise.all vs Promise.allSettled)', desc: 'استخدم Promise.all عندما تعتمد الخطوات كلها على نجاح كل الطلبات (Fail-Fast). استخدم Promise.allSettled عندما تريد نتائج كل العمليات سواء نجحت أو فشلت.' },
      { step: '04', title: 'سباق العمليات والمهلة الزمنية (Promise.race & Timeouts)', desc: 'استخدام Promise.race لتطبيق نمط المهلة الزمنية (Request Timeout Pattern) بوضع طلب الـ Fetch في سباق ضد Promise مؤقت بـ setTimeout.' },
      { step: '05', title: 'النجاح الأول السريع (Promise.any & Fallback CDNs)', desc: 'Promise.any تُرجع أول Promise ينجح بنجاح وتتجاهل الأخطاء حتى تفشل كل الوعود فترمي AggregateError.' }
    ],
    playgroundCode: `// محاكي مقارنة الأداء: Waterfall مقابل Parallel
const mockFetch = (name, delay, shouldFail = false) => 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(\`Failed to fetch \${name}\`));
      else resolve({ source: name, time: delay });
    }, delay);
  });

async function runBenchmark() {
  console.log("Starting Parallel Execution with Promise.allSettled...");
  const t0 = Date.now();
  
  const results = await Promise.allSettled([
    mockFetch("UserProfile", 150),
    mockFetch("Notifications", 200),
    mockFetch("AnalyticsTracker", 100, true) // سيفشل عمداً
  ]);
  
  console.log(\`All tasks completed in \${Date.now() - t0}ms (Parallel)\`);
  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      console.log(\`Task \${i + 1} Success:\`, res.value.source);
    } else {
      console.warn(\`Task \${i + 1} Error:\`, res.reason.message);
    }
  });
}

runBenchmark();`,
    experimentQuestion: 'ما الفرق الجوهري بين حلقة forEach العادية وحلقة for..of عند استخدام await بداخلها؟',
    experimentAnswer: 'دالة forEach لا تنتظر الـ Promises وتنفذ كل الـ Callbacks بشكل تزامني غير متتابع دون انتظار اكتمال await. أما حلقة for..of فإنها تدعم async/await وتوقف التنفيذ عند كل دورة حتى يكتمل الـ Promise، مما يتيح معالجة العناصر تسلسلياً بالترتيب المطلوب.',
    codeAnatomy: [
      { line: 'async function fetchDashboardData(userId) {', note: 'دالة لاتزامنية تُرجع Promise دائماً' },
      { line: '  try {', note: 'بدء كتلة حماية الأخطاء' },
      { line: '    const [user, stats] = await Promise.all([', note: 'إطلاق الطلبات بالتوازي في خطوة واحدة' },
      { line: '      fetchUser(userId),', note: 'الطلب الأول' },
      { line: '      fetchStats(userId)', note: 'الطلب الثاني المتزامن' },
      { line: '    ]);', note: 'انتظار اكتمال الطلبين معاً' },
      { line: '    return { user, stats };', note: 'إرجاع البيانات المدمجة' },
      { line: '  } catch (error) {', note: 'التقاط أي خطأ في أي من الطلبين' },
      { line: '    logger.error("Dashboard load failed", error);', note: 'تسجيل الخطأ' },
      { line: '    throw error;', note: 'إعادة رمي الخطأ للطبقة الأعلى' },
      { line: '  }', note: 'نهاية الكتلة' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ فادح: الشلال اللاتزامني البطيء غير المبرر
async function loadUserData(userId) {
  const profile = await fetchProfile(userId); // ينتظر 300ms
  const friends = await fetchFriends(userId); // ينتظر 300ms إضافية بدون داعٍ
  const settings = await fetchSettings(userId); // ينتظر 300ms إضافية (المجموع 900ms!)
}`,
    pitfallGood: `// الحل الأمثل: إطلاق الطلبات المستقلة بالتوازي
async function loadUserData(userId) {
  const [profile, friends, settings] = await Promise.all([
    fetchProfile(userId),
    fetchFriends(userId),
    fetchSettings(userId)
  ]); // يستغرق 300ms فقط للكل!
}`,
    pitfallDiagnosis: 'الانتظار المتسلسل لعمليات لاتزامنية لا تعتمد على مخرجات بعضها البعض يهدر زمن استجابة الخادم ويضاعف زمن تحميل الصفحة للمستخدم النهائي دون أي مبرر معماري.',
    quizPool: [
      {
        q: 'Which Promise combinator should you choose if you need all results regardless of whether some fail?',
        qAr: 'أي مجمع وعود (Promise Combinator) تختاره إذا كنت بحاجة لنتائج كل الطلبات حتى لو فشل بعضها؟',
        options: ['Promise.allSettled()', 'Promise.all()', 'Promise.race()', 'Promise.any()'],
        correct: 0,
        why: 'Promise.allSettled waits for all promises to settle and returns an array of status/value/reason descriptor objects.',
        whyAr: 'دالة Promise.allSettled تنتظر اكتمال كل الوعود وتُرجع تقريراً بحالة كل وعد سواء نجح أو فشل.'
      },
      {
        q: 'What happens if one Promise in a Promise.all() array rejects?',
        qAr: 'ماذا يحدث إذا فشل وعد واحد فقط (Rejected) داخل مصفوفة Promise.all()؟',
        options: [
          'The entire Promise.all immediately rejects with that specific error (Fail-Fast).',
          'It ignores the error and returns the successful results.',
          'It retries the failed promise 3 times.',
          'It returns undefined.'
        ],
        correct: 0,
        why: 'Promise.all implements fail-fast behavior: the first rejection immediately rejects the composite promise.',
        whyAr: 'تطبق Promise.all مبدأ الفشل السريع: أول خطأ يحدث يؤدي لرفض الوعد المجمع بالكامل فوراً.'
      },
      {
        q: 'What does a function declared with async return if you return a plain number 42?',
        qAr: 'ما الذي تُرجعه دالة معلنة بكلمة async إذا قمت بإرجاع رقم عادي 42؟',
        options: [
          'A Promise that resolves to 42 (Promise<number>).',
          'The number 42 directly.',
          'undefined',
          'A synchronous Generator.'
        ],
        correct: 0,
        why: 'Async functions always wrap their return value in a resolved Promise.',
        whyAr: 'الدوال اللاتزامنية تقوم دائماً بتغليف قيم الإرجاع داخل Promise ينجح بالقيمة المحددة.'
      },
      {
        q: 'How can you implement a request timeout pattern using Promise.race?',
        qAr: 'كيف يمكنك تطبيق نمط المهلة الزمنية (Request Timeout) باستخدام Promise.race؟',
        options: [
          'Race the fetch promise against a timeout promise that rejects after X milliseconds.',
          'Pass the timeout as an option to Promise.race(timeout, fetch).',
          'Promise.race has a built-in timeout parameter.',
          'Using setInterval inside the fetch.'
        ],
        correct: 0,
        why: 'Promise.race returns the first promise to settle; racing your request against a rejecting timer enforces a strict timeout.',
        whyAr: 'وضع طلب الشبكة في سباق ضد مؤقت يرمي خطأ بعد زمن محدد يضمن إلغاء الانتظار إذا تأخر السيرفر.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف يعمل محرك جافاسكريبت عند تنفيذ await على مستوى الـ Microtask Queue وما هو مفهوم Zero-Cost Async Stack Traces؟',
    interviewA: 'عندما يصل المحرك إلى كلمة await، يقوم بتعليق سياق تنفيذ الدالة اللاتزامنية وتخزينه، ثم يرجع التحكم للـ Event Loop. عند اكتمال الـ Promise، يتم إدراج استئناف الدالة كـ Microtask في نهاية الدورة الحالية. في محركات V8 الحديثة، تم تطبيق Zero-Cost Async Stack Traces مما سمح بالاحتفاظ بتسلسل تتبع الأخطاء (Stack Trace) عبر العمليات اللاتزامنية المتعددة بدون أي استهلاك إضافي للذاكرة أثناء التشغيل العادي الخالي من الأخطاء.'
  },
  {
    slug: 'js-modules',
    title: 'ES Modules (ESM) vs CommonJS (CJS), Dynamic Imports & Tree-Shaking',
    titleAr: 'أنظمة الحزم: ES Modules مقابل CommonJS، التحميل الديناميكي و Tree-Shaking',
    level: 1,
    order: 14,
    estMinutes: 30,
    version: 'ES2024+ Standard',
    pattern: 'Modular Architecture & Static Analysis',
    objectives: [
      'فهم الفروق المعمارية الجوهرية بين معيار ES Modules (ESM) ونظام CommonJS (CJS) في Node.js.',
      'إتقان الاستيراد الساكن والتحميل الكسول الديناميكي (Dynamic import()) لتقليل حجم الحزمة الابتدائية.',
      'فهم خوارزمية الـ Tree-Shaking وكيفية كتابة كود قابل للاقتطاع وإزالة الأكواد الميتة (Dead Code Elimination).',
      'إدارة الاعتماديات الدائرية (Circular Dependencies) بأمان في المشاريع الكبرى.'
    ],
    problemOpening: `
      في بدايات جافاسكريبت، لم يكن هناك مفهوم الـ Modules على الإطلاق! كان المطورون يضعون كل الأكواد في ملفات ضخمة ويستدعونها عبر وسوم <code dir="ltr">&lt;script&gt;</code> متعددة في المتصفح، وكل المتغيرات كانت تسبح في النطاق العام (Global Scope)، وأي ملف كان قادراً على مسح متغيرات الملف الآخر بكل بساطة.
      في عام 2009، ابتكر مجتمع Node.js نظام <code dir="ltr">CommonJS</code> باستخدام <code dir="ltr">require()</code> و <code dir="ltr">module.exports</code>. كان حلاً رائعاً للباك إند، لكنه كان تزامناً (Synchronous) وغير قابل للتحليل الساكن (Static Analysis).
      في عام 2015، أطلقت لجنة TC39 معيار الـ <code dir="ltr">ES Modules (ESM)</code> الرسمي باستخدام <code dir="ltr">import</code> و <code dir="ltr">export</code>.
      الفرق بين النظامين ليس مجرد شكل كتابة الكود — ده فرق جذري في طريقة عمل المترجمات وأدوات البناء (Vite, Webpack, Rollup) في إزالة الأكواد غير المستخدمة (Tree-Shaking) وتسريع تحميل التطبيقات للمستخدم النهائي.
    `,
    mechanics: [
      { step: '01', title: 'التحليل الساكن الصارم (Static Analysis in ESM)', desc: 'في ESM، جمل import و export يجب أن تكون في أعلى الملف وتُحلل قبل تشغيل أي سطر كود، مما يمكن المترجم من معرفة الاعتماديات بدقة.' },
      { step: '02', title: 'التحميل الحي للمراجع (Live Bindings vs Value Copies)', desc: 'في CommonJS، require ترجع نسخة من القيمة المصدرة وقت الاستدعاء. في ESM، الاستيراد ينشئ رابطاً حياً (Live Binding) ينعكس فيه أي تعديل يطرأ على المتغير المصدر فوراً.' },
      { step: '03', title: 'التحميل الكسول عند الطلب (Dynamic import())', desc: 'استخدام دالة import("module.js") التي تُرجع Promise لتحميل الوحدات البرمجية الثقيلة فقط عند حاجة المستخدم إليها (Code Splitting).' },
      { step: '04', title: 'متطلبات الـ Tree-Shaking الفعال', desc: 'لكي تنجح أدوات البناء في حذف الدوال غير المستخدمة، يجب استخدام Named Exports وتفادي الـ Side Effects في مستوى الملف الجذري.' },
      { step: '05', title: 'التوافقية المزدوجة (Interoperability)', desc: 'استخدام type: "module" في package.json واعتماد امتدادات .mjs و .cjs للتنقل السلس بين النظامين.' }
    ],
    playgroundCode: `// محاكي Live Bindings والتحميل الديناميكي
// ملف تخيلي: mathUtils.mjs
export let counter = 0;
export function increment() { counter++; }

// ملف التطبيق الرئيسي
console.log("Initial counter:", counter); // 0
increment();
console.log("Live binding counter updated:", counter); // 1 (Live Binding!)

// تجربة Dynamic Import
async function loadAnalytics() {
  console.log("Lazy loading heavy analytics module...");
  // const analytics = await import("./analytics.mjs");
  console.log("Analytics module loaded on-demand successfully!");
}
loadAnalytics();`,
    experimentQuestion: 'لماذا يفشل الـ Tree-Shaking تماماً إذا قمت بتصدير كل دوال مكتبتك داخل كائن افتراضي واحد مثل export default { funcA, funcB }؟',
    experimentAnswer: 'عند استخدام default export لكائن يحتوي على عدة دوال، تعتبر أدوات البناء (مثل Rollup أو Webpack) أن الكائن بالكامل وحدة واحدة مترابطة لا يمكن تفكيكها بأمان، لأن أي كود خارجي قد يقرأ الخصائص ديناميكياً obj[prop]. لتحقيق Tree-shaking فعال، يجب دائماً استخدام Named Exports لكل دالة على حدة export function funcA().',
    codeAnatomy: [
      { line: '// math.mjs - Named Exports', note: 'تصديرات مسمّاة تدعم Tree-Shaking' },
      { line: 'export const add = (a, b) => a + b;', note: 'تصدير دالة الجمع' },
      { line: 'export const multiply = (a, b) => a * b;', note: 'تصدير دالة الضرب' },
      { line: '// app.mjs - Named Imports', note: 'استيراد الدالة المطلوبة فقط' },
      { line: 'import { add } from "./math.mjs";', note: 'دالة multiply لن يتم تضمينها في الـ Bundle النهائي' },
      { line: 'const btn = document.querySelector("#exportBtn");', note: 'عنصر الزر' },
      { line: 'btn.addEventListener("click", async () => {', note: 'حدث الضغط' },
      { line: '  const { generatePdf } = await import("./pdfEngine.mjs");', note: 'تحميل ديناميكي كسول لمكتبة الـ PDF الثقيلة' },
      { line: '  generatePdf();', note: 'تنفيذ الدالة' },
      { line: '});', note: 'نهاية الحدث' }
    ],
    pitfallBad: `// خطأ شائع: استيراد مكتبة ضخمة بالكامل في الصفحة الرئيسية
import lodash from "lodash"; // يضيف أكثر من 70KB للحزمة الابتدائية حتى لو استخدمت دالة واحدة!`,
    pitfallGood: `// الحل الأمثل لدعم Tree-Shaking
import debounce from "lodash-es/debounce"; // استيراد الوحدة الدقيقة بحجم أقل من 2KB`,
    pitfallDiagnosis: 'استيراد المكتبات الكبرى بدون دعم ESM يمنع أدوات البناء من حذف المئات من الدوال غير المستخدمة، مما يثقل حجم الـ JavaScript المحمل على متصفح العميل ويبطئ مؤشرات أداء الويب Core Web Vitals.',
    quizPool: [
      {
        q: 'What is a key difference in how exported variables behave between CommonJS and ES Modules?',
        qAr: 'ما هو الفرق الجوهري في سلوك المتغيرات المصدرة بين CommonJS و ES Modules؟',
        options: [
          'ESM provides live read-only bindings to the original variable; CJS exports a copied value at time of require.',
          'CJS provides live bindings; ESM copies values.',
          'ESM cannot export primitive values.',
          'CJS is purely asynchronous.'
        ],
        correct: 0,
        why: 'ESM maintains live bindings so updates to the exported variable in the source module are immediately visible to importers.',
        whyAr: 'نظام ESM يحافظ على روابط حية Live Bindings بحيث تنعكس التحديثات على المتغير المصدر فوراً لدى المستوردين.'
      },
      {
        q: 'Why is dynamic import() beneficial for frontend performance?',
        qAr: 'لماذا يعتبر الاستيراد الديناميكي import() مفيداً جداً لأداء واجهات الويب؟',
        options: [
          'Enables code-splitting by lazily loading modules on-demand, reducing initial bundle size.',
          'It runs modules in a multi-threaded web worker automatically.',
          'It completely disables browser caching.',
          'It bypasses CORS security policies.'
        ],
        correct: 0,
        why: 'Dynamic imports enable code splitting so non-critical code is downloaded only when required by the user.',
        whyAr: 'الاستيراد الديناميكي يتيح تجزئة الكود وتحميل الملفات الثقيلة عند الحاجة إليها فقط مما يصغر حجم الحزمة الأولى.'
      },
      {
        q: 'What is Tree-Shaking in modern JavaScript bundlers?',
        qAr: 'ما هو مفهوم الـ Tree-Shaking في أدوات تجميع جافاسكريبت الحديثة؟',
        options: [
          'Dead code elimination that strips out unused named exports from the final production bundle.',
          'A mechanism for animating UI trees.',
          'A method to obfuscate JavaScript code.',
          'A tool for converting CSS to JavaScript.'
        ],
        correct: 0,
        why: 'Tree-shaking relies on ESM static analysis to detect and remove unreferenced exports from the production build.',
        whyAr: 'هو عملية حذف الأكواد والتصديرات غير المستخدمة من الحزمة النهائية بالاعتماد على التحليل الساكن لـ ESM.'
      },
      {
        q: 'Which package.json field enables native ES Module syntax across all .js files in a Node.js project?',
        qAr: 'أي حقل في ملف package.json يفعل دعم ES Modules الأصلي لجميع ملفات .js في مشروع Node.js؟',
        options: ['"type": "module"', '"esm": true', '"module": "es2024"', '"syntax": "esm"'],
        correct: 0,
        why: 'Setting "type": "module" in package.json instructs Node.js to treat all .js files in the package as ES modules.',
        whyAr: 'تعيين "type": "module" في package.json يخبر Node.js بمعاملة جميع ملفات .js كـ ES Modules.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تتعامل محركات جافاسكريبت مع مشكلة الاعتماديات الدائرية (Circular Dependencies) في ESM مقارنة بـ CommonJS؟',
    interviewA: 'في CommonJS، إذا استورد الملف A الملف B وكان B يستورد A، فإن B سيحصل على كائن module.exports غير مكتمل (Partial/Empty Export) قد يسبب أخطاء undefined أثناء التنفيذ. في ESM، وبفضل مرحلة التحليل الساكن المسبقة (Module Record Instantiation)، يتم ربط المتغيرات كـ Live Bindings قبل تشغيل الكود، مما يسمح بحل الاعتماديات الدائرية بسلاسة طالما أن الدوال لا تحاول قراءة المتغيرات قبل اكتمال مرحلة الـ Evaluation الخاصة بها.'
  },
  {
    slug: 'js-error-handling',
    title: 'Custom Error Hierarchies, Stack Traces & Defensive Coding',
    titleAr: 'هيكلة فئات الأخطاء المخصصة، تشريح الـ Stack Traces والبرمجة الدفاعية',
    level: 1,
    order: 15,
    estMinutes: 30,
    version: 'ES2024+ Standard',
    pattern: 'Error Handling Architecture & Fault Tolerance',
    objectives: [
      'بناء شجرة أخطاء مؤسسية مخصصة (Custom Error Hierarchy) ترث من فئة Error الأصلية.',
      'فهم والتحكم في تسلسل تتبع الأخطاء باستخدام Error.captureStackTrace().',
      'استخدام خاصية error.cause المضافة حديثاً لتتبع سلاسل أسباب الأخطاء المتسلسلة (Error Chaining).',
      'التمييز الصارم بين الأخطاء التشغيلية المتوقعة (Operational Errors) وأخطاء المبرمجين البرمجية (Programmer Bugs).'
    ],
    problemOpening: `
      في المشاريع المبتدئة، معالجة الأخطاء تقتصر على وضع <code dir="ltr">console.log(error)</code> داخل كتلة catch. النتيجة؟ عندما تحدث مشكلة في الإنتاج، يجد فريق الهندسة رسالة غامضة مثل <code dir="ltr">Error: Something went wrong</code> بدون أي تفاصيل عن هوية المستخدم، أو رقم الطلب، أو كود الخطأ الدقيق!
      في الأنظمة الإنتاجية الكبرى، معالجة الأخطاء هي "معمارية هندسية متكاملة" (Error Architecture).
      يجب أن يكون خادمك قادراً على التمييز التلقائي بين:
      1. خطأ تشغيلي متوقع (Operational Error): مثل إدخال كلمة سر خاطئة أو انتهاء رصيد العميل (يجب معالجته وإرجاع كود 400 أو 402 برسالة واضحة للمستخدم).
      2. خطأ برمجي كارثي (Programmer Bug): مثل محاولة قراءة خاصية من undefined أو فشل الاتصال بقاعدة البيانات (يجب تسجيله فوراً مع الـ Stack Trace وإرسال تنبيه لفريق On-Call).
      في هذا الدرس، هنتعلم إزاي نبني فئات أخطاء احترافية تدعم Error Causes والـ HTTP Status Codes، وإزاي ننظف الـ Stack Traces لحماية بيانات النظام الحساسة.
    `,
    mechanics: [
      { step: '01', title: 'بناء فئة الخطأ الأساسية (Base Custom Application Error)', desc: 'إنشاء كلاس AppError يرث من Error ويحمل statusCode و isOperational و code لتصنيف المشاكل.' },
      { step: '02', title: 'تنظيف الـ Stack Trace عبر Error.captureStackTrace', desc: 'إزالة اسم مشيد كلاس الخطأ من الـ Stack Trace ليبدأ التسلسل مباشرة من السطر الحقيقي الذي تسبب في المشكلة.' },
      { step: '03', title: 'ربط أسباب الأخطاء المتسلسلة (Error Chaining with error.cause)', desc: 'استخدام new Error("High-level message", { cause: originalError }) لربط الخطأ الظاهري بالخطأ الجذري للـ Database.' },
      { step: '04', title: 'المعالجة الدفاعية للمدخلات (Defensive Programming)', desc: 'التحقق من صحة المعاملات عند مداخل الدوال (Guard Clauses) ورمي TypeError و RangeError فوراً قبل بدء المعالجة.' },
      { step: '05', title: 'حراس الأخطاء العامة (Global Unhandled Rejection Guards)', desc: 'إعداد مستمعي process.on("unhandledRejection") في Node.js أو window.addEventListener("unhandledrejection") في المتصفح.' }
    ],
    playgroundCode: `// محاكي هيكل الأخطاء المؤسسية
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true, cause = null) {
    super(message, { cause });
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class PaymentRequiredError extends AppError {
  constructor(message = "Insufficient balance for transaction", cause = null) {
    super(message, 402, true, cause);
  }
}

// تجربة معالجة خطأ بسلسلة أسباب (Chained Cause)
try {
  try {
    throw new Error("Stripe Gateway Timeout (Raw socket closed)");
  } catch (rawErr) {
    throw new PaymentRequiredError("Payment failed at checkout", rawErr);
  }
} catch (appErr) {
  console.log("Client Status Code:", appErr.statusCode);
  console.log("User Message:", appErr.message);
  console.log("Root Cause:", appErr.cause.message);
  console.log("Is Operational:", appErr.isOperational);
}`,
    experimentQuestion: 'ماذا يحدث إذا قمت بـ throw لقيمة بدائية عادية مثل throw "Something failed!" بدلاً من كائن Error؟ ولماذا يعتبر ذلك خطأً كارثياً؟',
    experimentAnswer: 'رمي قيمة بدائية (String أو Number) يحرمك من توليد الـ Stack Trace الذي يسجل رقم السطر واسم الملف والـ Call Stack الدقيق لمكان حدوث المشكلة. كما أنه يكسر أدوات الرصد (مثل Sentry أو Datadog) التي تتوقع كائناً يحتوي على الخاصيتين name و message.',
    codeAnatomy: [
      { line: 'export class NotFoundError extends AppError {', note: 'فئة خطأ مخصصة للموارد غير الموجودة' },
      { line: '  constructor(resource = "Resource", id = "") {', note: 'مشيد يقبل اسم المورد ومعرفه' },
      { line: '    super(`${resource} with ID [${id}] not found.`, 404);', note: 'تمرير كود الحالة 404' },
      { line: '    this.resource = resource;', note: 'بيانات وصفية إضافية للتحليل' },
      { line: '  }', note: 'نهاية المشيد' },
      { line: '}', note: 'نهاية الفئة' }
    ],
    pitfallBad: `// خطأ كارثي: صيد الخطأ وتجاهله بصمت (Silent Failure)
try {
  await chargeCreditCard(user, amount);
} catch (error) {
  // ترك الكتلة فارغة بدون تسجيل أو إعادة رمي!
}`,
    pitfallGood: `// الحل الهندسي: تسجيل وتصنيف الخطأ أو إعادة رميه
try {
  await chargeCreditCard(user, amount);
} catch (error) {
  logger.error("Payment processing failed", { userId: user.id, error });
  throw new PaymentError("Unable to process transaction", { cause: error });
}`,
    pitfallDiagnosis: 'ابتلاع الأخطاء بصمت (Swallowing Errors) يخفي المشاكل الحرجة ويجعل تتبع الأعطال الأمنية والمالية في بيئات الإنتاج أمراً مستحيلاً.',
    quizPool: [
      {
        q: 'What is the standard ES2022 way to chain a lower-level root cause error to a higher-level custom error?',
        qAr: 'ما هي الطريقة القياسية في ES2022 لربط خطأ جذري منخفض المستوى بخطأ مخصص عالي المستوى؟',
        options: [
          'new Error("High level message", { cause: originalError })',
          'new Error("Message", originalError)',
          'error.setRootCause(originalError)',
          'Error.chain(originalError, "Message")'
        ],
        correct: 0,
        why: 'ES2022 added the options bag with { cause } parameter to Error constructor for native error chaining.',
        whyAr: 'أضاف معيار ES2022 كائن الخيارات مع خاصية { cause } في مشيد Error لتمكين تتبع سلسلة الأخطاء الأصلية.'
      },
      {
        q: 'What is the purpose of Error.captureStackTrace(targetObject, constructorOpt)?',
        qAr: 'ما هي الفائدة الأساسية من استدعاء Error.captureStackTrace() داخل فئات الأخطاء المخصصة؟',
        options: [
          'Creates the .stack property and omits the custom error constructor itself from the trace.',
          'Sends the error stack trace automatically to a remote logging server.',
          'Encrypts sensitive data in the stack trace.',
          'Freezes the error object.'
        ],
        correct: 0,
        why: 'Error.captureStackTrace creates a clean .stack property and strips internal constructor frames for clarity.',
        whyAr: 'تنشئ خاصية .stack نظيفة وتستبعد أسطر المشيد الداخلي للكلاس لتسهيل قراءة مكان الخطأ الحقيقي.'
      },
      {
        q: 'Why should you always throw an instance of Error rather than a raw string or object?',
        qAr: 'لماذا يجب دائماً رمي كائن يرث من Error بدلاً من رمي نص صريح أو كائن عادي؟',
        options: [
          'Error objects automatically capture the call stack, filename, and line numbers.',
          'Raw strings crash the JavaScript runtime immediately.',
          'Try/catch blocks only catch Error instances.',
          'It is required by the HTTP protocol.'
        ],
        correct: 0,
        why: 'Instantiating Error populates the stack trace, name, and message essential for debugging and monitoring tools.',
        whyAr: 'كائنات Error تولد تلقائياً تسلسل الاستدعاءات Stack Trace وتسجل اسم الملف ورقم السطر بدقة.'
      },
      {
        q: 'How does an Operational Error differ from a Programmer Bug in production architecture?',
        qAr: 'كيف يختلف الخطأ التشغيلي (Operational Error) عن الخطأ البرمجي (Programmer Bug) في بيئات الإنتاج؟',
        options: [
          'Operational errors are anticipated runtime conditions (invalid inputs, network loss); bugs are avoidable code defects.',
          'Operational errors always crash the server process.',
          'Programmer bugs can be solved by adding more RAM.',
          'There is no architectural difference.'
        ],
        correct: 0,
        why: 'Operational errors are expected parts of normal system lifecycle to be handled gracefully; programmer bugs indicate software defects.',
        whyAr: 'الأخطاء التشغيلية هي حالات متوقعة أثناء تشغيل النظام (مثل انقطاع شبكة أو إدخال خاطئ)، بينما الأخطاء البرمجية هي عيوب في الكود.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هي استراتيجيتك لمعالجة أخطاء الـ Unhandled Rejections والـ Uncaught Exceptions في خوادم Node.js الكبرى دون إيقاف الخدمة عن باقي المستخدمين؟',
    interviewA: 'عند حدوث uncaughtException، يكون تطبيق Node.js في حالة غير مستقرة وغير مضمونة في الذاكرة (Corrupted State). الاستراتيجية السليمة هي: 1. تسجيل تفاصيل الخطأ في نظام المراقبة. 2. إيقاف استقبال اتصالات جديدة على الخادم. 3. إكمال الطلبات الجارية الحالية بحد أقصى (Graceful Shutdown مهلة 10 ثوانٍ). 4. إنهاء العملية بـ process.exit(1). 5. الاعتماد على مدير عمليات مثل PM2 أو Docker/Kubernetes لإعادة تشغيل الـ Container نظيفاً فوراً، مع توزيع الأحمال عبر Load Balancer لضمان عدم انقطاع الخدمة.'
  },
  {
    slug: 'js-modern-features',
    title: 'Modern JavaScript (ES2020–ES2026+): Nullish Coalescing, WeakRefs & Temporal',
    titleAr: 'جافاسكريبت الحديثة (ES2020–ES2026+): Nullish Coalescing، الروابط الضعيفة WeakRefs والزمن بـ Temporal',
    level: 1,
    order: 16,
    estMinutes: 30,
    version: 'ES2024+ / ESNext',
    pattern: 'Modern Language Features & Memory Management',
    objectives: [
      'استخدام Nullish Coalescing (??) و Optional Chaining (?.) لتفادي أخطاء Falsy Values و TypeErrors.',
      'إدارة الذاكرة وتحسين الأداء باستخدام WeakMap و WeakSet و WeakRef لمنع تسريبات الذاكرة (Memory Leaks).',
      'فهم واجهة التاريخ والوقت الحديثة Temporal API كبديل متفوق لمشاكل Date القديمة.',
      'تطبيق ميزات ES2023+ مثل Array.prototype.with و Object.groupBy و Promise.withResolvers.'
    ],
    problemOpening: `
      لغة جافاسكريبت تتطور بسرعة هائلة كل عام عبر مقترحات لجنة TC39. الميزات التي كانت تتطلب مكتبات خارجية ضخمة مثل Moment.js لإدارة التواريخ أو Lodash للتنقل في الكائنات المعقدة أصبحت الآن مدمجة في صلب المحرك وبأعلى أداء ممكن.
      كم مرة كتبت كود للتحقق من قيمة افتراضية مثل <code dir="ltr">const port = process.env.PORT || 3000</code> وتفاجأت بمشكلة لما القيمة كانت <code dir="ltr">0</code> أو <code dir="ltr">false</code> أو <code dir="ltr">""</code> لأن عامل <code dir="ltr">||</code> يعتبرها Falsy؟
      أو كم مرة واجهت تسريب ذاكرة (Memory Leak) في خادمك لأنك خزنت كائنات DOM أو بيانات جلسات مستخدمين في Map عادية منعت جامع القمامة (Garbage Collector) من حذفها؟
      في هذا الدرس الختامي لمسار الأساسيات، هنستكشف أحدث وأقوى ميزات جافاسكريبت الحديثة (ES2020 حتى ES2026+)، وهنتعلم إزاي نكتب كود نظيف، عصري، فائق السرعة، ومحمي ضد تسريبات الذاكرة.
    `,
    mechanics: [
      { step: '01', title: 'التحقق الآمن بـ Optional Chaining (?.)', desc: 'قراءة الخصائص واستدعاء الدوال المتداخلة بأمان user?.profile?.getAddress?.() بدون التسبب في TypeError إذا كانت أي حلقة undefined أو null.' },
      { step: '02', title: 'القيم الافتراضية الدقيقة بـ Nullish Coalescing (??)', desc: 'التعامل مع null و undefined فقط كقيم مفقودة، مع الحفاظ على القيم الصالحة مثل 0 و false و "" دون استبدالها بالقيمة الافتراضية.' },
      { step: '03', title: 'إدارة الذاكرة المعزولة بـ WeakMap و WeakRef', desc: 'الروابط الضعيفة تسمح لمجمع القمامة (Garbage Collector) بحذف الكائنات عند زوال مراجعها الأخرى، مما يمنع تسريبات الذاكرة في أنظمة الـ Caching.' },
      { step: '04', title: 'ثورة إدارة التواريخ بـ Temporal API', desc: 'واجهة Temporal الحديثة توفر كائنات غير قابلة للتعديل تدعم المناطق الزمنية والتقاويم المختلفة بدقة متناهية وبدون أخطاء كائن Date التاريخية.' },
      { step: '05', title: 'الميزات الحديثة: Promise.withResolvers و Object.groupBy', desc: 'إنشاء وعود والتحكم في resolve/reject من الخارج مباشرة، وتجميع مصفوفات البيانات بـ Object.groupBy في خطوة واحدة.' }
    ],
    playgroundCode: `// محاكي ميزات جافاسكريبت الحديثة
const serverConfig = {
  port: 0, // قيمة صفرية صالحة
  database: {
    host: "localhost"
  }
};

// مقارنة || مقابل ??
console.log("With OR (||):", serverConfig.port || 8080);   // 8080 (خطأ: تجاهل الصفر!)
console.log("With Nullish (??):", serverConfig.port ?? 8080); // 0 (صحيح: احترم الصفر)

// Optional Chaining الآمن
console.log("Db Password:", serverConfig.database?.credentials?.password ?? "No password set");

// تجربة Promise.withResolvers (ES2024)
const { promise, resolve, reject } = Promise.withResolvers();
promise.then(msg => console.log("Promise Resolved from outside:", msg));
resolve("Async Success via withResolvers!");`,
    experimentQuestion: 'لماذا لا يمكن تكرار مفاتيح WeakMap باستخدام حلقة for..of أو معرفة عدد عناصرها بـ .size؟',
    experimentAnswer: 'لأن مراجع المفاتيح في WeakMap ضعيفة (Weak References). مجمع القمامة (Garbage Collector) قد يقوم بحذف أي مفتاح في أي أجزاء من الألف من الثانية بمجرد زوال مرجعه في التطبيق. ولأن عملية التنظيف غير محددة التوقيت (Non-deterministic)، تمنع مواصفات اللغة تكرار المفاتيح أو حساب عددها لضمان استقرار وسلوك الكود.',
    codeAnatomy: [
      { line: 'const userCity = user?.address?.city ?? "Cairo";', note: 'دمج Optional Chaining مع Nullish Coalescing' },
      { line: 'const cache = new WeakMap();', note: 'تخزين كاش مرتبط بدورة حياة الكائن لتفادي Memory Leaks' },
      { line: 'const { promise, resolve } = Promise.withResolvers();', note: 'إنشاء Promise مع وحدات تحكم خارجية (ES2024)' },
      { line: 'const grouped = Object.groupBy(products, p => p.category);', note: 'تجميع العناصر حسب الفئة أصلياً (ES2024)' }
    ],
    pitfallBad: `// خطأ شائع: استخدام || لتحديد قيم افتراضية لخيارات منطقية أو عددية
function setupTimeout(delay) {
  const timeout = delay || 1000; // لو مررت 0 سيتم تجاهلها وتطبيق 1000ms!
}`,
    pitfallGood: `// الحل الهندسي الصحيح
function setupTimeout(delay) {
  const timeout = delay ?? 1000; // الصفر قيمة صالحة ومقبولة
}`,
    pitfallDiagnosis: 'عامل || يعتبر الأرقام الصفرية والنصوص الفارغة وقيم false بمثابة قيم غير صالحة ويستبدلها بالقيمة الافتراضية، بينما ?? يتحقق حصراً من null و undefined.',
    quizPool: [
      {
        q: 'What will the expression (0 ?? 42) evaluate to in JavaScript?',
        qAr: 'ما هي نتيجة تقييم التعبير (0 ?? 42) في جافاسكريبت؟',
        options: ['0', '42', 'undefined', 'TypeError'],
        correct: 0,
        why: 'The nullish coalescing operator (??) only falls back if the left operand is null or undefined. Since 0 is defined, it returns 0.',
        whyAr: 'عامل Nullish Coalescing يتحقق فقط من null و undefined؛ وبما أن 0 قيمة معرّفة فإنه يُرجع 0.'
      },
      {
        q: 'What is the main purpose of WeakMap compared to standard Map?',
        qAr: 'ما هي الفائدة الأساسية لـ WeakMap مقارنة بـ Map العادية؟',
        options: [
          'Keys are held weakly, allowing the garbage collector to reclaim objects when no other references exist.',
          'WeakMap keys can be primitives like strings and numbers.',
          'WeakMap is faster for iterating over all keys.',
          'WeakMap automatically syncs with localStorage.'
        ],
        correct: 0,
        why: 'WeakMap holds weak references to object keys, preventing memory leaks when objects are deleted elsewhere in the app.',
        whyAr: 'تحتفظ بروابط ضعيفة لمفاتيح الكائنات مما يسمح لمجمع القمامة بحذفها ومنع تسريبات الذاكرة.'
      },
      {
        q: 'What is the advantage of the upcoming Temporal API over the legacy Date object?',
        qAr: 'ما هي الميزة الأساسية لواجهة Temporal الحديثة مقارنة بكائن Date القديم؟',
        options: [
          'Immutable data structures, precise timezone and calendar support, and prevention of parsing bugs.',
          'It is written in WebAssembly.',
          'It only works for Gregorian calendar.',
          'It replaces the setTimeout function.'
        ],
        correct: 0,
        why: 'Temporal provides modern immutable APIs with built-in timezone awareness, eliminating decades of Date quirks.',
        whyAr: 'توفر واجهات غير قابلة للتعديل تدعم المناطق الزمنية والتقاويم المتعددة وتتخلص من أخطاء كائن Date التاريخية.'
      },
      {
        q: 'What does Promise.withResolvers() return?',
        qAr: 'ما الذي تُرجعه دالة Promise.withResolvers() المضافة في ES2024؟',
        options: [
          'An object containing { promise, resolve, reject } exposed for external control.',
          'An array of resolved promises.',
          'A synchronous Promise executor.',
          'A web worker wrapper.'
        ],
        correct: 0,
        why: 'Promise.withResolvers provides direct access to the promise instance alongside its resolve and reject trigger functions.',
        whyAr: 'تُرجع كائناً يحتوي على Promise مع دالتي resolve و reject الخاصة به للتحكم فيه من الخارج مباشرة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تستخدم WeakRef و FinalizationRegistry لبناء نظام كاش متقدم (Advanced In-Memory Cache) دون التسبب في OOM (Out Of Memory) Crashes؟',
    interviewA: 'باستخدام WeakRef، يمكنك تخزين كائنات ضخمة كـ Weak References في الكاش. إذا احتاج التطبيق الكائن وكان لا يزال موجوداً في الذاكرة، يتم قراءته عبر ref.deref() بسرعة. وإذا نفدت الذاكرة، يستطيع محرك V8 تحريره وحذفه بدون أن يمنعه الكاش من ذلك. ومن خلال FinalizationRegistry، يمكن تسجيل دالة تنظيف تلقائية تُنفذ بمجرد حذف الكائن لتطهير المفاتيح المرتبطة به من الـ Cache Metadata.'
  }
];
