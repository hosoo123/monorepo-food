"use client";

import { Plus } from "lucide-react";
import { FoodModal } from "./foodAddedModal";
import { useState } from "react";

type Props = {
  name: string;
  price: number;
  description: string;
  image?: string;
  id: number;
};

export const MenuContainerCard = ({
  name,
  id,
  price,
  description,
  image,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-auto p-3 sm:p-4 bg-white rounded-lg shadow-md">
        <div className="relative">
          <img
            src={image || "/image/Product Image.svg"}
            alt="menuCard"
            className="w-full h-44 sm:h-52.5 object-cover overflow-hidden rounded-lg"
          />
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white overflow-hidden right-3 bottom-3 sm:right-5.5 sm:bottom-5 text-black absolute cursor-pointer"
          >
            <Plus className="w-4 h-4 text-red-500" />
          </div>
        </div>
        <div className="pt-3 sm:p-4 flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-bold justify-between flex gap-2 text-[#EF4444]">
            <span className="truncate">{name}</span>
            <span className="text-lg sm:text-xl font-bold text-black shrink-0">
              ${price.toFixed(2)}
            </span>
          </h3>
          <p className="text-sm sm:text-base text-gray-500 line-clamp-2">
            {description}
          </p>
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
