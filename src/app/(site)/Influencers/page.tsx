import ExploreMore from "@/components/site/Explore/ExploreMorePage";
import InfluencerExploreMore from "@/components/site/Explore/InfluencerExplorepage";
import { db } from "@/core/client/db";
import HotelHeroImg from "@/resources/images/Hotels-Hero.png";
import { redirect } from "next/navigation";


const Page = async () => {
  const allInf = await db.influencerData.findMany({
    where: {
      isCertified: true,
    },
    select: {
      id: true,
      name: true,
      image: true,
      state: true,
      state_priority: true,
      country: true,
      description: true,
      speciality: true,
    },
    orderBy: { priority: "desc" },
  });

  return <InfluencerExploreMore data={allInf} />;
};
export default Page;
