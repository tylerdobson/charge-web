import Hero from '../components/Hero.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function HomePage() {
  return (
    <PageTransition label="Home — Charge Frontier">
      <Hero />
    </PageTransition>
  );
}
