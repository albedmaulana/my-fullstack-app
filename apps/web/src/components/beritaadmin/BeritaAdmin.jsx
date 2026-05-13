import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';

const BeritaAdmin = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://my-fullstack-app-api.vercel.app/api/berita-admin', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const result = await res.json();
        setBerita(result.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [refreshKey]);

  const handleDelete = async (id, judul) => {
    if (!window.confirm(`Hapus berita "${judul}"?`)) return;
    try {
      const res = await fetch(`https://my-fullstack-app-api.vercel.app/api/berita/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setBerita(p => p.filter(b => b.id !== id)); }
    } catch { alert('Gagal menghapus.'); }
  };

  const handleSave = async (form) => {
    const isEdit = !!form.id;
    const url = isEdit ? `https://my-fullstack-app-api.vercel.app/api/berita/${form.id}` : 'https://my-fullstack-app-api.vercel.app/api/berita';
    try {
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
      const result = await res.json();
      if (result.success) { setIsModalOpen(false); setSelectedBerita(null); setRefreshKey(p => p + 1); }
      else alert(result.message);
    } catch { alert('Koneksi error.'); }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
  const published = berita.filter(b => b.status === 'Published').length;
  const drafts = berita.filter(b => b.status === 'Draft').length;

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex relative">
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <main className="p-8 lg:p-12 flex-grow">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-label text-[10px] font-bold tracking-widest uppercase mb-3">Content Management</span>
              <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">Kelola Berita & Artikel</h2>
              <p className="text-on-surface-variant mt-2 max-w-md">Buat, edit, dan publikasikan artikel berita program.</p>
            </div>
            <button onClick={() => { setSelectedBerita(null); setIsModalOpen(true); }} className="bg-[#096138] text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all active:scale-95">
              <span className="material-symbols-outlined">add</span> Tulis Artikel
            </button>
          </header>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard icon="article" label="Total Artikel" val={berita.length} cls="bg-emerald-50 text-primary" />
            <StatCard icon="publish" label="Published" val={published} cls="bg-blue-50 text-blue-600" />
            <StatCard icon="edit_note" label="Draft" val={drafts} cls="bg-amber-50 text-amber-600" />
          </div>

          {loading ? <div className="p-10 text-center font-bold text-primary italic">Memuat...</div> : (
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
              <table className="w-full text-left">
                <thead><tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-8 py-5">Artikel</th><th className="px-6 py-5">Kategori</th><th className="px-6 py-5">Tanggal</th><th className="px-6 py-5">Status</th><th className="px-6 py-5 text-right">Aksi</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {berita.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5"><div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">{item.gambar && <img src={item.gambar} alt="" className="w-full h-full object-cover"/>}</div>
                        <div className="min-w-0"><h4 className="font-bold text-on-surface truncate max-w-xs">{item.judul}</h4><p className="text-xs text-slate-400 truncate max-w-xs">{item.ringkasan}</p></div>
                      </div></td>
                      <td className="px-6 py-5"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.kategori==='Inovasi'?'bg-purple-100 text-purple-700':item.kategori==='Program'?'bg-blue-100 text-blue-700':'bg-emerald-100 text-emerald-700'}`}>{item.kategori}</span></td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-medium">{fmtDate(item.publishedAt||item.createdAt)}</td>
                      <td className="px-6 py-5"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status==='Published'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{item.status}</span></td>
                      <td className="px-6 py-5 text-right"><div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setSelectedBerita(item); setIsModalOpen(true); }} className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                        <button onClick={() => handleDelete(item.id, item.judul)} className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                      </div></td>
                    </tr>
                  ))}
                  {berita.length===0 && <tr><td colSpan={5} className="px-8 py-16 text-center"><span className="material-symbols-outlined text-5xl text-slate-200 mb-3 block">article</span><p className="text-slate-400 font-bold">Belum ada artikel.</p></td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </main>
        <footer className="px-12 py-6 text-center border-t border-slate-100 bg-white/50"><p className="text-xs text-slate-400">© 2024 Makanan Bergizi — Kelola Berita</p></footer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => { setIsModalOpen(false); setSelectedBerita(null); }}/>
          <div className="relative w-full max-w-3xl z-[10000]">
            <button onClick={() => { setIsModalOpen(false); setSelectedBerita(null); }} className="absolute top-4 right-4 z-[10002] w-10 h-10 flex items-center justify-center rounded-full bg-white text-red-600 shadow-xl hover:bg-red-50 border border-slate-200 active:scale-90"><span className="material-symbols-outlined" style={{fontSize:'24px'}}>close</span></button>
            <BeritaForm data={selectedBerita} onSave={handleSave} onClose={() => { setIsModalOpen(false); setSelectedBerita(null); }}/>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, val, cls }) => (
  <div className={`${cls.split(' ')[0]} rounded-2xl p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl ${cls.split(' ')[1]}/10 flex items-center justify-center bg-white/50`}><span className={`material-symbols-outlined ${cls.split(' ')[1]}`}>{icon}</span></div>
    <div><p className={`text-2xl font-black ${cls.split(' ')[1]}`}>{val}</p><p className="text-xs text-slate-500 font-medium">{label}</p></div>
  </div>
);

const BeritaForm = ({ data, onSave, onClose }) => {
  const [form, setForm] = useState({ id: data?.id||null, judul: data?.judul||'', ringkasan: data?.ringkasan||'', konten: data?.konten||'', gambar: data?.gambar||'', kategori: data?.kategori||'Edukasi', status: data?.status||'Draft' });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
      <div className="p-10">
        <h2 className="text-3xl font-black text-slate-800 mb-1">{data ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-8">{data ? `ID: ${data.id}` : 'Artikel baru'}</p>
        <form onSubmit={async(e)=>{e.preventDefault();setSaving(true);await onSave(form);setSaving(false);}} className="space-y-5">
          <div><label className="text-[10px] font-black uppercase text-primary tracking-widest ml-1">Judul</label><input type="text" value={form.judul} onChange={e=>set('judul',e.target.value)} required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Kategori</label><select value={form.kategori} onChange={e=>set('kategori',e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600">{['Edukasi','Inovasi','Program'].map(k=><option key={k}>{k}</option>)}</select></div>
            <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status</label><select value={form.status} onChange={e=>set('status',e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600"><option value="Draft">Draft</option><option value="Published">Published</option></select></div>
          </div>
          <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Ringkasan</label><textarea value={form.ringkasan} onChange={e=>set('ringkasan',e.target.value)} rows="2" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none text-slate-600 resize-none font-medium text-sm"/></div>
          <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Konten</label><textarea value={form.konten} onChange={e=>set('konten',e.target.value)} rows="5" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none text-slate-600 resize-none font-medium text-sm"/></div>
          <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">URL Gambar</label><input type="text" value={form.gambar} onChange={e=>set('gambar',e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none text-slate-600 font-medium text-sm" placeholder="https://..."/></div>
          <div className="flex gap-4 pt-4 border-t border-slate-50">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 active:scale-95 transition-all">Batal</button>
            <button type="submit" disabled={saving} className="flex-[2] py-4 rounded-2xl bg-[#096138] text-white font-black shadow-lg active:scale-95 transition-all disabled:opacity-50">{saving ? 'Menyimpan...' : data ? 'Update' : 'Publikasikan'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeritaAdmin;
