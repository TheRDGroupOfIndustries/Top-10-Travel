"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Agency } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const updatePrimaryAction = async (value: string[]) => {
  const session = await getSessionorRedirect();

  try {
    const res = await db.dMC.update({
      where: { userId: session.user.id },
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

export const updateSpecialAction = async (value: string[]) => {
  const session = await getSessionorRedirect();

  try {
    const res = await db.dMC.update({
      where: { userId: session.user.id },
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
