import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ButtonFancy = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: String;
}) => {
  return (
    <Button
      className={cn(
        "w-full border-2 border-[#BBBBBB] text-black rounded-full",
        className ?? ""
      )}
    >
      {children}
    </Button>
  );
};
export default ButtonFancy;
