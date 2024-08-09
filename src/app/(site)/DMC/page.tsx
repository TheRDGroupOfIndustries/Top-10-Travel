import DMCPage from "@/components/site/DmcPage/DMCPage";
import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import AgencyHeroImg from "@/resources/images/Agency-Hero.png";
import { db } from "@/core/client/db";

// cache the page for one hour for ISR
export const revalidate = 3600;

const Page = async () => {
  // fetch all the DMC information
  const allDMCS = await db.company.findMany({
    where: {
      companyRole: "DMC",
      isCertified: true,
      isSuspended: false,
    },
    select: {
      id:true,
      legalName: true,
      image: true,
      city: true,
      country: true,
      methodology: true,
      rating: true,
      reviews: true,
    },
    orderBy: { priority: "desc" },
  });

  return (
    <ExploreMore
      isLoading={allDMCS ? false : true}
      data={allDMCS}
      role={"DMC"}
    />
  );
};
export default Page;
