-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '9999900000',
ALTER COLUMN "title" DROP NOT NULL;
