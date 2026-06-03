import { motion } from 'framer-motion';
import { site } from '../data/portfolio.js';

const FACTS = [
  ['Type', 'Portfolio demo'],
  ['Subject', 'Fictional EV network'],
  ['Stack', 'React · Vite'],
  ['Styling', 'Tailwind v4'],
  ['Motion', 'Framer Motion'],
  ['Charts', 'Recharts'],
  ['Data', 'Sample / fictional'],
  ['Pages', '4 routes']
];

const MARQUEE_PHRASE = 'CHARGE FRONTIER  •  SAMPLE DATA  •  ';
const MARQUEE_REPEATS = 6;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const factsStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.5 }
  }
};

const factCell = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

function Marquee({ direction = 'left' }) {
  const block = MARQUEE_PHRASE.repeat(MARQUEE_REPEATS);
  const animX = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 overflow-hidden select-none"
      style={{ height: 'clamp(120px, 16vw, 240px)' }}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: animX }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
      >
        <span className="font-display font-black uppercase tracking-[-0.04em] text-[clamp(110px,14vw,220px)] leading-none text-ink/[0.06] pr-12">
          {block}
        </span>
        <span className="font-display font-black uppercase tracking-[-0.04em] text-[clamp(110px,14vw,220px)] leading-none text-ink/[0.06] pr-12">
          {block}
        </span>
      </motion.div>
    </div>
  );
}

export default function AboutBand() {
  return (
    <section id="about" className="relative bg-navy-deep text-ink border-y border-rule overflow-hidden">
      {/* Top brand strip */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 flex origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex-[3] bg-orange" />
        <div className="flex-[2] bg-volt" />
        <div className="flex-[1] bg-amber" />
      </motion.div>

      {/* Subtle mesh glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(50% 60% at 88% 22%, rgba(255, 107, 53, 0.25), transparent 70%), radial-gradient(45% 55% at 12% 78%, rgba(0, 103, 71, 0.30), transparent 70%)'
        }}
      />

      {/* Marquee bands — top and bottom */}
      <div className="absolute top-12 left-0 right-0">
        <Marquee direction="left" />
      </div>
      <div className="absolute bottom-12 left-0 right-0">
        <Marquee direction="right" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
            }}
          >
            <motion.div className="flex items-center gap-3 mb-6" variants={fadeUp}>
              <span className="inline-block w-2 h-2 bg-orange" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-bright">
                08 &middot; The Analyst
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display font-black uppercase tracking-[-0.05em] leading-[0.92] text-display-lg text-ink"
            >
              Charge<br />
              <span className="text-amber">Frontier.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-[52ch] text-lg lg:text-xl text-ink/85 leading-relaxed"
            >
              <span className="text-amber font-semibold">Charge Frontier</span> is an interactive
              strategy-report design — a front-end portfolio piece. The brand, the analyst, the
              company &ldquo;Voltway Networks,&rdquo; and every number in it are fictional, built to
              show how a dense data narrative can feel premium on the web.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[52ch] text-base text-ink/70 leading-relaxed"
            >
              Built with React, Vite, Tailwind, Framer Motion, and Recharts: multi-page routing,
              scroll-reveal choreography, count-up stats, in-viewport editorial charts, and an intro
              splash. No real company data appears anywhere in this demo.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap gap-3" variants={fadeUp}>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 bg-orange text-ink px-6 h-[52px] font-display font-bold text-sm uppercase tracking-[0.08em] border border-orange hover:bg-orange-deep hover:border-orange-deep transition-colors duration-200 ease-[var(--ease-in-out-soft)]"
              >
                {site.email}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-ink px-6 h-[52px] font-display font-bold text-sm uppercase tracking-[0.08em] border border-ink hover:bg-volt hover:border-volt transition-colors duration-200 ease-[var(--ease-in-out-soft)]"
              >
                Source
              </a>
            </motion.div>
          </motion.div>

          {/* Quick facts grid — stagger after intro */}
          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={factsStagger}
            className="grid grid-cols-2 border border-ink/20"
          >
            {FACTS.map(([label, value], i) => (
              <motion.div
                key={label}
                variants={factCell}
                className={`p-5 lg:p-6 ${i % 2 === 1 ? 'border-l border-ink/20' : ''} ${i >= 2 ? 'border-t border-ink/20' : ''}`}
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
                  {label}
                </dt>
                <dd className="mt-2 font-display font-semibold text-base lg:text-lg text-ink">
                  {value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* Sample-data notice block */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-8 lg:gap-12 p-6 lg:p-8 bg-ink/[0.04] border border-amber/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-volt flex items-center justify-center">
              <span className="font-display font-black text-2xl text-amber leading-none">C</span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
                Demo notice
              </div>
              <div className="mt-1 font-display font-bold text-xl text-ink">
                Fictional sample data
              </div>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-ink/75 max-w-[58ch]">
            Voltway Networks is not a real company. Every metro figure, partner name, Coverage Index,
            and growth rate in this report was invented to exercise the layout. Nothing here represents
            real market data or any real organization — it exists purely to demonstrate the design and
            front-end engineering.
          </p>

          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
            <span className="inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-amber border border-amber px-3 py-1">
              Demo · 2026
            </span>
            <span className="inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-ink border border-ink/40 px-3 py-1">
              Fictional data
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
