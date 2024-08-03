"use server"
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company } from "@prisma/client";

export const editCompanyAction = async (
  id: string,
  values: Partial<
    Omit<Company, "id" | "createdAt" | "updatedAt" | "user" | "userId">
  >
) => {
  const session = await getSessionorRedirect();
  try {
    const res = await db.company.update({
      where: { id: id, userId: session.user.id },
      data: { ...values },
      select: { id: true },
    });
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while applying changes." };
  }
};
