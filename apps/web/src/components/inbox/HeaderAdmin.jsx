import React from 'react';

const HeaderAdmin = () => {
  return (
    /* - pt-10: Dikurangi dari 16 ke 10 agar tulisan naik lebih ke atas.
       - pb-3: Dikurangi dari 5 ke 3 untuk mengecilkan tinggi kotak header secara signifikan.
       - bg-white: Tetap menggunakan warna putih bersih.
    */
    <header className="w-full pt-10 pb-3 px-10 mb-6 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-sm transition-all">
      <div className="flex flex-col items-start">
        {/* Badge Pill Management - py-0.5 agar lebih tipis */}
        <div className="inline-flex items-center py-0.5 px-2.5 rounded-full bg-emerald-50 border border-emerald-100 mb-1">
          <span className="text-emerald-700 font-bold text-[8px] tracking-widest uppercase">
            Inbox Management
          </span>
        </div>
        
        {/* Judul Utama - text-2xl agar lebih ringkas dan proporsional dengan kotak yang kecil */}
        <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">
          Kotak Masuk
        </h2>
      </div>

      <div className="flex items-center pb-0.5">
        {/* Search Bar - py-1.5 untuk kotak input yang lebih tipis */}
        <div className="relative hidden lg:block group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors text-sm">
            search
          </span>
          <input 
            className="pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs w-72 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 focus:bg-white transition-all" 
            placeholder="Cari pesan..." 
            type="text"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;