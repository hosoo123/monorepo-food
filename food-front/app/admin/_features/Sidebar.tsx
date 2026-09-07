"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Truck, Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Food menu", href: "/admin/food-menu", icon: LayoutGrid },
  { name: "Orders", href: "/admin/orders", icon: Truck },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] transition-colors ${
              isActive
                ? "bg-[#121316] text-white"
                : "text-[#71717A] hover:bg-[#F4F4F5]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  const brand = (
    <Link href={"/"} onClick={() => setOpen(false)}>
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 flex items-center justify-center">
          <Image
            src="/icons/BrandLogo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
        <div>
          <p className="font-semibold text-[14px] text-black leading-tight">
            NomNom
          </p>
          <p className="text-[11px] text-[#8E8E8E]">Swift delivery</p>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-white border-b border-[#E4E4E7] px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/BrandLogo.svg"
            alt="Logo"
            width={28}
            height={28}
          />
          <span className="font-semibold text-sm text-black">NomNom</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-lg border border-[#E4E4E7] flex items-center justify-center cursor-pointer"
        >
          <Menu className="w-4 h-4 text-black" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[260px] bg-white border-r border-[#E4E4E7] flex flex-col px-4 py-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">{brand}</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F4F4F5] cursor-pointer -mt-8"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex w-[220px] h-screen bg-white border-r border-[#E4E4E7] flex-col px-4 py-6 shrink-0">
        {brand}
        {nav}
      </aside>
    </>
  );
};
