import CaseStudies from '../components/CaseStudies.jsx';
import FieldLog from '../components/FieldLog.jsx';
import Recommendations from '../components/Recommendations.jsx';
import Maps from '../components/Maps.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function CaseStudiesPage() {
  return (
    <PageTransition label="Case Studies — Charge Frontier">
      <CaseStudies />
      <FieldLog />
      <Recommendations />
      <Maps />
    </PageTransition>
  );
}
