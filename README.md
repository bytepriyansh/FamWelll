# 🌱 FamWell – Family Mental Wellness SaaS Platform

## 🧠 What is FamWell?

**FamWell** is a next-gen mental wellness platform that transforms how families stay emotionally connected. It’s built as a fully-responsive, production-ready **SaaS platform** with an emphasis on design, real-time emotional tracking, AI nudges, privacy, and gamified wellness.

Think of it like Notion + Calm + Duolingo for your family’s mental health — all in one sleek UI.

---

## 💡 Key Features

### ✅ Auth & Onboarding
- Email/Password Sign Up + Log In
- Family Code-based Group Onboarding
- Role-based onboarding (Parent / Child / Grandparent)

### 🏠 Landing Page
- Hero section with tagline, call-to-action, and emotional design
- Features overview, trust highlights, testimonials
- Dark + Light Mode Toggle
- Mobile-first design

### 📊 Emotional Dashboard
- Mood tracking widgets (daily/weekly/monthly trends)
- AI-powered emotion detection (simulated for now)
- Dynamic Trust Graphs — see how connected your family is
- Emotion Logs per member
- Privacy toggles for each entry

### 🤖 AI Nudges (Hardcoded for now)
- Simulated emotional suggestions, like:
  > "It might be a good day for Dad to check in on Meena"
  > "Grandpa seems more withdrawn this week"
- Scheduled daily/weekly suggestions

### 📔 Journaling
- Each member has their own private journal
- Option to share selected entries with the family
- AI auto-tagging (e.g. “stress”, “happy”, “social”)

### 🛠 Admin Settings
- Create/manage family members
- Set privacy rules per member
- Manage nudge frequency and alert sensitivity

### 🧩 Gamified Wellness
- Kindness Leaderboard
- Daily check-in streaks
- Weekly challenges for empathy and communication

---

## 🎨 UI Stack

- **Framework:** Next.js 14 (via Vercel)
- **Component Library:** [ShadCN/UI](https://ui.shadcn.com)
- **Design Tooling:** TailwindCSS · Framer Motion · Lucide Icons
- **AI Simulation:** Gemini/GPT hardcoded JSON mock responses
- **Font:** Inter (with system fallback)

---

## 🧪 What's Working Now

- [x] Landing Page
- [x] Auth Flow (Login / Signup)
- [x] Role-based user onboarding
- [x] Dashboard with mock emotion data
- [x] Journals + Emotion Logs UI
- [x] AI Nudges UI (hardcoded but working!)
- [x] Trust Graph (Static + Dynamic)
- [x] Mobile & desktop responsive
- [x] Full Dark/Light theme switcher
- [x] Nav routing + protected pages (simulated)

---

## 🚧 What’s Coming Next

- [ ] Connect to real backend (Supabase/Firebase/Prisma + DB)
- [ ] Real-time AI nudges via Gemini/OpenAI API
- [ ] Full role-based access control
- [ ] Secure journaling encryption
- [ ] Push/email notifications
- [ ] Public launch with subscription model

---

## 🚀 Getting Started

1. Clone the repo
2. `npm install`
3. Run locally with `npm run dev`
4. Modify components in `/app` and UI elements in `/components`
5. Connect to your backend when ready

---

## 🤝 Hackathon-Ready

FamWell is being built for a hackathon, but it’s designed like a real SaaS product from the ground up. Every screen, transition, and feature is aimed at creating an app that’s never been seen before , combining mental health, family connection, and AI-driven personalization in one tool.

---
