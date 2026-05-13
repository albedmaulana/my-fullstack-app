import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const [adminData, setAdminData] = useState({
    username: 'Memuat...',
    profile_pic: ''
  });

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboardadmin' },
    { name: 'Kelola Statistik', icon: 'analytics', path: '/statistikadmin' },
    { name: 'Kelola Menu', icon: 'restaurant', path: '/menuadmin' },
    { name: 'Kelola Berita', icon: 'newspaper', path: '/beritaadmin' },
    { name: 'Kelola Galeri', icon: 'photo_library', path: '/galeriadmin' },
    { name: 'Kotak Masuk', icon: 'mail', path: '/inbox' },
  ];

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminId = localStorage.getItem('adminId') || 1;
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/admins/${adminId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (response.ok) {
          const result = await response.json();
          const data = result.data || result;
          setAdminData({
            username: data.nama || 'Admin',
            profile_pic: data.foto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          });
        }
      } catch (error) {
        console.error("Gagal memuat profil admin:", error);
        setAdminData({
          username: "Error Load",
          profile_pic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        });
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminName');
      localStorage.removeItem('userRole');
      navigate('/loginadmin'); 
    }
  };

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 z-40 bg-surface-container-low dark:bg-slate-900 shadow-xl flex flex-col p-6 border-r border-outline-variant/10">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-black text-primary font-headline">Makanan Bergizi</h1>
        <p className="text-xs text-outline font-medium tracking-tight">Administrator</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-white dark:bg-slate-800 text-primary font-bold shadow-sm ring-1 ring-black/5' 
                : 'text-on-surface-variant hover:bg-white/50 dark:hover:bg-slate-800/50 hover:translate-x-1'
              }
            `}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-body text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 px-4 border-t border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border border-outline-variant/20">
            {adminData.profile_pic && (
              <img 
                alt="Admin" 
                className="w-full h-full object-cover" 
                src={adminData.profile_pic} 
              />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-on-surface">{adminData.username}</p>
            <button 
              onClick={handleLogout}
              className="text-[10px] text-outline tracking-wider font-label font-bold hover:text-red-500 transition-colors uppercase"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;