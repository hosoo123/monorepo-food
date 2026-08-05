"use client";

import { useState } from "react";
import Link from "next/link";

export const SignUpSec2 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  const isFilled = password.length > 0 && confirmPassword.length > 0;

  const checkError = () => {
    let IsValid = true;

    if (password.length < 1) {
      setPasswordError("Нууц үгээ оруулна уу.");
      IsValid = false;
    } else if (passwordRegex.test(password) == false) {
      setPasswordError("Weak password. Use numbers and symbols.");
      IsValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.length < 1) {
      setConfirmPasswordError("Confirm password хоосон байна.");
      IsValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Those password didn't match. Try again.");
      IsValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return IsValid;
  };

  const handleClick = () => {
    const validate = checkError();
    if (validate == true) {
      // TODO: sign up submit logic
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
        disabled={!isFilled}
        className={`h-11 w-full rounded-lg text-[14px] font-medium transition-colors ${
          isFilled
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