"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
export const deletePackageAction = async (
  id: string
) => {
  try {
      await db.package.delete({
        where: {
          id,
        }
      });
      revalidatePath(`/dashboard/package`);
      return { success: "package Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
