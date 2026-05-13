import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/stats-dashboard — Ringkasan dashboard (protected)
router.get('/stats-dashboard', authMiddleware, getDashboardStats);

export default router;
