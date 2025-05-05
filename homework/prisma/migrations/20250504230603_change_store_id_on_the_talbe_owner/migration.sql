/*
  Warnings:

  - You are about to drop the column `storeId` on the `owner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[store_id]` on the table `owner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_id` to the `owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `owner` DROP FOREIGN KEY `fk_owner_storeId`;

-- DropIndex
DROP INDEX `owner_storeId_key` ON `owner`;

-- AlterTable
ALTER TABLE `owner` DROP COLUMN `storeId`,
    ADD COLUMN `store_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `owner_store_id_key` ON `owner`(`store_id`);

-- AddForeignKey
ALTER TABLE `owner` ADD CONSTRAINT `fk_owner_storeId` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
