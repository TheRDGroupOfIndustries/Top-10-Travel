"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Agency } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const updatePrimaryAction = async ({
  value,
  id,
}: {
  value: string[];
  id: string;
}) => {
  try {
    const res = await db.dMC.update({
      where: { id },
      data: { coreServices: value },
      select: { id: true },
    });
    revalidatePath("/dashboard/agency");
    return { success: "Changes saved successfully.", companyId: res.id };
  } catch (error: unknown) {
    console.log(error);

    return { error: "Failed to Create: An unknown error occurred." };
  }
};

export const updateSpecialAction = async ({
  value,
  id,
}: {
  value: string[];
  id: string;
}) => {
  try {
    const res = await db.dMC.update({
      where: { id },
      data: { specialization: value },
      select: { id: true },
    });
    revalidatePath("/dashboard/agency");
    return { success: "Changes saved successfully.", companyId: res.id };
  } catch (error: unknown) {
    console.log(error);

    return { error: "Failed to Create: An unknown error occurred." };
  }
};
