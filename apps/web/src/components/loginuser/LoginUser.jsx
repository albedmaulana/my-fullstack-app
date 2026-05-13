import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const LoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userName', result.data.nama);
        localStorage.setItem('userRole', 'user');
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Email atau Password salah.');
      }
    } catch {
      setError('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-inverse-surface/70 backdrop-blur-xl border-b border-outline-variant/10 shadow-[0_12px_40px_rgba(26,26,46,0.06)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="font-headline text-2xl font-extrabold tracking-tighter text-primary">
            Makanan Bergizi
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-primary font-headline tracking-tight text-sm font-semibold uppercase hover:opacity-70 transition-all active:scale-90">
              Support
            </button>
            <Link to="/register" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline tracking-tight text-sm font-semibold uppercase active:scale-95 transition-transform shadow-md">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col lg:flex-row items-stretch pt-20">
        {/* Sisi Kiri: Visual Content */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-container-low p-12 flex-col justify-between">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full mb-8 border border-white/20">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
              <span className="font-label text-xs font-bold tracking-widest uppercase text-primary">
                Nutritional Excellence
              </span>
            </div>
            <h1 className="font-headline text-5xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-6 max-w-md">
              Hidup Sehat Dimulai dari <span className="text-primary italic">Piring Anda</span>.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-sm font-body leading-relaxed">
              Bergabunglah dengan komunitas yang peduli akan keseimbangan nutrisi dan cita rasa yang autentik.
            </p>
          </div>

          {/* Image Grid */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden editorial-shadow transform rotate-3">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" alt="Healthy Bowl" />
            </div>
            <div className="absolute bottom-4 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden editorial-shadow border-8 border-surface-container-low transform -rotate-6">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=600" alt="Family" />
            </div>
          </div>

          {/* Social Proof Card */}
          <div className="relative z-10 bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/10 max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-fixed" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-fixed" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center text-xs font-bold text-on-secondary-container">
                  12k+
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">
                Telah dipercaya oleh ribuan keluarga di Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Form Login */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-surface">
          <div className="w-full max-w-md space-y-10">
            <div className="text-center lg:text-left">
              <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-3">
                Masuk ke Akun Anda
              </h2>
              <p className="text-on-surface-variant font-body">Akses informasi menu, jadwal, dan pantau nutrisi harian.</p>
            </div>

            {error && (
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant px-1" htmlFor="email">
                  Email
                </label>
                <input 
                  className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" 
                  id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com" type="email" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant" htmlFor="password">
                    Kata Sandi
                  </label>
                  <a className="text-xs font-semibold text-primary hover:underline" href="#">Lupa Kata Sandi?</a>
                </div>
                <div className="relative">
                  <input 
                    className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" 
                    id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" type={showPassword ? "text" : "password"} 
                  />
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" id="remember" type="checkbox" />
                <label className="text-sm font-medium text-on-surface-variant cursor-pointer" htmlFor="remember">Ingat saya</label>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl hero-gradient text-on-primary font-headline font-bold text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Memverifikasi...' : 'Masuk Sekarang'}
              </button>
            </form>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow h-px bg-outline-variant/30"></div>
              <span className="text-[10px] font-label font-bold text-outline tracking-widest uppercase">Atau masuk dengan</span>
              <div className="flex-grow h-px bg-outline-variant/30"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover:bg-surface-container-low transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                <span className="text-sm font-bold text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover:bg-surface-container-low transition-colors">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="F" />
                <span className="text-sm font-bold text-on-surface">Facebook</span>
              </button>
            </div>

            <p className="text-center text-sm text-on-surface-variant">
              Belum punya akun?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">Daftar di sini</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-headline text-xl font-bold text-primary">Makanan Bergizi</div>
            <p className="font-body text-[10px] tracking-widest uppercase text-outline mt-2">
              © 2024 Makanan Bergizi. The Nutritional Curator Editorial.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} className="font-label text-[10px] tracking-widest uppercase text-outline hover:text-primary transition-colors" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginUser;