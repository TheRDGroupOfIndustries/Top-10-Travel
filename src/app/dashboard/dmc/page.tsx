import DmcDashboard from "@/components/dashboard/dmc/DmcDashboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { notFound } from "next/navigation";

const dashboardData = async (userId: string) => {
  const dmc = await db.dMC.findUnique({
    where: { userId: userId },
    include: { socialMediaLinks: true },
  });
  return { dmc };
};

const getReviews = async (dmcId: string) => {
  return await db.reviews.findMany({
    where: { dmcId },
  });
};

const DmcDashboardPage = async () => {
  const session = await getSessionorRedirect();
  const { dmc } = await dashboardData(session?.user.id);
  if (!dmc) return notFound();
  const reviews = await getReviews(dmc.id);

  return (
    <DmcDashboard
      reviews={reviews}
      data={dmc}
    />
  );
};
export default DmcDashboardPage;
