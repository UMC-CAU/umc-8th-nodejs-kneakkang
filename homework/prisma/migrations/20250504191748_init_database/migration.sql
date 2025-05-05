-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `birth` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `detailAddress` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favor_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `food_category_id` INTEGER NOT NULL,

    INDEX `f_category_id`(`food_category_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `store_type` VARCHAR(15) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `star` DOUBLE NOT NULL,
    `create_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
