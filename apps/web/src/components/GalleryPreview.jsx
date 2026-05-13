import { useState, useEffect } from 'react';

export default function GalleryPreview() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/galeri');
        const result = await res.json();
        setPhotos((result.data || []).slice(0, 4));
      } catch (e) { console.error(e); }
    })();
  }, []);

  // Fallback images jika belum ada data dari API
  const fallbackImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAdN1v0fOJuDRjAJrbglaOcfiEvB8sVF3R_L9pW46HDtqwWiCzmlegILAj5ME8xjQYUallDJIJpF-nY-noF0g4huscGgwpb4DiwufIzgMXF4QA0skQfobrgXU3P9xPCOCIQIT396QZ653cbDousJKXOJmjikW1gzbFiAvyypp4NBDZQM5G1eucePtzl3VaT-3TnNDP74S90vnnYIhumGYtk2JKrhwW0VxC2pE30FKSh2OG_p7nLyz9Mb4-KezhB2K893IDgucNlFZo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlIEujv1JHv3sXlRU4OIsO-7HFnSAk1XcausKsOeYGPotWAtQk-O7dGAvsDCV0BVXM10VuVTcXoLUNUNTwEECbilig5iDHI9QjCb7TRczhWEf-_pt3w-NS-Yvq_5rwg9fsc6o4bYNrMX4CqDf_Eg_InLweXpFXkAdlA6Qe3KYSBmGR8ft93o23iUgmOKSiU1QtCfLG55BTF1qEhRDlPLI4jB1G3omROwo4ymiIvHvFAMZuc5QSUL2iJj5ITZ-cMQz_ZIn9d2fJ2b0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqon2uSKOEN5WBgZym5uowxYlgHKy4dc2kI-bJYDYiydJN4uQK6H0lsJC31h4SXZMAPP-aJZoWU1jnXfkdb6nNMq7bn60Jd9lVCRTh56gZiPRfnEjBMNYQp7QXKyQwb9ry5kmL3M3R4_Q8ingc1loOTxtgHzs9B90GV6VnYURume0IsV2Qwuxf6r1zCuJ4wg5y-sdQRJ2rOLemTVrnUUD2kxwYdBrKBpzAfLDhBB8ETo3f5U1kC7FN5863HrrP81K6-Uqy5Ek-dZs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLFETGajTv3KxggQb5o6sNyqOmKcFK5TKgbMX5ZCvS5BO3qJGYxf34_EKNA3iNa4zSY33GAHBzaQsrhfC1xT9WjqrGHN4UTigUh97GPijvF8SENXo2kAF_T3ou0lOwwyrBcGMcwMgZdNoMkM4zDlN9XnXOOMMUa_4LBM4QXH_EUlx36JMInOtemZe-8qCDuPHkjAkpqwmkQPwpe61VduydkmVcWiihPouVNvJhy2PqYvIDXdgitXuFhNWk7nKBSGN9H9Lils7KBBY'
  ];

  const gridSpans = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1'
  ];

  const images = photos.length > 0
    ? photos.map(p => ({ src: p.gambar, alt: p.judul }))
    : fallbackImages.map((src, i) => ({ src, alt: `Dokumentasi ${i + 1}` }));

  return (
    <section className="py-24 px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface">Momen Keceriaan Sekolah</h2>
          <p className="text-outline max-w-2xl mx-auto mt-4 text-lg">Melihat dampak langsung dari setiap porsi nutrisi yang disalurkan ke berbagai penjuru daerah.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <div key={i} className={`${gridSpans[i] || 'col-span-1 row-span-1'} rounded-2xl overflow-hidden editorial-shadow group`}>
              <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
