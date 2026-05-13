import { useState, useEffect } from 'react';

export default function MenuTodayPreview() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/menus');
        const result = await res.json();
        const data = Array.isArray(result) ? result : (result.data || []);

        // Tentukan hari ini dalam bahasa Indonesia
        const hariMap = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const hariIni = hariMap[new Date().getDay()];

        // Cari menu yang sesuai hari ini & status Active
        const menuHariIni = data.find(m => m.day === hariIni && m.status === 'Active')
          || data.find(m => m.day === hariIni) // fallback tanpa filter status
          || data.find(m => m.status === 'Active') // fallback menu aktif apapun
          || data[0]; // fallback menu pertama

        if (menuHariIni) setMenu(menuHariIni);
      } catch (e) { console.error(e); }
    })();
  }, []);

  const hariMap = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const hariIni = hariMap[new Date().getDay()];

  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <span className="text-secondary font-label font-bold uppercase tracking-widest mb-4 block">
              Menu Hari Ini — {hariIni}
            </span>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-8">Hidangan Seimbang &amp; Lezat</h2>
            <div className="bg-surface-container-lowest rounded-2xl p-8 editorial-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold font-label tracking-tighter">
                  {menu?.category || 'PREMIUM'}
                </div>
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-4">
                {menu ? menu.name : 'Memuat menu...'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-container/10 p-4 rounded-xl">
                  <p className="text-primary font-bold text-2xl">{menu ? menu.energy : '—'}</p>
                  <p className="text-sm text-outline">Kkal Energi</p>
                </div>
                <div className="bg-secondary-container/10 p-4 rounded-xl">
                  <p className="text-secondary font-bold text-2xl">{menu ? `${menu.protein}g` : '—'}</p>
                  <p className="text-sm text-outline">Protein</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 text-outline-variant">
                <span className="material-symbols-outlined">check_circle</span>
                <p className="text-sm">Tersertifikasi Higienis &amp; Halal</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square rounded-2xl overflow-hidden editorial-shadow transform rotate-3">
              <img className="w-full h-full object-cover" src={menu?.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8nnph-vutnnrBIjYbOTyN9qMMJTvuZIpbn-6wqy86XyE4mPRaHFKaRki5WAdf39kyL31_NCiBlZAJOY7U9z9ZH1PBEgIuStlnLoqbZw9CqpaPl1g5MRMiC4WGeMC5hQn3kQtqr2tm4jHjXBYpnrAY_rqW-gKWAfsDy_at9F2x6pGmcurSZvHoNi1vr2SQRVSi_Pm9-OsUtyf5jukxrG9l_6EHoO1NtSU3Ubpu1UfENv_oFNfzo8ovs8bI6AHCdz595aI_s4Lmu1k'} alt={menu?.name || 'Menu hari ini'} />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full flex items-center justify-center editorial-shadow transform -rotate-12 border-4 border-white">
              <p className="text-white font-headline font-extrabold text-center leading-tight">GIZI<br/>TINGGI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
