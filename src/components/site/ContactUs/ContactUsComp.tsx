"use client";
// import { Linkedin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa6";

import { useState } from "react";
import Link from "next/link";
import useMutation from "@/hooks/useMutation";
import { sendContactEmail } from "@/core/server/actions/contact/contact";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// const iconsArr = [Linkedin, Facebook, Instagram, Twitter, Youtube];
const linksArr = [
  {
    href: "https://www.youtube.com/@TravelTop10",
    icon: <FaYoutube />,
  },
  {
    href: "https://www.facebook.com",
    icon: <FaFacebook />,
  },
  {
    href: "https://www.instagram.com/traveltop10.in/",
    icon: <FaInstagram />,
  },
  {
    href: "https://x.com/traveltop_10",
    icon: <FaTwitter />,
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
      <div className="border-green-600 flex flex-col lg:flex-row justify-between px-4 md:px-8 lg:px-[5%] py-[5%]">
        {/* left view  */}
        <div className="w-full lg:w-[45%] border-red-700 h-auto lg:h-[770px] pt-[2%]">
          <div className="cinzel-font text-3xl md:text-5xl lg:text-[60px] font-[700] leading-[86.27px]">
            <TextGenerateEffect duration={1.2} words={"CONTACT US"} />
          </div>

          <div className="mt-[2%] lg:mt-[4%] text-[15px] font-[500] text-black/50">
            <div className="mb-[15px] lg:w-[108%]">
              <TextGenerateEffect
                duration={0.2}
                className="text-[15px] font-[500] text-black/50"
                words={`Do you have any questions, suggestions, or comments? Do you have a concern with one of our listings? Just fill out the contact form and we will get back to you as soon as we can (typically within one business day)`}
              />
            </div>

            <div className="lg:w-[108%]">
              <TextGenerateEffect
                duration={0.2}
                className="text-[15px] font-[500] text-black/50"
                words={`Do you have any questions, suggestions, or comments? Do you have a concern with one of our listings? Just fill out the contact form and we will get back to you as soon as we can (typically within one business day)`}
              />
            </div>
          </div>

          <div className="text-[19px] font-[500] text-black/50 mt-[8%]">
            <p>Top10Travel agency@</p>
            <p>302 354 7282</p>
          </div>

          <div className="text-[20px] font-[500] text-black mt-[13%] underline underline-offset-[20%]">
            Customer Support
            {/* logos */}
            <div className="flex gap-3 items-center mt-[2%]">
              {linksArr.map(({ href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="w-5 h-5 hover:scale-150 transition-all duration-300 cursor-pointer"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-row gap-2 mt-[18%]">
            <div className=" border-red-500 w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Customer Support
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50 w-[191px] lg:w-[140px] mt-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
            <div className="border-red-500 w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Feedback and Suggestions
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50 w-[191px] lg:w-[140px] mt-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
            <div className="border-red-500 w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Media Inquiries
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50 w-[191px] lg:w-[140px] mt-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
          </div>
        </div>

        {/* right view */}
        <div className="w-full lg:w-[45%] border-red-700 mt-10 lg:mt-0">
          <div className="border-green-500 w-full h-auto lg:h-[770px] rounded-[30px] shadow-gray-500 shadow-md p-4 md:p-8 flex flex-col justify-center">
            <div className="w-fit h-fit border-blue-950">
              <p className="cinzel-font text-2xl md:text-3xl lg:text-[40px] font-[700]">
                Get In Touch
              </p>
              <p className="text-[14px] font-[500]">
                You can reach us anytime.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 border-green-600 mt-[7%]"
              >
                <div className="flex flex-col sm:flex-row gap-7">
                  <input
                    required
                    type="text"
                    className="border border-black w-full sm:w-[47%] h-[63px] rounded-[30px] pl-[40px]"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    required
                    type="text"
                    className="border border-black w-full sm:w-[47%] h-[63px] rounded-[30px] pl-[40px]"
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
                    className="border border-black w-full h-[63px] rounded-[30px] pl-[40px]"
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
                    className="border border-black w-full h-[63px] rounded-[30px] pl-[40px]"
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
                    className="border border-black w-full h-[179px] rounded-[30px] pl-[40px] pt-[5%]"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="text-[32px] font-[500] border disabled:opacity-50 border-black w-full h-[68px] rounded-[30px] text-white bg-black mt-4"
                >
                  Submit
                </button>
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
