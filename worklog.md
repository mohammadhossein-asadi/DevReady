---
Task ID: 1
Agent: Main agent (Z.ai)
Task: Build the DevReady Phase 1 app — bilingual (EN/FA) Web Development Interview Prep platform per the uploaded DevReady.md spec.

Work Log:
- Loaded `fullstack-dev` skill and initialized the Next.js 16 scaffold (init-fullstack.sh).
- Read the full DevReady.md spec (905 lines) covering tech stack, 16-category resource catalog, product + study roadmaps, accessibility and design principles.
- Created the data layer:
  - `src/lib/data/types.ts` — LocaleText/Resource/Category/Hue/CategoryIcon types
  - `src/lib/data/categories-1.ts` + `categories-2.ts` — all 16 categories, 272 resources transcribed from the spec (exact duplicate rows in the System Design table de-duplicated; every distinct resource preserved; Persian-language resources flagged)
  - `src/lib/data/resources.ts` — merged catalog + helpers (totalResources=272, totalPersian=14, domainOf)
  - `src/lib/data/roadmap.ts` — 9 study stages (0–8) bilingual, weekly rhythm, 4 role paths, 4 product phases
- Built i18n: `src/lib/i18n.ts` (full EN/FA dictionaries), `src/lib/language-context.tsx` (useSyncExternalStore-backed language store persisted in localStorage; sets <html lang/dir>; Persian digit localization via `num()`).
- Built Aceternity-style enhancement layer in `src/components/aceternity/` (CSS-only, reduced-motion aware, RTL-safe): background-beams, text-generate, spotlight-card, moving-border, infinite-moving-cards + README documenting integration points.
- Built app shell: header (sticky, blur, skip-link, desktop nav + mobile Sheet), footer (sticky bottom, safe-area padding), theme-toggle (light/dark/system), language-switcher (EN/فا segmented control), resource-card (spotlight hover, whole-card link, Persian badge, domain label), hash-based view router (`#/home`, `#/resources/<categoryId>`, `#/roadmap`) backed by useSyncExternalStore for hydration stability.
- Built three views: HomeView (hero + stats + featured marquee + 16-card category grid + how-to + CTA), ResourcesView (instant search, 16 category chips with counts, فارسی-only toggle, aria-live result count, group badges for question banks, empty state, clear filters), RoadmapView (4 tabs: study timeline, role paths, weekly rhythm table, product phases with "current" badge on Phase 1).
- Theme: emerald-on-neutral palette (light/dark), Inter + Vazirmatn via Google Fonts CSS import, custom keyframes (marquee, beams, word-reveal, moving-border @property), prefers-reduced-motion collapses all decorative animation, custom scrollbars.
- Accessibility: semantic landmarks, skip-to-content, aria-current/aria-pressed/aria-live, ≥44px touch targets, keyboard-visible focus rings, Radix DirectionProvider for RTL-correct primitives.
- Fixed during verification: duplicate React keys (category-scoped keys), hydration mismatch on hash parsing (useSyncExternalStore + cached snapshot), Radix dialog aria-describedby warning, language store lint rule (useSyncExternalStore instead of setState-in-effect).
- `bun run lint` passes clean; dev.log shows 200s with no runtime errors.
- Agent Browser E2E verified: home render, search "sql"→21 results, فارسی-only→14 results, empty state, EN↔FA switch (dir=rtl/lang=fa, Persian digits, Vazirmatn, layout mirroring), dark mode, deep links (#/resources/javascript → 19 resources), home category card → filtered resources, all 4 roadmap tabs, mobile 375px layout + sheet menu, sticky footer, 0 console errors/warnings on fresh loads of all views.

Stage Summary:
- DevReady Phase 1 (Foundation) is complete and browser-verified at `/`.
- Single-route architecture (sandbox constraint) with hash-based views preserving back/forward and deep-linking.
- All spec content preserved: 16 categories, 272 resources, both roadmaps, bilingual UI.
- Key files: src/app/{layout,page,globals.css}, src/components/{providers,app-shell,header,footer,theme-toggle,language-switcher,resource-card}.tsx, src/components/views/{home,resources,roadmap}-view.tsx, src/components/aceternity/*, src/lib/{i18n.ts,language-context.tsx,data/*}.

---
Task ID: 2
Agent: Main agent (Z.ai)
Task: Switch Persian typography from Vazirmatn to the Vazir font (user instruction: "use vazir font for persian").

Work Log:
- Downloaded Vazir woff2 (Regular/Medium/Bold/Black, v30.1.0 from rastikerdar/vazir-font via jsDelivr) and self-hosted under public/fonts/vazir/ (~43KB each, wOF2 signatures verified).
- globals.css: removed Vazirmatn from the Google Fonts import; added 4 @font-face rules for "Vazir" (400, 500, 600–700 mapped to Bold, 800–900 mapped to Black) with font-display: swap; --font-fa now "Vazir", "Inter", …; added "Vazir" to --font-sans after Inter so Persian snippets in EN locale (فارسی badges) also render Vazir while Latin stays Inter.
- Fixed Persian tracking bug: the letter-spacing reset for fa locale lived in @layer base and was beaten by tracking-tight utilities; added an unlayered `html[lang="fa"] body, html[lang="fa"] body * { letter-spacing: 0 }` (unlayered wins over utilities). Persian cursive joins now keep natural spacing; EN tracking preserved (-1.5px on h1).
- Resolved stale dev-server state: killed the previous-session next dev holding port 3000 (EADDRINUSE), cleared .next, relaunched .zscripts/dev.sh (nohup + dev.pid). Learned sandbox reaps setsid/detached processes between tool sessions — server must be relaunched with `nohup bash .zscripts/dev.sh` and verified inline.
- Verified: `bun run lint` clean; compiled CSS contains 0 "vazirmatn" refs and all 4 woff2 URLs; /fonts/vazir/*.woff2 served HTTP 200; Agent Browser EN mode (lang=en, Inter-first stack, h1 -1.5px) and FA mode (lang=fa, dir=rtl, Vazir 400/500/700 loaded via document.fonts.check, h1 letter-spacing neutralized); FA home + FA resources screenshots show clean Vazir glyphs, Persian digits (۲۷۲ منبع), RTL mirroring; 0 console errors; dev.log all 200s.

Stage Summary:
- Persian typography is now the Vazir font family (self-hosted, no external CDN dependency at runtime beyond Google-hosted Inter).
- One uncovered nuance: html[lang=fa] body font-family (base layer) is overridden by the .font-sans utility, but the outcome is spec-correct because Vazir sits in --font-sans right after Inter — Persian glyphs always fall through to Vazir, Latin stays Inter in both locales.
