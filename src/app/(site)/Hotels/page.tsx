import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import { db } from "@/core/client/db";
import HotelHeroImg from "@/resources/images/Hotels-Hero.png";
import { redirect } from "next/navigation";

// cache the page for one hour for ISR
export const revalidate = 3600;

const Page = async () => {
  const allHotels = await db.hotel.findMany({
    where: {
      isCertified: true,
      priority: {
        gt: 0,  // Filters agencies where priority is greater than 0
      },
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
      services: true,
      specialization: true,
    },

    orderBy: { priority: "asc" },
  });
  return <ExploreMore role={"Hotels"} data={allHotels} />;
};
export default Page;
