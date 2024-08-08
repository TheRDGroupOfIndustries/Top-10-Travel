import CompanyHeader from "@/components/companydashboard/CompanyHeader";
import CompanySidebar from "@/components/companydashboard/CompanySidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import getServersession from "@/core/utils/getServerSession";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionorRedirect();
  // if (!session || session.user.role !== "COMPANY") return redirect("/");
  return (
    <main className="bg-[#FFDB80] h-screen w-full">
      <ThemeProvider attribute="class" defaultTheme="system">
        <Toaster richColors />

        <div className="w-full h-screen grid grid-cols-12">
          <div className="col-span-2 hidden xl:block">
            <CompanySidebar />
          </div>
          <div className="xl:col-span-10 col-span-12 p-2 xl:pl-0">
            {/* <ScrollArea className="w-full h-[97vh] bg-background text-foreground rounded-xl px-4"> */}
            <CompanyHeader />
            {children}
            {/* </ScrollArea> */}
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
