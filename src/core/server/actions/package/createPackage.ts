"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Package } from "@prisma/client";

export const createPackageAction = async (
  values: Omit<Package, "id" | "createdAt">
) => {
  const session = await getSessionorRedirect();
  try {
    const res = await db.package.create({
      data: { ...values },
      select: { id: true },
    });
    return { success: "Company created successfully.", packageId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create company." };
  }
};
