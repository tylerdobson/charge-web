import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Magnetic wrapper. Wraps a single child (button/Link/a) in a motion.span
 * that tilts toward the cursor on hover. Inner content counter-translates
 * at ~45% for subtle internal parallax.
 *
 * Honors prefers-reduced-motion by short-circuiting movement.
 */
export default function MagneticButton({ children, strength = 22, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });
  const innerX = useTransform(springX, (v) => v * 0.45);
  const innerY = useTransform(springY, (v) => v * 0.45);
  const rotate = useTransform(springX, (v) => (v / strength) * 1.4);

  const onMove = (e) => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY, rotate, display: 'inline-block' }}
      className={className}
    >
      <motion.span style={{ x: innerX, y: innerY, display: 'inline-block' }}>{children}</motion.span>
    </motion.span>
  );
}
