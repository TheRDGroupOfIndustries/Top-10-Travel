import { DmcSchema } from "@/components/dmc/dmcSchema";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { uploadFile, uploadFileDefault } from "../../cloudinary/cloudinary";

const uploadFiles = async (
  userId: string,
  businessLicenseUpload: File | null,
  insuranceCertificateUpload: File | null,
  images: File
) => {
  const uploadPromises: Promise<any>[] = [];
  const imageBufferPromise = images.arrayBuffer();

  if (businessLicenseUpload) {
    const businessBufferPromise = businessLicenseUpload.arrayBuffer();
    uploadPromises.push(
      businessBufferPromise.then((buffer) =>
        uploadFile(Buffer.from(buffer), `dmc-${userId}-businessLicense`)
      )
    );
  }

  if (insuranceCertificateUpload) {
    const insuranceBufferPromise = insuranceCertificateUpload.arrayBuffer();
    uploadPromises.push(
      insuranceBufferPromise.then((buffer) =>
        uploadFile(Buffer.from(buffer), `dmc-${userId}-insurance`)
      )
    );
  }

  const imagesBuffer = await imageBufferPromise;
  uploadPromises.push(uploadFileDefault(Buffer.from(imagesBuffer)));

  const uploadResults = await Promise.all(uploadPromises);
  const businessUrl = businessLicenseUpload
    ? uploadResults[0].secure_url
    : null;
  const insuranceUrl = insuranceCertificateUpload
    ? uploadResults[1].secure_url
    : null;
  const imageUrl = uploadResults[uploadResults.length - 1].secure_url;

  console.log("Files uploaded");
  return {
    businessUrl,
    insuranceUrl,
    imageUrl,
  };
};

export const createDmcAction = async ({
  values,
  formData,
}: {
  values: any; // Adjust this type according to your schema
  formData: FormData;
}) => {
  const session = await getSessionorRedirect();
  const { success, data, error } = DmcSchema.partial({
    businessLicenseUpload: true,
    insuranceCertificateUpload: true,
    images: true,
  }).safeParse(values);

  if (!success) return { error: "Something went wrong!" };

  try {
    const { businessUrl, insuranceUrl, imageUrl } = await uploadFiles(
      session.user.id,
      formData.get("businessLicenseUpload") as File | null,
      formData.get("insuranceCertificateUpload") as File | null,
      formData.get("images") as File
    );

    await db.dMC.create({
      data: {
        ...data,
        businessLicenseUpload: businessUrl,
        insuranceCertificateUpload: insuranceUrl,
        images: [imageUrl],
        User: { connect: { id: session.user.id } },
        keyPersonnel: { create: data.keyPersonnel },
        pastProjects: { create: data.pastProjects },
        clientReferences: { create: data.clientReferences },
        socialMediaLinks: { create: data.socialMediaLinks },
        caseStudyPdf: undefined,
      },
    });
    return { success: "DMC created Successfully" };
  } catch (error: any) {
    console.log("Error creating DMC: ", error.message);
    return { error: "Error creating DMC" };
  }
};
