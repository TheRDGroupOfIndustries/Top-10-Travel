import { cn } from "@/lib/utils";
import { BiSolidShoppingBags } from "react-icons/bi";
import { BsFillHouseHeartFill, BsMoonStars } from "react-icons/bs";
import { CiAirportSign1 } from "react-icons/ci";
import { FaPeopleCarry, FaSwimmer } from "react-icons/fa";
import { FaPeopleGroup, FaWifi } from "react-icons/fa6";
import {
  GiAtSea,
  GiClothesline,
  GiCruiser,
  GiMountainRoad,
  GiRupee,
  GiSunbeams,
  GiSundial,
  GiSunPriest,
  GiTreeDoor,
} from "react-icons/gi";
import { HiQueueList } from "react-icons/hi2";
import { IoMdFitness } from "react-icons/io";
import { IoWoman } from "react-icons/io5";
import { LiaCalendarDaySolid, LiaHotelSolid } from "react-icons/lia";
import {
  MdAttachMoney,
  MdConnectingAirports,
  MdEco,
  MdEmojiTransportation,
  MdEventAvailable,
  MdFamilyRestroom,
  MdLocalBar,
  MdOutlineCardTravel,
  MdOutlineRoomService,
  MdSpa,
  MdWorkspacePremium,
} from "react-icons/md";
import { PiPark, PiVideoConference } from "react-icons/pi";
import { Ri24HoursLine, RiFlashlightLine, RiVipLine } from "react-icons/ri";
import { TbBeach, TbPigMoney } from "react-icons/tb";

export const GetIconByTag = ({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) => {
  if (tag === "Corporate Travel")
    return (
      <MdOutlineCardTravel
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Leisure Travel")
    return <TbBeach className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Group Tours")
    return (
      <FaPeopleGroup className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Individual Travel Packages")
    return <IoWoman className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Adventure Travel")
    return (
      <GiMountainRoad className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Cruise Packages")
    return <GiCruiser className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Luxury Travel")
    return (
      <MdAttachMoney className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Budget Travel")
    return <TbPigMoney className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Eco friendly Travel")
    return <GiTreeDoor className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Cultural Tours")
    return <GiSunbeams className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Religious Tours")
    return (
      <BsMoonStars className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Event Planning & Execution")
    return (
      <MdEventAvailable className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Group Tours & Incentives")
    return (
      <FaPeopleGroup className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Venue Sourcing & Logistics")
    return (
      <BiSolidShoppingBags
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Transportation Management")
    return (
      <MdEmojiTransportation
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Accommodation Arrangements")
    return (
      <HiQueueList className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "On-Site Coordination")
    return (
      <FaPeopleCarry className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <MdEmojiTransportation
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "MICE (Meetings, Incentives, Conferences, Exhibitions)")
    return (
      <PiVideoConference
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "VIP Services")
    return <RiVipLine className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Luxury Travel Experiences")
    return <GiRupee className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Adventure Tourism")
    return <GiAtSea className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Eco-Tourism")
    return <MdEco className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Historical & Cultural Tours")
    return <GiSundial className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Religious Pilgrimages")
    return (
      <GiSunPriest className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Room service")
    return (
      <MdOutlineRoomService
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Housekeeping")
    return (
      <BsFillHouseHeartFill
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Free Wi-Fi")
    return <FaWifi className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Concierge service")
    return (
      <MdWorkspacePremium
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "24-hour front desk")
    return (
      <Ri24HoursLine className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Restaurant and bar")
    return <MdLocalBar className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Laundry service")
    return (
      <GiClothesline className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Fitness center")
    return (
      <IoMdFitness className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Swimming pool")
    return <FaSwimmer className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Airport shuttle")
    return (
      <CiAirportSign1 className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Business Hotels")
    return (
      <LiaHotelSolid className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Boutique Hotels")
    return <IoWoman className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Resort Hotels")
    return <PiPark className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Luxury Hotels")
    return (
      <MdAttachMoney className={cn(className ? className : "", "text-xl")} />
    );
  else if (tag === "Budget Hotels")
    return <TbPigMoney className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Extended Stay Hotels")
    return (
      <LiaCalendarDaySolid
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Airport Hotels")
    return (
      <MdConnectingAirports
        className={cn(className ? className : "", "text-xl")}
      />
    );
  else if (tag === "Eco-Friendly Hotels")
    return <MdEco className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Spa Hotels")
    return <MdSpa className={cn(className ? className : "", "text-xl")} />;
  else if (tag === "Family Hotels")
    return (
      <MdFamilyRestroom className={cn(className ? className : "", "text-xl")} />
    );
  else
    return (
      <RiFlashlightLine className={cn(className ? className : "", "text-xl")} />
    );
};
