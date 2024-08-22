"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
export const deleteReviewAction = async (id: string) => {
  const session = await getSessionorRedirect();
  try {
    await db.reviews.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/reviews`);
    return { success: "reviews Deleted Succesfully." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
