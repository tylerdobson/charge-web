import { chapters } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import { useParallax } from '../hooks/useParallax.js';

const ACCENT_TEXT = {
  orange: 'text-orange',
  'orange-deep': 'text-orange-deep',
  navy: 'text-navy',
  'volt': 'text-volt',
  'amber': 'text-amber-deep',
  teal: 'text-teal'
};

const ACCENT_BAR = {
  orange: 'bg-orange',
  'orange-deep': 'bg-orange-deep',
  navy: 'bg-navy',
  'volt': 'bg-volt',
  'amber': 'bg-amber',
  teal: 'bg-teal'
};

export default function ChapterIndex() {
  const headRef = useReveal();
  const gridRef = useReveal({ threshold: 0.04 });
  const shapeRef = useParallax(0.06);

  return (
    <section
      id="contents"
      aria-label="Report contents"
      className="relative overflow-hidden bg-paper border-b border-ink"
    >
      {/* Section-divider parallax shape */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          ref={shapeRef}
          className="absolute -right-24 top-1/2 w-[420px] h-[420px] -translate-y-1/2 rounded-full mix-blend-multiply will-change-transform"
          style={{
            background:
              'radial-gradient(closest-side, rgba(207, 196, 147, 0.45), transparent 72%)',
            transform: 'translate3d(0, var(--parallax-y, 0px), 0)'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-14 lg:py-20">
        {/* Header row */}
        <div
          ref={headRef}
          className="reveal grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 items-end mb-10 lg:mb-14"
        >
          <div>
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-volt border-t-2 border-volt pt-3">
              Contents
            </span>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint leading-relaxed max-w-[28ch]">
              Eight chapters · 50 metros · 60 markets · six lenses.
            </div>
          </div>

          <h2 className="font-display font-black uppercase tracking-[-0.045em] leading-[0.95] text-display-md text-ink">
            How to read this<br />
            <span className="text-volt">report.</span>
          </h2>
        </div>

        {/* Chapter grid — 8 cells, ledger style */}
        <ol
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-ink"
        >
          {chapters.map((chapter) => (
            <li key={chapter.number} className="bg-paper">
              <a
                href={`#${chapter.id}`}
                className="group relative flex flex-col gap-3 p-5 lg:p-6 h-full border-l-2 border-transparent hover:border-volt hover:bg-amber-wash transition-all duration-200 ease-[var(--ease-in-out-soft)]"
              >
                {/* Top accent rule */}
                <span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 right-0 h-1 ${ACCENT_BAR[chapter.accent]} opacity-70 group-hover:opacity-100 transition-opacity duration-200`}
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    Chapter
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint group-hover:text-volt transition-colors duration-200"
                  >
                    Jump →
                  </span>
                </div>

                <div className={`font-display font-black tracking-[-0.04em] leading-none text-[44px] lg:text-[52px] ${ACCENT_TEXT[chapter.accent]}`}>
                  {chapter.number}
                </div>

                <h3 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[20px] lg:text-[22px] text-ink">
                  {chapter.title}
                </h3>

                <p className="text-[13px] leading-snug text-ink-soft max-w-[28ch] mt-auto">
                  {chapter.blurb}
                </p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
