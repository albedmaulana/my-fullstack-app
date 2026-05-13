export default function BeritaHeader() {
  return (
    <header className="relative px-8 py-20 lg:py-32 max-w-screen-2xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-fixed-variant rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            MEDIA &amp; INFORMASI
          </span>
          <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-on-surface tracking-tighter leading-[1.1] mb-8">
            Berita &amp; <span className="text-primary italic">Galeri Kegiatan</span>
          </h1>
          <p className="text-lg lg:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Menelusuri jejak nutrisi di seluruh nusantara. Temukan informasi terbaru mengenai distribusi pangan bergizi dan dokumentasi kegiatan komunitas kami.
          </p>
        </div>
        <div className="lg:col-span-5 relative h-[400px] lg:h-[500px]">
          <div className="absolute inset-0 bg-primary-container/10 rounded-3xl -rotate-3"></div>
          <img className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 rotate-2 transition-transform hover:rotate-0 duration-500" data-alt="Modern editorial food photography showing a variety of fresh colorful vegetables and grains in artisanal ceramic bowls on a light textured surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSByOepKMCfQwETxo3IjJjZ6LtxgNip6DBj3DjOmGgA_k480x-qfbaAZ5rMM659DtviBJ0jXFWvLhX5bOMmyKnFZge1yOsbGG4g2NEWGQRjpG6Bc1EusYR08DosL0dd3RS26XNvHRxUFPga4-Dc9sr0xrGlvgGiHWHuz4B1n06QC4MRWQ0FplhN4ZPdW0MyzLfYr-RG8HYEBGAQLCX4n9SocEpo5xjnL4l2nQcQKJpYPWP6B1PvGcOKov14Pf_nu5NKunyihI_-AQ" alt="Modern editorial food photography" />
        </div>
      </div>
      {/* Decorative Abstract Element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl"></div>
    </header>
  );
}
