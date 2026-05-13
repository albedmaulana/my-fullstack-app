import { Router } from 'express';
import {
  getAllAspirasi,
  getAspirasiById,
  createAspirasi,
  updateAspirasiStatus,
  deleteAspirasi
} from '../controllers/aspirasi.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Public — form aspirasi
router.post('/aspirasi', createAspirasi);

// Protected — inbox admin
router.get('/aspirasi', authMiddleware, getAllAspirasi);
router.get('/aspirasi/:id', authMiddleware, getAspirasiById);
router.put('/aspirasi/:id', authMiddleware, updateAspirasiStatus);
router.delete('/aspirasi/:id', authMiddleware, deleteAspirasi);

export default router;
