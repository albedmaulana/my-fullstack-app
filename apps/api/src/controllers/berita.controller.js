import prisma from '../lib/prisma.js';

/**
 * Helper: generate slug dari judul.
 */
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * GET /api/berita
 * List berita (publik, paginated).
 * Query params: ?page=1&limit=10&kategori=Edukasi&status=Published
 */
export const getAllBerita = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const where = {};
    if (req.query.kategori) where.kategori = req.query.kategori;
    if (req.query.status) {
      where.status = req.query.status;
    } else {
      // Default: hanya tampilkan yang Published untuk publik
      where.status = 'Published';
    }

    const [data, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { nama: true, foto: true }
          }
        }
      }),
      prisma.berita.count({ where })
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
 * GET /api/berita/all
 * List SEMUA berita termasuk draft (admin).
 */
export const getAllBeritaAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.berita.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { nama: true, foto: true }
          }
        }
      }),
      prisma.berita.count()
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
 * GET /api/berita/:slug
 * Detail berita by slug (publik).
 */
export const getBeritaBySlug = async (req, res, next) => {
  try {
    const berita = await prisma.berita.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: {
          select: { nama: true, foto: true }
        }
      }
    });

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan.'
      });
    }

    res.json({ success: true, data: berita });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/berita
 * Buat berita baru (admin).
 */
export const createBerita = async (req, res, next) => {
  const { judul, ringkasan, konten, gambar, kategori, status } = req.body;

  if (!judul || !ringkasan || !konten) {
    return res.status(400).json({
      success: false,
      message: 'Judul, ringkasan, dan konten wajib diisi.'
    });
  }

  try {
    // Generate unique slug
    let slug = generateSlug(judul);
    const existing = await prisma.berita.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const isPublished = status === 'Published';

    const result = await prisma.berita.create({
      data: {
        judul,
        slug,
        ringkasan,
        konten,
        gambar: gambar || null,
        kategori: kategori || 'Edukasi',
        status: status || 'Draft',
        publishedAt: isPublished ? new Date() : null,
        authorId: req.adminId
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'berita',
        action: 'created',
        detail: `Berita "${judul}" berhasil dibuat${isPublished ? ' dan dipublikasikan' : ' sebagai draft'}.`,
        icon: 'edit_note'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/berita/:id
 * Update berita (admin).
 */
export const updateBerita = async (req, res, next) => {
  const { id } = req.params;
  const { judul, ringkasan, konten, gambar, kategori, status } = req.body;

  try {
    const existing = await prisma.berita.findUnique({ where: { id: parseInt(id) } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

    // If status changing to Published and wasn't before, set publishedAt
    const isNewlyPublished = status === 'Published' && existing.status !== 'Published';

    const result = await prisma.berita.update({
      where: { id: parseInt(id) },
      data: {
        ...(judul && { judul, slug: generateSlug(judul) !== existing.slug ? generateSlug(judul) : existing.slug }),
        ...(ringkasan && { ringkasan }),
        ...(konten && { konten }),
        ...(gambar !== undefined && { gambar }),
        ...(kategori && { kategori }),
        ...(status && { status }),
        ...(isNewlyPublished && { publishedAt: new Date() })
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'berita',
        action: 'updated',
        detail: `Berita "${result.judul}" berhasil diperbarui.`,
        icon: 'edit'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/berita/:id
 * Hapus berita (admin).
 */
export const deleteBerita = async (req, res, next) => {
  try {
    const existing = await prisma.berita.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' });
    }

    await prisma.berita.delete({ where: { id: parseInt(req.params.id) } });

    await prisma.activityLog.create({
      data: {
        entity: 'berita',
        action: 'deleted',
        detail: `Berita "${existing.judul}" telah dihapus.`,
        icon: 'delete'
      }
    });

    res.json({ success: true, message: `Berita "${existing.judul}" berhasil dihapus.` });
  } catch (error) {
    next(error);
  }
};
