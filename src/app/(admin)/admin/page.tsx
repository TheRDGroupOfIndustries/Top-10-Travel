import { AdminDashboard } from "@/components/admin/Main/Admin_Dashboard";
import { db } from "@/core/client/db";
import { revalidatePath, unstable_cache } from "next/cache";

const dashboardData = unstable_cache(
  async () => {
    const [user, agency, influencer, dmc, hotel, helpdesk, reviews] =
      await Promise.all([
        db.user.count(),
        db.agency.count(),
        db.influencerData.count(),
        db.dMC.count(),
        db.hotel.count(),
        db.helpDesk.count({ where: { status: "RESOLVED" } }),
        db.reviews.count(),
      ]);
    return { user, agency, influencer, dmc, hotel, helpdesk, reviews };
  },
  undefined,
  { tags: ["admin-dashboard"], revalidate: 300 }
);

async function Page() {
  const { user, agency, influencer, dmc, hotel, helpdesk, reviews } =
    await dashboardData();

  return (
    <div>
      <AdminDashboard
        agency={agency}
        user={user}
        influencer={influencer}
        hotel={hotel}
        dmc={dmc}
        helpdesk={helpdesk}
        reviews={reviews}
      />
    </div>
  );
}

export default Page;
