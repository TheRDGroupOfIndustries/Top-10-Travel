import Details from "@/components/site/Details/Details";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

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

  if (!dmc) return notFound();
  // console.log(company);

  return (
    <div>
      <Details data={dmc} />
    </div>
  );
};

export default DMCPage;
