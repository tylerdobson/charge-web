import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { site } from '../data/portfolio.js';
import { useParallax } from '../hooks/useParallax.js';
import MagneticButton from './MagneticButton.jsx';

const EDITORIAL = [0.16, 1, 0.3, 1];

const cascade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EDITORIAL } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } }
};

const eyebrowStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.0 } }
};

/* Per-character clip reveal: each glyph translates up from a hidden clip with
   a slight rotate + tracking expansion, staggered by index. Honors reduced
   motion by rendering plain text. */
const charVariant = {
  hidden: { y: '105%', rotate: 4, letterSpacing: '-0.08em' },
  show: (i) => ({
    y: '0%',
    rotate: 0,
    letterSpacing: '0em',
    transition: { ease: EDITORIAL, duration: 1.2, delay: 0.15 + i * 0.025 }
  })
};

function SplitText({ text, className = '', delayOffset = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  const chars = Array.from(text);
  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={`${ch}-${i}`} className="clip-text-container" aria-hidden="true">
          <motion.span
            className="reveal-char"
            custom={i + delayOffset}
            variants={charVariant}
            initial="hidden"
            animate="show"
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const blob1 = useParallax(0.14);
  const blob2 = useParallax(0.22);
  const blob3 = useParallax(0.08);

  // Mouse-reactive mesh: track cursor as a 0–100% coordinate, smoothed with a
  // spring so the gradient warp trails the cursor with weight.
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 1 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 1 });

  const meshBg = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(38% 46% at ${x}% ${y}%, rgba(0, 103, 71, 0.42), transparent 60%),` +
    `radial-gradient(42% 50% at ${100 - x}% ${100 - y}%, rgba(255, 107, 53, 0.34), transparent 62%)`
  );
  // Subtle petal drift toward the cursor.
  const petalX = useTransform(sx, [0, 100], [-2.5, 2.5]);
  const petalY = useTransform(sy, [0, 100], [-2, 2]);

  const handleMove = (e) => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative overflow-hidden bg-paper border-b border-ink paper-grain"
    >
      {/* Mouse-reactive mesh wash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{ background: meshBg, opacity: 0.6 }}
      />

      {/* Parallax orb backdrop */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={blob1}
          className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full mix-blend-screen will-change-transform"
          style={{
            background: 'radial-gradient(closest-side, rgba(255, 107, 53, 0.55), transparent 75%)',
            transform: 'translate3d(0, var(--parallax-y, 0px), 0)'
          }}
        />
        <div
          ref={blob2}
          className="absolute top-1/3 -right-32 w-[640px] h-[640px] rounded-full mix-blend-screen will-change-transform"
          style={{
            background: 'radial-gradient(closest-side, rgba(255, 181, 194, 0.65), transparent 72%)',
            transform: 'translate3d(0, var(--parallax-y, 0px), 0)'
          }}
        />
        <div
          ref={blob3}
          className="absolute bottom-[-220px] left-1/4 w-[760px] h-[760px] rounded-full mix-blend-screen will-change-transform"
          style={{
            background: 'radial-gradient(closest-side, rgba(0, 103, 71, 0.32), transparent 70%)',
            transform: 'translate3d(0, var(--parallax-y, 0px), 0)'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-12 lg:gap-16 items-end"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Copy column */}
          <div className="min-w-0">
            <motion.div className="flex items-center gap-3 mb-4" variants={eyebrowStagger}>
              <motion.span className="inline-block w-2 h-2 bg-orange" variants={cascade} />
              <motion.span
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-deep"
                variants={cascade}
              >
                01 &middot; The Question
              </motion.span>
              <motion.span className="hidden sm:inline-block w-px h-3 bg-ink-faint" variants={cascade} />
              <motion.span
                className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.22em] text-volt"
                variants={cascade}
              >
                Voltway Networks × Demo
              </motion.span>
            </motion.div>
            <motion.div
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint"
              variants={cascade}
            >
              A working strategy report &middot; Week 2 of 10
            </motion.div>

            {/* Per-character clip-reveal headline */}
            <h1 className="font-display font-black uppercase tracking-[-0.05em] leading-[0.88] text-display-xl text-ink">
              <span className="block">
                <SplitText text="Charge" />
              </span>
              <span className="block text-orange">
                <SplitText text="Frontier." delayOffset={6} />
              </span>
            </h1>

            <motion.p
              className="mt-10 max-w-[44ch] text-lg lg:text-xl text-ink-soft leading-snug"
              variants={cascade}
            >
              Where should Voltway add fast&#8209;charging hubs next? A chaptered commercial strategy report &mdash;
              50 metros, 60 markets, six analytical lenses, and a four&#8209;phase recommendation for the
              next decade of the network.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap gap-3" variants={cascade}>
              <MagneticButton>
                <Link
                  to="/case-studies"
                  className="group inline-flex items-center gap-2 bg-ink text-paper px-6 h-[52px] font-display font-bold text-sm uppercase tracking-[0.08em] hover:bg-navy transition-colors duration-200 ease-[var(--ease-in-out-soft)]"
                >
                  See the case studies
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/thesis"
                  className="inline-flex items-center gap-2 bg-paper text-ink border border-ink px-6 h-[52px] font-display font-bold text-sm uppercase tracking-[0.08em] hover:bg-amber-wash hover:border-volt transition-colors duration-200 ease-[var(--ease-in-out-soft)]"
                >
                  Read the thesis
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-ink" variants={cascade}>
              {[
                ['Report', site.brand],
                ['Subject', site.subject],
                ['Team', site.team],
                ['Horizon', site.window]
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`py-5 pr-4 pl-4 first:pl-0 ${
                    i === 0 ? '' : 'sm:border-l border-ink'
                  } ${i % 2 === 1 ? 'border-l sm:border-l' : ''} ${i < 2 ? 'border-b sm:border-b-0' : ''}`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    {label}
                  </dt>
                  <dd className="mt-2 font-display font-semibold text-base text-ink">{value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Mask cutout with breathing mesh that drifts toward the cursor */}
          <motion.div
            className="relative h-[480px] lg:h-[560px] w-full"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: EDITORIAL, delay: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 mask-petal overflow-hidden"
              role="img"
              aria-label="Abstract mesh gradient in orange, pink, and teal masked into an asymmetric petal shape"
              style={{ x: petalX, y: petalY }}
            >
              <motion.div
                className="absolute inset-[-8%] mesh-warm"
                animate={{
                  scale: [1, 1.07, 1.02, 1],
                  x: ['0%', '2.5%', '-1.5%', '0%'],
                  y: ['0%', '-1.8%', '1.5%', '0%']
                }}
                transition={{
                  duration: 16,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute -inset-4 mask-petal border-2 border-ink -z-10"
            />
            {/* Stat overlay tag */}
            <motion.div
              className="absolute left-6 bottom-6 z-20 bg-ink text-paper px-4 py-3 max-w-[16ch] border-l-2 border-amber"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EDITORIAL, delay: 1.1 }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange">
                Working thesis
              </div>
              <div className="mt-1 font-display font-bold text-sm leading-tight">
                Dwell time is destiny.
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
