import { useState, useEffect } from 'react';

export default function GallerySection() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/galeri');
        const result = await res.json();
        setGaleri(result.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <section className="px-8 py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">Galeri Dokumentasi</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Sekilas momen bermakna dalam perjalanan kami menyebarkan semangat hidup sehat dan bergizi di seluruh Indonesia.</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-primary font-bold italic">Memuat galeri...</div>
        ) : galeri.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">Belum ada foto dokumentasi.</div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galeri.map(item => (
              <div key={item.id} className="group relative rounded-3xl overflow-hidden cursor-pointer break-inside-avoid">
                <img className="w-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.gambar} alt={item.judul} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <p className="text-white font-bold">{item.judul}</p>
                    <p className="text-white/70 text-xs">{item.lokasi || 'Indonesia'}, {item.tahun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
