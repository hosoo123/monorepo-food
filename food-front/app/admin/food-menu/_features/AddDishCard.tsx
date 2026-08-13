import { Plus } from "lucide-react";

interface AddDishCardProps {
  categoryName: string;
}

export const AddDishCard = ({ categoryName }: AddDishCardProps) => {
  return (
    <button className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#EF4444]/40 rounded-xl h-[290px] hover:bg-[#FEF2F2] transition-colors">
      <div className="w-11 h-11 rounded-full bg-[#EF4444] flex items-center justify-center">
        <Plus className="w-5 h-5 text-white" />
      </div>
      <p className="text-[13px] text-black text-center px-4">
        Add new Dish to
        <br />
        {categoryName}
      </p>
    </button>
  );
};