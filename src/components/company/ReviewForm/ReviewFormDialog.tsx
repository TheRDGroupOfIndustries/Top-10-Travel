"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createReviewAction } from "@/core/server/actions/review/createReview";
import useMutation from "@/hooks/useMutation";
import { cn } from "@/lib/utils";
import { IoStar } from "react-icons/io5";
import { FormEvent, useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";

export default function ReviewDialog({
  name,
  info,
  revalidate,
}: {
  name: string;
  info:
    | { type: "Agency"; agencyId: string }
    | { type: "Dmc"; dmcId: string }
    | { type: "Hotel"; hotelId: string };
  revalidate: (info: any) => void;
}) {
  const [response, setResponse] = useState<{
    error?: string;
    success?: string;
  }>({});
  const [rating, setRating] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate } = useMutation(createReviewAction);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setResponse({});
    e.preventDefault();
    // @ts-expect-error
    const name = e.target[0].value;
    // @ts-expect-error
    const review = e.target[1].value;
    e.currentTarget?.reset();
    const res = await mutate({ values: { name, review, rating }, info: info });
    setResponse(res);
    if (res.success) {
      revalidate(info);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setResponse({});
      setRating(1);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md w-fit text-white hover:text-white bg-[#FCAE1D] hover:bg-[rgba(252,174,29,0.8)]"
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
            <label
              className="font-semibold"
              htmlFor="name"
            >
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
            <label
              className="font-semibold"
              htmlFor="name"
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
              htmlFor="review"
              className="block"
            >
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
          <Button
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Adding Review..." : "Add Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
