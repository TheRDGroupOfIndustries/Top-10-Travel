/*
  Warnings:

  - You are about to drop the column `userId` on the `Reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `HelpDesk` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HelpDeskStatus" AS ENUM ('PENDING', 'RESOLVED');

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_userId_fkey";

-- DropIndex
DROP INDEX "Reviews_userId_companyId_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "isCertified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSuspended" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HelpDesk" DROP COLUMN "status",
ADD COLUMN     "status" "HelpDeskStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "amenities" TEXT[];

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_email_key" ON "Enquiry"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
