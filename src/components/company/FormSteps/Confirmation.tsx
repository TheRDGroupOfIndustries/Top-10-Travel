"use client";
import { createCompanyAction } from "@/core/server/actions/company/createCompany";
import useMutation from "@/hooks/useMutation";
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
    // console.log(data);
    setIsPending(true);
    const { legalName, country, state, image, companyRole, city, ...cdata } =
      data;
    const { success, error } = await createCompanyAction(
      { legalName, companyRole, country, image, state, city },
      { ...cdata }
    );
    setIsPending(false);
    if (success) {
      await update({ role: "COMPANY" });
      // Handle success here using toast or something
      toast.success(success);
      router.push("/company");
    } else if (error) {
      console.error(error);
      toast.error(error);
      // Handle error here using toast or something
    }
  };
  return (
    <>
      <div className="row-span-2 col-span-2 max-w-xs md:max-w-sm lg:max-w-md">
        {Object.keys(data).map((key) => (
          <p
            key={key}
            className="my-[2%] p-4 border border-gray-500 rounded-md break-words"
          >
            <span className="font-[600] mr-2">{key}</span>
            <span>:</span>
            {
              // @ts-expect-error
              <span className="ml-2 w-full">{data[key]}</span>
            }
          </p>
        ))}
      </div>

      <button
        onClick={handleCreateCompany}
        disabled={isPending}
        className="col-span-1 px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 mr-4 mt-4"
      >
        Create Company
      </button>
    </>
  );
};
export default Confirmation;
