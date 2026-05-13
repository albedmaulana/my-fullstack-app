import prisma from '../lib/prisma.js';

/**
 * GET /api/galeri
 * List galeri dokumentasi (publik, paginated).
 * Query params: ?page=1&limit=12&tahun=2024
 */
export const getAllGaleri = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const where = {};
    if (req.query.tahun) where.tahun = parseInt(req.query.tahun);

    const [data, total] = await Promise.all([
      prisma.galeriDokumentasi.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.galeriDokumentasi.count({ where })
    ]);

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/galeri
 * Tambah foto dokumentasi (admin).
 */
export const createGaleri = async (req, res, next) => {
  const { judul, deskripsi, gambar, lokasi, tahun } = req.body;

  if (!judul || !gambar) {
    return res.status(400).json({
      success: false,
      message: 'Judul dan URL gambar wajib diisi.'
    });
  }

  try {
    const result = await prisma.galeriDokumentasi.create({
      data: {
        judul,
        deskripsi: deskripsi || null,
        gambar,
        lokasi: lokasi || null,
        tahun: tahun ? parseInt(tahun) : new Date().getFullYear()
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'galeri',
        action: 'created',
        detail: `Foto dokumentasi "${judul}" berhasil ditambahkan.`,
        icon: 'photo_library'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/galeri/:id
 * Update foto dokumentasi (admin).
 */
export const updateGaleri = async (req, res, next) => {
  const { id } = req.params;
  const { judul, deskripsi, gambar, lokasi, tahun } = req.body;

  try {
    const result = await prisma.galeriDokumentasi.update({
      where: { id: parseInt(id) },
      data: {
        ...(judul && { judul }),
        ...(deskripsi !== undefined && { deskripsi }),
        ...(gambar && { gambar }),
        ...(lokasi !== undefined && { lokasi }),
        ...(tahun && { tahun: parseInt(tahun) })
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/galeri/:id
 * Hapus foto dokumentasi (admin).
 */
export const deleteGaleri = async (req, res, next) => {
  try {
    const existing = await prisma.galeriDokumentasi.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Foto tidak ditemukan.' });
    }

    await prisma.galeriDokumentasi.delete({
      where: { id: parseInt(req.params.id) }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'galeri',
        action: 'deleted',
        detail: `Foto "${existing.judul}" telah dihapus dari galeri.`,
        icon: 'delete'
      }
    });

    res.json({ success: true, message: `Foto "${existing.judul}" berhasil dihapus.` });
  } catch (error) {
    next(error);
  }
};
