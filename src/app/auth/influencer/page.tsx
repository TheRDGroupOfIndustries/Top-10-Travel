import getServersession from "@/core/utils/getServerSession";
import { redirect } from "next/navigation";
import { db } from "@/core/client/db";
import InfluencerForm from "@/components/influencer/InfluencerForm";

const InfluencerAuthPage = async () => {
  const session = await getServersession();
  if (!session) return redirect("/auth");
  // const alreadyhaveData = await db.influencerData.findUnique({
  //   where: { userId: session.user.id },
  // });
  // if (alreadyhaveData) return redirect("/influencers/" + alreadyhaveData.id);

  return <InfluencerForm />;
};
export default InfluencerAuthPage;
