import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Tambahkan navigasi
import Sidebar from '../Sidebar';

const DashboardAdmin = () => {
  const navigate = useNavigate(); // Inisialisasi navigasi

  // 1. Inisialisasi State
  const [stats, setStats] = useState({
    pengunjung: 0, 
    pesanBaru: 0,
    pesanMendesak: 0,
    totalPorsi: 0,
    aktivitas: []
  });
  
  const [daftarWilayah, setDaftarWilayah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    wilayah: '',
    sekolah: ''
  });

  // 2. Fungsi Fetch Data & Logika Gabungan Aktivitas
  const fetchData = async () => {
    try {
      // Fetch semua data yang diperlukan secara paralel
      const token = localStorage.getItem('token');
      const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
      const [resDash, resStat, resMenu] = await Promise.all([
        fetch('http://localhost:5000/api/stats-dashboard', authHeaders),
        fetch('http://localhost:5000/api/statistik'),
        fetch('http://localhost:5000/api/menus')
      ]);

      const dataDashboard = await resDash.json();
      const dataWilayah = await resStat.json();
      const dataMenus = await resMenu.json();

      // Extract .data from API responses
      const dashData = dataDashboard.data || dataDashboard;
      const wilayahList = Array.isArray(dataWilayah) ? dataWilayah : (dataWilayah.data || dataWilayah);

      setDaftarWilayah(wilayahList);

      // Gunakan data dari server (sudah dihitung di backend)
      setStats({
        pengunjung: dashData.pengunjung || 0,
        pesanBaru: dashData.pesanBaru || 0,
        pesanMendesak: dashData.pesanMendesak || 0,
        totalPorsi: dashData.totalPorsi || 0,
        totalWilayah: dashData.totalWilayah || 0,
        aktivitas: dashData.aktivitas || []
      });

    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!formData.wilayah) return alert("Pilih wilayah yang ingin di-update!");

    const wilayahTerpilih = daftarWilayah.find(w => w.wilayah === formData.wilayah);
    
    if (!wilayahTerpilih) {
      return alert("Wilayah tidak ditemukan dalam database!");
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/statistik/${wilayahTerpilih.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          jangkauan_sekolah: parseInt(formData.sekolah) || 0,
          total_porsi: wilayahTerpilih.total_porsi || 0,
          wilayah: wilayahTerpilih.wilayah,
          status: wilayahTerpilih.status,
          pertumbuhan: wilayahTerpilih.pertumbuhan || "+0%"
        })
      });

      const result = await response.json();
      
      if (result.success || response.ok) {
        alert("Data berhasil disimpan ke database!");
        setIsModalOpen(false);
        setFormData({ wilayah: '', sekolah: '' });
        fetchData(); 
      } else {
        alert("Gagal menyimpan: " + (result.message || "Periksa konfigurasi API"));
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal terhubung ke server.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="font-headline font-bold text-primary animate-pulse">Menghubungkan ke Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface relative">
      <Sidebar />
      
      <main className="ml-72 p-8 lg:p-12">
        {/* Header */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Selamat Pagi, Admin</h2>
            <p className="text-on-surface-variant font-medium font-body">Berikut rangkuman data gizi hari ini, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-surface-container-high text-on-surface-variant px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-variant transition-all font-body text-sm">
              <span className="material-symbols-outlined text-xl">calendar_today</span>
              Cetak Laporan
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all font-body text-sm"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Entri Data Baru
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-label font-bold text-on-surface-variant uppercase tracking-widest mb-1">TOTAL SEKOLAH TERJANGKAU</p>
                <h3 className="text-4xl font-headline font-extrabold text-on-surface">{stats.pengunjung.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><span className="material-symbols-outlined">school</span></div>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex items-center text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                {(() => { const total = daftarWilayah.reduce((a, w) => a + (w.jangkauan_sekolah || 0), 0); return total > 0 ? `+${((stats.pengunjung / total) * 10).toFixed(1)}%` : '+0%'; })()}
              </div>
              <div className="flex gap-1 items-end h-8">
                {daftarWilayah.slice(0, 5).map((w, i) => {
                  const max = Math.max(...daftarWilayah.slice(0, 5).map(d => d.jangkauan_sekolah || 1));
                  const pct = max > 0 ? ((w.jangkauan_sekolah || 0) / max) * 32 : 4;
                  return <div key={i} className={`w-1.5 rounded-full ${i === daftarWilayah.slice(0, 5).length - 1 ? 'bg-primary' : 'bg-primary-fixed-dim'}`} style={{height: `${Math.max(pct, 4)}px`}}></div>;
                })}
                {daftarWilayah.length === 0 && [4,7,5,8,10].map((h,i) => <div key={i} className="w-1.5 rounded-full bg-slate-200" style={{height:`${h*3}px`}}></div>)}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-label font-bold text-on-surface-variant uppercase tracking-widest mb-1">PESAN BARU</p>
                <h3 className="text-4xl font-headline font-extrabold text-on-surface">{stats.pesanBaru}</h3>
              </div>
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><span className="material-symbols-outlined">mark_email_unread</span></div>
            </div>
            <div className="flex items-end justify-between text-secondary font-bold text-sm">
              <div className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">priority_high</span>{stats.pesanMendesak} Mendesak</div>
              <div className="flex gap-1 items-end h-8">
                {(() => {
                  const bars = stats.pesanBaru > 0 ? [stats.pesanMendesak || 1, Math.ceil(stats.pesanBaru * 0.4), Math.ceil(stats.pesanBaru * 0.6), Math.ceil(stats.pesanBaru * 0.3), stats.pesanBaru] : [3,5,4,6,5];
                  const max = Math.max(...bars, 1);
                  return bars.map((h, i) => <div key={i} className={`w-1.5 rounded-full ${i === bars.length - 1 ? 'bg-secondary' : 'bg-secondary-fixed-dim'}`} style={{height: `${Math.max((h / max) * 32, 4)}px`}}></div>);
                })()}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-label font-bold text-on-surface-variant uppercase tracking-widest mb-1">TOTAL PORSI DISTRIBUSI</p>
                <h3 className="text-4xl font-headline font-extrabold text-on-surface">{(stats.totalPorsi || 0).toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-primary-container/10 rounded-xl text-primary-container"><span className="material-symbols-outlined">restaurant</span></div>
            </div>
            <div className="flex items-end justify-between text-primary-container font-bold text-sm">
              <div className="flex items-center">
                {(() => {
                  const totalTarget = daftarWilayah.reduce((a, w) => a + (w.target_penerima || 0), 0);
                  const totalRealisasi = daftarWilayah.reduce((a, w) => a + (w.realisasi_porsi || 0), 0);
                  const pct = totalTarget > 0 ? Math.round((totalRealisasi / totalTarget) * 100) : 0;
                  return pct >= 80 
                    ? <><span className="material-symbols-outlined text-sm mr-1">check_circle</span>Target {pct}%</>
                    : <><span className="material-symbols-outlined text-sm mr-1">trending_up</span>Progres {pct}%</>;
                })()}
              </div>
              <div className="flex gap-1 items-end h-8">
                {daftarWilayah.slice(0, 5).map((w, i) => {
                  const max = Math.max(...daftarWilayah.slice(0, 5).map(d => d.total_porsi || 1));
                  const pct = max > 0 ? ((w.total_porsi || 0) / max) * 32 : 4;
                  return <div key={i} className="w-1.5 rounded-full bg-primary-container" style={{height: `${Math.max(pct, 4)}px`}}></div>;
                })}
                {daftarWilayah.length === 0 && [6,5,8,7,8].map((h,i) => <div key={i} className="w-1.5 rounded-full bg-slate-200" style={{height:`${h*3}px`}}></div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Action & Activity */}
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-surface-container-high rounded-3xl p-8 relative overflow-hidden shadow-inner">
                <div className="relative z-10 max-w-md">
                    <h4 className="text-2xl font-headline font-bold text-on-surface mb-4">Aksi Cepat Admin</h4>
                    <p className="text-on-surface-variant mb-8 font-body">Kelola konten dan pantau perkembangan program nutrisi secara real-time.</p>
                    <div className="grid grid-cols-3 gap-4">
                        <button onClick={() => navigate('/statistikadmin')} className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white transition-all hover:shadow-lg hover:-translate-y-1">
                            <span className="material-symbols-outlined text-primary text-3xl">insights</span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">Update Statistik</span>
                        </button>
                        <button onClick={() => navigate('/menuadmin')} className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white transition-all hover:shadow-lg hover:-translate-y-1">
                            <span className="material-symbols-outlined text-primary text-3xl">add_to_photos</span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">Tambah Menu</span>
                        </button>
                        <button onClick={() => navigate('/beritaadmin')} className="bg-surface-container-lowest p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white transition-all hover:shadow-lg hover:-translate-y-1">
                            <span className="material-symbols-outlined text-primary text-3xl">edit_note</span>
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">Tulis Berita</span>
                        </button>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
                    <img className="h-full w-full object-cover rounded-l-full" src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600" alt="decor" />
                </div>
            </div>

            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-headline font-bold text-on-surface">Aktivitas Terkini</h4>
                    <span className="text-xs font-bold text-primary cursor-pointer hover:underline">LIHAT SEMUA</span>
                </div>
                <div className="space-y-5 overflow-y-auto max-h-[300px] pr-2">
                    {stats.aktivitas.length > 0 ? (
                      stats.aktivitas.map((act, i) => (
                      <div key={i} className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-surface-container flex-shrink-0 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-lg">{act.icon}</span>
                          </div>
                          <div>
                          <p className="text-xs text-on-surface leading-tight font-medium font-body">{act.text}</p>
                          <p className="text-[9px] text-outline mt-1 font-bold tracking-widest">{act.time}</p>
                          </div>
                      </div>
                      ))
                    ) : (
                      <p className="text-xs text-on-surface-variant font-body italic">Belum ada aktivitas baru.</p>
                    )}
                </div>
            </div>
        </div>
      </main>

      {/* --- POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-8 top-8 w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="p-10 lg:p-14">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-[#0F5A3E] flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined">edit_square</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-on-surface">Update Data Cepat</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">PILIH WILAYAH</label>
                  <div className="relative">
                    <select 
                      value={formData.wilayah}
                      onChange={(e) => setFormData({...formData, wilayah: e.target.value})}
                      className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none font-body text-sm appearance-none cursor-pointer focus:border-[#0F5A3E] focus:bg-white transition-all"
                    >
                      <option value="">Pilih lokasi wilayah...</option>
                      {daftarWilayah.map((w) => (
                        <option key={w.id} value={w.wilayah}>{w.wilayah}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">map</span>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">SEKOLAH TERJANGKAU (DI WILAYAH INI)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.sekolah}
                      onChange={(e) => setFormData({...formData, sekolah: e.target.value})}
                      placeholder="Masukkan jumlah sekolah..." 
                      className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 focus:border-[#0F5A3E] focus:bg-white outline-none font-body text-sm transition-all" 
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">school</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-4 mt-12">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                >
                  Batal
                </button>
                
                <button 
                  onClick={handleUpdate}
                  className="px-10 py-4 rounded-3xl font-bold bg-[#0F5A3E] text-white shadow-lg shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-body text-[10px] uppercase tracking-widest"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;