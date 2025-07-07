-- CreateTable
CREATE TABLE `TeamStanding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `crest` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
