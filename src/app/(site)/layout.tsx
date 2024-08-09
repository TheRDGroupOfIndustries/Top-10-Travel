import Footer from "@/components/site/Home/Footer/Footer";
import Navbar from "@/components/site/Home/Navbar";
import { ModalProvider } from "@/components/ui/animated-modal";
import { Toaster } from "sonner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ModalProvider>
        <Navbar />
        <Toaster richColors />
        {children}
        <Footer />
      </ModalProvider>
    </main>
  );
}
