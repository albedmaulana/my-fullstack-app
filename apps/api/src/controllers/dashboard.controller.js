import prisma from '../lib/prisma.js';

/**
 * GET /api/stats-dashboard
 * Ringkasan dashboard: total sekolah, pesan, porsi, aktivitas terkini.
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    // Fetch semua data secara paralel
    const [statistikWilayah, recentMenus, aspirasiStats, recentActivities] = await Promise.all([
      prisma.statistikWilayah.findMany(),
      prisma.menu.findMany({ take: 3, orderBy: { id: 'desc' } }),
      prisma.aspirasi.groupBy({
        by: ['status'],
        _count: { id: true }
      }).catch(() => []),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    // Hitung total porsi distribusi
    const totalPorsiDistribusi = statistikWilayah.reduce(
      (acc, curr) => acc + (curr.total_porsi || 0), 0
    );

    // Hitung total sekolah terjangkau
    const totalSekolahTerjangkau = statistikWilayah.reduce(
      (acc, curr) => acc + (curr.jangkauan_sekolah || 0), 0
    );

    // Hitung pesan
    const totalPesan = aspirasiStats.reduce((acc, curr) => acc + curr._count.id, 0);
    const pesanMendesak = aspirasiStats.find(s => s.status === 'MENDESAK')?._count?.id || 0;
    const pesanBaru = aspirasiStats.find(s => s.status === 'BARU')?._count?.id || 0;

    // Bangun aktivitas terkini dari activity_log
    let aktivitas = recentActivities.map(act => ({
      text: act.detail,
      time: getRelativeTime(act.createdAt),
      icon: act.icon || 'history'
    }));

    // Fallback jika belum ada log
    if (aktivitas.length === 0) {
      // Gabungkan dari data yang tersedia
      recentMenus.forEach(menu => {
        aktivitas.push({
          text: `Menu "${menu.name}" tersedia untuk hari ${menu.day}.`,
          time: 'AKTIF',
          icon: 'menu_book'
        });
      });

      statistikWilayah.slice(0, 3).forEach(w => {
        aktivitas.push({
          text: `Data statistik wilayah ${w.wilayah} telah diperbarui.`,
          time: 'BARU SAJA',
          icon: 'insights'
        });
      });

      if (aktivitas.length === 0) {
        aktivitas.push({
          text: 'Sistem dashboard siap digunakan.',
          time: '1 JAM LALU',
          icon: 'history'
        });
      }
    }

    res.json({
      success: true,
      data: {
        pengunjung: totalSekolahTerjangkau,
        pesanBaru: pesanBaru + totalPesan,
        pesanMendesak,
        totalPorsi: totalPorsiDistribusi,
        totalWilayah: statistikWilayah.length,
        aktivitas: aktivitas.slice(0, 8)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper: waktu relatif sederhana
 */
function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'BARU SAJA';
  if (diffMin < 60) return `${diffMin} MENIT LALU`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} JAM LALU`;

  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} HARI LALU`;
}
