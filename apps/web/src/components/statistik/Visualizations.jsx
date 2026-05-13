import { useState, useEffect } from 'react';

export default function Visualizations() {
  const [wilayahData, setWilayahData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://my-fullstack-app-api.vercel.app/api/statistik');
        const result = await res.json();
        const data = Array.isArray(result) ? result : (result.data || []);
        setWilayahData(data);
      } catch (e) { console.error(e); }
    })();
  }, []);

  // Total untuk persentase
  const totalAllPorsi = wilayahData.reduce((acc, d) => acc + (d.realisasi_porsi || d.total_porsi || 0), 0);

  // Sort untuk chart
  const sorted = [...wilayahData].sort((a, b) => (b.realisasi_porsi || 0) - (a.realisasi_porsi || 0));

  // Warna batang yang bervariasi
  const barColors = [
    'bg-primary', 'bg-emerald-500', 'bg-teal-500', 'bg-green-600',
    'bg-emerald-600', 'bg-primary/80', 'bg-teal-600', 'bg-green-500',
    'bg-emerald-400', 'bg-primary/60'
  ];

  // Warna donut
  const colors = ['stroke-primary', 'stroke-secondary', 'stroke-tertiary', 'stroke-[#6B4EAB]', 'stroke-[#C17F3E]', 'stroke-emerald-400', 'stroke-teal-500'];
  const dotColors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-[#6B4EAB]', 'bg-[#C17F3E]', 'bg-emerald-400', 'bg-teal-500'];

  // Hitung persentase untuk donut
  const wilayahPct = sorted.slice(0, 6).map(w => ({
    ...w,
    pct: totalAllPorsi > 0 ? Math.round(((w.realisasi_porsi || 0) / totalAllPorsi) * 100) : 0
  }));

  // Donut segments
  let offset = 0;
  const donutSegments = wilayahPct.map((w, i) => {
    const segment = { dasharray: `${w.pct} ${100 - w.pct}`, offset: -offset, color: colors[i] || colors[0] };
    offset += w.pct;
    return segment;
  });

  // Max untuk skala batang
  const maxPorsi = Math.max(...wilayahData.map(d => d.realisasi_porsi || 0), 1);
  const maxTarget = Math.max(...wilayahData.map(d => d.target_penerima || 0), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Bar Chart: Realisasi vs Target per Wilayah */}
      <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-headline font-bold mb-1">Realisasi per Wilayah</h3>
            <p className="text-sm text-on-surface-variant">Perbandingan target dan realisasi distribusi porsi</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-primary/30"></span>
              <span className="text-[10px] font-bold text-slate-400">Target</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-primary"></span>
              <span className="text-[10px] font-bold text-slate-400">Realisasi</span>
            </div>
          </div>
        </div>

        {wilayahData.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-slate-400 italic">Memuat data...</div>
        ) : (
          <>
            {/* Y-Axis Scale */}
            <div className="flex gap-4 h-72">
              <div className="flex flex-col justify-between text-[9px] text-slate-300 font-bold py-1 w-10 text-right">
                <span>{maxTarget.toLocaleString('id-ID')}</span>
                <span>{Math.round(maxTarget * 0.75).toLocaleString('id-ID')}</span>
                <span>{Math.round(maxTarget * 0.5).toLocaleString('id-ID')}</span>
                <span>{Math.round(maxTarget * 0.25).toLocaleString('id-ID')}</span>
                <span>0</span>
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end gap-2 border-l border-b border-slate-100 pl-2 pb-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pl-2">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="border-t border-dashed border-slate-50 w-full"></div>
                  ))}
                </div>

                {wilayahData.map((w, i) => {
                  const targetPct = maxTarget > 0 ? ((w.target_penerima || 0) / maxTarget) * 100 : 0;
                  const realisasiPct = maxTarget > 0 ? ((w.realisasi_porsi || 0) / maxTarget) * 100 : 0;
                  return (
                    <div key={w.id || i} className="flex-1 flex items-end gap-[2px] relative group">
                      {/* Target Bar */}
                      <div
                        className="flex-1 bg-primary/15 rounded-t-md transition-all hover:bg-primary/25 relative"
                        style={{ height: `${Math.max(targetPct, 3)}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          T: {(w.target_penerima || 0).toLocaleString('id-ID')}
                        </div>
                      </div>
                      {/* Realisasi Bar */}
                      <div
                        className={`flex-1 ${barColors[i % barColors.length]} rounded-t-md transition-all hover:opacity-80 relative`}
                        style={{ height: `${Math.max(realisasiPct, 3)}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          R: {(w.realisasi_porsi || 0).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex gap-2 mt-2 ml-14">
              {wilayahData.map((w, i) => (
                <div key={w.id || i} className="flex-1 text-center">
                  <span className="text-[8px] font-bold text-slate-400 leading-tight block truncate px-0.5">
                    {w.wilayah?.replace(/Kab\.\s?|Kota\s?/gi, '').split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Donut Chart: Sebaran Wilayah */}
      <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col">
        <h3 className="text-xl font-headline font-bold mb-6">Sebaran Wilayah</h3>
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle className="stroke-surface-container-high" cx="18" cy="18" fill="none" r="15.915" strokeWidth="3"></circle>
            {donutSegments.map((seg, i) => (
              <circle key={i} className={seg.color} cx="18" cy="18" fill="none" r="15.915"
                strokeDasharray={seg.dasharray} strokeDashoffset={seg.offset} strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-outfit font-bold">{wilayahData.length}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Wilayah</span>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          {wilayahPct.map((w, i) => (
            <div key={w.id || i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${dotColors[i] || dotColors[0]}`}></span>
                <span className="text-sm font-medium truncate max-w-[120px]">{w.wilayah}</span>
              </div>
              <span className="text-sm font-bold">{w.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
