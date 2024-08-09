"use Client";
import InputCF from "@/components/customUI/Company/InputForm";
import { $Enums } from "@prisma/client";
import React from "react";
interface Data {
  legalName: string;
  phone: string;
  companyContact: string;
  companyEmail: string;
  ownerName: string;
  ownerContact: string;
  companyRole: $Enums.CompanyRole;
}

interface props {
  data: Data;
  handleChange: any;
}
const UserNameEmail = (props: props) => {
  const { data, handleChange } = props;

  return (
    <div className=" border-green-600 mb-2 text-[13px]">
      <div>
        <InputCF
          required
          name="legalName"
          type="text"
          placeholder="Legal Name"
          value={data.legalName}
          onChange={handleChange}
          minLength={5}
        />
      </div>
      <div>
        <InputCF
          required
          name="phone"
          type="number"
          placeholder="Phone number"
          value={data.phone}
          onChange={handleChange}
          min={0}
        />
      </div>
      <div>
        <InputCF
          required
          name="companyContact"
          type="number"
          placeholder="Company Contact"
          value={data.companyContact}
          onChange={handleChange}
          min={0}
        />
      </div>
      <div className="space-x-2">
        <label
          className="block mb-2"
          htmlFor="Company_role"
        >
          Company role
        </label>

        <div className="flex justify-evenly">
          <div>
            <input
              required
              type="radio"
              id="DMC"
              checked={data.companyRole === "DMC"}
              name="companyRole"
              value="DMC"
              onChange={handleChange}
            />
            <label htmlFor="DMC">DMC</label>
          </div>
          <div>
            <input
              required
              type="radio"
              checked={data.companyRole === "AGENCY"}
              id="AGENCY"
              name="companyRole"
              value="AGENCY"
              onChange={handleChange}
            />
            <label htmlFor="AGENCY">AGENCY</label>
          </div>
          <div>
            <input
              required
              type="radio"
              id="HOTEL"
              checked={data.companyRole === "HOTEL"}
              name="companyRole"
              value="HOTEL"
              onChange={handleChange}
            />
            <label htmlFor="HOTEL">HOTEL</label>
          </div>
        </div>
      </div>
      <div>
        <InputCF
          required={false}
          name="ownerContact"
          type="number"
          placeholder="Owner contact"
          value={data.ownerContact}
          onChange={handleChange}
          min={0}
        />
      </div>
      <div>
        <InputCF
          required
          name="companyEmail"
          type="email"
          placeholder="Company Email"
          value={data.companyEmail}
          onChange={handleChange}
        />
      </div>
      <div>
        <InputCF
          required
          name="ownerName"
          type="text"
          placeholder="Owner name"
          value={data.ownerName}
          onChange={handleChange}
          minLength={5}
        />
      </div>
    </div>
  );
};

export default UserNameEmail;
