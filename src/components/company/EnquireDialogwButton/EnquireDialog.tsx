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
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
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

  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !phoneNumber) return;

    setResponse({});

    const res = await mutate({
      values: { message, phoneNumber: phoneNumber },
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
                <div className="py-2 flex-1 ">
                  <div className="w-full flex flex-col gap-[2px] enquire-message">
                    <label htmlFor="phoneNumber" className="p-1">
                      Phone Number:
                    </label>
                    <div className="flex gap-2">
                      <PhoneInput
                        defaultCountry="in"
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-[2px]  ">
                    <label htmlFor="message" className="p-1">
                      Message :-
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className=" rounded-lg"
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
