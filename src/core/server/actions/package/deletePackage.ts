"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
export const deletePackageAdmin = async (id: string) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only." };
  try {
    await db.package.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/package`);
    return { success: "Package Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
