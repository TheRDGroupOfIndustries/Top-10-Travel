"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { DMC, type Hotel,  } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const editDMCActionAdmin = async (
  values: Pick<
    DMC,
    "isCertified" | "name" | "priority" | "city_priority" | "methodology"
  > & { id: string }
) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  try {
    const res = await db.dMC.update({
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

export const editDMCAction = async ({ values, id }:{ values: Partial<DMC>, id: string}) => {
  const keys = Object.keys(values);
  keys.forEach((key) => {
    // @ts-expect-error
    if (values[key]?.trim().length < 3) {
      return { error: `${key} must be atleast 3 characters.` };
    }
  });

  try {
    const res = await db.dMC.update({
      where: { id },
      data: { ...values },
      select: { id: true },
    });
    revalidatePath("/dashboard/dmc");
    return { success: "Changes saved successfully.", companyId: res.id };
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
