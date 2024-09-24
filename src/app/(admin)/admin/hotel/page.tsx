import AdminPackagelisting from "@/components/admin/Main/Admin_Package_listing";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";

const getAllListing = unstable_cache(
  async () => {
    const data = await db.hotel.findMany({
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
      },
    });
    return data.map((d) => ({ ...d, type: "Hotel" }));
  },
  undefined,
  { revalidate: 300, tags: ["admin-hotel"] }
);

async function Page() {
  const listings = await getAllListing();

  return (
    <AdminPackagelisting
      listings={listings}
      type="Hotel"
    />
  );
}

export default Page;
