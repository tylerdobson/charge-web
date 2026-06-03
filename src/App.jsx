import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import SplashLoader, { hasSeenSplash } from './components/SplashLoader.jsx';
import HomePage from './pages/HomePage.jsx';
import ThesisPage from './pages/ThesisPage.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

export default function App() {
  const location = useLocation();
  const [splashing, setSplashing] = useState(() => !hasSeenSplash());

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      {/* Macro film grain over the whole viewport */}
      <div aria-hidden="true" className="grain-overlay" />

      {/* Editorial margin frame — gutter rules + corner crosshairs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
        <div className="relative mx-auto h-full max-w-[1440px] px-6 lg:px-10">
          <span className="frame-rule" style={{ left: '2.5rem' }} />
          <span className="frame-rule" style={{ right: '2.5rem' }} />
          <span className="frame-cross" style={{ left: '2.5rem', top: '88px', transform: 'translate(-50%,-50%)' }}>+</span>
          <span className="frame-cross" style={{ right: '2.5rem', top: '88px', transform: 'translate(50%,-50%)' }}>+</span>
          <span className="frame-cross" style={{ left: '2.5rem', bottom: '24px', transform: 'translate(-50%,50%)' }}>+</span>
          <span className="frame-cross" style={{ right: '2.5rem', bottom: '24px', transform: 'translate(50%,50%)' }}>+</span>
        </div>
      </div>

      <AnimatePresence>
        {splashing && <SplashLoader onComplete={() => setSplashing(false)} />}
      </AnimatePresence>

      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/thesis" element={<ThesisPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
