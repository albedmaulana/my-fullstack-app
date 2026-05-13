import TopNavBar from '../TopNavBar';
import HeroSection from '../HeroSection';
import StatisticalHighlight from '../StatisticalHighlight';
import MenuTodayPreview from '../MenuTodayPreview';
import GalleryPreview from '../GalleryPreview';
import NewsPreview from '../NewsPreview';
import Footer from '../Footer';

export default function HomePage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-16">
        <HeroSection />
        <StatisticalHighlight />
        <MenuTodayPreview />
        <GalleryPreview />
        <NewsPreview />
      </main>
      <Footer />
    </>
  );
}
