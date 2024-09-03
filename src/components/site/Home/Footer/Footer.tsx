import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const contactInfo = [
  { icon: Phone, text: "+91 9358XXXXX" },
  { icon: Mail, text: "Top10travelagency@gmail.com" },
  {
    icon: MapPin,
    text: "Office No 9 to 10 & 17 to 27 Liberty Plaza 3-6-365, Himaythnagar , Hyderabad (India)",
  },
];

const companyLinks = [
  "About Us",
  "Services",
  "Privacy Policy",
  "Terms & Conditions",
  "Contact Us",
];

const top10Links: { name: string; link: string }[] = [
  { name: "Travel Agencies", link: "/Agency" },
  { name: "Hotels", link: "/Hotels" },
  { name: "DMC", link: "/DMC" },
  { name: "Influencers", link: "/Influencers" },
];

const socialIcons = [
  {
    href: "https://www.facebook.com",
    icon: FaFacebook,
  },
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
];

function Footer() {
  return (
    <div className="bg-colorAll pt-4 sm:pt-10 lg:pt-12 mt-20">
      <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-16 grid grid-cols-2 gap-12 pt-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 lg:pt-5">
          <div className="col-span-full lg:col-span-2">
            <div className="mb-4 lg:-mt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl"
                aria-label="logo"
              >
                <svg
                  width="95"
                  height="94"
                  viewBox="0 0 95 94"
                  className="h-auto w-5 text-black"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                </svg>
                LOGO
              </Link>
            </div>

            <p className="mb-6 cursor-default sm:pr-8 font-semibold">
              Experience the Extraordinary: Top Travel Experts, Hotels, and
              Agencies at Your Fingertips
            </p>

            <div className="flex flex-col items-start justify-center gap-4">
              {contactInfo?.map((item, index) => (
                <div
                  key={index}
                  className="flex hover:scale-110 transition-all duration-500 cursor-pointer items-center justify-center gap-2 font-semibold"
                >
                  <span className="flex-1">
                    <item.icon className="w-5 h-5 stroke-black" />
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-xl md:text-2xl">
              Company
            </div>
            <nav className="flex flex-col gap-4">
              {companyLinks?.map((link, index) => (
                <div key={index}>
                  <Link href="#" className="cool-link-black font-medium">
                    {link}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Top 10 Links */}
          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-xl md:text-2xl">
              TOP 10
            </div>
            <nav className="flex flex-col gap-4">
              {top10Links?.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.link}
                    className="cool-link-black font-medium"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Social Icons */}
          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-xl md:text-2xl">
              Follow us
            </div>
            <nav className="flex items-center justify-start gap-5">
              {socialIcons?.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="hover:scale-150 transition-all duration-300 cursor-pointer"
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="cursor-default select-none border-t py-8 text-center text-sm font-semibold">
          All rights Reserved © Top 10 Travel, {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
