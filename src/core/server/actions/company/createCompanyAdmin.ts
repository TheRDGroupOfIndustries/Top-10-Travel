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
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin Only" };
  if (data.company.image) {
    try {
      const url = new URL(data.company.image);
    } catch (error) {
      return { error: "Company Image is invalid." };
    }
  }
  if (data.companyData.images) {
    try {
      data.companyData.images.forEach((image) => {
        const url = new URL(image);
      });
    } catch (error) {
      return { error: "Images Provided contain invalid images." };
    }
  }
  if (data.companyData.socialLinks) {
    try {
      data.companyData.socialLinks.forEach((link) => {
        const url = new URL(link);
      });
    } catch (error) {
      return { error: "Social Links Provided contain invalid links." };
    }
  }

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
  } catch (error: unknown) {
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
