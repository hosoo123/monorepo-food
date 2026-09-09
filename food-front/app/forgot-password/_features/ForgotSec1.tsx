"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

interface ForgotSec1Props {
  handleNext: (email?: string, code?: string) => void;
}

export const ForgotSec1 = ({ handleNext }: ForgotSec1Props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isFilled = email.length > 0;

  const checkError = () => {
    let isValid = true;
    if (email.length < 1) {
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

  const handleClick = async () => {
    if (!checkError() || loading) return;

    try {
      setLoading(true);
      const res = await fetch(apiUrl("/user/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Алдаа гарлаа");
        return;
      }

      if (data.code) {
        toast.success(`Баталгаажуулах код: ${data.code}`);
      } else {
        toast.success(data.message || "Код илгээгдлээ");
      }

      handleNext(email, data.code);
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[300px] flex flex-col gap-4">
      <div>
        <h2 className="font-semibold font-sans text-[20px] text-black">
          Reset your password
        </h2>
        <p className="text-[#8E8E8E] font-normal text-[14px]">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
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
        disabled={!isFilled || loading}
        className={`h-11 w-full rounded-lg text-[14px] font-medium transition-colors ${
          isFilled && !loading
            ? "bg-[#121316] text-white cursor-pointer"
            : "bg-[#E4E4E7] text-[#A1A1AA] cursor-not-allowed"
        }`}
      >
        {loading ? "Sending..." : "Send link"}
      </button>

      <p className="text-center text-[13px] text-[#71717A]">
        Don't have an account?{" "}
        <Link href="/signup" className="text-black underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
