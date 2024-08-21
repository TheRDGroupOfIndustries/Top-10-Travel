import { cn } from "@/lib/utils";
import { BiSolidShoppingBags } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaPeopleGroup,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {
  GiCruiser,
  GiMountainRoad,
  GiSunbeams,
  GiTreeDoor,
} from "react-icons/gi";
import { HiQueueList } from "react-icons/hi2";
import { IoWoman } from "react-icons/io5";
import {
  MdAttachMoney,
  MdEmojiTransportation,
  MdEventAvailable,
  MdOutlineCardTravel,
} from "react-icons/md";
import { PiVideoConference } from "react-icons/pi";
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
      <>
        <MdOutlineCardTravel
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Leisure Travel")
    return (
      <>
        <TbBeach className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Group Tours")
    return (
      <>
        <FaPeopleGroup className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Individual Travel Packages")
    return (
      <>
        <IoWoman className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Adventure Travel")
    return (
      <>
        <GiMountainRoad className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Cruise Packages")
    return (
      <>
        <GiCruiser className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Luxury Travel")
    return (
      <>
        <MdAttachMoney className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Budget Travel")
    return (
      <>
        <TbPigMoney className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Eco friendly Travel")
    return (
      <>
        <GiTreeDoor className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Cultural Tours")
    return (
      <>
        <GiSunbeams className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Religious Tours")
    return (
      <>
        <BsMoonStars className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Event Planning & Execution")
    return (
      <>
        <MdEventAvailable
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Group Tours & Incentives")
    return (
      <>
        <FaPeopleGroup className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Venue Sourcing & Logistics")
    return (
      <>
        <BiSolidShoppingBags
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Transportation Management")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Accommodation Arrangements")
    return (
      <>
        <HiQueueList className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "On-Site Coordination")
    return (
      <>
        <FaPeopleCarry className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "MICE (Meetings, Incentives, Conferences, Exhibitions)")
    return (
      <>
        <PiVideoConference
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else if (tag === "Cultural & Thematic Activities")
    return (
      <>
        <MdEmojiTransportation
          className={cn(className ? className : "", "text-xl")}
        />
      </>
    );
  else
    return (
      <>
        <FaLink className={cn(className ? className : "", "text-xl")} />
      </>
    );
};
