import Details from "@/components/site/Details/Details";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const DMCPage = async ({ params }: { params: { dmcId: string } }) => {
  const dmc = await db.dMC.findUnique({
    where: {
      id: params.dmcId,
      isCertified: true,
    },
    select: {
      id: true,
      country: true,
      city: true,
      images: true,
      methodology: true,
      name: true,
      reviews: true,
      rating: true,
      description: true,
      address: true,
      contactPhoneNumber: true,
      socialMediaLinks: true,
      internationalCertifications: true,
      specialization: true,
      coreServices: true,
      // promotionalVideoUpload: true,
      pastProjects: true,
      // companyData: {
      //   select: {
      //     description: true,
      //     images: true,
      //     pincode: true,
      //     address: true,
      //     phone: true,
      //     socialLinks: true,
      //   },
      // },
    },
  });

  if (!dmc) return notFound();
  // console.log(company);

  return (
    <div>
      <Details data={dmc} info={{ type: "Dmc", dmcId: dmc.id, dmcName: dmc.name }} />
    </div>
  );
};

export default DMCPage;
