"use server";
import { db } from "@/core/client/db";
import { getInfluencerCreateTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { InfluencerData } from "@prisma/client";
import sharp from "sharp";
import { uploadImageDefaultName } from "../../cloudinary/cloudinary";

export const AdminCreateInfluencer = async ({values, form}:{
  values: Pick<
    InfluencerData,
    | "name"
    | "description"
    | "socialLinks"
    | "speciality"
    | "introduction"
    | "country"
    | "state"
  >, form:FormData}
) => {
  const session = await getSessionorRedirect();
  try {
    
  const file = form.get("file");
  if (!file) return { error: "No file uploaded." };
  if (
    !(file instanceof File) ||
    !(
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/svg"
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

    const res = await db.influencerData.create({
      data: {
        ...values,
        image:imgSource,
        user: { connect: { id: session.user.id } },
      },
    });

    return { success: true };
  }  catch (error: unknown) {
    console.log(error);

      // Check if it's a Prisma unique constraint error
      if (error instanceof Error) {
        if (error.message.includes('Unique constraint failed')) {
            // Extract the field name from the error message
            const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
            const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
    
            return { error: `Failed to Create: A company with this ${fieldName} already exists.` };
        }
        return { error: `Failed to Create: ${error.message}` };
    }
    
  
  
    return { error: "Failed to Create: An unknown error occurred." };
}

};
