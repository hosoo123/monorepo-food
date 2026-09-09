"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, X } from "lucide-react";
import { clearAuth, getStoredUser, isLoggedIn as checkLoggedIn } from "@/lib/auth";
import { toast } from "sonner";
import { useCart } from "./cart-context";

interface UserProfileModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const UserProfileModal = ({
  open,
  onOpenChange,
}: UserProfileModalProps) => {
  const { setAddress } = useCart();
  const [internalOpen, setInternalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    setLoggedIn(checkLoggedIn());
    setEmail(getStoredUser()?.email || "");
  }, [isOpen]);

  const setIsOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleLogout = () => {
    clearAuth();
    setAddress("");
    setLoggedIn(false);
    setIsOpen(false);
    toast.success("Гарлаа");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="object-cover bg-[#EF4444] hover:bg-[#DC2626] transition-colors justify-center w-9 h-9 items-center rounded-full flex cursor-pointer"
      >
        <User className="w-4 h-4 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white rounded-2xl p-8 max-w-[420px] w-full shadow-2xl text-center z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {loggedIn ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 mt-2">
                  {email}
                </h2>
                <p className="text-sm text-gray-500 mb-8">You are signed in</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full bg-[#18181B] hover:bg-black text-white font-medium py-3 rounded-full text-sm transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-8 mt-2">
                  You need to log in first!
                </h2>

                <div className="flex flex-row gap-3 w-full">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-[#18181B] hover:bg-black text-white font-medium py-3 rounded-full text-sm transition-colors flex items-center justify-center"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-full text-sm border border-gray-200 transition-colors flex items-center justify-center"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
