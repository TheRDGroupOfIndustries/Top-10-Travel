"use server";
import { db } from "@/core/client/db";
import { getInfluencerCreateTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { InfluencerData } from "@prisma/client";

export const createInfluencerDataAction = async (
  values: Pick<
    InfluencerData,
    | "name"
    | "image"
    | "description"
    | "socialLinks"
    | "speciality"
    | "introduction"
    | "country"
    | "state"
  >
) => {
  const session = await getSessionorRedirect();
  try {
    const res = await db.influencerData.create({
      data: {
        ...values,
        user: { connect: { id: session.user.id } },
      },
    });
    await db.user.update({
      where: { id: session.user.id },
      data: { role: "Influencer" },
    });
    await sendMail({
      toEmail: session.user.email,
      ...getInfluencerCreateTemplate(res.name),
    });
    return { success: "Influencer Account created successfully." };
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
