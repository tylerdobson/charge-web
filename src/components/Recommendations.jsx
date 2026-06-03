import { recommendations } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';

export default function Recommendations() {
  const headRef = useReveal();
  const listRef = useReveal({ threshold: 0.06 });

  return (
    <section id="recommendations" className="bg-paper border-b border-ink">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24">
        <div ref={headRef} className="reveal grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start mb-12">
          <aside>
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-orange-deep border-t-2 border-orange pt-3">
              06 &middot; The Recommendation
            </span>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint leading-relaxed max-w-[28ch]">
              Four phases, one corridor. Each phase buys the right to do the next.
            </div>
          </aside>
          <div>
            <h2 className="font-display font-black uppercase tracking-[-0.045em] leading-[0.95] text-display-md text-ink">
              Fix Texas. Win the<br />Southeast. Build the<br />
              <span className="text-orange">network.</span>
            </h2>
          </div>
        </div>

        <ol ref={listRef} className="reveal-stagger border-t border-ink">
          {recommendations.map((rec) => (
            <li
              key={rec.id}
              className="card-hover relative grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-12 py-8 lg:py-10 border-b border-ink"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-orange-deep">
                  {rec.horizon}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  {rec.phase}
                </span>
              </div>
              <div>
                <h3 className="font-display font-black tracking-[-0.03em] leading-[1.05] text-[clamp(28px,3.4vw,44px)] text-ink">
                  {rec.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft max-w-[64ch]">
                  {rec.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-12 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  <div>
                    <span className="text-ink-faint">Owners</span>
                    <div className="mt-1 text-ink font-sans normal-case tracking-normal text-[14px]">
                      {rec.owners}
                    </div>
                  </div>
                  <div>
                    <span className="text-ink-faint">Success metric</span>
                    <div className="mt-1 text-ink font-sans normal-case tracking-normal text-[14px] max-w-[40ch]">
                      {rec.metric}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
