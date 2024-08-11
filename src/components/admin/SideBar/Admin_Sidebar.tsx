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
    <div className="h-[100vh] w-[18vw] pb-3 text-black flex flex-col items-center">
      <div className="py-7">
        <Link href="/">
          <h1 className="text-xl text-center font-bold">Top Ten Travels</h1>
        </Link>
      </div>
      <nav className="flex flex-col w-full">
        <div>
          {menuItems.map((item, index) => (
            <div key={index} className="text-start mb-1 px-5">
              <Link
                href={item.href}
                className={`flex items-center text-lg xl:px-8 px-3 py-4 transition-colors duration-300 rounded-xl ${
                  pathname === item.href
                    ? "bg-[#FCAE1D] hover:bg-[#FCAE1D] dark:bg-[#020817] text-white dark:text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </nav>
      <div className="mt-auto w-full px-5">
        <div
          onClick={() => signOut()}
          className={`flex items-center text-lg xl:px-8 px-3 py-4 transition-colors duration-300 rounded-xl hover:bg-[#FCAE1D] hover:text-white`}
        >
          <LogOut className="w-6 h-6 mr-3" />
          Logout
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
