// "use server";
// import { db } from "@/core/client/db";
// import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
// import { Package } from "@prisma/client";
// import { revalidatePath } from "next/cache";
// import sharp from "sharp";
// import { uploadImageDefaultName } from "../../cloudinary/cloudinary";

// export const createPackageAction = async ({
//   values,
//   form,
// }: {
//   values: Omit<Package, "id" | "createdAt" | "companyId" | "image">;
//   form: FormData;
// }) => {
//   const session = await getSessionorRedirect();
//   const company = await db.company.findUnique({
//     where: { userId: session.user.id },
//     select: { id: true, isSuspended: true },
//   });
//   if (!company)
//     return { error: "Can only create package for your own company." };

//   const file = form.get("file");
//   if (!file) return { error: "No file uploaded." };
//   if (
//     !(file instanceof File) ||
//     !(
//       file.type === "image/png" ||
//       file.type === "image/jpg" ||
//       file.type === "image/jpeg" ||
//       file.type === "image/svg"
//     )
//   ) {
//     return { error: "Invalid file type" };
//   }
//   const buffer = await file.arrayBuffer();
//   const resizedBuffer = await sharp(buffer).resize(500, 500).jpeg().toBuffer();

//   // @ts-expect-error
//   const imgSource: string = (await uploadImageDefaultName(resizedBuffer))
//     .secure_url;

//   if (!imgSource) {
//     return { error: "Error in uploading image! try again" };
//   }

//   try {
//     const count = await db.package.count({ where: { companyId: company.id } });
//     if (count >= 5) {
//       return {
//         error: "You have reached the maximum number of packages allowed.",
//       };
//     }
//     const res = await db.package.create({
//       data: { ...values, companyId: company.id, image: imgSource },
//       select: { id: true },
//     });
//     if (res) {
//       await db.company.update({
//         where: { id: company.id },
//         data: { isSuspended: false },
//       });
//     }
//     revalidatePath("/company/packages");
//     return { success: "Package created successfully.", packageId: res.id };
//   } catch (error: unknown) {
//     console.log(error);

//     // Check if it's a Prisma unique constraint error
//     if (error instanceof Error) {
//       if (error.message.includes("Unique constraint failed")) {
//         // Extract the field name from the error message
//         const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
//         const fieldName = fieldNameMatch ? fieldNameMatch[1] : "unknown field";

//         return {
//           error: `Failed to Create: A company with this ${fieldName} already exists.`,
//         };
//       }
//       return { error: `Failed to Create: ${error.message}` };
//     }

//     return { error: "Failed to Create: An unknown error occurred." };
//   }
// };
