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

export const getIconFromName = (
  str: string,
  text: boolean = true,
  className?: string
) => {
  const host = str.toLowerCase();
  if (host.includes("instagram"))
    return (
      <>
        <span className="lg:hidden sm:inline-block hidden">{text ? "Instagram " : ""}</span>
        <FaInstagram
          className={cn(className ? className : "", "text-xl text-pink-600")}
        />
      </>
    );
  else if (host.includes("youtube"))
    return (
      <>
        <span className="lg:hidden sm:inline-block hidden">{text ? "Youtube " : ""}</span>
        <FaYoutube
          className={cn(className ? className : "", "text-xl text-red-600")}
        />
      </>
    );
  else if (host.includes("linkedin"))
    return (
      <>
      <span className="lg:hidden sm:inline-block hidden">{text ? "Linkedin " : ""}</span>
        <FaLinkedinIn
          className={cn(className ? className : "", "text-xl text-[#0A66C2]")}
        />
      </>
    );
  else if (host.includes("facebook"))
    return (
      <>
        <span className="lg:hidden sm:inline-block hidden">{text ? "FaceBook " : ""}</span>
        <FaFacebook
          className={cn(className ? className : "", "text-xl text-[#0866FF]")}
        />
      </>
    );
  else if (host.includes("google"))
    return (
      <>
        <span className="lg:hidden sm:inline-block hidden">{text ? "Google  " : ""}</span>
        <FcGoogle className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else if (host.includes("twitter") || host.includes("x.com"))
    return (
      <>
        <span className="lg:hidden sm:inline-block hidden">{text ? "Twitter " : ""}</span>
        <FaXTwitter className={cn(className ? className : "", "text-xl")} />
      </>
    );
  else
    return (
      <>
        <FaLink
          className={cn(className ? className : "", "text-xl text-gray-600")}
        />
      </>
    );
};
