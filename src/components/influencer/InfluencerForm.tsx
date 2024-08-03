"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInfluencerDataAction } from "@/core/server/actions/influencer/createInfluencerData";
import useMutation from "@/hooks/useMutation";
import countries from "@/lib/countries.json";
import IndiaStates from "@/lib/indiaState.json";
import img from "@/resources/images/form/CompanyForm.png";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";

const InfluencerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    speciality: "",
    socialLinks: "",
    country: "",
    state: "",
  });
  const { update } = useSession();
  const cities = useMemo(() => Object.values(IndiaStates).flat(), []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { isPending, mutate } = useMutation(createInfluencerDataAction);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { socialLinks, ...rest } = formData;
    const linksArray = socialLinks.split(",");
    const { success, error } = await mutate({
      ...rest,
      socialLinks: linksArray,
    });
    if (success) {
      await update({ role: "Influencer" });
      toast.success(success);
    } else if (error) toast.error(error);
  };
  return (
    <div className="min-h-screen flex flex-row relative bg-white text-black">
      <Image
        src={img}
        alt="Form Background"
        layout="fill"
        objectFit="cover"
        className="object-cover blur-sm absolute inset-0 md:hidden"
      />
      <div className="w-[40%] min-h-full relative hidden md:block">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 font-serif text-3xl font-bold text-center text-white z-20 border-white w-[110%] spa">
          <p className="lg:text-[50px] md:text-[40px]">LOGIN AS COMPANY</p>
          <p className="text-[25px] font-[200] max-w-xs mx-auto mt-8">
            Sharing your travel adventures and inspire others.
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
      <div className="w-full md:w-[50%] z-10 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md m-2 rounded-lg bg-gray-200 p-8 space-y-4"
        >
          <div className="w-full">
            <label
              htmlFor="name"
              className="p-2"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image"
              className="p-2"
            >
              Image
            </label>
            <Input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image url"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="p-2"
            >
              Description
            </label>
            <Input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter your description"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="speciality"
              className="p-2"
            >
              Speciality
            </label>
            <Input
              id="speciality"
              name="speciality"
              type="text"
              value={formData.speciality}
              onChange={handleInputChange}
              placeholder="Vlogging, Hiking etc"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="socialLinks"
              className="p-2"
            >
              SocialLinks (comma separated)
            </label>
            <Input
              id="socialLinks"
              name="socialLinks"
              value={formData.socialLinks}
              onChange={handleInputChange}
              type="text"
              placeholder="Instagram, Facebook, Youtube etc..."
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <Select
              name="country"
              required
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, country: value }));
              }}
              value={formData.country}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country.name}
                    value={country.name}
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="state">City (India only currently)</label>
            <Select
              name="state"
              required
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, state: value }));
              }}
              value={formData.state}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="City (India only)" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem
                    key={city}
                    value={city}
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#fcb62a] hover:bg-[#c28b1e] text-white"
          >
            Create Account
          </Button>
          <Link href="/" className="ml-8">
            <Button type="button" variant="secondary">Cancel</Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default InfluencerForm;
