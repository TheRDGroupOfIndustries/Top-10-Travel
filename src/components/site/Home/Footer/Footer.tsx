import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaReddit,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
// Update

const contactInfo = [
  // { icon: Phone, text: "+91 9358XXXXX" },
  { name: "email", icon: Mail, text: "contact@traveltop10.in" },
  { name: "address", icon: MapPin, text: "Hyderabad, India." },
];

const companyLinks = [
  {
    name: "About Us",
    link: "/Aboutus",
  },
  // {
  //   name: "Services",
  //   link: "/#",
  // },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    link: "/terms-conditions",
  },
  {
    name: "Contact Us",
    link: "/ContactUs",
  },
];

const top10Links: { name: string; link: string }[] = [
  { name: "Agencies", link: "/Agency" },
  { name: "Hotels", link: "/Hotels" },
  { name: "DMC", link: "/DMC" },
  { name: "Influencers", link: "/Influencers" },
];

const socialIcons = [
  // {
  //   href: "https://www.facebook.com",
  //   icon: FaFacebook,
  // },
  {
    href: "https://www.youtube.com/@TravelTop10",
    icon: FaYoutube,
  },
  {
    href: "https://x.com/traveltop_10",
    icon: FaXTwitter,
  },
  {
    href: "https://www.instagram.com/traveltop10.in/",
    icon: FaInstagram,
  },
  // {
  //   href: "https://www.instagram.com/traveltop10.in/",
  //   icon: FaReddit,
  // },
];

function Footer() {
  return (
    <div className="bg-mainColor pt-4 sm:pt-10 lg:pt-12 mt-20 h-auto">
      <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-8 grid grid-cols-2 gap-12 pt-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 lg:pt-5">
          <div className="col-span-full lg:col-span-2">
            <div className="relative mb-6 h-6 xs:h-7 sm:h-8">
            <Link href="/" className="flex gap-2">
                <Image src="/roundLogo.jpg" className="rounded-full" alt="logo" width={40} height={30} />
                <h1
          id="secondLine"
          className="uppercase font-cinzel font-bold text-3xl mt-1"
        >
          <span
            className="inline-block"
          >
            travel <span className="text-white">Top 10</span>
          </span>
        </h1>
              </Link>
            </div>

            <p className="mb-6 cursor-default text-white sm:pr-8 font-semibold">
              Experience the Extraordinary: Top Travel Experts, Hotels, and
              Agencies at Your Fingertips
            </p>

            <div className="flex flex-col items-start justify-center gap-4">
              {contactInfo?.map((item, index) =>
                item.name === "email" ? (
                  <Link href={`mailto:${item.text}`} key={index}>
                    <div
                      key={index}
                      className="flex hover:scale-110 transition-all text-white duration-500 cursor-pointer items-center justify-center gap-2 font-semibold"
                    >
                      <span className="flex-1">
                        <item.icon className="w-5 h-5 stroke-white" />
                      </span>
                      <span>{item.text}</span>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={index}
                    className="flex hover:scale-110 transition-all text-white duration-500 cursor-pointer items-center justify-center gap-2 font-semibold"
                  >
                    <span className="flex-1">
                      <item.icon className="w-5 h-5 stroke-white" />
                    </span>
                    <span>{item.text}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <div className="mb-4 font-bold text-white uppercase tracking-widest text-xl md:text-2xl">
              Company
            </div>
            <nav className="flex flex-col gap-2">
              {companyLinks?.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.link}
                    className="cool-link-black text-white font-medium"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Top 10 Links */}
          <div>
            <div className="mb-4 font-bold uppercase text-white tracking-widest text-xl md:text-2xl">
              TOP 10
            </div>

            <nav className="flex flex-col text-white gap-2">
              {top10Links?.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.link}
                    className="cool-link-black text-white font-medium"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Social Icons */}
          <div>
            <div className="mb-4 text-white font-bold uppercase tracking-widest text-xl md:text-2xl">
              Follow us
            </div>
            <nav className="flex items-center justify-start gap-5">
              {socialIcons?.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="hover:scale-150 transition-all duration-300 cursor-pointer"
                >
                  <item.icon className="w-5 text-white h-5" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="cursor-default text-white select-none border-t py-4 text-center text-sm font-semibold">
          All rights Reserved © Travel Top 10, {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
