"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="w-full md:lg:w-[30vw] bg-amber-100  rounded-xl p-3 flex items-center justify-center mb-2"
    >
      <FcGoogle className="text-xl mr-2" /> Continue with Google
    </button>
  );
};
export default GoogleLogin;
