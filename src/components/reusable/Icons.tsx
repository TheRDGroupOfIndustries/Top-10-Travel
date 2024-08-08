import { cn } from "@/lib/utils";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
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
        {text ? "Instagram " : ""}
        <FaInstagram
          className={cn(
            className ? className : "",
            "text-xl md:text-2xl text-pink-600"
          )}
        />
      </>
    );
  else if (host.includes("youtube"))
    return (
      <>
        {text ? "Youtube " : ""}
        <FaYoutube
          className={cn(
            className ? className : "",
            "text-xl md:text-2xl text-red-600"
          )}
        />
      </>
    );
  else if (host.includes("facebook"))
    return (
      <>
        {text ? "FaceBook " : ""}
        <FaFacebook
          className={cn(
            className ? className : "",
            "text-xl md:text-2xl text-blue-600"
          )}
        />
      </>
    );
  else if (host.includes("google"))
    return (
      <>
        {text ? "Google  " : ""}
        <FcGoogle
          className={cn(className ? className : "", "text-xl md:text-2xl")}
        />
      </>
    );
  else if (host.includes("twitter") || host.includes("x.com"))
    return (
      <>
        {text ? "Twitter " : ""}
        <FaXTwitter
          className={cn(className ? className : "", "text-xl md:text-2xl ")}
        />
      </>
    );
  else
    return (
      <>
        <FaLink
          className={cn(
            className ? className : "",
            "text-xl md:text-2xl text-gray-600"
          )}
        />
      </>
    );
};
