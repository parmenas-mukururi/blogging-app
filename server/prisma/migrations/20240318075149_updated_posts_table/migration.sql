/*
  Warnings:

  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - Added the required column `category` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `description`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;
