"use client";
import countries from "@/lib/countries.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

const Step1 = ({
  register,
  errors,
  hidden,
  dmc,
  hotel,
  setValue,
}: {
  register: any;
  errors: any;
  hidden?: boolean;
  dmc?: boolean;
  hotel?: boolean;
  setValue?: any
}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  

  // Fetch countries on component load
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((response) => {
        const countryList = response.data.data.map(({ name }: { name: string }) => ({
          name,
          code: name,
        }));
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Fetch cities when a country is selected
  const fetchCities = (country: SetStateAction<string>) => {
    setSelectedCountry(country);

    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country,
      })
      .then((response) => {
        setCities(response.data.data || []);
        setValue("city", ""); // Reset city when country changes
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };
  return (
    <div className={cn(hidden ? "hidden" : "")}>
      <div>
        <Label htmlFor={"name"} className="text-sm font-medium">
          {dmc ? "DMC" : hotel ? "Hotel" : "Agency"} Name
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </Label>
        <Input
          {...register("name")}
          id="name"
          type="text"
          placeholder={dmc ? "DMC Name" : hotel ? "Hotel Name" : "Agency Name"}
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label htmlFor={"description"} className="text-sm font-medium">
          {dmc ? "DMC" : hotel ? "Hotel" : "Agency"} description
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          type="text"
          placeholder={
            dmc
              ? "DMC description"
              : hotel
              ? "Hotel description"
              : "Agency description"
          }
          className="m-0 mt-1"
        />
      </div>

           {/* Country Selector */}
      <div className="relative inline-block w-full max-w-xs">
        <label htmlFor="country" className="text-sm font-medium">
          Country
          {errors.country && (
            <p className="text-red-500 text-xs">{errors.country.message}</p>
          )}
        </label>
        <select
          id="country"
          className="p-2 w-full block border rounded-lg max-w-xs"
          {...register("country", {
            required: "Country is required",
            onChange: (e: { target: { value: SetStateAction<string>; }; }) => fetchCities(e.target.value),
          })}
          defaultValue=""
        >
          <option value="" disabled>
            Select a Country
          </option>
          {countries.map(({ code, name }) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* City Selector */}
      <div>
        <label htmlFor="city" className="text-sm font-medium">
          City
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </label>
        <select
          id="city"
          className="p-2 w-full block border rounded-lg max-w-xs"
          {...register("city", {
            required: "City is required",
          })}
          defaultValue=""
          disabled={!cities.length}
        >
          <option value="" disabled>
            {cities.length ? "Select a City" : "No cities available"}
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>


      <div>
        <Label htmlFor={"contactPerson"} className="text-sm font-medium">
          Contact Person
          {errors.contactPerson && (
            <p className="text-red-500 text-xs">
              {errors.contactPerson.message}
            </p>
          )}
        </Label>
        <Input
          {...register("contactPerson")}
          id="contactPerson"
          type="text"
          placeholder="Contact Person"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label htmlFor={"contactPhoneNumber"} className="text-sm font-medium">
          Contact Phone Number
          {errors.contactPhoneNumber && (
            <p className="text-red-500 text-xs">
              {errors.contactPhoneNumber.message}
            </p>
          )}
        </Label>
        <Input
          {...register("contactPhoneNumber")}
          id="contactPhoneNumber"
          type="number"
          placeholder="ContactPhoneNumber"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label htmlFor={"contactEmail"} className="text-sm font-medium">
          Contact Email
          {errors.contactEmail && (
            <p className="text-red-500 text-xs">
              {errors.contactEmail.message}
            </p>
          )}
        </Label>
        <Input
          {...register("contactEmail")}
          id="contactEmail"
          type="email"
          placeholder="Contact Email"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label htmlFor={"address"} className="text-sm font-medium">
          Address
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </Label>
        <Input
          {...register("address")}
          id="address"
          type="text"
          placeholder="Address"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label htmlFor={"websiteUrl"} className="text-sm font-medium">
          Website Url
          {errors.websiteUrl && (
            <p className="text-red-500 text-xs">{errors.websiteUrl.message}</p>
          )}
        </Label>
        <Input
          {...register("websiteUrl", { required: false })}
          id="websiteUrl"
          type="text"
          placeholder="WebsiteUrl"
          className="m-0 mt-1"
        />
      </div>
    </div>
  );
};
export default Step1;
