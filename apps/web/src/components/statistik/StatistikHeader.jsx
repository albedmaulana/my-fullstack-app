export default function StatistikHeader() {
  return (
    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="max-w-3xl">
        <span className="text-secondary font-label font-bold tracking-widest text-xs uppercase mb-3 block">Transparansi Data</span>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tighter leading-none mb-6">Laporan Dampak &amp; Distribusi.</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Memantau kemajuan program nutrisi nasional secara real-time. Melalui data yang terukur, kami memastikan setiap porsi makanan mencapai tangan yang tepat di setiap penjuru wilayah.
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-surface-container-high px-4 py-3 rounded-xl">
          <span className="material-symbols-outlined text-[#2D7A4F]">calendar_today</span>
          <span className="text-sm font-semibold">Q4 2024</span>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">download</span>
          <span className="font-bold">Unduh PDF</span>
        </button>
      </div>
    </header>
  );
}
