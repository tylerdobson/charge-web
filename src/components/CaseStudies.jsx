import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { metros, findings, deliverables, filterChips } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';

const ACCENT_BG = {
  navy: 'bg-navy',
  orange: 'bg-orange',
  'orange-deep': 'bg-orange-deep',
  teal: 'bg-teal',
  'pink-deep': 'bg-pink-deep',
  butter: 'bg-butter',
  'volt': 'bg-volt',
  'amber': 'bg-amber'
};

const SPAN = {
  houston: 'md:col-span-2 md:row-span-2',
  atlanta: 'md:col-span-2',
  'south-frontier': 'md:col-span-2',
  deck: 'md:col-span-2'
};

const cardEnter = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
  }
};

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

function Card({ children, focus, dimmed, idAttr, span, onMouseEnter, onFocus }) {
  return (
    <motion.article
      id={idAttr}
      layout
      variants={cardEnter}
      initial="hidden"
      animate={dimmed ? { opacity: 0.45, scale: 0.985, transition: { duration: 0.25 } } : 'show'}
      exit="exit"
      whileHover={focus ? { y: -3 } : undefined}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={`relative flex flex-col bg-paper border border-rule transition-[border-color,background-color] duration-200 ease-[var(--ease-in-out-soft)] ${
        focus ? 'border-ink' : ''
      } ${span || ''}`}
    >
      {children}
    </motion.article>
  );
}

function AccentBar({ accent, focus }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${ACCENT_BG[accent]}`} />
      <motion.div
        className="absolute inset-0 bg-volt origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focus ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function MetroCard({ metro, focus, dimmed, onMouseEnter, onFocus }) {
  const featured = metro.id === 'houston';
  return (
    <Card idAttr={metro.id} span={SPAN[metro.id]} focus={focus} dimmed={dimmed} onMouseEnter={onMouseEnter} onFocus={onFocus}>
      <AccentBar accent={metro.accent} focus={focus} />
      <div className="flex-1 p-5 lg:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 border border-ink text-ink">
            Metro &middot; Core 5
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Rank #{metro.rank} &middot; {metro.region}
          </span>
        </div>

        <h3
          className={`font-display font-black tracking-[-0.04em] leading-[0.95] text-ink ${
            featured ? 'text-[clamp(48px,6vw,96px)] uppercase mt-2' : 'text-[28px] lg:text-[32px]'
          }`}
        >
          {metro.city}<span className="text-orange">.</span>
        </h3>

        <p className={`text-ink-soft ${featured ? 'text-lg leading-snug' : 'text-[15px] leading-relaxed'} max-w-[44ch]`}>
          {metro.tagline}
        </p>

        <dl className={`mt-2 grid ${featured ? 'grid-cols-2 lg:grid-cols-4 gap-4' : 'grid-cols-2 gap-3'} border-t border-rule pt-3`}>
          <Stat label="MSA" value={metro.population} note={`${metro.populationCagr} CAGR`} />
          <Stat
            label="Coverage Index"
            value={metro.gmiIndex}
            note={`Demand ${metro.dmaGmi}`}
            accent={metro.gmiIndex < 70 ? 'orange' : 'ink'}
          />
          <Stat
            label="Utilization"
            value={metro.plYoY}
            accent={metro.plYoY.startsWith('-') ? 'orange-deep' : 'volt'}
          />
          <Stat label="Annual demand" value={metro.dmaSize} />
          <Stat label="10-yr growth" value={metro.growth10yr} />
          <Stat label="Hub distance" value={metro.millDistance} small />
          <Stat label="Power" value={metro.transport} small />
          <Stat label="Site host" value={metro.distributor} small />
        </dl>

        <div className="mt-2" aria-hidden="true">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">
            <span>Coverage Index vs 100 baseline</span>
            <span className="text-ink">{metro.gmiIndex}</span>
          </div>
          <div className="relative h-2 bg-paper-recessed border border-rule">
            <motion.div
              className={`absolute inset-y-0 left-0 ${
                metro.gmiIndex < 70 ? 'bg-orange' : metro.gmiIndex < 100 ? 'bg-amber-deep' : 'bg-volt'
              }`}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(120, metro.gmiIndex)}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="absolute top-1/2 left-[100%] -translate-x-1/2 -translate-y-1/2 w-px h-3 bg-ink" />
          </div>
        </div>

        <p className={`mt-2 text-ink leading-relaxed border-l-2 border-volt pl-4 italic ${featured ? 'text-base' : 'text-[14px]'}`}>
          {metro.insight}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-rule text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
          <span>Owner &middot; {metro.ae}</span>
          <span className="text-ink">{metro.zone}</span>
        </div>
      </div>
    </Card>
  );
}

function FindingCard({ finding, focus, dimmed, onMouseEnter, onFocus }) {
  return (
    <Card idAttr={finding.id} span={SPAN[finding.id]} focus={focus} dimmed={dimmed} onMouseEnter={onMouseEnter} onFocus={onFocus}>
      <AccentBar accent={finding.accent} focus={focus} />
      <div className="flex-1 p-5 lg:p-6 flex flex-col gap-3">
        <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 self-start bg-ink text-paper">
          Finding {finding.number}
        </span>
        <h3 className="font-display font-bold tracking-[-0.03em] leading-[1.08] text-2xl lg:text-[28px] text-ink mt-1">
          {finding.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-ink-soft">{finding.body}</p>
        <div className="mt-auto pt-3 border-t border-rule font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          Source &middot; ChargeIQ Q1 2026
        </div>
      </div>
    </Card>
  );
}

function DeliverableCard({ item, focus, dimmed, onMouseEnter, onFocus }) {
  return (
    <Card idAttr={item.id} span={SPAN[item.id]} focus={focus} dimmed={dimmed} onMouseEnter={onMouseEnter} onFocus={onFocus}>
      <AccentBar accent={item.accent} focus={focus} />
      <div className="flex-1 p-5 lg:p-6 flex flex-col gap-3">
        <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 self-start border border-ink text-ink">
          {item.tag}
        </span>
        <h3 className="font-display font-bold tracking-[-0.03em] leading-[1.08] text-2xl lg:text-[28px] text-ink mt-1">
          {item.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-rule font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          <span>{item.meta}</span>
          <a href={item.href} className="text-ink hover:text-orange-deep transition-colors duration-200">
            Read &rarr;
          </a>
        </div>
      </div>
    </Card>
  );
}

function Stat({ label, value, note, accent, small }) {
  const accentClass =
    accent === 'orange'
      ? 'text-orange-deep'
      : accent === 'orange-deep'
      ? 'text-orange-deep'
      : accent === 'volt'
      ? 'text-volt'
      : 'text-ink';
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className={`mt-1 font-display font-semibold ${small ? 'text-[13px] leading-tight' : 'text-[18px] leading-none'} ${accentClass}`}>
        {value}
      </dd>
      {note && <div className="mt-0.5 text-[11px] text-ink-faint">{note}</div>}
    </div>
  );
}

export default function CaseStudies() {
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const headRef = useReveal();

  const items = useMemo(() => {
    const all = [
      ...metros.map((m) => ({ kind: 'metro', ...m })),
      ...findings.map((f) => ({ kind: 'finding', ...f })),
      ...deliverables.map((d) => ({ kind: 'deliverable', ...d }))
    ];
    if (filter === 'all') return all;
    return all.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section id="work" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-12 lg:py-16 border-b border-ink">
        <div ref={headRef} className="reveal flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-deep">
                04 &middot; The Core 5
              </span>
              <span className="w-12 h-px bg-ink" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
                Case Studies
              </span>
            </div>
            <h2 className="font-display font-black uppercase tracking-[-0.045em] leading-[0.95] text-display-md text-ink">
              The Core 5<br />metros.
            </h2>
          </div>
          <p className="max-w-[44ch] text-base lg:text-lg text-ink-soft leading-snug">
            The Core 5 metros, the four early findings drawn from ChargeIQ, and the deliverables
            handed off to the regional planning team. Hover a tile to focus it.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filterChips.map((chip) => {
            const active = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={`group inline-flex items-center gap-2 px-4 h-[40px] border font-display font-bold text-[12px] uppercase tracking-[0.1em] transition-all duration-200 ease-[var(--ease-in-out-soft)] ${
                  active
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper text-ink border-ink hover:bg-amber-wash hover:border-volt'
                }`}
              >
                {chip.label}
                <span
                  className={`font-mono text-[10px] ${
                    active ? 'text-amber' : 'text-ink-faint group-hover:text-volt'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        layout
        onMouseLeave={() => setHoveredId(null)}
        variants={gridStagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
        style={{ gridAutoFlow: 'row dense' }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const isFocus = hoveredId === item.id;
            const isDimmed = hoveredId !== null && !isFocus;
            const onEnter = () => setHoveredId(item.id);
            const sharedProps = {
              key: item.id,
              focus: isFocus,
              dimmed: isDimmed,
              onMouseEnter: onEnter,
              onFocus: onEnter
            };
            if (item.kind === 'metro') return <MetroCard metro={item} {...sharedProps} />;
            if (item.kind === 'finding') return <FindingCard finding={item} {...sharedProps} />;
            return <DeliverableCard item={item} {...sharedProps} />;
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
