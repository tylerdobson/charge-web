# ChargeWeb

An interactive, multi-page **market-expansion strategy report** for a fictional EV
fast-charging network, built as a front-end portfolio piece. Premium editorial layout,
eight numbered chapters, Framer Motion throughout, in-viewport data charts, and an intro
splash.

> **Sample data notice.** "Voltway Networks" is a made-up company. Every name, metro
> figure, Coverage Index, partner, and growth rate in this project is **fictional** and was
> invented purely to exercise the design. Nothing here reflects real market data or any real
> organization.

## Stack

- **Vite 5** + **React 18**
- **Tailwind CSS 4** with CSS-first theming — all design tokens live in `@theme` inside `src/index.css` (no `tailwind.config.js`)
- **React Router 6** — 4 routes wrapped in **Framer Motion** `AnimatePresence` for page transitions
- **Framer Motion** — page transitions, clip-path text reveals, magnetic CTAs, breathing mesh, count-up stats, drawing dividers, focus-dim grid hover, marquee, splash choreography
- **Recharts** — editorial chart wrapper with no grid lines, no axis lines, no default tooltips
- Google Fonts: **Inter Tight** (display), **Inter** (body), **JetBrains Mono** (eyebrow / labels)


```

## Deploy

The repo ships a `vercel.json` with SPA rewrites and long-lived asset caching, so it deploys
to **Vercel** (or any static host) out of the box: build command `npm run build`, output
directory `dist`.

## Routes

| Path | Page | Composes |
|---|---|---|
| `/` | The Question | `Hero` (clip-path line reveal, magnetic CTAs, breathing mesh) |
| `/thesis` | The Thesis | `ChapterIndex` + `Thesis` (count-up stats, drawing dividers) + `Findings` (4 cards + 4 editorial charts) |
| `/case-studies` | The Work | `CaseStudies` (staggered grid, focus-dim hover) + `FieldLog` + `Recommendations` + `Maps` (placeholder MapDisplay with radar pings) |
| `/about` | The Analyst | `AboutBand` (marquee, fade-in stats, sample-data notice) |

Hash navigation (`/case-studies#field-log`) works — `PageTransition` scrolls to the anchor on route change.

## Color system

All colors are CSS variables in `src/index.css` under `@theme`. Tailwind utilities resolve them automatically (`bg-navy`, `text-volt`, `border-orange-deep`, etc.).

| Family | Tokens |
|---|---|
| Paper / ink | `paper`, `paper-off`, `paper-deep`, `paper-recessed`, `ink`, `ink-soft`, `ink-faint`, `rule` |
| Blues | `navy`, `navy-deep`, `navy-soft` |
| Orange | `orange`, `orange-bright`, `orange-deep` |
| Signal green | `volt`, `volt-deep`, `volt-soft` |
| Warm sand | `amber`, `amber-deep`, `amber-wash` |
| Supporting | `teal`, `pink`, `pink-deep`, `butter`, `emerald` |

Type scale (`text-display-sm` → `text-display-xl`) is `clamp()`-based for fluid resizing.

## Structure

```
index.html
vite.config.js                # Vite + React + Tailwind v4 plugins
src/
  main.jsx                    # BrowserRouter + StrictMode root
  App.jsx                     # SplashLoader gate + Nav + AnimatePresence Routes + Footer
  index.css                   # @theme tokens + keyframes + reveal classes + custom utilities
  data/portfolio.js           # Single source of truth — site, thesis, metros, findings, recommendations, weeks, deliverables, chapters, navLinks, sitemap (all fictional)
  hooks/
    useReveal.js              # IntersectionObserver fade-in-up (CSS-class driven)
    useParallax.js            # rAF scroll-driven --parallax-y CSS variable
  pages/
    HomePage.jsx              # PageTransition + Hero
    ThesisPage.jsx            # PageTransition + ChapterIndex + Thesis + Findings
    CaseStudiesPage.jsx       # PageTransition + CaseStudies + FieldLog + Recommendations + Maps
    AboutPage.jsx             # PageTransition + AboutBand
  components/
    Nav.jsx                   # Sticky brand-strip nav + NavLink active rule (layoutId spring)
    Hero.jsx                  # Clip-path line reveal + magnetic CTAs + breathing mesh + parallax orbs
    ChapterIndex.jsx          # 8-cell numbered TOC band with parallax orb
    Thesis.jsx                # Statement, paragraphs, count-up proof row, drawing dividers
    Findings.jsx              # 4 finding cards 2x2 + 4 editorial charts 2x2 ("The figures.")
    CaseStudies.jsx           # Filterable dense grid + focus-dim hover + signal-green border swap
    FieldLog.jsx              # 10-week timeline with status pills (Complete / In progress / Planned)
    Recommendations.jsx       # 4 phases (0-90d / 3-9mo / Y1-3 / Y3-10) with owners + success metrics
    Maps.jsx                  # National + Southeast corridor MapDisplay cards
    AboutBand.jsx             # Intro + facts grid + sample-data notice + dual marquees
    Footer.jsx                # 5-column sitemap + contact strip + working-draft pill
    PageTransition.jsx        # opacity+y enter/exit, hash-scroll handler
    MagneticButton.jsx        # useMotionValue spring magnetic hover
    CountUp.jsx               # useInView count animation (parses +118% etc.)
    EditorialChart.jsx        # Recharts wrapper, no grid / no axis / no tooltip, in-view gate
    MapDisplay.jsx            # Topo SVG base + film-grain overlay + radar-ping markers + connector lines
    SplashLoader.jsx          # Full-screen intro overlay, 2.3s dwell, slide-up exit, sessionStorage gate
```

## Splash behavior

`SplashLoader` paints once per browser session. The flag lives in `sessionStorage` under `charge-frontier-splash-seen`. To replay during a session:

```js
sessionStorage.removeItem('charge-frontier-splash-seen')
```

…then refresh.

## Editing content

`src/data/portfolio.js` is the single source of truth. Every component pulls from it:

- `site` — brand, report name, fictional subject, demo contact, project window
- `thesis` — eyebrow, statement parts (with `tone`), paragraphs, 6 proof stats
- `metros` — 5 Core 5 metros with rank, Coverage Index, utilization YoY, hub distance, owner, site host, insight, accent color
- `findings` — 4 findings with number, title, body, accent
- `recommendations` — 4-phase Texas → Southeast → Network → Capacity plan
- `weeks` — 10 weeks with status (`Complete` / `In progress` / `Planned`)
- `deliverables` — deck, workbook, exec summary, national map, southeast map
- `chapters` — 8 numbered chapters used by `ChapterIndex` and the footer sitemap
- `navLinks` — top nav routes
- `sitemap` — footer columns

## Replacing map placeholders

`MapDisplay` accepts an optional `src=` prop. When provided, it swaps the SVG topographic base for a real image while keeping the grain overlay and the radar-ping markers. To use real maps:

1. Drop the file into `public/` (e.g. `public/map-national.jpg`)
2. In `src/components/Maps.jsx`, change `ATLAS['national-map'].src` from `null` to `'/map-national.jpg'`

The film-grain `feTurbulence` overlay multiplies over either base, so real imagery integrates without further work.

## Accessibility

- Every animation honors `prefers-reduced-motion`: useReveal, useParallax, MagneticButton, CountUp, and `@media (prefers-reduced-motion: reduce)` short-circuits in `index.css`
- Charts carry `aria-label` summaries (e.g. "Atlanta fleet sessions are up 118% YoY; the Atlanta market declined 1.9%")
- Marker labels use real `<span>` text, not background images
- Color contrast hits AAA on body copy and AA on small mono labels

## About this project

A design + front-end engineering demo. The narrative is structured as a 10-week working
strategy report — a fictional analyst figuring out where a fictional EV charging network
("Voltway Networks") should add fast-charging hubs over the next decade. Future weeks in
`FieldLog` are framed as planned, never as completed. **All data is invented.**
