/*
  Warnings:

  - Added the required column `description` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line_business` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `line_business` VARCHAR(191) NOT NULL;
