import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import HotelExploreMorePage from "@/components/site/Explore/HotelExploreMorePage";
import { db } from "@/core/client/db";
import HotelHeroImg from "@/resources/images/Hotels-Hero.png";
import { redirect } from "next/navigation";

// cache the page for one hour for ISR
// export const revalidate = 3600;
export const dynamic = "force-dynamic";

const Page = async () => {
  const allHotels = await db.hotel.findMany({
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
      city_priority: true,
      country: true,
      methodology: true,
      rating: true,
      reviews: true,
      services: true,
      specialization: true,
      tags: true,
    },

    orderBy: { city_priority: "asc" },
  });
  return <HotelExploreMorePage role={"Hotel"} data={allHotels} />;
};
export default Page;
