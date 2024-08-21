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

  try {
    const res = await db.request.create({
      data: {
        message: `New request from ${session.user.name}: ${values.message}`,
        user: { connect: { id: session.user.id } },
        status: "PENDING",
      },
      select: { id: true },
    });
    if (process.env.NODE_ENV === "production")
      await sendMail({
        toEmail: session.user.email,
        ...getRequestConfirmationTemplate(session.user.name),
      });

    revalidatePath("/dashboard/request");
    return { success: "Request sent successfully." };
  } catch (error: any) {
    console.log(error.message ?? error);
    return {
      error: "Failed to send request",
    };
  }
};
