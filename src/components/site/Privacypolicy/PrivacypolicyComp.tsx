import { db } from "@/core/client/db";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

const PrivacypolicyComp = async () => {
  const res =  await fetch(`${process.env.NEXTAUTH_URL}/api/policy`, {cache: "no-store"});
  const data = await res.json();
  if (!data) {
    return <div>Privacy policy content not available.</div>;
  }

  return (
    <div className="mt-20 px-2 md:px-3 lg:px-6 xl:px-8">
      <div className="flex flex-col gap-4 text-slate-800 p-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 w-full h-full">
        <div className="flex flex-col gap-6">
          <div className="w-full h-72">
            <Image
              alt="Banner image"
              src={data.imageURL || ""}
              className="w-full h-full object-cover bg-center rounded-lg"
              width={1080}
              height={1080}
            />
          </div>
          <h1 className="font-bold border-b-[1px] border-slate-600 pb-2 font-cinzel tracking-wide text-3xl sm:text-5xl text-slate-850">
            Privacy Policy
          </h1>

          <div className="text-lg markdown-body">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacypolicyComp;
