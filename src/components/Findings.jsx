import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { findings } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import { useParallax } from '../hooks/useParallax.js';
import EditorialChart from './EditorialChart.jsx';
import AnimatedGridFrame from './AnimatedGridFrame.jsx';
import { useVelocitySkew } from '../hooks/useVelocitySkew.js';

const EDITORIAL = [0.16, 1, 0.3, 1];
const HEAVY_SPRING = { type: 'spring', stiffness: 180, damping: 26, mass: 1 };

// Left-to-right clip wipe for card text blocks (replaces opacity fades).
const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0% 0 0)', transition: { ease: EDITORIAL, duration: 1.0 } }
};

const FIG_SOUTH_SHARE = [
  { label: 'South', value: 45, color: 'orange' },
  { label: 'Rest of US', value: 55, color: 'ink' }
];

const FIG_CORE5_COVERAGE = [
  { label: 'Phoenix', value: 110, color: 'volt' },
  { label: 'DFW', value: 65, color: 'orange' },
  { label: 'Houston', value: 49, color: 'orange-deep' },
  { label: 'Atlanta', value: 79, color: 'amber' },
  { label: 'Tampa', value: 77, color: 'amber' }
];

const FIG_ATLANTA_FLEET = [
  { label: 'Atlanta fleet', value: 118, color: 'volt' },
  { label: 'Atlanta market', value: -1.9, color: 'orange-deep' }
];

const FIG_TEXAS = [
  { label: 'Lone Star', value: -38, color: 'orange-deep' },
  { label: 'Metroplex', value: -36, color: 'orange-deep' },
  { label: 'DFW demand', value: 5.3, color: 'volt' },
  { label: 'DFW fleet', value: 49.4, color: 'volt' }
];

const ACCENT_BAR = {
  orange: 'bg-orange',
  'orange-deep': 'bg-orange-deep',
  teal: 'bg-teal',
  volt: 'bg-volt',
  navy: 'bg-navy'
};

const ACCENT_TEXT = {
  orange: 'text-orange',
  'orange-deep': 'text-orange-deep',
  teal: 'text-teal',
  volt: 'text-volt',
  navy: 'text-navy'
};

const SOURCES = {
  'south-frontier': 'Source · ChargeIQ Q1 2026 · Regional demand panel',
  'houston-gap': 'Source · ChargeIQ metros 2026 · Coverage Index vs 100 baseline',
  'atlanta-fleet': 'Source · Custom fleet dataset · Q1 2026',
  'texas-partners': 'Source · Voltway network ledger · Q1 2026'
};

export default function Findings() {
  const reduce = useReducedMotion();
  const headRef = useReveal();
  const listRef = useReveal({ threshold: 0.06 });
  const shapeRef = useParallax(0.08);
  const skewY = useVelocitySkew();
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="findings"
      className="relative overflow-hidden bg-paper border-b border-ink"
    >
      {/* Parallax divider shape */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          ref={shapeRef}
          className="absolute -left-32 -top-24 w-[520px] h-[520px] rounded-full mix-blend-screen will-change-transform"
          style={{
            background:
              'radial-gradient(closest-side, rgba(0, 103, 71, 0.18), transparent 72%)',
            transform: 'translate3d(0, var(--parallax-y, 0px), 0)'
          }}
        />
        <div
          className="absolute right-0 bottom-0 w-[320px] h-[320px] rounded-full mix-blend-screen"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255, 107, 53, 0.18), transparent 70%)'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24">
        {/* Header */}
        <div
          ref={headRef}
          className="reveal grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start mb-12 lg:mb-16"
        >
          <aside className="lg:sticky lg:top-24">
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-volt border-t-2 border-volt pt-3">
              03 · The Findings
            </span>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint leading-relaxed max-w-[28ch]">
              Four signals — the ones that survived 60 metros and six analytical lenses.
            </div>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-amber-wash text-volt-deep text-[11px] font-mono uppercase tracking-[0.14em] border border-amber">
              Drawn from ChargeIQ Q1 2026
            </div>
          </aside>

          <div>
            <h2 className="font-display font-black uppercase tracking-[-0.045em] leading-[0.95] text-display-md text-ink">
              What the data<br />
              <span className="text-volt">actually says.</span>
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
              Before recommending where Voltway should add charging hubs, the report has
              to say what the underlying numbers do. These four findings carry the rest
              of the document — each one drawn from the same ChargeIQ 60-metro demand panel
              and cross-checked against the network ledger.
            </p>
          </div>
        </div>

        {/* Findings 2x2 grid — gap-0 seams framed by animated SVG vectors;
            hovering a card morphs the matrix (scale up, siblings dim). The
            whole matrix + frame skew together with scroll velocity. */}
        <motion.div
          className="relative will-change-transform"
          style={reduce ? undefined : { skewY }}
        >
          <motion.ol
            ref={listRef}
            onMouseLeave={() => setHovered(null)}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-paper"
          >
            {findings.map((f, idx) => {
              const isHover = hovered === idx;
              const isDim = hovered !== null && !isHover;
              return (
                <motion.li
                  key={f.id}
                  id={`finding-${f.id}`}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EDITORIAL, delay: idx * 0.06 }}
                  onMouseEnter={() => setHovered(idx)}
                  onFocusCapture={() => setHovered(idx)}
                  className="relative"
                  style={{ zIndex: isHover ? 20 : 1 }}
                >
                  <motion.div
                    animate={
                      reduce
                        ? undefined
                        : {
                            scale: isHover ? 1.015 : 1,
                            opacity: isDim ? 0.4 : 1,
                            filter: isDim ? 'grayscale(0.55)' : 'grayscale(0)'
                          }
                    }
                    transition={HEAVY_SPRING}
                    className="relative h-full bg-paper p-6 lg:p-8 flex flex-col gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 left-0 right-0 h-1.5 ${ACCENT_BAR[f.accent]}`}
                    />

                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className={`font-display font-black tracking-[-0.05em] leading-none text-[clamp(72px,9vw,128px)] ${ACCENT_TEXT[f.accent]}`}
                      >
                        {f.number}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                        Finding · 03/0{Number(f.number)}
                      </span>
                    </div>

                    <motion.h3
                      variants={clipReveal}
                      initial={reduce ? false : 'hidden'}
                      whileInView={reduce ? undefined : 'show'}
                      viewport={{ once: true, amount: 0.6 }}
                      className="font-display font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(24px,2.6vw,34px)] text-ink max-w-[28ch]"
                    >
                      {f.title}
                    </motion.h3>

                    <motion.p
                      variants={clipReveal}
                      initial={reduce ? false : 'hidden'}
                      whileInView={reduce ? undefined : 'show'}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: 0.08 }}
                      className="text-[16px] leading-relaxed text-ink-soft max-w-[54ch]"
                    >
                      {f.body}
                    </motion.p>

                    {/* Sparkbar — visual proof indicator */}
                    <div className="mt-2 flex items-end gap-1 h-12" aria-hidden="true">
                      {[0.35, 0.55, 0.45, 0.7, 0.6, 0.85, 0.78, 0.95].map((hgt, i) => (
                        <span
                          key={i}
                          className={`w-[8px] ${ACCENT_BAR[f.accent]} opacity-80`}
                          style={{ height: `${hgt * 100}%` }}
                        />
                      ))}
                      <span className="ml-2 self-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                        Trend · TTM
                      </span>
                    </div>

                    <div className="mt-auto pt-3 border-t border-rule font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                      {SOURCES[f.id]}
                    </div>

                    {/* Hover border sweep: rule → volt */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 border-2 border-volt pointer-events-none"
                      initial={false}
                      animate={{ opacity: isHover && !reduce ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: EDITORIAL }}
                    />
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ol>
          <AnimatedGridFrame gridRef={listRef} />
        </motion.div>

        {/* Editorial charts — one fig per finding */}
        <div className="mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: EDITORIAL }}
            style={{ originX: 0 }}
            className="h-[2px] bg-ink mb-6"
            aria-hidden="true"
          />
          <div className="flex items-end justify-between gap-4 mb-6">
            <h3 className="font-display font-black uppercase tracking-[-0.035em] leading-[1] text-[clamp(24px,3vw,40px)] text-ink">
              The figures.
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-volt">
              Fig. 01 — Fig. 04
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <EditorialChart
              type="bar"
              caption="Fig. 01 · US charging demand by region (% of projected demand)"
              data={FIG_SOUTH_SHARE}
              valueSuffix="%"
              yDomain={[0, 60]}
              ariaLabel="The South region accounts for 45% of US fast-charging demand; the rest of the country accounts for 55%."
            />
            <EditorialChart
              type="bar"
              caption="Fig. 02 · Core 5 Coverage Index vs 100 baseline"
              data={FIG_CORE5_COVERAGE}
              baseline={100}
              baselineLabel="industry parity"
              yDomain={[0, 130]}
              ariaLabel="Coverage Index for Phoenix 110, DFW 65, Houston 49, Atlanta 79, Tampa 77. Industry baseline is 100."
            />
            <EditorialChart
              type="bar"
              caption="Fig. 03 · Atlanta fleet sessions YoY vs Atlanta market"
              data={FIG_ATLANTA_FLEET}
              valueSuffix="%"
              yDomain={[-20, 140]}
              ariaLabel="Atlanta fleet sessions are up 118% year over year; the broader Atlanta market declined 1.9%."
            />
            <EditorialChart
              type="bar"
              caption="Fig. 04 · Texas — partner utilization vs metro demand (% YoY)"
              data={FIG_TEXAS}
              valueSuffix="%"
              yDomain={[-50, 60]}
              ariaLabel="Lone Star Sites is down 38% year over year and Metroplex Power is down 36%, while DFW demand is up 5.3% and DFW fleet sessions are up 49.4%."
            />
          </div>
        </div>

        {/* Footer rule */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ink font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          <span>04 findings · 04 figures · 04 chapters of the report cite back here</span>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-ink hover:text-orange-deep transition-colors duration-200"
          >
            See the case studies <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
