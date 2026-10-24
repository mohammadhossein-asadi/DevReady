/** c2-product.js — Chapter 3: Core Product Improvements (Next 3–6 Months) */
const { h1, h2, p, bullet, tableCaption, bizTable, callout, fig } = require("./helpers");

const CHARTS = "/home/z/my-project/scripts/devready-plan/charts";
const children = [];

children.push(h1("3. Core Product Improvements (Next 3\u20136 Months)"));

children.push(h2("3.1 Prioritized Backlog: Impact vs. Effort"));
children.push(p([
  { t: "The backlog below is ranked for a small team (one full-time founding engineer, one part-time engineer, one part-time native content lead). " },
  { t: "Impact scores weight retention and account-flywheel effects above polish; effort is calibrated so that 5 represents a full quarter of team capacity. " },
  { t: "Everything rated \u201CMust\u201D lands within six months; \u201CShould\u201D items start within the window and may finish after it; \u201CNice\u201D items are consciously deferred, not forgotten." },
]));
children.push(...fig(CHARTS + "/impact_effort.png",
  "Impact vs. effort assessment of the candidate backlog (illustrative scoring by the founding team; quadrant thresholds at effort 3 and impact 7.5)."));
children.push(tableCaption("Prioritized feature backlog with rationale. Priority labels: Must / Should / Nice."));
children.push(bizTable(
  ["Feature", "Priority", "Impact", "Effort", "Rationale"],
  [
    ["Privacy-first analytics (aggregate, opt-in)", { t: "Must", b: true }, "8.5", "1.0", "Nothing can be managed before it is measured; feeds every later decision"],
    ["Next Best Action + onboarding quiz", { t: "Must", b: true }, "8.0", "1.5", "Converts existing local data into a guided first session and daily answer"],
    ["Interview Readiness Score v1", { t: "Must", b: true }, "8.5", "2.5", "A single progress number drives return visits; spec in Appendix B"],
    ["PWA install + offline shell", { t: "Must", b: true }, "7.5", "2.0", "Habit products live on the home screen; enables reminders later"],
    ["Accounts + privacy-first cloud sync", { t: "Must", b: true }, "9.0", "3.5", "Unlocks multi-device retention, opt-in analytics, and all future revenue"],
    ["Original bilingual question bank v1 (100 questions)", { t: "Must", b: true }, "9.0", "4.0", "Retention asset and Pro anchor; feeds Daily Challenge and AI layers"],
    ["Build-time AI hints and summaries", { t: "Should", b: true }, "7.0", "3.0", "AI value with zero runtime API cost; preserves local-first architecture"],
    ["Interactive quizzes per resource", { t: "Should", b: true }, "7.5", "3.5", "Turns reading into practice; measurable completion lift"],
    ["Company guides (10, bilingual)", { t: "Should", b: true }, "6.5", "2.0", "High-intent SEO traffic and community sharing"],
    ["Community votes and short reviews", { t: "Should", b: true }, "6.0", "2.5", "Signals quality; builds contribution habit ahead of UGC scale"],
    ["Referral loop (give-get)", { t: "Should", b: true }, "6.0", "2.0", "Compounding organic growth on top of shareable artifacts"],
    ["AI mock interviews (runtime)", "Nice", "8.5", "5.0", "Pro anchor for year 2; requires accounts scale and cost controls first"],
    ["Adaptive plan engine", "Nice", "8.0", "4.5", "Needs months of behavioral data before it can beat the static roadmap"],
    ["Team dashboards (B2B)", "Nice", "6.5", "4.5", "Real revenue channel, but premature before consumer Pro validates"],
  ],
  [27, 13, 10, 10, 40]
));

children.push(h2("3.2 User Accounts and Privacy-First Cloud Sync"));
children.push(p([
  { t: "Accounts exist to serve the user, never to trap them. " },
  { t: "The design principle is anonymous-first: every feature works without an account today and must keep working after accounts ship. " },
  { t: "Sign-up uses an email magic link (no password storage, minimal surface), or Google/GitHub OAuth as convenience options. Account creation is offered at moments of felt need — after a first bookmark (\u201Ckeep this safe across devices?\u201D), after a 7-day streak (\u201Cprotect your streak\u201D), and before clearing browser data — never as an interstitial wall." },
]));
children.push(p([
  { t: "Sync merges, it does not overwrite. " },
  { t: "On login, the local state is pushed and merged server-side with per-key rules, so a user who studied on two devices loses nothing. Conflicts resolve by newest timestamp for scalar values (progress state per resource), set-union for collections (bookmarks, tags), and tombstones for deletions so an item deleted on one device does not resurrect from another. The full merge walkthrough is in Appendix A.2." },
]));
children.push(tableCaption("Local storage keys (current schema) and their cloud-sync merge rule."));
children.push(bizTable(
  ["Data (localStorage key family)", "Contents", "Merge rule on sync"],
  [
    ["Bookmarks", "Resource IDs saved by the user", "Union of both sets; deletes recorded as tombstones"],
    ["Progress (in-progress / completed)", "Per-resource status and timestamps", "Newest timestamp wins per resource; completion never regresses"],
    ["Personal notes", "Per-resource rich text", "Field-level newest-wins; append history kept 30 days for recovery"],
    ["Daily Challenge history and streak", "Completions, current streak, freezes", "Union of completion days; streak = longest active derivation"],
    ["Review Deck schedule", "Spaced-repetition card due dates", "Newest schedule wins per card"],
    ["Resource votes", "Difficulty votes cast", "Last vote wins per resource"],
    ["Preferences", "Language, theme, motion settings", "Explicit user choice wins; defaults never overwrite"],
  ],
  [30, 36, 34]
));
children.push(p([
  { t: "Privacy commitments, stated publicly on a plain-language page: " },
]));
children.push(bullet([{ t: "Aggregate-only telemetry, opt-in. ", b: true }, { t: "Counts and funnels, never keystrokes or page dumps; the anonymous default stays fully functional." }]));
children.push(bullet([{ t: "One-click JSON export of everything ", b: true }, { t: "(bookmarks, progress, notes, challenge history) — the export the local-first design already implies, now portable." }]));
children.push(bullet([{ t: "Hard delete. ", b: true }, { t: "\u201CDelete my account\u201D purges server data within 24 hours and hands back a local export." }]));
children.push(bullet([{ t: "No ads, no data sale, no third-party trackers ", b: true }, { t: "— stated in the same sentence as the pricing page, because in this market trust is marketing." }]));

children.push(h2("3.3 Personalization and Adaptive Learning"));
children.push(p([
  { t: "The current Roadmap (nine stages, role paths, weekly rhythm) is the skeleton; personalization makes it feel alive. " },
  { t: "Version 1 is rule-based and ships quickly: an onboarding quiz (target role, timeline, self-rated strengths, hours per week) selects the role path, reorders roadmap emphasis, and seeds the Review Deck. " },
  { t: "From that moment the home screen leads with a Next Best Action card computed from local state alone: due Review Deck cards first, then the Daily Challenge, then the next incomplete roadmap item, then an in-progress resource. One card, one primary button, in the user's language — this is the daily answer to \u201Cwhat now?\u201D that turns a catalog into a coach." },
]));
children.push(p([
  { t: "The Interview Readiness Score (0\u2013100) is the emotional engine of personalization; its full specification is Appendix B. " },
  { t: "In short, it combines roadmap completion, challenge accuracy trend, review discipline, practice performance and consistency into one number the user can watch climb. " },
  { t: "A genuinely adaptive engine (reordering content by weakness, ETAs, difficulty targeting) is a 6\u201312 month project that requires the behavioral data accounts provide; it is deliberately scheduled as \u201CNice\u201D in the backlog because a rules-based system plus honest scores beats a premature algorithm nobody trusts." },
]));

children.push(h2("3.4 Interactive Content Layer"));
children.push(p([
  { t: "Curation brought breadth; interactivity creates time-on-product and completion. " },
  { t: "Four formats are planned in order of build priority. " },
  { t: "First, checkpoint quizzes: ", b: true },
  { t: "three to five curated multiple-choice questions attached to top resources, gated on completion, feeding the Review Deck with missed items. " },
  { t: "Second, the bilingual question bank: ", b: true },
  { t: "100 original questions in year one with model answers, difficulty ratings, and progressive hints — the same hint ladder users already know from the Daily Challenge. " },
  { t: "Third, in-browser exercises: ", b: true },
  { t: "small JavaScript and React tasks executed in a sandboxed iframe against visible test assertions; no backend judge is required for the v1 scope, which keeps cost near zero. " },
  { t: "Fourth, notes-to-flashcards: ", b: true },
  { t: "a one-tap conversion of a user's own note into a Review Deck card, closing the loop between personal notes and spaced repetition." },
]));
children.push(p([
  { t: "Every external link also gains a native \u201Cdigest card\u201D — a 200\u2013400 word DevReady-written summary with the key takeaways rendered in-app (details in Section 4.1). " },
  { t: "The digest card is the bridge between curation and original content: the user gets value even before clicking out, and DevReady accumulates an original corpus as a side effect of maintaining quality." },
]));

children.push(h2("3.5 AI Features Roadmap"));
children.push(p([
  { t: "AI is sequenced so that cost and architecture stay compatible with a local-first, small-team product. " },
  { t: "The key insight: build-time AI — generating hints, summaries, distractors and translations offline and shipping them as static content — delivers most learner value at zero marginal inference cost and keeps the product fully functional offline and in restricted-network regions. " },
  { t: "Runtime AI (live mock interviews) arrives only with Pro revenue, hard rate limits, and accounts infrastructure behind it." },
]));
children.push(tableCaption("AI roadmap. Build-time features ship as static content; runtime features are Pro-tier and rate-limited."));
children.push(bizTable(
  ["Phase", "Feature", "User value", "Cost control", "Tier"],
  [
    ["A1", "Pre-generated hints per question (3-step ladders) and per-resource summaries/digest cards", "Always-available scaffolding; value before the click-out", "Generated at build time; stored in repo; zero runtime cost", "Free"],
    ["A2", "Smart recommendations: embedding similarity between user gaps (missed topics) and catalog", "\u201CBecause you missed X, study Y next\u201D", "Monthly batch re-embedding; retrieval runs client-side or on edge", "Free"],
    ["B", "AI mock interview: chat-based questioning with rubric-structured feedback (correctness, complexity, communication)", "Realistic practice without scheduling a partner", "Runtime LLM with hard monthly quotas; cached rubrics; small-model routing", "Pro"],
    ["C", "Persian-language answer evaluation", "The only tool that scores Persian technical answers — unique dataset and moat", "Fine-tuned evaluation on accumulated bilingual answers; batch analysis", "Pro"],
  ],
  [10, 33, 28, 20, 9]
));
children.push(p([
  { t: "A regional constraint becomes an architectural advantage here. " },
  { t: "Sanctions and network restrictions make direct third-party AI API access unreliable for Iran-based users; because Phases A1/A2 are build-time, Persian-speaking users get AI-derived value with no dependency on runtime access, and Phase B/C runtime features are later served through the same regional partner infrastructure used for payments (Section 6.3). " },
  { t: "Where competitors must bolt AI onto an account-required architecture, DevReady's local-first stack absorbs it without breaking its identity." },
]));

children.push(h2("3.6 Gamification and Retention Systems"));
children.push(p([
  { t: "DevReady already has the right skeleton — Daily Challenge streaks, progress states, and the Review Deck. " },
  { t: "The evolution is Streak 2.0: two streak freezes per month (earnable via the referral loop and quiz milestones, not only purchasable), milestone badges at 7/30/100 days, and a personal study-year heatmap. " },
  { t: "A weekly recap — \u201Cthree resources completed, four challenges solved, streak saved once\u201D — lands as a local PWA notification on Monday mornings, opt-in, in the user's language. " },
  { t: "Milestone certificates (bilingual, shareable, verifiable by URL once accounts exist) mark roadmap-stage completions; these are the artifacts users post, which feeds the growth loops in Section 5.1. " },
  { t: "The tonal rule from Section 2.4 applies to every mechanic: encouragement, never manipulation — no countdown timers, no loss-framed nagging, no red badges." },
]));

children.push(h2("3.7 Lightweight Community and Social Features"));
children.push(p([
  { t: "Community features are sequenced moderation-cheapest first. " },
  { t: "Ship order: difficulty votes (infrastructure already specified in the Phase 5 work), one-click broken-link reporting, short structured reviews (\u201CI used this for X company \u2014 worked / outdated\u201D limited to 280 characters), contributor credits on resource cards for accepted Suggest-a-Resource entries, and reviewer badges for trusted contributors who pass a quality audit. " },
  { t: "Comment threads and direct messages are deliberately deferred: they carry meaningful moderation cost and safety exposure that a small bilingual team should not adopt in year one. " },
  { t: "The credit system is the real lever — Persian-speaking developers visibly credited as contributors become the product's most credible advocates (Section 5.1, loop 4)." },
]));

children.push(h2("3.8 Mobile Experience and PWA Strategy"));
children.push(p([
  { t: "A native app is not on the 12-month roadmap, and that is a decision, not an omission. " },
  { t: "The path is an installable PWA: web app manifest, service worker with an offline shell (catalog, roadmap, notes, and Review Deck work offline by design; progress syncs when online), an install prompt surfaced after the second session, and opt-in local notifications for streak rescue and review-due reminders. " },
  { t: "This covers roughly the whole daily loop on Android and desktop, and most of it on iOS within Apple's constraints. " },
  { t: "RTL is already first-class in the design system, so no separate mobile RTL audit is needed. " },
  { t: "A wrapped native app (Capacitor or similar) is revisited only after D30 retention exceeds 10% and the notification funnel proves it can move that number — otherwise it would add distribution cost to a habit that is not yet proven." },
]));

children.push(callout("The six-month product thesis", [
  { t: "Measure honestly, guide every session with local data, secure progress in the cloud behind trust, and start earning original content. Everything else in this plan compounds from those four moves." },
]));

module.exports = { children };
