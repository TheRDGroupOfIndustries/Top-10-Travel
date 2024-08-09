"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useMutation from "@/hooks/useMutation";
import { editCompanyAction } from "@/core/server/actions/company/editCompany";
import { Pencil, Upload, UserRoundPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { editCompanyDataAction } from "@/core/server/actions/company/editCompanyData";

const CompanyDataInputwSave = ({
  name,
  text,
  type = "text",
  value,
  className,
  minLength,
  maxLength,
}: {
  name: string;
  value: string | undefined | null;
  text: string;
  type?: string;
  className?: string;
  minLength?: number;
  maxLength?: number;
}) => {
  const [isChanging, setIsChanging] = useState(false);
  const { mutate, isPending } = useMutation(editCompanyDataAction);

  return (
    <>
      {isChanging ? (
        <form
          onSubmit={async (e: any) => {
            e.preventDefault();
            const val = e.target[name].value;
            if (val === value) {
              setIsChanging(false);
              return; // value didn't change, no need to save
            }
            const { success, error } = await mutate({ [name]: val });
            if (success) toast.success(success);
            else toast.error(error);
            setIsChanging(false);
          }}
          className="flex items-center gap-2 justify-center"
        >
          <Input
            name={name}
            id={name}
            defaultValue={value ?? ""}
            placeholder={text}
            className="mb-[1%]"
            type={type}
            minLength={minLength}
            maxLength={maxLength}
          />
          <Button disabled={isPending} type="submit" size="sm">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      ) : (
        <>
          <div
            className=" p-2 flex flex-wrap items-center gap-2"
            onDoubleClick={() => setIsChanging(true)}
          >
            <strong
              className={cn(
                "flex items-center justify-center md:justify-start gap-2",
                className
              )}
            >
              {name.toUpperCase()}:
            </strong>
            <p className="text-center md:text-left w-full md:max-w-[300px] break-words">
              {(!value || value === "") && "Not provided"}
              {value}{" "}
            </p>
            <UserRoundPen
              onClick={() => setIsChanging(true)}
              className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground"
            />
          </div>
        </>
      )}
    </>
  );
};
export default CompanyDataInputwSave;
