"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
export const deleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/user`);
    return { success: "User Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
