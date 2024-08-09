import AdminDashboard from "@/components/admin/Main/Admin_Dashboard";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";
const dashboardData = unstable_cache(
  async () => {
    const [user, company, influencer] = await Promise.all([
      db.user.count(),
      db.company.count(),
      db.influencerData.count(),
    ]);
    return { user, company, influencer };
  },
  undefined,
  { tags: ["admin-dashboard"] }
);
async function Page() {
  const { user, company, influencer } = await dashboardData();
  return (
    <div>
      <AdminDashboard
        company={company}
        user={user}
        influencer={influencer}
      />
    </div>
  );
}

export default Page;
