"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
export const deleteCompany = async (id: string) => {
  try {
    await db.company.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/company`);
    return { success: "Company Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
