"use server";

import { HotelSchema } from "@/components/hotel/hotelSchema";
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
          `hotel-${companyRegistrationNumber}-businessLicense`
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
          `hotel-${companyRegistrationNumber}-insurance`
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

export const createHotelAction = async ({
  values,
  formData,
}: {
  values: any;
  formData: FormData;
}) => {
  const session = await getSessionorRedirect();
  const { success, data, error } = HotelSchema.partial({
    businessLicenseUpload: true,
    insuranceCertificateUpload: true,
    images: true,
  }).safeParse(values);

  console.log(error);
  if (!success) return { error: "Something went wrong!" };
  try {
    const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
      // session.user.id,
      values.companyRegistrationNumber,
      formData.get("businessLicenseUpload") as File | null,
      formData.get("insuranceCertificateUpload") as File | null,
      formData.get("images") as File
    );

    await db.hotel.create({
      data: {
        ...data,
        businessLicenseUpload: businessUrl,
        insuranceCertificateUpload: insuranceUrl,
        images: [imageUrl],
        User: { connect: { id: session.user.id } },
        socialMediaLinks: { create: data.socialMediaLinks },
      },
    });
    return { success: "Hotel created Succesfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Error creating Hotel" };
  }
};
