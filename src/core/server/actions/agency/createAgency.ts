"use server";

import { AgencySchema } from "@/components/agency/agencySchema";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { uploadFile, uploadFileDefault } from "../../cloudinary/cloudinary";

const uploadFiles = async (
  userId: string,
  businessLicenseUpload: File | null,
  insuranceCertificateUpload: File | null,
  images: File
) => {
  const uploadPromises: Promise<any>[] = [];
  const imageBufferPromise = images.arrayBuffer();

  if (businessLicenseUpload) {
    const businessBufferPromise = businessLicenseUpload.arrayBuffer();
    uploadPromises.push(
      businessBufferPromise.then((buffer) =>
        uploadFile(Buffer.from(buffer), `agency-${userId}-businessLicense`)
      )
    );
  }

  if (insuranceCertificateUpload) {
    const insuranceBufferPromise = insuranceCertificateUpload.arrayBuffer();
    uploadPromises.push(
      insuranceBufferPromise.then((buffer) =>
        uploadFile(Buffer.from(buffer), `agency-${userId}-insurance`)
      )
    );
  }

  const imagesBuffer = await imageBufferPromise;
  uploadPromises.push(uploadFileDefault(Buffer.from(imagesBuffer)));

  const uploadResults = await Promise.all(uploadPromises);
  const businessUrl = businessLicenseUpload
    ? uploadResults[0].secure_url
    : null;
  const insuranceUrl = insuranceCertificateUpload
    ? uploadResults[1].secure_url
    : null;
  const imageUrl = uploadResults[uploadResults.length - 1].secure_url;

  console.log("Files uploaded");
  return {
    businessUrl,
    insuranceUrl,
    imageUrl,
  };
};

export const createAgencyAction = async ({
  values,
  formData,
}: {
  values: any; // Adjust this type according to your schema
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

  // const userId = session?.user?.role !== "ADMIN" ? session?.user?.id : Math.random()

  try {
    const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
      session.user.id,
      formData.get("businessLicenseUpload") as File | null,
      formData.get("insuranceCertificateUpload") as File | null,
      formData.get("images") as File
    );

    await db.agency.create({
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

    return { success: "Agency created Successfully" };
  } catch (error: any) {
    console.log("Error creating agency: ", error.message);
    return { error: "Error creating agency" };
  }
};

// updated - gd

// "use server";

// import { AgencySchema } from "@/components/agency/agencySchema";
// import { db } from "@/core/client/db";
// import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
// import { uploadFile, uploadFileDefault } from "../../cloudinary/cloudinary";

// const uploadFiles = async (
//   userId: string,
//   businessLicenseUpload: File | null,
//   insuranceCertificateUpload: File | null,
//   images: File | null
// ) => {
//   const uploadPromises = [];

//   if (businessLicenseUpload) {
//     const businessBuffer = Buffer.from(
//       await businessLicenseUpload.arrayBuffer()
//     );
//     uploadPromises.push(
//       uploadFile(businessBuffer, `agency-${userId}-businessLicense`)
//     );
//   }

//   if (insuranceCertificateUpload) {
//     const insuranceBuffer = Buffer.from(
//       await insuranceCertificateUpload.arrayBuffer()
//     );
//     uploadPromises.push(
//       uploadFile(insuranceBuffer, `agency-${userId}-insurance`)
//     );
//   }

//   if (images) {
//     const imagesBuffer = Buffer.from(await images.arrayBuffer());
//     uploadPromises.push(uploadFileDefault(imagesBuffer));
//   }

//   const [businessUpload, insuranceUpload, imageUpload]: any[] =
//     await Promise.all(uploadPromises);

//   return {
//     businessUrl: businessUpload?.secure_url ?? null,
//     insuranceUrl: insuranceUpload?.secure_url ?? null,
//     imageUrl: imageUpload?.secure_url ?? null,
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

//   const businessLicenseUpload = formData.get(
//     "businessLicenseUpload"
//   ) as File | null;
//   const insuranceCertificateUpload = formData.get(
//     "insuranceCertificateUpload"
//   ) as File | null;
//   const images = formData.get("images") as File | null;

//   const { success, data, error } = AgencySchema.partial({
//     businessLicenseUpload: true,
//     insuranceCertificateUpload: true,
//     images: true,
//   }).safeParse(values);

//   if (!success) {
//     console.log(error);
//     return { error: "Something went wrong!" };
//   }

//   try {
//     const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
//       session.user.id,
//       businessLicenseUpload,
//       insuranceCertificateUpload,
//       images
//     );

//     await db.agency.create({
//       data: {
//         ...data,
//         businessLicenseUpload: businessUrl ?? undefined,
//         insuranceCertificateUpload: insuranceUrl ?? undefined,
//         images: imageUrl ? [imageUrl] : undefined,
//         User: { connect: { id: session.user.id } },
//         keyPersonnel: data.keyPersonnel
//           ? { create: data.keyPersonnel }
//           : undefined,
//         pastProjects: data.pastProjects
//           ? { create: data.pastProjects }
//           : undefined,
//         clientReferences: data.clientReferences
//           ? { create: data.clientReferences }
//           : undefined,
//         socialMediaLinks: data.socialMediaLinks
//           ? { create: data.socialMediaLinks }
//           : undefined,
//         caseStudyPdf: data.caseStudyPdf ?? undefined,
//       },
//     });

//     return { success: "Agency created successfully" };
//   } catch (error: any) {
//     console.log("Error creating agency : ", error.message);
//     return { error: "Error creating agency" };
//   }
// };
