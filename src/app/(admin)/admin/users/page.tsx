import AdminUsers from "@/components/admin/Main/Admin_Users";
import { db } from "@/core/client/db";
import { unstable_cache } from "next/cache";

const getAllUsers = async () => {
  console.log("db call");
  return await db.user.findMany();
};

export const revalidate = 300;

async function Page() {
  const users = await getAllUsers();

  return (
    <div>
      <AdminUsers users={users} />
    </div>
  );
}

export default Page;
