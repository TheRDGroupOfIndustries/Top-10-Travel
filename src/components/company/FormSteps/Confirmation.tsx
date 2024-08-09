"use client";

import { createCompanyAction } from "@/core/server/actions/company/createCompany";
import { Company, CompanyData } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import UploadImage from "./step4";

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
  const [formData, setFormData] = useState(data);

  const handleCreateCompany = async () => {
    setIsPending(true);
    const { legalName, country, state, image, companyRole, city, ...cdata } =
      formData;

    const { success, error } = await createCompanyAction(
      { legalName, companyRole, country, image, state, city },
      { ...cdata }
    );

    setIsPending(false);

    if (success) {
      await update({ role: "COMPANY" });
      toast.success(success);
      router.push("/company");
    } else if (error) {
      console.error(error);
      toast.error(error);
    }
  };
  const handleChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };
  return (
    <>
      <div className="font-normal text-[12px] mt-7 flex px-3 py-4 rounded-lg flex-col gap-2 text-black bg-[#f3f3f3c6] w-full">
        {Object.keys(formData).map((key) => (
          <p
            key={key}
            className="break-words text-sm grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-2"
          >
            <span className="text-sm font-semibold">
              {key}{" "}
              <span className="inline sm:hidden md:inline lg:hidden">
                :&nbsp;
              </span>
            </span>
            {
              <span className="col-span-2 w-full">
                <span className="hidden sm:inline md:hidden lg:inline">
                  :&nbsp;
                </span>
                {
                  // @ts-expect-error
                  formData[key]
                }
              </span>
            }
          </p>
        ))}
        <UploadImage handleChange={handleChange} />
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
        className="px-4 py-1 col-span-1 mt-2 rounded-md disabled:opacity-50 bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
      >
        Create Company
      </button>
    </>
  );
};
export default Confirmation;
