-- DropForeignKey
ALTER TABLE `documenthistory` DROP FOREIGN KEY `DocumentHistory_actionByUserId_fkey`;

-- AlterTable
ALTER TABLE `documenthistory` MODIFY `actionByUserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `DocumentHistory` ADD CONSTRAINT `DocumentHistory_actionByUserId_fkey` FOREIGN KEY (`actionByUserId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
