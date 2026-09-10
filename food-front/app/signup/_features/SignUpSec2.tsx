"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import type { SignUpFormData } from "./SignUpSec1";

type SignUpSec2Props = {
  formData: SignUpFormData;
};

export const SignUpSec2 = ({ formData }: SignUpSec2Props) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const canSubmit =
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

  const checkError = () => {
    let isValid = true;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.length < 6) {
      setConfirmPasswordError("Confirm password хоосон байна.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleClick = async () => {
    if (!checkError() || loading) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const signupRes = await fetch(apiUrl("/user"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password,
          role: "USER",
        }),
      });

      if (!signupRes.ok) {
        const data = await signupRes.json().catch(() => ({}));
        toast.error(data.message || "Failed to create account");
        return;
      }

      // Бүртгэлийн дараа шууд нэвтрүүлэх — хэрэглэгч дахин login хийхгүй
      const loginRes = await fetch(apiUrl("/user/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password,
        }),
      });

      const loginData = await loginRes.json().catch(() => ({}));

      if (!loginRes.ok || !loginData.token) {
        toast.success("Account created. Please log in.");
        router.push("/login");
        return;
      }

      saveAuth(loginData.token, {
        _id: loginData.user._id,
        name: loginData.user.name,
        email: loginData.user.email,
        role: loginData.user.role,
        phoneNumber: loginData.user.phoneNumber,
        address: loginData.user.address,
      });

      toast.success("Account created. Welcome!");
      router.push("/");
    } catch {
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[300px] flex flex-col gap-4">
      <div>
        <h2 className="font-semibold font-sans text-[20px] text-black">
          Create a strong password
        </h2>
        <p className="text-[#8E8E8E] font-normal text-[14px]">
          Create a strong password with letters, numbers.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full border rounded-lg p-3 text-[14px] ${
              passwordError ? "border-[#E14942]" : "border-[#CBD5E1]"
            }`}
          />
          {passwordError.length > 0 && (
            <div className="text-[#E14942] font-normal text-[12px]">
              {passwordError}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm"
            className={`w-full border rounded-lg p-3 text-[14px] ${
              confirmPasswordError ? "border-[#E14942]" : "border-[#CBD5E1]"
            }`}
          />
          {confirmPasswordError.length > 0 && (
            <div className="text-[#E14942] font-normal text-[12px]">
              {confirmPasswordError}
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-[13px] text-[#71717A] cursor-pointer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>
      </div>

      <button
        onClick={handleClick}
        disabled={!canSubmit || loading}
        className={`h-11 w-full rounded-lg text-[14px] font-medium transition-colors ${
          canSubmit && !loading
            ? "bg-[#121316] text-white cursor-pointer"
            : "bg-[#E4E4E7] text-[#A1A1AA] cursor-not-allowed"
        }`}
      >
        {loading ? "Loading..." : "Let's Go"}
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
