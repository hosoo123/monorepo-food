import { Plus } from "lucide-react";
import { FoodDetailModal } from "./MainPage-AddedFoodCart";

type Props = {
  name: string;
  price: number;
  description: string;
  AddedFoodCart: () => void;
};
export const MenuContainerCard = ({
  name,
  price,
  AddedFoodCart,
  description,
}: Props) => {
  return (
    <div className="w-99.25 h-85.5 p-4 bg-white rounded-lg shadow-md">
      <div className="relative">
        <img
          src="/image/Product Image.svg"
          alt="menuCard"
          className="w-full h-52.5 object-cover overflow-hidden rounded-lg"
        />
        <FoodDetailModal />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold justify-between flex text-[#EF4444]">
          {name}{" "}
          <span className="text-xl font-bold text-black">
            ${price.toFixed(2)}
          </span>
        </h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};
