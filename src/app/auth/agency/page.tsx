import AgencyForm from "@/components/agency/AgencyForm";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { redirect } from "next/navigation";

const AgencyLoginPage = async () => {
  const session = await getSessionorRedirect();

  if (session.user.role === "USER" || session.user.role === "Influencer") {
    const agency = await db.agency.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (agency) return redirect(`/dashboard/agency`);
  }

  return <AgencyForm />;
};
export default AgencyLoginPage;
