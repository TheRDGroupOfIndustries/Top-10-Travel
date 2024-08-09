"use server";

import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import cloudinary from "cloudinary";
import sharp from "sharp";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadImage(data: Buffer, name: string) {
  // await sharp(data);
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "top10travels",
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
async function uploadImageDefaultName(data: Buffer) {
  // await sharp(data);
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "top10travels",
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
