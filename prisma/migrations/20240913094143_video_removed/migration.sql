/*
  Warnings:

  - You are about to drop the column `promotionalVideoUpload` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `promotionalVideoUpload` on the `DMC` table. All the data in the column will be lost.
  - You are about to drop the column `promotionalVideoUpload` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "promotionalVideoUpload";

-- AlterTable
ALTER TABLE "DMC" DROP COLUMN "promotionalVideoUpload";

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "promotionalVideoUpload";
