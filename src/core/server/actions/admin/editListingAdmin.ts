"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/core/client/db";
import { Prisma } from "@prisma/client";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";

type Company = {
  isCertified: boolean;
  name: string;
  priority: number;
  city_priority: number;
  methodology: string | null;
};

export const editListingAdmin = async ({
  id,
  type,
  data,
}: {
  id: string;
  data: Company;
  type: "Agency" | "Dmc" | "Hotel";
}) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN")
    return { error: "Unauthorized! Admin only" };
  try {
    if (type === "Agency") {
      await db.agency.update({ where: { id }, data: { ...data } });
    } else if (type === "Dmc")
      await db.dMC.update({ where: { id }, data: { ...data } });
    else if (type === "Hotel")
      await db.hotel.update({ where: { id }, data: { ...data } });

    revalidateTag(`/admin/${type.toLowerCase()}`);
    return { success: type + " Updated Successfully." };
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
