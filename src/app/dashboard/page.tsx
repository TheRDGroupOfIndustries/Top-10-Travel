import { db } from "@/core/client/db";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSessionorRedirect();
  
  const agency = await db.agency.findFirst({
    where: { userId: session?.user.id },
  });
  const dmc = await db.dMC.findFirst({
    where: { userId: session?.user.id },
  });
  const hotel = await db.hotel.findFirst({
    where: { userId: session?.user.id },
  });

  if (agency) return redirect("/dashboard/agency");
  if (dmc) return redirect("/dashboard/dmc");
  if (hotel) return redirect("/dashboard/hotel");

  return redirect("/auth");
};

export default page;
