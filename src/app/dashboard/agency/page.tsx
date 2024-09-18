"use server";

import AgencyDashboard from "@/components/dashboard/agency/AgencyDashboard";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { notFound } from "next/navigation";
import DashboardForAdminAgency from "./DashboardForAdminAgency";

const oneAgencyData = async (userId: string) => {
  const agency = await db.agency.findFirst({
    where: { userId: userId },
    include: {
      socialMediaLinks: true,
      keyPersonnel: true,
      pastProjects: true,
      clientReferences: true,
      Reviews: true,
    },
  });
  return { agency };
};

const getAllAgenciesByAdmin = async () => {
  const agencies = await db.agency.findMany({
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
  return { agencies };
};

// const getReviewsOfOneAgency = async (agencyId: string) => {
//   return await db.reviews.findMany({
//     where: { agencyId },
//   });
// };

const AgencyDashboardPage = async () => {
  const session = await getSessionorRedirect();

  if (session.user.role === "USER" || session.user.role === "Influencer") {
    const { agency } = await oneAgencyData(session?.user.id);
    if (!agency) return notFound();

    return <AgencyDashboard reviews={agency.Reviews} data={agency} />;
  } else if (session.user.role === "ADMIN") {
    const { agencies } = await getAllAgenciesByAdmin();
    // const agenciesWithReviews = await Promise.all(
    //   agencies.map(async (agency) => {
    //     // const Reviews = await getReviewsOfOneAgency(agency.id);
    //     return {
    //       ...agency,
    //       //  Reviews
    //     };
    //   })
    // );

    return <DashboardForAdminAgency data={agencies} />;
  }
};
export default AgencyDashboardPage;
