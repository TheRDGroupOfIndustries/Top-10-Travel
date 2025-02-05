"use server";

import { DmcSchema } from "@/components/dmc/dmcSchema";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { uploadFile, uploadFileDefault } from "../../cloudinary/cloudinary";

const uploadFiles = async (
  companyRegistrationNumber: string,
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
        uploadFile(
          Buffer.from(buffer),
          `dmc-${companyRegistrationNumber}-businessLicense`
        )
      )
    );
  }

  if (insuranceCertificateUpload) {
    const insuranceBufferPromise = insuranceCertificateUpload.arrayBuffer();
    uploadPromises.push(
      insuranceBufferPromise.then((buffer) =>
        uploadFile(
          Buffer.from(buffer),
          `dmc-${companyRegistrationNumber}-insurance`
        )
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
      // session.user.id,
      values.companyRegistrationNumber
        ? values.companyRegistrationNumber
        : Math.floor(10000000000 + Math.random() * 90000000000).toString(),
      formData.get("businessLicenseUpload") as File | null,
      formData.get("insuranceCertificateUpload") as File | null,
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
    console.log("Error creating dmc: ", error.message);
    return { error: "Error creating DMC" };
  }
};
