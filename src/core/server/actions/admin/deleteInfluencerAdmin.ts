"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import { Prisma } from "@prisma/client";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const deleteInfluencerAdminAction = async ({
  id,
}: {
  id: string;
}) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };

  try {
    await db.influencerData.delete({where:{id}})
    revalidateTag("admin-influencer");

    return { success: "Influencer Deleted Successfully." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return {
          error: "Influencer not found. It may have been already deleted.",
        };
      }
    }
    console.error("Error deleting influencer:", error);
    return { error: "Something went wrong while deleting the influencer." };
  }
};
