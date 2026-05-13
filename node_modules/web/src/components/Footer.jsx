export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
        <div className="space-y-4">
          <div className="text-lg font-bold text-[#2D7A4F] font-['Inter']">Makanan Bergizi</div>
          <p className="text-slate-500 dark:text-slate-400 font-['Inter'] text-sm leading-relaxed max-w-xs">
            Inisiatif nasional untuk menciptakan masa depan Indonesia yang lebih kuat melalui nutrisi yang tepat sejak dini.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity font-['Inter'] text-sm" href="#">Tentang Program</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity font-['Inter'] text-sm" href="#">Kontak Layanan</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity font-['Inter'] text-sm" href="#">Pusat Bantuan</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-[#2D7A4F] underline-offset-4 hover:underline transition-opacity font-['Inter'] text-sm" href="#">Kebijakan Privasi</a>
        </div>
        <div className="flex flex-col md:items-end justify-center">
          <p className="text-slate-500 dark:text-slate-400 font-['Inter'] text-sm leading-relaxed md:text-right">
            © 2024 Makanan Bergizi.<br/>The Nutritional Curator Editorial.
          </p>
          <div className="flex gap-4 mt-4">
            <span className="material-symbols-outlined text-slate-400 hover:text-[#2D7A4F] cursor-pointer" data-icon="language">language</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-[#2D7A4F] cursor-pointer" data-icon="public">public</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
