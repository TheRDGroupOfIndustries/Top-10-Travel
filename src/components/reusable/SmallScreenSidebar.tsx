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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowDownUp } from "lucide-react";
import { FiSidebar } from "react-icons/fi";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SmallScreenSidebar = () => {
  const pathname = usePathname();

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
      <SheetTrigger className="xl:hidden">
        <FiSidebar size={28} className="dark:text-white text-black" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-3xl mt-[4vw] font-bold">Top Ten Travels</h1>
          </SheetTitle>
        </SheetHeader>

        <div className="py-4 flex mt-[3vw] flex-col gap-3">
          {pathname.startsWith("/admin") &&
            AdminMenuItems.map((item, index) => (
              <SheetClose asChild key={index}>
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
              </SheetClose>
            ))}

          {pathname.startsWith("/company") &&
            CompanyMenuItems.map((item, index) => (
              <SheetClose asChild key={index}>
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
              </SheetClose>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmallScreenSidebar;
