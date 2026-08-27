/* ============================================================
   architecture-lessons.mjs — 13 New Lessons for Architecture Track
   ============================================================ */

export const architectureLessons = [
  {
    slug: 'layered-architecture',
    title: 'N-Tier Layered Architecture: Controllers, Services, Repositories & DTOs',
    titleAr: 'المعمارية متعددة الطبقات (N-Tier): وحدات التحكم والخدمات والمستودعات والـ DTOs',
    level: 1,
    order: 2,
    estMinutes: 26,
    version: 'Enterprise Node.js',
    pattern: 'Layered Architecture',
    problemOpening: `في المشاريع المبتدئة، تجد المطور يكتب كل شيء داخل دالة الموجه (Route Handler): فحص الطلب، الاتصال بقاعدة البيانات، حساب الضرائب، إرسال الإيميلات، وتنسيق الرد في 200 سطر متشابك (Fat Controllers)! هذا يسمى Spaghetti Code ويجعل اختبار منطق الأعمال بمعزل عن الـ HTTP مستحيلاً. المعمارية الطبقية (Layered Architecture) تقسم النظام إلى 4 طبقات مستقلة تفصل المسؤوليات بشكل صارم.`,
    objectives: [
      'فهم مسؤوليات الطبقات الأربع: Controller (HTTP), Service (Business Logic), Repository (Data Access), DTO (Data Transfer).',
      'تطبيق مبدأ المسؤولية الفردية (Single Responsibility Principle) وفصل منطق الأعمال عن بروتوكول HTTP.',
      'تسهيل كتابة اختبارات الوحدات (Unit Testing) بمحاكاة طبقة المستودعات بسهولة.'
    ],
    mechanics: [
      { step: 1, title: 'طبقة التحكم (Controller Layer)', desc: 'تستقبل كائن req وتفحصه عبر DTO وتوجه البيانات للخدمة وتحدد كود حالة الرد res.status().' },
      { step: 2, title: 'طبقة الأعمال (Service Layer)', desc: 'تحتوي على كل الحسابات وقواعد العمل (Business Rules) وتعمل كدوال نقية لا تعرف شيئاً عن req أو res.' },
      { step: 3, title: 'طبقة المستودعات (Repository Layer)', desc: 'تتولى التحدث المباشر مع قاعدة البيانات (Prisma أو Mongoose) مما يتيح تغيير محرك البيانات دون مساس بطبقة الأعمال.' }
    ],
    playgroundCode: `// Layered Architecture Request Pipeline Simulation
class UserRepository {
  async save(userData) { return { id: "u-101", ...userData, createdAt: new Date() }; }
}

class UserService {
  constructor(repo) { this.repo = repo; }
  async register(dto) {
    if (dto.age < 18) throw new Error("Underage registration rejected by business policy");
    return await this.repo.save(dto);
  }
}

class UserController {
  constructor(service) { this.service = service; }
  async handlePost(req, res) {
    try {
      const user = await this.service.register(req.body);
      console.log("✅ Controller Response: 201 Created ->", user);
    } catch (err) {
      console.log("❌ Controller Response: 400 Bad Request ->", err.message);
    }
  }
}

const ctrl = new UserController(new UserService(new UserRepository()));
ctrl.handlePost({ body: { name: "Amr Zidan", age: 25 } }, {});`,
    experimentQuestion: 'لماذا يحظر تماماً تمرير كائني req و res إلى طبقة الـ Service؟',
    experimentAnswer: 'لأن تمرير كائنات HTTP يربط منطق الأعمال ببروتوكول الويب ويمنع إعادة استخدام نفس الـ Service مع قنوات أخرى مثل WebSocket Handlers أو Message Queue Workers أو أوامر CLI.',
    codeAnatomy: [
      { line: '1: // Controller: Only parses HTTP and calls Service', note: 'التحكم بالـ HTTP فقط' },
      { line: '2: export const register = async (req, res) => {', note: 'معالج المسار' },
      { line: '3:   const user = await authService.registerUser(req.body);', note: 'استدعاء الخدمة' },
      { line: '4:   return res.status(201).json({ status: "success", data: user });', note: 'إرسال الرد' },
      { line: '5: };', note: 'نهاية المعالج' }
    ],
    pitfallBad: 'كتابة استعلامات SQL أو Prisma داخل ملفات الـ Controllers مباشرة',
    pitfallGood: 'حصر استعلامات قواعد البيانات داخل طبقة Repository واستدعاؤها عبر Service',
    pitfallDiagnosis: 'خلط الاستعلامات مع الـ Controllers يجعل الكود غير قابل للاختبار المعزول (Unit Testing).',
    quizPool: [{
      q: 'Which architectural layer is strictly responsible for business rules and calculations, independent of HTTP transport?',
      qAr: 'أي طبقة معمارية مسؤولة حصرياً عن قواعد الأعمال والحسابات المنطقية بمعزل تام عن بروتوكول HTTP؟',
      options: ['Controller Layer', 'Service Layer', 'Repository Layer', 'Presentation Layer'],
      correct: 1,
      why: 'The Service layer encapsulates core domain logic and business policies.',
      whyAr: 'طبقة الخدمة (Service Layer) تكبسل منطق الدومين وقواعد الأعمال الأساسية.'
    }],
    interviewQ: 'ما هي كائنات الـ DTOs (Data Transfer Objects) وفيمَ تفيد في المعمارية الطبقية؟',
    interviewA: 'الـ DTOs هي كائنات بسيطة مجردة تحدد شكل ونوع البيانات التي تنتقل بين الطبقات (مثل `CreateUserDTO`)؛ وتفيد في: 1. منع تسريب الحقول الزائدة. 2. التحقق التلقائي من صحة الحقول قبل دخولها للنظام. 3. توفير عقود نوعية (Type Contracts) واضحة بين الواجهة والسيرفر.'
  },
  {
    slug: 'clean-architecture',
    title: 'Clean Architecture & Hexagonal Ports/Adapters in Modern Node.js',
    titleAr: 'العمارة النظيفة (Clean Architecture) والمنافذ والمحولات (Hexagonal) في Node.js',
    level: 2,
    order: 3,
    estMinutes: 28,
    version: 'Enterprise Architecture',
    pattern: 'Domain-Driven Architecture',
    problemOpening: `في العمارة التقليدية، قواعد الأعمال تعتمد على مكتبات الـ ORM وإطار عمل الـ Web. إذا قررت الشركة استبدال Express بـ Fastify أو استبدال PostgreSQL بـ DynamoDB، يضطر الفريق لإعادة كتابة المشروع بالكامل! معمارية <code dir="ltr">Clean Architecture</code> و <code dir="ltr">Hexagonal Ports &amp; Adapters</code> تعكس اتجاه التبعية بالكامل: "منطق الأعمال هو المركز المستقل، وأطر العمل وقواعد البيانات مجرد ملحقات وتفاصيل خارجية قابلة للاستبدال كفيشة الكهرباء".`,
    objectives: [
      'فهم قاعدة التبعية (The Dependency Rule): الاعتماديات تتجه دائماً من الخارج إلى الداخل نحو الـ Domain.',
      'بناء واجهات المنافذ (Ports) وتطبيق المحولات (Adapters) باستخدام TypeScript Interfaces.',
      'تطبيق حقن التبعيات (Dependency Injection) لفصل كيانات الـ Domain عن العالم الخارجي.'
    ],
    mechanics: [
      { step: 1, title: 'النواة النقية (Core Domain & Entities)', desc: 'كيانات وقواعد عمل لا تعتمد على أي مكتبة npm أو إطار عمل خارجي على الإطلاق.' },
      { step: 2, title: 'حالات الاستخدام (Use Cases / Application)', desc: 'تنسيق تدفق البيانات وتنفيذ السيناريوهات عبر واجهات تجريدية (Interfaces/Ports).' },
      { step: 3, title: 'المحولات الخارجية (Adapters / Infrastructure)', desc: 'تطبيق الواجهات عبر Express Controllers و Prisma Repositories و Stripe Payment Gateways.' }
    ],
    playgroundCode: `// Hexagonal Ports & Adapters Architecture Simulation
// 1. Port Interface (Abstraction)
class IPaymentGateway {
  async process(amount) { throw new Error("Method not implemented"); }
}

// 2. Core Use Case (Domain Logic)
class CheckoutUseCase {
  constructor(paymentPort) { this.paymentPort = paymentPort; }
  async execute(amount) {
    console.log("🛒 Validating Checkout Rules in Domain...");
    return await this.paymentPort.process(amount);
  }
}

// 3. Adapter (Infrastructure Implementation)
class StripeAdapter extends IPaymentGateway {
  async process(amount) { console.log(\`💳 Processing $\${amount} via Stripe API Adapter.\`); return { success: true }; }
}

const useCase = new CheckoutUseCase(new StripeAdapter());
useCase.execute(450);`,
    experimentQuestion: 'ما هي قاعدة التبعية (The Dependency Rule) في Clean Architecture؟',
    experimentAnswer: 'تنص القاعدة على أن كود الطبقات الداخلية (Entities & Use Cases) لا يجب أن يعرف أو يستورد أي شيء مطلقاً من الطبقات الخارجية (Frameworks, Databases, UI)؛ الاعتماد يكون دائماً للداخل فقط عبر الـ Interfaces.',
    codeAnatomy: [
      { line: '1: // Domain Port Interface (Pure TypeScript)', note: 'منفذ تجريدي داخل النواة' },
      { line: '2: export interface IUserRepository { findByEmail(email: string): Promise<User | null>; }', note: 'تعريف الواجهة بدون أي كود قاعدة بيانات' },
      { line: '3: // Infrastructure Adapter Implementation', note: 'المحول الخارجي' },
      { line: '4: export class PrismaUserRepo implements IUserRepository { ... }', note: 'تطبيق الواجهة بـ Prisma' }
    ],
    pitfallBad: 'استيراد prisma أو express داخل ملفات Use Cases أو Domain Entities!',
    pitfallGood: 'الاعتماد على Interfaces فقط وحقن التنفيذ الحقيقي عبر Constructor Injection',
    pitfallDiagnosis: 'استيراد أطر العمل في الـ Domain يكسر عزل النظام ويجعل الكود غير قابل للاستبدال أو الاختبار النقي.',
    quizPool: [{
      q: 'In Clean Architecture, which layer occupies the innermost center of the concentric circles and has zero external dependencies?',
      qAr: 'في العمارة النظيفة، أي طبقة تحتل المركز الداخلي ولديها صفر تبعيات خارجية؟',
      options: ['Frameworks & Drivers', 'Interface Adapters', 'Entities (Domain Layer)', 'Use Cases'],
      correct: 2,
      why: 'Entities encapsulate enterprise-wide business rules and have zero dependencies on frameworks or libraries.',
      whyAr: 'طبقة الكيانات (Entities) تكبسل قواعد الأعمال المستقلة تماماً عن أي مكتبات أو أطر عمل.'
    }],
    interviewQ: 'متى تكون معمارية Clean Architecture مفيدة حقاً ومتى تكون Over-Engineering يضر بالمشروع؟',
    interviewA: 'تكون مفيدة جداً في المشاريع الكبرى ذات منطق الأعمال المعقد والأنظمة البنكية التي تتطلب عمراً طويلاً (10+ سنوات) وفرق عمل متعددة وتغييرات مستمرة في البنية التحتية. وتعتبر Over-Engineering في تطبيقات الـ CRUD البسيطة والـ MVPs السريعة حيث تزيد عدد الملفات والطبقات التجريدية دون عائد حقيقي.'
  },
  {
    slug: 'auth-security-deep-dive',
    title: 'Enterprise Auth Architecture: OAuth 2.1, OIDC, Session Rotation & SSO',
    titleAr: 'معمارية التوثيق المتقدمة للمؤسسات: بروتوكول OAuth 2.1 وتسجيل الدخول الموحد (SSO)',
    level: 2,
    order: 4,
    estMinutes: 28,
    version: 'OAuth 2.1 / OIDC Spec',
    pattern: 'Enterprise Security',
    problemOpening: `التوثيق في المنظومات الكبرى يتجاوز تسجيل الدخول بكلمة السر. بروتوكول <code dir="ltr">OAuth 2.1</code> و <code dir="ltr">OpenID Connect (OIDC)</code> هو المعيار العالمي للتفويض والتوثيق الموحد (Single Sign-On: SSO مع Google و GitHub و Okta). فهم معمارية تدفق الـ PKCE (Proof Key for Code Exchange) وحماية الرموز المشفرة وتدوير الجلسات في Redis يضمن حماية المنظومة من أحدث ثغرات التفويض وسرقة الهويات.`,
    objectives: [
      'فهم تدفق OAuth 2.1 Authorization Code Flow مع حماية PKCE الإلزامية.',
      'التمييز بين ID Token (لإثبات الهوية) و Access Token (لصلاحيات الـ API).',
      'بناء خادم توثيق موزع يعتمد على Redis لإبطال الجلسات الفوري (Session Invalidation).'
    ],
    mechanics: [
      { step: 1, title: 'توليد الـ PKCE Code Verifier & Challenge', desc: 'إنشاء رمز سري عشوائي وتشفيره بـ SHA-256 لمنع اعتراض كود التفويض على المتصفح والموبايل.' },
      { step: 2, title: 'التحقق وإصدار الرموز (OIDC Tokens)', desc: 'الخادم يطابق الـ Verifier ويصدر ID Token (JWT) و Access Token.' },
      { step: 3, title: 'الإبطال الفوري للجلسات (Redis Blocklist)', desc: 'تسجيل الرموز المسروقة أو المنتهية في Redis لطرد المستخدم من كل الأجهزة فورياً.' }
    ],
    playgroundCode: `// PKCE Code Challenge Generation Simulator
function generatePKCE() {
  const codeVerifier = "secure_random_string_xyz123_very_long_entropy";
  const codeChallenge = btoa("sha256_hash_of_" + codeVerifier);
  console.log("1. Client Generates Code Verifier:", codeVerifier);
  console.log("2. Client Sends Code Challenge to Auth Server:", codeChallenge);
  return { codeVerifier, codeChallenge };
}
generatePKCE();`,
    experimentQuestion: 'لماذا ألغى معيار OAuth 2.1 الحديث تدفق Implicit Flow وأوجب استخدام PKCE لجميع التطبيقات؟',
    experimentAnswer: 'لأن Implicit Flow كان يعيد الـ Access Token مباشرة في عنوان الـ URL (Hash Fragment) مما يعرضه للسرقة عبر سجلات المتصفح وثغرات Referrer Headers؛ تم استبداله بـ Authorization Code + PKCE المشفر.',
    codeAnatomy: [
      { line: '1: // OpenID Connect Token Verification', note: 'التحقق من رمز الهوية' },
      { line: '2: const payload = await verifyGoogleIdToken(req.body.credential);', note: 'مطابقة توقيع جوجل الرسمي' },
      { line: '3: const user = await findOrCreateUser({ email: payload.email });', note: 'إنشاء أو جلب المستخدم' },
      { line: '4: const sessionToken = issueAppSession(user);', note: 'إصدار جلسة النظام الداخلية' }
    ],
    pitfallBad: 'استخدام Access Token للتحقق من هوية المستخدم بدلاً من ID Token في OIDC',
    pitfallGood: 'استخدام ID Token لمعرفة هوية المستخدم و Access Token للتفويض في الـ API',
    pitfallDiagnosis: 'الـ Access Token مصمم للـ Resource Server ولا يضمن هوية المستخدم للفرونت إند.',
    quizPool: [{
      q: 'What is the mandatory security enhancement in OAuth 2.1 that protects Authorization Code flows against interception attacks?',
      qAr: 'ما هو التحسين الأمني الإلزامي في OAuth 2.1 لحماية تدفق كود التفويض من هجمات الاعتراض؟',
      options: ['Client Secret', 'PKCE (Proof Key for Code Exchange)', 'Basic Auth', 'mTLS'],
      correct: 1,
      why: 'OAuth 2.1 mandates PKCE for all authorization code flows to prevent code interception.',
      whyAr: 'يفرض OAuth 2.1 استخدام PKCE لجميع التدفقات لمنع اعتراض كود التفويض.'
    }],
    interviewQ: 'كيف تنفذ ميزة "تسجيل الخروج من جميع الأجهزة" (Logout from all devices) مع رموز JWT عديمة الحالة (Stateless)?',
    interviewA: 'نضيف حقلاً في جدول المستخدم يسمى `tokenVersion` (أو `jwtTimestamp`) ونضمن قيمته داخل حمولة الـ JWT؛ عندما يطلب المستخدم تسجيل الخروج من كل الأجهزة نقوم بزيادة `tokenVersion = tokenVersion + 1` في قاعدة البيانات؛ فيرفض وسيط التوثيق أي رمز يحمل إصداراً قديماً فوراً.'
  },
  {
    slug: 'caching-redis',
    title: 'Distributed Caching with Redis: Cache-Aside, Write-Through & Invalidation Strategies',
    titleAr: 'الكاش الموزع بـ Redis: أنماط Cache-Aside والتحديث المتزامن وإبطال الكاش',
    level: 2,
    order: 5,
    estMinutes: 26,
    version: 'Redis 7.x / Node.js 24',
    pattern: 'Distributed Caching',
    problemOpening: `هناك مقولة شهيرة في علوم الحاسوب: "لا يوجد سوى شيئين صعبين في هندسة البرمجيات: إبطال الكاش وتسمية الأشياء" (Cache Invalidation and Naming Things). استخدام <code dir="ltr">Redis</code> كمخزن كاش في الذاكرة (In-Memory Data Store) يقلل زمن استجابة الـ API من 500ms إلى 2ms ويحمي قاعدة البيانات من الانهيار في أوقات الذروة. لكن تطبيق استراتيجية كاش خاطئة قد يؤدي لعرض بيانات قديمة (Stale Data) أو انهيار النظام بظاهرة <code dir="ltr">Cache Stampede</code>!`,
    objectives: [
      'فهم أنماط الكاش: Cache-Aside (Lazy Loading), Write-Through, Write-Behind.',
      'تطبيق استراتيجيات إبطال الكاش وتحديد أوقات الصلاحية (TTL: Time-To-Live).',
      'حماية الخادم من ظواهر: Cache Stampede (بـ Mutex Locking) و Cache Avalanche.'
    ],
    mechanics: [
      { step: 1, title: 'نمط Cache-Aside', desc: 'التحقق من وجود البيانات في Redis؛ إذا وُجدت (Cache Hit) تُرجع فوراً، وإذا لم توجد (Cache Miss) تُجلب من الداتابيز وتُخزن في Redis مع TTL.' },
      { step: 2, title: 'التنظيف عند التعديل (Event-Driven Invalidation)', desc: 'حذف مفتاح الكاش فور تعديل السجل لضمان عدم عرض بيانات مضللة للمستخدم.' },
      { step: 3, title: 'الـ TTL العشوائي (Jitter)', desc: 'إضافة ثوانٍ عشوائية لأوقات الـ TTL لمنع انتهاء صلاحية ملايين المفاتيح في نفس اللحظة (Cache Avalanche).' }
    ],
    playgroundCode: `// Cache-Aside Pattern Simulator
const mockRedis = new Map();
async function getCachedProduct(productId, dbFetch) {
  const cacheKey = \`product:\${productId}\`;
  if (mockRedis.has(cacheKey)) {
    console.log(\`⚡ [Redis CACHE HIT] \${cacheKey} -> Served in 0.5ms!\`);
    return mockRedis.get(cacheKey);
  }
  
  console.log(\`🐢 [Redis CACHE MISS] Fetching from DB (Cost: 150ms)...\`);
  const fresh = await dbFetch();
  mockRedis.set(cacheKey, fresh);
  return fresh;
}

await getCachedProduct("101", () => ({ id: "101", name: "Pro Laptop", price: 1200 }));
await getCachedProduct("101", () => ({})); // Instant Hit!`,
    experimentQuestion: 'ما هي مشكلة الـ Cache Stampede (Dogpiling) وكيف تحلها هندسياً؟',
    experimentAnswer: 'تحدث عندما تنتهي صلاحية مفتاح كاش عالي الزيارات (مثل الصفحة الرئيسية)، فيقوم 10,000 مستخدم في نفس الثانية بإرسال 10,000 استعلام ثقيل لقاعدة البيانات معاً مما يسقطها؛ نحلها باستخدام قفل موزع (Redis Mutex Lock) يسمح لطلب واحد فقط بإعادة بناء الكاش بينما تنتظر بقية الطلبات.',
    codeAnatomy: [
      { line: '1: const cached = await redis.get(key);', note: 'فحص الكاش' },
      { line: '2: if (cached) return JSON.parse(cached);', note: 'إرجاع فوري عند الـ Hit' },
      { line: '3: const data = await db.query(...);', note: 'الجلب من قاعدة البيانات عند الـ Miss' },
      { line: '4: await redis.set(key, JSON.stringify(data), "EX", 3600); // 1 Hour TTL', note: 'حفظ في الكاش مع وقت انتهاء' },
      { line: '5: return data;', note: 'إرجاع البيانات' }
    ],
    pitfallBad: 'تخزين البيانات في Redis بدون تحديد وقت انتهاء صلاحية (TTL) نهائياً!',
    pitfallGood: 'تحديد TTL مناسب دائماً مع إضافة Random Jitter لمنع تسريب الذاكرة',
    pitfallDiagnosis: 'عدم وضع TTL يملأ ذاكرة الـ RAM حتى ينهار سيرفر Redis ويمنع تحديث البيانات تلقائياً.',
    quizPool: [{
      q: 'Which caching strategy loads data into the cache only when requested by the application for the first time?',
      qAr: 'أي استراتيجية كاش تقوم بتحميل البيانات في الكاش فقط عند طلب التطبيق لها لأول مرة؟',
      options: ['Write-Through', 'Cache-Aside (Lazy Loading)', 'Write-Behind', 'Refresh-Ahead'],
      correct: 1,
      why: 'Cache-Aside loads data lazily upon a cache miss.',
      whyAr: 'نمط Cache-Aside يحمل البيانات عند الطلب فقط عند حدوث Cache Miss.'
    }],
    interviewQ: 'ما هي هياكل بيانات Redis المتقدمة واستخداماتها في أنظمة الإنتاج؟',
    interviewA: 'Redis ليس مجرد Key-Value نصي؛ يمتلك: 1. `Hashes`: لتخزين كائنات المستخدمين وتعديل حقول فردية بـ `HSET`. 2. `Sorted Sets (ZSET)`: للوحات الصدارة والتصنيفات والـ Rate Limiting. 3. `Bitmaps / HyperLogLog`: لحساب ملايين المستخدمين الفريدين بـ 12KB فقط. 4. `Pub/Sub & Streams`: لتبادل الرسائل الحية.'
  },
  {
    slug: 'realtime-websockets',
    title: 'Real-Time Architecture: WebSockets, Socket.io, SSE & Redis Pub/Sub Adapters',
    titleAr: 'معمارية التطبيقات الحية: الـ WebSockets وإشارات SSE وموزع Redis Pub/Sub',
    level: 2,
    order: 6,
    estMinutes: 28,
    version: 'Socket.io 4+ / Node.js 24',
    pattern: 'Real-Time Architecture',
    problemOpening: `في تطبيقات المحادثات الحية (Chat Systems)، التحديثات اللحظية للأسعار، والإشعارات، إرسال طلبات HTTP Polling متكررة كل ثانيتين يهلك السيرفر والبطارية وينقل 99% من البيانات الفارغة! بروتوكول <code dir="ltr">WebSockets</code> يفتح اتصال TCP ثنائي الاتجاه ودائم (Full-Duplex) بزمن انتقال شبه معدوم. ولكن عند توسيع السيرفر لعدة خوادم (Cluster)، يظهر التحدي الأكبر: كيف يرسل مستخدم في السيرفر A رسالة لمستخدم في السيرفر B؟ الحل هو <code dir="ltr">Redis Pub/Sub Adapter</code>.`,
    objectives: [
      'فهم الفرق الجذري بين WebSockets و Server-Sent Events (SSE) و Long Polling.',
      'بناء خادم Socket.io يدعم الغرف (Rooms) ومصادقة التوثيق عبر JWT Handshake.',
      'توسيع الـ WebSockets عبر عدة خوادم باستخدام @socket.io/redis-adapter.'
    ],
    mechanics: [
      { step: 1, title: 'مصافحة الـ HTTP Upgrade', desc: 'الاتصال يبدأ كـ HTTP عادي ثم يطلب الترقية (101 Switching Protocols) لـ WebSocket TCP Stream.' },
      { step: 2, title: 'نظام الغرف (Rooms & Namespaces)', desc: 'تجميع المتصلين في غرف خاصة (مثل chat:room:101) لبث الرسائل للمعنيين فقط.' },
      { step: 3, title: 'موزع Redis Pub/Sub', desc: 'نقل الرسائل بين خوادم Node.js المختلفة عبر قنوات Redis لضمان وصول الرسالة لكل المشتركين.' }
    ],
    playgroundCode: `// WebSocket Real-Time Broadcast & Room Simulator
class RealTimeServer {
  constructor() { this.rooms = new Map(); }
  joinRoom(socketId, roomId) {
    const room = this.rooms.get(roomId) || new Set();
    room.add(socketId);
    this.rooms.set(roomId, room);
    console.log(\`👤 Socket [\${socketId}] joined Room [\${roomId}]\`);
  }
  broadcastToRoom(roomId, message) {
    const members = this.rooms.get(roomId) || new Set();
    console.log(\`📢 Broadcasting to \${members.size} members in [\${roomId}]: "\${message}"\`);
  }
}

const srv = new RealTimeServer();
srv.joinRoom("socket_amr", "mern_live_chat");
srv.joinRoom("socket_sara", "mern_live_chat");
srv.broadcastToRoom("mern_live_chat", "Welcome to the FullStack Masterclass!");`,
    experimentQuestion: 'متى تفضل استخدام Server-Sent Events (SSE) على WebSockets في تطبيقات الإنتاج؟',
    experimentAnswer: 'نفضل SSE عندما يكون تدفق البيانات في اتجاه واحد فقط من السيرفر للعميل (One-Way Streaming مثل بث أسعار الأسهم، شاشات الـ Dashboard الحية، أو ردود الـ AI التوليدية Streaming LLM) لأنها تعمل فوق HTTP/2 القياسي وتدعم إعادة الاتصال التلقائي دون تعقيدات WebSockets.',
    codeAnatomy: [
      { line: '1: io.use((socket, next) => {', note: 'وسيط مصافحة التوثيق' },
      { line: '2:   const token = socket.handshake.auth.token;', note: 'استخراج الرمز' },
      { line: '3:   if (isValid(token)) next(); else next(new Error("Unauthorized"));', note: 'حماية الاتصال' },
      { line: '4: });', note: 'نهاية المصافحة' }
    ],
    pitfallBad: 'بث الرسائل الحية للعامة io.emit() بدلاً من حصرها في غرف الغرض io.to(roomId).emit()',
    pitfallGood: 'استخدام Rooms لتوجيه الرسائل للمشاركين المعنيين حصراً',
    pitfallDiagnosis: 'استخدام البث العام يرسل كل الرسائل الحساسة لجميع المستخدمين المتصلين بالموقع.',
    quizPool: [{
      q: 'Which technology enables seamless message distribution across multiple WebSocket server instances in a cluster?',
      qAr: 'أي تقنية تمكن توزيع الرسائل بسلاسة عبر عدة خوادم WebSocket متوازية في بيئة الـ Cluster؟',
      options: ['PostgreSQL Listen', 'Redis Pub/Sub Adapter', 'Local Memory Map', 'Cookie Parser'],
      correct: 1,
      why: 'The Redis Adapter uses Redis Pub/Sub to forward events between different server processes.',
      whyAr: 'موزع Redis Adapter يستخدم قنوات Pub/Sub لنقل الرسائل بين خوادم WebSocket المختلفة.'
    }],
    interviewQ: 'كيف تعالج انقطاع اتصال الـ WebSocket المؤقت على أجهزة الموبايل دون فقدان الرسائل المرسلة؟',
    interviewA: 'نستخدم ميزة `Connection State Recovery` في Socket.io 4+ مع تخزين الرسائل مؤقتاً في Redis Streams؛ حيث يرسل العميل آخر معرف رسالة استلمه (Offset)، فيقوم السيرفر بإعادة إرسال الرسائل التي فاتته فقط أثناء فترة الانقطاع تلقائياً بمجرد عودة الاتصال.'
  },
  {
    slug: 'message-queues',
    title: 'Asynchronous Job Processing: Message Queues (BullMQ / RabbitMQ) & Dead Letter Queues',
    titleAr: 'معالجة المهام غير المتزامنة: طوابير الرسائل (BullMQ / RabbitMQ) وطوابير الرسائل الميتة',
    level: 2,
    order: 7,
    estMinutes: 28,
    version: 'BullMQ 5+ / Redis',
    pattern: 'Async Worker Architecture',
    problemOpening: `عندما يطلب المستخدم تصدير تقرير PDF ضخم أو إرسال 10,000 إيميل، تنفيذ هذا العمل داخل معالج الـ HTTP سيجعل الرد يستغرق دقيقة كاملة ويتوقف المتصفح بخطأ Timeout! المعمارية الاحترافية تعتمد على طوابير الرسائل (Message Queues عبر BullMQ و Redis): يستقبل السيرفر الطلب، يضع مهمة في الطابور، ويرد على المستخدم فوراً بكود 202 Accepted في 10ms، بينما تقوم خوادم العمال (Background Workers) بمعالجة المهمة في الخلفية بأمان.`,
    objectives: [
      'فهم معمارية Producer-Queue-Worker وفصل المهام الثقيلة عن مسار الـ HTTP.',
      'تطبيق إعادة المحاولة مع التراجع الأسي (Exponential Backoff Retries).',
      'إدارة المهام الفاشلة نهائياً عبر طوابير الرسائل الميتة (Dead Letter Queues: DLQ).'
    ],
    mechanics: [
      { step: 1, title: 'إضافة المهمة للطابور (Producer)', desc: 'إكسبريس يضع حمولة المهمة { email, pdfData } في طابور Redis ويرد فوراً بالـ Job ID.' },
      { step: 2, title: 'معالجة المهمة بالخلفية (Worker Process)', desc: 'خيوط معالجة مستقلة تسحب المهام بالتتابع وتنفذها وتحدث نسبة التقدم (Progress: 45%).' },
      { step: 3, title: 'طابور الرسائل الميتة (DLQ)', desc: 'إذا فشلت المهمة بعد 5 محاولات، تُنقل لـ DLQ لدراستها يدوياً دون تعطيل باقي الطابور.' }
    ],
    playgroundCode: `// Message Queue Producer-Worker Flow Simulator
const jobQueue = [];
function addJob(type, payload) {
  const job = { id: \`job-\${Date.now()}\`, type, payload, attempts: 0 };
  jobQueue.push(job);
  console.log(\`📥 [Producer] Job Enqueued: \${job.id} (\${type}) -> HTTP Response: 202 Accepted (12ms)\`);
  return job.id;
}

function processWorker() {
  const job = jobQueue.shift();
  if (!job) return;
  console.log(\`⚙️ [Worker] Processing Job \${job.id} in Background...\`);
  console.log(\`✅ [Worker] Job \${job.id} Finished! Email Sent to: \${job.payload.to}\`);
}

addJob("SEND_WELCOME_EMAIL", { to: "amr@codehub.dev" });
processWorker();`,
    experimentQuestion: 'ما هي ميزة الـ Exponential Backoff عند إعادة محاولة المهام الفاشلة في طابور الرسائل؟',
    experimentAnswer: 'تقوم بمضاعفة فترة الانتظار بين المحاولات تدريجياً (مثل الانتظار 2s ثم 4s ثم 8s ثم 16s) لإعطاء الخدمة الخارجية المتعطلة فرصة للتعافي وتجنب إغراقها بطلبات فورية فاشلة.',
    codeAnatomy: [
      { line: '1: const emailQueue = new Queue("emailQueue", { connection: redisConfig });', note: 'إنشاء الطابور' },
      { line: '2: await emailQueue.add("sendReport", { userId: 101 }, {', note: 'إضافة المهمة' },
      { line: '3:   attempts: 5, backoff: { type: "exponential", delay: 2000 }', note: 'إعادة المحاولة الذكية' },
      { line: '4: });', note: 'إرسال المهمة للطابور' }
    ],
    pitfallBad: 'معالجة تحويل الفيديوهات والملفات الكبيرة داخل مسار app.post() مباشرة!',
    pitfallGood: 'إرسال المهمة لـ BullMQ والرد فوراً بـ { status: "queued", jobId }',
    pitfallDiagnosis: 'العمليات الثقيلة داخل مسارات HTTP تجمد خيط المعالجة وتسقط الخادم عند زيادة عدد الزيارات.',
    quizPool: [{
      q: 'Which architectural component holds failed messages after all configured retry attempts have been exhausted?',
      qAr: 'أي مكون معماري يحتفظ بالرسائل الفاشلة بعد استنفاد جميع محاولات إعادة التشغيل المسموح بها؟',
      options: ['Priority Queue', 'Dead Letter Queue (DLQ)', 'Circular Buffer', 'FIFO Stack'],
      correct: 1,
      why: 'A Dead Letter Queue (DLQ) isolates unprocessable messages for debugging without stopping the queue.',
      whyAr: 'طابور الرسائل الميتة (DLQ) يعزل المهام المعطوبة لتحليلها يدوياً دون إيقاف باقي النظام.'
    }],
    interviewQ: 'كيف تضمن عدم تكرار تنفيذ المهمة مرتين (Idempotency) في طوابير الرسائل؟',
    interviewA: 'نمرر معرفاً فريداً للمهمة `jobId` معتمداً على طبيعة العملية (مثل `invoice_pay_9021`)؛ يقوم BullMQ تلقائياً بتجاهل أي مهمة مكررة تحمل نفس الـ jobId، وداخل الـ Worker نقوم بفحص قاعدة البيانات أولاً للتأكد من أن الفاتورة لم يتم دفعها مسبقاً قبل خصم المبلغ.'
  },
  {
    slug: 'microservices-monolith',
    title: 'Modular Monolith vs Microservices: Domain Boundaries & Strategic DDD',
    titleAr: 'المونوليث المعياري مقابل الميكروسيرفيس: حدود النطاق وتصميم Domain-Driven Design',
    level: 3,
    order: 8,
    estMinutes: 28,
    version: 'Enterprise Architecture',
    pattern: 'System Decomposition',
    problemOpening: `أكبر كارثة في عالم هندسة البرمجيات المعاصرة هي القفز لبناء معمارية الميكروسيرفيس (Microservices) لمنتج ناشئ في مراحله الأولى! تقسيم النظام لـ 20 خدمة صغيرة بدون حدود دومين ناضجة يحول النظام إلى "Distributed Monolith" يجمع كل عيوب الميكروسيرفيس (التعقيد الشبكي، تضارب المعاملات الموزعة، وصعوبة النشر) بدون أي فائدة! البديل الهندسي الأذكى هو بناء <code dir="ltr">Modular Monolith</code> يعتمد على مبادئ الـ <code dir="ltr">Domain-Driven Design (DDD)</code>.`,
    objectives: [
      'فهم مبادئ التصميم الموجه بالنطاق (Strategic DDD: Bounded Contexts, Ubiquitous Language, Aggregates).',
      'بناء Monolith معياري مفصول النطاقات بقواعد عزل برمجية صارمة.',
      'تحديد المعايير الهندسية الحقيقية التي تبرر الانتقال لمعمارية Microservices.'
    ],
    mechanics: [
      { step: 1, title: 'تحديد سياقات النطاق (Bounded Contexts)', desc: 'فصل نطاق المستخدمين (Identity) عن نطاق المنتجات (Catalog) ونطاق الدفع (Billing).' },
      { step: 2, title: 'التواصل عبر العقود العامة (Public Module APIs)', desc: 'منع الوحدات من استيراد كود داخلي لبعضها؛ التواصل يتم فقط عبر واجهات عامة مصرح بها.' },
      { step: 3, title: 'جاهزية الاستخراج (Extraction Ready)', desc: 'عندما يتطلب نطاق معين التوسع المستقل، يتم استخراجه في Microservice في ساعات معدودة دون كسر باقي النظام.' }
    ],
    playgroundCode: `// Modular Monolith Boundary Enforcer Simulation
const Modules = {
  Billing: {
    publicApi: { getInvoice: (id) => \`Invoice #\${id} Paid\` },
    _internalDatabase: "billing_secrets_table"
  },
  Users: {
    getUserInvoices(userId) {
      // ✅ Allowed: Calling Billing via Public Contract
      const inv = Modules.Billing.publicApi.getInvoice("901");
      console.log(\`✅ Clean Modular Communication: \${inv}\`);
    }
  }
};
Modules.Users.getUserInvoices("u1");`,
    experimentQuestion: 'ما هي معضلة المعاملات الموزعة (Distributed Transactions) في معمارية Microservices وكيف يعالجها نمط Saga؟',
    experimentAnswer: 'في Microservices كل خدمة تمتلك قاعدة بيانات منفصلة ويستحيل عمل ACID Transaction عادي عبر عدة قواعد؛ يعالجها نمط Saga بتنفيذ سلسلة من المعاملات المحلية المتتابعة وإذا فشلت خطوة يتم تشغيل معاملات تعويضية (Compensating Transactions) لعكس الخطوات السابقة.',
    codeAnatomy: [
      { line: '1: src/modules/', note: 'مجلد النطاقات المعيارية' },
      { line: '2:   auth/          # سياق التوثيق والهوية', note: 'نطاق معزول' },
      { line: '3:   orders/        # سياق إدارة الطلبات', note: 'نطاق معزول' },
      { line: '4:   payments/      # سياق بوابات الدفع', note: 'نطاق معزول' }
    ],
    pitfallBad: 'بناء 15 Microservice لتطبيق يمتلك مطورين اثنين فقط و 100 مستخدم!',
    pitfallGood: 'البدء بـ Modular Monolith نظيف ومفصل، والتقسيم فقط عند الحاجة الحقيقية للتوسع',
    pitfallDiagnosis: 'التقسيم المبكر يضاعف تكلفة البنية التحتية ويعقد الصيانة دون أي مبرر تجاري أو تقني.',
    quizPool: [{
      q: 'In Domain-Driven Design (DDD), what defines the explicit logical boundary within which a domain model applies?',
      qAr: 'في تصميم DDD، ما الذي يحدد الحدود المنطقية الصريحة التي ينطبق داخلها نموذج الدومين ومصطلحاته؟',
      options: ['Subnet', 'Bounded Context', 'Repository', 'Docker Container'],
      correct: 1,
      why: 'A Bounded Context sets the logical boundary for a model, ensuring terms have unambiguous meaning.',
      whyAr: 'سياق النطاق (Bounded Context) يحدد الحدود التي تكون فيها مصطلحات الدومين واضحة ومحددة بدقة.'
    }],
    interviewQ: 'ما هو قانون كونواي (Conway\'s Law) وتأثيره على اختيار معمارية الميكروسيرفيس؟',
    interviewA: 'ينص قانون كونواي على أن "معمارية الأنظمة البرمجية تعكس بالضرورة الهيكل التنظيمي لفرق العمل بالشركة"؛ فإذا كان لديك فريق واحد صغير، فإن الميكروسيرفيس ستكون عبئاً كارثياً. بينما إذا كان لديك 10 فرق مستقلة تضم مئات المهندسين، فإن الميكروسيرفيس تتيح لكل فريق تطوير ونشر واختيار تقنيات خدمتهم باستقلالية تامة.'
  },
  {
    slug: 'api-gateway',
    title: 'API Gateway Pattern, Reverse Proxies, SSL Termination & Global Load Balancing',
    titleAr: 'نمط بوابة الـ API، الخوادم العكسية وإنهاء تشفير SSL وتوزيع الأحمال',
    level: 3,
    order: 9,
    estMinutes: 26,
    version: 'Enterprise Architecture',
    pattern: 'Edge Infrastructure',
    problemOpening: `عندما يتكون نظامك من عدة خدمات خلفية، إجبار العميل (تطبيق الفرونت إند أو الموبايل) على الاتصال بكل خدمة على حدة يسبب تعقيداً في التوثيق ومشاكل CORS وبطء في النقل الشبكي. نمط <code dir="ltr">API Gateway</code> يضع نقطة دخول مركزية موحدة (Single Entry Point) في حافة النظام تتولى توجيه المسارات، إنهاء تشفير SSL، التحقق من التوثيق، وتوزيع الأحمال (Load Balancing) عبر خوارزميات مثل Round Robin.`,
    objectives: [
      'فهم وظائف بوابة الـ API: Routing, Authentication, Rate Limiting, SSL Termination, Caching.',
      'إتقان خوارزميات توزيع الأحمال: Round Robin, Least Connections, IP Hash.',
      'تطبيق نمط Backend-For-Frontend (BFF Pattern) لتخصيص الردود للويب والموبايل.'
    ],
    mechanics: [
      { step: 1, title: 'نقطة الدخول الموحدة (Single Entry Point)', desc: 'العميل يتصل بـ api.codehub.dev فقط والبوابة توجه الطلبات للخدمات الداخلية المعنية.' },
      { step: 2, title: 'إنهاء تشفير SSL في الحافة', desc: 'فك تشفير الـ HTTPS في البوابة وتمرير الطلبات للشبكة الداخلية المعزولة بسرعة فائقة.' },
      { step: 3, title: 'توزيع الأحمال (Load Balancing)', desc: 'توزيع آلاف الطلبات بالتساوي عبر 10 خوادم متطابقة مع عزل الخوادم المعطلة تلقائياً.' }
    ],
    playgroundCode: `// Round-Robin Load Balancer Algorithm Simulator
class LoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }
  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}

const lb = new LoadBalancer(["App-Server-1 (10.0.0.1)", "App-Server-2 (10.0.0.2)", "App-Server-3 (10.0.0.3)"]);
console.log("Request 1 Routed to:", lb.getNextServer());
console.log("Request 2 Routed to:", lb.getNextServer());
console.log("Request 3 Routed to:", lb.getNextServer());
console.log("Request 4 Routed to (Wrap around):", lb.getNextServer());`,
    experimentQuestion: 'ما هو نمط Backend-For-Frontend (BFF Pattern) وما المشكلة التي يحلها؟',
    experimentAnswer: 'هو نمط يتم فيه إنشاء بوابة API مخصصة لكل نوع عميل (بوابة لتطبيق الموبايل ترجع ردوداً خفيفة مدمجة ومضغوطة، وبوابة لتطبيق الويب ترجع بيانات تفصيلية واسعة) بدلاً من بناء API عام واحد ضخم لا يلبي احتياجات أي منهما بكفاءة.',
    codeAnatomy: [
      { line: '1: # Nginx Reverse Proxy / API Gateway Routing Spec', note: 'إعدادات البوابة' },
      { line: '2: upstream backend_cluster { server 10.0.0.1; server 10.0.0.2; }', note: 'تحديد خوادم الباك إند' },
      { line: '3: location /api/v1/auth/ { proxy_pass http://auth_service:3000/; }', note: 'توجيه خدمة التوثيق' },
      { line: '4: location /api/v1/orders/ { proxy_pass http://orders_service:4000/; }', note: 'توجيه خدمة الطلبات' }
    ],
    pitfallBad: 'ربط كل خدمات الباك إند الداخلية بالإنترنت العام مباشرة دون بوابة API مركزية',
    pitfallGood: 'عزل جميع الخدمات في شبكة VPC خاصة خلف API Gateway مؤمنة بالكامل',
    pitfallDiagnosis: 'فتح الخدمات للعامة يضاعف المساحة المعرضة للهجمات ويجعل تتبع التوثيق مستحيلاً.',
    quizPool: [{
      q: 'Which load balancing algorithm distributes incoming requests sequentially across a list of available healthy servers?',
      qAr: 'أي خوارزمية لتوزيع الأحمال توزع الطلبات الواردة بالتتابع الدوري المنتظم على قائمة الخوادم المتاحة؟',
      options: ['Least Response Time', 'Round Robin', 'Random Selection', 'Consistent Hashing'],
      correct: 1,
      why: 'Round Robin distributes requests evenly and sequentially down the server list.',
      whyAr: 'خوارزمية Round Robin توزع الطلبات بالتتابع الدوري الدائري على كل الخوادم بالتساوي.'
    }],
    interviewQ: 'ما هو نمط Circuit Breaker في بوابات الـ API وفيمَ يفيد؟',
    interviewA: 'هو نمط حماية يمنع الانهيار المتسلسل للنظام (Cascading Failures)؛ عندما تتعطل خدمة داخلية وتفشل 50% من طلباتها، تفتح البوابة قاطع الدائرة (Open Circuit) وترد على المستخدم فوراً برد بديل (Fallback) دون إرسال طلبات للخدمة المتعطلة، مما يمنع تراكم الطلبات المعلقة ويعطي الخدمة وقتاً للتعافي.'
  },
  {
    slug: 'event-driven-architecture',
    title: 'Event-Driven Architecture (EDA): Event Sourcing, CQRS & The Outbox Pattern',
    titleAr: 'المعمارية الموجهة بالأحداث (EDA): تدفق الأحداث، فصل الاستعلامات ونمط الـ Outbox',
    level: 3,
    order: 10,
    estMinutes: 28,
    version: 'Enterprise EDA Spec',
    pattern: 'Asynchronous Event Systems',
    problemOpening: `كيف تبني نظاماً يقوم فيه شراء منتج بإشعار المخزن، وخصم الرصيد، وإرسال إيميل، وتحديث نقاط الولاء، وتوليد الفاتورة دون أن تنتظر كل هذه الخدمات في مسار متزامن؟ المعمارية الموجهة بالأحداث <code dir="ltr">Event-Driven Architecture</code> تعتمد على إطلاق الأحداث غير المتزامنة (<code dir="ltr">order.created</code>). ونمط <code dir="ltr">Transactional Outbox Pattern</code> يحل أصعب مشكلة: "كيف نضمن حفظ التعديل في قاعدة البيانات وإرسال الحدث إلى Message Broker معاً دون أن يفشل أحدهما؟"`,
    objectives: [
      'فهم مبادئ المعمارية الموجهة بالأحداث وفصل النظم عبر الأحداث (Event Streams).',
      'تطبيق نمط Transactional Outbox Pattern لضمان تسليم الأحداث بنسبة 100% (At-Least-Once Delivery).',
      'فهم مبادئ CQRS (Command Query Responsibility Segregation) و Event Sourcing.'
    ],
    mechanics: [
      { step: 1, title: 'نمط الـ Outbox التبادلي', desc: 'حفظ سجل الطلب والحدث في جدول outbox_events داخل نفس معاملة الـ ACID المحلية في قاعدة البيانات.' },
      { step: 2, title: 'مرحل الرسائل (Message Relay Worker)', desc: 'عامل خلفي يقرأ جدول outbox_events ويرسل الأحداث لـ Kafka / RabbitMQ ثم يعلم عليها كـ PROCESSED.' },
      { step: 3, title: 'فصل القراءة عن الكتابة (CQRS)', desc: 'قاعدة بيانات محسنة للكتابة وقواعد بيانات مفرغة مخصصة للاستعلامات السريعة (Read Models).' }
    ],
    playgroundCode: `// Transactional Outbox Pattern Execution Simulator
async function createOrderWithOutbox(db, orderData) {
  console.log("🔒 BEGIN LOCAL SQL TRANSACTION;");
  console.log("  1. INSERT INTO orders (id, total) VALUES ('ord-99', 500);");
  console.log("  2. INSERT INTO outbox_events (event_name, payload) VALUES ('order.created', '{\"orderId\":\"ord-99\"}');");
  console.log("✅ COMMIT; -- Zero Message Loss Guaranteed!");
  console.log("📡 Outbox Relay Worker will reliably forward event to Kafka broker.");
}

createOrderWithOutbox({}, {});`,
    experimentQuestion: 'ما هي مشكلة Dual Write Problem التي يحلها نمط Transactional Outbox Pattern؟',
    experimentAnswer: 'تحدث عندما يحفظ التطبيق البيانات في قاعدة البيانات ثم يحاول إرسال حدث لـ Message Broker؛ فإذا تعطلت الشبكة أو السيرفر بعد حفظ الداتابيز وقبل إرسال الرسالة، تفقد باقي الخدمات الإشعار وتصبح البيانات مشوهة؛ نمط Outbox يدمج حفظ الحدث مع البيانات في نفس معاملة الداتابيز.',
    codeAnatomy: [
      { line: '1: await prisma.$transaction(async (tx) => {', note: 'معاملة ذرية واحدة' },
      { line: '2:   const order = await tx.order.create({ data: orderData });', note: '1. حفظ السجل' },
      { line: '3:   await tx.outboxEvent.create({ data: { type: "ORDER_CREATED", payload: order } });', note: '2. حفظ الحدث في الـ Outbox' },
      { line: '4: });', note: 'تثبيت الاثنين معاً' }
    ],
    pitfallBad: 'حفظ السجل في قاعدة البيانات ثم إرسال رسالة لـ RabbitMQ خارج المعاملة الذرية',
    pitfallGood: 'استخدام نمط Transactional Outbox لضمان عدم ضياع أي حدث مهما حدث من أعطال',
    pitfallDiagnosis: 'انقطاع الاتصال بعد حفظ السجل وقبل إرسال الرسالة يسبب تضارباً صامتاً في البيانات الموزعة.',
    quizPool: [{
      q: 'Which architectural pattern separates the data model for updating information (Commands) from the model for reading information (Queries)?',
      qAr: 'أي نمط معماري يفصل نموذج تعديل البيانات (Commands) عن نموذج قراءة واستعلام البيانات (Queries)؟',
      options: ['MVC', 'CQRS (Command Query Responsibility Segregation)', 'Active Record', 'Repository Pattern'],
      correct: 1,
      why: 'CQRS separates read and write operations into different models to optimize performance and scalability.',
      whyAr: 'نمط CQRS يفصل عمليات القراءة عن عمليات الكتابة لتحقيق أقصى أداء وتوسع ممكن.'
    }],
    interviewQ: 'ما هو الفرق بين Event Sourcing ونظام تخزين الحالة التقليدي (State-Based Persistence)؟',
    interviewA: 'في التخزين التقليدي، نحتفظ بالحالة الحالية فقط للمستند (Current State) ونقوم بعمل Update واستبدال القيمة القديمة. أما في `Event Sourcing`، فإننا لا نخزن الحالة الحالية أبداً، بل نخزن سلسلة كاملة غير قابلة للتعديل من جميع الأحداث التي وقعت في النظام (مثل `AccountCreated`, `MoneyDeposited`, `MoneyWithdrawn`)، ونحسب الحالة الحالية بإعادة تشغيل هذه الأحداث من البداية (Replay).'
  },
  {
    slug: 'system-design-case-studies',
    title: 'System Design Masterclass: High-Scale URL Shortener, Chat & E-Commerce Systems',
    titleAr: 'التصميم المعماري للأنظمة الكبرى: تصميم منصة اختصار الروابط والمحادثات والمتجر الإلكتروني',
    level: 3,
    order: 11,
    estMinutes: 30,
    version: 'System Design Standard',
    pattern: 'System Design & Scalability',
    problemOpening: `في المقابلات التقنية لكبرى شركات التكنولوجيا (Senior System Design Interviews)، السؤال لا يكون عن كتابة دالة برمجية بسيطة، بل: "كيف تصمم نظاماً يخدم 500 مليون مستخدم نشط يومياً يتحمل 100,000 طلب في الثانية بزمن استجابة أقل من 20ms؟" في هذا الدرس سنشرح منهجية التصميم المعماري خطوة بخطوة من خلال 3 دراسات حالة كبرى: منصة اختصار الروابط (TinyURL)، منصة المحادثات الفورية، ومنصة سلة المشتريات والتجارة الإلكترونية.`,
    objectives: [
      'تطبيق إطار العمل القياسي لتصميم الأنظمة: Scope & Requirements, Capacity Estimation, High-Level Architecture, Deep Dives.',
      'حساب تقديرات السعة والمساحة والتخزين (Back-of-the-Envelope Calculations: QPS, Bandwidth, Storage).',
      'تصميم معمارية كاملة لمنصة اختصار روابط قابلة للتوسع باستخدام Base62 Encoding و KGS (Key Generation Service).'
    ],
    mechanics: [
      { step: 1, title: 'حساب التقديرات (Back-of-the-Envelope)', desc: 'حساب عدد الطلبات في الثانية (QPS) ومعدل القراءة للكتابة (Read-to-Write Ratio: 100:1) ومساحة التخزين السنوية.' },
      { step: 2, title: 'خدمة توليد المفاتيح (Key Generation Service - KGS)', desc: 'توليد الرموز العشوائية مسبقاً بطول 7 خانات (Base62) وحفظها في الذاكرة لتجنب تضارب التشفير اللحظي.' },
      { step: 3, title: 'معمارية الكاش متعدد الطبقات', desc: 'تخزين أكثر 20% من الروابط طلباً في Redis (قاعدة Pareto 80/20) لخدمة 99% من الزيارات من الذاكرة.' }
    ],
    playgroundCode: `// Base62 Encoding Engine for URL Shortener Simulator
const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function encodeBase62(num) {
  let encoded = "";
  let n = num;
  while (n > 0) {
    encoded = BASE62_CHARS[n % 62] + encoded;
    n = Math.floor(n / 62);
  }
  return encoded.padStart(7, "0");
}

console.log("Counter ID: 100,000,000 -> Generated 7-Char TinyURL Slug:", encodeBase62(100000000));`,
    experimentQuestion: 'كم عدد العناوين الفريدة التي يمكن تمثيلها باستخدام 7 خانات من حروف Base62 (الأرقام والحروف الكبيرة والصغيرة)؟',
    experimentAnswer: 'عدد العناوين المحتملة هو 62 أس 7 (62^7) ويساوي تقريباً 3.5 تريليون عنوان فريد (3.5 Trillion URLs)، وهو رقم كافٍ لتشغيل الخدمة لقرون دون أي تصادم.',
    codeAnatomy: [
      { line: '1: // High-Level Architecture Summary for URL Shortener', note: 'المعمارية العامة' },
      { line: '2: Client -> Cloudflare CDN -> API Gateway -> TinyURL Service -> Redis Cache (80/20 Rule) -> PostgreSQL DB', note: 'مسار التدفق' }
    ],
    pitfallBad: 'توليد الروابط القصيرة بتشفير MD5 ثم فحص قاعدة البيانات بحثاً عن تضارب (COLLSCAN بطيء مع كل طلب)',
    pitfallGood: 'استخدام KGS مسبقة التوليد أو تشفير معرفات تسلسلية فريدة بـ Base62 مباشرة O(1)',
    pitfallDiagnosis: 'البحث عن التضارب في الداتابيز مع كل رابط جديد يسبب اختناقاً كارثياً في الأداء.',
    quizPool: [{
      q: 'According to the Pareto Principle (80/20 rule) in system design caching estimation, what percentage of data generates 80% of total read traffic?',
      qAr: 'وفقاً لمبدأ باريتو (قاعدة 80/20) في تقدير سعة الكاش، ما هي نسبة البيانات التي تولد 80% من إجمالي زيارات القراءة؟',
      options: ['5%', '20%', '50%', '80%'],
      correct: 1,
      why: 'The 80/20 rule dictates that 20% of the hot data accounts for 80% of daily read requests.',
      whyAr: 'قاعدة 80/20 تفترض أن أكثر 20% من البيانات سخونة تمثل 80% من إجمالي استعلامات اليوم.'
    }],
    interviewQ: 'كيف تصمم نظام شات يدعم حالة التواجد (Online/Offline Presence Status) لملايين المستخدمين؟',
    interviewA: 'نستخدم إشارات النبض (Heartbeats) عبر اتصال WebSocket يرسلها جهاز العميل كل 5 ثوانٍ، ونحدث مفتاح المستخدم في `Redis` بـ TTL مدته 10 ثوانٍ (`SET user:online:101 true EX 10`). إذا انقطع الاتصال أو أُغلق التطبيق، ينتهي مفتاح الـ Redis تلقائياً ويتحول المستخدم إلى Offline فوراً دون الحاجة لاستعلامات ثقيلة.'
  },
  {
    slug: 'performance-tuning',
    title: 'Full-Stack Performance Tuning: V8 Heap Dumps, Profiling & Critical Path Audits',
    titleAr: 'تحسين الأداء الشامل: تحليل ذاكرة V8 Heap، فحص مسار الرسم الحرج واختناقات الشبكة',
    level: 3,
    order: 12,
    estMinutes: 26,
    version: 'Performance Standard',
    pattern: 'Performance Engineering',
    problemOpening: `تحسين الأداء مش تخمين عشوائي؛ هو علم قياس وتحليل دقيق (Measurement & Profiling). عندما تلاحظ بطء الموقع، كيف تحدد السبب الحقيقي؟ هل هو تسريب في الـ V8 Heap؟ هل هو حجب للـ Main Thread بسبب كود متزامن ثقيل؟ هل هو حجم الـ JavaScript Bundles في الواجهة؟ أم هو استعلام SQL يفتقر للفهارس؟ في هذا الدرس سنتعلم أدوات التشخيص المتقدمة وكيفية فك الاختناقات في كل طبقة من طبقات الـ Full-Stack.`,
    objectives: [
      'تشخيص تسريبات الذاكرة في Node.js باستخدام v8.writeHeapSnapshot وأدوات DevTools.',
      'تحسين مسار العرض الحرج (Critical Rendering Path) لتحقيق أسرع Web Vitals (LCP, INP, CLS).',
      'استخدام أدوات الحزم (Bundle Visualizers) لتقليص حجم كود الـ JavaScript المرسل للعميل بنسبة 60%.'
    ],
    mechanics: [
      { step: 1, title: 'تحليل الذاكرة بـ Heap Snapshots', desc: 'مقارنة الكائنات المحتجزة (Retained Objects) في الذاكرة لكشف الـ Closures والمستمعين غير المحذوفين.' },
      { step: 2, title: 'تحسين مؤشر INP (Interaction to Next Paint)', desc: 'تفكيك المهام الطويلة (Long Tasks > 50ms) في الفرونت إند عبر setTimeout و requestIdleCallback.' },
      { step: 3, title: 'الضغط والـ Tree-Shaking', desc: 'تفعيل ضغط Brotli/Gzip وحذف الأكواد الميتة وتقسيم الحزم عبر Dynamic Imports.' }
    ],
    playgroundCode: `// Node.js Performance Timeline Measurement Simulation
const { performance } = require("node:perf_hooks");

function measureOperation(name, fn) {
  const t0 = performance.now();
  fn();
  const t1 = performance.now();
  console.log(\`⏱️ Operation [\${name}] took: \${(t1 - t0).toFixed(3)}ms\`);
}

measureOperation("Array Search", () => {
  const arr = new Array(100000).fill(0).map((_, i) => i);
  arr.includes(99999);
});`,
    experimentQuestion: 'ما هو مؤشر INP (Interaction to Next Paint) الذي استبدل مؤشر FID في معايير جوجل لسرعة الويب؟',
    experimentAnswer: 'مؤشر INP يقيس زمن استجابة الصفحة لجميع تفاعلات المستخدم طوال مدة زيارته للموقع (النقرات وضغطات المفاتيح) والتأكد من عدم تجمد الواجهة، والحد المستهدف للإنتاج هو أقل من 200 ميلي ثانية.',
    codeAnatomy: [
      { line: '1: import v8 from "node:v8";', note: 'مكتبة محرك V8' },
      { line: '2: const fileName = v8.writeHeapSnapshot();', note: 'التقاط لقطة ذاكرة حية لتحليلها في Chrome DevTools' },
      { line: '3: console.log("Heap snapshot generated at:", fileName);', note: 'مسار الملف' }
    ],
    pitfallBad: 'تخمين أسباب البطء وتعديل الكود عشوائياً دون قياسات فعلية (Profiling)!',
    pitfallGood: 'استخدام أداة Profiler لتحديد السطر الدقيق المسبب للبطء بالأرقام والنسب المئوية',
    pitfallDiagnosis: 'التحسين المبكر الأعمى (Premature Optimization) يضيع الوقت ويعقد الكود دون حل المشكلة الحقيقية.',
    quizPool: [{
      q: 'Which tool built into Chrome DevTools allows inspecting Node.js V8 Heap Snapshots to find memory leaks?',
      qAr: 'أي أداة في Chrome DevTools تتيح فحص لقطات الـ Heap Snapshots لكشف تسريبات الذاكرة في Node.js؟',
      options: ['Network Panel', 'Memory Panel', 'Security Panel', 'Elements Panel'],
      correct: 1,
      why: 'The Memory Panel allows loading and comparing Heap Snapshots taken from Node.js processes.',
      whyAr: 'قسم الذاكرة (Memory Panel) يتيح تحميل ومقارنة لقطات الـ Heap لكشف الكائنات المتسربة بدقة.'
    }],
    interviewQ: 'كيف تقضي على مهام الـ Long Tasks في جافاسكربت لمنع تجمد الواجهة أثناء الحسابات الثقيلة؟',
    interviewA: 'نستخدم استراتيجية تجزئة المهام (Task Chunking / Time-Slicing)؛ نقوم بتقسيم الحلقة التكرارية الضخمة إلى مصفوفات صغيرة، وبعد كل جزء نستخدم `await new Promise(res => setTimeout(res, 0))` أو `scheduler.yield()` لإعطاء المتصفح فرصة لرسم الإطار ومعالجة نقرات المستخدم بسلاسة.'
  },
  {
    slug: 'observability-monitoring',
    title: 'Production Observability: Structured Logging (Pino), Metrics & OpenTelemetry Tracing',
    titleAr: 'المراقبة الشاملة في الإنتاج (Observability): السجلات المهيكلة بـ Pino والتتبع الموزع',
    level: 3,
    order: 13,
    estMinutes: 28,
    version: 'OpenTelemetry / Pino 9+',
    pattern: 'Production Observability',
    problemOpening: `عندما يشتكي مستخدم من أن عملية الشراء فشلت، البحث في سجلات console.log النصية المبعثرة عبر 10 خوادم هو كابوس! المراقبة الحديثة (Modern Observability) تعتمد على الركائز الثلاث (The 3 Pillars of Observability): 1. السجلات المهيكلة بصيغة JSON فائقة السرعة (<code dir="ltr">Pino Logger</code>). 2. المقاييس الرقمية (<code dir="ltr">Prometheus Metrics</code>). 3. التتبع الموزع (<code dir="ltr">OpenTelemetry Traces</code>) لتتبع مسار الطلب عبر كل الخدمات بواسطة <code dir="ltr">Trace ID</code> موحد.`,
    objectives: [
      'إتقان الركائز الثلاث للمراقبة: Logs, Metrics, Traces.',
      'تطبيق التسجيل المهيكل فائق السرعة باستخدام مكتبة Pino و correlation-id middleware.',
      'تتبع مسار الطلبات الموزعة عبر OpenTelemetry وحقن ترويسات traceparent.'
    ],
    mechanics: [
      { step: 1, title: 'السجلات المهيكلة (Structured JSON Logs)', desc: 'تسجيل كل حدث ككائن JSON يحتوي على timestamp و level و reqId و userId للبحث الفوري في Datadog أو ELK.' },
      { step: 2, title: 'معرف التتبع الموحد (Correlation / Trace ID)', desc: 'توليد UUID لكل طلب يمرر عبر كل الخدمات لتجميع كل سجلات نفس الطلب في شاشة واحدة.' },
      { step: 3, title: 'المقاييس الرقمية (Prometheus / RED Method)', desc: 'قياس: Rate (عدد الطلبات)، Errors (نسبة الأخطاء)، و Duration (زمن الاستجابة).' }
    ],
    playgroundCode: `// Structured JSON Logging & Trace ID Injection Simulator
function logStructured(level, message, context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    traceId: context.traceId || "trace-uuid-default",
    userId: context.userId,
    message,
    context
  };
  console.log(JSON.stringify(logEntry));
}

logStructured("info", "User initiated checkout", { traceId: "trace-9021-x", userId: "u-101", cartTotal: 500 });
logStructured("error", "Payment gateway timeout", { traceId: "trace-9021-x", errorCode: "GATEWAY_TIMEOUT" });`,
    experimentQuestion: 'لماذا يعتبر Pino Logger أسرع بمراحل من console.log ومكتبة Winston في بيئات الإنتاج؟',
    experimentAnswer: 'لأن Pino صُمم ليعمل بأقل تكلفة معالجة ممكنة (Low Overhead)؛ فهو يكتب كتل JSON مباشرة كـ Byte Streams غير محجوبة دون معالجة تنسيقات معقدة على خيط التنفيذ الرئيسي، ويوكل تنسيق السجلات لعمليات فرعية منفصلة (Worker Threads).',
    codeAnatomy: [
      { line: '1: import pino from "pino";', note: 'استيراد مسجل السجلات المهيكل' },
      { line: '2: const logger = pino({ level: process.env.LOG_LEVEL || "info" });', note: 'تهيئة المسجل' },
      { line: '3: logger.info({ userId: 101, action: "LOGIN" }, "User logged in successfully");', note: 'تسجيل مهيكل بصيغة JSON' }
    ],
    pitfallBad: 'استخدام console.log("User " + u + " did " + a); في خوادم الإنتاج الكبرى',
    pitfallGood: 'استخدام Pino لتسجيل كائنات JSON معقمة تحتوي على Trace ID موحد',
    pitfallDiagnosis: 'الـ console.log عملية متزامنة تحجب الـ Event Loop ونصوصها غير قابلة للفرز والبحث في أدوات المراقبة.',
    quizPool: [{
      q: 'What are the Three Pillars of Observability in modern production systems?',
      qAr: 'ما هي الركائز الثلاث الأساسية للمراقبة في أنظمة الإنتاج الحديثة؟',
      options: ['HTML, CSS, JS', 'Logs, Metrics, Traces', 'CPU, RAM, Disk', 'Frontend, Backend, Database'],
      correct: 1,
      why: 'Logs, Metrics, and Traces are the three standard pillars of system observability.',
      whyAr: 'السجلات (Logs)، المقاييس (Metrics)، والتتبع (Traces) هي الركائز الثلاث المعتمدة عالمياً.'
    }],
    interviewQ: 'ما هي منهجية RED Method في قياس ومراقبة أداء الخدمات الدقيقة (Microservices)؟',
    interviewA: 'منهجية `RED Method` تركز على 3 مقاييس أساسية لكل مسار: 1. `Rate`: عدد الطلبات في الثانية (Requests Per Second). 2. `Errors`: عدد الطلبات الفاشلة ومعدل الخطأ المئوي. 3. `Duration`: زمن الاستجابة والكمون (Latency Distribution عبر p50, p95, p99).'
  },
  {
    slug: 'ci-cd-devops',
    title: 'Production DevOps: Multi-Stage Docker Builds, GitHub Actions CI/CD & Zero-Downtime Deployments',
    titleAr: 'دليل DevOps للإنتاج: حاويات Docker متعددة المراحل، أنابيب CI/CD والنشر بدون توقف',
    level: 3,
    order: 14,
    estMinutes: 28,
    version: 'Docker / GitHub Actions',
    pattern: 'DevOps & Automation',
    problemOpening: `بناء صورة Docker لتطبيق Node.js بطريقة ساذجة ينسخ مجلد node_modules وأدوات التطوير (DevDependencies) وينتج صورة ضخمة بحجم 1.5GB مليئة بالثغرات الأمنية! المعمارية الاحترافية تعتمد على حاويات Docker متعددة المراحل (<code dir="ltr">Multi-Stage Builds</code>) لتقليص الصورة إلى 80MB فقط، وأتمتة الفحص والنشر عبر <code dir="ltr">GitHub Actions CI/CD</code> مع تطبيق استراتيجيات النشر بدون أي انقطاع (<code dir="ltr">Zero-Downtime Blue/Green Deployments</code>).`,
    objectives: [
      'كتابة ملفات Dockerfile متعددة المراحل (Multi-Stage) قائمة على صور Alpine/Distroless فائقة الصغر والأمان.',
      'بناء أنابيب CI/CD متكاملة في GitHub Actions (Lint &rarr; TypeCheck &rarr; Test &rarr; Build &rarr; Deploy).',
      'فهم استراتيجيات النشر بدون توقف: Blue/Green Deployments و Rolling Updates.'
    ],
    mechanics: [
      { step: 1, title: 'حاويات Docker متعددة المراحل (Multi-Stage)', desc: 'بناء التطبيق وتشغيل الـ TypeScript في مرحلة Builder مؤقتة ونسخ الملفات الناتجة فقط إلى صورة الإنتاج النظيفة.' },
      { step: 2, title: 'أنابيب الفحص المؤتمت (GitHub Actions CI)', desc: 'منع دمج أي Pull Request لا يجتاز الـ Linter واختبارات الوحدات بنسبة 100% تلقائياً.' },
      { step: 3, title: 'النشر بدون توقف (Blue/Green)', desc: 'تشغيل البيئة الجديدة (Green) بالكامل وفحص صحتها، ثم تحويل مسار الترافيك من Nginx فوراً دون انقطاع ثانية واحدة.' }
    ],
    playgroundCode: `// GitHub Actions CI Pipeline Status Simulator
const pipelineSteps = [
  { step: "1. Checkout Code", status: "PASS", duration: "2s" },
  { step: "2. Install Dependencies (npm ci)", status: "PASS", duration: "12s" },
  { step: "3. Run Linter (ESLint)", status: "PASS", duration: "5s" },
  { step: "4. Run Unit & Integration Tests (Jest)", status: "PASS", duration: "18s" },
  { step: "5. Multi-Stage Docker Build & Push", status: "PASS", duration: "25s" },
  { step: "6. Zero-Downtime Blue/Green Deploy", status: "SUCCESS", duration: "8s" }
];

console.table(pipelineSteps);
console.log("🚀 Production Deployment Complete with ZERO Downtime!");`,
    experimentQuestion: 'لماذا يجب تشغيل الحاوية بمستخدم غير جذري (USER node) داخل Dockerfile بدلاً من مستخدم root الافتراضي؟',
    experimentAnswer: 'لأنه إذا تم اختراق تطبيق Node.js داخل الحاوية وكان يعمل بصلاحيات root، فقد يتمكن المخترق من الهروب من الحاوية (Container Escape) والسيطرة الكاملة على السيرفر المضيف بالكامل؛ استخدام مستخدم محدود الصلاحيات يحصن النظام.',
    codeAnatomy: [
      { line: '1: # Multi-Stage Dockerfile for Production Node.js', note: 'المرحلة 1: البناء والتجميع' },
      { line: '2: FROM node:24-alpine AS builder', note: 'صورة خفيفة للبناء' },
      { line: '3: WORKDIR /app', note: 'مجلد العمل' },
      { line: '4: COPY package*.json ./ && RUN npm ci', note: 'تثبيت نظيف' },
      { line: '5: COPY . . && RUN npm run build', note: 'تجميع الكود' },
      { line: '6: # المرحلة 2: صورة الإنتاج المعزولة فائقة الصغر', note: 'مرحلة الإنتاج النهائية' },
      { line: '7: FROM node:24-alpine AS runner', note: 'صورة الإنتاج الخفيفة' },
      { line: '8: USER node', note: 'صلاحيات آمنة غير جذرية' },
      { line: '9: COPY --from=builder /app/dist ./dist', note: 'نسخ المخرجات فقط' }
    ],
    pitfallBad: 'استخدام npm install ونسخ كل الملفات بما فيها .env في صورة Docker واحدة ضخمة!',
    pitfallGood: 'استخدام Multi-Stage Builds مع .dockerignore وتشغيل الحاوية بمستخدم USER node محدود',
    pitfallDiagnosis: 'الصور الأحادية تسرب ملفات البيئة الحساسة وتنتج صوراً ضخمة بطيئة في التحميل والتشغيل.',
    quizPool: [{
      q: 'Which deployment strategy maintains two identical production environments and switches traffic instantly to achieve zero-downtime updates?',
      qAr: 'أي استراتيجية نشر تحتفظ ببيئتين إنتاجيتين متطابقتين وتحول الترافيك بينهما فورياً لتحقيق نشر بدون أي توقف؟',
      options: ['Recreate Strategy', 'Blue/Green Deployment', 'Manual FTP Upload', 'Single Server Restart'],
      correct: 1,
      why: 'Blue/Green deployments maintain two identical environments, switching live traffic instantly via the router/balancer.',
      whyAr: 'استراتيجية Blue/Green تحتفظ ببيئتين متطابقتين وتحول مسار المستخدمين فورياً دون أي انقطاع.'
    }],
    interviewQ: 'ما هو ملف .dockerignore وفيمَ تكمن خطورة نسيانه في مشاريع Node.js؟',
    interviewA: 'ملف `.dockerignore` يحدد الملفات والمجلدات التي يجب استبعادها من سياق البناء (Docker Build Context)؛ ونسيانه يؤدي لكارثتين: 1. نسخ مجلد `node_modules` المحلي الخاص بجهاز المطور (الذي قد يحتوي على ملفات ثنائية مجمعة لنظام Windows أو Mac لا تعمل على Linux الحاوية). 2. تسريب ملفات الأسرار والمتغيرات الحساسة `.env` وتاريخ الـ `.git` داخل صورة الـ Docker المنشورة.'
  }
];
