import { LayoutGrid, Truck } from "lucide-react";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <aside className="w-[220px] h-screen bg-white border-r border-[#E4E4E7] flex flex-col px-4 py-6">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 flex items-center justify-center">
          <Image src="/icons/BrandLogo.svg" alt="Logo" width={32} height={32} />
        </div>
        <div>
          <p className="font-semibold text-[14px] text-black leading-tight">
            NomNom
          </p>
          <p className="text-[11px] text-[#8E8E8E]">Swift delivery</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] text-[#71717A] hover:bg-[#F4F4F5] transition-colors">
          <LayoutGrid className="w-4 h-4" />
          Food menu
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] bg-[#121316] text-white">
          <Truck className="w-4 h-4" />
          Orders
        </button>
      </nav>
    </aside>
  );
};
