import TopNavBar from '../TopNavBar';
import StatistikHeader from './StatistikHeader';
import ImpactSummary from './ImpactSummary';
import Visualizations from './Visualizations';
import DistributionTable from './DistributionTable';
import StatistikFooter from './StatistikFooter';

export default function StatistikPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-28 pb-16 px-8 max-w-screen-2xl mx-auto">
        <StatistikHeader />
        <ImpactSummary />
        <Visualizations />
        <DistributionTable />
      </main>
      <StatistikFooter />
    </>
  );
}
