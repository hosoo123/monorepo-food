"use client";

import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type FoodCategory =
  | string
  | {
      _id: string;
      categoryName: string;
    };

export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: FoodCategory;
};

type DishCardProps = {
  food: FoodType;
  onChanged: () => Promise<void>;
};

export const DishCard = ({ food, onChanged }: DishCardProps) => {
  const [open, setOpen] = useState(false);
  const [foodName, setFoodName] = useState(food.foodName);
  const [price, setPrice] = useState(String(food.price));
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [image, setImage] = useState(food.image);
  const [loading, setLoading] = useState(false);

  const categoryId =
    typeof food.category === "string" ? food.category : food.category._id;

  const categoryName =
    typeof food.category === "string"
      ? "Current category"
      : food.category.categoryName;

  const updateFood = async () => {
    try {
      setLoading(true);

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/food", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: food._id,
          foodName,
          price: Number(price),
          ingredients,
          image,
          category: categoryId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update food");
      }

      await response.json();
      await onChanged?.();

      toast.success("Dish has been updated");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update dish");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async () => {
    try {
      setLoading(true);

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/food", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: food._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete food");
      }

      await response.json();
      await onChanged?.();

      toast.success("Dish has been deleted");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="overflow-hidden rounded-xl border border-[#F4F4F5] shadow-md">
        <div className="relative h-[180px]">
          {food.image ? (
            <img
              src={food.image}
              alt={food.foodName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
              No image
            </div>
          )}

          <DialogTrigger>
            <div className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105">
              <Pencil className="h-3.5 w-3.5 text-black" />
            </div>
          </DialogTrigger>
        </div>
        <div className="p-3">
          <div className="mb-1 flex items-center justify-between gap-3">
            <p className="text-[23px] font-semibold text-[#EF4444]">
              {food.foodName}
            </p>

            <p className="text-[20px] font-semibold text-black">
              ${food.price}
            </p>
          </div>

          <p className="text-[16px] leading-snug text-[#71717A]">
            {food.ingredients}
          </p>
        </div>
      </div>

      <DialogContent className="max-h-[90vh] max-w-[825px] overflow-y-auto rounded-[24px] p-10">
        <h2 className="mb-6 text-[28px] font-semibold text-black">
          Dishes info
        </h2>

        <div className="flex flex-col gap-7">
          {/* Dish name */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="w-[210px] text-[16px] text-[#71717A]">
              Dish name
            </label>

            <Input
              value={foodName}
              onChange={(event) => setFoodName(event.target.value)}
              className="h-[62px] flex-1 rounded-xl px-5 text-[18px]"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="w-[210px] text-[16px] text-[#71717A]">
              Dish category
            </label>

            <Input
              value={categoryName}
              readOnly
              className="h-[62px] flex-1 rounded-xl bg-white px-5 text-[18px] font-semibold"
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-2 md:flex-row">
            <label className="w-[210px] pt-3 text-[16px] text-[#71717A]">
              Ingredients
            </label>

            <textarea
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
              className="min-h-[140px] flex-1 resize-none rounded-xl border border-input bg-white px-5 py-4 text-[18px] outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="w-[210px] text-[16px] text-[#71717A]">
              Price
            </label>

            <Input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-[62px] flex-1 rounded-xl px-5 text-[18px]"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col gap-2 md:flex-row">
            <label className="w-[210px] text-[16px] text-[#71717A]">
              Image
            </label>

            <div className="flex-1">
              {image ? (
                <div className="relative h-[205px] overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={foodName}
                    className="h-full w-full object-cover"
                  />

                  <button
                    onClick={() => setImage("")}
                    className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md"
                  >
                    <X className="h-5 w-5 text-black" />
                  </button>
                </div>
              ) : (
                <div className="flex h-[205px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
                  No image selected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Доод товчнууд */}
        <div className="mt-10 flex items-center justify-between">
          <button
            disabled={loading}
            onClick={deleteFood}
            className="flex h-[68px] w-[84px] items-center justify-center rounded-xl border border-[#EF4444] text-[#EF4444] transition hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-6 w-6" />
          </button>

          <button
            disabled={loading}
            onClick={updateFood}
            className="rounded-xl bg-[#18181B] px-8 py-5 text-[18px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
