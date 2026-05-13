import { useState, useEffect } from 'react';

export default function ImpactSummary() {
  const [stats, setStats] = useState({ totalPorsi: 0, totalSekolah: 0, totalWilayah: 0, cakupanPct: 0 });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/statistik');
        const result = await res.json();
        const data = Array.isArray(result) ? result : (result.data || []);

        const totalPorsi = data.reduce((acc, d) => acc + (d.total_porsi || d.realisasi_porsi || 0), 0);
        const totalSekolah = data.reduce((acc, d) => acc + (d.jangkauan_sekolah || 0), 0);
        const totalWilayah = data.length;
        const totalTarget = data.reduce((acc, d) => acc + (d.target_penerima || 0), 0);
        const totalRealisasi = data.reduce((acc, d) => acc + (d.realisasi_porsi || 0), 0);
        const cakupanPct = totalTarget > 0 ? Math.round((totalRealisasi / totalTarget) * 100) : 0;

        setStats({ totalPorsi, totalSekolah, totalWilayah, cakupanPct });
      } catch (e) { console.error(e); }
    })();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return { value: (num / 1000000).toFixed(2), suffix: 'Juta' };
    if (num >= 1000) return { value: (num / 1000).toFixed(1), suffix: 'Ribu' };
    return { value: num.toLocaleString('id-ID'), suffix: '' };
  };

  const porsi = formatNumber(stats.totalPorsi);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
        <p className="text-sm font-label font-bold text-on-surface-variant uppercase tracking-wider mb-4">Total Distribusi</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-outfit font-bold text-primary">{porsi.value}</span>
          {porsi.suffix && <span className="text-xl font-outfit font-semibold text-primary">{porsi.suffix}</span>}
        </div>
        <p className="text-xs text-slate-500">Porsi makanan bergizi tersalurkan</p>
      </div>
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <p className="text-sm font-label font-bold text-on-surface-variant uppercase tracking-wider mb-4">Sekolah Terjangkau</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-outfit font-bold text-secondary">{stats.totalSekolah.toLocaleString('id-ID')}</span>
        </div>
        <p className="text-xs text-slate-500">Institusi pendidikan dasar &amp; menengah</p>
      </div>
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <p className="text-sm font-label font-bold text-on-surface-variant uppercase tracking-wider mb-4">Cakupan Wilayah</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-outfit font-bold text-primary">{stats.cakupanPct}</span>
          <span className="text-xl font-outfit font-semibold text-primary">%</span>
        </div>
        <p className="text-xs text-slate-500">{stats.totalWilayah} wilayah aktif dalam program</p>
      </div>
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <p className="text-sm font-label font-bold text-on-surface-variant uppercase tracking-wider mb-4">Serapan Anggaran</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-outfit font-bold text-[#2D7A4F]">92.4</span>
          <span className="text-xl font-outfit font-semibold text-[#2D7A4F]">%</span>
        </div>
        <p className="text-xs text-slate-500">Efisiensi pemanfaatan dana program</p>
      </div>
    </div>
  );
}
