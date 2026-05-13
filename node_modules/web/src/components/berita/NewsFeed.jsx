import { useState, useEffect } from 'react';

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/berita?status=Published');
        const result = await res.json();
        setArticles(result.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatDateLong = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>
      <section className="px-8 py-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Kabar Terbaru</h2>
              <div className="h-1 w-20 bg-primary mt-2"></div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-primary font-bold italic">Memuat berita...</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">Belum ada berita.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {articles.map(article => (
                <article key={article.id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                    <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={article.gambar || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'} alt={article.judul} />
                  </div>
                  <div className="md:w-3/5 p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-bold tracking-wider uppercase">{article.kategori}</span>
                      <time className="text-sm text-outline font-medium">{formatDate(article.publishedAt || article.createdAt)}</time>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                      {article.judul}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      {article.ringkasan}
                    </p>
                    <button
                      onClick={() => setSelected(article)}
                      className="mt-auto inline-flex items-center gap-2 text-primary font-bold group/link cursor-pointer bg-transparent border-none text-left"
                    >
                      Selengkapnya
                      <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail Berita */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            
            {/* Header Gambar */}
            <div className="relative h-72 md:h-80 overflow-hidden shrink-0">
              <img className="w-full h-full object-cover" src={selected.gambar || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200'} alt={selected.judul} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-bold tracking-wider uppercase">{selected.kategori}</span>
                  <span className="px-4 py-1.5 bg-primary/80 backdrop-blur-md text-white rounded-full text-xs font-bold">{selected.status}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-white leading-tight">{selected.judul}</h2>
              </div>
            </div>

            {/* Konten */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 md:p-12">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                    <span className="text-sm font-medium">{formatDateLong(selected.publishedAt || selected.createdAt)}</span>
                  </div>
                  {selected.penulis && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="material-symbols-outlined text-lg">person</span>
                      <span className="text-sm font-medium">{selected.penulis}</span>
                    </div>
                  )}
                </div>

                {/* Ringkasan */}
                {selected.ringkasan && (
                  <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 mb-8">
                    <p className="text-primary font-medium italic leading-relaxed">{selected.ringkasan}</p>
                  </div>
                )}

                {/* Isi Artikel */}
                <div className="prose prose-lg max-w-none text-on-surface leading-loose">
                  {(selected.konten || selected.isi || '').split('\n').map((paragraph, i) => (
                    paragraph.trim() && <p key={i} className="mb-4 text-on-surface-variant">{paragraph}</p>
                  ))}
                  {!selected.konten && !selected.isi && (
                    <p className="text-on-surface-variant">{selected.ringkasan}</p>
                  )}
                </div>

                {/* Tags */}
                {selected.tags && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100">
                    {selected.tags.split(',').map((tag, i) => (
                      <span key={i} className="px-4 py-2 bg-surface-container-low rounded-full text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="material-symbols-outlined text-lg">share</span>
                Bagikan artikel ini
              </div>
              <button onClick={() => setSelected(null)} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
