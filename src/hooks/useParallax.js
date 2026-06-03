import { useEffect, useRef } from 'react';

/**
 * Subtle scroll-driven parallax for background shapes. Sets a CSS variable
 * `--parallax-y` on the ref'd element equal to (scrollY * speed) px, so the
 * consumer can apply transform: translate3d(0, var(--parallax-y), 0).
 *
 * Speed 0.15 = moves at 15% of scroll. Honors prefers-reduced-motion (no-op).
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY * speed;
      node.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
