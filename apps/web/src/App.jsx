import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import MenuPage from './components/menu/MenuPage';
import StatistikPage from './components/statistik/StatistikPage';
import BeritaPage from './components/berita/BeritaPage';
import AspirasiPage from './components/aspirasi/AspirasiPage';
import LoginUser from './components/loginuser/LoginUser';
import DashboardAdmin from './components/dashboardadmin/DashboardAdmin';
import MenuAdmin from './components/menuadmin/MenuAdmin';
import StatistikAdmin from './components/statistikadmin/StatistikAdmin';
import LoginAdmin from './components/loginadmin/LoginAdmin';
import InboxPage from './components/inbox/InboxPage';
import RegisterUser from './components/registeruser/RegisterUser';
import BeritaAdmin from './components/beritaadmin/BeritaAdmin';
import GaleriAdmin from './components/galeriadmin/GaleriAdmin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman publik — bisa diakses tanpa login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* Halaman user — harus login dulu */}
        <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
        <Route path="/statistik" element={<ProtectedRoute><StatistikPage /></ProtectedRoute>} />
        <Route path="/berita" element={<ProtectedRoute><BeritaPage /></ProtectedRoute>} />
        <Route path="/aspirasi" element={<ProtectedRoute><AspirasiPage /></ProtectedRoute>} />

        {/* Halaman admin */}
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/menuadmin" element={<MenuAdmin />} />
        <Route path="/statistikadmin" element={<StatistikAdmin />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/beritaadmin" element={<BeritaAdmin />} />
        <Route path="/galeriadmin" element={<GaleriAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
