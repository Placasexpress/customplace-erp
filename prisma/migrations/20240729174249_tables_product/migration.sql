-- AlterTable
ALTER TABLE `MarketplaceProfile` MODIFY `addressId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesMargin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qtdFrom` INTEGER NOT NULL,
    `qtyTo` INTEGER NOT NULL,
    `marginPercent` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailDescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `price_cost` DOUBLE NOT NULL,
    `productDetailId` INTEGER NULL,

    UNIQUE INDEX `DetailDescription_productDetailId_key`(`productDetailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductDetailDescription` (
    `productId` INTEGER NOT NULL,
    `detailDescriptionId` INTEGER NOT NULL,

    PRIMARY KEY (`productId`, `detailDescriptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NOT NULL,
    `detailDescriptionId` INTEGER NOT NULL,

    UNIQUE INDEX `ProductDetail_detailDescriptionId_key`(`detailDescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SalesMargin` ADD CONSTRAINT `SalesMargin_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDetailDescription` ADD CONSTRAINT `ProductDetailDescription_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDetailDescription` ADD CONSTRAINT `ProductDetailDescription_detailDescriptionId_fkey` FOREIGN KEY (`detailDescriptionId`) REFERENCES `DetailDescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDetail` ADD CONSTRAINT `ProductDetail_detailDescriptionId_fkey` FOREIGN KEY (`detailDescriptionId`) REFERENCES `DetailDescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
