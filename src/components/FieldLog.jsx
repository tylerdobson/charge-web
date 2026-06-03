import { weeks } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';

const STATUS = {
  Complete: 'bg-volt text-paper border-volt',
  'In progress': 'bg-orange text-paper border-orange',
  Planned: 'bg-paper text-ink border-ink'
};

const STATUS_RAIL_DOT = {
  Complete: 'bg-volt ring-volt',
  'In progress': 'bg-orange ring-orange',
  Planned: 'bg-paper ring-ink'
};

export default function FieldLog() {
  const headRef = useReveal();
  const listRef = useReveal({ threshold: 0.04 });

  return (
    <section id="field-log" className="bg-paper-off border-t border-ink border-b">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24">
        <div ref={headRef} className="reveal grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start mb-12 lg:mb-16">
          <aside>
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-volt border-t-2 border-volt pt-3">
              05 &middot; The Field Log
            </span>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-orange text-paper text-[11px] font-mono uppercase tracking-[0.14em]">
              <span className="w-2 h-2 bg-paper animate-pulse" />
              Week 2 of 10
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint leading-relaxed max-w-[28ch]">
              The planned ten-week arc. Weeks 1 – 2 reflect what has actually happened.
              Weeks 3 – 10 are the planned arc, tracked live.
            </div>
          </aside>

          <div>
            <h2 className="font-display font-black uppercase tracking-[-0.045em] leading-[0.95] text-display-md text-ink">
              Ten weeks of<br />planning.
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
              From project kickoff on May 18 to the leadership panel on July 24. The planning arc
              compressed into ten ordered phases, each anchored to a stakeholder, a deliverable,
              and a measurable outcome.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <ol
          ref={listRef}
          className="reveal-stagger relative grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule border border-ink"
        >
          {weeks.map((w, i) => (
            <li
              key={w.week}
              className="card-hover relative bg-paper flex gap-5 p-6 lg:p-7 transition-all duration-200 ease-[var(--ease-in-out-soft)]"
            >
              {/* Status dot rail */}
              <div className="flex flex-col items-center pt-1">
                <span
                  className={`block w-3 h-3 ${STATUS_RAIL_DOT[w.status]} ring-2 ring-offset-2 ring-offset-paper`}
                />
                {i !== weeks.length - 1 && (
                  <span aria-hidden="true" className="hidden lg:block w-px flex-1 bg-rule mt-2" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                    {w.week}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {w.range}
                  </span>
                  <span
                    className={`inline-block font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 border ${STATUS[w.status]}`}
                  >
                    {w.status}
                  </span>
                </div>
                <h3 className="font-display font-bold tracking-[-0.02em] leading-[1.1] text-[22px] lg:text-[26px] text-ink">
                  {w.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft max-w-[60ch]">
                  {w.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
