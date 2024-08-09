"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
export const deleteUser = async (id: string) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/admin/users`);
    return { success: "User Deleted Succesfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};
