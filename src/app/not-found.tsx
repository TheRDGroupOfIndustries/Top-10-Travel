

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import notFound from "@/resources/images/PageNotFound.jpg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="relative mx-auto flex h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-500 shadow-lg sm:w-96">
          <Image
            src={notFound as unknown as string}
            loading="lazy"
            width={600}
            height={600}
            alt="Page Not Found"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="w-full h-full relative flex items-end justify-center p-8 md:p-16">
            <Button variant={"outline"} asChild>
              <Link
                href="/"
                className="text-black inline-flex items-center justify-center gap-1 group"
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
