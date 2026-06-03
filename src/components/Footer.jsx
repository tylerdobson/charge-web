import { Link } from 'react-router-dom';
import { site, sitemap } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';

export default function Footer() {
  const ref = useReveal({ threshold: 0.05 });

  return (
    <footer id="read" className="bg-paper-off text-ink border-t border-rule">
      {/* Top brand color strip */}
      <div aria-hidden="true" className="h-1 w-full flex">
        <div className="flex-[2] bg-amber" />
        <div className="flex-[3] bg-orange" />
        <div className="flex-[2] bg-volt" />
        <div className="flex-[1] bg-navy" />
      </div>

      <div ref={ref} className="reveal mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Brand + sitemap */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_repeat(5,minmax(0,1fr))] gap-10 pb-12 border-b border-ink/15">
          {/* Brand block */}
          <div className="max-w-[36ch]">
            <div className="font-display font-bold tracking-[-0.04em] text-3xl">
              {site.shortName}
              <span className="text-orange">.</span>
            </div>
            <p className="mt-4 text-[15px] text-ink/70 leading-relaxed">
              {site.report} &mdash; a 10&#8209;week commercial strategy report analyzing where a
              fictional EV charging network should allocate fast&#8209;charging hub capacity over the
              next decade.
            </p>

            {/* Brand stamps */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-navy bg-paper border border-ink px-3 py-1">
                Voltway Networks
              </span>
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-amber border border-amber px-3 py-1">
                Sample data
              </span>
            </div>

            {/* Working draft pill */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-orange text-ink text-[11px] font-mono uppercase tracking-[0.14em]">
              <span className="w-2 h-2 bg-paper animate-pulse" />
              Working draft &middot; Week 2 of 10
            </div>
          </div>

          {/* Sitemap columns */}
          {sitemap.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const className =
                    'group inline-flex items-center gap-1.5 text-[13px] text-ink/80 hover:text-ink transition-colors duration-200 ease-[var(--ease-in-out-soft)]';
                  const inner = (
                    <>
                      <span className="block w-0 group-hover:w-3 h-px bg-amber transition-all duration-200 ease-[var(--ease-in-out-soft)]" />
                      {link.label}
                    </>
                  );
                  if (link.external || !link.to) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href || link.to}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                          className={className}
                        >
                          {inner}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={link.label}>
                      <Link to={link.to} className={className}>
                        {inner}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="py-8 border-b border-ink/15 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
              Email
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block font-display font-semibold text-ink hover:text-orange-bright transition-colors duration-200"
            >
              {site.email}
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
              Source
            </div>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block font-display font-semibold text-ink hover:text-amber transition-colors duration-200"
            >
              View the code
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
              Team
            </div>
            <div className="mt-1 font-display font-semibold text-ink">
              {site.team} &middot; <span className="text-ink/70 font-normal">{site.teamRole}</span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-wrap justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.14em] text-ink/55">
          <div>
            &copy; 2026 {site.brand} &middot; Design + data demo &middot;{' '}
            <span className="text-amber">Fictional sample data</span>
          </div>
          <div>{site.locations}</div>
          <div>v0.2 &middot; refactor 2026-05-27</div>
        </div>
      </div>
    </footer>
  );
}
