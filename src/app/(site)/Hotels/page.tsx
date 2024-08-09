import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import { db } from "@/core/client/db";
import HotelHeroImg from "@/resources/images/Hotels-Hero.png";
import { redirect } from "next/navigation";

// cache the page for one hour for ISR
export const revalidate = 3600;

const Page = async () => {
  const allHotels = await db.company.findMany({
    where: {
      companyRole: "HOTEL",
      isCertified: true,
      isSuspended: false,
    },
    select: {
      id: true,
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
      isLoading={allHotels ? false : true}
      role={"HOTEL"}
      data={allHotels}
    />
  );
};
export default Page;
