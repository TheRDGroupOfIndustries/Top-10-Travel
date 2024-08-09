"use client";
import ButtonFancy from "@/components/reusable/ButtonFancy";
import { LogOut, LogOutIcon, MenuIcon, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { redirect, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    title: "DMC's",
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
  const route = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const session = useSession();

  return (
    <>
      <nav className="flex w-full bg-white/80 backdrop-blur-sm justify-between items-center h-[60px] fixed z-40 px-2 md:px-3 lg:px-6 xl:px-8">
        <div className="navbar-start">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            LOGO
          </Link>
        </div>
        <ul className="ml-32 hidden lg:flex gap-12 justify-end items-center  border-green-500">
          {navMenus.map((el, i) => (
            <Link
              href={el.link}
              key={i}
              // className="border-b-2 border-transparent font-medium text-md hover:border-b-2 hover:border-sky-600 cursor-pointer"
              className={cn(
                "text-lg font-medium",
                route === el.link ? "text-[#E87A1F]" : "cool-link"
              )}
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
                <DropdownMenuItem className="cursor-pointer">
                  {session.data.user.role === "COMPANY" ? (
                    <Link href="/company">
                      <div className="flex items-center gap-2">
                        <span>
                          <User size={18} />
                        </span>
                        <span>My Account</span>
                      </div>
                    </Link>
                  ) : session.data.user.role === "ADMIN" ? (
                    <Link href="/admin">
                      <div className="flex items-center gap-2">
                        <span>
                          <User size={18} />
                        </span>
                        <span>View Admin</span>
                      </div>
                    </Link>
                  ) : (
                    <Link href="/auth/company">
                      <div className="flex items-center gap-2">
                        <span>
                          <User size={18} />
                        </span>
                        <span>Start as Company</span>
                      </div>
                    </Link>
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <Link href="/">
                    <div className="flex items-center gap-2">
                      <span>
                        <LogOutIcon size={18} />
                      </span>
                      <span>Log Out</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex items-center">
            <MenuIcon
              onClick={toggleSidebar}
              size={30}
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
                  <DropdownMenuItem className="cursor-pointer">
                    {session.data.user.role === "COMPANY" ? (
                      <Link href="/company">
                        <div className="flex items-center gap-2">
                          <span>
                            <User size={18} />
                          </span>
                          <span>My Account</span>
                        </div>
                      </Link>
                    ) : session.data.user.role === "ADMIN" ? (
                      <Link href="/admin">
                        <div className="flex items-center gap-2">
                          <span>
                            <User size={18} />
                          </span>
                          <span>View Admin</span>
                        </div>
                      </Link>
                    ) : (
                      <Link href="/auth/company">
                        <div className="flex items-center gap-2">
                          <span>
                            <User size={18} />
                          </span>
                          <span>Start as Company</span>
                        </div>
                      </Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <Link href="/">
                      <div className="flex items-center gap-2">
                        <span>
                          <LogOutIcon size={18} />
                        </span>
                        <span>Log Out</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={` rounded-lg font-bold text-gray-900 fixed top-0 right-0 bg-white opacity-80 backdrop-blur-sm transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 p-6`}
        style={{ width: "auto", height: "auto" }}
      >
        <div className="flex flex-col items-start p-8">
          {navMenus.map((el, i) => (
            <Link
              key={i}
              href={el.link}
              className={cn(
                "my-3 text-lg font-medium",
                route === el.link ? "text-[#E87A1F]" : "cool-link"
              )}
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
