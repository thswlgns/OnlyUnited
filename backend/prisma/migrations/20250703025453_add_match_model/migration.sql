-- CreateTable
CREATE TABLE `Match` (
    `id` BIGINT NOT NULL,
    `matchday` INTEGER NULL,
    `utcDate` DATETIME(3) NOT NULL,
    `homeTeam` VARCHAR(191) NOT NULL,
    `awayTeam` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `competition` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
