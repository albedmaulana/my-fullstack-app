import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[870px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="Children eating healthy school meals" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3GBhySsM608Mili4u0lIUCrAyr0V-rzn5EkQARc3E_Wt2Mq7C5rGm_ZXfJu6QhRvit85y6otuu-kySZLQZ3W0nldaJSDs0mlMcl6pmprRcVE-Y2HssC5czPCTDfL7l0mQyZ-FEPIino96GfjAuTJRTQ3XZBT3U2rTxGnEAnfU23yee9s8XgVMjatlAYCg8bLnB8Jx-hAu-mvFr91KT7fDBgsuzZrzzwEWoTrCza9MBUmr0bTOOL5mzWgNVaayXgaDQvy702rfokY" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-8 w-full">
        <div className="max-w-3xl">
          <h1 className="text-white text-5xl md:text-7xl font-headline font-extrabold tracking-tight mb-6 leading-[1.1]">
            Makanan Bergizi untuk Generasi Emas Indonesia
          </h1>
          <p className="text-on-primary-container text-xl md:text-2xl mb-10 leading-relaxed font-body opacity-90">
            Memastikan setiap anak sekolah mendapatkan asupan nutrisi terbaik untuk mendukung pertumbuhan dan kecerdasan bangsa.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/menu')}
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-2xl font-bold text-lg editorial-shadow hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined">restaurant</span>
              Lihat Menu Hari Ini
            </button>
            <button 
              onClick={() => navigate('/aspirasi')}
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">mail</span>
              Kirim Saran
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
