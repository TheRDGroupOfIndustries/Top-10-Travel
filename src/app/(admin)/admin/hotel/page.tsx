import AdminPackagelisting from "@/components/admin/Main/Admin_Package_listing";
import { db } from "@/core/client/db";

const getAllListing = async () => {
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
      tags: true,
    },
  });
  return data.map((d) => ({ ...d, type: "Hotel" }));
};

const getTags = async () => {
  return await db.tags.findMany({
    select: {
      id: true,
      name: true,
      url: true,
    },
  });
};

async function Page() {
  const listings = await getAllListing();
  const allTags = await getTags();
  return (
    <AdminPackagelisting
      listings={listings.map((d) => ({ ...d, allTags }))}
      type="Hotel"
    />
  );
}

export default Page;
