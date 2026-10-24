import type { LocaleText } from "./types";

/**
 * DevReady daily challenges — bilingual interview questions across the whole
 * web-dev surface. The "today" challenge is picked deterministically from the
 * calendar date, so every device sees the same challenge on the same day.
 */

export type ChallengeType = "theory" | "coding" | "system" | "behavioral";
export type ChallengeTopic =
  | "javascript"
  | "typescript"
  | "react"
  | "css"
  | "backend"
  | "database"
  | "system"
  | "security"
  | "testing"
  | "performance"
  | "ai"
  | "a11y"
  | "behavioral";

export interface Challenge {
  /** Stable id (also used as the archive anchor). */
  id: string;
  type: ChallengeType;
  topic: ChallengeTopic;
  /** 1 = warm-up, 2 = standard, 3 = senior-level. */
  difficulty: 1 | 2 | 3;
  question: LocaleText;
  /** Progressive hints, cheapest first. */
  hints: LocaleText[];
  /** Model answer — bullet points the candidate should hit. */
  answer: LocaleText[];
  /** Category to continue studying when the challenge exposes a gap. */
  categoryId?: string;
}

export const CHALLENGE_TOPIC_LABELS: Record<ChallengeTopic, LocaleText> = {
  javascript: { en: "JavaScript", fa: "جاوااسکریپت" },
  typescript: { en: "TypeScript", fa: "تایپ‌اسکریپت" },
  react: { en: "React", fa: "ریکت" },
  css: { en: "HTML & CSS", fa: "HTML و CSS" },
  backend: { en: "Node & APIs", fa: "نود و APIها" },
  database: { en: "Databases", fa: "پایگاه داده" },
  system: { en: "System Design", fa: "طراحی سیستم" },
  security: { en: "Security", fa: "امنیت" },
  testing: { en: "Testing", fa: "تست" },
  performance: { en: "Performance", fa: "کارایی" },
  ai: { en: "AI Tooling", fa: "ابزارهای هوش مصنوعی" },
  a11y: { en: "Accessibility", fa: "دسترس‌پذیری" },
  behavioral: { en: "Behavioral", fa: "رفتاری" },
};

export const challenges: Challenge[] = [
  // ────────────────────────────── JavaScript ──────────────────────────────
  {
    id: "js-event-loop",
    type: "theory",
    topic: "javascript",
    difficulty: 2,
    question: {
      en: "Walk through the event loop. Given setTimeout(fn, 0), a resolved Promise.then(fn), and a synchronous console.log — in what order do they run, and why?",
      fa: "ایونت‌لوپ را توضیح دهید. با توجه به setTimeout(fn, 0)، یک Promise.then(fn) حل‌شده و یک console.log همزمان — به چه ترتیبی اجرا می‌شوند و چرا؟",
    },
    hints: [
      {
        en: "There are two queues: the macrotask (callback) queue and the microtask queue — microtasks drain completely between macrotasks.",
        fa: "دو صف داریم: صف ماکروتسک (کال‌بک) و صف میکروتسک — میکروتسک‌ها بین ماکروتسک‌ها کاملاً تخلیه می‌شوند.",
      },
      {
        en: "setTimeout always schedules a macrotask; Promise callbacks are microtasks.",
        fa: "setTimeout همیشه یک ماکروتسک زمان‌بندی می‌کند؛ کال‌بک‌های Promise میکروتسک هستند.",
      },
    ],
    answer: [
      {
        en: "Synchronous code runs first: the console.log fires immediately on the main thread.",
        fa: "کد همزمان اول اجرا می‌شود: console.log بلافاصله روی نخ اصلی اجرا می‌شود.",
      },
      {
        en: "Promise.then callbacks go to the microtask queue, which is drained right after the current synchronous work — before any macrotask.",
        fa: "کال‌بک‌های Promise.then به صف میکروتسک می‌روند که بلافاصله بعد از کار همزمان فعلی — و قبل از هر ماکروتسک — تخلیه می‌شود.",
      },
      {
        en: "setTimeout(fn, 0) is a macrotask; even with a 0ms delay it runs after all pending microtasks, and never earlier than the next tick.",
        fa: "setTimeout(fn, 0) یک ماکروتسک است؛ حتی با تأخیر صفر بعد از همه میکروتسک‌های در انتظار اجرا می‌شود و هیچ‌وقت زودتر از تیک بعدی نیست.",
      },
      {
        en: "Order: console.log → Promise.then → setTimeout. Mentioning rendering happens between tasks and that microtasks can starve rendering earns bonus points.",
        fa: "ترتیب: console.log ← Promise.then ← setTimeout. اگر بگویید رندر بین تسک‌ها اتفاق می‌افتد و میکروتسک‌ها می‌توانند رندر را گرسنه کنند، امتیاز مثبت می‌گیرید.",
      },
    ],
    categoryId: "javascript",
  },
  {
    id: "js-closures-counter",
    type: "coding",
    topic: "javascript",
    difficulty: 2,
    question: {
      en: "Implement createCounter() so that const { inc, get } = createCounter() keeps a private count: inc() adds 1 and get() returns it. Then explain why the variable survives between calls.",
      fa: "createCounter() را طوری بنویسید که const { inc, get } = createCounter() یک شمارنده خصوصی داشته باشد: inc() یکی اضافه می‌کند و get() برمی‌گرداند. سپس توضیح دهید چرا متغیر بین فراخوانی‌ها زنده می‌ماند.",
    },
    hints: [
      { en: "A closure is a function bundled with references to its surrounding lexical scope.", fa: "کلیژر یعنی تابعی که همراه با ارجاع‌هایی به محیط لغی اطرافش بسته‌بندی شده است." },
    ],
    answer: [
      {
        en: "let count = 0; return { inc: () => ++count, get: () => count }; Both returned functions close over the same count binding.",
        fa: "let count = 0; return { inc: () => ++count, get: () => count }; هر دو تابعِ بازگشتی به همان binding شمارنده کلیژر دارند.",
      },
      {
        en: "The variable survives because the lexical environment is kept alive as long as any function referencing it is reachable — garbage collection cannot free it.",
        fa: "متغیر زنده می‌ماند چون محیط لغی تا زمانی که تابعی به آن ارجاع دارد و قابل‌دسترس است، نگه داشته می‌شود — جمع‌آوری زباله نمی‌تواند آزادش کند.",
      },
      {
        en: "This is the classic pattern for private state without classes; mention WeakMap or #private fields as modern alternatives.",
        fa: "این الگوی کلاسیک state خصوصی بدون کلاس است؛ ذکر WeakMap یا فیلدهای #private به‌عنوان جایگزین‌های مدرن امتیاز دارد.",
      },
      {
        en: "Common follow-up: what breaks if you use var in a loop with closures — and the fix (let creates a fresh binding per iteration).",
        fa: "سوال رایج بعدی: اگر در حلقه با var و کلیژر چه مشکلی پیش می‌آید — و راه‌حل (let به‌ازای هر تکرار یک binding تازه می‌سازد).",
      },
    ],
    categoryId: "javascript",
  },
  {
    id: "js-coercion-equality",
    type: "theory",
    topic: "javascript",
    difficulty: 1,
    question: {
      en: "Why does 0.1 + 0.2 !== 0.3 evaluate to true in JavaScript, and why does '5' + 3 give '53' but '5' - 3 give 2? What should you use instead of ==?",
      fa: "چرا عبارت 0.1 + 0.2 !== 0.3 در جاوااسکریپت درست است؟ و چرا '5' + 3 نتیجه '53' می‌دهد ولی '5' - 3 نتیجه 2؟ به‌جای == چه چیزی باید استفاده کرد؟",
    },
    hints: [
      { en: "One answer lives in IEEE-754; the other in the difference between the + algorithm and every other arithmetic operator.", fa: "یک پاسخ در IEEE-754 است؛ دیگری در تفاوت الگوریتم عملگر + با بقیه عملگرهای حسابی." },
    ],
    answer: [
      {
        en: "0.1 and 0.2 cannot be represented exactly in binary floating point (IEEE-754), so the sum is 0.30000000000000004. Compare with an epsilon or use toFixed/Object.is where appropriate.",
        fa: "عدد 0.1 و 0.2 در ممیز شناور دودویی (IEEE-754) دقیق نمایش داده نمی‌شوند، پس جمع می‌شود 0.30000000000000004. مقایسه را با اپسیلون یا در جای مناسب با toFixed/Object.is انجام دهید.",
      },
      {
        en: "+ is overloaded: if either operand is a string, both are coerced to strings and concatenated ('5' + 3 → '53'). The - operator has no string mode, so '5' is coerced to a number (5 - 3 → 2).",
        fa: "عملگر + بارگذاری شده است: اگر یکی از عملوندها رشته باشد، هر دو به رشته تبدیل و چسبانده می‌شوند ('5' + 3 ← '53'). عملگر - حالت رشته‌ای ندارد، پس '5' به عدد تبدیل می‌شود (5 - 3 ← 2).",
      },
      {
        en: "Prefer === (or Object.is for NaN/+0 corner cases). If you must use ==, know the coercion table — but interviewers mostly want to hear 'strict equality by default'.",
        fa: "ترجیحاً از === استفاده کنید (یا Object.is برای حالت‌های خاص NaN/+0). اگر مجبور به استفاده از == هستید، جدول تبدیل نوع را بدانید — اما بیشتر مصاحبه‌گرها می‌خواهند بشنوند «به‌صورت پیش‌فرض برابری سخت‌گیرانه».",
      },
    ],
    categoryId: "javascript",
  },
  {
    id: "js-debounce-throttle",
    type: "coding",
    topic: "javascript",
    difficulty: 2,
    question: {
      en: "Implement debounce(fn, wait) from scratch and explain when you would choose throttle instead. Give a concrete UI example of each.",
      fa: "تابع debounce(fn, wait) را از صفر پیاده‌سازی کنید و توضیح دهید چه زمانی throttle انتخاب بهتری است. برای هر کدام یک مثال واقعی UI بزنید.",
    },
    hints: [
      { en: "Debounce stores a timeout id and clears it on every call; throttle stores a last-run timestamp.", fa: "دیبانس یک شناسه تایمر نگه می‌دارد و با هر فراخوانی پاکش می‌کند؛ تروتل آخرین زمان اجرا را ذخیره می‌کند." },
    ],
    answer: [
      {
        en: "Debounce: function debounce(fn, wait) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; } — it runs once, after calls stop.",
        fa: "دیبانس: function debounce(fn, wait) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; } — فقط یک بار، بعد از قطع شدن فراخوانی‌ها اجرا می‌شود.",
      },
      {
        en: "Throttle guarantees at most one run per interval while events keep firing — use it for scroll handlers, resize, or mousemove-driven drag.",
        fa: "تروتل تضمین می‌کند در هر بازه حداکثر یک بار اجرا شود حتی اگر ایونت ادامه داشته باشد — برای هندلر اسکرول، resize یا درگ با mousemove مناسب است.",
      },
      {
        en: "Debounce examples: search-as-you-type requests, autosave, form validation. Throttle examples: infinite scroll loading, analytics tracking, parallax.",
        fa: "مثال‌های دیبانس: درخواست جستجو هنگام تایپ، ذخیره خودکار، اعتبارسنجی فرم. مثال‌های تروتل: بارگذاری اسکرول بی‌نهایت، رصد آمار، افکت پارالاکس.",
      },
      {
        en: "Bonus: mention cancel() on the returned wrapper, leading-edge options, and cleanup on unmount in React.",
        fa: "امتیاز اضافه: متد cancel() روی تابع بازگشتی، گزینه leading-edge و پاک‌سازی هنگام unmount در ریکت.",
      },
    ],
    categoryId: "javascript",
  },

  // ────────────────────────────── TypeScript ──────────────────────────────
  {
    id: "ts-unknown-vs-any",
    type: "theory",
    topic: "typescript",
    difficulty: 1,
    question: {
      en: "What is the practical difference between unknown and any in TypeScript, and where should each be used in a public API?",
      fa: "تفاوت عملی unknown و any در تایپ‌اسکریپت چیست و هر کدام کجای یک API عمومی باید استفاده شوند؟",
    },
    hints: [
      { en: "any disables checking; unknown keeps it — you must narrow before use.", fa: "any چک کردن را خاموش می‌کند؛ unknown حفظش می‌کند — قبل از استفاده باید نوع را محدود کنید." },
    ],
    answer: [
      {
        en: "any opts out of the type system: any property access, any call, assignable everywhere. unknown is the type-safe top type: assignable from anything, but you must narrow (typeof, instanceof, a guard) before using it.",
        fa: "any از سیستم تایپ خارج می‌شود: هر دسترسی به پراپرتی، هر فراخوانی، قابل انتساب به هر جا. unknown امن‌ترین تایپ بالادستی است: از هر چیزی قابل انتساب است، اما قبل از استفاده باید محدودش کنید (typeof، instanceof یا یک type guard).",
      },
      {
        en: "Public API inputs that accept arbitrary data (JSON.parse results, event payloads) should be typed unknown — it pushes the burden of proof to the consumer, documented and enforced.",
        fa: "ورودی‌های API عمومی که داده دلخواه می‌پذیرند (نتیجه JSON.parse، payload ایونت‌ها) باید unknown تایپ شوند — بار اثبات به مصرف‌کننده منتقل می‌شود؛ مستند و اجباری.",
      },
      {
        en: "any is acceptable only at the edges where types are truly unknowable (legacy interop) and should carry an eslint-disable comment explaining why.",
        fa: "any فقط در لبه‌هایی که تایپ واقعاً ناشناخته است (interop با کد قدیمی) قابل قبول است و باید با کامنت eslint-disable و توضیح همراه شود.",
      },
    ],
    categoryId: "javascript",
  },
  {
    id: "ts-generics-constraints",
    type: "coding",
    topic: "typescript",
    difficulty: 3,
    question: {
      en: "Write a generic pluck<T, K extends keyof T>(items: T[], key: K): T[K][] and explain what the constraint buys you. What happens without `extends keyof T`?",
      fa: "تابع جنریک pluck<T, K extends keyof T>(items: T[], key: K): T[K][] را بنویسید و توضیح دهید محدودیت چه چیزی به شما می‌دهد. بدون `extends keyof T` چه می‌شود؟",
    },
    hints: [
      { en: "The constraint links K to the keys of T, so typos become compile errors and the return type stays precise.", fa: "محدودیت، K را به کلیدهای T گره می‌زند؛ بنابراین غلط تایپی خطای کامپایل می‌شود و تایپ خروجی دقیق می‌ماند." },
    ],
    answer: [
      {
        en: "function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] { return items.map(i => i[key]); }",
        fa: "function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] { return items.map(i => i[key]); }",
      },
      {
        en: "The constraint makes illegal keys a compile-time error (pluck(users, 'emial') fails to compile) instead of a silent undefined at runtime.",
        fa: "محدودیت باعث می‌شود کلیدهای نامعتبر خطای زمان کامپایل باشند (pluck(users, 'emial') کامپایل نمی‌شود) نه یک undefined بی‌صدا در زمان اجرا.",
      },
      {
        en: "The return type T[K][] stays correlated with the input key — pluck(users, 'age') is number[], not any[]. That correlation is the whole point of generic constraints.",
        fa: "تایپ خروجی T[K][] با کلید ورودی همبسته می‌ماند — pluck(users, 'age') عدد[] است نه any[]. این همبستگی، فلسفه اصلی محدودیت‌های جنریک است.",
      },
      {
        en: "Without the constraint you would need K = string and the result would degrade to any[] or T[keyof T][] — losing both safety and autocomplete.",
        fa: "بدون محدودیت باید K را string می‌گرفتید و خروجی به any[] یا T[keyof T][] تنزل می‌کرد — هم ایمنی و هم autocomplete از دست می‌رود.",
      },
    ],
    categoryId: "javascript",
  },
  {
    id: "ts-utility-types",
    type: "theory",
    topic: "typescript",
    difficulty: 2,
    question: {
      en: "Given a User interface, how would you derive CreateUserDto (no id), UpdateUserDto (all fields optional), and PublicUser (no passwordHash) in TypeScript — without duplicating fields?",
      fa: "با داشتن یک اینترفیس User، چگونه در تایپ‌اسکریپت بدون تکرار فیلدها، CreateUserDto (بدون id)، UpdateUserDto (همه فیلدها اختیاری) و PublicUser (بدون passwordHash) را مشتق می‌کنید؟",
    },
    hints: [
      { en: "Omit, Partial and Pick compose: start from the base type and slice it.", fa: "Omit و Partial و Pick با هم ترکیب می‌شوند: از تایپ پایه شروع کنید و برش بزنید." },
    ],
    answer: [
      {
        en: "type CreateUserDto = Omit<User, 'id'>; type UpdateUserDto = Partial<User>; type PublicUser = Omit<User, 'passwordHash'>.",
        fa: "type CreateUserDto = Omit<User, 'id'>; type UpdateUserDto = Partial<User>; type PublicUser = Omit<User, 'passwordHash'>.",
      },
      {
        en: "Derived types stay in sync when the base changes — add a field to User and every DTO inherits it with the right optionality. This is the core maintenance argument for utility types.",
        fa: "تایپ‌های مشتق‌شده با تغییر تایپ پایه همگام می‌مانند — یک فیلد به User اضافه کنید و همه DTOها با اختیاری/اجباری درست، آن را به ارث می‌برند. استدلال اصلی نگه‌داریِ تایپ‌های کاربردی همین است.",
      },
      {
        en: "Mention composition (Readonly<UpdateUserDto>), template literal types for event names, and discriminated unions as the next level of modelling.",
        fa: "به ترکیب (Readonly<UpdateUserDto>)، تایپ‌های template literal برای نام ایونت‌ها و اتحادهای متمایزکننده به‌عنوان سطح بعدی مدل‌سازی اشاره کنید.",
      },
    ],
    categoryId: "javascript",
  },

  // ────────────────────────────── React ──────────────────────────────
  {
    id: "react-keys-reconciliation",
    type: "theory",
    topic: "react",
    difficulty: 2,
    question: {
      en: "Why does React need stable, unique keys in lists? What specifically breaks when you use the array index as a key on a reorderable list?",
      fa: "چرا ریکت به کلیدهای یکتا و پایدار در لیست‌ها نیاز دارد؟ وقتی در لیستی که جابه‌جایی می‌شود از ایندکس آرایه به‌عنوان کلید استفاده کنید، دقیقاً چه چیزی خراب می‌شود؟",
    },
    hints: [
      { en: "Keys are how the reconciler matches old children to new children across renders.", fa: "کلیدها راهی هستند که reconciler بچه‌های قدیمی را در رندرهای جدید به بچه‌های جدید نگاشت می‌کند." },
    ],
    answer: [
      {
        en: "On re-render React diffs the children by key: same key → same component instance, state preserved; different key → unmount + remount. Keys are identity, not ordering.",
        fa: "در رندر مجدد، ریکت بچه‌ها را بر اساس کلید مقایسه می‌کند: کلید یکسان ← همان نمونه کامپوننت و حفظ state؛ کلید متفاوت ← unmount و remount. کلید یعنی هویت، نه ترتیب.",
      },
      {
        en: "With index keys on a reordered list, the element at index i is treated as 'the same' item — so inputs keep the previous item's state, scroll positions and focus land on the wrong row, and animations glitch.",
        fa: "با کلید ایندکسی در لیستِ جابه‌جاشونده، عنصر ایندکس i «همان» آیتم قبلی فرض می‌شود — در نتیجه inputها state آیتم قبلی را نگه می‌دارند، فوکوس و اسکرول به ردیف اشتباه می‌رود و انیمیشن‌ها به‌هم می‌ریزند.",
      },
      {
        en: "Use a stable domain id from the data (user.id, product.sku). If data truly has no id, generate one at item creation time — not at render time.",
        fa: "از یک شناسه پایدارِ دامنه‌ای از خود داده استفاده کنید (user.id، product.sku). اگر داده واقعاً id ندارد، هنگام ساخت آیتم یکی تولید کنید — نه هنگام رندر.",
      },
      {
        en: "Mention that keys also protect against subtle security bugs in editable lists and that random keys every render are worse than index keys.",
        fa: "اشاره کنید که کلیدها از باگ‌های ظریف در لیست‌های قابل ویرایش هم جلوگیری می‌کنند و کلید تصادفی در هر رندر از کلید ایندکسی هم بدتر است.",
      },
    ],
    categoryId: "react-frameworks",
  },
  {
    id: "react-useeffect-cleanup",
    type: "theory",
    topic: "react",
    difficulty: 2,
    question: {
      en: "A component subscribes to a WebSocket in useEffect and updates state on messages. What must the cleanup function do, and what bugs appear if you skip it? When is the effect re-created?",
      fa: "یک کامپوننت در useEffect به وب‌سوکت گوش می‌دهد و روی پیام‌ها state را به‌روز می‌کند. تابع cleanup باید چه کند و اگر حذفش کنید چه باگ‌هایی ظاهر می‌شود؟ افکت کی دوباره ساخته می‌شود؟",
    },
    hints: [
      { en: "Effects run after commit; cleanup runs before the next effect run and on unmount.", fa: "افکت‌ها بعد از commit اجرا می‌شوند؛ cleanup قبل از اجرای دوباره افکت و هنگام unmount اجرا می‌شود." },
    ],
    answer: [
      {
        en: "Cleanup must close the socket (or remove the listener) and abort any in-flight async work; otherwise you leak connections and 'setState on unmounted component' paths.",
        fa: "cleanup باید سوکت را ببندد (یا listener را حذف کند) و کارهای ناهمگامِ در جریان را لغو کند؛ در غیر این صورت نشت اتصال و مسیرهای setState روی کامپوننت unmount‌شده دارید.",
      },
      {
        en: "Classic duplicate-message bug: in StrictMode (dev) effects run setup → cleanup → setup. Without cleanup every reconnect doubles the handlers — users see doubled chat messages.",
        fa: "باگ کلاسیک پیام تکراری: در StrictMode (محیط توسعه) افکت با چرخه setup ← cleanup ← setup اجرا می‌شود. بدون cleanup هر اتصال مجدد، تعداد هندلرها را دو برابر می‌کند — کاربر پیام‌های چت را دوبار می‌بیند.",
      },
      {
        en: "The effect re-runs when any dependency in its array changes identity — put the socket URL/room id there, keep it stable (module-level or state), and never silence the linter.",
        fa: "افکت هر بار که هویت هر عضو آرایه وابستگی‌هایش عوض شود دوباره اجرا می‌شود — آدرس/اتاق سوکت را همان‌جا بگذارید، پایدارش نگه دارید (سطح ماژول یا state) و هرگز لینتر را بی‌صدا نکنید.",
      },
      {
        en: "Bonus: set a closed flag and ignore late messages; or move real-time state into a store (Zustand/TanStack Query) so the component stays declarative.",
        fa: "امتیاز: پرچم closed بگذارید و پیام‌های دیرهنگام را نادیده بگیرید؛ یا state بلادرنگ را به یک استور (Zustand/TanStack Query) منتقل کنید تا کامپوننت اعلانی بماند.",
      },
    ],
    categoryId: "react-frameworks",
  },
  {
    id: "react-stale-closure",
    type: "coding",
    topic: "react",
    difficulty: 3,
    question: {
      en: "setCount(count + 1) inside setTimeout inside a click handler sometimes increments only once even when clicked twice. Why, and what are two reliable fixes?",
      fa: "setCount(count + 1) داخل setTimeout داخل هندلر کلیک، گاهی حتی با دو بار کلیک فقط یک بار زیاد می‌کند. چرا؟ دو راه‌حل مطمئن چیست؟",
    },
    hints: [
      { en: "The handler closed over the state value from the render it was created in.", fa: "هندلر مقدار state را از رندری که در آن ساخته شده، بسته (کلیژر) کرده است." },
    ],
    answer: [
      {
        en: "Each render creates a new handler closing over that render's count. Two clicks schedule two timeouts that both read the same stale count, so both write the same next value.",
        fa: "هر رندر یک هندلر تازه می‌سازد که count همان رندر را بسته کرده. دو کلیک دو تایمر زمان‌بندی می‌کنند که هر دو count کهنه و یکسانی را می‌خوانند، پس هر دو یک مقدار یکسان می‌نویسند.",
      },
      {
        en: "Fix 1 — functional update: setCount(c => c + 1). React applies updates on the latest queued state, making the increment independent of stale closures.",
        fa: "راه‌حل ۱ — آپدیت تابعی: setCount(c => c + 1). ریکت آپدیت‌ها را روی آخرین state در صف اعمال می‌کند و افزایش از کلیژر کهنه مستقل می‌شود.",
      },
      {
        en: "Fix 2 — useRef for the latest value if the logic needs to read state outside render, or restructure so the timer is cleaned up on re-render.",
        fa: "راه‌حل ۲ — اگر منطق باید خارج از رندر state را بخواند از useRef برای آخرین مقدار استفاده کنید، یا ساختار را طوری عوض کنید که تایمر در رندر مجدد پاک شود.",
      },
      {
        en: "This question tests whether you understand that state is a snapshot per render — saying 'state updates are asynchronous' without the snapshot story misses the point.",
        fa: "این سوال می‌سنجد که بدانید state در هر رندر یک snapshot است — گفتن «آپدیت‌های state ناهمگام‌اند» بدون توضیح snapshot، پاسخ کاملی نیست.",
      },
    ],
    categoryId: "react-frameworks",
  },
  {
    id: "react-server-components",
    type: "theory",
    topic: "react",
    difficulty: 3,
    question: {
      en: "In Next.js App Router, when would you keep a component as a Server Component vs convert it to a Client Component? What are the boundary rules?",
      fa: "در Next.js App Router، چه زمانی یک کامپوننت را Server Component نگه می‌دارید و چه زمانی به Client Component تبدیل می‌کنید؟ قوانین مرزش چیست؟",
    },
    hints: [
      { en: "Default is server; 'use client' marks the root of a client subtree, not every interactive leaf.", fa: "پیش‌فرض سرور است؛ 'use client' ریشه زیردرخت کلاینت را علامت می‌زند، نه هر برگ تعاملی را." },
    ],
    answer: [
      {
        en: "Keep it on the server when it renders static or server-fetched data, accesses the database/FS directly, or holds secrets — it ships zero JS to the browser.",
        fa: "وقتی داده استاتیک یا سرویس‌شده از سرور رندر می‌کند، مستقیم به دیتابیس/فایل‌سیستم می‌رسد یا رمز نگه می‌دارد، روی سرور بمانید — صفر جاوااسکریپت به مرورگر می‌فرستد.",
      },
      {
        en: "Convert to client only for interactivity: state, effects, event handlers, browser APIs. Everything imported by a client component is client too — so push 'use client' as deep as possible.",
        fa: "فقط برای تعامل به کلاینت ببرید: state، افکت، هندلر ایونت، APIهای مرورگر. هر چیزی که یک کامپوننت کلاینت ایمپورت کند کلاینت است — پس 'use client' را تا جای ممکن عمیق بگذارید.",
      },
      {
        en: "Server Components can pass serializable props (data) to client children, and client components can receive server components as children via composition — this pattern keeps pages fast and interactive where it matters.",
        fa: "کامپوننت‌های سرور می‌توانند پراپ‌های قابل‌سری‌سازی (داده) به بچه‌های کلاینت بدهند و کامپوننت‌های کلاینت می‌توانند از طریق composition کامپوننت سرور به‌عنوان بچه بگیرند — این الگو صفحه را سریع و فقط جای لازم تعاملی نگه می‌دارد.",
      },
      {
        en: "Mention data-fetching simplification (async server components) and the common mistake of wrapping the whole page in 'use client' 'just to make one button work'.",
        fa: "به ساده‌شدن واکشی داده (کامپوننت‌های async سمت سرور) و اشتباه رایج پیچیدن کل صفحه در 'use client' «فقط برای یک دکمه» اشاره کنید.",
      },
    ],
    categoryId: "react-frameworks",
  },

  // ────────────────────────────── HTML & CSS ──────────────────────────────
  {
    id: "css-specificity-layers",
    type: "theory",
    topic: "css",
    difficulty: 2,
    question: {
      en: "A Tailwind utility (tracking-tight) is not applying to Persian text even though the class is on the element. Walk through how the cascade decides the winner, and name two mechanisms that can override a utility.",
      fa: "یک کلاس ابزار Tailwind (tracking-tight) روی متن فارسی اعمال نمی‌شود، با اینکه کلاس روی المان هست. توضیح دهید کسکاد چطور برنده را انتخاب می‌کند و دو سازوکاری که می‌توانند یک ابزار را override کنند نام ببرید.",
    },
    hints: [
      { en: "Origin & layers come before specificity: unlayered styles beat layered ones regardless of selector strength.", fa: "مبدأ و لایه‌ها قبل از specificity می‌آیند: استایل‌های بدون لایه مهم‌تر از لایه‌دارها هستند، صرف‌نظر از قدرت سلکتور." },
    ],
    answer: [
      {
        en: "The cascade resolves by: origin & importance → cascade layers → specificity → source order. Tailwind utilities live in the utilities layer; an unlayered rule like html[lang=fa] * { letter-spacing: 0 } beats them even with a weaker selector.",
        fa: "کسکاد به این ترتیب حل می‌کند: مبدأ و importance ← لایه‌های کسکاد ← specificity ← ترتیب در فایل. ابزارهای Tailwind در لایه utilities هستند؛ یک قانون بدون لایه مثل html[lang=fa] * { letter-spacing: 0 } حتی با سلکتور ضعیف‌تر از آن‌ها قوی‌تر است.",
      },
      {
        en: "Two override mechanisms: (1) move the reset into the same layer after utilities, or (2) use !important deliberately — but the clean fix is layered architecture (@layer base < components < utilities).",
        fa: "دو سازوکار override: (۱) ریست را در همان لایه بعد از ابزارها بگذارید، یا (۲) آگاهانه از !important استفاده کنید — اما راه‌حل تمیز معماری لایه‌ای است (@layer base < components < utilities).",
      },
      {
        en: "This exact bug (letter-spacing breaking Persian cursive joins) is a real interview story — explaining why Persian must keep letter-spacing 0 shows you think beyond Latin-centric CSS.",
        fa: "این باگ دقیق (به‌هم‌ریختن اتصال حروف فارسی با letter-spacing) یک داستان واقعی مصاحبه است — توضیح اینکه چرا فارسی باید letter-spacing صفر داشته باشد نشان می‌دهد فراتر از CSS لاتین‌محور فکر می‌کنید.",
      },
    ],
    categoryId: "fundamentals",
  },
  {
    id: "css-flex-vs-grid",
    type: "theory",
    topic: "css",
    difficulty: 1,
    question: {
      en: "When do you choose Flexbox over CSS Grid for a layout? Give one concrete example where Grid is clearly better and one where Flexbox is clearly better.",
      fa: "چه زمانی برای یک چیدمان Flexbox را به Grid ترجیح می‌دهید؟ یک مثال مشخص بزنید که Grid واضحاً بهتر است و یکی که Flexbox واضحاً بهتر است.",
    },
    hints: [
      { en: "Grid is two-dimensional from the start; Flexbox distributes along one axis with content-driven sizing.", fa: "گرید از ابتدا دوبعدی است؛ فلکس‌باکس در یک محور با اندازه‌گیری مبتنی بر محتوا توزیع می‌کند." },
    ],
    answer: [
      {
        en: "Grid for two-dimensional structure where rows AND columns must align: dashboards, card grids, page scaffolding (header/sidebar/main), form layouts with label column.",
        fa: "گرید برای ساختار دوبعدی که سطر و ستون هر دو باید تراز باشند: داشبوردها، گرید کارت‌ها، اسکلت صفحه (هدر/سایدبار/اصلی)، فرم‌ها با ستون لیبل.",
      },
      {
        en: "Flexbox for one-dimensional distribution of content-sized items: toolbars, chip rows, button groups, centering an icon beside a label, space-between footers.",
        fa: "فلکس‌باکس برای توزیع یک‌بعدی آیتم‌های هم‌اندازه‌با‌محتوا: تولبارها، ردیف چیپ‌ها، گروه دکمه‌ها، وسط‌چین کردن آیکون کنار لیبل، فوتر با space-between.",
      },
      {
        en: "Key interview phrase: 'Grid defines the structure first, Flexbox lets the content define it.' They compose — a grid cell commonly contains a flex row.",
        fa: "جمله کلیدی مصاحبه: «گرید اول ساختار را تعریف می‌کند، فلکس‌باکس اجازه می‌دهد محتوا تعریفش کند.» این‌ها ترکیب‌شدنی‌اند — معمولاً داخل هر سلول گرید یک ردیف فلکس هست.",
      },
      {
        en: "Bonus: minmax(), auto-fill vs auto-fit for responsive card grids without media queries; gap works in both.",
        fa: "امتیاز: minmax()، تفاوت auto-fill و auto-fit برای گرید کارت واکنش‌گرا بدون مدیاکوئری؛ gap در هر دو کار می‌کند.",
      },
    ],
    categoryId: "fundamentals",
  },
  {
    id: "css-sticky-position",
    type: "theory",
    topic: "css",
    difficulty: 2,
    question: {
      en: "position: sticky on a table header is not sticking. What are the usual causes, and what element does sticky position relative to?",
      fa: "position: sticky روی هدر جدول کار نمی‌کند. دلایل معمول چیست و sticky نسبت به کدام المان موقعیت می‌گیرد؟",
    },
    hints: [
      { en: "Check the nearest scrolling ancestor and whether any ancestor clips overflow.", fa: "نزدیک‌ترین جدِ اسکرول‌شونده را چک کنید و اینکه آیا اجدادی overflow را کلیپ می‌کنند یا نه." },
    ],
    answer: [
      {
        en: "Sticky positions an element relative to its nearest scrolling ancestor, and it only sticks within its containing block (its parent). If the parent is exactly the height of the header, there is no room to stick.",
        fa: "sticky المان را نسبت به نزدیک‌ترین جدِ اسکرول‌شونده موقعیت می‌دهد و فقط در محدوده بلوک دربرگیرنده‌اش (پدرش) می‌چسبد. اگر پدر دقیقاً هم‌قدِ هدر باشد، جایی برای چسبیدن نمی‌ماند.",
      },
      {
        en: "Usual causes: an ancestor with overflow: hidden/auto/scroll (creating a new scroll container or clipping), the parent's height being too small, or the browser support being fine but a transform/filter on an ancestor changing the containing block.",
        fa: "دلایل معمول: اجدادی با overflow: hidden/auto/scroll (ساخت ظرف اسکرول جدید یا کلیپ)، ارتفاع کم پدر، یا transform/filter روی جدی که بلوک دربرگیرنده را عوض می‌کند.",
      },
      {
        en: "Fixes: put sticky on the right element (thead th), remove or re-scope the overflow, ensure the sticky element's parent spans the scrollable content, and add top: 0 — sticky without an inset does nothing.",
        fa: "راه‌حل: sticky را روی المان درست بگذارید (thead th)، overflow را حذف یا محدودتر کنید، مطمئن شوید پدرِ المان کل محتوای اسکرول‌شونده را می‌پوشاند و top: 0 بگذارید — sticky بدون inset هیچ کاری نمی‌کند.",
      },
    ],
    categoryId: "fundamentals",
  },

  // ────────────────────────────── Node & APIs ──────────────────────────────
  {
    id: "node-streams-backpressure",
    type: "theory",
    topic: "backend",
    difficulty: 3,
    question: {
      en: "You are proxying a 5GB file upload through a Node.js server. Why would reading the whole file into memory fail, and how do streams with backpressure solve it?",
      fa: "شما یک آپلود ۵ گیگابایتی را از طریق سرور Node.js پروکسی می‌کنید. چرا خواندن کل فایل در حافظه شکست می‌خورد و استریم‌ها با backpressure چطور حلش می‌کنند؟",
    },
    hints: [
      { en: "Readable pipe writable pauses when the writable's buffer is full — that signal is backpressure.", fa: "وقتی بافر writable پر می‌شود، pipe از readable را متوقف می‌کند — این سیگنال همان backpressure است." },
    ],
    answer: [
      {
        en: "Buffering 5GB in RAM exhausts the heap and kills the server (or the container). Memory must stay bounded regardless of payload size.",
        fa: "بافر کردن ۵ گیگابایت در رم، هیپ را تمام می‌کند و سرور (یا کانتینر) را می‌کشد. مصرف حافظه باید مستقل از حجم payload محدود بماند.",
      },
      {
        en: "Streams process chunk-by-chunk: read a chunk, write it, repeat. Backpressure is the mechanism where a slow writable pauses the readable (drain event) so memory stays flat and a slow client cannot crash the server.",
        fa: "استریم‌ها تکه‌به‌تکه پردازش می‌کنند: یک chunk بخوان، بنویس، تکرار کن. backpressure سازوکاری است که writableِ کند، readable را متوقف می‌کند (ایونت drain) تا حافظه ثابت بماند و کلاینتِ کند سرور را نکشد.",
      },
      {
        en: "pipeline() (or pipe) wires this automatically with error propagation; manual 'data' listeners without handling 'drain' are the classic bug.",
        fa: "pipeline() (یا pipe) این کار را خودکار با انتشار خطا انجام می‌دهد؛ لیسنر دستی 'data' بدون مدیریت 'drain' باگ کلاسیک است.",
      },
      {
        en: "Bonus: mention streams for CSV import/export, video, and ETL; and that fetch's Response.body is also a web stream on modern Node.",
        fa: "امتیاز: استریم برای ایمپورت/اکسپورت CSV، ویدیو و ETL؛ و اینکه Response.body در fetch روی نود مدرن یک وب‌استریم است.",
      },
    ],
    categoryId: "backend",
  },
  {
    id: "rest-vs-graphql",
    type: "theory",
    topic: "backend",
    difficulty: 2,
    question: {
      en: "Compare REST and GraphQL for a product with a mobile app and a complex web dashboard. When is GraphQL worth the extra infrastructure, and when is it overkill?",
      fa: "REST و GraphQL را برای محصولی با اپ موبایل و داشبورد وب پیچیده مقایسه کنید. کی GraphQL ارزش زیرساخت اضافه‌اش را دارد و کی بیشتر از حد لازم است؟",
    },
    hints: [
      { en: "Think about over-fetching on mobile data, and how many round trips the dashboard needs.", fa: "به over-fetching روی داده موبایل و تعداد رفت‌وبرگشت‌های داشبورد فکر کنید." },
    ],
    answer: [
      {
        en: "GraphQL wins when clients need tailored views of deeply related data in one round trip: the dashboard composes user + orders + analytics in a single query; mobile avoids over-fetching on expensive networks.",
        fa: "گراف‌کیو‌ال وقتی برنده است که کلاینت‌ها به نماهای متفاوت از داده‌های عمیقاً مرتبط در یک رفت‌وبرگشت نیاز دارند: داشبورد کاربر + سفارش‌ها + آمار را در یک کوئری می‌سازد؛ موبایل روی شبکه‌های گران over-fetch نمی‌کند.",
      },
      {
        en: "Costs: one heavyweight endpoint (caching must be rethought — no HTTP URL cache keys), query complexity/depth security, N+1 resolver problems needing DataLoader, and a steeper learning curve for the whole team.",
        fa: "هزینه‌ها: یک اندپوینت سنگین (کش باید بازاندیشی شود — کلید کش URL دیگر نیست)، امنیت پیچیدگی/عمق کوئری، مشکل N+1 در resolverها که به DataLoader نیاز دارد و منحنی یادگیری سخت‌تر برای کل تیم.",
      },
      {
        en: "REST is better for simple resource CRUD, public APIs, and heavy HTTP-caching needs; it is boring, debuggable with curl, and universally understood.",
        fa: "REST برای CRUD ساده منابع، APIهای عمومی و نیاز شدید به کش HTTP بهتر است؛ ساده و قابل پیش‌بینی است، با curl قابل دیباگ است و همه می‌شناسندش.",
      },
      {
        en: "A pragmatic answer ('REST for public + GraphQL for the dashboard') shows judgment — interviewers listen for trade-offs, not religion.",
        fa: "پاسخ عمل‌گرایانه («REST برای عمومی + GraphQL برای داشبورد») نشان‌دهنده قضاوت است — مصاحبه‌گرها به دنبال توازن‌ها هستند، نه تعصب.",
      },
    ],
    categoryId: "backend",
  },
  {
    id: "backend-idempotency",
    type: "coding",
    topic: "backend",
    difficulty: 3,
    question: {
      en: "A payment button is double-clicked and the charge API fires twice. Design the API-level fix: what makes a POST /charge idempotent, and where does the idempotency key live?",
      fa: "دکمه پرداخت دوبار کلیک می‌شود و API شارژ دو بار اجرا می‌شود. راه‌حل در سطح API را طراحی کنید: چه چیزی POST /charge را idempotent می‌کند و کلید idempotency کجا زندگی می‌کند؟",
    },
    hints: [
      { en: "Stripe solved this in their public API — think about what they store and for how long.", fa: "استرایپ این را در API عمومی‌اش حل کرده — فکر کنید چه چیزی ذخیره می‌کنند و برای چه مدت." },
    ],
    answer: [
      {
        en: "The client generates a unique idempotency key (UUID) per user intent — not per click — and sends it in a header (Idempotency-Key) with the first request.",
        fa: "کلاینت برای هر «قصد کاربر» — نه هر کلیک — یک کلید idempotency یکتا (UUID) می‌سازد و آن را در هدر (Idempotency-Key) با اولین درخواست می‌فرستد.",
      },
      {
        en: "The server stores key → response (plus the created resource state) in a durable store with a TTL. Replays with the same key return the original response (200, not a second charge) while the first is still in flight — or after it.",
        fa: "سرور نگاشت کلید ← پاسخ (به‌همراه state منبع ساخته‌شده) را در یک استور ماندگار با TTL ذخیره می‌کند. ارسال مجدد با همان کلید، پاسخ اصلی را برمی‌گرداند (200، نه شارژ دوم) — چه اولی هنوز در جریان باشد چه تمام شده باشد.",
      },
      {
        en: "Handle concurrency: on key collision while in progress, either lock and wait, or return 409. Never process both. Database unique constraint on the key column is the safety net.",
        fa: "همزمانی را مدیریت کنید: برخورد کلید در حین پردازش یا قفل و انتظار است یا 409. هرگز هر دو را پردازش نکنید. محدودیت یکتای دیتابیس روی ستون کلید، تور ایمنی است.",
      },
      {
        en: "Bonus: client-side disable + loading state prevents most double-clicks; idempotency keys protect you when that UI fails (retry after timeout is legitimate).",
        fa: "امتیاز: غیرفعال‌سازی دکمه + state لودینگ در سمت کلاینت بیشترِ دابل‌کلیک‌ها را می‌گیرد؛ کلیدهای idempotency وقتی از شما محافظت می‌کنند که UI شکست بخورد (تلاش مجدد بعد از timeout legitimate است).",
      },
    ],
    categoryId: "backend",
  },

  // ────────────────────────────── Databases ──────────────────────────────
  {
    id: "db-n-plus-one",
    type: "theory",
    topic: "database",
    difficulty: 2,
    question: {
      en: "Your product list page makes 1 + N queries — one for the products, then one per product for its seller. What is the N+1 problem, how do you detect it, and what are two fixes?",
      fa: "صفحه لیست محصولات شما ۱ + N کوئری می‌زند — یکی برای محصولات و یکی به‌ازای هر محصول برای فروشنده‌اش. مشکل N+1 چیست، چطور تشخیصش می‌دهید و دو راه‌حل چیست؟",
    },
    hints: [
      { en: "Detect it in query logs or an ORM's logger; the count explodes with the page size.", fa: "در لاگ کوئری‌ها یا لاگر ORM تشخیصش بدهید؛ تعداد کوئری‌ها با اندازه صفحه منفجر می‌شود." },
    ],
    answer: [
      {
        en: "N+1 = one query for the parent list plus one query per row for a relation. It hides in development (small data) and detonates in production (100 products → 101 queries per page view).",
        fa: "N+1 یعنی یک کوئری برای لیست والد به‌علاوه یک کوئری به‌ازای هر ردیف برای رابطه‌اش. در توسعه (داده کم) پنهان می‌ماند و در تولید (۱۰۰ محصول ← ۱۰۱ کوئری در هر بازدید) منفجر می‌شود.",
      },
      {
        en: "Detection: ORM query logs/Prisma metrics, APM traces (Datadog/Sentry), or a test asserting query count for a rendered page.",
        fa: "تشخیص: لاگ کوئری‌ها/metrics در Prisma، ردیابی APM (Datadog/Sentry) یا یک تست که تعداد کوئریِ یک صفحه رندرشده را assert می‌کند.",
      },
      {
        en: "Fix 1 — eager loading: one JOIN or IN query fetching all sellers for the page (Prisma include, Sequelize include, Django select_related). Fix 2 — DataLoader-style batching, which also fixes GraphQL resolvers.",
        fa: "راه‌حل ۱ — بارگذاری مشتاقانه: یک JOIN یا IN برای همه فروشندگان صفحه (Prisma include، Sequelize include، select_related جنگو). راه‌حل ۲ — دسته‌بندی به سبک DataLoader که resolverهای GraphQL را هم درست می‌کند.",
      },
      {
        en: "Mention the trade-off: eager loading pulls more data per query; pick based on access pattern, and cache hot aggregates at the service layer.",
        fa: "به توازن اشاره کنید: eager loading در هر کوئری داده بیشتری می‌کشد؛ بر اساس الگوی دسترسی انتخاب کنید و مجموعه‌های داغ را در لایه سرویس کش کنید.",
      },
    ],
    categoryId: "databases",
  },
  {
    id: "db-index-tradeoffs",
    type: "theory",
    topic: "database",
    difficulty: 2,
    question: {
      en: "Your DBA says 'we cannot index everything'. Explain why indexes speed up reads but can slow writes, and list two situations where an index is useless.",
      fa: "مدیر دیتابیس شما می‌گوید «نمی‌توانیم همه‌چیز را ایندکس کنیم». توضیح دهید چرا ایندکس‌ها خواندن را سریع اما نوشتن را می‌توانند کند کنند و دو موقعیتی بگویید که ایندکس بی‌فایده است.",
    },
    hints: [
      { en: "Every INSERT/UPDATE must also update every index on the changed columns.", fa: "هر INSERT/UPDATE باید همه ایندکس‌های ستون‌های تغییرکرده را هم به‌روز کند." },
    ],
    answer: [
      {
        en: "An index (typically a B-tree) turns a full table scan into a logarithmic lookup — but every write must also update each affected index, and each index consumes disk and cache. Write-heavy tables with many indexes pay on every INSERT.",
        fa: "ایندکس (معمولاً B-tree) اسکن کامل جدول را به جست‌وجوی لگاریتمی تبدیل می‌کند — اما هر نوشتن باید ایندکس‌های متأثر را هم به‌روز کند و هر ایندکس دیسک و کش مصرف می‌کند. جدول‌های پرنوشتن با ایندکس‌های زیاد روی هر INSERT هزینه می‌دهند.",
      },
      {
        en: "Useless index #1: a leading-wildcard LIKE '%term%' cannot use a B-tree — full scan anyway (trigram/GIN or a search engine is the real fix).",
        fa: "ایندکس بی‌فایده اول: LIKE '%term%' با وایلدکارد پیشین نمی‌تواند از B-tree استفاده کند — به‌هرحال اسکن کامل است (راه‌حل واقعی، trigram/GIN یا موتور جستجوست).",
      },
      {
        en: "Useless index #2: low-cardinality columns alone (a boolean 'active' flag) or functions wrapping the column (WHERE YEAR(created_at) = 2026) — the optimizer skips it. Composite index column order matters: filter on equality columns first.",
        fa: "ایندکس بی‌فایده دوم: ستون‌های با تنوع کم به‌تنهایی (پرچم بولی active) یا توابعی که ستون را می‌پیچند (WHERE YEAR(created_at) = 2026) — بهینه‌ساز از آن رد می‌شود. ترتیب ستون‌ها در ایندکس ترکیبی مهم است: اول ستون‌های برابری.",
      },
      {
        en: "Show method: read the query plan (EXPLAIN ANALYZE), measure, then index — 'index by evidence, not vibes' is the phrase interviewers love.",
        fa: "روش را نشان دهید: پلن کوئری را بخوانید (EXPLAIN ANALYZE)، اندازه بگیرید، بعد ایندکس بزنید — جمله «ایندکس بر اساس شواهد، نه حس» را مصاحبه‌گرها دوست دارند.",
      },
    ],
    categoryId: "databases",
  },

  // ────────────────────────────── System Design ──────────────────────────────
  {
    id: "sys-url-shortener",
    type: "system",
    topic: "system",
    difficulty: 2,
    question: {
      en: "Design a URL shortener (like bit.ly). Cover the ID generation strategy, storage, read path with caching, and one analytics consideration.",
      fa: "یک کوتاه‌کننده لینک (مثل bit.ly) طراحی کنید. استراتژی تولید شناسه، ذخیره‌سازی، مسیر خواندن با کش و یک نکته تحلیلی را پوشش دهید.",
    },
    hints: [
      { en: "Estimate scale first: 100M new URLs/year drives the ID space (base62 of 7 chars ≈ 3.5 trillion).", fa: "اول مقیاس را برآورد کنید: ۱۰۰ میلیون URL در سال فضای شناسه را تعیین می‌کند (base62 هفت‌حرفی ≈ ۳٫۵ تریلیون)." },
    ],
    answer: [
      {
        en: "API: POST /shorten returns a 7-char base62 code; GET /:code issues a 301/302 redirect. Ask clarifying questions first (read:write ratio, custom aliases, expiry).",
        fa: "API: POST /shorten یک کد base62 هفت‌حرفی برمی‌گرداند؛ GET /:code ریدایرکت 301/302 می‌دهد. اول سوال شفاف‌سازی بپرسید (نسبت خواندن/نوشتن، نامک سفارشی، انقضا).",
      },
      {
        en: "ID generation options: random base62 with collision check + retry; or a counter service / pre-generated key pool (ticket server or per-node ranges) to avoid coordination on the hot path.",
        fa: "گزینه‌های تولید شناسه: base62 تصادفی با چک برخورد و تلاش مجدد؛ یا سرویس شمارنده / استخر کلیدهای از پیش‌ساخته (تیکت‌سرور یا بازه‌های هر نود) تا مسیر داغ بدون هماهنگی پیش برود.",
      },
      {
        en: "Storage: key → long URL + owner + timestamps in a key-value store (DynamoDB/Cassandra style). Read path: cache hot codes in Redis with TTL, then DB; the redirect itself sets Cache-Control so CDNs absorb most traffic.",
        fa: "ذخیره‌سازی: کلید ← URL بلند + مالک + زمان‌ها در یک استور کلید-مقدار (سبک DynamoDB/Cassandra). مسیر خواندن: کشِ کدهای داغ در Redis با TTL، بعد دیتابیس؛ خودِ ریدایرکت Cache-Control می‌گذارد تا CDN بخش بزرگ ترافیک را جذب کند.",
      },
      {
        en: "Analytics: fire-and-forget click events to a queue (Kafka) aggregated async — never block the redirect. Mention 301 vs 302 trade-off (browsers cache 301, so you lose click tracking).",
        fa: "تحلیل: ایونت کلیک را fire-and-forget به صف (Kafka) بفرستید و ناهمگام تجمیع کنید — هرگز ریدایرکت را مسدود نکنید. توازن 301 و 302 را بگویید (مرورگر 301 را کش می‌کند و ردیابی کلیک را از دست می‌دهید).",
      },
    ],
    categoryId: "system-design",
  },
  {
    id: "sys-news-feed",
    type: "system",
    topic: "system",
    difficulty: 3,
    question: {
      en: "Design a social news feed (home timeline). Compare the push (fan-out on write) and pull (fan-out on read) strategies, and say how you would handle a celebrity with 50M followers.",
      fa: "یک فید خبری اجتماعی (تایم‌لاین خانگی) طراحی کنید. استراتژی‌های push (fan-out هنگام نوشتن) و pull (fan-out هنگام خواندن) را مقایسه کنید و بگویید با سلبریتی با ۵۰ میلیون فالوور چطور رفتار می‌کنید.",
    },
    hints: [
      { en: "Most feeds are hybrid: push for normal users, pull for the accounts that are too popular to fan out.", fa: "بیشتر فیدها هیبریدی‌اند: push برای کاربران عادی، pull برای اکانت‌هایی که برای fan-out خیلی بزرگ‌اند." },
    ],
    answer: [
      {
        en: "Push: when a user posts, write the post ID into every follower's precomputed timeline (Redis lists). Reads are O(1) and fast, but a celebrity post becomes millions of writes, and inactive users waste storage.",
        fa: "Push: وقتی کاربری پست می‌گذارد، شناسه پست در تایم‌لاینِ از پیش‌محاسبه‌شدهٔ همه فالوورها نوشته می‌شود (لیست‌های Redis). خواندن O(1) و سریع است، اما پست سلبریتی میلیون‌ها نوشتن می‌شود و کاربران غیرفعال حافظه هدر می‌دهند.",
      },
      {
        en: "Pull: build the feed at read time by merging followed users' posts (merge K sorted lists, cache the result briefly). Cheap writes, expensive reads — bad for the common case of many reads per post.",
        fa: "Pull: فید هنگام خواندن با ادغام پست‌های افرادی که دنبال می‌کنید ساخته می‌شود (ادغام K لیست مرتب، کش کوتاه نتیجه). نوشتن ارزان، خواندن گران — برای حالت رایجِ خواندن‌های زیاد بد است.",
      },
      {
        en: "Hybrid: fan-out on write for normal accounts; for celebrities, keep their posts out of the fan-out and merge them in at read time (or on a delayed queue). This is Twitter's classic architecture.",
        fa: "هیبریدی: برای اکانت‌های عادی fan-out هنگام نوشتن؛ برای سلبریتی‌ها پست‌ها را از fan-out خارج نگه دارید و هنگام خواندن (یا با صف تأخیری) به فید اضافه کنید. این معماری کلاسیک توییتر است.",
      },
      {
        en: "Cover: ranking service over the merged IDs, pagination by cursor, media via CDN, and consistency trade-off (feed is eventually consistent — fine here).",
        fa: "پوشش دهید: سرویس رتبه‌بندی روی شناسه‌های ادغام‌شده، صفحه‌بندی با کرسر، رسانه‌ها از CDN و توازن سازگاری (فید در نهایت سازگار است — اینجا قابل قبول).",
      },
    ],
    categoryId: "system-design",
  },
  {
    id: "sys-caching-strategies",
    type: "theory",
    topic: "system",
    difficulty: 2,
    question: {
      en: "You add Redis in front of a slow API. Walk through cache-aside vs write-through, how you choose a TTL, and how you prevent stale reads after an update.",
      fa: "Redis را جلوی یک API کند می‌گذارید. cache-aside و write-through را توضیح دهید، بگویید TTL را چطور انتخاب می‌کنید و چطور بعد از آپدیت جلوی خواندن داده کهنه را می‌گیرید.",
    },
    hints: [
      { en: "The stampede and the stale-after-write problems are the two things interviewers probe.", fa: "دو چیزی که مصاحبه‌گرها می‌کاوند: استمپید و مشکل کهنه‌بودن بعد از نوشتن." },
    ],
    answer: [
      {
        en: "Cache-aside: app reads cache, on miss reads DB and populates cache; writes go to DB and invalidate the key. Simple and resilient. Write-through: every write updates cache and DB together — reads are always hot, writes are slower and coupling is tighter.",
        fa: "Cache-aside: اپ اول کش را می‌خواند، در miss دیتابیس را می‌خواند و کش را پر می‌کند؛ نوشتن به دیتابیس می‌رود و کلید را باطل می‌کند. ساده و مقاوم. Write-through: هر نوشتن هم‌زمان کش و دیتابیس را به‌روز می‌کند — خواندن همیشه گرم است، نوشتن کندتر و جفت‌شدن تنگ‌تر است.",
      },
      {
        en: "TTL: based on how stale the product tolerates (pricing → seconds, product listing → minutes) plus jitter to avoid synchronized expiry; hot keys may need background refresh instead of a hard expiry.",
        fa: "TTL: بر اساس کهنگی‌ای که محصول تحمل می‌کند (قیمت ← ثانیه، لیست محصول ← دقیقه) به‌علاوه jitter برای جلوگیری از انقضای هم‌زمان؛ کلیدهای داغ ممکن است به‌جای انقضای سخت، بازسازی پس‌زمینه بخواهند.",
      },
      {
        en: "Staleness after update: invalidate-then-write with the write path owning the cache; for read-modify-write races use versioned keys or short TTLs. Never let two services own the same key's lifecycle.",
        fa: "کهنگی بعد از آپدیت: اول ابطال بعد نوشتن، با مالکیت کش در مسیر نوشتن؛ برای رقابت‌های خواندن-اصلاح-نوشتن از کلیدهای نسخه‌دار یا TTL کوتاه استفاده کنید. هرگز اجازه ندهید دو سرویس مالک چرخه حیات یک کلید باشند.",
      },
      {
        en: "Prevent stampede: request coalescing (single-flight), locks, or probabilistic early refresh. Saying 'cache invalidation is one of the two hard problems' is fine — explaining your invalidation strategy is better.",
        fa: "جلوگیری از استمپید: ادغام درخواست‌ها (single-flight)، قفل یا تازه‌سازی زودهنگام احتمالاتی. گفتن «ابطال کش یکی از دو مسئله سخت است» خوب است — اما توضیح استراتژی ابطال شما بهتر است.",
      },
    ],
    categoryId: "system-design",
  },

  // ────────────────────────────── Security ──────────────────────────────
  {
    id: "sec-xss-prevention",
    type: "theory",
    topic: "security",
    difficulty: 2,
    question: {
      en: "A comment field renders user content as HTML and an attacker stores <script>. Explain the XSS class this belongs to, list three defenses, and explain why 'escape everything' is not the full answer.",
      fa: "یک فیلد کامنت محتوای کاربر را به‌صورت HTML رندر می‌کند و مهاجم <script> ذخیره می‌کند. کلاس XSS را توضیح دهید، سه دفاع بگویید و توضیح دهید چرا «همه‌چیز را escape کن» پاسخ کامل نیست.",
    },
    hints: [
      { en: "Stored vs reflected vs DOM-based — this one is stored. Context matters: HTML body, attribute, JS, URL need different escaping.", fa: "ذخیره‌شده یا بازتابی یا DOM-based — این ذخیره‌شده است. بافت مهم است: بدنه HTML، اتریبیوت، جاوااسکریپت و URL هرکدام escape متفاوت می‌خواهند." },
    ],
    answer: [
      {
        en: "This is stored XSS: the payload persists in the DB and fires for every viewer — the highest-impact class (session theft, keylogging, CSRF bypass).",
        fa: "این XSS ذخیره‌شده است: payload در دیتابیس می‌ماند و برای هر بازدیدکننده اجرا می‌شود — پرخطرترین کلاس (دزدی سشن، کی‌لاگر، دور زدن CSRF).",
      },
      {
        en: "Defenses: (1) contextual output encoding — escape for HTML body vs attribute vs JS contexts; (2) sanitize rich content with a strict allowlist (DOMPurify); (3) Content-Security-Policy limiting script sources; plus HttpOnly cookies so stolen JS cannot read the session.",
        fa: "دفاع‌ها: (۱) انکودینگ خروجی بافت‌محور — برای بدنه HTML، اتریبیوت و بافت JS متفاوت؛ (۲) پاک‌سازی محتوای غنی با allowlist سخت‌گیرانه (DOMPurify)؛ (۳) CSP با محدودکردن منابع اسکریپت؛ به‌علاوه کوکی HttpOnly تا جاوااسکریپتِ دزدیده‌شده سشن را نخواند.",
      },
      {
        en: "'Escape everything' breaks legit rich text (bold, links) and misses context mistakes (an unescaped attribute or href='javascript:' sink). The real answer is: framework auto-escaping by default, sanitize-what-must-be-HTML, and CSP as the backstop.",
        fa: "«همه‌چیز را escape کن» متن غنی مجاز را خراب می‌کند (بولد، لینک) و اشتباهات بافت را از دست می‌دهد (اتریبیوت escape‌نشده یا sink ی href='javascript:'). پاسخ واقعی: auto-escaping پیش‌فرض فریم‌ورک، پاک‌سازی آنچه باید HTML باشد، و CSP به‌عنوان عقب‌نشینی نهایی.",
      },
      {
        en: "React note: dangerouslySetInnerHTML is the explicit escape hatch — requiring an explicit lint exception and sanitization is the team-level control.",
        fa: "نکته ریکت: dangerouslySetInnerHTML دریچه صریح فرار است — اجبار به کامنت لینت و پاک‌سازی، کنترل در سطح تیم است.",
      },
    ],
    categoryId: "security",
  },
  {
    id: "sec-cors-explained",
    type: "theory",
    topic: "security",
    difficulty: 2,
    question: {
      en: "Your frontend at app.example.com calls api.example.com and the browser blocks the response. What is actually happening in CORS, and why does this 'annoying' mechanism protect users? What about the preflight OPTIONS request?",
      fa: "فرانت‌اند شما در app.example.com به api.example.com زنگ می‌زند و مرورگر پاسخ را مسدود می‌کند. در CORS واقعاً چه اتفاقی می‌افتد و چرا این مکانیزم «آزاردهنده» از کاربر محافظت می‌کند؟ درخواست پیش‌پرواز OPTIONS چه می‌شود؟",
    },
    hints: [
      { en: "The Same-Origin Policy blocks *reading* cross-origin responses; CORS is the server's opt-in to relax it.", fa: "سیاست هم‌مبدأ، «خواندن» پاسخ‌های کراس‌مبدأ را مسدود می‌کند؛ CORS اعلام رضایت سرور برای شل‌کردن آن است." },
    ],
    answer: [
      {
        en: "SOP prevents a malicious site from reading responses authenticated by the user's cookies. CORS is the server explicitly allowing listed origins via Access-Control-Allow-Origin — the default (no header) is 'nobody may read'.",
        fa: "SOP جلوی خواندن پاسخ‌های احرازشده با کوکی کاربر را توسط سایت مخرب می‌گیرد. CORS اعلام صریح سرور برای اجازه به مبدأهای لیست‌شده از طریق Access-Control-Allow-Origin است — پیش‌فرض (بدون هدر) یعنی «هیچ‌کس حق خواندن ندارد».",
      },
      {
        en: "Non-simple requests (custom headers like Authorization, methods like DELETE, JSON content-type) trigger a preflight: the browser sends OPTIONS first; the server must answer with allowed origin/methods/headers before the real request is sent.",
        fa: "درخواست‌های غیرساده (هدرهای سفارشی مثل Authorization، متدهایی مثل DELETE، content-type JSON) پیش‌پرواز فعال می‌کنند: مرورگر اول OPTIONS می‌فرستد؛ سرور باید با اجازه مبدأ/متد/هدرها جواب دهد تا درخواست واقعی ارسال شود.",
      },
      {
        en: "It protects users, not the server: without SOP, visiting evil.com could silently read your banking session. That is why 'just disable CORS' in production is never the answer.",
        fa: "این مکانیزم از کاربر محافظت می‌کند نه سرور: بدون SOP، بازدید از evil.com می‌توانست بی‌صدا سشن بانکی شما را بخواند. به همین دلیل «فقط CORS را خاموش کن» در تولید هرگز پاسخ نیست.",
      },
      {
        en: "Fix checklist: correct Allow-Origin (never * with credentials), Allow-Credentials + exact origin, preflight caching (Access-Control-Max-Age), and a proxy on the same origin as the zero-config alternative.",
        fa: "چک‌لیست اصلاح: Allow-Origin درست (هرگز * همراه با credentials)، Allow-Credentials + مبدأ دقیق، کش پیش‌پرواز (Access-Control-Max-Age) و پراکسی هم‌مبدأ به‌عنوان جایگزین بدون پیکربندی.",
      },
    ],
    categoryId: "security",
  },

  // ────────────────────────────── Testing ──────────────────────────────
  {
    id: "test-pyramid",
    type: "theory",
    topic: "testing",
    difficulty: 1,
    question: {
      en: "Describe the testing pyramid. Where do E2E tests belong, and why do teams that only write E2E tests end up with a slow, flaky suite?",
      fa: "هرم تست را توضیح دهید. تست‌های E2E کجا قرار می‌گیرند و چرا تیم‌هایی که فقط E2E می‌نویسند به مجموعه‌ای کند و شکننده می‌رسند؟",
    },
    hints: [
      { en: "Base = many unit tests, middle = integration, top = few E2E journeys.", fa: "پایه = تعداد زیادی تست واحد، میانه = integration، قله = تعداد کمی مسیر E2E." },
    ],
    answer: [
      {
        en: "Unit tests (fast, thousands, no I/O) → integration tests (component + API contracts, hundreds) → E2E journeys (real browser, the 5–10 flows that pay the bills: signup, checkout, search).",
        fa: "تست واحد (سریع، هزاران تا، بدون I/O) ← تست یکپارچگی (کامپوننت + قرارداد API، صدها تا) ← مسیرهای E2E (مرورگر واقعی، همان ۵ تا ۱۰ جریانی که کسب‌وکار وابسته به آن‌هاست: ثبت‌نام، پرداخت، جستجو).",
      },
      {
        en: "E2E-only suites break down because every test pays browser startup + network + auth costs (minutes each), and any UI change breaks dozens of overlapping journeys — so flakes erode trust and people stop reading failures.",
        fa: "مجموعه‌های فقط-E2E شکست می‌خورند چون هر تست هزینه راه‌اندازی مرورگر + شبکه + احراز هویت را می‌پردازد (هرکدام دقیقه‌ها) و هر تغییر کوچک UI ده‌ها مسیر هم‌پوشان را می‌شکند — پس flakeها اعتماد را می‌خورند و کسی خطاها را نخواهد خواند.",
      },
      {
        en: "The pyramid pushes the cheap tests to cover logic and edge cases, and reserves E2E for cross-system wiring. Mention the 'testing trophy' as a modern variation (more integration around real components).",
        fa: "هرم، تست‌های ارزان را به پوشش منطق و حالت‌های مرزی می‌فرستد و E2E را برای سیم‌کشی بین‌سیستمی نگه می‌دارد. اشاره به «تروفی تست» به‌عنوان نسخه مدرن (integration بیشتر روی کامپوننت‌های واقعی) خوب است.",
      },
      {
        en: "Tooling mapping: Vitest/Jest for unit, Testing Library + MSW for integration, Playwright for E2E — and CI gates on the fast tiers, nightly for E2E if slow.",
        fa: "نگاشت ابزار: Vitest/Jest برای واحد، Testing Library + MSW برای یکپارچگی، Playwright برای E2E — و در CI گِیت روی لایه‌های سریع، E2E کند را شبانه.",
      },
    ],
    categoryId: "testing",
  },
  {
    id: "test-what-to-test-react",
    type: "theory",
    topic: "testing",
    difficulty: 2,
    question: {
      en: "You are testing a React component with Testing Library. What do you test — and what do you deliberately not test? Why does querying by implementation (class names, internal state) make tests brittle?",
      fa: "یک کامپوننت ریکت را با Testing Library تست می‌کنید. چه چیزی را تست می‌کنید — و چه چیزی را آگاهانه تست نمی‌کنید؟ چرا جستجو بر اساس پیاده‌سازی (کلاس‌ها، state داخلی) تست را شکننده می‌کند؟",
    },
    hints: [
      { en: "Testing Library's guiding principle: test what the user sees and does, not the internals.", fa: "اصل راهنمای Testing Library: چیزی را تست کن که کاربر می‌بیند و انجام می‌دهد، نه جزئیات درونی." },
    ],
    answer: [
      {
        en: "Test observable behavior: render with given props → assert visible output; fire events → assert state changes the user would notice (text, list contents, aria states, error messages).",
        fa: "رفتار قابل‌مشاهده را تست کنید: رندر با props داده‌شده ← assert خروجی نمایان؛ اجرای ایونت ← assert تغییراتی که کاربر می‌بیند (متن، محتوای لیست، وضعیت‌های aria، پیام خطا).",
      },
      {
        en: "Do NOT test: internal state/hook structure, exact class names, implementation details of third-party components, pixel styling. Those change under refactors that preserve behavior — breaking tests that should have passed.",
        fa: "تست نکنید: state داخلی/ساختار هوک‌ها، کلاس‌های دقیق، جزئیات پیاده‌سازی کامپوننت‌های شخص ثالث، استایل پیکسلی. این‌ها در بازآرایی‌هایی که رفتار را حفظ می‌کنند تغییر می‌کنند — و تست‌هایی را می‌شکنند که باید سبز می‌ماندند.",
      },
      {
        en: "Brittleness mechanism: querying by className couples the test to styling decisions; queryByRole/LabelText couples it to accessibility semantics — which are the actual user contract (and screen-reader behavior).",
        fa: "سازوکار شکنندگی: جستجو با className تست را به تصمیم‌های استایل گره می‌زند؛ queryByRole/LabelText آن را به سمانتیک دسترس‌پذیری گره می‌زند — که قرارداد واقعی کاربر است (و رفتار اسکرین‌ریدر).",
      },
      {
        en: "Bonus: MSW for API mocking (no network flake), userEvent over fireEvent, and snapshot only for small stable outputs.",
        fa: "امتیاز: MSW برای ماک کردن API (بدون flake شبکه)، userEvent به‌جای fireEvent و snapshot فقط برای خروجی‌های کوچک پایدار.",
      },
    ],
    categoryId: "testing",
  },

  // ────────────────────────────── Performance ──────────────────────────────
  {
    id: "perf-inp-cls",
    type: "theory",
    topic: "performance",
    difficulty: 2,
    question: {
      en: "A marketing page scores badly on INP and CLS. What are these metrics measuring, and name two concrete fixes for each.",
      fa: "یک صفحه بازاریابی در INP و CLS نمره بد می‌گیرد. این متریک‌ها چه چیزی را می‌سنجند و برای هر کدام دو راه‌حل مشخص بگویید.",
    },
    hints: [
      { en: "INP = responsiveness of interactions; CLS = layout shifts from content arriving late.", fa: "INP = پاسخ‌گویی تعامل‌ها؛ CLS = جابه‌جایی چیدمان از رسیدن دیرهنگام محتوا." },
    ],
    answer: [
      {
        en: "INP (Interaction to Next Paint) measures the worst-ish interaction latency — click/tap to visual feedback — across the page visit. CLS (Cumulative Layout Shift) sums unexpected layout movement as content loads.",
        fa: "INP (Interaction to Next Paint) تأخیر تعامل‌ها — کلیک/تپ تا بازخورد بصری — را در طول بازدید می‌سنجد. CLS (Cumulative Layout Shift) مجموع جابه‌جایی‌های غیرمنتظره چیدمان حین بارگذاری است.",
      },
      {
        en: "INP fixes: break long tasks (yield with scheduler.yield/setTimeout, split work), avoid heavy synchronous JS on interaction handlers, and give instant visual feedback (optimistic UI, skeletons) before data arrives.",
        fa: "اصلاح INP: شکستن تسک‌های طولانی (yield با scheduler.yield/setTimeout، تقسیم کار)، پرهیز از JS سنگین همزمان در هندلرها و بازخورد بصری فوری (UI خوش‌بینانه، اسکلتون) قبل از رسیدن داده.",
      },
      {
        en: "CLS fixes: reserve space for images/iframes with width+height or aspect-ratio, avoid injecting banners/cookie bars above content, and use font-display with size-adjust fallbacks so text swap does not reflow the page.",
        fa: "اصلاح CLS: رزرو فضا برای تصویر/iframe با width+height یا aspect-ratio، پرهیز از تزریق بنر/کوکی‌بار بالای محتوا و استفاده از font-display با فال‌بک size-adjust تا تعویض فونت صفحه را جابه‌جا نکند.",
      },
      {
        en: "Measure with real-user data (CrUX, RUM) before and after; lab tools (Lighthouse) approximate but field data decides — 'measure twice, optimize once'.",
        fa: "قبل و بعد با داده کاربر واقعی بسنجید (CrUX، RUM)؛ ابزارهای lab (Lighthouse) تقریبی‌اند اما داده میدانی حرف آخر را می‌زند — «دو بار اندازه بگیر، یک بار بهینه کن».",
      },
    ],
    categoryId: "performance",
  },
  {
    id: "perf-code-splitting",
    type: "theory",
    topic: "performance",
    difficulty: 2,
    question: {
      en: "Your Next.js app ships one 900KB JS bundle. Walk through your code-splitting strategy: route-level, component-level, and what you would NOT lazy-load.",
      fa: "اپ Next.js شما یک باندل جاوااسکریپت ۹۰۰ کیلوبایتی می‌فرستد. استراتژی code splitting خود را توضیح دهید: سطح مسیر، سطح کامپوننت و اینکه چه چیزی را lazy-load نمی‌کنید.",
    },
    hints: [
      { en: "Route-level splitting is free in the App Router — every page is split by default.", fa: "تفکیک سطح مسیر در App Router مجانی است — هر صفحه به‌صورت پیش‌فرض جدا است." },
    ],
    answer: [
      {
        en: "Route-level first: the App Router splits per route automatically, so the win is auditing what's imported globally (analytics, editor libs, icon barrels) and moving them to the pages that use them.",
        fa: "اول سطح مسیر: App Router خودش هر مسیر را جدا می‌کند، پس برد واقعی، ممیزی ایمپورت‌های سراسری (آنالیتیکس، کتابخانه ادیتور، barrel آیکون‌ها) و منتقل‌کردن آن‌ها به صفحات استفاده‌کننده است.",
      },
      {
        en: "Component-level with next/dynamic (or React.lazy): heavy below-the-fold or conditional widgets — chart libraries, modals, rich-text editors, maps — load on demand; pair with Suspense fallbacks so the layout never jumps (CLS).",
        fa: "سطح کامپوننت با next/dynamic (یا React.lazy): ویجت‌های سنگین زیر چین‌گاه یا شرطی — کتابخانه چارت، مودال، ادیتور متن، نقشه — در صورت نیاز لود می‌شوند؛ همراه با فال‌بک Suspense تا چیدمان نپرد (CLS).",
      },
      {
        en: "Do NOT lazy-load: the site header, primary nav, or anything in the critical above-the-fold path — the waterfall delay hurts INP/UX more than the bytes save. Also avoid over-splitting into hundreds of tiny chunks (request overhead).",
        fa: "Lazy-load نکنید: هدر سایت، ناوبری اصلی یا هر چیز در مسیر بحرانی بالای چین‌گاه — تأخیر آبشاری بیشتر از صرفه‌جویی بایت به UX و INP آسیب می‌زند. از تفکیک افراطی به صدها چانک ریز هم پرهیز کنید (سربار درخواست).",
      },
      {
        en: "Verify: next/bundle-analyzer, import cost of barrel files (lodash → lodash-es per-function imports), and tree-shaking-friendly libraries. Numbers win: '900KB → 180KB initial, TBT −60%'.",
        fa: "راستی‌آزمایی: next/bundle-analyzer، هزینه ایمپورت barrelها (lodash ← ایمپورت تابع‌به‌تابع lodash-es) و کتابخانه‌های سازگار با tree-shaking. عدد بگویید: «۹۰۰KB ← ۱۸۰KB اولیه، TBT −۶۰٪».",
      },
    ],
    categoryId: "performance",
  },

  // ────────────────────────────── AI tooling ──────────────────────────────
  {
    id: "ai-when-not-llm",
    type: "theory",
    topic: "ai",
    difficulty: 2,
    question: {
      en: "A PM asks you to add an LLM to classify support tickets. When is an LLM the wrong tool, and what cheaper alternatives would you propose first?",
      fa: "مدیر محصول از شما می‌خواهد برای دسته‌بندی تیکت‌های پشتیبانی LLM اضافه کنید. کی LLM ابزار اشتباهی است و اول چه جایگزین‌های ارزان‌تری پیشنهاد می‌دهید؟",
    },
    hints: [
      { en: "A fixed set of categories with labeled history is a classic small-model / rules problem.", fa: "مجموعه ثابتی از دسته‌ها با تاریخچه لیبل‌خورده، مسئله کلاسیک مدل کوچک/قاعده‌محور است." },
    ],
    answer: [
      {
        en: "LLM is the wrong tool when: inputs are a closed set with abundant labeled data (classification), latency/uptime guarantees matter more than flexibility, output must be deterministic and auditable, or cost-per-request at scale exceeds the value.",
        fa: "LLM ابزار اشتباه است وقتی: ورودی‌ها مجموعه بسته‌ای با داده لیبل‌خورده فراوان است (دسته‌بندی)، تضمین تأخیر/آپ‌تایم مهم‌تر از انعطاف است، خروجی باید قطعی و قابل‌حسابرسی باشد، یا هزینه هر درخواست در مقیاس از ارزشش بیشتر شود.",
      },
      {
        en: "Cheaper ladder: (1) keyword/rule router for the obvious 60–70%, (2) small fine-tuned classifier (fastText/BERT-class) trained on history for the rest, (3) LLM only as the fallback for low-confidence cases — with confidence routing.",
        fa: "نردبان ارزان‌تر: (۱) روتر قاعده‌ای/کلیدواژه‌ای برای ۶۰–۷۰٪ واضح، (۲) دسته‌بند کوچک فاین‌تیون‌شده (fastText/کلاس BERT) برای بقیه، (۳) LLM فقط به‌عنوان فال‌بک حالت‌های کم‌اعتماد — با مسیریابی بر اساس اطمینان.",
      },
      {
        en: "When you DO use the LLM: strict JSON output schema, temperature 0, evaluation set with accuracy/latency/cost budgets, and a human review queue for the low-confidence band.",
        fa: "وقتی واقعاً از LLM استفاده می‌کنید: اسکیمای سخت JSON، temperature صفر، مجموعه ارزیابی با بودجه دقت/تأخیر/هزینه و صف بازبینی انسانی برای بازه کم‌اعتماد.",
      },
      {
        en: "Interviewers hear 'AI experience' everywhere — the differentiator is showing you know where AI is NOT the answer, and shipping the boring version first.",
        fa: "مصاحبه‌گرها همه‌جا «تجربه هوش مصنوعی» می‌شنوند — متمایزکننده این است که نشان دهید می‌دانید کجا هوش مصنوعی پاسخ نیست و اول نسخه خسته‌کننده را می‌سازید.",
      },
    ],
    categoryId: "ai-tooling",
  },
  {
    id: "ai-prompt-code-review",
    type: "coding",
    topic: "ai",
    difficulty: 3,
    question: {
      en: "Your team wants an AI reviewer bot for pull requests. Write the shape of the system prompt you would use, and explain how you keep hallucinated findings under control.",
      fa: "تیم شما می‌خواهد ربات بازبین هوش مصنوعی برای PR داشته باشد. اسکلت پرامپت سیستمی که استفاده می‌کنید را بنویسید و توضیح دهید چطور یافته‌های توهمی را کنترل نگه می‌دارید.",
    },
    hints: [
      { en: "Role + scope + output contract + refusal rules; then ground the model with the actual diff and relevant repo conventions.", fa: "نقش + محدوده + قرارداد خروجی + قوانین امتناع؛ بعد مدل را با دیف واقعی و قراردادهای مخزن، زمینه‌دار کنید." },
    ],
    answer: [
      {
        en: "Prompt skeleton: role ('senior reviewer for this stack'), scope (correctness, security, tests — not style, lint handles that), output contract (JSON list: file, line, severity, category, suggestion), and refusal rule ('if unsure, do not report; never invent APIs').",
        fa: "اسکلت پرامپت: نقش («بازبین سنیور برای این استک»)، محدوده (صحت، امنیت، تست — نه استایل، لینت کارش را می‌کند)، قرارداد خروجی (لیست JSON: فایل، خط، شدت، دسته، پیشنهاد) و قانون امتناع («اگر مطمئن نیستی گزارش نکن؛ هرگز API از خودت نساز»).",
      },
      {
        en: "Grounding: send only the diff plus the touched functions' real source (not the whole repo), include team conventions verbatim (project rules file), and pin the model version — regressions in behavior are otherwise invisible.",
        fa: "زمینه‌سازی: فقط دیف به‌علاوه سورس واقعی توابع تغییرکرده را بفرستید (نه کل مخزن)، قراردادهای تیم را عیناً بگنجانید (فایل قواعد پروژه) و نسخه مدل را پین کنید — وگرنه رگرسیون رفتار نامرئی می‌ماند.",
      },
      {
        en: "Hallucination controls: require the model to quote the exact offending line back (ungrounded quotes get dropped), cap findings per PR, run two passes (high recall → verification pass) and only publish findings that survive both.",
        fa: "کنترل توهم: از مدل بخواهید خط دقیق مشکل‌دار را نقل کند (نقل‌قول‌های بی‌پشتوانه حذف می‌شوند)، سقف یافته‌ها در هر PR، اجرای دو گذر (حساسیت بالا ← گذر راستی‌آزمایی) و فقط انتشار یافته‌هایی که هر دو را رد کنند.",
      },
      {
        en: "Feedback loop: thumbs-up/down on findings becomes your eval set — measure precision monthly, and keep the bot's comments advisory (no blocking) until precision earns trust.",
        fa: "حلقه بازخورد: تأیید/رد کاربران روی یافته‌ها مجموعه ارزیابی شما می‌شود — دقت را ماهانه بسنجید و کامنت‌های ربات را تا زمانی که دقت اعتماد بیاورد، صرفاً توصیه‌ای نگه دارید (مسدودکننده نباشد).",
      },
    ],
    categoryId: "ai-tooling",
  },

  // ────────────────────────────── Accessibility ──────────────────────────────
  {
    id: "a11y-accessible-modal",
    type: "coding",
    topic: "a11y",
    difficulty: 2,
    question: {
      en: "You must build an accessible modal dialog from scratch (no library). List the requirements: semantics, focus behavior, keyboard, and screen-reader announcement.",
      fa: "باید یک دیالوگ مودال دسترس‌پذیر از صفر بسازید (بدون کتابخانه). الزامات را بگویید: سمانتیک، رفتار فوکوس، کیبورد و اعلام برای اسکرین‌ریدر.",
    },
    hints: [
      { en: "Radix, Headless UI and the WAI-ARIA APG dialog pattern are your reference points.", fa: "Radix، Headless UI و الگوی دیالوگ در WAI-ARIA APG نقاط مرجع شما هستند." },
    ],
    answer: [
      {
        en: "Semantics: role='dialog' (or <dialog>), aria-modal='true', a visible accessible name via aria-labelledby pointing at the title, and optionally aria-describedby for the description.",
        fa: "سمانتیک: role='dialog' (یا <dialog>)، aria-modal='true'، نام دسترس‌پذیرِ نمایان با aria-labelledby اشاره‌کننده به عنوان و به‌اختیار aria-describedby برای توضیح.",
      },
      {
        en: "Focus: on open, focus moves to the dialog (first focusable or the panel itself with tabIndex=-1); Tab/Shift+Tab cycle inside (focus trap); on close, focus returns to the element that opened it.",
        fa: "فوکوس: هنگام باز شدن، فوکوس به دیالوگ می‌رود (اولین فوکوس‌پذیر یا خود پنل با tabIndex=-1)؛ Tab/Shift+Tab داخل می‌چرخند (تله فوکوس)؛ هنگام بستن، فوکوس به المان بازکننده برمی‌گردد.",
      },
      {
        en: "Keyboard: Escape closes; no keyboard traps elsewhere on the page (background content is inert: aria-hidden + pointer-events blocked so screen readers and mouse both behave).",
        fa: "کیبورد: Escape می‌بندد؛ در بقیه صفحه تله کیبورد نباشد (محتوای پس‌زمینه inert شود: aria-hidden + مسدودسازی pointer-events تا هم اسکرین‌ریدر هم ماوس درست رفتار کنند).",
      },
      {
        en: "Plus: scroll lock on the body, click-outside-to-close without stealing focus management, and testing with an actual screen reader (NVDA/VoiceOver) — automated axe checks catch maybe half of real issues.",
        fa: "علاوه بر این‌ها: قفل اسکرول body، بستن با کلیک بیرون بدون به‌هم‌ریختن مدیریت فوکوس و تست با اسکرین‌ریدر واقعی (NVDA/VoiceOver) — چک‌های خودکار axe شاید نیمی از مشکلات واقعی را می‌گیرند.",
      },
    ],
    categoryId: "performance",
  },

  // ────────────────────────────── Behavioral ──────────────────────────────
  {
    id: "beh-conflict-teammate",
    type: "behavioral",
    topic: "behavioral",
    difficulty: 2,
    question: {
      en: "Tell me about a time you disagreed with a teammate on a technical decision. How did you resolve it, and what was the outcome?",
      fa: "از زمانی بگویید که با هم‌تیمی‌تان درباره یک تصمیم فنی اختلاف نظر داشتید. چطور حلش کردید و نتیجه چه شد؟",
    },
    hints: [
      { en: "Use STAR: Situation, Task, Action, Result. Interviewers grade the Action and Result the heaviest.", fa: "از STAR استفاده کنید: موقعیت، وظیفه، اقدام، نتیجه. مصاحبه‌گرها روی اقدام و نتیجه بیشترین نمره را می‌دهند." },
    ],
    answer: [
      {
        en: "Situation/Task: name the disagreement concretely (e.g. state management choice, API design) and the deadline pressure — no vague 'we had different opinions'.",
        fa: "موقعیت/وظیفه: اختلاف را مشخص نام ببرید (مثلاً انتخاب مدیریت state، طراحی API) و فشار ددلاین — نه «نظرهایمان فرق داشت» مبهم.",
      },
      {
        en: "Action: show you sought understanding first (asked why, listed their constraints), brought the debate to data (a small spike/PoC, docs, RFC), and aligned on criteria BEFORE options (perf budget, hiring pool, migration cost).",
        fa: "اقدام: نشان دهید اول دنبال فهمیدن بودید (پرسیدن چرا، فهرست محدودیت‌های آن‌ها)، بحث را به داده بردید (اسپایک/PoC کوچک، مستندات، RFC) و قبل از گزینه‌ها روی معیارها هم‌نظر شدید (بودجه کارایی، دسترسی به نیروی آشنا، هزینه مهاجرت).",
      },
      {
        en: "Result: the decision itself matters less than the mechanism — 'we picked X, measured it, and agreed on a revisit trigger'. Own your part in the disagreement; never badmouth the teammate.",
        fa: "نتیجه: خودِ تصمیم از سازوکار مهم‌تر نیست — «X را انتخاب کردیم، اندازه گرفتیم و درباره زمان بازبینی توافق کردیم». سهم خودتان در اختلاف را بپذیرید؛ هرگز هم‌تیمی را بدگویی نکنید.",
      },
      {
        en: "Follow-up they will ask: 'what if you were wrong?' Have the humility story ready — that follow-up tests your growth, not the original decision.",
        fa: "سوال بعدی‌شان این خواهد بود: «اگر اشتباه می‌کردی چه؟» داستان فروتنی آماده داشته باشید — آن سوال رشد شما را می‌سنجد، نه تصمیم اولیه را.",
      },
    ],
  },
  {
    id: "beh-missed-deadline",
    type: "behavioral",
    topic: "behavioral",
    difficulty: 2,
    question: {
      en: "Describe a time you realized mid-sprint that you would miss a deadline. What did you do, and what did you change afterwards?",
      fa: "زمانی را توصیف کنید که وسط اسپرینت فهمیدید ددلاین را از دست می‌دهید. چه کردید و بعداً چه چیزی را تغییر دادید؟",
    },
    hints: [
      { en: "The story is about early escalation and trade-off framing, not heroics.", fa: "داستان درباره اطلاع‌رسانی زودهنگام و چارچوب‌بندی توازن‌هاست، نه قهرمان‌بازی." },
    ],
    answer: [
      {
        en: "Action: flagged the risk as soon as evidence existed (estimate re-check, blocker found) — days early, not hours. Come with options, not problems: cut scope (which feature slices), move the date, or add help — each with its cost.",
        fa: "اقدام: به‌محض ظهور شواهد (بازبینی برآورد، پیدا شدن بلاکر) ریسک را اطلاع دادید — چند روز قبل، نه چند ساعت. با گزینه بیایید نه مسئله: کم‌کردن دامنه (کدام برش‌های فیچر)، جابه‌جایی تاریخ یا افزودن نیرو — هر یک با هزینه‌اش.",
      },
      {
        en: "Do NOT: silent overtime until the last minute (hides the risk from planning), blame the estimation process, or ship quality-lowering shortcuts without agreement.",
        fa: "نکن: اضافه‌کاری ساکت تا آخرین لحظه (ریسک را از برنامه‌ریزی پنهان می‌کند)، سرزنش فرآیند برآورد یا ارسال میان‌برهای کاهش‌دهنده کیفیت بدون توافق.",
      },
      {
        en: "Result: what shipped, what moved, and how stakeholders reacted. Then the systemic change: smaller estimates slices, spikes before committing to unknowns, buffer policy, or a definition-of-ready check.",
        fa: "نتیجه: چه چیزی ارسال شد، چه چیزی جابه‌جا شد و واکنش ذی‌نفعان. سپس تغییر سیستمی: برش‌های برآورد کوچک‌تر، اسپایک قبل از متعهد شدن به ناشناخته‌ها، سیاست بافر یا چک تعریف-آماده.",
      },
      {
        en: "Interviewer signal: they want evidence you treat deadlines as shared plans, not personal bravado — 'I told the team early and we re-planned together' beats 'I crunched all night'.",
        fa: "سیگنال مصاحبه‌گر: می‌خواهند نشانه‌ای ببینند که ددلاین را برنامه‌ای مشترک می‌بینید نه نمایش شخصی — «زود به تیم گفتم و با هم دوباره برنامه‌ریزی کردیم» از «تمام شب کار کردم» بهتر است.",
      },
    ],
  },
  {
    id: "beh-ambiguity",
    type: "behavioral",
    topic: "behavioral",
    difficulty: 3,
    question: {
      en: "Tell me about a task you owned with vague requirements. How did you turn ambiguity into a plan you could execute?",
      fa: "از کاری بگویید که مالکیتش را داشتید و نیازمندی‌هایش مبهم بود. چطور از ابهام به برنامه‌ای قابل‌اجرا رسیدید؟",
    },
    hints: [
      { en: "The hero answer ('I just built what felt right') fails here. The strong answer shows a discovery loop with stakeholders.", fa: "پاسخ قهرمانی («همان چیزی را ساختم که درست حس می‌شد») اینجا شکست می‌خورد. پاسخ قوی حلقه کشف با ذی‌نفعان را نشان می‌دهد." },
    ],
    answer: [
      {
        en: "First move: reframe the goal — who is the user, what outcome do they need, what does success look like measurably? Write it down and get a 15-minute sign-off. Ambiguity you can name stops being scary.",
        fa: "حرکت اول: بازتعریف هدف — کاربر کیست، به چه نتیجه‌ای نیاز دارد و موفقیت به‌صورت قابل‌اندازه‌گیری چه شکلی است؟ بنویسید و ۱۵ دقیقه تأیید بگیرید. ابهامی که نامش را بدانید دیگر ترسناک نیست.",
      },
      {
        en: "Then de-risk in slices: list assumptions ranked by 'uncertain × expensive if wrong', spike the top one (a prototype, a data pull, a user chat), and let results pick the next slice. Deliver a walking skeleton early, then widen.",
        fa: "بعد در برش‌ها ریسک‌زدایی کنید: فرضیه‌ها را بر اساس «مجهول بودن × گران بودن اگر اشتباه باشد» رتبه‌بندی کنید، مورد اول را اسپایک بزنید (پروتوتایپ، واکشی داده، گفتگو با کاربر) و اجازه دهید نتیجه، برش بعدی را انتخاب کند. اسکلت متحرک را زود تحویل دهید، بعد گسترش دهید.",
      },
      {
        en: "Communication: a short written plan (RFC/PRD-lite) with open questions listed visibly — reviewers see what you decided AND what you need from them. Progress demos replace status meetings.",
        fa: "ارتباط: یک برنامه کوتاه مکتوب (RFC/PRD سبک) با فهرست نمایان سوالات باز — بازبین‌ها هم تصمیم‌ها را می‌بینند هم اینکه از چه چیزی از آن‌ها نیاز دارید. دموی پیشرفت جای جلسات وضعیت را می‌گیرد.",
      },
      {
        en: "Result statement should include a learning: 'the initial assumption about X was wrong; the spike saved two weeks' — ambiguity handled is a skill, not luck.",
        fa: "بیان نتیجه باید یک آموخته داشته باشد: «فرضیه اولیه درباره X غلط بود؛ اسپایک دو هفته صرفه‌جویی کرد» — مدیریت ابهام مهارت است، نه شانس.",
      },
    ],
  },
];

// ────────────────────────── date & streak helpers ──────────────────────────

/** Local date key (YYYY-MM-DD) — "today" follows the user's clock. */
export function dateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysOf(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  return Math.floor(Date.UTC(y, (m ?? 1) - 1, d ?? 1) / 86_400_000);
}

/**
 * Deterministic daily pick — the same challenge for every device on the same
 * local date. Positive modulo keeps the mapping stable for negative day counts.
 */
export function challengeForDate(key: string): Challenge {
  const idx = ((daysOf(key) % challenges.length) + challenges.length) % challenges.length;
  return challenges[idx] ?? challenges[0]!;
}

/** Parse-free: yesterday's key relative to a key string. */
export function shiftKey(key: string, days: number): string {
  const ms = daysOf(key) * 86_400_000 + days * 86_400_000;
  const date = new Date(ms);
  return dateKey(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

/** Longest run of consecutive calendar days within the given keys. */
export function bestStreakOf(keys: string[]): number {
  if (keys.length === 0) return 0;
  const sorted = [...new Set(keys)].map(daysOf).sort((a, b) => a - b);
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]! + 1) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }
  return best;
}

/**
 * Current streak: consecutive days ending today (or yesterday — today's
 * challenge may not be done yet, the streak is still alive).
 */
export function currentStreakOf(keys: string[], today: string = dateKey()): number {
  const set = new Set(keys);
  if (!set.has(today) && !set.has(shiftKey(today, -1))) return 0;
  let streak = 0;
  let cursor = set.has(today) ? today : shiftKey(today, -1);
  while (set.has(cursor)) {
    streak += 1;
    cursor = shiftKey(cursor, -1);
  }
  return streak;
}
