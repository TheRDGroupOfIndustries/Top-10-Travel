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

export const SocialMediaLinksSchema = z.object({
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  youtube: z.string().url().optional(),
});

export const AgencySchema = z.object({
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
      (fileList: any) => fileList && fileList[0],
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB max file size
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      // Check for PDF file type
      message: "Only PDF files are allowed",
    }),
  insuranceCertificateUpload: z
    .preprocess(
      (fileList: any) => fileList && fileList[0],
      z.instanceof(File, { message: "Invalid Input or file missing" })
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB max file size
      message: "File size should be less than 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      // Check for PDF file type
      message: "Only PDF files are allowed",
    }),
  primaryServices: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one"),
  specializedTravelTypes: z
    .array(z.string().min(1, "Required"))
    .min(1, "Select At least one"),
  regionsOfOperation: z
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
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      // 5MB max file size
      message: "File size should be less than 5MB",
    })
    .refine((file) => !file || file.type === "application/pdf", {
      // Check for PDF file type
      message: "Only PDF files are allowed",
    }),
  socialMediaLinks: z.array(SocialMediaLinksSchema),
  promotionalVideoUpload: z.string().url(),
  images: z.array(z.string().url()),
  description: z.string().min(10, "Description Must be at least 10 characters"),
});
