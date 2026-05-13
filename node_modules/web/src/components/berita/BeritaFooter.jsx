export default function BeritaFooter() {
  return (
    <footer className="w-full py-12 px-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto font-['Inter'] text-sm leading-relaxed">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-bold text-[#2D7A4F]">Makanan Bergizi</div>
          <p className="text-slate-500 dark:text-slate-400">Dedikasi untuk meningkatkan kualitas hidup bangsa melalui edukasi dan distribusi pangan bergizi yang merata.</p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2">Tautan Cepat</h4>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity" href="#">Tentang Program</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity" href="#">Kontak Layanan</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity" href="#">Pusat Bantuan</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity" href="#">Kebijakan Privasi</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-on-surface mb-2">Hubungi Kami</h4>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">mail</span>
            <span>halo@makananbergizi.id</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>Jakarta Pusat, Indonesia</span>
          </div>
          <div className="mt-4 flex gap-4">
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-xs">
        © 2024 Makanan Bergizi. The Nutritional Curator Editorial.
      </div>
    </footer>
  );
}
