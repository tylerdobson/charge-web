import { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Full-screen intro overlay. Plays exactly once per browser session
 * (sessionStorage gate is in the consumer — App.jsx). Calls onComplete
 * after the dwell window so AnimatePresence in the parent can run the
 * slide-up exit and unmount the node.
 *
 * Visual choreography:
 *  0.00s  blob enters (scale, opacity), border-radius morph begins
 *  0.25s  "Charge" slides in from left
 *  0.60s  "Frontier" slides in from right
 *  1.00s  "×" symbol scales in (overshoot)
 *  1.30s  caption fades in
 *  2.30s  parent triggers onComplete → exit (slide up, 1.05s)
 */
const STORAGE_KEY = 'charge-frontier-splash-seen';

export function markSplashSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch (err) {
    /* sessionStorage may be unavailable */
  }
}

export function hasSeenSplash() {
  if (typeof window === 'undefined') return true;
  try {
    return Boolean(sessionStorage.getItem(STORAGE_KEY));
  } catch (err) {
    return false;
  }
}

export default function SplashLoader({ onComplete, dwellMs = 2300 }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      markSplashSeen();
      onComplete?.();
    }, dwellMs);
    return () => window.clearTimeout(t);
  }, [onComplete, dwellMs]);

  return (
    <motion.div
      key="splash"
      role="status"
      aria-label="Charge Frontier — loading"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-paper"
    >
      {/* Animated color-burst blob */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        initial={{ scale: 0.55, opacity: 0, borderRadius: '60% 40% 55% 45% / 50% 50% 50% 50%' }}
        animate={{
          scale: [0.55, 1.05, 1, 1.06, 5.2],
          opacity: [0, 1, 1, 1, 1],
          borderRadius: [
            '60% 40% 55% 45% / 50% 50% 50% 50%',
            '38% 62% 70% 30% / 65% 40% 60% 35%',
            '55% 45% 32% 68% / 40% 60% 30% 70%',
            '70% 30% 55% 45% / 30% 65% 35% 70%',
            '50% 50% 50% 50%'
          ]
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.2, 0.55, 0.8, 1],
          ease: [0.65, 0, 0.35, 1]
        }}
        style={{
          width: '70vmax',
          height: '70vmax',
          filter: 'blur(72px)',
          mixBlendMode: 'screen',
          background:
            'radial-gradient(48% 48% at 36% 42%, rgba(255, 107, 53, 0.92), transparent 70%), radial-gradient(50% 52% at 70% 58%, rgba(0, 103, 71, 0.88), transparent 70%), radial-gradient(60% 60% at 50% 100%, rgba(10, 44, 95, 0.78), transparent 70%)'
        }}
      />

      {/* Counter swirl — small accent, slow rotate */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[18%] top-[22%] will-change-transform"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: [0, 0.7, 0.7, 0], rotate: 180 }}
        transition={{ duration: 2.6, ease: 'easeInOut', times: [0, 0.25, 0.8, 1] }}
        style={{
          width: '24vmax',
          height: '24vmax',
          borderRadius: '50%',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(207, 196, 147, 0.85), transparent 70%)'
        }}
      />

      {/* Center lock-up */}
      <div className="relative z-10 grid place-items-center min-h-full px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-5 lg:gap-9">
            <motion.div
              initial={{ opacity: 0, x: -48, filter: 'blur(10px)' }}
              animate={{
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
              }}
              className="font-display font-black uppercase tracking-[-0.04em] leading-none text-[clamp(64px,11vw,168px)] text-volt"
            >
              Charge
            </motion.div>

            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.25 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.45, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }
              }}
              className="font-display font-black text-orange text-[clamp(40px,7vw,108px)] leading-none"
            >
              ×
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: 48, filter: 'blur(10px)' }}
              animate={{
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
              }}
              className="flex flex-col items-start"
            >
              <span className="font-display font-black uppercase tracking-[-0.03em] leading-[0.92] text-[clamp(32px,5vw,72px)] text-ink">
                Front<br />ier
              </span>
            </motion.div>
          </div>

          {/* Working strip under the lock-up */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] } }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint"
          >
            <span className="inline-block w-2 h-2 bg-orange animate-pulse" />
            Charge Frontier · 2026 · Working draft
            <span className="hidden sm:inline-block w-px h-3 bg-ink-faint" />
            <span className="hidden sm:inline text-volt">Week 02 / 10</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline brand strip */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-1 flex origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, transition: { duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      >
        <div className="flex-[3] bg-orange" />
        <div className="flex-[2] bg-volt" />
        <div className="flex-[2] bg-navy" />
        <div className="flex-[1] bg-amber" />
      </motion.div>
    </motion.div>
  );
}
