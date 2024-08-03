import AdminHeader from "@/components/admin/Main/Admin_Header";
import AdminSidebar from "@/components/admin/SideBar/Admin_Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import getServersession from "@/core/utils/getServerSession";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServersession();
  // if (!session || session.user.role !== "ADMIN") return redirect("/");
  return (
    <main className="bg-[#FFDB80] h-screen w-full">
      <Toaster richColors />

      <div className="w-full h-full grid grid-cols-12 ">
        <div className="col-span-2 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="lg:col-span-10 col-span-12 p-2 lg:pl-0">
          <ScrollArea className="w-full h-[97vh] bg-white rounded-xl px-4">
            <AdminHeader />
            {children}
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
