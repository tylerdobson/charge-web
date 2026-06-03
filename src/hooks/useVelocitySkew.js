import {
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useReducedMotion
} from 'framer-motion';

/**
 * Directional scroll-velocity skew. Maps scroll speed into a tight skewY range
 * and smooths it with a heavy spring so grid cells gently compress while the
 * page is moving and snap back to flat the instant it settles.
 *
 * Returns a MotionValue (degrees) — apply via style={{ skewY }} on a wrapper
 * that also has `transform-gpu`/`will-change-transform`. Honors reduced motion
 * by collapsing the range to zero.
 */
export function useVelocitySkew() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Tight ±3° range (not ±4°) keeps text crisp during the skew.
  const rawSkew = useTransform(scrollVelocity, [-2000, 2000], reduce ? [0, 0] : [-3, 3]);
  return useSpring(rawSkew, { stiffness: 180, damping: 26, mass: 1 });
}
