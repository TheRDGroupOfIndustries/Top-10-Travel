"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company, CompanyData } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const editCompanyDataAction = async (
  values: Partial<
    Omit<CompanyData, "id" | "companyId" | "images" | "socialLinks"> & {
      socialLinks: string;
    }
  >
) => {
  const session = await getSessionorRedirect();

  const company = await db.company.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  let socialLinksArr: string[] | undefined = undefined;
  if (values.socialLinks) {
    socialLinksArr = values.socialLinks.split(",");
    try {
      socialLinksArr.forEach((link) => {
        const url = new URL(link);
      });
    } catch (error) {
      return { error: "Social Links Provided contain invalid links." };
    }
  }

  if (!company) return { error: "Can only update your own company data." };

  try {
    const res = await db.companyData.update({
      where: { companyId: company.id },
      data: { ...values, socialLinks: socialLinksArr },
      select: { id: true },
    });
    revalidatePath("/company");
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error: unknown) {
    console.log(error);

    // Check if it's a Prisma unique constraint error
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        // Extract the field name from the error message
        const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
        const fieldName = fieldNameMatch ? fieldNameMatch[1] : "unknown field";

        return {
          error: `Failed to Create: A company with this ${fieldName} already exists.`,
        };
      }
      return { error: `Failed to Create: ${error.message}` };
    }

    return { error: "Failed to Create: An unknown error occurred." };
  }
};
