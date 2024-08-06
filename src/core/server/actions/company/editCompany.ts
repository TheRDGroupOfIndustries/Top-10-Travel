"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const editCompanyActionAdmin = async (
  values: Pick<
    Company,
    | "companyRole"
    | "isCertified"
    | "isSuspended"
    | "legalName"
    | "priority"
    | "state_priority"
  > & { id: string }
) => {
  const session = await getSessionorRedirect();
  if (session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }
  try {
    const res = await db.company.update({
      where: { id: values.id },
      data: { ...values },
      select: { id: true },
    });
    revalidatePath("/admin/listings");
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while applying changes." };
  }
};
export const editCompanyAction = async (
  values: Partial<
    Pick<Company, "legalName" | "city" | "country" | "state" | "methodology">
  >
) => {
  const session = await getSessionorRedirect();
  const keys = Object.keys(values);
  keys.forEach((key) => {
    // @ts-expect-error
    if (values[key]?.trim().length < 3) {
      return { error: `${key} must be atleast 3 characters.` };
    }
  });

  try {
    const res = await db.company.update({
      where: { userId: session.user.id },
      data: { ...values },
      select: { id: true },
    });
    revalidateTag("company-dashboard");
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while applying changes." };
  }
};
