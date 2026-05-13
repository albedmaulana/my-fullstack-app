export default function FeatureSpotlight() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[600px]">
        <div className="md:col-span-2 md:row-span-2 bg-primary-container rounded-2xl p-10 flex flex-col justify-end relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 transition-transform duration-1000 group-hover:scale-110">
            <img className="w-full h-full object-cover" data-alt="Chef's hands preparing a fresh vegetable platter with vibrant colors and artistic arrangement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2NoVud-w8Kz-Nb8EJCJRFu-ppXd4ZkjebLq6SUJSG41Sa-sxQvDNiO4hArHO6B_74FH8BumxCeA_28bCAOSc_p6qpDSpPDiPkhLfYe6ONp3vu4K9wz7i_MgnPoubhQsQ0HzPyxhx-5FSyNnYEpAvPP5m-GhY2drD95JZWihfgbL7nA0nM4Hbqn91nKMaXGCRRlYImDTIACi6LyCghjeq1psPgmbEI4bU2MzWaZRxuD0E1mZ6OzQq4sX98sAHaR6kSd8GeLTWk8_A" alt="Chef's hands preparing food" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-headline font-extrabold text-on-primary-container mb-4">Filosofi <br/>Farm-to-Table</h2>
            <p className="text-on-primary-container/80 leading-relaxed max-w-sm">Setiap bahan makanan diambil langsung dari petani lokal mitra kami untuk menjamin kesegaran dan nilai gizi maksimal.</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-secondary-container rounded-2xl p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-4xl text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            <h4 className="text-2xl font-headline font-extrabold text-on-secondary-container leading-none">Analisis Gizi Real-time</h4>
          </div>
          <p className="text-on-secondary-container/80">Pantau setiap makronutrien yang masuk ke tubuh Anda dengan presisi laboratorium.</p>
        </div>
        <div className="bg-surface-container-high rounded-2xl p-8 flex flex-col justify-center">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">restaurant</span>
          <p className="font-headline font-bold text-on-surface">500+ Resep Sehat</p>
        </div>
        <div className="bg-surface-container-high rounded-2xl p-8 flex flex-col justify-center">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">eco</span>
          <p className="font-headline font-bold text-on-surface">Zero Waste Policy</p>
        </div>
      </div>
    </section>
  );
}
