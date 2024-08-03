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
  } catch (error) {
    console.log(error);
    return { error: "Failed to create influencer account." };
  }
};
