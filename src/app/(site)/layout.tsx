import Footer from "@/components/site/Home/Footer/Footer";
import Navbar from "@/components/site/Home/Navbar";
import FooterNav from "@/components/site/Home/FooterNav";
import { ModalProvider } from "@/components/ui/animated-modal";
import { Toaster } from "sonner";
import { HomeContextProvider } from "@/hooks/context/HomeContext";
import Loader from "@/components/customUI/Loader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <HomeContextProvider>
        <ModalProvider>
          {/* <Loader /> */}
          <Navbar />
          <Toaster richColors />
          {children}
          <Footer />
          <FooterNav/>
        </ModalProvider>
      </HomeContextProvider>
    </main>
  );
}
