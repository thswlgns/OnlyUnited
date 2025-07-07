/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `TeamStanding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TeamStanding_teamId_key` ON `TeamStanding`(`teamId`);
