import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'exists'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus(res.status === 409 ? 'exists' : 'error');
      }
    } catch {
      setStatus('error');
    } finally { setLoading(false); }
  };

  return (
    <section className="px-8 py-20">
      <div className="max-w-4xl mx-auto bg-primary rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-6">Dapatkan Update Mingguan</h2>
          <p className="text-on-primary-container/80 mb-10 max-w-xl mx-auto">Daftarkan email Anda untuk menerima kurasi berita gizi dan inspirasi gaya hidup sehat langsung di inbox Anda.</p>
          
          {status === 'success' && (
            <div className="mb-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 text-white text-sm font-medium">
              <span className="material-symbols-outlined text-lg">check_circle</span>Berhasil berlangganan!
            </div>
          )}
          {status === 'exists' && (
            <div className="mb-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 text-white text-sm font-medium">
              <span className="material-symbols-outlined text-lg">info</span>Email sudah terdaftar.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input value={email} onChange={(e) => { setEmail(e.target.value); setStatus(null); }} className="flex-1 px-6 py-4 rounded-2xl border-none bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-on-primary-container" placeholder="Alamat email Anda" type="email" required/>
            <button disabled={loading} className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-primary-container hover:text-on-primary-container transition-all disabled:opacity-50" type="submit">
              {loading ? 'Memproses...' : 'Berlangganan'}
            </button>
          </form>
        </div>
        {/* Abstract Design Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
      </div>
    </section>
  );
}
