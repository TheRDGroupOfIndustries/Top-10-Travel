"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/client/db";
import { Prisma } from "@prisma/client";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

export const deleteCompany = async (id: string) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };
  try {
    const deletedCompany = await db.company.delete({
      where: {
        id,
      },
    });
    
    revalidatePath(`/admin/listings`);
    return { success: "Company Deleted Successfully." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { error: "Company not found. It may have been already deleted." };
      }
    }
    console.error("Error deleting company:", error);
    return { error: "Something went wrong while deleting the company." };
  }
};
