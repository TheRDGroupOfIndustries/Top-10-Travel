"use client";
import ButtonFancy from "@/components/reusable/ButtonFancy";
import { LogOutIcon, MenuIcon, SearchIcon, SquareChartGantt, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
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
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { boxItems, MobileDropdown } from "./Home_Hero";

const navMenus = [
  {
    title: "Agencies",
    link: "/Agency",
  },
  {
    title: "Hotels",
    link: "/Hotels",
  },
  {
    title: "DMCs",
    link: "/DMC",
  },
  {
    title: "Influencers",
    link: "/Influencers",
  },
  {
    title: "Contact us",
    link: "/ContactUs",
  },
];

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const {
    visible,
    selectedCity,
    setCity,
    selectedCountry,
    setCountry,
    toggleVisible,
    allCities,
    isSticky,
    search,
    setSticky,
    allCountries,
    updateAllData,
  } = useContext(HomeContext);
  const route = usePathname();
  
  
  const session = useSession();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    window.scrollTo({
      top: 0,
    });
  };

  const toggle = (key: "DMC" | "AGENCY" | "HOTEL" | "Influencer") => {
    toggleVisible(key);
  };
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrevScrollPos(window.scrollY);

      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        // setVisible(prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [prevScrollPos]);

  const renderMenuItem = () => {
    if (session?.data?.user.role !== "ADMIN") {
      return (
        <>
          <DropdownMenuItem>
            <Link href="/dashboard" className="w-full h-full">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>My Account</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/auth" className="w-full h-full">
              <div className="flex items-center gap-2">
                <MdOutlineCreateNewFolder size={18} />
                <span>Register</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </>
      );
    } else {
      return (
        <>
          <DropdownMenuItem>
            <Link href="/admin" className="w-full h-full">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>Admin Dashboard</span>
              </div>
            </Link> 
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/dashboard" className="w-full h-full">
              <div className="flex items-center gap-2">
                <SquareChartGantt size={18} />
                <span>Management Dashboard</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/auth" className="w-full h-full">
              <div className="flex items-center gap-2">
                <MdOutlineCreateNewFolder size={18} />
                <span>Register</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </>
      );
    }
  };

  return (
    <>
      <nav className="w-[100vw] fixed top-0 bg-white z-[999] px-2 md:px-3 lg:px-6 xl:px-8">
        <div
          className={`flex justify-between items-center z-[60] h-[60px] transition-transform duration-300`}>
            <div className="relative h-6 xs:h-7 sm:h-8 w-44 xs:w-48 sm:w-56">
              <Link href="/" onClick={() => {
                setCity("");
              }}>
                <Image src="/logo.png" alt="logo" fill />
              </Link>
            </div>

            <ul className="hidden lg:flex gap-10 justify-end transition-all duration-300s items-center">
              {navMenus.map((el, i) => (
                <Link
                  href={el.link}
                  key={i}
                  className={cn(
                    "xl:text-lg font-medium",
                    route === el.link ? "text-mainColor" : "cool-link"
                  )}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                    });
                  }}
                >
                  {el.title}
                </Link>
              ))}
            {search && route === "/" && (
              <span
                className={cn(
                  "xl:text-lg flex gap-1 items-center font-medium cursor-pointer", isSticky ? "text-mainColor": ""
                )}
                onClick={() => {
                  setSticky((prev: boolean) => !prev)
                }}
              >
                Search  
                <SearchIcon className="animate-bounce w-4 h-4" />
              </span>)}
            </ul>

            <div className="flex items-center gap-2 lg:hidden">
              {session.status !== "authenticated" ? (
                <div onClick={() => signIn("google")}>
                  <ButtonFancy className="flex gap-1 items-center">
                    <FcGoogle className="text-xl" /> Login
                  </ButtonFancy>
                </div>
              ) : (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="bg-slate-400 cursor-pointer">
                      <AvatarImage src={session?.data?.user?.image} />
                      <AvatarFallback>
                        {session.data.user.name
                          .split(" ")
                          .map((word) => word[0].toUpperCase())
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {renderMenuItem()}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <div className="flex items-center gap-2">
                        <LogOutIcon size={18} />
                        <span>Log Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div className="flex items-center">
                <MenuIcon
                  onClick={toggleSidebar}
                  size={25}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:flex gap-5 hidden">
              {session.status !== "authenticated" ? (
                <div onClick={() => signIn("google")}>
                  <ButtonFancy className="flex gap-1 items-center">
                    <FcGoogle className="text-xl" /> Login
                  </ButtonFancy>
                </div>
              ) : (
                <>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="bg-slate-400 cursor-pointer">
                        <AvatarImage src={session?.data?.user?.image} />
                        <AvatarFallback>
                          {session.data.user.name
                            .split(" ")
                            .map((word) => word[0].toUpperCase())
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {renderMenuItem()}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => signOut()}
                      >
                        <div className="flex items-center gap-2">
                          <LogOutIcon size={18} />
                          <span>Log Out</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
        </div>

        <AnimatePresence>
          {isSticky && <motion.div
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            // exit={{ y: -30 }}
            className={cn(`w-full mx-auto pt-2 pb-2 z-[59] lg:overflow-hidden md:max-w-[430px] lg:max-w-[730px]`)}
          >
              <div className="w-full ml-1 xs:ml-4 flex items-end justify-start">
                <div className="relative max-w-48 xs:max-w-60 h-7 xs:h-9 flex items-center justify-center">
                  <Image
                    src={"/Hero_Filter_Large.png"}
                    fill
                    className="absolute filter saturate-[1.] contrast-100"
                    alt="hero_filter_img"
                  />
                  <span className="text-black z-10 px-3 xs:px-6 lg:text-sm text-[10px] leading-[14px] xs:text-xs font-semibold ">
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
                      {/* {
                        // @ts-ignore
                        visible[key] && (
                          <Image
                            src={"/Hero_Filter_Small.png"}
                            fill
                            className="absolute -z-10 filter hue-rotate-[1deg] saturate-[1.5] contrast-100"
                            alt="hero_filter_img"
                          />
                        )
                      } */}
                      {
                        // @ts-ignore
                        visible[key] ? (
                          <Image
                            src={"/Hero_Filter_Small.png"}
                            fill
                            className="absolute -z-10 filter hue-rotate-[1deg] saturate-[1.5] contrast-100"
                            alt="hero_filter_img"
                          />
                        ) : (
                          <Image
                            src={"/Hero_Filter_Large.png"}
                            fill
                            className="absolute -z-10 filter hue-rotate-[1deg] saturate-[1.5] contrast-100"
                            alt="hero_filter_img"
                          />
                        )
                      }
                      <span className="text-xs font-semibold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:max-w-3xl sm:max-w-sm xs:max-w-[320px] max-w-fit max-h-fit xs:h-12 sm:h-14 flex flex-col xs:flex-row gap-1 py-1 items-center justify-between rounded-lg px-1 xs:px-3 bg-gray-200">
                <div className="flex items-center lg:gap-5 md:gap-2 xs:gap-1 gap-2">
                  <Select
                    value={selectedCountry}
                    onValueChange={(val) => setCountry(val)}
                  >
                    <SelectTrigger className="lg:w-[280px] md:w-[120px] w-[100px] focus:ring-0 focus:ring-none focus:ring-offset-0 bg-gray-300/50 text-black/50 text-xs lg:text-base">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
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
                    <SelectContent className="z-[9999]">
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
                    // onClick={handleFind}
                    className="bg-mainColor hover:bg-mainColor xs:hover:bg-mainColorSecondary inline-flex items-center text-xs xs:text-sm lg:gap-2 px-2 xs:py-0.5"
                  >
                    <SearchIcon className="xs:w-5 xs:h-5 w-4 h-4" />
                    Search
                  </Button>
                </div>
              </div>
          </motion.div>}
        </AnimatePresence>
      </nav>


      {/* Sidebar */}
      <div
        className={`rounded-lg font-bold text-gray-900 fixed top-0 right-0 bg-white opacity-80 backdrop-blur-sm transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 p-6`}
      >
        <div className="flex flex-col items-start p-8">
          {navMenus.map((el, i) => (
            <Link
              key={i}
              href={el.link}
              className={cn(
                "my-3 text-lg font-medium",
                route === el.link ? "text-mainColor" : "cool-link"
              )}
              onClick={toggleSidebar}
            >
              {el.title}
            </Link>
          ))}

          {search && route === "/" && (
            <span
                className={cn(
                  "text-lg my-3 flex gap-1 items-center font-medium cursor-pointer", isSticky ? "text-mainColor": ""
                )}
                onClick={() => {
                  setSticky((prev: boolean) => !prev)
                }}
              >
                Search  
                <SearchIcon className="animate-pulse xs:w-5 xs:h-5 w-4 h-4" />
            </span>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Navbar;
