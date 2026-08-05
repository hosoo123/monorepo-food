"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Clock } from "lucide-react";

interface UserProfileModalProps {
  isLoggedIn?: boolean;
}

export const UserProfileModal = ({ isLoggedIn = false }: UserProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header дээрх User Icon товчлуурууд */}
      <button
        onClick={() => setIsOpen(true)}
        className="object-cover bg-[#EF4444] hover:bg-[#DC2626] transition-colors justify-center w-9 h-9 items-center rounded-full flex cursor-pointer"
      >
        <User className="w-4 h-4 text-white" />
      </button>

      {/* Нэвтрээгүй үед нээгдэх Modal */}
      {isOpen && !isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content - Яг зураг дээрх дизайн */}
          <div className="relative bg-white rounded-3xl p-8 max-w-[400px] w-full shadow-2xl text-center z-10 flex flex-col items-center">
            {/* Red Clock Icon Circle */}
            <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center mb-5">
              <div className="w-10 h-10 rounded-full border-2 border-[#EF4444] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#EF4444]" />
              </div>
            </div>

            {/* Header Text */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              You need to log in first
            </h2>
            <p className="text-gray-500 text-sm mb-7">
              Please sign in before opening your account.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 w-full">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-[#18181B] hover:bg-black text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-xl text-sm border border-gray-200 transition-colors flex items-center justify-center"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};