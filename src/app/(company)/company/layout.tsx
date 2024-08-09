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
          <div className="col-span-2 min-h-screen hidden xl:block">
            <CompanySidebar />
          </div>
          <div className="xl:col-span-10 col-span-12 p-2 xl:pl-0">
            <CompanyHeader />
            {children}
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
