import prisma from '../lib/prisma.js';

/**
 * GET /api/statistik
 * List semua data statistik wilayah (publik).
 */
export const getAllStatistik = async (req, res, next) => {
  try {
    const data = await prisma.statistikWilayah.findMany({
      orderBy: { wilayah: 'asc' }
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/statistik/:id
 * Detail satu wilayah.
 */
export const getStatistikById = async (req, res, next) => {
  try {
    const data = await prisma.statistikWilayah.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data wilayah tidak ditemukan.'
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/statistik
 * Tambah atau upsert data wilayah (admin).
 */
export const createStatistik = async (req, res, next) => {
  const { wilayah, total_porsi, pertumbuhan, status, jangkauan_sekolah, target_penerima, realisasi_porsi } = req.body;

  if (!wilayah) {
    return res.status(400).json({
      success: false,
      message: 'Nama wilayah wajib diisi.'
    });
  }

  try {
    const result = await prisma.statistikWilayah.upsert({
      where: { wilayah },
      update: {
        total_porsi: parseInt(total_porsi) || 0,
        pertumbuhan: pertumbuhan || '+0%',
        status: status || 'PROSES',
        jangkauan_sekolah: parseInt(jangkauan_sekolah) || 0,
        target_penerima: parseInt(target_penerima) || 0,
        realisasi_porsi: parseInt(realisasi_porsi) || 0
      },
      create: {
        wilayah,
        total_porsi: parseInt(total_porsi) || 0,
        pertumbuhan: pertumbuhan || '+0%',
        status: status || 'PROSES',
        jangkauan_sekolah: parseInt(jangkauan_sekolah) || 0,
        target_penerima: parseInt(target_penerima) || 0,
        realisasi_porsi: parseInt(realisasi_porsi) || 0
      }
    });

    // Log aktivitas
    await prisma.activityLog.create({
      data: {
        entity: 'statistik',
        action: 'upsert',
        detail: `Data statistik wilayah "${wilayah}" berhasil disimpan.`,
        icon: 'insights'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/statistik/:id
 * Update data wilayah (admin).
 */
export const updateStatistik = async (req, res, next) => {
  const { id } = req.params;
  const { wilayah, total_porsi, pertumbuhan, status, jangkauan_sekolah, target_penerima, realisasi_porsi } = req.body;

  try {
    const result = await prisma.statistikWilayah.update({
      where: { id: parseInt(id) },
      data: {
        wilayah,
        total_porsi: parseInt(total_porsi) || 0,
        pertumbuhan: pertumbuhan || '+0%',
        status: status || 'PROSES',
        jangkauan_sekolah: parseInt(jangkauan_sekolah) || 0,
        ...(target_penerima !== undefined && { target_penerima: parseInt(target_penerima) || 0 }),
        ...(realisasi_porsi !== undefined && { realisasi_porsi: parseInt(realisasi_porsi) || 0 })
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'statistik',
        action: 'updated',
        detail: `Data statistik wilayah "${result.wilayah}" berhasil diperbarui.`,
        icon: 'edit'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/statistik/:id
 * Hapus data wilayah (admin).
 */
export const deleteStatistik = async (req, res, next) => {
  try {
    const existing = await prisma.statistikWilayah.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan.'
      });
    }

    await prisma.statistikWilayah.delete({
      where: { id: parseInt(req.params.id) }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'statistik',
        action: 'deleted',
        detail: `Data statistik wilayah "${existing.wilayah}" telah dihapus.`,
        icon: 'delete'
      }
    });

    res.json({ success: true, message: `Data ${existing.wilayah} berhasil dihapus.` });
  } catch (error) {
    next(error);
  }
};
