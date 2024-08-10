import AdminHeader from "@/components/admin/Main/Admin_Header";
import AdminSidebar from "@/components/admin/SideBar/Admin_Sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full">
      <ThemeProvider attribute="class" defaultTheme="light">
        <Toaster richColors />

        <div className="w-full h-full relative">
          <div className="left-0 top-0 z-[999] fixed min-h-screen hidden xl:block">
            <AdminSidebar />
          </div>

          <div className="relative">
            <div className="xl:ml-[19vw] xl:w-[80vw] w-[99vw] p-1">
              <AdminHeader />
              {children}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
