-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(150) NOT NULL,
    `foto` VARCHAR(500) NULL DEFAULT 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admins_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `day` VARCHAR(50) NOT NULL,
    `date` DATE NOT NULL,
    `description` TEXT NULL,
    `energy` INTEGER NULL DEFAULT 0,
    `protein` INTEGER NULL DEFAULT 0,
    `karbo` INTEGER NULL DEFAULT 0,
    `lemak` INTEGER NULL DEFAULT 0,
    `category` VARCHAR(100) NULL DEFAULT 'Makan Siang',
    `status` VARCHAR(50) NULL DEFAULT 'Draft',
    `img` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistik_wilayah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wilayah` VARCHAR(150) NOT NULL,
    `total_porsi` INTEGER NOT NULL DEFAULT 0,
    `jangkauan_sekolah` INTEGER NOT NULL DEFAULT 0,
    `target_penerima` INTEGER NOT NULL DEFAULT 0,
    `realisasi_porsi` INTEGER NOT NULL DEFAULT 0,
    `pertumbuhan` VARCHAR(20) NOT NULL DEFAULT '+0%',
    `status` VARCHAR(50) NOT NULL DEFAULT 'PROSES',
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `statistik_wilayah_wilayah_key`(`wilayah`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(300) NOT NULL,
    `slug` VARCHAR(350) NOT NULL,
    `ringkasan` TEXT NOT NULL,
    `konten` LONGTEXT NOT NULL,
    `gambar` VARCHAR(500) NULL,
    `kategori` VARCHAR(100) NOT NULL DEFAULT 'Edukasi',
    `status` VARCHAR(50) NOT NULL DEFAULT 'Draft',
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `authorId` INTEGER NOT NULL,

    UNIQUE INDEX `berita_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galeri_dokumentasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(255) NOT NULL,
    `deskripsi` TEXT NULL,
    `gambar` VARCHAR(500) NOT NULL,
    `lokasi` VARCHAR(200) NULL,
    `tahun` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aspirasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NULL,
    `kategori` VARCHAR(50) NOT NULL DEFAULT 'saran',
    `pesan` TEXT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'BARU',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter_subscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(200) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `newsletter_subscribers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity` VARCHAR(100) NOT NULL,
    `action` VARCHAR(100) NOT NULL,
    `detail` TEXT NOT NULL,
    `icon` VARCHAR(50) NULL DEFAULT 'history',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
