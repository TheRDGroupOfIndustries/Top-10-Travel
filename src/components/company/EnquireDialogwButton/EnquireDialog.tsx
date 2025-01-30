"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { createEnquiryAction } from "@/core/server/actions/Enquiry/createEnquiry";
import useMutation from "@/hooks/useMutation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { toast } from "sonner";

export default function EnquireDialog({
  images,
  name,
  className,
  type = "Details",
  info,
}: {
  images?: string[];
  name: string;
  type?: "Details" | "Listing";
  className?: string;

  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
}) {
  const [response, setResponse] = useState<{
    error?: string;
    success?: string;
  }>({});
  const { open, setOpen } = useModal();
  const params = useParams();
  const { isPending, mutate } = useMutation(createEnquiryAction);

  const [countries, setCountries] = useState<
    { name: string; flag: string; dialCode: string }[]
  >([]);
  const [selectedDialCode, setSelectedDialCode] = useState("+91"); // Default to India
  const [phoneNumber, setPhoneNumber] = useState("");

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
          console.log("Countries fetched:", sortedCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const message = e.target[2].value;
    const formattedPhoneNumber = `${selectedDialCode} ${phoneNumber}`;

    setResponse({});

    const res = await mutate({
      values: { message, phoneNumber: formattedPhoneNumber },
      info,
    });
    setOpen(false);

    setResponse(res);
  };
  useEffect(() => {
    response.success && toast.success(response.success);
    response.error && toast.error(response.error);
  }, [response]);

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        type === "Details" ? "flex-1" : ""
      )}
    >
      <Modal>
        {type === "Details" ? (
          <ModalTrigger className="w-full border-black border-[1px] rounded-full sm:text-xl min-[421px]:text-base text-xs font-medium transform hover:-translate-y-1 transition duration-200 hover:shadow-md">
            Enquire now
          </ModalTrigger>
        ) : (
          <ModalTrigger className="xs:text-lg text-base group flex bg-white text-mainColor border-mainColor border-[2px] rounded-md hover:bg-mainColor hover:text-white">
            <span>Enquire now</span>
            <TbPhoneCall size={20} className="stroke-2 ml-1" />
          </ModalTrigger>
        )}

        <ModalBody>
          <div className="md:h-[620px] overflow-y-scroll overflow-x-hidden w-full h-[500px] rounded-md border">
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col"
            >
              <ModalContent className="w-full">
                <h4 className="text-lg md:text-xl xl:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center xl:mb-7 md:mb-5 mb-4">
                  Contact
                  <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                    {name}
                  </span>
                  &nbsp;✉️
                </h4>

                <div className="flex justify-center items-center">
                  {images &&
                    images.map((image: string, idx: number) => (
                      <motion.div
                        key={"images" + idx}
                        style={{
                          rotate: Math.random() * 20 - 10,
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 0,
                          zIndex: 100,
                        }}
                        whileTap={{
                          scale: 1.1,
                          rotate: 0,
                          zIndex: 100,
                        }}
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt="bali images"
                          width="500"
                          height="500"
                          className="rounded-lg h-20 w-20 md:h-36 md:w-36 object-cover flex-shrink-0"
                        />
                      </motion.div>
                    ))}
                </div>
                <div className="py-2 flex flex-wrap gap-x-4 gap-y-1 items-start justify-start max-w-sm mx-auto">
                  <div className="w-full flex flex-col gap-[2px]">
                    <label htmlFor="phoneNumber" className="p-1">
                      Phone Number:
                    </label>
                    <div className="flex gap-2">
                      {/* Country Selector */}
                      <select
                        className="p-2 border rounded-md w-[150px]"
                        value={selectedDialCode}
                        onChange={(e) => setSelectedDialCode(e.target.value)}
                      >
                        {countries.map((country) => (
                          <option
                            key={country.dialCode + country.name}
                            value={country.dialCode}
                            className="flex flex-row items-center gap-2"
                          >
                            <div className="flex items-center gap-2">
                              {/* <Image
                                src={`${country.flag}`}
                                alt={country.name}
                                width={20}
                                height={15}
                              /> */}
                              {country.name} ({country.dialCode})
                            </div>
                          </option>
                        ))}
                      </select>

                      {/* Phone Number Input */}
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        min={6}
                        max={15}
                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-[2px]">
                    <label htmlFor="message" className="p-1">
                      Message :-
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter message"
                      required
                    />
                  </div>
                </div>
              </ModalContent>
              <ModalFooter className="w-full">
                <button
                  disabled={isPending}
                  type="submit"
                  className="bg-black w-fit text-white disabled:opacity-50 dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
                >
                  {isPending ? "Sending Query..." : "Send Query"}
                </button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
