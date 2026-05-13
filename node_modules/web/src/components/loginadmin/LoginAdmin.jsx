import React, { useState } from 'react'; // 1. Tambahkan useState
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();

  // 2. Tambahkan State untuk menampung data tanpa merusak UI
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // 3. Logika pemanggilan API ke Backend (Prisma)
      const response = await fetch('http://localhost:5000/api/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Simpan token dan data admin ke localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('adminId', result.data.id);
        localStorage.setItem('adminName', result.data.nama);
        localStorage.setItem('userRole', 'admin');
        console.log("Login berhasil, mengalihkan...");
        navigate('/dashboardadmin');
      } else {
        setError(result.message || "Username atau Password salah.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server database.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8ff] font-['Inter']">
      <main className="flex-1 flex flex-col md:flex-row">
        
        {/* Sisi Kiri: Visual Narrative */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" 
              alt="Background Salad" 
            />
            <div className="absolute inset-0 bg-[#096138]/20 backdrop-multiply"></div>
          </div>
          
          <div className="relative z-10 max-w-xl text-white">
            <h1 className="font-['Plus_Jakarta_Sans'] text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-6">
              Nutrisi untuk <br />
              <span className="text-[#feae2c]">Masa Depan.</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-md">
              Mengelola sistem distribusi pangan bergizi untuk komunitas yang lebih sehat dan tangguh.
            </p>
            
            <div className="mt-12 flex gap-4">
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col gap-1 min-w-[140px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#096138] text-2xl">2.4k+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Active Beneficiaries</span>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col gap-1 min-w-[140px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#096138] text-2xl">15</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">District Nodes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sisi Kanan: Login Interface */}
        <section className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 bg-white relative">
          <div className="max-w-md w-full mx-auto">
            
            <div className="mb-12">
              <span className="text-2xl font-['Plus_Jakarta_Sans'] font-bold text-[#096138] tracking-tighter">
                Makanan Bergizi
              </span>
              <h2 className="mt-4 font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-[#1a1a2e] tracking-tight leading-none">
                Admin Portal
              </h2>
              <p className="mt-3 text-slate-500">
                Silakan masuk untuk mengelola dashboard operasional.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Email / Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    person
                  </span>
                  <input 
                    type="text" 
                    required
                    value={username} // Hubungkan ke State
                    onChange={(e) => setUsername(e.target.value)} // Hubungkan ke State
                    placeholder="admin@makananbergizi.id"
                    className="w-full pl-12 pr-4 py-4 bg-[#f5f2ff] border-none rounded-xl focus:ring-2 focus:ring-[#096138]/20 transition-all text-[#1a1a2e]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock
                  </span>
                  <input 
                    type="password" 
                    required
                    value={password} // Hubungkan ke State
                    onChange={(e) => setPassword(e.target.value)} // Hubungkan ke State
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-[#f5f2ff] border-none rounded-xl focus:ring-2 focus:ring-[#096138]/20 transition-all text-[#1a1a2e]"
                  />
                </div>
              </div>

              {/* Tampilkan pesan error jika ada tanpa merusak layout */}
              {error && <p className="text-red-600 text-[11px] font-bold ml-1">{error}</p>}

              <div className="flex items-center justify-between py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-[#096138] focus:ring-[#096138]/20" />
                  <span className="text-sm font-medium text-slate-500 group-hover:text-[#1a1a2e] transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="text-sm font-semibold text-[#096138] hover:underline">
                  Lupa Password?
                </a>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#096138] to-[#2d7a4f] py-4 rounded-xl text-white font-['Plus_Jakarta_Sans'] font-bold text-lg shadow-xl shadow-[#096138]/10 hover:shadow-[#096138]/20 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
              </button>
            </form>

            <div className="mt-12 p-6 rounded-xl bg-[#f5f2ff] flex items-start gap-4">
              <span className="material-symbols-outlined text-[#2d7a4f]">verified_user</span>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1a1a2e]">Secure Admin Access</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Portal ini terlindungi oleh enkripsi end-to-end. Jika Anda mengalami kesulitan akses, hubungi tim IT Support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#f5f2ff] text-[11px] font-bold uppercase tracking-wider text-slate-500">
        <div className="text-[#096138] text-sm">Makanan Bergizi</div>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="hover:text-[#096138]">Privacy Policy</a>
          <a href="#" className="hover:text-[#096138]">Terms of Service</a>
          <a href="#" className="hover:text-[#096138]">Admin Support</a>
        </div>
        <div>
          © 2024 Makanan Bergizi. The Nutritional Curator Editorial.
        </div>
      </footer>
    </div>
  );
};

export default LoginAdmin;