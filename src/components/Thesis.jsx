import { motion } from 'framer-motion';
import { thesis } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import CountUp from './CountUp.jsx';

const TONE = {
  ink: 'text-ink',
  orange: 'text-orange',
  'volt': 'text-volt'
};

const drawRule = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
};

function DrawingRule({ thickness = 1, color = 'bg-ink', delay = 0, className = '' }) {
  return (
    <motion.hr
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={drawRule}
      style={{ originX: 0, transition: `delay ${delay}s` }}
      transition={{ delay }}
      className={`block w-full border-0 origin-left ${color} ${className}`}
      // Override border-style via inline height since <hr> defaults vary
    >
    </motion.hr>
  );
}

export default function Thesis() {
  const headRef = useReveal();
  const bodyRef = useReveal();

  return (
    <section id="thesis" className="bg-paper-off border-b border-ink">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
        {/* Section meta */}
        <aside ref={headRef} className="reveal lg:sticky lg:top-24">
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-orange-deep border-t-2 border-orange pt-3">
            {thesis.eyebrow}
          </span>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint leading-relaxed max-w-[24ch]">
            Drafted live during a ten-week network-planning project for a fictional EV charging operator.
          </div>
          <div className="mt-6 flex flex-col gap-1.5">
            {[
              { dot: 'bg-orange', label: 'Vibrant Orange' },
              { dot: 'bg-navy', label: 'Deep Blue' },
              { dot: 'bg-volt', label: 'Signal Green' },
              { dot: 'bg-amber', label: 'Warm Sand' }
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
                <span className={`inline-block w-2.5 h-2.5 ${s.dot}`} />
                {s.label}
              </div>
            ))}
          </div>
        </aside>

        {/* Statement + body */}
        <div>
          <p
            ref={bodyRef}
            className="reveal font-display font-bold tracking-[-0.04em] leading-[1.02] text-display-md text-ink"
          >
            {thesis.statement.parts.map((part, i) => (
              <span key={i} className={TONE[part.tone] || 'text-ink'}>
                {part.text}
              </span>
            ))}
          </p>

          {/* Drawing rule under statement */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="mt-10 h-px bg-ink"
            aria-hidden="true"
          />

          <div className="mt-10 grid gap-6 max-w-[64ch]">
            {thesis.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>

          {/* Drawing rule before proof row */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ originX: 0 }}
            className="mt-12 h-[2px] bg-volt"
            aria-hidden="true"
          />

          {/* Proof row — count-up stats */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {thesis.stats.map((stat, i) => (
              <motion.li
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`relative py-6 px-4 ${i === 0 ? 'pl-0' : 'border-l border-ink'} ${i < 3 ? 'border-b lg:border-b-0' : ''}`}
              >
                {i % 2 === 0 && (
                  <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-0.5 bg-amber" />
                )}
                <CountUp
                  value={stat.value}
                  className="font-display font-black tracking-[-0.04em] text-[36px] lg:text-[44px] leading-none text-ink block"
                />
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint leading-tight">
                  {stat.label}
                </div>
                <div className="mt-3 text-[11px] text-ink-faint italic">{stat.source}</div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Drawing rule after proof row */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ originX: 0 }}
            className="mt-0 h-px bg-ink"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
