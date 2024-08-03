"use server";
import { db } from "@/core/client/db";
import { getHotelInquiryTemplate } from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import { Enquiry } from "@prisma/client";

export const createEnquiryAction = async (
  values: Omit<Enquiry, "id" | "createdAt">
) => {
  try {
    const res = await db.enquiry.create({
      data: { ...values },
    });
    
    const { company } = await db.notification.create({
      data: {
        type: "ENQUIRY",
        company: { connect: { id: values.companyId } },
        message: `You have a new enquiry from ${res.name}.`,
      },
      select: {
        company: {
          select: {
            legalName: true,
            companyData: { select: { companyEmail: true } },
          },
        },
      },
    });

    if (company.companyData?.companyEmail)
      await sendMail({
        toEmail: company.companyData?.companyEmail,
        ...getHotelInquiryTemplate(
          values.name,
          values.email,
          values.message,
          company.legalName
        ),
      });

    return { success: "Enquiry sent successfully." };
  } catch (error: any) {
    console.log(error);
    return {
      error:
        error.meta.modelName === "Enquiry"
          ? "You can only send one query to a company."
          : "Failed to create enquiry.",
    };
  }
};
