"use server";

import { AgencySchema } from "@/components/agency/agencySchema";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import {
  uploadFile,
  uploadFileDefault,
  uploadImage,
} from "../../cloudinary/cloudinary";
import { z } from "zod";

const uploadFiles = async (
  userId: string,
  businessLicenseUpload: File,
  insuranceCertificateUpload: File,
  images: File
) => {
  const businessBufferPromise = businessLicenseUpload.arrayBuffer(),
    insuranceBufferPromise = insuranceCertificateUpload.arrayBuffer(),
    imagesBufferPromise = images.arrayBuffer();

  const [businessArrayBuffer, insuranceArrayBuffer, imagesArrayBuffer] =
    await Promise.all([
      businessBufferPromise,
      insuranceBufferPromise,
      imagesBufferPromise,
    ]);
  const businessBuffer = Buffer.from(businessArrayBuffer),
    insuranceBuffer = Buffer.from(insuranceArrayBuffer),
    imagesBuffer = Buffer.from(imagesArrayBuffer);
  const businessPromise = uploadFile(
    businessBuffer,
    `agency-${userId}-businessLicense`
  );
  const insurancePromise = uploadFile(
    insuranceBuffer,
    `agency-${userId}-insurance`
  );
  const imagePromise = uploadFileDefault(imagesBuffer);
  const [businessUpload, insuranceUpload, imageUpload]: any[] =
    await Promise.all([businessPromise, insurancePromise, imagePromise]);

  console.log("Files uploaded");
  return {
    businessUrl: businessUpload.secure_url,
    insuranceUrl: insuranceUpload.secure_url,
    imageUrl: imageUpload.secure_url,
  };
};

export const createAgencyAction = async ({
  values,
  formData,
}: {
  values: any;
  formData: FormData;
}) => {
  const session = await getSessionorRedirect();
  const { success, data, error } = AgencySchema.partial({
    businessLicenseUpload: true,
    insuranceCertificateUpload: true,
    images: true,
  }).safeParse(values);
  console.log(error);
  if (!success) return { error: "Something went wrong!" };
  try {
    const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
      session.user.id,
      formData.get("businessLicenseUpload") as File,
      formData.get("insuranceCertificateUpload") as File,

      formData.get("images") as File
    );
    await db.agency.create({
      data: {
        ...data,
        businessLicenseUpload: businessUrl,
        insuranceCertificateUpload: insuranceUrl,
        images: [imageUrl],
        User: { connect: { id: session.user.id } },
        keyPersonnel: { create: data.keyPersonnel },
        pastProjects: { create: data.pastProjects },
        clientReferences: { create: data.clientReferences },
        socialMediaLinks: { create: data.socialMediaLinks },
        caseStudyPdf: undefined,
      },
    });
    return { success: "Agency created Succesfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Error creating agency" };
  }
};
