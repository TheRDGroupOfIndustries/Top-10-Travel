"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createEnquiryAction } from "@/core/server/actions/Enquiry/createEnquiry";
import useMutation from "@/hooks/useMutation";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function EnquireDialog({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const [response, setResponse] = useState<{
    error?: string;
    success?: string;
  }>({});
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { isPending, mutate } = useMutation(createEnquiryAction);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const name = e.target[0].value;
    // @ts-expect-error
    const email = e.target[1].value;
    // @ts-expect-error
    const message = e.target[2].value;
    // console.log(name, email, message);
    setResponse({});

    const res = await mutate({
      name,
      email,
      message,
      companyId: params.companyId as string,
    });
    setOpen(false);
    if (res.success) {
      setTimeout(() => window.print(), 200);
    }
    setResponse(res);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("rounded-full", className)}
        >
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact {name}</DialogTitle>
          <DialogDescription>
            Contact {name} regarding any queries.
          </DialogDescription>
        </DialogHeader>
        {response.error && (
          <span className="bg-destructive text-destructive-foreground p-2 rounded-md">
            {response.error}
          </span>
        )}
        {response.success && (
          <span className="text-green-500">{response.success}</span>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex items-start flex-col gap-4"
        >
          <div className="w-full flex flex-col gap-[2px]">
            <label
              htmlFor="name"
              className="p-2"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <label
              htmlFor="email"
              className="p-2"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <label
              htmlFor="message"
              className="p-2"
            >
              Message
            </label>
            <Input
              id="message"
              name="message"
              type="text"
              placeholder="Enter your message"
              required
            />
          </div>
          <DialogFooter>
            <Button
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Sending Query..." : "Send Query"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
