import prisma from '../lib/prisma.js';

/**
 * GET /api/aspirasi
 * List semua aspirasi/pesan masuk (admin, paginated).
 * Query params: ?page=1&limit=20&status=BARU&kategori=saran
 */
export const getAllAspirasi = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.kategori) where.kategori = req.query.kategori;

    const [data, total, countByStatus] = await Promise.all([
      prisma.aspirasi.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.aspirasi.count({ where }),
      prisma.aspirasi.groupBy({
        by: ['status'],
        _count: { id: true }
      })
    ]);

    // Ringkasan jumlah per status
    const summary = {};
    countByStatus.forEach(item => {
      summary[item.status] = item._count.id;
    });

    res.json({
      success: true,
      data,
      summary,
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
 * GET /api/aspirasi/:id
 * Detail satu aspirasi (admin).
 */
export const getAspirasiById = async (req, res, next) => {
  try {
    const aspirasi = await prisma.aspirasi.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!aspirasi) {
      return res.status(404).json({
        success: false,
        message: 'Aspirasi tidak ditemukan.'
      });
    }

    // Auto-mark as read if still BARU
    if (aspirasi.status === 'BARU') {
      await prisma.aspirasi.update({
        where: { id: aspirasi.id },
        data: { status: 'DIBACA' }
      });
      aspirasi.status = 'DIBACA';
    }

    res.json({ success: true, data: aspirasi });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/aspirasi
 * Kirim aspirasi baru (publik — dari form aspirasi di frontend).
 */
export const createAspirasi = async (req, res, next) => {
  const { nama, email, kategori, pesan } = req.body;

  if (!nama || !pesan) {
    return res.status(400).json({
      success: false,
      message: 'Nama dan pesan wajib diisi.'
    });
  }

  try {
    const result = await prisma.aspirasi.create({
      data: {
        nama,
        email: email || null,
        kategori: kategori || 'saran',
        pesan,
        status: 'BARU'
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'aspirasi',
        action: 'created',
        detail: `Aspirasi baru dari "${nama}" (${kategori || 'saran'}) telah diterima.`,
        icon: 'mail'
      }
    });

    res.json({
      success: true,
      message: 'Aspirasi Anda berhasil dikirim. Terima kasih!',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/aspirasi/:id
 * Update status aspirasi (admin).
 * Body: { status: "DIBACA" | "SELESAI" | "MENDESAK" }
 */
export const updateAspirasiStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['BARU', 'DIBACA', 'SELESAI', 'MENDESAK'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status tidak valid. Gunakan salah satu: ${validStatuses.join(', ')}`
    });
  }

  try {
    const result = await prisma.aspirasi.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/aspirasi/:id
 * Hapus aspirasi (admin).
 */
export const deleteAspirasi = async (req, res, next) => {
  try {
    const existing = await prisma.aspirasi.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Aspirasi tidak ditemukan.' });
    }

    await prisma.aspirasi.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ success: true, message: 'Aspirasi berhasil dihapus.' });
  } catch (error) {
    next(error);
  }
};
