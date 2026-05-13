import { Router } from 'express';
import {
  getAllStatistik,
  getStatistikById,
  createStatistik,
  updateStatistik,
  deleteStatistik
} from '../controllers/statistik.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/statistik', getAllStatistik);
router.get('/statistik/:id', getStatistikById);

// Protected (admin only)
router.post('/statistik', authMiddleware, createStatistik);
router.put('/statistik/:id', authMiddleware, updateStatistik);
router.delete('/statistik/:id', authMiddleware, deleteStatistik);

export default router;
