import { X } from "lucide-react";
import { CategoryType } from "./categoryFilter";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

export const AllDishes = ({
  cat,
  active,
  setActive,
  deleteCategory,
  deleting = false,
}: {
  cat: CategoryType;
  active: string;
  setActive: (name: string) => void;
  deleteCategory: (id: string) => void;
  deleting?: boolean;
}) => {
  return (
    <button
      key={cat._id}
      onClick={() => setActive(cat.categoryName)}
      disabled={deleting}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors disabled:opacity-60 ${
        active === cat.categoryName
          ? "border-[#EF4444] text-[#EF4444] bg-white"
          : "border-[#E4E4E7] text-black bg-white hover:bg-[#FAFAFA]"
      }`}
    >
      {cat.categoryName}
      <span
        className={`text-[11px] px-1.5 py-0.5 rounded-full ${
          active === cat.categoryName
            ? "bg-[#EF4444] text-white"
            : "bg-black text-white"
        }`}
      >
        {cat.foodCount}
      </span>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!deleting) deleteCategory(cat._id);
        }}
        className={`flex items-center gap-2 px-2 py-1 rounded-full text-[13px] font-medium border transition-colors ${
          cat.categoryName === "All Dishes" ? "hidden" : ""
        }`}
      >
        {deleting ? (
          <LoadingSpinner className="h-3 w-3" />
        ) : (
          <X width={12} height={12} />
        )}
      </div>
    </button>
  );
};
