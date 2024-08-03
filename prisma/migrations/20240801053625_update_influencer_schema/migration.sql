/*
  Warnings:

  - Added the required column `country` to the `InfluencerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `InfluencerData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reviews_ip_key";

-- AlterTable
ALTER TABLE "InfluencerData" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "state_priority" INTEGER NOT NULL DEFAULT 0;
