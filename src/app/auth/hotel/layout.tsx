import { ReactNode } from "react";
import img from "@/resources/images/form/CompanyForm.png";
import Image from "next/image";

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 h-screen overflow-hidden">
      <div className="h-full w-full hidden lg:flex xl:col-span-1">
        <Image
          src={img}
          alt="Company Form"
          width={500}
          height={400}
          className="h-full w-full object-cover object-top"
        />
      </div>
      {children}
    </div>
  );
};
export default FormLayout;
