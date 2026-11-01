# Eventara — Event Planning Platform

[![Production Build](https://img.shields.io/badge/Production%20Build-Passing%20(Vite%206)-10B981?style=for-the-badge&logo=vite)](https://github.com/aaryaninvincible/utsav-ai)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Tailwind%20CSS-F59E0B?style=for-the-badge&logo=react)](https://react.dev)

---

## Overview

**Eventara** is an editorial celebration and event-planning web application designed to help hosts plan, organize, and manage unforgettable occasions — from royal heritage weddings and milestone birthdays to college festivals, cultural gatherings, and corporate galas.

It pairs an editorial luxury interface (supporting both **Dark Burgundy/Champagne** and **Warm Editorial Ivory Light Mode**) with practical planning tools including deterministic INR budget breakdowns, date-aware preparation milestones, vendor tracking, curated decor moodboards, and an interactive celebration calendar.

---

## Key Features

### 1. Editorial Experience & Dual Theme Support
- **Floating Frosted Navigation**: Quick access to Home, Events, Services, Inspiration Gallery, Calendar, and Theme Toggle.
- **Dark & Light Editorial Themes**: Seamless switching between the signature dark burgundy/charcoal palette (`#12090E`) and a warm ivory/rose-tinted light palette (`#FFF8F2`), persisted in `localStorage` (`utsav_theme`) with zero flash on load.
- **Event Categories**: Dedicated flows for Weddings, Birthday Parties, Corporate Events, College Fests, Festivals & Cultural Gatherings, Social Gatherings, and Custom Events.

### 2. Multi-Step Event Creation Wizard
- **Occasion Essentials**: Configure event title, celebration category, target date, and city.
- **Scale & Budget**: Set expected guest counts and total planned INR (`₹`) budget with configurable contingency reserves.
- **Style & Culinary Preferences**: Choose venue settings, dietary requirements (Pure Veg, Jain, Mixed, Vegan), and priority areas.

### 3. Smart Budget Planner
- **Deterministic INR Math**: Allocates budgets across core expense buckets (*Catering & Beverages, Venue Rental, Decor & Lighting, Photography, Entertainment, Attire, Logistics, and Contingency Reserve*) with exact client-side arithmetic.
- **Visual Analytics**: Interactive charts comparing planned allocations against committed spend.
- **Inline Variance Tracking**: Edit estimated and actual costs in real time with automatic reserve buffer isolation.

### 4. Timeline, Checklists & Vendor Discovery
- **Date-Aware Milestones**: Structured preparation phases from 90 days out down to the final 48 hours and event-day run-of-show.
- **Vendor Shortlist Matrix**: Track service categories across *To Research*, *Shortlisted*, *Contacted*, and *Confirmed* stages.
- **Curated Inspiration & Services**: Browse decor palettes, lighting concepts, and service tiers.

### 5. Interactive Celebration Calendar & 3D Ambience Preview
- **Date-Based Planning**: Select any calendar date to view upcoming festivals and auspicious windows or schedule a custom celebration.
- **3D WebGL Stage Lighting**: Interactive Three.js lighting and festive ambience visualizer.

### 6. Planning Concierge & Export
- **Guided Planning Assistant**: Provides structured planning suggestions for budgets, timelines, menus, and checklists (with clear guidance reminders to verify final vendor availability, pricing, and contracts directly).
- **Master Plan Export**: Clean print/PDF stylesheet and JSON backup export.

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite 6 |
| **Styling & Design System** | Tailwind CSS 3, CSS Custom Properties (`Cormorant Garamond` & `Manrope`) |
| **Icons & Visuals** | Lucide React, Three.js (`@react-three/fiber`), Recharts |
| **Testing** | Vitest |
| **State & Persistence** | LocalStorage with JSON import/export |

---

## Local Development

### Prerequisites
- Node.js **v18+** and `npm`

### 1. Clone the Repository
```bash
git clone https://github.com/aaryaninvincible/utsav-ai.git
cd utsav-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Run Tests & Production Build
```bash
npm test
npm run build
```

---

## Credits

Designed & developed by aaryaninvincible
