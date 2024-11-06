"use client";

import { ArrowDownUp } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, Home, List, LogOut } from "react-feather";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineHotel, MdOutlineTravelExplore } from "react-icons/md";

function AgencySidebar({
  agency,
  dmc,
  hotel,
}: {
  agency: boolean;
  dmc: boolean;
  hotel: boolean;
}) {
  const pathname = usePathname();
  const menuItems = [
    agency
      ? {
          name: "Agency",
          icon: MdOutlineTravelExplore,
          href: "/dashboard/agency",
        }
      : undefined,
    dmc ? { name: "Dmc", icon: FaRegMap, href: "/dashboard/dmc" } : undefined,
    hotel
      ? { name: "Hotel", icon: MdOutlineHotel, href: "/dashboard/hotel" }
      : undefined,
    { name: "Request", icon: ArrowDownUp, href: "/dashboard/request" },
    { name: "Help Desk", icon: HelpCircle, href: "/dashboard/helpdesk" },
  ];

  return (
    <div className="lg:w-[17vw] h-[100vh] left-0 top-0 fixed text-black flex flex-col border-r-2  border-[#7F7F7F] px-4">
      {/* <div className="p-2 mt-5 mb-12">
        <Link href="/">LOGO</Link>
      </div> */}
      <div className="relative mt-7 mb-12 h-6">
      <Link href="/" className="flex gap-2">
                <img src="/roundLogo.jpg" className="rounded-full" alt="logo" />
                <h1
          id="secondLine"
          className="uppercase font-cinzel font-bold text-xl mt-1"
        >
          <span className="inline-block">
            travel <span className="text-mainColor">Top 10</span>
          </span>
        </h1>
              </Link>
      </div>

      <nav className="flex-grow">
        <ul className="">
          {menuItems
            .filter((i) => i != undefined)
            .map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`py-3 mx-[1px] flex items-center justify-start mt-1 hover:bg-[#F3F3F3] transition-colors duration-200 rounded-lg  ${
                    pathname === item.href
                      ? "bg-mainColor hover:bg-mainColorSecondary text-white"
                      : "text-black"
                  }`}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                    });
                  }}
                >
                  <item.icon className="w-12 h-5" />
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <div>
        <button
          onClick={() => signOut()}
          className="py-3 w-full mx-[1px] mb-2 flex items-center justify-start mt-1 text-black hover:bg-mainColor hover:text-white transition-colors duration-200 rounded-lg"
        >
          <LogOut className="w-12 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AgencySidebar;
