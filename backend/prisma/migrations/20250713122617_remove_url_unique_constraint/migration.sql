-- DropIndex
DROP INDEX `News_url_key` ON `News`;

-- AlterTable
ALTER TABLE `News` MODIFY `url` TEXT NOT NULL;
