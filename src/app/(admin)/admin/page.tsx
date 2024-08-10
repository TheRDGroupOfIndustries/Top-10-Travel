import { AdminDashboard } from "@/components/admin/Main/Admin_Dashboard";
import { db } from "@/core/client/db";
import { revalidatePath, unstable_cache } from "next/cache";
const dashboardData = unstable_cache(
  async () => {
    const [user, company, influencer, packages, helpdesk, reviews] =
      await Promise.all([
        db.user.count(),
        db.company.count(),
        db.influencerData.count(),
        db.package.count(),
        db.helpDesk.count({ where: { status: "RESOLVED" } }),
        db.reviews.count(),
      ]);
    return { user, company, influencer, packages, helpdesk, reviews };
  },
  undefined,
  { tags: ["admin-dashboard"], revalidate: 10 }
);
async function Page() {
  const { user, company, influencer, packages, helpdesk, reviews } =
    await dashboardData();
  return (
    <div>
      <AdminDashboard
        company={company}
        user={user}
        influencer={influencer}
        packages={packages}
        helpdesk={helpdesk}
        reviews={reviews}
      />
    </div>
  );
}

export default Page;
