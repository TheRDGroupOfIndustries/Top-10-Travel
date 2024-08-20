import DmcForm from "@/components/dmc/DmcForm";
import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { redirect } from "next/navigation";

const AgencyLoginPage = async () => {
  const session = await getSessionorRedirect();
  const agency = await db.dMC.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (agency) return redirect(`/dashboard/dmc`);

  return <DmcForm />;
};
export default AgencyLoginPage;
