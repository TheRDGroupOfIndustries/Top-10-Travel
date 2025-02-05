"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HomeContext } from "@/hooks/context/HomeContext";
import { cn } from "@/lib/utils";
import Hot_Air_Balloon from "@/resources/images/Hot_Air_Balloon_Hero.png";
import axios from "axios";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const MobileDropdown = ({ items, visible, toggle }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative ml-[3px] xs:ml-3 sm:ml-12 w-20 h-5 xs:w-24 xs:h-7 flex items-center justify-center cursor-pointer text-white"
      >
        {/* <div className="absolute -z-10 w-full h-full rounded-2xl"></div> */}
        <Image
          src={"/Hero_Filter_Small.png"}
          fill
          className="absolute -z-10"
          alt="hero_filter_img"
        />
        <span className="text-[10px] leading-[14px] xs:text-xs font-semibold">
          Select
        </span>
        <ChevronDownIcon
          className={cn(
            "w-4 h-4",
            isOpen
              ? "rotate-180 duration-150 transition-all"
              : "rotate-0 duration-150 transition-all"
          )}
        />
      </div>
      {isOpen && (
        <ul className="absolute right-0 w-fit bg-white border rounded-md overflow-hidden mt-1 z-50">
          {items.map(({ key, text }: any) => (
            <li
              key={key}
              onClick={() => {
                // toggle(key);
                if(key === 'AGENCY') {
                  document.getElementById("TopTenAgencies")?.scrollIntoView({ behavior: "smooth" });  
                } else if(key === 'HOTEL') {
                  document.getElementById("TopTenHotels")?.scrollIntoView({ behavior: "smooth" });
                } else if(key === 'DMC') {
                  document.getElementById("TopTenDMC")?.scrollIntoView({ behavior: "smooth" });
                } else if(key === 'Influencer') {
                  document.getElementById("Influencers")?.scrollIntoView({ behavior: "smooth" });
                }
                setIsOpen(false);
              }}
              className={`p-2 hover:bg-gray-100 cursor-pointer text-xs ${
                visible[key] ? "bg-mainColor text-white" : "text-black"
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

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
};

const defaultTextAnimations = {
  hidden: {
    opacity: 0,
    y: -30,
    x: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
};

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
}: AnimatedTextProps) => {
  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        aria-hidden
      >
        {text.split("").map((char) => (
          <motion.span
            className="inline-block"
            key={char}
            variants={defaultTextAnimations}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export const boxItems = [
  {
    key: "AGENCY",
    text: "Agencies",
  },
  {
    key: "HOTEL",
    text: "Hotels",
  },
  {
    key: "DMC",
    text: "DMCs",
  },
  {
    key: "Influencer",
    text: "Influencers",
  },
];

function HomeHero() {
  const divref = useRef<HTMLDivElement>(null);
  const [scope, balloonAnimate] = useAnimate();

  const {
    visible,
    selectedCity,
    setCity,
    selectedCountry,
    setCountry,
    toggleVisible,
    allCities,
    setSticky,
    setSearch,
    allCountries,
    updateAllData,
  } = useContext(HomeContext);

  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (elementRef.current) {
      const elementTop = elementRef.current.getBoundingClientRect().top;
      // Check if the element has touched the top of the window
      // setSticky(elementTop <= 0);
      setSearch(elementTop <= 0);

      elementTop >= 0 && setSticky(false);
      // console.log(elementTop, elementTop <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        // Ensure visible is an object with keys and boolean values
        Object.keys(visible).forEach((key: string) => {
          if (visible[key as keyof typeof visible]) {
            params.append(key, "true");
          }
        });

        const res = await axios.get<{ countries: string[] }>("/api/filter", {
          params: params,
        });

        updateAllData(res.data.countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [visible]);

  // Adding visible to the dependency array to trigger on change

  const toggle = (key: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
    toggleVisible(key);
  };

  const handleFind = () => {
    document
      .getElementById("TopTenAgencies")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useLayoutEffect(() => {
    const handleBalloonAnimate = async () => {
      balloonAnimate(
        "#smallBalloon",
        { y: [50, -20, 0], opacity: [0, 1] },
        { duration: 1.5, ease: "linear" }
      );

      await balloonAnimate(
        "#bigBalloon",
        { y: [50, -30, 0], opacity: [0, 1] },
        { duration: 1.5, delay: 0.5, ease: "linear" }
      );

      balloonAnimate(
        "#smallBalloon",
        {
          y: [0, -25, 0], // Define the y-axis keyframes for the animation
          opacity: 1, // Define the opacity keyframes for the animation
          // Define the rotation keyframes for the animation
        },
        {
          duration: 3, // Duration of one animation cycle
          repeat: Infinity, // Run the animation infinitely
          repeatType: "loop", // Loop the animation
          ease: "linear",
        }
      );

      balloonAnimate(
        "#bigBalloon",
        {
          y: [0, -50, 0], // Define the y-axis keyframes for the animation
          opacity: 1, // Define the opacity keyframes for the animation
          // Define the rotation keyframes for the animation
        },
        {
          duration: 5, // Duration of one animation cycle
          delay: 1,
          repeat: Infinity, // Run the animation infinitely
          repeatType: "loop", // Loop the animation
          ease: "linear",
        }
      );
    };
    handleBalloonAnimate();
  }, [balloonAnimate]);

  return (
    <div
      ref={divref}
      className="relative w-full h-fit min-h-[50vh] md:max-h-screen min-[768]:h-[calc(100vh+60px)] max-[820]:h-fit lg:h-fit  pt-10 lg:pt-0 px-2 md:px-3 lg:px-6 xl:px-8 "
    >
      <div className="h-full flex flex-col md:gap-3 lg:gap-0 gap-1.5 justify-start pt-16 md:pt-24 lg:pt-32 pb-24 xl:pt-40 w-full overflow-x-hidden">
        <h3
          id="firstLine"
          aria-hidden
          className="xl:text-4xl lg:text-[32px] md:text-3xl sm:text-2xl text-xl font-medium leading-[23px] overflow-hidden sm:leading-10 md:leading-[40px] lg:leading-[45px] font-cinzel"
        >
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Welcome To
          </motion.span>
        </h3>
        <h1
          id="secondLine"
          className="uppercase font-cinzel font-bold text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl overflow-hidden xl:leading-loose leading-10 xs:leading-[50px] sm:leading-[65px] md:leading-[80px] lg:leading-[129px]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          >
            travel <span className="text-mainColor">Top 10</span>
          </motion.span>
        </h1>
        <p
          id="thirdLine"
          className="font-semibold leading-normal overflow-hidden sm:leading-6 md:leading-[30px] lg:leading-[39px] text-[16px] sm:text-lg md:text-2xl xl:text-3xl w-7/12 md:w-7/12 lg:w-full"
        >
          <motion.span
            className="inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring" }}
          >
            India&apos;s first and largest initiative,
            <br />
            dedicated to identifying the best of
            <span className="text-mainColor mr-1"> Travel Brands</span>
          </motion.span>
        </p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
          className={`w-full sm:max-w-[430px] lg:overflow-hidden pt-4 md:max-w-[430px] lg:max-w-[730px]`}
          // ${
          //   isSticky && selectedCountry
          //     ? "fixed top-0 z-40 left-0 lg:pt-[3.8rem] pb-2 md:pt-[3.8rem] bg-white/80 backdrop-blur-md lg:overflow-visible md:max-w-full lg:max-w-full md:w-full px-2 md:px-3 lg:px-6 xl:px-8"
          //     : ""
          // }
        >
          {/* <div className="w-full  flex flex-row-reverse justify-end  lg:flex-col"> */}
              <p className="font-cinzel sm:text-3xl my-4 font-medium">Choose your prefrence!</p>
            <div className="lg:flex flex-wrap gap-4">
              {boxItems.map(({ key, text }) => (
                <div key={key} className={`py-2 px-4 sm:px-8 mt-2 sm:mt-0 w-52 sm:w-auto cursor-pointer text-center flex justify-center items-center 
                ${
                  // @ts-expect-error
                  visible[key] ? " text-white bg-red-500" : "text-black border border-red-400"} 
                rounded-full`}
                    onClick={() => {
                    // toggle(key)
                    const id = ''
                    if(key === 'AGENCY') {
                      document.getElementById("TopTenAgencies")?.scrollIntoView({ behavior: "smooth" });  
                    } else if(key === 'HOTEL') {
                      document.getElementById("TopTenHotels")?.scrollIntoView({ behavior: "smooth" });
                    } else if(key === 'DMC') {
                      document.getElementById("TopTenDMC")?.scrollIntoView({ behavior: "smooth" });
                    } else if(key === 'Influencer') {
                      document.getElementById("Influencers")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  }
                >
                  {text}
                </div>
              ))}
            </div>
            {/* <div className="  lg:mt-3 ">
              <span className="text-black text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-[3rem] font-semibold text-start   ">
                FIND YOUR TOP 10
              </span>
            </div> */}
          {/* </div> */}
          {/* <div className="md:max-w-3xl sm:max-w-sm xs:max-w-[320px] max-w-fit max-h-fit xs:h-12 sm:h-14 flex flex-col xs:flex-row gap-1 py-1 items-center justify-between rounded-lg px-1 xs:px-3 bg-gray-200">
            <div className="flex items-center lg:gap-5 md:gap-2 xs:gap-1 gap-2">
              <Select
                value={selectedCountry}
                onValueChange={(val) => setCountry(val)}
              >
                <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {allCountries
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((country) => (
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
                <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {allCities
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                onClick={handleFind}
                className="bg-mainColor hover:bg-mainColor xs:hover:bg-mainColorSecondary inline-flex items-center text-xs xs:text-sm lg:gap-2 px-2 xs:py-0.5"
              >
                <SearchIcon className="xs:w-5 xs:h-5 w-4 h-4" />
                Search
              </Button>
            </div>
          </div> */}
        </motion.div>
        <div ref={elementRef} className="h-[1px] w-[1px]"></div>
      </div>

      <div
        ref={scope}
        className="absolute -z-20 right-0 top-0 bottom-0 md:h-full w-[45%] md:w-[45%] lg:w-[40%] xl:w-[35%]"
      >
        {/* <Image src={HeroEllipse} alt="Hero Image" height={912} width={562} priority /> */}
        <video
          // ref={videoRef}
          autoPlay
          loop
          muted
          className="absolute right-0 top-0 bottom-0 h-full w-[85%] object-cover"
          style={{
            clipPath: "ellipse(100% 53% at 100% 47%)",
          }}
        >
          <source src="/sky_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <AnimatePresence>
          <motion.div
            id="smallBalloon"
            className="absolute top-[16%] lg:top-[18%] xl:top-[18%] xl:-left-7 w-[40%] xl:h-[35%] lg:h-[30%] md:h-[25%] sm:h-[20%] h-[15%]"
            style={{ opacity: 0 }}
          >
            <Image
              src={Hot_Air_Balloon}
              alt="Hero Image"
              height={250}
              width={250}
            />
          </motion.div>
          <motion.div
            id="bigBalloon"
            className="absolute top-[40%] sm:top-[53%] lg:top-[45%] xl:-left-5 md:-left-10 w-[70%] xl:h-[32%] lg:h-[27%] md:h-[22%] sm:h-[17%] h-[12%]"
            style={{ opacity: 0 }}
          >
            <Image
              src={Hot_Air_Balloon}
              alt="Hero Image"
              height={400}
              width={400}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HomeHero;
