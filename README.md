<div align="center">

# DevReady

### Bilingual Web Development Interview Prep Platform

A production-grade, bilingual platform for preparing for Web Development interviews — built with **Next.js 16**, **React 19**, **TypeScript 5**, and **Tailwind CSS 4** — featuring 32 categories, 636+ curated resources, spaced repetition, daily challenges, optional accounts with cross-device sync, and enterprise-level resilience patterns.

[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## About

DevReady is not a template. Every component, API route, and design decision was built from scratch to reflect a specific engineering philosophy: **type safety by default, performance as a constraint, and accessibility as a core metric**.

The platform serves as a living study companion — showcasing a curated resource catalog, study roadmaps, spaced repetition review decks, daily challenges with streaks, and an optional account system with merge-safe cross-device sync. All content is fully bilingual (English / فارسی) with correct RTL support.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Performance](#performance)
- [Roadmap](#roadmap)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Author](#author)
- [License](#license)

---

## Features

<table>
<tr>
<td width="50%">

### 🌍 Bilingual (EN / FA)

Full Persian and English support with RTL/LTR layout switching, localized metadata, Persian digit localization via Vazir FD font, and i18n dictionaries.

</td>
<td width="50%">

### 🌗 Dark / Light / System Theme

Three-way theme toggle persisted to `localStorage` with system-preference detection and FOUC prevention.

</td>
</tr>
<tr>
<td>

### 📚 Curated Resource Catalog

32 categories and 636+ hand-picked resources with instant search, category chips, Persian-only filter, and deep-linkable detail pages.

</td>
<td>

### 🗺️ Study Roadmaps

10 stages, 8 role paths, weekly rhythm table, and 6 product phases with shipped/current badges.

</td>
</tr>
<tr>
<td>

### 🔖 Bookmarks & Progress

3-state tracking (todo/doing/done) in localStorage with live counts and library view.

</td>
<td>

### 📝 Per-Resource Notes

Debounced autosave notes with char counter and library Notes tab.

</td>
</tr>
<tr>
<td>

### 🧠 Spaced Repetition

SM-2-lite review deck with mastery bands, interval previews, and "Again" re-queue.

</td>
<td>

### 🔥 Daily Challenges

34 bilingual challenges with streaks, hints, model answers, and Jalali dates.

</td>
</tr>
<tr>
<td>

### 🗳️ Difficulty Voting

Local-first voting with community consensus when signed in; distribution bars.

</td>
<td>

### 👤 Optional Accounts

scrypt auth, session tokens, merge-safe cross-device sync of all 5 stores.

</td>
</tr>
<tr>
<td>

### 🤝 Contributions

Submit resources, export as JSON/Markdown, community queue with moderation.

</td>
<td>

### 📴 Offline Support

Service Worker with stale-while-revalidate caching and offline fallback.

</td>
</tr>
<tr>
<td>

### 🛡️ Security

Rate limiting, security headers, error boundaries, input validation.

</td>
<td>

### ♿ Accessibility

Semantic HTML, keyboard nav, ARIA, focus management, 44px touch targets, WCAG AA+.

</td>
</tr>
</table>

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui |
| **State** | useSyncExternalStore, React Context |
| **Backend** | Next.js API Routes, Prisma, SQLite |
| **Auth** | scrypt, session tokens (SHA-256) |
| **Fonts** | Inter, Vazir, Vazir FD (self-hosted) |
| **PWA** | Service Worker, Web Manifest |
| **Deployment** | Vercel / self-hosted |

---

## Project Structure

```text
DevReady/
├── src/
│   ├── app/              # Next.js app router + API routes
│   ├── components/       # UI components and views
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Contexts, data, utilities
├── public/               # Static assets, fonts, PWA
├── prisma/               # Database schema
├── scripts/              # Utility scripts
└── README.md
```

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 18 or **Bun** ≥ 1.0
- **npm** / **bun**

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/DevReady.git
cd DevReady
bun install
```

### Database

```bash
bun run db:push
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
bun run build
bun run start
```

---

## Architecture

### Multi-Store Sync

Five localStorage stores (library, daily, SRS, contribs, votes) merge client-side via a pure merge engine with validation. Cloud snapshot is opaque JSON; conflicts resolve by union/LWW rules.

### Spaced Repetition

SM-2-lite scheduler with ease/interval tracking, mastery bands (learning/familiar/confident/mastered), and "Again" re-queue.

### Realtime Signals

SSE stream for vote updates with auto-reconnect and polling fallback.

---

## Performance

- Code splitting with lazy-loaded views
- Self-hosted fonts with `font-display: swap`
- Service Worker stale-while-revalidate caching
- Reduced motion support
- No horizontal overflow from 320px to 1920px

---

## Roadmap

- [x] Phase 1 — Foundation
- [x] Phase 2 — Content Experience
- [x] Phase 3 — Practice Layer
- [x] Phase 4 — Retention & Community
- [x] Phase 5 — Accounts & Signals
- [x] Phase 6 — Content Expansion (32 categories)
- [ ] Phase 7 — Security, Quality, Offline, Realtime (in progress)

---

## Deployment

### Vercel

```bash
vercel deploy
```

### Self-Hosted

```bash
bun run build
PORT=3000 bun .next/standalone/server.js
```

---

## Scripts

| Command | Description |
|:--------|:------------|
| `bun run dev` | Start development server |
| `bun run build` | Production build |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema |

---

## Author

**Mohammadhossein Asadi** — Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)

---

## License

This project is licensed under the [MIT License](LICENSE).