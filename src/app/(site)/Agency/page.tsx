import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import { db } from "@/core/client/db";
import HotelHeroImg from "@/resources/images/Hotels-Hero.png";
import { redirect } from "next/navigation";

// cache the page for one hour for ISR
export const revalidate = 3600;

const Page = async () => {
  const allAgencies = await db.agency.findMany({
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
    orderBy: { priority: "desc" },
  });

  return (
    <div>
      <ExploreMore data={allAgencies} role="Agency" />
    </div>
  );
};
export default Page;
