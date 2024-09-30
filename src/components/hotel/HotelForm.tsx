"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { HotelSchema } from "./hotelSchema";
import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import Step1 from "../commonFormSteps/step1";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Step2 from "../commonFormSteps/step2";

import countries from "@/lib/countries.json";
import {
  MdOutlineCheckBox as Checked,
  MdOutlineCheckBoxOutlineBlank as Unchecked,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import Step5 from "../commonFormSteps/step5";
import Step6 from "../commonFormSteps/step6";
import Step7 from "../commonFormSteps/step7";
import FinalStep from "../commonFormSteps/finalStep";
import useMutation from "@/hooks/useMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createHotelAction } from "@/core/server/actions/hotel/createHotel";

type Inputs = z.infer<typeof HotelSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Basic Information",
    fields: [
      "name",
      "description",
      "country",
      "city",
      "address",
      "contactPerson",
      "contactPhoneNumber",
      "contactEmail",
      "websiteUrl",
    ],
  },
  {
    id: "Step 2",
    name: "Legal and Compliance",
    fields: [
      "companyRegistrationNumber",
      "yearOfEstablishment",
      "businessLicenseUpload",
      "insuranceCertificateUpload",
    ],
  },
  {
    id: "Step 3",
    name: "Services Offered",
    fields: ["services", "specialization"],
  },
  {
    id: "Step 4",
    name: "Digital Presence and Marketing",
    fields: [
      "socialMediaLinks",
      // "promotionalVideoUpload",
      "images",
    ],
  },
];

const services = [
  "Room service",
  "Housekeeping",
  "Free Wi-Fi",
  "Concierge service",
  "24-hour front desk",
  "Restaurant and bar",
  "Laundry service",
  "Fitness center",
  "Swimming pool",
  "Airport shuttle",
];

const specialization = [
  "Business Hotels",
  "Boutique Hotels",
  "Resort Hotels",
  "Luxury Hotels",
  "Budget Hotels",
  "Extended Stay Hotels",
  "Airport Hotels",
  "Eco-Friendly Hotels",
  "Spa Hotels",
  "Family Hotels",
];

const HotelForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(HotelSchema),
    defaultValues: {
      services: [],
      specialization: [],
    },
  });

  const router = useRouter();
  const [otherservices, setservices] = useState<string[]>([]);
  const [otherSpecialServices, setSpecialServices] = useState<string[]>([]);

  const { isPending, mutate } = useMutation(createHotelAction);
  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log("called");
    data.services = data.services.concat(otherservices);
    data.specialization = data.specialization.concat(otherSpecialServices);
    const fdata = new FormData();

    if (data.businessLicenseUpload) {
      fdata.append("businessLicenseUpload", data.businessLicenseUpload);
    }

    if (data.insuranceCertificateUpload) {
      fdata.append(
        "insuranceCertificateUpload",
        data.insuranceCertificateUpload
      );
    }

    if (data.images) {
      fdata.append("images", data.images);
    }

    const {
      businessLicenseUpload,
      insuranceCertificateUpload,
      images,
      ...rest
    } = data;
    
    const { success, error } = await mutate({ values: rest, formData: fdata });

    if (success) {
      toast.success(success);
      router.replace("/dashboard/hotel");
    } else toast.error(error);

    // reset();
  };
  const primary = watch("services");
  const special = watch("specialization");
  type FieldName = keyof Inputs;

  const next = async () => {
    if (currentStep === steps.length) {
      console.log(steps.length);
      await processForm(getValues());
      return;
    }
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;
    if (currentStep <= steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  return (
    <section className="flex flex-col xl:col-span-2 justify-between p-10 max-h-screen overflow-auto">
      {/* steps */}
      <h2 className="text-3xl font-bold mb-4">
        Register as <span className="text-mainColor">Hotel</span>
      </h2>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="hidden space-y-4 md:flex md:space-x-8 md:space-y-0"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-mainColor py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-mainColor">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
        <div
          className="flex md:hidden w-full flex-col border-l-4 border-mainColor py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
          aria-current="step"
        >
          <span className="text-sm font-medium text-mainColor">
            {currentStep === steps.length ? 5 : steps[currentStep].id}
          </span>
          <span className="text-sm font-medium">
            {currentStep === steps.length
              ? "Final Step"
              : steps[currentStep].name}
          </span>
        </div>
      </nav>
      <form
        className="py-12 flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await processForm(getValues());
        }}
      >
        <Step1
          register={register}
          errors={errors}
          hidden={currentStep !== 0}
          hotel
        />
        <Step2
          register={register}
          errors={errors}
          setValue={setValue}
          hidden={currentStep !== 1}
        />

        <div className={cn(currentStep !== 2 ? "hidden" : "")}>
          <div>
            <Label htmlFor={"services"} className="text-sm font-medium">
              Services Offered
              {errors.services && (
                <p className="text-red-500 text-xs">
                  {errors.services.message}
                </p>
              )}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {services.map((s) => (
                <span
                  className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                  key={s}
                >
                  {primary.includes(s) ? (
                    <Checked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue(
                          "services",
                          primary.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue("services", [...primary, s]);
                      }}
                    />
                  )}
                  {s}
                </span>
              ))}
            </div>
            <Input
              onChange={(e) => setservices(e.target.value.split(","))}
              placeholder="Others comma separated"
              className="m-0 mt-1 w-fit"
            />
          </div>
          <div>
            <Label htmlFor={"specialization"} className="text-sm font-medium">
              Specilization
              {errors.specialization && (
                <p className="text-red-500 text-xs">
                  {errors.specialization.message}
                </p>
              )}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {specialization.map((s) => (
                <span
                  className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                  key={s}
                >
                  {special.includes(s) ? (
                    <Checked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue(
                          "specialization",
                          special.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue("specialization", [...special, s]);
                      }}
                    />
                  )}
                  {s}
                </span>
              ))}
            </div>
            <Input
              onChange={(e) => setSpecialServices(e.target.value.split(","))}
              placeholder="Others comma separated"
              className="m-0 mt-1 w-fit"
            />
          </div>
        </div>

        <Step7
          register={register}
          errors={errors}
          setValue={setValue}
          hidden={currentStep !== 3}
          type="hotel"
        />

        {currentStep === 4 ? <FinalStep loading={isPending} /> : null}
      </form>
      <div className="mt-5 pt-5">
        <div className="flex justify-between">
          {currentStep > 0 && <Button onClick={() => prev()}>Prev</Button>}
          {currentStep < 7 && (
            <Button
              className="ml-auto bg-mainColor hover:bg-[#dea02f]"
              onClick={async () => await next()}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
export default HotelForm;
