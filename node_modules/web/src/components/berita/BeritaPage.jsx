import TopNavBar from '../TopNavBar';
import BeritaHeader from './BeritaHeader';
import NewsFeed from './NewsFeed';
import GallerySection from './GallerySection';
import NewsletterCTA from './NewsletterCTA';
import BeritaFooter from './BeritaFooter';

export default function BeritaPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-24">
        <BeritaHeader />
        <NewsFeed />
        <GallerySection />
        <NewsletterCTA />
      </main>
      <BeritaFooter />
    </>
  );
}
