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
      address: true,
      socialMediaLinks: true,
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
      <Details data={agency} />
    </div>
  );
};

export default AgencyPage;
