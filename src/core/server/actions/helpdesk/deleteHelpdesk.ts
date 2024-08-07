"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
export const deleteHelpdesk = async (id: string) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };
  try {
    await db.helpDesk.delete({
      where: {
        id,
      },
    });
    revalidateTag("admin-helpdesk");
    return { success: "helpdesk Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
