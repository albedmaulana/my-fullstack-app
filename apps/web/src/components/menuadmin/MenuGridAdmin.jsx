import React, { useState, useEffect } from 'react';

const MenuGridAdmin = ({ onEditClick }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchMenus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menus');
      const data = await response.json();
      setMenus(data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async (e, id, name) => {
    // Mencegah bubbling agar tidak memicu klik pada parent jika ada
    e.stopPropagation();

    if (!id) {
      alert("ID Menu tidak ditemukan!");
      return;
    }

    if (window.confirm(`Apakah Anda yakin ingin menghapus menu "${name}"?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/menus/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setMenus(prevMenus => prevMenus.filter(menu => menu.id !== id));
          alert("Menu berhasil dihapus.");
        } else {
          alert(result.message || "Gagal menghapus menu dari server.");
        }
      } catch (error) {
        console.error("Error saat menghapus:", error);
        alert("Terjadi kesalahan koneksi ke server.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return <div className="p-10 text-center font-bold text-[#096138] italic">Menghubungkan ke Database...</div>;
  }

  return (
    <section className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {menus.map((menu) => (
        <div key={menu.id} className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden group border border-transparent hover:border-primary/20 transition-all">
          
          {/* Tombol Hapus */}
          <button 
            onClick={(e) => handleDelete(e, menu.id, menu.name)}
            className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            title="Hapus Menu"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>

          <div className="absolute top-0 right-0 p-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              menu.status === 'Active' ? 'bg-primary-container/20 text-primary' : 'bg-slate-200 text-slate-600'
            }`}>
              Menu {menu.status}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-primary font-bold font-headline text-lg">{menu.day}</span>
            <span className="text-xs text-slate-400 font-medium">{formatDate(menu.date)}</span>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-square relative bg-slate-100">
            <img 
              className="w-full h-full object-cover" 
              src={menu.img || 'https://via.placeholder.com/300'} 
              alt={menu.name}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
            />
          </div>

          <div>
            <h3 className="font-bold text-xl text-on-surface leading-tight mb-2 truncate" title={menu.name}>
              {menu.name}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-container-low p-2 rounded-xl text-center">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Energi</p>
                <p className="text-sm font-bold text-secondary">{menu.energy || 0} Kkal</p>
              </div>
              <div className="bg-surface-container-low p-2 rounded-xl text-center">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Protein</p>
                <p className="text-sm font-bold text-primary">{menu.protein || 0}g</p>
              </div>
            </div>
          </div>
          
          {/* Tombol Edit Menu: Sekarang dipastikan memicu navigasi melalui callback onEditClick */}
          <button 
            type="button"
            onClick={() => {
              if (onEditClick) {
                onEditClick(menu); // Ini akan memicu navigate('/menueditadmin') di MenuAdmin.jsx
              }
            }}
            className="w-full py-3 rounded-2xl bg-surface-container-high text-primary font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Menu
          </button>
        </div>
      ))}
      
      {/* State Kosong */}
      {menus.length === 0 && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 border-2 border-dashed border-outline-variant/30 opacity-80 flex flex-col gap-6 relative">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold uppercase">Empty</span>
            </div>
            <div className="flex flex-col text-slate-400">
              <span className="font-bold font-headline text-lg">Belum Ada Menu</span>
              <span className="text-xs font-medium italic">Silahkan tambah menu baru</span>
            </div>
            <div className="rounded-2xl bg-surface-container-low aspect-square flex flex-col items-center justify-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
            <button className="w-full py-3 rounded-2xl bg-slate-100 text-slate-400 font-bold cursor-not-allowed">Lengkapi Menu</button>
        </div>
      )}
    </section>
  );
};

export default MenuGridAdmin;