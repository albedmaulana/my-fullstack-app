import { Router } from 'express';
import {
  getAllGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri
} from '../controllers/galeri.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/galeri', getAllGaleri);

// Protected (admin only)
router.post('/galeri', authMiddleware, createGaleri);
router.put('/galeri/:id', authMiddleware, updateGaleri);
router.delete('/galeri/:id', authMiddleware, deleteGaleri);

export default router;
