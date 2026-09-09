"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

interface ForgotSec2Props {
  email: string;
  initialCode?: string;
  handleNext: (email?: string, code?: string) => void;
}

export const ForgotSec2 = ({
  email,
  initialCode = "",
  handleNext,
}: ForgotSec2Props) => {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
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
        setCode(data.code);
        toast.success(`Шинэ код: ${data.code}`);
      } else {
        toast.success("Код дахин илгээгдлээ");
      }
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = () => {
    if (!code.trim()) {
      toast.error("Баталгаажуулах код оруулна уу");
      return;
    }
    handleNext(email, code.trim());
  };

  return (
    <div className="w-[300px] flex flex-col gap-4">
      <div>
        <h2 className="font-semibold font-sans text-[20px] text-black">
          Please verify Your Email
        </h2>
        <p className="text-[#8E8E8E] font-normal text-[14px]">
          We just sent a code to{" "}
          <span className="text-black font-medium">{email}</span>. Enter the
          code to continue.
        </p>
      </div>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
        className="w-full border border-[#CBD5E1] rounded-lg p-3 text-[14px]"
      />

      <button
        onClick={handleVerify}
        className="h-11 w-full rounded-lg text-[14px] font-medium bg-[#121316] text-white cursor-pointer"
      >
        Continue
      </button>

      <button
        onClick={handleResend}
        disabled={loading}
        className="h-11 w-full rounded-lg text-[14px] font-medium border border-[#E4E4E7] text-black cursor-pointer disabled:opacity-50"
      >
        {loading ? "Sending..." : "Resend email"}
      </button>
    </div>
  );
};
