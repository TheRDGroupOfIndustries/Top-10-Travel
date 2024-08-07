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
    <div className="w-full h-full text-black flex flex-col pl-2">
      <div className="p-5">
        <Link href="/">
          <h1 className="text-xl font-bold">Top Ten Travels</h1>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="py-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 mt-1 text-black hover:bg-white transition-colors duration-200 rounded-l-full ${
                  pathname === item.href ||
                  (pathname.endsWith("create") &&
                    item.href.endsWith("packages"))
                    ? "bg-white"
                    : ""
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={() => signOut()}
          className="flex items-center text-black hover:text-white transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default CompanySidebar;
