"use client";

import Link from "next/link";
import React from "react";
import {
  Home,
  Users,
  List,
  Activity,
  FileText,
  HelpCircle,
  Settings,
  LogOut,
} from "react-feather";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowDownUp } from "lucide-react";

function CompanySidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/company" },
    { name: "Request", icon: ArrowDownUp, href: "/company/request" },
    { name: "Packages", icon: List, href: "/company/packages" },
    { name: "Help Desk", icon: HelpCircle, href: "/company/helpdesk" },
  ];

  return (
    <div className="lg:w-[17vw] h-[100vh] left-0 top-0 fixed text-black flex flex-col border-r-2  border-[#7F7F7F] px-4">
      <div className="p-2 mt-5 mb-12">
        <Link href="/">
          LOGO
        </Link>
      </div>
      <nav className="flex-grow  ">
        <ul className="">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`py-3 mx-[1px] flex items-center justify-start mt-1 text-black hover:bg-[#F3F3F3] transition-colors duration-200 rounded-lg  ${pathname === item.href
                    ? "bg-[#FCAE1D] hover:bg-[#FCAE1C] hover:text-gray-600 text-white"
                    : ""
                  }`}
              >
                <item.icon className="w-12 h-5" />
                {item.name}
              </Link>

            </li>
          ))}
        </ul>
      </nav>
      <div className="">
        <button
          onClick={() => signOut()}
          className="flex items-center text-black hover:text-white transition-colors  duration-200 ml-5 py-6 "
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default CompanySidebar;
