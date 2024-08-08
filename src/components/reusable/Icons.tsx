import {
    FaFacebook,
    FaInstagram,
    FaLink,
    FaXTwitter,
    FaYoutube,
  } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

  
export const getIconFromName = (str: string) => {
    const host = str.toLowerCase();
    if (host.includes("instagram"))
      return (
        <>
          Instagram <FaInstagram className="text-xl md:text-2xl text-pink-600" />
        </>
      );
    else if (host.includes("youtube"))
      return (
        <>
          YouTube <FaYoutube className="text-xl md:text-2xl text-red-600" />
        </>
      );
    else if (host.includes("facebook"))
      return (
        <>
          Facebook <FaFacebook className="text-xl md:text-2xl text-blue-600" />
        </>
      );
    else if (host.includes("google"))
      return (
        <>
          Google <FcGoogle className="text-xl md:text-2xl" />
        </>
      );
    else if (host.includes("twitter") || host.includes("x.com"))
      return (
        <>
          Twitter <FaXTwitter className="text-xl md:text-2xl text-black" />
        </>
      );
    else
      return (
        <>
          Link <FaLink className="text-xl md:text-2xl text-gray-600" />
        </>
      );
  };