"use server";
import { db } from "@/core/client/db";
import { getRequestConfirmationTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Request } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createRequestAction = async (values: Pick<Request, "message">) => {
  const session = await getSessionorRedirect();
  const company = await db.company.findUnique({
    where: { userId: session.user.id },
    select: { id: true, legalName: true },
  });
  if (!company) return { error: "Invalid request." };
  try {
    const res = await db.request.create({
      data: {
        message: `New request from ${company.legalName}: ${values.message}`,
        
        status: "PENDING",
        company: { connect: { id: company.id } },
      },
      select: { id: true },
    });
    // await sendMail({
    //   toEmail: session.user.email,
    //   ...getRequestConfirmationTemplate(session.user.name),
    // });
    revalidatePath("/company/request");
    return { success: "Request sent successfully." };
  } catch (error: any) {
    console.log(error.message ?? error);
    return {
      error: "Failed to send request",
    };
  }
};
