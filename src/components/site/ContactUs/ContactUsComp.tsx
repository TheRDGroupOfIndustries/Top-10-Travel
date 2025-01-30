"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { sendContactEmail } from "@/core/server/actions/contact/contact";
import useMutation from "@/hooks/useMutation";
import emailIcon from "@/resources/icons/EmailIcon.png";
import phoneIcon from "@/resources/icons/PhoneIcon.png";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { toast } from "sonner";

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
  // const session = useSession();

  const [countries, setCountries] = useState<
    { name: string; flag: string; dialCode: string }[]
  >([]);
  const [selectedDialCode, setSelectedDialCode] = useState("+91"); // Default to India

  const { mutate, isPending } = useMutation(sendContactEmail);

  console.log("Countries:", `${selectedDialCode} ${contact}`);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if(session.status === "authenticated" ) {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !contact.trim() ||
      !message.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }

    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: `${selectedDialCode} ${contact}`,
      message: message,
    };

    const { error, success } = await mutate({
      name: obj.firstName + " " + obj.lastName,
      email: obj.email,
      phone: obj.contact,
      message: obj.message,
    });

    if (success) {
      toast.success(success);

      setFirstName("");
      setLastName("");
      setEmail("");
      setContact("");
      setMessage("");
    } else if (error) toast.error(error);
    // }
    // else {
    //    toast.error("You must log in to your account before proceeding.");
    // }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode"
        );
        const data = await response.json();
        if (data.data) {
          const sortedCountries = data.data.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
          setCountries(sortedCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
      <div className="items-center flex gap-3 cinzel-font text-3xl md:text-5xl lg:text-[60px] font-[700] px-4 md:px-8 lg:px-[5%] md:pt-10">
        <h1 className="font-thin mt-5">
          Contact <span className="text-mainColor">Us</span>
        </h1>
      </div>
      <div className="sm:text-xl text-gray-400 my-1 px-4 md:px-8 lg:px-[5%]">
        Have queries? Let&apos;s us help you!
      </div>

      <div className="items-baseline flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between px-4 md:px-8 lg:px-[5%] md:py-10">
        {/* left view  */}
        <div className="w-full order-2 lg:order-1 lg:w-[45%] border-red-700">
          <div className="text-[19px] font-[500] text-black/50 mt-[8%]">
            <div className="my-2">
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
                  <a href="mailto:contact@traveltop10.in">
                    contact@traveltop10.in
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-[20px] font-[500] text-black mt-[13%] underline underline-offset-[20%]">
            Follow us
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
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50 w-full md:w-[191px] lg:w-[140px] sm:mt-[5%] sm:mb-0 mb-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
            <div className="border-red-500 w-full md:w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Feedback and Suggestions
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50  w-full md:w-[191px] lg:w-[140px] sm:mt-[5%] sm:mb-0 mb-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
            <div className="border-red-500 w-full md:w-[35%]">
              <p className="text-[19px] lg:text-[15px] font-[500] w-[100%]">
                Media Inquiries
              </p>
              <p className="text-[15px] lg:text-[12px] font-[500] text-black/50  w-full md:w-[191px]  lg:w-[140px] sm:mt-[5%] sm:mb-0 mb-[5%]">
                Our Support team is available around the clock to address any
                concerns and queries you may have
              </p>
            </div>
          </div>
        </div>

        {/* right view */}
        <div className="w-full lg:order-2 lg:w-[45%] border-red-700">
          <div className="border-green-500 w-full h-auto flex flex-col md:justify-center">
            <div className=" border-blue-950">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 border-green-600 my-10 md:my-0"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-7">
                  <input
                    required
                    type="text"
                    className="w-full sm:w-[49%] lg:h-[63px] h-10 rounded-lg bg-slate-100 pl-5"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <input
                    required
                    type="text"
                    className="w-full sm:w-[49%] lg:h-[63px] h-10 rounded-lg bg-slate-100 pl-5"
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
                    className="w-full lg:h-[63px] h-10 rounded-lg bg-slate-100 pl-5"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-2">
              

                  {/* <input
                    required
                    type="number" // Use text to control input manually
                    
                    inputMode="numeric" // Shows number keyboard on mobile
                    className="w-full lg:h-[63px] h-10 rounded-lg bg-slate-100 pl-5 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                    placeholder="Phone Number"
                    value={contact}
                    onChange={(e: any) => {
                      let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      if (value.length > 15) {
                        value = value.slice(0, 15); // Trim input to 15 digits
                      }
                      setContact(value);
                    }}
                  /> */}

                  <PhoneInput
                    defaultCountry="in"
                    value={contact}
                    onChange={(phone) => setContact(phone)}
                  />
                </div>
                <div>
                  <textarea
                    required
                    minLength={10}
                    className="w-full lg:h-[179px] h-16 rounded-lg bg-slate-100 p-5 lg:pt-[5%]"
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
                    className="lg:text-xl text-lg font-[500] disabled:opacity-50 sm:w-24 w-20 sm:h-12 h-10 rounded-lg text-white bg-mainColor hover:bg-opacity-80"
                  >
                    Send
                  </button>
                </div>
              </form>
              <div className="text-[17px] font-[500] w-full text-black/50 mx-auto mt-6 border-green-500 text-center">
                By contacting us, you agree to our
                <Link
                  href="/terms-conditions"
                  className="text-black mx-1 hover:underline"
                >
                  Terms of Service
                </Link>
                and
                <Link
                  href="/privacy-policy"
                  className="text-black mx-1 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUsComp;
