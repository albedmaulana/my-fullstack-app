import { useState } from 'react';

export default function AspirasiForm() {
  const [form, setForm] = useState({ nama: '', email: '', kategori: 'saran', pesan: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.pesan) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/aspirasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setForm({ nama: '', email: '', kategori: 'saran', pesan: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally { setLoading(false); }
  };

  return (
    <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
      {status === 'success' && (
        <div className="mb-6 flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-50 border border-emerald-100 text-primary text-sm font-medium">
          <span className="material-symbols-outlined text-lg">check_circle</span>Aspirasi Anda berhasil terkirim! Terima kasih.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
          <span className="material-symbols-outlined text-lg">error</span>Gagal mengirim. Coba lagi nanti.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface-variant ml-1 font-label">NAMA LENGKAP</label>
            <input name="nama" value={form.nama} onChange={handleChange} required className="w-full bg-surface-container-high border-0 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50" placeholder="Masukkan nama Anda" type="text"/>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface-variant ml-1 font-label">EMAIL (OPSIONAL)</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full bg-surface-container-high border-0 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50" placeholder="email@contoh.com" type="email"/>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-on-surface-variant ml-1 font-label">KATEGORI PESAN</label>
          <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full bg-surface-container-high border-0 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
            <option value="terima-kasih">Terima Kasih</option>
            <option value="saran">Saran</option>
            <option value="laporan">Laporan</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-on-surface-variant ml-1 font-label">PESAN ATAU ASPIRASI</label>
          <textarea name="pesan" value={form.pesan} onChange={handleChange} required className="w-full bg-surface-container-high border-0 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50" placeholder="Tuliskan aspirasi Anda di sini..." rows="6"></textarea>
        </div>
        <button disabled={loading} className="w-full md:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-4 px-12 rounded-xl text-lg shadow-xl shadow-emerald-900/10 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50" type="submit">
          {loading ? 'Mengirim...' : 'Kirim Aspirasi'}
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
        </button>
      </form>
      {/* Decorative background element for form */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-fixed-dim/10 rounded-full blur-3xl"></div>
    </div>
  );
}
