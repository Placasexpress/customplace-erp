/*
  Warnings:

  - Added the required column `payment_option` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `payment_option` ENUM('ALL', 'CREDIT_CARD', 'BANK_SLIP', 'PIX') NOT NULL;
