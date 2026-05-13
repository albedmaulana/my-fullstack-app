import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import MenuGridAdmin from './MenuGridAdmin';
import MenuFormAdmin from './MenuFormAdmin'; 
import MenuFooterAdmin from './MenuFooterAdmin';
import MenuEditAdmin from './MenuEditAdmin'; 

const MenuAdmin = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // Fungsi untuk refresh grid setelah simpan/edit
  const handleRefreshGrid = () => {
    setRefreshKey(prev => prev + 1);
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  // Fungsi untuk membuka modal edit
  const handleEditMenu = (menu) => {
    setSelectedMenu(menu); 
    setIsModalOpen(true);  
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex relative">
      <Sidebar />

      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <main className="p-8 lg:p-12 flex-grow">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-label text-[10px] font-bold tracking-widest uppercase mb-3">
                Kitchen Management
              </span>
              <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">
                Kelola Menu Mingguan
              </h2>
              <p className="text-on-surface-variant mt-2 max-w-md">
                Atur ketersediaan menu dan komposisi nutrisi untuk layanan makanan sekolah pekan ini.
              </p>
            </div>
            
            <button 
              onClick={() => {
                setSelectedMenu(null); 
                setIsModalOpen(true);
              }}
              className="bg-[#096138] text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">add</span>
              Buat Menu Baru
            </button>
          </header>

          <MenuGridAdmin 
            key={`grid-${refreshKey}`} 
            onEditClick={handleEditMenu} 
          />
        </main>

        <MenuFooterAdmin />
      </div>

      {/* --- MODAL POP-UP (TAMBAH & EDIT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Overlay - Menggunakan Blur dan kegelapan lebih tinggi agar kontras */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content Container */}
          <div className="relative w-full max-w-4xl animate-in fade-in zoom-in duration-300 z-[10000]">
            
            {/* TOMBOL X CLOSE: Diberi z-index 10002 agar di atas segalanya */}
            <button 
              type="button"
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-[10002] w-12 h-12 flex items-center justify-center rounded-full bg-white text-red-600 shadow-2xl hover:bg-red-50 transition-all border border-slate-200 active:scale-90"
              aria-label="Tutup"
            >
              <span className="material-symbols-outlined font-bold" style={{ fontSize: '28px' }}>
                close
              </span>
            </button>

            {/* Area Box Putih Konten */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-[10001]">
              {selectedMenu ? (
                <MenuEditAdmin 
                  menuData={selectedMenu} 
                  onSaveSuccess={handleRefreshGrid}
                  onClose={handleCloseModal}
                />
              ) : (
                <MenuFormAdmin 
                  initialData={null} 
                  onSaveSuccess={handleRefreshGrid} 
                  isModal={true} 
                  onClose={handleCloseModal}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuAdmin;