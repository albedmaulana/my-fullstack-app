export default function MenuModal() {
  return (
    <div className="fixed inset-0 z-[60] bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto hidden">
      <div className="bg-background max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
        <button className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-xl p-2 rounded-full transition-all">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[400px] lg:h-auto">
            <img className="w-full h-full object-cover" data-alt="Detailed close up of grilled salmon steak with herbs and a side of microgreens on a premium ceramic plate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm3qL2HB68oYFQRG6YqlVWpvwrVMth9eXaLX8wzvh6c6unvT7E3SeKlYcNc1t9RcU_vkEMcHvi7Fym3vFr7iJ60a6AhINalRtKdVM1a1XOcBHPowpT5_Y4mjo14nimB_1e3ZcDgOwLlcS7FBWG9MeFY1KsQ5rprXGKg1fYQIAOHNfkzKVECOA470KCuWCNu26iPSll4M3DUfCBcCFMifIOGVq5QoOSJGc_OFSiLweaodCa98ec7wZnX67-WIrCv_piqBHTl3l1bbM" alt="Detailed close up of grilled salmon steak" />
          </div>
          <div className="p-10 md:p-14">
            <div className="mb-8">
              <span className="label-md text-primary font-bold tracking-widest uppercase mb-2 block">Menu Utama - Senin Siang</span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-4 leading-none">Salmon Panggang Asparagus</h2>
              <p className="text-on-surface-variant leading-relaxed">Ikan salmon segar pilihan yang dipanggang dengan teknik slow-roast untuk menjaga tekstur juicy, disajikan dengan asparagus organik dan saus lemon butter ringan.</p>
            </div>
            <div className="space-y-6 mb-10">
              <h4 className="font-headline font-bold text-lg text-on-surface border-b border-surface-container pb-2">Rincian Nutrisi</h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between items-center border-b border-surface-container-low pb-2">
                  <span className="text-on-surface-variant">Energi</span>
                  <span className="font-bold">450 Kkal</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-container-low pb-2 text-primary">
                  <span className="text-on-surface-variant">Protein</span>
                  <span className="font-bold">34 g</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-container-low pb-2 text-secondary">
                  <span className="text-on-surface-variant">Karbohidrat</span>
                  <span className="font-bold">15 g</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-container-low pb-2 text-error">
                  <span className="text-on-surface-variant">Lemak Total</span>
                  <span className="font-bold">22 g</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-container-low pb-2">
                  <span className="text-on-surface-variant">Serat</span>
                  <span className="font-bold">4.5 g</span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-container-low pb-2">
                  <span className="text-on-surface-variant">Gula</span>
                  <span className="font-bold">2 g</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-grow py-4 rounded-xl editorial-gradient text-on-primary font-bold shadow-xl shadow-primary/20 transition-transform active:scale-95">Tambahkan ke Log Makan</button>
              <button className="p-4 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>bookmark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
