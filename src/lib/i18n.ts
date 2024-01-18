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
    "nav.daily": "Daily",
    "brand.tagline": "Interview Prep",
    "brand.taglineFull": "Bilingual Web Development Interview Prep",

    // Hero
    "hero.badge": "32 Categories · Accounts & Signals",
    "hero.title1": "Walk into your",
    "hero.title2": "web dev interview",
    "hero.title3": "ready.",
    "hero.subtitle":
      "A curated, bilingual library of {count}+ high-quality resources across 32 categories — from Frontend, Backend and System Design to AI & ML, Cyber Security, Game Dev, Blockchain, Soft Skills and every interview essential — in English and فارسی.",
    "hero.persianDigits": "Persian digits (۰-۹) shown in FA locale.",
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
      "Every major interview topic — from HTML basics to mobile, AI tooling and extra backend stacks — organized into dedicated sections.",
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
      "Use question banks, the daily challenge and spaced-repetition reviews to simulate real interview conditions.",
    "home.cta.title": "Start with the fundamentals.",
    "home.cta.subtitle":
      "Strong basics beat last-minute cramming — every time. The map is ready; the next step is yours.",
    "home.cta.button": "Open the resource library",

    // Your progress (Phase 2)
    "home.progress.title": "Your progress",
    "home.progress.empty":
      "Bookmark resources and mark your study progress — everything stays in this browser, no account needed.",
    "home.progress.cta": "Open my library",

    // Daily challenge (Phase 3)
    "home.daily.title": "Today's challenge",
    "home.daily.cta": "Solve today's challenge",
    "home.daily.done": "Review today's challenge",

    // Daily view
    "daily.title": "Daily challenge",
    "daily.subtitle":
      "One interview question a day — theory, coding, system design or behavioral — with progressive hints, a model answer and a streak that rewards showing up.",
    "daily.today": "Today's challenge",
    "daily.markDone": "Mark today as done",
    "daily.doneToday": "Done — streak protected. See you tomorrow.",
    "daily.showHint": "Show hint {n} of {total}",
    "daily.showAnswer": "Reveal the model answer",
    "daily.hideAnswer": "Hide the answer",
    "daily.answer": "Model answer — points you should hit",
    "daily.study": "Study this topic",
    "daily.streak.current": "Current streak",
    "daily.streak.best": "Best streak",
    "daily.streak.total": "Days completed",
    "daily.browse.title": "Challenge archive",
    "daily.browse.subtitle":
      "Practice ahead or revisit past days — filter by topic. Answers are one click away, but try the hints first.",
    "daily.topic.all": "All topics",
    "daily.type.theory": "Theory",
    "daily.type.coding": "Coding",
    "daily.type.system": "System design",
    "daily.type.behavioral": "Behavioral",
    "daily.difficulty.1": "Warm-up",
    "daily.difficulty.2": "Standard",
    "daily.difficulty.3": "Senior-level",

    // Per-resource notes (Phase 3)
    "note.label": "Your note",
    "note.hint": "Saved automatically in this browser — interview prep thoughts, gotchas, things to revisit.",
    "note.placeholder": "Write what you want to remember about this resource…",
    "note.saved": "Saved",
    "note.save": "Save",
    "note.delete": "Delete note",
    "note.preview": "Your note",

    // Spaced repetition (Phase 4)
    "nav.review": "Review",
    "home.review.title": "Spaced repetition",
    "home.review.due": "{n} cards due today",
    "home.review.next": "{n} cards in the deck — next due {date}",
    "home.review.empty":
      "Add resources you have studied to your review deck — DevReady resurfaces them right before you would forget.",
    "home.review.cta": "Review now",
    "home.review.open": "Open review deck",
    "review.title": "Review deck",
    "review.subtitle":
      "A little review, right before you would forget, beats hours of re-reading. Add resources you have studied; DevReady schedules each card with spaced repetition — seconds per card, minutes per day.",
    "review.stat.due": "Due today",
    "review.stat.cards": "Cards in deck",
    "review.stat.mastered": "Mastered",
    "review.stat.retention": "Retention",
    "review.start": "Start review",
    "review.session.remaining": "{n} card(s) remaining",
    "review.session.done.title": "All caught up!",
    "review.session.done.desc":
      "You graded {n} card(s) this session. Cards marked “Again” stay due today — run another pass to relearn them.",
    "review.end": "End session",
    "review.card.of": "From {category}",
    "review.grade.again": "Again",
    "review.grade.hard": "Hard",
    "review.grade.good": "Good",
    "review.grade.easy": "Easy",
    "review.grade.today": "today",
    "review.grade.days": "+{n}d",
    "review.grade.legend": "How well did you remember it?",
    "review.peek.note": "Peek at your note",
    "review.hide.note": "Hide note",
    "review.due.today": "Due today",
    "review.due.tomorrow": "Due tomorrow",
    "review.due.on": "Due {date}",
    "review.mastery.learning": "Learning",
    "review.mastery.familiar": "Familiar",
    "review.mastery.confident": "Confident",
    "review.mastery.mastered": "Mastered",
    "review.deck.title": "All cards",
    "review.deck.empty.title": "Your deck is empty",
    "review.deck.empty.desc":
      "Add resources from their detail pages — or pick from your library below. Spaced repetition keeps every card fresh with a few seconds of review per day.",
    "review.add.title": "Add from your library",
    "review.add.hint": "Bookmarked or studied resources that are not in the deck yet.",
    "review.add.none":
      "Nothing here yet — bookmark or mark resources as you study them, then add them to the deck.",
    "review.add": "Add to deck",
    "review.added": "Added",
    "review.remove": "Remove from deck",
    "review.due.count": "{n} due",
    "detail.review.add": "Add to review deck",
    "detail.review.inDeck": "In review deck",
    "detail.review.due": "Next review: {date}",
    "detail.review.hint":
      "Spaced repetition resurfaces this resource right before you would forget.",
    "lib.tab.review": "Review",
    "lib.empty.review.title": "No review cards yet",
    "lib.empty.review.desc":
      "Add resources you have studied to the review deck — DevReady schedules short reviews so they stick.",
    "lib.review.cta": "Open review deck",
    "lib.review.meta.due": "Due {when}",
    "lib.review.meta.mastery": "Mastery: {level}",

    // Contribution system (Phase 4)
    "contrib.title": "Contribute",
    "contrib.subtitle":
      "Found a great resource that belongs in DevReady? Suggest it below. Submissions are stored in your browser and can be exported as JSON or Markdown to open an issue or pull request.",
    "contrib.form.title": "Suggest a resource",
    "contrib.field.title": "Resource title",
    "contrib.field.titlePh": "e.g. JavaScript.info — The Modern Tutorial",
    "contrib.field.url": "URL",
    "contrib.field.urlPh": "https://…",
    "contrib.field.category": "Category",
    "contrib.field.categoryPh": "Choose a category",
    "contrib.field.lang": "Resource language",
    "contrib.lang.en": "English",
    "contrib.lang.fa": "Persian",
    "contrib.lang.both": "Bilingual / other",
    "contrib.field.kind": "Type",
    "contrib.kind.article": "Article / docs",
    "contrib.kind.video": "Video",
    "contrib.kind.course": "Course",
    "contrib.kind.tool": "Tool / playground",
    "contrib.kind.interactive": "Interactive practice",
    "contrib.kind.questions": "Question bank",
    "contrib.field.level": "Level (optional — click again to clear)",
    "contrib.level.beginner": "Beginner",
    "contrib.level.intermediate": "Intermediate",
    "contrib.level.advanced": "Advanced",
    "contrib.field.desc": "Why is it useful?",
    "contrib.field.descPh":
      "What does it cover, and which interview round does it help with? (at least 20 characters)",
    "contrib.field.author": "Your name / handle (optional)",
    "contrib.field.authorPh": "e.g. @yourhandle",
    "contrib.submit": "Submit suggestion",
    "contrib.saveEdit": "Save changes",
    "contrib.cancelEdit": "Cancel edit",
    "contrib.editing": "Editing a suggestion",
    "contrib.err.title": "Please fix the highlighted fields",
    "contrib.err.titleField": "A title is required",
    "contrib.err.url": "Enter a valid URL (https://…)",
    "contrib.err.category": "Choose a category",
    "contrib.err.desc": "Tell us a bit more — at least 20 characters",
    "contrib.dup.catalog": "This URL is already in the catalog ({category}).",
    "contrib.dup.mine": "You already suggested this URL.",
    "contrib.success.new":
      "Suggestion saved — thank you! Export it below to share it with the maintainers.",
    "contrib.success.edit": "Suggestion updated.",
    "contrib.mine.title": "Your suggestions",
    "contrib.mine.count": "{n} suggestion(s)",
    "contrib.mine.empty.title": "No suggestions yet",
    "contrib.mine.empty.desc":
      "The form above is the starting point — every curated list began with one suggestion.",
    "contrib.status.queued": "In queue",
    "contrib.edit": "Edit",
    "contrib.delete": "Delete",
    "contrib.delete.confirm.title": "Delete this suggestion?",
    "contrib.delete.confirm.desc":
      "This removes the submission from this browser. This action cannot be undone.",
    "contrib.delete.confirm.cancel": "Cancel",
    "contrib.delete.confirm.ok": "Yes, delete",
    "contrib.export.json": "Download JSON",
    "contrib.export.markdown": "Copy as Markdown",
    "contrib.export.copied": "Copied to clipboard",
    "contrib.export.empty": "Nothing to export yet — submit a suggestion first.",
    "contrib.privacy":
      "Submissions live only in this browser until you export them.",
    "contrib.created": "Suggested {date}",
    "res.suggest": "Missing a gem? Suggest a resource",

    // My Library view
    "lib.title": "My Library",
    "lib.subtitle":
      "Everything you save or mark gathers here — bookmarks, study progress and personal notes, stored only in your browser. No account, no sync, no clutter.",
    "lib.hint":
      "Tip: use the bookmark icon on any resource card to start building your library.",
    "lib.tab.bookmarks": "Bookmarks",
    "lib.tab.doing": "In progress",
    "lib.tab.done": "Completed",
    "lib.tab.notes": "Notes",
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
    "lib.empty.notes.title": "No notes yet",
    "lib.empty.notes.desc":
      "Open any resource's detail page and write what you want to remember — your notes collect here.",
    "lib.empty.cta": "Browse resources",
    "lib.reset": "Reset all data",
    "lib.reset.confirm.title": "Reset everything?",
    "lib.reset.confirm.desc":
      "This clears all bookmarks, study progress and notes stored in this browser. This action cannot be undone.",
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
    "road.product.done": "Shipped",
    "road.product.intro":
      "How DevReady itself evolves — Phase 5 (Accounts & Signals) is what you are looking at now.",
    "road.phases": "Phase {n}",

    // Difficulty voting (Phase 5)
    "votes.title": "How hard is this resource?",
    "votes.hint": "Rate it in one click — it helps other learners calibrate.",
    "votes.level.easy": "Easy",
    "votes.level.medium": "Medium",
    "votes.level.hard": "Hard",
    "votes.yours": "Your vote",
    "votes.clear": "Click again to remove your vote",
    "votes.none": "No community votes yet — be the first to rate it.",
    "votes.total": "{n} community votes",
    "votes.consensus": "The community calls it {level}",
    "votes.consensusTitle": "{level} per {n} votes",
    "votes.localNote": "Saved in this browser.",
    "votes.sharedNote": "Shared with the community.",
    "votes.signIn": "Sign in to share your vote",

    // Optional account & sync (Phase 5)
    "nav.account": "Account",
    "acct.title": "Account & sync",
    "acct.subtitle":
      "Optional — DevReady works fully without an account. Connect one to mirror your bookmarks, progress, notes, review deck, suggestions and difficulty votes across devices.",
    "acct.tab.signIn": "Sign in",
    "acct.tab.register": "Create account",
    "acct.email": "Email",
    "acct.password": "Password",
    "acct.name": "Display name (optional)",
    "acct.signIn.cta": "Sign in",
    "acct.register.cta": "Create account",
    "acct.register.terms":
      "By creating an account you store your email plus the study data listed here on this site's own database — nothing is shared with third parties.",
    "acct.what.title": "What syncs to your account",
    "acct.what.bookmarks": "Bookmarks",
    "acct.what.progress": "Study progress & daily streaks",
    "acct.what.notes": "Personal notes",
    "acct.what.review": "Spaced-repetition review deck",
    "acct.what.votes": "Difficulty votes",
    "acct.what.contribs": "Resource suggestions",
    "acct.privacy.title": "Privacy first",
    "acct.privacy.body":
      "Passwords are stored as salted scrypt hashes — never readable. Sessions use bearer tokens that are only kept as SHA-256 hashes server-side. You can export or wipe everything at any time, and the whole app keeps working without an account.",
    "acct.profile.fallbackName": "Learner",
    "acct.memberSince": "Since {date}",
    "acct.signedInDot": "Account connected — sync available",
    "acct.sync.title": "Cloud sync",
    "acct.sync.auto": "Auto-sync",
    "acct.sync.last": "Last synced {when}",
    "acct.sync.never": "Never synced yet — press “Sync now” to start.",
    "acct.sync.now": "Sync now",
    "acct.sync.restore": "Restore from cloud",
    "acct.sync.overwrite": "Overwrite cloud",
    "acct.sync.overwriteTitle": "Replace the cloud copy with this device?",
    "acct.sync.overwriteDesc":
      "The stored cloud snapshot will be replaced by exactly what this browser holds now. Other devices will receive this state on their next sync.",
    "acct.sync.mergeNote":
      "Syncing merges both sides instead of overwriting: bookmarks and completed days are combined, newer notes and review cards win, and conflicting study statuses resolve to the further state. “Restore from cloud” pulls without pushing; “Overwrite cloud” replaces the cloud copy with this device.",
    "acct.data.title": "Data on this device",
    "acct.data.bookmarks": "Bookmarks",
    "acct.data.progress": "In progress",
    "acct.data.notes": "Notes",
    "acct.data.review": "Review cards",
    "acct.data.votes": "Votes cast",
    "acct.data.contribs": "Suggestions",
    "acct.danger.title": "Danger zone",
    "acct.signOut": "Sign out",
    "acct.delete": "Delete account",
    "acct.delete.title": "Delete your account?",
    "acct.delete.desc":
      "This permanently removes your account, its cloud snapshot and your community difficulty votes. The data in this browser is untouched.",
    "acct.danger.note":
      "Signing out keeps everything on this device. Deleting the account removes only the cloud copy — your browser data stays.",
    "acct.cancel": "Cancel",

    // Auth & sync errors (Phase 5)
    "auth.err.invalid_email": "That email address doesn’t look right.",
    "auth.err.weak_password": "Password must be at least 8 characters.",
    "auth.err.email_taken": "An account with this email already exists.",
    "auth.err.invalid_credentials": "Email or password is incorrect.",
    "auth.err.name_long": "Display name is too long (max 80 characters).",
    "auth.err.network":
      "Couldn’t reach the server — check your connection and try again.",
    "auth.err.expired": "Your session expired — please sign in again.",
    "sync.err.network":
      "Sync couldn’t reach the server — your data is safe on this device.",
    "sync.err.too_large": "Your data is too large to sync right now.",

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
    "nav.daily": "چالش روزانه",
    "brand.tagline": "آمادگی مصاحبه",
    "brand.taglineFull": "پلتفرم دوزبانه آمادگی مصاحبه توسعه وب",

    // Hero
    "hero.badge": "۳۲ دسته · حساب کاربری و سیگنال‌ها",
    "hero.title1": "برای مصاحبه",
    "hero.title2": "توسعه وب،",
    "hero.title3": "آماده برو.",
    "hero.subtitle":
      "کتابخانه‌ای منتخب و دوزبانه از بیش از {count} منبع باکیفیت در ۳۲ دسته — از فرانت‌اند، بک‌اند و طراحی سیستم تا هوش مصنوعی، امنیت سایبری، توسعه بازی، بلاکچین، مهارت‌های نرم و اصول مصاحبه — به انگلیسی و فارسی.",
    "hero.persianDigits": "ارقام فارسی (۰-۹) در محیط فارسی نمایش داده می‌شوند.",
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
      "هر موضوع مهم مصاحبه — از مبانی HTML تا موبایل، ابزارهای هوش مصنوعی و استک‌های بک‌اند — در بخش‌های اختصاصی. یکی را انتخاب کنید تا فهرست کامل منابعش را ببینید.",
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
      "با بانک‌های سوال، چالش روزانه و مرور فاصله‌دار، شرایط واقعی مصاحبه را شبیه‌سازی کنید.",
    "home.cta.title": "از مبانی شروع کنید.",
    "home.cta.subtitle":
      "مبانی محکم همیشه از جمع‌زنی شبِ مصاحبه بهتر است. نقشه آماده است؛ قدم بعدی با شما.",
    "home.cta.button": "باز کردن کتابخانه منابع",

    // Your progress (Phase 2)
    "home.progress.title": "پیشرفت شما",
    "home.progress.empty":
      "منبع‌ها را نشان‌گذاری کنید و وضعیت مطالعه‌تان را ثبت کنید — همه‌چیز فقط در مرورگر خودتان می‌ماند؛ بدون نیاز به حساب کاربری.",
    "home.progress.cta": "باز کردن کتابخانه من",

    // Daily challenge (Phase 3)
    "home.daily.title": "چالش امروز",
    "home.daily.cta": "حل چالش امروز",
    "home.daily.done": "مرور چالش امروز",

    // Daily view
    "daily.title": "چالش روزانه",
    "daily.subtitle":
      "روزی یک سوال مصاحبه — نظری، کدنویسی، طراحی سیستم یا رفتاری — با راهنماهای پلکانی، پاسخ نمونه و استریکی که برای حضور روزانه به شما پاداش می‌دهد.",
    "daily.today": "چالش امروز",
    "daily.markDone": "امروز را تمام‌شده علامت بزن",
    "daily.doneToday": "انجام شد — استریک حفظ شد. فردا می‌بینیمت.",
    "daily.showHint": "نمایش راهنمای {n} از {total}",
    "daily.showAnswer": "نمایش پاسخ نمونه",
    "daily.hideAnswer": "پنهان کردن پاسخ",
    "daily.answer": "پاسخ نمونه — نکاتی که باید بگویید",
    "daily.study": "مطالعه این موضوع",
    "daily.streak.current": "استریک فعلی",
    "daily.streak.best": "بهترین استریک",
    "daily.streak.total": "روزهای انجام‌شده",
    "daily.browse.title": "آرشیو چالش‌ها",
    "daily.browse.subtitle":
      "جلوتر تمرین کنید یا روزهای قبلی را مرور کنید — بر اساس موضوع فیلتر کنید. پاسخ‌ها یک کلیک فاصله دارند، اما اول سراغ راهنماها بروید.",
    "daily.topic.all": "همه موضوع‌ها",
    "daily.type.theory": "نظری",
    "daily.type.coding": "کدنویسی",
    "daily.type.system": "طراحی سیستم",
    "daily.type.behavioral": "رفتاری",
    "daily.difficulty.1": "گرم‌کردن",
    "daily.difficulty.2": "استاندارد",
    "daily.difficulty.3": "سطح سنیور",

    // Per-resource notes (Phase 3)
    "note.label": "یادداشت شما",
    "note.hint": "به‌صورت خودکار در همین مرورگر ذخیره می‌شود — نکات مصاحبه، تله‌ها و چیزهایی که باید دوباره مرور کنید.",
    "note.placeholder": "چیزهایی که می‌خواهید درباره این منبع به یاد داشته باشید را بنویسید…",
    "note.saved": "ذخیره شد",
    "note.save": "ذخیره",
    "note.delete": "حذف یادداشت",
    "note.preview": "یادداشت شما",

    // Spaced repetition (Phase 4)
    "nav.review": "مرور",
    "home.review.title": "مرور فاصله‌دار",
    "home.review.due": "{n} کارت برای مرور امروز",
    "home.review.next": "{n} کارت در دسته مرور — مرور بعدی {date}",
    "home.review.empty":
      "منبع‌هایی که خوانده‌اید را به کارت‌های مرور اضافه کنید؛ DevReady آن‌ها را درست قبل از فراموشی دوباره جلوی شما می‌گذارد.",
    "home.review.cta": "شروع مرور",
    "home.review.open": "باز کردن کارت‌های مرور",
    "review.title": "کارت‌های مرور",
    "review.subtitle":
      "چند ثانیه مرور درست قبل از فراموشی، از ساعت‌ها خواندن دوباره مؤثرتر است. منبع‌هایی را که خوانده‌اید به دسته اضافه کنید؛ DevReady هر کارت را با الگوریتم فاصله‌گذاری زمان‌بندی می‌کند — چند ثانیه برای هر کارت، چند دقیقه در روز.",
    "review.stat.due": "برای امروز",
    "review.stat.cards": "کارت در دسته",
    "review.stat.mastered": "تسلط کامل",
    "review.stat.retention": "ماندگاری",
    "review.start": "شروع مرور",
    "review.session.remaining": "{n} کارت باقی مانده",
    "review.session.done.title": "همه کارت‌ها مرور شد!",
    "review.session.done.desc":
      "در این جلسه {n} کارت نمره دادید. کارت‌هایی که «دوباره» زده‌اید برای امروز می‌مانند — برای یادگیری، یک دور دیگر بزنید.",
    "review.end": "پایان جلسه",
    "review.card.of": "از {category}",
    "review.grade.again": "دوباره",
    "review.grade.hard": "سخت",
    "review.grade.good": "خوب",
    "review.grade.easy": "آسان",
    "review.grade.today": "امروز",
    "review.grade.days": "+{n} روز",
    "review.grade.legend": "چقدر یادتان بود؟",
    "review.peek.note": "نگاهی به یادداشت شما",
    "review.hide.note": "پنهان کردن یادداشت",
    "review.due.today": "برای امروز",
    "review.due.tomorrow": "برای فردا",
    "review.due.on": "موعد: {date}",
    "review.mastery.learning": "در حال یادگیری",
    "review.mastery.familiar": "آشنا",
    "review.mastery.confident": "مطمئن",
    "review.mastery.mastered": "تسلط کامل",
    "review.deck.title": "همه کارت‌ها",
    "review.deck.empty.title": "دسته مرور خالی است",
    "review.deck.empty.desc":
      "منبع‌ها را از صفحه جزئیات‌شان اضافه کنید — یا از کتابخانه‌تان پایین همین صفحه انتخاب کنید. مرور فاصله‌دار با چند ثانیه مرور روزانه، هر کارت را تازه نگه می‌دارد.",
    "review.add.title": "افزودن از کتابخانه شما",
    "review.add.hint": "منبع‌های نشان‌گذاری یا خوانده‌شده‌ای که هنوز در دسته نیستند.",
    "review.add.none":
      "هنوز چیزی برای افزودن نیست — با مطالعه منبع‌ها آن‌ها را نشان‌گذاری یا وضعیت‌دار کنید، بعد اینجا اضافه‌شان کنید.",
    "review.add": "افزودن به دسته",
    "review.added": "افزوده شد",
    "review.remove": "حذف از دسته",
    "review.due.count": "{n} برای مرور",
    "detail.review.add": "افزودن به کارت‌های مرور",
    "detail.review.inDeck": "در کارت‌های مرور",
    "detail.review.due": "مرور بعدی: {date}",
    "detail.review.hint":
      "مرور فاصله‌دار این منبع را درست قبل از فراموشی دوباره جلوی شما می‌گذارد.",
    "lib.tab.review": "مرور",
    "lib.empty.review.title": "هنوز کارت مروری ندارید",
    "lib.empty.review.desc":
      "منبع‌هایی را که خوانده‌اید به دسته مرور اضافه کنید — DevReady مرورهای کوتاه را زمان‌بندی می‌کند تا در ذهنتان بمانند.",
    "lib.review.cta": "باز کردن کارت‌های مرور",
    "lib.review.meta.due": "موعد: {when}",
    "lib.review.meta.mastery": "سطح تسلط: {level}",

    // Contribution system (Phase 4)
    "contrib.title": "مشارکت",
    "contrib.subtitle":
      "منبع خوبی پیدا کرده‌اید که جایش در DevReady خالی است؟ پایین پیشنهاد دهید. پیشنهادها در مرورگر شما ذخیره می‌شوند و می‌توانید آن‌ها را به‌صورت JSON یا Markdown خروجی بگیرید تا برای پروژه issue یا pull request باز کنید.",
    "contrib.form.title": "معرفی یک منبع",
    "contrib.field.title": "عنوان منبع",
    "contrib.field.titlePh": "مثلاً JavaScript.info — آموزش مدرن",
    "contrib.field.url": "نشانی",
    "contrib.field.urlPh": "https://…",
    "contrib.field.category": "دسته",
    "contrib.field.categoryPh": "یک دسته انتخاب کنید",
    "contrib.field.lang": "زبان منبع",
    "contrib.lang.en": "انگلیسی",
    "contrib.lang.fa": "فارسی",
    "contrib.lang.both": "دوزبانه / دیگر",
    "contrib.field.kind": "نوع",
    "contrib.kind.article": "مقاله / مستندات",
    "contrib.kind.video": "ویدیو",
    "contrib.kind.course": "دوره",
    "contrib.kind.tool": "ابزار / محیط تمرین",
    "contrib.kind.interactive": "تمرین تعاملی",
    "contrib.kind.questions": "بانک سوال",
    "contrib.field.level": "سطح (اختیاری — برای پاک کردن دوباره بزنید)",
    "contrib.level.beginner": "مبتدی",
    "contrib.level.intermediate": "متوسط",
    "contrib.level.advanced": "پیشرفته",
    "contrib.field.desc": "چرا این منبع مفید است؟",
    "contrib.field.descPh":
      "چه چیزی را پوشش می‌دهد و برای کدام راند مصاحبه مفید است؟ (حداقل ۲۰ نویسه)",
    "contrib.field.author": "نام یا آیدی شما (اختیاری)",
    "contrib.field.authorPh": "مثلاً @yourhandle",
    "contrib.submit": "ثبت پیشنهاد",
    "contrib.saveEdit": "ذخیره تغییرات",
    "contrib.cancelEdit": "لغو ویرایش",
    "contrib.editing": "ویرایش پیشنهاد",
    "contrib.err.title": "لطفاً فیلدهای مشخص‌شده را اصلاح کنید",
    "contrib.err.titleField": "عنوان لازم است",
    "contrib.err.url": "نشانی معتبر وارد کنید (https://…)",
    "contrib.err.category": "دسته را انتخاب کنید",
    "contrib.err.desc": "کمی بیشتر توضیح دهید — حداقل ۲۰ نویسه",
    "contrib.dup.catalog": "این نشانی از قبل در کاتالوگ هست ({category}).",
    "contrib.dup.mine": "این نشانی را از قبل پیشنهاد داده‌اید.",
    "contrib.success.new":
      "پیشنهاد ذخیره شد — ممنون! برای اشتراک‌گذاری با نگه‌دارندگان پروژه، از پایین خروجی بگیرید.",
    "contrib.success.edit": "پیشنهاد به‌روزرسانی شد.",
    "contrib.mine.title": "پیشنهادهای شما",
    "contrib.mine.count": "{n} پیشنهاد",
    "contrib.mine.empty.title": "هنوز پیشنهادی ثبت نشده",
    "contrib.mine.empty.desc":
      "فرم بالا نقطه شروع است — هر فهرست منتخبی با یک پیشنهاد شروع شده.",
    "contrib.status.queued": "در صف بررسی",
    "contrib.edit": "ویرایش",
    "contrib.delete": "حذف",
    "contrib.delete.confirm.title": "این پیشنهاد حذف شود؟",
    "contrib.delete.confirm.desc":
      "این پیشنهاد از مرورگر شما حذف می‌شود. این کار قابل بازگشت نیست.",
    "contrib.delete.confirm.cancel": "انصراف",
    "contrib.delete.confirm.ok": "بله، حذف کن",
    "contrib.export.json": "دانلود JSON",
    "contrib.export.markdown": "کپی به‌صورت Markdown",
    "contrib.export.copied": "در کلیپ‌بورد کپی شد",
    "contrib.export.empty": "هنوز چیزی برای خروجی گرفتن نیست — اول یک پیشنهاد ثبت کنید.",
    "contrib.privacy":
      "پیشنهادها تا زمان خروجی گرفتن، فقط در همین مرورگر می‌مانند.",
    "contrib.created": "پیشنهادشده در {date}",
    "res.suggest": "منبعی جا افتاده؟ پیشنهاد دهید",

    // My Library view
    "lib.title": "کتابخانه من",
    "lib.subtitle":
      "هر منبعی که ذخیره یا علامت‌گذاری کنید همین‌جا جمع می‌شود — نشانک‌ها، پیشرفت مطالعه و یادداشت‌های شخصی، فقط در مرورگر خودتان. بدون حساب کاربری، بدون همگام‌سازی، بدون شلوغی.",
    "lib.hint":
      "نکته: با آیکون نشانک روی هر منبع، کتابخانه خودتان را بسازید.",
    "lib.tab.bookmarks": "نشانک‌ها",
    "lib.tab.doing": "در حال انجام",
    "lib.tab.done": "تمام‌شده",
    "lib.tab.notes": "یادداشت‌ها",
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
    "lib.empty.notes.title": "هنوز یادداشتی ندارید",
    "lib.empty.notes.desc":
      "صفحه جزئیات هر منبع را باز کنید و آنچه می‌خواهید به یاد داشته باشید را بنویسید — یادداشت‌ها اینجا جمع می‌شوند.",
    "lib.empty.cta": "مرور منابع",
    "lib.reset": "پاک کردن همه داده‌ها",
    "lib.reset.confirm.title": "همه‌چیز پاک شود؟",
    "lib.reset.confirm.desc":
      "همه نشانک‌ها، پیشرفت و یادداشت‌های ذخیره‌شده در این مرورگر پاک می‌شوند. این کار قابل بازگشت نیست.",
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
    "road.product.done": "ارسال‌شده",
    "road.product.intro":
      "روند تکامل خودِ DevReady — فاز ۵ (حساب کاربری و سیگنال‌ها) همان چیزی است که اکنون می‌بینید.",
    "road.phases": "فاز {n}",

    // Difficulty voting (Phase 5)
    "votes.title": "این منبع چقدر سخت است؟",
    "votes.hint": "با یک کلیک مشخص کنید — به بقیه برای سنجش سطح کمک می‌کند.",
    "votes.level.easy": "آسان",
    "votes.level.medium": "متوسط",
    "votes.level.hard": "سخت",
    "votes.yours": "رأی شما",
    "votes.clear": "برای حذف رأی دوباره کلیک کنید",
    "votes.none": "هنوز رأی اجتماعی ثبت نشده — اولین نفر باشید.",
    "votes.total": "{n} رأی اجتماعی",
    "votes.consensus": "نظر جامعه: {level}",
    "votes.consensusTitle": "{level} در {n} رأی",
    "votes.localNote": "در همین مرورگر ذخیره می‌شود.",
    "votes.sharedNote": "با جامعه به اشتراک گذاشته شد.",
    "votes.signIn": "برای ثبت رأی در آمار جامعه وارد شوید",

    // Optional account & sync (Phase 5)
    "nav.account": "حساب کاربری",
    "acct.title": "حساب کاربری و همگام‌سازی",
    "acct.subtitle":
      "اختیاری — DevReady بدون حساب کاربری هم کامل کار می‌کند. با ساخت حساب، نشان‌ها، وضعیت مطالعه، یادداشت‌ها، کارت‌های مرور، پیشنهادها و رأی‌های سختی‌تان بین دستگاه‌ها همگام می‌شود.",
    "acct.tab.signIn": "ورود",
    "acct.tab.register": "ساخت حساب",
    "acct.email": "ایمیل",
    "acct.password": "گذرواژه",
    "acct.name": "نام نمایشی (اختیاری)",
    "acct.signIn.cta": "ورود",
    "acct.register.cta": "ساخت حساب",
    "acct.register.terms":
      "با ساخت حساب، ایمیل و داده‌های مطالعه‌ای که در همین صفحه فهرست شده در پایگاه‌دادهٔ همین سایت ذخیره می‌شود — هیچ چیزی با شخص ثالث به اشتراک گذاشته نمی‌شود.",
    "acct.what.title": "چه چیزهایی با حساب شما همگام می‌شود",
    "acct.what.bookmarks": "نشان‌ها",
    "acct.what.progress": "وضعیت مطالعه و استریک روزانه",
    "acct.what.notes": "یادداشت‌های شخصی",
    "acct.what.review": "دسته مرور فاصله‌دار",
    "acct.what.votes": "رأی‌های سختی",
    "acct.what.contribs": "منابع پیشنهادی",
    "acct.privacy.title": "اول حریم خصوصی",
    "acct.privacy.body":
      "گذرواژه‌ها به‌صورت هش scrypt با نمک تصادفی ذخیره می‌شوند — هرگز قابل خواندن نیستند. نشست‌ها با توکن نگهبان کار می‌کنند که سرور فقط هش SHA-256 آن‌ها را نگه می‌دارد. هر زمان می‌توانید همه‌چیز را پاک کنید و کل برنامه بدون حساب هم کار می‌کند.",
    "acct.profile.fallbackName": "یادگیرنده",
    "acct.memberSince": "از {date}",
    "acct.signedInDot": "حساب متصل است — همگام‌سازی فعال",
    "acct.sync.title": "همگام‌سازی ابری",
    "acct.sync.auto": "همگام‌سازی خودکار",
    "acct.sync.last": "آخرین همگام‌سازی {when}",
    "acct.sync.never": "هنوز همگام‌سازی نشده — «همگام‌سازی اکنون» را بزنید.",
    "acct.sync.now": "همگام‌سازی اکنون",
    "acct.sync.restore": "بازیابی از ابر",
    "acct.sync.overwrite": "بازنویسی ابر",
    "acct.sync.overwriteTitle": "نسخهٔ ابری با همین دستگاه جایگزین شود؟",
    "acct.sync.overwriteDesc":
      "نسخهٔ ذخیره‌شدهٔ ابری دقیقاً با همان چیزی که همین مرورگر الان دارد جایگزین می‌شود. دستگاه‌های دیگر در همگام‌سازی بعدی همین وضعیت را دریافت می‌کنند.",
    "acct.sync.mergeNote":
      "همگام‌سازی به‌جای بازنویسی، دو سمت را ترکیب می‌کند: نشان‌ها و روزهای انجام‌شده یکی می‌شوند، یادداشت‌ها و کارت‌های مرور تازه‌تر برنده می‌شوند و وضعیت‌های مطالعهٔ متناقض به وضعیت جلوتر می‌روند. «بازیابی از ابر» فقط می‌کشد و چیزی نمی‌فرستد؛ «بازنویسی ابر» نسخهٔ ابری را با همین دستگاه جایگزین می‌کند.",
    "acct.data.title": "داده‌های همین دستگاه",
    "acct.data.bookmarks": "نشان",
    "acct.data.progress": "در حال مطالعه",
    "acct.data.notes": "یادداشت",
    "acct.data.review": "کارت مرور",
    "acct.data.votes": "رأی سختی",
    "acct.data.contribs": "پیشنهاد",
    "acct.danger.title": "بخش حساس",
    "acct.signOut": "خروج از حساب",
    "acct.delete": "حذف حساب",
    "acct.delete.title": "حساب کاربری حذف شود؟",
    "acct.delete.desc":
      "حساب شما، نسخهٔ ابری داده‌ها و رأی‌های سختی‌تان در آمار جامعه برای همیشه حذف می‌شود. داده‌های همین مرورگر دست‌نخورده می‌مانند.",
    "acct.danger.note":
      "خروج از حساب، همه‌چیز را روی همین دستگاه نگه می‌دارد. حذف حساب فقط نسخهٔ ابری را پاک می‌کند — داده‌های مرورگر شما می‌ماند.",
    "acct.cancel": "انصراف",

    // Auth & sync errors (Phase 5)
    "auth.err.invalid_email": "ایمیل واردشده معتبر به نظر نمی‌رسد.",
    "auth.err.weak_password": "گذرواژه باید حداقل ۸ نویسه باشد.",
    "auth.err.email_taken": "با این ایمیل قبلاً حساب ساخته شده است.",
    "auth.err.invalid_credentials": "ایمیل یا گذرواژه نادرست است.",
    "auth.err.name_long": "نام نمایشی بیش از حد طولانی است (حداکثر ۸۰ نویسه).",
    "auth.err.network":
      "اتصال به سرور ممکن نشد — اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.",
    "auth.err.expired": "نشست شما منقضی شده — لطفاً دوباره وارد شوید.",
    "sync.err.network":
      "همگام‌سازی به سرور نرسید — داده‌هایتان روی همین دستگاه امن است.",
    "sync.err.too_large": "حجم داده‌های شما برای همگام‌سازی بیش از حد است.",

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
