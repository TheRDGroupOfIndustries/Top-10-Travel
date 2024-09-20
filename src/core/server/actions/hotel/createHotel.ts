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
import { HotelSchema } from "@/components/hotel/hotelSchema";
const uploadFiles = async (
  userId: string,
  businessLicenseUpload: File | null,
  insuranceCertificateUpload: File | null,
  images: File
) => {
  const uploadPromises: Promise<any>[] = [];
  const imageBufferPromise = images.arrayBuffer();

  // Only upload business license if it's provided
  if (businessLicenseUpload) {
    const businessBufferPromise = businessLicenseUpload.arrayBuffer();
    uploadPromises.push(
      businessBufferPromise.then((buffer) =>
        uploadFile(Buffer.from(buffer), `hotel-${userId}-businessLicense`)
      )
    );
  } else {
    uploadPromises.push(Promise.resolve(null));
  }

  // Only upload insurance certificate if it's provided
  if (insuranceCertificateUpload) {
    const insuranceBufferPromise = insuranceCertificateUpload.arrayBuffer();
    uploadPromises.push(
      insuranceBufferPromise.then((buffer) =>
        uploadFile(Buffer.from(buffer), `hotel-${userId}-insurance`)
      )
    );
  } else {
    uploadPromises.push(Promise.resolve(null));
  }

  const imagesBuffer = await imageBufferPromise;
  uploadPromises.push(uploadFileDefault(Buffer.from(imagesBuffer)));

  const uploadResults = await Promise.all(uploadPromises);

  // Get the URLs only if the uploads were successful
  const businessUrl = uploadResults[0]?.secure_url || null;
  const insuranceUrl = uploadResults[1]?.secure_url || null;
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
      session.user.id,
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
