import { Router } from 'express';
import { loginAdmin, registerUser, loginUser } from '../controllers/auth.controller.js';

const router = Router();

// POST /api/login-admin — Login admin
router.post('/login-admin', loginAdmin);

// POST /api/register-user — Register user baru
router.post('/register-user', registerUser);

// POST /api/login-user — Login user
router.post('/login-user', loginUser);

export default router;
