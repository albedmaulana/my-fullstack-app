import { useState, useEffect } from 'react';

export default function DistributionTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/statistik');
        const result = await res.json();
        setData(Array.isArray(result) ? result : (result.data || []));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = data.filter(d =>
    d.wilayah?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase();
    if (s === 'SELESAI') return 'bg-emerald-100 text-primary';
    if (s === 'PROSES') return 'bg-amber-100 text-amber-700';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
        <div>
          <h3 className="text-xl font-headline font-bold">Data Rincian Wilayah</h3>
          <p className="text-sm text-on-surface-variant">Status distribusi harian per-wilayah administratif</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 w-64"
              placeholder="Cari wilayah..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center font-bold text-primary italic">Memuat data...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-xs font-label font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-5">Nama Wilayah</th>
                <th className="px-8 py-5">Jumlah Sekolah</th>
                <th className="px-8 py-5">Target Penerima</th>
                <th className="px-8 py-5">Realisasi (Porsi)</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-10 text-center text-slate-400">Tidak ada data ditemukan.</td></tr>
              ) : filtered.map(row => {
                const pct = row.target_penerima > 0 ? Math.round((row.realisasi_porsi / row.target_penerima) * 100) : 0;
                return (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-on-surface">{row.wilayah}</td>
                    <td className="px-8 py-5">{(row.jangkauan_sekolah || 0).toLocaleString('id-ID')} Sekolah</td>
                    <td className="px-8 py-5">{(row.target_penerima || 0).toLocaleString('id-ID')}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{(row.realisasi_porsi || 0).toLocaleString('id-ID')}</span>
                        <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`${getStatusStyle(row.status)} text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
