import DmcDashboard from "@/components/dashboard/dmc/DmcDashboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { notFound } from "next/navigation";
import DashboardForAdminAgency from "./DashboardForAdminDmc";
import DashboardForAdminDmc from "./DashboardForAdminDmc";

const dashboardData = async (userId: string) => {
  const dmc = await db.dMC.findFirst({
    where: { userId: userId },
    include: {
      socialMediaLinks: true,
      keyPersonnel: true,
      pastProjects: true,
      clientReferences: true,
      Reviews: true,
    },
  });
  return { dmc };
};

const getAllDmcsByAdmin = async () => {
  const dmcs = await db.dMC.findMany({
    where: {
      User: {
        role: "ADMIN", // Filter by users with the 'ADMIN' role
      },
    },
    include: {
      socialMediaLinks: true,
      keyPersonnel: true,
      pastProjects: true,
      clientReferences: true,
      Reviews: true,
    },
  });
  return { dmcs };
};

// const getReviews = async (dmcId: string) => {
//   return await db.reviews.findMany({
//     where: { dmcId },
//   });
// };

const DmcDashboardPage = async () => {
  const session = await getSessionorRedirect();
  
  if (session.user.role === "USER" || session.user.role === "Influencer") {
    const { dmc } = await dashboardData(session?.user.id);
    if (!dmc) return notFound();

    return <DmcDashboard reviews={dmc.Reviews} data={dmc} />;
  } else if (session.user.role === "ADMIN") {
    const { dmcs } = await getAllDmcsByAdmin();

    return <DashboardForAdminDmc data={dmcs} />;
  }
};
export default DmcDashboardPage;
