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
