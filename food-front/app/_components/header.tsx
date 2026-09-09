"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderDialog } from "./headerDialog";
import { ShoppingCart } from "lucide-react";
import { OrderDetailSheet } from "./OrderDetailSheet";
import { UserProfileModal } from "./UserProfileDropdown";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <section className="w-full flex justify-center mx-auto">
      <header className="flex flex-row items-center w-full justify-between gap-2 px-4 sm:px-8 lg:px-22 h-14 sm:h-17 bg-[#18181B]">
        <Link href="/" className="shrink-0">
          <div className="flex flex-row gap-2 items-center">
            <img
              src="/icons/BrandLogo.svg"
              alt="logoFood"
              width={46}
              height={37}
              className="w-8 h-auto sm:w-[46px]"
            />
            <div className="hidden sm:block">
              <p className="font-inter text-white p-0 m-0 leading-tight font-bold text-base sm:text-lg">
                Nom<span className="text-[#EF4444]">Nom</span>
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-gray-400">
                Swift delivery
              </p>
            </div>
          </div>
        </Link>

        <div className="flex flex-row gap-1.5 sm:gap-2.5 items-center min-w-0">
          <HeaderDialog />
          <button
            onClick={() => setIsCartOpen(true)}
            className="justify-center bg-white hover:bg-gray-100 transition-colors w-8 h-8 sm:w-9 sm:h-9 items-center rounded-full flex cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#18181B]"
          >
            <ShoppingCart className="w-4 h-4 text-black" />
          </button>
          <UserProfileModal
            open={isLoginOpen}
            onOpenChange={setIsLoginOpen}
          />
        </div>
      </header>

      <OrderDetailSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRequireLogin={() => {
          setIsLoginOpen(true);
        }}
      />
    </section>
  );
};
