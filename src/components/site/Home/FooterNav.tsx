"use client";
import React from "react";
import Link from "next/link";
import { TbUserHexagon } from "react-icons/tb";
import { FaHotel } from "react-icons/fa6";
import { CircleUserRound, Building2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { BsBuildingsFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

const navPlaces = [
  {
    Icon: BsBuildingsFill,
    name: "Agency",
    link: "/Agency",
  },
  {
    Icon: Building2,
    name: "DMC",
    link: "/DMC",
  },
  {
    Icon: FaHotel,
    name: "Hotel",
    link: "/Hotels",
  },
  {
    Icon: TbUserHexagon,
    name: "Influencer",
    link: "/Influencers",
  },
  {
    Icon: CircleUserRound,
    name: "Profile",
    link: "/dashboard",
  },
];

const FooterNav = () => {
  const route = usePathname();
  const {data} = useSession();
  const user = data?.user;

  return (
    <nav
      className={`lg:hidden flex bg-white/80 backdrop-blur-sm z-50 justify-between items-center h-[60px] w-[100vw] fixed bottom-0 px-2 md:px-3 lg:px-6 xl:px-8 transition-transform duration-300`}
    >
      {navPlaces.map((nav) => {
        if (!data?.user && nav.name === "Profile") return null;
        return (
          <Link
            key={nav.name}
            href={nav.link}
            className={`flex flex-col items-center justify-evenly text-sm font-semibold gap-0.5 ${
              route === nav.link ? "text-mainColor" : "text-slate-850"
            }`}
          >
            <div>
              <nav.Icon className="size-4" />
            </div>
            <div>{nav.name}</div>
          </Link>
        )
      })}
    </nav>
  );
};

export default FooterNav;
