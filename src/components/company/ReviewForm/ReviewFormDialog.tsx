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
import { createReviewAction } from "@/core/server/actions/review/createReview";
import useMutation from "@/hooks/useMutation";
import { cn } from "@/lib/utils";
import { IoStar } from "react-icons/io5";

import { FormEvent, useState } from "react";
import { PlusCircle } from "lucide-react";

export default function ReviewDialog({
  name,
  companyId,
}: {
  name: string;
  companyId: string;
}) {
  const [response, setResponse] = useState<{
    error?: string;
    success?: string;
  }>({});
  const [rating, setRating] = useState(1);
  const { isPending, mutate } = useMutation(createReviewAction);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setResponse({});
    e.preventDefault();
    // @ts-expect-error
    const name = e.target[0].value;
    // @ts-expect-error
    const review = e.target[1].value;
    e.currentTarget?.reset();
    const res = await mutate({ name, review, companyId, rating });
    setResponse(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md w-fit text-white hover:text-white bg-[#ffce51] hover:bg-[#f8c239]"
        >
          <PlusCircle className="mr-2" />
          Add a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your review on {name}</DialogTitle>
        </DialogHeader>
        {response.error && (
          <span className="text-red-500">{response.error}</span>
        )}
        {response.success && (
          <span className="text-green-500">{response.success}</span>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex items-start flex-col gap-4"
        >
          <div className="w-full">
            <label className="font-semibold" htmlFor="name">
              Rating
            </label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, ind) => {
                return (
                  <span
                    key={ind}
                    className={cn(
                      "hover:cursor-pointer text-3xl",
                      ind + 1 <= rating ? "text-yellow-500" : "text-gray-400"
                    )}
                    onClick={() => {
                      setRating(ind + 1);
                    }}
                  >
                    <IoStar />
                  </span>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <label className="font-semibold" htmlFor="name">
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
            <label htmlFor="review" className="block">
              Review
            </label>
            <textarea
              id="review"
              name="review"
              placeholder="Enter your review"
              className="w-full p-4 border-secondary"
              required
            />
          </div>
          <DialogFooter>
            <Button disabled={isPending} type="submit">
              {isPending ? "Adding Review..." : "Add Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
