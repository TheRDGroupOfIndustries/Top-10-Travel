"use client";
import Image from "next/image";
import { useContext, useMemo, useState } from "react";
import HeroEllipse from "@/resources/images/Hero_Ellipse.png";
import Hot_Air_Balloon from "@/resources/images/Hot_Air_Balloon_Hero.png";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { HomeContext } from "@/hooks/context/HomeContext";

const MobileDropdown = ({ items, visible, toggle }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="box w-32 h-5 sm:h-7 flex items-center justify-center cursor-pointer bg-[#FFC658] text-white"
      >
        <span className="text-xs font-semibold">Select</span>
        <ChevronDownIcon className="w-4 h-4" />
      </div>
      {isOpen && (
        <ul className="absolute right-0 w-fit bg-white border rounded mt-1 z-50">
          {items.map(({ key, text }: any) => (
            <li
              key={key}
              onClick={() => {
                toggle(key);
                setIsOpen(false);
              }}
              className={`p-2 hover:bg-gray-100 cursor-pointer text-xs ${
                visible[key] ? "bg-[#FFC658] text-white" : "text-black"
              }`}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function HomeHero() {
  const [activeBox, setActiveBox] = useState("Hotels");

  const {
    visible,
    selectedCity,
    setCity,
    selectedCountry,
    setCountry,
    toggleVisible,
    allCities,
    allCountries,
  } = useContext(HomeContext);

  const boxItems = [
    {
      key: "DMC",
      text: "DMC's",
    },
    {
      key: "AGENCY",
      text: "Agencies",
    },
    {
      key: "HOTEL",
      text: "Hotels",
    },
    {
      key: "Influencer",
      text: "Influencers",
    },
  ];

  const toggle = (key: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
    toggleVisible(key);
  };
  const handleFind = () => {
    window.scrollTo({
      top: window.innerHeight + 150,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative w-full pt-10 lg:pt-0 md:min-h-screen px-2 md:px-3 lg:px-6 xl:px-8">
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
        <div className="absolute xl:top-[60%] lg:top-[65%] md:top-[50%] sm:top-[40%] top-[30%] xl:-left-40 lg:-left-20 md:-left-16 sm:-left-12 -left-8 w-[75%] xl:h-[32%] lg:h-[27%] md:h-[22%] sm:h-[17%] h-[12%]">
          <Image
            src={Hot_Air_Balloon}
            alt="Hero Image"
            height={400}
            width={400}
          />
        </div>
      </div>
      <div className="h-full flex md:gap-0 gap-1 flex-col justify-start lg:pt-28 pt-16 w-ful">
        <h3 className="lg:text-[32px] md:text-[24px] sm:text-[16px] text-[12px] leading-[23px] md:leading-[35px] lg:leading-[43px] font-cinzel">
          Welcome To
        </h3>
        <h1 className="uppercase font-cinzel font-bold lg:text-6xl sm:text-4xl text-2xl md:text-4xl leading-[50px] sm:leading-[65px] md:leading-[80px] lg:leading-[129px]">
          Top 10 <span className="text-[#FFC658]">travel</span>
        </h1>
        <p className="font-semibold leading-[20px] sm:leading-6 md:leading-[30px] lg:leading-[39px] text-[12px] sm:text-lg md:text-xl w-52 sm:w-64 md:w-80 lg:w-full">
          The only place where you can find Top 10{" "}
          <span className="text-[#FFC658] mr-1">
            Hotels, Agencies,
            <br /> DMC&apos;s
          </span>
          all around the world.
        </p>
        <div className="w-full mt-20 md:mt-10 lg:mt-20 md:max-w-[380px] lg:max-w-[730px]">
          <div className="w-full flex items-end justify-start">
            <div className="box min-w-52 h-6 sm:h-10 flex items-center justify-center bg-gray-200">
              <span className="text-black text-xs font-semibold ">
                FIND YOUR TOP 10
              </span>
            </div>
            <div className="lg:hidden">
              <MobileDropdown
                items={boxItems}
                visible={visible}
                toggle={toggle}
              />
            </div>
            <div className="hidden lg:flex">
              {boxItems.map(({ key, text }) => (
                <div
                  key={key}
                  className={`box w-32 h-7 text-center cursor-pointer ${
                    // @ts-expect-error
                    visible[key] ? "bg-[#FFC658] text-white" : "text-black"
                  }`}
                  onClick={() =>
                    // @ts-expect-error
                    toggle(key)
                  }
                >
                  <span className="text-xs font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-12 sm:h-14 flex items-center justify-between rounded-lg px-3 bg-gray-200">
            <div className="flex items-center lg:gap-5 gap-1">
              <Select
                value={selectedCountry}
                onValueChange={(val) => setCountry(val)}
              >
                <SelectTrigger className="lg:w-[180px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {allCountries?.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedCity}
                onValueChange={(val) => {
                  setCity(val);
                }}
              >
                <SelectTrigger className="lg:w-[180px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {allCities?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Button
                onClick={handleFind}
                className="bg-[#FFC658] hover:bg-[#ffcc66] inline-flex items-center lg:gap-2 px-2 py-1"
              >
                <SearchIcon className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
