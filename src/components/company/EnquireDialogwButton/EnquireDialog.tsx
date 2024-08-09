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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createEnquiryAction } from "@/core/server/actions/Enquiry/createEnquiry";
import useMutation from "@/hooks/useMutation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function EnquireDialog({
  images,
  name,
  className,
}: {
  images?: string[];
  name: string;
  className?: string;
}) {
  const [response, setResponse] = useState<{
    error?: string;
    success?: string;
  }>({});
  const { open, setOpen } = useModal();
  const params = useParams();
  const { isPending, mutate } = useMutation(createEnquiryAction);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const name = e.target[0].value;
    // @ts-expect-error
    const email = e.target[1].value;
    // @ts-expect-error
    const message = e.target[2].value;
    // console.log(name, email, message);
    setResponse({});

    const res = await mutate({
      name,
      email,
      message,
      companyId: params.companyId as string,
    });
    setOpen(false);
    if (res.success) {
      setTimeout(() => window.print(), 200);
    }
    setResponse(res);

    response.success && toast.success(response.success);
    response.error && toast.error(response.error);
  };

  // return (
  //   <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
  //     <DialogTrigger asChild>
  //       <Button variant="outline" className={cn("rounded-full", className)}>
  //         Contact Us
  //       </Button>
  //     </DialogTrigger>

  //     <DialogContent className="sm:max-w-[425px]">
  //       <DialogHeader>
  //         <DialogTitle>Contact {name}</DialogTitle>
  //         <DialogDescription>
  //           Contact {name} regarding any queries.
  //         </DialogDescription>
  //       </DialogHeader>
  //       {response.error && (
  //         <span className="bg-destructive text-destructive-foreground p-2 rounded-md">
  //           {response.error}
  //         </span>
  //       )}
  //       {response.success && (
  //         <span className="text-green-500">{response.success}</span>
  //       )}
  //       <form
  //         onSubmit={handleSubmit}
  //         className="flex items-start flex-col gap-4"
  //       >
  //         <div className="w-full flex flex-col gap-[2px]">
  //           <label htmlFor="name" className="p-2">
  //             Name
  //           </label>
  //           <Input
  //             id="name"
  //             name="name"
  //             type="text"
  //             placeholder="Enter your name"
  //             required
  //           />
  //         </div>
  //         <div className="w-full flex flex-col gap-[2px]">
  //           <label htmlFor="email" className="p-2">
  //             Email
  //           </label>
  //           <Input
  //             id="email"
  //             name="email"
  //             type="email"
  //             placeholder="Enter your email"
  //             required
  //           />
  //         </div>
  //         <div className="w-full flex flex-col gap-[2px]">
  //           <label htmlFor="message" className="p-2">
  //             Message
  //           </label>
  //           <Input
  //             id="message"
  //             name="message"
  //             type="text"
  //             placeholder="Enter your message"
  //             required
  //           />
  //         </div>
  //         <DialogFooter>
  //           <Button disabled={isPending} type="submit">
  //             {isPending ? "Sending Query..." : "Send Query"}
  //           </Button>
  //         </DialogFooter>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black rounded-full dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-base rounded-full text-center transition duration-500">
            Contact Us
          </span>
          <div className="-translate-x-40 rounded-full group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📞
          </div>
        </ModalTrigger>
        <ModalBody>
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
              {/* {response.error && (
                <span className="bg-destructive text-destructive-foreground rounded-md">
                  {response.error}
                </span>
              )}
              {response.success && (
                <span className="text-green-500">{response.success}</span>
              )} */}

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
                      <img
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
                  <label
                    htmlFor="name"
                    className="p-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-[2px]">
                  <label
                    htmlFor="email"
                    className="p-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-[2px]">
                  <label
                    htmlFor="message"
                    className="p-1"
                  >
                    Message
                  </label>
                  <Input
                    id="message"
                    name="message"
                    type="text"
                    placeholder="Enter your message"
                    required
                  />
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="w-full">
              <button
                disabled={isPending}
                type="submit"
                className="bg-black w-fit text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
              >
                {isPending ? "Sending Query..." : "Send Query"}
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const PlaneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};
