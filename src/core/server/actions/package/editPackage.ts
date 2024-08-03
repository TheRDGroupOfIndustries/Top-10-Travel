"use server"
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Package } from "@prisma/client";

export const editPackageAction = async (
  id: string,
  values: Partial<Omit<Package, "id" | "createdAt" | "companyId" | "company">>
) => {
  const session = await getSessionorRedirect();
  try {
    const res = await db.package.update({
      where: { id, companyId: session.user.companyId },
      data: { ...values },
    });
    return { success: "Package created successfully.", packageId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create package." };
  }
};
export const deletePackageAction = async (id: string) => {
  const session = await getSessionorRedirect();
  try {
    const res = await db.package.delete({
      where: { id, companyId: session.user.companyId },
    });
    return { success: "Package deleted successfully.", packageId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete package." };
  }
};
