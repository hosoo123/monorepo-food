"use client";

import Image from "next/image";
import { LoginForm } from "./_features/LoginForm";

import Link from "next/link";
export default function LoginPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col items-center justify-center px-16 w-full lg:w-1/2">
        <div className="w-full max-w-sm flex flex-col items-start ">
          <Link href="/">
            {" "}
            <button className=" text-black border border-gray rounded-lg p-2.5 mb-8 cursor-pointer">
              {"<"}
            </button>
          </Link>

          <LoginForm />
        </div>
      </div>
      <div className="lg:w-1/2 relative hidden  lg:block">
        <Image
          src="./image/multiSteps.svg"
          alt="delivery rider"
          fill
          loading="eager"
          className="object-cover fill rounded-4xl p-5"
        />
      </div>
    </div>
  );
}
