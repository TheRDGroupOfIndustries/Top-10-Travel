"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowDownUp } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, HelpCircle, Home, List, LogOut, Users } from "react-feather";
import { MdOutlineBookOnline, MdOutlineHotel, MdOutlineTravelExplore } from "react-icons/md";
import { FiSidebar } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa6";


const SmallScreenSidebar = () => {
  const pathname = usePathname();

  const AdminMenuItems = [
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
      <SheetTrigger className="xl:hidden cursor-pointer">
        <FiSidebar size={28} className="text-gray-900 bg-white" />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>LOGO</SheetTitle>
        </SheetHeader>
        <div className="py-4 flex mt-[3vw] flex-col gap-3">
          {pathname.startsWith("/admin") &&
            AdminMenuItems.map((item, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={item.href}
                  className={`flex md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 hover:bg-[#F3F3F3]  cursor-pointer
                    ${
                      pathname === item.href
                        ? "text-white bg-[#FCAE1D] hover:bg-[#FCAE1D]"
                        : "text-gray-900"
                    }`}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                    });
                  }}
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
                  className={`flex md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 hover:bg-[#F3F3F3]  cursor-pointer
                    ${
                      pathname === item.href
                        ? "text-white bg-[#FCAE1D] hover:bg-[#FCAE1D]"
                        : "text-gray-900"
                    }`}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                    });
                  }}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  {item.name}
                </Link>
              </SheetClose>
            ))}
        </div>
        <div className="mt-auto">
          <SheetClose asChild>
            <div
              onClick={() => signOut()}
              className={`flex w-full md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 cursor-pointer text-gray-900 hover:text-white hover:bg-[#FCAE1D]`}
            >
              <LogOut className="w-6 h-6 mr-3" />
              Logout
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmallScreenSidebar;
