import express from 'express';
import cors from 'cors';

// Import semua routes
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import statistikRoutes from './routes/statistik.routes.js';
import menuRoutes from './routes/menu.routes.js';
import beritaRoutes from './routes/berita.routes.js';
import galeriRoutes from './routes/galeri.routes.js';
import aspirasiRoutes from './routes/aspirasi.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// ==========================================
// MIDDLEWARE GLOBAL
// ==========================================

// CORS — izinkan frontend Vite (multiple ports)
app.use(cors({
  origin: [
    'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
    'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Logger — catat setiap request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ==========================================
// REGISTRASI ROUTES
// ==========================================
// Setiap route terpisah berdasarkan domain/modul

app.use('/api', authRoutes);        // POST /api/login-admin
app.use('/api', adminRoutes);       // GET  /api/admins/:id
app.use('/api', dashboardRoutes);   // GET  /api/stats-dashboard
app.use('/api', statistikRoutes);   // CRUD /api/statistik
app.use('/api', menuRoutes);        // CRUD /api/menus
app.use('/api', beritaRoutes);      // CRUD /api/berita
app.use('/api', galeriRoutes);      // CRUD /api/galeri
app.use('/api', aspirasiRoutes);    // CRUD /api/aspirasi
app.use('/api', newsletterRoutes);  // POST /api/newsletter/*

// ==========================================
// HEALTH CHECK
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server API Makanan Bergizi berjalan dengan baik!',
    timestamp: new Date().toISOString(),
    routes: [
      'POST /api/login-admin',
      'GET  /api/admins/:id',
      'GET  /api/stats-dashboard',
      'CRUD /api/statistik',
      'CRUD /api/menus',
      'CRUD /api/berita',
      'CRUD /api/galeri',
      'CRUD /api/aspirasi',
      'POST /api/newsletter/subscribe'
    ]
  });
});

// ==========================================
// GLOBAL ERROR HANDLER (harus terakhir)
// ==========================================
app.use(errorHandler);

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║  🚀 Server Backend Makanan Bergizi            ║');
  console.log(`║  📡 Berjalan di http://localhost:${PORT}          ║`);
  console.log('║  📋 Health: https://my-fullstack-app-api.vercel.app/api/health   ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log('');
  console.log('Routes terdaftar:');
  console.log('  ├─ /api/login-admin      (Auth)');
  console.log('  ├─ /api/admins           (Admin Profile)');
  console.log('  ├─ /api/stats-dashboard  (Dashboard)');
  console.log('  ├─ /api/statistik        (Statistik Wilayah)');
  console.log('  ├─ /api/menus            (Menu Nutrisi)');
  console.log('  ├─ /api/berita           (Berita & Artikel)');
  console.log('  ├─ /api/galeri           (Galeri Dokumentasi)');
  console.log('  ├─ /api/aspirasi         (Aspirasi / Inbox)');
  console.log('  └─ /api/newsletter       (Newsletter)');
  console.log('');
});
