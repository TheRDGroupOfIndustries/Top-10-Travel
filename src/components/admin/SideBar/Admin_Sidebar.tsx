"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, HelpCircle, Home, List, LogOut, Users } from "react-feather";

function AdminSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Companies", icon: List, href: "/admin/companies" },
    { name: "Help Desk", icon: HelpCircle, href: "/admin/helpdesk" },
    { name: "Report", icon: FileText, href: "/admin/report" },
  ];

  return (
    <div className="lg:w-[17vw] h-[100vh] left-0 top-0 fixed text-black flex flex-col border-r-2 border-[#7F7F7F] px-4">
      <div className="p-2 mt-5 mb-12">
        <Link href="/">LOGO</Link>
      </div>
      <nav className="flex-grow">
        <ul className="">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`py-3 mx-[1px] flex items-center justify-start mt-1  hover:bg-[#F3F3F3] transition-colors duration-200 rounded-lg  ${
                  pathname === item.href
                    ? "bg-[#FCAE1D] hover:bg-[#FCAE1C] text-white"
                    : "text-black"
                }`}
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
          className="py-3 w-full mx-[1px] mb-2 flex items-center justify-start mt-1 text-black hover:bg-[#FCAE1C] hover:text-white transition-colors duration-200 rounded-lg"
        >
          <LogOut className="w-12 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
