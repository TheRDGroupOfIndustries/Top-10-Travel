"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useMutation from "@/hooks/useMutation";
import { editCompanyAction } from "@/core/server/actions/company/editCompany";
import { Pencil, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

const InputWithSave = ({
  name,
  text,
  value,
  className,
}: {
  name: string;
  value: string;
  text: string;
  className?: string;
}) => {
  const [isChanging, setIsChanging] = useState(false);
  const { mutate, isPending } = useMutation(editCompanyAction);
  const getValidUrl = (url: string) => {
    try {
      const u = new URL(url);
      return u.href;
    } catch (error) {
      return "/UploadImage.jpg";
    }
  };
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
            console.log({ [name]: val });
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
            defaultValue={value}
            placeholder={text}
            className="mb-[1%]"
          />
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
          {name === "image" ? (
            <div
              onClick={() => setIsChanging(true)}
              className="group w-[300px] h-[180px] overflow-hidden rounded-lg relative hover:cursor-pointer"
            >
              <div className="absolute z-20 inset-0 flex items-center justify-center translate-y-full transition-transform group-hover:translate-y-0">
                <Upload />
              </div>
              <Image
                src={getValidUrl(value)}
                alt="/UploadImage.jpg"
                width={300}
                height={180}
                className="w-full aspect-auto object-cover transition-transform group-hover:scale-95 group-hover:brightness-50"
              />
            </div>
          ) : (
            <span
              className={cn(
                "flex items-center justify-center md:justify-start gap-2",
                className
              )}
              onDoubleClick={() => setIsChanging(true)}
            >
              {value}
              <Pencil
                onClick={() => setIsChanging(true)}
                className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"
              />
            </span>
          )}
        </>
      )}
    </>
  );
};
export default InputWithSave;
