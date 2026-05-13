import { Router } from 'express';
import { getAdminProfile } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/admins/:id — Profil admin (protected)
router.get('/admins/:id', authMiddleware, getAdminProfile);

export default router;
