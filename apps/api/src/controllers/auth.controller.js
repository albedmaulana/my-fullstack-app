import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * POST /api/login-admin
 * Autentikasi admin dan mengembalikan JWT token.
 */
export const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username dan password wajib diisi.'
    });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Username atau Password salah!'
      });
    }

    // Support both hashed and plain-text passwords (backward compat)
    let isValid = false;
    if (admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$')) {
      isValid = await bcrypt.compare(password, admin.password);
    } else {
      // Legacy plain-text comparison
      isValid = admin.password === password;
    }

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Username atau Password salah!'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log activity
    await prisma.activityLog.create({
      data: {
        entity: 'admin',
        action: 'login',
        detail: `Admin "${admin.nama}" berhasil login.`,
        icon: 'login'
      }
    });

    res.json({
      success: true,
      data: {
        id: admin.id,
        nama: admin.nama,
        foto: admin.foto,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/register-user
 * Registrasi user baru.
 */
export const registerUser = async (req, res, next) => {
  const { nama, email, password, phone } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Nama, email, dan password wajib diisi.'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password minimal 6 karakter.'
    });
  }

  try {
    // Cek email sudah terdaftar
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar. Silakan gunakan email lain.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nama,
        email,
        phone: phone || null,
        password: hashedPassword,
        foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Registrasi berhasil!',
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        foto: user.foto,
        role: 'user',
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/login-user
 * Login user biasa.
 */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email dan password wajib diisi.'
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau Password salah!'
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Email atau Password salah!'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        foto: user.foto,
        role: 'user',
        token
      }
    });
  } catch (error) {
    next(error);
  }
};
