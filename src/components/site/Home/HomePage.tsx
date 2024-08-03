"use client";
import { Button } from "@/components/ui/button";
import img1 from "@/resources/images/form/CompanyForm.png";
import img2 from "@/resources/images/unsplash_enLHQpdEfHk.png";
import { ArrowUpRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Certification from "./Section/GetCertification/certification";
import Influencers from "./Section/Influencers";
import TopTenAgencies from "./Section/NewDesign/TopTenAgencies";
import TopTenDMC from "./Section/NewDesign/TopTenDMC";
import TopTenHotels from "./Section/NewDesign/TopTenHotels";
import { useRouter } from "next/navigation";
import SearchingAndFilter from "./SearchingAndFilteringUI/SearchAndFilter";
import { HomeContextProvider } from "@/hooks/context/HomeContext";
import HeroEllipse from "@/resources/images/Hero_Ellipse.png";
import Hot_Air_Balloon from "@/resources/images/Hot_Air_Balloon_Hero.png";
import HomeHero from "./Home_Hero";

function HomePage() {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      {/* <div className="w-full h-full relative pb-10 lg:pb-0">
        <div className="w-full h-full block lg:hidden absolute">
          <Image
            src={
              "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826"
            }
            alt="Hero Image"
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="w-full lg:min-h-screen px-2 md:px-3 lg:px-6 xl:px-8">
          <div className="w-full lg:min-h-[80vh]  flex flex-col items-center justify-center lg:pt-28 pt-20 gap-5 relative">
            <p className="text-center text-base font-semibold">
              THE WORLD&apos;S MOST
            </p>
            <h1 className="lg:max-w-[40vw] text-center text-6xl lg:text-8xl font-semibold font-cinzel">
              EXTRA ORDINARY PLACES
            </h1>
            <Button
              onClick={() => {
                if (session.status === "unauthenticated") signIn("google");
                else router.push("/auth/get-started");
              }}
              className={
                "w-[200px] h-[50px] text-white text-xl font-normal rounded-full"
              }
            >
              Get Started
              <ArrowUpRight size={32} strokeWidth={1.5} />
            </Button>
            <div className="absolute top-0 left-0 w-full h-full lg:pt-28 pt-20 hidden lg:block -z-10">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 lg:h-full h-72 lg:w-96 w-48 -z-50">
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 lg:h-60 lg:w-60 w-full h-40">
                      <Image
                        src={img1}
                        alt="Image"
                        width={400}
                        height={600}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 lg:h-60 lg:w-60 hidden lg:block bg-[#FFDB80] -z-50" />
                  </div>
                </div>
                <div className="absolute lg:top-0 right-0 bottom-0 lg:h-full h-72 lg:w-96 w-48 -z-50">
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 lg:h-60 lg:w-60 hidden lg:block bg-[#FFDB80] -z-50" />
                    <div className="absolute bottom-0 right-0 lg:h-60 lg:w-60 w-full h-40 ">
                      <Image
                        src={img2}
                        alt="Image"
                        width={400}
                        height={600}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="relative w-full h-screen">
        <div className="absolute -z-10 right-0 h-[85%] w-[45%] lg:w-[35%] xl:w-[30%]">
          <Image src={HeroEllipse} alt="Hero Image" height={912} width={562} />
          <div className="absolute xl:top-[22%] lg:top-[18%] md:top-[12%] sm:top-[10%] top-[8%] xl:-left-24 lg:-left-20 md:-left-16 sm:-left-12 -left-8 w-[40%] xl:h-[35%] lg:h-[30%] md:h-[25%] sm:h-[20%] h-[15%]">
            <Image
              src={Hot_Air_Balloon}
              alt="Hero Image"
              height={250}
              width={250}
            />
          </div>
          <div className="absolute xl:top-[70%] lg:top-[65%] md:top-[50%] sm:top-[40%] top-[30%] xl:-left-24 lg:-left-20 md:-left-16 sm:-left-12 -left-8 w-[75%] xl:h-[32%] lg:h-[27%] md:h-[22%] sm:h-[17%] h-[12%]">
            <Image
              src={Hot_Air_Balloon}
              alt="Hero Image"
              height={400}
              width={400}
            />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center w-full">
          <h3 className="font-normal text-[32px] leading-[43px] font-cinzel">
            Welcome To
          </h3>
          <h1 className="uppercase font-cinzel text-8xl leading-[129px]">
            Top 10 <span className="text-[#FFC658]">travel</span>
          </h1>
          <p className="font-normal leading-[39px] text-[26px]">
            The only place where you can find Top 10{" "}
            <span className="text-[#FFC658]">
              Hotels, Agencies,
              <br /> DMC’s
            </span>
            all around the world.
          </p>
        </div>
      </div> */}
      <HomeContextProvider>
        <HomeHero />
        {/* <SearchingAndFilter /> */}
        <div className="mt-20 sm:mt-16">
          <TopTenAgencies />
          <TopTenHotels />
          <TopTenDMC />
          <Certification />
          <Influencers />
        </div>
      </HomeContextProvider>
    </>
  );
}

export default HomePage;
