"use server";
import { db } from "@/core/client/db";
import {
  getCompanyCreateTemplate,
  getSignupTemplate,
} from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company, CompanyData } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    const output = await db.$transaction(async (tx) => {
      const res = await tx.company.create({
        data: {
          ...company,
          isCertified: false,
          isSuspended: true,
          priority: 0,
          user: { connect: { id: session.user.id } },
        },
        select: { id: true, legalName: true },
      });

      const cdata = await tx.companyData.create({
        data: {
          ...companyData,
          company: { connect: { id: res.id } },
        },
      });

      await tx.user.update({
        where: { id: session.user.id },
        data: { role: "COMPANY" },
      });
      return { legalName: res.legalName };
    });
    await sendMail({
      toEmail: session.user.email,
      ...getCompanyCreateTemplate(session.user.name, output.legalName),
    });
    // revalidatePath("/auth/company");
    return { success: "Company created successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create company." };
  }
};
