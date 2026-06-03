import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const variants = {
  initial: { opacity: 0, y: 18 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] }
  }
};

// Vertical wipe curtain — a dark panel with a volt leading edge that covers on
// route exit and retracts on enter. Kept fast (0.5s) so nav stays snappy.
const curtain = {
  initial: { scaleY: 1 },
  enter: { scaleY: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { scaleY: 1, transition: { duration: 0.4, ease: [0.7, 0, 0.3, 1] } }
};

export default function PageTransition({ children, label }) {
  const reduce = useReducedMotion();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <motion.main
      key={pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      aria-label={label}
      className="min-h-[60vh]"
    >
      {!reduce && (
        <motion.div
          aria-hidden="true"
          variants={curtain}
          style={{ transformOrigin: 'top' }}
          className="fixed inset-0 z-[60] pointer-events-none bg-paper-deep"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-volt" />
        </motion.div>
      )}
      {children}
    </motion.main>
  );
}
