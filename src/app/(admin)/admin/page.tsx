import AdminDashboard from "@/components/admin/Main/Admin_Dashboard";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";
const Dashboard = unstable_cache(
  async () => {
    const user:number = await db.user.count();
    const company:number = await db.company.count();
    const inflelance:number = await db.influencerData.count()
    return {user,company,inflelance};
  },
  undefined,
  { tags: ["admin-dashboard"] }
);
async function Page() {

  const {user,company,inflelance}= await Dashboard();
  return(<div>
<AdminDashboard company={company} user={user} influencer={inflelance}/>
  </div> 
  );
}

export default Page;
