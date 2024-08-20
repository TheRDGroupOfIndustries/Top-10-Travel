import InfluencerDetails from "@/components/site/Details/InfluencerDetails";
import { db } from "@/core/client/db";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { influencerId: string } }) => {
  const inf = await db.influencerData.findUnique({
    where: { id: params.influencerId },
  });

  if (!inf) return notFound();

  return <InfluencerDetails data={inf} />;
};

export default page;
