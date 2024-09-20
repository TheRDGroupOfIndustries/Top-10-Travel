import { z } from "zod";

export const KeyPersonnelSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  position: z.string().min(1, { message: "Required" }),
  yearsOfExperience: z.number().min(0, "Invalid value"),
  specialization: z.string().min(1, { message: "Required" }),
});

export const PastProjectSchema = z.object({
  projectName: z.string().min(1, { message: "Required" }),
  clientName: z.string().min(1, { message: "Required" }),
  year: z
    .number()
    .min(1900, "Invalid Year")
    .max(new Date().getFullYear() + 1, "Invalid Year"),
  description: z.string().min(1, { message: "Required" }),
});

export const ClientReferenceSchema = z.object({
  clientName: z.string().min(1, { message: "Required" }),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(10).max(12),
  testimonial: z.string().min(1, { message: "Required" }),
});

export const SocialMediaLinksSchema = z
  .object({
    facebook: z.union([z.literal(""), z.string().trim().url()]).optional(),
    instagram: z.union([z.literal(""), z.string().trim().url()]).optional(),
    linkedin: z.union([z.literal(""), z.string().trim().url()]).optional(),
    twitter: z.union([z.literal(""), z.string().trim().url()]).optional(),
    youtube: z.union([z.literal(""), z.string().trim().url()]).optional(),
  })
  .refine(
    (data) =>
      data.facebook !== "" ||
      data.instagram !== "" ||
      data.linkedin !== "" ||
      data.twitter !== "" ||
      data.youtube !== "",
    {
      message: "At least one social media link must be provided",
      path: [], // Specify which path to attach the error to, or leave it empty to attach to the root
    }
  );

export const AgencySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  country: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  address: z.string().min(10, "Address must be at least 10 characters"),
  contactPerson: z.string().min(1, { message: "Required" }),
  contactEmail: z.string().email(),
  contactPhoneNumber: z.string().min(10).max(12),
  websiteUrl: z.string().optional(),

  companyRegistrationNumber: z.string().min(1, { message: "Required" }),
  yearOfEstablishment: z.coerce
    .number()
    .min(1800, "Invalid year")
    .max(new Date().getFullYear(), "Invalid Year"),

  businessLicenseUpload: z
    .preprocess(
      (File: any) => File,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .optional(),

  insuranceCertificateUpload: z
    .preprocess(
      (fileList: any) => fileList,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .optional(),

  primaryServices: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select at least one"),
  specializedTravelTypes: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select at least one"),
  regionsOfOperation: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select at least one")
    .max(10, "Max 10 regions allowed."),
  internationalCertifications: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select at least one"),
  memberships: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select at least one"),

  numberOfEmployees: z.coerce.number().min(1, "Invalid number of employees"),

  keyPersonnel: z.array(KeyPersonnelSchema).optional(), // Made optional
  pastProjects: z.array(PastProjectSchema).optional(), // Made optional
  clientReferences: z.array(ClientReferenceSchema).optional(), // Made optional

  caseStudyPdf: z
    .preprocess(
      (fileList: any) => fileList,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine((file) => !file || file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),

  socialMediaLinks: SocialMediaLinksSchema,

  images: z
    .preprocess(
      (fileList: any) => fileList,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "File size should be less than 2MB",
    })
    .refine((file) => file.type.includes("image"), {
      message: "Only image files are allowed",
    }),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters."),
});

// updated - agency validation :
// import { z } from "zod";

// export const KeyPersonnelSchema = z.object({
//   name: z.string().optional(),
//   // .min(1, { message: "Required" }),
//   position: z.string().optional(),
//   // .min(1, { message: "Required" }),
//   yearsOfExperience: z.number().optional(),
//   // .min(0, "Invalid value"),
//   specialization: z.string().optional(),
//   // .min(1, { message: "Required" }),
// });
// export const PastProjectSchema = z.object({
//   projectName: z.string().optional(),
//   // .min(1, { message: "Required" }),
//   clientName: z.string().optional(),
//   // .min(1, { message: "Required" }),
//   year: z
//     .number()
//     .max(new Date().getFullYear() + 1, "Invalid Year")
//     .optional(),
//   // .min(1900, "Invalid Year")
//   description: z.string().optional(),
//   // .min(1, { message: "Required" }),
// });
// export const ClientReferenceSchema = z
//   .object({
//     clientName: z.string().optional(),
//     // .min(1, { message: "Required" }),
//     contactEmail: z.string().email().optional().or(z.literal("")),
//     contactPhone: z.string().optional(),
//     // .min(10).max(12),
//     testimonial: z.string().optional(),
//     // .min(1, { message: "Required" }),
//   })
//   .optional();

// export const SocialMediaLinksSchema = z.object({
//   facebook: z.union([z.literal(""), z.string().trim().url()]).optional(),
//   instagram: z.union([z.literal(""), z.string().trim().url()]).optional(),
//   linkedin: z.union([z.literal(""), z.string().trim().url()]).optional(),
//   twitter: z.union([z.literal(""), z.string().trim().url()]).optional(),
//   youtube: z.union([z.literal(""), z.string().trim().url()]).optional(),
// });

// export const AgencySchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   country: z.string().min(1, { message: "Required" }),
//   city: z.string().min(1, { message: "Required" }),
//   address: z.string().min(10, "Address must be at least 10 characters"),
//   contactPerson: z.string().min(1, { message: "Required" }),
//   contactEmail: z.string().email(),
//   contactPhoneNumber: z.string().min(10).max(12),
//   websiteUrl: z.string().optional(), // Optional

//   companyRegistrationNumber: z.string().optional(),
//   // .min(1, { message: "Required" })
//   yearOfEstablishment: z.coerce
//     .number()
//     .max(new Date().getFullYear(), "Invalid Year")
//     .optional(),
//   // .min(1800, "Invalid year")
//   businessLicenseUpload: z
//     .preprocess(
//       (File: any) => File,
//       z.instanceof(File, { message: "Invalid Input or file missing" })
//     )
//     .refine((file) => file.size <= 5 * 1024 * 1024, {
//       // 5MB max file size
//       message: "File size should be less than 5MB",
//     })
//     .refine((file) => file.type === "application/pdf", {
//       // Check for PDF file type
//       message: "Only PDF files are allowed",
//     })
//     .optional(),
//   insuranceCertificateUpload: z
//     .preprocess(
//       (fileList: any) => fileList,
//       z.instanceof(File, { message: "Invalid Input or file missing" })
//     )
//     .refine((file) => file.size <= 5 * 1024 * 1024, {
//       // 5MB max file size
//       message: "File size should be less than 5MB",
//     })
//     .refine((file) => file.type === "application/pdf", {
//       // Check for PDF file type
//       message: "Only PDF files are allowed",
//     })
//     .optional(),
//   primaryServices: z.array(z.string().min(1, "Required")).optional(),
//   // .min(1, "Select At least one")
//   specializedTravelTypes: z.array(z.string().min(1, "Required")).optional(),
//   // .min(1, "Select At least one")
//   regionsOfOperation: z
//     .array(z.string().min(1, "Required"))
//     .max(10, "Max 10 regions allowed.")
//     .optional(),
//   // .min(1, "Select At least one")
//   internationalCertifications: z
//     .array(z.string().min(1, "Required"))
//     .optional(),
//   // .min(1, "Select At least one")
//   memberships: z.array(z.string().min(1, "Required")).optional(),
//   // .min(1, "Select At least one")
//   numberOfEmployees: z.coerce.number().optional(),
//   // .min(1, "Invalid number of employees")
//   keyPersonnel: z.array(KeyPersonnelSchema).optional(),
//   // .min(1, "Select at least one.")
//   pastProjects: z.array(PastProjectSchema).optional(),
//   // .min(1, "Select at least one.")
//   clientReferences: z.array(ClientReferenceSchema).optional(),
//   // .min(1, "Select at least one.")
//   caseStudyPdf: z
//     .preprocess(
//       (fileList: any) => fileList,
//       z.instanceof(File, { message: "Invalid Input or file missing" })
//     )
//     .optional()
//     .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
//       // 5MB max file size
//       message: "File size should be less than 5MB",
//     })
//     .refine((file) => !file || file.type === "application/pdf", {
//       // Check for PDF file type
//       message: "Only PDF files are allowed",
//     })
//     .optional(),
//   socialMediaLinks: SocialMediaLinksSchema,
//   // promotionalVideoUpload: z.string().url().optional(),
//   images: z
//     .preprocess(
//       (fileList: any) => fileList,
//       z.instanceof(File, { message: "Invalid Input or file missing" })
//     )
//     .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
//       // 5MB max file size
//       message: "File size should be less than 2MB",
//     })
//     .refine((file) => file.type.includes("image"), {
//       // Check for PDF file type
//       message: "Only image files are allowed",
//     })
//     .optional(),
//   description: z
//     .string()
//     .min(10, "Description Must be at least 10 characters")
//     .max(500, "Description  cannot exceed 500 characters.")
//     .optional(),
// });
