import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TopNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken') || localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(!!token);
    setUserName(name || '');
  }, [location]);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      setIsLoggedIn(false);
      setUserName('');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const getTabClass = (path) => {
    const baseClass = "transition-colors font-headline font-bold tracking-tight";
    if (location.pathname === path) {
      return `text-[#2D7A4F] border-b-2 border-[#2D7A4F] pb-1 ${baseClass}`;
    }
    return `text-slate-600 dark:text-slate-400 hover:text-[#2D7A4F] ${baseClass}`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm shadow-emerald-900/5 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <div className="text-xl font-extrabold text-[#2D7A4F] tracking-tighter font-headline">
          Makanan Bergizi
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link className={getTabClass('/')} to="/">Beranda</Link>
          {isLoggedIn && (
            <>
              <Link className={getTabClass('/statistik')} to="/statistik">Statistik</Link>
              <Link className={getTabClass('/menu')} to="/menu">Menu</Link>
              <Link className={getTabClass('/berita')} to="/berita">Berita</Link>
              <Link className={getTabClass('/aspirasi')} to="/aspirasi">Aspirasi</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && userName && (
            <span className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="material-symbols-outlined text-[#2D7A4F] text-lg">person</span>
              {userName}
            </span>
          )}
          <button 
            onClick={handleAuthClick} 
            className={`px-6 py-2 rounded-full font-bold transition-all active:scale-95 flex items-center gap-2 ${
              isLoggedIn 
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                : 'bg-[#2D7A4F] text-white hover:opacity-90'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{isLoggedIn ? 'logout' : 'login'}</span>
            {isLoggedIn ? 'Keluar' : 'Masuk'}
          </button>
        </div>
      </div>
    </nav>
  );
}
