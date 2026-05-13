import jwt from 'jsonwebtoken';

/**
 * Middleware untuk memverifikasi JWT token.
 * Endpoint yang dilindungi harus menggunakan middleware ini.
 * Token dikirim melalui header: Authorization: Bearer <token>
 */
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak ditemukan.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tambahkan data admin ke request
    req.adminId = decoded.id;
    req.adminUsername = decoded.username;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Sesi Anda telah berakhir. Silakan login kembali.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid.'
    });
  }
};
