"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editDMCAction } from "@/core/server/actions/dmc/editDmc";
import useMutation from "@/hooks/useMutation";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const InputWithSave = ({
  name,
  text,
  value,
  className,
  id,
  minLength,
  maxLength,
  type,
  hideLabel = false,
}: {
  name: string;
  value: string;
  text: string;
  className?: string;
  id: string;
  minLength?: number;
  maxLength?: number;
  type?: string;
  hideLabel?: boolean;
}) => {
  const [isChanging, setIsChanging] = useState(false);
  const { mutate, isPending } = useMutation(editDMCAction);
  // const getValidUrl = (url: string) => {
  //   try {
  //     const u = new URL(url);
  //     return u.href;
  //   } catch (error) {
  //     return "/UploadImage.jpg";
  //   }
  // };

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
            const { success, error } = await mutate({
              values: { [name]: val },
              id,
            });
            if (success) toast.success(success);
            else toast.error(error);
            setIsChanging(false);
          }}
          className="flex items-center justify-center"
        >
          {name === "description" ? (
            <Textarea
              name={name}
              id={name}
              defaultValue={value}
              placeholder={text}
              className=""
              minLength={minLength}
              maxLength={maxLength}
            />
          ) : (
            <Input
              name={name}
              id={name}
              defaultValue={value}
              placeholder={text}
              className=""
              minLength={minLength}
              maxLength={maxLength}
              type={type ?? "text"}
            />
          )}
          <Button
            disabled={isPending}
            type="submit"
            size="sm"
            className="bg-mainColor hover:bg-mainColor/80"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      ) : (
        <div>
          {/* {name === "image" ? (
            <div
              onClick={() => setIsChanging(true)}
              className="group w-[300px] h-[200px] rounded-lg overflow-hidden relative hover:cursor-pointer "
            >
              <div className="absolute z-20 inset-0 flex items-center justify-center translate-y-full transition-transform group-hover:translate-y-0">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={getValidUrl(value)}
                  alt="/UploadImage.jpg"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover aspect-auto transition-transform group-hover:scale-95 group-hover:brightness-50 "
                />
              </div>
            </div>
          ) : ( */}
          <Label
            htmlFor={name}
            className={cn(
              hideLabel ? "hidden" : "flex",
              "font-semibold justify-center md:justify-start"
            )}
          >
            {text}
          </Label>

          <span
            className={cn(
              "flex items-center flex-wrap justify-center md:justify-start gap-2 text-sm text-gray-900",
              className
            )}
            onDoubleClick={() => setIsChanging(true)}
          >
            {value.substring(0, 200) + (value.length > 200 ? "..." : "")}

            <Edit
              onClick={() => setIsChanging(true)}
              className="h-4 w-4 text-muted-foreground transition-colors cursor-pointer hover:text-foreground"
            />
          </span>
        </div>
      )}
    </>
  );
};
export default InputWithSave;
