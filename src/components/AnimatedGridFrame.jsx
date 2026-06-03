import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EDITORIAL = [0.16, 1, 0.3, 1];

/**
 * Draws the structural skeleton of a CSS-grid container as animated vectors.
 *
 * It measures the *real* layout of the grid's cells (via offset metrics, which
 * are immune to CSS transforms like the reveal-stagger entrance) and renders
 * the perimeter plus every internal seam as an SVG line. On scroll-in, each
 * line draws itself with Framer Motion `pathLength`, staggered.
 *
 * Because it reads actual cell boundaries, the frame stays perfectly aligned
 * across every responsive breakpoint (1 / 2 / 4 columns). Pass the SAME ref
 * that is attached to the grid element.
 *
 * Reduced motion: lines render fully drawn, no animation.
 */
export default function AnimatedGridFrame({
  gridRef,
  stroke = 'var(--color-ink)',
  strokeWidth = 1,
  className = ''
}) {
  const reduce = useReducedMotion();
  const [m, setM] = useState({ w: 0, h: 0, xs: [], ys: [] });

  const measure = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const xset = [0, w];
    const yset = [0, h];
    Array.from(el.children).forEach((c) => {
      if (!(c instanceof HTMLElement)) return;
      xset.push(c.offsetLeft, c.offsetLeft + c.offsetWidth);
      yset.push(c.offsetTop, c.offsetTop + c.offsetHeight);
    });
    const dedupe = (arr) => {
      const s = [...arr].sort((a, b) => a - b);
      const out = [];
      s.forEach((v) => {
        if (!out.length || Math.abs(v - out[out.length - 1]) > 1.5) out.push(v);
      });
      return out;
    };
    setM({ w, h, xs: dedupe(xset), ys: dedupe(yset) });
  }, [gridRef]);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;
    measure();
    const raf = requestAnimationFrame(measure);
    const settle = setTimeout(measure, 900); // re-measure after entrance settles
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [gridRef, measure]);

  const { w, h, xs, ys } = m;
  if (!w || !h) return null;

  const innerXs = xs.slice(1, -1);
  const innerYs = ys.slice(1, -1);

  // Perimeter drawn first, then internal verticals, then internal horizontals.
  const lines = [
    [0, 0, w, 0],
    [w, 0, w, h],
    [w, h, 0, h],
    [0, h, 0, 0],
    ...innerXs.map((x) => [x, 0, x, h]),
    ...innerYs.map((y) => [0, y, w, y])
  ];

  const lineVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { ease: EDITORIAL, duration: 1.1, delay: i * 0.07 },
        opacity: { duration: 0.2, delay: i * 0.07 }
      }
    })
  };

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {lines.map((ln, i) => (
        <motion.line
          key={`${ln.join('-')}-${i}`}
          x1={ln[0]}
          y1={ln[1]}
          x2={ln[2]}
          y2={ln[3]}
          stroke={stroke}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          variants={reduce ? undefined : lineVariant}
          custom={i}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.15 }}
        />
      ))}
    </svg>
  );
}
