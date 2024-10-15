import Certification from "./Section/GetCertification/certification";
import Influencers from "./Section/Influencers";
import TopTenAgencies from "./Section/NewDesign/TopTenAgencies";
import TopTenDMC from "./Section/NewDesign/TopTenDMC";
import TopTenHotels from "./Section/NewDesign/TopTenHotels";
import { HomeContextProvider } from "@/hooks/context/HomeContext";
import HomeHero from "./Home_Hero";
import AboutusComp from "@/components/site/Aboutus/AboutusComp";

function HomePage() {
  return (
    <HomeContextProvider>
      <HomeHero />
      {/* mt-20 sm:mt-16 md:mt-36 xl:mt-16  */}
      <div className="space-y-6 md:mt-20 overflow-x-hidden">
        <AboutusComp />
        <TopTenAgencies />
        <TopTenHotels />
        <TopTenDMC />
        <Influencers />
        <Certification />
      </div>
    </HomeContextProvider>
  );
}

export default HomePage;
