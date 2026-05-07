/*
  Warnings:

  - A unique constraint covering the columns `[scientificName,userId]` on the table `Species` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Species_scientificName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Species_scientificName_userId_key" ON "Species"("scientificName", "userId");
