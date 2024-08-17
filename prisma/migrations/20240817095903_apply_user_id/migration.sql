/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Agency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `DMC` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DMC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DMC" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agency_userId_key" ON "Agency"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DMC_userId_key" ON "DMC"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_userId_key" ON "Hotel"("userId");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DMC" ADD CONSTRAINT "DMC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
