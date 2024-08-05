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
    <button className="group relative inline-flex items-center justify-start overflow-hidden rounded-xl lg:px-5 lg:py-3 py-2 px-3 font-bold">
      <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-slate-800 opacity-[3%]"></span>
      <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-slate-800 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
      <span
        className={cn(
          "relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white",
          className
        )}
      >
        {children}
      </span>
      <span className="absolute inset-0 rounded-xl border-2 hover:border-slate-800 border-black"></span>
    </button>
  );
};
export default ButtonFancy;
