"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useMutation from "@/hooks/useMutation";
import { editCompanyAction } from "@/core/server/actions/company/editCompany";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  );
};
export default InputWithSave;
