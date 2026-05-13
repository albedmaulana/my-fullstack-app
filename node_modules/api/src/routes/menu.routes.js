import { Router } from 'express';
import {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '../controllers/menu.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/menus', getAllMenus);
router.get('/menus/:id', getMenuById);

// Protected (admin only)
router.post('/menus', authMiddleware, createMenu);
router.put('/menus/:id', authMiddleware, updateMenu);
router.delete('/menus/:id', authMiddleware, deleteMenu);

export default router;
