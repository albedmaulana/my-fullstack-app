export default function AspirasiFooter() {
  return (
    <footer className="w-full py-16 px-8 bg-white border-t border-slate-100 transition-opacity">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-screen-2xl mx-auto">
        <div className="space-y-6">
          <div className="text-lg font-bold text-[#2D7A4F] font-headline">Makanan Bergizi</div>
          <p className="text-slate-500 font-['Inter'] text-sm leading-relaxed max-w-xs">
            Inisiatif nasional untuk memastikan setiap anak Indonesia mendapatkan akses nutrisi seimbang untuk masa depan gemilang.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">language</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-2">
          <div className="space-y-4">
            <h5 className="text-on-surface font-bold text-sm tracking-widest uppercase font-headline">Program</h5>
            <ul className="space-y-3 font-['Inter'] text-sm">
              <li><a className="text-slate-500 hover:text-[#2D7A4F] underline-offset-4 hover:underline" href="#">Tentang Program</a></li>
              <li><a className="text-slate-500 hover:text-[#2D7A4F] underline-offset-4 hover:underline" href="#">Kontak Layanan</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-on-surface font-bold text-sm tracking-widest uppercase font-headline">Dukungan</h5>
            <ul className="space-y-3 font-['Inter'] text-sm">
              <li><a className="text-slate-500 hover:text-[#2D7A4F] underline-offset-4 hover:underline" href="#">Pusat Bantuan</a></li>
              <li><a className="text-slate-500 hover:text-[#2D7A4F] underline-offset-4 hover:underline" href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-16 pt-8 border-t border-slate-50">
        <p className="text-slate-400 text-sm font-['Inter']">© 2024 Makanan Bergizi. The Nutritional Curator Editorial.</p>
      </div>
    </footer>
  );
}
