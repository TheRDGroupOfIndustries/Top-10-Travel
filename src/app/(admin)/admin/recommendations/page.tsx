import AdminRecommendations from "@/components/admin/Main/Admin_Recommendations";
import { db } from "@/core/client/db";


export const dynamic = "force-dynamic";

const RecommendationsPage = async () => {

  const allNewRecommendationsList = await db.reviews.findMany({
    where: {
      approved: false
    }
  })
  
    return <AdminRecommendations data={allNewRecommendationsList}  />;
  };
  export default RecommendationsPage;