import { useState, useEffect } from 'react';

export default function StatisticalHighlight() {
  const [stats, setStats] = useState({ porsi: 0, sekolah: 0, wilayah: 0 });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://my-fullstack-app-api.vercel.app/api/statistik');
        const result = await res.json();
        const data = Array.isArray(result) ? result : (result.data || []);

        const porsi = data.reduce((acc, d) => acc + (d.realisasi_porsi || d.total_porsi || 0), 0);
        const sekolah = data.reduce((acc, d) => acc + (d.jangkauan_sekolah || 0), 0);
        setStats({ porsi, sekolah, wilayah: data.length });
      } catch (e) { console.error(e); }
    })();
  }, []);

  const formatNum = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toLocaleString('id-ID');

  return (
    <section className="relative -mt-20 z-20 px-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-8 rounded-2xl editorial-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">restaurant</span>
          <h3 className="text-4xl font-headline font-extrabold text-on-surface mb-2">{formatNum(stats.porsi)}</h3>
          <p className="text-outline font-label uppercase tracking-widest text-xs">Porsi Terkirim</p>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-2xl editorial-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">school</span>
          <h3 className="text-4xl font-headline font-extrabold text-on-surface mb-2">{formatNum(stats.sekolah)}</h3>
          <p className="text-outline font-label uppercase tracking-widest text-xs">Sekolah Penerima</p>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-2xl editorial-shadow flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">map</span>
          <h3 className="text-4xl font-headline font-extrabold text-on-surface mb-2">{stats.wilayah}</h3>
          <p className="text-outline font-label uppercase tracking-widest text-xs">Wilayah Terjangkau</p>
        </div>
      </div>
    </section>
  );
}
