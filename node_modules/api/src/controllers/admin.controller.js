import prisma from '../lib/prisma.js';

/**
 * GET /api/admins/:id
 * Mengambil profil admin berdasarkan ID (nama dan foto).
 */
export const getAdminProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        nama: true,
        foto: true,
        username: true
      }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin tidak ditemukan.'
      });
    }

    res.json({
      success: true,
      data: {
        id: admin.id,
        nama: admin.nama,
        foto: admin.foto,
        username: admin.username
      }
    });
  } catch (error) {
    next(error);
  }
};
