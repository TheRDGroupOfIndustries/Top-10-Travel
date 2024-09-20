import { z } from "zod";
import { ClientReferenceSchema, KeyPersonnelSchema, PastProjectSchema, SocialMediaLinksSchema } from "../agency/agencySchema";

export const DmcSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
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
      // 5MB max file size
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      // Check for PDF file type
      message: "Only PDF files are allowed",
    }).optional(),
  insuranceCertificateUpload: z
    .preprocess(
      (fileList: any) => fileList,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB max file size
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      // Check for PDF file type
      message: "Only PDF files are allowed",
    }).optional(),
  coreServices: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one"),
    specialization: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one"),
    regionsCovered: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one")
    .max(10, "Max 10 regions allowed."),
  internationalCertifications: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one"),
  memberships: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one"),
  numberOfEmployees: z.coerce.number().min(1, "Invalid number of employees"),
  keyPersonnel: z.array(KeyPersonnelSchema).min(1, "Select at least one."),
  pastProjects: z.array(PastProjectSchema).min(1, "Select at least one."),
  clientReferences: z
    .array(ClientReferenceSchema)
    .min(1, "Select at least one."),
  caseStudyPdf: z
    .preprocess(
      (fileList: any) => fileList,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      // 5MB max file size
      message: "File size should be less than 5MB",
    })
    .refine((file) => !file || file.type === "application/pdf", {
      // Check for PDF file type
      message: "Only PDF files are allowed",
    }),
  socialMediaLinks: SocialMediaLinksSchema,
  // promotionalVideoUpload: z.string().url(),
  images: z
    .preprocess(
      (fileList: any) => fileList,
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      // 5MB max file size
      message: "File size should be less than 2MB",
    })
    .refine((file) => file.type.includes("image"), {
      // Check for PDF file type
      message: "Only image files are allowed",
    }),
  description: z.string().min(10, "Description Must be at least 10 characters").max(500, "Description  cannot exceed 500 characters."),
});
