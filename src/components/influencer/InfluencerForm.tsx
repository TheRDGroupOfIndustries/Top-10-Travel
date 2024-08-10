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
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";

const InfluencerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    introduction: "",
    speciality: "",
    socialLinks: "",
    country: "",
    state: "",
  });
  const { update } = useSession();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    if (!["image/jpeg", "image/png", "image/svg"].includes(files[0]?.type)) {
      setFile(null);
      toast.error("Only image is allowed.");
      return;
    }
    setFile(files[0]);
  };

  const { isPending, mutate } = useMutation(createInfluencerDataAction);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.set("file", file);

    const { socialLinks, ...rest } = formData;
    const linksArray = socialLinks.split(",");
    const { success, error } = await mutate({
      values: {
        ...rest,
        socialLinks: linksArray,
      },
      form: data,
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
      <div className="w-[50%] min-h-full relative hidden md:block">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 font-serif text-3xl font-bold text-center text-white z-20 border-white w-[110%] spa">
          <p className="xl:text-[42px] lg:text-[38px] md:text-[28px] text-center text-wrap uppercase">
            LOGIN AS Influencer
          </p>
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
      <div className="w-full md:w-[50%] my-10 z-10 flex flex-col items-center justify-center">
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
              minLength={5}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="image"
              className="p-2"
            >
              Your Public Image
            </label>
            <Input
              required
              type="file"
              name="image"
              id="image"
              placeholder="Upload your image"
              onChange={handleFile}
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
              minLength={25}
              required
            />
            <label
              htmlFor="introduction"
              className="p-2"
            >
              Introduction
            </label>
            <Input
              id="description"
              name="introduction"
              type="text"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="Enter your introduction"
              minLength={20}
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
          <div className="w-full">
            <label
              htmlFor="city"
              className="p-2"
            >
              City
            </label>
            <Input
              id="city"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter city name"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#fcb62a] hover:bg-[#c28b1e] text-white"
          >
            Create Account
          </Button>
          <Link
            href="/"
            className="ml-8"
          >
            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default InfluencerForm;
