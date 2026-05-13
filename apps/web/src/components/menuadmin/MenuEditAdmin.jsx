import React, { useState, useEffect, useRef } from 'react';

const MenuEditAdmin = ({ menuData, onSaveSuccess, onClose }) => {
  const fileInputRef = useRef(null); // Ref untuk input file
  const [formData, setFormData] = useState({
    id: '', 
    name: '', 
    day: 'Senin', 
    date: '', 
    description: '',
    status: 'Draft', 
    energy: 0, 
    protein: 0, 
    karbo: 0,
    lemak: 0,
    category: 'Makan Siang',
    img: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menuData) {
      const formattedDate = menuData.date 
        ? new Date(menuData.date).toISOString().split('T')[0] 
        : '';
      
      setFormData({ 
        ...menuData,
        date: formattedDate,
        energy: menuData.energy || 0,
        protein: menuData.protein || 0,
        karbo: menuData.karbo || 0,
        lemak: menuData.lemak || 0,
        category: menuData.category || 'Makan Siang'
      });
    }
  }, [menuData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk memicu jendela pilih file
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  // Fungsi untuk preview foto setelah dipilih
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, img: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://my-fullstack-app-api.vercel.app/api/menus/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData), 
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("✅ Perubahan Berhasil Disimpan!");
        onSaveSuccess();
      } else {
        alert(result.message || "Gagal mengupdate menu.");
      }
    } catch (error) {
      alert("❌ Koneksi server bermasalah.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[95vh]">
      
      {/* Bagian Kiri: Ubah Gambar (Menggantikan Preview Mode) */}
      <div 
        onClick={handlePhotoClick}
        className="w-full md:w-2/5 bg-slate-100 relative group overflow-hidden border-r border-slate-100 cursor-pointer"
      >
        {formData.img ? (
          <img src={formData.img} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-300 p-8">
            <span className="material-symbols-outlined text-6xl mb-2">image</span>
            <p className="text-xs font-bold uppercase tracking-widest text-center">No Image Preview</p>
          </div>
        )}
        
        {/* Overlay Ubah Gambar */}
        <div className="absolute inset-0 bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm">
             <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-white text-3xl">cloud_upload</span>
                <p className="text-white text-xs font-bold border border-white px-4 py-2 rounded-full uppercase tracking-widest">Ubah Gambar</p>
             </div>
        </div>

        {/* Input file tersembunyi */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*" 
        />
      </div>

      {/* Bagian Kanan: Form Content */}
      <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto flex flex-col relative">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-800 leading-tight">Edit Detail Menu</h2>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tighter">ID Transaksi: {formData.id}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Input Nama */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-primary tracking-widest ml-1">Nama Menu</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700 transition-all" />
            </div>

            {/* Hari & Tanggal */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Hari</label>
                <select name="day" value={formData.day} onChange={handleChange} 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 transition-all">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tanggal</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
            </div>

            {/* Nutrisi */}
            <div className="grid grid-cols-2 gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/10">
              <div className="text-center">
                <p className="text-[9px] font-black text-primary uppercase mb-1">Energi (Kkal)</p>
                <input type="number" name="energy" value={formData.energy} onChange={handleChange} 
                  className="w-full bg-transparent text-center text-xl font-black text-primary outline-none" />
              </div>
              <div className="text-center border-l border-primary/20">
                <p className="text-[9px] font-black text-primary uppercase mb-1">Protein (gr)</p>
                <input type="number" name="protein" value={formData.protein} onChange={handleChange} 
                  className="w-full bg-transparent text-center text-xl font-black text-primary outline-none" />
              </div>
              <div className="text-center border-t border-primary/20">
                <p className="text-[9px] font-black text-primary uppercase mb-1">Karbo (gr)</p>
                <input type="number" name="karbo" value={formData.karbo} onChange={handleChange} 
                  className="w-full bg-transparent text-center text-xl font-black text-primary outline-none" />
              </div>
              <div className="text-center border-l border-t border-primary/20">
                <p className="text-[9px] font-black text-primary uppercase mb-1">Lemak (gr)</p>
                <input type="number" name="lemak" value={formData.lemak} onChange={handleChange} 
                  className="w-full bg-transparent text-center text-xl font-black text-primary outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange} 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 transition-all">
                <option value="Sarapan Pagi">Sarapan Pagi</option>
                <option value="Makan Siang">Makan Siang</option>
                <option value="Makan Malam">Makan Malam</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            {/* Status Publikasi */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status Publikasi</label>
              <select name="status" value={formData.status} onChange={handleChange} 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 transition-all">
                <option value="Active">✅ Active (Tampil di User)</option>
                <option value="Draft">📝 Draft (Tersembunyi)</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Keterangan Singkat</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="2" 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none text-slate-600 resize-none font-medium text-sm focus:ring-2 focus:ring-primary/20 outline-none"></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-50 mt-auto">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] py-4 rounded-2xl bg-[#096138] text-white font-black shadow-lg hover:shadow-green-900/30 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Update Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuEditAdmin;