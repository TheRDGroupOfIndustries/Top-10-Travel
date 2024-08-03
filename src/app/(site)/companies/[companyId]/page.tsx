import Details from "@/components/site/Details/Details";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const CompanyPage = async ({ params }: { params: { companyId: string } }) => {
  const company = await db.company.findUnique({
    where: {
      id: params.companyId,
      // isCertified: true,
      isSuspended: false,
    },
    select: {
      id: true,
      country: true,
      state: true,
      city:true,
      companyRole: true,
      image: true,
      methodology: true,
      legalName: true,
      reviews: true,
      rating: true,
      companyData: {
        select: {
          description: true,
          images: true,
          pincode: true,
          address: true,
          phone: true,
          socialLinks: true,
        },
      },
    },
  });

  if (!company) return notFound();
  // console.log(company);

  return (
    <div>
      <Details data={company} role={company.companyRole} />
    </div>
  );
};
export default CompanyPage;
