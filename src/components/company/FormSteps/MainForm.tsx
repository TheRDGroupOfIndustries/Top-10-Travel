"use client";
import React, { useRef, useState } from "react";
import UserNameEmail from "@/components/company/FormSteps/step1";
import AddressDetail from "@/components/company/FormSteps/step2";
import CompanyNumbers from "@/components/company/FormSteps/step3";
import Confirmation from "@/components/company/FormSteps/Confirmation";
import { $Enums } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import img from "@/resources/images/form/CompanyForm.png";
import ProgressBar from "./ProgressBar";

const MainForm: React.FC = () => {
  const formRef = useRef(null);
  const session = useSession();

  const [data, setData] = useState([
    {
      legalName: "",
      phone: "",
      companyContact: "",
      companyRole: "DMC" as $Enums.CompanyRole,
      companyEmail: "",
      ownerName: "",
      ownerContact: "",
    },
    {
      address: "",
      country: "India",
      state: "Uttar Pradesh",
      city: "Lucknow",
      pincode: "",
    },
    {
      agencyGroup: "",
      business_reg_number: "",
      iata_number: "",
      abta_number: "",
      clia_number: "",
      tids_number: "",
      image: "",
    },
  ]);

  const handleChange = (
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    select?: { name: string; value: string }
  ) => {
    // @ts-expect-error
    const { name, value } = event?.target ?? select;
    setData((prev) => {
      const updatedData = [...prev];
      // @ts-expect-error
      updatedData[activeTab][name] = value;
      return updatedData;
    });
  };

  const [activeTab, setActiveTab] = useState(0);

  const formElements: React.ReactElement[] = [
    <UserNameEmail
      key="form-1"
      // @ts-expect-error
      data={data[activeTab]}
      handleChange={handleChange}
    />,
    <AddressDetail
      key="form-2"
      // @ts-expect-error
      data={data[activeTab]}
      handleChange={handleChange}
    />,
    <CompanyNumbers
      key="form-3"
      // @ts-expect-error
      data={data[activeTab]}
      handleChange={handleChange}
    />,
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActiveTab((prev) => prev + 1);
  };

  return (
    <div className="h-[100vh] flex flex-col md:flex-row bg-white text-black ">
      <div className="hidden md:block w-full md:w-[40%] min-h-screen relative">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 font-serif text-3xl font-bold text-center flex flex-col gap-4 text-white z-20 border-white w-[110%] spa">
          <p className="xl:text-[42px] lg:text-[38px] md:text-[28px] text-center text-wrap uppercase">
            LOGIN AS COMPANY
          </p>
          <p className="text-[22px] font-[200]">
            Take your business to its peak
          </p>
        </div>
        <Image
          src={img}
          alt="Form Background"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-[60%] flex flex-col items-center justify-start border-black">
        <ProgressBar activeStep={activeTab} totalSteps={formElements.length} />

        {activeTab < formElements.length && (
          <>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="h-[87vh] relative mt-[15%] md:mt-[7%] sm:mt-[7%] lg:mt-[5%] w-[75%] md:w-[70%] lg:w-[90%] sm:w-[90%] max-w-md p-4 md:p-7 bg-gray-200 rounded-lg flex flex-col justify-between border-red-500 my-2 mx-2  sm:ml-0 md:ml-0 lg:ml-0"
            >
              {formElements[activeTab]}
              <div className="flex justify-between mb-2 border-green-500">
                <button
                  type="button"
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab((prev) => prev - 1)}
                  // className="px-4 py-2 rounded-xl bg-slate-600 text-white disabled:opacity-50"
                  className="px-4 py-2 rounded-md bg-slate-800 text-white font-bold transition disabled:opacity-50 duration-200 enabled:hover:bg-white enabled:hover:text-black border-2 border-transparent enabled:hover:border-slate-800 disabled:cursor-not-allowed"
                >
                  <span className="mr-2 font-bold">←</span>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={activeTab === formElements.length}
                  // className="px-4 py-2 rounded-xl bg-[#FCB62E] text-white disabled:opacity-50"
                  className="px-4 py-2 rounded-md bg-[#FCB62E] text-white font-bold transition disabled:opacity-50 duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FCB62E]"
                >
                  Next
                  <span className="ml-2 font-bold">→</span>
                </button>
              </div>
            </form>
          </>
        )}

        {activeTab === formElements.length && (
          <div className="w-full max-w-[85%] pb-4 flex flex-col items-center border-red-500">
            <Confirmation
              // @ts-expect-error
              data={data.reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {})}
            />
            {/* <button
              type="button"
              onClick={() => setActiveTab((prev) => prev - 1)}
              className="mt-4 px-16 py-2 rounded-xl bg-[#FCB62E] text-white -translate-x-2"
            >
              Back
            </button> */}
            <button
              type="button"
              onClick={() => setActiveTab((prev) => prev - 1)}
              className="mt-4 px-16 py-2 rounded-md bg-[#FCB62E] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FCB62E]"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainForm;
