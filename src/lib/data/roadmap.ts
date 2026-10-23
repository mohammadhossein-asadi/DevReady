import type { LocaleText } from "./types";

export interface StudyStage {
  num: number;
  title: LocaleText;
  duration: LocaleText;
  resources: string[];
  goals: LocaleText[];
}

export const studyStages: StudyStage[] = [
  {
    num: 0,
    title: { en: "Orientation", fa: "آشنایی و جهت‌گیری" },
    duration: { en: "1–2 days", fa: "۱ تا ۲ روز" },
    resources: [
      "Front End Interview Handbook (overview)",
      "Tech Interview Handbook",
    ],
    goals: [
      { en: "Read the Front End Interview Handbook overview", fa: "مرور کلی راهنمای مصاحبه فرانت‌اند را بخوانید" },
      { en: "Skim Tech Interview Handbook", fa: "Tech Interview Handbook را تندخوانی کنید" },
      { en: "Choose your main target: Frontend / Backend / Full-Stack", fa: "هدف اصلی خود را انتخاب کنید: فرانت‌اند / بک‌اند / فول‌استک" },
      { en: "Set a realistic timeline (4–12 weeks depending on experience)", fa: "جدول زمانی واقع‌بینانه تعیین کنید (۴ تا ۱۲ هفته بسته به تجربه)" },
    ],
  },
  {
    num: 1,
    title: { en: "Solid Fundamentals", fa: "مبانی محکم" },
    duration: { en: "1–2 weeks", fa: "۱ تا ۲ هفته" },
    resources: [
      "MDN Web Docs (HTML, CSS, JavaScript, Web APIs)",
      "JavaScript.info",
      "web.dev Learn (HTML + CSS)",
      "Flexbox Froggy + Grid Garden",
    ],
    goals: [
      { en: "Understand the browser, DOM, CSS layout, and core JavaScript deeply", fa: "درک عمیق مرورگر، DOM، چیدمان CSS و جاوااسکریپت پایه" },
      { en: "Be comfortable explaining how the web works end-to-end", fa: "توانایی توضیح دادن کارکرد وب به‌صورت سرتاسری" },
    ],
  },
  {
    num: 2,
    title: { en: "Interview-Focused Frontend Core", fa: "هسته فرانت‌اند با تمرکز مصاحبه" },
    duration: { en: "2–3 weeks", fa: "۲ تا ۳ هفته" },
    resources: [
      "Front End Interview Handbook",
      "Frontend Interview Prep",
      "GreatFrontEnd (free sections)",
      "33 JS Concepts",
      "You Don't Know JS (selected books)",
      "sudheerj/javascript-interview-questions",
      "lydiahallie/javascript-questions",
    ],
    goals: [
      { en: "Master common trivia and conceptual questions", fa: "تسلط بر سوالات متداول و مفهومی" },
      { en: "Practice explaining closures, prototypes, event loop, this, promises, etc.", fa: "تمرین توضیح کلیژرها، پروتوتایپ‌ها، ایونت‌لوپ، this، پرامیس‌ها و غیره" },
      { en: "Solve output-based JavaScript questions daily", fa: "حل روزانه سوالات خروجی‌محور جاوااسکریپت" },
    ],
  },
  {
    num: 3,
    title: { en: "Framework Mastery (React + Next.js)", fa: "تسلط بر فریم‌ورک‌ها (ریکت + نکست‌جی‌اس)" },
    duration: { en: "2–4 weeks", fa: "۲ تا ۴ هفته" },
    resources: [
      "Official React docs (Learn + Reference)",
      "Official Next.js docs + Next.js Learn",
      "GreatFrontEnd React Interview Playbook",
      "sudheerj/reactjs-interview-questions",
      "React TypeScript Cheatsheets",
      "TanStack Query + Zustand or Redux Toolkit (as needed)",
    ],
    goals: [
      { en: "Deep understanding of hooks, rendering, state management, performance", fa: "درک عمیق هوک‌ها، رندرینگ، مدیریت state و کارایی" },
      { en: "Ability to implement common UI patterns and discuss trade-offs", fa: "توانایی پیاده‌سازی الگوهای رایج UI و بحث درباره توازن‌ها" },
      { en: "Comfort with Server Components and modern Next.js patterns", fa: "آشنایی با Server Components و الگوهای مدرن نکست‌جی‌اس" },
    ],
  },
  {
    num: 4,
    title: { en: "Coding & Machine Coding Practice", fa: "تمرین کدنویسی و ماشین‌کدینگ" },
    duration: { en: "Ongoing", fa: "مداوم" },
    resources: [
      "NeetCode (Roadmap + Blind 75 / Grind 75)",
      "LeetCode",
      "GreatFrontEnd JavaScript DSA",
      "Frontend Mentor + Frontend Mini Challenges",
      "DOM Challenge repositories",
    ],
    goals: [
      { en: "Consistent problem-solving rhythm", fa: "ریتم مستمر حل مسئله" },
      { en: "Ability to implement clean, production-like UI under time pressure", fa: "توانایی پیاده‌سازی UI تمیز و نزدیک به محیط تولید زیر فشار زمان" },
      { en: "Strong command of common data structures and algorithms in JavaScript", fa: "تسلط قوی بر ساختارهای داده و الگوریتم‌های رایج در جاوااسکریپت" },
    ],
  },
  {
    num: 5,
    title: { en: "Backend, Databases & APIs", fa: "بک‌اند، پایگاه داده و APIها" },
    duration: { en: "2–3 weeks for Full-Stack", fa: "۲ تا ۳ هفته برای فول‌استک" },
    resources: [
      "Node.js official documentation + Learn section",
      "Express / NestJS / Fastify docs",
      "PostgreSQL docs + SQLBolt + Use The Index, Luke!",
      "MongoDB University (if relevant)",
      "Backend question banks (AS-Backend-Institute, sudheerj/nodejs-interview-questions, roadmap.sh)",
    ],
    goals: [
      { en: "Design simple REST/GraphQL APIs", fa: "طراحی APIهای ساده REST/GraphQL" },
      { en: "Understand authentication, sessions, JWT, and basic security", fa: "درک احراز هویت، سشن، JWT و امنیت پایه" },
      { en: "Write efficient SQL and understand indexing", fa: "نوشتن SQL بهینه و درک ایندکس‌گذاری" },
    ],
  },
  {
    num: 6,
    title: { en: "System Design & Architecture", fa: "طراحی سیستم و معماری" },
    duration: { en: "2–4 weeks for Mid/Senior", fa: "۲ تا ۴ هفته برای میدلسنیور" },
    resources: [
      "System Design Primer (donnemartin)",
      "ByteByteGo + system-design-101",
      "Tech Interview Handbook System Design section",
      "GreatFrontEnd Frontend System Design",
      "Design Gurus / Educative (selected)",
    ],
    goals: [
      { en: "Ability to design scalable frontend and full-stack systems", fa: "توانایی طراحی سیستم‌های مقیاس‌پذیر فرانت‌اند و فول‌استک" },
      { en: "Practice common problems: URL shortener, news feed, chat, autocomplete, data grids, etc.", fa: "تمرین مسائل رایج: کوتاه‌کننده لینک، فید خبری، چت، اتوکامپلیت، دیتاگرید و غیره" },
      { en: "Communicate trade-offs clearly (consistency, caching, availability, latency)", fa: "ارتباط شفاف توازن‌ها (سازگاری، کش، دسترس‌پذیری، تأخیر)" },
    ],
  },
  {
    num: 7,
    title: { en: "Security, Testing, Performance & Quality", fa: "امنیت، تست، کارایی و کیفیت" },
    duration: { en: "1–2 weeks", fa: "۱ تا ۲ هفته" },
    resources: [
      "OWASP Top 10 + PortSwigger Web Security Academy",
      "Testing Library + Playwright / Cypress",
      "web.dev Performance + Core Web Vitals",
      "WCAG + WAI-ARIA practices",
      "Lighthouse + PageSpeed Insights",
    ],
    goals: [
      { en: "Recognize and prevent common web vulnerabilities", fa: "شناسایی و پیشگیری از آسیب‌پذیری‌های رایج وب" },
      { en: "Write meaningful tests", fa: "نوشتن تست‌های معنادار" },
      { en: "Optimize loading, interactivity, and accessibility", fa: "بهینه‌سازی بارگذاری، تعامل و دسترس‌پذیری" },
    ],
  },
  {
    num: 8,
    title: { en: "Behavioral & Company-Specific Preparation", fa: "مصاحبه رفتاری و آمادگی شرکت‌ها" },
    duration: { en: "1–2 weeks", fa: "۱ تا ۲ هفته" },
    resources: [
      "Tech Interview Handbook (Behavioral)",
      "STAR method guides",
      "Company career pages (Google, Amazon, Meta, Microsoft, etc.)",
      "Glassdoor + Levels.fyi",
      "Interview experience repositories",
    ],
    goals: [
      { en: "Prepare strong stories using the STAR framework", fa: "آماده‌سازی داستان‌های قوی با چارچوب STAR" },
      { en: "Research target companies and common interview formats", fa: "تحقیق درباره شرکت‌های هدف و قالب‌های رایج مصاحبه" },
      { en: "Practice mock interviews", fa: "تمرین مصاحبه‌های آزمایشی" },
    ],
  },
];

export interface RhythmRow {
  day: LocaleText;
  focus: LocaleText;
  time: LocaleText;
}

export const weeklyRhythm: RhythmRow[] = [
  {
    day: { en: "Mon–Fri", fa: "دوشنبه تا جمعه" },
    focus: { en: "Theory questions + 1 coding problem", fa: "سوالات نظری + ۱ مسئله کدنویسی" },
    time: { en: "1.5–3 hours", fa: "۱٫۵ تا ۳ ساعت" },
  },
  {
    day: { en: "Weekend 1", fa: "آخر هفته ۱" },
    focus: { en: "System design or machine-coding practice", fa: "طراحی سیستم یا تمرین ماشین‌کدینگ" },
    time: { en: "2–4 hours", fa: "۲ تا ۴ ساعت" },
  },
  {
    day: { en: "Weekend 2", fa: "آخر هفته ۲" },
    focus: { en: "Review weak areas + mock interview", fa: "مرور نقاط ضعف + مصاحبه آزمایشی" },
    time: { en: "2–3 hours", fa: "۲ تا ۳ ساعت" },
  },
];

export interface RolePath {
  role: LocaleText;
  path: LocaleText;
}

export const rolePaths: RolePath[] = [
  {
    role: { en: "Junior Frontend", fa: "فرانت‌اند جونیور" },
    path: { en: "Stages 1 → 2 → 3 → 4 (light algorithms) → 8", fa: "مراحل ۱ ← ۲ ← ۳ ← ۴ (الگوریتم سبک) ← ۸" },
  },
  {
    role: { en: "Mid-level Frontend / React", fa: "فرانت‌اند میدلول / ریکت" },
    path: { en: "Stages 1–4 fully + Stage 6 (Frontend System Design) + Stage 7 + Stage 8", fa: "مراحل ۱ تا ۴ کامل + مرحله ۶ (طراحی سیستم فرانت‌اند) + مرحله ۷ + مرحله ۸" },
  },
  {
    role: { en: "Full-Stack (Node.js)", fa: "فول‌استک (نود‌جی‌اس)" },
    path: { en: "All stages, with extra depth on Stage 5 and Stage 6", fa: "همه مراحل، با عمق بیشتر در مرحله ۵ و مرحله ۶" },
  },
  {
    role: { en: "Senior / Staff", fa: "سنیور / استف" },
    path: { en: "Heavy emphasis on Stages 6, 7, and 8 + deep knowledge of architecture and trade-offs", fa: "تأکید زیاد بر مراحل ۶، ۷ و ۸ + دانش عمیق معماری و توازن‌ها" },
  },
];

export interface ProductPhase {
  num: number;
  title: LocaleText;
  items: LocaleText[];
  current?: boolean;
}

export const productPhases: ProductPhase[] = [
  {
    num: 1,
    title: { en: "Foundation", fa: "بنیان" },
    items: [
      { en: "Next.js App Router + TypeScript setup", fa: "راه‌اندازی Next.js App Router + TypeScript" },
      { en: "shadcn/ui design system + dark/light mode", fa: "سیستم دیزاین shadcn/ui + حالت روشن/تاریک" },
      { en: "Bilingual support (English / Persian) with correct RTL", fa: "پشتیبانی دوزبانه (انگلیسی / فارسی) با RTL صحیح" },
      { en: "Core resource catalog with all categories", fa: "کاتالوگ منابع با همه دسته‌ها" },
      { en: "Basic search and category filtering", fa: "جستجو و فیلتر دسته‌بندی پایه" },
      { en: "Responsive layout and accessibility baseline", fa: "چیدمان واکنش‌گرا و خط پایه دسترس‌پذیری" },
      { en: "Aceternity UI integration points prepared", fa: "نقاط یکپارچه‌سازی Aceternity UI آماده شده" },
    ],
  },
  {
    num: 2,
    title: { en: "Content Experience", fa: "تجربه محتوا" },
    current: true,
    items: [
      { en: "Advanced search with filters (technology, difficulty, free/paid, language)", fa: "جستجوی پیشرفته با فیلترها (تکنولوژی، سختی، رایگان/پولی، زبان)" },
      { en: "Resource detail pages with descriptions, tags, and related links", fa: "صفحات جزئیات منبع با توضیحات، برچسب‌ها و لینک‌های مرتبط" },
      { en: "Bookmark / save-for-later functionality", fa: "قابلیت نشان‌گذاری / ذخیره برای بعد" },
      { en: "Progress tracking (Studied / In Progress)", fa: "پیگیری پیشرفت (خوانده‌شده / در حال مطالعه)" },
      { en: "Study roadmap visualization (Aceternity Timeline)", fa: "بصری‌سازی نقشه راه مطالعه (Aceternity Timeline)" },
      { en: "Personalized suggested next resources", fa: "پیشنهاد شخصی‌سازی‌شده منابع بعدی" },
    ],
  },
  {
    num: 3,
    title: { en: "Practice Layer", fa: "لایه تمرین" },
    items: [
      { en: "Curated question sets from the best question banks", fa: "مجموعه سوالات منتخب از بهترین بانک‌های سوال" },
      { en: "Daily challenge mode (theory + coding prompt)", fa: "حالت چالش روزانه (نظری + کدنویسی)" },
      { en: "Frontend machine-coding challenges", fa: "چالش‌های ماشین‌کدینگ فرانت‌اند" },
      { en: "Spaced-repetition mode for key concepts", fa: "حالت مرور با فاصله‌گذاری برای مفاهیم کلیدی" },
      { en: "Simple note-taking per resource", fa: "یادداشت‌برداری ساده برای هر منبع" },
    ],
  },
  {
    num: 4,
    title: { en: "Community & Polish", fa: "انجمن و پالایش" },
    items: [
      { en: "Contribution system for new high-quality resources", fa: "سیستم مشارکت برای منابع جدید باکیفیت" },
      { en: "User feedback on resource quality and difficulty", fa: "بازخورد کاربران درباره کیفیت و سختی منابع" },
      { en: "Improved Persian content coverage and orthography checks", fa: "پوشش بهتر محتوای فارسی و بررسی املا" },
      { en: "Performance optimization and Core Web Vitals excellence", fa: "بهینه‌سازی کارایی و تعالی Core Web Vitals" },
      { en: "Optional user accounts for syncing progress", fa: "حساب کاربری اختیاری برای همگام‌سازی پیشرفت" },
    ],
  },
];
