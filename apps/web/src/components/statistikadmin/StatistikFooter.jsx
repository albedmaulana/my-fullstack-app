import React from 'react';

const StatistikFooter = () => {
  return (
    <footer className="w-full py-12 px-12 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Kolom 1: Logo & Hak Cipta */}
      <div>
        <h4 className="text-lg font-bold text-[#2D7A4F] mb-4">Makanan Bergizi</h4>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
          © 2024 Makanan Bergizi. Panel Kontrol Administrasi untuk pengelolaan nutrisi terpadu.
        </p>
      </div>

      {/* Kolom 2: Tautan Pengelola */}
      <div className="flex flex-col gap-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Tautan Pengelola
        </h5>
        <a className="text-slate-500 hover:text-[#2D7A4F] transition-opacity text-sm" href="#">
          Standar Nutrisi Nasional
        </a>
        <a className="text-slate-500 hover:text-[#2D7A4F] transition-opacity text-sm" href="#">
          Panduan Higienitas
        </a>
        <a className="text-slate-500 hover:text-[#2D7A4F] transition-opacity text-sm" href="#">
          Laporan Bulanan
        </a>
      </div>

      {/* Kolom 3: Bantuan Teknis */}
      <div className="flex flex-col gap-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Bantuan Teknis
        </h5>
        <a className="text-slate-500 hover:text-[#2D7A4F] transition-opacity text-sm" href="#">
          Hubungi IT Support
        </a>
        <a className="text-slate-500 hover:text-[#2D7A4F] transition-opacity text-sm" href="#">
          Dokumentasi API
        </a>
      </div>
    </footer>
  );
};

export default StatistikFooter;