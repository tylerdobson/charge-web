import { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

/**
 * Print-magazine style chart wrapper. No grid lines, no axis lines, no
 * tooltips. Only the data and the labels. Animations are gated by
 * IntersectionObserver — the chart doesn't mount until it enters the
 * viewport, so recharts' built-in transition acts as a grow-from-zero
 * reveal on first read.
 *
 * Tokens map to CSS variables defined in @theme; falls back to literal hex
 * so server-render and tests still get the right swatch.
 */

const COLOR = {
  ink: 'var(--color-ink, #0B0B0E)',
  'ink-soft': 'var(--color-ink-soft, #2A2A30)',
  'ink-faint': 'var(--color-ink-faint, #6B6B72)',
  orange: 'var(--color-orange, #FF6B35)',
  'orange-deep': 'var(--color-orange-deep, #E45528)',
  navy: 'var(--color-navy, #0A2C5F)',
  'volt': 'var(--color-volt, #006747)',
  'amber': 'var(--color-amber-deep, #B5A971)',
  teal: 'var(--color-teal, #3DC2C6)'
};

const TICK_STYLE = {
  fontFamily: 'JetBrains Mono, ui-monospace, Menlo, monospace',
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fill: COLOR['ink-faint']
};

const LABEL_STYLE = {
  fontFamily: 'Inter Tight, Inter, system-ui, sans-serif',
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: '-0.01em',
  fill: COLOR.ink
};

function ValueLabel({ x, y, width, height, value, suffix = '', color }) {
  if (value === null || value === undefined) return null;
  const cx = x + width / 2;
  const isNeg = Number(value) < 0;
  const cy = isNeg ? y + height + 14 : y - 8;
  return (
    <text x={cx} y={cy} textAnchor="middle" style={{ ...LABEL_STYLE, fill: color || COLOR.ink }}>
      {value}
      {suffix}
    </text>
  );
}

export default function EditorialChart({
  type = 'bar',
  data = [],
  series = [{ dataKey: 'value', color: 'ink' }],
  height = 240,
  baseline = null,
  baselineLabel = '',
  valueSuffix = '',
  yDomain,
  labelKey = 'label',
  caption,
  ariaLabel
}) {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.25 });

  const accessibleSummary = ariaLabel ||
    `${caption || 'Chart'} — ${data.map((d) => `${d[labelKey]} ${d.value}${valueSuffix}`).join(', ')}`;

  return (
    <figure
      ref={wrapRef}
      className="relative"
      role="figure"
      aria-label={accessibleSummary}
    >
      <div className="border border-ink bg-paper">
        <div className="px-5 py-4 border-b border-ink flex items-center justify-between gap-3">
          <figcaption className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
            {caption}
          </figcaption>
          {baseline !== null && (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              Baseline · {baseline}
              {valueSuffix} {baselineLabel}
            </span>
          )}
        </div>

        <div style={{ height }} className="px-3 pt-6 pb-2">
          {inView ? (
            <ResponsiveContainer width="100%" height="100%">
              {type === 'line' ? (
                <LineChart data={data} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
                  <XAxis
                    dataKey={labelKey}
                    tickLine={false}
                    axisLine={false}
                    tick={TICK_STYLE}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={TICK_STYLE}
                    domain={yDomain || ['auto', 'auto']}
                    width={36}
                  />
                  {baseline !== null && (
                    <ReferenceLine
                      y={baseline}
                      stroke={COLOR['ink-faint']}
                      strokeDasharray="2 4"
                      strokeWidth={1}
                    />
                  )}
                  {series.map((s) => (
                    <Line
                      key={s.dataKey}
                      type="linear"
                      dataKey={s.dataKey}
                      stroke={COLOR[s.color] || COLOR.ink}
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 0, fill: COLOR[s.color] || COLOR.ink }}
                      activeDot={false}
                      isAnimationActive
                      animationDuration={1100}
                      animationEasing="ease-out"
                    />
                  ))}
                </LineChart>
              ) : (
                <BarChart data={data} margin={{ top: 24, right: 16, left: 8, bottom: 8 }}>
                  <XAxis
                    dataKey={labelKey}
                    tickLine={false}
                    axisLine={false}
                    tick={TICK_STYLE}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={TICK_STYLE}
                    domain={yDomain || ['auto', 'auto']}
                    width={36}
                  />
                  {baseline !== null && (
                    <ReferenceLine
                      y={baseline}
                      stroke={COLOR.ink}
                      strokeDasharray="3 4"
                      strokeWidth={1.5}
                    />
                  )}
                  {series.map((s) => (
                    <Bar
                      key={s.dataKey}
                      dataKey={s.dataKey}
                      isAnimationActive
                      animationDuration={1100}
                      animationEasing="ease-out"
                      label={(props) => (
                        <ValueLabel
                          {...props}
                          value={props.value}
                          suffix={valueSuffix}
                          color={COLOR[s.color] || COLOR.ink}
                        />
                      )}
                    >
                      {data.map((entry, idx) => (
                        <Cell
                          key={idx}
                          fill={COLOR[entry.color || s.color] || COLOR.ink}
                        />
                      ))}
                    </Bar>
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full" aria-hidden="true" />
          )}
        </div>

        <div className="px-5 py-3 border-t border-ink flex items-center justify-between gap-3 bg-paper-off">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            Source · ChargeIQ Q1 2026 · Voltway ledger
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-volt">
            Charge Frontier · Fig.
          </span>
        </div>
      </div>
    </figure>
  );
}
