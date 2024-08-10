"use client";
import InputCF from "@/components/customUI/Company/InputForm";
import React from "react";

interface Data {
  agencyGroup: string;
  iata_number: string;
  abta_number: string;
  clia_number: string;
  tids_number: string;
  business_reg_number: string;

  image: string;
}

interface Props {
  data: Data;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyNumbers = (props: Props) => {
  const { data, handleChange } = props;

  return (
    <>
      <div className="space-y-2 font-[13px]">
        <div>
          <InputCF
            required={false}
            name="agencyGroup"
            type="text"
            placeholder="Agency Group"
            value={data.agencyGroup}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div>
          <InputCF
            required
            name="business_reg_number"
            type="text"
            placeholder="Business Registration Number"
            value={data.business_reg_number}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div>
          <InputCF
            required={false}
            name="iata_number"
            type="text"
            placeholder="Iata no."
            value={data.iata_number}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div>
          <InputCF
            required={false}
            name="abta_number"
            type="text"
            placeholder="Abta number"
            value={data.abta_number}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div>
          <InputCF
            required={false}
            name="clia_number"
            type="text"
            placeholder="Clia number"
            value={data.clia_number}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div>
          <InputCF
            required={false}
            name="tids_number"
            type="text"
            placeholder="Tids number"
            value={data.tids_number}
            onChange={handleChange}
            min={0}
          />
        </div>
        {/* <label
          htmlFor="image"
          className="text-black font-[500]  border-gray-950"
        >
          Image
        </label> */}
        <div>
          {/* <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            console.log("Files: ", res);
            if (res.length > 0) {
              handleChange({
                target: {
                  name: "image",
                  value: res[0].url,
                },
              } as React.ChangeEvent<HTMLInputElement>);
              console.log("Image URL stored:", res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
        /> */}
        </div>
      </div>
    </>
  );
};

export default CompanyNumbers;
