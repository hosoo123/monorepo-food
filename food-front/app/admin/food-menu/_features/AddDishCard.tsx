"use client";

import { useState } from "react";
import { ImageIcon, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AddDishCardProps {
  categoryName: string;
}

export const AddDishCard = ({ categoryName }: AddDishCardProps) => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [foodImage, setFoodImage] = useState<File | null>(null);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#EF4444]/40 rounded-xl h-[290px] hover:bg-[#FEF2F2] transition-colors">
          <div className="w-11 h-11 rounded-full bg-[#EF4444] flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <p className="text-[13px] text-black text-center px-4">
            Add new Dish to
            <br />
            {categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-[24px]">
        <div className="flex flex-col h-[420px] justify-center pl-[8px] gap-4 w-[calc(100%-32px)]">
          <p className="text-[18px] flex font-semibold text-black text-center">
            Add new Dish to {categoryName}
          </p>
          <div className="flex gap-4">
            <div className="flex gap-3 flex-col font-bold">
              {" "}
              <p>Food name</p>
              <Input
                placeholder="Type food name"
                value={categoryName}
                onChange={(e) => e.target.value}
              />
            </div>
            <div className="flex gap-3 flex-col font-bold">
              {" "}
              <p>Food price</p>
              <Input
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => e.target.value}
              />
            </div>
          </div>
          <div className="flex gap-3 flex-col font-bold">
            {" "}
            <p>Category name</p>
            <Input
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => e.target.value}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-medium text-black">Food image</p>

            <label
              htmlFor="foodImage"
              className="flex min-h-[138px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#2563EB] bg-[#F8FAFF] transition-colors hover:bg-[#EFF6FF]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <ImageIcon className="h-5 w-5 text-black" />
              </div>

              {foodImage ? (
                <div className="text-center">
                  <p className="text-[15px] font-medium text-black">
                    {foodImage.name}
                  </p>

                  <p className="mt-1 text-[12px] text-[#71717A]">
                    Зураг сонгогдлоо
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-[15px] font-medium text-black">
                    Choose a file or drag & drop it here
                  </p>
                </div>
              )}

              <input
                id="foodImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) =>
                  setFoodImage(event.target.files?.[0] ?? null)
                }
              />
            </label>
          </div>
          <button
            className="ml-auto border-[#EF4444] cursor-pointer text-white bg-black rounded-full px-4 py-2 font-bold flex items-center justify-center"
            // onClick={}
          >
            Add category
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
