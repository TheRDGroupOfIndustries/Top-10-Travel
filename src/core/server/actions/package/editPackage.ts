"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Package } from "@prisma/client";

export const editPackageAction = async (
  id: string,
  values: Partial<Omit<Package, "id" | "createdAt" | "companyId" | "company">>
) => {
  const session = await getSessionorRedirect();
  try {
    const company = await db.company.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!company) return { error: "Can only edit your own company." };

    const res = await db.package.update({
      where: { id, companyId: company.id },
      data: { ...values },
    });
    return { success: "Package created successfully.", packageId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create package." };
  }
};
export const deletePackageOwn = async (id: string) => {
  const session = await getSessionorRedirect();
  try {
    const company = await db.company.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!company) return { error: "Can only delete your own company." };

    const res = await db.package.delete({
      where: { id, companyId: company.id },
    });
    return { success: "Package deleted successfully.", packageId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete package." };
  }
};
