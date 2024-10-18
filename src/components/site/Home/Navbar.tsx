"use client";
import ButtonFancy from "@/components/reusable/ButtonFancy";
import { LogOutIcon, MenuIcon, SquareChartGantt, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const [visible, setVisible] = useState(true);
  const route = usePathname();
  
  const session = useSession();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrevScrollPos(window.scrollY);

      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos);
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
      <nav
        className={`flex bg-white/80 backdrop-blur-sm z-50 justify-between items-center h-[60px] w-[100vw] fixed top-0 px-2 md:px-3 lg:px-6 xl:px-8 transition-transform duration-300 `}
      >
        <div className="relative h-6 xs:h-7 sm:h-8 w-44 xs:w-48 sm:w-56">
          <Link href="/">
            <Image src="/logo.png" alt="logo" fill />
          </Link>
        </div>

        <ul className="ml-32 hidden lg:flex gap-12 justify-end items-center">
          {navMenus.map((el, i) => (
            <Link
              href={el.link}
              key={i}
              className={cn(
                "text-lg font-medium",
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
