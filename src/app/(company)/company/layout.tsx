import CompanyHeader from "@/components/companydashboard/CompanyHeader";
import CompanySidebar from "@/components/companydashboard/CompanySidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#FCAF1E] min-h-screen w-full">
      <ThemeProvider attribute="class" defaultTheme="light">
        <Toaster richColors />

        <div className="w-full h-full grid grid-cols-12">
          <div className=" min-h-screen hidden lg:block lg:col-span-3 xl:col-span-2">
            <CompanySidebar />
          </div>
          <div className="lg:col-span-9 xl:col-span-10 col-span-12 p-2 ">
            <CompanyHeader />
            {children}
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
