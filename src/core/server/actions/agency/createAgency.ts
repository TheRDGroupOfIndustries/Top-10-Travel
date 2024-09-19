// "use server";

// import { AgencySchema } from "@/components/agency/agencySchema";
// import { db } from "@/core/client/db";
// import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
// import {
//   uploadFile,
//   uploadFileDefault,
//   uploadImage,
// } from "../../cloudinary/cloudinary";
// import { z } from "zod";

// const uploadFiles = async (
//   userId: string,
//   businessLicenseUpload: File,
//   insuranceCertificateUpload: File,
//   images: File
// ) => {
//   const businessBufferPromise = businessLicenseUpload.arrayBuffer(),
//     insuranceBufferPromise = insuranceCertificateUpload.arrayBuffer(),
//     imagesBufferPromise = images.arrayBuffer();

//   const [businessArrayBuffer, insuranceArrayBuffer, imagesArrayBuffer] =
//     await Promise.all([
//       businessBufferPromise,
//       insuranceBufferPromise,
//       imagesBufferPromise,
//     ]);
//   const businessBuffer = Buffer.from(businessArrayBuffer),
//     insuranceBuffer = Buffer.from(insuranceArrayBuffer),
//     imagesBuffer = Buffer.from(imagesArrayBuffer);
//   const businessPromise = uploadFile(
//     businessBuffer,
//     `agency-${userId}-businessLicense`
//   );
//   const insurancePromise = uploadFile(
//     insuranceBuffer,
//     `agency-${userId}-insurance`
//   );
//   const imagePromise = uploadFileDefault(imagesBuffer);
//   const [businessUpload, insuranceUpload, imageUpload]: any[] =
//     await Promise.all([businessPromise, insurancePromise, imagePromise]);

//   console.log("Files uploaded");
//   return {
//     businessUrl: businessUpload.secure_url,
//     insuranceUrl: insuranceUpload.secure_url,
//     imageUrl: imageUpload.secure_url,
//   };
// };

// export const createAgencyAction = async ({
//   values,
//   formData,
// }: {
//   values: any;
//   formData: FormData;
// }) => {
//   const session = await getSessionorRedirect();
//   const { success, data, error } = AgencySchema.partial({
//     businessLicenseUpload: true,
//     insuranceCertificateUpload: true,
//     images: true,
//   }).safeParse(values);
//   console.log(error);
//   if (!success) return { error: "Something went wrong!" };
//   try {
//     const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
//       session.user.id,
//       formData.get("businessLicenseUpload") as File,
//       formData.get("insuranceCertificateUpload") as File,

//       formData.get("images") as File
//     );
//     await db.agency.create({
//       data: {
//         ...data,
//         businessLicenseUpload: businessUrl,
//         insuranceCertificateUpload: insuranceUrl,
//         images: [imageUrl],
//         User: { connect: { id: session.user.id } },
//         keyPersonnel: { create: data.keyPersonnel },
//         pastProjects: { create: data.pastProjects },
//         clientReferences: { create: data.clientReferences },
//         socialMediaLinks: { create: data.socialMediaLinks },
//         caseStudyPdf: undefined,
//       },
//     });
//     return { success: "Agency created Succesfully" };
//   } catch (error: any) {
//     console.log("Error creating agency : ", error.message);
//     return { error: "Error creating agency" };
//   }
// };

"use server";

import { AgencySchema } from "@/components/agency/agencySchema";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { uploadFile, uploadFileDefault } from "../../cloudinary/cloudinary";

const uploadFiles = async (
  userId: string,
  businessLicenseUpload: File | null,
  insuranceCertificateUpload: File | null,
  images: File | null
) => {
  const uploadPromises = [];

  if (businessLicenseUpload) {
    const businessBuffer = Buffer.from(
      await businessLicenseUpload.arrayBuffer()
    );
    uploadPromises.push(
      uploadFile(businessBuffer, `agency-${userId}-businessLicense`)
    );
  }

  if (insuranceCertificateUpload) {
    const insuranceBuffer = Buffer.from(
      await insuranceCertificateUpload.arrayBuffer()
    );
    uploadPromises.push(
      uploadFile(insuranceBuffer, `agency-${userId}-insurance`)
    );
  }

  if (images) {
    const imagesBuffer = Buffer.from(await images.arrayBuffer());
    uploadPromises.push(uploadFileDefault(imagesBuffer));
  }

  const [businessUpload, insuranceUpload, imageUpload]: any[] =
    await Promise.all(uploadPromises);

  return {
    businessUrl: businessUpload?.secure_url ?? null,
    insuranceUrl: insuranceUpload?.secure_url ?? null,
    imageUrl: imageUpload?.secure_url ?? null,
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

  const businessLicenseUpload = formData.get(
    "businessLicenseUpload"
  ) as File | null;
  const insuranceCertificateUpload = formData.get(
    "insuranceCertificateUpload"
  ) as File | null;
  const images = formData.get("images") as File | null;

  const { success, data, error } = AgencySchema.partial({
    businessLicenseUpload: true,
    insuranceCertificateUpload: true,
    images: true,
  }).safeParse(values);

  if (!success) {
    console.log(error);
    return { error: "Something went wrong!" };
  }

  try {
    const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
      session.user.id,
      businessLicenseUpload,
      insuranceCertificateUpload,
      images
    );

    await db.agency.create({
      data: {
        ...data,
        businessLicenseUpload: businessUrl ?? undefined,
        insuranceCertificateUpload: insuranceUrl ?? undefined,
        images: imageUrl ? [imageUrl] : undefined,
        User: { connect: { id: session.user.id } },
        keyPersonnel: data.keyPersonnel
          ? { create: data.keyPersonnel }
          : undefined,
        pastProjects: data.pastProjects
          ? { create: data.pastProjects }
          : undefined,
        clientReferences: data.clientReferences
          ? { create: data.clientReferences }
          : undefined,
        socialMediaLinks: data.socialMediaLinks
          ? { create: data.socialMediaLinks }
          : undefined,
        caseStudyPdf: data.caseStudyPdf ?? undefined,
      },
    });

    return { success: "Agency created successfully" };
  } catch (error: any) {
    console.log("Error creating agency : ", error.message);
    return { error: "Error creating agency" };
  }
};
