import Footer from "@/components/site/Home/Footer/Footer";
import Navbar from "@/components/site/Home/Navbar";
import { Toaster } from "sonner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <Toaster richColors />

      {children}
      <Footer />
    </main>
  );
}
