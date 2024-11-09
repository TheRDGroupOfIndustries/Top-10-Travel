"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowDownUp, Umbrella } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, HelpCircle, Home, List, LogOut, Users } from "react-feather";
import Image from "next/image";
import {
  MdOutlineBookOnline,
  MdOutlineHotel,
  MdOutlineTravelExplore,
} from "react-icons/md";
import { FiSidebar } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa6";

// Define the types for your menu items
type MenuItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

const SmallScreenSidebar = ({
  agency,
  dmc,
  hotel,
}: {
  agency?: boolean;
  dmc?: boolean;
  hotel?: boolean;
}) => {
  const pathname = usePathname();

  const AdminMenuItems: MenuItem[] = [
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

  const CompanyMenuItems: (MenuItem | undefined)[] = [
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
    <Sheet>
      <SheetTrigger className="xl:hidden cursor-pointer">
        <FiSidebar size={28} className="text-gray-900 bg-white" />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>
            <div className="relative navbar-start h-6 xs:h-7 sm:h-8">
            <Link href="/" className="flex gap-2 h-full">
                <img src="/roundLogo.jpg" className="rounded-full h-full" alt="logo" />
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
          </SheetTitle>
        </SheetHeader>
        <div className="py-4 flex mt-[3vw] flex-col gap-3 overflow-y-auto pr-1">
          {pathname.startsWith("/admin") &&
            AdminMenuItems.map((item, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={item.href}
                  className={`flex md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 hover:bg-[#F3F3F3]  cursor-pointer
                    ${
                      pathname === item.href
                        ? "text-white bg-mainColor hover:bg-mainColor"
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

          {pathname.startsWith("/dashboard") &&
            CompanyMenuItems.filter((item): item is MenuItem =>
              Boolean(item)
            ).map((item, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={item.href}
                  className={`flex md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 hover:bg-[#F3F3F3]  cursor-pointer
                    ${
                      pathname === item.href
                        ? "text-white bg-mainColor hover:bg-mainColor"
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
              className={`flex w-full md:text-xl text-lg items-center transition-colors duration-200 rounded-lg px-3 py-3 cursor-pointer text-gray-900 hover:text-white hover:bg-mainColor`}
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
