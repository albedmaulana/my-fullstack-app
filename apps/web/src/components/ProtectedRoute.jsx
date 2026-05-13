import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute — Membungkus halaman yang hanya bisa diakses user yang sudah login.
 * Jika belum login (tidak ada token di localStorage), redirect ke /login.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token') || localStorage.getItem('userToken');

  if (!token) {
    // Simpan halaman yang ingin diakses agar setelah login bisa redirect kembali
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
