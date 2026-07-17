# BUDDHA'S SKILL ACADEMY — BUILD SPECIFICATION
### Premium, cinematic, scroll-driven marketing site

> **Deliverable:** A single-page (multi-section) premium marketing website for **Buddha's Skill Academy** — "Skills That Matter." Cinematic GSAP scroll narrative with pinned sections and parallax depth, built on the NNC standard stack.
>
> **Content source:** Course/stat content lifted from the academy pamphlet and rebranded to Buddha's Skill Academy. **Brand system:** derived from the supplied logo — vivid crimson red on obsidian black with white.
>
> **Stack note (one line):** This is a marketing site, not a CRM/app — so it's **Next.js 14 App Router** (not a microservices backend). Lead capture is one lean, isolated enquiry module; everything else is static and cache-friendly.

---

## 0. CONCEPT — "STILL MIND, SHARP SKILL"

The logo pairs a meditating Buddha with a bold red **B** and pixel-dissolve motif. The site leans into that duality: **calm, deliberate focus** (obsidian space, slow reveals, generous negative space) punctuated by **sharp red intent** (CTAs, active states, the scroll progress rail, numbers that snap into place). The pixel-dissolve from the logo becomes a recurring motion signature — elements assemble from scattered fragments as you scroll.

Emotional arc across the scroll: **arrive calm → see the proof → understand the path → choose a track → trust the method → act.**

---

## 1. BRAND & DESIGN TOKENS

### 1.1 Color (`styles/tokens.css`)
Sampled directly from the logo.

```css
:root {
  /* Brand core */
  --crimson:        #EA0203;   /* primary red — CTAs, accents, active states */
  --crimson-deep:   #B80002;   /* hover / pressed */
  --crimson-soft:   #FF3B3C;   /* highlights on dark */
  --crimson-glow:   rgba(234, 2, 3, 0.35);

  /* Obsidian (dark surfaces) */
  --obsidian:       #04070C;   /* primary dark bg (from logo black) */
  --obsidian-800:   #090D14;
  --obsidian-700:   #11161F;
  --obsidian-600:   #1A212C;
  --hairline-dark:  rgba(244, 245, 247, 0.10);

  /* Paper (light surfaces) */
  --paper:          #FFFFFF;
  --paper-soft:     #F5F6F8;
  --paper-mute:     #ECEEF1;
  --hairline-light: rgba(4, 7, 12, 0.10);

  /* Ink / text */
  --ink:            #04070C;            /* on light */
  --ink-70:         rgba(4, 7, 12, 0.70);
  --ink-45:         rgba(4, 7, 12, 0.45);
  --snow:           #F4F5F7;            /* on dark */
  --snow-65:        rgba(244, 245, 247, 0.65);
  --snow-40:        rgba(244, 245, 247, 0.40);

  /* Motion */
  --ease-out:  cubic-bezier(0.16, 1, 0.3, 1);   /* power4-ish reveal */
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 0.4s;
  --dur:      0.8s;
  --dur-slow: 1.2s;
}
```

**Usage rule:** Red is an *accent*, never a wash. Roughly 70% obsidian surfaces / 22% paper / 8% red. Alternate obsidian↔paper section backgrounds for rhythm; red is the thread the eye follows (progress rail, active card, hovered CTA, underline sweep on links, the count-up numbers).

### 1.2 Typography
Load via `next/font` (self-hosted, zero layout shift).

- **Display / headlines:** **Space Grotesk** (500, 700) — technical, confident, premium. Set headlines tight: `letter-spacing: -0.02em`, `line-height: 0.98–1.05`.
- **Body / UI:** **Inter** (400, 500, 600).
- **Eyebrows / stat labels / code cues:** **JetBrains Mono** (400, 500), uppercase, `letter-spacing: 0.18em`.

> Alternative display if you want more warmth: **Clash Display**. Keep body as Inter either way.

Type scale (clamp, fluid):
```css
--fs-hero:  clamp(3rem, 9vw, 8.5rem);
--fs-h1:    clamp(2.25rem, 5.5vw, 4.5rem);
--fs-h2:    clamp(1.75rem, 3.5vw, 3rem);
--fs-lead:  clamp(1.125rem, 1.6vw, 1.5rem);
--fs-body:  1rem;
--fs-eyebrow: 0.8125rem;
```

### 1.3 Spacing / layout
- Max content width `1280px`; wide breakout rails at `1440px` for pinned galleries.
- Section vertical rhythm: `clamp(6rem, 12vh, 11rem)` top/bottom.
- Radius: cards `20px`, chips/pills `999px`, buttons `12px`.
- Grid: 12-col, `24px` gutter desktop / `16px` mobile.

---

## 2. TECH STACK & CONVENTIONS

| Layer | Choice |
|---|---|
| Framework | **Next.js 14 (App Router)**, JavaScript only (no TS) |
| Styling | **CSS Modules** + `tokens.css` (no Tailwind) |
| Animation | **GSAP** + ScrollTrigger, registered once in `lib/gsap.js` |
| Smooth scroll | **Lenis**, synced to the GSAP ticker |
| Fonts | `next/font/google` (Space Grotesk, Inter, JetBrains Mono) |
| Images | `next/image`, AVIF/WebP, explicit width/height |
| Deploy target | **`output: 'export'` static** by default (see §9 for the lead-capture variant) |

### 2.1 Non-negotiable GSAP/Lenis conventions
These match the NNC house rules — Claude Code must follow them exactly:

1. **Register once.** `lib/gsap.js` does `gsap.registerPlugin(ScrollTrigger, useGSAP)` and re-exports `gsap`, `ScrollTrigger`. Nothing else registers plugins.
2. **Cleanup via `useGSAP({ scope: ref })`** in every animated component — no manual `gsap.context()` teardown, no orphaned triggers.
3. **Lenis → GSAP ticker** (single RAF loop):
   ```js
   lenis.on('scroll', ScrollTrigger.update);
   gsap.ticker.add((t) => lenis.raf(t * 1000));
   gsap.ticker.lagSmoothing(0);
   ```
4. **Animate `transform` and `opacity` only.** Never animate `top/left/width/height/margin`. No layout-triggering properties in any tween.
5. **Desktop-only pinning** via `gsap.matchMedia()` — pin/scrub timelines register only at `min-width: 1024px`. Mobile gets the same content as lightweight fade/slide reveals (no pin, no scrub).
6. **`prefers-reduced-motion`** guard at the top of every animation module: if reduced, set all final states immediately and skip timelines.
7. **`ScrollTrigger.refresh()`** after fonts load and after the hero media/images settle (use `document.fonts.ready` + `Promise.all` on hero images).
8. **`will-change: transform`** only on actively-pinned/parallax layers, removed on cleanup.

### 2.2 Folder structure (feature-based, modular tree — no flat dumps)
```
buddha-skill-academy/
├─ app/
│  ├─ layout.js                 # fonts, Lenis provider, <SmoothScroll>
│  ├─ page.js                   # composes sections in order
│  ├─ globals.css               # resets + tokens import
│  └─ api/enquiry/route.js      # (only in the dynamic variant — §9)
├─ components/
│  ├─ layout/
│  │  ├─ Navbar/
│  │  ├─ Footer/
│  │  └─ SmoothScroll/          # Lenis provider
│  ├─ sections/
│  │  ├─ Hero/
│  │  ├─ StatsBand/
│  │  ├─ Positioning/
│  │  ├─ Tracks/                # the centerpiece (pinned horizontal)
│  │  ├─ WhyChoose/
│  │  ├─ HiringPartners/
│  │  ├─ Journey/
│  │  ├─ Testimonials/
│  │  └─ EnquiryCTA/
│  └─ ui/
│     ├─ Button/
│     ├─ Eyebrow/
│     ├─ SplitText/             # word/line-split reveal helper
│     ├─ CountUp/
│     ├─ Marquee/
│     └─ PixelDissolve/         # logo-motif fragment reveal
├─ lib/
│  ├─ gsap.js                   # single registration point
│  ├─ content.js                # ALL copy + data (see §4)
│  └─ useParallax.js            # reusable parallax hook
├─ hooks/
│  └─ useReducedMotion.js
├─ styles/
│  └─ tokens.css
├─ public/
│  ├─ brand/                    # logo SVG/PNG variants
│  ├─ partners/                 # hiring-partner logos
│  └─ og/
├─ next.config.js
└─ jsconfig.json                # "@/*" path alias
```

---

## 3. SECTION-BY-SECTION SPEC (the scroll narrative)

Eight movements. Each lists: purpose · surface · content · animation. Pin/scrub effects are **desktop-only** (`matchMedia`); mobile = reveal-only.

### M0 · Navbar  (fixed overlay)
- **Surface:** transparent over hero → on scroll past hero, animates to `--obsidian-800` with bottom hairline + backdrop-blur.
- **Content:** logo (left), links `Programs · Why Us · Placements · Contact` (center), **Enroll Now** button (red, right). Mobile: hamburger → full-screen obsidian overlay, links stagger in.
- **Animation:** ScrollTrigger toggles a `.solid` class at `scrollY > 90vh`. Logo swaps to compact mark once solid. Active-section link underline (red) follows via ScrollTrigger `onToggle`.

### M1 · Hero — "Skills That Matter"  (pinned intro)
- **Surface:** `--obsidian`. Faint radial red glow behind the headline; subtle grain overlay.
- **Content:**
  - Eyebrow (mono): `BUDDHA'S SKILL ACADEMY`
  - Headline: **"Skills that matter."** (line 2, red): **"Careers that follow."**
  - Sub: "We don't just teach — we transform your career. Industry-ready training in code, data, and security."
  - Primary CTA **Explore Programs** · ghost CTA **Talk to a Mentor**
  - Scroll cue at base.
- **Animation:**
  - On load: headline reveals **line-by-line** via `SplitText`-style clip-mask (`y: 110% → 0`, stagger `0.12`, `--ease-out`). Eyebrow + sub + CTAs stagger after.
  - **Pixel-dissolve mark:** the Buddha/B mark assembles from scattered square fragments (echoing the logo's pixel motif) — `PixelDissolve` component, GSAP stagger from random offsets to origin.
  - **Pinned parallax on scroll:** pin the hero for ~`120%` viewport; headline drifts up slightly + fades, glow scales, mark parallaxes at a slower rate. Scrubbed. Releases into StatsBand.
  - Reduced-motion: static hero, no pin.

### M2 · Stats Band — proof  (pinned count-up)
- **Surface:** `--obsidian-800`, red top hairline.
- **Content (from pamphlet):** `400+ Drives` · `300+ Hiring Partners` · `1200+ Successful Placements` · `200+ Candidates Placed`.
- **Animation:** section pins briefly; as it scrubs, each stat's number **counts up** (CountUp driven by ScrollTrigger progress, not a timer) and the mono label fades in with a red tick. Thin red baseline draws left→right (`scaleX 0→1`, transform-origin left). Numbers use tabular figures to avoid width jitter.

### M3 · Positioning — "Build Skills. Build Confidence."  (pinned text)
- **Surface:** `--paper` (first light section — deliberate contrast beat).
- **Content:** Big statement headline "Build skills. Build confidence." · body "At Buddha's Skill Academy, we don't just teach — we transform your career." · three inline pillars (Curriculum · Mentors · Placement) each with a short line.
- **Animation:** pin + **word-by-word mask reveal** scrubbed to scroll (words go `--ink-45 → --ink` as the playhead passes — a "read-along" highlight). Pillars fade/slide up on release.

### M4 · Tracks / Programs — the centerpiece  (pinned horizontal scroll)
- **Surface:** `--obsidian`.
- **Content:** the **5 programs** (full data in §4). Each card: index (`01–05`, mono red), title, one-line promise, **"What you'll learn"** chip list, **"Career paths"** line, and a **Enquire** button.
- **Animation:**
  - **Desktop:** pin the section and translate the horizontal track `x` across the 5 cards, scrubbed (classic pinned horizontal gallery). A **red progress rail** at the bottom fills as you move through the tracks. Active card scales to `1`, neighbors sit at `0.94` + reduced opacity. Chip lists stagger-reveal when a card becomes active.
  - **Mobile:** vertical stack of cards, each a fade/slide-up reveal on enter (no pin, no horizontal scroll).
  - Guard the `x` distance calc against resize; recompute in `matchMedia` and `ScrollTrigger.refresh()` on load.

### M5 · Why Choose — the method  (pinned reveal grid)
- **Surface:** `--paper-soft`.
- **Content:** the **7 differentiators** (§4): Industry-Curated Curriculum · Corporate Certified Trainers · Live Projects & Hands-On · Placement Assistance (placed within 1 year) · Mock Interviews · World-Class Infrastructure · Certification on Completion.
- **Animation:** section headline pins; the 7 cards **stagger-assemble** in a masonry/3-col grid using the pixel-dissolve motif (small red index number counts 01→07). Cards lift on hover with a red hairline sweep.

### M6 · Hiring Partners — trust  (marquee)
- **Surface:** `--obsidian`.
- **Content:** eyebrow "Where our learners land" + two infinite logo marquees (opposite directions) using `public/partners/` (placeholder greyscale logos → color on hover).
- **Animation:** pure CSS/GSAP infinite marquee (transform-only, seamless loop, pauses on hover). Row-1 parallax offsets slightly against Row-2 as the section scrolls through.

### M7 · Journey — the path to placed  (pinned progress rail)
- **Surface:** `--obsidian-800`.
- **Content:** 5-step path: **Enroll → Learn by building → Live projects → Mock interviews → Get placed.** Each step a short caption.
- **Animation:** pin; a vertical/diagonal **red rail fills** with scroll progress (`scaleY 0→1`), and each step node **pops** (scale + red fill) as the playhead reaches it. Step captions slide in from alternating sides.

### M8 · Testimonials  (optional pinned cards)
- **Surface:** `--paper`.
- **Content:** 3–4 placement success quotes (name, track, company/CTC placeholder). Mark clearly as placeholder in `content.js`.
- **Animation:** pinned stacked cards that swap on scroll, or a simple auto-advancing carousel with reduced-motion fallback to a static list.

### M9 · Enquiry CTA — the ask  (form / WhatsApp)
- **Surface:** `--obsidian`, red glow bloom.
- **Content:** Headline **"Enroll today. Start your tech journey."** + enquiry form: **Name · Phone · Email · Program (select) · Message**. Primary submit + secondary **WhatsApp us** deep link.
- **Animation:** headline mask-reveal; form fields stagger; on submit success, a pixel-dissolve confirmation. See §9 for wiring.

### Footer
- **Surface:** `--obsidian-800`.
- **Content:** logo, tagline "Skills That Matter", quick links, contact (phone/email/WhatsApp/address placeholders), socials, copyright. Bottom credit line.

---

## 4. CONTENT MODEL (`lib/content.js`)

All copy centralized. Fill `[PLACEHOLDER]` items with real client data before launch.

```js
export const brand = {
  name: "Buddha's Skill Academy",
  tagline: "Skills That Matter",
  promise: "We don't just teach — we transform your career.",
  phone: "[PHONE]",
  whatsapp: "[E.164 e.g. 919XXXXXXXXX]",
  email: "[EMAIL]",
  address: "[CITY, STATE]",
  socials: { instagram: "#", linkedin: "#", youtube: "#" },
};

export const hero = {
  eyebrow: "Buddha's Skill Academy",
  titleTop: "Skills that matter.",
  titleAccent: "Careers that follow.",
  sub: "Industry-ready training in code, data, and security — built on live projects, real mentorship, and placement support that doesn't quit.",
  ctaPrimary: { label: "Explore Programs", href: "#programs" },
  ctaGhost:   { label: "Talk to a Mentor", href: "#contact" },
};

export const stats = [
  { value: 400,  suffix: "+", label: "Drives" },
  { value: 300,  suffix: "+", label: "Hiring Partners" },
  { value: 1200, suffix: "+", label: "Successful Placements" },
  { value: 200,  suffix: "+", label: "Candidates Placed" },
];

export const tracks = [
  {
    id: "java-fullstack",
    index: "01",
    title: "Java Full Stack Development",
    promise: "Master front-end and back-end technologies with hands-on projects.",
    learn: ["Java Programming", "HTML, CSS & JavaScript", "React JS", "Spring Boot", "MySQL Database", "APIs & Deployment"],
    careers: ["Java Developer", "Full Stack Developer", "Software Engineer"],
  },
  {
    id: "python-fullstack",
    index: "02",
    title: "Python Full Stack Development",
    promise: "Become a skilled Python developer through real-world, project-based training.",
    learn: ["Python Programming", "HTML, CSS & JavaScript", "Django Framework", "React JS", "Database Management", "REST APIs", "Data Structures"],
    careers: ["Python Developer", "Web Developer", "Backend Developer"],
  },
  {
    id: "data-science-ai",
    index: "03",
    title: "Data Science, AI & Analytics",
    promise: "Learn how to analyze data and build intelligent solutions.",
    learn: ["Python for Data Science", "Data Analysis & Visualization", "Machine Learning", "Artificial Intelligence", "Pandas & NumPy", "Power BI / Tableau", "Excel & SQL"],
    careers: ["Data Analyst", "Data Scientist", "AI Engineer"],
  },
  {
    id: "cyber-security",
    index: "04",
    title: "Cyber Security & Ethical Hacking",
    promise: "Gain expertise in securing systems and networks against modern cyber threats.",
    learn: ["Ethical Hacking", "Network Security", "Cyber Threat Analysis", "Penetration Testing", "Security Tools & Techniques", "Real-Time Security Projects"],
    careers: ["Cyber Security Analyst", "Ethical Hacker", "Security Engineer"],
  },
  {
    id: "software-testing",
    index: "05",
    title: "Software Testing & Automation",
    promise: "Become an expert in software testing and automation.",
    learn: ["Manual Testing", "Core Java", "Selenium", "Cucumber", "Cypress", "SQL", "Agile & Jira", "TestNG"],
    careers: ["QA Engineer", "Test Engineer", "Automation Tester"],
  },
];

export const whyChoose = [
  { index: "01", title: "Industry-Curated Curriculum", body: "Approved and affiliated by industry leaders." },
  { index: "02", title: "Corporate-Certified Trainers", body: "Learn from certified professionals with real-time experience." },
  { index: "03", title: "Live Projects & Hands-On Training", body: "Learn by building real-world applications." },
  { index: "04", title: "Placement Assistance", body: "A dedicated support unit — get placed within 1 year." },
  { index: "05", title: "Mock Interviews", body: "Get interview-ready with expert guidance." },
  { index: "06", title: "World-Class Infrastructure", body: "Learn in a comfortable, advanced environment." },
  { index: "07", title: "Certification on Completion", body: "Industry-recognized certificate to boost your career." },
];

export const journey = [
  { step: "01", title: "Enroll", body: "Pick your track and lock your batch." },
  { step: "02", title: "Learn by building", body: "Concepts taught through code, not slides." },
  { step: "03", title: "Live projects", body: "Ship real applications with mentor review." },
  { step: "04", title: "Mock interviews", body: "Get interview-ready with expert guidance." },
  { step: "05", title: "Get placed", body: "Dedicated placement support until you're hired." },
];

// Placeholder — replace with real quotes/permission before launch
export const testimonials = [
  { name: "[NAME]", track: "Java Full Stack", company: "[COMPANY]", quote: "[TESTIMONIAL]" },
  { name: "[NAME]", track: "Data Science, AI & Analytics", company: "[COMPANY]", quote: "[TESTIMONIAL]" },
  { name: "[NAME]", track: "Cyber Security", company: "[COMPANY]", quote: "[TESTIMONIAL]" },
];

export const cta = {
  title: "Enroll today. Start your tech journey.",
  sub: "Talk to a mentor about the right track for you.",
  programs: tracks.map((t) => t.title),
};
```

---

## 5. REUSABLE PRIMITIVES

- **`SplitText`** — splits headline into lines/words wrapped in a masked span; returns targets for GSAP. (Use a JS splitter, not the paid GSAP SplitText plugin — a small custom util that wraps words/lines in spans is fine.)
- **`CountUp`** — takes `value`, driven by a ScrollTrigger `onUpdate` progress value (0→1) mapped to `0→value`; `tabular-nums`; respects reduced-motion (shows final immediately).
- **`PixelDissolve`** — renders children as a grid of fragments; on enter, fragments tween from random `{x,y,opacity,scale}` to identity with stagger. The site's signature motif; reused in hero mark, WhyChoose cards, and CTA success.
- **`Marquee`** — seamless duplicated track, transform-only, `prefers-reduced-motion` → static row.
- **`useParallax(ref, { speed })`** — ScrollTrigger scrub mapping scroll to `y` translate; desktop-only.

---

## 6. PERFORMANCE REQUIREMENTS (house non-negotiables)

- **Transform/opacity only** in all animations — zero layout thrash. No animating box dimensions.
- **Static generation:** every marketing section is static; no client data fetching on load. Ship as `output: 'export'` unless the DB-backed enquiry variant is chosen (§9).
- **Images:** `next/image` with explicit dimensions, AVIF/WebP, `priority` only on the hero mark, lazy everything below the fold. Partner logos as optimized SVG where possible.
- **Fonts:** `next/font` self-hosted, `display: 'swap'`, preloaded — target zero CLS.
- **JS discipline:** GSAP/ScrollTrigger imported once; heavy sections (`Tracks`, `Testimonials`) `dynamic()`-imported with `ssr: false` where they're purely visual and below the fold, to keep the initial bundle lean.
- **`ScrollTrigger.refresh()`** after `document.fonts.ready` and hero image decode — prevents pin-jump on first paint.
- **Targets:** Lighthouse (mobile) Perf ≥ 90, CLS < 0.05, LCP < 2.5s on 4G. If any pinned section causes jank, reduce scrub smoothing before adding more triggers.
- **Reduced-motion:** a genuinely good static experience — content fully readable, no dependence on scroll to reveal.

---

## 7. ACCESSIBILITY

- Semantic landmarks (`header/nav/main/section/footer`), one `h1` (hero), logical heading order.
- Every pinned/scrubbed reveal has a **reduced-motion static equivalent** — content never hidden behind motion.
- Focus-visible states on all interactive elements (red ring). Keyboard-navigable nav overlay + form.
- Color contrast: check red-on-obsidian for text — use `--crimson-soft` (#FF3B3C) or white for body-size text on dark; reserve pure `--crimson` for large text, fills, and accents (it passes AA large, not AA small).
- Form: labels tied to inputs, `aria-invalid` + inline error messages, submit status announced via `aria-live`.

---

## 8. SEO / META

- `<title>`: "Buddha's Skill Academy | Job-Ready Tech Training & Placements"
- Meta description, Open Graph + Twitter card (`public/og/`).
- JSON-LD: `EducationalOrganization` + `Course` entries generated from `tracks`.
- Semantic headings mirror the visible narrative. Sitemap + robots.

---

## 9. ENQUIRY MODULE (isolated lead capture)

Two variants — pick per hosting. Keep this the **only** dynamic concern; the rest stays static.

**Variant A — Static export (default, simplest):**
- Enquiry form posts to a hosted form service (Formspree/Web3Forms) **or** builds a prefilled **WhatsApp deep link** (`https://wa.me/<brand.whatsapp>?text=...`) and `mailto:` fallback.
- No backend, no DB — ships on any static host. Client-side validation only (still validate: required fields, phone regex, email regex, message length; sanitize before building the WhatsApp string).

**Variant B — Node route handler (if leads must land in a DB):**
- Drop `output: 'export'`, add `app/api/enquiry/route.js` (Edge or Node runtime).
- **Performant + production-minded:** input validation (zod), server-side sanitize, **rate-limit by IP** (in-memory token bucket for low volume, or Upstash Redis if you want it durable), honeypot field for spam.
- Persist to **PostgreSQL** (relational, transactional lead record — the right fit over Mongo here: leads are a fixed, queryable schema you'll report on) via a pooled client (`pg` Pool, not a new connection per request). Parameterized query only. Index on `created_at` and `program`.
- Respond fast: insert → `202` immediately, fire the notification (email/WhatsApp Business API) async so the user never waits. Optimistic UI on the client (React Query mutation with optimistic success state, rollback on error).

```
enquiries
  id            uuid  pk  default gen_random_uuid()
  name          text  not null
  phone         text  not null
  email         text
  program       text
  message       text
  source        text  default 'website'
  created_at    timestamptz default now()   -- indexed
```

Start with **Variant A** unless the client explicitly needs a CRM-backed lead pipeline.

---

## 10. BUILD ORDER (for Claude Code)

1. Scaffold Next.js 14 (JS, App Router, no Tailwind), add `jsconfig.json` alias, `tokens.css`, fonts.
2. `lib/gsap.js`, `SmoothScroll` (Lenis+ticker), `useReducedMotion`, `useParallax`.
3. `lib/content.js` (paste §4 verbatim).
4. UI primitives: `Button`, `Eyebrow`, `SplitText`, `CountUp`, `Marquee`, `PixelDissolve`.
5. Sections in narrative order M0→Footer. **Validate each section as an HTML/desktop preview before wiring the next** (NNC pattern — catch pin math early).
6. Wire `matchMedia` desktop-only pinning + mobile reveal fallbacks; add reduced-motion guards.
7. Enquiry module (Variant A first).
8. Perf pass: `ScrollTrigger.refresh()` timing, dynamic imports, image optimization, Lighthouse.
9. SEO/meta/JSON-LD, favicon/OG from brand assets.

---

## 11. CLAUDE CODE HANDOFF PROMPT

> Copy-paste this to kick off the build:

```
Build a premium, cinematic, scroll-driven marketing site for "Buddha's Skill Academy"
per BUDDHA_SKILL_ACADEMY_BUILD_SPEC.md (attached).

Stack: Next.js 14 App Router, JavaScript only (no TypeScript), CSS Modules (no Tailwind),
GSAP + ScrollTrigger, Lenis. Follow the NNC GSAP/Lenis conventions in §2.1 exactly:
register GSAP once in lib/gsap.js, useGSAP({ scope }) for cleanup, Lenis synced to the
GSAP ticker, animate transform/opacity only, desktop-only pinning via gsap.matchMedia,
prefers-reduced-motion guards everywhere, ScrollTrigger.refresh() after fonts+hero images.

Brand: vivid crimson (#EA0203) on obsidian (#04070C) with white — red is an accent, not a
wash. Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (eyebrows) via next/font.
Reuse the pixel-dissolve logo motif as the site's motion signature.

Build the 8 movements in §3 in order: Hero (pinned intro) → Stats (pinned count-up) →
Positioning (pinned read-along) → Tracks (pinned horizontal, the centerpiece) → WhyChoose
(assemble grid) → Hiring Partners (marquee) → Journey (progress rail) → Testimonials →
Enquiry CTA. All copy/data comes from lib/content.js (§4) — don't hardcode strings in components.

Enquiry: Variant A (static export + WhatsApp deep link + validation) unless I say otherwise.

Ship a single-file HTML preview of the Hero + Tracks sections first for visual sign-off
BEFORE building the full Next.js project. Working output over explanation.
```

---

*Content adapted from the academy course pamphlet and rebranded to Buddha's Skill Academy. Replace all `[PLACEHOLDER]` values (contact details, testimonials, partner logos) with verified client data before launch. Confirm testimonial permissions and any accreditation/affiliation claims are accurate.*
