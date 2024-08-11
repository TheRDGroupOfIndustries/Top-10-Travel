"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useMutation from "@/hooks/useMutation";
import { editCompanyAction } from "@/core/server/actions/company/editCompany";
import { Edit, Pencil, Upload, UserRoundPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { editCompanyDataAction } from "@/core/server/actions/company/editCompanyData";
import { Textarea } from "../ui/textarea";

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
            if (success) {
              toast.success(success);
              setIsChanging(false);
            } else toast.error(error);
          }}
          className="flex items-center gap-2 lg:justify-center"
        >
          {name === "description" || name === "socialLinks" ? (
            <Textarea
              name={name}
              id={name}
              defaultValue={value ?? ""}
              placeholder={text}
              minLength={minLength}
              maxLength={maxLength}
            />
          ) : (
            <Input
              name={name}
              id={name}
              defaultValue={value ?? ""}
              className="mb-[1%]"
              type={type}
              minLength={minLength}
              maxLength={maxLength}
            />
          )}
          <Button
            disabled={isPending}
            type="submit"
            size="sm"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      ) : (
        <>
          <div
            className="w-full flex flex-wrap  gap-3"
            onDoubleClick={() => setIsChanging(true)}
          >
            <span
              className={cn(
                "flex gap-2 font-bold text-[13px]",
                className
              )}
            >
              {name.toUpperCase()}:
            </span>
            <div className="flex  gap-1">
              <p className="w-full max-w-[300px] break-words line-clamp-2 text-[13px] md:text-sm lg:text-base">
                {(!value || value === "") && "Not provided"}
                {value && value.includes("@")
                  ? `${value.split("@")[0]}@${value
                      .split("@")[1]
                      .substring(0, 2)}...`
                  : value}{" "}
              </p>

              <Edit
                onClick={() => setIsChanging(true)}
                className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CompanyDataInputwSave;
