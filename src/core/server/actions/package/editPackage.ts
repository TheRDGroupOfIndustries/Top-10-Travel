"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Package } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    const leftpackages = await db.package.count({
      where: { companyId: company.id },
    });
    if (leftpackages === 0) {
      await db.company.update({
        where: { id: company.id },
        data: { isSuspended: true },
      });
      revalidatePath("/company/packages");
      return {
        success:
          "Package deleted successfully. Your company has no packages left.",
      };
    }
    return { success: "Package deleted successfully.", packageId: res.id };
  }  catch (error: unknown) {
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
