/* ============================================================
   scripts/curriculum-data/architecture-lessons.mjs
   ------------------------------------------------------------
   Comprehensive, production-grade educational datasets for
   Track 8: Architecture & System Design (All 13 Lessons).
   ============================================================ */

export const architectureLessons = [
  {
    slug: 'layered-architecture',
    title: 'N-Tier Layered Architecture: Controllers, Services, Repositories & DTOs',
    titleAr: 'المعمارية متعددة الطبقات (N-Tier): وحدات التحكم والخدمات والمستودعات والـ DTOs',
    level: 1,
    order: 2,
    estMinutes: 30,
    version: 'Enterprise Node.js',
    pattern: 'N-Tier Layered Architecture & Separation of Concerns',
    objectives: [
      'فهم حدود ومسؤوليات الطبقات الأربع الصارمة: Controller (HTTP Transport), Service (Business Logic), Repository (Data Access), DTO (Data Contract).',
      'تطبيق مبدأ المسؤولية الفردية (Single Responsibility Principle) وفصل منطق الأعمال تماماً عن كائنات الـ HTTP (req / res).',
      'بناء طبقة مستودعات البيانات (Repository Layer) لتسهيل تغيير محركات البيانات (Prisma / Mongoose / SQL) دون لمس منطق الأعمال.',
      'كتابة اختبارات الوحدات (Unit Tests) المعزولة بنسبة 100% عبر عمل Mocking لطبقة الـ Repositories.'
    ],
    problemOpening: `
      في المشاريع المبتدئة، تجد المطور يكتب كل شيء داخل دالة الموجه (Route Handler):
      يقوم بقراءة <code dir="ltr">req.body</code>، فحص المدخلات، الاتصال بقاعدة البيانات، حساب الضرائب، إرسال إيميل ترحيبي، وتنسيق رد الـ JSON في 300 سطر متداخل داخل نفس الملف (Fat Controllers)!
      هذا الكود يسمى في هندسة البرمجيات **Spaghetti Code**:
      - لو أردت كتابة Unit Test لحساب الضرائب، ستضطر لتشغيل خادم HTTP وهمي ومحاكاة طلب كامل!
      - لو طلبت الإدارة غداً إتاحة نفس الوظيفة عبر WebSocket أو عبر CLI Script أو Message Queue Worker، ستضطر لإعادة كتابة الكود من الصفر لأن منطق الأعمال محبوس داخل كائنات <code dir="ltr">req</code> و <code dir="ltr">res</code> الخاصة بـ Express!
      **المعمارية متعددة الطبقات (N-Tier Layered Architecture)** تحل هذه الفوضى بتقسيم النظام إلى 4 طبقات معزولة ذات تدفق أحادي الاتجاه:
      1. **Controller Layer**: تتحدث HTTP فقط.
      2. **Service Layer**: عقل النظام (Business Logic) النقي الخالي من أي تبعيات ويب.
      3. **Repository Layer**: وسيط التحدث مع قواعد البيانات.
      4. **DTO Layer**: عقود نقل البيانات والتحقق.
      في هذا الدرس التأسيسي لمسار هندسة النظم، هنبني تطبيقاُ معمارياً نظيفاً يعكس معايير الشركات العالمية.
    `,
    mechanics: [
      { step: '01', title: 'طبقة التحكم (Controller Layer: HTTP Only)', desc: 'تستقبل كائن req، وتفحصه عبر DTO، وتمرر البيانات النظيفة للـ Service، وتحدد كود حالة الرد res.status(201).json().' },
      { step: '02', title: 'طبقة الخدمات (Service Layer: Pure Business Logic)', desc: 'تحتوي على كل الحسابات وقواعد الأعمال والتحقق المالي؛ لا تعرف أي شيء عن Express وتعمل كدوال TypeScript نقية.' },
      { step: '03', title: 'طبقة المستودعات (Repository Layer: Data Access)', desc: 'تتولى التحدث مع Prisma أو PostgreSQL؛ وتتيح تبديل قاعدة البيانات أو استبدالها بـ Mock في الاختبارات بسهولة.' },
      { step: '04', title: 'كائنات نقل البيانات (Data Transfer Objects - DTOs)', desc: 'عقود بيانية صارمة تحدد شكل المدخلات والمخرجات وتمنع تسريب الحقول الحساسة (مثل كلمات المرور) للمستخدم.' },
      { step: '05', title: 'حقن التبعيات (Dependency Injection Pattern)', desc: 'تمرير الـ Repository إلى الـ Service عبر الـ Constructor لتسهيل عزل الطبقات وتطبيق الـ Inversion of Control.' }
    ],
    playgroundCode: `// محاكي المعمارية متعددة الطبقات (Layered Architecture Pipeline)
class UserDataRepository {
  constructor() { this.users = new Map(); }
  async findByEmail(email) { return Array.from(this.users.values()).find(u => u.email === email); }
  async create(user) { this.users.set(user.id, user); return user; }
}

class UserBusinessService {
  constructor(repo) { this.repo = repo; }
  async register(dto) {
    // 1. Business Logic Rules
    if (dto.age < 18) throw new Error("Policy Violation: Age must be >= 18");
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) throw new Error("Conflict: Email already registered");

    // 2. Data Persistence
    const newUser = { id: \`usr_\${Date.now()}\`, email: dto.email, age: dto.age, createdAt: new Date() };
    return await this.repo.create(newUser);
  }
}

class UserHttpController {
  constructor(service) { this.service = service; }
  async handlePost(req, res) {
    try {
      const user = await this.service.register(req.body);
      console.log("✅ HTTP 201 Created ->", user);
    } catch (err) {
      console.log("❌ HTTP 400 Bad Request ->", err.message);
    }
  }
}

const repo = new UserDataRepository();
const service = new UserBusinessService(repo);
const controller = new UserHttpController(service);

controller.handlePost({ body: { email: "zidan@codehub.dev", age: 25 } }, {});`,
    experimentQuestion: 'لماذا يعتبر تمرير كائني req و res إلى طبقة الـ Service خطأً معمارياً فادحاً (Architectural Smelling)?',
    experimentAnswer: 'لأن تمرير كائنات الـ HTTP يربط منطق الأعمال ببروتوكول Express حصراً (Tight Coupling). إذا أردت لاحقاً تشغيل نفس الخدمة عبر WebSocket أو داخل Background Worker أو استدعائها في Unit Test، ستضطر لاصطناع كائنات req/res وهمية! طبقة الـ Service يجب أن تستقبل وتُرجع كائنات جافاسكريبت نقية (Plain DTOs) مستقلة تماماً عن بروتوكولات النقل.',
    codeAnatomy: [
      { line: '// 1. Service Layer (Pure TypeScript)', note: 'طبقة الأعمال النقية' },
      { line: 'export class OrderService {', note: 'فئة الخدمة' },
      { line: '  constructor(private orderRepo: IOrderRepository, private paymentGateway: IPayment) {}', note: 'حقن التبعيات بالواجهات' },
      { line: '  async placeOrder(dto: CreateOrderDTO): Promise<OrderResponseDTO> {', note: 'دالة استقبال DTO النقي' },
      { line: '    const total = calculateTaxesAndDiscounts(dto.items); // Business calculation', note: 'حسابات منطق الأعمال' },
      { line: '    await this.paymentGateway.charge(dto.paymentToken, total);', note: 'الدفع المالي' },
      { line: '    return await this.orderRepo.save({ ...dto, total });', note: 'الحفظ عبر المستودع' },
      { line: '  }', note: 'نهاية دالة الأعمال' },
      { line: '}', note: 'نهاية الفئة' }
    ],
    pitfallBad: `// خطأ معماري فادح: كتابة استعلامات الداتابيز ومنطق الأعمال في دالة Controller
app.post("/users", async (req, res) => {
  if (req.body.age < 18) return res.send("too young"); // Business Logic
  const user = await prisma.user.create({ data: req.body }); // Database Logic
  await sendEmail(user.email); // Side Effects
  res.json(user); // HTTP
});`,
    pitfallGood: `// الحل المعماري القياسي: توزيع المسؤوليات على الطبقات
export class UserController {
  async register(req: Request, res: Response) {
    const user = await this.userService.register(req.body);
    return res.status(201).json({ data: user });
  }
}`,
    pitfallDiagnosis: 'حشو كل المسؤوليات في الـ Controller يمنع إعادة الاستخدام والاختبار، بينما فصل الطبقات يتيح صيانة كل جزء وتطويره بشكل مستقل.',
    quizPool: [
      {
        q: 'What is the sole responsibility of the Controller Layer in an N-Tier Architecture?',
        qAr: 'ما هي المسؤولية الحصرية لطبقة التحكم (Controller Layer) في المعمارية متعددة الطبقات؟',
        options: [
          'Handling HTTP transport protocols: parsing request headers/body, validating DTOs, invoking service methods, and returning HTTP responses with appropriate status codes.',
          'Executing database queries directly.',
          'Calculating business tax rates.',
          'Managing server hard drives.'
        ],
        correct: 0,
        why: 'Controllers act as transport gateways; they handle HTTP concerns only and delegate business processing to services.',
        whyAr: 'تعمل وحدات التحكم كبوابات لبروتوكول الويب: تستقبل الطلبات وتفحصها وتوجهها لطبقة الخدمات وترجع أكواد حالة الـ HTTP المناسبة.'
      },
      {
        q: 'Why should the Service Layer NEVER depend directly on Express "req" or "res" objects?',
        qAr: 'لماذا يجب ألا تعتمد طبقة الـ Service على كائنات Express "req" أو "res" نهائياً؟',
        options: [
          'Preserves protocol independence, allowing the exact same business logic to be executed from WebSockets, message queues, or CLI tools.',
          'Because TypeScript prohibits req objects in classes.',
          'Express req objects are encrypted.',
          'To reduce CSS file size.'
        ],
        correct: 0,
        why: 'Decoupling services from HTTP enables multi-channel reuse (queues, websockets, gRPC) and frictionless unit testing.',
        whyAr: 'فصل الخدمات عن الـ HTTP يتيح إعادة استخدام نفس منطق الأعمال مع قنوات أخرى مثل الـ WebSockets والـ Workers وتسهيل الاختبارات.'
      },
      {
        q: 'What is the primary role of the Repository Pattern in software architecture?',
        qAr: 'ما هو الدور الأساسي لنمط المستودعات (Repository Pattern) في معمارية البرمجيات؟',
        options: [
          'Encapsulates database access and query logic behind an abstract interface, decoupling business services from specific persistence engines (Prisma, TypeORM, MongoDB).',
          'Stores Git commits in the cloud.',
          'Generates frontend HTML components.',
          'Compresses image files.'
        ],
        correct: 0,
        why: 'Repositories abstract data access details, allowing underlying databases or ORMs to be swapped or mocked in tests seamlessly.',
        whyAr: 'يعزل تفاصيل التخزين وقواعد البيانات خلف واجهة مجردة مما يتيح تغيير الـ ORM أو محاكاته في الـ Unit Tests بسهولة.'
      },
      {
        q: 'What is a DTO (Data Transfer Object) in backend systems?',
        qAr: 'ما هو كائن نقل البيانات (DTO) في خوادم الباك إند؟',
        options: [
          'A strict schema/object that encapsulates data passed across system layers, preventing mass-assignment and sensitive field leaks.',
          'A database backup file format.',
          'A cryptographic hash algorithm.',
          'A hardware device.'
        ],
        correct: 0,
        why: 'DTOs define clear contracts for incoming and outgoing data, filtering out unwanted or confidential attributes across boundaries.',
        whyAr: 'هو كائن يحدد بدقة شكل البيانات المنقولة بين الطبقات ويمنع تسريب الحقول الحساسة ويحمي من ثغرات الـ Mass Assignment.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تطبق نمط Dependency Inversion Principle (DIP) وحقن التبعيات (DI) في تطبيق Node.js بدون استخدام أطر عمل ضخمة مثل NestJS؟',
    interviewA: 'نطبقه باستخدام Pure TypeScript Interfaces ومصانع الـ Containers (Pure DI / Manual Composition Root): 1. نعرف Interface مجردة: interface IUserRepository { findById(id: string): Promise<User | null>; }. 2. نجعل UserService يعتمد حصراً على الـ Interface: constructor(private userRepo: IUserRepository). 3. في ملف التكوين الجذري (composition-root.ts)، ننشئ النسخ الحقيقية: const userRepo = new PrismaUserRepository(prisma); const userService = new UserService(userRepo); const userController = new UserController(userService). هذا يوفر فصلاً كاملاً للتبعيات ويسهل استبدال PrismaUserRepository بـ MockUserRepository في الاختبارات.'
  },
  {
    slug: 'clean-architecture',
    title: 'Clean Architecture & Hexagonal (Ports and Adapters): Domain-Centric Design',
    titleAr: 'العمارة النظيفة (Clean Architecture) والمعمارية السداسية: التصميم المتمحور حول النطاق (Ports & Adapters)',
    level: 2,
    order: 4,
    estMinutes: 35,
    version: 'Domain-Centric Architecture',
    pattern: 'Hexagonal Architecture & Clean Architecture',
    objectives: [
      'فهم دوائر العمارة النظيفة الأربع (Entities, Use Cases, Interface Adapters, Frameworks/Drivers).',
      'تطبيق قاعدة الاعتمادية الصارمة (The Dependency Rule: الاعتماديات تتجه للداخل دائماً نحو Domain Core).',
      'بناء المنافذ والمحولات (Ports and Adapters): قيادة النطاق عبر Inbound Ports والتكامل مع الخدمات بـ Outbound Ports.',
      'عزل منطق الأعمال تماماً عن قواعد البيانات وأطر العمل الخارجية (Database is an Implementation Detail).'
    ],
    problemOpening: `
      في معظم المشاريع، تبدأ كتابة الكود بتصميم جداول قاعدة البيانات!
      هذا يجعل قاعدة البيانات هي المركز، ويصبح كل كود التطبيق معتمداً ومرتهناً لأطر العمل الخارجية (Framework-Centric Design).
      عندما أصدر **Uncle Bob (Robert C. Martin)** مفهوم **Clean Architecture** ومفهوم **Hexagonal Architecture (المعمارية السداسية)** لأليستير كوكبيرن، قاما بقلب الهرم بالكامل:
      - **"قاعدة البيانات هي مجرد تفصيلة تقنية هامشية (The Database is a Detail)"**!
      - **"إطار العمل Express أو Fastify هو مجرد تفصيلة خارجية (The Web Framework is a Detail)"**!
      قلب النظام الحقيقي هو **Entities** و **Use Cases** (منطق الأعمال النقي المجرد).
      تخيل أنك تستطيع تغيير قاعدة البيانات من PostgreSQL إلى MongoDB، أو تغيير واجهة الـ API من REST إلى GraphQL أو gRPC، **دون تعديل سطر واحد داخل Use Cases أو منطق الأعمال**!
      في هذا الدرس، هنتعلم إزاي نبني معمارية Ports and Adapters منيعة، وهنتعلم القواعد الصارمة لـ **The Dependency Rule**.
    `,
    mechanics: [
      { step: '01', title: 'قاعدة الاعتمادية الصارمة (The Dependency Rule)', desc: 'الأكواد في الدوائر الخارجية تعتمد على الدوائر الداخلية؛ لا يمكن للـ Domain Core أن يعرف أي شيء عن Express أو Prisma.' },
      { step: '02', title: 'طبقة الكيانات (Domain Entities)', desc: 'كائنات الأعمال الجوهرية الغنية بالقواعد والقيم (e.g. Money Value Object, User Entity) والخالية من أي مكتبات خارجية.' },
      { step: '03', title: 'حالات الاستخدام (Application Use Cases)', desc: 'أفعال النظام المحددة (مثل RegisterUserUseCase أو CheckoutCartUseCase) التي تنسق تدفق البيانات بين الكيانات والمنافذ.' },
      { step: '04', title: 'المنافذ (Ports - Interfaces)', desc: 'عقود برمجية واجهات (Interfaces) تحدد ما يحتاجه النطاق من العالم الخارجي (مثل IUserRepository, INotificationService).' },
      { step: '05', title: 'المحولات (Adapters - Implementations)', desc: 'الأكواد التقنية التي تطبق الواجهات وتتحدث مع العالم الخارجي (ExpressController, PrismaUserRepository, StripePaymentAdapter).' }
    ],
    playgroundCode: `// محاكي المعمارية السداسية (Hexagonal Ports & Adapters)
// 1. Port (Interface defined by Domain Core)
class PaymentPort {
  async processCharge(amount, currency) { throw new Error("Method must be implemented"); }
}

// 2. Use Case (Pure Domain Logic)
class ProcessSubscriptionUseCase {
  constructor(paymentAdapter) { this.paymentAdapter = paymentAdapter; }
  
  async execute(planId, price) {
    console.log(\`Core Domain: Executing subscription use-case for Plan [\${planId}]\`);
    const chargeResult = await this.paymentAdapter.processCharge(price, "USD");
    return { status: "active", subscriptionId: \`sub_\${Date.now()}\`, transactionRef: chargeResult.ref };
  }
}

// 3. Adapter (Stripe Implementation)
class StripeAdapter extends PaymentPort {
  async processCharge(amount, currency) {
    console.log(\`🔌 External Adapter: Communicating with Stripe API for $\${amount} \${currency}...\`);
    return { success: true, ref: "ch_stripe_9921" };
  }
}

const useCase = new ProcessSubscriptionUseCase(new StripeAdapter());
await useCase.execute("PRO_TIER", 99);`,
    experimentQuestion: 'كيف يمكنك التحقق من أن كود طبقة الـ Domain Entities و Use Cases لم يخترق قاعدة الاعتمادية (The Dependency Rule)؟',
    experimentAnswer: 'نفحص ملفات الـ Domain و Use Cases: يجب ألا تجد في رأس أي ملف أي جملة import تشير إلى مكتبات خارجية مثل express أو prisma أو mongoose أو axios! يجب أن تحتوي حصراً على أنواع JavaScript/TypeScript القياسية والـ Interfaces الخاصة بالنظام. إذا تمكنت من نسخ مجلد domain/use-cases بالكامل وتشغيله في تطبيق CLI أو في متصفح React دون أي خطأ استيراد، فالمعمارية نظيفة بنسبة 100%.',
    codeAnatomy: [
      { line: '// domain/use-cases/register-user.ts (Zero External Dependencies)', note: 'حالة استخدام نقية تماماً' },
      { line: 'export class RegisterUserUseCase {', note: 'فئة حالة الاستخدام' },
      { line: '  constructor(', note: 'حقن المنافذ' },
      { line: '    private userRepo: IUserRepositoryPort, // Outbound Port', note: 'منفذ المستودع' },
      { line: '    private hasher: IPasswordHasherPort // Outbound Port', note: 'منفذ التشفير' },
      { line: '  ) {}', note: 'نهاية البناء' },
      { line: '  async execute(command: RegisterUserCommand): Promise<UserEntity> {', note: 'تنفيذ الأمر' },
      { line: '    const hashedPassword = await this.hasher.hash(command.password);', note: 'تشفير عبر المنفذ' },
      { line: '    const user = new UserEntity(command.email, hashedPassword); // Business Entity', note: 'إنشاء كيان النطاق' },
      { line: '    return await this.userRepo.save(user);', note: 'الحفظ عبر المنفذ' },
      { line: '  }', note: 'نهاية التنفيذ' },
      { line: '}', note: 'نهاية الكود' }
    ],
    pitfallBad: `// خطأ كارثي: استيراد Prisma أو Express داخل Use Case أو Entity
import { PrismaClient } from "@prisma/client"; // كسر قاعدة الاعتمادية وجعل النطاق عبداً للـ ORM!`,
    pitfallGood: `// الحل المعماري النظيف: الاعتماد على Port Interface مجردة
import { IUserRepositoryPort } from "../ports/user-repository.port"; // النطاق يحدد العقد فقط`,
    pitfallDiagnosis: 'الاعتماد على المكتبات الخارجية داخل الـ Domain يربط كود الأعمال بالبنية التحتية، بينما استخدام الـ Ports يحافظ على استقلالية النظام.',
    quizPool: [
      {
        q: 'What does the Dependency Rule in Clean Architecture strictly dictate?',
        qAr: 'ما الذي تفرضه قاعدة الاعتمادية (The Dependency Rule) في العمارة النظيفة بشكل صارم؟',
        options: [
          'Source code dependencies must point ONLY inward, toward high-level business policies and domain concepts (Domain Core knows nothing about external frameworks).',
          'All classes must inherit from Express.',
          'Database tables must be created first.',
          'All files must be in the same folder.'
        ],
        correct: 0,
        why: 'The Dependency Rule guarantees that domain policies remain untouched by UI, database, framework, or transport changes.',
        whyAr: 'تفرض أن تتجه الاعتماديات للداخل فقط نحو منطق الأعمال المجرد، ولا يجوز لقلب النطاق أن يعرف أي شيء عن قواعد البيانات أو أطر الويب.'
      },
      {
        q: 'What is a "Port" in Hexagonal Architecture (Ports and Adapters)?',
        qAr: 'ما هو "المنفذ" (Port) في المعمارية السداسية؟',
        options: [
          'A language-agnostic interface/contract defined by the core domain describing required inbound or outbound interactions.',
          'A physical network socket port (e.g. 8080).',
          'A hardware USB connector.',
          'A database backup server.'
        ],
        correct: 0,
        why: 'Ports are domain interfaces that define entry/exit interaction contracts without binding to external technologies.',
        whyAr: 'المنفذ هو واجهة برمجية (Interface) يحددها قلب النطاق لوصف التفاعلات المطلوبة دون الارتباط بأي تكنولوجيا خارجية.'
      },
      {
        q: 'Why does Clean Architecture treat the Database and Web Framework as "Details"?',
        qAr: 'لماذا تعتبر العمارة النظيفة قاعدة البيانات وإطار العمل كـ "تفاصيل هامشية"؟',
        options: [
          'Because business rules exist independently of storage mechanisms or delivery channels, allowing frameworks to be replaced without rewriting business logic.',
          'Because databases are not important.',
          'Because SQL is obsolete.',
          'To reduce cloud costs to zero.'
        ],
        correct: 0,
        why: 'Decoupling mechanisms from business rules ensures core value remains resilient and adaptable as technological tools evolve.',
        whyAr: 'لأن منطق الأعمال قائم بذاته بمعزل عن وسيلة الحفظ، مما يتيح تغيير محرك البيانات أو إطار الويب دون المساس بقواعد المنظومة.'
      },
      {
        q: 'What is the role of an "Adapter" in Ports & Adapters Architecture?',
        qAr: 'ما هو دور "المحول" (Adapter) في معمارية المنافذ والمحولات؟',
        options: [
          'Implements a Port interface to translate between the outside technological world (e.g. Express HTTP request, PostgreSQL database) and the domain core format.',
          'Converts AC electrical power to DC.',
          'Formats HTML strings.',
          'Encrypts CSS stylesheets.'
        ],
        correct: 0,
        why: 'Adapters implement Port contracts, translating foreign data payloads (HTTP, DB queries) to domain-compliant structures.',
        whyAr: 'يطبق واجهات المنافذ للترجمة والتوفيق بين العالم التقني الخارجي (مثل طلبات Express أو استعلامات PostgreSQL) ونماذج النطاق.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: متى يكون تطبيق Clean Architecture قراراً هندسياً عبقرياً ومتى يكون Over-Engineering مهدراً للوقت والموارد؟',
    interviewA: 'يكون قراراً عبقرياً وإلزامياً: في الأنظمة المؤسسية الكبرى (Enterprise Applications) ذات منطق الأعمال المعقد (Complex Domain Logic)، والمشاريع طويلة الأجل التي يعمل عليها عشرات المهندسين والتي تتطلب استقراراً بنكياً واختبارات معزولة 100%. ويكون Over-Engineering ضاراً: في تطبيقات الـ CRUD البسيطة، أو مشاريع الـ MVPs والاستارتابس في مراحل التحقق الأولى، حيث تضيف كثرة الطبقات والـ Mappers والـ Interfaces تعقيداً وبطئاً في سرعة التسليم (Time-to-Market) دون فائدة حقيقية تبررها.'
  },
  {
    slug: 'auth-security-deep-dive',
    title: 'Enterprise Authentication & Security: OAuth2, OpenID Connect, Session Management & CSRF Defense',
    titleAr: 'أمان وتوثيق النظم المؤسسية: بروتوكولات OAuth2 و OIDC، إدارة الجلسات ومكافحة هجمات CSRF/XSS',
    level: 2,
    order: 6,
    estMinutes: 35,
    version: 'OAuth 2.1 & OIDC Standards',
    pattern: 'Federated Identity & Defense-in-Depth',
    objectives: [
      'فهم الفرق الجوهري بين تفويض الصلاحيات بـ OAuth 2.1 والمصادقة الموحدة بـ OpenID Connect (OIDC).',
      'تشريح مسار التفويض الآمن (Authorization Code Flow with PKCE) المعتمد عالمياً لتطبيقات الويب والموبايل.',
      'تطبيق الحماية المزدوجة ضد هجمات تزوير الطلبات عبر المواقع (CSRF Defense via Double-Submit Cookie & SameSite).',
      'بناء طبقة دفاع شاملة (Defense in Depth) تتضمن أمان الجلسات، التشفير أثناء النقل، ورؤوس CSP المشددة.'
    ],
    problemOpening: `
      في الأنظمة الحديثة، تسجيل الدخول لم يعد مجرد فحص كلمة مرور في قاعدة البيانات؛ بل أصبح يعتمد على الهوية الموحدة (Federated Identity) عبر Google و GitHub و Microsoft و Okta.
      المبرمج المبتدئ يخلط دائماً بين **التفويض (Authorization)** و **المصادقة (Authentication)**:
      - يستخدم بروتوكول **OAuth2** (المخصص لمنح التطبيقات إذناً للوصول لموارد المستخدم مثل قراءة Google Drive) ويفترضه بروتوكول مصادقة!
      - البروتوكول الحقيقي للمصادقة الموحدة هو **OpenID Connect (OIDC)** الذي يبني طبقة هوية فوق OAuth2 ويصدر رمز **ID Token** موثقاً.
      بالإضافة إلى ذلك، تأمين الجلسات في بيئات الـ Web يتطلب فهماً عميقاً لصد هجمات **CSRF (Cross-Site Request Forgery)** و **XSS**:
      لو كان تطبيقك يسمح بتنفيذ تحويل مالي عبر طلب POST، يستطيع موقع خبيث إجبار متصفح الضحية على إرسال الطلب مستغلاً الكوكيز المخزنة!
      في هذا الدرس، هنفكك دورة حياة **OAuth 2.1 with PKCE**، وهنتعلم إزاي نبني دفاعات CSRF منيعة.
    `,
    mechanics: [
      { step: '01', title: 'مسار Authorization Code Flow with PKCE', desc: 'توليد Code Verifier مشفر وتمرير Code Challenge لمنع اعتراض رموز التفويض في المتصفحات وتطبيقات الموبايل.' },
      { step: '02', title: 'طبقة الهوية بـ OpenID Connect (ID Token)', desc: 'استقبال رمز ID Token بصيغة JWT يحمل هوية المستخدم وبياناته الشخصية الموثقة (Claims) من مزود الهوية.' },
      { step: '03', title: 'مكافحة CSRF بنمط Double-Submit Cookie', desc: 'إرسال رمز CSRF مشفر في كوكيز عادية وتمريره في رأس x-csrf-token والتحقق من تطابقهما في السيرفر.' },
      { step: '04', title: 'حماية الجلسات بـ SameSite=Strict و HttpOnly', desc: 'عزل كوكيز الجلسات ومنع إرسالها في أي طلبات عابرة للمواقع مصدرها روابط خارجية.' },
      { step: '05', title: 'إدارة الجلسات متعددة الأجهزة (Multi-Device Sessions)', desc: 'تخزين جلسات المستخدم النشطة في Redis مع إمكانية "تسجيل الخروج من جميع الأجهزة الأخرى" بضغطة زر.' }
    ],
    playgroundCode: `// محاكي مسار تفويض OAuth 2.1 مع PKCE (Proof Key for Code Exchange)
import crypto from "node:crypto";

function generatePkcePair() {
  // 1. توليد Code Verifier عشوائي فائق الأمان
  const verifier = crypto.randomBytes(32).toString("base64url");
  // 2. حساب Code Challenge بتجزئة SHA-256
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
  
  console.log("PKCE Code Verifier (Kept Secret on Client):", verifier.slice(0, 16) + "...");
  console.log("PKCE Code Challenge (Sent to Auth Server):", challenge.slice(0, 16) + "...");
  return { verifier, challenge };
}

generatePkcePair();`,
    experimentQuestion: 'لماذا يعتبر استخدام Authorization Code Flow with PKCE إلزامياً في تطبيقات الـ SPA (مثل React) وتطبيقات الموبايل بدلاً من Implicit Flow القديم؟',
    experimentAnswer: 'في مسار Implicit Flow القديم، كان خادم المصادقة يعيد Access Token مباشرة في رابط المتصفح (URL Fragment)، مما يجعله مكشوفاً لسجلات التصفح وثغرات الـ XSS وتسريب الروابط. مسار PKCE يلغي إعادة الرمز في الرابط: العميل يرسل Code Challenge، وعند استلام الـ Authorization Code، يستبدله بالـ Token عبر طلب POST مشفر مع إثبات امتلاكه للـ Code Verifier السري، مما يمنع سرقة الرمز بنسبة 100%.',
    codeAnatomy: [
      { line: '// CSRF Protection Middleware via Double Submit Pattern', note: 'وسيط مكافحة هجمات CSRF' },
      { line: 'export const csrfProtection = (req, res, next) => {', note: 'الدالة الوسيطة' },
      { line: '  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next(); // Safe Methods', note: 'استثناء ميثودز القراءة' },
      { line: '  const cookieToken = req.cookies["csrf_token"];', note: 'رمز الكوكيز' },
      { line: '  const headerToken = req.headers["x-csrf-token"];', note: 'الرمز المرسل في الرؤوس' },
      { line: '  if (!cookieToken || !headerToken || cookieToken !== headerToken) {', note: 'المقارنة والتطابق' },
      { line: '    return res.status(403).json({ error: "Invalid or Missing CSRF Token" });', note: 'حظر الهجوم' },
      { line: '  }', note: 'نهاية الفحص' },
      { line: '  next();', note: 'تمرير الطلب' },
      { line: '};', note: 'نهاية الوسيط' }
    ],
    pitfallBad: `// خطأ كارثي: الاعتماد على الكوكيز للعمليات المالية بدون حماية CSRF
app.post("/transfer", (req, res) => {
  // يتيح لموقع خبيث استدراج الضحية وإرسال طلب تحويل أموال خفي مستغلاً الكوكيز التلقائية!
  executeTransfer(req.cookies.sessionId, req.body.to, req.body.amount);
});`,
    pitfallGood: `// الحل الهندسي: حماية CSRF بـ SameSite=Strict و Double Submit Token
res.cookie("sessionId", id, { sameSite: "strict", httpOnly: true, secure: true });
app.post("/transfer", csrfProtection, handleTransfer);`,
    pitfallDiagnosis: 'المتصفح يرسل الكوكيز تلقائياً مع طلبات الـ POST العابرة للمواقع ما لم تكن محمية بـ SameSite و CSRF Tokens.',
    quizPool: [
      {
        q: 'What is the fundamental difference between OAuth 2.0 and OpenID Connect (OIDC)?',
        qAr: 'ما هو الفرق الجوهري بين بروتوكول OAuth 2.0 وبروتوكول OpenID Connect (OIDC)؟',
        options: [
          'OAuth 2.0 is designed strictly for Authorization (delegated access to APIs); OIDC is an identity layer built on top of OAuth 2.0 for Authentication (user identity).',
          'OAuth is for databases; OIDC is for frontend.',
          'OIDC replaces passwords completely.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'OAuth 2.0 issues Access Tokens for permissions; OIDC extends it with ID Tokens (JWT) conveying authenticated user identity claims.',
        whyAr: 'بروتوكول OAuth 2.0 مخصص لتفويض الصلاحيات (Access Tokens)، بينما OIDC يبني طبقة هوية فوقه لإثبات ومصادقة هوية المستخدم (ID Tokens).'
      },
      {
        q: 'Why was PKCE (Proof Key for Code Exchange) introduced to the OAuth authorization flow?',
        qAr: 'لماذا تم ابتكار آلية PKCE في مسار تفويض OAuth؟',
        options: [
          'Mitigates authorization code interception attacks on public clients (SPAs and mobile apps) that cannot securely store client secrets.',
          'Encrypts user passwords.',
          'Speeds up login page loading.',
          'Translates authentication to Arabic.'
        ],
        correct: 0,
        why: 'PKCE binds the authorization code exchange to a dynamically generated cryptographic secret, protecting public clients without hardcoded secrets.',
        whyAr: 'تحمي من اعتراض رموز التفويض في التطبيقات العامة (مثل React والموبايل) التي تعجز عن تخزين مفاتيح سرية ثابتة بأمان.'
      },
      {
        q: 'How does a Cross-Site Request Forgery (CSRF) attack exploit browser cookie behavior?',
        qAr: 'كيف تستغل هجمات CSRF سلوك ملفات الكوكيز في المتصفحات؟',
        options: [
          'Tricks a victim\'s authenticated browser into executing unwanted state-changing actions on a trusted site by relying on automatic cookie inclusion.',
          'Steals the user\'s hard drive data.',
          'Intercepts internet cables.',
          'Deletes browser history.'
        ],
        correct: 0,
        why: 'Browsers historically sent ambient cookies automatically on cross-site requests, allowing malicious pages to forge requests under victim identity.',
        whyAr: 'تستدرج متصفح الضحية لإرسال طلبات خبيثة لموقع موثوق مستغلة إرفاق المتصفح للكوكيز المصادق عليها تلقائياً مع الطلب.'
      },
      {
        q: 'What is the purpose of the state parameter in OAuth 2.0 authorization requests?',
        qAr: 'ما هي وظيفة معامل state في طلبات تفويض OAuth 2.0؟',
        options: [
          'Protects against CSRF attacks in the OAuth callback flow by verifying that the response matches the original initiating client session.',
          'Stores the user\'s US state/province.',
          'Sets the database state to active.',
          'Compresses the authorization code.'
        ],
        correct: 0,
        why: 'The state parameter ensures that the redirect response returning from the authorization server originated from the same user browser session.',
        whyAr: 'يحمي من هجمات CSRF في مسار تسجيل الدخول عبر التحقق من أن الرد القادم من مزود الهوية تابع لنفس جلسة المتصفح الأصلية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم نظام مصادقة Single Sign-On (SSO) مؤسسي يدعم ملايين الموظفين عبر بروتوكول SAML 2.0 و OIDC مع تفعيل الـ Multi-Factor Authentication (MFA) الإجباري؟',
    interviewA: 'نستخدم معمارية Identity Broker (مثل Keycloak أو Auth0): 1. يقوم الـ Identity Broker بدور Service Provider (SP) يدعم مصادقة OIDC للمواقع الحديثة و SAML 2.0 للأنظمة المؤسسية القديمة عبر معايير موحدة. 2. عند تسجيل الدخول، يُوجه الموظف لـ Identity Provider (IdP مثل Okta/Azure AD) للمصادقة المركزية. 3. يفرض الـ Broker خطوة MFA إجبارية (بـ TOTP أو FIDO2 WebAuthn Hardware Keys) قبل إصدار الرموز. 4. عند نجاح المصادقة، يصدر الـ Broker رمز JWT موحد يحتوي على أدوار الموظف (Roles/Claims)، مما يوفر وصولاً موحداً لجميع خدمات الشركة مع إمكانية إلغاء صلاحيات أي موظف فورياً من نقطة تحكم مركزية واحدة.'
  },
  {
    slug: 'caching-redis',
    title: 'Enterprise Caching with Redis: Patterns (Cache-Aside, Write-Through), Invalidation & Stampede Defense',
    titleAr: 'التخزين المؤقت المتقدم بـ Redis: أنماط الكاش، استراتيجيات الإبطال ومكافحة تدافع الكاش (Cache Stampede)',
    level: 2,
    order: 8,
    estMinutes: 35,
    version: 'Redis 7.2+ Stack',
    pattern: 'Multi-Tier Caching & Distributed Stampede Defense',
    objectives: [
      'فهم ومقارنة أنماط التخزين المؤقت الكبرى: Cache-Aside (Lazy Loading), Write-Through, Write-Back, و Refresh-Ahead.',
      'حل أكبر معضلتين في هندسة البرمجيات: إبطال الكاش (Cache Invalidation) وتناسق البيانات مع قواعد البيانات.',
      'حماية الخادم من كوارث انهيار الكاش: تدافع الكاش (Cache Stampede / Thundering Herd)، اختراق الكاش (Cache Penetration)، وانهيار الكاش (Cache Avalanche).',
      'بناء أقفال موزعة فائقة السرعة بـ Redlock (Distributed Locks) لحماية الموارد المشتركة.'
    ],
    problemOpening: `
      يقول فيل كارلتون مقولته الخالدة: **"هناك أمران فقط شديدا الصعوبة في علم الحاسوب: إبطال الكاش وتسمية الأشياء (There are only two hard things in Computer Science: cache invalidation and naming things)"**!
      إضافة كاش **Redis** أمام قاعدة البيانات يمكن أن يرفع سرعة موقعك من 200ms إلى 1ms ويخفض استهلاك قاعدة البيانات بنسبة 95%.
      لكن الاستخدام الساذج للكاش يؤدي لكوارث إنتاجية شهيرة:
      1. **Cache Stampede (Thundering Herd)**: عندما تنتهي صلاحية كاش الصفحة الرئيسية للمتجر في الثانية 12:00:00، ويصل 10,000 مستخدم في نفس الجزء من الثانية، سيكتشف الجميع أن الكاش منتهٍ، وسيقوم الـ 10,000 مستخدم بإرسال استعلامات متزامنة لقاعدة البيانات في نفس اللحظة فتنهار قاعدة البيانات فوراً!
      2. **Stale Data Bugs**: مستخدم يقوم بتعديل سعره، لكن الكاش القديم يظل يبيع المنتج بالسعر الرخيص لمدة يوم كامل!
      في هذا الدرس، هنبني طبقة كاش مؤسسية بـ **Cache-Aside Pattern**، وهنتعلم إزاي نستخدم خوارزمية **Probabilistic Early Expiration (XFetch)** لحماية السيرفر من الـ Stampede.
    `,
    mechanics: [
      { step: '01', title: 'نمط التخزين عند الطلب (Cache-Aside Pattern)', desc: 'البحث في Redis أولاً (Cache Hit)؛ وإذا لم توجد، جلبها من قاعدة البيانات وحفظها في الكاش مع TTL (Cache Miss).' },
      { step: '02', title: 'مكافحة تدافع الكاش (Cache Stampede Defense)', desc: 'استخدام أقفال Redis الموزعة (Distributed Locks بـ SET NX) أو إعادة حساب الكاش مسبقاً قبل انتهائه رياضياً (XFetch).' },
      { step: '03', title: 'حماية اختراق الكاش (Cache Penetration Defense)', desc: 'تخزين القيم الفارغة null مؤقتاً أو استخدام فلاتر Bloom Filters لمنع المهاجمين من طلب معرفات وهمية تضرب الداتابيز.' },
      { step: '04', title: 'حماية انهيار الكاش (Cache Avalanche Defense)', desc: 'إضافة تباين عشوائي (Jitter: +/- 10%) إلى أوقات انتهاء الصلاحية TTL لمنع انتهاء آلاف السجلات في نفس الثانية.' },
      { step: '05', title: 'الأقفال الموزعة بـ Redis Redlock', desc: 'حجز أقفال مؤقتة ذرية بـ SET resource_key client_id NX PX 5000 لضمان معالجة مهمة واحدة في المنظومة الموزعة.' }
    ],
    playgroundCode: `// محاكي مكافحة تدافع الكاش (Cache Stampede Lock Defense)
class MockRedisCacheWithLock {
  constructor() {
    this.cache = new Map();
    this.locks = new Set();
  }

  async getOrFetch(key, ttlSec, fetchFromDbFn) {
    // 1. فحص الكاش
    if (this.cache.has(key)) {
      console.log(\`⚡ Cache Hit for [\${key}] -> Returning in 0.5ms\`);
      return this.cache.get(key);
    }

    console.log(\`⚠️ Cache Miss for [\${key}]. Acquiring Distributed Lock...\`);
    
    // 2. محاولة حجز قفل معالجة وحيد (SET key NX)
    if (this.locks.has(key)) {
      console.log(\`⏳ Lock already held by another worker. Waiting...\`);
      await new Promise(r => setTimeout(r, 100));
      return this.cache.get(key); // القراءة من الكاش بعد تحديثه
    }

    this.locks.add(key); // حجز القفل
    try {
      console.log("📦 Fetching single query from Database...");
      const dbData = await fetchFromDbFn();
      this.cache.set(key, dbData);
      return dbData;
    } finally {
      this.locks.delete(key); // تحرير القفل
      console.log("🔓 Distributed Lock released.");
    }
  }
}

const redis = new MockRedisCacheWithLock();
// محاكاة 3 طلبات متزامنة في نفس الميلي ثانية
redis.getOrFetch("top_products", 60, async () => [{ id: 1, name: "MacBook" }]);
redis.getOrFetch("top_products", 60, async () => [{ id: 1, name: "MacBook" }]);
redis.getOrFetch("top_products", 60, async () => [{ id: 1, name: "MacBook" }]);`,
    experimentQuestion: 'ما هي ثغرة Cache Penetration وكيف تحمي قاعدة بياناتك منها عندما يطلب مخترق آلاف المعرفات غير الموجودة أصلاً؟',
    experimentAnswer: 'تحدث Cache Penetration عندما يرسل مهاجم آلاف الطلبات لمعرفات عشوائية وهمية (مثل /users/random_99999). الكاش سيعيد دائماً Miss لأن المعرف غير موجود، ويذهب كل طلب مباشرة ليضرب قاعدة البيانات! للحماية: 1. نقوم بتخزين القيمة الفارغة null في الكاش بـ TTL قصير (مثل 60 ثانية) ليتم الرد بـ null من الكاش فوراً في الطلبات التالية. 2. نستخدم Bloom Filter في الذاكرة لفحص هل المعرف محتمل وجوده قبل لمس قاعدة البيانات.',
    codeAnatomy: [
      { line: '// Enterprise Cache-Aside Pattern with Jitter TTL', note: 'نمط الكاش المؤسسي' },
      { line: 'export async function getCachedData(key, fetcher, baseTtlSeconds = 300) {', note: 'دالة الكاش العامة' },
      { line: '  const cached = await redis.get(key);', note: '1. فحص Redis' },
      { line: '  if (cached) return JSON.parse(cached); // Cache Hit', note: 'استرجاع فوري' },
      { line: '  const freshData = await fetcher(); // 2. Cache Miss: Fetch DB', note: 'جلب البيانات من الداتابيز' },
      { line: '  if (freshData) {', note: 'التحقق من وجود البيانات' },
      { line: '    const jitter = Math.floor(Math.random() * 30); // +/- 30s Random Jitter', note: 'إضافة تباين زمني عشوائي' },
      { line: '    await redis.set(key, JSON.stringify(freshData), "EX", baseTtlSeconds + jitter);', note: 'حفظ مع TTL متباين' },
      { line: '  }', note: 'نهاية الحفظ' },
      { line: '  return freshData;', note: 'إرجاع البيانات' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ شائع مسبب لـ Cache Avalanche: تعيين نفس الـ TTL الثابت لجميع السجلات
await redis.set(productKey, data, "EX", 3600); // تنتهي صلاحية مليون منتج معاً بعد ساعة فتسقط الداتابيز!`,
    pitfallGood: `// الحل الهندسي: إضافة Jitter عشوائي لتباعد أوقات الانتهاء
const randomJitter = Math.floor(Math.random() * 300); // 0-5 دقائق عشوائية
await redis.set(productKey, data, "EX", 3600 + randomJitter);`,
    pitfallDiagnosis: 'انتهاء صلاحية ملايين السجلات في نفس اللحظة يسبب طوفاناً على الداتابيز، بينما الـ Jitter يوزع الحمل تدريجياً.',
    quizPool: [
      {
        q: 'What is the "Cache Stampede" (Thundering Herd) phenomenon in high-traffic web architectures?',
        qAr: 'ما هي ظاهرة "تدافع الكاش" (Cache Stampede) في المعماريات عالية الأحمال؟',
        options: [
          'When a heavily requested cached key expires, and thousands of concurrent requests simultaneously hit the database to recompute it, crashing the DB.',
          'When Redis runs out of memory and shuts down.',
          'When duplicate keys are created in Redis.',
          'A hardware failure in network switches.'
        ],
        correct: 0,
        why: 'Cache stampede occurs when key expiry causes a sudden massive wave of concurrent database queries for the same un-cached resource.',
        whyAr: 'تحدث عندما تنتهي صلاحية عنصر شديد الطلب فينهال آلاف المستخدمين باستعلامات متزامنة لقاعدة البيانات لإعادة حسابه مما يسقطها.'
      },
      {
        q: 'Why should random "Jitter" be added to cache TTLs (Time-To-Live)?',
        qAr: 'لماذا يجب إضافة تباين زمني عشوائي (Jitter) لأوقات انتهاء صلاحية الكاش (TTL)؟',
        options: [
          'Prevents Cache Avalanche by ensuring keys expire at slightly different timestamps rather than all at the exact same second.',
          'Encrypts the cache keys.',
          'Compresses Redis memory.',
          'Speeds up network cable transmission.'
        ],
        correct: 0,
        why: 'Adding randomized jitter (e.g. TTL +/- 10%) smooths out cache expiration curves, preventing sudden synchronized database storms.',
        whyAr: 'يمنع انهيار الكاش عبر جعل السجلات تنتهي في أوقات متباعدة تدريجياً بدلاً من انقضائها جميعاً في نفس الثانية.'
      },
      {
        q: 'What is the workflow of the Cache-Aside (Lazy Loading) caching pattern?',
        qAr: 'ما هو تسلسل العمل في نمط التخزين المؤقت Cache-Aside (التحميل الكسول)؟',
        options: [
          'Application reads from cache; on miss, reads from database, writes data to cache, and returns it to the client.',
          'Application writes directly to cache and never touches the database.',
          'Database updates Redis automatically every midnight.',
          'Client browser stores all backend database tables.'
        ],
        correct: 0,
        why: 'Cache-aside places application in control: reading cache first, populating on miss, and lazily loading active working sets.',
        whyAr: 'يبحث التطبيق في الكاش أولاً؛ وعند عدم وجوده يقرأ من قاعدة البيانات ويحفظ النسخة في الكاش ويرجعها للمستخدم.'
      },
      {
        q: 'What is the role of a Bloom Filter in preventing Cache Penetration attacks?',
        qAr: 'ما هو دور فلاتر بلوم (Bloom Filter) في مكافحة هجمات اختراق الكاش (Cache Penetration)؟',
        options: [
          'A space-efficient probabilistic data structure that quickly checks if a requested ID definitively DOES NOT exist before querying the DB.',
          'A filter that converts text to uppercase.',
          'A tool for editing CSS colors.',
          'A database backup mechanism.'
        ],
        correct: 0,
        why: 'Bloom filters provide fast O(1) checks that can definitively reject non-existent entity IDs, protecting the backend database from phantom keys.',
        whyAr: 'بنية بيانات احتمالية فائقة السرعة والتوفير تفحص هل المفتاح غير موجود يقيناً لمنع إرسال استعلامات لقاعدة البيانات لمعرفات وهمية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تنفذ خوارزمية XFetch (Probabilistic Early Expiration) لإعادة حساب الكاش مسبقاً في الخلفية قبل انتهاء صلاحيته لمنع الـ Cache Stampede بنسبة 100%؟',
    interviewA: 'خوارزمية XFetch تعتمد على معادلة احتمالية: delta * beta * ln(random()) > (ttl - now). نقوم بتخزين قيمة delta (زمن حساب الاستعلام بالمللي ثانية) بجانب البيانات في الكاش. مع اقتراب الـ TTL من الانتهاء، تزداد احتمالية أن يقوم أحد الطلبات العابرة بإطلاق إعادة حساب البيانات وتحديث الكاش في الخلفية بشكل استباقي (Early Background Refresh)، بحيث عندما ينتهي الـ TTL الفعلي يكون الكاش قد تم تحديثه مسبقاً، محققين 0% Cache Misses و 0% Stampede للأبد.'
  },
  {
    slug: 'realtime-websockets',
    title: 'Real-Time Architecture: WebSockets, Server-Sent Events (SSE), Socket.io & Redis Adapter Scaling',
    titleAr: 'معمارية التطبيقات الحية (Real-Time): مقارنة WebSockets و SSE وتوسيع Socket.io بـ Redis Adapter',
    level: 2,
    order: 10,
    estMinutes: 35,
    version: 'Socket.io v4.x & Native WS',
    pattern: 'Bi-directional Real-Time & Horizontal Pub/Sub Scaling',
    objectives: [
      'المقارنة المعمارية الشاملة بين: HTTP Polling، Server-Sent Events (SSE)، و WebSockets ثنائية الاتجاه.',
      'بناء خوادم محادثات حية وتنبيهات فورية تدعم الغرف (Rooms) ومصادقة JWT على مستوى الـ Handshake.',
      'توسيع خوادم الـ WebSockets أفقياً عبر عدة سيرفرات وحاويات Docker باستخدام Redis Pub/Sub Adapter.',
      'إدارة حالات انقطاع الاتصال المفاجئ وإعادة الاتصال التلقائي وتخزين الرسائل المعلقة (Offline Message Buffering).'
    ],
    problemOpening: `
      في تطبيقات المحادثات الحية (Chat Apps)، لوحات التداول المالي (Crypto Exchanges)، وألعاب الـ Multiplayer، طلبات HTTP العادية فاشلة لأنها أحادية الاتجاه: العميل فقط هو من يستطيع إرسال طلب، والخادم عاجز عن دفع بيانات للمستخدم عندما يحدث تغيير!
      المطور المبتدئ يلجأ لـ **Short Polling**: يكتب في الفرونت إند <code dir="ltr">setInterval(() => fetch('/messages'), 1000)</code>، فيرسل مليون مستخدم 60 مليون طلب HTTP في الدقيقة الواحدة مما يشل الخوادم!
      التقنيات الحية تنقسم إلى حلين معماريين:
      1. **Server-Sent Events (SSE)**: تدفق نصي أحادي الاتجاه فائق الخفة ومثالي لبث الأسعار وإشعارات الذكاء الاصطناعي (مثل ChatGPT Streaming).
      2. **WebSockets**: اتصال ثنائي الاتجاه دائم (Persistent Full-Duplex TCP Socket) يتيح للطرفين إرسال بايتات في أجزاء من الميلي ثانية وبدون رؤوس HTTP مكررة.
      لكن المعضلة المعمارية الكبرى تحدث عند التوسع: لو كان المستخدم A متصلاً بالسيرفر 1، والمستخدم B متصلاً بالسيرفر 2، كيف يرسل A رسالة إلى B؟
      الحل هو **Socket.io Redis Adapter**.
      في هذا الدرس، هنبني بنية معمارية حية موزعة قابلة للتوسع عبر آلاف السيرفرات.
    `,
    mechanics: [
      { step: '01', title: 'ترقية الاتصال (HTTP Upgrade to WebSocket)', desc: 'مصافحة بروتوكولية أولية تتحقق من مصادقة JWT ثم ترقي المقبس إلى اتصال TCP ثنائي مستمر.' },
      { step: '02', title: 'البث الأحادي الخفيف بـ Server-Sent Events (SSE)', desc: 'استخدام Content-Type: text/event-stream لبث الإشعارات والبيانات من السيرفر للعميل عبر بروتوكول HTTP القياسي.' },
      { step: '03', title: 'نظام الغرف والقنوات (Rooms & Namespaces)', desc: 'تجميع المستخدمين داخل غرف socket.join("room_101") وبث الرسائل لجميع أعضاء الغرفة بـ io.to().emit().' },
      { step: '04', title: 'التوزيع الأفقي بـ Redis Streams / PubSub Adapter', desc: 'ربط خوادم Socket.io المتعددة بمحرك Redis وسيط لتمرير الرسائل فورياً بين المستخدمين المتصلين بسيرفرات مختلفة.' },
      { step: '05', title: 'إدارة الجلسات المستمرة (Connection State Recovery)', desc: 'استرجاع الرسائل المفقودة ومزامنة الحالة تلقائياً عند انقطاع شبكة الموبايل وإعادة الاتصال السريع.' }
    ],
    playgroundCode: `// محاكي توزيع رسائل الـ WebSockets عبر Redis Pub/Sub
class MockRedisBroadcastCluster {
  constructor() {
    this.servers = new Map();
  }

  registerServer(serverId, clientsList) {
    this.servers.set(serverId, clientsList);
  }

  publishToAllServers(channel, message) {
    console.log(\`📡 Redis PUBLISH on channel [\${channel}]: "\${message}"\`);
    for (const [serverId, clients] of this.servers.entries()) {
      console.log(\`   -> Relaying message to \${clients.length} clients connected on Server [\${serverId}]\`);
    }
  }
}

const cluster = new MockRedisBroadcastCluster();
cluster.registerServer("Server_US_East", ["User_Sarah", "User_Amr"]);
cluster.registerServer("Server_EU_Central", ["User_Karim", "User_Elena"]);

// مستخدم في سيرفر أمريكا يرسل رسالة لغرفة عامة
cluster.publishToAllServers("chat_room_general", "Hello distributed world!");`,
    experimentQuestion: 'متى يجب أن تختار Server-Sent Events (SSE) بدلاً من WebSockets كقرار هندسي أفضل وأبسط؟',
    experimentAnswer: 'نختار SSE عندما يكون تدفق البيانات أحادي الاتجاه فقط من الخادم إلى العميل (مثل: بث أسعار العملات، إشعارات التنبيهات، أو تدفق إجابات الذكاء الاصطناعي LLM Token Streaming). يتميز SSE بأنه يعمل مباشرة عبر بروتوكول HTTP/2 القياسي، ويدعم إعادة الاتصال التلقائي المدمج في المتصفح، ولا يتطلب مصافحة WebSocket معقدة، ويعمل بسلاسة عبر جميع جدران الحماية والـ Firewalls والـ Proxies.',
    codeAnatomy: [
      { line: '// Enterprise Socket.io Setup with Redis Adapter', note: 'تهيئة الخادم الموزع' },
      { line: 'import { Server } from "socket.io";', note: 'استيراد مكتبة Socket.io' },
      { line: 'import { createAdapter } from "@socket.io/redis-adapter";', note: 'محول Redis الموزع' },
      { line: 'import { createClient } from "redis";', note: 'عميل Redis' },
      { line: 'const pubClient = createClient({ url: process.env.REDIS_URL });', note: 'عميل النشر' },
      { line: 'const subClient = pubClient.duplicate();', note: 'عميل الاشتراك' },
      { line: 'await Promise.all([pubClient.connect(), subClient.connect()]);', note: 'بدء الاتصال بـ Redis' },
      { line: 'const io = new Server(httpServer, {', note: 'إنشاء خادم الـ Socket' },
      { line: '  adapter: createAdapter(pubClient, subClient) // تمكين البث الموزع عبر كل السيرفرات', note: 'تفعيل المحول الموزع' },
      { line: '});', note: 'نهاية التهيئة' }
    ],
    pitfallBad: `// خطأ كارثي: تشغيل Socket.io على عدة سيرفرات بدون Redis Adapter وبدون Sticky Sessions
// المستخدم يرسل رسالة للسيرفر 1 فلا تصل لصديقه المتصل بالسيرفر 2!`,
    pitfallGood: `// الحل الهندسي: تفعيل Redis Adapter مع Load Balancer يدعم WebSockets
io.adapter(createAdapter(pubClient, subClient));`,
    pitfallDiagnosis: 'الخوادم المتعددة تعزل اتصالات الـ WebSockets محلياً، ودمج Redis Adapter يوفر قناة اتصال موحدة لكافة السيرفرات.',
    quizPool: [
      {
        q: 'What is the primary architectural difference between Server-Sent Events (SSE) and WebSockets?',
        qAr: 'ما هو الفرق المعماري الأساسي بين Server-Sent Events (SSE) و WebSockets؟',
        options: [
          'SSE is unidirectional (server-to-client only) running over standard HTTP; WebSockets are bidirectional (full-duplex) over a persistent TCP connection.',
          'SSE only works on Linux.',
          'WebSockets cannot send JSON.',
          'There is no difference.'
        ],
        correct: 0,
        why: 'SSE provides lightweight unidirectional streaming over standard HTTP; WebSockets provide full-duplex two-way communication over raw TCP.',
        whyAr: 'الـ SSE هو بث أحادي الاتجاه من السيرفر للمتصفح عبر HTTP القياسي، بينما WebSockets هو اتصال ثنائي الاتجاه دائم ومستمر.'
      },
      {
        q: 'Why is a Redis Pub/Sub Adapter required when scaling Socket.io horizontally across multiple server instances?',
        qAr: 'لماذا يعتبر محول Redis Pub/Sub Adapter مطلوباً عند توسيع Socket.io أفقياً عبر عدة سيرفرات؟',
        options: [
          'Broadcasts room events between all distinct Node.js server processes, ensuring clients connected to Server A receive messages from Server B.',
          'Compresses video streams.',
          'Stores chat messages permanently on hard drives.',
          'Translates languages in real-time.'
        ],
        correct: 0,
        why: 'The Redis adapter bridges isolated server instances, relaying emitted events across the cluster so cross-server clients receive messages.',
        whyAr: 'ينقل الرسائل بين خوادم Node.js المختلفة لضمان وصول الرسالة للعميل حتى لو كان متصلاً بسيرفر مختلف عن المرسل.'
      },
      {
        q: 'How should authentication be securely performed when establishing a WebSocket connection?',
        qAr: 'كيف يجب تنفيذ المصادقة بأمان عند إنشاء اتصال WebSocket؟',
        options: [
          'Validate JWT tokens or session cookies during the initial HTTP Upgrade Handshake middleware (e.g. io.use((socket, next) => ...)).',
          'Ask for the password in every chat message.',
          'WebSockets do not need authentication.',
          'By checking the client IP address only.'
        ],
        correct: 0,
        why: 'Authenticating during handshake middleware rejects unauthorized connection attempts before upgrading to a persistent WebSocket.',
        whyAr: 'فحص الـ JWT أثناء مصافحة الـ Handshake الأولى يمنع فتح الاتصال أصلاً للمستخدمين غير المصرح لهم ويوفر الموارد.'
      },
      {
        q: 'What is "Connection State Recovery" in modern Socket.io v4?',
        qAr: 'ما هي ميزة "Connection State Recovery" في Socket.io v4 الحديثة؟',
        options: [
          'Automatically restores room memberships and streams missed buffered messages when a client temporarily disconnects and reconnects.',
          'Reboots the client computer.',
          'Restores deleted database tables.',
          'Encrypts old messages.'
        ],
        correct: 0,
        why: 'State recovery buffers missed events and restores session state during brief mobile network drops without full application refreshes.',
        whyAr: 'تستعيد اشتراكات الغرف وتبث الرسائل المعلقة التي فاتت المستخدم أثناء انقطاع شبكة الموبايل المؤقت فور عودة الاتصال.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة الـ "Sticky Sessions" (Session Affinity) في الـ Load Balancer عندما يستخدم Socket.io بروتوكول HTTP Long-Polling المبدئي قبل الترقية لـ WebSocket؟',
    interviewA: 'أثناء مرحلة الـ HTTP Long-Polling الأولية، يرسل العميل طلبات HTTP متتالية لإتمام المصافحة. إذا قام الـ Load Balancer بتوجيه الطلب 1 إلى السيرفر A والطلب 2 إلى السيرفر B، ستفشل المصافحة فوراً بخطأ Session ID Unknown! لحلها معمارياً: 1. نقوم بتفعيل Sticky Sessions على مستوى الـ Load Balancer (بواسطة Cookie تسمى مثلاً SERVERID) لضمان توجيه نفس العميل لنفس السيرفر طوال مرحلة المصافحة. 2. أو نقوم بإجبار العميل على الاتصال بـ WebSocket مباشرة من أول لحظة بتعطيل الـ Polling: transports: ["websocket"] لتجاوز مشكلة الـ Sticky Sessions بالكامل.'
  },
  {
    slug: 'message-queues',
    title: 'Asynchronous Processing & Message Queues: BullMQ, Redis, RabbitMQ & Dead Letter Queues (DLQ)',
    titleAr: 'المعالجة اللاتزامنية وطوابير الرسائل: BullMQ، وسيط RabbitMQ وطوابير الرسائل الميتة (DLQ)',
    level: 2,
    order: 12,
    estMinutes: 35,
    version: 'BullMQ v5 / RabbitMQ AMQP',
    pattern: 'Decoupled Worker Architecture & Guaranteed Delivery',
    objectives: [
      'فهم الفرق بين الاتصال التزامني المتزامن (Synchronous REST APIs) والمعالجة اللاتزامنية غير المحجوبة (Asynchronous Message Queues).',
      'بناء طوابير مهام خلفية قوية (Background Job Queues) باستخدام BullMQ و Redis Streams.',
      'تطبيق استراتيجيات إعادة المحاولة التلقائية ذات التراجع الأسي (Exponential Backoff Retries).',
      'إدارة المهام الفاشلة نهائياً وعزلها في طابور الرسائل الميتة (Dead Letter Queue - DLQ) للتحقيق اليدوي.'
    ],
    problemOpening: `
      عندما يضغط المستخدم على زر "تصدير تقرير المبيعات السنوي (PDF)"، أو زر "إرسال إيميل التفعيل لـ 5000 موظف"، تستغرق هذه العملية 45 ثانية من المعالجة الثقيلة.
      لو قمت بتنفيذ هذه المهمة داخل نفس مسار الـ HTTP:
      <code dir="ltr">app.post('/export', async (req, res) => { await generateHeavyPdf(); res.send('done'); })</code>
      فإن متصفح المستخدم سيتجمد لمدة 45 ثانية حتى تنتهي مهلة الاتصال (504 Gateway Timeout)، وخلال هذه الفترة سيتعطل خادم Node.js عن خدمة المستخدمين الآخرين!
      الحل المعماري القياسي هو **طوابير الرسائل والمعالجة غير المتزامنة (Message Queues & Background Workers)**:
      1. مسار الـ HTTP يستقبل الطلب، ويضع رسالة خفيفة في طابور **BullMQ / RabbitMQ** في 2ms، ويرد فوراً للمستخدم: <code dir="ltr">202 Accepted { jobId: "job_9921", status: "processing" }</code>.
      2. خوادم عمال خلفية مخصصة (**Worker Pool**) تسحب المهام من الطابور وتعالج ملف الـ PDF بهدوء في الخلفية، وعند الانتهاء ترسل إشعاراً للمستخدم!
      في هذا الدرس، هنبني بنية طوابير مهام مؤسسية تدعم **Exponential Backoff Retries** وعزل الأخطاء في **Dead Letter Queues (DLQ)**.
    `,
    mechanics: [
      { step: '01', title: 'فصل المهام عبر نمط Producer / Consumer', desc: 'خادم الـ API يعمل كـ Producer يضيف المهام للطابور بسرعة، وخوادم الـ Workers تعمل كـ Consumers تعالج المهام في الخلفية.' },
      { step: '02', title: 'إعادة المحاولة بالتراجع الأسي (Exponential Backoff)', desc: 'إعادة محاولة المهمة الفاشلة بعد 2s ثم 4s ثم 8s ثم 16s لمنع إغراق السيرفرات الخارجية المتوقفة مؤقتاً.' },
      { step: '03', title: 'عزل الفشل في طوابير الرسائل الميتة (Dead Letter Queue - DLQ)', desc: 'عند استنفاد كل محاولات الإعادة (e.g. 5 attempts)، تُنقل المهمة إلى DLQ مخصص للتحقيق اليدوي دون ضياع البيانات.' },
      { step: '04', title: 'التحكم في معدل المعالجة (Rate-Limited Workers)', desc: 'تحديد سقف معالجة المهام (e.g. max 100 emails/minute) للامتثال لحدود الـ APIs الخارجية مثل SendGrid أو Stripe.' },
      { step: '05', title: 'ضمانات التسليم ومعالجة التكرار (Idempotent Consumers)', desc: 'ضمان أن تنفيذ المهمة مرتين بالخطأ لا يؤدي لتكرار خصم الأموال عبر التحقق من الـ Idempotency Key.' }
    ],
    playgroundCode: `// محاكي طابور المهام اللاتزامني مع Exponential Backoff و DLQ
class MockJobQueue {
  constructor() { this.queue = []; this.dlq = []; }
  
  add(jobName, data, maxAttempts = 3) {
    const job = { id: \`job_\${Date.now()}\`, name: jobName, data, attempts: 0, maxAttempts };
    this.queue.push(job);
    console.log(\`📥 Job Added to Queue: [\${job.name}] (ID: \${job.id})\`);
    this.processNext();
  }

  async processNext() {
    if (this.queue.length === 0) return;
    const job = this.queue.shift();
    job.attempts++;
    
    try {
      console.log(\`⚙️ Worker Processing Job [\${job.name}] (Attempt \${job.attempts}/\${job.maxAttempts})...\`);
      if (job.data.fail) throw new Error("External Payment Gateway Timeout");
      console.log(\`✅ Job [\${job.name}] Completed Successfully!\`);
    } catch (err) {
      console.warn(\`⚠️ Job Failed: \${err.message}\`);
      if (job.attempts < job.maxAttempts) {
        const backoffMs = Math.pow(2, job.attempts) * 100;
        console.log(\`⏳ Scheduling retry in \${backoffMs}ms (Exponential Backoff)...\`);
        setTimeout(() => { this.queue.push(job); this.processNext(); }, backoffMs);
      } else {
        console.error(\`🚨 EXHAUSTED RETRIES: Moving Job [\${job.id}] to Dead Letter Queue (DLQ)!\`);
        this.dlq.push(job);
      }
    }
  }
}

const queue = new MockJobQueue();
queue.add("GENERATE_INVOICE_PDF", { invoiceId: "INV-99", fail: true }, 3);`,
    experimentQuestion: 'ما هي مشكلة الـ Idempotency في معالجة رسائل الطوابير وكيف تضمن ألا يُخصم المبلغ مرتين إذا تم استهلاك الرسالة مرتين؟',
    experimentAnswer: 'في أنظمة الطوابير الموزعة، تضمن معظم الأنظمة تسليم الرسائل وفق مبدأ At-least-once Delivery: أي أن الرسالة قد تصل مرتين في حالات انقطاع الشبكة النادرة. لضمان الـ Idempotency: يقوم الـ Consumer بفحص معرف فريد (Idempotency Key / Transaction ID) في قاعدة البيانات أو Redis قبل تنفيذ الخصم. إذا وجد أن المعاملة نُفذت مسبقاً، يتجاهل معالجة الرسالة فوراً ويعتبرها ناجحة، مانعاً تكرار العمليات المالية.',
    codeAnatomy: [
      { line: '// Enterprise BullMQ Producer & Worker Architecture', note: 'هندسة طوابير BullMQ' },
      { line: 'import { Queue, Worker } from "bullmq";', note: 'استيراد BullMQ' },
      { line: 'export const emailQueue = new Queue("email-queue", { connection: redisConfig });', note: 'إنشاء الطابور' },
      { line: '// 1. Producer: Fast HTTP Handshake', note: 'المسار السريع' },
      { line: 'await emailQueue.add("send-welcome", { email: "user@codehub.dev" }, {', note: 'إضافة المهمة' },
      { line: '  attempts: 4,', note: 'عدد المحاولات' },
      { line: '  backoff: { type: "exponential", delay: 2000 } // 2s -> 4s -> 8s -> 16s', note: 'تراجع أسي' },
      { line: '});', note: 'نهاية الإضافة' },
      { line: '// 2. Consumer: Isolated Background Worker', note: 'خادم المعالجة المعزول' },
      { line: 'const worker = new Worker("email-queue", async (job) => {', note: 'إنشاء الـ Worker' },
      { line: '  await sendMailProvider(job.data.email); // Heavy task executed in background', note: 'المعالجة الثقيلة' },
      { line: '}, { connection: redisConfig, concurrency: 10 });', note: 'معالجة 10 مهام بالتوازي' }
    ],
    pitfallBad: `// خطأ كارثي: تنفيذ مهام تقارير PDF وإرسال إيميلات جماعية داخل كود المسار التزامني
app.post("/export-data", async (req, res) => {
  await generate500PagesPdf(); // يجمد الخادم 40 ثانية ويسبب 504 Gateway Timeout للمستخدم!
  res.send("Done");
});`,
    pitfallGood: `// الحل المعماري القياسي: إرسال 202 Accepted وتفويض المهمة للـ Queue
app.post("/export-data", async (req, res) => {
  const job = await exportQueue.add("pdf-export", { userId: req.user.id });
  return res.status(202).json({ message: "Export queued", jobId: job.id });
});`,
    pitfallDiagnosis: 'المهام الثقيلة في مسار الـ HTTP تعرض الخادم للتعليق والـ Timeouts، بينما طوابير المهام تفوض العمليات لخوادم خلفية معزولة.',
    quizPool: [
      {
        q: 'What is the primary function of a Dead Letter Queue (DLQ) in message-driven systems?',
        qAr: 'ما هي الوظيفة الأساسية لطابور الرسائل الميتة (Dead Letter Queue - DLQ)؟',
        options: [
          'Isolates and stores poison messages that repeatedly failed processing after exhausting maximum retry attempts for debugging and alerting.',
          'Deletes unread emails.',
          'Reboots failed worker servers.',
          'Encrypts expired passwords.'
        ],
        correct: 0,
        why: 'DLQs capture persistently failing poison messages, preventing un-processable jobs from blocking active queues indefinitely.',
        whyAr: 'يعزل ويخزن الرسائل الفاسدة التي استنفدت جميع محاولات الإعادة لتحليلها وتنبيه المهندسين دون تعطيل الطابور الرئيسي.'
      },
      {
        q: 'What HTTP status code should a REST API return when a long-running background task is queued asynchronously?',
        qAr: 'ما هو كود حالة HTTP القياسي الذي يجب إرجاعه عند قبول مهمة طويلة وتشغيلها لاتزامprocessياً في الطابور؟',
        options: ['202 Accepted', '200 OK', '204 No Content', '302 Found'],
        correct: 0,
        why: 'HTTP 202 Accepted signifies that the request has been accepted for processing, but processing has not been completed.',
        whyAr: 'كود 202 Accepted يشير رسمياً إلى أن الطلب تم قبوله ووضعه في قائمة المعالجة ولكن التنفيذ لم يكتمل بعد.'
      },
      {
        q: 'Why is Exponential Backoff preferred over immediate retries for failed network jobs?',
        qAr: 'لماذا يفضل التراجع الأسي (Exponential Backoff) على الإعادة الفورية للمهام الشبكية الفاشلة؟',
        options: [
          'Progressively spaces out retry intervals, allowing downstream failing services time to recover without causing a cascading self-inflicted DDoS.',
          'Makes the database faster.',
          'Reduces email file sizes.',
          'To satisfy CSS standards.'
        ],
        correct: 0,
        why: 'Exponential backoff prevents thundering retry waves from hammering recovering external systems during partial outages.',
        whyAr: 'يوسع الفواصل الزمنية بين المحاولات تدريجياً ليمنح الخدمات الخارجية المتعثرة وقتاً للتعافي وتجنب إغراقها بالطلبات.'
      },
      {
        q: 'What does "Idempotency" mean for a background job consumer?',
        qAr: 'ماذا يعني مفهوم "الـ Idempotency" لخادم معالجة المهام (Consumer)؟',
        options: [
          'Executing the same job multiple times yields the exact same side-effect as executing it once, preventing duplicate billing or operations.',
          'The job runs in 0 milliseconds.',
          'The job can only be executed on Mondays.',
          'The worker uses 100% CPU.'
        ],
        correct: 0,
        why: 'Idempotency guarantees safe retries, ensuring duplicate message deliveries do not create duplicate real-world effects.',
        whyAr: 'يضمن أن تنفيذ نفس المهمة عدة مرات يعطي نفس النتيجة تماماً كأنها نُفذت لمرة واحدة مانعاً تكرار العمليات والخصم المالي.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم نظام معالجة أولويات (Priority Job Queue) يضمن معالجة مهام عملاء الـ VIP فوراً في أجزاء من الثانية بينما تنتظر مهام المستخدمين المجانيين في الطابور العادي؟',
    interviewA: 'نطبق معمارية Multi-Queue Priority Dispatching: 1. ننشئ طابورين منفصلين: vip-queue و default-queue (أو نستخدم خاصية priority في BullMQ مع أوزان رقمية). 2. نخصص أسطول الـ Workers: نخصص 70% من خيوط المعالجة لمراقبة vip-queue أولاً، و 30% لـ default-queue. 3. عند إضافة مهمة عميل VIP، توضع في رأس الطابور الفوري (Priority 1) ليتم التقاطها بواسطة Worker متاح في 1ms، مما يضمن SLAs فائقة للعملاء التجاريين دون حظر المهام العادية.'
  },
  {
    slug: 'microservices-monolith',
    title: 'Monolith vs Microservices: Modular Monoliths, Distributed Systems & Decomposition Strategies',
    titleAr: 'المونوليث مقابل المايكروسيرفس: المونوليث المعياري (Modular Monolith) واستراتيجيات التفكيك',
    level: 3,
    order: 13,
    estMinutes: 35,
    version: 'Distributed System Architecture',
    pattern: 'System Evolution & Service Decomposition',
    objectives: [
      'المقارنة المعمارية الموضوعية بين Monolith، Modular Monolith، و Microservices والتكلفة الحقيقية للنظم الموزعة.',
      'تطبيق نمط المونوليث المعياري (Modular Monolith) كخيار ذهبي يجمع بين سرعة التطوير ونظافة الحدود المعمارية.',
      'إتقان استراتيجيات تفكيك المونوليث التدريجية: نمط Strangler Fig Pattern وخنق المونوليث بدون مخاطر.',
      'إدارة معضلات النظم الموزعة: نظرية CAP Theorem، الاتساق النهائي (Eventual Consistency)، ونمط Saga Pattern.'
    ],
    problemOpening: `
      في السنوات الأخيرة، سارعت الكثير من الشركات الناشئة لتقسيم تطبيقاتها إلى 30 خدمة مايكروسيرفس (Microservices) منذ اليوم الأول للمشروع!
      النتيجة كانت كارثة تقنية:
      تحول الفريق من تطوير ميزات المنتج إلى قضاء 80% من وقتهم في حل مشاكل الشبكات الموزعة، تعقب الـ Distributed Tracing، إدارة الـ Kubernetes Clusters، وتتبع أخطاء الـ Network Latency والتناسق المنقسم (Distributed State Inconsistency)!
      المعماريون الكبار يتبعون الحكمة الشهيرة لمارتن فاولر: **"MonolithFirst"**!
      البديل المعماري الأقوى والأكثر اعتماداً اليوم هو **المونوليث المعياري (Modular Monolith)**:
      تطبيق واحد يُنشر كوحدة موحدة (Single Deployment Unit) وبدون أي تعقيدات شبكية، ولكنه مقسم داخلياً إلى وحدات نطاق معزولة تماماً (Isolated Bounded Contexts) تتواصل عبر واجهات برمجية محكمة.
      وعندما تكبر وحدة معينة وتتطلب توسعاً مستقلاً، يتم فصلها بسلاسة باستخدام نمط **Strangler Fig Pattern**.
      في هذا الدرس، هنفكك استراتيجيات تفكيك النظم، وهنتعلم إزاي نبني **Saga Pattern** لإدارة المعاملات الموزعة.
    `,
    mechanics: [
      { step: '01', title: 'المونوليث المعياري (Modular Monolith Architecture)', desc: 'بناء التطبيق كـ Monolith موحد النشر ولكن بحدود معمارية صارمة بين الوحدات (Modules) تمنع التداخل المباشر في قواعد البيانات.' },
      { step: '02', title: 'نمط التفكيك التدريجي (Strangler Fig Pattern)', desc: 'استبدال خدمات المونوليث القديمة تدريجياً عبر توجيه مسارات محددة بالبروكسي إلى خدمات جديدة حتى يتلاشى المونوليث بأمان.' },
      { step: '03', title: 'إدارة المعاملات الموزعة بنمط Saga Pattern', desc: 'استبدال قفل ACID الموزع بسلسلة من المعاملات المحلية المتتابعة مع معاملات تعويضية (Compensating Transactions) للتراجع عند الفشل.' },
      { step: '04', title: 'نظرية CAP والتناسق النهائي (Eventual Consistency)', desc: 'التخلي عن التناسق الفوري الصارم لصالح التوافر العالي والتحمل لتقسيم الشبكات (AP Systems) في الأنظمة الموزعة الضخمة.' },
      { step: '05', title: 'تحديات الـ Microservices الحقيقية (Operational Overhead)', desc: 'احتساب تكاليف إدارة الـ Observability، Service Meshes، استهلاك الـ Network Latency، وتكاليف البنية التحتية السحابية.' }
    ],
    playgroundCode: `// محاكي نمط المعاملات الموزعة Saga Pattern مع خطوات التعويض (Compensating Actions)
class SagaOrchestrator {
  constructor() { this.steps = []; }
  
  addStep(name, executeFn, compensateFn) {
    this.steps.push({ name, executeFn, compensateFn });
  }

  async run() {
    const executedSteps = [];
    console.log("🚀 Starting Distributed Saga Execution...");
    
    for (const step of this.steps) {
      try {
        console.log(\`⚡ Executing Step: [\${step.name}]...\`);
        await step.executeFn();
        executedSteps.push(step);
      } catch (err) {
        console.error(\`🚨 Step [\${step.name}] FAILED: \${err.message}\`);
        console.log("🔄 Initiating Compensating Rollback Steps in Reverse...");
        for (const executed of executedSteps.reverse()) {
          console.log(\`↩️ Compensating Step: [\${executed.name}]...\`);
          await executed.compensateFn();
        }
        console.log("❌ Saga Aborted cleanly. Distributed state remains consistent!");
        return false;
      }
    }
    console.log("✅ Distributed Saga Completed Successfully!");
    return true;
  }
}

const saga = new SagaOrchestrator();
saga.addStep("Reserve Inventory", async () => true, async () => console.log("   -> Inventory Restored"));
saga.addStep("Charge Customer Card", async () => true, async () => console.log("   -> Refund Processed"));
saga.addStep("Dispatch Shipping", async () => { throw new Error("Shipping Carrier Offline"); }, async () => {});

await saga.run();`,
    experimentQuestion: 'لماذا يعتبر تفكيك قاعدة البيانات المشتركة إلى قاعدة بيانات خاصة لكل خدمة (Database-per-Service) شرطاً أساسياً لنجاح المايكروسيرفس الحقيقية؟',
    experimentAnswer: 'إذا كانت 10 خدمات مايكروسيرفس مختلفة تتصل بنفس قاعدة البيانات المركزية المشتركة (Shared Database)، فإن أي تعديل في بنية جدول من قبل الفريق A سيكسر خدمات الفرق الأخرى التسعة! كما أن قواعد البيانات المركزية تصبح نقطة فشل مفردة (Single Point of Failure) وعنق زجاجة للاختناق. قاعدة Database-per-Service تضمن استقلالية تامة لكل خدمة في اختيار محرك بياناتها وتحديثه ونشره بحرية كاملة.',
    codeAnatomy: [
      { line: '// Strangler Fig Reverse Proxy Routing Configuration', note: 'توجيه نمط Strangler Fig' },
      { line: 'export const stranglerRouter = (req, res, next) => {', note: 'موجه البروكسي' },
      { line: '  // 1. المسار الجديد تم تفكيكه لخدمة مايكروسيرفس مستقلة', note: 'الخدمة الجديدة' },
      { line: '  if (req.path.startsWith("/api/v2/payments")) {', note: 'المسار الحديث' },
      { line: '    return proxyToPaymentMicroservice(req, res); // توجيه للخدمة الجديدة', note: 'توجيه للمايكروسيرفس' },
      { line: '  }', note: 'نهاية الشرط' },
      { line: '  // 2. باقي المسارات توجه للمونوليث القديم كالمعتاد', note: 'المونوليث القديم' },
      { line: '  return proxyToLegacyMonolith(req, res);', note: 'توجيه للمونوليث' },
      { line: '};', note: 'نهاية الموجه' }
    ],
    pitfallBad: `// خطأ كارثي: بناء Microservices تتشارك نفس قاعدة البيانات المركزية (Distributed Monolith)
// يجمع أسوأ ما في العالمين: تعقيد شبكات المايكروسيرفس مع قيود واعتماديات المونوليث!`,
    pitfallGood: `// الحل المعماري: Modular Monolith أو Database-per-Service معزولة
// كل وحدة تمتلك نموذج بياناتها الخاص وتتواصل عبر Events أو APIs`,
    pitfallDiagnosis: 'الـ Distributed Monolith هو كابوس معماري ينتج عن تقسيم الكود مع إبقاء الداتابيز مشتركة، والحل هو عزل البيانات تماماً.',
    quizPool: [
      {
        q: 'What is the Strangler Fig Pattern in software system decomposition?',
        qAr: 'ما هو نمط Strangler Fig في تفكيك وتحديث النظم البرمجية؟',
        options: [
          'Gradually replacing legacy monolith components with modern microservices via facade routing until the old system is completely phased out without big-bang rewrites.',
          'Shutting down the entire company for 3 months to rewrite everything.',
          'Deleting database backups.',
          'Compiling backend code to WebAssembly.'
        ],
        correct: 0,
        why: 'Strangler Fig minimizes migration risk by incrementally peeling off domain slices behind a routing facade while old systems remain running.',
        whyAr: 'يقلص مخاطر التحول بنقل واستبدال خدمات المونوليث تدريجياً خلف موجه وسيط دون الحاجة لإعادة كتابة النظام بالكامل دفعة واحدة.'
      },
      {
        q: 'What is the primary trade-off highlighted by the CAP Theorem in distributed data systems?',
        qAr: 'ما هي المفاضلة الجوهرية التي تبرزها نظرية CAP في قواعد البيانات الموزعة؟',
        options: [
          'In the presence of a Network Partition (P), a distributed system must choose between Consistency (C) and Availability (A); it cannot guarantee both.',
          'Systems must choose between price and speed.',
          'CPU speed versus RAM size.',
          'Windows versus Linux.'
        ],
        correct: 0,
        why: 'Network partitions are inevitable; distributed architectures must decide whether to return stale data (Availability) or error/block (Consistency).',
        whyAr: 'عند حدوث انقطاع في الشبكة، يجب على النظام الاختيار بين الاتساق التام للبيانات (Consistency) أو إبقاء النظام متاحاً للقراءة (Availability).'
      },
      {
        q: 'How does the Saga Pattern manage distributed transactions without two-phase locking (2PC)?',
        qAr: 'كيف يدير نمط Saga Pattern المعاملات الموزعة دون الحاجة لأقفال متزامنة ثقيلة؟',
        options: [
          'Executes a sequence of local transactions across services, triggering predefined compensating transactions in reverse if a step fails.',
          'Locks all databases across the world.',
          'Deletes failed database records automatically.',
          'Converts all databases to SQLite.'
        ],
        correct: 0,
        why: 'Sagas replace distributed locks with asynchronous event sequences and compensating rollback actions to preserve eventual consistency.',
        whyAr: 'ينفذ سلسلة من المعاملات المحلية في كل خدمة، ويطلق معاملات تعويضية عكسية لإلغاء الخطوات السابقة في حال فشل أي مرحلة.'
      },
      {
        q: 'What is a Modular Monolith architecture?',
        qAr: 'ما هي معمارية المونوليث المعياري (Modular Monolith)؟',
        options: [
          'A single deployable application structured into strictly decoupled, encapsulated domain modules with explicit interfaces and zero inter-module database sharing.',
          'A cluster of 100 Docker containers.',
          'A single monolithic file with 50,000 lines.',
          'A serverless function.'
        ],
        correct: 0,
        why: 'Modular Monoliths combine the operational simplicity of a single binary with the architectural boundary discipline of microservices.',
        whyAr: 'تطبيق موحد النشر ولكنه منظم داخلياً في وحدات نطاق معزولة تماماً بحدود برمجية صارمة وبدون تداخل مباشر في البيانات.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين Saga Orchestration و Saga Choreography ومتى تختار كلاً منهما لإدارة المعاملات الموزعة؟',
    interviewA: 'في Saga Choreography (Decentralized): لا يوجد منسق مركزي؛ كل خدمة تنفذ معاملتها وتطلق حدثاً (Event)، وتستمع الخدمة التالية للحدث لتنفذ خطوتها (ممتازة للعمليات البسيطة من خطوتين أو 3 لتفادي الـ Single Point of Failure). في Saga Orchestration (Centralized): ننشئ خدمة منسق مركزية (Orchestrator مثل Temporal أو AWS Step Functions) ترسل أوامر محددة لكل خدمة وتراقب الردود وتتولى إطلاق خطوات التعويض (Compensations) عند الفشل (إلزامية للعمليات المعقدة ذات الـ 5+ خطوات لتسهيل تتبع حالة المعاملة ومنع فوضى تشابك الأحداث Cyclic Dependencies).'
  },
  {
    slug: 'api-gateway',
    title: 'API Gateway Architecture: Reverse Proxies, Rate Limiting, Aggregation & KrakenD/Kong Integration',
    titleAr: 'معمارية بوابات الـ API (API Gateways): البروكسي العكسي، دمج الطلبات وحماية الخدمات بـ Kong و NGINX',
    level: 3,
    order: 14,
    estMinutes: 35,
    version: 'Enterprise API Gateway',
    pattern: 'API Gateway Pattern & Backend for Frontend (BFF)',
    objectives: [
      'فهم الدور المحوري لبوابة الـ API Gateway كنقطة دخول مركزية موحدة (Single Entrypoint) لكافة خدمات النظام.',
      'تطبيق الوظائف المركزية المشتركة: إنهاء التشفير (SSL Termination)، التحقق المركزي من الـ JWT، وتحديد معدل الطلبات (Rate Limiting).',
      'بناء نمط Backend-for-Frontend (BFF) لتوفير نقاط نهاية مخصصة لتطبيقات الموبايل والويب والـ IoT.',
      'تطبيق ميزة دمج الطلبات (Request Aggregation) لتقليص عدد استدعاءات الشبكة للهواتف المحمولة.'
    ],
    problemOpening: `
      لو كان لديك نظام يحتوي على 15 خدمة مايكروسيرفس (خدمة المستخدمين، خدمة الطلبات، خدمة المدفوعات، خدمة التقييمات...) وقام تطبيق الموبايل بالاتصال المباشر بكل خدمة على حدة:
      1. تطبيق الموبايل سيضطر لإرسال 15 طلب HTTP منفصل لعرض صفحة واحدة للمستخدم، مما يستهلك بطارية الهاتف وباقة الإنترنت!
      2. كل خدمة مايكروسيرفس ستضطر لإعادة كتابة كود التحقق من الـ JWT، وتطبيق CORS، وحماية الـ Rate Limiting بشكل مكرر!
      3. كشف عناوين الـ IP الداخلية للخدمات على الإنترنت يمثل خطراً أمنياً داهماً!
      الحل المعماري العالمي هو وضع **بوابة الـ API (API Gateway)** في مقدمة النظام:
      بوابة مركزية فائقة السرعة (مثل Kong أو KrakenD أو NGINX):
      - تنهي اتصالات الـ SSL وتقوم بمصادقة الـ JWT مركزياً في 0.5ms قبل تمرير الطلب للخدمات الداخلية.
      - تدمج بيانات 5 خدمات داخل رد JSON واحد (**Request Aggregation**).
      - تطبق نمط **BFF (Backend for Frontend)** لتفصيل الردود بدقة لكل شاشة.
      في هذا الدرس، هنبني معمارية Gateway متكاملة، وهنتعلم أسرار الـ **Reverse Proxy Routing**.
    `,
    mechanics: [
      { step: '01', title: 'نقطة الدخول المركزية الموحدة (Unified Routing)', desc: 'استقبال جميع زيارات الدومين api.codehub.dev وتوجيهها داخلياً للخدمات المعنية عبر شبكة خاصة معزولة.' },
      { step: '02', title: 'المصادقة المركزية (Centralized Authentication Offloading)', desc: 'التحقق من صحة رموز الـ JWT في الـ Gateway وحقن معرف المستخدم في رأس x-user-id للخدمات الداخلية.' },
      { step: '03', title: 'دمج الطلبات (Request Aggregation)', desc: 'استقبال طلب واحد من الموبايل /api/dashboard واستدعاء 4 خدمات بالتوازي داخلياً ودمج النتائج في رد واحد.' },
      { step: '04', title: 'نمط Backend for Frontend (BFF)', desc: 'بناء بوابات مخصصة: Mobile BFF يرجع بيانات مختصرة ومضغوطة، و Web BFF يرجع بيانات غنية وتفصيلية.' },
      { step: '05', title: 'صمامات الأمان وقواطع الدوائر (Circuit Breakers)', desc: 'عزل الخدمات المتعطلة وإرجاع ردود كاش بديلة فوراً لمنع انهيار باقي المنظومة المتسلسل.' }
    ],
    playgroundCode: `// محاكي بوابة الـ API ونمط دمج الطلبات (Request Aggregation)
class MockApiGateway {
  constructor() {
    this.services = {
      user: async (id) => ({ id, name: "Amr Zidan", tier: "VIP" }),
      orders: async (id) => [{ id: "o1", total: 150 }, { id: "o2", total: 320 }],
      notifications: async (id) => ({ unread: 3 })
    };
  }

  async handleClientRequest(endpoint, userId) {
    if (endpoint === "/api/mobile/dashboard") {
      console.log("🚀 API Gateway: Aggregating 3 internal microservices in parallel...");
      
      const [user, orders, notifs] = await Promise.all([
        this.services.user(userId),
        this.services.orders(userId),
        this.services.notifications(userId)
      ]);

      const aggregatedResponse = { user, recentOrders: orders, unreadCount: notifs.unread };
      console.log("✅ Unified Payload dispatched to mobile client in single round-trip!");
      return aggregatedResponse;
    }
  }
}

const gateway = new MockApiGateway();
await gateway.handleClientRequest("/api/mobile/dashboard", "usr_101");`,
    experimentQuestion: 'لماذا يعتبر نمط Backend for Frontend (BFF) أفضل من وجود API Gateway عملاقة وحيدة مشتركة لجميع تطبيقات الشركة (Web, iOS, Android, Smart TVs)؟',
    experimentAnswer: 'البوابة العملاقة الموحدة تصبح مع الوقت عنق زجاجة للتطوير (Team Bottleneck) وتنتج ردود JSON ضخمة ممتلئة بحقول لا يحتاجها تطبيق الموبايل. نمط BFF يخصص بوابة مستقلة خفيفة لكل نوع واجهة (Mobile BFF يرجع بيانات مصغرة لشبكات 4G البطيئة، و Web BFF يرجع بيانات تحليلية واسعة للشاشات الكبيرة)، مما يمنح كل فريق استقلالية تامة في تطوير واجهته وسرعة قصوى للعميل.',
    codeAnatomy: [
      { line: '// Enterprise API Gateway Authentication & Routing Middleware', note: 'بوابة الـ API المركزية' },
      { line: 'export const gatewayAuth = async (req, res, next) => {', note: 'فحص المصادقة المركزي' },
      { line: '  const token = req.headers.authorization?.split(" ")[1];', note: 'استخراج الرمز' },
      { line: '  if (!token) return res.status(401).json({ error: "Gateway: Missing Bearer Token" });', note: 'حظر فوري' },
      { line: '  try {', note: 'التحقق الرياضي السريع' },
      { line: '    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY);', note: 'فك التشفير بالـ Public Key' },
      { line: '    req.headers["x-user-id"] = decoded.sub; // حقن الهوية للخدمات الداخلية', note: 'تمرير الهوية الموثقة' },
      { line: '    req.headers["x-user-roles"] = decoded.roles.join(",");', note: 'تمرير الصلاحيات' },
      { line: '    next();', note: 'توجيه الطلب داخلياً' },
      { line: '  } catch {', note: 'فشل الرمز' },
      { line: '    return res.status(401).json({ error: "Gateway: Invalid Token Signature" });', note: 'رفض الطلب' },
      { line: '  }', note: 'نهاية الفحص' },
      { line: '};', note: 'نهاية البوابة' }
    ],
    pitfallBad: `// خطأ كارثي: جعل تطبيقات الموبايل تتصل مباشرة بعشرات المايكروسيرفس الداخلية
// يستنزف باقة الإنترنت والبطارية ويكشف عناوين الخدمات الداخلية للاختراق!`,
    pitfallGood: `// الحل المعماري: بوابة API Gateway مركزية أو BFF
// نقطة دخول واحدة محصنة بـ SSL و Rate Limiting و Request Aggregation`,
    pitfallDiagnosis: 'الاتصال المباشر بالخدمات الداخلية يضاعف زمن الاستجابة ويهدد الأمان، بينما البوابة توفر درعاً دفاعياً ونقطة تجميع موحدة.',
    quizPool: [
      {
        q: 'What is the primary architectural purpose of an API Gateway in a microservices system?',
        qAr: 'ما هو الغرض المعماري الأساسي لبوابة الـ API Gateway في أنظمة المايكروسيرفس؟',
        options: [
          'Acts as a single reverse proxy entrypoint that centralizes cross-cutting concerns (authentication, SSL, rate limiting, routing, aggregation) for client applications.',
          'Stores database tables.',
          'Compiles TypeScript to JavaScript.',
          'Replaces mobile operating systems.'
        ],
        correct: 0,
        why: 'API Gateways decouple clients from internal service topologies, consolidating security, routing, and protocol translation at the edge.',
        whyAr: 'تعمل كنقطة دخول مركزية موحدة تعزل الخدمات الداخلية وتوحد معالجة الأمان والمصادقة والـ Rate Limiting وتوجيه الطلبات.'
      },
      {
        q: 'What is the Backend-for-Frontend (BFF) design pattern?',
        qAr: 'ما هو نمط التصميم المعماري Backend-for-Frontend (BFF)؟',
        options: [
          'Creating dedicated, tailored gateway layers for specific client interfaces (e.g. separate BFFs for Mobile iOS, Web Desktop, and IoT).',
          'Writing CSS styles in the backend.',
          'Running Node.js inside the browser.',
          'A database backup tool.'
        ],
        correct: 0,
        why: 'BFF creates tailored client-specific backend adapters, optimizing payloads and network trips for distinct device form-factors.',
        whyAr: 'إنشاء بوابات خلفية مخصصة لكل نوع واجهة (مثل BFF مخصص للموبايل وآخر للويب) لتحسين أحجام البيانات وسرعة العرض.'
      },
      {
        q: 'What problem does Request Aggregation solve in mobile application development?',
        qAr: 'ما هي المشكلة التي تعالجها ميزة دمج الطلبات (Request Aggregation) في تطبيقات الموبايل؟',
        options: [
          'Reduces mobile battery and network latency by combining multiple backend service calls into a single client HTTP round-trip.',
          'Increases mobile screen brightness.',
          'Compresses audio files.',
          'Deletes duplicate contacts.'
        ],
        correct: 0,
        why: 'Aggregating backend requests at the gateway reduces high-latency cellular network round-trips for mobile devices.',
        whyAr: 'تقلل عدد استدعاءات الشبكة واستهلاك البطارية عبر دمج نتائج عدة خدمات مايكروسيرفس في رد واحد خفيف للموبايل.'
      },
      {
        q: 'What is SSL Termination at the API Gateway level?',
        qAr: 'ماذا يعني مصطلح "SSL Termination" على مستوى بوابة الـ API Gateway؟',
        options: [
          'Decrypting incoming HTTPS traffic at the gateway edge and forwarding unencrypted (or internally secured) traffic to private backend services.',
          'Deleting SSL certificates.',
          'Blocking all encrypted traffic.',
          'Restarting the web server.'
        ],
        correct: 0,
        why: 'SSL termination offloads CPU-intensive cryptographic handshakes from downstream microservices to dedicated edge gateway proxies.',
        whyAr: 'فك تشفير اتصالات HTTPS على حافة البوابة وتمرير البيانات داخلياً للخدمات لتوفير استهلاك الـ CPU في السيرفرات الداخلية.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحمي منظومة الـ Microservices من الـ Cascading Failure (الانهيار المتسلسل) عندما تتعطل خدمة فرعية داخلية باستخدام نمط Circuit Breaker؟',
    interviewA: 'نطبق نمط Circuit Breaker (بمكتبات مثل Opossum): القاطع يمتلك 3 حالات: 1. Closed: الطلبات تمر طبيعياً. يتم حساب نسبة الفشل ومعدل الـ Latency. 2. Open: إذا تجاوزت نسبة الأخطاء 50% في آخر 10 ثوانٍ، يفتح القاطع فوراً ويحظر إرسال أي طلبات جديدة للخدمة المتعطلة، ويرجع استجابة كاش بديلة فورية (Fallback) في 1ms، مما يمنع تعليق الخيوط واستهلاك الاتصالات. 3. Half-Open: بعد مهلة (e.g. 30s)، يمرر القاطع نسبة ضئيلة من الطلبات التجريبية (Canary Requests)؛ فإذا نجحت يُغلق القاطع وتعود الخدمة للعمل، وإذا فشلت يعود لحالة Open لحماية المنظومة.'
  },
  {
    slug: 'event-driven-architecture',
    title: 'Event-Driven Architecture: Event Sourcing, CQRS & Apache Kafka Stream Processing',
    titleAr: 'المعمارية الموجهة بالأحداث (EDA): نمط Event Sourcing، فصل القراءة والكتابة (CQRS) وتدفقات Kafka',
    level: 3,
    order: 15,
    estMinutes: 35,
    version: 'Apache Kafka & Event-Driven Systems',
    pattern: 'Event Sourcing, CQRS & Distributed Event Streams',
    objectives: [
      'فهم صلب المعمارية الموجهة بالأحداث (Event-Driven Architecture) ونمط الناشر/المشترك (Pub/Sub).',
      'تشريح نمط استرجاع الأحداث (Event Sourcing): حفظ كل تغيير في النظام كحدث تاريخي غير قابل للتعديل (Immutable Append-Only Log).',
      'تطبيق نمط فصل مسؤوليات الاستعلام والأوامر (Command Query Responsibility Segregation - CQRS).',
      'فهم معمارية تدفقات البيانات الضخمة بـ Apache Kafka (Topics, Partitions, Consumer Groups, Offsets).'
    ],
    problemOpening: `
      في قواعد البيانات التقليدية (CRUD)، عندما يقوم المستخدم بتعديل عنوانه 5 مرات، فإنك تقوم بعمل <code dir="ltr">UPDATE</code> لنفس الصف؛ فيختفي العنوان القديم وتبقى القيمة الأخيرة فقط!
      لو سألك المدقق المالي أو القانوني: "ماذا كان عنوان العميل يوم 15 يناير الماضي وقت إجراء المعاملة المشبوهة؟"، لن تستطيع الإجابة لأنك قمت بمسح التاريخ!
      في الأنظمة البنكية، أسواق الأسهم، وأنظمة التجارة الكبرى، يتم بناء الأنظمة بنمط **Event Sourcing**:
      - لا نقوم بحفظ "الحالة الحالية" (Current State)؛ بل نحفظ **سلسلة الأحداث التاريخية غير القابلة للتعديل (Immutable Event Log)**:
      <code dir="ltr">AccountCreated -> FundsDeposited(100) -> FundsTransferred(40) -> AddressUpdated</code>.
      - الحالة الحالية هي ببساطة ناتج إعادة تشغيل (Replaying) هذه الأحداث من البداية!
      وعند دمج Event Sourcing مع نمط **CQRS**، نقوم بفصل قاعدة بيانات الكتابة (المحسنة للكتابة السريعة بـ Kafka/EventStore) عن قواعد بيانات القراءة (المحسنة للبحث السريع بـ Elasticsearch و PostgreSQL Read Models).
      في هذا الدرس المتقدم، هنفكك المعمارية الموجهة بالأحداث، وهنتعلم أسرار **Apache Kafka**.
    `,
    mechanics: [
      { step: '01', title: 'سجل الأحداث غير القابل للتعديل (Append-Only Event Store)', desc: 'تسجيل الأحداث كحقائق تاريخية ماضية (e.g. OrderPlaced, PaymentReceived) لا يمكن تعديلها أو حذفها نهائياً.' },
      { step: '02', title: 'فصل القراءة عن الكتابة بـ CQRS Pattern', desc: 'نموذج الأوامر (Commands) يركز على منطق الأعمال والكتابة؛ بينما نموذج الاستعلام (Queries) يقرأ من Read Projections محسنة وفائقة السرعة.' },
      { step: '03', title: 'إعادة بناء الحالة بـ Event Replay', desc: 'حساب الرصيد الحالي أو حالة الطلب عبر تجميع وتطبيق قائمة الأحداث التاريخية sequentially.' },
      { step: '04', title: 'معمارية تدفقات Apache Kafka', desc: 'توزيع الأحداث عبر Topics مقسمة إلى Partitions، ومعالجة الملايين من الرسائل بالتوازي عبر Consumer Groups مع تتبع الـ Offset.' },
      { step: '05', title: 'لقطات الحالة المؤقتة (Snapshots Optimization)', desc: 'أخذ لقطة لحالة الحساب كل 1000 حدث لمنع إعادة تشغيل ملايين الأحداث القديمة عند كل قراءة.' }
    ],
    playgroundCode: `// محاكي نمط Event Sourcing وإعادة بناء الحالة (State Replay)
class BankAccountEventSourced {
  constructor(accountId) {
    this.accountId = accountId;
    this.events = []; // سجل الأحداث غير القابل للتعديل
  }

  applyEvent(event) {
    this.events.push({ ...event, timestamp: Date.now() });
    console.log(\`📝 Event Appended: [\${event.type}] -> Payload:\`, event.data);
  }

  // إعادة حساب الرصيد الحالي من خلال إعادة تشغيل كافة الأحداث التاريخية
  getCurrentState() {
    let balance = 0;
    let status = "UNINITIALIZED";

    for (const event of this.events) {
      switch (event.type) {
        case "ACCOUNT_OPENED":
          status = "ACTIVE";
          balance = event.data.initialDeposit;
          break;
        case "FUNDS_DEPOSITED":
          balance += event.data.amount;
          break;
        case "FUNDS_WITHDRAWN":
          balance -= event.data.amount;
          break;
      }
    }

    return { accountId: this.accountId, status, currentBalance: balance, totalEvents: this.events.length };
  }
}

const account = new BankAccountEventSourced("ACC_101");
account.applyEvent({ type: "ACCOUNT_OPENED", data: { initialDeposit: 500 } });
account.applyEvent({ type: "FUNDS_DEPOSITED", data: { amount: 200 } });
account.applyEvent({ type: "FUNDS_WITHDRAWN", data: { amount: 150 } });

console.log("Calculated State via Event Replay:", account.getCurrentState()); // 550`,
    experimentQuestion: 'ما هي مشكلة الـ Eventual Consistency في نمط CQRS وكيف يتعامل معها تطبيق الواجهة الأمامية عند تحديث البيانات؟',
    experimentAnswer: 'في CQRS، بعد أن يرسل المستخدم أمر الكتابة ويتم حفظ الحدث في الـ Event Store، قد يستغرق مزامنة وتحديث نموذج القراءة (Read Model) بضعة ميلي ثوانٍ (Eventual Consistency Lag). إذا قام المستخدم بالتحويل لصفحة العرض فوراً، قد يرى بياناته القديمة! لحل ذلك في الفرونت إند: 1. نطبق Optimistic UI Updates في شاشة React لعرض التعديل فوراً. 2. نرسل إشعار WebSocket من السيرفر عند اكتمال تحديث الـ Read Model لإعادة مزامنة الشاشة بسلاسة.',
    codeAnatomy: [
      { line: '// CQRS Command Handler & Event Dispatcher', note: 'معالج أوامر CQRS' },
      { line: 'export class PlaceOrderCommandHandler {', note: 'فئة معالجة الأمر' },
      { line: '  constructor(private eventStore: IEventStore, private kafkaProducer: IKafka) {}', note: 'حقن التبعيات' },
      { line: '  async handle(command: PlaceOrderCommand): Promise<string> {', note: 'تنفيذ الأمر' },
      { line: '    // 1. Validate Business Rules', note: 'فحص القواعد' },
      { line: '    if (command.items.length === 0) throw new Error("Order cannot be empty");', note: 'تحقق الأعمال' },
      { line: '    // 2. Create Immutable Domain Event', note: 'إنشاء الحدث التاريخي' },
      { line: '    const orderEvent = new OrderPlacedEvent(command.orderId, command.userId, command.items);', note: 'كائن الحدث' },
      { line: '    // 3. Persist Event to Append-Only Store and Broadcast to Kafka', note: 'الحفظ والبث' },
      { line: '    await this.eventStore.append(orderEvent);', note: 'حفظ في السجل' },
      { line: '    await this.kafkaProducer.send("order-events", orderEvent); // Asynchronous Broadcast', note: 'بث في Kafka' },
      { line: '    return command.orderId;', note: 'إرجاع المعرف' },
      { line: '  }', note: 'نهاية المعالج' },
      { line: '}', note: 'نهاية الفئة' }
    ],
    pitfallBad: `// خطأ شائع: تعديل أو حذف حدث تاريخي مسجل في الـ Event Store
// يدمر سلامة السجل التاريخي وقابلية إعادة التدقيق المالي!`,
    pitfallGood: `// الحل الهندسي: إنشاء حدث تعويضي جديد لإلغاء الحدث السابق
eventStore.append(new OrderCancelledEvent(orderId, "Customer requested refund"));`,
    pitfallDiagnosis: 'الأحداث في Event Sourcing غير قابلة للتعديل أو الحذف، ويتم تصحيح الأخطاء بإضافة أحداث جديدة تصف التغيير.',
    quizPool: [
      {
        q: 'What is the core principle of the Event Sourcing pattern?',
        qAr: 'ما هو المبدأ الجوهري لنمط استرجاع الأحداث (Event Sourcing)؟',
        options: [
          'State changes are modeled and stored as an immutable, append-only chronological sequence of domain events rather than mutating current-state records in-place.',
          'Deleting all database tables every night.',
          'Running JavaScript on Kafka servers.',
          'Converting databases to XML.'
        ],
        correct: 0,
        why: 'Event sourcing preserves full chronological fidelity by recording every state change as an immutable domain event.',
        whyAr: 'يصمم ويخزن كل تغيير في النظام كسلسلة أحداث تاريخية غير قابلة للتعديل بدلاً من تعديل الحالة الحالية في مكانها.'
      },
      {
        q: 'What does CQRS (Command Query Responsibility Segregation) dictate?',
        qAr: 'ما الذي يفرضه نمط CQRS في معمارية البرمجيات؟',
        options: [
          'Separates read models (Queries) from write models (Commands), allowing each side to be scaled and optimized independently using distinct schemas or databases.',
          'Forces all database queries to be written in C++.',
          'Combines HTML and SQL into one file.',
          'Eliminates the need for API endpoints.'
        ],
        correct: 0,
        why: 'CQRS decouples write operations from read representations, maximizing performance and architectural flexibility for complex domains.',
        whyAr: 'يفصل مسار القراءة عن مسار الكتابة تماماً مما يتيح توسيع وتحسين كل مسار وقاعدة بيانات بشكل مستقل بأعلى كفاءة.'
      },
      {
        q: 'What is the role of a "Partition" in an Apache Kafka Topic?',
        qAr: 'ما هو دور "الـ Partition" في الـ Topic داخل Apache Kafka؟',
        options: [
          'The fundamental unit of parallelism and ordered log storage in Kafka, allowing distributed consumers to process data concurrently.',
          'A tool for deleting old messages.',
          'A firewall security rule.',
          'A database backup file.'
        ],
        correct: 0,
        why: 'Partitions divide topic data across multiple broker disks, enabling horizontal write scaling and parallel consumer consumption.',
        whyAr: 'هو وحدة التوازي الأساسية في Kafka التي تتيح تقسيم الرسائل ومعالجتها بالتوازي التام عبر عدة خوادم مستهلكين.'
      },
      {
        q: 'Why are "Snapshots" utilized in long-running Event Sourced entities?',
        qAr: 'لماذا يتم استخدام "اللقطات" (Snapshots) في كيانات Event Sourcing ذات التاريخ الطويل؟',
        options: [
          'Stores pre-computed entity states periodically to avoid replaying thousands of historical events from inception on every read.',
          'Takes photos of the server room.',
          'Saves CSS screenshots to disk.',
          'Backs up the operating system.'
        ],
        correct: 0,
        why: 'Snapshots optimize read performance by establishing baseline checkpoints so state replay only processes events occurred after the snapshot.',
        whyAr: 'تحفظ الحالة المحسوبة دورياً (مثل كل 1000 حدث) لتفادي إعادة تشغيل آلاف الأحداث القديمة من البداية عند كل استعلام قراءة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحل مشكلة الـ Dual-Write Problem عند الحاجة لتعديل قاعدة بيانات PostgreSQL وبث رسالة لـ Apache Kafka في نفس الوقت لمنع فقدان البيانات؟',
    interviewA: 'نطبق نمط Transactional Outbox Pattern: 1. داخل نفس معاملة PostgreSQL ACID: نقوم بتعديل جدول الأعمال (e.g. orders) وإدخال سجل جديد في جدول مخصص اسمه outbox_table يحمل بيانات الرسالة. 2. بما أن العمليتين في معاملة SQL واحدة، فإما أن تنجحا معاً أو تفشلا معاً. 3. نستخدم أداة Change Data Capture (CDC مثل Debezium) أو Worker منفصل يقوم بقراءة جدول الـ outbox عبر PostgreSQL Write-Ahead Log (WAL) وبث الرسائل إلى Apache Kafka فورياً وبضمان تسليم 100% (Zero Message Loss).'
  },
  {
    slug: 'system-design-case-studies',
    title: 'Enterprise System Design: Architecture Case Studies (URL Shortener, E-Commerce, Chat & Streaming)',
    titleAr: 'تصميم النظم المؤسسية الكبرى (System Design): دراسات حالة (مختصر الروابط، المتجر الإلكتروني وتطبيقات البث)',
    level: 3,
    order: 16,
    estMinutes: 40,
    version: 'System Design Interview Standards',
    pattern: 'End-to-End System Architecture & High-Scale Tradeoffs',
    objectives: [
      'إتقان إطار العمل المنهجي لحل أسئلة الـ System Design في مقابلات كبرى الشركات التقنية (FAANG Framework).',
      'تصميم نظام مختصر الروابط المليوني (URL Shortener مثل TinyURL) مع حسابات الـ Capacity Estimation وخوارزمية Base62.',
      'تصميم منصة تجارة إلكترونية عالمية تتحمل عروض الجمعة البيضاء (Flash Sales Architecture) بدون انهيار قواعد البيانات.',
      'تصميم منصة محادثات حية فورية وتخزين الرسائل التاريخية ومعالجة مؤشرات قراءة الرسائل (Read Receipts).'
    ],
    problemOpening: `
      في المقابلات التقنية لكبار المهندسين المعماريين (Senior & Staff Engineer Interviews)، لن يسألك أحد عن كيفية كتابة دالة <code dir="ltr">map</code> أو إنشاء مسار Express عادي!
      السؤال الذي يحدد راتبك ومستواك القيادي هو:
      **"صمم لي منصة مثل TinyURL تعالج 500 مليون رابط شهرياً، مع استجابة أقل من 10ms وتوافر 99.99% (High Availability)"**!
      أو:
      **"صمم منصة Flash Sale تبيع 1000 جهاز iPhone خلال 5 ثوانٍ لـ 2 مليون مستخدم يتنافسون في نفس اللحظة!"**
      النجاح في تصميم النظم الكبرى يتطلب إطار عمل هندسي دقيق:
      1. توضيح المتطلبات الوظيفية وغير الوظيفية (Functional vs Non-Functional Requirements).
      2. تقدير سعة النظام وحسابات الباندويث والتخزين (Capacity & Back-of-the-envelope Estimations).
      3. تصميم المخطط البياني الصندوقي العام (High-Level Architecture).
      4. التعمق في المكونات الدقيقة، الفهارس، والكاش، ونقاط الفشل المفردة (Deep-Dive & Bottleneck Mitigation).
      في هذا الدرس الشامل، هنفكك 4 دراسات حالة كبرى وفق أحدث المعايير الهندسية العالمية.
    `,
    mechanics: [
      { step: '01', title: 'إطار حل أسئلة الـ System Design (FAANG Framework)', desc: '1. النطاق والمتطلبات، 2. حسابات السعة، 3. الـ High-Level Diagram، 4. التعمق وحل الاختناقات والـ Bottlenecks.' },
      { step: '02', title: 'خوارزمية Base62 وتوليد المفاتيح (Key Generation Service)', desc: 'توليد رموز فريدة مكونة من 7 أحرف ([0-9, a-z, A-Z]) توفر 3.5 تريليون رابط فريد بدون تصادم (Collision-Free).' },
      { step: '03', title: 'معمارية عروض الـ Flash Sales فائقة الضغط', desc: 'حجز المخزون في ذاكرة Redis بـ Lua Scripts الذرية وتفويض كتابة الفواتير لقواعد البيانات عبر طوابير Kafka في الخلفية.' },
      { step: '04', title: 'معمارية منصات المحادثات المليونية (WhatsApp/Slack Scale)', desc: 'استخدام WebSockets للاتصال الحي، و Cassandra لتخزين الرسائل السريعة غير المحدودة، و Redis لتخزين حالات الاتصال Presence.' },
      { step: '05', title: 'تحليل نقاط الفشل المفردة (Single Points of Failure - SPOF)', desc: 'مراجعة البنية وتكرار كافة المكونات (Redundancy) مع تفعيل المراقبة والتعافي التلقائي (Auto-Healing).' }
    ],
    playgroundCode: `// محاكي خوارزمية Base62 لتقصير الروابط في TinyURL
class Base62UrlShortener {
  constructor() {
    this.chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.counter = 100000000000; // عداد رقمي موزع فريد
  }

  encode(num) {
    let result = "";
    while (num > 0) {
      result = this.chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result.padStart(7, "0");
  }

  shortenUrl(originalUrl) {
    const id = this.counter++;
    const shortCode = this.encode(id);
    console.log(\`🔗 Shortened: [\${originalUrl}] -> codehub.dev/\${shortCode}\`);
    return shortCode;
  }
}

const shortener = new Base62UrlShortener();
shortener.shortenUrl("https://codehub.dev/learn/architecture/system-design-case-studies");
shortener.shortenUrl("https://google.com/search?q=advanced+distributed+systems");`,
    experimentQuestion: 'لماذا يعتبر استخدام دالة تجزئة مثل MD5 أو SHA-256 وأخذ أول 7 أحرف منها لتوليد كود الرابط القصير في TinyURL تصميماً سيئاً؟',
    experimentAnswer: 'لأن اقتطاع أول 7 أحرف فقط من الـ Hash يزيد بشدة من احتمالية التصادم الرياضي (Hash Collisions) بين روابط مختلفة! وعند حدوث تصادم، يضطر النظام لإعادة التجزئة أو إضافة أرقام عشوائية والبحث في قاعدة البيانات في حلقة مفرغة مما يبطئ التوليد. الحل المعماري الأفضل هو استخدام عداد رقمي موزع (Distributed ID Generator مثل Twitter Snowflake أو KGS - Key Generation Service) مع تحويل الرقم إلى Base62 لضمان فرادة 100% بدون أي تصادم نهائياً.',
    codeAnatomy: [
      { line: '// Lua Script for Atomic Flash-Sale Inventory Reservation in Redis', note: 'سكربت ذري فائق السرعة' },
      { line: 'local stock_key = KEYS[1]', note: 'مفتاح المخزون في Redis' },
      { line: 'local user_key = KEYS[2]', note: 'مفتاح المستخدم لمنع التكرار' },
      { line: 'local user_id = ARGV[1]', note: 'معرف المستخدم' },
      { line: 'if redis.call("SISMEMBER", user_key, user_id) == 1 then', note: 'فحص الشراء المسبق' },
      { line: '  return -1 -- User already purchased (Limit 1 per user)', note: 'منع الشراء المزدوج' },
      { line: 'end', note: 'نهاية الشرط' },
      { line: 'local current_stock = tonumber(redis.call("GET", stock_key) or 0)', note: 'قراءة المخزون في الـ RAM' },
      { line: 'if current_stock <= 0 then return 0 -- Out of Stock end', note: 'نفاد الكمية' },
      { line: 'redis.call("DECR", stock_key)', note: 'خصم ذري في 0.1ms' },
      { line: 'redis.call("SADD", user_key, user_id)', note: 'تسجيل شراء المستخدم' },
      { line: 'return 1 -- Success', note: 'نجاح الحجز' }
    ],
    pitfallBad: `// خطأ كارثي في عروض الـ Flash Sale: خصم المخزون باستعلام SQL مباشر لكل نقرة
UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0;
// 500,000 استعلام يضرب الداتابيز في نفس الثانية مما يسقط الخادم فوراً!`,
    pitfallGood: `// الحل الهندسي المعتمد: الخصم الذري في Redis أولاً ثم إرسال المهمة لـ Kafka
const reserved = await redis.eval(luaFlashSaleScript, 2, "stock:1", "buyers:1", userId);
if (reserved === 1) await orderQueue.add("create-order", { userId, productId: 1 });`,
    pitfallDiagnosis: 'قواعد البيانات العلائقية لا تتحمل مئات آلاف الأقفال في الثانية، بينما Redis ينفذ الخصم في الـ RAM في أجزاء من الميلي ثانية.',
    quizPool: [
      {
        q: 'Why is Base62 encoding ([0-9, a-z, A-Z]) standardly preferred over Base64 for URL Shortener codes?',
        qAr: 'لماذا يفضل ترميز Base62 على Base64 في أكواد مختصرات الروابط؟',
        options: [
          'Base62 contains only alphanumeric characters and omits special URL characters like "+" and "/" that require URL encoding.',
          'Base62 is faster to compress.',
          'Base64 is not supported on mobile phones.',
          'Base62 encrypts user passwords.'
        ],
        correct: 0,
        why: 'Base62 avoids characters like "+" and "/" present in Base64 that can break or require escaping in standard HTTP URLs.',
        whyAr: 'يتكون Base62 من أرقام وحروف فقط ويستبعد الرموز الخاصة مثل + و / التي تتطلب URL Encoding وتشوه الروابط.'
      },
      {
        q: 'In high-scale Flash Sale system design, how is massive database lock contention avoided?',
        qAr: 'في تصميم أنظمة عروض الـ Flash Sale، كيف يتم تفادي اختناق أقفال قواعد البيانات؟',
        options: [
          'Offloading atomic inventory decrements to in-memory Redis via Lua scripts and asynchronously processing orders via message queues (Kafka).',
          'Shutting down the database during the sale.',
          'Using SQLite files.',
          'Asking users to wait in line physically.'
        ],
        correct: 0,
        why: 'Redis Lua scripts execute atomic sub-millisecond stock checks in RAM, shielding databases from catastrophic lock contention.',
        whyAr: 'خصم المخزون ذرياً في ذاكرة Redis بـ Lua Scripts وتفويض كتابة الفواتير لطوابير Kafka يعزل قاعدة البيانات عن الضغط.'
      },
      {
        q: 'How many unique 7-character URL codes can a Base62 system theoretically generate?',
        qAr: 'كم عدد الروابط الفريدة المكونة من 7 أحرف التي يمكن لنظام Base62 توليدها نظرياً؟',
        options: ['62^7 (~3.5 Trillion unique URLs)', '62,000 URLs', '1 Million URLs', 'Unlimited'],
        correct: 0,
        why: '62 raised to the 7th power yields approximately 3.52 trillion unique combinations, lasting decades at high scale.',
        whyAr: 'العدد 62 مرفوعاً للأس 7 ينتج حوالي 3.5 تريليون رابط فريد وهو ما يكفي لعشرات السنين من العمليات الضخمة.'
      },
      {
        q: 'What is the recommended database storage architecture for massive-scale historical chat messages (e.g. Discord / WhatsApp scale)?',
        qAr: 'ما هي معمارية قواعد البيانات الموصى بها لتخزين الرسائل التاريخية الضخمة في تطبيقات المحادثات الكبرى؟',
        options: [
          'Wide-column NoSQL distributed stores like Apache Cassandra or ScyllaDB, partitioned by (channel_id, bucket) with clustering keys.',
          'A single MySQL table without indexes.',
          'JSON files stored on Desktop.',
          'Browser localStorage.'
        ],
        correct: 0,
        why: 'Cassandra excels at high-throughput sequential time-series writes and scales horizontally across clusters with linear predictability.',
        whyAr: 'قواعد NoSQL العريضة مثل Cassandra و ScyllaDB هي المعيار لكفاءتها الخارقة في كتابة البيانات الزمنية المتتالية والتوسع الخطي.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تحسب تقديرات السعة (Capacity Estimation) لنظام YouTube عند رفع 500 ساعة فيديو كل دقيقة بنسبة ضغط 1080p؟',
    interviewA: 'نحسبها كالتالي: 1. دقيقة فيديو 1080p متوسط حجمها ~50MB. 2. كل دقيقة يُرفع 500 ساعة = 30,000 دقيقة فيديو. 3. معدل التخزين في الدقيقة: 30,000 * 50MB = 1.5 TB/min. 4. معدل التخزين اليومي: 1.5 TB * 60 * 24 = ~2.16 Petabytes/Day! 5. التخزين لـ 5 سنوات مع التكرار 3x: 2.16 PB * 365 * 5 * 3 = ~11.8 Exabytes! هذه الحسابات السريعة تبرز للممتحن قدرتك على تقدير أحجام الخوادم والتكاليف السحابية واختيار حلول التخزين البارد (S3 Glacier / Tape Storage) بنضج معماري حقيقي.'
  },
  {
    slug: 'performance-tuning',
    title: 'High-Scale Backend Performance: Node.js V8 Engine Optimization, Libuv & Memory Profiling',
    titleAr: 'تحسين أداء الباك إند عالي الأحمال: تحسينات محرك V8، حلقة Libuv وكشف تسريبات الذاكرة',
    level: 3,
    order: 17,
    estMinutes: 35,
    version: 'Node.js 24 Performance Core',
    pattern: 'V8 Optimization & Low-Latency Systems',
    objectives: [
      'فهم كيفية قيام محرك V8 بترجمة وتحسين كود جافاسكريبت (Ignition Interpreter & Turbofan JIT Compiler).',
      'تشريح مراحل ومراحل خيوط حلقة الأحداث (Libuv Event Loop Phases: Timers, Poll, Check, Close).',
      'تحسين كود جافاسكريبت ليكون متوافقاً مع تحسينات V8 (Monomorphic vs Polymorphic Inline Caching).',
      'تشخيص وعلاج اختناقات الذاكرة وظاهرة الـ Garbage Collection Pauses (Stop-The-World GC).'
    ],
    problemOpening: `
      في خوادم معالجة ملايين المعاملات في الثانية (مثل خوادم الدفع الإلكتروني أو محركات الإعلانات في الوقت الحقيقي RTB Ad Exchanges)، كل ميكروثانية (Microsecond) فارقة!
      المطور العادي يكتب كود جافاسكريبت دون أن يدري كيف يتعامل معه محرك **Google V8**:
      - هل تعلم أن تمرير كائنات ذات أشكال مختلفة لنفس الدالة يكسر ميزة **Monomorphic Inline Caching** في V8، ويجبر المحرك على إسقاط الكود المحسن (Deoptimization) وتشغيله بسرعة بطيئة بـ 10 أضعاف؟
      - هل تعلم أن إنشاء ملايين الكائنات المؤقتة داخل الحلقات يملأ مساحة **V8 Young Generation (Scavenge)** ويجبر مجمع القمامة (Garbage Collector) على إيقاف خيط الخادم بالكامل في وقفات دورية (**Stop-The-World GC Pauses**)?
      في هذا الدرس العميق، هنغوص في أعماق محرك V8 ومكتبة Libuv، وهنتعلم القواعد الصارمة لكتابة كود فائق السرعة يستفيد من أقصى قدرات العتاد والمعالج.
    `,
    mechanics: [
      { step: '01', title: 'مراحل محرك V8 (Ignition & Turbofan)', desc: 'يقوم Ignition بتوليد Bytecode سريع، وتقوم Turbofan بمراقبة الدوال الساخنة (Hot Functions) وتحويلها إلى لغة الآلة المباشرة (Machine Code).' },
      { step: '02', title: 'الأشكال الخفية (Hidden Classes / Shapes)', desc: 'يقوم V8 بإنشاء خرائط بنية داخلية للكائنات؛ وتثبيت ترتيب تهيئة الخصائص يضمن بقاء الكود في النمط الأحادي المحسن Monomorphic.' },
      { step: '03', title: 'إدارة الذاكرة ومجمع القمامة (Scavenge vs Mark-Sweep)', desc: 'تنظيف كائنات الـ Young Generation سريعة الزوال بـ Scavenger، وتنظيف كائنات الـ Old Generation بـ Major GC التزايدي.' },
      { step: '04', title: 'تشريح خيوط Libuv و UV_THREADPOOL_SIZE', desc: 'ضبط حجم خيوط libuv الافتراضية (4 خيوط) بـ UV_THREADPOOL_SIZE=16 لتحسين أداء عمليات التشفير والملفات الثقيلة.' },
      { step: '05', title: 'تجنب تخصيص الذاكرة الزائدة بـ Object Pools', desc: 'إعادة استخدام كائنات الذاكرة والمصفوفات لتفادي إرهاق مجمع القمامة في المسارات فائقة التردد.' }
    ],
    playgroundCode: `// محاكي تأثير الأشكال الخفية (Hidden Classes) على تحسينات V8
class FastUser {
  constructor(id, name) {
    this.id = id;
    this.name = name; // دائماً نفس الترتيب ونفس البنية -> Monomorphic
  }
}

function slowObjectCreation(id, name, randomize) {
  const obj = {};
  if (randomize) {
    obj.name = name;
    obj.id = id; // تغيير ترتيب الحقول يكسر الـ Hidden Class في V8!
  } else {
    obj.id = id;
    obj.name = name;
  }
  return obj;
}

console.log("V8 Monomorphic Fast Object:", new FastUser("u1", "Sarah"));
console.log("V8 Deoptimized Polymorphic Object:", slowObjectCreation("u2", "Ahmed", true));`,
    experimentQuestion: 'لماذا يعتبر استخدام delete obj.prop نمطاً بطيئاً جداً في V8 ويجب استبداله بـ obj.prop = undefined؟',
    experimentAnswer: 'استخدام عامل delete يغير البنية الهيكلية للكائن في الذاكرة بشكل جذري، مما يجبر V8 على تغيير الـ Hidden Class الخاصة به وتحويل الكائن إلى وضع القاموس البطيء (Slow Dictionary / Hash Mode)، مما يلغي كافة تحسينات Turbofan في الوصول السريع للخصائص. استبدال القيمة بـ obj.prop = undefined أو null يحافظ على نفس الـ Shape الثابت ويضمن استمرار التحسينات فائقة السرعة.',
    codeAnatomy: [
      { line: '// Optimized High-Performance Buffer Allocation in Node.js', note: 'كود فائق السرعة' },
      { line: 'import { Buffer } from "node:buffer";', note: 'وحدة الـ Buffer الأصلية' },
      { line: 'export function processNetworkChunks(size: number) {', note: 'دالة معالجة سريعة' },
      { line: '  // Buffer.allocUnsafe يخصص الذاكرة فوراً في الـ RAM دون ملئها بأصفار', note: 'تخصيص فوري بدون تكلفة التصفير' },
      { line: '  const buf = Buffer.allocUnsafe(size); // 10x faster than Buffer.alloc', note: 'أسرع بـ 10 أضعاف' },
      { line: '  // يجب كتابة البيانات فوراً لمنع تسريب بايتات قديمة من الذاكرة', note: 'مراعاة الأمان' },
      { line: '  buf.fill(0, 0, size);', note: 'ملء آمن' },
      { line: '  return buf;', note: 'إرجاع الـ Buffer' },
      { line: '}', note: 'نهاية الدالة' }
    ],
    pitfallBad: `// خطأ مسبب لكسر تحسينات V8 (Deoptimization): إضافة خصائص ديناميكية عشوائية
function createUser(name) {
  const u = {};
  if (name) u.name = name; // يغير الـ Hidden Class باستمرار!
  return u;
}`,
    pitfallGood: `// الحل الأمثل لـ V8: تعريف وتثبيت كافة الخصائص في Constructor دائماً
class User {
  constructor(name = null) {
    this.name = name; // دائماً نفس الـ Shape الثابت بنسبة 100%
  }
}`,
    pitfallDiagnosis: 'تغيير شكل وترتيب الخصائص يكسر تحسينات V8 Inline Caches، بينما تثبيت الـ Shapes يحافظ على سرعة لغة الآلة.',
    quizPool: [
      {
        q: 'What is a "Hidden Class" (or Shape) in Google V8 Engine?',
        qAr: 'ما هي "الفئة الخفية" (Hidden Class / Shape) في محرك Google V8؟',
        options: [
          'An internal V8 data structure representing object layout in memory, allowing fast property access offsets like statically-typed languages.',
          'A class hidden in CSS.',
          'An encrypted JavaScript class.',
          'A private database table.'
        ],
        correct: 0,
        why: 'V8 uses Hidden Classes to bypass slow dictionary lookups, computing fast fixed memory offsets when object shapes are identical.',
        whyAr: 'بنية داخلية في V8 تمثل خريطة الكائن في الذاكرة وتتيح الوصول للخصائص بإزاحات ثابتة وسريعة مثل لغات C++ و Rust.'
      },
      {
        q: 'Why does "delete obj.property" degrade performance in V8 performance-critical code?',
        qAr: 'لماذا يؤدي استخدام "delete obj.property" إلى تراجع أداء الكود الحرج في V8؟',
        options: [
          'Forces V8 to alter the object\'s Hidden Class, deoptimizing the object into slow dictionary/hash-table mode.',
          'Causes immediate memory leaks.',
          'Terminates the Node.js process.',
          'Deletes the variable from RAM.'
        ],
        correct: 0,
        why: '`delete` mutates the shape, throwing the object out of fast inline-cache optimizations into generic dictionary mode.',
        whyAr: 'يغير بنية الكائن الهيكلية ويجبر V8 على تحويله لنمط القاموس البطيء وإلغاء تحسينات محرك Turbofan.'
      },
      {
        q: 'What is the default size of the Libuv Threadpool and how can it be adjusted for heavy crypto/fs workloads in Node.js?',
        qAr: 'ما هو الحجم الافتراضي لمجمع خيوط Libuv وكيف يتم تعديله للعمليات الثقيلة في Node.js؟',
        options: [
          'Default is 4 threads; adjusted by setting the UV_THREADPOOL_SIZE environment variable (e.g. UV_THREADPOOL_SIZE=16) before launch.',
          'Default is 100 threads; adjusted in package.json.',
          'Default is 1 thread; cannot be changed.',
          'Threads are managed by the browser.'
        ],
        correct: 0,
        why: 'Libuv defaults to 4 worker threads for async I/O/crypto; increasing UV_THREADPOOL_SIZE maximizes multi-core CPU utilization.',
        whyAr: 'الافتراضي هو 4 خيوط فقط، وتعديله عبر UV_THREADPOOL_SIZE يتيح تشغيل عدد أكبر من عمليات التشفير والملفات بالتوازي.'
      },
      {
        q: 'What does a "Stop-the-World" Garbage Collection pause mean in Node.js?',
        qAr: 'ماذا تعني وقفة "Stop-the-World" أثناء تنظيف الذاكرة في Node.js؟',
        options: [
          'Execution of all JavaScript code is completely paused while the V8 garbage collector marks and sweeps old generation memory.',
          'The server loses internet connection.',
          'The CPU clock speed drops to 0.',
          'All database connections are terminated.'
        ],
        correct: 0,
        why: 'Major GC cycles temporarily freeze the JavaScript main thread to safely relocate and reclaim fragmented heap memory blocks.',
        whyAr: 'توقف مؤقت لكامل تنفيذ كود جافاسكريبت على الخيط الرئيسي حتى ينتهي مجمع القمامة من فحص وتنظيف الذاكرة القديمة.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تستخدم مصفوفات ArrayBuffer و TypedArrays لتنفيذ معالجة بيانات ثنائية فائقة السرعة مع تجنب الـ Garbage Collector تماماً في Node.js؟',
    interviewA: 'نحجز كتلة ذاكرة مسبقة الحجم بـ const buffer = new ArrayBuffer(1024 * 1024) (1MB) وننشئ عليها مناظر من الأنواع المحددة مثل new Int32Array(buffer) أو new Float64Array(buffer). هذه المصفوفات تتعامل مع الذاكرة الخام المباشرة بدون إنشاء أي كائنات جافاسكريبت وسيطة (Zero JavaScript Object Allocations)، مما يلغي أي عمل على مجمع القمامة (0% GC Overhead) ويتيح معالجة ملايين البايتات الحسابية بسرعة لغات C/C++ مباشرة.'
  },
  {
    slug: 'observability-monitoring',
    title: 'Observability & Monitoring: The Three Pillars (Metrics, Logs, Traces), Prometheus & Grafana',
    titleAr: 'المراقبة وقابلية الرصد (Observability): الركائز الثلاث (Metrics, Logs, Traces)، بروميثيوس وجرافانا',
    level: 3,
    order: 18,
    estMinutes: 35,
    version: 'OpenTelemetry & Prometheus Core',
    pattern: 'Telemetry Pipeline & Site Reliability Engineering (SRE)',
    objectives: [
      'فهم الركائز الثلاث للمراقبة وقابلية الرصد (The Three Pillars of Observability: Metrics, Logs, Traces).',
      'بناء وتصدير مقاييس الأداء القياسية بـ Prometheus (Counters, Gauges, Histograms, Summaries).',
      'بناء لوحات المراقبة الحية في Grafana وتتبع مؤشرات الـ RED (Rate, Errors, Duration) و USE Metrics.',
      'تحديد اتفاقيات مستوى الخدمة (SLAs, SLOs, SLIs) وحساب ميزانية الخطأ (Error Budget) لفرق الـ SRE.'
    ],
    problemOpening: `
      في الأنظمة الموزعة الكبرى، لا تسأل: "هل سيتعطل النظام؟"، بل تسأل: **"متى سيتعطل النظام، وكيف سنكتشف السبب في أقل من 60 ثانية قبل أن يلاحظ العملاء؟"**.
      الفرق بين المطور المبتدئ ومهندس الـ SRE (Site Reliability Engineer) المحترف هو **قابلية الرصد (Observability)**:
      المبتدئ ينتظر حتى يشتكي العملاء على تويتر ليكتشف أن الداتابيز سقطت!
      أما مهندس الـ SRE فيبني **الركائز الثلاث للمراقبة (The Three Pillars)**:
      1. **المقاييس (Metrics)**: أرقام مجمعة فورية ترصد معدل الطلبات ونسبة الأخطاء بـ **Prometheus**.
      2. **السجلات (Logs)**: سجلات مفصلة بصيغة Structured JSON توثق سياق كل حدث بـ **Pino / ELK**.
      3. **التتبع الموزع (Distributed Traces)**: تتبع مسار كل طلب عبر 20 مايكروسيرفس بـ **OpenTelemetry / Jaeger**.
      في هذا الدرس، هنبني منظومة مراقبة متكاملة، وهنتعلم إزاي نحسب مؤشرات **RED Method** و **Error Budgets**.
    `,
    mechanics: [
      { step: '01', title: 'أنواع مقاييس بروميثيوس الأربعة (Prometheus Metric Types)', desc: 'Counters (عدادات تصاعدية مثل إجمالي الطلبات)، Gauges (قيم متغيرة صعوداً وهبوطاً كالذاكرة والاتصالات)، Histograms (توزيع أزمنة الاستجابة)، و Summaries.' },
      { step: '02', title: 'منهجية RED للخدمات (Rate, Errors, Duration)', desc: 'مراقبة معدل الطلبات/ثانية (Rate)، نسبة الأخطاء المئوية (Errors)، وزمن الاستجابة للنسبة 99% P99 (Duration).' },
      { step: '03', title: 'التتبع الموزع بـ OpenTelemetry Spans', desc: 'حقن Trace ID فريد يتنقل عبر كافة خوادم المايكروسيرفس لتوثيق زمن كل مرحلة في مخطط مائي موحد.' },
      { step: '04', title: 'معايير الـ SRE: حساب SLI, SLO, و Error Budget', desc: 'تحديد مؤشر الخدمة (SLI) والهدف المعتمد (SLO: e.g. 99.9% availability) واستخدام ميزانية الخطأ المتبقية لاتخاذ قرارات النشر.' },
      { step: '05', title: 'التنبيهات الذكية (Alertmanager)', desc: 'إرسال تنبيهات تلقائية إلى Slack و PagerDuty عند انخفاض الـ SLO دون إزعاج الفريق بإنذارات كاذبة.' }
    ],
    playgroundCode: `// محاكي عدادات ومقاييس Prometheus في Node.js
class MockPrometheusMetrics {
  constructor() {
    this.httpRequestsTotal = new Map();
    this.activeConnectionsGauge = 0;
  }

  incRequests(method, route, statusCode) {
    const key = \`method="\${method}",route="\${route}",status="\${statusCode}"\`;
    this.httpRequestsTotal.set(key, (this.httpRequestsTotal.get(key) || 0) + 1);
  }

  setGauge(active) { this.activeConnectionsGauge = active; }

  scrapeMetrics() {
    let output = "# HELP http_requests_total Total number of HTTP requests.\\n# TYPE http_requests_total counter\\n";
    for (const [labels, count] of this.httpRequestsTotal.entries()) {
      output += \`http_requests_total{\${labels}} \${count}\\n\`;
    }
    output += \`\\n# TYPE active_connections gauge\\nactive_connections \${this.activeConnectionsGauge}\\n\`;
    return output;
  }
}

const prom = new MockPrometheusMetrics();
prom.incRequests("GET", "/api/users", 200);
prom.incRequests("GET", "/api/users", 200);
prom.incRequests("POST", "/api/checkout", 500);
prom.setGauge(42);

console.log("Prometheus Scrape Endpoint Output (/metrics):");
console.log(prom.scrapeMetrics());`,
    experimentQuestion: 'لماذا يعتبر قياس متوسط زمن الاستجابة (Average / Mean Latency) مقياساً مضللاً جداً في الخوادم، ولماذا نستخدم بدلاً منه الـ P95 و P99 Percentiles؟',
    experimentAnswer: 'المتوسط الحسابي يخفي الكوارث! لو كان لديك 99 مستخدماً استجاب لهم السيرفر في 10ms، ومستخدم واحد استجاب له السيرفر في 10,000ms (10 ثوانٍ)، فإن المتوسط سيظهر كـ 109ms فقط، مما يعطي انطباعاً زائفاً بأن السيرفر ممتاز! مقياس الـ P99 Percentile يوضح أسوأ زمن عانى منه أبطأ 1% من المستخدمين (10,000ms)، مما يكشف الاختناقات الحقيقية لمهندسي الـ SRE.',
    codeAnatomy: [
      { line: '// Enterprise Prometheus Metrics Endpoint in Express', note: 'مسار المقاييس الرسمي' },
      { line: 'import client from "prom-client";', note: 'مكتبة بروميثيوس الرسمية' },
      { line: 'const collectDefaultMetrics = client.collectDefaultMetrics;', note: 'جمع مقاييس النظام تلقائياً' },
      { line: 'collectDefaultMetrics({ prefix: "node_server_" }); // RAM, CPU, EventLoop', note: 'بدء الرصد' },
      { line: 'export const httpRequestDurationMicroseconds = new client.Histogram({', note: 'إنشاء مدرج تكراري للأزمنة' },
      { line: '  name: "http_request_duration_seconds",', note: 'اسم المقياس' },
      { line: '  help: "Duration of HTTP requests in seconds",', note: 'الوصف' },
      { line: '  labelNames: ["method", "route", "status_code"],', note: 'الحقول الوصفية' },
      { line: '  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5] // فترات زمنية دقيقة', note: 'نطاقات القياس' },
      { line: '});', note: 'نهاية المقياس' }
    ],
    pitfallBad: `// خطأ شائع: استخدام High-Cardinality Labels في مقاييس Prometheus
httpRequestDuration.labels(req.method, req.url, req.user.id); // إضافة user.id ينشئ ملايين المقاييس ويسقط ذاكرة Prometheus!`,
    pitfallGood: `// الحل الهندسي: استخدام Low-Cardinality Labels محددة المسار فقط
httpRequestDuration.labels(req.method, req.route.path, res.statusCode);`,
    pitfallDiagnosis: 'استخدام قيم فريدة كـ Labels يسبب ظاهرة الـ Cardinality Explosion في بروميثيوس، ويجب حصرها في مسارات ثابتة.',
    quizPool: [
      {
        q: 'What are the Three Pillars of Observability in modern site reliability engineering (SRE)?',
        qAr: 'ما هي الركائز الثلاث لقابلية الرصد (The Three Pillars of Observability) في هندسة الموثوقية (SRE)؟',
        options: [
          'Metrics (aggregated numerical measurements), Logs (detailed contextual event records), and Distributed Traces (end-to-end request lifecycle paths).',
          'HTML, CSS, and JavaScript.',
          'CPU, RAM, and Hard Drive.',
          'Development, Staging, and Production.'
        ],
        correct: 0,
        why: 'Metrics, Logs, and Traces complement each other to detect, isolate, and debug failures across distributed microservices.',
        whyAr: 'المقاييس والسجلات والتتبع الموزع تكمل بعضها البعض لاكتشاف الأعطال وعزلها وتصحيحها في الأنظمة الموزعة.'
      },
      {
        q: 'What does the P99 (99th Percentile) latency metric represent in service monitoring?',
        qAr: 'ماذا يمثل مقياس زمن الاستجابة P99 (99th Percentile) في مراقبة الخدمات؟',
        options: [
          'The maximum response time experienced by the slowest 1% of all user requests (99% of requests were faster than this threshold).',
          'The average response time of the top 99 users.',
          'The percentage of server CPU usage.',
          'The number of requests per second.'
        ],
        correct: 0,
        why: 'P99 isolates tail latency experienced by the slowest 1% of users, highlighting severe outlier bottlenecks hidden by averages.',
        whyAr: 'يمثل أقصى زمن استجابة عانى منه أبطأ 1% من المستخدمين مما يكشف الاختناقات الحقيقية التي تخفيها المتوسطات الحسابية.'
      },
      {
        q: 'What does the RED Method stand for in microservice monitoring?',
        qAr: 'إلى ماذا تشير اختصارات منهجية RED في مراقبة خدمات المايكروسيرفس؟',
        options: [
          'Rate (number of requests per second), Errors (number of failing requests), Duration (amount of time requests take).',
          'Read, Edit, Delete.',
          'Random, Encrypted, Distributed.',
          'Recovery, Execution, Deployment.'
        ],
        correct: 0,
        why: 'The RED method (Rate, Errors, Duration) is the gold standard framework for monitoring request-driven microservice architectures.',
        whyAr: 'منهجية RED تركز على: معدل الطلبات (Rate)، نسبة الأخطاء (Errors)، وزمن الاستجابة (Duration) كمعيار ذهبي للمراقبة.'
      },
      {
        q: 'What is an "Error Budget" in Site Reliability Engineering (SRE)?',
        qAr: 'ما هي "ميزانية الخطأ" (Error Budget) في ممارسات هندسة الموثوقية (SRE)؟',
        options: [
          'The allowable amount of downtime or failures a service can accumulate (e.g. 0.1% for a 99.9% SLO) before deployments are halted to focus on stability.',
          'The financial cost of buying new servers.',
          'The salary budget for developers.',
          'The number of lines of buggy code permitted.'
        ],
        correct: 0,
        why: 'Error Budget (1 - SLO) provides a quantifiable balance between developer feature velocity and operational reliability requirements.',
        whyAr: 'هي نسبة التوقف أو الأخطاء المسموح بها للخدمة (1 - SLO)؛ فإذا استنفدت الميزانية يتم تجميد النشر للتركيز على استقرار النظام.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: ما هو الفرق بين Black-box Monitoring و White-box Monitoring ومتى تستخدم كلاً منهما؟',
    interviewA: 'الـ Black-box Monitoring (المراقبة الخارجية كصندوق أسود): تقوم بفحص النظام من الخارج تماماً كما يراه المستخدم (مثل اختبارات Uptime Pings، فحص استجابة DNS، أو محاكاة تسجيل دخول مستخدم حقيقي بـ Synthetic Testing). الـ White-box Monitoring (المراقبة الداخلية كصندوق أبيض): تقوم بفحص أحشاء النظام الداخلية ومكوناته الدقيقة بالاعتماد على الـ Metrics والـ Logs والـ Traces المنبعثة من داخل كود التطبيق (مثل استهلاك V8 Heap، عدد اتصالات DB Pool، وأزمنة استعلامات SQL). نحتاج الاثنين معاً: Black-box يخبرك "هل هناك عطل يؤثر على العميل الآن؟"، و White-box يخبرك "أين يقع العطل بالتحديد ولماذا حدث؟".'
  },
  {
    slug: 'ci-cd-devops',
    title: 'Enterprise CI/CD & DevOps: GitHub Actions, Docker Multi-Stage Builds & Zero-Downtime Deployment',
    titleAr: 'خطوط الـ CI/CD والـ DevOps المؤسسية: سير عمل GitHub Actions، بناء Docker متعدد المراحل والنشر بدون توقف',
    level: 3,
    order: 19,
    estMinutes: 35,
    version: 'GitHub Actions & Docker Multi-Stage',
    pattern: 'DevOps Automation & Progressive Delivery',
    objectives: [
      'بناء خطوط نشر وتكامل مستمر مؤتمتة بنسبة 100% باستخدام GitHub Actions Pipelines.',
      'تصغير وتأمين صور Docker باستخدام تقنية البناء متعدد المراحل (Multi-Stage Builds) مع مستخدم غير جذري (Non-root user).',
      'إتقان استراتيجيات النشر الحديثة دون توقف الخدمة: النشر الأزرق/الأخضر (Blue-Green) والنشر الكناري (Canary Deployments).',
      'تطبيق بوابات الجودة الصارمة (Quality Gates: Linting, Unit Tests, Security Vulnerability Scans, Artifact Caching).'
    ],
    problemOpening: `
      في الشركات القديمة، كان نشر التحديث للإنتاج يتطلب اجتماعاً طارئاً يوم الخميس في منتصف الليل، ونسخ الملفات يدوياً عبر FTP أو SSH، مع إيقاف الموقع لساعتين وظهور صفحة "الموقع تحت الصيانة"!
      هذا الأسلوب البدائي انتهى تماماً في عصر **DevOps الحديث وخطوط الـ CI/CD المتقدمة**:
      الشركات العالمية تنشر تحديثات للإنتاج أكثر من 50 مرة في اليوم دون أن يشعر أي مستخدم بأي انقطاع (Zero-Downtime Deployments)!
      بمجرد دمج الـ Pull Request في Git:
      1. يقوم **GitHub Actions** بفحص الأكواد، تشغيل آلاف الاختبارات، وفحص الثغرات الأمنية (SAST Scanning).
      2. يتم بناء صورة **Docker Multi-Stage** مصغرة بحجم < 100MB وخالية من أدوات التطوير لتقليص مساحة الهجوم.
      3. يتم نشر الصورة عبر استراتيجية **Blue-Green** أو **Canary Deployment** التي تحول الزيارات تدريجياً بنسبة 5% ثم 100% مع إمكانية التراجع التلقائي (Automatic Rollback) في ثانية واحدة لو ارتفعت نسبة الأخطاء!
      في هذا الدرس الختامي للمسار المعماري، هنبني خط CI/CD مؤسسياً متكاملاً جاهزاً لبيئات الإنتاج.
    `,
    mechanics: [
      { step: '01', title: 'بناء خط الـ CI بـ GitHub Actions', desc: 'أتمتة مراحل التثبيت، التحقق من الأنواع tsc --noEmit، الفحص بـ ESLint، وتشغيل الاختبارات بـ Vitest مع كاش الحزم.' },
      { step: '02', title: 'بناء صور Docker متعددة المراحل (Multi-Stage Builds)', desc: 'مرحلة أولى لبناء TypeScript، ثم نسخ ملفات الـ JS الناتجة فقط إلى صورة الإنتاج النظيفة الخفيفة.' },
      { step: '03', title: 'تأمين الحاويات بمستخدم غير جذري (Non-root User)', desc: 'تشغيل عملية Node.js داخل Docker بمستخدم USER node لمنع المخترق من السيطرة على السيرفر في حال حدوث اختراق للـ Container.' },
      { step: '04', title: 'استراتيجية النشر الأزرق والأخضر (Blue-Green Deployment)', desc: 'تشغيل بيئتين متطابقتين بالكامل؛ وتحويل موجه الـ Load Balancer فورياً من البيئة القديمة (Blue) للجديدة (Green) في 0ms.' },
      { step: '05', title: 'النشر الكناري التدريجي (Canary Releases)', desc: 'توجيه 5% من الزيارات الحقيقية للنسخة الجديدة ومراقبة مؤشرات الـ P99 والأخطاء قبل تعميمها على باقي المستخدمين.' }
    ],
    playgroundCode: `// محاكي استراتيجية النشر الكناري (Canary Deployment Traffic Splitting)
class CanaryTrafficRouter {
  constructor(canaryWeightPercent = 10) {
    this.canaryWeightPercent = canaryWeightPercent;
    this.v1TrafficCount = 0;
    this.v2CanaryTrafficCount = 0;
  }

  routeRequest(userId) {
    // توجيه حتمي بناءً على نسبة الـ Weight
    const hash = Math.floor(Math.random() * 100);
    if (hash < this.canaryWeightPercent) {
      this.v2CanaryTrafficCount++;
      console.log(\`🐤 User [\${userId}] routed to NEW Canary Version (v2.0.0)\`);
      return "v2.0.0";
    } else {
      this.v1TrafficCount++;
      console.log(\`🛡️ User [\${userId}] routed to Stable Version (v1.9.4)\`);
      return "v1.9.4";
    }
  }
}

const router = new CanaryTrafficRouter(20); // 20% Canary Traffic
for (let i = 1; i <= 5; i++) router.routeRequest(\`usr_\${i}\`);`,
    experimentQuestion: 'لماذا يعتبر تقليص حجم صورة الـ Docker عبر تقنية Multi-Stage Build إجراءً أمنياً حاسماً وليس مجرد توفير في مساحة القرص؟',
    experimentAnswer: 'لأن الصور التقليدية غير المقسمة تحتوي على أدوات التطوير الكاملة (مثل C++ Compilers, Git, NPM CLI, DevDependencies, و Package Managers). إذا تمكن مخترق من الوصول إلى الـ Container عبر ثغرة RCE، يستطيع استخدام هذه الأدوات الجاهزة لتنزيل برمجيات خبيثة وبناء أسلحة اختراق! تقنية Multi-Stage تستبعد كل هذه الأدوات وتترك فقط ملفات الـ JS الصافية مع Node Runtime ومستخدم غير جذري، مما يقلص مساحة الهجوم الأمني (Attack Surface) بنسبة 95%.',
    codeAnatomy: [
      { line: '# Production-Grade Multi-Stage Dockerfile', note: 'ملف Dockerfile المؤسسي' },
      { line: 'FROM node:24-alpine AS builder', note: 'المرحلة 1: البناء والتجميع' },
      { line: 'WORKDIR /app', note: 'مجلد العمل' },
      { line: 'COPY package*.json ./', note: 'نسخ ملفات الحزم' },
      { line: 'RUN npm ci', note: 'تثبيت صارم ونظيف' },
      { line: 'COPY . .', note: 'نسخ الكود' },
      { line: 'RUN npm run build', note: 'بناء كود TypeScript' },
      { line: 'FROM node:24-alpine AS runner', note: 'المرحلة 2: صورة الإنتاج الخفيفة النظيفة' },
      { line: 'WORKDIR /app', note: 'مجلد الإنتاج' },
      { line: 'ENV NODE_ENV=production', note: 'تفعيل بيئة الإنتاج' },
      { line: 'COPY --from=builder /app/dist ./dist', note: 'نسخ الكود المبني فقط' },
      { line: 'COPY --from=builder /app/node_modules ./node_modules', note: 'نسخ الاعتماديات فقط' },
      { line: 'USER node', note: '🔒 التشغيل بمستخدم غير جذري للأمان' },
      { line: 'EXPOSE 3000', note: 'منفذ التطبيق' },
      { line: 'CMD ["node", "dist/server.js"]', note: 'تشغيل الخادم' }
    ],
    pitfallBad: `// خطأ أمني كارثي: تشغيل Container بامتيازات الـ Root الافتراضية
// لو حدث اختراق للكود، يستطيع المهاجم الوصول لكامل ملفات السيرفر المضيف!`,
    pitfallGood: `// الحل الأمني المعتمد: استخدام USER node داخل Dockerfile
USER node
CMD ["node", "dist/server.js"]`,
    pitfallDiagnosis: 'التشغيل بمستخدم Root يمنح المخترق صلاحيات كاملة، بينما مستخدم node يحصر الصلاحيات في أضيق الحدود.',
    quizPool: [
      {
        q: 'What is the primary benefit of Docker Multi-Stage builds for production backend deployments?',
        qAr: 'ما هي الفائدة الأساسية لتقنية Docker Multi-Stage Builds في نشر خوادم الإنتاج؟',
        options: [
          'Separates the build environment from the runtime environment, producing tiny, hardened production images containing only compiled artifacts and zero build tooling.',
          'Runs containers on Windows and Linux simultaneously.',
          'Compresses database records.',
          'Translates Docker to Kubernetes.'
        ],
        correct: 0,
        why: 'Multi-stage builds eliminate compilers, devDependencies, and build tools from final images, drastically reducing size and attack surface.',
        whyAr: 'تفصل بيئة البناء عن بيئة التشغيل وتنتج صور إنتاج مصغرة ومحصنة أمنياً تحتوي فقط على الأكواد المترجمة بدون أدوات التطوير.'
      },
      {
        q: 'What is the key mechanism of Blue-Green Zero-Downtime Deployment?',
        qAr: 'ما هي الآلية الجوهرية لاستراتيجية النشر الأزرق/الأخضر (Blue-Green Deployment) دون انقطاع؟',
        options: [
          'Maintains two identical production environments (Blue and Green); the router/load balancer instantly flips incoming traffic to the newly deployed environment.',
          'Restarts the database server.',
          'Changes the website color theme to green.',
          'Deploys code only at midnight.'
        ],
        correct: 0,
        why: 'Blue-Green allows testing the new version live in isolation before flipping load balancer routing in 0ms, enabling instant rollback if needed.',
        whyAr: 'تحافظ على بيئتين متطابقتين، وتحول الزيارات في الـ Load Balancer فورياً إلى البيئة الجديدة في 0ms مع إمكانية التراجع الفوري.'
      },
      {
        q: 'Why should Node.js containers in production run under a non-root user (e.g. "USER node")?',
        qAr: 'لماذا يجب تشغيل حاويات Node.js في الإنتاج بمستخدم غير جذري (USER node)؟',
        options: [
          'Prevents container breakout exploits, ensuring attackers cannot gain root host filesystem privileges if the application is compromised.',
          'Required by Google Chrome.',
          'Makes Node.js execute faster.',
          'Encrypts memory buffers.'
        ],
        correct: 0,
        why: 'Enforcing non-root execution restricts compromised application processes from gaining administrative access to the host kernel.',
        whyAr: 'يمنع هجمات الهروب من الحاوية ويضمن عدم قدرة المخترق على الحصول على صلاحيات Root على السيرفر المضيف.'
      },
      {
        q: 'What is a Canary Deployment strategy?',
        qAr: 'ما هي استراتيجية النشر الكناري (Canary Deployment)؟',
        options: [
          'Rolling out new software versions to a small subset of real users (e.g. 5%) first, monitoring telemetry metrics before full rollout.',
          'Testing code on staging servers only.',
          'Writing unit tests for birds.',
          'Deploying without tests.'
        ],
        correct: 0,
        why: 'Canary releases expose updates to limited live traffic to validate reliability against production metrics before widespread rollout.',
        whyAr: 'نشر النسخة الجديدة لنسبة ضئيلة من المستخدمين الحقيقيين (مثل 5%) ومراقبة مؤشرات الأداء والأخطاء قبل تعميمها على الكل.'
      }
    ],
    interviewQ: 'سؤال إنترفيو للمهندسين الكبار: كيف تصمم خط نشر متقدم (GitOps Pipeline) باستخدام ArgoCD و Kubernetes لتطبيق ميزة التراجع الآلي (Automated Rollback) عند ارتفاع نسبة الأخطاء عن 1%؟',
    interviewA: 'نطبق معمارية GitOps مع ArgoCD و Argo Rollouts: 1. نحدد استراتيجية النشر كـ Canary في ملف rollout.yaml مع إضافة AnalysisTemplate. 2. يراقب الـ AnalysisTemplate مقاييس Prometheus الحية (PromQL: sum(rate(http_requests_total{status=~"5.*"}[2m])) / sum(rate(http_requests_total[2m])) * 100). 3. يبدأ النشر بنسبة 10% من الزيارات لمدة 5 دقائق. 4. إذا ظلت نسبة الأخطاء < 1%، يرفع ArgoCD النسبة تدريجياً لـ 50% ثم 100%. 5. إذا ارتفعت نسبة الأخطاء في أي لحظة عن 1% أو زاد زمن الـ P99 Latency عن 500ms، يقوم Argo Rollouts بوقف النشر فورياً وإرجاع الزيارات للنسخة السابقة المستقرة آلياً في 0ms مع إرسال تنبيه لفريق الـ SRE.'
  }
];
