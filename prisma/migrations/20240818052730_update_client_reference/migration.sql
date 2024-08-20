/*
  Warnings:

  - The primary key for the `ClientReference` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ClientReference" DROP CONSTRAINT "ClientReference_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClientReference_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClientReference_id_seq";
