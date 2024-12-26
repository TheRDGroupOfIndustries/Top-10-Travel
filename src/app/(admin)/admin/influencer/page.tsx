import Admin_Influencer_Listing from "@/components/admin/Main/Admin_Influencer_Listing";
import { db } from "@/core/client/db";


const getAllListing = async () => {
  return await db.influencerData.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        state: true,
        country: true,
        priority: true,
        state_priority: true,
        isCertified: true,
        userId: true,
        speciality: true,
      },
  })
}

async function Page() {
  const listings = await getAllListing();

  return <Admin_Influencer_Listing listings={listings} />;
}

export default Page;
