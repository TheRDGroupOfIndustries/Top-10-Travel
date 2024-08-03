import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import { db } from "@/core/client/db";
import HotelHeroImg from "@/resources/images/Hotels-Hero.png";
import { redirect } from "next/navigation";

// cache the page for one hour for ISR
export const revalidate = 3600;

const Page = async () => {
  const allAgencies = await db.company.findMany({
    where: {
      companyRole: "AGENCY",
      // isCertified: true,
      isSuspended: false,
    },
    select: {
      id: true,
      legalName: true,
      image: true,
      state: true,
      country: true,
      methodology: true,
      rating: true,
      reviews: true,
    },
    orderBy: { priority: "desc" },
  });

  return (
    <div>
      <ExploreMore
        isLoading={allAgencies ? false : true}
        data={allAgencies}
        role="AGENCY"
      />
    </div>
  );
};
export default Page;
