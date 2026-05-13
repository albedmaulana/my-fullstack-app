import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Mulai seeding database...\n');

  // ═══════════════════════════════════════════
  // 1. SEED ADMIN
  // ═══════════════════════════════════════════
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      nama: 'Administrator',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  });
  console.log(`✅ Admin: ${admin.nama} (username: ${admin.username})`);

  // ═══════════════════════════════════════════
  // 2. SEED STATISTIK WILAYAH
  // ═══════════════════════════════════════════
  const wilayahData = [
    { wilayah: 'Jawa Barat', total_porsi: 1250000, jangkauan_sekolah: 420, pertumbuhan: '+12.5%', status: 'SELESAI', target_penerima: 1300000, realisasi_porsi: 1250000 },
    { wilayah: 'Jawa Tengah', total_porsi: 980000, jangkauan_sekolah: 380, pertumbuhan: '+8.3%', status: 'PROSES', target_penerima: 1100000, realisasi_porsi: 980000 },
    { wilayah: 'Jawa Timur', total_porsi: 1100000, jangkauan_sekolah: 450, pertumbuhan: '+15.2%', status: 'SELESAI', target_penerima: 1200000, realisasi_porsi: 1100000 },
    { wilayah: 'Sumatera Utara', total_porsi: 650000, jangkauan_sekolah: 210, pertumbuhan: '+5.7%', status: 'PROSES', target_penerima: 800000, realisasi_porsi: 650000 },
    { wilayah: 'Sulawesi Selatan', total_porsi: 420000, jangkauan_sekolah: 150, pertumbuhan: '+3.1%', status: 'DIJADWALKAN', target_penerima: 500000, realisasi_porsi: 0 },
  ];

  for (const data of wilayahData) {
    await prisma.statistikWilayah.upsert({
      where: { wilayah: data.wilayah },
      update: data,
      create: data
    });
  }
  console.log(`✅ Statistik Wilayah: ${wilayahData.length} data`);

  // ═══════════════════════════════════════════
  // 3. SEED MENUS
  // ═══════════════════════════════════════════
  const menuData = [
    {
      name: 'Chia Seed Power Bowl',
      day: 'Senin',
      date: new Date('2024-10-14'),
      description: 'Awali hari dengan asupan omega-3 dan serat tinggi untuk energi yang tahan lama.',
      energy: 320, protein: 12, karbo: 45, lemak: 8,
      category: 'Sarapan Pagi',
      status: 'Active',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJwiIXx4HYCgj8XeBhm4a3ehP5usNBo2-hTCUvAtrRv5NJgJpcq-UzmN4J13sYJqpO42gtgiV7EpC0dAgKPUP_6MWb2unOoPUdbHMhAWgHcvASJ7lj0q4dbuDuxdfjMbwclBrDOIkFMbg_J474YogGFFppcodHoJUk8ypl9oD68tZ79BOvCDLCguIhHS2EggxPsXNa9zCVO8dv4Jut2ILERBpx2D2Lon_is_ljLLwZscKVP7Fo2AYefcM5rT-xb_qxL1Rf77FQQCo'
    },
    {
      name: 'Salmon Panggang Asparagus',
      day: 'Selasa',
      date: new Date('2024-10-15'),
      description: 'Protein berkualitas tinggi yang dipadukan dengan sayuran hijau kaya mineral.',
      energy: 450, protein: 34, karbo: 15, lemak: 22,
      category: 'Makan Siang',
      status: 'Active',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByr4zOiH9SC2hdC9Z9IEp29C_To8VacS4x5N9IuzwOafjLVvu0dzIlXE6A-wN_X0tB96hw24KSmRqVrjHFbbDIo2Nmgrvle3jVle9ww1ufZtatrcSlbsXtPSDlTL_7BwJQGfq9iZqQbSrxlxCpAv8iIeNwPcpgR5VLxpW77Hs1y6rZPsXgy7gR-61N2tHBx8GCR6vp1voaw19pzOQchQsQEk7BdB93icxQzwjxQkwzqpASNl4KkcZWw-gu8fEXZaCBSvqK4K8sY6s'
    },
    {
      name: 'Salad Chickpea Mediterania',
      day: 'Rabu',
      date: new Date('2024-10-16'),
      description: 'Ringan namun mengenyangkan, sempurna untuk pencernaan di malam hari.',
      energy: 280, protein: 14, karbo: 38, lemak: 10,
      category: 'Makan Malam',
      status: 'Active',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzXwNJrWdq_MOeYmnSQY7hvsKLDgm80CpAWcv27O3CSKrDR3dwVUPBB_yHFAzrx3jgRymTe_8DlxSijQGbAyc-wSaLuAAeVrJ5vof_3fKxWKUWqbQETTmCA2n7p2ERpq4CyLp20E4fGY7fX0IHWMPFqOaDGE0-Muf2dUk5pVtu8o8CvEpeIy5af7HuG_5M4RTrxc6LW7drHjbeR6DFv_lcdW7nDNqLpvY_BF9nyDS1-iza6fLTa-qksMwicAmP_qkeM40UYT238IU'
    }
  ];

  for (const data of menuData) {
    const existing = await prisma.menu.findFirst({ where: { name: data.name } });
    if (!existing) {
      await prisma.menu.create({ data });
    }
  }
  console.log(`✅ Menu Nutrisi: ${menuData.length} data`);

  // ═══════════════════════════════════════════
  // 4. SEED BERITA
  // ═══════════════════════════════════════════
  const beritaData = [
    {
      judul: 'Implementasi Kebun Gizi Mandiri di Sekolah Dasar Pedesaan',
      slug: 'implementasi-kebun-gizi-mandiri-di-sekolah-dasar-pedesaan',
      ringkasan: 'Program baru ini bertujuan membekali anak-anak dengan pemahaman tentang sumber makanan sehat langsung dari tanah mereka sendiri.',
      konten: 'Program Kebun Gizi Mandiri resmi diluncurkan di 50 sekolah dasar pedesaan di seluruh Indonesia. Program ini mengajarkan siswa cara menanam, merawat, dan memanen sayuran dan buah-buahan bergizi tinggi. Dengan bimbingan ahli agrikultur lokal, anak-anak belajar tentang nutrisi dari sumber yang paling dekat: tanah mereka sendiri.\n\nProgram ini tidak hanya meningkatkan pengetahuan gizi anak-anak, tetapi juga membantu menyediakan bahan makanan segar untuk program makan siang sekolah. Hal ini diharapkan dapat mengurangi angka malnutrisi di daerah pedesaan secara signifikan.',
      gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKDS5oFjyBZHnCzGI5JzPIm19gKIMKeqmkM_K6c3MRakXqhEMy0jLslThwcz79sp8n73WJDqAUSQSuvTJXX9AVnxprJDIKcFEIRsFSqTffuqqayNoGr-TuVkZsBvYPmC7mYIdSNwJFKFOfEVx5XwAVOi8AYk2HsEjGERub0vvwZ3TP26h60J8S90AiBQFlvJPY7MCb7IitLle-DtVk9KKd2hScBlgKliIgo3YSObVHqa2L-62ehAzhbB3usmpjdxF7w1XH6m57j84',
      kategori: 'Inovasi',
      status: 'Published',
      publishedAt: new Date('2024-10-12'),
      authorId: admin.id
    },
    {
      judul: 'Menu Nutrisi Seimbang Berbasis Kearifan Lokal Nusantara',
      slug: 'menu-nutrisi-seimbang-berbasis-kearifan-lokal-nusantara',
      ringkasan: 'Menggali potensi pangan lokal seperti sagu, jagung, dan umbi-umbian sebagai pengganti sumber karbohidrat yang lebih bervariasi.',
      konten: 'Tim Nutritional Curator telah mengembangkan serangkaian menu nutrisi yang memanfaatkan bahan-bahan pangan lokal dari berbagai daerah di Indonesia. Menu ini dirancang untuk memenuhi kebutuhan gizi harian anak-anak sekolah dasar dengan memadukan bahan-bahan tradisional yang kaya nutrisi.\n\nSagu dari Maluku, jagung dari NTT, dan umbi-umbian dari Papua menjadi komponen utama dalam menu baru ini. Pendekatan ini tidak hanya mendukung diversifikasi pangan, tetapi juga memberdayakan petani lokal dan melestarikan kearifan pangan nusantara.',
      gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIif7VPlqsaJdMrBH4SJFfuWqCXkvBVCZ9r-cYeJSYwuy9RRrkrA49G7JfY2WosA8ljivb86oqpLcptSVj_OG03-SERTJH_dkfDBjwoeT1RGKX1wjIOV0WcwtYLo8zAnsOpJ61_8dXVlp-bZkd5EggrKLrnMITFtZcQc7n9UmyU_wlnXhstbrGJOjPS9INb9zECufWXWc1D1wP5kpNwj2nzp2xwdZSIoIiWlhsQZ-f-uOJEDqBH8FNKPrOyuOqgvkrAc4xOTJpK4s',
      kategori: 'Edukasi',
      status: 'Published',
      publishedAt: new Date('2024-10-08'),
      authorId: admin.id
    }
  ];

  for (const data of beritaData) {
    const existing = await prisma.berita.findUnique({ where: { slug: data.slug } });
    if (!existing) {
      await prisma.berita.create({ data });
    }
  }
  console.log(`✅ Berita: ${beritaData.length} artikel`);

  // ═══════════════════════════════════════════
  // 5. SEED GALERI DOKUMENTASI
  // ═══════════════════════════════════════════
  const galeriData = [
    { judul: 'Makan Bersama Komunitas', deskripsi: 'Momen kebersamaan masyarakat dalam acara makan sehat.', gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXmn1R3U0HJErKG24OJPuJUdclthfnhya8TS3KExVmCPRcmXDR-RZf-dsVDR6MhBX9GlA-T3bUWQ3TbPRnXCMRS_RKBenxuXboMJnnmgy93RjRhWzdJhJt5uuuFB22TXInrZjxjilq2L8zf2X1pJDd3VMyEEVsdBG1-3RmI4OEWDJz8GpJO7rg1xV2b8-j2rm9uLumuFhJvw6VHTVtPHfik7XlTsOpSBq1TKeDUUfj5q_juySvmRh1Alg-zgM8F3lSv6RZ8P4fSdo', lokasi: 'Jawa Barat, 2024', tahun: 2024 },
    { judul: 'Workshop Gizi Ibu & Anak', deskripsi: 'Pelatihan gizi untuk ibu dan anak di komunitas.', gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGhHratIiTeod33AeVoFpcFLXUFJc_bbM4Bq4c5JczZmLfXNyeomTerNvANu4KS6P6H9hVtHmjCxTgtAXCnPFPKKgPg8fl_78u4c1Y1gNPBep5WQDi7AfgzA3yi3_hhgh1SeeRy-HMEKgCVvhWX2gjLQfPHdV7qA7kHBfOOsKIsxfSSxdX6K_37ylWpwLvK_H1OyIRYzK-2NG1IdoDj7X2anHR0GNDD-dG6uZZtnglPt23PKKPHrxSc4z4E6wWzGkHeVOvYSIbUNk', lokasi: 'Sulawesi Utara, 2024', tahun: 2024 },
    { judul: 'Hari Buah di Sekolah', deskripsi: 'Siswa menikmati beragam buah segar di acara sekolah.', gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOdBaHud6zxMj6PELhu2KAHzzV_WqXFF9BD553SaAfdBn96pAyvEIt7pVPNkTYJxkrTz3usYHlkQB5t6agiCdHe_5VVMFIwLYvPe3cJ4oCeAgiOFyRuj7oleSt2G4Vt4qItEaVe6XY5FSzY-3Z-3abTkdVN2snqygW2wuh5kLAn9OMzW8wd_nOB2xwwSkN26o6monHuine2azcKemanEo6YPVrSauTn8VuWo1rLwLABv_IsFOWiQoja4fKEvVravMDBI7tG5uE6tU', lokasi: 'Sumatera Barat, 2024', tahun: 2024 },
    { judul: 'Distribusi Bahan Pangan', deskripsi: 'Proses distribusi bahan pangan berkualitas tinggi.', gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNLdecxkPJ_97wlZqYBp6F1wSo9mSHItNW6AVWDtPbnVYyErhsl4gUf_rJHW7fHPWSV0FS1Yd9s9nB5oi7XDHKgTByqwR5b6uEgzDNGFXH35eCODtPj4TJHOCdR4mHmYuyeupbV_BhnYZzfSgzM-HFWvisWJmY8ODhYHwmULkt_eTHrCLyg_81TlX7kVZyAQwrS-NxukkpvabRGwEJE9SJDzmb3M60g5kB47oBAZl_y8XHvr3x6Cy_8bkieBuPG1OZ-zaTgxUgYA0', lokasi: 'Kalimantan Timur, 2024', tahun: 2024 },
    { judul: 'Pendampingan Pertanian Sehat', deskripsi: 'Ahli pertanian mendampingi petani lokal.', gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmYeI3NYGzPYLpMIkxIhzOMQHhPS8oQgCqEAS_jNuJBikbKcSdPCaWy2sxaxqYbxh6Pp7hGCyCcPFZHF1Px0xjcoRCiBjnin8wObVV09j1kmHLOezF0ylUF2jpyP05J8rn9cXk6yhDJ1ITZnMwcJJw5dq0nOM0aVggcIRKPlwwEychTv2G_8DJVVsVHyPSqE6LC-S9ZV9I2iJGXXZkfbtmLadL87b8u0rthTwjiN8uPE6RD7Ga0omaxa3uDsH5N3qikjaSZ1QaBNA', lokasi: 'Bali, 2024', tahun: 2024 },
    { judul: 'Pasar Gizi Rakyat', deskripsi: 'Pasar bergizi untuk masyarakat umum.', gambar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWGsDv1wOA0zcoQ8cpExBvJDkvoLP0UxlBQPxgo2EgVj5rFakR66OWXWv3VlDTroUDsUBidzUlhWCVbtFsLSpGQFbQGI1Xaf-cqCrQR_fNFPcWVtizKguqpI1qpI62omPWMmPAhJglllVXs5zdQQhourR37X7NUUmrl4v4FDPYd_felzI7UYPeAuqkFAVmo2pj7Z6V8BcOKtDfhtP_tehwfvzAFLxJNNsXBDEu7xOKINcEwUCL5ENZHK30qb7UByGJs1YtXVRdO1c', lokasi: 'NTT, 2024', tahun: 2024 }
  ];

  for (const data of galeriData) {
    const existing = await prisma.galeriDokumentasi.findFirst({ where: { judul: data.judul } });
    if (!existing) {
      await prisma.galeriDokumentasi.create({ data });
    }
  }
  console.log(`✅ Galeri Dokumentasi: ${galeriData.length} foto`);

  // ═══════════════════════════════════════════
  // 6. SEED ASPIRASI (sample inbox)
  // ═══════════════════════════════════════════
  const aspirasiData = [
    { nama: 'Budi Santoso', email: 'budi.santoso@email.com', kategori: 'saran', pesan: 'Saya ingin menyarankan penambahan kategori diet keto pada fitur kurasi menu mingguan agar lebih spesifik.', status: 'BARU' },
    { nama: 'Siti Aminah', email: 'siti.aminah@email.com', kategori: 'laporan', pesan: 'Gambar pada artikel "Nutrisi Ibu Hamil" tidak muncul saat dibuka di perangkat mobile.', status: 'MENDESAK' },
    { nama: 'Ahmad Fauzi', email: null, kategori: 'terima-kasih', pesan: 'Terima kasih atas program makanan bergizi di sekolah anak saya. Perubahan pola makan sangat terasa positif.', status: 'DIBACA' },
  ];

  for (const data of aspirasiData) {
    const existing = await prisma.aspirasi.findFirst({ where: { nama: data.nama, pesan: data.pesan } });
    if (!existing) {
      await prisma.aspirasi.create({ data });
    }
  }
  console.log(`✅ Aspirasi: ${aspirasiData.length} pesan`);

  console.log('\n🎉 Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
