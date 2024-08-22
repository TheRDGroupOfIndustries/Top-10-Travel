"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { DmcSchema } from "./dmcSchema";
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
import FinalStep from "../commonFormSteps/finalStep";
import useMutation from "@/hooks/useMutation";
import { createAgencyAction } from "@/core/server/actions/agency/createAgency";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createDmcAction } from "@/core/server/actions/dmc/createDmc";

type Inputs = z.infer<typeof DmcSchema>;

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
    fields: ["coreServices", "specialization", "regionsCovered"],
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
    name: "Portfolio of Services",
    fields: ["pastProjects", "clientReferences", "caseStudyPdf"],
  },
  {
    id: "Step 7",
    name: "Digital Presence and Marketing",
    fields: ["socialMediaLinks", "promotionalVideoUpload", "images"],
  },
  {
    id: "Step 8",
    name: "Review and Submission",
  },
];

const coreServices = [
  "Event Planning & Execution",
  "Group Tours & Incentives",
  "Venue Sourcing & Logistics",
  "Transportation Management",
  "Accommodation Arrangements",
  "On-Site Coordination",
  "Cultural & Thematic Activities",
  "MICE (Meetings, Incentives, Conferences, Exhibitions)",
  "VIP Services",
];

const specialization = [
  "Eco-Tourism",
  "Luxury Travel Experiences",
  "Adventure Tourism",
  "Historical & Cultural Tours",
  "Religious Pilgrimages",
];

const internationalCertifications = [
  " ISO 9001",
  "SITE (Society for Incentive Travel Excellence)",
  "MPI (Meeting Professionals International)",
];
const memberships = [
  "ADMEI (Association of Destination Management Executives International)",
  " ICCA (International Congress and Convention Association)",
];

const DmcFo = () => {
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
    resolver: zodResolver(DmcSchema),
    defaultValues: {
      coreServices: [],
      specialization: [],
      regionsCovered: [],
      internationalCertifications: [],
      memberships: [],
    },
  });

  const router = useRouter();
  const [otherCoreServices, setCoreServices] = useState<string[]>([]);
  const [otherSpecialServices, setSpecialServices] = useState<string[]>([]);
  const [otherRegions, setOtherRegions] = useState<string[]>([]);
  const [otherInternationalCertifications, setInternationalCertifications] =
    useState<string[]>([]);
  const [otherMemberships, setMemberships] = useState<string[]>([]);

  const { isPending, mutate } = useMutation(createDmcAction);
  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log("called");
    data.coreServices = data.coreServices.concat(otherCoreServices);
    data.specialization = data.specialization.concat(otherSpecialServices);
    data.regionsCovered = data.regionsCovered.concat(otherRegions);
    data.internationalCertifications = data.internationalCertifications.concat(
      otherInternationalCertifications
    );
    data.memberships = data.memberships.concat(otherMemberships);
    const fdata = new FormData();

    fdata.append("businessLicenseUpload", data.businessLicenseUpload);
    fdata.append("insuranceCertificateUpload", data.insuranceCertificateUpload);
    fdata.append("images", data.images);
    const {
      businessLicenseUpload,
      insuranceCertificateUpload,
      images,
      ...rest
    } = data;
    const { success, error } = await mutate({ values: rest, formData: fdata });

    if (success) {
      toast.success(success);
      router.replace("/dashboard/dmc");
    } else toast.error(error);

    // reset();
  };
  const primary = watch("coreServices");
  const special = watch("specialization");
  const regions = watch("regionsCovered");
  const certificates = watch("internationalCertifications");
  const membership = watch("memberships");
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
        Register as <span className="text-[#FCAE1D]">DMC</span>
      </h2>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="hidden space-y-4 xl:flex lg:space-x-8 lg:space-y-0"
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
                  className="flex w-full flex-col border-l-4 border-[#FCAE1D] py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-[#FCAE1D]">
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
        <ol
          role="list"
          className="hidden space-y-4 md:flex xl:hidden md:space-x-8 md:space-y-0"
        >
          {steps
            .filter((_, i) => i <= currentStep + 1 && i >= currentStep - 1)
            .map((step, filteredIndex) => {
              const originalIndex =
                currentStep === 0
                  ? filteredIndex
                  : currentStep - 1 + filteredIndex;
              const isCompleted = originalIndex < currentStep;
              const isCurrent = originalIndex === currentStep;

              return (
                <li
                  key={step.name}
                  className="md:flex-1"
                >
                  <div
                    className={`group flex w-full flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                      isCompleted
                        ? "border-sky-600"
                        : isCurrent
                        ? "border-[#FCAE1D]"
                        : "border-gray-200"
                    }`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-sky-600"
                          : isCurrent
                          ? "text-[#FCAE1D]"
                          : "text-gray-500"
                      }`}
                    >
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                </li>
              );
            })}
        </ol>
        <div
          className="flex md:hidden w-full flex-col border-l-4 border-[#FCAE1D] py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
          aria-current="step"
        >
          <span className="text-sm font-medium text-[#FCAE1D]">
            {currentStep === steps.length ? 8 : steps[currentStep].id}
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
          dmc
        />
        <Step2
          register={register}
          errors={errors}
          setValue={setValue}
          hidden={currentStep !== 1}
        />

        <div className={cn(currentStep !== 2 ? "hidden" : "")}>
          <div>
            <Label
              htmlFor={"coreServices"}
              className="text-sm font-medium"
            >
              Core Services
              {errors.coreServices && (
                <p className="text-red-500 text-xs">
                  {errors.coreServices.message}
                </p>
              )}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {coreServices.map((s) => (
                <span
                  className="text-muted-foreground flex items-center gap-2 text-sm p-1"
                  key={s}
                >
                  {primary.includes(s) ? (
                    <Checked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue(
                          "coreServices",
                          primary.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue("coreServices", [...primary, s]);
                      }}
                    />
                  )}
                  {s}
                </span>
              ))}
            </div>
            <Input
              onChange={(e) => setCoreServices(e.target.value.split(","))}
              placeholder="Others comma separated"
              className="m-0 mt-1 w-fit"
            />
          </div>
          <div>
            <Label
              htmlFor={"specialization"}
              className="text-sm font-medium"
            >
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
                      className="text-black text-xl"
                      onClick={(e) => {
                        setValue(
                          "specialization",
                          special.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl"
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
          <div>
            <Label
              htmlFor={"regionsCovered"}
              className="text-sm font-medium"
            >
              Regions Covered
              {errors.regionsCovered && (
                <p className="text-red-500 text-xs">
                  {errors.regionsCovered.message}
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
                      "regionsCovered",
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
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue(
                          "regionsCovered",
                          regions.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue("regionsCovered", [...regions, s]);
                      }}
                    />
                  )}
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={cn(currentStep !== 3 ? "hidden" : "")}>
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
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue(
                          "internationalCertifications",
                          certificates.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl hover:cursor-pointer"
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
                      className="text-black text-xl hover:cursor-pointer"
                      onClick={(e) => {
                        setValue(
                          "memberships",
                          membership.filter((v) => v !== s)
                        );
                      }}
                    />
                  ) : (
                    <Unchecked
                      className="text-black text-xl hover:cursor-pointer"
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
        </div>

        <Step5
          setValue={setValue}
          register={register}
          errors={errors}
          hidden={currentStep !== 4}
        />

        <Step6
          setValue={setValue}
          errors={errors}
          hidden={currentStep !== 5}
        />

        <Step7
          register={register}
          errors={errors}
          setValue={setValue}
          hidden={currentStep !== 6}
          type="dmc"
        />

        {currentStep === 7 ? <FinalStep loading={isPending} /> : null}
      </form>
      <div className="mt-5 pt-5">
        <div className="flex justify-between">
          {currentStep > 0 && <Button onClick={() => prev()}>Prev</Button>}
          {currentStep < 7 && (
            <Button
              className="ml-auto bg-[#FCAE1D] hover:bg-[#dea02f]"
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
export default DmcFo;
