import Admin_Influencer_Listing from "@/components/admin/Main/Admin_Influencer_Listing";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";

const getAllListing = unstable_cache(
  async () => {
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
    });
  }
  // undefined,
  // { revalidate: 300, tags: ["admin-influencer"] }
);

async function Page() {
  const listings = await getAllListing();

  return <Admin_Influencer_Listing listings={listings} />;
}

export default Page;
