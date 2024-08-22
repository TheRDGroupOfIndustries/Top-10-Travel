import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { KeyPersonnelSchema } from "../agency/agencySchema";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa6";

type KeyPersonnelType = z.infer<typeof KeyPersonnelSchema>;

const KeyPersonInput = ({ remove, ind, onChange, form, error }: any) => {
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
      {error?.name && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.name.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Name of person"
        value={form.name}
        onChange={(e) => onChange(ind, "name", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.position && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.position.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="Position of person"
        value={form.position}
        onChange={(e) => onChange(ind, "position", e.target.value)}
        className="m-0 mt-1"
      />
      {error?.yearsOfExperience && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.yearsOfExperience.message}
        </p>
      )}
      <Input
        type="number"
        placeholder="Years of experiance"
        value={
          form.yearsOfExperience === -1 ? undefined : form.yearsOfExperience
        }
        onChange={(e) =>
          onChange(ind, "yearsOfExperience", Number(e.target.value))
        }
        className="m-0 mt-1"
      />
      {error?.specialization && (
        <p className="text-red-500 text-xs translate-y-2">
          {error.specialization.message}
        </p>
      )}
      <Input
        type="text"
        placeholder="specialization"
        value={form.specialization}
        onChange={(e) => onChange(ind, "specialization", e.target.value)}
        className="m-0 mt-1"
      />
    </div>
  );
};
const Init: KeyPersonnelType = {
  name: "",
  position: "",
  yearsOfExperience: -1,
  specialization: "",
};
const Step5 = ({
  setValue,
  errors,
  register,
  hidden,
}: {
  setValue: any;
  errors: any;
  register: any;
  hidden?: boolean;
}) => {
  const [form, setForm] = useState<KeyPersonnelType[]>([Init]);
  const add = () => {
    if (form.length >= 5) return;
    setForm((prev) => [...prev, Init]);
  };
  const remove = (ind: number) => {
    if (form.length <= 1) return;
    setForm((prev) => prev.filter((_, i) => i !== ind));
  };
  const onChange = (ind: number, name: string, value: string) => {
    setForm((prev) =>
      prev.map((f, i) => (i === ind ? { ...f, [name]: value } : f))
    );
  };
  useEffect(() => {
    setValue("keyPersonnel", form);
  }, [form]);

  return (
    <div className={cn(hidden ? "hidden" : "space-y-2")}>
      <div>
        <Label
          htmlFor={"numberOfEmployees"}
          className="text-sm font-medium"
        >
          Number Of Employees
          {errors.numberOfEmployees && (
            <p className="text-red-500 text-xs">
              {errors.numberOfEmployees.message}
            </p>
          )}
        </Label>

        <Input
          {...register("numberOfEmployees")}
          id="numberOfEmployees"
          type="number"
          placeholder="Number Of Employees"
          className="m-0 mt-1"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Key Personnel{" "}
          <Button
            type="button"
            size="icon"
            className="h-7 w-7"
            onClick={add}
          >
            <FaPlus />
          </Button>
        </Label>
        <div className="p-8 pt-3 space-y-4">
          {form.map((f, i) => (
            <KeyPersonInput
              remove={remove}
              ind={i}
              form={f}
              error={errors.keyPersonnel && errors.keyPersonnel[i]}
              onChange={onChange}
              key={`keyPerson-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Step5;
