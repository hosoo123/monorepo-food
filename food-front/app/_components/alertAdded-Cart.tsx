import { Check } from "lucide-react";

export const CartToast = () => {
  return (
    <div className="absolute top-[70px] left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-black border border-purple-500 rounded-lg px-4 h-12 w-[357px] shadow-lg">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
        <span className="text-sm font-medium text-white whitespace-nowrap">
          Food is being added to the cart!
        </span>
      </div>
    </div>
  );
};