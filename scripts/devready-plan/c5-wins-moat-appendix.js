/** c5-wins-moat-appendix.js — Chapter 8: Quick Wins; Chapter 9: Moat; Chapter 10: Appendices */
const { h1, h2, h3, p, bullet, numbered, tableCaption, bizTable, callout } = require("./helpers");

const children = [];

/* ══════════════════ 8. QUICK WINS (2–4 WEEKS) ══════════════════ */
children.push(h1("8. Quick Wins (Can Ship in 2\u20134 Weeks)"));
children.push(p([
  { t: "These eight items require minimal engineering, produce visible momentum, and — importantly — are prerequisites or feeders for the main roadmap rather than side quests. " },
  { t: "They are ranked by expected impact per unit of effort; the top three alone typically move activation visibly because they fix the first session, which is where most products die. " },
  { t: "Every item reuses existing local state, so nothing here waits on accounts." },
]));
children.push(tableCaption("Quick-win pack, ranked. Effort is in developer-days for the founding engineer."));
children.push(bizTable(
  ["#", "Item", "Effort", "Expected impact", "Notes and dependencies"],
  [
    ["1", "Privacy-friendly analytics (aggregate, opt-in)", "3 d", "Foundation for everything", "Counts, funnels, referrers only; no session replay; ships first"],
    ["2", "Next Best Action card on home", "3 d", "High \u2014 daily habit cue", "Rules over local state: due reviews \u2192 challenge \u2192 next roadmap item"],
    ["3", "Onboarding quiz (role, timeline, hours)", "2 d", "High \u2014 personalizes instantly", "Seeds role path, Review Deck, and NBA card; Appendix A.1"],
    ["4", "Shareable progress card (bilingual image)", "2 d", "High \u2014 top-of-funnel loop", "Canvas-rendered, RTL-aware; personalization of invite links waits for accounts"],
    ["5", "Broken-link one-click report + freshness badge", "1 d", "Trust and maintenance signal", "Routes into existing Suggest-a-Resource queue"],
    ["6", "Three Persian SEO landing pages", "2 d", "Organic FA acquisition", "Pillar pages for the three Persian head-term clusters (5.2)"],
    ["7", "PWA manifest + install prompt + offline shell", "3 d", "Habit-loop surface", "Second-session install prompt; iOS tested against known limits"],
    ["8", "Interview Readiness Score v0 (local)", "2 d", "Emotional progress anchor", "Local-only preview of Appendix B formula; feedback before accounts"],
  ],
  [5, 29, 10, 22, 34]
));
children.push(p([
  { t: "Sequencing note: items 1\u20133 form a single coherent release in week two, with 4\u20136 in week three and 7\u20138 in week four. " },
  { t: "The pack is small by design; its purpose is to enter the launch window (Section 5.6) with measurement working, the first session improved, and one loop (sharing) already live \u2014 the minimum credible evidence for the bigger account bet that follows." },
]));

/* ══════════════════ 9. LONG-TERM MOAT (2–3 YEARS) ══════════════════ */
children.push(h1("9. Long-Term Moat (2\u20133 Years)"));

children.push(h2("9.1 The Compounding Asset Stack"));
children.push(p([
  { t: "DevReady's defensibility is a stack, not a feature. " },
  { t: "Layer one is the content corpus: 636 curated entries plus a growing original bilingual question bank, digest cards, and Persian-first primers \u2014 thousands of hours of accumulated editorial judgment that cannot be scraped into existence. " },
  { t: "Layer two is behavioral data: years of (opt-in, aggregate) learning signals \u2014 which resources actually precede completed roadmaps, which questions predict interview success \u2014 that make the readiness score and recommendations genuinely better over time. " },
  { t: "Layer three is the community network: contributors with named credits, trusted reviewers, bootcamp relationships, and the Telegram gravitational center, all of which produce a flow of high-intent users no competitor can buy efficiently. " },
  { t: "Layer four is the brand position: \u201Cthe serious, honest, bilingual one\u201D \u2014 an association earned by restraint and repeated keeping of small promises." },
]));
children.push(p([
  { t: "Two assets deserve special emphasis because they are structurally hard to copy. " },
  { t: "The bilingual AI evaluation dataset (Phase C) \u2014 Persian technical answers scored against rubrics \u2014 becomes more valuable and more accurate every year a competitor waits to start. " },
  { t: "And the local-first privacy identity, once publicly adopted by a privacy-conscious audience, cannot be imitated by account-first incumbents without undermining their own business models; DevReady's architecture is its position." },
]));

children.push(h2("9.2 What a Well-Funded Copycat Would Need to Replicate"));
children.push(tableCaption("Replication difficulty from the perspective of a funded English-first competitor (24-month horizon)."));
children.push(bizTable(
  ["Asset", "Replication cost", "Why it is hard"],
  [
    ["636-resource curated catalog + rubric process", "Months of native editorial work", "Curation judgment is tacit knowledge; the rubric and reviewer network are the asset, not the list"],
    ["Native Persian content corpus (150+ items)", "Hire native engineer-writers; 12+ months", "Thin talent pool; quality bar set by DevReady's existing corpus"],
    ["Bilingual product craft (RTL, typography, terminology)", "Quarter of focused product work", "Easy to do badly; the audience notices instantly and defects"],
    ["Habit loop data (challenge patterns, review scheduling)", "A year of live users", "Requires the daily audience first \u2014 the chicken DevReady already has"],
    ["Persian community center of gravity (Telegram, contributors)", "18\u201324 months of presence", "Trust and credits are non-transferable; incumbents' English brands do not transfer"],
    ["Bilingual AI evaluation dataset", "Start from zero, or never", "Only live Persian-answering users generate it; compounding advantage"],
  ],
  [30, 22, 48]
));

children.push(h2("9.3 Strategic Guardrails"));
children.push(bullet([{ t: "Guard the covenant. ", b: true }, { t: "The free library is the moat's foundation; any future team that paywalls it has already lost." }]));
children.push(bullet([{ t: "Guard the tone. ", b: true }, { t: "Every growth mechanic must pass the \u201Ctrusted senior friend\u201D test; growth that damages trust is negative growth." }]));
children.push(bullet([{ t: "Guard local-first. ", b: true }, { t: "Accounts extend the local experience; they never replace it. The anonymous mode must remain fully functional forever." }]));
children.push(bullet([{ t: "Guard depth over breadth. ", b: true }, { t: "A smaller catalog that is alive and trusted beats a bigger one that is rotting; when in doubt, improve before expanding." }]));
children.push(bullet([{ t: "Guard the bilingual craft. ", b: true }, { t: "No machine translation ships under the DevReady name, in content or in AI features." }]));

/* ══════════════════ 10. APPENDICES ══════════════════ */
children.push(h1("10. Appendices: Flows, Feature Specs & Metric Definitions"));

children.push(h2("Appendix A. Example User Flows"));

children.push(h3("A.1 First-session onboarding flow"));
children.push(numbered("flow-a", [{ t: "Landing (FA or EN by browser locale) \u2192 single hero promise + one primary button: \u201CBuild my plan.\u201D" }]));
children.push(numbered("flow-a", [{ t: "Three-question quiz: target role, interview window (weeks), self-rated weakest area; optional hours-per-week." }]));
children.push(numbered("flow-a", [{ t: "Roadmap preview personalized: role path highlighted, stage 1 expanded, estimated weekly rhythm shown honestly." }]));
children.push(numbered("flow-a", [{ t: "First action in-session: auto-suggested starting resource with a one-tap \u201CMark in progress.\u201D" }]));
children.push(numbered("flow-a", [{ t: "Daily Challenge invitation: today's question with hint ladder; completion registers the streak." }]));
children.push(numbered("flow-a", [{ t: "Review Deck seeded from the missed checkpoint items; explanation card shows how spaced repetition works." }]));
children.push(numbered("flow-a", [{ t: "Soft account prompt only after the first bookmark or completed action (\u201CKeep this progress safe on all devices?\u201D) \u2014 dismissible, never blocking." }]));
children.push(numbered("flow-a", [{ t: "Activation event recorded (bookmark + 1 completion + 1 challenge); if not reached, analytics show where the flow lost the user." }]));

children.push(h3("A.2 Local-to-cloud sync and merge flow"));
children.push(numbered("flow-b", [{ t: "User signs in via magic link from a second device; server issues account token; local keys enumerated." }]));
children.push(numbered("flow-b", [{ t: "Local snapshot is serialized (bookmarks, progress, notes, challenge history, review schedule, votes, preferences) with timestamps." }]));
children.push(numbered("flow-b", [{ t: "Server merges against any existing cloud state: union for sets, newest-wins for scalars, tombstones honored for deletions." }]));
children.push(numbered("flow-b", [{ t: "Conflicts beyond rules (e.g., divergent notes edited offline on both devices) are surfaced in a simple per-item chooser \u2014 the user decides, the system never silently discards." }]));
children.push(numbered("flow-b", [{ t: "Merged snapshot is written back to both the server and the local store; sync indicator turns green with a human-readable \u201CLast synced 2 minutes ago.\u201D" }]));
children.push(numbered("flow-b", [{ t: "Subsequent changes sync incrementally in the background; offline-first is preserved \u2014 the app never waits on the network." }]));
children.push(numbered("flow-b", [{ t: "Sign-out keeps local data intact and returns the user to full anonymous functionality; export remains one click." }]));

children.push(h3("A.3 Referral share flow"));
children.push(numbered("flow-c", [{ t: "Trigger: milestone reached (stage completed, 30-day streak) \u2192 progress card rendered bilingually with the user's invite link." }]));
children.push(numbered("flow-c", [{ t: "Share sheet opens natively (Telegram first on RTL/fa, then system targets); card includes a UTM-tagged deep link." }]));
children.push(numbered("flow-c", [{ t: "Friend lands on a personalized page (\u201CAmir is preparing for frontend interviews \u2014 join tonight's challenge\u201D) \u2192 Appendix A.1 flow begins." }]));
children.push(numbered("flow-c", [{ t: "Friend activates per the Section 1 definition \u2192 both accounts receive a streak freeze; referrer's counter increments." }]));
children.push(numbered("flow-c", [{ t: "At 3 activations, the referrer earns a Pro month; at 5, the lifetime 30% annual discount (Section 5.5)." }]));
children.push(numbered("flow-c", [{ t: "K-factor computed weekly from invite-link cohort data; loop variants are A/B tested only when sample sizes allow honest reads." }]));

children.push(h2("Appendix B. Interview Readiness Score v1 Specification"));
children.push(p([
  { t: "Purpose: a single 0\u2013100 number that honestly reflects preparedness for the user's target role, updated daily, computable from local state in v0 and account state in v1. " },
  { t: "The score is deliberately transparent: every component is user-visible with its contribution, because a number users cannot interrogate is a number they will distrust. " },
  { t: "Anti-gaming notes: components are normalized against the user's own history rather than absolute counts, streak credit saturates (a 40-day streak adds no more than a 21-day one), and challenge accuracy uses a rolling window so old lucky streaks decay." },
]));
children.push(tableCaption("Readiness Score v1 components and weights (sum = 100)."));
children.push(bizTable(
  ["Component", "Weight", "Inputs", "Rationale"],
  [
    ["Roadmap completion", "30", "Completed resources and stages within the active role path", "Coverage of the defined surface"],
    ["Challenge accuracy trend", "25", "Rolling 21-day accuracy and difficulty mix on Daily Challenge / bank questions", "Recency-weighted skill signal"],
    ["Review discipline", "20", "Share of due Review Deck cards completed on schedule", "Measures retention behavior, not memory"],
    ["Practice breadth", "15", "Distinct topics touched in the last 14 days vs. role path topic map", "Guards against single-topic tunnel vision"],
    ["Consistency", "10", "Active days in the last 21, saturating at 15", "Habit strength with a capped, honest ceiling"],
  ],
  [21, 11, 38, 30]
));
children.push(p([
  { t: "Formula: score = \u2211 (weight \u00D7 normalized component), where each component is normalized to 0\u20131 against its own saturation curve (completion ratios for coverage components, recency-weighted accuracy for skill components). " },
  { t: "The score is always accompanied by the two components with the largest headroom \u2014 \u201Cyour score is 64; review discipline and challenge accuracy are holding it back\u201D \u2014 which converts the metric into the Next Best Action (Section 3.3) and closes the loop between analytics and daily behavior." },
]));

children.push(h2("Appendix C. Metric Definitions"));
children.push(tableCaption("Shared metric vocabulary. Single definitions live here and are referenced everywhere else."));
children.push(bizTable(
  ["Metric", "Definition", "Notes"],
  [
    ["Prep action", "Completing a resource, finishing a Daily Challenge, completing due Review Deck cards, or adding a note", "The atomic unit behind the north star"],
    ["Weekly Active Prepper (WAP)", "Distinct user with 3+ prep actions in a rolling 7-day window", "North-star metric (Section 1)"],
    ["Activation", "First session containing bookmark \u2265 1, completion \u2265 1, and 1 finished challenge", "Predicts D30; measured per new user"],
    ["D7 / D30 retention", "Share of a first-session cohort returning on day 7 / day 30 (or within \u00B12-day window)", "Both strict-day and window variants reported"],
    ["Resource completion rate", "Resources marked completed \u00F7 resources marked in progress", "Curation quality proxy"],
    ["Streak persistence", "Activated users whose streak reaches 7+ days", "Habit anchor health"],
    ["Review due discipline", "Due cards completed within 48 hours of due date", "Drives readiness score component"],
    ["K-factor", "Invited users who activate \u00F7 inviting users, per week", "Referral loop efficiency"],
    ["Free-to-Pro conversion", "Active paying accounts \u00F7 active accounts (30-day window)", "Reported with and without lifetime tier"],
    ["Loop contribution", "New activated users attributed to each growth loop", "Monthly reallocation input (7.4 rhythm)"],
  ],
  [24, 44, 32]
));

module.exports = { children };
