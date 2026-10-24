/** c1-exec-vision.js — Chapter 1: Executive Summary; Chapter 2: Product Vision & Positioning */
const { h1, h2, p, bullet, tableCaption, bizTable, callout } = require("./helpers");

const children = [];

/* ══════════════════ 1. EXECUTIVE SUMMARY ══════════════════ */
children.push(h1("1. Executive Summary"));

children.push(p([
  { t: "DevReady today is a genuinely differentiated product sitting on an under-exploited asset. " },
  { t: "It ships 636+ hand-curated resources across 32 categories, fully bilingual in English and Persian with production-quality RTL support, a local-first progress system (bookmarks, in-progress, completed, personal notes) that requires no account, a Daily Challenge with progressive hints and streak tracking, a spaced-repetition Review Deck, and a multi-stage Roadmap with role paths and a weekly rhythm. " },
  { t: "No competitor combines this breadth with a native Persian experience. " },
  { t: "At the same time, the product has three structural constraints: there is no telemetry (so retention cannot currently be measured or managed), progress is trapped in the browser (so switching devices loses users), and most value is one click away on external sites (so the daily habit loop leaks)." },
]));

children.push(p([
  { t: "This plan is built on three strategic bets. " },
  { t: "Bet 1 — the Persian-first moat: ", b: true },
  { t: "GreatFrontEnd, NeetCode, roadmap.sh and the rest of the English-speaking competitive set will not plausibly invest in native, Persian-written content and RTL product craft. DevReady should own that entire stack — content corpus, community, and brand — while remaining strong in English. " },
  { t: "Bet 2 — the local-to-account flywheel: ", b: true },
  { t: "keep anonymous local mode as a first-class, never-coerced experience, and let optional accounts unlock sync, opt-in analytics, personalization, and paid intelligence. Trust is the wedge, not lock-in. " },
  { t: "Bet 3 — the hybrid content engine: ", b: true },
  { t: "curation wins breadth cheaply; original interactive content (a bilingual question bank, native digest cards, in-browser exercises) wins retention and defensibility. Every external link gains a native layer over time." },
]));

children.push(p([
  { t: "The sequencing logic is measure, activate, retain, then monetize. " },
  { t: "Privacy-friendly analytics ship first because none of the targets below can be managed before they can be measured. " },
  { t: "A quick-win pack (Next Best Action card, onboarding quiz, shareable progress card) lands within four weeks. Accounts and cloud sync land by the end of month three. The original question bank and the Pro tier launch together in months three to six, because paid value should coincide with the arrival of original interactive content. AI mock interviews and B2B follow in the second half once data and content support them." },
]));

children.push(tableCaption("Headline 12-month targets (illustrative — to be re-based against the analytics baseline established in month 1)."));
children.push(bizTable(
  ["Metric", "Definition", "12-month target", "Why it matters"],
  [
    ["North star: Weekly Active Preppers", "Users completing 3+ prep actions in a rolling week", "Baseline in M1; +20% quarter over quarter", "Counts habit, not visits"],
    ["Activation rate", "New users who bookmark 1+ resource, complete 1 resource and finish 1 Daily Challenge in their first session", "35% or higher", "First-session value predicts D30"],
    ["Day-7 retention", "Share of new users returning 7 days after first session", "18%+ (typical baseline: ~8%)", "Proves the daily loop works"],
    ["Day-30 retention", "Share returning at day 30", "10%+ (typical baseline: ~3.5%)", "Prep cycles last 8–16 weeks"],
    ["Streak persistence", "Activated users with a 7-day-or-longer streak", "25%+", "Streaks are the habit anchor"],
    ["Resource completion rate", "Started resources marked completed", "40%+", "Curation must convert to progress"],
    ["Free-to-Pro conversion", "Paying accounts over active accounts", "2–4%", "Sustains the small team"],
  ],
  [22, 34, 20, 24]
));

children.push(p([
  { t: "What this plan deliberately does not do: it does not pivot the product, add social feeds, bolt on a mobile app prematurely, or paywall the library. " },
  { t: "The calm, local-first, no-dark-patterns identity is the differentiator; every recommendation below either compounds it or carefully extends it. " },
  { t: "Sections 8 and 7.1 are the immediately actionable core: a founding team can start on Section 8 the next working day." },
]));

/* ══════════════════ 2. PRODUCT VISION & POSITIONING ══════════════════ */
children.push(h1("2. Product Vision & Positioning"));

children.push(h2("2.1 Positioning Statement"));
children.push(p([
  { t: "Positioning statement: ", b: true },
  { t: "\u201CDevReady is the structured, bilingual home base that turns interview preparation from scattered internet chaos into one guided daily path \u2014 in English and Persian.\u201D " },
  { t: "Every word is load-bearing. \u201CHome base\u201D claims the hub position against link-farms and single-purpose question banks. \u201CStructured\u201D and \u201Cdaily path\u201D claim the guidance position against raw catalogs. \u201CBilingual\u201D and \u201CPersian\u201D claim a market the entire competitive set currently ignores. " },
  { t: "The short version for packaging and community channels: \u201CPrepare properly. In your language.\u201D" },
]));

children.push(h2("2.2 User Personas"));
children.push(p([
  { t: "Primary persona — Amir, 26, mid-level frontend developer in Tehran. ", b: true },
  { t: "Amir has three years of experience at a local product company, reads English documentation daily but thinks in Persian, and earns a fraction of what his counterparts make abroad, so remote and relocation roles are his real prize. He is disciplined but time-starved: he studies in the evening after work, mostly on one laptop, and his interview window is typically 8–16 weeks away. His pains are concrete: quality resources are scattered across English blogs, Telegram channels and YouTube; he cannot tell which of 40 React articles is actually interview-grade; and no tool remembers what he has already covered when he switches browsers. He wants a plan he can trust and a daily answer to \u201Cwhat should I do tonight?\u201D DevReady's local-first bookmarking, Daily Challenge, and Persian explanations speak directly to him — and optional sync removes his biggest anxiety: losing months of progress." },
]));
children.push(tableCaption("Persona map. Primary and secondary personas drive roadmap order; tertiary personas ride along."));
children.push(bizTable(
  ["Persona", "Profile", "Core pains", "What they need from DevReady"],
  [
    [{ t: "Amir — Persian-speaking dev in Iran", b: true }, "Mid-level FE/full-stack, Tehran or Mashhad, targets remote or relocation, evening studier", "Resource chaos; no guidance; progress lost across devices; no Persian-first material; cannot pay for foreign subscriptions easily", "Guided roadmap, Daily Challenge habit loop, Persian-language depth, sync, regional-friendly pricing"],
    [{ t: "Sara — diaspora bootcamp grad", b: true }, "Persian-speaking junior in Berlin or Toronto, switched careers, first job hunt underway", "Impostor syndrome; English-only prep feels twice as hard; needs structure more than content", "Bilingual reassurance, role paths, behavioral question bank, certificates of progress to share"],
    [{ t: "Ethan — English-speaking career switcher", b: true }, "25–35, non-CS background, uses roadmap.sh and free handbooks today", "Overwhelmed by choices; wants one curated path with progress tracking and no account nagging", "Free structured roadmap, local-first tracking, clean dark-mode UX; converts to Pro only if AI features prove value"],
    [{ t: "Neda — bootcamp operator (B2B)", b: true }, "Runs a 30–100 student cohort at a bootcamp or community program", "No visibility into who is actually preparing; wants credible curriculum and reporting", "Cohort dashboards, curriculum mapping, readiness export; a per-seat license decision"],
  ],
  [16, 26, 29, 29]
));
children.push(p([
  { t: "Two behavioral notes matter more than the demographics. " },
  { t: "First, Persian-speaking developers are heavy Telegram users; community distribution (Section 5.3) must be Telegram-first, not Twitter-first. " },
  { t: "Second, both Amir and Sara exhibit \u201Cprogress anxiety\u201D — the fear of losing accumulated study state. Local-first design created this trust; cloud sync (Section 3.2) converts it into accounts, which is the single highest-leverage product move in this plan." },
]));

children.push(h2("2.3 Competitive Landscape and Unique Value Proposition"));
children.push(p([
  { t: "The market divides into four archetypes: question banks (LeetCode, GreatFrontEnd), video course libraries (NeetCode), roadmaps (roadmap.sh), and free handbooks (Frontend Interview Handbook). " },
  { t: "All of them are English-first; none treats Persian speakers as a primary audience; none is local-first; and none couples a curation catalog with a daily habit loop. Pricing below was verified in October 2026 against public pricing pages." },
]));
children.push(tableCaption("Competitor snapshot (public pricing verified October 2026) and the gap DevReady exploits."));
children.push(bizTable(
  ["Platform", "Focus and model", "Verified pricing (Oct 2026)", "Gap DevReady exploits"],
  [
    ["GreatFrontEnd", "500+ frontend questions, in-browser coding, prep plans by ex-interviewers", "$39/mo; $120/yr; $180 lifetime", "High price point; English-only; no daily habit loop; no Persian content"],
    ["NeetCode Pro", "DSA video courses, 300+ problems, AI hints (NeetBot), company tags, cloud sync", "$119/yr; $297 lifetime", "DSA-centric and Python-first; thin web-dev breadth; English-only; no curation layer"],
    ["roadmap.sh", "Community role roadmaps and guides; sponsorship-funded", "Free", "Breadth without depth: no question bank, no tracking depth, no structured prep loop"],
    ["Frontend Interview Handbook", "Free static handbook content funneling to GreatFrontEnd", "Free", "Static reading only; no interactivity, tracking, or personalization"],
    ["Exponent", "SWE/PM interview prep with mocks; consumer plus B2B plans", "Subscription (consumer and company tiers)", "Generalist and comparatively expensive; English-only; enterprise feel rather than learner-calm"],
  ],
  [16, 32, 22, 30]
));
children.push(p([
  { t: "The unique value proposition is therefore a combination, not a single feature: " },
  { t: "(a) native Persian and RTL product craft with a \u0641\u0627\u0631\u0633\u06CC-only filter; (b) a free 636-resource curated library that competitors would need months to match; (c) a genuine habit loop — Daily Challenge with progressive hints, streaks, and a spaced-repetition Review Deck; and (d) local-first privacy as an identity, not a limitation. " },
  { t: "Against a price leader like GreatFrontEnd, DevReady Pro can launch under half the price while the free tier already delivers what competitors gate. Against NeetCode, DevReady covers the full web-development interview surface — including behavioral, system design, and job-hunt skills that DSA course libraries ignore." },
]));

children.push(h2("2.4 Brand Personality and Emotional Promise"));
children.push(p([
  { t: "The brand is \u201Cthe trusted senior friend who already passed the interview.\u201D " },
  { t: "That person is calm, precise, encouraging, and allergic to hype. In a regional course market cluttered with inflated \u201Cguaranteed job\u201D promises, restraint is a competitive weapon: DevReady never sells certainty, always shows the work, and treats learners as adults. The emotional promise is: " },
  { t: "\u201CYou are not behind. You are on the path.\u201D", b: true },
  { t: " Interview preparation is emotionally expensive — anxiety, comparison, imposter feelings — and a product that lowers that temperature daily will be used daily." },
]));
children.push(p([
  { t: "Voice rules follow from the personality: " },
]));
children.push(bullet([{ t: "We say: ", b: true }, { t: "\u201CHere is a model answer, and here is why it works\u201D — show reasoning, cite sources, admit difficulty." }]));
children.push(bullet([{ t: "We never say: ", b: true }, { t: "\u201CGuaranteed offer,\u201D \u201Ccrush it in 7 days,\u201D or fake urgency counters." }]));
children.push(bullet([{ t: "Bilingual craft: ", b: true }, { t: "Persian is written natively by engineers, never machine-translated; technical terms stay in English inside Persian prose, matching how real Iranian developers actually talk." }]));
children.push(bullet([{ t: "Dark-mode-first calm: ", b: true }, { t: "the existing light/dark design system, generous whitespace and Aceternity-style accents stay; retention mechanics must feel like encouragement, not manipulation." }]));

children.push(callout("Brand in one line", [
  { t: "Structured, bilingual, honest. The calm alternative to interview-prep anxiety — and the only serious one built for Persian speakers from day one." },
]));

module.exports = { children };
