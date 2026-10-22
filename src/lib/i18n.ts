/**
 * DevReady UI dictionaries — English & Persian.
 * Keys are flat strings; `{x}` placeholders are replaced at render time.
 */
export const dict = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.resources": "Resources",
    "nav.roadmap": "Roadmap",
    "brand.tagline": "Interview Prep",
    "brand.taglineFull": "Bilingual Web Development Interview Prep",

    // Hero
    "hero.badge": "Phase 1 · Foundation",
    "hero.title1": "Walk into your",
    "hero.title2": "web dev interview",
    "hero.title3": "ready.",
    "hero.subtitle":
      "A curated, bilingual library of {count}+ high-quality resources for Frontend, Backend, Full-Stack, System Design, Algorithms, Security and Behavioral rounds — in English and فارسی.",
    "hero.cta1": "Explore resources",
    "hero.cta2": "View roadmap",

    // Stats
    "stats.resources": "Resources",
    "stats.categories": "Categories",
    "stats.languages": "Languages",
    "stats.stages": "Roadmap stages",
    "stats.free": "Hand-picked & free-first",

    // Home sections
    "home.categories.title": "Browse by category",
    "home.categories.subtitle":
      "Every major interview topic, organized into 16 dedicated sections. Pick one to see its full resource list.",
    "home.featured.title": "Community favorites",
    "home.featured.subtitle": "The names you will keep hearing in every prep journey.",
    "home.how.title": "How to use DevReady",
    "home.how.step1.title": "Search & filter",
    "home.how.step1.desc":
      "Find exactly what you need by keyword, category or language — from handbooks to question banks.",
    "home.how.step2.title": "Follow the roadmap",
    "home.how.step2.desc":
      "A progressive path from fundamentals to system design, tuned to your target role.",
    "home.how.step3.title": "Practice consistently",
    "home.how.step3.desc":
      "Use question banks and machine-coding challenges to simulate real interview conditions.",
    "home.cta.title": "Start with the fundamentals.",
    "home.cta.subtitle":
      "Strong basics beat last-minute cramming — every time. The map is ready; the next step is yours.",
    "home.cta.button": "Open the resource library",

    // Resources view
    "res.title": "Resource library",
    "res.subtitle":
      "Search the full catalog and filter by category. Every resource from the source list is included.",
    "res.search": "Search resources…",
    "res.all": "All categories",
    "res.count": "{n} resources",
    "res.empty.title": "No resources match your filters",
    "res.empty.desc": "Try a different keyword, or clear the filters to see the full catalog.",
    "res.clear": "Clear filters",
    "res.persian": "فارسی only",
    "res.open": "Open resource",
    "res.badge.fa": "Persian",
    "res.practice.title": "Recommended practice topics",
    "res.group.label": "Group",

    // Roadmap view
    "road.title": "Roadmaps",
    "road.subtitle":
      "Two complementary maps: a study path for candidates, and the product roadmap for this app.",
    "road.tab.study": "Study path",
    "road.tab.roles": "Role paths",
    "road.tab.weekly": "Weekly rhythm",
    "road.tab.product": "Product roadmap",
    "road.stage": "Stage {n}",
    "road.goals": "Goals",
    "road.study.resources": "Primary resources",
    "road.roles.intro":
      "You do not need to finish every resource. Follow the progressive path that matches your target role and experience level.",
    "road.weekly.intro":
      "A sustainable weekly rhythm beats bursts of cramming. Adjust intensity as your interview approaches.",
    "road.weekly.day": "Day",
    "road.weekly.focus": "Focus",
    "road.weekly.time": "Time suggestion",
    "road.weekly.note":
      "Adjust intensity based on how close you are to real interviews.",
    "road.product.current": "Current",
    "road.product.intro":
      "How DevReady itself evolves — Phase 1 (Foundation) is what you are looking at now.",
    "road.phases": "Phase {n}",

    // Footer
    "footer.desc":
      "A calm, bilingual home for web development interview preparation — clear map, quality material, zero clutter.",
    "footer.explore": "Explore",
    "footer.stack": "Built with",
    "footer.stackValue": "Next.js · shadcn/ui · Tailwind CSS · Aceternity UI",
    "footer.license":
      "Open source. Individual resources retain their original licenses.",
    "footer.luck": "Good luck with your interviews. موفق باشید.",

    // Theme & language
    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "lang.label": "Language",
    "lang.toFa": "فارسی",
    "lang.toEn": "English",

    // A11y
    "a11y.skip": "Skip to main content",
    "a11y.nav": "Main navigation",
    "a11y.themeToggle": "Change theme",
    "a11y.langToggle": "Switch language",
    "a11y.search": "Search resources",
    "a11y.results": "Search results",
    "a11y.menu": "Open menu",
    "a11y.external": "(opens in a new tab)",
  },

  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.resources": "منابع",
    "nav.roadmap": "نقشه راه",
    "brand.tagline": "آمادگی مصاحبه",
    "brand.taglineFull": "پلتفرم دوزبانه آمادگی مصاحبه توسعه وب",

    // Hero
    "hero.badge": "فاز ۱ · بنیان",
    "hero.title1": "برای مصاحبه",
    "hero.title2": "توسعه وب،",
    "hero.title3": "آماده برو.",
    "hero.subtitle":
      "کتابخانه‌ای منتخب و دوزبانه از بیش از {count} منبع باکیفیت برای راند‌های فرانت‌اند، بک‌اند، فول‌استک، طراحی سیستم، الگوریتم، امنیت و مصاحبه رفتاری — به انگلیسی و فارسی.",
    "hero.cta1": "مشاهده منابع",
    "hero.cta2": "نقشه راه",

    // Stats
    "stats.resources": "منبع",
    "stats.categories": "دسته‌بندی",
    "stats.languages": "زبان",
    "stats.stages": "مرحله نقشه راه",
    "stats.free": "دست‌چین و عمدتاً رایگان",

    // Home sections
    "home.categories.title": "مرور بر اساس دسته",
    "home.categories.subtitle":
      "هر موضوع مهم مصاحبه، در ۱۶ بخش اختصاصی. یکی را انتخاب کنید تا فهرست کامل منابعش را ببینید.",
    "home.featured.title": "محبوب‌های جامعه",
    "home.featured.subtitle": "نام‌هایی که در هر مسیر آمادگی مدام خواهید شنید.",
    "home.how.title": "چطور از DevReady استفاده کنیم",
    "home.how.step1.title": "جستجو و فیلتر",
    "home.how.step1.desc":
      "دقیقاً همان چیزی که نیاز دارید را با کلیدواژه، دسته یا زبان پیدا کنید — از handbook تا بانک سوال.",
    "home.how.step2.title": "نقشه راه را دنبال کنید",
    "home.how.step2.desc":
      "مسیری پلکانی از مبانی تا طراحی سیستم، متناسب با نقش هدف شما.",
    "home.how.step3.title": "مداوم تمرین کنید",
    "home.how.step3.desc":
      "با بانک‌های سوال و چالش‌های ماشین‌کدینگ، شرایط واقعی مصاحبه را شبیه‌سازی کنید.",
    "home.cta.title": "از مبانی شروع کنید.",
    "home.cta.subtitle":
      "مبانی محکم همیشه از جمع‌زنی شبِ مصاحبه بهتر است. نقشه آماده است؛ قدم بعدی با شما.",
    "home.cta.button": "باز کردن کتابخانه منابع",

    // Resources view
    "res.title": "کتابخانه منابع",
    "res.subtitle":
      "کل کاتالوگ را جستجو کنید و بر اساس دسته فیلتر کنید. همه منابع فهرست اصلی همین‌جا هستند.",
    "res.search": "جستجوی منابع…",
    "res.all": "همه دسته‌ها",
    "res.count": "{n} منبع",
    "res.empty.title": "منبعی با این فیلترها پیدا نشد",
    "res.empty.desc": "کلیدواژه دیگری امتحان کنید، یا فیلترها را پاک کنید تا کل کاتالوگ را ببینید.",
    "res.clear": "پاک کردن فیلترها",
    "res.persian": "فقط فارسی",
    "res.open": "باز کردن منبع",
    "res.badge.fa": "فارسی",
    "res.practice.title": "موضوعات پیشنهادی تمرین",
    "res.group.label": "گروه",

    // Roadmap view
    "road.title": "نقشه‌های راه",
    "road.subtitle":
      "دو نقشه مکمل: مسیر مطالعه برای داوطلب‌ها، و نقشه راه محصول برای همین اپلیکیشن.",
    "road.tab.study": "مسیر مطالعه",
    "road.tab.roles": "مسیر نقش‌ها",
    "road.tab.weekly": "ریتم هفتگی",
    "road.tab.product": "نقشه راه محصول",
    "road.stage": "مرحله {n}",
    "road.goals": "اهداف",
    "road.study.resources": "منابع اصلی",
    "road.roles.intro":
      "لازم نیست همه منابع را تمام کنید. مسیر پلکانیِ متناسب با نقش و سطح تجربه خود را دنبال کنید.",
    "road.weekly.intro":
      "ریتم هفتگیِ پایدار از جمع‌زنی‌های مقطعی بهتر است. نزدیک مصاحبه، شدت را تنظیم کنید.",
    "road.weekly.day": "روز",
    "road.weekly.focus": "تمرکز",
    "road.weekly.time": "زمان پیشنهادی",
    "road.weekly.note": "شدت را بر اساس فاصله تا مصاحبه واقعی تنظیم کنید.",
    "road.product.current": "فعلی",
    "road.product.intro":
      "روند تکامل خودِ DevReady — فاز ۱ (بنیان) همان چیزی است که اکنون می‌بینید.",
    "road.phases": "فاز {n}",

    // Footer
    "footer.desc":
      "خانه‌ای آرام و دوزبانه برای آمادگی مصاحبه توسعه وب — نقشه روشن، محتوای باکیفیت، بدون شلوغی.",
    "footer.explore": "کاوش",
    "footer.stack": "ساخته‌شده با",
    "footer.stackValue": "Next.js · shadcn/ui · Tailwind CSS · Aceternity UI",
    "footer.license": "متن‌باز. مجوز هر منبع نزد منبع اصلی باقی می‌ماند.",
    "footer.luck": "برای مصاحبه‌هات موفق باشید. Good luck!",

    // Theme & language
    "theme.label": "پوسته",
    "theme.light": "روشن",
    "theme.dark": "تاریک",
    "theme.system": "سیستم",
    "lang.label": "زبان",
    "lang.toFa": "فارسی",
    "lang.toEn": "English",

    // A11y
    "a11y.skip": "پرش به محتوای اصلی",
    "a11y.nav": "ناوبری اصلی",
    "a11y.themeToggle": "تغییر پوسته",
    "a11y.langToggle": "تغییر زبان",
    "a11y.search": "جستجوی منابع",
    "a11y.results": "نتایج جستجو",
    "a11y.menu": "باز کردن منو",
    "a11y.external": "(در تب جدید باز می‌شود)",
  },
} as const;

export type DictKey = keyof typeof dict.en;
export type Lang = "en" | "fa";
