"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import errorImage from "@/resources/images/Error.jpg";
import { ChevronLeft, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="relative mx-auto flex h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-red-500 shadow-lg sm:w-96">
          <Image
            src={errorImage as unknown as string}
            loading="lazy"
            width={600}
            height={600}
            alt="Error"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="w-full h-full relative flex flex-col items-center justify-end gap-5 p-8 md:p-16">
            <Button
              onClick={() => reset()}
              className="text-white inline-flex items-center justify-center gap-1 group"
            >
              <RotateCw className="w-5 h-5 group-hover:animate-spin" />
              Try again
            </Button>
            <Button
              variant={"outline"}
              asChild
            >
              <Link
                href="/"
                className="text-primary inline-flex items-center justify-center gap-1 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-3 duration-500" />
                Go home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
