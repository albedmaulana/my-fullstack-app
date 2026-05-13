import { useState, useEffect } from 'react';
import TopNavBar from '../TopNavBar';
import EditorialHeader from './EditorialHeader';
import MenuFooter from './MenuFooter';

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('Semua');
  const [selectedMenu, setSelectedMenu] = useState(null);

  const days = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://my-fullstack-app-api.vercel.app/api/menus');
        const result = await res.json();
        setMenus(Array.isArray(result) ? result : (result.data || []));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = activeDay === 'Semua' ? menus : menus.filter(m => m.day === activeDay);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-20">
        <EditorialHeader />

        {/* Weekly Tabs */}
        <section className="max-w-screen-2xl mx-auto px-8 mb-12">
          <div className="flex flex-wrap gap-3 items-center justify-center bg-surface-container-low p-2 rounded-full w-fit mx-auto shadow-sm">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  activeDay === day
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-container-high font-semibold'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        {/* Menu Grid */}
        <section className="max-w-screen-2xl mx-auto px-8">
          {loading ? (
            <div className="text-center py-16 text-primary font-bold italic">Memuat menu...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              {activeDay === 'Semua' ? 'Belum ada menu tersedia.' : `Belum ada menu untuk hari ${activeDay}.`}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map(menu => (
                <div key={menu.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={menu.img || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'}
                      alt={menu.name} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-widest">
                      {menu.category || 'Menu'}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                      {menu.day}
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-headline font-extrabold text-on-surface mb-1">{menu.name}</h3>
                    <p className="text-sm text-primary font-medium mb-4">{menu.day} — {formatDate(menu.date)}</p>
                    <p className="text-on-surface-variant text-sm mb-8 leading-relaxed line-clamp-2">
                      {menu.description || `Menu ${menu.category || 'Makan Siang'} bergizi tinggi.`}
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-surface-container-low p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-bold text-on-surface-variant/60 uppercase">Kkal</span>
                        <span className="text-sm font-bold text-on-surface">{menu.energy || 0}</span>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-bold text-primary/60 uppercase">Prot</span>
                        <span className="text-sm font-bold text-primary">{menu.protein || 0}g</span>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-bold text-secondary/60 uppercase">Karb</span>
                        <span className="text-sm font-bold text-secondary">{menu.karbo || 0}g</span>
                      </div>
                      <div className="bg-red-50 p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-bold text-error/60 uppercase">Lemk</span>
                        <span className="text-sm font-bold text-error">{menu.lemak || 0}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 pb-8">
                    <button onClick={() => setSelectedMenu(menu)}
                      className="w-full py-4 rounded-xl editorial-gradient text-on-primary font-bold transition-transform active:scale-95 flex items-center justify-center gap-2 group/btn">
                      Lihat Detail
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <MenuFooter />

      {/* Modal Detail Menu */}
      {selectedMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedMenu(null)}>
          <div className="bg-white rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in" onClick={e => e.stopPropagation()}>
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img className="w-full h-full object-cover" src={selectedMenu.img || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'} alt={selectedMenu.name} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-widest">
                {selectedMenu.category}
              </div>
            </div>
            <div className="md:w-3/5 p-8 md:p-10 flex flex-col overflow-y-auto">
              <button onClick={() => setSelectedMenu(null)} className="self-end text-slate-400 hover:text-slate-600 mb-4">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{selectedMenu.day}</span>
                <span className="text-sm text-slate-400">{formatDate(selectedMenu.date)}</span>
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-4">{selectedMenu.name}</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                {selectedMenu.description || 'Menu bergizi tinggi yang dirancang khusus untuk memenuhi kebutuhan nutrisi harian.'}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-container-low p-5 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-2xl mb-1">local_fire_department</span>
                  <p className="text-2xl font-bold text-on-surface">{selectedMenu.energy || 0}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase">Kalori (Kkal)</p>
                </div>
                <div className="bg-emerald-50 p-5 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-2xl mb-1">fitness_center</span>
                  <p className="text-2xl font-bold text-primary">{selectedMenu.protein || 0}g</p>
                  <p className="text-xs text-primary/60 font-bold uppercase">Protein</p>
                </div>
                <div className="bg-amber-50 p-5 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-secondary text-2xl mb-1">grain</span>
                  <p className="text-2xl font-bold text-secondary">{selectedMenu.karbo || 0}g</p>
                  <p className="text-xs text-secondary/60 font-bold uppercase">Karbohidrat</p>
                </div>
                <div className="bg-red-50 p-5 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-error text-2xl mb-1">water_drop</span>
                  <p className="text-2xl font-bold text-error">{selectedMenu.lemak || 0}g</p>
                  <p className="text-xs text-error/60 font-bold uppercase">Lemak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-500 mt-auto pt-4 border-t border-slate-100">
                <span className="material-symbols-outlined text-primary">verified</span>
                <p className="text-sm font-medium">Tersertifikasi Higienis & Halal</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
