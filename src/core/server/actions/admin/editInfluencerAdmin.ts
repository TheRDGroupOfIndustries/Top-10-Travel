"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import { Prisma } from "@prisma/client";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export type Company = {
  name: string;
  priority: number;
  isCertified: boolean;
  speciality: string;
  state_priority: number;
};

export const editInfluencerAdmin = async ({
  id,
  data,
}: {
  id: string;
  data: Company;
}) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };
  try {
    await db.influencerData.update({ where: { id }, data: { ...data } });

    revalidateTag("admin-influencer");

    return { success: "Influencer Updated Successfully." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return {
          error: "Company not found. It may have been already deleted.",
        };
      }
    }
    console.error("Error deleting company:", error);
    return { error: "Something went wrong while deleting the company." };
  }
};
