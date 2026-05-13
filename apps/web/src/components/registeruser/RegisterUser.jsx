import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nama: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Kata sandi tidak cocok!'); return; }
    if (form.password.length < 6) { setError('Kata sandi minimal 6 karakter.'); return; }

    setLoading(true);
    try {
      const res = await fetch('https://my-fullstack-app-api.vercel.app/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: form.nama, email: form.email, phone: form.phone || null, password: form.password })
      });
      
      let result;
      try {
        result = await res.json();
      } catch {
        setError(`Server error (${res.status}). Coba lagi nanti.`);
        return;
      }
      
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userName', result.data.nama);
        localStorage.setItem('userRole', 'user');
        navigate('/');
      } else {
        setError(result.message || 'Registrasi gagal.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Tidak dapat terhubung ke server. Pastikan server berjalan.');
    } finally { setLoading(false); }
  };

  return (
    <div className="bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-outline-variant/10 shadow-[0_12px_40px_rgba(26,26,46,0.06)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="font-headline text-2xl font-extrabold tracking-tighter text-primary">Makanan Bergizi</Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-primary font-headline tracking-tight text-sm font-semibold uppercase hover:opacity-70 transition-all">Masuk</Link>
            <Link to="/register" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline tracking-tight text-sm font-semibold uppercase shadow-md">Sign Up</Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen flex flex-col lg:flex-row items-stretch pt-20">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-container-low p-12 flex-col justify-between">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full mb-8 border border-white/20">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
              <span className="font-label text-xs font-bold tracking-widest uppercase text-primary">Bergabung Sekarang</span>
            </div>
            <h1 className="font-headline text-5xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-6 max-w-md">
              Mulai Perjalanan <span className="text-primary italic">Sehat</span> Anda.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-sm font-body leading-relaxed">
              Daftarkan diri Anda dan akses informasi nutrisi, menu sehat, serta komunitas gaya hidup seimbang.
            </p>
          </div>
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden editorial-shadow transform rotate-3">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" alt="Healthy Food" />
            </div>
            <div className="absolute bottom-4 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden editorial-shadow border-8 border-surface-container-low transform -rotate-6">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600" alt="Community" />
            </div>
          </div>
          <div className="relative z-10 bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/10 max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {['menu_book', 'monitoring', 'groups'].map((icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">{icon}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-on-surface-variant">Akses menu, statistik nutrisi, dan berita kesehatan.</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-surface">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-3">Buat Akun Baru</h2>
              <p className="text-on-surface-variant font-body">Lengkapi data berikut untuk mendaftar sebagai pengguna.</p>
            </div>

            {error && (
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
                <span className="material-symbols-outlined text-lg">error</span>{error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant px-1" htmlFor="nama">Nama Lengkap</label>
                <input className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" id="nama" name="nama" value={form.nama} onChange={handleChange} required placeholder="Masukkan nama lengkap" type="text" />
              </div>
              <div className="space-y-2">
                <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant px-1" htmlFor="email">Alamat Email</label>
                <input className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="contoh@email.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant px-1" htmlFor="phone">Nomor HP <span className="text-outline normal-case font-normal">(opsional)</span></label>
                <input className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="081234567890" type="tel" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant px-1" htmlFor="password">Kata Sandi</label>
                  <div className="relative">
                    <input className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" id="password" name="password" value={form.password} onChange={handleChange} required placeholder="Min. 6 karakter" type={showPassword ? "text" : "password"} />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                      <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-xs font-bold tracking-widest uppercase text-on-surface-variant px-1" htmlFor="confirmPassword">Ulangi Sandi</label>
                  <input className="w-full px-6 py-4 rounded-xl bg-surface-container-high border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 text-on-surface placeholder:text-outline transition-all outline-none" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Ulangi sandi" type={showPassword ? "text" : "password"} />
                </div>
              </div>
              <div className="flex items-start gap-3 px-1">
                <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 mt-0.5" id="terms" type="checkbox" required />
                <label className="text-sm text-on-surface-variant cursor-pointer" htmlFor="terms">Saya menyetujui <a href="#" className="text-primary font-semibold hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-primary font-semibold hover:underline">Kebijakan Privasi</a>.</label>
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl hero-gradient text-on-primary font-headline font-bold text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50">
                {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow h-px bg-outline-variant/30"></div>
              <span className="text-[10px] font-label font-bold text-outline tracking-widest uppercase">Atau daftar dengan</span>
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
              Sudah punya akun?{' '}<Link to="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-headline text-xl font-bold text-primary">Makanan Bergizi</div>
            <p className="font-body text-[10px] tracking-widest uppercase text-outline mt-2">© 2024 Makanan Bergizi. The Nutritional Curator Editorial.</p>
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

export default RegisterUser;
