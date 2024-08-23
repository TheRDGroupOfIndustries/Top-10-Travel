import countries from "@/lib/countries.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const Step1 = ({
  register,
  errors,
  hidden,
  dmc,
  hotel,
}: {
  register: any;
  errors: any;
  hidden?: boolean;
  dmc?: boolean;
  hotel?: boolean;
}) => {
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
      <div className="relative inline-block w-full max-w-xs">
        <Label htmlFor={"country"} className="text-sm font-medium">
          Country
          {errors.country && (
            <p className="text-red-500 text-xs">{errors.country.message}</p>
          )}
        </Label>

        <select
          className="p-2 w-full block border rounded-lg max-w-xs"
          {...register("country")}
        >
          {countries.map(({ code, name }) => (
            <option key={code} value={name} className="max-w-[200px]">
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor={"city"} className="text-sm font-medium">
          City
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </Label>
        <Input
          {...register("city")}
          id="city"
          type="text"
          placeholder="City"
          className="m-0 mt-1"
        />
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
