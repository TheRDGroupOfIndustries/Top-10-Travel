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
        businessLicenseUpload: true,
        insuranceCertificateUpload: true,
        priority: true,
        city_priority: true,
        isCertified: true,
        userId: true,
        methodology: true,
        tags: true,
      },
    });

    return data.map((d) => ({ ...d, type: "Agency" }));
  },
  undefined,
  { revalidate: 300, tags: ["admin-agency"] }
);

const getTags = unstable_cache(
  async () => {
    return await db.tags.findMany({
      select: {
        id: true,
        name: true,
        url: true,
      },
    });
  },
  undefined,
  { revalidate: 300, tags: ["tags"] }
);

async function Page() {
  const listings = await getAllListing();
  const allTags = await getTags();
  return (
    <AdminPackagelisting
      listings={listings.map((d) => ({ ...d, allTags }))}
      type="Agency"
    />
  );
}

export default Page;
