/** c4-money-roadmap.js — Chapter 6: Monetization; Chapter 7: 12-Month Roadmap */
const { h1, h2, p, bullet, tableCaption, bizTable, callout, fig } = require("./helpers");

const CHARTS = "/home/z/my-project/scripts/devready-plan/charts";
const children = [];

/* ══════════════════ 6. MONETIZATION STRATEGY ══════════════════ */
children.push(h1("6. Monetization Strategy"));

children.push(h2("6.1 The Free-Forever Covenant and the Free/Pro Split"));
children.push(p([
  { t: "The free tier is a covenant, not a trial: the complete 636-resource library, Daily Challenge with streaks, Roadmap and role paths, Review Deck, local tracking and notes, and JSON export of all local data stay free forever. " },
  { t: "Three reasons make this the rational foundation rather than generosity: first, curation is the acquisition engine and paywalling it would strangle the top of the funnel; second, the market's price sensitivity and payment friction (Section 6.3) mean a hard paywall would exclude the exact audience the mission targets; third, every competitor's paid tier is a content tier — DevReady's paid tier can be an intelligence tier, which is a much easier ethical sell. " },
  { t: "Pro sells convenience, capacity and intelligence — never the library." },
]));
children.push(tableCaption("Free versus Pro feature split. The boundary rule: if locking it would harm someone's job hunt, it stays free."));
children.push(bizTable(
  ["Capability", "Free (forever)", "Pro"],
  [
    ["Full resource library and categories", "Yes", "Yes"],
    ["Daily Challenge, streaks, Review Deck, roadmap, local tracking, notes", "Yes", "Yes"],
    ["Data export (JSON), account deletion", "Yes", "Yes"],
    ["Cloud sync across devices", "Local only", "Yes, unlimited devices"],
    ["Question bank", "Rotating free set (e.g., 25 of 100)", "Full bank with model answers and hint ladders"],
    ["Build-time AI hints and digest cards", "Core set", "Extended set"],
    ["AI mock interviews (Phase B)", "\u2014", "4 sessions/month, then credit top-ups"],
    ["Readiness analytics deep-dive (trends, weak-topic breakdowns)", "Headline score", "Full analytics"],
    ["Company guide deep packs", "Standard guides", "Interview-loop breakdowns and question sets"],
    ["Priority Suggest-a-Resource review", "48-hour triage like everyone", "Fast lane + accepted-credit fast track"],
  ],
  [46, 26, 28]
));

children.push(h2("6.2 Pricing Tiers and Conversion Logic"));
children.push(p([
  { t: "Pricing is anchored against verified competitor points (GreatFrontEnd $120/year and $180 lifetime; NeetCode Pro $119/year and $297 lifetime) and undercut meaningfully, because DevReady is the challenger brand and its audience has lower purchasing power. " },
  { t: "Launch pricing: Pro at $9 per month, $69 per year, and a Founder Lifetime at $149 limited to the first 500 supporters. " },
  { t: "The lifetime tier is both revenue acceleration and community-building — the 500 founders become the loudest advocates and the most forgiving early adopters. " },
  { t: "Regional Pro serves Iran-based users at roughly 40\u201360% of global pricing through local rails (Section 6.3), priced in local currency to remove both the payment barrier and the exchange-rate guessing." },
]));
children.push(tableCaption("Pricing tiers (launch), anchors, and expected conversion logic."));
children.push(bizTable(
  ["Tier", "Price", "Anchor and justification", "Expected conversion behavior"],
  [
    ["Free", "$0, forever", "Competitors' free tiers are samples; DevReady's is the whole library", "Wide top-of-funnel; builds trust that powers all later conversion"],
    ["Pro monthly", "$9/mo", "Half of GreatFrontEnd ($39/mo); impulse-friendly", "Late-stage preppers near interview dates"],
    ["Pro annual", "$69/yr (~$5.75/mo)", "Undercuts GFE $120/yr and NeetCode $119/yr by ~40%", "Default recommendation; 8\u201316 week prep cycles fit annual naturally"],
    ["Founder Lifetime", "$149 one-time, first 500", "Below GFE lifetime $180 and NeetCode $297", "Early believers and diaspora earners; funds the question bank build-out"],
    ["Regional Pro (Iran-based)", "~40\u201360% of global, local currency", "Purchasing-power parity plus local payment rails", "Converts users global cards would exclude; identity kept via sync"],
  ],
  [16, 18, 34, 32]
));
children.push(p([
  { t: "Conversion expectations are deliberately conservative: 2\u20134% of active accounts within 12 months of the Pro launch, concentrated in the final four weeks before users' interview dates. " },
  { t: "The conversion triggers engineered into the product are honest ones: the readiness deep-dive upsell after a mock interview, sync prompts after progress accumulates on two devices, and the mock-interview quota itself. " },
  { t: "No countdown timers, no crippled free tier, no \u201Cyou completed this resource \u2014 pay to continue\u201D patterns; each of those would trade short-term revenue for the brand asset this plan is built on." },
]));

children.push(h2("6.3 The Iran Payment Reality, Handled Ethically"));
children.push(p([
  { t: "International card networks do not process payments for Iran-resident cards, and third-party processors commonly refuse Iranian transactions; this is a hard constraint for any monetization aimed at the core audience. " },
  { t: "The strategy is to be practical inside the rules: a licensed regional payment partner (ZarinPal-class local gateways operated by an Iranian legal entity) for Regional Pro in local currency; a gift-code distribution model through trusted resellers and community shops for users who prefer that; stablecoin (USDT) as an explicitly opt-in channel for diaspora-adjacent payments where legal; and a sponsored-seat pool funded by the diaspora (\u201Csponsor a prepper\u201D) that gives free Pro to users who cannot pay at all. " },
  { t: "Two bright lines keep this clean: DevReady will never provide sanctions-evasion guidance, and Regional Pro purchases always run through licensed local entities \u2014 the platform itself stays neutral infrastructure. " },
  { t: "Because the covenant (Section 6.1) keeps the entire library free, no user is excluded from the product's core value by any of these constraints; payment friction gates convenience, never opportunity." },
]));

children.push(h2("6.4 B2B: Bootcamps, Companies, and Programs"));
children.push(p([
  { t: "B2B is the second revenue engine, launched only after consumer Pro validates (month 6+). " },
  { t: "The beachhead is bootcamps and cohort programs: a per-learner license of roughly $10\u201315 per term including cohort dashboards (who is active, readiness distribution, completed stages), curriculum mapping onto the roadmap stages, and white-labeled prep weeks (Section 5.4). " },
  { t: "The second product is a hiring-side signal: opt-in readiness badges that employers can request from candidates, giving companies a cheap pre-screen and giving preppers a reason to keep scores honest. " },
  { t: "Both products reuse 100% of existing infrastructure \u2014 roadmap, challenge, readiness score \u2014 so B2B effort is packaging and relationships, not new architecture. " },
  { t: "The B2B pilot target is two paying cohort partners by month 9; the metric that matters is cohort activation lift, which becomes the sales story." },
]));

children.push(h2("6.5 Ethical Monetization Principles"));
children.push(bullet([{ t: "Never paywall the library, ", b: true }, { t: "per the Section 6.1 covenant \u2014 the plan's most important sentence." }]));
children.push(bullet([{ t: "No dark patterns: ", b: true }, { t: "cancel in two clicks, no fake scarcity, no shame copy, no pre-checked annual upsell." }]));
children.push(bullet([{ t: "Hardship pricing exists quietly: ", b: true }, { t: "students and anyone who emails get a no-interrogation discount; the sponsored-seat pool covers those who cannot pay." }]));
children.push(bullet([{ t: "Data is never the product: ", b: true }, { t: "no data sale, no ads retargeting users, telemetry aggregate-only (Section 3.2)." }]));
children.push(bullet([{ t: "Public roadmap and honest changelogs ", b: true }, { t: "so supporters can see what their money builds \u2014 in a market burned by course scams, transparency itself converts." }]));

children.push(h2("6.6 Early Experiments Versus Later Scaling"));
children.push(p([
  { t: "Monetization ships in four deliberate steps, each validating the next. " },
  { t: "Month 1\u20132: Founder Lifetime pilot sold manually to the Telegram seed community (tests price and messaging with zero payment-infrastructure cost \u2014 invoiced or via early regional rails). " },
  { t: "Month 3: self-serve Pro with the annual plan as default and Regional Pro through the first local gateway integration. " },
  { t: "Month 6: B2B pilot with two bootcamps; AI mock interviews enter Pro as the flagship paid capability with hard quotas. " },
  { t: "Month 12: price review against measured conversion and competitor moves; consider monthly-regional parity and a team tier. " },
  { t: "Every step has a kill criterion: if lifetime conversion underperforms, tiers simplify rather than multiply; if regional rails fail compliance review, the sponsored-seat pool absorbs demand instead." },
]));

/* ══════════════════ 7. 12-MONTH ROADMAP ══════════════════ */
children.push(h1("7. 12-Month Technical & Product Roadmap"));

children.push(h2("7.1 Phased Roadmap"));
children.push(p([
  { t: "The roadmap assumes the small team of Section 7.4 and one organizing principle: each phase must produce either a measured learning or a shippable asset \u2014 ideally both. " },
  { t: "Dates are relative to the plan's approval (October 2026), so \u201Cmonth 3\u201D means January 2027." },
]));
children.push(tableCaption("12-month phased roadmap by workstream. Q1 = months 1\u20133, Q2 = months 3\u20136, H2 = months 6\u201312."));
children.push(bizTable(
  ["Phase", "Product & engineering", "Content", "Growth", "Monetization"],
  [
    [
      { t: "Now (0\u20134 wks)", b: true },
      "Privacy-friendly analytics; Next Best Action card; onboarding quiz; broken-link reporting; PWA install + offline shell; shareable progress card",
      "Start question bank v1 (20 questions); 10 digest cards/week cadence begins",
      "Seed Telegram channel; founder build-in-public starts; 3 Persian SEO landing pages",
      "\u2014",
    ],
    [
      { t: "Months 1\u20133", b: true },
      "Accounts + cloud sync (merge engine); readiness score v1; review-due reminders (opt-in); hreflang + FAQ schema",
      "Question bank reaches 60; company guides 1\u20135; terminology glossary finalized",
      "Launch moment (PH + Telegram); partner-channel collaborations; weekly cadence locked",
      "Founder Lifetime pilot (manual)",
    ],
    [
      { t: "Months 3\u20136", b: true },
      "Build-time AI hints shipped for the bank; checkpoint quizzes; notes-to-flashcards; public profile pages (opt-in)",
      "Question bank 100 complete; Persian system-design primer (8 parts); company guides 6\u201310",
      "Challenge-a-friend; contributor credits live; referral loop on; first co-branded prep week",
      "Self-serve Pro ($9/$69) + Regional Pro via local gateway",
    ],
    [
      { t: "Months 6\u201312", b: true },
      "AI mock interviews (quota-based); readiness analytics deep-dive; adaptive rules v1; regional payment rails hardened",
      "Exercises 30; salary/negotiation + relocation guides; digest cards cover top 100; second question-bank tranche (100+)",
      "YouTube mock-interview series; annual data report; K-factor optimization",
      "B2B pilot with 2 bootcamps; founder-lifetime retro; price review",
    ],
  ],
  [11, 27, 21, 19, 22]
));

children.push(h2("7.2 Metrics and Success Criteria per Phase"));
children.push(p([
  { t: "Each phase has explicit go/no-go criteria; a phase that misses its metric triggers a diagnosis before the next phase's scope is approved, which is how a small team avoids building on sand. " },
  { t: "Figure 2 shows the retention trajectory the plan commits to; all numbers are targets pending the month-1 analytics baseline, stated so the team can be held to them." },
]));
children.push(...fig(CHARTS + "/retention_targets.png",
  "Twelve-month retention targets versus a typical unpersonalized content-tool baseline. Both curves are illustrative; the baseline is re-measured after analytics ship in month 1."));
children.push(tableCaption("Phase gates and success criteria. All baselines are established by the month-1 analytics release."));
children.push(bizTable(
  ["Phase", "Success criteria (go)", "Kill / re-scope signals"],
  [
    ["Now (0\u20134 wks)", "Analytics events flowing; activation measurable; NBA card used by 30%+ of new sessions", "Event schema contested or incomplete \u2014 delay everything rather than measure garbage"],
    ["Months 1\u20133", "10%+ of new users create accounts; D7 \u2265 12%; launch drives 1,000+ activated sessions", "Account creation under 4% \u2192 redesign prompts before adding paid features"],
    ["Months 3\u20136", "D7 \u2265 15%; 2%+ of accounts on Pro; question-bank completion \u2265 35%", "Pro under 1% \u2192 revisit Pro value split before B2B"],
    ["Months 6\u201312", "D30 \u2265 10%; K-factor \u2265 0.15; 2 B2B partners; conversion 2\u20134%", "Mock-interview unit cost exceeds quota revenue \u2192 shrink quotas, reroute to build-time AI"],
  ],
  [14, 46, 40]
));

children.push(h2("7.3 Risks and Mitigations"));
children.push(tableCaption("Risk register with mitigation owners implied by workstream."));
children.push(bizTable(
  ["Risk", "Likelihood", "Impact", "Mitigation"],
  [
    ["Link rot degrades catalog trust", "High", "Medium", "Monthly audit job, Wayback fallbacks, digest cards, one-click reporting (4.1)"],
    ["Iran payment friction caps conversion", "High", "High", "Regional licensed gateway, gift codes, sponsored seats; free covenant keeps core unaffected (6.3)"],
    ["Runtime AI cost overrun", "Medium", "Medium", "Build-time-first architecture; hard quotas; small-model routing; kill criteria in 7.2"],
    ["Solo-founder bus factor", "Medium", "High", "Documented playbooks, open catalog-change log, part-time backups per workstream, public roadmap"],
    ["Persian market ceiling limits scale", "Medium", "Medium", "Dual-market bilingual strategy; English cluster investment from Q2; B2B widens buyers"],
    ["Competitor copies features", "Medium", "Low", "Moat is corpus + community + bilingual craft (Section 9), not any single feature"],
    ["iOS PWA limits mute the habit loop", "Medium", "Medium", "Android/desktop first-class; Telegram bot reminders as the iOS stopgap"],
    ["Community moderation incidents", "Low", "Medium", "Defer open comments; structured reviews only; auditable contributor identities (3.7)"],
  ],
  [30, 15, 11, 44]
));

children.push(h2("7.4 Team and Resource Assumptions"));
children.push(p([
  { t: "The plan is sized for: one founding full-stack engineer (full-time), one part-time engineer (20 hrs/week), one native Persian content lead (20 hrs/week, from month 2), and the founder wearing product and growth hats. " },
  { t: "Fixed costs stay under a few hundred dollars per month at this stage \u2014 hosting, domain, e-mail, AI build-time generation batches \u2014 with the first material costs being the content lead's time and regional payment integration. " },
  { t: "Deliberately not hired in year one: a mobile engineer (PWA covers it), a data scientist (rules beat models at this data volume), a designer (the existing design system is a moat to preserve, not escape), and any sales role (founder-led partnerships until B2B proves out). " },
  { t: "If the Founder Lifetime pilot overperforms, the first hire is a second content lead, because content depth is the bottleneck asset; engineering hires follow only when the roadmap's product phases slip, not before." },
]));

children.push(callout("Operating rhythm", [
  { t: "Weekly: ship log + metrics review (30 minutes, same agenda). Monthly: loop contribution analysis reallocates growth effort. Quarterly: catalog state note, risk register refresh, and a public roadmap update. Small teams do not fail from small budgets; they fail from undisciplined focus." },
]));

module.exports = { children };
