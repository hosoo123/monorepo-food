"use client";

import { useState } from "react";
import { ImageIcon, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryType } from "./categoryFilter";

// interface AddDishCardProps {
//   categoryName: string;
// }

export const AddDishCard = ({
  category,
  getCategory,
}: {
  category: CategoryType;
  getCategory: () => void;
}) => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState(false);
  const getFoods = async () => {};
  const createFood = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: foodName,
        image: foodImage,
        ingredients: foodIngredients,
        price: foodPrice,
        category: category._id,
      }),
    });
    getFoods();
    getCategory();
  };
  const uploadCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
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
            {category.categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-[24px]">
        <div className="flex flex-col h-[420px] justify-center pl-[8px] gap-4 w-[calc(100%-32px)]">
          <p className="text-[18px] flex font-semibold text-black text-center">
            Add new Dish to {category.categoryName}
          </p>
          <div className="flex gap-4">
            <div className="flex gap-3 flex-col font-bold">
              {" "}
              <p>Food name</p>
              <Input
                type="text"
                placeholder="Type food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-col font-bold">
              {" "}
              <p>Food price</p>
              <Input
                type="number"
                placeholder="Enter price"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3 flex-col font-bold">
            {" "}
            <p>Ingredients</p>
            <Input

              type="text"
              placeholder="List ingredients"
              value={foodIngredients}
              onChange={(e) => setFoodIngredients(e.target.value)}
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
