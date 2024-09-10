/*
  Warnings:

  - A unique constraint covering the columns `[marketplace_profile_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `marketplace_profile_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `marketplaceProfileId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Company_marketplaceProfileId_key`(`marketplaceProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MarketplaceProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addressId` INTEGER NOT NULL,

    UNIQUE INDEX `MarketplaceProfile_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Address_marketplace_profile_id_key` ON `Address`(`marketplace_profile_id`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_marketplace_profile_id_fkey` FOREIGN KEY (`marketplace_profile_id`) REFERENCES `MarketplaceProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_marketplaceProfileId_fkey` FOREIGN KEY (`marketplaceProfileId`) REFERENCES `MarketplaceProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
