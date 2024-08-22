"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Agency } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";


export const editAgencyAction = async (values: Partial<Agency>) => {
  const session = await getSessionorRedirect();
  const keys = Object.keys(values);
  keys.forEach((key) => {
    // @ts-expect-error
    if (typeof values[key]==="string" && values[key]?.trim().length < 3) {
      return { error: `${key} must be atleast 3 characters.` };
    }
  });

  try {
    const res = await db.agency.update({
      where: { userId: session.user.id },
      data: { ...values },
      select: { id: true },
    });
    revalidatePath("/dashboard/agency");
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
