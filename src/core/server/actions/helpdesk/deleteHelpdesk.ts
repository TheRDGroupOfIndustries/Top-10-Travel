"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
export const deleteHelpdesk = async (id: string) => {
  try {
    await db.helpDesk.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/helpdesk`);
    return { success: "helpdesk Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
