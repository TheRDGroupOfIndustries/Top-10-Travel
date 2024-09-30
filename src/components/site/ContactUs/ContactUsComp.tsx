"use client";
// import { Linkedin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { sendContactEmail } from "@/core/server/actions/contact/contact";
import useMutation from "@/hooks/useMutation";
import emailIcon from "@/resources/icons/EmailIcon.png";
import phoneIcon from "@/resources/icons/PhoneIcon.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
// import { PhoneIcon } from "lucide-react";

const linksArr = [
  {
    href: "https://www.youtube.com/@TravelTop10",
    icon: <FaYoutube />,
  },
  {
    href: "https://x.com/traveltop_10",
    icon: <FaXTwitter />,
  },
  {
    href: "https://www.instagram.com/traveltop10.in/",
    icon: <FaInstagram />,
  },
];

const ContactUsComp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isPending } = useMutation(sendContactEmail);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      message: message,
    };
    const { error, success } = await mutate({
      name: obj.firstName + " " + obj.lastName,
      email: obj.email,
      phone: obj.contact,
      message: obj.message,
    });
    if (success) toast.success(success);
    else if (error) toast.error(error);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        type: "spring",
      }}
      viewport={{ once: true }}
      className="pt-20 border-red-800"
    >
      <div className="border-green-600 items-baseline flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between px-4 md:px-8 lg:px-[5%] md:py-10">
        {/* left view  */}
        <div className="w-full lg:w-[45%] border-red-700">
          <div className="items-center flex gap-3 cinzel-font text-3xl md:text-5xl lg:text-[60px] font-[700]">
            <TextGenerateEffect
              className="font-thin"
              duration={1.2}
              words={"CONTACT"}
            />
            <h1 className="font-thin text-mainColor mt-5">US</h1>
          </div>
          <p className="text-xl text-gray-400 my-1">
            Have queries? Let&apos;s us help you!
          </p>

          <div className="text-[19px] font-[500] text-black/50 mt-[8%]">
            <div className="my-5">
              <p className="text-3xl font-semibold text-black">Email</p>
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={emailIcon}
                    alt="emailIcon"
                    height="30"
                    width="30"
                  />
                </div>
                <p className="my-2 cursor-pointer text-mainColor hover:underline text-lg">
                  <a href="mailto:indiatraveltop10@gmail.com">
                    indiatraveltop10@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-[20px] font-[500] text-black mt-[13%] underline underline-offset-[20%]">
            Customer Support
            {/* logos */}
            <div className="flex gap-3 items-center mt-[2%]">
              {linksArr.map(({ href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center p-1 hover:scale-150 transition-all duration-300 cursor-pointer border-2 border-mainColor rounded-full"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-row gap-2 mt-[18%]">
            <div className=" border-red-500 w-full md:w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Customer Support
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50 w-full md:w-[191px] lg:w-[140px] mt-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
            <div className="border-red-500 w-full md:w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Feedback and Suggestions
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50  w-full md:w-[191px] lg:w-[140px] mt-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
            <div className="border-red-500 w-full md:w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Media Inquiries
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50  w-full md:w-[191px]  lg:w-[140px] mt-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
          </div>
        </div>

        {/* right view */}
        <div className="w-full lg:w-[45%] border-red-700">
          <div className="border-green-500 w-full h-auto flex flex-col md:justify-center">
            <div className=" border-blue-950">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 border-green-600 my-10 md:my-0"
              >
                <div className="flex flex-col sm:flex-row gap-7">
                  <input
                    required
                    type="text"
                    className="w-full sm:w-[49%] h-[63px] rounded-lg bg-slate-100 pl-5"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    required
                    type="text"
                    className="w-full sm:w-[49%] h-[63px] rounded-lg bg-slate-100 pl-5"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    required
                    type="email"
                    className="w-full h-[63px] rounded-lg bg-slate-100 pl-5"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    required
                    type="number"
                    className="w-full h-[63px] rounded-lg bg-slate-100 pl-5"
                    placeholder="Phone Number"
                    value={contact}
                    onChange={(e: any) => {
                      setContact(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    required
                    minLength={10}
                    className="w-full h-[179px] rounded-lg bg-slate-100 pl-5 pt-[5%]"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="text-[32px] font-[500] disabled:opacity-50 w-1/3 h-[68px] rounded-lg text-white bg-mainColor mt-4"
                  >
                    Send
                  </button>
                </div>
              </form>
              <div className="text-[17px] font-[500] w-full text-black/50 mx-auto mt-4 border-green-500 text-center">
                By contacting us, you agree to our
                <span className="text-black mx-1">Terms of Service</span>
                and
                <span className="text-black mx-1">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUsComp;
