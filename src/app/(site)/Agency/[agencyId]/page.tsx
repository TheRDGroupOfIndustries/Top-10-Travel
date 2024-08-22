import Details from "@/components/site/Details/Details";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const AgencyPage = async ({ params }: { params: { agencyId: string } }) => {
  const agency = await db.agency.findUnique({
    where: {
      id: params.agencyId,
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
      contactPhoneNumber: true,
      address: true,
      socialMediaLinks: true,
      primaryServices: true,
      specializedTravelTypes: true,
      promotionalVideoUpload: true,
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

  if (!agency) return notFound();
  // console.log(company);

  return (
    <div>
      <Details data={agency} info={{ type: "Agency", agencyId: agency.id }} />
    </div>
  );
};

export default AgencyPage;
