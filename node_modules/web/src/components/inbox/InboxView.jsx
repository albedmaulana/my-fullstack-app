import React, { useState, useEffect } from 'react';

const InboxView = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/aspirasi', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      const data = result.data || result || [];
      setMessages(Array.isArray(data) ? data : []);
      if (data.length > 0 && !selected) setSelected(data[0]);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    try {
      await fetch(`http://localhost:5000/api/aspirasi/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch { alert('Gagal menghapus.'); }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/aspirasi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch { alert('Gagal update status.'); }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getTagColor = (kategori) => {
    switch (kategori) {
      case 'saran': return 'bg-amber-100 text-amber-800';
      case 'laporan': return 'bg-red-100 text-red-700';
      case 'terima-kasih': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SELESAI': return 'bg-emerald-100 text-emerald-700';
      case 'DIPROSES': return 'bg-blue-100 text-blue-700';
      case 'MENDESAK': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center p-20 text-primary font-bold italic">Memuat pesan...</div>;
  }

  return (
    <section className="flex-1 flex overflow-hidden p-6 gap-6 h-[calc(100vh-80px)]">
      {/* Kolom Kiri: Daftar Pesan */}
      <div className="w-1/3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
        <h3 className="text-sm font-bold font-headline text-stone-600 uppercase tracking-widest mb-2">
          Pesan Terbaru <span className="text-primary">({messages.length})</span>
        </h3>
        
        {messages.length === 0 ? (
          <div className="text-center py-10 text-stone-400 text-sm">Belum ada pesan masuk.</div>
        ) : messages.map(msg => (
          <div
            key={msg.id}
            onClick={() => setSelected(msg)}
            className={`p-5 rounded-xl border-l-4 transition-all cursor-pointer ${
              selected?.id === msg.id ? 'bg-white border-emerald-600 shadow-sm' : 'bg-stone-50 border-transparent hover:bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`px-3 py-1 ${getTagColor(msg.kategori)} text-[10px] font-bold rounded-full uppercase`}>{msg.kategori}</span>
              <span className="text-[10px] text-stone-400 font-medium">{formatDate(msg.createdAt)}</span>
            </div>
            <h4 className="font-bold text-emerald-950 mb-1">{msg.nama}</h4>
            <p className="text-xs text-stone-500 line-clamp-2">{msg.pesan}</p>
          </div>
        ))}
      </div>

      {/* Kolom Kanan: Detail Pesan */}
      {selected ? (
        <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden border border-stone-100">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl">person</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-emerald-950">{selected.nama}</h3>
                  <span className={`px-3 py-0.5 ${getTagColor(selected.kategori)} text-[10px] font-black rounded-full uppercase`}>{selected.kategori}</span>
                  <span className={`px-3 py-0.5 ${getStatusBadge(selected.status)} text-[10px] font-black rounded-full uppercase`}>{selected.status}</span>
                </div>
                <p className="text-sm text-stone-500">{selected.email || 'Tidak ada email'}</p>
              </div>
            </div>
            <div className="text-right text-stone-400">
              <p className="text-sm font-bold">ID: #ASP-{selected.id}</p>
              <p className="text-xs">{formatDate(selected.createdAt)}</p>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-700 mb-6">Isi Aspirasi</h4>
            <p className="text-lg text-emerald-950 font-medium italic border-l-4 border-emerald-200 pl-6 mb-8">
              "{selected.pesan}"
            </p>
          </div>

          <div className="p-6 bg-stone-50 border-t flex justify-between">
            <div className="flex gap-3">
              {selected.email && (
                <a href={`mailto:${selected.email}`} className="bg-[#096138] text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined text-xl">mail</span> Balas via Email
                </a>
              )}
              {selected.status !== 'SELESAI' && (
                <button onClick={() => handleStatusUpdate(selected.id, 'SELESAI')} className="bg-amber-400 text-amber-950 font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-colors">
                  Tandai Selesai
                </button>
              )}
            </div>
            <button onClick={() => handleDelete(selected.id)} className="text-red-600 font-bold px-4 py-3 hover:bg-red-50 rounded-xl transition-colors">Hapus</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center border border-stone-100 text-stone-400">
          <span className="material-symbols-outlined text-6xl mb-4">inbox</span>
          <p className="font-bold">Pilih pesan untuk melihat detail</p>
        </div>
      )}
    </section>
  );
};

export default InboxView;