"use client";
import { Plus } from "lucide-react";
import { FoodModal } from "./foodAddedModal";
import { useState } from "react";

type Props = {
  name: string;
  price: number;
  description: string;
  AddedFoodCart: () => void;
  image?: string;
  id: number;
};
export const MenuContainerCard = ({
  name,
  id,
  price,
  AddedFoodCart,
  description,
  image,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="w-99.25 h-85.5 p-4 bg-white rounded-lg shadow-md">
        <div className="relative">
          <img
            src="/image/Product Image.svg"
            alt="menuCard"
            className="w-full h-52.5 object-cover overflow-hidden rounded-lg"
          />
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white overflow-hidden right-5.5 bottom-5 text-black absolute cursor-pointer"
          >
            <Plus className="w-4 h-4 text-red-500" />
          </div>
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
      {isModalOpen && (
        <FoodModal
          item={{ id, name, price, description, image: image || "" }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
