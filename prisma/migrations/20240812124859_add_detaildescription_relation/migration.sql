-- CreateTable
CREATE TABLE `OrderProductDescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `detailDescriptionId` INTEGER NOT NULL,

    UNIQUE INDEX `OrderProductDescription_orderId_detailDescriptionId_key`(`orderId`, `detailDescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderProductDescription` ADD CONSTRAINT `OrderProductDescription_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProductDescription` ADD CONSTRAINT `OrderProductDescription_detailDescriptionId_fkey` FOREIGN KEY (`detailDescriptionId`) REFERENCES `DetailDescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
