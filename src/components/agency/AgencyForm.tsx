"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AgencySchema } from "./agencySchema";
import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import Step1 from "../commonFormSteps/step1";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Step2 from "../commonFormSteps/step2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "@/lib/countries.json";
import {
  MdOutlineCheckBox as Checked,
  MdOutlineCheckBoxOutlineBlank as Unchecked,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import Step5 from "../commonFormSteps/step5";
import Step6 from "../commonFormSteps/step6";
import Step7 from "../commonFormSteps/step7";

type Inputs = z.infer<typeof AgencySchema>;

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
    fields: ["primaryServices", "specializedTravelTypes", "regionsOfOperation"],
  },
  {
    id: "Step 4",
    name: "Certifications and Memberships",
    fields: ["internationalCertifications", "memberships"],
  },
  {
    id: "Step 5",
    name: "Team and Expertise",
    fields: ["numberOfEmployees", "keyPersonnel"],
  },
  {
    id: "Step 6",
    name: "Past Projects and References",
    fields: ["pastProjects", "clientReferences", "caseStudyPdf"],
  },
  {
    id: "Step 7",
    name: "Digital Presence and Marketing",
    fields: ["socialMediaLinks", "promotionalVideoUpload", "images"],
  },
];

const primaryServices = [
  "Corporate Travel",
  "Leisure Travel",
  "Group Tours",
  "Individual Travel Packages",
  "Adventure Travel",
  "Cruise Packages",
];

const specializedTravelTypes = [
  "Luxury Travel",
  "Budget Travel",
  "Eco friendly Travel",
  "Cultural Tours",
  "Religious Tours",
];
const internationalCertifications = [
  "IATA (International Air Transport Association)",
  "UFTAA (United Federation of Travel Agents' Associations)",
  "ASTA (American Society of Travel Advisors)",
];
const memberships = [
  "WTTC (World Travel & Tourism Council)",
  "PATA (Pacific Asia Travel Association)",
];

const AgencyForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(6);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AgencySchema),
    defaultValues: {
      primaryServices: [],
      specializedTravelTypes: [],
      regionsOfOperation: [],
      internationalCertifications: [],
      memberships: [],
    },
  });
  const [otherPrimaryServices, setPrimaryServices] = useState<string[]>([]);
  const [otherSpecialServices, setSpecialServices] = useState<string[]>([]);
  const [otherRegions, setOtherRegions] = useState<string[]>([]);
  const [otherInternationalCertifications, setInternationalCertifications] =
    useState<string[]>([]);
  const [otherMemberships, setMemberships] = useState<string[]>([]);

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };
  const primary = watch("primaryServices");
  const special = watch("specializedTravelTypes");
  const regions = watch("regionsOfOperation");
  const certificates = watch("internationalCertifications");
  const membership = watch("memberships");
  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
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
    <section className="absolute inset-0 flex flex-col justify-between p-10 max-h-screen overflow-auto">
      {/* steps */}
      <nav aria-label="Progress">
        <ol
          role="list"
          className="space-y-4 md:flex md:space-x-8 md:space-y-0"
        >
          {steps.map((step, index) => (
            <li
              key={step.name}
              className="md:flex-1"
            >
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
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
      </nav>
      <form
        className="mt-12 py-12 flex flex-col gap-2"
        onSubmit={handleSubmit(processForm)}
      >
        {currentStep === 0 ? (
          <Step1
            register={register}
            errors={errors}
          />
        ) : null}
        {currentStep === 1 ? (
          <Step2
            register={register}
            errors={errors}
          />
        ) : null}
        {currentStep === 2 ? (
          <>
            <div>
              <Label
                htmlFor={"primaryServices"}
                className="text-sm font-medium"
              >
                Primary Services
                {errors.primaryServices && (
                  <p className="text-red-500 text-xs">
                    {errors.primaryServices.message}
                  </p>
                )}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {primaryServices.map((s) => (
                  <span
                    className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                    key={s}
                  >
                    {primary.includes(s) ? (
                      <Checked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue(
                            "primaryServices",
                            primary.filter((v) => v !== s)
                          );
                        }}
                      />
                    ) : (
                      <Unchecked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue("primaryServices", [...primary, s]);
                        }}
                      />
                    )}
                    {s}
                  </span>
                ))}
              </div>
              <Input
                onChange={(e) => setPrimaryServices(e.target.value.split(","))}
                placeholder="Others comma separated"
                className="m-0 mt-1 w-fit"
              />
            </div>
            <div>
              <Label
                htmlFor={"specializedTravelTypes"}
                className="text-sm font-medium"
              >
                Specialized Travel Types
                {errors.specializedTravelTypes && (
                  <p className="text-red-500 text-xs">
                    {errors.specializedTravelTypes.message}
                  </p>
                )}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {specializedTravelTypes.map((s) => (
                  <span
                    className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                    key={s}
                  >
                    {special.includes(s) ? (
                      <Checked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue(
                            "specializedTravelTypes",
                            special.filter((v) => v !== s)
                          );
                        }}
                      />
                    ) : (
                      <Unchecked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue("specializedTravelTypes", [...special, s]);
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
            <div>
              <Label
                htmlFor={"regionsOfOperation"}
                className="text-sm font-medium"
              >
                Regions of Operation
                {errors.regionsOfOperation && (
                  <p className="text-red-500 text-xs">
                    {errors.regionsOfOperation.message}
                  </p>
                )}
              </Label>
              <select
                className="p-2 w-full block border rounded-lg max-w-xs"
                multiple
              >
                {countries.map(({ code, name }) => (
                  <option
                    key={code}
                    value={name}
                    className={cn(
                      "max-w-[200px] p-2 transition-colors bg-transparent text-muted-foreground",
                      regions.includes(name) ? "bg-gray-900 text-white" : ""
                    )}
                    onClick={() => {
                      if (regions.length >= 10) return;
                      setValue(
                        "regionsOfOperation",
                        regions.includes(name)
                          ? regions.filter((v) => v !== name)
                          : [...regions, name]
                      );
                    }}
                  >
                    {name}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {regions.map((s) => (
                  <span
                    className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                    key={s}
                  >
                    {regions.includes(s) ? (
                      <Checked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue(
                            "regionsOfOperation",
                            regions.filter((v) => v !== s)
                          );
                        }}
                      />
                    ) : (
                      <Unchecked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue("regionsOfOperation", [...regions, s]);
                        }}
                      />
                    )}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : null}
        {currentStep === 3 ? (
          <>
            <div>
              <Label
                htmlFor={"internationalCertifications"}
                className="text-sm font-medium"
              >
                International Certifications
                {errors.internationalCertifications && (
                  <p className="text-red-500 text-xs">
                    {errors.internationalCertifications.message}
                  </p>
                )}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {internationalCertifications.map((s) => (
                  <span
                    className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                    key={s}
                  >
                    {certificates.includes(s) ? (
                      <Checked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue(
                            "internationalCertifications",
                            certificates.filter((v) => v !== s)
                          );
                        }}
                      />
                    ) : (
                      <Unchecked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue("internationalCertifications", [
                            ...certificates,
                            s,
                          ]);
                        }}
                      />
                    )}
                    {s}
                  </span>
                ))}
              </div>
              <Input
                onChange={(e) =>
                  setInternationalCertifications(e.target.value.split(","))
                }
                placeholder="Others comma separated"
                className="m-0 mt-1 w-fit"
              />
            </div>
            <div>
              <Label
                htmlFor={"memberships"}
                className="text-sm font-medium"
              >
                Memberships
                {errors.memberships && (
                  <p className="text-red-500 text-xs">
                    {errors.memberships.message}
                  </p>
                )}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {memberships.map((s) => (
                  <span
                    className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                    key={s}
                  >
                    {membership.includes(s) ? (
                      <Checked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue(
                            "memberships",
                            membership.filter((v) => v !== s)
                          );
                        }}
                      />
                    ) : (
                      <Unchecked
                        className="text-black text-xl"
                        onClick={(e) => {
                          setValue("memberships", [...membership, s]);
                        }}
                      />
                    )}
                    {s}
                  </span>
                ))}
              </div>
              <Input
                onChange={(e) => setMemberships(e.target.value.split(","))}
                placeholder="Others comma separated"
                className="m-0 mt-1 w-fit"
              />
            </div>
          </>
        ) : null}
        {currentStep === 4 ? (
          <Step5
            setValue={setValue}
            register={register}
            errors={errors}
          />
        ) : null}
        {currentStep === 5 ? (
          <Step6
            setValue={setValue}
            errors={errors}
          />
        ) : null}
        {currentStep === 6 ? (
          <Step7
            register={register}
            errors={errors}
          />
        ) : null}
        {currentStep === 7 ? (
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Submit
          </button>
        ) : null}
      </form>
      <div className="mt-5 pt-5">
        <div className="flex justify-between">
          <Button onClick={() => prev()}>Prev</Button>
          <Button onClick={async () => await next()}>Next</Button>
        </div>
      </div>
    </section>
  );
};
export default AgencyForm;
