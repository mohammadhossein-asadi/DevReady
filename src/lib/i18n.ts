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
    "nav.library": "My Library",
    "brand.tagline": "Interview Prep",
    "brand.taglineFull": "Bilingual Web Development Interview Prep",

    // Hero
    "hero.badge": "Phase 2 · Content Experience",
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

    // Your progress (Phase 2)
    "home.progress.title": "Your progress",
    "home.progress.empty":
      "Bookmark resources and mark your study progress — everything stays in this browser, no account needed.",
    "home.progress.cta": "Open my library",

    // My Library view
    "lib.title": "My Library",
    "lib.subtitle":
      "Everything you save or mark gathers here — bookmarks and study progress, stored only in your browser. No account, no sync, no clutter.",
    "lib.hint":
      "Tip: use the bookmark icon on any resource card to start building your library.",
    "lib.tab.bookmarks": "Bookmarks",
    "lib.tab.doing": "In progress",
    "lib.tab.done": "Completed",
    "lib.progress.of": "{done} of {total} resources completed",
    "lib.empty.bookmarks.title": "No bookmarks yet",
    "lib.empty.bookmarks.desc":
      "Tap the bookmark icon on any resource card to save it for later.",
    "lib.empty.doing.title": "Nothing in progress",
    "lib.empty.doing.desc":
      'Mark resources you are currently studying as "In progress" to keep track of them here.',
    "lib.empty.done.title": "Nothing completed yet",
    "lib.empty.done.desc":
      'Mark finished resources as "Done" and watch your progress bar climb.',
    "lib.empty.cta": "Browse resources",
    "lib.reset": "Reset all data",
    "lib.reset.confirm.title": "Reset everything?",
    "lib.reset.confirm.desc":
      "This clears all bookmarks and study progress stored in this browser. This action cannot be undone.",
    "lib.reset.confirm.cancel": "Cancel",
    "lib.reset.confirm.ok": "Yes, reset",

    // Resource detail view
    "detail.bookmark.add": "Save to library",
    "detail.bookmark.remove": "Saved in library",
    "detail.status.label": "Study status",
    "detail.status.hint":
      "Track where you are — the library and progress bar update as you go.",
    "detail.status.todo": "Not started",
    "detail.status.doing": "In progress",
    "detail.status.done": "Done",
    "detail.about": "About this category",
    "detail.related": "More in {category}",
    "detail.viewAll": "See all {category} resources",
    "detail.notfound.title": "Resource not found",
    "detail.notfound.desc":
      "This link may be outdated or the resource no longer exists. Continue browsing from the resource library.",

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
      "How DevReady itself evolves — Phase 2 (Content Experience) is what you are looking at now.",
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
    "a11y.details": "View details",
    "a11y.breadcrumb": "Breadcrumb",
  },

  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.resources": "منابع",
    "nav.roadmap": "نقشه راه",
    "nav.library": "کتابخانه من",
    "brand.tagline": "آمادگی مصاحبه",
    "brand.taglineFull": "پلتفرم دوزبانه آمادگی مصاحبه توسعه وب",

    // Hero
    "hero.badge": "فاز ۲ · تجربه محتوا",
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

    // Your progress (Phase 2)
    "home.progress.title": "پیشرفت شما",
    "home.progress.empty":
      "منبع‌ها را نشان‌گذاری کنید و وضعیت مطالعه‌تان را ثبت کنید — همه‌چیز فقط در مرورگر خودتان می‌ماند؛ بدون نیاز به حساب کاربری.",
    "home.progress.cta": "باز کردن کتابخانه من",

    // My Library view
    "lib.title": "کتابخانه من",
    "lib.subtitle":
      "هر منبعی که ذخیره یا علامت‌گذاری کنید همین‌جا جمع می‌شود — نشانک‌ها و پیشرفت مطالعه، فقط در مرورگر خودتان. بدون حساب کاربری، بدون همگام‌سازی، بدون شلوغی.",
    "lib.hint":
      "نکته: با آیکون نشانک روی هر منبع، کتابخانه خودتان را بسازید.",
    "lib.tab.bookmarks": "نشانک‌ها",
    "lib.tab.doing": "در حال انجام",
    "lib.tab.done": "تمام‌شده",
    "lib.progress.of": "{done} از {total} منبع تمام شده است",
    "lib.empty.bookmarks.title": "هنوز نشانکی ندارید",
    "lib.empty.bookmarks.desc":
      "روی آیکون نشانک هر منبع بزنید تا برای بعد ذخیره شود.",
    "lib.empty.doing.title": "منبعی در حال مطالعه نیست",
    "lib.empty.doing.desc":
      "وضعیت منبع‌هایی که مشغول خواندن‌شان هستید را «در حال انجام» بگذارید تا اینجا دیده شوند.",
    "lib.empty.done.title": "هنوز منبعی را تمام نکرده‌اید",
    "lib.empty.done.desc":
      "منبع‌های تمام‌شده را «تمام‌شده» علامت بزنید تا نوار پیشرفت‌تان بالا برود.",
    "lib.empty.cta": "مرور منابع",
    "lib.reset": "پاک کردن همه داده‌ها",
    "lib.reset.confirm.title": "همه‌چیز پاک شود؟",
    "lib.reset.confirm.desc":
      "همه نشانک‌ها و پیشرفت ذخیره‌شده در این مرورگر پاک می‌شوند. این کار قابل بازگشت نیست.",
    "lib.reset.confirm.cancel": "انصراف",
    "lib.reset.confirm.ok": "بله، پاک کن",

    // Resource detail view
    "detail.bookmark.add": "ذخیره در کتابخانه",
    "detail.bookmark.remove": "در کتابخانه شما",
    "detail.status.label": "وضعیت مطالعه",
    "detail.status.hint":
      "جای خود را مشخص کنید — کتابخانه و نوار پیشرفت با شما به‌روز می‌شوند.",
    "detail.status.todo": "شروع نشده",
    "detail.status.doing": "در حال انجام",
    "detail.status.done": "تمام‌شده",
    "detail.about": "درباره این دسته",
    "detail.related": "بیشتر در {category}",
    "detail.viewAll": "مشاهده همه منابع {category}",
    "detail.notfound.title": "منبع پیدا نشد",
    "detail.notfound.desc":
      "ممکن است این لینک قدیمی شده باشد یا منبع دیگر وجود نداشته باشد. از کتابخانه منابع ادامه دهید.",

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
      "روند تکامل خودِ DevReady — فاز ۲ (تجربه محتوا) همان چیزی است که اکنون می‌بینید.",
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
    "a11y.details": "مشاهده جزئیات",
    "a11y.breadcrumb": "مسیر صفحه",
  },
} as const;

export type DictKey = keyof typeof dict.en;
export type Lang = "en" | "fa";
