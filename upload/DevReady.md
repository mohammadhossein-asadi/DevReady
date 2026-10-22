# Web Development Interview Prep

project name : DevReady

A modern, bilingual (English / فارسی) platform for preparing for Web Development interviews — Frontend, Backend, Full-Stack, System Design, Algorithms, Security, and Behavioral rounds.
Built with **Next.js**, **shadcn/ui**, Tailwind CSS, and designed for excellent accessibility, dark/light mode, and a clean yet engaging user experience.

> Recommended visual enhancement: **[Aceternity UI](https://ui.aceternity.com)** — free React & Next.js UI components for beautiful backgrounds, cards, timelines, and interactive elements that keep the interface simple while making it visually memorable.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Aceternity UI Integration](#aceternity-ui-integration)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Content Organization](#content-organization)
- [Complete Resource Catalog](#complete-resource-catalog)
- [Detailed Project & Study Roadmap](#detailed-project--study-roadmap)
- [Accessibility & Design Principles](#accessibility--design-principles)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a curated, searchable, and well-organized collection of the best free and high-quality resources for Web Development interview preparation. It covers every major area that appears in real interviews at companies of all sizes — from junior frontend roles to senior full-stack and system design positions.

The application is fully bilingual. Users can switch between English and Persian at any time. The interface respects right-to-left layout for Persian, uses proper typography, and keeps navigation, search, and filtering intuitive in both languages.

All resources listed in the source material have been included without omission. They are grouped by topic, annotated with short descriptions where useful, and presented in a clean, scannable format so candidates can quickly find the most relevant material for their current focus.

---

## Features

- **Bilingual interface** — English and Persian with seamless language switching and correct RTL support for Persian.
- **Dark mode / Light mode** — System preference detection + manual toggle. Smooth transitions and carefully chosen contrast ratios in both themes.
- **High accessibility** — Semantic HTML, proper heading hierarchy, full keyboard navigation, focus management, ARIA where needed, and WCAG AA+ color contrast.
- **Clean yet attractive design** — Minimal visual noise, generous spacing, excellent typography hierarchy, subtle micro-interactions, and a calm color system that works equally well in light and dark mode.
- **Categorized resource library** — Every major interview topic has its own dedicated section with clear visual grouping.
- **Powerful search & filtering** — Instantly find resources by technology, difficulty level, content type (handbook, question bank, official docs, practice platform), or language.
- **Progress-friendly layout** — Built-in study roadmap, suggested order of topics, and space for future progress tracking.
- **Mobile-first responsive design** — Excellent experience on phones, tablets, and large desktop screens.
- **Fast and modern architecture** — Next.js App Router, Server Components where beneficial, and optimized client components for interactive parts.
- **Aceternity UI ready** — Designed from the start to accept beautiful free components from Aceternity UI without fighting the base design system.

---

## Tech Stack

| Layer              | Technology                                 |
| ------------------ | ------------------------------------------ |
| Framework          | Next.js (App Router)                       |
| Language           | TypeScript                                 |
| Styling            | Tailwind CSS + shadcn/ui                   |
| Theming            | next-themes (dark / light / system)        |
| UI Components      | shadcn/ui                                  |
| Visual Enhancement | [Aceternity UI](https://ui.aceternity.com) |
| Icons              | Lucide React                               |
| Fonts              | Inter (Latin) + Vazirmatn (Persian)        |
| Deployment         | Vercel (recommended)                       |

### Why shadcn/ui + Aceternity UI?

**shadcn/ui** provides accessible, high-quality primitives that you fully own. You get excellent defaults for buttons, cards, dialogs, tabs, forms, and navigation while keeping complete control over styling.

**Aceternity UI** adds the delightful layer on top: animated backgrounds, spotlight cards, infinite moving cards, timelines, floating navbars, 3D card effects, and other free components that make a learning platform feel modern and engaging without adding complexity or heavy dependencies.

Together they create a design that is simple, fast, accessible, and visually memorable.

---

## Aceternity UI Integration

[Aceternity UI](https://ui.aceternity.com) is a collection of free, high-quality React and Next.js components built with Tailwind CSS and Framer Motion. It is the recommended way to elevate the visual quality of this project while staying true to the “simple yet attractive” design philosophy.

### Why Aceternity UI fits this project

- Completely free components
- Built for Next.js and React
- Uses the same Tailwind CSS foundation as shadcn/ui
- Excellent dark mode support
- Lightweight and performance-conscious when used selectively
- Perfect for creating memorable learning experiences without overwhelming the user

### Recommended components for this project

| Component                              | Suggested Use Case                                |
| -------------------------------------- | ------------------------------------------------- |
| Background Beams / Background Gradient | Hero section and category landing pages           |
| Spotlight Card / 3D Card Effect        | Individual resource cards                         |
| Infinite Moving Cards                  | Featured resources or “popular this week” section |
| Timeline                               | Study roadmap visualization                       |
| Floating Navbar / Dock                 | Main navigation                                   |
| Text Generate Effect / Typewriter      | Hero headline animation                           |
| Bento Grid                             | Overview of main topic categories                 |
| Hover Effect Cards                     | Technology or difficulty level filters            |
| Moving Border / Border Beam            | Call-to-action buttons and featured items         |
| Sticky Scroll / Reveal Animations      | Long content sections and roadmap steps           |

### Integration guidelines

1. Install only the components you actually use.
2. Keep the base design system (colors, spacing, typography) driven by shadcn/ui and Tailwind config.
3. Prefer subtle animations. Avoid motion that distracts from reading content.
4. Always test components in both light and dark mode and with reduced-motion preferences.
5. Place Aceternity components under `components/aceternity/` so they stay clearly separated from core shadcn primitives.
6. For Persian (RTL) layout, verify that animated elements and cards still align correctly.

### Quick start with Aceternity UI

```bash
# Most Aceternity components can be copied directly.
# Some require framer-motion:
pnpm add framer-motion
# or
npm install framer-motion
```

Then visit [ui.aceternity.com](https://ui.aceternity.com), choose a free component, and follow the installation instructions shown on the component page. Most components are copy-paste friendly and work immediately with a standard Next.js + Tailwind setup.

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm / npm / yarn / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/web-dev-interview-prep.git
cd web-dev-interview-prep

# Install dependencies
pnpm install
# or
npm install

# Start the development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
web-dev-interview-prep/
├── app/
│   ├── [locale]/                 # en / fa
│   │   ├── page.tsx               # Home / dashboard
│   │   ├── resources/
│   │   │   └── [category]/
│   │   ├── roadmap/
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                        # shadcn components
│   ├── aceternity/                # optional Aceternity components
│   ├── language-switcher.tsx
│   ├── theme-toggle.tsx
│   ├── resource-card.tsx
│   ├── search.tsx
│   └── ...
├── content/
│   ├── resources/                 # Markdown or JSON data for all resources
│   └── roadmap/
├── lib/
│   ├── i18n.ts
│   └── utils.ts
├── public/
└── ...
```

Content is stored in a structured, easy-to-extend format so new resources can be added without touching the UI layer.

---

## Content Organization

Resources are grouped into the following top-level categories. Every item from the original source lists has been preserved and placed in the most logical section.

1. Comprehensive Interview Preparation
2. HTML, CSS & Web Fundamentals
3. JavaScript & TypeScript
4. React, Next.js & Frontend Frameworks
5. Frontend System Design & UI Practice
6. Backend, Node.js & APIs
7. Databases & SQL
8. Algorithms & Data Structures
9. System Design & Software Architecture
10. Web Security
11. Testing, Debugging & Code Quality
12. Performance, Accessibility & SEO
13. DevOps, Cloud & CI/CD
14. Behavioral Interview & Company-Specific Prep
15. Additional Learning Paths & Practice Platforms
16. Question Banks with Answers (English & Persian)

---

## Complete Resource Catalog

### 1. Comprehensive Interview Preparation

| Resource                                                 | Link / Notes                                                                  |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Front End Interview Handbook                             | frontendinterviewhandbook.com / GitHub: yangshun/front-end-interview-handbook |
| Frontend Interview Prep                                  | frontend-interview.com                                                        |
| GreatFrontEnd                                            | greatfrontend.com                                                             |
| FrontPrep                                                | frontprep.com                                                                 |
| Tech Interview Handbook                                  | techinterviewhandbook.org                                                     |
| Frontend Learning Kit                                    | GitHub                                                                        |
| Frontend Interview Questions (open source)               | GitHub                                                                        |
| Real-World Frontend Interview Handbook                   | Leanpub                                                                       |
| Roadmap.sh                                               | roadmap.sh                                                                    |
| freeCodeCamp                                             | freecodecamp.org                                                              |
| Best Resources to Learn Frontend Development             | greatfrontend.com/blog/best-resources-to-learn-frontend-development           |
| The Web Developer Interview Prep Guide (Coursera)        | coursera.org/resources/web-development-interview-prep-guide                   |
| Guide To Clear Front-End Developer Interview             | Goodreads                                                                     |
| Top 5 Courses to Crack Frontend Web Developer Interviews | javarevisited.blogspot.com                                                    |
| Web Development Interview Questions & Resources          | GitHub: wowgeekyboy/Web-Development-Interview                                 |
| Interview Questions for Developers                       | GitHub: valakhosravi/Interview-Questions-Answers                              |
| Frontend Interview Questions — 100+                      | GitHub: readytodev-pro/frontend-interview-questions                           |
| Frontend Interview Handbook — 3000+                      | GitHub: sumitsingh4411/frontend-interview-questions                           |
| Frontend Interview Mastery                               | GitHub: goswamikaushik/frontend-interview-mastery                             |
| Top 200+ Frontend Interview Questions                    | GitHub: Devtools-Tech-Team/front-end-interview-questions                      |
| h5bp — Front-end Developer Interview Questions           | GitHub: h5bp/Front-end-Developer-Interview-Questions                          |
| Frontend JavaScript Interview Questions — Answers        | GitHub: bcherny/frontend-interview-questions                                  |
| Frontend Developer Interview Preparation                 | GitHub (company & startup questions)                                          |
| Frontend Interview Questions — Yauhen Kavalchuk          | GitHub (multi-technology)                                                     |

### 2. HTML, CSS & Web Fundamentals

| Resource                                   | Link / Notes                                           |
| ------------------------------------------ | ------------------------------------------------------ |
| MDN Web Docs                               | developer.mozilla.org                                  |
| MDN — HTML Reference                       | developer.mozilla.org                                  |
| MDN — CSS Reference                        | developer.mozilla.org                                  |
| MDN — Web APIs                             | developer.mozilla.org                                  |
| web.dev                                    | web.dev                                                |
| Learn HTML — web.dev                       | web.dev/learn/html                                     |
| Learn CSS — web.dev                        | web.dev/learn/css                                      |
| CSS-Tricks                                 | css-tricks.com                                         |
| Flexbox Froggy                             | flexboxfroggy.com                                      |
| Grid Garden                                | cssgridgarden.com                                      |
| HTML Living Standard                       | html.spec.whatwg.org                                   |
| CSS Specifications — W3C                   | w3.org/Style/CSS                                       |
| CSS Interview Questions and Answers        | golinuxcloud.com/css-interview-questions               |
| 400+ CSS Interview Questions Practice Test | Udemy (paid)                                           |
| MDN Learn web development                  | developer.mozilla.org/en-US/docs/Learn_web_development |

### 3. JavaScript & TypeScript

| Resource                                                 | Link / Notes                             |
| -------------------------------------------------------- | ---------------------------------------- |
| JavaScript.info                                          | javascript.info                          |
| MDN — JavaScript Guide                                   | developer.mozilla.org                    |
| MDN — JavaScript Reference                               | developer.mozilla.org                    |
| You Don't Know JS Yet                                    | GitHub: getify/You-Dont-Know-JS          |
| Eloquent JavaScript                                      | eloquentjavascript.net                   |
| TypeScript Handbook                                      | typescriptlang.org                       |
| TypeScript Playground                                    | typescriptlang.org/play                  |
| Type Challenges                                          | GitHub                                   |
| 33 JS Concepts                                           | GitHub: leonardomso/33-js-concepts       |
| JavaScript Questions                                     | GitHub: lydiahallie/javascript-questions |
| JavaScript Algorithms and Data Structures                | GitHub                                   |
| javascript-interview-questions (sudheerj)                | GitHub — ~1000 questions                 |
| JavaScript Quiz Interview Questions (GreatFrontEnd)      | greatfrontend.com                        |
| Awesome-JavaScript-Interviews                            | GitHub: rohan-paul                       |
| fe-interview                                             | GitHub: haizlin                          |
| ۲۰۰ سوال مصاحبه جاوااسکریپت (فارسی)                      | virgool.io                               |
| javascript-persian-interview-questions                   | GitHub: Mariotek                         |
| JavaScript Interview Resources and Practice (NamasteDev) | namastedev.com                           |
| 10 GitHub Repositories to Achieve JavaScript Mastery     | dev.to                                   |

### 4. React, Next.js & Frontend Frameworks

| Resource                                  | Link / Notes            |
| ----------------------------------------- | ----------------------- |
| React — Official Docs                     | react.dev               |
| React — Learn                             | react.dev/learn         |
| React — Reference                         | react.dev/reference     |
| React TypeScript Cheatsheets              | GitHub                  |
| Next.js Documentation                     | nextjs.org/docs         |
| Next.js Learn                             | nextjs.org/learn        |
| Vue.js Documentation                      | vuejs.org               |
| Angular Documentation                     | angular.dev             |
| Svelte Documentation                      | svelte.dev              |
| Redux Toolkit                             | redux-toolkit.js.org    |
| Zustand                                   | GitHub                  |
| TanStack Query                            | tanstack.com/query      |
| React Interview Playbook                  | greatfrontend.com       |
| 100+ React Interview Questions            | greatfrontend.com       |
| React Quiz Interview Questions            | greatfrontend.com       |
| reactjs-interview-questions (sudheerj)    | GitHub — 500+ questions |
| بزرگ‌ترین لیست سوالات مصاحبه ریکت (فارسی) | virgool.io              |
| reactjs-persian-interview-questions       | GitHub: Mariotek        |
| vuejs-interview-questions                 | GitHub: sudheerj        |
| angular-persian-interview-questions       | GitHub: Mariotek        |
| vuejs-persian-interview-questions         | GitHub: Mariotek        |

### 5. Frontend System Design & UI Practice

| Resource                                       | Link / Notes                    |
| ---------------------------------------------- | ------------------------------- |
| GreatFrontEnd — Frontend System Design         | greatfrontend.com               |
| Frontend Interview Handbook — System Design    | frontendinterviewhandbook.com   |
| Frontend Interview Prep — System Design        | frontend-interview.com          |
| FrontendAtlas                                  | frontendatlas.com               |
| DOM Challenge                                  | GitHub                          |
| Frontend Mentor                                | frontendmentor.io               |
| Frontend Mini Challenges                       | GitHub                          |
| UI.dev                                         | ui.dev                          |
| Frontend Interview Prep — Machine Coding       | frontend-interview.com / GitHub |
| GreatFrontEnd — JavaScript DSA & UI Challenges | greatfrontend.com               |

**Recommended practice topics:**
Autocomplete, data tables with sorting/filtering, pagination, infinite scroll, accessible modals & dialogs, complex multi-step forms, notification systems, loading/error/empty states, virtualized lists, drag-and-drop interfaces, and real-time collaborative UI patterns.

### 6. Backend, Node.js & APIs

| Resource                                                  | Link / Notes                                  |
| --------------------------------------------------------- | --------------------------------------------- |
| Node.js Documentation                                     | nodejs.org/docs                               |
| Node.js Learn                                             | nodejs.org/en/learn                           |
| Express.js                                                | expressjs.com                                 |
| NestJS                                                    | docs.nestjs.com                               |
| Fastify                                                   | fastify.dev                                   |
| HTTP — MDN                                                | developer.mozilla.org                         |
| HTTP Semantics — RFC 9110                                 | RFC Editor                                    |
| REST API Tutorial                                         | restfulapi.net                                |
| OpenAPI Specification                                     | spec.openapis.org                             |
| GraphQL Documentation                                     | graphql.org                                   |
| Apollo GraphQL                                            | apollographql.com/docs                        |
| WebSockets — MDN                                          | developer.mozilla.org                         |
| Postman Learning Center                                   | learning.postman.com                          |
| Backend Interview Prep Beyond LeetCode                    | dev.to                                        |
| How to prepare for a Node.js developer interview          | educative.io                                  |
| Backend Developer Interview Questions & Preparation Guide | hackajob.com                                  |
| 1500 Back End Web Developer Interview Questions           | Udemy (paid)                                  |
| nodejs-interview-questions (sudheerj)                     | GitHub                                        |
| Backend Interview Questions & Answers                     | GitHub: AS-Backend-Institute                  |
| 100 Backend Interview Questions                           | GitHub                                        |
| Senior Node.js Backend Interview Guide                    | GitHub                                        |
| roadmap.sh — Backend Questions                            | roadmap.sh/questions/backend                  |
| Web Development Interview (Full-Stack)                    | GitHub: wowgeekyboy/Web-Development-Interview |
| Node.js & SQL Interview Roadmap                           | GitHub Gist                                   |

### 7. Databases & SQL

| Resource                               | Link / Notes                      |
| -------------------------------------- | --------------------------------- |
| PostgreSQL Documentation               | postgresql.org/docs               |
| SQLBolt                                | sqlbolt.com                       |
| Use The Index, Luke!                   | use-the-index-luke.com            |
| MySQL Documentation                    | dev.mysql.com/doc                 |
| MongoDB University                     | learn.mongodb.com                 |
| MongoDB Documentation                  | mongodb.com/docs                  |
| Redis Documentation                    | redis.io/docs                     |
| Prisma Documentation                   | prisma.io/docs                    |
| Neon Documentation                     | neon.tech/docs                    |
| Supabase Documentation                 | supabase.com/docs                 |
| LeetCode SQL 50                        | leetcode.com/studyplan/top-sql-50 |
| SQL Interview Questions — InterviewBit | InterviewBit                      |
| PostgreSQL Interview Questions         | InterviewBit                      |
| MongoDB Interview Questions            | GeeksforGeeks                     |
| SQL for Interviews                     | GitHub                            |

### 8. Algorithms & Data Structures

| Resource                         | Link / Notes              |
| -------------------------------- | ------------------------- |
| LeetCode                         | leetcode.com              |
| NeetCode                         | neetcode.io               |
| NeetCode Roadmap                 | neetcode.io/roadmap       |
| Tech Interview Handbook — Coding | techinterviewhandbook.org |
| Blind 75                         | Tech Interview Handbook   |
| Grind 75                         | grind75.com               |
| HackerRank                       | hackerrank.com            |
| CodeSignal                       | codesignal.com            |
| Codewars                         | codewars.com              |
| Exercism                         | exercism.org              |
| VisuAlgo                         | visualgo.net              |
| The Algorithms                   | GitHub                    |
| Great Frontend — JavaScript DSA  | greatfrontend.com         |

### 9. System Design & Software Architecture

| Resource                                                           | Link / Notes                             |
| ------------------------------------------------------------------ | ---------------------------------------- |
| System Design Primer                                               | GitHub: donnemartin/system-design-primer |
| Tech Interview Handbook — System Design                            | techinterviewhandbook.org                |
| System Design Interview resources                                  | System Design Handbook                   |
| ByteByteGo                                                         | bytebytego.com                           |
| Design Gurus                                                       | designgurus.io                           |
| Educative                                                          | educative.io                             |
| System Design Primer — summaries                                   | GitHub                                   |
| High Scalability                                                   | highscalability.com                      |
| AWS Well-Architected                                               | AWS                                      |
| Google Cloud Architecture Framework                                | Google Cloud                             |
| system-design-resources (InterviewReady)                           | GitHub                                   |
| best-system-design-resources                                       | GitHub                                   |
| The Best System Design Resources in 2026                           | educative.io                             |
| Best resources for grokking system design                          | designgurus.io                           |
| Top 20 System Design Interview Resources                           | javarevisited.blogspot.com               |
| System Design Interview Questions — 500+                           | GitHub                                   |
| System Design — Question & Solution                                | GitHub                                   |
| ByteByteGo System Design 101                                       | GitHub: ByteByteGoHq/system-design-101   |
| system-design-resources (InterviewReady)                           | GitHub                                   |
| best-system-design-resources                                       | GitHub                                   |
| The Best System Design Resources in 2026                           | educative.io                             |
| Best resources, books, and study guides for grokking system design | designgurus.io                           |
| Top 20 System Design Interview Resources                           | javarevisited.blogspot.com               |

### 10. Web Security

| Resource                         | Link / Notes                     |
| -------------------------------- | -------------------------------- |
| OWASP Top 10                     | owasp.org                        |
| OWASP Web Security Testing Guide | OWASP WSTG                       |
| PortSwigger Web Security Academy | portswigger.net/web-security     |
| MDN — Web Security               | developer.mozilla.org            |
| MDN — CORS                       | developer.mozilla.org            |
| Content Security Policy          | MDN CSP                          |
| Authentication — OWASP           | OWASP Authentication Cheat Sheet |
| JWT                              | jwt.io                           |
| OAuth 2.0 — RFC 6749             | RFC Editor                       |
| Web Security Academy Labs        | PortSwigger Labs                 |

### 11. Testing, Debugging & Code Quality

| Resource                  | Link / Notes                       |
| ------------------------- | ---------------------------------- |
| Testing Library           | testing-library.com                |
| Jest                      | jestjs.io                          |
| Vitest                    | vitest.dev                         |
| Playwright                | playwright.dev                     |
| Cypress                   | cypress.io                         |
| Storybook                 | storybook.js.org                   |
| MSW — Mock Service Worker | mswjs.io                           |
| Chrome DevTools           | developer.chrome.com/docs/devtools |
| ESLint                    | eslint.org                         |
| Prettier                  | prettier.io                        |

### 12. Performance, Accessibility & SEO

| Resource                                    | Link / Notes                         |
| ------------------------------------------- | ------------------------------------ |
| web.dev — Performance                       | web.dev                              |
| PageSpeed Insights                          | pagespeed.web.dev                    |
| Lighthouse                                  | developer.chrome.com/docs/lighthouse |
| Core Web Vitals                             | web.dev                              |
| Web Accessibility Initiative                | W3C WAI                              |
| WCAG Guidelines                             | W3C WCAG                             |
| WAI-ARIA Authoring Practices                | W3C APG                              |
| Google Search Central                       | developers.google.com/search         |
| Search Engine Optimization Starter Guide    | Google                               |
| web.dev Learn (Performance & Accessibility) | web.dev/learn                        |

### 13. DevOps, Cloud & CI/CD

| Resource                 | Link / Notes                      |
| ------------------------ | --------------------------------- |
| Docker Documentation     | docs.docker.com                   |
| GitHub Actions           | docs.github.com/actions           |
| Git Documentation        | git-scm.com/doc                   |
| GitHub Skills            | skills.github.com                 |
| Kubernetes Documentation | kubernetes.io/docs                |
| AWS Skill Builder        | skillbuilder.aws                  |
| Microsoft Learn — Azure  | learn.microsoft.com               |
| Google Cloud Skills      | cloudskillsboost.google           |
| Terraform Documentation  | developer.hashicorp.com/terraform |
| Vercel Documentation     | vercel.com/docs                   |
| Netlify Documentation    | docs.netlify.com                  |

### 14. Behavioral Interview & Company-Specific Prep

| Resource                                 | Link / Notes                  |
| ---------------------------------------- | ----------------------------- |
| Tech Interview Handbook                  | techinterviewhandbook.org     |
| Amazon Interview Preparation             | amazon.jobs                   |
| Google Careers — Interviewing            | Google Careers                |
| Microsoft Careers — Interview Tips       | Microsoft Careers             |
| Meta Careers                             | Meta Careers                  |
| STAR Method — Indeed Career Guide        | indeed.com                    |
| Glassdoor Interview Questions            | glassdoor.com                 |
| Levels.fyi                               | levels.fyi                    |
| Interview Rounds                         | GitHub                        |
| FrontendFreaks                           | GitHub                        |
| Frontend Interview Handbook — Airbnb     | frontendinterviewhandbook.com |
| GreatFrontEnd — Airbnb                   | greatfrontend.com             |
| Frontend Interview Prep — Company Guides | GitHub                        |

### 15. Additional Learning Paths & Practice Platforms

| Resource                                | Link / Notes       |
| --------------------------------------- | ------------------ |
| The Odin Project                        | theodinproject.com |
| Full Stack Open                         | fullstackopen.com  |
| Microsoft Web Development for Beginners | GitHub             |
| roadmap.sh — Frontend                   | roadmap.sh         |
| roadmap.sh — Backend                    | roadmap.sh         |
| roadmap.sh — Full Stack                 | roadmap.sh         |
| roadmap.sh — JavaScript                 | roadmap.sh         |
| roadmap.sh — React                      | roadmap.sh         |
| roadmap.sh — Node.js                    | roadmap.sh         |
| GitHub Explore                          | github.com/explore |

### 16. Question Banks with Answers (Selected Highlights)

**JavaScript**

- sudheerj/javascript-interview-questions (~1000 questions)
- GreatFrontEnd JavaScript Quiz Interview Questions
- Awesome-JavaScript-Interviews (rohan-paul)
- lydiahallie/javascript-questions (output-based)
- fe-interview (haizlin)
- ۲۰۰ سوال مصاحبه جاوااسکریپت (فارسی) — virgool.io
- javascript-persian-interview-questions (Mariotek)
- JavaScript Interview Resources and Practice (NamasteDev)
- 14 GitHub Repositories to Ace Your JavaScript Interviews (dev.to roundup)

**React**

- sudheerj/reactjs-interview-questions (500+)
- GreatFrontEnd — 100+ React Interview Questions
- React Quiz Interview Questions (GreatFrontEnd)
- React Interview Playbook (GreatFrontEnd)
- بزرگ‌ترین لیست سوالات مصاحبه ریکت، ۵۰۰ سوال (فارسی)
- reactjs-persian-interview-questions (Mariotek)
- 50 React Interview Questions (quick review)

**Frontend General**

- readytodev-pro/frontend-interview-questions (100+ with full answers)
- sumitsingh4411/frontend-interview-questions (3000+)
- goswamikaushik/frontend-interview-mastery (500+ real questions + coding)
- Devtools-Tech-Team/front-end-interview-questions (200+)
- h5bp/Front-end-Developer-Interview-Questions (classic list)
- bcherny/frontend-interview-questions (JS answers)
- frontendi.com — ۴۰۰ سوال مصاحبه فرانت‌اند (فارسی)
- job.faradars.org — راهنمای مصاحبه فرانت‌اند
- Frontend Interview Questions — Yauhen Kavalchuk

**Vue / Angular / Node.js**

- vuejs-interview-questions (sudheerj — 300+)
- nodejs-interview-questions (sudheerj)
- angular-persian-interview-questions (Mariotek)
- vuejs-persian-interview-questions (Mariotek)

**Backend & Full-Stack**

- AS-Backend-Institute/backend-interview-questions
- wowgeekyboy/Web-Development-Interview
- valakhosravi/Interview-Questions-Answers
- Backend Developer Interview Questions (hackajob)
- roadmap.sh/questions/backend

**SQL & Databases**

- LeetCode SQL 50
- SQL for Interviews (GitHub)
- SQLBolt
- InterviewBit SQL & PostgreSQL questions
- MongoDB Interview Questions (GeeksforGeeks)

**System Design**

- donnemartin/system-design-primer
- System Design Interview Questions — 500+
- System Design — Question & Solution repositories
- ByteByteGo System Design 101
- Frontend System Design resources (GreatFrontEnd + Frontend Interview Prep)

**Company Experience Reports**

- Interview Rounds (GitHub)
- FrontendFreaks
- Frontend Interview Handbook — company sections (Airbnb and others)
- GreatFrontEnd company guides
- Frontend Interview Prep — Company Guides (Google, Meta, Amazon, Netflix, Stripe, etc.)

---

## Detailed Project & Study Roadmap

This section contains two complementary roadmaps:

1. **Product Roadmap** — how the application itself can evolve.
2. **Interview Preparation Roadmap** — a practical study path for candidates.

---

### 1. Product Roadmap (Application Development)

#### Phase 1 — Foundation (Current)

- Next.js App Router + TypeScript setup
- shadcn/ui design system + dark/light mode
- Bilingual support (English / Persian) with correct RTL
- Core resource catalog with all categories
- Basic search and category filtering
- Responsive layout and accessibility baseline
- Aceternity UI integration points prepared

#### Phase 2 — Content Experience

- Advanced search with filters (technology, difficulty, free/paid, language)
- Resource detail pages with descriptions, tags, and related links
- Bookmark / save-for-later functionality
- Progress tracking (mark resources as “Studied” / “In Progress”)
- Study roadmap visualization (using Aceternity Timeline component)
- Personalized “Suggested next resources” based on selected focus area

#### Phase 3 — Practice Layer

- Curated question sets extracted from the best question banks
- Daily challenge mode (one theory question + one coding prompt)
- Frontend machine-coding challenges (autocomplete, data table, etc.)
- Spaced-repetition mode for important concepts
- Simple note-taking per resource

#### Phase 4 — Community & Polish

- Contribution system for adding new high-quality resources
- User feedback on resource quality and difficulty
- Improved Persian content coverage and orthography checks
- Performance optimization and Core Web Vitals excellence
- Optional user accounts (via NextAuth or similar) for syncing progress

---

### 2. Interview Preparation Roadmap (For Candidates)

You do not need to finish every resource. Follow this progressive path according to your target role and experience level.

#### Stage 0 — Orientation (1–2 days)

- Read the Front End Interview Handbook overview
- Skim Tech Interview Handbook
- Choose your main target: Frontend / Backend / Full-Stack
- Set a realistic timeline (4–12 weeks depending on experience)

#### Stage 1 — Solid Fundamentals (1–2 weeks)

**Primary resources**

- MDN Web Docs (HTML, CSS, JavaScript, Web APIs)
- JavaScript.info
- web.dev Learn (HTML + CSS)
- Flexbox Froggy + Grid Garden

**Goals**

- Understand the browser, DOM, CSS layout, and core JavaScript deeply
- Be comfortable explaining how the web works end-to-end

#### Stage 2 — Interview-Focused Frontend Core (2–3 weeks)

**Primary resources**

- Front End Interview Handbook
- Frontend Interview Prep
- GreatFrontEnd (free sections)
- 33 JS Concepts
- You Don’t Know JS (selected books)
- sudheerj/javascript-interview-questions
- lydiahallie/javascript-questions

**Goals**

- Master common trivia and conceptual questions
- Practice explaining closures, prototypes, event loop, this, promises, etc.
- Solve output-based JavaScript questions daily

#### Stage 3 — Framework Mastery (React + Next.js) (2–4 weeks)

**Primary resources**

- Official React docs (Learn + Reference)
- Official Next.js docs + Next.js Learn
- GreatFrontEnd React Interview Playbook
- sudheerj/reactjs-interview-questions
- React TypeScript Cheatsheets
- TanStack Query + Zustand or Redux Toolkit (as needed)

**Goals**

- Deep understanding of hooks, rendering, state management, performance
- Ability to implement common UI patterns and discuss trade-offs
- Comfort with Server Components and modern Next.js patterns

#### Stage 4 — Coding & Machine Coding Practice (Ongoing)

**Primary resources**

- NeetCode (Roadmap + Blind 75 / Grind 75)
- LeetCode
- GreatFrontEnd JavaScript DSA
- Frontend Mentor + Frontend Mini Challenges
- DOM Challenge repositories

**Goals**

- Consistent problem-solving rhythm
- Ability to implement clean, production-like UI under time pressure
- Strong command of common data structures and algorithms in JavaScript

#### Stage 5 — Backend, Databases & APIs (2–3 weeks for Full-Stack)

**Primary resources**

- Node.js official documentation + Learn section
- Express / NestJS / Fastify docs
- PostgreSQL docs + SQLBolt + Use The Index, Luke!
- MongoDB University (if relevant)
- Backend interview question banks (AS-Backend-Institute, sudheerj/nodejs-interview-questions, roadmap.sh backend questions)

**Goals**

- Design simple REST/GraphQL APIs
- Understand authentication, sessions, JWT, and basic security
- Write efficient SQL and understand indexing

#### Stage 6 — System Design & Architecture (2–4 weeks for Mid/Senior)

**Primary resources**

- System Design Primer (donnemartin)
- ByteByteGo + system-design-101
- Tech Interview Handbook System Design section
- GreatFrontEnd Frontend System Design
- Design Gurus / Educative (selected)

**Goals**

- Ability to design scalable frontend and full-stack systems
- Practice common problems: URL shortener, news feed, chat, autocomplete, data grids, etc.
- Communicate trade-offs clearly (consistency, caching, availability, latency)

#### Stage 7 — Security, Testing, Performance & Quality

**Primary resources**

- OWASP Top 10 + PortSwigger Web Security Academy
- Testing Library + Playwright / Cypress
- web.dev Performance + Core Web Vitals
- WCAG + WAI-ARIA practices
- Lighthouse + PageSpeed Insights

**Goals**

- Recognize and prevent common web vulnerabilities
- Write meaningful tests
- Optimize loading, interactivity, and accessibility

#### Stage 8 — Behavioral & Company-Specific Preparation

**Primary resources**

- Tech Interview Handbook (Behavioral)
- STAR method guides
- Company career pages (Google, Amazon, Meta, Microsoft, etc.)
- Glassdoor + Levels.fyi
- Interview experience repositories

**Goals**

- Prepare strong stories using the STAR framework
- Research target companies and common interview formats
- Practice mock interviews

---

### Suggested Weekly Rhythm

| Day       | Focus                                    | Time Suggestion |
| --------- | ---------------------------------------- | --------------- |
| Mon–Fri   | Theory questions + 1 coding problem      | 1.5–3 hours     |
| Weekend 1 | System design or machine-coding practice | 2–4 hours       |
| Weekend 2 | Review weak areas + mock interview       | 2–3 hours       |

Adjust intensity based on how close you are to real interviews.

---

### Role-Specific Focus Paths

**Junior Frontend**
Stages 1 → 2 → 3 → 4 (light algorithms) → 8

**Mid-level Frontend / React**
Stages 1–4 fully + Stage 6 (Frontend System Design) + Stage 7 + Stage 8

**Full-Stack (Node.js)**
All stages, with extra depth on Stage 5 and Stage 6

**Senior / Staff**
Heavy emphasis on Stages 6, 7, and 8 + deep knowledge of architecture and trade-offs

---

## Accessibility & Design Principles

### Accessibility First

- Semantic HTML5 elements and proper landmark regions (`header`, `nav`, `main`, `aside`, `footer`)
- Full keyboard navigation support and clearly visible focus indicators in both light and dark themes
- WCAG 2.2 AA (or better) color contrast ratios for text and interactive elements
- Respect for `prefers-reduced-motion` — animations are disabled or simplified when requested
- Correct `lang` attribute on the document and language switching that updates the attribute
- Complete Right-to-Left (RTL) support when Persian is active, including layout mirroring and logical properties
- No information is conveyed by color alone — icons, text labels, and patterns are used as well
- Screen-reader friendly structure with meaningful ARIA labels only where necessary
- Sufficient touch target sizes on mobile (minimum 44×44 px)

### Visual Design Philosophy

The interface follows a **“calm, content-first, quietly delightful”** approach:

- **Clarity over decoration** — generous whitespace, clear hierarchy, and readable typography come first.
- **Consistent design system** — built on shadcn/ui tokens so spacing, radii, colors, and typography stay coherent.
- **Dual-theme excellence** — both light and dark modes are carefully tuned for comfort during long study sessions.
- **Subtle motion** — micro-interactions and page transitions feel responsive without becoming distracting.
- **Bilingual by design** — typography (Inter + Vazirmatn), spacing, and component layouts are tested in both LTR and RTL.
- **Performance-aware aesthetics** — skeleton loaders, optimized images, and minimal cumulative layout shift.

### Role of Aceternity UI

Aceternity UI is used as a selective enhancement layer, not as the foundation:

| Area               | Recommended Aceternity Components          | Purpose                                 |
| ------------------ | ------------------------------------------ | --------------------------------------- |
| Hero / Landing     | Background Beams, Text Generate, Spotlight | Strong first impression without clutter |
| Resource Cards     | 3D Card, Hover Effect, Moving Border       | Make browsing resources more engaging   |
| Study Roadmap      | Timeline, Sticky Scroll                    | Visual progress and stage overview      |
| Featured / Popular | Infinite Moving Cards, Bento Grid          | Highlight curated content               |
| Navigation         | Floating Navbar / Dock                     | Modern, space-efficient navigation      |
| Calls to Action    | Border Beam, Animated Buttons              | Gentle emphasis on important actions    |

All animations respect `prefers-reduced-motion`. Components are imported only where they add clear value, keeping the overall bundle and cognitive load low.

### Typography & Color

- **Latin text**: Inter (excellent readability and variable font support)
- **Persian text**: Vazirmatn (modern, highly legible Persian typeface with multiple weights)
- Color system is defined via CSS variables so light/dark themes stay consistent
- Accent colors are used sparingly to guide attention rather than decorate every element

The final result should feel professional, calm, and inviting — a place where candidates can focus on learning rather than fighting the interface.

---

## Contributing

Contributions are welcome. Useful contributions include:

- Adding new high-quality resources (with short descriptions)
- Improving Persian translations and ensuring proper orthography (نیم‌فاصله, Persian digits in prose, correct ی/ک)
- Enhancing accessibility
- Improving search or filtering
- Adding new practice problems or study roadmaps
- Fixing bugs or improving performance

Please open an issue first for larger changes.

---

## License

This project is open source. Individual resources retain their original licenses. Always check the license of each linked repository or website before redistributing content.

---

## Final Notes

This README and the accompanying application aim to turn a large collection of scattered interview resources into a single, pleasant, bilingual learning environment. The goal is not to replace deep study of official documentation, but to give candidates a clear map and high-quality practice material so they can prepare efficiently and confidently.

Whether you are targeting a junior frontend role, a mid-level React position, a full-stack Node.js job, or a senior system design interview, the resources collected here cover the ground you need.

Start with the fundamentals, practice consistently, and use the question banks and system design materials to simulate real interview conditions.

Good luck with your interviews.
موفق باشید.

---

_Built with Next.js, shadcn/ui, and a strong preference for clarity, accessibility, and bilingual support. Enhanced visuals recommended via Aceternity UI._
