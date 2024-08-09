"use Client";
import InputCF from "@/components/customUI/Company/InputForm";
import React from "react";
interface data {
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: number;
}
import countries from "@/lib/countries.json";
import states from "@/lib/indiaState.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  data: data;
  handleChange: any;
}
const AddressDetail = (props: props) => {
  const { data, handleChange } = props;

  return (
    <div className="space-y-2">
      <div>
        <InputCF
          required
          name="address"
          type="text"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <Select
          name="country"
          required
          onValueChange={(value) => {
            handleChange(null, { name: "country", value });
          }}
          value={data.country}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="state">State </label>
        <Select
          name="state"
          required
          onValueChange={(value) => {
            handleChange(null, { name: "state", value });
          }}
          value={data.state}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="State " />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(states).map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        {data.state !== "" && (
          <>
            <label htmlFor="city">City</label>
            <Select
              name="city"
              required
              onValueChange={(value) => {
                handleChange(null, { name: "city", value });
              }}
              value={data.city}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="State " />
              </SelectTrigger>
              <SelectContent>
                {
                  // @ts-expect-error
                  states[data.state].map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <div>
        <InputCF
          required
          name="pincode"
          type="number"
          placeholder="Pincode"
          value={data.pincode}
          onChange={handleChange}
        />
      </div>
      {/* to time in the schema  */}
      {/* <div>
                    <label className="block text-sm font-bold mb-2" htmlFor="Company_Email">
                    Company Email
                    </label>
                    <input required  name="Company_Email" type="text" placeholder="Company Email" value={data.Company_Email} onChange={handleChange} />
                </div> */}
    </div>
  );
};

export default AddressDetail;
