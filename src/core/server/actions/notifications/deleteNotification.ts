"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
export const deleteNotificationAction = async (
  id: string
) => {
  try {
      await db.notification.delete({
        where: {
          id,
        }
      });
      revalidatePath(`/dashboard/notification`);
      return { success: "notification Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
