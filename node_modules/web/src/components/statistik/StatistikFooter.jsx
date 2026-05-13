export default function StatistikFooter() {
  return (
    <footer className="w-full py-12 px-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
        <div className="space-y-4">
          <div className="text-lg font-bold text-[#2D7A4F]">Makanan Bergizi</div>
          <p className="text-slate-500 dark:text-slate-400 font-['Inter'] text-sm leading-relaxed max-w-xs">
            Inisiatif nasional untuk menciptakan generasi unggul melalui nutrisi yang tepat dan terukur.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">Program</h4>
            <ul className="space-y-2">
              <li><a className="text-slate-500 hover:text-[#2D7A4F] text-sm transition-colors" href="#">Tentang Program</a></li>
              <li><a className="text-slate-500 hover:text-[#2D7A4F] text-sm transition-colors" href="#">Pusat Bantuan</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><a className="text-slate-500 hover:text-[#2D7A4F] text-sm transition-colors" href="#">Kontak Layanan</a></li>
              <li><a className="text-slate-500 hover:text-[#2D7A4F] text-sm transition-colors" href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:items-end justify-between">
          <div className="flex gap-4 mb-8">
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-[#2D7A4F] hover:bg-primary-container hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-[#2D7A4F] hover:bg-primary-container hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
          <div className="text-slate-500 dark:text-slate-400 font-['Inter'] text-xs text-right">
            © 2024 Makanan Bergizi. The Nutritional Curator Editorial.
          </div>
        </div>
      </div>
    </footer>
  );
}
