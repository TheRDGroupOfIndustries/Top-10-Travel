// components/PhoneCallButton.tsx
import Link from "next/link";
import React from "react";

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
  return (
    <div
      className={`border-black h-full grid place-items-center text-center w-1/3 border-[1px] rounded-full text-xl leading-6 font-medium transform hover:-translate-y-1 transition duration-200 hover:shadow-md ${className}`}
    >
      <Link href={`tel:${phoneNumber}`} className="w-full">
        {label}
      </Link>
    </div>
  );
};

export default PhoneCallButton;
