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
import HeroEllipse from "@/resources/images/Hero_Ellipse.png";
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

const MobileDropdown = ({ items, visible, toggle }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative sm:ml-8 ml-4 w-24 h-7 flex items-center justify-center cursor-pointer text-white"
      >
        <Image
          src={"/Hero_Filter_Small.jpg"}
          layout="fill"
          className="absolute -z-10"
          alt="hero_filter_img"
        />
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
                visible[key] ? "bg-[#FCAF1E] text-white" : "text-black"
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

function HomeHero() {
  const divref = useRef<HTMLDivElement>(null);
  const [scope, balloonAnimate] = useAnimate();
  const [headingScope, headingAnimate] = useAnimate();
  const {
    visible,
    selectedCity,
    setCity,
    selectedCountry,
    setCountry,
    toggleVisible,
    allCities,
    allCountries,
    updateAllData,
  } = useContext(HomeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/filter");
        updateAllData(res.data.countries);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const boxItems = [
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
      text: "DMC's",
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
    window.scrollBy({
      top: divref.current?.clientHeight,
      behavior: "smooth",
    });
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
  }, []);

  return (
    <div
      ref={divref}
      className="relative w-full pt-10 lg:pt-0 md:min-h-screen px-2 md:px-3 lg:px-6 xl:px-8"
    >
      <div
        ref={scope}
        className="absolute -z-10 right-0 h-[85%] w-[45%] lg:w-[38%] xl:w-[33%]"
      >
        <Image src={HeroEllipse} alt="Hero Image" height={912} width={562} />
        <AnimatePresence>
          <motion.div
            id="smallBalloon"
            className="absolute xl:top-[22%] lg:top-[18%] md:top-[12%] sm:top-[10%] top-[8%] xl:-left-24 lg:-left-20 md:-left-16 sm:-left-12 -left-8 w-[40%] xl:h-[35%] lg:h-[30%] md:h-[25%] sm:h-[20%] h-[15%]"
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
            className="absolute xl:top-[60%] lg:top-[65%] md:top-[50%] sm:top-[45%] top-[35%] xl:-left-28 lg:-left-20 md:-left-16 sm:-left-12 -left-8 w-[75%] xl:h-[32%] lg:h-[27%] md:h-[22%] sm:h-[17%] h-[12%]"
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

      <div
        ref={headingScope}
        className="h-full flex flex-col md:gap-0 lg:gap-0 gap-1 justify-start pt-16 md:pt-24 lg:pt-32 xl:pt-40 w-full"
      >
        <h3
          id="firstLine"
          aria-hidden
          className="xl:text-4xl lg:text-[32px] md:text-2xl sm:text-xl text-lg font-medium leading-[23px] overflow-hidden sm:leading-[30px] md:leading-[35px] lg:leading-[43px] font-cinzel"
        >
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Welcome To
          </motion.span>
          {/* <motion.span>
            {"Welcome To".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  initial: { x: 0 },
                  animate: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span> */}
        </h3>
        {/* <h3 className="sr-only">Welcome TO</h3> */}
        <h1
          id="secondLine"
          className="uppercase font-cinzel font-bold text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl overflow-hidden xl:leading-loose leading-[50px] sm:leading-[65px] md:leading-[80px] lg:leading-[129px]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          >
            Top 10 <span className="text-[#FCAF1E]">travel</span>
          </motion.span>
        </h1>
        <p
          id="thirdLine"
          className="font-semibold leading-[20px] overflow-hidden sm:leading-6 md:leading-[30px] lg:leading-[39px] text-[12px] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl w-52 sm:w-64 md:w-80 lg:w-full"
        >
          <motion.span
            className="inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring" }}
          >
            The only place where you can find Top 10{" "}
            <span className="text-[#FCAF1E] mr-1">
              Hotels, Agencies,
              <br /> DMC&apos;s
            </span>
            &nbsp;all around the world.
          </motion.span>
        </p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
          className="w-full pt-20 md:pt-10 lg:overflow-hidden lg:pt-24 md:max-w-[430px] lg:max-w-[730px]"
        >
          <div className="w-full ml-4 flex items-end justify-start">
            {/* <div className="rounded-t-[18px] max-w-52 h-8 md:h-10 sm:h-9 flex items-center justify-center bg-gray-200"> */}
            <div className="relative max-w-60 h-9 flex items-center justify-center">
              <Image
                src={"/Hero_Filter_Large.png"}
                layout="fill"
                className="absolute"
                alt="hero_filter_img"
              />
              <span className="text-black z-10 px-6 lg:text-sm text-xs font-semibold ">
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
            <div className="hidden ml-5 lg:flex xl:gap-5 gap-4">
              {boxItems.map(({ key, text }) => (
                // <div
                //   key={key}
                //   className={`rounded-t-[12px] w-24 h-7 text-center cursor-pointer ${
                //     // @ts-expect-error
                //     visible[key] ? "bg-[#FCAF1E] text-white" : "text-black"
                //   }`}
                //   onClick={() =>
                //     // @ts-expect-error
                //     toggle(key)
                //   }
                // >

                <div
                  key={key}
                  className={`relative w-24 h-7 text-center cursor-pointer ${
                    // @ts-expect-error
                    visible[key] ? "text-white" : "text-black"
                  }`}
                  onClick={() =>
                    // @ts-expect-error
                    toggle(key)
                  }
                >
                  {
                    // @ts-ignore
                    visible[key] && (
                      <Image
                        src={"/Hero_Filter_Small.jpg"}
                        layout="fill"
                        className="absolute -z-10"
                        alt="hero_filter_img"
                      />
                    )
                  }
                  <span className="text-xs font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-12 sm:h-14 flex items-center justify-between rounded-lg px-3 bg-gray-200">
            <div className="flex items-center lg:gap-5 md:gap-2 gap-1">
              <Select
                value={selectedCountry}
                onValueChange={(val) => setCountry(val)}
              >
                <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
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
                <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
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
            <div>
              <Button
                onClick={handleFind}
                className="bg-[#FCAF1E] hover:bg-[#ffcc66] inline-flex items-center lg:gap-2 px-2 py-1"
              >
                <SearchIcon className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomeHero;
