"use server";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Company } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/admin/package-listings");
    return { success: "Company edited successfully.", companyId: res.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while applying changes." };
  }
};
// export const editCompanyAction = async (
//   values: Pick<
//     Company,
//     | "companyRole"
//     | "isCertified"
//     | "isSuspended"
//     | "legalName"
//     | "priority"
//     | "state_priority"
//   > & { id: string }
// ) => {
//   const session = await getSessionorRedirect();

//   try {
//     const res = await db.company.update({
//       where: { id: values.id, userId:session.user.id },
//       data: { ...values },
//       select: { id: true },
//     });
//     return { success: "Company edited successfully.", companyId: res.id };
//   } catch (error) {
//     console.log(error);
//     return { error: "Something went wrong while applying changes." };
//   }
// };
