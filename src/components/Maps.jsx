import { deliverables, metros } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import { useParallax } from '../hooks/useParallax.js';
import MapDisplay from './MapDisplay.jsx';

const ACCENT_BAR = {
  teal: 'bg-teal',
  'pink-deep': 'bg-pink-deep',
  navy: 'bg-navy',
  orange: 'bg-orange'
};

// Marker / corridor data per dossier — drop-in compatible with MapDisplay.
// `src` is left empty; replace with /map-national.jpg etc. when ready.
const ATLAS = {
  'national-map': {
    src: null,
    caption: '17 metros · 10 hubs · 4 regions',
    markers: [
      { x: 12, y: 30, kind: 'mill', label: 'West Hub' },
      { x: 38, y: 38, kind: 'mill', label: 'Central Hub' },
      { x: 68, y: 30, kind: 'mill', label: 'East Hub' },
      { x: 18, y: 64, kind: 'metro', label: 'Phoenix' },
      { x: 44, y: 70, kind: 'metro', label: 'DFW' },
      { x: 50, y: 80, kind: 'metro', label: 'Houston' },
      { x: 72, y: 64, kind: 'metro', label: 'Atlanta' },
      { x: 80, y: 80, kind: 'metro', label: 'Tampa' },
      { x: 28, y: 22, kind: 'metro', label: 'Minneapolis' },
      { x: 56, y: 24, kind: 'metro', label: 'Chicago' }
    ]
  },
  'southeast-map': {
    src: null,
    caption: 'DFW → Atlanta → Tampa corridor',
    markers: [
      { x: 14, y: 30, kind: 'metro', label: 'DFW' },
      { x: 46, y: 28, kind: 'metro', label: 'Atlanta' },
      { x: 78, y: 72, kind: 'metro', label: 'Tampa' },
      { x: 30, y: 55, kind: 'route', label: 'Lane A' },
      { x: 62, y: 52, kind: 'route', label: 'Lane B' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 }
    ]
  }
};

export default function Maps() {
  const headRef = useReveal();
  const gridRef = useReveal({ threshold: 0.05 });
  const shapeRef = useParallax(0.05);

  const maps = deliverables.filter((d) => d.category === 'map');

  return (
    <section
      id="atlas"
      className="relative overflow-hidden bg-paper-off border-b border-ink"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          ref={shapeRef}
          className="absolute -right-32 top-1/4 w-[480px] h-[480px] rounded-full mix-blend-multiply will-change-transform"
          style={{
            background:
              'radial-gradient(closest-side, rgba(61, 194, 198, 0.20), transparent 72%)',
            transform: 'translate3d(0, var(--parallax-y, 0px), 0)'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24">
        <div
          ref={headRef}
          className="reveal grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start mb-12 lg:mb-16"
        >
          <aside className="lg:sticky lg:top-24">
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-teal border-t-2 border-teal pt-3">
              07 · The Atlas
            </span>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint leading-relaxed max-w-[28ch]">
              The corridor read spatially. 17 metros, 10 hubs, four regions.
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
                <span className="inline-block w-2.5 h-2.5 bg-navy" />
                Voltway hub
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
                <span className="inline-block w-2.5 h-2.5 bg-orange rounded-full" />
                Core 5 metro
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-faint">
                <span className="inline-block w-2.5 h-2.5 bg-amber rounded-full" />
                Lane / waypoint
              </div>
            </div>
          </aside>

          <div>
            <h2 className="font-display font-black uppercase tracking-[-0.045em] leading-[0.95] text-display-md text-ink">
              Read the corridor<br />
              <span className="text-teal">on the map.</span>
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
              Dwell time is destiny in charging — the maps make that argument visible. The
              National view shows the South-Sunbelt frontier; the Southeast Corridor
              zooms in on DFW → Atlanta → Tampa, where four of the five Core 5 metros
              live and most of the power-cost question lives with them.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {maps.map((m) => {
            const atlas = ATLAS[m.id] || {};
            return (
              <article
                key={m.id}
                id={m.id}
                className="card-hover relative flex flex-col bg-paper border border-ink transition-all duration-200 ease-[var(--ease-in-out-soft)]"
              >
                <div className={`h-1.5 w-full ${ACCENT_BAR[m.accent]}`} aria-hidden="true" />

                <div className="p-6 lg:p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 border border-ink text-ink">
                      {m.tag}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                      {m.meta}
                    </span>
                  </div>

                  <h3 className="font-display font-black uppercase tracking-[-0.04em] leading-[0.95] text-[clamp(32px,3.8vw,52px)] text-ink">
                    {m.title}
                  </h3>

                  <p className="text-[15px] leading-relaxed text-ink-soft max-w-[54ch]">
                    {m.body}
                  </p>

                  <MapDisplay
                    src={atlas.src}
                    alt={m.title}
                    caption={atlas.caption}
                    markers={atlas.markers || []}
                    lines={atlas.lines || []}
                    ratio="16/10"
                  />

                  <div className="mt-2 pt-4 border-t border-rule flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                    <span>
                      {m.id === 'national-map'
                        ? '17 metros · 10 hubs · 4 regions'
                        : `${metros.length} Core 5 metros · 3-leg corridor`}
                    </span>
                    <a
                      href={m.href}
                      className="inline-flex items-center gap-2 text-ink hover:text-teal transition-colors duration-200"
                    >
                      Open dossier <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
