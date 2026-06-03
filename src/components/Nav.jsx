import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site, navLinks } from '../data/portfolio.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper border-b transition-[border-color,box-shadow] duration-200 ease-[var(--ease-in-out-soft)] ${
        scrolled ? 'border-ink shadow-[0_1px_0_0_rgba(0,103,71,0.18)]' : 'border-rule'
      }`}
    >
      {/* Brand hairline */}
      <motion.div
        aria-hidden="true"
        className="h-1 w-full flex origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="flex-[2] bg-navy" />
        <div className="flex-[3] bg-orange" />
        <div className="flex-[2] bg-volt" />
        <div className="flex-[1] bg-amber" />
      </motion.div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 h-[68px] flex items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-baseline gap-3 no-underline text-ink hover:text-navy transition-colors duration-200 ease-[var(--ease-in-out-soft)]"
        >
          <span className="font-display font-bold text-2xl tracking-[-0.04em] leading-none">
            {site.shortName}
            <span className="text-orange">.</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {site.tagline}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-underline px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors duration-200 ease-[var(--ease-in-out-soft)]"
                >
                  {link.label}
                </a>
              );
            }
            const matchTarget = link.matchPath || link.to.split('#')[0];
            const isActive = pathname === matchTarget || (matchTarget !== '/' && pathname.startsWith(matchTarget));
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`nav-underline relative px-3 py-2 text-sm font-medium transition-colors duration-200 ease-[var(--ease-in-out-soft)] ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-rule"
                    className="absolute left-2 right-2 -bottom-px h-[2px] bg-volt"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        <Link
          to="/case-studies"
          className="group inline-flex items-center gap-2 bg-orange text-white px-4 sm:px-5 h-[44px] font-display font-bold text-[13px] uppercase tracking-[0.12em] border border-orange hover:bg-orange-deep hover:border-orange-deep transition-all duration-200 ease-[var(--ease-in-out-soft)]"
        >
          Read the Report
          <span
            aria-hidden="true"
            className="text-base leading-none transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
