import CompanyDashboard from "@/components/companydashboard/CompanyDashboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

const dashboardData = unstable_cache(
  async (userId: string) => {
    const company = await db.company.findUnique({ where: { userId: userId } });
    return { company };
  },
  undefined,
  { tags: ["company-dashboard"] }
);
const getReviews = async (companyId: string) => {
  return await db.reviews.findMany({
    where: { companyId },
  });
};
async function CompanyPage() {
  const session = await getSessionorRedirect();
  const { company } = await dashboardData(session?.user.id);
  if (!company) return notFound();
  const reviews = await getReviews(company.id);

  return (
    <CompanyDashboard
      reviews={reviews}
      data={company}
    />
  );
}

export default CompanyPage;
