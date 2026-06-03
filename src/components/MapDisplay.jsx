import { motion, useReducedMotion } from 'framer-motion';

/**
 * High-contrast map placeholder. Drops in a topographic SVG base when no
 * `src` is provided; with a `src`, the image fills the same container and
 * the overlays (grain + pings + compass) sit on top.
 *
 * Markers are positioned by normalized {x, y} percentages so they sit
 * exactly the same whether the base is the placeholder topography or the
 * eventual real map.
 *
 *   kind: 'mill'   — navy square, no ping (fixed asset)
 *         'metro'  — orange dot + live radar telemetry (key location)
 *         'route'  — amber small dot + telemetry (waypoint)
 */

const TELEMETRY_COLOR = {
  metro: { ring: 'rgba(255,107,53,0.7)', beam: 'rgba(255,107,53,0.6)' },
  route: { ring: 'rgba(207,196,147,0.65)', beam: 'rgba(207,196,147,0.55)' }
};

const DOT_STYLES = {
  mill: {
    dot: 'w-3 h-3 bg-navy',
    ring: null,
    label: 'text-paper bg-navy'
  },
  metro: {
    dot: 'w-3 h-3 bg-orange',
    ring: 'bg-orange/70',
    label: 'text-ink bg-paper border border-ink'
  },
  route: {
    dot: 'w-2 h-2 bg-amber',
    ring: 'bg-amber/60',
    label: 'text-ink bg-amber-wash border border-amber-deep'
  }
};

function TopoBase() {
  // Brutalist topographic isobar pattern. Pure SVG — scales cleanly.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Subtle gradient base */}
      <defs>
        <linearGradient id="map-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3EFE0" />
          <stop offset="100%" stopColor="#E6E2D8" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="200" fill="url(#map-base)" />
      {/* Isobars — concentric warped ellipses */}
      <g stroke="#0B0B0E" strokeWidth="0.35" fill="none" opacity="0.45">
        {[18, 32, 46, 60, 74, 88, 102, 116, 130].map((r, i) => (
          <ellipse
            key={i}
            cx={210 - i * 4}
            cy={90 + i * 1.5}
            rx={r}
            ry={r * 0.58}
            transform={`rotate(${-12 + i * 1.5} 210 90)`}
          />
        ))}
        {[12, 22, 32, 42, 52, 62].map((r, i) => (
          <ellipse
            key={`a-${i}`}
            cx={70}
            cy={150}
            rx={r}
            ry={r * 0.72}
            transform={`rotate(${20 - i * 2.5} 70 150)`}
          />
        ))}
      </g>
      {/* Faint lat/long grid */}
      <g stroke="#0B0B0E" strokeWidth="0.25" opacity="0.15">
        {[40, 80, 120, 160, 200, 240, 280].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" />
        ))}
        {[20, 60, 100, 140, 180].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="320" y2={y} />
        ))}
      </g>
      {/* Coastal slash — diagonal landmass feel */}
      <path
        d="M -10 130 Q 60 100, 110 120 T 220 110 Q 280 105, 340 95 L 340 200 L -10 200 Z"
        fill="#0B0B0E"
        opacity="0.06"
      />
    </svg>
  );
}

function GrainOverlay({ opacity = 0.4 }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen', opacity }}
    >
      <filter id="film-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0.55 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain)" />
    </svg>
  );
}

function Marker({ x, y, kind = 'metro', label, ping = true }) {
  const reduce = useReducedMotion();
  const s = DOT_STYLES[kind] || DOT_STYLES.metro;
  const telemetry = ping && s.ring ? TELEMETRY_COLOR[kind] || TELEMETRY_COLOR.metro : null;
  const live = telemetry && !reduce;
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Live radar telemetry — three stacked layers */}
      {live && (
        <>
          {/* Layer 3 — rotating directional sweep beam */}
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${telemetry.beam} 0deg, transparent 70deg)`,
              maskImage: 'radial-gradient(circle, transparent 26%, #000 28%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 26%, #000 28%)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          />
          {/* Layer 2 — expanding sweep ring */}
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
            style={{ borderColor: telemetry.ring }}
            animate={{ scale: [1, 3.4], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, ease: 'easeOut', repeat: Infinity }}
          />
        </>
      )}
      {/* Layer 1 — breathing core dot */}
      <motion.span
        aria-hidden="true"
        className={`relative block ${s.dot} rounded-full border border-ink ring-2 ring-paper`}
        animate={live ? { scale: [0.95, 1.06, 0.95] } : undefined}
        transition={live ? { duration: 2.4, ease: 'easeInOut', repeat: Infinity } : undefined}
      />
      {/* Label tag */}
      {label && (
        <span
          className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] px-1.5 py-0.5 ${s.label}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function ConnectorLines({ markers, lines }) {
  if (!lines || !lines.length) return null;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      {lines.map((line, i) => {
        const a = markers[line.from];
        const b = markers[line.to];
        if (!a || !b) return null;
        return (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgb(255,107,53)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.15 }}
          />
        );
      })}
    </svg>
  );
}

export default function MapDisplay({
  src,
  alt = 'Map placeholder',
  markers = [],
  lines = [],
  caption,
  ratio = '16/10',
  showCompass = true,
  showGrain = true,
  grainOpacity = 0.35
}) {
  return (
    <div
      className="relative w-full bg-paper-deep border border-ink overflow-hidden"
      style={{ aspectRatio: ratio }}
    >
      {/* Base layer — real image when provided, topo placeholder otherwise */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'screen' }}
        />
      ) : (
        <TopoBase />
      )}

      {/* Film grain overlay — works the same over image or topo */}
      {showGrain && <GrainOverlay opacity={grainOpacity} />}

      {/* Connector lines (corridor) */}
      <ConnectorLines markers={markers} lines={lines} />

      {/* Compass + caption corners */}
      {showCompass && (
        <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.22em] text-volt-deep bg-paper/80 px-1.5 py-0.5">
          N
        </div>
      )}
      {caption && (
        <div className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink bg-paper/80 px-1.5 py-0.5">
          {caption}
        </div>
      )}

      {/* Markers — rendered last so they sit on top */}
      {markers.map((m, i) => (
        <Marker key={`${m.x}-${m.y}-${i}`} {...m} />
      ))}

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(11, 11, 14, 0.18) 100%)'
        }}
      />
    </div>
  );
}
