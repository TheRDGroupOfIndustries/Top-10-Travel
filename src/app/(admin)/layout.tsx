import AdminHeader from "@/components/admin/Main/Admin_Header";
import AdminSidebar from "@/components/admin/SideBar/Admin_Sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
// import { ScrollArea } from "@/components/ui/scroll-area";
import getSessionorRedirect from "@/core/utils/getSessionorRedirect";
import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionorRedirect();
  // if (!session || session.user.role !== "ADMIN") return redirect("/");

  return (
    <main className="bg-[#FFDB80] min-h-screen w-full">
      <ThemeProvider attribute="class" defaultTheme="system">
        <Toaster richColors />

        <div className="w-full h-full grid grid-cols-12 ">
          <div className="col-span-2 min-h-screen hidden lg:block">
            <AdminSidebar />
          </div>

          <div className="lg:col-span-10 col-span-12 p-2 lg:pl-0">
            {/* <ScrollArea className="w-full bg-background text-foreground rounded-xl px-4"> */}
            <AdminHeader />
            {children}
            {/* </ScrollArea> */}
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
