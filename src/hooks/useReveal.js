import { useEffect, useRef } from 'react';

/**
 * Adds `.is-visible` to the ref'd element when it enters the viewport.
 * Pair with `.reveal` or `.reveal-stagger` classes (defined in index.css)
 * to get a fade-in-up animation. One-shot — observer disconnects after
 * the first intersection so scroll-back doesn't re-trigger.
 *
 * Honors prefers-reduced-motion by immediately marking visible.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      node.classList.add('is-visible');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
