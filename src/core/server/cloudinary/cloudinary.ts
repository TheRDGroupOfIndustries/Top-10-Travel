"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import cloudinary, { FOLDER_NAME } from "./cloudinary_config";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

async function uploadImage(data: Buffer, name: string) {
  // await sharp(data);
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader
      .upload_stream(
        {
          folder: FOLDER_NAME,
          allowed_formats: ["jpg", "png", "svg"],
          // filename_override: name,
          public_id: name,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(data);
    // const stream = new ReadableStream(data.b)
    // writeReadableStreamToWritable(,uploadStream)
  });
  return uploadPromise;
}
export async function uploadImageDefaultName(data: Buffer) {
  // await sharp(data);
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader
      .upload_stream(
        {
          folder: FOLDER_NAME,
          allowed_formats: ["jpg", "png", "svg"],
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(data);
    // const stream = new ReadableStream(data.b)
    // writeReadableStreamToWritable(,uploadStream)
  });
  return uploadPromise;
}

export const uploadFileAction = async (form: FormData) => {
  const session = await getSessionorRedirect();

  const file = form.get("file");
  if (!file) return { error: "No file uploaded." };
  if (
    !(file instanceof File) ||
    !(
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    )
  ) {
    return { error: "Invalid file type" };
  }
  const buffer = await file.arrayBuffer();
  const resizedBuffer = await sharp(buffer).resize(600, 600).jpeg().toBuffer();

  // @ts-expect-error
  const imgSource: string = (
    await uploadImage(resizedBuffer, `${session.user.id}_company`)
  ).secure_url;

  if (!imgSource) {
    return { error: "Error in uploading image! try again" };
  }
  return { uploadedUrl: imgSource };
};
export const uploadCompanyDashboardImage = async (form: FormData) => {
  const session = await getSessionorRedirect();

  const file = form.get("file");
  if (!file) return { error: "No file uploaded." };
  if (
    !(file instanceof File) ||
    !(
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    )
  ) {
    return { error: "Invalid file type" };
  }
  const buffer = await file.arrayBuffer();
  const resizedBuffer = await sharp(buffer).resize(600, 600).jpeg().toBuffer();

  // @ts-expect-error
  const imgSource: string = (
    await uploadImage(resizedBuffer, `${session.user.id}_company`)
  ).secure_url;

  if (!imgSource) {
    return { error: "Error in uploading image! try again" };
  }
  try {
    const company = await db.company.findUnique({
      where: { userId: session.user.id },
    });
    if (!company) return { error: "No company found" };
    await db.company.update({
      where: { id: company.id },
      data: { image: imgSource },
    });
    return { uploadedUrl: imgSource };
  } catch (error) {
    return { error: "Error uploading image! try again" };
  }
};

export const uploadCompanyImages = async ({
  form,
  companyId,
}: {
  form: FormData;
  companyId: string;
}) => {
  const session = await getSessionorRedirect();

  const file = form.get("file");
  if (!file) return { error: "No file uploaded." };
  if (
    !(file instanceof File) ||
    !(
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    )
  ) {
    return { error: "Invalid file type" };
  }
  const buffer = await file.arrayBuffer();
  const resizedBuffer = await sharp(buffer).resize(500, 500).jpeg().toBuffer();

  // @ts-expect-error
  const imgSource: string = (await uploadImageDefaultName(resizedBuffer))
    .secure_url;

  if (!imgSource) {
    return { error: "Error in uploading image! try again" };
  }
  try {
    const cdata = await db.companyData.findUnique({
      where: { companyId },
      select: { images: true },
    });
    if (!cdata) return { error: "No company data found" };

    if (cdata.images.length >= 4) return { error: "Can upload upto 4 images." };

    await db.companyData.update({
      where: { companyId: companyId },
      data: { images: { push: imgSource } },
    });
    revalidatePath("/company");
    return { success: "Image Uploaded Succesfully." };
  } catch (error) {
    return { error: "Error uploading image! try again" };
  }
};

export const uploadUserImage = async (form: FormData) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };

  const file = form.get("file");
  if (!file) return { error: "No file uploaded." };
  if (
    !(file instanceof File) ||
    !(
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    )
  ) {
    return { error: "Invalid file type" };
  }
  const buffer = await file.arrayBuffer();
  const resizedBuffer = await sharp(buffer).resize(300, 300).jpeg().toBuffer();

  // @ts-expect-error
  const imgSource: string = (await uploadImageDefaultName(resizedBuffer))
    .secure_url;

  if (!imgSource) {
    return { error: "Error in uploading image! try again" };
  }
  return { uploadedUrl: imgSource };
};

export const deleteImage = async ({
  url,
  companyId,
}: {
  url: string;
  companyId: string;
}) => {
  const session = await getSessionorRedirect();
  try {
    const cdata = await db.companyData.findUnique({
      where: { companyId },
      select: { images: true },
    });
    if (!cdata) return { error: "Couldn't find company" };

    const filename = url.split(FOLDER_NAME).pop();
    if (!filename) return { error: "Invalid image URL" };
    const public_id = `${FOLDER_NAME}${filename.split(".")[0]}`;
    console.log(public_id);
    const res = await cloudinary.v2.uploader.destroy(public_id, {
      resource_type: "image",
      invalidate: true,
    });

    if (res?.result === "not found") return { error: "Image not found" };

    const filteredImages = cdata.images.filter((image) => image !== url);

    await db.companyData.update({
      where: { companyId },
      data: { images: { set: filteredImages } },
    });
    revalidatePath("/company");
    return { success: "Image deleted successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Could not delete the image." };
  }
};
