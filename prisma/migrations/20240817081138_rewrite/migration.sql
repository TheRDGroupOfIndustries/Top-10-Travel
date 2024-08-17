-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'Influencer');

-- CreateEnum
CREATE TYPE "CompanyRole" AS ENUM ('DMC', 'AGENCY', 'HOTEL');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "HelpDeskStatus" AS ENUM ('PENDING', 'RESOLVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyPersonnel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "specialization" TEXT NOT NULL,
    "agencyId" TEXT,
    "dmcId" TEXT,

    CONSTRAINT "KeyPersonnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastProject" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "agencyId" TEXT,
    "dmcId" TEXT,

    CONSTRAINT "PastProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientReference" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "testimonial" TEXT NOT NULL,
    "agencyId" TEXT,
    "dmcId" TEXT,

    CONSTRAINT "ClientReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "city_priority" INTEGER NOT NULL DEFAULT 0,
    "isCertified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhoneNumber" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "companyRegistrationNumber" TEXT NOT NULL,
    "yearOfEstablishment" INTEGER NOT NULL,
    "businessLicenseUpload" TEXT NOT NULL,
    "insuranceCertificateUpload" TEXT NOT NULL,
    "primaryServices" TEXT[],
    "specializedTravelTypes" TEXT[],
    "regionsOfOperation" TEXT[],
    "internationalCertifications" TEXT[],
    "memberships" TEXT[],
    "numberOfEmployees" INTEGER NOT NULL,
    "caseStudyPdf" TEXT,
    "promotionalVideoUpload" TEXT NOT NULL,
    "images" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "methodology" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DMC" (
    "id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "city_priority" INTEGER NOT NULL DEFAULT 0,
    "isCertified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhoneNumber" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "companyRegistrationNumber" TEXT NOT NULL,
    "yearOfEstablishment" INTEGER NOT NULL,
    "businessLicenseUpload" TEXT NOT NULL,
    "insuranceCertificateUpload" TEXT NOT NULL,
    "coreServices" TEXT[],
    "specialization" TEXT[],
    "regionsCovered" TEXT[],
    "internationalCertifications" TEXT[],
    "memberships" TEXT[],
    "numberOfEmployees" INTEGER NOT NULL,
    "caseStudyPdf" TEXT,
    "promotionalVideoUpload" TEXT NOT NULL,
    "images" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "methodology" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DMC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "city_priority" INTEGER NOT NULL DEFAULT 0,
    "isCertified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhoneNumber" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "companyRegistrationNumber" TEXT NOT NULL,
    "yearOfEstablishment" INTEGER NOT NULL,
    "businessLicenseUpload" TEXT NOT NULL,
    "insuranceCertificateUpload" TEXT NOT NULL,
    "specialization" TEXT[],
    "services" TEXT[],
    "promotionalVideoUpload" TEXT NOT NULL,
    "images" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "methodology" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaLinks" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "agencyId" TEXT,
    "dmcId" TEXT,
    "hotelId" TEXT,

    CONSTRAINT "SocialMediaLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfluencerData" (
    "id" TEXT NOT NULL,
    "isCertified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "introduction" TEXT,
    "speciality" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "state_priority" INTEGER NOT NULL DEFAULT 0,
    "socialLinks" TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfluencerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpDesk" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "HelpDeskStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelpDesk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "review" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyId" TEXT,
    "dmcId" TEXT,
    "hotelId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "agencyId" TEXT,
    "dmcId" TEXT,
    "hotelId" TEXT,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_contactEmail_key" ON "Agency"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "DMC_contactEmail_key" ON "DMC"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_contactEmail_key" ON "Hotel"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerData_userId_key" ON "InfluencerData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_agencyId_key" ON "Reviews"("userId", "agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_dmcId_key" ON "Reviews"("userId", "dmcId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_hotelId_key" ON "Reviews"("userId", "hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_userId_agencyId_key" ON "Enquiry"("userId", "agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_userId_dmcId_key" ON "Enquiry"("userId", "dmcId");

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_userId_hotelId_key" ON "Enquiry"("userId", "hotelId");

-- AddForeignKey
ALTER TABLE "KeyPersonnel" ADD CONSTRAINT "KeyPersonnel_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyPersonnel" ADD CONSTRAINT "KeyPersonnel_dmcId_fkey" FOREIGN KEY ("dmcId") REFERENCES "DMC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastProject" ADD CONSTRAINT "PastProject_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastProject" ADD CONSTRAINT "PastProject_dmcId_fkey" FOREIGN KEY ("dmcId") REFERENCES "DMC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientReference" ADD CONSTRAINT "ClientReference_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientReference" ADD CONSTRAINT "ClientReference_dmcId_fkey" FOREIGN KEY ("dmcId") REFERENCES "DMC"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaLinks" ADD CONSTRAINT "SocialMediaLinks_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaLinks" ADD CONSTRAINT "SocialMediaLinks_dmcId_fkey" FOREIGN KEY ("dmcId") REFERENCES "DMC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaLinks" ADD CONSTRAINT "SocialMediaLinks_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfluencerData" ADD CONSTRAINT "InfluencerData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpDesk" ADD CONSTRAINT "HelpDesk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_dmcId_fkey" FOREIGN KEY ("dmcId") REFERENCES "DMC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_dmcId_fkey" FOREIGN KEY ("dmcId") REFERENCES "DMC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
