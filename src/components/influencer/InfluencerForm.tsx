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
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const InfluencerForm = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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
  const router = useRouter();
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
        state: selectedCity,
        country: selectedCountry,
      },
      form: data,
    });
    if (success) {
      await update({ role: "Influencer" });
      toast.success(success);
      setFormData({
        name: "",
        description: "",
        introduction: "",
        speciality: "",
        socialLinks: "",
        country: "",
        state: "",
      });
      router.push("/");
    } else if (error) toast.error(error);
  };



  useEffect(() => {
    // Fetch all countries
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((response) => {
        const countryList = response.data.data.map(
          (country: { name: any }) => country.name
        );
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const fetchCities = (country: SetStateAction<string>) => {
    setSelectedCountry(country);
    setSelectedCity(""); // Reset city when country changes

    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country,
      })
      .then((response) => {
        setCities(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-row relative bg-white text-black">
      {/* <Image
        src={img}
        alt="Form Background"
        layout="fill"
        objectFit="cover"
        className="object-cover blur-sm absolute inset-0 md:hidden brightness-75"
      /> */}
      <div className="w-[40%] min-h-full relative hidden md:block">
        <div className="absolute p-4 max-w-full top-1/4 left-1/2 transform -translate-x-1/2 font-cinzel text-3xl font-bold text-center text-white z-20 border-white w-[110%] spa">
          <p className="xl:text-[42px] lg:text-[38px] md:text-[32px] text-center text-wrap uppercase">
            LOGIN AS <span className="text-mainColor">Influencer</span>
          </p>
          <p className="text-xl xl:text-[25px] font-[200] max-w-xs mx-auto mt-8">
            Sharing your travel adventures and inspire others.
          </p>
        </div>

        <Image
          src={img}
          alt="Form Background"
          layout="fill"
          objectFit="cover"
          className="object-cover brightness-75"
        />
      </div>
      <div className="w-full p-10 md:w-[60%] z-10 flex flex-col items-center justify-center">
        <p className="text-[32px] font-cinzel md:hidden font-extrabold text-center text-wrap uppercase">
          LOGIN AS <span className="text-mainColor">Influencer</span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md m-2 rounded-lg bg-gray-200 p-8 space-y-4"
        >
          <div className="w-full">
            <label htmlFor="name" className="p-2 font-semibold">
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
            <label htmlFor="image" className="font-semibold">
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
            <label htmlFor="description" className="p-2 font-semibold">
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
            <label htmlFor="introduction" className="p-2 font-semibold">
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
            <label htmlFor="speciality" className="p-2 font-semibold">
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
            <label htmlFor="socialLinks" className="p-2 font-semibold">
              SocialLinks (comma separated)
            </label>
            <Textarea
              id="socialLinks"
              name="socialLinks"
              value={formData.socialLinks}
              // @ts-expect-error
              onChange={handleInputChange}
              placeholder="Instagram, Facebook, Youtube links etc..."
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="font-semibold">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={selectedCountry}
              onChange={(e) => fetchCities(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="city" className="font-semibold">
              City
            </label>
            <select
              id="city"
              name="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 border rounded"
              required
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
          <Button
            type="submit"
            disabled={isPending}
            className="bg-mainColor hover:bg-mainColorSecondary text-white"
          >
            Create Account
          </Button>
          <Link href="/" className="ml-8">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default InfluencerForm;
