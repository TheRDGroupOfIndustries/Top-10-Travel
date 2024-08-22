import { cn } from "@/lib/utils";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const getIconFromName = (str: string, className?: string) => {
  const host = str.toLowerCase();
  if (host.includes("instagram"))
    return (
      <>
        <FaInstagram
          className={cn(className ? className : "", "text-pink-600")}
        />
      </>
    );
  else if (host.includes("youtube"))
    return (
      <>
        <FaYoutube className={cn(className ? className : "", "text-red-600")} />
      </>
    );
  else if (host.includes("linkedin"))
    return (
      <>
        <FaLinkedinIn
          className={cn(className ? className : "", "text-[#0A66C2]")}
        />
      </>
    );
  else if (host.includes("facebook"))
    return (
      <>
        <FaFacebook
          className={cn(className ? className : "", "text-[#0866FF]")}
        />
      </>
    );
  else if (host.includes("google"))
    return (
      <>
        <FcGoogle className={cn(className ? className : "")} />
      </>
    );
  else if (host.includes("twitter") || host.includes("x.com"))
    return (
      <>
        <FaXTwitter className={cn(className ? className : "")} />
      </>
    );
  else
    return (
      <>
        <FaLink className={cn(className ? className : "", "text-gray-600")} />
      </>
    );
};
