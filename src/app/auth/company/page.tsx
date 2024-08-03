import MainForm from "@/components/company/FormSteps/MainForm";
import { db } from "@/core/client/db";
import getServersession from "@/core/utils/getServerSession";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServersession();
  if (!session) return redirect("/auth");
  const alreadyhaveCompany = await db.company.findUnique({
    where: { userId: session.user.id },
  });

  if (alreadyhaveCompany) return redirect("/company");
  return <MainForm />;
};
export default Page;
