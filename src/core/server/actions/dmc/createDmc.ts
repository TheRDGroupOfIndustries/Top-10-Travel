"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import {
  uploadFile,
  uploadFileDefault,
  uploadImage,
} from "../../cloudinary/cloudinary";
import { z } from "zod";
import { DmcSchema } from "@/components/dmc/dmcSchema";

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
    `dmc-${userId}-businessLicense`
  );
  const insurancePromise = uploadFile(
    insuranceBuffer,
    `dmc-${userId}-insurance`
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

export const createDmcAction = async ({
  values,
  formData,
}: {
  values: any;
  formData: FormData;
}) => {
  const session = await getSessionorRedirect();
  const { success, data, error } = DmcSchema.partial({
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
    await db.dMC.create({
      data: {
        ...data,
        businessLicenseUpload: businessUrl,
        insuranceCertificateUpload: insuranceUrl,
        images: [imageUrl],
        User: { connect: { id: session.user.id } },
        // @ts-ignore
        keyPersonnel: data.keyPersonnel
          ? { create: data.keyPersonnel }
          : undefined,
        // @ts-ignore
        pastProjects: data.pastProjects
          ? { create: data.pastProjects }
          : undefined,
        // @ts-ignore
        clientReferences: data.clientReferences
          ? { create: data.clientReferences }
          : undefined,
        socialMediaLinks: { create: data.socialMediaLinks },
        caseStudyPdf: undefined,
      },
    });
    return { success: "DMC created Succesfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Error creating DMC" };
  }
};
