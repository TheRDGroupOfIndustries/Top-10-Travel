import AgencyDashboard from "@/components/dashboard/agency/AgencyDashboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { notFound } from "next/navigation";

const dashboardData = async (userId: string) => {
  const agency = await db.agency.findUnique({
    where: { userId: userId },
    include: {
      socialMediaLinks: true,
      keyPersonnel: true,
      pastProjects: true,
      clientReferences: true,
    },
  });
  return { agency };
};

const getReviews = async (agencyId: string) => {
  return await db.reviews.findMany({
    where: { agencyId },
  });
};

const AgencyDashboardPage = async () => {
  const session = await getSessionorRedirect();
  const { agency } = await dashboardData(session?.user.id);
  if (!agency) return notFound();
  const reviews = await getReviews(agency.id);

  return (
    <AgencyDashboard
      reviews={reviews}
      data={agency}
    />
  );
};
export default AgencyDashboardPage;
