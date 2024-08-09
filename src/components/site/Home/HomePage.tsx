import Certification from "./Section/GetCertification/certification";
import Influencers from "./Section/Influencers";
import TopTenAgencies from "./Section/NewDesign/TopTenAgencies";
import TopTenDMC from "./Section/NewDesign/TopTenDMC";
import TopTenHotels from "./Section/NewDesign/TopTenHotels";
import { HomeContextProvider } from "@/hooks/context/HomeContext";
import HomeHero from "./Home_Hero";

function HomePage() {
  return (
    <HomeContextProvider>
      <HomeHero />
      <div className="mt-20 space-y-6 sm:mt-16 overflow-x-hidden">
        <TopTenAgencies />
        <TopTenHotels />
        <TopTenDMC />
        <Certification />
        <Influencers />
      </div>
    </HomeContextProvider>
  );
}

export default HomePage;
