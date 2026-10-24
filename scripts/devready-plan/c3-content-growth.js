/** c3-content-growth.js — Chapter 4: Content Strategy; Chapter 5: Growth & Marketing Strategy */
const { h1, h2, p, bullet, tableCaption, bizTable, callout } = require("./helpers");

const children = [];

/* ══════════════════ 4. CONTENT STRATEGY ══════════════════ */
children.push(h1("4. Content Strategy"));

children.push(h2("4.1 Reducing External-Link Dependency and Defeating Link Rot"));
children.push(p([
  { t: "A 636-link catalog is an asset with a half-life. " },
  { t: "At the industry's typical link-rot rate of roughly 6\u201310% per year, DevReady should expect 40\u201360 dead or degraded links annually without an active defense — invisible today precisely because there is no telemetry. " },
  { t: "The maintenance system has four parts, all cheap to build: a monthly automated HTTP audit across the entire catalog that records status codes and flags redirects, soft-404s and slow responses; automatic Wayback Machine snapshot checks with an \u201Carchived version\u201D fallback link when a live URL degrades; a one-click \u201Cbroken link\u201D report on every resource card routed into the existing Suggest-a-Resource triage queue; and a freshness badge (reviewed date) on each resource card so users can see the catalog is alive." },
]));
children.push(p([
  { t: "Dependency on destinations is reduced by the digest-card program: for each of the top 100 resources by usage, a DevReady-written 200\u2013400 word summary with key takeaways, rendered natively in the app above the outbound link, in both languages. " },
  { t: "If a destination dies or changes, the summary preserves the value and the slot is re-curated rather than abandoned. " },
  { t: "Digest cards also serve the interactive layer (Section 3.4), the AI hint corpus (Section 3.5), and Persian SEO (Section 5.2) — one writing investment, four returns. The program starts with 10 cards per week and reaches 100 in a quarter." },
]));

children.push(h2("4.2 Original Content Roadmap: What to Create First, and Why"));
children.push(p([
  { t: "Original content is prioritized by a single rule: create the asset that increases daily return probability and cannot be found elsewhere in Persian. " },
  { t: "The sequence below is sized for one part-time native content lead plus founder editing time, with each item strengthening the product loop rather than merely adding pages." },
]));
children.push(tableCaption("Original content roadmap in build order. Every item ships bilingual unless marked Persian-first."));
children.push(bizTable(
  ["Order", "Asset", "Why this order", "Scope", "Primary job"],
  [
    ["1", "Bilingual question bank v1: 100 questions (JS, React, behavioral) with model answers and hint ladders", "Feeds Daily Challenge, Review Deck and Pro tier at once; the single highest-leverage asset", "100 \u00D7 (question + model answer + 3 hints)", "Retention and monetization anchor"],
    ["2", "Digest cards for top 100 resources", "Maintains curation quality while accumulating original text; cheap per unit", "100 \u00D7 200\u2013400 words \u00D7 2 languages", "Link-rot defense and SEO"],
    ["3", "10 company guides (bilingual)", "High-intent searches; strong sharing loop among referral circles", "10 guides, 1,500 words each", "Acquisition"],
    ["4", "Persian-first system design primer series", "No credible Persian equivalent exists; premium-feeling free content builds brand", "8 parts, Persian-written", "Brand and moat"],
    ["5", "Salary and negotiation guide (Iran market + remote/diaspora)", "Unique, highly shared, deeply useful; nobody else covers both markets honestly", "1 long-form + templates", "Word-of-mouth"],
    ["6", "Relocation and visa guide for Persian developers", "Emotionally resonant, evergreen, differentiating; pairs with persona Amir's real goal", "1 long-form, updated quarterly", "Word-of-mouth"],
    ["7", "Interactive JS fundamentals exercises", "Converts readers into practitioners; uses the sandboxed runner from Section 3.4", "30 exercises", "Retention and completion"],
  ],
  [9, 26, 30, 16, 19]
));

children.push(h2("4.3 The Persian Content Advantage as a Real Moat"));
children.push(p([
  { t: "The advantage is only a moat if Persian content is written natively, not translated. " },
  { t: "Translated English content reads like a second-class mirror, and the audience can tell instantly; the style guide therefore mandates Persian-written explanations where Persian is the teaching language, with technical terms deliberately kept in English (exactly how Iranian developers speak), a shared glossary of Persian technical terminology to keep 636 resources and all new content consistent, and RTL typographic rules already enforced in the product. " },
  { t: "The \u0641\u0627\u0631\u0633\u06CC-only filter currently surfaces 14 native-language resources; the goal is 150+ genuinely Persian-written items within 12 months, which would make DevReady's corpus larger than any competitor's Persian offering — by a factor of ten." },
]));
children.push(p([
  { t: "The moat compounds in three directions. " },
  { t: "SEO: the Persian keyword space (Section 5.2) is low-competition; the first structured entrant owns it. " },
  { t: "Data: Persian technical Q&A text feeds the Phase C AI evaluation model that no English-first competitor can replicate without hiring native engineers. " },
  { t: "Brand: being the only platform that respects Persian developers in their own language earns a trust premium that price cuts cannot dislodge. " },
  { t: "Afghan Persian (Dari) and Tajik audiences extend the addressable market at near-zero marginal content cost and are explicitly in scope for the keyword strategy." },
]));

children.push(h2("4.4 Quality Control, Curation Standards, and Ongoing Maintenance"));
children.push(p([
  { t: "Curation is the product; it needs an auditable standard, not vibes. " },
  { t: "Every candidate resource — whether found by the team or submitted via Suggest-a-Resource — is scored against the six-criterion rubric below by two reviewers, with a third as tie-breaker. Acceptance requires at least 8 of 12 points and no zero on accuracy. Existing resources are re-reviewed on a rolling quarterly cycle, and any resource failing two consecutive re-reviews is de-listed to a visible archive rather than silently removed." },
]));
children.push(tableCaption("Curation rubric (0\u20132 per criterion; acceptance bar: 8/12 with no zero on accuracy)."));
children.push(bizTable(
  ["Criterion", "0 points", "1 point", "2 points"],
  [
    ["Accuracy", "Outdated or wrong on core claims", "Mostly correct, minor staleness", "Current and technically precise"],
    ["Pedagogy", "Dumps information; no structure", "Explains but assumes too much", "Builds understanding step by step"],
    ["Interview signal", "General interest only", "Occasionally interview-relevant", "Directly mapped to real interview loops"],
    ["Language quality", "Poor writing or translation artifacts", "Acceptable but uneven", "Excellent; native-level craft"],
    ["Effort-to-value", "Long with little payoff", "Fair ratio", "High value per minute invested"],
    ["Accessibility", "No captions/transcripts where needed; hostile markup", "Partial accommodations", "Readable structure, captions, keyboard-friendly"],
  ],
  [16, 28, 28, 28]
));
children.push(p([
  { t: "Community contributions plug into the same rubric with a service-level promise: every Suggest-a-Resource submission is triaged within 48 hours and accepted submissions credit the contributor on the resource card. " },
  { t: "Quarterly, the team publishes a short \u201Cstate of the catalog\u201D note — additions, removals, dead links repaired — turning unglamorous maintenance into a public trust ritual." },
]));

children.push(h2("4.5 Content Formats That Drive Retention"));
children.push(p([
  { t: "Formats are chosen by their measured effect on completion and return, not by production fashion. " },
  { t: "The retention stack in priority order: personal notes (already shipped — the strongest ownership signal a learner can create); the Review Deck (already shipped — converts consumed content into scheduled practice); the question bank with hint ladders (Chapter 4.2 item 1); checkpoint quizzes attached to resources; checklists (per-interview-type packing lists: what to revise, what to prepare, what to ask); and mock-interview scripts with timing guidance for pairs of users preparing simultaneously. " },
  { t: "Each format ships with an explicit completion metric from day one — notes created per active user, review-due discipline, question-bank accuracy — so the content roadmap stays accountable to behavior rather than output volume. " },
  { t: "Long-form guides are treated as acquisition surfaces (SEO, community sharing); short interactive artifacts are treated as retention surfaces. The two are measured separately and neither is judged by the other's metric." },
]));

/* ══════════════════ 5. GROWTH & MARKETING STRATEGY ══════════════════ */
children.push(h1("5. Growth & Marketing Strategy"));

children.push(h2("5.1 Organic Growth Loops Built Into the Product"));
children.push(p([
  { t: "Paid acquisition is out of scope for year one; the growth engine is a set of product-built loops, each with a trigger, a mechanism, and a measurable expectation. " },
  { t: "The unifying principle: DevReady manufactures shareable artifacts of effort — progress cards, badges, credits — because a studier's network is full of exactly the people who need the product. All artifacts render bilingually and RTL-correctly, since a Persian-language screenshot shared in a Telegram group is itself the ad." },
]));
children.push(tableCaption("Product-built growth loops and their design."));
children.push(bizTable(
  ["Loop", "Trigger", "Mechanism", "Expected effect"],
  [
    ["1. Shareable progress card", "Weekly recap or milestone reached", "One-tap bilingual image (readiness score, streak, stage completed) with a personalized invite link", "Peer credibility; each cohort of sharers seeds new first sessions"],
    ["2. Readiness badge", "User opts in to a public profile", "Permanent profile URL showing roadmap progress and verified badges; linked from resumes and bios", "Long-tail backlinks; hiring-manager discovery (Section 6.4)"],
    ["3. Challenge-a-friend", "Daily Challenge completed", "\u201CNudge a friend to beat today's challenge\u201D with deep link; both get a streak freeze on acceptance", "Direct viral k-factor on the daily habit"],
    ["4. Contributor credits", "Suggestion accepted or review published", "Named credit on the resource card + contributor profile; contributors share their own credits", "UGC supply growth with zero paid incentive"],
    ["5. Company guide backlinks", "Guide pages rank and get shared", "Guides end with \u201Cprepare for this company\u201D roadmap deep link", "SEO-to-product conversion path"],
    ["6. Open-source question seeds", "Quarterly batch of 10 questions released on GitHub", "Community translates/extends; repo links back with structured attribution", "Developer credibility; inbound contributor funnel"],
  ],
  [16, 20, 38, 26]
));

children.push(h2("5.2 Content Marketing and SEO Strategy"));
children.push(p([
  { t: "SEO is a two-language strategy with asymmetric economics: English clusters face entrenched competition, Persian clusters are nearly unclaimed. " },
  { t: "The technical foundation is already favorable — the site is server-rendered Next.js — and needs hreflang EN/FA pairing, FAQPage structured data on question pages, and one canonical URL per concept in each language. " },
  { t: "Content types per cluster: a pillar guide (3,000+ words), 10\u201320 question pages with model answers, and one original data piece per year (for example, a Persian developer job-market snapshot) that earns links." },
]));
children.push(tableCaption("Bilingual SEO topic clusters. Persian terms are actual head terms targeted by the Persian cluster pages."));
children.push(bizTable(
  ["Cluster", "Lang.", "Representative head terms", "Primary assets"],
  [
    ["Frontend interview prep", "EN", "frontend interview questions; react interview questions and answers", "Pillar guide + question pages (from the 100-question bank)"],
    ["System design", "EN", "system design interview prep; frontend system design", "Primer series + roadmap deep links"],
    ["Job-hunt skills", "EN", "developer resume tips; behavioral interview questions software engineer", "Guides 5\u20136 + checklist assets"],
    [
      { fa: true, t: "\u0622\u0645\u0627\u062F\u06AF\u06CC \u0645\u0635\u0627\u062D\u0628\u0647" }, "FA",
      { fa: true, t: "\u0622\u0645\u0627\u062F\u06AF\u06CC \u0645\u0635\u0627\u062D\u0628\u0647 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0646\u0648\u06CC\u0633\u06CC; \u0633\u0648\u0627\u0644\u0627\u062A \u0645\u0635\u0627\u062D\u0628\u0647 \u0641\u0631\u0627\u0646\u062A \u0627\u0646\u062F" },
      "Persian pillar guide + 100 bilingual question pages",
    ],
    [
      { fa: true, t: "\u0637\u0631\u0627\u062D\u06CC \u0633\u06CC\u0633\u062A\u0645" }, "FA",
      { fa: true, t: "\u0637\u0631\u0627\u062D\u06CC \u0633\u06CC\u0633\u062A\u0645; \u0622\u0645\u0648\u0632\u0634 \u0645\u0635\u0627\u062D\u0628\u0647 \u062A\u062E\u0646\u06CC\u06A9\u06CC" },
      "Persian-first primer series (content item 4)",
    ],
    [
      { fa: true, t: "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0648 \u0631\u0648\u0627\u062F\u062F\u062F" }, "FA",
      { fa: true, t: "\u0631\u0632\u0648\u0645\u0647 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0646\u0648\u06CC\u0633; \u0645\u0634\u0627\u0648\u0631\u0647 \u06A9\u0627\u0631\u06CC \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0646\u0648\u06CC\u0633" },
      "Salary/negotiation and relocation guides",
    ],
  ],
  [20, 10, 40, 30]
));
children.push(p([
  { t: "Cadence and measurement: two long-form pieces and six question pages per month at steady state, with Persian and English alternating weeks until the content lead is full-time. " },
  { t: "Cluster success is judged by positions on the head terms above, impressions-to-first-session conversion, and \u2014 critically \u2014 whether organic entrants activate (Section 1 table) better than other channels; clusters that acquire well but do not activate get pruned, not endlessly expanded." },
]));

children.push(h2("5.3 Persian Tech Community Playbook (Telegram, X, LinkedIn, YouTube)"));
children.push(p([
  { t: "Persian-speaking developers live on Telegram; every other channel is secondary for that audience. " },
  { t: "The playbook is a fixed weekly cadence per channel, executable by the founder plus one community-savvy part-time helper, and it front-loads giving: prep tips, honest takes, and free tools before any product ask. " },
  { t: "English-speaking audiences are reached through the founder's build-in-public presence and the open-source artifacts rather than a dedicated content treadmill." },
]));
children.push(tableCaption("Channel playbook with first-90-days cadence. Telegram is the primary Persian surface."));
children.push(bizTable(
  ["Channel", "Role", "Cadence", "First 90 days"],
  [
    ["Telegram (own FA channel)", "Daily habit anchor and community home", "Daily", "Daily Challenge crosspost at a fixed hour; 2 partner-channel collaborations per month; first monthly voice AMA in week 6"],
    ["Telegram (partner channels)", "Borrowed reach inside existing dev communities", "Weekly", "Map 20 viable Persian dev channels; 2\u20133 content collaborations per month (prep threads, challenge takeovers)"],
    ["X / Twitter", "EN + FA build-in-public; founder credibility", "3\u20134 posts/week", "Ship-log threads; share user milestones (with permission); engage EN interview-prep community"],
    ["LinkedIn", "Diaspora professionals; B2B visibility for bootcamps", "2 posts/week", "Persian+English bilingual posts; cohort partnership announcements; hiring-manager content"],
    ["YouTube", "Persian mock-interview breakdowns; trust through faces", "2 videos/month", "\u201CReal mock interview, real feedback\u201D Persian episodes; shorts cut from Daily Challenge explanations"],
    ["GitHub", "Developer credibility; contributor funnel", "Quarterly", "Open question-seed releases (loop 6); public catalog-change log"],
  ],
  [17, 22, 12, 49]
));
children.push(p([
  { t: "Community trust rules are non-negotiable and mirror the brand: no fake urgency, no engagement bait, every claim of a user milestone verifiable. " },
  { t: "The monthly voice AMA doubles as research — recurring questions become question-bank entries, closing the loop between community and content. " },
  { t: "Success metrics: own-channel growth rate, challenge-participation rate from channel posts (tracked via deep links), and qualitative sentiment in partner communities; subscriber counts are explicitly a vanity metric here." },
]));

children.push(h2("5.4 Partnerships and Distribution Channels"));
children.push(p([
  { t: "Partnerships focus on organizations that already aggregate Persian-speaking learners. " },
  { t: "Targets in priority order: Iranian coding bootcamps and competitive-programming platforms (for example Quera and Maktab Sharif cohort programs) for curriculum partnerships; diaspora tech communities and retraining programs (for example ReDI School-type organizations in Europe) for workshop collaborations; university career clubs inside Iran for exam-season prep weeks; and relocation agencies serving Persian-speaking engineers for the relocation guide's distribution. " },
  { t: "The partnership product is co-branded prep weeks: a two-week guided plan built from the existing roadmap stages and Daily Challenge, white-labeled for the partner's cohort, with a shared readiness dashboard for cohort leads (the B2B pilot of Section 6.4). " },
  { t: "Each partnership is structured to be revenue-positive or learning-positive; free logo swaps are declined." },
]));

children.push(h2("5.5 Referral and Viral Mechanics"));
children.push(p([
  { t: "The referral system converts the brand's natural word-of-mouth into a measured loop once accounts exist. " },
  { t: "Mechanics: every account gets a personal invite link; when a friend activates (per the Section 1 definition), both sides receive a streak freeze; at 3 successful invites the referrer earns a month of Pro; at 5, a lifetime 30% discount on the annual plan. " },
  { t: "Rewards are deliberately habit-aligned (streak protection) rather than cash, keeping cost near zero and self-selection high. " },
  { t: "The shareable progress card and challenge-a-friend loops (5.1) act as the referral program's upper funnel; the K-factor target is 0.15 by month 9 — modest, compounding, and measured from the analytics baseline rather than claimed." },
]));

children.push(h2("5.6 Launch and Ongoing Distribution Playbook"));
children.push(p([
  { t: "The launch is a coordinated bilingual moment, not a single Product Hunt spike. " },
  { t: "T-minus 4 weeks: analytics and the quick-win pack (Section 8) live; seed 300 Telegram members from existing communities; prepare the founder story in both languages. " },
  { t: "T-0: Product Hunt launch (English) the same week as the Telegram channel launch event (Persian) with a live challenge and prizes of Pro founder licenses; the Persian side is the primary bet, the English side the credibility halo. " },
  { t: "Weeks 1\u20134 post-launch: daily presence, two AMA sessions, first partner co-branded prep week. " },
  { t: "Steady state thereafter: the weekly cadence of Section 5.3, one original content piece per week minimum, a quarterly \u201Cstate of the catalog\u201D note, and a monthly metrics review that reallocates effort across loops based on measured contribution." },
]));

children.push(callout("Growth thesis", [
  { t: "Distribution for DevReady is not an ad budget — it is Persian-language artifacts of effort, shared by learners into the exact communities where future learners already gather, on a cadence the team can sustain without burnout." },
]));

module.exports = { children };
