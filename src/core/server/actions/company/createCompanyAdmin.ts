"use server";
import { db } from "@/core/client/db";
import {
  getCompanyCreateTemplate,
  getSignupTemplate,
} from "@/core/nodemailer/mailTemplates";
import { sendMail } from "@/core/nodemailer/nodemailer";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company, CompanyData, User } from "@prisma/client";

export const createCompanyAdmin = async (data: {
  company: Omit<
    Company,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "user"
    | "userId"
    | "isSuspended"
    | "rating"
    | "reviews"
  >;
  companyData: Omit<CompanyData, "id" | "companyId">;
  user: Pick<User, "email" | "username" | "image">;
}) => {
  const session = await getSessionorRedirect();
  //   if (session.user.role !== "ADMIN")
  //     return { error: "Unauthorized! Admin Only" };
  try {
    const res = await db.$transaction(async (tx) => {
      const newuser = await db.user.create({
        data: { role: "COMPANY", ...data.user },
      });

      const newCompany = await tx.company.create({
        data: {
          ...data.company,
          isSuspended: true,
          priority: 0,
          user: { connect: { id: newuser.id } },
        },
        select: { id: true, legalName: true },
      });
      const cdata = await tx.companyData.create({
        data: {
          ...data.companyData,
          company: { connect: { id: newCompany.id } },
        },
      });
    });
    // revalidatePath("/auth/company");
    return { success: "Company created successfully." };
  } catch (error: any) {
    console.log(error);
    if (error.meta.modelName === "User" && error.meta.target[0] === "email")
      return { error: "user or company already exists" };
    return { error: "Failed to create company." };
  }
};
