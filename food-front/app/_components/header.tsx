"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderDialog } from "./headerDialog";
import { ShoppingCart } from "lucide-react"; // User icon-ийг UserProfileDropdown-д ашигласан тул эндээс хаслаа
import { CartToast } from "./alertAdded-Cart";
import { OrderDetailSheet } from "./OrderDetailSheet";
import { UserProfileModal } from "./UserProfileDropdown";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <section className="w-full flex justify-center mx-auto">
      <header className="flex flex-row items-center w-full justify-between px-22 h-17 bg-[#18181B]">
        <Link href="/">
          <div className="flex flex-row gap-2 items-center">
            <img
              src="/icons/BrandLogo.svg"
              alt="logoFood"
              width={46}
              height={37}
            />
            <div>
              <p className="font-inter text-white p-0 m-0 leading-tight font-bold text-lg">
                Nom<span className="text-[#EF4444]">Nom</span>
              </p>
              <p className="text-xs font-medium text-gray-400">
                Swift delivery
              </p>
            </div>
          </div>
        </Link>

        <CartToast />

        <div className="flex flex-row gap-2.5 items-center">
          <HeaderDialog />
          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="justify-center bg-white hover:bg-gray-100 transition-colors w-9 h-9 items-center rounded-full flex cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#18181B]"
          >
            <ShoppingCart className="w-4 h-4 text-black" />
          </button>
          {/* User Profile Dropdown Component */}
          <UserProfileModal isLoggedIn={false} />{" "}
          {/* Одоогоор нэвтрээгүй төлөвөөр тохирууллаа */}  
        </div>
      </header>

      {/* Separated Order Detail Component */}
      <OrderDetailSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </section>
  );
};
