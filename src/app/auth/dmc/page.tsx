import DmcForm from "@/components/dmc/DmcForm";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { redirect } from "next/navigation";

const AgencyLoginPage = async () => {
  const session = await getSessionorRedirect();

  if (session.user.role === "USER" || session.user.role === "Influencer") {
    const agency = await db.dMC.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (agency) return redirect(`/dashboard/dmc`);
  }

  return <DmcForm />;
};
export default AgencyLoginPage;
