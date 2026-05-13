import React, { useState, useEffect, useRef } from 'react';

const StatistikContent = () => {
  const [dataStatistik, setDataStatistik] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const formRef = useRef(null);

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // --- PERBAIKAN: State Riwayat Aktivitas dengan LocalStorage agar tidak reset saat refresh ---
  const [lastActivity, setLastActivity] = useState(() => {
    const savedLog = localStorage.getItem('statistik_last_activity');
    return savedLog ? JSON.parse(savedLog) : {
      wilayah: 'Sistem',
      aksi: 'Siap digunakan',
      waktu: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  });
  
  const [trenNasional, setTrenNasional] = useState("+0.0");
  
  // State Form
  const [formData, setFormData] = useState({
    id: null,
    wilayah: '',
    total_porsi: '',
    target_penerima: '',
    realisasi_porsi: '',
    jangkauan_sekolah: '',
    pertumbuhan: '+0%',
    status: 'PROSES'
  });

  const [summary, setSummary] = useState({
    capaian: "0",
    anggaran: "0",
    lastUpdate: "Memuat..."
  });

  useEffect(() => {
    fetchStatistik();
  }, []);

  // --- PERBAIKAN: Fungsi Update Log yang menyimpan ke LocalStorage ---
  const updateActivityLog = (wilayah, aksi) => {
    const newLog = {
      wilayah: wilayah,
      aksi: aksi,
      waktu: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLastActivity(newLog);
    localStorage.setItem('statistik_last_activity', JSON.stringify(newLog));
  };

  const fetchStatistik = async () => {
    try {
      const response = await fetch('https://my-fullstack-app-api.vercel.app/api/statistik');
      const data = await response.json();
      const sortedData = [...data].reverse();
      setDataStatistik(sortedData);

      if (data.length > 0) {
        const totalPorsiSemua = data.reduce((acc, curr) => acc + Number(curr.total_porsi), 0);
        const targetNasional = 10000; 
        const persentaseCapaian = ((totalPorsiSemua / targetNasional) * 100).toFixed(1);

        const totalPertumbuhanRaw = data.reduce((acc, curr) => {
            const num = parseFloat(curr.pertumbuhan?.replace('%', '') || 0);
            return acc + (isNaN(num) ? 0 : num);
        }, 0);
        const rataRataTren = (totalPertumbuhanRaw / data.length).toFixed(1);
        setTrenNasional((rataRataTren >= 0 ? "+" : "") + rataRataTren);

        const biayaPerPorsi = 15000;
        const totalAnggaranRaw = totalPorsiSemua * biayaPerPorsi;
        const totalAnggaranJuta = (totalAnggaranRaw / 1000000).toLocaleString('id-ID', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        });

        const now = new Date();
        setSummary({
          capaian: persentaseCapaian,
          anggaran: totalAnggaranJuta,
          lastUpdate: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      } else {
        setSummary({ capaian: "0", anggaran: "0", lastUpdate: "-" });
      }
    } catch (err) {
      console.error("Gagal memuat data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const isUpdate = formData.id !== null;
      
      const dataReferensi = dataStatistik.find(item => 
        (isUpdate && item.id === formData.id) || 
        (!isUpdate && item.wilayah.toLowerCase() === formData.wilayah.toLowerCase())
      );

      let persentasePertumbuhan = "+0%";

      if (dataReferensi) {
        const porsiLama = Number(dataReferensi.total_porsi);
        const porsiBaru = Number(formData.total_porsi);

        if (isUpdate && porsiLama === porsiBaru) {
          persentasePertumbuhan = dataReferensi.pertumbuhan;
        } 
        else if (porsiLama > 0) {
          const hitung = ((porsiBaru - porsiLama) / porsiLama) * 100;
          persentasePertumbuhan = (hitung >= 0 ? "+" : "") + hitung.toFixed(1) + "%";
        }
      }

      const url = isUpdate 
        ? `https://my-fullstack-app-api.vercel.app/api/statistik/${formData.id}` 
        : 'https://my-fullstack-app-api.vercel.app/api/statistik';
      const method = isUpdate ? 'PUT' : 'POST';
      const jenisAksi = isUpdate ? "berhasil diperbarui" : "berhasil ditambahkan";

      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          wilayah: formData.wilayah,
          total_porsi: Number(formData.total_porsi),
          target_penerima: Number(formData.target_penerima) || 0,
          realisasi_porsi: Number(formData.realisasi_porsi) || 0,
          jangkauan_sekolah: Number(formData.jangkauan_sekolah) || 0,
          pertumbuhan: persentasePertumbuhan,
          status: formData.status
        }),
      });

      if (response.ok) {
        alert(`Data ${formData.wilayah} ${jenisAksi}!`);
        updateActivityLog(formData.wilayah, jenisAksi);
        
        setFormData({ id: null, wilayah: '', total_porsi: '', target_penerima: '', realisasi_porsi: '', jangkauan_sekolah: '', pertumbuhan: '+0%', status: 'PROSES' });
        setIsModalOpen(false);
        await fetchStatistik();
      } else {
        const errorData = await response.json();
        alert("Gagal menyimpan: " + (errorData.message || "Terjadi kesalahan pada server"));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal terhubung ke database. Pastikan backend Anda berjalan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, wilayah) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data wilayah ${wilayah}?`)) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://my-fullstack-app-api.vercel.app/api/statistik/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          alert(`Data ${wilayah} berhasil dihapus.`);
          updateActivityLog(wilayah, "telah dihapus dari sistem");
          if (currentRows.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
          }
          await fetchStatistik();
        }
      } catch (err) {
        alert("Koneksi gagal.");
      }
    }
  };

  const handleEditClick = (item) => {
    setFormData({
      id: item.id,
      wilayah: item.wilayah,
      total_porsi: item.total_porsi.toString(),
      target_penerima: (item.target_penerima || 0).toString(),
      realisasi_porsi: (item.realisasi_porsi || 0).toString(),
      jangkauan_sekolah: (item.jangkauan_sekolah || 0).toString(),
      pertumbuhan: item.pertumbuhan,
      status: item.status || 'PROSES'
    });
    
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dataStatistik.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(dataStatistik.length / rowsPerPage);

  const handleOpenMap = () => {
    window.open('https://www.google.com/maps/search/distribusi+makanan+indonesia', '_blank');
  };

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'SELESAI': return 'bg-emerald-100 text-emerald-700';
      case 'PROSES': return 'bg-amber-100 text-amber-700';
      case 'DIJADWALKAN': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-[#096138]/10 text-[#096138] font-label text-[10px] font-bold tracking-widest uppercase mb-3">
            Data Management
          </span>
          <h2 className="text-4xl font-extrabold font-headline text-[#1a1a2e] tracking-tight leading-tight">
            Kelola Statistik
          </h2>
        </div>

        <button 
          onClick={() => {
            setFormData({ id: null, wilayah: '', total_porsi: '', target_penerima: '', realisasi_porsi: '', jangkauan_sekolah: '', pertumbuhan: '+0%', status: 'PROSES' });
            setIsModalOpen(true);
          }}
          className="bg-[#096138] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2d7a4f] transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Data Baru
        </button>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <section ref={formRef} className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-[#096138]">
            <span className="material-symbols-outlined">edit_square</span>
            <h3 className="text-xl font-bold text-[#1a1a2e]">Update Angka Distribusi</h3>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Nama Wilayah</label>
              <input 
                type="text" required placeholder="Contoh: Jawa Barat" 
                value={formData.wilayah}
                onChange={(e) => setFormData({...formData, wilayah: e.target.value})}
                className="bg-[#f5f2ff] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#096138]/20" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Total Porsi</label>
              <input 
                type="number" required placeholder="Contoh: 1250000" 
                value={formData.total_porsi}
                onChange={(e) => setFormData({...formData, total_porsi: e.target.value})}
                className="bg-[#f5f2ff] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#096138]/20" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Target Penerima</label>
              <input 
                type="number" placeholder="Contoh: 15000" 
                value={formData.target_penerima}
                onChange={(e) => setFormData({...formData, target_penerima: e.target.value})}
                className="bg-[#f5f2ff] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#096138]/20" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Realisasi Porsi</label>
              <input 
                type="number" placeholder="Contoh: 12500" 
                value={formData.realisasi_porsi}
                onChange={(e) => setFormData({...formData, realisasi_porsi: e.target.value})}
                className="bg-[#f5f2ff] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#096138]/20" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Jangkauan Sekolah</label>
              <input 
                type="number" placeholder="Contoh: 42" 
                value={formData.jangkauan_sekolah}
                onChange={(e) => setFormData({...formData, jangkauan_sekolah: e.target.value})}
                className="bg-[#f5f2ff] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#096138]/20" 
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Status Distribusi</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="bg-[#f5f2ff] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#096138]/20 appearance-none"
              >
                <option value="PROSES">PROSES</option>
                <option value="SELESAI">SELESAI</option>
                <option value="DIJADWALKAN">DIJADWALKAN</option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button 
                type="button" 
                onClick={() => setFormData({id: null, wilayah: '', total_porsi: '', target_penerima: '', realisasi_porsi: '', jangkauan_sekolah: '', pertumbuhan: '+0%', status: 'PROSES'})}
                className="text-slate-400 font-bold hover:text-slate-600"
              >
                Batalkan
              </button>
              <button 
                type="submit" disabled={loading}
                className="bg-[#2d7a4f] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Perbarui Data'}
              </button>
            </div>
          </form>
        </section>

        <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#f5f2ff] p-6 rounded-2xl border border-slate-100 flex-1">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Capaian Nasional</p>
            <h4 className="text-4xl font-black text-[#1a1a2e]">{summary.capaian}%</h4>
            <span className={`text-sm font-bold flex items-center gap-1 mt-2 ${parseFloat(trenNasional) >= 0 ? 'text-[#096138]' : 'text-red-600'}`}>
              <span className="material-symbols-outlined text-sm">
                {parseFloat(trenNasional) >= 0 ? 'trending_up' : 'trending_down'}
              </span> 
              {trenNasional}%
            </span>
          </div>
          <div className="bg-[#feae2c] p-6 rounded-2xl text-white flex-1">
            <p className="text-xs font-bold uppercase opacity-80 mb-1">Anggaran Terpakai</p>
            <h4 className="text-4xl font-black">Rp {summary.anggaran}jt</h4>
            <p className="text-[10px] mt-4 opacity-70 italic">Update terakhir: {summary.lastUpdate}</p>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#1a1a2e]">Data Update Terakhir</h3>
          <div className="flex items-center gap-4">
             <span className="text-xs font-bold text-slate-400 uppercase">Halaman {currentPage} dari {totalPages || 1}</span>
             <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fcf8ff] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="pl-6 pr-3 py-4">Wilayah</th>
                <th className="px-3 py-4 text-right">Porsi</th>
                <th className="px-3 py-4 text-right">Target</th>
                <th className="px-3 py-4">Realisasi</th>
                <th className="px-3 py-4 text-center">Sekolah</th>
                <th className="px-3 py-4 text-center">Tren</th>
                <th className="px-3 py-4 text-center">Status</th>
                <th className="pl-3 pr-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentRows.length > 0 ? (
                currentRows.map((item) => {
                  const pct = (item.target_penerima || 0) > 0
                    ? Math.round(((item.realisasi_porsi || 0) / item.target_penerima) * 100)
                    : 0;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="pl-6 pr-3 py-4 font-bold text-[#1a1a2e] whitespace-nowrap">{item.wilayah}</td>
                      <td className="px-3 py-4 text-right text-slate-600 font-medium tabular-nums">{Number(item.total_porsi).toLocaleString('id-ID')}</td>
                      <td className="px-3 py-4 text-right text-slate-600 tabular-nums">{Number(item.target_penerima || 0).toLocaleString('id-ID')}</td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700 tabular-nums min-w-[50px]">{Number(item.realisasi_porsi || 0).toLocaleString('id-ID')}</span>
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center text-slate-600">{Number(item.jangkauan_sekolah || 0).toLocaleString('id-ID')}</td>
                      <td className="px-3 py-4 text-center">
                        <span className={`text-xs font-bold ${parseFloat(item.pertumbuhan) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{item.pertumbuhan}</span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${getStatusStyle(item.status)}`}>
                          {item.status || 'PROSES'}
                        </span>
                      </td>
                      <td className="pl-3 pr-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEditClick(item)} 
                            className="material-symbols-outlined text-lg text-slate-400 hover:text-[#096138] transition-colors"
                          >edit</button>
                          <button 
                            onClick={() => handleDelete(item.id, item.wilayah)} 
                            className="material-symbols-outlined text-lg text-slate-400 hover:text-red-600 transition-colors"
                          >delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                   <td colSpan="8" className="px-6 py-10 text-center text-slate-400 italic">Belum ada data di database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pb-10">
        <section className="bg-[#f5f2ff] rounded-2xl p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-[#096138]">
            <span className="material-symbols-outlined">history</span>
            <h3 className="text-xl font-bold text-[#1a1a2e]">Riwayat Aktivitas</h3>
          </div>
          <div className="flex gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-[#096138] flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-white text-lg">check</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a2e]">
                  {lastActivity.wilayah === 'Sistem' ? 'Sistem' : `Sinkronisasi data ${lastActivity.wilayah}`}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {lastActivity.aksi} pada pukul {lastActivity.waktu}
                </p>
              </div>
          </div>
        </section>

        <section className="relative rounded-2xl overflow-hidden group min-h-[300px] shadow-lg shadow-emerald-900/10">
          <img alt="Peta Indonesia" src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#096138]/95 p-8 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-bold mb-2">Visualisasi Geografis</h3>
            <button onClick={handleOpenMap} className="bg-white text-[#096138] px-6 py-3 rounded-xl font-bold self-start flex items-center gap-2 hover:bg-emerald-50 transition-colors">
              Buka Peta Interaktif <span className="material-symbols-outlined text-sm">map</span>
            </button>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-[#096138] p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">add_chart</span> {formData.id ? 'Edit Data' : 'Tambah Data Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Wilayah</label>
                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.wilayah} onChange={(e) => setFormData({...formData, wilayah: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Total Porsi</label>
                  <input type="number" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.total_porsi} onChange={(e) => setFormData({...formData, total_porsi: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Target Penerima</label>
                  <input type="number" placeholder="0" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.target_penerima} onChange={(e) => setFormData({...formData, target_penerima: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Realisasi Porsi</label>
                  <input type="number" placeholder="0" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.realisasi_porsi} onChange={(e) => setFormData({...formData, realisasi_porsi: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Jangkauan Sekolah</label>
                  <input type="number" placeholder="0" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.jangkauan_sekolah} onChange={(e) => setFormData({...formData, jangkauan_sekolah: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="PROSES">PROSES</option>
                  <option value="SELESAI">SELESAI</option>
                  <option value="DIJADWALKAN">DIJADWALKAN</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-slate-400">Batal</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#096138] text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 disabled:opacity-50">
                  {loading ? 'Proses...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatistikContent;