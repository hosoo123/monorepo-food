"use client";

import { useState } from "react";
import Link from "next/link";

export type SignUpFormData = {
  email: string;
};

interface SignUpSec1Props {
  handleNext: (data: SignUpFormData) => void;
}

export const SignUpSec1 = ({ handleNext }: SignUpSec1Props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const canContinue = email.trim().length > 0;

  const checkError = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Имэйл хаягаа оруулна уу.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email. Use a format like example@email.com.");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleClick = () => {
    if (!canContinue || !checkError()) return;
    handleNext({ email: email.trim() });
  };

  return (
    <div className="w-[300px] flex flex-col gap-4">
      <div>
        <h2 className="font-semibold font-sans text-[20px] text-black">
          Create your account
        </h2>
        <p className="text-[#8E8E8E] font-normal text-[14px]">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={`w-full border rounded-lg p-3 text-[14px] ${
            emailError ? "border-[#E14942]" : "border-[#CBD5E1]"
          }`}
        />
        {emailError.length > 0 && (
          <div className="text-[#E14942] font-normal text-[12px]">
            {emailError}
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={!canContinue}
        className={`h-11 w-full rounded-lg text-[14px] font-medium transition-colors ${
          canContinue
            ? "bg-[#121316] text-white cursor-pointer"
            : "bg-[#E4E4E7] text-[#A1A1AA] cursor-not-allowed"
        }`}
      >
        Let's Go
      </button>

      <p className="text-center text-[13px] text-[#71717A]">
        Already have an account?{" "}
        <Link href="/login" className="text-black underline">
          Log in
        </Link>
      </p>
    </div>
  );
};
