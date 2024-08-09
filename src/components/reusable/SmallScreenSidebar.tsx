"use client";

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowDownUp } from "lucide-react";
import { FiSidebar } from "react-icons/fi";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SmallScreenSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

  const AdminMenuItems = [
    { name: "Dashboard", icon: Home, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Companies", icon: List, href: "/admin/companies" },
    { name: "Help Desk", icon: HelpCircle, href: "/admin/helpdesk" },
    { name: "Report", icon: FileText, href: "/admin/report" },
  ];

  const CompanyMenuItems = [
    { name: "Dashboard", icon: Home, href: "/company" },
    { name: "Request", icon: ArrowDownUp, href: "/company/request" },
    { name: "Packages", icon: List, href: "/company/packages" },
    { name: "Help Desk", icon: HelpCircle, href: "/company/helpdesk" },
  ];

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <FiSidebar size={28} className="dark:text-white text-black" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-3xl mt-[4vw] font-bold">Top Ten Travels</h1>
          </SheetTitle>
        </SheetHeader>
        <ul className="py-4 flex mt-[3vw] flex-col gap-3">
          {pathname.startsWith("/admin") &&
            AdminMenuItems.map((item, index) => (
              <SheetClose key={index}>
                <li>
                  {/* <Link
                        href={item.href}
                        className={`flex items-center xl:px-6 px-3 py-3 mt-1 text-black dark:hover:bg-[#020817] dark:hover:text-white hover:bg-white transition-colors duration-200 rounded-lg ${
                          pathname === item.href
                            ? "bg-white dark:bg-[#020817] dark:text-white"
                            : ""
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link> */}
                  <Link
                    href={item.href}
                    className={`flex md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer
                          ${
                            pathname === item.href
                              ? "dark:bg-white dark:text-black text-white bg-[#020817]"
                              : ""
                          }`}
                  >
                    <item.icon className="w-6 h-6 mr-3" />
                    {item.name}
                  </Link>
                </li>
              </SheetClose>
            ))}

          {pathname.startsWith("/company") &&
            CompanyMenuItems.map((item, index) => (
              <SheetClose key={index}>
                <li>
                  {/* <Link
                        href={item.href}
                        className={`flex items-center xl:px-6 px-3 py-3 mt-1 text-black dark:hover:bg-[#020817] dark:hover:text-white hover:bg-white transition-colors duration-200 rounded-lg ${
                          pathname === item.href
                            ? "bg-white dark:bg-[#020817] dark:text-white"
                            : ""
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link> */}
                  <Link
                    href={item.href}
                    className={`flex md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer
                          ${
                            pathname === item.href
                              ? "dark:bg-white dark:text-black text-white bg-[#020817]"
                              : ""
                          }`}
                  >
                    <item.icon className="w-6 h-6 mr-3" />
                    {item.name}
                  </Link>
                </li>
              </SheetClose>
            ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default SmallScreenSidebar;
