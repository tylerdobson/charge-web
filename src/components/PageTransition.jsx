import { motion } from 'framer-motion';
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

export default function PageTransition({ children, label }) {
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
      {children}
    </motion.main>
  );
}
