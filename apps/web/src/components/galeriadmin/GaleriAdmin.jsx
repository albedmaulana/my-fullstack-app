import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';

const GaleriAdmin = () => {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/galeri');
        const result = await res.json();
        setGaleri(result.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [refreshKey]);

  const handleDelete = async (id, judul) => {
    if (!window.confirm(`Hapus foto "${judul}"?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/galeri/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setGaleri(p => p.filter(g => g.id !== id)); }
    } catch { alert('Gagal menghapus.'); }
  };

  const handleSave = async (form) => {
    try {
      const res = await fetch('http://localhost:5000/api/galeri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.success) { setIsModalOpen(false); setRefreshKey(p => p + 1); }
      else alert(result.message);
    } catch { alert('Koneksi error.'); }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex relative">
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <main className="p-8 lg:p-12 flex-grow">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-label text-[10px] font-bold tracking-widest uppercase mb-3">Gallery Management</span>
              <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">Kelola Galeri Dokumentasi</h2>
              <p className="text-on-surface-variant mt-2 max-w-md">Upload dan kelola foto dokumentasi program.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#096138] text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all active:scale-95">
              <span className="material-symbols-outlined">add_photo_alternate</span> Tambah Foto
            </button>
          </header>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-50 rounded-2xl px-6 py-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">photo_library</span>
              <span className="font-black text-primary text-xl">{galeri.length}</span>
              <span className="text-xs text-slate-500 font-medium">Total Foto</span>
            </div>
          </div>

          {loading ? <div className="p-10 text-center font-bold text-primary italic">Memuat...</div> : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galeri.map(item => (
                <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button onClick={() => handleDelete(item.id, item.judul)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-on-surface truncate mb-1">{item.judul}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{item.deskripsi || '-'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{item.lokasi || 'Indonesia'}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.tahun}</span>
                    </div>
                  </div>
                </div>
              ))}
              {galeri.length === 0 && (
                <div className="col-span-full bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
                  <span className="material-symbols-outlined text-5xl text-slate-200 mb-3 block">photo_library</span>
                  <p className="text-slate-400 font-bold">Belum ada foto dokumentasi.</p>
                </div>
              )}
            </div>
          )}
        </main>
        <footer className="px-12 py-6 text-center border-t border-slate-100 bg-white/50"><p className="text-xs text-slate-400">© 2024 Makanan Bergizi — Kelola Galeri</p></footer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg z-[10000]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 z-[10002] w-10 h-10 flex items-center justify-center rounded-full bg-white text-red-600 shadow-xl hover:bg-red-50 border border-slate-200 active:scale-90"><span className="material-symbols-outlined" style={{fontSize:'24px'}}>close</span></button>
            <GaleriForm onSave={handleSave} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const GaleriForm = ({ onSave, onClose }) => {
  const [form, setForm] = useState({ judul: '', deskripsi: '', gambar: '', lokasi: '', tahun: new Date().getFullYear() });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
      <div className="p-10">
        <h2 className="text-3xl font-black text-slate-800 mb-1">Tambah Foto Baru</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-8">Dokumentasi program</p>
        <form onSubmit={async(e)=>{e.preventDefault();setSaving(true);await onSave(form);setSaving(false);}} className="space-y-5">
          <div><label className="text-[10px] font-black uppercase text-primary tracking-widest ml-1">Judul Foto</label><input type="text" value={form.judul} onChange={e=>set('judul',e.target.value)} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700" placeholder="Nama kegiatan..."/></div>
          <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">URL Gambar</label><input type="text" value={form.gambar} onChange={e=>set('gambar',e.target.value)} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none text-slate-600 font-medium text-sm" placeholder="https://..."/></div>
          <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Deskripsi</label><textarea value={form.deskripsi} onChange={e=>set('deskripsi',e.target.value)} rows="2" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none text-slate-600 resize-none font-medium text-sm"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Lokasi</label><input type="text" value={form.lokasi} onChange={e=>set('lokasi',e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600" placeholder="Jawa Barat, 2024"/></div>
            <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tahun</label><input type="number" value={form.tahun} onChange={e=>set('tahun',parseInt(e.target.value))} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600"/></div>
          </div>
          <div className="flex gap-4 pt-4 border-t border-slate-50">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 active:scale-95 transition-all">Batal</button>
            <button type="submit" disabled={saving} className="flex-[2] py-4 rounded-2xl bg-[#096138] text-white font-black shadow-lg active:scale-95 transition-all disabled:opacity-50">{saving ? 'Menyimpan...' : 'Tambah Foto'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GaleriAdmin;
