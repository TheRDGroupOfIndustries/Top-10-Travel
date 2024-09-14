import CompanyHeader from "@/components/dashboard/CompanyHeader";
import AgencySidebar from "./sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { db } from "@/core/client/db";

const things = async (userId: string) => {
  const apr = db.agency.findUnique({ where: { userId }, select: { id: true } });
  const dpr = db.dMC.findUnique({ where: { userId }, select: { id: true } });
  const hpr = db.hotel.findUnique({ where: { userId }, select: { id: true } });
  const [agency, dmc, hotel] = await Promise.all([apr, dpr, hpr]);
  return { agency, dmc, hotel };
};
export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionorRedirect();
  const { agency, dmc, hotel } = await things(session.user.id);

  return (
    <main className="bg-white min-h-screen w-full">
      <Toaster richColors />

      <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-2 min-h-screen hidden xl:block">
          <AgencySidebar agency={!!agency} dmc={!!dmc} hotel={!!hotel} />
        </div>
        <div className="xl:col-span-10 col-span-12 p-2 xl:pl-0 mx-1 lg:mx-8">
          <CompanyHeader />
          {children}
        </div>
      </div>
    </main>
  );
}
