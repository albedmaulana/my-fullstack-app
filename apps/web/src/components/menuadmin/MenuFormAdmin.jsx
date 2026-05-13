import React, { useState, useRef } from 'react';

const MenuFormAdmin = ({ onSaveSuccess, isModal, onClose }) => {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    status: 'Draft',
    description: '',
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    energy: 0,
    protein: 0,
    karbo: 0,
    lemak: 0,
    category: 'Makan Siang',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2WT8pswqmVdUDFUCpZcjfGaEb3-iaeD7cJcKN83EaWla-h7KUmznZMcQZbiRitFYfx5rs-1-iBUi4Oss3IWkXKPgOOLaN1Nboxx-QiJ1Xz_t713yHN7RLIujqjxoTAuCOf77vLKFIiN_2Q5xgpbnWtNnXyWu5aS7_TPMsuTvDA_LnpCq-yskC8Wi8NrAbbsFv3qbT9C1p2IY1Ext_B3cHz8dh6al01uonz4xXpdF5cKjFpwchp4yZINldEdSc2bwPfCMkZqozDfQ' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = ['energy', 'protein', 'karbo', 'lemak'].includes(name) ? parseInt(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, img: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://my-fullstack-app-api.vercel.app/api/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Menu berhasil disimpan!");
        if (onSaveSuccess) onSaveSuccess();
        if (onClose) onClose(); 
      }
    } catch (error) {
      alert("Gagal menyimpan ke database.");
    }
  };

  return (
    /* mt-16 dihapus agar tidak ada gap putih di bagian atas modal */
    <section className="bg-surface-container rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col max-h-[80vh]">
      <div className="flex items-center gap-4 mb-10 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined">edit_note</span>
        </div>
        <h3 className="text-2xl font-bold font-headline">Formulir Manajemen Menu</h3>
      </div>
      
      <div className="overflow-y-auto pr-2 custom-scrollbar">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <label className="block text-sm font-bold mb-4 uppercase text-on-surface-variant">Foto Menu</label>
            <div 
              onClick={handlePhotoClick}
              className="relative rounded-3xl overflow-hidden border-2 border-dashed border-outline-variant bg-surface-container-high aspect-square flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group"
            >
              <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" src={formData.img} alt="Preview" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl text-primary">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                <span className="font-bold text-sm">Ubah Foto</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Nama Menu</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                  type="text" 
                  placeholder="Masukkan nama menu..." 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Status Publikasi</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium"
                >
                  <option value="Active">Menu Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Hari Penyajian</label>
                <select 
                  name="day" 
                  value={formData.day} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Tanggal</label>
                <input 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Energi (Kkal)</label>
                <input 
                  name="energy" 
                  type="number" 
                  value={formData.energy} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Protein (g)</label>
                <input 
                  name="protein" 
                  type="number" 
                  value={formData.protein} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Karbohidrat (g)</label>
                <input 
                  name="karbo" 
                  type="number" 
                  value={formData.karbo} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Lemak (g)</label>
                <input 
                  name="lemak" 
                  type="number" 
                  value={formData.lemak} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Kategori</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium"
                >
                  <option value="Sarapan Pagi">Sarapan Pagi</option>
                  <option value="Makan Siang">Makan Siang</option>
                  <option value="Makan Malam">Makan Malam</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-on-surface-variant px-1">Deskripsi Menu</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 font-medium" 
                rows="3" 
              />
            </div>
            
            <div className="flex items-center justify-end gap-4 pt-4 sticky bottom-0 bg-surface-container pb-2">
              <button 
                type="button" 
                onClick={onClose ? onClose : () => window.location.reload()} 
                className="px-8 py-4 rounded-2xl font-bold text-on-surface-variant"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="bg-[#096138] text-on-primary px-10 py-4 rounded-3xl font-bold shadow-xl active:scale-95 transition-transform"
              >
                Simpan 
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MenuFormAdmin;