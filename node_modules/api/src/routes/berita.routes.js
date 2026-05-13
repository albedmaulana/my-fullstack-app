import { Router } from 'express';
import {
  getAllBerita,
  getAllBeritaAdmin,
  getBeritaBySlug,
  createBerita,
  updateBerita,
  deleteBerita
} from '../controllers/berita.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/berita', getAllBerita);
router.get('/berita/:slug', getBeritaBySlug);

// Protected (admin only)
router.get('/berita-admin', authMiddleware, getAllBeritaAdmin);
router.post('/berita', authMiddleware, createBerita);
router.put('/berita/:id', authMiddleware, updateBerita);
router.delete('/berita/:id', authMiddleware, deleteBerita);

export default router;
