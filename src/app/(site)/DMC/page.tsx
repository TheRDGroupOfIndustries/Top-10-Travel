import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import { db } from "@/core/client/db";

// cache the page for one hour for ISR
export const revalidate = 3600;

const Page = async () => {
  // fetch all the DMC information
  const allDMCS = await db.dMC.findMany({
    where: {
      isCertified: true,
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
    },
    orderBy: { priority: "asc" },
  });

  return <ExploreMore data={allDMCS} role={"DMC"} />;
};
export default Page;
