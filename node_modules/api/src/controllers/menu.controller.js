import prisma from '../lib/prisma.js';

// Helper: parse date dengan format fleksibel
const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  if (typeof dateStr === 'string' && dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
  return new Date(dateStr);
};

const cleanStatus = (status) => (!status ? 'Draft' : status.includes('Active') ? 'Active' : 'Draft');

/**
 * GET /api/menus
 * List semua menu (publik).
 */
export const getAllMenus = async (req, res, next) => {
  try {
    const { day, status, category } = req.query;

    const where = {};
    if (day) where.day = day;
    if (status) where.status = status;
    if (category) where.category = category;

    const menus = await prisma.menu.findMany({
      where,
      orderBy: { date: 'asc' }
    });

    res.json(menus);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/menus/:id
 * Detail satu menu.
 */
export const getMenuById = async (req, res, next) => {
  try {
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu tidak ditemukan.'
      });
    }

    res.json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/menus
 * Tambah menu baru (admin).
 */
export const createMenu = async (req, res, next) => {
  const { name, day, date, description, status, energy, protein, karbo, lemak, category, img } = req.body;

  if (!name || !day) {
    return res.status(400).json({
      success: false,
      message: 'Nama menu dan hari penyajian wajib diisi.'
    });
  }

  try {
    const result = await prisma.menu.create({
      data: {
        name,
        day,
        date: parseDate(date),
        description: description || '',
        status: cleanStatus(status),
        energy: parseInt(energy) || 0,
        protein: parseInt(protein) || 0,
        karbo: parseInt(karbo) || 0,
        lemak: parseInt(lemak) || 0,
        category: category || 'Makan Siang',
        img: img || 'https://via.placeholder.com/300'
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'menu',
        action: 'created',
        detail: `Menu "${name}" berhasil ditambahkan untuk hari ${day}.`,
        icon: 'menu_book'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/menus/:id
 * Update menu (admin).
 */
export const updateMenu = async (req, res, next) => {
  const { id } = req.params;
  const { name, day, date, description, status, energy, protein, karbo, lemak, category, img } = req.body;

  try {
    const result = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(day && { day }),
        ...(date && { date: parseDate(date) }),
        ...(description !== undefined && { description }),
        ...(status && { status: cleanStatus(status) }),
        ...(energy !== undefined && { energy: parseInt(energy) || 0 }),
        ...(protein !== undefined && { protein: parseInt(protein) || 0 }),
        ...(karbo !== undefined && { karbo: parseInt(karbo) || 0 }),
        ...(lemak !== undefined && { lemak: parseInt(lemak) || 0 }),
        ...(category && { category }),
        ...(img && { img })
      }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'menu',
        action: 'updated',
        detail: `Menu "${result.name}" berhasil diperbarui.`,
        icon: 'edit_note'
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/menus/:id
 * Hapus menu (admin).
 */
export const deleteMenu = async (req, res, next) => {
  try {
    const existing = await prisma.menu.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Menu tidak ditemukan.' });
    }

    await prisma.menu.delete({
      where: { id: parseInt(req.params.id) }
    });

    await prisma.activityLog.create({
      data: {
        entity: 'menu',
        action: 'deleted',
        detail: `Menu "${existing.name}" telah dihapus dari sistem.`,
        icon: 'delete'
      }
    });

    res.json({ success: true, message: `Menu "${existing.name}" berhasil dihapus.` });
  } catch (error) {
    next(error);
  }
};
