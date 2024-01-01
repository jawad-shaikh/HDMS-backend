/*
  Warnings:

  - You are about to drop the column `Action` on the `documenthistory` table. All the data in the column will be lost.
  - You are about to drop the column `ActionByUserId` on the `documenthistory` table. All the data in the column will be lost.
  - You are about to drop the column `UploadedDocumentId` on the `documenthistory` table. All the data in the column will be lost.
  - Added the required column `action` to the `DocumentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionByUserId` to the `DocumentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedDocumentId` to the `DocumentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `documenthistory` DROP FOREIGN KEY `DocumentHistory_ActionByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `documenthistory` DROP FOREIGN KEY `DocumentHistory_UploadedDocumentId_fkey`;

-- AlterTable
ALTER TABLE `documenthistory` DROP COLUMN `Action`,
    DROP COLUMN `ActionByUserId`,
    DROP COLUMN `UploadedDocumentId`,
    ADD COLUMN `action` VARCHAR(191) NOT NULL,
    ADD COLUMN `actionByUserId` INTEGER NOT NULL,
    ADD COLUMN `uploadedDocumentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DocumentHistory` ADD CONSTRAINT `DocumentHistory_uploadedDocumentId_fkey` FOREIGN KEY (`uploadedDocumentId`) REFERENCES `UploadedDocuments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentHistory` ADD CONSTRAINT `DocumentHistory_actionByUserId_fkey` FOREIGN KEY (`actionByUserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
