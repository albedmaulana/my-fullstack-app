import prisma from '../lib/prisma.js';

/**
 * POST /api/newsletter/subscribe
 * Subscribe email ke newsletter (publik).
 */
export const subscribe = async (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Alamat email tidak valid.'
    });
  }

  try {
    // Cek apakah sudah terdaftar
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (existing.isActive) {
        return res.json({
          success: true,
          message: 'Email Anda sudah terdaftar di newsletter kami.'
        });
      }

      // Re-activate if previously unsubscribed
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true }
      });

      return res.json({
        success: true,
        message: 'Berlangganan berhasil diaktifkan kembali!'
      });
    }

    await prisma.newsletterSubscriber.create({
      data: { email }
    });

    res.json({
      success: true,
      message: 'Terima kasih! Anda berhasil berlangganan newsletter kami.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/newsletter/unsubscribe
 * Unsubscribe dari newsletter (publik).
 */
export const unsubscribe = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Email tidak ditemukan dalam daftar newsletter.'
      });
    }

    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Anda berhasil berhenti berlangganan.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/newsletter/subscribers
 * List semua subscriber (admin).
 */
export const getSubscribers = async (req, res, next) => {
  try {
    const data = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data,
      total: data.length
    });
  } catch (error) {
    next(error);
  }
};
