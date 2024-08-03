/*
  Warnings:

  - You are about to drop the column `city` on the `CompanyData` table. All the data in the column will be lost.
  - Made the column `city` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "city" SET NOT NULL;

-- AlterTable
ALTER TABLE "CompanyData" DROP COLUMN "city";
