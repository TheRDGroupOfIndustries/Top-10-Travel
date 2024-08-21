import CompanyHeader from "@/components/companydashboard/CompanyHeader";
import HotelSidebar from "./sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-white min-h-screen w-full">
      <Toaster richColors />

      <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-2 min-h-screen hidden xl:block">
          <HotelSidebar />
        </div>
        <div className="xl:col-span-10 col-span-12 p-2 xl:pl-0 mx-1 lg:mx-8">
          <CompanyHeader />
          {children}
        </div>
      </div>
    </main>
  );
}
