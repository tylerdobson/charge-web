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
