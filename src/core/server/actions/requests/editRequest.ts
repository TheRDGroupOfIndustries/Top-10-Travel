"use server";
import { db } from "@/core/client/db";
import { getRequestAcceptedTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Request } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const editRequestAdmin = async (
  values: Pick<Request, "status" | "id">
) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };

  try {
    const res = await db.request.update({
      where: { id: values.id },
      data: {
        status: values.status,
      },
    });
    const email = await db.companyData.findUnique({
      where: { companyId: res.companyId },
      select: { companyEmail: true },
    });
    if (email && email.companyEmail) {
      await sendMail({
        toEmail: email.companyEmail,
        ...getRequestAcceptedTemplate(email.companyEmail, res.status==="ACCEPTED"),
      });
    }
    revalidateTag("admin-requests");
    return { success: "Request updated successfully." };
  } catch (error: any) {
    console.log(error.message ?? error);
    return {
      error: "Failed to update request",
    };
  }
};
