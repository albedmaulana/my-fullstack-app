import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NewsPreview() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://my-fullstack-app-api.vercel.app/api/berita?limit=2');
        const result = await res.json();
        setArticles(result.data || []);
      } catch (e) { console.error(e); }
    })();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section className="py-24 px-8 bg-surface-container-high/50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface">Berita Terbaru</h2>
            <p className="text-outline mt-2">Pantau perkembangan program di seluruh wilayah Indonesia.</p>
          </div>
          <Link to="/berita" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Lihat Semua Berita <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 text-outline italic">Memuat berita...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map(article => (
              <div key={article.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row editorial-shadow">
                <div className="md:w-2/5 h-64 md:h-auto">
                  <img className="w-full h-full object-cover" src={article.gambar || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'} alt={article.judul} />
                </div>
                <div className="p-8 flex-1">
                  <span className="text-secondary font-label font-bold text-xs uppercase tracking-widest mb-2 block">{article.kategori}</span>
                  <h3 className="text-xl font-headline font-bold text-on-surface mb-4">{article.judul}</h3>
                  <p className="text-outline text-sm line-clamp-3 mb-6">{article.ringkasan}</p>
                  <span className="text-xs text-outline-variant font-label">{formatDate(article.publishedAt || article.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
