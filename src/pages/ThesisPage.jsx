import ChapterIndex from '../components/ChapterIndex.jsx';
import Thesis from '../components/Thesis.jsx';
import Findings from '../components/Findings.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function ThesisPage() {
  return (
    <PageTransition label="The Thesis — Charge Frontier">
      <ChapterIndex />
      <Thesis />
      <Findings />
    </PageTransition>
  );
}
