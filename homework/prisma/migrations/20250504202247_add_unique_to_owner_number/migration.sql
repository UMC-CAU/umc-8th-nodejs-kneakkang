/*
  Warnings:

  - You are about to drop the column `detailAddress` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `user` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` MODIFY `name` VARCHAR(100) NULL,
    MODIFY `address` VARCHAR(255) NULL,
    MODIFY `store_type` VARCHAR(15) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `detailAddress`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `detail_address` VARCHAR(255) NULL,
    ADD COLUMN `phone_number` VARCHAR(20) NOT NULL;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NULL,
    `content` TEXT NULL,
    `image` TEXT NULL,
    `star` DOUBLE NOT NULL,
    `create_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `deadline` VARCHAR(5) NULL,
    `mission_detail` TEXT NULL,
    `create_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,
    `create_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(6) NOT NULL,

    UNIQUE INDEX `owner_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mission_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,
    `owner_number` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `create_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner` ADD CONSTRAINT `owner_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_owner_number_fkey` FOREIGN KEY (`owner_number`) REFERENCES `owner`(`number`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `owner` ADD COLUMN `storeId` INT NULL;
