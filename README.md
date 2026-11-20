# Ayomide Daniyan — Developer Portfolio

Production-grade developer portfolio built with **Vite**, **React**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

Design aesthetic: **"Swiss Hardware Studio"** — high-contrast obsidian matte canvas (`#09090B`), architectural hairlines (`rgba(255,255,255,0.08)`), International Orange accents (`#FF4D00`), Plus Jakarta Sans, Instrument Serif italic, and JetBrains Mono.

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
npm run build
```
Generates an optimized bundle in the `./dist` folder with split vendor chunks.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📁 Architecture & File Structure

```
ayomide-portfolio/
├── public/
│   └── guitar.html           # Embedded Canvas & Web Audio API synthesizer
├── src/
│   ├── components/
│   │   ├── TopBar.jsx         # Fixed precision navigation, Lagos WAT clock, ⌘K trigger
│   │   ├── Hero.jsx           # Editorial headline, GSAP reveals, device frame preview
│   │   ├── Works.jsx          # Asymmetric editorial grid of 5 flagship projects
│   │   ├── CaseStudyDrawer.jsx# Slide-in deep-dive panel with problem, architecture, stack
│   │   ├── Stack.jsx          # Swiss spec sheet (capabilities, tools, motion, data)
│   │   ├── Proof.jsx          # Bento grid: LASU Hackathon, GDG, TDD, Audio Easter Egg
│   │   ├── Contact.jsx        # Dual-track: Project brief builder & role inquiry
│   │   ├── Footer.jsx         # Restrained footer with live clock and social links
│   │   ├── CommandPalette.jsx # ⌘K keyboard spotlight navigation
│   │   ├── GuitarEasterEgg.jsx# Interactive modal running the audio engine
│   │   └── ui/
│   │       └── Toast.jsx      # Spring-animated clipboard feedback toast
│   ├── data/
│   │   └── portfolio.js       # SINGLE SOURCE OF TRUTH: edit all text/links here
│   ├── hooks/
│   │   └── useLagosTime.js    # Live Lagos (WAT) clock hook
│   ├── App.jsx                # Layout orchestration & state coordination
│   ├── index.css              # Tailored design system tokens & noise overlay
│   └── main.jsx               # React DOM entry point
├── index.html                 # Google Fonts preconnect & metadata
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ How to Update Your Information

All portfolio text, links, projects, and contact info live in a single centralized file:  
`src/data/portfolio.js`

### Adding Your Twitter / X Handle
Open `src/data/portfolio.js` and update:
```javascript
twitter: 'https://x.com/your_handle',
```

### Adding Project Live Links or Screenshots
Each project object in `PROJECTS` has:
- `live`: Deployment URL (e.g., `https://rawshare-two.vercel.app/` or `https://play-rave.vercel.app`)
- `github`: Repository link
- `decisions`: Key engineering choices displayed in the case study drawer

---

## 🎨 Design System Tokens

- **Canvas Background:** `#09090B` (obsidian with ~3.2% SVG fractal noise overlay)
- **Surfaces:** `#111114` (cards) → `#16161A` (hover elevation)
- **Primary Ink:** `#F4F3EF` (warm off-white)
- **Muted Ink:** `#8E8E9A` (metadata, labels, descriptions)
- **Accent:** `#FF4D00` (International Orange — active states, tags, primary CTAs)
- **Status Indicator:** `#22C55E` (pulsing dot for availability)
- **Hairlines:** `1px solid rgba(255, 255, 255, 0.08)`

---

## 🎸 Signature Feature: Kinetic Strings & Drums
Located in `public/guitar.html`, this 893-line zero-dependency audio synthesizer runs entirely on the browser's native **Canvas API** and **Web Audio API**:
- Physics-based damped string harmonic oscillator
- Standard guitar tuning (E2–E4)
- Live interactive musical staff notation
- Triggerable via the **Proof** section or **⌘K** command palette
