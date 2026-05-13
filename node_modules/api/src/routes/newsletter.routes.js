import { Router } from 'express';
import {
  subscribe,
  unsubscribe,
  getSubscribers
} from '../controllers/newsletter.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.post('/newsletter/subscribe', subscribe);
router.post('/newsletter/unsubscribe', unsubscribe);

// Protected (admin only)
router.get('/newsletter/subscribers', authMiddleware, getSubscribers);

export default router;
