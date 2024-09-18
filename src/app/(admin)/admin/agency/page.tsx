import AdminPackagelisting from "@/components/admin/Main/Admin_Package_listing";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";

const getAllListing = unstable_cache(
  async () => {
    const data = await db.agency.findMany({
      select: {
        id: true,
        name: true,
        images: true,
        city: true,
        country: true,
        priority: true,
        city_priority: true,
        isCertified: true,
        userId: true,
        methodology: true,
      },
    });

    return data.map((d) => ({ ...d, type: "Agency" }));
  },
  undefined,
  { revalidate: 300, tags: ["admin-agency"] }
);

async function Page() {
  const listings = await getAllListing();

  return (
    
    <AdminPackagelisting
      listings={listings}
      type="Agency"
    />
  );
}

export default Page;
