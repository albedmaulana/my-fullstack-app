export default function MenuFooter() {
  return (
    <footer className="w-full py-12 px-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-screen-2xl mx-auto">
        <div className="space-y-4">
          <div className="text-lg font-bold text-[#2D7A4F] font-headline">Makanan Bergizi</div>
          <p className="text-slate-500 dark:text-slate-400 font-body text-sm leading-relaxed max-w-xs">
            Menciptakan standar baru dalam pengalaman makan sehat melalui kurasi editorial dan data gizi yang akurat.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-on-surface font-bold font-headline mb-2">Navigasi</h5>
          <a className="text-slate-500 dark:text-slate-400 text-sm hover:text-[#2D7A4F] transition-opacity underline-offset-4 hover:underline" href="#">Tentang Program</a>
          <a className="text-slate-500 dark:text-slate-400 text-sm hover:text-[#2D7A4F] transition-opacity underline-offset-4 hover:underline" href="#">Kontak Layanan</a>
          <a className="text-slate-500 dark:text-slate-400 text-sm hover:text-[#2D7A4F] transition-opacity underline-offset-4 hover:underline" href="#">Pusat Bantuan</a>
          <a className="text-slate-500 dark:text-slate-400 text-sm hover:text-[#2D7A4F] transition-opacity underline-offset-4 hover:underline" href="#">Kebijakan Privasi</a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-on-surface font-bold font-headline mb-2">Media Sosial</h5>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#">
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-4">© 2024 Makanan Bergizi. The Nutritional Curator Editorial.</p>
        </div>
      </div>
    </footer>
  );
}
