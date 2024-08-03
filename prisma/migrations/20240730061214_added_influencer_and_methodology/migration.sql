/*
  Warnings:

  - A unique constraint covering the columns `[legalName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "methodology" TEXT;

-- CreateTable
CREATE TABLE "InfluencerData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "socialLinks" TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfluencerData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerData_userId_key" ON "InfluencerData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_legalName_key" ON "Company"("legalName");

-- AddForeignKey
ALTER TABLE "InfluencerData" ADD CONSTRAINT "InfluencerData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
