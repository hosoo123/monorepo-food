"use client";

import { useEffect, useState } from "react";
import { DishCard, FoodType } from "./dishCard";
import { AddDishCard } from "./AddDishCard";
import { CategoryType } from "./categoryFilter";
import { apiUrl } from "@/lib/api";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

export const DishSection = ({
  category,
  getCategory,
}: {
  category: CategoryType;
  getCategory: () => Promise<void>;
}) => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState(true);

  const getFoods = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const response = await fetch(apiUrl(`/category/${category._id}`));

      if (!response.ok) {
        throw new Error("Food tatahad aldaa garlaa");
      }

      const data = await response.json();
      setFoods(data.foods ?? []);
    } catch (error) {
      console.error(error);
      setFoods([]);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if (category._id) {
      getFoods(true);
    }
  }, [category._id]);

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        {category.categoryName} ({loading ? "..." : foods.length})
      </h2>

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-16">
          <LoadingSpinner className="h-7 w-7" />
          <p className="text-sm text-zinc-500">Loading dishes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AddDishCard
            category={category}
            getFoods={getFoods}
            getCategory={getCategory}
          />

          {foods.map((food) => (
            <DishCard key={food._id} food={food} onChanged={getFoods} />
          ))}
        </div>
      )}
    </div>
  );
};
