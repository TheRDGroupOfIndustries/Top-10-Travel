"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import cloudinary, { FOLDER_NAME } from "./cloudinary_config";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export async function uploadImage(data: Buffer, name: string) {
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
export async function uploadFile(data: ArrayBuffer, name: string) {
  // await sharp(data);
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader
      .upload_stream(
        {
          folder: FOLDER_NAME,
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
export async function uploadFileDefault(data: ArrayBuffer) {
  // await sharp(data);
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader
      .upload_stream(
        {
          folder: FOLDER_NAME,
          // filename_override: name,
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

// dashboard
export const uploadAgencyImages = async ({
  form,
  agencyId,
}: {
  form: FormData;
  agencyId: string;
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
    const cdata = await db.agency.findUnique({
      where: { id: agencyId },
      select: { images: true },
    });
    if (!cdata) return { error: "Agency Not found" };
    if (cdata.images.length >= 5) return { error: "Can upload upto 5 images." };

    await db.agency.update({
      where: { id: agencyId },
      data: { images: { push: imgSource } },
    });
    revalidatePath("/dashboard/agency");
    return { success: "Image Uploaded Succesfully." };
  } catch (error) {
    return { error: "Error uploading image! try again" };
  }
};

export const uploadDmcImages = async ({
  form,
  dmcId,
}: {
  form: FormData;
  dmcId: string;
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
    const cdata = await db.dMC.findUnique({
      where: { id: dmcId },
      select: { images: true },
    });
    if (!cdata) return { error: "dmc Not found" };
    if (cdata.images.length >= 5) return { error: "Can upload upto 5 images." };

    await db.dMC.update({
      where: { id: dmcId },
      data: { images: { push: imgSource } },
    });
    revalidatePath("/dashboard/dmc");
    return { success: "Image Uploaded Succesfully." };
  } catch (error) {
    return { error: "Error uploading image! try again" };
  }
};
export const uploadHotelImages = async ({
  form,
  hotelId,
}: {
  form: FormData;
  hotelId: string;
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
    const cdata = await db.hotel.findUnique({
      where: { id: hotelId },
      select: { images: true },
    });
    if (!cdata) return { error: "Hotel Not found" };
    if (cdata.images.length >= 5) return { error: "Can upload upto 5 images." };

    await db.hotel.update({
      where: { id: hotelId },
      data: { images: { push: imgSource } },
    });
    revalidatePath("/dashboard/hotel");
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

export const deleteAgencyImage = async ({
  url,
  agencyId,
}: {
  url: string;
  agencyId: string;
}) => {
  const session = await getSessionorRedirect();
  try {
    const cdata = await db.agency.findUnique({
      where: { id:agencyId },
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

    await db.agency.update({
      where: { id:agencyId },
      data: { images: { set: filteredImages } },
    });
    revalidatePath("/dashboard/agency");
    return { success: "Image deleted successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Could not delete the image." };
  }
};

export const deleteHotelImage = async ({
  url,
  hotelId,
}: {
  url: string;
  hotelId: string;
}) => {
  const session = await getSessionorRedirect();
  try {
    const cdata = await db.hotel.findUnique({
      where: { id:hotelId },
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

    await db.hotel.update({
      where: { id:hotelId },
      data: { images: { set: filteredImages } },
    });
    revalidatePath("/dshboard/hotel");
    return { success: "Image deleted successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Could not delete the image." };
  }
};

export const deleteDmcImage = async ({
  url,
  dmcId,
}: {
  url: string;
  dmcId: string;
}) => {
  const session = await getSessionorRedirect();
  try {
    const cdata = await db.dMC.findUnique({
      where: { id:dmcId },
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

    await db.dMC.update({
      where: { id:dmcId },
      data: { images: { set: filteredImages } },
    });
    revalidatePath("/dashboard/dmc");
    return { success: "Image deleted successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Could not delete the image." };
  }
};
