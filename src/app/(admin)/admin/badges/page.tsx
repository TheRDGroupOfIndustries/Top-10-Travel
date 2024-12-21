import Badge from "@/components/admin/Main/Admin_badge";
import { db } from "@/core/client/db";




const BadgePage = async () => {
    const data = await db.tags.findMany();

  
    return <Badge data={data} />;
  };
  export default BadgePage;