/*
  Warnings:

  - You are about to drop the column `abta_number` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `agencyGroup` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `business_reg_number` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `clia_number` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyContact` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `iata_number` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ownerContact` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `tids_number` on the `Company` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Company_business_reg_number_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "abta_number",
DROP COLUMN "address",
DROP COLUMN "agencyGroup",
DROP COLUMN "business_reg_number",
DROP COLUMN "city",
DROP COLUMN "clia_number",
DROP COLUMN "companyContact",
DROP COLUMN "companyEmail",
DROP COLUMN "description",
DROP COLUMN "iata_number",
DROP COLUMN "ownerContact",
DROP COLUMN "ownerName",
DROP COLUMN "phone",
DROP COLUMN "pincode",
DROP COLUMN "tids_number";

-- CreateTable
CREATE TABLE "CompanyData" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "business_reg_number" TEXT NOT NULL,
    "ownerContact" TEXT,
    "companyEmail" TEXT,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "companyContact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "images" TEXT[],
    "socialLinks" TEXT[],
    "agencyGroup" TEXT,
    "iata_number" TEXT,
    "abta_number" TEXT,
    "clia_number" TEXT,
    "tids_number" TEXT,
    "description" TEXT,

    CONSTRAINT "CompanyData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyData_companyId_key" ON "CompanyData"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyData_business_reg_number_key" ON "CompanyData"("business_reg_number");

-- AddForeignKey
ALTER TABLE "CompanyData" ADD CONSTRAINT "CompanyData_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
