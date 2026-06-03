import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

/**
 * Count-up number that triggers when scrolled into view. Parses the input
 * string into `{ prefix, number, suffix }` so values like "+122.5%" or "45%"
 * animate the numeric portion and keep their prefix/suffix intact.
 *
 * Honors prefers-reduced-motion by jumping straight to the target.
 */
export default function CountUp({ value, duration = 1.6, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const motionValue = useMotionValue(0);

  // Parse "+122.5%" → { prefix: '+', n: 122.5, suffix: '%', decimals: 1 }
  const match = String(value).match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : '';
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;

  const display = useTransform(motionValue, (v) => {
    const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${n}${suffix}`;
  });

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isInView) return;
    if (reduced) {
      motionValue.set(target);
      return;
    }
    const controls = animate(motionValue, target, {
      duration,
      ease: [0.16, 1, 0.3, 1]
    });
    return () => controls.stop();
  }, [isInView, target, duration, motionValue]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${target}${suffix}`}>
      <motion.span aria-hidden="true">{display}</motion.span>
    </span>
  );
}
