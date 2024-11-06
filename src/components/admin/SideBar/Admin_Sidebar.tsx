"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FileText, HelpCircle, Home, LogOut, Users, Umbrella } from "react-feather";
import { FaRegMap } from "react-icons/fa6";
import {
  MdOutlineBookOnline,
  MdOutlineHotel,
  MdOutlineTravelExplore,
} from "react-icons/md";

function AdminSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/admin" },
    { name: "Visitors", icon: Users, href: "/admin/visitors" },
    { name: "Agencies", icon: MdOutlineTravelExplore, href: "/admin/agency" },
    { name: "Hotels", icon: MdOutlineHotel, href: "/admin/hotel" },
    { name: "Dmc's", icon: FaRegMap, href: "/admin/dmc" },
    {
      name: "Influencer's",
      icon: MdOutlineBookOnline,
      href: "/admin/influencer",
    },
    { name: "Help Desk", icon: HelpCircle, href: "/admin/helpdesk" },
    {name: "About Us", icon: FileText, href: "/admin/aboutus"},
    {name: "Terms & Conditions", icon: FileText, href: "/admin/terms"},
    {name: "Privacy Policy", icon: FileText, href: "/admin/policy"},
    { name: "Report", icon: FileText, href: "/admin/report" },
    { name: "Top 10 city", icon: Umbrella, href: "/admin/top10" },
  ];

  return (
    <div className="lg:w-[17vw] h-[100vh] left-0 top-0 fixed text-black flex flex-col border-r-2 border-[#7F7F7F] px-4">
      <div className="relative mt-7 mb-12 h-6">
      <Link href="/" className="flex gap-2">
                <img src="/roundLogo.jpg" className="rounded-full max-h-[40px]" alt="logo" />
                <h1
          id="secondLine"
          className="uppercase font-cinzel font-bold text-xl mt-2"
        >
          <span className="inline-block">
            travel <span className="text-mainColor">Top 10</span>
          </span>
        </h1>
              </Link>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <ul className="pr-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`py-3 mx-[1px] flex items-center justify-start mt-1  hover:bg-[#F3F3F3] transition-colors duration-200 rounded-lg  ${
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
          className="py-3 w-full mx-[1px] mb-2 flex items-center justify-start mt-1 text-black hover:bg-[#f04a4a] hover:text-white transition-colors duration-200 rounded-lg"
        >
          <LogOut className="w-12 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
