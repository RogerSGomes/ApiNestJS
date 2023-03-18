/*
  Warnings:

  - You are about to drop the column `companyId` on the `user` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_companyId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `companyId`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
