"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company, CompanyData } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";


export const editCompanyDataAction = async (
  values: Partial<
    Pick<CompanyData, "id"|"companyId">
  >
) => {
  const session = await getSessionorRedirect();
    
  const company = await db.company.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!company) return { error: "Can only update your own company data." };

  try {
    const res = await db.companyData.update({
      where: { companyId:company.id },
      data: { ...values },
      select: { id: true },
    });
    revalidatePath("/company");
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while applying changes." };
  }
};
