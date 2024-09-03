// components/PhoneCallButton.tsx
"use client";
import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

type PhoneCallButtonProps = {
  phoneNumber: string;
  label?: string;
  className?: string;
};

const PhoneCallButton: React.FC<PhoneCallButtonProps> = ({
  phoneNumber,
  label = "Call Us",
  className = "",
}) => {
  const session = useSession();

  return (
    <div
      className={cn(
        `border-black h-full grid place-items-center cursor-pointer text-center w-1/3 border-[1px] rounded-full sm:text-xl min-[421px]:text-base text-xs font-medium transform hover:-translate-y-1 transition duration-200 hover:shadow-md`,
        className
      )}
    >
      {session.status !== "authenticated" ? (
        <span onClick={() => signIn("google")}>{label}</span>
      ) : (
        <Link href={`tel:${phoneNumber}`} className="">
          {label}
        </Link>
      )}
    </div>
  );
};

export default PhoneCallButton;
