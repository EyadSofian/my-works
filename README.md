# Eyad Sofian — 3D Interactive Portfolio

An award-style, single-page 3D portfolio for **Eyad Sofian** — AI / NLP engineer &
automation architect. Built with React + Vite + TypeScript, React-Three-Fiber, GSAP,
Lenis smooth scroll, and Framer Motion.

- **Light + Dark themes** with a header toggle (defaults to the light/white theme).
- **Bilingual** English / Arabic with an RTL-aware toggle (English default).
- Animated **3D "liquid" orb** hero centerpiece, drifting particle field, accent ring,
  custom cursor, magnetic buttons, real-progress preloader, and a scroll-pinned hero.
- All content is data-driven from a single file — no copy lives in components.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | React 18 + Vite + TypeScript |
| 3D / WebGL | three.js, @react-three/fiber, @react-three/drei, postprocessing |
| Animation | GSAP (ScrollTrigger), Framer Motion |
| Smooth scroll | Lenis |
| Styling | Tailwind CSS (CSS-variable theme tokens) |
| Fonts | Archivo (display), Space Grotesk (body), JetBrains Mono, IBM Plex Sans Arabic |

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & preview

```bash
npm run build      # → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## Deploy (Vercel)

The repo includes `vercel.json` (framework: vite, SPA rewrites, asset caching).

- **Vercel dashboard:** import the repo — build command `npm run build`, output `dist`.
- **CLI:** `npm i -g vercel && vercel` (then `vercel --prod`).

Any static host works: serve the `dist/` folder.

## Where the content lives

Everything is typed in **`src/data/profile.ts`**:

- `hero`, `ticker`, `metrics`, `about` — headline, impact numbers, bio
- `experience[]` — roles, dates, highlights, tech chips
- `projects[]` — featured work (opens a detail modal); includes the
  **Arabic LLM Fine-tuning** project (LoRA / QLoRA, Unsloth, Google Colab)
- `skills[]` — grouped lanes incl. **AI & NLP** and **LLM Fine-tuning**
- `certs[]`, `contact`, `nav`, `ui` (bilingual UI strings)

Edit that file to update any copy — components just render it.

## Theming

Theme tokens are CSS variables in **`src/styles/tokens.css`**:

- Light values live in `:root`; dark values in `:root[data-theme='dark']`.
- Tailwind colours reference the channel triplets (`rgb(var(--c-*) / <alpha>)`),
  so both opacity utilities and theme-switching "just work".
- The toggle lives in the header (`src/lib/theme.tsx`), default **light**,
  persisted to `localStorage`.

To change the accent, edit the `--c-amber-*` / `--c-ember-*` triplets (currently a
refined blue → indigo).

## The hero centerpiece

The hero centerpiece is an **abstract 3D orb** (`src/three/HeroObject.tsx`,
drei `MeshDistortMaterial`) — no photo. The small header mark is an animated
monogram (`src/components/Logo.tsx`).

> Want a photo or custom logo instead? Swap `HeroObject` in
> `src/three/HeroScene.tsx`, or replace `Logo` in `src/components/Header.tsx`.

## Swap the CV

The "Download CV" button serves `public/assets/eyad-sofian-cv.pdf`. Replace that file
to update the download.

## Accessibility & performance

- `prefers-reduced-motion` respected (Lenis off, 3D frozen, opacity-only reveals).
- Keyboard-navigable with visible focus rings; alt/aria labels on controls.
- DPR capped, render loop pauses when the hero is off-screen, particle count and
  bloom reduced on mobile.

---

© Eyad Sofian — built with React, Three.js & GSAP.
