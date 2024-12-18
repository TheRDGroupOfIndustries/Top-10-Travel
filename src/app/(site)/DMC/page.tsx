import DMCExploreMorePage from "@/components/site/Explore/DMCExploreMorePage";
import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import { db } from "@/core/client/db";

// cache the page for one hour for ISR
// export const revalidate = 3600;

const Page = async () => {
  // fetch all the DMC information
  const allDMCS = await db.dMC.findMany({
    where: {
      isCertified: true,
      // priority: {
      //   gt: 0,  // Filters agencies where priority is greater than 0
      // },
    },
    select: {
      id: true,
      name: true,
      images: true,
      city: true,
      country: true,
      methodology: true,
      rating: true,
      reviews: true,
      tags: true,
      priority: true,
    },
    orderBy: { priority: "asc" },
  });

  return <DMCExploreMorePage data={allDMCS} role={"DMC"} />;
};
export default Page;
