import AdminPackagelisting from "@/components/admin/Main/Admin_Package_listing";
import { db } from "@/core/client/db";

const getAllListing = async () => {
  return await db.company.findMany({
    select: {
      id:true,
      legalName: true,
      image: true,
      city: true,
      country: true,
      priority: true,
      state_priority: true,
      isCertified: true,
      isSuspended: true,
      companyRole: true,
      userId: true,
      methodology:true
    },
  });
};
export const revalidate = 300;

async function Page() {
  const listings = await getAllListing();

  return <AdminPackagelisting listings={listings} />;
}

export default Page;
