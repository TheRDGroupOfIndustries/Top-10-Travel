"use client";

import { createCompanyAction } from "@/core/server/actions/company/createCompany";
import { Company, CompanyData } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormData = Omit<
  Company,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "user"
  | "userId"
  | "priority"
  | "isSuspended"
  | "isCertified"
  | "rating"
  | "reviews"
  | "methodology"
  | "state_priority"
> &
  Omit<CompanyData, "id" | "socialLinks" | "images" | "companyId">;

const Confirmation = ({ data }: { data: FormData }) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { update, data: session } = useSession();

  const handleCreateCompany = async () => {
    setIsPending(true);
    const { legalName, country, state, image, companyRole, city, ...cdata } = data;
    
    const { success, error } = await createCompanyAction(
      { legalName, companyRole, country, image, state, city },
      { ...cdata }
    );
    
    setIsPending(false);

    if (success) {
      await update({ role: "COMPANY" });
      toast.success(success);
      router.push("/company")
    } else if (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="font-normal text-[12px] mt-7 flex px-3 py-4 rounded-lg flex-col gap-2 text-black bg-[#f3f3f3c6] w-full">
        {Object.keys(data).map((key) => (
          <p key={key} className="break-words text-xs grid grid-cols-3 gap-2 ">
            <span className="text-[11px]">{key}</span>
            {
              // @ts-expect-error
              <span className="col-span-2 w-full">:&nbsp;{data[key]}</span>
            }
          </p>
        ))}
      </div>

      {/* <button
        onClick={handleCreateCompany}
        disabled={isPending}
        className="col-span-1 px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 mr-4 mt-4"
      >
        Create Company
      </button> */}

      <button
        onClick={handleCreateCompany}
        disabled={isPending}
        className="px-4 py-1 col-span-1 mt-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
      >
        Create Company
      </button>
    </>
  );
};
export default Confirmation;
