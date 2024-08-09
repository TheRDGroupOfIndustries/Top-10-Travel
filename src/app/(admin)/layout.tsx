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
    <main className="bg-[#FCAF1E] min-h-screen w-full">
      <ThemeProvider attribute="class" defaultTheme="light">
        <Toaster richColors />

        <div className="w-full h-full grid grid-cols-12 ">
          <div className="col-span-2 min-h-screen hidden xl:block">
            <AdminSidebar />
          </div>

          <div className="xl:col-span-10 col-span-12 p-2 xl:pl-0">
            <AdminHeader />
            {children}
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
