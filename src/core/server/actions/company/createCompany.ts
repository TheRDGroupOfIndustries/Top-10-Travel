"use server";
import { db } from "@/core/client/db";
import {
  getCompanyCreateTemplate,
  getSignupTemplate,
} from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company, CompanyData } from "@prisma/client";

export const createCompanyAction = async (
  company: Omit<
    Company,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "user"
    | "userId"
    | "isSuspended"
    | "isCertified"
    | "priority"
    | "rating"
    | "reviews"
    | "methodology"
    | "state_priority"
  >,
  companyData: Omit<CompanyData, "id" | "socialLinks" | "images" | "companyId">
) => {
  const session = await getSessionorRedirect();
  if (company.image) {
    try {
      const url = new URL(company.image);
    } catch (error) {
      return { error: "Image is not valid!" };
    }
  }
  try {
    const res = await db.company.create({
      data: {
        ...company,
        isCertified: false,
        isSuspended: true,
        priority: 0,
        user: { connect: { id: session.user.id } },
      },
      select: { id: true, legalName: true },
    });
    const cdata = await db.companyData.create({
      data: {
        ...companyData,
        company: { connect: { id: res.id } },
      },
    });
    await db.user.update({
      where: { id: session.user.id },
      data: { role: "COMPANY" },
    });
    await sendMail({
      toEmail: session.user.email,
      ...getCompanyCreateTemplate(session.user.name, res.legalName),
    });
    // revalidatePath("/auth/company");
    return { success: "Company created successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create company." };
  }
};
