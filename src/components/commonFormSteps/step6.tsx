import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  ClientReferenceSchema,
  PastProjectSchema,
} from "../agency/agencySchema";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/lib/utils";

type PastProjectType = z.infer<typeof PastProjectSchema>;
type ClientReferenceType = z.infer<typeof ClientReferenceSchema>;

const PastProjectInput = ({ remove, ind, onChange, form, error }: any) => {
  return (
    <div className="relative">
      <Button
        size="icon"
        type="button"
        variant="destructive"
        className="h-7 w-7 text-xl absolute -left-8 text-white"
        onClick={() => remove(ind)}
      >
        <RxCross2 />
      </Button>
      {error?.projectName && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.projectName.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Name of project"
        value={form.projectName}
        onChange={(e) => onChange(ind, "projectName", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.clientName && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.clientName.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Client Name"
        value={form.clientName}
        onChange={(e) => onChange(ind, "clientName", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.description && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.description.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Project Description"
        value={form.description}
        onChange={(e) => onChange(ind, "description", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.year && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.year.message}
        </p>
      )}
      <Input
        type="number"
        placeholder="Year"
        value={form.year === 0 ? undefined : form.year}
        onChange={(e) => onChange(ind, "year", Number(e.target.value))}
        className="m-0 mt-1"
      />
    </div>
  );
};
const ClientRefInput = ({ remove, ind, onChange, form, error }: any) => {
  return (
    <div className="relative">
      <Button
        size="icon"
        type="button"
        variant="destructive"
        className="h-7 w-7 text-xl absolute -left-8 text-white"
        onClick={() => remove(ind)}
      >
        <RxCross2 />
      </Button>
      {error?.clientName && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.clientName.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Name of client"
        value={form.clientName}
        onChange={(e) => onChange(ind, "clientName", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.contactEmail && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.contactEmail.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="ContactEmail of client"
        value={form.contactEmail}
        onChange={(e) => onChange(ind, "contactEmail", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.contactPhone && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.contactPhone.message}
        </p>
      )}
      <Input
        type="number"
        placeholder="Contact Phone of client"
        value={form.contactPhone}
        onChange={(e) => onChange(ind, "contactPhone", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.testimonial && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.testimonial.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Testimonial"
        value={form.testimonial}
        onChange={(e) => onChange(ind, "testimonial", e.target.value)}
        className="m-0 mt-1"
      />
    </div>
  );
};
const InitProject: PastProjectType = {
  projectName: "",
  clientName: "",
  description: "",
  year: 0,
};
const InitClient: ClientReferenceType = {
  clientName: "",
  contactEmail: "",
  contactPhone: "",
  testimonial: "",
};
const Step6 = ({ setValue, errors, hidden }: { setValue: any; errors: any, hidden?:boolean }) => {
  const [form, setForm] = useState<PastProjectType[]>([InitProject]);
  const [form2, setForm2] = useState<ClientReferenceType[]>([InitClient]);
  const add = () => {
    if (form.length >= 5) return;
    setForm((prev) => [...prev, InitProject]);
  };
  const remove = (ind: number) => {
    if (form.length <= 1) return;
    setForm((prev) => prev.filter((_, i) => i !== ind));
  };
  const add2 = () => {
    if (form.length >= 5) return;
    setForm((prev) => [...prev, InitProject]);
  };
  const remove2 = (ind: number) => {
    if (form.length <= 1) return;
    setForm((prev) => prev.filter((_, i) => i !== ind));
  };
  const onChange = (ind: number, name: string, value: string) => {
    setForm((prev) =>
      prev.map((f, i) => (i === ind ? { ...f, [name]: value } : f))
    );
  };
  const onChange2 = (ind: number, name: string, value: string) => {
    setForm2((prev) =>
      prev.map((f, i) => (i === ind ? { ...f, [name]: value } : f))
    );
  };
  useEffect(() => {
    setValue("pastProjects", form);
  }, [form]);
  useEffect(() => {
    setValue("clientReferences", form2);
  }, [form2]);

  return (
    <div className={cn(hidden ? "hidden" : "")}>

      <div>
        <Label className="text-sm font-medium">
          Past Projects{" "}
          <Button
            type="button"
            size="icon"
            className="h-7 w-7 text-2xl"
            onClick={add}
          >
            +
          </Button>
        </Label>
        <div className="p-8 pt-3 space-y-4">
          {form.map((f, i) => (
            <PastProjectInput
              remove={remove}
              ind={i}
              form={f}
              error={errors.pastProjects && errors.pastProjects[i]}
              onChange={onChange}
              key={`pastPro-${i}`}
            />
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">
          Client References{" "}
          <Button
            type="button"
            size="icon"
            className="h-7 w-7 text-2xl"
            onClick={add2}
          >
            +
          </Button>
        </Label>
        <div className="p-8 pt-3 space-y-4">
          {form2.map((f, i) => (
            <ClientRefInput
              remove={remove2}
              ind={i}
              form={f}
              error={errors.clientReferences && errors.clientReferences[i]}
              onChange={onChange2}
              key={`clientRef-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Step6;
