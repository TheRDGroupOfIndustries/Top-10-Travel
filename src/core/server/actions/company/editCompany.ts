"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const editCompanyActionAdmin = async (
  values: Pick<
    Company,
    | "companyRole"
    | "isCertified"
    | "isSuspended"
    | "legalName"
    | "priority"
    | "state_priority"
    | "methodology"
  > & { id: string }
) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  try {
    const res = await db.company.update({
      where: { id: values.id },
      data: { ...values },
      select: { id: true },
    });
    revalidatePath("/admin/companies");
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while applying changes." };
  }
};
export const editCompanyAction = async (
  values: Partial<
    Pick<
      Company,
      "legalName" | "city" | "country" | "state" | "methodology" | "image"
    >
  >
) => {
  const session = await getSessionorRedirect();
  const keys = Object.keys(values);
  keys.forEach((key) => {
    // @ts-expect-error
    if (values[key]?.trim().length < 3) {
      return { error: `${key} must be atleast 3 characters.` };
    }
  });
  if (values.image) {
    try {
      const url = new URL(values.image);
    } catch (error) {
      return { error: "Image is not valid!" };
    }
  }
  try {
    const res = await db.company.update({
      where: { userId: session.user.id },
      data: { ...values },
      select: { id: true },
    });
    revalidatePath("/company");
    return { success: "Company edited successfully.", companyId: res.id };
  } 
    catch (error: unknown) {
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
  
  }
