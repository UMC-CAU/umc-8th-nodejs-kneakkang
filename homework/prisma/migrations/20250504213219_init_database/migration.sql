/*
  Warnings:

  - You are about to drop the column `store_id` on the `owner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId]` on the table `owner` will be added. If there are existing duplicate values, this will fail.
  - Made the column `storeId` on table `owner` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `owner` DROP FOREIGN KEY `owner_store_id_fkey`;

-- DropIndex
DROP INDEX `owner_store_id_fkey` ON `owner`;

-- AlterTable
ALTER TABLE `owner` DROP COLUMN `store_id`,
    MODIFY `storeId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `owner_storeId_key` ON `owner`(`storeId`);

-- AddForeignKey
ALTER TABLE `owner` ADD CONSTRAINT `fk_owner_storeId` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
